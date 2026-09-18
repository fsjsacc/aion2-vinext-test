import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";

import { LocalizationStatusNotice } from "@/app/_components/localization/LocalizationStatusNotice";
import { OfficialItemDetail } from "@/app/_components/database/OfficialItemDetail";
import { curatedItemSlug } from "@/app/curated-item-links";
import { itemDetailCopy } from "@/app/item-detail-copy";
import {
  fetchPublishedItemSummary,
  getBootstrapItemSummary,
} from "@/app/item-detail-summary";
import { officialItemCatalogManifest } from "@/app/item-catalog-bootstrap";
import {
  fetchOfficialItemDetail,
  isOfficialItemDetail,
  officialItemIdPattern,
  type OfficialItemDetail as OfficialItemDetailRecord,
} from "@/app/official-item-detail";
import {
  getSectionHref,
  isSiteLocale,
  localizedHref,
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";
import {
  buildContentSeoTitle,
  buildSeoDescription,
} from "@/app/seo-metadata";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";

import { buildStaticRouteMetadata } from "../../../_static-route-metadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string; id: string }> };

function requireRoute(localeValue: string, id: string) {
  if (
    !isSiteLocale(localeValue) ||
    !officialItemIdPattern.test(id) ||
    id.startsWith("0")
  ) {
    notFound();
  }
  const locale = localeValue as SiteLocale;
  const curatedSlug = curatedItemSlug(id);
  if (curatedSlug) {
    permanentRedirect(localizedHref(locale, `/database/${curatedSlug}/`));
  }
  return { id, locale };
}

const loadItem = cache(async (
  id: string,
  locale: SiteLocale,
): Promise<OfficialItemDetailRecord | null> => {
  const bootstrapSummary = getBootstrapItemSummary(id, locale);
  if (bootstrapSummary) return bootstrapSummary;

  try {
    const detail = await fetchOfficialItemDetail(id, locale);
    if (detail && isOfficialItemDetail(detail, id)) return detail;
  } catch {
    // Fall back to the published catalog summary below.
  }
  return fetchPublishedItemSummary(id, locale);
});

function pageDescription(item: OfficialItemDetailRecord, locale: SiteLocale) {
  return itemDetailCopy[locale].seoDescription(
    item.name,
    item.id,
    item.gradeName,
    item.categoryName,
  );
}

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</gu, "\\u003c");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params;
  const { id, locale } = requireRoute(values.locale, values.id);
  const item = await loadItem(id, locale);
  if (!item) notFound();
  const path = `/database/item/${id}/`;
  const title = buildContentSeoTitle(
    "database",
    `item/${id}`,
    locale,
    `${item.name} · ID ${item.id}`,
  );
  const description = buildSeoDescription(
    pageDescription(item, locale),
    locale,
    "database:item",
  );
  return buildStaticRouteMetadata({
    locale,
    path,
    title,
    description,
    robots: { index: false, follow: true },
    imageAlt: itemDetailCopy[locale].imageAlt(
      item.name,
      item.categoryName,
    ),
    imageUrl: item.iconUrl,
    imageWidth: 168,
    imageHeight: 168,
    twitterCard: "summary",
  });
}

export default async function ItemDetailPage({ params }: Props) {
  const values = await params;
  const { id, locale } = requireRoute(values.locale, values.id);
  const item = await loadItem(id, locale);
  if (!item) notFound();
  const siteOrigin = await getRequestSiteOrigin();
  const databaseHref = getSectionHref(locale, "database");
  const canonicalHref = localizedHref(locale, `/database/item/${id}/`);
  const canonicalUrl = absoluteSiteUrl(canonicalHref, siteOrigin);
  const webPageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const databaseUrl = absoluteSiteUrl(databaseHref, siteOrigin);
  const homeUrl = absoluteSiteUrl(getSectionHref(locale, "home"), siteOrigin);
  const rootUrl = absoluteSiteUrl("/", siteOrigin);
  const copy = itemDetailCopy[locale];
  const description = buildSeoDescription(
    pageDescription(item, locale),
    locale,
    "database:item",
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: canonicalUrl,
        name: item.name,
        description,
        inLanguage: siteLocaleConfig[locale].code,
        dateModified: officialItemCatalogManifest.snapshotDate,
        breadcrumb: { "@id": breadcrumbId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: item.iconUrl,
          caption: copy.imageAlt(item.name, item.categoryName),
          width: 168,
          height: 168,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${rootUrl}#organization`,
          name: "AION2 KINA",
          url: rootUrl,
        },
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `${databaseUrl}#collection`,
          url: databaseUrl,
        },
        mainEntity: {
          "@type": "Thing",
          "@id": `${canonicalUrl}#item`,
          identifier: item.id,
          name: item.name,
          description,
          image: item.iconUrl,
          url: canonicalUrl,
          sameAs: item.officialPageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AION2 KINA", item: homeUrl },
          { "@type": "ListItem", position: 2, name: copy.back, item: databaseUrl },
          { "@type": "ListItem", position: 3, name: item.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.page} id="main-content">
      <div className="shell">
        <LocalizationStatusNotice locale={locale} compact />
        <OfficialItemDetail
          databaseHref={databaseHref}
          initialItem={item}
          key={`${locale}:${item.id}`}
          locale={locale}
        />
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        type="application/ld+json"
      />
    </main>
  );
}
