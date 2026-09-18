import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  createIndexableMapRouteRegistry,
  mapPagePublication,
} from "../app/map-seo-publication.ts";
import { createProductionReleasePlan } from "../scripts/production/release-plan.mjs";
import {
  createDatabaseReleaseSnapshot,
  renderDatabaseReleaseSql,
} from "../scripts/production/database-release.mjs";
import { createRollbackCommand } from "../scripts/production/rollback-release.mjs";
import { pruneRetiredMapBootstrap } from "../scripts/production/prune-retired-map-bootstrap.mjs";
import {
  fetchWithRetry,
  inspectIndexableHtml,
  validateProductionBaseUrl,
  validateRuntimeBundleAssets,
} from "../scripts/production/verify-public-site.mjs";
import { createSitesRuntimeVars } from "../build/sites-runtime-vars.ts";
import bootstrapReleasePlan from "../worker/map-release-bootstrap-plan.ts";

const root = path.resolve(import.meta.dirname, "..");
const versionA = `sha256-${"a".repeat(64)}`;
const versionB = `sha256-${"b".repeat(64)}`;

test("production builds cannot serialize server-only runtime secrets", async () => {
  const environment = {
    ADMIN_AUTH_SECRET: "admin-auth-secret-canary",
    ANALYTICS_PSEUDONYM_KEY: "analytics-pseudonym-canary",
    ANALYTICS_IP_ENCRYPTION_KEY: "analytics-ip-canary",
  };

  const buildVars = createSitesRuntimeVars("build", versionA, environment);
  assert.equal(buildVars.MAP_RELEASE_BOOTSTRAP_VERSION, versionA);
  assert.equal(buildVars.SUPABASE_URL, undefined);
  assert.equal(buildVars.SUPABASE_PUBLISHABLE_KEY, undefined);
  for (const key of [
    "ADMIN_AUTH_SECRET",
    "ANALYTICS_PSEUDONYM_KEY",
    "ANALYTICS_IP_ENCRYPTION_KEY",
  ]) {
    assert.equal(buildVars[key], undefined, `${key} must not enter a build`);
  }

  const localDevelopmentVars = createSitesRuntimeVars(
    "serve",
    versionA,
    environment,
  );
  assert.equal(
    localDevelopmentVars.ADMIN_AUTH_SECRET,
    environment.ADMIN_AUTH_SECRET,
  );
  assert.equal(
    localDevelopmentVars.ANALYTICS_IP_ENCRYPTION_KEY,
    environment.ANALYTICS_IP_ENCRYPTION_KEY,
  );

  const viteConfig = await readFile(path.join(root, "vite.config.ts"), "utf8");
  assert.match(
    viteConfig,
    /vars:\s*createSitesRuntimeVars\(\s*command,\s*mapManifest\.versionKey,\s*process\.env,\s*\)/u,
  );
  assert.doesNotMatch(
    viteConfig,
    /ADMIN_AUTH_SECRET|ANALYTICS_PSEUDONYM_KEY|ANALYTICS_IP_ENCRYPTION_KEY/u,
  );
});

test("postbuild pruning removes only the retired deployment copy", async (context) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "atlas-map-prune-"));
  context.after(() => rm(tempRoot, { recursive: true, force: true }));

  const sourceRoot = path.join(tempRoot, "public", "map-assets");
  const buildRoot = path.join(tempRoot, "dist", "client", "map-assets");
  await Promise.all([
    mkdir(path.join(tempRoot, ".openai"), { recursive: true }),
    mkdir(sourceRoot, { recursive: true }),
    mkdir(buildRoot, { recursive: true }),
  ]);
  await Promise.all([
    writeFile(
      path.join(tempRoot, ".openai", "hosting.json"),
      JSON.stringify({ project_id: "test", d1: null, r2: "MAP_ASSETS" }),
    ),
    writeFile(path.join(sourceRoot, "manifest.json"), JSON.stringify({ versionKey: versionA })),
    writeFile(path.join(sourceRoot, "source-kept.webp"), "source"),
    writeFile(path.join(buildRoot, "deployment-copy.webp"), "copy"),
  ]);

  const result = await pruneRetiredMapBootstrap({ root: tempRoot });
  assert.equal(result.pruned, true);
  await assert.rejects(access(buildRoot), { code: "ENOENT" });
  await access(path.join(sourceRoot, "source-kept.webp"));

  await mkdir(buildRoot, { recursive: true });
  await writeFile(path.join(buildRoot, "opt-out.webp"), "copy");
  const kept = await pruneRetiredMapBootstrap({
    root: tempRoot,
    keepLocalMapAssets: true,
  });
  assert.equal(kept.pruned, false);
  assert.equal(kept.reason, "KEEP_LOCAL_MAP_ASSETS=1");
  await access(path.join(buildRoot, "opt-out.webp"));
});

test("production release plan is deterministic, immutable, and credential-free", async () => {
  const first = await createProductionReleasePlan({ root });
  const second = await createProductionReleasePlan({ root });
  assert.deepEqual(second, first);
  assert.deepEqual(bootstrapReleasePlan, first);
  assert.match(first.versionKey, /^sha256-[0-9a-f]{64}$/u);
  assert.ok(first.objectCount > 2_500);
  assert.equal(first.objects.length, first.objectCount);
  assert.deepEqual(
    first.objects.map((object) => object.key),
    [...first.objects.map((object) => object.key)].sort(),
  );
  const releasePrefix = `releases/${first.versionKey}/`;
  const bundlePrefix = `bundles/${first.versionKey}/`;
  assert.ok(first.objects.every((object) =>
    (object.key.startsWith(releasePrefix) || object.key.startsWith(bundlePrefix)) &&
    !object.source.includes("/data/")));
  assert.ok(first.objects.every((object) => object.key.split(first.versionKey).length === 2));
  assert.ok(first.objects.some((object) => object.key.startsWith(`${releasePrefix}maps/`)));
  assert.ok(first.objects.some((object) => object.key.startsWith(`${releasePrefix}icons/`)));
  assert.ok(first.objects
    .filter((object) => object.source.includes("/bundles/"))
    .every((object) =>
      object.key.startsWith(bundlePrefix) &&
      object.source === `public/map-assets/${object.key}`));
  assert.ok(first.objects.every((object) =>
    !object.key.startsWith(`${releasePrefix}bundles/`)));
  assert.equal(first.safety.deletesPreviousVersions, false);
  assert.equal(first.channelPointer.body.versionKey, first.versionKey);
  assert.doesNotMatch(JSON.stringify(first), /token|password|secretAccessKey/iu);
});

test("database release snapshot is deterministic, complete, and guarded", async () => {
  const first = await createDatabaseReleaseSnapshot({ root });
  const second = await createDatabaseReleaseSnapshot({ root });
  assert.deepEqual(second, first);
  assert.match(first.versionKey, /^sha256-[0-9a-f]{64}$/u);
  assert.match(first.releaseId, /^[0-9a-f-]{36}$/u);
  assert.deepEqual(first.counts, {
    maps: 10,
    pois: 4_508,
    localizations: 13_554,
    aliases: 13_554,
    pageStates: 39,
  });
  assert.equal(new Set(first.pois.map((poi) => poi.sourceId)).size, first.counts.pois);
  assert.match(first.publicationDigest, /^sha256-[0-9a-f]{64}$/u);
  assert.match(first.databaseSnapshotDigest, /^sha256-[0-9a-f]{64}$/u);
  assert.equal(first.releaseStats.database.pageStateCount, 39);

  const mapSeoData = JSON.parse(await readFile(path.join(root, "app/map-seo-data.json"), "utf8"));
  const routeRegistry = createIndexableMapRouteRegistry(mapSeoData.maps);
  assert.deepEqual(
    mapPagePublication
      .filter((publication) => publication.contentMode === "complete-base-map")
      .map((publication) => [publication.slug, publication.updatedAt]),
    [["morheim", "2026-07-23"]],
  );
  assert.ok(
    mapPagePublication
      .filter((publication) => publication.contentMode === "marker-catalog")
      .every((publication) =>
        publication.updatedAt === (
          publication.slug === "eltnen" ? "2026-07-23" : "2026-07-14"
        )),
  );
  assert.deepEqual(
    routeRegistry.map((route) => route.kind),
    [
      "map", "map", "map", "map", "map", "map",
      "type", "type", "type", "type", "type", "type", "type",
    ],
  );
  assert.deepEqual(
    routeRegistry
      .filter((route) => route.kind === "map")
      .map((route) => route.mapSlug),
    ["verteron", "altgard", "eltnen", "morheim", "chaotic-lower-reshanta", "chaotic-middle-reshanta"],
  );
  assert.deepEqual(
    routeRegistry
      .filter((route) => route.kind === "map")
      .map((route) => [route.mapSlug, route.updatedAt]),
    [
      ["verteron", "2026-07-14"],
      ["altgard", "2026-07-14"],
      ["eltnen", "2026-07-23"],
      ["morheim", "2026-07-23"],
      ["chaotic-lower-reshanta", "2026-07-14"],
      ["chaotic-middle-reshanta", "2026-07-14"],
    ],
  );
  assert.deepEqual(
    routeRegistry
      .filter((route) => route.kind === "type")
      .map((route) => [route.mapSlug, route.typeSlug, route.updatedAt]),
    [
      ["verteron", "world-boss", "2026-07-14"],
      ["altgard", "world-boss", "2026-07-14"],
      ["verteron", "hidden-cube", "2026-07-26"],
      ["altgard", "hidden-cube", "2026-07-26"],
      ["eltnen", "hidden-cube", "2026-07-26"],
      ["verteron", "rift", "2026-07-26"],
      ["altgard", "rift", "2026-07-26"],
    ],
  );
  assert.throws(
    () => createIndexableMapRouteRegistry(
      mapSeoData.maps.map((map) => map.slug === "verteron" ? { ...map, markerCount: 0 } : map),
    ),
    /neither marker data nor reviewed complete-base-map content: verteron/u,
  );
  assert.throws(
    () => createIndexableMapRouteRegistry(
      mapSeoData.maps.map((map) =>
        map.slug === "eltnen"
          ? { ...map, subtypeCounts: { ...map.subtypeCounts, hiddenCube: 0 } }
          : map),
    ),
    /no matching source markers: eltnen\/hidden-cube/u,
  );
  const localeCodes = { "zh-Hant": "zh-hant", en: "en", ko: "ko" };
  const expectedPageStateRoutes = Object.values(localeCodes).flatMap((locale) =>
    routeRegistry.map((route) => `/${locale}${route.suffix}`));
  assert.deepEqual(
    [...new Set(first.pageStates.map((page) => page.routePath))].sort(),
    [...expectedPageStateRoutes].sort(),
  );

  const sql = renderDatabaseReleaseSql(first);
  assert.match(sql, /begin;/u);
  assert.match(sql, /commit;/u);
  assert.match(sql, /insert into atlas\.releases/u);
  assert.match(sql, /insert into atlas\.maps/u);
  assert.match(sql, /insert into atlas\.pois/u);
  assert.match(sql, /insert into atlas\.localizations/u);
  assert.match(sql, /insert into atlas\.page_states/u);
  assert.match(sql, /atlas\.publish_release/u);
  assert.match(sql, /Atlas release count mismatch/u);
  assert.match(sql, /Atlas release identity drift/u);
  assert.match(sql, /stats #>> '\{database,snapshotDigest\}'/u);
  assert.match(sql, /delete from atlas\.maps[\s\S]*?status_code in \('draft', 'validating'\)/u);
  assert.doesNotMatch(sql, /password|secretAccessKey|cfat_/iu);
});

test("runtime bundle asset validation requires one atomic release prefix", () => {
  const releasePrefix = `/releases/${versionA}`;
  const bundle = {
    mapName: "World_L_A",
    maps: [{
      name: "World_L_A",
      tileMinZoom: 0,
      tileTemplate: `${releasePrefix}/maps/tiles/verteron/{z}/{x}/{y}.webp`,
    }],
    categories: [{
      subtypes: [{
        iconUrl: `${releasePrefix}/icons/location_village.webp`,
        darkIconUrl: "",
      }],
    }],
    markers: [{
      iconUrl: `${releasePrefix}/icons/collection_monolithMaterial.webp`,
      darkIconUrl: `${releasePrefix}/icons/collection_monolithMaterial_dark.webp`,
    }],
  };
  const assets = validateRuntimeBundleAssets(bundle, versionA);
  assert.equal(assets.tilePath, `${releasePrefix}/maps/tiles/verteron/0/0/0.webp`);
  assert.equal(assets.iconPath, `${releasePrefix}/icons/location_village.webp`);
  assert.throws(() => validateRuntimeBundleAssets({
    ...bundle,
    markers: [{ iconUrl: "/icons/unversioned.webp" }],
  }, versionA), /not pinned/u);
});

test("rollback command is compare-and-swap guarded and rejects unsafe input", () => {
  const sql = createRollbackCommand({
    channel: "stable",
    expectedCurrent: versionA,
    target: versionB,
    reason: "verified rollback",
  });
  assert.match(sql, /atlas\.activate_release/u);
  assert.match(sql, new RegExp(versionA, "u"));
  assert.match(sql, new RegExp(versionB, "u"));
  assert.throws(() => createRollbackCommand({
    channel: "stable'; drop table atlas.releases; --",
    expectedCurrent: versionA,
    target: versionB,
  }), /Invalid channel/u);
  assert.throws(() => createRollbackCommand({
    channel: "stable",
    expectedCurrent: versionA,
    target: versionA,
  }), /must differ/u);
});

test("production URL validation requires HTTPS and can require a custom domain", () => {
  assert.equal(
    validateProductionBaseUrl("https://atlas.example.com").origin,
    "https://atlas.example.com",
  );
  assert.throws(() => validateProductionBaseUrl("http://atlas.example.com"), /HTTPS/u);
  assert.throws(() => validateProductionBaseUrl(
    "https://temporary.chatgpt.site",
    { requireCustomDomain: true },
  ), /custom primary domain/u);
});

test("full-crawl HTML inspection reads canonical, hreflang, social metadata, and JSON-LD", () => {
  const url = "https://atlas.example.com/en/guides/example/";
  const html = `<!doctype html><html lang="en"><head>
    <title>Unique example title</title>
    <meta name="description" content="A unique example description">
    <meta property="og:title" content="Unique example title">
    <meta property="og:description" content="A unique example description">
    <meta property="og:image" content="https://atlas.example.com/og.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Unique example title">
    <meta name="twitter:description" content="A unique example description">
    <meta name="twitter:image" content="https://atlas.example.com/og.png">
    <link rel="canonical" href="${url}">
    <link rel="alternate" hreflang="zh-Hant" href="https://atlas.example.com/zh-hant/guides/example/">
    <link rel="alternate" hreflang="en" href="${url}">
    <link rel="alternate" hreflang="ko" href="https://atlas.example.com/ko/guides/example/">
    <link rel="alternate" hreflang="x-default" href="${url}">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article"}</script>
  </head><body><main><h1>Example heading</h1></main></body></html>`;
  const record = inspectIndexableHtml(html, url);
  assert.deepEqual(record.canonical, [url]);
  assert.deepEqual(record.alternates.map((alternate) => alternate.hreflang), [
    "zh-Hant", "en", "ko", "x-default",
  ]);
  assert.equal(record.social.twitterCard, "summary_large_image");
  assert.equal(record.structuredData[0]["@type"], "Article");
  assert.equal(record.htmlLang, "en");
  assert.deepEqual(record.headings, ["Example heading"]);
});

test("public verification retries only transient failures and treats custom-domain 403 as strict", async () => {
  const originalFetch = globalThis.fetch;
  const requestUrl = "https://atlas.example.com/robots.txt";
  const response = (status) => {
    const value = new Response(status === 200 ? "ok" : "blocked", { status });
    Object.defineProperty(value, "url", { value: requestUrl });
    return value;
  };
  let calls = 0;
  try {
    globalThis.fetch = async () => {
      calls += 1;
      return response(404);
    };
    await assert.rejects(fetchWithRetry(requestUrl), /returned 404/u);
    assert.equal(calls, 1);

    calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return response(calls === 1 ? 403 : 200);
    };
    await assert.rejects(
      fetchWithRetry(requestUrl, {}, { retryForbidden: false }),
      /returned 403/u,
    );
    assert.equal(calls, 1);

    calls = 0;
    let retries = 0;
    const result = await fetchWithRetry(requestUrl, {}, {
      retryForbidden: true,
      onRetry: () => { retries += 1; },
    });
    assert.equal(result.status, 200);
    assert.equal(calls, 2);
    assert.equal(retries, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("activated production gate recognizes R2 and fails closed until final domain env is set", async () => {
  const env = { ...process.env };
  delete env.SITE_URL;
  delete env.NEXT_PUBLIC_SITE_URL;
  const result = spawnSync(
    process.execPath,
    [path.join(root, "scripts/production/check-production.mjs"), "--require-activated"],
    { cwd: root, env, encoding: "utf8" },
  );
  assert.notEqual(result.status, 0);
  const report = JSON.parse(result.stdout);
  assert.equal(report.mode, "activated");
  assert.equal(report.ok, false);
  assert.equal(report.errors.some((error) => error.includes("R2 binding")), false);
  assert.ok(report.errors.some((error) => error.includes("SITE_URL")));
  assert.ok(report.errors.some((error) => error.includes("MAP_RELEASE_ENDPOINT")));

  const bootstrapResult = spawnSync(
    process.execPath,
    [path.join(root, "scripts/production/check-production.mjs"), "--require-activated"],
    {
      cwd: root,
      env: {
        ...env,
        MAP_RELEASE_BOOTSTRAP_VERSION: (await createProductionReleasePlan({ root })).versionKey,
        SITE_URL: "https://atlas.example.com",
        NEXT_PUBLIC_SITE_URL: "https://atlas.example.com",
      },
      encoding: "utf8",
    },
  );
  assert.notEqual(bootstrapResult.status, 0);
  const bootstrapReport = JSON.parse(bootstrapResult.stdout);
  assert.ok(bootstrapReport.errors.some((error) => error.includes("temporary")));
});

test("CI readiness workflow never embeds deployment credentials", async () => {
  const workflow = await readFile(
    path.join(root, ".github/workflows/production-readiness.yml"),
    "utf8",
  );
  assert.match(workflow, /permissions:\s*\n\s*contents: read/u);
  assert.match(workflow, /npm run production:check/u);
  assert.match(workflow, /npm test/u);
  assert.match(workflow, /postgres:17-alpine/u);
  assert.match(workflow, /202607140003_atlas_release_privileges\.sql/u);
  assert.match(workflow, /database-release\.mjs --apply --confirm-version/u);
  assert.match(workflow, /atlas\.activate_release/u);
  assert.match(workflow, /role=service_role/u);
  assert.match(workflow, /role=anon/u);
  assert.match(workflow, /active_page_states <> 18/u);
  assert.match(workflow, /Prove published release children are immutable/u);
  assert.match(workflow, /guarded_table_count <> 6/u);
  assert.match(workflow, /foreach guarded_table in array/u);
  assert.match(workflow, /has_table_privilege\([\s\S]*?'service_role'[\s\S]*?'TRUNCATE'/u);
  assert.match(workflow, /Published child guard did not reject UPDATE on atlas\.%/u);
  assert.match(workflow, /Published child INSERT was not rejected/u);
  assert.match(workflow, /Published child UPDATE was not rejected/u);
  assert.match(workflow, /Published child DELETE was not rejected/u);
  assert.match(workflow, /Published OLD\.release_id was not rejected/u);
  assert.match(workflow, /Published NEW\.release_id was not rejected/u);
  assert.match(workflow, /Draft child DELETE should remain allowed/u);
  assert.match(workflow, /CONTENT_RELEASE_AS_OF=\$content_release_as_of/u);
  assert.match(workflow, /--as-of "\$CONTENT_RELEASE_AS_OF"/u);
  assert.doesNotMatch(workflow, /--as-of 2026-07-14/u);
  assert.doesNotMatch(workflow, /CLOUDFLARE_API_TOKEN|SUPABASE_SERVICE_ROLE_KEY|AWS_SECRET/u);
});

test("production readiness scans the Sites R2 release secret", async () => {
  const checker = await readFile(
    path.join(root, "scripts/production/check-production.mjs"),
    "utf8",
  );
  assert.match(checker, /MAP_RELEASE_UPLOAD_TOKEN/u);
  assert.match(checker, /map release upload token/u);
});
