import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-24-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "aion2hub-questing-2026-08-24", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Leveling Guide — Quests and XP", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 升级指南", en: "AION 2 Leveling Guide — Quests and XP", fr: "Guide de niveau AION 2", de: "AION 2 Level-Guide", es: "Guía de nivel de AION 2", ja: "AION 2 レベル上げガイド", "pt-br": "Guia de nível de AION 2", ru: "Руководство по прокачке AION 2", ko: "AION 2 레벨링 가이드", "zh-hant": "AION 2 升級指南", }, "https://aion2hub.com/"), };
const source2: ContentSource = { id: "mmobomb-questing-2026-08-24", kind: "third-party", publisher: "MMOBomb", label: "NC Shares What Aion 2 Players Can Expect At Launch", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "NC 分享 Aion 2 玩家在发布时可期待的内容", en: "NC Shares What Aion 2 Players Can Expect At Launch", fr: "NC partage ce que les joueurs peuvent attendre", de: "NC teilt mit, was Spieler erwarten können", es: "NC comparte lo que los jugadores pueden esperar", ja: "NCが発売時に期待できることを共有", "pt-br": "NC compartilha o que os jogadores podem esperar", ru: "NC делится, что игроки могут ожидать", ko: "NC, 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 分享 Aion 2 玩家在發布時可期待的內容", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const source3: ContentSource = { id: "plaync-questing-2026-08-24", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — Story Overview", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 故事概览", en: "AION 2 (KR) — Story Overview", fr: "AION 2 (KR) — Aperçu de l'histoire", de: "AION 2 (KR) — Geschichtsüberblick", es: "AION 2 (KR) — Resumen de la historia", ja: "AION 2 (KR) — ストーリー概要", "pt-br": "AION 2 (KR) — Visão geral da história", ru: "AION 2 (KR) — Обзор сюжета", ko: "AION 2 (KR) — 스토리 개요", "zh-hant": "AION 2 故事概覽", }, "https://aion2.plaync.com/"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "任务升级指南配图", caption: "NC 官方配图；高效完成任务是 Aion 2 升级的关键。" }, en: { alt: "Questing and leveling guide image", caption: "Official NC artwork; efficient questing is key to leveling in Aion 2." }, fr: { alt: "Image du guide de quêtes", caption: "Visuel officiel NC ; les quêtes sont essentielles pour monter de niveau." }, de: { alt: "Quest- und Level-Guide-Bild", caption: "Offizielles NC-Artwork; Questen ist der Schlüssel zum Leveln." }, es: { alt: "Imagen de la guía de misiones", caption: "Arte oficial de NC; las misiones son clave para subir de nivel." }, ja: { alt: "クエスト＆レベル上げガイド画像", caption: "NC公式アートワーク；効率的なクエストがレベル上げの鍵。" }, "pt-br": { alt: "Imagem do guia de missões", caption: "Arte oficial da NC; missões são a chave para subir de nível." }, ru: { alt: "Изображение гайда по квестам", caption: "Официальный арт NC; квесты — ключ к прокачке." }, ko: { alt: "퀘스트 및 레벨업 가이드 이미지", caption: "NC 공식 이미지입니다. 효율적인 퀘스트가 레벨업의 핵심입니다." }, "zh-hant": { alt: "任務升級指南配圖", caption: "NC 官方配圖；高效完成任務是 Aion 2 升級的關鍵。" }, }, };

export const trendingAugust24Article2: ContentEntry = {
  section: "guides", slug: "aion-2-questing-leveling-guide", schemaType: "Article",
  publishedAt: "2026-08-24", updatedAt: "2026-08-24", readingMinutes: 6,
  publication: publishedVerified,
  sources: [source1, source2, source3],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-leveling-guide-1-50" },
    { kind: "content", section: "guides", slug: "aion-2-endgame-path-guide" },
    { kind: "content", section: "guides", slug: "aion-2-client-pre-download-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "QUESTING & LEVELING", title: "Aion 2 Questing & Leveling Guide: Efficient Routes 1-50", description: "Level efficiently in Aion 2. Complete guide to quest types, questing routes 1-50, solo vs party leveling, and world exploration for bonus XP.", intro: "Leveling from 1 to 50 in Aion 2 is a journey through faction-specific zones, shared territories, and instanced content. While the main story quest provides a solid foundation of XP, understanding the most efficient routes and supplementary activities can significantly reduce your time to max level.", sourceNote: "Based on AION2Hub's leveling overview, MMOBomb's dev stream recap, and official NCSoft story information. Leveling routes confirmed from KR live server data.", keywords: ["Aion 2 questing guide", "Aion 2 leveling route", "Aion 2 1-50 guide", "Aion 2 solo leveling", "Aion 2 party leveling"],
      sections: [
        section("quest-types", "Quest Types: Main Story, Side Quests & Repeatables", ["Aion 2 features several quest types. The main story quest (MSQ) is the primary XP source, taking you through the narrative of Chapter 1. Side quests offer additional XP, gold, and gear. Repeatable quests become available after completing certain milestones and are excellent for filling XP gaps.", "World quests are dynamic events that appear in specific zones, offering bonus XP for completing objectives within a time limit. Campaign quests are faction-specific story arcs that unlock new zones, flight abilities, and expedition access.", "Prioritize the main story quest above all else — it unlocks everything from new zones to expeditions. Only deviate for side quests that offer significant gear upgrades or are on your path between MSQ objectives."]),
        section("leveling-routes", "Efficient Leveling Routes 1-50", ["Levels 1-10: Complete the starting zone tutorial quests. Both factions have streamlined starting experiences that guide you through basic mechanics. This takes approximately 30-45 minutes.", "Levels 10-30: Focus on the main story quest in faction-specific zones. Elyos follow the Poeta → Verteron → Eltnen route. Asmodians follow Ishalgen → Altgard → Morheim. Supplement with side quests that are geographically close to your MSQ objectives.", "Levels 30-50: The Abyss and shared zones open up. Continue the main story while incorporating daily quests and expedition runs. The XP curve steepens at 40+, so plan to run expeditions daily and complete all available world quests."]),
        section("party-vs-solo", "Solo vs Party Leveling", ["Solo leveling is perfectly viable in Aion 2. The main story quest is designed for solo play, and the world mobs are balanced for individual players. Questing solo gives you the freedom to set your own pace.", "Party leveling becomes more efficient starting around level 30. A balanced party of tank, healer, and DPS can clear elite mobs and group quests much faster than solo. Parties also earn bonus XP for group kills.", "The most efficient approach is to solo the main story quest and party up for group quests, expeditions, and elite zones. Join a guild early — guild parties often have XP bonuses and shared quest progress."]),
        section("world-exploration", "World Exploration & Bonus XP", ["Aion 2 rewards exploration generously. Discovering new zones, landmarks, and hidden areas grants XP. The world is 36 times larger than the original Aion, so there is plenty to discover.", "Each zone has exploration achievements that grant bonus XP upon completion. These include: discovering all sub-regions, activating all flight points, and finding hidden treasure chests. Check your exploration progress in the zone overview.", "Flight points serve as fast travel locations and grant XP when first discovered. Prioritize unlocking flight points in new zones — they make questing more efficient and provide a one-time XP bonus."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "任务与升级", title: "Aion 2 任务与升级指南：1-50 级高效路线", description: "在 Aion 2 中高效升级。完整指南涵盖任务类型、1-50 级升级路线、单人 vs 组队升级以及世界探索。", intro: "从 1 级到 50 级的旅程穿越阵营专属区域、共享领土和副本内容。", sourceNote: "基于 AION2Hub 升级概述、MMOBomb 开发者直播总结与 NCSoft 官方信息。", keywords: ["Aion 2 任务指南", "Aion 2 升级路线", "Aion 2 1-50 指南"],
      sections: [
        section("quest-types", "任务类型", ["主线任务是主要经验来源。支线任务提供额外经验、金币和装备。可重复任务适合填补经验缺口。", "世界任务是特定区域出现的动态事件。战役任务是阵营专属故事线。"]),
        section("leveling-routes", "1-50 级升级路线", ["1-10 级：完成新手区教程任务，约 30-45 分钟。", "10-30 级：专注于阵营专属区域的主线任务。", "30-50 级：Abyss 和共享区域开放。加入每日任务和远征。"]),
        section("party-vs-solo", "单人 vs 组队升级", ["单人升级完全可行，主线任务设计为单人可完成。", "30 级后组队升级更高效，平衡队伍可更快清理精英怪。"]),
        section("world-exploration", "世界探索与额外经验", ["发现新区域、地标和隐藏区域获得经验。", "每个区域有探索成就，完成可获得额外经验。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "퀘스트 & 레벨업", title: "Aion 2 퀘스트 및 레벨업 가이드: 1-50 효율 루트", description: "효율적으로 레벨업하는 방법. 퀘스트 유형, 루트, 파티 vs 솔로 가이드.", intro: "1레벨에서 50레벨까지의 여정은 진영 전용 구역과 공유 영역을 통과합니다.", sourceNote: "AION2Hub, MMOBomb, NCSoft 공식 정보에 기반합니다.", keywords: ["Aion 2 퀘스트 가이드", "Aion 2 레벨업 루트", "Aion 2 1-50 가이드"],
      sections: [
        section("quest-types", "퀘스트 유형", ["메인 스토리 퀘스트가 주요 XP 원천. 사이드 퀘스트는 추가 XP와 장비."]),
        section("leveling-routes", "레벨업 루트", ["1-10: 튜토리얼. 10-30: 진영 전용 구역. 30-50: Abyss + 일일 퀘스트."]),
        section("party-vs-solo", "솔로 vs 파티", ["솔로 레벨링 가능. 30레벨 이후 파티 효율 증가."]),
        section("world-exploration", "탐험", ["새로운 지역 발견 시 XP. 비행 포인트 잠금 해제."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "クエスト＆レベル上げ", title: "Aion 2 クエスト＆レベル上げガイド：1-50 効率的ルート", description: "効率的にレベルアップ。クエストタイプ、ルート、ソロvsパーティガイド。", intro: "1から50までの旅は派閥専用エリアと共有エリアを通過します。", sourceNote: "AION2Hub、MMOBomb、NCSoft公式情報に基づきます。", keywords: ["Aion 2 クエストガイド", "Aion 2 レベル上げルート", "Aion 2 1-50 ガイド"],
      sections: [
        section("quest-types", "クエストタイプ", ["メインストーリーが主要XP源。サブクエストは追加XPと装備。"]),
        section("leveling-routes", "レベル上げルート", ["1-10: チュートリアル。10-30: 派閥専用エリア。30-50: Abyss＋デイリー。"]),
        section("party-vs-solo", "ソロvsパーティ", ["ソロでも可能。30以降はパーティが効率的。"]),
        section("world-exploration", "探索", ["新エリア発見でXP。フライトポイント解放。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "QUÊTES ET NIVEAU", title: "Guide des quêtes et du leveling d'Aion 2 : routes 1-50", description: "Montez de niveau efficacement. Guide complet des quêtes et routes.", intro: "Le voyage de 1 à 50 traverse des zones de faction et des territoires partagés.", sourceNote: "Basé sur AION2Hub, MMOBomb et les informations officielles NCSoft.", keywords: ["Aion 2 guide quêtes", "Aion 2 leveling", "Aion 2 1-50"],
      sections: [
        section("quest-types", "Types de quêtes", ["Quête principale = source XP principale. Quêtes secondaires = XP et équipement."]),
        section("leveling-routes", "Routes 1-50", ["1-10: tutoriel. 10-30: zone faction. 30-50: Abyss + quotidiennes."]),
        section("party-vs-solo", "Solo vs Groupe", ["Solo viable. Groupe plus efficace dès le niveau 30."]),
        section("world-exploration", "Exploration", ["XP pour découverte de zones. Points de vol."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "QUESTS & LEVELN", title: "Aion 2 Quest- und Level-Guide: Effiziente Routen 1-50", description: "Leveln Sie effizient. Vollständiger Guide zu Quest-Typen und Routen.", intro: "Die Reise von 1 bis 50 führt durch fraktionsspezifische Zonen.", sourceNote: "Basierend auf AION2Hub, MMOBomb und offiziellen NCSoft-Infos.", keywords: ["Aion 2 Quest-Guide", "Aion 2 Leveln", "Aion 2 1-50"],
      sections: [
        section("quest-types", "Quest-Typen", ["Hauptquest = Haupt-XP-Quelle. Nebenquests = zusätzliche XP."]),
        section("leveling-routes", "Routen 1-50", ["1-10: Tutorial. 10-30: Fraktionszone. 30-50: Abyss + Tägliche."]),
        section("party-vs-solo", "Solo vs Gruppe", ["Solo machbar. Gruppe ab Stufe 30 effizienter."]),
        section("world-exploration", "Erkundung", ["XP für Zonenentdeckung. Flugpunkte freischalten."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "MISIONES Y NIVEL", title: "Guía de misiones y nivel de Aion 2: rutas eficientes 1-50", description: "Sube de nivel eficientemente. Guía completa de tipos de misiones y rutas.", intro: "El viaje del 1 al 50 atraviesa zonas de facción y territorios compartidos.", sourceNote: "Basado en AION2Hub, MMOBomb e información oficial de NCSoft.", keywords: ["Aion 2 guía misiones", "Aion 2 nivel", "Aion 2 1-50"],
      sections: [
        section("quest-types", "Tipos de misiones", ["Misión principal = fuente XP principal. Misiones secundarias = XP adicional."]),
        section("leveling-routes", "Rutas 1-50", ["1-10: tutorial. 10-30: zona facción. 30-50: Abyss + diarias."]),
        section("party-vs-solo", "Solo vs Grupo", ["Solo viable. Grupo más eficiente desde nivel 30."]),
        section("world-exploration", "Exploración", ["XP por descubrir zonas. Puntos de vuelo."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "MISSÕES E NÍVEL", title: "Guia de missões e leveling de Aion 2: rotas 1-50", description: "Suba de nível eficientemente. Guia completo de tipos de missões e rotas.", intro: "A jornada de 1 a 50 atravessa zonas de facção e territórios compartilhados.", sourceNote: "Baseado no AION2Hub, MMOBomb e informações oficiais NCSoft.", keywords: ["Aion 2 guia missões", "Aion 2 leveling", "Aion 2 1-50"],
      sections: [
        section("quest-types", "Tipos de missões", ["Missão principal = fonte XP principal. Missões secundárias = XP extra."]),
        section("leveling-routes", "Rotas 1-50", ["1-10: tutorial. 10-30: zona facção. 30-50: Abyss + diárias."]),
        section("party-vs-solo", "Solo vs Grupo", ["Solo viável. Grupo mais eficiente a partir do nível 30."]),
        section("world-exploration", "Exploração", ["XP por descobrir zonas. Pontos de voo."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "КВЕСТЫ И ПРОКАЧКА", title: "Руководство по квестам и прокачке Aion 2: маршруты 1-50", description: "Прокачивайтесь эффективно. Полное руководство по типам квестов и маршрутам.", intro: "Путь с 1 по 50 уровень проходит через фракционные и общие зоны.", sourceNote: "Основано на AION2Hub, MMOBomb и официальной информации NCSoft.", keywords: ["Aion 2 руководство квесты", "Aion 2 прокачка", "Aion 2 1-50"],
      sections: [
        section("quest-types", "Типы квестов", ["Главный квест = основной источник XP. Побочные = дополнительный XP."]),
        section("leveling-routes", "Маршруты 1-50", ["1-10: обучение. 10-30: зона фракции. 30-50: Abyss + ежедневные."]),
        section("party-vs-solo", "Соло vs Группа", ["Соло возможно. Группа эффективнее с 30 уровня."]),
        section("world-exploration", "Исследование", ["XP за открытие зон. Точки полета."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "任務與升級", title: "Aion 2 任務與升級指南：1-50 級高效路線", description: "在 Aion 2 中高效升級。完整指南涵蓋任務類型與升級路線。", intro: "從 1 級到 50 級的旅程穿越陣營專屬區域和共享領土。", sourceNote: "基於 AION2Hub、MMOBomb 與 NCSoft 官方資訊。", keywords: ["Aion 2 任務指南", "Aion 2 升級路線", "Aion 2 1-50 指南"],
      sections: [
        section("quest-types", "任務類型", ["主線任務為主要經驗來源。支線任務提供額外經驗和裝備。"]),
        section("leveling-routes", "1-50 級升級路線", ["1-10: 新手教學。10-30: 陣營專屬區域。30-50: Abyss + 每日任務。"]),
        section("party-vs-solo", "單人 vs 組隊", ["單人升級可行。30 級後組隊更高效。"]),
        section("world-exploration", "世界探索", ["發現新區域獲得經驗。解鎖飛行點。"]),
      ],
    }),
  },
};