import { createHash } from "node:crypto";

import {
  projectPublicMapData,
  projectPublicMapI18n,
} from "./public-projection.mjs";

export const RUNTIME_BUNDLE_SCHEMA_VERSION = 4;

const isRecord = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");

const runtimeReleasePrefix = (versionKey) => `/releases/${versionKey}`;

const isPinnedRuntimeAssetPath = (
  value,
  { versionKey, directory, allowEmpty = false },
) => {
  if (allowEmpty && value === "") return true;
  return (
    isNonEmptyString(value) &&
    value.startsWith(`${runtimeReleasePrefix(versionKey)}/${directory}/`) &&
    !value.includes("\\") &&
    !/[?#]/u.test(value) &&
    !value.split("/").some((segment) => segment === "." || segment === "..")
  );
};

const pinRuntimeAssetPath = (
  value,
  { versionKey, directory, allowEmpty = false, field },
) => {
  if (allowEmpty && value === "") return "";
  if (
    !isNonEmptyString(value) ||
    !value.startsWith(`/${directory}/`) ||
    value.includes("\\") ||
    /[?#]/u.test(value) ||
    value.split("/").some((segment) => segment === "." || segment === "..")
  ) {
    throw new RuntimeBundleValidationError([
      `${field} must be a safe /${directory}/ asset path.`,
    ]);
  }
  return `${runtimeReleasePrefix(versionKey)}${value}`;
};

const createVersionedRuntimeMapData = (mapData, versionKey) => ({
  ...mapData,
  maps: mapData.maps.map((map) => ({
    ...map,
    tileTemplate: pinRuntimeAssetPath(map.tileTemplate, {
      versionKey,
      directory: "maps",
      field: `maps.${map.name}.tileTemplate`,
    }),
  })),
  categories: mapData.categories.map((category) => ({
    ...category,
    subtypes: category.subtypes.map((subtype) => ({
      ...subtype,
      iconUrl: pinRuntimeAssetPath(subtype.iconUrl, {
        versionKey,
        directory: "icons",
        allowEmpty: true,
        field: `categories.${category.name}.${subtype.name}.iconUrl`,
      }),
      darkIconUrl: pinRuntimeAssetPath(subtype.darkIconUrl, {
        versionKey,
        directory: "icons",
        allowEmpty: true,
        field: `categories.${category.name}.${subtype.name}.darkIconUrl`,
      }),
    })),
  })),
  markersByMap: Object.fromEntries(
    Object.entries(mapData.markersByMap).map(([mapName, markers]) => [
      mapName,
      markers.map((marker) => ({
        ...marker,
        iconUrl: pinRuntimeAssetPath(marker.iconUrl, {
          versionKey,
          directory: "icons",
          allowEmpty: true,
          field: `markers.${marker.id}.iconUrl`,
        }),
        darkIconUrl: pinRuntimeAssetPath(marker.darkIconUrl, {
          versionKey,
          directory: "icons",
          allowEmpty: true,
          field: `markers.${marker.id}.darkIconUrl`,
        }),
      })),
    ]),
  ),
});

export class RuntimeBundleValidationError extends Error {
  constructor(issues) {
    super(`Runtime map bundle validation failed:\n- ${issues.join("\n- ")}`);
    this.name = "RuntimeBundleValidationError";
    this.issues = issues;
  }
}

export const serializeRuntimeBundle = (bundle) =>
  `${JSON.stringify(bundle)}\n`;

export function validateRuntimeBundleIdentity(
  bundle,
  { versionKey, sourceBuild, locale, mapName, mapSlug },
) {
  const issues = [];

  if (!isRecord(bundle)) {
    throw new RuntimeBundleValidationError([
      "The runtime bundle must be a JSON object.",
    ]);
  }

  if (bundle.schemaVersion !== RUNTIME_BUNDLE_SCHEMA_VERSION) {
    issues.push(
      `schemaVersion must be ${RUNTIME_BUNDLE_SCHEMA_VERSION}, received ${String(bundle.schemaVersion)}.`,
    );
  }
  if (bundle.versionKey !== versionKey) {
    issues.push(
      `versionKey mismatch: expected ${String(versionKey)}, received ${String(bundle.versionKey)}.`,
    );
  }
  if (bundle.sourceBuild !== sourceBuild) {
    issues.push(
      `sourceBuild mismatch: expected ${String(sourceBuild)}, received ${String(bundle.sourceBuild)}.`,
    );
  }
  if (bundle.locale !== locale) {
    issues.push(
      `locale mismatch: expected ${String(locale)}, received ${String(bundle.locale)}.`,
    );
  }
  if (bundle.mapName !== mapName) {
    issues.push(
      `mapName mismatch: expected ${String(mapName)}, received ${String(bundle.mapName)}.`,
    );
  }
  if (bundle.mapSlug !== mapSlug) {
    issues.push(
      `mapSlug mismatch: expected ${String(mapSlug)}, received ${String(bundle.mapSlug)}.`,
    );
  }

  if (!Array.isArray(bundle.maps) || bundle.maps.length === 0) {
    issues.push("maps must be a non-empty array.");
  }
  if (!Array.isArray(bundle.categories)) {
    issues.push("categories must be an array.");
  }
  if (!Array.isArray(bundle.markers)) {
    issues.push("markers must be an array.");
  }
  if (!Array.isArray(bundle.regions)) {
    issues.push("regions must be an array.");
  }
  if (!isRecord(bundle.text)) {
    issues.push("text must be an object.");
  } else {
    for (const field of [
      "maps",
      "categories",
      "subtypes",
      "markers",
      "regions",
    ]) {
      if (!isRecord(bundle.text[field])) {
        issues.push(`text.${field} must be an object.`);
      }
    }
  }

  if (Array.isArray(bundle.maps)) {
    const selectedMap = bundle.maps.find((map) => map?.name === mapName);
    if (!selectedMap || selectedMap.slug !== mapSlug) {
      issues.push(
        `maps does not contain ${String(mapName)} with slug ${String(mapSlug)}.`,
      );
    }
    for (const map of bundle.maps) {
      if (!isPinnedRuntimeAssetPath(map?.tileTemplate, {
        versionKey,
        directory: "maps",
      })) {
        issues.push(
          `maps.${String(map?.name)}.tileTemplate is not pinned to ${String(versionKey)}.`,
        );
      }
    }
  }
  if (Array.isArray(bundle.categories)) {
    for (const category of bundle.categories) {
      for (const subtype of Array.isArray(category?.subtypes) ? category.subtypes : []) {
        for (const field of ["iconUrl", "darkIconUrl"]) {
          if (!isPinnedRuntimeAssetPath(subtype?.[field], {
            versionKey,
            directory: "icons",
            allowEmpty: true,
          })) {
            issues.push(
              `categories.${String(category?.name)}.${String(subtype?.name)}.${field} is not pinned to ${String(versionKey)}.`,
            );
          }
        }
      }
    }
  }
  if (
    Array.isArray(bundle.markers) &&
    bundle.markers.some((marker) => marker?.mapName !== mapName)
  ) {
    issues.push(`markers contains an item outside ${String(mapName)}.`);
  }
  if (Array.isArray(bundle.markers)) {
    for (const marker of bundle.markers) {
      for (const field of ["iconUrl", "darkIconUrl"]) {
        if (!isPinnedRuntimeAssetPath(marker?.[field], {
          versionKey,
          directory: "icons",
          allowEmpty: true,
        })) {
          issues.push(
            `markers.${String(marker?.id)}.${field} is not pinned to ${String(versionKey)}.`,
          );
        }
      }
    }
  }

  if (issues.length > 0) {
    throw new RuntimeBundleValidationError(issues);
  }
  return bundle;
}

const createRuntimeBundle = ({
  mapData,
  i18n,
  versionKey,
  locale,
  map,
}) => {
  const localeText = i18n.locales[locale];
  const markers = mapData.markersByMap[map.name];
  const regions = mapData.regionsByMap[map.name];
  const markerText = Object.fromEntries(
    markers.map((marker) => [marker.id, localeText.markers[marker.id]]),
  );

  const bundle = {
    schemaVersion: RUNTIME_BUNDLE_SCHEMA_VERSION,
    versionKey,
    sourceBuild: mapData.source.build,
    locale,
    mapName: map.name,
    mapSlug: map.slug,
    maps: mapData.maps,
    categories: mapData.categories,
    markers,
    regions,
    text: {
      maps: localeText.maps,
      categories: localeText.categories,
      subtypes: localeText.subtypes,
      markers: markerText,
      regions: localeText.regions[map.name] ?? {},
    },
  };

  validateRuntimeBundleIdentity(bundle, {
    versionKey,
    sourceBuild: mapData.source.build,
    locale,
    mapName: map.name,
    mapSlug: map.slug,
  });

  if (bundle.markers.length !== map.markerCount) {
    throw new RuntimeBundleValidationError([
      `${map.name} contains ${bundle.markers.length} markers but declares ${String(map.markerCount)}.`,
    ]);
  }
  if (bundle.regions.length !== map.regionCount) {
    throw new RuntimeBundleValidationError([
      `${map.name} contains ${bundle.regions.length} regions but declares ${String(map.regionCount)}.`,
    ]);
  }
  if (
    Object.keys(bundle.text.markers).length !== bundle.markers.length ||
    bundle.markers.some(
      (marker) => !isRecord(bundle.text.markers[marker.id]),
    )
  ) {
    throw new RuntimeBundleValidationError([
      `${locale}/${map.name} does not contain exactly one translation for every marker.`,
    ]);
  }

  return bundle;
};

export function createRuntimeBundleArtifacts({
  mapData,
  i18n,
  versionKey,
  locales,
}) {
  if (!isRecord(mapData) || !isRecord(i18n)) {
    throw new RuntimeBundleValidationError([
      "Map data and map i18n must both be JSON objects.",
    ]);
  }
  if (!isNonEmptyString(versionKey)) {
    throw new RuntimeBundleValidationError(["versionKey is required."]);
  }
  if (!Array.isArray(locales) || locales.length === 0) {
    throw new RuntimeBundleValidationError([
      "At least one runtime bundle locale is required.",
    ]);
  }

  const runtimeMapData = createVersionedRuntimeMapData(
    projectPublicMapData(mapData),
    versionKey,
  );
  const runtimeI18n = projectPublicMapI18n(i18n);

  const basePath = `bundles/${versionKey}`;
  const entries = {};
  const artifacts = [];

  for (const locale of locales) {
    if (!isRecord(runtimeI18n.locales?.[locale])) {
      throw new RuntimeBundleValidationError([
        `Locale ${String(locale)} is not present in the map i18n source.`,
      ]);
    }
    entries[locale] = {};

    for (const map of runtimeMapData.maps) {
      const bundle = createRuntimeBundle({
        mapData: runtimeMapData,
        i18n: runtimeI18n,
        versionKey,
        locale,
        map,
      });
      const buffer = Buffer.from(serializeRuntimeBundle(bundle), "utf8");
      const bundlePath = `${basePath}/${locale}/${map.slug}.json`;
      const descriptor = {
        path: bundlePath,
        bytes: buffer.byteLength,
        sha256: sha256(buffer),
      };

      entries[locale][map.name] = descriptor;
      artifacts.push({
        locale,
        mapName: map.name,
        mapSlug: map.slug,
        ...descriptor,
        buffer,
        bundle,
      });
    }
  }

  return {
    manifest: {
      schemaVersion: RUNTIME_BUNDLE_SCHEMA_VERSION,
      basePath,
      entries,
    },
    artifacts,
  };
}
