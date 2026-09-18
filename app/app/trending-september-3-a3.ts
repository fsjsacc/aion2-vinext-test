import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-september-3-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 3 — Raid boss split/merge guide (mmorpg.com, Sept 2): 10-player raids that split into two 5-player groups then reunite for the final boss */

const raidSource1: ContentSource = {
  id: "mmorpg-raids-2026-09-02",
  kind: "third-party", publisher: "MMORPG.com",
  label: "AION 2 Raid Design: 10 Players Split Into Two Groups, Then Reunite for the Final Boss",
  url: "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845",
  publishedAt: "2026-09-02",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "AION 2 副本设计：10 人拆 5 组，尾王再合体",
    en: "AION 2 Raid Design: 10 Players Split Into Two Groups, Then Reunite for the Final Boss",
    fr: "Conception des raids d'AION 2 : 10 joueurs divisés en deux groupes, puis réunis pour le boss final",
    de: "AION 2 Raid-Design: 10 Spieler teilen sich in zwei Gruppen, dann vereint für den Finalboss",
    es: "Diseño de raids de AION 2: 10 jugadores se dividen en dos grupos, luego se reúnen para el jefe final",
    ja: "AION 2 レイド設計：10 人が 2 グループに分裂、最終ボスで合体",
    "pt-br": "Design de raids de AION 2: 10 jogadores divididos em dois grupos, então reunidos para o chefe final",
    ru: "Дизайн рейдов AION 2: 10 игроков делятся на две группы, затем объединяются против финального босса",
    ko: "AION 2 레이드 설계: 10인이 두 그룹으로 나뉘었다가 최종 보스에서 합체",
    "zh-hant": "AION 2 副本設計：10 人拆 5 組，尾王再合體",
  }, "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845"),
};

const raidSource2: ContentSource = {
  id: "massivelyop-raids-2026-09-01",
  kind: "third-party", publisher: "Massively Overpowered",
  label: "Massively OP Podcast 578: AION 2 Raid Mechanics at Gamescom",
  url: "https://massivelyop.com/2026/09/01/massively-op-podcast-episode-578-gamescoming-and-gamesgoing/",
  publishedAt: "2026-09-01",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "Massively OP 播客 578：AION 2 Gamescom 副本机制",
    en: "Massively OP Podcast 578: AION 2 Raid Mechanics at Gamescom",
    fr: "Massively OP Podcast 578 : mécaniques de raids d'AION 2 à Gamescom",
    de: "Massively OP Podcast 578: AION 2 Raid-Mechaniken bei Gamescom",
    es: "Massively OP Podcast 578: Mecánicas de raids de AION 2 en Gamescom",
    ja: "Massively OP ポッドキャスト 578：AION 2 Gamescom レイドメカニクス",
    "pt-br": "Massively OP Podcast 578: Mecânicas de raids de AION 2 no Gamescom",
    ru: "Massively OP Podcast 578: механика рейдов AION 2 на Gamescom",
    ko: "Massively OP 팟캐스트 578: AION 2 Gamescom 레이드 메카닉스",
    "zh-hant": "Massively OP 播客 578：AION 2 Gamescom 副本機制",
  }, "https://massivelyop.com/2026/09/01/massively-op-podcast-episode-578-gamescoming-and-gamesgoing/"),
};

const raidHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/9e4b1f2c-5d7a-4e8f-b3c6-1a0d2e4f5b7a.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ja-jp/board/notice/list",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 副本 Boss 配色图", caption: "10 人副本拆 5 组：先合流，后分头打不同 Boss，再合体对尾王——MMORPG.com 称之为「独特设计」。" },
    en: { alt: "AION 2 raid boss guide image", caption: "10-player raids split into two 5-player groups: first together, then split to fight different bosses, then reunite for the final boss — a 'unique twist' per MMORPG.com." },
    fr: { alt: "Image du boss de raid d'AION 2", caption: "Raids à 10 se divisent en deux groupes de 5 : d'abord ensemble, puis séparés pour des boss différents, puis réunis pour le boss final." },
    de: { alt: "AION 2 Raid-Boss Bild", caption: "10er-Raids teilen sich in zwei 5er-Gruppen: erst gemeinsam, dann getrennt für verschiedene Bosse, dann vereint für den Finalboss." },
    es: { alt: "Imagen del jefe de raid de AION 2", caption: "Raids de 10 se dividen en dos grupos de 5: primero juntos, luego separados para jefes diferentes, finalmente reunidos para el jefe final." },
    ja: { alt: "AION 2 レイドボス画像", caption: "10 人レイドが 2 グループに分裂：まず一体で、別々のボスを倒し、最終ボスで合体——MMORPG.com「ユニークなトワスト」。" },
    "pt-br": { alt: "Imagem do chefe de raid de AION 2", caption: "Raids de 10 se dividem em dois grupos de 5: primeiro juntos, depois separados para chefes diferentes, então reunidos para o chefe final." },
    ru: { alt: "Изображение рейдового босса AION 2", caption: "Рейды на 10 делятся на две группы по 5: сначала вместе, потом по разным боссам, затем объединяются для финального босса." },
    ko: { alt: "AION 2 레이드 보스 이미지", caption: "10인 레이드가 두 5인으로 분리: 먼저 함께, 다른 보스를 각각 맞서고 최종 보스에서 합체." },
    "zh-hant": { alt: "AION 2 副本 Boss 配圖", caption: "10 人副本拆 5 組：先合流，後分頭打不同 Boss，再合體對尾王——MMORPG.com 稱之為「獨特設計」。" },
  },
};

export const trendingSeptember3Article3: ContentEntry = {
  section: "guides",
  slug: "aion-2-raid-boss-split-merge-design",
  schemaType: "Article",
  publishedAt: "2026-09-03",
  updatedAt: "2026-09-03",
  readingMinutes: 6,
  publication: publishedVerified,
  sources: [raidSource1, raidSource2],
  heroImage: raidHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-spacetime-rift-domination-guide" },
    { kind: "content", section: "guides", slug: "aion-2-pet-collection-companion-guide" },
    { kind: "content", section: "news", slug: "aion-2-gamescom-2026-demo-overview" },
    { kind: "content", section: "guides", slug: "aion-2-wings-system-unlock-progression" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "RAID GUIDE",
      title: "AION 2 Raid Boss Split-and-Merge Design: How 10 Players Become Two Groups of Five",
      description: "AION 2 raids support 10 players and split into two 5-player groups mid-encounter to fight different bosses simultaneously before reuniting for the final boss. This guide covers the mechanics, group composition, and why the design keeps groups compact enough for aerial PVE.",
      intro: "MMORPG.com's Gamescom demo highlighted raid design as one of AION 2's most distinctive features. The 10-player raid splits into two groups of five mid-fight, each tackling a separate boss before reuniting for the final encounter. Combined with the franchise's aerial PVE identity, the split/merge structure keeps every moment compact and demanding.",
      sourceNote: "Based on MMORPG.com's September 2, 2026 Gamescom hands-on (Luis Gutierrez) covering raid mechanics and the Massively OP Podcast 578 (September 1, 2026) which placed AION 2 as a Gamescom headline.",
      keywords: ["AION 2 raid", "AION 2 raid boss", "AION 2 10 player raid", "AION 2 raid split merge", "AION 2 raid mechanics", "AION 2 dungeon"],
      sections: [
        section("raid-structure", "Raid Structure: 10 Players, 5-Player Dungeons", [
          "Raids in AION 2 support 10 players; dungeons support 5. This creates a natural scaling path — 5-player dungeons prepare groups for the 10-player raid structure.",
          "The raid begins with all 10 players fighting together. This opening phase establishes coordination before the group splits.",
          "Dungeons at 5 align with the raid's split phase, making dungeon runs a natural rehearsal for half of the raid encounter."
        ]),
        section("split-mechanic", "The Split Mechanic: Two Groups, Two Bosses", [
          "Mid-encounter, the 10-player group splits into two parties of five. Each group simultaneously tackles a different boss.",
          "This split is not optional — it is a structural feature of the raid. Both groups must succeed to advance.",
          "The simultaneous dual-boss phase is what MMORPG.com called a 'unique twist' and what the team appears to want repeated across future raid tiers."
        ]),
        section("reunite-for-final", "Reuniting for the Final Boss", [
          "Both groups converge for the final boss encounter. All 10 players must coordinate as one unit for the raid's climax.",
          "The final boss appears to reward the full group's combined effort — a payoff for surviving both split-phase fights.",
          "Wing-based aerial mechanics remain integral, serving both defensive dodges and offensive bursts during the final phase."
        ]),
        section("group-composition", "Group Composition: Trinity That Travels", [
          "The original AION's class design carried over the classic Tank / DPS / Heals trinity. Both 5-player split groups should mirror this structure.",
          "Each group of five needs at least one tank, one healer, and the rest DPS — the raid splits not by class but by trinity-representative units.",
          "This design keeps groups small enough to execute the aerial PVE that defines the franchise while still offering the scale of a traditional 10-player raid."
        ]),
        section("preparation-tips", "Preparation: What to Do Before the Split", [
          "Before the split, groups should align on boss priority — which group takes which boss should be decided pre-encounter, not mid-fight.",
          "Communication tools (voice, ping system) are critical: the split phase separates both players and audio channels in many setups.",
          "Dungeon runs at 5 are the primary way to test team cohesion. Groups that can clear a 5-player dungeon together are structurally ready for the raid's split phase."
        ]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "副本攻略",
      title: "AION 2 副本 Boss 拆分合并机制：10 人如何拆成两个 5 人组",
      description: "AION 2 副本支持 10 人，中途拆成两个 5 人组同时打不同 Boss，再合体对尾王。本攻略覆盖机制、组队配置以及为何这种设计让空中 PVE 保持紧凑。",
      intro: "MMORPG.com Gamescom 试玩把副本设计列为 AION 2 最具区分度的功能之一。10 人副本在战斗中拆成两个 5 人组，各自打不同 Boss 再合流对尾王。结合 AION 的空中 PVE 传统，拆分/合并结构让每个阶段都紧凑且有难度。",
      sourceNote: "基于 MMORPG.com 2026 年 9 月 2 日 Gamescom 试玩（Luis Gutierrez）以及 Massively OP Podcast 578（2026-09-01）。",
      keywords: ["AION 2 副本", "AION 2 副本 Boss", "AION 2 10 人副本", "AION 2 拆分合并", "AION 2 副本机制", "AION 2 地下城"],
      sections: [
        section("raid-structure", "副本结构：10 人副本、5 人地下城", ["副本支持 10 人，地下城 5 人。形成天然升级路径——5 人地下城为 10 人副本结构做铺垫。", "副本开局 10 人齐上，开阶段建立协调后再拆。", "5 人地下城与副本拆分阶段对齐，地下城跑图就是副本拆分阶段的天然预演。"]),
        section("split-mechanic", "拆分机制：两个组、两个 Boss", ["战斗中段，10 人组拆成两个 5 人小队，同时打不同的 Boss。", "拆分不是选项——它是副本的结构特征。两个组都必须成功才能推进。", "同时双线打 Boss 被 MMORPG.com 评为「独特设计」——团队显然想在后续副本层级重复这个套路。"]),
        section("reunite-for-final", "合体打尾王", ["两个组在尾王处合流。10 人作为一个整体对副本高潮。", "尾王似乎奖励全组的合力——是对两个拆分阶段存活的双份回报。", "翅膀空中机制仍不可或缺，在尾王阶段兼具闪避和爆发作用。"]),
        section("group-composition", "组队配置：移动的铁三角", ["原版 AION 的 Tank / DPS / Heals 铁三角被沿用。两个拆分小组都应有铁三角结构。", "每组 5 人至少需要 1 坦 1 奶其余 DPS——拆分按铁三角代表单位分，而非按职业分。", "这种设计让小组保持足够小以执行 AION 系列的空中 PVE，同时又保留传统 10 人副本的规模感。"]),
        section("preparation-tips", "准备：拆分前该做什么", ["拆分前组内应对 Boss 优先级达成一致的预设——哪个组打哪个 Boss 应提前决定，而非战斗中段才临时喊。", "通讯工具（语音、标记系统）至关重要：拆分阶段在多个配置下会让玩家和语音通道也分开。", "5 人地下城是检验团队凝聚力的主要方式。能一起打通 5 人地下城的组在结构上已为拆分阶段做好了准备。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "레이드 가이드",
      title: "AION 2 레이드 보스 분할·합체 설계: 10인이 두 5인으로 나뉘는 방식",
      description: "AION 2 레이드 10인 지원, 전투 중 두 5인으로 분리되어 다른 보스를 각각 맞서고 최종 보스에서 합체. 메카닉스, 파티 구성, 공중 PVE 유지 원인 가이드.",
      intro: "MMORPG.com Gamescom 데모에서 레이드 설계는 AION 2의 가장 차별화된 기능 중 하나로 꼽혔다. 10인이 두 5인으로 분기, 각자 다른 보스를 맞서고 마지막에 합체.",
      sourceNote: "MMORPG.com 2026년 9월 2일 Gamescom 핸즈온(Luis Gutierrez)과 Massively OP Podcast 578(2026-09-01) 쇼 노트 기반.",
      keywords: ["AION 2 레이드", "AION 2 레이드 보스", "AION 2 10인 레이드", "AION 2 분할 합체", "AION 2 던전"],
      sections: [
        section("raid-structure", "레이드 구조: 10인 레이드, 5인 던전", ["레이드 10인, 던전 5인. 5인 던전이 10인 레이드에 대한 자연스러운 진입로다. 시작은 10인이 함께 맞서고, 조정 후 분기."]),
        section("split-mechanic", "분할 메카닉스: 두 그룹, 두 보스", ["전투 중반 10인이 두 5인으로 나뉘어 동시에 다른 보스를 맞선다. 분할은 선택이 아니라 구조적 특징. 두 그룹 모두 성공해야 진행."]),
        section("reunite-for-final", "최종 보스 합체", ["두 그룹이 최종 보스에서 합류. 10인이 단일 유닛으로 레이드 클라이맥스를 맞서야 한다. 날개 공중 메카닉스는 방어와 공격 모두."]),
        section("group-composition", "파티 구성: 이동하는 성스러운 3각", ["원작의 탱커/딜러/힐러를 두 5인 파티가 모두 반영해야 한다. 최소 1탱 1힐 나머지는 딜러."]),
        section("preparation-tips", "준비: 분할 전에 해야 할 일", ["분할 전 보스 우선순위를 사전에 결정. 음성·핑 시스템이 필수. 5인 던전 클리어가 레이드 분기 단계의 구조적 준비."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "レイドガイド",
      title: "AION 2 レイドボス 分割・合体デザイン：10人が2つの5人グループになる仕組み",
      description: "AION 2レイドは10人対応、戦闘中に2つの5人グループに分裂して別々のボスを同時に取り組み、最終ボスで合体。メカニクス・編成・空中PVE維持の理由を解説。",
      intro: "MMORPG.com Gamescomデモは、レイドデザインをAION 2の最も区別できる機能の一つに挙げた。10人が戦闘中に2つの5人グループに分裂、別々のボスに挑み、最終で合体。",
      sourceNote: "MMORPG.com 2026年9月2日Gamescomハンズオン(Luis Gutierrez)とMassively OP Podcast 578(2026-09-01)ショーノートに基づいて作成。",
      keywords: ["AION 2 レイド", "AION 2 レイドボス", "AION 2 10人レイド", "AION 2 分割合体", "AION 2 ダンジョン"],
      sections: [
        section("raid-structure", "レイド構造：10人レイド、5人ダンジョン", ["レイドは10人、ダンジョンは5人。ダンジョンが10人レイドへの自然な登竜門。開戦は10人一斉、その後分裂。"]),
        section("split-mechanic", "分裂メカニクス：2グループ、2ボス", ["戦闘中盤で10人が2つの5人パーティーに分裂し、同時に別々のボスを討伐。分裂は選択ではなく構造的特徴。両グループとも成功が必要。"]),
        section("reunite-for-final", "最終ボスでの合体", ["両グループが最終ボスで合流。10人が一つのユニットとしてフィニッシュ。翼による空中メカニクスが防衛・攻撃両方。"]),
        section("group-composition", "編成：移動する聖なるトライアド", ["タンク/DPS/ヒーラーのトライアドを両5人グループが反映。分裂はクラスではなくトライアド代表単位で。"]),
        section("preparation-tips", "準備：分裂前にすべきこと", ["分裂前にボス優先順位を事前決定。コミュニケーションツール必須。5人ダンジョンクリアが構造的准备。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE DE RAID",
      title: "Conception Split-and-Merge des raids d'AION 2: comment 10 joueurs deviennent deux groupes de 5",
      description: "Les raids d'AION 2 supportent 10 joueurs et se divisent en deux groupes de 5 en cours de combat pour affronter des boss différents avant de se réunir pour le boss final. Guide couvrant les mécaniques, la composition et pourquoi la conception maintient les groupes compacts pour le PVE aérien.",
      intro: "MMORPG.com a mis en avant la conception des raids comme l'une des fonctionnalités les plus distinctives d'AION 2. Les raids à 10 se divisent en deux groupes de 5 en cours de combat avant de se réunir.",
      sourceNote: "Basé sur MMORPG.com 2 sept. 2026 (Luis Gutierrez) et Massively OP Podcast 578 (1 sept. 2026).",
      keywords: ["AION 2 raid", "AION 2 boss raid", "AION 2 raid 10 joueurs", "AION 2 raid split merge", "AION 2 donjon"],
      sections: [
        section("raid-structure", "Structure des raids: 10 joueurs, donjons 5", ["Les raids supportent 10 joueurs, les donjons 5. Le raid commence avec les 10 ensemble avant de se diviser."]),
        section("split-mechanic", "Mécanique de division: deux groupes, deux boss", ["En cours de combat, le groupe de 10 se divise en deux groupes de 5 affrontant simultanément des boss différents. La division n'est pas optionnelle."]),
        section("reunite-for-final", "Réunion pour le boss final", ["Les deux groupes se rejoignent pour le boss final. Les ailes restent essentielles pour esquiver et attaquer."]),
        section("group-composition", "Composition: trinité mobile", ["Chaque groupe de 5 doit refléter la trinité Tank/DPS/Soigneur. La division se fait par unités représentant la trinité."]),
        section("preparation-tips", "Préparation avant la division", ["Décider avant le combat quel groupe affronte quel boss. Les outils de communication sont critiques. Les donjons 5 joueurs servent de répétition."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "RAID-GUIDE",
      title: "AION 2 Raid-Boss Split-and-Merge-Design: Wie 10 Spieler zwei Gruppen zu Fünfen werden",
      description: "AION 2 Raids unterstützen 10 Spieler und teilen sich in zwei 5er-Gruppen mitten im Kampf, die jeweils unterschiedliche Bosse bekämpfen, bevor sie sich für den Finalboss vereinen. Guide deckt Mechaniken, Zusammensetzung und warum das Design Gruppen klein genug für Luft-PVE hält.",
      intro: "MMORPG.com hob das Raid-Design als eine der unterschiedlichsten Features von AION 2 hervor. 10er-Raids teilen sich in zwei 5er-Gruppen mitten im Kampf.",
      sourceNote: "Basierend auf MMORPG.com 2. Sept. 2026 (Luis Gutierrez) und Massively OP Podcast 578 (1. Sept. 2026).",
      keywords: ["AION 2 Raid", "AION 2 Raid-Boss", "AION 2 10er Raid", "AION 2 Raid Split Merge", "AION 2 Dungeon"],
      sections: [
        section("raid-structure", "Raid-Struktur: 10er Raids, 5er Dungeons", ["Raids unterstützen 10 Spieler, Dungeons 5. Das Raid beginnt mit allen 10, dann teilen sie sich."]),
        section("split-mechanic", "Split-Mechanik: zwei Gruppen, zwei Bosse", ["Mitten im Kampf teilen sich die 10 in zwei 5er-Gruppen, die jeweils unterschiedliche Bosse bekämpfen. Der Split ist nicht optional."]),
        section("reunite-for-final", "Vereinigung für den Finalboss", ["Beide Gruppen vereinen sich für den Finalboss. Flügel bleiben wichtig für Ausweichen und Angriff."]),
        section("group-composition", "Gruppenzusammensetzung: mobile Dreifaltigkeit", ["Jede 5er-Gruppe sollte die Tank/DPS/Heiler-Dreifaltigkeit abbilden. Der Split erfolgt nach Dreifaltigkeits-Vertretern."]),
        section("preparation-tips", "Vorbereitung vor dem Split", ["Vor dem Kampf entscheiden, welche Gruppe welchen Boss bekämpft. Kommunikations-Tools sind kritisch. 5er-Dungeons dienen als Probe."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE RAID",
      title: "Diseño Split-and-Merge de los raids de AION 2: cómo 10 jugadores se convierten en dos grupos de 5",
      description: "Los raids de AION 2 admiten 10 jugadores y se dividen en dos grupos de 5 durante el combate para enfrentar jefes diferentes antes de reunirse para el jefe final. Guía cubre mecánicas, composición y por qué el diseño mantiene grupos compactos para el PVE aéreo.",
      intro: "MMORPG.com destacó el diseño de raids como una de las funciones más distintivas de AION 2. Los raids de 10 se dividen en dos grupos de 5 durante el combate.",
      sourceNote: "Basado en MMORPG.com 2 sept. 2026 (Luis Gutierrez) y Massively OP Podcast 578 (1 sept. 2026).",
      keywords: ["AION 2 raid", "AION 2 jefe raid", "AION 2 raid 10 jugadores", "AION 2 raid split merge", "AION 2 mazmorra"],
      sections: [
        section("raid-structure", "Estructura de raids: 10 jugadores, mazmorras 5", ["Los raids admiten 10 jugadores, las mazmorras 5. El raid comienza con los 10 juntos antes de dividirse."]),
        section("split-mechanic", "Mecánica de división: dos grupos, dos jefes", ["Durante el combate, el grupo de 10 se divide en dos grupos de 5 que enfrentan jefes diferentes simultáneamente. La división no es opcional."]),
        section("reunite-for-final", "Reunión para el jefe final", ["Ambos grupos se reúnen para el jefe final. Las alas siguen siendo esenciales para esquivar y atacar."]),
        section("group-composition", "Composición: trinidad móvil", ["Cada grupo de 5 debe reflejar la trinidad Tank/DPS/Curandero. La división se hace por unidades representativas de la trinidad."]),
        section("preparation-tips", "Preparación antes de la división", ["Decidir antes del combate qué grupo enfrenta qué jefe. Las herramientas de comunicación son críticas. Las mazmorras de 5 sirven como ensayo."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE RAID",
      title: "Design Split-and-Merge dos raids de AION 2: como 10 jogadores se tornam dois grupos de 5",
      description: "Os raids de AION 2 suportam 10 jogadores e se dividem em dois grupos de 5 durante o combate para enfrentar chefes diferentes antes de se reunirem para o chefe final. Guia cobre mecânicas, composição e por que o design mantém grupos compactos para o PVE aéreo.",
      intro: "MMORPG.com destacou o design de raids como um dos recursos mais distintivos de AION 2. Os raids de 10 se dividem em dois grupos de 5 durante o combate.",
      sourceNote: "Baseado em MMORPG.com 2 set. 2026 (Luis Gutierrez) e Massively OP Podcast 578 (1 set. 2026).",
      keywords: ["AION 2 raid", "AION 2 chefe raid", "AION 2 raid 10 jogadores", "AION 2 raid split merge", "AION 2 dungeon"],
      sections: [
        section("raid-structure", "Estrutura de raids: 10 jogadores, dungeons 5", ["Raids suportam 10 jogadores, dungeons 5. O raid começa com os 10 juntos antes de se dividir."]),
        section("split-mechanic", "Mecânica de divisão: dois grupos, dois chefes", ["Durante o combate, o grupo de 10 se divide em dois grupos de 5 enfrentando chefes diferentes simultaneamente. A divisão não é opcional."]),
        section("reunite-for-final", "Reunião para o chefe final", ["Ambos grupos se reúnem para o chefe final. As asas continuam essenciais para desviar e atacar."]),
        section("group-composition", "Composição: trindade móvel", ["Cada grupo de 5 deve refletir a trindade Tank/DPS/Healer. A divisão é feita por unidades representativas da trindade."]),
        section("preparation-tips", "Preparação antes da divisão", ["Decidir antes do combate qual grupo enfrenta qual chefe. Ferramentas de comunicação são críticas. Dungeons de 5 servem como ensaio."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ГУЙД РЕЙДА",
      title: "Дизайн рейдов AION 2 с разделением и объединением: как 10 игроков становятся двумя группами по 5",
      description: "Рейды AION 2 поддерживают 10 игроков и делятся на две группы по 5 в середине боя, чтобы сразиться с разными боссами, прежде чем объединиться против финального босса. Гайд по механике, составу и тому, почему дизайн сохраняет компактные группы для воздушного PVE.",
      intro: "MMORPG.com выделил дизайн рейдов как одну из самых отличительных функций AION 2. Рейды на 10 делятся на две группы по 5 в середине боя.",
      sourceNote: "По данным MMORPG.com 2 сент. 2026 (Luis Gutierrez) и Massively OP Podcast 578 (1 сент. 2026).",
      keywords: ["AION 2 рейд", "AION 2 рейдовый босс", "AION 2 рейд на 10", "AION 2 разделение объединение", "AION 2 подземелье"],
      sections: [
        section("raid-structure", "Структура рейдов: 10 игроков, подземелья 5", ["Рейды поддерживают 10 игроков, подземелья 5. Рейд начинается со всех 10, затем делится."]),
        section("split-mechanic", "Механика разделения: две группы, два босса", ["В середине боя группа из 10 делится на две группы по 5, сражающихся одновременно с разными боссами. Разделение необязательно."]),
        section("reunite-for-final", "Объединение против финального босса", ["Обе группы объединяются для финального босса. Крылья остаются важными для уклонения и атаки."]),
        section("group-composition", "Состав группы: мобильная тройка", ["Каждая группа из 5 должна отражать тройку Танк/ДПС/Исцелитель. Разделение происходит по представителям тройки."]),
        section("preparation-tips", "Подготовка до разделения", ["Решить до боя, какая группа какого босса. Инструменты коммуникации критичны. Подземелья на 5 служат репетицией."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "副本攻略",
      title: "AION 2 副本 Boss 拆分合併機制：10 人如何拆成兩個 5 人組",
      description: "AION 2 副本支持 10 人，中途拆成兩個 5 人組同時打不同 Boss，再合體對尾王。本攻略覆蓋機制、組隊配置以及為何這種設計讓空中 PVE 保持緊湊。",
      intro: "MMORPG.com Gamescom 試玩把副本設計列為 AION 2 最具區分度的功能之一。10 人副本在戰鬥中拆成兩個 5 人組，各自打不同 Boss 再合流對尾王。結合 AION 的空中 PVE 傳統，拆分／合併結構讓每個階段都緊湊且有難度。",
      sourceNote: "基於 MMORPG.com 2026 年 9 月 2 日 Gamescom 試玩（Luis Gutierrez）以及 Massively OP Podcast 578（2026-09-01）。",
      keywords: ["AION 2 副本", "AION 2 副本 Boss", "AION 2 10 人副本", "AION 2 拆分合併", "AION 2 地下城"],
      sections: [
        section("raid-structure", "副本結構：10 人副本、5 人地下城", ["副本支持 10 人，地下城 5 人。形成天然升級路徑——5 人地下城為 10 人副本結構做鋪墊。", "副本開局 10 人齊上，開階段建立協調後再拆。", "5 人地下城與副本拆分階段對齊，地下城跑圖就是副本拆分階段的天然預演。"]),
        section("split-mechanic", "拆分機制：兩個組、兩個 Boss", ["戰鬥中段，10 人組拆成兩個 5 人小隊，同時打不同的 Boss。", "拆分不是選項——它是副本的結構特徵。兩個組都必須成功才能推進。", "同時雙線打 Boss 被 MMORPG.com 評為「獨特設計」——團隊顯然想在後續副本層級重複這個套路。"]),
        section("reunite-for-final", "合體打尾王", ["兩個組在尾王處合流。10 人作為一個整體對副本高潮。", "尾王似乎獎勵全組的合力——是對兩個拆分階段存活的双份回報。", "翅膀空中機制仍不可或缺，在尾王階段兼具閃避和爆發作用。"]),
        section("group-composition", "組隊配置：移動的鐵三角", ["原版 AION 的 Tank / DPS / Heals 鐵三角被沿用。兩個拆分小組都應有鐵三角結構。", "每組 5 人至少需要 1 坦 1 奶其餘 DPS——拆分按鐵三角代表單位分，而非按職業分。", "這種設計讓小組保持足夠小以執行 AION 系列的空中 PVE，同時又保留傳統 10 人副本的規模感。"]),
        section("preparation-tips", "準備：拆分前該做什麼", ["拆分前組內應對 Boss 優先級達成一致的預設——哪個組打哪個 Boss 應提前決定，而非戰鬥中段才臨時喊。", "通訊工具（語音、標記系統）至關重要：拆分階段在多個配置下會讓玩家和語音通道也分開。", "5 人地下城是檢驗團隊凝聚力的主要方式。能一起打通 5 人地下城的組在結構上已為拆分階段做好了準備。"]),
      ],
    }),
  },
};