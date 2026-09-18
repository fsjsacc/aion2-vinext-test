import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd, MapBreadcrumbs, MapPageFrame, MapRelatedContent } from "@/app/map-app/MapSeoChrome";
import { isMapPoiPublicationIndexable } from "@/app/map-seo-publication";
import {
  absoluteMapUrl,
  buildMapSeoTitle,
  copy,
  getCompactMapName,
  getMapBySlug,
  getMapDataLocale,
  getMapImageAlt,
  getMapName,
  getMapOpenGraphAlternateLocales,
  getMapOpenGraphLocale,
  getMapPagePublication,
  getMapPoiDescription,
  getPoiText,
  getPublishedMapType,
  getPublishedPoi,
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

type Props = { params: Promise<{ locale: string; map: string; poi: string }> };

function resolveRoute(route: { locale: string; map: string; poi: string }) {
  if (!isLocaleSlug(route.locale)) notFound();
  const map = getMapBySlug(route.map);
  const publishedPoi = getPublishedPoi(route.map, route.poi);
  if (!map || !publishedPoi) notFound();
  return {
    locale: route.locale as LocaleSlug,
    map,
    poi: publishedPoi.poi,
    publication: publishedPoi.publication,
  };
}

function percent(value: number, extent: number) {
  return `${Math.max(0, Math.min(100, (value / extent) * 100)).toFixed(3)}%`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, map, poi, publication } = resolveRoute(await params);
  const item = getPoiText(poi, locale);
  const mapName = getMapName(map, locale);
  const compactMapName = getCompactMapName(map, locale);
  const suffix = `/tools/map/${map.slug}/poi/${poi.slug}/`;
  const canonical = localePath(locale, suffix);
  const descriptionSource = getMapPoiDescription(map, poi, locale);
  const description = buildSeoDescription(
    descriptionSource,
    locale,
    "map",
  );
  const socialImage = mapAssetUrl(map.tilePreview);
  const socialImageAlt = getMapImageAlt(mapName, locale, item.name);
  const socialTitle = locale === "ko"
    ? `${item.name} 위치 · ${compactMapName} 아이온2 지도`
    : `${item.name} · ${compactMapName}`;
  const title = buildMapSeoTitle(socialTitle);
  const isIndexable = isMapPoiPublicationIndexable(publication);
  return {
    title,
    description,
    robots: { index: isIndexable, follow: true },
    alternates: {
      canonical,
      ...(isIndexable ? { languages: languageAlternates(suffix) } : {}),
    },
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
      title: socialTitle,
      description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export default async function PoiPage({ params }: Props) {
  const { locale, map, poi, publication } = resolveRoute(await params);
  const siteOrigin = await getRequestSiteOrigin();
  const pageUrl = (path: string) => absoluteMapUrl(path, siteOrigin);
  const text = copy[locale];
  const item = getPoiText(poi, locale);
  const mapName = getMapName(map, locale);
  const description = getMapPoiDescription(map, poi, locale);
  const seoDescription = buildSeoDescription(description, locale, "map");
  const suffix = `/tools/map/${map.slug}/poi/${poi.slug}/`;
  const mapSuffix = `/tools/map/${map.slug}/`;
  const canonical = localePath(locale, suffix);
  const canonicalUrl = pageUrl(canonical);
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const category =
    mapSeoData.categories[getMapDataLocale(locale)]?.[poi.category] ??
    poi.category;
  const parentType = publication.typeSlug
    ? getPublishedMapType(map.slug, publication.typeSlug)
    : undefined;
  const typeSuffix = parentType
    ? `/tools/map/${map.slug}/type/${parentType.slug}/`
    : undefined;
  const editorialUpdatedAt =
    getMapPagePublication(map.slug)?.updatedAt
    ?? mapSeoData.source.generatedAt.slice(0, 10);
  const previewStyle = {
    "--map-poi-x": percent(poi.sourceX * map.scaleX, map.width),
    "--map-poi-y": percent(
      (map.sourceHeight - poi.sourceY) * map.scaleY,
      map.height,
    ),
  } as CSSProperties & { "--map-poi-x": string; "--map-poi-y": string };
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "AION2 KINA", item: pageUrl(`/${locale}/`) },
    { "@type": "ListItem", position: 2, name: text.mapLibrary, item: pageUrl(localePath(locale)) },
    { "@type": "ListItem", position: 3, name: mapName, item: pageUrl(localePath(locale, mapSuffix)) },
    ...(typeSuffix
      ? [{ "@type": "ListItem", position: 4, name: text.worldBosses, item: pageUrl(localePath(locale, typeSuffix)) }]
      : []),
    { "@type": "ListItem", position: typeSuffix ? 5 : 4, name: item.name, item: pageUrl(canonical) },
  ];

  return (
    <>
      <MapPageFrame>
        <MapBreadcrumbs
          locale={locale}
          map={map}
          parent={typeSuffix ? { label: text.worldBosses, href: localePath(locale, typeSuffix) } : undefined}
          current={item.name}
        />
        <main>
          <section className="map-seo-hero">
            <div className="map-seo-hero-copy">
              <p className="map-seo-kicker">
                AION2 {text.interactiveMap} · {category}
              </p>
              <h1>{item.name}</h1>
              <p>{description}</p>
              <div className="map-seo-actions">
                <a className="map-seo-button" href={`${localePath(locale, mapSuffix)}#poi=${poi.id}`}>{text.interactiveMap}</a>
                {typeSuffix && <a className="map-seo-button" href={localePath(locale, typeSuffix)}>{text.allBosses}</a>}
                <a className="map-seo-button" href={localePath(locale, mapSuffix)}>{text.backToMaps}</a>
              </div>
            </div>
            <figure className="map-seo-preview map-seo-preview--poi" style={previewStyle}>
              <img src={mapAssetUrl(map.tilePreview)} width="512" height="512" alt={getMapImageAlt(mapName, locale, item.name)} />
              <i className="map-seo-preview-marker" aria-hidden="true" />
              <span>{text.staticPreview} · {poi.sourceX}, {poi.sourceY}</span>
            </figure>
          </section>

          <section className="map-seo-section">
            <div className="map-seo-section-heading"><div><p className="map-seo-kicker">{mapName}</p><h2>{item.name}</h2></div></div>
            <dl className="map-seo-detail">
              <div><dt>{text.mapLibrary}</dt><dd><a href={localePath(locale, mapSuffix)}>{mapName}</a></dd></div>
              {typeSuffix && <div><dt>{text.worldBosses}</dt><dd><a href={localePath(locale, typeSuffix)}>{mapName} · {text.worldBosses}</a></dd></div>}
              <div><dt>{text.categorySummary}</dt><dd>{typeSuffix ? text.worldBosses : category}</dd></div>
              <div><dt>{text.coordinates}</dt><dd>{poi.sourceX}, {poi.sourceY}</dd></div>
              {poi.region && <div><dt>{text.regions}</dt><dd>{poi.region}</dd></div>}
            </dl>
            <p className="map-seo-source-note">{text.poiDescription}</p>
          </section>
          <MapRelatedContent locale={locale} includeClass />
        </main>
      </MapPageFrame>
      <JsonLd value={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${canonicalUrl}#webpage`,
            name: item.name,
            description: seoDescription,
            url: canonicalUrl,
            image: pageUrl(mapAssetUrl(map.tilePreview)),
            inLanguage: localeConfig[locale].code,
            dateModified: editorialUpdatedAt,
            breadcrumb: { "@id": breadcrumbId },
            relatedLink: [
              pageUrl(localePath(locale, "/guides/interactive-map-quickstart/")),
              pageUrl(localePath(locale, "/database/map-data-methodology/")),
              pageUrl(localePath(locale, "/classes/class-planning-framework/")),
            ],
            isPartOf: {
              "@type": "CollectionPage",
              name: typeSuffix ? `${mapName} ${text.worldBosses}` : mapName,
              url: pageUrl(localePath(locale, typeSuffix ?? mapSuffix)),
            },
            mainEntity: {
              "@type": "Thing",
              "@id": `${canonicalUrl}#poi`,
              identifier: poi.id,
              name: item.name,
              description: item.description,
              additionalProperty: [
                { "@type": "PropertyValue", name: text.categorySummary, value: category },
                { "@type": "PropertyValue", name: text.coordinates, value: `${poi.sourceX}, ${poi.sourceY}` },
              ],
            },
          },
          { "@type": "BreadcrumbList", "@id": breadcrumbId, itemListElement: breadcrumbItems },
        ],
      }} />
    </>
  );
}
