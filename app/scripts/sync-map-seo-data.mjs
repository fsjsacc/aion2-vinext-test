import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  isMapPoiPublicationIndexable,
  mapSeoPublication,
} from "../app/map-seo-publication.ts";

const sourceRoot = path.resolve(
  process.env.AION2_MAP_SOURCE_DIR ?? process.cwd(),
);
const sourceDataRoot = process.env.AION2_MAP_SOURCE_DIR
  ? path.join(sourceRoot, "public/data")
  : path.join(sourceRoot, "data/map-source");
const outputPath = path.resolve("app/map-seo-data.json");
const dataPath = path.join(sourceDataRoot, "aion2-map-data.json");
const i18nPath = path.join(sourceDataRoot, "aion2-map-i18n.json");

const localeKeys = ["zh-Hant", "en", "ko"];

async function loadTranslations() {
  const index = await readFile(i18nPath, "utf8").then(JSON.parse);
  if (index.locales) return index;
  if (!index.files) {
    throw new Error("Map translations contain neither locales nor locale files.");
  }

  const locales = {};
  for (const locale of localeKeys) {
    const localeFile = index.files[locale];
    if (typeof localeFile !== "string") {
      throw new Error(`Map translations are missing the ${locale} locale file.`);
    }
    const relativePath = localeFile.replace(/^\/data\//u, "");
    const payload = await readFile(path.join(sourceDataRoot, relativePath), "utf8")
      .then(JSON.parse);
    if (!payload.locales?.[locale]) {
      throw new Error(`Map locale file does not contain ${locale}: ${localeFile}`);
    }
    locales[locale] = payload.locales[locale];
  }
  return { source: index.source, locales };
}

const [payload, translations] = await Promise.all([
  readFile(dataPath, "utf8").then(JSON.parse),
  loadTranslations(),
]);

const localizedText = (markerId) =>
  Object.fromEntries(
    localeKeys.map((locale) => [
      locale,
      translations.locales[locale].markers[markerId] ?? { name: "", description: "" },
    ]),
  );

const maps = payload.maps.map((map) => {
  const markers = payload.markersByMap[map.name] ?? [];
  const categoryCounts = {};
  const subtypeCounts = {};
  for (const marker of markers) {
    categoryCounts[marker.category] = (categoryCounts[marker.category] ?? 0) + 1;
    subtypeCounts[marker.subtype] = (subtypeCounts[marker.subtype] ?? 0) + 1;
  }
  return {
    name: map.name,
    slug: map.slug,
    type: map.type,
    width: map.width,
    height: map.height,
    sourceWidth: map.sourceWidth,
    sourceHeight: map.sourceHeight,
    scaleX: map.scaleX,
    scaleY: map.scaleY,
    markerCount: markers.length,
    regionCount: (payload.regionsByMap[map.name] ?? []).length,
    tilePreview: `/map-assets${map.tileTemplate
      .replace("{z}", String(map.tileMinZoom))
      .replace("{x}", "0")
      .replace("{y}", "0")}`,
    categoryCounts,
    subtypeCounts,
    locales: Object.fromEntries(
      localeKeys.map((locale) => [locale, translations.locales[locale].maps[map.name]]),
    ),
  };
});

const sourceMapBySlug = new Map(payload.maps.map((map) => [map.slug, map]));
const seenPoiRoutes = new Set();
const seenMarkerIds = new Set();
const poisByMap = {};

for (const publication of mapSeoPublication.pois) {
  const routeKey = `${publication.mapSlug}/${publication.slug}`;
  if (seenPoiRoutes.has(routeKey)) {
    throw new Error(`Duplicate map SEO route in publication registry: ${routeKey}`);
  }
  if (seenMarkerIds.has(publication.markerId)) {
    throw new Error(`Marker is registered more than once: ${publication.markerId}`);
  }
  seenPoiRoutes.add(routeKey);
  seenMarkerIds.add(publication.markerId);

  const sourceMap = sourceMapBySlug.get(publication.mapSlug);
  if (!sourceMap) {
    throw new Error(`Published map does not exist in source data: ${publication.mapSlug}`);
  }
  const marker = (payload.markersByMap[sourceMap.name] ?? []).find(
    (candidate) => candidate.id === publication.markerId,
  );
  if (!marker) {
    throw new Error(
      `Published marker ${publication.markerId} is missing from ${publication.mapSlug}`,
    );
  }

  const typePublication = publication.typeSlug
    ? mapSeoPublication.types.find(
        (entry) =>
          entry.mapSlug === publication.mapSlug && entry.slug === publication.typeSlug,
      )
    : undefined;
  if (publication.typeSlug && !typePublication) {
    throw new Error(`Published POI references an unknown type route: ${routeKey}`);
  }
  if (typePublication && marker.subtype !== typePublication.subtype) {
    throw new Error(
      `Published marker ${publication.markerId} has subtype ${marker.subtype}; expected ${typePublication.subtype}`,
    );
  }

  const englishName = localizedText(marker.id).en.name.trim();
  const indexable = isMapPoiPublicationIndexable(publication);
  if (indexable && englishName.toLowerCase() === "world boss") {
    throw new Error(`Generic World Boss marker cannot be indexable: ${publication.markerId}`);
  }

  (poisByMap[publication.mapSlug] ??= []).push({
    id: marker.id,
    slug: publication.slug,
    typeSlug: publication.typeSlug,
    indexable,
    subtype: marker.subtype,
    category: marker.category,
    region: marker.region,
    sourceX: marker.sourceX,
    sourceY: marker.sourceY,
    locales: localizedText(marker.id),
  });
}

const output = {
  source: {
    build: payload.source.build,
    attribution:
      "AION2 KINA map curation, in-game review, and NC official information",
    generatedAt: mapSeoPublication.sourceGeneratedAt,
    mapOriginProject: "appgprj_6a523ef77bd4819186c474a38167342c",
  },
  locales: localeKeys,
  categories: Object.fromEntries(
    localeKeys.map((locale) => [locale, translations.locales[locale].categories]),
  ),
  maps,
  poisByMap,
};

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Wrote ${outputPath}`);
