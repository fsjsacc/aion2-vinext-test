import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-20-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 4 — Character customization guide */

const customSource1: ContentSource = {
  id: "mmobomb-stream-custom-2026-08-20", kind: "third-party", publisher: "MMOBomb",
  label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
  url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream",
  publishedAt: "2026-08-10", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "NC 首次全球开发者直播：Aion 2 玩家可期待什么", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre du lancement", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar en el lanzamiento", ja: "NCが初のグローバル開発者ストリームでAion 2プレイヤーが発売時に期待できることを共有", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar no lançamento", ru: "NC делится тем, что игроки Aion 2 могут ожидать от запуска", ko: "NC, 첫 글로벌 개발자 스트림에서 Aion 2 플레이어가 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 首次全球開發者直播：Aion 2 玩家可期待什麼", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"),
};
const customSource2: ContentSource = {
  id: "aion2hub-custom-2026-08-20", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Character Creation — 200+ Customization Options",
  url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2 角色创建——200+ 自定义选项", en: "AION 2 Character Creation — 200+ Customization Options", fr: "AION 2 Création de personnage — plus de 200 options", de: "AION 2 Charaktererstellung — 200+ Optionen", es: "AION 2 Creación de personaje — más de 200 opciones", ja: "AION 2 キャラクター作成 — 200以上のカスタマイズオプション", "pt-br": "AION 2 Criação de personagem — mais de 200 opções", ru: "AION 2 Создание персонажа — 200+ опций", ko: "AION 2 캐릭터 생성 — 200+ 커스터마이징 옵션", "zh-hant": "AION 2 角色創建——200+ 自訂選項", }, "https://aion2hub.com/"),
};
const customSource3: ContentSource = {
  id: "plaync-custom-2026-08-20", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 캐릭터 커스터마이징 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 角色自定义说明", en: "AION 2 (KR) — Character Customization Guide", fr: "AION 2 (KR) — Guide de personnalisation de personnage", de: "AION 2 (KR) — Charakter-Anpassungs-Guide", es: "AION 2 (KR) — Guía de personalización de personaje", ja: "AION 2 (KR) — キャラクターカスタマイズガイド", "pt-br": "AION 2 (KR) — Guia de personalização de personagem", ru: "AION 2 (KR) — Гайд по кастомизации персонажа", ko: "AION 2 (KR) — 캐릭터 커스터마이징 안내", "zh-hant": "AION 2（韓服）— 角色自訂說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const customHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "角色自定义指南配图", caption: "NC 官方配图；角色创建提供 200+ 自定义选项与 4 个角色栏位。" }, en: { alt: "Character customization guide image", caption: "Official NC artwork; character creation offers 200+ customization options and four character slots." }, fr: { alt: "Image du guide de personnalisation de personnage", caption: "Visuel officiel NC ; la création offre plus de 200 options et quatre emplacements." }, de: { alt: "Charakter-Anpassungs-Guide-Bild", caption: "Offizielles NC-Artwork; die Erstellung bietet 200+ Optionen und vier Slots." }, es: { alt: "Imagen de la guía de personalización de personaje", caption: "Arte oficial de NC; la creación ofrece más de 200 opciones y cuatro espacios." }, ja: { alt: "キャラクターカスタマイズガイド画像", caption: "NC公式アートワーク；作成は200以上のオプションと4つのキャラクタースロットを提供します。" }, "pt-br": { alt: "Imagem do guia de personalização de personagem", caption: "Arte oficial da NC; a criação oferece mais de 200 opções e quatro slots." }, ru: { alt: "Изображение гайда по кастомизации персонажа", caption: "Официальный арт NC; создание предлагает 200+ опций и четыре слота." }, ko: { alt: "캐릭터 커스터마이징 가이드 이미지", caption: "NC 공식 이미지입니다. 캐릭터 생성은 200개 이상의 옵션과 4개의 캐릭터 슬롯을 제공합니다." }, "zh-hant": { alt: "角色自訂指南配圖", caption: "NC 官方配圖；角色創建提供 200+ 自訂選項與 4 個角色欄位。" }, },
};

export const trendingAugust20Article4: ContentEntry = {
  section: "guides", slug: "aion-2-character-customization-guide", schemaType: "Article",
  publishedAt: "2026-08-20", updatedAt: "2026-08-20", readingMinutes: 5,
  publication: publishedVerified,
  sources: [customSource1, customSource2, customSource3],
  heroImage: customHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-mounts-and-wings-guide" },
    { kind: "content", section: "news", slug: "aion-2-first-global-dev-stream-recap" },
    { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "CREATION GUIDE", title: "Aion 2 Character Customization Guide: 200+ Options, 4 Slots & Glamour",
      description: "Aion 2's character creation offers 200+ customization options and four character slots per server. How the system works, glamour rules, and how to plan your alts.",
      intro: "Aion 2 doubles down on character expression. The launch build comes with over 200 customization options for the body, face, and hairstyles, and the dev stream confirmed four character slots — room for alts or multiple races. This guide covers what the system offers, how glamour separates look from gear, and how to plan your four slots.",
      sourceNote: "Based on the August 7 global developer stream and the official KR creation structure. Option counts reflect NCSoft's confirmed figures.",
      keywords: ["Aion 2 character creation", "Aion 2 customization", "Aion 2 character slots", "Aion 2 glamour", "Aion 2 appearance"],
      sections: [
        section("options", "200+ Customization Options", ["Character creation spans facial features, body types, hairstyles, colors, and more — over 200 individual options confirmed for launch. The tools support fine-grained sliders plus presets for quick starts.", "Options are largely aesthetic; race and class are chosen separately. Spend time here if you like — the game also supports later appearance edits through the glamour/cosmetic systems, so creation is not a permanent commitment."]),
        section("slots", "Four Character Slots", ["Each server supports four character slots, confirmed in the dev stream. This is generous for MMO standards and supports the 'one character per class role' approach — launch has eight classes across trinity roles.", "Plan the four slots around your goals: a main for the expedition/raid endgame, an alt for PvP or a different role, and flexibility for class experimentation. Server regions being non-region-locked means you can also use slots across regions if you create there."]),
        section("glamour", "Glamour & Changing Looks", ["The glamour/transmogrification system separates cosmetic appearance from gear stats — you can look like a low-level traveler while wearing endgame armor, or swap wing and mount skins freely.", "The dev stream highlighted the wing glamour system as a flagship example. For launch, expect cosmetic items from the cash shop, season passes, and events to feed this system rather than affecting power."]),
        section("planning", "Planning Your Slots", ["Practical plan for the four slots: one primary class that clears expeditions and trials, one PvP-oriented alt (battlegrounds and the Abyss reward role flexibility), and up to two flexible slots for new classes or server region characters.", "Wait before spending appearance change items — the first two slots should be invested in your main class. Rush decisions in the character creator are recoverable but cost cosmetic currency."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "创建指南", title: "Aion 2 角色自定义指南：200+ 选项、4 个角色位与幻化",
      description: "Aion 2 的角色创建提供 200+ 自定义选项，每服务器 4 个角色位。系统运作方式、幻化规则与如何规划小号。",
      intro: "Aion 2 深耕角色表达。上线版本为体型、面部与发型提供 200+ 自定义选项，开发者直播确认了 4 个角色位——足以容纳小号或多种族。本指南涵盖系统功能、幻化如何分离外观与装备，以及如何规划四个角色位。",
      sourceNote: "基于 8 月 7 日全球开发者直播与官方韩服创建结构。选项数量反映 NCSoft 确认的数据。",
      keywords: ["Aion 2 角色创建", "Aion 2 自定义", "Aion 2 角色位", "Aion 2 幻化", "Aion 2 外观"],
      sections: [
        section("options", "200+ 自定义选项", ["角色创建涵盖面部特征、体型、发型、颜色等——上线确认的独立选项超过 200 个。工具支持精细滑块与快速预设。", "选项基本是外观性的；种族与职业单独选择。系统还支持通过幻化系统进行后续外观编辑，创建并非永久决定。"]),
        section("slots", "四个角色位", ["每服务器支持 4 个角色位（开发者直播确认）。这以 MMO 标准而言很慷慨，支持按职业角色分工的玩法——上线有 8 个职业横跨铁三角。", "围绕目标规划四个角色位：远征/团本后期的主号、PvP 或不同角色的小号，以及用于职业实验的灵活性。服务器区域无锁意味着也可以跨区域建号。"]),
        section("glamour", "幻化与更换外观", ["幻化系统将外观与装备属性分离——可以穿后期装备看起来像低级旅客，或自由更换翅膀与坐骑外观。", "开发者直播将翅膀幻化系统列为旗舰示例。上线时的商城、赛季通行证与活动外观将供给该系统，而非影响强度。"]),
        section("planning", "规划你的角色位", ["四个角色位的实用方案：一个通关远征与试炼的主职业、一个 PvP 向小号（战场与深渊奖励角色灵活性），以及最多两个灵活位用于新职业或跨区角色。", "使用外观变更物品前先等待——前两个角色位应投入主职业。创建器中的仓促决定可补救但要花费外观货币。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "생성 가이드", title: "Aion 2 캐릭터 커스터마이징 가이드: 200+ 옵션, 4개 슬롯과 글래머",
      description: "Aion 2의 캐릭터 생성은 200개 이상의 커스터마이징 옵션과 서버당 4개의 캐릭터 슬롯을 제공합니다. 시스템 작동 방식, 글래머 규칙, 부캐 계획 방법.",
      intro: "Aion 2는 캐릭터 표현에 힘을 쏟습니다. 출시 빌드는 200개 이상의 바디, 얼굴, 헤어스타일 옵션을 제공하며, 개발자 스트림에서 캐릭터 슬롯 4개가 확인되었습니다.",
      sourceNote: "8월 7일 글로벌 개발자 스트림과 공식 KR 생성 구조에 기반합니다.",
      keywords: ["Aion 2 캐릭터 생성", "Aion 2 커스터마이징", "Aion 2 캐릭터 슬롯", "Aion 2 글래머", "Aion 2 외형"],
      sections: [
        section("options", "200개 이상의 옵션", ["얼굴, 바디, 헤어스타일, 색상 등 200개 이상의 옵션. 세밀한 슬라이더와 프리셋 지원.", "옵션은 주로 미적 — 종족과 클래스는 별도 선택. 글래머 시스템으로 나중에 외형 수정 가능."]),
        section("slots", "4개 캐릭터 슬롯", ["서버당 4개 슬롯. 출시 8개 클래스에 삼위일체 역할을 고려한 유연한 계획 가능.", "메인(원정대/레이드), PvP 부캐, 실험 용도로 나누세요."]),
        section("glamour", "글래머와 외형 변경", ["글래머는 외형과 장비 스탯을 분리합니다. 날개 글래머 시스템이 대표 사례입니다."]),
        section("planning", "슬롯 계획", ["메인 클래스에 먼저 투자하고, PvP 부캐를 하나 두고 나머지를 유연하게 사용하세요. 외형 변경 아이템은 아끼세요."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "作成ガイド", title: "Aion 2 キャラクターカスタマイズガイド：200以上のオプション、4スロットとグラマー",
      description: "Aion 2 のキャラクター作成は200以上のカスタマイズオプションとサーバーごとの4キャラクタースロットを提供します。システムの仕組み、グラマールール、サブキャラ計画。",
      intro: "Aion 2 はキャラクター表現に力を入れています。ローンチビルドは200以上のボディ・顔・ヘアスタイルオプションを提供し、開発者ストリームでキャラクタースロット4つが確認されました。",
      sourceNote: "8月7日のグローバル開発者ストリームと公式KR作成構造に基づきます。",
      keywords: ["Aion 2 キャラクター作成", "Aion 2 カスタマイズ", "Aion 2 キャラクタースロット", "Aion 2 グラマー", "Aion 2 外観"],
      sections: [
        section("options", "200以上のオプション", ["顔、ボディ、ヘアスタイル、色など200以上のオプション。細かいスライダーとプリセットをサポート。", "オプションは主に見た目 — 種族とクラスは別に選択。グラマーシステムで後から外観編集可能。"]),
        section("slots", "4キャラクタースロット", ["サーバーごとに4スロット。トライニティ役割を考慮したフレキシブルな計画が可能。", "メイン(遠征/レイド)、PvPサブ、実験用に分けましょう。"]),
        section("glamour", "グラマーと外観変更", ["グラマーは外観と装備スタットを分離します。翼グラマーシステムが代表例です。"]),
        section("planning", "スロット計画", ["メインクラスにまず投資し、PvPサブを1つ持ち、残りは柔軟に。外観変更アイテムは温存しましょう。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE DE CRÉATION", title: "Guide de personnalisation d'Aion 2 : plus de 200 options, 4 emplacements et glamour",
      description: "La création de personnage d'Aion 2 offre plus de 200 options et quatre emplacements. Système, règles de glamour et planification des alts.",
      intro: "Aion 2 mise sur l'expression du personnage avec plus de 200 options et quatre emplacements de personnage confirmés.",
      sourceNote: "Basé sur le dev stream du 7 août et la structure officielle KR.",
      keywords: ["Aion 2 création de personnage", "Aion 2 personnalisation", "Aion 2 emplacements", "Aion 2 glamour"],
      sections: [
        section("options", "200+ options", ["Visage, corps, coiffures et couleurs. Curseurs fins et préréglages. Surtout esthétique."]),
        section("slots", "Quatre emplacements", ["Quatre par serveur : un main, un alt PvP, deux flexibles pour l'expérimentation."]),
        section("glamour", "Glamour", ["Sépare l'apparence des stats d'équipement. Le système de glamour des ailes est l'exemple phare."]),
        section("planning", "Planification", ["Investissez d'abord dans la classe principale, gardez de la flexibilité, économisez les objets de changement d'apparence."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "ERSTELLUNGS-GUIDE", title: "Aion 2 Charakter-Anpassungs-Guide: 200+ Optionen, 4 Slots & Glamour",
      description: "Die Charaktererstellung von Aion 2 bietet 200+ Optionen und vier Slots. System, Glamour-Regeln und Alt-Planung.",
      intro: "Aion 2 setzt auf Charakterausdruck mit über 200 Optionen und vier bestätigten Charakterslots.",
      sourceNote: "Basierend auf dem Dev-Stream vom 7. August und der offiziellen KR-Struktur.",
      keywords: ["Aion 2 Charaktererstellung", "Aion 2 Anpassung", "Aion 2 Charakterslots", "Aion 2 Glamour"],
      sections: [
        section("options", "200+ Optionen", ["Gesicht, Körper, Frisuren und Farben. Feine Slider und Presets. Hauptsächlich ästhetisch."]),
        section("slots", "Vier Slots", ["Vier pro Server: ein Main, ein PvP-Alt, zwei flexible für Experimente."]),
        section("glamour", "Glamour", ["Trennt Aussehen von Ausrüstungs-Stats. Das Flügel-Glamour-System ist das Flaggschiff."]),
        section("planning", "Planung", ["Zuerst in die Hauptklasse investieren, Flexibilität bewahren, Aussehens-Wechselobjekte sparen."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DE CREACIÓN", title: "Guía de personalización de personaje de Aion 2: más de 200 opciones, 4 espacios y glamour",
      description: "La creación de personaje de Aion 2 ofrece más de 200 opciones y cuatro espacios. Sistema, reglas de glamour y planificación de alternates.",
      intro: "Aion 2 apuesta por la expresión del personaje con más de 200 opciones y cuatro espacios confirmados.",
      sourceNote: "Basado en el dev stream del 7 de agosto y la estructura oficial de KR.",
      keywords: ["Aion 2 creación de personaje", "Aion 2 personalización", "Aion 2 espacios", "Aion 2 glamour"],
      sections: [
        section("options", "Más de 200 opciones", ["Cara, cuerpo, peinados y colores. Controles finos y preajustes. Sobre todo estético."]),
        section("slots", "Cuatro espacios", ["Cuatro por servidor: un main, un alt de PvP, dos flexibles para experimentar."]),
        section("glamour", "Glamour", ["Separa la apariencia de las stats del equipo. El glamour de alas es el ejemplo insignia."]),
        section("planning", "Planificación", ["Invierte primero en la clase principal, guarda flexibilidad y ahorra objetos de cambio de apariencia."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DE CRIAÇÃO", title: "Guia de personalização de personagem de Aion 2: mais de 200 opções, 4 slots e glamour",
      description: "A criação de personagem de Aion 2 oferece mais de 200 opções e quatro slots. Sistema, regras de glamour e planejamento de alts.",
      intro: "Aion 2 aposta na expressão do personagem com mais de 200 opções e quatro slots confirmados.",
      sourceNote: "Baseado no dev stream de 7 de agosto e na estrutura oficial da KR.",
      keywords: ["Aion 2 criação de personagem", "Aion 2 personalização", "Aion 2 slots", "Aion 2 glamour"],
      sections: [
        section("options", "Mais de 200 opções", ["Rosto, corpo, penteados e cores. Controles finos e predefinições. Sobretudo estético."]),
        section("slots", "Quatro slots", ["Quatro por servidor: um main, um alt de PvP, dois flexíveis para experimentar."]),
        section("glamour", "Glamour", ["Separa a aparência das stats do equipamento. O glamour de asas é o exemplo principal."]),
        section("planning", "Planejamento", ["Invista primeiro na classe principal, mantenha flexibilidade e economize itens de mudança de aparência."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ГАЙД ПО СОЗДАНИЮ", title: "Гайд по кастомизации персонажа Aion 2: 200+ опций, 4 слота и гламур",
      description: "Создание персонажа в Aion 2 предлагает 200+ опций и четыре слота. Система, правила гламура и планирование альтов.",
      intro: "Aion 2 делает ставку на выражение персонажа с 200+ опциями и четырьмя подтверждёнными слотами.",
      sourceNote: "На основе dev-стрима от 7 августа и официальной структуры KR.",
      keywords: ["Aion 2 создание персонажа", "Aion 2 кастомизация", "Aion 2 слоты", "Aion 2 гламур"],
      sections: [
        section("options", "200+ опций", ["Лицо, тело, причёски и цвета. Тонкие слайдеры и пресеты. В основном эстетика."]),
        section("slots", "Четыре слота", ["Четыре на сервер: основной, PvP-альт, два гибких для экспериментов."]),
        section("glamour", "Гламур", ["Отделяет внешность от статов экипировки. Система гламура крыльев — флагман."]),
        section("planning", "Планирование", ["Сначала вложитесь в основной класс, сохраняйте гибкость и экономьте предметы смены внешности."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "創建指南", title: "Aion 2 角色自訂指南：200+ 選項、4 個角色欄位與幻化",
      description: "Aion 2 的角色創建提供 200+ 自訂選項，每伺服器 4 個角色欄位。系統運作方式、幻化規則與如何規劃小號。",
      intro: "Aion 2 深耕角色表達。上線版本為體型、面部與髮型提供 200+ 自訂選項，開發者直播確認了 4 個角色欄位——足以容納小號或多種族。本指南涵蓋系統功能、幻化如何分離外觀與裝備，以及如何規劃四個角色欄位。",
      sourceNote: "基於 8 月 7 日全球開發者直播與官方韓服創建結構。選項數量反映 NCSoft 確認的數據。",
      keywords: ["Aion 2 角色創建", "Aion 2 自訂", "Aion 2 角色欄位", "Aion 2 幻化", "Aion 2 外觀"],
      sections: [
        section("options", "200+ 自訂選項", ["角色創建涵蓋面部特徵、體型、髮型、顏色等——上線確認的獨立選項超過 200 個。工具支援精細滑塊與快速預設。", "選項基本上是外觀性的；種族與職業單獨選擇。系統還支援透過幻化系統進行後續外觀編輯，創建並非永久決定。"]),
        section("slots", "四個角色欄位", ["每伺服器支援 4 個角色欄位（開發者直播確認）。這以 MMO 標準而言很慷慨，支援按職業角色分工的玩法——上線有 8 個職業橫跨鐵三角。", "圍繞目標規劃四個角色欄位：遠征/團本後期的主號、PvP 或不同角色的小號，以及用於職業實驗的靈活性。伺服器區域無鎖意味著也可以跨區域建號。"]),
        section("glamour", "幻化與更換外觀", ["幻化系統將外觀與裝備屬性分離——可以穿後期裝備看起來像低階旅客，或自由更換翅膀與坐騎外觀。", "開發者直播將翅膀幻化系統列為旗艦示例。上線時的商城、賽季通行證與活動外觀將供給該系統，而非影響強度。"]),
        section("planning", "規劃你的角色欄位", ["四個角色欄位的實用方案：一個通關遠征與試煉的主職業、一個 PvP 向小號（戰場與深淵獎勵角色靈活性），以及最多兩個靈活位用於新職業或跨區角色。", "使用外觀變更物品前先等待——前兩個角色欄位應投入主職業。建立器中的倉促決定可補救但要花費外觀貨幣。"]),
      ],
    }),
  },
};