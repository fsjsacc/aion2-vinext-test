import { articleCopy, localizations, newsLabels, publishedVerified, section } from "./trending-september-3-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 1 — Gamescom 2026 demo overview (mmorpg.com, Sept 2): pets, customization, raid bosses, visuals, developer commentary */

const gcSource1: ContentSource = {
  id: "mmorpg-gamescom-demo-2026-09-02",
  kind: "third-party", publisher: "MMORPG.com",
  label: "Gamescom 2026: AION 2's Demo Highlights Pets, Customizations, And Colorful Yet Intense Raid Bosses",
  url: "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845",
  publishedAt: "2026-09-02",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "Gamescom 2026：AION 2 试玩亮点——宠物、自定义与色彩斑斓的高压副本 Boss",
    en: "Gamescom 2026: AION 2's Demo Highlights Pets, Customizations, And Colorful Yet Intense Raid Bosses",
    fr: "Gamescom 2026 : la démo d'AION 2 met en avant les familiers, la personnalisation et les boss colorés et intenses",
    de: "Gamescom 2026: AION 2-Demo hebt Haustiere, Anpassungen und bunte, intensive Raids hervor",
    es: "Gamescom 2026: la demo de AION 2 destaca mascotas, personalización y jefes de incursión coloridos e intensos",
    ja: "Gamescom 2026：AION 2 デモ、ペット・カスタマイズ・多彩かつ激しいレイドボスを披露",
    "pt-br": "Gamescom 2026: a demo de AION 2 destaca pets, personalização e chefes de raide coloridos e intensos",
    ru: "Gamescom 2026: демо AION 2 демонстрирует питомцев, кастомизацию и ярких, интенсивных рейдовых боссов",
    ko: "Gamescom 2026: AION 2 데모, 펫/커스터마이징/다채롭고 강렬한 레이드 보스 하이라이트",
    "zh-hant": "Gamescom 2026：AION 2 試玩重點——寵物、客製化與色彩斑斕的高壓副本 Boss",
  }, "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845"),
};

const gcSource2: ContentSource = {
  id: "massivelyop-podcast-578-2026-09-01",
  kind: "third-party", publisher: "Massively Overpowered",
  label: "Massively OP Podcast Episode 578: Gamescoming and Gamesgoing (AION 2 covered)",
  url: "https://massivelyop.com/2026/09/01/massively-op-podcast-episode-578-gamescoming-and-gamesgoing/",
  publishedAt: "2026-09-01",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "Massively OP 播客 578：Gamescom 前后（含 AION 2 专题）",
    en: "Massively OP Podcast Episode 578: Gamescoming and Gamesgoing (AION 2 covered)",
    fr: "Massively OP Podcast Ép. 578 : Gamescoming and Gamesgoing (AION 2)",
    de: "Massively OP Podcast Folge 578: Gamescoming and Gamesgoing (mit AION 2)",
    es: "Massively OP Podcast Ep. 578: Gamescoming and Gamesgoing (con AION 2)",
    ja: "Massively OP ポッドキャスト 578：Gamescom 直前直後（AION 2 を特集）",
    "pt-br": "Massively OP Podcast Ep. 578: Gamescoming and Gamesgoing (com AION 2)",
    ru: "Massively OP Podcast Выпуск 578: Gamescoming and Gamesgoing (об AION 2)",
    ko: "Massively OP 팟캐스트 578: Gamescoming and Gamesgoing(AION 2 포함)",
    "zh-hant": "Massively OP 播客 578：Gamescom 前後（含 AION 2 專題）",
  }, "https://massivelyop.com/2026/09/01/massively-op-podcast-episode-578-gamescoming-and-gamesgoing/"),
};

const gcHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ja-jp/board/notice/list",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 Gamescom 试玩新闻配图", caption: "NC 官方配图；9/2 MMORPG.com 试玩报道：宠物系统（200+、怪变宠物）、深度角色自定义、10 人副本拆分合并机制、色彩鲜亮的世界。" },
    en: { alt: "AION 2 Gamescom demo news image", caption: "Official NC artwork; Sept 2 MMORPG.com demo report: 200+ pets (mobs turned into companions), deep character customization, split-and-merge 10-player raids, and a vivid world." },
    fr: { alt: "Image de la démo Gamescom d'AION 2", caption: "Visuel officiel NC ; rapport MMORPG.com du 2 sept. : 200+ familiers (monstres transformés en compagnons), personnalisation approfondie, raids 10 joueurs à fusion/séparation, monde éclaté." },
    de: { alt: "AION 2 Gamescom-Demo Bild", caption: "Offizielles NC-Artwork; MMORPG.com-Testbericht vom 2. Sept.: 200+ Haustiere (Monster zu Gefährten), tiefe Charakter-Anpassung, Split/Merge 10er-Raids, lebendige Welt." },
    es: { alt: "Imagen de la demo de Gamescom de AION 2", caption: "Arte oficial de NC; informe MMORPG.com del 2 sept.: 200+ mascotas (monstruos convertidos en compañeros), personalización profunda, incursiones de 10 con división/reunión, mundo vibrante." },
    ja: { alt: "AION 2 Gamescom デモニュース画像", caption: "NC公式アートワーク；9/2 MMORPG.com 試玩レポート：200 以上ペット（モンスターを相棒に）、深めキャラクターカスタマイズ、10 人レイドの分岐・合体、彩り豊かな世界。" },
    "pt-br": { alt: "Imagem da demo de Gamescom de AION 2", caption: "Arte oficial da NC; relatório MMORPG.com de 2 set.: 200+ pets (monstros viram companheiros), personalização profunda, raids de 10 com divisão/reunião, mundo vívido." },
    ru: { alt: "Изображение демо AION 2 на Gamescom", caption: "Официальный арт NC; обзор MMORPG.com от 2 сент.: 200+ питомцев (из мобов), глубокая кастомизация, рейды на 10 с разделением/объединением, яркая вселенная." },
    ko: { alt: "AION 2 Gamescom 데모 뉴스 이미지", caption: "NC 공식 이미지입니다. 9/2 MMORPG.com 데모 리뷰: 펫 200+(모ンスター→컴패니언), 깊은 캐릭터 커스터마이징, 10인 레이드 분할·합체, 생생한 세계." },
    "zh-hant": { alt: "AION 2 Gamescom 試玩新聞配圖", caption: "NC 官方配圖；9/2 MMORPG.com 試玩報導：寵物系統（200+、怪變寵物）、深度角色客製化、10 人副本拆分合併機制、色彩鮮亮的世界。" },
  },
};

export const trendingSeptember3Article1: ContentEntry = {
  section: "news",
  slug: "aion-2-gamescom-2026-demo-overview",
  schemaType: "NewsArticle",
  publishedAt: "2026-09-03",
  updatedAt: "2026-09-03",
  readingMinutes: 5,
  publication: publishedVerified,
  sources: [gcSource1, gcSource2],
  heroImage: gcHero,
  related: [
    { kind: "content", section: "news", slug: "aion-2-release-date-october-5-2026" },
    { kind: "content", section: "guides", slug: "aion-2-prelaunch-access-routes-guide" },
    { kind: "content", section: "guides", slug: "aion-2-spacetime-rift-domination-guide" },
    { kind: "content", section: "news", slug: "aion-2-global-launch-no-oceania-server" },
  ],
  translations: {
    en: articleCopy(newsLabels, "en", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "AION 2's Gamescom 2026 Demo: Pets You Collect Like Pokémon, Customization Rivals Black Desert, Raids That Split in Two",
      description: "MMORPG.com's hands-on Gamescom preview (Sept 2) found 200+ pets you can make from almost any mob, a Black-Desert-grade character creator, and 10-player raids that split into two groups of five before reuniting for the final boss. Reporter Luis Gutierrez called the demo his best reason yet to feel confident about October 5.",
      intro: "AION 2 spent Gamescom 2026 doing more than repeating the October 5 global-launch date and the post-stress-test roadmap already announced at Opening Night Live. NetEase brought the team to the floor with a playable demo, and MMORPG.com's Luis Gutierrez played it on September 2 with a clear verdict: he left with the strongest confidence he has had so far about AION 2. This report breaks down what showed up on the floor — the pet system, character customization, raid design, combat feel, and developer commentary — and what it means for the free-to-play MMO launching in 32 days.",
      sourceNote: "Based on MMORPG.com's September 2, 2026 Gamescom hands-on preview (Luis Gutierrez) and the Massively OP Podcast Episode 578 show notes (September 1, 2026), which place AION 2 alongside Path of Exile 2 as a Gamescom headline with an official launch date.",
      keywords: ["AION 2 Gamescom 2026 demo", "AION 2 pets", "AION 2 character customization", "AION 2 raid boss", "AION 2 Black Desert", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "Pets You Can Collect Like Pokémon — Over 200, From Mob to Companion", [
          "The demo built around a pet system AION 2 senior producer Andrew Long jokingly called a 'disaster' because making essentially every mob into a possible pet burned more manpower than anyone planned — but the team stayed 'headstrong about seeing through' the idea.",
          "More than 200 pets are available. Rather than looting defeated mobs, players can turn them into companions. The range runs from a cute little bunny to a giant eldritch beast that carries you around town on its back or in a coffin.",
          "Players can also transform into monsters during fights and use their abilities — not shown in the demo build itself, but confirmed by the team as a playable path.",
          "For a game launching free-to-play, the pet system doubles as both collection content and an emotional hook; for MMO veterans, it is AION 2's most visible signal of how much production the sequel can afford over the original."
        ]),
        section("creator-rivals-bdo", "Character Customization Rivals Black Desert Online", [
          "The character creator was the feature the reviewer said he would 'spend as much time making his character as he does playing.' The team drew explicit inspiration from Black Desert Online, and the demo delivered accordingly.",
          "Options include hair dye with adjustable ombre length, blush placement on cheeks, and a deep stack of further tweaks. Multiple classes cover the classic holy trinity of Tank, DPS, and Heals, so identity is not just cosmetic.",
          "Wings — the feature carried over from the original AION — remain a key visual and functional status symbol, unlocked through milestones and gameplay."
        ]),
        section("raids-split-and-merge", "Raids That Split in Two — 10 Players, Two Groups of Five, Then Together Again", [
          "Raids support 10 players while dungeons support 5. At the start, all 10 fight together; then the group splits into two parties of five to tackle different bosses simultaneously.",
          "Both groups reunite for the final boss, which MMORPG.com flagged as a 'unique twist' — a design the team appears to want repeated, given how prominently it was featured.",
          "The 10-vs-5 scaling, paired with dungeons at 5, keeps groups compact enough for the kind of aerial PVE the franchise is built around."
        ]),
        section("combat-feel", "Combat: Fast-Paced, Never Lets You Shut Your Brain Off", [
          "The reviewer described combat as 'fast-paced compared to other games in the genre.' Boss fights demand constant attention — 'every other second, a new attack was flying your way,' with narrow windows for counter-attacks.",
          "Wings are not decorative: they serve defensive uses (avoiding attacks) and offensive ones (aerial combat). Monster transformation sits on top of this as a layer for burst and utility.",
          "For players coming in expecting AION-era combat, the pace reads like a meaningful step forward; for players expecting a slow traditional MMO, it is worth noting up front."
        ]),
        section("what-it-means", "What the Demo Means for October 5", [
          "NetEase — co-publisher alongside NCSoft — provided travel and accommodation to Gamescom, a signal of the level of investment the West-facing push is now receiving.",
          "Combined with the confirmed October 5 global launch, the completed stress test, and the pre-launch headstart already discussed on the Massively OP Podcast, the demo closes the gap between 'roadmap date' and 'a game you can already see and touch.'",
          "Notably absent from the floor build was monster transformation in action — a feature confirmed but not shown, which the demo leaves as a tease rather than a fully explained system."
        ]),
      ],
    }),
    "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
      eyebrow: "Gamescom 2026",
      title: "AION 2 亮相 Gamescom 2026：200+ 宠物像收宝可、自定义逼近平庸、副本 10 人拆 5 组",
      description: "MMORPG.com 9/2 试玩报道：200+ 宠物（几乎任何怪都能收）、Black Desert 级的角色自定义、10 人副本拆成两个 5 人组再合体打尾王。记者 Luis Gutierrez 直言这是目前他对 AION 2 10 月 5 日上线的最大信心来源。",
      intro: "AION 2 在 Gamescom 2026 上做的不只有重复 10/5 全球上线日期与压力测试后的路线图。NetEase 把开发团队带到展台上跑试玩，MMORPG.com 的 Luis Gutierrez 于 9 月 2 日通关并给出明确结论：这是目前他对 AION 2 最强烈的信心来源。本报告拆解展台上的所有要点——宠物系统、角色自定义、副本设计、战斗手感与开发团队评论，以及它对 32 天后免费上线的意义。",
      sourceNote: "基于 MMORPG.com 2026 年 9 月 2 日 Gamescom 试玩报道（Luis Gutierrez）与 Massively OP Podcast 578 期节目简介（2026-09-01），后者将 AION 2 与 Path of Exile 2 并列为 Gamescom 头条并有官方上线日期。",
      keywords: ["AION 2 Gamescom 2026 试玩", "AION 2 宠物", "AION 2 角色自定义", "AION 2 副本 Boss", "AION 2 Black Desert", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200+ 宠物，几乎任何怪都能收", ["AION 2 高级制作人 Andrew Long 玩笑说把所有怪变成宠物是「灾难」，因为人力比计划的多，但团队「头铁」把它做了。", "超过 200 只宠物可选；击败怪后不是爆装备，而是把它变成同伴。范围从小兔到巨型古神巨兽，后者甚至能背你进城或把你装进棺材里走。", "玩家也可以在战斗中变身成怪物并使用技能——试玩未直接展示但团队已确认。", "对免费游戏而言，宠物系统是收集内容也是情感钩子；对 MMO 老兵而言，它是 AION 2 相较原版投入深度的最直观信号。"]),
        section("creator-rivals-bdo", "角色自定义向 Black Desert Online 看齐", ["制作人是记者最花时间的一步，团队直接借鉴 Black Desert Online，试玩表现与之契合。", "选项包括带可调渐变长度的发色、腮红位置、以及一堆进阶微调。职业覆盖 Tank/DPS/Heal 铁三角，身份不只是外观。", "翅膀——源自原版 AION 的核心功能——仍是关键视觉与功能性的地位象征，通过里程碑与玩法解锁。"]),
        section("raids-split-and-merge", "副本 10 人拆 5 组，尾王再合体", ["副本支持 10 人，地下城 5 人。开局 10 人齐上，再拆成两个 5 人组同时打不同 Boss。", "两个组在尾王处合并，MMORPG.com 称之为「独特设计」——开发团队显然想把它做成招牌。", "10 对 5 的规模搭配 5 人地下城，让空中 PVE 保持紧凑。"]),
        section("combat-feel", "战斗：快节奏，不让你放空", ["记者称战斗「比同类游戏更快节奏」。Boss 战每两秒就有一个新攻击来袭，反击窗口很窄。", "翅膀不只是装饰：可用于防御（闪避）和进攻（空中战斗）。怪物变身是爆发与工具属性的叠加层。", "对期待 AION 时代战斗的老玩家，节奏是明显进化；对期待慢 MMO 的新玩家，需事先知晓。"]),
        section("what-it-means", "对 10 月 5 日的意义", ["NetEase（与 NCSoft 共同发行的西向推广方）包揽了 Gamescom 的差旅——西向投入升级的信号。", "结合已确认的 10/5 全球上线、已完成的压力测试、以及 Massively OP 播客提及的预上线 Headstart，试玩把「路线图上的日期」变成了「已经能上手摸到的游戏」。", "值得注意的是试玩版中未直接展示怪物变身——这一「已确认未展示」的功能保留为悬念而非完整说明。"]),
      ],
    }),
    ko: articleCopy(newsLabels, "ko", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "AION 2 Gamescom 2026 데모: 포켓몬처럼 모으는 펫, BDO 급 커스텀, 10인 레이드 5:5 분리",
      description: "MMORPG.com 9/2 핸즈온: 거의 모든 몹을 펫으로 만드는 200+ 펫, 블랙더스트 급 캐릭터 커스텀, 10인 레이드가 두 5인으로 나뉜 뒤 최종 보스 때 합체. 기자의 신뢰도가 가장 높았던 데모.",
      intro: "AION 2가 Gamescom 2026에서 한 것은 10/5 글로벌 출시일과 스트레스 테스트 후 로드맵 반복을 넘어섰다. 넷이즈가 개발자를 데리고 playable demo를 운영했고 MMORPG.com 루이스는 9월 2일 플레이 후 가장 높은 신뢰도를 내렸다.",
      sourceNote: "MMORPG.com 2026년 9월 2일 Gamescom 핸즈온(Luis Gutierrez)과 Massively OP Podcast 578(2026-09-01) 쇼 노트 기반. AION 2는 Path of Exile 2와 함께 Gamescom 헤드라인.",
      keywords: ["AION 2 Gamescom 2026 데모", "AION 2 펫", "AION 2 캐릭터 커스텀", "AION 2 레이드 보스", "AION 2 넷이즈"],
      sections: [
        section("pets-everywhere", "200+ 펫, 거의 모든 몹이 펫이 된다", ["시니어 프로듀서 Andrew Long은 모든 몹을 펫으로 만드는 것을 '재난'이라고 농담했지만 팀은 '성의를 가지고' 밀어붙였다.", "200개 이상 펫이 있다. 적을 물리치고 부품을 주워가지 않고, 대신 펫으로 만든다. 귀여운 토끼부터 거대한 존재를 등에 업고 마을을 걸을 수 있다.", "플레이어는 전투 중 몬스터로 변신하고 능력을 사용할 수 있다 — 데모 빌드에서는 직접 보이지 않지만 팀이 확인했다.", "F2P MMO에게 펫은 수집 콘텐츠이자 감정적 연결고리다. 원작에 비해 시퀀셜을 얼마나 많이 만들었는지에 대한 가장 눈에 띄는 신호다."]),
        section("creator-rivals-bdo", "캐릭터 커스터마이징은 BDO 급", ["리뷰어는 '플레이 시간만큼 캐릭터 만들 때 보낸다'고 말했다. 팀은 블랙더스트 온라인에서 영감을 받았다고 밝혔다.", "색조 길이 조절 가능한 헤어 염색, 뺨 홍조, 수많은 세밀한 옵션. 탱커/딜러/힐러 클래스 모두 있다. 외형뿐만 아니라 역할까지.", "날개는 원작을 이어받은 핵심 기능. 마일스톤과 게임 플레이로 해제되는 시각적·기능적 명성 상징이다."]),
        section("raids-split-and-merge", "10인 레이드, 5:5로 나뉜 뒤 최종 보스 때 합체", ["레이드는 10인, 던전은 5인. 시작은 10인이 함께 하고, 나중에 두 5인조로 나뉘어 각각 다른 보스를 맞선다.", "둘 다 최종 보스 앞에서 합체하며 MMORPG.com은 이를 '독특한 트릭'으로 꼽았다.", "10:5 분할과 5인 던전은 AION 특유의 공중 PVE를 유지하는 크기다."]),
        section("combat-feel", "전투: 빠르고 두뇌를 쉬게 두지 않는다", ["리뷰어는 전투를 '장르 다른 게임보다 빠르다'고 표현. 보스전에서는 2초마다 새로운 공격이 날아오고 반격 창은 좁다.", "날개는 장식이 아니라 방어(회피)와 공격(공중 전투)을 동시에 한다. 몬스터 변신은 버스트·유틸리티 레이어다.", "원작 전투를 기대하는 플레이어는 진보된 템포를 느낄 것이고, 느린 전통 MMO를 기대하는 이들은 사전에 인지할 필요가 있다."]),
        section("what-it-means", "10월 5일 의미", ["넷이즈는 Gamescom에 이동·숙박까지 지원하며 서방 출시 투자를 한층 더 높였음을 시그널했다.", "확인된 10/5 글로벌 출시, 스트레스 테스트 완료, Massively OP 팟캐스트에서 언급된 Headstart, 데모가 함께 '로드맵 날짜'를 '상대적으로 만져 볼 수 있는 게임'으로 바꿨다.", "데모 빌드에서 몬스터 변신은 직접 보이지 않았지만 확인된 기능 — 미완의 티징으로 남는다."]),
      ],
    }),
    ja: articleCopy(newsLabels, "ja", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "AION 2、Gamescom 2026 デモ：ペットをポケモン風、カスタマイズはBDO並み、レイドは10→5+5分岐",
      description: "MMORPG.com 9/2 ハンズオン：ほぼすべてのモンスターをペットにする200種超、BDO級のキャラクターカスタマイズ、10人レイドが2つの5人に分かれて最終ボスで合体。記者が最も信頼感を得たデモ。",
      intro: "AION 2がGamescom 2026でやったのは10/5グローバル発売日の繰り返しとロードマップの再確認を超えていた。NetEaseが開発チームを連れてプレイデモを運営し、MMORPG.comのLuisが9月2日にプレイ後、最も高い信頼感を残したと結論。",
      sourceNote: "MMORPG.com 2026年9月2日Gamescomハンズオン(Luis Gutierrez)とMassively OP Podcast 578(2026-09-01)ショーノートに基づく。AION 2はPath of Exile 2と並んでGamescomの頭版。",
      keywords: ["AION 2 Gamescom 2026 デモ", "AION 2 ペット", "AION 2 キャラクターカスタマイズ", "AION 2 レイドボス", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200種超ペット、ほぼ全モンスターをペットに", ["シニアプロデューサーAndrew Longは全モンスターをペットにするのは「災難」だったと冗談で語るが、チームは「意欲を持って」実行。", "200種類以上のペット。敵を倒してパーツを拾うのではなく、ペットに変える。小さなうさぎから背中にのせられる巨大生物まで。", "戦闘中、モンスターに変身して能力を発動可能（デモでは直接展示せず、チーム確認）。", "F2P MMOにとってペットは収集コンテンツであり、感情のヒューク。シークエルの制作規模を示す最も可視的なシグナル。"]),
        section("creator-rivals-bdo", "キャラクターカスタマイズはBDO級", ["リ-viewerは「プレイ時間と同じだけキャラメイクに費やす」と。チームはBlack Desert Onlineからインスピレーションを受けたと表明。", "グラデーション長さ調節可能なヘアカラー、頬の紅、数多くの微調整。タンク/デイト/ヒーラー鉄三角を網羅。", "翼は元作から受け継がれた核心機能。マイルストーンとゲームプレイで解放される視覚・機能的ステータスシンボル。"]),
        section("raids-split-and-merge", "10人レイド、5+5に分割、最終ボスで合体", ["レイド10人、ダンジョン5人。開戦は10人一体、その後2つの5人グループに分裂し別々のボスに挑む。", "両グループは最終ボスで合体。MMORPG.comは「ユニークなトワスト」と評。", "10:5の分割と5人ダンジョンは、AIONらしい空中PVEを維持する規模。"]),
        section("combat-feel", "戦闘：速く、思考を休ませない", ["リ-viewerは「同ジャンルの他のゲームより速い」と表現。ボス戦は2秒ごとに新攻撃が飛んでくる。反撃ウィンドウは狭い。", "翼は装飾ではない。防御（回避）と攻撃（空中戦闘）の両方。モンスター変身はバーストとユーティリティのレイヤー。", "元作戦闘を期待するプレイヤーは進化を感じる。ゆっくりした伝統MMOを期待するなら事前に把握すべき。"]),
        section("what-it-means", "10月5日への意味", ["NetEaseはGamescomの移動・宿泊まで手配し、西側ローンチへの投資を一段階上げたことをシグナル。", "確認済みの10/5グローバル発売、完了したストレステスト、Massively OPポッドキャストで言及されたHeadstart、デモが合わさり、ロードマップの日付を「実際に触れられるゲーム」に変えた。", "モンスター変身はデモでは直接見せず、確認済みの未提示機能。不完全なティース。"]),
      ],
    }),
    fr: articleCopy(newsLabels, "fr", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "La démo Gamescom 2026 d'AION 2 : 200+ familiers, personnalisation au rang de Black Desert, raids 10 qui se divisent en deux 5",
      description: "MMORPG.com 2 sept. : 200+ familiers tirés de presque tous les mobs, customisation de niveau Black Desert, raids 10 joueurs qui se scindent en deux groupes de 5 puis se rassemblent pour le boss final. Confiance maximale du reporter pour 5 oct.",
      intro: "AION 2 a fait plus que répéter la date du 5 oct. Le studio a exposé une démo jouable et MMORPG.com en est ressorti avec la confiance la plus forte jusqu'ici.",
      sourceNote: "Basé sur MMORPG.com 2 sept. 2026 et le podcast Massively OP 578 (1 sept. 2026), qui place AION 2 avec Path of Exile 2 comme titre phare de Gamescom.",
      keywords: ["AION 2 Gamescom 2026 démo", "AION 2 familiers", "AION 2 personnalisation", "AION 2 raid", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200+ familiers, presque tous les mobs deviennent des compagnons", ["Andrew Long, producteur senior, plaisante que rendre chaque mob possible en familier est un 'calvaire', mais l'équipe a tenu bon. 200+ familiers vont d'un petit lapin à une bête géante.", "En combat, on peut se transformer en monstre et utiliser ses pouvoirs — confirmé mais pas montré dans la démo.", "Pour un MMO F2P, le système double de contenu de collection et de levier émotionnel."]),
        section("creator-rivals-bdo", "Personnalisation au rang de Black Desert Online", ["Le créateur de personnage est inspiré par BDO. Options de teinture avec dégradé, rouge sur les joues, etc. Les classes couvrent la trinité tank/DPS/soigneur.", "Les ailes restent un symbole de statut et un outil fonctionnel."]),
        section("raids-split-and-merge", "Raids 10 qui se divisent en deux 5 avant le boss final", ["Les raids sont à 10 joueurs, les donjons à 5. À l'ouverture, les 10 jouent ensemble, puis on se scinde en deux groupes de 5 avant de se rassembler pour le boss final — une 'touched' unique."]),
        section("combat-feel", "Combat : rapide et ininterrompu", ["Le reportage qualifie le combat de 'rapide comparé aux jeux du genre'. Les combats de boss exigent une attention continue, les ailes servent en défense et en attaque."]),
        section("what-it-means", "Ce que la démo signifie pour le 5 oct.", ["NetEase a financé les déplacements et le séjour à Gamescom, signe d'un investissement accru côté occidental. La démo transforme la date de la roadmap en un jeu tangible. La transformation en monstre reste un teaser non entièrement dévoilé."]),
      ],
    }),
    de: articleCopy(newsLabels, "de", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "AION 2-Gamescom-2026-Demo: 200+ Haustiere, Customization auf BDO-Niveau, 10er-Raids die sich spalten",
      description: "MMORPG.com 2. Sept.: 200+ Haustiere (fast jeder Mob wird zum Gefährten), Customization auf BDO-Niveau, 10er-Raids die sich in zwei 5er-Gruppen aufteilen und dann für den Finalboss vereinen.",
      intro: "AION 2 hat mehr getan als das 5. Okt.-Datum zu wiederholen. Das Studio zeigte eine spielbare Demo, aus der MMORPG.com mit der höchsten bisherigen Zuversicht kam.",
      sourceNote: "Basierend auf MMORPG.com 2. Sept. 2026 und Massively OP Podcast 578 (1. Sept. 2026), die AION 2 mit Path of Exile 2 als Gamescom-Headline einordnen.",
      keywords: ["AION 2 Gamescom 2026 Demo", "AION 2 Haustiere", "AION 2 Customization", "AION 2 Raid", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200+ Haustiere, fast jeder Mob wird zum Gefährten", ["Andrew Long nannte die Entscheidung, jeden Mob zum Haustier zu machen, scherzhaft eine 'Katastrophe', doch das Team blieb bei der Idee. 200+ Haustiere reichen von einem kleinen Hasen bis zu einem riesigen Wesen.", "In Kämpfen kann man sich in Monster verwandeln und deren Fähigkeiten nutzen — bestätigt, nicht in der Demo gezeigt.", "Für ein F2P-MMO verdoppelt das System das Sammlelebnis mit emotionalem Gehalt."]),
        section("creator-rivals-bdo", "Charakteranpassung auf BDO-Niveau", ["Der Charakterersteller wurde von BDO inspiriert. Farbstufen, Wangenröte und viele weitere Optionen. Klassen decken die klassische Heilige Dreifaltigkeit ab. Flügel bleiben Statussymbol und Funktionswerkzeug."]),
        section("raids-split-and-merge", "10er-Raids, die sich in zwei 5er teilen und dann vereinen", ["Raids sind für 10 Spieler, Dungeons für 5. Zu Beginn kämpfen alle 10 zusammen, dann spalten sie sich in zwei 5er-Gruppen, die später für den Finalboss wieder vereint werden."]),
        section("combat-feel", "Kampf: schnell und ununterbrochen", ["Der Bericht beschreibt den Kampf als 'schneller als Spiele in diesem Genre'. Bosskämpfe erfordern ständige Aufmerksamkeit, Flügel dienen in Verteidigung und Angriff."]),
        section("what-it-means", "Was die Demo für den 5. Okt. bedeutet", ["NetEase finanzierte die Reise und Unterkunft zu Gamescom — ein Zeichen steigender Investition auf westlicher Seite. Die Demo macht das Roadmap-Datum greifbar. Monster-Verwandlung bleibt ein nicht vollständig offengelegter Teaser."]),
      ],
    }),
    es: articleCopy(newsLabels, "es", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "La demo de AION 2 en Gamescom 2026: 200+ mascotas, personalización al nivel de Black Desert, raids de 10 que se dividen en dos grupos de 5",
      description: "MMORPG.com 2 sept.: 200+ mascotas (casi cualquier monstruo se convierte en compañero), personalización de nivel BDO, raids de 10 que se dividen en dos grupos de 5 antes del jefe final.",
      intro: "AION 2 ha hecho más que repetir la fecha del 5 de oct. El estudio mostró una demo jugable y MMORPG.com salió con la mayor confianza hasta ahora.",
      sourceNote: "Basado en MMORPG.com 2 sept. 2026 y el podcast Massively OP 578 (1 sept. 2026), que sitúa AION 2 con Path of Exile 2 como titular de Gamescom.",
      keywords: ["AION 2 Gamescom 2026 demo", "AION 2 mascotas", "AION 2 personalización", "AION 2 raid", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200+ mascotas, casi cualquier monstruo se vuelve compañero", ["Andrew Long, productor senior, bromeó que hacer mascotas de casi todos los monstruos fue un 'desastre', pero el equipo se mantuvo firme. 200+ mascotas van de un pequeño conejo a una criatura gigante.", "En combate, los jugadores pueden transformarse en monstruos y usar sus habilidades — confirmado pero no mostrado en la demo.", "Para un MMO F2P, el sistema duplica el contenido de colección con un gancho emocional."]),
        section("creator-rivals-bdo", "Personalización al nivel de Black Desert Online", ["El creador de personajes se inspiró en BDO. Tintes con degradado, sonrojo en mejillas y muchas más opciones. Clases cubren la trinidad clásica."]),
        section("raids-split-and-merge", "Raids de 10, se dividen en dos de 5 y luego se reúnen", ["Los raids son para 10 jugadores y los mazmorras para 5. Al inicio, los 10 luchan juntos; luego se dividen en dos grupos de 5 y finalmente se reúnen para el jefe final."]),
        section("combat-feel", "Combate: rápido y constante", ["El reportaje describe el combate como 'más rápido que otros juegos del género'. Los jefes exigen atención constante, las alas sirven para defensa y ataque."]),
        section("what-it-means", "Qué significa la demo para el 5 de oct.", ["NetEase cubrió viaje y alojamiento en Gamescom, señal de inversión mayor en occidente. La demo hace tangible la fecha del roadmap. La transformación en monstruo se queda como teaser no completo."]),
      ],
    }),
    "pt-br": articleCopy(newsLabels, "pt-br", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "Demo de AION 2 no Gamescom 2026: 200+ pets, customização no nível de Black Desert, raids de 10 que se dividem em dois de 5",
      description: "MMORPG.com 2 set.: 200+ pets (quase qualquer mob vira companheiro), customização de nível BDO, raids de 10 que se dividem em dois grupos de 5 antes do chefe final.",
      intro: "AION 2 fez mais do que repetir a data de 5 de out. O estúdio apresentou uma demo jogável e MMORPG.com saiu com a maior confiança até agora.",
      sourceNote: "Baseado em MMORPG.com 2 set. 2026 e Massively OP Podcast 578 (1 set. 2026), que coloca AION 2 com Path of Exile 2 como título principal de Gamescom.",
      keywords: ["AION 2 Gamescom 2026 demo", "AION 2 pets", "AION 2 customização", "AION 2 raid", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200+ pets, quase qualquer mob vira companheiro", ["Andrew Long brincou que fazer pets de quase todos os mobs foi um 'desastre', mas a equipe persistiu. 200+ pets vão de um coelho pequeno a uma criatura gigante.", "Em combate, os jogadores podem se transformar em monstros e usar habilidades — confirmado mas não mostrado na demo."]),
        section("creator-rivals-bdo", "Customização no nível de Black Desert Online", ["O criador de personagem se inspirou em BDO. Tons de cor com gradiente, blush no rosto e muitas outras opções. Classes cobrem a tríade clássica."]),
        section("raids-split-and-merge", "Raids de 10, se dividem em dois de 5 e depois se reúnem", ["Raids são para 10 jogadores e dungeons para 5. No início, os 10 lutam juntos; depois se dividem em dois grupos de 5 e finalmente se reúnem para o chefe final."]),
        section("combat-feel", "Combate: rápido e constante", ["O relato descreve o combate como 'mais rápido que outros jogos do gênero'. Chefs exigem atenção contínua, asas servem em defesa e ataque."]),
        section("what-it-means", "O que a demo significa para 5 de out.", ["NetEase pagou viagem e hospedagem no Gamescom, sinal de maior investimento no ocidente. A demo torna tangível a data do roadmap. A transformação em monstro fica como teaser incompleto."]),
      ],
    }),
    ru: articleCopy(newsLabels, "ru", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "Демо AION 2 на Gamescom 2026: 200+ питомцев, кастомизация уровня Black Desert, рейды на 10, распадающиеся на две пятёрки",
      description: "MMORPG.com 2 сент.: 200+ питомцев (почти любой моб становится компаньоном), кастомизация уровня BDO, рейды на 10, делящиеся на две группы по 5 перед финальным боссом.",
      intro: "AION 2 сделал больше, чем повторил дату 5 окт. Студия показала играбельную демо и MMORPG.com ушёл с максимальным доверием.",
      sourceNote: "По данным MMORPG.com 2 сент. 2026 и Massively OP Podcast 578 (1 сент. 2026), которые ставят AION 2 рядом с Path of Exile 2 как заголовок Gamescom.",
      keywords: ["AION 2 Gamescom 2026 демо", "AION 2 питомцы", "AION 2 кастомизация", "AION 2 рейд", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200+ питомцев, почти любой моб становится компаньоном", ["Андрю Лонг пошутил, что превращение всех мобов в питомцев — это «катастрофа», но команда устояла. 200+ питомцев от маленького кролика до гигантского существа.", "В бою можно превратиться в монстра и использовать способности — подтверждено, но не показано в демо."]),
        section("creator-rivals-bdo", "Кастомизация уровня Black Desert Online", ["Создатель персонажа вдохновлён BDO. Костюмы с градиентом, румянец на щеках и многое другое. Классы покрывают классическую троицу."]),
        section("raids-split-and-merge", "Рейды на 10, делятся на две по 5 и затем соединяются", ["Рейды на 10, подземелья на 5. В начале все 10 сражаются вместе, затем делятся на две группы по 5 и собираются для финального босса."]),
        section("combat-feel", "Бой: быстрый и непрерывный", ["Репортаж описывает бой как «быстрее других игр жанра». Боссы требуют постоянного внимания, крылья служат для защиты и атаки."]),
        section("what-it-means", "Что демо означает для 5 окт.", ["NetEase оплатила поездку и проживание на Gamescom — признак растущих инвестиций. Демо делает дату дорожной карты осязаемой. Превращение в монстра остаётся тизером без раскрытия."]),
      ],
    }),
    "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
      eyebrow: "GAMESCOM 2026",
      title: "AION 2 亮相 Gamescom 2026：200+ 寵物像收寶可夢、自訂製逼近平庸、副本 10 人拆 5 組",
      description: "MMORPG.com 9/2 試玩報導：200+ 寵物（幾乎任何怪都能收）、Black Desert 級的角色客製化、10 人副本拆成兩個 5 人組再合体打尾王。記者 Luis Gutierrez 直言這是目前他對 AION 2 10 月 5 日上線的最大信心來源。",
      intro: "AION 2 在 Gamescom 2026 上做的不只重複 10/5 全球上線日期與壓力測試後的路線圖。NetEase 把開發團隊帶到展台跑試玩，MMORPG.com 的 Luis Gutierrez 於 9 月 2 日通關並給出明確結論：這是目前他對 AION 2 最强烈的信心來源。",
      sourceNote: "基於 MMORPG.com 2026 年 9 月 2 日 Gamescom 試玩報導（Luis Gutierrez）與 Massively OP Podcast 578 期節目簡介（2026-09-01），後者將 AION 2 與 Path of Exile 2 並列為 Gamescom 頭條。",
      keywords: ["AION 2 Gamescom 2026 試玩", "AION 2 寵物", "AION 2 角色客製化", "AION 2 副本 Boss", "AION 2 NetEase"],
      sections: [
        section("pets-everywhere", "200+ 宠物，幾乎任何怪都能收", ["AION 2 高級製作人 Andrew Long 玩笑說把所有怪變成寵物是「災難」，但團隊「頭鐵」把它做了。", "超過 200 隻寵物可選；擊敗怪後不是爆裝備，而是把它變成同伴。範圍從小兔到巨型古神巨獸，後者甚至能背你進城或把你裝進棺材。", "玩家也可以在戰鬥中變身成怪物並使用技能——試玩未直接展示但團隊已確認。", "對免費遊戲而言，寵物系統是收集內容也是情感鉤子；對 MMO 老兵而言，它是 AION 2 相較原版投入深度的最直觀信號。"]),
        section("creator-rivals-bdo", "角色客製化向 Black Desert Online 看齊", ["製作人是記者最花時間的一步，團隊直接借鑒 Black Desert Online。", "選項包括帶可調漸變長度的髮色、腮紅位置、以及一堆進階微調。職業覆蓋 Tank/DPS/Heal 鐵三角，身分不只是外觀。", "翅膀——源自原版 AION 的核心功能——仍是關鍵視覺與功能性的地位象徵，透過里程碑與玩法解鎖。"]),
        section("raids-split-and-merge", "副本 10 人拆 5 組，尾王再合體", ["副本支持 10 人，地下城 5 人。開局 10 人齊上，再拆成兩個 5 人組同時打不同 Boss。", "兩個組在尾王處合併，MMORPG.com 稱之為「獨特設計」。", "10 對 5 的規模搭配 5 人地下城，讓空中 PVE 保持緊湊。"]),
        section("combat-feel", "戰鬥：快節奏，不讓你放空", ["記者稱戰鬥「比同類遊戲更快節奏」。Boss 戰每兩秒就有一個新攻擊來襲，反擊窗口很窄。", "翅膀不只是裝飾：可用於防禦（閃避）和進攻（空中戰鬥）。怪物變身是爆發與工具屬性的疊加層。", "對期待 AION 時代戰鬥的老玩家，節奏是明顯進化；對期待慢 MMO 的新玩家，需事先知曉。"]),
        section("what-it-means", "對 10 月 5 日的意義", ["NetEase（與 NCSoft 共同發行的西向推廣方）包攬了 Gamescom 的差旅——西向投入升級的信號。", "結合已確認的 10/5 全球上線、已完成的壓力測試、以及 Massively OP 播客提及的預上線 Headstart，試玩把「路線圖上的日期」變成了「已經能上手摸到的遊戲」。", "值得注意是試玩版中未直接展示怪物變身——這一「已確認未展示」的功能保留為懸念而非完整說明。"]),
      ],
    }),
  },
};