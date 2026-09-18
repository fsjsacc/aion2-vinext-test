import type {
  MapDataLocale as SiteMapDataLocale,
  SiteLocaleCode,
} from "../site-config";

/**
 * The locale selected in the public map UI. These values are BCP 47 language
 * tags and intentionally differ from the lowercase locale slugs used in URLs.
 */
export type Locale = SiteLocaleCode;

/**
 * The map dataset currently ships only these three translation bundles.
 * Never widen this type when adding a public site language; map UI languages
 * without a native data bundle explicitly reuse the English map data.
 */
export type MapDataLocale = SiteMapDataLocale;

export type MapUnavailableHandler = (mapName: string) => void;

export type MapInfo = {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  localizedName: string;
  description: string;
  type: string;
  width: number;
  height: number;
  sourceWidth: number;
  sourceHeight: number;
  scaleX: number;
  scaleY: number;
  markerCount: number;
  regionCount: number;
  tileSize: number;
  tileMinZoom: number;
  tileMaxZoom: number;
  tileWorldSize: number;
  tileTemplate: string;
  available: boolean;
};

export type Subtype = {
  id: string;
  name: string;
  label: string;
  category: string;
  categoryLabel: string;
  color: string;
  iconUrl: string;
  darkIconUrl: string;
  iconScale: number;
  canComplete: boolean;
  order: number;
};

export type Category = {
  id: string;
  name: string;
  label: string;
  color: string;
  subtypes: Subtype[];
};

export type Marker = {
  id: string;
  mapName: string;
  x: number;
  y: number;
  sourceX: number;
  sourceY: number;
  name: string;
  description: string;
  subtype: string;
  subtypeLabel: string;
  category: string;
  categoryLabel: string;
  region: string;
  color: string;
  iconUrl: string;
  darkIconUrl: string;
  iconScale: number;
  images: string[];
};

export type Region = {
  name: string;
  label: string;
  borders: number[][][];
};

export type MapPayload = {
  source: {
    build: string;
    attribution: string;
  };
  maps: MapInfo[];
  categories: Category[];
  markersByMap: Record<string, Marker[]>;
  regionsByMap: Record<string, Region[]>;
};

export type LocalizedMarkerText = {
  name: string;
  description: string;
};

export type MapLocaleBundle = {
  maps: Record<string, { name: string; description: string }>;
  categories: Record<string, string>;
  subtypes: Record<string, string>;
  markers: Record<string, LocalizedMarkerText>;
  regions: Record<string, Record<string, string>>;
};

export type MapI18nPayload = {
  source: {
    build: string;
    attribution: string;
    gameLocales: string[];
    fallbackPolicy?: string;
  };
  locales: Record<MapDataLocale, MapLocaleBundle>;
};

export type RuntimeBundleEntry = {
  path: string;
  bytes: number;
  sha256: string;
};

export type RuntimeBundleIndex = {
  schemaVersion: number;
  basePath: string;
  entries: Record<MapDataLocale, Record<string, RuntimeBundleEntry>>;
};

export type RuntimeMapManifest = {
  schemaVersion: number;
  versionKey: string;
  sourceBuild: string;
  locales: MapDataLocale[];
  maps: Array<{
    key: string;
    slug: string;
    markerCount: number;
    regionCount: number;
    tileMinZoom: number;
    tileMaxZoom: number;
  }>;
  runtimeBundles: RuntimeBundleIndex;
};

export type RuntimeMapBundle = {
  schemaVersion: number;
  versionKey: string;
  sourceBuild: string;
  locale: MapDataLocale;
  mapName: string;
  mapSlug: string;
  maps: MapInfo[];
  categories: Category[];
  markers: Marker[];
  regions: Region[];
  text: Omit<MapLocaleBundle, "regions"> & {
    regions: Record<string, string>;
  };
};
