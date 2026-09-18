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

const aug12PatchUrl = "https://aion2t.com/news/38";
const aug12PatchSource: ContentSource = {
  id: "aion2t-august-12-detailed-2026-08-13",
  kind: "third-party", publisher: "AION2T",
  label: "AION2 August 12, 2026 Update Notes — Full Details",
  url: aug12PatchUrl,
  publishedAt: "2026-08-12",
  retrievedAt: "2026-08-13",
  verifiedAt: "2026-08-13",
  localizations: localizations({
    "zh-hans": "AION2 8月12日更新说明——完整详情",
    en: "AION2 August 12, 2026 Update Notes — Full Details",
    fr: "Notes de mise à jour AION2 du 12 août 2026 — Détails complets",
    de: "AION2 Update-Hinweise vom 12. August 2026 — Vollständige Details",
    es: "Notas de la actualización de AION2 del 12 de agosto de 2026 — Detalles completos",
    ja: "AION2 2026年8月12日アップデートノート — 完全詳細",
    "pt-br": "Notas da atualização de AION2 de 12 de agosto de 2026 — Detalhes completos",
    ru: "Примечания к обновлению AION2 от 12 августа 2026 — Полные детали",
    ko: "AION2 2026년 8월 12일 업데이트 노트 — 전체 상세",
    "zh-hant": "AION2 8月12日更新說明——完整詳情",
  }, aug12PatchUrl),
};

const ncOfficialUrl = "https://aion2.plaync.com/ko-kr/board/update/view?articleId=6a7b7838eea53f5d6dbcf253";
const ncOfficialSource: ContentSource = {
  id: "ncsoft-august-12-official-2026-08-13",
  kind: "official", publisher: "NCSOFT",
  label: "AION2 August 12, 2026 Official Update Notes",
  url: ncOfficialUrl,
  publishedAt: "2026-08-12",
  retrievedAt: "2026-08-13",
  verifiedAt: "2026-08-13",
  localizations: localizations({
    "zh-hans": "AION2 8月12日官方更新说明",
    en: "AION2 August 12, 2026 Official Update Notes",
    fr: "Notes de mise à jour officielles AION2 du 12 août 2026",
    de: "Offizielle AION2 Update-Hinweise vom 12. August 2026",
    es: "Notas oficiales de la actualización de AION2 del 12 de agosto de 2026",
    ja: "AION2 2026年8月12日公式アップデートノート",
    "pt-br": "Notas oficiais da atualização de AION2 de 12 de agosto de 2026",
    ru: "Официальные примечания к обновлению AION2 от 12 августа 2026",
    ko: "AION2 2026년 8월 12일 공식 업데이트 노트",
    "zh-hant": "AION2 8月12日官方更新說明",
  }, ncOfficialUrl),
};

/* ------------------------------------------------------------------ */
/* Hero images                                                         */
/* ------------------------------------------------------------------ */

const hudHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 手机HUD编辑器界面", caption: "NC 官方配图；8月12日更新新增手机HUD编辑器，支持网格布局、缩放和独立隐藏元素。" },
    en: { alt: "AION2 Mobile HUD Editor interface", caption: "Official NC artwork; August 12 update adds Mobile HUD editing with grid layout, scaling, and independent element hiding." },
    fr: { alt: "Interface de l'éditeur HUD mobile AION2", caption: "Visuel officiel NC ; la mise à jour du 12 août ajoute un éditeur HUD mobile avec grille, échelle et masquage indépendant." },
    de: { alt: "AION2 Mobile-HUD-Editor-Oberfläche", caption: "Offizielles NC-Artwork; Update vom 12. August fügt Mobile-HUD-Editor mit Raster, Skalierung und unabhängigem Ausblenden hinzu." },
    es: { alt: "Interfaz del editor HUD móvil de AION2", caption: "Arte oficial de NC; la actualización del 12 de agosto añade un editor HUD móvil con cuadrícula, escala y ocultación independiente." },
    ja: { alt: "AION2 モバイルHUDエディター画面", caption: "NC 公式画像。8月12日アップデートでモバイルHUDエディターが追加されました。" },
    "pt-br": { alt: "Interface do editor de HUD móvel do AION2", caption: "Arte oficial da NC; atualização de 12 de agosto adiciona editor de HUD móvel com grade, escala e ocultação independente." },
    ru: { alt: "Интерфейс мобильного редактора HUD AION2", caption: "Официальный арт NC; обновление от 12 августа добавляет мобильный редактор HUD." },
    ko: { alt: "AION2 모바일 HUD 편집기 화면", caption: "NC 공식 이미지입니다. 8월 12일 업데이트로 모바일 HUD 편집기가 추가됐습니다." },
    "zh-hant": { alt: "AION2 手機HUD編輯器介面", caption: "NC 官方配圖；8月12日更新新增手機HUD編輯器，支援網格佈局、縮放和獨立隱藏元素。" },
  },
};

const gearHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 新装备制作系统", caption: "NC 官方配图；8月12日更新新增龙族制作饰品和深淵皇家卫队长饰品。" },
    en: { alt: "AION2 new gear crafting system", caption: "Official NC artwork; August 12 update adds Draconic craft accessories and Abyss Royal Guard Captain gear." },
    fr: { alt: "Nouveau système de fabrication d'équipement AION2", caption: "Visuel officiel NC ; la mise à jour ajoute des accessoires Draconiques et de l'équipement Abyss." },
    de: { alt: "AION2 neues Ausrüstungs-Handwerkssystem", caption: "Offizielles NC-Artwork; Update fügt Drachen-Handwerkszubehör und Abyss-Ausrüstung hinzu." },
    es: { alt: "Nuevo sistema de fabricación de equipo de AION2", caption: "Arte oficial de NC; la actualización añade accesorios de artesanía dracónica y equipo Abyss." },
    ja: { alt: "AION2 新装備クラフトシステム", caption: "NC 公式画像。8月12日アップデートでドラゴニッククラフトアクセサリーとアビス装備が追加されました。" },
    "pt-br": { alt: "Novo sistema de fabricação de equipamentos AION2", caption: "Arte oficial da NC; atualização adiciona acessórios Draconic e equipamento Abyss." },
    ru: { alt: "Новая система крафта снаряжения AION2", caption: "Официальный арт NC; обновление добавляет драконьи аксессуары и экипировку Бездны." },
    ko: { alt: "AION2 신규 장비 제작 시스템", caption: "NC 공식 이미지입니다. 8월 12일 업데이트로 드라코닉 제작 액세서리와 어비스 장비가 추가됐습니다." },
    "zh-hant": { alt: "AION2 新裝備製作系統", caption: "NC 官方配圖；8月12日更新新增龍族製作飾品和深淵皇家衛隊長飾品。" },
  },
};

const shopHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 商店UI重做", caption: "NC 官方配图；8月12日更新商店UI全面重做，新增外观标签页，推出仲夏夜之梦睡衣主题外观。" },
    en: { alt: "AION2 Shop UI redesign", caption: "Official NC artwork; August 12 update brings a full Shop UI redesign with a new Appearance tab and Midsummer Night's Dream pajama cosmetics." },
    fr: { alt: "Refonte de l'interface de la boutique AION2", caption: "Visuel officiel NC ; la mise à jour apporte une refonte complète de l'interface de la boutique." },
    de: { alt: "AION2 Shop-UI-Neugestaltung", caption: "Offizielles NC-Artwork; Update bringt komplette Shop-UI-Überholung." },
    es: { alt: "Rediseño de la interfaz de la tienda de AION2", caption: "Arte oficial de NC; la actualización trae un rediseño completo de la interfaz de la tienda." },
    ja: { alt: "AION2 ショップUIリニューアル", caption: "NC 公式画像。8月12日アップデートでショップUIが全面リニューアルされました。" },
    "pt-br": { alt: "Redesenho da interface da loja AION2", caption: "Arte oficial da NC; atualização traz redesenho completo da interface da loja." },
    ru: { alt: "Редизайн интерфейса магазина AION2", caption: "Официальный арт NC; обновление приносит полный редизайн интерфейса магазина." },
    ko: { alt: "AION2 상점 UI 개편", caption: "NC 공식 이미지입니다. 8월 12일 업데이트로 상점 UI가 전면 개편됐습니다." },
    "zh-hant": { alt: "AION2 商店UI重做", caption: "NC 官方配圖；8月12日更新商店UI全面重做，新增外觀標籤頁。" },
  },
};

const bgHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION2 战场匹配改版", caption: "NC 官方配图；8月12日更新战场匹配改为单人排队或5人固定队，引入跨阵营组队和职业平衡修正。" },
    en: { alt: "AION2 Battleground matchmaking changes", caption: "Official NC artwork; August 12 update reworks Battleground matching to solo or 5-stack only, with cross-faction teams and class balance correction." },
    fr: { alt: "Changements de matchmaking des champs de bataille AION2", caption: "Visuel officiel NC ; la mise à jour refond le matchmaking des champs de bataille." },
    de: { alt: "AION2 Schlachtfeld-Matchmaking-Änderungen", caption: "Offizielles NC-Artwork; Update überarbeitet Schlachtfeld-Matching." },
    es: { alt: "Cambios en el emparejamiento de campos de batalla de AION2", caption: "Arte oficial de NC; la actualización reforma el emparejamiento de campos de batalla." },
    ja: { alt: "AION2 バトルグラウンドマッチング変更", caption: "NC 公式画像。8月12日アップデートでバトルグラウンドのマッチングが変更されました。" },
    "pt-br": { alt: "Mudanças no matchmaking de campos de batalha AION2", caption: "Arte oficial da NC; atualização reforma o matchmaking de campos de batalha." },
    ru: { alt: "Изменения подбора полей боя AION2", caption: "Официальный арт NC; обновление перерабатывает подбор полей боя." },
    ko: { alt: "AION2 전장 매치메이킹 변경", caption: "NC 공식 이미지입니다. 8월 12일 업데이트로 전장 매치메이킹이 변경됐습니다." },
    "zh-hant": { alt: "AION2 戰場配對改版", caption: "NC 官方配圖；8月12日更新戰場配對改為單人排隊或5人固定隊。" },
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

export const trendingAugust13ContentEntries = [
  // ARTICLE 1: Mobile HUD Editor Guide
  {
    section: "guides",
    slug: "mobile-hud-editor-guide",
    schemaType: "TechArticle",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [aug12PatchSource, ncOfficialSource],
    heroImage: hudHero,
    related: [
      { kind: "content", section: "news", slug: "august-12-2026-update-overview" },
      { kind: "content", section: "guides", slug: "dice-lantern-arcana-equipment-guide" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "MOBILE HUD EDITOR",
        title: "AION2 Mobile HUD Editor: How to Customize Your Interface — Complete Guide",
        description: "AION2's August 12 update adds a Mobile HUD editor with grid spacing, UI scaling, snapping, independent element hiding, Stigma and Transformation slot separation, and an expanded 8-slot consumable display.",
        intro: "The August 12, 2026 update introduces a long-awaited feature: a Mobile HUD editor that lets you reorganize your on-screen interface. This guide covers everything you need to know — how to access the editor, configure grid spacing and UI scale, reposition elements with snapping, hide individual components, and separate Stigma and Transformation slots for independent arrangement.",
        sourceNote: "Based on the AION2T August 12 update summary and official NCSOFT patch notes. Korea/Taiwan service update; mobile HUD editor may arrive for global version at a later date.",
        keywords: ["AION2 Mobile HUD editor", "AION2 HUD customization", "AION2 mobile interface", "AION2 UI editor", "AION2 August 12 update HUD"],
        sections: [
          section("accessing-editor", "How to access the Mobile HUD editor", ["The Mobile HUD editor is accessible from the in-game settings menu on mobile devices. Look for the 'HUD Edit' or 'Interface Edit' option in your settings panel. The editor opens an overlay of your current HUD layout, with all elements displayed as movable, resizable blocks.", "The editor includes a detailed control guide accessible via the [i] button in the HUD edit settings window. This guide explains touch gestures for moving, resizing, and toggling each element."]),
          section("grid-layout", "Grid spacing, UI scale, and snapping", ["The editor provides three core layout tools: grid spacing determines the snap increments for element positioning; UI scale controls the overall size of HUD elements; and snapping ensures elements align cleanly to the grid. These tools work together to help you create a clean, organized interface.", "The grid spacing and UI scale are adjustable sliders in the edit settings panel. Snapping can be toggled on or off. When snapping is enabled, elements will automatically align to the nearest grid intersection when you release them."]),
          section("hiding-elements", "Independent element hiding and unhiding", ["Every HUD element can be independently hidden or unhidden. This is useful for reducing clutter during combat or focusing on specific information. Hidden elements are removed from the display entirely, freeing up screen space.", "To hide an element, select it in the editor and toggle the visibility option. Hidden elements are shown as semi-transparent outlines in the editor for easy identification, and can be unhidden at any time."]),
          section("stigma-transformation", "Stigma and Transformation slot separation", ["The Stigma slots and Transformation slots can now be separated from each other, then rearranged and resized independently. This is a significant improvement for players who want to prioritize one set of slots over the other.", "Previously, these slots were locked together in a fixed layout. The separation allows you to place Stigma slots near your skill bar for quick access during combat, while keeping Transformation slots in a secondary position."]),
          section("consumable-slots", "Expanded consumable slot display", ["A new expansion shows all eight consumable slots at once, replacing the previous limited view. This gives you full visibility of your potions, scrolls, and other consumables without needing to scroll or open sub-menus.", "The eight-slot display is fully customizable like the rest of the HUD — you can resize it, reposition it, or hide individual slots as needed. This is particularly useful for healers and support classes who rely on multiple consumables in combat."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "手机HUD编辑器",
        title: "AION2 手机HUD编辑器：如何自定义界面——完整指南",
        description: "AION2 8月12日更新新增手机HUD编辑器，支持网格间距、UI缩放、吸附对齐、独立元素隐藏、Stigma和Transform插槽分离以及8格消耗品显示。",
        intro: "2026年8月12日更新引入了期待已久的手机HUD编辑器，让你可以重新组织屏幕界面。本指南涵盖所有你需要了解的内容——如何访问编辑器、配置网格间距和UI缩放、重新定位元素、隐藏单个组件以及分离Stigma和Transform插槽。",
        sourceNote: "基于 AION2T 8月12日更新摘要和官方 NCSOFT 补丁说明。韩服/台服更新内容；全球版手机HUD编辑器可能稍后推出。",
        keywords: ["AION2 手机HUD编辑器", "AION2 HUD自定义", "AION2 手机界面", "AION2 UI编辑器", "AION2 8月12日更新 HUD"],
        sections: [
          section("accessing-editor", "如何访问手机HUD编辑器", ["手机HUD编辑器可从移动设备的游戏内设置菜单访问。在设置面板中寻找'HUD编辑'或'界面编辑'选项。编辑器会打开当前HUD布局的覆盖层，所有元素都以可移动、可调整大小的方块显示。", "编辑器包含详细的控制指南，可通过HUD编辑设置窗口中的[i]按钮访问。该指南解释了移动、调整大小和切换每个元素的触控手势。"]),
          section("grid-layout", "网格间距、UI缩放和吸附对齐", ["编辑器提供三种核心布局工具：网格间距决定元素定位的吸附增量；UI缩放控制HUD元素的整体大小；吸附确保元素整齐对齐到网格。这些工具协同工作，帮助你创建整洁有序的界面。", "网格间距和UI缩放是编辑设置面板中的可调节滑块。吸附可以打开或关闭。启用吸附时，释放元素会自动对齐到最近的网格交叉点。"]),
          section("hiding-elements", "独立元素隐藏和显示", ["每个HUD元素都可以独立隐藏或显示。这在战斗中减少混乱或专注于特定信息时非常有用。隐藏的元素会从显示中完全移除，释放屏幕空间。", "要隐藏元素，在编辑器中选择它并切换可见性选项。隐藏的元素在编辑器中显示为半透明轮廓，便于识别，并且可以随时重新显示。"]),
          section("stigma-transformation", "Stigma和Transform插槽分离", ["Stigma插槽和Transform插槽现在可以彼此分离，然后独立重新排列和调整大小。这对于希望优先关注某一组插槽的玩家来说是一个重大改进。", "以前，这些插槽锁定在固定布局中。分离后，你可以将Stigma插槽放在技能栏附近以便战斗中快速访问，同时将Transform插槽放在次要位置。"]),
          section("consumable-slots", "扩展消耗品插槽显示", ["新增的展开功能可同时显示所有八个消耗品插槽，取代了之前的有限视图。这使你可以完全查看药水、卷轴和其他消耗品，无需滚动或打开子菜单。", "八格显示与HUD的其他部分一样可完全自定义——你可以调整大小、重新定位或根据需要隐藏单个插槽。这对依赖多种消耗品进行战斗的治疗者和支援职业特别有用。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "모바일 HUD 편집기",
        title: "AION2 모바일 HUD 편집기: 인터페이스 커스터마이징 완벽 가이드",
        description: "AION2 8월 12일 업데이트로 모바일 HUD 편집기가 추가됐습니다. 그리드 간격, UI 스케일, 스냅, 개별 요소 숨김, Stigma/Transform 슬롯 분리, 8칸 소모품 표시를 지원합니다.",
        intro: "2026년 8월 12일 업데이트로 모바일 HUD 편집기가 추가돼 화면 인터페이스를 직접 재구성할 수 있게 됐습니다. 이 가이드에서는 편집기 접근 방법, 그리드 간격과 UI 스케일 설정, 요소 재배치, 개별 컴포넌트 숨김, Stigma와 Transform 슬롯 분리까지 모든 내용을 다룹니다.",
        sourceNote: "AION2T 8월 12일 업데이트 요약과 NCSOFT 공식 패치 노트에 기반합니다. 한국/대만 서비스 업데이트이며 글로벌 버전은 추후 제공될 수 있습니다.",
        keywords: ["AION2 모바일 HUD 편집기", "AION2 HUD 커스터마이징", "AION2 모바일 인터페이스", "AION2 UI 편집기", "AION2 8월 12일 업데이트 HUD"],
        sections: [
          section("accessing-editor", "모바일 HUD 편집기 접근 방법", ["모바일 HUD 편집기는 모바일 기기의 게임 내 설정 메뉴에서 접근할 수 있습니다. 설정 패널에서 'HUD 편집' 또는 '인터페이스 편집' 옵션을 찾으세요.", "HUD 편집 설정 창의 [i] 버튼을 통해 상세 조작 가이드에 접근할 수 있습니다."]),
          section("grid-layout", "그리드 간격, UI 스케일 및 스냅", ["편집기는 세 가지 핵심 레이아웃 도구를 제공합니다: 그리드 간격, UI 스케일, 스냅. 이 도구들은 깔끔한 인터페이스를 만드는 데 함께 작동합니다.", "그리드 간격과 UI 스케일은 조절 가능한 슬라이더이며, 스냅은 켜고 끌 수 있습니다."]),
          section("hiding-elements", "개별 요소 숨김 및 표시", ["모든 HUD 요소를 개별적으로 숨기거나 표시할 수 있습니다. 전투 중 혼잡을 줄이거나 특정 정보에 집중할 때 유용합니다.", "편집기에서 요소를 선택하고 가시성 옵션을 전환하세요. 숨겨진 요소는 편집기에서 반투명 윤곽선으로 표시됩니다."]),
          section("stigma-transformation", "Stigma 및 Transform 슬롯 분리", ["Stigma 슬롯과 Transform 슬롯을 서로 분리한 후 독립적으로 재배열하고 크기를 조정할 수 있습니다.", "이전에는 이 슬롯들이 고정 레이아웃으로 함께 잠겨 있었습니다. 이제 분리를 통해 각 슬롯 세트를 원하는 위치에 배치할 수 있습니다."]),
          section("consumable-slots", "확장된 소모품 슬롯 표시", ["8개의 모든 소모품 슬롯을 한 번에 표시하는 새로운 확장 기능이 추가됐습니다.", "8칸 표시는 HUD의 다른 부분과 마찬가지로 완전히 커스터마이징 가능합니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "ÉDITEUR HUD MOBILE",
        title: "Éditeur HUD mobile AION2 : Personnaliser votre interface — Guide complet",
        description: "La mise à jour du 12 août ajoute un éditeur HUD mobile avec grille, échelle, masquage d'éléments, séparation des emplacements Stigma et Transformation.",
        intro: "La mise à jour du 12 août 2026 introduit un éditeur HUD mobile très attendu. Ce guide couvre tout ce que vous devez savoir.",
        sourceNote: "Basé sur le résumé de la mise à jour AION2T et les notes officielles NCSOFT.",
        keywords: ["éditeur HUD mobile AION2", "personnalisation HUD AION2", "interface mobile AION2"],
        sections: [
          section("accessing-editor", "Accéder à l'éditeur HUD mobile", ["L'éditeur est accessible depuis le menu des paramètres sur appareils mobiles."]),
          section("grid-layout", "Grille, échelle et alignement", ["Trois outils de base : espacement de grille, échelle UI et alignement magnétique."]),
          section("hiding-elements", "Masquage indépendant des éléments", ["Chaque élément HUD peut être masqué ou affiché indépendamment."]),
          section("stigma-transformation", "Séparation des emplacements Stigma et Transformation", ["Les emplacements peuvent maintenant être séparés et réorganisés indépendamment."]),
          section("consumable-slots", "Affichage étendu des consommables", ["Les huit emplacements de consommables sont désormais visibles en une fois."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "MOBILER HUD-EDITOR",
        title: "AION2 Mobile-HUD-Editor: So passen Sie Ihre Oberfläche an",
        description: "Das Update vom 12. August fügt einen mobilen HUD-Editor mit Raster, Skalierung, Einrasten, Elementausblendung und getrennten Slots hinzu.",
        intro: "Das Update vom 12. August 2026 führt einen lang erwarteten mobilen HUD-Editor ein.",
        sourceNote: "Basierend auf der AION2T Update-Zusammenfassung und den offiziellen NCSOFT-Patch-Notizen.",
        keywords: ["AION2 Mobile-HUD-Editor", "AION2 HUD-Anpassung", "AION2 mobile Oberfläche"],
        sections: [
          section("accessing-editor", "Zugriff auf den HUD-Editor", ["Der Editor ist über das Einstellungsmenü auf mobilen Geräten zugänglich."]),
          section("grid-layout", "Raster, Skalierung und Einrasten", ["Drei Kernwerkzeuge: Rasterabstand, UI-Skalierung und Einrasten."]),
          section("hiding-elements", "Unabhängiges Ausblenden von Elementen", ["Jedes HUD-Element kann unabhängig ausgeblendet werden."]),
          section("stigma-transformation", "Getrennte Stigma- und Transformations-Slots", ["Die Slots können jetzt getrennt und unabhängig angeordnet werden."]),
          section("consumable-slots", "Erweiterte Verbrauchsgegenstand-Anzeige", ["Alle acht Verbrauchsgegenstand-Slots werden auf einmal angezeigt."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "EDITOR HUD MÓVIL",
        title: "Editor HUD móvil de AION2: Cómo personalizar tu interfaz",
        description: "La actualización del 12 de agosto añade un editor HUD móvil con cuadrícula, escala, ajuste, ocultación de elementos y separación de ranuras.",
        intro: "La actualización del 12 de agosto de 2026 introduce un editor HUD móvil muy esperado.",
        sourceNote: "Basado en el resumen de la actualización AION2T y las notas oficiales de NCSOFT.",
        keywords: ["editor HUD móvil AION2", "personalización HUD AION2", "interfaz móvil AION2"],
        sections: [
          section("accessing-editor", "Acceder al editor HUD móvil", ["El editor es accesible desde el menú de configuración en dispositivos móviles."]),
          section("grid-layout", "Cuadrícula, escala y ajuste", ["Tres herramientas principales: espaciado de cuadrícula, escala de UI y ajuste."]),
          section("hiding-elements", "Ocultación independiente de elementos", ["Cada elemento HUD puede ocultarse o mostrarse independientemente."]),
          section("stigma-transformation", "Separación de ranuras Stigma y Transformación", ["Las ranuras ahora pueden separarse y reorganizarse independientemente."]),
          section("consumable-slots", "Visualización ampliada de consumibles", ["Las ocho ranuras de consumibles se muestran de una vez."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "モバイルHUDエディター",
        title: "AION2 モバイルHUDエディター：インターフェースカスタマイズ完全ガイド",
        description: "8月12日アップデートでモバイルHUDエディターが追加されました。グリッド、UIスケール、スナップ、要素の個別非表示、Stigma/Transformスロット分離をサポート。",
        intro: "2026年8月12日アップデートで待望のモバイルHUDエディターが導入されました。",
        sourceNote: "AION2T 8月12日アップデート要約とNCSOFT公式パッチノートに基づきます。",
        keywords: ["AION2 モバイルHUDエディター", "AION2 HUDカスタマイズ", "AION2 モバイルインターフェース"],
        sections: [
          section("accessing-editor", "HUDエディターへのアクセス方法", ["モバイル端末の設定メニューからHUDエディターにアクセスできます。"]),
          section("grid-layout", "グリッド、スケール、スナップ", ["グリッド間隔、UIスケール、スナップの3つの基本ツールがあります。"]),
          section("hiding-elements", "要素の個別非表示", ["各HUD要素を個別に非表示または表示できます。"]),
          section("stigma-transformation", "Stigma/Transformスロット分離", ["StigmaスロットとTransformスロットを分離して独立配置できます。"]),
          section("consumable-slots", "拡張消耗品スロット表示", ["8つの消耗品スロットが一度に表示されます。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "EDITOR DE HUD MÓVEL",
        title: "Editor de HUD móvel do AION2: Como personalizar sua interface",
        description: "A atualização de 12 de agosto adiciona um editor de HUD móvel com grade, escala, encaixe, ocultação de elementos e separação de slots.",
        intro: "A atualização de 12 de agosto de 2026 introduz um editor de HUD móvel muito aguardado.",
        sourceNote: "Baseado no resumo da atualização AION2T e nas notas oficiais da NCSOFT.",
        keywords: ["editor HUD móvel AION2", "personalização HUD AION2", "interface móvel AION2"],
        sections: [
          section("accessing-editor", "Acessar o editor de HUD móvel", ["O editor é acessível pelo menu de configurações em dispositivos móveis."]),
          section("grid-layout", "Grade, escala e encaixe", ["Três ferramentas principais: espaçamento de grade, escala de UI e encaixe."]),
          section("hiding-elements", "Ocultação independente de elementos", ["Cada elemento HUD pode ser ocultado ou exibido independentemente."]),
          section("stigma-transformation", "Separação de slots Stigma e Transformação", ["Os slots agora podem ser separados e reorganizados independentemente."]),
          section("consumable-slots", "Exibição ampliada de consumíveis", ["Todos os oito slots de consumíveis são exibidos de uma vez."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "МОБИЛЬНЫЙ РЕДАКТОР HUD",
        title: "Мобильный редактор HUD AION2: как настроить интерфейс",
        description: "Обновление от 12 августа добавляет мобильный редактор HUD с сеткой, масштабированием, привязкой и скрытием элементов.",
        intro: "Обновление от 12 августа 2026 года представляет долгожданный мобильный редактор HUD.",
        sourceNote: "На основе сводки обновления AION2T и официальных примечаний к патчу NCSOFT.",
        keywords: ["мобильный редактор HUD AION2", "настройка HUD AION2", "мобильный интерфейс AION2"],
        sections: [
          section("accessing-editor", "Доступ к редактору HUD", ["Редактор доступен из меню настроек на мобильных устройствах."]),
          section("grid-layout", "Сетка, масштаб и привязка", ["Три основных инструмента: интервал сетки, масштаб UI и привязка."]),
          section("hiding-elements", "Независимое скрытие элементов", ["Каждый элемент HUD можно независимо скрыть или показать."]),
          section("stigma-transformation", "Разделение слотов Stigma и Transformation", ["Слоты теперь можно разделять и перестраивать независимо."]),
          section("consumable-slots", "Расширенное отображение расходников", ["Все восемь слотов расходников отображаются одновременно."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "手機HUD編輯器",
        title: "AION2 手機HUD編輯器：如何自訂介面——完整指南",
        description: "AION2 8月12日更新新增手機HUD編輯器，支援網格間距、UI縮放、吸附對齊、獨立元素隱藏、Stigma和Transform插槽分離以及8格消耗品顯示。",
        intro: "2026年8月12日更新引入了期待已久的手機HUD編輯器，讓你可以重新組織螢幕介面。",
        sourceNote: "基於 AION2T 8月12日更新摘要和官方 NCSOFT 補丁說明。",
        keywords: ["AION2 手機HUD編輯器", "AION2 HUD自訂", "AION2 手機介面", "AION2 UI編輯器", "AION2 8月12日更新 HUD"],
        sections: [
          section("accessing-editor", "如何訪問手機HUD編輯器", ["手機HUD編輯器可從行動裝置的遊戲內設定選單訪問。"]),
          section("grid-layout", "網格間距、UI縮放和吸附對齊", ["編輯器提供三種核心佈局工具：網格間距、UI縮放和吸附。"]),
          section("hiding-elements", "獨立元素隱藏和顯示", ["每個HUD元素都可以獨立隱藏或顯示。"]),
          section("stigma-transformation", "Stigma和Transform插槽分離", ["Stigma和Transform插槽現在可以分離並獨立排列。"]),
          section("consumable-slots", "擴展消耗品插槽顯示", ["所有八個消耗品插槽可同時顯示。"]),
        ],
      }),
    },
  },

  // ARTICLE 2: Draconic Craft & Abyss Gear Guide
  {
    section: "guides",
    slug: "draconic-abyss-gear-august-2026",
    schemaType: "TechArticle",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [aug12PatchSource, ncOfficialSource],
    heroImage: gearHero,
    related: [
      { kind: "content", section: "guides", slug: "dice-lantern-arcana-equipment-guide" },
      { kind: "content", section: "guides", slug: "healer-nerf-survival-guide" },
      { kind: "content", section: "news", slug: "august-12-2026-update-overview" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 6, {
        eyebrow: "NEW GEAR GUIDE",
        title: "AION2 New Draconic Craft & Abyss Gear: Dragon Creator/Destroyer King & Royal Guard Captain Guide",
        description: "The August 12 update introduces Draconic craft accessories (Dragon Creator/Destroyer King), Abyss Royal Guard Captain gear, and new crafting inheritance mechanics. Complete guide to materials, blueprints, and stat progression.",
        intro: "The August 12, 2026 update adds two new high-end gear lines: the Draconic Dragon Creator/Destroyer King crafted accessories and the Abyss Royal Guard Captain accessories. This guide covers how to obtain them, the materials required, the inheritance crafting system, and how they compare to existing gear.",
        sourceNote: "Based on the AION2T August 12 update summary and official NCSOFT patch notes. Korea/Taiwan service update; gear progression may arrive for global version at a later date.",
        keywords: ["AION2 Draconic craft accessories", "AION2 Dragon Creator King", "AION2 Dragon Destroyer King", "AION2 Abyss Royal Guard Captain", "AION2 new gear August 2026"],
        sections: [
          section("draconic-craft", "Draconic craft accessories: Dragon Creator/Destroyer King", ["The new Draconic craft accessory line offers two parallel paths: Dragon Creator King and Dragon Destroyer King. Both are crafted using blueprints obtained from the new Corroded Deus Research Base expedition dungeon. The 'Radiant Eungryong King / Giryong King' accessories serve as inheritance material for the upgrade.", "The key crafting material, 'Runaway Energy of Fear: Accessory (Bound)', is obtained by material-converting either a Lava Heart accessory or the equipment change voucher from the new Expedition's guaranteed rewards. This means players who have been farming the existing expedition content have a direct path to the new gear."]),
          section("abyss-gear", "New Abyss gear: Guardian/Archon Royal Guard Captain", ["The Abyss shop adds Guardian/Archon Royal Guard Captain accessories. These can be obtained directly from the Abyss shop, and there is also a blueprint for inheritance-crafting Guardian/Archon Legion Commander accessories into the Royal Guard Captain tier.", "This provides a progression path for PvP-focused players who have been accumulating Abyss points and ranking up. The Royal Guard Captain tier offers significant stat improvements over the Legion Commander tier, making it a worthwhile investment for serious PvP participants."]),
          section("gear-comparison", "How the new gear compares to existing options", ["The Dragon Creator/Destroyer King accessories offer the highest base stats among craftable gear, with the Destroyer King line leaning toward offensive stats and the Creator King line offering balanced defenses. The Royal Guard Captain Abyss gear provides competitive PvP stats with the advantage of being purchasable through the Abyss shop.", "For most players, the recommended progression is to first obtain the Radiant Eungryong/Giryong King accessories from existing content, then upgrade to the Dragon Creator/Destroyer King tier using materials from the new expedition. PvP-focused players should prioritize the Royal Guard Captain accessories from the Abyss shop."]),
          section("material-farming", "Material farming and efficiency tips", ["The main bottleneck for the Draconic craft gear is the 'Runaway Energy of Fear: Accessory' material. This can be obtained by converting Lava Heart accessories, which drop from existing expedition content, or by using the equipment change voucher from the new Corroded Deus Research Base expedition. Players should focus on clearing the new expedition on Conquest (Hard) difficulty for the highest drop rate of change vouchers.", "For the Abyss gear, the primary cost is Abyss Points. Players should participate in the Abyss Corridor and server matching events to accumulate points efficiently. The Royal Guard Captain accessories are a significant investment but provide a permanent stat boost that doesn't require maintenance."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
        eyebrow: "新装备指南",
        title: "AION2 新龙族制作与深淵装备：龙创者/龙灭者之王与皇家卫队长指南",
        description: "8月12日更新引入龙族制作饰品（龙创者之王/龙灭者之王）、深淵皇家卫队长装备以及新的制作继承机制。",
        intro: "2026年8月12日更新新增两条高端装备线：龙族龙创者之王/龙灭者之王制作饰品和深淵皇家卫队长饰品。",
        sourceNote: "基于 AION2T 8月12日更新摘要和官方 NCSOFT 补丁说明。",
        keywords: ["AION2 龙族制作饰品", "AION2 龙创者之王", "AION2 龙灭者之王", "AION2 深淵皇家卫队长", "AION2 新装备 2026年8月"],
        sections: [
          section("draconic-craft", "龙族制作饰品：龙创者/龙灭者之王", ["新的龙族制作饰品线提供两条平行路径：龙创者之王和龙灭者之王。两者都使用从新远征副本获得的蓝图制作。", "关键制作材料通过转化熔岩之心饰品或新远征保证奖励获得。"]),
          section("abyss-gear", "新深淵装备：守护者/执政官皇家卫队长", ["深淵商店新增守护者/执政官皇家卫队长饰品。可直接从深淵商店购买，也有蓝图可从军团指挥官升级。", "这为PvP玩家提供了清晰的成长路径。"]),
          section("gear-comparison", "新旧装备对比", ["龙创者/龙灭者之王饰品提供可制作装备中最高的基础属性。深淵皇家卫队长装备提供有竞争力的PvP属性。", "推荐大多数玩家先获取现有装备，然后使用新远征材料升级。"]),
          section("material-farming", "材料刷取效率建议", ["龙族制作装备的主要门槛是'恐惧的逃逸能量：饰品'材料。可通过转化熔岩之心饰品或使用新远征的装备变更券获得。", "深淵装备的主要成本是深淵点数。玩家应参与深淵走廊和服务器匹配活动来高效积累点数。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 6, {
        eyebrow: "신규 장비 가이드",
        title: "AION2 신규 드라코닉 제작 및 어비스 장비: 드래곤 크리에이터/디스트로이어 킹 & 로열 가드 캡틴 가이드",
        description: "8월 12일 업데이트로 드라코닉 제작 액세서리(드래곤 크리에이터/디스트로이어 킹)와 어비스 로열 가드 캡틴 장비가 추가됐습니다.",
        intro: "2026년 8월 12일 업데이트로 두 가지 신규 장비 라인이 추가됐습니다.",
        sourceNote: "AION2T 8월 12일 업데이트 요약과 NCSOFT 공식 패치 노트에 기반합니다.",
        keywords: ["AION2 드라코닉 제작 액세서리", "AION2 드래곤 크리에이터 킹", "AION2 드래곤 디스트로이어 킹", "AION2 어비스 로열 가드 캡틴", "AION2 신규 장비 2026년 8월"],
        sections: [
          section("draconic-craft", "드라코닉 제작 액세서리", ["신규 드라코닉 제작 액세서리 라인은 드래곤 크리에이터 킹과 드래곤 디스트로이어 킹 두 가지 경로를 제공합니다.", "핵심 제작 재료는 신규 원정 던전의 보상에서 획득할 수 있습니다."]),
          section("abyss-gear", "신규 어비스 장비", ["어비스 상점에 로열 가드 캡틴 액세서리가 추가됐습니다.", "PvP 중심 플레이어에게 명확한 성장 경로를 제공합니다."]),
          section("gear-comparison", "장비 비교", ["드래곤 크리에이터/디스트로이어 킹 액세서리는 제작 가능 장비 중 가장 높은 기본 스탯을 제공합니다."]),
          section("material-farming", "재료 파밍 효율 팁", ["드라코닉 제작 장비의 주요 병목은 '공포의 도주 에너지: 액세서리' 재료입니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 6, {
        eyebrow: "GUIDE ÉQUIPEMENT",
        title: "Nouvel équipement Draconique et Abyss AION2 : Guide des accessoires Dragon Creator/Destroyer King et Royal Guard Captain",
        description: "La mise à jour du 12 août introduit des accessoires Draconiques, l'équipement Abyss Royal Guard Captain et de nouveaux mécanismes de fabrication.",
        intro: "La mise à jour du 12 août 2026 ajoute deux nouvelles lignes d'équipement haut de gamme.",
        sourceNote: "Basé sur le résumé de la mise à jour AION2T et les notes officielles NCSOFT.",
        keywords: ["accessoires Draconiques AION2", "AION2 Dragon Creator King", "AION2 équipement Abyss"],
        sections: [
          section("draconic-craft", "Accessoires Draconiques", ["Les accessoires Dragon Creator/Destroyer King sont fabriqués à partir de butins de donjon d'expédition."]),
          section("abyss-gear", "Équipement Abyss", ["Les accessoires Royal Guard Captain sont achetables à la boutique Abyss."]),
          section("gear-comparison", "Comparaison d'équipement", ["Les accessoires Draconiques offrent les meilleures stats de base parmi les équipements craftables."]),
          section("material-farming", "Conseils de farming", ["Le goulot d'étranglement est le matériau 'Runaway Energy of Fear: Accessory'."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 6, {
        eyebrow: "NEUE AUSRÜSTUNG",
        title: "Neue Drachen-Handwerks- und Abyss-Ausrüstung: Dragon Creator/Destroyer King & Royal Guard Captain",
        description: "Das Update vom 12. August führt Handwerksaccessoires, Abyss-Ausrüstung und neue Vererbungsmechaniken ein.",
        intro: "Das Update vom 12. August 2026 fügt zwei neue High-End-Ausrüstungslinien hinzu.",
        sourceNote: "Basierend auf der AION2T Update-Zusammenfassung und den NCSOFT-Patch-Notizen.",
        keywords: ["AION2 Drachen-Handwerkszubehör", "AION2 Dragon Creator King", "AION2 Abyss-Ausrüstung"],
        sections: [
          section("draconic-craft", "Drachen-Handwerkszubehör", ["Dragon Creator/Destroyer King Accessoires werden aus Expeditionsbeute hergestellt."]),
          section("abyss-gear", "Abyss-Ausrüstung", ["Royal Guard Captain Accessoires sind im Abyss-Shop erhältlich."]),
          section("gear-comparison", "Ausrüstungsvergleich", ["Drachenaccessoires bieten die höchsten Basiswerte unter handwerksbarer Ausrüstung."]),
          section("material-farming", "Material-Farming-Tipps", ["Der Engpass ist das Material 'Runaway Energy of Fear: Accessory'."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 6, {
        eyebrow: "GUÍA DE EQUIPO",
        title: "Nuevo equipo dracónico y Abyss de AION2: Dragon Creator/Destroyer King y Royal Guard Captain",
        description: "La actualización del 12 de agosto introduce accesorios dracónicos, equipo Abyss y nuevos mecanismos de fabricación.",
        intro: "La actualización del 12 de agosto de 2026 añade dos nuevas líneas de equipo de alta gama.",
        sourceNote: "Basado en el resumen de la actualización AION2T y las notas oficiales de NCSOFT.",
        keywords: ["accesorios dracónicos AION2", "AION2 Dragon Creator King", "equipo Abyss AION2"],
        sections: [
          section("draconic-craft", "Accesorios dracónicos", ["Los accesorios Dragon Creator/Destroyer King se fabrican con botín de expedición."]),
          section("abyss-gear", "Equipo Abyss", ["Los accesorios Royal Guard Captain se compran en la tienda Abyss."]),
          section("gear-comparison", "Comparación de equipo", ["Los accesorios dracónicos ofrecen las mejores estadísticas base."]),
          section("material-farming", "Consejos de cultivo", ["El cuello de botella es el material 'Runaway Energy of Fear: Accessory'."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 6, {
        eyebrow: "新装備ガイド",
        title: "AION2 新ドラゴニッククラフト＆アビス装備：ドラゴンクリエイター/デストロイヤーキング＆ロイヤルガードキャプテンガイド",
        description: "8月12日アップデートでドラゴニッククラフトアクセサリーとアビス装備が追加されました。",
        intro: "2026年8月12日アップデートで2つの新ハイエンド装備ラインが追加されました。",
        sourceNote: "AION2T 8月12日アップデート要約とNCSOFT公式パッチノートに基づきます。",
        keywords: ["AION2 ドラゴニッククラフトアクセサリー", "AION2 ドラゴンクリエイターキング", "AION2 アビス装備"],
        sections: [
          section("draconic-craft", "ドラゴニッククラフトアクセサリー", ["ドラゴンクリエイター/デストロイヤーキングアクセサリーは遠征ダンジョンの戦利品から作成します。"]),
          section("abyss-gear", "アビス装備", ["ロイヤルガードキャプテンアクセサリーはアビスショップで購入できます。"]),
          section("gear-comparison", "装備比較", ["ドラゴニックアクセサリーはクラフト可能な装備の中で最高の基本ステータスを提供します。"]),
          section("material-farming", "素材ファーミングのコツ", ["ボトルネックは「恐怖の逃走エネルギー：アクセサリー」素材です。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 6, {
        eyebrow: "GUIA DE EQUIPAMENTO",
        title: "Novos equipamentos Draconic e Abyss do AION2: Guia do Dragon Creator/Destroyer King e Royal Guard Captain",
        description: "A atualização de 12 de agosto introduz acessórios Draconic, equipamento Abyss e novos mecanismos de fabricação.",
        intro: "A atualização de 12 de agosto de 2026 adiciona duas novas linhas de equipamento de alto nível.",
        sourceNote: "Baseado no resumo da atualização AION2T e nas notas oficiais da NCSOFT.",
        keywords: ["acessórios Draconic AION2", "AION2 Dragon Creator King", "equipamento Abyss AION2"],
        sections: [
          section("draconic-craft", "Acessórios Draconic", ["Acessórios Dragon Creator/Destroyer King são fabricados com butim de expedição."]),
          section("abyss-gear", "Equipamento Abyss", ["Acessórios Royal Guard Captain são comprados na loja Abyss."]),
          section("gear-comparison", "Comparação de equipamentos", ["Acessórios Draconic oferecem os melhores atributos base entre equipamentos fabricáveis."]),
          section("material-farming", "Dicas de farming", ["O gargalo é o material 'Runaway Energy of Fear: Accessory'."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 6, {
        eyebrow: "НОВОЕ СНАРЯЖЕНИЕ",
        title: "Новое драконье крафтовое снаряжение и экипировка Бездны: Dragon Creator/Destroyer King и Royal Guard Captain",
        description: "Обновление от 12 августа добавляет драконьи аксессуары, экипировку Бездны и новые механики крафта.",
        intro: "Обновление от 12 августа 2026 года добавляет две новые линии высокоуровневого снаряжения.",
        sourceNote: "На основе сводки обновления AION2T и официальных примечаний NCSOFT.",
        keywords: ["драконьи аксессуары AION2", "AION2 Dragon Creator King", "экипировка Бездны AION2"],
        sections: [
          section("draconic-craft", "Драконьи аксессуары", ["Аксессуары Dragon Creator/Destroyer King создаются из добычи экспедиции."]),
          section("abyss-gear", "Экипировка Бездны", ["Аксессуары Royal Guard Captain покупаются в магазине Бездны."]),
          section("gear-comparison", "Сравнение экипировки", ["Драконьи аксессуары дают лучшие базовые характеристики среди крафтового снаряжения."]),
          section("material-farming", "Советы по фарму", ["Узкое место — материал 'Runaway Energy of Fear: Accessory'."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
        eyebrow: "新裝備指南",
        title: "AION2 新龍族製作與深淵裝備：龍創者/龍滅者之王與皇家衛隊長指南",
        description: "8月12日更新引入龍族製作飾品、深淵皇家衛隊長裝備以及新的製作繼承機制。",
        intro: "2026年8月12日更新新增兩條高端裝備線。",
        sourceNote: "基於 AION2T 8月12日更新摘要和官方 NCSOFT 補丁說明。",
        keywords: ["AION2 龍族製作飾品", "AION2 龍創者之王", "AION2 深淵皇家衛隊長"],
        sections: [
          section("draconic-craft", "龍族製作飾品", ["龍創者/龍滅者之王飾品使用新遠征副本的藍圖製作。"]),
          section("abyss-gear", "新深淵裝備", ["皇家衛隊長飾品可直接從深淵商店購買。"]),
          section("gear-comparison", "裝備對比", ["龍族飾品提供可製作裝備中最高的基礎屬性。"]),
          section("material-farming", "材料刷取建議", ["主要門檻是「恐懼的逃逸能量：飾品」材料。"]),
        ],
      }),
    },
  },

  // ARTICLE 3: Shop Redesign & Midsummer Night's Dream Cosmetics
  {
    section: "news",
    slug: "shop-redesign-midsummer-night-dream-cosmetics",
    schemaType: "NewsArticle",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [aug12PatchSource, ncOfficialSource],
    heroImage: shopHero,
    related: [
      { kind: "content", section: "news", slug: "august-12-2026-update-overview" },
      { kind: "content", section: "news", slug: "august-11-2026-fromis9-collaboration-ending" },
      { kind: "content", section: "guides", slug: "deva-look-change-week-guide" },
    ],
    translations: {
      en: articleCopy(newsLabels, "en", 5, {
        eyebrow: "SHOP REDESIGN & COSMETICS",
        title: "AION2 Shop Redesign, Midsummer Night's Dream Cosmetics & New Pets: August 12 Update",
        description: "The August 12 AION2 update brings a full Shop UI redesign with card-style products, a dedicated Appearance tab, item previews, plus the Midsummer Night's Dream pajama set, new pets, and limited wings.",
        intro: "The August 12, 2026 update delivers a comprehensive Shop UI overhaul alongside the Midsummer Night's Dream limited cosmetics collection. The Shop now features card-style product displays, a dedicated Appearance tab, item previews, and a removed entrance cutscene for faster browsing. The Wardrobe Shop has been consolidated into the main Shop Appearance tab.",
        sourceNote: "Based on the AION2T August 12 update summary and official NCSOFT patch notes. Korea/Taiwan service update; cosmetics and shop changes may arrive for global version at a later date.",
        keywords: ["AION2 shop redesign", "AION2 Midsummer Night's Dream", "AION2 new cosmetics August 2026", "AION2 pet Goodnight Teddy Bear", "AION2 Sweet Dream Cloud Wings"],
        sections: [
          section("shop-redesign", "Shop UI redesign: card-style display, previews, and faster loading", ["The Shop has been completely redesigned. The entrance cutscene that played when opening the shop has been removed, making browsing much faster. The product list now uses a card-style layout with a banner above, and the product info screen has become a full-screen UI.", "Products containing an appearance, wings, a pet, or an emote can now be previewed directly from the product info screen. A new [Appearance] tab consolidates all cosmetic items, including the costume sets, weapon appearances, and single pieces from the old Wardrobe Shop. Products priced at 0 now display as 'Free' instead of showing a zero."]),
          section("wardrobe-changes", "Wardrobe changes: Auto-Register expansion and shop consolidation", ["The Wardrobe synthesis [Auto-Register] capacity has expanded from 10 to 30 uses, making it easier to manage large collections. The Wardrobe Shop and its related functions have been removed, with all appearance products previously sold there moving to [Shop] > [Appearance].", "These changes streamline the shopping experience, reducing the number of menus players need to navigate. The Auto-Register expansion is particularly useful for players who frequently acquire new appearance items."]),
          section("midsummer-night", "Midsummer Night's Dream: limited pajama cosmetics", ["The Midsummer Night's Dream collection is available from August 12 until September 23. The full set (119,000 KRW) includes three pajama-style outfits: Cozy Cloud Pajamas, Lovely Pâtissier, and Round Penguin Hoodie. Individual sets are available for 49,000 KRW each or 1 Appearance (Set) Exchange Ticket.", "The Round Penguin Hoodie is a 2-piece set (chestplate, boots), while the other two are 5-piece full outfits. All items can be dyed, and the full set purchase grants all three outfits at a bundled price. No Mileage is earned when paying with an Appearance (Set) Exchange Ticket."]),
          section("pets-wings", "New pets and wings: Goodnight Teddy Bear, Sweet Unicorn, Sweet Dream Cloud Wings", ["Two new pets are available until September 23: Goodnight Teddy Bear (29,000 KRW or 1 Pet Exchange Ticket, once per server) and Sweet Unicorn (1,500 Quna or 1 Pet Exchange Ticket, once per server). The Sweet Dream Cloud Wings (29,000 KRW, once per character) complete the sleepy-themed collection.", "Additionally, the 'sleepy set' accessories include Dozing Little Lamb headgear, Cozy Lamb Headband, Cozy Bear Sleep Cap, Sweet Dream Sleep Mask (accessory, once per server), and Little Lamb (shoulder accessory, once per server). Each piece costs 300 Quna or 1 Appearance (Single) Exchange Ticket."]),
        ],
      }),
      "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
        eyebrow: "商店重做与外观",
        title: "AION2 商店重做、仲夏夜之梦外观与新宠物：8月12日更新",
        description: "8月12日更新带来商店UI全面重做（卡片式产品展示、外观标签页、物品预览），以及仲夏夜之梦睡衣套装、新宠物和限定翅膀。",
        intro: "2026年8月12日更新带来了全面的商店UI改版和仲夏夜之梦限定外观系列。",
        sourceNote: "基于 AION2T 8月12日更新摘要和官方 NCSOFT 补丁说明。",
        keywords: ["AION2 商店重做", "AION2 仲夏夜之梦", "AION2 新外观 2026年8月", "AION2 宠物 晚安泰迪熊", "AION2 甜梦云翅膀"],
        sections: [
          section("shop-redesign", "商店UI重做：卡片式显示、预览和更快加载", ["商店已完全重新设计。入口过场动画已移除，浏览速度大幅提升。产品列表采用卡片式布局，产品信息屏幕变为全屏UI。", "包含外观、翅膀、宠物或表情的商品现在可以直接预览。新增[外观]标签页整合了所有外观物品。"]),
          section("wardrobe-changes", "衣柜变更：自动注册扩展和商店整合", ["衣柜合成[自动注册]容量从10次扩展到30次。衣柜商店及其相关功能已移除，所有外观产品移至[商店] > [外观]。"]),
          section("midsummer-night", "仲夏夜之梦：限定睡衣外观", ["仲夏夜之梦系列从8月12日销售至9月23日。完整套装（119,000 KRW）包含三套睡衣风格服装。", "单个套装49,000 KRW或1张外观（套装）交换券。"]),
          section("pets-wings", "新宠物和翅膀", ["晚安泰迪熊（29,000 KRW）和甜独角兽（1,500 Quna）宠物，以及甜梦云翅膀（29,000 KRW）现已上架至9月23日。"]),
        ],
      }),
      ko: articleCopy(newsLabels, "ko", 5, {
        eyebrow: "상점 개편 & 코스메틱",
        title: "AION2 상점 개편, 한여름 밤의 꿈 코스메틱 & 신규 펫: 8월 12일 업데이트",
        description: "8월 12일 업데이트로 상점 UI가 전면 개편되고 한여름 밤의 꿈 파자마 세트와 신규 펫, 날개가 출시됐습니다.",
        intro: "2026년 8월 12일 업데이트로 상점 UI 개편과 한여름 밤의 꿈 한정 코스메틱 컬렉션이 출시됐습니다.",
        sourceNote: "AION2T 8월 12일 업데이트 요약과 NCSOFT 공식 패치 노트에 기반합니다.",
        keywords: ["AION2 상점 개편", "AION2 한여름 밤의 꿈", "AION2 신규 코스메틱 2026년 8월", "AION2 펫 굿나잇 테디베어", "AION2 스위트 드림 클라우드 윙"],
        sections: [
          section("shop-redesign", "상점 UI 개편", ["상점이 완전히 재설계됐습니다. 카드 스타일 제품 레이아웃, 전용 [외형] 탭, 아이템 미리보기가 추가됐습니다."]),
          section("wardrobe-changes", "워드로브 변경", ["워드로브 합성 [자동 등록] 용량이 10회에서 30회로 확장됐습니다."]),
          section("midsummer-night", "한여름 밤의 꿈 한정 코스메틱", ["8월 12일부터 9월 23일까지 판매됩니다. 풀 세트(119,000 KRW)에 3개의 파자마 스타일 의상이 포함됩니다."]),
          section("pets-wings", "신규 펫과 날개", ["굿나잇 테디베어(29,000 KRW)와 스위트 유니콘(1,500 Quna) 펫, 스위트 드림 클라우드 윙(29,000 KRW)이 출시됐습니다."]),
        ],
      }),
      fr: articleCopy(newsLabels, "fr", 5, {
        eyebrow: "REFONTE BOUTIQUE & COSMÉTIQUES",
        title: "Refonte de la boutique AION2, cosmétiques Midsummer Night's Dream et nouveaux familiers",
        description: "La mise à jour du 12 août apporte une refonte complète de la boutique, des cosmétiques limités et de nouveaux familiers.",
        intro: "La mise à jour du 12 août 2026 offre une refonte complète de l'interface de la boutique.",
        sourceNote: "Basé sur le résumé de la mise à jour AION2T et les notes officielles NCSOFT.",
        keywords: ["refonte boutique AION2", "AION2 Midsummer Night's Dream", "nouveaux cosmétiques AION2"],
        sections: [
          section("shop-redesign", "Refonte de l'interface boutique", ["La boutique a été entièrement repensée avec un affichage en cartes et un onglet [Apparence]."]),
          section("wardrobe-changes", "Changements de la garde-robe", ["La capacité d'auto-enregistrement passe de 10 à 30 utilisations."]),
          section("midsummer-night", "Cosmétiques limités Midsummer Night's Dream", ["Disponibles du 12 août au 23 septembre. Le set complet comprend trois tenues pyjama."]),
          section("pets-wings", "Nouveaux familiers et ailes", ["Goodnight Teddy Bear, Sweet Unicorn et Sweet Dream Cloud Wings sont disponibles."]),
        ],
      }),
      de: articleCopy(newsLabels, "de", 5, {
        eyebrow: "SHOP-NEUGESTALTUNG & KOSMETIK",
        title: "AION2 Shop-Neugestaltung, Midsummer Night's Dream Kosmetik & neue Begleiter",
        description: "Das Update vom 12. August bringt eine komplette Shop-UI-Überholung, limitierte Kosmetik und neue Begleiter.",
        intro: "Das Update vom 12. August 2026 bietet eine umfassende Shop-UI-Überholung.",
        sourceNote: "Basierend auf der AION2T Update-Zusammenfassung und den NCSOFT-Patch-Notizen.",
        keywords: ["AION2 Shop-Neugestaltung", "AION2 Midsummer Night's Dream", "neue AION2 Kosmetik"],
        sections: [
          section("shop-redesign", "Shop-UI-Neugestaltung", ["Der Shop wurde komplett neu gestaltet mit Karten-Layout und [Aussehen]-Tab."]),
          section("wardrobe-changes", "Kleiderschrank-Änderungen", ["Auto-Register-Kapazität von 10 auf 30 erweitert."]),
          section("midsummer-night", "Limitierte Midsummer Night's Dream Kosmetik", ["Verfügbar vom 12. August bis 23. September."]),
          section("pets-wings", "Neue Begleiter und Flügel", ["Goodnight Teddy Bear, Sweet Unicorn und Sweet Dream Cloud Wings."]),
        ],
      }),
      es: articleCopy(newsLabels, "es", 5, {
        eyebrow: "REDISEÑO DE TIENDA Y COSMÉTICOS",
        title: "Rediseño de la tienda de AION2, cosméticos Midsummer Night's Dream y nuevas mascotas",
        description: "La actualización del 12 de agosto trae un rediseño completo de la tienda, cosméticos limitados y nuevas mascotas.",
        intro: "La actualización del 12 de agosto de 2026 ofrece una renovación completa de la interfaz de la tienda.",
        sourceNote: "Basado en el resumen de la actualización AION2T y las notas oficiales de NCSOFT.",
        keywords: ["rediseño tienda AION2", "AION2 Midsummer Night's Dream", "nuevos cosméticos AION2"],
        sections: [
          section("shop-redesign", "Rediseño de la interfaz de la tienda", ["La tienda ha sido completamente rediseñada con diseño de tarjetas y pestaña [Apariencia]."]),
          section("wardrobe-changes", "Cambios en el guardarropa", ["La capacidad de autorregistro se expande de 10 a 30 usos."]),
          section("midsummer-night", "Cosméticos limitados Midsummer Night's Dream", ["Disponibles del 12 de agosto al 23 de septiembre."]),
          section("pets-wings", "Nuevas mascotas y alas", ["Goodnight Teddy Bear, Sweet Unicorn y Sweet Dream Cloud Wings."]),
        ],
      }),
      ja: articleCopy(newsLabels, "ja", 5, {
        eyebrow: "ショップリニューアル＆コスメ",
        title: "AION2 ショップリニューアル、真夏の夜の夢コスメ＆新ペット：8月12日アップデート",
        description: "8月12日アップデートでショップUIが全面リニューアルされ、真夏の夜の夢パジャマセットや新ペットが登場しました。",
        intro: "2026年8月12日アップデートでショップUIの全面的な刷新と真夏の夜の夢限定コスメが登場しました。",
        sourceNote: "AION2T 8月12日アップデート要約とNCSOFT公式パッチノートに基づきます。",
        keywords: ["AION2 ショップリニューアル", "AION2 真夏の夜の夢", "AION2 新コスメ 2026年8月"],
        sections: [
          section("shop-redesign", "ショップUIリニューアル", ["ショップが完全にリニューアルされ、カードスタイル表示と[外見]タブが追加されました。"]),
          section("wardrobe-changes", "ワードローブ変更", ["自動登録容量が10回から30回に拡張されました。"]),
          section("midsummer-night", "真夏の夜の夢限定コスメ", ["8月12日から9月23日まで販売。フルセット(119,000 KRW)で3着のパジャマスタイル衣装が含まれます。"]),
          section("pets-wings", "新ペットと翼", ["グッドナイトテディベア、スイートユニコーン、スイートドリームクラウドウィングが登場。"]),
        ],
      }),
      "pt-br": articleCopy(newsLabels, "pt-br", 5, {
        eyebrow: "REDESENHO DA LOJA & COSMÉTICOS",
        title: "Redesenho da loja do AION2, cosméticos Midsummer Night's Dream e novas mascotes",
        description: "A atualização de 12 de agosto traz um redesenho completo da loja, cosméticos limitados e novas mascotes.",
        intro: "A atualização de 12 de agosto de 2026 oferece uma reforma completa da interface da loja.",
        sourceNote: "Baseado no resumo da atualização AION2T e nas notas oficiais da NCSOFT.",
        keywords: ["redesenho loja AION2", "AION2 Midsummer Night's Dream", "novos cosméticos AION2"],
        sections: [
          section("shop-redesign", "Redesenho da interface da loja", ["A loja foi completamente redesenhada com layout de cartões e guia [Aparência]."]),
          section("wardrobe-changes", "Mudanças no guarda-roupa", ["Capacidade de autorregistro expandida de 10 para 30 usos."]),
          section("midsummer-night", "Cosméticos limitados Midsummer Night's Dream", ["Disponíveis de 12 de agosto a 23 de setembro."]),
          section("pets-wings", "Novas mascotes e asas", ["Goodnight Teddy Bear, Sweet Unicorn e Sweet Dream Cloud Wings."]),
        ],
      }),
      ru: articleCopy(newsLabels, "ru", 5, {
        eyebrow: "РЕДИЗАЙН МАГАЗИНА И КОСМЕТИКА",
        title: "Редизайн магазина AION2, косметика Midsummer Night's Dream и новые питомцы",
        description: "Обновление от 12 августа приносит полный редизайн магазина, лимитированную косметику и новых питомцев.",
        intro: "Обновление от 12 августа 2026 года предлагает всесторонний редизайн интерфейса магазина.",
        sourceNote: "На основе сводки обновления AION2T и официальных примечаний NCSOFT.",
        keywords: ["редизайн магазина AION2", "AION2 Midsummer Night's Dream", "новая косметика AION2"],
        sections: [
          section("shop-redesign", "Редизайн интерфейса магазина", ["Магазин полностью переработан с карточным макетом и вкладкой [Внешность]."]),
          section("wardrobe-changes", "Изменения гардероба", ["Ёмкость авторегистрации расширена с 10 до 30 использований."]),
          section("midsummer-night", "Лимитированная косметика Midsummer Night's Dream", ["Доступна с 12 августа по 23 сентября."]),
          section("pets-wings", "Новые питомцы и крылья", ["Доступны Goodnight Teddy Bear, Sweet Unicorn и Sweet Dream Cloud Wings."]),
        ],
      }),
      "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
        eyebrow: "商店重做與外觀",
        title: "AION2 商店重做、仲夏夜之夢外觀與新寵物：8月12日更新",
        description: "8月12日更新帶來商店UI全面重做（卡片式產品展示、外觀標籤頁、物品預覽），以及仲夏夜之夢睡衣套裝、新寵物和限定翅膀。",
        intro: "2026年8月12日更新帶來了全面的商店UI改版和仲夏夜之夢限定外觀系列。",
        sourceNote: "基於 AION2T 8月12日更新摘要和官方 NCSOFT 補丁說明。",
        keywords: ["AION2 商店重做", "AION2 仲夏夜之夢", "AION2 新外觀 2026年8月"],
        sections: [
          section("shop-redesign", "商店UI重做", ["商店已完全重新設計，採用卡片式產品佈局和[外觀]標籤頁。"]),
          section("wardrobe-changes", "衣櫃變更", ["自動註冊容量從10次擴展到30次。"]),
          section("midsummer-night", "仲夏夜之夢限定外觀", ["8月12日至9月23日銷售。完整套裝包含三套睡衣風格服裝。"]),
          section("pets-wings", "新寵物和翅膀", ["晚安泰迪熊、甜獨角獸和甜夢雲翅膀現已推出。"]),
        ],
      }),
    },
  },

  // ARTICLE 4: Battleground Matchmaking Changes
  {
    section: "guides",
    slug: "battleground-matchmaking-changes-august-2026",
    schemaType: "TechArticle",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [aug12PatchSource, ncOfficialSource],
    heroImage: bgHero,
    related: [
      { kind: "content", section: "guides", slug: "healer-nerf-survival-guide" },
      { kind: "content", section: "guides", slug: "dice-lantern-arcana-equipment-guide" },
      { kind: "content", section: "news", slug: "august-12-2026-update-overview" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 5, {
        eyebrow: "PVP MATCHMAKING GUIDE",
        title: "AION2 Battleground Matchmaking Changes: Solo Queue, Cross-Faction Teams & Class Balance — August 12 Update",
        description: "The August 12 update reworks Battleground matching: solo or 5-stack only, cross-faction teams in cooperative modes, class balance correction in solo queue, and a 30% healing reduction in Battlegrounds.",
        intro: "The August 12, 2026 update brings significant changes to AION2 Battleground matchmaking. This guide breaks down everything you need to know: the new solo/5-stack matching system, cross-faction team formation, class balance correction in solo queue, and the permanent healing reduction debuff in Battlegrounds.",
        sourceNote: "Based on the AION2T August 12 update summary and official NCSOFT patch notes. Korea/Taiwan service update; matchmaking changes may arrive for global version at a later date.",
        keywords: ["AION2 Battleground solo queue", "AION2 matchmaking changes August 2026", "AION2 cross-faction teams", "AION2 PvP healing reduction", "AION2 Battleground class balance"],
        sections: [
          section("new-matching", "New matchmaking: solo queue vs 5-stack only", ["Battlegrounds now accept only solo queues or full 5-person fixed teams. This is a major change from the previous system, which allowed partial premades of any size. The new system aims to create fairer matches by matching 5-stacks against other 5-stacks, and solo players against other solo players.", "This change is likely to reduce the advantage that organized premades had over partially grouped teams. However, it also means that players who queue with 2-4 friends will no longer be able to enter Battlegrounds together unless they form a full 5-stack. Solo players should benefit the most, as they will no longer face partially organized groups."]),
          section("cross-faction", "Cross-faction teams in cooperative modes", ["Cooperation Arena and Battleground matching now builds teams regardless of race. This means Elyos and Asmodian players can be matched on the same team in cooperative PvP modes. Previously, teams were strictly segregated by faction.", "This change should reduce queue times, especially during off-peak hours, and create more balanced team compositions. The cross-faction matching applies only to cooperative modes, not to faction-versus-faction content where the racial conflict is the core mechanic."]),
          section("class-balance", "Class balance correction in solo queue", ["Solo battleground queues now apply a class balance correction between the two teams. This means the matchmaking system will attempt to ensure that both teams have a similar distribution of classes, preventing one team from having an advantage due to a favorable class composition.", "The specific balance correction algorithm has not been detailed by NCSOFT, but it likely considers the role (damage, tank, support) and class tier of each player. This is a significant improvement for solo queue, where previously team composition was entirely random."]),
          section("healing-nerf-pvp", "Healing changes in Battlegrounds: permanent 30% reduction", ["The healing received debuff in Battlegrounds has been moved into the base stats inside the battleground. This means it is now a permanent stat rather than an entry debuff, and the healing reduction is a further 30% lower than before. On top of the general healer nerfs from this patch, healing in Battlegrounds is effectively cut by 50% or more.", "This change dramatically shifts the PvP meta. Burst damage compositions become more viable, while sustained healing strategies are heavily penalized. Players should adjust their Battleground builds to account for the reduced healing, potentially investing in more defensive stats or self-healing options."]),
          section("afk-penalty", "Anti-AFK measures and idle removal", ["Players who stay out of combat for a set time in a Battleground are now removed from the match. This is an anti-AFK measure designed to prevent players from passively participating or hiding to avoid engagement. The specific timeout duration has not been publicly detailed.", "This change encourages active participation and should improve the overall quality of Battleground matches. Players who are temporarily disconnected or need to step away should be aware that extended inactivity will result in removal from the match."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
        eyebrow: "PVP匹配指南",
        title: "AION2 战场匹配变更：单人排队、跨阵营组队与职业平衡——8月12日更新",
        description: "8月12日更新重做战场匹配：仅限单人排队或5人固定队、合作模式跨阵营组队、单人排队职业平衡修正以及战场治疗量减少30%。",
        intro: "2026年8月12日更新给AION2战场匹配带来了重大变化。本指南解析所有你需要了解的内容。",
        sourceNote: "基于 AION2T 8月12日更新摘要和官方 NCSOFT 补丁说明。",
        keywords: ["AION2 战场单人排队", "AION2 匹配变更 2026年8月", "AION2 跨阵营组队", "AION2 PvP 治疗减少", "AION2 战场职业平衡"],
        sections: [
          section("new-matching", "新匹配系统：单人排队或5人固定队", ["战场现在仅接受单人排队或完整的5人固定队。新系统旨在通过匹配5人队对战其他5人队、单人玩家对战其他单人玩家来创造更公平的比赛。", "这一变化可能会减少组织好的队伍对部分组队玩家的优势。"]),
          section("cross-faction", "合作模式跨阵营组队", ["合作竞技场和战场匹配现在无视种族组建队伍。天族和魔族玩家可以在合作PvP模式中被匹配到同一队伍。", "这一变化应减少排队时间，特别是在非高峰时段。"]),
          section("class-balance", "单人排队职业平衡修正", ["单人战场队列现在在双方队伍之间应用职业平衡修正。匹配系统将尝试确保双方队伍有相似的职业分布。"]),
          section("healing-nerf-pvp", "战场治疗变化：永久30%减少", ["战场中的治疗减益效果已移至战场基础属性中，成为永久效果。治疗量额外减少30%。", "这一变化极大地改变了PvP环境。爆发伤害组合变得更加可行。"]),
          section("afk-penalty", "反挂机措施", ["在战场中一段时间内未参与战斗的玩家将被移除出比赛。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 5, {
        eyebrow: "PVP 매치메이킹 가이드",
        title: "AION2 전장 매치메이킹 변경: 솔로 큐, 교차 진영 팀 & 클래스 밸런스 — 8월 12일 업데이트",
        description: "8월 12일 업데이트로 전장 매칭이 개편됐습니다. 솔로 또는 5인 고정 파티만 가능, 협력 모드 교차 진영, 솔로 큐 클래스 밸런스 보정이 적용됩니다.",
        intro: "2026년 8월 12일 업데이트로 AION2 전장 매치메이킹에 큰 변화가 생겼습니다.",
        sourceNote: "AION2T 8월 12일 업데이트 요약과 NCSOFT 공식 패치 노트에 기반합니다.",
        keywords: ["AION2 전장 솔로 큐", "AION2 매치메이킹 변경 2026년 8월", "AION2 교차 진영 팀", "AION2 PvP 힐링 감소", "AION2 전장 클래스 밸런스"],
        sections: [
          section("new-matching", "새 매칭 시스템", ["전장이 솔로 큐 또는 5인 고정 파티만 수용하도록 변경됐습니다.", "조직된 팀의 이점을 줄이기 위한 변경입니다."]),
          section("cross-faction", "협력 모드 교차 진영", ["협력 아레나와 전장에서 진영에 관계없이 팀을 구성합니다."]),
          section("class-balance", "솔로 큐 클래스 밸런스", ["솔로 전장 큐에 클래스 밸런스 보정이 적용됩니다."]),
          section("healing-nerf-pvp", "전장 치유량 변경", ["전장 내 치유량이 추가로 30% 감소합니다."]),
          section("afk-penalty", "AFK 방지 조치", ["일정 시간 전투에 참여하지 않은 플레이어는 매치에서 제거됩니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 5, {
        eyebrow: "GUIDE MATCHMAKING PVP",
        title: "Changements de matchmaking des champs de bataille AION2 : file solo, équipes inter-factions et équilibrage des classes",
        description: "La mise à jour du 12 août refond le matchmaking des champs de bataille avec file solo, équipes inter-factions et réduction des soins.",
        intro: "La mise à jour du 12 août 2026 apporte des changements majeurs au matchmaking des champs de bataille.",
        sourceNote: "Basé sur le résumé AION2T et les notes officielles NCSOFT.",
        keywords: ["matchmaking champ de bataille AION2", "file solo AION2", "équipes inter-factions AION2"],
        sections: [
          section("new-matching", "Nouveau système de matchmaking", ["Files solo ou équipes fixes de 5 uniquement."]),
          section("cross-faction", "Équipes inter-factions", ["Les équipes sont formées sans distinction de race en mode coopératif."]),
          section("class-balance", "Correction d'équilibrage des classes", ["Une correction d'équilibrage est appliquée en file solo."]),
          section("healing-nerf-pvp", "Réduction des soins en champ de bataille", ["Les soins sont réduits de 30% supplémentaires."]),
          section("afk-penalty", "Mesures anti-AFK", ["Les joueurs inactifs sont retirés du match."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 5, {
        eyebrow: "PVP-MATCHMAKING-GUIDE",
        title: "AION2 Schlachtfeld-Matchmaking-Änderungen: Solo-Queue, fraktionsübergreifende Teams & Klassen-Balance",
        description: "Das Update vom 12. August überarbeitet das Schlachtfeld-Matching mit Solo-Queue, fraktionsübergreifenden Teams und Heilungsreduzierung.",
        intro: "Das Update vom 12. August 2026 bringt bedeutende Änderungen am Schlachtfeld-Matchmaking.",
        sourceNote: "Basierend auf der AION2T Zusammenfassung und den NCSOFT-Patch-Notizen.",
        keywords: ["AION2 Schlachtfeld Solo-Queue", "AION2 Matchmaking-Änderungen", "AION2 fraktionsübergreifende Teams"],
        sections: [
          section("new-matching", "Neues Matchmaking-System", ["Nur Solo-Queue oder 5er-Festteams."]),
          section("cross-faction", "Fraktionsübergreifende Teams", ["Teams werden fraktionsunabhängig in kooperativen Modi gebildet."]),
          section("class-balance", "Klassen-Balance-Korrektur", ["Eine Klassen-Balance-Korrektur wird in der Solo-Queue angewendet."]),
          section("healing-nerf-pvp", "Heilungsreduzierung in Schlachtfeldern", ["Heilung wird um weitere 30% reduziert."]),
          section("afk-penalty", "Anti-AFK-Maßnahmen", ["Inaktive Spieler werden aus dem Match entfernt."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 5, {
        eyebrow: "GUÍA DE EMPAREJAMIENTO PVP",
        title: "Cambios en el emparejamiento de campos de batalla de AION2: cola en solitario, equipos entre facciones y equilibrio de clases",
        description: "La actualización del 12 de agosto reforma el emparejamiento de campos de batalla con cola en solitario, equipos entre facciones y reducción de curación.",
        intro: "La actualización del 12 de agosto de 2026 trae cambios significativos al emparejamiento de campos de batalla.",
        sourceNote: "Basado en el resumen AION2T y las notas oficiales de NCSOFT.",
        keywords: ["emparejamiento campo de batalla AION2", "cola solitario AION2", "equipos entre facciones AION2"],
        sections: [
          section("new-matching", "Nuevo sistema de emparejamiento", ["Solo cola en solitario o equipos fijos de 5."]),
          section("cross-faction", "Equipos entre facciones", ["Los equipos se forman sin distinción de facción en modos cooperativos."]),
          section("class-balance", "Corrección de equilibrio de clases", ["Se aplica corrección de equilibrio en cola en solitario."]),
          section("healing-nerf-pvp", "Reducción de curación en campos de batalla", ["La curación se reduce un 30% adicional."]),
          section("afk-penalty", "Medidas anti-AFK", ["Los jugadores inactivos son eliminados de la partida."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 5, {
        eyebrow: "PVPマッチングガイド",
        title: "AION2 バトルグラウンドマッチング変更：ソロキュー、クロス陣営チーム＆クラスバランス — 8月12日アップデート",
        description: "8月12日アップデートでバトルグラウンドのマッチングが全面変更されました。",
        intro: "2026年8月12日アップデートでAION2のバトルグラウンドマッチングに大きな変更が加えられました。",
        sourceNote: "AION2T 8月12日アップデート要約とNCSOFT公式パッチノートに基づきます。",
        keywords: ["AION2 バトルグラウンド ソロキュー", "AION2 マッチング変更 2026年8月", "AION2 クロス陣営"],
        sections: [
          section("new-matching", "新しいマッチングシステム", ["ソロキューまたは5人固定チームのみになりました。"]),
          section("cross-faction", "クロス陣営チーム", ["協力モードでは陣営に関係なくチームが編成されます。"]),
          section("class-balance", "クラスバランス修正", ["ソロキューにクラスバランス修正が適用されます。"]),
          section("healing-nerf-pvp", "バトルグラウンドの回復量変更", ["回復量がさらに30%減少します。"]),
          section("afk-penalty", "AFK対策", ["一定時間戦闘に参加しないプレイヤーは試合から除外されます。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 5, {
        eyebrow: "GUIA DE MATCHMAKING PVP",
        title: "Mudanças no matchmaking de campos de batalha do AION2: fila solo, times entre facções e equilíbrio de classes",
        description: "A atualização de 12 de agosto reforma o matchmaking de campos de batalha com fila solo, times entre facções e redução de cura.",
        intro: "A atualização de 12 de agosto de 2026 traz mudanças significativas ao matchmaking de campos de batalha.",
        sourceNote: "Baseado no resumo AION2T e nas notas oficiais da NCSOFT.",
        keywords: ["matchmaking campo de batalha AION2", "fila solo AION2", "times entre facções AION2"],
        sections: [
          section("new-matching", "Novo sistema de matchmaking", ["Apenas fila solo ou times fixos de 5."]),
          section("cross-faction", "Times entre facções", ["Times formados sem distinção de facção em modos cooperativos."]),
          section("class-balance", "Correção de equilíbrio de classes", ["Correção de equilíbrio aplicada na fila solo."]),
          section("healing-nerf-pvp", "Redução de cura em campos de batalha", ["Cura reduzida em 30% adicional."]),
          section("afk-penalty", "Medidas anti-AFK", ["Jogadores inativos são removidos da partida."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 5, {
        eyebrow: "РУКОВОДСТВО ПО ПОДБОРУ PVP",
        title: "Изменения подбора полей боя AION2: одиночная очередь, межфракционные команды и баланс классов",
        description: "Обновление от 12 августа перерабатывает подбор полей боя с одиночной очередью, межфракционными командами и снижением лечения.",
        intro: "Обновление от 12 августа 2026 года приносит значительные изменения в подбор полей боя.",
        sourceNote: "На основе сводки AION2T и официальных примечаний NCSOFT.",
        keywords: ["подбор поля боя AION2", "одиночная очередь AION2", "межфракционные команды AION2"],
        sections: [
          section("new-matching", "Новая система подбора", ["Только одиночная очередь или фиксированные группы из 5."]),
          section("cross-faction", "Межфракционные команды", ["Команды формируются без учёта фракции в кооперативных режимах."]),
          section("class-balance", "Коррекция баланса классов", ["Применяется коррекция баланса в одиночной очереди."]),
          section("healing-nerf-pvp", "Снижение лечения на полях боя", ["Лечение дополнительно снижено на 30%."]),
          section("afk-penalty", "Меры против AFK", ["Неактивные игроки удаляются из матча."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
        eyebrow: "PVP配對指南",
        title: "AION2 戰場配對變更：單人排隊、跨陣營組隊與職業平衡——8月12日更新",
        description: "8月12日更新重做戰場配對：僅限單人排隊或5人固定隊、合作模式跨陣營組隊、單人排隊職業平衡修正。",
        intro: "2026年8月12日更新給AION2戰場配對帶來了重大變化。",
        sourceNote: "基於 AION2T 8月12日更新摘要和官方 NCSOFT 補丁說明。",
        keywords: ["AION2 戰場單人排隊", "AION2 配對變更 2026年8月", "AION2 跨陣營組隊"],
        sections: [
          section("new-matching", "新配對系統", ["僅接受單人排隊或5人固定隊。"]),
          section("cross-faction", "跨陣營組隊", ["合作模式中無視陣營組建隊伍。"]),
          section("class-balance", "職業平衡修正", ["單人排隊中應用職業平衡修正。"]),
          section("healing-nerf-pvp", "戰場治療變化", ["治療量額外減少30%。"]),
          section("afk-penalty", "反掛機措施", ["未參與戰鬥的玩家將被移除。"]),
        ],
      }),
    },
  },

  // ARTICLE 5: Crafting & Race Understanding Improvements
  {
    section: "guides",
    slug: "crafting-race-understanding-improvements-august-2026",
    schemaType: "TechArticle",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [aug12PatchSource, ncOfficialSource],
    heroImage: hudHero,
    related: [
      { kind: "content", section: "guides", slug: "draconic-abyss-gear-august-2026" },
      { kind: "content", section: "guides", slug: "dice-lantern-arcana-equipment-guide" },
      { kind: "content", section: "news", slug: "august-12-2026-update-overview" },
    ],
    translations: {
      en: articleCopy(guideLabels, "en", 4, {
        eyebrow: "QUALITY OF LIFE",
        title: "AION2 Crafting & Race Understanding Improvements: Combo Chance, Auto-Analysis & More — August 12 Update",
        description: "The August 12 update adds crafting combo chance by proficiency-level, Race Understanding auto-analysis, Shugo Festa whirlwind change, and Abyss server rematching mechanics.",
        intro: "The August 12, 2026 update includes several quality-of-life improvements to existing systems. This guide covers the crafting probability panel upgrade (combo chance by proficiency difference), the Race Understanding auto-analysis function, Shugo Festa changes, Abyss server rematching, and the Advanced Distribution: Dice system update.",
        sourceNote: "Based on the AION2T August 12 update summary and official NCSOFT patch notes. Korea/Taiwan service update; these improvements may arrive for global version at a later date.",
        keywords: ["AION2 crafting combo chance", "AION2 Race Understanding auto-analysis", "AION2 Shugo Festa changes", "AION2 Abyss server rematching", "AION2 Advanced Distribution Dice"],
        sections: [
          section("crafting-chance", "Crafting probability: combo chance by proficiency difference", ["The crafting info panel now displays combo chance by proficiency-level difference. A toggle next to the base chance switches between the standard display and the proficiency-based combo chance view. This gives crafters a clearer picture of how their skill level affects success rates.", "Higher proficiency relative to the recipe's level increases the combo chance, which can trigger additional crafting outcomes. This makes it worthwhile to level up crafting skills beyond the minimum requirement for a recipe."]),
          section("race-understanding", "Race Understanding: auto-analysis function", ["The Race Understanding system gains an auto-analysis function. You can set eligible slots, options, and minimum grade against your current level. The analysis runs automatically and stops as soon as at least one result matches your criteria. It also aborts if your level goes up during the process or if you run short of currency.", "This is a significant time-saver for players who regularly engage with the Race Understanding system. Instead of manually checking each option, the auto-analysis does the work for you and reports the first viable match."]),
          section("shugo-festa", "Shugo Festa: Mysterious Track whirlwind change", ["On the Mysterious Track at Shugo Festa, colliding with a whirlwind now applies slow instead of knockback. This is a targeted change that makes the track more forgiving while maintaining the challenge of navigating obstacles.", "The slow effect is less disruptive than the previous knockback, allowing players to recover more quickly and maintain their position. This change may improve completion times for players who previously struggled with the whirlwind obstacle."]),
          section("abyss-rematching", "Abyss: server rematching and artifact reset", ["Server rematching now resets artifact occupation and the Abyss Corridor. This means when servers are rematched, all previously held artifacts become contested again, and the Abyss Corridor opens for fresh exploration. Check the CM hideout for specific server matching details.", "This change ensures that server rematching events have a meaningful impact on the competitive landscape. Players and factions should be prepared to recapture artifacts and re-establish their presence in the Abyss after each rematching event."]),
          section("dice-system", "Advanced Distribution: Dice system update", ["The Advanced Distribution: Dice system has been updated. Dice can only be rolled within the distribution range, and if nobody wins the roll, the item goes at random to a party or force member on the same map. Sanctuary keeps its exemption from the range limit.", "This update makes loot distribution more predictable and prevents abuse of the dice system. The range restriction ensures that only eligible members can participate in the roll, and the random assignment prevents loot from being wasted when nobody wins the roll."]),
        ],
      }),
      "zh-hans": articleCopy(guideLabels, "zh-hans", 4, {
        eyebrow: "质量改进",
        title: "AION2 制作与种族理解改进：连击几率、自动分析等——8月12日更新",
        description: "8月12日更新新增制作连击几率（按熟练度差异）、种族理解自动分析、Shugo Festa旋风变化和深淵服务器重新匹配机制。",
        intro: "2026年8月12日更新包含多项现有系统的质量改进。",
        sourceNote: "基于 AION2T 8月12日更新摘要和官方 NCSOFT 补丁说明。",
        keywords: ["AION2 制作连击几率", "AION2 种族理解自动分析", "AION2 Shugo Festa 变更", "AION2 深淵服务器重新匹配"],
        sections: [
          section("crafting-chance", "制作概率：按熟练度差异的连击几率", ["制作信息面板现在显示按熟练度等级差异的连击几率。基础几率旁边有一个切换开关。"]),
          section("race-understanding", "种族理解：自动分析功能", ["种族理解系统新增自动分析功能。设置符合条件的插槽、选项和最低等级，系统自动运行分析。"]),
          section("shugo-festa", "Shugo Festa：神秘赛道旋风变化", ["在神秘赛道上，与旋风碰撞现在改为减速而非击退。"]),
          section("abyss-rematching", "深淵：服务器重新匹配和神器重置", ["服务器重新匹配现在重置神器占领状态和深淵走廊。"]),
          section("dice-system", "高级分配：骰子系统更新", ["骰子只能在分配范围内投掷。无人获胜时物品随机分配给同地图的队员。"]),
        ],
      }),
      ko: articleCopy(guideLabels, "ko", 4, {
        eyebrow: "품질 개선",
        title: "AION2 제작 및 종족 이해 개선: 콤보 확률, 자동 분석 등 — 8월 12일 업데이트",
        description: "8월 12일 업데이트로 제작 콤보 확률(숙련도 차이 기반), 종족 이해 자동 분석, 슈고 페스타 변경, 어비스 서버 재매칭이 추가됐습니다.",
        intro: "2026년 8월 12일 업데이트에 여러 기존 시스템의 품질 개선이 포함됐습니다.",
        sourceNote: "AION2T 8월 12일 업데이트 요약과 NCSOFT 공식 패치 노트에 기반합니다.",
        keywords: ["AION2 제작 콤보 확률", "AION2 종족 이해 자동 분석", "AION2 슈고 페스타 변경", "AION2 어비스 서버 재매칭"],
        sections: [
          section("crafting-chance", "제작 확률: 숙련도 차이 기반 콤보 확률", ["제작 정보 패널에 숙련도 레벨 차이에 따른 콤보 확률이 표시됩니다."]),
          section("race-understanding", "종족 이해: 자동 분석 기능", ["종족 이해 시스템에 자동 분석 기능이 추가됐습니다."]),
          section("shugo-festa", "슈고 페스타: 신비 트랙 회오리 변경", ["회오리 충돌 시 넉백 대신 감속이 적용됩니다."]),
          section("abyss-rematching", "어비스: 서버 재매칭", ["서버 재매칭 시 아티팩트 점령 상태와 어비스 통로가 초기화됩니다."]),
          section("dice-system", "고급 분배: 주사위 시스템 업데이트", ["주사위는 분배 범위 내에서만 굴릴 수 있습니다."]),
        ],
      }),
      fr: articleCopy(guideLabels, "fr", 4, {
        eyebrow: "AMÉLIORATIONS",
        title: "Améliorations de l'artisanat et de la compréhension raciale AION2 : chances de combo, analyse automatique et plus",
        description: "La mise à jour du 12 août ajoute des chances de combo par niveau de compétence, l'analyse automatique de la compréhension raciale et des changements Shugo Festa.",
        intro: "La mise à jour du 12 août 2026 inclut plusieurs améliorations de la qualité de vie.",
        sourceNote: "Basé sur le résumé AION2T et les notes officielles NCSOFT.",
        keywords: ["chances de combo artisanat AION2", "analyse automatique compréhension raciale AION2", "changements Shugo Festa AION2"],
        sections: [
          section("crafting-chance", "Chances de combo artisanat", ["Le panneau d'info affiche désormais les chances de combo par différence de niveau de compétence."]),
          section("race-understanding", "Analyse automatique de la compréhension raciale", ["Une fonction d'analyse automatique est ajoutée au système de compréhension raciale."]),
          section("shugo-festa", "Changement Shugo Festa", ["Les collisions avec les tornades appliquent un ralentissement au lieu d'un renversement."]),
          section("abyss-rematching", "Recomposition des serveurs Abyss", ["La recomposition réinitialise l'occupation des artefacts et le corridor Abyss."]),
          section("dice-system", "Mise à jour du système de dés", ["Les dés ne peuvent être lancés que dans la plage de distribution."]),
        ],
      }),
      de: articleCopy(guideLabels, "de", 4, {
        eyebrow: "VERBESSERUNGEN",
        title: "AION2 Handwerks- und Rassenverständnis-Verbesserungen: Combo-Chance, Auto-Analyse und mehr",
        description: "Das Update vom 12. August fügt Combo-Chance nach Fertigkeitsstufe, Rassenverständnis-Auto-Analyse und Shugo Festa-Änderungen hinzu.",
        intro: "Das Update vom 12. August 2026 enthält mehrere Lebensqualitätsverbesserungen.",
        sourceNote: "Basierend auf der AION2T Zusammenfassung und den NCSOFT-Patch-Notizen.",
        keywords: ["AION2 Handwerks-Combo-Chance", "AION2 Rassenverständnis Auto-Analyse", "AION2 Shugo Festa Änderungen"],
        sections: [
          section("crafting-chance", "Handwerks-Combo-Chance", ["Das Info-Panel zeigt jetzt die Combo-Chance nach Fertigkeitsstufenunterschied."]),
          section("race-understanding", "Auto-Analyse des Rassenverständnisses", ["Eine Auto-Analyse-Funktion wird zum Rassenverständnissystem hinzugefügt."]),
          section("shugo-festa", "Shugo Festa-Änderung", ["Wirbelwind-Kollisionen verlangsamen statt zurückzustoßen."]),
          section("abyss-rematching", "Abyss-Server-Neuzuordnung", ["Die Neuzuordnung setzt Artefaktbesetzung und Abyss-Korridor zurück."]),
          section("dice-system", "Würfelsystem-Update", ["Würfel können nur innerhalb des Verteilungsbereichs geworfen werden."]),
        ],
      }),
      es: articleCopy(guideLabels, "es", 4, {
        eyebrow: "MEJORAS",
        title: "Mejoras de artesanía y comprensión racial de AION2: probabilidad de combo, análisis automático y más",
        description: "La actualización del 12 de agosto añade probabilidad de combo por nivel de competencia, análisis automático de comprensión racial y cambios en Shugo Festa.",
        intro: "La actualización del 12 de agosto de 2026 incluye varias mejoras de calidad de vida.",
        sourceNote: "Basado en el resumen AION2T y las notas oficiales de NCSOFT.",
        keywords: ["probabilidad de combo artesanía AION2", "análisis automático comprensión racial AION2", "cambios Shugo Festa AION2"],
        sections: [
          section("crafting-chance", "Probabilidad de combo de artesanía", ["El panel de información ahora muestra la probabilidad de combo por diferencia de nivel de competencia."]),
          section("race-understanding", "Análisis automático de comprensión racial", ["Se añade una función de análisis automático al sistema de comprensión racial."]),
          section("shugo-festa", "Cambio en Shugo Festa", ["Las colisiones con torbellinos aplican ralentización en lugar de derribo."]),
          section("abyss-rematching", "Recombinación de servidores Abyss", ["La recombinación restablece la ocupación de artefactos y el corredor Abyss."]),
          section("dice-system", "Actualización del sistema de dados", ["Los dados solo pueden lanzarse dentro del rango de distribución."]),
        ],
      }),
      ja: articleCopy(guideLabels, "ja", 4, {
        eyebrow: "改善点",
        title: "AION2 クラフト＆種族理解の改善：コンボ確率、自動分析など — 8月12日アップデート",
        description: "8月12日アップデートでクラフトコンボ確率、種族理解の自動分析、シュゴフェスタ変更などが追加されました。",
        intro: "2026年8月12日アップデートには既存システムの改善が多数含まれています。",
        sourceNote: "AION2T 8月12日アップデート要約とNCSOFT公式パッチノートに基づきます。",
        keywords: ["AION2 クラフトコンボ確率", "AION2 種族理解 自動分析", "AION2 シュゴフェスタ変更"],
        sections: [
          section("crafting-chance", "クラフトコンボ確率", ["情報パネルに熟練度レベル差によるコンボ確率が表示されます。"]),
          section("race-understanding", "種族理解の自動分析", ["種族理解システムに自動分析機能が追加されました。"]),
          section("shugo-festa", "シュゴフェスタ変更", ["旋風との衝突がノックバックではなくスローになります。"]),
          section("abyss-rematching", "アビスサーバー再マッチング", ["再マッチング時にアーティファクト占有とアビス回廊がリセットされます。"]),
          section("dice-system", "ダイスシステム更新", ["ダイスは分配範囲内でのみロールできます。"]),
        ],
      }),
      "pt-br": articleCopy(guideLabels, "pt-br", 4, {
        eyebrow: "MELHORIAS",
        title: "Melhorias de artesanato e compreensão racial do AION2: chance de combo, análise automática e mais",
        description: "A atualização de 12 de agosto adiciona chance de combo por nível de proficiência, análise automática de compreensão racial e mudanças no Shugo Festa.",
        intro: "A atualização de 12 de agosto de 2026 inclui várias melhorias de qualidade de vida.",
        sourceNote: "Baseado no resumo AION2T e nas notas oficiais da NCSOFT.",
        keywords: ["chance de combo artesanato AION2", "análise automática compreensão racial AION2", "mudanças Shugo Festa AION2"],
        sections: [
          section("crafting-chance", "Chance de combo de artesanato", ["O painel de informações agora mostra chance de combo por diferença de nível de proficiência."]),
          section("race-understanding", "Análise automática de compreensão racial", ["Uma função de análise automática é adicionada ao sistema de compreensão racial."]),
          section("shugo-festa", "Mudança no Shugo Festa", ["Colisões com redemoinhos aplicam lentidão em vez de repulsão."]),
          section("abyss-rematching", "Recombinação de servidores Abyss", ["A recombinação redefine a ocupação de artefatos e o corredor Abyss."]),
          section("dice-system", "Atualização do sistema de dados", ["Dados só podem ser lançados dentro do intervalo de distribuição."]),
        ],
      }),
      ru: articleCopy(guideLabels, "ru", 4, {
        eyebrow: "УЛУЧШЕНИЯ",
        title: "Улучшения крафта и понимания рас AION2: шанс комбо, автоанализ и многое другое",
        description: "Обновление от 12 августа добавляет шанс комбо по уровню мастерства, автоанализ понимания рас и изменения Shugo Festa.",
        intro: "Обновление от 12 августа 2026 года включает несколько улучшений качества жизни.",
        sourceNote: "На основе сводки AION2T и официальных примечаний NCSOFT.",
        keywords: ["шанс комбо крафта AION2", "автоанализ понимания рас AION2", "изменения Shugo Festa AION2"],
        sections: [
          section("crafting-chance", "Шанс комбо крафта", ["Панель информации теперь показывает шанс комбо по разнице уровня мастерства."]),
          section("race-understanding", "Автоанализ понимания рас", ["Функция автоанализа добавлена в систему понимания рас."]),
          section("shugo-festa", "Изменение Shugo Festa", ["Столкновения с вихрями замедляют вместо отбрасывания."]),
          section("abyss-rematching", "Переформирование серверов Бездны", ["Переформирование сбрасывает занятие артефактов и коридор Бездны."]),
          section("dice-system", "Обновление системы кубиков", ["Кубики можно бросать только в пределах диапазона распределения."]),
        ],
      }),
      "zh-hant": articleCopy(guideLabels, "zh-hant", 4, {
        eyebrow: "品質改進",
        title: "AION2 製作與種族理解改進：連擊機率、自動分析等——8月12日更新",
        description: "8月12日更新新增製作連擊機率（按熟練度差異）、種族理解自動分析、Shugo Festa旋風變化和深淵伺服器重新匹配機制。",
        intro: "2026年8月12日更新包含多項現有系統的品質改進。",
        sourceNote: "基於 AION2T 8月12日更新摘要和官方 NCSOFT 補丁說明。",
        keywords: ["AION2 製作連擊機率", "AION2 種族理解自動分析", "AION2 Shugo Festa 變更"],
        sections: [
          section("crafting-chance", "製作連擊機率", ["資訊面板顯示按熟練度等級差異的連擊機率。"]),
          section("race-understanding", "種族理解自動分析", ["種族理解系統新增自動分析功能。"]),
          section("shugo-festa", "Shugo Festa 變更", ["與旋風碰撞改為減速而非擊退。"]),
          section("abyss-rematching", "深淵伺服器重新匹配", ["重新匹配重置神器佔領和深淵走廊。"]),
          section("dice-system", "骰子系統更新", ["骰子只能在分配範圍內投擲。"]),
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];

export const trendingAugust13GeneratedEditorialEntries = {
  "guides/mobile-hud-editor-guide": {},
  "guides/draconic-abyss-gear-august-2026": {},
  "news/shop-redesign-midsummer-night-dream-cosmetics": {},
  "guides/battleground-matchmaking-changes-august-2026": {},
  "guides/crafting-race-understanding-improvements-august-2026": {},
} as const;