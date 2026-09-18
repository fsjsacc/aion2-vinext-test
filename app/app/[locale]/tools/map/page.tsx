import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";
import {
  JsonLd,
  MapBreadcrumbs,
  MapPageFrame,
  MapRelatedContent,
} from "@/app/map-app/MapSeoChrome";
import {
  absoluteMapUrl,
  buildMapSeoTitle,
  copy,
  getMapDescription,
  getMapImageAlt,
  getIndexableMaps,
  getMapName,
  getMapOpenGraphAlternateLocales,
  getMapOpenGraphLocale,
  getMapPagePublication,
  isLocaleSlug,
  languageAlternates,
  localeConfig,
  localePath,
  mapAssetUrl,
  mapSeoData,
  type LocaleSlug,
} from "@/app/map-seo";
import { buildSeoDescription } from "@/app/seo-metadata";
import { getRequestSiteOrigin } from "@/app/site-url";

type Props = { params: Promise<{ locale: string }> };

function requireLocale(value: string): LocaleSlug {
  if (!isLocaleSlug(value)) notFound();
  return value;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const text = copy[locale];
  const canonical = localePath(locale);
  const title = buildMapSeoTitle(text.hubTitle);
  const description = buildSeoDescription(text.hubDescription, locale, "map-hub");
  const previewMap = mapSeoData.maps[0];
  const socialImage = mapAssetUrl(previewMap.tilePreview);
  const socialImageAlt = getMapImageAlt(
    getMapName(previewMap, locale),
    locale,
  );
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages: languageAlternates() },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title: text.hubTitle,
      description,
      url: canonical,
      locale: getMapOpenGraphLocale(locale),
      alternateLocale: getMapOpenGraphAlternateLocales(locale),
      images: [{
        url: socialImage,
        width: 512,
        height: 512,
        alt: socialImageAlt,
      }],
    },
    twitter: {
      card: "summary",
      title: text.hubTitle,
      description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export default async function MapHubPage({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const siteOrigin = await getRequestSiteOrigin();
  const pageUrl = (path: string) => absoluteMapUrl(path, siteOrigin);
  const text = copy[locale];
  const indexableMaps = getIndexableMaps();
  const verteron = mapSeoData.maps[0];
  const pointTotal = mapSeoData.maps.reduce((sum, map) => sum + map.markerCount, 0);
  const updated = new Intl.DateTimeFormat(localeConfig[locale].code, { dateStyle: "medium" }).format(
    new Date(mapSeoData.source.generatedAt),
  );
  const base = localePath(locale);
  const canonicalUrl = pageUrl(base);
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const mapListId = `${canonicalUrl}#maps`;
  const seoDescription = buildSeoDescription(
    text.hubDescription,
    locale,
    "map-hub",
  );
  const pageUpdatedAt = indexableMaps.reduce((latest, map) => {
    const candidate = getMapPagePublication(map.slug)?.updatedAt;
    return candidate && candidate > latest ? candidate : latest;
  }, mapSeoData.source.generatedAt.slice(0, 10));
  const itemList = indexableMaps.map((map, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: getMapName(map, locale),
    url: pageUrl(localePath(locale, `/tools/map/${map.slug}/`)),
  }));

  return (
    <>
      <MapPageFrame>
        <MapBreadcrumbs locale={locale} />
        <main className="map-seo-hub-main">
          <section className="map-seo-hero">
            <div className="map-seo-hero-copy">
              <p className="map-seo-kicker">AION2 / {text.mapLibrary}</p>
              <h1>{text.hubTitle}</h1>
              <p>{text.hubDescription}</p>
              <div className="map-seo-actions">
                <AnalyticsLink
                  className="map-seo-button"
                  eventName="map_site_navigation_click"
                  href="#map-library"
                  payload={{ destination: "map-library", locale, surface: "map-hub" }}
                >
                  {text.mapLibrary}
                </AnalyticsLink>
                <AnalyticsLink
                  className="map-seo-button"
                  eventName="guide_to_map_click"
                  href={localePath(locale, "/tools/map/verteron/")}
                  payload={{
                    entry_source: "map-hub-primary",
                    locale,
                    map_name: verteron.name,
                    surface: "map-seo",
                  }}
                >
                  {text.openMap}
                </AnalyticsLink>
              </div>
            </div>
            <figure className="map-seo-preview">
              <img src={mapAssetUrl(verteron.tilePreview)} width="512" height="512" alt={getMapImageAlt(getMapName(verteron, locale), locale)} />
              <span>{text.staticPreview}</span>
            </figure>
          </section>

          <dl className="map-seo-stats">
            <div className="map-seo-stat"><strong>{mapSeoData.maps.length}</strong><span>{text.mapLibrary}</span></div>
            <div className="map-seo-stat"><strong>{pointTotal.toLocaleString()}</strong><span>{text.points}</span></div>
            <div className="map-seo-stat"><strong>{updated}</strong><span>{text.updated}</span></div>
          </dl>

          <section className="map-seo-section" id="map-library" aria-labelledby="map-library-title">
            <div className="map-seo-section-heading">
              <div><p className="map-seo-kicker">{text.mapLibrary}</p><h2 id="map-library-title">{text.mapLibrary}</h2></div>
              <p>{text.sourceNote}</p>
            </div>
            <div className="map-seo-grid">
              {mapSeoData.maps.map((map) => {
                const mapName = getMapName(map, locale);
                const body = (
                  <>
                    <img src={mapAssetUrl(map.tilePreview)} width="512" height="512" loading="lazy" alt={getMapImageAlt(mapName, locale)} />
                    <div className="map-seo-card-copy">
                      <h3>{mapName}</h3>
                      <p>{getMapDescription(map, locale)}</p>
                      <div className="map-seo-card-meta">
                        <span>{map.markerCount.toLocaleString(localeConfig[locale].code)} {text.points}</span>
                        <span>{map.markerCount > 0 ? text.ready : text.awaitingData}</span>
                      </div>
                    </div>
                  </>
                );
                return (
                  <AnalyticsLink
                    className="map-seo-card"
                    eventName="guide_to_map_click"
                    href={localePath(locale, `/tools/map/${map.slug}/`)}
                    key={map.name}
                    payload={{
                      entry_source: "map-hub-directory",
                      locale,
                      map_name: map.name,
                      surface: "map-seo",
                    }}
                  >
                    {body}
                  </AnalyticsLink>
                );
              })}
            </div>
          </section>
          <MapRelatedContent locale={locale} />
        </main>
      </MapPageFrame>
      <JsonLd value={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${canonicalUrl}#webpage`,
            name: text.hubTitle,
            description: seoDescription,
            url: canonicalUrl,
            image: pageUrl(mapAssetUrl(verteron.tilePreview)),
            inLanguage: localeConfig[locale].code,
            dateModified: pageUpdatedAt,
            breadcrumb: { "@id": breadcrumbId },
            mainEntity: {
              "@type": "ItemList",
              "@id": mapListId,
              name: text.mapLibrary,
              numberOfItems: itemList.length,
              itemListElement: itemList,
            },
          },
          { "@type": "BreadcrumbList", "@id": breadcrumbId, itemListElement: [
            { "@type": "ListItem", position: 1, name: "AION2 KINA", item: pageUrl(`/${locale}/`) },
            { "@type": "ListItem", position: 2, name: text.mapLibrary, item: pageUrl(base) },
          ] },
        ],
      }} />
    </>
  );
}
