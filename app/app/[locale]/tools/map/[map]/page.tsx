import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";
import { MapExperience } from "@/app/map-app/MapExperience";
import { ProvenancePanel } from "@/app/_components/trust/ProvenancePanel";
import { JsonLd, MapBreadcrumbs, MapPageFrame, MapRelatedContent } from "@/app/map-app/MapSeoChrome";
import {
  absoluteMapUrl,
  buildMapSeoTitle,
  copy,
  getMapBySlug,
  getMapDataLocale,
  getMapDescription,
  getMapImageAlt,
  getMapName,
  getMapOpenGraphAlternateLocales,
  getMapOpenGraphLocale,
  getMapPagePublication,
  getMapTypeItemCount,
  getMapTypeLabel,
  getPoiText,
  getPublishedMapType,
  getPublishedMapTypesForMap,
  getPublishedPoisForType,
  isMapPublicationIndexable,
  isLocaleSlug,
  languageAlternates,
  localeConfig,
  localePath,
  mapAssetReleaseBasePath,
  mapAssetUrl,
  mapSeoData,
  type LocaleSlug,
} from "@/app/map-seo";
import { buildSeoDescription } from "@/app/seo-metadata";
import { getRequestSiteOrigin } from "@/app/site-url";

type Props = { params: Promise<{ locale: string; map: string }> };

type MapSourceCopy = {
  summary: string;
  atreiaGuide: string;
  official: string;
  officialUrl: string;
};

const mapSourceCopy = {
  "zh-hans": {
    summary: "AION2 KINA 地图整理、游戏内复核与官方资料",
    atreiaGuide: "Atreia Guide 第三方攻略数据",
    official: "AION2 官方游戏资料与游戏内数据",
    officialUrl: "https://aion2.plaync.com/en-us/index",
  },
  en: {
    summary: "AION2 KINA map curation, in-game review, and official information",
    atreiaGuide: "Atreia Guide third-party guide data",
    official: "Official AION2 game information and in-game data",
    officialUrl: "https://aion2.plaync.com/en-us/index",
  },
  fr: {
    summary: "Sélection AION2 KINA, vérification en jeu et informations officielles",
    atreiaGuide: "Données de guides tierces d'Atreia Guide",
    official: "Informations officielles et données en jeu d’AION2",
    officialUrl: "https://aion2.plaync.com/fr-fr/index",
  },
  de: {
    summary: "AION2-KINA-Kartenredaktion, In-Game-Prüfung und offizielle Informationen",
    atreiaGuide: "Atreia Guide Drittanbieter-Leitfaden-Daten",
    official: "Offizielle AION2-Spielinformationen und In-Game-Daten",
    officialUrl: "https://aion2.plaync.com/de-de/index",
  },
  es: {
    summary: "Selección de mapas de AION2 KINA, revisión en el juego e información oficial",
    atreiaGuide: "Datos de guías de terceros de Atreia Guide",
    official: "Información oficial y datos del juego de AION2",
    officialUrl: "https://aion2.plaync.com/es-es/index",
  },
  ja: {
    summary: "AION2 KINA マップ整理・ゲーム内確認・公式情報",
    atreiaGuide: "Atreia Guide サードパーティガイドデータ",
    official: "AION2 公式情報およびゲーム内データ",
    officialUrl: "https://aion2.plaync.com/ja-jp/index",
  },
  "pt-br": {
    summary: "Curadoria de mapas do AION2 KINA, revisão no jogo e informações oficiais",
    atreiaGuide: "Dados de guias de terceiros da Atreia Guide",
    official: "Informações oficiais e dados de jogo de AION2",
    officialUrl: "https://aion2.plaync.com/pt-br/index",
  },
  ru: {
    summary: "Редакционная подборка карт AION2 KINA, проверка в игре и официальная информация",
    atreiaGuide: "Сторонние данные гайдов Atreia Guide",
    official: "Официальная информация AION2 и внутриигровые данные",
    officialUrl: "https://aion2.plaync.com/en-us/index",
  },
  ko: {
    summary: "AION2 KINA 지도 정리, 게임 내 검토 및 공식 정보",
    atreiaGuide: "Atreia Guide 서드파티 가이드 데이터",
    official: "AION2 공식 정보 및 게임 내 데이터",
    officialUrl: "https://aion2.plaync.com/ko-kr/index",
  },
  "zh-hant": {
    summary: "AION2 KINA 地圖整理、遊戲內複核與官方資料",
    atreiaGuide: "Atreia Guide 第三方攻略資料",
    official: "AION2 官方遊戲資料與遊戲內數據",
    officialUrl: "https://tw.ncsoft.com/aion2/teaser/index",
  },
} as const satisfies Record<LocaleSlug, MapSourceCopy>;

function resolveRoute(localeValue: string, mapSlug: string) {
  if (!isLocaleSlug(localeValue)) notFound();
  const map = getMapBySlug(mapSlug);
  if (!map) notFound();
  return { locale: localeValue as LocaleSlug, map };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await params;
  const { locale, map } = resolveRoute(route.locale, route.map);
  const name = getMapName(map, locale);
  const description = buildSeoDescription(
    getMapDescription(map, locale),
    locale,
    "map",
  );
  const suffix = `/tools/map/${map.slug}/`;
  const canonical = localePath(locale, suffix);
  const socialTitle = locale === "ko"
    ? `${name} 아이온2 지도`
    : `${name} ${copy[locale].interactiveMap}`;
  const title = buildMapSeoTitle(socialTitle);
  const socialImage = mapAssetUrl(map.tilePreview);
  const socialImageAlt = getMapImageAlt(name, locale);
  const indexable = isMapPublicationIndexable(map.slug);
  return {
    title,
    description,
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: {
      canonical,
      ...(indexable ? { languages: languageAlternates(suffix) } : {}),
    },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title: socialTitle,
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

export default async function MapPage({ params }: Props) {
  const route = await params;
  const { locale, map } = resolveRoute(route.locale, route.map);
  const siteOrigin = await getRequestSiteOrigin();
  const pageUrl = (path: string) => absoluteMapUrl(path, siteOrigin);
  const text = copy[locale];
  const sourceCopy = mapSourceCopy[locale];
  const mapName = getMapName(map, locale);
  const worldBossType = getPublishedMapType(map.slug, "world-boss");
  const publishedTypes = getPublishedMapTypesForMap(map.slug);
  const featured = worldBossType
    ? getPublishedPoisForType(map.slug, worldBossType.slug).slice(0, 8)
    : [];
  const categories = Object.entries(map.categoryCounts).sort((a, b) => b[1] - a[1]);
  const suffix = `/tools/map/${map.slug}/`;
  const canonical = localePath(locale, suffix);
  const canonicalUrl = pageUrl(canonical);
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const mapDescription = getMapDescription(map, locale);
  const seoDescription = buildSeoDescription(
    mapDescription,
    locale,
    "map",
  );
  const editorialUpdatedAt = getMapPagePublication(map.slug)?.updatedAt
    ?? mapSeoData.source.generatedAt.slice(0, 10);
  const mapApplication = {
    "@type": "WebApplication",
    "@id": `${canonicalUrl}#application`,
    name: `${mapName} ${text.interactiveMap}`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web browser",
    isAccessibleForFree: true,
    url: canonicalUrl,
    description: seoDescription,
    image: pageUrl(mapAssetUrl(map.tilePreview)),
  };
  const featuredItems = featured.map((poi, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: getPoiText(poi, locale).name,
    url: pageUrl(localePath(locale, `${suffix}poi/${poi.slug}/`)),
  }));
  const categoryItems = categories.map(([category, count], index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Thing",
      name: mapSeoData.categories[getMapDataLocale(locale)]?.[category] ?? category,
      additionalProperty: {
        "@type": "PropertyValue",
        name: text.points,
        value: count,
      },
    },
  }));
  const listItems = featuredItems.length ? featuredItems : categoryItems;
  const mainEntity = map.markerCount === 0
    ? mapApplication
    : {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#catalog`,
        name: featuredItems.length ? text.popularPoints : text.categorySummary,
        numberOfItems: listItems.length,
        itemListElement: listItems,
      };

  return (
    <>
      <MapPageFrame>
        <MapBreadcrumbs locale={locale} map={map} />
        <main className="map-detail-main">
          <header className="map-detail-hero">
            <p className="map-seo-kicker">AION2 {text.interactiveMap} · {map.width}×{map.height}</p>
            <h1>{locale === "ko" ? `${mapName} 아이온2 인터랙티브 지도` : `AION2 ${mapName} ${text.interactiveMap}`}</h1>
            <p>{mapDescription}</p>
          </header>

          <section className="map-seo-embed map-detail-map" id="interactive-map" aria-labelledby="interactive-map-title">
            <h2 id="interactive-map-title">{text.interactiveMap}</h2>
            <MapExperience
              initialLocale={localeConfig[locale].code}
              initialMapName={map.name}
              assetBasePath={mapAssetReleaseBasePath}
              routeSuffix={suffix}
              eager
            />
          </section>

          <section className="map-seo-section map-detail-overview" aria-labelledby="map-static-preview-title">
            <div className="map-detail-overview-copy">
              <p className="map-seo-kicker">{sourceCopy.summary}</p>
              <h2 id="map-static-preview-title">{mapName} {text.staticPreview}</h2>
              <p className="map-detail-overview-description">{mapDescription}</p>
              <dl className="map-seo-stats">
                <div className="map-seo-stat"><strong>{map.markerCount.toLocaleString()}</strong><span>{text.points}</span></div>
                <div className="map-seo-stat"><strong>{map.regionCount.toLocaleString()}</strong><span>{text.regions}</span></div>
                <div className="map-seo-stat"><strong>{map.markerCount > 0 ? text.ready : text.awaitingData}</strong><span>{text.mapStatus}</span></div>
              </dl>
              <div className="map-seo-provenance">
                <ProvenancePanel
                  locale={locale}
                  note={text.sourceNote}
                  reportService="unknown"
                  retrievedAt={mapSeoData.source.generatedAt}
                  sources={[
                    {
                      kind: "third-party",
                      label: sourceCopy.atreiaGuide,
                      publisher: "Atreia Guide",
                      retrievedAt: mapSeoData.source.generatedAt,
                      url: "https://atreiaguide.com",
                    },
                    {
                      kind: "official",
                      label: sourceCopy.official,
                      publisher: "NC Corporation",
                      retrievedAt: mapSeoData.source.generatedAt,
                      url: sourceCopy.officialUrl,
                    },
                  ]}
                  status="catalog-summary"
                  targetKey={`${map.name}/${map.slug}`}
                  targetKind="map"
                  targetLabel={mapName}
                  version={mapSeoData.source.build}
                />
              </div>
            </div>
            <figure className="map-seo-preview map-detail-preview">
              <img
                src={mapAssetUrl(map.tilePreview)}
                width="512"
                height="512"
                loading="lazy"
                decoding="async"
                alt={getMapImageAlt(mapName, locale)}
              />
              <span>{text.staticPreview}</span>
            </figure>
          </section>

          <section className="map-seo-section">
            <div className="map-seo-section-heading"><div><p className="map-seo-kicker">AION2 {text.interactiveMap}</p><h2>{text.categorySummary}</h2></div></div>
            <ul className="map-seo-list">
              {categories.map(([category, count]) => <li key={category}><strong>{mapSeoData.categories[getMapDataLocale(locale)]?.[category] ?? category}</strong><span>{count.toLocaleString(localeConfig[locale].code)} {text.points}</span></li>)}
              {categories.length === 0 && <li><strong>{text.awaitingData}</strong></li>}
            </ul>
          </section>

          {publishedTypes.length > 0 && (
            <section className="map-seo-section" aria-labelledby="map-type-pages-title">
              <div className="map-seo-section-heading">
                <div>
                  <p className="map-seo-kicker">AION2 {text.interactiveMap}</p>
                  <h2 id="map-type-pages-title">{text.popularPoints}</h2>
                </div>
              </div>
              <ul className="map-seo-list">
                {publishedTypes.map((type) => (
                  <li key={type.slug}>
                    <AnalyticsLink
                      eventName="map_site_navigation_click"
                      href={localePath(locale, `${suffix}type/${type.slug}/`)}
                      payload={{
                        destination: `map-type/${map.slug}/${type.slug}`,
                        locale,
                        map_slug: map.slug,
                        surface: "map-seo",
                        target_key: map.slug,
                        target_kind: "map",
                        type_slug: type.slug,
                      }}
                    >
                      <strong>{getMapTypeLabel(type.slug, locale)}</strong>
                      <span>{getMapTypeItemCount(map, type).toLocaleString(localeConfig[locale].code)} {text.points}</span>
                    </AnalyticsLink>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {featured.length > 0 && (
            <section className="map-seo-section">
              <div className="map-seo-section-heading"><div><p className="map-seo-kicker">{text.popularPoints}</p><h2>{text.popularPoints}</h2></div><a href={localePath(locale, `${suffix}type/${worldBossType?.slug ?? "world-boss"}/`)}>{text.allBosses}</a></div>
              <ul className="map-seo-list">
                {featured.map((poi) => {
                  const poiText = getPoiText(poi, locale);
                  return <li key={poi.id}><a href={localePath(locale, `${suffix}poi/${poi.slug}/`)}><strong>{poiText.name}</strong><span>{poiText.description} · {poi.sourceX}, {poi.sourceY}</span></a></li>;
                })}
              </ul>
            </section>
          )}

          <MapRelatedContent locale={locale} />
        </main>
      </MapPageFrame>
      <JsonLd value={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${canonicalUrl}#webpage`,
            name: `${mapName} ${text.interactiveMap}`,
            description: seoDescription,
            url: canonicalUrl,
            image: pageUrl(mapAssetUrl(map.tilePreview)),
            inLanguage: localeConfig[locale].code,
            dateModified: editorialUpdatedAt,
            breadcrumb: { "@id": breadcrumbId },
            mainEntity,
            ...(map.markerCount > 0 ? { hasPart: mapApplication } : {}),
          },
          { "@type": "BreadcrumbList", "@id": breadcrumbId, itemListElement: [
            { "@type": "ListItem", position: 1, name: "AION2 KINA", item: pageUrl(`/${locale}/`) },
            { "@type": "ListItem", position: 2, name: text.mapLibrary, item: pageUrl(localePath(locale)) },
            { "@type": "ListItem", position: 3, name: mapName, item: pageUrl(canonical) },
          ] },
        ],
      }} />
    </>
  );
}
