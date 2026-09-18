import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-19-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 3 — Daeva Pass / Battle Pass guide */

const passSource1: ContentSource = {
  id: "aion2hub-pass-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Updates — Daeva Pass & Kwairing Premium (May-June 2026)",
  url: "https://aion2hub.com/updates", publishedAt: "2026-06-17", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — Daeva Pass 与 Kwairing Premium（2026年5-6月）", en: "AION 2 Updates — Daeva Pass & Kwairing Premium (May-June 2026)", fr: "AION 2 Mises à jour — Daeva Pass et Kwairing Premium (mai-juin 2026)", de: "AION 2 Updates — Daeva Pass & Kwairing Premium (Mai-Juni 2026)", es: "AION 2 Actualizaciones — Daeva Pass y Kwairing Premium (mayo-junio 2026)", ja: "AION 2 アップデート — Daeva Pass と Kwairing Premium（2026年5月-6月）", "pt-br": "AION 2 Atualizações — Daeva Pass e Kwairing Premium (maio-junho 2026)", ru: "AION 2 Обновления — Daeva Pass и Kwairing Premium (май-июнь 2026)", ko: "AION 2 업데이트 — 데바 패스 & 콰이어링 프리미엄 (2026년 5월-6월)", "zh-hant": "AION 2 更新 — Daeva Pass 與 Kwairing Premium（2026年5-6月）", }, "https://aion2hub.com/updates"),
};
const passSource2: ContentSource = {
  id: "aion2hub-pass-may-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — May 6, 2026: Daeva Pass 'Alturadon's Horn'",
  url: "https://aion2hub.com/updates", publishedAt: "2026-05-06", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2 更新 — 2026年5月6日：Daeva Pass「Alturadon之角」", en: "AION 2 Update — May 6, 2026: Daeva Pass 'Alturadon's Horn'", fr: "AION 2 Mise à jour — 6 mai 2026 : Daeva Pass « Corne d'Alturadon »", de: "AION 2 Update — 6. Mai 2026: Daeva Pass 'Alturadons Horn'", es: "AION 2 Actualización — 6 de mayo de 2026: Daeva Pass 'Cuerno de Alturadon'", ja: "AION 2 アップデート — 2026年5月6日：Daeva Pass「アルトラドンの角」", "pt-br": "AION 2 Atualização — 6 de maio de 2026: Daeva Pass 'Chifre de Alturadon'", ru: "AION 2 Обновление — 6 мая 2026: Daeva Pass «Рог Алтурадона»", ko: "AION 2 업데이트 — 2026년 5월 6일: 데바 패스 '알투라돈의 뿔'", "zh-hant": "AION 2 更新 — 2026年5月6日：Daeva Pass「Alturadon之角」", }, "https://aion2hub.com/updates"),
};
const passSource3: ContentSource = {
  id: "plaync-pass-2026-08-19", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 데바 패스 & 멤버십 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-05-06", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— Daeva Pass 与会员说明", en: "AION 2 (KR) — Daeva Pass & Membership Guide", fr: "AION 2 (KR) — Guide du Daeva Pass et de l'adhésion", de: "AION 2 (KR) — Daeva-Pass- & Mitgliedschafts-Guide", es: "AION 2 (KR) — Guía del Daeva Pass y la membresía", ja: "AION 2 (KR) — Daeva Pass & メンバーシップガイド", "pt-br": "AION 2 (KR) — Guia do Daeva Pass e assinatura", ru: "AION 2 (KR) — Гайд по Daeva Pass и подписке", ko: "AION 2 (KR) — 데바 패스 & 멤버십 안내", "zh-hant": "AION 2（韓服）— Daeva Pass 與會員說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const passHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "Daeva Pass 指南配图", caption: "NC 官方配图；Daeva Pass 提供任务、奖励与会员合并的 Kwairing Premium。" }, en: { alt: "Daeva Pass guide image", caption: "Official NC artwork; the Daeva Pass offers quests, rewards, and the consolidated Kwairing Premium membership." }, fr: { alt: "Image du guide Daeva Pass", caption: "Visuel officiel NC ; le Daeva Pass propose des quêtes, récompenses et l'abonnement Kwairing Premium." }, de: { alt: "Daeva-Pass-Guide-Bild", caption: "Offizielles NC-Artwork; der Daeva Pass bietet Quests, Belohnungen und die konsolidierte Kwairing Premium-Mitgliedschaft." }, es: { alt: "Imagen de la guía del Daeva Pass", caption: "Arte oficial de NC; el Daeva Pass ofrece misiones, recompensas y la membresía Kwairing Premium." }, ja: { alt: "Daeva Pass ガイド画像", caption: "NC公式アートワーク；Daeva Pass はクエスト、報酬、統合された Kwairing Premium メンバーシップを提供します。" }, "pt-br": { alt: "Imagem do guia do Daeva Pass", caption: "Arte oficial da NC; o Daeva Pass oferece missões, recompensas e a assinatura Kwairing Premium." }, ru: { alt: "Изображение гайда Daeva Pass", caption: "Официальный арт NC; Daeva Pass предлагает квесты, награды и объединённое членство Kwairing Premium." }, ko: { alt: "데바 패스 가이드 이미지", caption: "NC 공식 이미지입니다. 데바 패스는 퀘스트, 보상, 통합된 콰이어링 프리미엄 멤버십을 제공합니다." }, "zh-hant": { alt: "Daeva Pass 指南配圖", caption: "NC 官方配圖；Daeva Pass 提供任務、獎勵與會員合併的 Kwairing Premium。" }, },
};

export const trendingAugust19Article3: ContentEntry = {
  section: "guides", slug: "aion-2-daeva-pass-guide", schemaType: "Article",
  publishedAt: "2026-08-19", updatedAt: "2026-08-19", readingMinutes: 5,
  publication: publishedVerified,
  sources: [passSource1, passSource2, passSource3],
  heroImage: passHero,
  related: [
    { kind: "content", section: "news", slug: "aion-2-founders-packs-30-day-membership" },
    { kind: "content", section: "guides", slug: "aion-2-brokerage-market-guide" },
    { kind: "content", section: "guides", slug: "aion-2-leveling-guide-1-50" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "BATTLE PASS GUIDE", title: "Aion 2 Daeva Pass Guide: Season Pass, Kwairing Premium & Rewards",
      description: "Aion 2's Daeva Pass is its battle pass system — quests, mission rewards, and the Kwairing Premium membership. How it works, what each tier offers, and what global players should expect.",
      intro: "The Daeva Pass is Aion 2's seasonal battle pass system, offering a structured track of quests and rewards over a set period. It was consolidated into the Kwairing Premium membership in June 2026, which unified the membership tiers. This guide explains how the Daeva Pass works, what the different tiers offer, and what the global launch version may look like.",
      sourceNote: "Based on AION2Hub's patch notes for May 6 (Daeva Pass 'Alturadon's Horn') and June 17 (Kwairing Premium consolidation), plus NCSoft's official KR notice board.",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 battle pass", "Aion 2 Kwairing Premium", "Aion 2 membership", "Aion 2 season pass"],
      sections: [
        section("what", "What Is the Daeva Pass?", ["The Daeva Pass is a seasonal battle pass with a free track and a premium track. Players complete missions and earn Odd Energy to progress through tiers, unlocking cosmetic items, consumables, currency, and progression materials.", "Each season has a theme — for example, the 'Alturadon's Horn' Pass launched in May 2026. The pass runs for a set duration, after which a new season begins."]),
        section("membership", "Kwairing Premium & Membership", ["In June 2026, memberships were consolidated into Kwairing Premium — a single subscription tier that bundles the Daeva Pass premium track, broker access, and other subscriber benefits. The 30-day Membership included in Founder's Packs (as of August 2026) is the Kwairing Premium tier.", "Membership unlocks: access to the in-game market (brokerage), Quna-to-Kinah exchange, exclusive member-only cash shop items, and the premium Daeva Pass track."]),
        section("tiers", "Free vs Premium Track", ["The free track is available to all players and includes basic rewards — consumables, modest currency bundles, and cosmetic items. The premium track (requires Kwairing Premium or a Daeva Pass token) adds higher-value rewards, including exclusive cosmetics, rare upgrade materials, and larger currency bundles.", "The premium track's value proposition is efficiency: it roughly doubles the total reward value for completing the same missions, which is standard for MMO battle passes."]),
        section("global", "What Global Players Should Expect", ["NCSoft's global monetization plan confirmed a Quna-based shop economy with exchange systems, and the Daeva Pass is expected to launch with the global version. The September 30 early access will likely include the first season pass for global players.", "Founder's Pack purchases include 30 days of Membership (Kwairing Premium), which covers the premium Daeva Pass track — so if you buy a Founder's Pack, your first season pass is effectively included."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "战斗通行证指南", title: "Aion 2 Daeva Pass 指南：赛季通行证、Kwairing Premium 与奖励",
      description: "Aion 2 的 Daeva Pass 是其战斗通行证系统——任务、使命奖励与 Kwairing Premium 会员资格。运作方式、各层级内容及全球玩家预期。",
      intro: "Daeva Pass 是 Aion 2 的赛季战斗通行证系统，在固定周期内提供结构化的任务与奖励轨道。2026 年 6 月合并为 Kwairing Premium 会员资格，统一了会员层级。本指南解释 Daeva Pass 的运作方式、不同层级提供的内容，以及全球上线版的可能形态。",
      sourceNote: "基于 AION2Hub 5 月 6 日（Daeva Pass「Alturadon 之角」）及 6 月 17 日（Kwairing Premium 合并）补丁说明，以及 NCSoft 官方韩服公告。",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 战斗通行证", "Aion 2 Kwairing Premium", "Aion 2 会员", "Aion 2 赛季通行证"],
      sections: [
        section("what", "什么是 Daeva Pass？", ["Daeva Pass 是赛季战斗通行证，包含免费轨道与高级轨道。玩家完成任务获取 Odd Energy 以推进层级，解锁外观、消耗品、货币与养成材料。", "每个赛季有主题——例如 2026 年 5 月启动的「Alturadon 之角」通行证。通行证在固定周期内运行，结束后新赛季开始。"]),
        section("membership", "Kwairing Premium 与会员", ["2026 年 6 月，会员合并为 Kwairing Premium——一个统一订阅层级，捆绑 Daeva Pass 高级轨道、拍卖行访问与其他订阅者福利。创始人包含的 30 天会员（2026 年 8 月起）即为 Kwairing Premium 层级。", "会员解锁：访问游戏内市场（拍卖行）、Quna 转基纳兑换、会员专属商城物品，以及 Daeva Pass 高级轨道。"]),
        section("tiers", "免费与高级轨道", ["免费轨道对所有玩家开放，包含基础奖励——消耗品、适度货币包与外观。高级轨道（需 Kwairing Premium 或 Daeva Pass 代币）增加更高价值奖励，包括专属外观、稀有升级材料与更大货币包。", "高级轨道的价值主张是效率：完成相同任务的总奖励价值约翻倍，这是 MMO 战斗通行证的标准设计。"]),
        section("global", "全球玩家的预期", ["NCSoft 的全球货币化计划确认了基于 Quna 的商城经济与兑换系统，Daeva Pass 预计随全球版上线。9 月 30 日抢先体验可能会包含全球玩家的首个赛季通行证。", "创始人包购买包含 30 天会员（Kwairing Premium），覆盖 Daeva Pass 高级轨道——因此如果你购买创始人包，首个赛季通行证实际上已包含在内。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "배틀 패스 가이드", title: "Aion 2 데바 패스 가이드: 시즌 패스, 콰이어링 프리미엄과 보상",
      description: "Aion 2의 데바 패스는 배틀 패스 시스템입니다 — 퀘스트, 미션 보상, 콰이어링 프리미엄 멤버십. 작동 방식, 각 티어 혜택, 글로벌 플레이어의 기대치를 소개합니다.",
      intro: "데바 패스는 Aion 2의 시즌 배틀 패스 시스템으로, 정해진 기간 동안 구조화된 퀘스트와 보상 트랙을 제공합니다. 2026년 6월 콰이어링 프리미엄 멤버십으로 통합되었습니다.",
      sourceNote: "AION2Hub의 5월 6일·6월 17일 패치 노트와 NCSoft 공식 KR 공지에 기반합니다.",
      keywords: ["Aion 2 데바 패스", "Aion 2 배틀 패스", "Aion 2 콰이어링 프리미엄", "Aion 2 멤버십", "Aion 2 시즌 패스"],
      sections: [
        section("what", "데바 패스란?", ["시즌 배틀 패스로 무료 트랙과 프리미엄 트랙이 있습니다. 미션 완료로 Odd Energy를 획득해 티어를 진행합니다.", "각 시즌은 테마가 있습니다 — 예: 2026년 5월 출시된 '알투라돈의 뿔' 패스."]),
        section("membership", "콰이어링 프리미엄과 멤버십", ["2026년 6월 멤버십이 콰이어링 프리미엄으로 통합되었습니다. 파운더스 팩의 30일 멤버십이 이 등급입니다.", "멤버십 혜택: 경매장 접근, Quna-Kinah 환전, 전용 캐시샵 아이템, 프리미엄 데바 패스 트랙."]),
        section("tiers", "무료 vs 프리미엄 트랙", ["무료 트랙은 기본 보상(소모품, 소량 화폐, 외형)을 제공합니다. 프리미엄 트랙은 전용 외형, 희귀 강화 재료, 대량 화폐 등 더 높은 가치의 보상을 추가합니다."]),
        section("global", "글로벌 플레이어의 기대", ["글로벌 출시와 함께 데바 패스가 제공될 것으로 예상됩니다. 파운더스 팩을 구매하면 첫 시즌 패스가 사실상 포함됩니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "バトルパスガイド", title: "Aion 2 Daeva Pass ガイド：シーズンパス、Kwairing Premium と報酬",
      description: "Aion 2 の Daeva Pass はバトルパスシステムです — クエスト、ミッション報酬、Kwairing Premium メンバーシップ。仕組み、各ティアの内容、グローバルプレイヤーの期待値を解説します。",
      intro: "Daeva Pass は Aion 2 のシーズンバトルパスシステムで、期間限定のクエストと報酬トラックを提供します。2026年6月に Kwairing Premium メンバーシップへ統合されました。",
      sourceNote: "AION2Hub の5月6日・6月17日パッチノートと NCSoft 公式 KR 掲示板に基づきます。",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 バトルパス", "Aion 2 Kwairing Premium", "Aion 2 メンバーシップ", "Aion 2 シーズンパス"],
      sections: [
        section("what", "Daeva Pass とは？", ["シーズンバトルパスで、無料トラックとプレミアムトラックがあります。ミッション完了で Odd Energy を獲得してティアを進めます。", "各シーズンにテーマがあります — 例：2026年5月開始の「アルトラドンの角」パス。"]),
        section("membership", "Kwairing Premium とメンバーシップ", ["2026年6月にメンバーシップが Kwairing Premium へ統合されました。ファウンダーズパックの30日メンバーシップがこのティアです。"]),
        section("tiers", "無料 vs プレミアムトラック", ["無料トラックは基本報酬を提供。プレミアムトラックは専用スキン、レア強化素材、大容量通貨を追加します。"]),
        section("global", "グローバルプレイヤーの期待", ["グローバルローンチとともに Daeva Pass が提供される見込み。ファウンダーズパック購入で最初のシーズンパスが実質的に含まれます。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE PASSE DE COMBAT", title: "Guide du Daeva Pass d'Aion 2 : pass de saison, Kwairing Premium et récompenses",
      description: "Le Daeva Pass d'Aion 2 est son système de passe de combat. Missions, récompenses et abonnement Kwairing Premium.",
      intro: "Le Daeva Pass est le passe de combat saisonnier d'Aion 2, consolidé en juin 2026 dans l'abonnement Kwairing Premium.",
      sourceNote: "Basé sur les notes de patch AION2Hub des 6 mai et 17 juin, et l'avis officiel NCSoft KR.",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 passe de combat", "Aion 2 Kwairing Premium", "Aion 2 adhésion"],
      sections: [
        section("what", "Le Daeva Pass", ["Passe de combat saisonnier : quêtes, récompenses, piste gratuite et premium. Chaque saison a un thème."]),
        section("membership", "Kwairing Premium", ["Abonnement unique regroupant le pass premium, l'accès au courtage et d'autres avantages. Inclus dans les packs Fondateur."]),
        section("tiers", "Pistes gratuite et premium", ["Gratuite : récompenses de base. Premium : récompenses de valeur plus élevée, cosmétiques exclusifs."]),
        section("global", "Pour les joueurs globaux", ["Attendu avec le lancement mondial. L'achat d'un pack Fondateur inclut la première saison."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "BATTLE-PASS-GUIDE", title: "Aion 2 Daeva-Pass-Guide: Saisonpass, Kwairing Premium & Belohnungen",
      description: "Der Daeva-Pass ist Aion 2s Battle-Pass-System. Quests, Belohnungen und die Kwairing Premium-Mitgliedschaft.",
      intro: "Der Daeva-Pass ist Aion 2s saisonaler Battle Pass, der im Juni 2026 in die Kwairing Premium-Mitgliedschaft integriert wurde.",
      sourceNote: "Basierend auf AION2Hub-Patchnotes vom 6. Mai und 17. Juni sowie der offiziellen NCSoft-KR-Mitteilung.",
      keywords: ["Aion 2 Daeva-Pass", "Aion 2 Battle Pass", "Aion 2 Kwairing Premium", "Aion 2 Mitgliedschaft"],
      sections: [
        section("what", "Der Daeva-Pass", ["Saisonaler Battle Pass: Quests, Belohnungen, kostenlose und Premium-Strecke. Jede Saison hat ein Thema."]),
        section("membership", "Kwairing Premium", ["Einheitliche Mitgliedschaft, die Premium-Pass, Brokerzugang und weitere Vorteile bündelt. In Founder's Packs enthalten."]),
        section("tiers", "Kostenlose vs. Premium-Strecke", ["Kostenlos: Basisbelohnungen. Premium: höherwertige Belohnungen, exklusive Kosmetika."]),
        section("global", "Für Global-Spieler", ["Wird mit dem globalen Launch erwartet. Der Kauf eines Founder's Packs schließt die erste Saison ein."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DEL PASO DE BATALLA", title: "Guía del Daeva Pass de Aion 2: pase de temporada, Kwairing Premium y recompensas",
      description: "El Daeva Pass de Aion 2 es su sistema de pase de batalla. Misiones, recompensas y suscripción Kwairing Premium.",
      intro: "El Daeva Pass es el pase de batalla estacional de Aion 2, consolidado en junio de 2026 en la suscripción Kwairing Premium.",
      sourceNote: "Basado en las notas de parche de AION2Hub del 6 de mayo y 17 de junio, y el aviso oficial de NCSoft KR.",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 pase de batalla", "Aion 2 Kwairing Premium", "Aion 2 membresía"],
      sections: [
        section("what", "El Daeva Pass", ["Pase de batalla estacional: misiones, recompensas, pista gratuita y premium. Cada temporada tiene un tema."]),
        section("membership", "Kwairing Premium", ["Suscripción única que agrupa el pase premium, acceso al corretaje y más ventajas. Incluido en los paquetes de fundador."]),
        section("tiers", "Pistas gratuita y premium", ["Gratuita: recompensas básicas. Premium: recompensas de mayor valor, cosméticos exclusivos."]),
        section("global", "Para jugadores globales", ["Esperado con el lanzamiento mundial. La compra de un paquete de fundador incluye la primera temporada."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DO PASSE DE BATALHA", title: "Guia do Daeva Pass de Aion 2: passe de temporada, Kwairing Premium e recompensas",
      description: "O Daeva Pass de Aion 2 é seu sistema de passe de batalha. Missões, recompensas e assinatura Kwairing Premium.",
      intro: "O Daeva Pass é o passe de batalha sazonal de Aion 2, consolidado em junho de 2026 na assinatura Kwairing Premium.",
      sourceNote: "Baseado nas notas de patch da AION2Hub de 6 de maio e 17 de junho, e no aviso oficial da NCSoft KR.",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 passe de batalha", "Aion 2 Kwairing Premium", "Aion 2 assinatura"],
      sections: [
        section("what", "O Daeva Pass", ["Passe de batalha sazonal: missões, recompensas, trilha gratuita e premium. Cada temporada tem um tema."]),
        section("membership", "Kwairing Premium", ["Assinatura única que agrupa o passe premium, acesso à corretagem e mais benefícios. Incluso nos pacotes de fundador."]),
        section("tiers", "Trilhas gratuita e premium", ["Gratuita: recompensas básicas. Premium: recompensas de maior valor, cosméticos exclusivos."]),
        section("global", "Para jogadores globais", ["Esperado com o lançamento global. A compra de um pacote de fundador inclui a primeira temporada."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ГАЙД ПО БОЕВОМУ ПРОПУСКУ", title: "Гайд по Daeva Pass в Aion 2: сезонный пропуск, Kwairing Premium и награды",
      description: "Daeva Pass — система боевого пропуска Aion 2. Квесты, награды и подписка Kwairing Premium.",
      intro: "Daeva Pass — сезонный боевой пропуск Aion 2, объединённый в июне 2026 года в подписку Kwairing Premium.",
      sourceNote: "На основе патч-ноутов AION2Hub от 6 мая и 17 июня, а также официального уведомления NCSoft KR.",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 боевой пропуск", "Aion 2 Kwairing Premium", "Aion 2 подписка"],
      sections: [
        section("what", "Daeva Pass", ["Сезонный боевой пропуск: квесты, награды, бесплатный и премиум-треки. Каждый сезон имеет тему."]),
        section("membership", "Kwairing Premium", ["Единая подписка, объединяющая премиум-пропуск, доступ к брокеражу и прочие бонусы. Включена в наборы основателя."]),
        section("tiers", "Бесплатный и премиум-трек", ["Бесплатный: базовые награды. Премиум: ценные награды, эксклюзивные косметические предметы."]),
        section("global", "Глобальным игрокам", ["Ожидается с глобальным запуском. Покупка набора основателя включает первый сезон."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "戰鬥通行證指南", title: "Aion 2 Daeva Pass 指南：賽季通行證、Kwairing Premium 與獎勵",
      description: "Aion 2 的 Daeva Pass 是其戰鬥通行證系統——任務、使命獎勵與 Kwairing Premium 會員資格。運作方式、各層級內容及全球玩家預期。",
      intro: "Daeva Pass 是 Aion 2 的賽季戰鬥通行證系統，在固定週期內提供結構化的任務與獎勵軌道。2026 年 6 月合併為 Kwairing Premium 會員資格，統一了會員層級。本指南解釋 Daeva Pass 的運作方式、不同層級提供的內容，以及全球上線版的可能形態。",
      sourceNote: "基於 AION2Hub 5 月 6 日（Daeva Pass「Alturadon 之角」）及 6 月 17 日（Kwairing Premium 合併）補丁說明，以及 NCSoft 官方韓服公告。",
      keywords: ["Aion 2 Daeva Pass", "Aion 2 戰鬥通行證", "Aion 2 Kwairing Premium", "Aion 2 會員", "Aion 2 賽季通行證"],
      sections: [
        section("what", "什麼是 Daeva Pass？", ["Daeva Pass 是賽季戰鬥通行證，包含免費軌道與高級軌道。玩家完成任務獲取 Odd Energy 以推進層級，解鎖外觀、消耗品、貨幣與養成材料。", "每個賽季有主題——例如 2026 年 5 月啟動的「Alturadon 之角」通行證。通行證在固定週期內運行，結束後新賽季開始。"]),
        section("membership", "Kwairing Premium 與會員", ["2026 年 6 月，會員合併為 Kwairing Premium——一個統一訂閱層級，捆綁 Daeva Pass 高級軌道、拍賣行訪問與其他訂閱者福利。創始人包含的 30 天會員（2026 年 8 月起）即為 Kwairing Premium 層級。", "會員解鎖：訪問遊戲內市場（拍賣行）、Quna 轉基納兌換、會員專屬商城物品，以及 Daeva Pass 高級軌道。"]),
        section("tiers", "免費與高級軌道", ["免費軌道對所有玩家開放，包含基礎獎勵——消耗品、適度貨幣包與外觀。高級軌道（需 Kwairing Premium 或 Daeva Pass 代幣）增加更高價值獎勵，包括專屬外觀、稀有升級材料與更大貨幣包。", "高級軌道的價值主張是效率：完成相同任務的總獎勵價值約翻倍，這是 MMO 戰鬥通行證的標準設計。"]),
        section("global", "全球玩家的預期", ["NCSoft 的全球貨幣化計畫確認了基於 Quna 的商城經濟與兌換系統，Daeva Pass 預計隨全球版上線。9 月 30 日搶先體驗可能會包含全球玩家的首個賽季通行證。", "創始人包購買包含 30 天會員（Kwairing Premium），覆蓋 Daeva Pass 高級軌道——因此如果你購買創始人包，首個賽季通行證實際上已包含在內。"]),
      ],
    }),
  },
};