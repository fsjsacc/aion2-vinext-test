/**
 * Editorial allowlist for crawlable map pages.
 *
 * Marker names are intentionally not used to generate URLs. A source-data refresh
 * can change translations without silently changing a published canonical URL.
 */
const editorialLocales = ["zh-Hant", "en", "ko"] as const;

export type MapPoiEditorial = {
  useCase: Record<(typeof editorialLocales)[number], string>;
  source: {
    label: string;
    url: string;
    verifiedAt: string;
  };
  relatedContent: readonly {
    section: "guides" | "classes" | "news" | "database";
    slug: string;
  }[];
};

export type MapPoiPublication = {
  mapSlug: string;
  markerId: string;
  slug: string;
  typeSlug: string | null;
  editorialReady: boolean;
  indexable: boolean;
  editorial?: MapPoiEditorial;
};

type MapSeoPublicationRegistry = {
  sourceGeneratedAt: string;
  types: readonly {
    mapSlug: string;
    slug: string;
    subtype: string;
    indexable: boolean;
    updatedAt: string;
  }[];
  pois: readonly MapPoiPublication[];
};

/**
 * Crawl policy for map landing pages. This is deliberately separate from the
 * immutable map-data publication descriptor: changing whether an existing map
 * page is ready for search must not force every unchanged tile and icon into a
 * new R2 asset version.
 */
export const mapPagePublication = [
  { slug: "verteron", contentMode: "marker-catalog", editorialReady: true, indexable: true, updatedAt: "2026-07-14" },
  { slug: "altgard", contentMode: "marker-catalog", editorialReady: true, indexable: true, updatedAt: "2026-07-14" },
  { slug: "eltnen", contentMode: "marker-catalog", editorialReady: true, indexable: true, updatedAt: "2026-07-23" },
  { slug: "morheim", contentMode: "complete-base-map", editorialReady: true, indexable: true, updatedAt: "2026-07-23" },
  { slug: "chaotic-lower-reshanta", contentMode: "marker-catalog", editorialReady: true, indexable: true, updatedAt: "2026-07-14" },
  { slug: "chaotic-middle-reshanta", contentMode: "marker-catalog", editorialReady: true, indexable: true, updatedAt: "2026-07-14" },
] as const;

export const mapSeoPublication = {
  sourceGeneratedAt: "2026-07-14T00:00:00.000Z",
  types: [
    { mapSlug: "verteron", slug: "world-boss", subtype: "boss", indexable: true, updatedAt: "2026-07-14" },
    { mapSlug: "altgard", slug: "world-boss", subtype: "boss", indexable: true, updatedAt: "2026-07-14" },
    { mapSlug: "verteron", slug: "hidden-cube", subtype: "hiddenCube", indexable: true, updatedAt: "2026-07-26" },
    { mapSlug: "altgard", slug: "hidden-cube", subtype: "hiddenCube", indexable: true, updatedAt: "2026-07-26" },
    { mapSlug: "eltnen", slug: "hidden-cube", subtype: "hiddenCube", indexable: true, updatedAt: "2026-07-26" },
    { mapSlug: "verteron", slug: "rift", subtype: "rift", indexable: true, updatedAt: "2026-07-26" },
    { mapSlug: "altgard", slug: "rift", subtype: "rift", indexable: true, updatedAt: "2026-07-26" },
  ],
  pois: [
    { mapSlug: "verteron", markerId: "036cccc1-c118-4b73-8262-9332f7a9f2a7", slug: "rotten-kutar-036cccc1", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "99fe42ad-bd58-4ab5-affd-1423ce7577ca", slug: "neikel-of-the-east-99fe42ad", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "fbc51970-6cf5-4e4e-8ca5-1a65d88f9ffa", slug: "blooming-korin-fbc51970", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "2e339377-9228-445e-a0dd-5dc43cb08c72", slug: "kusan-the-mad-gladiator-2e339377", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "45b4c19a-31ee-4688-b630-85c89e96a4a9", slug: "ritualist-garshim-45b4c19a", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "08dc92f7-00f2-4297-a5f8-c8c33174dbdd", slug: "bloodfang-pnyn-08dc92f7", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "ef19dce1-53ea-4c4c-b9e7-204c34e3295f", slug: "furious-saursus-ef19dce1", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "58f8c41e-965f-44d4-9173-09c4843aa9e1", slug: "scholar-aulla-58f8c41e", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "f3636187-739e-40dd-8f09-b07c52fed797", slug: "chaser-taulo-f3636187", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "6118e3ed-129f-40a8-8b39-6a0ea11f83b8", slug: "silent-dartan-6118e3ed", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "463b28ab-1c31-48d8-a4d8-920b0e9f016d", slug: "heretic-layla-463b28ab", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "bcfb2b49-9436-4df0-a288-74a2cc2365e3", slug: "phantasm-kasia-bcfb2b49", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "a842db37-f872-456d-a42f-50cdcc4924f6", slug: "black-tentacle-lawa-a842db37", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "1419a7c8-8f43-489a-a933-7aebfd2809b8", slug: "soul-ruler-kashapa-1419a7c8", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "ffb267ac-77d6-4ab1-9304-5e98b0fd9cd8", slug: "divine-ansas-ffb267ac", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "fdc029f7-5684-4e2a-af3c-f08325bb8090", slug: "centurion-demiros-fdc029f7", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "1e2107f3-8424-4467-b485-b10008f1cff4", slug: "bodyguard-teegant-1e2107f3", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "9a41dba0-6e80-483a-b982-53148f0b50c3", slug: "high-commander-lagta-9a41dba0", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "b682f0f5-c464-46fb-9e03-d64194e33682", slug: "sentinel-k-nash-b682f0f5", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "447366c3-3ab2-4ffc-8132-1374ae30c5f3", slug: "harvest-manager-moshav-447366c3", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "0546b29f-c926-4ff8-aea7-4d87124d9591", slug: "researcher-setram-0546b29f", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "verteron", markerId: "9d0b7986-4c60-46a8-a206-9012daf2ad4f", slug: "eternal-gartua-9d0b7986", typeSlug: "world-boss", editorialReady: false, indexable: false },

    { mapSlug: "altgard", markerId: "52563fe7-5872-4e46-ae6f-b95d26a370d7", slug: "black-warrior-aed-52563fe7", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "50c4068a-062d-46ae-b8ab-c71eddc71044", slug: "melted-danar-50c4068a", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "8ff06d66-95d2-4b94-8702-f073293c5b47", slug: "silent-dartan-8ff06d66", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "93b0fc64-370d-460e-8b56-428e10faaac2", slug: "soul-ruler-kashapa-93b0fc64", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "2e74b353-428b-4d06-95d3-ca0e52d2098d", slug: "high-commander-lagta-2e74b353", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "5ad52820-3a42-4900-8e39-541ff0525c3b", slug: "special-operations-leader-linx-5ad52820", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "9473c256-4c3c-4d4d-8ff8-aa94439d1d54", slug: "advisor-resana-9473c256", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "b766633c-66f1-47e5-a8bf-b93c4c757635", slug: "dark-shadow-vishwada-b766633c", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "bf63062a-7e06-4dbb-a26f-d5d9c5b5efc6", slug: "visionary-karuka-bf63062a", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "a67ac181-e491-48f3-b867-b955dcff1184", slug: "deceiver-trid-a67ac181", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "5c581bad-68a7-4670-84eb-99244ddfdcca", slug: "desecrator-newbold-5c581bad", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "401020af-aa0b-464d-a86b-c5d045752ad5", slug: "addicted-hardirun-401020af", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "bcbf117e-114d-4b3c-ad3b-fbbe9119cff1", slug: "high-overseer-nutah-bcbf117e", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "dd187f78-d862-42fe-930f-12503a84d57d", slug: "veteran-shujakan-dd187f78", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "1ae47541-d23f-473a-89bc-7b5cf4032353", slug: "faithful-rajit-1ae47541", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "27c630ee-fb90-4355-8eb8-b252ce8df5a5", slug: "predator-garsan-27c630ee", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "3a07434a-c4cc-4f6a-8e51-222ec35ccac2", slug: "blue-wave-kelpina-3a07434a", typeSlug: "world-boss", editorialReady: false, indexable: false },
    { mapSlug: "altgard", markerId: "ba134768-0b6c-436e-ad3b-031d1dc66043", slug: "berserker-vargor-ba134768", typeSlug: "world-boss", editorialReady: false, indexable: false },

    // Kept for inbound links, but deliberately excluded from search and sitemaps.
    { mapSlug: "verteron", markerId: "2f438df2-996d-4516-97e0-13751855fbec", slug: "roah-2f438df2", typeSlug: null, editorialReady: false, indexable: false },
  ],
} as const satisfies MapSeoPublicationRegistry;

function normalizePublicationValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizePublicationValue(item) ?? null);
  }
  if (value && typeof value === "object") {
    const normalized: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) {
      const item = normalizePublicationValue((value as Record<string, unknown>)[key]);
      if (item !== undefined) normalized[key] = item;
    }
    return normalized;
  }
  if (value === undefined || typeof value === "function" || typeof value === "symbol") {
    return undefined;
  }
  return value;
}

/** Stable semantic bytes for the release version input; source formatting is irrelevant. */
export function serializeMapSeoPublicationPolicy(
  publication: MapSeoPublicationRegistry = mapSeoPublication,
) {
  return JSON.stringify(normalizePublicationValue(publication));
}

export type MapTypePublication = (typeof mapSeoPublication.types)[number];

export function getMapPagePublication(mapSlug: string) {
  return mapPagePublication.find((map) => map.slug === mapSlug);
}

export function isMapPublicationIndexable(mapSlug: string) {
  const publication = getMapPagePublication(mapSlug);
  return Boolean(publication?.indexable && publication.editorialReady);
}

function hasCompleteEditorialRecord(publication: MapPoiPublication) {
  const editorial = publication.editorial;
  if (!editorial) return false;
  if (!editorialLocales.every((locale) => editorial.useCase[locale]?.trim())) return false;
  if (!editorial.source.label.trim() || !editorial.source.verifiedAt.trim()) return false;
  if (!Array.isArray(editorial.relatedContent) || editorial.relatedContent.length === 0) return false;
  if (editorial.relatedContent.some((item) => !item.section || !item.slug.trim())) return false;
  try {
    return new URL(editorial.source.url).protocol === "https:";
  } catch {
    return false;
  }
}

export function isMapPoiPublicationIndexable(publication: MapPoiPublication) {
  return publication.indexable && publication.editorialReady && hasCompleteEditorialRecord(publication);
}

export type IndexableMapRoute =
  | { kind: "map"; mapSlug: string; suffix: string; updatedAt: string }
  | { kind: "type"; mapSlug: string; typeSlug: string; suffix: string; updatedAt: string }
  | {
      kind: "poi";
      mapSlug: string;
      markerId: string;
      poiSlug: string;
      suffix: string;
      updatedAt: string;
    };

/**
 * Single route-level indexability registry consumed by both the public sitemap
 * and the database release snapshot. Locale expansion happens at each consumer,
 * but the route set itself must never be re-derived from generated POI data.
 */
export function createIndexableMapRouteRegistry(
  maps: readonly {
    slug: string;
    markerCount: number;
    subtypeCounts?: Readonly<Partial<Record<string, number>>>;
  }[],
): readonly IndexableMapRoute[] {
  const mapBySlug = new Map(maps.map((map) => [map.slug, map]));
  const routes: IndexableMapRoute[] = [];
  const suffixes = new Set<string>();

  const add = (route: IndexableMapRoute) => {
    if (suffixes.has(route.suffix)) {
      throw new Error(`Duplicate indexable map route: ${route.suffix}`);
    }
    suffixes.add(route.suffix);
    routes.push(route);
  };

  for (const publication of mapPagePublication) {
    if (!publication.indexable || !publication.editorialReady) continue;
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(publication.updatedAt)) {
      throw new Error(`Indexable map has an invalid editorial updatedAt: ${publication.slug}`);
    }
    const map = mapBySlug.get(publication.slug);
    if (!map) {
      throw new Error(`Indexable map references an unknown map: ${publication.slug}`);
    }
    const hasReviewedPageContent =
      map.markerCount > 0 || publication.contentMode === "complete-base-map";
    if (!hasReviewedPageContent) {
      throw new Error(
        `Indexable map has neither marker data nor reviewed complete-base-map content: ${publication.slug}`,
      );
    }
    add({
      kind: "map",
      mapSlug: map.slug,
      suffix: `/tools/map/${map.slug}/`,
      updatedAt: publication.updatedAt,
    });
  }

  for (const type of mapSeoPublication.types) {
    if (!type.indexable) continue;
    const map = mapBySlug.get(type.mapSlug);
    if (!map || map.markerCount <= 0 || !isMapPublicationIndexable(map.slug)) {
      throw new Error(`Indexable map type references an empty or unknown map: ${type.mapSlug}/${type.slug}`);
    }
    const subtypeCount = map.subtypeCounts?.[type.subtype] ?? 0;
    if (subtypeCount <= 0) {
      throw new Error(
        `Indexable map type has no matching source markers: ${type.mapSlug}/${type.slug}`,
      );
    }
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(type.updatedAt)) {
      throw new Error(`Indexable map type has an invalid updatedAt: ${type.mapSlug}/${type.slug}`);
    }
    add({
      kind: "type",
      mapSlug: type.mapSlug,
      typeSlug: type.slug,
      suffix: `/tools/map/${type.mapSlug}/type/${type.slug}/`,
      updatedAt: type.updatedAt,
    });
  }

  for (const poi of mapSeoPublication.pois) {
    if (!isMapPoiPublicationIndexable(poi)) continue;
    if (!mapBySlug.has(poi.mapSlug)) {
      throw new Error(`Indexable map POI references an unknown map: ${poi.mapSlug}/${poi.slug}`);
    }
    add({
      kind: "poi",
      mapSlug: poi.mapSlug,
      markerId: poi.markerId,
      poiSlug: poi.slug,
      suffix: `/tools/map/${poi.mapSlug}/poi/${poi.slug}/`,
      updatedAt: getMapPagePublication(poi.mapSlug)?.updatedAt
        ?? mapSeoPublication.sourceGeneratedAt.slice(0, 10),
    });
  }

  return routes;
}

export function validateMapSeoPublication(
  publication: Pick<MapSeoPublicationRegistry, "pois">,
) {
  const issues: string[] = [];
  const routes = new Set<string>();
  const markerIds = new Set<string>();

  for (const poi of publication.pois) {
    const route = `${poi.mapSlug}/${poi.slug}`;
    if (routes.has(route)) issues.push(`Duplicate POI route: ${route}`);
    if (markerIds.has(poi.markerId)) issues.push(`Duplicate POI marker: ${poi.markerId}`);
    routes.add(route);
    markerIds.add(poi.markerId);

    if (poi.editorialReady && !hasCompleteEditorialRecord(poi)) {
      issues.push(`${route} is editorialReady without a complete editorial record.`);
    }
    if (poi.indexable && !poi.editorialReady) {
      issues.push(`${route} cannot be indexable before editorial review.`);
    }
    if (poi.indexable && !hasCompleteEditorialRecord(poi)) {
      issues.push(`${route} cannot be indexable without use, source, and related content.`);
    }
  }

  return issues;
}

export function assertMapSeoPublicationValid(
  publication: Pick<MapSeoPublicationRegistry, "pois">,
) {
  const issues = validateMapSeoPublication(publication);
  if (issues.length > 0) {
    throw new Error(`Map SEO publication validation failed:\n- ${issues.join("\n- ")}`);
  }
}

assertMapSeoPublicationValid(mapSeoPublication);

export function getMapTypePublication(mapSlug: string, typeSlug: string) {
  return mapSeoPublication.types.find(
    (entry) => entry.mapSlug === mapSlug && entry.slug === typeSlug,
  );
}

export function getMapPoiPublication(mapSlug: string, poiSlug: string) {
  return mapSeoPublication.pois.find(
    (entry) => entry.mapSlug === mapSlug && entry.slug === poiSlug,
  );
}
