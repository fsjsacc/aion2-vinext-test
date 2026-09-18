import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-20-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 3 — Daily & weekly routine guide */

const dailySource1: ContentSource = {
  id: "aion2hub-daily-2026-08-20", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — July 15, 2026: Trial 'Vakron Sky Island' & Weekly Shop",
  url: "https://aion2hub.com/updates", publishedAt: "2026-07-15", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年7月15日：试炼「巴克隆空中岛」与周常商店", en: "AION 2 Update — July 15, 2026: Trial 'Vakron Sky Island' & Weekly Shop", fr: "AION 2 Mise à jour — 15 juillet 2026 : procès « Vakron Sky Island » et boutique hebdomadaire", de: "AION 2 Update — 15. Juli 2026: Trial 'Vakron Sky Island' & Wochenshop", es: "AION 2 Actualización — 15 de julio de 2026: juicio 'Vakron Sky Island' y tienda semanal", ja: "AION 2 アップデート — 2026年7月15日：トライアル「ヴァクロン・スカイアイランド」と週間ショップ", "pt-br": "AION 2 Atualização — 15 de julho de 2026: Trial 'Vakron Sky Island' e loja semanal", ru: "AION 2 Обновление — 15 июля 2026: испытание «Vakron Sky Island» и еженедельный магазин", ko: "AION 2 업데이트 — 2026년 7월 15일: 트라이얼 '바크론 스카이 아일랜드' 및 주간 상점", "zh-hant": "AION 2 更新 — 2026年7月15日：試煉「巴克隆空中島」與週常商店", }, "https://aion2hub.com/updates"),
};
const dailySource2: ContentSource = {
  id: "aion2hub-pet-ticket-2026-08-20", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — August 5, 2026: Pet Auto-Loot Ticket Caps",
  url: "https://aion2hub.com/updates", publishedAt: "2026-08-05", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年8月5日：宠物自动拾取券上限", en: "AION 2 Update — August 5, 2026: Pet Auto-Loot Ticket Caps", fr: "AION 2 Mise à jour — 5 août 2026 : plafonds des tickets d'auto-ramassage", de: "AION 2 Update — 5. August 2026: Auto-Loot-Ticket-Limits", es: "AION 2 Actualización — 5 de agosto de 2026: topes de tickets de auto-recolección", ja: "AION 2 アップデート — 2026年8月5日：ペット自動ルートチケット上限", "pt-br": "AION 2 Atualização — 5 de agosto de 2026: limites de tickets de auto-loot", ru: "AION 2 Обновление — 5 августа 2026: лимиты билетов автосбора", ko: "AION 2 업데이트 — 2026년 8월 5일: 펫 자동 루팅 티켓 상한", "zh-hant": "AION 2 更新 — 2026年8月5日：寵物自動拾取券上限", }, "https://aion2hub.com/updates"),
};
const dailySource3: ContentSource = {
  id: "plaync-routine-2026-08-20", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 데일리/주간 콘텐츠 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-15", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 日常/周常内容说明", en: "AION 2 (KR) — Daily/Weekly Content Guide", fr: "AION 2 (KR) — Guide du contenu quotidien/hebdomadaire", de: "AION 2 (KR) — Tages-/Wocheninhalts-Guide", es: "AION 2 (KR) — Guía de contenido diario/semanal", ja: "AION 2 (KR) — デイリー/ウィークリーコンテンツガイド", "pt-br": "AION 2 (KR) — Guia de conteúdo diário/semanal", ru: "AION 2 (KR) — Гайд по ежедневному/еженедельному контенту", ko: "AION 2 (KR) — 데일리/주간 콘텐츠 안내", "zh-hant": "AION 2（韓服）— 日常/週常內容說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const dailyHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "日常/周常内容指南配图", caption: "NC 官方配图；探索远征、试炼与深渊裂隙的周循环。" }, en: { alt: "Daily and weekly content guide image", caption: "Official NC artwork; the weekly loop of expeditions, trials, and the Abyss Rift." }, fr: { alt: "Image du guide de contenu quotidien/hebdomadaire", caption: "Visuel officiel NC ; le cycle hebdomadaire des expéditions, procès et de la faille de l'Abîme." }, de: { alt: "Tages-/Wocheninhalts-Guide-Bild", caption: "Offizielles NC-Artwork; die wöchentliche Schleife aus Expeditionen, Trials und Abgrund-Rift." }, es: { alt: "Imagen de la guía de contenido diario/semanal", caption: "Arte oficial de NC; el ciclo semanal de expediciones, juicios y la grieta del Abismo." }, ja: { alt: "デイリー/ウィークリーコンテンツガイド画像", caption: "NC公式アートワーク；遠征、トライアル、アビスリフトの週間ループ。" }, "pt-br": { alt: "Imagem do guia de conteúdo diário/semanal", caption: "Arte oficial da NC; o ciclo semanal de expedições, trials e a fenda do Abismo." }, ru: { alt: "Изображение гайда по ежедневному/еженедельному контенту", caption: "Официальный арт NC; еженедельный цикл экспедиций, испытаний и разлома Бездны." }, ko: { alt: "데일리/주간 콘텐츠 가이드 이미지", caption: "NC 공식 이미지입니다. 원정대, 트라이얼, 심연 균열의 주간 루프입니다." }, "zh-hant": { alt: "日常/週常內容指南配圖", caption: "NC 官方配圖；探索遠征、試煉與深淵裂隙的週循環。" }, },
};

export const trendingAugust20Article3: ContentEntry = {
  section: "guides", slug: "aion-2-daily-weekly-routine-guide", schemaType: "Article",
  publishedAt: "2026-08-20", updatedAt: "2026-08-20", readingMinutes: 6,
  publication: publishedVerified,
  sources: [dailySource1, dailySource2, dailySource3],
  heroImage: dailyHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-trial-guide-vakron-sky-island" },
    { kind: "content", section: "guides", slug: "aion-2-abyss-rift-zone-guide" },
    { kind: "content", section: "guides", slug: "aion-2-pet-system-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "ROUTINE GUIDE", title: "Aion 2 Daily & Weekly Routine: What to Do Every Day and Every Week",
      description: "Aion 2's endgame rewards consistency. Here's the recommended daily checklist — expeditions, Abyss points, pet auto-loot — and the weekly chores that gate your best progression.",
      intro: "Aion 2 is a game of daily investment: most key currencies and materials accumulate through repeatable routines rather than one-time clears. Knowing the daily versus weekly split helps you maximize time-to-reward at launch. This guide lays out a baseline routine built from confirmed KR-service structures.",
      sourceNote: "Based on AION2Hub's July 15 trial notes and August 5 pet ticket notes, plus the official KR service loop. Routine suggestions reflect confirmed systems and cadences.",
      keywords: ["Aion 2 daily routine", "Aion 2 weekly content", "Aion 2 daily checklist", "Aion 2 expedition daily", "Aion 2 Abyss points"],
      sections: [
        section("daily", "The Daily Checklist", ["The permanent daily loop revolves around expeditions and the Abyss. Expedition runs are the primary repeatable source of Dragon-tier materials, while Abyss activity earns Abyss Points (AP) with a soft weekly cap.", "Pet auto-loot ticks down alongside your farming — the Pet Auto-Loot Ticket is capped at two purchases per character per month, so your pet's looting is a resource to count, not assume. Campaign and zone dailies round out the list with modest currency and consumables."]),
        section("weekly", "The Weekly Checklist", ["The weekly reset gates the strongest rewards. The Trial (Vakron Sky Island on KR) offers selectable difficulty and a weekly Proof-of-Overcoming currency for a dedicated weekly shop.", "The Abyss Rift Zone (300v300) runs on a server rotation with weekly scoring, and weekly AP tracking means pacing your PvP across the week avoids wasted points. If you can only run one weekly, the Trial is the highest value-per-hour for progression materials."]),
        section("routine", "Building Your Routine", ["A sustainable baseline: start with the campaign/zone dailies (fast, low commitment), then the daily expedition run, then stack Abyss activity toward the weekly AP target. Farming with pet auto-loot should be slotted around ticket availability — two tickets per month means you should save them for your densest farming windows.", "At launch, remember events and season passes add temporary daily tasks on top of the baseline. The Daeva Pass missions reward the same activities you are already doing, so they layer on without extra time."]),
        section("global", "What Global Players Should Expect", ["The global launch (September 30 early access) will likely ship the expedition daily and the core weekly systems; the Trial and Abyss Rift Zone are expected to follow the KR cadence post-launch.", "Until then, treat the routine as: daily expeditions into the weekly Trial, Abyss progress weekly, and pet auto-loot managed monthly. That rhythm carries you through the entire launch window regardless of which features are live."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "日常指南", title: "Aion 2 日常与周常：每天和每周该做什么",
      description: "Aion 2 的后期玩法奖励一致性。这里推荐每日清单——远征、深渊点数、宠物自动拾取——以及门控最佳养成的每周任务。",
      intro: "Aion 2 是讲究日常投入的游戏：大多数关键货币与材料通过可重复的日常而非一次性通关积累。了解每日与每周的划分有助于在上线时最大化时间回报。本指南基于已确认的韩服结构提供基线日常。",
      sourceNote: "基于 AION2Hub 7 月 15 日试炼说明与 8 月 5 日宠物券说明，以及官方韩服循环。日常建议反映已确认的系统与节奏。",
      keywords: ["Aion 2 日常", "Aion 2 周常内容", "Aion 2 每日清单", "Aion 2 每日远征", "Aion 2 深渊点数"],
      sections: [
        section("daily", "每日清单", ["永久每日循环以远征与深渊为中心。远征是龙族材料的主要可重复来源，深渊活动获得深渊点数（AP），有软周上限。", "宠物自动拾取随刷怪消耗——宠物自动拾取券每月每角色限购两张，因此宠物的拾取是需计算的资源。战役与区域日常以少量货币与消耗品收尾。"]),
        section("weekly", "每周清单", ["每周重置门控最强奖励。试炼（韩服为巴克隆空中岛）提供可选难度与每周「克服之证」货币，用于专属周常商店。", "深渊裂隙地带（300v300）以服务器轮换运行，每周计分；每周 AP 追踪要求整个周期内合理分配 PvP 时间以避免浪费点数。如果只跑一个每周，试炼对养成材料的时间价值最高。"]),
        section("routine", "构建你的日常", ["可持续基线：先做战役/区域日常（快速低承诺），然后每日远征，再向每周 AP 目标堆叠深渊活动。宠物自动拾取刷怪应围绕券可用性安排——每月两张意味着留给你最密集的刷怪窗口。", "上线时记住活动与赛季通行证会在基线上增加临时每日任务。Daeva Pass 任务奖励你本就在做的活动，因此可无缝叠加。"]),
        section("global", "全球玩家的预期", ["全球上线（9 月 30 日抢先体验）可能提供远征日常与核心周常系统；试炼与深渊裂隙地带预计上线后跟随韩服节奏。", "在此之前，将日常视为：每日远征进入每周试炼、深渊每周推进、宠物自动拾取每月管理。这个节奏无论哪些功能上线都能带你穿过整个上线窗口。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "루틴 가이드", title: "Aion 2 데일리·주간 루틴: 매일·매주 무엇을 해야 하나",
      description: "Aion 2의 엔드게임은 일관성을 보상합니다. 원정대, 심연 포인트, 펫 자동 루팅을 포함한 데일리 체크리스트와 최고 성장을 여는 주간 할일을 소개합니다.",
      intro: "Aion 2는 매일 투자하는 게임입니다 — 핵심 화폐와 재료는 일회성 클리어가 아닌 반복 가능한 루틴으로 축적됩니다. 데일리와 주간 분리를 이해하면 출시 시 시간 대비 보상을 극대화할 수 있습니다.",
      sourceNote: "AION2Hub의 7월 15일 트라이얼 노트, 8월 5일 펫 티켓 노트, 공식 KR 서비스 루프에 기반합니다.",
      keywords: ["Aion 2 데일리 루틴", "Aion 2 주간 콘텐츠", "Aion 2 데일리 체크리스트", "Aion 2 원정대 데일리", "Aion 2 심연 포인트"],
      sections: [
        section("daily", "데일리 체크리스트", ["영구 데일리 루프는 원정대와 심연 중심입니다. 원정대는 용 티어 재료의 주요 반복 소스, 심연 활동은 주간 상한이 있는 AP를 제공합니다.", "펫 자동 루팅 티켓은 캐릭터당 월 2장으로 제한됩니다."]),
        section("weekly", "주간 체크리스트", ["주간 리셋이 최강 보상을 잠급니다. 트라이얼(바크론 스카이 아일랜드)은 주간 '극복의 증표'를 주며, 심연 균열 지대(300v300)는 서버 순환으로 운영됩니다.", "한 개만 할 수 있다면 트라이얼이 시간당 진행 재료 가치가 가장 높습니다."]),
        section("routine", "루틴 만들기", ["캠페인/지역 데일리 → 데일리 원정대 → 주간 AP 목표를 향한 심연. 펫 자동 루팅 티켓은 가장 밀도 높은 파밍 창에 아끼세요.", "Daeva Pass 미션은 이미 하고 있는 활동을 보상하므로 추가 시간 없이 겹쳐집니다."]),
        section("global", "글로벌 플레이어의 기대", ["9월 30일 얼리 액세스에는 원정대 데일리와 핵심 주간이 제공될 전망. 트라이얼과 심연 균열 지대는 출시 후 KR 리듬을 따를 것입니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "ルーティンガイド", title: "Aion 2 デイリー・ウィークリールーティン：毎日・毎週やるべきこと",
      description: "Aion 2 のエンドゲームは継続性を報います。遠征、アビスポイント、ペット自動ルートのデイリーチェックリストと、最高の育成を開く週間タスクを紹介します。",
      intro: "Aion 2 は毎日の投資が重要なゲームです — 主要通貨と素材は一度きりのクリアではなく反復ルーティンで蓄積されます。デイリーとウィークリーの区別を理解すれば、ローンチ時に時間対報酬を最大化できます。",
      sourceNote: "AION2Hub の7月15日トライアルノート、8月5日ペットチケットノート、公式 KR サービスのループに基づきます。",
      keywords: ["Aion 2 デイリールーティン", "Aion 2 ウィークリーコンテンツ", "Aion 2 デイリーチェックリスト", "Aion 2 遠征デイリー", "Aion 2 アビスポイント"],
      sections: [
        section("daily", "デイリーチェックリスト", ["恒久デイリーループは遠征とアビス中心。遠征はドラゴンティア素材の主な反復ソース、アビス活動は週間上限付きのAPを獲得します。", "ペット自動ルートチケットはキャラクターごとに月2枚の上限があります。"],),
        section("weekly", "ウィークリーチェックリスト", ["週間リセットが最強報酬を解放します。トライアル(ヴァクロン・スカイアイランド)は週間「克服の証」を提供し、アビスリフトゾーン(300v300)はサーバーローテーションで運営されます。", "1つだけならトライアルが時間当たりの育成素材価値が最高です。"],),
        section("routine", "ルーティン構築", ["キャンペーン/ゾーンデイリー → デイリー遠征 → 週間AP目標へアビス。ペット自動ルートチケットは最も密度の高いファーミング時期に温存しましょう。", "Daeva Pass ミッションは既にやっている活動を報酬とするため、追加時間なしで重なります。"],),
        section("global", "グローバルプレイヤーの期待", ["9月30日の早期アクセスには遠征デイリーと主要週間システムが提供される見込み。トライアルとアビスリフトゾーンはローンチ後にKRリズムで追加されるでしょう。"],),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE ROUTINE", title: "Routine quotidienne et hebdomadaire d'Aion 2 : que faire chaque jour",
      description: "L'endgame d'Aion 2 récompense la régularité. Expéditions, points de l'Abîme, auto-ramassage et corvées hebdomadaires qui verrouillent la progression.",
      intro: "La plupart des monnaies clés s'accumulent via des routines répétables. Connaître le partage quotidien/hebdomadaire maximise le rapport temps-récompense.",
      sourceNote: "Basé sur les notes AION2Hub des 15 juillet et 5 août, et la boucle officielle KR.",
      keywords: ["Aion 2 routine quotidienne", "Aion 2 contenu hebdomadaire", "Aion 2 liste quotidienne"],
      sections: [
        section("daily", "Le quotidien", ["Expéditions (matériaux Dragon), Abîme (points AP avec plafond hebdo), auto-ramassage du familier (2 tickets/mois)."]),
        section("weekly", "L'hebdomadaire", ["Le procès (Vakron) avec monnaie hebdomadaire et la faille de l'Abîme 300v300 en rotation de serveur."]),
        section("routine", "Construire sa routine", ["Dailies de campagne → expédition quotidienne → Abîme vers la cible AP. Réservez les tickets de familier pour le farming dense."]),
        section("global", "Pour les joueurs globaux", ["Le lancement du 30 septembre propose la boucle expédition/hebdomadaire de base ; le procès et la faille suivront le rythme KR."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "ROUTINEN-GUIDE", title: "Aion 2 Tages- & Wochenroutine: Was man täglich und wöchentlich tun sollte",
      description: "Das Endgame von Aion 2 belohnt Beständigkeit. Expeditionen, Abgrund-Punkte, Auto-Loot und die wöchentlichen Pflichten.",
      intro: "Die meisten Schlüsselwährungen sammeln sich über wiederholbare Routinen. Das tägliche/wöchentliche Verhältnis zu kennen, maximiert Zeit-gegen-Belohnung.",
      sourceNote: "Basierend auf AION2Hub-Notizen vom 15. Juli und 5. August sowie der offiziellen KR-Schleife.",
      keywords: ["Aion 2 Tagesroutine", "Aion 2 Wocheninhalt", "Aion 2 Tagesliste"],
      sections: [
        section("daily", "Die Tagesliste", ["Expeditionen (Drachenmaterial), Abgrund (AP mit Wochenlimit), Auto-Loot des Haustiers (2 Tickets/Monat)."]),
        section("weekly", "Die Wochenliste", ["Das Trial (Vakron) mit Wochenwährung und die Abgrund-Rift-Zone 300v300 in Serverrotation."]),
        section("routine", "Routine aufbauen", ["Kampagnen-Dailies → tägliche Expedition → Abgrund Richtung AP-Ziel. Haustier-Tickets für dichte Farmfenster aufsparen."]),
        section("global", "Für Global-Spieler", ["Der Start am 30. September bietet die Basisrunde; Trial und Rift folgen dem KR-Rhythmus."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE RUTINA", title: "Rutina diaria y semanal de Aion 2: qué hacer cada día y cada semana",
      description: "El endgame de Aion 2 recompensa la constancia. Expediciones, puntos del Abismo, auto-recolección y las tareas semanales que desbloquean la mejor progresión.",
      intro: "La mayoría de las monedas clave se acumulan con rutinas repetibles. Conocer el reparto diario/semanal maximiza el tiempo vs. recompensa.",
      sourceNote: "Basado en las notas de AION2Hub del 15 de julio y 5 de agosto, y el ciclo oficial de KR.",
      keywords: ["Aion 2 rutina diaria", "Aion 2 contenido semanal", "Aion 2 lista diaria"],
      sections: [
        section("daily", "Lo diario", ["Expediciones (material Dragón), Abismo (AP con tope semanal), auto-recolección de mascota (2 boletos/mes)."]),
        section("weekly", "Lo semanal", ["El juicio (Vakron) con moneda semanal y la grieta del Abismo 300v300 en rotación de servidor."]),
        section("routine", "Construyendo la rutina", ["Dailies de campaña → expedición diaria → Abismo hacia la meta de AP. Reserva los boletos de mascota para farming denso."]),
        section("global", "Para jugadores globales", ["El lanzamiento del 30 de septiembre ofrece el ciclo básico; juicio y grieta seguirán el ritmo de KR."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE ROTINA", title: "Rotina diária e semanal de Aion 2: o que fazer todo dia e toda semana",
      description: "O endgame de Aion 2 recompensa consistência. Expedições, pontos do Abismo, auto-loot e as tarefas semanais que abrem a melhor progressão.",
      intro: "A maioria das moedas-chave se acumula com rotinas repetíveis. Conhecer a divisão diária/semanal maximiza tempo vs. recompensa.",
      sourceNote: "Baseado nas notas da AION2Hub de 15 de julho e 5 de agosto, e no ciclo oficial da KR.",
      keywords: ["Aion 2 rotina diária", "Aion 2 conteúdo semanal", "Aion 2 lista diária"],
      sections: [
        section("daily", "O diário", ["Expedições (material Dragão), Abismo (AP com teto semanal), auto-loot do pet (2 tickets/mês)."]),
        section("weekly", "O semanal", ["O Trial (Vakron) com moeda semanal e a fenda do Abismo 300v300 em rotação de servidor."]),
        section("routine", "Montando a rotina", ["Dailies de campanha → expedição diária → Abismo rumo à meta de AP. Guarde os tickets de pet para farming denso."]),
        section("global", "Para jogadores globais", ["O lançamento de 30 de setembro oferece o ciclo básico; Trial e fenda seguirão o ritmo da KR."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ГАЙД ПО РУТИНЕ", title: "Ежедневная и еженедельная рутина Aion 2: что делать каждый день",
      description: "Эндгейм Aion 2 вознаграждает постоянство. Экспедиции, очки Бездны, автосбор и еженедельные задачи, открывающие лучшую прогрессию.",
      intro: "Большинство ключевых валют накапливается через повторяемые рутины. Знание разделения «день/неделя» максимизирует время против награды.",
      sourceNote: "На основе записей AION2Hub от 15 июля и 5 августа и официального цикла KR.",
      keywords: ["Aion 2 ежедневная рутина", "Aion 2 еженедельный контент", "Aion 2 ежедневный список"],
      sections: [
        section("daily", "Ежедневное", ["Экспедиции (материал Дракона), Бездна (AP с недельным лимитом), автосбор питомца (2 билета/мес)."]),
        section("weekly", "Еженедельное", ["Испытание (Vakron) с еженедельной валютой и разлом Бездны 300v300 в ротации сервера."]),
        section("routine", "Построение рутины", ["Квесты кампании → ежедневная экспедиция → Бездна к цели AP. Берегите билеты питомца для плотного фарма."]),
        section("global", "Глобальным игрокам", ["Запуск 30 сентября даёт базовый цикл; испытание и разлом последуют ритму KR."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "日常指南", title: "Aion 2 日常與週常：每天和每週該做什麼",
      description: "Aion 2 的後期玩法獎勵一致性。這裡推薦每日清單——遠征、深淵點數、寵物自動拾取——以及門控最佳養成的每週任務。",
      intro: "Aion 2 是講究日常投入的遊戲：大多數關鍵貨幣與材料透過可重複的日常而非一次性通關累積。了解每日與每週的劃分有助於在上線時最大化時間回報。本指南基於已確認的韓服結構提供基線日常。",
      sourceNote: "基於 AION2Hub 7 月 15 日試煉說明與 8 月 5 日寵物券說明，以及官方韓服循環。日常建議反映已確認的系統與節奏。",
      keywords: ["Aion 2 日常", "Aion 2 週常內容", "Aion 2 每日清單", "Aion 2 每日遠征", "Aion 2 深淵點數"],
      sections: [
        section("daily", "每日清單", ["永久每日循環以遠征與深淵為中心。遠征是龍族材料的主要可重複來源，深淵活動獲得深淵點數（AP），有軟週上限。", "寵物自動拾取隨刷怪消耗——寵物自動拾取券每月每角色限購兩張，因此寵物的拾取是需計算的資源。戰役與區域日常以少量貨幣與消耗品收尾。"]),
        section("weekly", "每週清單", ["每週重置門控最強獎勵。試煉（韓服為巴克隆空中島）提供可選難度與每週「克服之證」貨幣，用於專屬週常商店。", "深淵裂隙地帶（300v300）以伺服器輪換運行，每週計分；每週 AP 追蹤要求整個週期內合理分配 PvP 時間以避免浪費點數。如果只跑一個每週，試煉對養成材料的時間價值最高。"]),
        section("routine", "構建你的日常", ["可持續基線：先做戰役/區域日常（快速低承諾），然後每日遠征，再向每週 AP 目標堆疊深淵活動。寵物自動拾取刷怪應圍繞券可用性安排——每月兩張意味著留給你最密集的刷怪窗口。", "上線時記住活動與賽季通行證會在基線上增加臨時每日任務。Daeva Pass 任務獎勵你本就在做的活動，因此可無縫疊加。"]),
        section("global", "全球玩家的預期", ["全球上線（9 月 30 日搶先體驗）可能提供遠征日常與核心週常系統；試煉與深淵裂隙地帶預計上線後跟隨韓服節奏。", "在此之前，將日常視為：每日遠征進入每週試煉、深淵每週推進、寵物自動拾取每月管理。這個節奏無論哪些功能上線都能帶你穿過整個上線窗口。"]),
      ],
    }),
  },
};