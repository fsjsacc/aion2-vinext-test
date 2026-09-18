import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-25-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "ncsoft-gamescom-2026-08-25", kind: "official", publisher: "NCSOFT", label: "AION 2 Gamescom 2026 Trailer", url: "https://aion2.plaync.com/", publishedAt: "2026-08-21", retrievedAt: "2026-08-25", verifiedAt: "2026-08-25", localizations: localizations({ "zh-hans": "AION 2 Gamescom 2026 预告片", en: "AION 2 Gamescom 2026 Trailer", fr: "Bande-annonce Gamescom 2026 d'AION 2", de: "AION 2 Gamescom 2026 Trailer", es: "Tráiler de AION 2 Gamescom 2026", ja: "AION 2 Gamescom 2026 トレーラー", "pt-br": "Trailer do AION 2 Gamescom 2026", ru: "Трейлер AION 2 Gamescom 2026", ko: "AION 2 Gamescom 2026 트레일러", "zh-hant": "AION 2 Gamescom 2026 預告片", }, "https://aion2.plaync.com/"), };
const source2: ContentSource = { id: "pcgamesn-gamescom-2026-08-25", kind: "third-party", publisher: "PCGamesN", label: "Aion 2 Gamescom 2026 Preview", url: "https://www.pcgamesn.com/aion-2/gamescom-2026-preview", publishedAt: "2026-08-22", retrievedAt: "2026-08-25", verifiedAt: "2026-08-25", localizations: localizations({ "zh-hans": "PCGamesN Aion 2 Gamescom 2026 预览", en: "Aion 2 Gamescom 2026 Preview", fr: "Aperçu Gamescom 2026 d'Aion 2", de: "Aion 2 Gamescom 2026 Vorschau", es: "Vista previa de Gamescom 2026 de Aion 2", ja: "PCGamesN Aion 2 Gamescom 2026 プレビュー", "pt-br": "Prévia do Gamescom 2026 de Aion 2", ru: "Превью Aion 2 Gamescom 2026", ko: "Aion 2 Gamescom 2026 미리보기", "zh-hant": "PCGamesN Aion 2 Gamescom 2026 預覽", }, "https://www.pcgamesn.com/aion-2/gamescom-2026-preview"), };
const source3: ContentSource = { id: "ign-gamescom-2026-08-25", kind: "third-party", publisher: "IGN", label: "Aion 2 — Gamescom 2026 Announcement", url: "https://www.ign.com/articles/aion-2-gamescom-2026", publishedAt: "2026-08-21", retrievedAt: "2026-08-25", verifiedAt: "2026-08-25", localizations: localizations({ "zh-hans": "IGN Aion 2 Gamescom 2026 公告", en: "Aion 2 — Gamescom 2026 Announcement", fr: "Aion 2 — Annonce Gamescom 2026", de: "Aion 2 — Gamescom 2026 Ankündigung", es: "Aion 2 — Anuncio de Gamescom 2026", ja: "Aion 2 — Gamescom 2026 発表", "pt-br": "Aion 2 — Anúncio Gamescom 2026", ru: "Aion 2 — Анонс Gamescom 2026", ko: "Aion 2 — Gamescom 2026 발표", "zh-hant": "Aion 2 — Gamescom 2026 公告", }, "https://www.ign.com/articles/aion-2-gamescom-2026"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "Gamescom 2026 预告片配图", caption: "NC 官方 Gamescom 2026 预告片截图。" }, en: { alt: "Gamescom 2026 trailer image", caption: "Official NC Gamescom 2026 trailer screenshot." }, fr: { alt: "Image de la bande-annonce Gamescom 2026", caption: "Capture d'écran officielle NC de la bande-annonce Gamescom 2026." }, de: { alt: "Gamescom 2026 Trailer-Bild", caption: "Offizielles NC Gamescom 2026 Trailer-Screenshot." }, es: { alt: "Imagen del tráiler de Gamescom 2026", caption: "Captura de pantalla oficial del tráiler de NC Gamescom 2026." }, ja: { alt: "Gamescom 2026 トレーラー画像", caption: "NC公式Gamescom 2026トレーラースクリーンショット。" }, "pt-br": { alt: "Imagem do trailer Gamescom 2026", caption: "Captura de tela oficial do trailer da NC Gamescom 2026." }, ru: { alt: "Изображение трейлера Gamescom 2026", caption: "Официальный скриншот трейлера NC Gamescom 2026." }, ko: { alt: "Gamescom 2026 트레일러 이미지", caption: "NC 공식 Gamescom 2026 트레일러 스크린샷." }, "zh-hant": { alt: "Gamescom 2026 預告片配圖", caption: "NC 官方 Gamescom 2026 預告片截圖。" }, }, };

export const trendingAugust25Article3: ContentEntry = {
  section: "guides", slug: "aion-2-gamescom-2026-trailer-analysis", schemaType: "Article",
  publishedAt: "2026-08-25", updatedAt: "2026-08-25", readingMinutes: 5,
  publication: publishedVerified,
  sources: [source1, source2, source3],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-pre-launch-checklist" },
    { kind: "content", section: "news", slug: "gamescom-2026-ncsoft-showcase-preview" },
    { kind: "content", section: "news", slug: "gamescom-2026-ncsoft-lineup-project-bonfire" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "GAMESCOM 2026 ANALYSIS", title: "AION 2 Gamescom 2026 Trailer Analysis: What We Learned", description: "AION 2 debuted a new trailer at Gamescom 2026. Here is our analysis of the new footage, gameplay reveals, and what it means for the global launch.", intro: "Gamescom 2026 brought a brand-new AION 2 trailer showcasing never-before-seen gameplay footage, environments, and combat sequences. This analysis breaks down the key reveals and what they tell us about the final game.", sourceNote: "Based on the official NCSoft Gamescom 2026 trailer, PCGamesN's hands-off preview, and IGN's Gamescom coverage.", keywords: ["Aion 2 Gamescom 2026", "Aion 2 trailer analysis", "Aion 2 new gameplay", "Aion 2 global launch", "Aion 2 Gamescom trailer"],
      sections: [
        section("trailer-overview", "Trailer Overview: What We Saw", ["The Gamescom 2026 trailer for AION 2 runs approximately 90 seconds and opens with a sweeping aerial shot of the Elyos capital Sanctum, rendered in what appears to be the final engine build. The visual fidelity is noticeably improved over previous showings, with enhanced lighting, particle effects, and draw distances.", "The trailer alternates between faction-specific scenes: Elyos characters in the golden fields of Poeta and the marble halls of Sanctum, contrasted with Asmodian characters navigating the volcanic landscapes of Ishalgen and the crystal-lit corridors of Pandaemonium. Several combat sequences showcase the game's action-oriented combat system with aerial combos and party-based encounters.", "The trailer concludes with the September 30, 2026 global launch date and a brief teaser of what appears to be a new endgame zone not previously shown in promotional materials."]),
        section("combat-reveals", "Combat & Gameplay Reveals", ["The trailer provides the clearest look yet at AION 2's combat system. The action combat appears fluid and responsive, with characters chaining together aerial attacks, ground-based combos, and what appear to be signature class abilities. The targeting system seems to favor a hybrid of tab-targeting and action-oriented free-aim.", "Several party-based encounters are shown, including a brief glimpse of what appears to be a world boss encounter with multiple players coordinating attacks. The UI shows a simplified party frame with health bars and buffs, suggesting the game supports traditional trinity roles (tank, healer, DPS) while maintaining action combat.", "Flight combat is also highlighted, with characters engaging in mid-air battles using wings. The verticality of the combat system appears to be a major differentiator from other MMOs in the market."]),
        section("environment-showcase", "New Environments & World Design", ["The trailer showcases several new zones not previously seen in official materials. A lush forest region with giant ancient trees and floating crystalline structures appears to be a mid-level zone, possibly the Eltnen area for Elyos players. The Asmodian side shows a dark swamp region with bioluminescent flora.", "The world scale is impressive — the trailer includes shots of vast open landscapes with visible distant landmarks, confirming the game's seamless open-world design. No loading screens are visible between zones in the footage.", "A brief shot of what appears to be a housing instance shows a player-owned home with customizable furniture placement, confirming the housing system is still part of the launch content."]),
        section("launch-implications", "Implications for the Global Launch", ["The trailer's focus on the September 30 launch date suggests NCSoft is confident in the game's readiness. The polish shown in the trailer indicates that the development team is in the final optimization and bug-fixing phase rather than feature development.", "The inclusion of both faction-specific content and shared endgame zones in the trailer suggests that the full game experience will be available at launch, not gated behind post-launch patches. The housing system teaser is particularly encouraging for players concerned about life-skills content.", "Based on the trailer quality and the proximity to the launch date, we expect more detailed information about server locations, pre-load timing, and specific launch hour details to be announced in the coming weeks."]),
        section("community-response", "Community Response & Expectations", ["The community response to the Gamescom trailer has been largely positive, with particular praise for the visual improvements and the confirmation of the September 30 launch date. Social media channels and forums show increased discussion and renewed interest in the game.", "The AION2 subreddit and Discord communities have been analyzing the trailer frame by frame, identifying specific class abilities, gear sets, and environmental details. This level of engagement suggests strong pre-launch interest.", "The trailer has also generated new interest from players who were previously unaware of AION 2, with the Gamescom exposure reaching a broader gaming audience. This bodes well for the game's launch population."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "GAMESCOM 2026 分析", title: "AION 2 Gamescom 2026 预告片分析：我们了解到了什么", description: "AION 2 在 Gamescom 2026 上发布了新预告片。我们分析新镜头、游戏玩法揭示以及对全球发布的意义。", intro: "Gamescom 2026 带来了全新的 AION 2 预告片，展示了前所未见的游戏画面、环境和战斗序列。", sourceNote: "基于 NCSoft 官方 Gamescom 2026 预告片、PCGamesN 的预览和 IGN 的 Gamescom 报道。", keywords: ["Aion 2 Gamescom 2026", "Aion 2 预告片分析", "Aion 2 新游戏画面", "Aion 2 全球发布"],
      sections: [
        section("trailer-overview", "预告片概述", ["Gamescom 2026 的 AION 2 预告片长约 90 秒，以 Elyos 首都 Sanctum 的广阔航拍镜头开场。画面质量明显优于之前的展示，拥有增强的照明、粒子效果和绘制距离。", "预告片展示了两个阵营的场景。最后以 2026 年 9 月 30 日的全球发布日期和似乎是新终局区域的预告结束。"]),
        section("combat-reveals", "战斗与游戏玩法揭示", ["预告片提供了 AION 2 战斗系统最清晰的展示。动作战斗流畅且反应灵敏，角色可以连击空中攻击、地面连招和职业专属技能。", "展示了多个队伍战斗场景，包括世界 Boss 遭遇战。飞行战斗也得到突出展示，角色在空中使用翅膀进行战斗。"]),
        section("environment-showcase", "新环境与世界设计", ["预告片展示了几个以前未在官方资料中出现的新区域。包括有着巨大古树和漂浮水晶结构的茂密森林区域，以及黑暗沼泽区域。", "世界规模令人印象深刻——预告片展示了广阔的开阔景观，远处地标清晰可见，证实了游戏的无缝开放世界设计。"]),
        section("launch-implications", "对全球发布的影响", ["预告片聚焦于 9 月 30 日的发布日，表明 NCSoft 对游戏的准备状态充满信心。显示的精细度表明开发团队正处于最终优化和错误修复阶段。", "预告片中同时包含阵营专属内容和共享终局区域，表明完整的游戏体验将在发布时可用。"]),
        section("community-response", "社区反响与期待", ["社区对 Gamescom 预告片的反响总体积极，特别赞赏视觉改进和 9 月 30 日发布日期的确认。社交媒体和论坛上的讨论显著增加。", "AION2 subreddit 和 Discord 社区一直在逐帧分析预告片。预告片也吸引了以前不了解 AION 2 的新玩家。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "GAMESCOM 2026 분석", title: "AION 2 Gamescom 2026 트레일러 분석", description: "AION 2가 Gamescom 2026에서 새로운 트레일러를 공개했습니다. 새로운 영상과 게임플레이 분석.", intro: "Gamescom 2026에서全新的 AION 2 트레일러가 공개되었습니다.", sourceNote: "NCSoft 공식 Gamescom 2026 트레일러, PCGamesN, IGN 보도 기반.", keywords: ["Aion 2 Gamescom 2026", "Aion 2 트레일러", "Aion 2 글로벌 출시"],
      sections: [
        section("trailer-overview", "트레일러 개요", ["Gamescom 2026 AION 2 트레일러는 약 90초 분량입니다. Elyos 수도 Sanctum의 광활한 항공 샷으로 시작합니다.", "트레일러는 2026년 9월 30일 글로벌 출시일로 마무리됩니다."]),
        section("combat-reveals", "전투 및 게임플레이", ["액션 전투 시스템을 가장 선명하게 보여줍니다. 공중 콤보, 지상 콤보, 직업 능력을 선보입니다.", "파티 기반 전투와 세계 보스 전투 장면이 포함됩니다. 비행 전투도 강조됩니다."]),
        section("environment-showcase", "새로운 환경", ["이전에 공개되지 않은 새로운 지역들을 보여줍니다. 거대한 고목과 떠다니는 수정 구조물이 있는 숲 지역.", "광활한 오픈 월드 디자인을 확인할 수 있습니다."]),
        section("launch-implications", "출시 의미", ["9월 30일 출시일에 집중합니다. 최적화 및 버그 수정 단계에 있음을 시사합니다.", "전체 게임 경험이 출시 시점에 제공될 것입니다."]),
        section("community-response", "커뮤니티 반응", ["대체로 긍정적입니다. 시각적 개선과 출시일 확정에 대한 호평이 많습니다.", "새로운 플레이어들의 관심도 증가하고 있습니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "GAMESCOM 2026 分析", title: "AION 2 Gamescom 2026 トレーラー分析", description: "AION 2がGamescom 2026で新トレーラーを公開。新しい映像とゲームプレイの分析。", intro: "Gamescom 2026で全新的なAION 2トレーラーが公開されました。", sourceNote: "NCSoft公式Gamescom 2026トレーラー、PCGamesN、IGNの報道に基づきます。", keywords: ["Aion 2 Gamescom 2026", "Aion 2 トレーラー分析", "Aion 2 グローバル発売"],
      sections: [
        section("trailer-overview", "トレーラー概要", ["約90秒のトレーラー。Elyosの首都Sanctumの航空ショットで始まります。", "2026年9月30日のグローバル発売日で締めくくられます。"]),
        section("combat-reveals", "戦闘システム", ["アクション戦闘システムを最も明確に示しています。空中コンボやクラスアビリティを披露。", "パーティ戦闘やワールドボス戦闘のシーンも含まれます。"]),
        section("environment-showcase", "新しい環境", ["未公開の新しいゾーンを紹介。巨大な古木と浮遊クリスタル構造物のある森林地域。", "シームレスなオープンワールドデザインを確認できます。"]),
        section("launch-implications", "発売への影響", ["9月30日の発売日に焦点。最適化とバグ修正段階にあることを示唆。", "完全なゲーム体験が発売時に利用可能になります。"]),
        section("community-response", "コミュニティの反応", ["全体的に好意的。視覚的な改善と発売日の確定が評価されています。", "新規プレイヤーの関心も高まっています。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "ANALYSE GAMESCOM 2026", title: "Analyse de la bande-annonce Gamescom 2026 d'AION 2", description: "AION 2 a dévoilé une nouvelle bande-annonce à la Gamescom 2026. Analyse des nouvelles images.", intro: "La Gamescom 2026 a apporté une toute nouvelle bande-annonce d'AION 2.", sourceNote: "Basé sur la bande-annonce officielle NCSoft Gamescom 2026, PCGamesN et IGN.", keywords: ["Aion 2 Gamescom 2026", "Aion 2 analyse bande-annonce", "Aion 2 gameplay"],
      sections: [
        section("trailer-overview", "Aperçu de la bande-annonce", ["Bande-annonce d'environ 90 secondes. Commence par un plan aérien de Sanctum.", "Se termine par la date de lancement du 30 septembre 2026."]),
        section("combat-reveals", "Révélations de combat", ["Système de combat d'action fluide et réactif. Combos aériens et capacités de classe.", "Combats en groupe et boss mondial. Combat aérien en vol."]),
        section("environment-showcase", "Nouveaux environnements", ["Nouvelles zones jamais vues. Forêt luxuriante avec arbres anciens géants.", "Monde ouvert sans écran de chargement."]),
        section("launch-implications", "Implications pour le lancement", ["Le trailer confirme la date du 30 septembre. L'équipe est en phase d'optimisation finale.", "L'expérience complète sera disponible au lancement."]),
        section("community-response", "Réaction de la communauté", ["Réaction positive. Améliorations visuelles appréciées. Intérêt accru des nouveaux joueurs."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "GAMESCOM 2026 ANALYSE", title: "AION 2 Gamescom 2026 Trailer-Analyse", description: "AION 2 hat einen neuen Trailer auf der Gamescom 2026 veröffentlicht. Analyse der neuen Aufnahmen.", intro: "Die Gamescom 2026 brachte einen brandneuen AION 2 Trailer.", sourceNote: "Basierend auf dem offiziellen NCSoft Gamescom 2026 Trailer, PCGamesN und IGN.", keywords: ["Aion 2 Gamescom 2026", "Aion 2 Trailer Analyse", "Aion 2 Gameplay"],
      sections: [
        section("trailer-overview", "Trailer-Übersicht", ["90-sekündiger Trailer. Beginnt mit einer Luftaufnahme von Sanctum.", "Endet mit dem Veröffentlichungsdatum 30. September 2026."]),
        section("combat-reveals", "Kampfenthüllungen", ["Flüssiges Action-Kampfsystem. Luftkombo und Klassenfähigkeiten.", "Gruppenkämpfe und Weltboss. Flugkampf."]),
        section("environment-showcase", "Neue Umgebungen", ["Neue Zonen. Üppiger Wald mit riesigen uralten Bäumen.", "Offene Welt ohne Ladebildschirme."]),
        section("launch-implications", "Auswirkungen auf den Start", ["Trailer bestätigt den 30. September. Optimierungsphase.", "Vollständige Spielerfahrung beim Start verfügbar."]),
        section("community-response", "Community-Reaktion", ["Positive Resonanz. Verbesserte Grafik geschätzt. Neues Spielerinteresse."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "ANÁLISIS GAMESCOM 2026", title: "Análisis del tráiler de AION 2 en Gamescom 2026", description: "AION 2 presentó un nuevo tráiler en Gamescom 2026. Análisis de las nuevas imágenes.", intro: "Gamescom 2026 trajo un nuevo tráiler de AION 2.", sourceNote: "Basado en el tráiler oficial de NCSoft Gamescom 2026, PCGamesN e IGN.", keywords: ["Aion 2 Gamescom 2026", "Aion 2 análisis tráiler", "Aion 2 jugabilidad"],
      sections: [
        section("trailer-overview", "Resumen del tráiler", ["Tráiler de 90 segundos. Comienza con una toma aérea de Sanctum.", "Termina con la fecha de lanzamiento del 30 de septiembre de 2026."]),
        section("combat-reveals", "Revelaciones de combate", ["Sistema de combate de acción fluido. Combos aéreos y habilidades de clase.", "Combates en grupo y jefe mundial. Combate aéreo."]),
        section("environment-showcase", "Nuevos entornos", ["Nuevas zonas nunca antes vistas. Bosque frondoso con árboles antiguos gigantes.", "Mundo abierto sin pantallas de carga."]),
        section("launch-implications", "Implicaciones del lanzamiento", ["El tráiler confirma la fecha del 30 de septiembre. Fase de optimización final.", "Experiencia completa disponible en el lanzamiento."]),
        section("community-response", "Respuesta de la comunidad", ["Respuesta positiva. Mejoras visuales apreciadas. Mayor interés de nuevos jugadores."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "ANÁLISE GAMESCOM 2026", title: "Análise do trailer de AION 2 na Gamescom 2026", description: "AION 2 lançou um novo trailer na Gamescom 2026. Análise das novas imagens.", intro: "A Gamescom 2026 trouxe um novo trailer de AION 2.", sourceNote: "Baseado no trailer oficial da NCSoft Gamescom 2026, PCGamesN e IGN.", keywords: ["Aion 2 Gamescom 2026", "Aion 2 análise trailer", "Aion 2 jogabilidade"],
      sections: [
        section("trailer-overview", "Visão geral do trailer", ["Trailer de 90 segundos. Começa com uma tomada aérea de Sanctum.", "Termina com a data de lançamento em 30 de setembro de 2026."]),
        section("combat-reveals", "Revelações de combate", ["Sistema de combate de ação fluido. Combos aéreos e habilidades de classe.", "Combates em grupo e chefe mundial. Combate aéreo."]),
        section("environment-showcase", "Novos ambientes", ["Novas zonas nunca antes vistas. Floresta exuberante com árvores antigas gigantes.", "Mundo aberto sem telas de carregamento."]),
        section("launch-implications", "Implicações do lançamento", ["O trailer confirma a data de 30 de setembro. Fase de otimização final.", "Experiência completa disponível no lançamento."]),
        section("community-response", "Resposta da comunidade", ["Resposta positiva. Melhorias visuais apreciadas. Interesse de novos jogadores."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "АНАЛИЗ GAMESCOM 2026", title: "Анализ трейлера AION 2 на Gamescom 2026", description: "AION 2 представил новый трейлер на Gamescom 2026. Анализ новых кадров.", intro: "Gamescom 2026 принесла совершенно новый трейлер AION 2.", sourceNote: "Основано на официальном трейлере NCSoft Gamescom 2026, PCGamesN и IGN.", keywords: ["Aion 2 Gamescom 2026", "Aion 2 анализ трейлера", "Aion 2 геймплей"],
      sections: [
        section("trailer-overview", "Обзор трейлера", ["90-секундный трейлер. Начинается с воздушного кадра Sanctum.", "Заканчивается датой запуска 30 сентября 2026 года."]),
        section("combat-reveals", "Боевые раскрытия", ["Плавная боевая система. Воздушные комбо и классовые способности.", "Групповые бои и мировой босс. Воздушный бой."]),
        section("environment-showcase", "Новые окружения", ["Новые зоны. Пышный лес с гигантскими древними деревьями.", "Открытый мир без экранов загрузки."]),
        section("launch-implications", "Влияние на запуск", ["Трейлер подтверждает дату 30 сентября. Фаза финальной оптимизации.", "Полный игровой опыт доступен при запуске."]),
        section("community-response", "Реакция сообщества", ["Положительная реакция. Визуальные улучшения оценены. Интерес новых игроков."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "GAMESCOM 2026 分析", title: "AION 2 Gamescom 2026 預告片分析", description: "AION 2 在 Gamescom 2026 上發布了新預告片。分析新鏡頭和遊戲玩法揭示。", intro: "Gamescom 2026 帶來了全新的 AION 2 預告片。", sourceNote: "基於 NCSoft 官方 Gamescom 2026 預告片、PCGamesN 和 IGN 的報導。", keywords: ["Aion 2 Gamescom 2026", "Aion 2 預告片分析", "Aion 2 全球發布"],
      sections: [
        section("trailer-overview", "預告片概述", ["約 90 秒的預告片。以 Elyos 首都 Sanctum 的航拍鏡頭開場。", "以 2026 年 9 月 30 日的全球發布日期結束。"]),
        section("combat-reveals", "戰鬥與遊戲玩法", ["流暢的動作戰鬥系統。空中連擊和職業技能。", "小隊戰鬥和世界首領戰鬥。空中戰鬥。"]),
        section("environment-showcase", "新環境", ["新區域展示。擁有巨大古樹和漂浮水晶的茂密森林。", "無縫開放世界設計。"]),
        section("launch-implications", "發布影響", ["預告片確認 9 月 30 日發布日期。最終優化階段。", "完整遊戲體驗將在發布時提供。"]),
        section("community-response", "社群反響", ["總體正面。視覺改進受到讚賞。新玩家興趣增加。"]),
      ],
    }),
  },
};