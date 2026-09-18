import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-19-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 5 — Inheritance / Transcendence guide */

const inheritSource1: ContentSource = {
  id: "aion2hub-inheritance-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Updates — Inheritance & Transcendence (Jan-Jul 2026)",
  url: "https://aion2hub.com/updates", publishedAt: "2026-07-29", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 继承与超越（2026年1-7月）", en: "AION 2 Updates — Inheritance & Transcendence (Jan-Jul 2026)", fr: "AION 2 Mises à jour — Héritage et transcendance (janv.-juill. 2026)", de: "AION 2 Updates — Vermächtnis & Transzendenz (Jan.-Jul 2026)", es: "AION 2 Actualizaciones — Herencia y trascendencia (enero-julio 2026)", ja: "AION 2 アップデート — 継承と超越（2026年1月-7月）", "pt-br": "AION 2 Atualizações — Herança e Transcendência (janeiro-julho 2026)", ru: "AION 2 Обновления — Наследование и Трансценденция (январь-июль 2026)", ko: "AION 2 업데이트 — 상속과 초월 (2026년 1월-7월)", "zh-hant": "AION 2 更新 — 繼承與超越（2026年1-7月）", }, "https://aion2hub.com/updates"),
};
const inheritSource2: ContentSource = {
  id: "aion2hub-season2-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — January 21, 2026: Season 2 Inheritance System Launch",
  url: "https://aion2hub.com/updates", publishedAt: "2026-01-21", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年1月21日：第二赛季继承系统上线", en: "AION 2 Update — January 21, 2026: Season 2 Inheritance System Launch", fr: "AION 2 Mise à jour — 21 janvier 2026 : lancement du système d'héritage de la saison 2", de: "AION 2 Update — 21. Januar 2026: Start des Vermächtnissystems der Saison 2", es: "AION 2 Actualización — 21 de enero de 2026: lanzamiento del sistema de herencia de la temporada 2", ja: "AION 2 アップデート — 2026年1月21日：シーズン2継承システムローンチ", "pt-br": "AION 2 Atualização — 21 de janeiro de 2026: lançamento do sistema de herança da temporada 2", ru: "AION 2 Обновление — 21 января 2026: запуск системы наследования сезона 2", ko: "AION 2 업데이트 — 2026년 1월 21일: 시즌 2 상속 시스템 출시", "zh-hant": "AION 2 更新 — 2026年1月21日：第二賽季繼承系統上線", }, "https://aion2hub.com/updates"),
};
const inheritSource3: ContentSource = {
  id: "plaync-inherit-2026-08-19", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 상속/초월 시스템 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-01-21", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 继承/超越系统说明", en: "AION 2 (KR) — Inheritance/Transcendence System Guide", fr: "AION 2 (KR) — Guide du système d'héritage/transcendance", de: "AION 2 (KR) — Vermächtnis/Transzendenz-System-Guide", es: "AION 2 (KR) — Guía del sistema de herencia/trascendencia", ja: "AION 2 (KR) — 継承/超越システムガイド", "pt-br": "AION 2 (KR) — Guia do sistema de herança/transcendência", ru: "AION 2 (KR) — Гайд по системе наследования/трансценденции", ko: "AION 2 (KR) — 상속/초월 시스템 안내", "zh-hant": "AION 2（韓服）— 繼承/超越系統說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const inheritHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "继承/超越系统指南配图", caption: "NC 官方配图；继承系统于 2026 年 1 月随第二赛季上线。" }, en: { alt: "Inheritance/transcendence guide image", caption: "Official NC artwork; the Inheritance system launched with Season 2 in January 2026." }, fr: { alt: "Image du guide héritage/transcendance", caption: "Visuel officiel NC ; le système d'héritage a été lancé avec la saison 2 en janvier 2026." }, de: { alt: "Vermächtnis/Transzendenz-Guide-Bild", caption: "Offizielles NC-Artwork; das Vermächtnissystem startete mit Saison 2 im Januar 2026." }, es: { alt: "Imagen de la guía de herencia/trascendencia", caption: "Arte oficial de NC; el sistema de herencia se lanzó con la temporada 2 en enero de 2026." }, ja: { alt: "継承/超越ガイド画像", caption: "NC公式アートワーク；継承システムは2026年1月のシーズン2とともにローンチしました。" }, "pt-br": { alt: "Imagem do guia de herança/transcendência", caption: "Arte oficial da NC; o sistema de herança foi lançado com a temporada 2 em janeiro de 2026." }, ru: { alt: "Изображение гайда по наследованию/трансценденции", caption: "Официальный арт NC; система наследования запущена с сезоном 2 в январе 2026." }, ko: { alt: "상속/초월 시스템 가이드 이미지", caption: "NC 공식 이미지입니다. 상속 시스템은 2026년 1월 시즌 2와 함께 출시되었습니다." }, "zh-hant": { alt: "繼承/超越系統指南配圖", caption: "NC 官方配圖；繼承系統於 2026 年 1 月隨第二賽季上線。" }, },
};

export const trendingAugust19Article5: ContentEntry = {
  section: "guides", slug: "aion-2-inheritance-transcendence-guide", schemaType: "Article",
  publishedAt: "2026-08-19", updatedAt: "2026-08-19", readingMinutes: 6,
  publication: publishedVerified,
  sources: [inheritSource1, inheritSource2, inheritSource3],
  heroImage: inheritHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-trial-guide-vakron-sky-island" },
    { kind: "content", section: "guides", slug: "aion-2-leveling-guide-1-50" },
    { kind: "content", section: "guides", slug: "global-launch-dungeon-raid-size-changes" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "ENDGAME SYSTEM GUIDE", title: "Aion 2 Inheritance & Transcendence Guide: Endgame Progression",
      description: "The Inheritance and Transcendence systems are Aion 2's endgame progression — the path beyond level 50. How they work, Arcana, and what global players should expect.",
      intro: "Once you hit level 50, the progression does not end — it moves into Inheritance and Transcendence, Aion 2's endgame character-growth systems. Inheritance (launched with Season 2 in January 2026) lets you carry over select stats and abilities to a new progression track. Transcendence (the Arcana system) adds a parallel layer of power growth through special equipment slots. This guide explains both systems and how they fit together.",
      sourceNote: "Based on AION2Hub's Season 2 patch notes (January 21), Inheritance Craft update (July 29), and the July 15 trial update, plus NCSoft's official KR notice board.",
      keywords: ["Aion 2 Inheritance", "Aion 2 Transcendence", "Aion 2 Arcana", "Aion 2 endgame progression", "Aion 2 season 2"],
      sections: [
        section("inheritance", "Inheritance — The Season 2 System", ["Inheritance launched with Season 2 on January 21, 2026. It added a new progression track that lets you carry over character power — think of it as a prestige system: you reinvest your accumulated strength into new bonuses.", "The July 29 update expanded this with Inheritance Craft and Advanced Inheritance, letting players craft and refine Inheritance bonuses. The system was further expanded in Chapter 1 (July 1) with guaranteed 100% inheritance rates, making it more accessible."]),
        section("transcendence", "Transcendence & the Arcana System", ["Transcendence is the Arcana-based progression system — special equipment slots (Pendant, Scale, Brooch) that provide stats and unique effects. Arcana are obtained through the Mirror of Crimson Affection and other endgame content, and can be crafted, upgraded, and rerolled.", "The August 12 patch introduced 'Noiran's Hidden Legacy' transcendence (Dice and Lantern Arcana), and the July 15 trial update (Vakron Sky Island) provides weekly Proof-of-Overcoming for the transcendence shop."]),
        section("integration", "How They Fit Together", ["Inheritance and Transcendence are complementary: Inheritance provides a baseline bonus that carries across your account, while Transcendence is the active gear-progression layer that you optimize for each build.", "The weekly Trial (Vakron Sky Island) and expeditions (Encroached Deus Research Base) feed into both systems — crafting Inheritance materials and earning Arcana drops. Together, they form the PvE endgame loop that repeats on a weekly cadence."]),
        section("global", "What Global Players Should Expect", ["Inheritance and Transcendence are not confirmed for the September 30 global launch as core launch features. NCSoft's global roadmap is expected to bring post-launch content over time, following the KR content cadence.", "For launch, focus on the core expedition-to-raid loop and leveling to 50. Inheritance and Transcendence are the next tier of endgame — the systems that keep you busy after the initial launch content."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "后期系统指南", title: "Aion 2 继承与超越指南：后期养成",
      description: "继承与超越系统是 Aion 2 的后期养成体系——50 级之后的成长路径。运作方式、奥秘系统及全球玩家预期。",
      intro: "达到 50 级后，养成并未结束——它进入继承与超越，Aion 2 的后期角色成长系统。继承（2026 年 1 月随第二赛季上线）让你将选定属性与能力带入新的养成轨道。超越（奥秘系统）通过特殊装备插槽增加平行的力量成长层。",
      sourceNote: "基于 AION2Hub 第二赛季补丁说明（1 月 21 日）、继承工艺更新（7 月 29 日）及 7 月 15 日试炼更新，以及 NCSoft 官方韩服公告。",
      keywords: ["Aion 2 继承", "Aion 2 超越", "Aion 2 奥秘", "Aion 2 后期养成", "Aion 2 第二赛季"],
      sections: [
        section("inheritance", "继承——第二赛季系统", ["继承于 2026 年 1 月 21 日随第二赛季上线。它引入了新的养成轨道，让你携带角色能力——可以理解为一种转生系统：你将累积的力量重新投入新的加成中。", "7 月 29 日更新扩展了继承工艺与高级继承，让玩家可以制作和精炼继承加成。第一章（7 月 1 日）进一步保证 100% 继承率，使其更易获取。"]),
        section("transcendence", "超越与奥秘系统", ["超越是基于奥秘的养成系统——特殊装备插槽（坠饰、鳞片、胸针），提供属性与独特效果。奥秘通过「深红之镜」与其他后期内容获取，可以制作、升级与重随。", "8 月 12 日补丁引入了「诺伊兰的隐秘遗产」超越（骰子与灯笼奥秘），7 月 15 日试炼更新（巴克隆空中岛）为超越商店提供每周「克服之证」。"]),
        section("integration", "两者如何配合", ["继承与超越相辅相成：继承提供跨账号的基础加成，而超越是每个构筑需要优化的主动装备养成层。", "每周试炼（巴克隆空中岛）与远征（被侵蚀的神之研究所）为两个系统提供材料——制作继承材料与获取奥秘掉落。两者共同构成每周循环的 PvE 后期玩法。"]),
        section("global", "全球玩家的预期", ["继承与超越尚未确认纳入 9 月 30 日全球首发核心功能。NCSoft 的全球路线图预计将随韩服内容节奏逐步带来上线后内容。", "上线时请聚焦从远征到团本的核心循环与升级至 50 级。继承与超越是下一个后期层级——在首发内容之后让你继续忙碌的系统。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "엔드게임 시스템 가이드", title: "Aion 2 상속과 초월 가이드: 엔드게임 성장",
      description: "상속과 초월 시스템은 Aion 2의 엔드게임 성장 체계입니다 — 50레벨 이후의 성장 경로. 작동 방식, 아르카나 시스템, 글로벌 플레이어의 기대치.",
      intro: "50레벨에 도달해도 성장은 끝나지 않습니다 — 상속과 초월, Aion 2의 엔드게임 캐릭터 성장 시스템으로 이어집니다. 상속(2026년 1월 시즌 2와 함께 출시)은 선택한 스탯과 능력을 새로운 성장 트랙으로 이월합니다.",
      sourceNote: "AION2Hub의 시즌 2 패치 노트(1월 21일), 상속 제작 업데이트(7월 29일), 7월 15일 트라이얼 업데이트와 NCSoft 공식 KR 공지에 기반합니다.",
      keywords: ["Aion 2 상속", "Aion 2 초월", "Aion 2 아르카나", "Aion 2 엔드게임 성장", "Aion 2 시즌 2"],
      sections: [
        section("inheritance", "상속 — 시즌 2 시스템", ["2026년 1월 21일 시즌 2와 함께 출시. 캐릭터 능력을 새로운 성장 트랙으로 이월하는 프레스티지 시스템입니다.", "7월 29일 업데이트로 상속 제작과 고급 상속이 추가되었습니다."]),
        section("transcendence", "초월과 아르카나 시스템", ["아르카나 기반 성장 시스템 — 특수 장비 슬롯(펜던트, 스케일, 브로치). 8월 12일 패치로 '노이란의 은밀한 유산' 초월이 추가되었습니다."]),
        section("integration", "상호 보완 관계", ["상속은 계정 전체 보너스, 초월은 빌드별 최적화 장비 성장층입니다. 주간 트라이얼과 원정대가 두 시스템을 모두 지원합니다."]),
        section("global", "글로벌 플레이어의 기대", ["9월 30일 출시 핵심 기능으로 확인되지 않았습니다. 출시 후 콘텐츠로 도입될 예정입니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "エンドゲームシステムガイド", title: "Aion 2 継承と超越ガイド：エンドゲーム成長",
      description: "継承と超越システムは Aion 2 のエンドゲーム成長体系です — レベル50以降の成長パス。仕組み、アルカナシステム、グローバルプレイヤーの期待値。",
      intro: "レベル50に達しても成長は終わりません — 継承と超越、Aion 2 のエンドゲームキャラクター成長システムへと続きます。継承(2026年1月シーズン2とともにローンチ)は選択したステータスと能力を新しい成長トラックへ引き継ぎます。",
      sourceNote: "AION2Hub のシーズン2パッチノート(1月21日)、継承クラフトアップデート(7月29日)、7月15日トライアルアップデートと NCSoft 公式 KR 掲示板に基づきます。",
      keywords: ["Aion 2 継承", "Aion 2 超越", "Aion 2 アルカナ", "Aion 2 エンドゲーム成長", "Aion 2 シーズン2"],
      sections: [
        section("inheritance", "継承 — シーズン2システム", ["2026年1月21日シーズン2とともにローンチ。キャラクター能力を新しい成長トラックへ引き継ぐプレステージシステムです。", "7月29日アップデートで継承クラフトと高度継承が追加されました。"]),
        section("transcendence", "超越とアルカナシステム", ["アルカナベースの成長システム — 特殊装備スロット(ペンダント、スケイル、ブローチ)。8月12日パッチで「ノイランの秘められた遺産」超越が追加されました。"]),
        section("integration", "相互補完関係", ["継承はアカウント全体のボーナス、超越はビルド別最適化の装備成長層です。週間トライアルと遠征が両システムを支えます。"]),
        section("global", "グローバルプレイヤーの期待", ["9月30日ローンチの核機能としては未確認。ローンチ後コンテンツとして導入予定です。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE SYSTÈME ENDGAME", title: "Guide de l'héritage et de la transcendance d'Aion 2 : progression endgame",
      description: "Les systèmes d'héritage et de transcendance sont la progression endgame d'Aion 2. Fonctionnement, Arcana et attentes pour les joueurs globaux.",
      intro: "Les systèmes d'héritage (saison 2, janvier 2026) et de transcendance (Arcana) forment la progression endgame d'Aion 2 au-delà du niveau 50.",
      sourceNote: "Basé sur les notes de patch AION2Hub de la saison 2, de la mise à jour Inheritance Craft et du trial de juillet, et l'avis officiel NCSoft KR.",
      keywords: ["Aion 2 héritage", "Aion 2 transcendance", "Aion 2 Arcana", "Aion 2 progression endgame"],
      sections: [
        section("inheritance", "Héritage", ["Système de prestige lancé avec la saison 2. Extension avec l'artisanat d'héritage en juillet 2026."]),
        section("transcendence", "Transcendance", ["Système Arcana via des emplacements d'équipement spéciaux. Extension en août 2026 avec 'Noiran's Hidden Legacy'."]),
        section("integration", "Complémentarité", ["Héritage : bonus de compte. Transcendance : optimisation par build. Tous deux alimentés par les essais et expéditions hebdomadaires."]),
        section("global", "Pour les joueurs globaux", ["Non confirmé pour le 30 septembre. Attendu en contenu post-lancement."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "ENDGAME-SYSTEM-GUIDE", title: "Aion 2 Vermächtnis- & Transzendenz-Guide: Endgame-Fortschritt",
      description: "Die Vermächtnis- und Transzendenz-Systeme sind Aion 2s Endgame-Fortschritt. Funktionsweise, Arcana und Erwartungen für Global-Spieler.",
      intro: "Die Vermächtnis- (Saison 2, Januar 2026) und Transzendenz-Systeme (Arcana) bilden den Endgame-Fortschritt von Aion 2 jenseits von Stufe 50.",
      sourceNote: "Basierend auf AION2Hub-Patchnotes zu Saison 2, dem Inheritance-Craft-Update und dem Juli-Trial-Update sowie der offiziellen NCSoft-KR-Mitteilung.",
      keywords: ["Aion 2 Vermächtnis", "Aion 2 Transzendenz", "Aion 2 Arcana", "Aion 2 Endgame-Fortschritt"],
      sections: [
        section("inheritance", "Vermächtnis", ["Prestige-System, gestartet mit Saison 2. Erweiterung mit Vermächtnis-Handwerk im Juli 2026."]),
        section("transcendence", "Transzendenz", ["Arcana-System über spezielle Ausrüstungsslots. Erweiterung im August 2026 mit 'Noirans verborgener Hinterlassenschaft'."]),
        section("integration", "Zusammenspiel", ["Vermächtnis: Account-Bonus. Transzendenz: Build-Optimierung. Beide werden durch wöchentliche Trials und Expeditionen unterstützt."]),
        section("global", "Für Global-Spieler", ["Nicht für den 30. September bestätigt. Als Post-Launch-Inhalt erwartet."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DEL SISTEMA ENDGAME", title: "Guía de la herencia y trascendencia de Aion 2: progresión endgame",
      description: "Los sistemas de herencia y trascendencia son la progresión endgame de Aion 2. Funcionamiento, Arcana y expectativas para jugadores globales.",
      intro: "Los sistemas de herencia (temporada 2, enero 2026) y trascendencia (Arcana) forman la progresión endgame de Aion 2 más allá del nivel 50.",
      sourceNote: "Basado en las notas de parche de AION2Hub de la temporada 2, la actualización Inheritance Craft y el trial de julio, y el aviso oficial de NCSoft KR.",
      keywords: ["Aion 2 herencia", "Aion 2 trascendencia", "Aion 2 Arcana", "Aion 2 progresión endgame"],
      sections: [
        section("inheritance", "Herencia", ["Sistema de prestigio lanzado con la temporada 2. Ampliado con artesanía de herencia en julio 2026."]),
        section("transcendence", "Trascendencia", ["Sistema Arcana mediante espacios de equipo especiales. Ampliado en agosto 2026 con 'Noiran's Hidden Legacy'."]),
        section("integration", "Complementariedad", ["Herencia: bonificación de cuenta. Trascendencia: optimización por build. Ambos alimentados por trials y expediciones semanales."]),
        section("global", "Para jugadores globales", ["No confirmado para el 30 de septiembre. Esperado como contenido post-lanzamiento."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DO SISTEMA ENDGAME", title: "Guia de herança e transcendência de Aion 2: progressão endgame",
      description: "Os sistemas de herança e transcendência são a progressão endgame de Aion 2. Funcionamento, Arcana e expectativas para jogadores globais.",
      intro: "Os sistemas de herança (temporada 2, janeiro 2026) e transcendência (Arcana) formam a progressão endgame de Aion 2 além do nível 50.",
      sourceNote: "Baseado nas notas de patch da AION2Hub da temporada 2, da atualização Inheritance Craft e do trial de julho, e no aviso oficial da NCSoft KR.",
      keywords: ["Aion 2 herança", "Aion 2 transcendência", "Aion 2 Arcana", "Aion 2 progressão endgame"],
      sections: [
        section("inheritance", "Herança", ["Sistema de prestígio lançado com a temporada 2. Ampliado com artesanato de herança em julho 2026."]),
        section("transcendence", "Transcendência", ["Sistema Arcana através de slots de equipamento especiais. Ampliado em agosto 2026 com 'Noiran's Hidden Legacy'."]),
        section("integration", "Complementaridade", ["Herança: bônus de conta. Transcendência: otimização por build. Ambos alimentados por trials e expedições semanais."]),
        section("global", "Para jogadores globais", ["Não confirmado para 30 de setembro. Esperado como conteúdo pós-lançamento."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ГАЙД ПО ЭНДГЕЙМ-СИСТЕМЕ", title: "Гайд по наследованию и трансценденции Aion 2: эндгейм-прогрессия",
      description: "Системы наследования и трансценденции — эндгейм-прогрессия Aion 2. Механика, Arcana и ожидания для глобальных игроков.",
      intro: "Системы наследования (сезон 2, январь 2026) и трансценденции (Arcana) формируют эндгейм-прогрессию Aion 2 за пределами 50 уровня.",
      sourceNote: "На основе патч-ноутов AION2Hub сезона 2, обновления Inheritance Craft и июльского испытания, а также официального уведомления NCSoft KR.",
      keywords: ["Aion 2 наследование", "Aion 2 трансценденция", "Aion 2 Arcana", "Aion 2 эндгейм-прогрессия"],
      sections: [
        section("inheritance", "Наследование", ["Система престижа, запущенная с сезоном 2. Расширена крафтом наследования в июле 2026."]),
        section("transcendence", "Трансценденция", ["Система Arcana через специальные слоты экипировки. Расширена в августе 2026 с «Noiran's Hidden Legacy»."]),
        section("integration", "Взаимодополнение", ["Наследование: бонус аккаунта. Трансценденция: оптимизация под билд. Обе поддерживаются еженедельными испытаниями и экспедициями."]),
        section("global", "Глобальным игрокам", ["Не подтверждено к 30 сентября. Ожидается как контент после запуска."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "後期系統指南", title: "Aion 2 繼承與超越指南：後期養成",
      description: "繼承與超越系統是 Aion 2 的後期養成體系——50 級之後的成長路徑。運作方式、奧秘系統及全球玩家預期。",
      intro: "達到 50 級後，養成並未結束——它進入繼承與超越，Aion 2 的後期角色成長系統。繼承（2026 年 1 月隨第二賽季上線）讓你將選定屬性與能力帶入新的養成軌道。超越（奧秘系統）透過特殊裝備插槽增加平行的力量成長層。",
      sourceNote: "基於 AION2Hub 第二賽季補丁說明（1 月 21 日）、繼承工藝更新（7 月 29 日）及 7 月 15 日試煉更新，以及 NCSoft 官方韓服公告。",
      keywords: ["Aion 2 繼承", "Aion 2 超越", "Aion 2 奧秘", "Aion 2 後期養成", "Aion 2 第二賽季"],
      sections: [
        section("inheritance", "繼承——第二賽季系統", ["繼承於 2026 年 1 月 21 日隨第二賽季上線。它引入了新的養成軌道，讓你攜帶角色能力——可以理解為一種轉生系統：你將累積的力量重新投入新的加成中。", "7 月 29 日更新擴展了繼承工藝與高級繼承，讓玩家可以製作和精煉繼承加成。第一章（7 月 1 日）進一步保證 100% 繼承率，使其更易獲取。"]),
        section("transcendence", "超越與奧秘系統", ["超越是基於奧秘的養成系統——特殊裝備插槽（墜飾、鱗片、胸針），提供屬性與獨特效果。奧秘透過「深紅之鏡」與其他後期內容獲取，可以製作、升級與重隨。", "8 月 12 日補丁引入了「諾伊蘭的隱秘遺產」超越（骰子與燈籠奧秘），7 月 15 日試煉更新（巴克隆空中島）為超越商店提供每週「克服之證」。"]),
        section("integration", "兩者如何配合", ["繼承與超越相輔相成：繼承提供跨帳號的基礎加成，而超越是每個構築需要優化的主動裝備養成層。", "每週試煉（巴克隆空中島）與遠征（被侵蝕的神之研究所）為兩個系統提供材料——製作繼承材料與獲取奧秘掉落。兩者共同構成每週循環的 PvE 後期玩法。"]),
        section("global", "全球玩家的預期", ["繼承與超越尚未確認納入 9 月 30 日全球首發核心功能。NCSoft 的全球路線圖預計將隨韓服內容節奏逐步帶來上線後內容。", "上線時請聚焦從遠征到團本的核心循環與升級至 50 級。繼承與超越是下一個後期層級——在首發內容之後讓你繼續忙碌的系統。"]),
      ],
    }),
  },
};