import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-26-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "plaync-crafting-2026-08-26", kind: "official", publisher: "NCSOFT", label: "AION 2 Official Crafting Guide", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "AION 2 官方制作指南", en: "AION 2 Official Crafting Guide", fr: "Guide officiel de l'artisanat d'AION 2", de: "AION 2 Offizieller Handwerks-Guide", es: "Guía oficial de artesanía de AION 2", ja: "AION 2 公式クラフトガイド", "pt-br": "Guia oficial de artesanato do AION 2", ru: "Официальное руководство по крафту AION 2", ko: "AION 2 공식 제작 가이드", "zh-hant": "AION 2 官方製作指南", }, "https://aion2.plaync.com/"), };
const source2: ContentSource = { id: "aion2hub-crafting-2026-08-26", kind: "third-party", publisher: "AION2Hub", label: "Aion 2 Crafting & Gathering Guide", url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "Aion 2 制作与采集指南", en: "Aion 2 Crafting & Gathering Guide", fr: "Guide d'artisanat et de cueillette d'Aion 2", de: "Aion 2 Handwerks- und Sammel-Guide", es: "Guía de artesanía y recolección de Aion 2", ja: "Aion 2 クラフト＆採集ガイド", "pt-br": "Guia de artesanato e coleta de Aion 2", ru: "Руководство по крафту и сбору Aion 2", ko: "Aion 2 제작 및 채집 가이드", "zh-hant": "Aion 2 製作與採集指南", }, "https://aion2hub.com/"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "制作与专业指南配图", caption: "NC 官方配图；AION 2 制作系统。" }, en: { alt: "Crafting and professions guide image", caption: "Official NC artwork; AION 2 crafting system." }, fr: { alt: "Image du guide d'artisanat", caption: "Visuel officiel NC ; système d'artisanat d'AION 2." }, de: { alt: "Handwerks- und Berufe-Guide-Bild", caption: "Offizielles NC-Artwork; AION 2 Handwerkssystem." }, es: { alt: "Imagen de la guía de artesanía y profesiones", caption: "Arte oficial de NC; sistema de artesanía de AION 2." }, ja: { alt: "クラフトと職業ガイド画像", caption: "NC公式アートワーク；AION 2 クラフトシステム。" }, "pt-br": { alt: "Imagem do guia de artesanato e profissões", caption: "Arte oficial da NC; sistema de artesanato do AION 2." }, ru: { alt: "Изображение гайда по крафту и профессиям", caption: "Официальный арт NC; система крафта AION 2." }, ko: { alt: "제작 및 전문 기술 가이드 이미지", caption: "NC 공식 이미지; AION 2 제작 시스템." }, "zh-hant": { alt: "製作與專業指南配圖", caption: "NC 官方配圖；AION 2 製作系統。" }, }, };

export const trendingAugust26Article3: ContentEntry = {
  section: "guides", slug: "aion-2-crafting-professions-guide", schemaType: "Article",
  publishedAt: "2026-08-26", updatedAt: "2026-08-26", readingMinutes: 6,
  publication: publishedVerified,
  sources: [source1, source2],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-gathering-resource-guide" },
    { kind: "content", section: "guides", slug: "aion-2-endgame-gear-guide" },
    { kind: "content", section: "guides", slug: "aion-2-solo-player-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "CRAFTING & PROFESSIONS", title: "AION 2 Crafting & Professions Guide: Complete System Overview", description: "Master AION 2's crafting and professions system. Learn about gathering, crafting, enchanting, and how to build a profitable crafting career.", intro: "AION 2's crafting and professions system is a deep and rewarding progression path that complements combat content. Whether you want to craft your own gear, supply the auction house, or pursue gathering as a relaxing activity, this guide covers everything you need to know about the professions system.", sourceNote: "Based on the official NCSoft crafting guide and AION2Hub's crafting & gathering guide.", keywords: ["Aion 2 crafting", "Aion 2 professions", "Aion 2 gathering", "Aion 2 crafting guide", "Aion 2 professions guide"],
      sections: [
        section("gathering-professions", "Gathering Professions", ["AION 2 features three primary gathering professions: Mining, Herbalism, and Skinning. Mining allows you to extract ores and gems from mineral deposits found throughout the world. Herbalism lets you gather herbs and plants for alchemy and cooking. Skinning provides leather and hides from defeated beasts.", "Each gathering profession has its own skill progression from 1 to 300. Higher skill levels unlock access to richer nodes in higher-level zones. Gathering nodes respawn on timers, and rare nodes with valuable materials appear randomly throughout the world.", "You can learn all three gathering professions on a single character, but each gathering action consumes stamina. Stamina regenerates over time or can be restored with food items. Efficient gathering route planning is essential for maximizing your yield."]),
        section("crafting-professions", "Crafting Professions", ["There are four crafting professions: Weaponsmithing, Armorsmithing, Alchemy, and Cooking. Each profession can craft items that are competitive with dungeon drops, provided you invest the time to level your skill and gather the required materials.", "Weaponsmithing produces weapons for all classes, including unique crafted weapons with customizable stat distributions. Armorsmithing creates armor pieces with socket slots for additional stat gems. Alchemy produces potions, elixirs, and enhancement scrolls. Cooking creates food buffs that provide long-duration stat increases.", "You can specialize in one crafting profession per character. Specialization unlocks advanced recipes that produce items with superior stats. Crafting stations are located in major cities and require specific tools that can be purchased from crafting vendors."]),
        section("profession-leveling", "Profession Leveling Guide", ["Leveling a profession from 1 to 300 requires a combination of gathering materials, completing profession quests, and crafting items. The most efficient leveling path is to focus on items that use materials you can gather yourself, supplemented by auction house purchases for bottleneck materials.", "Profession quests become available every 50 skill levels. These quests reward skill points, recipes, and tools. Complete them as soon as they become available to unlock the next tier of recipes and gathering nodes.", "The crafting calculator on AION2 KINA helps you plan your material requirements. Enter your current skill level and target level, and the calculator shows exactly how many of each item you need to craft, including the raw materials required."]),
        section("economy-tips", "Crafting Economy & Auction House", ["The auction house is the central marketplace for crafted goods. Understanding supply and demand is key to a profitable crafting career. High-demand items include consumables (potions, food, scrolls) and enhancement materials, which are always needed by endgame players.", "Crafting materials from lower-level zones remain valuable because higher-level recipes often require them as base components. Stockpiling materials when prices are low and selling crafted goods when prices are high is a reliable profit strategy.", "The weekly reset on dungeons and raids creates predictable price fluctuations. Prices for consumables typically rise on reset day and fall toward the end of the week. Plan your crafting schedule around these cycles for maximum profit."]),
        section("specialization", "Specialization & Mastery", ["At skill level 200, you can choose a specialization within your crafting profession. Specializations offer unique recipes that cannot be learned by non-specialized crafters. These recipes produce items with superior stats or unique effects.", "Mastery is the highest tier of crafting, unlocked at skill level 300. Master crafters can produce legendary-quality items that are comparable to raid drops. Mastery recipes require rare materials from multiple sources, including world bosses, expeditions, and high-level gathering nodes.", "Becoming a master crafter is a long-term goal that requires significant material investment. However, master-crafted items are always in demand and can provide a steady income stream. The title of 'Master Crafter' is also a prestigious achievement visible to other players."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "制作与专业", title: "AION 2 制作与专业指南：完整系统概述", description: "掌握 AION 2 的制作和专业系统。了解采集、制作、附魔以及如何建立有利可图的制作事业。", intro: "AION 2 的制作和专业系统是一个深度且有益的成长路径。", sourceNote: "基于 NCSoft 官方制作指南和 AION2Hub 的制作与采集指南。", keywords: ["Aion 2 制作", "Aion 2 专业", "Aion 2 采集"],
      sections: [
        section("gathering-professions", "采集专业", ["三种主要采集专业：采矿、采药和剥皮。每个专业有 1-300 的技能等级。", "一个角色可以学习所有三种采集专业，但采集消耗体力。"]),
        section("crafting-professions", "制作专业", ["四种制作专业：武器制作、护甲制作、炼金术和烹饪。每个角色可专精一种。", "制作产物可与地下城掉落相媲美。"]),
        section("profession-leveling", "专业升级指南", ["从 1 级升到 300 级需要采集材料、完成任务和制作物品。", "每 50 技能等级可获得专业任务。"]),
        section("economy-tips", "制作经济与拍卖行", ["拍卖行是制作物品的中心市场。了解供需关系是盈利的关键。", "消耗品（药水、食物、卷轴）始终有需求。"]),
        section("specialization", "专精与精通", ["200 级可选择专精，获得独特配方。300 级解锁精通，可制作传奇品质物品。", "大师级制作是需要长期投入的目标。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "제작 및 전문 기술", title: "AION 2 제작 및 전문 기술 가이드", description: "AION 2의 제작 및 전문 기술 시스템을 마스터하세요.", intro: "AION 2의 제작 시스템은 깊이 있고 보람 있는 성장 경로입니다.", sourceNote: "NCSoft 공식 가이드 및 AION2Hub 기반.", keywords: ["Aion 2 제작", "Aion 2 전문 기술", "Aion 2 채집"],
      sections: [
        section("gathering-professions", "채집 전문 기술", ["광업, 약초학, 무두질. 스킬 레벨 1-300. 세 가지 모두 배울 수 있음."]),
        section("crafting-professions", "제작 전문 기술", ["무기 제작, 방어구 제작, 연금술, 요리. 캐릭터당 하나 전문화."]),
        section("profession-leveling", "전문 기술 레벨업", ["재료 수집, 퀘스트 완료, 아이템 제작으로 레벨업."]),
        section("economy-tips", "제작 경제", ["경매장 활용. 소모품은 항상 수요가 있음."]),
        section("specialization", "전문화", ["레벨 200에서 전문화 선택. 레벨 300에서 마스터."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "クラフト＆職業", title: "AION 2 クラフト＆職業ガイド", description: "AION 2のクラフトと職業システムをマスター。", intro: "AION 2のクラフトシステムは奥深くやりがいのある成長経路です。", sourceNote: "NCSoft公式ガイド及びAION2Hubに基づきます。", keywords: ["Aion 2 クラフト", "Aion 2 職業", "Aion 2 採集"],
      sections: [
        section("gathering-professions", "採集職業", ["採掘、薬草学、皮剥ぎ。スキルレベル1-300。全習得可能。"]),
        section("crafting-professions", "クラフト職業", ["武器製作、防具製作、錬金術、料理。キャラクター毎に一つ専門化。"]),
        section("profession-leveling", "職業レベル上げ", ["素材収集、クエスト、アイテム製作でレベルアップ。"]),
        section("economy-tips", "クラフト経済", ["オークションハウス活用。消耗品は常に需要あり。"]),
        section("specialization", "専門化", ["レベル200で専門化選択。レベル300でマスター。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "ARTISANAT & PROFESSIONS", title: "Guide de l'artisanat et des professions d'AION 2", description: "Maîtrisez le système d'artisanat et de professions d'AION 2.", intro: "Le système d'artisanat d'AION 2 est une voie de progression profonde.", sourceNote: "Basé sur le guide officiel NCSoft et AION2Hub.", keywords: ["Aion 2 artisanat", "Aion 2 professions"],
      sections: [
        section("gathering-professions", "Professions de cueillette", ["Mine, Herboristerie, Dépeçage. Niveau 1-300. Trois possibles."]),
        section("crafting-professions", "Professions d'artisanat", ["Forge d'armes, Forge d'armures, Alchimie, Cuisine. Une spécialisation."]),
        section("profession-leveling", "Montée de niveau", ["Matériaux, quêtes, fabrication pour monter."]),
        section("economy-tips", "Économie", ["Hôtel des ventes. Consommables toujours demandés."]),
        section("specialization", "Spécialisation", ["Niveau 200 spécialisation. Niveau 300 maîtrise."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "HANDWERK & BERUFE", title: "AION 2 Handwerks- und Berufe-Guide", description: "Meistern Sie das Handwerks- und Berufesystem von AION 2.", intro: "Das Handwerkssystem von AION 2 ist ein lohnender Fortschrittspfad.", sourceNote: "Basierend auf dem offiziellen NCSoft-Guide und AION2Hub.", keywords: ["Aion 2 Handwerk", "Aion 2 Berufe"],
      sections: [
        section("gathering-professions", "Sammelberufe", ["Bergbau, Kräuterkunde, Enthäuten. Stufe 1-300. Alle drei möglich."]),
        section("crafting-professions", "Handwerksberufe", ["Waffenschmied, Rüstungsschmied, Alchemie, Koch. Eine Spezialisierung."]),
        section("profession-leveling", "Beruf aufleveln", ["Materialien, Quests, Herstellung zum Aufsteigen."]),
        section("economy-tips", "Wirtschaft", ["Auktionshaus. Verbrauchsgüter immer gefragt."]),
        section("specialization", "Spezialisierung", ["Stufe 200 Spezialisierung. Stufe 300 Meisterschaft."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "ARTESANÍA Y PROFESIONES", title: "Guía de artesanía y profesiones de AION 2", description: "Domine el sistema de artesanía y profesiones de AION 2.", intro: "El sistema de artesanía de AION 2 es un camino de progresión profundo.", sourceNote: "Basado en la guía oficial de NCSoft y AION2Hub.", keywords: ["Aion 2 artesanía", "Aion 2 profesiones"],
      sections: [
        section("gathering-professions", "Profesiones de recolección", ["Minería, Herboristería, Desuello. Nivel 1-300. Las tres posibles."]),
        section("crafting-professions", "Profesiones de artesanía", ["Armero, Herrero, Alquimia, Cocina. Una especialización."]),
        section("profession-leveling", "Subir profesión", ["Materiales, misiones, fabricación para subir."]),
        section("economy-tips", "Economía", ["Casa de subastas. Consumibles siempre demandados."]),
        section("specialization", "Especialización", ["Nivel 200 especialización. Nivel 300 maestría."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "ARTESANATO E PROFISSÕES", title: "Guia de artesanato e profissões do AION 2", description: "Domine o sistema de artesanato e profissões do AION 2.", intro: "O sistema de artesanato do AION 2 é um caminho de progressão profundo.", sourceNote: "Baseado no guia oficial NCSoft e AION2Hub.", keywords: ["Aion 2 artesanato", "Aion 2 profissões"],
      sections: [
        section("gathering-professions", "Profissões de coleta", ["Mineração, Herborismo, Esfolamento. Nível 1-300. Três possíveis."]),
        section("crafting-professions", "Profissões de artesanato", ["Ferraria de armas, Ferraria de armaduras, Alquimia, Culinária. Uma especialização."]),
        section("profession-leveling", "Evoluir profissão", ["Materiais, missões, fabricação para evoluir."]),
        section("economy-tips", "Economia", ["Leilão. Consumíveis sempre em demanda."]),
        section("specialization", "Especialização", ["Nível 200 especialização. Nível 300 maestria."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "КРАФТ И ПРОФЕССИИ", title: "Гайд по крафту и профессиям AION 2", description: "Освойте систему крафта и профессий AION 2.", intro: "Система крафта AION 2 — глубокий и полезный путь прогрессии.", sourceNote: "Основано на официальном гайде NCSoft и AION2Hub.", keywords: ["Aion 2 крафт", "Aion 2 профессии"],
      sections: [
        section("gathering-professions", "Собирательные профессии", ["Горное дело, Травничество, Снятие шкур. Уровень 1-300. Все три возможны."]),
        section("crafting-professions", "Крафтовые профессии", ["Оружейник, Бронник, Алхимия, Кулинария. Одна специализация."]),
        section("profession-leveling", "Прокачка профессии", ["Материалы, квесты, изготовление для прокачки."]),
        section("economy-tips", "Экономика", ["Аукцион. Расходники всегда в спросе."]),
        section("specialization", "Специализация", ["Уровень 200 специализация. Уровень 300 мастерство."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "製作與專業", title: "AION 2 製作與專業指南", description: "掌握 AION 2 的製作和專業系統。", intro: "AION 2 的製作系統是一個深度且有益的成長路徑。", sourceNote: "基於 NCSoft 官方製作指南和 AION2Hub。", keywords: ["Aion 2 製作", "Aion 2 專業", "Aion 2 採集"],
      sections: [
        section("gathering-professions", "採集專業", ["採礦、採藥、剝皮。技能等級 1-300。可學習全部三種。"]),
        section("crafting-professions", "製作專業", ["武器製作、護甲製作、煉金術、烹飪。每個角色專精一種。"]),
        section("profession-leveling", "專業升級", ["收集材料、完成任務、製作物品來升級。"]),
        section("economy-tips", "製作經濟", ["拍賣行。消耗品始終有需求。"]),
        section("specialization", "專精與精通", ["200 級可選擇專精。300 級解鎖精通。"]),
      ],
    }),
  },
};