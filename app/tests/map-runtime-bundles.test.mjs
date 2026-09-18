import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { gzipSync } from "node:zlib";

import {
  RUNTIME_BUNDLE_SCHEMA_VERSION,
  RuntimeBundleValidationError,
  createRuntimeBundleArtifacts,
  validateRuntimeBundleIdentity,
} from "../scripts/map-data/bundles.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const assetsRoot = path.join(projectRoot, "public/map-assets");
const sourceRoot = path.join(projectRoot, "data/map-source");
const dataPath = path.join(sourceRoot, "aion2-map-data.json");
const i18nPath = path.join(sourceRoot, "aion2-map-i18n.json");
const manifestPath = path.join(assetsRoot, "manifest.json");
const publicDataPath = path.join(projectRoot, "public/data/aion2-map-data.json");
const publicI18nPath = path.join(projectRoot, "public/data/aion2-map-i18n.json");

const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");

const loadRelease = async () => {
  const [dataBytes, i18nBytes, manifestText] = await Promise.all([
    readFile(dataPath),
    readFile(i18nPath),
    readFile(manifestPath, "utf8"),
  ]);
  return {
    dataBytes,
    i18nBytes,
    mapData: JSON.parse(dataBytes.toString("utf8")),
    i18n: JSON.parse(i18nBytes.toString("utf8")),
    manifest: JSON.parse(manifestText),
  };
};

test("runtime bundle generator emits 10 maps x 3 locales deterministically", async () => {
  const { mapData, i18n, manifest } = await loadRelease();
  const input = {
    mapData,
    i18n,
    versionKey: manifest.versionKey,
    locales: manifest.locales,
  };
  const first = createRuntimeBundleArtifacts(input);
  const second = createRuntimeBundleArtifacts(input);

  assert.equal(first.manifest.schemaVersion, RUNTIME_BUNDLE_SCHEMA_VERSION);
  assert.equal(first.manifest.basePath, `bundles/${manifest.versionKey}`);
  assert.equal(first.artifacts.length, 30);
  assert.deepEqual(first.manifest, second.manifest);
  assert.deepEqual(first.manifest, manifest.runtimeBundles);

  for (let index = 0; index < first.artifacts.length; index += 1) {
    const current = first.artifacts[index];
    const repeated = second.artifacts[index];
    assert.equal(current.path, repeated.path);
    assert.equal(current.sha256, repeated.sha256);
    assert.ok(current.buffer.equals(repeated.buffer));
  }
});

test("all committed runtime bundles match their manifest descriptors and identities", async () => {
  const { mapData, i18n, manifest } = await loadRelease();
  const generated = createRuntimeBundleArtifacts({
    mapData,
    i18n,
    versionKey: manifest.versionKey,
    locales: manifest.locales,
  });

  for (const artifact of generated.artifacts) {
    const descriptor =
      manifest.runtimeBundles.entries[artifact.locale][artifact.mapName];
    const committed = await readFile(path.join(assetsRoot, descriptor.path));
    const parsed = JSON.parse(committed.toString("utf8"));

    assert.equal(committed.byteLength, descriptor.bytes);
    assert.equal(sha256(committed), descriptor.sha256);
    assert.ok(committed.equals(artifact.buffer));
    validateRuntimeBundleIdentity(parsed, {
      versionKey: manifest.versionKey,
      sourceBuild: manifest.sourceBuild,
      locale: artifact.locale,
      mapName: artifact.mapName,
      mapSlug: artifact.mapSlug,
    });
  }
});

test("every runtime tile and icon path is pinned to the manifest version", async () => {
  const { mapData, i18n, manifest } = await loadRelease();
  const generated = createRuntimeBundleArtifacts({
    mapData,
    i18n,
    versionKey: manifest.versionKey,
    locales: manifest.locales,
  });
  const releasePrefix = `/releases/${manifest.versionKey}`;

  for (const { bundle } of generated.artifacts) {
    assert.ok(bundle.maps.every((map) =>
      map.tileTemplate.startsWith(`${releasePrefix}/maps/`)));
    assert.ok(bundle.categories.every((category) =>
      category.subtypes.every((subtype) =>
        [subtype.iconUrl, subtype.darkIconUrl].every((url) =>
          url === "" || url.startsWith(`${releasePrefix}/icons/`)))));
    assert.ok(bundle.markers.every((marker) =>
      [marker.iconUrl, marker.darkIconUrl].every((url) =>
        url === "" || url.startsWith(`${releasePrefix}/icons/`))));
  }

  assert.ok(mapData.maps.every((map) => map.tileTemplate.startsWith("/maps/")));
  assert.ok(mapData.categories.every((category) =>
    category.subtypes.every((subtype) =>
      subtype.iconUrl === "" || subtype.iconUrl.startsWith("/icons/"))));
});

test("public map payloads expose truthful KINA, community, in-game, and official attribution", async () => {
  const { mapData, i18n, manifest } = await loadRelease();
  const generated = createRuntimeBundleArtifacts({
    mapData,
    i18n,
    versionKey: manifest.versionKey,
    locales: manifest.locales,
  });
  const [publicDataText, publicI18nText] = await Promise.all([
    readFile(publicDataPath, "utf8"),
    readFile(publicI18nPath, "utf8"),
  ]);
  const forbiddenSource =
    /TC IMBA|tc-imba|chishu2018|\[Source zh-CN\]|Felipe Peterlini|\u611f\u8b1d\u73a9\u5bb6|\u611f\u8c22\u73a9\u5bb6/i;

  assert.doesNotMatch(publicDataText, forbiddenSource);
  assert.doesNotMatch(publicI18nText, forbiddenSource);
  assert.match(
    publicDataText,
    /AION2 KINA map curation, player-submitted tips, in-game review, and NC official information/,
  );

  for (const { bundle } of generated.artifacts) {
    const serialized = JSON.stringify(bundle);
    assert.doesNotMatch(serialized, forbiddenSource);
    assert.ok(bundle.maps.every((map) =>
      !("dataAvailability" in map) &&
      !("markerDataProvenance" in map) &&
      !("availabilityReason" in map)));
  }
});

test("the public bundle directory retains only the active sanitized release", async () => {
  const { manifest } = await loadRelease();
  const bundleDirectories = (await readdir(path.join(assetsRoot, "bundles"), {
    withFileTypes: true,
  }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  assert.deepEqual(bundleDirectories, [manifest.versionKey]);
});

test("Verteron zh-Hant contains global indexes but only Verteron runtime rows", async () => {
  const { mapData, i18n, manifest } = await loadRelease();
  const generated = createRuntimeBundleArtifacts({
    mapData,
    i18n,
    versionKey: manifest.versionKey,
    locales: manifest.locales,
  });
  const artifact = generated.artifacts.find(
    (candidate) =>
      candidate.locale === "zh-Hant" && candidate.mapName === "World_L_A",
  );
  assert.ok(artifact);

  const { bundle } = artifact;
  assert.equal(bundle.maps.length, mapData.maps.length);
  assert.equal(bundle.categories.length, mapData.categories.length);
  assert.equal(Object.keys(bundle.text.maps).length, mapData.maps.length);
  assert.equal(
    Object.keys(bundle.text.categories).length,
    Object.keys(i18n.locales["zh-Hant"].categories).length,
  );
  assert.equal(
    Object.keys(bundle.text.subtypes).length,
    Object.keys(i18n.locales["zh-Hant"].subtypes).length,
  );
  assert.equal(bundle.markers.length, mapData.markersByMap.World_L_A.length);
  assert.equal(bundle.regions.length, 27);
  assert.equal(Object.keys(bundle.text.markers).length, bundle.markers.length);
  assert.equal(Object.keys(bundle.text.regions).length, bundle.regions.length);
  assert.ok(bundle.markers.every((marker) => marker.mapName === "World_L_A"));
  assert.ok(
    Object.keys(bundle.text.markers).every((markerId) =>
      bundle.markers.some((marker) => marker.id === markerId),
    ),
  );
});

test("runtime bundle identity validation rejects schema, version, locale, and map drift", async () => {
  const { mapData, i18n, manifest } = await loadRelease();
  const generated = createRuntimeBundleArtifacts({
    mapData,
    i18n,
    versionKey: manifest.versionKey,
    locales: manifest.locales,
  });
  const original = generated.artifacts[0];
  const expected = {
    versionKey: manifest.versionKey,
    sourceBuild: manifest.sourceBuild,
    locale: original.locale,
    mapName: original.mapName,
    mapSlug: original.mapSlug,
  };
  const mutations = [
    ["schemaVersion", 999],
    ["versionKey", "sha256-stale"],
    ["locale", "fr"],
    ["mapName", "Wrong_Map"],
    ["mapSlug", "wrong-map"],
  ];

  for (const [field, value] of mutations) {
    const tampered = structuredClone(original.bundle);
    tampered[field] = value;
    assert.throws(
      () => validateRuntimeBundleIdentity(tampered, expected),
      RuntimeBundleValidationError,
    );
  }

  for (const mutateAsset of [
    (bundle) => { bundle.maps[0].tileTemplate = "/maps/tiles/stale/{z}/{x}/{y}.webp"; },
    (bundle) => { bundle.categories[0].subtypes[0].iconUrl = "/icons/stale.webp"; },
    (bundle) => { bundle.markers[0].iconUrl = "/icons/stale.webp"; },
  ]) {
    const tampered = structuredClone(original.bundle);
    mutateAsset(tampered);
    assert.throws(
      () => validateRuntimeBundleIdentity(tampered, expected),
      RuntimeBundleValidationError,
    );
  }
});

test("Verteron zh-Hant bundle is materially smaller than the legacy full snapshot", async () => {
  const { dataBytes, i18nBytes, manifest } = await loadRelease();
  const descriptor =
    manifest.runtimeBundles.entries["zh-Hant"].World_L_A;
  const bundleBytes = await readFile(path.join(assetsRoot, descriptor.path));
  const legacyRawBytes = dataBytes.byteLength + i18nBytes.byteLength;
  const legacyGzipBytes =
    gzipSync(dataBytes, { level: 9 }).byteLength +
    gzipSync(i18nBytes, { level: 9 }).byteLength;
  const bundleGzipBytes = gzipSync(bundleBytes, { level: 9 }).byteLength;

  assert.ok(
    bundleBytes.byteLength <= legacyRawBytes * 0.45,
    `raw bundle ${bundleBytes.byteLength} should be <=45% of ${legacyRawBytes}`,
  );
  assert.ok(
    bundleGzipBytes <= legacyGzipBytes * 0.4,
    `gzip bundle ${bundleGzipBytes} should be <=40% of ${legacyGzipBytes}`,
  );
});
