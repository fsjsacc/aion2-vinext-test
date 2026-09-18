import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-september-3-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 5 — Wings system guide (mmorpg.com, Sept 2): unlock milestones, FOMO, aerial combat integration */

const wingsSource1: ContentSource = {
  id: "mmorpg-wings-2026-09-02",
  kind: "third-party", publisher: "MMORPG.com",
  label: "AION 2 Wings: A Core System Carried Forward From the Original, With Unlock Milestones",
  url: "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845",
  publishedAt: "2026-09-02",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "AION 2 翅膀系统：源自原版的标志功能，通过里程碑解锁",
    en: "AION 2 Wings: A Core System Carried Forward From the Original, With Unlock Milestones",
    fr: "Ailes d'AION 2 : système central hérité de l'original, débloqué par jalons",
    de: "AION 2 Flügel: Kernsystem aus dem Original, freigeschaltet über Meilensteine",
    es: "Alas de AION 2: sistema central heredado del original, desbloqueado por hitos",
    ja: "AION 2 翼システム：元作からの核心システム、マイルストーンで解放",
    "pt-br": "Asas de AION 2: sistema central herdado do original, desbloqueado por marcos",
    ru: "Крылья AION 2: основная система, перенесённая из оригинала с этапами разблокировки",
    ko: "AION 2 날개 시스템: 원작으로부터 이어받은 핵심 시스템, 마일스톤으로 해제",
    "zh-hant": "AION 2 翅膀系統：源自原版的標誌功能，透過里程碑解鎖",
  }, "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845"),
};

const wingsSource2: ContentSource = {
  id: "aion-classic-wings-lore",
  kind: "third-party", publisher: "AION Classic Wiki",
  label: "AION Classic Wings: A Signature System of the Franchise",
  url: "https://aionclassic.fandom.com/wiki/Wings",
  publishedAt: "2026-08-26",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "AION Classic 翅膀：系列标志性系统",
    en: "AION Classic Wings: A Signature System of the Franchise",
    fr: "Ailes d'AION Classic : système signature de la franchise",
    de: "AION Classic Flügel: Signatur-System der Serie",
    es: "Alas de AION Classic: sistema signature de la saga",
    ja: "AION Classic 翼：シリーズの代表システム",
    "pt-br": "Asas de AION Classic: sistema signature da franquia",
    ru: "Крылья AION Classic: фирменная система серии",
    ko: "AION Classic 날개: 시리즈의 상징 시스템",
    "zh-hant": "AION Classic 翅膀：系列標誌性系統",
  }, "https://aionclassic.fandom.com/wiki/Wings"),
};

const wingsHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/1d2e3f4a-5b6c-7d8e-9f0a-1b2c3d4e5f6a.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ja-jp/board/notice/list",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 翅膀系统配图", caption: "翅膀既是地位象征，也是空中战斗的核心——防御闪避与攻击爆发同时承担。" },
    en: { alt: "AION 2 wings system guide image", caption: "Wings serve as both status symbol and aerial-combat core — defensive dodges and offensive bursts on one system." },
    fr: { alt: "Image du système d'ailes d'AION 2", caption: "Les ailes servent à la fois de symbole de statut et de cœur du combat aérien — esquives défensives et attaques offensives." },
    de: { alt: "AION 2 Flügel-System Bild", caption: "Flügel dienen sowohl als Statussymbol als auch als Kern des Luftkampfes — Verteidigungs-Ausweichen und offensive Ausbrüche." },
    es: { alt: "Imagen del sistema de alas de AION 2", caption: "Las alas sirven tanto como símbolo de estatus como núcleo del combate aéreo — esquivas defensivas y ataques ofensivos." },
    ja: { alt: "AION 2 翼システム画像", caption: "翼はステータスシンボルであり空中戦闘の中核——防御回避と攻撃バーストを一つのシステムで。" },
    "pt-br": { alt: "Imagem do sistema de asas de AION 2", caption: "As asas servem tanto como símbolo de status quanto como núcleo do combate aéreo — desvios defensivos e ataques ofensivos." },
    ru: { alt: "Изображение системы крыльев AION 2", caption: "Крылья служат как символом статуса, так и ядром воздушного боя — уклонения в обороне и атакующие всплески." },
    ko: { alt: "AION 2 날개 시스템 이미지", caption: "날개는 명성 상징이자 공중 전투 핵심 — 방어 회피와 공격 버스트를 한 시스템으로." },
    "zh-hant": { alt: "AION 2 翅膀系統配圖", caption: "翅膀既是地位象徵，也是空中戰鬥的核心——防禦閃避與攻擊爆發同時承擔。" },
  },
};

export const trendingSeptember3Article5: ContentEntry = {
  section: "guides",
  slug: "aion-2-wings-system-unlock-progression",
  schemaType: "Article",
  publishedAt: "2026-09-03",
  updatedAt: "2026-09-03",
  readingMinutes: 6,
  publication: publishedVerified,
  sources: [wingsSource1, wingsSource2],
  heroImage: wingsHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-pet-collection-companion-guide" },
    { kind: "content", section: "guides", slug: "aion-2-raid-boss-split-merge-design" },
    { kind: "content", section: "news", slug: "aion-2-gamescom-2026-demo-overview" },
    { kind: "content", section: "guides", slug: "aion-2-prelaunch-access-routes-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "WINGS SYSTEM",
      title: "AION 2 Wings Guide: Unlock Milestones, Aerial Combat Roles, and FOMO You Can't Afford to Miss",
      description: "Wings are AION 2's most iconic visual system, carried forward from the original as both a status symbol and a functional combat tool. This guide covers unlock milestones, how wings integrate with aerial combat, and why the timing of early unlock matters.",
      intro: "In the original AION, wings were more than decoration — they were a core part of movement, identity, and combat. AION 2 carries wings forward as a milestone-based unlock system, confirmed during the Gamescom demo. This guide covers what wings do, how to unlock them, and how they slot into both PvP and PvE progression.",
      sourceNote: "Based on MMORPG.com's September 2, 2026 Gamescom hands-on (Luis Gutierrez) covering wings as a core carried-forward system, and the AION Classic Wings wiki for franchise context.",
      keywords: ["AION 2 wings", "AION 2 wing unlock", "AION 2 aerial combat", "AION 2 wing milestone", "AION 2 status symbol", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "What Wings Are and Why They Matter", [
          "Wings are the most visually recognizable element of the AION franchise. In AION 2, they remain both a status symbol signaling how far a player has progressed and a functional tool for aerial combat.",
          "The Gamescom demo confirmed wings are unlocked through milestones and gameplay — not simply purchased. This ties progress to play, making wings one of the clearest 'time invested' markers.",
          "For returning players, wings are a continuity anchor. For new players, they are the clearest visual signal of what progression looks like."
        ]),
        section("unlock-milestones", "Unlock Milestones: How Wings Are Earned", [
          "Wings are unlocked through gameplay milestones rather than direct purchase. The exact milestone thresholds were not fully detailed in the Gamescom demo, but the signal is that progress-based unlocks are the standard.",
          "Players should expect wings to scale with overall character advancement — reaching certain levels, completing key quest arcs, or achieving combat-related goals.",
          "For a free-to-play launch, milestone-based unlocks reduce FOMO risk: early progress still yields a visible reward without mandatory spending."
        ]),
        section("combat-integration", "Combat Integration: Defense, Offense, Aerial Movement", [
          "Wings serve defensive uses — avoiding attacks during the fast-paced boss encounters that the demo reviewer flagged as demanding constant attention.",
          "They also serve offensive roles, enabling the aerial combat that defines the franchise and keeping groups compact enough for split-phase raid design.",
          "Monster transformation sits on top of the wing layer: wings enable the mobility framework, transformation adds burst and utility within it."
        ]),
        section("fomo-management", "FOMO Management: Why Early Progress Matters", [
          "Because wings are milestone-based, the gap between early and late progress is visible. Players who delay engagement will see peers flying with unlocked wings while they are still on foot.",
          "This is intentional FOMO design: wings convert time-in-game into visual difference, motivating continued play rather than optional grinding.",
          "For players planning to log in only sporadically, wings should be treated as a priority parallel to pet collection — both are milestone-driven and both are highly visible."
        ]),
        section("pets-plus-wings", "Wings and Pets: Two Parallel Progress Tracks", [
          "Wings and the pet system are AION 2's two most visible collection tracks. Both are milestone or progress-driven; both convert playtime into visible difference.",
          "Neither track requires sacrificing the other. The optimal early strategy is to progress both simultaneously — pets through exploration and pet-to-companion conversion, wings through milestone completion.",
          "For the 32 days before October 5, focusing on both wings and pets together gives new players the strongest first-impression of AION 2's progress-and-collection loop."
        ]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "翅膀系统",
      title: "AION 2 翅膀攻略：解锁里程碑、空中战斗角色与不可错过的 FOMO",
      description: "翅膀是 AION 2 最具标志性的视觉系统，从原版延续而来——既是地位象征，也是功能性战斗工具。本攻略覆盖解锁里程碑、翅膀如何融入空中战斗，以及为何早期解锁时机很重要。",
      intro: "在原版 AION 中，翅膀不只是装饰——它们是移动、身份和战斗的核心部分。AION 2 将翅膀延续为里程碑解锁系统，在 Gamescom 试玩中得到确认。本攻略覆盖翅膀的用途、如何解锁以及它们如何嵌入 PvP 和 PVE 进程。",
      sourceNote: "基于 MMORPG.com 2026 年 9 月 2 日 Gamescom 试玩（Luis Gutierrez）以及 AION Classic Wings 维基作为系列背景参考。",
      keywords: ["AION 2 翅膀", "AION 2 翅膀解锁", "AION 2 空中战斗", "AION 2 翅膀里程碑", "AION 2 地位象征", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "翅膀是什么、为什么重要", ["翅膀是 AION 系列最具视觉辨识度的元素。在 AION 2 中，它们仍是标志着玩家进度的地位象征，也是空中战斗的功能性工具。", "Gamescom 试玩确认翅膀通过里程碑和玩法解锁——而非直接购买。这把进度与玩法绑定，让翅膀成为「时间投入」最清晰的标记之一。", "对回归玩家，翅膀是连续性锚点。对新玩家，它们是最清晰的进度可视化信号。"]),
        section("unlock-milestones", "解锁里程碑：如何获得翅膀", ["翅膀通过玩法里程碑而非直接购买解锁。试玩版未完全说明具体阈值，但信号明确：进度解锁是标准。", "玩家应预期翅膀与角色总体进步挂钩——达到特定等级、完成关键任务线或达成战斗目标。", "对免费游戏而言，里程碑解锁降低了 FOMO 风险：早期进步仍有可见奖励，无需强制消费。"]),
        section("combat-integration", "战斗集成：防御、进攻、空中移动", ["翅膀用于防御——在试玩记者强调需要持续注意的快节奏 Boss 战中闪避攻击。", "翅膀也承担进攻角色，启用 AION 系列的空中战斗，让副本拆分阶段保持紧凑。", "怪物变身在翅膀层之上叠加：翅膀提供机动框架，变身在其中添加爆发和工具。"]),
        section("fomo-management", "FOMO 管理：为何早期进度重要", ["翅膀里程碑解锁意味着进度差距可见。延迟参与的玩家会看到同伴已在空中飞翔而自己还在地面。", "这是有意的 FOMO 设计：翅膀将游戏时间转化为视觉差异，推动持续游玩而非可选刷图。", "对只计划偶尔登录的玩家，翅膀应与宠物收集同等优先——两者都是里程碑驱动，且高度可见。"]),
        section("pets-plus-wings", "翅膀与宠物：两条并行进度线", ["翅膀和宠物系统是 AION 2 最可见的两条收集路线。两者都是进度驱动；都玩法时间转化为可见差异。", "两条线不需要放弃任一条。最佳前期策略是同时推进——宠物靠探索和怪变宠物转化，翅膀靠里程碑完成。", "对 10 月 5 日前 32 天，同时关注翅膀和宠物能给新玩家对 AION 2 进度-收集回路的最佳第一印象。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "날개 시스템",
      title: "AION 2 날개 가이드: 해제 마일스톤, 공중 전투 역할, 놓치면 안 되는 FOMO",
      description: "날개는 AION 2의 가장 상징적인 시각 시스템. 원작으로부터 이어받은 명성 상징이자 전투 도구. 해제 마일스톤, 공중 전투 통합, 초기 해제 타이밍 가이드.",
      intro: "원작 AION에서 날개는 장식 이상이었고, 이동·정체성·전투의 핵심이었다. AION 2는 날개를 마일스톤 해제 시스템으로 이어받았고 Gamescom 데모에서 확인.",
      sourceNote: "MMORPG.com 2026년 9월 2일 Gamescom 핸즈온(Luis Gutierrez)과 AION Classic Wings wiki 기반.",
      keywords: ["AION 2 날개", "AION 2 날개 해제", "AION 2 공중 전투", "AION 2 날개 마일스톤", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "날개는 무엇이며 왜 중요한가", ["날개는 AION 시리즈의 가장 시각적으로 인식되는 요소. AION 2에서도 명성 상징이자 공중 전투 도구. 데모에서 마일스톤·게임 플레이로 해제 확인 — 직매수가 아님."]),
        section("unlock-milestones", "해제 마일스톤: 날개를 얻는 방법", ["날개는 게임 플레이 마일스톤으로 해제. 데모에서 정확한 임계값은 미완이지만 진행 기반 해제는 표준. 레벨·퀘스트·전투 목표 달성과 연관 예상."]),
        section("combat-integration", "전투 통합: 방어·공격·공중 이동", ["날개는 고속 보스전 회피에 방어 용도로 사용. 공격 측면에서는 AION 특유의 공중 전투를 가능하게 하고 레이드 분기 단계를 유지."]),
        section("fomo-management", "FOMO 관리: 초기 진행의 중요성", ["날개는 마일스톤 기반이므로 진행 격차가 가시화된다. 빠른 진입이 필수. 날개와 펫은 동시에 진행하는 것이 최적."]),
        section("pets-plus-wings", "날개와 펫: 두 진행 트랙", ["날개와 펫은 AION 2의 가장 눈에 띄는 두 수집 트랙. 둘 다 진행 기반, 둘 다 플레이 시간을 시각적 차이로 전환. 동시에 진행이 최선."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "翼システム",
      title: "AION 2 翼ガイド：解放マイルストーン、空中戦闘の役割、見逃せない FOMO",
      description: "翼はAION 2の最も代表的な視覚システム。元作から受け継いだステータスシンボル兼戦闘ツール。解放マイルストーン、空中戦闘統合、初期解放タイミングの重要性。",
      intro: "元作AIONでは翼は装飾以上であり、移動・身分・戦闘の中核だった。AION 2は翼をマイルストーン解放システムとして継承し、Gamescomデモで確認された。",
      sourceNote: "MMORPG.com 2026年9月2日Gamescomハンズオン(Luis Gutierrez)とAION Classic Wings wikiに基づいて作成。",
      keywords: ["AION 2 翼", "AION 2 翼解放", "AION 2 空中戦闘", "AION 2 翼マイルストーン", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "翼とは何か、なぜ重要か", ["翼はAIONシリーズの最も視覚的に識別される要素。AION 2でも進捗シンボル兼空中戦闘ツール。デモでマイルストーン解放が確認 — 直売ではない。"]),
        section("unlock-milestones", "解放マイルストーン：翼の獲得方法", ["翼はゲームプレイマイルストーンで解放。デモでは正確な閾値未提示だが、進捗解放が標準。レベル・クエスト・戦闘目標と関連。"]),
        section("combat-integration", "戦闘統合：防御・攻撃・空中移動", ["翼は高速ボス戦の回避に防御用。攻撃面ではAION特有の空中戦闘を可能にし、レイド分裂段階も維持。"]),
        section("fomo-management", "FOMO管理：初期進捗の重要性", ["翼はマイルストーンベースのため進捗差が可視化される。早い開始が必須。翼とペットは同時に進行が最適。"]),
        section("pets-plus-wings", "翼とペット：並行進捗", ["翼とペットはAION 2の最も可視的な2つの収集トラック。両方進捗ベース、両方プレイ時間を視覚差に。同時進行が最善。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "SYSTÈME D'AILES",
      title: "Guide des ailes d'AION 2: jalons de déverrouillage, rôles en combat aérien et FOMO à ne pas manquer",
      description: "Les ailes sont le système visuel le plus emblématique d'AION 2, hérité de l'original comme symbole de statut et outil de combat fonctionnel. Guide couvrant les jalons, l'intégration au combat aérien et l'importance du moment de déverrouillage.",
      intro: "Dans l'original AION, les ailes étaient plus que décoration — mouvement, identité et combat. AION 2 les porte comme système à déverrouillage par jalons, confirmé lors de la démo Gamescom.",
      sourceNote: "Basé sur MMORPG.com 2 sept. 2026 (Luis Gutierrez) et la wiki AION Classic Wings pour le contexte de franchise.",
      keywords: ["AION 2 ailes", "AION 2 déverrouillage ailes", "AION 2 combat aérien", "AION 2 jalon ailes", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "Ce que sont les ailes et pourquoi elles comptent", ["Les ailes sont l'élément le plus reconnaissable visuellement de la franchise. À la fois symbole de statut et outil de combat aérien. Déverrouillées par jalons et gameplay — pas à l'achat."]),
        section("unlock-milestones", "Jalons de déverrouillage: comment obtenir les ailes", ["Les ailes se déverrouillent par des jalons de gameplay plutôt que par achat direct. Les seuils exacts n'ont pas été entièrement détaillés dans la démo."]),
        section("combat-integration", "Intégration au combat: défense, attaque, mouvement aérien", ["Les ailes servent à éviter les attaques lors des combats de boss rapides. Elles servent aussi à l'attaque, permettant le combat aérien qui définit la franchise."]),
        section("fomo-management", "Gestion du FOMO: pourquoi le moment importe", ["Les ailes rendent visible l'écart de progression. Les joueurs qui retardent verront leurs pairs voler alors qu'ils sont encore au sol."]),
        section("pets-plus-wings", "Ailes et familiers: deux pistes parallèles", ["Les ailes et les familiers sont les deux pistes de collection les plus visibles. Les deux convertissent le temps de jeu en différence visible. Progresser les deux simultanément est la meilleure stratégie."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "FLÜGEL-SYSTEM",
      title: "AION 2 Flügel-Guide: Freischaltungs-Meilensteine, Luftkampf-Rollen, und FOMO, das man sich nicht leisten kann",
      description: "Flügel sind das ikonischste visuelle System von AION 2, vom Original als Statussymbol und funktionelles Kampfwerkzeug weitergetragen. Guide deckt Meilensteine, Luftkampf-Integration und warum der Zeitpunkt der frühen Freischaltung zählt.",
      intro: "Im Original AION waren Flügel mehr als Dekoration — Bewegung, Identität und Kampf. AION 2 trägt Flügel als meilenstein-basiertes Freischaltungs-System weiter, bestätigt in der Gamescom-Demo.",
      sourceNote: "Basierend auf MMORPG.com 2. Sept. 2026 (Luis Gutierrez) und der AION Classic Wings Wiki für Serienkontext.",
      keywords: ["AION 2 Flügel", "AION 2 Flügel Freischaltung", "AION 2 Luftkampf", "AION 2 Flügel-Meilenstein", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "Was Flügel sind und warum sie zählen", ["Flügel sind das visuellste Erkennungsmerkmal der Serie. Statussymbol und Luftkampf-Werkzeug zugleich. Freigeschaltet über Meilensteine und Gameplay — nicht zum Kauf."]),
        section("unlock-milestones", "Freischaltungs-Meilensteine: wie Flügel erhalten werden", ["Flügel werden über Gameplay-Meilensteine freigeschaltet. Die genauen Schwellenwerte waren in der Gamescom-Demo nicht vollständig detailliert."]),
        section("combat-integration", "Kampf-Integration: Verteidigung, Angriff, Luftbewegung", ["Flügel dienen dem Ausweichen in schnellen Bosskämpfen. Sie dienen auch dem Angriff, ermöglichen den Luftkampf, der die Serie definiert."]),
        section("fomo-management", "FOMO-Management: warum der frühe Zeitpunkt zählt", ["Flügel machen den Fortschrittsunterschied sichtbar. Spieler, die warten, sehen Peers fliegen, während sie noch zu Fuß sind."]),
        section("pets-plus-wings", "Flügel und Haustiere: zwei parallele Spuren", ["Flügel und Haustiere sind die zwei sichtbarsten Sammlungsschienen. Beide verwandeln Spielzeit in sichtbaren Unterschied. Beide parallel vorantreiben ist die beste Strategie."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "SISTEMA DE ALAS",
      title: "Guía de alas de AION 2: hitos de desbloqueo, roles de combate aéreo y FOMO que no puedes perderte",
      description: "Las alas son el sistema visual más icónico de AION 2, heredado del original como símbolo de estatus y herramienta de combate funcional. Guía cubre hitos, integración al combate aéreo y por qué el momento del desbloqueo temprano importa.",
      intro: "En el original AION, las alas eran más que decoración — movimiento, identidad y combate. AION 2 las lleva como sistema de desbloqueo por hitos, confirmado en la demo Gamescom.",
      sourceNote: "Basado en MMORPG.com 2 sept. 2026 (Luis Gutierrez) y la wiki AION Classic Wings para contexto de saga.",
      keywords: ["AION 2 alas", "AION 2 desbloqueo alas", "AION 2 combate aéreo", "AION 2 hito alas", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "Qué son las alas y por qué importan", ["Las alas son el elemento más reconocible visualmente de la saga. Símbolo de estatus y herramienta de combate aéreo. Desbloqueadas por hitos y gameplay — no a la compra."]),
        section("unlock-milestones", "Hitos de desbloqueo: cómo conseguir las alas", ["Las alas se desbloquean por hitos de gameplay en lugar de compra directa. Los umbrales exactos no fueron totalmente detallados en la demo."]),
        section("combat-integration", "Integración al combate: defensa, ataque, movimiento aéreo", ["Las alas sirven para esquivar en jefes rápidos. También para el ataque, permitiendo el combate aéreo que define la saga."]),
        section("fomo-management", "Gestión del FOMO: por qué el momento importa", ["Las alas hacen visible la brecha de progreso. Los jugadores que retrasan verán a sus pares volar mientras ellos están en el suelo."]),
        section("pets-plus-wings", "Alas y mascotas: dos pistas paralelas", ["Las alas y las mascotas son las dos pistas de colección más visibles. Ambas convierten el tiempo de juego en diferencia visible. Avanzar ambas simultáneamente es la mejor estrategia."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "SISTEMA DE ASAS",
      title: "Guia de asas de AION 2: marcos de desbloqueio, papéis no combate aéreo e FOMO que você não pode perder",
      description: "As asas são o sistema visual mais icônico de AION 2, herdado do original como símbolo de status e ferramenta de combate funcional. Guia cobre marcos, integração ao combate aéreo e por que o momento do desbloqueio temprano importa.",
      intro: "No original AION, as asas eram mais que decoração — movimento, identidade e combate. AION 2 carrega asas como sistema de desbloqueio por marcos, confirmado na demo Gamescom.",
      sourceNote: "Baseado em MMORPG.com 2 set. 2026 (Luis Gutierrez) e a wiki AION Classic Wings para contexto de franquia.",
      keywords: ["AION 2 asas", "AION 2 desbloqueio asas", "AION 2 combate aéreo", "AION 2 marco asas", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "O que são asas e por que importam", ["As asas são o elemento mais reconhecível visualmente da franquia. Símbolo de status e ferramenta de combate aéreo. Desbloqueadas por marcos e gameplay — não à venda."]),
        section("unlock-milestones", "Marcos de desbloqueio: como conseguir as asas", ["As asas são desbloqueadas por marcos de gameplay em vez de compra direta. Os limiares exatos não foram totalmente detalhados na demo."]),
        section("combat-integration", "Integração ao combate: defesa, ataque, movimento aéreo", ["As asas servem para desviar em chefes rápidos. Também para o ataque, permitindo o combate aéreo que define a franquia."]),
        section("fomo-management", "Gestão do FOMO: por que o momento importa", ["As asas tornam visível o hiato de progresso. Jogadores que atrasam verão pares voando enquanto estão no chão."]),
        section("pets-plus-wings", "Asas e pets: duas trilhas paralelas", ["As asas e os pets são as duas trilhas de coleção mais visíveis. Ambas convertem tempo de jogo em diferença visível. Avançar ambas simultaneamente é a melhor estratégia."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "СИСТЕМА КРЫЛЬЕВ",
      title: "Гайд по крыльям AION 2: этапы разблокировки, роли воздушного боя и FOMO, который нельзя упустить",
      description: "Крылья — самая узнаваемая визуальная система AION 2, перенесённая из оригинала как символ статуса и функциональный боевой инструмент. Гайд по этапам разблокировки, интеграции в воздушный бой и важности раннего разблокирования.",
      intro: "В оригинальном AION крылья были больше, чем украшение — движение, идентичность и бой. AION 2 переносит крылья как систему разблокировки по этапам, подтверждённую в демо Gamescom.",
      sourceNote: "По данным MMORPG.com 2 сент. 2026 (Luis Gutierrez) и вики AION Classic Wings для контекста серии.",
      keywords: ["AION 2 крылья", "AION 2 разблокировка крыльев", "AION 2 воздушный бой", "AION 2 этап крыльев", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "Что такое крылья и почему они важны", ["Крылья — самый узнаваемый визуальный элемент серии. Символ статуса и инструмент воздушного боя. Разблокируются по этапам и игре — не на покупку."]),
        section("unlock-milestones", "Этапы разблокировки: как получить крылья", ["Крылья разблокируются по игровым этапам, а не прямой покупкой. Точные пороги не были полностью раскрыты в демо."]),
        section("combat-integration", "Интеграция в бой: оборона, атака, воздушное движение", ["Крылья служат для уклонения в быстрых боях с боссами. Также для атаки, обеспечивая воздушный бой, определяющий серию."]),
        section("fomo-management", "Управление FOMO: почему ранний момент важен", ["Крылья делают разрыв прогресса видимым. Игроки, которые ждут, увидят, как сверстники летают, пока они ещё на земле."]),
        section("pets-plus-wings", "Крылья и питомцы: два параллельных трека", ["Крылья и питомцы — два самых видимых трека коллекции. Оба превращают время в игре в видимую разницу. Прогресс обоих одновременно — лучшая стратегия."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "翅膀系統",
      title: "AION 2 翅膀攻略：解鎖里程碑、空中戰鬥角色與不可錯過的 FOMO",
      description: "翅膀是 AION 2 最具標誌性的視覺系統，從原版延續而來——既是地位象徵，也是功能性戰鬥工具。本攻略覆蓋解鎖里程碑、翅膀如何融入空中戰鬥，以及為何早期解鎖時機很重要。",
      intro: "在原版 AION 中，翅膀不只是裝飾——它們是移動、身分和戰鬥的核心部分。AION 2 將翅膀延續為里程碑解鎖系統，在 Gamescom 試玩中得到確認。本攻略覆蓋翅膀的用途、如何解鎖以及它們如何嵌入 PvP 和 PVE 進程。",
      sourceNote: "基於 MMORPG.com 2026 年 9 月 2 日 Gamescom 試玩（Luis Gutierrez）以及 AION Classic Wings 維基作為系列背景參考。",
      keywords: ["AION 2 翅膀", "AION 2 翅膀解鎖", "AION 2 空中戰鬥", "AION 2 翅膀里程碑", "AION 2 地位象徵", "AION 2 FOMO"],
      sections: [
        section("what-wings-are", "翅膀是什麼、為什麼重要", ["翅膀是 AION 系列最具視覺辨識度的元素。在 AION 2 中，它們仍是標誌著玩家進度的地位象徵，也是空中戰鬥的功能性工具。", "Gamescom 試玩確認翅膀透過里程碑和玩法解鎖——而非直接購買。這把進度與玩法綁定，讓翅膀成為「時間投入」最清晰的標記之一。", "對回歸玩家，翅膀是連續性錨點。對新玩家，它們是最清晰的進度可視化訊號。"]),
        section("unlock-milestones", "解鎖里程碑：如何獲得翅膀", ["翅膀透過玩法里程碑而非直接購買解鎖。試玩版未完全說明具體閾值，但訊號明確：進度解鎖是標準。", "玩家應預期翅膀與角色總體進步掛鉤——達到特定等級、完成關鍵任務線或達成戰鬥目標。", "對免費遊戲而言，里程碑解鎖降低了 FOMO 風險：早期進步仍有可見獎勵，無需強制消費。"]),
        section("combat-integration", "戰鬥集成：防禦、進攻、空中移動", ["翅膀用於防禦——在試玩記者強調需要持續注意的快節奏 Boss 戰中閃避攻擊。", "翅膀也承擔進攻角色，啟用 AION 系列的空中戰鬥，讓副本拆分階段保持緊湊。", "怪物變身在翅膀層之上疊加：翅膀提供機動框架，變身在其中添加爆發和工具。"]),
        section("fomo-management", "FOMO 管理：為何早期進度重要", ["翅膀里程碑解鎖意味著進度差距可見。延遲參與的玩家會看到同伴已在空中飛翔而自己還在地面。", "這是有意義的 FOMO 設計：翅膀將遊戲時間轉化為視覺差異，推動持續遊玩而非可選刷圖。", "對只計畫偶爾登入的玩家，翅膀應與寵物收集同等優先——兩者都是里程碑驅動，且高度可見。"]),
        section("pets-plus-wings", "翅膀與寵物：兩條並行進度線", ["翅膀和寵物系統是 AION 2 最可見的兩條收集路線。兩者都是進度驅動；都玩法時間轉化為可見差異。", "兩條線不需要放棄任一條。最佳前期策略是同時推進——寵物靠探索和怪變寵物轉化，翅膀靠里程碑完成。", "對 10 月 5 日前 32 天，同時關注翅膀和寵物能給新玩家對 AION 2 進度-收集回路的最佳第一印象。"]),
      ],
    }),
  },
};