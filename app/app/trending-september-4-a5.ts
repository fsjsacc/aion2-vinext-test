import {
  articleCopy,
  localizations,
  guideLabels,
  publishedVerified,
  readingTime,
  section,
} from "./trending-september-4-shared";
import type { ContentSource, ContentHeroImage } from "./content-registry";

// Source 1: Official guide
const abyssGuideSource: ContentSource = {
  id: "ncsoft-abyss-guide",
  kind: "official",
  publisher: "NCSoft",
  label: "AION 2 Official Guide — The Abyss",
  url: "https://aion2.plaync.com/en-us/game/guide/abyss",
  publishedAt: "2026-08-20",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 官方指南 — 深渊",
      en: "AION 2 Official Guide — The Abyss",
      fr: "Guide officiel d'AION 2 — Les Abysses",
      de: "AION 2 Offizieller Leitfaden — Der Abgrund",
      es: "Guía oficial de AION 2 — El Abismo",
      ja: "AION 2 公式ガイド — 深淵",
      "pt-br": "Guia oficial do AION 2 — O Abismo",
      ru: "Официальное руководство AION 2 — Бездна",
      ko: "AION 2 공식 가이드 — 심연",
      "zh-hant": "AION 2 官方指南 — 深淵",
    },
    "https://aion2.plaync.com/en-us/game/guide/abyss",
  ),
};

// Source 2: Community deep dive
const abyssDeepDiveSource: ContentSource = {
  id: "aion2t-abyss-complete-breakdown",
  kind: "third-party",
  publisher: "AION2T",
  label: "AION 2 Abyss System: Complete Breakdown from Korea Server Data",
  url: "https://aion2t.com/guides/abyss-system-complete-guide/",
  publishedAt: "2026-09-01",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 深渊系统：基于韩服数据的完整解析",
      en: "AION 2 Abyss System: Complete Breakdown from Korea Server Data",
      fr: "Système des Abysses d'AION 2 : Analyse complète à partir des données du serveur coréen",
      de: "AION 2 Abgrundsystem: Vollständige Aufschlüsselung aus Korea-Server-Daten",
      es: "Sistema del Abismo de AION 2: Desglose completo de datos del servidor coreano",
      ja: "AION 2 深淵システム：韓国サーバーデータからの完全解析",
      "pt-br": "Sistema Abismal do AION 2: Análise completa de dados do servidor coreano",
      ru: "Система Бездны AION 2: Полный разбор из данных корейского сервера",
      ko: "AION 2 심연 시스템: 한국 서버 데이터의 완전한 분석",
      "zh-hant": "AION 2 深淵系統：基於韓服數據的完整解析",
    },
    "https://aion2t.com/guides/abyss-system-complete-guide/",
  ),
};

// Hero image
const abyssGuideHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1200, height: 630,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/en-us/game/guide/abyss",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 深渊战场全景图", caption: "深渊是AION 2的核心PVP战场，融合种族战争、要塞攻城和资源争夺于一体。" },
    en: { alt: "AION 2 Abyss battleground panoramic view", caption: "The Abyss is AION 2's core PVP battleground, integrating racial warfare, fortress sieges, and resource competition." },
    fr: { alt: "Vue panoramique du champ de bataille des Abysses d'AION 2", caption: "Les Abysses sont le champ de bataille PVP central d'AION 2, intégrant guerre raciale et sièges." },
    de: { alt: "AION 2 Abgrund-Schlachtfeld-Panorama", caption: "Der Abgrund ist AION 2s Kern-PVP-Schlachtfeld mit Rassenkrieg, Festungsbelagerungen und Ressourcenwettbewerb." },
    es: { alt: "Vista panorámica del Abismo de AION 2", caption: "El Abismo es el campo de batalla PVP central de AION 2, con guerra racial, asedios y competencia por recursos." },
    ja: { alt: "AION 2 深淵戦場パノラマビュー", caption: "深淵はAION 2のコアPVP戦場、種族戦争、要塞包囲戦、資源競争が統合。" },
    "pt-br": { alt: "Vista panorâmica do Abismo do AION 2", caption: "O Abismo é o campo de batalha PVP central do AION 2, integrando guerra racial e cercos." },
    ru: { alt: "Панорамный вид поля боя Бездны AION 2", caption: "Бездна — основное PVP-поле боя AION 2 с расовыми войнами, осадами крепостей и конкуренцией за ресурсы." },
    ko: { alt: "AION 2 심연 전장 파노라마 뷰", caption: "심연은 AION 2의 핵심 PVP 전장, 종족 전쟁, 요새 공성전, 자원 경쟁이 통합." },
    "zh-hant": { alt: "AION 2 深淵戰場全景圖", caption: "深淵是AION 2的核心PVP戰場，融合種族戰爭、要塞攻城和資源爭奪於一體。" },
  },
};

export const trendingSeptember4Article5 = {
  section: "guides" as const,
  slug: "aion-2-abyss-system-complete-guide",
  schemaType: "Article" as const,
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  readingMinutes: 12,
  publication: publishedVerified,
  sources: [abyssGuideSource, abyssDeepDiveSource],
  heroImage: abyssGuideHero,
  related: [
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-korea-server-class-tier-guide" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-launch-scale-test-preparation-guide" },
    { kind: "content" as const, section: "news" as const, slug: "aion-2-october-5-launch-countdown-roadmap" },
  ],
  translations: {
    "zh-hans": articleCopy(guideLabels, "zh-hans", 12, {
      eyebrow: "深渊指南",
      title: "AION 2 深渊系统完整指南：战场机制、要塞攻城与资源争夺详解",
      description:
        "全面解析AION 2深渊系统的核心机制，包括三大深渊区域、种族等级系统、要塞攻防战、Artifact争夺和深渊Boss机制，基于韩服运营数据提供实战策略",
      intro:
        "深渊是AION 2最核心也是最具标志性的PVP系统。它不仅是大规模种族战争的舞台，更是要塞攻城、Artifact争夺和顶级Boss战斗的综合战场。本文基于韩服数月运营经验，为你全面解析深渊系统的每个方面。",
      keywords: ["AION 2 深渊", "AION 2 要塞攻城", "AION 2 Artifact", "AION 2 种族战争", "AION 2 PVP指南"],
      sourceNote: "基于 NCSoft 官方深渊指南（2026-08-20）和 AION2T 韩服深渊系统解析（2026-09-01）整理。",
      sections: [
        section(
          "abyss-zones-overview",
          "深渊区域总览",
          "深渊分为三个层级：下层深渊（Reshanta）、中层深渊和上层深渊。下层深渊是入门区域，适合40级以下的玩家，包含基础资源和初级要塞。中层深渊是主要争夺区域，拥有最多的要塞和Artifact，也是种族战争的核心战场。上层深渊是顶级内容，包含最高级Boss和传奇级Artifact，通常需要大型公会协调攻城。",
        ),
        section(
          "race-rank-system",
          "种族等级与深渊点数",
          "每个玩家在深渊中的行为都会获得深渊点数（AP），这些点数决定了你的种族等级（Rank）。种族等级从1星到50星，每个大阶段（10星）提升会解锁新的深渊技能和外观奖励。AP可以通过击杀敌对种族玩家、占领要塞、击杀深渊Boss和完成深渊任务获得。注意：死亡会损失部分AP，所以在高风险区域要谨慎。",
        ),
        section(
          "fortress-siege-mechanics",
          "要塞攻城机制详解",
          "要塞是深渊中的战略据点，每个要塞控制着周围的资源点。攻城战有固定时间表（每周三和周六韩国时间22:00开始），持续约30分钟。攻方需要摧毁要塞的防护壁（需要大量玩家集中攻击），然后占领核心。守方可以修复防护壁并使用要塞炮台反击。占领要塞后，你的种族会获得持续的AP奖励和资源收益。",
        ),
        section(
          "artifact-system",
          "Artifact争夺系统",
          "Artifact是深渊中的特殊战略资源，分为防御型、攻击型和辅助型三类。防御型Artifact为占领方提供要塞增益，攻击型Artifact可以增强种族在战场中的整体能力，辅助型Artifact提供特殊BUFF。每个Artifact有刷新时间，击杀守护Boss后可以获得。大型公会通常会优先争夺高级Artifact。",
        ),
        section(
          "abyss-bosses",
          "深渊Boss机制",
          "深渊中有多种Boss类型：世界Boss（如Nahma）、要塞守护Boss和Artifact守护Boss。世界Boss是最强的存在，需要多个公会联合击杀，掉落传奇级装备。要塞守护Boss在要塞被攻击时会激活，帮助守方抵抗。Artifact守护Boss守护着各个Artifact刷新点，击杀后Artifact归属于击杀者所在种族。",
        ),
      ],
    }),
    en: articleCopy(guideLabels, "en", 12, {
      eyebrow: "ABYSS GUIDE",
      title: "AION 2 Abyss System Complete Guide: Battlefield Mechanics, Fortress Sieges, and Resource Competition",
      description:
        "Comprehensive analysis of AION 2 Abyss system's core mechanics, including three Abyss zones, racial rank system, fortress siege warfare, Artifact competition, and Abyss Boss mechanics, with combat strategies based on Korea server operation data",
      intro:
        "The Abyss is AION 2's most core and iconic PVP system. It's not only the stage for large-scale racial warfare, but also a comprehensive battlefield of fortress sieges, Artifact competition, and top Boss battles. Based on months of Korea server operation experience, this article fully analyzes every aspect of the Abyss system.",
      keywords: ["AION 2 Abyss", "AION 2 fortress siege", "AION 2 Artifact", "AION 2 racial warfare", "AION 2 PVP guide"],
      sourceNote: "Based on NCSoft's official Abyss guide (August 20, 2026) and AION2T Korea server Abyss system breakdown (September 1, 2026).",
      sections: [
        section(
          "abyss-zones-overview",
          "Abyss Zones Overview",
          "The Abyss is divided into three tiers: Lower Reshanta, Middle Reshanta, and Upper Reshanta. Lower Reshanta is the entry area, suitable for players below level 40, containing basic resources and初级 fortresses. Middle Reshanta is the main contention area, with the most fortresses and Artifacts, and the core racial warfare battlefield. Upper Reshanta is top-tier content, containing the highest-level Bosses and legendary Artifacts, usually requiring large guild coordination for sieges.",
        ),
        section(
          "race-rank-system",
          "Racial Rank and Abyss Points",
          "Every player's actions in the Abyss earn Abyss Points (AP), which determine your Racial Rank. Racial Ranks range from 1 star to 50 stars, with each major milestone (every 10 stars) unlocking new Abyss skills and appearance rewards. AP can be earned by killing enemy race players, capturing fortresses, killing Abyss Bosses, and completing Abyss quests. Note: Death causes partial AP loss, so be cautious in high-risk areas.",
        ),
        section(
          "fortress-siege-mechanics",
          "Fortress Siege Mechanics Explained",
          "Fortresses are strategic strongholds in the Abyss, each controlling surrounding resource points. Siege battles have fixed schedules (starting at 22:00 KST every Wednesday and Saturday), lasting approximately 30 minutes. Attackers need to destroy the fortress's barrier (requiring concentrated player attacks), then capture the core. Defenders can repair barriers and use fortress turrets to counter. After capturing a fortress, your race gains continuous AP rewards and resource income.",
        ),
        section(
          "artifact-system",
          "Artifact Competition System",
          "Artifacts are special strategic resources in the Abyss, divided into three types: Defensive, Offensive, and Support. Defensive Artifacts provide fortress buffs to the controlling race, Offensive Artifacts enhance the race's overall battlefield capability, and Support Artifacts provide special BUFFs. Each Artifact has a respawn timer, obtainable after killing its guardian Boss. Large guilds typically prioritize competing for high-level Artifacts.",
        ),
        section(
          "abyss-bosses",
          "Abyss Boss Mechanics",
          "The Abyss contains multiple Boss types: World Bosses (like Nahma), Fortress Guardian Bosses, and Artifact Guardian Bosses. World Bosses are the strongest entities, requiring multiple guilds to defeat, dropping legendary-tier equipment. Fortress Guardian Bosses activate when a fortress is attacked, helping defenders resist. Artifact Guardian Bosses guard each Artifact spawn point; after defeating them, the Artifact belongs to the killer's race.",
        ),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 12, {
      eyebrow: "GUIDE DES ABYSSES",
      title: "Guide complet du système des Abysses d'AION 2 : Mécaniques de champ de bataille, sièges de forteresse et compétition pour les ressources",
      description:
        "Analyse complète des mécaniques centrales du système des Abysses d'AION 2, incluant les trois zones d'Abysses, le système de rang racial, la guerre de siège de forteresse, la compétition d'Artifacts et les mécaniques de Boss des Abysses",
      intro:
        "Les Abysses sont le système PVP le plus central et emblématique d'AION 2. Basé sur des mois d'expérience d'exploitation du serveur coréen.",
      keywords: ["AION 2 Abysses", "Siège de forteresse AION 2", "Artifact AION 2", "Guerre raciale AION 2", "Guide PVP AION 2"],
      sourceNote: "Basé sur le guide officiel des Abysses de NCSoft (20 août 2026) et l'analyse du système des Abysses du serveur coréen par AION2T (1er septembre 2026).",
      sections: [
        section("abyss-zones-overview", "Aperçu des zones d'Abysses", "Les Abysses sont divisées en trois niveaux : Reshanta inférieure, Reshanta moyenne et Reshanta supérieure."),
        section("race-rank-system", "Rang racial et points d'Abysse", "Chaque action dans les Abysses rapporte des points d'Abysse (AP), déterminant votre rang racial de 1 à 50 étoiles."),
        section("fortress-siege-mechanics", "Mécaniques de siège de forteresse", "Les forteresses sont des bastions stratégiques. Les sièges ont des horaires fixes (mercredi et samedi à 22h KST), durant environ 30 minutes."),
        section("artifact-system", "Système de compétition d'Artifacts", "Les Artifacts sont des ressources stratégiques spéciales, divisées en trois types : Défensif, Offensif et Support."),
        section("abyss-bosses", "Mécaniques des Boss des Abysses", "Les Abysses contiennent plusieurs types de Boss : Boss de monde, Boss gardiens de forteresse et Boss gardiens d'Artifact."),
      ],
    }),
    de: articleCopy(guideLabels, "de", 12, {
      eyebrow: "ABGRUND-LEITFADEN",
      title: "AION 2 Abgrundsystem Kompletter Leitfaden: Schlachtfeld-Mechaniken, Festungsbelagerungen und Ressourcenwettbewerb",
      description:
        "Umfassende Analyse der Kernmechaniken des AION 2 Abgrundsystems, einschließlich drei Abgrundzonen, Rassengrad-System, Festungsbelagerung, Artifact-Wettbewerb und Abgrund-Boss-Mechaniken",
      intro:
        "Der Abgrund ist AION 2s zentrales und ikonischstes PVP-System. Basierend auf Monaten der Korea-Server-Betriebserfahrung.",
      keywords: ["AION 2 Abgrund", "AION 2 Festungsbelagerung", "AION 2 Artifact", "AION 2 Rassenkrieg", "AION 2 PVP-Leitfaden"],
      sourceNote: "Basierend auf NCSofts offiziellem Abgrund-Leitfaden (20. August 2026) und der AION2T-Analyse des Abgrundsystems des Korea-Servers (1. September 2026).",
      sections: [
        section("abyss-zones-overview", "Abgrundzonen-Übersicht", "Der Abgrund ist in drei Stufen unterteilt: Untere Reshanta, Mittlere Reshanta und Obere Reshanta."),
        section("race-rank-system", "Rassengrad und Abgrundpunkte", "Jede Aktion im Abgrund verdient Abgrundpunkte (AP), die Ihren Rassengrad von 1 bis 50 Sternen bestimmen."),
        section("fortress-siege-mechanics", "Festungsbelagerungs-Mechaniken", "Festungen sind strategische Stützpunkte. Belagerungen haben feste Zeitpläne (mittwochs und samstags um 22 Uhr KST), dauern etwa 30 Minuten."),
        section("artifact-system", "Artifact-Wettbewerbssystem", "Artifacts sind spezielle strategische Ressourcen, unterteilt in drei Typen: Defensiv, Offensiv und Unterstützung."),
        section("abyss-bosses", "Abgrund-Boss-Mechaniken", "Der Abgrund enthält mehrere Boss-Typen: Weltbosse, Festungswächter-Bosse und Artifact-Wächter-Bosse."),
      ],
    }),
    es: articleCopy(guideLabels, "es", 12, {
      eyebrow: "GUÍA DEL ABISMO",
      title: "Guía completa del sistema del Abismo de AION 2: Mecánicas de campo de batalla, asedios de fortalezas y competencia por recursos",
      description:
        "Análisis completo de las mecánicas centrales del sistema del Abismo de AION 2, incluyendo tres zonas del Abismo, sistema de rango racial, guerra de asedio de fortalezas, competencia de Artifacts y mecánicas de jefes del Abismo",
      intro:
        "El Abismo es el sistema PVP más central e icónico de AION 2. Basado en meses de experiencia de operación del servidor coreano.",
      keywords: ["AION 2 Abismo", "Asedio de fortaleza AION 2", "Artifact AION 2", "Guerra racial AION 2", "Guía PVP AION 2"],
      sourceNote: "Basado en la guía oficial del Abismo de NCSoft (20 de agosto de 2026) y el análisis del sistema del Abismo del servidor coreano de AION2T (1 de septiembre de 2026).",
      sections: [
        section("abyss-zones-overview", "Descripción de zonas del Abismo", "El Abismo se divide en tres niveles: Reshanta inferior, Reshanta media y Reshanta superior."),
        section("race-rank-system", "Rango racial y puntos del Abismo", "Cada acción en el Abismo gana puntos del Abismo (AP), determinando tu rango racial de 1 a 50 estrellas."),
        section("fortress-siege-mechanics", "Mecánicas de asedio de fortalezas", "Las fortalezas son baluartes estratégicos. Los asedios tienen horarios fijos (miércoles y sábado a las 22:00 KST), duran aproximadamente 30 minutos."),
        section("artifact-system", "Sistema de competencia de Artifacts", "Los Artifacts son recursos estratégicos especiales, divididos en tres tipos: Defensivo, Ofensivo y de Soporte."),
        section("abyss-bosses", "Mecánicas de jefes del Abismo", "El Abismo contiene múltiples tipos de jefes: jefes de mundo, jefes guardianes de fortaleza y jefes guardianes de Artifact."),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 12, {
      eyebrow: "深淵ガイド",
      title: "AION 2 深淵システム完全ガイド：戦場メカニクス、要塞包囲戦、資源競争",
      description:
        "AION 2深淵システムのコアメカニクスの包括的分析。3つの深淵エリア、種族ランクシステム、要塞攻城戦、Artifact競争、深淵ボスメカニクスを含む",
      intro:
        "深淵はAION 2の最も中核的で象徴的なPVPシステムです。韓国サーバーの数ヶ月の運営経験に基づいています。",
      keywords: ["AION 2 深淵", "AION 2 要塞包囲戦", "AION 2 Artifact", "AION 2 種族戦争", "AION 2 PVPガイド"],
      sourceNote: "NCSoft公式深淵ガイド（2026年8月20日）およびAION2T韓国サーバー深淵システム解析（2026年9月1日）に基づく。",
      sections: [
        section("abyss-zones-overview", "深淵エリア概要", "深淵は3つの階層に分かれます：下層レシャンタ、中層レシャンタ、上層レシャンタ。"),
        section("race-rank-system", "種族ランクと深淵ポイント", "深淵でのすべての行動は深淵ポイント（AP）を獲得し、1つ星から50つ星までの種族ランクを決定します。"),
        section("fortress-siege-mechanics", "要塞包囲戦メカニクス", "要塞は深淵の戦略的拠点です。攻城戦は固定タイムスケジュール（毎週水曜と土曜22:00 KST開始）で、約30分間続きます。"),
        section("artifact-system", "Artifact競争システム", "Artifactは深淵の特別な戦略資源で、防御型、攻撃型、補助型の3種類に分かれます。"),
        section("abyss-bosses", "深淵ボスメカニクス", "深淵には複数のボスタイプがあります：ワールドボス、要塞守護ボス、Artifact守護ボス。"),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 12, {
      eyebrow: "GUIA DO ABISMO",
      title: "Guia completo do Sistema Abismal do AION 2: Mecânicas de campo de batalha, cercos de fortalezas e competição por recursos",
      description:
        "Análise abrangente das mecânicas centrais do Sistema Abismal do AION 2, incluindo três zonas Abismais, sistema de rank racial, guerra de cerco de fortalezas, competição de Artifacts e mecânicas de chefes Abismais",
      intro:
        "O Abismo é o sistema PVP mais central e icônico do AION 2. Baseado em meses de experiência de operação do servidor coreano.",
      keywords: ["AION 2 Abismo", "Cerco de fortaleza AION 2", "Artifact AION 2", "Guerra racial AION 2", "Guia PVP AION 2"],
      sourceNote: "Baseado no guia oficial do Abismo da NCSoft (20 de agosto de 2026) e análise do sistema Abismal do servidor coreano pela AION2T (1 de setembro de 2026).",
      sections: [
        section("abyss-zones-overview", "Visão geral das zonas Abismais", "O Abismo é dividido em três níveis: Reshanta inferior, Reshanta média e Reshanta superior."),
        section("race-rank-system", "Rank racial e pontos Abismais", "Cada ação no Abismo ganha Pontos Abismais (AP), determinando seu rank racial de 1 a 50 estrelas."),
        section("fortress-siege-mechanics", "Mecânicas de cerco de fortalezas", "Fortalezas são bastiões estratégicos. Cercos têm horários fixos (quarta e sábado às 22:00 KST), duram aproximadamente 30 minutos."),
        section("artifact-system", "Sistema de competição de Artifacts", "Artifacts são recursos estratégicos especiais, divididos em três tipos: Defensivo, Ofensivo e Suporte."),
        section("abyss-bosses", "Mecânicas de chefes Abismais", "O Abismo contém múltiplos tipos de chefes: chefes de mundo, chefes guardiões de fortaleza e chefes guardiões de Artifact."),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 12, {
      eyebrow: "ГИД ПО БЕЗДНЕ",
      title: "Полное руководство по системе Бездны AION 2: Механики поля боя, осады крепостей и конкуренция за ресурсы",
      description:
        "Комплексный анализ основных механик системы Бездны AION 2, включая три зоны Бездны, систему расового ранга, осаду крепостей, конкуренцию за Артефакты и механики боссов Бездны",
      intro:
        "Бездна — это самая центральная и культовая PVP-система AION 2. Основано на месяцах опыта эксплуатации корейского сервера.",
      keywords: ["AION 2 Бездна", "Осада крепости AION 2", "Артефакт AION 2", "Расовая война AION 2", "Гид PVP AION 2"],
      sourceNote: "На основе официального руководства по Бездне NCSoft (20 августа 2026 г.) и разбора системы Бездны корейского сервера от AION2T (1 сентября 2026 г.).",
      sections: [
        section("abyss-zones-overview", "Обзор зон Бездны", "Бездна разделена на три уровня: Нижняя Рещанта, Средняя Рещанта и Верхняя Рещанта."),
        section("race-rank-system", "Расовый ранг и очки Бездны", "Каждое действие в Бездне зарабатывает очки Бездны (AP), определяя ваш расовый ранг от 1 до 50 звёзд."),
        section("fortress-siege-mechanics", "Механики осады крепостей", "Крепости — стратегические опорные пункты. Осады имеют фиксированные графики (среда и суббота в 22:00 KST), длятся около 30 минут."),
        section("artifact-system", "Система конкуренции за Артефакты", "Артефакты — особые стратегические ресурсы, разделённые на три типа: Оборонительные, Наступательные и Поддерживающие."),
        section("abyss-bosses", "Механики боссов Бездны", "Бездна содержит несколько типов боссов: мировые боссы, боссы-стражи крепостей и боссы-стражи Артефактов."),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 12, {
      eyebrow: "심연 가이드",
      title: "AION 2 심연 시스템 완전 가이드: 전장 메커니즘, 요새 공성전, 자원 경쟁",
      description:
        "AION 2 심연 시스템의 핵심 메커니즘에 대한 종합적 분석. 3개 심연 구역, 종족 등급 시스템, 요새 공성전, 아티팩트 경쟁, 심연 보스 메커니즘 포함",
      intro:
        "심연은 AION 2의 가장 핵심적이고 상징적인 PVP 시스템입니다. 한국 서버의 수개월 운영 경험을 기반으로 합니다.",
      keywords: ["AION 2 심연", "AION 2 요새 공성전", "AION 2 아티팩트", "AION 2 종족 전쟁", "AION 2 PVP 가이드"],
      sourceNote: "NCSoft 공식 심연 가이드(2026-08-20) 및 AION2T 한국 서버 심연 시스템 분석(2026-09-01) 기반.",
      sections: [
        section("abyss-zones-overview", "심연 구역 총괄", "심연은 세 개의 계층으로 나뉩니다: 하층 레샨타, 중층 레샨타, 상층 레샨타."),
        section("race-rank-system", "종족 등급과 심연 포인트", "심연에서의 모든 행동은 심연 포인트(AP)를 획득하여 1성에서 50성까지의 종족 등급을 결정합니다."),
        section("fortress-siege-mechanics", "요새 공성전 메커니즘", "요새는 심연의 전략적 거점입니다. 공성전은 고정 시간표(매주 수요일과 토요일 22:00 KST 시작)로, 약 30분간 진행됩니다."),
        section("artifact-system", "아티팩트 경쟁 시스템", "아티팩트는 심연의 특별한 전략 자원으로, 방어형, 공격형, 보조형 세 가지로 분류됩니다."),
        section("abyss-bosses", "심연 보스 메커니즘", "심연에는 여러 유형의 보스가 있습니다: 월드 보스, 요새 수호 보스, 아티팩트 수호 보스."),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 12, {
      eyebrow: "深淵指南",
      title: "AION 2 深淵系統完整指南：戰場機制、要塞攻城與資源爭奪詳解",
      description:
        "全面解析AION 2深淵系統的核心機制，包括三大深淵區域、種族等級系統、要塞攻防戰、Artifact爭奪和深淵Boss機制，基於韓服運營數據提供實戰策略",
      intro:
        "深淵是AION 2最核心也是最具標誌性的PVP系統。它不僅是大規模種族戰爭的舞台，更是要塞攻城、Artifact爭奪和頂級Boss戰鬥的綜合戰場。本文基於韓服數月運營經驗，為你全面解析深淵系統的每個方面。",
      keywords: ["AION 2 深淵", "AION 2 要塞攻城", "AION 2 Artifact", "AION 2 種族戰爭", "AION 2 PVP指南"],
      sourceNote: "基於 NCSoft 官方深淵指南（2026-08-20）和 AION2T 韓服深淵系統解析（2026-09-01）整理。",
      sections: [
        section("abyss-zones-overview", "深淵區域總覽", "深淵分為三個層級：下層深淵（Reshanta）、中層深淵和下層深淵。下層深淵是入門區域，適合40級以下的玩家，包含基礎資源和初級要塞。中層深淵是主要爭奪區域，擁有最多的要塞和Artifact，也是種族戰爭的核心戰場。上層深淵是頂級內容，包含最高級Boss和傳奇級Artifact，通常需要大型公會協調攻城。"),
        section("race-rank-system", "種族等級與深淵點數", "每個玩家在深淵中的行為都會獲得深淵點數（AP），這些點數決定了你的種族等級（Rank）。種族等級從1星到50星，每個大階段（10星）提升會解鎖新的深淵技能和外觀獎勵。AP可以通過擊殺敵對種族玩家、佔領要塞、擊殺深淵Boss和完成深淵任務獲得。注意：死亡會損失部分AP，所以在高風險區域要謹慎。"),
        section("fortress-siege-mechanics", "要塞攻城機制詳解", "要塞是深淵中的戰略據點，每個要塞控制著周圍的資源點。攻城戰有固定時間表（每週三和週六韓國時間22:00開始），持續約30分鐘。攻方需要摧毀要塞的防護壁（需要大量玩家集中攻擊），然後佔領核心。守方可以修復防護壁並使用要塞砲台反擊。佔領要塞後，你的種族會獲得持續的AP獎勵和資源收益。"),
        section("artifact-system", "Artifact爭奪系統", "Artifact是深淵中的特殊戰略資源，分為防禦型、攻擊型和輔助型三類。防禦型Artifact為佔領方提供要塞增益，攻擊型Artifact可以增強種族在戰場中的整體能力，輔助型Artifact提供特殊BUFF。每個Artifact有刷新時間，擊殺守護Boss後可以獲得。大型公會通常會優先爭奪高級Artifact。"),
        section("abyss-bosses", "深淵Boss機制", "深淵中有多種Boss類型：世界Boss（如Nahma）、要塞守護Boss和Artifact守護Boss。世界Boss是最強的存在，需要多個公會聯合擊殺，掉落傳奇級裝備。要塞守護Boss在要塞被攻擊時會激活，幫助守方抵抗。Artifact守護Boss守護著各個Artifact刷新點，擊殺後Artifact歸屬於擊殺者所在種族。"),
      ],
    }),
  },
};
