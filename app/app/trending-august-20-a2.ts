import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-20-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 2 — Gear enhancement & upgrade guide */

const gearSource1: ContentSource = {
  id: "aion2hub-gear-2026-08-20", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Updates — Gear Potential Enhancement, Arcana & Equipment Tiers",
  url: "https://aion2hub.com/updates", publishedAt: "2026-08-12", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 装备潜力强化、奥秘与装备层级", en: "AION 2 Updates — Gear Potential Enhancement, Arcana & Equipment Tiers", fr: "AION 2 Mises à jour — potentialisation d'équipement, Arcana et paliers", de: "AION 2 Updates — Ausrüstungspotenzial-Verbesserung, Arcana & Stufen", es: "AION 2 Actualizaciones — mejora de potencial de equipo, Arcana y niveles", ja: "AION 2 アップデート — 装備ポテンシャル強化、アルカナと装備ティア", "pt-br": "AION 2 Atualizações — melhoria de potencial de equipamento, Arcana e níveis", ru: "AION 2 Обновления — улучшение потенциала экипировки, Arcana и уровни", ko: "AION 2 업데이트 — 장비 포텐셜 강화, 아르카나와 장비 티어", "zh-hant": "AION 2 更新 — 裝備潛力強化、奧秘與裝備層級", }, "https://aion2hub.com/updates"),
};
const gearSource2: ContentSource = {
  id: "mmobomb-stream-gear-2026-08-20", kind: "third-party", publisher: "MMOBomb",
  label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
  url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream",
  publishedAt: "2026-08-10", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "NC 首次全球开发者直播：Aion 2 玩家可期待什么", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre du lancement", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar en el lanzamiento", ja: "NCが初のグローバル開発者ストリームでAion 2プレイヤーが発売時に期待できることを共有", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar no lançamento", ru: "NC делится тем, что игроки Aion 2 могут ожидать от запуска", ko: "NC, 첫 글로벌 개발자 스트림에서 Aion 2 플레이어가 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 首次全球開發者直播：Aion 2 玩家可期待什麼", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"),
};
const gearSource3: ContentSource = {
  id: "plaync-gear-2026-08-20", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 장비 강화/아르카나 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-05-27", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 装备强化/奥秘说明", en: "AION 2 (KR) — Gear Enhancement/Arcana Guide", fr: "AION 2 (KR) — Guide d'amélioration d'équipement/Arcana", de: "AION 2 (KR) — Ausrüstungsverbesserung/Arcana-Guide", es: "AION 2 (KR) — Guía de mejora de equipo/Arcana", ja: "AION 2 (KR) — 装備強化/アルカナガイド", "pt-br": "AION 2 (KR) — Guia de melhoria de equipamento/Arcana", ru: "AION 2 (KR) — Гайд по улучшению экипировки/Arcana", ko: "AION 2 (KR) — 장비 강화/아르카나 안내", "zh-hant": "AION 2（韓服）— 裝備強化/奧秘說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const gearHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "装备强化指南配图", caption: "NC 官方配图；装备强化系统随深渊与龙族装备层级推进。" }, en: { alt: "Gear enhancement guide image", caption: "Official NC artwork; the enhancement system tracks the Abyss and Dragon weapon and armor tiers." }, fr: { alt: "Image du guide d'amélioration d'équipement", caption: "Visuel officiel NC ; le système d'amélioration suit les paliers Abyss et Dragon." }, de: { alt: "Ausrüstungsverbesserungs-Guide-Bild", caption: "Offizielles NC-Artwork; die Verbesserung folgt den Abyss- und Drachen-Stufen." }, es: { alt: "Imagen de la guía de mejora de equipo", caption: "Arte oficial de NC; el sistema de mejora sigue los niveles de Abismo y Dragón." }, ja: { alt: "装備強化ガイド画像", caption: "NC公式アートワーク；強化システムはアビスとドラゴン装備ティアに連動します。" }, "pt-br": { alt: "Imagem do guia de melhoria de equipamento", caption: "Arte oficial da NC; o sistema de melhoria acompanha os níveis Abismo e Dragão." }, ru: { alt: "Изображение гайда по улучшению экипировки", caption: "Официальный арт NC; система улучшения следует уровням Бездны и Дракона." }, ko: { alt: "장비 강화 가이드 이미지", caption: "NC 공식 이미지입니다. 강화 시스템은 심연·용 장비 티어와 연동됩니다." }, "zh-hant": { alt: "裝備強化指南配圖", caption: "NC 官方配圖；裝備強化系統隨深淵與龍族裝備層級推進。" }, },
};

export const trendingAugust20Article2: ContentEntry = {
  section: "guides", slug: "aion-2-gear-enhancement-guide", schemaType: "Article",
  publishedAt: "2026-08-20", updatedAt: "2026-08-20", readingMinutes: 6,
  publication: publishedVerified,
  sources: [gearSource1, gearSource2, gearSource3],
  heroImage: gearHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-inheritance-transcendence-guide" },
    { kind: "content", section: "guides", slug: "draconic-abyss-gear-august-2026" },
    { kind: "content", section: "guides", slug: "aion-2-brokerage-market-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "GEAR GUIDE", title: "Aion 2 Gear Enhancement Guide: Upgrade Paths, Arcana Slots & Tiers",
      description: "Aion 2's gear progression runs on enhancement, Arcana equipment slots, and tiered sets. Learn how upgrading works, what the Pendant/Scale/Brooch slots do, and how to spend upgrade materials efficiently.",
      intro: "Equipment in Aion 2 improves through a mix of enhancement, transmogrification, and the Arcana system — the Pendant, Scale, and Brooch slots that add unique stat layers. With the Korean service adding new Dragon and Abyss tiers through 2026, understanding the upgrade path before global launch saves both materials and gold. This guide maps the systems.",
      sourceNote: "Based on AION2Hub's 2026 patch notes (May 27 Arcana work, August 12 new accessory tiers) and the official KR service structure.",
      keywords: ["Aion 2 gear enhancement", "Aion 2 upgrade guide", "Aion 2 Arcana slots", "Aion 2 Pendant Scale Brooch", "Aion 2 Dragon gear"],
      sections: [
        section("enhancement", "Enhancement Basics", ["Aion 2 equipment enhances in tiers using upgrade materials earned from expeditions, trials, and the Abyss. Each enhancement level raises the gear's base stats, and higher-tier gear (Dragon, Abyss) starts from a stronger baseline.", "Enhancement costs scale with item level — budget your materials toward your main set first, then optimize secondary pieces. Failed enhancements typically return a portion of materials, so the system is forgiving but expects steady material income."]),
        section("arcana", "Arcana Equipment Slots", ["The Arcana system adds three dedicated equipment slots: the Pendant, the Scale, and the Brooch. Each slot holds an Arcana item that grants stats plus unique effects, and Arcana can be crafted, upgraded, and rerolled for better values.", "The May 2026 work reworked Arcana acquisition and crafting, and the August 12 update added 'Noiran's Hidden Legacy' transcendence with Dice and Lantern Arcana. These slots are where builds differentiate — the same base gear plays very differently with different Arcana choices."]),
        section("tiers", "Gear Tiers & Sources", ["Gear is organized into tiers, with Dragon-tier weapons and armor the PvE endgame standard and Abyss gear the parallel PvP track. The August 12 update introduced the next Draconic and Abyss accessory tiers, showing a consistent cadence of tier pushes.", "Each tier's upgrade materials come from different content: expeditions feed Dragon materials, the Abyss (and Abyss Rift Zone) feed the PvP track, and Trials supply transcendence currencies that convert into higher-tier materials."]),
        section("planning", "Spending Strategy for Launch", ["For the September 30 global launch, plan in three phases: first, complete the campaign set and enhance it to a baseline; second, move into 5-player expeditions for Dragon-tier materials; third, layer Arcana optimization once the base set is stable.", "Do not sink all materials into the first set you own — campaign gear is replaced quickly. Hold materials through the first expedition clear, then invest. The brokerage can move rare materials between players, but prices reflect demand, so timing matters."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "装备指南", title: "Aion 2 装备强化指南：升级路径、奥秘插槽与层级",
      description: "Aion 2 的装备养成基于强化、奥秘装备插槽与分层套装。了解强化运作方式、坠饰/鳞片/胸针插槽的作用，以及如何高效投入强化材料。",
      intro: "Aion 2 的装备通过强化、幻化与奥秘系统（坠饰、鳞片、胸针插槽，提供独特属性层）的组合提升。随着韩服在 2026 年不断增加龙族与深渊层级，在全球上线前了解升级路径可省下材料与金币。本指南梳理这些系统。",
      sourceNote: "基于 AION2Hub 2026 年补丁说明（5 月 27 日奥秘工作、8 月 12 日新饰品层级）与官方韩服服务结构。",
      keywords: ["Aion 2 装备强化", "Aion 2 升级指南", "Aion 2 奥秘插槽", "Aion 2 坠饰 鳞片 胸针", "Aion 2 龙族装备"],
      sections: [
        section("enhancement", "强化基础", ["Aion 2 装备使用来自远征、试炼与深渊的升级材料按层级强化。每个强化等级提升装备基础属性，更高层级装备（龙族、深渊）从更强的基线开始。", "强化成本随物品等级增长——优先将材料投入主套装，再优化次要部件。失败的强化通常会返还部分材料，系统宽容但要求稳定的材料收入。"]),
        section("arcana", "奥秘装备插槽", ["奥秘系统添加三个专用装备插槽：坠饰、鳞片与胸针。每个插槽容纳提供属性与独特效果的奥秘物品，奥秘可制作、升级与重随以获取更好数值。", "2026 年 5 月的更新重做了奥秘获取与制作，8 月 12 日更新新增了含骰子与灯笼奥秘的「诺伊兰的隐秘遗产」超越。这些插槽是构筑差异化的所在——相同基础装备因奥秘选择而玩法迥异。"]),
        section("tiers", "装备层级与来源", ["装备按层级组织，龙族武器与防具是 PvE 后期标准，深渊装备是平行的 PvP 路线。8 月 12 日更新引入了下一代龙族与深渊饰品层级，显示稳定的层级推进节奏。", "各层级的升级材料来自不同内容：远征提供龙族材料，深渊（与深渊裂隙地带）提供 PvP 路线，试炼提供可转化为更高层级材料的超越货币。"]),
        section("planning", "上线投入策略", ["对于 9 月 30 日全球上线，按三阶段规划：首先完成战役套装并强化至基础水平；其次进入 5 人远征获取龙族材料；第三，基础套装稳定后叠加奥秘优化。", "不要将所有材料投入首个拥有的套装——战役装备很快会被替换。持有材料直到首次远征通关后再投入。拍卖行可在玩家间流通稀有材料，但价格反映需求，时机很重要。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "장비 가이드", title: "Aion 2 장비 강화 가이드: 업그레이드 경로, 아르카나 슬롯과 티어",
      description: "Aion 2의 장비 성장은 강화, 아르카나 장비 슬롯, 티어 세트로 진행됩니다. 강화 작동 방식, 펜던트/스케일/브로치 슬롯, 강화 재료 투자 방법을 알아보세요.",
      intro: "Aion 2의 장비는 강화, 트랜스모그, 아르카나 시스템(펜던트·스케일·브로치 슬롯)의 조합으로 개선됩니다. 한국 서비스가 2026년 내내 새 용·심연 티어를 추가하는 가운데, 글로벌 출시 전에 업그레이드 경로를 이해하면 재료와 골드를 아낄 수 있습니다.",
      sourceNote: "AION2Hub의 2026년 패치 노트(5월 27일 아르카나, 8월 12일 신규 액세서리 티어)와 공식 KR 서비스 구조에 기반합니다.",
      keywords: ["Aion 2 장비 강화", "Aion 2 업그레이드 가이드", "Aion 2 아르카나 슬롯", "Aion 2 펜던트 스케일 브로치", "Aion 2 용 장비"],
      sections: [
        section("enhancement", "강화 기본", ["원정대, 트라이얼, 심연에서 얻는 재료로 장비를 티어별로 강화합니다. 강화 레벨이 높을수록 기본 스탯 상승.", "강화 비용은 아이템 레벨에 비례 — 주 세트에 먼저 투자하세요. 실패 시 일부 재료가 반환됩니다."]),
        section("arcana", "아르카나 장비 슬롯", ["펜던트, 스케일, 브로치 세 개의 전용 슬롯. 아르카나는 제작·강화·리롤 가능하며, 8월 12일 업데이트로 '노이란의 은밀한 유산' 초월(다이스·랜턴 아르카나)이 추가되었습니다."]),
        section("tiers", "장비 티어와 출처", ["용 티어는 PvE 엔드게임 표준, 심연 장비는 PvP 트랙. 각 티어 재료는 원정대/심연/트라이얼에서 나옵니다."]),
        section("planning", "출시 투자 전략", ["캠페인 세트 → 5인 원정대 용 재료 → 아르카나 최적화의 3단계로 진행하세요. 첫 세트에 재료를 몰아쓰지 마세요."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "装備ガイド", title: "Aion 2 装備強化ガイド：アップグレード経路、アルカナスロットとティア",
      description: "Aion 2 の装備成長は強化、アルカナ装備スロット、ティアセットで進行します。強化の仕組み、ペンダント/スケイル/ブローチの役割、強化素材の効率的な使い方を解説します。",
      intro: "Aion 2 の装備は強化、トランスモグ、アルカナシステム(ペンダント・スケイル・ブローチスロット)の組み合わせで向上します。韓国サービスが2026年中ずっと新たなドラゴン・アビスティアを追加する中、グローバルローンチ前にアップグレード経路を理解すれば素材とゴールドを節約できます。",
      sourceNote: "AION2Hub の2026年パッチノート(5月27日アルカナ、8月12日新アクセサリーティア)と公式 KR サービス構造に基づきます。",
      keywords: ["Aion 2 装備強化", "Aion 2 アップグレードガイド", "Aion 2 アルカナスロット", "Aion 2 ペンダント スケイル ブローチ", "Aion 2 ドラゴン装備"],
      sections: [
        section("enhancement", "強化の基本", ["遠征、トライアル、アビスで得た素材で装備をティアごとに強化します。強化レベルが高いほど基本スタット上昇。", "強化コストはアイテムレベルに比例 — メインセットに優先投資。失敗時は素材の一部が戻ります。"],),
        section("arcana", "アルカナ装備スロット", ["ペンダント、スケイル、ブローチの専用スロット。アルカナは作成・強化・リロール可能で、8月12日アップデートで「ノイランの秘められた遺産」超越(ダイス・ランタンアルカナ)が追加されました。"],),
        section("tiers", "装備ティアと入手先", ["ドラゴンティアはPvEエンドゲーム標準、アビス装備はPvPトラック。各ティア素材は遠征/アビス/トライアルから入手します。"],),
        section("planning", "ローンチ投資戦略", ["キャンペーンセット → 5人遠征ドラゴン素材 → アルカナ最適化の3段階で進めましょう。最初のセットに素材を注ぎ込まないでください。"],),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE ÉQUIPEMENT", title: "Guide d'amélioration d'équipement d'Aion 2 : paliers, slots Arcana et tiers",
      description: "La progression d'équipement d'Aion 2 repose sur l'amélioration, les slots Arcana et les ensembles. Comment améliorer, ce que font Pendentif/Écaille/Broche et comment dépenser judicieusement.",
      intro: "L'équipement s'améliore via l'amélioration et le système Arcana. Comprendre le parcours avant le lancement mondial économise des matériaux.",
      sourceNote: "Basé sur les notes de patch AION2Hub 2026 et la structure officielle KR.",
      keywords: ["Aion 2 amélioration d'équipement", "Aion 2 guide d'upgrade", "Aion 2 slots Arcana"],
      sections: [
        section("enhancement", "Bases de l'amélioration", ["Matériaux issus des expéditions, procès et de l'Abîme. Chaque niveau augmente les stats de base."]),
        section("arcana", "Slots Arcana", ["Pendentif, Écaille et Broche : artefacts avec stats et effets uniques, fabriquables et améliorables."]),
        section("tiers", "Paliers d'équipement", ["Tier Dragon (PvE) et Abîme (PvP), avec nouveaux paliers ajoutés en août 2026."]),
        section("planning", "Stratégie de dépense", ["Ensemble de campagne d'abord, puis expéditions 5 joueurs, puis optimisation Arcana."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "AUSRÜSTUNGS-GUIDE", title: "Aion 2 Ausrüstungs-Verbesserungs-Guide: Stufen, Arcana-Slots & Tiers",
      description: "Aion 2s Ausrüstungsprogression basiert auf Verbesserung, Arcana-Slots und Sets. Wie Verbesserung funktioniert, was Anhänger/Schuppe/Brosche tun und wie man Materialien ausgibt.",
      intro: "Ausrüstung wird über Verbesserung und das Arcana-System verbessert. Das Verständnis des Systems spart Material vor dem globalen Launch.",
      sourceNote: "Basierend auf AION2Hub-Patchnotes 2026 und der offiziellen KR-Struktur.",
      keywords: ["Aion 2 Ausrüstungsverbesserung", "Aion 2 Upgrade-Guide", "Aion 2 Arcana-Slots"],
      sections: [
        section("enhancement", "Verbesserungs-Grundlagen", ["Materialien aus Expeditionen, Trials und dem Abgrund. Jede Stufe erhöht die Basiswerte."]),
        section("arcana", "Arcana-Slots", ["Anhänger, Schuppe und Brosche: Artefakte mit Werten und einzigartigen Effekten, herstellbar und verbesserbar."]),
        section("tiers", "Ausrüstungs-Tiers", ["Drachen-Tier (PvE) und Abgrund (PvP), mit neuen Stufen im August 2026."]),
        section("planning", "Ausgabenstrategie", ["Erst Kampagnen-Set, dann 5-Spieler-Expeditionen, dann Arcana-Optimierung."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE EQUIPO", title: "Guía de mejora de equipo de Aion 2: niveles, espacios Arcana y tiers",
      description: "La progresión de equipo de Aion 2 se basa en mejora, espacios Arcana y conjuntos. Cómo mejorar, qué hacen Colgante/Escama/Broche y cómo gastar materiales.",
      intro: "El equipo mejora vía el sistema de mejora y Arcana. Entender el camino antes del lanzamiento mundial ahorra materiales.",
      sourceNote: "Basado en las notas de parche de AION2Hub 2026 y la estructura oficial de KR.",
      keywords: ["Aion 2 mejora de equipo", "Aion 2 guía de upgrade", "Aion 2 espacios Arcana"],
      sections: [
        section("enhancement", "Bases de la mejora", ["Materiales de expediciones, juicios y del Abismo. Cada nivel sube las stats base."]),
        section("arcana", "Espacios Arcana", ["Colgante, Escama y Broche: artefactos con stats y efectos únicos, fabricables y mejorables."]),
        section("tiers", "Niveles de equipo", ["Nivel Dragón (PvE) y Abismo (PvP), con nuevos niveles añadidos en agosto 2026."]),
        section("planning", "Estrategia de gasto", ["Conjunto de campaña primero, luego expediciones de 5 jugadores, luego optimización Arcana."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE EQUIPAMENTO", title: "Guia de melhoria de equipamento de Aion 2: níveis, slots Arcana e tiers",
      description: "A progressão de equipamento de Aion 2 se baseia em melhoria, slots Arcana e conjuntos. Como melhorar, o que fazem Pingente/Escama/Broche e como gastar materiais.",
      intro: "Equipamento melhora via sistema de melhoria e Arcana. Entender o caminho antes do lançamento global economiza materiais.",
      sourceNote: "Baseado nas notas de patch da AION2Hub 2026 e na estrutura oficial da KR.",
      keywords: ["Aion 2 melhoria de equipamento", "Aion 2 guia de upgrade", "Aion 2 slots Arcana"],
      sections: [
        section("enhancement", "Bases da melhoria", ["Materiais de expedições, trials e do Abismo. Cada nível aumenta as stats base."]),
        section("arcana", "Slots Arcana", ["Pingente, Escama e Broche: artefatos com stats e efeitos únicos, fabricáveis e melhoráveis."]),
        section("tiers", "Níveis de equipamento", ["Nível Dragão (PvE) e Abismo (PvP), com novos níveis adicionados em agosto 2026."]),
        section("planning", "Estratégia de gasto", ["Conjunto de campanha primeiro, depois expedições de 5 jogadores, depois otimização Arcana."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ГАЙД ПО ЭКИПИРОВКЕ", title: "Гайд по улучшению экипировки Aion 2: пути, слоты Arcana и тиры",
      description: "Прогрессия экипировки Aion 2 основана на улучшении, слотах Arcana и сетах. Как улучшать, что делают Подвеска/Чешуя/Брошь и как тратить материалы.",
      intro: "Экипировка улучшается через систему улучшения и Arcana. Понимание пути до глобального запуска экономит материалы.",
      sourceNote: "На основе патч-ноутов AION2Hub 2026 и официальной структуры KR.",
      keywords: ["Aion 2 улучшение экипировки", "Aion 2 гайд по апгрейду", "Aion 2 слоты Arcana"],
      sections: [
        section("enhancement", "Основы улучшения", ["Материалы из экспедиций, испытаний и Бездны. Каждый уровень повышает базовые статы."]),
        section("arcana", "Слоты Arcana", ["Подвеска, Чешуя и Брошь: артефакты со статами и уникальными эффектами, создаваемые и улучшаемые."]),
        section("tiers", "Тиры экипировки", ["Тир Дракона (PvE) и Бездны (PvP), с новыми тирами в августе 2026."]),
        section("planning", "Стратегия трат", ["Сначала кампанийный сет, затем экспедиции на 5 игроков, затем оптимизация Arcana."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "裝備指南", title: "Aion 2 裝備強化指南：升級路徑、奧秘插槽與層級",
      description: "Aion 2 的裝備養成基於強化、奧秘裝備插槽與分層套裝。了解強化運作方式、墜飾/鱗片/胸針插槽的作用，以及如何高效投入強化材料。",
      intro: "Aion 2 的裝備透過強化、幻化與奧秘系統（墜飾、鱗片、胸針插槽，提供獨特屬性層）的組合提升。隨著韓服在 2026 年不斷增加龍族與深淵層級，在全球上線前了解升級路徑可省下材料與金幣。本指南梳理這些系統。",
      sourceNote: "基於 AION2Hub 2026 年補丁說明（5 月 27 日奧秘工作、8 月 12 日新飾品層級）與官方韓服服務結構。",
      keywords: ["Aion 2 裝備強化", "Aion 2 升級指南", "Aion 2 奧秘插槽", "Aion 2 墜飾 鱗片 胸針", "Aion 2 龍族裝備"],
      sections: [
        section("enhancement", "強化基礎", ["Aion 2 裝備使用來自遠征、試煉與深淵的升級材料按層級強化。每個強化等級提升裝備基礎屬性，更高層級裝備（龍族、深淵）從更強的基線開始。", "強化成本隨物品等級增長——優先將材料投入主套裝，再最佳化次要部件。失敗的強化通常會返還部分材料，系統寬容但要求穩定的材料收入。"]),
        section("arcana", "奧秘裝備插槽", ["奧秘系統添加三個專用裝備插槽：墜飾、鱗片與胸針。每個插槽容納提供屬性與獨特效果的奧秘物品，奧秘可製作、升級與重隨以獲取更好數值。", "2026 年 5 月的更新重做了奧秘獲取與製作，8 月 12 日更新新增了含骰子與燈籠奧秘的「諾伊蘭的隱秘遺產」超越。這些插槽是構築差異化的所在——相同基礎裝備因奧秘選擇而玩法迥異。"]),
        section("tiers", "裝備層級與來源", ["裝備按層級組織，龍族武器與防具是 PvE 後期標準，深淵裝備是平行的 PvP 路線。8 月 12 日更新引入了下一代龍族與深淵飾品層級，顯示穩定的層級推進節奏。", "各層級的升級材料來自不同內容：遠征提供龍族材料，深淵（與深淵裂隙地帶）提供 PvP 路線，試煉提供可轉化為更高層級材料的超越貨幣。"]),
        section("planning", "上線投入策略", ["對於 9 月 30 日全球上線，按三階段規劃：首先完成戰役套裝並強化至基礎水平；其次進入 5 人遠征獲取龍族材料；第三，基礎套裝穩定後疊加奧秘最佳化。", "不要將所有材料投入首個擁有的套裝——戰役裝備很快會被替換。持有材料直到首次遠征通關後再投入。拍賣行可在玩家間流通稀有材料，但價格反映需求，時機很重要。"]),
      ],
    }),
  },
};