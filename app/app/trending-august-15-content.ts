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

const mmobombDevStreamUrl = "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream";
const mmobombDevStreamSource: ContentSource = {
  id: "mmobomb-dev-stream-2026-08-15",
  kind: "third-party", publisher: "MMOBomb",
  label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
  url: mmobombDevStreamUrl,
  publishedAt: "2026-08-10",
  retrievedAt: "2026-08-15",
  verifiedAt: "2026-08-15",
  localizations: localizations({
    "zh-hans": "NC 首次全球开发者直播：Aion 2 玩家可期待什么",
    en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
    fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre du lancement lors du premier dev stream mondial",
    de: "NC teilt mit, was Aion 2-Spieler beim Launch vom ersten globalen Dev-Stream erwarten können",
    es: "NC comparte lo que los jugadores de Aion 2 pueden esperar en el lanzamiento en el primer dev stream global",
    ja: "NCが初のグローバル開発者ストリームでAion 2プレイヤーが発売時に期待できることを共有",
    "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar no lançamento no primeiro dev stream global",
    ru: "NC делится тем, что игроки Aion 2 могут ожидать от запуска на первом глобальном стриме разработчиков",
    ko: "NC, 첫 글로벌 개발자 스트림에서 Aion 2 플레이어가 출시 시 기대할 수 있는 것 공유",
    "zh-hant": "NC 首次全球開發者直播：Aion 2 玩家可期待什麼",
  }, mmobombDevStreamUrl),
};

const aion2hubDevStreamUrl = "https://www.aion2hub.com/news/aion-2-founders-packs-30-day-membership";
const aion2hubDevStreamSource: ContentSource = {
  id: "aion2hub-dev-stream-2026-08-15",
  kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Founder's Packs Now Include 30 Days of Membership",
  url: aion2hubDevStreamUrl,
  publishedAt: "2026-08-10",
  retrievedAt: "2026-08-15",
  verifiedAt: "2026-08-15",
  localizations: localizations({
    "zh-hans": "AION 2 创始人包现在包含30天会员资格",
    en: "AION 2 Founder's Packs Now Include 30 Days of Membership",
    fr: "Les packs Fondateur d'AION 2 incluent désormais 30 jours d'adhésion",
    de: "AION 2 Founder's Packs beinhalten jetzt 30 Tage Mitgliedschaft",
    es: "Los Paquetes de Fundador de AION 2 ahora incluyen 30 días de Membresía",
    ja: "AION 2 ファウンダーズパックに30日間のメンバーシップが含まれるように",
    "pt-br": "Os Pacotes de Fundador do AION 2 agora incluem 30 dias de Assinatura",
    ru: "Наборы основателя AION 2 теперь включают 30 дней членства",
    ko: "AION 2 파운더스 팩, 이제 30일 멤버십 포함",
    "zh-hant": "AION 2 創始人包現在包含30天會員資格",
  }, aion2hubDevStreamUrl),
};

const steamUrl = "https://store.steampowered.com/app/3393110/AION_2/";
const steamSource: ContentSource = {
  id: "steam-aion2-store-2026-08-15",
  kind: "third-party", publisher: "Valve / NCSOFT",
  label: "AION 2 — Steam Store Page",
  url: steamUrl,
  publishedAt: "2026-06-05",
  retrievedAt: "2026-08-15",
  verifiedAt: "2026-08-15",
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

const ncOfficialUrl = "https://aion2.plaync.com/en-us/board/notice/view?articleId=devstream-aug2026";
const ncOfficialSource: ContentSource = {
  id: "ncsoft-official-dev-stream-2026-08-15",
  kind: "official", publisher: "NCSOFT",
  label: "AION 2 Global Developer Stream — August 2026",
  url: ncOfficialUrl,
  publishedAt: "2026-08-07",
  retrievedAt: "2026-08-15",
  verifiedAt: "2026-08-15",
  localizations: localizations({
    "zh-hans": "AION 2 全球开发者直播——2026年8月",
    en: "AION 2 Global Developer Stream — August 2026",
    fr: "Diffusion développeur globale AION 2 — Août 2026",
    de: "AION 2 globaler Entwickler-Stream — August 2026",
    es: "Transmisión de desarrollador global de AION 2 — Agosto de 2026",
    ja: "AION 2 グローバル開発者ストリーム — 2026年8月",
    "pt-br": "Transmissão de desenvolvedor global do AION 2 — Agosto de 2026",
    ru: "Глобальная трансляция разработчиков AION 2 — Август 2026",
    ko: "AION 2 글로벌 개발자 스트림 — 2026년 8월",
    "zh-hant": "AION 2 全球開發者直播——2026年8月",
  }, ncOfficialUrl),
};

const ncFoundersUrl = "https://aion2.plaync.com/en-us/board/notice/view?articleId=founders-pack-membership";
const ncFoundersSource: ContentSource = {
  id: "ncsoft-founders-membership-2026-08-15",
  kind: "official", publisher: "NCSOFT",
  label: "AION 2 Founder's Pack Membership Update — Official Notice",
  url: ncFoundersUrl,
  publishedAt: "2026-08-07",
  retrievedAt: "2026-08-15",
  verifiedAt: "2026-08-15",
  localizations: localizations({
    "zh-hans": "AION 2 创始人包会员更新——官方通知",
    en: "AION 2 Founder's Pack Membership Update — Official Notice",
    fr: "Mise à jour de l'adhésion du Pack Fondateur AION 2 — Avis officiel",
    de: "AION 2 Founder's Pack Mitgliedschafts-Update — Offizielle Mitteilung",
    es: "Actualización de Membresía del Paquete de Fundador de AION 2 — Aviso oficial",
    ja: "AION 2 ファウンダーズパック メンバーシップ更新 — 公式通知",
    "pt-br": "Atualização de Assinatura do Pacote de Fundador do AION 2 — Aviso oficial",
    ru: "Обновление членства в наборе основателя AION 2 — Официальное уведомление",
    ko: "AION 2 파운더스 팩 멤버십 업데이트 — 공식 공지",
    "zh-hant": "AION 2 創始人包會員更新——官方通知",
  }, ncFoundersUrl),
};

const mmobombFoundersUrl = "https://www.mmobomb.com/news/aion-2-founder-packs-available-purchase-complete-five-days-of-early-access";
const mmobombFoundersSource: ContentSource = {
  id: "mmobomb-founders-packs-2026-08-15",
  kind: "third-party", publisher: "MMOBomb",
  label: "Aion 2 Founder's Packs Available For Purchase, Complete With Five Days Of Early Access",
  url: mmobombFoundersUrl,
  publishedAt: "2026-07-22",
  retrievedAt: "2026-08-15",
  verifiedAt: "2026-08-15",
  localizations: localizations({
    "zh-hans": "Aion 2 创始人包现已开售，含五天的抢先体验",
    en: "Aion 2 Founder's Packs Available For Purchase, Complete With Five Days Of Early Access",
    fr: "Les packs Fondateur d'Aion 2 sont disponibles à l'achat, avec cinq jours d'accès anticipé",
    de: "Aion 2 Founder's Packs sind käuflich erhältlich, mit fünf Tagen Early Access",
    es: "Los Paquetes de Fundador de Aion 2 están disponibles para su compra, con cinco días de acceso anticipado",
    ja: "Aion 2 ファウンダーズパックが購入可能に、5日間のアーリーアクセス付き",
    "pt-br": "Os Pacotes de Fundador do Aion 2 estão disponíveis para compra, com cinco dias de acesso antecipado",
    ru: "Наборы основателя Aion 2 доступны для покупки с пятью днями раннего доступа",
    ko: "Aion 2 파운더스 팩, 5일 얼리 액세스 포함하여 구매 가능",
    "zh-hant": "Aion 2 創始人包現已開售，含五天的搶先體驗",
  }, mmobombFoundersUrl),
};

/* ------------------------------------------------------------------ */
/* Hero images                                                         */
/* ------------------------------------------------------------------ */

const devStreamHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 全球开发者直播公告图", caption: "NC 官方配图；NCSoft 于8月7日举行了首次全球开发者直播。" },
    en: { alt: "AION 2 Global Developer Stream announcement image", caption: "Official NC artwork; NCSoft held its first global developer stream on August 7." },
    fr: { alt: "Image d'annonce du stream développeur global AION 2", caption: "Visuel officiel NC ; NCSoft a tenu son premier stream développeur mondial le 7 août." },
    de: { alt: "AION 2 Globaler Entwickler-Stream Ankündigungsbild", caption: "Offizielles NC-Artwork; NCSoft hielt seinen ersten globalen Entwickler-Stream am 7. August." },
    es: { alt: "Imagen de anuncio del stream de desarrollador global de AION 2", caption: "Arte oficial de NC; NCSoft realizó su primer stream global de desarrolladores el 7 de agosto." },
    ja: { alt: "AION 2 グローバル開発者ストリーム告知画像", caption: "NC公式アートワーク；NCSoftは8月7日に初のグローバル開発者ストリームを開催しました。" },
    "pt-br": { alt: "Imagem de anúncio do stream de desenvolvedor global do AION 2", caption: "Arte oficial da NC; a NCSoft realizou seu primeiro stream global de desenvolvedores em 7 de agosto." },
    ru: { alt: "Изображение анонса глобального стрима разработчиков AION 2", caption: "Официальный арт NC; NCSoft провела первый глобальный стрим разработчиков 7 августа." },
    ko: { alt: "AION 2 글로벌 개발자 스트림 공지 이미지", caption: "NC 공식 이미지입니다. NCSoft가 8월 7일 첫 글로벌 개발자 스트림을 진행했습니다." },
    "zh-hant": { alt: "AION 2 全球開發者直播公告圖", caption: "NC 官方配圖；NCSoft 於8月7日舉行了首次全球開發者直播。" },
  },
};

const foundersPackHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 创始人包宣传图", caption: "NC 官方配图；所有创始人包现在包含30天会员资格。" },
    en: { alt: "AION 2 Founder's Pack promotional image", caption: "Official NC artwork; all Founder's Packs now include 30 days of Membership." },
    fr: { alt: "Image promotionnelle du Pack Fondateur AION 2", caption: "Visuel officiel NC ; tous les packs Fondateur incluent désormais 30 jours d'adhésion." },
    de: { alt: "AION 2 Founder's Pack Werbebild", caption: "Offizielles NC-Artwork; alle Founder's Packs enthalten jetzt 30 Tage Mitgliedschaft." },
    es: { alt: "Imagen promocional del Paquete de Fundador de AION 2", caption: "Arte oficial de NC; todos los Paquetes de Fundador ahora incluyen 30 días de Membresía." },
    ja: { alt: "AION 2 ファウンダーズパック宣伝画像", caption: "NC公式アートワーク；すべてのファウンダーズパックに30日間のメンバーシップが含まれます。" },
    "pt-br": { alt: "Imagem promocional do Pacote de Fundador do AION 2", caption: "Arte oficial da NC; todos os Pacotes de Fundador agora incluem 30 dias de Assinatura." },
    ru: { alt: "Рекламное изображение набора основателя AION 2", caption: "Официальный арт NC; все наборы основателя теперь включают 30 дней членства." },
    ko: { alt: "AION 2 파운더스 팩 프로모션 이미지", caption: "NC 공식 이미지입니다. 모든 파운더스 팩에 이제 30일 멤버십이 포함됩니다." },
    "zh-hant": { alt: "AION 2 創始人包宣傳圖", caption: "NC 官方配圖；所有創始人包現在包含30天會員資格。" },
  },
};

const serverRegionsHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 全球服务器区域图", caption: "NC 官方配图；AION 2 将在全球设置5个服务器区域，无区域锁定。" },
    en: { alt: "AION 2 global server regions map", caption: "Official NC artwork; AION 2 will launch with 5 server regions with no region locking." },
    fr: { alt: "Carte des régions de serveurs mondiaux AION 2", caption: "Visuel officiel NC ; AION 2 sera lancé avec 5 régions de serveurs sans verrouillage régional." },
    de: { alt: "AION 2 globale Serverregionen-Karte", caption: "Offizielles NC-Artwork; AION 2 startet mit 5 Serverregionen ohne Regionssperre." },
    es: { alt: "Mapa de regiones de servidores globales de AION 2", caption: "Arte oficial de NC; AION 2 se lanzará con 5 regiones de servidores sin bloqueo regional." },
    ja: { alt: "AION 2 グローバルサーバーリージョンマップ", caption: "NC公式アートワーク；AION 2 は5つのサーバーリージョンでリージョンロックなしでローンチします。" },
    "pt-br": { alt: "Mapa de regiões de servidores globais do AION 2", caption: "Arte oficial da NC; AION 2 será lançado com 5 regiões de servidores sem bloqueio regional." },
    ru: { alt: "Карта глобальных серверных регионов AION 2", caption: "Официальный арт NC; AION 2 запустится с 5 серверными регионами без региональной блокировки." },
    ko: { alt: "AION 2 글로벌 서버 지역 지도", caption: "NC 공식 이미지입니다. AION 2는 지역 잠금 없이 5개의 서버 지역으로 출시됩니다." },
    "zh-hant": { alt: "AION 2 全球伺服器區域圖", caption: "NC 官方配圖；AION 2 將在全球設置5個伺服器區域，無區域鎖定。" },
  },
};

const pvpHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 PvP 战场截图", caption: "NC 官方配图；AION 2 上线时将包含10v10标准化战场和深渊开放世界PvP。" },
    en: { alt: "AION 2 PvP battlegrounds screenshot", caption: "Official NC artwork; AION 2 will feature 10v10 stat-normalized battlegrounds and Abyss open-world PvP at launch." },
    fr: { alt: "Capture d'écran des champs de bataille PvP d'AION 2", caption: "Visuel officiel NC ; AION 2 proposera des champs de bataille 10v10 à statistiques normalisées et du PvP monde ouvert dans l'Abîme." },
    de: { alt: "AION 2 PvP-Schlachtfeld-Screenshot", caption: "Offizielles NC-Artwork; AION 2 wird 10v10-stat-normalisierte Schlachtfelder und Abyss-Open-World-PvP bieten." },
    es: { alt: "Captura de pantalla de campos de batalla PvP de AION 2", caption: "Arte oficial de NC; AION 2 contará con campos de batalla 10v10 con estadísticas normalizadas y PvP de mundo abierto en el Abismo." },
    ja: { alt: "AION 2 PvP バトルグラウンドスクリーンショット", caption: "NC公式アートワーク；AION 2 は10v10ステータス標準化バトルグラウンドとアビスオープンワールドPvPを提供します。" },
    "pt-br": { alt: "Captura de tela dos campos de batalha PvP de AION 2", caption: "Arte oficial da NC; AION 2 contará com campos de batalha 10v10 com estatísticas normalizadas e PvP de mundo aberto no Abismo." },
    ru: { alt: "Скриншот PvP-полей сражений AION 2", caption: "Официальный арт NC; AION 2 будет включать поля сражений 10v10 с нормализованными характеристиками и открытый мир PvP в Бездне." },
    ko: { alt: "AION 2 PvP 전장 스크린샷", caption: "NC 공식 이미지입니다. AION 2는 출시 시 10v10 스탯 균등화 전장과 심연 오픈월드 PvP를 제공합니다." },
    "zh-hant": { alt: "AION 2 PvP 戰場截圖", caption: "NC 官方配圖；AION 2 上線時將包含10v10標準化戰場和深淵開放世界PvP。" },
  },
};

const classesHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 八大职业展示", caption: "NC 官方配图；AION 2 上线时将提供8个职业，涵盖传统的坦克/输出/治疗三角体系。" },
    en: { alt: "AION 2 eight classes showcase", caption: "Official NC artwork; AION 2 will launch with 8 classes spanning the traditional Tank/DPS/Healer trinity." },
    fr: { alt: "Présentation des huit classes d'AION 2", caption: "Visuel officiel NC ; AION 2 sera lancé avec 8 classes couvrant la trinité Tank/DPS/Soigneur." },
    de: { alt: "AION 2 acht Klassen-Showcase", caption: "Offizielles NC-Artwork; AION 2 startet mit 8 Klassen, die die traditionelle Tank/DPS/Heiler-Trinität abdecken." },
    es: { alt: "Presentación de las ocho clases de AION 2", caption: "Arte oficial de NC; AION 2 se lanzará con 8 clases que abarcan la trinidad Tanque/DPS/Curandero." },
    ja: { alt: "AION 2 8つのクラス紹介", caption: "NC公式アートワーク；AION 2 は伝統的なタンク/DPS/ヒーラーの三位一体をカバーする8つのクラスでローンチします。" },
    "pt-br": { alt: "Apresentação das oito classes de AION 2", caption: "Arte oficial da NC; AION 2 será lançado com 8 classes abrangendo a trindade Tank/DPS/Healer." },
    ru: { alt: "Демонстрация восьми классов AION 2", caption: "Официальный арт NC; AION 2 запустится с 8 классами, охватывающими традиционную триаду Танк/ДПС/Хилер." },
    ko: { alt: "AION 2 8개 클래스 쇼케이스", caption: "NC 공식 이미지입니다. AION 2는 출시 시 전통적인 탱크/DPS/힐러 삼위일체를 아우르는 8개 클래스를 제공합니다." },
    "zh-hant": { alt: "AION 2 八大職業展示", caption: "NC 官方配圖；AION 2 上線時將提供8個職業，涵蓋傳統的坦克/輸出/治療三角體系。" },
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

export const trendingAugust15ContentEntries = [
  // ARTICLE 1: Global Dev Stream Recap
  {
    section: "news",
    slug: "aion-2-first-global-dev-stream-recap",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [mmobombDevStreamSource, aion2hubDevStreamSource, ncOfficialSource],
    heroImage: devStreamHero,
    related: [
      { kind: "content", section: "news", slug: "aion-2-founders-packs-30-day-membership" },
      { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
      { kind: "content", section: "guides", slug: "aion-2-global-server-regions-guide" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 6, {
        eyebrow: "DEVELOPER STREAM",
        title: "AION 2 First Global Dev Stream: Everything NCSoft Revealed About Launch",
        description: "NCSoft's 'Beyond the Abyss' livestream on August 7 revealed 200+ customization options, 8 classes, 5 global server regions, party size increases, and 30-day membership in Founder's Packs. Here's the full recap.",
        intro: "On August 7, 2026, NCSoft hosted its first-ever global developer stream for AION 2, titled 'Beyond the Abyss.' The livestream delivered a wealth of new information about what players can expect at launch, covering everything from character customization and pet systems to PvP, server regions, and significant changes to Founder's Packs. Here's a complete breakdown of everything announced.",
        sourceNote: "Based on the August 7 'Beyond the Abyss' developer stream, MMOBomb coverage published August 10, and AION2Hub reporting. All details confirmed by NCSOFT's official notice board.",
        keywords: ["AION 2 dev stream", "AION 2 Beyond the Abyss", "AION 2 customization", "AION 2 pets", "AION 2 global launch details"],
        sections: [
          section("customization", "Character Customization & Cosmetics", ["NCSoft confirmed over 200 customization options at launch, giving players an unprecedented level of control over their character's appearance. With four character slots available, players can experiment with multiple looks and classes without committing to a single identity.", "All gear is visually customizable, and wings — which carry their own stats — can be transmogrified (glamoured) to match any other wings the player has collected. Wing skins purchased from the cash shop provide zero stats, ensuring cosmetic purchases remain purely visual."]),
          section("pet-and-mount", "Pet & Mount System", ["The pet and mount system is one of the most anticipated features. At launch, over 200 pets and mounts will be available, many of which function as both a pet and a mount simultaneously. The farming requirement has been relaxed: players can begin collecting pets at level 3 instead of the previously announced level 5.", "Pets serve more than cosmetic purposes — they can auto-loot items for their owner, significantly streamlining the grinding experience. The wide variety of pets ensures that players will have many options to find companions that suit their playstyle and aesthetic preferences."]),
          section("classes-and-content", "Classes, Dungeons & Raids", ["Eight classes are available at launch within the traditional Tank/DPS/Healer trinity. Two tanks (Gladiator and Templar), four DPS (Assassin, Ranger, Sorcerer, Spirit Master), and two healers (Cleric and Chanter) provide a balanced roster.", "Party sizes have been increased: Expeditions (dungeons) now support 5 players instead of 4, and Sanctuary (raids) now support 10 players instead of 8. Expeditions feature two modes — Exploration with Shugo guidance, and Conquest for self-directed challenge. Sanctuary begins by splitting the party into two groups of five, each facing different mini-bosses before reuniting for the final encounter."]),
          section("pvp-and-servers", "PvP & Server Regions", ["A 10v10 Battlegrounds mode with stat normalization will be available at launch, ensuring that gear disparities don't determine match outcomes. The Abyss remains an open-world PvP zone where players enter at their own risk, with quests and objectives available inside. A PvP toggle flag is available everywhere except the Abyss.", "Five global server regions were confirmed: NA West, NA East, South America, Central Europe, and Japan. Crucially, there is no region locking — players from anywhere in the world can join any server, making it possible to play with friends regardless of location."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 6, {
        eyebrow: "开发者直播",
        title: "AION 2 首次全球开发者直播：NCSoft 公布的上线前全部信息",
        description: "NCSoft 在8月7日的「Beyond the Abyss」直播中透露了超过200种自定义选项、8个职业、5个全球服务器区域、队伍规模扩大以及创始人包中的30天会员资格。以下是完整回顾。",
        intro: "2026年8月7日，NCSoft 举办了首次全球开发者直播「Beyond the Abyss」。直播公布了大量关于游戏上线时玩家可期待的新信息，涵盖角色自定义、宠物系统、PvP、服务器区域以及创始人包的重大变更。以下是所有公布内容的完整概览。",
        sourceNote: "基于8月7日「Beyond the Abyss」开发者直播、MMOBomb 8月10日报道和 AION2Hub 的报道。所有细节经 NCSOFT 官方公告确认。",
        keywords: ["AION 2 开发者直播", "AION 2 Beyond the Abyss", "AION 2 自定义", "AION 2 宠物", "AION 2 全球上线详情"],
        sections: [
          section("customization", "角色自定义与外观", ["NCSoft 确认上线时提供超过200种自定义选项，让玩家对角色的外观拥有前所未有的控制力。四个角色栏位让玩家可以尝试多种外观和职业，无需绑定单一身份。", "所有装备均可自定义外观，翅膀——本身带有属性——可以进行幻化，匹配玩家已收集的任何其他翅膀。商城购买的翅膀皮肤不提供任何属性，确保外观购买保持纯粹的视觉性质。"]),
          section("pet-and-mount", "宠物与坐骑系统", ["宠物和坐骑系统是最受期待的功能之一。上线时将提供超过200种宠物和坐骑，其中许多同时兼具宠物和坐骑功能。收集要求已放宽：玩家可以在3级而不是之前公布的5级就开始收集宠物。", "宠物不仅提供外观功能——它们可以为所有者自动拾取物品，大幅简化刷怪体验。丰富的宠物种类确保玩家有充足的选择来找到符合自己玩法和审美的伙伴。"]),
          section("classes-and-content", "职业、副本与团本", ["上线时提供8个职业，涵盖传统坦克/输出/治疗三角体系。两个坦克（角斗士和圣殿骑士）、四个输出（刺客、游侠、术士、精灵使）和两个治疗（牧师和吟游星）提供了均衡的职业阵容。", "队伍规模已扩大：远征队（副本）现支持5人而非4人，圣殿（团本）现支持10人而非8人。远征队有两种模式——探索模式（有Shugo指引）和征服模式（自我挑战）。圣殿开始时将队伍分成两个5人小组，各自面对不同的小BOSS，然后再汇合进行最终战斗。"]),
          section("pvp-and-servers", "PvP 与服务器区域", ["上线时将提供10v10战场模式，属性标准化，确保装备差距不会决定比赛结果。深渊是开放世界PvP区域，玩家自行承担进入风险，内部有任务和目标。除深渊外，所有区域均可使用PvP开关标记。", "确认了五个全球服务器区域：北美西、北美东、南美、中欧和日本。关键是，没有区域锁定——世界各地的玩家都可以加入任何服务器，让玩家无论身在何处都可以与朋友一起游戏。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 6, {
        eyebrow: "개발자 스트림",
        title: "AION 2 첫 글로벌 개발자 스트림: NCSoft가 출시에 대해 공개한 모든 것",
        description: "NCSoft의 8월 7일 'Beyond the Abyss' 라이브스트림에서 200개 이상의 커스터마이징 옵션, 8개 클래스, 5개 글로벌 서버 지역, 파티 규모 확대, 파운더스 팩 30일 멤버십을 공개했습니다. 전체 요약입니다.",
        intro: "2026년 8월 7일, NCSoft는 AION 2의 첫 글로벌 개발자 스트림 'Beyond the Abyss'를 개최했습니다. 라이브스트림은 캐릭터 커스터마이징과 펫 시스템부터 PvP, 서버 지역, 파운더스 팩의 주요 변경사항까지 출시 시 플레이어가 기대할 수 있는 풍부한 정보를 제공했습니다. 발표된 모든 내용의 완전한 분석입니다.",
        sourceNote: "8월 7일 'Beyond the Abyss' 개발자 스트림, MMOBomb 8월 10일 보도 및 AION2Hub 보도에 기반합니다. 모든 세부 사항은 NCSOFT 공식 게시판을 통해 확인되었습니다.",
        keywords: ["AION 2 개발자 스트림", "AION 2 Beyond the Abyss", "AION 2 커스터마이징", "AION 2 펫", "AION 2 글로벌 출시 세부사항"],
        sections: [
          section("customization", "캐릭터 커스터마이징 및 코스메틱", ["NCSoft는 출시 시 200개 이상의 커스터마이징 옵션을 확인했으며, 플레이어에게 캐릭터 외형에 대한 전례 없는 수준의 제어권을 제공합니다. 4개의 캐릭터 슬롯을 통해 플레이어는 단일 정체성에 얽매이지 않고 여러 외형과 클래스를 시험해볼 수 있습니다.", "모든 장비는 시각적으로 커스터마이징 가능하며, 자체 스탯이 있는 날개는 플레이어가 수집한 다른 날개로 트랜스모그리파이(글래머)할 수 있습니다. 캐시샵에서 구매한 날개 스킨은 스탯을 제공하지 않아 코스메틱 구매가 순수하게 시각적임을 보장합니다."]),
          section("pet-and-mount", "펫 및 탈것 시스템", ["펫과 탈것 시스템은 가장 기대되는 기능 중 하나입니다. 출시 시 200개 이상의 펫과 탈것을 이용할 수 있으며, 많은 것이 펫과 탈것으로 동시에 기능합니다. 파밍 요구사항이 완화되어 플레이어는 이전에 발표된 레벨 5 대신 레벨 3부터 펫을 수집할 수 있습니다.", "펫은 단순한 코스메틱 이상의 기능을 제공합니다. 소유자를 위해 자동 루팅을 수행하여 파밍 경험을 크게 간소화합니다. 다양한 펫 종류는 플레이어가 자신의 플레이스타일과 미적 선호도에 맞는 동반자를 찾을 수 있는 충분한 선택지를 제공합니다."]),
          section("classes-and-content", "클래스, 던전 및 레이드", ["출시 시 전통적인 탱크/DPS/힐러 삼위일체 내에서 8개 클래스를 이용할 수 있습니다. 두 탱크(글래디에이터와 템플러), 네 DPS(어쌔신, 레인저, 소서러, 스피릿 마스터), 두 힐러(클레릭과 챈터)가 균형 잡힌 로스터를 제공합니다.", "파티 규모가 확대되었습니다: 원정대(던전)는 4명 대신 5명을, 성역(레이드)은 8명 대신 10명을 지원합니다. 원정대는 Shugo 안내가 있는 탐험 모드와 자기 주도형 도전인 정복 모드의 두 가지 모드를 제공합니다. 성역은 파티를 5명씩 두 그룹으로 나누어 각각 다른 미니 보스를 상대한 후 최종 보스를 위해 재합류합니다."]),
          section("pvp-and-servers", "PvP 및 서버 지역", ["출시 시 스탯 균등화가 적용된 10v10 전장 모드가 제공되어 장비 격차가 매치 결과를 결정하지 않도록 합니다. 심연은 플레이어가 자신의 책임 하에 입장하는 오픈월드 PvP 존으로, 내부에 퀘스트와 목표가 있습니다. 심연을 제외한 모든 곳에서 PvP 토글 플래그를 사용할 수 있습니다.", "5개의 글로벌 서버 지역이 확인되었습니다: NA West, NA East, 남미, 중앙유럽, 일본. 중요한 점은 지역 잠금이 없다는 것입니다. 전 세계 플레이어가 모든 서버에 참여할 수 있어 위치에 관계없이 친구들과 함께 플레이할 수 있습니다."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 6, {
        eyebrow: "開発者ストリーム",
        title: "AION 2 初のグローバル開発者ストリーム：NCSoft が公開したローンチ情報のすべて",
        description: "NCSoft の8月7日「Beyond the Abyss」ライブストリームで、200以上のカスタマイズオプション、8つのクラス、5つのグローバルサーバーリージョン、パーティーサイズ拡大、ファウンダーズパック30日間メンバーシップが明らかに。完全レキャップ。",
        intro: "2026年8月7日、NCSoft は AION 2 の初のグローバル開発者ストリーム「Beyond the Abyss」を開催しました。ライブストリームでは、キャラクターカスタマイズやペットシステムからPvP、サーバーリージョン、ファウンダーズパックの大幅な変更まで、ローンチ時にプレイヤーが期待できる豊富な新情報が提供されました。発表されたすべての内容の完全な分析です。",
        sourceNote: "8月7日の「Beyond the Abyss」開発者ストリーム、MMOBomb 8月10日報道、AION2Hub 報道に基づきます。すべての詳細は NCSOFT 公式掲示板で確認済みです。",
        keywords: ["AION 2 開発者ストリーム", "AION 2 Beyond the Abyss", "AION 2 カスタマイズ", "AION 2 ペット", "AION 2 グローバルローンチ詳細"],
        sections: [
          section("customization", "キャラクターカスタマイズとコスメティック", ["NCSoft は200以上のカスタマイズオプションを確認し、プレイヤーにキャラクターの外観に対する前例のないレベルのコントロールを提供します。4つのキャラクタースロットにより、プレイヤーは単一のアイデンティティに縛られることなく、複数の外観とクラスを試すことができます。", "すべてのギアは視覚的にカスタマイズ可能で、独自のステータスを持つ翼は、プレイヤーが収集した他の翼にトランスモグ（グラマー）できます。キャッシュショップから購入したウィングスキンはステータスを提供せず、コスメティック購入が純粋に視覚的であることを保証します。"]),
          section("pet-and-mount", "ペット＆マウントシステム", ["ペットとマウントシステムは最も期待されている機能の一つです。ローンチ時には200以上のペットとマウントが利用可能で、多くはペットとマウントの両方として同時に機能します。収集要件は緩和され、プレイヤーは以前発表されたレベル5ではなく、レベル3からペットを収集できます。", "ペットは単なるコスメティック以上の役割を果たします。所有者のために自動ルートを行い、ファーミング体験を大幅に効率化します。多種多様なペットにより、プレイヤーは自分のプレイスタイルと美的嗜好に合ったコンパニオンを見つける十分な選択肢を得られます。"]),
          section("classes-and-content", "クラス、ダンジョン、レイド", ["ローンチ時には伝統的なタンク/DPS/ヒーラーの三位一体の中で8つのクラスが利用可能です。2つのタンク（グラディエーターとテンプラー）、4つのDPS（アサシン、レンジャー、ソーサラー、スピリットマスター）、2つのヒーラー（クレリックとチャンター）がバランスの取れたロスターを提供します。", "パーティーサイズが拡大されました：遠征隊（ダンジョン）は4人から5人に、聖域（レイド）は8人から10人に。遠征隊には2つのモードがあります。Shugoのガイダンスがある探索モードと、自己主導型の挑戦である征服モードです。聖域では最初にパーティーを5人ずつの2グループに分け、それぞれが異なるミニボスと戦った後、最終ボスのために合流します。"]),
          section("pvp-and-servers", "PvP とサーバーリージョン", ["ローンチ時にはステータス均等化された10v10バトルグラウンドモードが提供され、ギアの差が試合結果を決しないようにします。アビスは自己責任で入場するオープンワールドPvPゾーンで、内部にクエストと目標があります。アビスを除くすべての場所でPvPトグルフラグが利用可能です。", "5つのグローバルサーバーリージョンが確認されました：NA West、NA East、南米、中央ヨーロッパ、日本。重要なのは、リージョンロックがないことです。世界中のプレイヤーが任意のサーバーに参加でき、場所に関係なく友達とプレイできます。"]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 6, {
        eyebrow: "STREAM DÉVELOPPEUR",
        title: "AION 2 Premier Dev Stream Global : Tout ce que NCSoft a révélé sur le lancement",
        description: "Le livestream 'Beyond the Abyss' de NCSoft du 7 août a révélé plus de 200 options de personnalisation, 8 classes, 5 régions de serveurs mondiaux, des augmentations de taille de groupe et 30 jours d'adhésion dans les packs Fondateur. Le récapitulatif complet.",
        intro: "Le 7 août 2026, NCSoft a organisé son tout premier stream développeur mondial pour AION 2, intitulé 'Beyond the Abyss.' Le livestream a livré une mine d'informations sur ce que les joueurs peuvent attendre du lancement. Voici un aperçu complet de tout ce qui a été annoncé.",
        sourceNote: "Basé sur le stream développeur 'Beyond the Abyss' du 7 août, la couverture MMOBomb publiée le 10 août et les reportages d'AION2Hub. Tous les détails confirmés par le tableau d'affichage officiel de NCSOFT.",
        keywords: ["AION 2 stream développeur", "AION 2 Beyond the Abyss", "AION 2 personnalisation", "AION 2 animaux", "AION 2 détails lancement global"],
        sections: [
          section("customization", "Personnalisation du personnage", ["NCSoft a confirmé plus de 200 options de personnalisation au lancement. Avec quatre emplacements de personnage, les joueurs peuvent expérimenter plusieurs looks et classes.", "Tous les équipements sont visuellement personnalisables, et les ailes peuvent être glamourisées pour correspondre à toutes les autres ailes collectées. Les skins d'ailes du shop cosmétique ne fournissent aucun attribut."]),
          section("pet-and-mount", "Système d'animaux et de montures", ["Plus de 200 animaux et montures seront disponibles au lancement, dont beaucoup fonctionnent à la fois comme animal et monture. Les joueurs peuvent commencer à collectionner dès le niveau 3.", "Les animaux peuvent auto-ramasser les objets pour leur propriétaire, simplifiant considérablement l'expérience de farming."]),
          section("classes-and-content", "Classes, donjons et raids", ["Huit classes sont disponibles dans la trinité Tank/DPS/Soigneur. Deux tanks, quatre DPS et deux soigneurs offrent un roster équilibré.", "Les tailles de groupe ont été augmentées : les expéditions (donjons) passent de 4 à 5 joueurs, et le Sanctuaire (raids) de 8 à 10. Les expéditions proposent deux modes : Exploration et Conquête."]),
          section("pvp-and-servers", "PvP et régions de serveurs", ["Un mode champs de bataille 10v10 avec normalisation des statistiques sera disponible au lancement. L'Abîme reste une zone PvP monde ouvert.", "Cinq régions de serveurs mondiaux ont été confirmées : NA West, NA East, Amérique du Sud, Europe centrale et Japon. Aucun verrouillage régional."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 6, {
        eyebrow: "ENTWICKLER-STREAM",
        title: "AION 2 Erster globaler Dev-Stream: Alles, was NCSoft über den Launch verriet",
        description: "NCSofts 'Beyond the Abyss'-Livestream am 7. August enthüllte über 200 Anpassungsoptionen, 8 Klassen, 5 globale Serverregionen, Partyvergrößerungen und 30 Tage Mitgliedschaft in Founder's Packs. Die vollständige Zusammenfassung.",
        intro: "Am 7. August 2026 veranstaltete NCSoft seinen ersten globalen Entwickler-Stream für AION 2 mit dem Titel 'Beyond the Abyss'. Der Livestream lieferte eine Fülle neuer Informationen darüber, was Spieler beim Launch erwartet. Hier ist eine vollständige Aufschlüsselung aller Ankündigungen.",
        sourceNote: "Basierend auf dem 'Beyond the Abyss'-Entwickler-Stream vom 7. August, MMOBomb-Berichterstattung vom 10. August und AION2Hub-Reportagen. Alle Details durch NCSOFTs offizielles Anschlagbrett bestätigt.",
        keywords: ["AION 2 Entwickler-Stream", "AION 2 Beyond the Abyss", "AION 2 Anpassung", "AION 2 Haustiere", "AION 2 globale Launch-Details"],
        sections: [
          section("customization", "Charakteranpassung", ["NCSoft bestätigte über 200 Anpassungsoptionen beim Launch. Mit vier Charakterplätzen können Spieler mehrere Looks und Klassen ausprobieren.", "Alle Ausrüstung ist visuell anpassbar, und Flügel können transmogrifiziert werden. Flügelskins aus dem Cash-Shop bieten keine Stats."]),
          section("pet-and-mount", "Haustier- und Reittiersystem", ["Über 200 Haustiere und Reittiere werden beim Launch verfügbar sein. Spieler können ab Stufe 3 mit dem Sammeln beginnen.", "Haustiere können automatisch Gegenstände für ihren Besitzer aufsammeln und so das Farmen erheblich vereinfachen."]),
          section("classes-and-content", "Klassen, Dungeons und Raids", ["Acht Klassen sind in der traditionellen Tank/DPS/Heiler-Trinität verfügbar. Zwei Tanks, vier DPS und zwei Heiler bieten ein ausgewogenes Aufgebot.", "Parteigrößen wurden erhöht: Expeditionen (Dungeons) unterstützen 5 statt 4 Spieler, Heiligtum (Raids) 10 statt 8."]),
          section("pvp-and-servers", "PvP und Serverregionen", ["Ein 10v10-Schlachtfeldmodus mit Statusnormalisierung wird beim Launch verfügbar sein. Der Abgrund bleibt eine Open-World-PvP-Zone.", "Fünf globale Serverregionen wurden bestätigt: NA West, NA East, Südamerika, Zentraleuropa und Japan. Keine Regionssperre."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 6, {
        eyebrow: "STREAM DE DESARROLLADOR",
        title: "AION 2 Primer Dev Stream Global: Todo lo que NCSoft reveló sobre el lanzamiento",
        description: "El livestream 'Beyond the Abyss' de NCSoft del 7 de agosto reveló más de 200 opciones de personalización, 8 clases, 5 regiones de servidores globales, aumentos de tamaño de grupo y 30 días de membresía en los Paquetes de Fundador. El resumen completo.",
        intro: "El 7 de agosto de 2026, NCSoft organizó su primer stream de desarrollador global para AION 2, titulado 'Beyond the Abyss'. La transmisión en vivo entregó una gran cantidad de información nueva. Aquí hay un desglose completo de todo lo anunciado.",
        sourceNote: "Basado en el stream de desarrollador 'Beyond the Abyss' del 7 de agosto, la cobertura de MMOBomb publicada el 10 de agosto y los informes de AION2Hub. Todos los detalles confirmados por el tablón de anuncios oficial de NCSOFT.",
        keywords: ["AION 2 stream de desarrollador", "AION 2 Beyond the Abyss", "AION 2 personalización", "AION 2 mascotas", "AION 2 detalles de lanzamiento global"],
        sections: [
          section("customization", "Personalización del personaje", ["NCSoft confirmó más de 200 opciones de personalización en el lanzamiento. Con cuatro espacios de personaje, los jugadores pueden experimentar con múltiples aspectos y clases.", "Todo el equipo es visualmente personalizable, y las alas pueden transformarse para coincidir con cualquier otra ala recolectada. Las pieles de alas de la tienda no proporcionan estadísticas."]),
          section("pet-and-mount", "Sistema de mascotas y monturas", ["Más de 200 mascotas y monturas estarán disponibles en el lanzamiento. Los jugadores pueden comenzar a coleccionar desde el nivel 3.", "Las mascotas pueden recolectar objetos automáticamente para su dueño, simplificando la experiencia de farming."]),
          section("classes-and-content", "Clases, mazmorras y raids", ["Ocho clases están disponibles en la trinidad Tanque/DPS/Curandero. Dos tanques, cuatro DPS y dos curadores ofrecen un roster equilibrado.", "Los tamaños de grupo han aumentado: las expediciones (mazmorras) admiten 5 jugadores en lugar de 4, y el Santuario (raids) 10 en lugar de 8."]),
          section("pvp-and-servers", "PvP y regiones de servidores", ["Un modo de campos de batalla 10v10 con normalización de estadísticas estará disponible en el lanzamiento. El Abismo sigue siendo una zona PvP de mundo abierto.", "Se confirmaron cinco regiones de servidores globales: NA West, NA East, Sudamérica, Europa Central y Japón. Sin bloqueo regional."]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 6, {
        eyebrow: "STREAM DE DESENVOLVEDOR",
        title: "AION 2 Primeiro Dev Stream Global: Tudo que a NCSoft revelou sobre o lançamento",
        description: "O livestream 'Beyond the Abyss' da NCSoft em 7 de agosto revelou mais de 200 opções de personalização, 8 classes, 5 regiões de servidores globais, aumentos de tamanho de grupo e 30 dias de assinatura nos Pacotes de Fundador. O resumo completo.",
        intro: "Em 7 de agosto de 2026, a NCSoft realizou seu primeiro stream de desenvolvedor global para AION 2, intitulado 'Beyond the Abyss'. A transmissão ao vivo entregou uma riqueza de novas informações. Aqui está um detalhamento completo de tudo o que foi anunciado.",
        sourceNote: "Baseado no stream de desenvolvedor 'Beyond the Abyss' de 7 de agosto, cobertura da MMOBomb publicada em 10 de agosto e reportagens do AION2Hub. Todos os detalhes confirmados pelo quadro de avisos oficial da NCSOFT.",
        keywords: ["AION 2 stream de desenvolvedor", "AION 2 Beyond the Abyss", "AION 2 personalização", "AION 2 mascotes", "AION 2 detalhes do lançamento global"],
        sections: [
          section("customization", "Personalização de personagem", ["A NCSoft confirmou mais de 200 opções de personalização no lançamento. Com quatro slots de personagem, os jogadores podem experimentar vários visuais e classes.", "Todos os equipamentos são visualmente personalizáveis, e as asas podem ser transmogrificadas. As skins de asas da loja não fornecem atributos."]),
          section("pet-and-mount", "Sistema de mascotes e montarias", ["Mais de 200 mascotes e montarias estarão disponíveis no lançamento. Os jogadores podem começar a colecionar a partir do nível 3.", "As mascotes podem coletar itens automaticamente para seus donos, simplificando a experiência de farming."]),
          section("classes-and-content", "Classes, masmorras e raids", ["Oito classes estão disponíveis na trindade Tank/DPS/Healer. Dois tanks, quatro DPS e dois healers oferecem um elenco equilibrado.", "Os tamanhos de grupo foram aumentados: expedições (masmorras) suportam 5 jogadores em vez de 4, e o Santuário (raids) 10 em vez de 8."]),
          section("pvp-and-servers", "PvP e regiões de servidores", ["Um modo de campos de batalha 10v10 com normalização de estatísticas estará disponível no lançamento. O Abismo continua sendo uma zona PvP de mundo aberto.", "Cinco regiões de servidores globais foram confirmadas: NA West, NA East, América do Sul, Europa Central e Japão. Sem bloqueio regional."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 6, {
        eyebrow: "СТРИМ РАЗРАБОТЧИКОВ",
        title: "AION 2 Первый глобальный стрим разработчиков: всё, что NCSoft раскрыла о запуске",
        description: "Стрим NCSoft 'Beyond the Abyss' 7 августа раскрыл более 200 опций кастомизации, 8 классов, 5 глобальных серверных регионов, увеличение размера групп и 30 дней членства в наборах основателя. Полный обзор.",
        intro: "7 августа 2026 года NCSoft провела свой первый глобальный стрим разработчиков для AION 2 под названием 'Beyond the Abyss'. Стрим предоставил множество новой информации о том, что игроки могут ожидать при запуске. Вот полный разбор всех анонсов.",
        sourceNote: "Основано на стриме разработчиков 'Beyond the Abyss' от 7 августа, освещении MMOBomb от 10 августа и репортажах AION2Hub. Все детали подтверждены официальной доской объявлений NCSOFT.",
        keywords: ["AION 2 стрим разработчиков", "AION 2 Beyond the Abyss", "AION 2 кастомизация", "AION 2 питомцы", "AION 2 детали глобального запуска"],
        sections: [
          section("customization", "Кастомизация персонажа", ["NCSoft подтвердила более 200 опций кастомизации при запуске. С четырьмя слотами персонажей игроки могут экспериментировать с разными обликами и классами.", "Всё снаряжение визуально настраивается, а крылья можно трансмогрифицировать. Скины крыльев из магазина не дают характеристик."]),
          section("pet-and-mount", "Система питомцев и верховых животных", ["Более 200 питомцев и верховых будут доступны при запуске. Игроки могут начать собирать их с 3 уровня.", "Питомцы могут автоматически собирать предметы для владельца, упрощая фарм."]),
          section("classes-and-content", "Классы, подземелья и рейды", ["Восемь классов доступны в традиционной триаде Танк/ДПС/Хилер. Два танка, четыре ДПС и два хилера обеспечивают сбалансированный состав.", "Размеры групп увеличены: экспедиции (подземелья) поддерживают 5 игроков вместо 4, а Святилище (рейды) — 10 вместо 8."]),
          section("pvp-and-servers", "PvP и серверные регионы", ["Режим полей сражений 10v10 с нормализацией характеристик будет доступен при запуске. Бездна остаётся открытой PvP-зоной.", "Подтверждены пять глобальных серверных регионов: NA West, NA East, Южная Америка, Центральная Европа и Япония. Без региональной блокировки."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 6, {
        eyebrow: "開發者直播",
        title: "AION 2 首次全球開發者直播：NCSoft 公佈的上線前全部資訊",
        description: "NCSoft 在8月7日的「Beyond the Abyss」直播中透露了超過200種自訂選項、8個職業、5個全球伺服器區域、隊伍規模擴大以及創始人包中的30天會員資格。以下是完整回顧。",
        intro: "2026年8月7日，NCSoft 舉辦了首次全球開發者直播「Beyond the Abyss」。直播公佈了大量關於遊戲上線時玩家可期待的新資訊，涵蓋角色自訂、寵物系統、PvP、伺服器區域以及創始人包的重大變更。以下是所有公佈內容的完整概覽。",
        sourceNote: "基於8月7日「Beyond the Abyss」開發者直播、MMOBomb 8月10日報道和 AION2Hub 的報道。所有細節經 NCSOFT 官方公告確認。",
        keywords: ["AION 2 開發者直播", "AION 2 Beyond the Abyss", "AION 2 自訂", "AION 2 寵物", "AION 2 全球上線詳情"],
        sections: [
          section("customization", "角色自訂與外觀", ["NCSoft 確認上線時提供超過200種自訂選項，讓玩家對角色的外觀擁有前所未有的控制力。四個角色欄位讓玩家可以嘗試多種外觀和職業。", "所有裝備均可自訂外觀，翅膀可以進行幻化。商城購買的翅膀皮膚不提供任何屬性，確保外觀購買保持純粹的視覺性質。"]),
          section("pet-and-mount", "寵物與坐騎系統", ["上線時將提供超過200種寵物和坐騎，其中許多同時兼具寵物和坐騎功能。收集要求已放寬到3級。", "寵物可以為所有者自動拾取物品，大幅簡化刷怪體驗。"]),
          section("classes-and-content", "職業、副本與團本", ["上線時提供8個職業，涵蓋坦克/輸出/治療三角體系。兩個坦克、四個輸出和兩個治療提供了均衡的職業陣容。", "隊伍規模已擴大：遠征隊（副本）現支援5人而非4人，聖殿（團本）現支援10人而非8人。"]),
          section("pvp-and-servers", "PvP 與伺服器區域", ["上線時將提供10v10戰場模式，屬性標準化，確保裝備差距不會決定比賽結果。深淵是開放世界PvP區域。", "確認了五個全球伺服器區域：北美西、北美東、南美、中歐和日本。沒有區域鎖定。"]),
        ],
      }),
    },
  },

  // ARTICLE 2: Founder's Packs 30-Day Membership
  {
    section: "news",
    slug: "aion-2-founders-packs-30-day-membership",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [aion2hubDevStreamSource, ncFoundersSource, mmobombFoundersSource, steamSource],
    heroImage: foundersPackHero,
    related: [
      { kind: "content", section: "news", slug: "aion-2-first-global-dev-stream-recap" },
      { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
      { kind: "content", section: "guides", slug: "aion-2-pvp-guide-battlegrounds-abyss" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 5, {
        eyebrow: "FOUNDER'S PACKS",
        title: "Aion 2 Founder's Packs Now Include 30 Days of Membership — All Tiers, Retroactive",
        description: "NCSoft announced during the August 7 global dev stream that all three Founder's Pack tiers now include 30 days of Membership, retroactively applying to every pack purchased since July 22. Here's what changed and why it matters.",
        intro: "One of the biggest announcements from NCSoft's first global developer stream on August 7 was a significant change to Founder's Packs: all three tiers — Standard ($24.99), Deluxe ($49.99), and Ultimate ($99.99) — now include 30 days of Membership. Better yet, the benefit is retroactive, meaning everyone who purchased a pack since July 22 automatically receives the 30-day Membership without needing to upgrade or re-purchase.",
        sourceNote: "Based on NCSOFT's August 7 global developer stream announcement, AION2Hub's detailed coverage, and Steam store page listings. Membership details confirmed by NCSOFT's official notice board.",
        keywords: ["Aion 2 Founder's Pack", "Aion 2 Membership", "Aion 2 Standard 24.99", "Aion 2 Deluxe 49.99", "Aion 2 Ultimate 99.99"],
        sections: [
          section("what-changed", "What Changed: 30-Day Membership Added", ["The most significant change is the addition of 30 days of Membership to all three Founder's Pack tiers. This was the loudest omission in the original pack listings — none of the original tiers included any Membership time, which led to community criticism given that Membership is essential for accessing the in-game market and currency exchange.", "Founder's Pack cosmetics — including exclusive wings, titles, and emotes — will never be sold separately in the global cash shop. This is a deliberate divergence from the Korean service, where similar items eventually became available to non-Founder's Pack players. For global players, these items remain exclusive to the pre-launch packs."]),
          section("what-membership-does", "What Membership Unlocks", ["Membership is a $15/month subscription that gates several critical features. The most important is access to the in-game Market, where players can buy and sell items with other players, and the Kina↔Quna Exchange, which allows converting between the two primary currencies. A subscriber-only cash shop tier offers additional discounts and exclusive items.", "Membership also provides faster flight speeds, reduced teleportation costs, and priority queue access during peak hours. For players planning to engage with the player-driven economy, Membership is essentially mandatory — the Market is the primary way to acquire and trade rare items, and the Exchange is the only way to convert between Kina (earned in-game) and Quna (premium currency)."]),
          section("tier-comparison", "Tier Comparison & Pricing", ["The Standard tier at $24.99 includes the base game access, 5-day early access starting September 30, and now 30 days of Membership. The Deluxe tier at $49.99 adds exclusive cosmetic items, a mount, and additional in-game currency. The Ultimate tier at $99.99 includes everything from the lower tiers plus the highest-tier exclusive cosmetics, the most in-game currency, and a unique title.", "Early access begins September 30, 2026 for all Founder's Pack purchasers. The full free-to-play launch is expected in early October, though NCSoft has not confirmed an exact date. Founder's Packs are available on both Steam and PURPLE, but platform-locked — a pack purchased on Steam can only be used on the Steam version, and vice versa for PURPLE."]),
          section("should-you-buy", "Should You Buy a Founder's Pack?", ["With the addition of 30 days of Membership, the value proposition has improved significantly. The $24.99 Standard tier effectively becomes $9.99 when accounting for the $15 Membership value, making it an attractive entry point for players who planned to subscribe anyway. The Deluxe and Ultimate tiers offer additional cosmetic value for collectors.", "However, waiting until the Gamescom 2026 showcase on August 25 may be worth considering — NCSoft could announce additional bonuses or limited-time offers during the event. With the September 30 early access date approaching, Founder's Packs will remain available until launch, giving players time to decide."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
        eyebrow: "创始人包",
        title: "Aion 2 创始人包现在包含30天会员资格——所有等级，追溯生效",
        description: "NCSoft 在8月7日的全球开发者直播中宣布，所有三个创始人包等级现在都包含30天会员资格，并追溯适用于自7月22日起购买的每个包。以下是变更内容及其重要性。",
        intro: "NCSoft 在8月7日首次全球开发者直播中最大的公告之一是对创始人包的重大变更：所有三个等级——标准版（$24.99）、豪华版（$49.99）和终极版（$99.99）——现在都包含30天会员资格。而且这项福利是追溯生效的，这意味着自7月22日起购买包的每个人都会自动获得30天会员资格，无需升级或重新购买。",
        sourceNote: "基于 NCSOFT 8月7日全球开发者直播公告、AION2Hub 的详细报道和 Steam 商店页面信息。会员详情经 NCSOFT 官方公告板确认。",
        keywords: ["Aion 2 创始人包", "Aion 2 会员", "Aion 2 标准版 24.99", "Aion 2 豪华版 49.99", "Aion 2 终极版 99.99"],
        sections: [
          section("what-changed", "变更内容：新增30天会员资格", ["最重要的变更是为所有三个创始人包等级增加了30天会员资格。这是原始包列表中最明显的缺失——原始等级均不包含任何会员时间，考虑到会员对于访问游戏内市场和货币兑换至关重要，这引发了社区批评。", "创始人包外观——包括专属翅膀、称号和表情——永远不会在全球商城单独出售。这是与韩服有意的区别。对于全球玩家，这些物品仍然是上线前包的专属。"]),
          section("what-membership-does", "会员资格解锁的功能", ["会员是一项每月15美元的订阅，限制多个关键功能。最重要的是访问游戏内市场（玩家可以买卖物品）和 Kina↔Quna 兑换（允许两种主要货币之间的转换）。会员专属商城提供额外折扣和专属物品。", "会员还提供更快的飞行速度、降低的传送费用以及高峰时段的优先排队。对于计划参与玩家驱动经济的玩家来说，会员基本上是必需的——市场是获取和交易稀有物品的主要途径。"]),
          section("tier-comparison", "等级比较与定价", ["标准版24.99美元包含基础游戏、9月30日开始的5天抢先体验，以及30天会员资格。豪华版49.99美元添加专属外观物品、坐骑和额外游戏货币。终极版99.99美元包含所有内容及最高等级专属外观。", "所有创始人包购买者的抢先体验将于2026年9月30日开始。完整免费游玩版预计10月初上线。创始人包在 Steam 和 PURPLE 上均有售，但平台锁定。"]),
          section("should-you-buy", "是否应该购买创始人包？", ["新增30天会员资格后，性价比显著提升。计入15美元会员价值后，标准版实际相当于9.99美元。豪华版和终极版为收藏家提供了额外外观价值。", "不过，等待8月25日科隆游戏展2026展示可能值得考虑——NCSoft可能在活动期间公布额外奖励或限时优惠。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 5, {
        eyebrow: "파운더스 팩",
        title: "Aion 2 파운더스 팩, 이제 30일 멤버십 포함 — 모든 티어, 소급 적용",
        description: "NCSoft가 8월 7일 글로벌 개발자 스트림에서 모든 3개 파운더스 팩 티어에 30일 멤버십이 포함되며, 7월 22일 이후 구매한 모든 팩에 소급 적용된다고 발표했습니다. 변경 내용과 중요성을 설명합니다.",
        intro: "NCSoft의 8월 7일 첫 글로벌 개발자 스트림에서 가장 큰 발표 중 하나는 파운더스 팩의 중요한 변경이었습니다: 모든 3개 티어 — 스탠다드($24.99), 디럭스($49.99), 얼티밋($99.99) — 에 이제 30일 멤버십이 포함됩니다. 더 좋은 점은 이 혜택이 소급 적용된다는 것입니다.",
        sourceNote: "NCSOFT 8월 7일 글로벌 개발자 스트림 발표, AION2Hub의 상세 보도 및 Steam 스토어 페이지 정보에 기반합니다. 멤버십 세부 사항은 NCSOFT 공식 게시판을 통해 확인되었습니다.",
        keywords: ["Aion 2 파운더스 팩", "Aion 2 멤버십", "Aion 2 스탠다드 24.99", "Aion 2 디럭스 49.99", "Aion 2 얼티밋 99.99"],
        sections: [
          section("what-changed", "변경 내용: 30일 멤버십 추가", ["가장 중요한 변경은 모든 3개 파운더스 팩 티어에 30일 멤버십이 추가된 것입니다. 원래 티어에는 멤버십 시간이 전혀 포함되지 않아 커뮤니티 비판을 받았습니다.", "파운더스 팩 코스메틱은 글로벌 캐시샵에서 별도로 판매되지 않습니다. 이는 한국 서비스와 의도적으로 차별화된 부분입니다."]),
          section("what-membership-does", "멤버십이 제공하는 기능", ["멤버십은 월 $15의 구독으로, 게임 내 마켓 접근과 Kina↔Quna 환전을 제공합니다. 구독자 전용 캐시샵도 추가 할인을 제공합니다.", "멤버십은 또한 빠른 비행 속도, 텔레포트 비용 할인, 피크 시간대 우선 대기열을 제공합니다."]),
          section("tier-comparison", "티어 비교 및 가격", ["스탠다드 $24.99는 기본 게임, 9월 30일 시작 5일 얼리 액세스, 30일 멤버십을 포함합니다. 디럭스 $49.99는 독점 코스메틱, 탈것, 추가 게임 내 화폐를 추가합니다.", "얼리 액세스는 2026년 9월 30일에 시작됩니다. 정식 F2P 출시는 10월 초로 예상됩니다."]),
          section("should-you-buy", "파운더스 팩을 구매해야 할까요?", ["30일 멤버십 추가로 가치 제안이 크게 개선되었습니다. $15 멤버십 가치를 고려하면 스탠다드는 실질적으로 $9.99가 됩니다.", "8월 25일 게임스컴 2026 쇼케이스까지 기다리는 것도 고려할 만합니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 5, {
        eyebrow: "PACKS FONDATEUR",
        title: "Les packs Fondateur d'Aion 2 incluent désormais 30 jours d'adhésion — tous les niveaux, rétroactif",
        description: "NCSoft a annoncé lors du stream développeur du 7 août que les trois niveaux de packs Fondateur incluent désormais 30 jours d'adhésion, rétroactifs pour chaque pack acheté depuis le 22 juillet.",
        intro: "L'une des plus grandes annonces du premier stream développeur mondial de NCSoft du 7 août concernait les packs Fondateur : les trois niveaux incluent désormais 30 jours d'adhésion, rétroactifs pour tous les achats depuis le 22 juillet.",
        sourceNote: "Basé sur l'annonce du stream développeur NCSOFT du 7 août et la couverture d'AION2Hub.",
        keywords: ["Aion 2 pack Fondateur", "Aion 2 adhésion", "Aion 2 Standard 24.99", "Aion 2 Deluxe 49.99", "Aion 2 Ultimate 99.99"],
        sections: [
          section("what-changed", "Ce qui a changé", ["Les trois niveaux incluent désormais 30 jours d'adhésion. Les cosmétiques des packs Fondateur ne seront jamais vendus séparément dans la boutique mondiale."]),
          section("what-membership-does", "Ce que l'adhésion déverrouille", ["L'adhésion donne accès au marché en jeu, à l'échange Kina↔Quna et à un niveau de boutique réservé aux abonnés."]),
          section("tier-comparison", "Comparaison des niveaux", ["Standard $24.99, Deluxe $49.99, Ultimate $99.99. L'accès anticipé commence le 30 septembre 2026."]),
          section("should-you-buy", "Faut-il acheter ?", ["Avec 30 jours d'adhésion inclus, le rapport qualité-prix s'est amélioré. Attendre la Gamescom pourrait valoir le coup."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 5, {
        eyebrow: "FOUNDER'S PACKS",
        title: "Aion 2 Founder's Packs enthalten jetzt 30 Tage Mitgliedschaft — alle Stufen, rückwirkend",
        description: "NCSoft kündigte im globalen Dev-Stream am 7. August an, dass alle drei Founder's Pack-Stufen jetzt 30 Tage Mitgliedschaft enthalten, rückwirkend für jedes seit dem 22. Juli gekaufte Pack.",
        intro: "Eine der größten Ankündigungen aus NCSofts erstem globalen Entwickler-Stream war eine bedeutende Änderung an den Founder's Packs: Alle drei Stufen enthalten jetzt 30 Tage Mitgliedschaft, rückwirkend ab dem 22. Juli.",
        sourceNote: "Basierend auf NCSOFTs Entwickler-Stream-Ankündigung vom 7. August und AION2Hub-Berichterstattung.",
        keywords: ["Aion 2 Founder's Pack", "Aion 2 Mitgliedschaft", "Aion 2 Standard 24.99", "Aion 2 Deluxe 49.99", "Aion 2 Ultimate 99.99"],
        sections: [
          section("what-changed", "Was sich geändert hat", ["Alle drei Stufen enthalten jetzt 30 Tage Mitgliedschaft. Founder's Pack-Kosmetik wird nie separat im globalen Shop verkauft."]),
          section("what-membership-does", "Was die Mitgliedschaft freischaltet", ["Die Mitgliedschaft gewährt Zugang zum Markt, zum Kina↔Quna-Umtausch und einer Abonnenten-Shop-Stufe."]),
          section("tier-comparison", "Stufenvergleich", ["Standard $24.99, Deluxe $49.99, Ultimate $99.99. Early Access beginnt am 30. September 2026."]),
          section("should-you-buy", "Sollte man kaufen?", ["Mit 30 Tagen Mitgliedschaft hat sich das Preis-Leistungs-Verhältnis verbessert. Warten auf die Gamescom könnte sich lohnen."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 5, {
        eyebrow: "PAQUETES DE FUNDADOR",
        title: "Los Paquetes de Fundador de Aion 2 ahora incluyen 30 días de Membresía — todos los niveles, retroactivo",
        description: "NCSoft anunció durante el stream de desarrollador del 7 de agosto que los tres niveles de Paquetes de Fundador ahora incluyen 30 días de Membresía, retroactivo para cada paquete comprado desde el 22 de julio.",
        intro: "Uno de los anuncios más importantes del primer stream de desarrollador global de NCSoft fue un cambio significativo en los Paquetes de Fundador: los tres niveles ahora incluyen 30 días de Membresía, retroactivo desde el 22 de julio.",
        sourceNote: "Basado en el anuncio del stream de desarrollador de NCSOFT del 7 de agosto y la cobertura de AION2Hub.",
        keywords: ["Aion 2 Paquete de Fundador", "Aion 2 Membresía", "Aion 2 Standard 24.99", "Aion 2 Deluxe 49.99", "Aion 2 Ultimate 99.99"],
        sections: [
          section("what-changed", "Lo que cambió", ["Los tres niveles ahora incluyen 30 días de Membresía. Los cosméticos de los Paquetes de Fundador nunca se venderán por separado."]),
          section("what-membership-does", "Lo que desbloquea la Membresía", ["La Membresía da acceso al mercado del juego, al intercambio Kina↔Quna y a un nivel de tienda para suscriptores."]),
          section("tier-comparison", "Comparación de niveles", ["Standard $24.99, Deluxe $49.99, Ultimate $99.99. El acceso anticipado comienza el 30 de septiembre de 2026."]),
          section("should-you-buy", "¿Deberías comprar?", ["Con 30 días de Membresía incluidos, la propuesta de valor ha mejorado. Esperar a la Gamescom podría valer la pena."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 5, {
        eyebrow: "ファウンダーズパック",
        title: "Aion 2 ファウンダーズパックに30日間のメンバーシップが含まれるように — 全ティア、遡及適用",
        description: "NCSoft は8月7日のグローバル開発者ストリームで、3つのファウンダーズパックティアすべてに30日間のメンバーシップが含まれ、7月22日以降に購入されたすべてのパックに遡及適用されることを発表しました。",
        intro: "NCSoft の8月7日の初のグローバル開発者ストリームでの最大の発表の一つは、ファウンダーズパックの大幅な変更でした。3つのティアすべてに30日間のメンバーシップが含まれるようになり、7月22日以降の購入に遡及適用されます。",
        sourceNote: "NCSOFT 8月7日開発者ストリーム発表、AION2Hub の詳細報道に基づきます。",
        keywords: ["Aion 2 ファウンダーズパック", "Aion 2 メンバーシップ", "Aion 2 スタンダード 24.99", "Aion 2 デラックス 49.99", "Aion 2 アルティメット 99.99"],
        sections: [
          section("what-changed", "変更内容", ["3つのティアすべてに30日間のメンバーシップが追加されました。ファウンダーズパックのコスメティックはグローバルキャッシュショップで個別販売されません。"]),
          section("what-membership-does", "メンバーシップの特典", ["メンバーシップはゲーム内マーケットへのアクセス、Kina↔Quna交換、サブスクライバー専用ショップを提供します。"]),
          section("tier-comparison", "ティア比較", ["スタンダード$24.99、デラックス$49.99、アルティメット$99.99。アーリーアクセスは2026年9月30日開始。"]),
          section("should-you-buy", "購入すべき？", ["30日間のメンバーシップを含めると価値が大幅に向上しました。Gamescomまで待つ価値もあるかもしれません。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 5, {
        eyebrow: "PACOTES DE FUNDADOR",
        title: "Os Pacotes de Fundador do Aion 2 agora incluem 30 dias de Assinatura — todos os níveis, retroativo",
        description: "A NCSoft anunciou durante o stream de desenvolvedor de 7 de agosto que os três níveis de Pacotes de Fundador agora incluem 30 dias de Assinatura, retroativo para cada pacote comprado desde 22 de julho.",
        intro: "Um dos maiores anúncios do primeiro stream de desenvolvedor global da NCSoft foi uma mudança significativa nos Pacotes de Fundador: os três níveis agora incluem 30 dias de Assinatura, retroativo para todos os pacotes comprados desde 22 de julho.",
        sourceNote: "Baseado no anúncio do stream de desenvolvedor da NCSOFT de 7 de agosto e na cobertura do AION2Hub.",
        keywords: ["Aion 2 Pacote de Fundador", "Aion 2 Assinatura", "Aion 2 Standard 24.99", "Aion 2 Deluxe 49.99", "Aion 2 Ultimate 99.99"],
        sections: [
          section("what-changed", "O que mudou", ["Os três níveis agora incluem 30 dias de Assinatura. Os cosméticos dos Pacotes de Fundador nunca serão vendidos separadamente."]),
          section("what-membership-does", "O que a Assinatura desbloqueia", ["A Assinatura dá acesso ao mercado do jogo, à troca Kina↔Quna e a um nível de loja para assinantes."]),
          section("tier-comparison", "Comparação de níveis", ["Standard $24.99, Deluxe $49.99, Ultimate $99.99. O acesso antecipado começa em 30 de setembro de 2026."]),
          section("should-you-buy", "Vale a pena comprar?", ["Com 30 dias de Assinatura incluídos, a relação custo-benefício melhorou. Esperar pela Gamescom pode valer a pena."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 5, {
        eyebrow: "НАБОРЫ ОСНОВАТЕЛЯ",
        title: "Наборы основателя Aion 2 теперь включают 30 дней членства — все уровни, ретроактивно",
        description: "NCSoft объявила во время глобального стрима разработчиков 7 августа, что все три уровня наборов основателя теперь включают 30 дней членства, ретроактивно применяясь к каждому набору, купленному с 22 июля.",
        intro: "Одним из самых больших анонсов первого глобального стрима разработчиков NCSoft стало значительное изменение наборов основателя: все три уровня теперь включают 30 дней членства, ретроактивно с 22 июля.",
        sourceNote: "Основано на объявлении стрима разработчиков NCSOFT от 7 августа и освещении AION2Hub.",
        keywords: ["Aion 2 набор основателя", "Aion 2 членство", "Aion 2 Standard 24.99", "Aion 2 Deluxe 49.99", "Aion 2 Ultimate 99.99"],
        sections: [
          section("what-changed", "Что изменилось", ["Все три уровня теперь включают 30 дней членства. Косметика наборов основателя никогда не будет продаваться отдельно в глобальном магазине."]),
          section("what-membership-does", "Что даёт членство", ["Членство предоставляет доступ к внутриигровому рынку, обмену Kina↔Quna и уровню магазина для подписчиков."]),
          section("tier-comparison", "Сравнение уровней", ["Standard $24.99, Deluxe $49.99, Ultimate $99.99. Ранний доступ начинается 30 сентября 2026 года."]),
          section("should-you-buy", "Стоит ли покупать?", ["С включением 30 дней членства соотношение цены и качества значительно улучшилось. Ожидание Gamescom может быть оправданным."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
        eyebrow: "創始人包",
        title: "Aion 2 創始人包現在包含30天會員資格——所有等級，追溯生效",
        description: "NCSoft 在8月7日的全球開發者直播中宣佈，所有三個創始人包等級現在都包含30天會員資格，並追溯適用於自7月22日起購買的每個包。",
        intro: "NCSoft 在8月7日首次全球開發者直播中最大的公告之一是對創始人包的重大變更：所有三個等級現在都包含30天會員資格，追溯適用於7月22日以來的所有購買。",
        sourceNote: "基於 NCSOFT 8月7日全球開發者直播公告和 AION2Hub 的詳細報道。",
        keywords: ["Aion 2 創始人包", "Aion 2 會員", "Aion 2 標準版 24.99", "Aion 2 豪華版 49.99", "Aion 2 終極版 99.99"],
        sections: [
          section("what-changed", "變更內容", ["所有三個等級現在都包含30天會員資格。創始人包外觀永遠不會在全球商城單獨出售。"]),
          section("what-membership-does", "會員資格解鎖的功能", ["會員資格提供遊戲內市場訪問、Kina↔Quna 兌換和訂閱者專屬商城。"]),
          section("tier-comparison", "等級比較", ["標準版$24.99、豪華版$49.99、終極版$99.99。搶先體驗將於2026年9月30日開始。"]),
          section("should-you-buy", "是否應該購買？", ["包含30天會員資格後，價值顯著提升。等待科隆遊戲展可能值得考慮。"]),
        ],
      }),
    },
  },

  // ARTICLE 3: Global Server Regions Guide
  {
    section: "guides",
    slug: "aion-2-global-server-regions-guide",
    schemaType: "Article",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [mmobombDevStreamSource, ncOfficialSource, aion2hubDevStreamSource],
    heroImage: serverRegionsHero,
    related: [
      { kind: "content", section: "news", slug: "aion-2-first-global-dev-stream-recap" },
      { kind: "content", section: "guides", slug: "aion-2-pvp-guide-battlegrounds-abyss" },
      { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "SERVER GUIDE",
        title: "AION 2 Global Server Regions: Complete Guide to NA, South America, Europe & Japan Servers",
        description: "AION 2 launches with 5 server regions and no region locking. Here's everything you need to know about server locations, how to choose a server, and what the no-lock policy means for players worldwide.",
        intro: "One of the most important decisions you'll make before AION 2 launches is which server region to play on. NCSoft has confirmed five global server regions with no region locking — meaning players from anywhere in the world can join any server. This guide breaks down what each region offers, how to choose the best server for your needs, and what the no-lock policy means for the community.",
        sourceNote: "Based on NCSOFT's official Global Developer Stream announcements from August 7, 2026, and supplementary details from AION2Hub and MMOBomb coverage.",
        keywords: ["AION 2 server regions", "AION 2 NA West", "AION 2 NA East", "AION 2 Europe server", "AION 2 Japan server"],
        sections: [
          section("region-breakdown", "The Five Server Regions", ["NCSoft confirmed five distinct server regions during the August 7 global dev stream: NA West (west coast of North America), NA East (east coast of North America), South America (likely Brazil-hosted for optimal latency across the continent), Central Europe (EU-hosted covering Europe and surrounding regions), and Japan (Asia-Pacific focused).", "Each region operates independently with its own server infrastructure, economy, and community. Characters, items, and progress are tied to the region you choose, so your decision matters for the long term. NCSoft has not confirmed whether server transfers between regions will be available post-launch, but a committed Server Transfer Service was mentioned in earlier Early Access documentation."]),
          section("no-region-locking", "No Region Locking — What It Means", ["The most important detail is that there is no region locking. Players from any geographic location can create characters on any server region. This means a player in Australia can play on NA West, a player in the Middle East can join European servers, and a player in Africa can choose whichever region offers the best ping.", "This policy is a significant departure from many modern MMO launches, which often restrict players to their geographic region. The no-lock approach allows friends from different continents to play together freely, and it gives competitive players the flexibility to choose regions with the most active player bases or the healthiest in-game economies."]),
          section("how-to-choose", "How to Choose Your Server", ["Latency is the primary factor. Players in North America will typically get the best ping on their closest coast. South American players will have optimal latency on the South America server. European players should choose Central Europe, and Asia-Pacific players will likely prefer Japan. However, players in regions without a dedicated server (Oceania, Middle East, Africa, Southeast Asia) should test latency to multiple regions during the Early Access period.", "Community size and language are secondary considerations. The Central Europe server will likely attract the most diverse international community, while Japan may have a strong Japanese-speaking player base. For players who value a large, active economy, the NA East and Central Europe servers are likely to have the highest populations. The PvP community may centralize on one or two servers, so competitive players should monitor community discussions before launch."]),
          section("early-access-tips", "Early Access & Launch Tips", ["Early Access begins September 30 for Founder's Pack holders. This is an excellent opportunity to test latency to different server regions before committing to one. The first week of Early Access is a soft launch period where character wipes are not expected, but NCSoft has not ruled out adjustments.", "Coordinating with your play group is essential. Since there's no region locking, make sure all your friends agree on which server to play on before launch day. The five-day Early Access head start provides time to establish your character, join a legion, and begin building your in-game network before the free-to-play population arrives in early October."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "服务器指南",
        title: "AION 2 全球服务器区域：北美、南美、欧洲和日本服务器完整指南",
        description: "AION 2 上线时设有5个服务器区域，无区域锁定。以下是关于服务器位置、如何选择服务器以及无锁定政策对全球玩家意义的所有信息。",
        intro: "在 AION 2 上线前，你将做的最重要的决定之一是选择哪个服务器区域。NCSoft 已确认五个全球服务器区域，无区域锁定。本指南详细介绍每个区域提供的内容、如何选择最适合你的服务器，以及无锁定政策对社区的意义。",
        sourceNote: "基于 NCSOFT 2026年8月7日官方全球开发者直播公告，以及 AION2Hub 和 MMOBomb 的补充报道。",
        keywords: ["AION 2 服务器区域", "AION 2 北美西", "AION 2 北美东", "AION 2 欧洲服务器", "AION 2 日本服务器"],
        sections: [
          section("region-breakdown", "五个服务器区域", ["NCSoft 在8月7日全球开发者直播中确认了五个不同的服务器区域：北美西、北美东、南美、中欧和日本。每个区域独立运营，拥有自己的服务器基础设施、经济和社区。", "角色、物品和进度与你选择的区域绑定，因此你的决定对长期游戏体验很重要。NCSoft 尚未确认上线后是否支持区域间服务器转移。"]),
          section("no-region-locking", "无区域锁定——这意味着什么", ["最重要的细节是没有区域锁定。任何地理位置的玩家都可以在任何服务器区域创建角色。这意味着不同大陆的朋友可以自由地一起游戏。", "这一政策与许多现代MMO上线形成显著区别，后者通常将玩家限制在其地理区域。无锁定方式让来自不同大陆的朋友可以自由组队。"]),
          section("how-to-choose", "如何选择服务器", ["延迟是首要因素。北美玩家通常在其最近海岸获得最佳延迟。玩家应在抢先体验期间测试多个区域的延迟。", "社区规模和语言是次要考虑因素。中欧服务器可能吸引最多样化的国际社区，而日本可能有强大的日语玩家群体。"]),
          section("early-access-tips", "抢先体验与上线提示", ["创始人包持有者的抢先体验将于9月30日开始。这是在不同服务器区域测试延迟的绝佳机会。", "与你的游戏群组协调至关重要。确保所有朋友在上线日前就选择哪个服务器达成一致。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "서버 가이드",
        title: "AION 2 글로벌 서버 지역: NA, 남미, 유럽, 일본 서버 완벽 가이드",
        description: "AION 2는 5개의 서버 지역과 지역 잠금 없이 출시됩니다. 서버 위치, 서버 선택 방법, 잠금 해제 정책이 전 세계 플레이어에게 의미하는 바를 모두 설명합니다.",
        intro: "AION 2 출시 전 가장 중요한 결정 중 하나는 어떤 서버 지역에서 플레이할지입니다. NCSoft는 지역 잠금 없이 5개의 글로벌 서버 지역을 확인했습니다. 이 가이드는 각 지역의 특징, 최적의 서버 선택 방법, 잠금 해제 정책의 의미를 설명합니다.",
        sourceNote: "NCSOFT 2026년 8월 7일 공식 글로벌 개발자 스트림 발표 및 AION2Hub, MMOBomb 보도에 기반합니다.",
        keywords: ["AION 2 서버 지역", "AION 2 NA West", "AION 2 NA East", "AION 2 유럽 서버", "AION 2 일본 서버"],
        sections: [
          section("region-breakdown", "5개 서버 지역", ["NCSoft는 5개의 서버 지역을 확인했습니다: NA West, NA East, 남미, 중앙유럽, 일본. 각 지역은 독립적으로 운영됩니다.", "캐릭터, 아이템, 진행 상황은 선택한 지역에 귀속됩니다. 장기적인 결정입니다."]),
          section("no-region-locking", "지역 잠금 없음", ["지역 잠금이 없어 전 세계 어디서든 모든 서버에서 플레이할 수 있습니다. 다른 대륙의 친구들과 함께 플레이할 수 있습니다."]),
          section("how-to-choose", "서버 선택 방법", ["지연 시간이 주요 요소입니다. 얼리 액세스 기간 동안 여러 지역의 지연 시간을 테스트하세요.", "커뮤니티 규모와 언어도 고려하세요. 중앙유럽 서버는 가장 다양한 국제 커뮤니티를 끌어들일 가능성이 높습니다."]),
          section("early-access-tips", "얼리 액세스 팁", ["파운더스 팩 보유자의 얼리 액세스는 9월 30일에 시작됩니다. 여러 서버 지역의 지연 시간을 테스트할 좋은 기회입니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "GUIDE DES SERVEURS",
        title: "Régions de serveurs mondiaux d'AION 2 : Guide complet des serveurs NA, Amérique du Sud, Europe et Japon",
        description: "AION 2 est lancé avec 5 régions de serveurs sans verrouillage régional. Tout ce qu'il faut savoir sur les serveurs et comment choisir.",
        intro: "L'une des décisions les plus importantes avant le lancement d'AION 2 est la région de serveur. Cinq régions sont confirmées sans verrouillage régional.",
        sourceNote: "Basé sur les annonces du stream développeur NCSOFT du 7 août 2026.",
        keywords: ["AION 2 régions de serveurs", "AION 2 NA West", "AION 2 Europe", "AION 2 Japon", "AION 2 serveur"],
        sections: [
          section("region-breakdown", "Les cinq régions", ["NA West, NA East, Amérique du Sud, Europe centrale et Japon. Chaque région fonctionne indépendamment."]),
          section("no-region-locking", "Pas de verrouillage régional", ["Les joueurs du monde entier peuvent rejoindre n'importe quel serveur. Les amis de différents continents peuvent jouer ensemble."]),
          section("how-to-choose", "Comment choisir", ["La latence est le facteur principal. Testez plusieurs régions pendant l'accès anticipé pour trouver la meilleure connexion."]),
          section("early-access-tips", "Conseils pour l'accès anticipé", ["L'accès anticipé commence le 30 septembre. Profitez-en pour tester la latence et coordonner avec vos amis."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "SERVER-LEITFADEN",
        title: "AION 2 globale Serverregionen: Vollständiger Leitfaden zu NA-, Südamerika-, Europa- und Japan-Servern",
        description: "AION 2 startet mit 5 Serverregionen und ohne Regionssperre. Alles Wissenswerte über Serverstandorte und Auswahl.",
        intro: "Eine der wichtigsten Entscheidungen vor dem AION 2-Launch ist die Serverregion. Fünf globale Regionen ohne Regionssperre wurden bestätigt.",
        sourceNote: "Basierend auf NCSOFTs Entwickler-Stream-Ankündigungen vom 7. August 2026.",
        keywords: ["AION 2 Serverregionen", "AION 2 NA West", "AION 2 Europa", "AION 2 Japan", "AION 2 Server"],
        sections: [
          section("region-breakdown", "Die fünf Regionen", ["NA West, NA East, Südamerika, Zentraleuropa und Japan. Jede Region ist unabhängig."]),
          section("no-region-locking", "Keine Regionssperre", ["Spieler aus aller Welt können jedem Server beitreten. Freunde von verschiedenen Kontinenten können zusammen spielen."]),
          section("how-to-choose", "Wie wählen", ["Latenz ist der Hauptfaktor. Testen Sie während des Early Access mehrere Regionen."]),
          section("early-access-tips", "Early Access-Tipps", ["Early Access beginnt am 30. September. Nutzen Sie die Zeit zum Testen und Koordinieren."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "GUÍA DE SERVIDORES",
        title: "Regiones de servidores globales de AION 2: Guía completa de servidores NA, Sudamérica, Europa y Japón",
        description: "AION 2 se lanza con 5 regiones de servidores sin bloqueo regional. Todo lo que necesitas saber sobre los servidores.",
        intro: "Una de las decisiones más importantes antes del lanzamiento de AION 2 es la región de servidor. Cinco regiones globales sin bloqueo regional han sido confirmadas.",
        sourceNote: "Basado en los anuncios del stream de desarrollador de NCSOFT del 7 de agosto de 2026.",
        keywords: ["AION 2 regiones de servidores", "AION 2 NA West", "AION 2 Europa", "AION 2 Japón", "AION 2 servidor"],
        sections: [
          section("region-breakdown", "Las cinco regiones", ["NA West, NA East, Sudamérica, Europa Central y Japón. Cada región opera independientemente."]),
          section("no-region-locking", "Sin bloqueo regional", ["Jugadores de todo el mundo pueden unirse a cualquier servidor. Amigos de diferentes continentes pueden jugar juntos."]),
          section("how-to-choose", "Cómo elegir", ["La latencia es el factor principal. Prueba varias regiones durante el acceso anticipado."]),
          section("early-access-tips", "Consejos de acceso anticipado", ["El acceso anticipado comienza el 30 de septiembre. Úsalo para probar latencia y coordinar con amigos."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "サーバーガイド",
        title: "AION 2 グローバルサーバーリージョン：NA、南米、欧州、日本の完全ガイド",
        description: "AION 2 は5つのサーバーリージョンでリージョンロックなしでローンチします。サーバーに関するすべての情報を提供します。",
        intro: "AION 2 ローンチ前の最も重要な決定の一つはサーバーリージョンの選択です。リージョンロックなしの5つのグローバルリージョンが確認されています。",
        sourceNote: "NCSOFT 2026年8月7日開発者ストリーム発表に基づきます。",
        keywords: ["AION 2 サーバーリージョン", "AION 2 NA West", "AION 2 欧州", "AION 2 日本", "AION 2 サーバー"],
        sections: [
          section("region-breakdown", "5つのリージョン", ["NA West、NA East、南米、中央ヨーロッパ、日本。各リージョンは独立して運営されます。"]),
          section("no-region-locking", "リージョンロックなし", ["世界中のプレイヤーがどのサーバーにも参加できます。異なる大陸の友達と一緒にプレイできます。"]),
          section("how-to-choose", "選び方", ["レイテンシーが主な要素です。アーリーアクセス中に複数のリージョンをテストしましょう。"]),
          section("early-access-tips", "アーリーアクセスヒント", ["アーリーアクセスは9月30日に開始。レイテンシーテストと友達との調整に活用しましょう。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "GUIA DE SERVIDORES",
        title: "Regiões de servidores globais do AION 2: Guia completo dos servidores NA, América do Sul, Europa e Japão",
        description: "AION 2 é lançado com 5 regiões de servidores sem bloqueio regional. Tudo que você precisa saber sobre os servidores.",
        intro: "Uma das decisões mais importantes antes do lançamento do AION 2 é a região do servidor. Cinco regiões globais sem bloqueio regional foram confirmadas.",
        sourceNote: "Baseado nos anúncios do stream de desenvolvedor da NCSOFT de 7 de agosto de 2026.",
        keywords: ["AION 2 regiões de servidores", "AION 2 NA West", "AION 2 Europa", "AION 2 Japão", "AION 2 servidor"],
        sections: [
          section("region-breakdown", "As cinco regiões", ["NA West, NA East, América do Sul, Europa Central e Japão. Cada região opera independentemente."]),
          section("no-region-locking", "Sem bloqueio regional", ["Jogadores de todo o mundo podem entrar em qualquer servidor. Amigos de diferentes continentes podem jogar juntos."]),
          section("how-to-choose", "Como escolher", ["A latência é o fator principal. Teste várias regiões durante o acesso antecipado."]),
          section("early-access-tips", "Dicas de acesso antecipado", ["O acesso antecipado começa em 30 de setembro. Use para testar latência e coordenar com amigos."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "РУКОВОДСТВО ПО СЕРВЕРАМ",
        title: "Глобальные серверные регионы AION 2: Полное руководство по серверам NA, Южной Америки, Европы и Японии",
        description: "AION 2 запускается с 5 серверными регионами без региональной блокировки. Всё, что нужно знать о серверах.",
        intro: "Одно из важнейших решений перед запуском AION 2 — выбор серверного региона. Подтверждены пять глобальных регионов без региональной блокировки.",
        sourceNote: "Основано на объявлениях стрима разработчиков NCSOFT от 7 августа 2026 года.",
        keywords: ["AION 2 серверные регионы", "AION 2 NA West", "AION 2 Европа", "AION 2 Япония", "AION 2 сервер"],
        sections: [
          section("region-breakdown", "Пять регионов", ["NA West, NA East, Южная Америка, Центральная Европа и Япония. Каждый регион работает независимо."]),
          section("no-region-locking", "Без региональной блокировки", ["Игроки со всего мира могут присоединиться к любому серверу. Друзья с разных континентов могут играть вместе."]),
          section("how-to-choose", "Как выбрать", ["Задержка — основной фактор. Протестируйте несколько регионов во время раннего доступа."]),
          section("early-access-tips", "Советы по раннему доступу", ["Ранний доступ начинается 30 сентября. Используйте его для тестирования задержки и координации с друзьями."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "伺服器指南",
        title: "AION 2 全球伺服器區域：北美、南美、歐洲和日本伺服器完整指南",
        description: "AION 2 上線時設有5個伺服器區域，無區域鎖定。以下是關於伺服器位置和選擇方法的所有資訊。",
        intro: "在 AION 2 上線前，最重要的決定之一是選擇哪個伺服器區域。已確認五個全球伺服器區域，無區域鎖定。",
        sourceNote: "基於 NCSOFT 2026年8月7日官方全球開發者直播公告。",
        keywords: ["AION 2 伺服器區域", "AION 2 北美西", "AION 2 歐洲伺服器", "AION 2 日本伺服器", "AION 2 伺服器"],
        sections: [
          section("region-breakdown", "五個伺服器區域", ["NA West、NA East、南美、中歐和日本。每個區域獨立運營。"]),
          section("no-region-locking", "無區域鎖定", ["世界各地的玩家都可以加入任何伺服器。不同大陸的朋友可以一起遊戲。"]),
          section("how-to-choose", "如何選擇伺服器", ["延遲是首要因素。在搶先體驗期間測試多個區域的延遲。"]),
          section("early-access-tips", "搶先體驗提示", ["搶先體驗將於9月30日開始。利用這段時間測試延遲並與朋友協調。"]),
        ],
      }),
    },
  },

  // ARTICLE 4: PvP Guide
  {
    section: "guides",
    slug: "aion-2-pvp-guide-battlegrounds-abyss",
    schemaType: "Article",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [mmobombDevStreamSource, ncOfficialSource, aion2hubDevStreamSource],
    heroImage: pvpHero,
    related: [
      { kind: "content", section: "news", slug: "aion-2-first-global-dev-stream-recap" },
      { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
      { kind: "content", section: "guides", slug: "aion-2-global-server-regions-guide" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "PVP GUIDE",
        title: "AION 2 PvP Guide: 10v10 Stat-Normalized Battlegrounds & Abyss Open World PvP",
        description: "AION 2 launches with a 10v10 stat-normalized battleground mode and the open-world Abyss PvP zone. Here's everything you need to know to prepare for PvP at launch.",
        intro: "Player versus Player combat in AION 2 comes in two distinct flavors at launch: structured 10v10 Battlegrounds with stat normalization, and the open-world Abyss zone where faction warfare is always on. Whether you're a competitive PvP veteran or a PvE player curious about dipping your toes into player combat, this guide covers everything you need to know about AION 2's PvP systems at launch.",
        sourceNote: "Based on NCSOFT's August 7 Global Developer Stream announcements, MMOBomb coverage, and supplementary details from AION2Hub. All PvP system details confirmed by NCSOFT's official notice board.",
        keywords: ["AION 2 PvP", "AION 2 battlegrounds", "AION 2 10v10", "AION 2 Abyss PvP", "AION 2 stat normalization"],
        sections: [
          section("battlegrounds", "10v10 Battlegrounds: Stat-Normalized Combat", ["The flagship PvP mode at launch is the 10v10 Battlegrounds. The key feature is stat normalization — all players' gear stats are equalized within the battleground, meaning player skill, class knowledge, and teamwork are the deciding factors rather than gear grinding. This is a player-friendly design that ensures fair competition from day one, regardless of how much time you've spent farming endgame gear.", "The battleground mode is designed as a place to test your class, practice your skills, and compete in a balanced environment. NCSoft positioned it as a training ground for PvP fundamentals as well as a competitive mode in its own right. With 10 players per side, team composition matters — a balanced mix of tanks, healers, and DPS will have a significant advantage over an uncoordinated group."]),
          section("abyss", "The Abyss: Open-World Faction PvP", ["The Abyss is an open-world zone where PvP is always active. Entering the Abyss means you are automatically flagged for PvP against players of the opposing faction. This is the classic Aion experience — large-scale territory control, faction battles, and high-risk, high-reward gameplay. The Abyss contains quests, objectives, and bosses that can only be contested while the zone is active.", "The Abyss operates on a faction-vs-faction basis, meaning Elyos and Asmodians can freely engage each other. NCSoft confirmed that the Abyss will feature objectives that reward coordinated group play. The zone uses a group offset system, meaning different server groups cycle through Abyss content windows to ensure fair access."]),
          section("pvp-flag", "PvP Toggle Flag & Open World PvP", ["Outside the Abyss, players can use a PvP toggle flag to indicate their willingness to engage in combat. This flag is available everywhere except the Abyss, where PvP is mandatory. The toggle system allows players who prefer PvE to level and explore without constant threat, while PvP enthusiasts can signal their readiness for combat.", "This design represents a modern approach to open-world PvP, giving players control over their engagement preferences. The Abyss remains the dedicated zone for players who want the full open-world PvP experience with territory control and faction warfare."]),
          section("preparation", "Preparing for PvP at Launch", ["For battlegrounds, class choice matters significantly. The stat normalization means that class utility, crowd control, and team synergy are more important than raw stats. Classes with strong AoE damage (Sorcerer, Spirit Master), high burst (Assassin), and supportive capabilities (Chanter, Cleric) are likely to be valuable in the 10v10 format.", "For the Abyss, coordination is key. Joining a legion (AION 2's guild system) before launch will give you a group to explore the Abyss with. The zone is dangerous solo but rewarding for organized groups. Start planning your legion's Abyss strategy during Early Access, as the first week of faction warfare will set the tone for the server's PvP meta."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "PvP 指南",
        title: "AION 2 PvP 指南：10v10属性标准化战场与深渊开放世界PvP",
        description: "AION 2 上线时提供10v10属性标准化战场模式和开放世界深渊PvP区域。以下是备战PvP所需的所有信息。",
        intro: "AION 2 上线时提供两种不同风格的玩家对战：结构化10v10属性标准化战场，以及开放世界深渊区域（阵营战争始终开启）。无论你是PvP老手还是对玩家对战感兴趣的PvE玩家，本指南涵盖了你需要了解的关于AION 2 PvP系统的所有信息。",
        sourceNote: "基于 NCSOFT 8月7日全球开发者直播公告、MMOBomb 报道和 AION2Hub 的补充细节。所有PvP系统细节经 NCSOFT 官方公告板确认。",
        keywords: ["AION 2 PvP", "AION 2 战场", "AION 2 10v10", "AION 2 深渊 PvP", "AION 2 属性标准化"],
        sections: [
          section("battlegrounds", "10v10战场：属性标准化对战", ["上线的旗舰PvP模式是10v10战场。关键特性是属性标准化——所有玩家的装备属性在战场内均等化，意味着玩家技能、职业知识和团队合作是决定性因素，而非装备积累。", "战场模式被设计为测试职业、练习技能和在平衡环境中竞争的地方。每方10人，团队组成很重要——坦克、治疗和输出的平衡组合将比无协调的团队有显著优势。"]),
          section("abyss", "深渊：开放世界阵营PvP", ["深渊是一个PvP始终激活的开放世界区域。进入深渊意味着你自动标记为对敌对阵营玩家进行PvP。这是经典的Aion体验——大规模领土控制、阵营战斗和高风险高回报的游戏玩法。", "深渊以阵营对阵营为基础运作，天族和魔族可以自由交战。NCSoft确认深渊将设有奖励协调团队行动的目标。"]),
          section("pvp-flag", "PvP开关标记与开放世界PvP", ["在深渊之外，玩家可以使用PvP开关标记来表示他们愿意参与战斗。此标记在除深渊外的所有地方可用。开关系统让偏好PvE的玩家可以在没有持续威胁的情况下升级和探索。", "这种设计代表了开放世界PvP的现代方法，让玩家控制自己的交战偏好。"]),
          section("preparation", "备战上线PvP", ["对于战场，职业选择很重要。属性标准化意味着职业实用性、群体控制和团队协同比原始属性更重要。", "对于深渊，协调是关键。在上线前加入军团（AION 2的公会系统）将让你有团队一起探索深渊。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "PvP 가이드",
        title: "AION 2 PvP 가이드: 10v10 스탯 균등화 전장과 심연 오픈월드 PvP",
        description: "AION 2는 10v10 스탯 균등화 전장 모드와 오픈월드 심연 PvP 지역으로 출시됩니다. PvP 준비를 위한 모든 정보를 제공합니다.",
        intro: "AION 2의 플레이어 대 플레이어 전투는 출시 시 두 가지 형태로 제공됩니다: 구조화된 10v10 스탯 균등화 전장과, 진영 전쟁이 항상 활성화된 오픈월드 심연 지역입니다.",
        sourceNote: "NCSOFT 8월 7일 글로벌 개발자 스트림 발표, MMOBomb 보도 및 AION2Hub 추가 정보에 기반합니다.",
        keywords: ["AION 2 PvP", "AION 2 전장", "AION 2 10v10", "AION 2 심연 PvP", "AION 2 스탯 균등화"],
        sections: [
          section("battlegrounds", "10v10 전장: 스탯 균등화", ["10v10 전장에서 모든 플레이어의 장비 스탯이 균등화되어, 장비가 아닌 실력이 승부를 결정합니다.", "팀 구성이 중요합니다. 탱크, 힐러, DPS의 균형 잡힌 조합이 유리합니다."]),
          section("abyss", "심연: 오픈월드 진영 PvP", ["심연은 PvP가 항상 활성화된 오픈월드 지역입니다. 영토 제어, 진영 전투, 하이 리스크 하이 리턴 게임플레이를 제공합니다."]),
          section("pvp-flag", "PvP 토글 플래그", ["심연 외부에서 PvP 토글 플래그를 사용할 수 있습니다. PvE 선호 플레이어는 지속적인 위협 없이 레벨업할 수 있습니다."]),
          section("preparation", "PvP 준비", ["전장에서는 클래스 선택이 중요합니다. 심연에서는 군단 가입과 팀 협력이 핵심입니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "GUIDE PVP",
        title: "Guide PvP AION 2 : Champs de bataille 10v10 à statistiques normalisées et PvP monde ouvert dans l'Abîme",
        description: "AION 2 propose un mode champ de bataille 10v10 normalisé et la zone PvP monde ouvert de l'Abîme. Tout pour préparer le PvP.",
        intro: "Le PvP dans AION 2 se décline en deux formes au lancement : champs de bataille 10v10 et zone ouverte de l'Abîme. Ce guide couvre tout ce qu'il faut savoir.",
        sourceNote: "Basé sur les annonces du stream développeur NCSOFT du 7 août 2026.",
        keywords: ["AION 2 PvP", "AION 2 champ de bataille", "AION 2 10v10", "AION 2 Abîme PvP"],
        sections: [
          section("battlegrounds", "Champs de bataille 10v10", ["Les statistiques sont normalisées, la compétence prime sur l'équipement. La composition d'équipe est cruciale."]),
          section("abyss", "L'Abîme : PvP monde ouvert", ["Zone ouverte où le PvP est toujours actif. Contrôle territorial et combats de factions."]),
          section("pvp-flag", "Drapeau PvP", ["Activez le PvP en dehors de l'Abîme via un drapeau. Les joueurs PvE peuvent explorer sans risque."]),
          section("preparation", "Préparation", ["Le choix de classe compte dans les champs de bataille. Rejoignez une légion pour l'Abîme."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "PVP-LEITFADEN",
        title: "AION 2 PvP-Guide: 10v10-stat-normalisierte Schlachtfelder und Abyss-Open-World-PvP",
        description: "AION 2 bietet einen 10v10-stat-normalisierten Schlachtfeldmodus und die Open-World-PvP-Zone Abgrund. Alles zur PvP-Vorbereitung.",
        intro: "PvP in AION 2 gibt es in zwei Formen: strukturierte 10v10-Schlachtfelder und die Open-World-Abgrundzone. Dieser Leitfaden deckt alles ab.",
        sourceNote: "Basierend auf NCSOFTs Entwickler-Stream-Ankündigungen vom 7. August 2026.",
        keywords: ["AION 2 PvP", "AION 2 Schlachtfeld", "AION 2 10v10", "AION 2 Abgrund PvP"],
        sections: [
          section("battlegrounds", "10v10-Schlachtfelder", ["Statusnormalisierung stellt sicher, dass Können über Ausrüstung entscheidet. Teamzusammensetzung ist entscheidend."]),
          section("abyss", "Der Abgrund: Open-World-PvP", ["Open-World-Zone mit ständig aktivem PvP. Gebietskontrolle und Fraktionskämpfe."]),
          section("pvp-flag", "PvP-Schalter", ["PvP-Schalter außerhalb des Abgrunds. PvE-Spieler können ohne ständige Bedrohung erkunden."]),
          section("preparation", "Vorbereitung", ["Klassenwahl ist auf Schlachtfeldern wichtig. Für den Abgrund einer Legion beitreten."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "GUÍA PVP",
        title: "Guía PvP de AION 2: Campos de batalla 10v10 con estadísticas normalizadas y PvP de mundo abierto en el Abismo",
        description: "AION 2 ofrece un modo de campo de batalla 10v10 normalizado y la zona PvP de mundo abierto del Abismo. Todo para preparar el PvP.",
        intro: "El PvP en AION 2 viene en dos formas: campos de batalla 10v10 y la zona del Abismo. Esta guía cubre todo lo necesario.",
        sourceNote: "Basado en los anuncios del stream de desarrollador de NCSOFT del 7 de agosto de 2026.",
        keywords: ["AION 2 PvP", "AION 2 campo de batalla", "AION 2 10v10", "AION 2 Abismo PvP"],
        sections: [
          section("battlegrounds", "Campos de batalla 10v10", ["Estadísticas normalizadas: la habilidad prima sobre el equipo. La composición del equipo es crucial."]),
          section("abyss", "El Abismo: PvP mundo abierto", ["Zona abierta con PvP siempre activo. Control territorial y combate entre facciones."]),
          section("pvp-flag", "Bandera PvP", ["Activa PvP fuera del Abismo. Los jugadores PvE pueden explorar sin amenaza constante."]),
          section("preparation", "Preparación", ["La elección de clase importa en los campos de batalla. Únete a una legión para el Abismo."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "PvP ガイド",
        title: "AION 2 PvP ガイド：10v10 ステータス標準化バトルグラウンドとアビスオープンワールドPvP",
        description: "AION 2 は10v10ステータス標準化バトルグラウンドモードとオープンワールドアビスPvPゾーンを提供します。PvP準備のためのすべての情報。",
        intro: "AION 2 のPvPはローンチ時に2つの形式で提供されます：構造化10v10バトルグラウンドと、アビスのオープンワールドゾーンです。",
        sourceNote: "NCSOFT 2026年8月7日開発者ストリーム発表に基づきます。",
        keywords: ["AION 2 PvP", "AION 2 バトルグラウンド", "AION 2 10v10", "AION 2 アビス PvP"],
        sections: [
          section("battlegrounds", "10v10 バトルグラウンド", ["ステータス標準化により、装備ではなくスキルが勝敗を決します。チーム構成が重要です。"]),
          section("abyss", "アビス：オープンワールドPvP", ["PvPが常時有効なオープンワールドゾーン。領土コントロールと陣営戦闘。"]),
          section("pvp-flag", "PvP トグルフラグ", ["アビス以外でPvPトグルフラグを使用可能。PvEプレイヤーは脅威なく探索できます。"]),
          section("preparation", "準備", ["バトルグラウンドではクラス選択が重要。アビスではレギオンに参加しましょう。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "GUIA PVP",
        title: "Guia PvP de AION 2: Campos de batalha 10v10 com estatísticas normalizadas e PvP de mundo aberto no Abismo",
        description: "AION 2 oferece um modo de campo de batalha 10v10 normalizado e a zona PvP de mundo aberto do Abismo. Tudo para preparar o PvP.",
        intro: "O PvP no AION 2 vem em duas formas: campos de batalha 10v10 e a zona do Abismo. Este guia cobre tudo que você precisa saber.",
        sourceNote: "Baseado nos anúncios do stream de desenvolvedor da NCSOFT de 7 de agosto de 2026.",
        keywords: ["AION 2 PvP", "AION 2 campo de batalha", "AION 2 10v10", "AION 2 Abismo PvP"],
        sections: [
          section("battlegrounds", "Campos de batalha 10v10", ["Estatísticas normalizadas: habilidade supera equipamento. A composição da equipe é crucial."]),
          section("abyss", "O Abismo: PvP mundo aberto", ["Zona aberta com PvP sempre ativo. Controle territorial e combate entre facções."]),
          section("pvp-flag", "Bandeira PvP", ["Ative PvP fora do Abismo. Jogadores PvE podem explorar sem ameaça constante."]),
          section("preparation", "Preparação", ["A escolha de classe é importante nos campos de batalha. Junte-se a uma legião para o Abismo."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "РУКОВОДСТВО ПО PVP",
        title: "Руководство по PvP в AION 2: Поля сражений 10v10 с нормализацией и PvP в открытом мире Бездны",
        description: "AION 2 предлагает режим полей сражений 10v10 с нормализацией и открытую PvP-зону Бездны. Всё для подготовки к PvP.",
        intro: "PvP в AION 2 представлен в двух формах: структурированные поля сражений 10v10 и открытая зона Бездны. Это руководство охватывает всё необходимое.",
        sourceNote: "Основано на объявлениях стрима разработчиков NCSOFT от 7 августа 2026 года.",
        keywords: ["AION 2 PvP", "AION 2 поле сражения", "AION 2 10v10", "AION 2 Бездна PvP"],
        sections: [
          section("battlegrounds", "Поля сражений 10v10", ["Нормализация характеристик: навык важнее экипировки. Состав команды имеет решающее значение."]),
          section("abyss", "Бездна: PvP в открытом мире", ["Открытая зона с постоянно активным PvP. Контроль территории и сражения фракций."]),
          section("pvp-flag", "Флаг PvP", ["Включайте PvP вне Бездны. PvE-игроки могут исследовать мир без угрозы."]),
          section("preparation", "Подготовка", ["Выбор класса важен на полях сражений. Для Бездны вступите в легион."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "PvP 指南",
        title: "AION 2 PvP 指南：10v10屬性標準化戰場與深淵開放世界PvP",
        description: "AION 2 上線時提供10v10屬性標準化戰場模式和開放世界深淵PvP區域。以下是備戰PvP所需的所有資訊。",
        intro: "AION 2 上線時提供兩種不同風格的玩家對戰：結構化10v10屬性標準化戰場，以及開放世界深淵區域。本指南涵蓋了你需要了解的所有PvP系統資訊。",
        sourceNote: "基於 NCSOFT 8月7日全球開發者直播公告。",
        keywords: ["AION 2 PvP", "AION 2 戰場", "AION 2 10v10", "AION 2 深淵 PvP"],
        sections: [
          section("battlegrounds", "10v10戰場：屬性標準化", ["屬性標準化確保技能重於裝備。團隊組成至關重要。"]),
          section("abyss", "深淵：開放世界PvP", ["PvP始終激活的開放世界區域。領土控制和陣營戰鬥。"]),
          section("pvp-flag", "PvP 開關標記", ["在深淵外使用PvP開關標記。PvE玩家可以在沒有持續威脅的情況下探索。"]),
          section("preparation", "備戰PvP", ["戰場中職業選擇很重要。加入軍團以探索深淵。"]),
        ],
      }),
    },
  },

  // ARTICLE 5: Launch Classes Guide
  {
    section: "guides",
    slug: "aion-2-launch-classes-guide",
    schemaType: "Article",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [mmobombDevStreamSource, ncOfficialSource, steamSource],
    heroImage: classesHero,
    related: [
      { kind: "content", section: "news", slug: "aion-2-first-global-dev-stream-recap" },
      { kind: "content", section: "guides", slug: "aion-2-pvp-guide-battlegrounds-abyss" },
      { kind: "content", section: "guides", slug: "aion-2-global-server-regions-guide" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 6, {
        eyebrow: "CLASS GUIDE",
        title: "AION 2 Launch Classes: Complete Guide to All 8 Classes, Trinity Roles & Party Composition",
        description: "AION 2 launches with 8 classes spanning the Tank/DPS/Healer trinity. From Gladiator to Spirit Master, here's everything you need to know about each class, their roles, and how to build effective parties for 5-player expeditions and 10-player raids.",
        intro: "Choosing your class is one of the most important decisions in AION 2. At launch, NCSoft has confirmed 8 classes organized around the classic MMORPG trinity of Tank, DPS (damage), and Healer. With 5-player expeditions and 10-player raids, understanding how classes fit together is essential for group content. This guide breaks down every class, their role, and how to build effective parties.",
        sourceNote: "Based on NCSOFT's August 7 Global Developer Stream announcements, MMOBomb coverage of class details, and the Steam store page. All class roles confirmed by NCSOFT's official notice board.",
        keywords: ["AION 2 classes", "AION 2 Gladiator", "AION 2 Templar", "AION 2 Spirit Master", "AION 2 party composition"],
        sections: [
          section("tanks", "Tank Classes: Gladiator & Templar", ["The Gladiator is a frontline heavy-damage tank. Unlike traditional tanks that focus purely on defense, the Gladiator deals significant damage while maintaining threat on enemies. This makes them excellent for solo play and group content alike. Gladiators excel at holding multiple enemies' attention and cleaving through groups.", "The Templar is the defensive specialist, focusing on blocking and buffing. Templars are the classic tank archetype — they excel at mitigating damage, protecting party members, and maintaining boss aggro through shield-based abilities and defensive buffs. For groups tackling difficult content, a Templar provides the highest survivability."]),
          section("dps", "DPS Classes: Assassin, Ranger, Sorcerer & Spirit Master", ["The Assassin is a melee burst DPS class. Stealth, backstabs, and positional damage are their specialty. Assassins excel at single-target elimination and are ideal for PvP and boss encounters where focused damage is needed. The Ranger is a ranged physical DPS class using bows. They provide consistent damage from a distance with mobility and crowd control capabilities.", "The Sorcerer is a ranged magical DPS class wielding powerful spell-casting abilities. They excel at AoE damage and are essential for clearing groups of enemies in expeditions. The Spirit Master is a unique DPS class that brings their own elemental spirit summon along. The spirit fights alongside the Spirit Master, providing additional damage and utility. This pet-based class offers solo players a significant advantage and brings unique group utility."]),
          section("healers", "Healer Classes: Cleric & Chanter", ["The Cleric is the traditional healer class. They excel at direct healing, cleansing debuffs, and keeping the party alive through intense encounters. In AION 2, the Cleric is essential for challenging content where sustained healing throughput is required. Every serious raid group will want at least one Cleric.", "The Chanter is a hybrid healer responsible for buffs and heavy damage. While they can heal, their primary value comes from the powerful buffs they provide to the party and their ability to contribute meaningful damage. A well-played Chanter significantly increases the entire party's effectiveness. For groups with a Cleric already covering healing, the Chanter provides excellent complementary support."]),
          section("party-composition", "Party Composition Tips", ["For 5-player expeditions, a balanced party should include at least one tank, one healer, and three DPS. The ideal composition would be one tank (Gladiator or Templar), one primary healer (Cleric), and a mix of DPS classes. Having a Chanter as one of the DPS slots provides excellent party buffs. For 10-player raids, the party splits into two groups of five initially, then reunites for the final boss. Each group should have its own tank and healer.", "For new players, the Gladiator (tank with damage) and Spirit Master (pet-based DPS) are excellent solo-friendly choices. The Cleric is the easiest healer to start with due to straightforward healing mechanics. The Assassin and Sorcerer require more positional and mechanical awareness but reward skilled play with high damage output."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
        eyebrow: "职业指南",
        title: "AION 2 上线职业：全部8个职业、三角角色与队伍配置完整指南",
        description: "AION 2 上线时提供8个职业，涵盖坦克/输出/治疗三角体系。从角斗士到精灵使，以下是每个职业的详细信息、角色定位以及如何为5人副本和10人团本构建有效队伍。",
        intro: "选择职业是 AION 2 中最重要的决定之一。NCSoft 已确认上线时提供8个职业，围绕经典的MMORPG坦克/输出/治疗三角体系组织。随着5人副本和10人团本的推出，了解职业如何组合对于团队内容至关重要。",
        sourceNote: "基于 NCSOFT 8月7日全球开发者直播公告、MMOBomb 的职业细节报道和 Steam 商店页面。所有职业角色经 NCSOFT 官方公告板确认。",
        keywords: ["AION 2 职业", "AION 2 角斗士", "AION 2 圣殿骑士", "AION 2 精灵使", "AION 2 队伍配置"],
        sections: [
          section("tanks", "坦克职业：角斗士与圣殿骑士", ["角斗士是前线高伤害坦克。与传统专注于防御的坦克不同，角斗士在维持对敌人的威胁的同时造成可观伤害。这使他们同样适合单人游戏和团队内容。", "圣殿骑士是防御专家，专注于格挡和增益。他们是经典坦克原型——擅长减轻伤害、保护队友，通过盾牌技能和防御增益维持首领仇恨。"]),
          section("dps", "输出职业：刺客、游侠、术士与精灵使", ["刺客是近战爆发输出职业。潜行、背刺和位置伤害是他们的专长。刺客擅长单体爆发消灭，是PvP和需要集中伤害的首领战的理想选择。", "游侠是远程物理输出职业，使用弓箭。他们提供来自远距离的持续伤害，具有机动性和群体控制能力。术士是远程魔法输出职业，施展强大的法术。他们擅长群体伤害。精灵使是独特的输出职业，自带元素精灵。精灵与精灵使并肩作战，提供额外伤害和实用性。"]),
          section("healers", "治疗职业：牧师与吟游星", ["牧师是传统治疗职业。他们擅长直接治疗、净化减益效果，在激烈战斗中维持队伍生存。每个认真的团本队伍都需要至少一个牧师。", "吟游星是混合治疗职业，负责增益和重伤害。虽然他们可以治疗，但主要价值来自为队伍提供的强大增益和贡献有意义伤害的能力。"]),
          section("party-composition", "队伍配置建议", ["对于5人副本，平衡队伍应至少包括一个坦克、一个治疗和三个输出。理想配置是一个坦克、一个主治疗和混合输出职业。", "对于新手，角斗士（有伤害的坦克）和精灵使（宠物型输出）是优秀的单人友好选择。牧师是最容易上手的治疗职业。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 6, {
        eyebrow: "클래스 가이드",
        title: "AION 2 출시 클래스: 8개 클래스, 삼위일체 역할 및 파티 구성 완벽 가이드",
        description: "AION 2는 탱크/DPS/힐러 삼위일체를 아우르는 8개 클래스로 출시됩니다. 글래디에이터부터 스피릿 마스터까지, 각 클래스와 효과적인 파티 구성 방법을 설명합니다.",
        intro: "클래스 선택은 AION 2에서 가장 중요한 결정 중 하나입니다. NCSoft는 탱크, DPS, 힐러의 클래식 MMORPG 삼위일체를 중심으로 8개 클래스를 확인했습니다. 5인 원정대와 10인 레이드에서 클래스가 어떻게 조화를 이루는지 이해하는 것이 필수적입니다.",
        sourceNote: "NCSOFT 8월 7일 글로벌 개발자 스트림 발표, MMOBomb 클래스 세부 정보 보도 및 Steam 스토어 페이지에 기반합니다.",
        keywords: ["AION 2 클래스", "AION 2 글래디에이터", "AION 2 템플러", "AION 2 스피릿 마스터", "AION 2 파티 구성"],
        sections: [
          section("tanks", "탱크 클래스: 글래디에이터 & 템플러", ["글래디에이터는 전선에서 높은 피해를 입히는 탱크입니다. 순수 방어에 집중하는 전통적 탱크와 달리, 글래디에이터는 적의 어그로를 유지하면서 상당한 피해를 줍니다.", "템플러는 방어 전문가로, 블로킹과 버프에 중점을 둡니다. 방패 기반 능력과 방어 버프를 통해 피해를 완화하고 파티원을 보호합니다."]),
          section("dps", "DPS 클래스: 어쌔신, 레인저, 소서러 & 스피릿 마스터", ["어쌔신은 근접 폭발 DPS 클래스입니다. 은신, 백스탭, 위치 기반 피해가 특기입니다. 레인저는 활을 사용하는 원거리 물리 DPS입니다.", "소서러는 강력한 주문 시전 능력을 가진 원거리 마법 DPS입니다. 스피릿 마스터는 정령 소환수를 소환하는 독특한 DPS 클래스입니다."]),
          section("healers", "힐러 클래스: 클레릭 & 챈터", ["클레릭은 전통적인 힐러 클래스로, 직접 치유와 디버프 제거에 특화되어 있습니다. 챈터는 버프와 강력한 피해를 담당하는 하이브리드 힐러입니다."]),
          section("party-composition", "파티 구성 팁", ["5인 원정대에는 최소 1탱크, 1힐러, 3DPS가 필요합니다. 이상적인 구성은 1탱크, 1클레릭, 다양한 DPS 조합입니다.", "초보자에게는 글래디에이터와 스피릿 마스터가 솔로 친화적 선택입니다. 클레릭은 가장 쉬운 힐러입니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 6, {
        eyebrow: "GUIDE DES CLASSES",
        title: "Classes de lancement d'AION 2 : Guide complet des 8 classes, rôles et composition d'équipe",
        description: "AION 2 est lancé avec 8 classes couvrant la trinité Tank/DPS/Soigneur. De Gladiator à Spirit Master, tout sur chaque classe et la composition d'équipe.",
        intro: "Le choix de la classe est l'une des décisions les plus importantes dans AION 2. Huit classes sont confirmées autour de la trinité Tank/DPS/Soigneur, avec des expéditions à 5 et des raids à 10 joueurs.",
        sourceNote: "Basé sur les annonces du stream développeur NCSOFT du 7 août 2026 et la couverture MMOBomb.",
        keywords: ["AION 2 classes", "AION 2 Gladiator", "AION 2 Templar", "AION 2 Spirit Master", "AION 2 composition d'équipe"],
        sections: [
          section("tanks", "Tanks : Gladiator & Templar", ["Le Gladiator est un tank à gros dégâts de première ligne. Le Templar est le spécialiste défensif, axé sur le blocage et les buffs."]),
          section("dps", "DPS : Assassin, Ranger, Sorcerer & Spirit Master", ["Assassin (mêlée burst), Ranger (distance physique), Sorcerer (magie distance), Spirit Master (invocateur d'élémentaire)."]),
          section("healers", "Soigneurs : Cleric & Chanter", ["Le Cleric est le soigneur traditionnel. Le Chanter est un soigneur hybride spécialisé dans les buffs et les dégâts."]),
          section("party-composition", "Composition d'équipe", ["Pour les expéditions à 5 : 1 tank, 1 soigneur, 3 DPS. Pour les raids à 10 : deux groupes de 5 avec leur propre tank et soigneur."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 6, {
        eyebrow: "KLASSEN-LEITFADEN",
        title: "AION 2 Launch-Klassen: Vollständiger Leitfaden zu allen 8 Klassen, Rollen und Gruppenkomposition",
        description: "AION 2 startet mit 8 Klassen in der Tank/DPS/Heiler-Trinität. Von Gladiator bis Spirit Master, alles über jede Klasse und Gruppenbildung.",
        intro: "Die Klassenwahl ist eine der wichtigsten Entscheidungen in AION 2. Acht Klassen in der Tank/DPS/Heiler-Trinität sind bestätigt, mit 5-Spieler-Expeditionen und 10-Spieler-Raids.",
        sourceNote: "Basierend auf NCSOFTs Entwickler-Stream-Ankündigungen vom 7. August 2026 und MMOBomb-Berichterstattung.",
        keywords: ["AION 2 Klassen", "AION 2 Gladiator", "AION 2 Templar", "AION 2 Spirit Master", "AION 2 Gruppenkomposition"],
        sections: [
          section("tanks", "Tanks: Gladiator & Templar", ["Der Gladiator ist ein Frontline-Tank mit hohem Schaden. Der Templar ist der defensive Spezialist."]),
          section("dps", "DPS: Assassin, Ranger, Sorcerer & Spirit Master", ["Assassin (Nahkampf-Burst), Ranger (Fernkampf-physisch), Sorcerer (Fernkampf-Magie), Spirit Master (Elementar-Beschwörer)."]),
          section("healers", "Heiler: Cleric & Chanter", ["Der Cleric ist der traditionelle Heiler. Der Chanter ist ein Hybrid-Heiler für Buffs und Schaden."]),
          section("party-composition", "Gruppenkomposition", ["Für 5-Spieler-Expeditionen: 1 Tank, 1 Heiler, 3 DPS. Für 10-Spieler-Raids: zwei 5er-Gruppen."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 6, {
        eyebrow: "GUÍA DE CLASES",
        title: "Clases de lanzamiento de AION 2: Guía completa de las 8 clases, roles y composición de grupo",
        description: "AION 2 se lanza con 8 clases en la trinidad Tanque/DPS/Curandero. De Gladiator a Spirit Master, todo sobre cada clase y la composición de grupo.",
        intro: "La elección de clase es una de las decisiones más importantes en AION 2. Ocho clases en la trinidad Tanque/DPS/Curandero están confirmadas, con expediciones de 5 y raids de 10 jugadores.",
        sourceNote: "Basado en los anuncios del stream de desarrollador de NCSOFT del 7 de agosto de 2026 y la cobertura de MMOBomb.",
        keywords: ["AION 2 clases", "AION 2 Gladiator", "AION 2 Templar", "AION 2 Spirit Master", "AION 2 composición de grupo"],
        sections: [
          section("tanks", "Tanques: Gladiator & Templar", ["El Gladiator es un tanque de primera línea con alto daño. El Templar es el especialista defensivo."]),
          section("dps", "DPS: Assassin, Ranger, Sorcerer & Spirit Master", ["Assassin (ráfaga cuerpo a cuerpo), Ranger (distancia física), Sorcerer (magia distancia), Spirit Master (invocador elemental)."]),
          section("healers", "Curanderos: Cleric & Chanter", ["El Cleric es el curandero tradicional. El Chanter es un curandero híbrido de buffs y daño."]),
          section("party-composition", "Composición de grupo", ["Para expediciones de 5: 1 tanque, 1 curandero, 3 DPS. Para raids de 10: dos grupos de 5."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 6, {
        eyebrow: "クラスガイド",
        title: "AION 2 ローンチクラス：全8クラス、三役とパーティー構成の完全ガイド",
        description: "AION 2 はタンク/DPS/ヒーラーの三位一体をカバーする8つのクラスでローンチ。グラディエーターからスピリットマスターまで、各クラスと効果的なパーティー編成を解説。",
        intro: "クラス選択は AION 2 で最も重要な決定の一つです。8つのクラスがタンク/DPS/ヒーラーの三位一体で確認され、5人遠征隊と10人レイドが提供されます。",
        sourceNote: "NCSOFT 2026年8月7日開発者ストリーム発表、MMOBomb 報道に基づきます。",
        keywords: ["AION 2 クラス", "AION 2 グラディエーター", "AION 2 テンプラー", "AION 2 スピリットマスター", "AION 2 パーティー構成"],
        sections: [
          section("tanks", "タンク：グラディエーター & テンプラー", ["グラディエーターは前線で高ダメージを与えるタンク。テンプラーは防御のスペシャリスト。"]),
          section("dps", "DPS：アサシン、レンジャー、ソーサラー & スピリットマスター", ["アサシン（近接バースト）、レンジャー（遠距離物理）、ソーサラー（遠距離魔法）、スピリットマスター（精霊召喚）。"]),
          section("healers", "ヒーラー：クレリック & チャンター", ["クレリックは伝統的なヒーラー。チャンターはバフとダメージのハイブリッドヒーラー。"]),
          section("party-composition", "パーティー構成", ["5人遠征隊：1タンク、1ヒーラー、3DPS。10人レイド：5人ずつの2グループ。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 6, {
        eyebrow: "GUIA DE CLASSES",
        title: "Classes de lançamento do AION 2: Guia completo das 8 classes, funções e composição de grupo",
        description: "AION 2 é lançado com 8 classes na trindade Tank/DPS/Healer. De Gladiator a Spirit Master, tudo sobre cada classe e composição de grupo.",
        intro: "A escolha da classe é uma das decisões mais importantes no AION 2. Oito classes na trindade Tank/DPS/Healer estão confirmadas, com expedições de 5 e raids de 10 jogadores.",
        sourceNote: "Baseado nos anúncios do stream de desenvolvedor da NCSOFT de 7 de agosto de 2026 e na cobertura da MMOBomb.",
        keywords: ["AION 2 classes", "AION 2 Gladiator", "AION 2 Templar", "AION 2 Spirit Master", "AION 2 composição de grupo"],
        sections: [
          section("tanks", "Tanks: Gladiator & Templar", ["O Gladiator é um tank de linha de frente com alto dano. O Templar é o especialista defensivo."]),
          section("dps", "DPS: Assassin, Ranger, Sorcerer & Spirit Master", ["Assassin (rajada corpo a corpo), Ranger (distância física), Sorcerer (magia distância), Spirit Master (invocador elemental)."]),
          section("healers", "Healers: Cleric & Chanter", ["O Cleric é o healer tradicional. O Chanter é um healer híbrido de buffs e dano."]),
          section("party-composition", "Composição de grupo", ["Para expedições de 5: 1 tank, 1 healer, 3 DPS. Para raids de 10: dois grupos de 5."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 6, {
        eyebrow: "РУКОВОДСТВО ПО КЛАССАМ",
        title: "Классы запуска AION 2: Полное руководство по всем 8 классам, ролям и составу группы",
        description: "AION 2 запускается с 8 классами в триаде Танк/ДПС/Хилер. От Gladiator до Spirit Master — всё о каждом классе и составе группы.",
        intro: "Выбор класса — одно из важнейших решений в AION 2. Восемь классов в триаде Танк/ДПС/Хилер подтверждены, с экспедициями на 5 и рейдами на 10 игроков.",
        sourceNote: "Основано на объявлениях стрима разработчиков NCSOFT от 7 августа 2026 года и освещении MMOBomb.",
        keywords: ["AION 2 классы", "AION 2 Gladiator", "AION 2 Templar", "AION 2 Spirit Master", "AION 2 состав группы"],
        sections: [
          section("tanks", "Танки: Gladiator & Templar", ["Gladiator — фронтовой танк с высоким уроном. Templar — защитный специалист."]),
          section("dps", "ДПС: Assassin, Ranger, Sorcerer & Spirit Master", ["Assassin (ближний бой), Ranger (дальний физический), Sorcerer (дальняя магия), Spirit Master (призыватель элементаля)."]),
          section("healers", "Хилеры: Cleric & Chanter", ["Cleric — традиционный хилер. Chanter — гибридный хилер с баффами и уроном."]),
          section("party-composition", "Состав группы", ["Для экспедиций на 5: 1 танк, 1 хилер, 3 ДПС. Для рейдов на 10: две группы по 5."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
        eyebrow: "職業指南",
        title: "AION 2 上線職業：全部8個職業、三角角色與隊伍配置完整指南",
        description: "AION 2 上線時提供8個職業，涵蓋坦克/輸出/治療三角體系。從角鬥士到精靈使，每個職業的詳細資訊和隊伍配置建議。",
        intro: "選擇職業是 AION 2 中最重要的決定之一。8個職業圍繞坦克/輸出/治療三角體系組織，提供5人副本和10人團本。",
        sourceNote: "基於 NCSOFT 8月7日全球開發者直播公告和 MMOBomb 報道。",
        keywords: ["AION 2 職業", "AION 2 角鬥士", "AION 2 聖殿騎士", "AION 2 精靈使", "AION 2 隊伍配置"],
        sections: [
          section("tanks", "坦克職業：角鬥士與聖殿騎士", ["角鬥士是前線高傷害坦克。聖殿騎士是防禦專家，專注於格擋和增益。"]),
          section("dps", "輸出職業：刺客、遊俠、術士與精靈使", ["刺客（近戰爆發）、遊俠（遠程物理）、術士（遠程魔法）、精靈使（元素精靈召喚）。"]),
          section("healers", "治療職業：牧師與吟遊星", ["牧師是傳統治療職業。吟遊星是混合治療職業，負責增益和傷害。"]),
          section("party-composition", "隊伍配置建議", ["5人副本：1坦克、1治療、3輸出。10人團本：兩個5人小組。"]),
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];

export const trendingAugust15GeneratedEditorialEntries = {
  "news/aion-2-first-global-dev-stream-recap": {},
  "news/aion-2-founders-packs-30-day-membership": {},
  "guides/aion-2-global-server-regions-guide": {},
  "guides/aion-2-pvp-guide-battlegrounds-abyss": {},
  "guides/aion-2-launch-classes-guide": {},
} as const;