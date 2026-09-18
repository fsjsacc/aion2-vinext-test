import type { Metadata } from "next";

import {
  buildPfgPersonSchema,
  getPfgAuthorHref,
  getPfgAuthorPersonId,
  PFG_AUTHOR_AVATAR,
  PFG_AUTHOR_NAME,
  pfgAuthorCopy,
} from "@/app/author-profile";
import {
  getContentAlternates,
  getContentEntry,
  getContentHref,
  getIndexableContentLocales,
  getContentTranslation,
  isContentTranslationIndexable,
  resolveContentSource,
  type ContentEntry,
  type ContentRelation,
  type ContentSectionBlock,
} from "@/app/content-registry";
import {
  copy as mapCopy,
  getMapBySlug,
  getMapDescription,
  getMapName,
  getMapTypeDescription,
  getMapTypeItemCount,
  getMapTypeLabel,
  getPoiText,
  getPublishedMapType,
  getPublishedPoi,
  localePath,
} from "@/app/map-seo";
import {
  breadcrumbAriaLabel,
  getSectionHref,
  resolveContentLocale,
  siteLocaleConfig,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import {
  buildContentSeoTitle,
  buildSeoDescription,
} from "@/app/seo-metadata";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";
import { getToolBySlug, getToolHref } from "@/app/tool-registry";
import {
  ProvenancePanel,
  type ProvenanceStatus,
} from "@/app/_components/trust/ProvenancePanel";
import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";
import { LocalizationStatusNotice } from "@/app/_components/localization/LocalizationStatusNotice";

import styles from "./ContentDetail.module.css";
import { ClassDifficultyFacts } from "./ClassDifficultyFacts";
import { ContentPrimaryAction } from "./ContentPrimaryAction";
import { ContentFaqList } from "./ContentFaqList";
import { ContentSectionLinks } from "./ContentSectionLinks";
import {
  getItemDatabaseRecord,
  ItemFactsPanel,
} from "./StructuredContentFacts";

type ContentDetailProps = {
  entry: ContentEntry;
  locale: SiteLocale;
};

type ContentTableBlock = {
  caption: string;
  headers: readonly string[];
  rows: readonly {
    header?: string;
    cells: readonly string[];
  }[];
};

type ContentFaqItem = {
  question: string;
  answer: string;
};

type ContentSectionWithSeoBlocks =
  ContentSectionBlock & {
    table?: ContentTableBlock;
    faq?: readonly ContentFaqItem[];
  };

type RelatedCard = {
  key: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

function localizedPropertyValue(value: unknown, locale: SiteLocale) {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const localized =
    record[locale] ?? record[resolveContentLocale(locale)] ?? record.en;
  return typeof localized === "string" && localized.trim()
    ? localized.trim()
    : null;
}

function explicitPropertyValue(
  entry: ContentEntry,
  locale: SiteLocale,
  keys: readonly string[],
) {
  const properties = entry.properties;
  if (!properties) return null;
  for (const key of keys) {
    const value = localizedPropertyValue(properties[key], locale);
    if (value) return value;
  }
  return null;
}

function provenanceStatus(entry: ContentEntry): ProvenanceStatus {
  if (entry.publication.status === "draft") return "draft";
  if (entry.publication.status === "review") return "review";
  if (entry.publication.sourceReview === "verified") return "published-verified";
  if (entry.publication.sourceReview === "first-party") return "published-first-party";
  return "published-unverified";
}

function reportServiceForEntry(entry: ContentEntry) {
  const value = entry.properties?.reportService;
  return value === "global" || value === "kr-tw-live" || value === "other"
    ? value
    : "unknown";
}

function resolveRelatedCard(
  relation: ContentRelation,
  locale: SiteLocale,
): RelatedCard | null {
  if (relation.kind === "content") {
    const entry = getContentEntry(relation.section, relation.slug);
    if (!entry) return null;
    const { content } = getContentTranslation(entry, locale);
    return {
      key: `content:${entry.section}:${entry.slug}`,
      eyebrow: content.eyebrow,
      title: content.title,
      description: content.description,
      href: getContentHref(locale, entry),
    };
  }

  if (relation.kind === "tool") {
    const tool = getToolBySlug(relation.toolSlug);
    if (!tool) return null;
    const href = getToolHref(locale, tool);
    if (!href) return null;
    const content = tool.copy[locale];
    return {
      key: `tool:${tool.slug}`,
      eyebrow: content.eyebrow,
      title: content.name,
      description: content.description,
      href,
    };
  }

  const map = getMapBySlug(relation.mapSlug);
  if (!map) return null;
  const mapName = getMapName(map, locale);

  if (relation.kind === "map") {
    return {
      key: `map:${map.slug}`,
      eyebrow: mapCopy[locale].mapLibrary,
      title: mapName,
      description: getMapDescription(map, locale),
      href: localePath(locale, `/tools/map/${map.slug}/`),
    };
  }

  if (relation.kind === "type") {
    const type = getPublishedMapType(map.slug, relation.typeSlug);
    if (!type || !type.indexable) return null;
    const count = getMapTypeItemCount(map, type);
    const typeLabel = getMapTypeLabel(type.slug, locale);
    return {
      key: `type:${map.slug}:${type.slug}`,
      eyebrow: mapCopy[locale].mapLibrary,
      title: `${mapName} · ${typeLabel}`,
      description: getMapTypeDescription(map, locale, type.slug, count),
      href: localePath(locale, `/tools/map/${map.slug}/type/${type.slug}/`),
    };
  }

  const publishedPoi = getPublishedPoi(map.slug, relation.poiSlug);
  if (!publishedPoi) return null;
  const content = getPoiText(publishedPoi.poi, locale);
  return {
    key: `poi:${map.slug}:${publishedPoi.poi.id}`,
    eyebrow: mapCopy[locale].worldBosses,
    title: content.name,
    description: content.description,
    href: localePath(locale, `/tools/map/${map.slug}/poi/${publishedPoi.poi.slug}/`),
  };
}

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function formatDate(locale: SiteLocale, value: string) {
  return new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function absoluteImageUrl(src: string, origin: string | null) {
  return src.startsWith("https://") ? src : absoluteSiteUrl(src, origin);
}

function visibleFaqItems(section: ContentSectionWithSeoBlocks) {
  return (section.faq ?? [])
    .map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

const sourceUiCopy = {
  "zh-hant": {
    official: "官方一手來源",
    platform: "官方平台頁面",
    "third-party": "第三方第一方來源",
    sourcePublished: "來源發布",
    verified: "本站核對",
    imageCredit: "圖片來源",
    rights: {
      "linked-official-media": "外連官方素材，版權屬原權利人；不代表授予再利用權。",
      "linked-third-party-media": "外連第三方第一方素材，版權屬原權利人；不代表安全認證或再利用授權。",
      original: "AION2 KINA 原創素材。",
    },
  },
  en: {
    official: "Official primary source",
    platform: "Official platform page",
    "third-party": "Third-party first-party source",
    sourcePublished: "Source published",
    verified: "KINA verified",
    imageCredit: "Image source",
    rights: {
      "linked-official-media": "Linked official media; copyright remains with its owner and no reuse license is implied.",
      "linked-third-party-media": "Linked third-party first-party media; no safety certification or reuse license is implied.",
      original: "Original AION2 KINA media.",
    },
  },
  ko: {
    official: "공식 1차 출처",
    platform: "공식 플랫폼 페이지",
    "third-party": "서드파티 1차 출처",
    sourcePublished: "출처 게시",
    verified: "KINA 확인",
    imageCredit: "이미지 출처",
    rights: {
      "linked-official-media": "공식 출처 연결 이미지이며 저작권은 원 권리자에게 있고 재사용 허가를 뜻하지 않습니다.",
      "linked-third-party-media": "제3자 1차 출처 연결 이미지이며 안전 인증이나 재사용 허가를 뜻하지 않습니다.",
      original: "AION2 KINA 자체 제작 이미지입니다.",
    },
  },
} as const;

const sourceUiCopyClean = {
  "zh-hans": {
    official: "官方第一手来源",
    platform: "官方平台页面",
    "third-party": "第三方第一手来源",
    sourcePublished: "来源发布",
    verified: "本站核实",
    imageCredit: "图片来源",
    rights: {
      "linked-official-media": "链接至官方素材；版权归原权利人所有，本页不主张再利用授权。",
      "linked-third-party-media": "链接至第三方第一手素材；不代表安全认证或再利用授权。",
      original: "AION2 KINA 原创素材。",
    },
  },
  "zh-hant": {
    official: "官方第一手來源",
    platform: "官方平台頁面",
    "third-party": "第三方第一手來源",
    sourcePublished: "來源發布",
    verified: "本站核對",
    imageCredit: "圖片來源",
    rights: {
      "linked-official-media": "連結至官方素材；版權屬原權利人，本頁不主張再利用授權。",
      "linked-third-party-media": "連結至第三方第一手素材；不代表安全認證或再利用授權。",
      original: "AION2 KINA 原創素材。",
    },
  },
  en: sourceUiCopy.en,
  fr: {
    official: "Source officielle de première main",
    platform: "Page officielle de la plateforme",
    "third-party": "Source tierce de première main",
    sourcePublished: "Publication de la source",
    verified: "Vérifié par KINA",
    imageCredit: "Source de l’image",
    rights: {
      "linked-official-media": "Média lié à la source officielle ; les droits appartiennent à leur titulaire et aucun droit de réutilisation n’est revendiqué.",
      "linked-third-party-media": "Média lié à une source tierce de première main ; ce lien ne constitue ni une certification de sécurité ni une autorisation de réutilisation.",
      original: "Média original créé par AION2 KINA.",
    },
  },
  de: {
    official: "Offizielle Primärquelle",
    platform: "Offizielle Plattformseite",
    "third-party": "Primärquelle eines Drittanbieters",
    sourcePublished: "Von der Quelle veröffentlicht",
    verified: "Von KINA geprüft",
    imageCredit: "Bildquelle",
    rights: {
      "linked-official-media": "Mit der offiziellen Quelle verknüpftes Medium; die Rechte verbleiben beim Rechteinhaber und es wird keine Wiederverwendungslizenz beansprucht.",
      "linked-third-party-media": "Mit einer Primärquelle eines Drittanbieters verknüpftes Medium; dies ist weder eine Sicherheitszertifizierung noch eine Wiederverwendungslizenz.",
      original: "Originalmedium von AION2 KINA.",
    },
  },
  es: {
    official: "Fuente oficial primaria",
    platform: "Página oficial de la plataforma",
    "third-party": "Fuente primaria de terceros",
    sourcePublished: "Publicado por la fuente",
    verified: "Verificado por KINA",
    imageCredit: "Fuente de la imagen",
    rights: {
      "linked-official-media": "Contenido enlazado desde la fuente oficial; los derechos pertenecen a su titular y esta página no reclama permiso de reutilización.",
      "linked-third-party-media": "Contenido enlazado desde una fuente primaria de terceros; no constituye una certificación de seguridad ni un permiso de reutilización.",
      original: "Contenido original creado por AION2 KINA.",
    },
  },
  ja: {
    official: "公式一次情報",
    platform: "公式プラットフォームページ",
    "third-party": "第三者の一次情報",
    sourcePublished: "情報源の公開日",
    verified: "KINA確認日",
    imageCredit: "画像出典",
    rights: {
      "linked-official-media": "公式の配布元へリンクしている素材です。権利は各権利者に帰属し、再利用の許諾を示すものではありません。",
      "linked-third-party-media": "第三者の一次情報へリンクしている素材です。安全性の認証や再利用の許諾を示すものではありません。",
      original: "AION2 KINAが制作したオリジナル素材です。",
    },
  },
  "pt-br": {
    official: "Fonte oficial primária",
    platform: "Página oficial da plataforma",
    "third-party": "Fonte primária de terceiros",
    sourcePublished: "Publicado na fonte",
    verified: "Verificado pela KINA",
    imageCredit: "Fonte da imagem",
    rights: {
      "linked-official-media": "Mídia vinculada à fonte oficial; os direitos pertencem ao titular e esta página não reivindica licença de reutilização.",
      "linked-third-party-media": "Mídia vinculada a uma fonte primária de terceiros; o vínculo não representa certificação de segurança nem licença de reutilização.",
      original: "Mídia original criada pela AION2 KINA.",
    },
  },
  ru: {
    official: "Официальный первоисточник",
    platform: "Официальная страница платформы",
    "third-party": "Сторонний первоисточник",
    sourcePublished: "Опубликовано источником",
    verified: "Проверено KINA",
    imageCredit: "Источник изображения",
    rights: {
      "linked-official-media": "Материал связан с официальным источником; права принадлежат правообладателю, разрешение на повторное использование не заявляется.",
      "linked-third-party-media": "Материал связан со сторонним первоисточником; ссылка не означает сертификацию безопасности или разрешение на повторное использование.",
      original: "Оригинальный материал AION2 KINA.",
    },
  },
  ko: {
    official: "공식 1차 출처",
    platform: "공식 플랫폼 페이지",
    "third-party": "제3자 1차 출처",
    sourcePublished: "출처 게시",
    verified: "KINA 확인",
    imageCredit: "이미지 출처",
    rights: {
      "linked-official-media": "공식 원본에 연결된 미디어입니다. 저작권은 권리자에게 있으며 재사용 허가를 의미하지 않습니다.",
      "linked-third-party-media": "제3자 원본에 연결된 미디어입니다. 안전 인증이나 재사용 허가를 의미하지 않습니다.",
      original: "AION2 KINA 제작 미디어입니다.",
    },
  },
} as const;

const articleMetaCopy = {
  "zh-hans": {
    author: "作者",
    readingTime: "阅读时间",
  },
  "zh-hant": {
    author: "作者",
    readingTime: "閱讀時間",
  },
  en: {
    author: "Author",
    readingTime: "Reading time",
  },
  fr: {
    author: "Auteur",
    readingTime: "Temps de lecture",
  },
  de: {
    author: "Autor",
    readingTime: "Lesezeit",
  },
  es: {
    author: "Autor",
    readingTime: "Tiempo de lectura",
  },
  ja: {
    author: "著者",
    readingTime: "読了時間",
  },
  "pt-br": {
    author: "Autor",
    readingTime: "Tempo de leitura",
  },
  ru: {
    author: "Автор",
    readingTime: "Время чтения",
  },
  ko: {
    author: "작성",
    readingTime: "읽는 시간",
  },
} as const;

export function buildContentMetadata(
  entry: ContentEntry,
  locale: SiteLocale,
): Metadata {
  const translation = getContentTranslation(entry, locale);
  const { content, contentLocale } = translation;
  const isIndexableTranslation = isContentTranslationIndexable(entry, locale);
  const canonicalLocale = isIndexableTranslation
    ? locale
    : resolveContentLocale(locale);
  const canonical = getContentHref(canonicalLocale, entry);
  const authorHref = getPfgAuthorHref(locale);
  const socialImage = entry.heroImage?.src ?? "/aion2-dual.webp";
  const socialImageWidth = entry.heroImage?.width ?? 1920;
  const socialImageHeight = entry.heroImage?.height ?? 1080;
  const heroCopy =
    entry.heroImage?.translations[locale] ??
    entry.heroImage?.translations[contentLocale];
  const socialImageAlt = heroCopy?.alt ?? content.title;
  const title = buildContentSeoTitle(entry.section, entry.slug, locale, content.title);
  const description = buildSeoDescription(
    content.description,
    locale,
    `content:${entry.section}/${entry.slug}`,
  );

  return {
    title,
    description,
    keywords: content.keywords ? [...content.keywords] : undefined,
    authors: [{ name: PFG_AUTHOR_NAME, url: authorHref }],
    creator: PFG_AUTHOR_NAME,
    publisher: "AION2 KINA",
    robots: { index: isIndexableTranslation, follow: true },
    alternates: {
      canonical,
      languages: getContentAlternates(entry),
    },
    openGraph: {
      type: "article",
      siteName: "AION2 KINA",
      title: content.title,
      description,
      url: canonical,
      locale: siteLocaleConfig[locale].openGraphLocale,
      alternateLocale: getIndexableContentLocales(entry)
        .filter((candidate) => candidate !== contentLocale)
        .map((candidate) => siteLocaleConfig[candidate].openGraphLocale),
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt,
      authors: [authorHref],
      section: siteShellCopy[locale].navigation[entry.section],
      images: [{
        url: socialImage,
        width: socialImageWidth,
        height: socialImageHeight,
        alt: socialImageAlt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export async function ContentDetail({ entry, locale }: ContentDetailProps) {
  const siteOrigin = await getRequestSiteOrigin();
  const translation = getContentTranslation(entry, locale);
  const { content, contentLocale } = translation;
  const sections = content.sections as readonly ContentSectionWithSeoBlocks[];
  const faqItems = sections.flatMap(visibleFaqItems);
  const homeHref = getSectionHref(locale, "home");
  const hubHref = getSectionHref(locale, entry.section);
  const isIndexableTranslation = isContentTranslationIndexable(entry, locale);
  const canonicalLocale = isIndexableTranslation
    ? locale
    : resolveContentLocale(locale);
  const canonical = getContentHref(canonicalLocale, entry);
  const canonicalUrl = absoluteSiteUrl(canonical, siteOrigin);
  const webPageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const rootUrl = absoluteSiteUrl("/", siteOrigin);
  const organizationId = `${rootUrl}#organization`;
  const authorHref = getPfgAuthorHref(locale);
  const authorId = getPfgAuthorPersonId(locale, siteOrigin);
  const authorCopy = pfgAuthorCopy[locale];
  const supportedContentLocale = resolveContentLocale(contentLocale);
  const homeUrl = absoluteSiteUrl(homeHref, siteOrigin);
  const hubUrl = absoluteSiteUrl(hubHref, siteOrigin);
  const sectionLabel = siteShellCopy[locale].navigation[entry.section];
  const sources = (entry.sources ?? []).map((source) =>
    resolveContentSource(source, locale),
  );
  const heroImage = entry.heroImage;
  const itemRecord = getItemDatabaseRecord(entry);
  const sourceCopy = sourceUiCopyClean[locale];
  const metaCopy = articleMetaCopy[locale];
  const heroCopy =
    heroImage?.translations[locale] ?? heroImage?.translations[contentLocale];
  const seoDescription = buildSeoDescription(
    content.description,
    locale,
    `content:${entry.section}/${entry.slug}`,
  );
  const serviceScope = explicitPropertyValue(
    entry,
    locale,
    ["serviceScope", "service", "regionScope", "region"],
  );
  const contentVersion = explicitPropertyValue(
    entry,
    locale,
    ["releaseVersion", "version", "snapshotDate"],
  ) ?? itemRecord?.snapshotDate ?? entry.updatedAt;
  const reportService = reportServiceForEntry(entry);
  const related = entry.related
    .map((reference) => resolveRelatedCard(reference, locale))
    .filter((item): item is RelatedCard => Boolean(item));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      buildPfgPersonSchema(locale, siteOrigin),
      {
        "@type": entry.schemaType,
        "@id": `${canonicalUrl}#article`,
        headline: content.title,
        description: seoDescription,
        inLanguage: siteLocaleConfig[contentLocale].code,
        datePublished: entry.publishedAt,
        dateModified: entry.updatedAt,
        version: contentVersion,
        isAccessibleForFree: true,
        articleSection: sectionLabel,
        ...(content.keywords?.length
          ? {
              keywords: content.keywords.join(", "),
              about: content.keywords.slice(0, 3).map((keyword) => ({
                "@type": "Thing",
                name: keyword,
              })),
            }
          : {}),
        author: { "@id": authorId },
        url: canonicalUrl,
        image: heroImage
          ? {
              "@type": "ImageObject",
              url: absoluteImageUrl(heroImage.src, siteOrigin),
              width: heroImage.width,
              height: heroImage.height,
              caption: heroCopy?.caption ?? content.title,
              creditText: heroImage.credit,
            }
          : absoluteSiteUrl("/aion2-dual.webp", siteOrigin),
        publisher: {
          "@type": "Organization",
          "@id": organizationId,
          name: "AION2 KINA",
          url: rootUrl,
        },
        mainEntityOfPage: { "@id": webPageId },
        ...(itemRecord
          ? {
              mainEntity: {
                "@type": "Thing",
                "@id": `${canonicalUrl}#item`,
                identifier: itemRecord.id,
                name: itemRecord.names[supportedContentLocale],
                description: content.description,
                image: itemRecord.icon,
                sameAs: itemRecord.officialUrls[supportedContentLocale],
              },
            }
          : {}),
        ...(sources.length ? { citation: sources.map((source) => source.url) } : {}),
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: canonicalUrl,
        name: content.title,
        description: seoDescription,
        inLanguage: siteLocaleConfig[contentLocale].code,
        datePublished: entry.publishedAt,
        dateModified: entry.updatedAt,
        ...(content.keywords?.length
          ? { keywords: content.keywords.join(", ") }
          : {}),
        author: { "@id": authorId },
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `${hubUrl}#collection`,
          url: hubUrl,
          name: sectionLabel,
        },
        breadcrumb: { "@id": breadcrumbId },
        primaryImageOfPage: heroImage
          ? {
              "@type": "ImageObject",
              url: absoluteImageUrl(heroImage.src, siteOrigin),
              width: heroImage.width,
              height: heroImage.height,
              caption: heroCopy?.caption ?? content.title,
              creditText: heroImage.credit,
            }
          : {
              "@type": "ImageObject",
              url: absoluteSiteUrl("/aion2-dual.webp", siteOrigin),
            },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AION2 KINA", item: homeUrl },
          { "@type": "ListItem", position: 2, name: sectionLabel, item: hubUrl },
          { "@type": "ListItem", position: 3, name: content.title, item: canonicalUrl },
        ],
      },
      ...(faqItems.length
        ? [{
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            url: canonicalUrl,
            inLanguage: siteLocaleConfig[contentLocale].code,
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }]
        : []),
    ],
  };

  return (
    <main className={styles.page} id="main-content">
      <article>
        <header className={styles.hero}>
          <div className={`shell ${styles.shell}`}>
            <nav className={styles.breadcrumbs} aria-label={breadcrumbAriaLabel[locale]}>
              <ol>
                <li><a href={homeHref}>AION2 KINA</a></li>
                <li aria-hidden="true">/</li>
                <li><a href={hubHref}>{sectionLabel}</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{content.title}</li>
              </ol>
            </nav>

            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className={styles.intro}>{content.intro}</p>

            <dl className={styles.meta}>
              <div>
                <dt>{content.publishedLabel}</dt>
                <dd><time dateTime={entry.publishedAt}>{formatDate(locale, entry.publishedAt)}</time></dd>
              </div>
              <div>
                <dt>{content.updatedLabel}</dt>
                <dd><time dateTime={entry.updatedAt}>{formatDate(locale, entry.updatedAt)}</time></dd>
              </div>
              <div className={styles.authorMeta}>
                <dt>{metaCopy.author}</dt>
                <dd>
                  <div className={styles.authorLink}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={authorCopy.avatarAlt}
                      decoding="async"
                      height={PFG_AUTHOR_AVATAR.height}
                      src={PFG_AUTHOR_AVATAR.src}
                      width={PFG_AUTHOR_AVATAR.width}
                    />
                    <span>
                      <strong>{PFG_AUTHOR_NAME}</strong>
                      <small>{authorCopy.jobTitle}</small>
                    </span>
                  </div>
                </dd>
              </div>
              <div>
                <dt>{metaCopy.readingTime}</dt>
                <dd>{content.readingTime}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className={`shell ${styles.shell} ${styles.layout}`}>
          <aside className={styles.sidebar}>
            <a className={styles.backLink} href={hubHref}>
              <span aria-hidden="true">←</span> {content.backLabel}
            </a>
            <nav className={styles.contents} aria-labelledby="content-toc-title">
              <p id="content-toc-title">{content.contentsLabel}</p>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className={styles.body}>
            {!isIndexableTranslation ? (
              <LocalizationStatusNotice locale={locale} />
            ) : null}

            {entry.primaryAction ? (
              <ContentPrimaryAction
                action={entry.primaryAction}
                locale={locale}
                section={entry.section}
                service={reportService}
                slug={entry.slug}
              />
            ) : null}

            {heroImage && !itemRecord ? (
              <figure className={styles.heroFigure}>
                {/* Linked source media stays on the credited origin instead of being copied or proxied. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={heroCopy?.alt ?? content.title}
                  fetchPriority="high"
                  height={heroImage.height}
                  referrerPolicy="no-referrer"
                  src={heroImage.src}
                  width={heroImage.width}
                />
                <figcaption>
                  <span>{heroCopy?.caption ?? content.title}</span>
                  <AnalyticsLink
                    eventName="content_source_click"
                    href={heroImage.sourceUrl}
                    payload={{
                      locale,
                      link_location: "hero_credit",
                      service: reportService,
                      source_host: new URL(heroImage.sourceUrl).hostname,
                      source_kind:
                        heroImage.rights === "linked-official-media"
                          ? "official"
                          : heroImage.rights === "linked-third-party-media"
                            ? "third-party"
                            : "first-party",
                      surface: "content-detail",
                      target_key: `${entry.section}/${entry.slug}`,
                      target_kind: "content",
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {sourceCopy.imageCredit}: {heroImage.credit}
                    <span aria-hidden="true"> ↗</span>
                  </AnalyticsLink>
                  <small>{sourceCopy.rights[heroImage.rights]}</small>
                </figcaption>
              </figure>
            ) : null}

            <ClassDifficultyFacts entry={entry} locale={locale} />
            {itemRecord ? <ItemFactsPanel item={itemRecord} locale={locale} /> : null}

            {sections.map((section, index) => {
              const sectionFaq = visibleFaqItems(section);
              return (
              <section className={styles.section} id={section.id} key={section.id}>
                <div className={styles.sectionHeading}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.title}</h2>
                </div>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.table ? (
                  <div
                    aria-label={section.table.caption}
                    className={styles.tableScroll}
                    role="region"
                    tabIndex={0}
                  >
                    <table className={styles.dataTable}>
                      <caption>{section.table.caption}</caption>
                      <thead>
                        <tr>
                          {section.table.headers.map((header, headerIndex) => (
                            <th key={`${header}-${headerIndex}`} scope="col">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={`${row.header ?? "row"}-${rowIndex}`}>
                            {row.header !== undefined ? (
                              <th scope="row">{row.header}</th>
                            ) : null}
                            {row.cells.map((cell, cellIndex) => (
                              <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {section.bullets ? (
                  <ul className={styles.bullets}>
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
                {section.steps ? (
                  <ol className={styles.steps}>
                    {section.steps.map((step, stepIndex) => (
                      <li key={step.title}>
                        <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                        <div><h3>{step.title}</h3><p>{step.description}</p></div>
                      </li>
                    ))}
                  </ol>
                ) : null}
                {section.links ? (
                  <ContentSectionLinks
                    links={section.links}
                    locale={locale}
                    section={entry.section}
                    service={reportService}
                    slug={entry.slug}
                  />
                ) : null}
                {sectionFaq.length ? (
                  <ContentFaqList
                    items={sectionFaq}
                    locale={locale}
                    section={entry.section}
                    service={reportService}
                    slug={entry.slug}
                  />
                ) : null}
              </section>
              );
            })}

            <div className={styles.provenance}>
              <ProvenancePanel
                locale={locale}
                note={content.sourceNote}
                reportService={reportService}
                service={serviceScope}
                sources={sources.map((source) => ({
                  kind: source.kind,
                  label: source.label,
                  publishedAt: source.publishedAt,
                  publisher: source.publisher,
                  retrievedAt: source.retrievedAt,
                  url: source.url,
                  verifiedAt: source.verifiedAt,
                }))}
                status={provenanceStatus(entry)}
                targetKey={`${entry.section}/${entry.slug}`}
                targetKind="content"
                targetLabel={content.title}
                version={contentVersion}
              />
            </div>

            {related.length ? (
              <section className={styles.related} aria-labelledby="related-content-title">
                <p className={styles.relatedLabel} id="related-content-title">{content.relatedLabel}</p>
                <div>
                  {related.map((relatedEntry) => {
                    return (
                      <a href={relatedEntry.href} key={relatedEntry.key}>
                        <span>{relatedEntry.eyebrow}</span>
                        <h2>{relatedEntry.title}</h2>
                        <p>{relatedEntry.description}</p>
                        <b aria-hidden="true">→</b>
                      </a>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </article>
      <script
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        type="application/ld+json"
      />
    </main>
  );
}

export default ContentDetail;
