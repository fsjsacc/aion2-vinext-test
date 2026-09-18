import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-26-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "plaync-dungeons-2026-08-26", kind: "official", publisher: "NCSOFT", label: "AION 2 Official Dungeon Guide", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "AION 2 官方地下城指南", en: "AION 2 Official Dungeon Guide", fr: "Guide officiel des donjons d'AION 2", de: "AION 2 Offizieller Dungeon-Guide", es: "Guía oficial de mazmorras de AION 2", ja: "AION 2 公式ダンジョンガイド", "pt-br": "Guia oficial de masmorras do AION 2", ru: "Официальное руководство по подземельям AION 2", ko: "AION 2 공식 던전 가이드", "zh-hant": "AION 2 官方地下城指南", }, "https://aion2.plaync.com/"), };
const source2: ContentSource = { id: "aion2hub-dungeons-2026-08-26", kind: "third-party", publisher: "AION2Hub", label: "Aion 2 Dungeons & Instances Guide", url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "Aion 2 地下城与副本指南", en: "Aion 2 Dungeons & Instances Guide", fr: "Guide des donjons et instances d'Aion 2", de: "Aion 2 Dungeons & Instanzen-Guide", es: "Guía de mazmorras e instancias de Aion 2", ja: "Aion 2 ダンジョン＆インスタンスガイド", "pt-br": "Guia de masmorras e instâncias de Aion 2", ru: "Руководство по подземельям и инстансам Aion 2", ko: "Aion 2 던전 및 인스턴스 가이드", "zh-hant": "Aion 2 地下城與副本指南", }, "https://aion2hub.com/"), };
const source3: ContentSource = { id: "pcgamesn-dungeons-2026-08-26", kind: "third-party", publisher: "PCGamesN", label: "Aion 2 dungeon content preview", url: "https://www.pcgamesn.com/aion-2/dungeons", publishedAt: "2026-06-01", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "PCGamesN Aion 2 地下城内容预览", en: "PCGamesN Aion 2 dungeon content preview", fr: "Aperçu du contenu des donjons d'Aion 2", de: "PCGamesN Aion 2 Dungeon-Inhalte Vorschau", es: "Vista previa del contenido de mazmorras de Aion 2", ja: "PCGamesN Aion 2 ダンジョンコンテンツプレビュー", "pt-br": "Prévia do conteúdo de masmorras de Aion 2", ru: "Превью контента подземелий Aion 2", ko: "PCGamesN Aion 2 던전 콘텐츠 미리보기", "zh-hant": "PCGamesN Aion 2 地下城內容預覽", }, "https://www.pcgamesn.com/aion-2/dungeons"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "地下城指南配图", caption: "NC 官方配图；AION 2 副本内容。" }, en: { alt: "Dungeon guide image", caption: "Official NC artwork; AION 2 dungeon content." }, fr: { alt: "Image du guide des donjons", caption: "Visuel officiel NC ; contenu des donjons d'AION 2." }, de: { alt: "Dungeon-Guide-Bild", caption: "Offizielles NC-Artwork; AION 2 Dungeon-Inhalte." }, es: { alt: "Imagen de la guía de mazmorras", caption: "Arte oficial de NC; contenido de mazmorras de AION 2." }, ja: { alt: "ダンジョンガイド画像", caption: "NC公式アートワーク；AION 2 ダンジョンコンテンツ。" }, "pt-br": { alt: "Imagem do guia de masmorras", caption: "Arte oficial da NC; conteúdo de masmorras do AION 2." }, ru: { alt: "Изображение гайда по подземельям", caption: "Официальный арт NC; контент подземелий AION 2." }, ko: { alt: "던전 가이드 이미지", caption: "NC 공식 이미지; AION 2 던전 콘텐츠." }, "zh-hant": { alt: "地下城指南配圖", caption: "NC 官方配圖；AION 2 副本內容。" }, }, };

export const trendingAugust26Article2: ContentEntry = {
  section: "guides", slug: "aion-2-dungeon-guide", schemaType: "Article",
  publishedAt: "2026-08-26", updatedAt: "2026-08-26", readingMinutes: 6,
  publication: publishedVerified,
  sources: [source1, source2, source3],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-endgame-gear-guide" },
    { kind: "content", section: "guides", slug: "aion-2-world-bosses-guide" },
    { kind: "content", section: "guides", slug: "aion-2-solo-player-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "DUNGEON GUIDE", title: "AION 2 Dungeon Guide: All Instances, Bosses & Rewards", description: "Complete guide to all AION 2 dungeons and instances. Covers level requirements, boss mechanics, loot tables, and strategies for solo and group content.", intro: "AION 2 offers a variety of dungeons and instances for players of all levels and group sizes. From solo-friendly story dungeons to challenging endgame raids, this guide covers every instance available at launch, including boss mechanics, loot tables, and recommended strategies.", sourceNote: "Based on the official NCSoft dungeon guide, AION2Hub's instance guide, and PCGamesN's dungeon content preview.", keywords: ["Aion 2 dungeons", "Aion 2 instances", "Aion 2 dungeon guide", "Aion 2 boss mechanics", "Aion 2 dungeon rewards"],
      sections: [
        section("leveling-dungeons", "Leveling Dungeons (Level 20-45)", ["AION 2 features several leveling dungeons designed to introduce players to group content mechanics. These dungeons are accessible through the main story quest and provide essential gear upgrades and experience bonuses. Most leveling dungeons have a normal mode for solo players and a party mode for groups.", "The first dungeon, the Fire Temple (level 20), is a faction-specific instance that teaches basic mechanics such as boss positioning, interrupt rotations, and AoE avoidance. The second dungeon, the Abyss Depths (level 30), introduces aerial combat mechanics within an instanced environment.", "The leveling dungeon tier culminates with the Draconian Bastion (level 40), which requires a full party of five players. This dungeon drops some of the best pre-endgame gear and introduces mechanics that carry into endgame dungeons, such as tank swaps and healing checks."]),
        section("endgame-dungeons", "Endgame Dungeons (Level 50)", ["At level 50, players gain access to the endgame dungeon rotation. These dungeons are designed for max-level characters and require coordinated group play. Each endgame dungeon has a specific gear slot focus, encouraging players to run multiple dungeons to complete their gear sets.", "The Abyss Citadel is a 5-player dungeon focused on PvE content with PvP elements — players can flag for PvP within the dungeon for additional rewards. The boss fights require precise positioning and mechanic execution. The dungeon has a weekly lockout system.", "The Sanctum Library is a pure PvE dungeon with complex boss mechanics. Each of the four bosses has unique mechanics that require specific role assignments. The final boss drops the highest ilevel weapons available outside of raids."]),
        section("expeditions", "Expeditions (8-Player Content)", ["Expeditions are AION 2's 8-player content, accessible at level 50. These are designed for organized groups and require voice communication for the harder difficulties. Expeditions have a weekly lockout and drop the best gear outside of full raids.", "The Dark Poeta Expedition is an Elyos-themed instance that requires players to navigate through corrupted zones while managing environmental hazards. The Asmodian equivalent, the Void Forge Expedition, features a volcanic setting with unique mechanics.", "Both expeditions share a similar structure: three bosses with escalating difficulty, followed by a final boss that requires flawless execution. Expeditions are the primary source of upgrade materials for the endgame enhancement system."]),
        section("raid-overview", "Raids (12-Player Content)", ["The pinnacle of AION 2's PvE content is the 12-player raid. The launch raid, 'The Eternity Breach,' features seven bosses across four wings. Each wing has its own theme and mechanics, culminating in the final boss encounter that requires perfect coordination from all 12 players.", "Raid difficulty is organized into three tiers: Normal, Heroic, and Mythic. Normal mode is accessible through the group finder tool. Heroic and Mythic require pre-formed groups and have additional mechanics, tighter enrage timers, and exclusive loot drops.", "Raid lockouts are shared across difficulties — completing a boss on Normal locks it for the week on all difficulties. This encourages players to start on the highest difficulty they can handle. Raid progression is tracked per-character, not per-account."]),
        section("dungeon-tips", "Dungeon Tips & Strategies", ["For new groups, communication is key. Assign roles before entering: main tank, off-tank, healer, and DPS. Mark targets for crowd control and interrupt rotations. Learn boss mechanics by watching positioning markers and paying attention to visual cues.", "Use consumables before boss fights: food buffs, potions, and scrolls provide significant stat boosts. Coordinate cooldown usage for major damage phases. Save your class's major defensive cooldowns for the boss's enrage phase or critical mechanics.", "After each dungeon run, review the death recap to understand what killed you and adjust your positioning and cooldown usage accordingly. Building a regular group with consistent players is the fastest way to progress through endgame content."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "地下城指南", title: "AION 2 地下城指南：所有副本、首领与奖励", description: "完整的 AION 2 地下城和副本指南。涵盖等级要求、首领机制、掉落表和策略。", intro: "AION 2 提供多种地下城和副本，适合不同等级和队伍规模的玩家。", sourceNote: "基于 NCSoft 官方地下城指南、AION2Hub 的副本指南和 PCGamesN 的预览。", keywords: ["Aion 2 地下城", "Aion 2 副本", "Aion 2 地下城指南"],
      sections: [
        section("leveling-dungeons", "升级地下城（20-45 级）", ["AION 2 设有多个升级地下城。第一个副本是火之神殿（20 级），适合单人玩家。", "深渊之渊（30 级）引入空中战斗机制。龙族堡垒（40 级）需要五人队伍。"]),
        section("endgame-dungeons", "终局地下城（50 级）", ["50 级后可进入终局副本轮换。每个副本有特定的装备部位掉落。", "深渊要塞是 5 人副本，包含 PvP 元素。圣殿图书馆是纯 PvE 副本。"]),
        section("expeditions", "远征（8 人内容）", ["远征是 8 人内容，需要语音沟通。每周锁定，掉落最佳装备。", "黑暗 Poeta 远征和虚空熔炉远征各有独特机制。"]),
        section("raid-overview", "团队副本（12 人内容）", ["最高级 PvE 内容是 12 人团队副本。'永恒裂隙'有 7 个首领。", "难度分为普通、英雄和神话三级。"]),
        section("dungeon-tips", "地下城技巧与策略", ["进入前分配好角色。使用消耗品提升属性。", "查看死亡回放了解你的死亡原因并调整策略。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "던전 가이드", title: "AION 2 던전 가이드", description: "모든 AION 2 던전과 인스턴스에 대한 완벽한 가이드.", intro: "AION 2는 다양한 던전과 인스턴스를 제공합니다.", sourceNote: "NCSoft 공식 가이드, AION2Hub, PCGamesN 기반.", keywords: ["Aion 2 던전", "Aion 2 인스턴스", "Aion 2 던전 가이드"],
      sections: [
        section("leveling-dungeons", "레벨링 던전", ["레벨 20-45용 던전. 화염의 신전, 심연의 나락, 드라코니안 요새."]),
        section("endgame-dungeons", "엔드게임 던전", ["레벨 50 던전. 심연 성채와 성소 도서관."]),
        section("expeditions", "원정대", ["8인 콘텐츠. 어둠의 Poeta와 공허의 용광로."]),
        section("raid-overview", "공격대", ["12인 콘텐츠. '영원의 균열' 7명의 보스."]),
        section("dungeon-tips", "팁과 전략", ["역할 할당. 소모품 사용. 사망 기록 확인."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "ダンジョンガイド", title: "AION 2 ダンジョンガイド", description: "すべてのAION 2ダンジョンとインスタンスの完全ガイド。", intro: "AION 2は様々なダンジョンとインスタンスを提供します。", sourceNote: "NCSoft公式ガイド、AION2Hub、PCGamesNに基づきます。", keywords: ["Aion 2 ダンジョン", "Aion 2 インスタンス"],
      sections: [
        section("leveling-dungeons", "レベリングダンジョン", ["レベル20-45用。火の神殿、深淵の奈落、ドラコニアン砦。"]),
        section("endgame-dungeons", "エンドゲームダンジョン", ["レベル50ダンジョン。深淵シタデルと聖堂図書館。"]),
        section("expeditions", "遠征", ["8人コンテンツ。闇のPoetaと虚空の炉。"]),
        section("raid-overview", "レイド", ["12人コンテンツ。「永遠の裂け目」7体のボス。"]),
        section("dungeon-tips", "ヒントと戦略", ["役割分担。消耗品使用。デスレック確認。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE DES DONJONS", title: "Guide des donjons d'AION 2", description: "Guide complet de tous les donjons et instances d'AION 2.", intro: "AION 2 propose divers donjons et instances.", sourceNote: "Basé sur le guide officiel NCSoft, AION2Hub et PCGamesN.", keywords: ["Aion 2 donjons", "Aion 2 instances"],
      sections: [
        section("leveling-dungeons", "Donjons de niveau", ["Niveaux 20-45. Temple du Feu, Abysses, Bastion Draconien."]),
        section("endgame-dungeons", "Donjons de fin de jeu", ["Donjons niveau 50. Citadelle des Abysses, Bibliothèque du Sanctum."]),
        section("expeditions", "Expéditions", ["Contenu 8 joueurs. Poeta des Ténèbres, Forge du Vide."]),
        section("raid-overview", "Raids", ["Contenu 12 joueurs. 'La Brèche de l'Éternité' 7 boss."]),
        section("dungeon-tips", "Conseils", ["Attribution des rôles. Consommables. Revoir les morts."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "DUNGEON-GUIDE", title: "AION 2 Dungeon-Guide", description: "Vollständiger Guide zu allen AION 2 Dungeons.", intro: "AION 2 bietet verschiedene Dungeons und Instanzen.", sourceNote: "Basierend auf dem offiziellen NCSoft-Guide, AION2Hub und PCGamesN.", keywords: ["Aion 2 Dungeons", "Aion 2 Instanzen"],
      sections: [
        section("leveling-dungeons", "Level-Dungeons", ["Stufe 20-45. Feuer-Tempel, Abgrundtiefen, Drachenfeste."]),
        section("endgame-dungeons", "Endgame-Dungeons", ["Stufe-50-Dungeons. Abgrundzitadelle, Sanktumsbibliothek."]),
        section("expeditions", "Expeditionen", ["8-Spieler-Inhalt. Dunkle Poeta, Leerschmiede."]),
        section("raid-overview", "Raids", ["12-Spieler-Inhalt. 'Der Ewigkeitsriss' 7 Bosse."]),
        section("dungeon-tips", "Tipps", ["Rollenverteilung. Verbrauchsgegenstände. Todesrückblick."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE MAZMORRAS", title: "Guía de mazmorras de AION 2", description: "Guía completa de todas las mazmorras e instancias de AION 2.", intro: "AION 2 ofrece varias mazmorras e instancias.", sourceNote: "Basado en la guía oficial de NCSoft, AION2Hub y PCGamesN.", keywords: ["Aion 2 mazmorras", "Aion 2 instancias"],
      sections: [
        section("leveling-dungeons", "Mazmorras de nivel", ["Niveles 20-45. Templo de Fuego, Profundidades Abisales, Bastión Draco."]),
        section("endgame-dungeons", "Mazmorras finales", ["Mazmorras nivel 50. Ciudadela Abisal, Biblioteca del Sanctum."]),
        section("expeditions", "Expediciones", ["Contenido 8 jugadores. Poeta Oscura, Forja del Vacío."]),
        section("raid-overview", "Incursiones", ["Contenido 12 jugadores. 'La Brecha de la Eternidad' 7 jefes."]),
        section("dungeon-tips", "Consejos", ["Asignación de roles. Consumibles. Revisar muertes."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE MASMORRAS", title: "Guia de masmorras do AION 2", description: "Guia completo de todas as masmorras e instâncias do AION 2.", intro: "AION 2 oferece várias masmorras e instâncias.", sourceNote: "Baseado no guia oficial NCSoft, AION2Hub e PCGamesN.", keywords: ["Aion 2 masmorras", "Aion 2 instâncias"],
      sections: [
        section("leveling-dungeons", "Masmorras de evolução", ["Níveis 20-45. Templo do Fogo, Profundezas Abissais, Bastião Draconiano."]),
        section("endgame-dungeons", "Masmorras finais", ["Masmorras nível 50. Cidadela Abissal, Biblioteca do Santuário."]),
        section("expeditions", "Expedições", ["Conteúdo 8 jogadores. Poeta Sombria, Forja do Vazio."]),
        section("raid-overview", "Investidas", ["Conteúdo 12 jogadores. 'A Brecha da Eternidade' 7 chefes."]),
        section("dungeon-tips", "Dicas", ["Atribuição de funções. Consumíveis. Revisar mortes."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ГАЙД ПО ПОДЗЕМЕЛЬЯМ", title: "Гайд по подземельям AION 2", description: "Полное руководство по всем подземельям и инстансам AION 2.", intro: "AION 2 предлагает разнообразные подземелья и инстансы.", sourceNote: "Основано на официальном гайде NCSoft, AION2Hub и PCGamesN.", keywords: ["Aion 2 подземелья", "Aion 2 инстансы"],
      sections: [
        section("leveling-dungeons", "Подземелья для прокачки", ["Уровни 20-45. Храм Огня, Бездны, Драконий Бастион."]),
        section("endgame-dungeons", "Эндгейм подземелья", ["Подземелья 50 уровня. Цитадель Бездны, Библиотека Санктума."]),
        section("expeditions", "Экспедиции", ["Контент на 8 игроков. Темная Поэта, Кузница Пустоты."]),
        section("raid-overview", "Рейды", ["Контент на 12 игроков. 'Разлом Вечности' 7 боссов."]),
        section("dungeon-tips", "Советы", ["Распределение ролей. Расходники. Просмотр смертей."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "地下城指南", title: "AION 2 地下城指南", description: "所有 AION 2 地下城和副本的完整指南。", intro: "AION 2 提供多種地下城和副本。", sourceNote: "基於 NCSoft 官方指南、AION2Hub 和 PCGamesN。", keywords: ["Aion 2 地下城", "Aion 2 副本"],
      sections: [
        section("leveling-dungeons", "升級地下城", ["20-45 級。火之神殿、深淵之淵、龍族堡壘。"]),
        section("endgame-dungeons", "終局地下城", ["50 級地下城。深淵要塞、聖殿圖書館。"]),
        section("expeditions", "遠征", ["8 人內容。黑暗 Poeta、虛空熔爐。"]),
        section("raid-overview", "團隊副本", ["12 人內容。「永恆裂隙」7 個首領。"]),
        section("dungeon-tips", "技巧與策略", ["角色分配。消耗品使用。死亡回顧。"]),
      ],
    }),
  },
};