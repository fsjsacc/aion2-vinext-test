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
  "zh-hans": {
    backLabel: "返回新闻中心",
    contentsLabel: "本期重点",
    publishedLabel: "发布",
    updatedLabel: "最后核对",
    relatedLabel: "延伸阅读",
  },
  en: {
    backLabel: "Back to news",
    contentsLabel: "In this report",
    publishedLabel: "Published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  fr: {
    backLabel: "Retour aux actualités",
    contentsLabel: "Dans ce rapport",
    publishedLabel: "Publié",
    updatedLabel: "Dernière vérification",
    relatedLabel: "À lire aussi",
  },
  de: {
    backLabel: "Zurück zu den News",
    contentsLabel: "In diesem Bericht",
    publishedLabel: "Veröffentlicht",
    updatedLabel: "Zuletzt geprüft",
    relatedLabel: "Weiterführende Artikel",
  },
  es: {
    backLabel: "Volver a noticias",
    contentsLabel: "En este informe",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificación",
    relatedLabel: "Lecturas relacionadas",
  },
  ja: {
    backLabel: "ニュース一覧へ",
    contentsLabel: "この記事の要点",
    publishedLabel: "公開日",
    updatedLabel: "最終確認",
    relatedLabel: "関連記事",
  },
  "pt-br": {
    backLabel: "Voltar às notícias",
    contentsLabel: "Neste relatório",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificação",
    relatedLabel: "Leituras relacionadas",
  },
  ru: {
    backLabel: "Назад к новостям",
    contentsLabel: "В этом материале",
    publishedLabel: "Опубликовано",
    updatedLabel: "Последняя проверка",
    relatedLabel: "Читайте также",
  },
  ko: {
    backLabel: "뉴스로 돌아가기",
    contentsLabel: "이번 소식의 핵심",
    publishedLabel: "게시일",
    updatedLabel: "최종 확인",
    relatedLabel: "관련 글",
  },
  "zh-hant": {
    backLabel: "返回新聞中心",
    contentsLabel: "本期重點",
    publishedLabel: "發布",
    updatedLabel: "最後核對",
    relatedLabel: "延伸閱讀",
  },
};

const guideLabels: Record<SiteLocale, ArticleLabels> = {
  "zh-hans": {
    backLabel: "返回攻略中心",
    contentsLabel: "本页内容",
    publishedLabel: "发布",
    updatedLabel: "最后核对",
    relatedLabel: "继续阅读",
  },
  en: {
    backLabel: "Back to guides",
    contentsLabel: "On this page",
    publishedLabel: "Published",
    updatedLabel: "Last verified",
    relatedLabel: "Continue reading",
  },
  fr: {
    backLabel: "Retour aux guides",
    contentsLabel: "Sur cette page",
    publishedLabel: "Publié",
    updatedLabel: "Dernière vérification",
    relatedLabel: "À lire ensuite",
  },
  de: {
    backLabel: "Zurück zu den Guides",
    contentsLabel: "Auf dieser Seite",
    publishedLabel: "Veröffentlicht",
    updatedLabel: "Zuletzt geprüft",
    relatedLabel: "Weiterlesen",
  },
  es: {
    backLabel: "Volver a guías",
    contentsLabel: "En esta página",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificación",
    relatedLabel: "Sigue leyendo",
  },
  ja: {
    backLabel: "ガイド一覧へ",
    contentsLabel: "このページの内容",
    publishedLabel: "公開日",
    updatedLabel: "最終確認",
    relatedLabel: "関連ガイド",
  },
  "pt-br": {
    backLabel: "Voltar aos guias",
    contentsLabel: "Nesta página",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificação",
    relatedLabel: "Continue lendo",
  },
  ru: {
    backLabel: "Назад к руководствам",
    contentsLabel: "На этой странице",
    publishedLabel: "Опубликовано",
    updatedLabel: "Последняя проверка",
    relatedLabel: "Читать далее",
  },
  ko: {
    backLabel: "가이드로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "게시",
    updatedLabel: "마지막 확인",
    relatedLabel: "이어서 읽기",
  },
  "zh-hant": {
    backLabel: "返回攻略中心",
    contentsLabel: "本頁內容",
    publishedLabel: "發布",
    updatedLabel: "最後核對",
    relatedLabel: "接著閱讀",
  },
};

function readingTime(locale: SiteLocale, minutes: number): string {
  const table: Record<SiteLocale, string> = {
    "zh-hans": `约 ${minutes} 分钟`,
    en: `${minutes} min read`,
    fr: `${minutes} min de lecture`,
    de: `${minutes} Min. Lesezeit`,
    es: `${minutes} min de lectura`,
    ja: `約${minutes}分`,
    "pt-br": `${minutes} min de leitura`,
    ru: `${minutes} мин чтения`,
    ko: `약 ${minutes}분`,
    "zh-hant": `約 ${minutes} 分鐘`,
  };
  return table[locale];
}

function articleCopy(
  labels: Record<SiteLocale, ArticleLabels>,
  locale: SiteLocale,
  minutes: number,
  body: LocalizedArticleBody,
): LocalizedContent {
  return {
    ...labels[locale],
    byline: "PFG",
    readingTime: readingTime(locale, minutes),
    ...body,
  };
}

function localizations(
  values: Record<SiteLocale, string>,
  url: string,
): NonNullable<ContentSource["localizations"]> {
  return Object.fromEntries(
    Object.entries(values).map(([locale, label]) => [
      locale,
      { label, url },
    ]),
  ) as NonNullable<ContentSource["localizations"]>;
}

const approvedAllLocales = {
  "zh-hans": "approved",
  en: "approved",
  fr: "approved",
  de: "approved",
  es: "approved",
  ja: "approved",
  "pt-br": "approved",
  ru: "approved",
  ko: "approved",
  "zh-hant": "approved",
} as const satisfies ContentEntry["publication"]["localeReview"];

const publishedVerified = {
  status: "published",
  indexable: true,
  localeReview: approvedAllLocales,
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

/* ------------------------------------------------------------------ */
/* Sources                                                             */
/* ------------------------------------------------------------------ */

const krAugust5UpdateUrl =
  "https://aion2.plaync.com/ko-kr/board/update/view?articleId=6a723db86b722c561dc69f13";

const krAugust5UpdateNoteSource: ContentSource = {
  id: "plaync-korea-august-5-update-note-2026",
  kind: "official",
  publisher: "NC Corporation",
  label: "Official AION2 Korea August 5 update notes",
  url: krAugust5UpdateUrl,
  publishedAt: "2026-08-05",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION2 韩国服 8月5日例行更新说明",
      en: "Official AION2 Korea August 5 update notes",
      fr: "Notes de mise à jour officielles AION2 Corée du 5 août",
      de: "Offizielle AION2-Korea-Update-Hinweise vom 5. August",
      es: "Notas oficiales de la actualización de AION2 Corea del 5 de agosto",
      ja: "AION2韓国サービス 8月5日定期アップデートノート",
      "pt-br": "Notas oficiais da atualização de AION2 Coreia de 5 de agosto",
      ru: "Официальные примечания к обновлению AION2 Korea от 5 августа",
      ko: "AION2 8월 5일 정기점검 업데이트 노트",
      "zh-hant": "AION2 韓國服 8 月 5 日例行更新說明",
    },
    krAugust5UpdateUrl,
  ),
};

const aion2hubAugust5Source: ContentSource = {
  id: "aion2hub-august-5-summary-2026",
  kind: "third-party",
  publisher: "AION2 Hub",
  label: "AION 2 August 5, 2026 update summary in English",
  url: "https://aion2hub.com/updates",
  publishedAt: "2026-08-05",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION2 Hub：2026年8月5日更新英文摘要",
      en: "AION 2 August 5, 2026 update summary in English",
      fr: "Résumé en anglais de la mise à jour AION 2 du 5 août 2026 (AION2 Hub)",
      de: "Englische Zusammenfassung des AION-2-Updates vom 5. August 2026 (AION2 Hub)",
      es: "Resumen en inglés de la actualización de AION 2 del 5 de agosto de 2026 (AION2 Hub)",
      ja: "AION2 Hub：2026年8月5日アップデート英語サマリー",
      "pt-br": "Resumo em inglês da atualização de AION 2 de 5 de agosto de 2026 (AION2 Hub)",
      ru: "Англоязычная сводка обновления AION 2 от 5 августа 2026 (AION2 Hub)",
      ko: "AION2 Hub: 2026년 8월 5일 업데이트 영문 요약",
      "zh-hant": "AION2 Hub：2026 年 8 月 5 日更新英文摘要",
    },
    "https://aion2hub.com/updates",
  ),
};

const aion2tAugust5Source: ContentSource = {
  id: "aion2t-august-5-notes-2026",
  kind: "third-party",
  publisher: "Aion2t",
  label: "AION 2 August 5, 2026 update notes translation and annotation",
  url: "https://aion2t.com/news/36",
  publishedAt: "2026-08-05",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "Aion2t：2026年8月5日更新说明翻译与注释",
      en: "AION 2 August 5, 2026 update notes translation and annotation",
      fr: "Traduction annotée des notes de mise à jour AION 2 du 5 août 2026 (Aion2t)",
      de: "Übersetzte und kommentierte AION-2-Update-Hinweise vom 5. August 2026 (Aion2t)",
      es: "Traducción anotada de las notas de actualización de AION 2 del 5 de agosto de 2026 (Aion2t)",
      ja: "Aion2t：2026年8月5日アップデートノートの翻訳と注釈",
      "pt-br": "Tradução anotada das notas da atualização de AION 2 de 5 de agosto de 2026 (Aion2t)",
      ru: "Перевод и комментарии к обновлению AION 2 от 5 августа 2026 (Aion2t)",
      ko: "Aion2t: 2026년 8월 5일 업데이트 노트 번역·주석",
      "zh-hant": "Aion2t：2026 年 8 月 5 日更新說明翻譯與註釋",
    },
    "https://aion2t.com/news/36",
  ),
};

const aion2tDatamineSource: ContentSource = {
  id: "aion2t-datamine-august-5-2026",
  kind: "third-party",
  publisher: "Aion2t",
  label: "Datamined AION 2 dungeons: Askran, Atiel and the Legacy Noiran",
  url: "https://aion2t.com/news/37",
  publishedAt: "2026-08-05",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "Aion2t：数据挖掘副本 Askran、Atiel 与 Legacy Noiran",
      en: "Datamined AION 2 dungeons: Askran, Atiel and the Legacy Noiran",
      fr: "Donjons dataminés d’AION 2 : Askran, Atiel et Legacy Noiran (Aion2t)",
      de: "Datamined-Dungeons in AION 2: Askran, Atiel und Legacy Noiran (Aion2t)",
      es: "Mazmorras datamineadas de AION 2: Askran, Atiel y Legacy Noiran (Aion2t)",
      ja: "Aion2t：データマイニングされたダンジョン Askran、Atiel、Legacy Noiran",
      "pt-br": "Masmas encontradas por datamine em AION 2: Askran, Atiel e Legacy Noiran (Aion2t)",
      ru: "Датмайн подземелий AION 2: Askran, Atiel и Legacy Noiran (Aion2t)",
      ko: "Aion2t: 데이터마이닝 던전 Askran, Atiel, Legacy Noiran",
      "zh-hant": "Aion2t：資料挖掘副本 Askran、Atiel 與 Legacy Noiran",
    },
    "https://aion2t.com/news/37",
  ),
};

const globalEarlyAccessUrl =
  "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5819287b798626e79a8892";

const globalEarlyAccessSource: ContentSource = {
  id: "aion2-global-early-access-recheck-2026-08-08",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 official Team Update — Early Access: How It Will Work",
  url: globalEarlyAccessUrl,
  publishedAt: "2026-07-17",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION 2 官方 Team Update：Early Access 运作方式",
      en: "AION 2 official Team Update — Early Access: How It Will Work",
      fr: "Team Update officiel AION 2 — Early Access : fonctionnement",
      de: "Offizielles AION-2-Team-Update — Early Access: So funktioniert er",
      es: "Team Update oficial de AION 2: así funcionará el Early Access",
      ja: "AION 2公式 Team Update：Early Access の仕組み",
      "pt-br": "Team Update oficial de AION 2 — como funcionará o Early Access",
      ru: "Официальный Team Update AION 2 — как устроен Early Access",
      ko: "AION 2 공식 Team Update: 얼리 액세스 운영 방식",
      "zh-hant": "AION 2 官方 Team Update：Early Access 運作方式",
    },
    globalEarlyAccessUrl,
  ),
};

const globalFoundersPackUrl =
  "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f";

const globalFoundersPackSource: ContentSource = {
  id: "aion2-global-founders-pack-recheck-2026-08-08",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 official notice — Founder's Pack (July 22)",
  url: globalFoundersPackUrl,
  publishedAt: "2026-07-22",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION 2 官方创始人包公告（7月22日）",
      en: "AION 2 official notice — Founder's Pack (July 22)",
      fr: "Annonce officielle du pack Fondateur d’AION 2 (22 juillet)",
      de: "Offizielle AION-2-Gründerpaket-Ankündigung (22. Juli)",
      es: "Aviso oficial del paquete de fundador de AION 2 (22 de julio)",
      ja: "AION 2公式ファウンダーズパック案内（7月22日）",
      "pt-br": "Aviso oficial do Pacote de Fundador de AION 2 (22 de julho)",
      ru: "Официальное объявление о наборе основателя AION 2 (22 июля)",
      ko: "AION 2 공식 파운더스 팩 안내(7월 22일)",
      "zh-hant": "AION 2 官方創始人包公告（7 月 22 日）",
    },
    globalFoundersPackUrl,
  ),
};

const globalSteamUrl = "https://store.steampowered.com/app/3393110/AION_2/";

const globalSteamSource: ContentSource = {
  id: "aion2-global-steam-check-2026-08-08",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 official Steam store page, rechecked August 8, 2026",
  url: globalSteamUrl,
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION 2 Steam 官方商店页（2026年8月8日复核）",
      en: "AION 2 official Steam store page, rechecked August 8, 2026",
      fr: "Page Steam officielle d’AION 2, revérifiée le 8 août 2026",
      de: "Offizielle Steam-Seite von AION 2, erneut geprüft am 8. August 2026",
      es: "Página oficial de AION 2 en Steam, revisada el 8 de agosto de 2026",
      ja: "AION 2 Steam 公式ストアページ（2026年8月8日再確認）",
      "pt-br": "Página oficial de AION 2 na Steam, reverificada em 8 de agosto de 2026",
      ru: "Официальная страница AION 2 в Steam, проверена 8 августа 2026",
      ko: "AION 2 공식 Steam 상점 페이지(2026년 8월 8일 재확인)",
      "zh-hant": "AION 2 Steam 官方商店頁（2026 年 8 月 8 日複核）",
    },
    globalSteamUrl,
  ),
};

const mmoexpPveUrl =
  "https://www.mmoexp.com/News/aion-2-global-launch-pve-content-everything-coming-in-september-2026.html";

const mmoexpPveSource: ContentSource = {
  id: "mmoexp-global-pve-preview-2026-08-07",
  kind: "third-party",
  publisher: "MMOEXP",
  label: "Aion 2 Global Launch PvE Content preview (third-party expectation)",
  url: mmoexpPveUrl,
  publishedAt: "2026-08-07",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "MMOEXP：Aion 2 全球版 PvE 内容前瞻（第三方预期）",
      en: "Aion 2 Global Launch PvE Content preview (third-party expectation)",
      fr: "Aperçu MMOEXP du contenu PvE du lancement mondial d’Aion 2 (attente tierce)",
      de: "MMOEXP-Vorschau zum PvE-Inhalt des globalen Aion-2-Starts (Drittanbieter-Erwartung)",
      es: "Adelanto de MMOEXP del contenido PvE del lanzamiento global de Aion 2 (expectativa de terceros)",
      ja: "MMOEXP：Aion 2 グローバル版 PvE コンテンツ前瞻（第三者の予想）",
      "pt-br": "Prévia MMOEXP do conteúdo PvE do lançamento global de Aion 2 (expectativa de terceiros)",
      ru: "Превью MMOEXP PvE-контента глобального запуска Aion 2 (стороннее ожидание)",
      ko: "MMOEXP: Aion 2 글로벌 출시 PvE 콘텐츠 미리보기(제3자 예상)",
      "zh-hant": "MMOEXP：Aion 2 全球版 PvE 內容前瞻（第三方預期）",
    },
    mmoexpPveUrl,
  ),
};

const couponLoungeUrl =
  "https://lounge.plaync.com/feed/72128?country=KR&locale=ko-KR";

const couponLoungeSource: ContentSource = {
  id: "nc-purple-lounge-chapter-one-coupon-recheck",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 SUMMER FESTA Showcase coupon notice",
  url: couponLoungeUrl,
  publishedAt: "2026-06-14",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION2 SUMMER FESTA Showcase 兑换码公告",
      en: "AION2 SUMMER FESTA Showcase coupon notice",
      fr: "Avis officiel sur le code du SUMMER FESTA Showcase d’AION2",
      de: "Offizielle Ankündigung zum SUMMER-FESTA-Showcase-Code für AION2",
      es: "Aviso oficial del código del Showcase SUMMER FESTA de AION2",
      ja: "AION2 SUMMER FESTA Showcase クーポン案内",
      "pt-br": "Aviso oficial do código do Showcase SUMMER FESTA de AION2",
      ru: "Официальное уведомление о коде SUMMER FESTA Showcase AION2",
      ko: "AION2 SUMMER FESTA 쇼케이스 쿠폰 안내",
      "zh-hant": "AION2 SUMMER FESTA Showcase 兌換碼公告",
    },
    couponLoungeUrl,
  ),
};

const couponTwUrl = "https://about.ncsoft.com/tw/news/article/aion2_update_260617";

const couponTwSource: ContentSource = {
  id: "nc-tw-coupon-recheck",
  kind: "official",
  publisher: "NC Taiwan",
  label: "AION2 SUMMER FESTA and Chapter 1 rewards announcement",
  url: couponTwUrl,
  publishedAt: "2026-06-17",
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION2 SUMMER FESTA 与 Chapter 1 奖励公告（台服）",
      en: "AION2 SUMMER FESTA and Chapter 1 rewards announcement",
      fr: "Annonce AION2 SUMMER FESTA et récompenses Chapter 1 (Taipei)",
      de: "AION2-Ankündigung zu SUMMER FESTA und Chapter-1-Belohnungen (Taipeh)",
      es: "Anuncio de AION2 SUMMER FESTA y recompensas de Chapter 1 (Taipéi)",
      ja: "AION2 SUMMER FESTA と Chapter 1 報酬のご案内（台版）",
      "pt-br": "Anúncio de recompensas do AION2 SUMMER FESTA e Chapter 1 (Taipei)",
      ru: "Объявление AION2 SUMMER FESTA и наград Chapter 1 (Тайбэй)",
      ko: "AION2 SUMMER FESTA 및 Chapter 1 보상 안내(대만)",
      "zh-hant": "AION2 SUMMER FESTA 與 Chapter 1 獎勵公告（台版）",
    },
    couponTwUrl,
  ),
};

const couponPortalUrl = "https://nshop.plaync.com/shop/aion2/coupon";

const couponPortalSource: ContentSource = {
  id: "aion2-official-coupon-portal-2026",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 official coupon portal",
  url: couponPortalUrl,
  retrievedAt: "2026-08-08",
  verifiedAt: "2026-08-08",
  localizations: localizations(
    {
      "zh-hans": "AION2 官方兑换码入口",
      en: "AION2 official coupon portal",
      fr: "Portail officiel de codes AION2",
      de: "Offizielles AION2-Coupon-Portal",
      es: "Portal oficial de códigos de AION2",
      ja: "AION2 公式クーポン窓口",
      "pt-br": "Portal oficial de códigos de AION2",
      ru: "Официальный портал купонов AION2",
      ko: "AION2 공식 쿠폰 페이지",
      "zh-hant": "AION2 官方兌換碼入口",
    },
    couponPortalUrl,
  ),
};

/* ------------------------------------------------------------------ */
/* Hero images                                                         */
/* ------------------------------------------------------------------ */

const updateBriefHero: ContentHeroImage = {
  src: "https://fizz-download.playnccdn.com/lg/file/aion2/download/19fa8ab9921-a4c59018-8842-47f3-a99a-41409b9293bf",
  width: 584,
  height: 298,
  credit: "NC Corporation",
  sourceUrl: krAugust5UpdateUrl,
  rights: "linked-official-media",
  presentation: "cover",
  translations: {
    "zh-hans": {
      alt: "AION2 2026年8月5日更新官方资讯图",
      caption: "NC Corporation 官方更新资讯图；实际时间与条件以游戏内及官方公告为准。",
    },
    en: {
      alt: "Official AION2 August 5 update news artwork",
      caption: "Official NC Corporation update artwork; in-game timing and conditions remain authoritative.",
    },
    fr: {
      alt: "Visuel officiel de la mise à jour AION2 du 5 août",
      caption: "Visuel officiel de NC Corporation ; les horaires et conditions en jeu font foi.",
    },
    de: {
      alt: "Offizielles Artwork zum AION2-Update vom 5. August",
      caption: "Offizielles Update-Artwork von NC Corporation; maßgeblich sind Zeiten und Bedingungen im Spiel.",
    },
    es: {
      alt: "Imagen oficial de la actualización de AION2 del 5 de agosto",
      caption: "Imagen oficial de NC Corporation; prevalecen los horarios y condiciones indicados en el juego.",
    },
    ja: {
      alt: "AION2 8月5日アップデートニュースの公式画像",
      caption: "NC Corporationの公式アップデート画像。実施時間と条件はゲーム内および公式告知が優先されます。",
    },
    "pt-br": {
      alt: "Arte oficial da atualização de AION2 de 5 de agosto",
      caption: "Arte oficial da NC Corporation; horários e condições exibidos no jogo são os definitivos.",
    },
    ru: {
      alt: "Официальный арт обновления AION2 от 5 августа",
      caption: "Официальный арт NC Corporation; точные сроки и условия следует проверять в игре.",
    },
    ko: {
      alt: "AION2 2026년 8월 5일 업데이트 뉴스 공식 이미지",
      caption: "NC Corporation 공식 업데이트 이미지이며, 세부 일정과 조건은 게임 내 및 공식 공지를 기준으로 합니다.",
    },
    "zh-hant": {
      alt: "AION2 2026 年 8 月 5 日更新官方資訊圖",
      caption: "NC Corporation 官方更新資訊圖；實際開放時間與條件以遊戲內及官方公告為準。",
    },
  },
};

const lookChangeWeekHero: ContentHeroImage = {
  src: "https://fizz-download.playnccdn.com/download/v2/buckets/guidebook/files/19f1107fab3-3baaf58a-f196-45a0-a2a6-d323bc14909e",
  width: 520,
  height: 308,
  credit: "NC Corporation",
  sourceUrl: krAugust5UpdateUrl,
  rights: "linked-official-media",
  presentation: "contain",
  translations: {
    "zh-hans": {
      alt: "AION2 官方指南图库图片，用于外观活动指南",
      caption: "NC 官方指南图库图片；活动细节以 8 月 5 日更新说明为准。",
    },
    en: {
      alt: "Official AION2 guidebook artwork used for the wardrobe event guide",
      caption: "Official NC guidebook image; event details follow the August 5 update notes.",
    },
    fr: {
      alt: "Visuel officiel du guide AION2 utilisé pour le guide de l’événement garde-robe",
      caption: "Image officielle du guide NC ; les détails suivent les notes du 5 août.",
    },
    de: {
      alt: "Offizielles AION2-Guidebook-Artwork für den Garderoben-Event-Guide",
      caption: "Offizielles NC-Guidebook-Bild; Event-Details folgen den Update-Hinweisen vom 5. August.",
    },
    es: {
      alt: "Imagen oficial de la guía de AION2 usada para la guía del evento de vestuario",
      caption: "Imagen oficial de la guía de NC; los detalles siguen las notas del 5 de agosto.",
    },
    ja: {
      alt: "AION2 公式ガイドブック画像（外見イベントガイド用）",
      caption: "NC 公式ガイドブック画像。イベント詳細は 8 月 5 日アップデートノートに準じます。",
    },
    "pt-br": {
      alt: "Arte oficial do guia de AION2 usada no guia do evento de guarda-roupa",
      caption: "Imagem oficial do guia da NC; os detalhes seguem as notas de 5 de agosto.",
    },
    ru: {
      alt: "Официальный арт руководства AION2 для гайда по событию гардероба",
      caption: "Официальное изображение руководства NC; детали события — по примечаниям от 5 августа.",
    },
    ko: {
      alt: "AION2 공식 가이드북 이미지(외형 이벤트 가이드용)",
      caption: "NC 공식 가이드북 이미지이며, 이벤트 세부 내용은 8월 5일 업데이트 노트를 기준으로 합니다.",
    },
    "zh-hant": {
      alt: "AION2 官方指南圖庫圖片，用於外觀活動指南",
      caption: "NC 官方指南圖庫圖片；活動細節以 8 月 5 日更新說明為準。",
    },
  },
};

const datamineHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100,
  height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://about.ncsoft.com/en/news/article/aion2_update_260706",
  rights: "linked-official-media",
  translations: {
    "zh-hans": {
      alt: "AION 2 Chapter 1 官方宣传图",
      caption: "NC 官方 Chapter 1 宣传图；本文讨论的挖掘内容尚未官宣，与图片本身无直接关联。",
    },
    en: {
      alt: "Official AION 2 Chapter 1 artwork",
      caption: "Official NC Chapter 1 artwork; the datamined content discussed here is unannounced and not depicted by this image.",
    },
    fr: {
      alt: "Visuel officiel du Chapter 1 d’AION 2",
      caption: "Visuel officiel NC du Chapter 1 ; le contenu dataminé évoqué ici n’est pas annoncé et n’apparaît pas sur cette image.",
    },
    de: {
      alt: "Offizielles AION-2-Chapter-1-Artwork",
      caption: "Offizielles NC-Chapter-1-Artwork; der hier behandelte Datamine-Inhalt ist unangekündigt und nicht auf diesem Bild zu sehen.",
    },
    es: {
      alt: "Arte oficial del Chapter 1 de AION 2",
      caption: "Arte oficial del Chapter 1 de NC; el contenido datamineado tratado aquí no está anunciado y no aparece en esta imagen.",
    },
    ja: {
      alt: "AION 2 Chapter 1 公式アートワーク",
      caption: "NC 公式 Chapter 1 アートワーク。本記事のデータマイニング内容は未発表であり、この画像とは直接関係ありません。",
    },
    "pt-br": {
      alt: "Arte oficial do Chapter 1 de AION 2",
      caption: "Arte oficial do Chapter 1 da NC; o conteúdo de datamine discutido aqui não foi anunciado e não aparece nesta imagem.",
    },
    ru: {
      alt: "Официальный арт AION 2 Chapter 1",
      caption: "Официальный арт Chapter 1 от NC; обсуждаемый датмайн-контент не анонсирован и не изображён на этой картинке.",
    },
    ko: {
      alt: "AION 2 챕터 1 공식 이미지",
      caption: "NC 공식 챕터 1 이미지입니다. 본문에서 다루는 데이터마이닝 내용은 미공개 상태이며 이 이미지와 직접 관련이 없습니다.",
    },
    "zh-hant": {
      alt: "AION 2 Chapter 1 官方宣傳圖",
      caption: "NC 官方 Chapter 1 宣傳圖；本文討論的挖掘內容尚未官方宣布，與圖片本身無直接關聯。",
    },
  },
};

const globalPveHero: ContentHeroImage = {
  src: "https://fizz-download.playnccdn.com/download/v2/buckets/marketing-platform/files/19daa0916cf-44ee37e4-32f3-43fd-96f5-209f0afce2ad",
  width: 1200,
  height: 630,
  credit: "NC Corporation",
  sourceUrl: globalEarlyAccessUrl,
  rights: "linked-official-media",
  translations: {
    "zh-hans": {
      alt: "AION 2 全球版 Early Access 官方公告主视觉",
      caption: "NC 的 AION 2 全球版 Early Access 官方公告图片；上线信息最后于 2026 年 8 月 8 日与 Steam 页核对。",
    },
    en: {
      alt: "Official AION 2 Global Early Access announcement artwork",
      caption: "Official NC artwork for the AION 2 Global Early Access update; launch details were rechecked against the Steam page on August 8, 2026.",
    },
    fr: {
      alt: "Visuel officiel de l’annonce Early Access mondial d’AION 2",
      caption: "Visuel officiel NC pour l’Early Access mondial d’AION 2 ; détails revérifiés sur Steam le 8 août 2026.",
    },
    de: {
      alt: "Offizielles Artwork zur globalen AION-2-Early-Access-Ankündigung",
      caption: "Offizielles NC-Artwork zum globalen Early Access; Launch-Angaben am 8. August 2026 mit der Steam-Seite abgeglichen.",
    },
    es: {
      alt: "Arte oficial del anuncio del Early Access global de AION 2",
      caption: "Arte oficial de NC para el Early Access global de AION 2; los datos se revisaron en Steam el 8 de agosto de 2026.",
    },
    ja: {
      alt: "AION 2 グローバル版 Early Access 公式告知メインビジュアル",
      caption: "NC の AION 2 グローバル版 Early Access 公式告知画像。発売情報は 2026 年 8 月 8 日に Steam ページと再確認済み。",
    },
    "pt-br": {
      alt: "Arte oficial do anúncio do Early Access global de AION 2",
      caption: "Arte oficial da NC para o Early Access global de AION 2; detalhes verificados na Steam em 8 de agosto de 2026.",
    },
    ru: {
      alt: "Официальный арт анонса глобального Early Access AION 2",
      caption: "Официальный арт NC для глобального Early Access AION 2; детали сверены со Steam 8 августа 2026.",
    },
    ko: {
      alt: "AION 2 글로벌 얼리 액세스 공식 공지 이미지",
      caption: "NC 아이온2 글로벌 얼리 액세스 공식 공지 이미지이며 출시 정보는 2026년 8월 8일 Steam 페이지와 재확인했습니다.",
    },
    "zh-hant": {
      alt: "AION 2 全球版 Early Access 官方公告主視覺",
      caption: "NC 的 AION 2 全球版 Early Access 官方公告圖片；上線資訊最後於 2026 年 8 月 8 日與 Steam 頁核對。",
    },
  },
};

const couponStatusHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/5e088e2e-6d0c-4cf7-981a-feba6e673c83.jpg",
  width: 864,
  height: 456,
  credit: "NC Corporation",
  sourceUrl: couponLoungeUrl,
  rights: "linked-official-media",
  translations: {
    "zh-hans": {
      alt: "AION 2 SUMMER FESTA 官方活动图",
      caption: "NC SUMMER FESTA 官方图片；兑换码有效期以官方公告为准，图片本身不构成可用证明。",
    },
    en: {
      alt: "Official AION 2 SUMMER FESTA event image",
      caption: "Official NC SUMMER FESTA image; coupon validity follows the official notice, and the image itself does not prove availability.",
    },
    fr: {
      alt: "Image officielle de l’événement AION 2 SUMMER FESTA",
      caption: "Image officielle NC SUMMER FESTA ; la validité du code suit l’avis officiel, l’image ne prouve pas la disponibilité.",
    },
    de: {
      alt: "Offizielles Bild zum AION-2-SUMMER-FESTA-Event",
      caption: "Offizielles NC-SUMMER-FESTA-Bild; die Code-Gültigkeit folgt der offiziellen Ankündigung, das Bild belegt sie nicht.",
    },
    es: {
      alt: "Imagen oficial del evento AION 2 SUMMER FESTA",
      caption: "Imagen oficial del SUMMER FESTA de NC; la validez del código sigue el aviso oficial, la imagen no la acredita.",
    },
    ja: {
      alt: "AION 2 SUMMER FESTA 公式イベント画像",
      caption: "NC SUMMER FESTA 公式画像。クーポンの有効期間は公式告知に従い、画像自体は利用可能の証明になりません。",
    },
    "pt-br": {
      alt: "Imagem oficial do evento AION 2 SUMMER FESTA",
      caption: "Imagem oficial do SUMMER FESTA da NC; a validade do código segue o aviso oficial, a imagem não a comprova.",
    },
    ru: {
      alt: "Официальное изображение события AION 2 SUMMER FESTA",
      caption: "Официальное изображение SUMMER FESTA от NC; срок действия кода определяется официальным уведомлением, а не картинкой.",
    },
    ko: {
      alt: "AION 2 SUMMER FESTA 공식 이벤트 이미지",
      caption: "NC SUMMER FESTA 공식 이미지이며, 쿠폰 유효 기간은 공식 공지를 기준으로 하고 이미지 자체가 사용 가능 증거는 아닙니다.",
    },
    "zh-hant": {
      alt: "AION 2 SUMMER FESTA 官方活動圖",
      caption: "NC SUMMER FESTA 官方圖片；兌換碼有效期以官方公告為準，圖片本身不構成可用證明。",
    },
  },
};

/* ------------------------------------------------------------------ */
/* Entries                                                             */
/* ------------------------------------------------------------------ */

export const trendingAugust08ContentEntries = [
  {
    section: "news",
    slug: "august-5-2026-deva-look-change-week-update",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-08",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [krAugust5UpdateNoteSource, aion2hubAugust5Source, aion2tAugust5Source],
    heroImage: updateBriefHero,
    related: [
      { kind: "content", section: "guides", slug: "deva-look-change-week-guide" },
      { kind: "content", section: "guides", slug: "character-presets-style-shop" },
      { kind: "content", section: "guides", slug: "pet-progression" },
      { kind: "content", section: "news", slug: "july-29-2026-pet-auto-loot-server-matching-update" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 6, {
        eyebrow: "UPDATE BRIEF",
        title: "AION2 August 5 update: Deva Look Change Week and fixes",
        description:
          "The August 5 AION2 update adds Deva Look Change Week with 100-Quna dyeing, seven free patterns, pet ticket limits, boss fixes, and Abyss compensation.",
        intro:
          "AION2's Korean service applied its August 5 update during regular maintenance, and the official notes are now published. This cycle focuses on fashion, quality of life, and corrections rather than new combat content; the timing below follows the Korean notices, and any later official revision takes priority.",
        sourceNote:
          "Sources: official AION2 Korea August 5 update notes, cross-checked with independent English summaries. Times are KST; Korean-service details do not confirm future global rules.",
        keywords: ["AION2 August 5 update", "Deva Look Change Week", "AION2 dye discount", "AION2 pet auto-pickup ticket", "AION2 patch notes"],
        sections: [
          {
            id: "look-change-week",
            title: "Deva Look Change Week runs August 5–19",
            paragraphs: [
              "From the August 5 maintenance until the August 19 maintenance, decoration costs in the wardrobe drop from 200 to 100 Quna per part, a 50 percent discount, and there is no attempt limit during the event window. Changes cover dye, material, pattern, and pattern color under [Menu] > [Wardrobe] > Decorate.",
              "The same update adds seven free patterns to [Wardrobe] > [Decorate] > [Patterns]: horizontal stripes, vertical stripes, star, zebra, diamond check, cow print, and houndstooth.",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "Costume sets, weapon skins, and wings",
            paragraphs: [
              "Four costume sets are on sale during the same window: White Christmas and Blanc Noir at 49,000 KRW (or one Exchange Ticket each), plus Bath Time of Rest and Snow Black Wind at 2,500 Quna (or ticket) each. The Winter Night Frost Flower weapon skin costs 19,000 KRW or one Weapon Appearance Exchange Ticket and ships in nine class variants.",
              "Two wings are also available once per character: Ice Frost Wings at 29,000 KRW and Wings of the Light Wave at 1,500 Quna. All listed cosmetics are untradeable and undeletable; costumes and weapon skins can be dyed, but both wings cannot. KRW purchases earn Mileage, ticket purchases do not.",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "Pet ticket limits, combat fixes, and compensation",
            paragraphs: [
              "The Pet Auto-Pickup Ticket (30 days) is now limited to two purchases per character per month, and its bound version can be sold to general merchants for bound kinah at the original price.",
              "Compensation from earlier issues is included: Abyss Corridor points lost on July 1 to the level-gap penalty are restored in proportion to time spent in the corridor, and missing Soft Bunny Doll outfit exchange tickets are being sent to affected players.",
            ],
            bullets: [
              "Nightmare no longer strips Templar Noble Armor and Chanter Guardian Blessing on entry.",
              "Sanctuary (Polymer Bagot): restored the missing follow-up attack; summoned bomb damage can no longer be dodged with Assassin Evasion Stance.",
              "Transcendence (Gargaum): the bleed zone can no longer be removed by Gladiator Wave Armor; Blue Light of Destruction renamed Expanding Primal.",
              "Citadel of the Fallen Daeva (Griosa): fixed projectiles failing during Storm of Destruction; Brawler Focused Block cast-count display fixed.",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "Scope: what this update does not change",
            paragraphs: [
              "The August 5 notes contain no class balance changes and no new dungeons. Prices above are the Korean-service list and do not set global pricing.",
              "For global players, the confirmed milestone remains September 30 early access tied to Founder's Packs; treat Korean-service events and prices as regional information until a global notice says otherwise.",
            ],
          },
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 6, {
        eyebrow: "更新快报",
        title: "AION2 8月5日更新：德巴外观变更周与修复",
        description:
          "8月5日AION2更新带来德巴外观变更周：100库纳染色、7款免费花纹、宠物自动拾取券限购、首领修复与深渊补偿。",
        intro:
          "AION2 韩国服已在例行维护中实装8月5日更新，官方更新说明同步发布。本次重点在外观、便利性与修复，没有新战斗内容；以下时间均以韩服公告为准，官方后续修订优先。",
        sourceNote:
          "资料来源：AION2 韩国服8月5日官方更新说明，并与独立英文摘要交叉核对。时间为KST；韩服细节不代表未来全球版规则。",
        keywords: ["AION2 8月5日更新", "德巴外观变更周", "AION2 染色折扣", "AION2 宠物自动拾取券", "AION2 更新说明"],
        sections: [
          {
            id: "look-change-week",
            title: "德巴外观变更周：8月5日至19日",
            paragraphs: [
              "8月5日维护后至8月19日维护前，衣柜装饰费用由每部位200库纳降至100库纳（五折），活动期间不限次数。可调整范围包括染色、材质、花纹与花纹颜色，入口为【菜单】>【衣柜】>装饰。",
              "同次更新在【衣柜】>【装饰】>【花纹】新增7款免费花纹：横条纹、竖条纹、星星、斑马纹、菱形格、奶牛纹与千鸟格。",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "外观套装、武器外观与翅膀",
            paragraphs: [
              "同一档期上架4套时装：白色圣诞与白黑（Blanc Noir）各49,000韩元或1张兑换券，休憩沐浴时光与雪之黑风各2,500库纳或兑换券。冬夜霜花武器外观售价19,000韩元或1张武器外观兑换券，共9个职业版本。",
              "另有两款翅膀每角色限购一次：冰霜之翼29,000韩元、光波之翼1,500库纳。以上外观均不可交易、不可销毁；时装与武器外观可染色，两款翅膀不可染色。韩元现金购买累计里程，兑换券购买不累计。",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "宠物券限购、战斗修复与补偿",
            paragraphs: [
              "宠物自动拾取券（30日）改为每角色每月限购2次，绑定版可按原价卖给普通商人换回绑定基纳。",
              "本次包含历史问题补偿：7月1日因等级差惩罚损失的深渊回廊积分，将按回廊停留时长比例补发；缺失的软萌兔娃时装兑换券将补发给受影响玩家。",
            ],
            bullets: [
              "噩梦副本进入时不再解除守护星高贵铠甲与护法的守护祝福。",
              "圣所（聚合物巴戈特）：补回缺失的追击动作；召唤炸弹伤害不再可被杀星回避姿态闪避。",
              "超越（卡尔加姆）：流血区域不再可用剑星波动铠甲移除；破灭的蓝光更名为扩散本能。",
              "堕落大娃要塞（格里奥萨）：修复毁灭风暴期间投射物不发射；修复拳星集中格挡第3规格施法次数显示。",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "范围：本次更新不包含什么",
            paragraphs: [
              "8月5日更新说明没有职业平衡，也没有新副本。以上价格为韩服标价，不构成全球版定价。",
              "对全球版玩家而言，已确认节点仍是9月30日与创始人包绑定的抢先体验；在官方全球公告之前，韩服活动与价格应视为地区信息。",
            ],
          },
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 6, {
        eyebrow: "更新快訊",
        title: "AION2 8月5日更新：德巴外觀變更週與修復",
        description:
          "8月5日AION2更新帶來德巴外觀變更週：100庫納染色、7款免費花紋、寵物自動拾取券限購、首領修復與深淵補償。",
        intro:
          "AION2 韓國服已在例行維護中實裝8月5日更新，官方更新說明同步發布。本次重點在外觀、便利性與修復，沒有新戰鬥內容；以下時間均以韓服公告為準，官方後續修訂優先。",
        sourceNote:
          "資料來源：AION2 韓國服8月5日官方更新說明，並與獨立英文摘要交叉核對。時間為KST；韓服細節不代表未來全球版規則。",
        keywords: ["AION2 8月5日更新", "德巴外觀變更週", "AION2 染色折扣", "AION2 寵物自動拾取券", "AION2 更新說明"],
        sections: [
          {
            id: "look-change-week",
            title: "德巴外觀變更週：8月5日至19日",
            paragraphs: [
              "8月5日維護後至8月19日維護前，衣櫃裝飾費用由每部位200庫納降至100庫納（五折），活動期間不限次數。可調整範圍包括染色、材質、花紋與花紋顏色，入口為【選單】>【衣櫃】>裝飾。",
              "同次更新在【衣櫃】>【裝飾】>【花紋】新增7款免費花紋：橫條紋、直條紋、星星、斑馬紋、菱形格、乳牛紋與千鳥格。",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "外觀套裝、武器外觀與翅膀",
            paragraphs: [
              "同一檔期上架4套時裝：白色聖誕與白黑（Blanc Noir）各49,000韓元或1張兌換券，休憩沐浴時光與雪之黑風各2,500庫納或兌換券。冬夜霜花武器外觀售價19,000韓元或1張武器外觀兌換券，共9個職業版本。",
              "另有兩款翅膀每角色限購一次：冰霜之翼29,000韓元、光波之翼1,500庫納。以上外觀均不可交易、不可銷毀；時裝與武器外觀可染色，兩款翅膀不可染色。韓元現金購買累計里程，兌換券購買不累計。",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "寵物券限購、戰鬥修復與補償",
            paragraphs: [
              "寵物自動拾取券（30日）改為每角色每月限購2次，綁定版可按原價賣給普通商人換回綁定基納。",
              "本次包含歷史問題補償：7月1日因等級差懲罰損失的深淵迴廊積分，將按迴廊停留時長比例補發；缺失的軟萌兔娃時裝兌換券將補發給受影響玩家。",
            ],
            bullets: [
              "噩夢副本進入時不再解除守護星高貴鎧甲與護法的守護祝福。",
              "聖所（聚合物巴戈特）：補回缺失的追擊動作；召喚炸彈傷害不再可被殺星迴避姿態閃避。",
              "超越（卡爾加姆）：流血區域不再可用劍星波動鎧甲移除；破滅的蓝光更名為擴散本能。",
              "墮落大娃要塞（格里奧薩）：修復毀滅風暴期間投射物不發射；修復拳星集中格擋第3規格施法次數顯示。",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "範圍：本次更新不包含什麼",
            paragraphs: [
              "8月5日更新說明沒有職業平衡，也沒有新副本。以上價格為韓服標價，不構成全球版定價。",
              "對全球版玩家而言，已確認節點仍是9月30日與創始人包綁定的搶先體驗；在官方全球公告之前，韓服活動與價格應視為地區資訊。",
            ],
          },
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 6, {
        eyebrow: "업데이트 브리핑",
        title: "AION2 8월 5일 업데이트: 데바 룩 체인지 위크와 수정 사항",
        description:
          "8월 5일 AION2 업데이트로 데바 룩 체인지 위크(100큐나 염색), 무료 무늬 7종, 펫 티켓 구매 제한, 보스 수정과 어비스 보상이 추가됐습니다.",
        intro:
          "AION2 한국 서비스가 정기점검을 통해 8월 5일 업데이트를 적용했고 공식 업데이트 노트가 공개됐습니다. 이번 주기는 신규 전투 콘텐츠 대신 외형, 편의성과 수정에 초점을 맞춥니다. 아래 일정은 한국 공지를 기준이며 이후 공식 수정이 우선합니다.",
        sourceNote:
          "출처: AION2 한국 8월 5일 공식 업데이트 노트이며 독립 영문 요약과 교차 확인했습니다. 시각은 KST 기준이고 한국 서비스 내용은 미래 글로벌 규칙을 확정하지 않습니다.",
        keywords: ["AION2 8월 5일 업데이트", "데바 룩 체인지 위크", "AION2 염색 할인", "AION2 펫 자동 줍기 티켓", "AION2 패치 노트"],
        sections: [
          {
            id: "look-change-week",
            title: "데바 룩 체인지 위크: 8월 5일~19일",
            paragraphs: [
              "8월 5일 점검 후부터 8월 19일 점검 전까지 옷장 장식 비용이 부위당 200큐나에서 100큐나로 50% 할인되며 이벤트 기간에는 시도 횟수 제한이 없습니다. 염색, 재질, 무늬, 무늬 색상은 [메뉴] > [옷장] > 장식에서 변경할 수 있습니다.",
              "같은 업데이트로 [옷장] > [장식] > [무늬]에 무료 무늬 7종이 추가됐습니다: 가로 줄무늬, 세로 줄무늬, 별, 얼룩말, 다이아몬드 체크, 소 무늬, 하운드투스.",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "의상 세트, 무기 외형, 날개",
            paragraphs: [
              "같은 기간 의상 4세트가 판매됩니다: 화이트 크리스마스와 블랑 누아르는 각 49,000원 또는 교환권 1장, 휴식의 목욕 시간과 눈의 검은 바람은 각 2,500큐나 또는 교환권입니다. 겨울밤 서리꽃 무기 외형은 19,000원 또는 무기 외형 교환권 1장이며 9개 직업 버전으로 출시됩니다.",
              "날개 2종도 캐릭터당 1회 구매할 수 있습니다: 얼음 서리 날개 29,000원, 빛의 파동 날개 1,500큐나. 해당 외형은 전부 거래·삭제가 불가하며 의상과 무기 외형은 염색 가능하지만 날개 2종은 염색할 수 없습니다. 현금 구매는 마일리지가 적립되고 교환권 구매는 적립되지 않습니다.",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "펫 티켓 제한, 전투 수정과 보상",
            paragraphs: [
              "펫 자동 줍기 티켓(30일)은 캐릭터당 월 2회 구매로 제한되며, 귀속 버전은 일반 상인에게 원래 가격 그대로 귀속 키나로 판매할 수 있습니다.",
              "이전 문제에 대한 보상도 포함됐습니다: 7월 1일 레벨 차 페널티로 사라진 어비스 회랑 포인트는 회랑 체류 시간에 비례해 복원되며, 누락된 소프트 버니 인형 의상 교환권은 대상 이용자에게 지급됩니다.",
            ],
            bullets: [
              "나이트메어 입장 시 템플러 노블 아머와 챈터 가디언 블레싱이 사라지던 문제가 제거됐습니다.",
              "생츄어리(폴리머 바곳): 누락된 후속 공격이 복구됐고, 소환 폭탄 피해가 어쌔신 회피 자세로 회피되던 문제가 수정됐습니다.",
              "초월(가르가움): 출혈 지대가 글래디에이터 웨이브 아머로 제거되지 않도록 변경됐고, 파괴의 푸른 빛은 확장되는 원시로 이름이 바뀌었습니다.",
              "몰락한 대바 요새(그리오사): 파괴의 폭풍 중 투사체가 발사되지 않던 문제와 권성 집중 방어 3스펙 시전 횟수 표시가 수정됐습니다.",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "범위: 이번 업데이트에 없는 것",
            paragraphs: [
              "8월 5일 노트에는 직업 밸런스 변경도 신규 던전도 없습니다. 위 가격은 한국 서비스 기준이며 글로벌 가격을 정하지 않습니다.",
              "글로벌 이용자에게 확인된 일정은 여전히 파운더스 팩과 연결된 9월 30일 얼리 액세스입니다. 글로벌 공지가 나오기 전까지 한국 서비스 이벤트와 가격은 지역 정보로 취급하세요.",
            ],
          },
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 6, {
        eyebrow: "アップデート速報",
        title: "AION2 8月5日更新：デヴァ・ルック・チェンジウィークと修正",
        description:
          "8月5日のAION2更新でデヴァ・ルック・チェンジウィーク（100クーナ染色）、無料パターン7種、ペットチケット制限、ボス修正、アビス補償が追加。",
        intro:
          "AION2韓国サービスは定期メンテナンスで8月5日更新を適用し、公式ノートが公開されました。今回は戦闘コンテンツではなくファッション・利便性・修正が中心です。以下の時刻は韓国告知基準で、以降の公式修正が優先します。",
        sourceNote:
          "出典：AION2韓国8月5日公式アップデートノート。独立系英語サマリーと相互確認済み。時刻はKST。韓国サービスの内容は将来のグローバル版ルールを保証しません。",
        keywords: ["AION2 8月5日アップデート", "デヴァ・ルック・チェンジウィーク", "AION2 染色割引", "AION2 ペット自動回収チケット", "AION2 パッチノート"],
        sections: [
          {
            id: "look-change-week",
            title: "デヴァ・ルック・チェンジウィーク：8月5日〜19日",
            paragraphs: [
              "8月5日メンテナンス後から8月19日メンテナンス前まで、衣装ダンスの装飾費用が部位あたり200クーナから100クーナへ半額になり、期間中は試行回数制限がありません。染色・素材・パターン・パターン色は [メニュー] > [衣装ダンス] > 装飾 で変更できます。",
              "同じ更新で [衣装ダンス] > [装飾] > [パターン] に無料パターン7種が追加されました：横縞、縦縞、スター、ゼブラ、ダイヤチェック、カウプリント、ハウンドトゥース。",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "衣装セット・武器外見・翼",
            paragraphs: [
              "同期間に衣装4セットが販売されます：ホワイトクリスマスとブラン・ノワールは各49,000ウォンまたは交換券1枚、休息の入浴時間と雪の黒風は各2,500クーナまたは交換券。冬夜霜花武器外見は19,000ウォンまたは武器外見交換券1枚で、9クラス分が用意されます。",
              "翼2種も各キャラクター1回限りで購入可能：アイスフロストウィング29,000ウォン、ライトウェイブウィング1,500クーナ。いずれも取引・削除不可で、衣装と武器外見は染色可能ですが翼2種は染色不可です。ウォン購入はマイレージ対象、交換券購入は対象外。",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "ペットチケット制限・戦闘修正・補償",
            paragraphs: [
              "ペット自動回収チケット（30日）はキャラクターあたり月2回までの購入制限となり、帰属版は一般商人に元値のまま帰属キナで売却できます。",
              "過去の問題への補償も含まれます：7月1日にレベル差ペナルティで失われたアビス回廊ポイントは回廊滞在時間に比例して補填され、欠落していたソフトバニードール衣装交換券は対象者に送付されます。",
            ],
            bullets: [
              "ナイトメア入場時にテンplarノーブルアーマーとチャンターガーディアンブレッシングが消える問題を解消。",
              "聖所（ポリマーバゴット）：欠落していた追撃を復旧。召喚爆弾のダメージがアサシン回避姿勢で回避できる問題を修正。",
              "超越（ガルガウム）：出血地帯がグラディエーターウェイブアーマーで除去できないよう変更。破壊の青い光は拡散する原初へ改名。",
              "堕落したデーバ要塞（グリオーサ）：破壊の嵐中に投射物が発射されない問題と、ブローラー集中ブロック第3スペックの詠唱回数表示を修正。",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "範囲：今回の更新に含まれないもの",
            paragraphs: [
              "8月5日ノートに職業バランス変更も新規ダンジョンもありません。上記価格は韓国サービスのもので、グローバル版の価格設定ではありません。",
              "グローバル版プレイヤーにとって確認済みの節目は9月30日のファウンダーズパック早期アクセスのままです。グローバル告知があるまで、韓国サービスのイベントと価格は地域情報として扱ってください。",
            ],
          },
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 6, {
        eyebrow: "BREF DE MISE À JOUR",
        title: "Mise à jour AION2 du 5 août : Deva Look Change Week et correctifs",
        description:
          "La mise à jour AION2 du 5 août ajoute la Deva Look Change Week (teinture à 100 Quna), sept motifs gratuits, des limites de ticket familier et des correctifs.",
        intro:
          "Le service coréen d’AION2 a appliqué sa mise à jour du 5 août lors de la maintenance, et les notes officielles sont publiées. Ce cycle privilégie la mode, la qualité de vie et les corrections plutôt que le combat ; les horaires suivent les avis coréens.",
        sourceNote:
          "Sources : notes officielles coréennes du 5 août, recoupées avec des résumés anglais indépendants. Heures en KST ; les détails coréens ne confirment pas les règles globales futures.",
        keywords: ["mise à jour AION2 5 août", "Deva Look Change Week", "teinture AION2", "ticket familier AION2", "notes de patch AION2"],
        sections: [
          {
            id: "look-change-week",
            title: "Deva Look Change Week du 5 au 19 août",
            paragraphs: [
              "De la maintenance du 5 août à celle du 19 août, le coût de décoration de la garde-robe passe de 200 à 100 Quna par pièce, soit -50 %, sans limite de tentatives pendant l’événement. Teinture, matière, motif et couleur de motif se règlent dans [Menu] > [Garde-robe] > Décorer.",
              "La même mise à jour ajoute sept motifs gratuits dans [Garde-robe] > [Décorer] > [Motifs] : rayures horizontales, rayures verticales, étoile, zèbre, losanges, vache et pied-de-poule.",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "Costumes, skins d’armes et ailes",
            paragraphs: [
              "Quatre ensembles de costumes sont en vente : White Christmas et Blanc Noir à 49 000 KRW (ou un ticket d’échange chacun), Bath Time of Rest et Snow Black Wind à 2 500 Quna (ou ticket). Le skin d’arme Winter Night Frost Flower coûte 19 000 KRW ou un ticket d’apparence d’arme, en neuf variantes de classe.",
              "Deux ailes sont disponibles une fois par personnage : Ice Frost Wings à 29 000 KRW et Wings of the Light Wave à 1 500 Quna. Tous ces cosmétiques sont non échangeables et non supprimables ; costumes et skins d’armes sont teintables, pas les deux ailes. Les achats en KRW rapportent du Mileage, pas les achats par ticket.",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "Tickets de familier, correctifs et compensation",
            paragraphs: [
              "Le ticket Pet Auto-Pickup (30 jours) est désormais limité à deux achats par personnage et par mois ; sa version liée peut être vendue aux marchands généraux contre de la kinah liée au prix d’origine.",
              "Des compensations sont incluses : les points du Couloir de l’Abîme perdus le 1er juillet à cause de la pénalité d’écart de niveau sont restaurés au prorata du temps passé dans le couloir, et les tickets de tenue Soft Bunny Doll manquants sont envoyés aux joueurs concernés.",
            ],
            bullets: [
              "Le Cauchemar ne retire plus Noble Armor du Templier et Guardian Blessing du Chanteur à l’entrée.",
              "Sanctuaire (Polymer Bagot) : attaque de suivi restaurée ; les dégâts de bombe invoquée ne peuvent plus être esquivés par Evasion Stance de l’Assassin.",
              "Transcendance (Gargaum) : la zone de saignement ne peut plus être retirée par Wave Armor du Gladiateur ; Blue Light of Destruction renommée Expanding Primal.",
              "Citadelle du Déchu (Griosa) : projectiles corrigés pendant Storm of Destruction ; affichage du nombre d’incantations de Focused Block du Brawler corrigé.",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "Portée : ce que la mise à jour ne change pas",
            paragraphs: [
              "Les notes du 5 août ne contiennent ni équilibrage de classe ni nouveau donjon. Les prix indiqués sont ceux du service coréen et ne fixent pas les prix globaux.",
              "Pour les joueurs globaux, l’échéance confirmée reste l’accès anticipé du 30 septembre lié aux Founder’s Packs ; considérez les événements et prix coréens comme régionaux jusqu’à un avis global.",
            ],
          },
        ],
      }),
      de: articleCopy(newsLabels, "de", 6, {
        eyebrow: "UPDATE-BERICHT",
        title: "AION2-Update vom 5. August: Deva Look Change Week und Fixes",
        description:
          "Das AION2-Update vom 5. August bringt die Deva Look Change Week mit 100-Quna-Färben, sieben Gratis-Muster, Pet-Ticket-Limits, Boss-Fixes und Kompensation.",
        intro:
          "Der koreanische AION2-Dienst hat das Update vom 5. August in der regulären Wartung eingespielt, die offiziellen Notes sind veröffentlicht. Dieser Zyklus konzentriert sich auf Mode, Komfort und Korrekturen statt auf neue Kampfinhalte; Zeiten folgen den koreanischen Hinweisen.",
        sourceNote:
          "Quellen: offizielle koreanische AION2-Update-Hinweise vom 5. August, mit unabhängigen englischen Zusammenfassungen abgeglichen. Zeiten in KST; koreanische Details bestätigen keine künftigen globalen Regeln.",
        keywords: ["AION2 Update 5. August", "Deva Look Change Week", "AION2 Färberabatt", "AION2 Pet-Auto-Pickup-Ticket", "AION2 Patch Notes"],
        sections: [
          {
            id: "look-change-week",
            title: "Deva Look Change Week vom 5. bis 19. August",
            paragraphs: [
              "Von der Wartung am 5. August bis zur Wartung am 19. August sinken die Dekorationskosten der Garderobe von 200 auf 100 Quna pro Teil, also um 50 Prozent, ohne Versuchslimit während des Events. Änderungen an Farbe, Material, Muster und Musterfarbe erfolgen über [Menü] > [Garderobe] > Dekorieren.",
              "Dasselbe Update fügt unter [Garderobe] > [Dekorieren] > [Muster] sieben kostenlose Muster hinzu: Querstreifen, Längsstreifen, Stern, Zebra, Rautenkaro, Kuhmuster und Hahnentritt.",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "Kostümsets, Waffen-Skins und Flügel",
            paragraphs: [
              "Vier Kostümsets sind im selben Zeitraum erhältlich: White Christmas und Blanc Noir für je 49.000 KRW (oder ein Tauschticket), Bath Time of Rest und Snow Black Wind für je 2.500 Quna (oder Ticket). Der Waffen-Skin Winter Night Frost Flower kostet 19.000 KRW oder ein Waffenerschein-Ticket und erscheint in neun Klassenvarianten.",
              "Zwei Flügel gibt es einmal pro Charakter: Ice Frost Wings für 29.000 KRW und Wings of the Light Wave für 1.500 Quna. Alle genannten Kosmetika sind unhandelbar und unlöschbar; Kostüme und Waffen-Skins sind färbbar, die beiden Flügel nicht. KRW-Käufe sammeln Mileage, Ticket-Käufe nicht.",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "Pet-Ticket-Limits, Kampf-Fixes und Kompensation",
            paragraphs: [
              "Das Pet-Auto-Pickup-Ticket (30 Tage) ist jetzt auf zwei Käufe pro Charakter und Monat begrenzt; die gebundene Version kann zum Originalpreis in gebundenem Kinah an Händler verkauft werden.",
              "Auch Kompensation ist enthalten: Abyss-Korridor-Punkte, die am 1. Juli durch die Level-Differenz-Strafe verloren gingen, werden anteilig zur Korridorzeit erstattet; fehlende Soft-Bunny-Doll-Outfit-Tauschtickets werden an betroffene Spieler verschickt.",
            ],
            bullets: [
              "Der Alptraum entfernt beim Betreten nicht mehr Noble Armor des Templers und Guardian Blessing des Chanters.",
              "Sanktuarium (Polymer Bagot): fehlender Folgeangriff wiederhergestellt; Bombenschaden kann nicht mehr durch Evasion Stance des Assassins ausgewichen werden.",
              "Transzendenz (Gargaum): Blutungszone kann nicht mehr durch Wave Armor des Gladiators entfernt werden; Blue Light of Destruction heißt jetzt Expanding Primal.",
              "Zitadelle des gefallenen Daeva (Griosa): Projektile während Storm of Destruction korrigiert; Brawler-Focused-Block-Zauberanzeige für Spez 3 korrigiert.",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "Umfang: Was dieses Update nicht ändert",
            paragraphs: [
              "Die Notes vom 5. August enthalten weder Klassenbalance noch neue Dungeons. Die Preise sind koreanische Listenpreise und setzen keine globalen Preise.",
              "Für globale Spieler bleibt der bestätigte Meilenstein der Early Access am 30. September mit Founder’s Packs; koreanische Events und Preise sind bis zu einer globalen Ankündigung regional einzuordnen.",
            ],
          },
        ],
      }),
      es: articleCopy(newsLabels, "es", 6, {
        eyebrow: "RESUMEN DE ACTUALIZACIÓN",
        title: "Actualización de AION2 del 5 de agosto: Deva Look Change Week",
        description:
          "La actualización de AION2 del 5 de agosto trae la Deva Look Change Week con tinte a 100 Quna, siete patrones gratis, límites del ticket de mascota y mejoras.",
        intro:
          "El servicio coreano de AION2 aplicó la actualización del 5 de agosto durante el mantenimiento y publicó las notas oficiales. El ciclo se centra en moda, calidad de vida y correcciones; los horarios siguen los avisos coreanos.",
        sourceNote:
          "Fuentes: notas oficiales coreanas del 5 de agosto, contrastadas con resúmenes independientes en inglés. Horas en KST; los detalles coreanos no confirman reglas globales futuras.",
        keywords: ["actualización AION2 5 de agosto", "Deva Look Change Week", "tinte AION2", "ticket de mascota AION2", "notas de parche AION2"],
        sections: [
          {
            id: "look-change-week",
            title: "Deva Look Change Week: del 5 al 19 de agosto",
            paragraphs: [
              "Desde el mantenimiento del 5 de agosto hasta el del 19 de agosto, el coste de decoración del vestuario baja de 200 a 100 Quna por pieza (50 % de descuento) y no hay límite de intentos durante el evento. Tinte, material, patrón y color del patrón se ajustan en [Menú] > [Vestuario] > Decorar.",
              "La misma actualización añade siete patrones gratuitos en [Vestuario] > [Decorar] > [Patrones]: rayas horizontales, rayas verticales, estrella, cebra, rombos, vaca y pata de gallo.",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "Conjuntos, skins de arma y alas",
            paragraphs: [
              "Cuatro conjuntos están a la venta en el mismo periodo: White Christmas y Blanc Noir por 49.000 KRW (o un ticket de canje cada uno), más Bath Time of Rest y Snow Black Wind por 2.500 Quna (o ticket). El skin de arma Winter Night Frost Flower cuesta 19.000 KRW o un ticket de apariencia de arma, con nueve variantes de clase.",
              "También hay dos alas, una vez por personaje: Ice Frost Wings por 29.000 KRW y Wings of the Light Wave por 1.500 Quna. Todos los cosméticos listados son intransferibles e indestructibles; los trajes y skins de arma se pueden teñir, las dos alas no. Las compras en KRW suman Mileage, las de ticket no.",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "Límites del ticket, correcciones y compensación",
            paragraphs: [
              "El ticket Pet Auto-Pickup (30 días) queda limitado a dos compras por personaje y mes; su versión ligada puede venderse a mercaderes generales por kinah ligada al precio original.",
              "Se incluye compensación: los puntos del Corredor del Abismo perdidos el 1 de julio por la penalización de diferencia de nivel se restauran en proporción al tiempo en el corredor, y los tickets de intercambio del traje Soft Bunny Doll faltantes se envían a los jugadores afectados.",
            ],
            bullets: [
              "Nightmare ya no elimina Noble Armor del Templar ni Guardian Blessing del Chanter al entrar.",
              "Sanctuary (Polymer Bagot): ataque de seguimiento restaurado; el daño de la bomba invocada ya no puede esquivarse con Evasion Stance del Asesino.",
              "Transcendence (Gargaum): la zona de sangrado ya no puede retirarse con Wave Armor del Gladiador; Blue Light of Destruction pasa a llamarse Expanding Primal.",
              "Citadel of the Fallen Daeva (Griosa): proyectiles corregidos durante Storm of Destruction; corregida la visualización de lanzamientos de Focused Block del Brawler.",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "Alcance: lo que esta actualización no cambia",
            paragraphs: [
              "Las notas del 5 de agosto no incluyen equilibrio de clases ni mazmorras nuevas. Los precios son del servicio coreano y no fijan precios globales.",
              "Para los jugadores globales, el hito confirmado sigue siendo el acceso anticipado del 30 de septiembre ligado a los Founder’s Packs; los eventos y precios coreanos son información regional hasta un aviso global.",
            ],
          },
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 6, {
        eyebrow: "RESUMO DA ATUALIZAÇÃO",
        title: "Atualização de AION2 de 5 de agosto: Deva Look Change Week",
        description:
          "A atualização de AION2 de 5 de agosto traz a Deva Look Change Week com tingimento a 100 Quna, sete padrões grátis, limites do ticket de pet e correções.",
        intro:
          "O serviço coreano de AION2 aplicou a atualização de 5 de agosto na manutenção e publicou as notas oficiais. O ciclo foca em moda, qualidade de vida e correções; os horários seguem os avisos coreanos.",
        sourceNote:
          "Fontes: notas oficiais coreanas de 5 de agosto, conferidas com resumos independentes em inglês. Horários em KST; detalhes coreanos não confirmam regras globais futuras.",
        keywords: ["atualização AION2 5 de agosto", "Deva Look Change Week", "tintura AION2", "ticket de pet AION2", "notas de patch AION2"],
        sections: [
          {
            id: "look-change-week",
            title: "Deva Look Change Week: 5 a 19 de agosto",
            paragraphs: [
              "Da manutenção de 5 de agosto até a de 19 de agosto, o custo de decoração do guarda-roupa cai de 200 para 100 Quna por peça (50% de desconto), sem limite de tentativas durante o evento. Tintura, material, padrão e cor do padrão ficam em [Menu] > [Guarda-roupa] > Decorar.",
              "A mesma atualização adiciona sete padrões gratuitos em [Guarda-roupa] > [Decorar] > [Padrões]: listras horizontais, listras verticais, estrela, zebra, losangos, vaca e pied-de-poule.",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "Conjuntos, skins de arma e asas",
            paragraphs: [
              "Quatro conjuntos estão à venda no mesmo período: White Christmas e Blanc Noir por 49.000 KRW (ou um ticket de troca cada), além de Bath Time of Rest e Snow Black Wind por 2.500 Quna (ou ticket). O skin de arma Winter Night Frost Flower custa 19.000 KRW ou um ticket de aparência de arma, em nove variantes de classe.",
              "Duas asas também ficam disponíveis uma vez por personagem: Ice Frost Wings por 29.000 KRW e Wings of the Light Wave por 1.500 Quna. Todos os cosméticos listados são inegociáveis e não podem ser deletados; trajes e skins de arma podem ser tingidos, as duas asas não. Compras em KRW geram Mileage, compras com ticket não.",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "Limites do ticket, correções e compensação",
            paragraphs: [
              "O Pet Auto-Pickup Ticket (30 dias) agora é limitado a duas compras por personagem por mês; a versão vinculada pode ser vendida a mercadores gerais por kinah vinculada pelo preço original.",
              "A compensação está incluída: os pontos do Corredor do Abismo perdidos em 1º de julho pela penalidade de diferença de nível são restaurados proporcionalmente ao tempo no corredor, e os tickets de troca da fantasia Soft Bunny Doll faltantes estão sendo enviados aos afetados.",
            ],
            bullets: [
              "O Nightmare não remove mais Noble Armor do Templar e Guardian Blessing do Chanter na entrada.",
              "Sanctuary (Polymer Bagot): ataque de acompanhamento restaurado; dano da bomba invocada não pode mais ser esquivado com Evasion Stance do Assassin.",
              "Transcendence (Gargaum): a zona de sangramento não pode mais ser removida por Wave Armor do Gladiator; Blue Light of Destruction renomeada para Expanding Primal.",
              "Citadel of the Fallen Daeva (Griosa): projéteis corrigidos durante Storm of Destruction; corrigida a contagem de conjuração do Focused Block do Brawler.",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "Escopo: o que esta atualização não muda",
            paragraphs: [
              "As notas de 5 de agosto não trazem balanceamento de classes nem novas masmorras. Os preços são do serviço coreano e não definem preços globais.",
              "Para jogadores globais, o marco confirmado continua sendo o acesso antecipado de 30 de setembro com os Founder’s Packs; eventos e preços coreanos são informação regional até um aviso global.",
            ],
          },
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 6, {
        eyebrow: "СВОДКА ОБНОВЛЕНИЯ",
        title: "Обновление AION2 от 5 августа: Deva Look Change Week и фиксы",
        description:
          "Обновление AION2 от 5 августа добавляет Deva Look Change Week (покраска за 100 Quna), семь бесплатных узоров, лимиты билетов питомца и исправления.",
        intro:
          "Корейский сервис AION2 установил обновление 5 августа во время плановых техработ, официальные примечания опубликованы. Цикл сосредоточен на моде, удобстве и исправлениях, а не на боевом контенте; время указано по корейским анонсам.",
        sourceNote:
          "Источники: официальные корейские примечания к обновлению от 5 августа, сверенные с независимыми англоязычными сводками. Время в KST; корейские детали не подтверждают будущие глобальные правила.",
        keywords: ["обновление AION2 5 августа", "Deva Look Change Week", "покраска AION2", "билет питомца AION2", "патч-ноуты AION2"],
        sections: [
          {
            id: "look-change-week",
            title: "Deva Look Change Week: 5–19 августа",
            paragraphs: [
              "С техработ 5 августа до техработ 19 августа стоимость декорирования гардероба снижается с 200 до 100 Quna за деталь (скидка 50 %), без ограничения попыток на время события. Краска, материал, узор и цвет узора меняются в [Меню] > [Гардероб] > Декор.",
              "То же обновление добавляет семь бесплатных узоров в [Гардероб] > [Декор] > [Узоры]: горизонтальная полоска, вертикальная полоска, звезда, зебра, ромбы, коровий принт и «гусиная лапка».",
            ],
          },
          {
            id: "cosmetics-lineup",
            title: "Костюмы, скины оружия и крылья",
            paragraphs: [
              "В этот же период продаются четыре набора костюмов: White Christmas и Blanc Noir по 49 000 KRW (или один обменный билет каждый), Bath Time of Rest и Snow Black Wind по 2 500 Quna (или билет). Скины оружия Winter Night Frost Flower стоят 19 000 KRW или один билет внешности оружия и выходят в девяти классовых вариантах.",
              "Двое крыльев доступны один раз на персонажа: Ice Frost Wings за 29 000 KRW и Wings of the Light Wave за 1 500 Quna. Вся перечисленная косметика не подлежит обмену и удалению; костюмы и скины оружия красятся, оба вида крыльев — нет. Покупки за KRW дают Mileage, покупки за билеты — нет.",
            ],
          },
          {
            id: "pet-ticket-and-fixes",
            title: "Лимиты билетов, боевые фиксы и компенсации",
            paragraphs: [
              "Билет авто-подбора питомца (30 дней) теперь ограничен двумя покупками на персонажа в месяц; привязанную версию можно продать обычным торговцам за привязанную кинах по исходной цене.",
              "Включены компенсации: очки Коридора Бездны, потерянные 1 июля из-за штрафа разницы уровней, восстанавливаются пропорционально времени в коридоре; недостающие обменные билеты костюма Soft Bunny Doll отправляются пострадавшим игрокам.",
            ],
            bullets: [
              "Nightmare больше не снимает Noble Armor у Тамплиера и Guardian Blessing у Певчего при входе.",
              "Sanctuary (Polymer Bagot): восстановлена пропущенная атака; урон призванной бомбы больше нельзя уклониться Evasion Stance Ассасина.",
              "Transcendence (Gargaum): зона кровотечения больше не снимается Wave Armor Гладиатора; Blue Light of Destruction переименована в Expanding Primal.",
              "Citadel of the Fallen Daeva (Griosa): исправлены снаряды во время Storm of Destruction; исправлено отображение количества кастов Focused Block у Браулера.",
            ],
          },
          {
            id: "scope-and-boundary",
            title: "Охват: чего это обновление не меняет",
            paragraphs: [
              "В примечаниях от 5 августа нет баланса классов и новых подземелий. Цены указаны для корейского сервиса и не определяют глобальные.",
              "Для глобальных игроков подтверждённой вехой остаётся ранний доступ 30 сентября с Founder’s Packs; корейские события и цены до глобального анонса — региональная информация.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "deva-look-change-week-guide",
    schemaType: "Article",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-08",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [krAugust5UpdateNoteSource, aion2tAugust5Source],
    heroImage: lookChangeWeekHero,
    related: [
      { kind: "content", section: "news", slug: "august-5-2026-deva-look-change-week-update" },
      { kind: "content", section: "guides", slug: "character-presets-style-shop" },
      { kind: "content", section: "guides", slug: "wing-enhancement" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "EVENT GUIDE",
        title: "Deva Look Change Week guide: dyeing, patterns, limits",
        description:
          "How Deva Look Change Week works in AION2: the August 5–19 window, 100-Quna dyeing, unlimited attempts, seven free patterns, and what cannot be dyed.",
        intro:
          "Deva Look Change Week is the fashion event running from the August 5 maintenance to the August 19 maintenance on the Korean service. This guide explains where the decorate menu lives, what the discount changes, and which items are excluded before you spend Quna.",
        sourceNote:
          "Event guide based on the official AION2 Korea August 5 update notes; schedule and prices follow the Korean notice and may differ by region or later revision.",
        keywords: ["Deva Look Change Week", "AION2 dyeing guide", "AION2 wardrobe patterns", "AION2 Quna dye cost"],
        sections: [
          {
            id: "event-window",
            title: "When the event runs and what changes",
            paragraphs: [
              "The event starts with the August 5 maintenance and ends with the August 19 maintenance (KST). During this window, wardrobe decoration costs 100 Quna per part instead of 200, and the usual attempt limit is lifted, so recoloring can be retried freely.",
              "Outside the event window, standard decoration costs and limits return. If you plan a full set, finish dyeing before the August 19 maintenance.",
            ],
          },
          {
            id: "decorate-workflow",
            title: "Where to change dye, material, and pattern",
            paragraphs: [
              "All decoration options live in one place: the Decorate tab of the wardrobe. Each confirmed change is priced per part, which is why the half-price window matters.",
            ],
            steps: [
              { title: "Open the wardrobe", description: "Go to [Menu] > [Wardrobe], then open the Decorate tab for the equipped appearance." },
              { title: "Choose one property", description: "Pick dye, material, pattern, or pattern color; each change is priced per part." },
              { title: "Preview and apply", description: "Preview the result on your character, then confirm; during the event each attempt costs 100 Quna." },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "Seven patterns are free with the update",
            paragraphs: [
              "The August 5 update adds seven patterns under [Wardrobe] > [Decorate] > [Patterns] at no cost:",
              "Patterns can be combined with dye and material changes, which is what makes the discounted window useful for full-set experiments.",
            ],
            bullets: [
              "Horizontal stripes",
              "Vertical stripes",
              "Star",
              "Zebra",
              "Diamond check",
              "Cow print",
              "Houndstooth",
            ],
          },
          {
            id: "limits-and-tips",
            title: "Limits, exclusions, and planning tips",
            paragraphs: [
              "Costumes and weapon skins sold with the update are dyeable, but the two new wings — Ice Frost Wings and Wings of the Light Wave — cannot be dyed. All event cosmetics are untradeable and undeletable, so buy them for your own character.",
            ],
            bullets: [
              "Check your Quna balance before starting; unlimited attempts add up quickly.",
              "Dye one part first to confirm the look before applying it to a full set.",
              "Ticket-purchased cosmetics do not earn Mileage; KRW purchases do on the Korean service.",
            ],
            faq: [
              {
                question: "How long does Deva Look Change Week last?",
                answer: "From the August 5 maintenance to the August 19 maintenance on the Korean service (KST).",
              },
              {
                question: "How much does dyeing cost during the event?",
                answer: "100 Quna per part, half the normal 200, with no attempt limit during the window.",
              },
              {
                question: "Are the new patterns really free?",
                answer: "Yes. The seven patterns added on August 5 are free under [Wardrobe] > [Decorate] > [Patterns].",
              },
            ],
          },
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "活动指南",
        title: "德巴外观变更周指南：染色、花纹与限制",
        description:
          "AION2 德巴外观变更周玩法详解：8月5日至19日窗口、100库纳染色、不限次数、7款免费花纹，以及哪些物品不能染色。",
        intro:
          "德巴外观变更周是韩服8月5日维护后至8月19日维护前的外观活动。本指南说明装饰菜单位置、折扣到底改变了什么，以及哪些物品不参与，帮你在花库纳前做好准备。",
        sourceNote:
          "活动指南基于 AION2 韩国服8月5日官方更新说明；时间与价格以韩服公告为准，可能因地区或后续修订而不同。",
        keywords: ["德巴外观变更周", "AION2 染色指南", "AION2 衣柜花纹", "AION2 库纳染色费用"],
        sections: [
          {
            id: "event-window",
            title: "活动时间与变化内容",
            paragraphs: [
              "活动自8月5日维护后开始，至8月19日维护前结束（KST）。窗口期内衣柜装饰费用由每部位200库纳降为100库纳，并取消次数限制，可自由反复尝试。",
              "活动结束后恢复原价与次数限制。若想整套染色，请在8月19日维护前完成。",
            ],
          },
          {
            id: "decorate-workflow",
            title: "在哪里改染色、材质与花纹",
            paragraphs: [
              "所有装饰选项集中在衣柜的装饰页签。每次确认修改按部位计费，这也是半价窗口重要的原因。",
            ],
            steps: [
              { title: "打开衣柜", description: "进入【菜单】>【衣柜】，打开当前装备外观的装饰页签。" },
              { title: "选择一项属性", description: "选择染色、材质、花纹或花纹颜色；每项修改按部位计费。" },
              { title: "预览并确认", description: "在角色身上预览后确认；活动期间每次尝试消耗100库纳。" },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "7款花纹随更新免费开放",
            paragraphs: [
              "8月5日更新在【衣柜】>【装饰】>【花纹】新增7款免费花纹：",
              "花纹可与染色、材质修改叠加使用，这正是半价窗口适合整套实验的原因。",
            ],
            bullets: ["横条纹", "竖条纹", "星星", "斑马纹", "菱形格", "奶牛纹", "千鸟格"],
          },
          {
            id: "limits-and-tips",
            title: "限制、例外与规划建议",
            paragraphs: [
              "随更新上架的时装与武器外观可染色，但两款新翅膀——冰霜之翼与光波之翼——不可染色。活动外观均不可交易、不可销毁，请为自己的角色购买。",
            ],
            bullets: [
              "开始前先确认库纳余额；不限次数时消耗会很快累积。",
              "先染一个部位确认效果，再推广到整套。",
              "兑换券购买的外观不累计里程；韩服现金购买累计。",
            ],
            faq: [
              { question: "德巴外观变更周持续多久？", answer: "韩服8月5日维护后至8月19日维护前（KST）。" },
              { question: "活动期间染色要多少库纳？", answer: "每部位100库纳，是平常200库纳的一半，期间不限次数。" },
              { question: "新花纹真的免费吗？", answer: "是的。8月5日新增的7款花纹可在【衣柜】>【装饰】>【花纹】免费使用。" },
            ],
          },
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "活動指南",
        title: "德巴外觀變更週指南：染色、花紋與限制",
        description:
          "AION2 德巴外觀變更週玩法詳解：8月5日至19日窗口、100庫納染色、不限次數、7款免費花紋，以及哪些物品不能染色。",
        intro:
          "德巴外觀變更週是韓服8月5日維護後至8月19日維護前的外觀活動。本指南說明裝飾選单位置、折扣到底改變了什麼，以及哪些物品不參與，讓你在花庫納前做好準備。",
        sourceNote:
          "活動指南基於 AION2 韓國服8月5日官方更新說明；時間與價格以韓服公告為準，可能因地區或後續修訂而不同。",
        keywords: ["德巴外觀變更週", "AION2 染色指南", "AION2 衣櫃花紋", "AION2 庫納染色費用"],
        sections: [
          {
            id: "event-window",
            title: "活動時間與變化內容",
            paragraphs: [
              "活動自8月5日維護後開始，至8月19日維護前結束（KST）。窗口期內衣櫃裝飾費用由每部位200庫納降為100庫納，並取消次數限制，可自由反覆嘗試。",
              "活動結束後恢復原價與次數限制。若想整套染色，請在8月19日維護前完成。",
            ],
          },
          {
            id: "decorate-workflow",
            title: "在哪裡改染色、材質與花紋",
            paragraphs: [
              "所有裝飾選項集中在衣櫃的裝飾頁籤。每次確認修改依部位計費，這也是半價窗口重要的原因。",
            ],
            steps: [
              { title: "開啟衣櫃", description: "進入【選單】>【衣櫃】，開啟目前裝備外觀的裝飾頁籤。" },
              { title: "選擇一項屬性", description: "選擇染色、材質、花紋或花紋顏色；每項修改依部位計費。" },
              { title: "預覽並確認", description: "在角色身上預覽後確認；活動期間每次嘗試消耗100庫納。" },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "7款花紋隨更新免費開放",
            paragraphs: [
              "8月5日更新在【衣櫃】>【裝飾】>【花紋】新增7款免費花紋：",
              "花紋可與染色、材質修改疊加使用，這正是半價窗口適合整套實驗的原因。",
            ],
            bullets: ["橫條紋", "直條紋", "星星", "斑馬紋", "菱形格", "乳牛紋", "千鳥格"],
          },
          {
            id: "limits-and-tips",
            title: "限制、例外與規劃建議",
            paragraphs: [
              "隨更新上架的時裝與武器外觀可染色，但兩款新翅膀——冰霜之翼與光波之翼——不可染色。活動外觀均不可交易、不可銷毀，請為自己的角色購買。",
            ],
            bullets: [
              "開始前先確認庫納餘額；不限次數時消耗會快速累積。",
              "先染一個部位確認效果，再推廣到整套。",
              "兌換券購買的外觀不累計里程；韓服現金購買累計。",
            ],
            faq: [
              { question: "德巴外觀變更週持續多久？", answer: "韓服8月5日維護後至8月19日維護前（KST）。" },
              { question: "活動期間染色要多少庫納？", answer: "每部位100庫納，是平常200庫納的一半，期間不限次數。" },
              { question: "新花紋真的免費嗎？", answer: "是的。8月5日新增的7款花紋可在【衣櫃】>【裝飾】>【花紋】免費使用。" },
            ],
          },
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "이벤트 가이드",
        title: "데바 룩 체인지 위크 가이드: 염색, 무늬, 제한 사항",
        description:
          "AION2 데바 룩 체인지 위크 진행 방식: 8월 5~19일 기간, 100큐나 염색, 무제한 시도, 무료 무늬 7종과 염색 불가 항목 안내.",
        intro:
          "데바 룩 체인지 위크는 한국 서비스에서 8월 5일 점검 후부터 8월 19일 점검 전까지 진행되는 외형 이벤트입니다. 이 가이드는 장식 메뉴 위치, 할인 내용, 제외 항목을 큐나 사용 전에 정리합니다.",
        sourceNote:
          "AION2 한국 8월 5일 공식 업데이트 노트 기준 이벤트 가이드입니다. 일정과 가격은 한국 공지 기준이며 지역이나 후속 수정에 따라 달라질 수 있습니다.",
        keywords: ["데바 룩 체인지 위크", "AION2 염색 가이드", "AION2 옷장 무늬", "AION2 큐나 염색 비용"],
        sections: [
          {
            id: "event-window",
            title: "이벤트 기간과 변경 사항",
            paragraphs: [
              "이벤트는 8월 5일 점검 후 시작해 8월 19일 점검 전에 끝납니다(KST). 이 기간에는 옷장 장식 비용이 부위당 200큐나에서 100큐나로 줄고 시도 횟수 제한이 풀려 자유롭게 재시도할 수 있습니다.",
              "이벤트가 끝나면 기존 비용과 제한으로 돌아갑니다. 풀세트 염색을 계획한다면 8월 19일 점검 전에 마치세요.",
            ],
          },
          {
            id: "decorate-workflow",
            title: "염색·재질·무늬를 바꾸는 위치",
            paragraphs: [
              "모든 장식 옵션은 옷장의 장식 탭에 모여 있습니다. 확정한 변경은 부위별로 과금되므로 반값 기간이 중요합니다.",
            ],
            steps: [
              { title: "옷장 열기", description: "[메뉴] > [옷장]에서 장착 중인 외형의 장식 탭을 엽니다." },
              { title: "속성 선택", description: "염색, 재질, 무늬 또는 무늬 색상을 선택합니다. 각 변경은 부위별로 과금됩니다." },
              { title: "미리보기 후 적용", description: "캐릭터에게 미리본 뒤 확정합니다. 이벤트 기간에는 시도당 100큐나가 듭니다." },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "무늬 7종이 무료로 추가",
            paragraphs: [
              "8월 5일 업데이트로 [옷장] > [장식] > [무늬]에 무료 무늬 7종이 추가됐습니다:",
              "무늬는 염색·재질 변경과 함께 사용할 수 있어, 할인 기간에 풀세트 실험이 특히 유용합니다.",
            ],
            bullets: ["가로 줄무늬", "세로 줄무늬", "별", "얼룩말", "다이아몬드 체크", "소 무늬", "하운드투스"],
          },
          {
            id: "limits-and-tips",
            title: "제한, 제외 항목과 계획 팁",
            paragraphs: [
              "이번 업데이트로 판매되는 의상과 무기 외형은 염색할 수 있지만, 신규 날개 2종(얼음 서리 날개, 빛의 파동 날개)은 염색할 수 없습니다. 이벤트 외형은 전부 거래·삭제가 불가하니 본인 캐릭터를 위해 구매하세요.",
            ],
            bullets: [
              "시작 전에 큐나 잔액을 확인하세요. 무제한 시도라도 금방 쌓입니다.",
              "풀세트 전에 한 부위만 먼저 염색해 분위기를 확인하세요.",
              "교환권 구매 외형은 마일리지가 적립되지 않으며, 한국 서비스에서 현금 구매만 적립됩니다.",
            ],
            faq: [
              { question: "데바 룩 체인지 위크는 언제까지인가요?", answer: "한국 서비스 기준 8월 5일 점검 후부터 8월 19일 점검 전까지입니다(KST)." },
              { question: "이벤트 기간 염색 비용은 얼마인가요?", answer: "부위당 100큐나로 평소 200큐나의 절반이며, 기간 내 시도 횟수 제한이 없습니다." },
              { question: "새 무늬는 정말 무료인가요?", answer: "네. 8월 5일 추가된 무늬 7종은 [옷장] > [장식] > [무늬]에서 무료로 사용할 수 있습니다." },
            ],
          },
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "イベントガイド",
        title: "デヴァ・ルック・チェンジウィーク：染色・パターン・制限",
        description:
          "AION2デヴァ・ルック・チェンジウィークの解説：8月5〜19日、100クーナ染色、回数無制限、無料パターン7種、染色不可アイテム。",
        intro:
          "デヴァ・ルック・チェンジウィークは韓国サービスで8月5日メンテナンス後から8月19日メンテナンス前まで開催されるファッションイベントです。装飾メニューの場所、割引の内容、対象外のアイテムをクーナを使う前に整理します。",
        sourceNote:
          "AION2韓国8月5日公式アップデートノートに基づくイベントガイドです。日程と価格は韓国告知基準で、地域や後の修正により異なる場合があります。",
        keywords: ["デヴァ・ルック・チェンジウィーク", "AION2 染色ガイド", "AION2 衣装ダンスパターン", "AION2 クーナ染色費用"],
        sections: [
          {
            id: "event-window",
            title: "開催期間と変更点",
            paragraphs: [
              "イベントは8月5日メンテナンス後に始まり、8月19日メンテナンス前に終了します（KST）。期間中は衣装ダンスの装飾費用が部位あたり200クーナから100クーナになり、試行回数制限もなくなります。",
              "期間外は通常の費用と制限に戻ります。フルセットの染色を予定している場合は8月19日メンテナンス前に完了させましょう。",
            ],
          },
          {
            id: "decorate-workflow",
            title: "染色・素材・パターンの変更場所",
            paragraphs: [
              "装飾オプションはすべて衣装ダンスの装飾タブにあります。確定した変更は部位ごとに課金されるため、半額期間が重要です。",
            ],
            steps: [
              { title: "衣装ダンスを開く", description: "[メニュー] > [衣装ダンス] で装備中の外見の装飾タブを開きます。" },
              { title: "属性を1つ選ぶ", description: "染色、素材、パターン、パターン色のいずれかを選択。変更は部位ごとに課金されます。" },
              { title: "プレビューして確定", description: "キャラクターにプレビューして確定。イベント中は1回100クーナです。" },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "7種のパターンが無料に",
            paragraphs: [
              "8月5日の更新で [衣装ダンス] > [装飾] > [パターン] に無料パターン7種が追加されました：",
              "パターンは染色・素材変更と組み合わせられるため、半額期間はフルセットの実験に最適です。",
            ],
            bullets: ["横縞", "縦縞", "スター", "ゼブラ", "ダイヤチェック", "カウプリント", "ハウンドトゥース"],
          },
          {
            id: "limits-and-tips",
            title: "制限・対象外・計画のコツ",
            paragraphs: [
              "今回の更新で販売される衣装と武器外見は染色可能ですが、新作の翼2種（アイスフロストウィング、ライトウェイブウィング）は染色できません。イベント外見はすべて取引・削除不可なので、自分のキャラクター用に購入してください。",
            ],
            bullets: [
              "始める前にクーナ残高を確認。回数無制限でも消費はすぐに膨らみます。",
              "フルセットの前に1部位だけ染めて雰囲気を確かめましょう。",
              "交換券で購入した外見はマイレージ対象外。韓国サービスではウォン購入のみ対象です。",
            ],
            faq: [
              { question: "デヴァ・ルック・チェンジウィークの期間は？", answer: "韓国サービスで8月5日メンテナンス後から8月19日メンテナンス前まで（KST）。" },
              { question: "イベント中の染色費用は？", answer: "部位あたり100クーナで通常の半額。期間中は回数制限なし。" },
              { question: "新パターンは本当に無料？", answer: "はい。8月5日追加の7種は [衣装ダンス] > [装飾] > [パターン] で無料で使えます。" },
            ],
          },
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "GUIDE D’ÉVÉNEMENT",
        title: "Guide Deva Look Change Week : teinture, motifs, limites",
        description:
          "Le fonctionnement de la Deva Look Change Week d’AION2 : période du 5 au 19 août, teinture à 100 Quna, tentatives illimitées, sept motifs gratuits et exclusions.",
        intro:
          "La Deva Look Change Week est l’événement mode du service coréen, de la maintenance du 5 août à celle du 19 août. Ce guide explique où se trouve le menu de décoration, ce que change la remise et quels objets sont exclus avant de dépenser vos Quna.",
        sourceNote:
          "Guide fondé sur les notes officielles coréennes du 5 août ; horaires et prix suivent l’avis coréen et peuvent varier selon la région ou une révision ultérieure.",
        keywords: ["Deva Look Change Week", "guide teinture AION2", "motifs garde-robe AION2", "coût teinture Quna AION2"],
        sections: [
          {
            id: "event-window",
            title: "Période de l’événement et changements",
            paragraphs: [
              "L’événement commence avec la maintenance du 5 août et se termine avec celle du 19 août (KST). Pendant cette période, la décoration de la garde-robe coûte 100 Quna par pièce au lieu de 200, et la limite de tentatives est levée.",
              "Hors période, les coûts et limites standards reviennent. Pour un ensemble complet, terminez la teinture avant la maintenance du 19 août.",
            ],
          },
          {
            id: "decorate-workflow",
            title: "Où modifier teinture, matière et motif",
            paragraphs: [
              "Toutes les options de décoration se trouvent dans l’onglet Décorer de la garde-robe. Chaque changement confirmé est facturé par pièce, d’où l’intérêt de la période à moitié prix.",
            ],
            steps: [
              { title: "Ouvrir la garde-robe", description: "Allez dans [Menu] > [Garde-robe], puis ouvrez l’onglet Décorer de l’apparence équipée." },
              { title: "Choisir une propriété", description: "Teinture, matière, motif ou couleur de motif ; chaque changement est facturé par pièce." },
              { title: "Prévisualiser puis appliquer", description: "Prévisualisez sur votre personnage puis confirmez ; pendant l’événement, chaque essai coûte 100 Quna." },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "Sept motifs gratuits avec la mise à jour",
            paragraphs: [
              "La mise à jour du 5 août ajoute sept motifs gratuits dans [Garde-robe] > [Décorer] > [Motifs] :",
              "Les motifs se combinent avec la teinture et la matière, ce qui rend la période remisée idéale pour tester un ensemble complet.",
            ],
            bullets: ["Rayures horizontales", "Rayures verticales", "Étoile", "Zèbre", "Losanges", "Vache", "Pied-de-poule"],
          },
          {
            id: "limits-and-tips",
            title: "Limites, exclusions et conseils",
            paragraphs: [
              "Les costumes et skins d’armes vendus avec la mise à jour sont teintables, mais les deux nouvelles ailes — Ice Frost Wings et Wings of the Light Wave — ne le sont pas. Tous les cosmétiques de l’événement sont non échangeables et non supprimables.",
            ],
            bullets: [
              "Vérifiez votre solde de Quna avant de commencer ; les tentatives illimitées coûtent vite cher.",
              "Teignez d’abord une pièce pour valider le rendu avant l’ensemble complet.",
              "Les cosmétiques achetés par ticket ne rapportent pas de Mileage ; les achats en KRW oui sur le service coréen.",
            ],
            faq: [
              { question: "Combien de temps dure la Deva Look Change Week ?", answer: "De la maintenance du 5 août à celle du 19 août sur le service coréen (KST)." },
              { question: "Combien coûte la teinture pendant l’événement ?", answer: "100 Quna par pièce, moitié moins que les 200 habituels, sans limite de tentatives." },
              { question: "Les nouveaux motifs sont-ils vraiment gratuits ?", answer: "Oui. Les sept motifs ajoutés le 5 août sont gratuits dans [Garde-robe] > [Décorer] > [Motifs]." },
            ],
          },
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "EVENT-GUIDE",
        title: "Deva Look Change Week: Färben, Muster und Limits",
        description:
          "So funktioniert die Deva Look Change Week in AION2: Zeitraum 5.–19. August, Färben für 100 Quna, unbegrenzte Versuche, sieben Gratis-Muster und Ausnahmen.",
        intro:
          "Die Deva Look Change Week läuft im koreanischen Dienst von der Wartung am 5. August bis zur Wartung am 19. August. Dieser Guide erklärt, wo das Dekorieren-Menü liegt, was der Rabatt ändert und welche Gegenstände ausgeschlossen sind.",
        sourceNote:
          "Event-Guide auf Basis der offiziellen koreanischen AION2-Update-Hinweise vom 5. August; Zeitplan und Preise folgen dem koreanischen Hinweis und können regional abweichen.",
        keywords: ["Deva Look Change Week", "AION2 Färbe-Guide", "AION2 Garderoben-Muster", "AION2 Quna-Färbekosten"],
        sections: [
          {
            id: "event-window",
            title: "Laufzeit und Änderungen",
            paragraphs: [
              "Das Event beginnt mit der Wartung am 5. August und endet mit der Wartung am 19. August (KST). In diesem Fenster kostet das Dekorieren 100 statt 200 Quna pro Teil, und das Versuchslimit entfällt.",
              "Außerhalb des Fensters gelten wieder normale Kosten und Limits. Für ein komplettes Set das Färben vor der Wartung am 19. August abschließen.",
            ],
          },
          {
            id: "decorate-workflow",
            title: "Wo Farbe, Material und Muster geändert werden",
            paragraphs: [
              "Alle Dekorationsoptionen liegen im Tab Dekorieren der Garderobe. Jede bestätigte Änderung wird pro Teil berechnet, deshalb lohnt sich das Halbpreis-Fenster.",
            ],
            steps: [
              { title: "Garderobe öffnen", description: "[Menü] > [Garderobe] öffnen und den Tab Dekorieren der ausgerüsteten Erscheinung wählen." },
              { title: "Eine Eigenschaft wählen", description: "Farbe, Material, Muster oder Musterfarbe; jede Änderung wird pro Teil berechnet." },
              { title: "Vorschau und bestätigen", description: "Ergebnis am Charakter ansehen und bestätigen; während des Events kostet jeder Versuch 100 Quna." },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "Sieben Muster gratis zum Update",
            paragraphs: [
              "Das Update vom 5. August fügt unter [Garderobe] > [Dekorieren] > [Muster] sieben kostenlose Muster hinzu:",
              "Muster lassen sich mit Farb- und Materialänderungen kombinieren, wodurch sich das Rabattfenster für komplette Sets lohnt.",
            ],
            bullets: ["Querstreifen", "Längsstreifen", "Stern", "Zebra", "Rautenkaro", "Kuhmuster", "Hahnentritt"],
          },
          {
            id: "limits-and-tips",
            title: "Limits, Ausnahmen und Planungs-Tipps",
            paragraphs: [
              "Die mit dem Update verkauften Kostüme und Waffen-Skins sind färbbar, die beiden neuen Flügel — Ice Frost Wings und Wings of the Light Wave — jedoch nicht. Alle Event-Kosmetika sind unhandelbar und unlöschbar.",
            ],
            bullets: [
              "Vor dem Start Quna-Guthaben prüfen; unbegrenzte Versuche summieren sich schnell.",
              "Erst ein Teil färben, um den Look zu prüfen, dann das ganze Set.",
              "Ticket-Käufe sammeln kein Mileage; KRW-Käufe auf dem koreanischen Dienst schon.",
            ],
            faq: [
              { question: "Wie lange läuft die Deva Look Change Week?", answer: "Von der Wartung am 5. August bis zur Wartung am 19. August im koreanischen Dienst (KST)." },
              { question: "Was kostet das Färben während des Events?", answer: "100 Quna pro Teil, die Hälfte der üblichen 200, ohne Versuchslimit." },
              { question: "Sind die neuen Muster wirklich kostenlos?", answer: "Ja. Die sieben am 5. August hinzugefügten Muster sind unter [Garderobe] > [Dekorieren] > [Muster] gratis." },
            ],
          },
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "GUÍA DE EVENTO",
        title: "Deva Look Change Week: tinte, patrones y límites",
        description:
          "Cómo funciona la Deva Look Change Week de AION2: ventana del 5 al 19 de agosto, tinte a 100 Quna, intentos ilimitados, siete patrones gratis y exclusiones.",
        intro:
          "La Deva Look Change Week es el evento de moda del servicio coreano, desde el mantenimiento del 5 de agosto hasta el del 19 de agosto. Esta guía explica dónde está el menú de decoración, qué cambia el descuento y qué objetos quedan fuera.",
        sourceNote:
          "Guía basada en las notas oficiales coreanas del 5 de agosto; el calendario y los precios siguen el aviso coreano y pueden variar por región o revisión posterior.",
        keywords: ["Deva Look Change Week", "guía de tinte AION2", "patrones de vestuario AION2", "coste de tinte Quna AION2"],
        sections: [
          {
            id: "event-window",
            title: "Cuándo se celebra y qué cambia",
            paragraphs: [
              "El evento empieza con el mantenimiento del 5 de agosto y termina con el del 19 de agosto (KST). Durante la ventana, decorar el vestuario cuesta 100 Quna por pieza en lugar de 200 y se elimina el límite de intentos.",
              "Fuera de la ventana vuelven los costes y límites habituales. Si planeas un conjunto completo, termina el tinte antes del mantenimiento del 19 de agosto.",
            ],
          },
          {
            id: "decorate-workflow",
            title: "Dónde cambiar tinte, material y patrón",
            paragraphs: [
              "Todas las opciones de decoración están en la pestaña Decorar del vestuario. Cada cambio confirmado se cobra por pieza, por eso importa la ventana a mitad de precio.",
            ],
            steps: [
              { title: "Abrir el vestuario", description: "Ve a [Menú] > [Vestuario] y abre la pestaña Decorar de la apariencia equipada." },
              { title: "Elegir una propiedad", description: "Tinte, material, patrón o color del patrón; cada cambio se cobra por pieza." },
              { title: "Previsualizar y aplicar", description: "Previsualiza en tu personaje y confirma; durante el evento cada intento cuesta 100 Quna." },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "Siete patrones gratis con la actualización",
            paragraphs: [
              "La actualización del 5 de agosto añade siete patrones gratuitos en [Vestuario] > [Decorar] > [Patrones]:",
              "Los patrones se combinan con tinte y material, lo que hace útil la ventana de descuento para experimentar con conjuntos completos.",
            ],
            bullets: ["Rayas horizontales", "Rayas verticales", "Estrella", "Cebra", "Rombos", "Vaca", "Pata de gallo"],
          },
          {
            id: "limits-and-tips",
            title: "Límites, exclusiones y consejos",
            paragraphs: [
              "Los trajes y skins de arma vendidos con la actualización se pueden teñir, pero las dos alas nuevas —Ice Frost Wings y Wings of the Light Wave— no. Todos los cosméticos del evento son intransferibles e indestructibles.",
            ],
            bullets: [
              "Comprueba tu saldo de Quna antes de empezar; los intentos ilimitados se acumulan rápido.",
              "Tiñe primero una pieza para confirmar el aspecto antes del conjunto completo.",
              "Los cosméticos comprados con ticket no dan Mileage; las compras en KRW sí en el servicio coreano.",
            ],
            faq: [
              { question: "¿Cuánto dura la Deva Look Change Week?", answer: "Desde el mantenimiento del 5 de agosto hasta el del 19 de agosto en el servicio coreano (KST)." },
              { question: "¿Cuánto cuesta teñir durante el evento?", answer: "100 Quna por pieza, la mitad de los 200 habituales, sin límite de intentos." },
              { question: "¿Los nuevos patrones son realmente gratis?", answer: "Sí. Los siete patrones añadidos el 5 de agosto son gratuitos en [Vestuario] > [Decorar] > [Patrones]." },
            ],
          },
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "GUIA DE EVENTO",
        title: "Deva Look Change Week: tintura, padrões e limites",
        description:
          "Como funciona a Deva Look Change Week em AION2: janela de 5 a 19 de agosto, tintura a 100 Quna, tentativas ilimitadas, sete padrões grátis e exclusões.",
        intro:
          "A Deva Look Change Week é o evento de moda do serviço coreano, da manutenção de 5 de agosto até a de 19 de agosto. Este guia explica onde fica o menu de decoração, o que o desconto muda e quais itens ficam de fora.",
        sourceNote:
          "Guia baseado nas notas oficiais coreanas de 5 de agosto; agenda e preços seguem o aviso coreano e podem variar por região ou revisão posterior.",
        keywords: ["Deva Look Change Week", "guia de tintura AION2", "padrões de guarda-roupa AION2", "custo de tintura Quna AION2"],
        sections: [
          {
            id: "event-window",
            title: "Quando o evento acontece e o que muda",
            paragraphs: [
              "O evento começa na manutenção de 5 de agosto e termina na de 19 de agosto (KST). Na janela, decorar o guarda-roupa custa 100 Quna por peça em vez de 200, e o limite de tentativas é removido.",
              "Fora da janela, voltam os custos e limites padrão. Para um conjunto completo, termine a tintura antes da manutenção de 19 de agosto.",
            ],
          },
          {
            id: "decorate-workflow",
            title: "Onde mudar tintura, material e padrão",
            paragraphs: [
              "Todas as opções de decoração ficam na aba Decorar do guarda-roupa. Cada mudança confirmada é cobrada por peça, por isso a janela com metade do preço importa.",
            ],
            steps: [
              { title: "Abrir o guarda-roupa", description: "Vá em [Menu] > [Guarda-roupa] e abra a aba Decorar da aparência equipada." },
              { title: "Escolher uma propriedade", description: "Tintura, material, padrão ou cor do padrão; cada mudança é cobrada por peça." },
              { title: "Pré-visualizar e aplicar", description: "Pré-visualize no personagem e confirme; durante o evento cada tentativa custa 100 Quna." },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "Sete padrões grátis com a atualização",
            paragraphs: [
              "A atualização de 5 de agosto adiciona sete padrões gratuitos em [Guarda-roupa] > [Decorar] > [Padrões]:",
              "Padrões podem ser combinados com tintura e material, o que torna a janela de desconto ideal para experimentar conjuntos completos.",
            ],
            bullets: ["Listras horizontais", "Listras verticais", "Estrela", "Zebra", "Losangos", "Vaca", "Pied-de-poule"],
          },
          {
            id: "limits-and-tips",
            title: "Limites, exclusões e dicas",
            paragraphs: [
              "Os trajes e skins de arma vendidos com a atualização podem ser tingidos, mas as duas asas novas — Ice Frost Wings e Wings of the Light Wave — não. Todos os cosméticos do evento são inegociáveis e não podem ser deletados.",
            ],
            bullets: [
              "Verifique seu saldo de Quna antes de começar; tentativas ilimitadas somam rápido.",
              "Tinja primeiro uma peça para confirmar o visual antes do conjunto completo.",
              "Cosméticos comprados com ticket não geram Mileage; compras em KRW geram no serviço coreano.",
            ],
            faq: [
              { question: "Quanto tempo dura a Deva Look Change Week?", answer: "Da manutenção de 5 de agosto até a de 19 de agosto no serviço coreano (KST)." },
              { question: "Quanto custa tingir durante o evento?", answer: "100 Quna por peça, metade dos 200 habituais, sem limite de tentativas." },
              { question: "Os novos padrões são realmente grátis?", answer: "Sim. Os sete padrões adicionados em 5 de agosto são gratuitos em [Guarda-roupa] > [Decorar] > [Padrões]." },
            ],
          },
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "ГАЙД ПО СОБЫТИЮ",
        title: "Deva Look Change Week: покраска, узоры и ограничения",
        description:
          "Как устроена Deva Look Change Week в AION2: окно 5–19 августа, покраска за 100 Quna, безлимитные попытки, семь бесплатных узоров и исключения.",
        intro:
          "Deva Look Change Week — модное событие корейского сервиса, от техработ 5 августа до техработ 19 августа. Гайд объясняет, где находится меню декора, что меняет скидка и какие предметы исключены.",
        sourceNote:
          "Гайд основан на официальных корейских примечаниях от 5 августа; расписание и цены следуют корейскому анонсу и могут отличаться по регионам.",
        keywords: ["Deva Look Change Week", "гайд по покраске AION2", "узоры гардероба AION2", "стоимость покраски Quna AION2"],
        sections: [
          {
            id: "event-window",
            title: "Сроки события и изменения",
            paragraphs: [
              "Событие начинается с техработ 5 августа и заканчивается техработами 19 августа (KST). В этот период декор гардероба стоит 100 Quna за деталь вместо 200, лимит попыток снят.",
              "Вне окна действуют обычные цены и лимиты. Для полного комплекта завершите покраску до техработ 19 августа.",
            ],
          },
          {
            id: "decorate-workflow",
            title: "Где менять краску, материал и узор",
            paragraphs: [
              "Все опции декора собраны во вкладке «Декор» гардероба. Каждое подтверждённое изменение тарифицируется по деталям, поэтому окно полцены так важно.",
            ],
            steps: [
              { title: "Откройте гардероб", description: "[Меню] > [Гардероб], затем вкладка «Декор» для надетой внешности." },
              { title: "Выберите свойство", description: "Краска, материал, узор или цвет узора; каждое изменение тарифицируется по деталям." },
              { title: "Предпросмотр и применение", description: "Посмотрите результат на персонаже и подтвердите; во время события попытка стоит 100 Quna." },
            ],
          },
          {
            id: "seven-free-patterns",
            title: "Семь узоров бесплатно с обновлением",
            paragraphs: [
              "Обновление от 5 августа добавило семь бесплатных узоров в [Гардероб] > [Декор] > [Узоры]:",
              "Узоры сочетаются с краской и материалом, поэтому окно скидки удобно для экспериментов с полным комплектом.",
            ],
            bullets: ["Горизонтальная полоска", "Вертикальная полоска", "Звезда", "Зебра", "Ромбы", "Коровий принт", "Гусиная лапка"],
          },
          {
            id: "limits-and-tips",
            title: "Ограничения, исключения и советы",
            paragraphs: [
              "Костюмы и скины оружия из обновления красятся, но два новых крыла — Ice Frost Wings и Wings of the Light Wave — нет. Вся косметика события не подлежит обмену и удалению.",
            ],
            bullets: [
              "Проверьте баланс Quna до старта; безлимитные попытки быстро складываются.",
              "Сначала покрасьте одну деталь, чтобы проверить вид, затем весь комплект.",
              "Косметика за билеты не даёт Mileage; покупки за KRW на корейском сервисе дают.",
            ],
            faq: [
              { question: "Сколько длится Deva Look Change Week?", answer: "С техработ 5 августа до техработ 19 августа на корейском сервисе (KST)." },
              { question: "Сколько стоит покраска во время события?", answer: "100 Quna за деталь — половина обычных 200, без лимита попыток." },
              { question: "Новые узоры действительно бесплатны?", answer: "Да. Семь узоров от 5 августа бесплатны в [Гардероб] > [Декор] > [Узоры]." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "august-2026-datamine-askran-atiel-noiran",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-08",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [aion2tDatamineSource],
    heroImage: datamineHero,
    related: [
      { kind: "content", section: "news", slug: "august-5-2026-deva-look-change-week-update" },
      { kind: "content", section: "news", slug: "chapter-1-lands-of-sand-and-snow" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 6, {
        eyebrow: "DATAMINE WATCH",
        title: "AION2 datamine: Askran, Atiel, and Legacy Noiran",
        description:
          "The August 5 AION2 client adds localization for unannounced content: Askran's color-shield raid, Atiel's nine-class weapons, and Legacy Noiran's four maps.",
        intro:
          "A datamine of the August 5 client build found 164 new localization strings describing content NC has not announced. The strings name bosses, mechanics, and rewards that previously existed only as anonymous data. Nothing below has a release date, and any of it can change or never ship.",
        sourceNote:
          "Third-party datamine report (Aion2t, published August 5, 2026). Content is unannounced; treat every detail as provisional until NC confirms it officially.",
        keywords: ["AION2 datamine", "Askran raid", "Atiel dungeon", "Legacy Noiran", "AION2 unannounced content"],
        sections: [
          {
            id: "what-was-found",
            title: "What the August 5 client actually added",
            paragraphs: [
              "According to the datamine report, the August 5 patch added 164 localization strings but zero new data-table rows. That means names and mechanic descriptions for encounters that already existed as anonymous stat blocks, without the tuning numbers themselves.",
              "Three named pieces of content stand out: the Askran and Atiel raid encounters and the Legacy Noiran party dungeon, plus kits for unnamed frost, poison, and gunblade bosses.",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Askran's color shields and Atiel's artificial god",
            paragraphs: [
              "Askran is described as a four-color energy management fight. The boss casts Crimson, Azure, Green, and Purple energy; players absorb aura by standing in the matching red, blue, or green shield, while Purple energy has no matching shield. Petrify from Petrifying Mine hazards incapacitates players but also makes them immune to damage, creating deliberate survival windows. The client also lists crowd-control skills such as Soul Chain and Rooting Chain, an AoE suite including Aerial Bombardment and Chain Explosion, and a cosmetic reward, the Askran's Silence helm skin.",
              "Atiel is framed in lore as a discarded Lepharist Artificial God project, 99 percent complete and powered by Drana. Reported mechanics include Strengthen Body stacking enrage, Lamenting Mark that kills at max stacks, and a stagger check before a jump. Named but unimplemented rewards cover a unique weapon line for all nine classes, an accessory set, a housing statue, and the Atiel's Arrogance helm skin.",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran and the unnamed boss kits",
            paragraphs: [
              "Legacy Noiran ships with four client maps (LegacyNoiran_G_01 through G_04) and a boss named Mad Klominster, but no dungeon table row exists, so entry requirements, rewards, and tuning are missing.",
              "The unnamed kits hint at future design directions: a frost boss built around sharing Warmth while managing Chill stacks, a poison boss whose DoT explodes into persistent zones at three stacks, and a Lepharist-themed gunblade kit with lasers and time bombs.",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "How to treat unannounced content",
            paragraphs: [
              "Datamined content has no schedule. Similar strings have sat in the client for months without release, and some may be reworked or cancelled entirely. Names and numbers can still change before anything ships.",
              "KINA will not present these details as a confirmed roadmap. When NC announces any of this content officially, we will recheck every claim against the notice and update our coverage accordingly.",
            ],
          },
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 6, {
        eyebrow: "数据挖掘观察",
        title: "AION2 数据挖掘：Askran、Atiel 与 Legacy Noiran",
        description:
          "8月5日AION2客户端新增未官宣内容的本地化文本：Askran四色护盾战、Atiel九职业武器与Legacy Noiran四张地图。",
        intro:
          "对8月5日客户端的数据挖掘发现164条新本地化文本，描述的是NC尚未官宣的内容：此前只以匿名数据存在的 Boss、机制与奖励名称。以下内容均无发布日期，任何一项都可能改动或永不上线。",
        sourceNote:
          "第三方数据挖掘报告（Aion2t，发布于2026年8月5日）。内容未官宣，在NC正式确认前，所有细节均应视为暂定信息。",
        keywords: ["AION2 数据挖掘", "Askran 副本", "Atiel 副本", "Legacy Noiran", "AION2 未官宣内容"],
        sections: [
          {
            id: "what-was-found",
            title: "8月5日客户端实际新增了什么",
            paragraphs: [
              "据挖掘报告，8月5日补丁新增了164条本地化文本，但没有新增任何数据表行。也就是说，这些是早已以匿名数值块形式存在的遭遇战的名称与机制描述，数值本身仍缺失。",
              "三项具名内容最突出：Askran 与 Atiel 两个首领战，以及 Legacy Noiran 队伍副本；另有冰霜、毒素与枪刃三套未具名 Boss 技能包。",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Askran 的四色护盾与 Atiel 的人造神",
            paragraphs: [
              "Askran 被描述为一场四色能量管理战：Boss 施放深红、蔚蓝、翠绿与紫色能量，玩家需站在对应的红、蓝、绿护盾内吸收光环，而紫色能量没有对应护盾。石化地雷会使玩家无法行动但同时免疫伤害，形成刻意的生存窗口。客户端还列出灵魂锁链、定身锁链等控制技能，空中轰炸、连锁爆炸等范围技能组，以及外观奖励 Askran 的沉默头盔外观。",
              "Atiel 在背景设定中是被废弃的雷帕尔人造神计划，完成度99%，以德拉纳驱动。已披露的机制包括强化躯体叠加狂暴、悲叹印记叠满即死，以及跳跃前的失衡判定。已具名但未实装的奖励覆盖全九职业专属武器、饰品套装、家园雕像与 Atiel 的傲慢头盔外观。",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran 与未具名 Boss 技能包",
            paragraphs: [
              "Legacy Noiran 已在客户端中带有四张地图（LegacyNoiran_G_01 至 G_04）与 Boss 疯狂克罗敏斯特，但副本数据表没有任何行，入场条件、奖励与数值全部缺失。",
              "未具名技能包暗示了未来的设计方向：围绕分享温暖、管理寒冷叠层的冰霜 Boss；持续伤害叠到三层即爆炸生成残留毒区的毒素 Boss；以及以激光与定时炸弹为主的雷帕尔风格枪刃技能包。",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "如何看待未官宣内容",
            paragraphs: [
              "挖掘内容没有时间表。类似文本曾在客户端里存放数月而不上线，部分内容可能被重做甚至整体取消。在任何内容实装前，名称与数值都可能变化。",
              "KINA 不会把这些细节当作已确认的路线图。当NC正式发布其中任何内容时，我们会逐项与官方公告核对并更新报道。",
            ],
          },
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 6, {
        eyebrow: "資料挖掘觀察",
        title: "AION2 資料挖掘：Askran、Atiel 與 Legacy Noiran",
        description:
          "8月5日AION2客戶端新增未官宣內容的本地化文本：Askran四色護盾戰、Atiel九職業武器與Legacy Noiran四張地圖。",
        intro:
          "對8月5日客戶端的資料挖掘發現164條新本地化文本，描述的是NC尚未官宣的內容：此前只以匿名資料存在的 Boss、機制與獎勵名稱。以下內容均無發布日期，任何一項都可能改動或永不上線。",
        sourceNote:
          "第三方資料挖掘報告（Aion2t，發布於2026年8月5日）。內容未官宣，在NC正式確認前，所有細節都應視為暫定資訊。",
        keywords: ["AION2 資料挖掘", "Askran 副本", "Atiel 副本", "Legacy Noiran", "AION2 未官宣內容"],
        sections: [
          {
            id: "what-was-found",
            title: "8月5日客戶端實際新增了什麼",
            paragraphs: [
              "據挖掘報告，8月5日補丁新增了164條本地化文本，但沒有新增任何資料表行。也就是說，這些是早已以匿名數值塊形式存在的遭遇戰的名稱與機制描述，數值本身仍缺失。",
              "三項具名內容最突出：Askran 與 Atiel 兩個首領戰，以及 Legacy Noiran 隊伍副本；另有冰霜、毒素與槍刃三套未具名 Boss 技能包。",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Askran 的四色護盾與 Atiel 的人造神",
            paragraphs: [
              "Askran 被描述為一場四色能量管理戰：Boss 施放深紅、蔚藍、翠綠與紫色能量，玩家需站在對應的紅、藍、綠護盾內吸收光環，而紫色能量沒有對應護盾。石化地雷會使玩家無法行動但同時免疫傷害，形成刻意的生存窗口。客戶端還列出靈魂鎖鏈、定身鎖鏈等控制技能，空中轟炸、連鎖爆炸等範圍技能組，以及外觀獎勵 Askran 的沉默頭盔外觀。",
              "Atiel 在背景設定中是被廢棄的雷帕爾人造神計畫，完成度99%，以德拉納驅動。已披露的機制包括強化軀體疊加狂暴、悲嘆印記疊滿即死，以及跳躍前的失衡判定。已具名但未實裝的獎勵覆蓋全九職業專屬武器、飾品套裝、家園雕像與 Atiel 的傲慢頭盔外觀。",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran 與未具名 Boss 技能包",
            paragraphs: [
              "Legacy Noiran 已在客戶端中帶有四張地圖（LegacyNoiran_G_01 至 G_04）與 Boss 瘋狂克羅敏斯特，但副本資料表沒有任何行，入場條件、獎勵與數值全部缺失。",
              "未具名技能包暗示了未來的設計方向：圍繞分享溫暖、管理寒冷疊層的冰霜 Boss；持續傷害疊到三層即爆炸生成殘留毒區的毒素 Boss；以及以雷射與定時炸彈為主的雷帕爾風格槍刃技能包。",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "如何看待未官宣內容",
            paragraphs: [
              "挖掘內容沒有時間表。類似文本曾在客戶端裡存放數月而不上線，部分內容可能被重做甚至整體取消。在任何內容實裝前，名稱與數值都可能變化。",
              "KINA 不會把這些細節當作已確認的路線圖。當NC正式發布其中任何內容時，我們會逐項與官方公告核對並更新報導。",
            ],
          },
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 6, {
        eyebrow: "데이터마이닝 관찰",
        title: "AION2 데이터마이닝: Askran, Atiel, Legacy Noiran",
        description:
          "8월 5일 AION2 클라이언트에 미공개 콘텐츠 현지화 텍스트가 추가됐습니다: Askran 색 방패 전투, Atiel 9직업 무기, Legacy Noiran 4개 지도.",
        intro:
          "8월 5일 클라이언트 빌드 데이터마이닝에서 NC가 발표하지 않은 콘텐츠를 설명하는 신규 현지화 문자열 164개가 발견됐습니다. 이전에는 익명 데이터로만 존재하던 보스, 기계, 보상 이름이 포함됩니다. 아래 내용에는 출시 일정이 없으며 언제든 변경되거나 나오지 않을 수 있습니다.",
        sourceNote:
          "제3자 데이터마이닝 보고서(Aion2t, 2026년 8월 5일 공개). 콘텐츠는 미공개 상태이며 NC가 공식 확인하기 전까지 모든 세부 사항은 잠정 정보로 취급하세요.",
        keywords: ["AION2 데이터마이닝", "Askran 레이드", "Atiel 던전", "Legacy Noiran", "AION2 미공개 콘텐츠"],
        sections: [
          {
            id: "what-was-found",
            title: "8월 5일 클라이언트에 실제로 추가된 것",
            paragraphs: [
              "보고서에 따르면 8월 5일 패치는 현지화 문자열 164개를 추가했지만 새 데이터 테이블 행은 0개였습니다. 즉 이미 익명 스탯 블록으로 존재하던 전투의 이름과 기계 설명만 있고 수치 조정은 빠져 있습니다.",
              "세 가지 이름 있는 콘텐츠가 눈에 띕니다: Askran과 Atiel 레이드 전투, 파티 던전 Legacy Noiran, 그리고 이름 없는 냉기·독·건블레이드 보스 킷입니다.",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Askran의 색 방패와 Atiel의 인공신",
            paragraphs: [
              "Askran은 네 가지 색 에너지 관리 전투로 설명됩니다. 보스는 진홍, 청람, 초록, 보라 에너지를 시전하며 플레이어는 일치하는 빨강·파랑·초록 방패 안에 서서 오라를 흡수합니다. 보라 에너지는 대응 방패가 없습니다. Petrifying Mine의 석화는 플레이어를 무력화하지만 동시에 피해를 면하게 해 의도적인 생존 구간을 만듭니다. 클라이언트에는 Soul Chain, Rooting Chain 같은 군중 제어와 Aerial Bombardment, Chain Explosion 같은 광역 기술, 외형 보상인 Askran의 침묵 투구 스킨도 나옵니다.",
              "Atiel은 로어에서 버려진 레파리스트 인공신 프로젝트로, 99% 완성 상태이며 드라나로 구동됩니다. 보고된 기계에는 Strengthen Body 중복 분노, 최대 중첩 시 사망하는 Lamenting Mark, 점프 전 스터거 판정이 있습니다. 이름만 있고 미구현된 보상은 9직업 전체 고유 무기, 장신구 세트, 하우징 조각상, Atiel의 오만 투구 스킨입니다.",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran과 이름 없는 보스 킷",
            paragraphs: [
              "Legacy Noiran은 클라이언트에 4개 지도(LegacyNoiran_G_01~G_04)와 보스 Mad Klominster가 있지만 던전 테이블 행이 없어 입장 조건, 보상, 조정이 전부 빠졌습니다.",
              "이름 없는 킷은 미래 설계 방향을 암시합니다: Warmth 공유와 Chill 중첩 관리를 중심으로 한 냉기 보스, 3중첩에서 지속 독구역을 만드는 독 보스, 레이저와 시한폭탄을 쓰는 레파리스트 테마 건블레이드 킷입니다.",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "미공개 콘텐츠를 대하는 자세",
            paragraphs: [
              "데이터마이닝 콘텐츠에는 일정이 없습니다. 비슷한 문자열이 수개월간 클라이언트에 머물다 나오지 않은 경우도 있고, 일부는 리워크되거나 완전히 취소될 수 있습니다. 이름과 수치는 출시 전까지 바뀔 수 있습니다.",
              "KINA는 이 세부 사항을 확정 로드맵으로 제시하지 않습니다. NC가 공식 발표하면 모든 내용을 공지와 대조해 보도를 갱신하겠습니다.",
            ],
          },
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 6, {
        eyebrow: "データマイニング速報",
        title: "AION2 データマイン：Askran、Atiel、Legacy Noiran",
        description:
          "8月5日のAION2クライアントに未発表コンテンツのローカライズが追加：Askranの四色シールド戦、Atielの9クラス武器、Legacy Noiranの4マップ。",
        intro:
          "8月5日クライアントのデータマインで、NCが未発表のコンテンツを説明する164の新しいローカライズ文字列が見つかりました。これまで匿名データとしてのみ存在したボス、メカニクス、報酬の名前が含まれます。以下にリリース日はなく、変更・中止の可能性があります。",
        sourceNote:
          "第三者データマインレポート（Aion2t、2026年8月5日公開）。コンテンツは未発表であり、NCの公式確認まではすべて暫定情報として扱ってください。",
        keywords: ["AION2 データマイン", "Askran レイド", "Atiel ダンジョン", "Legacy Noiran", "AION2 未発表コンテンツ"],
        sections: [
          {
            id: "what-was-found",
            title: "8月5日クライアントに実際に追加されたもの",
            paragraphs: [
              "レポートによると、8月5日パッチはローカライズ文字列164件を追加しましたが、データテーブルの行はゼロでした。つまり、すでに匿名のステータスブロックとして存在した戦闘の名前とメカニクス説明のみで、調整数値は欠落しています。",
              "三つの名前付きコンテンツが注目されます：AskranとAtielのレイド戦、パーティダンジョンLegacy Noiran、そして無名の氷・毒・ガンブレイドボスキットです。",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Askranの色シールドとAtielの人工神",
            paragraphs: [
              "Askranは四色エネルギー管理戦と説明されています。ボスは深紅・碧・緑・紫のエネルギーを詠唱し、プレイヤーは対応する赤・青・緑のシールド内でオーラを吸収します。紫には対応シールドがありません。Petrifying Mineによる石化は行動不能になる一方ダメージ無効にもなり、意図的な生存窗口を生みます。クライアントにはSoul ChainやRooting ChainなどのCC、Aerial BombardmentやChain Explosionなどの範囲技、外見報酬Askranの沈黙ヘルムスキンも記載されています。",
              "Atielはロア上、放棄されたレパリスト人工神計画で、完成度99％、ドラーナで駆動されます。報告されたメカニクスにはStrengthen Bodyの積み重ね凶暴化、最大スタックで即死するLamenting Mark、ジャンプ前のスタッガー判定があります。未実装の報酬として9クラス固有武器、アクセサリーセット、住宅彫像、Atielの高慢ヘルムスキンが名前だけ存在します。",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiranと無名ボスキット",
            paragraphs: [
              "Legacy Noiranはクライアントに4マップ（LegacyNoiran_G_01〜G_04）とボスMad Klominsterを持ちますが、ダンジョンテーブルの行が存在せず、入場条件・報酬・調整はすべて欠落しています。",
              "無名キットは将来の設計方向を示唆します：Warmthの共有とChillスタック管理を中心とした氷ボス、3スタックで持続毒ゾーンに爆発する毒ボス、レーザーと時限爆弾を使うレパリスト系ガンブレイドキットです。",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "未発表コンテンツとの向き合い方",
            paragraphs: [
              "データマインコンテンツにスケジュールはありません。類似の文字列が数か月クライアントに残ったままリリースされない例もあり、作り直しや中止の可能性もあります。",
              "KINAはこれらの詳細を確認済みのロードマップとしては提示しません。NCが公式発表した時点で、すべての記述を告知と突き合わせて更新します。",
            ],
          },
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 6, {
        eyebrow: "VEILLE DATAMINE",
        title: "Datamine AION2 : Askran, Atiel et Legacy Noiran",
        description:
          "Le client AION2 du 5 août ajoute des textes localisés pour du contenu non annoncé : raid à boucliers colorés Askran, armes Atiel et cartes Legacy Noiran.",
        intro:
          "Un datamine du client du 5 août a trouvé 164 nouvelles chaînes de localisation décrivant du contenu non annoncé par NC : des boss, mécaniques et récompenses qui n’existaient que sous forme de données anonymes. Rien n’a de date de sortie et tout peut changer ou ne jamais sortir.",
        sourceNote:
          "Rapport de datamine tiers (Aion2t, publié le 5 août 2026). Contenu non annoncé ; considérez chaque détail comme provisoire tant que NC ne l’a pas confirmé.",
        keywords: ["datamine AION2", "raid Askran", "donjon Atiel", "Legacy Noiran", "contenu non annoncé AION2"],
        sections: [
          {
            id: "what-was-found",
            title: "Ce que le client du 5 août a réellement ajouté",
            paragraphs: [
              "Selon le rapport, le patch du 5 août a ajouté 164 chaînes de localisation mais aucune nouvelle ligne de table de données : des noms et descriptions de mécaniques pour des rencontres qui existaient déjà comme blocs de statistiques anonymes, sans les valeurs d’équilibrage.",
              "Trois contenus nommés ressortent : les rencontres Askran et Atiel, le donjon de groupe Legacy Noiran, ainsi que des kits de boss de glace, de poison et gunblade sans nom.",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Les boucliers colorés d’Askran et le dieu artificiel Atiel",
            paragraphs: [
              "Askran est décrit comme un combat de gestion d’énergie à quatre couleurs. Le boss lance des énergies cramoisie, azur, verte et violette ; les joueurs absorbent l’aura en se tenant dans le bouclier rouge, bleu ou vert correspondant, le violet n’ayant aucun bouclier. La pétrification des mines incapacite mais immunise contre les dégâts, créant des fenêtres de survie voulues. Le client liste aussi des contrôles comme Soul Chain et Rooting Chain, des AoE comme Aerial Bombardment et Chain Explosion, et une récompense cosmétique : le skin de casque Askran’s Silence.",
              "Atiel est présenté dans le lore comme un projet de Dieu artificiel Lepharist abandonné, achevé à 99 % et alimenté par le Drana. Les mécaniques rapportées incluent l’enragement cumulatif Strengthen Body, la marque Lamenting Mark mortelle au maximum de stacks, et un contrôle de stagger avant un saut. Les récompenses nommées mais non implémentées couvrent une ligne d’armes uniques pour les neuf classes, un set d’accessoires, une statue de logement et le skin Atiel’s Arrogance.",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran et les kits de boss sans nom",
            paragraphs: [
              "Legacy Noiran est livré avec quatre cartes client (LegacyNoiran_G_01 à G_04) et un boss nommé Mad Klominster, mais aucune ligne de table de donjon n’existe : conditions d’entrée, récompenses et équilibrage manquent.",
              "Les kits sans nom esquissent des pistes de design : un boss de glace autour du partage de Warmth et des stacks de Chill, un boss de poison dont le DoT explose en zones persistantes à trois stacks, et un kit gunblade thème Lepharist avec lasers et bombes à retardement.",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "Comment traiter le contenu non annoncé",
            paragraphs: [
              "Le contenu dataminé n’a aucun calendrier. Des chaînes similaires sont restées des mois dans le client sans sortir, et certaines peuvent être retravaillées ou annulées.",
              "KINA ne présentera pas ces détails comme une feuille de route confirmée. Dès qu’une annonce officielle interviendra, chaque affirmation sera revérifiée et notre couverture mise à jour.",
            ],
          },
        ],
      }),
      de: articleCopy(newsLabels, "de", 6, {
        eyebrow: "DATAMINE-BEOBACHTUNG",
        title: "AION2-Datamine: Askran, Atiel und Legacy Noiran",
        description:
          "Der AION2-Client vom 5. August enthält Lokalisierung für unangekündigte Inhalte: Askrans Farbschild-Raid, Atiels Waffen und die Legacy-Noiran-Karten.",
        intro:
          "Ein Datamine des Clients vom 5. August fand 164 neue Lokalisierungszeichenketten für Inhalte, die NC nicht angekündigt hat: Boss-, Mechanik- und Belohnungsnamen, die zuvor nur als anonyme Daten existierten. Nichts davon hat einen Termin und kann sich ändern oder nie erscheinen.",
        sourceNote:
          "Datamine-Bericht eines Drittanbieters (Aion2t, veröffentlicht am 5. August 2026). Inhalte sind unangekündigt; alle Details gelten bis zur offiziellen Bestätigung durch NC als vorläufig.",
        keywords: ["AION2 Datamine", "Askran Raid", "Atiel Dungeon", "Legacy Noiran", "unangekündigte AION2-Inhalte"],
        sections: [
          {
            id: "what-was-found",
            title: "Was der Client vom 5. August wirklich hinzufügte",
            paragraphs: [
              "Laut Bericht ergänzte der Patch vom 5. August 164 Lokalisierungsstrings, aber keine neuen Datenzeilen: Namen und Mechanikbeschreibungen für Begegnungen, die bereits als anonyme Statistikblöcke existierten, ohne Tuning-Werte.",
              "Drei benannte Inhalte stechen hervor: die Raid-Begegnungen Askran und Atiel, der Party-Dungeon Legacy Noiran sowie Kits für unbenannte Frost-, Gift- und Gunblade-Bosse.",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Askrans Farbschilde und Atiels künstlicher Gott",
            paragraphs: [
              "Askran wird als Vier-Farben-Energiemanagement-Kampf beschrieben. Der Boss wirkt karminrote, azurblaue, grüne und violette Energie; Spieler absorbieren Aura, indem sie im passenden roten, blauen oder grünen Schild stehen – violett hat kein passendes Schild. Versteinerung durch Petrifying Mines macht handlungsunfähig, aber schadensimmun, was gewollte Überlebensfenster schafft. Der Client listet außerdem CC wie Soul Chain und Rooting Chain, AoE wie Aerial Bombardment und Chain Explosion sowie den Kosmetik-Lohn Askran’s Silence als Helm-Skin.",
              "Atiel ist im Lore ein verworfenes Lepharist-Künstlicher-Gott-Projekt, zu 99 Prozent fertig und mit Drana betrieben. Gemeldete Mechaniken sind der stapelnde Enrage Strengthen Body, das bei Max-Stacks tötende Lamenting Mark und ein Stagger-Check vor einem Sprung. Benannte, aber nicht implementierte Belohnungen umfassen eine einzigartige Waffenlinie für alle neun Klassen, ein Accessoire-Set, eine Housing-Statue und den Helm-Skin Atiel’s Arrogance.",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran und die unbenannten Boss-Kits",
            paragraphs: [
              "Legacy Noiran bringt vier Client-Karten (LegacyNoiran_G_01 bis G_04) und den Boss Mad Klominster mit, aber keine Dungeon-Tabellenzeile: Voraussetzungen, Belohnungen und Tuning fehlen komplett.",
              "Die unbenannten Kits deuten künftige Designs an: ein Frost-Boss um das Teilen von Wärme und Chill-Stacks, ein Gift-Boss, dessen DoT bei drei Stacks in bleibende Zonen explodiert, und ein Lepharist-Gunblade-Kit mit Lasern und Zeitbomben.",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "Wie man unangekündigte Inhalte einordnet",
            paragraphs: [
              "Datamine-Inhalte haben keinen Zeitplan. Ähnliche Strings lagen schon monatelang im Client, ohne zu erscheinen; manches wird überarbeitet oder ganz gestrichen.",
              "KINA stellt diese Details nicht als bestätigte Roadmap dar. Sobald NC etwas davon offiziell ankündigt, prüfen wir jede Aussage gegen die Ankündigung und aktualisieren die Berichterstattung.",
            ],
          },
        ],
      }),
      es: articleCopy(newsLabels, "es", 6, {
        eyebrow: "SEGUIMIENTO DATAMINE",
        title: "Datamine de AION2: Askran, Atiel y Legacy Noiran",
        description:
          "El cliente de AION2 del 5 de agosto añade textos de contenido no anunciado: el raid Askran, las armas de Atiel y los mapas de Legacy Noiran.",
        intro:
          "Un datamine del cliente del 5 de agosto encontró 164 cadenas de localización nuevas que describen contenido no anunciado por NC: jefes, mecánicas y recompensas que solo existían como datos anónimos. Nada tiene fecha de lanzamiento y cualquier detalle puede cambiar o no llegar.",
        sourceNote:
          "Informe de datamine de terceros (Aion2t, publicado el 5 de agosto de 2026). El contenido no está anunciado; trate cada detalle como provisional hasta que NC lo confirme.",
        keywords: ["datamine AION2", "raid Askran", "mazmorra Atiel", "Legacy Noiran", "contenido no anunciado AION2"],
        sections: [
          {
            id: "what-was-found",
            title: "Qué añadió realmente el cliente del 5 de agosto",
            paragraphs: [
              "Según el informe, el parche del 5 de agosto añadió 164 cadenas de localización pero cero filas nuevas en las tablas de datos: nombres y descripciones de mecánicas para encuentros que ya existían como bloques de estadísticas anónimos, sin valores de ajuste.",
              "Destacan tres contenidos con nombre: los encuentros Askran y Atiel, la mazmorra de grupo Legacy Noiran y kits de jefes de escarcha, veneno y gunblade sin nombre.",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Los escudos de colores de Askran y el dios artificial Atiel",
            paragraphs: [
              "Askran se describe como un combate de gestión de energía de cuatro colores. El jefe lanza energía carmesí, azul, verde y púrpura; los jugadores absorben aura dentro del escudo rojo, azul o verde correspondiente, mientras el púrpura no tiene escudo. La petrificación de las minas incapacita pero vuelve inmune al daño, creando ventanas de supervivencia deliberadas. El cliente también lista control de masas como Soul Chain y Rooting Chain, AoE como Aerial Bombardment y Chain Explosion, y la recompensa cosmética Askran’s Silence.",
              "Atiel aparece en el lore como un proyecto de Dios Artificial Lepharist descartado, completo al 99 % y alimentado por Drana. Las mecánicas reportadas incluyen el enfurecimiento acumulativo Strengthen Body, la marca Lamenting Mark que mata al máximo de acumulaciones y una comprobación de stagger antes de un salto. Las recompensas nombradas pero no implementadas cubren una línea de armas únicas para las nueve clases, un set de accesorios, una estatua de vivienda y el skin Atiel’s Arrogance.",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran y los kits de jefes sin nombre",
            paragraphs: [
              "Legacy Noiran llega con cuatro mapas del cliente (LegacyNoiran_G_01 a G_04) y un jefe llamado Mad Klominster, pero no existe fila de tabla de mazmorra: faltan requisitos, recompensas y ajustes.",
              "Los kits sin nombre insinúan futuras direcciones de diseño: un jefe de escarcha en torno a compartir Warmth y gestionar acumulaciones de Chill, un jefe de veneno cuyo DoT explota en zonas persistentes con tres acumulaciones y un kit gunblade de temática Lepharist con láseres y bombas de tiempo.",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "Cómo tratar el contenido no anunciado",
            paragraphs: [
              "El contenido datamineado no tiene calendario. Cadenas similares han permanecido meses en el cliente sin publicarse, y algunas pueden rehacerse o cancelarse.",
              "KINA no presentará estos detalles como hoja de ruta confirmada. Cuando NC anuncie oficialmente algo de esto, revisaremos cada afirmación y actualizaremos la cobertura.",
            ],
          },
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 6, {
        eyebrow: "ACOMPANHAMENTO DE DATAMINE",
        title: "Datamine de AION2: Askran, Atiel e Legacy Noiran",
        description:
          "O cliente de AION2 de 5 de agosto traz textos de conteúdo não anunciado: o raid Askran, as armas de Atiel e os mapas de Legacy Noiran.",
        intro:
          "Um datamine do cliente de 5 de agosto encontrou 164 novas strings de localização descrevendo conteúdo não anunciado pela NC: chefes, mecânicas e recompensas que existiam apenas como dados anônimos. Nada tem data de lançamento e qualquer item pode mudar ou nunca sair.",
        sourceNote:
          "Relatório de datamine de terceiros (Aion2t, publicado em 5 de agosto de 2026). O conteúdo não foi anunciado; trate cada detalhe como provisório até confirmação oficial da NC.",
        keywords: ["datamine AION2", "raid Askran", "masmorra Atiel", "Legacy Noiran", "conteúdo não anunciado AION2"],
        sections: [
          {
            id: "what-was-found",
            title: "O que o cliente de 5 de agosto realmente adicionou",
            paragraphs: [
              "Segundo o relatório, o patch de 5 de agosto adicionou 164 strings de localização, mas nenhuma linha nova nas tabelas de dados: nomes e descrições de mecânicas para encontros que já existiam como blocos de estatísticas anônimos, sem valores de ajuste.",
              "Três conteúdos nomeados se destacam: os encontros Askran e Atiel, a masmorra de grupo Legacy Noiran e kits de chefes de gelo, veneno e gunblade sem nome.",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Os escudos coloridos de Askran e o deus artificial Atiel",
            paragraphs: [
              "Askran é descrito como uma luta de gestão de energia em quatro cores. O chefe conjura energia carmesim, azul, verde e roxa; os jogadores absorvem aura ficando no escudo vermelho, azul ou verde correspondente, enquanto o roxo não tem escudo. A petrificação das minas incapacita, mas também torna imune a dano, criando janelas de sobrevivência deliberadas. O cliente lista ainda controles como Soul Chain e Rooting Chain, AoE como Aerial Bombardment e Chain Explosion e a recompensa cosmética Askran’s Silence.",
              "Atiel é apresentado no lore como um projeto de Deus Artificial Lepharist descartado, 99% completo e movido a Drana. As mecânicas relatadas incluem o enrage acumulativo Strengthen Body, a marca Lamenting Mark que mata no máximo de stacks e uma checagem de stagger antes de um salto. As recompensas nomeadas, mas não implementadas, cobrem uma linha de armas únicas para as nove classes, um conjunto de acessórios, uma estátua de housing e o skin Atiel’s Arrogance.",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran e os kits de chefes sem nome",
            paragraphs: [
              "Legacy Noiran vem com quatro mapas no cliente (LegacyNoiran_G_01 a G_04) e um chefe chamado Mad Klominster, mas não há linha na tabela de masmorra: requisitos, recompensas e ajustes estão ausentes.",
              "Os kits sem nome sugerem direções futuras: um chefe de gelo baseado em compartilhar Warmth e gerenciar stacks de Chill, um chefe de veneno cujo DoT explode em zonas persistentes com três stacks e um kit gunblade temático Lepharist com lasers e bombas-relógio.",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "Como tratar conteúdo não anunciado",
            paragraphs: [
              "Conteúdo de datamine não tem cronograma. Strings semelhantes já ficaram meses no cliente sem serem lançadas, e algumas podem ser retrabalhadas ou canceladas.",
              "A KINA não apresentará esses detalhes como roteiro confirmado. Quando a NC anunciar oficialmente qualquer parte, revisaremos cada afirmação e atualizaremos a cobertura.",
            ],
          },
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 6, {
        eyebrow: "НАБЛЮДЕНИЕ ЗА ДАТМАЙНОМ",
        title: "Датмайн AION2: Askran, Atiel и Legacy Noiran",
        description:
          "Клиент AION2 от 5 августа содержит локализацию неанонсированного контента: рейд Askran, оружие Atiel и четыре карты Legacy Noiran.",
        intro:
          "Датмайн клиента от 5 августа нашёл 164 новые строки локализации, описывающие контент, который NC не анонсировала: боссы, механики и награды, существовавшие лишь как анонимные данные. Ни у чего нет даты выхода, и всё может измениться или не выйти.",
        sourceNote:
          "Сторонний отчёт о датмайне (Aion2t, опубликовано 5 августа 2026). Контент не анонсирован; все детали считайте предварительными до официального подтверждения NC.",
        keywords: ["датмайн AION2", "рейд Askran", "подземелье Atiel", "Legacy Noiran", "неанонсированный контент AION2"],
        sections: [
          {
            id: "what-was-found",
            title: "Что действительно добавил клиент от 5 августа",
            paragraphs: [
              "Согласно отчёту, патч от 5 августа добавил 164 строки локализации, но ни одной новой строки в таблицах данных: это названия и описания механик для сражений, уже существовавших как анонимные блоки характеристик, без настроек.",
              "Выделяются три названных объекта: рейдовые встречи Askran и Atiel, групповое подземелье Legacy Noiran, а также наборы безымянных ледяного, ядовитого и ганблейд-боссов.",
            ],
          },
          {
            id: "askran-and-atiel",
            title: "Цветные щиты Askran и искусственный бог Atiel",
            paragraphs: [
              "Askran описывается как бой на управлении энергией четырёх цветов. Босс применяет багровую, лазурную, зелёную и фиолетовую энергию; игроки поглощают ауру, стоя в соответствующем красном, синем или зелёном щите, а у фиолетовой щита нет. Окаменение от мин обездвиживает, но даёт неуязвимость к урону — так возникают задуманные окна выживания. В клиенте также перечислены контроль Soul Chain и Rooting Chain, AoE Aerial Bombardment и Chain Explosion и косметическая награда — шлем Askran’s Silence.",
              "Atiel в лоре — заброшенный проект «Искусственный бог» Лефаристов, завершённый на 99 % и питаемый Драной. Среди описанных механик: стаки ярости Strengthen Body, метка Lamenting Mark, убивающая на максимуме стаков, и проверка стаггера перед прыжком. Названные, но не реализованные награды включают уникальную линейку оружия для всех девяти классов, комплект аксессуаров, статую для жилья и шлем Atiel’s Arrogance.",
            ],
          },
          {
            id: "noiran-and-unnamed-bosses",
            title: "Legacy Noiran и безымянные наборы боссов",
            paragraphs: [
              "Legacy Noiran поставляется с четырьмя картами клиента (LegacyNoiran_G_01–G_04) и боссом Mad Klominster, но строки таблицы подземелья нет: требования входа, награды и баланс отсутствуют.",
              "Безымянные наборы намекают на будущие механики: ледяной босс вокруг обмена теплом и стаков холода, ядовитый босс, чей DoT на трёх стаках взрывается устойчивыми зонами, и ганблейд-набор в стиле Лефаристов с лазерами и бомбами.",
            ],
          },
          {
            id: "handle-unannounced-carefully",
            title: "Как относиться к неанонсированному контенту",
            paragraphs: [
              "У датмайн-контента нет расписания. Похожие строки месяцами лежали в клиенте без релиза; что-то может быть переработано или отменено.",
              "KINA не выдаёт эти детали за подтверждённую дорожную карту. Когда NC официально анонсирует что-либо из этого, мы сверим каждое утверждение с анонсом и обновим материалы.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "global-launch-pve-content-what-we-know",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-08",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [globalEarlyAccessSource, globalFoundersPackSource, globalSteamSource, mmoexpPveSource],
    heroImage: globalPveHero,
    related: [
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "guides", slug: "early-access" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 5, {
        eyebrow: "GLOBAL LAUNCH WATCH",
        title: "AION 2 global PvE: what is confirmed before launch",
        description:
          "What is officially confirmed for AION 2's global launch versus third-party PvE expectations: September 30 early access, platforms, and dungeon lists.",
        intro:
          "With early access set for September 30, players are asking what PvE content the global version will actually ship. Official confirmations are still narrow; most circulating dungeon lists are third-party extrapolations from the Korean and Taiwanese services. This brief separates the two.",
        sourceNote:
          "Official items cite NC notices and the Steam page (checked August 8, 2026). Dungeon expectations come from a third-party preview and are not an official roadmap.",
        keywords: ["AION 2 global launch PvE", "AION 2 September 30", "AION 2 dungeons at launch", "AION 2 early access content"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "What NC and Steam have confirmed",
            paragraphs: [
              "A full free-to-play launch date and time is still not consistently confirmed across official fields. Third-party claims of an October 5 full launch are not backed by the official notices or the Steam fields we checked.",
            ],
            bullets: [
              "Early access starts September 30, 2026 and lasts five days, tied to Founder's Pack purchase (official Team Update).",
              "Three Founder's Pack tiers are listed at $24.99, $49.99, and $99.99 (official July 22 notice).",
              "The Steam page shows September 2026 as the release window and September 30 advance access; rechecked August 8, 2026.",
              "Global PC platforms are Steam and PURPLE (official April 22 announcement).",
            ],
          },
          {
            id: "third-party-expectations",
            title: "What third-party previews expect at launch",
            paragraphs: [
              "An August 7 preview on MMOEXP extrapolates from the Korean and Taiwanese servers to list likely launch PvE: regular dungeons such as Crow Cave, Draupnir, Urugugu, Vasharti, Fire Temple, and Horn Den; Transcendence dungeons Daevas and Arcanis; solo modes Nightmare (first layer) and Ascension Trial; weekly limited dungeons; Shugo Games minigames; and the 10-player raid Ladra.",
              "The same article states that official details on exact global content remain limited. Treat every name in that list as an expectation, not a commitment.",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "Why the Korean roster is not a global promise",
            paragraphs: [
              "Korea and Taiwan launched in November 2025 and have since moved through Season 3 and Chapter 1: level cap 50, nine classes including Brawler, and a long list of dungeons and events. A global version launching in September 2026 can open with a different, staged roster.",
              "Practical consequence: do not pre-plan builds, spending, or guild schedules around unconfirmed dungeon lists. Wait for an official global content notice.",
            ],
          },
          {
            id: "what-to-watch",
            title: "Where the next confirmations will appear",
            paragraphs: [
              "Watch the official global notices on the AION 2 plaync board, the Steam news hub, and NC press releases. When an official global content list appears, KINA will cross-check it item by item and update this coverage.",
              "Until then, the only launch facts you should rely on are the September 30 early-access window, the Founder's Pack tiers, and the Steam/PURPLE platform list.",
            ],
          },
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
        eyebrow: "全球上线观察",
        title: "AION 2 全球版 PvE：上线前已确认的信息",
        description:
          "AION 2全球版上线前，官方已确认内容与第三方PvE预期的对比：9月30日抢先体验、平台与副本清单。",
        intro:
          "随着抢先体验定于9月30日开始，玩家最关心的是全球版到底会带哪些PvE内容。目前官方确认的范围仍然有限，流传的副本清单大多来自对韩服、台服的第三方推测。本文将两者分开说明。",
        sourceNote:
          "官方条目引用NC公告与Steam页（2026年8月8日核对）。副本预期来自第三方前瞻，不是官方路线图。",
        keywords: ["AION 2 全球版 PvE", "AION 2 9月30日", "AION 2 上线副本", "AION 2 抢先体验内容"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "NC与Steam已确认的内容",
            paragraphs: [
              "完整免费上线日期与时间在各官方渠道仍未一致确认。第三方所称10月5日全面上线，未获我们核对过的官方公告或Steam字段支持。",
            ],
            bullets: [
              "抢先体验于2026年9月30日开始，为期5天，与创始人包购买绑定（官方Team Update）。",
              "创始人包三档标价$24.99、$49.99与$99.99（7月22日官方公告）。",
              "Steam页显示发行窗口为2026年9月、抢先体验为9月30日；2026年8月8日复核。",
              "全球PC平台为Steam与PURPLE（4月22日官方公告）。",
            ],
          },
          {
            id: "third-party-expectations",
            title: "第三方前瞻对上线内容的预期",
            paragraphs: [
              "MMOEXP在8月7日的前瞻中，以韩服与台服为参照列出可能的上线PvE：普通副本如乌鸦洞穴、Draupnir、Urugugu、Vasharti、火之神殿与角巢；超越副本Daevas与Arcanis；单人玩法噩梦（第一层）与升天试炼；每周限制副本；Shugo小游戏；以及10人讨伐Ladra。",
              "同一篇文章也承认，关于全球版确切内容的官方细节仍然有限。请把清单中的每个名称当作预期，而不是承诺。",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "为什么韩服内容不等于全球版承诺",
            paragraphs: [
              "韩国与台服2025年11月上线，此后经历了Season 3与Chapter 1：50级上限、包括拳星在内的9个职业，以及大量副本与活动。2026年9月上线的全球版完全可能以分阶段、不同的内容阵容开服。",
              "实际建议：不要围绕未经确认的副本清单提前规划Build、消费或公会日程，请等待官方全球内容公告。",
            ],
          },
          {
            id: "what-to-watch",
            title: "下一批确认信息会出现在哪里",
            paragraphs: [
              "关注AION 2 plaync官方公告板、Steam新闻中心与NC新闻稿。官方全球内容清单发布后，KINA将逐项核对并更新报道。",
              "在那之前，可依赖的上线事实只有：9月30日抢先体验窗口、创始人包档位与Steam/PURPLE平台清单。",
            ],
          },
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
        eyebrow: "全球上線觀察",
        title: "AION 2 全球版 PvE：上線前已確認的資訊",
        description:
          "AION 2全球版上線前，官方已確認內容與第三方PvE預期的對比：9月30日搶先體驗、平台與副本清單。",
        intro:
          "隨著搶先體驗定於9月30日開始，玩家最關心的是全球版到底會帶哪些PvE內容。目前官方確認的範圍仍然有限，流傳的副本清單大多來自對韓服、台服的第三方推測。本文將兩者分開說明。",
        sourceNote:
          "官方條目引用NC公告與Steam頁（2026年8月8日核對）。副本預期來自第三方前瞻，不是官方路線圖。",
        keywords: ["AION 2 全球版 PvE", "AION 2 9月30日", "AION 2 上線副本", "AION 2 搶先體驗內容"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "NC與Steam已確認的內容",
            paragraphs: [
              "完整免費上線日期與時間在各官方渠道仍未一致確認。第三方所稱10月5日全面上線，未獲我們核對過的官方公告或Steam欄位支持。",
            ],
            bullets: [
              "搶先體驗於2026年9月30日開始，為期5天，與創始人包購買綁定（官方Team Update）。",
              "創始人包三檔標價$24.99、$49.99與$99.99（7月22日官方公告）。",
              "Steam頁顯示發行窗口為2026年9月、搶先體驗為9月30日；2026年8月8日複核。",
              "全球PC平台為Steam與PURPLE（4月22日官方公告）。",
            ],
          },
          {
            id: "third-party-expectations",
            title: "第三方前瞻對上線內容的預期",
            paragraphs: [
              "MMOEXP在8月7日的前瞻中，以韓服與台服為參照列出可能的上線PvE：普通副本如烏鴉洞穴、Draupnir、Urugugu、Vasharti、火之神殿與角巢；超越副本Daevas與Arcanis；單人玩法噩夢（第一層）與升天試煉；每週限制副本；Shugo小遊戲；以及10人討伐Ladra。",
              "同一篇文章也承認，關於全球版確切內容的官方細節仍然有限。請把清單中的每個名稱當作預期，而不是承諾。",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "為什麼韓服內容不等於全球版承諾",
            paragraphs: [
              "韓國與台服2025年11月上線，此後經歷了Season 3與Chapter 1：50級上限、包括拳星在內的9個職業，以及大量副本與活動。2026年9月上線的全球版完全可能以分階段、不同的內容陣容開服。",
              "實際建議：不要圍繞未經確認的副本清單提前規劃Build、消費或公會日程，請等待官方全球內容公告。",
            ],
          },
          {
            id: "what-to-watch",
            title: "下一批確認資訊會出現在哪裡",
            paragraphs: [
              "關注AION 2 plaync官方公告板、Steam新聞中心與NC新聞稿。官方全球內容清單發布後，KINA將逐項核對並更新報導。",
              "在那之前，可依賴的上線事實只有：9月30日搶先體驗窗口、創始人包档位與Steam/PURPLE平台清單。",
            ],
          },
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 5, {
        eyebrow: "글로벌 출시 관찰",
        title: "AION 2 글로벌 PvE: 출시 전 확정된 정보",
        description:
          "AION 2 글로벌 출시를 앞두고 공식 확인 사항과 제3자 PvE 예상을 비교합니다: 9월 30일 얼리 액세스, 플랫폼, 던전 목록.",
        intro:
          "얼리 액세스가 9월 30일로 정해지면서 글로벌 버전이 어떤 PvE 콘텐츠를 담을지가 관심사입니다. 공식 확인은 아직 제한적이고, 돌던 던전 목록 대부분은 한국·대만 서버를 근거로 한 제3자 추정입니다. 이 글은 둘을 구분합니다.",
        sourceNote:
          "공식 항목은 NC 공지와 Steam 페이지(2026년 8월 8일 확인)를 인용합니다. 던전 예상은 제3자 미리보기이며 공식 로드맵이 아닙니다.",
        keywords: ["AION 2 글로벌 PvE", "AION 2 9월 30일", "AION 2 출시 던전", "AION 2 얼리 액세스 콘텐츠"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "NC와 Steam이 확정한 내용",
            paragraphs: [
              "완전 무료 출시 날짜와 시각은 공식 채널에서 아직 일관되게 확정되지 않았습니다. 제3자가 주장하는 10월 5일 정식 출시는 저희가 확인한 공식 공지나 Steam 항목에서 뒷받침되지 않습니다.",
            ],
            bullets: [
              "얼리 액세스는 2026년 9월 30일 시작해 5일간 진행되며 파운더스 팩 구매와 연결됩니다(공식 Team Update).",
              "파운더스 팩 3종은 $24.99, $49.99, $99.99로 안내됐습니다(7월 22일 공식 공지).",
              "Steam 페이지는 출시 창을 2026년 9월, 사전 접근을 9월 30일로 표시합니다. 2026년 8월 8일 재확인.",
              "글로벌 PC 플랫폼은 Steam과 PURPLE입니다(4월 22일 공식 발표).",
            ],
          },
          {
            id: "third-party-expectations",
            title: "제3자 미리보기의 출시 콘텐츠 예상",
            paragraphs: [
              "8월 7일 MMOEXP 미리보기는 한국·대만 서버를 근거로 출시 PvE를 추정했습니다: 크로우 케이브, Draupnir, Urugugu, Vasharti, 파이어 템플, 혼 덴 같은 일반 던전, 초월 던전 Daevas와 Arcanis, 솔로 모드 나이트메어(1층)와 승천 시련, 주간 제한 던전, 슈고 게임, 10인 레이드 라드라입니다.",
              "같은 글조차 글로벌 콘텐츠의 공식 세부 사항은 제한적이라고 밝혔습니다. 목록의 모든 이름은 약속이 아닌 기대로 취급하세요.",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "한국 서버 구성이 글로벌 약속이 아닌 이유",
            paragraphs: [
              "한국과 대만은 2025년 11월 출시 후 시즌3와 챕터1을 거쳤습니다: 50레벨 상한, 권성을 포함한 9직업, 수많은 던전과 이벤트. 2026년 9월 출시되는 글로벌 버전은 다른 단계적 구성으로 열릴 수 있습니다.",
              "실천 조언: 미확인 던전 목록을 기준으로 빌드, 소비, 군단 일정을 미리 짜지 마세요. 공식 글로벌 콘텐츠 공지를 기다리세요.",
            ],
          },
          {
            id: "what-to-watch",
            title: "다음 확인 정보는 어디에 나오나",
            paragraphs: [
              "AION 2 plaync 공식 게시판, Steam 뉴스 허브, NC 보도자료를 주시하세요. 공식 글로벌 콘텐츠 목록이 나오면 KINA가 항목별로 대조해 보도를 갱신합니다.",
              "그 전까지 의지할 출시 사실은 9월 30일 얼리 액세스 창, 파운더스 팩 등급, Steam/PURPLE 플랫폼 목록뿐입니다.",
            ],
          },
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 5, {
        eyebrow: "グローバルローンチ監視",
        title: "AION 2グローバルPvE：ローンチ前に確定していること",
        description:
          "AION 2グローバル版の公式確認事項と第三者PvE予想を比較：9月30日早期アクセス、プラットフォーム、ダンジョン一覧。",
        intro:
          "早期アクセスが9月30日に決まり、グローバル版にどんなPvEコンテンツが入るかが注目されています。公式確認はまだ限定的で、出回っているダンジョンリストの大半は韓国・台湾サービスからの第三者推測です。本稿では両者を分けて整理します。",
        sourceNote:
          "公式項目はNC告知とSteamページ（2026年8月8日確認）を引用。ダンジョン予想は第三者プレビューであり公式ロードマップではありません。",
        keywords: ["AION 2 グローバル PvE", "AION 2 9月30日", "AION 2 ローンチダンジョン", "AION 2 早期アクセスコンテンツ"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "NCとSteamが確定したこと",
            paragraphs: [
              "完全無料ローンチの日時はまだ公式チャネル間で一致して確定していません。第三者が主張する10月5日正式ローンチは、確認済みの公式告知やSteam欄で裏付けられていません。",
            ],
            bullets: [
              "早期アクセスは2026年9月30日開始の5日間、ファウンダーズパック購入に紐づきます（公式Team Update）。",
              "ファウンダーズパックは$24.99、$49.99、$99.99の3段階（7月22日公式告知）。",
              "Steamページはリリース枠を2026年9月、先行アクセスを9月30日と表示。2026年8月8日に再確認。",
              "グローバルPCプラットフォームはSteamとPURPLE（4月22日公式発表）。",
            ],
          },
          {
            id: "third-party-expectations",
            title: "第三者プレビューのローンチ予想",
            paragraphs: [
              "8月7日のMMOEXPプレビューは韓国・台湾サーバーを基にPvEを推定：Crow Cave、Draupnir、Urugugu、Vasharti、Fire Temple、Horn Denなどの通常ダンジョン、超越ダンジョンDaevasとArcanis、ソロモードのナイトメア（第1層）とAscension Trial、週制限ダンジョン、Shugo Games、10人レイドLadraです。",
              "同記事自体がグローバル版の公式詳細は限定的と認めています。リストの名称は約束ではなく予想として扱ってください。",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "韓国版構成がグローバルの保証にならない理由",
            paragraphs: [
              "韓国と台湾は2025年11月にローンチし、Season 3とChapter 1を経てきました：レベル上限50、ブローラー含む9クラス、多数のダンジョンとイベント。2026年9月ローンチのグローバル版は段階の異なる構成で始まる可能性があります。",
              "実践的な注意：未確認のダンジョン一覧を基準にビルド、課金、ギルド予定を前倒しで計画しないでください。公式グローバルコンテンツ告知を待ちましょう。",
            ],
          },
          {
            id: "what-to-watch",
            title: "次の確認情報はどこに出るか",
            paragraphs: [
              "AION 2 plaync公式掲示板、Steamニュースハブ、NCプレスリリースを注視してください。公式グローバルコンテンツ一覧が出れば、KINAが項目ごとに突き合わせて更新します。",
              "それまで頼れる事実は9月30日の早期アクセス枠、ファウンダーズパック構成、Steam/PURPLEプラットフォーム一覧のみです。",
            ],
          },
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 5, {
        eyebrow: "VEILLE LANCEMENT GLOBAL",
        title: "AION 2 global PvE : ce qui est confirmé avant le lancement",
        description:
          "Comparatif entre confirmations officielles et attentes PvE tierces pour le lancement mondial d’AION 2 : accès anticipé du 30 septembre, plateformes, donjons.",
        intro:
          "Avec un accès anticipé fixé au 30 septembre, les joueurs veulent savoir quel PvE la version globale contiendra. Les confirmations officielles restent limitées ; la plupart des listes de donjons circulant sont des extrapolations tierces des serveurs coréen et taïwanais. Ce brief sépare les deux.",
        sourceNote:
          "Les éléments officiels citent les avis NC et la page Steam (vérifiée le 8 août 2026). Les attentes de donjons proviennent d’un aperçu tiers, pas d’une feuille de route officielle.",
        keywords: ["AION 2 PvE global", "AION 2 30 septembre", "donjons lancement AION 2", "contenu accès anticipé AION 2"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "Ce que NC et Steam ont confirmé",
            paragraphs: [
              "La date et l’heure du lancement gratuit complet ne sont toujours pas confirmées de façon cohérente sur les canaux officiels. Les affirmations tierces d’un lancement complet le 5 octobre ne sont étayées ni par les avis officiels ni par les champs Steam vérifiés.",
            ],
            bullets: [
              "L’accès anticipé commence le 30 septembre 2026 pour cinq jours, lié à l’achat d’un Founder’s Pack (Team Update officiel).",
              "Trois paliers de Founder’s Pack sont listés à 24,99 $, 49,99 $ et 99,99 $ (avis officiel du 22 juillet).",
              "La page Steam affiche septembre 2026 comme fenêtre de sortie et un accès anticipé au 30 septembre ; revérifié le 8 août 2026.",
              "Les plateformes PC globales sont Steam et PURPLE (annonce officielle du 22 avril).",
            ],
          },
          {
            id: "third-party-expectations",
            title: "Ce que les aperçus tiers attendent au lancement",
            paragraphs: [
              "Un aperçu MMOEXP du 7 août extrapole à partir des serveurs coréen et taïwanais : donjons classiques comme Crow Cave, Draupnir, Urugugu, Vasharti, Fire Temple et Horn Den ; donjons Transcendence Daevas et Arcanis ; modes solo Nightmare (première strate) et Ascension Trial ; donjons hebdomadaires limités ; mini-jeux Shugo Games ; et le raid à 10 Ladra.",
              "Le même article reconnaît que les détails officiels sur le contenu global exact restent limités. Considérez chaque nom comme une attente, pas un engagement.",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "Pourquoi le contenu coréen n’est pas une promesse globale",
            paragraphs: [
              "La Corée et Taïwan ont lancé en novembre 2025 et ont depuis traversé la Season 3 et le Chapter 1 : niveau 50, neuf classes dont Brawler, et de nombreux donjons et événements. Une version globale lancée en septembre 2026 peut ouvrir avec un contenu différent et progressif.",
              "Conséquence pratique : ne planifiez pas builds, dépenses ou calendriers de guilde autour de listes de donjons non confirmées. Attendez un avis officiel global.",
            ],
          },
          {
            id: "what-to-watch",
            title: "Où les prochaines confirmations apparaîtront",
            paragraphs: [
              "Surveillez le board plaync officiel d’AION 2, le hub d’actualités Steam et les communiqués NC. Dès qu’une liste officielle du contenu global paraîtra, KINA la vérifiera point par point.",
              "D’ici là, les seuls faits fiables sont la fenêtre d’accès anticipé du 30 septembre, les paliers Founder’s Pack et les plateformes Steam/PURPLE.",
            ],
          },
        ],
      }),
      de: articleCopy(newsLabels, "de", 5, {
        eyebrow: "GLOBAL-START-BEOBACHTUNG",
        title: "AION 2 global PvE: Was vor dem Start bestätigt ist",
        description:
          "Offiziell bestätigte Inhalte und PvE-Erwartungen Dritter zum globalen AION-2-Start: Early Access am 30. September, Plattformen und Dungeon-Listen.",
        intro:
          "Mit dem Early Access am 30. September fragen Spieler, welches PvE die globale Version wirklich bringt. Offizielle Bestätigungen sind weiter schmal; die meisten Dungeon-Listen sind Hochrechnungen Dritter aus dem koreanischen und taiwanischen Dienst. Dieser Bericht trennt beides.",
        sourceNote:
          "Offizielle Punkte zitieren NC-Hinweise und die Steam-Seite (geprüft am 8. August 2026). Dungeon-Erwartungen stammen aus einer Drittanbieter-Vorschau, nicht aus einer offiziellen Roadmap.",
        keywords: ["AION 2 global PvE", "AION 2 30. September", "AION 2 Dungeons zum Start", "AION 2 Early-Access-Inhalte"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "Was NC und Steam bestätigt haben",
            paragraphs: [
              "Ein vollständiger Free-to-play-Termin ist über die offiziellen Kanäle weiter nicht konsistent bestätigt. Behauptungen Dritter über einen Komplettstart am 5. Oktober werden von den geprüften offiziellen Hinweisen und Steam-Feldern nicht gestützt.",
            ],
            bullets: [
              "Der Early Access beginnt am 30. September 2026 und dauert fünf Tage, gebunden an den Kauf eines Founder’s Pack (offizielles Team Update).",
              "Drei Founder’s-Pack-Stufen werden mit 24,99 $, 49,99 $ und 99,99 $ gelistet (offizieller Hinweis vom 22. Juli).",
              "Die Steam-Seite zeigt September 2026 als Release-Fenster und den 30. September als Vorabzugang; am 8. August 2026 erneut geprüft.",
              "Globale PC-Plattformen sind Steam und PURPLE (offizielle Ankündigung vom 22. April).",
            ],
          },
          {
            id: "third-party-expectations",
            title: "Was Drittanbieter-Vorschauen zum Start erwarten",
            paragraphs: [
              "Eine MMOEXP-Vorschau vom 7. August rechnet vom koreanischen und taiwanischen Server hoch: normale Dungeons wie Crow Cave, Draupnir, Urugugu, Vasharti, Fire Temple und Horn Den; Transcendence-Dungeons Daevas und Arcanis; Solomodi Nightmare (erste Ebene) und Ascension Trial; wöchentlich limitierte Dungeons; Shugo-Games-Minispiele; und der 10-Spieler-Raid Ladra.",
              "Derselbe Artikel räumt ein, dass offizielle Details zum globalen Inhalt weiter begrenzt sind. Behandeln Sie jeden Namen als Erwartung, nicht als Zusage.",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "Warum der Korea-Katalog kein globales Versprechen ist",
            paragraphs: [
              "Korea und Taiwan starteten im November 2025 und haben seitdem Season 3 und Chapter 1 durchlaufen: Level 50, neun Klassen inklusive Brawler sowie viele Dungeons und Events. Eine globale Version im September 2026 kann mit einem anderen, gestuften Katalog öffnen.",
              "Praktische Folge: Planen Sie Builds, Ausgaben oder Gildenzeitpläne nicht um unbestätigte Dungeon-Listen. Warten Sie auf einen offiziellen globalen Inhaltshinweis.",
            ],
          },
          {
            id: "what-to-watch",
            title: "Wo die nächsten Bestätigungen erscheinen",
            paragraphs: [
              "Beobachten Sie das offizielle AION-2-plaync-Board, den Steam-News-Hub und NC-Pressemitteilungen. Sobald eine offizielle globale Inhaltsliste erscheint, gleicht KINA sie Punkt für Punkt ab.",
              "Bis dahin sind die einzigen verlässlichen Fakten das Early-Access-Fenster am 30. September, die Founder’s-Pack-Stufen und die Plattformen Steam/PURPLE.",
            ],
          },
        ],
      }),
      es: articleCopy(newsLabels, "es", 5, {
        eyebrow: "SEGUIMIENTO DEL LANZAMIENTO GLOBAL",
        title: "AION 2 global PvE: qué está confirmado antes del lanzamiento",
        description:
          "Confirmaciones oficiales frente a expectativas PvE de terceros para el lanzamiento global de AION 2: acceso anticipado del 30 de septiembre, plataformas y mazmorras.",
        intro:
          "Con el acceso anticipado fijado para el 30 de septiembre, los jugadores preguntan qué PvE traerá la versión global. Las confirmaciones oficiales siguen siendo limitadas; la mayoría de listas de mazmorras son extrapolaciones de terceros de los servidores coreano y taiwanés. Este informe las separa.",
        sourceNote:
          "Los puntos oficiales citan avisos de NC y la página de Steam (revisada el 8 de agosto de 2026). Las expectativas de mazmorras vienen de una vista previa de terceros, no de una hoja de ruta oficial.",
        keywords: ["AION 2 PvE global", "AION 2 30 de septiembre", "mazmorras de lanzamiento AION 2", "contenido acceso anticipado AION 2"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "Lo que NC y Steam han confirmado",
            paragraphs: [
              "La fecha y hora del lanzamiento completo gratuito aún no están confirmadas de forma coherente en los canales oficiales. Las afirmaciones de terceros sobre un lanzamiento completo el 5 de octubre no se respaldan en los avisos oficiales ni en los campos de Steam que revisamos.",
            ],
            bullets: [
              "El acceso anticipado empieza el 30 de septiembre de 2026 y dura cinco días, ligado a la compra del Founder’s Pack (Team Update oficial).",
              "Hay tres niveles de Founder’s Pack a 24,99 $, 49,99 $ y 99,99 $ (aviso oficial del 22 de julio).",
              "La página de Steam muestra septiembre de 2026 como ventana de lanzamiento y el 30 de septiembre como acceso anticipado; revisado el 8 de agosto de 2026.",
              "Las plataformas PC globales son Steam y PURPLE (anuncio oficial del 22 de abril).",
            ],
          },
          {
            id: "third-party-expectations",
            title: "Lo que las vistas previas de terceros esperan",
            paragraphs: [
              "Una vista previa de MMOEXP del 7 de agosto extrapola de los servidores coreano y taiwanés: mazmorras normales como Crow Cave, Draupnir, Urugugu, Vasharti, Fire Temple y Horn Den; mazmorras Transcendence Daevas y Arcanis; modos en solitario Nightmare (primera capa) y Ascension Trial; mazmorras semanales limitadas; minijuegos Shugo Games; y el raid de 10 jugadores Ladra.",
              "El mismo artículo admite que los detalles oficiales del contenido global exacto siguen siendo limitados. Trate cada nombre como una expectativa, no un compromiso.",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "Por qué el catálogo coreano no es una promesa global",
            paragraphs: [
              "Corea y Taiwán lanzaron en noviembre de 2025 y desde entonces han pasado por la Season 3 y el Chapter 1: nivel 50, nueve clases incluidas Brawler y muchas mazmorras y eventos. Una versión global que lance en septiembre de 2026 puede abrir con un catálogo distinto y escalonado.",
              "Consecuencia práctica: no planifique builds, gastos ni calendarios de gremio en torno a listas de mazmorras sin confirmar. Espere un aviso oficial global.",
            ],
          },
          {
            id: "what-to-watch",
            title: "Dónde aparecerán las próximas confirmaciones",
            paragraphs: [
              "Vigile el tablero oficial plaync de AION 2, el hub de noticias de Steam y los comunicados de NC. Cuando aparezca una lista oficial global, KINA la comprobará punto por punto.",
              "Hasta entonces, los únicos hechos fiables son la ventana de acceso anticipado del 30 de septiembre, los niveles del Founder’s Pack y las plataformas Steam/PURPLE.",
            ],
          },
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 5, {
        eyebrow: "ACOMPANHAMENTO DO LANÇAMENTO GLOBAL",
        title: "AION 2 global PvE: o que está confirmado antes do lançamento",
        description:
          "Confirmações oficiais versus expectativas PvE de terceiros para o lançamento global de AION 2: acesso antecipado em 30 de setembro, plataformas e masmorras.",
        intro:
          "Com o acesso antecipado marcado para 30 de setembro, os jogadores querem saber qual PvE a versão global trará. As confirmações oficiais ainda são estreitas; a maioria das listas de masmorras são extrapolações de terceiros dos servidores coreano e taiwanês. Este resumo separa as duas coisas.",
        sourceNote:
          "Os itens oficiais citam avisos da NC e a página da Steam (verificada em 8 de agosto de 2026). As expectativas de masmorras vêm de uma prévia de terceiros, não de um roteiro oficial.",
        keywords: ["AION 2 PvE global", "AION 2 30 de setembro", "masmorras do lançamento AION 2", "conteúdo do acesso antecipado AION 2"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "O que NC e Steam confirmaram",
            paragraphs: [
              "A data e o horário do lançamento completo gratuito ainda não estão confirmados de forma consistente nos canais oficiais. Alegações de terceiros sobre um lançamento completo em 5 de outubro não são respaldadas pelos avisos oficiais nem pelos campos da Steam que verificamos.",
            ],
            bullets: [
              "O acesso antecipado começa em 30 de setembro de 2026 e dura cinco dias, vinculado à compra do Founder’s Pack (Team Update oficial).",
              "Três níveis de Founder’s Pack são listados a US$ 24,99, US$ 49,99 e US$ 99,99 (aviso oficial de 22 de julho).",
              "A página da Steam mostra setembro de 2026 como janela de lançamento e 30 de setembro como acesso antecipado; reverificado em 8 de agosto de 2026.",
              "As plataformas PC globais são Steam e PURPLE (anúncio oficial de 22 de abril).",
            ],
          },
          {
            id: "third-party-expectations",
            title: "O que as prévias de terceiros esperam no lançamento",
            paragraphs: [
              "Uma prévia da MMOEXP de 7 de agosto extrapola dos servidores coreano e taiwanês: masmorras normais como Crow Cave, Draupnir, Urugugu, Vasharti, Fire Temple e Horn Den; masmorras Transcendence Daevas e Arcanis; modos solo Nightmare (primeira camada) e Ascension Trial; masmorras semanais limitadas; minigames Shugo Games; e o raid de 10 jogadores Ladra.",
              "O próprio artigo afirma que os detalhes oficiais sobre o conteúdo global exato permanecem limitados. Trate cada nome como expectativa, não como compromisso.",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "Por que o catálogo coreano não é promessa global",
            paragraphs: [
              "Coreia e Taiwan lançaram em novembro de 2025 e desde então passaram pela Season 3 e pelo Chapter 1: nível 50, nove classes incluindo Brawler e muitas masmorras e eventos. Uma versão global lançada em setembro de 2026 pode abrir com um catálogo diferente e escalonado.",
              "Consequência prática: não planeje builds, gastos ou agendas de guilda com base em listas de masmorras não confirmadas. Espere um aviso oficial global.",
            ],
          },
          {
            id: "what-to-watch",
            title: "Onde as próximas confirmações aparecerão",
            paragraphs: [
              "Acompanhe o board oficial plaync de AION 2, o hub de notícias da Steam e os comunicados da NC. Quando surgir uma lista oficial global, a KINA a conferirá item por item.",
              "Até lá, os únicos fatos confiáveis são a janela de acesso antecipado de 30 de setembro, os níveis do Founder’s Pack e as plataformas Steam/PURPLE.",
            ],
          },
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 5, {
        eyebrow: "НАБЛЮДЕНИЕ ЗА ГЛОБАЛЬНЫМ ЗАПУСКОМ",
        title: "AION 2 глобальный PvE: что подтверждено до запуска",
        description:
          "Официальные подтверждения и сторонние ожидания PvE для глобального запуска AION 2: ранний доступ 30 сентября, платформы и подземелья.",
        intro:
          "После объявления раннего доступа 30 сентября игроки спрашивают, какой PvE-контент получит глобальная версия. Официальных подтверждений пока мало; большинство списков подземелий — сторонние экстраполяции с корейского и тайваньского серверов. Этот материал их разделяет.",
        sourceNote:
          "Официальные пункты ссылаются на анонсы NC и страницу Steam (проверено 8 августа 2026). Ожидания по подземельям взяты из стороннего превью, а не из официальной дорожной карты.",
        keywords: ["AION 2 глобальный PvE", "AION 2 30 сентября", "подземелья запуска AION 2", "контент раннего доступа AION 2"],
        sections: [
          {
            id: "confirmed-so-far",
            title: "Что подтвердили NC и Steam",
            paragraphs: [
              "Дата и время полного бесплатного запуска всё ещё не подтверждены последовательно во всех официальных каналах. Сторонние утверждения о полном запуске 5 октября не подтверждаются проверенными официальными анонсами и полями Steam.",
            ],
            bullets: [
              "Ранний доступ начинается 30 сентября 2026 и длится пять дней, привязан к покупке Founder’s Pack (официальный Team Update).",
              "Три уровня Founder’s Pack указаны по $24,99, $49,99 и $99,99 (официальный анонс от 22 июля).",
              "Страница Steam показывает окно релиза сентябрь 2026 и ранний доступ 30 сентября; перепроверено 8 августа 2026.",
              "Глобальные PC-платформы — Steam и PURPLE (официальный анонс от 22 апреля).",
            ],
          },
          {
            id: "third-party-expectations",
            title: "Что ожидают сторонние превью на запуске",
            paragraphs: [
              "Превью MMOEXP от 7 августа экстраполирует с корейского и тайваньского серверов: обычные подземелья Crow Cave, Draupnir, Urugugu, Vasharti, Fire Temple и Horn Den; подземелья Transcendence Daevas и Arcanis; одиночные режимы Nightmare (первый слой) и Ascension Trial; еженедельные ограниченные подземелья; мини-игры Shugo Games; рейд на 10 игроков Ladra.",
              "Тот же материал признаёт, что официальных деталей о точном глобальном контенте мало. Каждый пункт списка считайте ожиданием, а не обязательством.",
            ],
          },
          {
            id: "why-expectations-may-differ",
            title: "Почему корейский набор — не обещание для глобала",
            paragraphs: [
              "Корея и Тайвань запустились в ноябре 2025 и с тех пор прошли Season 3 и Chapter 1: 50-й уровень, девять классов с Brawler и множество подземелий и событий. Глобальная версия в сентябре 2026 может открыться с другим, поэтапным набором.",
              "Практический вывод: не стройте билды, траты и расписания гильдии вокруг неподтверждённых списков подземелий. Дождитесь официального глобального анонса.",
            ],
          },
          {
            id: "what-to-watch",
            title: "Где появятся следующие подтверждения",
            paragraphs: [
              "Следите за официальной доской AION 2 на plaync, новостным хабом Steam и пресс-релизами NC. Когда появится официальный глобальный список контента, KINA сверит его по пунктам.",
              "До этого единственные надёжные факты — окно раннего доступа 30 сентября, уровни Founder’s Pack и платформы Steam/PURPLE.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "august-2026-coupon-codes-status",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-08",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [couponLoungeSource, couponTwSource, couponPortalSource],
    heroImage: couponStatusHero,
    related: [
      { kind: "content", section: "news", slug: "aion2chapterone-coupon-status" },
      { kind: "content", section: "guides", slug: "scam-check" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 4, {
        eyebrow: "CODE STATUS CHECK",
        title: "AION2 coupon codes in August 2026: status check",
        description:
          "Which AION2 coupon codes work in August 2026: AION2CHAPTERONE remains active until September 30, two codes are expired, and no new codes were announced.",
        intro:
          "Coupon searches spike every month, and third-party roundups often recycle expired codes. This check, run on August 8, 2026, covers only codes traceable to official NC notices and matches the live status page on this site.",
        sourceNote:
          "Status re-verified against official NC notices on August 8, 2026. Times are KST. The coupon list mirrors this site's codes page; official redemption uses the plaync coupon portal.",
        keywords: ["AION2 coupon codes August 2026", "AION2CHAPTERONE status", "AION2 redeem code", "AION2 official coupon portal"],
        sections: [
          {
            id: "active-code",
            title: "Active in August: AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE, published at the SUMMER FESTA Showcase on June 14, 2026 at 17:00 KST, remains redeemable until before the September 30, 2026 scheduled maintenance, once per account.",
              "The official reward list: Sanctum of Erosion reward ticket (30 days) ×1, Odyle Energy (30 days) ×5, Resurrection Spiritstone ×20, Soul Codex ×1,000, and Daily Dungeon Instant Completion Ticket ×10. The official notice scopes it to live-service servers; global PC eligibility is not confirmed by that notice.",
            ],
          },
          {
            id: "expired-codes",
            title: "Expired codes still circulating in roundups",
            paragraphs: [
              "Two earlier official codes are expired and should not be expected to work: AION2SEASON3 (valid until before the July 1 maintenance) and WELCOMEBACK (valid until before the April 8 maintenance).",
              "Several third-party August roundups also list legacy codes from past events without verification. If a code is not on the official notice or this site's codes page, assume it is expired or unsupported.",
            ],
          },
          {
            id: "redeem-safely",
            title: "Where to redeem and how to avoid scams",
            paragraphs: [
              "Use the official coupon portal (nshop.plaync.com/shop/aion2/coupon; the Traditional-Chinese service uses the aion2_tw shop path) or the in-game redemption screen linked from official notices.",
              "Never buy codes from third-party sellers or enter your account on unofficial sites; coupon scams are a recurring pattern around updates. Our scam-check guide lists the warning signs.",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "No new official codes in the August 6–8 window",
            paragraphs: [
              "Our check of official notices between August 6 and August 8 found no new coupon announcements. If NC publishes one, the codes page on this site will be updated with the official window and rewards.",
              "For the fastest status, bookmark the codes page rather than third-party listicles, which frequently mix expired and active codes.",
            ],
          },
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 4, {
        eyebrow: "兑换码状态核对",
        title: "2026年8月AION2兑换码：状态核对",
        description:
          "2026年8月哪些AION2兑换码可用：AION2CHAPTERONE有效至9月30日，两个兑换码已过期，未发现新兑换码公告。",
        intro:
          "每月兑换码搜索都会升温，第三方汇总文章常把过期码混在一起。本次核对于2026年8月8日执行，只收录可追溯到NC官方公告的兑换码，与本站兑换码页保持一致。",
        sourceNote:
          "状态于2026年8月8日与NC官方公告重新核对。时间为KST。兑换码清单与本站兑换码页一致；官方兑换入口为plaync兑换码页。",
        keywords: ["AION2 兑换码 2026年8月", "AION2CHAPTERONE 状态", "AION2 兑换码怎么用", "AION2 官方兑换入口"],
        sections: [
          {
            id: "active-code",
            title: "8月有效：AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE 于2026年6月14日17:00（KST）SUMMER FESTA Showcase公布，可在2026年9月30日定期维护前兑换，每账号限一次。",
              "官方奖励清单：侵蚀净化所奖励券（30日）×1、奥德能量（30日）×5、复活精灵石×20、灵魂之书×1,000、每日副本立即完成券×10。官方公告限定现行运营服服务器；该公告未确认全球PC版适用。",
            ],
          },
          {
            id: "expired-codes",
            title: "仍在流传的已过期兑换码",
            paragraphs: [
              "两个早期官方兑换码已过期，不应再期待生效：AION2SEASON3（有效期至7月1日维护前）与WELCOMEBACK（有效期至4月8日维护前）。",
              "一些8月第三方汇总还列出未核实的过往活动兑换码。若某个兑换码不在官方公告或本站兑换码页上，请按过期或不支持处理。",
            ],
          },
          {
            id: "redeem-safely",
            title: "在哪里兑换、如何防骗",
            paragraphs: [
              "请使用官方兑换入口（nshop.plaync.com/shop/aion2/coupon；繁中服为aion2_tw商店路径），或官方公告链接的游戏内兑换界面。",
              "不要向第三方购买兑换码，也不要在非官方网站输入账号；兑换码诈骗在版本更新期反复出现。本站防骗指南列出了常见警示信号。",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "8月6日至8日未发现新官方兑换码",
            paragraphs: [
              "我们核对8月6日至8日官方公告期间，未发现新兑换码公告。若NC发布新码，本站兑换码页将同步更新官方期限与奖励。",
              "想最快掌握状态，请收藏本站兑换码页，而不是第三方清单文章——它们经常把过期码与有效码混排。",
            ],
          },
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 4, {
        eyebrow: "兌換碼狀態核對",
        title: "2026年8月AION2兌換碼：狀態核對",
        description:
          "2026年8月哪些AION2兌換碼可用：AION2CHAPTERONE有效至9月30日，兩個兌換碼已過期，未發現新兌換碼公告。",
        intro:
          "每月兌換碼搜尋都會升溫，第三方匯總文章常把過期碼混在一起。本次核對於2026年8月8日執行，只收錄可追溯到NC官方公告的兌換碼，與本站兌換碼頁保持一致。",
        sourceNote:
          "狀態於2026年8月8日與NC官方公告重新核對。時間為KST。兌換碼清單與本站兌換碼頁一致；官方兌換入口為plaync兌換碼頁。",
        keywords: ["AION2 兌換碼 2026年8月", "AION2CHAPTERONE 狀態", "AION2 兌換碼怎麼用", "AION2 官方兌換入口"],
        sections: [
          {
            id: "active-code",
            title: "8月有效：AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE 於2026年6月14日17:00（KST）SUMMER FESTA Showcase公布，可在2026年9月30日定期維護前兌換，每帳號限一次。",
              "官方獎勵清單：侵蝕淨化所獎勵券（30日）×1、奧德能量（30日）×5、復活精靈石×20、靈魂之書×1,000、每日副本立即完成券×10。官方公告限定現行營運服伺服器；該公告未確認全球PC版適用。",
            ],
          },
          {
            id: "expired-codes",
            title: "仍在流傳的已過期兌換碼",
            paragraphs: [
              "兩個早期官方兌換碼已過期，不應再期待生效：AION2SEASON3（有效期至7月1日維護前）與WELCOMEBACK（有效期至4月8日維護前）。",
              "一些8月第三方匯總還列出未核實的過往活動兌換碼。若某個兌換碼不在官方公告或本站兌換碼頁上，請按過期或不支援處理。",
            ],
          },
          {
            id: "redeem-safely",
            title: "在哪裡兌換、如何防騙",
            paragraphs: [
              "請使用官方兌換入口（nshop.plaync.com/shop/aion2/coupon；繁中服為aion2_tw商店路徑），或官方公告連結的遊戲內兌換介面。",
              "不要向第三方購買兌換碼，也不要在非官方網站輸入帳號；兌換碼詐騙在版本更新期反覆出現。本站防騙指南列出了常見警示信號。",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "8月6日至8日未發現新官方兌換碼",
            paragraphs: [
              "我們核對8月6日至8日官方公告期間，未發現新兌換碼公告。若NC發布新碼，本站兌換碼頁將同步更新官方期限與獎勵。",
              "想最快掌握狀態，請收藏本站兌換碼頁，而不是第三方清單文章——它們經常把過期碼與有效碼混排。",
            ],
          },
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 4, {
        eyebrow: "쿠폰 상태 확인",
        title: "2026년 8월 AION2 쿠폰 코드: 상태 확인",
        description:
          "2026년 8월 사용 가능한 AION2 쿠폰 코드: AION2CHAPTERONE은 9월 30일까지 유효, 두 코드는 만료, 신규 코드 공지 없음.",
        intro:
          "매달 쿠폰 검색이 늘면서 제3자 정리글에 만료된 코드가 섞이곤 합니다. 2026년 8월 8일에 수행한 이번 확인은 NC 공식 공지로 추적 가능한 코드만 다루며, 이 사이트의 쿠폰 페이지와 동일합니다.",
        sourceNote:
          "상태는 2026년 8월 8일 NC 공식 공지와 재확인했습니다. 시각은 KST 기준이며, 쿠폰 목록은 이 사이트의 쿠폰 페이지와 같습니다. 공식 등록은 plaync 쿠폰 페이지를 사용합니다.",
        keywords: ["AION2 쿠폰 코드 2026년 8월", "AION2CHAPTERONE 상태", "AION2 쿠폰 등록", "AION2 공식 쿠폰 페이지"],
        sections: [
          {
            id: "active-code",
            title: "8월 유효 코드: AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE은 2026년 6월 14일 17:00(KST) SUMMER FESTA 쇼케이스에서 공개됐으며, 2026년 9월 30일 정기점검 전까지 계정당 1회 등록할 수 있습니다.",
              "공식 보상: 침식의 성소 보상 이용권(30일) ×1, 오드 에너지(30일) ×5, 부활의 정령석 ×20, 영혼의 서 ×1,000, 일일 던전 즉시 완료권 ×10. 공식 공지는 현재 라이브 서버를 대상으로 하며 글로벌 PC 버전 적용 여부는 그 공지로 확인되지 않았습니다.",
            ],
          },
          {
            id: "expired-codes",
            title: "여전히 떠도는 만료된 코드",
            paragraphs: [
              "이전 공식 코드 두 개는 만료됐습니다: AION2SEASON3(7월 1일 점검 전까지 유효), WELCOMEBACK(4월 8일 점검 전까지 유효).",
              "8월 일부 제3자 정리글에는 검증되지 않은 과거 이벤트 코드도 있습니다. 공식 공지나 이 사이트 쿠폰 페이지에 없는 코드는 만료 또는 미지원으로 간주하세요.",
            ],
          },
          {
            id: "redeem-safely",
            title: "등록 위치와 사기 방지",
            paragraphs: [
              "공식 쿠폰 페이지(nshop.plaync.com/shop/aion2/coupon, 번체 서비스는 aion2_tw 경로)나 공식 공지에 연결된 게임 내 등록 화면을 사용하세요.",
              "제3자에게 코드를 사거나 비공식 사이트에 계정을 입력하지 마세요. 쿠폰 사기는 업데이트 시기마다 반복됩니다. 사기 체크 가이드에서 경고 신호를 확인할 수 있습니다.",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "8월 6~8일 신규 공식 코드 없음",
            paragraphs: [
              "8월 6일부터 8일까지 공식 공지를 확인한 결과 새 쿠폰 발표는 없었습니다. NC가 새 코드를 발표하면 이 사이트 쿠폰 페이지에 공식 기간과 보상을 함께 갱신합니다.",
              "가장 빠른 상태 확인은 제3자 목록 글보다 이 사이트 쿠폰 페이지를 즐겨찾기하는 것입니다. 목록 글은 만료 코드와 유효 코드를 섞는 경우가 많습니다.",
            ],
          },
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 4, {
        eyebrow: "コード状況チェック",
        title: "2026年8月のAION2クーポンコード：状況チェック",
        description:
          "2026年8月に使えるAION2クーポンコード：AION2CHAPTERONEは9月30日まで有効、2つは期限切れ、新規コードの告知なし。",
        intro:
          "毎月クーポン検索は増え、第三者まとめには期限切れコードが混ざりがちです。2026年8月8日に実施した本チェックはNC公式告知に遡れるコードのみを扱い、当サイトのコードページと一致させます。",
        sourceNote:
          "状況は2026年8月8日にNC公式告知と再照合済み。時刻はKST。コード一覧は当サイトページと同じで、公式引き換えはplayncクーポン窓口を使用します。",
        keywords: ["AION2 クーポンコード 2026年8月", "AION2CHAPTERONE 状況", "AION2 コード引き換え", "AION2 公式クーポン窓口"],
        sections: [
          {
            id: "active-code",
            title: "8月に有効：AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONEは2026年6月14日17:00（KST）のSUMMER FESTA Showcaseで公開され、2026年9月30日の定期メンテナンス前まで、1アカウント1回引き換え可能です。",
              "公式報酬：侵食浄化所報酬チケット（30日）×1、オードエネルギー（30日）×5、復活の精霊石×20、魂の書×1,000、デイリーダンジョン即時完了券×10。公式告知は現行ライブサーバーを対象としており、グローバルPC版の適用はその告知では確認されていません。",
            ],
          },
          {
            id: "expired-codes",
            title: "まだ出回っている期限切れコード",
            paragraphs: [
              "以前の公式コード2つは期限切れです：AION2SEASON3（7月1日メンテナンス前まで有効）、WELCOMEBACK（4月8日メンテナンス前まで有効）。",
              "8月の第三者まとめには検証されていない過去イベントのコードも含まれます。公式告知か当サイトコードページにないコードは期限切れ・非対応と判断してください。",
            ],
          },
          {
            id: "redeem-safely",
            title: "引き換え場所と詐欺対策",
            paragraphs: [
              "公式クーポン窓口（nshop.plaync.com/shop/aion2/coupon、繁体字版はaion2_twショップ経路）か、公式告知からリンクされたゲーム内引き換え画面を使用してください。",
              "第三者からコードを購入したり、非公式サイトにアカウントを入力しないでください。クーポン詐欺は更新期に繰り返されます。警告サインは詐欺チェックガイドにまとめています。",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "8月6〜8日に新規公式コードなし",
            paragraphs: [
              "8月6日から8日の公式告知を確認しましたが、新しいクーポン発表はありませんでした。NCが発表すれば、当サイトコードページに公式期間と報酬を追記します。",
              "最速で状況を把握するには、第三者のリスト記事より当サイトコードページのブックマークを推奨します。リスト記事は期限切れと有効コードが混在しがちです。",
            ],
          },
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 4, {
        eyebrow: "VÉRIFICATION DES CODES",
        title: "Codes promo AION2 en août 2026 : état des lieux",
        description:
          "Quels codes AION2 fonctionnent en août 2026 : AION2CHAPTERONE actif jusqu’au 30 septembre, deux codes expirés, aucun nouveau code annoncé.",
        intro:
          "Les recherches de codes explosent chaque mois et les listes tierces recyclent souvent des codes expirés. Cette vérification du 8 août 2026 ne retient que des codes traçables vers des avis officiels NC et correspond à la page codes du site.",
        sourceNote:
          "Statut revérifié le 8 août 2026 contre les avis officiels NC. Heures en KST. La liste correspond à la page codes du site ; l’échange officiel passe par le portail plaync.",
        keywords: ["codes promo AION2 août 2026", "statut AION2CHAPTERONE", "échanger code AION2", "portail officiel coupons AION2"],
        sections: [
          {
            id: "active-code",
            title: "Actif en août : AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE, publié lors du SUMMER FESTA Showcase le 14 juin 2026 à 17 h 00 KST, reste utilisable jusqu’avant la maintenance prévue du 30 septembre 2026, une fois par compte.",
              "Récompenses officielles : ticket de récompense du Sanctuaire de l’érosion (30 jours) ×1, Énergie d’Odyle (30 jours) ×5, Pierre spirituelle de résurrection ×20, Codex d’âme ×1 000, ticket d’achèvement instantané de donjon quotidien ×10. L’avis officiel vise les serveurs du service actuel ; l’éligibilité PC globale n’y est pas confirmée.",
            ],
          },
          {
            id: "expired-codes",
            title: "Codes expirés qui circulent encore",
            paragraphs: [
              "Deux anciens codes officiels sont expirés : AION2SEASON3 (valable jusqu’avant la maintenance du 1er juillet) et WELCOMEBACK (jusqu’avant celle du 8 avril).",
              "Certaines listes tierces d’août citent aussi des codes d’événements passés sans vérification. Si un code ne figure ni dans l’avis officiel ni sur la page codes du site, considérez-le comme expiré ou non pris en charge.",
            ],
          },
          {
            id: "redeem-safely",
            title: "Où échanger et éviter les arnaques",
            paragraphs: [
              "Utilisez le portail officiel de coupons (nshop.plaync.com/shop/aion2/coupon ; le service en chinois traditionnel utilise le chemin aion2_tw) ou l’écran d’échange en jeu relié aux avis officiels.",
              "N’achetez jamais de codes à des tiers et ne saisissez pas votre compte sur des sites non officiels ; les arnaques aux coupons reviennent à chaque mise à jour. Notre guide anti-arnaque liste les signaux d’alerte.",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "Aucun nouveau code officiel entre le 6 et le 8 août",
            paragraphs: [
              "Notre vérification des avis officiels entre le 6 et le 8 août n’a trouvé aucune annonce de coupon. Si NC en publie un, la page codes du site sera mise à jour avec la fenêtre officielle et les récompenses.",
              "Pour un statut rapide, mettez la page codes du site en favori plutôt que les listes tierces, qui mélangent souvent codes expirés et actifs.",
            ],
          },
        ],
      }),
      de: articleCopy(newsLabels, "de", 4, {
        eyebrow: "CODE-STATUS-CHECK",
        title: "AION2-Coupon-Codes im August 2026: Status-Check",
        description:
          "Welche AION2-Codes im August 2026 funktionieren: AION2CHAPTERONE aktiv bis 30. September, zwei Codes abgelaufen, keine neuen Codes angekündigt.",
        intro:
          "Jeden Monat steigen die Code-Suchen, und Drittanbieter-Listen führen oft abgelaufene Codes weiter. Dieser Check vom 8. August 2026 umfasst nur Codes, die auf offizielle NC-Hinweise zurückgehen, und entspricht der Code-Seite dieser Website.",
        sourceNote:
          "Status am 8. August 2026 mit offiziellen NC-Hinweisen erneut geprüft. Zeiten in KST. Die Liste entspricht der Code-Seite der Website; offizielle Einlösung läuft über das plaync-Coupon-Portal.",
        keywords: ["AION2 Coupon-Codes August 2026", "AION2CHAPTERONE Status", "AION2 Code einlösen", "AION2 offizielles Coupon-Portal"],
        sections: [
          {
            id: "active-code",
            title: "Im August aktiv: AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE, beim SUMMER-FESTA-Showcase am 14. Juni 2026 um 17:00 Uhr KST veröffentlicht, bleibt bis vor der planmäßigen Wartung am 30. September 2026 einlösbar, einmal pro Konto.",
              "Offizielle Belohnungen: Belohnungsticket für das Heiligtum der Erosion (30 Tage) ×1, Odyle-Energie (30 Tage) ×5, Auferstehungs-Geisterstein ×20, Seelenkodex ×1.000, Sofortabschluss-Ticket für tägliche Dungeons ×10. Der offizielle Hinweis nennt die Live-Server; eine Berechtigung für die globale PC-Version bestätigt er nicht.",
            ],
          },
          {
            id: "expired-codes",
            title: "Abgelaufene Codes, die weiter kursieren",
            paragraphs: [
              "Zwei frühere offizielle Codes sind abgelaufen: AION2SEASON3 (gültig bis vor der Wartung am 1. Juli) und WELCOMEBACK (bis vor der Wartung am 8. April).",
              "Einige August-Listen Dritter nennen ungeprüfte Alt-Codes. Steht ein Code nicht im offiziellen Hinweis oder auf der Code-Seite dieser Website, gilt er als abgelaufen oder nicht unterstützt.",
            ],
          },
          {
            id: "redeem-safely",
            title: "Wo einlösen und wie man Betrug vermeidet",
            paragraphs: [
              "Nutzen Sie das offizielle Coupon-Portal (nshop.plaync.com/shop/aion2/coupon; der traditionell-chinesische Dienst nutzt den aion2_tw-Pfad) oder den Ingame-Einlösebildschirm aus offiziellen Hinweisen.",
              "Kaufen Sie keine Codes von Dritten und geben Sie Ihr Konto nicht auf inoffiziellen Seiten ein; Coupon-Betrug kehrt rund um Updates wieder. Unser Scam-Check-Guide nennt die Warnsignale.",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "Keine neuen offiziellen Codes zwischen 6. und 8. August",
            paragraphs: [
              "Unsere Prüfung der offiziellen Hinweise vom 6. bis 8. August fand keine neuen Coupon-Ankündigungen. Veröffentlicht NC einen, wird die Code-Seite dieser Website mit offiziellem Fenster und Belohnungen aktualisiert.",
              "Für den schnellsten Status die Code-Seite dieser Website als Lesezeichen speichern statt Drittlisten, die oft abgelaufene und aktive Codes mischen.",
            ],
          },
        ],
      }),
      es: articleCopy(newsLabels, "es", 4, {
        eyebrow: "VERIFICACIÓN DE CÓDIGOS",
        title: "Códigos de AION2 en agosto de 2026: verificación",
        description:
          "Qué códigos de AION2 funcionan en agosto de 2026: AION2CHAPTERONE activo hasta el 30 de septiembre, dos códigos caducados y sin códigos nuevos anunciados.",
        intro:
          "Las búsquedas de códigos suben cada mes y las listas de terceros suelen reciclar códigos caducados. Esta verificación del 8 de agosto de 2026 solo incluye códigos rastreables a avisos oficiales de NC y coincide con la página de códigos del sitio.",
        sourceNote:
          "Estado reverificado el 8 de agosto de 2026 con avisos oficiales de NC. Horas en KST. La lista refleja la página de códigos del sitio; el canje oficial usa el portal de plaync.",
        keywords: ["códigos AION2 agosto 2026", "estado AION2CHAPTERONE", "canjear código AION2", "portal oficial de cupones AION2"],
        sections: [
          {
            id: "active-code",
            title: "Activo en agosto: AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE, publicado en el SUMMER FESTA Showcase el 14 de junio de 2026 a las 17:00 KST, sigue canjeable hasta antes del mantenimiento programado del 30 de septiembre de 2026, una vez por cuenta.",
              "Recompensas oficiales: vale de recompensa del Santuario de la Erosión (30 días) ×1, Energía de Odyle (30 días) ×5, Piedra espiritual de resurrección ×20, Códice de alma ×1.000, vale de finalización instantánea de mazmorra diaria ×10. El aviso oficial cubre los servidores del servicio actual; no confirma la elegibilidad de la edición global para PC.",
            ],
          },
          {
            id: "expired-codes",
            title: "Códigos caducados que siguen circulando",
            paragraphs: [
              "Dos códigos oficiales anteriores están caducados: AION2SEASON3 (válido hasta antes del mantenimiento del 1 de julio) y WELCOMEBACK (hasta antes del 8 de abril).",
              "Algunas listas de agosto de terceros incluyen códigos antiguos sin verificar. Si un código no está en el aviso oficial ni en la página de códigos del sitio, considérelo caducado o no compatible.",
            ],
          },
          {
            id: "redeem-safely",
            title: "Dónde canjear y evitar estafas",
            paragraphs: [
              "Use el portal oficial de cupones (nshop.plaync.com/shop/aion2/coupon; el servicio en chino tradicional usa la ruta aion2_tw) o la pantalla de canje del juego enlazada desde avisos oficiales.",
              "No compre códigos a terceros ni introduzca su cuenta en sitios no oficiales; las estafas de cupones se repiten en cada actualización. Nuestra guía antiestafas lista las señales de alerta.",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "Sin códigos oficiales nuevos entre el 6 y el 8 de agosto",
            paragraphs: [
              "Nuestra revisión de avisos oficiales entre el 6 y el 8 de agosto no encontró anuncios de cupones. Si NC publica uno, la página de códigos del sitio se actualizará con la ventana oficial y las recompensas.",
              "Para conocer el estado rápido, guarde la página de códigos del sitio en marcadores en vez de listas de terceros, que suelen mezclar códigos caducados y activos.",
            ],
          },
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 4, {
        eyebrow: "VERIFICAÇÃO DE CÓDIGOS",
        title: "Códigos de AION2 em agosto de 2026: verificação",
        description:
          "Quais códigos de AION2 funcionam em agosto de 2026: AION2CHAPTERONE ativo até 30 de setembro, dois códigos expirados e nenhum código novo anunciado.",
        intro:
          "As buscas por códigos aumentam todo mês e listas de terceiros costumam reciclar códigos expirados. Esta verificação de 8 de agosto de 2026 cobre apenas códigos rastreáveis a avisos oficiais da NC e corresponde à página de códigos do site.",
        sourceNote:
          "Status reverificado em 8 de agosto de 2026 com os avisos oficiais da NC. Horários em KST. A lista espelha a página de códigos do site; o resgate oficial usa o portal da plaync.",
        keywords: ["códigos AION2 agosto 2026", "status AION2CHAPTERONE", "resgatar código AION2", "portal oficial de cupons AION2"],
        sections: [
          {
            id: "active-code",
            title: "Ativo em agosto: AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE, publicado no SUMMER FESTA Showcase em 14 de junho de 2026 às 17:00 KST, segue resgatável até antes da manutenção programada de 30 de setembro de 2026, uma vez por conta.",
              "Recompensas oficiais: bilhete de recompensa do Santuário da Erosão (30 dias) ×1, Energia de Odyle (30 dias) ×5, Pedra espiritual de ressurreição ×20, Códice da alma ×1.000, bilhete de conclusão instantânea de masmorra diária ×10. O aviso oficial vale para os servidores do serviço atual; a elegibilidade da edição global para PC não é confirmada por ele.",
            ],
          },
          {
            id: "expired-codes",
            title: "Códigos expirados que ainda circulam",
            paragraphs: [
              "Dois códigos oficiais anteriores expiraram: AION2SEASON3 (válido até antes da manutenção de 1º de julho) e WELCOMEBACK (até antes da de 8 de abril).",
              "Algumas listas de agosto de terceiros citam códigos antigos sem verificação. Se um código não está no aviso oficial nem na página de códigos do site, considere-o expirado ou não suportado.",
            ],
          },
          {
            id: "redeem-safely",
            title: "Onde resgatar e como evitar golpes",
            paragraphs: [
              "Use o portal oficial de cupons (nshop.plaync.com/shop/aion2/coupon; o serviço em chinês tradicional usa o caminho aion2_tw) ou a tela de resgate no jogo vinculada aos avisos oficiais.",
              "Nunca compre códigos de terceiros nem digite sua conta em sites não oficiais; golpes de cupons se repetem a cada atualização. Nosso guia anti-golpe lista os sinais de alerta.",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "Nenhum código oficial novo entre 6 e 8 de agosto",
            paragraphs: [
              "Nossa checagem dos avisos oficiais entre 6 e 8 de agosto não encontrou anúncios de cupons. Se a NC publicar um, a página de códigos do site será atualizada com a janela oficial e as recompensas.",
              "Para status rápido, salve a página de códigos do site nos favoritos em vez de listas de terceiros, que costumam misturar códigos expirados e ativos.",
            ],
          },
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 4, {
        eyebrow: "ПРОВЕРКА СТАТУСА КОДОВ",
        title: "Купоны AION2 в августе 2026: проверка статуса",
        description:
          "Какие купоны AION2 работают в августе 2026: AION2CHAPTERONE активен до 30 сентября, два кода истекли, новых кодов не объявлено.",
        intro:
          "Каждый месяц поиск кодов растёт, а сторонние подборки часто перепечатывают истёкшие коды. Эта проверка от 8 августа 2026 охватывает только коды, прослеживаемые к официальным анонсам NC, и совпадает со страницей кодов сайта.",
        sourceNote:
          "Статус перепроверен 8 августа 2026 по официальным анонсам NC. Время в KST. Список совпадает со страницей кодов сайта; официальный обмен идёт через портал plaync.",
        keywords: ["купон коды AION2 август 2026", "статус AION2CHAPTERONE", "активировать код AION2", "официальный портал купонов AION2"],
        sections: [
          {
            id: "active-code",
            title: "Активен в августе: AION2CHAPTERONE",
            paragraphs: [
              "AION2CHAPTERONE, опубликованный на SUMMER FESTA Showcase 14 июня 2026 в 17:00 KST, можно активировать до плановых техработ 30 сентября 2026, один раз на аккаунт.",
              "Официальные награды: билет наград Святилища эрозии (30 дней) ×1, Энергия Одиля (30 дней) ×5, Камень духа воскрешения ×20, Кодекс души ×1 000, билет мгновенного завершения ежедневного подземелья ×10. Официальный анонс относится к действующим серверам; применимость к глобальной PC-версии им не подтверждена.",
            ],
          },
          {
            id: "expired-codes",
            title: "Истёкшие коды, которые всё ещё гуляют",
            paragraphs: [
              "Два прежних официальных кода истекли: AION2SEASON3 (действовал до техработ 1 июля) и WELCOMEBACK (до техработ 8 апреля).",
              "Некоторые августовские подборки третьих сторон приводят непроверенные старые коды. Если кода нет в официальном анонсе или на странице кодов сайта, считайте его истёкшим или неподдерживаемым.",
            ],
          },
          {
            id: "redeem-safely",
            title: "Где активировать и как избежать мошенников",
            paragraphs: [
              "Используйте официальный портал купонов (nshop.plaync.com/shop/aion2/coupon; сервис на традиционном китайском использует путь aion2_tw) или внутриигровой экран обмена из официальных анонсов.",
              "Не покупайте коды у третьих лиц и не вводите аккаунт на неофициальных сайтах; купонные схемы повторяются вокруг каждого обновления. Наш гид по мошенничеству перечисляет тревожные признаки.",
            ],
          },
          {
            id: "no-new-codes-found",
            title: "Новых официальных кодов с 6 по 8 августа нет",
            paragraphs: [
              "Проверка официальных анонсов с 6 по 8 августа не нашла объявлений купонов. Если NC опубликует новый, страница кодов сайта будет обновлена с официальным окном и наградами.",
              "Для быстрого статуса держите в закладках страницу кодов сайта, а не сторонние подборки, где часто смешаны истёкшие и активные коды.",
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];

/**
 * All five entries carry reviewed translations for every public locale
 * directly; empty generated-locale records keep them compatible with the
 * shared editorial expansion pipeline.
 */
export const trendingAugust08GeneratedEditorialEntries = {
  "news/august-5-2026-deva-look-change-week-update": {},
  "guides/deva-look-change-week-guide": {},
  "news/august-2026-datamine-askran-atiel-noiran": {},
  "news/global-launch-pve-content-what-we-know": {},
  "news/august-2026-coupon-codes-status": {},
} as const;
