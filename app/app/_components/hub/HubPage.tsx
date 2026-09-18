import type { CSSProperties } from "react";

import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";
import type { HubContent, HubSection } from "@/app/hub-content";
import {
  getContentEntries,
  getContentHref,
  getContentTranslation,
  type ContentEntry,
} from "@/app/content-registry";
import { getContentOverrides } from "@/app/content-overrides";
import { LocalizationStatusNotice } from "@/app/_components/localization/LocalizationStatusNotice";
import type { SiteSearchResult } from "@/app/search-index";
import {
  breadcrumbAriaLabel,
  getSectionHref,
  localizedHref,
  resolveLocalizedCopy,
  siteLocaleConfig,
  siteNavigation,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";

type HubPageProps = {
  locale: SiteLocale;
  section: HubSection;
  content: HubContent;
};

const HUB_MEDIA_ASPECT_RATIO = 1200 / 630;

function getImagePresentation(image: NonNullable<ContentEntry["heroImage"]>) {
  if (image.presentation) return image.presentation;

  const sourceAspectRatio = image.width / image.height;
  const ratioDifference = Math.abs(sourceAspectRatio - HUB_MEDIA_ASPECT_RATIO)
    / HUB_MEDIA_ASPECT_RATIO;
  return ratioDifference <= 0.05 ? "cover" : "contain";
}

const searchCopy: Record<
  SiteLocale,
  {
    breadcrumb: string;
    kicker: string;
    title: string;
    description: string;
    label: string;
    placeholder: string;
    submit: string;
    empty: string;
    unavailable: (query: string) => string;
    results: (count: number) => string;
    browse: string;
  }
> = {
  "zh-hans": {
    breadcrumb: "搜索",
    kicker: "站内搜索",
    title: "搜索 AION2 KINA",
    description: "搜索 AION2 攻略、职业、物品、工具与官方消息。",
    label: "搜索 KINA",
    placeholder: "搜索攻略、职业、物品或地区",
    submit: "搜索",
    empty: "输入关键词，或从下方内容中心开始浏览。",
    unavailable: (query) => `没有找到与“${query}”匹配的内容，请尝试其他关键词。`,
    results: (count) => `找到 ${count} 个结果`,
    browse: "浏览内容中心",
  },
  "zh-hant": {
    breadcrumb: "搜尋",
    kicker: "站內搜尋",
    title: "搜尋 AION2 KINA",
    description: "搜尋 AION2 攻略、職業、物品、工具與官方消息。",
    label: "搜尋 KINA",
    placeholder: "輸入攻略、職業、物品或地區",
    submit: "搜尋",
    empty: "輸入關鍵字，或先從下方的內容中心開始瀏覽。",
    unavailable: (query) => `找不到符合「${query}」的內容，請嘗試其他關鍵字。`,
    results: (count) => `找到 ${count} 個結果`,
    browse: "瀏覽內容中心",
  },
  en: {
    breadcrumb: "Search",
    kicker: "SEARCH",
    title: "Search AION2 KINA",
    description: "Search AION2 guides, classes, items, tools, and official news.",
    label: "Search KINA",
    placeholder: "Search a guide, class, item, or region",
    submit: "Search",
    empty: "Enter a query or start with one of the content hubs below.",
    unavailable: (query) => `No content matched “${query}”. Try another search term.`,
    results: (count) => `${count} result${count === 1 ? "" : "s"}`,
    browse: "Browse content hubs",
  },
  fr: {
    breadcrumb: "Recherche",
    kicker: "RECHERCHE",
    title: "Rechercher sur AION2 KINA",
    description: "Recherchez guides, classes, objets, outils et actualités officielles AION2.",
    label: "Rechercher sur KINA",
    placeholder: "Guide, classe, objet ou région",
    submit: "Rechercher",
    empty: "Saisissez un terme ou explorez les rubriques ci-dessous.",
    unavailable: (query) => `Aucun contenu ne correspond à « ${query} ». Essayez un autre terme.`,
    results: (count) => `${count} résultat${count === 1 ? "" : "s"}`,
    browse: "Parcourir les rubriques",
  },
  de: {
    breadcrumb: "Suche",
    kicker: "SUCHE",
    title: "AION2 KINA durchsuchen",
    description: "Durchsuche AION2-Guides, Klassen, Gegenstände, Tools und offizielle Meldungen.",
    label: "KINA durchsuchen",
    placeholder: "Guide, Klasse, Gegenstand oder Region",
    submit: "Suchen",
    empty: "Gib einen Suchbegriff ein oder öffne einen der Bereiche unten.",
    unavailable: (query) => `Keine Inhalte für „${query}“ gefunden. Versuche einen anderen Begriff.`,
    results: (count) => `${count} Ergebnis${count === 1 ? "" : "se"}`,
    browse: "Inhalte durchsuchen",
  },
  es: {
    breadcrumb: "Buscar",
    kicker: "BÚSQUEDA",
    title: "Buscar en AION2 KINA",
    description: "Busca guías, clases, objetos, herramientas y noticias oficiales de AION2.",
    label: "Buscar en KINA",
    placeholder: "Guía, clase, objeto o región",
    submit: "Buscar",
    empty: "Introduce una búsqueda o explora las secciones inferiores.",
    unavailable: (query) => `No hay contenido que coincida con «${query}». Prueba otro término.`,
    results: (count) => `${count} resultado${count === 1 ? "" : "s"}`,
    browse: "Explorar secciones",
  },
  ja: {
    breadcrumb: "検索",
    kicker: "サイト内検索",
    title: "AION2 KINA を検索",
    description: "AION2 の攻略、クラス、アイテム、ツール、公式ニュースを検索します。",
    label: "KINA を検索",
    placeholder: "攻略、クラス、アイテム、地域",
    submit: "検索",
    empty: "キーワードを入力するか、下のコンテンツから選んでください。",
    unavailable: (query) => `「${query}」に一致するコンテンツはありません。別の語句をお試しください。`,
    results: (count) => `${count} 件の結果`,
    browse: "コンテンツを見る",
  },
  "pt-br": {
    breadcrumb: "Busca",
    kicker: "BUSCA",
    title: "Buscar no AION2 KINA",
    description: "Busque guias, classes, itens, ferramentas e notícias oficiais de AION2.",
    label: "Buscar na KINA",
    placeholder: "Guia, classe, item ou região",
    submit: "Buscar",
    empty: "Digite um termo ou explore as áreas abaixo.",
    unavailable: (query) => `Nenhum conteúdo corresponde a “${query}”. Tente outro termo.`,
    results: (count) => `${count} resultado${count === 1 ? "" : "s"}`,
    browse: "Explorar áreas",
  },
  ru: {
    breadcrumb: "Поиск",
    kicker: "ПОИСК",
    title: "Поиск по AION2 KINA",
    description: "Ищите гайды, классы, предметы, инструменты и официальные новости AION2.",
    label: "Поиск по KINA",
    placeholder: "Гайд, класс, предмет или регион",
    submit: "Найти",
    empty: "Введите запрос или откройте один из разделов ниже.",
    unavailable: (query) => `По запросу «${query}» ничего не найдено. Попробуйте другие слова.`,
    results: (count) => `Результатов: ${count}`,
    browse: "Разделы сайта",
  },
  ko: {
    breadcrumb: "검색",
    kicker: "사이트 검색",
    title: "AION2 KINA 검색",
    description: "AION2 공략, 직업, 아이템, 도구와 공식 소식을 검색하세요.",
    label: "KINA 검색",
    placeholder: "공략, 직업, 아이템 또는 지역 검색",
    submit: "검색",
    empty: "검색어를 입력하거나 아래 콘텐츠 허브에서 먼저 둘러보세요.",
    unavailable: (query) => `“${query}”와 일치하는 콘텐츠가 없습니다. 다른 검색어를 사용해 주세요.`,
    results: (count) => `검색 결과 ${count}개`,
    browse: "콘텐츠 허브 둘러보기",
  },
};

function formatDate(locale: SiteLocale, value: string) {
  return new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

const publishedCopy: Record<
  SiteLocale,
  { kicker: string; title: string; updated: string }
> = {
  "zh-hans": { kicker: "探索", title: "内容列表", updated: "更新" },
  en: { kicker: "Explore", title: "Browse content", updated: "Updated" },
  fr: { kicker: "Explorer", title: "Parcourir le contenu", updated: "Mis à jour" },
  de: { kicker: "Entdecken", title: "Inhalte durchsuchen", updated: "Aktualisiert" },
  es: { kicker: "Explorar", title: "Explorar contenido", updated: "Actualizado" },
  ja: { kicker: "コンテンツを探す", title: "コンテンツ一覧", updated: "更新" },
  "pt-br": { kicker: "Explorar", title: "Explorar conteúdo", updated: "Atualizado" },
  ru: { kicker: "Обзор", title: "Просмотреть материалы", updated: "Обновлено" },
  ko: { kicker: "둘러보기", title: "콘텐츠 목록", updated: "업데이트" },
  "zh-hant": { kicker: "探索", title: "內容列表", updated: "更新" },
};

function Breadcrumbs({
  locale,
  current,
}: {
  locale: SiteLocale;
  current: string;
}) {
  const homeLabel = siteShellCopy[locale].navigation.home;

  return (
    <nav className="hub-breadcrumbs" aria-label={breadcrumbAriaLabel[locale]}>
      <ol>
        <li>
          <a href={getSectionHref(locale, "home")}>{homeLabel}</a>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

function HubLinks({
  locale,
  current,
  label,
}: {
  locale: SiteLocale;
  current?: HubSection;
  label: string;
}) {
  const copy = siteShellCopy[locale];
  const items = siteNavigation.filter(
    (item) => item.section !== "home" && item.section !== current,
  );

  return (
    <section className="hub-links" aria-labelledby="hub-links-title">
      <p className="hub-links-label" id="hub-links-title">
        {label}
      </p>
      <nav aria-label={label}>
        {items.map((item) => (
          <a href={getSectionHref(locale, item.section)} key={item.section}>
            <span>{copy.navigation[item.section]}</span>
            <b aria-hidden="true">→</b>
          </a>
        ))}
      </nav>
    </section>
  );
}

function mergeEntries(
  compiled: readonly ContentEntry[],
  db: readonly ContentEntry[],
): readonly ContentEntry[] {
  const bySlug = new Map<string, ContentEntry>();
  for (const entry of compiled) bySlug.set(entry.slug, entry);
  for (const entry of db) bySlug.set(entry.slug, entry); // DB 优先覆盖
  return Array.from(bySlug.values()).sort(
    (a, b) =>
      b.updatedAt.localeCompare(a.updatedAt) ||
      b.publishedAt.localeCompare(a.publishedAt),
  );
}

export async function HubPage({ locale, section, content }: HubPageProps) {
  const siteOrigin = await getRequestSiteOrigin();
  const sectionLabel = siteShellCopy[locale].navigation[section];
  const overrides = await getContentOverrides();
  const compiledEntries: readonly ContentEntry[] = section === "tools"
    ? []
    : getContentEntries(section);
  const dbEntries = Array.from(overrides.values()).filter(
    (e) => e.section === section,
  );
  const publishedEntries = mergeEntries(compiledEntries, dbEntries);
  const publishedLabels = publishedCopy[locale];
  const homeUrl = absoluteSiteUrl(getSectionHref(locale, "home"), siteOrigin);
  const canonicalUrl = absoluteSiteUrl(getSectionHref(locale, section), siteOrigin);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: content.title,
        description: content.description,
        inLanguage: siteLocaleConfig[locale].code,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: publishedEntries.length,
          itemListElement: publishedEntries.map((entry, index) => {
            const { content: entryCopy } = getContentTranslation(entry, locale);
            return {
              "@type": "ListItem",
              position: index + 1,
              name: entryCopy.title,
              url: absoluteSiteUrl(getContentHref(locale, entry), siteOrigin),
            };
          }),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AION2 KINA", item: homeUrl },
          { "@type": "ListItem", position: 2, name: sectionLabel, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className="hub-main" id="main-content">
      <section className="hub-hero" aria-labelledby="hub-title">
        <div className="shell hub-shell">
          <Breadcrumbs locale={locale} current={sectionLabel} />
          <div className="hub-hero-grid">
            <div>
              <p className="hub-kicker">{content.kicker}</p>
              <h1 id="hub-title">{content.title}</h1>
            </div>
            <p className="hub-description">{content.description}</p>
          </div>
          <p className="hub-availability">
            <span aria-hidden="true" />
            {content.availability}
          </p>
        </div>
      </section>

      <section className="hub-directory" aria-label={sectionLabel}>
        <div className="shell hub-shell">
          <div className="hub-card-grid">
            {content.cards.map((card, index) => {
              const body = (
                <>
                  <div className="hub-card-topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i aria-hidden="true">↗</i>
                  </div>
                  <p>{card.eyebrow}</p>
                  <h2>{card.title}</h2>
                  <div className="hub-card-rule" aria-hidden="true" />
                  <span className="hub-card-description">{card.description}</span>
                  <b>
                    {card.action} <span aria-hidden="true">→</span>
                  </b>
                </>
              );

              return (
                <a
                  className="hub-card hub-card-link"
                  href={localizedHref(locale, card.href)}
                  key={card.title}
                >
                  {body}
                </a>
              );
            })}
          </div>

          {publishedEntries.length > 0 && (
            <section className="hub-published" aria-labelledby="hub-published-title">
              <LocalizationStatusNotice locale={locale} />
              <div className="hub-published-heading">
                <p className="hub-links-label">{publishedLabels.kicker}</p>
                <h2 id="hub-published-title">{publishedLabels.title}</h2>
              </div>
              <div className="hub-published-list">
                {publishedEntries.map((entry) => {
                  const { content: entryCopy } = getContentTranslation(entry, locale);
                  const heroTranslation = entry.heroImage
                    ? resolveLocalizedCopy(entry.heroImage.translations, locale)
                    : null;
                  const imagePresentation = entry.heroImage
                    ? getImagePresentation(entry.heroImage)
                    : null;
                  const imageStyle = entry.heroImage && imagePresentation === "contain"
                    ? ({
                        "--hub-published-image": `url(${JSON.stringify(entry.heroImage.src)})`,
                      } as CSSProperties)
                    : undefined;
                  return (
                    <AnalyticsLink
                      className="hub-published-card has-media"
                      eventName="content_card_click"
                      href={getContentHref(locale, entry)}
                      key={entry.slug}
                      payload={{
                        content_slug: entry.slug,
                        has_media: Boolean(entry.heroImage),
                        locale,
                        section,
                        surface: "hub_published_card",
                      }}
                    >
                      {entry.heroImage ? (
                        <span
                          className="hub-published-image"
                          data-image-rights={entry.heroImage.rights}
                          data-image-presentation={imagePresentation}
                          style={imageStyle}
                        >
                          {/* Linked source media stays on the credited origin instead of being copied or proxied. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={heroTranslation?.alt ?? entryCopy.title}
                            height={entry.heroImage.height}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            src={entry.heroImage.src}
                            width={entry.heroImage.width}
                          />
                        </span>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="hub-published-image hub-published-image--fallback"
                          data-image-presentation="fallback"
                        >
                          <span className="hub-published-image-fallback-copy">
                            <small>AION2 KINA</small>
                            <b>{sectionLabel}</b>
                            <span>{entryCopy.eyebrow}</span>
                          </span>
                        </span>
                      )}
                      <div className="hub-published-body">
                        <span className="hub-published-meta">
                          <b>{entryCopy.eyebrow}</b>
                          <time dateTime={entry.updatedAt}>
                            {publishedLabels.updated} {formatDate(locale, entry.updatedAt)}
                          </time>
                        </span>
                        <h3>{entryCopy.title}</h3>
                        <p>{entryCopy.description}</p>
                        <span className="hub-published-action">
                          {entryCopy.readingTime} <i aria-hidden="true">→</i>
                        </span>
                      </div>
                    </AnalyticsLink>
                  );
                })}
              </div>
            </section>
          )}

          <HubLinks
            locale={locale}
            current={section}
            label={content.exploreLabel}
          />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <style>{hubStyles}</style>
    </main>
  );
}

export function SearchPage({
  locale,
  query,
  results,
}: {
  locale: SiteLocale;
  query: string;
  results: SiteSearchResult[];
}) {
  const copy = searchCopy[locale];

  return (
    <main className="hub-main" id="main-content">
      <section className="hub-hero hub-search-hero" aria-labelledby="search-title">
        <div className="shell hub-shell">
          <Breadcrumbs locale={locale} current={copy.breadcrumb} />
          <div className="hub-hero-grid">
            <div>
              <p className="hub-kicker">{copy.kicker}</p>
              <h1 id="search-title">{copy.title}</h1>
            </div>
            <p className="hub-description">{copy.description}</p>
          </div>

          <form
            action={localizedHref(locale, "/search/")}
            className="hub-search-form"
            method="get"
            role="search"
          >
            <label htmlFor="site-search-query">{copy.label}</label>
            <div>
              <input
                autoComplete="off"
                defaultValue={query}
                id="site-search-query"
                name="q"
                placeholder={copy.placeholder}
                type="search"
              />
              <button type="submit">{copy.submit}</button>
            </div>
          </form>
        </div>
      </section>

      <section className="hub-directory hub-search-directory" aria-live="polite">
        <div className="shell hub-shell">
          <p className="hub-search-message">
            {query ? (results.length ? copy.results(results.length) : copy.unavailable(query)) : copy.empty}
          </p>
          {results.length > 0 && (
            <ol className="hub-search-results">
              {results.map((result) => (
                <li key={result.id}>
                  <a href={result.href}>
                    <span>{result.eyebrow}</span>
                    <h2>{result.title}</h2>
                    <p>{result.description}</p>
                    <b>{result.meta}<i aria-hidden="true">→</i></b>
                  </a>
                </li>
              ))}
            </ol>
          )}
          <HubLinks locale={locale} label={copy.browse} />
        </div>
      </section>
      <style>{hubStyles}</style>
    </main>
  );
}

const hubStyles = `
  .hub-main {
    min-height: calc(100vh - 86px);
    color: var(--text, #f4f7ff);
    background:
      radial-gradient(circle at 18% 12%, var(--accent-soft, rgba(92, 200, 255, .12)), transparent 31%),
      radial-gradient(circle at 82% 18%, rgba(181, 138, 255, .1), transparent 28%),
      #07090f;
  }

  .hub-hero {
    padding: 48px 0 70px;
    border-bottom: 1px solid var(--line, rgba(216, 229, 255, .13));
  }

  .hub-shell { position: relative; }

  .hub-breadcrumbs ol {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0;
    margin: 0 0 54px;
    color: var(--text-muted, #778198);
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    list-style: none;
  }

  .hub-breadcrumbs a { color: var(--text-soft, #aab4ca); }
  .hub-breadcrumbs a:hover { color: var(--accent-bright, #a7e7ff); }

  .hub-hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(300px, .65fr);
    align-items: end;
    gap: clamp(42px, 8vw, 110px);
  }

  .hub-kicker,
  .hub-links-label {
    margin: 0 0 14px;
    color: var(--accent-bright, #a7e7ff);
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .18em;
  }

  .hub-hero h1 {
    max-width: 800px;
    margin: 0;
    color: #f7f9ff;
    font-size: clamp(42px, 5.7vw, 78px);
    font-weight: 680;
    line-height: 1.02;
    letter-spacing: -.055em;
    text-wrap: balance;
  }

  .hub-description {
    max-width: 540px;
    margin: 0;
    color: var(--text-soft, #aab4ca);
    font-size: 15px;
    line-height: 1.8;
  }

  .hub-availability {
    max-width: 820px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin: 42px 0 0;
    color: var(--text-muted, #778198);
    font-size: 12px;
    line-height: 1.7;
  }

  .hub-availability > span {
    width: 7px;
    height: 7px;
    flex: none;
    margin-top: 7px;
    border-radius: 50%;
    background: var(--accent, #5cc8ff);
    box-shadow: 0 0 16px var(--accent-glow, rgba(92, 200, 255, .34));
  }

  .hub-directory { padding: 72px 0 96px; }

  .hub-card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    overflow: hidden;
    border: 1px solid var(--line, rgba(216, 229, 255, .13));
    border-radius: 18px;
    background: var(--line, rgba(216, 229, 255, .13));
  }

  .hub-card {
    min-height: 320px;
    display: flex;
    flex-direction: column;
    padding: 28px;
    color: var(--text, #f4f7ff);
    background:
      linear-gradient(150deg, rgba(255,255,255,.026), transparent 48%),
      #0a0d16;
  }

  .hub-card-link { transition: background 240ms ease, transform 240ms ease; }
  .hub-card-link:hover {
    background:
      linear-gradient(150deg, var(--accent-soft, rgba(92, 200, 255, .14)), transparent 58%),
      #0d111d;
  }

  .hub-card-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-muted, #778198);
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
  }

  .hub-card-topline i { font-size: 15px; font-style: normal; }
  .hub-card-link:hover .hub-card-topline i { color: var(--accent-bright, #a7e7ff); }

  .hub-card > p {
    margin: 44px 0 9px;
    color: var(--accent-bright, #a7e7ff);
    font-family: var(--font-geist-mono), monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .17em;
  }

  .hub-card h2 {
    margin: 0;
    font-size: 24px;
    line-height: 1.18;
    letter-spacing: -.035em;
  }

  .hub-card-rule {
    width: 38px;
    height: 1px;
    margin: 20px 0;
    background: linear-gradient(90deg, var(--accent, #5cc8ff), transparent);
    transition: width 240ms ease;
  }

  .hub-card-link:hover .hub-card-rule { width: 72px; }

  .hub-card-description {
    color: var(--text-soft, #aab4ca);
    font-size: 13px;
    line-height: 1.7;
  }

  .hub-card > b {
    width: max-content;
    margin-top: auto;
    font-size: 11px;
    font-weight: 650;
  }

  .hub-card > b { color: var(--text, #f4f7ff); }
  .hub-card > b span { color: var(--accent-bright, #a7e7ff); }

  .hub-links {
    margin-top: 56px;
    padding-top: 34px;
    border-top: 1px solid var(--line, rgba(216, 229, 255, .13));
  }

  .hub-published {
    margin-top: 64px;
    padding-top: 42px;
    border-top: 1px solid var(--line, rgba(216, 229, 255, .13));
  }

  .hub-published-heading h2 {
    margin: 0 0 24px;
    color: #f7f9ff;
    font-size: clamp(28px, 4vw, 42px);
    letter-spacing: -.04em;
  }

  .hub-published-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .hub-published-list > a {
    min-width: 0;
    min-height: 0;
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
    padding: 0;
    border: 1px solid var(--line, rgba(216, 229, 255, .13));
    border-radius: 18px;
    color: var(--text, #f4f7ff);
    background: rgba(10, 13, 22, .82);
    transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
  }

  .hub-published-list > a:hover {
    border-color: var(--panel-border, rgba(167, 231, 255, .2));
    background: var(--accent-soft, rgba(92, 200, 255, .1));
    transform: translateY(-2px);
  }

  .hub-published-list > a:focus-visible {
    outline: 2px solid var(--accent-bright, #a7e7ff);
    outline-offset: 3px;
  }

  .hub-published-body {
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 22px 24px 24px;
  }

  .hub-published-meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    color: var(--text-muted, #778198);
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    line-height: 1.45;
    letter-spacing: .06em;
  }

  .hub-published-meta b {
    color: var(--accent-bright, #a7e7ff);
    font-weight: 760;
  }

  .hub-published-meta time {
    flex: 0 0 auto;
    text-align: right;
  }

  .hub-published-image {
    position: relative;
    isolation: isolate;
    width: 100%;
    height: auto;
    aspect-ratio: 1200 / 630;
    display: grid;
    place-items: center;
    overflow: hidden;
    margin: 0;
    border: 0;
    border-bottom: 1px solid var(--line, rgba(216, 229, 255, .13));
    border-radius: 0;
    background: #080b13;
  }

  .hub-published-image img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    padding: 18px;
    object-fit: contain;
    object-position: center;
    transition: transform 260ms ease;
  }

  .hub-published-image[data-image-rights="linked-official-media"] img {
    padding: 0;
    object-fit: cover;
  }

  .hub-published-image[data-image-presentation="contain"] {
    background: #172437;
  }

  .hub-published-image[data-image-presentation="contain"]::before {
    content: "";
    position: absolute;
    z-index: 0;
    inset: -22px;
    background-image: var(--hub-published-image);
    background-position: center;
    background-size: cover;
    filter: blur(20px) brightness(.42) saturate(.76);
    opacity: .82;
    transform: scale(1.06);
  }

  .hub-published-image[data-image-presentation="contain"] img {
    padding: 0;
    object-fit: contain;
  }

  .hub-published-image--fallback {
    background:
      radial-gradient(circle at 74% 24%, color-mix(in srgb, var(--accent-bright, #a7e7ff) 22%, transparent), transparent 32%),
      linear-gradient(135deg, #10192a 0%, #0a0f1b 58%, #14152a 100%);
  }

  .hub-published-image--fallback::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: .3;
    background-image:
      linear-gradient(rgba(167, 231, 255, .14) 1px, transparent 1px),
      linear-gradient(90deg, rgba(167, 231, 255, .14) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(135deg, transparent 4%, #000 44%, transparent 96%);
  }

  .hub-published-image-fallback-copy {
    position: relative;
    z-index: 1;
    width: min(76%, 330px);
    display: grid;
    gap: 7px;
    padding: 18px 20px;
    border: 1px solid rgba(167, 231, 255, .22);
    background: rgba(7, 11, 20, .66);
    box-shadow: 0 18px 50px rgba(0, 0, 0, .24);
    backdrop-filter: blur(10px);
  }

  .hub-published-image-fallback-copy small,
  .hub-published-image-fallback-copy span {
    color: var(--text-muted, #778198);
    font-family: var(--font-geist-mono), monospace;
    font-size: 9px;
    line-height: 1.4;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .hub-published-image-fallback-copy b {
    color: var(--text, #f4f7ff);
    font-size: clamp(22px, 3vw, 34px);
    line-height: 1.05;
    letter-spacing: -.04em;
  }

  .hub-published-list > a:hover .hub-published-image[data-image-presentation="cover"] img {
    transform: scale(1.025);
  }

  .hub-published-list h3 {
    margin: 18px 0 10px;
    font-size: clamp(21px, 2vw, 24px);
    line-height: 1.25;
    letter-spacing: -.03em;
  }

  .hub-published-list p {
    display: -webkit-box;
    overflow: hidden;
    margin: 0;
    color: var(--text-soft, #aab4ca);
    font-size: 13px;
    line-height: 1.72;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .hub-published-action {
    margin-top: auto;
    padding-top: 22px;
    font-size: 11px;
    font-weight: 700;
  }

  .hub-published-action i { margin-left: 8px; color: var(--accent-bright, #a7e7ff); font-style: normal; }

  .hub-links nav {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 10px;
  }

  .hub-links a {
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid var(--line, rgba(216, 229, 255, .13));
    border-radius: 12px;
    color: var(--text-soft, #aab4ca);
    background: rgba(14, 18, 31, .56);
    font-size: 12px;
    transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
  }

  .hub-links a:hover {
    border-color: var(--panel-border, rgba(167, 231, 255, .2));
    color: var(--text, #f4f7ff);
    background: var(--accent-soft, rgba(92, 200, 255, .1));
  }

  .hub-links b { color: var(--accent-bright, #a7e7ff); }

  .hub-search-form {
    max-width: 840px;
    margin-top: 48px;
  }

  .hub-search-form > label {
    display: block;
    margin-bottom: 10px;
    color: var(--text-soft, #aab4ca);
    font-size: 12px;
    font-weight: 650;
  }

  .hub-search-form > div {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
  }

  .hub-search-form input,
  .hub-search-form button {
    min-height: 52px;
    border: 1px solid var(--line, rgba(216, 229, 255, .13));
    border-radius: 12px;
    font: inherit;
  }

  .hub-search-form input {
    min-width: 0;
    padding: 0 16px;
    color: var(--text, #f4f7ff);
    background: rgba(14, 18, 31, .8);
  }

  .hub-search-form input::placeholder { color: var(--text-muted, #778198); }

  .hub-search-form button {
    padding: 0 24px;
    color: #061019;
    background: var(--accent-bright, #a7e7ff);
    font-weight: 750;
    cursor: pointer;
  }

  .hub-search-directory { min-height: 330px; }
  .hub-search-message {
    max-width: 900px;
    margin: 0;
    color: var(--text-soft, #aab4ca);
    font-size: 15px;
    line-height: 1.8;
  }

  .hub-search-results {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 0;
    margin: 30px 0 0;
    list-style: none;
  }

  .hub-search-results a {
    min-height: 244px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    border: 1px solid var(--line, rgba(216, 229, 255, .13));
    border-radius: 15px;
    color: var(--text, #f4f7ff);
    background: rgba(10, 13, 22, .82);
  }

  .hub-search-results a > span { color: var(--accent-bright, #a7e7ff); font-family: var(--font-geist-mono), monospace; font-size: 9px; letter-spacing: .14em; }
  .hub-search-results h2 { margin: 26px 0 10px; font-size: 22px; letter-spacing: -.03em; }
  .hub-search-results p { margin: 0; color: var(--text-soft, #aab4ca); font-size: 13px; line-height: 1.7; }
  .hub-search-results b { display: flex; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 24px; color: var(--text-muted, #778198); font-size: 10px; }
  .hub-search-results i { color: var(--accent-bright, #a7e7ff); font-style: normal; }

  @media (max-width: 1020px) {
    .hub-hero-grid { grid-template-columns: 1fr; gap: 26px; }
    .hub-description { max-width: 720px; }
    .hub-card-grid { grid-template-columns: 1fr; gap: 1px; }
    .hub-card { min-height: 270px; }
    .hub-links nav { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hub-published-list,
    .hub-search-results { grid-template-columns: 1fr; }
    .hub-published-list > a.has-media {
      grid-template-columns: minmax(220px, 38%) minmax(0, 1fr);
      grid-template-rows: minmax(238px, auto);
    }
    .hub-published-image {
      height: 100%;
      aspect-ratio: auto;
      border-right: 1px solid var(--line, rgba(216, 229, 255, .13));
      border-bottom: 0;
    }
    .hub-published-body { padding: 26px 28px; }
    .hub-published-list h3 { font-size: clamp(22px, 3.2vw, 27px); }
  }

  @media (max-width: 680px) {
    .hub-hero { padding: 28px 0 46px; }
    .hub-breadcrumbs ol { margin-bottom: 36px; }
    .hub-hero h1 { font-size: clamp(38px, 12vw, 56px); }
    .hub-description { font-size: 14px; }
    .hub-availability { margin-top: 28px; }
    .hub-directory { padding: 42px 0 72px; }
    .hub-card { min-height: 280px; padding: 24px; }
    .hub-links { margin-top: 42px; }
    .hub-links nav { grid-template-columns: 1fr; }
    .hub-links a { min-height: 52px; }
    .hub-search-form > div { grid-template-columns: 1fr; }
    .hub-search-form button { width: 100%; }
    .hub-published { margin-top: 46px; padding-top: 34px; }
    .hub-published-list > a,
    .hub-published-list > a.has-media {
      min-height: 0;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      padding: 0;
    }
    .hub-search-results a { min-height: 230px; padding: 22px; }
    .hub-published-image {
      height: auto;
      aspect-ratio: 16 / 9;
      border-right: 0;
      border-bottom: 1px solid var(--line, rgba(216, 229, 255, .13));
    }
    .hub-published-body { padding: 20px; }
    .hub-published-meta {
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 7px 14px;
    }
    .hub-published-list h3 {
      margin: 16px 0 9px;
      font-size: 21px;
    }
    .hub-published-list p { font-size: 12.5px; }
    .hub-published-action { padding-top: 18px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .hub-published-list > a { transition: none; }
    .hub-published-list > a:hover { transform: none; }
    .hub-published-image img { transition: none; }
    .hub-published-list > a:hover .hub-published-image[data-image-presentation="cover"] img { transform: none; }
  }
`;

export default HubPage;
