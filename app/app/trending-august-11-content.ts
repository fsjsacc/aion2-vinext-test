import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { SiteLocale } from "./site-config";

type LocalizedArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote" | "sections"
> & { keywords?: readonly string[] };

type ArticleLabels = Pick<
  LocalizedContent,
  | "backLabel"
  | "contentsLabel"
  | "publishedLabel"
  | "updatedLabel"
  | "relatedLabel"
>;

const newsLabels: Record<SiteLocale, ArticleLabels> = {
  "zh-hans": { backLabel: "返回新闻中心", contentsLabel: "本期重点", publishedLabel: "发布", updatedLabel: "最后核对", relatedLabel: "延伸阅读" },
  en: { backLabel: "Back to news", contentsLabel: "In this report", publishedLabel: "Published", updatedLabel: "Last verified", relatedLabel: "Related reading" },
  fr: { backLabel: "Retour aux actualités", contentsLabel: "Dans ce rapport", publishedLabel: "Publié", updatedLabel: "Dernière vérification", relatedLabel: "À lire aussi" },
  de: { backLabel: "Zurück zu den News", contentsLabel: "In diesem Bericht", publishedLabel: "Veröffentlicht", updatedLabel: "Zuletzt geprüft", relatedLabel: "Weiterführende Artikel" },
  es: { backLabel: "Volver a noticias", contentsLabel: "En este informe", publishedLabel: "Publicado", updatedLabel: "Última verificación", relatedLabel: "Lecturas relacionadas" },
  ja: { backLabel: "ニュース一覧へ", contentsLabel: "この記事の要点", publishedLabel: "公開日", updatedLabel: "最終確認", relatedLabel: "関連記事" },
  "pt-br": { backLabel: "Voltar às notícias", contentsLabel: "Neste relatório", publishedLabel: "Publicado", updatedLabel: "Última verificação", relatedLabel: "Leituras relacionadas" },
  ru: { backLabel: "Назад к новостям", contentsLabel: "В этом материале", publishedLabel: "Опубликовано", updatedLabel: "Последняя проверка", relatedLabel: "Читайте также" },
  ko: { backLabel: "뉴스로 돌아가기", contentsLabel: "이번 소식의 핵심", publishedLabel: "게시일", updatedLabel: "최종 확인", relatedLabel: "관련 글" },
  "zh-hant": { backLabel: "返回新聞中心", contentsLabel: "本期重點", publishedLabel: "發布", updatedLabel: "最後核對", relatedLabel: "延伸閱讀" },
};

const guideLabels: Record<SiteLocale, ArticleLabels> = {
  "zh-hans": { backLabel: "返回攻略中心", contentsLabel: "本页内容", publishedLabel: "发布", updatedLabel: "最后核对", relatedLabel: "继续阅读" },
  en: { backLabel: "Back to guides", contentsLabel: "On this page", publishedLabel: "Published", updatedLabel: "Last verified", relatedLabel: "Continue reading" },
  fr: { backLabel: "Retour aux guides", contentsLabel: "Sur cette page", publishedLabel: "Publié", updatedLabel: "Dernière vérification", relatedLabel: "À lire ensuite" },
  de: { backLabel: "Zurück zu den Guides", contentsLabel: "Auf dieser Seite", publishedLabel: "Veröffentlicht", updatedLabel: "Zuletzt geprüft", relatedLabel: "Weiterlesen" },
  es: { backLabel: "Volver a guías", contentsLabel: "En esta página", publishedLabel: "Publicado", updatedLabel: "Última verificación", relatedLabel: "Sigue leyendo" },
  ja: { backLabel: "ガイド一覧へ", contentsLabel: "このページの内容", publishedLabel: "公開日", updatedLabel: "最終確認", relatedLabel: "関連ガイド" },
  "pt-br": { backLabel: "Voltar aos guias", contentsLabel: "Nesta página", publishedLabel: "Publicado", updatedLabel: "Última verificação", relatedLabel: "Continue lendo" },
  ru: { backLabel: "Назад к руководствам", contentsLabel: "На этой странице", publishedLabel: "Опубликовано", updatedLabel: "Последняя проверка", relatedLabel: "Читать далее" },
  ko: { backLabel: "가이드로 돌아가기", contentsLabel: "이 페이지의 내용", publishedLabel: "게시", updatedLabel: "마지막 확인", relatedLabel: "이어서 읽기" },
  "zh-hant": { backLabel: "返回攻略中心", contentsLabel: "本頁內容", publishedLabel: "發布", updatedLabel: "最後核對", relatedLabel: "接著閱讀" },
};

function readingTime(locale: SiteLocale, minutes: number): string {
  const table: Record<SiteLocale, string> = {
    "zh-hans": `约 ${minutes} 分钟`, en: `${minutes} min read`, fr: `${minutes} min de lecture`,
    de: `${minutes} Min. Lesezeit`, es: `${minutes} min de lectura`, ja: `約${minutes}分`,
    "pt-br": `${minutes} min de leitura`, ru: `${minutes} мин чтения`, ko: `약 ${minutes}분`, "zh-hant": `約 ${minutes} 分鐘`,
  };
  return table[locale];
}

function articleCopy(
  labels: Record<SiteLocale, ArticleLabels>,
  locale: SiteLocale,
  minutes: number,
  body: LocalizedArticleBody,
): LocalizedContent {
  return { ...labels[locale], byline: "PFG", readingTime: readingTime(locale, minutes), ...body };
}

function localizations(values: Record<SiteLocale, string>, url: string): NonNullable<ContentSource["localizations"]> {
  return Object.fromEntries(
    Object.entries(values).map(([locale, label]) => [locale, { label, url }]),
  ) as NonNullable<ContentSource["localizations"]>;
}

const approvedAllLocales = {
  "zh-hans": "approved", en: "approved", fr: "approved", de: "approved", es: "approved",
  ja: "approved", "pt-br": "approved", ru: "approved", ko: "approved", "zh-hant": "approved",
} as const satisfies ContentEntry["publication"]["localeReview"];

const publishedVerified = {
  status: "published", indexable: true, localeReview: approvedAllLocales, sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

/* ------------------------------------------------------------------ */
/* Sources                                                             */
/* ------------------------------------------------------------------ */

const fromis9CollabUrl = "https://about.ncsoft.com/en/news/article/aion2_update_260527-copy";
const fromis9CollabSource: ContentSource = {
  id: "ncsoft-fromis9-collaboration-2026-06-26",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 and fromis_9 collaboration announcement",
  url: fromis9CollabUrl,
  publishedAt: "2026-06-26",
  retrievedAt: "2026-08-11",
  verifiedAt: "2026-08-11",
  localizations: localizations({
    "zh-hans": "AION2 与 fromis_9 合作活动公告",
    en: "AION2 and fromis_9 collaboration announcement",
    fr: "Annonce de la collaboration AION2 et fromis_9",
    de: "Ankündigung der Zusammenarbeit von AION2 und fromis_9",
    es: "Anuncio de la colaboración de AION2 y fromis_9",
    ja: "AION2 と fromis_9 のコラボレーション発表",
    "pt-br": "Anúncio da colaboração AION2 e fromis_9",
    ru: "Анонс коллаборации AION2 и fromis_9",
    ko: "AION2와 fromis_9 콜라보레이션 안내",
    "zh-hant": "AION2 與 fromis_9 合作活動公告",
  }, fromis9CollabUrl),
};

const summerFestaUrl = "https://about.ncsoft.com/en/news/article/aion2_update_20260617";
const summerFestaSource: ContentSource = {
  id: "ncsoft-summer-festa-2026-06-17",
  kind: "official", publisher: "NC Corporation",
  label: "AION2 SUMMER FESTA announcement", url: summerFestaUrl,
  publishedAt: "2026-06-17", retrievedAt: "2026-08-11", verifiedAt: "2026-08-11",
  localizations: localizations({
    "zh-hans": "AION2 SUMMER FESTA 发布会公告",
    en: "AION2 SUMMER FESTA announcement",
    fr: "Annonce du SUMMER FESTA AION2",
    de: "AION2 SUMMER FESTA Ankündigung",
    es: "Anuncio del SUMMER FESTA de AION2",
    ja: "AION2 SUMMER FESTA 発表",
    "pt-br": "Anúncio do SUMMER FESTA AION2",
    ru: "Анонс SUMMER FESTA AION2",
    ko: "AION2 SUMMER FESTA 안내",
    "zh-hant": "AION2 SUMMER FESTA 發佈會公告",
  }, summerFestaUrl),
};

const redditP2WSource: ContentSource = {
  id: "reddit-aion2-quna-kinah-p2w-2026-08",
  kind: "third-party", publisher: "Reddit r/Aion2",
  label: "NCSoft limiting Quna to Kinah exchange in global version — community discussion",
  url: "https://old.reddit.com/r/Aion2/comments/",
  publishedAt: "2026-08-10", retrievedAt: "2026-08-11", verifiedAt: "2026-08-11",
  localizations: localizations({
    "zh-hans": "Reddit r/Aion2：NCSoft 限制全球版 Quna→Kinah 兑换社区讨论",
    en: "NCSoft limiting Quna to Kinah exchange in global version — community discussion",
    fr: "Discussion communautaire sur la limitation de l'échange Quna→Kinah dans la version globale",
    de: "Community-Diskussion zur Einschränkung des Quna→Kinah-Tauschs in der globalen Version",
    es: "Discusión comunitaria sobre la limitación de Quna→Kinah en la versión global",
    ja: "Reddit r/Aion2：NCSoft グローバル版 Quna→Kinah 交換制限のコミュニティ議論",
    "pt-br": "Discussão da comunidade sobre a limitação de Quna→Kinah na versão global",
    ru: "Обсуждение сообществом ограничения обмена Quna→Kinah в глобальной версии",
    ko: "Reddit r/Aion2: NCSoft 글로벌 버전 Quna→Kinah 교환 제한 커뮤니티 토론",
    "zh-hant": "Reddit r/Aion2：NCSoft 限制全球版 Quna→Kinah 兌換社區討論",
  }, "https://old.reddit.com/r/Aion2/"),
};

const chapter1Url = "https://about.ncsoft.com/en/news/article/aion2_update_260706";
const chapter1Source: ContentSource = {
  id: "ncsoft-chapter1-2026-07-06",
  kind: "official", publisher: "NC Corporation",
  label: "AION2 Chapter 1: Lands of Sand and Snow official update overview",
  url: chapter1Url, publishedAt: "2026-07-06", retrievedAt: "2026-08-11", verifiedAt: "2026-08-11",
  localizations: localizations({
    "zh-hans": "AION2 Chapter 1：沙霜之地官方更新概览",
    en: "AION2 Chapter 1: Lands of Sand and Snow official update overview",
    fr: "Aperçu officiel de la mise à jour AION2 Chapter 1",
    de: "Offizieller Überblick zum AION2 Chapter 1 Update",
    es: "Resumen oficial de la actualización AION2 Chapter 1",
    ja: "AION2 Chapter 1：砂と雪の地 公式アップデート概要",
    "pt-br": "Visão geral oficial da atualização AION2 Chapter 1",
    ru: "Официальный обзор обновления AION2 Chapter 1",
    ko: "AION2 챕터 1: 모래와 서리의 땅 공식 업데이트 개요",
    "zh-hant": "AION2 Chapter 1：沙霜之地官方更新概覽",
  }, chapter1Url),
};

const classGuideSource: ContentSource = {
  id: "nc-aion2-class-guidebook",
  kind: "official", publisher: "NC Corporation",
  label: "AION2 official Korean Guidebook — class roster",
  url: "https://aion2.plaync.com/ko-kr/guidebook/class",
  retrievedAt: "2026-08-11", verifiedAt: "2026-08-11",
  localizations: localizations({
    "zh-hans": "AION2 韩国官方指南手册 — 职业列表",
    en: "AION2 official Korean Guidebook — class roster",
    fr: "Guide officiel coréen AION2 — liste des classes",
    de: "Offizielles koreanisches AION2-Handbuch — Klassenliste",
    es: "Guía oficial coreana de AION2 — lista de clases",
    ja: "AION2 韓国公式ガイドブック — クラス一覧",
    "pt-br": "Guia oficial coreano de AION2 — lista de classes",
    ru: "Официальное корейское руководство AION2 — список классов",
    ko: "AION2 공식 가이드북 — 클래스 목록",
    "zh-hant": "AION2 韓國官方指南手冊 — 職業列表",
  }, "https://aion2.plaync.com/ko-kr/guidebook/class"),
};

/* ------------------------------------------------------------------ */
/* Hero images                                                         */
/* ------------------------------------------------------------------ */

const fromis9Hero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/d7bbd612-d975-494b-abc1-d4c1f1de2035.png",
  width: 800, height: 420,
  credit: "NC Corporation",
  sourceUrl: fromis9CollabUrl,
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 与 fromis_9 合作官方宣传图", caption: "NC Corporation 官方合作宣传图；活动于 8 月 12 日截止。" },
    en: { alt: "Official AION2 and fromis_9 collaboration artwork", caption: "Official NC Corporation collaboration artwork; the event ends August 12." },
    fr: { alt: "Visuel officiel de la collaboration AION2 et fromis_9", caption: "Visuel officiel NC Corporation ; l'événement se termine le 12 août." },
    de: { alt: "Offizielles Artwork zur AION2- und fromis_9-Kooperation", caption: "Offizielles NC-Artwork; die Aktion endet am 12. August." },
    es: { alt: "Arte oficial de la colaboración de AION2 y fromis_9", caption: "Arte oficial de NC Corporation; el evento termina el 12 de agosto." },
    ja: { alt: "AION2 と fromis_9 コラボ公式アートワーク", caption: "NC Corporation 公式コラボアート。イベントは 8 月 12 日まで。" },
    "pt-br": { alt: "Arte oficial da colaboração AION2 e fromis_9", caption: "Arte oficial da NC Corporation; o evento termina em 12 de agosto." },
    ru: { alt: "Официальный арт коллаборации AION2 и fromis_9", caption: "Официальный арт NC Corporation; событие заканчивается 12 августа." },
    ko: { alt: "AION2와 fromis_9 콜라보레이션 공식 이미지", caption: "NC Corporation 공식 콜라보 이미지입니다. 이벤트는 8월 12일에 종료됩니다." },
    "zh-hant": { alt: "AION2 與 fromis_9 合作官方宣傳圖", caption: "NC Corporation 官方合作宣傳圖；活動於 8 月 12 日截止。" },
  },
};

const p2wHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://about.ncsoft.com/en/news/article/aion2_update_260706",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 官方宣传图", caption: "NC 官方图片；全球版货币兑换限制尚未在官方公告中确认。" },
    en: { alt: "Official AION2 artwork", caption: "Official NC artwork; the global currency exchange limit has not been confirmed in an official notice." },
    fr: { alt: "Visuel officiel AION2", caption: "Visuel officiel NC ; la limitation du change de monnaie globale n'a pas été confirmée officiellement." },
    de: { alt: "Offizielles AION2-Artwork", caption: "Offizielles NC-Artwork; die globale Währungsumschränkung wurde nicht offiziell bestätigt." },
    es: { alt: "Arte oficial de AION2", caption: "Arte oficial de NC; la limitación global de cambio de moneda no ha sido confirmada oficialmente." },
    ja: { alt: "AION2 公式アートワーク", caption: "NC 公式アート。グローバル版の通貨交換制限は公式発表で確認されていません。" },
    "pt-br": { alt: "Arte oficial de AION2", caption: "Arte oficial da NC; a limitação de câmbio global não foi confirmada em aviso oficial." },
    ru: { alt: "Официальный арт AION2", caption: "Официальный арт NC; глобальное ограничение обмена валюты не подтверждено официальным уведомлением." },
    ko: { alt: "AION2 공식 이미지", caption: "NC 공식 이미지입니다. 글로벌 통화 교환 제한은 공식 공지에서 확인되지 않았습니다." },
    "zh-hant": { alt: "AION2 官方宣傳圖", caption: "NC 官方圖片；全球版貨幣兌換限制尚未在官方公告中確認。" },
  },
};

const launchHero: ContentHeroImage = {
  src: "https://fizz-download.playnccdn.com/download/v2/buckets/marketing-platform/files/19daa0916cf-44ee37e4-32f3-43fd-96f5-209f0afce2ad",
  width: 1200, height: 630,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5819287b798626e79a8892",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 全球版早期接入官方公告主视觉", caption: "NC 官方公告图；全球版 9 月上线。" },
    en: { alt: "Official AION2 Global Early Access announcement artwork", caption: "Official NC artwork; global launch September 2026." },
    fr: { alt: "Visuel officiel de l'annonce Early Access mondial d'AION2", caption: "Visuel officiel NC ; lancement mondial en septembre 2026." },
    de: { alt: "Offizielles Artwork zur globalen AION2 Early-Access-Ankündigung", caption: "Offizielles NC-Artwork; globaler Start September 2026." },
    es: { alt: "Arte oficial del anuncio del Early Access global de AION2", caption: "Arte oficial de NC; lanzamiento global en septiembre de 2026." },
    ja: { alt: "AION2 グローバル版 Early Access 公式告知画像", caption: "NC 公式画像。グローバル版 2026 年 9 月発売。" },
    "pt-br": { alt: "Arte oficial do anúncio do Early Access global de AION2", caption: "Arte oficial da NC; lançamento global em setembro de 2026." },
    ru: { alt: "Официальный арт глобального Early Access AION2", caption: "Официальный арт NC; глобальный запуск в сентябре 2026." },
    ko: { alt: "AION2 글로벌 얼리 액세스 공식 공지 이미지", caption: "NC 공식 이미지입니다. 글로벌 출시는 2026년 9월입니다." },
    "zh-hant": { alt: "AION2 全球版早期接入官方公告主視覺", caption: "NC 官方公告圖；全球版 9 月上線。" },
  },
};

const chapter1Hero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: chapter1Url,
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 Chapter 1 官方宣传图", caption: "NC 官方 Chapter 1 宣传图；全球版内容以正式上线为准。" },
    en: { alt: "Official AION2 Chapter 1 artwork", caption: "Official NC Chapter 1 artwork; global content is subject to final release." },
    fr: { alt: "Visuel officiel du Chapter 1 d'AION2", caption: "Visuel officiel NC du Chapter 1 ; le contenu global peut varier." },
    de: { alt: "Offizielles AION2-Chapter-1-Artwork", caption: "Offizielles NC-Artwork; globaler Inhalt vorbehaltlich Änderungen." },
    es: { alt: "Arte oficial del Chapter 1 de AION2", caption: "Arte oficial del Chapter 1 de NC; el contenido global está sujeto a cambios." },
    ja: { alt: "AION2 Chapter 1 公式アートワーク", caption: "NC 公式 Chapter 1 アート。グローバル版の内容は正式リリースに準じます。" },
    "pt-br": { alt: "Arte oficial do Chapter 1 de AION2", caption: "Arte oficial do Chapter 1 da NC; o conteúdo global pode variar." },
    ru: { alt: "Официальный арт AION2 Chapter 1", caption: "Официальный арт Chapter 1 от NC; глобальный контент может отличаться." },
    ko: { alt: "AION2 챕터 1 공식 이미지", caption: "NC 공식 챕터 1 이미지입니다. 글로벌 버전 콘텐츠는 최종 출시에 따라 달라질 수 있습니다." },
    "zh-hant": { alt: "AION2 Chapter 1 官方宣傳圖", caption: "NC 官方 Chapter 1 宣傳圖；全球版內容以正式上線為準。" },
  },
};

const classHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/5e088e2e-6d0c-4cf7-981a-feba6e673c83.jpg",
  width: 864, height: 456,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/guidebook/class",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 八职业官方指南图", caption: "NC 官方指南图；全球版首发 8 职业。" },
    en: { alt: "Official AION2 eight-class guide artwork", caption: "Official NC guide artwork; eight base classes at global launch." },
    fr: { alt: "Image officielle du guide des huit classes d'AION2", caption: "Image officielle du guide NC ; huit classes de base au lancement global." },
    de: { alt: "Offizielles AION2-Acht-Klassen-Artwork", caption: "Offizielles NC-Artwork; acht Basisklassen beim globalen Start." },
    es: { alt: "Imagen oficial de la guía de las ocho clases de AION2", caption: "Imagen oficial de la guía de NC; ocho clases básicas en el lanzamiento global." },
    ja: { alt: "AION2 8クラス公式ガイド画像", caption: "NC 公式ガイド画像。グローバル版は 8 基本クラスでスタート。" },
    "pt-br": { alt: "Imagem oficial do guia das oito classes de AION2", caption: "Imagem oficial do guia da NC; oito classes básicas no lançamento global." },
    ru: { alt: "Официальное изображение восьми классов AION2", caption: "Официальное изображение руководства NC; восемь базовых классов на глобальном запуске." },
    ko: { alt: "AION2 8개 클래스 공식 가이드 이미지", caption: "NC 공식 가이드 이미지입니다. 글로벌 출시 시 8개 기본 클래스로 시작합니다." },
    "zh-hant": { alt: "AION2 八職業官方指南圖", caption: "NC 官方指南圖；全球版首發 8 職業。" },
  },
};

/* ------------------------------------------------------------------ */
/* Helper to create article sections                                   */
/* ------------------------------------------------------------------ */

function section(id: string, title: string, paragraphs: readonly string[]): ContentEntry["translations"]["en"]["sections"][number] {
  return { id, title, paragraphs };
}

/* ------------------------------------------------------------------ */
/* Entries                                                             */
/* ------------------------------------------------------------------ */

export const trendingAugust11ContentEntries = [
  // ARTICLE 1: fromis_9 collaboration ending
  {
    section: "news",
    slug: "august-11-2026-fromis9-collaboration-ending",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-11",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [fromis9CollabSource, summerFestaSource],
    heroImage: fromis9Hero,
    related: [
      { kind: "content", section: "news", slug: "global-launch-pve-content-what-we-know" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 4, {
        eyebrow: "LIMITED-TIME EVENT",
        title: "AION2 fromis_9 collaboration ends August 12 — last chance for exclusive items",
        description: "The fromis_9 collaboration event in AION2 ends August 12. Get themed costumes, weapon skins, wings, pets, emotes, and limited-event rewards before they become unavailable.",
        intro: "The AION2 and fromis_9 collaboration, launched on June 26, 2026 after the SUMMER FESTA showcase on June 17, is ending on August 12, 2026. This collaboration brought K-pop themed cosmetics, a limited-time event, and exclusive emotes to AION2. Players who have not yet collected the items should act before maintenance on August 12, after which the collaboration items may become unavailable.",
        sourceNote: "Based on the official NC Corporation collaboration announcement (June 26, 2026) and the SUMMER FESTA announcement (June 17, 2026). All times are KST.",
        keywords: ["AION2 fromis_9 collaboration", "AION2 collaboration ending August 12", "AION2 limited items", "AION2 exclusive emotes"],
        sections: [
          section("last-chance", "Collaboration ends August 12 — what becomes unavailable", [
            "The fromis_9 collaboration event in AION2 ends with the August 12 maintenance. After this date, the limited-time collaboration costumes, weapon skins, wings, pets, and emotes will no longer be obtainable through the current event methods.",
            "NC Corporation has not announced whether these items will return in the future. Players interested in the fromis_9 themed cosmetics should redeem them before the event concludes. The four costume sets, light stick weapon skin, Four-Leaf Clover Wings, Baby Flomeow and Flostick pets, and exclusive emotes are all tied to this event window.",
          ]),
          section("themed-items", "Themed items: costumes, weapon skins, wings, pets, and emotes", [
            "The collaboration introduced fromis_9 themed costumes, weapon skins (light stick skin), wings (Four-Leaf Clover Wings), and pets (Baby Flomeow and Flostick). Each cosmetic set lets players transform into individual fromis_9 members when fully equipped, adding a unique visual layer to the game.",
            "The collaboration also added exclusive emotes featuring dance moves synchronized to fromis_9's song 'LIKE YOU BETTER.' A special feature allows nearby players to join the dance, creating a social experience in towns. These emotes are tied to the event and may become unavailable after August 12.",
          ]),
          section("stolen-stage-props", "The Case of the Stolen Stage Props event", [
            "The limited-time event 'The Case of the Stolen Stage Props' runs until August 12, rewarding players with three emotes and a limited-edition title upon completion. This event is a collaboration-themed quest chain that ties into the fromis_9 partnership.",
            "Players who complete the event before the deadline can earn the exclusive title and all three emotes. After August 12, this event and its rewards will no longer be accessible, making these items potentially limited in circulation.",
          ]),
          section("scope-and-note", "Event scope: what this collaboration does not include", [
            "The fromis_9 collaboration is a cosmetic and social event. It does not include new combat content, balance changes, or permanent gameplay additions. The items are purely cosmetic with no gameplay advantage.",
            "For players interested in gameplay content, AION2's Chapter 1 update (Lands of Sand and Snow) remains the primary source of new combat content, while the global launch in September 2026 will bring the game to new regions.",
          ]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 4, {
        eyebrow: "限时活动", title: "AION2 fromis_9 联名合作 8 月 12 日截止——最后机会获取限定道具",
        description: "AION2 与 fromis_9 的联名合作活动将于 8 月 12 日结束。主题服装、武器外观、翅膀、宠物、表情及限时活动奖励即将绝版。",
        intro: "AION2 与 K-pop 组合 fromis_9 的联名合作自 2026 年 6 月 26 日上线（6 月 17 日 SUMMER FESTA 公布），将于 2026 年 8 月 12 日结束。本次合作带来了 K-pop 主题外观、限时活动任务和专属表情。尚未收集完道具的玩家应在 8 月 12 日维护前行动，之后合作道具可能无法再获取。",
        sourceNote: "基于 NC Corporation 官方合作公告（2026 年 6 月 26 日）与 SUMMER FESTA 公告（2026 年 6 月 17 日）。时间均为 KST。",
        keywords: ["AION2 fromis_9 联名", "AION2 合作活动 8月12日截止", "AION2 限定道具", "AION2 专属表情"],
        sections: [
          section("last-chance", "8 月 12 日截止——哪些道具将绝版", ["fromis_9 联名合作活动将于 8 月 12 日维护时结束。此后，限时合作服装、武器外观、翅膀、宠物和表情将无法通过当前活动方式获取。", "NC Corporation 尚未公布这些道具是否会以后回归。感兴趣的玩家应在活动结束前兑换完毕。四套时装、应援棒武器外观、四叶草翅膀、Baby Flomeow 和 Flostick 宠物、以及专属表情均绑定在此活动窗口内。"]),
          section("themed-items", "主题道具：服装、武器外观、翅膀、宠物与表情", ["本次合作推出了 fromis_9 主题服装、武器外观（应援棒）、翅膀（四叶草翅膀）和宠物（Baby Flomeow、Flostick）。全套装备后可变身为 fromis_9 成员，为游戏增添独特视觉元素。", "合作还新增了专属表情，包含 fromis_9 歌曲 'LIKE YOU BETTER' 的编舞动作。附近玩家可加入共舞，在主城创造社交体验。这些表情与活动绑定，8 月 12 日后可能无法获取。"]),
          section("stolen-stage-props", "「失窃的舞台道具」事件活动", ["限时事件「失窃的舞台道具」持续至 8 月 12 日，完成任务可获得三个表情和一个限定称号。该事件是与 fromis_9 合作相关的任务链。", "在截止日期前完成事件的玩家可获得专属称号和全部三个表情。8 月 12 日后该事件及其奖励将不再可用，这些道具可能成为限量流通物品。"]),
          section("scope-and-note", "活动范围——本次合作不包括的内容", ["fromis_9 合作是外观和社交活动，不包含新战斗内容、平衡调整或永久性游戏玩法新增。道具均为外观性质，无游戏玩法优势。", "关注玩法内容的玩家，AION2 Chapter 1 更新（沙霜之地）仍是新战斗内容的主要来源，而 2026 年 9 月的全球版将为新区域带来游戏上线。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 4, {
        eyebrow: "한정 이벤트", title: "AION2 fromis_9 콜라보레이션 8월 12일 종료 — 한정 아이템 마지막 기회",
        description: "AION2와 fromis_9의 콜라보레이션 이벤트가 8월 12일에 종료됩니다. 테마 의상, 무기 스킨, 날개, 펫, 감정 표현 및 한정 이벤트 보상을 놓치지 마세요.",
        intro: "2026년 6월 26일 시작된 AION2와 fromis_9의 콜라보레이션이 8월 12일에 종료됩니다. K-pop 테마 코스메틱, 한정 이벤트, 전용 감정 표현을 선보인 이번 콜라보레이션의 아이템은 종료 후 획득이 불가능해질 수 있습니다.",
        sourceNote: "NC Corporation 공식 콜라보레이션 발표(2026년 6월 26일)와 SUMMER FESTA 발표(2026년 6월 17일) 기준. 모든 시간은 KST입니다.",
        keywords: ["AION2 fromis_9 콜라보", "AION2 콜라보 8월 12일 종료", "AION2 한정 아이템", "AION2 전용 감정 표현"],
        sections: [
          section("last-chance", "8월 12일 종료 — 획득 불가능해지는 아이템", ["fromis_9 콜라보레이션 이벤트가 8월 12일 점검과 함께 종료됩니다. 이후 한정 콜라보 의상, 무기 스킨, 날개, 펫, 감정 표현을 현재 이벤트 방식으로 획득할 수 없게 됩니다.", "NC Corporation은 이 아이템들의 향후 재출시 여부를 발표하지 않았습니다. 관심 있는 플레이어는 이벤트 종료 전에 아이템을 수령하시기 바랍니다."]),
          section("themed-items", "테마 아이템: 의상, 무기 스킨, 날개, 펫, 감정 표현", ["콜라보레이션을 통해 fromis_9 테마 의상, 무기 스킨(응원봉), 날개(네잎클로버 날개), 펫(Baby Flomeow, Flostick)이 추가됐습니다. 풀세트 장착 시 fromis_9 멤버로 변신할 수 있습니다.", "fromis_9의 'LIKE YOU BETTER' 안무를 활용한 전용 감정 표현도 추가됐으며, 주변 플레이어가 함께 춤을 출 수 있는 소셜 기능도 포함됐습니다."]),
          section("stolen-stage-props", "'도난당한 무대 소품' 이벤트", ["한정 이벤트 '도난당한 무대 소품'이 8월 12일까지 진행되며, 완료 시 세 가지 감정 표현과 한정 칭호를 보상으로 제공합니다.", "기한 내에 이벤트를 완료한 플레이어는 전용 칭호와 세 가지 감정 표현을 모두 획득할 수 있습니다. 8월 12일 이후에는 이 보상을 더 이상 받을 수 없습니다."]),
          section("scope-and-note", "이벤트 범위 — 포함되지 않는 내용", ["fromis_9 콜라보레이션은 코스메틱 및 소셜 이벤트로, 신규 전투 콘텐츠나 밸런스 변경을 포함하지 않습니다.", "게임플레이 콘텐츠에 관심이 있는 플레이어는 AION2 챕터 1 업데이트(모래와 서리의 땅)와 2026년 9월 글로벌 출시를 주목하시기 바랍니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 4, {
        eyebrow: "ÉVÉNEMENT LIMITÉ", title: "La collaboration AION2 × fromis_9 se termine le 12 août — dernière chance",
        description: "La collaboration AION2 et fromis_9 se termine le 12 août. Costumes, armes, ailes, familiers et emotes exclusifs seront bientôt indisponibles.",
        intro: "Lancée le 26 juin 2026 après le SUMMER FESTA du 17 juin, la collaboration entre AION2 et le groupe K-pop fromis_9 se termine le 12 août 2026. Les objets cosmétiques et les récompenses de l'événement ne seront plus accessibles après cette date.",
        sourceNote: "Basé sur l'annonce officielle de collaboration NC Corporation (26 juin 2026) et l'annonce SUMMER FESTA (17 juin 2026). Heures en KST.",
        keywords: ["collaboration AION2 fromis_9", "AION2 collaboration fin août", "AION2 objets limités", "AION2 emotes exclusifs"],
        sections: [
          section("last-chance", "Fin le 12 août — quels objets deviennent indisponibles", ["La collaboration se termine à la maintenance du 12 août. Les costumes, skins d'armes, ailes, familiers et emotes limités ne seront plus obtenables.", "NC Corporation n'a pas annoncé de retour possible. Les joueurs intéressés doivent agir avant la date limite."]),
          section("themed-items", "Objets thématiques : costumes, armes, ailes, familiers et emotes", ["La collaboration a introduit des costumes thématiques, un skin d'arme (light stick), des ailes (Four-Leaf Clover), et des familiers (Baby Flomeow, Flostick). L'ensemble complet permet de se transformer en membre de fromis_9.", "Des emotes exclusives synchronisées sur 'LIKE YOU BETTER' de fromis_9 ont été ajoutées, avec une fonction sociale permettant aux joueurs de danser ensemble."]),
          section("stolen-stage-props", "L'événement « The Case of the Stolen Stage Props »", ["L'événement limité se termine le 12 août, récompensant les joueurs avec trois emotes et un titre exclusif.", "Les joueurs qui terminent l'événement avant la date butoir peuvent obtenir le titre et les trois emotes avant qu'ils ne deviennent indisponibles."]),
          section("scope-and-note", "Ce que cette collaboration n'inclut pas", ["La collaboration fromis_9 est un événement cosmétique et social. Elle n'inclut pas de nouveau contenu de combat ni de changements d'équilibrage.", "Pour le contenu de jeu, la mise à jour Chapter 1 et le lancement mondial de septembre 2026 restent les principales sources de nouveau contenu."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 4, {
        eyebrow: "ZEITBEGRENZTES EVENT", title: "AION2 fromis_9-Kooperation endet am 12. August — letzte Chance",
        description: "Die AION2 fromis_9-Kooperation endet am 12. August. Themensets, Waffen-Skins, Flügel, Begleiter, Emotes und Eventbelohnungen werden bald nicht mehr erhältlich sein.",
        intro: "Die am 26. Juni 2026 gestartete Kooperation zwischen AION2 und der K-Pop-Gruppe fromis_9 endet am 12. August 2026. Spieler sollten die limitierten Gegenstände vor der Wartung am 12. August einsammeln.",
        sourceNote: "Basierend auf der offiziellen Ankündigung von NC Corporation (26. Juni 2026) und der SUMMER FESTA-Ankündigung (17. Juni 2026). Zeiten in KST.",
        keywords: ["AION2 fromis_9 Kooperation", "AION2 Kooperation endet August", "AION2 limitierte Items", "AION2 exklusive Emotes"],
        sections: [
          section("last-chance", "Ende am 12. August — welche Gegenstände verloren gehen", ["Die Kooperation endet mit der Wartung am 12. August. Die limitierten Kosmetika, Waffen-Skins, Flügel, Begleiter und Emotes sind danach nicht mehr erhältlich.", "NC Corporation hat keine Rückkehr dieser Gegenstände angekündigt. Interessierte Spieler sollten vor dem Termin handeln."]),
          section("themed-items", "Themengegenstände: Kostüme, Waffen, Flügel, Begleiter und Emotes", ["Die Kooperation bot fromis_9-thematisierte Kostüme, Waffen-Skins (Light Stick), Flügel (Four-Leaf Clover), Begleiter (Baby Flomeow, Flostick) und exklusive Emotes.", "Die Emotes verwenden Choreografien aus 'LIKE YOU BETTER' von fromis_9, bei denen umstehende Spieler mitmachen können."]),
          section("stolen-stage-props", "Das Event 'The Case of the Stolen Stage Props'", ["Das zeitbegrenzte Event läuft bis zum 12. August und belohnt Spieler mit drei Emotes und einem limitierten Titel.", "Spieler, die das Event vor Ablauf der Frist abschließen, erhalten den exklusiven Titel und alle drei Emotes."]),
          section("scope-and-note", "Was diese Kooperation nicht beinhaltet", ["Die fromis_9-Kooperation ist ein kosmetisches und soziales Event ohne neue Kampfinhalte oder Balance-Änderungen.", "Für Spielinhalte bleiben das Chapter-1-Update und der globale Start im September 2026 die Hauptquellen."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 4, {
        eyebrow: "EVENTO LIMITADO", title: "La colaboración de AION2 con fromis_9 termina el 12 de agosto — última oportunidad",
        description: "La colaboración de AION2 con fromis_9 termina el 12 de agosto. Disfraces, armas, alas, mascotas y gestos exclusivos dejarán de estar disponibles.",
        intro: "La colaboración entre AION2 y el grupo K-pop fromis_9, lanzada el 26 de junio de 2026, finaliza el 12 de agosto de 2026. Los objetos cosméticos temáticos y las recompensas del evento limitado dejarán de obtenerse después de esta fecha.",
        sourceNote: "Basado en el anuncio oficial de colaboración de NC Corporation (26 de junio de 2026) y el anuncio del SUMMER FESTA (17 de junio de 2026). Horarios en KST.",
        keywords: ["colaboración AION2 fromis_9", "AION2 colaboración termina agosto", "AION2 objetos limitados", "AION2 gestos exclusivos"],
        sections: [
          section("last-chance", "Fin el 12 de agosto — objetos que dejarán de estar disponibles", ["La colaboración termina con el mantenimiento del 12 de agosto. Los disfraces, armas, alas, mascotas y gestos limitados dejarán de obtenerse.", "NC Corporation no ha anunciado si estos objetos volverán en el futuro. Los jugadores interesados deben actuar antes de la fecha límite."]),
          section("themed-items", "Objetos temáticos: disfraces, armas, alas, mascotas y gestos", ["La colaboración introdujo disfraces temáticos de fromis_9, armas (light stick), alas (Four-Leaf Clover) y mascotas (Baby Flomeow, Flostick).", "Se añadieron gestos exclusivos con la coreografía de 'LIKE YOU BETTER' de fromis_9, permitiendo a los jugadores cercanos unirse al baile."]),
          section("stolen-stage-props", "El evento 'The Case of the Stolen Stage Props'", ["El evento limitado 'The Case of the Stolen Stage Props' finaliza el 12 de agosto, recompensando con tres gestos y un título exclusivo.", "Los jugadores que completen el evento antes de la fecha límite podrán obtener el título y los tres gestos."]),
          section("scope-and-note", "Lo que esta colaboración no incluye", ["La colaboración fromis_9 es un evento cosmético y social. No incluye nuevo contenido de combate ni cambios de equilibrio.", "Para contenido de juego, la actualización Chapter 1 y el lanzamiento global de septiembre de 2026 siguen siendo las principales fuentes."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 4, {
        eyebrow: "期間限定イベント", title: "AION2 × fromis_9 コラボレーション 8月12日終了 — 限定アイテム最後のチャンス",
        description: "AION2 と fromis_9 のコラボレーションが 8月12日で終了。テーマコスチューム、武器スキン、翼、ペット、エモートが入手不可になります。",
        intro: "2026年6月26日から開催されていた AION2 と K-POP グループ fromis_9 のコラボレーションが 2026年8月12日で終了します。限定コスメやイベント報酬はこの日以降入手できなくなります。",
        sourceNote: "NC Corporation 公式コラボレーション発表（2026年6月26日）および SUMMER FESTA 発表（2026年6月17日）に基づきます。時刻は KST。",
        keywords: ["AION2 fromis_9 コラボ", "AION2 コラボ 8月12日終了", "AION2 限定アイテム", "AION2 限定エモート"],
        sections: [
          section("last-chance", "8月12日終了 — 入手できなくなるアイテム", ["コラボレーションは8月12日のメンテナンスで終了します。限定コスチューム、武器スキン、翼、ペット、エモートは現在の方法では入手できなくなります。", "NC Corporation はこれらのアイテムの再登場を発表していません。興味のあるプレイヤーは期限前に収集してください。"]),
          section("themed-items", "テーマアイテム：コスチューム、武器、翼、ペット、エモート", ["コラボでは fromis_9 テーマのコスチューム、武器スキン（ライトスティック）、翼（Four-Leaf Clover）、ペット（Baby Flomeow, Flostick）が追加されました。", "fromis_9 の「LIKE YOU BETTER」の振付を使用した限定エモートも追加され、近くのプレイヤーが一緒に踊れる機能も含まれています。"]),
          section("stolen-stage-props", "「盗まれた舞台道具」イベント", ["期間限定イベント「The Case of the Stolen Stage Props」は8月12日まで実施され、3つのエモートと限定称号が報酬として提供されます。", "期限内にイベントを完了したプレイヤーは、限定称号と3つのエモートをすべて獲得できます。"]),
          section("scope-and-note", "このコラボに含まれないもの", ["fromis_9 コラボはコスメおよびソーシャルイベントであり、新規戦闘コンテンツやバランス調整は含まれません。", "ゲームプレイコンテンツについては、Chapter 1 アップデートと2026年9月のグローバル版リリースが主な情報源です。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 4, {
        eyebrow: "EVENTO LIMITADO", title: "Colaboração AION2 com fromis_9 termina em 12 de agosto — última chance",
        description: "A colaboração AION2 com fromis_9 termina em 12 de agosto. Figurinos, armas, asas, mascotes e emotes exclusivos ficarão indisponíveis.",
        intro: "A colaboração entre AION2 e o grupo K-pop fromis_9, lançada em 26 de junho de 2026, termina em 12 de agosto de 2026. Os itens cosméticos temáticos e recompensas do evento limitado não serão mais obtidos após esta data.",
        sourceNote: "Baseado no anúncio oficial de colaboração da NC Corporation (26 de junho de 2026) e no anúncio do SUMMER FESTA (17 de junho de 2026). Horários em KST.",
        keywords: ["colaboração AION2 fromis_9", "AION2 colaboração termina agosto", "AION2 itens limitados", "AION2 emotes exclusivos"],
        sections: [
          section("last-chance", "Fim em 12 de agosto — itens que ficarão indisponíveis", ["A colaboração termina com a manutenção de 12 de agosto. Os figurinos, armas, asas, mascotes e emotes limitados não serão mais obtidos.", "A NC Corporation não anunciou se estes itens retornarão no futuro. Jogadores interessados devem agir antes do prazo."]),
          section("themed-items", "Itens temáticos: figurinos, armas, asas, mascotes e emotes", ["A colaboração introduziu figurinos temáticos do fromis_9, armas (light stick), asas (Four-Leaf Clover) e mascotes (Baby Flomeow, Flostick).", "Emotes exclusivos com a coreografia de 'LIKE YOU BETTER' do fromis_9 foram adicionados, permitindo que jogadores próximos dancem juntos."]),
          section("stolen-stage-props", "O evento 'The Case of the Stolen Stage Props'", ["O evento limitado 'The Case of the Stolen Stage Props' termina em 12 de agosto, recompensando com três emotes e um título exclusivo.", "Jogadores que completarem o evento antes do prazo podem obter o título e os três emotes."]),
          section("scope-and-note", "O que esta colaboração não inclui", ["A colaboração fromis_9 é um evento cosmético e social. Não inclui novo conteúdo de combate ou alterações de equilíbrio.", "Para conteúdo de jogo, a atualização Chapter 1 e o lançamento global em setembro de 2026 continuam sendo as principais fontes."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 4, {
        eyebrow: "ВРЕМЕННОЕ СОБЫТИЕ", title: "Коллаборация AION2 и fromis_9 завершается 12 августа — последний шанс",
        description: "Коллаборация AION2 и fromis_9 завершается 12 августа. Тематические костюмы, оружие, крылья, питомцы и эмоции станут недоступны.",
        intro: "Коллаборация между AION2 и K-pop группой fromis_9, запущенная 26 июня 2026 года, завершается 12 августа 2026 года. Тематические косметические предметы и награды временного события перестанут быть доступны после этой даты.",
        sourceNote: "Основано на официальном объявлении NC Corporation (26 июня 2026) и объявлении SUMMER FESTA (17 июня 2026). Время в KST.",
        keywords: ["коллаборация AION2 fromis_9", "AION2 коллаборация заканчивается август", "AION2 ограниченные предметы", "AION2 эксклюзивные эмоции"],
        sections: [
          section("last-chance", "Завершение 12 августа — какие предметы станут недоступны", ["Коллаборация завершается с обслуживанием 12 августа. Ограниченные костюмы, оружие, крылья, питомцы и эмоции больше нельзя будет получить.", "NC Corporation не объявила о возможном возвращении этих предметов. Заинтересованные игроки должны действовать до крайнего срока."]),
          section("themed-items", "Тематические предметы: костюмы, оружие, крылья, питомцы и эмоции", ["Коллаборация представила тематические костюмы fromis_9, оружие (лайтстик), крылья (Four-Leaf Clover) и питомцев (Baby Flomeow, Flostick).", "Были добавлены эксклюзивные эмоции с хореографией 'LIKE YOU BETTER' от fromis_9, позволяющие nearby игрокам присоединиться к танцу."]),
          section("stolen-stage-props", "Событие «The Case of the Stolen Stage Props»", ["Временное событие завершается 12 августа, награждая игроков тремя эмоциями и ограниченным титулом.", "Игроки, завершившие событие до крайнего срока, могут получить эксклюзивный титул и все три эмоции."]),
          section("scope-and-note", "Что не включает эта коллаборация", ["Коллаборация fromis_9 является косметическим и социальным событием. Она не включает новый боевой контент или изменения баланса.", "Для игрового контента обновление Chapter 1 и глобальный запуск в сентябре 2026 года остаются основными источниками."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 4, {
        eyebrow: "限時活動", title: "AION2 fromis_9 聯名合作 8 月 12 日截止——最後機會獲取限定道具",
        description: "AION2 與 fromis_9 的聯名合作活動將於 8 月 12 日結束。主題服裝、武器外觀、翅膀、寵物、表情及限時活動獎勵即將絕版。",
        intro: "AION2 與 K-pop 組合 fromis_9 的聯名合作自 2026 年 6 月 26 日上線，將於 2026 年 8 月 12 日結束。本次合作帶來了 K-pop 主題外觀、限時活動任務和專屬表情。尚未收集完道具的玩家應在 8 月 12 日前行動，之後合作道具可能無法再獲取。",
        sourceNote: "基於 NC Corporation 官方合作公告（2026 年 6 月 26 日）與 SUMMER FESTA 公告（2026 年 6 月 17 日）。時間均為 KST。",
        keywords: ["AION2 fromis_9 聯名", "AION2 合作活動 8月12日截止", "AION2 限定道具", "AION2 專屬表情"],
        sections: [
          section("last-chance", "8 月 12 日截止——哪些道具將絕版", ["fromis_9 聯名合作活動將於 8 月 12 日維護時結束。此後，限時合作服裝、武器外觀、翅膀、寵物和表情將無法透過目前活動方式獲取。", "NC Corporation 尚未公布這些道具是否會回歸。感興趣的玩家應在活動結束前兌換完畢。"]),
          section("themed-items", "主題道具：服裝、武器外觀、翅膀、寵物與表情", ["本次合作推出了 fromis_9 主題服裝、武器外觀（應援棒）、翅膀（四葉草翅膀）和寵物（Baby Flomeow、Flostick）。全裝備後可變身為 fromis_9 成員。", "合作還新增了專屬表情，包含 fromis_9 歌曲 'LIKE YOU BETTER' 的編舞動作，附近玩家可加入共舞。"]),
          section("stolen-stage-props", "「失竊的舞台道具」事件活動", ["限時事件「失竊的舞台道具」持續至 8 月 12 日，完成任務可獲得三個表情和一個限定稱號。", "在截止日期前完成的玩家可獲得專屬稱號和全部三個表情，8 月 12 日後將不再可用。"]),
          section("scope-and-note", "活動範圍——本次合作不包括的內容", ["fromis_9 合作是外觀和社交活動，不包含新戰鬥內容或平衡調整。道具均為外觀性質，無遊戲玩法優勢。", "關注玩法內容的玩家，Chapter 1 更新（沙霜之地）仍是新戰鬥內容的主要來源，而 2026 年 9 月的全球版將為新區域帶來遊戲上線。"]),
        ],
      }),
    },
  },
  // ARTICLE 2: Quna-Kinah exchange limit
  {
    section: "news",
    slug: "global-quna-kinah-exchange-p2w-changes",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-11",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [redditP2WSource, chapter1Source],
    heroImage: p2wHero,
    related: [
      { kind: "content", section: "guides", slug: "global-monetization-watchlist" },
      { kind: "content", section: "news", slug: "global-launch-pve-content-what-we-know" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 5, {
        eyebrow: "MONETIZATION NEWS",
        title: "AION2 global Quna to Kinah exchange limit: what the P2W change means",
        description: "NCSoft is limiting Quna to Kinah exchange in the global version of AION2, reducing the game's pay-to-win potential compared to Korea and Taiwan.",
        intro: "Community reports indicate NCSoft is restricting the Quna-to-Kinah currency exchange in the global (EU/NA) version of AION2. This is a significant monetization change because the Korea and Taiwan services do not apply the same limit. This report distinguishes the community-reported change from anything confirmed in official notices.",
        sourceNote: "Based on community discussion on Reddit r/Aion2 (August 2026, third-party source). No official NC Corporation notice confirming this policy has been published as of August 11, 2026. Treat as unconfirmed until NC publishes details.",
        keywords: ["AION2 P2W changes", "AION2 Quna to Kinah", "AION2 global monetization", "AION2 free-to-play"],
        sections: [
          section("what-is-reported", "What the community reports: a Quna to Kinah limit", ["According to a widely discussed Reddit thread, NCSoft is limiting how players can exchange Quna (the cash currency) into Kinah (the in-game gold currency) in the global version. In Korea and Taiwan, players can convert Quna to Kinah, which community members describe as a pay-to-win path.", "The same thread credits this policy as 'the biggest hit to P2W since release in KRTW.' Because the change is community-reported and not yet confirmed in an official notice, figures and exact mechanics should be treated as unverified until NC publishes them."]),
          section("global-vs-krtw", "How global differs from Korea and Taiwan", ["The reported limit applies specifically to the global version, which is scheduled to launch in September 2026 covering North America, South America, Europe, and Japan. The Korea and Taiwan services, which have operated since November 2025, have not announced the same restriction.", "This creates a meaningful difference in the global economy: players who purchase Quna in the global version may not be able to convert it directly into Kinah, reducing the ability to spend money for a direct in-game gold advantage."]),
          section("p2w-impact", "What this means for free-to-play players", ["If confirmed, a Quna-to-Kinah limit would reduce the pay-to-win ceiling in the global version, making item and gold progression more dependent on gameplay rather than spending. This is generally seen as favorable for free-to-play players.", "Monetization in AION2 still includes Founder's Packs, a subscription, and the Quna shop for cosmetics. The reported change narrows one specific pay-to-win path but does not remove monetization entirely."]),
          section("status-and-outlook", "Status: unconfirmed, watch for official notice", ["As of August 11, 2026, no official NC Corporation notice has confirmed the Quna-to-Kinah limit. The claim originates from community discussion and should be validated against official sources before relying on it.", "AION2's global launch in September 2026 may bring an official monetization, subscription, or economy announcement. Bookmark the official AION2 global website and our monetization watchlist for the confirmed details."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
        eyebrow: "商业化新闻",
        title: "AION2 全球版 Quna→Kinah 兑换限制：氪金（P2W）变化意味着什么",
        description: "NCSoft 正在限制 AION2 全球版的 Quna 兑换 Kinah，相比韩服/台服大幅削弱游戏的付费即胜利潜力。",
        intro: "社区报告显示，NCSoft 正在限制 AION2 全球版（EU/NA）的 Quna 兑换 Kinah 货币兑换。这是一个重要的商业化变化，因为韩服/台服并未施加相同限制。本文区分社区报告的变化与官方公告确认的内容。",
        sourceNote: "基于 Reddit r/Aion2 社区讨论（2026 年 8 月，第三方来源）。截至 2026 年 8 月 11 日，NC Corporation 尚未发布确认此政策的官方公告。在官方公布细节前请视为未确认。",
        keywords: ["AION2 氪金变化", "AION2 Quna 兑换 Kinah", "AION2 全球版商业化", "AION2 免费游玩"],
        sections: [
          section("what-is-reported", "社区报告的内容：Quna→Kinah 限制", ["根据广泛讨论的 Reddit 帖子，NCSoft 正在限制全球版玩家将 Quna（现金货币）兑换成 Kinah（游戏内金币）的能力。在韩服/台服，玩家可以将 Quna 兑换 Kinah，社区成员将其描述为付费即胜利路径。", "同一帖子称此政策是'自 KRTW 上线以来对 P2W 的最大打击'。由于该变化来自社区报告，尚未在官方公告中确认，数字和具体机制在官方公布前应视为未验证。"]),
          section("global-vs-krtw", "全球版与韩服/台服的区别", ["报告中的限制仅适用于全球版，该版本计划于 2026 年 9 月上线，覆盖北美、南美、欧洲和日本。自 2025 年 11 月起运营的韩服/台服尚未宣布相同限制。", "这为全球版经济带来了显著差异：全球版购买 Quna 的玩家可能无法直接兑换成 Kinah，从而减少直接花钱获得游戏内金币优势的能力。"]),
          section("p2w-impact", "对免费玩家的意义", ["如果确认，Quna→Kinah 限制将降低全球版的付费即胜利上限，使道具和金币成长更依赖游戏玩法而非消费。这通常被视为对免费玩家有利。", "AION2 的商业化仍包括 Founder's Pack、订阅和 Quna 商店的装扮。报告中的变化收窄了一条特定的付费路径，但并未完全移除商业化。"]),
          section("status-and-outlook", "状态：未确认，关注官方公告", ["截至 2026 年 8 月 11 日，尚无官方公告确认 Quna→Kinah 限制。该说法源于社区讨论，在依赖前应通过官方来源验证。", "AION2 全球版 2026 年 9 月上线可能带来官方商业化、订阅或经济公告。可将官方全球版网站和本站商业化观察清单加入书签以获取确认细节。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 5, {
        eyebrow: "수익화 뉴스",
        title: "AION2 글로벌 Quna→Kinah 교환 제한: P2W 변화가 의미하는 것",
        description: "NCSoft가 AION2 글로벌 버전의 Quna→Kinah 교환을 제한하여 한국/대만 서비스 대비 P2W 요소를 크게 줄입니다.",
        intro: "커뮤니티 보고에 따르면 NCSoft가 AION2 글로벌(EU/NA) 버전에서 Quna→Kinah 통화 교환을 제한하고 있습니다. 이는 한국/대만 서비스에 동일한 제한이 적용되지 않기 때문에 중요한 수익화 변화입니다.",
        sourceNote: "Reddit r/Aion2 커뮤니티 토론(2026년 8월, 제3자 소스)에 기반합니다. 2026년 8월 11일 기준 NC Corporation이 이 정책을 확인하는 공식 공지를 발표하지 않았습니다.",
        keywords: ["AION2 P2W 변화", "AION2 Quna→Kinah", "AION2 글로벌 수익화", "AION2 무과금"],
        sections: [
          section("what-is-reported", "커뮤니티가 보고한 내용: Quna→Kinah 제한", ["널리 논의된 Reddit 스레드에 따르면 NCSoft가 글로벌 버전에서 플레이어가 Quna(현금 화폐)를 Kinah(게임 내 골드)로 교환하는 것을 제한하고 있습니다. 한국/대만에서는 Quna를 Kinah로 전환할 수 있으며, 커뮤니티는 이를 P2W 경로로 설명합니다.", "같은 스레드에서 이 정책을 'KRTW 출시 이후 P2W에 대한 최대 타격'으로 평가했습니다."]),
          section("global-vs-krtw", "글로벌과 한국/대만의 차이", ["보고된 제한은 2026년 9월 출시 예정인 글로벌 버전에만 적용되며 북미, 남미, 유럽, 일본을 포함합니다. 2025년 11월부터 운영된 한국/대만 서비스는 동일한 제한을 발표하지 않았습니다.", "이로 인해 글로벌 버전에서 Quna를 구매한 플레이어는 이를 직접 Kinah로 전환하지 못할 수 있어, 직접적인 게임 내 골드 우위를 얻는 능력이 줄어듭니다."]),
          section("p2w-impact", "무과금 플레이어에게 의미하는 것", ["확인되면 Quna→Kinah 제한은 글로벌 버전의 P2W 상한을 낮추어 아이템 및 골드 성장이 소비보다 게임플레이에 더 의존하게 됩니다.", "AION2 수익화에는 여전히 파운더스 팩, 구독, Quna 상점이 포함됩니다. 보고된 변화는 특정 P2W 경로를 좁히지만 수익화를 완전히 제거하지는 않습니다."]),
          section("status-and-outlook", "상태: 미확인, 공식 공지 확인", ["2026년 8월 11일 기준 Quna→Kinah 제한을 확인하는 공식 공지는 없습니다. 커뮤니티 토론에서 비롯된 주장이며, 신뢰하기 전에 공식 소스로 검증해야 합니다.", "AION2 글로벌 출시(2026년 9월)와 함께 공식 수익화, 구독, 경제 공지가 나올 수 있습니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 5, {
        eyebrow: "ACTUALITÉS MONÉTISATION", title: "Limite d'échange Quna→Kinah dans AION2 global : ce que ce changement P2W signifie",
        description: "NCSoft limiterait l'échange Quna vers Kinah dans la version globale d'AION2, réduisant le potentiel pay-to-win par rapport à la Corée et Taïwan.",
        intro: "Des rapports communautaires indiquent que NCSoft restreint l'échange de monnaie Quna→Kinah dans la version globale (EU/NA) d'AION2. Il s'agit d'un changement de monétisation significatif car les services coréen et taïwanais n'appliquent pas la même limite.",
        sourceNote: "Basé sur une discussion communautaire sur Reddit r/Aion2 (août 2026, source tierce). Aucun avis officiel de NC Corporation confirmant cette politique n'a été publié au 11 août 2026.",
        keywords: ["AION2 P2W", "AION2 Quna vers Kinah", "AION2 monétisation globale", "AION2 free-to-play"],
        sections: [
          section("what-is-reported", "Ce que rapporte la communauté", ["Selon un fil Reddit très discuté, NCSoft limite l'échange Quna→Kinah dans la version globale. En Corée et à Taïwan, les joueurs peuvent convertir Quna en Kinah, décrit comme un chemin pay-to-win.", "Le même fil qualifie cette politique de « plus gros coup porté au P2W depuis la sortie KRTW ». Non confirmé officiellement, à traiter avec prudence."]),
          section("global-vs-krtw", "Différence entre global et Corée/Taïwan", ["La limite signalée s'applique à la version globale, prévue pour septembre 2026 (Amérique du Nord, Amérique du Sud, Europe, Japon). Les services coréen et taïwanais, en service depuis novembre 2025, n'ont pas annoncé la même restriction.", "Les joueurs de la version globale achetant Quna pourraient ne pas pouvoir la convertir directement en Kinah, réduisant l'avantage payant direct."]),
          section("p2w-impact", "Ce que cela signifie pour les joueurs free-to-play", ["Si confirmée, la limite réduirait le plafond pay-to-win, rendant la progression des objets et de l'or plus dépendante du gameplay.", "La monétisation d'AION2 inclut toujours les packs Fondateur, un abonnement et la boutique Quna. Ce changement réduit un chemin P2W spécifique."]),
          section("status-and-outlook", "Statut : non confirmé, surveillez l'officiel", ["Au 11 août 2026, aucun avis officiel ne confirme la limite. La revendication provient de discussions communautaires et doit être validée auprès des sources officielles.", "Le lancement global de septembre 2026 pourrait apporter une annonce officielle de monétisation."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 5, {
        eyebrow: "MONETARISIERUNGSNACHRICHTEN", title: "AION2 global: Limit für Quna→Kinah-Tausch — was die P2W-Änderung bedeutet",
        description: "NCSoft schränkt den Quna→Kinah-Tausch in der globalen Version von AION2 ein und reduziert das Pay-to-Win-Potenzial im Vergleich zu Korea und Taiwan.",
        intro: "Community-Berichte deuten darauf hin, dass NCSoft den Währungstausch Quna→Kinah in der globalen Version (EU/NA) von AION2 einschränkt. Das ist eine bedeutende Monetarisierungsänderung, da Korea und Taiwan diese Grenze nicht anwenden.",
        sourceNote: "Basierend auf Community-Diskussionen auf Reddit r/Aion2 (August 2026, Drittanbieter). Zum 11. August 2026 wurde keine offizielle NC-Bestätigung veröffentlicht.",
        keywords: ["AION2 P2W", "AION2 Quna zu Kinah", "AION2 globale Monetarisierung", "AION2 Free-to-Play"],
        sections: [
          section("what-is-reported", "Was die Community berichtet", ["Laut einem viel diskutierten Reddit-Thread schränkt NCSoft den Quna→Kinah-Tausch in der globalen Version ein. In Korea und Taiwan können Spieler Quna in Kinah umwandeln, eine Pay-to-Win-Option.", "Der Thread nennt dies den 'größten Schlag gegen P2W seit KRTW-Launch'. Offiziell noch unbestätigt."]),
          section("global-vs-krtw", "Global vs. Korea und Taiwan", ["Die gemeldete Grenze gilt für die globale Version (Start September 2026). Korea und Taiwan, seit November 2025 in Betrieb, haben die gleiche Beschränkung nicht angekündigt.", "Globale Spieler, die Quna kaufen, könnten diese nicht direkt in Kinah umwandeln."]),
          section("p2w-impact", "Bedeutung für Free-to-Play-Spieler", ["Bestätigt würde die Grenze die Pay-to-Win-Obergrenze senken, wodurch Fortschritt stärker vom Gameplay abhängt.", "Die Monetarisierung umfasst weiterhin Gründerpapacke, ein Abonnement und den Quna-Shop."]),
          section("status-and-outlook", "Status: unbestätigt, offizielles Update abwarten", ["Zum 11. August 2026 gibt es keine offizielle Bestätigung. Die Behauptung stammt aus der Community und sollte vor Verlass darauf geprüft werden.", "Der globale Start im September 2026 könnte eine offizielle Monetarisierungsankündigung bringen."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 5, {
        eyebrow: "NOTICIAS DE MONETIZACIÓN", title: "Límite de intercambio Quna→Kinah en AION2 global: qué significa este cambio P2W",
        description: "NCSoft limitaría el intercambio de Quna a Kinah en la versión global de AION2, reduciendo el potencial pay-to-win frente a Corea y Taiwán.",
        intro: "Informes de la comunidad indican que NCSoft restringe el intercambio de moneda Quna→Kinah en la versión global (UE/NA) de AION2. Es un cambio de monetización significativo porque Corea y Taiwán no aplican la misma limitación.",
        sourceNote: "Basado en discusiones de la comunidad en Reddit r/Aion2 (agosto de 2026, fuente de terceros). No se ha publicado ningún aviso oficial de NC Corporation al 11 de agosto de 2026.",
        keywords: ["AION2 P2W", "AION2 Quna a Kinah", "AION2 monetización global", "AION2 free-to-play"],
        sections: [
          section("what-is-reported", "Lo que reporta la comunidad", ["Según un hilo de Reddit muy discutido, NCSoft limita el intercambio Quna→Kinah en la versión global. En Corea y Taiwán, los jugadores pueden convertir Quna en Kinah, descrito como un camino pay-to-win.", "El hilo lo llama 'el mayor golpe al P2W desde el lanzamiento KRTW'. No confirmado oficialmente."]),
          section("global-vs-krtw", "Diferencia entre global y Corea/Taiwán", ["El límite reportado se aplica a la versión global (lanzamiento en septiembre de 2026). Corea y Taiwán, en funcionamiento desde noviembre de 2025, no han anunciado la misma restricción.", "Los jugadores globales que compren Quna podrían no convertirla directamente en Kinah."]),
          section("p2w-impact", "Qué significa para los jugadores gratuitos", ["De confirmarse, el límite reduciría el techo pay-to-win, haciendo que el progreso dependa más del juego.", "La monetización sigue incluyendo los paquetes de fundador, una suscripción y la tienda Quna."]),
          section("status-and-outlook", "Estado: no confirmado, espera el aviso oficial", ["Al 11 de agosto de 2026 no hay confirmación oficial. La afirmación proviene de la comunidad y debe validarse antes de confiar en ella.", "El lanzamiento global de septiembre de 2026 podría traer un anuncio oficial de monetización."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 5, {
        eyebrow: "収益化ニュース", title: "AION2 グローバル版 Quna→Kinah 交換制限: P2W の変化が意味するもの",
        description: "NCSoft が AION2 グローバル版で Quna から Kinah への交換を制限し、韓国・台湾に比べて P2W 要素を大幅に抑えます。",
        intro: "コミュニティの報告によると、NCSoft が AION2 グローバル版（EU/NA）で Quna→Kinah 通貨交換を制限しています。韓国・台湾サービスには同じ制限が適用されないため、重要な収益化の変化です。",
        sourceNote: "Reddit r/Aion2 のコミュニティ議論（2026年8月、第三者ソース）に基づきます。2026年8月11日時点で公式の確認通知は公開されていません。",
        keywords: ["AION2 P2W", "AION2 Quna→Kinah", "AION2 グローバル収益化", "AION2 無課金"],
        sections: [
          section("what-is-reported", "コミュニティが報告する内容", ["広く議論された Reddit スレッドによると、NCSoft はグローバル版で Quna（現金通貨）を Kinah（ゲーム内ゴールド）に交換することを制限しています。韓国・台湾では Quna→Kinah が可能で、P2W 経路とされています。", "同じスレッドはこれを『KRTW リリース以来の P2W への最大の打撃』と評しています。公式確認はまだありません。"]),
          section("global-vs-krtw", "グローバルと韓国・台湾の違い", ["報告された制限は2026年9月リリース予定のグローバル版のみに適用され、北米、南米、欧州、日本を含みます。2025年11月から運営されている韓国・台湾には同じ制限の発表がありません。", "グローバル版で Quna を購入したプレイヤーは、直接 Kinah に変換できない可能性があります。"]),
          section("p2w-impact", "無課金プレイヤーへの影響", ["確認されれば、Quna→Kinah 制限はグローバル版の P2W 上限を下げ、進行が課金よりゲームプレイに依存するようになります。", "収益化には引き続きファウンダーズパック、サブスクリプション、Quna ショップが含まれます。"]),
          section("status-and-outlook", "ステータス: 未確認、公式発表を確認", ["2026年8月11日時点で公式の確認はありません。コミュニティの議論に基づく主張であり、信頼する前に公式ソースで検証してください。", "2026年9月のグローバル版リリースに合わせて公式の収益化発表が行われる可能性があります。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 5, {
        eyebrow: "NOTÍCIAS DE MONETIZAÇÃO", title: "Limite de troca Quna→Kinah no AION2 global: o que essa mudança P2W significa",
        description: "A NCSoft estaria limitando a troca de Quna por Kinah na versão global do AION2, reduzindo o potencial pay-to-win em relação à Coreia e Taiwan.",
        intro: "Relatos da comunidade indicam que a NCSoft restringe a troca de moeda Quna→Kinah na versão global (UE/AN) do AION2. É uma mudança significativa porque Coreia e Taiwan não aplicam o mesmo limite.",
        sourceNote: "Baseado em discussões da comunidade no Reddit r/Aion2 (agosto de 2026, fonte de terceiros). Nenhum aviso oficial da NC Corporation foi publicado até 11 de agosto de 2026.",
        keywords: ["AION2 P2W", "AION2 Quna para Kinah", "AION2 monetização global", "AION2 free-to-play"],
        sections: [
          section("what-is-reported", "O que a comunidade relata", ["Segundo um tópico muito discutido no Reddit, a NCSoft limita a troca Quna→Kinah na versão global. Na Coreia e Taiwan, os jogadores podem converter Quna em Kinah, descrito como um caminho pay-to-win.", "O mesmo tópico chama isso de 'o maior golpe ao P2W desde o lançamento KRTW'. Não confirmado oficialmente."]),
          section("global-vs-krtw", "Diferenca entre global e Coreia/Taiwan", ["O limite relatado se aplica à versão global (lançamento em setembro de 2026). Coreia e Taiwan, em operação desde novembro de 2025, não anunciaram a mesma restrição.", "Jogadores globais que comprarem Quna podem não convertê-la diretamente em Kinah."]),
          section("p2w-impact", "O que isso significa para jogadores gratuitos", ["Se confirmado, o limite reduziria o teto pay-to-win, tornando o progresso mais dependente do jogo.", "A monetização ainda inclui pacotes de fundador, uma assinatura e a loja Quna."]),
          section("status-and-outlook", "Status: não confirmado, aguarde o aviso oficial", ["Até 11 de agosto de 2026 não há confirmação oficial. A afirmação vem da comunidade e deve ser validada antes de confiar.", "O lançamento global em setembro de 2026 pode trazer um anúncio oficial de monetização."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 5, {
        eyebrow: "НОВОСТИ МОНЕТИЗАЦИИ", title: "Ограничение обмена Quna→Kinah в AION2 global: что значит это изменение P2W",
        description: "NCSoft ограничивает обмен Quna на Kinah в глобальной версии AION2, снижая потенциал pay-to-win по сравнению с Кореей и Тайванем.",
        intro: "Сообщения сообщества указывают, что NCSoft ограничивает обмен валюты Quna→Kinah в глобальной версии (ЕС/СА) AION2. Это значительное изменение монетизации, поскольку Корея и Тайвань не применяют такое же ограничение.",
        sourceNote: "Основано на обсуждениях сообщества на Reddit r/Aion2 (август 2026, сторонний источник). На 11 августа 2026 официального подтверждения NC Corporation нет.",
        keywords: ["AION2 P2W", "AION2 Quna в Kinah", "AION2 глобальная монетизация", "AION2 бесплатная игра"],
        sections: [
          section("what-is-reported", "Что сообщает сообщество", ["Согласно широко обсуждаемому треду Reddit, NCSoft ограничивает обмен Quna→Kinah в глобальной версии. В Корее и на Тайване игроки могут конвертировать Quna в Kinah, что описывается как путь pay-to-win.", "Тот же тред называет это «самым сильным ударом по P2W с запуска KRTW». Официально не подтверждено."]),
          section("global-vs-krtw", "Разница между глобальной версией и Кореей/Тайванем", ["Ограничение относится к глобальной версии (запуск в сентябре 2026). Корея и Тайвань, работающие с ноября 2025, не объявили такого же ограничения.", "Игроки глобальной версии, покупающие Quna, могут не конвертировать её напрямую в Kinah."]),
          section("p2w-impact", "Что это значит для бесплатных игроков", ["Если подтвердится, ограничение снизит потолок pay-to-win, делая прогресс более зависимым от игрового процесса.", "Монетизация по-прежнему включает наборы основателя, подписку и магазин Quna."]),
          section("status-and-outlook", "Статус: не подтверждено, ждите официальное уведомление", ["На 11 августа 2026 официального подтверждения нет. Утверждение исходит от сообщества и должно быть проверено.", "Глобальный запуск в сентябре 2026 может принести официальное объявление о монетизации."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
        eyebrow: "商業化新聞",
        title: "AION2 全球版 Quna→Kinah 兌換限制：氪金（P2W）變化意味著什麼",
        description: "NCSoft 正在限制 AION2 全球版的 Quna 兌換 Kinah，相比韓服/台服大幅削弱遊戲的付費即勝利潛力。",
        intro: "社群報告顯示，NCSoft 正在限制 AION2 全球版（EU/NA）的 Quna 兌換 Kinah 貨幣兌換。這是一個重要的商業化變化，因為韓服/台服並未施加相同限制。本文區分社群報告的變化與官方公告確認的內容。",
        sourceNote: "基於 Reddit r/Aion2 社群討論（2026 年 8 月，第三方來源）。截至 2026 年 8 月 11 日，NC Corporation 尚未發布確認此政策的官方公告。",
        keywords: ["AION2 氪金變化", "AION2 Quna 兌換 Kinah", "AION2 全球版商業化", "AION2 免費遊玩"],
        sections: [
          section("what-is-reported", "社群報告的內容：Quna→Kinah 限制", ["根據廣泛討論的 Reddit 貼文，NCSoft 正在限制全球版玩家將 Quna（現金貨幣）兌換成 Kinah（遊戲內金幣）的能力。在韓服/台服，玩家可以將 Quna 兌換 Kinah，社群成員將其描述為付費即勝利路徑。", "同一貼文稱此政策是'自 KRTW 上線以來對 P2W 的最大打擊'。由於該變化來自社群報告，尚未在官方公告中確認。"])
            ,
          section("global-vs-krtw", "全球版與韓服/台服的區別", ["報告中的限制僅適用於全球版，該版本計劃於 2026 年 9 月上線，覆蓋北美、南美、歐洲和日本。自 2025 年 11 月起營運的韓服/台服尚未宣布相同限制。", "這為全球版經濟帶來了顯著差異：全球版購買 Quna 的玩家可能無法直接兌換成 Kinah，從而減少直接花錢獲得遊戲內金幣優勢的能力。"]),
          section("p2w-impact", "對免費玩家的意義", ["如果確認，Quna→Kinah 限制將降低全球版的付費即勝利上限，使道具和金幣成長更依賴遊戲玩法而非消費。這通常被視為對免費玩家有利。", "AION2 的商業化仍包括 Founder's Pack、訂閱和 Quna 商店的裝扮。報告中的變化收窄了一條特定的付費路徑，但並未完全移除商業化。"]),
          section("status-and-outlook", "狀態：未確認，關注官方公告", ["截至 2026 年 8 月 11 日，尚無官方公告確認 Quna→Kinah 限制。該說法源於社群討論，在依賴前應透過官方來源驗證。", "AION2 全球版 2026 年 9 月上線可能帶來官方商業化、訂閱或經濟公告。可將官方全球版網站和本站商業化觀察清單加入書籤以獲取確認細節。"]),
        ],
      }),
    },
  },
  // ARTICLE 3: Founder's Pack guide
  {
    section: "guides",
    slug: "global-launch-founders-pack-guide",
    schemaType: "Article",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-11",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [chapter1Source, summerFestaSource],
    heroImage: launchHero,
    related: [
      { kind: "content", section: "news", slug: "global-launch-pve-content-what-we-know" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 6, {
        eyebrow: "GLOBAL LAUNCH GUIDE",
        title: "AION2 Founder's Pack guide: pricing, tiers, and Early Access for global launch",
        description: "A complete guide to AION2 Founder's Packs: three tiers ($24.99 to $99.99), 30-day subscription included, 5-day Early Access from September 30, and global availability.",
        intro: "AION2's global launch is approaching in September 2026, with Early Access starting September 30 through Founder's Packs. This guide covers the three pack tiers, what each includes, how Early Access works, and which platforms and regions are supported. All information is based on official NC Corporation announcements and the Steam store page as of August 11, 2026.",
        sourceNote: "Based on AION2 official announcements, the Steam store page, and NC Corporation press releases. Details rechecked August 11, 2026. Pricing and availability subject to regional variation.",
        keywords: ["AION2 Founder's Pack", "AION2 global launch price", "AION2 Early Access", "AION2 Steam",
          "AION2 founder pack tiers"],
        sections: [
          section("pack-tiers", "Founder's Pack tiers: Standard, Deluxe, and Collectors", ["AION2 offers three Founder's Pack tiers: Standard Edition at $24.99, Deluxe Edition at $49.99, and Collectors Edition at $99.99. Each tier includes the full game, 5 days of Early Access starting September 30, 2026, and a 30-day subscription time.", "The higher tiers add exclusive cosmetics, including costumes, weapon skins, and titles that have been confirmed as exclusive to Founder's Pack purchasers (no longer available to non-purchasers after launch). The cosmetics are account-bound and untradeable."]),
          section("subscription", "Subscription included: 30 days in every pack", ["Every Founder's Pack, regardless of tier, includes 30 days of subscription time. This subscription, known as Special Quai Membership in Korea/Taiwan, provides daily rewards, special shop access, and quality-of-life benefits.", "The subscription system in the global version may differ from the Korea/Taiwan version. The Korea/Taiwan service recently consolidated three membership tiers into a single Special Quai Membership with reduced pricing, which may serve as the global model."]),
          section("early-access", "Early Access: September 30, 5 days before full launch", ["Early Access begins September 30, 2026, and lasts 5 days. It is exclusive to Founder's Pack purchasers. During Early Access, players can play the game before the official free-to-play launch, gaining a head start on character progression.", "The Early Access period is tied to the Founder's Pack and cannot be purchased separately. After Early Access ends, the game becomes free-to-play for all players, and Founder's Pack cosmetics become exclusive to purchasers."]),
          section("platforms-regions", "Platforms and regions: Steam and PURPLE, four regions", ["AION2's global launch covers Steam and NC's own PURPLE platform. The supported regions are North America, South America, Europe, and Japan. The Steam store page confirms the September 2026 release window.", "Players in Korea and Taiwan access the game through seperate regional services that have been operating since November 2025. The global version is a seperate service with its own monetization and server infrastructure."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
        eyebrow: "全球版指南",
        title: "AION2 Founder's Pack 指南：价格、档位与全球版早期接入",
        description: "AION2 Founder's Pack 完整指南：三档价格（$24.99 至 $99.99）、每档含 30 天订阅、9 月 30 日起 5 天早期接入及全球区域覆盖。",
        intro: "AION2 全球版即将于 2026 年 9 月上线，早期接入将于 9 月 30 日通过 Founder's Pack 开启。本指南涵盖三档 Founder's Pack 的内容、早期接入的运作方式以及支持的平台和区域。所有信息基于 NC Corporation 官方公告及 Steam 商店页（截至 2026 年 8 月 11 日）。",
        sourceNote: "基于 AION2 官方公告、Steam 商店页及 NC Corporation 新闻稿。信息于 2026 年 8 月 11 日复核。价格和可用性可能因区域而异。",
        keywords: ["AION2 Founder's Pack", "AION2 全球版价格", "AION2 早期接入", "AION2 Steam", "AION2 创始人包"],
        sections: [
          section("pack-tiers", "Founder's Pack 档位：标准版、豪华版与收藏版", ["AION2 提供三档 Founder's Pack：标准版 $24.99、豪华版 $49.99、收藏版 $99.99。每档均包含完整游戏、2026 年 9 月 30 日起 5 天早期接入以及 30 天订阅时间。", "高档次版本增加独占外观，包括服装、武器外观和称号，已确认仅限 Founder's Pack 购买者获得（上线后非购买者无法获取）。外观为账号绑定，不可交易。"]),
          section("subscription", "内含订阅：每档均含 30 天", ["每档 Founder's Pack 均包含 30 天订阅时间。该订阅在韩服/台服称为 Special Quai Membership，提供每日奖励、特殊商店访问和便利性功能。", "全球版的订阅系统可能与韩服/台服不同。韩服/台服最近将三档会员合并为单一的 Special Quai Membership 并降价，可能作为全球版的参考。"]),
          section("early-access", "早期接入：9 月 30 日，比正式上线早 5 天", ["早期接入于 2026 年 9 月 30 日开始，持续 5 天，仅限 Founder's Pack 购买者。在早期接入期间，玩家可在免费上线前抢先体验游戏，获得角色成长先机。", "早期接入与 Founder's Pack 绑定，不可单独购买。早期接入结束后，游戏对所有玩家免费开放，Founder's Pack 外观成为购买者专属。"]),
          section("platforms-regions", "平台与区域：Steam 和 PURPLE，四个区域", ["AION2 全球版覆盖 Steam 和 NC 自有平台 PURPLE。支持的区域包括北美、南美、欧洲和日本。Steam 商店页确认 2026 年 9 月上线窗口。", "韩国和台湾玩家通过各自独立的区域服务访问游戏，该服务自 2025 年 11 月起运营。全球版是独立服务，拥有自己的商业化和服务器基础设施。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 6, {
        eyebrow: "글로벌 출시 가이드",
        title: "AION2 파운더스 팩 가이드: 가격, 티어 및 글로벌 출시 얼리 액세스",
        description: "AION2 파운더스 팩 완벽 가이드: 3개 티어($24.99~$99.99), 30일 구독 포함, 9월 30일부터 5일 얼리 액세스, 글로벌 지역 정보.",
        intro: "AION2 글로벌 출시가 2026년 9월 다가오고 있으며, 파운더스 팩을 통한 얼리 액세스가 9월 30일에 시작됩니다. 이 가이드는 세 가지 팩 티어, 각 티어의 구성, 얼리 액세스 작동 방식, 지원 플랫폼 및 지역을 설명합니다.",
        sourceNote: "AION2 공식 발표, Steam 상점 페이지 및 NC Corporation 보도 자료에 기반합니다. 2026년 8월 11일 재확인.",
        keywords: ["AION2 파운더스 팩", "AION2 글로벌 출시 가격", "AION2 얼리 액세스", "AION2 Steam"],
        sections: [
          section("pack-tiers", "파운더스 팩 티어: 스탠다드, 디럭스, 컬렉터스", ["AION2는 3개 파운더스 팩 티어를 제공합니다: 스탠다드 $24.99, 디럭스 $49.99, 컬렉터스 $99.99. 각 티어에는 정식 게임, 2026년 9월 30일부터 5일 얼리 액세스, 30일 구독이 포함됩니다.", "상위 티어는 전용 코스메틱을 추가하며, 파운더스 팩 구매자 전용으로 확인되었습니다."]),
          section("subscription", "구독 포함: 모든 팩에 30일", ["모든 파운더스 팩에는 30일 구독 시간이 포함됩니다. 한국/대만의 Special Quai Membership에 해당하는 이 구독은 매일 보상과 특별 상점 접근을 제공합니다.", "글로벌 버전의 구독 시스템은 한국/대만 버전과 다를 수 있습니다."]),
          section("early-access", "얼리 액세스: 9월 30일, 정식 출시보다 5일 전", ["얼리 액세스는 2026년 9월 30일에 시작되어 5일간 진행되며, 파운더스 팩 구매자 전용입니다.", "얼리 액세스 종료 후 게임은 모든 플레이어에게 무료로 전환되며, 파운더스 팩 코스메틱은 구매자 전용이 됩니다."]),
          section("platforms-regions", "플랫폼 및 지역: Steam과 PURPLE, 4개 지역", ["AION2 글로벌 출시는 Steam과 NC의 자체 PURPLE 플랫폼을 지원합니다. 북미, 남미, 유럽, 일본이 포함됩니다.", "한국과 대만은 2025년 11월부터 운영된 별도 지역 서비스를 통해 접속합니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 6, {
        eyebrow: "GUIDE LANCEMENT MONDIAL", title: "Guide des packs Fondateur AION2 : prix, niveaux et Early Access",
        description: "Guide complet des packs Fondateur AION2 : trois niveaux (24,99 $ à 99,99 $), abonnement 30 jours inclus, Early Access de 5 jours dès le 30 septembre.",
        intro: "Le lancement mondial d'AION2 approche en septembre 2026, avec l'Early Access à partir du 30 septembre via les packs Fondateur. Ce guide couvre les trois niveaux, leur contenu et les plateformes supportées.",
        sourceNote: "Basé sur les annonces officielles d'AION2, la page Steam et les communiqués NC Corporation. Vérifié le 11 août 2026.",
        keywords: ["pack Fondateur AION2", "prix lancement global AION2", "Early Access AION2", "AION2 Steam"],
        sections: [
          section("pack-tiers", "Niveaux des packs : Standard, Deluxe et Collector", ["AION2 propose trois niveaux : Standard à 24,99 $, Deluxe à 49,99 $ et Collector à 99,99 $. Chaque niveau inclut le jeu complet, 5 jours d'Early Access dès le 30 septembre 2026 et 30 jours d'abonnement.", "Les niveaux supérieurs ajoutent des cosmétiques exclusifs, confirmés réservés aux acheteurs des packs Fondateur."]),
          section("subscription", "Abonnement inclus : 30 jours dans chaque pack", ["Chaque pack Fondateur inclut 30 jours d'abonnement. Cet abonnement, appelé Special Quai Membership en Corée/Taïwan, offre des récompenses quotidiennes et un accès à une boutique spéciale.", "Le système d'abonnement de la version globale peut différer de la version coréenne/taiwanaise."]),
          section("early-access", "Early Access : 30 septembre, 5 jours avant le lancement", ["L'Early Access commence le 30 septembre 2026 et dure 5 jours, exclusivement pour les acheteurs des packs Fondateur.", "Après l'Early Access, le jeu devient gratuit pour tous les joueurs et les cosmétiques des packs Fondateur deviennent exclusifs aux acheteurs."]),
          section("platforms-regions", "Plateformes et régions : Steam et PURPLE, quatre régions", ["Le lancement mondial couvre Steam et la plateforme PURPLE de NC. Les régions supportées sont l'Amérique du Nord, l'Amérique du Sud, l'Europe et le Japon.", "La Corée et Taïwan accèdent au jeu via des services régionaux séparés."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 6, {
        eyebrow: "GLOBALER START-LEITFADEN", title: "AION2 Gründerpaket-Leitfaden: Preise, Stufen und Early Access",
        description: "Vollständiger Leitfaden zu AION2-Gründerpaketen: drei Stufen (24,99 $ bis 99,99 $), 30-tägiges Abonnement, 5-tägiger Early Access ab 30. September.",
        intro: "Der globale Start von AION2 nähert sich im September 2026, mit Early Access ab dem 30. September über Gründerpakete. Dieser Leitfaden behandelt die drei Paketstufen und die unterstützten Plattformen.",
        sourceNote: "Basierend auf offiziellen AION2-Ankündigungen, der Steam-Seite und NC-Pressemitteilungen. Geprüft am 11. August 2026.",
        keywords: ["AION2 Gründerpaket", "AION2 globaler Startpreis", "AION2 Early Access", "AION2 Steam"],
        sections: [
          section("pack-tiers", "Gründerpaket-Stufen: Standard, Deluxe und Collector", ["AION2 bietet drei Stufen: Standard für 24,99 $, Deluxe für 49,99 $ und Collector für 99,99 $. Jede Stufe enthält das vollständige Spiel, 5 Tage Early Access ab 30. September 2026 und 30 Tage Abonnement.", "Die höheren Stufen fügen exklusive Kosmetika hinzu, die nur für Gründerpaket-Käufer bestätigt wurden."]),
          section("subscription", "Abonnement inbegriffen: 30 Tage in jedem Paket", ["Jedes Gründerpaket enthält 30 Tage Abonnementzeit. Dieses Abonnement bietet tägliche Belohnungen und Zugang zu einem speziellen Shop.", "Das Abonnement-System der globalen Version kann von der koreanischen/taiwanesischen Version abweichen."]),
          section("early-access", "Early Access: 30. September, 5 Tage vor dem vollständigen Start", ["Der Early Access beginnt am 30. September 2026 und dauert 5 Tage, exklusiv für Gründerpaket-Käufer.", "Nach dem Early Access wird das Spiel für alle Spieler kostenlos spielbar."]),
          section("platforms-regions", "Plattformen und Regionen: Steam und PURPLE, vier Regionen", ["Der globale Start umfasst Steam und NCs eigene PURPLE-Plattform. Unterstützte Regionen sind Nordamerika, Südamerika, Europa und Japan.", "Korea und Taiwan nutzen separate regionale Dienste seit November 2025."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 6, {
        eyebrow: "GUÍA DE LANZAMIENTO GLOBAL", title: "Guía de paquetes de fundador de AION2: precios, niveles y Early Access",
        description: "Guía completa de los paquetes de fundador de AION2: tres niveles ($24.99 a $99.99), suscripción de 30 días incluida, Early Access de 5 días desde el 30 de septiembre.",
        intro: "El lanzamiento global de AION2 se acerca en septiembre de 2026, con Early Access a partir del 30 de septiembre a través de paquetes de fundador. Esta guía cubre los tres niveles de paquetes.",
        sourceNote: "Basado en anuncios oficiales de AION2, la página de Steam y comunicados de NC Corporation. Verificado el 11 de agosto de 2026.",
        keywords: ["paquete de fundador AION2", "precio lanzamiento global AION2", "Early Access AION2", "AION2 Steam"],
        sections: [
          section("pack-tiers", "Niveles de paquetes: Standard, Deluxe y Collector", ["AION2 ofrece tres niveles: Standard a $24.99, Deluxe a $49.99 y Collector a $99.99. Cada nivel incluye el juego completo, 5 días de Early Access desde el 30 de septiembre de 2026 y 30 días de suscripción.", "Los niveles superiores añaden cosméticos exclusivos, confirmados como exclusivos para compradores de paquetes de fundador."]),
          section("subscription", "Suscripción incluida: 30 días en cada paquete", ["Cada paquete de fundador incluye 30 días de suscripción. Esta suscripción ofrece recompensas diarias y acceso a una tienda especial.", "El sistema de suscripción de la versión global puede diferir de la versión de Corea/Taiwán."]),
          section("early-access", "Early Access: 30 de septiembre, 5 días antes del lanzamiento", ["El Early Access comienza el 30 de septiembre de 2026 y dura 5 días, exclusivo para compradores de paquetes de fundador.", "Después del Early Access, el juego se vuelve gratuito para todos los jugadores."]),
          section("platforms-regions", "Plataformas y regiones: Steam y PURPLE, cuatro regiones", ["El lanzamiento global cubre Steam y la plataforma PURPLE de NC. Las regiones incluyen América del Norte, América del Sur, Europa y Japón.", "Corea y Taiwán acceden al juego a través de servicios regionales separados."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 6, {
        eyebrow: "グローバル版ガイド", title: "AION2 ファウンダーズパックガイド: 価格、ティア、アーリーアクセス",
        description: "AION2 ファウンダーズパック完全ガイド: 3ティア（$24.99〜$99.99）、30日サブスクリプション付き、9月30日から5日間のアーリーアクセス。",
        intro: "AION2 グローバル版のリリースが2026年9月に迫り、ファウンダーズパックによるアーリーアクセスが9月30日に開始されます。",
        sourceNote: "AION2 公式発表、Steam ストアページ、NC Corporation プレスリリースに基づきます。2026年8月11日確認。",
        keywords: ["AION2 ファウンダーズパック", "AION2 グローバル版価格", "AION2 アーリーアクセス", "AION2 Steam"],
        sections: [
          section("pack-tiers", "ファウンダーズパックのティア", ["AION2 は3つのファウンダーズパックを提供: スタンダード $24.99、デラックス $49.99、コレクターズ $99.99。各ティアに完全版ゲーム、2026年9月30日からの5日間アーリーアクセス、30日サブスクリプションが含まれます。", "上位ティアは限定コスメを追加します。"]),
          section("subscription", "サブスクリプション付き: 全パックに30日", ["すべてのファウンダーズパックに30日間のサブスクリプションが含まれます。毎日報酬や特別ショップへのアクセスを提供します。", "グローバル版のサブスクリプションシステムは韓国・台湾版と異なる場合があります。"]),
          section("early-access", "アーリーアクセス: 9月30日から5日間", ["アーリーアクセスは2026年9月30日に開始され5日間続きます。ファウンダーズパック購入者のみが参加できます。", "アーリーアクセス終了後、ゲームはすべてのプレイヤーに無料で開放されます。"]),
          section("platforms-regions", "プラットフォームと地域", ["グローバル版は Steam と NC の PURPLE プラットフォームをサポートします。北米、南米、欧州、日本が対象地域です。", "韓国と台湾は2025年11月から運用されている別の地域サービスを通じてアクセスします。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 6, {
        eyebrow: "GUIA DE LANÇAMENTO GLOBAL", title: "Guia do pacote de fundador do AION2: preços, níveis e Early Access",
        description: "Guia completo dos pacotes de fundador do AION2: três níveis ($24.99 a $99.99), assinatura de 30 dias incluída, Early Access de 5 dias a partir de 30 de setembro.",
        intro: "O lançamento global do AION2 se aproxima em setembro de 2026, com Early Access a partir de 30 de setembro através dos pacotes de fundador.",
        sourceNote: "Baseado em anúncios oficiais do AION2, página da Steam e comunicados da NC Corporation. Verificado em 11 de agosto de 2026.",
        keywords: ["pacote de fundador AION2", "preço lançamento global AION2", "Early Access AION2", "AION2 Steam"],
        sections: [
          section("pack-tiers", "Níveis de pacotes: Standard, Deluxe e Collector", ["AION2 oferece três níveis: Standard a $24.99, Deluxe a $49.99 e Collector a $99.99. Cada nível inclui o jogo completo, 5 dias de Early Access e 30 dias de assinatura.", "Os níveis superiores adicionam cosméticos exclusivos."]),
          section("subscription", "Assinatura incluída: 30 dias em cada pacote", ["Cada pacote de fundador inclui 30 dias de assinatura. Esta assinatura oferece recompensas diárias e acesso a uma loja especial.", "O sistema de assinatura da versão global pode diferir da versão da Coreia/Taiwan."]),
          section("early-access", "Early Access: 30 de setembro, 5 dias antes do lançamento", ["O Early Access começa em 30 de setembro de 2026 e dura 5 dias, exclusivo para compradores de pacotes de fundador.", "Após o Early Access, o jogo se torna gratuito para todos os jogadores."]),
          section("platforms-regions", "Plataformas e regiões: Steam e PURPLE, quatro regiões", ["O lançamento global cobre a Steam e a plataforma PURPLE da NC. As regiões incluem América do Norte, América do Sul, Europa e Japão.", "Coreia e Taiwan acessam o jogo através de serviços regionais separados."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 6, {
        eyebrow: "РУКОВОДСТВО ПО ГЛОБАЛЬНОМУ ЗАПУСКУ", title: "Руководство по набору основателя AION2: цены, уровни и Early Access",
        description: "Полное руководство по наборам основателя AION2: три уровня ($24.99–$99.99), 30-дневная подписка, 5-дневный Early Access с 30 сентября.",
        intro: "Глобальный запуск AION2 приближается в сентябре 2026 года, с Early Access с 30 сентября через наборы основателя.",
        sourceNote: "Основано на официальных объявлениях AION2, странице Steam и пресс-релизах NC Corporation. Проверено 11 августа 2026.",
        keywords: ["набор основателя AION2", "цена глобального запуска AION2", "Early Access AION2", "AION2 Steam"],
        sections: [
          section("pack-tiers", "Уровни наборов: Standard, Deluxe и Collector", ["AION2 предлагает три уровня: Standard за $24.99, Deluxe за $49.99 и Collector за $99.99. Каждый уровень включает полную игру, 5 дней Early Access с 30 сентября 2026 и 30 дней подписки.", "Более высокие уровни добавляют эксклюзивную косметику."]),
          section("subscription", "Подписка включена: 30 дней в каждом наборе", ["Каждый набор основателя включает 30 дней подписки. Эта подписка предлагает ежедневные награды и доступ к специальному магазину.", "Система подписки глобальной версии может отличаться от корейской/тайваньской."]),
          section("early-access", "Early Access: 30 сентября, за 5 дней до запуска", ["Early Access начинается 30 сентября 2026 года и длится 5 дней, эксклюзивно для покупателей наборов основателя.", "После Early Access игра становится бесплатной для всех игроков."]),
          section("platforms-regions", "Платформы и регионы: Steam и PURPLE, четыре региона", ["Глобальный запуск охватывает Steam и собственную платформу NC PURPLE. Регионы включают Северную Америку, Южную Америку, Европу и Японию.", "Корея и Тайвань имеют отдельные региональные сервисы с ноября 2025."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
        eyebrow: "全球版指南",
        title: "AION2 Founder's Pack 指南：價格、檔位與全球版早期接入",
        description: "AION2 Founder's Pack 完整指南：三檔價格（$24.99 至 $99.99）、每檔含 30 天訂閱、9 月 30 日起 5 天早期接入及全球區域覆蓋。",
        intro: "AION2 全球版即將於 2026 年 9 月上線，早期接入將於 9 月 30 日透過 Founder's Pack 開啟。本指南涵蓋三檔 Founder's Pack 的內容、早期接入的運作方式以及支援的平台和區域。",
        sourceNote: "基於 AION2 官方公告、Steam 商店頁及 NC Corporation 新聞稿。資訊於 2026 年 8 月 11 日複核。",
        keywords: ["AION2 Founder's Pack", "AION2 全球版價格", "AION2 早期接入", "AION2 Steam"],
        sections: [
          section("pack-tiers", "Founder's Pack 檔位：標準版、豪華版與收藏版", ["AION2 提供三檔 Founder's Pack：標準版 $24.99、豪華版 $49.99、收藏版 $99.99。每檔均包含完整遊戲、2026 年 9 月 30 日起 5 天早期接入以及 30 天訂閱時間。", "高檔次版本增加獨佔外觀，包括服裝、武器外觀和稱號，已確認僅限 Founder's Pack 購買者獲得。"]),
          section("subscription", "內含訂閱：每檔均含 30 天", ["每檔 Founder's Pack 均包含 30 天訂閱時間。該訂閱在韓服/台服稱為 Special Quai Membership，提供每日獎勵、特殊商店訪問和便利性功能。", "全球版的訂閱系統可能與韓服/台服不同。"]),
          section("early-access", "早期接入：9 月 30 日，比正式上線早 5 天", ["早期接入於 2026 年 9 月 30 日開始，持續 5 天，僅限 Founder's Pack 購買者。", "早期接入結束後，遊戲對所有玩家免費開放，Founder's Pack 外觀成為購買者專屬。"]),
          section("platforms-regions", "平台與區域：Steam 和 PURPLE，四個區域", ["AION2 全球版覆蓋 Steam 和 NC 自有平台 PURPLE。支援的區域包括北美、南美、歐洲和日本。", "韓國和台灣玩家透過各自獨立的區域服務訪問遊戲，該服務自 2025 年 11 月起營運。"]),
        ],
      }),
    },
  },
  // ARTICLE 4: Chapter 1 content guide
  {
    section: "guides",
    slug: "chapter-1-content-guide-global",
    schemaType: "Article",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-11",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [chapter1Source, summerFestaSource],
    heroImage: chapter1Hero,
    related: [
      { kind: "content", section: "guides", slug: "global-pre-registration" },
      { kind: "content", section: "guides", slug: "global-launch-founders-pack-guide" },
      { kind: "content", section: "news", slug: "global-launch-pve-content-what-we-know" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "CONTENT PREVIEW",
        title: "AION2 Chapter 1: Lands of Sand and Snow — what global players need to know",
        description: "Everything global players should know about AION2 Chapter 1: Brawler class, new regions Eltnen and Morheim, dungeons, PvP, and the membership overhaul.",
        intro: "AION2 Chapter 1, titled 'Lands of Sand and Snow,' launched on July 1, 2026 for Korea and Taiwan (announced July 6). This is the first major content update since the game's launch in November 2025. For global players preparing for the September 2026 launch, this guide covers what Chapter 1 introduced and what may arrive in the global version over time.",
        sourceNote: "Based on NC Corporation official announcements (July 6, 2026 and June 17, 2026). Korea/Taiwan service details do not guarantee identical global launch content. Timelines and availability may differ.",
        keywords: ["AION2 Chapter 1", "AION2 Lands of Sand and Snow", "AION2 Brawler", "AION2 Eltnen Morheim"],
        sections: [
          section("brawler", "Brawler class: the new front-line fighter", ["Chapter 1 introduces the Brawler, a new class that uses Gauntlets as its weapon and specializes in front-line combo combat. The Brawler joins the eight base classes (Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, Chanter), bringing the total to nine playable classes in Korea and Taiwan.", "The Brawler's combat style focuses on sustained close-range pressure with a Rage/Rampage resource system. The class was added as part of the July 1 update and includes a free character slot for existing players to try the new class without replacing an existing character."]),
          section("new-regions", "New regions: Eltnen and Morheim", ["Two new regions were added: Eltnen for the Elyos faction and Morheim for the Asmodians. Each region includes 10 new Sealed Dungeons and three new Strongholds, expanding the open-world PvE and PvP content significantly.", "The level cap was raised to 50, with Stigma skills unlocked at level 25. The new regions also feature Expedition and Transcendence difficulty dungeons for endgame players."]),
          section("pvp-content", "New PvP content: Chaotic Reshanta and Battlefield", ["Chapter 1 introduced Chaotic Upper Reshanta, a PvP zone with combat power normalization and no boss or artifact objectives, focusing on pure player-versus-player combat. Battlefield: Siege is a new three-zone capture-and-score mode.", "The Abyss Rift Zone, a large-scale PvP mode with rewards based on performance, was also added. These additions expand the PvP options significantly for players who prefer competitive gameplay."]),
          section("membership", "Membership overhaul: single tier, reduced price", ["The previous three-tier membership system was consolidated into a single 'Special Quai Membership' with improved benefits at a reduced price. This change was announced alongside the fromis_9 collaboration and the Chapter 1 update.", "For new players, a dedicated growth support system (Sprout Badge) and Daeva Express (instant completion of dungeons and progression) were introduced. These systems help new players catch up to the existing player base more quickly."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "内容前瞻",
        title: "AION2 Chapter 1：沙霜之地——全球版玩家须知",
        description: "全球版玩家应了解的 AION2 Chapter 1 内容：Brawler 拳星职业、新区域 Eltnen/Morheim、副本、PvP 及会员体系改革。",
        intro: "AION2 Chapter 1「沙霜之地」于 2026 年 7 月 1 日在韩服/台服上线（7 月 6 日官方宣布）。这是自 2025 年 11 月游戏上线以来的首次重大内容更新。本指南为准备 2026 年 9 月全球版的玩家介绍 Chapter 1 的内容。",
        sourceNote: "基于 NC Corporation 官方公告（2026 年 7 月 6 日和 6 月 17 日）。韩服/台服细节不保证全球版完全相同。",
        keywords: ["AION2 Chapter 1", "AION2 沙霜之地", "AION2 拳星", "AION2 Eltnen Morheim"],
        sections: [
          section("brawler", "Brawler 拳星：全新的前线战斗职业", ["Chapter 1 新增 Brawler 拳星职业，使用 Gauntlets 武器，专精前线连击战斗。Brawler 加入 8 个基础职业（Gladiator、Templar、Assassin、Ranger、Sorcerer、Spiritmaster、Cleric、Chanter），使韩服/台服可玩职业总数达到 9 个。", "Brawler 的战斗风格以持续近距离压制为主，拥有 Rage/Rampage 资源系统。该职业随 7 月 1 日更新加入，并包含一个免费角色栏位。"]),
          section("new-regions", "新区域：Eltnen 和 Morheim", ["新增两个区域：Elyos 阵营的 Eltnen 和 Asmodian 阵营的 Morheim。每个区域包含 10 个新的封印副本和 3 个新的要塞，大幅扩展了开放世界 PvE 和 PvP 内容。", "等级上限提升至 50，Stigma 技能在 25 级解锁。新区域还包含 Expedition 和 Transcendence 难度的副本供终局玩家挑战。"]),
          section("pvp-content", "新 PvP 内容：混沌 Reshanta 和战场", ["Chapter 1 引入了混沌上 Reshanta，一个战力标准化的 PvP 区域，专注于纯玩家对战。Battlefield: Siege 是新的三区域占领计分模式。", "深渊裂隙区域（大規模 PvP 模式，按表现奖励）也已加入。这些新增内容显著扩展了偏好竞争性游戏的玩家的 PvP 选择。"]),
          section("membership", "会员体系改革：单档位降价", ["原有的三档会员体系被整合为单一的 Special Quai Membership，以更低价格提供更好的福利。此变更与 fromis_9 合作及 Chapter 1 更新同步宣布。", "针对新玩家，引入了专属成长支持系统（Sprout Badge）和 Daeva Express（快速完成副本和进度）。这些系统帮助新玩家更快赶上现有玩家群体。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "콘텐츠 미리보기",
        title: "AION2 챕터 1: 모래와 서리의 땅 — 글로벌 플레이어가 알아야 할 것",
        description: "글로벌 플레이어가 알아야 할 AION2 챕터 1 정보: 브롤러 클래스, 엘트넨/모르헤임 신규 지역, 던전, PvP 및 멤버십 개편.",
        intro: "AION2 챕터 1 '모래와 서리의 땅'이 2026년 7월 1일 한국/대만에 출시됐습니다. 글로벌 플레이어를 위한 챕터 1 콘텐츠 가이드입니다.",
        sourceNote: "NC Corporation 공식 발표(2026년 7월 6일 및 6월 17일)에 기반합니다. 한국/대만 서비스 세부 사항은 글로벌 출시 콘텐츠와 동일하지 않을 수 있습니다.",
        keywords: ["AION2 챕터 1", "AION2 모래와 서리의 땅", "AION2 브롤러", "AION2 엘트넨 모르헤임"],
        sections: [
          section("brawler", "브롤러 클래스: 새로운 전선 전투 직업", ["챕터 1에서 브롤러가 추가됐습니다. 건틀릿을 사용하며 전선 콤보 전투에 특화된 신규 클래스입니다.", "브롤러의 전투 스타일은 지속적인 근접 압박에 초점을 맞추며 Rage/Rampage 리소스 시스템을 사용합니다."]),
          section("new-regions", "신규 지역: 엘트넨과 모르헤임", ["엘리오스 진영의 엘트넨과 아스모디안 진영의 모르헤임이 추가됐습니다. 각 지역에는 10개의 새로운 봉인 던전과 3개의 새로운 강력한 거점이 포함됩니다.", "레벨 상한이 50으로 확장됐습니다."]),
          section("pvp-content", "신규 PvP 콘텐츠", ["혼란 상부 레샨타와 전장: 공성전이 추가됐습니다. 어비스 균열 지역도 함께 도입됐습니다.", "이러한 추가로 PvP 옵션이 크게 확장됐습니다."]),
          section("membership", "멤버십 개편: 단일 티어, 가격 인하", ["기존 3단계 멤버십 시스템이 단일 'Special Quai Membership'으로 통합되고 가격이 인하됐습니다.", "신규 플레이어를 위한 전용 성장 지원 시스템(Sprout Badge)과 Daeva Express도 도입됐습니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "APERÇU DU CONTENU", title: "AION2 Chapter 1 : ce que les joueurs mondiaux doivent savoir",
        description: "Tout ce que les joueurs mondiaux doivent savoir sur AION2 Chapter 1 : classe Brawler, nouvelles régions, donjons, PvP et refonte de l'abonnement.",
        intro: "AION2 Chapter 1, intitulé 'Lands of Sand and Snow', est sorti le 1er juillet 2026 pour la Corée et Taïwan. Ce guide couvre le contenu introduit par cette mise à jour.",
        sourceNote: "Basé sur les annonces officielles de NC Corporation (6 juillet 2026 et 17 juin 2026).",
        keywords: ["AION2 Chapter 1", "AION2 Brawler", "AION2 Eltnen Morheim", "AION2 Lands of Sand and Snow"],
        sections: [
          section("brawler", "Classe Brawler : le nouveau combattant de première ligne", ["Le Chapter 1 introduit le Brawler, une nouvelle classe utilisant des Gantelets et spécialisée dans le combat de première ligne.", "Le style de combat du Brawler se concentre sur la pression continue à courte portée avec un système de ressources Rage/Rampage."]),
          section("new-regions", "Nouvelles régions : Eltnen et Morheim", ["Deux nouvelles régions ont été ajoutées : Eltnen pour la faction Elyos et Morheim pour les Asmodiens. Chaque région comprend 10 nouveaux donjons scellés et 3 nouveaux bastions.", "Le niveau maximum a été augmenté à 50."]),
          section("pvp-content", "Nouveau contenu PvP", ["La Reshanta supérieure chaotique et le Champ de bataille : Siège ont été introduits, ainsi que la Zone de faille des Abysses.", "Ces ajouts élargissent considérablement les options PvP."]),
          section("membership", "Refonte de l'abonnement : un seul niveau, prix réduit", ["Le système d'abonnement à trois niveaux a été consolidé en un seul 'Special Quai Membership' à prix réduit.", "Un système de soutien à la progression (Sprout Badge) et Daeva Express ont été introduits pour les nouveaux joueurs."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "INHALTSVORSCHAU", title: "AION2 Chapter 1: Was globale Spieler wissen müssen",
        description: "Alles, was globale Spieler über AION2 Chapter 1 wissen müssen: Brawler-Klasse, neue Regionen, Dungeons, PvP und die Mitgliedschaftsreform.",
        intro: "AION2 Chapter 1 'Lands of Sand and Snow' wurde am 1. Juli 2026 für Korea und Taiwan veröffentlicht. Dieser Leitfaden behandelt die neuen Inhalte.",
        sourceNote: "Basierend auf offiziellen NC-Ankündigungen (6. Juli 2026 und 17. Juni 2026).",
        keywords: ["AION2 Chapter 1", "AION2 Brawler", "AION2 Eltnen Morheim", "AION2 Lands of Sand and Snow"],
        sections: [
          section("brawler", "Brawler-Klasse: Der neue Frontkämpfer", ["Chapter 1 führt den Brawler ein, eine neue Klasse, die Gauntlets verwendet und auf Frontkampf spezialisiert ist.", "Der Brawler konzentriert sich auf kontinuierlichen Nahkampfdruck mit einem Rage/Rampage-Ressourcensystem."]),
          section("new-regions", "Neue Regionen: Eltnen und Morheim", ["Zwei neue Regionen wurden hinzugefügt: Eltnen für die Elyos und Morheim für die Asmodier. Jede Region enthält 10 neue versiegelte Dungeons und 3 neue Festungen.", "Das Level-Cap wurde auf 50 erhöht."]),
          section("pvp-content", "Neue PvP-Inhalte", ["Chaotisches Ober-Reshanta und Schlachtfeld: Belagerung wurden eingeführt, zusammen mit der Abgrund-Rift-Zone.", "Diese Ergänzungen erweitern die PvP-Optionen erheblich."]),
          section("membership", "Mitgliedschaftsreform: Einzelstufe, reduzierter Preis", ["Das bisherige Drei-Stufen-Mitgliedschaftssystem wurde zu einer einzigen 'Special Quai Membership' mit reduziertem Preis zusammengefasst.", "Ein Sprout Badge-System und Daeva Express wurden für neue Spieler eingeführt."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "AVANCE DE CONTENIDO", title: "AION2 Chapter 1: lo que los jugadores globales deben saber",
        description: "Todo lo que los jugadores globales deben saber sobre AION2 Chapter 1: clase Brawler, nuevas regiones, mazmorras, PvP y reforma de membresía.",
        intro: "AION2 Chapter 1 'Lands of Sand and Snow' se lanzó el 1 de julio de 2026 para Corea y Taiwán. Esta guía cubre el contenido introducido.",
        sourceNote: "Basado en anuncios oficiales de NC Corporation (6 de julio de 2026 y 17 de junio de 2026).",
        keywords: ["AION2 Chapter 1", "AION2 Brawler", "AION2 Eltnen Morheim"],
        sections: [
          section("brawler", "Clase Brawler: el nuevo luchador de primera línea", ["Chapter 1 introduce al Brawler, una nueva clase que usa Guanteletes y se especializa en combate de primera línea.", "El Brawler se enfoca en presión cuerpo a cuerpo sostenida con un sistema de recursos Rage/Rampage."]),
          section("new-regions", "Nuevas regiones: Eltnen y Morheim", ["Se agregaron Eltnen para los Elyos y Morheim para los Asmodianos. Cada región incluye 10 mazmorras selladas y 3 bastiones.", "El límite de nivel se elevó a 50."]),
          section("pvp-content", "Nuevo contenido PvP", ["Se introdujeron Reshanta Superior Caótica y Campo de Batalla: Asedio, junto con la Zona de la Grieta del Abismo."]),
          section("membership", "Reforma de membresía: nivel único, precio reducido", ["El sistema de tres niveles se consolidó en una sola 'Special Quai Membership' a precio reducido.", "Se introdujeron el sistema Sprout Badge y Daeva Express para nuevos jugadores."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "コンテンツプレビュー", title: "AION2 Chapter 1: グローバルプレイヤーが知っておくべきこと",
        description: "AION2 Chapter 1 についてグローバルプレイヤーが知っておくべきすべて: Brawler クラス、新地域、ダンジョン、PvP、メンバーシップ改革。",
        intro: "AION2 Chapter 1「砂と雪の地」は2026年7月1日に韓国・台湾でリリースされました。グローバルプレイヤー向けのガイドです。",
        sourceNote: "NC Corporation 公式発表（2026年7月6日および6月17日）に基づきます。",
        keywords: ["AION2 Chapter 1", "AION2 Brawler", "AION2 エルトネン モルヘイム"],
        sections: [
          section("brawler", "Brawler クラス: 新たな前線ファイター", ["Chapter 1 で Brawler が追加されました。Gauntlets を使用し、前線でのコンバットに特化した新クラスです。", "Brawler は Rage/Rampage リソースシステムを備えた継続的な近接プレッシャーに焦点を当てています。"]),
          section("new-regions", "新地域: エルトネンとモルヘイム", ["エリオス陣営のエルトネンとアスモディアン陣営のモルヘイムが追加されました。各エリアには10の封印ダンジョンと3の要塞が含まれます。", "レベルキャップが50に引き上げられました。"]),
          section("pvp-content", "新PvPコンテンツ", ["カオティック上部レシャンタとバトルフィールド: シージが導入されました。アビスリフトゾーンも追加されました。"]),
          section("membership", "メンバーシップ改革: 単一ティア、価格引き下げ", ["3段階のメンバーシップシステムが単一の「Special Quai Membership」に統合され、価格が引き下げられました。", "新規プレイヤー向けに Sprout Badge システムと Daeva Express が導入されました。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "VISÃO GERAL DO CONTEÚDO", title: "AION2 Chapter 1: o que os jogadores globais precisam saber",
        description: "Tudo que os jogadores globais precisam saber sobre o AION2 Chapter 1: classe Brawler, novas regiões, masmorras, PvP e reforma da assinatura.",
        intro: "AION2 Chapter 1 'Lands of Sand and Snow' foi lançado em 1º de julho de 2026 para Coreia e Taiwan. Este guia cobre o novo conteúdo.",
        sourceNote: "Baseado em anúncios oficiais da NC Corporation (6 de julho de 2026 e 17 de junho de 2026).",
        keywords: ["AION2 Chapter 1", "AION2 Brawler", "AION2 Eltnen Morheim"],
        sections: [
          section("brawler", "Classe Brawler: o novo lutador de linha de frente", ["O Chapter 1 introduz o Brawler, uma nova classe que usa Manoplas e se especializa em combate de linha de frente.", "O Brawler foca em pressão corpo a corpo sustentada com sistema de recursos Rage/Rampage."]),
          section("new-regions", "Novas regiões: Eltnen e Morheim", ["Eltnen para os Elyos e Morheim para os Asmodianos foram adicionados. Cada região inclui 10 masmorras seladas e 3 fortalezas.", "O limite de nível foi elevado para 50."]),
          section("pvp-content", "Novo conteúdo PvP", ["Reshanta Superior Caótica e Campo de Batalha: Cerco foram introduzidos, junto com a Zona da Fenda do Abismo."]),
          section("membership", "Reforma da assinatura: nível único, preço reduzido", ["O sistema de três níveis foi consolidado em um único 'Special Quai Membership' com preço reduzido.", "Sistema Sprout Badge e Daeva Express foram introduzidos para novos jogadores."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "ПРЕДПРОСМОТР КОНТЕНТА", title: "AION2 Chapter 1: что нужно знать глобальным игрокам",
        description: "Всё, что глобальные игроки должны знать о AION2 Chapter 1: класс Brawler, новые регионы, подземелья, PvP и реформа подписки.",
        intro: "AION2 Chapter 1 «Lands of Sand and Snow» вышел 1 июля 2026 года для Кореи и Тайваня. Это руководство охватывает новый контент.",
        sourceNote: "Основано на официальных объявлениях NC Corporation (6 июля 2026 и 17 июня 2026).",
        keywords: ["AION2 Chapter 1", "AION2 Brawler", "AION2 Эльтнен Морхейм"],
        sections: [
          section("brawler", "Класс Brawler: новый боец передовой", ["Chapter 1 представляет Brawler, новый класс, использующий кастеты и специализирующийся на ближнем бою.", "Brawler фокусируется на непрерывном давлении в ближнем бою с системой ресурсов Rage/Rampage."]),
          section("new-regions", "Новые регионы: Эльтнен и Морхейм", ["Добавлены Эльтнен для Элиос и Морхейм для Асмодиан. Каждый регион включает 10 запечатанных подземелий и 3 оплота.", "Лимит уровня повышен до 50."]),
          section("pvp-content", "Новый PvP-контент", ["Введены Хаотичная Верхняя Решанта и Поле битвы: Осада, а также зона Разлома Бездны."]),
          section("membership", "Реформа подписки: единый уровень, сниженная цена", ["Трёхуровневая система подписки объединена в единый «Special Quai Membership» по сниженной цене.", "Для новых игроков введены система Sprout Badge и Daeva Express."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "內容前瞻",
        title: "AION2 Chapter 1：沙霜之地——全球版玩家須知",
        description: "全球版玩家應了解的 AION2 Chapter 1 內容：Brawler 拳星職業、新區域 Eltnen/Morheim、副本、PvP 及會員體系改革。",
        intro: "AION2 Chapter 1「沙霜之地」於 2026 年 7 月 1 日在韓服/台服上線。本指南為準備全球版的玩家介紹 Chapter 1 的內容。",
        sourceNote: "基於 NC Corporation 官方公告（2026 年 7 月 6 日和 6 月 17 日）。",
        keywords: ["AION2 Chapter 1", "AION2 沙霜之地", "AION2 拳星", "AION2 Eltnen Morheim"],
        sections: [
          section("brawler", "Brawler 拳星：全新的前線戰鬥職業", ["Chapter 1 新增 Brawler 拳星職業，使用 Gauntlets 武器，專精前線連擊戰鬥。", "Brawler 的戰鬥風格以持續近距離壓制為主，擁有 Rage/Rampage 資源系統。"]),
          section("new-regions", "新區域：Eltnen 和 Morheim", ["新增兩個區域：Elyos 陣營的 Eltnen 和 Asmodian 陣營的 Morheim。每個區域包含 10 個新的封印副本和 3 個新的要塞。", "等級上限提升至 50。"]),
          section("pvp-content", "新 PvP 內容", ["Chapter 1 引入了混沌上 Reshanta 和 Battlefield: Siege，以及深淵裂隙區域。", "這些新增內容顯著擴展了 PvP 選擇。"]),
          section("membership", "會員體系改革：單檔位降價", ["原有的三檔會員體系被整合為單一的 Special Quai Membership，以更低價格提供更好的福利。", "針對新玩家，引入了 Sprout Badge 和 Daeva Express 系統。"]),
        ],
      }),
    },
  },
  // ARTICLE 5: Class selection guide
  {
    section: "guides",
    slug: "class-selection-pve-pvp-guide-global",
    schemaType: "Article",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-11",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [classGuideSource, chapter1Source],
    heroImage: classHero,
    related: [
      { kind: "content", section: "classes", slug: "difficulty-comparison" },
      { kind: "tool", toolSlug: "class-finder" },
      { kind: "content", section: "guides", slug: "global-launch-founders-pack-guide" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 7, {
        eyebrow: "CLASS GUIDE",
        title: "AION2 class selection guide: PvE and PvP recommendations for global launch",
        description: "Choose your first class in AION2 with this PvE and PvP guide covering all eight base classes: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter.",
        intro: "AION2 launches globally with eight base classes from the original roster. Each class has distinct strengths in PvE and PvP content. This guide covers each class's role, combat style, and which content types they excel at, helping new players make an informed choice for the September 2026 global launch. The Brawler class, added in Chapter 1 for Korea and Taiwan, may join the global version in a future update.",
        sourceNote: "Based on the official AION2 Korean Guidebook class roster, cross-referenced with community discussion (Reddit r/Aion2). Class performance is subject to balance changes in the global version. Each class profile is a KINA editorial assessment, not an official tier list.",
        keywords: ["AION2 best class", "AION2 class guide", "AION2 PvE class", "AION2 PvP class", "AION2 class selection"],
        sections: [
          section("class-overview", "Class overview: eight base classes at launch", ["AION2's global launch will feature eight base classes: Gladiator (sword, frontline damage), Templar (sword and shield, tank), Assassin (daggers, burst damage), Ranger (bow, ranged damage), Sorcerer (staff, magic damage), Spiritmaster (orb, summoning and control), Cleric (mace, healing), and Chanter (staff, support and damage).", "Each class belongs to one of two factions (Elyos or Asmodian) and has a distinct role profile. The Brawler class, added in Korea/Taiwan Chapter 1, may join the global version in a future content update but is not confirmed for launch."]),
          section("pve-recommendations", "PvE recommendations: dungeon, solo, and group play", ["For PvE dungeon content, Templar and Cleric are the most in-demand classes for group content as the primary tank and healer. Gladiator and Sorcerer lead in sustained damage output. For solo play, Ranger and Assassin offer strong self-sufficiency with good damage and mobility.", "Spiritmaster excels in control-heavy encounters, while Chanter provides versatile group support. New players who prefer solo leveling may find Ranger or Gladiator the most forgiving, while those planning to group should consider Templar or Cleric for faster queue times."]),
          section("pvp-recommendations", "PvP recommendations: open-world, battleground, and duels", ["In PvP, Assassin and Ranger excel in open-world and small-scale combat with burst damage and mobility. Gladiator and Templar hold their ground in sustained frontline fights. Sorcerer and Spiritmaster control the battlefield with area damage and crowd control.", "Chanter provides valuable group buffs in large-scale PvP, while Cleric's healing makes it a high-priority target. The global version's PvP balance may differ from Korea/Taiwan due to the reported Quna-to-Kinah exchange limit, which affects gear progression."]),
          section("beginner-tips", "Tips for choosing your first class", ["For first-time AION2 players, Gladiator and Ranger offer the most straightforward gameplay loops with good survivability. Players who enjoy supporting others should consider Cleric or Chanter. Those who prefer methodical play may enjoy Spiritmaster or Sorcerer.", "Consider the faction alignment: some classes are faction-specific. The class finder tool on this site can help match your preferences to suitable classes. Remember that the difficulty comparison page rates each class across five dimensions (inputs, positioning, resource management, party responsibility, and error recovery) to help you choose."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 7, {
        eyebrow: "职业指南",
        title: "AION2 职业选择指南：全球版 PvE 和 PvP 推荐",
        description: "通过这篇 PvE 和 PvP 指南选择你的首个 AION2 职业，涵盖全部 8 个基础职业：Gladiator、Templar、Assassin、Ranger、Sorcerer、Spiritmaster、Cleric 和 Chanter。",
        intro: "AION2 全球版将首发 8 个基础职业。每个职业在 PvE 和 PvP 内容中都有独特的优势。本指南涵盖每个职业的角色定位、战斗风格以及擅长的内容类型，帮助新玩家为 2026 年 9 月全球版做出明智选择。",
        sourceNote: "基于 AION2 韩国官方 Guidebook 职业列表，结合社区讨论（Reddit r/Aion2）交叉核对。职业表现可能因全球版平衡调整而异。",
        keywords: ["AION2 最佳职业", "AION2 职业指南", "AION2 PvE 职业", "AION2 PvP 职业", "AION2 职业选择"],
        sections: [
          section("class-overview", "职业概览：首发 8 个基础职业", ["AION2 全球版首发将包含 8 个基础职业：Gladiator（剑，前线伤害）、Templar（剑盾，坦克）、Assassin（匕首，爆发伤害）、Ranger（弓，远程伤害）、Sorcerer（法杖，魔法伤害）、Spiritmaster（宝珠，召唤与控制）、Cleric（锤，治疗）和 Chanter（法杖，支援与伤害）。", "每个职业属于两个阵营之一（Elyos 或 Asmodian），拥有独特的角色定位。Brawler 拳星职业可能在后续更新中加入全球版。"]),
          section("pve-recommendations", "PvE 推荐：副本、单人与组队", ["对于 PvE 副本内容，Templar 和 Cleric 是组队内容中最受欢迎的职业，分别担任主坦克和治疗者。Gladiator 和 Sorcerer 在持续伤害输出方面领先。", "Ranger 和 Assassin 在单人游戏中以强大的自给自足能力表现出色。首次玩 AION2 的新玩家可考虑 Ranger 或 Gladiator 作为起步职业。"]),
          section("pvp-recommendations", "PvP 推荐：开放世界、战场与决斗", ["在 PvP 中，Assassin 和 Ranger 在开放世界和小规模战斗中凭借爆发伤害和机动性表现出色。Gladiator 和 Templar 在持续前线战斗中稳固立足。", "Sorcerer 和 Spiritmaster 通过区域伤害和控制技能掌控战场。Chanter 在大規模 PvP 中提供有价值的团队增益。"]),
          section("beginner-tips", "选择首个职业的建议", ["对于首次游玩 AION2 的玩家，Gladiator 和 Ranger 提供最直接的玩法循环和良好的生存能力。喜欢支援他人的玩家可考虑 Cleric 或 Chanter。", "考虑阵营归属：部分职业是阵营专属的。本站的职业推荐器可帮助匹配偏好到合适的职业。难度对比页面从五个维度对每个职业进行评分。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 7, {
        eyebrow: "클래스 가이드",
        title: "AION2 클래스 선택 가이드: 글로벌 출시 PvE 및 PvP 추천",
        description: "8개 기본 클래스(Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, Chanter)를 위한 PvE 및 PvP 가이드로 첫 클래스를 선택하세요.",
        intro: "AION2 글로벌 버전은 8개의 기본 클래스로 출시됩니다. 각 클래스는 PvE와 PvP 콘텐츠에서 고유한 강점을 가지고 있습니다.",
        sourceNote: "AION2 공식 가이드북 클래스 목록과 Reddit r/Aion2 커뮤니티 토론을 기반으로 합니다.",
        keywords: ["AION2 최고 클래스", "AION2 클래스 가이드", "AION2 PvE 클래스", "AION2 PvP 클래스"],
        sections: [
          section("class-overview", "클래스 개요: 출시 시 8개 기본 클래스", ["AION2 글로벌 출시는 8개의 기본 클래스로 진행됩니다: Gladiator(검, 전선 데미지), Templar(검과 방패, 탱커), Assassin(단검, 폭딜), Ranger(활, 원거리), Sorcerer(스태프, 마법), Spiritmaster(오브, 소환/제어), Cleric(메이스, 힐러), Chanter(스태프, 서포트).", "각 클래스는 Elyos 또는 Asmodian 진영에 속합니다."]),
          section("pve-recommendations", "PvE 추천", ["PvE 던전에서 Templar와 Cleric이 가장 인기 있습니다. Gladiator와 Sorcerer는 지속 데미지 출력에서 선두입니다.", "Ranger와 Assassin은 솔로 플레이에서 강력한 자급자족 능력을 보여줍니다."]),
          section("pvp-recommendations", "PvP 추천", ["PvP에서 Assassin과 Ranger는 오픈월드와 소규모 전투에서 뛰어납니다. Gladiator와 Templar는 전선에서 강력합니다.", "Sorcerer와 Spiritmaster는 광역 데미지와 제어로 전장을 지배합니다."]),
          section("beginner-tips", "첫 클래스 선택 팁", ["처음 플레이하는 경우 Gladiator나 Ranger가 가장 직관적인 플레이를 제공합니다. 서포트를 선호하면 Cleric이나 Chanter를 고려하세요.", "클래스 추천 도구를 사용해 선호도에 맞는 클래스를 찾을 수 있습니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 7, {
        eyebrow: "GUIDE DES CLASSES", title: "Guide de sélection de classe AION2 : recommandations PvE et PvP pour le lancement global",
        description: "Choisissez votre première classe dans AION2 avec ce guide PvE et PvP couvrant les huit classes de base : Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric et Chanter.",
        intro: "AION2 lance sa version globale avec huit classes de base. Chaque classe a des forces distinctes en PvE et en PvP. Ce guide couvre le rôle de chaque classe.",
        sourceNote: "Basé sur le guide officiel coréen AION2 et les discussions communautaires Reddit r/Aion2.",
        keywords: ["meilleure classe AION2", "guide classe AION2", "classe PvE AION2", "classe PvP AION2"],
        sections: [
          section("class-overview", "Aperçu des classes : huit classes de base", ["AION2 lance huit classes de base : Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric et Chanter.", "Chaque classe appartient à l'une des deux factions (Elyos ou Asmodian)."]),
          section("pve-recommendations", "Recommandations PvE", ["Templar et Cleric sont les plus demandés en groupe. Gladiator et Sorcerer excellent en dégâts continus.", "Ranger et Assassin offrent une bonne autonomie en solo."]),
          section("pvp-recommendations", "Recommandations PvP", ["Assassin et Ranger excellent en combat ouvert. Sorcerer et Spiritmaster contrôlent le champ de bataille.", "Chanter offre des buffs de groupe précieux en PvP à grande échelle."]),
          section("beginner-tips", "Conseils pour choisir votre première classe", ["Pour débutants, Gladiator et Ranger offrent le gameplay le plus accessible. Les joueurs support peuvent choisir Cleric ou Chanter.", "Utilisez l'outil de sélection de classe du site pour trouver votre classe idéale."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 7, {
        eyebrow: "KLASSENLEITFADEN", title: "AION2-Klassenauswahl-Leitfaden: PvE- und PvP-Empfehlungen",
        description: "Wählen Sie Ihre erste Klasse in AION2 mit diesem PvE- und PvP-Leitfaden für alle acht Basisklassen.",
        intro: "AION2 startet global mit acht Basisklassen. Jede Klasse hat unterschiedliche Stärken in PvE und PvP.",
        sourceNote: "Basierend auf dem offiziellen koreanischen AION2-Handbuch und Community-Diskussionen.",
        keywords: ["beste AION2 Klasse", "AION2 Klassenleitfaden", "AION2 PvE Klasse", "AION2 PvP Klasse"],
        sections: [
          section("class-overview", "Klassenübersicht: acht Basisklassen", ["AION2 startet mit acht Basisklassen: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric und Chanter.", "Jede Klasse gehört einer der beiden Fraktionen an (Elyos oder Asmodian)."]),
          section("pve-recommendations", "PvE-Empfehlungen", ["Templar und Cleric sind in Gruppen am gefragtesten. Gladiator und Sorcerer führen bei Schaden.", "Ranger und Assassin sind stark im Solo-Spiel."]),
          section("pvp-recommendations", "PvP-Empfehlungen", ["Assassin und Ranger glänzen im offenen Kampf. Sorcerer und Spiritmaster kontrollieren das Schlachtfeld."]),
          section("beginner-tips", "Tipps für die erste Klasse", ["Für Einsteiger bieten Gladiator und Ranger das zugänglichste Gameplay.", "Nutzen Sie den Klassenfinder auf dieser Website."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 7, {
        eyebrow: "GUÍA DE CLASES", title: "Guía de selección de clase de AION2: recomendaciones PvE y PvP",
        description: "Elige tu primera clase en AION2 con esta guía PvE y PvP que cubre las ocho clases base.",
        intro: "AION2 se lanza globalmente con ocho clases base. Cada clase tiene fortalezas distintas en PvE y PvP.",
        sourceNote: "Basado en la guía oficial coreana de AION2 y discusiones comunitarias.",
        keywords: ["mejor clase AION2", "guía clase AION2", "clase PvE AION2", "clase PvP AION2"],
        sections: [
          section("class-overview", "Resumen de clases: ocho clases base", ["AION2 se lanza con ocho clases base: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric y Chanter.", "Cada clase pertenece a una de dos facciones (Elyos o Asmodian)."]),
          section("pve-recommendations", "Recomendaciones PvE", ["Templar y Cleric son los más solicitados en grupo. Gladiator y Sorcerer lideran en daño.", "Ranger y Assassin ofrecen buena autonomía en solitario."]),
          section("pvp-recommendations", "Recomendaciones PvP", ["Assassin y Ranger destacan en combate abierto. Sorcerer y Spiritmaster controlan el campo de batalla."]),
          section("beginner-tips", "Consejos para elegir tu primera clase", ["Para principiantes, Gladiator y Ranger ofrecen la jugabilidad más accesible.", "Use el buscador de clases del sitio para encontrar su clase ideal."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 7, {
        eyebrow: "クラスガイド", title: "AION2 クラス選択ガイド: PvE・PvP おすすめ",
        description: "8つの基本クラスをカバーする PvE・PvP ガイドで AION2 の最初のクラスを選びましょう。",
        intro: "AION2 グローバル版は8つの基本クラスでスタートします。各クラスには PvE と PvP で異なる強みがあります。",
        sourceNote: "AION2 韓国公式ガイドブックとコミュニティ議論に基づきます。",
        keywords: ["AION2 最強クラス", "AION2 クラスガイド", "AION2 PvE クラス", "AION2 PvP クラス"],
        sections: [
          section("class-overview", "クラス概要: 8つの基本クラス", ["AION2 は8つの基本クラスでスタート: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, Chanter。", "各クラスは Elyos または Asmodian の陣営に属します。"]),
          section("pve-recommendations", "PvE おすすめ", ["Templar と Cleric がグループで最も需要があります。Gladiator と Sorcerer がダメージ出力でリードします。", "Ranger と Assassin はソロプレイに適しています。"]),
          section("pvp-recommendations", "PvP おすすめ", ["Assassin と Ranger はオープンワールドで優れています。Sorcerer と Spiritmaster は戦場を制圧します。"]),
          section("beginner-tips", "最初のクラス選択のヒント", ["初心者には Gladiator または Ranger がおすすめです。サポート役を好むなら Cleric または Chanter を検討してください。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 7, {
        eyebrow: "GUIA DE CLASSES", title: "Guia de seleção de classe do AION2: recomendações PvE e PvP",
        description: "Escolha sua primeira classe no AION2 com este guia PvE e PvP cobrindo as oito classes base.",
        intro: "AION2 lança globalmente com oito classes base. Cada classe tem pontos fortes distintos em PvE e PvP.",
        sourceNote: "Baseado no guia oficial coreano do AION2 e discussões da comunidade.",
        keywords: ["melhor classe AION2", "guia de classe AION2", "classe PvE AION2", "classe PvP AION2"],
        sections: [
          section("class-overview", "Visão geral das classes: oito classes base", ["AION2 lança com oito classes base: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric e Chanter.", "Cada classe pertence a uma das duas facções (Elyos ou Asmodian)."]),
          section("pve-recommendations", "Recomendações PvE", ["Templar e Cleric são os mais procurados em grupo. Gladiator e Sorcerer lideram em dano.", "Ranger e Assassin oferecem boa autonomia solo."]),
          section("pvp-recommendations", "Recomendações PvP", ["Assassin e Ranger se destacam em combate aberto. Sorcerer e Spiritmaster controlam o campo de batalha."]),
          section("beginner-tips", "Dicas para escolher sua primeira classe", ["Para iniciantes, Gladiator e Ranger oferecem a jogabilidade mais acessível.", "Use o seletor de classes do site para encontrar sua classe ideal."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 7, {
        eyebrow: "РУКОВОДСТВО ПО КЛАССАМ", title: "Руководство по выбору класса AION2: рекомендации для PvE и PvP",
        description: "Выберите свой первый класс в AION2 с помощью этого руководства по PvE и PvP, охватывающего все восемь базовых классов.",
        intro: "AION2 запускается глобально с восемью базовыми классами. У каждого класса есть свои сильные стороны в PvE и PvP.",
        sourceNote: "Основано на официальном корейском руководстве AION2 и обсуждениях сообщества.",
        keywords: ["лучший класс AION2", "руководство по классам AION2", "класс PvE AION2", "класс PvP AION2"],
        sections: [
          section("class-overview", "Обзор классов: восемь базовых классов", ["AION2 запускается с восемью базовыми классами: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric и Chanter.", "Каждый класс принадлежит одной из двух фракций (Elyos или Asmodian)."]),
          section("pve-recommendations", "Рекомендации для PvE", ["Templar и Cleric наиболее востребованы в группах. Gladiator и Sorcerer лидируют по урону.", "Ranger и Assassin хороши для одиночной игры."]),
          section("pvp-recommendations", "Рекомендации для PvP", ["Assassin и Ranger отлично проявляют себя в открытом мире. Sorcerer и Spiritmaster контролируют поле боя."]),
          section("beginner-tips", "Советы по выбору первого класса", ["Для новичков Gladiator и Ranger предлагают самый доступный геймплей.", "Используйте подбор классов на этом сайте."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 7, {
        eyebrow: "職業指南",
        title: "AION2 職業選擇指南：全球版 PvE 和 PvP 推薦",
        description: "透過這篇 PvE 和 PvP 指南選擇你的首個 AION2 職業，涵蓋全部 8 個基礎職業。",
        intro: "AION2 全球版將首發 8 個基礎職業。每個職業在 PvE 和 PvP 內容中都有獨特的優勢。",
        sourceNote: "基於 AION2 韓國官方 Guidebook 職業列表，結合社群討論交叉核對。",
        keywords: ["AION2 最佳職業", "AION2 職業指南", "AION2 PvE 職業", "AION2 PvP 職業"],
        sections: [
          section("class-overview", "職業概覽：首發 8 個基礎職業", ["AION2 全球版首發將包含 8 個基礎職業：Gladiator、Templar、Assassin、Ranger、Sorcerer、Spiritmaster、Cleric 和 Chanter。", "每個職業屬於兩個陣營之一（Elyos 或 Asmodian）。"]),
          section("pve-recommendations", "PvE 推薦", ["Templar 和 Cleric 是組隊內容中最受歡迎的職業。Gladiator 和 Sorcerer 在持續傷害輸出方面領先。", "Ranger 和 Assassin 在單人遊戲中表現出色。"]),
          section("pvp-recommendations", "PvP 推薦", ["Assassin 和 Ranger 在開放世界和小規模戰鬥中表現出色。Sorcerer 和 Spiritmaster 透過區域傷害和控制技能掌控戰場。"]),
          section("beginner-tips", "選擇首個職業的建議", ["對於首次遊玩的玩家，Gladiator 和 Ranger 提供最直接的玩法循環。喜歡支援他人的玩家可考慮 Cleric 或 Chanter。"]),
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];

export const trendingAugust11GeneratedEditorialEntries = {
  "news/august-11-2026-fromis9-collaboration-ending": {},
  "news/global-quna-kinah-exchange-p2w-changes": {},
  "guides/global-launch-founders-pack-guide": {},
  "guides/chapter-1-content-guide-global": {},
  "guides/class-selection-pve-pvp-guide-global": {},
} as const;