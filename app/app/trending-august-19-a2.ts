import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-19-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 2 — Abyss Rift Zone 300v300 guide */

const abyssSource1: ContentSource = {
  id: "aion2hub-abyss-rift-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — July 15, 2026: Abyss Rift Zone Rework (300v300)",
  url: "https://aion2hub.com/updates", publishedAt: "2026-07-15", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年7月15日：深渊裂隙地带重做（300v300）", en: "AION 2 Update — July 15, 2026: Abyss Rift Zone Rework (300v300)", fr: "AION 2 Mise à jour — 15 juillet 2026 : refonte de la zone de faille de l'Abîme (300v300)", de: "AION 2 Update — 15. Juli 2026: Abgrund-Rift-Zonen-Überarbeitung (300v300)", es: "AION 2 Actualización — 15 de julio de 2026: rework de la zona de grieta del Abismo (300v300)", ja: "AION 2 アップデート — 2026年7月15日：アビスリフトゾーンリワーク（300v300）", "pt-br": "AION 2 Atualização — 15 de julho de 2026: reforma da zona de fenda do Abismo (300v300)", ru: "AION 2 Обновление — 15 июля 2026: переработка зоны разлома Бездны (300v300)", ko: "AION 2 업데이트 — 2026년 7월 15일: 심연 균열 지대 개편 (300v300)", "zh-hant": "AION 2 更新 — 2026年7月15日：深淵裂隙地帶重做（300v300）", }, "https://aion2hub.com/updates"),
};
const abyssSource2: ContentSource = {
  id: "aion2hub-abyss-events-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — June 17, 2026: Abyss Rift Zone Event Debuts",
  url: "https://aion2hub.com/updates", publishedAt: "2026-06-17", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年6月17日：深渊裂隙地带活动首秀", en: "AION 2 Update — June 17, 2026: Abyss Rift Zone Event Debuts", fr: "AION 2 Mise à jour — 17 juin 2026 : début de l'événement de la zone de faille de l'Abîme", de: "AION 2 Update — 17. Juni 2026: Abgrund-Rift-Zonen-Event debütiert", es: "AION 2 Actualización — 17 de junio de 2026: debut del evento de la zona de grieta del Abismo", ja: "AION 2 アップデート — 2026年6月17日：アビスリフトゾーンイベント開始", "pt-br": "AION 2 Atualização — 17 de junho de 2026: estreia do evento da zona de fenda do Abismo", ru: "AION 2 Обновление — 17 июня 2026: дебют события зоны разлома Бездны", ko: "AION 2 업데이트 — 2026년 6월 17일: 심연 균열 지대 이벤트 데뷔", "zh-hant": "AION 2 更新 — 2026年6月17日：深淵裂隙地帶活動首秀", }, "https://aion2hub.com/updates"),
};
const abyssSource3: ContentSource = {
  id: "plaync-abyss-2026-08-19", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 심연/균열 지대 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-15", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 深渊/裂隙地带说明", en: "AION 2 (KR) — Abyss/Rift Zone Guide", fr: "AION 2 (KR) — Guide de la zone Abîme/Faille", de: "AION 2 (KR) — Abgrund/Rift-Zonen-Guide", es: "AION 2 (KR) — Guía de la zona Abismo/Grieta", ja: "AION 2 (KR) — 深淵/リフトゾーンガイド", "pt-br": "AION 2 (KR) — Guia da zona Abismo/Fenda", ru: "AION 2 (KR) — Гайд по зоне Бездны/Разлома", ko: "AION 2 (KR) — 심연/균열 지대 안내", "zh-hant": "AION 2（韓服）— 深淵/裂隙地帶說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const abyssHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "深渊裂隙地带指南配图", caption: "NC 官方配图；深渊裂隙地带支持 300v300 阵营跨服匹配。" }, en: { alt: "Abyss Rift Zone guide image", caption: "Official NC artwork; the Abyss Rift Zone supports 300v300 cross-faction mass PvP." }, fr: { alt: "Image du guide de la zone de faille de l'Abîme", caption: "Visuel officiel NC ; la zone de faille de l'Abîme supporte le PvP de masse 300v300 inter-factions." }, de: { alt: "Abgrund-Rift-Zonen-Guide-Bild", caption: "Offizielles NC-Artwork; die Abgrund-Rift-Zone unterstützt 300v300 Massen-PvP." }, es: { alt: "Imagen de la guía de la zona de grieta del Abismo", caption: "Arte oficial de NC; la zona de grieta del Abismo soporta PvP masivo 300v300 entre facciones." }, ja: { alt: "アビスリフトゾーンガイド画像", caption: "NC公式アートワーク；アビスリフトゾーンは300v300のクロス陣営マスPvPをサポート。" }, "pt-br": { alt: "Imagem do guia da zona de fenda do Abismo", caption: "Arte oficial da NC; a zona de fenda do Abismo suporta PvP em massa 300v300 entre facções." }, ru: { alt: "Изображение гайда по зоне разлома Бездны", caption: "Официальный арт NC; зона разлома Бездны поддерживает массовый PvP 300v300." }, ko: { alt: "심연 균열 지대 가이드 이미지", caption: "NC 공식 이미지입니다. 심연 균열 지대는 300v300 진영 간 대규모 PvP를 지원합니다." }, "zh-hant": { alt: "深淵裂隙地帶指南配圖", caption: "NC 官方配圖；深淵裂隙地帶支援 300v300 陣營跨服匹配。" }, },
};

export const trendingAugust19Article2: ContentEntry = {
  section: "guides", slug: "aion-2-abyss-rift-zone-guide", schemaType: "Article",
  publishedAt: "2026-08-19", updatedAt: "2026-08-19", readingMinutes: 5,
  publication: publishedVerified,
  sources: [abyssSource1, abyssSource2, abyssSource3],
  heroImage: abyssHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-pvp-guide-battlegrounds-abyss" },
    { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
    { kind: "content", section: "guides", slug: "aion-2-global-server-regions-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "MASS PVP GUIDE", title: "Aion 2 Abyss Rift Zone Guide: 300v300 Faction Warfare & Rewards",
      description: "The Abyss Rift Zone is Aion 2's massive 300v300 faction-vs-faction PvP battleground. How it works, scoring, rewards, and what changed in the July 2026 rework.",
      intro: "While Aion 2's 10v10 battlegrounds offer normalized competitive PvP, the Abyss Rift Zone is where the true faction war happens — a 300v300 open-world PvP zone where Elyos and Asmodians clash for dominance. The July 2026 rework reshaped the zone with new scoring, boss events, and cross-faction matchmaking improvements. This guide covers how the Rift Zone works and how to make the most of it.",
      sourceNote: "Based on AION2Hub's June 17 and July 15 update notes, plus NCSoft's official KR notice board. Abyss mechanics reflect the latest confirmed state.",
      keywords: ["Aion 2 Abyss Rift Zone", "Aion 2 300v300", "Aion 2 mass PvP", "Aion 2 faction warfare", "Aion 2 Abyss rewards"],
      sections: [
        section("overview", "What Is the Abyss Rift Zone?", ["The Abyss Rift Zone is a dedicated mass-PvP zone where Elyos and Asmodians compete for control. It supports up to 300 players per side, making it Aion 2's largest-scale PvP content. Unlike the 10v10 battlegrounds, gear and progression matter here — stat normalization does not apply.", "The zone features objectives, boss spawns, and scoring that rewards faction participation rather than individual kills. The June 2026 debut introduced the event format, and the July 2026 rework added faction-integrated matching, boss tuning, and scoring changes to make the mode more accessible."]),
        section("scoring", "Scoring & Progression", ["Abyss Points (AP) are the primary currency earned in the Rift Zone — spent on Abyss gear, enhancement materials, and honor medals. The July rework unified the weekly AP cap and adjusted how PvP points are awarded per kill, objective, and boss contribution.", "The Rift Zone also feeds into the Abyss server rematch system, which rotates the active Rift Zone server to keep the population balanced. Officers can guarantee entry, ensuring faction leaders can participate even during peak times."]),
        section("rewards", "Gear & Rewards", ["The Abyss gear progression path is separate from the dungeon/expedition track. Abyss accessories and gear tiers advance alongside the Draconic dungeon gear, providing a parallel endgame gearing route for PvP-focused players.", "The July 2026 patch introduced next Draconic and Abyss accessory tiers, and the June 2024 update added gear potential enhancement — a system that amplifies the stats of Abyss gear using materials earned in the zone."]),
        section("global", "What Global Players Should Expect", ["The Abyss Rift Zone is KR-service content and is not confirmed for the September 30 global launch. NCSoft has confirmed the global version will include its core PvP systems, but the Rift Zone's current scale and complexity may arrive in a post-launch update.", "For launch, focus on the 10v10 battlegrounds with stat normalization and the open-world Abyss with PvP toggle — both confirmed for launch. The Rift Zone is the next tier of mass PvP to look forward to."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "大规模 PvP 指南", title: "Aion 2 深渊裂隙地带指南：300v300 阵营战争与奖励",
      description: "深渊裂隙地带是 Aion 2 的大规模 300v300 阵营对抗 PvP 战场。运作方式、计分、奖励及 2026 年 7 月重做的变化。",
      intro: "Aion 2 的 10v10 战场提供标准化竞技 PvP，而深渊裂隙地带才是真正的阵营战争——一个 300v300 开放世界 PvP 区域，天族与魔族在此争夺统治权。2026 年 7 月重做重塑了该区域，新增计分、BOSS 事件与跨阵营匹配改进。本指南涵盖裂隙地带的运作方式与如何充分利用。",
      sourceNote: "基于 AION2Hub 6 月 17 日与 7 月 15 日更新说明，以及 NCSoft 官方韩服公告。",
      keywords: ["Aion 2 深渊裂隙地带", "Aion 2 300v300", "Aion 2 大规模 PvP", "Aion 2 阵营战争", "Aion 2 深渊奖励"],
      sections: [
        section("overview", "什么是深渊裂隙地带？", ["深渊裂隙地带是专用的开放世界大规模 PvP 区域，天族与魔族在此争夺控制权。每方最多支持 300 人，是 Aion 2 最大规模的 PvP 内容。与 10v10 战场不同，装备与养成在此起效——属性标准化不适用。", "该区域设有目标、BOSS 刷新与计分系统，奖励阵营参与而非个人击杀。2026 年 6 月首次亮相，7 月重做增加了阵营整合匹配、BOSS 调整与计分变化。"]),
        section("scoring", "计分与养成", ["深渊点数（AP）是在裂隙地带获得的主要货币——用于深渊装备、强化材料与荣誉勋章。7 月重做统一了每周 AP 上限，调整了每次击杀、目标与 BOSS 贡献的 PvP 点数分配方式。", "裂隙地带还接入深渊服务器重赛系统，轮换活跃的深渊服务器以保持人口平衡。官员可确保入场，确保阵营领袖即使在高峰时段也能参与。"]),
        section("rewards", "装备与奖励", ["深渊装备养成路径独立于副本/远征路线。深渊饰品与装备层级随龙族副本装备同步推进，为 PvP 玩家提供平行的后期装备路线。", "2026 年 7 月补丁引入了下一代龙族与深渊饰品层级，2024 年 6 月更新增加了装备潜力增强——一种用该区域获得材料增强深渊装备属性的系统。"]),
        section("global", "全球玩家的预期", ["深渊裂隙地带是韩服内容，尚未确认纳入 9 月 30 日全球首发。NCSoft 已确认全球版将包含核心 PvP 系统，但裂隙地带目前的规模与复杂度可能以上线后更新形式抵达。", "上线时请聚焦属性标准化的 10v10 战场与带 PvP 开关的开放世界深渊——两者均已确认上线。裂隙地带是下一个值得期待的大规模 PvP 层级。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "대규모 PVP 가이드", title: "Aion 2 심연 균열 지대 가이드: 300v300 진영 전쟁과 보상",
      description: "심연 균열 지대는 Aion 2의 대규모 300v300 진영 간 PvP 전장입니다. 작동 방식, 점수, 보상 및 2026년 7월 개편의 변화를 소개합니다.",
      intro: "Aion 2의 10v10 전장이 표준화된 경쟁 PvP를 제공한다면, 심연 균열 지대는 진정한 진영 전쟁이 일어나는 곳입니다. 2026년 7월 개편은 새로운 점수 체계, 보스 이벤트, 진영 간 매칭 개선을 도입했습니다.",
      sourceNote: "AION2Hub의 6월 17일·7월 15일 업데이트 노트와 NCSoft 공식 KR 공지에 기반합니다.",
      keywords: ["Aion 2 심연 균열 지대", "Aion 2 300v300", "Aion 2 대규모 PvP", "Aion 2 진영 전쟁", "Aion 2 심연 보상"],
      sections: [
        section("overview", "심연 균열 지대란?", ["전용 대규모 PvP 지역으로 엘리오스와 아스모디안이 지배권을 다툽니다. 진영당 최대 300명을 지원합니다. 10v10 전장과 달리 장비와 성장이 중요합니다.", "6월 첫 선을 보인 후 7월 개편으로 진영 통합 매칭과 보스 튜닝이 추가되었습니다."]),
        section("scoring", "점수와 성장", ["심연 포인트(AP)가 주요 통화입니다. 7월 개편으로 주간 AP 상한이 통일되고 PvP 포인트 지급 방식이 조정되었습니다."]),
        section("rewards", "장비와 보상", ["심연 장비 성장 경로는 던전/원정대와 별개입니다. PvP 중심 플레이어를 위한 평행 엔드게임 장비 루트를 제공합니다."]),
        section("global", "글로벌 플레이어의 기대", ["KR 서비스 콘텐츠로 9월 30일 출시에 확인되지 않았습니다. 출시 시 10v10 전장과 오픈월드 심연에 집중하세요."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "大規模PvPガイド", title: "Aion 2 アビスリフトゾーンガイド：300v300 陣営戦争と報酬",
      description: "アビスリフトゾーンは Aion 2 の大規模300v300陣営対抗PvPバトルグラウンドです。仕組み、スコアリング、報酬、2026年7月のリワークの変更点。",
      intro: "Aion 2 の10v10バトルグラウンドが標準化された競争PvPを提供する一方、アビスリフトゾーンは真の陣営戦争が行われる場所です。2026年7月のリワークは新しいスコアリング、ボスイベント、陣営間マッチング改善をもたらしました。",
      sourceNote: "AION2Hub の6月17日・7月15日アップデートノートと NCSoft 公式 KR 掲示板に基づきます。",
      keywords: ["Aion 2 アビスリフトゾーン", "Aion 2 300v300", "Aion 2 大規模PvP", "Aion 2 陣営戦争", "Aion 2 アビス報酬"],
      sections: [
        section("overview", "アビスリフトゾーンとは？", ["専用大規模PvPゾーンで、エリオスとアスモデイアンが支配権を争います。陣営あたり最大300人をサポート。", "6月に初登場、7月のリワークで陣営統合マッチングとボスチューニングが追加されました。"]),
        section("scoring", "スコアリングと成長", ["アビスポイント(AP)が主要通貨。7月のリワークで週間AP上限が統一され、PvPポイント付与方式が調整されました。"]),
        section("rewards", "装備と報酬", ["アビス装備の成長経路はダンジョン/遠征とは別です。PvP中心プレイヤーのための並行エンドゲーム装備ルートを提供します。"]),
        section("global", "グローバルプレイヤーの期待", ["KRサービスコンテンツで、9月30日ローンチには未確認です。ローンチ時は10v10戦場とオープンワールド深淵に集中しましょう。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE PVP DE MASSE", title: "Guide de la zone de faille de l'Abîme d'Aion 2 : guerre de factions 300v300",
      description: "La zone de faille de l'Abîme est le champ de bataille PvP de masse 300v300 d'Aion 2. Fonctionnement, score, récompenses et refonte de juillet 2026.",
      intro: "La zone de faille de l'Abîme est le véritable champ de guerre des factions avec des affrontements 300v300 entre Elyos et Asmodiens.",
      sourceNote: "Basé sur les notes d'AION2Hub des 17 juin et 15 juillet, et l'avis officiel NCSoft KR.",
      keywords: ["Aion 2 zone de faille de l'Abîme", "Aion 2 300v300", "Aion 2 PvP de masse", "Aion 2 guerre de factions"],
      sections: [
        section("overview", "Qu'est-ce que la zone de faille ?", ["Zone PvP de masse 300v300. Les Elyos et Asmodiens s'affrontent pour le contrôle. L'équipement compte ici."]),
        section("scoring", "Score et progression", ["Points d'Abîme (AP) comme monnaie. Refonte de juillet : plafond AP unifié, ajustement des points PvP."]),
        section("rewards", "Équipement", ["Voie d'équipement parallèle pour les joueurs PvP, via les accessoires et les paliers d'armure de l'Abîme."]),
        section("global", "Pour les joueurs globaux", ["Non confirmé pour le 30 septembre. Concentrez-vous sur les champs de bataille 10v10 au lancement."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "MASSEN-PVP-GUIDE", title: "Aion 2 Abgrund-Rift-Zonen-Guide: 300v300 Fraktionskrieg",
      description: "Die Abgrund-Rift-Zone ist Aion 2s massives 300v300 Fraktions-PvP. Funktionsweise, Wertung, Belohnungen und die Überarbeitung vom Juli 2026.",
      intro: "Die Abgrund-Rift-Zone ist der wahre Fraktionskrieg mit 300v300-Gefechten zwischen Elyos und Asmodiern.",
      sourceNote: "Basierend auf AION2Hub-Notizen vom 17. Juni und 15. Juli sowie der offiziellen NCSoft-KR-Mitteilung.",
      keywords: ["Aion 2 Abgrund-Rift-Zone", "Aion 2 300v300", "Aion 2 Massen-PvP", "Aion 2 Fraktionskrieg"],
      sections: [
        section("overview", "Was ist die Rift-Zone?", ["Massen-PvP-Zone 300v300. Elyos gegen Asmodier um die Kontrolle. Ausrüstung zählt hier."]),
        section("scoring", "Wertung und Fortschritt", ["Abgrund-Punkte (AP) als Währung. Juli-Überarbeitung: einheitliches AP-Limit, angepasste PvP-Punkte."]),
        section("rewards", "Ausrüstung", ["Paralleler Ausrüstungspfad für PvP-Spieler über Abgrund-Zubehör und Rüstungsstufen."]),
        section("global", "Für Global-Spieler", ["Nicht für den 30. September bestätigt. Konzentrieren Sie sich beim Launch auf 10v10-Schlachtfelder."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DE PVP MASIVO", title: "Guía de la zona de grieta del Abismo de Aion 2: guerra de facciones 300v300",
      description: "La zona de grieta del Abismo es el campo de batalla PvP masivo 300v300 de Aion 2. Funcionamiento, puntuación, recompensas y el rework de julio de 2026.",
      intro: "La zona de grieta del Abismo es la verdadera guerra de facciones con enfrentamientos 300v300 entre Elyos y Asmodianos.",
      sourceNote: "Basado en las notas de AION2Hub del 17 de junio y 15 de julio, y el aviso oficial de NCSoft KR.",
      keywords: ["Aion 2 zona de grieta del Abismo", "Aion 2 300v300", "Aion 2 PvP masivo", "Aion 2 guerra de facciones"],
      sections: [
        section("overview", "¿Qué es la zona de grieta?", ["Zona PvP masiva 300v300. Elyos y Asmodianos compiten por el control. El equipo sí importa aquí."]),
        section("scoring", "Puntuación y progresión", ["Puntos de Abismo (AP) como moneda. Rework de julio: límite de AP unificado, ajuste de puntos PvP."]),
        section("rewards", "Equipo", ["Ruta de equipo paralela para jugadores PvP, mediante accesorios y armaduras del Abismo."]),
        section("global", "Para jugadores globales", ["No confirmado para el 30 de septiembre. Céntrate en los campos de batalla 10v10 en el lanzamiento."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DE PVP EM MASSA", title: "Guia da zona de fenda do Abismo de Aion 2: guerra de facções 300v300",
      description: "A zona de fenda do Abismo é o campo de batalha PvP em massa 300v300 de Aion 2. Funcionamento, pontuação, recompensas e a reforma de julho de 2026.",
      intro: "A zona de fenda do Abismo é a verdadeira guerra de facções com confrontos 300v300 entre Elyos e Asmodianos.",
      sourceNote: "Baseado nas notas da AION2Hub de 17 de junho e 15 de julho, e no aviso oficial da NCSoft KR.",
      keywords: ["Aion 2 zona de fenda do Abismo", "Aion 2 300v300", "Aion 2 PvP em massa", "Aion 2 guerra de facções"],
      sections: [
        section("overview", "O que é a zona de fenda?", ["Zona PvP em massa 300v300. Elyos e Asmodianos competem pelo controle. Equipamento importa aqui."]),
        section("scoring", "Pontuação e progressão", ["Pontos do Abismo (AP) como moeda. Reforma de julho: limite de AP unificado, ajuste de pontos PvP."]),
        section("rewards", "Equipamento", ["Rota de equipamento paralela para jogadores PvP, via acessórios e armaduras do Abismo."]),
        section("global", "Para jogadores globais", ["Não confirmado para 30 de setembro. Foco nos campos de batalha 10v10 no lançamento."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ГАЙД ПО МАССОВОМУ PVP", title: "Гайд по зоне разлома Бездны Aion 2: межфракционная война 300v300",
      description: "Зона разлома Бездны — массовое PvP-поле 300v300 в Aion 2. Механика, очки, награды и переработка июля 2026.",
      intro: "Зона разлома Бездны — настоящая межфракционная война со столкновениями 300v300 между Элиос и Асмодианами.",
      sourceNote: "На основе записей AION2Hub от 17 июня и 15 июля, а также официального уведомления NCSoft KR.",
      keywords: ["Aion 2 зона разлома Бездны", "Aion 2 300v300", "Aion 2 массовый PvP", "Aion 2 межфракционная война"],
      sections: [
        section("overview", "Что такое зона разлома?", ["Массовая PvP-зона 300v300. Элиос и Асмодиане борются за контроль. Снаряжение здесь имеет значение."]),
        section("scoring", "Очки и прогрессия", ["Очки Бездны (AP) — основная валюта. Июльская переработка: единый лимит AP, корректировка PvP-очков."]),
        section("rewards", "Снаряжение", ["Параллельный путь PvP-экипировки через аксессуары и броню Бездны."]),
        section("global", "Глобальным игрокам", ["Не подтверждено к 30 сентября. Сосредоточьтесь на полях сражений 10v10 при запуске."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "大規模 PvP 指南", title: "Aion 2 深淵裂隙地帶指南：300v300 陣營戰爭與獎勵",
      description: "深淵裂隙地帶是 Aion 2 的大規模 300v300 陣營對抗 PvP 戰場。運作方式、計分、獎勵及 2026 年 7 月重做的變化。",
      intro: "Aion 2 的 10v10 戰場提供標準化競技 PvP，而深淵裂隙地帶才是真正的陣營戰爭——一個 300v300 開放世界 PvP 區域，天族與魔族在此爭奪統治權。2026 年 7 月重做重塑了該區域，新增計分、BOSS 事件與跨陣營匹配改進。本指南涵蓋裂隙地帶的運作方式與如何充分利用。",
      sourceNote: "基於 AION2Hub 6 月 17 日與 7 月 15 日更新說明，以及 NCSoft 官方韓服公告。",
      keywords: ["Aion 2 深淵裂隙地帶", "Aion 2 300v300", "Aion 2 大規模 PvP", "Aion 2 陣營戰爭", "Aion 2 深淵獎勵"],
      sections: [
        section("overview", "什麼是深淵裂隙地帶？", ["專用的開放世界大規模 PvP 區域，天族與魔族在此爭奪控制權。每方最多支援 300 人，是 Aion 2 最大規模的 PvP 內容。與 10v10 戰場不同，裝備與養成在此起效——屬性標準化不適用。", "該區域設有目標、BOSS 刷新與計分系統，獎勵陣營參與而非個人擊殺。2026 年 6 月首次亮相，7 月重做增加了陣營整合匹配、BOSS 調整與計分變化。"]),
        section("scoring", "計分與養成", ["深淵點數（AP）是在裂隙地帶獲得的主要貨幣——用於深淵裝備、強化材料與榮譽勳章。7 月重做統一了每週 AP 上限，調整了每次擊殺、目標與 BOSS 貢獻的 PvP 點數分配方式。", "裂隙地帶還接入深淵伺服器重賽系統，輪換活躍的深淵伺服器以保持人口平衡。官員可確保入場，確保陣營領袖即使在高峰時段也能參與。"]),
        section("rewards", "裝備與獎勵", ["深淵裝備養成路徑獨立於副本/遠征路線。深淵飾品與裝備層級隨龍族副本裝備同步推進，為 PvP 玩家提供平行的後期裝備路線。", "2026 年 7 月補丁引入了下一代龍族與深淵飾品層級，2024 年 6 月更新增加了裝備潛力增強——一種用該區域獲得材料增強深淵裝備屬性的系統。"]),
        section("global", "全球玩家的預期", ["深淵裂隙地帶是韓服內容，尚未確認納入 9 月 30 日全球首發。NCSoft 已確認全球版將包含核心 PvP 系統，但裂隙地帶目前的規模與複雜度可能以上線後更新形式抵達。", "上線時請聚焦屬性標準化的 10v10 戰場與帶 PvP 開關的開放世界深淵——兩者均已確認上線。裂隙地帶是下一個值得期待的大規模 PvP 層級。"]),
      ],
    }),
  },
};