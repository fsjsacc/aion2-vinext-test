import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-19-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 4 — Stigma / Skill System guide */

const stigmaSource1: ContentSource = {
  id: "aion2hub-stigma-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — March 25, 2026: 5 Stigma Slots & New Skill Per Class",
  url: "https://aion2hub.com/updates", publishedAt: "2026-03-25", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年3月25日：5个圣痕插槽与每职业一个技能", en: "AION 2 Update — March 25, 2026: 5 Stigma Slots & New Skill Per Class", fr: "AION 2 Mise à jour — 25 mars 2026 : 5 emplacements Stigma et une compétence par classe", de: "AION 2 Update — 25. März 2026: 5 Stigma-Slots & ein neuer Skill pro Klasse", es: "AION 2 Actualización — 25 de marzo de 2026: 5 espacios de Stigma y una habilidad por clase", ja: "AION 2 アップデート — 2026年3月25日：5つのスティグマスロットとクラスごとに新スキル", "pt-br": "AION 2 Atualização — 25 de março de 2026: 5 slots de Stigma e uma habilidade por classe", ru: "AION 2 Обновление — 25 марта 2026: 5 слотов Stigma и новый навык для каждого класса", ko: "AION 2 업데이트 — 2026년 3월 25일: 5개 스티그마 슬롯 및 클래스별 신규 스킬", "zh-hant": "AION 2 更新 — 2026年3月25日：5個烙印插槽與每職業一個技能", }, "https://aion2hub.com/updates"),
};
const stigmaSource2: ContentSource = {
  id: "aion2hub-stigma-jan-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — January 7, 2026: Skill-Mastery & Stigma Presets",
  url: "https://aion2hub.com/updates", publishedAt: "2026-01-07", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年1月7日：技能精通与圣痕预设", en: "AION 2 Update — January 7, 2026: Skill-Mastery & Stigma Presets", fr: "AION 2 Mise à jour — 7 janvier 2026 : maîtrise des compétences et préréglages Stigma", de: "AION 2 Update — 7. Januar 2026: Skill-Mastery & Stigma-Presets", es: "AION 2 Actualización — 7 de enero de 2026: dominio de habilidades y preajustes de Stigma", ja: "AION 2 アップデート — 2026年1月7日：スキルマスタリーとスティグマプリセット", "pt-br": "AION 2 Atualização — 7 de janeiro de 2026: maestria de habilidades e predefinições de Stigma", ru: "AION 2 Обновление — 7 января 2026: мастерство навыков и пресеты Stigma", ko: "AION 2 업데이트 — 2026년 1월 7일: 스킬 마스터리 및 스티그마 프리셋", "zh-hant": "AION 2 更新 — 2026年1月7日：技能精通與烙印預設", }, "https://aion2hub.com/updates"),
};
const stigmaSource3: ContentSource = {
  id: "plaync-stigma-2026-08-19", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 스티그마/스킬 시스템 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-03-25", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 圣痕/技能系统说明", en: "AION 2 (KR) — Stigma/Skill System Guide", fr: "AION 2 (KR) — Guide du système Stigma/Compétences", de: "AION 2 (KR) — Stigma/Fertigkeits-System-Guide", es: "AION 2 (KR) — Guía del sistema de Stigma/habilidades", ja: "AION 2 (KR) — スティグマ/スキルシステムガイド", "pt-br": "AION 2 (KR) — Guia do sistema de Stigma/habilidades", ru: "AION 2 (KR) — Гайд по системе Stigma/навыков", ko: "AION 2 (KR) — 스티그마/스킬 시스템 안내", "zh-hant": "AION 2（韓服）— 烙印/技能系統說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const stigmaHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "圣痕/技能系统指南配图", caption: "NC 官方配图；圣痕系统提供 5 个插槽，每职业一个新技能。" }, en: { alt: "Stigma/skill system guide image", caption: "Official NC artwork; the Stigma system offers 5 slots with one new skill per class." }, fr: { alt: "Image du guide système Stigma/compétences", caption: "Visuel officiel NC ; le système Stigma offre 5 emplacements avec une compétence par classe." }, de: { alt: "Stigma/Fertigkeits-System-Guide-Bild", caption: "Offizielles NC-Artwork; das Stigma-System bietet 5 Slots mit einem neuen Skill pro Klasse." }, es: { alt: "Imagen de la guía del sistema de Stigma/habilidades", caption: "Arte oficial de NC; el sistema Stigma ofrece 5 espacios con una habilidad por clase." }, ja: { alt: "スティグマ/スキルシステムガイド画像", caption: "NC公式アートワーク；スティグマシステムは5つのスロットとクラスごとに1つの新スキルを提供します。" }, "pt-br": { alt: "Imagem do guia do sistema de Stigma/habilidades", caption: "Arte oficial da NC; o sistema Stigma oferece 5 slots com uma habilidade por classe." }, ru: { alt: "Изображение гайда по системе Stigma/навыков", caption: "Официальный арт NC; система Stigma предлагает 5 слотов с одним навыком на класс." }, ko: { alt: "스티그마/스킬 시스템 가이드 이미지", caption: "NC 공식 이미지입니다. 스티그마 시스템은 5개 슬롯과 클래스별 신규 스킬을 제공합니다." }, "zh-hant": { alt: "烙印/技能系統指南配圖", caption: "NC 官方配圖；烙印系統提供 5 個插槽，每職業一個新技能。" }, },
};

export const trendingAugust19Article4: ContentEntry = {
  section: "guides", slug: "aion-2-stigma-skill-system-guide", schemaType: "Article",
  publishedAt: "2026-08-19", updatedAt: "2026-08-19", readingMinutes: 5,
  publication: publishedVerified,
  sources: [stigmaSource1, stigmaSource2, stigmaSource3],
  heroImage: stigmaHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
    { kind: "content", section: "guides", slug: "aion-2-dps-meter-guide" },
    { kind: "content", section: "guides", slug: "post-patch-class-tier-list-august-2026" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "SKILL SYSTEM GUIDE", title: "Aion 2 Stigma System Guide: Skill Slots, Presets & Class Customization",
      description: "The Stigma system is Aion 2's skill customization mechanic — 5 Stigma slots, one new skill per class, and mastery presets. How it works and how to optimize your build.",
      intro: "The Stigma system is Aion 2's answer to skill customization — a class-agnostic mechanic that lets you slot extra skills into dedicated Stigma slots, changing how your class plays. With 5 Stigma slots unlocked as you level, a dedicated new skill per class, and the Skill-Mastery preset system, understanding Stigmas is essential to optimizing your build.",
      sourceNote: "Based on AION2Hub's March 25 update (5 Stigma slots) and January 7 update (Skill-Mastery & presets), plus NCSoft's official KR notice board.",
      keywords: ["Aion 2 Stigma system", "Aion 2 skill slots", "Aion 2 class customization", "Aion 2 Stigma presets", "Aion 2 skill mastery"],
      sections: [
        section("what", "What Is the Stigma System?", ["Stigmas are special skill slots that unlock as you level — the first slot opens at level 10, and by the level cap you have 5 slots. Each Stigma slot can hold a skill that modifies or adds to your class's base abilities, functioning as a customizable skill-loadout system.", "The March 2026 update added a new Stigma skill for each class alongside the 5-slot expansion, substantially increasing the number of viable builds. Before that, the system had fewer slots and fewer options."]),
        section("mastery", "Skill-Mastery & Presets", ["The January 2026 update introduced Skill-Mastery and Stigma presets — the ability to save and swap between complete Stigma loadouts. This is especially useful for players who switch between PvE and PvP content, as different encounters demand different skill setups.", "Presets dramatically reduce the cost of experimentation: you can build a dedicated PvE Stigma page, a PvP page, and a hybrid page, then swap freely without manually re-slotting each skill."]),
        section("strategies", "Build Strategies", ["For PvE, prioritize Stigmas that boost your core rotation — damage increases, cooldown reductions, and resource generation. The trinity roles (Tank/DPS/Healer) each have Stigmas that reinforce their primary function.", "For PvP, Stigmas that add mobility, crowd control, or survivability are more valuable than raw damage increases. The preset system makes it practical to maintain two completely different builds for the same class."]),
        section("global", "What Global Players Should Expect", ["The Stigma system is a core part of Aion 2's class identity and is expected to be available at the global launch. The 5-slot system and Skill-Mastery are foundational mechanics that NCSoft has been iterating on since early 2026.", "For global launch, the Stigma system will likely ship with the same 5-slot setup and the Skill-Mastery preset system. Plan to experiment with presets as soon as you unlock the second slot — the flexibility is one of the strongest features of the system."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "技能系统指南", title: "Aion 2 圣痕系统指南：技能插槽、预设与职业自定义",
      description: "圣痕系统是 Aion 2 的技能自定义机制——5 个圣痕插槽、每职业一个新技能、以及精通预设。运作方式与如何优化构筑。",
      intro: "圣痕系统是 Aion 2 的技能自定义方案——一个跨职业机制，让你将额外技能装入专用圣痕插槽，改变职业的玩法方式。随着升级解锁 5 个圣痕插槽、每职业一个专属新技能以及技能精通预设系统，理解圣痕对优化构筑至关重要。",
      sourceNote: "基于 AION2Hub 3 月 25 日更新（5 圣痕插槽）与 1 月 7 日更新（技能精通与预设），以及 NCSoft 官方韩服公告。",
      keywords: ["Aion 2 圣痕系统", "Aion 2 技能插槽", "Aion 2 职业自定义", "Aion 2 圣痕预设", "Aion 2 技能精通"],
      sections: [
        section("what", "什么是圣痕系统？", ["圣痕是随升级解锁的特殊技能插槽——第一个插槽在 10 级开启，到等级上限时共有 5 个插槽。每个圣痕插槽可容纳一个修改或增强职业基础能力的技能，作为可自定义的技能装载系统运作。", "2026 年 3 月更新为每个职业添加了一个新的圣痕技能并扩展至 5 个插槽，大幅增加了可行构筑的数量。"]),
        section("mastery", "技能精通与预设", ["2026 年 1 月更新引入了技能精通与圣痕预设——保存和切换完整圣痕装载的能力。这对在 PvE 与 PvP 内容之间切换的玩家特别有用，因为不同战斗需要不同的技能设置。", "预设大幅降低了实验成本：你可以构建专用的 PvE 圣痕页、PvP 页与混合页，然后自由切换，无需手动重新配置每个技能。"]),
        section("strategies", "构筑策略", ["PvE 优先选择增强核心循环的圣痕——伤害提升、冷却缩减与资源生成。三角角色（坦克/输出/治疗）各有强化其主功能的圣痕。", "PvP 中，增加机动性、群体控制或生存能力的圣痕比纯粹伤害提升更有价值。预设系统使同职业维护两个完全不同的构筑变得可行。"]),
        section("global", "全球玩家的预期", ["圣痕系统是 Aion 2 职业身份的核心部分，预计将在全球上线时提供。5 插槽系统与技能精通是 NCSoft 自 2026 年初以来一直在迭代的基础机制。", "全球上线时，圣痕系统可能以相同的 5 插槽设置与技能精通预设系统推出。计划在解锁第二个插槽后立即尝试预设——灵活性是该系统最强的特性之一。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "스킬 시스템 가이드", title: "Aion 2 스티그마 시스템 가이드: 스킬 슬롯, 프리셋과 클래스 커스터마이징",
      description: "스티그마 시스템은 Aion 2의 스킬 커스터마이징 메커니즘입니다 — 5개 스티그마 슬롯, 클래스별 신규 스킬, 마스터리 프리셋. 작동 방식과 빌드 최적화 방법.",
      intro: "스티그마 시스템은 Aion 2의 스킬 커스터마이징 솔루션입니다 — 클래스에 구애받지 않는 메커니즘으로 전용 스티그마 슬롯에 추가 스킬을 장착해 클래스의 플레이 방식을 변경합니다.",
      sourceNote: "AION2Hub의 3월 25일·1월 7일 업데이트 노트와 NCSoft 공식 KR 공지에 기반합니다.",
      keywords: ["Aion 2 스티그마 시스템", "Aion 2 스킬 슬롯", "Aion 2 클래스 커스터마이징", "Aion 2 스티그마 프리셋", "Aion 2 스킬 마스터리"],
      sections: [
        section("what", "스티그마 시스템이란?", ["레벨업 시 해금되는 특수 스킬 슬롯입니다. 첫 슬롯은 10레벨에 열리며, 최대 5개의 슬롯을 보유합니다.", "2026년 3월 업데이트로 각 클래스에 신규 스티그마 스킬이 추가되고 슬롯이 5개로 확장되었습니다."]),
        section("mastery", "스킬 마스터리와 프리셋", ["2026년 1월 업데이트로 스킬 마스터리와 스티그마 프리셋이 도입되어 완전한 스티그마 로드아웃을 저장·전환할 수 있습니다."]),
        section("strategies", "빌드 전략", ["PvE: 핵심 로테이션 강화 스티그마 우선. PvP: 기동성, 군중 제어, 생존력 스티그마 선호."]),
        section("global", "글로벌 플레이어의 기대", ["스티그마 시스템은 글로벌 출시 시 제공될 핵심 시스템입니다. 5슬롯 설정과 프리셋 시스템을 기대하세요."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "スキルシステムガイド", title: "Aion 2 スティグマシステムガイド：スキルスロット、プリセットとクラスカスタマイズ",
      description: "スティグマシステムは Aion 2 のスキルカスタマイズ機構です — 5つのスティグマスロット、クラスごとに新スキル、マスタリープリセット。仕組みとビルド最適化。",
      intro: "スティグマシステムは Aion 2 のスキルカスタマイズソリューションです — 専用スティグマスロットに追加スキルを装備してクラスのプレイスタイルを変更します。",
      sourceNote: "AION2Hub の3月25日・1月7日アップデートノートと NCSoft 公式 KR 掲示板に基づきます。",
      keywords: ["Aion 2 スティグマシステム", "Aion 2 スキルスロット", "Aion 2 クラスカスタマイズ", "Aion 2 スティグマプリセット", "Aion 2 スキルマスタリー"],
      sections: [
        section("what", "スティグマシステムとは？", ["レベルアップで解放される特殊スキルスロット。最初のスロットはレベル10で開放され、最大5スロットまで拡張。", "2026年3月アップデートで各クラスに新スティグマスキルと5スロット拡張が追加されました。"]),
        section("mastery", "スキルマスタリーとプリセット", ["2026年1月アップデートでスキルマスタリーとスティグマプリセットが導入され、ロードアウトの保存・切り替えが可能に。"]),
        section("strategies", "ビルド戦略", ["PvE: コアローテーション強化スティグマ優先。PvP: 機動性、群衆制御、生存スティグマを重視。"]),
        section("global", "グローバルプレイヤーの期待", ["スティグマシステムはグローバルローンチ時提供予定の核システムです。5スロット設定とプリセットシステムを期待してください。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE SYSTÈME DE COMPÉTENCES", title: "Guide du système Stigma d'Aion 2 : emplacements, préréglages et personnalisation de classe",
      description: "Le système Stigma est la mécanique de personnalisation des compétences d'Aion 2. 5 emplacements, une compétence par classe et des préréglages de maîtrise.",
      intro: "Le système Stigma permet de personnaliser les compétences via des emplacements dédiés, avec 5 slots et des préréglages de maîtrise.",
      sourceNote: "Basé sur les notes de patch AION2Hub des 25 mars et 7 janvier, et l'avis officiel NCSoft KR.",
      keywords: ["Aion 2 système Stigma", "Aion 2 emplacements de compétences", "Aion 2 personnalisation de classe"],
      sections: [
        section("what", "Le système Stigma", ["5 emplacements débloqués avec le niveau, 1 compétence par classe. Personnalisation du chargement de compétences."]),
        section("mastery", "Maîtrise et préréglages", ["Préréglages pour sauvegarder des configurations complètes, utiles pour basculer entre PvE et PvP."]),
        section("strategies", "Stratégies", ["PvE : priorité aux Stigmas renforçant la rotation. PvP : mobilité, contrôle de foule, survie."]),
        section("global", "Pour les joueurs globaux", ["Système attendu au lancement mondial avec 5 emplacements et préréglages."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "FERTIGKEITSSYSTEM-GUIDE", title: "Aion 2 Stigma-System-Guide: Skill-Slots, Presets & Klassenanpassung",
      description: "Das Stigma-System ist Aion 2s Mechanik zur Skill-Anpassung. 5 Slots, ein neuer Skill pro Klasse und Meisterschafts-Presets.",
      intro: "Das Stigma-System ermöglicht die Anpassung von Fertigkeiten über spezielle Slots mit 5 Slots und Meisterschafts-Presets.",
      sourceNote: "Basierend auf AION2Hub-Patchnotes vom 25. März und 7. Januar sowie der offiziellen NCSoft-KR-Mitteilung.",
      keywords: ["Aion 2 Stigma-System", "Aion 2 Skill-Slots", "Aion 2 Klassenanpassung"],
      sections: [
        section("what", "Das Stigma-System", ["5 Slots, die mit dem Level freigeschaltet werden, 1 Skill pro Klasse. Anpassung des Skill-Loadouts."]),
        section("mastery", "Meisterschaft und Presets", ["Presets zum Speichern kompletter Konfigurationen, nützlich für Wechsel zwischen PvE und PvP."]),
        section("strategies", "Strategien", ["PvE: Stigmas priorisieren, die die Rotation verstärken. PvP: Mobilität, Crowd-Control, Überlebensfähigkeit."]),
        section("global", "Für Global-Spieler", ["System wird beim globalen Launch erwartet mit 5 Slots und Presets."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DEL SISTEMA DE HABILIDADES", title: "Guía del sistema Stigma de Aion 2: espacios, preajustes y personalización de clase",
      description: "El sistema Stigma es la mecánica de personalización de habilidades de Aion 2. 5 espacios, una habilidad por clase y preajustes de maestría.",
      intro: "El sistema Stigma permite personalizar habilidades mediante espacios dedicados, con 5 espacios y preajustes de maestría.",
      sourceNote: "Basado en las notas de parche de AION2Hub del 25 de marzo y 7 de enero, y el aviso oficial de NCSoft KR.",
      keywords: ["Aion 2 sistema Stigma", "Aion 2 espacios de habilidad", "Aion 2 personalización de clase"],
      sections: [
        section("what", "El sistema Stigma", ["5 espacios desbloqueados con nivel, 1 habilidad por clase. Personalización de la carga de habilidades."]),
        section("mastery", "Maestría y preajustes", ["Preajustes para guardar configuraciones completas, útiles para cambiar entre PvE y PvP."]),
        section("strategies", "Estrategias", ["PvE: prioridad a Stigmas que refuercen la rotación. PvP: movilidad, control de masas, supervivencia."]),
        section("global", "Para jugadores globales", ["Sistema esperado en el lanzamiento mundial con 5 espacios y preajustes."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DO SISTEMA DE HABILIDADES", title: "Guia do sistema Stigma de Aion 2: slots, predefinições e personalização de classe",
      description: "O sistema Stigma é o mecanismo de personalização de habilidades de Aion 2. 5 slots, uma habilidade por classe e predefinições de maestria.",
      intro: "O sistema Stigma permite personalizar habilidades através de slots dedicados, com 5 slots e predefinições de maestria.",
      sourceNote: "Baseado nas notas de patch da AION2Hub de 25 de março e 7 de janeiro, e no aviso oficial da NCSoft KR.",
      keywords: ["Aion 2 sistema Stigma", "Aion 2 slots de habilidade", "Aion 2 personalização de classe"],
      sections: [
        section("what", "O sistema Stigma", ["5 slots desbloqueados com nível, 1 habilidade por classe. Personalização do loadout de habilidades."]),
        section("mastery", "Maestria e predefinições", ["Predefinições para salvar configurações completas, úteis para alternar entre PvE e PvP."]),
        section("strategies", "Estratégias", ["PvE: prioridade a Stigmas que reforcem a rotação. PvP: mobilidade, controle de multidão, sobrevivência."]),
        section("global", "Para jogadores globais", ["Sistema esperado no lançamento global com 5 slots e predefinições."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ГАЙД ПО СИСТЕМЕ НАВЫКОВ", title: "Гайд по системе Stigma в Aion 2: слоты, пресеты и кастомизация класса",
      description: "Система Stigma — механика кастомизации навыков в Aion 2. 5 слотов, один навык на класс и пресеты мастерства.",
      intro: "Система Stigma позволяет настраивать навыки через специальные слоты, с 5 слотами и пресетами мастерства.",
      sourceNote: "На основе патч-ноутов AION2Hub от 25 марта и 7 января, а также официального уведомления NCSoft KR.",
      keywords: ["Aion 2 система Stigma", "Aion 2 слоты навыков", "Aion 2 кастомизация класса"],
      sections: [
        section("what", "Система Stigma", ["5 слотов, открываемых с уровнем, 1 навык на класс. Кастомизация загрузки навыков."]),
        section("mastery", "Мастерство и пресеты", ["Пресеты для сохранения полных конфигураций, полезны для переключения между PvE и PvP."]),
        section("strategies", "Стратегии", ["PvE: приоритет Stigma, усиливающих ротацию. PvP: мобильность, контроль толпы, выживаемость."]),
        section("global", "Глобальным игрокам", ["Система ожидается при глобальном запуске с 5 слотами и пресетами."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "技能系統指南", title: "Aion 2 烙印系統指南：技能插槽、預設與職業自訂",
      description: "烙印系統是 Aion 2 的技能自訂機制——5 個烙印插槽、每職業一個新技能、以及精通預設。運作方式與如何優化構築。",
      intro: "烙印系統是 Aion 2 的技能自訂方案——一個跨職業機制，讓你將額外技能裝入專用烙印插槽，改變職業的遊玩方式。隨著升級解鎖 5 個烙印插槽、每職業一個專屬新技能以及技能精通預設系統，理解烙印對優化構築至關重要。",
      sourceNote: "基於 AION2Hub 3 月 25 日更新（5 烙印插槽）與 1 月 7 日更新（技能精通與預設），以及 NCSoft 官方韓服公告。",
      keywords: ["Aion 2 烙印系統", "Aion 2 技能插槽", "Aion 2 職業自訂", "Aion 2 烙印預設", "Aion 2 技能精通"],
      sections: [
        section("what", "什麼是烙印系統？", ["烙印是隨升級解鎖的特殊技能插槽——第一個插槽在 10 級開啟，到等級上限時共有 5 個插槽。每個烙印插槽可容納一個修改或增強職業基礎能力的技能，作為可自訂的技能裝載系統運作。", "2026 年 3 月更新為每個職業添加了一個新的烙印技能並擴展至 5 個插槽，大幅增加了可行構築的數量。"]),
        section("mastery", "技能精通與預設", ["2026 年 1 月更新引入了技能精通與烙印預設——保存和切換完整烙印裝載的能力。這對在 PvE 與 PvP 內容之間切換的玩家特別有用。", "預設大幅降低了實驗成本：你可以構建專用的 PvE 烙印頁、PvP 頁與混合頁，然後自由切換，無需手動重新配置每個技能。"]),
        section("strategies", "構築策略", ["PvE 優先選擇增強核心循環的烙印——傷害提升、冷卻縮減與資源生成。", "PvP 中，增加機動性、群體控制或生存能力的烙印比純粹傷害提升更有價值。"]),
        section("global", "全球玩家的預期", ["烙印系統是 Aion 2 職業身份的核心部分，預計將在全球上線時提供。5 插槽系統與技能精通是基礎機制。", "計劃在解鎖第二個插槽後立即嘗試預設——靈活性是該系統最強的特性之一。"]),
      ],
    }),
  },
};