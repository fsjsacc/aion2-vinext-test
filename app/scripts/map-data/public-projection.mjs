const PUBLIC_ATTRIBUTION =
  "AION2 KINA map curation, player-submitted tips, in-game review, and NC official information";

const SOURCE_LOCALE_PREFIX = /^\s*\[Source [^\]]+\]\s*/iu;
const CONTRIBUTOR_ONLY_NOTE =
  /^\s*(?:Thanks?\s+to\b.*|(?:\u611f\u8b1d|\u611f\u8c22)\u73a9\u5bb6.*\u5206\u4eab)\s*$/iu;

const communityReviewNote = {
  "zh-Hant": "玩家回報點位，已由 AION2 KINA 整理並納入遊戲內複核。",
  en: "Player-submitted location curated by AION2 KINA for in-game review.",
  ko: "플레이어 제보 위치를 AION2 KINA가 정리하고 게임 내에서 검토합니다.",
};

const communityMarkerName = {
  "zh-Hant": "玩家回報點位",
  en: "Player-submitted map point",
  ko: "플레이어 제보 지점",
};

const publicDescription = (description, locale = "") => {
  if (typeof description !== "string") return "";
  const normalized = description.trim();
  if (!normalized) return "";
  if (SOURCE_LOCALE_PREFIX.test(normalized)) return "";
  if (CONTRIBUTOR_ONLY_NOTE.test(normalized)) {
    return communityReviewNote[locale] ?? "";
  }
  return normalized;
};

const projectMarkerText = (markerText, locale) => {
  const rawName =
    typeof markerText?.name === "string" ? markerText.name.trim() : "";
  return {
    name: SOURCE_LOCALE_PREFIX.test(rawName)
      ? communityMarkerName[locale] ?? "Map point"
      : rawName,
    description: publicDescription(markerText?.description, locale),
  };
};

const projectSubtype = (subtype) => ({
  id: subtype.id,
  name: subtype.name,
  label: subtype.label,
  category: subtype.category,
  categoryLabel: subtype.categoryLabel,
  color: subtype.color,
  iconUrl: subtype.iconUrl,
  darkIconUrl: subtype.darkIconUrl,
  iconScale: subtype.iconScale,
  canComplete: subtype.canComplete,
  order: subtype.order,
});

const projectCategory = (category) => ({
  id: category.id,
  name: category.name,
  label: category.label,
  color: category.color,
  order: category.order,
  subtypes: category.subtypes.map(projectSubtype),
});

const projectMap = (map) => ({
  id: map.id,
  name: map.name,
  slug: map.slug,
  displayName: map.displayName,
  localizedName: map.localizedName,
  description: map.description,
  type: map.type,
  order: map.order,
  width: map.width,
  height: map.height,
  sourceWidth: map.sourceWidth,
  sourceHeight: map.sourceHeight,
  scaleX: map.scaleX,
  scaleY: map.scaleY,
  markerCount: map.markerCount,
  regionCount: map.regionCount,
  tileSize: map.tileSize,
  tileMinZoom: map.tileMinZoom,
  tileMaxZoom: map.tileMaxZoom,
  tileWorldSize: map.tileWorldSize,
  tileTemplate: map.tileTemplate,
  available: map.available,
});

const projectMarker = (marker) => ({
  id: marker.id,
  mapName: marker.mapName,
  x: marker.x,
  y: marker.y,
  sourceX: marker.sourceX,
  sourceY: marker.sourceY,
  name: marker.name,
  description: publicDescription(marker.description),
  subtype: marker.subtype,
  subtypeLabel: marker.subtypeLabel,
  category: marker.category,
  categoryLabel: marker.categoryLabel,
  region: marker.region,
  color: marker.color,
  iconUrl: marker.iconUrl,
  darkIconUrl: marker.darkIconUrl,
  iconScale: marker.iconScale,
  images: [...marker.images],
});

const projectRegion = (region) => ({
  name: region.name,
  label: region.label,
  borders: region.borders,
});

export function projectPublicMapData(mapData) {
  return {
    source: {
      build: mapData.source.build,
      attribution: PUBLIC_ATTRIBUTION,
    },
    maps: mapData.maps.map(projectMap),
    categories: mapData.categories.map(projectCategory),
    markersByMap: Object.fromEntries(
      Object.entries(mapData.markersByMap).map(([mapName, markers]) => [
        mapName,
        markers.map(projectMarker),
      ]),
    ),
    regionsByMap: Object.fromEntries(
      Object.entries(mapData.regionsByMap).map(([mapName, regions]) => [
        mapName,
        regions.map(projectRegion),
      ]),
    ),
  };
}

export function projectPublicMapI18n(i18n) {
  return {
    source: {
      build: i18n.source.tcImbaBuild,
      attribution: PUBLIC_ATTRIBUTION,
      gameLocales: [...i18n.source.gameLocales],
      fallbackPolicy:
        "Non-localized source notes are omitted until they receive an editorial translation.",
    },
    locales: Object.fromEntries(
      Object.entries(i18n.locales).map(([locale, localeText]) => [
        locale,
        {
          ...localeText,
          markers: Object.fromEntries(
            Object.entries(localeText.markers).map(([markerId, markerText]) => [
              markerId,
              projectMarkerText(markerText, locale),
            ]),
          ),
        },
      ]),
    ),
  };
}

export const serializePublicMapPayload = (payload) =>
  `${JSON.stringify(payload)}\n`;

export function createPublicMapPayloadArtifacts({ mapData, i18n }) {
  return [
    {
      path: "data/aion2-map-data.json",
      buffer: Buffer.from(
        serializePublicMapPayload(projectPublicMapData(mapData)),
        "utf8",
      ),
    },
    {
      path: "data/aion2-map-i18n.json",
      buffer: Buffer.from(
        serializePublicMapPayload(projectPublicMapI18n(i18n)),
        "utf8",
      ),
    },
  ];
}
