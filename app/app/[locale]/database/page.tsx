import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ItemCatalog } from "@/app/_components/database/ItemCatalog";
import { DatabaseTypeNav } from "@/app/_components/database/DatabaseTypeNav";
import { LocalizationStatusNotice } from "@/app/_components/localization/LocalizationStatusNotice";
import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";
import {
  itemDatabaseRecords,
} from "@/app/item-database-content";
import { itemDatabaseCatalogCopy } from "@/app/item-database-copy";
import {
  getItemCatalogBootstrap,
  officialItemCatalogManifest,
} from "@/app/item-catalog-bootstrap";
import {
  getSectionHref,
  isSiteLocale,
  localizedHref,
  resolveContentLocale,
  siteLocaleConfig,
  siteLocales,
  type SiteLocale,
} from "@/app/site-config";
import { buildSeoDescription } from "@/app/seo-metadata";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";

import styles from "./items/ItemDatabasePage.module.css";
import { buildStaticRouteMetadata } from "../_static-route-metadata";

type Props = { params: Promise<{ locale: string }> };

function requireLocale(value: string): SiteLocale {
  if (!isSiteLocale(value)) notFound();
  return value;
}

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const copy = itemDatabaseCatalogCopy[locale];
  const description = buildSeoDescription(copy.description, locale, "database");
  return buildStaticRouteMetadata({
    locale,
    path: "/database/",
    title: copy.seoTitle,
    description,
    keywords: [...copy.seoKeywords],
    imageAlt: copy.title,
  });
}

export default async function ItemDatabasePage({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const contentLocale = resolveContentLocale(locale);
  const copy = itemDatabaseCatalogCopy[locale];
  const siteOrigin = await getRequestSiteOrigin();
  const homeHref = getSectionHref(locale, "home");
  const canonicalHref = localizedHref(locale, "/database/");
  const canonicalUrl = absoluteSiteUrl(canonicalHref, siteOrigin);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: siteLocaleConfig[locale].code,
        dateModified: "2026-07-25",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: officialItemCatalogManifest.total,
          itemListElement: itemDatabaseRecords.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.names[contentLocale],
            url: absoluteSiteUrl(
              localizedHref(locale, `/database/${item.slug}/`),
              siteOrigin,
            ),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AION2 KINA",
            item: absoluteSiteUrl(homeHref, siteOrigin),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className={styles.page} id="main-content">
      <LocalizationStatusNotice locale={locale} />
      <header className={styles.hero}>
        <div className="shell">
          <nav className={styles.breadcrumbs} aria-label={copy.breadcrumbLabel}>
            <ol>
              <li><a href={homeHref}>AION2 KINA</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{copy.title}</li>
            </ol>
          </nav>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className={styles.description}>{copy.description}</p>
          <p className={styles.status}>
            <span aria-hidden="true" />
            {copy.sourceNote}
          </p>
          <DatabaseTypeNav activeType="items" locale={locale} />
        </div>
      </header>
      <div className={`shell ${styles.content}`}>
        <ItemCatalog
          initialResponse={getItemCatalogBootstrap(locale)}
          key={locale}
          locale={locale}
        />
        <section
          aria-labelledby="featured-item-records"
          className={styles.featuredItems}
        >
          <div className={styles.featuredHeading}>
            <div>
              <p className={styles.featuredEyebrow}>{copy.featuredEyebrow}</p>
              <h2 id="featured-item-records">{copy.featuredTitle}</h2>
            </div>
            <p>{copy.featuredDescription}</p>
          </div>
          <ol className={styles.featuredGrid}>
            {itemDatabaseRecords.map((item, index) => (
              <li key={item.id}>
                <AnalyticsLink
                  aria-label={`${copy.featuredDetailsLabel}: ${item.names[contentLocale]}`}
                  className={styles.featuredCard}
                  eventName="content_card_click"
                  href={localizedHref(locale, `/database/${item.slug}/`)}
                  payload={{
                    item_slug: item.slug,
                    locale,
                    surface: "content-hub",
                    target_key: item.id,
                    target_kind: "item",
                  }}
                >
                  <span className={styles.featuredIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.featuredCategory}>
                    {item.gradeNames[contentLocale]} · {item.categoryNames[contentLocale]}
                  </span>
                  <strong>{item.names[contentLocale]}</strong>
                  <span className={styles.featuredId}>
                    {copy.featuredIdLabel} {item.id}
                  </span>
                  <span className={styles.featuredAction}>
                    {copy.featuredDetailsLabel}
                    <span aria-hidden="true">↗</span>
                  </span>
                </AnalyticsLink>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        type="application/ld+json"
      />
    </main>
  );
}
