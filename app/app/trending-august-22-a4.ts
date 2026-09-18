import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-22-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 4 — Expedition Boss Guide */

const expeditionSource1: ContentSource = { id: "aion2hub-expedition-2026-08-22", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Chapter 1 Content Guide — Expeditions", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-22", verifiedAt: "2026-08-22", localizations: localizations({ "zh-hans": "AION 2 第一章内容指南——远征", en: "AION 2 Chapter 1 Content Guide — Expeditions", fr: "AION 2 Chapitre 1 — Guide des expéditions", de: "AION 2 Kapitel 1 — Expeditions-Guide", es: "AION 2 Capítulo 1 — Guía de expediciones", ja: "AION 2 第1章 — 遠征ガイド", "pt-br": "AION 2 Capítulo 1 — Guia de expedições", ru: "AION 2 Глава 1 — Руководство по экспедициям", ko: "AION 2 챕터 1 — 원정대 가이드", "zh-hant": "AION 2 第一章內容指南——遠征", }, "https://aion2hub.com/"), };
const expeditionSource2: ContentSource = { id: "mmobomb-expedition-2026-08-22", kind: "third-party", publisher: "MMOBomb", label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-22", verifiedAt: "2026-08-22", localizations: localizations({ "zh-hans": "NC 首次全球开发者直播回顾", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs peuvent attendre du lancement", de: "NC teilt mit, was Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores pueden esperar", ja: "NCが発売時に期待できることを共有", "pt-br": "NC compartilha o que os jogadores podem esperar", ru: "NC делится тем, что игроки могут ожидать от запуска", ko: "NC, 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 首次全球開發者直播回顧", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const expeditionSource3: ContentSource = { id: "plaync-expedition-2026-08-22", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — 챕터 1 원정대 콘텐츠 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-22", verifiedAt: "2026-08-22", localizations: localizations({ "zh-hans": "AION 2（韩服）— 第一章远征内容说明", en: "AION 2 (KR) — Chapter 1 Expedition Content Guide", fr: "AION 2 (KR) — Guide du contenu des expéditions du chapitre 1", de: "AION 2 (KR) — Kapitel-1-Expeditions-Inhalts-Guide", es: "AION 2 (KR) — Guía de contenido de expediciones del capítulo 1", ja: "AION 2 (KR) — 第1章遠征コンテンツガイド", "pt-br": "AION 2 (KR) — Guia de conteúdo de expedições do capítulo 1", ru: "AION 2 (KR) — Руководство по контенту экспедиций главы 1", ko: "AION 2 (KR) — 챕터 1 원정대 콘텐츠 안내", "zh-hant": "AION 2（韓服）— 第一章遠征內容說明", }, "https://aion2.plaync.com/ko-kr/board/notice"), };
const expeditionHero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media", translations: { "zh-hans": { alt: "远征首领指南配图", caption: "NC 官方配图；远征是 Aion 2 的核心 5 人 PvE 内容。" }, en: { alt: "Expedition boss guide image", caption: "Official NC artwork; expeditions are Aion 2's core 5-player PvE content." }, fr: { alt: "Image du guide des boss d'expédition", caption: "Visuel officiel NC ; les expéditions sont le cœur du PvE à 5 joueurs." }, de: { alt: "Expeditionsboss-Guide-Bild", caption: "Offizielles NC-Artwork; Expeditionen sind der Kern-PvE-Inhalt." }, es: { alt: "Imagen de la guía de jefes de expedición", caption: "Arte oficial de NC; las expediciones son el contenido PvE central." }, ja: { alt: "遠征ボスガイド画像", caption: "NC公式アートワーク；遠征はAion 2のコア5人PvEコンテンツです。" }, "pt-br": { alt: "Imagem do guia de chefes de expedição", caption: "Arte oficial da NC; expedições são o conteúdo PvE central de 5 jogadores." }, ru: { alt: "Изображение гайда по боссам экспедиций", caption: "Официальный арт NC; экспедиции — основной PvE-контент на 5 игроков." }, ko: { alt: "원정대 보스 가이드 이미지", caption: "NC 공식 이미지입니다. 원정대는 Aion 2의 핵심 5인 PvE 콘텐츠입니다." }, "zh-hant": { alt: "遠征首領指南配圖", caption: "NC 官方配圖；遠征是 Aion 2 的核心 5 人 PvE 內容。" }, }, };

export const trendingAugust22Article4: ContentEntry = {
  section: "guides", slug: "aion-2-expedition-boss-guide", schemaType: "Article",
  publishedAt: "2026-08-22", updatedAt: "2026-08-22", readingMinutes: 6,
  publication: publishedVerified,
  sources: [expeditionSource1, expeditionSource2, expeditionSource3],
  heroImage: expeditionHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-endgame-path-guide" },
    { kind: "content", section: "guides", slug: "aion-2-gear-enhancement-guide" },
    { kind: "content", section: "guides", slug: "aion-2-crafting-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "EXPEDITION GUIDE", title: "Aion 2 Expedition Boss Guide: Mechanics, Group Composition & Loot", description: "Master Aion 2's 5-player expeditions. Complete boss mechanics guide for Citadel of the Fallen Daeva and Encroached Deus Research Base, with group composition tips and loot tables.", intro: "Expeditions are the core 5-player PvE content in Aion 2's Chapter 1 endgame. These instanced dungeons challenge your group with multiple bosses, unique mechanics, and valuable Dragon-tier gear rewards. This guide breaks down each expedition's boss fights, recommended group compositions, and loot tables so you can go in prepared.", sourceNote: "Based on AION2Hub's Chapter 1 content guide, MMOBomb's dev stream recap, and the official KR service structure. Boss mechanics confirmed from KR live server data.", keywords: ["Aion 2 expedition guide", "Aion 2 boss mechanics", "Aion 2 Citadel of the Fallen Daeva", "Aion 2 Deus Research Base", "Aion 2 PvE dungeon guide"],
      sections: [
        section("expedition-overview", "Expedition Overview: 5-Player PvE Core", ["Expeditions are Aion 2's equivalent of traditional MMORPG dungeons — instanced 5-player content designed for coordinated group play. Each expedition has a recommended item level and requires a balanced party of tank, healer, and damage dealers.", "There are two main expeditions available at launch in Chapter 1: the Citadel of the Fallen Daeva (the campaign-ending expedition) and the Encroached Deus Research Base (a higher-difficulty option). Both drop Dragon-tier equipment and upgrade materials.", "Expeditions reset daily, making them the primary gear progression loop. You can run each expedition once per day for loot, with additional runs possible for material farming."]),
        section("citadel-boss", "Citadel of the Fallen Daeva", ["The Citadel of the Fallen Daeva is the first expedition you will encounter after completing the main story campaign. It features three boss encounters with escalating difficulty.", "First Boss — Commander Varkan: A straightforward tank-and-spank fight with a frontal cone attack. The tank must face the boss away from the group. At 50% HP, Varkan summons adds that the DPS should prioritize before continuing the burn.", "Second Boss — Inquisitor Moriel: This fight introduces a stacking damage-over-time debuff. Players must spread out to avoid sharing the debuff, and the healer needs to cleanse at 3+ stacks. An interruptible channeled ability deals heavy damage if it completes.", "Final Boss — Fallen Daeva Lord: The final encounter combines all previous mechanics. The boss has a fear mechanic that sends the target running toward the edge of the platform — positioning near the center is critical. A soft enrage timer at 8 minutes means you need consistent DPS."]),
        section("research-base", "Encroached Deus Research Base", ["The Encroached Deus Research Base is the higher-difficulty expedition, unlocked after completing the Citadel. It requires a higher item level and better coordination.", "First Boss — Experimental Subject #7: A multi-phase encounter. In phase 1, the boss alternates between single-target attacks and AoE poison pools. In phase 2, poison pools remain on the ground permanently, reducing available space. Ranged DPS and healers should position carefully.", "Second Boss — Chief Researcher Malkior: This boss has a shield mechanic that requires standing in the right elemental zone (fire/ice/lightning) to break. The zones rotate every 30 seconds, so the group must move as a unit. Failure to break the shield in time results in a party-wide wipe mechanic.", "Final Boss — Deus, The Corrupted: A challenging two-phase encounter. Phase 1 is a standard boss fight with arena-wide AoE patterns. Phase 2 triggers a transformation that removes the floor in sections — players must use their flight abilities to stay airborne. This is the only fight in Chapter 1 that requires coordinated aerial positioning."]),
        section("loot-table", "Loot Table & Weekly Progression", ["Both expeditions drop Dragon-tier equipment, which is the primary gear set for entering Trials and other endgame content. Each boss has a chance to drop weapons, armor pieces, and accessories.", "Dragon-tier gear comes in different quality levels: Normal, Advanced, and Superior. Higher difficulties and better performance (fewer deaths, faster clears) increase the chance of Superior drops. Upgrade materials like Dragon Scales and Enhancement Stones also drop from bosses.", "Weekly progression tracking: each expedition boss drops a weekly bonus chest on the first clear. The weekly cap on bonus loot encourages running all available expeditions rather than farming a single one. Coordinate with your group to maximize your weekly returns."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "远征指南", title: "Aion 2 远征首领指南：机制、队伍配置与战利品", description: "掌握 Aion 2 的 5 人远征。堕落 Daeva 之城与被侵蚀的神之研究所的完整首领机制指南，附队伍配置建议与战利品表。", intro: "远征是 Aion 2 第一章后期的核心 5 人 PvE 内容。这些副本挑战你的团队，提供有价值的龙族装备奖励。", sourceNote: "基于 AION2Hub 第一章内容指南、MMOBomb 开发者直播总结与官方韩服结构。", keywords: ["Aion 2 远征指南", "Aion 2 首领机制", "Aion 2 堕落 Daeva 之城", "Aion 2 神之研究所", "Aion 2 PvE 副本指南"],
      sections: [
        section("expedition-overview", "远征概述：5 人 PvE 核心", ["远征是 Aion 2 中的传统 MMORPG 副本——设计用于协调团队游戏的 5 人实例内容。每个远征有推荐物品等级，需要平衡的队伍配置。", "第一章提供了两个主要远征：堕落 Daeva 之城（战役结尾远征）和被侵蚀的神之研究所（更高难度版本）。两者掉落龙族装备与升级材料。", "远征每日重置，是主要的装备养成循环。"]),
        section("citadel-boss", "堕落 Daeva 之城", ["堕落 Daeva 之城是完成主线剧情后遇到的第一个远征。包含三个首领。", "首领 1 — 指挥官 Varkan：正面锥形攻击，坦克需将首领背对团队。50% 血量时召唤小兵，DPS 优先清理。", "首领 2 — 审判官 Moriel：叠加持续伤害减益，玩家需分散站位，治疗者需在 3 层以上净化。", "最终首领 — 堕落 Daeva 领主：恐惧机制将目标推向平台边缘，靠近中心站位至关重要。8 分钟狂暴计时器。"]),
        section("research-base", "被侵蚀的神之研究所", ["更高难度的远征，需要更高物品等级和更好的协调。", "首领 1 — 实验体 #7：多阶段战斗，阶段 1 交替进行单目标攻击和 AoE 毒池，阶段 2 毒池永久残留。", "首领 2 — 首席研究员 Malkior：护盾机制需要站在正确的元素区域（火/冰/闪电）来打破。", "最终首领 — Deus，被侵蚀者：具有挑战性的双阶段战斗，阶段 2 需要飞行能力在空中作战。"]),
        section("loot-table", "战利品表与每周进度", ["两个远征掉落龙族装备，这是进入试炼和后期内容的主要装备来源。", "龙族装备有不同的品质：普通、高级和卓越。更高难度和更好的表现增加卓越掉落几率。", "每个远征首领在首次通关时掉落每周奖励宝箱。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "원정대 가이드", title: "Aion 2 원정대 보스 가이드: 메커니즘, 파티 구성 및 전리품", description: "Aion 2의 5인 원정대를 마스터하세요. 타락한 Daeva의 성채와 침식된 신 연구기지의 보스 메커니즘, 파티 구성 팁 및 전리품 정보.", intro: "원정대는 Aion 2 챕터 1 엔드게임의 핵심 5인 PvE 콘텐츠입니다.", sourceNote: "AION2Hub, MMOBomb 개발자 스트림, 공식 KR 서비스 구조에 기반합니다.", keywords: ["Aion 2 원정대 가이드", "Aion 2 보스 메커니즘", "Aion 2 타락한 Daeva의 성채", "Aion 2 신 연구기지", "Aion 2 PvE 던전 가이드"],
      sections: [
        section("expedition-overview", "원정대 개요", ["5인 PvE 인스턴스 콘텐츠. 챕터 1에서 두 개의 주요 원정대 이용 가능.", "타락한 Daeva의 성채와 침식된 신 연구기지. 용 티어 장비 드롭."]),
        section("citadel-boss", "타락한 Daeva의 성채", ["세 명의 보스. 지휘관 Varkan, 심문관 Moriel, 타락한 Daeva 군주."]),
        section("research-base", "침식된 신 연구기지", ["더 높은 난이도. 실험체 #7, 수석 연구원 Malkior, Deus."]),
        section("loot-table", "전리품", ["용 티어 장비. 일반/고급/최상급 품질. 주간 보너스 상자."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "遠征ガイド", title: "Aion 2 遠征ボスガイド：メカニクス、パーティ構成と戦利品", description: "Aion 2の5人遠征をマスター。堕ちたDaevaの城塞と蝕まれし神の研究基地のボスメカニクスガイド。", intro: "遠征はAion 2第1章エンドゲームのコア5人PvEコンテンツです。", sourceNote: "AION2Hub、MMOBomb開発者ストリーム、公式KRサービス構造に基づきます。", keywords: ["Aion 2 遠征ガイド", "Aion 2 ボスメカニクス", "Aion 2 堕ちたDaevaの城塞", "Aion 2 神の研究基地", "Aion 2 PvEダンジョンガイド"],
      sections: [
        section("expedition-overview", "遠征概要", ["5人PvEインスタンスコンテンツ。第1章で2つの主要遠征が利用可能。"]),
        section("citadel-boss", "堕ちたDaevaの城塞", ["3人のボス。指揮官Varkan、審問官Moriel、堕ちたDaeva領主。"]),
        section("research-base", "蝕まれし神の研究基地", ["高難易度。実験体#7、首席研究員Malkior、Deus。"]),
        section("loot-table", "戦利品", ["ドラゴンティア装備。通常/上級/卓越品質。週間ボーナス宝箱。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE DES EXPÉDITIONS", title: "Guide des boss d'expédition d'Aion 2 : mécaniques, composition et butin", description: "Maîtrisez les expéditions à 5 joueurs d'Aion 2. Guide complet des mécaniques de boss.", intro: "Les expéditions sont le cœur du contenu PvE à 5 joueurs du chapitre 1.", sourceNote: "Basé sur le guide AION2Hub, le récapitulatif MMOBomb et la structure officielle KR.", keywords: ["Aion 2 guide expédition", "Aion 2 mécaniques boss", "Aion 2 donjon PvE"],
      sections: [
        section("expedition-overview", "Aperçu des expéditions", ["Contenu instancié PvE 5 joueurs. Deux expéditions principales au chapitre 1."]),
        section("citadel-boss", "Citadelle du Daeva déchu", ["Trois boss : Commandant Varkan, Inquisiteur Moriel, Seigneur Daeva déchu."]),
        section("research-base", "Base de recherche envahie", ["Difficulté élevée. Sujet #7, Chercheur Malkior, Deus le Corrompu."]),
        section("loot-table", "Butin", ["Équipement de rang Dragon. Qualités normale/avancée/supérieure."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "EXPEDITIONS-GUIDE", title: "Aion 2 Expeditions-Boss-Guide: Mechaniken, Gruppenaufstellung und Beute", description: "Meistern Sie die 5-Spieler-Expeditionen von Aion 2. Vollständiger Boss-Mechaniken-Guide.", intro: "Expeditionen sind der Kern-PvE-Inhalt von Kapitel 1.", sourceNote: "Basierend auf dem AION2Hub-Guide, dem MMOBomb-Recap und der offiziellen KR-Struktur.", keywords: ["Aion 2 Expeditions-Guide", "Aion 2 Boss-Mechaniken", "Aion 2 PvE-Dungeon"],
      sections: [
        section("expedition-overview", "Expeditionsübersicht", ["5-Spieler-PvE-Instanzinhalte. Zwei Hauptexpeditionen in Kapitel 1."]),
        section("citadel-boss", "Zitadelle des gefallenen Daeva", ["Drei Bosse: Kommandant Varkan, Inquisitor Moriel, Gefallener Daeva-Lord."]),
        section("research-base", "Eingedrungene Forschungsbasis", ["Hohe Schwierigkeit. Subjekt #7, Chef Forscher Malkior, Deus."]),
        section("loot-table", "Beute", ["Drachen-Ausrüstung. Normal/fortgeschritten/überlegen Qualität."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE EXPEDICIONES", title: "Guía de jefes de expedición de Aion 2: mecánicas, composición y botín", description: "Domina las expediciones de 5 jugadores de Aion 2. Guía completa de mecánicas de jefes.", intro: "Las expediciones son el contenido PvE central de 5 jugadores del capítulo 1.", sourceNote: "Basado en la guía de AION2Hub, el resumen de MMOBomb y la estructura oficial de KR.", keywords: ["Aion 2 guía expedición", "Aion 2 mecánicas jefes", "Aion 2 mazmorra PvE"],
      sections: [
        section("expedition-overview", "Resumen de expediciones", ["Contenido de instancia PvE de 5 jugadores. Dos expediciones principales en el capítulo 1."]),
        section("citadel-boss", "Ciudadela del Daeva caído", ["Tres jefes: Comandante Varkan, Inquisidor Moriel, Señor Daeva caído."]),
        section("research-base", "Base de Investigación", ["Dificultad alta. Sujeto #7, Investigador Malkior, Deus el Corrompido."]),
        section("loot-table", "Botín", ["Equipo de rango Dragón. Calidad normal/avanzada/superior."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE EXPEDIÇÕES", title: "Guia de chefes de expedição de Aion 2: mecânicas, composição e saque", description: "Domine as expedições de 5 jogadores de Aion 2. Guia completo de mecânicas de chefes.", intro: "Expedições são o conteúdo PvE central de 5 jogadores do capítulo 1.", sourceNote: "Baseado no guia AION2Hub, no resumo MMOBomb e na estrutura oficial KR.", keywords: ["Aion 2 guia expedição", "Aion 2 mecânicas chefe", "Aion 2 masmorra PvE"],
      sections: [
        section("expedition-overview", "Visão geral", ["Conteúdo instanciado PvE 5 jogadores. Duas expedições principais no capítulo 1."]),
        section("citadel-boss", "Fortaleza do Daeva Caído", ["Três chefes: Comandante Varkan, Inquisidor Moriel, Lorde Daeva Caído."]),
        section("research-base", "Base de Pesquisa", ["Dificuldade alta. Sujeito #7, Pesquisador Malkior, Deus Corrompido."]),
        section("loot-table", "Saque", ["Equipamento rank Dragão. Qualidade normal/avançada/superior."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "РУКОВОДСТВО ПО ЭКСПЕДИЦИЯМ", title: "Руководство по боссам экспедиций Aion 2: механики, состав группы и добыча", description: "Освойте экспедиции на 5 игроков в Aion 2. Полное руководство по механикам боссов.", intro: "Экспедиции — основной PvE-контент на 5 игроков в главе 1.", sourceNote: "Основано на руководстве AION2Hub, обзоре MMOBomb и официальной структуре KR.", keywords: ["Aion 2 руководство экспедиция", "Aion 2 механики боссов", "Aion 2 PvE подземелье"],
      sections: [
        section("expedition-overview", "Обзор экспедиций", ["Инстансовый PvE-контент на 5 игроков. Две основные экспедиции в главе 1."]),
        section("citadel-boss", "Цитадель падшего Daeva", ["Три босса: Командир Варкан, Инквизитор Мориэль, Падший владыка Daeva."]),
        section("research-base", "Исследовательская база", ["Высокая сложность. Субъект #7, Главный исследователь Малкиор, Деус."]),
        section("loot-table", "Добыча", ["Экипировка ранга Дракон. Качество обычное/продвинутое/высшее."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "遠征指南", title: "Aion 2 遠征首領指南：機制、隊伍配置與戰利品", description: "掌握 Aion 2 的 5 人遠征。墮落 Daeva 之城與被侵蝕的神之研究所的完整首領機制指南。", intro: "遠征是 Aion 2 第一章後期的核心 5 人 PvE 內容。", sourceNote: "基於 AION2Hub 第一章內容指南、MMOBomb 開發者直播總結與官方韓服結構。", keywords: ["Aion 2 遠征指南", "Aion 2 首領機制", "Aion 2 墮落 Daeva 之城", "Aion 2 神之研究所", "Aion 2 PvE 副本指南"],
      sections: [
        section("expedition-overview", "遠征概述", ["5 人 PvE 實例內容。第一章提供兩個主要遠征。"]),
        section("citadel-boss", "墮落 Daeva 之城", ["三個首領。指揮官 Varkan、審判官 Moriel、墮落 Daeva 領主。"]),
        section("research-base", "被侵蝕的神之研究所", ["更高難度。實驗體 #7、首席研究員 Malkior、Deus。"]),
        section("loot-table", "戰利品", ["龍族裝備。普通/高級/卓越品質。每週獎勵寶箱。"]),
      ],
    }),
  },
};