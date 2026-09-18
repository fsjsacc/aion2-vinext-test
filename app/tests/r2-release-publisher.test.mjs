import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import {
  assertApplyConfirmation,
  immutableObjectExpectation,
  parsePublishArguments,
  publishRelease,
  readObjectStoreConfig,
  stablePointerCondition,
  validateReleasePlan,
  verifyPlanSources,
} from "../scripts/production/publish-r2-release.mjs";

const versionKey = `sha256-${"a".repeat(64)}`;
const cacheControl = "public, max-age=31536000, immutable";
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

async function createFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "atlas-r2-release-"));
  const assetRoot = path.join(root, "public/map-assets");
  await mkdir(path.join(assetRoot, `bundles/${versionKey}/en`), { recursive: true });
  const manifestBody = Buffer.from('{"fixture":"manifest"}\n');
  const bundleBody = Buffer.from('{"fixture":"bundle"}\n');
  const descriptors = [
    {
      source: "public/map-assets/manifest.json",
      key: `releases/${versionKey}/manifest.json`,
      bytes: manifestBody.byteLength,
      sha256: sha256(manifestBody),
      cacheControl,
    },
    {
      source: `public/map-assets/bundles/${versionKey}/en/fixture.json`,
      key: `bundles/${versionKey}/en/fixture.json`,
      bytes: bundleBody.byteLength,
      sha256: sha256(bundleBody),
      cacheControl,
    },
  ];
  await writeFile(path.join(root, descriptors[0].source), manifestBody);
  await writeFile(path.join(root, descriptors[1].source), bundleBody);
  const plan = {
    schemaVersion: 1,
    versionKey,
    sourceBuild: "fixture-build",
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
    root,
    plan,
    async cleanup() {
      await rm(root, { recursive: true, force: true });
    },
  };
}

class MockS3Client {
  constructor(objects = new Map()) {
    this.calls = [];
    this.objects = objects;
  }

  async send(command) {
    if (command instanceof HeadObjectCommand) {
      this.calls.push({ operation: "head", input: command.input });
      const object = this.objects.get(command.input.Key);
      if (!object) {
        const error = new Error("Not found");
        error.name = "NotFound";
        error.$metadata = { httpStatusCode: 404 };
        throw error;
      }
      return { ...object, Metadata: { ...object.Metadata } };
    }
    if (command instanceof PutObjectCommand) {
      this.calls.push({ operation: "put", input: command.input });
      const current = this.objects.get(command.input.Key);
      if (
        command.input.IfNoneMatch === "*" && current ||
        command.input.IfMatch && current?.ETag !== command.input.IfMatch
      ) {
        const error = new Error("Precondition failed");
        error.name = "PreconditionFailed";
        error.$metadata = { httpStatusCode: 412 };
        throw error;
      }
      this.objects.set(command.input.Key, {
        ContentLength: command.input.ContentLength,
        ContentType: command.input.ContentType,
        CacheControl: command.input.CacheControl,
        Metadata: { ...command.input.Metadata },
        ETag: '"fixture-etag"',
      });
      return { ETag: '"fixture-etag"' };
    }
    throw new Error(`Unexpected command: ${command.constructor.name}`);
  }
}

test("publisher defaults to dry-run and apply requires an exact version confirmation", async () => {
  const fixture = await createFixture();
  try {
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const result = await publishRelease({ plan: fixture.plan, verifiedSources });
    assert.equal(result.mode, "dry-run");
    assert.equal(result.objectCount, 2);
    assert.equal(result.promoted, false);

    assert.throws(
      () => assertApplyConfirmation({ apply: true }, versionKey),
      /exactly match/u,
    );
    await assert.rejects(
      publishRelease({
        apply: true,
        bucket: "fixture-bucket",
        client: new MockS3Client(),
        confirmVersion: `sha256-${"b".repeat(64)}`,
        plan: fixture.plan,
        verifiedSources,
      }),
      /exactly match/u,
    );
  } finally {
    await fixture.cleanup();
  }
});

test("local sources are rechecked for size and sha256 before any remote work", async () => {
  const fixture = await createFixture();
  try {
    validateReleasePlan(fixture.plan);
    await writeFile(path.join(fixture.root, fixture.plan.objects[1].source), "tampered");
    await assert.rejects(
      verifyPlanSources(fixture.plan, { root: fixture.root }),
      /byte count changed|sha256 changed/u,
    );
  } finally {
    await fixture.cleanup();
  }
});

test("matching immutable objects are skipped without a put", async () => {
  const fixture = await createFixture();
  try {
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const objects = new Map(fixture.plan.objects.map((descriptor) => {
      const expected = immutableObjectExpectation(descriptor, versionKey);
      return [descriptor.key, {
        ContentLength: expected.contentLength,
        ContentType: expected.contentType,
        CacheControl: expected.cacheControl,
        Metadata: expected.metadata,
      }];
    }));
    const client = new MockS3Client(objects);
    const result = await publishRelease({
      apply: true,
      bucket: "fixture-bucket",
      client,
      concurrency: 2,
      confirmVersion: versionKey,
      plan: fixture.plan,
      verifiedSources,
    });
    assert.equal(result.skipped, 2);
    assert.equal(result.uploaded, 0);
    assert.equal(client.calls.some((call) => call.operation === "put"), false);
  } finally {
    await fixture.cleanup();
  }
});

test("an existing immutable object with different metadata is never overwritten", async () => {
  const fixture = await createFixture();
  try {
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const first = fixture.plan.objects[0];
    const expected = immutableObjectExpectation(first, versionKey);
    const client = new MockS3Client(new Map([[
      first.key,
      {
        ContentLength: expected.contentLength,
        ContentType: expected.contentType,
        CacheControl: expected.cacheControl,
        Metadata: { ...expected.metadata, "atlas-sha256": "0".repeat(64) },
      },
    ]]));
    await assert.rejects(
      publishRelease({
        apply: true,
        bucket: "fixture-bucket",
        client,
        concurrency: 1,
        confirmVersion: versionKey,
        plan: fixture.plan,
        verifiedSources,
      }),
      /Refusing to overwrite immutable object/u,
    );
    assert.equal(client.calls.some((call) => call.operation === "put"), false);
  } finally {
    await fixture.cleanup();
  }
});

test("promotion writes the no-store pointer only after every immutable object verifies", async () => {
  const fixture = await createFixture();
  try {
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const client = new MockS3Client();
    const result = await publishRelease({
      apply: true,
      bucket: "fixture-bucket",
      client,
      concurrency: 2,
      confirmVersion: versionKey,
      expectedCurrent: "none",
      plan: fixture.plan,
      promote: true,
      verifiedSources,
    });
    assert.equal(result.uploaded, 2);
    assert.equal(result.promoted, true);

    const putCalls = client.calls.filter((call) => call.operation === "put");
    assert.equal(putCalls.length, 3);
    assert.deepEqual(
      new Set(putCalls.slice(0, -1).map((call) => call.input.Key)),
      new Set(fixture.plan.objects.map((object) => object.key)),
    );
    assert.equal(putCalls.at(-1).input.Key, "channels/stable.json");
    assert.equal(putCalls.at(-1).input.CacheControl, "no-cache, no-store, must-revalidate");
    assert.equal(putCalls.at(-1).input.IfNoneMatch, "*");
    assert.equal(putCalls.at(-1).input.IfMatch, undefined);
    for (const descriptor of fixture.plan.objects) {
      const putIndex = client.calls.findIndex(
        (call) => call.operation === "put" && call.input.Key === descriptor.key,
      );
      const verifyingHeadIndex = client.calls.findLastIndex(
        (call) => call.operation === "head" && call.input.Key === descriptor.key,
      );
      assert.ok(verifyingHeadIndex > putIndex, `${descriptor.key} was not headed after upload`);
    }
  } finally {
    await fixture.cleanup();
  }
});

test("promotion is gated and failed immutable verification never writes the pointer", async () => {
  assert.throws(
    () => parsePublishArguments(["--plan", "plan.json", "--promote"]),
    /requires --apply/u,
  );
  assert.throws(
    () => parsePublishArguments([
      "--plan", "plan.json", "--apply", "--confirm-version", versionKey, "--promote",
    ]),
    /requires --expected-current/u,
  );
  const fixture = await createFixture();
  try {
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const client = new MockS3Client();
    let immutablePuts = 0;
    const originalSend = client.send.bind(client);
    client.send = async (command) => {
      if (command instanceof PutObjectCommand && command.input.Key !== "channels/stable.json") {
        immutablePuts += 1;
        const response = await originalSend(command);
        if (immutablePuts === 1) {
          client.objects.get(command.input.Key).Metadata["atlas-sha256"] = "0".repeat(64);
        }
        return response;
      }
      return originalSend(command);
    };
    await assert.rejects(
      publishRelease({
        apply: true,
        bucket: "fixture-bucket",
        client,
        concurrency: 1,
        confirmVersion: versionKey,
        expectedCurrent: "none",
        plan: fixture.plan,
        promote: true,
        verifiedSources,
      }),
      /Uploaded object verification failed/u,
    );
    assert.equal(
      client.calls.some((call) => call.operation === "put" && call.input.Key === "channels/stable.json"),
      false,
    );
  } finally {
    await fixture.cleanup();
  }
});

test("stable pointer CAS uses the current ETag and rejects a version mismatch without writing", async () => {
  const previousVersion = `sha256-${"b".repeat(64)}`;
  assert.deepEqual(stablePointerCondition(null, "none"), { IfNoneMatch: "*" });
  assert.deepEqual(stablePointerCondition({
    ETag: '"previous-etag"',
    Metadata: { "atlas-version-key": previousVersion },
  }, previousVersion), { IfMatch: '"previous-etag"' });
  assert.throws(() => stablePointerCondition({
    ETag: '"previous-etag"',
    Metadata: { "atlas-version-key": versionKey },
  }, previousVersion), /Stable channel conflict/u);
  assert.throws(() => stablePointerCondition({
    Metadata: { "atlas-version-key": previousVersion },
  }, previousVersion), /no ETag/u);

  const fixture = await createFixture();
  try {
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const objects = new Map(fixture.plan.objects.map((descriptor) => {
      const expected = immutableObjectExpectation(descriptor, versionKey);
      return [descriptor.key, {
        ContentLength: expected.contentLength,
        ContentType: expected.contentType,
        CacheControl: expected.cacheControl,
        Metadata: expected.metadata,
      }];
    }));
    objects.set("channels/stable.json", {
      ContentLength: 1,
      ContentType: "application/json; charset=utf-8",
      CacheControl: "no-cache, no-store, must-revalidate",
      Metadata: { "atlas-version-key": previousVersion },
      ETag: '"previous-etag"',
    });
    const client = new MockS3Client(objects);
    await publishRelease({
      apply: true,
      bucket: "fixture-bucket",
      client,
      concurrency: 2,
      confirmVersion: versionKey,
      expectedCurrent: previousVersion,
      plan: fixture.plan,
      promote: true,
      verifiedSources,
    });
    const pointerPut = client.calls.find(
      (call) => call.operation === "put" && call.input.Key === "channels/stable.json",
    );
    assert.equal(pointerPut.input.IfMatch, '"previous-etag"');
    assert.equal(pointerPut.input.IfNoneMatch, undefined);

    const mismatchClient = new MockS3Client(new Map(objects));
    mismatchClient.objects.set("channels/stable.json", {
      ...objects.get("channels/stable.json"),
      Metadata: { "atlas-version-key": versionKey },
      ETag: '"other-etag"',
    });
    await assert.rejects(publishRelease({
      apply: true,
      bucket: "fixture-bucket",
      client: mismatchClient,
      concurrency: 2,
      confirmVersion: versionKey,
      expectedCurrent: previousVersion,
      plan: fixture.plan,
      promote: true,
      verifiedSources,
    }), /Stable channel conflict/u);
    assert.equal(
      mismatchClient.calls.some(
        (call) => call.operation === "put" && call.input.Key === "channels/stable.json",
      ),
      false,
    );
  } finally {
    await fixture.cleanup();
  }
});

test("a concurrent pointer change makes the conditional write fail without overwriting", async () => {
  const previousVersion = `sha256-${"b".repeat(64)}`;
  const concurrentVersion = `sha256-${"c".repeat(64)}`;
  const fixture = await createFixture();
  try {
    const verifiedSources = await verifyPlanSources(fixture.plan, { root: fixture.root });
    const objects = new Map(fixture.plan.objects.map((descriptor) => {
      const expected = immutableObjectExpectation(descriptor, versionKey);
      return [descriptor.key, {
        ContentLength: expected.contentLength,
        ContentType: expected.contentType,
        CacheControl: expected.cacheControl,
        Metadata: expected.metadata,
      }];
    }));
    objects.set("channels/stable.json", {
      Metadata: { "atlas-version-key": previousVersion },
      ETag: '"previous-etag"',
    });
    const client = new MockS3Client(objects);
    const originalSend = client.send.bind(client);
    client.send = async (command) => {
      if (command instanceof PutObjectCommand && command.input.Key === "channels/stable.json") {
        client.objects.set("channels/stable.json", {
          Metadata: { "atlas-version-key": concurrentVersion },
          ETag: '"concurrent-etag"',
        });
      }
      return originalSend(command);
    };
    await assert.rejects(publishRelease({
      apply: true,
      bucket: "fixture-bucket",
      client,
      concurrency: 2,
      confirmVersion: versionKey,
      expectedCurrent: previousVersion,
      plan: fixture.plan,
      promote: true,
      verifiedSources,
    }), /changed during promotion/u);
    assert.equal(
      client.objects.get("channels/stable.json").Metadata["atlas-version-key"],
      concurrentVersion,
    );
  } finally {
    await fixture.cleanup();
  }
});

test("object store configuration supports direct endpoints or Cloudflare account IDs", () => {
  const direct = readObjectStoreConfig({
    R2_S3_ENDPOINT: "https://objects.example.test",
    R2_BUCKET: "atlas-assets",
    R2_ACCESS_KEY_ID: "access-key",
    R2_SECRET_ACCESS_KEY: "secret-key",
  });
  assert.equal(direct.client.endpoint, "https://objects.example.test");
  assert.equal(direct.bucket, "atlas-assets");
  assert.equal(direct.client.credentials.accessKeyId, "access-key");

  const account = "f".repeat(32);
  const derived = readObjectStoreConfig({
    R2_ACCOUNT_ID: account,
    R2_BUCKET: "atlas-assets",
    R2_ACCESS_KEY_ID: "access-key",
    R2_SECRET_ACCESS_KEY: "secret-key",
  });
  assert.equal(derived.client.endpoint, `https://${account}.r2.cloudflarestorage.com`);
  assert.throws(() => readObjectStoreConfig({
    R2_S3_ENDPOINT: "http://objects.example.test",
    R2_BUCKET: "atlas-assets",
    R2_ACCESS_KEY_ID: "access-key",
    R2_SECRET_ACCESS_KEY: "secret-key",
  }), /must use HTTPS/u);
});
