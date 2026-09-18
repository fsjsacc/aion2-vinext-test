import {
  localizedHref,
  resolveContentLocale,
  siteLocaleConfig,
  siteLocales,
  type ContentLocale,
  type SiteLocale,
} from "./site-config";
import {
  assertContentRegistryValid,
  isPublishedIndexableContent,
} from "./content-publication.mjs";
import rawMapSeoData from "./map-seo-data.json";
import {
  isMapPublicationIndexable,
  mapSeoPublication,
} from "./map-seo-publication";
import { mapAssetUrl } from "./map-seo";
import { getLiveTools } from "./tool-registry";
import { keywordContentEntries } from "./keyword-content";
import { p1KeywordContentEntries } from "./p1-keyword-content";
import { p1ReferenceContentEntries } from "./p1-reference-content";
import { p1SystemsContentEntries } from "./p1-systems-content";
import { baseClassRosterContentEntries } from "./base-class-roster-content";
import { classGuideContentEntries } from "./class-guide-content";
import { itemDatabaseContentEntries } from "./item-database-content";
import { legacyCuratedContentEntries } from "./legacy-curated-content";
import { verifiedKeywordExpansionContentEntries } from "./verified-keyword-expansion-content";
import { recentOfficialNewsContentEntries } from "./recent-official-news-content";
import {
  dailyNewsContentEntries,
  dailyNewsGeneratedEditorialEntries,
} from "./daily-news-content";
import {
  trendingAugust08ContentEntries,
  trendingAugust08GeneratedEditorialEntries,
} from "./trending-august-08-content";
import {
  trendingAugust11ContentEntries,
  trendingAugust11GeneratedEditorialEntries,
} from "./trending-august-11-content";
import {
  trendingAugust12ContentEntries,
  trendingAugust12GeneratedEditorialEntries,
} from "./trending-august-12-content";
import {
  trendingAugust13ContentEntries,
  trendingAugust13GeneratedEditorialEntries,
} from "./trending-august-13-content";
import {
  trendingAugust14ContentEntries,
  trendingAugust14GeneratedEditorialEntries,
} from "./trending-august-14-content";
import {
  trendingAugust15ContentEntries,
  trendingAugust15GeneratedEditorialEntries,
} from "./trending-august-15-content";
import {
  trendingAugust17ContentEntries,
  trendingAugust17GeneratedEditorialEntries,
} from "./trending-august-17-content";
import {
  trendingAugust18ContentEntries,
  trendingAugust18GeneratedEditorialEntries,
} from "./trending-august-18-content";
import {
  trendingAugust19ContentEntries,
  trendingAugust19GeneratedEditorialEntries,
} from "./trending-august-19-content";
import {
  trendingAugust20ContentEntries,
  trendingAugust20GeneratedEditorialEntries,
} from "./trending-august-20-content";
import {
  trendingAugust21ContentEntries,
  trendingAugust21GeneratedEditorialEntries,
} from "./trending-august-21-content";
import {
  trendingAugust22ContentEntries,
  trendingAugust22GeneratedEditorialEntries,
} from "./trending-august-22-content";
import {
  trendingAugust24ContentEntries,
  trendingAugust24GeneratedEditorialEntries,
} from "./trending-august-24-content";
import {
  trendingAugust25ContentEntries,
  trendingAugust25GeneratedEditorialEntries,
} from "./trending-august-25-content";
import {
  trendingAugust26ContentEntries,
  trendingAugust26GeneratedEditorialEntries,
} from "./trending-august-26-content";
import {
  trendingAugust27ContentEntries,
  trendingAugust27GeneratedEditorialEntries,
} from "./trending-august-27-content";
import {
  trendingAugust28ContentEntries,
  trendingAugust28GeneratedEditorialEntries,
} from "./trending-august-28-content";
import {
  trendingAugust29ContentEntries,
  trendingAugust29GeneratedEditorialEntries,
} from "./trending-august-29-content";
import {
  trendingAugust30ContentEntries,
  trendingAugust30GeneratedEditorialEntries,
} from "./trending-august-30-content";
import {
  trendingAugust31ContentEntries,
  trendingAugust31GeneratedEditorialEntries,
} from "./trending-august-31-content";
import {
  trendingSeptember1ContentEntries,
  trendingSeptember1GeneratedEditorialEntries,
} from "./trending-september-1-content";
import {
  trendingSeptember2ContentEntries,
  trendingSeptember2GeneratedEditorialEntries,
} from "./trending-september-2-content";
import {
  trendingSeptember3ContentEntries,
  trendingSeptember3GeneratedEditorialEntries,
} from "./trending-september-3-content";
import {
  trendingSeptember4ContentEntries,
  trendingSeptember4GeneratedEditorialEntries,
} from "./trending-september-4-content";
import {
  trendingSeptember5ContentEntries,
  trendingSeptember5GeneratedEditorialEntries,
} from "./trending-september-5-content";
import {
  trendingSeptember7ContentEntries,
  trendingSeptember7GeneratedEditorialEntries,
} from "./trending-september-7-content";
import {
  trendingSeptember8ContentEntries,
  trendingSeptember8GeneratedEditorialEntries,
} from "./trending-september-8-content";
import {
  trendingSeptember9ContentEntries,
  trendingSeptember9GeneratedEditorialEntries,
} from "./trending-september-9-content";
import {
  trendingSeptember10ContentEntries,
  trendingSeptember10GeneratedEditorialEntries,
} from "./trending-september-10-content";
import {
  trendingSeptember11ContentEntries,
  trendingSeptember11GeneratedEditorialEntries,
} from "./trending-september-11-content";
import {
  trendingSeptember12ContentEntries,
  trendingSeptember12GeneratedEditorialEntries,
} from "./trending-september-12-content";
import {
  trendingSeptember14ContentEntries,
  trendingSeptember14GeneratedEditorialEntries,
} from "./trending-september-14-content";
import {
  trendingSeptember15ContentEntries,
  trendingSeptember15GeneratedEditorialEntries,
} from "./trending-september-15-content";
import {
  trendingSeptember16ContentEntries,
  trendingSeptember16GeneratedEditorialEntries,
} from "./trending-september-16-content";
import { maddenCrossGameCoinsContentEntries, maddenCrossGameCoinsGeneratedEditorialEntries } from "./madden-cross-game-coins-content";
import { fc27CrossGameCoinsContentEntries, fc27CrossGameCoinsGeneratedEditorialEntries } from "./fc27-cross-game-coins-content";
import { foundersPackContentEntries } from "./founders-pack-content";
import { globalLaunchSeoContentEntries } from "./global-launch-seo-content";
import { trendingIntentContentEntries } from "./trending-intent-content";
import { applyGuideDepthEnhancement } from "./guide-depth-content";
import {
  getContentCanonicalSuffix,
  hasCleanContentCanonicalRoute,
} from "./content-routes";
import { PFG_AUTHOR_NAME } from "./author-profile";
import editorialContentLocalesJson from "./editorial-content-locales.generated.json";
import {
  editorialDraftLocales,
  editorialTranslationNotes,
  type EditorialDraftLocale,
} from "./editorial-localization";

export const contentSections = ["guides", "classes", "news", "database"] as const;

export type ContentSection = (typeof contentSections)[number];
export type ContentSchemaType = "Article" | "NewsArticle" | "TechArticle";
export type ContentPublicationStatus = "draft" | "review" | "published";
export type ContentLocaleReviewStatus = "pending" | "review" | "approved";
export type ContentSourceReviewStatus = "unverified" | "first-party" | "verified";

export type ContentPublication = {
  status: ContentPublicationStatus;
  indexable: boolean;
  localeReview: Record<ContentLocale, ContentLocaleReviewStatus> &
    Partial<Record<SiteLocale, ContentLocaleReviewStatus>>;
  sourceReview: ContentSourceReviewStatus;
};

export type ContentRelation =
  | { kind: "content"; section: ContentSection; slug: string }
  | { kind: "map"; mapSlug: string }
  | { kind: "type"; mapSlug: string; typeSlug: string }
  | { kind: "poi"; mapSlug: string; poiSlug: string }
  | { kind: "tool"; toolSlug: string };

export type ContentSourceKind = "official" | "platform" | "third-party";

export type ContentSourceLocalization = {
  label: string;
  url: string;
};

export type ContentSource = {
  id: string;
  kind: ContentSourceKind;
  publisher: string;
  label: string;
  url: string;
  publishedAt?: string;
  retrievedAt: string;
  verifiedAt: string;
  /**
   * Localized editions of the same first-party publication. Keep one source
   * identity while sending readers to the official language that matches the
   * page they are reading.
   */
  localizations?: Partial<Record<SiteLocale, ContentSourceLocalization>>;
};

export type ContentHeroImage = {
  src: string;
  width: number;
  height: number;
  credit: string;
  sourceUrl: string;
  rights: "linked-official-media" | "linked-third-party-media" | "original";
  presentation?: "cover" | "contain";
  translations: Record<ContentLocale, { alt: string; caption: string }> &
    Partial<Record<SiteLocale, { alt: string; caption: string }>>;
};

export type ContentPrimaryActionFact = {
  label: string;
  value: string;
};

export type LocalizedContentPrimaryAction = {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
  note: string;
  facts: readonly ContentPrimaryActionFact[];
};

/**
 * Source-backed action shown before the article body. The destination stays in
 * the content record so high-intent guides and announcements can reuse the
 * presentation without hard-coding routes in the renderer.
 */
export type ContentPrimaryAction = {
  id: string;
  href: string;
  hrefs?: Partial<Record<SiteLocale, string>>;
  sourceId: string;
  translations: Record<ContentLocale, LocalizedContentPrimaryAction> &
    Partial<Record<SiteLocale, LocalizedContentPrimaryAction>>;
};

export type ContentSectionBlock = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  steps?: readonly { title: string; description: string }[];
  links?: readonly {
    id: string;
    href: string;
    label: string;
    description: string;
    mapSlug: string;
    filterSubtype: string;
  }[];
  table?: {
    caption: string;
    headers: readonly string[];
    rows: readonly {
      header?: string;
      cells: readonly string[];
    }[];
  };
  faq?: readonly {
    question: string;
    answer: string;
  }[];
};

export type LocalizedContent = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  byline: string;
  backLabel: string;
  contentsLabel: string;
  publishedLabel: string;
  updatedLabel: string;
  readingTime: string;
  relatedLabel: string;
  sourceNote: string;
  keywords?: readonly string[];
  sections: readonly ContentSectionBlock[];
};

export type ContentEntry = {
  section: ContentSection;
  slug: string;
  schemaType: ContentSchemaType;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  publication: ContentPublication;
  sources?: readonly ContentSource[];
  heroImage?: ContentHeroImage;
  primaryAction?: ContentPrimaryAction;
  /**
   * Structured, source-aware facts used by specialised database and class
   * presentations. The editorial translations remain the readable source of
   * page copy; properties are kept as pure JSON for portability.
   */
  properties?: Readonly<Record<string, unknown>>;
  related: readonly ContentRelation[];
  translations: Record<ContentLocale, LocalizedContent> &
    Partial<Record<SiteLocale, LocalizedContent>>;
};

type GeneratedEditorialLocale = {
  content: LocalizedContent;
  heroImage: ContentHeroImage["translations"][ContentLocale] | null;
  primaryAction: LocalizedContentPrimaryAction | null;
  sourceLabels: Record<string, string>;
};

type GeneratedEditorialPayload = {
  version: number;
  sourceLocale: "en";
  entries: Record<
    string,
    Partial<Record<EditorialDraftLocale, GeneratedEditorialLocale>>
  >;
};

const generatedEditorialEntries: GeneratedEditorialPayload["entries"] = {
  ...(editorialContentLocalesJson as unknown as GeneratedEditorialPayload)
    .entries,
  ...dailyNewsGeneratedEditorialEntries,
  ...trendingAugust08GeneratedEditorialEntries,
  ...trendingAugust11GeneratedEditorialEntries,
  ...trendingAugust12GeneratedEditorialEntries,
  ...trendingAugust13GeneratedEditorialEntries,
  ...trendingAugust14GeneratedEditorialEntries,
  ...trendingAugust15GeneratedEditorialEntries,
  ...trendingAugust17GeneratedEditorialEntries,
  ...trendingAugust18GeneratedEditorialEntries,
  ...trendingAugust19GeneratedEditorialEntries,
  ...trendingAugust20GeneratedEditorialEntries,
  ...trendingAugust21GeneratedEditorialEntries,
  ...trendingAugust22GeneratedEditorialEntries,
  ...trendingAugust24GeneratedEditorialEntries,
  ...trendingAugust25GeneratedEditorialEntries,
  ...trendingAugust26GeneratedEditorialEntries,
  ...trendingAugust27GeneratedEditorialEntries,
  ...trendingAugust28GeneratedEditorialEntries,
  ...trendingAugust29GeneratedEditorialEntries,
  ...trendingAugust30GeneratedEditorialEntries,
  ...trendingAugust31GeneratedEditorialEntries,
  ...trendingSeptember1GeneratedEditorialEntries,
  ...trendingSeptember2GeneratedEditorialEntries,
  ...trendingSeptember3GeneratedEditorialEntries,
  ...trendingSeptember4GeneratedEditorialEntries,
  ...trendingSeptember5GeneratedEditorialEntries,
  ...trendingSeptember7GeneratedEditorialEntries,
  ...trendingSeptember8GeneratedEditorialEntries,
  ...trendingSeptember9GeneratedEditorialEntries,
  ...trendingSeptember10GeneratedEditorialEntries,
  ...trendingSeptember11GeneratedEditorialEntries,
  ...trendingSeptember12GeneratedEditorialEntries,
  ...trendingSeptember14GeneratedEditorialEntries,
  ...trendingSeptember15GeneratedEditorialEntries,
  ...trendingSeptember16GeneratedEditorialEntries,
  ...maddenCrossGameCoinsGeneratedEditorialEntries,
  ...fc27CrossGameCoinsGeneratedEditorialEntries,
};

function withEditorialTranslationNote(
  content: LocalizedContent,
  locale: EditorialDraftLocale,
): LocalizedContent {
  const note = editorialTranslationNotes[locale];
  return {
    ...content,
    byline: PFG_AUTHOR_NAME,
    sourceNote: content.sourceNote.includes(note)
      ? content.sourceNote
      : `${content.sourceNote}\n\n${note}`,
  };
}

function applyGeneratedEditorialLocales(entry: ContentEntry): ContentEntry {
  const identity = `${entry.section}/${entry.slug}`;
  const generated = generatedEditorialEntries[identity];
  if (!generated) {
    throw new Error(`Missing generated editorial locales for ${identity}.`);
  }

  const translations: ContentEntry["translations"] = {
    ...entry.translations,
    "zh-hant": {
      ...entry.translations["zh-hant"],
      byline: PFG_AUTHOR_NAME,
    },
    en: {
      ...entry.translations.en,
      byline: PFG_AUTHOR_NAME,
    },
    ko: {
      ...entry.translations.ko,
      byline: PFG_AUTHOR_NAME,
    },
  };
  const localeReview: ContentEntry["publication"]["localeReview"] = {
    ...entry.publication.localeReview,
  };
  const heroTranslations = entry.heroImage
    ? { ...entry.heroImage.translations }
    : undefined;
  const primaryActionTranslations = entry.primaryAction
    ? { ...entry.primaryAction.translations }
    : undefined;
  const sourceLocalizations = new Map(
    (entry.sources ?? []).map((source) => [
      source.id,
      { ...source.localizations },
    ]),
  );

  for (const locale of editorialDraftLocales) {
    const generatedLocale = generated[locale];
    const curatedTranslation = entry.translations[locale];
    if (!generatedLocale && !curatedTranslation) {
      throw new Error(`Missing ${locale} editorial translation for ${identity}.`);
    }

    translations[locale] = curatedTranslation
      ? {
          ...curatedTranslation,
          byline: PFG_AUTHOR_NAME,
        }
      : withEditorialTranslationNote(generatedLocale!.content, locale);
    localeReview[locale] = "approved";

    if (heroTranslations && generatedLocale?.heroImage) {
      heroTranslations[locale] = {
        ...generatedLocale.heroImage,
        ...entry.heroImage?.translations[locale],
      };
    }
    if (primaryActionTranslations && generatedLocale?.primaryAction) {
      primaryActionTranslations[locale] = {
        ...generatedLocale.primaryAction,
        ...entry.primaryAction?.translations[locale],
      };
    }

    for (const [sourceId, label] of Object.entries(
      generatedLocale?.sourceLabels ?? {},
    )) {
      const source = entry.sources?.find((candidate) => candidate.id === sourceId);
      if (!source) continue;
      const localizations = sourceLocalizations.get(sourceId) ?? {};
      localizations[locale] = source.localizations?.[locale] ?? {
        label,
        url: source.url,
      };
      sourceLocalizations.set(sourceId, localizations);
    }
  }

  return {
    ...entry,
    publication: {
      ...entry.publication,
      localeReview,
    },
    translations,
    ...(entry.heroImage && heroTranslations
      ? {
          heroImage: {
            ...entry.heroImage,
            translations: heroTranslations,
          },
        }
      : {}),
    ...(entry.primaryAction && primaryActionTranslations
      ? {
          primaryAction: {
            ...entry.primaryAction,
            translations: primaryActionTranslations,
          },
        }
      : {}),
    ...(entry.sources
      ? {
          sources: entry.sources.map((source) => ({
            ...source,
            localizations: sourceLocalizations.get(source.id),
          })),
        }
      : {}),
  };
}

const approvedLocaleReview = {
  "zh-hant": "approved",
  en: "approved",
  ko: "approved",
} as const satisfies Record<ContentLocale, ContentLocaleReviewStatus>;

const publishedFirstParty = {
  status: "published",
  indexable: true,
  localeReview: approvedLocaleReview,
  sourceReview: "first-party",
} as const satisfies ContentPublication;

const publishedVerifiedSource = {
  status: "published",
  indexable: true,
  localeReview: approvedLocaleReview,
  sourceReview: "verified",
} as const satisfies ContentPublication;

const baseContentRegistry = [
  {
    section: "guides",
    slug: "interactive-map-quickstart",
    schemaType: "Article",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-15",
    readingMinutes: 5,
    publication: publishedFirstParty,
    heroImage: {
      src: mapAssetUrl("/map-assets/maps/tiles/verteron/0/0/0.webp"),
      width: 512,
      height: 512,
      credit: "AION2 KINA map data",
      sourceUrl: "https://aion2kina.com/en/tools/map/verteron/",
      rights: "original",
      presentation: "contain",
      translations: {
        "zh-hant": {
          alt: "AION2 Verteron 互動地圖靜態預覽",
          caption: "Verteron 靜態地圖預覽，用於說明互動地圖的搜尋、篩選與路線規劃流程。",
        },
        en: {
          alt: "Static preview of the AION2 Verteron interactive map",
          caption: "A static Verteron map preview used to explain the interactive map search, filter, and route-planning workflow.",
        },
        ko: {
          alt: "AION2 베르테론 인터랙티브 지도 정적 미리보기",
          caption: "인터랙티브 지도의 검색, 필터와 경로 계획 흐름을 설명하는 베르테론 정적 지도 미리보기입니다.",
        },
      },
    },
    related: [
      { kind: "content", section: "database", slug: "map-data-methodology" },
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "tool", toolSlug: "map" },
      { kind: "map", mapSlug: "verteron" },
      { kind: "type", mapSlug: "verteron", typeSlug: "world-boss" },
    ],
    translations: {
      "zh-hant": {
        eyebrow: "工具指南",
        title: "互動地圖快速上手：從目標到可執行路線",
        description:
          "用一套可重複的流程搜尋、篩選與核對 AION2 互動地圖上的資料，並了解資料更新時應如何重新確認。",
        intro:
          "地圖最有價值的用法，不是一次打開所有標記，而是先定義你要完成的事情，再逐步縮小畫面。這份指南只說明 AION2 互動地圖工具本身，不把尚未核對的遊戲資訊當成事實。",
        byline: "AION2 KINA 編輯組",
        backLabel: "返回攻略中心",
        contentsLabel: "本頁內容",
        publishedLabel: "發布",
        updatedLabel: "更新",
        readingTime: "約 5 分鐘",
        relatedLabel: "接著閱讀",
        sourceNote: "工具說明 · 以目前公開版 AION2 互動地圖介面為準",
        sections: [
          {
            id: "choose-an-objective",
            title: "先選目標，再選地圖",
            paragraphs: [
              "先用一句話寫下目的，例如「查看某一類標記」或「比較兩個區域」。明確的目的會決定你需要哪張地圖、哪些篩選條件，以及是否真的需要放大到單一點位。",
              "如果你從攻略或資料頁進入地圖，請保留原頁面作為上下文。地圖負責空間關係，攻略與資料頁則負責條件、版本和用途說明。",
            ],
            bullets: [
              "一次只保留與當前目標相關的標記類型。",
              "先看區域分布，再打開單一標記的詳細資料。",
              "切換語言時使用網站語言選單，路由會保留在相同內容位置。",
            ],
          },
          {
            id: "repeatable-workflow",
            title: "四步查圖流程",
            paragraphs: [
              "把每次查圖變成相同流程，能降低在大量標記中迷失的機率，也更容易在資料更新後重新檢查。",
            ],
            steps: [
              { title: "選擇地圖", description: "從地圖目錄進入與目標最相關的區域。" },
              { title: "縮小類型", description: "使用分類或搜尋，只留下當前需要檢查的資料。" },
              { title: "打開標記", description: "查看名稱、分類與目前可用的說明，不從圖示自行推論未知條件。" },
              { title: "回到上下文", description: "需要路線、條件或版本判斷時，回到相關攻略或資料頁交叉確認。" },
            ],
          },
          {
            id: "mobile-use",
            title: "手機上保持畫面乾淨",
            paragraphs: [
              "手機畫面優先保留地圖本身。完成分類或搜尋後，關閉不再使用的面板；查看完標記詳情，再回到地圖繼續移動。避免同時展開多個控制區，會比頻繁縮放更有效。",
              "觸控操作時，先用較大範圍定位，再逐步放大。若兩個標記距離很近，改用分類縮小結果，比反覆點擊重疊區域更穩定。",
            ],
          },
          {
            id: "verify-after-updates",
            title: "資料更新後要重新核對",
            paragraphs: [
              "互動地圖是整理過的參考資料，不代表遊戲中的即時狀態。版本更新、資料來源修正或翻譯調整，都可能改變標記的名稱、分類或說明。",
              "遇到空白欄位或尚未說明的條件時，應把它視為未知，而不是缺省答案。KINA 會優先修正可追溯的資料，也會在內容頁標示更新日期。",
            ],
          },
        ],
      },
      en: {
        eyebrow: "TOOL GUIDE",
        title: "Interactive map quickstart: from objective to usable route",
        description:
          "A repeatable way to search, filter, and verify information on the AION2 interactive map without turning unverified details into facts.",
        intro:
          "The map is most useful when you define a job first and narrow the view second. This guide explains the AION2 interactive map interface only; it does not present unverified game details as established facts.",
        byline: "AION2 KINA Editorial Desk",
        backLabel: "Back to guides",
        contentsLabel: "On this page",
        publishedLabel: "Published",
        updatedLabel: "Updated",
        readingTime: "5 min read",
        relatedLabel: "Continue reading",
        sourceNote: "Tool documentation · based on the current public AION2 interactive map interface",
        sections: [
          {
            id: "choose-an-objective",
            title: "Choose an objective before a map",
            paragraphs: [
              "Write the job in one sentence, such as “inspect one marker category” or “compare two regions.” That objective determines the map, filters, and level of detail you actually need.",
              "If a guide or data entry sent you to the map, keep it as context. The map explains spatial relationships; editorial pages explain conditions, versions, and intended use.",
            ],
            bullets: [
              "Keep only marker categories related to the current objective.",
              "Read the regional pattern before opening an individual marker.",
              "Use the site language control to stay on the equivalent route when switching languages.",
            ],
          },
          {
            id: "repeatable-workflow",
            title: "A four-step map workflow",
            paragraphs: [
              "Using the same sequence each time makes dense maps easier to read and gives you a simple way to recheck information after an update.",
            ],
            steps: [
              { title: "Choose a map", description: "Open the region most relevant to the objective from the map directory." },
              { title: "Narrow the type", description: "Use categories or search so only the information under review remains." },
              { title: "Open a marker", description: "Read the available name, category, and notes without inferring missing conditions from an icon." },
              { title: "Return to context", description: "Cross-check a related guide or data entry when you need route, condition, or version guidance." },
            ],
          },
          {
            id: "mobile-use",
            title: "Keep the mobile view clear",
            paragraphs: [
              "On a phone, preserve space for the map. Close a category or search panel once it has done its job, then dismiss marker details before continuing to pan. One active panel at a time is easier than repeatedly correcting the zoom.",
              "Start with a broad view and zoom in gradually. When markers sit close together, narrowing the category is more reliable than repeatedly tapping the same cluster.",
            ],
          },
          {
            id: "verify-after-updates",
            title: "Recheck information after updates",
            paragraphs: [
              "The interactive map is an organized reference, not a feed of live in-game state. A release, source correction, or translation review may change a marker name, category, or note.",
              "Treat an empty field or undocumented condition as unknown, not as a default answer. KINA prioritizes traceable corrections and exposes update dates on editorial pages.",
            ],
          },
        ],
      },
      ko: {
        eyebrow: "도구 가이드",
        title: "인터랙티브 지도 빠른 시작: 목적에서 실행 가능한 경로까지",
        description:
          "검증되지 않은 내용을 사실로 만들지 않으면서 AION2 인터랙티브 지도를 검색하고 필터링하고 확인하는 반복 가능한 방법입니다.",
        intro:
          "지도는 모든 마커를 한꺼번에 켤 때보다 먼저 할 일을 정하고 화면을 좁힐 때 가장 유용합니다. 이 문서는 AION2 인터랙티브 지도 인터페이스만 설명하며 확인되지 않은 게임 정보를 사실로 제시하지 않습니다.",
        byline: "AION2 KINA 편집팀",
        backLabel: "가이드로 돌아가기",
        contentsLabel: "이 페이지의 내용",
        publishedLabel: "게시",
        updatedLabel: "업데이트",
        readingTime: "약 5분",
        relatedLabel: "이어서 읽기",
        sourceNote: "도구 문서 · 현재 공개 AION2 인터랙티브 지도 인터페이스 기준",
        sections: [
          {
            id: "choose-an-objective",
            title: "지도보다 목적을 먼저 선택하세요",
            paragraphs: [
              "‘한 종류의 마커 확인’ 또는 ‘두 지역 비교’처럼 할 일을 한 문장으로 적어 보세요. 목적이 필요한 지도와 필터, 확대 수준을 결정합니다.",
              "가이드나 데이터 항목에서 지도로 이동했다면 원래 페이지를 문맥으로 남겨 두세요. 지도는 공간 관계를, 편집 페이지는 조건과 버전과 용도를 설명합니다.",
            ],
            bullets: [
              "현재 목적과 관련된 마커 종류만 남깁니다.",
              "개별 마커를 열기 전에 지역 전체 분포를 봅니다.",
              "언어를 바꿀 때 사이트 언어 메뉴를 사용하면 같은 경로가 유지됩니다.",
            ],
          },
          {
            id: "repeatable-workflow",
            title: "네 단계 지도 확인 흐름",
            paragraphs: [
              "매번 같은 순서를 사용하면 마커가 많은 화면도 읽기 쉬워지고 업데이트 뒤에 다시 확인하기도 편합니다.",
            ],
            steps: [
              { title: "지도 선택", description: "지도 목록에서 목적과 가장 가까운 지역을 엽니다." },
              { title: "종류 좁히기", description: "분류나 검색을 사용해 지금 확인할 정보만 남깁니다." },
              { title: "마커 열기", description: "표시된 이름과 분류와 설명을 읽고, 아이콘만으로 누락된 조건을 추측하지 않습니다." },
              { title: "문맥으로 돌아가기", description: "경로, 조건, 버전 판단이 필요하면 관련 가이드나 데이터 항목을 함께 확인합니다." },
            ],
          },
          {
            id: "mobile-use",
            title: "모바일 화면을 단순하게 유지하세요",
            paragraphs: [
              "휴대폰에서는 지도가 보일 공간을 먼저 확보하세요. 분류나 검색을 마치면 패널을 닫고, 마커 정보를 본 뒤에는 상세 패널을 닫고 이동을 계속합니다.",
              "넓은 범위에서 시작해 조금씩 확대하세요. 마커가 가까이 있다면 같은 위치를 반복해서 누르기보다 분류를 줄이는 편이 안정적입니다.",
            ],
          },
          {
            id: "verify-after-updates",
            title: "업데이트 뒤에는 다시 확인하세요",
            paragraphs: [
              "인터랙티브 지도는 정리된 참고 자료이며 게임의 실시간 상태를 보여 주는 피드가 아닙니다. 릴리스, 출처 수정, 번역 검토로 이름이나 분류, 설명이 달라질 수 있습니다.",
              "빈 항목이나 설명되지 않은 조건은 기본값이 아니라 ‘알 수 없음’으로 취급하세요. KINA는 추적 가능한 수정을 우선하며 편집 페이지에 업데이트 날짜를 표시합니다.",
            ],
          },
        ],
      },
    },
  },
  {
    section: "classes",
    slug: "class-planning-framework",
    schemaType: "Article",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-22",
    readingMinutes: 6,
    publication: publishedFirstParty,
    related: [
      { kind: "content", section: "guides", slug: "interactive-map-quickstart" },
      { kind: "content", section: "database", slug: "map-data-methodology" },
      { kind: "content", section: "news", slug: "chapter-1-lands-of-sand-and-snow" },
      { kind: "tool", toolSlug: "map" },
    ],
    translations: {
      "zh-hant": {
        eyebrow: "BUILD 規劃指南",
        title: "先確定玩法目標，再規劃 AION2 職業 Build",
        description: "依內容類型、操作習慣、生存需求、現有裝備與測試目標，建立可比較、可調整的 AION2 職業 Build。",
        intro: "實用的 Build 必須對應具體玩法。先寫清楚目標與限制，再比較技能、裝備和資源選擇，才能知道哪個方案真正適合你。",
        byline: "AION2 KINA 編輯組",
        backLabel: "返回職業中心",
        contentsLabel: "本頁內容",
        publishedLabel: "發布",
        updatedLabel: "更新",
        readingTime: "約 6 分鐘",
        relatedLabel: "接著閱讀",
        sourceNote: "玩家指南 · 用相同條件比較配置，不以單一排行榜代替測試",
        sections: [
          { id: "define-use-case", title: "用一句話定義用途", paragraphs: ["先寫下這套規劃要解決的情境、參與方式與成功標準。如果一句話無法說清楚，配置選擇通常也無法比較。"], bullets: ["內容情境：你實際要處理哪一類玩法。", "限制條件：時間、操作負擔、連線環境與可取得資源。", "成功標準：穩定完成、容錯、速度或團隊貢獻。"] },
          { id: "build-layers", title: "把規劃拆成五層", paragraphs: ["每一層只回答一個問題，避免用單一排行榜取代分析。"], steps: [{ title: "角色目標", description: "這個角色在當前情境要完成什麼。" }, { title: "核心循環", description: "可重複執行、也能在壓力下維持的操作順序。" }, { title: "生存與容錯", description: "失誤時如何恢復，以及哪些限制不可忽略。" }, { title: "資源選擇", description: "把有限資源放在能改變成功率的部分。" }, { title: "驗證紀錄", description: "保留版本、日期、測試情境與結果。" }] },
          { id: "compare-fairly", title: "只比較相同條件的方案", paragraphs: ["不同目的、不同裝備基準或不同操作熟練度的結果不能直接並排。比較兩個方案時，固定測試情境與判斷標準，只改變一個主要變數。", "若資料不完整，記錄未知欄位和假設，不要用精確外觀的數字掩蓋不確定性。"] },
          { id: "revision-loop", title: "讓 Build 可以被修正", paragraphs: ["每次更新先檢查目標是否改變，再檢查核心循環和資源選擇。只有當新資料能改變結論時才修改推薦，並在變更紀錄中說明原因。", "保存適用情境、測試日期、替代方案與仍不確定的項目，改版後即可逐項重測，而不必整套配置從頭開始。"] },
        ],
      },
      en: {
        eyebrow: "BUILD PLANNING GUIDE",
        title: "Set the goal before planning an AION2 class build",
        description: "Plan an AION2 class build around content type, playstyle, survivability, available gear, and clear test goals.",
        intro: "A useful build must fit a specific activity. Define the goal and constraints first, then compare skill, equipment, and resource choices under the same conditions.",
        byline: "AION2 KINA Editorial Desk",
        backLabel: "Back to classes",
        contentsLabel: "On this page",
        publishedLabel: "Published",
        updatedLabel: "Updated",
        readingTime: "6 min read",
        relatedLabel: "Continue reading",
        sourceNote: "Player guide · compare configurations under matching conditions instead of relying on one ranking",
        sections: [
          { id: "define-use-case", title: "Define the use case in one sentence", paragraphs: ["State the situation, participation mode, and success condition this plan should address. If the job cannot be explained in one sentence, the configuration choices are unlikely to be comparable."], bullets: ["Content context: what kind of activity the plan must handle.", "Constraints: time, execution load, connection environment, and available resources.", "Success condition: consistency, recovery, speed, or group contribution."] },
          { id: "build-layers", title: "Separate the plan into five layers", paragraphs: ["Give each layer one question so a single ranking cannot replace the analysis."], steps: [{ title: "Role objective", description: "What this character must accomplish in the chosen context." }, { title: "Core loop", description: "A repeatable sequence that remains usable under pressure." }, { title: "Survival and recovery", description: "How the plan recovers from errors and which limits cannot be ignored." }, { title: "Resource choices", description: "Where limited resources can materially change the success rate." }, { title: "Validation log", description: "Record the version, date, test context, and observed result." }] },
          { id: "compare-fairly", title: "Compare only under matching conditions", paragraphs: ["Results from different goals, equipment baselines, or execution levels should not be placed side by side. Hold the test context and decision rule constant, then change one main variable.", "When evidence is incomplete, record unknown fields and assumptions. Do not hide uncertainty behind numbers that merely look precise."] },
          { id: "revision-loop", title: "Make the build revisable", paragraphs: ["After an update, check whether the objective changed before touching the loop or resource choices. Revise a recommendation only when new evidence changes the conclusion, and record why.", "Keep the activity, test date, alternatives, and uncertain parts with the build so each change can be retested without rebuilding the entire plan."] },
        ],
      },
      ko: {
        eyebrow: "빌드 계획 가이드",
        title: "목표를 먼저 정하고 AION2 직업 빌드를 계획하세요",
        description: "콘텐츠 유형, 플레이 방식, 생존력, 보유 장비와 테스트 목표에 맞춰 AION2 직업 빌드를 계획하세요.",
        intro: "실용적인 빌드는 특정 활동에 맞아야 합니다. 목표와 제한 조건을 먼저 정하고 같은 조건에서 스킬, 장비와 자원 선택을 비교하세요.",
        byline: "AION2 KINA 편집팀",
        backLabel: "직업으로 돌아가기",
        contentsLabel: "이 페이지의 내용",
        publishedLabel: "게시",
        updatedLabel: "업데이트",
        readingTime: "약 6분",
        relatedLabel: "이어서 읽기",
        sourceNote: "플레이어 가이드 · 하나의 순위 대신 같은 조건에서 구성을 비교합니다",
        sections: [
          { id: "define-use-case", title: "용도를 한 문장으로 정의하세요", paragraphs: ["이 계획이 해결할 상황, 참여 방식, 성공 조건을 적습니다. 한 문장으로 설명할 수 없다면 설정 선택도 공정하게 비교하기 어렵습니다."], bullets: ["콘텐츠 문맥: 실제로 처리할 활동의 종류.", "제약: 시간, 조작 부담, 연결 환경, 사용할 수 있는 자원.", "성공 조건: 안정성, 회복, 속도 또는 파티 기여."] },
          { id: "build-layers", title: "계획을 다섯 층으로 나누세요", paragraphs: ["한 개의 순위표가 분석을 대신하지 않도록 각 층에서 하나의 질문만 다룹니다."], steps: [{ title: "역할 목표", description: "선택한 상황에서 캐릭터가 달성해야 하는 일." }, { title: "핵심 흐름", description: "압박 속에서도 반복할 수 있는 조작 순서." }, { title: "생존과 회복", description: "실수에서 회복하는 방법과 무시할 수 없는 한계." }, { title: "자원 선택", description: "제한된 자원이 성공률을 바꿀 수 있는 지점." }, { title: "검증 기록", description: "버전, 날짜, 테스트 문맥, 관찰 결과를 기록합니다." }] },
          { id: "compare-fairly", title: "같은 조건에서만 비교하세요", paragraphs: ["목표, 장비 기준, 조작 숙련도가 다른 결과는 바로 비교할 수 없습니다. 테스트 문맥과 판단 기준을 고정하고 주요 변수 하나만 바꿉니다.", "근거가 불완전하면 알 수 없는 항목과 가정을 기록하세요. 정밀해 보이는 숫자로 불확실성을 감추지 않습니다."] },
          { id: "revision-loop", title: "수정 가능한 빌드를 만드세요", paragraphs: ["업데이트 뒤에는 먼저 목표가 달라졌는지 확인하고 핵심 흐름과 자원 선택을 봅니다. 새 근거가 결론을 바꿀 때만 추천을 수정하고 이유를 기록합니다.", "활동, 테스트 날짜, 대안과 불확실한 항목을 함께 저장하면 전체 계획을 다시 만들지 않고 변경된 부분만 재시험할 수 있습니다."] },
        ],
      },
    },
  },
  {
    section: "news",
    slug: "chapter-1-lands-of-sand-and-snow",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-14",
    readingMinutes: 4,
    publication: publishedVerifiedSource,
    sources: [
      {
        id: "nc-chapter-1",
        kind: "official",
        publisher: "NC Corporation",
        label: "AION 2 Rolls Out 'Chapter 1. Lands of Sand and Snow' Update",
        url: "https://about.ncsoft.com/en/news/article/aion2_update_260706",
        publishedAt: "2026-07-06",
        retrievedAt: "2026-07-14",
        verifiedAt: "2026-07-14",
      },
    ],
    heroImage: {
      src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
      width: 1100,
      height: 605,
      credit: "NC Corporation",
      sourceUrl: "https://about.ncsoft.com/en/news/article/aion2_update_260706",
      rights: "linked-official-media",
      translations: {
        "zh-hant": {
          alt: "AION 2 Chapter 1 官方更新宣傳圖",
          caption: "NC Corporation 官方 Chapter 1 新聞稿圖片；版權屬原權利人。",
        },
        en: {
          alt: "Official AION 2 Chapter 1 update artwork",
          caption: "Image from NC Corporation's official Chapter 1 release; copyright remains with its owner.",
        },
        ko: {
          alt: "AION 2 챕터 1 공식 업데이트 이미지",
          caption: "NC Corporation 챕터 1 공식 보도자료 이미지이며 저작권은 원 권리자에게 있습니다.",
        },
      },
    },
    properties: {
      releaseVersion: "Chapter 1 · source published 2026-07-06",
    },
    related: [
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "content", section: "guides", slug: "interactive-map-quickstart" },
    ],
    translations: {
      "zh-hant": {
        eyebrow: "官方更新摘要",
        title: "Chapter 1 更新加入 Brawler、50 級上限與新區域",
        description: "根據 NC 2026 年 7 月 6 日官方新聞稿，整理 Chapter 1: Lands of Sand and Snow 的職業、成長、區域與副本重點。",
        intro: "以下內容只摘要 NC 官方英文新聞稿中明確列出的資訊。專有名稱保留英文，避免在沒有官方對照時自行創造譯名。",
        byline: "AION2 KINA 新聞編輯組",
        backLabel: "返回新聞中心",
        contentsLabel: "本頁內容",
        publishedLabel: "本站發布",
        updatedLabel: "最後核對",
        readingTime: "約 4 分鐘",
        relatedLabel: "接著閱讀",
        sourceNote: "一手來源 · NC Corporation 官方新聞稿",
        sections: [
          { id: "class-and-progression", title: "新職業與成長上限", paragraphs: ["NC 表示 Chapter 1 加入前線戰鬥職業 Brawler，使用 Gauntlets，以連擊和衝鋒為特色；一般攻擊與主動技能會產生 Rage，達到條件後進入 Rampage 狀態。", "官方同時說明角色等級上限提高到 50，Stigma 技能可強化至 25 級。這些數值屬於 2026 年 7 月 6 日新聞稿描述，後續變更需以更新公告為準。"] },
          { id: "regions-and-dungeons", title: "新區域與副本", paragraphs: ["官方新聞稿列出 Asmodian 的 Morheim 與 Elyos 的 Eltnen 兩個新區域，以及新的 Sealed Dungeons、Strongholds 和 Monoliths。", "新增副本包括 Expedition dungeon Citadel of the Fallen Daeva 與 Transcendence dungeon Abyssal Horn Den。新聞稿稱兩者需要 50 級與最低 3,500 item level，更高難度需要更高 item level。"] },
          { id: "party-sizes", title: "隊伍規模與入場系統", paragraphs: ["NC 表示 Expedition 與 Transcendence dungeon 的隊伍規模擴大為五人，Sanctuary dungeon 擴大為十人；原先需要的入場票移除，獎勵改由 Odyle Energy 取得。", "這是官方新聞稿的更新摘要，不是完整 patch note。實際遊玩前仍應查看遊戲內說明與官方後續公告。"] },
        ],
      },
      en: {
        eyebrow: "OFFICIAL UPDATE BRIEF",
        title: "Chapter 1 adds Brawler, a level 50 cap, and new regions",
        description: "A sourced summary of the class, progression, region, and dungeon changes in NC's July 6, 2026 Chapter 1: Lands of Sand and Snow release.",
        intro: "This brief includes only information explicitly stated in NC's English press release. Names and numerical requirements are kept in the form used by that source.",
        byline: "AION2 KINA News Desk",
        backLabel: "Back to news",
        contentsLabel: "On this page",
        publishedLabel: "KINA published",
        updatedLabel: "Last verified",
        readingTime: "4 min read",
        relatedLabel: "Continue reading",
        sourceNote: "Primary source · official NC Corporation press release",
        sections: [
          { id: "class-and-progression", title: "A new class and higher progression limits", paragraphs: ["NC describes Brawler as a front-line combat class using Gauntlets, with combo-based charges. Basic attacks and active skills generate Rage, and reaching the required gauge triggers Rampage.", "The same release raises the character level cap to 50 and allows Stigma skills to be enhanced to level 25. These values reflect the July 6, 2026 release and should be rechecked against later notices."] },
          { id: "regions-and-dungeons", title: "New regions and dungeons", paragraphs: ["The press release names Morheim for Asmodians and Eltnen for Elyos as new regions, alongside new Sealed Dungeons, Strongholds, and Monoliths.", "It also introduces the Expedition dungeon Citadel of the Fallen Daeva and the Transcendence dungeon Abyssal Horn Den. NC states that both require level 50 and a minimum item level of 3,500, with higher requirements at higher difficulties."] },
          { id: "party-sizes", title: "Party sizes and entry systems", paragraphs: ["NC states that Expedition and Transcendence dungeon parties expand to five players and Sanctuary dungeon parties to ten. Entry tickets for Expedition and Transcendence dungeons were removed, with rewards obtained through Odyle Energy.", "This is a concise reading of the official release, not a complete patch note. Check in-game descriptions and subsequent official notices before acting on time-sensitive requirements."] },
        ],
      },
      ko: {
        eyebrow: "공식 업데이트 요약",
        title: "Chapter 1에 Brawler, 50레벨 상한, 신규 지역이 추가됐습니다",
        description: "NC가 2026년 7월 6일 발표한 Chapter 1: Lands of Sand and Snow의 직업, 성장, 지역, 던전 변경점을 출처와 함께 요약합니다.",
        intro: "아래 내용은 NC 영문 보도자료에 명시된 정보만 요약합니다. 공식 대응 명칭이 확인되지 않은 경우 고유명사는 영문 표기를 유지합니다.",
        byline: "AION2 KINA 뉴스 편집팀",
        backLabel: "뉴스로 돌아가기",
        contentsLabel: "이 페이지의 내용",
        publishedLabel: "KINA 게시",
        updatedLabel: "마지막 확인",
        readingTime: "약 4분",
        relatedLabel: "이어서 읽기",
        sourceNote: "1차 출처 · NC Corporation 공식 보도자료",
        sections: [
          { id: "class-and-progression", title: "신규 직업과 성장 상한", paragraphs: ["NC는 Brawler를 Gauntlets를 사용하는 전방 전투 직업으로 설명하며 연계 돌진이 특징이라고 밝혔습니다. 일반 공격과 액티브 스킬은 Rage를 생성하고 게이지 조건을 충족하면 Rampage 상태가 발동합니다.", "같은 발표에서 캐릭터 레벨 상한은 50, Stigma 스킬 강화 상한은 25로 높아졌습니다. 이 수치는 2026년 7월 6일 발표 기준이며 이후 공지와 다시 비교해야 합니다."] },
          { id: "regions-and-dungeons", title: "신규 지역과 던전", paragraphs: ["보도자료는 Asmodian 지역 Morheim과 Elyos 지역 Eltnen, 그리고 새로운 Sealed Dungeons, Strongholds, Monoliths를 명시합니다.", "Expedition dungeon Citadel of the Fallen Daeva와 Transcendence dungeon Abyssal Horn Den도 추가됐습니다. NC에 따르면 두 던전은 50레벨과 최소 3,500 item level이 필요하며 상위 난이도에는 더 높은 조건이 적용됩니다."] },
          { id: "party-sizes", title: "파티 규모와 입장 시스템", paragraphs: ["NC는 Expedition과 Transcendence dungeon 파티가 5명, Sanctuary dungeon 파티가 10명으로 확대됐다고 밝혔습니다. Expedition과 Transcendence 입장 티켓은 제거되고 보상은 Odyle Energy를 통해 획득합니다.", "이 글은 공식 발표의 핵심 요약이며 전체 patch note가 아닙니다. 시간에 따라 달라질 수 있는 조건은 게임 내 설명과 후속 공식 공지를 확인하세요."] },
        ],
      },
    },
  },
  {
    section: "database",
    slug: "map-data-methodology",
    schemaType: "TechArticle",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-22",
    readingMinutes: 5,
    publication: publishedFirstParty,
    related: [
      { kind: "content", section: "guides", slug: "interactive-map-quickstart" },
      { kind: "tool", toolSlug: "map" },
      { kind: "map", mapSlug: "altgard" },
    ],
    translations: {
      "zh-hant": {
        eyebrow: "資料閱讀指南",
        title: "如何看懂 AION2 物品與互動地圖資料",
        description: "學會判斷資料日期、適用地區、未知欄位、三語名稱與地圖座標，避免把缺少資料誤當成零或不存在。",
        intro: "查詢物品或地圖點位時，先確認更新日期與適用地區，再閱讀名稱、分類、座標和來源。以下四個步驟可幫助你判斷資料是否適合目前的遊戲版本。",
        byline: "AION2 KINA 資料編輯組",
        backLabel: "返回資料庫",
        contentsLabel: "本頁內容",
        publishedLabel: "發布",
        updatedLabel: "更新",
        readingTime: "約 5 分鐘",
        relatedLabel: "接著閱讀",
        sourceNote: "使用指南 · 適用於本站物品資料庫與 AION2 互動地圖",
        sections: [
          { id: "three-layers", title: "先確認日期與適用地區", paragraphs: ["AION2 不同地區與版本可能使用不同名稱、數值或開放順序。資料日期越早，越需要回到目前客戶端再次確認。"], steps: [{ title: "查看更新日期", description: "先確認頁面或資料列最後核對的日期。" }, { title: "確認服務地區", description: "分清全球版、韓國與台港澳服務的差異。" }, { title: "回到遊戲核對", description: "涉及價格、機率、刷新與即時位置時，以目前遊戲畫面為準。" }] },
          { id: "unknown-values", title: "未知不是零，也不是否", paragraphs: ["欄位顯示「官方未提供」代表來源沒有給出答案，不代表數值為 0、功能不可用或物品沒有掉落。", "翻譯名稱尚未確認時，頁面可能保留官方 ID 或另一語言名稱；搜尋時可同時嘗試名稱和 ID。"] },
          { id: "stable-identity", title: "名稱不同時，用 ID 和上下文核對", paragraphs: ["同一物品或點位在不同語言中可能有不同譯名。官方 ID、分類、裝備部位與相鄰地標通常比單一名稱更適合交叉核對。", "切換語言後仍會前往同一筆資料；若名稱不同，請比較 ID、圖示與用途，避免誤認為另一件物品。"] },
          { id: "quality-gates", title: "發現不一致時怎麼做", paragraphs: ["若本站資料與遊戲內畫面不同，請以目前遊戲版本為準，並附上足以核對的資訊回報。"], bullets: ["記下頁面網址、語言與服務地區。", "物品請附官方 ID；地圖點位請附地圖名稱與座標。", "提供遊戲版本、發現日期和不一致的欄位。", "不要在截圖中包含帳號、角色登入或付款資訊。"] },
        ],
      },
      en: {
        eyebrow: "DATA READING GUIDE",
        title: "How to read AION2 item and interactive map data",
        description: "Check data dates, service regions, unknown fields, localized names, and map coordinates without mistaking missing information for zero or unavailable.",
        intro: "When checking an item or map marker, start with its update date and service region, then read the name, category, coordinates, and source. These four steps help you judge whether the record fits your current game version.",
        byline: "AION2 KINA Data Desk",
        backLabel: "Back to database",
        contentsLabel: "On this page",
        publishedLabel: "Published",
        updatedLabel: "Updated",
        readingTime: "5 min read",
        relatedLabel: "Continue reading",
        sourceNote: "Usage guide · applies to the KINA item database and AION2 interactive map",
        sections: [
          { id: "three-layers", title: "Check the date and service region first", paragraphs: ["AION2 regions and versions may use different names, values, or release orders. The older the record, the more important it is to confirm it in the current client."], steps: [{ title: "Read the update date", description: "Check when the page or record was last verified." }, { title: "Confirm the service region", description: "Distinguish Global, Korean, and Taiwan/Hong Kong/Macau service information." }, { title: "Verify in game", description: "For prices, rates, resets, and live positions, use the current game screen as the final check." }] },
          { id: "unknown-values", title: "Unknown does not mean zero or unavailable", paragraphs: ["A field marked “not supplied by the official record” means the source gave no answer. It does not prove a value of zero, an unavailable feature, or no acquisition source.", "If a localized name is unconfirmed, the page may retain an official ID or another-language name. Try both the name and ID when searching."] },
          { id: "stable-identity", title: "Use IDs and context when names differ", paragraphs: ["The same item or marker may have different localized names. Official IDs, categories, equipment slots, and nearby landmarks are often more reliable for cross-checking than one label.", "Language switching keeps you on the same record. If the name changes, compare the ID, icon, and use before treating it as a different item."] },
          { id: "quality-gates", title: "What to do when something differs", paragraphs: ["If KINA and the current game client disagree, follow the game client and send enough context for the record to be checked."], bullets: ["Include the page URL, language, and service region.", "For items, include the official ID; for markers, include the map and coordinates.", "Add the game version, date observed, and field that differs.", "Keep account, login, character, and payment details out of screenshots."] },
        ],
      },
      ko: {
        eyebrow: "데이터 읽기 안내",
        title: "AION2 아이템과 인터랙티브 지도 정보 읽는 법",
        description: "데이터 날짜, 서비스 지역, 알 수 없는 필드, 다국어 이름과 지도 좌표를 확인하고 누락 정보를 0이나 이용 불가로 오해하지 마세요.",
        intro: "아이템이나 지도 포인트를 확인할 때는 업데이트 날짜와 서비스 지역을 먼저 보고 이름, 분류, 좌표와 출처를 읽으세요. 다음 네 단계로 현재 게임 버전에 맞는 정보인지 판단할 수 있습니다.",
        byline: "AION2 KINA 데이터 편집팀",
        backLabel: "데이터베이스로 돌아가기",
        contentsLabel: "이 페이지의 내용",
        publishedLabel: "게시",
        updatedLabel: "업데이트",
        readingTime: "약 5분",
        relatedLabel: "이어서 읽기",
        sourceNote: "이용 안내 · KINA 아이템 데이터베이스와 AION2 인터랙티브 지도에 적용",
        sections: [
          { id: "three-layers", title: "날짜와 서비스 지역부터 확인하세요", paragraphs: ["AION2는 지역과 버전에 따라 이름, 수치, 공개 순서가 다를 수 있습니다. 오래된 정보일수록 현재 클라이언트에서 다시 확인하는 것이 중요합니다."], steps: [{ title: "업데이트 날짜 확인", description: "페이지나 항목을 마지막으로 확인한 날짜를 봅니다." }, { title: "서비스 지역 확인", description: "글로벌, 한국, 대만·홍콩·마카오 서비스 정보를 구분합니다." }, { title: "게임에서 재확인", description: "가격, 확률, 초기화와 실시간 위치는 현재 게임 화면을 최종 기준으로 삼습니다." }] },
          { id: "unknown-values", title: "알 수 없음은 0이나 이용 불가가 아닙니다", paragraphs: ["‘공식 정보 없음’은 출처가 답을 제공하지 않았다는 뜻입니다. 수치가 0이거나 기능을 이용할 수 없거나 획득처가 없다는 증거가 아닙니다.", "번역명이 확인되지 않으면 공식 ID나 다른 언어 이름을 표시할 수 있습니다. 검색할 때 이름과 ID를 함께 사용해 보세요."] },
          { id: "stable-identity", title: "이름이 다르면 ID와 문맥으로 확인하세요", paragraphs: ["같은 아이템이나 포인트도 언어별 이름이 다를 수 있습니다. 공식 ID, 분류, 장비 부위와 주변 지형은 이름 하나보다 교차 확인에 유용합니다.", "언어를 바꿔도 같은 정보로 이동합니다. 이름이 달라지면 다른 아이템으로 판단하기 전에 ID, 아이콘과 용도를 비교하세요."] },
          { id: "quality-gates", title: "정보가 다를 때 확인할 내용", paragraphs: ["KINA 정보와 현재 게임 화면이 다르면 게임 화면을 기준으로 하고 확인에 필요한 내용을 함께 알려 주세요."], bullets: ["페이지 주소, 언어와 서비스 지역을 적습니다.", "아이템은 공식 ID, 지도 포인트는 지도 이름과 좌표를 포함합니다.", "게임 버전, 확인 날짜와 다른 필드를 알려 주세요.", "스크린샷에는 계정, 로그인, 캐릭터와 결제 정보를 포함하지 마세요."] },
        ],
      },
    },
  },
  ...keywordContentEntries.filter(
    (entry) => !(entry.section === "classes" && entry.slug === "brawler"),
  ),
  ...foundersPackContentEntries,
  ...globalLaunchSeoContentEntries,
  ...trendingIntentContentEntries,
  ...p1KeywordContentEntries,
  ...p1SystemsContentEntries,
  ...p1ReferenceContentEntries,
  ...baseClassRosterContentEntries,
  ...classGuideContentEntries,
  ...itemDatabaseContentEntries,
  ...legacyCuratedContentEntries,
  ...verifiedKeywordExpansionContentEntries,
  ...recentOfficialNewsContentEntries,
  ...dailyNewsContentEntries,
  ...trendingAugust08ContentEntries,
  ...trendingAugust11ContentEntries,
  ...trendingAugust12ContentEntries,
  ...trendingAugust13ContentEntries,
  ...trendingAugust14ContentEntries,
  ...trendingAugust15ContentEntries,
  ...trendingAugust17ContentEntries,
  ...trendingAugust18ContentEntries,
  ...trendingAugust19ContentEntries,
  ...trendingAugust20ContentEntries,
  ...trendingAugust21ContentEntries,
  ...trendingAugust22ContentEntries,
  ...trendingAugust24ContentEntries,
  ...trendingAugust25ContentEntries,
  ...trendingAugust26ContentEntries,
  ...trendingAugust27ContentEntries,
  ...trendingAugust28ContentEntries,
  ...trendingAugust29ContentEntries,
  ...trendingAugust30ContentEntries,
  ...trendingAugust31ContentEntries,
  ...trendingSeptember1ContentEntries,
  ...trendingSeptember2ContentEntries,
  ...trendingSeptember3ContentEntries,
  ...trendingSeptember4ContentEntries,
  ...trendingSeptember5ContentEntries,
  ...trendingSeptember7ContentEntries,
  ...trendingSeptember8ContentEntries,
  ...trendingSeptember9ContentEntries,
  ...trendingSeptember10ContentEntries,
  ...trendingSeptember11ContentEntries,
  ...trendingSeptember12ContentEntries,
  ...trendingSeptember14ContentEntries,
  ...trendingSeptember15ContentEntries,
  ...trendingSeptember16ContentEntries,
  ...maddenCrossGameCoinsContentEntries,
  ...fc27CrossGameCoinsContentEntries,
] as const satisfies readonly ContentEntry[];

export const contentRegistry: readonly ContentEntry[] = baseContentRegistry.map((entry) => {
  const enhanced = applyGuideDepthEnhancement(entry);
  return applyGeneratedEditorialLocales(enhanced);
});

const poiDataByMap = rawMapSeoData.poisByMap as Record<
  string,
  readonly { id: string; slug: string }[]
>;
const publicMapSlugs = new Set(
  rawMapSeoData.maps
    .filter((map) => isMapPublicationIndexable(map.slug))
    .map((map) => map.slug),
);
const contentRelationTargets = {
  tool: getLiveTools().map((tool) => tool.slug),
  map: [...publicMapSlugs],
  type: mapSeoPublication.types
    .filter((type) => type.indexable && publicMapSlugs.has(type.mapSlug))
    .map((type) => `${type.mapSlug}/${type.slug}`),
  // POI pages remain publicly reachable even while editorial policy keeps
  // them noindex. Both the publication record and source entity must exist.
  poi: mapSeoPublication.pois.flatMap((publication) =>
    publicMapSlugs.has(publication.mapSlug) && poiDataByMap[publication.mapSlug]?.some(
      (poi) => poi.id === publication.markerId && poi.slug === publication.slug,
    )
      ? [`${publication.mapSlug}/${publication.slug}`]
      : [],
  ),
};

// Fail the server build as soon as publication state, translation review, or
// any public cross-entity relation becomes invalid.
assertContentRegistryValid(contentRegistry, contentRelationTargets);

export function isIndexableContentEntry(entry: ContentEntry) {
  return isPublishedIndexableContent(entry);
}

export function isContentTranslationIndexable(
  entry: ContentEntry,
  locale: SiteLocale,
) {
  return Boolean(
    isIndexableContentEntry(entry) &&
      entry.translations[locale] &&
      entry.publication.localeReview[locale] === "approved",
  );
}

export function getIndexableContentLocales(entry: ContentEntry) {
  return siteLocales.filter((locale) =>
    isContentTranslationIndexable(entry, locale),
  );
}

export function resolveContentSource(
  source: ContentSource,
  locale: SiteLocale,
) {
  const localized = source.localizations?.[locale];
  return localized
    ? { ...source, label: localized.label, url: localized.url }
    : source;
}

export function resolveContentPrimaryActionHref(
  action: ContentPrimaryAction,
  locale: SiteLocale,
) {
  return action.hrefs?.[locale] ?? action.href;
}

export function getContentTranslation(
  entry: ContentEntry,
  locale: SiteLocale,
) {
  const direct = entry.translations[locale];
  if (direct) {
    return {
      content: direct,
      contentLocale: locale,
      isFallback: false,
      reviewStatus: entry.publication.localeReview[locale] ?? "pending",
    } as const;
  }

  const contentLocale = resolveContentLocale(locale);
  return {
    content: entry.translations[contentLocale],
    contentLocale,
    isFallback: true,
    reviewStatus: "pending" as const,
  };
}

export function getContentEntry(section: ContentSection, slug: string) {
  const entry = contentRegistry.find(
    (candidate) => candidate.section === section && candidate.slug === slug,
  );
  return entry && isIndexableContentEntry(entry) ? entry : undefined;
}

export function getContentEntries(section?: ContentSection) {
  return contentRegistry.filter(
    (entry) =>
      isIndexableContentEntry(entry) && (!section || entry.section === section),
  ).sort((left, right) =>
    right.updatedAt.localeCompare(left.updatedAt) ||
    right.publishedAt.localeCompare(left.publishedAt) ||
    left.slug.localeCompare(right.slug),
  );
}

export function getContentHref(locale: SiteLocale, entry: Pick<ContentEntry, "section" | "slug">) {
  return localizedHref(locale, getContentCanonicalSuffix(entry));
}

export function getContentAlternates(entry: ContentEntry) {
  const path = getContentCanonicalSuffix(entry);
  return {
    ...Object.fromEntries(
      getIndexableContentLocales(entry).map((locale) => [
        siteLocaleConfig[locale].hreflang,
        localizedHref(locale, path),
      ]),
    ),
    "x-default": localizedHref("en", path),
  };
}

export function getContentStaticParams(section: ContentSection) {
  return getContentEntries(section).filter(
    (entry) => !hasCleanContentCanonicalRoute(entry),
  ).flatMap((entry) =>
    getIndexableContentLocales(entry).map((locale) => ({
      locale,
      slug: entry.slug,
    })),
  );
}

export function getCanonicalContentStaticParams() {
  return getContentEntries().filter(
    (entry) => hasCleanContentCanonicalRoute(entry),
  ).flatMap((entry) => {
    const missing = getContentCanonicalSuffix(entry).split("/").filter(Boolean);
    return getIndexableContentLocales(entry).map((locale) => ({
      locale,
      missing,
    }));
  });
}
