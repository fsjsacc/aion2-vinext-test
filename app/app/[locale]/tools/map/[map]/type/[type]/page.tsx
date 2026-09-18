import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";
import { JsonLd, MapBreadcrumbs, MapPageFrame, MapRelatedContent } from "@/app/map-app/MapSeoChrome";
import {
  absoluteMapUrl,
  buildMapSeoTitle,
  copy,
  getMapBySlug,
  getMapImageAlt,
  getMapName,
  getMapOpenGraphAlternateLocales,
  getMapOpenGraphLocale,
  getMapTypeHeading,
  getMapTypeItemCount,
  getMapTypeLabel,
  getMapTypeSeoTitle,
  getMapTypeDescription,
  getPoiText,
  getPublishedMapType,
  getPublishedPoisForType,
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

type Props = { params: Promise<{ locale: string; map: string; type: string }> };

function resolveRoute(route: { locale: string; map: string; type: string }) {
  if (!isLocaleSlug(route.locale)) notFound();
  const map = getMapBySlug(route.map);
  const type = getPublishedMapType(route.map, route.type);
  if (!map || !type || !type.indexable) notFound();
  return { locale: route.locale as LocaleSlug, map, type };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, map, type } = resolveRoute(await params);
  const suffix = `/tools/map/${map.slug}/type/${type.slug}/`;
  const mapName = getMapName(map, locale);
  const title = getMapTypeSeoTitle(map, locale, type.slug);
  const itemCount = getMapTypeItemCount(map, type);
  const canonical = localePath(locale, suffix);
  const description = buildSeoDescription(
    getMapTypeDescription(map, locale, type.slug, itemCount),
    locale,
    "map-type",
  );
  const socialImage = mapAssetUrl(map.tilePreview);
  const socialImageAlt = getMapImageAlt(
    mapName,
    locale,
    getMapTypeLabel(type.slug, locale),
  );
  return {
    title: buildMapSeoTitle(title),
    description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages: languageAlternates(suffix) },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title,
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
      title,
      description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export default async function MapTypePage({ params }: Props) {
  const { locale, map, type } = resolveRoute(await params);
  const siteOrigin = await getRequestSiteOrigin();
  const pageUrl = (path: string) => absoluteMapUrl(path, siteOrigin);
  const text = copy[locale];
  const mapName = getMapName(map, locale);
  const typeLabel = getMapTypeLabel(type.slug, locale);
  const heading = getMapTypeHeading(map, locale, type.slug);
  const points = getPublishedPoisForType(map.slug, type.slug);
  const itemCount = getMapTypeItemCount(map, type);
  const suffix = `/tools/map/${map.slug}/type/${type.slug}/`;
  const mapSuffix = `/tools/map/${map.slug}/`;
  const canonical = localePath(locale, suffix);
  const description = getMapTypeDescription(map, locale, type.slug, itemCount);
  const seoDescription = buildSeoDescription(
    description,
    locale,
    "map-type",
  );
  const canonicalUrl = pageUrl(canonical);
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const editorialUpdatedAt = type.updatedAt
    ?? mapSeoData.source.generatedAt.slice(0, 10);

  return (
    <>
      <MapPageFrame>
        <MapBreadcrumbs locale={locale} map={map} current={typeLabel} />
        <main>
          <section className="map-seo-hero">
            <div className="map-seo-hero-copy">
              <p className="map-seo-kicker">
                AION2 {text.interactiveMap} · {typeLabel}
              </p>
              <h1>{heading}</h1>
              <p>{description}</p>
              <div className="map-seo-actions">
                <AnalyticsLink
                  className="map-seo-button"
                  eventName="map_type_filter_open"
                  href={`${localePath(locale, mapSuffix)}#type=${encodeURIComponent(type.subtype)}`}
                  payload={{
                    locale,
                    map_slug: map.slug,
                    surface: "map-seo",
                    target_key: map.slug,
                    target_kind: "map",
                    type_slug: type.slug,
                  }}
                >
                  {text.openMap}
                </AnalyticsLink>
                <a className="map-seo-button" href={localePath(locale, mapSuffix)}>{text.backToMaps}</a>
              </div>
            </div>
            <figure className="map-seo-preview">
              <img src={mapAssetUrl(map.tilePreview)} width="512" height="512" alt={getMapImageAlt(mapName, locale, typeLabel)} />
              <span>{typeLabel}</span>
            </figure>
          </section>

          <section className="map-seo-section" aria-labelledby="boss-list-title">
            <div className="map-seo-section-heading">
              <div>
                <p className="map-seo-kicker">{itemCount.toLocaleString(localeConfig[locale].code)} {text.points}</p>
                <h2 id="boss-list-title">{mapName} · {typeLabel}</h2>
              </div>
              <AnalyticsLink
                eventName="map_type_filter_open"
                href={`${localePath(locale, mapSuffix)}#type=${encodeURIComponent(type.subtype)}`}
                payload={{
                  locale,
                  map_slug: map.slug,
                  surface: "map-seo",
                  target_key: map.slug,
                  target_kind: "map",
                  type_slug: type.slug,
                }}
              >
                {text.openMap}
              </AnalyticsLink>
            </div>
            {points.length > 0 ? (
              <ul className="map-seo-list">
                {points.map((point) => {
                  const item = getPoiText(point, locale);
                  return (
                    <li key={point.id}>
                      <a href={localePath(locale, `${mapSuffix}poi/${point.slug}/`)}>
                        <strong>{item.name}</strong>
                        <span>{item.description} · {text.coordinates}: {point.sourceX}, {point.sourceY}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>{description}</p>
            )}
          </section>
          <MapRelatedContent
            locale={locale}
            includeClass={type.slug === "world-boss"}
            includeRift={type.slug === "rift"}
          />
        </main>
      </MapPageFrame>
      <JsonLd value={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${canonicalUrl}#collection`,
            name: heading,
            description: seoDescription,
            url: canonicalUrl,
            image: pageUrl(mapAssetUrl(map.tilePreview)),
            inLanguage: localeConfig[locale].code,
            dateModified: editorialUpdatedAt,
            breadcrumb: { "@id": breadcrumbId },
            ...(points.length > 0 ? {
              mainEntity: {
                "@type": "ItemList",
                "@id": `${canonicalUrl}#points`,
                name: `${mapName} ${typeLabel}`,
                numberOfItems: points.length,
                itemListElement: points.map((point, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: getPoiText(point, locale).name,
                  url: pageUrl(localePath(locale, `${mapSuffix}poi/${point.slug}/`)),
                })),
              },
            } : {}),
          },
          { "@type": "BreadcrumbList", "@id": breadcrumbId, itemListElement: [
            { "@type": "ListItem", position: 1, name: "AION2 KINA", item: pageUrl(`/${locale}/`) },
            { "@type": "ListItem", position: 2, name: text.mapLibrary, item: pageUrl(localePath(locale)) },
            { "@type": "ListItem", position: 3, name: mapName, item: pageUrl(localePath(locale, mapSuffix)) },
            { "@type": "ListItem", position: 4, name: typeLabel, item: pageUrl(canonical) },
          ] },
        ],
      }} />
    </>
  );
}
