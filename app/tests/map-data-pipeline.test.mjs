import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, utimes, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  BASELINE_MINIMUMS,
  MapDataValidationError,
  createPublicationPolicyDescriptor,
  createReleaseManifest,
  createReleaseVersionKey,
  generateRelease,
  validateMapRelease,
} from "../scripts/map-data/pipeline.mjs";
import {
  mapSeoPublication,
  validateMapSeoPublication,
} from "../app/map-seo-publication.ts";

const projectRoot = path.resolve(import.meta.dirname, "..");
const assetsRoot = path.join(projectRoot, "public/map-assets");
const sourceRoot = path.join(projectRoot, "data/map-source");
const mapDataPath = path.join(
  sourceRoot,
  "aion2-map-data.json",
);
const i18nPath = path.join(
  sourceRoot,
  "aion2-map-i18n.json",
);

test("map SEO gate rejects indexable POIs without editorial use, source, and relations", () => {
  const base = {
    mapSlug: "verteron",
    markerId: "fixture-marker",
    slug: "fixture-poi",
    typeSlug: "world-boss",
  };
  const blocked = validateMapSeoPublication({
    pois: [{ ...base, editorialReady: false, indexable: true }],
  });
  assert.match(blocked.join("\n"), /before editorial review/u);
  assert.match(blocked.join("\n"), /without use, source, and related content/u);

  const accepted = validateMapSeoPublication({
    pois: [{
      ...base,
      editorialReady: true,
      indexable: true,
      editorial: {
        useCase: {
          "zh-Hant": "已由編輯核對的獨立用途說明",
          en: "An independently reviewed use case",
          ko: "편집 검토를 마친 독립 용도 설명",
        },
        source: {
          label: "Verified source",
          url: "https://example.com/source",
          verifiedAt: "2026-07-14",
        },
        relatedContent: [{ section: "guides", slug: "reviewed-guide" }],
      },
    }],
  });
  assert.deepEqual(accepted, []);
});

const loadFixtures = async () => {
  const [mapDataText, i18nText] = await Promise.all([
    readFile(mapDataPath, "utf8"),
    readFile(i18nPath, "utf8"),
  ]);
  return {
    mapData: JSON.parse(mapDataText),
    i18n: JSON.parse(i18nText),
  };
};

test("current map snapshot produces a deterministic validated release", async (t) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "aion2-map-release-"));
  t.after(() => rm(tempRoot, { recursive: true, force: true }));
  const outputPath = path.join(tempRoot, "manifest.json");

  const first = await generateRelease({ projectRoot, outputPath });
  const firstBytes = await readFile(outputPath, "utf8");
  const second = await generateRelease({ projectRoot, outputPath });
  const secondBytes = await readFile(outputPath, "utf8");

  assert.equal(first.changed, true);
  assert.equal(second.changed, false);
  assert.equal(secondBytes, firstBytes);
  assert.equal(first.manifest.schemaVersion, 3);
  assert.ok(first.manifest.files.every((file) => file.visibility === "source-only"));
  assert.deepEqual(
    first.manifest.publicationPolicy,
    createPublicationPolicyDescriptor(mapSeoPublication),
  );
  assert.match(first.manifest.versionKey, /^sha256-[0-9a-f]{64}$/u);
  assert.match(first.manifest.assetDigest, /^sha256-[0-9a-f]{64}$/u);
  assert.equal(first.manifest.assetFileCount, 2_660);
  assert.equal(
    first.manifest.validation.assets.assetDigest,
    first.manifest.assetDigest,
  );
  assert.equal(first.manifest.stats.mapCount, 10);
  assert.equal(first.manifest.stats.poiCount, 4_508);
  assert.equal(first.manifest.stats.uniquePoiCount, 4_508);
  assert.equal(first.manifest.stats.regionCount, 53);
  assert.deepEqual(first.manifest.stats.localizedPoiCountByLocale, {
    "zh-Hant": 4_508,
    en: 4_508,
    ko: 4_508,
  });
  assert.equal(first.manifest.validation.assets.tileSetCount, 10);
  assert.equal(first.manifest.validation.assets.iconCount, 516);
  assert.equal(first.manifest.validation.assets.categoryIconCount, 36);
  assert.equal(first.manifest.validation.assets.markerIconCount, 515);
  assert.equal(first.manifest.validation.assets.markerOnlyIconCount, 480);
  assert.equal(first.manifest.validation.assets.tileAnchorCount, 45);
  assert.equal(first.manifest.validation.assets.tileFileCount, 2_144);
  assert.equal(
    first.manifest.sourceBuild,
    "89ce3984d569ff1a03ee6311d064231211212981",
  );
});

test("publication policy semantics participate in the shared release versionKey", () => {
  const baselinePolicy = createPublicationPolicyDescriptor(mapSeoPublication);
  const changedPublication = structuredClone(mapSeoPublication);
  changedPublication.types[0].indexable = !changedPublication.types[0].indexable;
  const changedPolicy = createPublicationPolicyDescriptor(changedPublication);
  assert.notEqual(changedPolicy.sha256, baselinePolicy.sha256);

  const fixedFiles = [
    { path: "data/aion2-map-data.json", sha256: "a".repeat(64) },
    { path: "data/aion2-map-i18n.json", sha256: "b".repeat(64) },
  ];
  const releaseInput = {
    assetFileCount: 1,
    assetDigest: `sha256-${"c".repeat(64)}`,
  };
  const baselineVersion = createReleaseVersionKey({
    ...releaseInput,
    files: [...fixedFiles, baselinePolicy],
  });
  const changedVersion = createReleaseVersionKey({
    ...releaseInput,
    files: [...fixedFiles, changedPolicy],
  });
  assert.notEqual(changedVersion, baselineVersion);
});

test("changing one byte in a temporary tile changes the release version", async (t) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "aion2-tile-hash-"));
  t.after(() => rm(tempRoot, { recursive: true, force: true }));
  const tileRelativePath = "maps/tiles/verteron/0/0/0.webp";
  const sourceTilePath = path.join(assetsRoot, tileRelativePath);
  const temporaryTilePath = path.join(tempRoot, "0.webp");
  const changedTile = Buffer.from(await readFile(sourceTilePath));
  changedTile[changedTile.byteLength - 1] ^= 0x01;
  await writeFile(temporaryTilePath, changedTile);

  const baseline = await createReleaseManifest({
    mapDataPath,
    i18nPath,
    assetsRoot,
  });
  const changed = await createReleaseManifest({
    mapDataPath,
    i18nPath,
    assetsRoot,
    assetReader: (candidatePath) =>
      path.resolve(candidatePath) === path.resolve(sourceTilePath)
        ? readFile(temporaryTilePath)
        : readFile(candidatePath),
  });

  assert.equal(changed.assetFileCount, baseline.assetFileCount);
  assert.notEqual(changed.assetDigest, baseline.assetDigest);
  assert.notEqual(changed.versionKey, baseline.versionKey);
});

test("committed public release manifest matches the current snapshot", async () => {
  const result = await generateRelease({ projectRoot, check: true });
  assert.equal(result.changed, false);
  assert.equal(
    result.outputPath,
    path.join(projectRoot, "public/map-assets/manifest.json"),
  );
});

test("versionKey hashes file content and ignores mtimes", async (t) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "aion2-map-hash-"));
  t.after(() => rm(tempRoot, { recursive: true, force: true }));
  const tempMapDataPath = path.join(tempRoot, "aion2-map-data.json");
  const tempI18nPath = path.join(tempRoot, "aion2-map-i18n.json");
  const [mapBytes, i18nBytes] = await Promise.all([
    readFile(mapDataPath),
    readFile(i18nPath),
  ]);
  await Promise.all([
    writeFile(tempMapDataPath, mapBytes),
    writeFile(tempI18nPath, i18nBytes),
  ]);

  const before = await createReleaseManifest({
    mapDataPath: tempMapDataPath,
    i18nPath: tempI18nPath,
    assetsRoot,
  });
  const changedTime = new Date("2040-01-01T00:00:00.000Z");
  await Promise.all([
    utimes(tempMapDataPath, changedTime, changedTime),
    utimes(tempI18nPath, changedTime, changedTime),
  ]);
  const after = await createReleaseManifest({
    mapDataPath: tempMapDataPath,
    i18nPath: tempI18nPath,
    assetsRoot,
  });

  assert.equal(after.versionKey, before.versionKey);
  assert.deepEqual(after, before);
});

test("validation rejects duplicate POI ids and missing resources", async () => {
  const { mapData, i18n } = await loadFixtures();
  const duplicateData = structuredClone(mapData);
  duplicateData.markersByMap.World_L_A[1].id =
    duplicateData.markersByMap.World_L_A[0].id;

  await assert.rejects(
    validateMapRelease({
      mapData: duplicateData,
      i18n,
      assetsRoot,
    }),
    (error) =>
      error instanceof MapDataValidationError &&
      error.message.includes("Duplicate POI id"),
  );

  const missingAssetData = structuredClone(mapData);
  missingAssetData.categories[0].subtypes[0].iconUrl =
    "/icons/does-not-exist.webp";
  await assert.rejects(
    validateMapRelease({
      mapData: missingAssetData,
      i18n,
      assetsRoot,
    }),
    (error) =>
      error instanceof MapDataValidationError &&
      error.message.includes("does-not-exist.webp"),
  );
});

test("validation fails when a marker-specific icon is missing", async () => {
  const { mapData, i18n } = await loadFixtures();
  const markerIconData = structuredClone(mapData);
  const categoryIconUrls = new Set(
    markerIconData.categories
      .flatMap((category) => category.subtypes ?? [])
      .flatMap((subtype) => [subtype.iconUrl, subtype.darkIconUrl])
      .filter(Boolean),
  );
  const marker = Object.values(markerIconData.markersByMap)
    .flat()
    .find(
      (candidate) =>
        candidate.iconUrl && !categoryIconUrls.has(candidate.iconUrl),
    );
  assert.ok(marker, "expected at least one marker-only icon fixture");
  marker.iconUrl = "/icons/deleted-marker-specific-icon.webp";

  await assert.rejects(
    validateMapRelease({ mapData: markerIconData, i18n, assetsRoot }),
    (error) =>
      error instanceof MapDataValidationError &&
      error.message.includes("deleted-marker-specific-icon.webp") &&
      error.message.includes("is missing"),
  );
});

test("validation blocks a release whose counts suddenly drop", async () => {
  const { mapData, i18n } = await loadFixtures();
  const previousManifest = {
    stats: {
      mapCount: 12,
      poiCount: 5_000,
      regionCount: 70,
    },
  };

  await assert.rejects(
    validateMapRelease({
      mapData,
      i18n,
      assetsRoot,
      minimums: BASELINE_MINIMUMS,
      previousManifest,
      maximumDropRatio: 0.1,
    }),
    (error) =>
      error instanceof MapDataValidationError &&
      error.message.includes("above the 10.00% limit"),
  );
});

test("validation rejects build drift and incomplete locale coverage", async () => {
  const { mapData, i18n } = await loadFixtures();
  const invalidI18n = structuredClone(i18n);
  invalidI18n.source.tcImbaBuild = "different-build";
  delete invalidI18n.locales.ko.markers[
    mapData.markersByMap.World_L_A[0].id
  ];

  await assert.rejects(
    validateMapRelease({ mapData, i18n: invalidI18n, assetsRoot }),
    (error) =>
      error instanceof MapDataValidationError &&
      error.message.includes("Source build mismatch") &&
      error.message.includes("Locale ko is missing POI text"),
  );
});
