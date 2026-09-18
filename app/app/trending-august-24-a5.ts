import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-24-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "aion2hub-trials-2026-08-24", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Endgame Content Guide — Trials & Raids", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 终局内容指南——试炼与团队副本", en: "AION 2 Endgame Content Guide — Trials & Raids", fr: "Guide du contenu de fin de jeu AION 2", de: "AION 2 Endgame-Inhalts-Guide", es: "Guía de contenido final de AION 2", ja: "AION 2 エンドゲームコンテンツガイド", "pt-br": "Guia de conteúdo de fim de jogo AION 2", ru: "Руководство по эндгейм-контенту AION 2", ko: "AION 2 엔드게임 콘텐츠 가이드", "zh-hant": "AION 2 終局內容指南——試煉與團隊副本", }, "https://aion2hub.com/"), };
const source2: ContentSource = { id: "plaync-trials-2026-08-24", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — Chapter 1 Endgame", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 第一章终局内容", en: "AION 2 (KR) — Chapter 1 Endgame", fr: "AION 2 (KR) — Fin de jeu du chapitre 1", de: "AION 2 (KR) — Endgame Kapitel 1", es: "AION 2 (KR) — Final del capítulo 1", ja: "AION 2 (KR) — 第1章エンドゲーム", "pt-br": "AION 2 (KR) — Fim de jogo do capítulo 1", ru: "AION 2 (KR) — Эндгейм главы 1", ko: "AION 2 (KR) — 챕터 1 엔드게임", "zh-hant": "AION 2 第一章終局內容", }, "https://aion2.plaync.com/"), };
const source3: ContentSource = { id: "mmobomb-trials-2026-08-24", kind: "third-party", publisher: "MMOBomb", label: "NC Global Dev Stream — Endgame Content", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "NC 全球开发者直播——终局内容", en: "NC Global Dev Stream — Endgame Content", fr: "Stream dev global NC — Contenu de fin de jeu", de: "NC Global Dev Stream — Endgame-Inhalte", es: "Stream global de dev de NC — Contenido final", ja: "NC グローバル開発者ストリーム — エンドゲーム", "pt-br": "Stream dev global NC — Conteúdo de fim de jogo", ru: "Глобальный стрим разработчиков NC — Эндгейм", ko: "NC 글로벌 개발자 스트림 — 엔드게임", "zh-hant": "NC 全球開發者直播——終局內容", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "终局试炼与团队副本配图", caption: "NC 官方配图；试炼是 Aion 2 终局内容的核心。" }, en: { alt: "Trials and raids endgame guide image", caption: "Official NC artwork; Trials are the core of Aion 2's endgame content." }, fr: { alt: "Image du guide des épreuves et raids", caption: "Visuel officiel NC ; les épreuves sont le cœur du contenu de fin de jeu." }, de: { alt: "Endgame-Guide-Bild", caption: "Offizielles NC-Artwork; Prüfungen sind der Kern des Endgames." }, es: { alt: "Imagen de la guía de pruebas y incursiones", caption: "Arte oficial de NC; las pruebas son el núcleo del contenido final." }, ja: { alt: "試練＆レイドエンドゲームガイド画像", caption: "NC公式アートワーク；試練はエンドゲームの中核。" }, "pt-br": { alt: "Imagem do guia de provas e raides", caption: "Arte oficial da NC; provas são o núcleo do fim de jogo." }, ru: { alt: "Изображение гайда по испытаниям и рейдам", caption: "Официальный арт NC; испытания — основа эндгейма." }, ko: { alt: "시련 및 공격대 엔드게임 가이드 이미지", caption: "NC 공식 이미지입니다. 시련은 Aion 2 엔드게임의 핵심입니다." }, "zh-hant": { alt: "終局試煉與團隊副本配圖", caption: "NC 官方配圖；試煉是 Aion 2 終局內容的核心。" }, }, };

export const trendingAugust24Article5: ContentEntry = {
  section: "guides", slug: "aion-2-trials-raids-guide", schemaType: "Article",
  publishedAt: "2026-08-24", updatedAt: "2026-08-24", readingMinutes: 6,
  publication: publishedVerified,
  sources: [source1, source2, source3],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-expedition-boss-guide" },
    { kind: "content", section: "guides", slug: "aion-2-endgame-path-guide" },
    { kind: "content", section: "guides", slug: "aion-2-gear-enhancement-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "TRIALS & RAIDS", title: "Aion 2 Endgame Trials & Raids Guide: Beyond Expeditions", description: "Master Aion 2's endgame content beyond expeditions. Complete guide to Trials (solo/small group), Raids (12-player), Tier 2 gear preparation, and seasonal progression.", intro: "Once you have conquered the expeditions and reached level 50, a deeper layer of endgame content opens up. Trials and raids are the ultimate challenges in Aion 2's Chapter 1, offering the best gear, cosmetic rewards, and prestige. This guide covers everything you need to know to tackle the hardest content.", sourceNote: "Based on AION2Hub's endgame content guide, official NCSoft KR endgame structure, and MMOBomb's global dev stream recap. Endgame details confirmed from KR live server.", keywords: ["Aion 2 trials", "Aion 2 raids", "Aion 2 endgame guide", "Aion 2 Tier 2 gear", "Aion 2 seasonal progression"],
      sections: [
        section("trials-overview", "Trials: Solo & Small Group Challenge", ["Trials are instanced challenge modes that test your skill and gear. Unlike expeditions, trials have variable difficulty levels — Normal, Hard, and Infernal. Higher difficulties offer better rewards but require better gear and coordination.", "Solo trials are designed for individual players who want to prove their mastery. These encounters test your class knowledge, positioning, and resource management. Successful solo trial clears are a badge of honor and reward unique cosmetic items.", "Group trials (3-player) require coordination and role synergy. Each member must fulfill their role effectively — tank holds aggro, healer manages party health, DPS executes mechanics while maintaining damage output. Communication is key."]),
        section("raids-intro", "Raids: 12-Player Group Content", ["Raids are the pinnacle of Aion 2's endgame PvE content. Chapter 1 features one raid: the Balaur Siege, a 12-player instanced encounter that requires a full raid party with multiple tanks, healers, and DPS players.", "The Balaur Siege raid has multiple phases: Phase 1 requires the raid to split into three groups to disable defensive towers. Phase 2 is a DPS race against the Balaur Commander. Phase 3 is the final boss encounter with complex mechanics including environmental hazards, adds, and enrage timers.", "Raid progression follows a weekly lockout. Each raid boss drops Tier 2 gear materials, unique cosmetic items, and raid-specific currencies. Coordinating a raid group through a guild or community is essential — PUG (pick-up group) raids are challenging due to the coordination required."]),
        section("tier2-preparation", "Tier 2 Gear Preparation", ["Before attempting raids, you need Tier 2 (T2) gear preparation. T2 gear is the second gear tier after Dragon-tier (T1). It requires materials from expeditions, trials, and world content.", "T2 gear components include: T2 base items (crafted from rare materials dropped in trials), enhancement stones (from daily quests and expedition runs), and raid currencies (from weekly raid clears). The upgrade path requires significant investment of time and resources.", "Recommended preparation checklist: Complete all expeditions on Hard difficulty, clear Solo Trial on Normal, join a guild or raid community, stockpile enhancement materials, and research boss mechanics through guides and videos."]),
        section("season-progression", "Seasonal Progression & Rewards", ["Aion 2 features seasonal content cycles called Chapters. Chapter 1 runs from launch through the first major content update. Each season has a unique progression track with exclusive rewards.", "Season rewards include: exclusive cosmetic sets, seasonal titles, special mounts, housing furniture, and T2 gear materials. The season pass (Premium Track) offers accelerated progression and additional exclusive rewards.", "Seasonal progression is account-wide, so you can progress the season pass with any character. Focus on completing season objectives across multiple characters to maximize your rewards. The season typically lasts 3-4 months, giving ample time to reach the highest reward tiers."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "试炼与团队副本", title: "Aion 2 终局试炼与团队副本指南：超越远征", description: "掌握远征之外的终局内容。单人试炼、12 人团队副本、T2 装备准备与赛季进度。", intro: "征服远征并达到 50 级后，更深层的终局内容将向你开放。", sourceNote: "基于 AION2Hub 终局内容指南、NCSoft 官方韩服结构与 MMOBomb 全球开发者直播。", keywords: ["Aion 2 试炼", "Aion 2 团队副本", "Aion 2 终局指南", "Aion 2 T2 装备"],
      sections: [
        section("trials-overview", "试炼：单人与小团队挑战", ["试炼是具有可变难度的副本挑战模式：普通、困难和地狱。", "单人试炼考验你的职业知识、走位和资源管理。", "3 人组队试炼需要协调和角色协同。"]),
        section("raids-intro", "团队副本：12 人内容", ["第一章的团队副本是 Balaur 围攻战，一个 12 人副本。", "多阶段战斗，包括防御塔、DPS 竞速和最终首领战。", "每周锁定。需要公会或社区协调。"]),
        section("tier2-preparation", "T2 装备准备", ["T2 是龙族装备之后的第二装备等级。需要远征、试炼和世界内容的材料。", "推荐准备清单：完成所有困难远征、通关单人试炼、加入公会。"]),
        section("season-progression", "赛季进度与奖励", ["Aion 2 有名为章节的季节性内容周期。每个赛季有独特的进度轨道和专属奖励。", "赛季持续 3-4 个月，时间充裕。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "시련 & 공격대", title: "Aion 2 엔드게임 시련 및 공격대 가이드", description: "원정대 이후의 엔드게임 콘텐츠. 시련, 12인 공격대, T2 장비.", intro: "원정대를 정복하고 50레벨에 도달하면 더 깊은 엔드게임이 열립니다.", sourceNote: "AION2Hub, NCSoft, MMOBomb에 기반합니다.", keywords: ["Aion 2 시련", "Aion 2 공격대", "Aion 2 엔드게임"],
      sections: [
        section("trials-overview", "시련", ["솔로 및 3인 시련. 일반/어려움/지옥 난이도."]),
        section("raids-intro", "공격대", ["12인 Balaur 공성전. 다단계 전투. 주간 잠금."]),
        section("tier2-preparation", "T2 장비", ["T2는 용 티어 이후 장비. 시련 및 원정대 재료 필요."]),
        section("season-progression", "시즌", ["챕터 기반 시즌. 3-4개월 지속. 전용 보상."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "試練＆レイド", title: "Aion 2 エンドゲーム試練＆レイドガイド", description: "遠征後のエンドゲーム。試練、12人レイド、T2装備。", intro: "遠征をクリアしレベル50に到達すると、より深いエンドゲームが開放されます。", sourceNote: "AION2Hub、NCSoft、MMOBombに基づきます。", keywords: ["Aion 2 試練", "Aion 2 レイド", "Aion 2 エンドゲーム"],
      sections: [
        section("trials-overview", "試練", ["ソロ/3人試練。ノーマル/ハード/インファナル。"]),
        section("raids-intro", "レイド", ["12人Balaur攻城戦。多段階戦闘。週間ロック。"]),
        section("tier2-preparation", "T2装備", ["T2はドラゴンティアの次。試練と遠征の素材が必要。"]),
        section("season-progression", "シーズン", ["チャプターベースのシーズン。3-4ヶ月。専用報酬。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "ÉPREUVES ET RAID", title: "Guide des épreuves et raids de fin de jeu d'Aion 2", description: "Contenu de fin de jeu au-delà des expéditions. Épreuves, raids 12 joueurs.", intro: "Après les expéditions et le niveau 50, un contenu plus profond s'ouvre.", sourceNote: "Basé sur AION2Hub, NCSoft et MMOBomb.", keywords: ["Aion 2 épreuves", "Aion 2 raid", "Aion 2 fin de jeu"],
      sections: [
        section("trials-overview", "Épreuves", ["Solo/3 joueurs. Normal/Hard/Infernal."]),
        section("raids-intro", "Raids", ["Raid Balaur 12 joueurs. Phases multiples. Verrouillage hebdo."]),
        section("tier2-preparation", "Équipement T2", ["Après le rang Dragon. Matériaux d'épreuves et d'expéditions."]),
        section("season-progression", "Saison", ["Chapitres saisonniers. 3-4 mois. Récompenses exclusives."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "PRÜFUNGEN & SCHLACHTZÜGE", title: "Aion 2 Endgame-Prüfungen und Schlachtzüge-Guide", description: "Endgame-Inhalte jenseits von Expeditionen. Prüfungen, 12-Spieler-Schlachtzüge.", intro: "Nach Expeditionen und Stufe 50 öffnet sich tieferer Endgame-Inhalt.", sourceNote: "Basierend auf AION2Hub, NCSoft und MMOBomb.", keywords: ["Aion 2 Prüfungen", "Aion 2 Schlachtzug", "Aion 2 Endgame"],
      sections: [
        section("trials-overview", "Prüfungen", ["Solo/3 Spieler. Normal/Hart/Infernal."]),
        section("raids-intro", "Schlachtzüge", ["12-Spieler-Balaur-Belagerung. Mehrere Phasen. Wöchentlich."]),
        section("tier2-preparation", "T2-Ausrüstung", ["Nach Drachen-Stufe. Materialien von Prüfungen."]),
        section("season-progression", "Saison", ["Kapitel-basierte Saisons. 3-4 Monate. Exklusive Belohnungen."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "PRUEBAS E INCURSIONES", title: "Guía de pruebas e incursiones de fin de juego de Aion 2", description: "Contenido final más allá de las expediciones. Pruebas, incursiones de 12 jugadores.", intro: "Tras las expediciones y el nivel 50, se abre contenido más profundo.", sourceNote: "Basado en AION2Hub, NCSoft y MMOBomb.", keywords: ["Aion 2 pruebas", "Aion 2 incursión", "Aion 2 fin de juego"],
      sections: [
        section("trials-overview", "Pruebas", ["Solo/3 jugadores. Normal/Difícil/Infernal."]),
        section("raids-intro", "Incursiones", ["Incursión Balaur 12 jugadores. Fases múltiples. Bloqueo semanal."]),
        section("tier2-preparation", "Equipo T2", ["Tras rango Dragón. Materiales de pruebas."]),
        section("season-progression", "Temporada", ["Temporadas por capítulos. 3-4 meses. Recompensas exclusivas."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "PROVAS E RAIDES", title: "Guia de provas e raides de fim de jogo de Aion 2", description: "Conteúdo de fim de jogo além das expedições. Provas, raides de 12 jogadores.", intro: "Após as expedições e o nível 50, conteúdo mais profundo se abre.", sourceNote: "Baseado no AION2Hub, NCSoft e MMOBomb.", keywords: ["Aion 2 provas", "Aion 2 raide", "Aion 2 fim de jogo"],
      sections: [
        section("trials-overview", "Provas", ["Solo/3 jogadores. Normal/Difícil/Infernal."]),
        section("raids-intro", "Raides", ["Raide Balaur 12 jogadores. Fases múltiplas. Bloqueio semanal."]),
        section("tier2-preparation", "Equipamento T2", ["Após rank Dragão. Materiais de provas."]),
        section("season-progression", "Temporada", ["Temporadas por capítulos. 3-4 meses. Recompensas exclusivas."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ИСПЫТАНИЯ И РЕЙДЫ", title: "Руководство по испытаниям и рейдам Aion 2", description: "Эндгейм-контент за пределами экспедиций. Испытания, рейды на 12 игроков.", intro: "После экспедиций и 50 уровня открывается более глубокий контент.", sourceNote: "Основано на AION2Hub, NCSoft и MMOBomb.", keywords: ["Aion 2 испытания", "Aion 2 рейд", "Aion 2 эндгейм"],
      sections: [
        section("trials-overview", "Испытания", ["Соло/3 игрока. Обычный/Сложный/Инфернальный."]),
        section("raids-intro", "Рейды", ["Рейд Balaur 12 игроков. Многофазовый. Еженедельная блокировка."]),
        section("tier2-preparation", "T2 экипировка", ["После ранга Дракон. Материалы из испытаний."]),
        section("season-progression", "Сезон", ["Сезоны на основе глав. 3-4 месяца. Эксклюзивные награды."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "試煉與團隊副本", title: "Aion 2 終局試煉與團隊副本指南", description: "超越遠征的終局內容。試煉、12 人團隊副本、T2 裝備。", intro: "征服遠征並達到 50 級後，更深層的終局內容將向你開放。", sourceNote: "基於 AION2Hub 終局內容指南、NCSoft 官方韓服結構與 MMOBomb 全球開發者直播。", keywords: ["Aion 2 試煉", "Aion 2 團隊副本", "Aion 2 終局指南"],
      sections: [
        section("trials-overview", "試煉", ["單人/3 人試煉。普通/困難/地獄難度。"]),
        section("raids-intro", "團隊副本", ["12 人 Balaur 圍攻戰。多階段。每週鎖定。"]),
        section("tier2-preparation", "T2 裝備", ["龍族裝備之後。需要試煉和遠征材料。"]),
        section("season-progression", "賽季", ["基於章節的賽季。3-4 個月。專屬獎勵。"]),
      ],
    }),
  },
};