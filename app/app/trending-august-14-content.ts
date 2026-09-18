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

const gamescomUrl = "https://www.aion2hub.com/news/gamescom-2026-ncsoft-aion2";
const gamescomSource: ContentSource = {
  id: "aion2hub-gamescom-2026-2026-08-14",
  kind: "third-party", publisher: "AION2Hub",
  label: "AION2 at Gamescom 2026: NCSoft's Opening Night Live Showcase",
  url: gamescomUrl,
  publishedAt: "2026-08-10",
  retrievedAt: "2026-08-14",
  verifiedAt: "2026-08-14",
  localizations: localizations({
    "zh-hans": "AION2 科隆游戏展 2026：NCSoft Opening Night Live 展示",
    en: "AION2 at Gamescom 2026: NCSoft's Opening Night Live Showcase",
    fr: "AION2 à la Gamescom 2026 : La présentation d'NCSoft à l'Opening Night Live",
    de: "AION2 auf der Gamescom 2026: NCSofts Opening Night Live-Präsentation",
    es: "AION2 en la Gamescom 2026: La presentación de NCSoft en la Opening Night Live",
    ja: "AION2 Gamescom 2026：NCSoft Opening Night Live 出展",
    "pt-br": "AION2 na Gamescom 2026: A apresentação da NCSoft na Opening Night Live",
    ru: "AION2 на Gamescom 2026: Презентация NCSoft на Opening Night Live",
    ko: "AION2 게임스컴 2026: NCSoft 오프닝 나이트 라이브 쇼케이스",
    "zh-hant": "AION2 科隆遊戲展 2026：NCSoft Opening Night Live 展示",
  }, gamescomUrl),
};

const ncDevStreamUrl = "https://aion2.plaync.com/en-us/board/notice/view?articleId=devstream-aug2026";
const ncDevStreamSource: ContentSource = {
  id: "ncsoft-devstream-august-2026-2026-08-14",
  kind: "official", publisher: "NCSOFT",
  label: "AION2 Global Developer Stream — August 2026",
  url: ncDevStreamUrl,
  publishedAt: "2026-08-10",
  retrievedAt: "2026-08-14",
  verifiedAt: "2026-08-14",
  localizations: localizations({
    "zh-hans": "AION2 全球开发者直播——2026年8月",
    en: "AION2 Global Developer Stream — August 2026",
    fr: "Diffusion développeur globale AION2 — Août 2026",
    de: "AION2 globaler Entwickler-Stream — August 2026",
    es: "Transmisión de desarrollador global de AION2 — Agosto de 2026",
    ja: "AION2 グローバル開発者ストリーム — 2026年8月",
    "pt-br": "Transmissão de desenvolvedor global do AION2 — Agosto de 2026",
    ru: "Глобальная трансляция разработчиков AION2 — Август 2026",
    ko: "AION2 글로벌 개발자 스트림 — 2026년 8월",
    "zh-hant": "AION2 全球開發者直播——2026年8月",
  }, ncDevStreamUrl),
};

const mmobombUrl = "https://www.mmobomb.com/tag/aion-2";
const mmobombSource: ContentSource = {
  id: "mmobomb-aion2-august-2026-2026-08-14",
  kind: "third-party", publisher: "MMOBomb",
  label: "MMOBomb AION2 Coverage — August 2026",
  url: mmobombUrl,
  publishedAt: "2026-08-12",
  retrievedAt: "2026-08-14",
  verifiedAt: "2026-08-14",
  localizations: localizations({
    "zh-hans": "MMOBomb AION2 报道——2026年8月",
    en: "MMOBomb AION2 Coverage — August 2026",
    fr: "Couverture MMOBomb AION2 — Août 2026",
    de: "MMOBomb AION2 Berichterstattung — August 2026",
    es: "Cobertura de MMOBomb AION2 — Agosto de 2026",
    ja: "MMOBomb AION2 カバレッジ — 2026年8月",
    "pt-br": "Cobertura do MMOBomb AION2 — Agosto de 2026",
    ru: "Освещение MMOBomb AION2 — Август 2026",
    ko: "MMOBomb AION2 보도 — 2026년 8월",
    "zh-hant": "MMOBomb AION2 報道——2026年8月",
  }, mmobombUrl),
};

const chinaPubUrl = "https://www.aion2hub.com/news/aion2-china-publishing-shengqu-games";
const chinaPubSource: ContentSource = {
  id: "aion2hub-china-publishing-2026-08-14",
  kind: "third-party", publisher: "AION2Hub",
  label: "AION2 China Publishing Deal: NCSoft Signs Shengqu Games",
  url: chinaPubUrl,
  publishedAt: "2026-08-01",
  retrievedAt: "2026-08-14",
  verifiedAt: "2026-08-14",
  localizations: localizations({
    "zh-hans": "AION2 中国发行签约：NCSoft 与盛趣游戏达成合作",
    en: "AION2 China Publishing Deal: NCSoft Signs Shengqu Games",
    fr: "Accord d'édition AION2 en Chine : NCSoft signe avec Shengqu Games",
    de: "AION2 China-Vertriebsabkommen: NCSoft unterzeichnet mit Shengqu Games",
    es: "Acuerdo de publicación de AION2 en China: NCSoft firma con Shengqu Games",
    ja: "AION2 中国パブリッシング契約：NCSoft が盛趣ゲームと署名",
    "pt-br": "Contrato de publicação do AION2 na China: NCSoft assina com Shengqu Games",
    ru: "Соглашение об издании AION2 в Китае: NCSoft подписывает с Shengqu Games",
    ko: "AION2 중국 퍼블리싱 계약: NCSoft, 성취게임즈와 서명",
    "zh-hant": "AION2 中國發行簽約：NCSoft 與盛趣遊戲達成合作",
  }, chinaPubUrl),
};

const steamUrl = "https://store.steampowered.com/app/3393110/AION_2/";
const steamSource: ContentSource = {
  id: "steam-aion2-store-2026-08-14",
  kind: "third-party", publisher: "Valve / NCSOFT",
  label: "AION 2 — Steam Store Page",
  url: steamUrl,
  publishedAt: "2026-06-05",
  retrievedAt: "2026-08-14",
  verifiedAt: "2026-08-14",
  localizations: localizations({
    "zh-hans": "AION 2 — Steam 商店页面",
    en: "AION 2 — Steam Store Page",
    fr: "AION 2 — Page du magasin Steam",
    de: "AION 2 — Steam-Shopseite",
    es: "AION 2 — Página de la tienda de Steam",
    ja: "AION 2 — Steamストアページ",
    "pt-br": "AION 2 — Página da loja Steam",
    ru: "AION 2 — Страница в магазине Steam",
    ko: "AION 2 — Steam 스토어 페이지",
    "zh-hant": "AION 2 — Steam 商店頁面",
  }, steamUrl),
};

const aion2tUrl = "https://aion2t.com/news/38";
const aion2tSource: ContentSource = {
  id: "aion2t-august-12-patch-2026-08-14",
  kind: "third-party", publisher: "AION2T",
  label: "AION2 August 12, 2026 Patch Notes — Detailed Summary",
  url: aion2tUrl,
  publishedAt: "2026-08-12",
  retrievedAt: "2026-08-14",
  verifiedAt: "2026-08-14",
  localizations: localizations({
    "zh-hans": "AION2 8月12日补丁说明——详细摘要",
    en: "AION2 August 12, 2026 Patch Notes — Detailed Summary",
    fr: "Notes de correctif AION2 du 12 août 2026 — Résumé détaillé",
    de: "AION2 Patch-Notizen vom 12. August 2026 — Detaillierte Zusammenfassung",
    es: "Notas del parche de AION2 del 12 de agosto de 2026 — Resumen detallado",
    ja: "AION2 8月12日パッチノート — 詳細サマリー",
    "pt-br": "Notas do patch de AION2 de 12 de agosto de 2026 — Resumo detalhado",
    ru: "Примечания к патчу AION2 от 12 августа 2026 — Подробная сводка",
    ko: "AION2 8월 12일 패치 노트 — 상세 요약",
    "zh-hant": "AION2 8月12日補丁說明——詳細摘要",
  }, aion2tUrl),
};

const ncOfficialUrl2 = "https://about.ncsoft.com/en/news/article/aion2_china_2026";
const ncChinaSource: ContentSource = {
  id: "ncsoft-china-publishing-2026-08-14",
  kind: "official", publisher: "NCSOFT",
  label: "NCSOFT Official Announcement: AION 2 China Publishing Partnership",
  url: ncOfficialUrl2,
  publishedAt: "2026-08-01",
  retrievedAt: "2026-08-14",
  verifiedAt: "2026-08-14",
  localizations: localizations({
    "zh-hans": "NCSOFT 官方公告：AION 2 中国发行合作",
    en: "NCSOFT Official Announcement: AION 2 China Publishing Partnership",
    fr: "Annonce officielle NCSOFT : Partenariat d'édition AION 2 en Chine",
    de: "NCSOFT offizielle Ankündigung: AION 2 China-Vertriebspartnerschaft",
    es: "Anuncio oficial de NCSOFT: Asociación de publicación de AION 2 en China",
    ja: "NCSOFT公式発表：AION 2 中国パブリッシング提携",
    "pt-br": "Anúncio oficial da NCSOFT: Parceria de publicação do AION 2 na China",
    ru: "Официальное объявление NCSOFT: Партнёрство по изданию AION 2 в Китае",
    ko: "NCSOFT 공식 발표: AION 2 중국 퍼블리싱 파트너십",
    "zh-hant": "NCSOFT 官方公告：AION 2 中國發行合作",
  }, ncOfficialUrl2),
};

/* ------------------------------------------------------------------ */
/* Hero images                                                         */
/* ------------------------------------------------------------------ */

const gamescomHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 科隆游戏展 2026 宣传图", caption: "NC 官方配图；AION2 将在8月25日科隆游戏展 Opening Night Live 上亮相。" },
    en: { alt: "AION2 Gamescom 2026 promotional image", caption: "Official NC artwork; AION2 will appear at Gamescom 2026 Opening Night Live on August 25." },
    fr: { alt: "Image promotionnelle AION2 Gamescom 2026", caption: "Visuel officiel NC ; AION2 sera présent à la Gamescom 2026 Opening Night Live le 25 août." },
    de: { alt: "AION2 Gamescom 2026 Werbebild", caption: "Offizielles NC-Artwork; AION2 wird am 25. August auf der Gamescom 2026 Opening Night Live erscheinen." },
    es: { alt: "Imagen promocional de AION2 Gamescom 2026", caption: "Arte oficial de NC; AION2 aparecerá en la Gamescom 2026 Opening Night Live el 25 de agosto." },
    ja: { alt: "AION2 Gamescom 2026 プロモ画像", caption: "NC 公式画像。AION2 は8月25日の Gamescom 2026 Opening Night Live に登場します。" },
    "pt-br": { alt: "Imagem promocional do AION2 Gamescom 2026", caption: "Arte oficial da NC; AION2 aparecerá na Gamescom 2026 Opening Night Live em 25 de agosto." },
    ru: { alt: "Промо-изображение AION2 Gamescom 2026", caption: "Официальный арт NC; AION2 появится на Gamescom 2026 Opening Night Live 25 августа." },
    ko: { alt: "AION2 게임스컴 2026 프로모션 이미지", caption: "NC 공식 이미지입니다. AION2는 8월 25일 게임스컴 2026 오프닝 나이트 라이브에 등장합니다." },
    "zh-hant": { alt: "AION2 科隆遊戲展 2026 宣傳圖", caption: "NC 官方配圖；AION2 將在8月25日科隆遊戲展 Opening Night Live 上亮相。" },
  },
};

const tierListHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 职业强度榜 2026年8月", caption: "NC 官方配图；8月12日治疗职业削弱后的最新职业强度排行。" },
    en: { alt: "AION2 class tier list August 2026", caption: "Official NC artwork; Updated class tier rankings after the August 12 healer nerf." },
    fr: { alt: "Tier list des classes AION2 août 2026", caption: "Visuel officiel NC ; Classement des classes mis à jour après le nerf des soigneurs du 12 août." },
    de: { alt: "AION2 Klassen-Tier-Liste August 2026", caption: "Offizielles NC-Artwork; Aktualisiertes Klassen-Ranking nach dem Heiler-Nerf vom 12. August." },
    es: { alt: "Lista de niveles de clases de AION2 agosto 2026", caption: "Arte oficial de NC; Ranking de clases actualizado tras el nerf de sanadores del 12 de agosto." },
    ja: { alt: "AION2 職業ティアリスト 2026年8月", caption: "NC 公式画像。8月12日のヒーラーナーフ後の最新職業ランキング。" },
    "pt-br": { alt: "Lista de níveis de classes do AION2 agosto 2026", caption: "Arte oficial da NC; Ranking de classes atualizado após o nerf de healers de 12 de agosto." },
    ru: { alt: "Тир-лист классов AION2 август 2026", caption: "Официальный арт NC; Обновлённый рейтинг классов после нерфа лекарей 12 августа." },
    ko: { alt: "AION2 클래스 티어리스트 2026년 8월", caption: "NC 공식 이미지입니다. 8월 12일 힐러 너프 이후 최신 클래스 순위입니다." },
    "zh-hant": { alt: "AION2 職業強度榜 2026年8月", caption: "NC 官方配圖；8月12日治療職業削弱後的最新職業強度排行。" },
  },
};

const chinaHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 中国发行签约宣传图", caption: "NC 官方配图；NCSoft 与盛趣游戏签约，AION2（永恒之塔2）将登陆中国市场。" },
    en: { alt: "AION2 China publishing deal promotional image", caption: "Official NC artwork; NCSoft signs with Shengqu Games to bring AION2 to China." },
    fr: { alt: "Image promotionnelle de l'accord d'édition AION2 en Chine", caption: "Visuel officiel NC ; NCSoft signe avec Shengqu Games pour lancer AION2 en Chine." },
    de: { alt: "AION2 China-Vertriebsabkommen Werbebild", caption: "Offizielles NC-Artwork; NCSoft unterzeichnet mit Shengqu Games für AION2 in China." },
    es: { alt: "Imagen promocional del acuerdo de publicación de AION2 en China", caption: "Arte oficial de NC; NCSoft firma con Shengqu Games para llevar AION2 a China." },
    ja: { alt: "AION2 中国パブリッシング契約プロモ画像", caption: "NC 公式画像。NCSoft が盛趣ゲームと契約し、AION2 が中国市場に上陸します。" },
    "pt-br": { alt: "Imagem promocional do contrato de publicação do AION2 na China", caption: "Arte oficial da NC; NCSoft assina com Shengqu Games para levar AION2 à China." },
    ru: { alt: "Промо-изображение соглашения об издании AION2 в Китае", caption: "Официальный арт NC; NCSoft подписывает с Shengqu Games для запуска AION2 в Китае." },
    ko: { alt: "AION2 중국 퍼블리싱 계약 프로모션 이미지", caption: "NC 공식 이미지입니다. NCSoft가 성취게임즈와 계약하여 AION2가 중국 시장에 진출합니다." },
    "zh-hant": { alt: "AION2 中國發行簽約宣傳圖", caption: "NC 官方配圖；NCSoft 與盛趣遊戲簽約，AION2（永恆之塔2）將登陸中國市場。" },
  },
};

const dungeonHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 副本组队规模变更", caption: "NC 官方配图；全球版副本队伍从4人扩至5人，首次团本从8人扩至10人。" },
    en: { alt: "AION2 dungeon party size changes", caption: "Official NC artwork; Global version expands dungeon parties from 4 to 5 players and first raid from 8 to 10." },
    fr: { alt: "Changements de taille de groupe de donjon AION2", caption: "Visuel officiel NC ; La version globale passe les groupes de donjon de 4 à 5 joueurs et le premier raid de 8 à 10." },
    de: { alt: "AION2 Dungeon-Gruppengrößenänderungen", caption: "Offizielles NC-Artwork; Globale Version erweitert Dungeon-Gruppen von 4 auf 5 Spieler und ersten Raid von 8 auf 10." },
    es: { alt: "Cambios de tamaño de grupo de mazmorra de AION2", caption: "Arte oficial de NC; La versión global expande los grupos de mazmorra de 4 a 5 jugadores y el primer raid de 8 a 10." },
    ja: { alt: "AION2 ダンジョンパーティー人数変更", caption: "NC 公式画像。グローバル版ではダンジョンパーティーが4人から5人、初のレイドが8人から10人に拡大。" },
    "pt-br": { alt: "Mudanças no tamanho do grupo de masmorra do AION2", caption: "Arte oficial da NC; Versão global expande grupos de masmorra de 4 para 5 jogadores e primeiro raid de 8 para 10." },
    ru: { alt: "Изменения размера группы подземелий AION2", caption: "Официальный арт NC; Глобальная версия расширяет группы подземелий с 4 до 5 игроков и первый рейд с 8 до 10." },
    ko: { alt: "AION2 던전 파티 인원 변경", caption: "NC 공식 이미지입니다. 글로벌 버전에서 던전 파티가 4인에서 5인으로, 첫 레이드가 8인에서 10인으로 확대됩니다." },
    "zh-hant": { alt: "AION2 副本組隊規模變更", caption: "NC 官方配圖；全球版副本隊伍從4人擴至5人，首次團本從8人擴至10人。" },
  },
};

const engineHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 虚幻引擎5 世界规模", caption: "NC 官方配图；AION2 基于虚幻引擎5打造，世界规模为初代AION的36倍。" },
    en: { alt: "AION2 Unreal Engine 5 world scale", caption: "Official NC artwork; AION2 is built on Unreal Engine 5 with a world 36 times larger than the original AION." },
    fr: { alt: "Échelle du monde AION2 Unreal Engine 5", caption: "Visuel officiel NC ; AION2 est construit sur Unreal Engine 5 avec un monde 36 fois plus grand que l'AION original." },
    de: { alt: "AION2 Unreal Engine 5 Weltgröße", caption: "Offizielles NC-Artwork; AION2 basiert auf Unreal Engine 5 mit einer 36-mal größeren Welt als das originale AION." },
    es: { alt: "Escala del mundo de AION2 Unreal Engine 5", caption: "Arte oficial de NC; AION2 está construido con Unreal Engine 5 con un mundo 36 veces más grande que el AION original." },
    ja: { alt: "AION2 Unreal Engine 5 ワールドスケール", caption: "NC 公式画像。AION2 は Unreal Engine 5 で構築され、世界規模は初代 AION の36倍です。" },
    "pt-br": { alt: "Escala do mundo AION2 Unreal Engine 5", caption: "Arte oficial da NC; AION2 é construído em Unreal Engine 5 com um mundo 36 vezes maior que o AION original." },
    ru: { alt: "Масштаб мира AION2 на Unreal Engine 5", caption: "Официальный арт NC; AION2 создан на Unreal Engine 5 с миром в 36 раз больше оригинального AION." },
    ko: { alt: "AION2 언리얼 엔진 5 월드 스케일", caption: "NC 공식 이미지입니다. AION2는 언리얼 엔진 5로 제작됐으며, 세계 규모는 초대 AION의 36배입니다." },
    "zh-hant": { alt: "AION2 虛幻引擎5 世界規模", caption: "NC 官方配圖；AION2 基於虛幻引擎5打造，世界規模為初代AION的36倍。" },
  },
};

/* ------------------------------------------------------------------ */
/* Section helper                                                      */
/* ------------------------------------------------------------------ */

function section(id: string, title: string, paragraphs: readonly string[]): ContentEntry["translations"]["en"]["sections"][number] {
  return { id, title, paragraphs };
}

/* ------------------------------------------------------------------ */
/* Entries                                                             */
/* ------------------------------------------------------------------ */

export const trendingAugust14ContentEntries = [
  // ARTICLE 1: Gamescom 2026 Preview
  {
    section: "news",
    slug: "gamescom-2026-ncsoft-showcase-preview",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [gamescomSource, ncDevStreamSource, mmobombSource],
    heroImage: gamescomHero,
    related: [
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 5, {
        eyebrow: "GAMESCOM 2026",
        title: "AION 2 at Gamescom 2026: What NCSoft Will Showcase at Opening Night Live",
        description: "NCSoft confirmed AION 2 will appear at Gamescom 2026 Opening Night Live on August 25. Here's what to expect — new reveals, global launch details, and possible surprises before the September release.",
        intro: "Gamescom 2026 is less than two weeks away, and NCSoft has confirmed that AION 2 will be part of the Opening Night Live showcase on August 25. With the global launch just weeks away, this is likely the last major marketing beat before the game goes live. Here's everything we know so far about what NCSoft plans to show.",
        sourceNote: "Based on AION2Hub reporting, MMOBomb coverage, and NCSOFT's August 10 developer stream announcements. Gamescom ONL is scheduled for August 25, 2026.",
        keywords: ["AION 2 Gamescom 2026", "AION 2 Opening Night Live", "AION 2 August 25", "AION 2 NCSoft showcase", "AION 2 Gamescom reveal"],
        sections: [
          section("what-we-know", "What we know so far", ["NCSoft announced during its August 10 global developer stream that AION 2 will appear at Gamescom 2026's Opening Night Live on August 25. The studio hinted at 'new information' about AION 2 and potentially a new game reveal, making the showcase a must-watch for fans.", "Gamescom 2026 runs from August 27 to 31 in Cologne, Germany, but the ONL opening show on August 25 is where the biggest announcements typically land. NCSoft's presence at ONL suggests a significant reveal rather than a simple trailer drop."]),
          section("what-to-expect", "What to expect from the showcase", ["Given the timing — just five weeks before the September 30 early access — NCSoft is likely to show final pre-launch gameplay, potentially including the global version's opening cinematic, a live raid or dungeon demo, and possibly a release date confirmation with exact server launch times.", "The developer stream already revealed major changes: dungeon parties expanded from 4 to 5 players, first raid from 8 to 10, battleground standardized at 10v10, and five non-locked server regions. Gamescom may bring additional details on endgame content, the monetization model, or a new class tease."]),
          section("global-launch-context", "Global launch context", ["AION 2's global launch is confirmed for September 2026 on PC via Steam and PURPLE. Early access begins September 30 for Founder's Pack purchasers, with the full free-to-play launch expected in early October. The game will support 10 languages at launch.", "Steam store page is already live (app ID 3393110), and pre-registration is open on the official global site. NCSoft has confirmed the game uses Unreal Engine 5 and features a world 36 times larger than the original AION."]),
          section("why-it-matters", "Why this matters for players", ["Gamescom ONL is typically watched by millions of viewers worldwide. For AION 2, this is the widest mainstream audience the game will reach before launch. Any new gameplay footage or feature reveals will shape pre-launch expectations and may influence Founder's Pack purchasing decisions.", "If you're still deciding whether to buy a Founder's Pack, waiting for the Gamescom showcase may be worth it — NCSoft could reveal additional bonuses or limited-time offers during the event."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
        eyebrow: "科隆游戏展 2026",
        title: "AION 2 科隆游戏展 2026：NCSoft 将在 Opening Night Live 上展示什么",
        description: "NCSoft 确认 AION 2 将在8月25日科隆游戏展 Opening Night Live 上亮相。以下是预期内容——新情报、全球上线细节以及9月上线前的可能惊喜。",
        intro: "科隆游戏展 2026 距今不到两周，NCSoft 已确认 AION 2 将参加8月25日的 Opening Night Live 展示。距离全球上线仅剩数周，这很可能是游戏上线前的最后一个重大营销节点。以下是我们目前所知的一切。",
        sourceNote: "基于 AION2Hub 报道、MMOBomb 新闻覆盖和 NCSOFT 8月10日开发者直播公告。科隆游戏展 ONL 定于2026年8月25日。",
        keywords: ["AION 2 科隆游戏展 2026", "AION 2 Opening Night Live", "AION 2 8月25日", "AION 2 NCSoft 展示", "AION 2 Gamescom 情报"],
        sections: [
          section("what-we-know", "目前已知信息", ["NCSoft 在8月10日的全球开发者直播中宣布，AION 2 将在8月25日科隆游戏展的 Opening Night Live 上亮相。工作室暗示将公开 AION 2 的「新情报」，甚至可能公布一款新游戏，使这场展示成为粉丝必看节目。", "科隆游戏展 2026 将于8月27日至31日在德国科隆举行，但8月25日的 ONL 开幕秀通常是最大公布所在的环节。NCSoft 出现在 ONL 暗示这将是一次重大展示，而非简单的预告片投放。"]),
          section("what-to-expect", "展示内容预期", ["考虑到时间点——距9月30日抢先体验仅五周——NCSoft 很可能会展示上线前的最终实机演示，可能包括全球版开场CG、实机团本或副本演示，以及确切的发服时间确认。", "开发者直播已透露重大变更：副本队伍从4人扩至5人、首次团本从8人扩至10人、战场标准化为10v10、以及五个非锁区服务器。科隆展可能带来终局内容的更多细节、商业模式或新职业预告。"]),
          section("global-launch-context", "全球上线背景", ["AION 2 全球版确认将于2026年9月在 PC（Steam 和 PURPLE）上线。创始人包购买者可于9月30日开始抢先体验，完整免费游玩版预计10月初上线。游戏上线时支持10种语言。", "Steam 商店页已上线（app ID 3393110），官方全球站已开放预注册。NCSoft 确认游戏使用虚幻引擎5，世界规模为初代 AION 的36倍。"]),
          section("why-it-matters", "这对玩家的意义", ["科隆游戏展 ONL 通常有全球数百万观众观看。对 AION 2 而言，这是游戏上线前能触及的最广泛主流受众。任何新实机画面或功能公布都将影响上线前预期，并可能影响创始人包购买决策。", "如果你还在犹豫是否购买创始人包，等科隆展展示可能值得——NCSoft 可能在活动期间公布额外奖励或限时优惠。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 5, {
        eyebrow: "게임스컴 2026",
        title: "AION 2 게임스컴 2026: NCSoft가 오프닝 나이트 라이브에서 선보일 것",
        description: "NCSoft가 AION 2를 8월 25일 게임스컴 2026 오프닝 나이트 라이브에 출연시킬 것을 확인했습니다. 새로운 정보, 글로벌 출시 세부 정보 및 9월 출시 전 가능한 서프라이즈를 정리합니다.",
        intro: "게임스컴 2026이 2주도 채 남지 않았고, NCSoft는 AION 2가 8월 25일 오프닝 나이트 라이브에 등장할 것이라고 확인했습니다. 글로벌 출시가 몇 주 앞으로 다가온 가운데, 이는 게임이 라이브되기 전 마지막 주요 마케팅 기점일 가능성이 높습니다. 현재까지 알려진 모든 것을 정리합니다.",
        sourceNote: "AION2Hub 보도, MMOBomb 기사 및 NCSOFT 8월 10일 개발자 스트림 발표에 기반합니다. 게임스컴 ONL은 2026년 8월 25일에 예정되어 있습니다.",
        keywords: ["AION 2 게임스컴 2026", "AION 2 오프닝 나이트 라이브", "AION 2 8월 25일", "AION 2 NCSoft 쇼케이스", "AION 2 게임스컴 공개"],
        sections: [
          section("what-we-know", "현재까지 알려진 것", ["NCSoft는 8월 10일 글로벌 개발자 스트림에서 AION 2가 8월 25일 게임스컴 2026 오프닝 나이트 라이브에 등장할 것이라고 발표했습니다. 스튜디오는 AION 2의 '새로운 정보'와 잠재적으로 새로운 게임 공개를 암시했습니다.", "게임스컴 2026은 8월 27일부터 31일까지 독일 쾰른에서 개최되지만, 8월 25일 ONL 개막쇼가 가장 큰 발표가 이루어지는 자리입니다. NCSoft의 ONL 참여는 단순한 트레일러가 아닌 중요한 공개를 시사합니다."]),
          section("what-to-expect", "쇼케이스 예상 내용", ["9월 30일 얼리 액세스 5주 전이라는 시점을 고려할 때, NCSoft는 출시 전 최종 게임플레이를 보여줄 가능성이 높으며, 글로벌 버전의 오프닝 시네마틱, 라이브 레이드 또는 던전 데모, 그리고 정확한 서버 출시 시간 확인이 포함될 수 있습니다.", "개발자 스트림에서 이미 주요 변경사항이 공개됐습니다: 던전 파티 4인→5인, 첫 레이드 8인→10인, 전장 10v10 표준화, 5개 비잠금 서버 지역. 게임스컴에서 엔드게임 콘텐츠, 수익 모델 또는 새로운 클래스 티저의 추가 세부 정보가 나올 수 있습니다."]),
          section("global-launch-context", "글로벌 출시 배경", ["AION 2 글로벌 출시는 2026년 9월 PC(Steam 및 PURPLE)로 확정됐습니다. 파운더스 팩 구매자는 9월 30일 얼리 액세스가 시작되며, 정식 F2P 출시는 10월 초로 예상됩니다. 출시 시 10개 언어를 지원합니다.", "Steam 스토어 페이지가 이미 라이브되어 있으며(app ID 3393110), 공식 글로벌 사이트에서 사전 등록이 가능합니다. NCSoft는 게임이 언리얼 엔진 5를 사용하며 세계 규모가 초대 AION의 36배라고 확인했습니다."]),
          section("why-it-matters", "플레이어에게 중요한 이유", ["게임스컴 ONL은 전 세계 수백만 시청자가 시청하는 행사입니다. AION 2의 경우, 출시 전 도달할 수 있는 가장 넓은 메인스트림 관객입니다. 새로운 게임플레이 영상이나 기능 공개는 출시 전 기대치를 형성하고 파운더스 팩 구매 결정에 영향을 미칠 수 있습니다.", "파운더스 팩 구매를 아직 고민 중이라면 게임스컴 쇼케이스까지 기다려볼 만합니다. NCSoft가 이벤트 중 추가 보너스나 한정 오퍼를 공개할 수 있습니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 5, {
        eyebrow: "GAMESCOM 2026",
        title: "AION 2 à la Gamescom 2026 : Ce que NCSoft présentera à l'Opening Night Live",
        description: "NCSoft a confirmé qu'AION 2 sera présent à la Gamescom 2026 Opening Night Live le 25 août. Voici à quoi s'attendre — nouvelles révélations, détails du lancement mondial et surprises possibles avant la sortie de septembre.",
        intro: "La Gamescom 2026 est dans moins de deux semaines, et NCSoft a confirmé qu'AION 2 fera partie de la présentation Opening Night Live le 25 août. Avec le lancement mondial à quelques semaines, c'est probablement la dernière grande étape marketing avant la mise en service du jeu. Voici tout ce que nous savons jusqu'à présent.",
        sourceNote: "Basé sur les reportages d'AION2Hub, la couverture de MMOBomb et les annonces du stream développeur NCSOFT du 10 août. La Gamescom ONL est prévue le 25 août 2026.",
        keywords: ["AION 2 Gamescom 2026", "AION 2 Opening Night Live", "AION 2 25 août", "AION 2 NCSoft showcase", "AION 2 Gamescom révélation"],
        sections: [
          section("what-we-know", "Ce que nous savons jusqu'ici", ["NCSoft a annoncé lors de son stream développeur mondial du 10 août qu'AION 2 sera présent à l'Opening Night Live de la Gamescom 2026 le 25 août. Le studio a fait allusion à de 'nouvelles informations' sur AION 2 et potentiellement à la révélation d'un nouveau jeu.", "La Gamescom 2026 se déroulera du 27 au 31 août à Cologne, en Allemagne, mais le spectacle d'ouverture ONL du 25 août est généralement là où les plus grandes annonces sont faites. La présence de NCSoft à l'ONL suggère une révélation importante plutôt qu'une simple diffusion de bande-annonce."]),
          section("what-to-expect", "À quoi s'attendre", ["Compte tenu du calendrier — à peine cinq semaines avant l'accès anticipé du 30 septembre — NCSoft montrera probablement le gameplay final pré-lancement, inclant potentiellement le cinématique d'ouverture de la version mondiale, une démo de raid en direct et possiblement une confirmation de date de sortie avec les heures exactes de lancement des serveurs.", "Le stream développeur a déjà révélé des changements majeurs : groupes de donjon passant de 4 à 5 joueurs, premier raid de 8 à 10, champs de bataille standardisés à 10v10, et cinq régions de serveurs non verrouillées. La Gamescom pourrait apporter des détails supplémentaires sur le contenu endgame, le modèle de monétisation ou un aperçu d'une nouvelle classe."]),
          section("global-launch-context", "Contexte du lancement mondial", ["Le lancement mondial d'AION 2 est confirmé pour septembre 2026 sur PC via Steam et PURPLE. L'accès anticipé commence le 30 septembre pour les acheteurs de Founder's Pack, avec le lancement F2P complet attendu début octobre. Le jeu prendra en charge 10 langues au lancement.", "La page Steam est déjà en ligne (app ID 3393110), et la pré-inscription est ouverte sur le site mondial officiel. NCSoft a confirmé que le jeu utilise Unreal Engine 5 avec un monde 36 fois plus grand que l'AION original."]),
          section("why-it-matters", "Pourquoi c'est important pour les joueurs", ["L'ONL de la Gamescom est généralement regardé par des millions de spectateurs dans le monde entier. Pour AION 2, c'est le public grand public le plus large que le jeu atteindra avant le lancement. Toute nouvelle séquence de gameplay ou révélation de fonctionnalité façonnera les attentes pré-lancement et pourrait influencer les décisions d'achat de Founder's Pack.", "Si vous hésitez encore à acheter un Founder's Pack, attendre la présentation de la Gamescom peut en valoir la peine — NCSoft pourrait révéler des bonus supplémentaires ou des offres à durée limitée pendant l'événement."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 5, {
        eyebrow: "GAMESCOM 2026",
        title: "AION 2 auf der Gamescom 2026: Was NCSoft bei Opening Night Live zeigen wird",
        description: "NCSoft hat bestätigt, dass AION 2 bei der Gamescom 2026 Opening Night Live am 25. August auftreten wird. Hier ist, was Sie erwarten können — neue Enthüllungen, globale Launch-Details und mögliche Überraschungen vor dem Release im September.",
        intro: "Die Gamescom 2026 ist weniger als zwei Wochen entfernt und NCSoft hat bestätigt, dass AION 2 Teil der Opening Night Live-Präsentation am 25. August sein wird. Da der weltweite Start nur noch Wochen entfernt ist, ist dies wahrscheinlich der letzte große Marketing-Höhepunkt vor dem Launch. Hier ist alles, was wir bisher wissen.",
        sourceNote: "Basierend auf AION2Hub-Berichterstattung, MMOBomb-Coverage und NCSOFTs Entwickler-Stream-Ankündigungen vom 10. August. Die Gamescom ONL ist für den 25. August 2026 geplant.",
        keywords: ["AION 2 Gamescom 2026", "AION 2 Opening Night Live", "AION 2 25. August", "AION 2 NCSoft Showcase", "AION 2 Gamescom Enthüllung"],
        sections: [
          section("what-we-know", "Was wir bisher wissen", ["NCSoft kündigte während seines globalen Entwickler-Streams am 10. August an, dass AION 2 bei der Gamescom 2026 Opening Night Live am 25. August auftreten wird. Das Studio deutete 'neue Informationen' über AION 2 und möglicherweise eine neue Spielenthüllung an.", "Die Gamescom 2026 findet vom 27. bis 31. August in Köln statt, aber die ONL-Eröffnungsshow am 25. August ist normalerweise der Ort der größten Ankündigungen. NCSofts Präsenz bei der ONL deutet auf eine bedeutende Enthüllung hin."]),
          section("what-to-expect", "Was vom Showcase zu erwarten ist", ["Angesichts des Zeitpunkts — nur fünf Wochen vor dem Early Access am 30. September — wird NCSoft wahrscheinlich das finale Pre-Launch-Gameplay zeigen, möglicherweise inklusive der Eröffnungs-Cinematic der globalen Version, einem Live-Raid- oder Dungeon-Demo und einer Veröffentlichungsdatumsbestätigung mit genauen Server-Startzeiten.", "Der Entwickler-Stream bereits enthüllte große Änderungen: Dungeon-Gruppen von 4 auf 5 Spieler, erster Raid von 8 auf 10, Schlachtfeld standardisiert auf 10v10 und fünf nicht gesperrte Server-Regionen. Die Gamescom könnte zusätzliche Details zum Endgame-Content, dem Monetarisierungsmodell oder einem neuen Klassen-Teaser bringen."]),
          section("global-launch-context", "Globaler Launch-Kontext", ["Der weltweite Launch von AION 2 ist für September 2026 auf PC über Steam und PURPLE bestätigt. Der Early Access beginnt am 30. September für Founder's Pack-Käufer, mit dem vollständigen F2P-Launch Anfang Oktober erwartet. Das Spiel wird beim Launch 10 Sprachen unterstützen.", "Die Steam-Shopseite ist bereits online (App-ID 3393110) und die Vorabregistrierung auf der offiziellen globalen Website ist geöffnet. NCSoft hat bestätigt, dass das Spiel Unreal Engine 5 verwendet und eine 36-mal größere Welt als das ursprüngliche AION bietet."]),
          section("why-it-matters", "Warum dies für Spieler wichtig ist", ["Die Gamescom ONL wird normalerweise von Millionen von Zuschauern weltweit verfolgt. Für AION 2 ist dies das breiteste Mainstream-Publikum, das das Spiel vor dem Launch erreichen wird. Jede neue Gameplay-Footage oder Funktionsenthüllung wird die Pre-Launch-Erwartungen prägen und könnte die Kaufentscheidungen für Founder's Packs beeinflussen.", "Wenn Sie noch überlegen, ob Sie ein Founder's Pack kaufen sollen, kann sich das Warten auf die Gamescom-Präsentation lohnen — NCSoft könnte während der Veranstaltung zusätzliche Boni oder zeitlich begrenzte Angebote enthüllen."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 5, {
        eyebrow: "GAMESCOM 2026",
        title: "AION 2 en la Gamescom 2026: Lo que NCSoft mostrará en la Opening Night Live",
        description: "NCSoft confirmó que AION 2 aparecerá en la Gamescom 2026 Opening Night Live el 25 de agosto. Esto es lo que podemos esperar — nuevas revelaciones, detalles del lanzamiento global y posibles sorpresas antes del estreno de septiembre.",
        intro: "La Gamescom 2026 está a menos de dos semanas y NCSoft ha confirmado que AION 2 será parte de la presentación de Opening Night Live el 25 de agosto. Con el lanzamiento global a solo semanas, este es probablemente el último gran evento de marketing antes del estreno. Esto es todo lo que sabemos hasta ahora.",
        sourceNote: "Basado en reportes de AION2Hub, cobertura de MMOBomb y anuncios del stream de desarrolladores de NCSOFT del 10 de agosto. La ONL de Gamescom está programada para el 25 de agosto de 2026.",
        keywords: ["AION 2 Gamescom 2026", "AION 2 Opening Night Live", "AION 2 25 de agosto", "AION 2 NCSoft showcase", "AION 2 Gamescom revelación"],
        sections: [
          section("what-we-know", "Lo que sabemos hasta ahora", ["NCSoft anunció durante su stream de desarrolladores global del 10 de agosto que AION 2 aparecerá en la Opening Night Live de Gamescom 2026 el 25 de agosto. El estudio insinuó 'nueva información' sobre AION 2 y posiblemente la revelación de un nuevo juego.", "Gamescom 2026 se celebrará del 27 al 31 de agosto en Colonia, Alemania, pero el espectáculo de apertura ONL del 25 de agosto es típicamente donde se hacen los anuncios más importantes. La presencia de NCSoft en ONL sugiere una revelación significativa."]),
          section("what-to-expect", "Qué esperar", ["Dada la fecha — apenas cinco semanas antes del acceso anticipado del 30 de septiembre — NCSoft probablemente mostrará el gameplay final pre-lanzamiento, potencialmente incluyendo la cinemática de apertura de la versión global, una demo de raid en vivo y posiblemente una confirmación de fecha de lanzamiento con horarios exactos de los servidores.", "El stream de desarrolladores ya reveló cambios importantes: grupos de mazmorra de 4 a 5 jugadores, primer raid de 8 a 10, campos de batalla estandarizados a 10v10 y cinco regiones de servidores no bloqueados. Gamescom podría traer detalles adicionales sobre contenido endgame, el modelo de monetización o un adelanto de nueva clase."]),
          section("global-launch-context", "Contexto del lanzamiento global", ["El lanzamiento global de AION 2 está confirmado para septiembre de 2026 en PC vía Steam y PURPLE. El acceso anticipado comienza el 30 de septiembre para compradores de Founder's Pack, con el lanzamiento F2P completo esperado a principios de octubre. El juego soportará 10 idiomas en el lanzamiento.", "La página de Steam ya está disponible (app ID 3393110) y el prerregistro está abierto en el sitio global oficial. NCSoft confirmó que el juego usa Unreal Engine 5 con un mundo 36 veces más grande que el AION original."]),
          section("why-it-matters", "Por qué importa para los jugadores", ["La ONL de Gamescom típicamente es vista por millones de espectadores en todo el mundo. Para AION 2, esta es la audiencia mainstream más amplia que el juego alcanzará antes del lanzamiento. Cualquier nuevo gameplay o revelación de funciones dará forma a las expectativas previas al lanzamiento.", "Si aún estás decidiendo si comprar un Founder's Pack, esperar a la presentación de Gamescom puede valer la pena — NCSoft podría revelar bonos adicionales u ofertas de tiempo limitado durante el evento."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 5, {
        eyebrow: "ゲームスコム 2026",
        title: "AION 2 Gamescom 2026：NCSoft が Opening Night Live で見せるもの",
        description: "NCSoft は AION 2 が8月25日の Gamescom 2026 Opening Night Live に登場することを確認しました。新情報、グローバル開始の詳細、9月リリース前のサプライズをまとめます。",
        intro: "Gamescom 2026 まで2週間を切り、NCSoft は AION 2 が8月25日の Opening Night Live に出演することを確認しました。グローバルリリースまで数週間というこの時期は、ゲームがライブになる前の最後の大きなマーケティング機会と思われます。現時点で分かっていることをまとめます。",
        sourceNote: "AION2Hub の報道、MMOBomb のカバレッジ、NCSOFT 8月10日開発者ストリームの発表に基づきます。Gamescom ONL は2026年8月25日予定です。",
        keywords: ["AION 2 Gamescom 2026", "AION 2 Opening Night Live", "AION 2 8月25日", "AION 2 NCSoft ショーケース", "AION 2 Gamescom 公開"],
        sections: [
          section("what-we-know", "現在分かっていること", ["NCSoft は8月10日のグローバル開発者ストリームで、AION 2 が8月25日の Gamescom 2026 Opening Night Live に登場することを発表しました。スタジオは AION 2 の「新情報」と、可能性として新しいゲームの公開を示唆しました。", "Gamescom 2026 は8月27日から31日までドイツ・ケルンで開催されますが、8月25日の ONL 開幕ショーが通常最大の発表が行われる場です。NCSoft の ONL 参加は、単なるトレーラーではなく重要な公開を示唆しています。"]),
          section("what-to-expect", "ショーケースの期待内容", ["9月30日のアーリーアクセスまで5週間という時点を考慮すると、NCSoft はリリース前の最終ゲームプレイを示す可能性が高く、グローバル版のオープニングシネマティック、ライブレイドまたはダンジョンデモ、そして正確なサーバー開始時刻を含むリリース日の確認が含まれるかもしれません。", "開発者ストリームでは既に主要な変更が公開されました：ダンジョンパーティーが4人から5人へ、初のレイドが8人から10人へ、戦場が10v10に標準化、5つの非ロックサーバーリージョン。Gamescom ではエンドゲームコンテンツ、収益モデル、または新しいクラスの予告に関する追加詳細が示される可能性があります。"]),
          section("global-launch-context", "グローバルリリースの背景", ["AION 2 のグローバルリリースは2026年9月、PC（Steam および PURPLE）で確定しています。ファウンダーズパック購入者は9月30日からアーリーアクセスが開始され、完全な F2P リリースは10月上旬と予想されています。リリース時に10言語をサポートします。", "Steam ストアページは既にライブ（app ID 3393110）で、公式グローバルサイトで事前登録が可能です。NCSoft はゲームが Unreal Engine 5 を使用し、世界規模が初代 AION の36倍であることを確認しています。"]),
          section("why-it-matters", "プレイヤーにとっての意義", ["Gamescom ONL は通常世界中で数百万人が視聴します。AION 2 にとって、これはリリース前に到達できる最も広いメインストリーム視聴者です。新しいゲームプレイ映像や機能の公開は、リリース前の期待を形成し、ファウンダーズパックの購入決定に影響を与える可能性があります。", "ファウンダーズパックの購入をまだ迷っている場合、Gamescom ショーケースまで待つ価値があるかもしれません。NCSoft がイベント中に追加ボーナスや期間限定オファーを公開する可能性があります。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 5, {
        eyebrow: "GAMESCOM 2026",
        title: "AION 2 na Gamescom 2026: O que a NCSoft mostrará na Opening Night Live",
        description: "A NCSoft confirmou que AION 2 aparecerá na Gamescom 2026 Opening Night Live em 25 de agosto. Veja o que esperar — novas revelações, detalhes do lançamento global e possíveis surpresas antes do lançamento em setembro.",
        intro: "A Gamescom 2026 está a menos de duas semanas e a NCSoft confirmou que AION 2 fará parte da apresentação da Opening Night Live em 25 de agosto. Com o lançamento global a apenas semanas de distância, este é provavelmente o último grande momento de marketing antes do lançamento. Aqui está tudo o que sabemos até agora.",
        sourceNote: "Baseado em reportagens da AION2Hub, cobertura da MMOBomb e anúncios do stream de desenvolvedores da NCSOFT de 10 de agosto. A ONL da Gamescom está programada para 25 de agosto de 2026.",
        keywords: ["AION 2 Gamescom 2026", "AION 2 Opening Night Live", "AION 2 25 de agosto", "AION 2 NCSoft showcase", "AION 2 Gamescom revelação"],
        sections: [
          section("what-we-know", "O que sabemos até agora", ["A NCSoft anunciou durante seu stream global de desenvolvedores em 10 de agosto que AION 2 aparecerá na Opening Night Live da Gamescom 2026 em 25 de agosto. O estúdio sugeriu 'novas informações' sobre AION 2 e possivelmente a revelação de um novo jogo.", "A Gamescom 2026 ocorre de 27 a 31 de agosto em Colônia, Alemanha, mas o show de abertura ONL em 25 de agosto é tipicamente onde os maiores anúncios acontecem. A presença da NCSoft na ONL sugere uma revelação significativa."]),
          section("what-to-expect", "O que esperar", ["Dado o timing — apenas cinco semanas antes do early access de 30 de setembro — a NCSoft provavelmente mostrará o gameplay final pré-lançamento, potencialmente incluindo a cinemática de abertura da versão global, uma demo de raid ao vivo e possivelmente confirmação da data de lançamento com horários exatos dos servidores.", "O stream de desenvolvedores já revelou mudanças importantes: grupos de masmorra de 4 para 5 jogadores, primeiro raid de 8 para 10, campos de batalha padronizados em 10v10 e cinco regiões de servidores não bloqueados. A Gamescom pode trazer detalhes adicionais sobre conteúdo endgame, modelo de monetização ou um teaser de nova classe."]),
          section("global-launch-context", "Contexto do lançamento global", ["O lançamento global de AION 2 está confirmado para setembro de 2026 no PC via Steam e PURPLE. O early access começa em 30 de setembro para compradores do Founder's Pack, com o lançamento F2P completo esperado no início de outubro. O jogo suportará 10 idiomas no lançamento.", "A página da Steam já está no ar (app ID 3393110) e o pré-registro está aberto no site global oficial. A NCSoft confirmou que o jogo usa Unreal Engine 5 com um mundo 36 vezes maior que o AION original."]),
          section("why-it-matters", "Por que isso importa para os jogadores", ["A ONL da Gamescom é tipicamente assistida por milhões de espectadores em todo o mundo. Para AION 2, este é o público mainstream mais amplo que o jogo alcançará antes do lançamento. Qualquer nova footage de gameplay ou revelação de recursos moldará as expectativas pré-lançamento.", "Se você ainda está decidindo se deve comprar um Founder's Pack, esperar pela apresentação da Gamescom pode valer a pena — a NCSoft pode revelar bônus adicionais ou ofertas por tempo limitado durante o evento."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 5, {
        eyebrow: "GAMESCOM 2026",
        title: "AION 2 на Gamescom 2026: Что NCSoft покажет на Opening Night Live",
        description: "NCSoft подтвердила, что AION 2 появится на Gamescom 2026 Opening Night Live 25 августа. Вот чего ожидать — новые раскрытия, детали глобального запуска и возможные сюрпризы перед релизом в сентябре.",
        intro: "Gamescom 2026 менее чем через две недели, и NCSoft подтвердила, что AION 2 станет частью презентации Opening Night Live 25 августа. С глобальным запуском через несколько недель, это, вероятно, последний крупный маркетинговый этап перед запуском игры. Вот всё, что нам известно на данный момент.",
        sourceNote: "Основано на репортажах AION2Hub, освещении MMOBomb и анонсах стрима разработчиков NCSOFT от 10 августа. ONL Gamescom запланирована на 25 августа 2026 года.",
        keywords: ["AION 2 Gamescom 2026", "AION 2 Opening Night Live", "AION 2 25 августа", "AION 2 NCSoft showcase", "AION 2 Gamescom анонс"],
        sections: [
          section("what-we-know", "Что нам известно", ["NCSoft объявила во время глобального стрима разработчиков 10 августа, что AION 2 появится на Opening Night Live Gamescom 2026 25 августа. Студия намекнула на «новую информацию» об AION 2 и возможный анонс новой игры.", "Gamescom 2026 пройдёт с 27 по 31 августа в Кёльне, Германия, но открытие ONL 25 августа — это обычно место крупнейших анонсов. Присутствие NCSoft на ONL предполагает значимое раскрытие, а не простой трейлер."]),
          section("what-to-expect", "Чего ожидать", ["Учитывая тайминг — всего пять недель до раннего доступа 30 сентября — NCSoft, вероятно, покажет финальный геймплей перед запуском, возможно включая открывающий кинематограф глобальной версии, живое демо рейда или подземелья и подтверждение даты релиза с точным временем запуска серверов.", "Стрим разработчиков уже выявил крупные изменения: группы подземелий с 4 до 5 игроков, первый рейд с 8 до 10, поля боя стандартизированы до 10v10 и пять регионов серверов без блокировки. Gamescom может принести дополнительные детали об эндгейме, модели монетизации или тизере нового класса."]),
          section("global-launch-context", "Контекст глобального запуска", ["Глобальный запуск AION 2 подтверждён на сентябрь 2026 года на ПК через Steam и PURPLE. Ранний доступ начинается 30 сентября для покупателей Founder's Pack, полный F2P запуск ожидается в начале октября. Игра будет поддерживать 10 языков при запуске.", "Страница в Steam уже доступна (app ID 3393110), и предрегистрация открыта на официальном глобальном сайте. NCSoft подтвердила, что игра использует Unreal Engine 5 с миром в 36 раз больше оригинального AION."]),
          section("why-it-matters", "Почему это важно для игроков", ["ONL Gamescom обычно смотрят миллионы зрителей по всему миру. Для AION 2 это самая широкая массовая аудитория, которую игра охватит до запуска. Любой новый геймплей или раскрытие функций сформирует предзапусковые ожидания и может повлиять на решение о покупке Founder's Pack.", "Если вы всё ещё решаете, покупать ли Founder's Pack, дождаться презентации Gamescom может быть worthwhile — NCSoft может раскрыть дополнительные бонусы или ограниченные по времени предложения во время мероприятия."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
        eyebrow: "科隆遊戲展 2026",
        title: "AION 2 科隆遊戲展 2026：NCSoft 將在 Opening Night Live 上展示什麼",
        description: "NCSoft 確認 AION 2 將在8月25日科隆遊戲展 Opening Night Live 上亮相。以下是預期內容——新情報、全球上線細節以及9月上線前的可能驚喜。",
        intro: "科隆遊戲展 2026 距今不到兩週，NCSoft 已確認 AION 2 將參加8月25日的 Opening Night Live 展示。距離全球上線僅剩數週，這很可能是遊戲上線前的最後一個重大營銷節點。以下是我們目前所知的一切。",
        sourceNote: "基於 AION2Hub 報道、MMOBomb 新聞覆蓋和 NCSOFT 8月10日開發者直播公告。科隆遊戲展 ONL 定於2026年8月25日。",
        keywords: ["AION 2 科隆遊戲展 2026", "AION 2 Opening Night Live", "AION 2 8月25日", "AION 2 NCSoft 展示", "AION 2 Gamescom 情報"],
        sections: [
          section("what-we-know", "目前已知資訊", ["NCSoft 在8月10日的全球開發者直播中宣布，AION 2 將在8月25日科隆遊戲展的 Opening Night Live 上亮相。工作室暗示將公開 AION 2 的「新情報」，甚至可能公布一款新遊戲。", "科隆遊戲展 2026 將於8月27日至31日在德國科隆舉行，但8月25日的 ONL 開幕秀通常是最大公布所在的環節。NCSoft 出現在 ONL 暗示這將是一次重大展示。"]),
          section("what-to-expect", "展示內容預期", ["考慮到時間點——距9月30日搶先體驗僅五週——NCSoft 很可能會展示上線前的最終實機演示，可能包括全球版開場CG、實機團本或副本演示。", "開發者直播已透露重大變更：副本隊伍從4人擴至5人、首次團本從8人擴至10人、戰場標準化為10v10、以及五個非鎖區伺服器。科隆展可能帶來終局內容的更多細節。"]),
          section("global-launch-context", "全球上線背景", ["AION 2 全球版確認將於2026年9月在 PC（Steam 和 PURPLE）上線。創始人包購買者可於9月30日開始搶先體驗，完整免費遊玩版預計10月初上線。遊戲上線時支援10種語言。", "Steam 商店頁已上線（app ID 3393110），官方全球站已開放預註冊。NCSoft 確認遊戲使用虛幻引擎5，世界規模為初代 AION 的36倍。"]),
          section("why-it-matters", "這對玩家的意義", ["科隆遊戲展 ONL 通常有全球數百萬觀眾觀看。對 AION 2 而言，這是遊戲上線前能觸及的最廣泛主流受眾。任何新實機畫面或功能公布都將影響上線前預期。", "如果你還在猶豫是否購買創始人包，等科隆展展示可能值得——NCSoft 可能在活動期間公布額外獎勵或限時優惠。"]),
        ],
      }),
    },
  },

  // ARTICLE 2: Post-Patch Class Tier List
  {
    section: "guides",
    slug: "post-patch-class-tier-list-august-2026",
    schemaType: "TechArticle",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [aion2tSource, ncDevStreamSource, mmobombSource],
    heroImage: tierListHero,
    related: [
      { kind: "content", section: "guides", slug: "healer-nerf-survival-guide" },
      { kind: "content", section: "guides", slug: "class-selection-pve-pvp-guide-global" },
      { kind: "content", section: "classes", slug: "difficulty-comparison" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 6, {
        eyebrow: "CLASS TIER LIST",
        title: "AION 2 Class Tier List August 2026: Best Classes After the Healer Nerf",
        description: "The August 12 patch nerfed Cleric and Chanter healing by 20-50%. Our updated tier list ranks all 9 classes for PvE and PvP after the biggest balance shake-up since launch.",
        intro: "The August 12 update brought the most significant class balance changes since AION 2's Korea launch. Cleric and Chanter healing was reduced by 20-50%, seven classes received healing reduction debuff buffs, and battleground matchmaking was reworked to solo or 5-stack only. This tier list reflects the post-patch meta for both PvE and PvP.",
        sourceNote: "Based on AION2T patch notes, NCSOFT official update notes, and community testing data. Tier placements reflect the Korea service meta as of August 14, 2026; global meta may differ at launch.",
        keywords: ["AION 2 class tier list 2026", "AION 2 best class August 2026", "AION 2 healer nerf impact", "AION 2 PvE tier list", "AION 2 PvP tier list"],
        sections: [
          section("s-tier", "S-Tier: Assassin, Ranger", ["Assassin remains the undisputed S-tier pick for PvP after the August 12 patch. High burst damage, stealth mobility, and strong 1v1 capability make it the top choice for solo battleground queue. The healing nerf indirectly buffs assassins — with less sustain on targets, burst windows are more lethal.", "Ranger rises to S-tier with improved kite-and-burst potential. With healers less able to sustain through damage, Ranger's long-range pressure becomes more threatening. The battleground shift to solo/5-stack also favors Ranger's self-sufficient playstyle."]),
          section("a-tier", "A-Tier: Sorcerer, Templar, Brawler", ["Sorcerer stays strong in A-tier. High AoE damage remains valuable in PvE dungeons and 10v10 battlegrounds. The healing nerf means Sorcerer's burst windows can now overwhelm reduced healing output, especially in coordinated 5-stack teams.", "Templar holds A-tier for PvE tanking. While not directly affected by the patch, the reduction in healer sustain makes mitigation and positioning even more critical. Templar's crowd control and taunt utility gain value when healers can't simply out-heal damage.", "Brawler, the newest class added in July, sits in A-tier. Its Full Force rework on July 29 gave it strong sustained damage and self-healing — which becomes more valuable when dedicated healers have less output."]),
          section("b-tier", "B-Tier: Spiritmaster, Gladiator", ["Spiritmaster drops slightly to B-tier. While pet utility remains useful, the healing nerf reduces the value of pet-sustained tanking strategies. In PvP, Spiritmaster's crowd control is still strong but the reduced healing makes pets more fragile.", "Gladiator stays in B-tier with consistent melee damage and decent survivability. The battleground shift to 10v10 with standardized stats somewhat reduces Gladiator's gear-dependent scaling advantage."]),
          section("c-tier", "C-Tier: Cleric, Chanter", ["Cleric drops from S to C-tier — the biggest fall in this update. Healing output reduced 20-50% means Clerics can no longer single-handedly keep a party alive through burst damage. The extended 40m healing range partially compensates but doesn't offset the raw output loss. In PvE, Cleric is still mandatory but feels significantly weaker.", "Chanter falls to C-tier alongside Cleric. The loss of fixed healing passives in favor of attack-power-scaling healing means Chanter must now choose between damage and healing stats. In battlegrounds, the shift to solo/5-stack reduces the value of Chanter's party-wide buffs, and the 10v10 format means fewer coordinated teams to benefit from chant auras."]),
          section("global-considerations", "Considerations for global launch players", "For players choosing a main class for the September global launch, this tier list reflects the post-August-12 Korea meta. The global version may launch with these changes already applied, meaning the healer nerf will be part of the day-one experience. If you plan to play a healing class, be prepared for a more active, positioning-heavy playstyle rather than passive throughput healing.".split("\n").filter(Boolean) as readonly string[]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
        eyebrow: "职业强度榜",
        title: "AION 2 职业强度榜 2026年8月：治疗削弱后的最佳职业",
        description: "8月12日补丁将Cleric和Chanter的治疗量降低20-50%。我们的更新版强度榜为PvE和PvP排名了全部9个职业，这是上线以来最大的平衡性调整。",
        intro: "8月12日更新带来了 AION 2 韩服上线以来最重大的职业平衡调整。Cleric和Chanter治疗量降低20-50%，七个职业的减疗debuff被加强，战场匹配改为单人或5人组队。本强度榜反映补丁后的PvE和PvP环境。",
        sourceNote: "基于 AION2T 补丁说明、NCSOFT 官方更新说明和社区测试数据。强度排名反映截至2026年8月14日的韩服环境；全球版上线时环境可能不同。",
        keywords: ["AION 2 职业强度榜 2026", "AION 2 最佳职业 2026年8月", "AION 2 治疗削弱影响", "AION 2 PvE 强度榜", "AION 2 PvP 强度榜"],
        sections: [
          section("s-tier", "S级：刺客、游侠", ["刺客在8月12日补丁后仍是PvP无可争议的S级选择。高爆发伤害、隐身机动性和强力的1v1能力使其成为单人战场排队首选。治疗削弱间接加强了刺客——目标续航降低后，爆发窗口更加致命。", "游侠升至S级，风筝加爆发能力提升。治疗者更难扛住伤害，游侠的远程压制更加致命。战场改为单人/5人组队也有利于游侠的自给自足玩法。"]),
          section("a-tier", "A级：法师、圣骑士、格斗家", ["法师保持A级。高AoE伤害在PvE副本和10v10战场中仍然重要。治疗削弱意味着法师的爆发窗口现在可以压过降低后的治疗输出。", "圣骑士在PvE坦克方面保持A级。虽然补丁未直接影响，但治疗续航降低使减伤和走位更加关键。", "格斗家作为7月新增职业位列A级。7月29日的全力重做赋予其强大的持续伤害和自我治疗——在专属治疗者输出降低时更有价值。"]),
          section("b-tier", "B级：精灵师、剑星", ["精灵师略降至B级。宠物辅助仍有用，但治疗削弱降低了宠物持续坦克策略的价值。PvP中精灵师的控制仍然很强，但治疗降低使宠物更脆弱。", "剑星保持B级，具有稳定的近战伤害和不错的生存能力。战场改为10v10标准化属性在一定程度上减少了剑星依赖装备数值的优势。"]),
          section("c-tier", "C级：治愈星、护法星", ["治愈星从S级降至C级——本次更新跌幅最大。治疗输出降低20-50%意味着治愈星不再能独自撑起全队承受爆发伤害。延长的40m治疗范围部分弥补了原始输出损失。PvE中治愈星仍然必需，但明显感觉变弱。", "护法星与治愈星一同降至C级。固定治疗被动改为攻击力缩放治疗意味着护法必须在伤害和治疗属性之间做出选择。战场改为单人/5人减少了护法全队增益的价值。"]),
          section("global-considerations", "全球版玩家注意事项", ["对于选择9月全球版首发职业的玩家，本强度榜反映的是8月12日后的韩服环境。全球版可能上线时就已包含这些改动，意味着治疗削弱将是首日体验的一部分。如果你打算玩治疗职业，请做好准备迎接更注重走位和主动操作的玩法，而非被动输出治疗。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 6, {
        eyebrow: "클래스 티어리스트",
        title: "AION 2 클래스 티어리스트 2026년 8월: 힐러 너프 이후 최고의 클래스",
        description: "8월 12일 패치로 클레릭과 챈터의 치유량이 20-50% 감소했습니다. 업데이트된 티어리스트에서 PvE와 PvP 모든 9개 클래스를 순위 매깁니다.",
        intro: "8월 12일 업데이트는 AION 2 한국 출시 이후 가장 중요한 클래스 밸런스 변경을 가져왔습니다. 클레릭과 챈터 치유량 20-50% 감소, 7개 클래스의 치유 감소 디버프 강화, 전장 매치메이킹 솔로/5인 큐로 변경. 이 티어리스트는 패치 이후 PvE 및 PvP 메타를 반영합니다.",
        sourceNote: "AION2T 패치 노트, NCSOFT 공식 업데이트 노트 및 커뮤니티 테스트 데이터에 기반합니다. 순위는 2026년 8월 14일 기준 한국 서비스 메타를 반영하며, 글로벌 메타는 출시 시 다를 수 있습니다.",
        keywords: ["AION 2 클래스 티어리스트 2026", "AION 2 최고 클래스 2026년 8월", "AION 2 힐러 너프 영향", "AION 2 PvE 티어리스트", "AION 2 PvP 티어리스트"],
        sections: [
          section("s-tier", "S티어: 어쌔신, 레인저", ["어쌔신은 8월 12일 패치 이후 PvP에서 부동의 S티어입니다. 높은 버스트 데미지, 은신 기동성, 강력한 1v1 능력으로 솔로 전장 큐의 최고 선택입니다. 힐러 너프는 간접적으로 어쌔신을 강화합니다 — 대상 유지력이 감소해 버스트 구간이 더 치명적입니다.", "레인저는 카이트-버스트 잠재력 향상으로 S티어로 상승합니다. 힐러가 데미지를 유지하기 어려워지면서 레인저의 장거리 압박이 더 위협적입니다. 전장 솔로/5인 큐 변경도 레인저의 자급자족 플레이스타일에 유리합니다."]),
          section("a-tier", "A티어: 소서러, 템플러, 브롤러", ["소서러는 A티어를 유지합니다. 높은 광역 데미지는 PvE 던전과 10v10 전장에서 여전히 중요합니다. 힐러 너프로 소서러의 버스트 구간이 감소된 치유 출력을 압도할 수 있습니다.", "템플러는 PvE 탱킹에서 A티어를 유지합니다. 패치의 직접 영향은 없지만 치유 유지력 감소로 피해 감소와 포지셔닝이 더 중요해집니다.", "브롤러는 7월에 추가된 최신 클래스로 A티어입니다. 7월 29일 풀포스 리워크로 강력한 지속 데미지와 자가 치유를 보유해 전담 힐러 출력이 감소한 상황에서 더 가치 있습니다."]),
          section("b-tier", "B티어: 스피릿마스터, 글래디에이터", ["스피릿마스터는 B티어로 약간 하락합니다. 펫 유틸리티는 여전히 유용하지만 힐러 너프로 펫 지속 탱킹 전략의 가치가 감소합니다.", "글래디에이터는 안정적인 근접 데미지와 준수한 생존력으로 B티어를 유지합니다. 전장 10v10 표준화 스탯 변경으로 장비 의존 스케일링 이점이 다소 감소합니다."]),
          section("c-tier", "C티어: 클레릭, 챈터", ["클레릭은 S에서 C티어로 하락 — 이번 업데이트에서 가장 큰 낙폭입니다. 치유 출력 20-50% 감소로 클레릭이 단독으로 파티를 버스트 데미지에서 살릴 수 없게 됐습니다. 40m 치유 범위 연장이 부분적으로 보완하지만 원시 출력 손실을 상쇄하지는 못합니다.", "챈터도 클레릭과 함께 C티어로 하락합니다. 고정 치유 패시브가 공격력 비례 치유로 변경되어 데미지와 치유 스탯 중 선택해야 합니다. 전장 솔로/5인 변경으로 파티 전체 버프의 가치가 감소합니다."]),
          section("global-considerations", "글로벌 출시 플레이어 주의사항", ["9월 글로벌 출시에서 메인 클래스를 선택하는 플레이어의 경우, 이 티어리스트는 8월 12일 이후 한국 메타를 반영합니다. 글로벌 버전은 이 변경사항이 이미 적용된 상태로 출시될 수 있어 힐러 너프가 첫날 경험의 일부가 될 수 있습니다. 힐링 클래스를 플레이할 계획이라면 수동 처리량 힐링이 아닌 더 능동적인 포지셔닝 중심의 플레이스타일에 대비하세요."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 6, {
        eyebrow: "TIER LIST DES CLASSES",
        title: "Tier list des classes AION 2 août 2026 : Meilleures classes après le nerf des soigneurs",
        description: "La mise à jour du 12 août a réduit les soins du Clerc et du Chanter de 20-50%. Notre tier list mise à jour classe les 9 classes en PvE et PvP après le plus grand bouleversement d'équilibre depuis le lancement.",
        intro: "La mise à jour du 12 août a apporté les changements d'équilibre de classe les plus importants depuis le lancement coréen d'AION 2. Les soins du Clerc et du Chanter ont été réduits de 20-50%, sept classes ont reçu des buffs de debuff de réduction de soins, et le matchmaking des champs de bataille a été refondu en solo ou groupe de 5 uniquement.",
        sourceNote: "Basé sur les notes de correctif AION2T, les notes de mise à jour officielles NCSOFT et les données de test de la communauté. Les placements de tier reflètent le méta du service coréen au 14 août 2026.",
        keywords: ["tier list classes AION 2 2026", "AION 2 meilleure classe août 2026", "impact nerf soigneur AION 2", "tier list PvE AION 2", "tier list PvP AION 2"],
        sections: [
          section("s-tier", "Tier S : Assassin, Ranger", ["L'Assassin reste le choix Tier S incontesté pour le PvP après le patch du 12 août. Ses dégâts en rafale élevés, sa mobilité furtive et sa forte capacité en 1v1 en font le premier choix pour la file de champ de bataille solo. Le nerf des soins renforce indirectement les assassins — avec moins de soutient sur les cibles, les fenêtres de rafale sont plus létales.", "Le Ranger monte en Tier S avec un potentiel amélioré de kite-and-burst. Avec les soigneurs moins capables de soutenir face aux dégâts, la pression à longue portée du Ranger devient plus menaçante."]),
          section("a-tier", "Tier A : Sorcerer, Templar, Brawler", ["Le Sorcerer reste fort en Tier A. Ses dégâts AoE élevés restent précieux en donjons PvE et champs de bataille 10v10. Le nerf des soins signifie que les fenêtres de rafale peuvent maintenant submerger la production de soins réduite.", "Le Templar conserve le Tier A pour le tanking PvE. Le Brawler, la classe la plus récente ajoutée en juillet, se situe en Tier A avec ses dégâts soutenus et son auto-soin."]),
          section("b-tier", "Tier B : Spiritmaster, Gladiator", ["Le Spiritmaster descend légèrement en Tier B. Le Gladiator reste en Tier B avec des dégâts de mêlée constants et une survie décente."]),
          section("c-tier", "Tier C : Cleric, Chanter", ["Le Clerc passe de S à Tier C — la plus grande chute de cette mise à jour. La réduction de 20-50% des soins signifie que les Clercs ne peuvent plus maintenir un groupe en vie seuls face aux dégâts en rafale. Le Chanter tombe également en Tier C."]),
          section("global-considerations", "Considérations pour les joueurs du lancement mondial", ["Pour les joueurs choisissant une classe principale pour le lancement mondial de septembre, cette tier list reflète le méta coréen post-12 août. La version globale pourrait lancer avec ces changements déjà appliqués."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 6, {
        eyebrow: "KLASSEN-TIER-LISTE",
        title: "AION 2 Klassen-Tier-Liste August 2026: Beste Klassen nach dem Heiler-Nerf",
        description: "Das Update vom 12. August hat die Heilung von Cleric und Chanter um 20-50% reduziert. Unsere aktualisierte Tier-Liste bewertet alle 9 Klassen für PvE und PvP nach dem größten Balance-Umbruch seit dem Launch.",
        intro: "Das Update vom 12. August brachte die bedeutendsten Klassen-Balance-Änderungen seit dem Korea-Launch von AION 2. Cleric- und Chanter-Heilung wurde um 20-50% reduziert, sieben Klassen erhielten Heilreduktions-Debuff-Buffs und Schlachtfeld-Matching wurde auf Solo oder 5er-Gruppe umgestellt.",
        sourceNote: "Basierend auf AION2T-Patch-Notizen, offiziellen NCSOFT-Update-Notizen und Community-Testdaten. Tier-Platzierungen spiegeln den Korea-Service-Meta Stand 14. August 2026 wider.",
        keywords: ["AION 2 Klassen-Tier-Liste 2026", "AION 2 beste Klasse August 2026", "AION 2 Heiler-Nerf-Auswirkungen", "AION 2 PvE Tier-Liste", "AION 2 PvP Tier-Liste"],
        sections: [
          section("s-tier", "S-Tier: Assassin, Ranger", ["Assassin bleibt die unbestrittene S-Tier-Wahl für PvP nach dem Patch vom 12. August. Hoher Burst-Schaden, Stealth-Mobilität und starke 1v1-Fähigkeit machen ihn zur Top-Wahl.", "Ranger steigt mit verbessertem Kite-and-Burst-Potenzial in das S-Tier auf."]),
          section("a-tier", "A-Tier: Sorcerer, Templar, Brawler", ["Sorcerer bleibt stark im A-Tier. Templar hält A-Tier für PvE-Tanking. Brawler, die neueste Klasse, sitzt im A-Tier mit starkem anhaltendem Schaden und Selbstheilung."]),
          section("b-tier", "B-Tier: Spiritmaster, Gladiator", ["Spiritmaster fällt leicht auf B-Tier. Gladiator bleibt mit konstantem Nahkampfschaden im B-Tier."]),
          section("c-tier", "C-Tier: Cleric, Chanter", ["Cleric fällt von S auf C-Tier — der größte Abstieg in diesem Update. Heilungsoutput um 20-50% reduziert. Chanter fällt ebenfalls auf C-Tier."]),
          section("global-considerations", "Überlegungen für globale Launch-Spieler", ["Diese Tier-Liste spiegelt das koreanische Meta nach dem 12. August wider. Die globale Version könnte mit diesen Änderungen starten."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 6, {
        eyebrow: "LISTA DE NIVELES",
        title: "Lista de niveles de clases AION 2 agosto 2026: Mejores clases tras el nerf de sanadores",
        description: "La actualización del 12 de agosto redujo la sanación de Cleric y Chanter en 20-50%. Nuestra lista actualizada clasifica las 9 clases en PvE y PvP tras el mayor cambio de equilibrio desde el lanzamiento.",
        intro: "La actualización del 12 de agosto trajo los cambios de equilibrio de clases más significativos desde el lanzamiento de AION 2 en Corea. La sanación de Cleric y Chanter se redujo 20-50%, siete clases recibieron mejoras de debuff de reducción de sanación, y el matchmaking de campos de batalla se reformó a solo o grupo de 5.",
        sourceNote: "Basado en notas de parche AION2T, notas oficiales de NCSOFT y datos de prueba de la comunidad. Las ubicaciones de nivel reflejan el meta del servicio de Corea al 14 de agosto de 2026.",
        keywords: ["lista de niveles clases AION 2 2026", "AION 2 mejor clase agosto 2026", "impacto nerf sanador AION 2", "tier list PvE AION 2", "tier list PvP AION 2"],
        sections: [
          section("s-tier", "Nivel S: Assassin, Ranger", ["Assassin sigue siendo la elección indiscutible de nivel S para PvP. Ranger sube al nivel S con potencial mejorado de kite-and-burst."]),
          section("a-tier", "Nivel A: Sorcerer, Templar, Brawler", ["Sorcerer se mantiene fuerte en nivel A. Templar mantiene nivel A para tanqueo PvE. Brawler se sitúa en nivel A."]),
          section("b-tier", "Nivel B: Spiritmaster, Gladiator", ["Spiritmaster baja a nivel B. Gladiator se mantiene en nivel B."]),
          section("c-tier", "Nivel C: Cleric, Chanter", ["Cleric cae de S a nivel C — la mayor caída de esta actualización. Sanación reducida 20-50%. Chanter también cae a nivel C."]),
          section("global-considerations", "Consideraciones para jugadores del lanzamiento global", ["Esta lista refleja el meta coreano post-12 de agosto. La versión global podría lanzarse con estos cambios ya aplicados."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 6, {
        eyebrow: "職業ティアリスト",
        title: "AION 2 職業ティアリスト 2026年8月：ヒーラーナーフ後のベストクラス",
        description: "8月12日パッチでクレリックとチャンターの回復量が20-50%減少しました。PvE・PvP全9職業の更新版ティアリストです。",
        intro: "8月12日アップデートはAION 2韓国ローンチ以来最も重要な職業バランス調整をもたらしました。クレリック・チャンター回復量20-50%減少、7職業の回復減少デバフ強化、戦場マッチングのソロ/5人PT化。",
        sourceNote: "AION2Tパッチノート、NCSOFT公式アップデートノート、コミュニティテストデータに基づきます。順位は2026年8月14日時点の韓国サービスメタを反映しています。",
        keywords: ["AION 2 職業ティアリスト 2026", "AION 2 ベストクラス 2026年8月", "AION 2 ヒーラーナーフ影響", "AION 2 PvE ティアリスト", "AION 2 PvP ティアリスト"],
        sections: [
          section("s-tier", "S tier：アサシン、レンジャー", ["アサシンは8月12日パッチ後もPvP不動のS tier。高バーストダメージ、隠密機動力、強力な1v1能力でソロ戦場のトップ選択。", "レンジャーはカイト＆バースト強化でS tierに上昇。"]),
          section("a-tier", "A tier：ソーサラー、テンプラー、ブロウラー", ["ソーサラーはA tierを維持。テンプラーはPvEタンクでA tier維持。ブロウラーは7月追加最新クラスでA tier。"]),
          section("b-tier", "B tier：スピリットマスター、グラディエイター", ["スピリットマスターはB tierに微減。グラディエイターはB tier維持。"]),
          section("c-tier", "C tier：クレリック、チャンター", ["クレリックはSからC tierへ — 今回最大の降下。回復出力20-50%減少。チャンターもC tierに降下。"]),
          section("global-considerations", "グローバル版プレイヤーへの注意", ["このティアリストは8月12日以降の韓国メタを反映。グローバル版はこれらの変更が適用済みでローンチされる可能性があります。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 6, {
        eyebrow: "LISTA DE NÍVEIS",
        title: "Lista de níveis de classes AION 2 agosto 2026: Melhores classes após o nerf de healers",
        description: "A atualização de 12 de agosto reduziu a cura de Cleric e Chanter em 20-50%. Nossa lista atualizada classifica todas as 9 classes para PvE e PvP após a maior mudança de equilíbrio desde o lançamento.",
        intro: "A atualização de 12 de agosto trouxe as mudanças de equilíbrio de classe mais significativas desde o lançamento coreano de AION 2. Cura de Cleric e Chanter reduzida em 20-50%, sete classes receberam buffs de debuff de redução de cura.",
        sourceNote: "Baseado nas notas de patch AION2T, notas oficiais da NCSOFT e dados de teste da comunidade. Colocações refletem o meta do serviço coreano em 14 de agosto de 2026.",
        keywords: ["lista de níveis classes AION 2 2026", "AION 2 melhor classe agosto 2026", "impacto nerf healer AION 2", "tier list PvE AION 2", "tier list PvP AION 2"],
        sections: [
          section("s-tier", "Nível S: Assassin, Ranger", ["Assassin permanece a escolha indiscutível de nível S para PvP. Ranger sobe para nível S com potencial melhorado de kite-and-burst."]),
          section("a-tier", "Nível A: Sorcerer, Templar, Brawler", ["Sorcerer permanece forte no nível A. Templar mantém nível A para tanking PvE. Brawler está no nível A."]),
          section("b-tier", "Nível B: Spiritmaster, Gladiator", ["Spiritmaster cai para nível B. Gladiator permanece no nível B."]),
          section("c-tier", "Nível C: Cleric, Chanter", ["Cleric cai de S para nível C — a maior queda desta atualização. Cura reduzida em 20-50%. Chanter também cai para nível C."]),
          section("global-considerations", "Considerações para jogadores do lançamento global", ["Esta lista reflete o meta coreano pós-12 de agosto. A versão global pode ser lançada com essas mudanças já aplicadas."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 6, {
        eyebrow: "ТИР-ЛИСТ КЛАССОВ",
        title: "Тир-лист классов AION 2 август 2026: Лучшие классы после нерфа лекарей",
        description: "Патч от 12 августа снизил лечение Cleric и Chanter на 20-50%. Наш обновлённый тир-лист ранжирует все 9 классов для PvE и PvP после крупнейшего изменения баланса с запуска.",
        intro: "Обновление от 12 августа принесло самые значительные изменения баланса классов с корейского запуска AION 2. Лечение Cleric и Chanter снижено на 20-50%, семь классов получили усиление дебаффов снижения лечения.",
        sourceNote: "Основано на патч-нотах AION2T, официальных нотах NCSOFT и данных тестирования сообщества. Места в тир-листе отражают мету корейского сервиса на 14 августа 2026 года.",
        keywords: ["тир-лист классов AION 2 2026", "AION 2 лучший класс август 2026", "влияние нерфа лекарей AION 2", "тир-лист PvE AION 2", "тир-лист PvP AION 2"],
        sections: [
          section("s-tier", "S-тир: Assassin, Ranger", ["Assassin остаётся бесспорным выбором S-тира для PvP. Ranger поднимается в S-тир с улучшенным потенциалом кайта и бёрста."]),
          section("a-tier", "A-тир: Sorcerer, Templar, Brawler", ["Sorcerer остаётся силён в A-тире. Templar держит A-тир для PvE танкинга. Brawler находится в A-тире."]),
          section("b-tier", "B-тир: Spiritmaster, Gladiator", ["Spiritmaster немного падает до B-тира. Gladiator остаётся в B-тире."]),
          section("c-tier", "C-тир: Cleric, Chanter", ["Cleric падает с S до C-тира — крупнейшее падение в этом обновлении. Лечение снижено на 20-50%. Chanter также падает до C-тира."]),
          section("global-considerations", "Соображения для игроков глобального запуска", ["Этот тир-лист отражает корейскую мету после 12 августа. Глобальная версия может запуститься с уже применёнными изменениями."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
        eyebrow: "職業強度榜",
        title: "AION 2 職業強度榜 2026年8月：治療削弱後的最佳職業",
        description: "8月12日補丁將Cleric和Chanter的治療量降低20-50%。更新版強度榜為PvE和PvP排名全部9個職業。",
        intro: "8月12日更新帶來了 AION 2 韓服上線以來最重大的職業平衡調整。Cleric和Chanter治療量降低20-50%，七個職業的減療debuff被加強。",
        sourceNote: "基於 AION2T 補丁說明、NCSOFT 官方更新說明和社群測試資料。強度排名反映截至2026年8月14日的韓服環境。",
        keywords: ["AION 2 職業強度榜 2026", "AION 2 最佳職業 2026年8月", "AION 2 治療削弱影響", "AION 2 PvE 強度榜", "AION 2 PvP 強度榜"],
        sections: [
          section("s-tier", "S級：刺客、遊俠", ["刺客在8月12日補丁後仍是PvP無可爭議的S級選擇。遊俠升至S級。"]),
          section("a-tier", "A級：法師、聖騎士、格鬥家", ["法師保持A級。聖騎士在PvE坦克方面保持A級。格鬥家位列A級。"]),
          section("b-tier", "B級：精靈師、劍星", ["精靈師略降至B級。劍星保持B級。"]),
          section("c-tier", "C級：治癒星、護法星", ["治癒星從S級降至C級——本次更新跌幅最大。治療輸出降低20-50%。護法星也降至C級。"]),
          section("global-considerations", "全球版玩家注意事項", ["本強度榜反映8月12日後的韓服環境。全球版可能上線時就包含這些改動。"]),
        ],
      }),
    },
  },

  // ARTICLE 3: China Publishing Deal
  {
    section: "news",
    slug: "aion-2-china-publishing-shengqu-games",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [chinaPubSource, ncChinaSource],
    heroImage: chinaHero,
    related: [
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
      { kind: "content", section: "guides", slug: "aion-2-platforms" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 4, {
        eyebrow: "CHINA PUBLISHING",
        title: "AION 2 Heads to China: NCSoft Signs Publishing Deal with Shengqu Games",
        description: "NCSoft has signed a publishing agreement with Shengqu Games (盛趣游戏) to bring AION 2 — known as 永恒之塔2 in China — to the Chinese market. ChinaJoy 2026 booth confirmed.",
        intro: "On August 1, 2026, NCSoft announced a publishing partnership with Shengqu Games to operate AION 2 in mainland China. The game will be marketed as 永恒之塔2 (Tower of Eternity 2) in the region. Shengqu Games, a subsidiary of Shanda Games, has extensive experience operating MMORPGs in China including the original AION.",
        sourceNote: "Based on AION2Hub reporting and NCSOFT official announcement. China launch date has not been announced; the deal covers mainland China publishing rights.",
        keywords: ["AION 2 China", "AION 2 Shengqu Games", "永恒之塔2", "AION 2 China publishing", "NCSoft China deal"],
        sections: [
          section("the-deal", "The publishing agreement", ["NCSoft and Shengqu Games signed the publishing agreement on August 1, 2026. Shengqu Games will handle mainland China operations including server infrastructure, localization, customer support, and monetization. NCSoft retains creative control and will provide ongoing game updates.", "Shengqu Games is a subsidiary of Shanda Games (now Zhejiang Century Huatong), one of China's largest game publishers. The company previously operated the original AION in China from 2009 to 2020, giving it deep familiarity with the franchise and its community."]),
          section("chinajoy-2026", "ChinaJoy 2026 presence", ["Shengqu Games set up an AION 2 booth at ChinaJoy 2026 (July 26-29, Shanghai), featuring playable demos of the Korea service version and promotional materials branded as 永恒之塔2. The booth attracted significant attention from Chinese MMORPG fans eager for a localized version.", "The ChinaJoy presence confirms that marketing and community building for the Chinese launch has already begun, even though a release date has not been announced."]),
          section("what-this-means", "What this means for players", ["For Chinese players, this means AION 2 will receive a dedicated local server with Chinese language support, localized events, and compliance with Chinese gaming regulations including playtime restrictions and real-name verification.", "For global players, the China deal has minimal direct impact — Chinese servers will be separate from global servers, and cross-region play has not been announced. However, the additional revenue from the Chinese market could accelerate content development for all regions."]),
          section("timeline", "Expected timeline", ["No official release date has been announced for the China launch. Based on typical Chinese game approval timelines (including ISBN application through the National Press and Publication Administration), the China launch could be 6-12 months after the global launch, potentially placing it in Q2-Q3 2027.", "The Korea service is already live, the global launch is September 2026, and the China launch will follow after regulatory approval is obtained."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 4, {
        eyebrow: "中国发行",
        title: "AION 2 进军中国：NCSoft 与盛趣游戏签署发行协议",
        description: "NCSoft 与盛趣游戏签署发行协议，将 AION 2（永恒之塔2）引入中国市场。ChinaJoy 2026 展台已确认。",
        intro: "2026年8月1日，NCSoft 宣布与盛趣游戏达成发行合作，在中国大陆运营 AION 2。游戏将以「永恒之塔2」之名在区域发行。盛趣游戏是世纪华通旗下公司，在中国运营MMORPG经验丰富，曾运营初代永恒之塔。",
        sourceNote: "基于 AION2Hub 报道和 NCSOFT 官方公告。中国上线日期尚未公布；协议涵盖中国大陆发行权。",
        keywords: ["AION 2 中国", "AION 2 盛趣游戏", "永恒之塔2", "AION 2 中国发行", "NCSoft 中国合作"],
        sections: [
          section("the-deal", "发行协议", ["NCSoft 与盛趣游戏于2026年8月1日签署发行协议。盛趣游戏将负责中国大陆运营，包括服务器基础设施、本地化、客户服务和商业化。NCSoft 保留创意控制权并将提供持续游戏更新。", "盛趣游戏是世纪华通旗下公司，是中国最大的游戏发行商之一。该公司曾于2009至2020年在中国运营初代永恒之塔，对该系列及其社区有深入了解。"]),
          section("chinajoy-2026", "ChinaJoy 2026 展会", ["盛趣游戏在2026年 ChinaJoy（7月26-29日，上海）设立了 AION 2 展台，提供韩服版本试玩和「永恒之塔2」品牌宣传材料。展台吸引了大量中国MMORPG粉丝关注。", "ChinaJoy 的亮相确认了中国上线的营销和社区建设已经开始，尽管发行日期尚未公布。"]),
          section("what-this-means", "对玩家的意义", ["对中国玩家而言，AION 2 将获得专属本地服务器，支持中文、本地化活动，并遵守中国游戏法规包括游玩时间限制和实名认证。", "对全球玩家而言，中国合作几乎没有直接影响——中国服务器将与全球服务器分开，未公布跨区域游玩。但中国市场的额外收入可能加速所有地区的内容开发。"]),
          section("timeline", "预期时间线", ["中国上线尚未公布官方发行日期。根据中国游戏审批的典型时间线（包括通过国家新闻出版署申请版号），中国上线可能在全球上线后6-12个月，即2027年Q2-Q3。", "韩服已上线，全球版2026年9月上线，中国版将在获得监管批准后跟进。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 4, {
        eyebrow: "중국 퍼블리싱",
        title: "AION 2, 중국 진출: NCSoft, 성취게임즈와 퍼블리싱 계약 체결",
        description: "NCSoft가 성취게임즈(盛趣游戏)와 퍼블리싱 계약을 체결하여 AION 2를 중국 시장에 출시합니다. ChinaJoy 2026 부스 확인됐습니다.",
        intro: "2026년 8월 1일, NCSoft는 성취게임즈와 중국 대륙 운영을 위한 퍼블리싱 파트너십을 발표했습니다. 게임은 중국에서 '영원의 탑2'로 마케팅됩니다. 성취게임즈는 센츄리화통 자회사로 중국 MMORPG 운영 경험이 풍부합니다.",
        sourceNote: "AION2Hub 보도 및 NCSOFT 공식 발표에 기반합니다. 중국 출시일은 미발표이며, 계약은 중국 대륙 퍼블리싱 권리를 다룹니다.",
        keywords: ["AION 2 중국", "AION 2 성취게임즈", "영원의 탑2", "AION 2 중국 퍼블리싱", "NCSoft 중국 계약"],
        sections: [
          section("the-deal", "퍼블리싱 계약", ["NCSoft와 성취게임즈는 2026년 8월 1일 퍼블리싱 계약을 체결했습니다. 성취게임즈가 중국 대륙 운영을 담당하며 서버 인프라, 현지화, 고객 지원, 수익화를 포함합니다. NCSoft는 크리에이티브 컨트롤을 유지하고 지속적인 게임 업데이트를 제공합니다.", "성취게임즈는 센츄리화통 자회사로 중국 최대 게임 퍼블리셔 중 하나입니다. 2009~2020년 중국에서 초대 AION을 운영한 경험이 있습니다."]),
          section("chinajoy-2026", "ChinaJoy 2026 참여", ["성취게임즈는 2026년 ChinaJoy(7월 26-29일, 상하이)에 AION 2 부스를 설치해 한국 서비스 버전 체험판과 '영원의 탑2' 브랜드 홍보 자료를 제공했습니다.", "ChinaJoy 참여는 출시일이 발표되지 않았음에도 중국 출시 마케팅이 이미 시작됐음을 확인합니다."]),
          section("what-this-means", "플레이어에게 미치는 영향", ["중국 플레이어에게는 전용 로컬 서버, 중국어 지원, 현지화 이벤트 및 중국 게임 규정 준수가 제공됩니다. 글로벌 플레이어에게는 직접적 영향이 거의 없습니다 — 중국 서버는 글로벌 서버와 분리됩니다."]),
          section("timeline", "예상 타임라인", ["중국 출시일은 공식 발표되지 않았습니다. 일반적인 중국 게임 승인 타임라인을 기준으로 글로벌 출시 후 6-12개월, 즉 2027년 Q2-Q3으로 예상됩니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 4, {
        eyebrow: "ÉDITION EN CHINE",
        title: "AION 2 arrive en Chine : NCSoft signe un accord d'édition avec Shengqu Games",
        description: "NCSoft a signé un accord d'édition avec Shengqu Games pour lancer AION 2 — connu sous le nom 永恒之塔2 en Chine — sur le marché chinois.",
        intro: "Le 1er août 2026, NCSoft a annoncé un partenariat d'édition avec Shengqu Games pour exploiter AION 2 en Chine continentale. Le jeu sera commercialisé sous le nom 永恒之塔2 dans la région.",
        sourceNote: "Basé sur les reportages d'AION2Hub et l'annonce officielle de NCSOFT. La date de lancement en Chine n'a pas été annoncée.",
        keywords: ["AION 2 Chine", "AION 2 Shengqu Games", "永恒之塔2", "édition AION 2 Chine", "NCSoft accord Chine"],
        sections: [
          section("the-deal", "L'accord d'édition", ["NCSoft et Shengqu Games ont signé l'accord d'édition le 1er août 2026. Shengqu Games gérera les opérations en Chine continentale."]),
          section("chinajoy-2026", "Présence au ChinaJoy 2026", ["Shengqu Games a installé un stand AION 2 au ChinaJoy 2026 à Shanghai."]),
          section("what-this-means", "Ce que cela signifie", ["Pour les joueurs chinois, AION 2 aura des serveurs locaux dédiés avec support linguistique chinois."]),
          section("timeline", "Calendrier prévu", ["Aucune date de lancement officielle annoncée pour la Chine. Lancement potentiel en Q2-Q3 2027."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 4, {
        eyebrow: "CHINA-VERTRIEB",
        title: "AION 2 kommt nach China: NCSoft unterzeichnet Vertriebsabkommen mit Shengqu Games",
        description: "NCSoft hat eine Vertriebsvereinbarung mit Shengqu Games unterzeichnet, um AION 2 — als 永恒之塔2 bekannt — auf dem chinesischen Markt zu veröffentlichen.",
        intro: "Am 1. August 2026 gab NCSoft eine Vertriebspartnerschaft mit Shengqu Games bekannt, um AION 2 in Festlandchina zu betreiben.",
        sourceNote: "Basierend auf AION2Hub-Berichterstattung und der offiziellen NCSOFT-Ankündigung. Das China-Veröffentlichungsdatum wurde nicht angekündigt.",
        keywords: ["AION 2 China", "AION 2 Shengqu Games", "永恒之塔2", "AION 2 China-Vertrieb", "NCSoft China-Abkommen"],
        sections: [
          section("the-deal", "Das Vertriebsabkommen", ["NCSoft und Shengqu Games unterzeichneten das Abkommen am 1. August 2026. Shengqu Games wird den China-Betrieb übernehmen."]),
          section("chinajoy-2026", "ChinaJoy 2026-Präsenz", ["Shengqu Games richtete einen AION 2-Stand auf der ChinaJoy 2026 in Shanghai ein."]),
          section("what-this-means", "Was das bedeutet", ["Für chinesische Spieler erhält AION 2 dedizierte lokale Server mit chinesischer Sprachunterstützung."]),
          section("timeline", "Erwarteter Zeitplan", ["Kein offizielles Veröffentlichungsdatum für China angekündigt. Potenzieller Launch Q2-Q3 2027."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 4, {
        eyebrow: "EDICIÓN EN CHINA",
        title: "AION 2 llega a China: NCSoft firma acuerdo de publicación con Shengqu Games",
        description: "NCSoft ha firmado un acuerdo de publicación con Shengqu Games para llevar AION 2 — conocido como 永恒之塔2 en China — al mercado chino.",
        intro: "El 1 de agosto de 2026, NCSoft anunció una asociación de publicación con Shengqu Games para operar AION 2 en China continental.",
        sourceNote: "Basado en reportajes de AION2Hub y el anuncio oficial de NCSOFT. La fecha de lanzamiento en China no ha sido anunciada.",
        keywords: ["AION 2 China", "AION 2 Shengqu Games", "永恒之塔2", "publicación AION 2 China", "NCSoft acuerdo China"],
        sections: [
          section("the-deal", "El acuerdo de publicación", ["NCSoft y Shengqu Games firmaron el acuerdo el 1 de agosto de 2026. Shengqu Games manejará las operaciones en China continental."]),
          section("chinajoy-2026", "Presencia en ChinaJoy 2026", ["Shengqu Games instaló un stand de AION 2 en ChinaJoy 2026 en Shanghái."]),
          section("what-this-means", "Lo que significa", ["Para los jugadores chinos, AION 2 tendrá servidores locales dedicados con soporte de idioma chino."]),
          section("timeline", "Cronograma esperado", ["No se ha anunciado fecha de lanzamiento oficial para China. Lanzamiento potencial en Q2-Q3 2027."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 4, {
        eyebrow: "中国パブリッシング",
        title: "AION 2 中国上陸：NCSoft が盛趣ゲームとパブリッシング契約",
        description: "NCSoft が盛趣ゲームとパブリッシング契約を締結し、AION 2（永恒之塔2）を中国市場に展開します。",
        intro: "2026年8月1日、NCSoft は中国大陸で AION 2 を運営するため盛趣ゲームとのパブリッシング提携を発表しました。",
        sourceNote: "AION2Hub の報道と NCSOFT の公式発表に基づきます。中国リリース日は未発表です。",
        keywords: ["AION 2 中国", "AION 2 盛趣ゲーム", "永恒之塔2", "AION 2 中国パブリッシング", "NCSoft 中国契約"],
        sections: [
          section("the-deal", "パブリッシング契約", ["NCSoft と盛趣ゲームは2026年8月1日に契約を締結しました。盛趣ゲームが中国大陸の運営を担当します。"]),
          section("chinajoy-2026", "ChinaJoy 2026 出展", ["盛趣ゲームは2026年 ChinaJoy（上海）に AION 2 ブースを設置しました。"]),
          section("what-this-means", "プレイヤーへの影響", ["中国プレイヤーには中国語対応の専用ローカルサーバーが提供されます。"]),
          section("timeline", "予想タイムライン", ["中国リリース日は未発表です。2027年Q2-Q3の可能性があります。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 4, {
        eyebrow: "PUBLICAÇÃO NA CHINA",
        title: "AION 2 chega à China: NCSoft assina contrato de publicação com Shengqu Games",
        description: "NCSoft assinou um contrato de publicação com Shengqu Games para levar AION 2 — conhecido como 永恒之塔2 na China — ao mercado chinês.",
        intro: "Em 1º de agosto de 2026, NCSoft anunciou uma parceria de publicação com Shengqu Games para operar AION 2 na China continental.",
        sourceNote: "Baseado em reportagens da AION2Hub e no anúncio oficial da NCSOFT. A data de lançamento na China não foi anunciada.",
        keywords: ["AION 2 China", "AION 2 Shengqu Games", "永恒之塔2", "publicação AION 2 China", "NCSoft acordo China"],
        sections: [
          section("the-deal", "O contrato de publicação", ["NCSoft e Shengqu Games assinaram o contrato em 1º de agosto de 2026. Shengqu Games lidará as operações na China continental."]),
          section("chinajoy-2026", "Presença na ChinaJoy 2026", ["Shengqu Games montou um estande de AION 2 na ChinaJoy 2026 em Xangai."]),
          section("what-this-means", "O que significa", ["Para jogadores chineses, AION 2 terá servidores locais dedicados com suporte ao idioma chinês."]),
          section("timeline", "Cronograma esperado", ["Nenhuma data de lançamento oficial anunciada para a China. Lançamento potencial em Q2-Q3 2027."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 4, {
        eyebrow: "ИЗДАНИЕ В КИТАЕ",
        title: "AION 2 выходит в Китай: NCSoft подписывает соглашение с Shengqu Games",
        description: "NCSoft подписала издательское соглашение с Shengqu Games для запуска AION 2 — известного как 永恒之塔2 в Китае — на китайском рынке.",
        intro: "1 августа 2026 года NCSoft объявила о партнёрстве с Shengqu Games для управления AION 2 в материковом Китае.",
        sourceNote: "Основано на репортажах AION2Hub и официальном объявлении NCSOFT. Дата запуска в Китае не объявлена.",
        keywords: ["AION 2 Китай", "AION 2 Shengqu Games", "永恒之塔2", "издание AION 2 Китай", "NCSoft сделка Китай"],
        sections: [
          section("the-deal", "Издательское соглашение", ["NCSoft и Shengqu Games подписали соглашение 1 августа 2026 года. Shengqu Games будет управлять операциями в материковом Китае."]),
          section("chinajoy-2026", "Присутствие на ChinaJoy 2026", ["Shengqu Games установила стенд AION 2 на ChinaJoy 2026 в Шанхае."]),
          section("what-this-means", "Что это значит", ["Для китайских игроков AION 2 получит выделенные локальные серверы с поддержкой китайского языка."]),
          section("timeline", "Ожидаемый график", ["Дата запуска в Китае официально не объявлена. Потенциальный запуск в Q2-Q3 2027 года."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 4, {
        eyebrow: "中國發行",
        title: "AION 2 進軍中國：NCSoft 與盛趣遊戲簽署發行協議",
        description: "NCSoft 與盛趣遊戲簽署發行協議，將 AION 2（永恆之塔2）引入中國市場。ChinaJoy 2026 展台已確認。",
        intro: "2026年8月1日，NCSoft 宣佈與盛趣遊戲達成發行合作，在中國大陸營運 AION 2。遊戲將以「永恆之塔2」之名發行。",
        sourceNote: "基於 AION2Hub 報道和 NCSOFT 官方公告。中國上線日期尚未公佈。",
        keywords: ["AION 2 中國", "AION 2 盛趣遊戲", "永恆之塔2", "AION 2 中國發行", "NCSoft 中國合作"],
        sections: [
          section("the-deal", "發行協議", ["NCSoft 與盛趣遊戲於2026年8月1日簽署發行協議。盛趣遊戲將負責中國大陸營運。"]),
          section("chinajoy-2026", "ChinaJoy 2026 展會", ["盛趣遊戲在2026年 ChinaJoy 設立了 AION 2 展台。"]),
          section("what-this-means", "對玩家的意義", ["對中國玩家，AION 2 將獲得專屬本地伺服器，支援中文。"]),
          section("timeline", "預期時間線", ["中國上線尚未公佈官方日期。可能為2027年Q2-Q3。"]),
        ],
      }),
    },
  },

  // ARTICLE 4: Dungeon & Raid Size Changes
  {
    section: "guides",
    slug: "global-launch-dungeon-raid-size-changes",
    schemaType: "TechArticle",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [ncDevStreamSource, mmobombSource, steamSource],
    heroImage: dungeonHero,
    related: [
      { kind: "content", section: "news", slug: "gamescom-2026-ncsoft-showcase-preview" },
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "GROUP CONTENT",
        title: "AION 2 Global Launch Dungeon & Raid Changes: 5-Player Dungeons, 10-Player Raids",
        description: "The August 10 developer stream confirmed major group content changes for the global launch: dungeon parties expand from 4 to 5, first raid from 8 to 10, and battlegrounds standardize at 10v10. Here's the full breakdown.",
        intro: "During the August 10 global developer stream, NCSoft revealed significant changes to group content sizes for the September global launch. These changes address community feedback and aim to make group content more accessible and flexible. Here's everything that changed and what it means for your launch preparation.",
        sourceNote: "Based on the August 10 NCSOFT global developer stream and MMOBomb coverage. Changes apply to the global version launching September 2026.",
        keywords: ["AION 2 dungeon party size", "AION 2 raid size", "AION 2 5-player dungeon", "AION 2 10-player raid", "AION 2 battleground 10v10"],
        sections: [
          section("dungeon-changes", "Dungeon parties: 4 to 5 players", ["The most impactful change is dungeon party expansion from 4 to 5 players. This brings AION 2 in line with modern MMORPG conventions and makes the holy trinity (tank, healer, 3 DPS) the standard composition. The Korea service currently uses 4-player parties, meaning global version dungeon encounters will be rebalanced for the larger group.", "For players, this means more flexibility in party composition. A standard 5-player group can include tank, healer, and three damage dealers — or a hybrid setup with off-healers or off-tanks given the August 12 healing nerf."]),
          section("raid-changes", "First raid: 8 to 10 players", ["The first raid, launching with the global version, will support 10 players instead of 8. This expansion provides more room for role diversity and makes raid composition more forgiving. A typical 10-player raid might include 2 tanks, 2-3 healers, and 5-6 DPS — though the exact composition will depend on encounter design.", "The raid size change also means that guilds and static groups should plan for 10-player rosters. If you're recruiting for launch, aim for at least 12-15 active raiders to account for absences."]),
          section("battleground-changes", "Battlegrounds: 10v10 standardized", ["Battlegrounds have been standardized to 10v10 with stat normalization, meaning all participants have equivalent gear stats regardless of their actual equipment. This puts the focus on teamwork and strategy rather than gear advantage.", "Additionally, battleground matchmaking now supports only solo queue or 5-player premade groups — no partial groups of 2-4. This change, from the August 12 Korea patch, prevents coordinated partial premades from stomping solo players and creates a more balanced PvP environment."]),
          section("server-regions", "Five non-locked server regions", ["NCSoft confirmed five non-locked server regions for the global launch, meaning players can choose any region without being locked by their physical location. This is a significant change from the Korea service which uses region-locked servers.", "Cross-region play implications are still being finalized. The developer stream suggested that latency will still favor nearby servers, but players will have the freedom to play with friends in other regions if they accept the latency tradeoff."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "组队内容",
        title: "AION 2 全球版副本与团本变更：5人副本、10人团本",
        description: "8月10日开发者直播确认全球版组队内容重大变更：副本队伍从4人扩至5人，首次团本从8人扩至10人，战场标准化为10v10。",
        intro: "在8月10日的全球开发者直播中，NCSoft 公布了9月全球版组队内容规模的重大变更。这些变更回应了社区反馈，旨在让组队内容更易上手和灵活。",
        sourceNote: "基于8月10日 NCSOFT 全球开发者直播和 MMOBomb 报道。变更适用于2026年9月上线的全球版。",
        keywords: ["AION 2 副本人数", "AION 2 团本人数", "AION 2 5人副本", "AION 2 10人团本", "AION 2 战场 10v10"],
        sections: [
          section("dungeon-changes", "副本队伍：4人改为5人", ["最具影响力的变更是副本队伍从4人扩至5人。这使 AION 2 与现代MMORPG惯例一致，铁三角（坦克、治疗、3DPS）成为标准配置。韩服目前使用4人队伍，意味着全球版副本将为更大队伍重新平衡。", "对玩家而言，这意味着队伍配置更灵活。标准5人组可包括坦克、治疗和三个输出——考虑到8月12日治疗削弱，也可以使用副坦或副治疗的混合配置。"]),
          section("raid-changes", "首次团本：8人改为10人", ["全球版首发团本将支持10人而非8人。这一扩展提供了更多角色多样性空间，使团本配置更宽容。典型的10人团本可能包括2坦、2-3治疗和5-6输出。", "团本规模变更也意味着公会和固定团应为10人名单做准备。如果你在为首发招募，建议至少准备12-15名活跃团员以应对缺席。"]),
          section("battleground-changes", "战场：标准化10v10", ["战场已标准化为10v10并开启属性归一化，所有参与者无论实际装备都拥有等同属性。这将重点放在团队合作和策略上而非装备优势。", "此外，战场匹配现在只支持单人排队或5人预组——不支持2-4人部分组队。这一来自8月12日韩服补丁的变更防止了有组织的部分预组碾压单人玩家。"]),
          section("server-regions", "五个非锁区服务器区域", ["NCSoft 确认全球版将提供五个非锁区服务器区域，玩家可以自由选择任何区域而不受物理位置锁定。这是与韩服区域锁定服务器的重大区别。", "跨区域游玩的具体细节仍在最终确定中。开发者直播暗示延迟仍会偏向附近服务器，但玩家可以自由选择与其他地区的朋友一起游玩。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "그룹 콘텐츠",
        title: "AION 2 글로벌 출시 던전 & 레이드 변경: 5인 던전, 10인 레이드",
        description: "8월 10일 개발자 스트림에서 글로벌 출시 그룹 콘텐츠 주요 변경을 확인했습니다: 던전 파티 4인→5인, 첫 레이드 8인→10인, 전장 10v10 표준화.",
        intro: "8월 10일 글로벌 개발자 스트림에서 NCSoft는 9월 글로벌 출시를 위한 그룹 콘텐츠 규모의 중요한 변경을 공개했습니다. 이 변경사항은 커뮤니티 피드백에 대응하여 그룹 콘텐츠를 더 접근하기 쉽고 유연하게 만드는 것을 목표로 합니다.",
        sourceNote: "8월 10일 NCSOFT 글로벌 개발자 스트림 및 MMOBomb 보도에 기반합니다. 변경사항은 2026년 9월 출시되는 글로벌 버전에 적용됩니다.",
        keywords: ["AION 2 던전 파티 인원", "AION 2 레이드 인원", "AION 2 5인 던전", "AION 2 10인 레이드", "AION 2 전장 10v10"],
        sections: [
          section("dungeon-changes", "던전 파티: 4인 → 5인", ["가장 영향력 있는 변경은 던전 파티를 4인에서 5인으로 확장하는 것입니다. 이는 AION 2를 현대 MMORPG 관례에 맞추며 홀리 트리니티(탱커, 힐러, 3 딜러)가 표준 구성이 됩니다. 한국 서비스는 현재 4인 파티를 사용하며, 글로벌 버전 던전은 더 큰 그룹에 맞게 리밸런스됩니다.", "플레이어에게는 파티 구성의 유연성이 더 커집니다. 표준 5인 그룹은 탱커, 힐러, 3 딜러를 포함할 수 있으며 8월 12일 힐러 너프를 고려해 하이브리드 설정도 가능합니다."]),
          section("raid-changes", "첫 레이드: 8인 → 10인", ["글로벌 버전과 함께 출시되는 첫 레이드는 8인 대신 10인을 지원합니다. 이 확장은 역할 다양성에 더 많은 공간을 제공하며 레이드 구성을 더 관대하게 만듭니다.", "레이드 규모 변경은 길드와 고정 그룹이 10인 로스터를 계획해야 함을 의미합니다. 출시를 위해 모집 중이라면 결석을 고려해 최소 12-15명의 활동적인 레이더를 목표하세요."]),
          section("battleground-changes", "전장: 10v10 표준화", ["전장은 스탯 정규화와 함께 10v10으로 표준화되어 모든 참가자가 실제 장비에 관계없이 동등한 스탯을 가집니다. 이는 장비 우위가 아닌 팀워크와 전략에 초점을 맞춥니다.", "또한 전장 매치메이킹은 솔로 큐 또는 5인 프리메이드 그룹만 지원합니다. 2-4인 부분 그룹은 불가능합니다."]),
          section("server-regions", "5개 비잠금 서버 지역", ["NCSoft는 글로벌 출시를 위해 5개 비잠금 서버 지역을 확인했습니다. 플레이어는 물리적 위치에 의해 잠기지 않고 모든 지역을 선택할 수 있습니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "CONTENU DE GROUPE",
        title: "Changements de donjon et raid au lancement mondial d'AION 2 : Donjons à 5 joueurs, Raids à 10 joueurs",
        description: "Le stream développeur du 10 août a confirmé des changements majeurs : groupes de donjon de 4 à 5 joueurs, premier raid de 8 à 10, et champs de bataille standardisés à 10v10.",
        intro: "Lors du stream développeur mondial du 10 août, NCSoft a révélé des changements importants dans la taille du contenu de groupe pour le lancement mondial de septembre.",
        sourceNote: "Basé sur le stream développeur NCSOFT du 10 août et la couverture MMOBomb. Les changements s'appliquent à la version mondiale de septembre 2026.",
        keywords: ["taille groupe donjon AION 2", "taille raid AION 2", "AION 2 donjon 5 joueurs", "AION 2 raid 10 joueurs", "AION 2 champ de bataille 10v10"],
        sections: [
          section("dungeon-changes", "Groupes de donjon : 4 à 5 joueurs", ["Le changement le plus marquant est l'expansion des groupes de donjon de 4 à 5 joueurs."]),
          section("raid-changes", "Premier raid : 8 à 10 joueurs", ["Le premier raid supportera 10 joueurs au lieu de 8."]),
          section("battleground-changes", "Champs de bataille : 10v10 standardisé", ["Les champs de bataille sont standardisés à 10v10 avec normalisation des statistiques."]),
          section("server-regions", "Cinq régions de serveurs non verrouillées", ["NCSoft a confirmé cinq régions de serveurs non verrouillées pour le lancement mondial."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "GRUPPENINHALT",
        title: "AION 2 globaler Launch Dungeon- & Raid-Änderungen: 5-Spieler-Dungeons, 10-Spieler-Raids",
        description: "Der Entwickler-Stream vom 10. August bestätigte große Änderungen: Dungeon-Gruppen von 4 auf 5 Spieler, erster Raid von 8 auf 10, Schlachtfelder standardisiert auf 10v10.",
        intro: "Während des globalen Entwickler-Streams am 10. August enthüllte NCSoft bedeutende Änderungen bei den Gruppengrößen für den September-Launch.",
        sourceNote: "Basierend auf dem NCSOFT-Entwickler-Stream vom 10. August und MMOBomb-Berichterstattung. Änderungen gelten für die globale Version ab September 2026.",
        keywords: ["AION 2 Dungeon-Gruppengröße", "AION 2 Raid-Größe", "AION 2 5-Spieler-Dungeon", "AION 2 10-Spieler-Raid", "AION 2 Schlachtfeld 10v10"],
        sections: [
          section("dungeon-changes", "Dungeon-Gruppen: 4 auf 5 Spieler", ["Die wichtigste Änderung ist die Erweiterung der Dungeon-Gruppen von 4 auf 5 Spieler."]),
          section("raid-changes", "Erster Raid: 8 auf 10 Spieler", ["Der erste Raid wird 10 Spieler statt 8 unterstützen."]),
          section("battleground-changes", "Schlachtfelder: 10v10 standardisiert", ["Schlachtfelder wurden auf 10v10 mit Stat-Normalisierung standardisiert."]),
          section("server-regions", "Fünf nicht gesperrte Server-Regionen", ["NCSoft bestätigte fünf nicht gesperrte Server-Regionen für den globalen Launch."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "CONTENIDO DE GRUPO",
        title: "Cambios de mazmorra y raid en el lanzamiento global de AION 2: Mazmorras de 5 jugadores, Raids de 10 jugadores",
        description: "El stream de desarrolladores del 10 de agosto confirmó cambios importantes: grupos de mazmorra de 4 a 5 jugadores, primer raid de 8 a 10, y campos de batalla estandarizados a 10v10.",
        intro: "Durante el stream global de desarrolladores del 10 de agosto, NCSoft reveló cambios significativos en los tamaños de contenido de grupo para el lanzamiento de septiembre.",
        sourceNote: "Basado en el stream de desarrolladores de NCSOFT del 10 de agosto y la cobertura de MMOBomb. Los cambios se aplican a la versión global de septiembre de 2026.",
        keywords: ["tamaño grupo mazmorra AION 2", "tamaño raid AION 2", "AION 2 mazmorra 5 jugadores", "AION 2 raid 10 jugadores", "AION 2 campo de batalla 10v10"],
        sections: [
          section("dungeon-changes", "Grupos de mazmorra: de 4 a 5 jugadores", ["El cambio más impactante es la expansión de grupos de mazmorra de 4 a 5 jugadores."]),
          section("raid-changes", "Primer raid: de 8 a 10 jugadores", ["El primer raid admitirá 10 jugadores en lugar de 8."]),
          section("battleground-changes", "Campos de batalla: 10v10 estandarizados", ["Los campos de batalla se han estandarizado a 10v10 con normalización de estadísticas."]),
          section("server-regions", "Cinco regiones de servidores no bloqueados", ["NCSoft confirmó cinco regiones de servidores no bloqueados para el lanzamiento global."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "グループコンテンツ",
        title: "AION 2 グローバル版ダンジョン＆レイド変更：5人ダンジョン、10人レイド",
        description: "8月10日開発者ストリームでグループコンテンツの主要変更を確認：ダンジョン4人→5人、初レイド8人→10人、戦場10v10標準化。",
        intro: "8月10日のグローバル開発者ストリームで、NCSoft は9月グローバル版に向けたグループコンテンツサイズの重要な変更を公開しました。",
        sourceNote: "8月10日 NCSOFT 開発者ストリームおよび MMOBomb カバレッジに基づきます。変更は2026年9月のグローバル版に適用されます。",
        keywords: ["AION 2 ダンジョン人数", "AION 2 レイド人数", "AION 2 5人ダンジョン", "AION 2 10人レイド", "AION 2 戦場 10v10"],
        sections: [
          section("dungeon-changes", "ダンジョンパーティー：4人→5人", ["最も影響のある変更はダンジョンパーティーを4人から5人に拡張することです。"]),
          section("raid-changes", "初レイド：8人→10人", ["初レイドは8人ではなく10人をサポートします。"]),
          section("battleground-changes", "戦場：10v10標準化", ["戦場はスタット正規化付きで10v10に標準化されました。"]),
          section("server-regions", "5つの非ロックサーバーリージョン", ["NCSoft はグローバル版に5つの非ロックサーバーリージョンを確認しました。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "CONTEÚDO DE GRUPO",
        title: "Mudanças de masmorra e raid no lançamento global do AION 2: Masmorras de 5 jogadores, Raids de 10 jogadores",
        description: "O stream de desenvolvedores de 10 de agosto confirmou grandes mudanças: grupos de masmorra de 4 para 5 jogadores, primeiro raid de 8 para 10, e campos de batalha padronizados em 10v10.",
        intro: "Durante o stream global de desenvolvedores de 10 de agosto, a NCSoft revelou mudanças significativas nos tamanhos de conteúdo de grupo para o lançamento de setembro.",
        sourceNote: "Baseado no stream de desenvolvedores da NCSOFT de 10 de agosto e cobertura da MMOBomb. As mudanças se aplicam à versão global de setembro de 2026.",
        keywords: ["tamanho grupo masmorra AION 2", "tamanho raid AION 2", "AION 2 masmorra 5 jogadores", "AION 2 raid 10 jogadores", "AION 2 campo de batalha 10v10"],
        sections: [
          section("dungeon-changes", "Grupos de masmorra: de 4 para 5 jogadores", ["A mudança mais impactante é a expansão de grupos de masmorra de 4 para 5 jogadores."]),
          section("raid-changes", "Primeiro raid: de 8 para 10 jogadores", ["O primeiro raid suportará 10 jogadores em vez de 8."]),
          section("battleground-changes", "Campos de batalha: 10v10 padronizados", ["Os campos de batalha foram padronizados para 10v10 com normalização de estatísticas."]),
          section("server-regions", "Cinco regiões de servidores não bloqueados", ["A NCSoft confirmou cinco regiões de servidores não bloqueados para o lançamento global."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "ГРУППОВОЙ КОНТЕНТ",
        title: "Изменения подземелий и рейдов при глобальном запуске AION 2: Подземелья на 5 игроков, Рейды на 10",
        description: "Стрим разработчиков 10 августа подтвердил крупные изменения: группы подземелий с 4 до 5 игроков, первый рейд с 8 до 10, поля боя стандартизированы до 10v10.",
        intro: "Во время глобального стрима разработчиков 10 августа NCSoft раскрыла значительные изменения в размерах группового контента для сентябрьского запуска.",
        sourceNote: "Основано на стриме разработчиков NCSOFT от 10 августа и освещении MMOBomb. Изменения применяются к глобальной версии сентября 2026 года.",
        keywords: ["размер группы подземелий AION 2", "размер рейда AION 2", "AION 2 подземелье 5 игроков", "AION 2 рейд 10 игроков", "AION 2 поле боя 10v10"],
        sections: [
          section("dungeon-changes", "Группы подземелий: с 4 до 5 игроков", ["Самое значимое изменение — расширение групп подземелий с 4 до 5 игроков."]),
          section("raid-changes", "Первый рейд: с 8 до 10 игроков", ["Первый рейд будет поддерживать 10 игроков вместо 8."]),
          section("battleground-changes", "Поля боя: 10v10 стандартизированы", ["Поля боя стандартизированы до 10v10 с нормализацией характеристик."]),
          section("server-regions", "Пять регионов серверов без блокировки", ["NCSoft подтвердила пять регионов серверов без блокировки для глобального запуска."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "組隊內容",
        title: "AION 2 全球版副本與團本變更：5人副本、10人團本",
        description: "8月10日開發者直播確認全球版組隊內容重大變更：副本隊伍從4人擴至5人，首次團本從8人擴至10人，戰場標準化為10v10。",
        intro: "在8月10日的全球開發者直播中，NCSoft 公佈了9月全球版組隊內容規模的重大變更。",
        sourceNote: "基於8月10日 NCSOFT 全球開發者直播和 MMOBomb 報道。變更適用於2026年9月上線的全球版。",
        keywords: ["AION 2 副本人數", "AION 2 團本人數", "AION 2 5人副本", "AION 2 10人團本", "AION 2 戰場 10v10"],
        sections: [
          section("dungeon-changes", "副本隊伍：4人改為5人", ["最具影響力的變更是副本隊伍從4人擴至5人。"]),
          section("raid-changes", "首次團本：8人改為10人", ["全球版首發團本將支援10人而非8人。"]),
          section("battleground-changes", "戰場：標準化10v10", ["戰場已標準化為10v10並開啟屬性歸一化。"]),
          section("server-regions", "五個非鎖區伺服器區域", ["NCSoft 確認全球版將提供五個非鎖區伺服器區域。"]),
        ],
      }),
    },
  },

  // ARTICLE 5: Unreal Engine 5 & World Scale
  {
    section: "guides",
    slug: "aion-2-unreal-engine-5-world-scale",
    schemaType: "TechArticle",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [steamSource, ncDevStreamSource, mmobombSource],
    heroImage: engineHero,
    related: [
      { kind: "content", section: "guides", slug: "aion-2-gameplay" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "TECHNOLOGY",
        title: "AION 2 on Unreal Engine 5: World Scale, Graphics, and What It Means for Players",
        description: "AION 2 is built on Unreal Engine 5 with a world 36 times larger than the original AION. Here's what the technology means for visuals, performance, and gameplay.",
        intro: "One of the most ambitious aspects of AION 2 is its technology. NCSoft chose Unreal Engine 5 for the sequel, marking a departure from the proprietary engine used in the original AION. The result is a world 36 times larger than the original game, with modern rendering features including Lumen global illumination and Nanite virtualized geometry. Here's what players need to know about the technology behind AION 2.",
        sourceNote: "Based on Steam store page information, NCSOFT developer stream presentations, and MMOBomb coverage. Technical specifications are subject to change before the September 2026 global launch.",
        keywords: ["AION 2 Unreal Engine 5", "AION 2 world size", "AION 2 graphics", "AION 2 Lumen Nanite", "AION 2 36 times larger"],
        sections: [
          section("engine-choice", "Why Unreal Engine 5?", ["NCSoft's decision to use Unreal Engine 5 for AION 2 is a strategic shift. The original AION used NCSoft's proprietary CryEngine-based engine, which served well for its time but lacked modern features like real-time global illumination and virtualized geometry. UE5 provides these out of the box.", "UE5 also gives NCSoft access to a mature ecosystem of development tools, community plugins, and optimization pipelines. This should result in faster content updates and better long-term maintenance compared to a proprietary engine."]),
          section("world-scale", "36x larger world than original AION", ["NCSoft has stated that AION 2's world is 36 times larger than the original AION. This doesn't simply mean more empty terrain — the world includes multiple continents, distinct biomes, dungeons, and open-world content zones that players can traverse seamlessly.", "The scale has direct gameplay implications: travel between regions requires planning, mounts and fast-travel systems are essential, and exploration is a core activity rather than an afterthought. The interactive map on this site helps you navigate this vast world."]),
          section("graphics", "Lumen, Nanite, and visual quality", ["AION 2 leverages UE5's Lumen global illumination for realistic real-time lighting. This means indoor/outdoor transitions, day/night cycles, and dynamic weather all feature natural lighting changes without baked lightmaps. Nanite virtualized geometry allows for incredibly detailed environments without the performance cost of traditional high-poly meshes.", "The visual result is immediately noticeable: character models, environments, and effects look significantly more detailed than the original AION or competing MMORPGs on older engines. NCSoft's art direction combines realism with stylized character designs reminiscent of AION's signature aesthetic."]),
          section("performance", "Performance and system requirements", ["UE5's advanced features come with hardware demands. NCSoft has confirmed that AION 2 will run on a range of hardware configurations, but players wanting the full visual experience will need a modern GPU. Check our system requirements guide for detailed specs.", "The game supports DLSS and FSR upscaling technologies to help maintain performance on mid-range hardware. NCSoft has also implemented custom optimization for large-scale PvP scenarios, where many players on screen can strain even high-end systems."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "技术",
        title: "AION 2 虚幻引擎5：世界规模、画面及对玩家的意义",
        description: "AION 2 基于虚幻引擎5打造，世界规模为初代 AION 的36倍。以下是技术对画面、性能和玩法的影响。",
        intro: "AION 2 最具野心的方面之一是其技术。NCSoft 为续作选择了虚幻引擎5，标志着与初代 AION 使用的自研引擎的分道扬镳。结果是一个比初代大36倍的世界，具备 Lumen 全局光照和 Nanite 虚拟几何体等现代渲染特性。",
        sourceNote: "基于 Steam 商店页信息、NCSOFT 开发者直播演示和 MMOBomb 报道。技术规格在2026年9月全球版上线前可能变更。",
        keywords: ["AION 2 虚幻引擎5", "AION 2 世界大小", "AION 2 画面", "AION 2 Lumen Nanite", "AION 2 36倍"],
        sections: [
          section("engine-choice", "为什么选择虚幻引擎5？", ["NCSoft 为 AION 2 选择虚幻引擎5是战略性转变。初代 AION 使用 NCSoft 基于 CryEngine 的自研引擎，虽然在其时代表现良好，但缺乏全局光照和虚拟几何体等现代特性。UE5 开箱即提供这些功能。", "UE5 还让 NCSoft 获得成熟的开发工具生态、社区插件和优化管线。相比自研引擎，这应该带来更快的内容更新和更好的长期维护。"]),
          section("world-scale", "比初代 AION 大36倍的世界", ["NCSoft 表示 AION 2 的世界比初代 AION 大36倍。这不只是更多的空地——世界包含多个大陆、不同生物群系、副本和开放世界内容区域，玩家可以无缝穿越。", "规模对玩法有直接影响：区域间移动需要规划，坐骑和快速旅行系统必不可少，探索是核心活动而非附加内容。本站的互动地图可帮助你在广阔世界中导航。"]),
          section("graphics", "Lumen、Nanite 与画面质量", ["AION 2 利用 UE5 的 Lumen 全局光照实现逼真的实时照明。这意味着室内外切换、昼夜循环和动态天气都具有自然的光照变化。Nanite 虚拟几何体允许极其精细的环境而无需传统高多边形网格的性能开销。", "视觉效果立即可见：角色模型、环境和特效比初代 AION 或使用旧引擎的竞品 MMORPG 明显更精细。"]),
          section("performance", "性能与系统要求", ["UE5 的高级特性对硬件有要求。NCSoft 已确认 AION 2 可在多种硬件配置上运行，但想要完整视觉体验的玩家需要现代 GPU。查看我们的系统要求指南了解详细配置。", "游戏支持 DLSS 和 FSR 超分辨率技术帮助中端硬件维持性能。NCSoft 还为大规模 PvP 场景实施了自定义优化。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "기술",
        title: "AION 2 언리얼 엔진 5: 세계 규모, 그래픽, 플레이어에게 미치는 의미",
        description: "AION 2는 언리얼 엔진 5로 제작됐으며, 세계 규모는 초대 AION의 36배입니다. 기술이 그래픽, 성능, 게임플레이에 미치는 영향을 정리합니다.",
        intro: "AION 2의 가장 야심 찬 측면 중 하나는 기술입니다. NCSoft는 속편에 언리얼 엔진 5를 선택했으며, 이는 초대 AION에서 사용된 자체 엔진에서의 전환을 의미합니다. 결과는 초대보다 36배 큰 세계이며 Lumen 글로벌 일루미네이션과 Nanite 가상화 기하학 등 현대적 렌더링 기능을 갖추고 있습니다.",
        sourceNote: "Steam 스토어 페이지 정보, NCSOFT 개발자 스트림 프레젠테이션 및 MMOBomb 보도에 기반합니다. 기술 사양은 2026년 9월 글로벌 출시 전 변경될 수 있습니다.",
        keywords: ["AION 2 언리얼 엔진 5", "AION 2 세계 크기", "AION 2 그래픽", "AION 2 Lumen Nanite", "AION 2 36배"],
        sections: [
          section("engine-choice", "왜 언리얼 엔진 5인가?", ["NCSoft가 AION 2에 언리얼 엔진 5를 선택한 것은 전략적 전환입니다. 초대 AION은 NCSoft의 자체 CryEngine 기반 엔진을 사용했으나 현대적 기능이 부족했습니다. UE5는 이를 기본 제공합니다.", "UE5는 또한 성숙한 개발 도구 생태계, 커뮤니티 플러그인, 최적화 파이프라인에 대한 접근을 제공합니다."]),
          section("world-scale", "초대 AION보다 36배 큰 세계", ["NCSoft는 AION 2의 세계가 초대 AION보다 36배 크다고 밝혔습니다. 이는 단순히 더 많은 빈 지형을 의미하지 않습니다 — 세계에는 여러 대륙, 고유한 바이옴, 던전, 오픈 월드 콘텐츠 영역이 포함됩니다.", "규모는 게임플레이에 직접적인 영향을 미칩니다: 지역 간 이동은 계획이 필요하며, 탈것과 빠른 이동 시스템이 필수입니다."]),
          section("graphics", "Lumen, Nanite 및 시각 품질", ["AION 2는 UE5의 Lumen 글로벌 일루미네이션을 활용해 실시간 조명을 구현합니다. Nanite 가상화 기하학은 전통적인 고폴리곤 메시의 성능 비용 없이 매우 상세한 환경을 가능하게 합니다.", "시각적 결과는 즉시 눈에 띕니다: 캐릭터 모델, 환경, 이펙트가 초대 AION이나 구형 엔진의 경쟁 MMORPG보다 훨씬 더 상세해 보입니다."]),
          section("performance", "성능 및 시스템 요구사항", ["UE5의 고급 기능에는 하드웨어 요구사항이 따릅니다. NCSoft는 AION 2가 다양한 하드웨어 구성에서 실행될 것이라고 확인했습니다. 게임은 DLSS와 FSR 업스케일링을 지원합니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "TECHNOLOGIE",
        title: "AION 2 sur Unreal Engine 5 : Échelle du monde, graphismes et ce que cela signifie",
        description: "AION 2 est construit sur Unreal Engine 5 avec un monde 36 fois plus grand que l'AION original. Voici ce que la technologie signifie pour les visuels, les performances et le gameplay.",
        intro: "L'un des aspects les plus ambitieux d'AION 2 est sa technologie. NCSoft a choisi Unreal Engine 5 pour la suite, marquant une rupture avec le moteur propriétaire de l'AION original.",
        sourceNote: "Basé sur les informations de la page Steam, les présentations du stream développeur NCSOFT et la couverture MMOBomb. Spécifications techniques susceptibles de changer avant le lancement mondial de septembre 2026.",
        keywords: ["AION 2 Unreal Engine 5", "taille du monde AION 2", "graphismes AION 2", "AION 2 Lumen Nanite", "AION 2 36 fois plus grand"],
        sections: [
          section("engine-choice", "Pourquoi Unreal Engine 5 ?", ["Le choix d'UE5 pour AION 2 est un changement stratégique. L'AION original utilisait le moteur propriétaire de NCSoft basé sur CryEngine."]),
          section("world-scale", "Monde 36 fois plus grand que l'AION original", ["NCSoft a déclaré que le monde d'AION 2 est 36 fois plus grand que l'AION original, avec plusieurs continents et biomes distincts."]),
          section("graphics", "Lumen, Nanite et qualité visuelle", ["AION 2 utilise Lumen pour l'illumination globale en temps réel et Nanite pour la géométrie virtualisée."]),
          section("performance", "Performance et configuration requise", ["Les fonctionnalités avancées d'UE5 exigent du matériel. Le jeu supporte DLSS et FSR."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "TECHNOLOGIE",
        title: "AION 2 auf Unreal Engine 5: Weltgröße, Grafik und Bedeutung für Spieler",
        description: "AION 2 basiert auf Unreal Engine 5 mit einer 36-mal größeren Welt als das originale AION. Hier ist, was die Technologie für Grafik, Performance und Gameplay bedeutet.",
        intro: "Einer der ambitioniertesten Aspekte von AION 2 ist seine Technologie. NCSoft wählte Unreal Engine 5 für den Nachfolger.",
        sourceNote: "Basierend auf Steam-Shopseiten-Informationen, NCSOFT-Entwickler-Stream-Präsentationen und MMOBomb-Berichterstattung. Technische Spezifikationen können sich vor dem globalen Launch im September 2026 ändern.",
        keywords: ["AION 2 Unreal Engine 5", "AION 2 Weltgröße", "AION 2 Grafik", "AION 2 Lumen Nanite", "AION 2 36-mal größer"],
        sections: [
          section("engine-choice", "Warum Unreal Engine 5?", ["NCSofts Entscheidung für UE5 ist ein strategischer Wechsel vom proprietären Motor des originalen AION."]),
          section("world-scale", "36x größere Welt als originales AION", ["NCSoft hat erklärt, dass AION 2s Welt 36-mal größer ist als das originale AION."]),
          section("graphics", "Lumen, Nanite und visuelle Qualität", ["AION 2 nutzt Lumen für globale Beleuchtung und Nanite für virtualisierte Geometrie."]),
          section("performance", "Performance und Systemanforderungen", ["UE5-Funktionen stellen Hardware-Anforderungen. Das Spiel unterstützt DLSS und FSR."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "TECNOLOGÍA",
        title: "AION 2 en Unreal Engine 5: Escala del mundo, gráficos y significado para los jugadores",
        description: "AION 2 está construido con Unreal Engine 5 con un mundo 36 veces más grande que el AION original. Esto es lo que la tecnología significa para gráficos, rendimiento y jugabilidad.",
        intro: "Uno de los aspectos más ambiciosos de AION 2 es su tecnología. NCSoft eligió Unreal Engine 5 para la secuela.",
        sourceNote: "Basado en información de la página de Steam, presentaciones del stream de desarrolladores de NCSOFT y cobertura de MMOBomb. Las especificaciones técnicas están sujetas a cambios antes del lanzamiento global de septiembre de 2026.",
        keywords: ["AION 2 Unreal Engine 5", "tamaño del mundo AION 2", "gráficos AION 2", "AION 2 Lumen Nanite", "AION 2 36 veces más grande"],
        sections: [
          section("engine-choice", "¿Por qué Unreal Engine 5?", ["La decisión de usar UE5 para AION 2 es un cambio estratégico respecto al motor propietario del AION original."]),
          section("world-scale", "Mundo 36 veces más grande que el AION original", ["NCSoft ha declarado que el mundo de AION 2 es 36 veces más grande que el AION original."]),
          section("graphics", "Lumen, Nanite y calidad visual", ["AION 2 utiliza Lumen para iluminación global y Nanite para geometría virtualizada."]),
          section("performance", "Rendimiento y requisitos del sistema", ["Las funciones avanzadas de UE5 exigen hardware. El juego es compatible con DLSS y FSR."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "テクノロジー",
        title: "AION 2 Unreal Engine 5：ワールド規模、グラフィック、プレイヤーへの意味",
        description: "AION 2 は Unreal Engine 5 で構築され、世界規模は初代 AION の36倍です。技術がグラフィック、パフォーマンス、ゲームプレイに与える影響を解説します。",
        intro: "AION 2 の最も野心的な側面の一つは技術です。NCSoft は続編に Unreal Engine 5 を選択しました。",
        sourceNote: "Steam ストアページ情報、NCSOFT 開発者ストリームプレゼンテーション、MMOBomb カバレッジに基づきます。技術仕様は2026年9月のグローバルローンチ前に変更される可能性があります。",
        keywords: ["AION 2 Unreal Engine 5", "AION 2 ワールドサイズ", "AION 2 グラフィック", "AION 2 Lumen Nanite", "AION 2 36倍"],
        sections: [
          section("engine-choice", "なぜ Unreal Engine 5 なのか", ["NCSoft が AION 2 に UE5 を選択したのは戦略的転換です。初代 AION は NCSoft の独自エンジンを使用していました。"]),
          section("world-scale", "初代 AION の36倍のワールド", ["NCSoft は AION 2 の世界が初代 AION の36倍だと述べています。"]),
          section("graphics", "Lumen、Nanite、ビジュアル品質", ["AION 2 はリアルタイムグローバルイルミネーションに Lumen を使用し、仮想化ジオメトリに Nanite を使用します。"]),
          section("performance", "パフォーマンスとシステム要件", ["UE5 の高度な機能にはハードウェア要件があります。ゲームは DLSS と FSR をサポートします。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "TECNOLOGIA",
        title: "AION 2 no Unreal Engine 5: Escala do mundo, gráficos e o que significa para os jogadores",
        description: "AION 2 é construído em Unreal Engine 5 com um mundo 36 vezes maior que o AION original. Veja o que a tecnologia significa para visuais, desempenho e jogabilidade.",
        intro: "Um dos aspectos mais ambiciosos do AION 2 é sua tecnologia. A NCSoft escolheu Unreal Engine 5 para a sequência.",
        sourceNote: "Baseado em informações da página da Steam, apresentações do stream de desenvolvedores da NCSOFT e cobertura da MMOBomb. Especificações técnicas estão sujeitas a alterações antes do lançamento global de setembro de 2026.",
        keywords: ["AION 2 Unreal Engine 5", "tamanho do mundo AION 2", "gráficos AION 2", "AION 2 Lumen Nanite", "AION 2 36 vezes maior"],
        sections: [
          section("engine-choice", "Por que Unreal Engine 5?", ["A decisão da NCSoft de usar UE5 para AION 2 é uma mudança estratégica em relação ao motor proprietário do AION original."]),
          section("world-scale", "Mundo 36 vezes maior que o AION original", ["A NCSoft declarou que o mundo de AION 2 é 36 vezes maior que o AION original."]),
          section("graphics", "Lumen, Nanite e qualidade visual", ["AION 2 usa Lumen para iluminação global e Nanite para geometria virtualizada."]),
          section("performance", "Desempenho e requisitos do sistema", ["Os recursos avançados do UE5 exigem hardware. O jogo suporta DLSS e FSR."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "ТЕХНОЛОГИИ",
        title: "AION 2 на Unreal Engine 5: Масштаб мира, графика и значение для игроков",
        description: "AION 2 создан на Unreal Engine 5 с миром в 36 раз больше оригинального AION. Вот что технология означает для графики, производительности и геймплея.",
        intro: "Один из самых амбициозных аспектов AION 2 — его технология. NCSoft выбрала Unreal Engine 5 для продолжения.",
        sourceNote: "Основано на информации страницы Steam, презентациях стрима разработчиков NCSOFT и освещении MMOBomb. Технические характеристики могут измениться до глобального запуска в сентябре 2026 года.",
        keywords: ["AION 2 Unreal Engine 5", "размер мира AION 2", "графика AION 2", "AION 2 Lumen Nanite", "AION 2 в 36 раз больше"],
        sections: [
          section("engine-choice", "Почему Unreal Engine 5?", ["Решение NCSoft использовать UE5 для AION 2 — стратегический сдвиг от проприетарного движка оригинального AION."]),
          section("world-scale", "Мир в 36 раз больше оригинального AION", ["NCSoft заявила, что мир AION 2 в 36 раз больше оригинального AION."]),
          section("graphics", "Lumen, Nanite и визуальное качество", ["AION 2 использует Lumen для глобального освещения и Nanite для виртуализированной геометрии."]),
          section("performance", "Производительность и системные требования", ["Продвинутые функции UE5 требуют оборудования. Игра поддерживает DLSS и FSR."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "技術",
        title: "AION 2 虛幻引擎5：世界規模、畫面及對玩家的意義",
        description: "AION 2 基於虛幻引擎5打造，世界規模為初代 AION 的36倍。以下是技術對畫面、性能和玩法的影響。",
        intro: "AION 2 最具野心的方面之一是其技術。NCSoft 為續作選擇了虛幻引擎5，標誌著與初代 AION 使用的自研引擎的分道揚鑣。",
        sourceNote: "基於 Steam 商店頁資訊、NCSOFT 開發者直播演示和 MMOBomb 報道。技術規格在2026年9月全球版上線前可能變更。",
        keywords: ["AION 2 虛幻引擎5", "AION 2 世界大小", "AION 2 畫面", "AION 2 Lumen Nanite", "AION 2 36倍"],
        sections: [
          section("engine-choice", "為什麼選擇虛幻引擎5？", ["NCSoft 為 AION 2 選擇虛幻引擎5是戰略性轉變。"]),
          section("world-scale", "比初代 AION 大36倍的世界", ["NCSoft 表示 AION 2 的世界比初代 AION 大36倍。"]),
          section("graphics", "Lumen、Nanite 與畫面質量", ["AION 2 利用 UE5 的 Lumen 全局光照實現逼真的實時照明。"]),
          section("performance", "性能與系統要求", ["UE5 的高級特性對硬體有要求。遊戲支援 DLSS 和 FSR 超解析度技術。"]),
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];

export const trendingAugust14GeneratedEditorialEntries = {
  "news/gamescom-2026-ncsoft-showcase-preview": {},
  "guides/post-patch-class-tier-list-august-2026": {},
  "news/aion-2-china-publishing-shengqu-games": {},
  "guides/global-launch-dungeon-raid-size-changes": {},
  "guides/aion-2-unreal-engine-5-world-scale": {},
} as const;
