import type { DatabaseClassId } from "./database-type-registry";
import type { ContentLocale, SiteLocale } from "./site-config";

export type ItemCatalogLocalizationStatus = "localized" | "fallback";

export type ItemCatalogLocalizationMetadata = {
  requestedLocale: SiteLocale;
  contentLocale: ContentLocale;
  isFallback: boolean;
  status: ItemCatalogLocalizationStatus;
};

export type ItemCatalogFacet = {
  code: string;
  label: string;
  count: number;
  rank?: number;
};

export type ItemCatalogRow = {
  id: string;
  name: string;
  imageUrl: string;
  gradeCode: string | null;
  gradeName: string;
  categoryCode: string;
  categoryName: string;
  optionLines: readonly string[];
  classIds: readonly DatabaseClassId[];
  tradable: boolean | null;
  officialUrl: string;
  detailSlug: string | null;
};

export type ItemCatalogFacets = {
  grades: readonly ItemCatalogFacet[];
  categories: readonly ItemCatalogFacet[];
  classes: readonly ItemCatalogFacet[];
};

export type ItemCatalogRelease = {
  versionKey: string;
  snapshotDate: string;
  retrievedAt: string;
  digest: string;
};

export type ItemCatalogSearchResponse = ItemCatalogLocalizationMetadata & {
  release: ItemCatalogRelease | null;
  items: readonly ItemCatalogRow[];
  facets: ItemCatalogFacets;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    lastPage: number;
  };
};

export type ItemCatalogSearchRequest = {
  locale: SiteLocale;
  query: string;
  category: string | null;
  grades: readonly string[];
  classes: readonly DatabaseClassId[];
  itemIds: readonly string[] | null;
  page: number;
  pageSize: 20;
};
