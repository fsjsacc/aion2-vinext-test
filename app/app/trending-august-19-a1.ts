import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-19-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 1 — Leveling guide 1-50 */

const levelSource1: ContentSource = {
  id: "aion2hub-chapter1-2026-08-19", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Update — July 1, 2026: Chapter 1 Launch (Level Cap 50, Brawler Class)",
  url: "https://aion2hub.com/updates", publishedAt: "2026-07-01", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({
    "zh-hans": "AION 2 更新 — 2026年7月1日：第一章上线（等级上限50、Brawler职业）", en: "AION 2 Update — July 1, 2026: Chapter 1 Launch (Level Cap 50, Brawler Class)",
    fr: "AION 2 Mise à jour — 1er juillet 2026 : lancement du chapitre 1 (cap niveau 50, classe Brawler)",
    de: "AION 2 Update — 1. Juli 2026: Kapitel-1-Start (Stufenlimit 50, Brawler-Klasse)",
    es: "AION 2 Actualización — 1 de julio de 2026: lanzamiento del capítulo 1 (límite de nivel 50, clase Brawler)",
    ja: "AION 2 アップデート — 2026年7月1日：第1章ローンチ（レベル上限50、Brawlerクラス）",
    "pt-br": "AION 2 Atualização — 1º de julho de 2026: lançamento do capítulo 1 (limite de nível 50, classe Brawler)",
    ru: "AION 2 Обновление — 1 июля 2026: запуск главы 1 (макс. уровень 50, класс Brawler)",
    ko: "AION 2 업데이트 — 2026년 7월 1일: 챕터 1 출시 (레벨 상한 50, 브롤러 클래스)",
    "zh-hant": "AION 2 更新 — 2026年7月1日：第一章上線（等級上限50、Brawler職業）",
  }, "https://aion2hub.com/updates"),
};
const levelSource2: ContentSource = {
  id: "mmobomb-dev-stream-2026-08-19", kind: "third-party", publisher: "MMOBomb",
  label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
  url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream",
  publishedAt: "2026-08-10", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({
    "zh-hans": "NC 首次全球开发者直播：Aion 2 玩家可期待什么", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
    fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre du lancement", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können",
    es: "NC comparte lo que los jugadores de Aion 2 pueden esperar en el lanzamiento", ja: "NCが初のグローバル開発者ストリームでAion 2プレイヤーが発売時に期待できることを共有",
    "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar no lançamento", ru: "NC делится тем, что игроки Aion 2 могут ожидать от запуска",
    ko: "NC, 첫 글로벌 개발자 스트림에서 Aion 2 플레이어가 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 首次全球開發者直播：Aion 2 玩家可期待什麼",
  }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"),
};
const levelSource3: ContentSource = {
  id: "plaync-chapter1-2026-08-19", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 챕터 1 '모래와 서리의 땅' 업데이트 안내",
  url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-19", verifiedAt: "2026-08-19",
  localizations: localizations({
    "zh-hans": "AION 2（韩服）— 第一章「沙与霜之地」更新说明", en: "AION 2 (KR) — Chapter 1 'Land of Sand and Frost' Update Notice",
    fr: "AION 2 (KR) — Avis de mise à jour du chapitre 1 « Terre de sable et de givre »", de: "AION 2 (KR) — Update-Hinweis zu Kapitel 1 'Land aus Sand und Frost'",
    es: "AION 2 (KR) — Aviso de actualización del capítulo 1 'Tierra de arena y escarcha'", ja: "AION 2 (KR) — 第1章「砂と氷の地」アップデートのお知らせ",
    "pt-br": "AION 2 (KR) — Aviso de atualização do capítulo 1 'Terra de Areia e Gelo'", ru: "AION 2 (KR) — Уведомление об обновлении главы 1 «Земля песка и мороза»",
    ko: "AION 2 (KR) — 챕터 1 '모래와 서리의 땅' 업데이트 안내", "zh-hant": "AION 2（韓服）— 第一章「沙與霜之地」更新說明",
  }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const levelHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "升级指南配图", caption: "NC 官方配图；第一章将等级上限提升至 50，引入艾尔特内与莫尔海姆区域。" },
    en: { alt: "Leveling guide image", caption: "Official NC artwork; Chapter 1 raised the level cap to 50 with the Eltnen and Morheim regions." },
    fr: { alt: "Image du guide de nivellement", caption: "Visuel officiel NC ; le chapitre 1 a porté le cap de niveau à 50 avec les régions d'Eltnen et Morheim." },
    de: { alt: "Leveling-Guide-Bild", caption: "Offizielles NC-Artwork; Kapitel 1 hob das Stufenlimit auf 50 mit den Regionen Eltnen und Morheim an." },
    es: { alt: "Imagen de la guía de subida de nivel", caption: "Arte oficial de NC; el capítulo 1 elevó el límite de nivel a 50 con las regiones Eltnen y Morheim." },
    ja: { alt: "レベル上げガイド画像", caption: "NC公式アートワーク；第1章でレベル上限が50に引き上げられ、エルトネンとモルヘイム地域が追加されました。" },
    "pt-br": { alt: "Imagem do guia de leveling", caption: "Arte oficial da NC; o capítulo 1 elevou o limite de nível para 50 com as regiões Eltnen e Morheim." },
    ru: { alt: "Изображение гайда по прокачке", caption: "Официальный арт NC; глава 1 подняла лимит уровня до 50 с регионами Эльтнен и Морхейм." },
    ko: { alt: "레벨링 가이드 이미지", caption: "NC 공식 이미지입니다. 챕터 1에서 레벨 상한이 50으로 확장되고 엘트넨과 모르하임 지역이 추가되었습니다." },
    "zh-hant": { alt: "升級指南配圖", caption: "NC 官方配圖；第一章將等級上限提升至 50，引入艾爾特內與莫爾海姆區域。" },
  },
};

export const trendingAugust19Article1: ContentEntry = {
  section: "guides", slug: "aion-2-leveling-guide-1-50", schemaType: "Article",
  publishedAt: "2026-08-19", updatedAt: "2026-08-19", readingMinutes: 6,
  publication: publishedVerified,
  sources: [levelSource1, levelSource2, levelSource3],
  heroImage: levelHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
    { kind: "content", section: "guides", slug: "chapter-1-content-guide-global" },
    { kind: "content", section: "guides", slug: "global-launch-dungeon-raid-size-changes" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "LEVELING GUIDE", title: "Aion 2 Leveling Guide: How to Reach Level 50 Fast (Chapter 1)",
      description: "Aion 2's Chapter 1 caps at level 50 with two new regions — Eltnen and Morheim. Here's the fastest path from 1 to 50, key milestone rewards, and what to do when you hit the cap.",
      intro: "Leveling in Aion 2 follows the classic MMO path: quest through zones, pick up campaign milestones, and supplement with dungeons and grinding. With Chapter 1 setting the level cap at 50 and introducing the Eltnen and Morheim regions, this guide maps the fastest route, key unlocks at each stage, and what to prioritize at the endgame.",
      sourceNote: "Based on AION2Hub's Chapter 1 update notes and NCSoft's official KR notice board. Leveling mechanics reflect the latest confirmed state of the Korean service.",
      keywords: ["Aion 2 leveling guide", "Aion 2 level 50", "Aion 2 fastest leveling", "Aion 2 Eltnen", "Aion 2 Chapter 1 leveling"],
      sections: [
        section("early", "Levels 1-10: The Starting Zones", ["New characters start in the tutorial area and follow a short campaign chain that introduces core mechanics: movement, combat, equipment, and the first Stigma slot. Following the main questline here is the fastest route — side quests give minimal extra XP.", "By level 10 you gain access to your class's first specialization choice and the ability to queue for the earliest expeditions. Completing the starting zone's campaign unlocks the path to the next region."]),
        section("mid", "Levels 11-30: Eltnen & Morheim", ["The mid-leveling phase splits by faction — Elyos level in Eltnen, Asmodians in Morheim. Both regions are vast open zones with a dense web of quests. Running the campaign quests alongside zone-specific side quests (when they are on the way) is the most time-efficient path.", "This is also where the first expeditions become available. Running them once per day provides a meaningful XP boost that supplements the questing route. The pet system unlocks at level 3, so your auto-loot companion is available from the very start of this phase."]),
        section("late", "Levels 31-50: The Endgame Zones", ["The final stretch from 31 to 50 is where the pace slows and grinding becomes more efficient. Campaign quests remain the backbone, but between quest hubs, farming open-world mobs with good density and respawn rates yields steady XP per hour.", "By level 45, the Brawler class unlock (if you are playing one) and the next tier of expeditions open up. The Abyss surface layer also becomes accessible — a PvPvE zone that offers XP alongside combat rewards."]),
        section("cap", "What to Do at Level 50", ["Hitting 50 unlocks the full endgame loop: expeditions (5-player), the Abyss, and the first steps toward the Inheritance system. The first priority is gearing up through expeditions and the Citadel of the Fallen Daeva expedition.", "After that, the progression branches into PvP (battlegrounds, Abyss Rift Zone) and PvE (higher difficulty expeditions, Transcendence). The level cap is a starting line, not a finish line — Chapter 1 content is designed to keep you busy for months."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "升级指南", title: "Aion 2 升级指南：如何快速达到 50 级（第一章）",
      description: "Aion 2 第一章以 50 级为上限，包含艾尔特内与莫尔海姆两个新区域。以下是 1 至 50 级的最快路线、关键里程碑奖励及满级后做什么。",
      intro: "Aion 2 的升级遵循经典 MMO 路径：通过区域任务推进、完成战役里程碑、辅以副本与刷怪。第一章将等级上限设为 50 并引入艾尔特内与莫尔海姆区域，本指南绘制最快路线、各阶段关键解锁及满级后优先事项。",
      sourceNote: "基于 AION2Hub 第一章更新说明与 NCSoft 官方韩服公告。升级机制反映韩服最新确认状态。",
      keywords: ["Aion 2 升级指南", "Aion 2 50 级", "Aion 2 快速升级", "Aion 2 艾尔特内", "Aion 2 第一章升级"],
      sections: [
        section("early", "1-10 级：起始区域", ["新角色从教程区域开始，跟随短战役链，介绍核心机制：移动、战斗、装备与第一个圣痕槽位。跟随主线任务链是最快的选择——支线任务额外经验很少。", "10 级时解锁职业的第一个专精选择与早期远征排队。完成起始区域战役可解锁通往下一区域的道路。"]),
        section("mid", "11-30 级：艾尔特内与莫尔海姆", ["中期升级按阵营分流——天族在艾尔特内升级，魔族在莫尔海姆。两个区域都是广阔开放世界，拥有密集的任务网络。沿路完成战役任务与区域支线任务是最省时间的路径。", "这也是首批远征开放的阶段。每日一次远征提供有意义的经验加成，补充任务路线。宠物系统在 3 级解锁，因此自动拾取伙伴在此阶段一开始即可使用。"]),
        section("late", "31-50 级：后期区域", ["31 至 50 级的最后冲刺是节奏变慢、刷怪变得更高效的阶段。战役任务仍是骨架，但在任务枢纽之间，在密度和刷新率良好的开放世界刷怪可获得稳定的每小时经验。", "45 级时解锁 Brawler 职业（若选择该职业）与下一阶段远征。深渊地面层也在此开放——一个提供经验与战斗奖励的 PvPvE 区域。"]),
        section("cap", "50 级后做什么", ["达到 50 级解锁完整后期循环：远征（5 人）、深渊，以及走向继承系统的第一步。首要目标是通过远征与「堕落 Daeva 之城」远征获取装备。", "之后，发展方向分为 PvP（战场、深渊裂隙地带）与 PvE（更高难度远征、超越）。等级上限是起跑线而非终点线——第一章内容设计足以让你忙碌数月。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "레벨링 가이드", title: "Aion 2 레벨링 가이드: 50레벨까지 빠르게 도달하는 방법 (챕터 1)",
      description: "Aion 2 챕터 1의 레벨 상한은 50이며 엘트넨과 모르하임 두 신규 지역이 추가되었습니다. 1에서 50까지의 최단 루트, 주요 이정표 보상, 만렙 후 할 일을 소개합니다.",
      intro: "Aion 2의 레벨링은 클래식 MMO 경로를 따릅니다: 지역 퀘스트 진행, 캠페인 이정표 달성, 던전과 사냥으로 보충. 챕터 1이 레벨 상한을 50으로 설정하고 엘트넨과 모르하임 지역을 도입한 가운데, 이 가이드는 최단 루트, 각 단계의 주요 해금, 만렙 이후 우선순위를 안내합니다.",
      sourceNote: "AION2Hub의 챕터 1 업데이트 노트와 NCSoft 공식 KR 공지 게시판에 기반합니다.",
      keywords: ["Aion 2 레벨링 가이드", "Aion 2 50레벨", "Aion 2 빠른 레벨업", "Aion 2 엘트넨", "Aion 2 챕터 1 레벨링"],
      sections: [
        section("early", "1-10레벨: 시작 지역", ["새 캐릭터는 튜토리얼 지역에서 시작해 이동, 전투, 장비, 첫 스티그마 슬롯 등 핵심 메커니즘을 소개하는 짧은 캠페인을 따릅니다. 메인 퀘스트라인을 따르는 것이 가장 빠릅니다.", "10레벨에 직업의 첫 전문화 선택과 초기 원정대 대기열이 해금됩니다."]),
        section("mid", "11-30레벨: 엘트넨과 모르하임", ["중반 레벨링은 진영으로 나뉩니다 — 엘리오스는 엘트넨, 아스모디안은 모르하임에서 레벨업합니다. 두 지역 모두 넓은 오픈존에 조밀한 퀘스트망이 있습니다.", "첫 원정대도 이 시기에 열립니다. 하루 한 번 원정대를 도는 것은 의미 있는 경험치 부스트를 제공합니다. 펫 시스템은 레벨 3에서 해금됩니다."]),
        section("late", "31-50레벨: 후반 지역", ["31에서 50까지는 속도가 느려지고 사냥이 더 효율적인 구간입니다. 캠페인 퀘스트가 중추이지만, 밀도와 리젠이 좋은 필드 사냥도 시간당 안정적인 경험치를 제공합니다.", "45레벨에 브롤러 클래스 해금(해당 직업 시)과 다음 단계 원정대가 열립니다. 심연 표면층도 접근 가능해집니다."]),
        section("cap", "50레벨 이후 할 일", ["만렙 50은 엔드게임 루프를 해금합니다: 원정대(5인), 심연, 상속 시스템으로의 첫 걸음. 첫 번째 우선순위는 원정대와 타락한 Daeva의 성채 원정대를 통한 장비입니다.", "그 후 PvP(전장, 심연 균열 지대)와 PvE(고난이도 원정대, 초월)로 분기합니다. 레벨 상한은 결승선이 아닌 출발선입니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "レベル上げガイド", title: "Aion 2 レベル上げガイド：レベル50への最短ルート（第1章）",
      description: "Aion 2 第1章のレベル上限は50で、エルトネンとモルハイムの2地域が追加されました。1から50までの最短ルート、主要マイルストーン報酬、カンスト後の行動を紹介します。",
      intro: "Aion 2 のレベル上げは、クラシックMMOの道筋をたどります：地域クエストの進行、キャンペーンマイルストーンの達成、ダンジョンと狩りでの補完。第1章がレベル上限50を設定し、エルトネンとモルハイム地域を導入した中、このガイドは最短ルート、各段階の主要アンロック、カンスト後の優先事項を案内します。",
      sourceNote: "AION2Hub の第1章アップデートノートと NCSoft 公式 KR 掲示板に基づきます。",
      keywords: ["Aion 2 レベル上げガイド", "Aion 2 レベル50", "Aion 2 最速レベル上げ", "Aion 2 エルトネン", "Aion 2 第1章レベル上げ"],
      sections: [
        section("early", "1-10レベル：開始地域", ["新キャラクターはチュートリアル地域から始まり、移動、戦闘、装備、最初のスティグマスロットなどの中核メカニクスを紹介する短いキャンペーンを進みます。メインクエストラインを追うのが最速です。", "レベル10でクラスの最初の専門化選択と初期遠征のキューがアンロックされます。"]),
        section("mid", "11-30レベル：エルトネンとモルハイム", ["中盤のレベル上げは陣営で分かれます—エリオスはエルトネン、アスモディアンはモルハイムでレベルアップします。両地域とも広大なオープンゾーンに密なクエスト網があります。", "最初の遠征もこの時期に開放されます。1日1回の遠征は有意義な経験値ブーストを提供します。ペットシステムはレベル3でアンロックされます。"]),
        section("late", "31-50レベル：後半地域", ["31から50まではペースが落ち、狩りがより効率的になる区間です。キャンペーンクエストが中核ですが、密度とリスポンが良いフィールド狩りも時間あたり安定した経験値を提供します。", "レベル45でブラーラークラス（該当職の場合）と次の段階の遠征が開放されます。深淵地表層もアクセス可能になります。"]),
        section("cap", "レベル50後にすること", ["カンスト50はエンドゲームループをアンロックします：遠征（5人）、深淵、継承システムへの第一歩。最優先は遠征と「堕ちたDaevaの城塞」遠征による装備集めです。", "その後、PvP（戦場、深淵リフトゾーン）とPvE（高難易度遠征、トランセンデンス）に分岐します。レベル上限はゴールではなくスタートラインです。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE DE NIVEAU", title: "Guide de nivellement Aion 2 : atteindre le niveau 50 rapidement (chapitre 1)",
      description: "Le chapitre 1 d'Aion 2 plafonne au niveau 50 avec Eltnen et Morheim. Le chemin le plus rapide de 1 à 50, les récompenses clés et l'après-50.",
      intro: "Le nivellement dans Aion 2 suit le chemin MMO classique : quêtes, campagnes, donjons. Le chapitre 1 fixe le cap à 50 avec les régions Eltnen et Morheim.",
      sourceNote: "Basé sur les notes d'AION2Hub et l'avis officiel NCSoft KR.",
      keywords: ["Aion 2 nivellement", "Aion 2 niveau 50", "Aion 2 Eltnen", "Aion 2 guide chapitre 1"],
      sections: [
        section("early", "Niveaux 1-10", ["Suivez la quête principale dans la zone de départ. Au niveau 10, débloquez la spécialisation de classe et les premières expéditions."]),
        section("mid", "Niveaux 11-30", ["Eltnen (Elyos) ou Morheim (Asmodiens). Quêtes de campagne avec expéditions quotidiennes. Le système d'animaux est débloqué au niveau 3."]),
        section("late", "Niveaux 31-50", ["Le rythme ralentit. Alternez quêtes et farming. Niveau 45 : classe Brawler et surface de l'Abîme."]),
        section("cap", "Au niveau 50", ["Équipement via expéditions, puis PvP (champs de bataille) ou PvE (difficulté supérieure, transcendance)."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "LEVELING-GUIDE", title: "Aion 2 Leveling-Guide: Stufe 50 erreichen (Kapitel 1)",
      description: "Kapitel 1 von Aion 2 hat ein Stufenlimit von 50 mit Eltnen und Morheim. Der schnellste Weg von 1 bis 50, die wichtigsten Meilensteine und was nach Stufe 50 kommt.",
      intro: "Leveling in Aion 2 folgt dem klassischen MMO-Pfad: Quests, Kampagnen, Dungeons. Kapitel 1 setzt das Limit auf 50 mit den Regionen Eltnen und Morheim.",
      sourceNote: "Basierend auf AION2Hub-Notizen und der offiziellen NCSoft-KR-Mitteilung.",
      keywords: ["Aion 2 Leveling", "Aion 2 Stufe 50", "Aion 2 Eltnen", "Aion 2 Kapitel 1 Guide"],
      sections: [
        section("early", "Stufe 1-10", ["Folgen Sie der Hauptquest. Auf Stufe 10: erste Klassenspezialisierung und Expeditionen."]),
        section("mid", "Stufe 11-30", ["Eltnen (Elyos) oder Morheim (Asmodier). Kampagnenquests + tägliche Expeditionen. Haustier-System ab Stufe 3."]),
        section("late", "Stufe 31-50", ["Das Tempo verlangsamt sich. Quests und Farming wechseln. Stufe 45: Brawler-Klasse und Abgrund-Oberfläche."]),
        section("cap", "Nach Stufe 50", ["Ausrüstung über Expeditionen, dann PvP (Schlachtfelder) oder PvE (höhere Schwierigkeit, Transzendenz)."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE NIVEL", title: "Guía de subida de nivel de Aion 2: alcanza el nivel 50 rápido (capítulo 1)",
      description: "El capítulo 1 de Aion 2 tiene un límite de nivel 50 con Eltnen y Morheim. La ruta más rápida de 1 a 50, hitos clave y qué hacer al llegar al máximo.",
      intro: "La subida de nivel en Aion 2 sigue el camino MMO clásico: misiones, campañas, mazmorras. El capítulo 1 fija el límite en 50 con las regiones Eltnen y Morheim.",
      sourceNote: "Basado en las notas de AION2Hub y el aviso oficial de NCSoft KR.",
      keywords: ["Aion 2 subida de nivel", "Aion 2 nivel 50", "Aion 2 Eltnen", "Aion 2 guía capítulo 1"],
      sections: [
        section("early", "Niveles 1-10", ["Sigue la misión principal. En nivel 10: especialización de clase y primeras expediciones."]),
        section("mid", "Niveles 11-30", ["Eltnen (Elyos) o Morheim (Asmodianos). Misiones de campaña + expediciones diarias. Mascotas desde nivel 3."]),
        section("late", "Niveles 31-50", ["El ritmo se ralentiza. Alterna misiones y farming. Nivel 45: clase Brawler y superficie del Abismo."]),
        section("cap", "Al nivel 50", ["Equipo vía expediciones, luego PvP (campos de batalla) o PvE (dificultad superior, trascendencia)."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE LEVELING", title: "Guia de leveling de Aion 2: alcance o nível 50 rápido (capítulo 1)",
      description: "O capítulo 1 de Aion 2 tem limite de nível 50 com Eltnen e Morheim. A rota mais rápida de 1 a 50, marcos importantes e o que fazer no nível máximo.",
      intro: "O leveling em Aion 2 segue o caminho MMO clássico: missões, campanhas, masmorras. O capítulo 1 fixa o limite em 50 com as regiões Eltnen e Morheim.",
      sourceNote: "Baseado nas notas da AION2Hub e no aviso oficial da NCSoft KR.",
      keywords: ["Aion 2 leveling", "Aion 2 nível 50", "Aion 2 Eltnen", "Aion 2 guia capítulo 1"],
      sections: [
        section("early", "Níveis 1-10", ["Siga a missão principal. No nível 10: especialização de classe e primeiras expedições."]),
        section("mid", "Níveis 11-30", ["Eltnen (Elyos) ou Morheim (Asmodianos). Missões de campanha + expedições diárias. Pets desde o nível 3."]),
        section("late", "Níveis 31-50", ["O ritmo diminui. Alterne missões e farming. Nível 45: classe Brawler e superfície do Abismo."]),
        section("cap", "No nível 50", ["Equipamento via expedições, depois PvP (campos de batalha) ou PvE (dificuldade superior, transcendência)."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ГАЙД ПО ПРОКАЧКЕ", title: "Гайд по прокачке Aion 2: быстро достичь 50 уровня (глава 1)",
      description: "Глава 1 Aion 2 имеет лимит 50 уровня с Эльтненом и Морхеймом. Быстрейший путь от 1 до 50, ключевые вехи и что делать на максимуме.",
      intro: "Прокачка в Aion 2 следует классическому MMO-пути: квесты, кампании, подземелья. Глава 1 устанавливает лимит в 50 с регионами Эльтнен и Морхейм.",
      sourceNote: "На основе записей AION2Hub и официального уведомления NCSoft KR.",
      keywords: ["Aion 2 прокачка", "Aion 2 50 уровень", "Aion 2 Эльтнен", "Aion 2 гайд глава 1"],
      sections: [
        section("early", "Уровни 1-10", ["Следуйте главному квесту. На 10 уровне: специализация класса и первые экспедиции."]),
        section("mid", "Уровни 11-30", ["Эльтнен (Элиос) или Морхейм (Асмодиане). Квесты кампании + ежедневные экспедиции. Питомцы с 3 уровня."]),
        section("late", "Уровни 31-50", ["Темп замедляется. Чередуйте квесты и фарм. 45 уровень: класс Brawler и поверхность Бездны."]),
        section("cap", "На 50 уровне", ["Экипировка через экспедиции, затем PvP (поля сражений) или PvE (высокая сложность, трансценденция)."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "升級指南", title: "Aion 2 升級指南：如何快速達到 50 級（第一章）",
      description: "Aion 2 第一章以 50 級為上限，包含艾爾特內與莫爾海姆兩個新區域。以下是 1 至 50 級的最快路線、關鍵里程碑獎勵及滿級後做什麼。",
      intro: "Aion 2 的升級遵循經典 MMO 路徑：通過區域任務推進、完成戰役里程碑、輔以副本與刷怪。第一章將等級上限設為 50 並引入艾爾特內與莫爾海姆區域，本指南繪製最快路線、各階段關鍵解鎖及滿級後優先事項。",
      sourceNote: "基於 AION2Hub 第一章更新說明與 NCSoft 官方韓服公告。升級機制反映韓服最新確認狀態。",
      keywords: ["Aion 2 升級指南", "Aion 2 50 級", "Aion 2 快速升級", "Aion 2 艾爾特內", "Aion 2 第一章升級"],
      sections: [
        section("early", "1-10 級：起始區域", ["新角色從教學區域開始，跟隨短戰役鏈，介紹核心機制：移動、戰鬥、裝備與第一個烙印插槽。跟隨主線任務鏈是最快的選擇——支線任務額外經驗很少。", "10 級時解鎖職業的第一個專精選擇與早期遠征排隊。完成起始區域戰役可解鎖通往下一區域的道路。"]),
        section("mid", "11-30 級：艾爾特內與莫爾海姆", ["中期升級按陣營分流——天族在艾爾特內升級，魔族在莫爾海姆。兩個區域都是廣闊開放世界，擁有密集的任務網絡。沿路完成戰役任務與區域支線任務是最省時間的路徑。", "這也是首批遠征開放的階段。每日一次遠征提供有意義的經驗加成，補充任務路線。寵物系統在 3 級解鎖，因此自動拾取夥伴在此階段一開始即可使用。"]),
        section("late", "31-50 級：後期區域", ["31 至 50 級的最後衝刺是節奏變慢、刷怪變得更高效的階段。戰役任務仍是骨架，但在任務樞紐之間，在密度和重生率良好的開放世界刷怪可獲得穩定的每小時經驗。", "45 級時解鎖 Brawler 職業（若選擇該職業）與下一階段遠征。深淵地面層也在此開放——一個提供經驗與戰鬥獎勵的 PvPvE 區域。"]),
        section("cap", "50 級後做什麼", ["達到 50 級解鎖完整後期循環：遠征（5 人）、深淵，以及走向繼承系統的第一步。首要目標是透過遠征與「墮落 Daeva 之城」遠征獲取裝備。", "之後，發展方向分為 PvP（戰場、深淵裂隙地帶）與 PvE（更高難度遠征、超越）。等級上限是起跑線而非終點線——第一章內容設計足以讓你忙碌數月。"]),
      ],
    }),
  },
};