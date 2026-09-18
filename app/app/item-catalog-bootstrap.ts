import bootstrapJson from "./item-catalog-bootstrap.json";
import { curatedItemSlug } from "./curated-item-links";
import type {
  ItemCatalogFacets,
  ItemCatalogRow,
  ItemCatalogSearchResponse,
} from "./item-catalog-types";
import {
  resolveContentLocale,
  type ContentLocale,
  type SiteLocale,
} from "./site-config";

type BootstrapDocument = {
  snapshotDate: string;
  retrievedAt: string;
  total: number;
  checksum: string;
  versionKey: string;
  itemsByLocale: Record<ContentLocale, ItemCatalogRow[]>;
  facetsByLocale: Record<ContentLocale, ItemCatalogFacets>;
};

const bootstrap = bootstrapJson as unknown as BootstrapDocument;

export const officialItemCatalogManifest = {
  snapshotDate: bootstrap.snapshotDate,
  retrievedAt: bootstrap.retrievedAt,
  total: bootstrap.total,
  checksum: bootstrap.checksum,
  versionKey: bootstrap.versionKey,
} as const;

export function getItemCatalogFacets(locale: SiteLocale): ItemCatalogFacets {
  return bootstrap.facetsByLocale[resolveContentLocale(locale)];
}

export function getItemCatalogBootstrap(
  locale: SiteLocale,
): ItemCatalogSearchResponse {
  const contentLocale = resolveContentLocale(locale);
  const isFallback = contentLocale !== locale;
  return {
    requestedLocale: locale,
    contentLocale,
    isFallback,
    status: isFallback ? "fallback" : "localized",
    release: {
      versionKey: bootstrap.versionKey,
      snapshotDate: bootstrap.snapshotDate,
      retrievedAt: bootstrap.retrievedAt,
      digest: bootstrap.checksum,
    },
    items: bootstrap.itemsByLocale[contentLocale].map((item) => ({
      ...item,
      detailSlug: curatedItemSlug(item.id),
    })),
    facets: bootstrap.facetsByLocale[contentLocale],
    pagination: {
      page: 1,
      pageSize: 20,
      total: bootstrap.total,
      lastPage: Math.max(1, Math.ceil(bootstrap.total / 20)),
    },
  };
}
