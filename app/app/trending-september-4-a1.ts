import {
  articleCopy,
  localizations,
  guideLabels,
  newsLabels,
  publishedVerified,
  readingTime,
  section,
} from "./trending-september-4-shared";
import type { ContentSource, ContentHeroImage } from "./content-registry";

// Source 1: Official NCSoft announcement
const founderPackSource: ContentSource = {
  id: "ncsoft-founders-pack-announcement",
  kind: "official",
  publisher: "NCSoft",
  label: "AION 2 Founder's Pack Early Access Announcement",
  url: "https://aion2.plaync.com/en-us/store/founders-pack",
  publishedAt: "2026-08-31",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 创始人包提前访问公告",
      en: "AION 2 Founder's Pack Early Access Announcement",
      fr: "Annonce de l'accès anticipé au pack fondateur d'AION 2",
      de: "AION 2 Gründerpaket Frühzugang-Ankündigung",
      es: "Anuncio de acceso anticipado del paquete fundador de AION 2",
      ja: "AION 2 創設者パック早期アクセス発表",
      "pt-br": "Anúncio de acesso antecipado do pacote fundador do AION 2",
      ru: "Анонс раннего доступа пакета основателя AION 2",
      ko: "AION 2 창립자 팩 조기 액세스 발표",
      "zh-hant": "AION 2 創始人包提前訪問公告",
    },
    "https://aion2.plaync.com/en-us/store/founders-pack",
  ),
};

// Source 2: Steam store page
const steamStoreSource: ContentSource = {
  id: "steam-aion2-store-page",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 on Steam - Store Page",
  url: "https://store.steampowered.com/app/2858220/AION_2/",
  publishedAt: "2026-08-25",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "Steam 上的 AION 2 - 商店页面",
      en: "AION 2 on Steam - Store Page",
      fr: "AION 2 sur Steam - Page du magasin",
      de: "AION 2 auf Steam - Shop-Seite",
      es: "AION 2 en Steam - Página de la tienda",
      ja: "SteamのAION 2 - ストアページ",
      "pt-br": "AION 2 no Steam - Página da loja",
      ru: "AION 2 в Steam - Страница магазина",
      ko: "Steam의 AION 2 - 스토어 페이지",
      "zh-hant": "Steam 上的 AION 2 - 商店頁面",
    },
    "https://store.steampowered.com/app/2858220/AION_2/",
  ),
};

// Hero image
const founderPackHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1200, height: 630,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/en-us/store/founders-pack",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 创始人包三个版本展示", caption: "创始人包提供Standard、Deluxe和Ultimate三个版本，包含独占游戏内物品和提前访问权限。" },
    en: { alt: "AION 2 Founder's Pack three tiers display", caption: "Founder's Pack offers Standard, Deluxe, and Ultimate editions with exclusive in-game items and early access." },
    fr: { alt: "Affichage des trois niveaux du pack fondateur d'AION 2", caption: "Le pack fondateur propose les éditions Standard, Deluxe et Ultimate avec des objets exclusifs et un accès anticipé." },
    de: { alt: "AION 2 Gründerpaket drei Stufen Anzeige", caption: "Das Gründerpaket bietet Standard-, Deluxe- und Ultimate-Editionen mit exklusiven Items und Frühzugang." },
    es: { alt: "Visualización de tres niveles del paquete fundador de AION 2", caption: "El paquete fundador ofrece ediciones Standard, Deluxe y Ultimate con objetos exclusivos y acceso anticipado." },
    ja: { alt: "AION 2 創設者パック3つのティア表示", caption: "創設者パックはStandard、Deluxe、Ultimateエディションを提供し、独占アイテムと早期アクセスを含む。" },
    "pt-br": { alt: "Exibição de três níveis do pacote fundador do AION 2", caption: "O Pacote Fundador oferece edições Standard, Deluxe e Ultimate com itens exclusivos e acesso antecipado." },
    ru: { alt: "Отображение трёх уровней пакета основателя AION 2", caption: "Пакет основателя предлагает издания Standard, Deluxe и Ultimate с эксклюзивными предметами и ранним доступом." },
    ko: { alt: "AION 2 창립자 팩 3단계 표시", caption: "창립자 팩은 Standard, Deluxe, Ultimate 에디션을 제공하며 독점 게임 아이템과 조기 액세스를 포함합니다." },
    "zh-hant": { alt: "AION 2 創始人包三個版本展示", caption: "創始人包提供Standard、Deluxe和Ultimate三個版本，包含獨佔遊戲內物品和提前訪問權限。" },
  },
};

export const trendingSeptember4Article1 = {
  section: "guides" as const,
  slug: "aion-2-founders-pack-complete-guide",
  schemaType: "Article" as const,
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  readingMinutes: 8,
  publication: publishedVerified,
  sources: [founderPackSource, steamStoreSource],
  heroImage: founderPackHero,
  related: [
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-launch-scale-test-preparation-guide" },
    { kind: "content" as const, section: "news" as const, slug: "aion-2-october-5-launch-countdown-roadmap" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-abyss-system-complete-guide" },
  ],
  translations: {
    "zh-hans": articleCopy(guideLabels, "zh-hans", 8, {
      eyebrow: "完全指南",
      title: "AION 2 创始人包完整指南：三个tier详解与购买建议",
      description:
        "深入分析AION 2创始人包的Standard、Deluxe和Ultimate三个版本，包括价格、独占物品、提前访问优势，以及适合哪些玩家类型",
      intro:
        "AION 2将于2026年10月5日正式发布，但创始人包购买者可以在9月30日至10月4日期间提前体验游戏。本指南将详细分析三个版本的内容差异、性价比评估，以及哪些玩家应该考虑购买。",
      keywords: ["AION 2创始人包", "AION 2提前访问", "AION 2购买指南", "AION 2 Standard版", "AION 2 Deluxe版", "AION 2 Ultimate版"],
      sourceNote: "基于 NCSoft 官方创始人包商店页面（2026-08-31）和 Steam 商店页面信息整理。",
      sections: [
        section(
          "founders-pack-overview",
          "创始人包概览：三个版本对比",
          "AION 2创始人包提供三个版本：Standard版（$49.99）、Deluxe版（$79.99）和Ultimate版（$129.99）。所有版本都包含5天提前访问权限（9月30日-10月4日），但独占物品和装饰性奖励有所不同。Standard版包含基础装饰物品，Deluxe版增加坐骑和更多外观选项，Ultimate版则提供最高级的独占外观和特殊称号。值得注意的是，所有创始人包物品都是纯装饰性的，不会影响游戏平衡或提供数值优势。",
        ),
        section(
          "early-access-benefits",
          "提前访问的实际价值",
          "5天提前访问（9月30日-10月4日）是创始人包的核心价值。这意味着您可以在正式发布日之前建立角色、探索初期内容、加入公会，甚至在开放世界PVP区域建立据点。对于重视排名、想要抢先建立优势或计划与朋友组队的玩家来说，这5天可能非常有价值。然而，如果您更喜欢悠闲的游戏体验，或者不确定是否会长期玩下去，提前访问的价值就会降低。",
        ),
        section(
          "standard-tier-analysis",
          "Standard版详细分析",
          "Standard版售价$49.99，包含5天提前访问、独占称号'Founder'、基础装饰套装（头盔、盔甲外观）和一个小宠物。这是最实惠的入门选择，适合预算有限但仍想支持游戏并获得提前访问的玩家。如果您主要关心的是提前访问权限，而对独占装饰物品不太在意，Standard版可能是最佳选择。",
        ),
        section(
          "deluxe-tier-analysis",
          "Deluxe版详细分析",
          "Deluxe版售价$79.99，在Standard版基础上增加：独占坐骑（地面和飞行）、更多装饰套装选项、两个额外宠物和一个独占表情动作。这个版本适合想要更丰富视觉奖励的玩家，但价格比Standard版高出60%。如果您经常展示坐骑和宠物，或者喜欢收集外观物品，Deluxe版可能值得考虑。",
        ),
        section(
          "ultimate-tier-analysis",
          "Ultimate版详细分析",
          "Ultimate版售价$129.99，提供最高级的独占奖励：传奇级外观套装、独占飞行坐骑特效、特殊动画效果和最高级称号。这个版本适合核心粉丝和收藏家，但性价比最低。除非您是AION系列的长期粉丝，并且确定会长期投入游戏，否则建议考虑Standard或Deluxe版。",
        ),
      ],
    }),
    en: articleCopy(guideLabels, "en", 8, {
      eyebrow: "COMPLETE GUIDE",
      title: "AION 2 Founder's Pack Complete Guide: All Three Tiers Explained",
      description:
        "In-depth analysis of AION 2 Founder's Pack Standard, Deluxe, and Ultimate editions, including pricing, exclusive items, early access benefits, and which player types should consider purchasing",
      intro:
        "AION 2 launches on October 5, 2026, but Founder's Pack buyers can experience the game early from September 30 to October 4. This guide will analyze the content differences between the three editions, evaluate value for money, and determine which players should consider purchasing.",
      keywords: ["AION 2 Founder's Pack", "AION 2 early access", "AION 2 buying guide", "AION 2 Standard edition", "AION 2 Deluxe edition", "AION 2 Ultimate edition"],
      sourceNote: "Based on NCSoft's official Founder's Pack store page (August 31, 2026) and Steam store page information.",
      sections: [
        section(
          "founders-pack-overview",
          "Founder's Pack Overview: Three Editions Compared",
          "AION 2 Founder's Pack offers three editions: Standard ($49.99), Deluxe ($79.99), and Ultimate ($129.99). All editions include 5-day early access (September 30 - October 4), but exclusive items and cosmetic rewards differ. The Standard edition includes basic cosmetic items, Deluxe adds mounts and more appearance options, while Ultimate provides the highest-tier exclusive cosmetics and special titles. Importantly, all Founder's Pack items are purely cosmetic and do not affect game balance or provide numerical advantages.",
        ),
        section(
          "early-access-benefits",
          "The Real Value of Early Access",
          "The 5-day early access (September 30 - October 4) is the core value of the Founder's Pack. This means you can create characters, explore early content, join guilds, and even establish footholds in open-world PVP zones before the official launch. For players who value rankings, want to establish early advantages, or plan to team up with friends, these 5 days can be extremely valuable. However, if you prefer a more relaxed gaming experience or are unsure about long-term commitment, the value of early access decreases.",
        ),
        section(
          "standard-tier-analysis",
          "Standard Edition Detailed Analysis",
          "The Standard edition costs $49.99 and includes 5-day early access, an exclusive 'Founder' title, a basic cosmetic set (helmet, armor appearance), and a small pet. This is the most affordable entry option, suitable for budget-conscious players who still want to support the game and gain early access. If your main concern is early access and you're less interested in exclusive cosmetic items, the Standard edition may be the best choice.",
        ),
        section(
          "deluxe-tier-analysis",
          "Deluxe Edition Detailed Analysis",
          "The Deluxe edition costs $79.99 and adds to the Standard edition: an exclusive mount (ground and flight), more cosmetic set options, two additional pets, and an exclusive emote animation. This edition suits players who want richer visual rewards, but costs 60% more than Standard. If you frequently showcase mounts and pets, or enjoy collecting appearance items, the Deluxe edition may be worth considering.",
        ),
        section(
          "ultimate-tier-analysis",
          "Ultimate Edition Detailed Analysis",
          "The Ultimate edition costs $129.99 and provides the highest-tier exclusive rewards: legendary-tier cosmetic sets, exclusive flight mount effects, special animations, and the highest-tier title. This edition is for hardcore fans and collectors, but has the lowest value proposition. Unless you're a long-time AION series fan and certain about long-term investment, consider the Standard or Deluxe editions instead.",
        ),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 8, {
      eyebrow: "GUIDE COMPLET",
      title: "Guide complet du pack fondateur AION 2 : Les trois niveaux expliqués",
      description:
        "Analyse approfondie des éditions Standard, Deluxe et Ultimate du pack fondateur AION 2, incluant prix, objets exclusifs, avantages d'accès anticipé et types de joueurs concernés",
      intro:
        "AION 2 sort le 5 octobre 2026, mais les acheteurs du pack fondateur peuvent découvrir le jeu en avance du 30 septembre au 4 octobre. Ce guide analysera les différences de contenu entre les trois éditions, évaluera le rapport qualité-prix et déterminera quels joueurs devraient envisager d'acheter.",
      keywords: ["Pack fondateur AION 2", "Accès anticipé AION 2", "Guide d'achat AION 2", "Édition Standard AION 2", "Édition Deluxe AION 2", "Édition Ultimate AION 2"],
      sourceNote: "Basé sur la page officielle du pack fondateur de NCSoft (31 août 2026) et les informations de la page Steam.",
      sections: [
        section("founders-pack-overview", "Aperçu du pack fondateur : Trois éditions comparées", "Le pack fondateur AION 2 propose trois éditions : Standard (49,99 $), Deluxe (79,99 $) et Ultimate (129,99 $). Toutes les éditions incluent 5 jours d'accès anticipé (30 septembre - 4 octobre), mais les objets exclusifs et récompenses cosmétiques diffèrent."),
        section("early-access-benefits", "La vraie valeur de l'accès anticipé", "Les 5 jours d'accès anticipé (30 septembre - 4 octobre) constituent la valeur centrale du pack fondateur."),
        section("standard-tier-analysis", "Analyse détaillée de l'édition Standard", "L'édition Standard coûte 49,99 $ et inclut 5 jours d'accès anticipé, un titre exclusif 'Fondateur', un ensemble cosmétique de base et un petit familier."),
        section("deluxe-tier-analysis", "Analyse détaillée de l'édition Deluxe", "L'édition Deluxe coûte 79,99 $ et ajoute à l'édition Standard : une monture exclusive, plus d'options cosmétiques, deux familiers supplémentaires et une animation d'emote exclusive."),
        section("ultimate-tier-analysis", "Analyse détaillée de l'édition Ultimate", "L'édition Ultimate coûte 129,99 $ et fournit les récompenses exclusives de plus haut niveau : ensembles cosmétiques de niveau légendaire, effets de monture volante exclusifs, animations spéciales et titre de plus haut niveau."),
      ],
    }),
    de: articleCopy(guideLabels, "de", 8, {
      eyebrow: "KOMPLETTER LEITFADEN",
      title: "AION 2 Gründerpaket Kompletter Leitfaden: Alle drei Stufen erklärt",
      description:
        "Tiefgehende Analyse der AION 2 Gründerpaket Standard-, Deluxe- und Ultimate-Editionen, einschließlich Preisen, exklusiven Gegenständen, Frühzugang-Vorteilen und welche Spielertypen kaufen sollten",
      intro:
        "AION 2 startet am 5. Oktober 2026, aber Gründerpaket-Käufer können das Spiel vom 30. September bis 4. Oktober früh erleben. Dieser Leitfaden analysiert die Inhaltsunterschiede zwischen den drei Editionen, bewertet das Preis-Leistungs-Verhältnis und bestimmt, welche Spieler einen Kauf in Betracht ziehen sollten.",
      keywords: ["AION 2 Gründerpaket", "AION 2 Frühzugang", "AION 2 Kaufleitfaden", "AION 2 Standard-Edition", "AION 2 Deluxe-Edition", "AION 2 Ultimate-Edition"],
      sourceNote: "Basierend auf der offiziellen Gründerpaket-Seite von NCSoft (31. August 2026) und Steam-Shop-Informationen.",
      sections: [
        section("founders-pack-overview", "Gründerpaket-Überblick: Drei Editionen im Vergleich", "Das AION 2 Gründerpaket bietet drei Editionen: Standard (49,99 $), Deluxe (79,99 $) und Ultimate (129,99 $). Alle Editionen beinhalten 5 Tage Frühzugang (30. September - 4. Oktober), aber exklusive Gegenstände und kosmetische Belohnungen unterscheiden sich."),
        section("early-access-benefits", "Der wahre Wert des Frühzugangs", "Die 5 Tage Frühzugang (30. September - 4. Oktober) sind der Kernwert des Gründerpakets."),
        section("standard-tier-analysis", "Detaillierte Analyse der Standard-Edition", "Die Standard-Edition kostet 49,99 $ und beinhaltet 5 Tage Frühzugang, einen exklusiven 'Gründer'-Titel, ein basis-kosmetisches Set und ein kleines Haustier."),
        section("deluxe-tier-analysis", "Detaillierte Analyse der Deluxe-Edition", "Die Deluxe-Edition kostet 79,99 $ und fügt der Standard-Edition hinzu: ein exklusives Reittier, mehr kosmetische Optionen, zwei zusätzliche Haustiere und eine exklusive Emote-Animation."),
        section("ultimate-tier-analysis", "Detaillierte Analyse der Ultimate-Edition", "Die Ultimate-Edition kostet 129,99 $ und bietet die höchsten exklusiven Belohnungen: legendäre kosmetische Sets, exklusive Flugreittier-Effekte, spezielle Animationen und den höchsten Titel."),
      ],
    }),
    es: articleCopy(guideLabels, "es", 8, {
      eyebrow: "GUÍA COMPLETA",
      title: "Guía completa del paquete fundador de AION 2: Las tres ediciones explicadas",
      description:
        "Análisis detallado de las ediciones Standard, Deluxe y Ultimate del paquete fundador de AION 2, incluyendo precios, objetos exclusivos, beneficios de acceso anticipado y qué tipos de jugadores deberían considerar comprar",
      intro:
        "AION 2 se lanza el 5 de octubre de 2026, pero los compradores del paquete fundador pueden experimentar el juego antes del 30 de septiembre al 4 de octubre. Esta guía analizará las diferencias de contenido entre las tres ediciones, evaluará la relación calidad-precio y determinará qué jugadores deberían considerar comprar.",
      keywords: ["Paquete fundador AION 2", "Acceso anticipado AION 2", "Guía de compra AION 2", "Edición Standard AION 2", "Edición Deluxe AION 2", "Edición Ultimate AION 2"],
      sourceNote: "Basado en la página oficial del paquete fundador de NCSoft (31 de agosto de 2026) e información de la tienda de Steam.",
      sections: [
        section("founders-pack-overview", "Descripción del paquete fundador: Tres ediciones comparadas", "El paquete fundador de AION 2 ofrece tres ediciones: Standard ($49.99), Deluxe ($79.99) y Ultimate ($129.99). Todas las ediciones incluyen 5 días de acceso anticipado (30 de septiembre - 4 de octubre), pero los objetos exclusivos y recompensas cosméticas difieren."),
        section("early-access-benefits", "El verdadero valor del acceso anticipado", "Los 5 días de acceso anticipado (30 de septiembre - 4 de octubre) son el valor central del paquete fundador."),
        section("standard-tier-analysis", "Análisis detallado de la edición Standard", "La edición Standard cuesta $49.99 e incluye 5 días de acceso anticipado, un título exclusivo 'Fundador', un conjunto cosmético básico y una pequeña mascota."),
        section("deluxe-tier-analysis", "Análisis detallado de la edición Deluxe", "La edición Deluxe cuesta $79.99 y añade a la edición Standard: una montura exclusiva, más opciones cosméticas, dos mascotas adicionales y una animación de emote exclusiva."),
        section("ultimate-tier-analysis", "Análisis detallado de la edición Ultimate", "La edición Ultimate cuesta $129.99 y proporciona las recompensas exclusivas de mayor nivel: conjuntos cosméticos de nivel legendario, efectos de montura voladora exclusivos, animaciones especiales y título de mayor nivel."),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 8, {
      eyebrow: "完全ガイド",
      title: "AION 2 創設者パック完全ガイド：3つのエディション解説",
      description:
        "AION 2創設者パックのStandard、Deluxe、Ultimateエディションの詳細分析。価格、独占アイテム、早期アクセスの特典、どのプレイヤータイプが購入を検討すべきかを含む",
      intro:
        "AION 2は2026年10月5日に発売されますが、創設者パック購入者は9月30日から10月4日までゲームを早期に体験できます。このガイドでは、3つのエディション間の内容の違いを分析し、コストパフォーマンスを評価し、どのプレイヤーが購入を検討すべきかを判断します。",
      keywords: ["AION 2創設者パック", "AION 2早期アクセス", "AION 2購入ガイド", "AION 2 Standardエディション", "AION 2 Deluxeエディション", "AION 2 Ultimateエディション"],
      sourceNote: "NCSoft公式創設者パックストアページ（2026年8月31日）およびSteamストアページ情報に基づく。",
      sections: [
        section("founders-pack-overview", "創設者パック概要：3つのエディション比較", "AION 2創設者パックは3つのエディションを提供：Standard（$49.99）、Deluxe（$79.99）、Ultimate（$129.99）。すべてのエディションに5日間の早期アクセス（9月30日-10月4日）が含まれますが、独占アイテムとコスメティック報酬が異なります。"),
        section("early-access-benefits", "早期アクセスの真の価値", "5日間の早期アクセス（9月30日-10月4日）が創設者パックの核心的価値です。"),
        section("standard-tier-analysis", "Standardエディション詳細分析", "Standardエディションは$49.99で、5日間の早期アクセス、独占タイトル「Founder」、基本コスメティックセット、小さなペットが含まれます。"),
        section("deluxe-tier-analysis", "Deluxeエディション詳細分析", "Deluxeエディションは$79.99で、Standardエディションに以下を追加：独占マウント、より多くのコスメティックオプション、2つの追加ペット、独占エモートアニメーション。"),
        section("ultimate-tier-analysis", "Ultimateエディション詳細分析", "Ultimateエディションは$129.99で、最高 tier の独占報酬を提供：伝説級コスメティックセット、独占飛行マウントエフェクト、特別アニメーション、最高 tier タイトル。"),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 8, {
      eyebrow: "GUIA COMPLETO",
      title: "Guia completo do Pacote Fundador do AION 2: Todas as três edições explicadas",
      description:
        "Análise detalhada das edições Standard, Deluxe e Ultimate do Pacote Fundador do AION 2, incluindo preços, itens exclusivos, benefícios de acesso antecipado e quais tipos de jogadores devem considerar a compra",
      intro:
        "O AION 2 será lançado em 5 de outubro de 2026, mas os compradores do Pacote Fundador podem experimentar o jogo antecipadamente de 30 de setembro a 4 de outubro. Este guia analisará as diferenças de conteúdo entre as três edições, avaliará a relação custo-benefício e determinará quais jogadores devem considerar a compra.",
      keywords: ["Pacote Fundador AION 2", "Acesso antecipado AION 2", "Guia de compra AION 2", "Edição Standard AION 2", "Edição Deluxe AION 2", "Edição Ultimate AION 2"],
      sourceNote: "Baseado na página oficial do Pacote Fundador da NCSoft (31 de agosto de 2026) e informações da loja Steam.",
      sections: [
        section("founders-pack-overview", "Visão geral do Pacote Fundador: Três edições comparadas", "O Pacote Fundador do AION 2 oferece três edições: Standard ($49,99), Deluxe ($79,99) e Ultimate ($129,99). Todas as edições incluem 5 dias de acesso antecipado (30 de setembro - 4 de outubro), mas itens exclusivos e recompensas cosméticas diferem."),
        section("early-access-benefits", "O verdadeiro valor do acesso antecipado", "Os 5 dias de acesso antecipado (30 de setembro - 4 de outubro) são o valor central do Pacote Fundador."),
        section("standard-tier-analysis", "Análise detalhada da edição Standard", "A edição Standard custa $49,99 e inclui 5 dias de acesso antecipado, um título exclusivo 'Fundador', um conjunto cosmético básico e um pequeno mascote."),
        section("deluxe-tier-analysis", "Análise detalhada da edição Deluxe", "A edição Deluxe custa $79,99 e adiciona à edição Standard: uma montaria exclusiva, mais opções cosméticas, dois mascotes adicionais e uma animação de emote exclusiva."),
        section("ultimate-tier-analysis", "Análise detalhada da edição Ultimate", "A edição Ultimate custa $129,99 e fornece as recompensas exclusivas de nível mais alto: conjuntos cosméticos de nível lendário, efeitos de montaria voadora exclusivos, animações especiais e título de nível mais alto."),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 8, {
      eyebrow: "ПОЛНОЕ РУКОВОДСТВО",
      title: "Полное руководство по пакету основателя AION 2: Все три издания объяснены",
      description:
        "Подробный анализ изданий Standard, Deluxe и Ultimate пакета основателя AION 2, включая цены, эксклюзивные предметы, преимущества раннего доступа и какие типы игроков должны рассмотреть покупку",
      intro:
        "AION 2 выходит 5 октября 2026 года, но покупатели пакета основателя могут испытать игру заранее с 30 сентября по 4 октября. Это руководство проанализирует различия в содержании между тремя изданиями, оценит соотношение цены и качества и определит, какие игроки должны рассмотреть покупку.",
      keywords: ["Пакет основателя AION 2", "Ранний доступ AION 2", "Руководство по покупке AION 2", "Издание Standard AION 2", "Издание Deluxe AION 2", "Издание Ultimate AION 2"],
      sourceNote: "На основе официальной страницы пакета основателя NCSoft (31 августа 2026 г.) и информации магазина Steam.",
      sections: [
        section("founders-pack-overview", "Обзор пакета основателя: Три издания в сравнении", "Пакет основателя AION 2 предлагает три издания: Standard ($49.99), Deluxe ($79.99) и Ultimate ($129.99). Все издания включают 5 дней раннего доступа (30 сентября - 4 октября), но эксклюзивные предметы и косметические награды различаются."),
        section("early-access-benefits", "Настоящая ценность раннего доступа", "5 дней раннего доступа (30 сентября - 4 октября) являются основной ценностью пакета основателя."),
        section("standard-tier-analysis", "Подробный анализ издания Standard", "Издание Standard стоит $49.99 и включает 5 дней раннего доступа, эксклюзивный титул 'Основатель', базовый косметический набор и маленького питомца."),
        section("deluxe-tier-analysis", "Подробный анализ издания Deluxe", "Издание Deluxe стоит $79.99 и добавляет к изданию Standard: эксклюзивного маунта, больше косметических опций, двух дополнительных питомцев и эксклюзивную анимацию эмоции."),
        section("ultimate-tier-analysis", "Подробный анализ издания Ultimate", "Издание Ultimate стоит $129.99 и предоставляет эксклюзивные награды высшего уровня: косметические наборы легендарного уровня, эксклюзивные эффекты летающего маунта, специальные анимации и титул высшего уровня."),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 8, {
      eyebrow: "완벽한 가이드",
      title: "AION 2 창립자 팩 완벽 가이드: 세 가지 에디션详解",
      description:
        "AION 2 창립자 팩의 Standard, Deluxe, Ultimate 에디션에 대한 심층 분석. 가격, 독점 아이템, 조기 액세스 혜택, 어떤 플레이어 유형이 구매를 고려해야 하는지 포함",
      intro:
        "AION 2는 2026년 10월 5일에 출시되지만, 창립자 팩 구매자는 9월 30일부터 10월 4일까지 게임을 미리 체험할 수 있습니다. 이 가이드는 세 에디션 간의 콘텐츠 차이를 분석하고, 비용 대비 가치를 평가하며, 어떤 플레이어가 구매를 고려해야 하는지 판단합니다.",
      keywords: ["AION 2 창립자 팩", "AION 2 조기 액세스", "AION 2 구매 가이드", "AION 2 Standard 에디션", "AION 2 Deluxe 에디션", "AION 2 Ultimate 에디션"],
      sourceNote: "NCSoft 공식 창립자 팩 스토어 페이지(2026-08-31) 및 Steam 스토어 페이지 정보 기반.",
      sections: [
        section("founders-pack-overview", "창립자 팩 개요: 세 가지 에디션 비교", "AION 2 창립자 팩은 세 가지 에디션을 제공합니다: Standard($49.99), Deluxe($79.99), Ultimate($129.99). 모든 에디션에는 5일간의 조기 액세스(9월 30일 - 10월 4일)가 포함되지만, 독점 아이템과 코스메틱 보상은 다릅니다."),
        section("early-access-benefits", "조기 액세스의 실제 가치", "5일간의 조기 액세스(9월 30일 - 10월 4일)가 창립자 팩의 핵심 가치입니다."),
        section("standard-tier-analysis", "Standard 에디션 상세 분석", "Standard 에디션은 $49.99이며, 5일간의 조기 액세스, 독점 타이틀 'Founder', 기본 코스메틱 세트, 작은 펫이 포함됩니다."),
        section("deluxe-tier-analysis", "Deluxe 에디션 상세 분석", "Deluxe 에디션은 $79.99이며, Standard 에디션에 다음을 추가합니다: 독점 마운트, 더 많은 코스메틱 옵션, 2개의 추가 펫, 독점 이모트 애니메이션."),
        section("ultimate-tier-analysis", "Ultimate 에디션 상세 분석", "Ultimate 에디션은 $129.99이며, 최고 등급의 독점 보상을 제공합니다: 전설급 코스메틱 세트, 독점 비행 마운트 이펙트, 특수 애니메이션, 최고 등급 타이틀."),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 8, {
      eyebrow: "完全指南",
      title: "AION 2 創始人包完整指南：三個tier詳解與購買建議",
      description:
        "深入分析AION 2創始人包的Standard、Deluxe和Ultimate三個版本，包括價格、獨占物品、提前訪問優勢，以及適合哪些玩家類型",
      intro:
        "AION 2將於2026年10月5日正式發布，但創始人包購買者可以在9月30日至10月4日期間提前體驗遊戲。本指南將詳細分析三個版本的內容差異、性價比評估，以及哪些玩家應該考慮購買。",
      keywords: ["AION 2創始人包", "AION 2提前訪問", "AION 2購買指南", "AION 2 Standard版", "AION 2 Deluxe版", "AION 2 Ultimate版"],
      sourceNote: "基於 NCSoft 官方創始人包商店頁面（2026-08-31）和 Steam 商店頁面資訊整理。",
      sections: [
        section("founders-pack-overview", "創始人包概覽：三個版本對比", "AION 2創始人包提供三個版本：Standard版（$49.99）、Deluxe版（$79.99）和Ultimate版（$129.99）。所有版本都包含5天提前訪問權限（9月30日-10月4日），但獨占物品和裝飾性獎勵有所不同。Standard版包含基礎裝飾物品，Deluxe版增加坐騎和更多外觀選項，Ultimate版則提供最高級的獨占外觀和特殊稱號。值得注意的是，所有創始人包物品都是純裝飾性的，不會影響遊戲平衡或提供數值優勢。"),
        section("early-access-benefits", "提前訪問的實際價值", "5天提前訪問（9月30日-10月4日）是創始人包的核心價值。這意味著您可以在正式發布日之前建立角色、探索初期內容、加入公會，甚至在開放世界PVP區域建立據點。對於重視排名、想要搶先建立優勢或計劃與朋友組隊的玩家來說，這5天可能非常有價值。然而，如果您更喜歡悠閒的遊戲體驗，或者不確定是否會長期玩下去，提前訪問的價值就會降低。"),
        section("standard-tier-analysis", "Standard版詳細分析", "Standard版售價$49.99，包含5天提前訪問、獨占稱號'Founder'、基礎裝飾套裝（頭盔、盔甲外觀）和一個小寵物。這是最實惠的入門選擇，適合預算有限但仍想支持遊戲並獲得提前訪問的玩家。如果您主要關心的是提前訪問權限，而對獨占裝飾物品不太在意，Standard版可能是最佳選擇。"),
        section("deluxe-tier-analysis", "Deluxe版詳細分析", "Deluxe版售價$79.99，在Standard版基礎上增加：獨占坐騎（地面和飛行）、更多裝飾套裝選項、兩個額外寵物和一個獨占表情動作。這個版本適合想要更豐富視覺獎勵的玩家，但價格比Standard版高出60%。如果您經常展示坐騎和寵物，或者喜歡收集外觀物品，Deluxe版可能值得考慮。"),
        section("ultimate-tier-analysis", "Ultimate版詳細分析", "Ultimate版售價$129.99，提供最高級的獨占獎勵：傳奇級外觀套裝、獨占飛行坐騎特效、特殊動畫效果和最高級稱號。這個版本適合核心粉絲和收藏家，但性價比最低。除非您是AION系列的長期粉絲，並且確定會長期投入遊戲，否則建議考慮Standard或Deluxe版。"),
      ],
    }),
  },
};
