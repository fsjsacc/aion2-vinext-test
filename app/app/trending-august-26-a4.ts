import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-26-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "plaync-worldboss-2026-08-26", kind: "official", publisher: "NCSOFT", label: "AION 2 Official World Content Guide", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "AION 2 官方世界内容指南", en: "AION 2 Official World Content Guide", fr: "Guide officiel du contenu mondial d'AION 2", de: "AION 2 Offizieller Weltinhalte-Guide", es: "Guía oficial del contenido mundial de AION 2", ja: "AION 2 公式ワールドコンテンツガイド", "pt-br": "Guia oficial de conteúdo mundial do AION 2", ru: "Официальное руководство по мировому контенту AION 2", ko: "AION 2 공식 월드 콘텐츠 가이드", "zh-hant": "AION 2 官方世界內容指南", }, "https://aion2.plaync.com/"), };
const source2: ContentSource = { id: "aion2hub-worldboss-2026-08-26", kind: "third-party", publisher: "AION2Hub", label: "Aion 2 World Bosses Guide", url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "Aion 2 世界首领指南", en: "Aion 2 World Bosses Guide", fr: "Guide des boss mondiaux d'Aion 2", de: "Aion 2 Weltbosse-Guide", es: "Guía de jefes mundiales de Aion 2", ja: "Aion 2 ワールドボスガイド", "pt-br": "Guia de chefes mundiais de Aion 2", ru: "Гайд по мировым боссам Aion 2", ko: "Aion 2 월드 보스 가이드", "zh-hant": "Aion 2 世界首領指南", }, "https://aion2hub.com/"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "世界首领指南配图", caption: "NC 官方配图；AION 2 世界事件。" }, en: { alt: "World bosses guide image", caption: "Official NC artwork; AION 2 world events." }, fr: { alt: "Image du guide des boss mondiaux", caption: "Visuel officiel NC ; événements mondiaux d'AION 2." }, de: { alt: "Weltbosse-Guide-Bild", caption: "Offizielles NC-Artwork; AION 2 Weltereignisse." }, es: { alt: "Imagen de la guía de jefes mundiales", caption: "Arte oficial de NC; eventos mundiales de AION 2." }, ja: { alt: "ワールドボスガイド画像", caption: "NC公式アートワーク；AION 2 ワールドイベント。" }, "pt-br": { alt: "Imagem do guia de chefes mundiais", caption: "Arte oficial da NC; eventos mundiais do AION 2." }, ru: { alt: "Изображение гайда по мировым боссам", caption: "Официальный арт NC; мировые события AION 2." }, ko: { alt: "월드 보스 가이드 이미지", caption: "NC 공식 이미지; AION 2 월드 이벤트." }, "zh-hant": { alt: "世界首領指南配圖", caption: "NC 官方配圖；AION 2 世界事件。" }, }, };

export const trendingAugust26Article4: ContentEntry = {
  section: "guides", slug: "aion-2-world-bosses-guide", schemaType: "Article",
  publishedAt: "2026-08-26", updatedAt: "2026-08-26", readingMinutes: 6,
  publication: publishedVerified,
  sources: [source1, source2],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-dungeon-guide" },
    { kind: "content", section: "guides", slug: "aion-2-expedition-boss-guide" },
    { kind: "content", section: "guides", slug: "aion-2-endgame-gear-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "WORLD BOSSES & EVENTS", title: "AION 2 World Bosses Guide: Spawn Timers, Locations & Rewards", description: "Complete guide to AION 2 world bosses and open-world events. Covers spawn locations, mechanics, loot tables, and recommended strategies for solo and group play.", intro: "AION 2's open world is filled with powerful world bosses and dynamic events that offer some of the best rewards in the game. This guide covers every world boss available at launch, including spawn locations, mechanics, loot tables, and strategies for both solo players and groups.", sourceNote: "Based on the official NCSoft world content guide and AION2Hub's world bosses guide.", keywords: ["Aion 2 world bosses", "Aion 2 world events", "Aion 2 open world bosses", "Aion 2 boss spawn timers", "Aion 2 world boss loot"],
      sections: [
        section("world-boss-list", "World Boss List & Locations", ["AION 2 features over a dozen world bosses spread across leveling zones and endgame areas. World bosses are powerful monsters that spawn in fixed locations on timers ranging from 2 to 8 hours. Each boss has a unique mechanic set and drops exclusive loot, including rare crafting materials and gear.", "Low-level world bosses (level 20-30) are located in the faction starting zones. These bosses are soloable at the appropriate level and drop gear that can accelerate your leveling progression. They also drop rare materials needed for early-game crafting recipes.", "Endgame world bosses (level 50) are located in the Abyss and endgame zones. These bosses require groups of 5-10 players and have complex mechanics. They drop the best open-world loot, including materials for master crafting recipes and gear comparable to expedition drops."]),
        section("spawn-timers", "Spawn Timers & Tracking", ["World boss spawn timers in AION 2 are calculated from the moment the boss is defeated. The timer range varies by boss: common world bosses respawn every 2-4 hours, rare bosses every 4-6 hours, and legendary bosses every 6-8 hours. Some bosses have additional spawn conditions such as weather or time of day.", "The AION2 KINA interactive map tracks world boss spawn locations and estimated respawn timers. The map is updated based on community reports and allows you to set alerts for bosses you want to hunt. Using the map reduces the time spent waiting for spawns.", "Server-wide announcements are made when a world boss spawns. Pay attention to the chat notification and check the map for the exact location. Popular world bosses are often contested, so arriving quickly after the announcement is essential to secure the kill."]),
        section("solo-strategy", "Solo World Boss Strategy", ["Soloing world bosses in AION 2 is challenging but possible for skilled players. The key is to choose a boss that is at or below your level, with mechanics that favor solo play. Avoid bosses with tank-swap mechanics or group DPS checks unless you significantly outgear them.", "Preparation is essential for solo boss attempts. Bring consumables: health potions, food buffs, armor repair kits, and scrolls. Learn the boss's attack patterns and identify safe zones where you can avoid damage. Kiting is a viable strategy for ranged classes.", "If you die during a solo attempt, you can run back to the boss location before it despawns. World bosses have a 5-minute despawn timer after the last player in combat dies or leaves the area. Use this window to regroup and try again."]),
        section("group-strategy", "Group World Boss Strategy", ["For endgame world bosses, a well-organized group of 5-10 players is recommended. Assign roles: main tank, off-tank, healer, and DPS. Mark targets for crowd control. Coordinate cooldown usage for burst phases and healing cooldowns for damage-intensive mechanics.", "World boss loot in AION 2 is distributed based on contribution. The top damage dealers, the tank, and the healer receive bonus loot rolls. This encourages fair participation rather than last-hitting. Use the loot system to your advantage by performing your role effectively.", "Group composition matters for world bosses. A balanced group with at least one tank, one healer, and a mix of melee and ranged DPS is ideal. Some bosses have mechanics that favor ranged or melee, so adjust your group composition based on the boss you are fighting."]),
        section("event-system", "Open-World Events", ["In addition to world bosses, AION 2 features dynamic open-world events that trigger at regular intervals. These events include defending faction outposts, collecting resources during special weather conditions, and defeating waves of invading monsters.", "Events are announced through the in-game event timer system, which shows the next 24 hours of scheduled events. Participating in events rewards event-specific currency that can be exchanged for exclusive items, including mounts, cosmetics, and housing decorations.", "Some events are faction-specific (Elyos or Asmodian only), while others are cross-faction events where both factions can participate. Cross-faction events may include PvP elements, adding an extra layer of challenge and reward."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "世界首领与事件", title: "AION 2 世界首领指南：刷新时间、位置与奖励", description: "完整的 AION 2 世界首领和开放世界事件指南。", intro: "AION 2 的开放世界充满了强大的世界首领和动态事件。", sourceNote: "基于 NCSoft 官方世界内容指南和 AION2Hub 的世界首领指南。", keywords: ["Aion 2 世界首领", "Aion 2 世界事件", "Aion 2 开放世界首领"],
      sections: [
        section("world-boss-list", "世界首领列表与位置", ["AION 2 有十几个世界首领，分布在各个区域。刷新时间 2-8 小时。", "低级世界首领可单人挑战，终局世界首领需要 5-10 人队伍。"]),
        section("spawn-timers", "刷新时间与追踪", ["刷新时间从击败首领时开始计算。AION2 KINA 互动地图可追踪首领位置。", "服务器公告会在世界首领刷新时通知。"]),
        section("solo-strategy", "单人世界首领策略", ["单人挑战世界首领具有挑战性但可行。需要准备消耗品并学习首领技能模式。", "死亡后可在首领消失前跑回。"]),
        section("group-strategy", "队伍世界首领策略", ["建议 5-10 人队伍。分配角色：主坦克、副坦克、治疗和 DPS。", "战利品根据贡献分配。"]),
        section("event-system", "开放世界事件", ["AION 2 有动态开放世界事件，在固定时间触发。", "事件奖励专属货币，可兑换独家物品。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "월드 보스 & 이벤트", title: "AION 2 월드 보스 가이드", description: "AION 2 월드 보스와 오픈 월드 이벤트에 대한 완벽한 가이드.", intro: "AION 2의 오픈 월드는 강력한 월드 보스와 이벤트로 가득합니다.", sourceNote: "NCSoft 공식 가이드 및 AION2Hub 기반.", keywords: ["Aion 2 월드 보스", "Aion 2 월드 이벤트", "Aion 2 오픈 월드 보스"],
      sections: [
        section("world-boss-list", "월드 보스 목록", ["12개 이상의 월드 보스. 리젠 시간 2-8시간.", "저레벨 보스는 솔로 가능, 엔드게임 보스는 5-10인 파티 필요."]),
        section("spawn-timers", "리젠 시간", ["처치 시점부터 계산. AION2 KINA 지도에서 위치 추적."]),
        section("solo-strategy", "솔로 전략", ["소모품 준비. 보스 패턴 학습. 사망 시 재도전 가능."]),
        section("group-strategy", "파티 전략", ["5-10인 파티. 탱커/힐러/DPS 역할 분배. 기여도 기반 전리품."]),
        section("event-system", "오픈 월드 이벤트", ["정기적 오픈 월드 이벤트. 독점 아이템 교환 가능."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "ワールドボス＆イベント", title: "AION 2 ワールドボスガイド", description: "AION 2のワールドボスとオープンワールドイベントの完全ガイド。", intro: "AION 2のオープンワールドは強力なワールドボスで溢れています。", sourceNote: "NCSoft公式ガイド及びAION2Hubに基づきます。", keywords: ["Aion 2 ワールドボス", "Aion 2 ワールドイベント"],
      sections: [
        section("world-boss-list", "ワールドボス一覧", ["12以上のワールドボス。リスポーン2-8時間。"]),
        section("spawn-timers", "リスポーン時間", ["討伐時から計算。AION2 KINAマップで追跡。"]),
        section("solo-strategy", "ソロ戦略", ["消耗品準備。ボスパターン学習。"]),
        section("group-strategy", "グループ戦略", ["5-10人パーティ。タンク/ヒーラー/DPS役割。"]),
        section("event-system", "オープンワールドイベント", ["定期的イベント。限定アイテムと交換可能。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "BOSS MONDIAUX & ÉVÉNEMENTS", title: "Guide des boss mondiaux d'AION 2", description: "Guide complet des boss mondiaux et événements d'AION 2.", intro: "Le monde ouvert d'AION 2 regorge de boss mondiaux puissants.", sourceNote: "Basé sur le guide officiel NCSoft et AION2Hub.", keywords: ["Aion 2 boss mondiaux", "Aion 2 événements monde"],
      sections: [
        section("world-boss-list", "Liste des boss", ["12+ boss mondiaux. Respawn 2-8h. Bas niveau solo possible."]),
        section("spawn-timers", "Temps de respawn", ["Calculé depuis la défaite. Carte interactive AION2 KINA."]),
        section("solo-strategy", "Stratégie solo", ["Préparez des consommables. Apprenez les patterns."]),
        section("group-strategy", "Stratégie groupe", ["5-10 joueurs. Rôles tank/heal/DPS. Butin basé sur contribution."]),
        section("event-system", "Événements monde", ["Événements dynamiques. Monnaie d'échange pour objets exclusifs."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "WELTBOSSE & EREIGNISSE", title: "AION 2 Weltbosse-Guide", description: "Vollständiger Guide zu AION 2 Weltbossen und Weltereignissen.", intro: "Die offene Welt von AION 2 ist voller mächtiger Weltbosse.", sourceNote: "Basierend auf dem offiziellen NCSoft-Guide und AION2Hub.", keywords: ["Aion 2 Weltbosse", "Aion 2 Weltereignisse"],
      sections: [
        section("world-boss-list", "Weltboss-Liste", ["12+ Weltbosse. Respawn 2-8h. Niedrige solo möglich."]),
        section("spawn-timers", "Respawn-Zeiten", ["Ab Besiegung berechnet. AION2 KINA Karte."]),
        section("solo-strategy", "Solo-Strategie", ["Verbrauchsgüter vorbereiten. Muster lernen."]),
        section("group-strategy", "Gruppen-Strategie", ["5-10 Spieler. Rollen Tank/Heiler/DPS."]),
        section("event-system", "Weltereignisse", ["Dynamische Events. Exklusive Gegenstände."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "JEFES MUNDIALES Y EVENTOS", title: "Guía de jefes mundiales de AION 2", description: "Guía completa de jefes mundiales y eventos de AION 2.", intro: "El mundo abierto de AION 2 está lleno de poderosos jefes mundiales.", sourceNote: "Basado en la guía oficial de NCSoft y AION2Hub.", keywords: ["Aion 2 jefes mundiales", "Aion 2 eventos mundo"],
      sections: [
        section("world-boss-list", "Lista de jefes", ["12+ jefes mundiales. Respawn 2-8h."]),
        section("spawn-timers", "Tiempos de respawn", ["Calculado desde derrota. Mapa AION2 KINA."]),
        section("solo-strategy", "Estrategia solo", ["Consumibles. Patrones de jefe."]),
        section("group-strategy", "Estrategia grupo", ["5-10 jugadores. Roles tanque/curandero/DPS."]),
        section("event-system", "Eventos mundo", ["Eventos dinámicos. Objetos exclusivos."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "CHEFES MUNDIAIS E EVENTOS", title: "Guia de chefes mundiais do AION 2", description: "Guia completo de chefes mundiais e eventos do AION 2.", intro: "O mundo aberto do AION 2 está cheio de chefes mundiais poderosos.", sourceNote: "Baseado no guia oficial NCSoft e AION2Hub.", keywords: ["Aion 2 chefes mundiais", "Aion 2 eventos mundo"],
      sections: [
        section("world-boss-list", "Lista de chefes", ["12+ chefes mundiais. Respawn 2-8h."]),
        section("spawn-timers", "Tempos de respawn", ["Calculado desde derrota. Mapa AION2 KINA."]),
        section("solo-strategy", "Estratégia solo", ["Consumíveis. Padrões do chefe."]),
        section("group-strategy", "Estratégia grupo", ["5-10 jogadores. Funções tanque/curandeiro/DPS."]),
        section("event-system", "Eventos mundo", ["Eventos dinâmicos. Itens exclusivos."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "МИРОВЫЕ БОССЫ И СОБЫТИЯ", title: "Гайд по мировым боссам AION 2", description: "Полное руководство по мировым боссам и событиям AION 2.", intro: "Открытый мир AION 2 полон могущественных мировых боссов.", sourceNote: "Основано на официальном гайде NCSoft и AION2Hub.", keywords: ["Aion 2 мировые боссы", "Aion 2 мировые события"],
      sections: [
        section("world-boss-list", "Список боссов", ["12+ мировых боссов. Респавн 2-8ч."]),
        section("spawn-timers", "Время респавна", ["Рассчет от поражения. Карта AION2 KINA."]),
        section("solo-strategy", "Соло стратегия", ["Расходники. Изучение паттернов."]),
        section("group-strategy", "Групповая стратегия", ["5-10 игроков. Роли танк/хил/ДПС."]),
        section("event-system", "События мира", ["Динамические события. Эксклюзивные предметы."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "世界首領與事件", title: "AION 2 世界首領指南", description: "完整的 AION 2 世界首領和開放世界事件指南。", intro: "AION 2 的開放世界充滿了強大的世界首領。", sourceNote: "基於 NCSoft 官方世界內容指南和 AION2Hub。", keywords: ["Aion 2 世界首領", "Aion 2 世界事件"],
      sections: [
        section("world-boss-list", "世界首領列表", ["12+ 世界首領。重生時間 2-8 小時。"]),
        section("spawn-timers", "重生時間", ["從擊敗時計算。AION2 KINA 地圖追蹤。"]),
        section("solo-strategy", "單人策略", ["準備消耗品。學習首領模式。"]),
        section("group-strategy", "隊伍策略", ["5-10 人隊伍。坦克/治療/DPS 角色。"]),
        section("event-system", "開放世界事件", ["動態事件。可兌換獨家物品。"]),
      ],
    }),
  },
};