import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-21-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 1 — Endgame path guide: what to do at level 50 */

const endgameSource1: ContentSource = { id: "aion2hub-endgame-2026-08-21", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Chapter 1 Content Guide — Endgame Loop", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2 第一章内容指南——后期循环", en: "AION 2 Chapter 1 Content Guide — Endgame Loop", fr: "AION 2 Chapitre 1 — Boucle de fin de jeu", de: "AION 2 Kapitel 1 — Endgame-Loop", es: "AION 2 Capítulo 1 — Bucle de fin de juego", ja: "AION 2 第1章 — エンドゲームループ", "pt-br": "AION 2 Capítulo 1 — Loop de endgame", ru: "AION 2 Глава 1 — Цикл эндгейма", ko: "AION 2 챕터 1 — 엔드게임 루프", "zh-hant": "AION 2 第一章內容指南——後期循環", }, "https://aion2hub.com/"), };
const endgameSource2: ContentSource = { id: "mmobomb-stream-endgame-2026-08-21", kind: "third-party", publisher: "MMOBomb", label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "NC 首次全球开发者直播：Aion 2 玩家可期待什么", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre du lancement", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar en el lanzamiento", ja: "NCが初のグローバル開発者ストリームでAion 2プレイヤーが発売時に期待できることを共有", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar no lançamento", ru: "NC делится тем, что игроки Aion 2 могут ожидать от запуска", ko: "NC, 첫 글로벌 개발자 스트림에서 Aion 2 플레이어가 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 首次全球開發者直播：Aion 2 玩家可期待什麼", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const endgameSource3: ContentSource = { id: "plaync-endgame-2026-08-21", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — 챕터 1 엔드게임 콘텐츠 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2（韩服）— 第一章后期内容说明", en: "AION 2 (KR) — Chapter 1 Endgame Content Guide", fr: "AION 2 (KR) — Guide du contenu de fin de jeu du chapitre 1", de: "AION 2 (KR) — Kapitel-1-Endgame-Inhalts-Guide", es: "AION 2 (KR) — Guía de contenido de fin de juego del capítulo 1", ja: "AION 2 (KR) — 第1章エンドゲームコンテンツガイド", "pt-br": "AION 2 (KR) — Guia de conteúdo endgame do capítulo 1", ru: "AION 2 (KR) — Гайд по эндгейм-контенту главы 1", ko: "AION 2 (KR) — 챕터 1 엔드게임 콘텐츠 안내", "zh-hant": "AION 2（韓服）— 第一章後期內容說明", }, "https://aion2.plaync.com/ko-kr/board/notice"), };
const endgameHero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media", translations: { "zh-hans": { alt: "后期路径指南配图", caption: "NC 官方配图；50 级后进入远征、试炼与超越的后期循环。" }, en: { alt: "Endgame path guide image", caption: "Official NC artwork; the endgame loop of expeditions, trials, and transcendence awaits beyond level 50." }, fr: { alt: "Image du guide de fin de jeu", caption: "Visuel officiel NC ; la boucle de fin de jeu des expéditions, procès et transcendance." }, de: { alt: "Endgame-Pfad-Guide-Bild", caption: "Offizielles NC-Artwork; der Endgame-Loop aus Expeditionen, Trials und Transzendenz." }, es: { alt: "Imagen de la guía de fin de juego", caption: "Arte oficial de NC; el bucle de fin de juego de expediciones, juicios y trascendencia." }, ja: { alt: "エンドゲームパスガイド画像", caption: "NC公式アートワーク；遠征、トライアル、超越のエンドゲームループ。" }, "pt-br": { alt: "Imagem do guia de caminho endgame", caption: "Arte oficial da NC; o loop endgame de expedições, trials e transcendência." }, ru: { alt: "Изображение гайда по эндгейм-пути", caption: "Официальный арт NC; эндгейм-цикл экспедиций, испытаний и трансценденции." }, ko: { alt: "엔드게임 경로 가이드 이미지", caption: "NC 공식 이미지입니다. 원정대, 트라이얼, 초월의 엔드게임 루프가 기다립니다." }, "zh-hant": { alt: "後期路徑指南配圖", caption: "NC 官方配圖；50 級後進入遠征、試煉與超越的後期循環。" }, }, };

export const trendingAugust21Article1: ContentEntry = {
  section: "guides", slug: "aion-2-endgame-path-guide", schemaType: "Article",
  publishedAt: "2026-08-21", updatedAt: "2026-08-21", readingMinutes: 6,
  publication: publishedVerified,
  sources: [endgameSource1, endgameSource2, endgameSource3],
  heroImage: endgameHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-leveling-guide-1-50" },
    { kind: "content", section: "guides", slug: "aion-2-trial-guide-vakron-sky-island" },
    { kind: "content", section: "guides", slug: "aion-2-inheritance-transcendence-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "ENDGAME PATH", title: "Aion 2 Endgame Path: What to Do After Level 50", description: "Hitting level 50 is just the beginning. Here is the complete endgame path: gearing through expeditions, climbing Trials, PvP in the Abyss, and pushing into Inheritance and Transcendence.", intro: "In Aion 2, reaching the level cap is the starting line, not the finish. The Chapter 1 endgame branches into several parallel progression tracks — expeditions for gear, Trials for weekly currency, the Abyss for PvP and PvPvE content, and the Inheritance and Transcendence systems for deep character growth. This guide maps the full endgame path so you know where to invest your time.", sourceNote: "Based on AION2Hub's Chapter 1 content guide, MMOBomb's dev stream recap, and the official KR service structure. Endgame pathways reflect confirmed systems.", keywords: ["Aion 2 endgame", "Aion 2 level 50 progression", "Aion 2 endgame loop", "Aion 2 endgame guide", "Aion 2 Chapter 1 endgame"],
      sections: [
        section("expeditions", "Phase 1: Expeditions — Gear Up", ["Expeditions are the 5-player core PvE content that feeds your gear progression. After hitting 50, your first priority is running the available expeditions — starting with the campaign-end expedition and moving into the Citadel of the Fallen Daeva and the Encroached Deus Research Base.", "Each expedition drops Dragon-tier gear and upgrade materials. The daily expedition loop is the most time-efficient way to build your baseline set. Launched with the August 12 patch, the new expeditions slot into an actively growing endgame cycle."]),
        section("trials", "Phase 2: Trials — Weekly Challenge", ["Once your gear is expedition-ready, the next step is Trials. The newest Trial, Vakron Sky Island, offers selectable difficulty from 4 to 16 at item level 4,800. Weekly completions grant Proof-of-Overcoming currency for the weekly shop, which carries high-value upgrade materials.", "Trials are the weekly ceiling of the PvE ladder — they reset every week, so pacing your clears across the week rather than one-shotting them is the efficient approach."]),
        section("abyss", "Phase 3: Abyss — PvP & PvPvE", ["The Abyss adds a parallel progression track. The Abyss surface layer (PvPvE, accessible from level 45) lets you earn Abyss Points (AP) through open-world faction activity. The Abyss Rift Zone (300v300 mass PvP) is the top end of the PvP track.", "Abyss gear is a separate tier from the PvE Dragon track, giving PvP-focused players a full gearing path. Weekly AP caps and the Rift Zone server rotation spread the PvP content across the week."]),
        section("transcendence", "Phase 4: Inheritance & Transcendence — Deep Growth", ["The deepest layer is the Inheritance system (launched with Season 2 in January 2026) and the Transcendence system (Arcana slots: Pendant, Scale, Brooch). These systems add multiplicative power beyond raw gear stats.", "Inheritance carries over character power across seasons, while Transcendence provides build-specific customization through Arcana items. Materials come from Trials and high-end expeditions, tying the endgame loop together."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "后期路径", title: "Aion 2 后期路径：50 级后做什么", description: "达到 50 级只是开始。以下是完整的后期路径：通过远征获取装备、攀登试炼、在深渊中 PvP、以及推进继承与超越。", intro: "在 Aion 2 中，达到等级上限是起跑线而非终点。第一章的后期内容分支为多个平行养成轨道——远征获取装备、试炼获取周常货币、深渊进行 PvP 与 PvPvE、以及继承与超越系统实现深度角色成长。", sourceNote: "基于 AION2Hub 第一章内容指南、MMOBomb 开发者直播总结与官方韩服结构。", keywords: ["Aion 2 后期", "Aion 2 50 级养成", "Aion 2 后期循环", "Aion 2 后期指南", "Aion 2 第一章后期"],
      sections: [
        section("expeditions", "阶段 1：远征——装备提升", ["远征是 5 人核心 PvE 内容，为装备养成提供来源。达到 50 级后，首要任务是完成可用远征——从战役结尾远征开始，进入堕落 Daeva 之城与被侵蚀的神之研究所。", "每个远征掉落龙族装备与升级材料。每日远征循环是构建基础套装的最省时方式。"]),
        section("trials", "阶段 2：试炼——周常挑战", ["装备达到远征级别后，下一步是试炼。最新试炼巴克隆空中岛提供难度 4 至 16 的选择，物品等级 4800。每周通关获得「克服之证」货币。", "试炼是 PvE 阶梯的周常天花板——每周重置，因此合理安排通关节奏而非一次性完成更高效。"]),
        section("abyss", "阶段 3：深渊——PvP 与 PvPvE", ["深渊增加平行养成轨道。深渊地面层（PvPvE，45 级开放）通过开放世界阵营活动获取深渊点数（AP）。深渊裂隙地带（300v300 大规模 PvP）是 PvP 轨道的顶端。", "深渊装备是与 PvE 龙族路线分开的独立层级，为 PvP 玩家提供完整的装备路径。"]),
        section("transcendence", "阶段 4：继承与超越——深度成长", ["最深层是继承系统（2026 年 1 月随第二赛季上线）与超越系统（奥秘插槽：坠饰、鳞片、胸针）。这些系统在基础装备属性之外增加乘数级力量。", "继承跨赛季携带角色能力，超越通过奥秘物品提供构筑特定自定义。材料来自试炼与高端远征。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "엔드게임 경로", title: "Aion 2 엔드게임 경로: 50레벨 이후 할 일", description: "50레벨 달성은 시작일 뿐입니다. 원정대 장비, 트라이얼, 심연 PvP, 상속과 초월의 완전한 엔드게임 경로를 소개합니다.", intro: "Aion 2에서 레벨 상한 도달은 출발선입니다. 챕터 1 엔드게임은 여러 평행 성장 트랙으로 분기됩니다.", sourceNote: "AION2Hub의 챕터 1 콘텐츠 가이드, MMOBomb 개발자 스트림 요약, 공식 KR 서비스 구조에 기반합니다.", keywords: ["Aion 2 엔드게임", "Aion 2 50레벨 성장", "Aion 2 엔드게임 루프", "Aion 2 엔드게임 가이드", "Aion 2 챕터 1 엔드게임"],
      sections: [
        section("expeditions", "1단계: 원정대 — 장비", ["5인 PvE 콘텐츠로 장비 성장을 공급합니다. 50레벨 후 타락한 Daeva의 성채와 침식된 신 연구기지 원정대를 시작하세요.", "각 원정대는 용 티어 장비와 강화 재료를 드롭합니다."]),
        section("trials", "2단계: 트라이얼 — 주간 도전", ["장비가 준비되면 바크론 스카이 아일랜드 트라이얼(난이도 4-16)이 기다립니다. 주간 극복의 증표로 상점 이용 가능.", "트라이얼은 PvE 사다리의 주간 천장입니다."]),
        section("abyss", "3단계: 심연 — PvP/PvPvE", ["심연 표면층(PvPvE, 45레벨)과 심연 균열 지대(300v300)가 PvP 트랙을 형성합니다. 심연 장비는 PvE 용 트랙과 별개입니다."]),
        section("transcendence", "4단계: 상속과 초월", ["상속(시즌 2)과 초월(아르카나 슬롯)이 깊은 성장을 제공합니다. 재료는 트라이얼과 고난이도 원정대에서 획득합니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "エンドゲームパス", title: "Aion 2 エンドゲームパス：レベル50後にすること", description: "レベル50到達は始まりに過ぎません。遠征、トライアル、深淵PvP、継承と超越への完全なエンドゲームパスを紹介します。", intro: "Aion 2 ではレベル上限到達はスタートラインです。第1章のエンドゲームは複数の並行成長トラックに分岐します。", sourceNote: "AION2Hub の第1章コンテンツガイド、MMOBomb 開発者ストリーム要約、公式 KR サービス構造に基づきます。", keywords: ["Aion 2 エンドゲーム", "Aion 2 レベル50育成", "Aion 2 エンドゲームループ", "Aion 2 エンドゲームガイド", "Aion 2 第1章エンドゲーム"],
      sections: [
        section("expeditions", "第1段階: 遠征 — 装備", ["5人PvEコンテンツで装備成長を供給します。50レベル後は「堕ちたDaevaの城塞」と「蝕まれし神の研究基地」遠征から始めましょう。", "各遠征はドラゴンティア装備と強化素材をドロップします。"]),
        section("trials", "第2段階: トライアル — 週間挑戦", ["装備が整ったらヴァクロン・スカイアイランドトライアル(難易度4-16)。週間の克服の証でショップを利用可能。", "トライアルはPvEラダーの週間上限です。"]),
        section("abyss", "第3段階: 深淵 — PvP/PvPvE", ["深淵地表層(PvPvE、45レベル)とアビスリフトゾーン(300v300)がPvPトラックを形成。深淵装備はPvEドラゴントラックと別です。"]),
        section("transcendence", "第4段階: 継承と超越", ["継承(シーズン2)と超越(アルカナスロット)が深い成長を提供。素材はトライアルと高難易度遠征から入手します。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "CHEMIN DE FIN DE JEU", title: "Chemin de fin de jeu d'Aion 2 : que faire après le niveau 50", description: "Atteindre le niveau 50 n'est que le début. Expéditions, procès, Abîme, héritage et transcendance.", intro: "Le endgame du chapitre 1 se divise en plusieurs pistes de progression parallèles.", sourceNote: "Basé sur le guide AION2Hub, le récapitulatif MMOBomb et la structure officielle KR.", keywords: ["Aion 2 fin de jeu", "Aion 2 progression niveau 50", "Aion 2 boucle endgame"],
      sections: [
        section("expeditions", "Expéditions", ["Contenu PvE 5 joueurs, équipement de rang Dragon. Citadelle du Daeva déchu et Base de recherche envahie."]),
        section("trials", "Procès", ["Vakron Sky Island, difficulté 4-16, monnaie hebdomadaire."]),
        section("abyss", "Abîme", ["Surface (PvPvE, niveau 45) et faille (300v300). Équipement parallèle."]),
        section("transcendence", "Héritage et transcendance", ["Systèmes de croissance profonde via Arcana (Pendentif, Écaille, Broche)."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "ENDGAME-PFAD", title: "Aion 2 Endgame-Pfad: Was nach Stufe 50 zu tun ist", description: "Stufe 50 zu erreichen ist erst der Anfang. Expeditionen, Trials, Abgrund, Vermächtnis und Transzendenz.", intro: "Das Endgame von Kapitel 1 verzweigt sich in mehrere parallele Fortschrittspfade.", sourceNote: "Basierend auf dem AION2Hub-Guide, dem MMOBomb-Recap und der offiziellen KR-Struktur.", keywords: ["Aion 2 Endgame", "Aion 2 Stufe 50 Fortschritt", "Aion 2 Endgame-Loop"],
      sections: [
        section("expeditions", "Expeditionen", ["5-Spieler-PvE-Inhalt, Drachen-Ausrüstung. Zitadelle und Eingedrungene Forschungsbasis."]),
        section("trials", "Trials", ["Vakron Sky Island, Schwierigkeit 4-16, Wochenwährung."]),
        section("abyss", "Abgrund", ["Oberfläche (PvPvE, Stufe 45) und Rift (300v300). Parallele Ausrüstung."]),
        section("transcendence", "Vermächtnis und Transzendenz", ["Tiefgehendes Wachstum via Arcana (Anhänger, Schuppe, Brosche)."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "RUTA DE FIN DE JUEGO", title: "Ruta de fin de juego de Aion 2: qué hacer después del nivel 50", description: "Alcanzar el nivel 50 es solo el comienzo. Expediciones, juicios, Abismo, herencia y trascendencia.", intro: "El fin de juego del capítulo 1 se divide en varias pistas de progresión paralelas.", sourceNote: "Basado en la guía de AION2Hub, el resumen de MMOBomb y la estructura oficial de KR.", keywords: ["Aion 2 fin de juego", "Aion 2 progresión nivel 50", "Aion 2 bucle de fin de juego"],
      sections: [
        section("expeditions", "Expediciones", ["Contenido PvE de 5 jugadores, equipo de rango Dragón. Ciudadela y Base de Investigación."]),
        section("trials", "Juicios", ["Vakron Sky Island, dificultad 4-16, moneda semanal."]),
        section("abyss", "Abismo", ["Superficie (PvPvE, nivel 45) y grieta (300v300). Equipo paralelo."]),
        section("transcendence", "Herencia y trascendencia", ["Crecimiento profundo vía Arcana (Colgante, Escama, Broche)."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "CAMINHO ENDGAME", title: "Caminho endgame de Aion 2: o que fazer após o nível 50", description: "Atingir o nível 50 é só o começo. Expedições, trials, Abismo, herança e transcendência.", intro: "O endgame do capítulo 1 se divide em várias trilhas de progressão paralelas.", sourceNote: "Baseado no guia da AION2Hub, no resumo da MMOBomb e na estrutura oficial da KR.", keywords: ["Aion 2 endgame", "Aion 2 progressão nível 50", "Aion 2 loop endgame"],
      sections: [
        section("expeditions", "Expedições", ["Conteúdo PvE de 5 jogadores, equipamento rank Dragão. Cidadela e Base de Pesquisa."]),
        section("trials", "Trials", ["Vakron Sky Island, dificuldade 4-16, moeda semanal."]),
        section("abyss", "Abismo", ["Superfície (PvPvE, nível 45) e fenda (300v300). Equipamento paralelo."]),
        section("transcendence", "Herança e transcendência", ["Crescimento profundo via Arcana (Pingente, Escama, Broche)."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ЭНДГЕЙМ-ПУТЬ", title: "Эндгейм-путь Aion 2: что делать после 50 уровня", description: "Достижение 50 уровня — только начало. Экспедиции, испытания, Бездна, наследование и трансценденция.", intro: "Эндгейм главы 1 разделяется на несколько параллельных путей прогрессии.", sourceNote: "На основе гайда AION2Hub, резюме MMOBomb и официальной структуры KR.", keywords: ["Aion 2 эндгейм", "Aion 2 прогрессия 50 уровня", "Aion 2 цикл эндгейма"],
      sections: [
        section("expeditions", "Экспедиции", ["PvE-контент на 5 игроков, экипировка ранга Дракона. Цитадель и Исследовательская база."]),
        section("trials", "Испытания", ["Vakron Sky Island, сложность 4-16, еженедельная валюта."]),
        section("abyss", "Бездна", ["Поверхность (PvPvE, 45 уровень) и разлом (300v300). Параллельная экипировка."]),
        section("transcendence", "Наследование и трансценденция", ["Глубокий рост через Arcana (Подвеска, Чешуя, Брошь)."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "後期路徑", title: "Aion 2 後期路徑：50 級後做什麼", description: "達到 50 級只是開始。以下是完整的後期路徑：透過遠征獲取裝備、攀登試煉、在深淵中 PvP、以及推進繼承與超越。", intro: "在 Aion 2 中，達到等級上限是起跑線而非終點。第一章的後期內容分支為多個平行養成軌道——遠征獲取裝備、試煉獲取週常貨幣、深淵進行 PvP 與 PvPvE、以及繼承與超越系統實現深度角色成長。", sourceNote: "基於 AION2Hub 第一章內容指南、MMOBomb 開發者直播總結與官方韓服結構。", keywords: ["Aion 2 後期", "Aion 2 50 級養成", "Aion 2 後期循環", "Aion 2 後期指南", "Aion 2 第一章後期"],
      sections: [
        section("expeditions", "階段 1：遠征——裝備提升", ["遠征是 5 人核心 PvE 內容，為裝備養成提供來源。達到 50 級後，首要任務是完成可用遠征——從戰役結尾遠征開始，進入墮落 Daeva 之城與被侵蝕的神之研究所。", "每個遠征掉落龍族裝備與升級材料。每日遠征循環是構建基礎套裝的最省時方式。"]),
        section("trials", "階段 2：試煉——週常挑戰", ["裝備達到遠征級別後，下一步是試煉。最新試煉巴克隆空中島提供難度 4 至 16 的選擇，物品等級 4800。每週通關獲得「克服之證」貨幣。", "試煉是 PvE 階梯的週常天花板——每週重置，因此合理安排通關節奏而非一次性完成更高效。"]),
        section("abyss", "階段 3：深淵——PvP 與 PvPvE", ["深淵增加平行養成軌道。深淵地面層（PvPvE，45 級開放）透過開放世界陣營活動獲取深淵點數（AP）。深淵裂隙地帶（300v300 大規模 PvP）是 PvP 軌道的頂端。", "深淵裝備是與 PvE 龍族路線分開的獨立層級，為 PvP 玩家提供完整的裝備路徑。"]),
        section("transcendence", "階段 4：繼承與超越——深度成長", ["最深層是繼承系統（2026 年 1 月隨第二賽季上線）與超越系統（奧秘插槽：墜飾、鱗片、胸針）。這些系統在基礎裝備屬性之外增加乘數級力量。", "繼承跨賽季攜帶角色能力，超越透過奧秘物品提供構築特定自訂。材料來自試煉與高端遠征。"]),
      ],
    }),
  },
};