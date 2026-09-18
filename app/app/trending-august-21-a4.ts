import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-21-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 4 — Guild & social features guide */
const guildSource1: ContentSource = { id: "aion2hub-social-2026-08-21", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Social Features & Guild Overview", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2 社交功能与公会概览", en: "AION 2 Social Features & Guild Overview", fr: "AION 2 Fonctionnalités sociales et aperçu des guildes", de: "AION 2 Soziale Funktionen & Gilden-Übersicht", es: "AION 2 Funciones sociales y descripción general de clanes", ja: "AION 2 ソーシャル機能とギルド概要", "pt-br": "AION 2 Recursos sociais e visão geral de guildas", ru: "AION 2 Социальные функции и обзор гильдий", ko: "AION 2 소셜 기능 및 길드 개요", "zh-hant": "AION 2 社交功能與公會概覽", }, "https://aion2hub.com/"), };
const guildSource2: ContentSource = { id: "mmobomb-guild-2026-08-21", kind: "third-party", publisher: "MMOBomb", label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "NC 首次全球开发者直播", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar", ja: "NCが初のグローバル開発者ストリーム", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar", ru: "NC делится тем, что игроки Aion 2 могут ожидать", ko: "NC, 첫 글로벌 개발자 스트림", "zh-hant": "NC 首次全球開發者直播", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const guildSource3: ContentSource = { id: "plaync-social-2026-08-21", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — 길드/소셜 시스템 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2（韩服）— 公会/社交系统说明", en: "AION 2 (KR) — Guild & Social System Guide", fr: "AION 2 (KR) — Guide du système de guilde et social", de: "AION 2 (KR) — Gilden- & Sozial-System-Guide", es: "AION 2 (KR) — Guía del sistema de clan y social", ja: "AION 2 (KR) — ギルド/ソーシャルシステムガイド", "pt-br": "AION 2 (KR) — Guia do sistema de guilda e social", ru: "AION 2 (KR) — Гайд по системе гильдий и соцфункциям", ko: "AION 2 (KR) — 길드/소셜 시스템 안내", "zh-hant": "AION 2（韓服）— 公會/社交系統說明", }, "https://aion2.plaync.com/ko-kr/board/notice"), };
const guildHero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media", translations: { "zh-hans": { alt: "公会与社交指南配图", caption: "NC 官方配图；公会系统支持社交组织与社区功能。" }, en: { alt: "Guild and social guide image", caption: "Official NC artwork; the guild system supports social organizing and community features." }, fr: { alt: "Image du guide de guilde et social", caption: "Visuel officiel NC ; le système de guilde soutient les organisations sociales." }, de: { alt: "Gilden- und Sozial-Guide-Bild", caption: "Offizielles NC-Artwork; das Gildensystem unterstützt soziale Organisationen." }, es: { alt: "Imagen de la guía de clan y social", caption: "Arte oficial de NC; el sistema de clanes apoya la organización social." }, ja: { alt: "ギルドとソーシャルガイド画像", caption: "NC公式アートワーク；ギルドシステムはソーシャル組織をサポートします。" }, "pt-br": { alt: "Imagem do guia de guilda e social", caption: "Arte oficial da NC; o sistema de guildas apoia a organização social." }, ru: { alt: "Изображение гайда по гильдиям и соцфункциям", caption: "Официальный арт NC; система гильдий поддерживает социальные организации." }, ko: { alt: "길드·소셜 가이드 이미지", caption: "NC 공식 이미지입니다. 길드 시스템은 소셜 조직을 지원합니다." }, "zh-hant": { alt: "公會與社交指南配圖", caption: "NC 官方配圖；公會系統支援社交組織與社群功能。" }, }, };

export const trendingAugust21Article4: ContentEntry = {
  section: "guides", slug: "aion-2-guild-social-guide", schemaType: "Article",
  publishedAt: "2026-08-21", updatedAt: "2026-08-21", readingMinutes: 5, publication: publishedVerified,
  sources: [guildSource1, guildSource2, guildSource3], heroImage: guildHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-abyss-rift-zone-guide" },
    { kind: "content", section: "guides", slug: "aion-2-trinity-roles-guide" },
    { kind: "content", section: "guides", slug: "aion-2-leveling-guide-1-50" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "SOCIAL GUIDE", title: "Aion 2 Guild & Social Guide: Guilds, Party Finder & Community Tools", description: "Aion 2's social features — guilds, the party finder, and community tools — help you find and play with others. How they work and how to get the most out of them.", intro: "MMOs are better with friends, and Aion 2 provides the tools to find and organize them. The guild system supports structured communities with progression, the party finder matches groups for expeditions and battlegrounds, and social tools like the friend list and whisper system keep you connected. This guide covers how each system works and how to build your network before launch.",
      sourceNote: "Based on the confirmed KR service structure and social system documentation.",
      keywords: ["Aion 2 guilds", "Aion 2 party finder", "Aion 2 social features", "Aion 2 community", "Aion 2 multiplayer"],
      sections: [
        section("guilds", "Guilds: Community & Progression", ["Guilds in Aion 2 are the primary player organization. They support member management, a guild chat channel, and shared progression. Guild activities contribute to guild-level rewards, which unlock perks for all members.", "For launch, the guild system is expected to provide the basic organizing tools. Joining a guild before launch is the best way to secure a group for expeditions and the first raid."]),
        section("finder", "Party Finder & Group Tools", ["The Party Finder is the matchmaking tool for expeditions and battlegrounds. It supports role-based filtering (tank/DPS/healer) and difficulty selection for instance content.", "The tool is designed to be the primary way to form groups for the 5-player expeditions and 10-player raid. For the Abyss Rift Zone (300v300), officers can guarantee entry, making guild-organized groups the most reliable way to participate."]),
        section("social", "Social Features", ["Aion 2 includes standard social tools: a friend list, whisper messaging, and the ability to inspect other players' gear and profiles. The server regions are not region-locked, so you can play with friends across the globe on the same server.", "The PvP toggle and faction system also serve as social catalysts — shared faction identity creates natural communities, and the toggle lets you choose when to engage with the opposing faction."]),
        section("global", "Building Your Network", ["For the September 30 launch, the best time to find a guild or group is now. Check the official forums, Discord servers, and community sites (including our hub) where guilds are recruiting.", "Having a group before launch means you can coordinate server region choice, share leveling tips, and queue for expeditions together from day one."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "社交指南", title: "Aion 2 公会与社交指南：公会、组队查找器与社群工具", description: "Aion 2 的社交功能——公会、组队查找器与社群工具——帮助你找到并与其他玩家一起游玩。", intro: "Aion 2 提供寻找和组织同伴的工具。公会系统支持结构化社群，组队查找器匹配远征与战场队伍。", sourceNote: "基于已确认的韩服结构与社交系统文档。", keywords: ["Aion 2 公会", "Aion 2 组队查找器", "Aion 2 社交功能", "Aion 2 社群", "Aion 2 多人"],
      sections: [
        section("guilds", "公会", ["公会是首要玩家组织，支持成员管理、公会频道与共享养成。公会活动贡献公会等级奖励。"]),
        section("finder", "组队查找器", ["支持基于角色过滤（坦克/输出/治疗）与难度选择的匹配工具。"]),
        section("social", "社交功能", ["好友列表、私聊、装备检查。服务器区域无锁，可与全球朋友同服游戏。"]),
        section("global", "建立社交网络", ["现在是在官方论坛、Discord 与社群站点寻找公会的最佳时机。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "소셜 가이드", title: "Aion 2 길드·소셜 가이드: 길드, 파티 찾기와 커뮤니티 도구", description: "Aion 2의 소셜 기능 — 길드, 파티 찾기, 커뮤니티 도구 — 로 다른 플레이어를 찾고 함께 플레이하세요.", intro: "Aion 2는 플레이어를 찾고 조직하는 도구를 제공합니다. 길드 시스템은 구조화된 커뮤니티를 지원합니다.", sourceNote: "확인된 KR 서비스 구조와 소셜 시스템 문서에 기반합니다.", keywords: ["Aion 2 길드", "Aion 2 파티 찾기", "Aion 2 소셜 기능", "Aion 2 커뮤니티", "Aion 2 멀티플레이어"],
      sections: [
        section("guilds", "길드", ["주요 플레이어 조직. 멤버 관리, 길드 채널, 공유 성장 지원."]),
        section("finder", "파티 찾기", ["역할 기반 필터(탱/딜/힐)와 난이도 선택을 지원하는 매칭 도구."]),
        section("social", "소셜 기능", ["친구 목록, 귓속말, 장비 검사. 서버 지역 무제한."]),
        section("global", "네트워크 구축", ["지금 공식 포럼, Discord, 커뮤니티 허브에서 길드를 찾는 것이 최적기입니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "ソーシャルガイド", title: "Aion 2 ギルド&ソーシャルガイド：ギルド、パーティファインダーとコミュニティツール", description: "Aion 2 のソーシャル機能 — ギルド、パーティファインダー、コミュニティツール — で他のプレイヤーを見つけて一緒にプレイしましょう。", intro: "Aion 2 はプレイヤーを見つけて組織するツールを提供します。ギルドシステムは構造化されたコミュニティをサポートします。", sourceNote: "確認済みのKRサービス構造とソーシャルシステムドキュメントに基づきます。", keywords: ["Aion 2 ギルド", "Aion 2 パーティファインダー", "Aion 2 ソーシャル機能", "Aion 2 コミュニティ", "Aion 2 マルチプレイヤー"],
      sections: [
        section("guilds", "ギルド", ["主要プレイヤー組織。メンバー管理、ギルドチャンネル、共有成長をサポート。"]),
        section("finder", "パーティファインダー", ["ロールベースのフィルター(タンク/DPS/ヒーラー)と難易度選択をサポートするマッチングツール。"]),
        section("social", "ソーシャル機能", ["フレンドリスト、ウィスパー、装備検査。サーバーリージョン無制限。"]),
        section("global", "ネットワーク構築", ["今公式フォーラム、Discord、コミュニティハブでギルドを探すのが最適な時期です。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, { eyebrow: "GUIDE SOCIAL", title: "Guide des guildes et fonctionnalités sociales d'Aion 2 : guildes, cherche-groupe et outils communautaires", description: "Les fonctionnalités sociales d'Aion 2 vous aident à trouver et jouer avec d'autres joueurs.", intro: "Aion 2 fournit des outils pour trouver et organiser des groupes. Le système de guilde soutient les communautés structurées.", sourceNote: "Basé sur la structure KR confirmée et la documentation du système social.", keywords: ["Aion 2 guildes", "Aion 2 cherche-groupe", "Aion 2 fonctionnalités sociales", "Aion 2 communauté"],
      sections: [
        section("guilds", "Guildes", ["Organisation de joueurs avec gestion des membres, canal de guilde et progression partagée."]),
        section("finder", "Cherche-groupe", ["Filtrage par rôle (tank/DPS/soigneur) et sélection de difficulté."]),
        section("social", "Social", ["Liste d'amis, messagerie, inspection d'équipement. Pas de blocage régional."]),
        section("global", "Réseau", ["Cherchez une guilde dès maintenant sur les forums, Discord et notre hub."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, { eyebrow: "SOZIAL-GUIDE", title: "Aion 2 Gilden- & Sozial-Guide: Gilden, Gruppenfinder & Community-Tools", description: "Die sozialen Funktionen von Aion 2 helfen Ihnen, andere Spieler zu finden und mit ihnen zu spielen.", intro: "Aion 2 bietet Werkzeuge, um Spieler zu finden und zu organisieren. Das Gildensystem unterstützt strukturierte Gemeinschaften.", sourceNote: "Basierend auf der bestätigten KR-Struktur und der Dokumentation des Sozialsystems.", keywords: ["Aion 2 Gilden", "Aion 2 Gruppenfinder", "Aion 2 soziale Funktionen", "Aion 2 Community"],
      sections: [
        section("guilds", "Gilden", ["Spielerorganisation mit Mitgliederverwaltung, Gildenkanal und gemeinsamem Fortschritt."]),
        section("finder", "Gruppenfinder", ["Filterung nach Rolle (Tank/DPS/Heiler) und Schwierigkeitsauswahl."]),
        section("social", "Sozial", ["Freundesliste, Flüstern, Ausrüstungsinspektion. Keine Regionssperre."]),
        section("global", "Netzwerk", ["Suchen Sie jetzt auf Foren, Discord und unserem Hub nach einer Gilde."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, { eyebrow: "GUÍA SOCIAL", title: "Guía de clanes y funciones sociales de Aion 2: clanes, buscador de grupos y herramientas comunitarias", description: "Las funciones sociales de Aion 2 te ayudan a encontrar y jugar con otros jugadores.", intro: "Aion 2 proporciona herramientas para encontrar y organizar jugadores. El sistema de clanes apoya comunidades estructuradas.", sourceNote: "Basado en la estructura KR confirmada y la documentación del sistema social.", keywords: ["Aion 2 clanes", "Aion 2 buscador de grupos", "Aion 2 funciones sociales", "Aion 2 comunidad"],
      sections: [
        section("guilds", "Clanes", ["Organización de jugadores con gestión de miembros, canal de clan y progresión compartida."]),
        section("finder", "Buscador de grupos", ["Filtrado por rol (tanque/DPS/sanador) y selección de dificultad."]),
        section("social", "Social", ["Lista de amigos, mensajería, inspección de equipo. Sin bloqueo regional."]),
        section("global", "Red", ["Busca un clan ahora en foros, Discord y nuestro hub."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, { eyebrow: "GUIA SOCIAL", title: "Guia de guildas e recursos sociais de Aion 2: guildas, localizador de grupos e ferramentas comunitárias", description: "Os recursos sociais de Aion 2 ajudam você a encontrar e jogar com outros jogadores.", intro: "Aion 2 fornece ferramentas para encontrar e organizar jogadores. O sistema de guildas apoia comunidades estruturadas.", sourceNote: "Baseado na estrutura KR confirmada e na documentação do sistema social.", keywords: ["Aion 2 guildas", "Aion 2 localizador de grupos", "Aion 2 recursos sociais", "Aion 2 comunidade"],
      sections: [
        section("guilds", "Guildas", ["Organização de jogadores com gestão de membros, canal de guilda e progressão compartilhada."]),
        section("finder", "Localizador de grupos", ["Filtragem por papel (tanque/DPS/curandeiro) e seleção de dificuldade."]),
        section("social", "Social", ["Lista de amigos, mensagens, inspeção de equipamento. Sem bloqueio regional."]),
        section("global", "Rede", ["Procure uma guilda agora em fóruns, Discord e nosso hub."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, { eyebrow: "СОЦИАЛЬНЫЙ ГАЙД", title: "Гайд по гильдиям и социальным функциям Aion 2: гильдии, поиск группы и комьюнити-инструменты", description: "Социальные функции Aion 2 помогают находить игроков и играть вместе.", intro: "Aion 2 предоставляет инструменты для поиска и организации игроков. Система гильдий поддерживает структурированные сообщества.", sourceNote: "На основе подтверждённой структуры KR и документации социальной системы.", keywords: ["Aion 2 гильдии", "Aion 2 поиск группы", "Aion 2 социальные функции", "Aion 2 комьюнити"],
      sections: [
        section("guilds", "Гильдии", ["Организация игроков с управлением участниками, каналом гильдии и общим прогрессом."]),
        section("finder", "Поиск группы", ["Фильтрация по роли (танк/ДПС/хил) и выбор сложности."]),
        section("social", "Социальное", ["Список друзей, личные сообщения, осмотр экипировки. Без региональных блокировок."]),
        section("global", "Сеть", ["Ищите гильдию сейчас на форумах, в Discord и нашем хабе."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "社交指南", title: "Aion 2 公會與社交指南：公會、組隊查找器與社群工具", description: "Aion 2 的社交功能——公會、組隊查找器與社群工具——幫助你找到並與其他玩家一起遊玩。", intro: "Aion 2 提供尋找和組織同伴的工具。公會系統支援結構化社群，組隊查找器配對遠征與戰場隊伍。", sourceNote: "基於已確認的韓服結構與社交系統文件。", keywords: ["Aion 2 公會", "Aion 2 組隊查找器", "Aion 2 社交功能", "Aion 2 社群", "Aion 2 多人"],
      sections: [
        section("guilds", "公會", ["公會是首要玩家組織，支援成員管理、公會頻道與共享養成。公會活動貢獻公會等級獎勵。"]),
        section("finder", "組隊查找器", ["支援基於角色過濾（坦克/輸出/治療）與難度選擇的配對工具。"]),
        section("social", "社交功能", ["好友列表、私聊、裝備檢查。伺服器區域無鎖，可與全球朋友同服遊戲。"]),
        section("global", "建立社交網絡", ["現在是在官方論壇、Discord 與社群站點尋找公會的最佳時機。"]),
      ],
    }),
  },
};