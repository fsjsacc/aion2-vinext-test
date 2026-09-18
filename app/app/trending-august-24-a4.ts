import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-24-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "aion2hub-housing-2026-08-24", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Housing System Overview", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 房屋系统概述", en: "AION 2 Housing System Overview", fr: "Aperçu du système de logement", de: "AION 2 Wohnsystem-Übersicht", es: "Resumen del sistema de vivienda", ja: "AION 2 ハウジングシステム概要", "pt-br": "Visão geral do sistema de habitação", ru: "Обзор системы жилья AION 2", ko: "AION 2 하우징 시스템 개요", "zh-hant": "AION 2 房屋系統概述", }, "https://aion2hub.com/"), };
const source2: ContentSource = { id: "plaync-housing-2026-08-24", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — Housing Feature", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 房屋功能", en: "AION 2 (KR) — Housing Feature", fr: "AION 2 (KR) — Fonctionnalité de logement", de: "AION 2 (KR) — Wohnfunktion", es: "AION 2 (KR) — Función de vivienda", ja: "AION 2 (KR) — ハウジング機能", "pt-br": "AION 2 (KR) — Recurso de habitação", ru: "AION 2 (KR) — Функция жилья", ko: "AION 2 (KR) — 하우징 기능", "zh-hant": "AION 2 房屋功能", }, "https://aion2.plaync.com/"), };
const source3: ContentSource = { id: "mmobomb-housing-2026-08-24", kind: "third-party", publisher: "MMOBomb", label: "NC Dev Stream Recap — Housing Details", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "NC 开发者直播——房屋系统详情", en: "NC Dev Stream Recap — Housing Details", fr: "Récapitulatif du stream dev NC — Logement", de: "NC Dev-Stream-Zusammenfassung — Wohnen", es: "Resumen del stream de dev de NC — Vivienda", ja: "NC 開発者ストリーム要約 — ハウジング詳細", "pt-br": "Resumo do stream dev NC — Habitação", ru: "Обзор стрима разработчиков NC — Жилье", ko: "NC 개발자 스트림 요약 — 하우징 세부 정보", "zh-hant": "NC 開發者直播——房屋系統詳情", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "房屋系统指南配图", caption: "NC 官方配图；Aion 2 的房屋系统提供丰富的自定义选项。" }, en: { alt: "Housing system guide image", caption: "Official NC artwork; Aion 2's housing system offers deep customization." }, fr: { alt: "Image du guide du logement", caption: "Visuel officiel NC ; le logement offre une personnalisation poussée." }, de: { alt: "Wohnsystem-Guide-Bild", caption: "Offizielles NC-Artwork; das Wohnsystem bietet tiefe Anpassung." }, es: { alt: "Imagen de la guía de vivienda", caption: "Arte oficial de NC; la vivienda ofrece personalización profunda." }, ja: { alt: "ハウジングシステムガイド画像", caption: "NC公式アートワーク；ハウジングは豊富なカスタマイズを提供。" }, "pt-br": { alt: "Imagem do guia de habitação", caption: "Arte oficial da NC; habitação oferece personalização profunda." }, ru: { alt: "Изображение гайда по жилью", caption: "Официальный арт NC; система жилья предлагает глубокую кастомизацию." }, ko: { alt: "하우징 시스템 가이드 이미지", caption: "NC 공식 이미지입니다. 하우징 시스템은 다양한 커스터마이징을 제공합니다." }, "zh-hant": { alt: "房屋系統指南配圖", caption: "NC 官方配圖；Aion 2 的房屋系統提供豐富的自定義選項。" }, }, };

export const trendingAugust24Article4: ContentEntry = {
  section: "guides", slug: "aion-2-housing-guide", schemaType: "Article",
  publishedAt: "2026-08-24", updatedAt: "2026-08-24", readingMinutes: 5,
  publication: publishedVerified,
  sources: [source1, source2, source3],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-guild-social-guide" },
    { kind: "content", section: "guides", slug: "aion-2-character-customization-guide" },
    { kind: "content", section: "guides", slug: "aion-2-crafting-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "HOUSING GUIDE", title: "Aion 2 Housing Guide: Player Housing & Customization", description: "Discover Aion 2's player housing system. Learn about home customization, furniture, housing benefits, and community neighborhood features.", intro: "Aion 2 brings back the beloved housing system from the original Aion, completely rebuilt for Unreal Engine 5. Player housing is more than just a cosmetic feature — it offers tangible gameplay benefits, from crafting stations to rested XP and teleportation points.", sourceNote: "Based on AION2Hub's housing overview, official NCSoft housing information, and MMOBomb's dev stream recap. Housing features confirmed from KR live server and official materials.", keywords: ["Aion 2 housing", "Aion 2 player housing", "Aion 2 home customization", "Aion 2 furniture", "Aion 2 housing guide"],
      sections: [
        section("housing-basics", "Housing System Overview", ["Player housing in Aion 2 is available to all players starting from level 20. Houses are instanced private zones within the housing districts of major cities. Each house has an interior space and, depending on the house tier, an exterior garden area.", "Houses come in multiple tiers: Studio, Cottage, Villa, and Estate. Higher tiers offer more rooms, larger gardens, and additional utility slots. House tiers can be upgraded over time using in-game currency earned through normal gameplay.", "Housing districts are shared community spaces where players can see their neighbors' houses, visit open houses, and participate in neighborhood events. The housing system is designed to foster community interaction."]),
        section("home-customization", "Home Customization & Furniture", ["Customization is the heart of Aion 2's housing system. Players can place furniture items throughout their home, including chairs, tables, beds, lighting fixtures, wall decorations, and outdoor items. The placement system is free-form, allowing precise positioning and rotation.", "Furniture can be crafted by players with the appropriate crafting professions, purchased from NPC vendors, or obtained as rewards from expeditions and events. Some rare furniture items are tradable on the auction house.", "The housing UI includes a preview mode that lets you see how furniture looks before purchasing, and a snapshot mode for taking screenshots of your decorated home. You can also save and load decoration presets."]),
        section("housing-benefits", "Housing Benefits & Features", ["Housing offers significant gameplay benefits. Each house comes with a personal storage chest that provides additional inventory space. Higher-tier houses have larger storage capacity and can accommodate crafting stations.", "Rested XP is a key housing benefit — while logged out in your house, you accumulate rested XP that boosts your experience gain when you return to adventuring. The rate of rested XP accumulation scales with house tier.", "Utility features include: a personal teleportation point (set your house as a recall location), a mailbox for receiving auction house purchases and mailed items, and a garden for growing crafting materials."]),
        section("community-housing", "Community & Neighborhood Features", ["Housing districts are organized into neighborhoods, each with a shared community board. The community board displays neighborhood events, visitor messages, and weekly contests for the best-decorated home.", "Players can visit any open house in their neighborhood. The visiting system allows you to tour homes, use basic facilities (with owner permission), and leave guestbook messages. Popular homes can earn recognition rewards.", "Guild housing is a separate feature — guilds can purchase a guild hall that serves as a meeting space with shared storage, guild crafting stations, and a guild notice board. Guild halls are larger than personal houses and support more utility features."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "房屋指南", title: "Aion 2 房屋指南：玩家住房与自定义", description: "探索 Aion 2 的玩家房屋系统。了解房屋自定义、家具、房屋收益与社区邻里功能。", intro: "Aion 2 带回原版游戏中备受喜爱的房屋系统，在虚幻引擎 5 上完全重建。", sourceNote: "基于 AION2Hub 房屋概述、NCSoft 官方房屋信息与 MMOBomb 开发者直播总结。", keywords: ["Aion 2 房屋", "Aion 2 玩家住房", "Aion 2 房屋自定义", "Aion 2 家具"],
      sections: [
        section("housing-basics", "房屋系统概述", ["20 级起所有玩家均可使用。房屋有多个等级：工作室、小屋、别墅和庄园。", "高级房屋提供更多房间、更大的花园和额外的实用功能槽位。"]),
        section("home-customization", "房屋自定义与家具", ["玩家可以在家中放置家具物品。放置系统是自由形式的，允许精确定位和旋转。", "家具可以通过制作、NPC 购买或从远征和活动中获得。"]),
        section("housing-benefits", "房屋收益", ["个人储物箱提供额外背包空间。离线休息经验加成。", "个人传送点、邮箱、用于种植材料的菜园。"]),
        section("community-housing", "社区与邻里功能", ["住宅区组织为社区，配有共享社区公告板。", "公会大厅是独立功能，提供公会储物和公会制作站。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "하우징 가이드", title: "Aion 2 하우징 가이드: 플레이어 주택 및 커스터마이징", description: "Aion 2의 하우징 시스템을 알아보세요. 가구, 혜택, 커뮤니티 기능.", intro: "Aion 2가 원작의 인기 하우징 시스템을 Unreal Engine 5로 재구축했습니다.", sourceNote: "AION2Hub, NCSoft, MMOBomb 개발자 스트림에 기반합니다.", keywords: ["Aion 2 하우징", "Aion 2 주택", "Aion 2 가구"],
      sections: [
        section("housing-basics", "하우징 개요", ["레벨 20부터 이용 가능. 스튜디오/코티지/빌라/에스테이트 등급."]),
        section("home-customization", "커스터마이징", ["자유 배치 가구 시스템. 제작, 구매, 보상으로 획득."]),
        section("housing-benefits", "혜택", ["개인 보관함. 휴식 XP. 귀환 지점. 우편함. 정원."]),
        section("community-housing", "커뮤니티", ["이웃 방문. 길드 홀 별도 기능."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "ハウジングガイド", title: "Aion 2 ハウジングガイド", description: "Aion 2のハウジングシステムを紹介。家具、特典、コミュニティ機能。", intro: "Aion 2がUnreal Engine 5でハウジングシステムを再構築。", sourceNote: "AION2Hub、NCSoft、MMOBombに基づきます。", keywords: ["Aion 2 ハウジング", "Aion 2 住宅", "Aion 2 家具"],
      sections: [
        section("housing-basics", "概要", ["レベル20から利用可能。スタジオ/コテージ/ヴィラ/エステート。"]),
        section("home-customization", "カスタマイズ", ["自由配置家具。製作、購入、報酬で入手。"]),
        section("housing-benefits", "特典", ["個人収納。休憩XP。帰還ポイント。郵便受け。"]),
        section("community-housing", "コミュニティ", ["近隣訪問。ギルドホールは別機能。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE DU LOGEMENT", title: "Guide du logement des joueurs d'Aion 2", description: "Découvrez le système de logement. Personnalisation, meubles, avantages.", intro: "Aion 2 reconstruit le système de logement sur Unreal Engine 5.", sourceNote: "Basé sur AION2Hub, NCSoft et MMOBomb.", keywords: ["Aion 2 logement", "Aion 2 maison", "Aion 2 meubles"],
      sections: [
        section("housing-basics", "Aperçu", ["Disponible niveau 20+. Studio, Cottage, Villa, Domaine."]),
        section("home-customization", "Personnalisation", ["Meubles à placement libre. Artisanat, achat, récompenses."]),
        section("housing-benefits", "Avantages", ["Stockage personnel. XP de repos. Point de rappel."]),
        section("community-housing", "Communauté", ["Visite de voisins. Salle de guilde séparée."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "WOHN-GUIDE", title: "Aion 2 Wohn-Guide: Spielerunterkünfte", description: "Entdecken Sie das Wohnsystem. Möbel, Vorteile, Gemeinschaft.", intro: "Aion 2 baut das beliebte Wohnsystem auf Unreal Engine 5 neu.", sourceNote: "Basierend auf AION2Hub, NCSoft und MMOBomb.", keywords: ["Aion 2 Wohnen", "Aion 2 Haus", "Aion 2 Möbel"],
      sections: [
        section("housing-basics", "Übersicht", ["Ab Stufe 20. Studio, Cottage, Villa, Anwesen."]),
        section("home-customization", "Anpassung", ["Freie Möbelplatzierung. Herstellung, Kauf, Belohnungen."]),
        section("housing-benefits", "Vorteile", ["Lagerung. Ruhe-XP. Rückrufpunkt. Postfach."]),
        section("community-housing", "Gemeinschaft", ["Nachbarschaftsbesuche. Gildenhabe separat."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DE VIVIENDA", title: "Guía de vivienda de jugadores de Aion 2", description: "Descubre el sistema de vivienda. Muebles, beneficios, comunidad.", intro: "Aion 2 reconstruye el sistema de vivienda en Unreal Engine 5.", sourceNote: "Basado en AION2Hub, NCSoft y MMOBomb.", keywords: ["Aion 2 vivienda", "Aion 2 casa", "Aion 2 muebles"],
      sections: [
        section("housing-basics", "Resumen", ["Disponible nivel 20+. Estudio, Cabaña, Villa, Hacienda."]),
        section("home-customization", "Personalización", ["Muebles de colocación libre. Fabricación, compra, recompensas."]),
        section("housing-benefits", "Beneficios", ["Almacenamiento. XP de descanso. Punto de retorno."]),
        section("community-housing", "Comunidad", ["Visitas vecinales. Sala de clan separada."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DE HABITAÇÃO", title: "Guia de habitação de jogadores de Aion 2", description: "Descubra o sistema de habitação. Móveis, benefícios, comunidade.", intro: "Aion 2 reconstrói o sistema de habitação no Unreal Engine 5.", sourceNote: "Baseado no AION2Hub, NCSoft e MMOBomb.", keywords: ["Aion 2 habitação", "Aion 2 casa", "Aion 2 móveis"],
      sections: [
        section("housing-basics", "Visão geral", ["Disponível nível 20+. Estúdio, Chalé, Vila, Solar."]),
        section("home-customization", "Personalização", ["Móveis de colocação livre. Fabricação, compra, recompensas."]),
        section("housing-benefits", "Benefícios", ["Armazenamento. XP de descanso. Ponto de retorno."]),
        section("community-housing", "Comunidade", ["Visitas vizinhas. Salão de guildas separado."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "РУКОВОДСТВО ПО ЖИЛЬЮ", title: "Руководство по жилью игроков Aion 2", description: "Откройте систему жилья. Мебель, преимущества, сообщество.", intro: "Aion 2 перестраивает систему жилья на Unreal Engine 5.", sourceNote: "Основано на AION2Hub, NCSoft и MMOBomb.", keywords: ["Aion 2 жилье", "Aion 2 дом", "Aion 2 мебель"],
      sections: [
        section("housing-basics", "Обзор", ["Доступно с 20 уровня. Студия, Коттедж, Вилла, Поместье."]),
        section("home-customization", "Кастомизация", ["Свободная расстановка мебели. Крафт, покупка, награды."]),
        section("housing-benefits", "Преимущества", ["Хранение. XP отдыха. Точка возврата. Почта."]),
        section("community-housing", "Сообщество", ["Посещение соседей. Зал гильдии отдельно."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "房屋指南", title: "Aion 2 房屋指南：玩家住房與自定義", description: "探索 Aion 2 的玩家房屋系統。傢俱、收益、社區功能。", intro: "Aion 2 在虛幻引擎 5 上重建了備受喜愛的房屋系統。", sourceNote: "基於 AION2Hub 房屋概述、NCSoft 官方房屋資訊與 MMOBomb 開發者直播總結。", keywords: ["Aion 2 房屋", "Aion 2 玩家住房", "Aion 2 傢俱"],
      sections: [
        section("housing-basics", "房屋系統概述", ["20 級起可用。工作室/小屋/別墅/莊園等級。"]),
        section("home-customization", "房屋自定義", ["自由放置傢俱。製作、購買、獎勵獲取。"]),
        section("housing-benefits", "房屋收益", ["個人儲物。休息 XP。返回點。郵箱。花園。"]),
        section("community-housing", "社區功能", ["鄰居拜訪。公會大廳獨立功能。"]),
      ],
    }),
  },
};