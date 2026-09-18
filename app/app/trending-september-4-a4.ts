import {
  articleCopy,
  localizations,
  guideLabels,
  publishedVerified,
  readingTime,
  section,
} from "./trending-september-4-shared";
import type { ContentSource, ContentHeroImage } from "./content-registry";

// Source 1: Official class guide
const classGuideSource: ContentSource = {
  id: "ncsoft-class-guide",
  kind: "official",
  publisher: "NCSoft",
  label: "AION 2 Official Class Guide",
  url: "https://aion2.plaync.com/en-us/game/guide/character/class",
  publishedAt: "2026-08-15",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 官方职业指南",
      en: "AION 2 Official Class Guide",
      fr: "Guide officiel des classes d'AION 2",
      de: "AION 2 Offizieller Klassenleitfaden",
      es: "Guía oficial de clases de AION 2",
      ja: "AION 2 公式クラスガイド",
      "pt-br": "Guia oficial de classes do AION 2",
      ru: "Официальное руководство по классам AION 2",
      ko: "AION 2 공식 직업 가이드",
      "zh-hant": "AION 2 官方職業指南",
    },
    "https://aion2.plaync.com/en-us/game/guide/character/class",
  ),
};

// Source 2: Community tier list
const tierListSource: ContentSource = {
  id: "aion2hub-kr-server-tier-list",
  kind: "third-party",
  publisher: "AION2Hub",
  label: "AION 2 Korea Server Class Tier List — September 2026",
  url: "https://aion2hub.com/guides/korea-class-tier-list-september/",
  publishedAt: "2026-09-02",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 韩服职业 Tier 排行 — 2026年9月",
      en: "AION 2 Korea Server Class Tier List — September 2026",
      fr: "Classement des classes du serveur coréen d'AION 2 — Septembre 2026",
      de: "AION 2 Korea-Server Klassen-Tier-Liste — September 2026",
      es: "Lista de niveles de clases del servidor coreano de AION 2 — Septiembre 2026",
      ja: "AION 2 韓国サーバークラスティアリスト — 2026年9月",
      "pt-br": "Lista de tiers de classes do servidor coreano do AION 2 — Setembro 2026",
      ru: "Тир-лист классов корейского сервера AION 2 — Сентябрь 2026",
      ko: "AION 2 한국 서버 직업 티어 리스트 — 2026년 9월",
      "zh-hant": "AION 2 韓服職業 Tier 排行 — 2026年9月",
    },
    "https://aion2hub.com/guides/korea-class-tier-list-september/",
  ),
};

// Hero image
const classTierHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1200, height: 630,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/en-us/game/guide/character/class",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 八大职业展示横幅", caption: "AION 2 提供8个基础职业，每个职业有3个专精方向，韩服运营经验显示各职业表现各异。" },
    en: { alt: "AION 2 eight classes display banner", caption: "AION 2 offers 8 base classes, each with 3 specializations; Korea server experience shows varying performance." },
    fr: { alt: "Bannière d'affichage des huit classes d'AION 2", caption: "AION 2 propose 8 classes de base avec 3 spécialisations ; l'expérience coréenne montre des performances variées." },
    de: { alt: "AION 2 acht Klassen Anzeige-Banner", caption: "AION 2 bietet 8 Basisklassen mit je 3 Spezialisierungen; Korea-Server zeigt unterschiedliche Leistung." },
    es: { alt: "Banner de las ocho clases de AION 2", caption: "AION 2 ofrece 8 clases base con 3 especializaciones; la experiencia coreana muestra rendimiento variado." },
    ja: { alt: "AION 2 8クラス表示バナー", caption: "AION 2は8つの基本クラスを提供し、それぞれ3つの専門化。韓国サーバーの経験で異なるパフォーマンス。" },
    "pt-br": { alt: "Banner das oito classes do AION 2", caption: "O AION 2 oferece 8 classes base com 3 especializações; a experiência coreana mostra desempenho variado." },
    ru: { alt: "Баннер восьми классов AION 2", caption: "AION 2 предлагает 8 базовых классов с 3 специализациями; опыт корейского сервера показывает различную эффективность." },
    ko: { alt: "AION 2 8대 직업 표시 배너", caption: "AION 2는 8개의 기본 직업을 제공하며, 각 직업은 3개의 전문화가 있습니다. 한국 서버에서 다양한 성과." },
    "zh-hant": { alt: "AION 2 八大職業展示橫幅", caption: "AION 2 提供8個基礎職業，每個職業有3個專精方向，韓服運營經驗顯示各職業表現各異。" },
  },
};

export const trendingSeptember4Article4 = {
  section: "guides" as const,
  slug: "aion-2-korea-server-class-tier-guide",
  schemaType: "Article" as const,
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  readingMinutes: 10,
  publication: publishedVerified,
  sources: [classGuideSource, tierListSource],
  heroImage: classTierHero,
  related: [
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-abyss-system-complete-guide" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-founders-pack-complete-guide" },
    { kind: "content" as const, section: "news" as const, slug: "aion-2-october-5-launch-countdown-roadmap" },
  ],
  translations: {
    "zh-hans": articleCopy(guideLabels, "zh-hans", 10, {
      eyebrow: "职业分析",
      title: "AION 2 韩服职业强度指南：基于运营经验的PVE/PVP Tier排行",
      description:
        "基于韩服长期运营数据，深度解析AION 2八大职业在PVE副本、PVP战场和单人内容中的强度表现，包含新手推荐、团队需求和专精方向建议",
      intro:
        "AION 2韩服已运营数月，积累了大量职业平衡数据。本文综合韩服社区共识和副本通关统计，为全球发布玩家提供职业选择参考。注意：职业强度会随版本更新变化，本文反映当前版本状况。",
      keywords: ["AION 2 职业强度", "AION 2 韩服", "AION 2 Tier排行", "AION 2 PVE职业", "AION 2 PVP职业"],
      sourceNote: "基于 NCSoft 官方职业指南（2026-08-15）和 AION2Hub 韩服职业 Tier 排行（2026-09-02）整理。",
      sections: [
        section(
          "tier-list-overview",
          "当前版本职业 Tier 总览",
          "S级（最强）：战士（防御专精）、牧师（神圣专精）——在副本和PVP中都是刚需。A级：法师（火焰专精）、弓手（射击专精）——DPS表现出色。B级：刺客（暗杀专精）、剑士（剑术专精）——PVP强但PVE需求较低。C级：召唤师、工程师——团队组成灵活度较低，但单人内容表现不错。",
        ),
        section(
          "pve-dps-ranking",
          "PVE DPS排行",
          "单体伤害排行：法师（火焰）> 弓手（射击）> 刺客（暗杀）> 剑士（剑术）> 召唤师 > 工程师。AOE伤害排行：法师（冰霜）> 召唤师 > 工程师 > 弓手 > 剑士。副本组队需求：法师和弓手是最受欢迎的DPS，因为他们的远程输出和AOE能力。",
        ),
        section(
          "pvp-ranking",
          "PVP 战场排行",
          "竞技场排行：刺客（暗杀）> 战士（防御）> 弓手（陷阱专精）> 牧师 > 其他。战场排行：战士（防御）> 牧师 > 弓手 > 法师 > 其他。刺客在1v1和小规模PVP中极强，但大规模战场中被AOE克制。战士和牧师在任何PVP场景中都很稳定。",
        ),
        section(
          "tank-healer-analysis",
          "坦克与治疗分析",
          "战士（防御专精）是唯一真正的坦克职业，在副本中不可或缺。虽然DPS较低，但组队极快，永远不愁没有副本可打。牧师（神圣专精）是唯一的治疗职业，同样是副本刚需。如果你想要稳定组队体验，坦克和治疗是最佳选择。",
        ),
        section(
          "beginner-recommendations",
          "新手推荐",
          "如果你喜欢近战：推荐战士（防御专精），容易上手且组队稳定。如果你喜欢远程：推荐弓手（射击专精），操作相对简单，伤害稳定。如果你喜欢辅助：推荐牧师（神圣专精），副本永远需要治疗。如果你喜欢高风险高回报：推荐刺客，但需要更多练习。",
        ),
      ],
    }),
    en: articleCopy(guideLabels, "en", 10, {
      eyebrow: "CLASS ANALYSIS",
      title: "AION 2 Korea Server Class Tier Guide: PVE/PVP Rankings Based on Live Experience",
      description:
        "Based on Korea server long-term operation data, in-depth analysis of AION 2's eight classes' performance in PVE dungeons, PVP battlegrounds, and solo content, including beginner recommendations, team needs, and specialization suggestions",
      intro:
        "AION 2's Korea server has been running for months, accumulating extensive class balance data. This article synthesizes Korea server community consensus and dungeon clear statistics to provide class selection references for global launch players. Note: Class strength changes with version updates; this article reflects the current version.",
      keywords: ["AION 2 class tier", "AION 2 Korea server", "AION 2 tier list", "AION 2 PVE classes", "AION 2 PVP classes"],
      sourceNote: "Based on NCSoft's official class guide (August 15, 2026) and AION2Hub Korea server tier list (September 2, 2026).",
      sections: [
        section(
          "tier-list-overview",
          "Current Version Class Tier Overview",
          "S-Tier (Strongest): Warrior (Defense spec), Cleric (Holy spec) — essential in both dungeons and PVP. A-Tier: Mage (Fire spec), Archer (Marksmanship spec) — excellent DPS performance. B-Tier: Assassin (Subtlety spec), Swordmaster (Swordsmanship spec) — strong in PVP but lower PVE demand. C-Tier: Summoner, Engineer — lower team composition flexibility, but good in solo content.",
        ),
        section(
          "pve-dps-ranking",
          "PVE DPS Rankings",
          "Single-target damage: Mage (Fire) > Archer (Marksmanship) > Assassin (Subtlety) > Swordmaster (Swordsmanship) > Summoner > Engineer. AOE damage: Mage (Frost) > Summoner > Engineer > Archer > Swordmaster. Dungeon group demand: Mage and Archer are the most popular DPS due to their ranged output and AOE capabilities.",
        ),
        section(
          "pvp-ranking",
          "PVP Battleground Rankings",
          "Arena rankings: Assassin (Subtlety) > Warrior (Defense) > Archer (Trap spec) > Cleric > Others. Battleground rankings: Warrior (Defense) > Cleric > Archer > Mage > Others. Assassins dominate in 1v1 and small-scale PVP but are countered by AOE in large-scale battlegrounds. Warriors and Clerics remain stable in all PVP scenarios.",
        ),
        section(
          "tank-healer-analysis",
          "Tank and Healer Analysis",
          "Warrior (Defense spec) is the only true tank class, indispensable in dungeons. Although DPS is lower, grouping is extremely fast — never lacking dungeon opportunities. Cleric (Holy spec) is the only healer class, equally essential for dungeons. If you want stable grouping experiences, tank and healer are the best choices.",
        ),
        section(
          "beginner-recommendations",
          "Beginner Recommendations",
          "If you prefer melee: recommend Warrior (Defense spec), easy to learn with stable grouping. If you prefer ranged: recommend Archer (Marksmanship spec), relatively simple controls with stable damage. If you prefer support: recommend Cleric (Holy spec), dungeons always need healers. If you like high-risk high-reward: recommend Assassin, but requires more practice.",
        ),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 10, {
      eyebrow: "ANALYSE DES CLASSES",
      title: "Guide des niveaux de classes du serveur coréen d'AION 2 : Classements PVE/PVP basés sur l'expérience en jeu",
      description:
        "Basé sur les données d'exploitation à long terme du serveur coréen, analyse approfondie des performances des huit classes d'AION 2 en donjons PVE, champs de bataille PVP et contenu solo",
      intro:
        "Le serveur coréen d'AION 2 fonctionne depuis des mois, accumulant des données complètes sur l'équilibre des classes. Cet article synthétise le consensus de la communauté coréenne et les statistiques de nettoyage de donjons.",
      keywords: ["Niveau de classe AION 2", "Serveur coréen AION 2", "Classement AION 2", "Classes PVE AION 2", "Classes PVP AION 2"],
      sourceNote: "Basé sur le guide officiel des classes de NCSoft (15 août 2026) et la liste de niveaux du serveur coréen d'AION2Hub (2 septembre 2026).",
      sections: [
        section("tier-list-overview", "Aperçu des niveaux de la version actuelle", "S (le plus fort) : Guerrier (spécialisation Défense), Clerc (spécialisation Sacré). A : Mage (spécialisation Feu), Archer (spécialisation Tir de précision). B : Assassin (spécialisation Subtilité), Maître d'épée (spécialisation Escrime). C : Invocateur, Ingénieur."),
        section("pve-dps-ranking", "Classements DPS PVE", "Dégâts monocible : Mage (Feu) > Archer > Assassin > Maître d'épée > Invocateur > Ingénieur. Dégâts AOE : Mage (Givre) > Invocateur > Ingénieur > Archer > Maître d'épée."),
        section("pvp-ranking", "Classements PVP", "Arène : Assassin > Guerrier > Archer > Clerc > Autres. Champ de bataille : Guerrier > Clerc > Archer > Mage > Autres."),
        section("tank-healer-analysis", "Analyse Tank et Soigneur", "Le Guerrier (spécialisation Défense) est la seule vraie classe tank. Le Clerc (spécialisation Sacré) est la seule classe soigneur."),
        section("beginner-recommendations", "Recommandations pour débutants", "Mêlée recommandée : Guerrier (Défense). Distance recommandée : Archer (Tir de précision). Support recommandé : Clerc (Sacré). Risque élevé : Assassin."),
      ],
    }),
    de: articleCopy(guideLabels, "de", 10, {
      eyebrow: "KLASSENANALYSE",
      title: "AION 2 Korea-Server Klassen-Tier-Guide: PVE/PVP-Rankings basierend auf Live-Erfahrung",
      description:
        "Basierend auf Langzeitbetriebsdaten des Korea-Servers, tiefgehende Analyse der Leistung der acht Klassen von AION 2 in PVE-Dungeons, PVP-Schlachtfeldern und Solo-Inhalten",
      intro:
        "Der Korea-Server von AION 2 läuft seit Monaten und hat umfangreiche Klassenausgleichsdaten angesammelt. Dieser Artikel synthetisiert den Konsens der Korea-Server-Community und Dungeon-Clear-Statistiken.",
      keywords: ["AION 2 Klassen-Tier", "AION 2 Korea-Server", "AION 2 Tier-Liste", "AION 2 PVE-Klassen", "AION 2 PVP-Klassen"],
      sourceNote: "Basierend auf NCSofts offiziellem Klassenleitfaden (15. August 2026) und der Korea-Server-Tier-Liste von AION2Hub (2. September 2026).",
      sections: [
        section("tier-list-overview", "Aktuelle Version Klassen-Tier-Übersicht", "S-Stufe (stärkste): Krieger (Verteidigung), Kleriker (Heilig). A-Stufe: Magier (Feuer), Bogenschütze (Treffsicherheit). B-Stufe: Assassine (Subtilität), Schwertmeister (Schwertkunst). C-Stufe: Beschwörer, Ingenieur."),
        section("pve-dps-ranking", "PVE DPS-Rankings", "Einzelschaden: Magier (Feuer) > Bogenschütze > Assassine > Schwertmeister > Beschwörer > Ingenieur. AOE-Schaden: Magier (Frost) > Beschwörer > Ingenieur > Bogenschütze > Schwertmeister."),
        section("pvp-ranking", "PVP-Schlachtfeld-Rankings", "Arena: Assassine > Krieger > Bogenschütze > Kleriker > Andere. Schlachtfeld: Krieger > Kleriker > Bogenschütze > Magier > Andere."),
        section("tank-healer-analysis", "Tank- und Heileranalyse", "Krieger (Verteidigung) ist die einzige echte Tank-Klasse. Kleriker (Heilig) ist die einzige Heiler-Klasse."),
        section("beginner-recommendations", "Anfängerempfehlungen", "Nahkampf empfohlen: Krieger (Verteidigung). Fernkampf empfohlen: Bogenschütze (Treffsicherheit). Support empfohlen: Kleriker (Heilig). Hohes Risiko: Assassine."),
      ],
    }),
    es: articleCopy(guideLabels, "es", 10, {
      eyebrow: "ANÁLISIS DE CLASES",
      title: "Guía de niveles de clases del servidor coreano de AION 2: Clasificaciones PVE/PVP basadas en experiencia en vivo",
      description:
        "Basado en datos de operación a largo plazo del servidor coreano, análisis profundo del rendimiento de las ocho clases de AION 2 en mazmorras PVE, campos de batalla PVP y contenido solitario",
      intro:
        "El servidor coreano de AION 2 ha estado funcionando durante meses, acumulando datos extensos de equilibrio de clases.",
      keywords: ["Nivel de clase AION 2", "Servidor coreano AION 2", "Lista de niveles AION 2", "Clases PVE AION 2", "Clases PVP AION 2"],
      sourceNote: "Basado en la guía oficial de clases de NCSoft (15 de agosto de 2026) y la lista de niveles del servidor coreano de AION2Hub (2 de septiembre de 2026).",
      sections: [
        section("tier-list-overview", "Resumen de niveles de la versión actual", "S (más fuerte): Guerrero (Defensa), Clérigo (Sagrado). A: Mago (Fuego), Arquero (Puntería). B: Asesino (Sutileza), Maestro de espada (Esgrima). C: Invocador, Ingeniero."),
        section("pve-dps-ranking", "Clasificaciones DPS PVE", "Daño individual: Mago (Fuego) > Arquero > Asesino > Maestro de espada > Invocador > Ingeniero. Daño AOE: Mago (Escarcha) > Invocador > Ingeniero > Arquero > Maestro de espada."),
        section("pvp-ranking", "Clasificaciones PVP", "Arena: Asesino > Guerrero > Arquero > Clérigo > Otros. Campo de batalla: Guerrero > Clérigo > Arquero > Mago > Otros."),
        section("tank-healer-analysis", "Análisis de Tanque y Sanador", "Guerrero (Defensa) es la única clase tanque verdadera. Clérigo (Sagrado) es la única clase sanadora."),
        section("beginner-recommendations", "Recomendaciones para principiantes", "Cuerpo a cuerpo recomendado: Guerrero (Defensa). A distancia recomendado: Arquero (Puntería). Soporte recomendado: Clérigo (Sagrado). Alto riesgo: Asesino."),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 10, {
      eyebrow: "クラス分析",
      title: "AION 2 韓国サーバークラスティアガイド：ライブ経験に基づくPVE/PVPランキング",
      description:
        "韓国サーバーの長期運営データに基づく、AION 2の8クラスのPVEダンジョン、PVP戦場、ソロコンテンツでのパフォーマンスの深層分析",
      intro:
        "AION 2の韓国サーバーは数ヶ月間運営されており、広範なクラスバランスデータが蓄積されています。",
      keywords: ["AION 2 クラスティア", "AION 2 韓国サーバー", "AION 2 ティアリスト", "AION 2 PVEクラス", "AION 2 PVPクラス"],
      sourceNote: "NCSoft公式クラスガイド（2026年8月15日）およびAION2Hub韓国サーバティアリスト（2026年9月2日）に基づく。",
      sections: [
        section("tier-list-overview", "現行バージョンのクラスティア概要", "S（最強）：戦士（防御）、聖職者（神聖）。A：魔法使い（火炎）、弓使い（射撃）。B：暗殺者（暗殺）、剣士（剣術）。C：召喚師、エンジニア。"),
        section("pve-dps-ranking", "PVE DPSランキング", "単体ダメージ：魔法使い（火炎）> 弓使い > 暗殺者 > 剣士 > 召喚師 > エンジニア。AOEダメージ：魔法使い（氷霜）> 召喚師 > エンジニア > 弓使い > 剣士。"),
        section("pvp-ranking", "PVPランキング", "アリーナ：暗殺者 > 戦士 > 弓使い > 聖職者 > その他。戦場：戦士 > 聖職者 > 弓使い > 魔法使い > その他。"),
        section("tank-healer-analysis", "タンクとヒーラー分析", "戦士（防御）は唯一の真のタンククラスです。聖職者（神聖）は唯一のヒーラークラスです。"),
        section("beginner-recommendations", "初心者おすすめ", "近接推薦：戦士（防御）。遠距離推薦：弓使い（射撃）。サポート推薦：聖職者（神聖）。高リスク：暗殺者。"),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 10, {
      eyebrow: "ANÁLISE DE CLASSES",
      title: "Guia de tiers de classes do servidor coreano do AION 2: Classificações PVE/PVP baseadas em experiência ao vivo",
      description:
        "Com base em dados de operação de longo prazo do servidor coreano, análise profunda do desempenho das oito classes do AION 2 em masmorras PVE, campos de batalha PVP e conteúdo solo",
      intro:
        "O servidor coreano do AION 2 está funcionando há meses, acumulando extensos dados de equilíbrio de classes.",
      keywords: ["Tier de classe AION 2", "Servidor coreano AION 2", "Lista de tiers AION 2", "Classes PVE AION 2", "Classes PVP AION 2"],
      sourceNote: "Baseado no guia oficial de classes da NCSoft (15 de agosto de 2026) e lista de tiers do servidor coreano do AION2Hub (2 de setembro de 2026).",
      sections: [
        section("tier-list-overview", "Visão geral dos tiers da versão atual", "S (mais forte): Guerreiro (Defesa), Clérigo (Sagrado). A: Mago (Fogo), Arqueiro (Precisão). B: Assassino (Sutileza), Mestre de espada (Esgrima). C: Invocador, Engenheiro."),
        section("pve-dps-ranking", "Classificações DPS PVE", "Dano individual: Mago (Fogo) > Arqueiro > Assassino > Mestre de espada > Invocador > Engenheiro. Dano AOE: Mago (Gelo) > Invocador > Engenheiro > Arqueiro > Mestre de espada."),
        section("pvp-ranking", "Classificações PVP", "Arena: Assassino > Guerreiro > Arqueiro > Clérigo > Outros. Campo de batalha: Guerreiro > Clérigo > Arqueiro > Mago > Outros."),
        section("tank-healer-analysis", "Análise de Tanque e Curandeiro", "Guerreiro (Defesa) é a única classe tanque verdadeira. Clérigo (Sagrado) é a única classe curandeira."),
        section("beginner-recommendations", "Recomendações para iniciantes", "Corpo a corpo recomendado: Guerreiro (Defesa). Longa distância recomendado: Arqueiro (Precisão). Suporte recomendado: Clérigo (Sagrado). Alto risco: Assassino."),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 10, {
      eyebrow: "АНАЛИЗ КЛАССОВ",
      title: "Тир-гид по классам корейского сервера AION 2: Рейтинг PVE/PVP на основе живого опыта",
      description:
        "На основе данных долгосрочной эксплуатации корейского сервера, углублённый анализ производительности восьми классов AION 2 в PVE-подземельях, PVP-полях боя и одиночном контенте",
      intro:
        "Корейский сервер AION 2 работает месяцами, накопив обширные данные баланса классов.",
      keywords: ["Тир класса AION 2", "Корейский сервер AION 2", "Тир-лист AION 2", "Классы PVE AION 2", "Классы PVP AION 2"],
      sourceNote: "На основе официального руководства по классам NCSoft (15 августа 2026 г.) и тир-листа корейского сервера AION2Hub (2 сентября 2026 г.).",
      sections: [
        section("tier-list-overview", "Обзор тиров текущей версии", "S (сильнейшие): Воин (Защита), Клирик (Святой). A: Маг (Огонь), Лучник (Стрельба). B: Ассасин (Скрытность), Мастер меча (Фехтование). C: Призыватель, Инженер."),
        section("pve-dps-ranking", "Рейтинги PVE DPS", "Единичный урон: Маг (Огонь) > Лучник > Ассасин > Мастер меча > Призыватель > Инженер. AOE урон: Маг (Лёд) > Призыватель > Инженер > Лучник > Мастер меча."),
        section("pvp-ranking", "Рейтинги PVP", "Арена: Ассасин > Воин > Лучник > Клирик > Другие. Поле боя: Воин > Клирик > Лучник > Маг > Другие."),
        section("tank-healer-analysis", "Анализ танка и целителя", "Воин (Защита) — единственный настоящий танк-класс. Клирик (Святой) — единственный класс целителя."),
        section("beginner-recommendations", "Рекомендации для новичков", "Ближний бой рекомендуется: Воин (Защита). Дальний бой рекомендуется: Лучник (Стрельба). Поддержка рекомендуется: Клирик (Святой). Высокий риск: Ассасин."),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 10, {
      eyebrow: "직업 분석",
      title: "AION 2 한국 서버 직업 티어 가이드: 실전 경험 기반 PVE/PVP 랭킹",
      description:
        "한국 서버 장기 운영 데이터를 기반으로 한, AION 2 8대 직업의 PVE 던전, PVP 전장 및 솔로 콘텐츠에서의 성과 심층 분석",
      intro:
        "AION 2 한국 서버는 수개월간 운영되며 방대한 직업 밸런스 데이터를 축적했습니다. 본 기사는 한국 서버 커뮤니티 합의와 던전 클리어 통계를 종합하여 글로벌 출시 플레이어에게 직업 선택 참고를 제공합니다.",
      keywords: ["AION 2 직업 티어", "AION 2 한국 서버", "AION 2 티어리스트", "AION 2 PVE 직업", "AION 2 PVP 직업"],
      sourceNote: "NCSoft 공식 직업 가이드(2026-08-15) 및 AION2Hub 한국 서버 티어 리스트(2026-09-02) 기반.",
      sections: [
        section("tier-list-overview", "현재 버전 직업 티어 총괄", "S급(최강): 전사(방어), 사제(신성). A급: 마법사(화염), 궁수(사격). B급: 암살자(암살), 검사(검사술). C급: 소환사, 엔지니어."),
        section("pve-dps-ranking", "PVE DPS 랭킹", "단일 피해: 마법사(화염) > 궁수 > 암살자 > 검사 > 소환사 > 엔지니어. AOE 피해: 마법사(빙결) > 소환사 > 엔지니어 > 궁수 > 검사."),
        section("pvp-ranking", "PVP 랭킹", "투기장: 암살자 > 전사 > 궁수 > 사제 > 기타. 전장: 전사 > 사제 > 궁수 > 마법사 > 기타."),
        section("tank-healer-analysis", "탱커 & 힐러 분석", "전사(방어)는 유일한 진정한 탱커 직업입니다. 사제(신성)는 유일한 힐러 직업입니다."),
        section("beginner-recommendations", "초보자 추천", "근접 추천: 전사(방어). 원거리 추천: 궁수(사격). 서포터 추천: 사제(신성). 하이리스크: 암살자."),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 10, {
      eyebrow: "職業分析",
      title: "AION 2 韓服職業強度指南：基於運營經驗的PVE/PVP Tier排行",
      description:
        "基於韓服長期運營數據，深度解析AION 2八大職業在PVE副本、PVP戰場和單人內容中的強度表現，包含新手推薦、團隊需求和專精方向建議",
      intro:
        "AION 2韓服已運營數月，積累了大量職業平衡數據。本文綜合韓服社區共識和副本通關統計，為全球發布玩家提供職業選擇參考。注意：職業強度會隨版本更新變化，本文反映當前版本狀況。",
      keywords: ["AION 2 職業強度", "AION 2 韓服", "AION 2 Tier排行", "AION 2 PVE職業", "AION 2 PVP職業"],
      sourceNote: "基於 NCSoft 官方職業指南（2026-08-15）和 AION2Hub 韓服職業 Tier 排行（2026-09-02）整理。",
      sections: [
        section("tier-list-overview", "當前版本職業 Tier 總覽", "S級（最強）：戰士（防禦專精）、牧師（神聖專精）——在副本和PVP中都是剛需。A級：法師（火焰專精）、弓手（射擊專精）——DPS表現出色。B級：刺客（暗殺專精）、劍士（劍術專精）——PVP強但PVE需求較低。C級：召喚師、工程師——團隊組成靈活度較低，但單人內容表現不錯。"),
        section("pve-dps-ranking", "PVE DPS排行", "單體傷害排行：法師（火焰）> 弓手（射擊）> 刺客（暗殺）> 劍士（劍術）> 召喚師 > 工程師。AOE傷害排行：法師（冰霜）> 召喚師 > 工程師 > 弓手 > 劍士。副本組隊需求：法師和弓手是最受歡迎的DPS，因為他們的遠程輸出和AOE能力。"),
        section("pvp-ranking", "PVP 戰場排行", "競技場排行：刺客（暗殺）> 戰士（防禦）> 弓手（陷阱專精）> 牧師 > 其他。戰場排行：戰士（防禦）> 牧師 > 弓手 > 法師 > 其他。刺客在1v1和小規模PVP中極強，但大規模戰場中被AOE克制。戰士和牧師在任何PVP場景中都很穩定。"),
        section("tank-healer-analysis", "坦克與治療分析", "戰士（防禦專精）是唯一真正的坦克職業，在副本中不可或缺。雖然DPS較低，但組隊極快，永遠不愁沒有副本可打。牧師（神聖專精）是唯一的治療職業，同樣是副本剛需。如果你想要穩定組隊體驗，坦克和治療是最佳選擇。"),
        section("beginner-recommendations", "新手推薦", "如果你喜歡近戰：推薦戰士（防禦專精），容易上手且組隊穩定。如果你喜歡遠程：推薦弓手（射擊專精），操作相對簡單，傷害穩定。如果你喜歡輔助：推薦牧師（神聖專精），副本永遠需要治療。如果你喜歡高風險高回報：推薦刺客，但需要更多練習。"),
      ],
    }),
  },
};
