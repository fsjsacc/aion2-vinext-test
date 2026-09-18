import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-20-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 5 — Trinity roles guide */

const trinitySource1: ContentSource = {
  id: "mmobomb-stream-roles-2026-08-20", kind: "third-party", publisher: "MMOBomb",
  label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
  url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream",
  publishedAt: "2026-08-10", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "NC 首次全球开发者直播：Aion 2 玩家可期待什么", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre du lancement", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar en el lanzamiento", ja: "NCが初のグローバル開発者ストリームでAion 2プレイヤーが発売時に期待できることを共有", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar no lançamento", ru: "NC делится тем, что игроки Aion 2 могут ожидать от запуска", ko: "NC, 첫 글로벌 개발자 스트림에서 Aion 2 플레이어가 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 首次全球開發者直播：Aion 2 玩家可期待什麼", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"),
};
const trinitySource2: ContentSource = {
  id: "aion2hub-8classes-2026-08-20", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 — 8 Classes at Launch: Trinity Roles Overview",
  url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2 — 上线 8 职业：铁三角角色概览", en: "AION 2 — 8 Classes at Launch: Trinity Roles Overview", fr: "AION 2 — 8 classes au lancement : aperçu des rôles de la trinité", de: "AION 2 — 8 Klassen beim Launch: Rollenübersicht der Trinität", es: "AION 2 — 8 clases en el lanzamiento: descripción general de los roles de la trinidad", ja: "AION 2 — ローンチ8クラス：トリニティロール概要", "pt-br": "AION 2 — 8 classes no lançamento: visão geral dos papéis da trindade", ru: "AION 2 — 8 классов при запуске: обзор ролей триады", ko: "AION 2 — 출시 8개 클래스: 트리니티 역할 개요", "zh-hant": "AION 2 — 上線 8 職業：鐵三角角色概覽", }, "https://aion2hub.com/"),
};
const trinitySource3: ContentSource = {
  id: "plaync-roles-2026-08-20", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 파티 포지션/역할 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-08-12", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 队伍定位/角色说明", en: "AION 2 (KR) — Party Role Guide", fr: "AION 2 (KR) — Guide des rôles de groupe", de: "AION 2 (KR) — Gruppenrollen-Guide", es: "AION 2 (KR) — Guía de roles de grupo", ja: "AION 2 (KR) — パーティーロールガイド", "pt-br": "AION 2 (KR) — Guia de papéis de grupo", ru: "AION 2 (KR) — Гайд по ролям в группе", ko: "AION 2 (KR) — 파티 포지션/역할 안내", "zh-hant": "AION 2（韓服）— 隊伍定位/角色說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const trinityHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "铁三角角色指南配图", caption: "NC 官方配图；理解坦克、输出与治疗角色是团队内容的核心。" }, en: { alt: "Trinity roles guide image", caption: "Official NC artwork; understanding tank, DPS, and healer roles is core to group content." }, fr: { alt: "Image du guide des rôles de la trinité", caption: "Visuel officiel NC ; comprendre les rôles de tank, DPS et soigneur est essentiel." }, de: { alt: "Trinitäts-Rollen-Guide-Bild", caption: "Offizielles NC-Artwork; Tank-, DPS- und Heiler-Rollen sind der Kern des Gruppeninhalts." }, es: { alt: "Imagen de la guía de roles de la trinidad", caption: "Arte oficial de NC; entender los roles de tanque, DPS y sanador es clave." }, ja: { alt: "トリニティロールガイド画像", caption: "NC公式アートワーク；タンク、DPS、ヒーラーの役割理解はグループコンテンツの核心です。" }, "pt-br": { alt: "Imagem do guia de papéis da trindade", caption: "Arte oficial da NC; entender tanque, DPS e curandeiro é essencial." }, ru: { alt: "Изображение гайда по ролям триады", caption: "Официальный арт NC; понимание ролей танка, ДПС и хила — основа группового контента." }, ko: { alt: "트리니티 역할 가이드 이미지", caption: "NC 공식 이미지입니다. 탱커, DPS, 힐러 역할 이해는 그룹 콘텐츠의 핵심입니다." }, "zh-hant": { alt: "鐵三角角色指南配圖", caption: "NC 官方配圖；理解坦克、輸出與治療角色是團隊內容的核心。" }, },
};

export const trendingAugust20Article5: ContentEntry = {
  section: "guides", slug: "aion-2-trinity-roles-guide", schemaType: "Article",
  publishedAt: "2026-08-20", updatedAt: "2026-08-20", readingMinutes: 5,
  publication: publishedVerified,
  sources: [trinitySource1, trinitySource2, trinitySource3],
  heroImage: trinityHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-launch-classes-guide" },
    { kind: "content", section: "guides", slug: "aion-2-dps-meter-guide" },
    { kind: "content", section: "guides", slug: "aion-2-pvp-guide-battlegrounds-abyss" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "ROLE PLAY GUIDE", title: "Aion 2 Trinity Roles Guide: Tank, DPS & Healer Basics",
      description: "Aion 2's group content runs on the classic trinity — tanks, DPS, and healers. Learn each role's core job, how the 8 launch classes map to it, and how the healing rework shapes healer play.",
      intro: "Every expedition and raid in Aion 2 is a trinity composition: a tank holds threat, DPS burn the boss, and healers keep the group alive. With eight classes at launch mapping to two tanks, four DPS, and two healers, understanding your role's job is the fastest way to become a better group member. This guide breaks down each pillar of the trinity.",
      sourceNote: "Based on the August 7 dev stream class breakdown, the August 12 healing rework notes, and published group-content structures.",
      keywords: ["Aion 2 tank guide", "Aion 2 healer guide", "Aion 2 DPS guide", "Aion 2 trinity roles", "Aion 2 party composition"],
      sections: [
        section("tank", "Tank: Holding Threat & Positioning", ["Tanks in Aion 2 are the Gladiator and the Templar. Their job is holding boss threat and controlling position — keeping the encounter facing away from the group and placing bosses out of void zones.", "Good tanks read the fight ahead: pre-positioning before mechanics, using defensive cooldowns before big hits, and communicating reposition calls. The two tank classes differ in flavor — Gladiator leans into heavy frontline damage while Templar emphasizes blocking and buffing — but the job is the same: hold, position, survive."]),
        section("dps", "DPS: Damage, Priority & Uptime", ["The four DPS classes are the Assassin, Ranger, Sorcerer, and Spirit Master. Their core job is consistent damage output with proper skill priority and positioning for mechanics.", "What separates good DPS is uptime: being in range, pressing skills on cooldown, and handling mechanics without dropping damage. Community parsers (like AionFlex and the built-in meter) exist precisely to measure this. In 10v10 battlegrounds the same classes shift focus to target selection over raw throughput."]),
        section("healer", "Healer: Cleric vs Chanter & the Rework", ["The two healers are the Cleric — the traditional, reliable healer — and the Chanter, who blends buffs with heavy damage. Since the August 12 rework, heals cover a 40m radius but heal for 20-50% less, with healing passives scaling off attack power.", "The practical result: healers now reward positioning and steady casting over panic bursts. Groups spread wider benefit from the larger radius; healers who touch up the party consistently outperform those who save big heals for emergencies."]),
        section("compose", "Composition & Getting Started", ["5-player expeditions generally follow 1 tank / 2-3 DPS / 1-2 healers, and the 10-player raid scales it up. The August 12 patch set dungeons at 5 and the first raid at 10 players.", "For launch, queue with one of each role covered when possible. If you are new, try each role archetype early — the four character slots per server are perfect for testing a tank, DPS, healer, and flex pick before committing."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "角色定位指南", title: "Aion 2 铁三角角色指南：坦克、输出与治疗基础",
      description: "Aion 2 的团队内容基于经典铁三角——坦克、输出与治疗。了解每个角色的核心工作、8 个上线职业如何映射，以及治疗改版如何塑造治疗玩法。",
      intro: "Aion 2 的每个远征与团本都是铁三角组队：坦克拉住仇恨、输出压制 BOSS、治疗维持队伍存活。上线 8 个职业映射为 2 坦克、4 输出与 2 治疗，理解你的角色职责是成为更好队员的最快途径。本指南拆解铁三角的每一支柱。",
      sourceNote: "基于 8 月 7 日开发者直播职业划分、8 月 12 日治疗改版说明与已公开的团队内容结构。",
      keywords: ["Aion 2 坦克指南", "Aion 2 治疗指南", "Aion 2 输出指南", "Aion 2 铁三角", "Aion 2 队伍配置"],
      sections: [
        section("tank", "坦克：拉住仇恨与控制位置", ["Aion 2 的坦克是剑星与守护星。职责是拉住 BOSS 仇恨与控制位置——让遭遇面远离队伍，将 BOSS 带离危险区域。", "优秀坦克预读战斗：机制前预先站位、大招前用防御技能、沟通位移指令。两个坦克职业风格不同——剑星偏重正面高伤害，守护星强调格挡与增益——但职责相同：拉住、站位、存活。"]),
        section("dps", "输出：伤害、优先级与利用率", ["四个输出职业是刺客、弓星、法师与精灵星。核心职责是稳定的伤害输出，配合正确的技能优先级与机制站位。", "区分优秀输出的关键是用效率：在射程内、按时施放技能、处理机制不掉伤害。社区解析器（AionFlex 与内置计量表）正是为此而生。10v10 战场中同类职业更关注目标选择而非纯吞吐量。"]),
        section("healer", "治疗：牧师 vs 吟游星与改版", ["两个治疗职业是牧师——传统可靠的治疗者——与吟游星——融合增益与高伤害。自 8 月 12 日改版以来，治疗覆盖 40 米半径但效果降低 20-50%，治疗被动改为随攻击力成长。", "实际结果是：治疗者现在奖励站位与稳定施法而非爆发救急。分散的队伍受益于更大半径；持续补满队伍的治疗者优于攒大治疗应急者。"]),
        section("compose", "配置与入门", ["5 人远征通常为 1 坦克 / 2-3 输出 / 1-2 治疗，10 人团本相应放大。8 月 12 日补丁将副本定为 5 人、首个团本定为 10 人。", "上线组队时尽量覆盖每个角色。如果你是新手，尽早试玩每种角色原型——每服务器 4 个角色位非常适合在投入前测试坦克、输出、治疗与灵活位。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "역할 가이드", title: "Aion 2 트리니티 역할 가이드: 탱커, DPS와 힐러 기본",
      description: "Aion 2의 그룹 콘텐츠는 클래식 트리니티 — 탱커, DPS, 힐러 — 로 돌아갑니다. 각 역할의 핵심 임무, 8개 출시 클래스 매핑, 힐링 리워크가 힐러 플레이를 바꾸는 방식을 알아보세요.",
      intro: "Aion 2의 모든 원정대와 레이드는 트리니티 조합입니다: 탱커가 어그로를 잡고, DPS가 보스를 태우며, 힐러가 파티를 살립니다. 출시 8개 클래스가 탱커 2, DPS 4, 힐러 2로 매핑되는 가운데, 역할을 이해하는 것이 더 나은 파티원이 되는 가장 빠른 길입니다.",
      sourceNote: "8월 7일 개발자 스트림 클래스 구분, 8월 12일 힐링 리워크 노트, 공개된 그룹 콘텐츠 구조에 기반합니다.",
      keywords: ["Aion 2 탱커 가이드", "Aion 2 힐러 가이드", "Aion 2 DPS 가이드", "Aion 2 트리니티", "Aion 2 파티 구성"],
      sections: [
        section("tank", "탱커: 어그로와 위치", ["탱커는 글래디에이터와 템플러. 보스 어그로를 잡고 위치를 통제하는 것이 임무입니다.", "좋은 탱커는 메커닉 전에 자리를 잡고, 큰 피해 전에 방어 쿨을 씁니다."]),
        section("dps", "DPS: 피해와 업타임", ["어쌔신, 레인저, 소서러, 스피릿 마스터. 핵심은 일관된 피해와 업타임입니다.", "파서(내장/AionFlex)가 업타임을 측정합니다. 10v10 전장에서는 표적 선택에 집중합니다."]),
        section("healer", "힐러: 클레릭 vs 챈터", ["클레릭은 전통 힐러, 챈터는 버프+고딜. 8월 12일 리워크로 40m 범위·20-50% 출력 감소·공격력 연동 패시브.", "이제 위치 선정과 꾸준한 시전을 보상합니다."]),
        section("compose", "구성과 시작", ["5인 원정대는 1탱/2-3딜/1-2힐. 4개 캐릭터 슬롯으로 각 역할을 미리 테스트해 보세요."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "ロールガイド", title: "Aion 2 トリニティロールガイド：タンク、DPS、ヒーラー基礎",
      description: "Aion 2 のグループコンテンツはクラシックなトリニティ — タンク、DPS、ヒーラー — で構成されます。各ロールの役割、8つのローンチクラスのマッピング、ヒーリングリワークの影響を解説します。",
      intro: "Aion 2 のすべての遠征とレイドはトリニティ構成です：タンクがヘイトを保持し、DPSがボスを削り、ヒーラーがグループを生かします。8クラスがタンク2、DPS4、ヒーラー2にマッピングされる中、自分の役割を理解することが最速の上達方法です。",
      sourceNote: "8月7日の開発者ストリームのクラス分類、8月12日のヒーリングリワークノート、公開されたグループコンテンツ構造に基づきます。",
      keywords: ["Aion 2 タンクガイド", "Aion 2 ヒーラーガイド", "Aion 2 DPSガイド", "Aion 2 トリニティ", "Aion 2 パーティ構成"],
      sections: [
        section("tank", "タンク：ヘイトと位置取り", ["タンクはグラディエーターとテンプラー。ボスのヘイト保持と位置制御が任務です。", "良いタンクはメカニクス前に立ち位置を決め、大ダメージ前に防御クールを使います。"]),
        section("dps", "DPS：ダメージとアップタイム", ["アサシン、レンジャー、ソーサラー、スピリットマスター。一貫したダメージとアップタイムが核心です。", "パーサー(内蔵/AionFlex)がアップタイムを測定します。10v10戦場では標的選択に集中します。"]),
        section("healer", "ヒーラー：クレリック vs チャンター", ["クレリックは伝統ヒーラー、チャンターはバフ+高ダメージ。8月12日リワークで40m範囲・20-50%出力減・攻撃力連動パッシブ。", "ポジショニングと安定詠唱が報われるようになりました。"]),
        section("compose", "構成と開始", ["5人遠征は1タン/2-3DPS/1-2ヒーラー。4つのキャラクタースロットで各ロールを先にテストしましょう。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE DES RÔLES", title: "Guide de la trinité d'Aion 2 : tank, DPS et soigneur",
      description: "Le contenu de groupe d'Aion 2 repose sur la trinité classique. Rôle de chacun, mapping des 8 classes et impact du rework des soins.",
      intro: "Chaque expédition est une composition trinité : un tank, des DPS et des soigneurs. Comprendre son rôle est le plus rapide pour bien jouer en groupe.",
      sourceNote: "Basé sur le classement des classes du dev stream du 7 août et les notes de rework du 12 août.",
      keywords: ["Aion 2 tank", "Aion 2 soigneur", "Aion 2 DPS", "Aion 2 trinité"],
      sections: [
        section("tank", "Tank", ["Gladiateur et Templier : tenir l'agro, contrôler la position, survivre aux gros coups."]),
        section("dps", "DPS", ["Assassin, Ranger, Sorcier et Maître des esprits : dégâts constants, priorité des compétences, uptime."]),
        section("healer", "Soigneur", ["Clerc et Chanteur : portée de 40 m, -20 à 50 % de puissance depuis le 12 août. Le positionnement compte."]),
        section("compose", "Composition", ["1 tank / 2-3 DPS / 1-2 soigneurs en 5 joueurs. Testez chaque rôle avec les 4 slots."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "ROLLEN-GUIDE", title: "Aion 2 Trinitäts-Rollen-Guide: Tank, DPS & Heiler",
      description: "Aion 2s Gruppeninhalte basieren auf der klassischen Trinität. Rolle jedes Spielers, Mapping der 8 Klassen und Auswirkungen des Heilungs-Reworks.",
      intro: "Jede Expedition ist eine Trinitäts-Komposition: Tank, DPS und Heiler. Das Verständnis seiner Rolle ist der schnellste Weg, gut in Gruppen zu spielen.",
      sourceNote: "Basierend auf der Klassenaufteilung des Dev-Streams vom 7. August und den Rework-Notizen vom 12. August.",
      keywords: ["Aion 2 Tank", "Aion 2 Heiler", "Aion 2 DPS", "Aion 2 Trinität"],
      sections: [
        section("tank", "Tank", ["Gladiator und Templer: Aggro halten, Position kontrollieren, große Treffer überleben."]),
        section("dps", "DPS", ["Assassine, Waldläufer, Zauberer und Geistmeister: konstanter Schaden, Skill-Priorität, Uptime."]),
        section("healer", "Heiler", ["Cleric und Chanter: 40-m-Reichweite, -20 bis 50 % Wirkung seit dem 12. August. Positionierung zählt."]),
        section("compose", "Komposition", ["1 Tank / 2-3 DPS / 1-2 Heiler in 5 Spielern. Testen Sie jede Rolle mit den 4 Slots."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DE ROLES", title: "Guía de la trinidad de Aion 2: tanque, DPS y sanador",
      description: "El contenido de grupo de Aion 2 se basa en la trinidad clásica. Rol de cada uno, mapeo de las 8 clases e impacto del rework de sanación.",
      intro: "Cada expedición es una composición de trinidad: tanque, DPS y sanadores. Entender tu rol es la vía rápida para jugar bien en grupo.",
      sourceNote: "Basado en el desglose de clases del dev stream del 7 de agosto y las notas de rework del 12 de agosto.",
      keywords: ["Aion 2 tanque", "Aion 2 sanador", "Aion 2 DPS", "Aion 2 trinidad"],
      sections: [
        section("tank", "Tanque", ["Gladiador y Templario: mantener amenaza, controlar posición, sobrevivir golpes grandes."]),
        section("dps", "DPS", ["Asesino, Ranger, Hechicero y Maestro de Espíritus: daño constante, prioridad de habilidades, uptime."]),
        section("healer", "Sanador", ["Clérigo y Cantor: alcance de 40 m, -20 a 50 % de poder desde el 12 de agosto. El posicionamiento importa."]),
        section("compose", "Composición", ["1 tanque / 2-3 DPS / 1-2 sanadores en 5 jugadores. Prueba cada rol con los 4 espacios."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DE PAPÉIS", title: "Guia da trindade de Aion 2: tanque, DPS e curandeiro",
      description: "O conteúdo de grupo de Aion 2 se baseia na trindade clássica. Papel de cada um, mapeamento das 8 classes e impacto do rework de cura.",
      intro: "Cada expedição é uma composição de trindade: tanque, DPS e curandeiros. Entender seu papel é o caminho rápido para jogar bem em grupo.",
      sourceNote: "Baseado na divisão de classes do dev stream de 7 de agosto e nas notas de rework de 12 de agosto.",
      keywords: ["Aion 2 tanque", "Aion 2 curandeiro", "Aion 2 DPS", "Aion 2 trindade"],
      sections: [
        section("tank", "Tanque", ["Gladiador e Templário: segurar ameaça, controlar posição, sobreviver golpes grandes."]),
        section("dps", "DPS", ["Assassino, Ranger, Feiticeiro e Mestre de Espíritos: dano constante, prioridade de habilidades, uptime."]),
        section("healer", "Curandeiro", ["Clérigo e Cantor: alcance de 40 m, -20 a 50 % de poder desde 12 de agosto. Posicionamento importa."]),
        section("compose", "Composição", ["1 tanque / 2-3 DPS / 1-2 curandeiros em 5 jogadores. Teste cada papel com os 4 slots."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ГАЙД ПО РОЛЯМ", title: "Гайд по триаде Aion 2: танк, ДПС и хил",
      description: "Групповой контент Aion 2 строится на классической триаде. Роль каждого, маппинг 8 классов и влияние реворка лечения.",
      intro: "Каждая экспедиция — триадная композиция: танк, ДПС и хилы. Понимание своей роли — быстрый путь к хорошей групповой игре.",
      sourceNote: "На основе разбивки классов dev-стрима от 7 августа и записей реворка от 12 августа.",
      keywords: ["Aion 2 танк", "Aion 2 хил", "Aion 2 ДПС", "Aion 2 триада"],
      sections: [
        section("tank", "Танк", ["Гладиатор и Храмовник: держать угрозу, контролировать позицию, выживать под большими ударами."]),
        section("dps", "ДПС", ["Ассасин, Рейнджер, Колдун и Мастер духов: постоянный урон, приоритет навыков, аптайм."]),
        section("healer", "Хил", ["Клирик и Заклинатель: радиус 40 м, −20–50 % силы с 12 августа. Позиционирование важно."]),
        section("compose", "Состав", ["1 танк / 2-3 ДПС / 1-2 хила на 5 игроков. Протестируйте каждую роль 4 слотами."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "角色定位指南", title: "Aion 2 鐵三角角色指南：坦克、輸出與治療基礎",
      description: "Aion 2 的團隊內容基於經典鐵三角——坦克、輸出與治療。了解每個角色的核心工作、8 個上線職業如何映射，以及治療改版如何塑造治療玩法。",
      intro: "Aion 2 的每個遠征與團本都是鐵三角組隊：坦克拉住仇恨、輸出壓制 BOSS、治療維持隊伍存活。上線 8 個職業映射為 2 坦克、4 輸出與 2 治療，理解你的角色職責是成為更好隊員的最快途徑。本指南拆解鐵三角的每一支柱。",
      sourceNote: "基於 8 月 7 日開發者直播職業劃分、8 月 12 日治療改版說明與已公開的團隊內容結構。",
      keywords: ["Aion 2 坦克指南", "Aion 2 治療指南", "Aion 2 輸出指南", "Aion 2 鐵三角", "Aion 2 隊伍配置"],
      sections: [
        section("tank", "坦克：拉住仇恨與控制位置", ["Aion 2 的坦克是劍星與守護星。職責是拉住 BOSS 仇恨與控制位置——讓遭遇面遠離隊伍，將 BOSS 帶離危險區域。", "優秀坦克預讀戰鬥：機制前預先站位、大招前用防禦技能、溝通位移指令。兩個坦克職業風格不同——劍星偏重正面高傷害，守護星強調格擋與增益——但職責相同：拉住、站位、存活。"]),
        section("dps", "輸出：傷害、優先級與利用率", ["四個輸出職業是刺客、弓星、法師與精靈星。核心職責是穩定的傷害輸出，配合正確的技能優先級與機制站位。", "區分優秀輸出的關鍵是使用效率：在射程內、按時施放技能、處理機制不掉傷害。社群解析器（AionFlex 與內建計量表）正是為此而生。10v10 戰場中同類職業更關注目標選擇而非純吞吐量。"]),
        section("healer", "治療：牧師 vs 吟遊星與改版", ["兩個治療職業是牧師——傳統可靠的治療者——與吟遊星——融合增益與高傷害。自 8 月 12 日改版以來，治療覆蓋 40 米半徑但效果降低 20-50%，治療被動改為隨攻擊力成長。", "實際結果是：治療者現在獎勵站位與穩定施法而非爆發救急。分散的隊伍受益於更大半徑；持續補滿隊伍的治療者優於攢大治療應急者。"]),
        section("compose", "配置與入門", ["5 人遠征通常為 1 坦克 / 2-3 輸出 / 1-2 治療，10 人團本相應放大。8 月 12 日補丁將副本定為 5 人、首個團本定為 10 人。", "上線組隊時盡量覆蓋每個角色。如果你是新手，盡早試玩每種角色原型——每伺服器 4 個角色欄位非常適合在投入前測試坦克、輸出、治療與靈活位。"]),
      ],
    }),
  },
};