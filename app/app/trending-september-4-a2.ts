import {
  articleCopy,
  localizations,
  guideLabels,
  publishedVerified,
  readingTime,
  section,
} from "./trending-september-4-shared";
import type { ContentSource, ContentHeroImage } from "./content-registry";

// Source 1: Official NCSoft announcement
const lstAnnouncementSource: ContentSource = {
  id: "ncsoft-lst-announcement",
  kind: "official",
  publisher: "NCSoft",
  label: "AION 2 Launch Scale Test Schedule Announcement",
  url: "https://aion2.plaync.com/en-us/board/notice",
  publishedAt: "2026-08-26",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 发布规模测试时间表公告",
      en: "AION 2 Launch Scale Test Schedule Announcement",
      fr: "Annonce du calendrier du test d'échelle de lancement d'AION 2",
      de: "AION 2 Start-Skalentest-Zeitplan-Ankündigung",
      es: "Anuncio del calendario de prueba de escala de lanzamiento de AION 2",
      ja: "AION 2 ローンチスケールテストスケジュール発表",
      "pt-br": "Anúncio do cronograma de teste de escala de lançamento do AION 2",
      ru: "Анонс расписания масштабного теста запуска AION 2",
      ko: "AION 2 출시 규모 테스트 일정 발표",
      "zh-hant": "AION 2 發布規模測試時間表公告",
    },
    "https://aion2.plaync.com/en-us/board/notice",
  ),
};

// Source 2: Community guide
const lstPrepGuideSource: ContentSource = {
  id: "aion2hub-lst-preparation-guide",
  kind: "third-party",
  publisher: "AION2Hub",
  label: "AION 2 Launch Scale Test: Complete Preparation Guide",
  url: "https://aion2hub.com/guides/launch-scale-test-preparation/",
  publishedAt: "2026-09-01",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 发布规模测试：完整准备指南",
      en: "AION 2 Launch Scale Test: Complete Preparation Guide",
      fr: "Test d'échelle de lancement d'AION 2 : Guide de préparation complet",
      de: "AION 2 Start-Skalentest: Vollständiger Vorbereitungsguide",
      es: "Prueba de escala de lanzamiento de AION 2: Guía de preparación completa",
      ja: "AION 2 ローンチスケールテスト：完全準備ガイド",
      "pt-br": "Teste de escala de lançamento do AION 2: Guia de preparação completo",
      ru: "Масштабный тест запуска AION 2: Полное руководство по подготовке",
      ko: "AION 2 출시 규모 테스트: 완전한 준비 가이드",
      "zh-hant": "AION 2 發布規模測試：完整準備指南",
    },
    "https://aion2hub.com/guides/launch-scale-test-preparation/",
  ),
};

// Hero image
const lstHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1200, height: 630,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/en-us/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 发布规模测试官方横幅", caption: "发布规模测试将于9月17-18日韩国时间举行，为10月5日正式发布做最后准备。" },
    en: { alt: "AION 2 Launch Scale Test official banner", caption: "Launch Scale Test will be held on September 17-18 KST, final preparation before October 5 official launch." },
    fr: { alt: "Bannière officielle du test d'échelle de lancement d'AION 2", caption: "Le test d'échelle de lancement aura lieu les 17 et 18 septembre KST, dernière préparation avant le lancement officiel du 5 octobre." },
    de: { alt: "AION 2 Start-Skalentest offizielles Banner", caption: "Der Start-Skalentest findet am 17.-18. September KST statt, letzte Vorbereitung vor dem offiziellen Start am 5. Oktober." },
    es: { alt: "Banner oficial de la prueba de escala de lanzamiento de AION 2", caption: "La prueba de escala de lanzamiento se realizará el 17 y 18 de septiembre KST, preparación final antes del lanzamiento oficial del 5 de octubre." },
    ja: { alt: "AION 2 ローンチスケールテスト公式バナー", caption: "ローンチスケールテストは9月17-18日KSTに開催され、10月5日の正式リリースに向けた最終準備。" },
    "pt-br": { alt: "Banner oficial do teste de escala de lançamento do AION 2", caption: "O teste de escala de lançamento será realizado em 17 e 18 de setembro KST, preparação final antes do lançamento oficial em 5 de outubro." },
    ru: { alt: "Официальный баннер масштабного теста запуска AION 2", caption: "Масштабный тест запуска состоится 17-18 сентября KST, последняя подготовка перед официальным запуском 5 октября." },
    ko: { alt: "AION 2 출시 규모 테스트 공식 배너", caption: "출시 규모 테스트는 9월 17-18일 KST에 개최되며, 10월 5일 공식 출시를 위한 최종 준비입니다." },
    "zh-hant": { alt: "AION 2 發布規模測試官方橫幅", caption: "發布規模測試將於9月17-18日韓國時間舉行，為10月5日正式發布做最後準備。" },
  },
};

export const trendingSeptember4Article2 = {
  section: "guides" as const,
  slug: "aion-2-launch-scale-test-preparation-guide",
  schemaType: "TechArticle" as const,
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  readingMinutes: 6,
  publication: publishedVerified,
  sources: [lstAnnouncementSource, lstPrepGuideSource],
  heroImage: lstHero,
  related: [
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-founders-pack-complete-guide" },
    { kind: "content" as const, section: "news" as const, slug: "aion-2-october-5-launch-countdown-roadmap" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-korea-server-class-tier-guide" },
  ],
  translations: {
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "准备指南",
      title: "AION 2 发布规模测试完整准备指南：9月17-18日你需要知道的一切",
      description:
        "完整准备清单，包括系统要求检查、账号设置、职业预选择、团队协调和测试目标规划，确保你在发布规模测试中最大化体验",
      intro:
        "AION 2 的发布规模测试（Launch Scale Test, LST）定于2026年9月17-18日（韩国时间）举行。这是一次重要的压力测试，旨在验证服务器容量和游戏稳定性。本文将帮助你做好充分准备，确保你能充分利用这次测试机会。",
      keywords: ["AION 2 LST", "AION 2 发布规模测试", "AION 2 测试准备", "AION 2 系统要求", "AION 2 职业选择"],
      sourceNote: "基于 NCSoft 官方公告（2026-08-26）和 AION2Hub 社区准备指南（2026-09-01）整理。",
      sections: [
        section(
          "lst-overview",
          "什么是发布规模测试（LST）？",
          "发布规模测试是AION 2在正式发布前的最后一次大规模技术测试。与之前的封闭测试不同，LST的目的是验证服务器在高并发情况下的表现。测试期间，玩家将体验完整的37级上限内容，包括主线任务、副本、PVP区域和公会系统。测试结束后，角色数据将被清除，但测试期间的表现可能影响正式发布时的奖励分配。",
        ),
        section(
          "system-requirements",
          "系统要求检查与优化",
          "在LST之前，请确保你的电脑满足推荐配置：CPU Intel i5-8400 / AMD Ryzen 5 2600、内存16GB RAM、显卡 GTX 1060 6GB / RX 580、存储空间50GB SSD。建议提前更新显卡驱动、关闭后台占用程序、测试网络连接稳定性。如果使用笔记本电脑，请确保散热良好并接通电源。",
        ),
        section(
          "account-setup",
          "账号设置与预注册",
          "所有参与LST的玩家需要提前在NCSoft账号系统中注册并激活AION 2。如果你购买了创始人包，确保你的账号已关联。测试客户端将在测试前2天开放下载，建议提前下载并安装以避免测试首日的服务器拥堵。",
        ),
        section(
          "class-preparation",
          "职业预选择与练级规划",
          "AION 2提供8个基础职业（战士、法师、牧师、刺客、弓手、召唤师、剑士、工程师），每个职业有3个专精方向。建议提前规划你想在LST中尝试的职业，但也要准备好根据团队需求调整。37级上限意味着你可以在测试中体验完整的职业成长曲线，但不足以解锁所有高级技能。",
        ),
        section(
          "team-coordination",
          "团队协调与测试目标",
          "LST是测试组队内容和公会系统的绝佳机会。提前与朋友或公会成员协调，规划测试期间的目标：探索所有地图、测试副本机制、组织大规模PVP战斗。记录你遇到的bug或不平衡问题，这些反馈对开发团队非常有价值。",
        ),
      ],
    }),
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "PREPARATION GUIDE",
      title: "AION 2 Launch Scale Test Complete Preparation Guide: Everything You Need to Know for September 17-18",
      description:
        "Complete preparation checklist including system requirements check, account setup, class pre-selection, team coordination, and test objective planning to maximize your Launch Scale Test experience",
      intro:
        "AION 2's Launch Scale Test (LST) is scheduled for September 17-18, 2026 (KST). This is a critical stress test designed to verify server capacity and game stability. This article will help you prepare thoroughly to ensure you make the most of this testing opportunity.",
      keywords: ["AION 2 LST", "AION 2 Launch Scale Test", "AION 2 test preparation", "AION 2 system requirements", "AION 2 class selection"],
      sourceNote: "Based on NCSoft's official announcement (August 26, 2026) and AION2Hub community preparation guide (September 1, 2026).",
      sections: [
        section(
          "lst-overview",
          "What is the Launch Scale Test (LST)?",
          "The Launch Scale Test is AION 2's final large-scale technical test before official launch. Unlike previous closed tests, LST aims to verify server performance under high concurrency. During the test, players will experience complete level 37 cap content, including main quests, dungeons, PVP zones, and guild systems. Character data will be wiped after the test, but performance during testing may affect reward distribution at official launch.",
        ),
        section(
          "system-requirements",
          "System Requirements Check and Optimization",
          "Before LST, ensure your PC meets recommended specs: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16GB, GPU GTX 1060 6GB / RX 580, storage 50GB SSD. Update graphics drivers in advance, close background programs, test network connection stability. If using a laptop, ensure good cooling and connect to power.",
        ),
        section(
          "account-setup",
          "Account Setup and Pre-registration",
          "All players participating in LST must register and activate AION 2 in the NCSoft account system beforehand. If you purchased a Founder's Pack, ensure your account is linked. The test client will be available for download 2 days before the test; download and install early to avoid Day 1 server congestion.",
        ),
        section(
          "class-preparation",
          "Class Pre-selection and Leveling Plan",
          "AION 2 offers 8 base classes (Warrior, Mage, Cleric, Assassin, Archer, Summoner, Swordmaster, Engineer), each with 3 specialization paths. Plan which class you want to try in LST, but be ready to adjust based on team needs. The level 37 cap means you can experience the complete class growth curve during testing, but not enough to unlock all advanced skills.",
        ),
        section(
          "team-coordination",
          "Team Coordination and Test Objectives",
          "LST is an excellent opportunity to test group content and guild systems. Coordinate with friends or guild members in advance, plan testing objectives: explore all maps, test dungeon mechanics, organize large-scale PVP battles. Record bugs or balance issues you encounter; this feedback is invaluable to the development team.",
        ),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE DE PRÉPARATION",
      title: "Guide de préparation complet au test d'échelle de lancement d'AION 2 : Tout ce que vous devez savoir pour le 17-18 septembre",
      description:
        "Liste de préparation complète incluant vérification des configurations système, configuration du compte, pré-sélection de classe, coordination d'équipe et planification des objectifs de test",
      intro:
        "Le test d'échelle de lancement d'AION 2 est prévu pour les 17-18 septembre 2026 (KST). Ce test de stress critique vise à vérifier la capacité des serveurs et la stabilité du jeu.",
      keywords: ["AION 2 LST", "Test d'échelle de lancement AION 2", "Préparation test AION 2", "Configuration système AION 2", "Sélection de classe AION 2"],
      sourceNote: "Basé sur l'annonce officielle de NCSoft (26 août 2026) et le guide de préparation communautaire AION2Hub (1er septembre 2026).",
      sections: [
        section("lst-overview", "Qu'est-ce que le test d'échelle de lancement (LST) ?", "Le LST est le dernier test technique à grande échelle d'AION 2 avant le lancement officiel. Contrairement aux tests fermés précédents, le LST vise à vérifier les performances des serveurs sous forte concurrence."),
        section("system-requirements", "Vérification et optimisation des configurations système", "Avant le LST, assurez-vous que votre PC répond aux spécifications recommandées : CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 Go, GPU GTX 1060 6 Go / RX 580, stockage 50 Go SSD."),
        section("account-setup", "Configuration du compte et pré-inscription", "Tous les joueurs participant au LST doivent s'inscrire et activer AION 2 dans le système de compte NCSoft au préalable."),
        section("class-preparation", "Pré-sélection de classe et plan de montée en niveau", "AION 2 propose 8 classes de base (Guerrier, Mage, Clerc, Assassin, Archer, Invocateur, Maître d'épée, Ingénieur), chacune avec 3 chemins de spécialisation."),
        section("team-coordination", "Coordination d'équipe et objectifs de test", "Le LST est une excellente occasion de tester le contenu de groupe et les systèmes de guilde."),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "VORBEREITUNGSLEITFADEN",
      title: "AION 2 Start-Skalentest Kompletter Vorbereitungsguide: Alles was Sie für den 17.-18. September wissen müssen",
      description:
        "Vollständige Vorbereitungscheckliste einschließlich Systemanforderungsprüfung, Kontoeinrichtung, Klassenvorauswahl, Teamkoordination und Testzielplanung",
      intro:
        "Der Start-Skalentest von AION 2 ist für den 17.-18. September 2026 (KST) geplant. Dieser kritische Stresstest soll die Serverkapazität und Spielstabilität überprüfen.",
      keywords: ["AION 2 LST", "AION 2 Start-Skalentest", "AION 2 Testvorbereitung", "AION 2 Systemanforderungen", "AION 2 Klassenauswahl"],
      sourceNote: "Basierend auf NCSofts offizieller Ankündigung (26. August 2026) und dem AION2Hub-Community-Vorbereitungsleitfaden (1. September 2026).",
      sections: [
        section("lst-overview", "Was ist der Start-Skalentest (LST)?", "Der LST ist der letzte großangelegte technische Test von AION 2 vor dem offiziellen Start. Im Gegensatz zu früheren geschlossenen Tests zielt der LST darauf ab, die Serverleistung unter hoher Gleichzeitigkeit zu überprüfen."),
        section("system-requirements", "Systemanforderungsprüfung und Optimierung", "Stellen Sie vor dem LST sicher, dass Ihr PC die empfohlenen Spezifikationen erfüllt: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 GB, GPU GTX 1060 6 GB / RX 580, Speicher 50 GB SSD."),
        section("account-setup", "Kontoeinrichtung und Vorregistrierung", "Alle Spieler, die am LST teilnehmen, müssen sich vorher im NCSoft-Kontensystem registrieren und AION 2 aktivieren."),
        section("class-preparation", "Klassenvorauswahl und Levelplan", "AION 2 bietet 8 Basisklassen (Krieger, Magier, Kleriker, Assassine, Bogenschütze, Beschwörer, Schwertmeister, Ingenieur), jeweils mit 3 Spezialisierungspfaden."),
        section("team-coordination", "Teamkoordination und Testziele", "Der LST ist eine ausgezeichnete Gelegenheit, Gruppeninhalte und Gildensysteme zu testen."),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE PREPARACIÓN",
      title: "Guía completa de preparación para la prueba de escala de lanzamiento de AION 2: Todo lo que necesitas saber para el 17-18 de septiembre",
      description:
        "Lista de preparación completa que incluye verificación de requisitos del sistema, configuración de cuenta, preselección de clase, coordinación de equipo y planificación de objetivos de prueba",
      intro:
        "La prueba de escala de lanzamiento de AION 2 está programada para el 17-18 de septiembre de 2026 (KST). Esta prueba de estrés crítica está diseñada para verificar la capacidad del servidor y la estabilidad del juego.",
      keywords: ["AION 2 LST", "Prueba de escala de lanzamiento AION 2", "Preparación prueba AION 2", "Requisitos del sistema AION 2", "Selección de clase AION 2"],
      sourceNote: "Basado en el anuncio oficial de NCSoft (26 de agosto de 2026) y la guía de preparación comunitaria de AION2Hub (1 de septiembre de 2026).",
      sections: [
        section("lst-overview", "¿Qué es la prueba de escala de lanzamiento (LST)?", "La LST es la última prueba técnica a gran escala de AION 2 antes del lanzamiento oficial. A diferencia de las pruebas cerradas anteriores, la LST tiene como objetivo verificar el rendimiento del servidor bajo alta concurrencia."),
        section("system-requirements", "Verificación y optimización de requisitos del sistema", "Antes de la LST, asegúrate de que tu PC cumpla con las especificaciones recomendadas: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 GB, GPU GTX 1060 6 GB / RX 580, almacenamiento 50 GB SSD."),
        section("account-setup", "Configuración de cuenta y preregistro", "Todos los jugadores que participen en la LST deben registrarse y activar AION 2 en el sistema de cuentas de NCSoft con anticipación."),
        section("class-preparation", "Preselección de clase y plan de nivelación", "AION 2 ofrece 8 clases base (Guerrero, Mago, Clérigo, Asesino, Arquero, Invocador, Maestro de espada, Ingeniero), cada una con 3 caminos de especialización."),
        section("team-coordination", "Coordinación de equipo y objetivos de prueba", "La LST es una excelente oportunidad para probar contenido grupal y sistemas de hermandad."),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "準備ガイド",
      title: "AION 2 ローンチスケールテスト完全準備ガイド：9月17-18日に知っておくべきこと",
      description:
        "システム要件チェック、アカウント設定、クラス事前選択、チーム調整、テスト目標計画を含む完全な準備チェックリスト",
      intro:
        "AION 2のローンチスケールテスト（LST）は2026年9月17-18日（KST）に予定されています。これはサーバー容量とゲーム安定性を検証するために設計された重要なストレステストです。",
      keywords: ["AION 2 LST", "AION 2 ローンチスケールテスト", "AION 2 テスト準備", "AION 2 システム要件", "AION 2 クラス選択"],
      sourceNote: "NCSoft公式発表（2026年8月26日）およびAION2Hubコミュニティ準備ガイド（2026年9月1日）に基づく。",
      sections: [
        section("lst-overview", "ローンチスケールテスト（LST）とは？", "LSTは公式リリース前のAION 2の最終大規模技術テストです。以前のクローズドテストとは異なり、LSTは高同時接続下でのサーバーパフォーマンスを検証することを目的としています。"),
        section("system-requirements", "システム要件チェックと最適化", "LSTの前に、PCが推奨スペックを満たしていることを確認してください：CPU Intel i5-8400 / AMD Ryzen 5 2600、RAM 16GB、GPU GTX 1060 6GB / RX 580、ストレージ 50GB SSD。"),
        section("account-setup", "アカウント設定と事前登録", "LSTに参加するすべてのプレイヤーは、事前にNCSoftアカウントシステムでAION 2を登録およびアクティベートする必要があります。"),
        section("class-preparation", "クラス事前選択とレベル上げ計画", "AION 2は8つの基本クラス（戦士、魔法使い、聖職者、暗殺者、弓使い、召喚師、剣士、エンジニア）を提供し、それぞれに3つの専門化パスがあります。"),
        section("team-coordination", "チーム調整とテスト目標", "LSTはグループコンテンツとギルドシステムをテストする絶好の機会です。"),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE PREPARAÇÃO",
      title: "Guia completo de preparação para o teste de escala de lançamento do AION 2: Tudo o que você precisa saber para 17-18 de setembro",
      description:
        "Lista de preparação completa incluindo verificação de requisitos do sistema, configuração de conta, pré-seleção de classe, coordenação de equipe e planejamento de objetivos de teste",
      intro:
        "O teste de escala de lançamento do AION 2 está agendado para 17-18 de setembro de 2026 (KST). Este teste de estresse crítico é projetado para verificar a capacidade do servidor e a estabilidade do jogo.",
      keywords: ["AION 2 LST", "Teste de escala de lançamento AION 2", "Preparação teste AION 2", "Requisitos do sistema AION 2", "Seleção de classe AION 2"],
      sourceNote: "Baseado no anúncio oficial da NCSoft (26 de agosto de 2026) e guia de preparação da comunidade AION2Hub (1 de setembro de 2026).",
      sections: [
        section("lst-overview", "O que é o teste de escala de lançamento (LST)?", "O LST é o último teste técnico em grande escala do AION 2 antes do lançamento oficial. Diferente dos testes fechados anteriores, o LST visa verificar o desempenho do servidor sob alta simultaneidade."),
        section("system-requirements", "Verificação e otimização de requisitos do sistema", "Antes do LST, certifique-se de que seu PC atenda às especificações recomendadas: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 GB, GPU GTX 1060 6 GB / RX 580, armazenamento 50 GB SSD."),
        section("account-setup", "Configuração de conta e pré-registro", "Todos os jogadores participantes do LST devem se registrar e ativar o AION 2 no sistema de contas da NCSoft antecipadamente."),
        section("class-preparation", "Pré-seleção de classe e plano de nivelamento", "O AION 2 oferece 8 classes base (Guerreiro, Mago, Clérigo, Assassino, Arqueiro, Invocador, Mestre de espada, Engenheiro), cada uma com 3 caminhos de especialização."),
        section("team-coordination", "Coordenação de equipe e objetivos de teste", "O LST é uma excelente oportunidade para testar conteúdo de grupo e sistemas de guilda."),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "РУКОВОДСТВО ПО ПОДГОТОВКЕ",
      title: "Полное руководство по подготовке к масштабному тесту запуска AION 2: Всё, что нужно знать для 17-18 сентября",
      description:
        "Полный контрольный список подготовки, включая проверку системных требований, настройку аккаунта, предварительный выбор класса, координацию команды и планирование целей теста",
      intro:
        "Масштабный тест запуска AION 2 запланирован на 17-18 сентября 2026 года (KST). Этот критический стресс-тест предназначен для проверки мощности серверов и стабильности игры.",
      keywords: ["AION 2 LST", "Масштабный тест запуска AION 2", "Подготовка к тесту AION 2", "Системные требования AION 2", "Выбор класса AION 2"],
      sourceNote: "На основе официального анонса NCSoft (26 августа 2026 г.) и руководства по подготовке от сообщества AION2Hub (1 сентября 2026 г.).",
      sections: [
        section("lst-overview", "Что такое масштабный тест запуска (LST)?", "LST — это последний крупномасштабный технический тест AION 2 перед официальным запуском. В отличие от предыдущих закрытых тестов, LST направлен на проверку производительности серверов при высокой одновременной нагрузке."),
        section("system-requirements", "Проверка и оптимизация системных требований", "Перед LST убедитесь, что ваш ПК соответствует рекомендуемым характеристикам: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 ГБ, GPU GTX 1060 6 ГБ / RX 580, хранилище 50 ГБ SSD."),
        section("account-setup", "Настройка аккаунта и предварительная регистрация", "Все игроки, участвующие в LST, должны заранее зарегистрироваться и активировать AION 2 в системе аккаунтов NCSoft."),
        section("class-preparation", "Предварительный выбор класса и план прокачки", "AION 2 предлагает 8 базовых классов (Воин, Маг, Клирик, Ассасин, Лучник, Призыватель, Мастер меча, Инженер), каждый с 3 путями специализации."),
        section("team-coordination", "Координация команды и цели теста", "LST — отличная возможность протестировать групповой контент и системы гильдий."),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "준비 가이드",
      title: "AION 2 출시 규모 테스트 완전 준비 가이드: 9월 17-18일에 알아야 할 모든 것",
      description:
        "시스템 요구사항 확인, 계정 설정, 직업 사전 선택, 팀 조율, 테스트 목표 계획을 포함한 완전한 준비 체크리스트",
      intro:
        "AION 2의 출시 규모 테스트(LST)는 2026년 9월 17-18일(KST)에 예정되어 있습니다. 이 중요한 스트레스 테스트는 서버 용량과 게임 안정성을 검증하기 위해 설계되었습니다.",
      keywords: ["AION 2 LST", "AION 2 출시 규모 테스트", "AION 2 테스트 준비", "AION 2 시스템 요구사항", "AION 2 직업 선택"],
      sourceNote: "NCSoft 공식 발표(2026-08-26) 및 AION2Hub 커뮤니티 준비 가이드(2026-09-01) 기반.",
      sections: [
        section("lst-overview", "출시 규모 테스트(LST)란?", "LST는 공식 출시 전 AION 2의 마지막 대규모 기술 테스트입니다. 이전 폐쇄 테스트와 달리 LST는 높은 동시 접속 환경에서 서버 퍼포먼스를 검증하는 것을 목표로 합니다."),
        section("system-requirements", "시스템 요구사항 확인 및 최적화", "LST 전에 PC가 권장 사양을 충족하는지 확인하세요: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16GB, GPU GTX 1060 6GB / RX 580, 저장 공간 50GB SSD."),
        section("account-setup", "계정 설정 및 사전 등록", "LST에 참여하는 모든 플레이어는 미리 NCSoft 계정 시스템에서 AION 2를 등록하고 활성화해야 합니다."),
        section("class-preparation", "직업 사전 선택 및 레벨링 계획", "AION 2는 8개의 기본 직업(전사, 마법사, 사제, 암살자, 궁수, 소환사, 검사, 엔지니어)을 제공하며, 각 직업은 3개의 전문화 경로가 있습니다."),
        section("team-coordination", "팀 조율 및 테스트 목표", "LST는 파티 콘텐츠와 길드 시스템을 테스트할 수 있는 훌륭한 기회입니다."),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "準備指南",
      title: "AION 2 發布規模測試完整準備指南：9月17-18日你需要知道的一切",
      description:
        "完整準備清單，包括系統要求檢查、帳號設置、職業預選擇、團隊協調和測試目標規劃，確保你在發布規模測試中最大化體驗",
      intro:
        "AION 2 的發布規模測試（Launch Scale Test, LST）定於2026年9月17-18日（韓國時間）舉行。這是一次重要的壓力測試，旨在驗證服務器容量和遊戲穩定性。本文將幫助你做好充分準備，確保你能充分利用這次測試機會。",
      keywords: ["AION 2 LST", "AION 2 發布規模測試", "AION 2 測試準備", "AION 2 系統要求", "AION 2 職業選擇"],
      sourceNote: "基於 NCSoft 官方公告（2026-08-26）和 AION2Hub 社區準備指南（2026-09-01）整理。",
      sections: [
        section("lst-overview", "什麼是發布規模測試（LST）？", "發布規模測試是AION 2在正式發布前的最後一次大規模技術測試。與之前的封閉測試不同，LST的目的是驗證服務器在高併發情況下表現。測試期間，玩家將體驗完整的37級上限內容，包括主線任務、副本、PVP區域和公會系統。測試結束後，角色數據將被清除，但測試期間的表現可能影響正式發布時的獎勵分配。"),
        section("system-requirements", "系統要求檢查與優化", "在LST之前，請確保你的電腦滿足推薦配置：CPU Intel i5-8400 / AMD Ryzen 5 2600、內存16GB RAM、顯卡 GTX 1060 6GB / RX 580、存儲空間50GB SSD。建議提前更新顯卡驅動、關閉後台佔用程序、測試網絡連接穩定性。如果使用筆記本電腦，請確保散熱良好並接通電源。"),
        section("account-setup", "帳號設置與預註冊", "所有參與LST的玩家需要提前在NCSoft帳號系統中註冊並激活AION 2。如果你購買了創始人包，確保你的帳號已關聯。測試客戶端將在測試前2天開放下載，建議提前下載並安裝以避免測試首日的服務器擁堵。"),
        section("class-preparation", "職業預選擇與練級規劃", "AION 2提供8個基礎職業（戰士、法師、牧師、刺客、弓手、召喚師、劍士、工程師），每個職業有3個專精方向。建議提前規劃你想在LST中嘗試的職業，但也要準備好根據團隊需求調整。37級上限意味著你可以在測試中體驗完整的職業成長曲線，但不足以解鎖所有高級技能。"),
        section("team-coordination", "團隊協調與測試目標", "LST是測試組隊內容和公會系統的絕佳機會。提前與朋友或公會成員協調，規劃測試期間的目標：探索所有地圖、測試副本機制、組織大規模PVP戰鬥。記錄你遇到的bug或不平衡問題，這些反饋對開發團隊非常有價值。"),
      ],
    }),
  },
};
