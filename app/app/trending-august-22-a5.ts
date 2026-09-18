import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-22-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 5 — Flight System Guide */

const flightSource1: ContentSource = { id: "aion2hub-flight-2026-08-22", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Flight System Overview", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-22", verifiedAt: "2026-08-22", localizations: localizations({ "zh-hans": "AION 2 飞行系统概述", en: "AION 2 Flight System Overview", fr: "Aperçu du système de vol d'AION 2", de: "AION 2 Flugsystem-Übersicht", es: "Resumen del sistema de vuelo de AION 2", ja: "AION 2 飛行システム概要", "pt-br": "Visão geral do sistema de voo de AION 2", ru: "Обзор полетной системы AION 2", ko: "AION 2 비행 시스템 개요", "zh-hant": "AION 2 飛行系統概述", }, "https://aion2hub.com/"), };
const flightSource2: ContentSource = { id: "pcgamesn-flight-2026-08-22", kind: "third-party", publisher: "PCGamesN", label: "Aion 2 is an MMO for character creation enthusiasts, and it has the looks to back it up", url: "https://www.pcgamesn.com/aion-2/for-character-creation-enthusiasts", publishedAt: "2026-06-01", retrievedAt: "2026-08-22", verifiedAt: "2026-08-22", localizations: localizations({ "zh-hans": "PCGamesN Aion 2 预览——飞行与角色创建", en: "PCGamesN Aion 2 Preview — Flight & Character Creation", fr: "Aperçu PCGamesN d'Aion 2 — Vol et création de personnage", de: "PCGamesN Aion 2 Vorschau — Flug und Charaktererstellung", es: "Vista previa de PCGamesN de Aion 2 — Vuelo y creación de personajes", ja: "PCGamesN Aion 2 プレビュー — 飛行とキャラクター作成", "pt-br": "Prévia do PCGamesN de Aion 2 — Voo e criação de personagem", ru: "Превью PCGamesN Aion 2 — Полёт и создание персонажа", ko: "PCGamesN Aion 2 미리보기 — 비행 및 캐릭터 생성", "zh-hant": "PCGamesN Aion 2 預覽——飛行與角色創建", }, "https://www.pcgamesn.com/aion-2/for-character-creation-enthusiasts"), };
const flightSource3: ContentSource = { id: "ign-flight-2026-08-22", kind: "third-party", publisher: "IGN", label: "AION 2 — Official Spread Your Wings Trailer", url: "https://www.ign.com/videos/aion-2-official-spread-your-wings-teaser", publishedAt: "2026-06-01", retrievedAt: "2026-08-22", verifiedAt: "2026-08-22", localizations: localizations({ "zh-hans": "AION 2 — 官方展翅高飞预告片", en: "AION 2 — Official Spread Your Wings Trailer", fr: "AION 2 — Bande-annonce officielle Spread Your Wings", de: "AION 2 — Offizieller Spread Your Wings Trailer", es: "AION 2 — Tráiler oficial Spread Your Wings", ja: "AION 2 — 公式スプレッドユアウィングストレーラー", "pt-br": "AION 2 — Trailer oficial Spread Your Wings", ru: "AION 2 — Официальный трейлер Spread Your Wings", ko: "AION 2 — 공식 스프레드 유어 윙 트레일러", "zh-hant": "AION 2 — 官方展翅高飛預告片", }, "https://www.ign.com/videos/aion-2-official-spread-your-wings-teaser"), };
const flightHero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "飞行系统指南配图", caption: "NC 官方配图；Aion 2 的飞行系统是核心玩法机制。" }, en: { alt: "Flight system guide image", caption: "Official NC artwork; Aion 2's flight system is a core gameplay mechanic." }, fr: { alt: "Image du guide de vol", caption: "Visuel officiel NC ; le système de vol est un élément central du gameplay." }, de: { alt: "Flugsystem-Guide-Bild", caption: "Offizielles NC-Artwork; das Flugsystem ist eine Kernmechanik." }, es: { alt: "Imagen de la guía de vuelo", caption: "Arte oficial de NC; el sistema de vuelo es una mecánica central." }, ja: { alt: "飛行システムガイド画像", caption: "NC公式アートワーク；飛行システムはコアゲームプレイメカニクスです。" }, "pt-br": { alt: "Imagem do guia do sistema de voo", caption: "Arte oficial da NC; o sistema de voo é uma mecânica central do jogo." }, ru: { alt: "Изображение гайда по полетной системе", caption: "Официальный арт NC; полетная система — ключевая механика геймплея." }, ko: { alt: "비행 시스템 가이드 이미지", caption: "NC 공식 이미지입니다. 비행 시스템은 핵심 게임플레이 메커니즘입니다." }, "zh-hant": { alt: "飛行系統指南配圖", caption: "NC 官方配圖；Aion 2 的飛行系統是核心玩法機制。" }, }, };

export const trendingAugust22Article5: ContentEntry = {
  section: "guides", slug: "aion-2-flight-system-guide", schemaType: "Article",
  publishedAt: "2026-08-22", updatedAt: "2026-08-22", readingMinutes: 5,
  publication: publishedVerified,
  sources: [flightSource1, flightSource2, flightSource3],
  heroImage: flightHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-mounts-and-wings-guide" },
    { kind: "content", section: "guides", slug: "aion-2-pvp-guide" },
    { kind: "content", section: "guides", slug: "aion-2-character-customization-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "FLIGHT SYSTEM", title: "Aion 2 Flight System & Aerial Navigation Guide", description: "Master Aion 2's unique flight system. Learn flight mechanics, aerial combat, wing upgrades, and how to navigate a world 36 times larger than the original Aion.", intro: "Flight is the defining feature of Aion 2. Built on Unreal Engine 5 across a world 36 times larger than the original Aion, the sequel transforms aerial mobility from a travel convenience into a core combat and exploration mechanic. This guide covers everything from basic flight controls to advanced aerial combat techniques.", sourceNote: "Based on AION2Hub's flight system overview, PCGamesN's preview, and IGN's official trailer content. Flight mechanics confirmed from KR live server and official materials.", keywords: ["Aion 2 flight system", "Aion 2 aerial combat", "Aion 2 wing upgrades", "Aion 2 flying guide", "Aion 2 flight mechanics"],
      sections: [
        section("flight-basics", "Flight Basics: Mechanics & Controls", ["Flight in Aion 2 is available from the early levels, unlike the original Aion which restricted flight to high-level content. The flight system uses a stamina-based mechanic — your flight gauge depletes while airborne and regenerates while on the ground. Managing this gauge is the first skill every player must learn.", "Basic controls include ascend/descend, forward thrust, and directional steering. The flight movement is more fluid and responsive than the original Aion, with less inertia and tighter turning radius. You can also hover in place, which is essential for aerial combat positioning.", "Flight is available in most outdoor zones, with some indoor areas and dungeons restricting flight. The open world is designed vertically — you will frequently need to fly to reach quest objectives, hidden areas, and scenic viewpoints that offer fast travel points."]),
        section("aerial-combat", "Aerial Combat: Fighting in the Sky", ["Aion 2 is the only MMORPG built specifically for aerial combat. Every class has unique airborne skills and abilities that differ from their ground rotations. The combat system fully supports three-dimensional movement — positioning, elevation, and momentum all matter.", "Key aerial combat techniques include: dive bombing (gaining altitude then diving for bonus damage), kiting (using vertical space to avoid ground-based attacks), and aerial crowd control (knock-up and knock-down effects that are more impactful in the air).", "PvP aerial combat is where the system truly shines. The Abyss zones feature dedicated air combat arenas where 1v1 and group aerial battles take place. Class balance is different in the air — some classes that are weaker on the ground excel in aerial combat, and vice versa."]),
        section("wing-upgrades", "Wing Upgrades & Customization", ["Wings are not just cosmetic — they are a progression system with tangible gameplay benefits. Wings can be upgraded through multiple tiers, each improving flight speed, maneuverability, and flight gauge capacity.", "Wing customization is extensive. You can change wing appearance, color, and particle effects independently of their stats. Some wings are earned through achievements, while others come from expeditions, PvP ranking, or the Premium Track.", "Higher-tier wings unlock special abilities like emergency dash (a quick directional dodge in the air), wing shield (temporary damage reduction while flying), and airstrike (an aerial AoE attack available to all classes while winged)."]),
        section("exploration", "Flight Exploration: A World 36x Larger", ["Aion 2's world is 36 times larger than the original Aion, and flight is the primary way to explore it. The world is divided into floating continents, sky islands, and ground-level zones connected by air passages.", "Exploration rewards include: hidden treasure chests on floating islands, scenic viewpoints that serve as fast travel points, rare resource nodes accessible only by precise flying, and secret boss encounters in hard-to-reach locations.", "The flight exploration system also includes wind currents — visible air streams that boost your flight speed when you fly through them. Mastering wind currents is key to efficient travel across the vast world."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "飞行系统", title: "Aion 2 飞行系统与空中导航指南", description: "掌握 Aion 2 独特的飞行系统。学习飞行机制、空中战斗、翅膀升级，以及在比原版大 36 倍的世界中导航。", intro: "飞行是 Aion 2 的标志性特征。在比原版大 36 倍的虚幻引擎 5 世界中，飞行从旅行便利工具转变为核心战斗与探索机制。", sourceNote: "基于 AION2Hub 飞行系统概述、PCGamesN 预览与 IGN 官方预告片。", keywords: ["Aion 2 飞行系统", "Aion 2 空中战斗", "Aion 2 翅膀升级", "Aion 2 飞行指南", "Aion 2 飞行机制"],
      sections: [
        section("flight-basics", "飞行基础：机制与控制", ["Aion 2 的飞行系统从早期等级即可使用，使用耐力机制——飞行槽在空中消耗，在地面恢复。", "基本控制包括上升/下降、前冲和方向转向。飞行比原版更流畅，惯性更小，转弯半径更紧。", "飞行在大多数户外区域可用，一些室内区域和地下城限制飞行。"]),
        section("aerial-combat", "空中战斗：在空中作战", ["Aion 2 是唯一专为空中战斗打造的 MMORPG。每个职业都有独特的空中技能和能力。", "关键空中战斗技巧包括：俯冲轰炸、放风筝（利用垂直空间躲避攻击）和空中群体控制。", "PvP 空中战斗在深渊区域中设有专门的空战竞技场。"]),
        section("wing-upgrades", "翅膀升级与自定义", ["翅膀不仅是装饰——它们是一个有实际游戏收益的养成系统。可通过多个等级升级。", "翅膀自定义非常丰富，可独立于属性更改外观、颜色和粒子效果。", "更高级的翅膀解锁特殊能力：紧急闪避、翅膀护盾和空袭。"]),
        section("exploration", "飞行探索：36 倍大的世界", ["Aion 2 的世界是原版的 36 倍，飞行是探索的主要方式。", "探索奖励包括：浮岛上的隐藏宝箱、观景点快速旅行点、稀有资源节点和秘密首领遭遇。", "风流系统——可见的气流可在穿越时提升飞行速度。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "비행 시스템", title: "Aion 2 비행 시스템 및 항공 안내 가이드", description: "Aion 2의 독특한 비행 시스템을 마스터하세요. 비행 메커니즘, 공중 전투, 날개 업그레이드 정보.", intro: "비행은 Aion 2의 핵심 기능입니다. 언리얼 엔진 5로 구축된 세계에서 비행은 핵심 전투 및 탐험 메커니즘입니다.", sourceNote: "AION2Hub, PCGamesN, IGN 공식 자료에 기반합니다.", keywords: ["Aion 2 비행 시스템", "Aion 2 공중 전투", "Aion 2 날개 업그레이드"],
      sections: [
        section("flight-basics", "비행 기본", ["조기 레벨부터 비행 가능. 스태미나 기반 비행 게이지 시스템."]),
        section("aerial-combat", "공중 전투", ["모든 직업에 고유한 공중 기술. 급강하 폭격, 공중 군중 제어."]),
        section("wing-upgrades", "날개 업그레이드", ["여러 등급으로 업그레이드 가능. 외형 및 색상 사용자 정의."]),
        section("exploration", "비행 탐험", ["36배 더 큰 세계. 바람 흐름 시스템으로 속도 부스트."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "飛行システム", title: "Aion 2 飛行システム＆空中航行ガイド", description: "Aion 2のユニークな飛行システムをマスター。飛行メカニクス、空中戦闘、翼のアップグレード情報。", intro: "飛行はAion 2の特徴的な機能です。Unreal Engine 5で構築された世界で、飛行は中核的な戦闘と探索メカニクスです。", sourceNote: "AION2Hub、PCGamesN、IGN公式資料に基づきます。", keywords: ["Aion 2 飛行システム", "Aion 2 空中戦闘", "Aion 2 翼アップグレード"],
      sections: [
        section("flight-basics", "飛行の基本", ["早期レベルから飛行可能。スタミナベースの飛行ゲージシステム。"]),
        section("aerial-combat", "空中戦闘", ["全クラスに固有の空中スキル。急降下爆撃、空中クラウドコントロール。"]),
        section("wing-upgrades", "翼のアップグレード", ["複数ティアでアップグレード可能。外見と色のカスタマイズ。"]),
        section("exploration", "飛行探索", ["36倍の広さの世界。気流システムで速度ブースト。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "SYSTÈME DE VOL", title: "Guide du système de vol et de navigation aérienne d'Aion 2", description: "Maîtrisez le système de vol unique d'Aion 2. Mécaniques de vol, combat aérien, améliorations d'ailes.", intro: "Le vol est la caractéristique emblématique d'Aion 2. Sous Unreal Engine 5, le vol devient une mécanique centrale.", sourceNote: "Basé sur l'aperçu AION2Hub, la préview PCGamesN et la bande-annonce IGN.", keywords: ["Aion 2 système de vol", "Aion 2 combat aérien", "Aion 2 ailes"],
      sections: [
        section("flight-basics", "Bases du vol", ["Vol disponible dès les premiers niveaux. Jauge de vol basée sur l'endurance."]),
        section("aerial-combat", "Combat aérien", ["Compétences aériennes uniques par classe. Plongée, kiting vertical, contrôle de foule aérien."]),
        section("wing-upgrades", "Améliorations d'ailes", ["Plusieurs paliers. Apparence et couleur personnalisables."]),
        section("exploration", "Exploration", ["Monde 36x plus grand. Courants de vent pour booster la vitesse."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "FLUGSYSTEM", title: "Aion 2 Flugsystem & Luftfahrt-Guide", description: "Meistern Sie das einzigartige Flugsystem von Aion 2. Flugmechaniken, Luftkampf, Flügel-Upgrades.", intro: "Fliegen ist das bestimmende Merkmal von Aion 2. In Unreal Engine 5 wird Fliegen zur Kernmechanik.", sourceNote: "Basierend auf AION2Hub, PCGamesN-Vorschau und IGN-Trailer.", keywords: ["Aion 2 Flugsystem", "Aion 2 Luftkampf", "Aion 2 Flügel"],
      sections: [
        section("flight-basics", "Fluggrundlagen", ["Flug ab frühen Stufen verfügbar. Ausdauerbasiertes Flugmesssystem."]),
        section("aerial-combat", "Luftkampf", ["Einzigartige Luftfähigkeiten pro Klasse. Sturzflug, vertikales Kiting."]),
        section("wing-upgrades", "Flügel-Upgrades", ["Mehrere Stufen. Anpassbares Aussehen und Farbe."]),
        section("exploration", "Flugerkundung", ["36x größere Welt. Windströmungen für Geschwindigkeitsboost."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "SISTEMA DE VUELO", title: "Guía del sistema de vuelo y navegación aérea de Aion 2", description: "Domina el sistema de vuelo único de Aion 2. Mecánicas de vuelo, combate aéreo, mejoras de alas.", intro: "El vuelo es la característica definitoria de Aion 2. En Unreal Engine 5, el vuelo se convierte en una mecánica central.", sourceNote: "Basado en la descripción general de AION2Hub, la vista previa de PCGamesN y el tráiler de IGN.", keywords: ["Aion 2 sistema de vuelo", "Aion 2 combate aéreo", "Aion 2 alas"],
      sections: [
        section("flight-basics", "Fundamentos del vuelo", ["Vuelo disponible desde niveles tempranos. Sistema de medidor de vuelo basado en resistencia."]),
        section("aerial-combat", "Combate aéreo", ["Habilidades aéreas únicas por clase. Buceo, kiting vertical, control de masas aéreo."]),
        section("wing-upgrades", "Mejoras de alas", ["Varios niveles. Apariencia y color personalizables."]),
        section("exploration", "Exploración", ["Mundo 36 veces más grande. Corrientes de viento para aumentar velocidad."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "SISTEMA DE VOO", title: "Guia do sistema de voo e navegação aérea de Aion 2", description: "Domine o sistema de voo único de Aion 2. Mecânicas de voo, combate aéreo, melhorias de asas.", intro: "O voo é a característica definidora de Aion 2. No Unreal Engine 5, o voo se torna uma mecânica central.", sourceNote: "Baseado na visão geral AION2Hub, na prévia PCGamesN e no trailer IGN.", keywords: ["Aion 2 sistema de voo", "Aion 2 combate aéreo", "Aion 2 asas"],
      sections: [
        section("flight-basics", "Fundamentos do voo", ["Voo disponível desde níveis iniciais. Sistema de medidor de voo baseado em resistência."]),
        section("aerial-combat", "Combate aéreo", ["Habilidades aéreas únicas por classe. Mergulho, kiting vertical, controle de multidão aéreo."]),
        section("wing-upgrades", "Melhorias de asas", ["Vários níveis. Aparência e cor personalizáveis."]),
        section("exploration", "Exploração", ["Mundo 36x maior. Correntes de vento para aumentar velocidade."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ПОЛЕТНАЯ СИСТЕМА", title: "Руководство по полетной системе и воздушной навигации Aion 2", description: "Освойте уникальную полетную систему Aion 2. Механики полета, воздушный бой, улучшения крыльев.", intro: "Полёт — определяющая особенность Aion 2. На Unreal Engine 5 полёт становится ключевой механикой.", sourceNote: "Основано на обзоре AION2Hub, превью PCGamesN и трейлере IGN.", keywords: ["Aion 2 полетная система", "Aion 2 воздушный бой", "Aion 2 крылья"],
      sections: [
        section("flight-basics", "Основы полета", ["Полет доступен с ранних уровней. Система счетчика полета на основе выносливости."]),
        section("aerial-combat", "Воздушный бой", ["Уникальные воздушные навыки для каждого класса. Пикирование, вертикальное уклонение."]),
        section("wing-upgrades", "Улучшения крыльев", ["Несколько уровней. Настраиваемая внешность и цвет."]),
        section("exploration", "Полетное исследование", ["Мир в 36 раз больше. Воздушные потоки для ускорения."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "飛行系統", title: "Aion 2 飛行系統與空中導航指南", description: "掌握 Aion 2 獨特的飛行系統。學習飛行機制、空中戰鬥、翅膀升級。", intro: "飛行是 Aion 2 的標誌性特徵。在虛幻引擎 5 世界中，飛行成為核心戰鬥與探索機制。", sourceNote: "基於 AION2Hub 飛行系統概述、PCGamesN 預覽與 IGN 官方預告片。", keywords: ["Aion 2 飛行系統", "Aion 2 空中戰鬥", "Aion 2 翅膀升級"],
      sections: [
        section("flight-basics", "飛行基礎", ["早期等級即可飛行。基於耐力的飛行槽系統。"]),
        section("aerial-combat", "空中戰鬥", ["每個職業有獨特空中技能。俯衝轟炸、垂直放風箏。"]),
        section("wing-upgrades", "翅膀升級", ["多個等級。外觀與顏色可自定義。"]),
        section("exploration", "飛行探索", ["36 倍大的世界。氣流系統提升速度。"]),
      ],
    }),
  },
};