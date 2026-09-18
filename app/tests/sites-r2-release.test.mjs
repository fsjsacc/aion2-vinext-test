import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  handleMapReleaseAdmin,
  isMapAssetsBootstrapFallbackEnabled,
} from "../worker/map-release-admin.ts";
import bootstrapReleasePlan from "../worker/map-release-bootstrap-plan.ts";
import {
  publishSitesRelease,
  readSitesReleaseConfig,
  verifySitesReleaseActivation,
} from "../scripts/production/publish-sites-r2-release.mjs";
import { verifyPlanSources } from "../scripts/production/publish-r2-release.mjs";

const versionKey = `sha256-${"a".repeat(64)}`;
const token = "release-token-abcdefghijklmnopqrstuvwxyz-0123456789";
const cacheControl = "public, max-age=31536000, immutable";
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

async function bodyBuffer(value) {
  if (value === null) return Buffer.alloc(0);
  if (typeof value === "string") return Buffer.from(value);
  if (value instanceof ReadableStream) return Buffer.from(await new Response(value).arrayBuffer());
  if (ArrayBuffer.isView(value)) {
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
  }
  if (value instanceof ArrayBuffer) return Buffer.from(value);
  throw new Error("Unsupported fixture body");
}

class MemoryR2Bucket {
  constructor({ pageSize = 1000 } = {}) {
    this.objects = new Map();
    this.pageSize = pageSize;
    this.putCount = 0;
    this.beforePut = null;
  }

  metadata(record) {
    return {
      key: record.key,
      size: record.body.byteLength,
      etag: record.etag,
      httpEtag: `"${record.etag}"`,
      httpMetadata: { ...record.httpMetadata },
      customMetadata: { ...record.customMetadata },
    };
  }

  async get(key) {
    const record = this.objects.get(key);
    if (!record) return null;
    return {
      ...this.metadata(record),
      body: new Response(record.body).body,
      text: async () => record.body.toString("utf8"),
      writeHttpMetadata(headers) {
        if (record.httpMetadata.contentType) {
          headers.set("content-type", record.httpMetadata.contentType);
        }
        if (record.httpMetadata.cacheControl) {
          headers.set("cache-control", record.httpMetadata.cacheControl);
        }
      },
    };
  }

  async head(key) {
    const record = this.objects.get(key);
    return record ? this.metadata(record) : null;
  }

  async list({ cursor, prefix = "" }) {
    const keys = [...this.objects.keys()].filter((key) => key.startsWith(prefix)).sort();
    const start = cursor ? Number(cursor) : 0;
    const end = Math.min(start + this.pageSize, keys.length);
    return {
      objects: keys.slice(start, end).map((key) => this.metadata(this.objects.get(key))),
      truncated: end < keys.length,
      ...(end < keys.length ? { cursor: String(end) } : {}),
    };
  }

  async put(key, value, options = {}) {
    this.beforePut?.(key, this);
    const existing = this.objects.get(key);
    if (options.onlyIf?.etagDoesNotMatch === "*" && existing) return null;
    if (options.onlyIf?.etagMatches && existing?.etag !== options.onlyIf.etagMatches) return null;
    const body = await bodyBuffer(value);
    if (options.sha256 && sha256(body) !== options.sha256) {
      throw new Error("checksum mismatch");
    }
    this.putCount += 1;
    const record = {
      key,
      body,
      etag: `etag-${this.putCount}`,
      httpMetadata: { ...options.httpMetadata },
      customMetadata: { ...options.customMetadata },
    };
    this.objects.set(key, record);
    return this.metadata(record);
  }
}

function objectDescriptor(source, key, body) {
  return {
    source,
    key,
    bytes: body.byteLength,
    sha256: sha256(body),
    cacheControl,
  };
}

async function createFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "atlas-sites-r2-"));
  const manifestBody = Buffer.from('{"fixture":"manifest"}\n');
  const bundleBody = Buffer.from('{"fixture":"bundle"}\n');
  const descriptors = [
    objectDescriptor(
      "public/map-assets/manifest.json",
      `releases/${versionKey}/manifest.json`,
      manifestBody,
    ),
    objectDescriptor(
      `public/map-assets/bundles/${versionKey}/en/fixture.json`,
      `bundles/${versionKey}/en/fixture.json`,
      bundleBody,
    ),
  ];
  for (const [index, descriptor] of descriptors.entries()) {
    const target = path.join(root, descriptor.source);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, index === 0 ? manifestBody : bundleBody);
  }
  const plan = {
    schemaVersion: 1,
    versionKey,
    sourceBuild: "fixture",
    manifestSha256: descriptors[0].sha256,
    objectCount: descriptors.length,
    totalBytes: descriptors.reduce((total, object) => total + object.bytes, 0),
    objects: descriptors,
    channelPointer: {
      key: "channels/stable.json",
      cacheControl: "no-cache, no-store, must-revalidate",
      body: {
        schemaVersion: 1,
        versionKey,
        manifestKey: `releases/${versionKey}/manifest.json`,
      },
    },
    database: {
      provider: "supabase-postgresql",
      schema: "atlas",
      channel: "stable",
      versionKey,
    },
    safety: {
      deletesPreviousVersions: false,
      promotionIsPointerOnly: true,
      rollbackIsPointerAndDatabaseChannelSwitch: true,
    },
  };
  return {
    plan,
    root,
    async cleanup() {
      await rm(root, { recursive: true, force: true });
    },
  };
}

function adminFetch(bucket, expectedToken = token) {
  return (input, init) => handleMapReleaseAdmin(
    new Request(input, init),
    {
      MAP_ASSETS: bucket,
      MAP_RELEASE_BOOTSTRAP_VERSION: versionKey,
      MAP_RELEASE_UPLOAD_TOKEN: expectedToken,
    },
  );
}

function uploadRequest(descriptor, body, overrides = {}) {
  const transferBody = Buffer.from(body).toString("base64");
  return new Request("https://atlas.example/__atlas-release/object", {
    body: transferBody,
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "cache-control": cacheControl,
      "content-type": "application/octet-stream",
      "x-atlas-bytes": String(descriptor.bytes),
      "x-atlas-object-key": descriptor.key,
      "x-atlas-sha256": descriptor.sha256,
      "x-atlas-transfer-encoding": "base64",
      "x-atlas-version-key": versionKey,
      ...overrides,
    },
  });
}

test("release admin stays hidden without configuration and rejects bad authentication", async () => {
  const bucket = new MemoryR2Bucket();
  assert.equal(
    await handleMapReleaseAdmin(new Request("https://atlas.example/other"), {}),
    null,
  );
  const hidden = await handleMapReleaseAdmin(
    new Request("https://atlas.example/__atlas-release/status"),
    {},
  );
  assert.equal(hidden.status, 404);
  const unauthorized = await handleMapReleaseAdmin(
    new Request("https://atlas.example/__atlas-release/status", {
      headers: { authorization: "Bearer wrong-token-that-is-long-enough-000000" },
    }),
    { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
  );
  assert.equal(unauthorized.status, 401);
  assert.equal(unauthorized.headers.get("access-control-allow-origin"), null);
  assert.equal(unauthorized.headers.get("cache-control"), "no-store");
  assert.equal(unauthorized.headers.get("referrer-policy"), "no-referrer");
  assert.equal(unauthorized.headers.get("x-content-type-options"), "nosniff");
  assert.equal(unauthorized.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  const statusQueryToken = await handleMapReleaseAdmin(
    new Request(`https://atlas.example/__atlas-release/status?bootstrapToken=${token}`),
    { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
  );
  assert.equal(statusQueryToken.status, 401);
});

test("immutable object uploads are verified, idempotent, and never overwritten", async () => {
  const fixture = await createFixture();
  try {
    const bucket = new MemoryR2Bucket();
    const descriptor = fixture.plan.objects[0];
    const body = await import("node:fs/promises").then(({ readFile }) =>
      readFile(path.join(fixture.root, descriptor.source))
    );
    const uploaded = await handleMapReleaseAdmin(
      uploadRequest(descriptor, body),
      { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
    );
    assert.equal(uploaded.status, 201);
    assert.equal((await uploaded.json()).outcome, "uploaded");
    assert.equal(uploaded.headers.get("x-atlas-sha256"), descriptor.sha256);

    const skipped = await handleMapReleaseAdmin(
      uploadRequest(descriptor, body),
      { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
    );
    assert.equal(skipped.status, 200);
    assert.equal((await skipped.json()).outcome, "skipped");
    assert.equal(bucket.putCount, 1);

    const conflict = await handleMapReleaseAdmin(
      uploadRequest(descriptor, body, { "x-atlas-sha256": "0".repeat(64) }),
      { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
    );
    assert.equal(conflict.status, 409);
    assert.equal(bucket.putCount, 1);
  } finally {
    await fixture.cleanup();
  }
});

test("release admin rejects paths outside the canonical release layout", async () => {
  const bucket = new MemoryR2Bucket();
  const fixtureBody = Buffer.from("fixture");
  const descriptor = objectDescriptor(
    "public/map-assets/arbitrary.json",
    `releases/${versionKey}/arbitrary.json`,
    fixtureBody,
  );
  const invalidKeys = [
    descriptor,
    { ...descriptor, key: `bundles/${versionKey}/fr/fixture.json` },
    { ...descriptor, key: `releases/${versionKey}/maps/../secret.webp` },
  ];
  for (const invalid of invalidKeys) {
    const response = await handleMapReleaseAdmin(
      uploadRequest(invalid, fixtureBody),
      { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
    );
    assert.equal(response.status, 400);
  }

  const webpDescriptor = objectDescriptor(
    "public/map-assets/icons/fixture.webp",
    `releases/${versionKey}/icons/fixture.webp`,
    fixtureBody,
  );
  const activeContent = await handleMapReleaseAdmin(
    uploadRequest(webpDescriptor, fixtureBody, { "content-type": "text/html" }),
    { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
  );
  assert.equal(activeContent.status, 400);
  const invalidTransfer = await handleMapReleaseAdmin(
    uploadRequest(webpDescriptor, fixtureBody, { "x-atlas-transfer-encoding": "raw" }),
    { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
  );
  assert.equal(invalidTransfer.status, 400);

  const fixture = await createFixture();
  try {
    const mismatchedSourcePlan = structuredClone(fixture.plan);
    mismatchedSourcePlan.objects[1].source = "public/map-assets/manifest.json";
    const response = await handleMapReleaseAdmin(
      new Request("https://atlas.example/__atlas-release/promote", {
        body: JSON.stringify({
          confirmVersion: versionKey,
          expectedCurrent: "none",
          plan: mismatchedSourcePlan,
        }),
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        method: "POST",
      }),
      { MAP_ASSETS: bucket, MAP_RELEASE_UPLOAD_TOKEN: token },
    );
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, "invalid-promotion");
  } finally {
    await fixture.cleanup();
  }
});

test("bundled bootstrap copies only confirmed plan batches and stays idempotent", async () => {
  const bucket = new MemoryR2Bucket();
  const bootstrapToken = "bootstrap-token-abcdefghijklmnopqrstuvwxyz-0123456789";
  const bootstrapVersionKey = bootstrapReleasePlan.versionKey;
  const assets = {
    async fetch(request) {
      const pathname = decodeURIComponent(new URL(request.url).pathname);
      const body = await import("node:fs/promises").then(({ readFile }) =>
        readFile(path.join(projectRoot, "public", pathname.slice(1)))
      );
      return new Response(body, { status: 200 });
    },
  };
  const request = () => new Request(
    "https://atlas.example/__atlas-release/bootstrap?start=0&limit=2",
    {
      headers: {
        authorization: `Bearer ${bootstrapToken}`,
        "x-atlas-confirm-version": bootstrapVersionKey,
      },
    },
  );
  const env = {
    ASSETS: assets,
    MAP_ASSETS: bucket,
    MAP_RELEASE_BOOTSTRAP_TOKEN: bootstrapToken,
    MAP_RELEASE_BOOTSTRAP_VERSION: bootstrapVersionKey,
  };
  const copied = await handleMapReleaseAdmin(request(), env);
  assert.equal(copied.status, 200);
  const copiedBody = await copied.json();
  assert.deepEqual(
    {
      manifestSha256: copiedBody.manifestSha256,
      start: copiedBody.start,
      next: copiedBody.next,
      uploaded: copiedBody.uploaded,
    },
    {
      manifestSha256: bootstrapReleasePlan.manifestSha256,
      start: 0,
      next: 2,
      uploaded: 2,
    },
  );
  for (const descriptor of bootstrapReleasePlan.objects.slice(0, 2)) {
    assert.ok(await bucket.head(descriptor.key));
  }

  const repeated = await handleMapReleaseAdmin(request(), env);
  assert.equal(repeated.status, 200);
  assert.equal((await repeated.json()).skipped, 2);

  const browserNavigation = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(browserNavigation.status, 200);
  assert.equal((await browserNavigation.json()).skipped, 2);
  assert.equal(browserNavigation.headers.get("referrer-policy"), "no-referrer");

  const browserHtmlNavigation = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/zh-hant/tools/map/release-bootstrap?action=copy&start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(browserHtmlNavigation.status, 200);
  assert.match(browserHtmlNavigation.headers.get("content-type"), /^text\/html/u);
  assert.equal(
    browserHtmlNavigation.headers.get("content-security-policy"),
    "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  );
  const browserHtml = await browserHtmlNavigation.text();
  assert.match(browserHtml, /<title>AION2 map release bootstrap<\/title>/u);
  assert.match(browserHtml, /id="atlas-bootstrap-result"/u);
  assert.match(browserHtml, /&quot;versionKey&quot;/u);
  assert.doesNotMatch(browserHtml, new RegExp(bootstrapToken, "u"));

  const autoBrowserHtmlNavigation = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/zh-hant/tools/map/release-bootstrap?action=copy&auto=1&remaining=32&start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(autoBrowserHtmlNavigation.status, 200);
  const autoBrowserHtml = await autoBrowserHtmlNavigation.text();
  assert.match(autoBrowserHtml, /http-equiv="refresh"/u);
  assert.match(autoBrowserHtml, /start=2/u);
  assert.match(autoBrowserHtml, /remaining=31/u);
  assert.match(autoBrowserHtml, /bootstrapToken=/u);

  const productionRetiredBootstrap = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/zh-hant/tools/map/release-bootstrap?action=copy&start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    { ...env, MAP_RELEASE_BOOTSTRAP_RETIRED: "1" },
  );
  assert.equal(productionRetiredBootstrap.status, 404);
  assert.equal((await productionRetiredBootstrap.json()).error, "not-found");

  const exhaustedAutoNavigation = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/zh-hant/tools/map/release-bootstrap?action=copy&auto=1&remaining=1&start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.doesNotMatch(await exhaustedAutoNavigation.text(), /http-equiv="refresh"/u);

  const invalidBrowserAction = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/zh-hant/tools/map/release-bootstrap?action=unknown&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(invalidBrowserAction.status, 400);
  assert.match(invalidBrowserAction.headers.get("content-type"), /^text\/html/u);

  const invalidBrowserToken = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=0&limit=2&bootstrapToken=${encodeURIComponent("wrong-bootstrap-token-that-is-long-enough-000")}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(invalidBrowserToken.status, 401);

  const invalidBearerCannotFallBackToQuery = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
      { headers: { authorization: "Bearer wrong-bootstrap-token-that-is-long-enough-000" } },
    ),
    env,
  );
  assert.equal(invalidBearerCannotFallBackToQuery.status, 401);

  const queryTokenHead = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
      { method: "HEAD" },
    ),
    env,
  );
  assert.equal(queryTokenHead.status, 401);

  const wrongQueryConfirmation = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=0&limit=2&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(`sha256-${"b".repeat(64)}`)}`,
    ),
    env,
  );
  assert.equal(wrongQueryConfirmation.status, 404);

  const oversizedBatch = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=0&limit=129&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(oversizedBatch.status, 400);

  let realMaximumBatchStart = -1;
  for (let index = 0; index + 128 <= bootstrapReleasePlan.objects.length; index += 1) {
    const bytes = bootstrapReleasePlan.objects
      .slice(index, index + 128)
      .reduce((total, descriptor) => total + descriptor.bytes, 0);
    if (bytes <= 8 * 1024 * 1024) {
      realMaximumBatchStart = index;
      break;
    }
  }
  assert.notEqual(realMaximumBatchStart, -1);
  const realMaximumBatch = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=${realMaximumBatchStart}&limit=128&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(realMaximumBatch.status, 200);
  const realMaximumBatchBody = await realMaximumBatch.json();
  assert.equal(realMaximumBatchBody.objectCount, 128);
  assert.equal(realMaximumBatchBody.next, realMaximumBatchStart + 128);
  assert.ok(realMaximumBatchBody.batchBytes <= 8 * 1024 * 1024);

  const maximumBatchAtEnd = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap?start=${bootstrapReleasePlan.objects.length}&limit=128&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(maximumBatchAtEnd.status, 200);
  assert.equal((await maximumBatchAtEnd.json()).done, true);

  const unconfirmed = await handleMapReleaseAdmin(
    new Request("https://atlas.example/__atlas-release/bootstrap?start=0&limit=2", {
      headers: { authorization: `Bearer ${bootstrapToken}` },
    }),
    env,
  );
  assert.equal(unconfirmed.status, 404);

  const incompletePromotion = await handleMapReleaseAdmin(
    new Request("https://atlas.example/__atlas-release/bootstrap/promote", {
      headers: {
        authorization: `Bearer ${bootstrapToken}`,
        "x-atlas-confirm-version": bootstrapVersionKey,
      },
    }),
    env,
  );
  assert.equal(incompletePromotion.status, 409);
  const browserIncompletePromotion = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/__atlas-release/bootstrap/promote?bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(browserIncompletePromotion.status, 409);
  const browserHtmlIncompletePromotion = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/zh-hant/tools/map/release-bootstrap?action=promote&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    env,
  );
  assert.equal(browserHtmlIncompletePromotion.status, 409);
  assert.match(
    await browserHtmlIncompletePromotion.text(),
    /release-object-set-mismatch|incomplete-release/u,
  );

  const completeBucket = new MemoryR2Bucket();
  for (const descriptor of bootstrapReleasePlan.objects) {
    const pathname = descriptor.source.slice("public".length);
    const body = await import("node:fs/promises").then(({ readFile }) =>
      readFile(path.join(projectRoot, "public", pathname.slice(1)))
    );
    await completeBucket.put(descriptor.key, body, {
      customMetadata: {
        "atlas-bytes": String(descriptor.bytes),
        "atlas-kind": "immutable-release-object",
        "atlas-sha256": descriptor.sha256,
        "atlas-version-key": bootstrapVersionKey,
      },
      httpMetadata: {
        cacheControl: descriptor.cacheControl,
        contentType: descriptor.source.endsWith(".webp")
          ? "image/webp"
          : "application/json; charset=utf-8",
      },
    });
  }
  const completedAutoPromotion = await handleMapReleaseAdmin(
    new Request(
      `https://atlas.example/zh-hant/tools/map/release-bootstrap?action=promote&auto=1&remaining=10&bootstrapToken=${encodeURIComponent(bootstrapToken)}&confirmVersion=${encodeURIComponent(bootstrapVersionKey)}`,
    ),
    { ...env, MAP_ASSETS: completeBucket },
  );
  assert.equal(completedAutoPromotion.status, 200);
  const completedAutoPromotionHtml = await completedAutoPromotion.text();
  assert.match(completedAutoPromotionHtml, /bootstrap complete/u);
  assert.doesNotMatch(completedAutoPromotionHtml, /http-equiv="refresh"/u);

  await bucket.put("channels/stable.json", "{}", {
    customMetadata: { "atlas-version-key": bootstrapVersionKey },
    httpMetadata: { cacheControl: "no-cache, no-store, must-revalidate" },
  });
  const retired = await handleMapReleaseAdmin(request(), env);
  assert.equal(retired.status, 410);
});

test("promotion verifies the complete paginated object set and uses pointer CAS", async () => {
  const fixture = await createFixture();
  try {
    const bucket = new MemoryR2Bucket({ pageSize: 1 });
    const fetchImpl = adminFetch(bucket);
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const config = {
      concurrency: 2,
      endpoint: "https://atlas.example",
      maxAttempts: 1,
      token,
    };
    const result = await publishSitesRelease({
      apply: true,
      config,
      confirmVersion: versionKey,
      expectedCurrent: "none",
      fetchImpl,
      plan: fixture.plan,
      promote: true,
      verifiedSources,
    });
    assert.equal(result.uploaded, 2);
    assert.equal(result.promoted, true);
    const pointer = await bucket.get("channels/stable.json");
    assert.equal(JSON.parse(await pointer.text()).versionKey, versionKey);

    const repeatedPromotion = await fetchImpl("https://atlas.example/__atlas-release/promote", {
      body: JSON.stringify({
        confirmVersion: versionKey,
        expectedCurrent: "none",
        plan: fixture.plan,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "POST",
    });
    assert.equal(repeatedPromotion.status, 200);
    assert.equal((await repeatedPromotion.json()).outcome, "already-promoted");

    bucket.objects.delete(fixture.plan.objects[1].key);
    const incomplete = await fetchImpl("https://atlas.example/__atlas-release/promote", {
      body: JSON.stringify({
        confirmVersion: versionKey,
        expectedCurrent: versionKey,
        plan: fixture.plan,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "POST",
    });
    assert.equal(incomplete.status, 409);
    assert.equal((await incomplete.json()).error, "release-object-set-mismatch");
  } finally {
    await fixture.cleanup();
  }
});

test("concurrent stable pointer changes are rejected", async () => {
  const fixture = await createFixture();
  try {
    const bucket = new MemoryR2Bucket();
    const fetchImpl = adminFetch(bucket);
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    await publishSitesRelease({
      apply: true,
      config: { concurrency: 2, endpoint: "https://atlas.example", maxAttempts: 1, token },
      confirmVersion: versionKey,
      fetchImpl,
      plan: fixture.plan,
      verifiedSources,
    });
    const previousVersion = `sha256-${"b".repeat(64)}`;
    await bucket.put("channels/stable.json", "{}", {
      customMetadata: { "atlas-version-key": previousVersion },
      httpMetadata: { cacheControl: "no-cache, no-store, must-revalidate" },
    });
    bucket.beforePut = (key, target) => {
      if (key !== "channels/stable.json") return;
      target.beforePut = null;
      const current = target.objects.get(key);
      current.etag = "concurrent-etag";
      current.customMetadata["atlas-version-key"] = `sha256-${"c".repeat(64)}`;
    };
    const response = await fetchImpl("https://atlas.example/__atlas-release/promote", {
      body: JSON.stringify({
        confirmVersion: versionKey,
        expectedCurrent: previousVersion,
        plan: fixture.plan,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "POST",
    });
    assert.equal(response.status, 409);
    assert.equal((await response.json()).error, "stable-channel-changed");
  } finally {
    await fixture.cleanup();
  }
});

test("publisher reconciles a committed promotion whose response is lost", async () => {
  const fixture = await createFixture();
  try {
    const bucket = new MemoryR2Bucket();
    const baseFetch = adminFetch(bucket);
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const config = {
      concurrency: 2,
      endpoint: "https://atlas.example",
      maxAttempts: 1,
      token,
    };
    await publishSitesRelease({
      apply: true,
      config,
      confirmVersion: versionKey,
      fetchImpl: baseFetch,
      plan: fixture.plan,
      verifiedSources,
    });
    let dropped = false;
    const ambiguousFetch = async (input, init) => {
      const url = new URL(input);
      if (!dropped && url.pathname === "/__atlas-release/promote") {
        dropped = true;
        const committed = await baseFetch(input, init);
        assert.equal(committed.status, 200);
        throw new Error("simulated response loss after commit");
      }
      return baseFetch(input, init);
    };
    const result = await publishSitesRelease({
      apply: true,
      config,
      confirmVersion: versionKey,
      expectedCurrent: "none",
      fetchImpl: ambiguousFetch,
      plan: fixture.plan,
      promote: true,
      verifiedSources,
    });
    assert.equal(dropped, true);
    assert.equal(result.promoted, true);
    assert.equal(
      (await bucket.head("channels/stable.json")).customMetadata["atlas-version-key"],
      versionKey,
    );
  } finally {
    await fixture.cleanup();
  }
});

test("activated verification fails closed for an empty or mismatched stable channel", async () => {
  const bucket = new MemoryR2Bucket();
  const baseFetch = adminFetch(bucket);
  const config = {
    concurrency: 1,
    endpoint: "https://atlas.example",
    maxAttempts: 1,
    token,
  };
  await assert.rejects(
    verifySitesReleaseActivation({ config, expectedVersion: versionKey, fetchImpl: baseFetch }),
    /active version is none/u,
  );
  await bucket.put("channels/stable.json", "{}", {
    customMetadata: { "atlas-version-key": `sha256-${"b".repeat(64)}` },
    httpMetadata: { cacheControl: "no-cache, no-store, must-revalidate" },
  });
  await assert.rejects(
    verifySitesReleaseActivation({ config, expectedVersion: versionKey, fetchImpl: baseFetch }),
    /active version is sha256-/u,
  );
});

test("Sites publisher config is HTTPS-only and bootstrap is exact-version gated", () => {
  const config = readSitesReleaseConfig({
    MAP_RELEASE_ENDPOINT: "https://atlas.example",
    MAP_RELEASE_UPLOAD_TOKEN: token,
  });
  assert.equal(config.endpoint, "https://atlas.example");
  assert.equal(config.concurrency, 8);
  assert.throws(() => readSitesReleaseConfig({
    MAP_RELEASE_ENDPOINT: "https://user:password@atlas.example",
    MAP_RELEASE_UPLOAD_TOKEN: token,
  }), /credential-free/u);
  assert.throws(() => readSitesReleaseConfig({
    MAP_RELEASE_ENDPOINT: "http://atlas.example",
    MAP_RELEASE_UPLOAD_TOKEN: token,
  }), /must use HTTPS/u);
  assert.equal(isMapAssetsBootstrapFallbackEnabled(versionKey, versionKey), true);
  assert.equal(
    isMapAssetsBootstrapFallbackEnabled(`sha256-${"b".repeat(64)}`, versionKey),
    false,
  );
});
