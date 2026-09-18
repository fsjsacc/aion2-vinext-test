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
  ko: { backLabel: "뉴스로 돌아가기", contentsLabel: "이번 소식의 핵심", publishedLabel: "게시", updatedLabel: "최종 확인", relatedLabel: "관련 글" },
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

const aug12PatchUrl = "https://aion2t.com/news/38";
const aug12PatchSource: ContentSource = {
  id: "aion2t-august-12-update",
  kind: "third-party", publisher: "AION2T",
  label: "AION2 August 12 Update — Corroded Deus Research Base, Noiran's Hidden Legacy, Healer Nerf",
  url: aug12PatchUrl,
  publishedAt: "2026-08-12",
  retrievedAt: "2026-08-12",
  verifiedAt: "2026-08-12",
  localizations: localizations({
    "zh-hans": "AION2 8月12日更新：侵蚀的德乌斯研究基地、尼奥兰的隐藏遗产、治疗削弱",
    en: "AION2 August 12 Update — Corroded Deus Research Base, Noiran's Hidden Legacy, Healer Nerf",
    fr: "Mise à jour AION2 du 12 août — Base de recherche Deus corrodée, Héritage caché de Noiran, Nerf des soigneurs",
    de: "AION2 12. August Update — Korrodierte Deus-Forschungsbasis, Noirans verborgenes Erbe, Heiler-Nerf",
    es: "Actualización de AION2 del 12 de agosto — Base de investigación Deus corroída, Legado oculto de Noiran, Nerfeo a curadores",
    ja: "AION2 8月12日アップデート — 腐食されたデウス研究基地、ノイランの隠された遺産、ヒーラーナーフ",
    "pt-br": "Atualização de 12 de agosto de AION2 — Base de Pesquisa Deus Corroída, Legado Oculto de Noiran, Nerf em Curandeiros",
    ru: "Обновление AION2 от 12 августа — Исследовательская база Дейус, Скрытое наследие Нойрана, Нерф хилов",
    ko: "AION2 8월 12일 업데이트 — 부식된 데우스 연구 기지, 노이란의 숨겨진 유산, 힐러 너프",
    "zh-hant": "AION2 8月12日更新：侵蝕的德烏斯研究基地、尼奧蘭的隱藏遺產、治療削弱",
  }, aug12PatchUrl),
};

const invenDevstreamUrl = "https://www.invenglobal.com/articles/21046/aion2-devstream-august-2026-update-preview";
const invenDevstreamSource: ContentSource = {
  id: "inven-august-devstream-2026-08-11",
  kind: "third-party", publisher: "Inven Global",
  label: "AION2 Devstream August 2026 Update Preview — Housing, New Class, 9月 Raid",
  url: invenDevstreamUrl,
  publishedAt: "2026-08-11",
  retrievedAt: "2026-08-12",
  verifiedAt: "2026-08-12",
  localizations: localizations({
    "zh-hans": "AION2 8月Devstream更新预览 — Housing、新职业、9月Raid",
    en: "AION2 Devstream August 2026 Update Preview — Housing, New Class, Raid",
    fr: "Aperçu de la mise à jour Devstream d'août 2026 — Housing, Nouvelle classe, Raid",
    de: "AION2 Devstream August 2026 Vorschau — Housing, Neue Klasse, Raid",
    es: "Avance de la actualización Devstream de agosto de 2026 — Housing, Nueva clase, Raid",
    ja: "AION2 8月Devstreamアップデートプレビュー — ハウジング、新クラス、レイド",
    "pt-br": "Prévia da atualização Devstream de agosto de 2026 — Housing, Nova classe, Raid",
    ru: "Devstream AION2 августа 2026 — Housing, Новый класс, Рейд",
    ko: "AION2 8월 Devstream 업데이트 프리뷰 — 하우징, 신규 클래스, 레이드",
    "zh-hant": "AION2 8月Devstream更新預覽 — Housing、新職業、9月Raid",
  }, invenDevstreamUrl),
};

const jpLaunchUrl = "https://aion2.ncsoft.jp/en/";
const jpLaunchSource: ContentSource = {
  id: "ncsoft-jp-global-launch-2026-09",
  kind: "official", publisher: "NCsoft Japan",
  label: "AION2 Global Launch confirmed for September 2026 on NCsoft Japan site",
  url: jpLaunchUrl,
  publishedAt: "2026-08-10",
  retrievedAt: "2026-08-12",
  verifiedAt: "2026-08-12",
  localizations: localizations({
    "zh-hans": "AION2 全球版 2026 年 9 月上线确认（NCsoft 日本官网）",
    en: "AION2 Global Launch confirmed for September 2026 on NCsoft Japan site",
    fr: "Lancement mondial d'AION2 confirmé pour septembre 2026 sur le site NCsoft Japon",
    de: "AION2 globaler Start für September 2026 bestätigt auf NCsoft Japan",
    es: "Lanzamiento global de AION2 confirmado para septiembre de 2026 en el sitio de NCsoft Japón",
    ja: "AION2 グローバル版 2026年9月リリース確定（NCsoft Japan サイト）",
    "pt-br": "Lançamento global do AION2 confirmado para setembro de 2026 no site NCsoft Japan",
    ru: "Глобальный запуск AION2 подтверждён на сентябрь 2026 на сайте NCsoft Japan",
    ko: "AION2 글로벌 출시 2026년 9월 확정 (NCsoft Japan 사이트)",
    "zh-hant": "AION2 全球版 2026 年 9 月上線確認（NCsoft 日本官網）",
  }, jpLaunchUrl),
};

/* ------------------------------------------------------------------ */
/* Hero images                                                         */
/* ------------------------------------------------------------------ */

const patchHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 8月12日更新宣传图", caption: "NC 官方配图；8月12日更新包含新远征副本、治疗削弱等。" },
    en: { alt: "AION2 August 12 update artwork", caption: "Official NC artwork; August 12 update includes new expedition dungeons, healer nerfs, and more." },
    fr: { alt: "Visuel de la mise à jour du 12 août d'AION2", caption: "Visuel officiel NC ; la mise à jour inclut de nouveaux donjons d'expédition, des nerfs de soigneurs." },
    de: { alt: "AION2 12. August Update Artwork", caption: "Offizielles NC-Artwork; Update mit neuen Expeditionsdungeons, Heiler-Nerfs." },
    es: { alt: "Arte de la actualización del 12 de agosto de AION2", caption: "Arte oficial de NC; la actualización incluye nuevas mazmorras de expedición, nerfeos a curadores." },
    ja: { alt: "AION2 8月12日アップデート画像", caption: "NC 公式画像。8月12日アップデートには新討伐ダンジョン、ヒーラーナーフなどが含まれます。" },
    "pt-br": { alt: "Arte da atualização de 12 de agosto de AION2", caption: "Arte oficial da NC; atualização inclui novas masmorras de expedição, nerfs em curandeiros." },
    ru: { alt: "Арт обновления AION2 от 12 августа", caption: "Официальный арт NC; обновление включает новые экспедиционные подземелья, нерф хилов." },
    ko: { alt: "AION2 8월 12일 업데이트 이미지", caption: "NC 공식 이미지입니다. 8월 12일 업데이트에는 신규 원정 던전, 힐러 너프 등이 포함됩니다." },
    "zh-hant": { alt: "AION2 8月12日更新宣傳圖", caption: "NC 官方配圖；8月12日更新包含新遠征副本、治療削弱等。" },
  },
};

const housingHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/d7bbd612-d975-494b-abc1-d4c1f1de2035.png",
  width: 800, height: 420,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.ncsoft.jp/en/",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 Housing 系统概念图", caption: "NC 官方概念图；Housing 为首个生活内容，Sailing 后续推出。" },
    en: { alt: "AION2 Housing system concept art", caption: "Official NC concept art; Housing is the first life content, Sailing to follow." },
    fr: { alt: "Concept art du système Housing AION2", caption: "Concept art officiel NC ; Housing est le premier contenu de vie." },
    de: { alt: "AION2 Housing-System Konzeptkunst", caption: "Offizielles NC-Konzept; Housing ist der erste Lebensinhalt." },
    es: { alt: "Arte conceptual del sistema Housing de AION2", caption: "Arte conceptual oficial de NC; Housing es el primer contenido de vida." },
    ja: { alt: "AION2 ハウジングシステム コンセプトアート", caption: "NC 公式コンセプトアート。ハウジングは初の生活コンテンツ。" },
    "pt-br": { alt: "Arte conceitual do sistema Housing de AION2", caption: "Arte conceitual oficial da NC; Housing é o primeiro conteúdo de vida." },
    ru: { alt: "Концепт-арт системы Housing AION2", caption: "Официальный концепт-арт NC; Housing — первый жизненный контент." },
    ko: { alt: "AION2 하우징 시스템 컨셉 아트", caption: "NC 공식 컨셉 아트입니다. 하우징은 첫 번째 생활 콘텐츠입니다." },
    "zh-hant": { alt: "AION2 Housing 系統概念圖", caption: "NC 官方概念圖；Housing 為首個生活內容，Sailing 後續推出。" },
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

export const trendingAugust12ContentEntries = [
  // ARTICLE 1: August 12 update overview
  {
    section: "news",
    slug: "august-12-2026-update-overview",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [aug12PatchSource, invenDevstreamSource],
    heroImage: patchHero,
    related: [
      { kind: "content", section: "news", slug: "august-11-2026-fromis9-collaboration-ending" },
      { kind: "content", section: "news", slug: "august-2026-datamine-askran-atiel-noiran" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 5, {
        eyebrow: "AUGUST 12 UPDATE",
        title: "AION2 August 12 update: new dungeons, healer nerfs, Arcana equipment, and matchmaking overhaul",
        description: "The August 12 AION2 update brings Corroded Deus Research Base expedition, Noiran's Hidden Legacy transcendence dungeon, major healer nerfs, Dice & Lantern Arcana, and Battleground matchmaking changes.",
        intro: "AION2's August 12 update has arrived, bringing the Corroded Deus Research Base expedition dungeon, the Noiran's Hidden Legacy transcendence dungeon, a controversial healer class overhaul, new Dice and Lantern Arcana equipment slots, and significant Battleground matchmaking changes. The update also adds the Midsummer Night's Dream pajama-themed cosmetics, new pets, a Mobile HUD editor, and a Shop UI rework. The fromis_9 collaboration event ends with this patch.",
        sourceNote: "Based on the AION2T August 12 update summary and Inven Global's Devstream preview (August 11, 2026). Korea/Taiwan service update; global version may receive this content at a later date.",
        keywords: ["AION2 August 12 update", "AION2 Corroded Deus Research Base", "AION2 Noiran's Hidden Legacy", "AION2 healer nerf", "AION2 Arcana equipment"],
        sections: [
          section("new-dungeons", "New dungeons: Corroded Deus Research Base and Noiran's Hidden Legacy", ["The Corroded Deus Research Base is a new expedition dungeon with Exploration and Conquest difficulties (Normal and Hard). It requires 3,800 to 4,500 combat power, making it accessible to mid-game and endgame players. The Noiran's Hidden Legacy is a new transcendence dungeon with four phases, dropping Dice and Lantern Arcana components.", "These dungeons continue the story thread from the August datamine (Askran, Atiel, Legacy Noiran) and provide new gear progression paths for endgame players. The previous expedition and transcendence reward boost events have ended with this patch."]),
          section("healer-nerf", "Healer overhaul: Chanter and Cleric healing reduced 20-50%", ["The most controversial change in this patch is the healing reduction across all classes by 20-50%. Chanter and Cleric passive auto-attack healing has been changed from a fixed percentage to a damage-based ratio: Chanter at 18/21/24% and Cleric at 26/30/34% of attack power. Seven other classes had their healing debuff skills strengthened.", "The healing range for all affected skills has been increased from 25m to 40m, providing a compensatary benefit. In Battlegrounds, healing is further reduced by an additional 30%. This is a significant shift that changes how support roles function in both PvE and PvP content."]),
          section("arcana-items", "New Dice and Lantern Arcana equipment slots", ["The update adds two new Arcana equipment slots: Dice and Lantern. These introduce new Perfect, Critical, Multi-hit, and other offensive options for character builds. The new Arcana items are obtained from the Noiran's Hidden Legacy transcendence dungeon.", "These slots expand the character customization system that was introduced with the game's launch, providing additional progression paths for players who have maxed out their existing equipment. The new options particularly benefit damage-dealing classes."]),
          section("matchmaking-cosmetics", "Battleground matchmaking overhaul and new cosmetics", ["Battleground (PvP) matchmaking has been reworked to accept only solo queues or full 5-person fixed teams. Solo queue matchmaking includes class balance adjustments to ensure fairer matches. The Midsummer Night's Dream pajama set (119,000 KRW), Goodnight Teddy Bear pet (29,000 KRW), Sweet Unicorn pet (1,500 Quna), and Sweet Dream Cloud Wings are now available until September 23.", "The Shop UI has been fully redesigned with card-style product displays, a dedicated cosmetics tab, and item previews. The entry loading animation has been removed for faster browsing. A Mobile HUD editor has been added, allowing grid-based layout, scaling, snapping, and independent hiding of elements."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
        eyebrow: "8月12日更新",
        title: "AION2 8月12日更新：新副本、治疗削弱、Arcana 装备、匹配改版",
        description: "8月12日更新带来侵蚀的德乌斯研究基地远征、尼奥兰的隐藏遗产超越副本、重大治疗职业削弱、骰子与灯笼 Arcana 新插槽及战场匹配改版。",
        intro: "AION2 8月12日更新已上线，带来侵蚀的德乌斯研究基地远征副本、尼奥兰的隐藏遗产超越副本、争议性的治疗职业全面改版、新的骰子与灯笼 Arcana 装备插槽以及重大战场匹配改动。更新还新增了仲夏夜之梦睡衣主题外观、新宠物、手机 HUD 编辑器和商店 UI 重做。fromis_9 合作活动随本次更新结束。",
        sourceNote: "基于 AION2T 8月12日更新摘要和 Inven Global 的 Devstream 预览（2026年8月11日）。韩服/台服更新内容；全球版可能稍后推出。",
        keywords: ["AION2 8月12日更新", "AION2 侵蚀的德乌斯研究基地", "AION2 尼奥兰的隐藏遗产", "AION2 治疗削弱", "AION2 Arcana 装备"],
        sections: [
          section("new-dungeons", "新副本：侵蚀的德乌斯研究基地与尼奥兰的隐藏遗产", ["侵蚀的德乌斯研究基地是新的远征副本，包含探索和征服难度（普通和困难），需要 3,800 至 4,500 战力。尼奥兰的隐藏遗产是新的超越副本，包含四个阶段，掉落骰子和灯笼 Arcana 部件。", "这些副本延续了 8 月数据挖掘（Askran、Atiel、Legacy Noiran）的剧情线，为终局玩家提供新的装备成长路径。"]),
          section("healer-nerf", "治疗职业改版：Chanter 和 Cleric 治疗减少 20-50%", ["本次更新最具争议的改动是所有职业的治疗技能减少 20-50%。Chanter 和 Cleric 的被动自动攻击治疗改为基于伤害的比例：Chanter 为攻击力的 18/21/24%，Cleric 为 26/30/34%。七个其他职业的治疗减益技能得到加强。", "所有受影响技能的治疗范围从 25m 增加到 40m 作为补偿。在战场中，治疗额外减少 30%。这是 PvE 和 PvP 中支援角色定位的重大转变。"]),
          section("arcana-items", "新骰子与灯笼 Arcana 装备插槽", ["更新新增了两个 Arcana 装备插槽：骰子和灯笼。它们引入了新的完美、暴击、多重命中和其他进攻选项，用于角色构建。新的 Arcana 物品从尼奥兰的隐藏遗产超越副本获得。", "这些插槽扩展了游戏上线时引入的角色自定义系统，为已满装备的玩家提供额外的成长路径。"]),
          section("matchmaking-cosmetics", "战场匹配改版与新外观", ["战场匹配已重做，仅接受单人排队或完整 5 人固定队。单人排队包含职业平衡调整以确保公平匹配。仲夏夜之梦睡衣套装（119,000 KRW）、晚安泰迪熊宠物（29,000 KRW）、甜独角兽宠物（1,500 Quna）和甜梦云翅膀现已上架至 9 月 23 日。", "商店 UI 已完全重新设计，采用卡片式产品展示、专用外观标签页和物品预览。手机 HUD 编辑器已新增，支持网格布局、缩放、吸附和独立隐藏元素。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 5, {
        eyebrow: "8월 12일 업데이트",
        title: "AION2 8월 12일 업데이트: 신규 던전, 힐러 너프, 아르카나 장비, 매치메이킹 개편",
        description: "8월 12일 업데이트로 부식된 데우스 연구 기지 원정, 노이란의 숨겨진 유산 초월 던전, 힐러 너프, 주사위/랜턴 아르카나, 전장 매치메이킹 변경이 적용됐습니다.",
        intro: "AION2의 8월 12일 업데이트가 적용됐습니다. 부식된 데우스 연구 기지 원정 던전, 노이란의 숨겨진 유산 초월 던전, 힐러 클래스 개편, 새로운 주사위 및 랜턴 아르카나 장비 슬롯, 전장 매치메이킹 변경이 포함됩니다.",
        sourceNote: "AION2T 8월 12일 업데이트 요약과 Inven Global Devstream 프리뷰(2026년 8월 11일)에 기반합니다.",
        keywords: ["AION2 8월 12일 업데이트", "AION2 부식된 데우스 연구 기지", "AION2 노이란의 숨겨진 유산", "AION2 힐러 너프", "AION2 아르카나 장비"],
        sections: [
          section("new-dungeons", "신규 던전: 부식된 데우스 연구 기지와 노이란의 숨겨진 유산", ["부식된 데우스 연구 기지는 탐험 및 정복 난이도(일반/하드)의 신규 원정 던전으로, 3,800~4,500 전투력을 요구합니다. 노이란의 숨겨진 유산은 4단계 초월 던전으로 주사위와 랜턴 아르카나 부품을 드롭합니다.", "이 던전들은 8월 데이터마인드(Askran, Atiel, Legacy Noiran)의 스토리를 이어갑니다."]),
          section("healer-nerf", "힐러 개편: Chanter와 Cleric 치유량 20-50% 감소", ["모든 클래스의 치유량이 20-50% 감소했습니다. Chanter와 Cleric의 패시브 자동 공격 치유가 공격력 비율로 변경됐습니다.", "치유 범위는 25m에서 40m로 증가했으며, 전장에서는 치유량이 추가로 30% 감소합니다."]),
          section("arcana-items", "신규 주사위 및 랜턴 아르카나 장비 슬롯", ["주사위와 랜턴 두 가지 새로운 아르카나 장비 슬롯이 추가됐습니다. Perfect, Critical, Multi-hit 등 새로운 공격 옵션을 제공합니다.", "이 슬롯은 기존 장비를 최대로 강화한 플레이어에게 추가 성장 경로를 제공합니다."]),
          section("matchmaking-cosmetics", "전장 매치메이킹 개편과 신규 코스메틱", ["전장 매치메이킹이 솔로 큐 또는 5인 고정 파티만 수용하도록 변경됐습니다. 한여름 밤의 꿈 파자마 세트, 신규 펫, 날개가 9월 23일까지 판매됩니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 5, {
        eyebrow: "MISE À JOUR DU 12 AOÛT",
        title: "Mise à jour AION2 du 12 août : nouveaux donjons, nerf des soigneurs, équipement Arcana, refonte du matchmaking",
        description: "La mise à jour du 12 août apporte le donjon d'expédition Base de recherche Deus corrodée, le donjon de transcendance Héritage caché de Noiran, un nerf controversé des soigneurs, de nouveaux équipements Arcana et des changements de matchmaking.",
        intro: "La mise à jour du 12 août est arrivée, apportant de nouveaux donjons, un nerf controversé des soigneurs, de nouveaux équipements Arcana et des changements de matchmaking dans les champs de bataille.",
        sourceNote: "Basé sur le résumé de la mise à jour du 12 août d'AION2T et l'aperçu Devstream d'Inven Global (11 août 2026).",
        keywords: ["mise à jour AION2 12 août", "AION2 Base de recherche Deus", "AION2 nerf soigneur", "AION2 équipement Arcana"],
        sections: [
          section("new-dungeons", "Nouveaux donjons", ["La Base de recherche Deus corrodée est un nouveau donjon d'expédition nécessitant 3 800 à 4 500 de puissance de combat. L'Héritage caché de Noiran est un donjon de transcendance à quatre phases.", "Ces donjons poursuivent l'histoire des datamines d'août."]),
          section("healer-nerf", "Refonte des soigneurs", ["Les soins de tous les personnages ont été réduits de 20 à 50 %. Les soins passifs de Chanter et Cleric ont été modifiés pour être basés sur les dégâts.", "La portée des soins a été augmentée de 25 m à 40 m. Dans les champs de bataille, les soins sont réduits de 30 % supplémentaires."]),
          section("arcana-items", "Nouveaux équipements Arcana", ["Deux nouveaux emplacements d'équipement Arcana ont été ajoutés : Dé et Lanterne. Ils introduisent de nouvelles options d'attaque.", "Ces emplacements offrent des voies de progression supplémentaires."]),
          section("matchmaking-cosmetics", "Refonte du matchmaking et nouveaux cosmétiques", ["Le matchmaking des champs de bataille n'accepte plus que les files solo ou les équipes fixes de 5 personnes. De nouveaux ensembles pyjama, familiers et ailes sont disponibles."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 5, {
        eyebrow: "12. AUGUST UPDATE",
        title: "AION2 12. August Update: neue Dungeons, Heiler-Nerfs, Arcana-Ausrüstung, Matchmaking-Überholung",
        description: "Das 12. August Update bringt den Expeditionsdungeon Korrodierte Deus-Forschungsbasis, den Transzendenzdungeon Noirans verborgenes Erbe, Heiler-Nerfs, neue Arcana-Ausrüstung und Matchmaking-Änderungen.",
        intro: "Das AION2 Update vom 12. August ist da, mit neuen Dungeons, umstrittenen Heiler-Änderungen, neuer Arcana-Ausrüstung und Matchmaking-Änderungen.",
        sourceNote: "Basierend auf der AION2T Update-Zusammenfassung und der Inven Global Devstream-Vorschau (11. August 2026).",
        keywords: ["AION2 12. August Update", "AION2 Heiler-Nerf", "AION2 Arcana-Ausrüstung", "AION2 neuer Dungeon"],
        sections: [
          section("new-dungeons", "Neue Dungeons", ["Die Korrodierte Deus-Forschungsbasis ist ein neuer Expeditionsdungeon, der 3.800–4.500 Kampfkraft erfordert. Noirans verborgenes Erbe ist ein Transzendenzdungeon mit vier Phasen.", "Diese Dungeons setzen die Geschichte der August-Datamines fort."]),
          section("healer-nerf", "Heiler-Überholung", ["Die Heilung aller Klassen wurde um 20-50 % reduziert. Die passive Heilung von Chanter und Cleric wurde auf eine schadensbasierte Ratio umgestellt.", "Die Heilungsreichweite wurde von 25 m auf 40 m erhöht."]),
          section("arcana-items", "Neue Arcana-Ausrüstung", ["Zwei neue Arcana-Ausrüstungsplätze wurden hinzugefügt: Würfel und Laterne. Sie bieten neue offensive Optionen.", "Diese Plätze bieten zusätzliche Fortschrittswege."]),
          section("matchmaking-cosmetics", "Matchmaking-Überholung und neue Kosmetika", ["Das Schlachtfeld-Matchmaking akzeptiert nur noch Solo- oder 5er-Festteams. Neue Pyjama-Sets, Begleiter und Flügel sind erhältlich."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 5, {
        eyebrow: "ACTUALIZACIÓN DEL 12 DE AGOSTO",
        title: "Actualización de AION2 del 12 de agosto: nuevas mazmorras, nerfeo a curadores, equipo Arcana, revisión del matchmaking",
        description: "La actualización del 12 de agosto trae la mazmorra de expedición Base de investigación Deus corroída, la mazmorra de trascendencia Legado oculto de Noiran, nerfeo a curadores, nuevo equipo Arcana y cambios en el matchmaking.",
        intro: "La actualización del 12 de agosto de AION2 ha llegado con nuevas mazmorras, controvertidos cambios a los curadores, nuevo equipo Arcana y cambios en el matchmaking.",
        sourceNote: "Basado en el resumen de la actualización del 12 de agosto de AION2T y la vista previa de Devstream de Inven Global (11 de agosto de 2026).",
        keywords: ["actualización AION2 12 agosto", "AION2 nerfeo curador", "AION2 equipo Arcana", "AION2 nueva mazmorra"],
        sections: [
          section("new-dungeons", "Nuevas mazmorras", ["La Base de investigación Deus corroída es una nueva mazmorra de expedición que requiere 3.800-4.500 de poder de combate. El Legado oculto de Noiran es una mazmorra de trascendencia de cuatro fases.", "Estas mazmorras continúan la historia de los datamines de agosto."]),
          section("healer-nerf", "Revisión de curadores", ["La curación de todas las clases se redujo un 20-50 %. La curación pasiva de Chanter y Cleric se cambió a una proporción basada en daño.", "El alcance de curación aumentó de 25 m a 40 m."]),
          section("arcana-items", "Nuevo equipo Arcana", ["Se agregaron dos nuevos espacios de equipo Arcana: Dado y Linterna. Introducen nuevas opciones ofensivas.", "Estos espacios ofrecen vías de progresión adicionales."]),
          section("matchmaking-cosmetics", "Revisión del matchmaking y nuevos cosméticos", ["El matchmaking de campos de batalla ahora solo acepta colas en solitario o equipos fijos de 5 personas. Nuevos conjuntos de pijama, mascotas y alas están disponibles."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 5, {
        eyebrow: "8月12日アップデート",
        title: "AION2 8月12日アップデート: 新ダンジョン、ヒーラーナーフ、アルカナ装備、マッチメイキング刷新",
        description: "8月12日アップデートで腐食されたデウス研究基地討伐、ノイランの隠された遺産超越ダンジョン、ヒーラーナーフ、ダイス＆ランタンアルカナ、戦場マッチメイキング変更が実装されました。",
        intro: "AION2 8月12日アップデートが実装され、新ダンジョン、ヒーラーナーフ、新アルカナ装備、マッチメイキング変更が行われました。",
        sourceNote: "AION2T 8月12日アップデート要約とInven Global Devstreamプレビュー（2026年8月11日）に基づきます。",
        keywords: ["AION2 8月12日アップデート", "AION2 ヒーラーナーフ", "AION2 アルカナ装備", "AION2 新ダンジョン"],
        sections: [
          section("new-dungeons", "新ダンジョン", ["腐食されたデウス研究基地は戦闘力3,800〜4,500を必要とする新討伐ダンジョンです。ノイランの隠された遺産は4段階の超越ダンジョンです。"]),
          section("healer-nerf", "ヒーラー刷新", ["全クラスの回復量が20-50%減少しました。ChanterとClericのパッシブ回復がダメージベース比率に変更されました。", "回復範囲は25mから40mに拡大されました。"]),
          section("arcana-items", "新アルカナ装備", ["ダイスとランタンの2つの新アルカナ装備スロットが追加されました。新しい攻撃オプションを提供します。"]),
          section("matchmaking-cosmetics", "マッチメイキングと新コスメ", ["戦場のマッチメイキングがソロまたは5人固定チームのみに変更されました。新しいパジャマセット、ペット、翼が販売中です。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 5, {
        eyebrow: "ATUALIZAÇÃO DE 12 DE AGOSTO",
        title: "Atualização de 12 de agosto de AION2: novas masmorras, nerf em curandeiros, equipamento Arcana, reforma do matchmaking",
        description: "A atualização de 12 de agosto traz a masmorra de expedição Base de Pesquisa Deus Corroída, a masmorra de transcendência Legado Oculto de Noiran, nerf em curandeiros, novo equipamento Arcana e mudanças no matchmaking.",
        intro: "A atualização de 12 de agosto de AION2 chegou com novas masmorras, controversas mudanças nos curandeiros, novo equipamento Arcana e mudanças no matchmaking.",
        sourceNote: "Baseado no resumo da atualização de 12 de agosto da AION2T e na prévia Devstream da Inven Global (11 de agosto de 2026).",
        keywords: ["atualização AION2 12 agosto", "AION2 nerf curandeiro", "AION2 equipamento Arcana", "AION2 nova masmorra"],
        sections: [
          section("new-dungeons", "Novas masmorras", ["A Base de Pesquisa Deus Corroída é uma nova masmorra de expedição que requer 3.800-4.500 de poder de combate. O Legado Oculto de Noiran é uma masmorra de transcendência em quatro fases."]),
          section("healer-nerf", "Reforma dos curandeiros", ["A cura de todas as classes foi reduzida em 20-50%. A cura passiva de Chanter e Cleric foi alterada para proporção baseada em dano.", "O alcance de cura aumentou de 25m para 40m."]),
          section("arcana-items", "Novo equipamento Arcana", ["Dois novos espaços de equipamento Arcana foram adicionados: Dado e Lanterna. Eles introduzem novas opções ofensivas."]),
          section("matchmaking-cosmetics", "Reforma do matchmaking e novos cosméticos", ["O matchmaking de campos de batalha agora só aceita filas solo ou grupos fixos de 5 pessoas. Novos conjuntos de pijama, mascotes e asas estão disponíveis."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 5, {
        eyebrow: "ОБНОВЛЕНИЕ 12 АВГУСТА",
        title: "Обновление AION2 от 12 августа: новые подземелья, нерф хилов, экипировка Arcana, переработка подбора игроков",
        description: "Обновление от 12 августа приносит экспедиционное подземелье Исследовательская база Дейус, подземелье transcendence Скрытое наследие Нойрана, нерф хилов, новую экипировку Arcana и изменения в подборе игроков.",
        intro: "Обновление AION2 от 12 августа вышло с новыми подземельями, спорными изменениями хилов, новой экипировкой Arcana и изменениями в подборе игроков.",
        sourceNote: "Основано на сводке обновления от 12 августа AION2T и предпросмотре Devstream Inven Global (11 августа 2026).",
        keywords: ["обновление AION2 12 августа", "AION2 нерф хилов", "AION2 экипировка Arcana", "AION2 новое подземелье"],
        sections: [
          section("new-dungeons", "Новые подземелья", ["Исследовательская база Дейус — новое экспедиционное подземелье, требующее 3 800–4 500 боевой мощи. Скрытое наследие Нойрана — подземелье transcendence из четырёх фаз."]),
          section("healer-nerf", "Переработка хилов", ["Лечение всех классов снижено на 20-50%. Пассивное лечение Chanter и Cleric изменено на соотношение на основе урона.", "Радиус лечения увеличен с 25 м до 40 м."]),
          section("arcana-items", "Новая экипировка Arcana", ["Добавлены два новых слота экипировки Arcana: Кость и Фонарь. Они вводят новые атакующие опции."]),
          section("matchmaking-cosmetics", "Переработка подбора и новая косметика", ["Подбор на поле боя теперь принимает только одиночные очереди или фиксированные группы из 5 человек. Новые пижамные наборы, питомцы и крылья доступны."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
        eyebrow: "8月12日更新",
        title: "AION2 8月12日更新：新副本、治療削弱、Arcana 裝備、匹配改版",
        description: "8月12日更新帶來侵蝕的德烏斯研究基地遠征、尼奧蘭的隱藏遺產超越副本、重大治療職業削弱、骰子與燈籠 Arcana 新插槽及戰場匹配改版。",
        intro: "AION2 8月12日更新已上線，帶來新副本、治療職業改版、新 Arcana 裝備插槽以及重大戰場匹配改動。",
        sourceNote: "基於 AION2T 8月12日更新摘要和 Inven Global 的 Devstream 預覽（2026年8月11日）。",
        keywords: ["AION2 8月12日更新", "AION2 治療削弱", "AION2 Arcana 裝備", "AION2 新副本"],
        sections: [
          section("new-dungeons", "新副本", ["侵蝕的德烏斯研究基地是新的遠征副本，需要 3,800 至 4,500 戰力。尼奧蘭的隱藏遺產是新的超越副本，包含四個階段。"]),
          section("healer-nerf", "治療職業改版", ["所有職業的治療技能減少 20-50%。Chanter 和 Cleric 的被動自動攻擊治療改為基於傷害的比例。", "治療範圍從 25m 增加到 40m。"]),
          section("arcana-items", "新 Arcana 裝備", ["新增兩個 Arcana 裝備插槽：骰子和燈籠。引入了新的完美、暴擊、多重命中選項。"]),
          section("matchmaking-cosmetics", "匹配改版與新外觀", ["戰場匹配僅接受單人排隊或完整 5 人固定隊。新的睡衣套裝、寵物和翅膀已上架。"]),
        ],
      }),
    },
  },
  // ARTICLE 2: Healer nerf survival guide
  {
    section: "guides",
    slug: "healer-nerf-survival-guide",
    schemaType: "Article",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [aug12PatchSource, invenDevstreamSource],
    heroImage: patchHero,
    related: [
      { kind: "content", section: "guides", slug: "class-selection-pve-pvp-guide-global" },
      { kind: "content", section: "classes", slug: "difficulty-comparison" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 6, {
        eyebrow: "PATCH SURVIVAL GUIDE",
        title: "AION2 healer survival guide: how to adapt to the August 12 healing nerf",
        description: "Complete guide to surviving the August 12 AION2 healer overhaul. Learn how the 20-50% healing reduction affects Chanter, Cleric, and all classes, with tips for PvE and PvP adaptation.",
        intro: "The August 12 update has significantly reduced healing across all classes, with Chanter and Cleric passive healing changed from fixed percentages to damage-based ratios. This guide explains exactly what changed, how it affects your gameplay, and how to adapt your build and playstyle for both PvE and PvP content.",
        sourceNote: "Based on the August 12 patch notes from AION2T and the August 11 Devstream coverage by Inven Global. All healing values are based on the Korea/Taiwan update. The global version may apply different balance adjustments at launch.",
        keywords: ["AION2 healer guide", "AION2 Chanter Cleric nerf", "AION2 healing reduction August 12", "AION2 support class changes"],
        sections: [
          section("what-changed", "What changed: healing reduction across all classes", ["All healing skills across every class have been reduced by 20-50%. The most significant change affects Chanter and Cleric: their passive auto-attack healing, previously a fixed percentage, is now based on attack power. Chanter heals at 18/21/24% of attack power per rank, while Cleric heals at 26/30/34%. This means healers need to invest in attack power to maintain their healing output.", "Additionally, seven other classes had their healing debuff skills strengthened, making it harder to heal teammates in combat. The Battleground environment applies an additional 30% healing reduction on top of these changes. The compensation is a range increase from 25m to 40m for all affected skills."]),
          section("pve-adaptation", "PvE adaptation: gear and build adjustments", ["For PvE content, healers should prioritize attack power in their gear and stigma builds. The new damage-based healing ratio means that the same stats that increase your damage output also increase your healing. This creates a more unified stat priority where attack power, critical hit, and magic boost all contribute to both roles.", "The increased 40m range gives more positioning flexibility in raid encounters. In the new Corroded Deus Research Base expedition dungeon, maintaining distance while healing is more important than ever. The Noiran's Hidden Legacy transcendence dungeon's four phases require careful resource management."]),
          section("pvp-adaptation", "PvP adaptation: battlefield changes", ["In Battlegrounds, the additional 30% healing reduction means healers must be much more conservative with their cooldowns. The new solo-queue matchmaking system includes class balance adjustments, which may provide some compensation for healers in solo queue. The 5-person fixed team queue allows coordinated teams to plan healing rotations.", "The strengthened healing debuff skills on seven other classes mean that healers are more vulnerable in PvP. Positioning and awareness become critical — the 40m range helps but does not compensate for the reduced healing output."]),
          section("build-options", "Build options: Chanter vs Cleric after the patch", ["Chanter's lower healing ratio (18/21/24% of attack power) but higher damage and group buffs make it better suited for group PvP and hybrid roles. Cleric's higher ratio (26/30/34%) provides stronger healing but requires more dedicated investment in attack power, making it better for dedicated PvE healing roles.", "Both classes should consider incorporating more offensive stigma skills into their builds to benefit from the attack power scaling. The new Dice and Lantern Arcana slots provide additional offensive options that can support healing output indirectly."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
        eyebrow: "补丁生存指南",
        title: "AION2 治疗生存指南：如何适应 8 月 12 日治疗削弱",
        description: "适应 8 月 12 日治疗改版的完整指南。了解 20-50% 的治疗减少如何影响 Chanter、Cleric 及所有职业，PvE 和 PvP 适应技巧。",
        intro: "8 月 12 日更新大幅降低了所有职业的治疗量，Chanter 和 Cleric 的被动治疗从固定百分比改为基于伤害的比例。本指南解释具体变化、对游戏玩法的影响以及如何在 PvE 和 PvP 中调整。",
        sourceNote: "基于 8 月 12 日补丁说明和 8 月 11 日 Devstream 报道。数值基于韩服/台服更新。全球版可能有所不同。",
        keywords: ["AION2 治疗指南", "AION2 Chanter Cleric 削弱", "AION2 治疗减少 8月12日", "AION2 支援职业改动"],
        sections: [
          section("what-changed", "变化内容：所有职业治疗减少", ["所有职业的治疗技能减少 20-50%。最大变化是 Chanter 和 Cleric 的被动自动攻击治疗从固定百分比改为基于攻击力：Chanter 为攻击力的 18/21/24%，Cleric 为 26/30/34%。治疗者需要投资攻击力来维持治疗输出。", "七个其他职业的治疗减益技能得到加强。战场中治疗额外减少 30%。补偿是所有受影响技能范围从 25m 增加到 40m。"]),
          section("pve-adaptation", "PvE 适应：装备和构建调整", ["PvE 内容中，治疗者应优先考虑攻击力装备和 Stigma 构建。新的基于伤害的治疗比例意味着增加伤害的同一属性也增加治疗。", "40m 范围提供了更多定位灵活性。在新远征副本中，保持距离的同时治疗比以前更重要。"]),
          section("pvp-adaptation", "PvP 适应：战场变化", ["战场中的额外 30% 治疗减少意味着治疗者必须更谨慎地使用冷却技能。新的单人排队匹配系统包含职业平衡调整。", "七个其他职业的治疗减益技能加强意味着治疗者在 PvP 中更脆弱。"]),
          section("build-options", "构建选项：补丁后 Chanter vs Cleric", ["Chanter 较低的治疗比例但更高的伤害和群体增益使其更适合群体 PvP 和混合角色。Cleric 较高的比例提供更强的治疗但需要更多攻击力投资。", "两个职业都应考虑将更多进攻性 Stigma 技能纳入构建。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 6, {
        eyebrow: "패치 생존 가이드",
        title: "AION2 힐러 생존 가이드: 8월 12일 힐링 너프 적응법",
        description: "8월 12일 힐러 개편 적응을 위한 완벽 가이드. 20-50% 치유량 감소가 Chanter, Cleric 및 모든 클래스에 미치는 영향과 PvE/PvP 적응 팁.",
        intro: "8월 12일 업데이트로 모든 클래스의 치유량이 크게 감소했습니다. 이 가이드는 변경 사항과 적응 방법을 설명합니다.",
        sourceNote: "8월 12일 패치 노트와 8월 11일 Devstream 보도에 기반합니다.",
        keywords: ["AION2 힐러 가이드", "AION2 Chanter Cleric 너프", "AION2 치유량 감소 8월 12일"],
        sections: [
          section("what-changed", "변경 사항: 모든 클래스 치유량 감소", ["모든 클래스의 치유량이 20-50% 감소했습니다. Chanter와 Cleric의 패시브 치유가 공격력 비율로 변경됐습니다.", "전장에서 치유량이 추가로 30% 감소합니다."]),
          section("pve-adaptation", "PvE 적응", ["PvE에서 힐러는 공격력 장비와 스티그마 빌드를 우선시해야 합니다. 새로운 치유 비율은 공격력을 높이는 속성이 치유도 높이는 것을 의미합니다."]),
          section("pvp-adaptation", "PvP 적응", ["전장의 추가 30% 치유 감소로 힐러는 쿨다운을 더 신중하게 사용해야 합니다."]),
          section("build-options", "빌드 옵션", ["Chanter는 그룹 PvP에, Cleric은 전담 PvE 힐링에 더 적합합니다. 두 클래스 모두 공격력 기반 스티그마를 고려해야 합니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 6, {
        eyebrow: "GUIDE DE SURVIE", title: "Guide de survie des soigneurs AION2 : s'adapter au nerf des soins du 12 août",
        description: "Guide complet pour s'adapter à la refonte des soigneurs d'AION2 du 12 août. Comprendre la réduction de 20-50% des soins.",
        intro: "La mise à jour du 12 août a considérablement réduit les soins. Ce guide explique les changements et comment s'adapter.",
        sourceNote: "Basé sur les notes de patch du 12 août et la couverture Devstream du 11 août.",
        keywords: ["guide soigneur AION2", "AION2 nerf Chanter Cleric", "AION2 réduction des soins"],
        sections: [
          section("what-changed", "Ce qui a changé", ["Les soins de toutes les classes ont été réduits de 20 à 50 %. Les soins passifs de Chanter et Cleric sont passés à un ratio basé sur les dégâts.", "Dans les champs de bataille, les soins sont réduits de 30 % supplémentaires."]),
          section("pve-adaptation", "Adaptation PvE", ["Les soigneurs doivent prioriser la puissance d'attaque. La nouvelle portée de 40 m offre plus de flexibilité de positionnement."]),
          section("pvp-adaptation", "Adaptation PvP", ["Les soigneurs doivent être plus prudents avec leurs temps de recharge. Le nouveau matchmaking solo offre des ajustements d'équilibre."]),
          section("build-options", "Options de construction", ["Chanter est meilleur pour le PvP de groupe, Cleric pour le soin PvE dédié. Les deux devraient envisager des compétences de stigmatisation offensives."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 6, {
        eyebrow: "ÜBERLEBENSLEITFADEN", title: "AION2 Heiler-Überlebensleitfaden: Anpassung an den Heilungs-Nerf vom 12. August",
        description: "Vollständiger Leitfaden zur Anpassung an die Heiler-Überholung vom 12. August. Verstehen Sie die 20-50% Reduzierung.",
        intro: "Das Update vom 12. August hat die Heilung erheblich reduziert. Dieser Leitfaden erklärt die Änderungen und die Anpassung.",
        sourceNote: "Basierend auf den Patch-Notizen vom 12. August und der Devstream-Berichterstattung vom 11. August.",
        keywords: ["AION2 Heiler-Leitfaden", "AION2 Chanter Cleric Nerf", "AION2 Heilungsreduzierung"],
        sections: [
          section("what-changed", "Was sich geändert hat", ["Die Heilung aller Klassen wurde um 20-50 % reduziert. Die passive Heilung von Chanter und Cleric wurde auf eine schadensbasierte Ratio umgestellt."]),
          section("pve-adaptation", "PvE-Anpassung", ["Heiler sollten Angriffskraft priorisieren. Die 40 m Reichweite bietet mehr Positionierungsflexibilität."]),
          section("pvp-adaptation", "PvP-Anpassung", ["Heiler müssen mit Abklingzeiten vorsichtiger sein. Solo-Warteschlangen bieten Klassenanpassungen."]),
          section("build-options", "Bauoptionen", ["Chanter eignet sich besser für Gruppen-PvP, Cleric für dediziertes PvE-Heilen."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 6, {
        eyebrow: "GUÍA DE SUPERVIVENCIA", title: "Guía de supervivencia de curadores de AION2: adaptarse al nerfeo del 12 de agosto",
        description: "Guía completa para adaptarse a la revisión de curadores del 12 de agosto. Comprender la reducción del 20-50% en la curación.",
        intro: "La actualización del 12 de agosto redujo significativamente la curación. Esta guía explica los cambios y cómo adaptarse.",
        sourceNote: "Basado en las notas del parche del 12 de agosto y la cobertura de Devstream del 11 de agosto.",
        keywords: ["guía curador AION2", "AION2 nerfeo Chanter Cleric", "AION2 reducción curación"],
        sections: [
          section("what-changed", "Lo que cambió", ["La curación de todas las clases se redujo un 20-50 %. La curación pasiva de Chanter y Cleric cambió a una proporción basada en daño."]),
          section("pve-adaptation", "Adaptación PvE", ["Los curadores deben priorizar el poder de ataque. El alcance de 40 m ofrece más flexibilidad."]),
          section("pvp-adaptation", "Adaptación PvP", ["Los curadores deben ser más conservadores con sus enfriamientos. El nuevo matchmaking en solitario ofrece ajustes."]),
          section("build-options", "Opciones de construcción", ["Chanter es mejor para PvP grupal, Cleric para curación PvE dedicada."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 6, {
        eyebrow: "生存ガイド", title: "AION2 ヒーラー生存ガイド: 8月12日回復ナーフ適応法",
        description: "8月12日のヒーラー刷新に適応するための完全ガイド。20-50%の回復量減少を理解します。",
        intro: "8月12日アップデートで回復量が大幅に減少しました。このガイドは変更点と適応方法を説明します。",
        sourceNote: "8月12日パッチノートと8月11日Devstream報道に基づきます。",
        keywords: ["AION2 ヒーラーガイド", "AION2 Chanter Cleric ナーフ", "AION2 回復量減少"],
        sections: [
          section("what-changed", "変更内容", ["全クラスの回復量が20-50%減少しました。ChanterとClericのパッシブ回復がダメージベース比率に変更されました。"]),
          section("pve-adaptation", "PvE適応", ["ヒーラーは攻撃力を優先すべきです。40m範囲により位置取りの柔軟性が向上しました。"]),
          section("pvp-adaptation", "PvP適応", ["ヒーラーはクールダウンをより慎重に管理する必要があります。"]),
          section("build-options", "ビルドオプション", ["ChanterはグループPvPに、Clericは専任PvEヒーリングに適しています。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 6, {
        eyebrow: "GUIA DE SOBREVIVÊNCIA", title: "Guia de sobrevivência de curandeiros do AION2: adaptação ao nerf de 12 de agosto",
        description: "Guia completo para se adaptar à reforma dos curandeiros de 12 de agosto. Entender a redução de 20-50% na cura.",
        intro: "A atualização de 12 de agosto reduziu significativamente a cura. Este guia explica as mudanças e como se adaptar.",
        sourceNote: "Baseado nas notas de patch de 12 de agosto e na cobertura Devstream de 11 de agosto.",
        keywords: ["guia curandeiro AION2", "AION2 nerf Chanter Cleric", "AION2 redução cura"],
        sections: [
          section("what-changed", "O que mudou", ["A cura de todas as classes foi reduzida em 20-50%. A cura passiva de Chanter e Cleric mudou para proporção baseada em dano."]),
          section("pve-adaptation", "Adaptação PvE", ["Curandeiros devem priorizar poder de ataque. O alcance de 40m oferece mais flexibilidade."]),
          section("pvp-adaptation", "Adaptação PvP", ["Curandeiros devem ser mais conservadores com resfriamentos."]),
          section("build-options", "Opções de construção", ["Chanter é melhor para PvP em grupo, Cleric para cura PvE dedicada."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 6, {
        eyebrow: "РУКОВОДСТВО ПО ВЫЖИВАНИЮ", title: "Руководство по выживанию хила AION2: адаптация к нерфу лечения от 12 августа",
        description: "Полное руководство по адаптации к переработке хилов от 12 августа. Понимание снижения лечения на 20-50%.",
        intro: "Обновление от 12 августа значительно снизило лечение. Это руководство объясняет изменения и адаптацию.",
        sourceNote: "Основано на примечаниях к патчу от 12 августа и освещении Devstream от 11 августа.",
        keywords: ["руководство хил AION2", "AION2 нерф Chanter Cleric", "AION2 снижение лечения"],
        sections: [
          section("what-changed", "Что изменилось", ["Лечение всех классов снижено на 20-50%. Пассивное лечение Chanter и Cleric изменено на соотношение на основе урона."]),
          section("pve-adaptation", "Адаптация PvE", ["Хилы должны приоритезировать силу атаки. Радиус 40 м даёт больше гибкости."]),
          section("pvp-adaptation", "Адаптация PvP", ["Хилы должны быть более консервативны с перезарядками."]),
          section("build-options", "Варианты сборки", ["Chanter лучше для группового PvP, Cleric для выделенного PvE-хила."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
        eyebrow: "補丁生存指南",
        title: "AION2 治療生存指南：如何適應 8 月 12 日治療削弱",
        description: "適應 8 月 12 日治療改版的完整指南。了解 20-50% 的治療減少如何影響所有職業。",
        intro: "8 月 12 日更新大幅降低了所有職業的治療量。本指南解釋具體變化以及如何在 PvE 和 PvP 中調整。",
        sourceNote: "基於 8 月 12 日補丁說明和 8 月 11 日 Devstream 報導。",
        keywords: ["AION2 治療指南", "AION2 Chanter Cleric 削弱", "AION2 治療減少"],
        sections: [
          section("what-changed", "變化內容", ["所有職業的治療技能減少 20-50%。Chanter 和 Cleric 的被動治療改為基於傷害的比例。"]),
          section("pve-adaptation", "PvE 適應", ["治療者應優先考慮攻擊力裝備。40m 範圍提供了更多定位靈活性。"]),
          section("pvp-adaptation", "PvP 適應", ["治療者必須更謹慎地使用冷卻技能。"]),
          section("build-options", "構建選項", ["Chanter 更適合群體 PvP，Cleric 更適合專職 PvE 治療。"]),
        ],
      }),
    },
  },
  // ARTICLE 3: Housing system announced
  {
    section: "news",
    slug: "housing-system-life-content-announced",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [invenDevstreamSource, aug12PatchSource],
    heroImage: housingHero,
    related: [
      { kind: "content", section: "guides", slug: "chapter-1-content-guide-global" },
      { kind: "content", section: "news", slug: "global-launch-pve-content-what-we-know" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 4, {
        eyebrow: "DEVELOPER ANNOUNCEMENT",
        title: "AION2 Housing system confirmed as first life content — Sailing to follow",
        description: "NCSoft confirms Housing system as AION2's first life content during the August 11 Devstream, with Sailing as the next non-combat activity. No guild PvP or guild-only crafting planned.",
        intro: "During the August 11, 2026 Devstream, AION2 developers confirmed that the Housing system is in development as the game's first life content. Sailing is planned as the next life content after Housing. The developers also clarified that guild PvP and guild-only crafting are not currently planned. This marks a significant shift toward non-combat content for the game, which launched in November 2025 with primarily combat-focused systems.",
        sourceNote: "Based on Inven Global's Devstream coverage (August 11, 2026). Housing system details are speculative; only the confirmed plans are stated as facts. Global version may receive Housing content at a later date.",
        keywords: ["AION2 housing system", "AION2 life content", "AION2 sailing", "AION2 non-combat content"],
        sections: [
          section("housing-announcement", "Housing system confirmed: what we know", ["The Housing system has been confirmed as AION2's first life content. The developers stated during the August 11 Devstream that Housing is in active development, though no specific release date was given. This is the first time NCSoft has officially acknowledged Housing as a planned feature since the game's launch.", "The Housing system is expected to provide player housing where characters can decorate and personalize their space. This would be a significant addition to the game, which currently focuses almost entirely on combat, gear progression, and PvP. The developers cited it as the first step toward diversifying the game's content offerings."]),
          section("sailing-content", "Sailing planned as next life content", ["Following Housing, the developers confirmed that Sailing is planned as the next life content. This suggests a maritime exploration system, potentially including ship customization, ocean exploration, and sea-based activities. No specific details about the Sailing system were shared beyond its position in the development roadmap.", "These two life content additions represent a major expansion of AION2's content scope. The game has been primarily combat-focused since launch, and life content additions could attract players who enjoy non-combat activities in MMORPGs."]),
          section("what-is-not-planned", "What is not planned: guild PvP and guild crafting", ["The developers explicitly stated that guild PvP and guild-only crafting are not currently planned. This addresses community speculation about potential guild-focused content. For players hoping for large-scale guild warfare or guild-exclusive crafting systems, the developers have confirmed these are not on the roadmap.", "This decision may disappoint some players who expected guild-based endgame content. However, the focus on life content like Housing and Sailing suggests a different direction for non-combat expansion."]),
          section("global-version-timeline", "Global version and Housing timeline", ["The global version of AION2 is scheduled for September 2026. It is not yet confirmed whether Housing will be available at global launch or will be added in a later update. The Korea/Taiwan servers have been running since November 2025 and have received Chapter 1 (July 2026) and the August 12 update before Housing.", "Players interested in Housing should follow official announcements for release dates. The global launch in September may include a different content roadmap, so Housing availability should be confirmed through official channels."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 4, {
        eyebrow: "开发者公告",
        title: "AION2 Housing 系统确认为首个生活内容——Sailing 后续推出",
        description: "NCSoft 在 8 月 11 日 Devstream 中确认 Housing 系统为 AION2 首个生活内容，Sailing 为下一个。无军团 PvP 或军团专属制作计划。",
        intro: "在 2026 年 8 月 11 日的 Devstream 中，AION2 开发者确认 Housing 系统正在开发中，作为游戏的首个生活内容。Sailing 计划为 Housing 之后的下一个生活内容。开发者还明确表示目前没有军团 PvP 和军团专属制作计划。",
        sourceNote: "基于 Inven Global 的 Devstream 报道（2026 年 8 月 11 日）。Housing 系统具体细节为推测；仅确认的计划作为事实陈述。",
        keywords: ["AION2 Housing 系统", "AION2 生活内容", "AION2 Sailing", "AION2 非战斗内容"],
        sections: [
          section("housing-announcement", "Housing 系统确认：已知信息", ["Housing 系统已确认为 AION2 的首个生活内容。开发者在 8 月 11 日 Devstream 中表示 Housing 正在积极开发中，但未给出具体发布日期。这是自游戏上线以来 NCSoft 首次正式确认 Housing 为计划功能。", "Housing 系统预计将提供玩家住房，角色可以装饰和个性化自己的空间。这将是游戏内容的重大扩展。"]),
          section("sailing-content", "Sailing 计划为下一个生活内容", ["Housing 之后，开发者确认 Sailing 计划为下一个生活内容。这暗示着一个海上探索系统，可能包括船舶定制、海洋探索和海上活动。", "这两个生活内容新增代表了 AION2 内容范围的重大扩展。"]),
          section("what-is-not-planned", "无计划内容：军团 PvP 和军团制作", ["开发者明确表示军团 PvP 和军团专属制作目前没有计划。这回应了社区关于潜在军团内容的猜测。", "对于期待军团级终局内容的玩家，开发者的确认可能令人失望。"]),
          section("global-version-timeline", "全球版与 Housing 时间线", ["AION2 全球版计划于 2026 年 9 月上线。目前尚不确定 Housing 是否会在全球版上线时可用。", "感兴趣的玩家应关注官方公告获取发布日期。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 4, {
        eyebrow: "개발자 발표",
        title: "AION2 하우징 시스템 첫 번째 생활 콘텐츠 확정 — 세일링 후속",
        description: "NCSoft가 8월 11일 Devstream에서 하우징 시스템을 AION2 첫 생활 콘텐츠로 확인했습니다. 길드 PvP나 길드 전용 제작 계획은 없습니다.",
        intro: "2026년 8월 11일 Devstream에서 AION2 개발자가 하우징 시스템을 첫 번째 생활 콘텐츠로 개발 중임을 확인했습니다.",
        sourceNote: "Inven Global의 Devstream 보도(2026년 8월 11일)에 기반합니다.",
        keywords: ["AION2 하우징 시스템", "AION2 생활 콘텐츠", "AION2 세일링"],
        sections: [
          section("housing-announcement", "하우징 시스템 확정", ["하우징 시스템이 AION2 첫 생활 콘텐츠로 확정됐습니다. 8월 11일 Devstream에서 개발 중임이 확인됐습니다.", "플레이어 주택에서 캐릭터가 공간을 꾸밀 수 있을 것으로 예상됩니다."]),
          section("sailing-content", "세일링 계획", ["하우징 이후 세일링이 다음 생활 콘텐츠로 계획됐습니다. 해양 탐험 시스템이 예상됩니다."]),
          section("what-is-not-planned", "계획되지 않은 콘텐츠", ["길드 PvP와 길드 전용 제작은 현재 계획되지 않았습니다."]),
          section("global-version-timeline", "글로벌 버전과 하우징", ["글로벌 버전은 2026년 9월 출시 예정입니다. 하우징이 출시 시점에 포함될지는 미정입니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 4, {
        eyebrow: "ANNONCE DU DÉVELOPPEUR", title: "Le système Housing d'AION2 confirmé comme premier contenu de vie — Sailing suivra",
        description: "NCSoft confirme le système Housing comme premier contenu de vie d'AION2 lors du Devstream du 11 août, avec Sailing comme prochain.",
        intro: "Lors du Devstream du 11 août 2026, les développeurs d'AION2 ont confirmé le développement du système Housing.",
        sourceNote: "Basé sur la couverture Devstream d'Inven Global (11 août 2026).",
        keywords: ["système Housing AION2", "contenu de vie AION2", "AION2 Sailing"],
        sections: [
          section("housing-announcement", "Système Housing confirmé", ["Le système Housing a été confirmé comme premier contenu de vie. Les développeurs ont indiqué qu'il est en développement actif."]),
          section("sailing-content", "Sailing prévu", ["Sailing est prévu comme prochain contenu de vie après Housing, suggérant un système d'exploration maritime."]),
          section("what-is-not-planned", "Ce qui n'est pas prévu", ["Les développeurs ont explicitement indiqué que le PvP de guilde et l'artisanat exclusif de guilde ne sont pas prévus."]),
          section("global-version-timeline", "Version globale et calendrier", ["La version globale est prévue pour septembre 2026. Housing pourrait ne pas être disponible au lancement."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 4, {
        eyebrow: "ENTWICKLERANKÜNDIGUNG", title: "AION2 Housing-System als erster Lebensinhalt bestätigt — Sailing folgt",
        description: "NCSoft bestätigt das Housing-System als ersten Lebensinhalt von AION2 im Devstream vom 11. August.",
        intro: "Im Devstream vom 11. August 2026 bestätigten die Entwickler das Housing-System als ersten Lebensinhalt.",
        sourceNote: "Basierend auf der Devstream-Berichterstattung von Inven Global (11. August 2026).",
        keywords: ["AION2 Housing-System", "AION2 Lebensinhalt", "AION2 Sailing"],
        sections: [
          section("housing-announcement", "Housing-System bestätigt", ["Das Housing-System wurde als erster Lebensinhalt bestätigt. Es ist in aktiver Entwicklung."]),
          section("sailing-content", "Sailing geplant", ["Sailing ist als nächster Lebensinhalt nach Housing geplant."]),
          section("what-is-not-planned", "Nicht geplante Inhalte", ["Gilden-PvP und gildenexklusives Handwerk sind nicht geplant."]),
          section("global-version-timeline", "Globale Version", ["Die globale Version ist für September 2026 geplant. Housing könnte nicht zum Start verfügbar sein."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 4, {
        eyebrow: "ANUNCIO DEL DESARROLLADOR", title: "Sistema Housing de AION2 confirmado como primer contenido de vida — Sailing le seguirá",
        description: "NCSoft confirma el sistema Housing como primer contenido de vida de AION2 durante el Devstream del 11 de agosto.",
        intro: "Durante el Devstream del 11 de agosto de 2026, los desarrolladores confirmaron el sistema Housing como primer contenido de vida.",
        sourceNote: "Basado en la cobertura de Devstream de Inven Global (11 de agosto de 2026).",
        keywords: ["sistema Housing AION2", "contenido de vida AION2", "AION2 Sailing"],
        sections: [
          section("housing-announcement", "Sistema Housing confirmado", ["El sistema Housing ha sido confirmado como primer contenido de vida. Está en desarrollo activo."]),
          section("sailing-content", "Sailing planeado", ["Sailing está planeado como próximo contenido de vida después de Housing."]),
          section("what-is-not-planned", "Lo no planeado", ["El PvP de gremio y la artesanía exclusiva de gremio no están planeados."]),
          section("global-version-timeline", "Versión global", ["La versión global está prevista para septiembre de 2026. Housing podría no estar disponible en el lanzamiento."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 4, {
        eyebrow: "開発者発表", title: "AION2 ハウジングシステムが初の生活コンテンツとして確定 — セーリングは後続",
        description: "NCSoft が8月11日 Devstream でハウジングシステムを AION2 初の生活コンテンツとして確認しました。",
        intro: "2026年8月11日の Devstream で、AION2 開発者がハウジングシステムを初の生活コンテンツとして開発中であることを確認しました。",
        sourceNote: "Inven Global の Devstream 報道（2026年8月11日）に基づきます。",
        keywords: ["AION2 ハウジングシステム", "AION2 生活コンテンツ", "AION2 セーリング"],
        sections: [
          section("housing-announcement", "ハウジングシステム確定", ["ハウジングシステムがAION2初の生活コンテンツとして確定しました。積極的に開発中です。"]),
          section("sailing-content", "セーリング計画", ["ハウジングの次にセーリングが生活コンテンツとして計画されています。"]),
          section("what-is-not-planned", "計画されていないもの", ["ギルドPvPとギルド専用クラフトは現在計画されていません。"]),
          section("global-version-timeline", "グローバル版", ["グローバル版は2026年9月リリース予定です。ハウジングがリリース時に含まれるかは未定です。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 4, {
        eyebrow: "ANÚNCIO DO DESENVOLVEDOR", title: "Sistema Housing do AION2 confirmado como primeiro conteúdo de vida — Sailing virá depois",
        description: "NCSoft confirma o sistema Housing como primeiro conteúdo de vida do AION2 durante o Devstream de 11 de agosto.",
        intro: "Durante o Devstream de 11 de agosto de 2026, os desenvolvedores confirmaram o sistema Housing como primeiro conteúdo de vida.",
        sourceNote: "Baseado na cobertura Devstream da Inven Global (11 de agosto de 2026).",
        keywords: ["sistema Housing AION2", "conteúdo de vida AION2", "AION2 Sailing"],
        sections: [
          section("housing-announcement", "Sistema Housing confirmado", ["O sistema Housing foi confirmado como primeiro conteúdo de vida. Está em desenvolvimento ativo."]),
          section("sailing-content", "Sailing planejado", ["Sailing está planejado como próximo conteúdo de vida após Housing."]),
          section("what-is-not-planned", "Não planejado", ["PvP de guildas e artesanato exclusivo de guildas não estão planejados."]),
          section("global-version-timeline", "Versão global", ["A versão global está prevista para setembro de 2026. Housing pode não estar disponível no lançamento."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 4, {
        eyebrow: "ОБЪЯВЛЕНИЕ РАЗРАБОТЧИКА", title: "Система Housing AION2 подтверждена как первый жизненный контент — Sailing последует",
        description: "NCSoft подтверждает систему Housing как первый жизненный контент AION2 во время Devstream 11 августа.",
        intro: "Во время Devstream 11 августа 2026 года разработчики подтвердили систему Housing как первый жизненный контент.",
        sourceNote: "Основано на освещении Devstream Inven Global (11 августа 2026).",
        keywords: ["система Housing AION2", "жизненный контент AION2", "AION2 Sailing"],
        sections: [
          section("housing-announcement", "Система Housing подтверждена", ["Система Housing подтверждена как первый жизненный контент. Она в активной разработке."]),
          section("sailing-content", "Sailing запланирован", ["Sailing запланирован как следующий жизненный контент после Housing."]),
          section("what-is-not-planned", "Незапланированное", ["Гильдийский PvP и гильдийское крафтинг не запланированы."]),
          section("global-version-timeline", "Глобальная версия", ["Глобальная версия запланирована на сентябрь 2026. Housing может быть недоступен при запуске."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 4, {
        eyebrow: "開發者公告",
        title: "AION2 Housing 系統確認為首個生活內容——Sailing 後續推出",
        description: "NCSoft 在 8 月 11 日 Devstream 中確認 Housing 系統為 AION2 首個生活內容，Sailing 為下一個。",
        intro: "在 2026 年 8 月 11 日的 Devstream 中，AION2 開發者確認 Housing 系統正在開發中，作為遊戲的首個生活內容。",
        sourceNote: "基於 Inven Global 的 Devstream 報導（2026 年 8 月 11 日）。",
        keywords: ["AION2 Housing 系統", "AION2 生活內容", "AION2 Sailing"],
        sections: [
          section("housing-announcement", "Housing 系統確認", ["Housing 系統已確認為 AION2 的首個生活內容。正在積極開發中。"]),
          section("sailing-content", "Sailing 計劃", ["Housing 之後，Sailing 計劃為下一個生活內容。"]),
          section("what-is-not-planned", "無計劃內容", ["軍團 PvP 和軍團專屬製作目前沒有計劃。"]),
          section("global-version-timeline", "全球版時間線", ["全球版計劃於 2026 年 9 月上線。Housing 是否會在上線時可用尚不確定。"]),
        ],
      }),
    },
  },
  // ARTICLE 4: Dice & Lantern Arcana equipment guide
  {
    section: "guides",
    slug: "dice-lantern-arcana-equipment-guide",
    schemaType: "Article",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [aug12PatchSource, invenDevstreamSource],
    heroImage: patchHero,
    related: [
      { kind: "content", section: "news", slug: "august-12-2026-update-overview" },
      { kind: "content", section: "guides", slug: "healer-nerf-survival-guide" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "EQUIPMENT GUIDE",
        title: "AION2 Dice and Lantern Arcana guide: new equipment slots and building options",
        description: "Complete guide to the new Dice and Lantern Arcana equipment slots added in the August 12 update. Covers how to obtain them, what stats they offer, and how to optimize your build.",
        intro: "The August 12 update adds two new Arcana equipment slots: Dice and Lantern. These introduce new offensive options including Perfect, Critical, Multi-hit, and other stats that can significantly change your character's performance. This guide covers how to obtain the new Arcana items from the Noiran's Hidden Legacy transcendence dungeon, what stats are available, and how to integrate them into your existing build.",
        sourceNote: "Based on the August 12 update notes. Arcana equipment details are derived from the patch notes and Inven Global's Devstream coverage. Exact stat ranges may vary based on item rarity and upgrade level.",
        keywords: ["AION2 Dice Arcana", "AION2 Lantern Arcana", "AION2 new Arcana equipment", "AION2 August 12 gear"],
        sections: [
          section("what-are-arcana", "What are Dice and Lantern Arcana?", ["Dice and Lantern are the two new Arcana equipment slots added in the August 12 update. They join the existing Arcana equipment system introduced at launch, expanding the total number of Arcana slots. These new slots focus on offensive stats, with options including Perfect hits, Critical hits, Multi-hit, and other damage-enhancing properties.", "The new Arcana items are obtained from the Noiran's Hidden Legacy transcendence dungeon, which has four phases of increasing difficulty. The dungeon is designed for endgame players who have already completed the existing transcendence content."]),
          section("how-to-obtain", "How to obtain: Noiran's Hidden Legacy dungeon", ["The Noiran's Hidden Legacy transcendence dungeon is the primary source of Dice and Lantern Arcana components. The dungeon has four phases, each with increasing difficulty and rewards. Players must have completed the previous transcendence content to access this dungeon.", "The dungeon requires a full party and careful coordination, especially at higher phases. The Arcana components dropped are random, so multiple runs may be needed to complete a full set. The previous expedition and transcendence reward boost events have ended with the August 12 patch."]),
          section("stat-options", "Stat options: Perfect, Critical, Multi-hit, and more", ["The new Arcana slots introduce several new offensive stat options. Perfect hits provide a chance for maximized damage, Critical hits offer increased critical strike chance, and Multi-hit adds a chance for additional attacks. These options complement the existing Arcana system and provide new ways to customize your damage profile.", "The exact stat ranges depend on the Arcana item's rarity and upgrade level. Players should evaluate which stat combination best suits their class and playstyle. Damage-dealing classes will benefit most from the new offensive options, while support classes may find utility in specific combinations."]),
          section("build-integration", "Integrating into your build: class recommendations", ["For damage-dealing classes (Gladiator, Assassin, Ranger, Sorcerer, Spiritmaster), the new Arcana slots offer direct damage increases. Multi-hit stats are particularly beneficial for classes with high attack speed, while Critical and Perfect hits benefit burst-damage classes.", "For support classes (Cleric, Chanter), the new Arcana slots provide offensive options that can indirectly support their healing output. The August 12 healer changes make attack power more valuable for healers, making offensive Arcana stats a practical choice for hybrid builds. Battleground players should consider how the new stats affect their PvP performance."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "装备指南",
        title: "AION2 骰子与灯笼 Arcana 指南：新装备插槽与构建选项",
        description: "8月12日更新新增骰子和灯笼 Arcana 装备插槽的完整指南。涵盖获取方式、属性选项以及如何优化构建。",
        intro: "8月12日更新新增了两个 Arcana 装备插槽：骰子和灯笼。它们引入了新的进攻选项，包括 Perfect、Critical、Multi-hit 等属性。本指南涵盖如何获取新 Arcana 物品、可用属性以及如何整合到现有构建中。",
        sourceNote: "基于 8 月 12 日更新说明。Arcana 装备具体细节源于补丁说明和 Inven Global 的 Devstream 报道。",
        keywords: ["AION2 骰子 Arcana", "AION2 灯笼 Arcana", "AION2 新 Arcana 装备", "AION2 8月12日装备"],
        sections: [
          section("what-are-arcana", "骰子和灯笼 Arcana 是什么？", ["骰子和灯笼是 8 月 12 日更新新增的两个 Arcana 装备插槽。它们扩展了现有 Arcana 系统，专注于进攻属性，包括 Perfect、Critical、Multi-hit 等选项。", "新 Arcana 物品从尼奥兰的隐藏遗产超越副本获得。"]),
          section("how-to-obtain", "获取方式：尼奥兰的隐藏遗产副本", ["尼奥兰的隐藏遗产超越副本是骰子和灯笼 Arcana 部件的主要来源。副本有四个阶段，难度和奖励递增。", "副本需要完整队伍和精心协调。Arcana 部件随机掉落，可能需要多次完成。"]),
          section("stat-options", "属性选项：Perfect、Critical、Multi-hit 等", ["新 Arcana 插槽引入了多种进攻属性选项。Perfect 提供最大化伤害几率，Critical 增加暴击率，Multi-hit 增加额外攻击几率。", "具体属性范围取决于 Arcana 物品的稀有度和升级等级。"]),
          section("build-integration", "构建整合：职业推荐", ["对于伤害输出职业，新 Arcana 插槽提供直接伤害提升。Multi-hit 适合高攻速职业，Critical 和 Perfect 适合爆发职业。", "对于支援职业，新 Arcana 插槽提供可间接支援治疗输出的进攻选项。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "장비 가이드",
        title: "AION2 주사위와 랜턴 아르카나 가이드: 신규 장비 슬롯과 빌드 옵션",
        description: "8월 12일 업데이트로 추가된 주사위와 랜턴 아르카나 장비 슬롯 완벽 가이드. 획득 방법, 능력치, 빌드 최적화를 다룹니다.",
        intro: "8월 12일 업데이트로 주사위와 랜턴 두 가지 새로운 아르카나 장비 슬롯이 추가됐습니다. 이 가이드는 획득 방법과 빌드 통합을 설명합니다.",
        sourceNote: "8월 12일 업데이트 노트에 기반합니다.",
        keywords: ["AION2 주사위 아르카나", "AION2 랜턴 아르카나", "AION2 신규 아르카나 장비"],
        sections: [
          section("what-are-arcana", "주사위와 랜턴 아르카나란?", ["주사위와 랜턴은 8월 12일 업데이트로 추가된 새로운 아르카나 장비 슬롯입니다. Perfect, Critical, Multi-hit 등 공격 옵션을 제공합니다.", "노이란의 숨겨진 유산 초월 던전에서 획득할 수 있습니다."]),
          section("how-to-obtain", "획득 방법", ["노이란의 숨겨진 유산 초월 던전이 주사위와 랜턴 아르카나 부품의 주요 획득처입니다. 4단계로 구성됐습니다."]),
          section("stat-options", "능력치 옵션", ["Perfect 타격, Critical 타격, Multi-hit 등 새로운 공격 옵션을 제공합니다. 희귀도와 업그레이드 레벨에 따라 능력치 범위가 결정됩니다."]),
          section("build-integration", "빌드 통합", ["딜러 클래스는 직접적인 데미지 증가를, 서포트 클래스는 하이브리드 빌드를 위한 공격 옵션을 얻을 수 있습니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "GUIDE D'ÉQUIPEMENT", title: "Guide des Arcana Dé et Lanterne AION2 : nouveaux emplacements et options",
        description: "Guide complet des nouveaux emplacements d'équipement Arcana Dé et Lanterne ajoutés dans la mise à jour du 12 août.",
        intro: "La mise à jour du 12 août ajoute deux nouveaux emplacements d'équipement Arcana. Ce guide explique comment les obtenir et les utiliser.",
        sourceNote: "Basé sur les notes de mise à jour du 12 août.",
        keywords: ["AION2 Arcana Dé", "AION2 Arcana Lanterne", "AION2 nouvel équipement Arcana"],
        sections: [
          section("what-are-arcana", "Que sont les Arcana Dé et Lanterne?", ["Deux nouveaux emplacements d'équipement Arcana offrant des options offensives comme Perfect, Critical, Multi-hit.", "Obtenus dans le donjon de transcendance Héritage caché de Noiran."]),
          section("how-to-obtain", "Comment les obtenir", ["Le donjon de transcendance Héritage caché de Noiran est la source principale. Il comporte quatre phases."]),
          section("stat-options", "Options de statistiques", ["Perfect, Critical, Multi-hit et d'autres options offensives sont disponibles."]),
          section("build-integration", "Intégration dans la construction", ["Les classes de dégâts bénéficient d'augmentations directes. Les classes de soutien peuvent utiliser les options offensives."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "AUSRÜSTUNGSLEITFADEN", title: "AION2 Würfel- und Laternen-Arcana-Leitfaden: neue Ausrüstungsplätze",
        description: "Vollständiger Leitfaden zu den neuen Arcana-Ausrüstungsplätzen Würfel und Laterne aus dem Update vom 12. August.",
        intro: "Das Update vom 12. August fügt zwei neue Arcana-Ausrüstungsplätze hinzu. Dieser Leitfaden erklärt deren Erhalt und Nutzung.",
        sourceNote: "Basierend auf den Update-Notizen vom 12. August.",
        keywords: ["AION2 Würfel Arcana", "AION2 Laterne Arcana", "AION2 neue Arcana-Ausrüstung"],
        sections: [
          section("what-are-arcana", "Was sind Würfel- und Laternen-Arcana?", ["Zwei neue Arcana-Ausrüstungsplätze mit offensiven Optionen wie Perfect, Critical, Multi-hit.", "Erhalten im Transzendenzdungeon Noirans verborgenes Erbe."]),
          section("how-to-obtain", "Wie man sie erhält", ["Der Transzendenzdungeon Noirans verborgenes Erbe ist die Hauptquelle. Er hat vier Phasen."]),
          section("stat-options", "Statistikoptionen", ["Perfect, Critical, Multi-hit und andere offensive Optionen sind verfügbar."]),
          section("build-integration", "Integration in den Bau", ["Schadensklassen profitieren von direkten Steigerungen. Unterstützungsklassen können offensive Optionen nutzen."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "GUÍA DE EQUIPO", title: "Guía de Arcana Dado y Linterna de AION2: nuevos espacios de equipo",
        description: "Guía completa de los nuevos espacios de equipo Arcana Dado y Linterna añadidos en la actualización del 12 de agosto.",
        intro: "La actualización del 12 de agosto añade dos nuevos espacios de equipo Arcana. Esta guía explica cómo obtenerlos y usarlos.",
        sourceNote: "Basado en las notas de la actualización del 12 de agosto.",
        keywords: ["AION2 Arcana Dado", "AION2 Arcana Linterna", "AION2 nuevo equipo Arcana"],
        sections: [
          section("what-are-arcana", "¿Qué son los Arcana Dado y Linterna?", ["Dos nuevos espacios de equipo Arcana que ofrecen opciones ofensivas como Perfect, Critical, Multi-hit.", "Obtenidos en la mazmorra de trascendencia Legado oculto de Noiran."]),
          section("how-to-obtain", "Cómo obtenerlos", ["La mazmorra de trascendencia Legado oculto de Noiran es la fuente principal. Tiene cuatro fases."]),
          section("stat-options", "Opciones de estadísticas", ["Perfect, Critical, Multi-hit y otras opciones ofensivas están disponibles."]),
          section("build-integration", "Integración en la construcción", ["Las clases de daño se benefician de aumentos directos. Las clases de apoyo pueden usar opciones ofensivas."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "装備ガイド", title: "AION2 ダイス＆ランタンアルカナガイド: 新装備スロットとビルドオプション",
        description: "8月12日アップデートで追加されたダイスとランタンアルカナ装備スロットの完全ガイド。",
        intro: "8月12日アップデートで2つの新しいアルカナ装備スロットが追加されました。このガイドは入手方法と使用方法を説明します。",
        sourceNote: "8月12日アップデートノートに基づきます。",
        keywords: ["AION2 ダイスアルカナ", "AION2 ランタンアルカナ", "AION2 新アルカナ装備"],
        sections: [
          section("what-are-arcana", "ダイスとランタンアルカナとは?", ["Perfect, Critical, Multi-hitなどの攻撃オプションを提供する新しいアルカナ装備スロットです。", "ノイランの隠された遺産超越ダンジョンから入手できます。"]),
          section("how-to-obtain", "入手方法", ["ノイランの隠された遺産超越ダンジョンが主な入手源です。4段階で構成されています。"]),
          section("stat-options", "ステータスオプション", ["Perfect, Critical, Multi-hitなどの攻撃オプションが利用可能です。"]),
          section("build-integration", "ビルド統合", ["ダメージクラスは直接的な強化を、サポートクラスは攻撃オプションを活用できます。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "GUIA DE EQUIPAMENTO", title: "Guia de Arcana Dado e Lanterna do AION2: novos espaços de equipamento",
        description: "Guia completo dos novos espaços de equipamento Arcana Dado e Lanterna adicionados na atualização de 12 de agosto.",
        intro: "A atualização de 12 de agosto adiciona dois novos espaços de equipamento Arcana. Este guia explica como obtê-los e usá-los.",
        sourceNote: "Baseado nas notas da atualização de 12 de agosto.",
        keywords: ["AION2 Arcana Dado", "AION2 Arcana Lanterna", "AION2 novo equipamento Arcana"],
        sections: [
          section("what-are-arcana", "O que são Arcana Dado e Lanterna?", ["Dois novos espaços de equipamento Arcana com opções ofensivas como Perfect, Critical, Multi-hit.", "Obtidos na masmorra de transcendência Legado Oculto de Noiran."]),
          section("how-to-obtain", "Como obter", ["A masmorra de transcendência Legado Oculto de Noiran é a fonte principal. Tem quatro fases."]),
          section("stat-options", "Opções de atributos", ["Perfect, Critical, Multi-hit e outras opções ofensivas estão disponíveis."]),
          section("build-integration", "Integração na construção", ["Classes de dano se beneficiam de aumentos diretos. Classes de suporte podem usar opções ofensivas."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "РУКОВОДСТВО ПО ЭКИПИРОВКЕ", title: "Руководство по Arcana Кость и Фонарь AION2: новые слоты экипировки",
        description: "Полное руководство по новым слотам экипировки Arcana Кость и Фонарь, добавленным в обновлении от 12 августа.",
        intro: "Обновление от 12 августа добавляет два новых слота экипировки Arcana. Это руководство объясняет, как их получить и использовать.",
        sourceNote: "Основано на примечаниях к обновлению от 12 августа.",
        keywords: ["AION2 Arcana Кость", "AION2 Arcana Фонарь", "AION2 новая экипировка Arcana"],
        sections: [
          section("what-are-arcana", "Что такое Arcana Кость и Фонарь?", ["Два новых слота экипировки Arcana с наступательными опциями, такими как Perfect, Critical, Multi-hit.", "Получаются в подземелье transcendence Скрытое наследие Нойрана."]),
          section("how-to-obtain", "Как получить", ["Подземелье transcendence Скрытое наследие Нойрана — основной источник. Имеет четыре фазы."]),
          section("stat-options", "Варианты характеристик", ["Perfect, Critical, Multi-hit и другие наступательные опции доступны."]),
          section("build-integration", "Интеграция в сборку", ["Классы урона получают прямое усиление. Классы поддержки могут использовать наступательные опции."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "裝備指南",
        title: "AION2 骰子與燈籠 Arcana 指南：新裝備插槽與構建選項",
        description: "8月12日更新新增骰子和燈籠 Arcana 裝備插槽的完整指南。涵蓋獲取方式、屬性選項以及如何優化構建。",
        intro: "8月12日更新新增了兩個 Arcana 裝備插槽：骰子和燈籠。本指南涵蓋如何獲取新 Arcana 物品、可用屬性以及如何整合到現有構建中。",
        sourceNote: "基於 8 月 12 日更新說明。",
        keywords: ["AION2 骰子 Arcana", "AION2 燈籠 Arcana", "AION2 新 Arcana 裝備"],
        sections: [
          section("what-are-arcana", "骰子和燈籠 Arcana 是什麼？", ["骰子和燈籠是 8 月 12 日更新新增的兩個 Arcana 裝備插槽，專注於進攻屬性。", "新 Arcana 物品從尼奧蘭的隱藏遺產超越副本獲得。"]),
          section("how-to-obtain", "獲取方式", ["尼奧蘭的隱藏遺產超越副本是主要來源。副本有四個階段。"]),
          section("stat-options", "屬性選項", ["Perfect、Critical、Multi-hit 等進攻屬性選項可用。"]),
          section("build-integration", "構建整合", ["傷害輸出職業獲得直接傷害提升，支援職業可利用進攻選項。"]),
        ],
      }),
    },
  },
  // ARTICLE 5: Second new class teased
  {
    section: "news",
    slug: "second-new-class-teased",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [invenDevstreamSource, aug12PatchSource],
    heroImage: patchHero,
    related: [
      { kind: "content", section: "guides", slug: "class-selection-pve-pvp-guide-global" },
      { kind: "content", section: "guides", slug: "chapter-1-content-guide-global" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 4, {
        eyebrow: "DEVELOPER TEASE",
        title: "AION2 second new class teased: concept phase complete, development underway",
        description: "NCSoft confirms a second new class for AION2 during the August 11 Devstream, with concept designs finished and modeling/skill configuration in progress. Speculation and analysis inside.",
        intro: "During the August 11, 2026 Devstream, AION2 developers confirmed that a second new class is in development, with concept phase completed and modeling and skill configuration currently underway. This follows the Brawler class, which was added in Chapter 1 (July 2026). The developers also announced Class Concept Enhancements starting from August 26, aimed at strengthening each class's unique identity.",
        sourceNote: "Based on Inven Global's Devstream coverage (August 11, 2026). Details about the second class are unconfirmed — concept phase completion and modeling-in-progress are the only confirmed facts. Class type speculation is clearly marked as editorial analysis.",
        keywords: ["AION2 second new class", "AION2 new class 2026", "AION2 next class speculation", "AION2 class concept enhancements"],
        sections: [
          section("devstream-confirmation", "What the Devstream confirmed: second new class in development", ["The August 11 Devstream confirmed that a second new class is in development for AION2. The concept phase has been completed, and the team is currently working on modeling and skill configuration. No release date, class name, or weapon type was announced. The Class Concept Enhancements, which begin rolling out August 26, are a separate initiative to refine existing classes.", "This is the second new class announcement since the game's launch. The first new class, Brawler, was added with Chapter 1 on July 1, 2026. The developers have stated that the goal is to expand the class roster beyond the original eight base classes plus Brawler, moving toward a more diverse lineup."]),
          section("brawler-context", "Context: Brawler class and where the roster stands", ["The Brawler (拳星) was added on July 1, 2026 as AION2's first new class. It uses Gauntlets and specializes in front-line combo combat with a Rage/Rampage resource system. The Brawler joined the eight base classes: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter.", "With the Brawler, the Korea/Taiwan roster has 9 playable classes. The second new class would bring the total to 10. The global version is launching with the 8 base classes; the Brawler and second new class may arrive in future updates."]),
          section("speculation", "Speculation: what could the second new class be?", ["[Editorial speculation] Based on MMO class trends and AION 1's class history, possible directions include a stealth-focused assassin variant, a gun-wielding ranged class, or a shapeshifter/druid type. AION 1 had a Gunner class (ranged physical DPS) and a Bard class (magical support), which could serve as design references. A pet-focused class expanding on Spiritmaster's summoning theme is also possible.", "The developers' emphasis on 'class uniqueness' and 'enhancing manual play' suggests the new class may have a more complex skill rotation or resource management system than existing classes. The Class Concept Enhancements starting August 26 may provide hints about the direction of the new class design."]),
          section("enhancements", "Class Concept Enhancements (August 26 onwards)", ["Starting August 26, AION2 will begin rolling out Class Concept Enhancements. These are described as adjustments to each class's core identity, aiming to make each class feel more distinct. The enhancements will emphasize manual skill execution while maintaining synergy with macro systems.", "These enhancements are separate from the new class development. They apply to existing classes and may provide insights into the developers' design philosophy. The changes may also affect how the new class is balanced against existing classes at launch."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 4, {
        eyebrow: "开发者预告",
        title: "AION2 第二个新职业预告：概念阶段完成，开发进行中",
        description: "NCSoft 在 8 月 11 日 Devstream 中确认 AION2 的第二个新职业正在开发中，概念设计已完成，建模和技能配置进行中。",
        intro: "在 2026 年 8 月 11 日的 Devstream 中，AION2 开发者确认第二个新职业正在开发中，概念阶段已完成，建模和技能配置正在进行中。此前 Brawler 拳星职业已在 Chapter 1（2026 年 7 月）中加入。",
        sourceNote: "基于 Inven Global 的 Devstream 报道（2026 年 8 月 11 日）。第二个职业的具体细节尚未确认。",
        keywords: ["AION2 第二个新职业", "AION2 新职业 2026", "AION2 下个职业猜测", "AION2 职业概念增强"],
        sections: [
          section("devstream-confirmation", "Devstream 确认：第二个新职业开发中", ["8 月 11 日 Devstream 确认第二个新职业正在开发中。概念阶段已完成，团队正在进行建模和技能配置。未公布发布日期、职业名称或武器类型。", "这是自游戏上线以来的第二个新职业公告。第一个新职业 Brawler 拳星已在 Chapter 1 中加入。"]),
          section("brawler-context", "背景：Brawler 拳星与当前职业阵容", ["Brawler 拳星于 2026 年 7 月 1 日作为 AION2 的首个新职业加入。它使用 Gauntlets 武器，专精前线连击战斗。", "加上 Brawler，韩服/台服有 9 个可玩职业。第二个新职业将把总数提升至 10 个。"]),
          section("speculation", "猜测：第二个新职业可能是什么？", ["[编辑推测] 基于 MMO 职业趋势和 AION 1 的职业历史，可能的方向包括潜行刺客变体、枪械远程职业或变形者/德鲁伊类型。", "开发者强调'职业独特性'和'强化手动操作'，暗示新职业可能有更复杂的技能循环或资源管理系统。"]),
          section("enhancements", "职业概念增强（8 月 26 日起）", ["从 8 月 26 日起，AION2 将开始推出职业概念增强。这些调整旨在让每个职业更具独特性。", "这些增强与第二个新职业开发是独立的。它们适用于现有职业，可能提供开发者设计理念的洞察。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 4, {
        eyebrow: "개발자 티저",
        title: "AION2 두 번째 신규 클래스 티저: 컨셉 단계 완료, 개발 진행 중",
        description: "NCSoft가 8월 11일 Devstream에서 AION2 두 번째 신규 클래스 개발을 확인했습니다. 컨셉 디자인 완료, 모델링 및 스킬 구성 진행 중.",
        intro: "2026년 8월 11일 Devstream에서 AION2 개발자가 두 번째 신규 클래스 개발을 확인했습니다.",
        sourceNote: "Inven Global의 Devstream 보도(2026년 8월 11일)에 기반합니다.",
        keywords: ["AION2 두 번째 신규 클래스", "AION2 신규 클래스 2026", "AION2 다음 클래스"],
        sections: [
          section("devstream-confirmation", "Devstream 확인", ["8월 11일 Devstream에서 두 번째 신규 클래스 개발이 확인됐습니다. 컨셉 단계 완료, 모델링 및 스킬 구성 진행 중입니다."]),
          section("brawler-context", "브롤러와 현재 클래스 현황", ["브롤러는 2026년 7월 1일 AION2 첫 신규 클래스로 추가됐습니다. 현재 9개 클래스입니다."]),
          section("speculation", "추측", ["[편집 추측] 은신 암살자, 총기 원거리 클래스, 변신/드루이드 유형 등이 가능합니다."]),
          section("enhancements", "클래스 컨셉 강화", ["8월 26일부터 클래스 컨셉 강화가 시작됩니다. 각 클래스의 핵심 정체성을 조정합니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 4, {
        eyebrow: "TEASE DU DÉVELOPPEUR", title: "Deuxième nouvelle classe d'AION2 teasée : phase de concept terminée",
        description: "NCSoft confirme une deuxième nouvelle classe pour AION2 lors du Devstream du 11 août, conception terminée.",
        intro: "Lors du Devstream du 11 août 2026, les développeurs ont confirmé le développement d'une deuxième nouvelle classe.",
        sourceNote: "Basé sur la couverture Devstream d'Inven Global (11 août 2026).",
        keywords: ["deuxième nouvelle classe AION2", "nouvelle classe AION2 2026", "AION2 prochaine classe"],
        sections: [
          section("devstream-confirmation", "Confirmation Devstream", ["Une deuxième nouvelle classe est en développement. Phase de concept terminée, modélisation et configuration des compétences en cours."]),
          section("brawler-context", "Contexte Brawler", ["Le Brawler a été ajouté le 1er juillet 2026. La deuxième classe porterait le total à 10."]),
          section("speculation", "Spéculation", ["[Spéculation éditoriale] Variante d'assassin furtif, classe à distance armée ou type druide."]),
          section("enhancements", "Améliorations de concept", ["À partir du 26 août, des améliorations du concept de classe seront déployées."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 4, {
        eyebrow: "ENTWICKLER-TEASER", title: "Zweite neue AION2-Klasse geteast: Konzeptphase abgeschlossen",
        description: "NCSoft bestätigt eine zweite neue Klasse für AION2 im Devstream vom 11. August, Konzept abgeschlossen.",
        intro: "Im Devstream vom 11. August 2026 bestätigten die Entwickler eine zweite neue Klasse in Entwicklung.",
        sourceNote: "Basierend auf der Devstream-Berichterstattung von Inven Global (11. August 2026).",
        keywords: ["zweite neue AION2-Klasse", "neue AION2-Klasse 2026", "AION2 nächste Klasse"],
        sections: [
          section("devstream-confirmation", "Devstream-Bestätigung", ["Eine zweite neue Klasse ist in Entwicklung. Konzeptphase abgeschlossen, Modellierung und Skill-Konfiguration laufen."]),
          section("brawler-context", "Brawler-Kontext", ["Der Brawler wurde am 1. Juli 2026 hinzugefügt. Die zweite Klasse würde die Gesamtzahl auf 10 erhöhen."]),
          section("speculation", "Spekulation", ["[Redaktionelle Spekulation] Schleich-Assassine, Fernkampfklasse oder Druiden-Typ."]),
          section("enhancements", "Klassenkonzept-Verbesserungen", ["Ab 26. August werden Klassenkonzept-Verbesserungen ausgerollt."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 4, {
        eyebrow: "TEASE DEL DESARROLLADOR", title: "Segunda nueva clase de AION2 teasada: fase de concepto completada",
        description: "NCSoft confirma una segunda nueva clase para AION2 durante el Devstream del 11 de agosto, concepto terminado.",
        intro: "Durante el Devstream del 11 de agosto de 2026, los desarrolladores confirmaron una segunda nueva clase en desarrollo.",
        sourceNote: "Basado en la cobertura de Devstream de Inven Global (11 de agosto de 2026).",
        keywords: ["segunda nueva clase AION2", "nueva clase AION2 2026", "AION2 próxima clase"],
        sections: [
          section("devstream-confirmation", "Confirmación Devstream", ["Una segunda nueva clase está en desarrollo. Fase de concepto completada, modelado y configuración de habilidades en curso."]),
          section("brawler-context", "Contexto Brawler", ["El Brawler se añadió el 1 de julio de 2026. La segunda clase llevaría el total a 10."]),
          section("speculation", "Especulación", ["[Especulación editorial] Variante de asesino sigiloso, clase a distancia armada o tipo druida."]),
          section("enhancements", "Mejoras de concepto", ["A partir del 26 de agosto, se implementarán mejoras de concepto de clase."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 4, {
        eyebrow: "開発者ティーザー", title: "AION2 2番目の新クラスがティーザー: コンセプト段階完了",
        description: "NCSoft が8月11日 Devstream で AION2 の2番目の新クラス開発を確認。コンセプト段階完了。",
        intro: "2026年8月11日の Devstream で、開発者が2番目の新クラス開発を確認しました。",
        sourceNote: "Inven Global の Devstream 報道（2026年8月11日）に基づきます。",
        keywords: ["AION2 2番目の新クラス", "AION2 新クラス 2026", "AION2 次のクラス"],
        sections: [
          section("devstream-confirmation", "Devstream 確認", ["2番目の新クラスが開発中です。コンセプト段階完了、モデリングとスキル設定進行中。"]),
          section("brawler-context", "Brawler の背景", ["Brawler は2026年7月1日に追加されました。2番目のクラスで合計10になります。"]),
          section("speculation", "推測", ["[編集推測] ステルス暗殺者、銃器遠距離クラス、ドルイドタイプなどが考えられます。"]),
          section("enhancements", "クラスコンセプト強化", ["8月26日からクラスコンセプト強化が展開されます。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 4, {
        eyebrow: "TEASE DO DESENVOLVEDOR", title: "Segunda nova classe do AION2 teasada: fase de conceito concluída",
        description: "NCSoft confirma uma segunda nova classe para AION2 durante o Devstream de 11 de agosto, conceito concluído.",
        intro: "Durante o Devstream de 11 de agosto de 2026, os desenvolvedores confirmaram uma segunda nova classe em desenvolvimento.",
        sourceNote: "Baseado na cobertura Devstream da Inven Global (11 de agosto de 2026).",
        keywords: ["segunda nova classe AION2", "nova classe AION2 2026", "AION2 próxima classe"],
        sections: [
          section("devstream-confirmation", "Confirmação Devstream", ["Uma segunda nova classe está em desenvolvimento. Fase de conceito concluída, modelagem e configuração de habilidades em andamento."]),
          section("brawler-context", "Contexto Brawler", ["O Brawler foi adicionado em 1º de julho de 2026. A segunda classe elevaria o total para 10."]),
          section("speculation", "Especulação", ["[Especulação editorial] Variante de assassino furtivo, classe de longo alcance ou tipo druida."]),
          section("enhancements", "Melhorias de conceito", ["A partir de 26 de agosto, melhorias de conceito de classe serão implementadas."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 4, {
        eyebrow: "ТИЗЕР РАЗРАБОТЧИКА", title: "Тизер второго нового класса AION2: фаза концепции завершена",
        description: "NCSoft подтверждает второй новый класс для AION2 во время Devstream 11 августа, концепция завершена.",
        intro: "Во время Devstream 11 августа 2026 года разработчики подтвердили разработку второго нового класса.",
        sourceNote: "Основано на освещении Devstream Inven Global (11 августа 2026).",
        keywords: ["второй новый класс AION2", "новый класс AION2 2026", "AION2 следующий класс"],
        sections: [
          section("devstream-confirmation", "Подтверждение Devstream", ["Второй новый класс в разработке. Фаза концепции завершена, моделирование и настройка навыков в процессе."]),
          section("brawler-context", "Контекст Brawler", ["Brawler был добавлен 1 июля 2026 года. Второй класс доведёт общее количество до 10."]),
          section("speculation", "Спекуляция", ["[Редакционная спекуляция] Скрытный убийца, дальнобойный класс или тип друида."]),
          section("enhancements", "Улучшения концепции", ["С 26 августа начнут развёртываться улучшения концепции классов."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 4, {
        eyebrow: "開發者預告",
        title: "AION2 第二個新職業預告：概念階段完成，開發進行中",
        description: "NCSoft 在 8 月 11 日 Devstream 中確認 AION2 的第二個新職業正在開發中，概念設計已完成。",
        intro: "在 2026 年 8 月 11 日的 Devstream 中，AION2 開發者確認第二個新職業正在開發中。",
        sourceNote: "基於 Inven Global 的 Devstream 報導（2026 年 8 月 11 日）。",
        keywords: ["AION2 第二個新職業", "AION2 新職業 2026", "AION2 下個職業"],
        sections: [
          section("devstream-confirmation", "Devstream 確認", ["第二個新職業正在開發中。概念階段已完成，建模和技能配置進行中。"]),
          section("brawler-context", "Brawler 背景", ["Brawler 拳星於 2026 年 7 月 1 日加入。第二個新職業將使總數達到 10 個。"]),
          section("speculation", "猜測", ["[編輯推測] 潛行暗殺者、槍械遠程職業或德魯伊類型等。"]),
          section("enhancements", "職業概念增強", ["8 月 26 日起將推出職業概念增強。"]),
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];

export const trendingAugust12GeneratedEditorialEntries = {
  "news/august-12-2026-update-overview": {},
  "guides/healer-nerf-survival-guide": {},
  "news/housing-system-life-content-announced": {},
  "guides/dice-lantern-arcana-equipment-guide": {},
  "news/second-new-class-teased": {},
} as const;