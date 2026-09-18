import { createHash } from "node:crypto";
import { access, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  mapSeoPublication,
  serializeMapSeoPublicationPolicy,
} from "../../app/map-seo-publication.ts";
import {
  RUNTIME_BUNDLE_SCHEMA_VERSION,
  createRuntimeBundleArtifacts,
} from "./bundles.mjs";
import { createPublicMapPayloadArtifacts } from "./public-projection.mjs";

export const RELEASE_SCHEMA_VERSION = 3;
export const REQUIRED_LOCALES = Object.freeze(["zh-Hant", "en", "ko"]);
export const BASELINE_MINIMUMS = Object.freeze({
  mapCount: 10,
  poiCount: 4_508,
  regionCount: 53,
});
export const DEFAULT_MAXIMUM_DROP_RATIO = 0.1;

const DATA_FILE = "aion2-map-data.json";
const I18N_FILE = "aion2-map-i18n.json";
export const PUBLICATION_POLICY_FILE = "policy/map-seo-publication.json";

export class MapDataValidationError extends Error {
  constructor(issues) {
    super(`Map data validation failed:\n- ${issues.join("\n- ")}`);
    this.name = "MapDataValidationError";
    this.issues = issues;
  }
}

const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");

export function createPublicationPolicyDescriptor(publicationPolicy = mapSeoPublication) {
  const bytes = Buffer.from(serializeMapSeoPublicationPolicy(publicationPolicy), "utf8");
  return {
    path: PUBLICATION_POLICY_FILE,
    visibility: "source-only",
    bytes: bytes.byteLength,
    sha256: sha256(bytes),
  };
}

export function createReleaseVersionKey({ files, assetFileCount, assetDigest }) {
  return `sha256-${sha256(JSON.stringify({
    schemaVersion: RELEASE_SCHEMA_VERSION,
    runtimeBundleSchemaVersion: RUNTIME_BUNDLE_SCHEMA_VERSION,
    files: files.map(({ path: filePath, sha256: fileHash }) => ({
      path: filePath,
      sha256: fileHash,
    })),
    assets: { assetFileCount, assetDigest },
  }))}`;
}

const isRecord = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const ratio = (previous, current) =>
  previous > 0 && current < previous ? (previous - current) / previous : 0;

const normalizeRelativeAssetPath = (assetUrl, issues, label) => {
  if (!isNonEmptyString(assetUrl) || !assetUrl.startsWith("/")) {
    issues.push(`${label} must be a root-relative asset URL.`);
    return null;
  }

  const cleanPath = assetUrl.split(/[?#]/u, 1)[0].replaceAll("\\", "/");
  const relativePath = cleanPath.slice(1);
  if (
    relativePath.length === 0 ||
    relativePath.split("/").some((segment) => segment === "..")
  ) {
    issues.push(`${label} contains an unsafe asset path: ${assetUrl}`);
    return null;
  }
  const normalizedPath = path.posix.normalize(relativePath);
  if (normalizedPath === "." || normalizedPath.startsWith("../")) {
    issues.push(`${label} contains an unsafe asset path: ${assetUrl}`);
    return null;
  }
  return normalizedPath;
};

const hashAsset = async (
  assetsRoot,
  relativePath,
  issues,
  label,
  assetReader,
) => {
  const root = path.resolve(assetsRoot);
  const candidate = path.resolve(root, relativePath);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
    issues.push(`${label} resolves outside the map asset root: ${relativePath}`);
    return null;
  }

  try {
    const value = await assetReader(candidate);
    const bytes = Buffer.isBuffer(value) ? value : Buffer.from(value);
    if (bytes.byteLength === 0) {
      issues.push(`${label} is not a non-empty file: /${relativePath}`);
      return null;
    }
    return {
      path: relativePath,
      sha256: sha256(bytes),
    };
  } catch {
    issues.push(`${label} is missing: /${relativePath}`);
    return null;
  }
};

const compareAgainstPreviousRelease = (
  stats,
  previousManifest,
  maximumDropRatio,
  issues,
) => {
  if (!previousManifest) return;
  if (!isRecord(previousManifest.stats)) {
    issues.push("The previous release manifest does not contain valid stats.");
    return;
  }

  for (const metric of ["mapCount", "poiCount", "regionCount"]) {
    const previous = previousManifest.stats[metric];
    const current = stats[metric];
    if (!Number.isFinite(previous) || previous < 0) {
      issues.push(`The previous release has an invalid ${metric}.`);
      continue;
    }

    const drop = ratio(previous, current);
    if (drop > maximumDropRatio) {
      issues.push(
        `${metric} dropped from ${previous} to ${current} (${(
          drop * 100
        ).toFixed(2)}%), above the ${(maximumDropRatio * 100).toFixed(2)}% limit.`,
      );
    }
  }
};

export async function validateMapRelease({
  mapData,
  i18n,
  assetsRoot,
  minimums = BASELINE_MINIMUMS,
  previousManifest,
  maximumDropRatio = DEFAULT_MAXIMUM_DROP_RATIO,
  assetReader = readFile,
}) {
  const issues = [];

  if (!isRecord(mapData)) issues.push("Map data must be a JSON object.");
  if (!isRecord(i18n)) issues.push("Map i18n data must be a JSON object.");
  if (issues.length > 0) throw new MapDataValidationError(issues);

  const maps = Array.isArray(mapData.maps) ? mapData.maps : [];
  const categories = Array.isArray(mapData.categories) ? mapData.categories : [];
  const markersByMap = isRecord(mapData.markersByMap)
    ? mapData.markersByMap
    : {};
  const regionsByMap = isRecord(mapData.regionsByMap)
    ? mapData.regionsByMap
    : {};
  const locales = isRecord(i18n.locales) ? i18n.locales : {};

  if (!Array.isArray(mapData.maps)) issues.push("maps must be an array.");
  if (!Array.isArray(mapData.categories)) {
    issues.push("categories must be an array.");
  }
  if (!isRecord(mapData.markersByMap)) {
    issues.push("markersByMap must be an object.");
  }
  if (!isRecord(mapData.regionsByMap)) {
    issues.push("regionsByMap must be an object.");
  }

  const dataBuild = mapData.source?.build;
  const i18nBuild = i18n.source?.tcImbaBuild;
  if (!isNonEmptyString(dataBuild)) {
    issues.push("Map data source.build is missing.");
  }
  if (!isNonEmptyString(i18nBuild)) {
    issues.push("Map i18n source.tcImbaBuild is missing.");
  }
  if (dataBuild !== i18nBuild) {
    issues.push(
      `Source build mismatch: map data=${String(dataBuild)}, i18n=${String(i18nBuild)}.`,
    );
  }

  const mapNames = new Set();
  const mapIds = new Set();
  const mapSlugs = new Set();
  const poiIds = new Set();
  const allPois = [];
  let regionCount = 0;

  for (const map of maps) {
    if (!isRecord(map) || !isNonEmptyString(map.name)) {
      issues.push("Every map must have a non-empty name.");
      continue;
    }
    if (mapNames.has(map.name)) issues.push(`Duplicate map name: ${map.name}.`);
    mapNames.add(map.name);

    if (!isNonEmptyString(map.id) || mapIds.has(map.id)) {
      issues.push(`Map ${map.name} has a missing or duplicate id.`);
    } else {
      mapIds.add(map.id);
    }
    if (!isNonEmptyString(map.slug) || mapSlugs.has(map.slug)) {
      issues.push(`Map ${map.name} has a missing or duplicate slug.`);
    } else {
      mapSlugs.add(map.slug);
    }

    const pois = markersByMap[map.name];
    const regions = regionsByMap[map.name];
    if (!Array.isArray(pois)) {
      issues.push(`markersByMap.${map.name} must be an array.`);
      continue;
    }
    if (!Array.isArray(regions)) {
      issues.push(`regionsByMap.${map.name} must be an array.`);
      continue;
    }
    if (map.markerCount !== pois.length) {
      issues.push(
        `Map ${map.name} markerCount=${String(map.markerCount)} but contains ${pois.length} POIs.`,
      );
    }
    if (map.regionCount !== regions.length) {
      issues.push(
        `Map ${map.name} regionCount=${String(map.regionCount)} but contains ${regions.length} regions.`,
      );
    }

    regionCount += regions.length;
    for (const poi of pois) {
      allPois.push(poi);
      if (!isRecord(poi) || !isNonEmptyString(poi.id)) {
        issues.push(`Map ${map.name} contains a POI without an id.`);
        continue;
      }
      if (poiIds.has(poi.id)) issues.push(`Duplicate POI id: ${poi.id}.`);
      poiIds.add(poi.id);
      if (poi.mapName !== map.name) {
        issues.push(
          `POI ${poi.id} belongs to ${String(poi.mapName)} but is stored under ${map.name}.`,
        );
      }
      if (!Number.isFinite(poi.x) || !Number.isFinite(poi.y)) {
        issues.push(`POI ${poi.id} has invalid map coordinates.`);
      }
    }
  }

  for (const mapName of Object.keys(markersByMap)) {
    if (!mapNames.has(mapName)) {
      issues.push(`markersByMap contains unknown map ${mapName}.`);
    }
  }
  for (const mapName of Object.keys(regionsByMap)) {
    if (!mapNames.has(mapName)) {
      issues.push(`regionsByMap contains unknown map ${mapName}.`);
    }
  }

  const actualLocales = Object.keys(locales);
  for (const locale of REQUIRED_LOCALES) {
    if (!actualLocales.includes(locale) || !isRecord(locales[locale])) {
      issues.push(`Required locale ${locale} is missing.`);
      continue;
    }

    const localeData = locales[locale];
    for (const map of maps) {
      const translation = localeData.maps?.[map.name];
      if (
        !isRecord(translation) ||
        !isNonEmptyString(translation.name) ||
        !isNonEmptyString(translation.description)
      ) {
        issues.push(`Locale ${locale} is missing complete map text for ${map.name}.`);
      }
    }
    for (const poi of allPois) {
      const translation = localeData.markers?.[poi.id];
      if (
        !isRecord(translation) ||
        !isNonEmptyString(translation.name) ||
        typeof translation.description !== "string"
      ) {
        issues.push(`Locale ${locale} is missing POI text for ${poi.id}.`);
      }
    }
    for (const category of categories) {
      if (!isNonEmptyString(localeData.categories?.[category.name])) {
        issues.push(
          `Locale ${locale} is missing category text for ${String(category.name)}.`,
        );
      }
      for (const subtype of Array.isArray(category.subtypes)
        ? category.subtypes
        : []) {
        if (!isNonEmptyString(localeData.subtypes?.[subtype.name])) {
          issues.push(
            `Locale ${locale} is missing subtype text for ${String(subtype.name)}.`,
          );
        }
      }
    }
  }

  const stats = {
    mapCount: maps.length,
    poiCount: allPois.length,
    uniquePoiCount: poiIds.size,
    regionCount,
    localizedMapCountByLocale: Object.fromEntries(
      REQUIRED_LOCALES.map((locale) => [
        locale,
        maps.filter((map) => isRecord(locales[locale]?.maps?.[map.name])).length,
      ]),
    ),
    localizedPoiCountByLocale: Object.fromEntries(
      REQUIRED_LOCALES.map((locale) => [
        locale,
        allPois.filter((poi) => isRecord(locales[locale]?.markers?.[poi.id])).length,
      ]),
    ),
  };

  for (const [metric, minimum] of Object.entries(minimums)) {
    if (!Number.isFinite(minimum) || minimum < 0) {
      issues.push(`Invalid configured minimum for ${metric}.`);
    } else if (!Number.isFinite(stats[metric]) || stats[metric] < minimum) {
      issues.push(
        `${metric}=${String(stats[metric])} is below the required minimum ${minimum}.`,
      );
    }
  }
  if (stats.poiCount !== stats.uniquePoiCount) {
    issues.push(
      `Expected all ${stats.poiCount} POIs to be unique, found ${stats.uniquePoiCount}.`,
    );
  }
  if (
    !Number.isFinite(maximumDropRatio) ||
    maximumDropRatio < 0 ||
    maximumDropRatio >= 1
  ) {
    issues.push("maximumDropRatio must be at least 0 and less than 1.");
  } else {
    compareAgainstPreviousRelease(
      stats,
      previousManifest,
      maximumDropRatio,
      issues,
    );
  }

  const assetReferences = new Map();
  const categoryIconPaths = new Set();
  const markerIconPaths = new Set();
  const tilePaths = new Set();
  let tileAnchorCount = 0;
  if (!isNonEmptyString(assetsRoot)) {
    issues.push("assetsRoot is required for release validation.");
  } else {
    const addAssetReference = (assetUrl, label, collection) => {
      const relativePath = normalizeRelativeAssetPath(
        assetUrl,
        issues,
        label,
      );
      if (!relativePath) return;
      collection.add(relativePath);
      if (!assetReferences.has(relativePath)) {
        assetReferences.set(relativePath, label);
      }
    };

    for (const category of categories) {
      for (const subtype of Array.isArray(category.subtypes)
        ? category.subtypes
        : []) {
        if (isNonEmptyString(subtype.iconUrl)) {
          addAssetReference(
            subtype.iconUrl,
            `Referenced subtype icon ${subtype.iconUrl}`,
            categoryIconPaths,
          );
        }
        if (isNonEmptyString(subtype.darkIconUrl)) {
          addAssetReference(
            subtype.darkIconUrl,
            `Referenced subtype icon ${subtype.darkIconUrl}`,
            categoryIconPaths,
          );
        }
      }
    }
    for (const poi of allPois) {
      if (isNonEmptyString(poi.iconUrl)) {
        addAssetReference(
          poi.iconUrl,
          `POI ${poi.id} icon ${poi.iconUrl}`,
          markerIconPaths,
        );
      }
      if (isNonEmptyString(poi.darkIconUrl)) {
        addAssetReference(
          poi.darkIconUrl,
          `POI ${poi.id} dark icon ${poi.darkIconUrl}`,
          markerIconPaths,
        );
      }
    }

    for (const map of maps) {
      if (
        !Number.isInteger(map.tileMinZoom) ||
        !Number.isInteger(map.tileMaxZoom) ||
        map.tileMinZoom < 0 ||
        map.tileMaxZoom < map.tileMinZoom
      ) {
        issues.push(`Map ${map.name} has an invalid tile zoom range.`);
        continue;
      }
      if (
        !Number.isInteger(map.width) ||
        !Number.isInteger(map.height) ||
        !Number.isInteger(map.tileSize) ||
        map.width <= 0 ||
        map.height <= 0 ||
        map.tileSize <= 0
      ) {
        issues.push(`Map ${map.name} has invalid tile dimensions.`);
        continue;
      }
      if (
        !isNonEmptyString(map.tileTemplate) ||
        !map.tileTemplate.includes("{z}") ||
        !map.tileTemplate.includes("{x}") ||
        !map.tileTemplate.includes("{y}")
      ) {
        issues.push(`Map ${map.name} has an invalid tile template.`);
        continue;
      }

      for (let zoom = map.tileMinZoom; zoom <= map.tileMaxZoom; zoom += 1) {
        const scaleDivisor =
          map.tileSize * 2 ** (map.tileMaxZoom - zoom);
        const columns = Math.ceil(map.width / scaleDivisor);
        const rows = Math.ceil(map.height / scaleDivisor);
        tileAnchorCount += 1;

        for (let x = 0; x < columns; x += 1) {
          for (let y = 0; y < rows; y += 1) {
            const tileUrl = map.tileTemplate
              .replace("{z}", String(zoom))
              .replace("{x}", String(x))
              .replace("{y}", String(y));
            addAssetReference(
              tileUrl,
              `Map ${map.name} tile z${zoom}/${x}/${y}`,
              tilePaths,
            );
          }
        }
      }
    }
  }

  if (issues.length > 0) throw new MapDataValidationError(issues);

  const assetFiles = [];
  for (const relativePath of [...assetReferences.keys()].sort()) {
    const descriptor = await hashAsset(
      assetsRoot,
      relativePath,
      issues,
      assetReferences.get(relativePath),
      assetReader,
    );
    if (descriptor) assetFiles.push(descriptor);
  }

  if (issues.length > 0) throw new MapDataValidationError(issues);

  const iconPaths = new Set([...categoryIconPaths, ...markerIconPaths]);
  const assetDigest = `sha256-${sha256(JSON.stringify(assetFiles))}`;

  return {
    sourceBuild: dataBuild,
    stats,
    assetChecks: {
      assetFileCount: assetFiles.length,
      assetDigest,
      iconCount: iconPaths.size,
      categoryIconCount: categoryIconPaths.size,
      markerIconCount: markerIconPaths.size,
      markerOnlyIconCount: [...markerIconPaths].filter(
        (iconPath) => !categoryIconPaths.has(iconPath),
      ).length,
      tileSetCount: maps.length,
      tileAnchorCount,
      tileFileCount: tilePaths.size,
    },
    maps: maps.map((map) => ({
      key: map.name,
      slug: map.slug,
      markerCount: markersByMap[map.name].length,
      regionCount: regionsByMap[map.name].length,
      tileMinZoom: map.tileMinZoom,
      tileMaxZoom: map.tileMaxZoom,
    })),
  };
}

export async function createReleaseManifest({
  mapDataPath,
  i18nPath,
  assetsRoot,
  previousManifest,
  minimums = BASELINE_MINIMUMS,
  maximumDropRatio = DEFAULT_MAXIMUM_DROP_RATIO,
  assetReader = readFile,
  publicationPolicy = mapSeoPublication,
}) {
  const [mapDataBuffer, i18nBuffer] = await Promise.all([
    readFile(mapDataPath),
    readFile(i18nPath),
  ]);

  let mapData;
  let i18n;
  try {
    mapData = JSON.parse(mapDataBuffer.toString("utf8"));
  } catch (error) {
    throw new MapDataValidationError([
      `Unable to parse ${mapDataPath}: ${error.message}`,
    ]);
  }
  try {
    i18n = JSON.parse(i18nBuffer.toString("utf8"));
  } catch (error) {
    throw new MapDataValidationError([
      `Unable to parse ${i18nPath}: ${error.message}`,
    ]);
  }

  const validation = await validateMapRelease({
    mapData,
    i18n,
    assetsRoot,
    minimums,
    previousManifest,
    maximumDropRatio,
    assetReader,
  });
  const files = [
    {
      path: `data/${DATA_FILE}`,
      visibility: "source-only",
      bytes: mapDataBuffer.byteLength,
      sha256: sha256(mapDataBuffer),
    },
    {
      path: `data/${I18N_FILE}`,
      visibility: "source-only",
      bytes: i18nBuffer.byteLength,
      sha256: sha256(i18nBuffer),
    },
    createPublicationPolicyDescriptor(publicationPolicy),
  ];
  const versionKey = createReleaseVersionKey({
    files,
    assetFileCount: validation.assetChecks.assetFileCount,
    assetDigest: validation.assetChecks.assetDigest,
  });
  const runtimeBundles = createRuntimeBundleArtifacts({
    mapData,
    i18n,
    versionKey,
    locales: REQUIRED_LOCALES,
  });

  return {
    schemaVersion: RELEASE_SCHEMA_VERSION,
    versionKey,
    sourceBuild: validation.sourceBuild,
    assetFileCount: validation.assetChecks.assetFileCount,
    assetDigest: validation.assetChecks.assetDigest,
    files,
    publicationPolicy: createPublicationPolicyDescriptor(publicationPolicy),
    locales: [...REQUIRED_LOCALES],
    stats: validation.stats,
    maps: validation.maps,
    runtimeBundles: runtimeBundles.manifest,
    validation: {
      minimums: { ...minimums },
      maximumDropRatio,
      assets: validation.assetChecks,
    },
  };
}

export const serializeManifest = (manifest) =>
  `${JSON.stringify(manifest, null, 2)}\n`;

const readPreviousManifest = async (outputPath) => {
  try {
    return JSON.parse(await readFile(outputPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw new MapDataValidationError([
      `Unable to read the previous manifest at ${outputPath}: ${error.message}`,
    ]);
  }
};

const ensureRuntimeBundles = async ({
  assetsRoot,
  artifacts,
  check,
}) => {
  const issues = [];
  let changed = false;

  for (const artifact of artifacts) {
    const targetPath = path.resolve(assetsRoot, artifact.path);
    const resolvedAssetsRoot = path.resolve(assetsRoot);
    if (!targetPath.startsWith(`${resolvedAssetsRoot}${path.sep}`)) {
      issues.push(`Runtime bundle path escapes the asset root: ${artifact.path}.`);
      continue;
    }

    let existing;
    try {
      existing = await readFile(targetPath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        issues.push(
          `Unable to read runtime bundle ${artifact.path}: ${error.message}`,
        );
        continue;
      }
    }

    if (existing?.equals(artifact.buffer)) continue;
    if (check) {
      issues.push(
        `Runtime bundle is missing or stale at ${artifact.path}. Regenerate the release.`,
      );
      continue;
    }

    await mkdir(path.dirname(targetPath), { recursive: true });
    const temporaryPath = `${targetPath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, artifact.buffer);
    await rename(temporaryPath, targetPath);
    changed = true;
  }

  if (issues.length > 0) throw new MapDataValidationError(issues);
  return changed;
};

export async function generateRelease({
  projectRoot = process.cwd(),
  outputPath = path.join(projectRoot, "public/map-assets/manifest.json"),
  check = false,
  minimums = BASELINE_MINIMUMS,
  maximumDropRatio = DEFAULT_MAXIMUM_DROP_RATIO,
} = {}) {
  const assetsRoot = path.join(projectRoot, "public/map-assets");
  const dataRoot = path.join(projectRoot, "data/map-source");
  const previousManifest = await readPreviousManifest(outputPath);
  const manifest = await createReleaseManifest({
    mapDataPath: path.join(dataRoot, DATA_FILE),
    i18nPath: path.join(dataRoot, I18N_FILE),
    assetsRoot,
    previousManifest,
    minimums,
    maximumDropRatio,
  });
  const serialized = serializeManifest(manifest);
  const previousSerialized = previousManifest
    ? serializeManifest(previousManifest)
    : undefined;

  const [mapData, i18n] = await Promise.all([
    readFile(path.join(dataRoot, DATA_FILE), "utf8").then(JSON.parse),
    readFile(path.join(dataRoot, I18N_FILE), "utf8").then(JSON.parse),
  ]);
  const runtimeBundles = createRuntimeBundleArtifacts({
    mapData,
    i18n,
    versionKey: manifest.versionKey,
    locales: manifest.locales,
  });
  const publicPayloads = createPublicMapPayloadArtifacts({ mapData, i18n });

  if (check) {
    if (!previousManifest) {
      throw new MapDataValidationError([
        `Release manifest is missing at ${outputPath}. Run the release command first.`,
      ]);
    }
    if (serialized !== previousSerialized) {
      throw new MapDataValidationError([
        `Release manifest is stale at ${outputPath}. Regenerate it from the current data.`,
      ]);
    }
    await ensureRuntimeBundles({
      assetsRoot,
      artifacts: runtimeBundles.artifacts,
      check: true,
    });
    await ensureRuntimeBundles({
      assetsRoot: path.join(projectRoot, "public"),
      artifacts: publicPayloads,
      check: true,
    });
    return { manifest, changed: false, outputPath };
  }

  const [bundlesChanged, publicPayloadsChanged] = await Promise.all([
    ensureRuntimeBundles({
      assetsRoot,
      artifacts: runtimeBundles.artifacts,
      check: false,
    }),
    ensureRuntimeBundles({
      assetsRoot: path.join(projectRoot, "public"),
      artifacts: publicPayloads,
      check: false,
    }),
  ]);

  if (
    serialized === previousSerialized &&
    !bundlesChanged &&
    !publicPayloadsChanged
  ) {
    return { manifest, changed: false, outputPath };
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, serialized, "utf8");
  await rename(temporaryPath, outputPath);
  await access(outputPath);
  return { manifest, changed: true, outputPath };
}
