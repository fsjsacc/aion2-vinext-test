import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-21-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 3 — Crafting guide */
const craftSource1: ContentSource = { id: "aion2hub-craft-2026-08-21", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Crafting System Overview", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2 制作系统概览", en: "AION 2 Crafting System Overview", fr: "Aperçu du système d'artisanat d'AION 2", de: "AION 2 Handwerkssystem-Übersicht", es: "Descripción general del sistema de artesanía de AION 2", ja: "AION 2 クラフトシステム概要", "pt-br": "Visão geral do sistema de artesanato do AION 2", ru: "Обзор системы крафта AION 2", ko: "AION 2 제작 시스템 개요", "zh-hant": "AION 2 製作系統概覽", }, "https://aion2hub.com/"), };
const craftSource2: ContentSource = { id: "mmobomb-craft-2026-08-21", kind: "third-party", publisher: "MMOBomb", label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "NC 首次全球开发者直播", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar", ja: "NCが初のグローバル開発者ストリーム", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar", ru: "NC делится тем, что игроки Aion 2 могут ожидать", ko: "NC, 첫 글로벌 개발자 스트림", "zh-hant": "NC 首次全球開發者直播", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const craftSource3: ContentSource = { id: "plaync-craft-2026-08-21", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — 제작 시스템 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2（韩服）— 制作系统说明", en: "AION 2 (KR) — Crafting System Guide", fr: "AION 2 (KR) — Guide du système d'artisanat", de: "AION 2 (KR) — Handwerkssystem-Guide", es: "AION 2 (KR) — Guía del sistema de artesanía", ja: "AION 2 (KR) — クラフトシステムガイド", "pt-br": "AION 2 (KR) — Guia do sistema de artesanato", ru: "AION 2 (KR) — Гайд по системе крафта", ko: "AION 2 (KR) — 제작 시스템 안내", "zh-hant": "AION 2（韓服）— 製作系統說明", }, "https://aion2.plaync.com/ko-kr/board/notice"), };
const craftHero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media", translations: { "zh-hans": { alt: "制作系统指南配图", caption: "NC 官方配图；制作系统为装备、消耗品与材料提供采集与制造路线。" }, en: { alt: "Crafting system guide image", caption: "Official NC artwork; the crafting system offers gathering and production paths for gear, consumables, and materials." }, fr: { alt: "Image du guide d'artisanat", caption: "Visuel officiel NC ; l'artisanat offre des chemins de collecte et de production." }, de: { alt: "Handwerkssystem-Guide-Bild", caption: "Offizielles NC-Artwork; das Handwerk bietet Sammel- und Produktionswege." }, es: { alt: "Imagen de la guía de artesanía", caption: "Arte oficial de NC; la artesanía ofrece rutas de recolección y producción." }, ja: { alt: "クラフトシステムガイド画像", caption: "NC公式アートワーク；クラフトシステムは収集と生産の経路を提供します。" }, "pt-br": { alt: "Imagem do guia de artesanato", caption: "Arte oficial da NC; o artesanato oferece rotas de coleta e produção." }, ru: { alt: "Изображение гайда по крафту", caption: "Официальный арт NC; крафт предлагает пути сбора и производства." }, ko: { alt: "제작 시스템 가이드 이미지", caption: "NC 공식 이미지입니다. 제작 시스템은 채집과 생산 경로를 제공합니다." }, "zh-hant": { alt: "製作系統指南配圖", caption: "NC 官方配圖；製作系統為裝備、消耗品與材料提供採集與製造路線。" }, }, };

export const trendingAugust21Article3: ContentEntry = {
  section: "guides", slug: "aion-2-crafting-guide", schemaType: "Article",
  publishedAt: "2026-08-21", updatedAt: "2026-08-21", readingMinutes: 5, publication: publishedVerified,
  sources: [craftSource1, craftSource2, craftSource3], heroImage: craftHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-brokerage-market-guide" },
    { kind: "content", section: "guides", slug: "aion-2-gear-enhancement-guide" },
    { kind: "content", section: "guides", slug: "aion-2-daily-weekly-routine-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "CRAFTING GUIDE", title: "Aion 2 Crafting Guide: Professions, Gathering & Material Economy", description: "Aion 2's crafting system spans gathering, production, and the material economy. How crafting works, what you can make, and how to profit from it.", intro: "Crafting in Aion 2 is a parallel progression track that feeds gear, consumables, and upgrade materials. With gathering and production disciplines, the system supports both self-sufficiency and market profit. This guide explains the crafting structure, what each discipline produces, and how to use the economy to your advantage.",
      sourceNote: "Based on the KR service crafting structure, AION2Hub's overview, and the official NCSoft system documentation.",
      keywords: ["Aion 2 crafting", "Aion 2 gathering", "Aion 2 professions", "Aion 2 material economy", "Aion 2 crafting guide"],
      sections: [
        section("overview", "How Crafting Works", ["Crafting in Aion 2 is divided into gathering disciplines (collecting raw materials from the world) and production disciplines (refining raw materials into usable items). Characters can learn multiple disciplines, and the system is designed to let you specialize in a self-sufficient loop.", "Materials are tiered by item level and source. Lower-tier materials come from open-world gathering and mob drops, while higher-tier materials require expedition drops, trial currencies, and Abyss rewards. The brokerage enables buying and selling between disciplines."]),
        section("disciplines", "Crafting Disciplines", ["Production disciplines include weapon crafting, armor crafting, accessory crafting, alchemy (potions and consumables), and cooking (food buffs). Each discipline produces items relevant to a specific gear slot or consumable type.", "Gathering disciplines cover mining, herbalism, and salvage. The material types feed directly into the production chains: ores to weapons and armor, herbs to alchemy and cooking, and salvaged components to accessory crafting."]),
        section("market", "The Material Economy", ["The brokerage (auction house) is where crafting meets the economy. Players sell raw materials, intermediate components, and finished goods. The August market changes — including the pet auto-loot ticket cap at 2 per month and Soul-bound Kinah changes — affect how gatherers and crafters price their goods.", "For launch, the early market rewards gatherers: raw materials are always in demand as crafters level their disciplines. Later, the margin shifts to finished goods as the player base gears up."]),
        section("global", "What Global Players Should Expect", ["Crafting is expected to launch with the September 30 early access. The KR crafting structure is a core part of the game, so global players should have access to the full system from day one.", "Plan to pick at least one gathering discipline early — the raw materials you collect while leveling will fund your crafting progression. The brokerage lets you sell surplus and buy what you cannot make, so no single discipline is mandatory."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "制作指南", title: "Aion 2 制作指南：专业、采集与材料经济", description: "Aion 2 的制作系统涵盖采集、生产与材料经济。制作如何运作、可制作什么以及如何获利。", intro: "Aion 2 的制作是平行养成轨道，提供装备、消耗品与升级材料。涵盖采集与生产专业，系统支持自给自足与市场利润。", sourceNote: "基于韩服制作结构、AION2Hub 概览与官方 NCSoft 系统文档。", keywords: ["Aion 2 制作", "Aion 2 采集", "Aion 2 专业", "Aion 2 材料经济", "Aion 2 制作指南"],
      sections: [
        section("overview", "制作如何运作", ["制作分为采集专业（从世界收集原材料）与生产专业（将原材料精炼为可用物品）。角色可学习多个专业。", "材料按物品等级与来源分级。低级材料来自开放世界采集与怪物掉落，高级材料需要远征掉落、试炼货币与深渊奖励。"]),
        section("disciplines", "制作专业", ["生产专业包括武器制作、防具制作、饰品制作、炼金术（药水与消耗品）与烹饪（食物增益）。采集专业涵盖采矿、草药学与回收。"]),
        section("market", "材料经济", ["拍卖行是制作与经济交汇之处。玩家买卖原材料、中间组件与成品。上线初期市场奖励采集者。"]),
        section("global", "全球玩家的预期", ["制作预计随 9 月 30 日抢先体验上线。建议尽早选择至少一个采集专业。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "제작 가이드", title: "Aion 2 제작 가이드: 전문 기술, 채집과 재료 경제", description: "Aion 2의 제작 시스템은 채집, 생산과 재료 경제를 아우릅니다. 제작 작동 방식, 제작 가능 아이템과 수익 창출 방법.", intro: "Aion 2의 제작은 평행 성장 트랙으로 장비, 소모품, 강화 재료를 공급합니다.", sourceNote: "KR 서비스 제작 구조, AION2Hub 개요, 공식 NCSoft 시스템 문서에 기반합니다.", keywords: ["Aion 2 제작", "Aion 2 채집", "Aion 2 전문 기술", "Aion 2 재료 경제", "Aion 2 제작 가이드"],
      sections: [
        section("overview", "제작 작동 방식", ["채집(원재료 수집)과 생산(원재료→아이템)으로 구분. 고급 재료는 원정대, 트라이얼, 심연에서 획득."]),
        section("disciplines", "제작 분야", ["생산: 무기, 방어구, 액세서리, 연금술, 요리. 채집: 채광, 약초학, 회수."]),
        section("market", "재료 경제", ["경매장에서 재료와 완제품 거래. 출시 초기에는 채집이 수익성 높음."]),
        section("global", "글로벌 플레이어의 기대", ["9월 30일 출시와 함께 제공 예정. 초반에 채집 분야 하나를 선택하세요."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "クラフトガイド", title: "Aion 2 クラフトガイド：専門技能、採集と素材経済", description: "Aion 2 のクラフトシステムは採集、生産、素材経済を網羅します。クラフトの仕組み、作成可能アイテムと利益の出し方。", intro: "Aion 2 のクラフトは平行成長トラックで、装備、消耗品、強化素材を供給します。", sourceNote: "KR サービスのクラフト構造、AION2Hub 概要、公式 NCSoft システム文書に基づきます。", keywords: ["Aion 2 クラフト", "Aion 2 採集", "Aion 2 専門技能", "Aion 2 素材経済", "Aion 2 クラフトガイド"],
      sections: [
        section("overview", "クラフトの仕組み", ["採集(原料収集)と生産(原料→アイテム)に区分。高級素材は遠征、トライアル、深淵から入手。"]),
        section("disciplines", "クラフト分野", ["生産: 武器、防具、アクセサリー、錬金術、料理。採集: 採掘、薬草学、回収。"]),
        section("market", "素材経済", ["オークションハウスで素材と完成品を取引。ローンチ初期は採集が収益性高い。"]),
        section("global", "グローバルプレイヤーの期待", ["9月30日ローンチとともに提供予定。早い段階で採集分野を1つ選びましょう。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, { eyebrow: "GUIDE ARTISANAT", title: "Guide d'artisanat d'Aion 2 : métiers, collecte et économie des matériaux", description: "L'artisanat dans Aion 2 couvre la collecte, la production et l'économie. Comment ça marche, ce que l'on peut fabriquer et comment en profiter.", intro: "L'artisanat est une piste de progression parallèle qui alimente équipement, consommables et matériaux d'amélioration.", sourceNote: "Basé sur la structure d'artisanat KR, l'aperçu AION2Hub et la documentation officielle NCSoft.", keywords: ["Aion 2 artisanat", "Aion 2 collecte", "Aion 2 métiers", "Aion 2 économie des matériaux"],
      sections: [
        section("overview", "Fonctionnement", ["Collecte et production. Matériaux de haut niveau via expéditions, procès et Abîme."]),
        section("disciplines", "Métiers", ["Production : armes, armures, accessoires, alchimie, cuisine. Collecte : minage, herboristerie, récupération."]),
        section("market", "Économie", ["Hôtel des ventes pour matériaux et produits finis. Les collecteurs sont rentables au lancement."]),
        section("global", "Pour les joueurs globaux", ["Attendu avec le lancement du 30 septembre. Choisissez un métier de collecte tôt."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, { eyebrow: "HANDWERKS-GUIDE", title: "Aion 2 Handwerks-Guide: Berufe, Sammeln & Material-Wirtschaft", description: "Das Handwerk in Aion 2 umfasst Sammeln, Produktion und die Materialwirtschaft. Wie es funktioniert, was man herstellen kann und wie man profitiert.", intro: "Handwerk ist ein paralleler Fortschrittspfad, der Ausrüstung, Verbrauchsgüter und Verbesserungsmaterialien liefert.", sourceNote: "Basierend auf der KR-Handwerksstruktur, dem AION2Hub-Überblick und der offiziellen NCSoft-Dokumentation.", keywords: ["Aion 2 Handwerk", "Aion 2 Sammeln", "Aion 2 Berufe", "Aion 2 Material-Wirtschaft"],
      sections: [
        section("overview", "Funktionsweise", ["Sammeln und Produktion. Hochwertige Materialien via Expeditionen, Trials und Abgrund."]),
        section("disciplines", "Berufe", ["Produktion: Waffen, Rüstung, Accessoires, Alchemie, Kochen. Sammeln: Bergbau, Kräuterkunde, Bergung."]),
        section("market", "Wirtschaft", ["Auktionshaus für Materialien und Fertigwaren. Sammler sind beim Launch profitabel."]),
        section("global", "Für Global-Spieler", ["Wird mit dem Launch am 30. September erwartet. Wählen Sie früh einen Sammelberuf."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, { eyebrow: "GUÍA DE ARTESANÍA", title: "Guía de artesanía de Aion 2: profesiones, recolección y economía de materiales", description: "La artesanía en Aion 2 abarca recolección, producción y la economía de materiales. Cómo funciona, qué se puede fabricar y cómo beneficiarse.", intro: "La artesanía es una pista de progresión paralela que alimenta equipo, consumibles y materiales de mejora.", sourceNote: "Basado en la estructura de artesanía KR, la visión general de AION2Hub y la documentación oficial de NCSoft.", keywords: ["Aion 2 artesanía", "Aion 2 recolección", "Aion 2 profesiones", "Aion 2 economía de materiales"],
      sections: [
        section("overview", "Funcionamiento", ["Recolección y producción. Materiales de alto nivel vía expediciones, juicios y Abismo."]),
        section("disciplines", "Profesiones", ["Producción: armas, armaduras, accesorios, alquimia, cocina. Recolección: minería, herboristería, recuperación."]),
        section("market", "Economía", ["Casa de subastas para materiales y productos. Los recolectores son rentables al lanzamiento."]),
        section("global", "Para jugadores globales", ["Esperado con el lanzamiento del 30 de septiembre. Elige una profesión de recolección temprano."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, { eyebrow: "GUIA DE ARTESANATO", title: "Guia de artesanato de Aion 2: profissões, coleta e economia de materiais", description: "O artesanato em Aion 2 abrange coleta, produção e a economia de materiais. Como funciona, o que pode ser fabricado e como lucrar.", intro: "O artesanato é uma trilha de progressão paralela que alimenta equipamento, consumíveis e materiais de melhoria.", sourceNote: "Baseado na estrutura de artesanato KR, na visão geral da AION2Hub e na documentação oficial da NCSoft.", keywords: ["Aion 2 artesanato", "Aion 2 coleta", "Aion 2 profissões", "Aion 2 economia de materiais"],
      sections: [
        section("overview", "Funcionamento", ["Coleta e produção. Materiais de alto nível via expedições, trials e Abismo."]),
        section("disciplines", "Profissões", ["Produção: armas, armaduras, acessórios, alquimia, culinária. Coleta: mineração, herbologia, recuperação."]),
        section("market", "Economia", ["Casa de leilões para materiais e produtos. Coletores são lucrativos no lançamento."]),
        section("global", "Para jogadores globais", ["Esperado com o lançamento de 30 de setembro. Escolha uma profissão de coleta cedo."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, { eyebrow: "ГАЙД ПО КРАФТУ", title: "Гайд по крафту Aion 2: профессии, сбор и экономика материалов", description: "Крафт в Aion 2 охватывает сбор, производство и экономику материалов. Как работает, что можно создать и как заработать.", intro: "Крафт — параллельный путь прогрессии, снабжающий экипировкой, расходниками и материалами улучшения.", sourceNote: "На основе структуры крафта KR, обзора AION2Hub и официальной документации NCSoft.", keywords: ["Aion 2 крафт", "Aion 2 сбор", "Aion 2 профессии", "Aion 2 экономика материалов"],
      sections: [
        section("overview", "Механика", ["Сбор и производство. Высокоуровневые материалы через экспедиции, испытания и Бездну."]),
        section("disciplines", "Профессии", ["Производство: оружие, броня, аксессуары, алхимия, кулинария. Сбор: горное дело, травничество, утилизация."]),
        section("market", "Экономика", ["Аукцион для материалов и готовых товаров. Сборщики прибыльны при запуске."]),
        section("global", "Глобальным игрокам", ["Ожидается с запуском 30 сентября. Выберите профессию сбора на раннем этапе."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "製作指南", title: "Aion 2 製作指南：專業、採集與材料經濟", description: "Aion 2 的製作系統涵蓋採集、生產與材料經濟。製作如何運作、可製作什麼以及如何獲利。", intro: "Aion 2 的製作是平行養成軌道，提供裝備、消耗品與升級材料。涵蓋採集與生產專業，系統支援自給自足與市場利潤。", sourceNote: "基於韓服製作結構、AION2Hub 概覽與官方 NCSoft 系統文件。", keywords: ["Aion 2 製作", "Aion 2 採集", "Aion 2 專業", "Aion 2 材料經濟", "Aion 2 製作指南"],
      sections: [
        section("overview", "製作如何運作", ["製作分為採集專業（從世界收集原材料）與生產專業（將原材料精煉為可用物品）。角色可學習多個專業。", "材料按物品等級與來源分級。低級材料來自開放世界採集與怪物掉落，高級材料需要遠征掉落、試煉貨幣與深淵獎勵。"]),
        section("disciplines", "製作專業", ["生產專業包括武器製作、防具製作、飾品製作、煉金術（藥水與消耗品）與烹飪（食物增益）。採集專業涵蓋採礦、草藥學與回收。"]),
        section("market", "材料經濟", ["拍賣行是製作與經濟交匯之處。玩家買賣原材料、中間組件與成品。上線初期市場獎勵採集者。"]),
        section("global", "全球玩家的預期", ["製作預計隨 9 月 30 日搶先體驗上線。建議儘早選擇至少一個採集專業。"]),
      ],
    }),
  },
};