import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { ContentLocale } from "./site-config";

type ArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote" | "sections"
> & { keywords?: readonly string[] };

const labels = {
  "zh-hant": {
    byline: "AION2 KINA 編輯團隊",
    backLabel: "返回職業中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "最後核對",
    relatedLabel: "相關內容",
  },
  en: {
    byline: "AION2 KINA Editorial",
    backLabel: "Back to classes",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  ko: {
    byline: "AION2 KINA 편집팀",
    backLabel: "클래스 허브로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "KINA 게시",
    updatedLabel: "마지막 확인",
    relatedLabel: "관련 콘텐츠",
  },
} as const;

function articleCopy(locale: ContentLocale, body: ArticleBody): LocalizedContent {
  const readingTime = {
    "zh-hant": "約 7 分鐘",
    en: "7 min read",
    ko: "약 7분",
  }[locale];
  return { ...labels[locale], readingTime, ...body };
}

const publication = {
  status: "published",
  indexable: true,
  localeReview: { "zh-hant": "approved", en: "approved", ko: "approved" },
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

function guidebookSource(id: string, label: string, title: string): ContentSource {
  return {
    id,
    kind: "official",
    publisher: "NC Corporation",
    label,
    url: `https://aion2.plaync.com/ko-kr/guidebook/view?title=${encodeURIComponent(title)}`,
    retrievedAt: "2026-07-14",
    verifiedAt: "2026-07-14",
  };
}

const sources = [
  guidebookSource("guide-gladiator", "Official Guidebook: Gladiator", "검성"),
  guidebookSource("guide-templar", "Official Guidebook: Templar", "수호성"),
  guidebookSource("guide-assassin", "Official Guidebook: Assassin", "살성"),
  guidebookSource("guide-ranger", "Official Guidebook: Ranger", "궁성"),
  guidebookSource("guide-sorcerer", "Official Guidebook: Sorcerer", "마도성"),
  guidebookSource("guide-spiritmaster", "Official Guidebook: Spiritmaster", "정령성"),
  guidebookSource("guide-cleric", "Official Guidebook: Cleric", "치유성"),
  guidebookSource("guide-chanter", "Official Guidebook: Chanter", "호법성"),
  {
    id: "global-class-roster",
    kind: "official",
    publisher: "NC Corporation",
    label: "Official global teaser: English class roster",
    url: "https://aion2.ncsoft.jp/en/teaser",
    retrievedAt: "2026-07-14",
    verifiedAt: "2026-07-14",
  },
  {
    id: "core-class-reveal",
    kind: "official",
    publisher: "NC Corporation",
    label: "AION2 core content reveal: eight playable classes",
    url: "https://about.ncsoft.com/en/news/article/aion2-update-250530-2",
    publishedAt: "2025-06-04",
    retrievedAt: "2026-07-14",
    verifiedAt: "2026-07-14",
  },
] as const satisfies readonly ContentSource[];

const overviewUrl =
  "https://aion2.plaync.com/ko-kr/guidebook/view?title=%ED%81%B4%EB%9E%98%EC%8A%A4%20%EC%86%8C%EA%B0%9C";

const heroImage = {
  src: "https://fizz-download.playnccdn.com/download/v2/buckets/guidebook/files/19a8f6a3698-672c7082-3c90-46e9-ba88-4c3aa1d36419",
  width: 520,
  height: 308,
  credit: "NC Corporation / AION2 official Guidebook",
  sourceUrl: overviewUrl,
  rights: "linked-official-media",
  presentation: "contain",
  translations: {
    "zh-hant": {
      alt: "AION2 官方 Guidebook 基礎職業總覽縮圖",
      caption: "NC 官方 Guidebook 的職業介紹縮圖；武器與定位以各職業官方頁面為準。",
    },
    en: {
      alt: "AION2 official Guidebook class-overview thumbnail",
      caption: "Official NC Guidebook class-overview thumbnail; weapons and roles are checked against each official class page.",
    },
    ko: {
      alt: "AION2 공식 가이드북 기본 클래스 소개 썸네일",
      caption: "NC 공식 가이드북 클래스 소개 썸네일이며, 무기와 역할은 각 클래스 공식 페이지를 대조했습니다.",
    },
  },
} as const satisfies ContentHeroImage;

export const baseClassRosterContentEntries = [
  {
    section: "classes",
    slug: "base-class-roster",
    schemaType: "Article",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-26",
    readingMinutes: 7,
    publication,
    sources,
    heroImage,
    related: [
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "content", section: "classes", slug: "brawler" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", {
        eyebrow: "官方職業資料",
        title: "AION2 八大基礎職業總覽：官方定位、武器與版本邊界",
        description: "依 NC 官方 Guidebook 核對 AION2 八大基礎職業的中英韓名稱、專用武器與官方定位，不加入未核實的 Build、倍率或排名。",
        intro: "這份名單整理 NC 官方職業介紹。「八大基礎職業」指 2025 年官方最初公開的八個職業，不代表遊戲內稀有度、階級或強弱分類。",
        sourceNote: "武器與定位逐一核對 NC 官方韓文 Guidebook；英文名稱另與官方全球預告站對照。核對日期 2026-07-14。",
        keywords: ["AION2 職業", "AION2 職業選擇", "AION2 八大職業", "AION2 class list"],
        sections: [
          {
            id: "scope",
            title: "可確認的資料範圍",
            paragraphs: [
              "NC 於 2025 年核心內容公開資料中列出八個可玩職業。現行韓文官方 Guidebook 為每個職業提供一頁介紹，包含主要角色、戰鬥方式與佩戴武器。下列定位是對官方文字的摘要，不是玩家排行榜。",
              "官方全球預告站目前列出 Gladiator、Templar、Assassin、Ranger、Sorcerer、SpiritMaster、Cleric 與 Chanter，本頁使用這組現行英文名稱。",
            ],
          },
          {
            id: "official-roster",
            title: "八職業的官方武器與定位",
            paragraphs: ["每項都以同一職業的官方 Guidebook 頁面為核心來源，並保留英文與韓文原名方便跨語搜尋。"],
            bullets: [
              "劍星（Gladiator / 검성）— 大劍；近戰輸出，擁有較高攻防，官方並提到可兼任副坦克。",
              "守護星（Templar / 수호성）— 長劍與盾牌；阻擋攻擊、保護隊友的前線坦克。",
              "殺星（Assassin / 살성）— 雙手短劍；利用隱身、快速連擊與狀態異常在短時間壓制目標。",
              "弓星（Ranger / 궁성）— 弓；遠距離攻擊，重視站位、時機與戰術應對。",
              "魔道星（Sorcerer / 마도성）— 魔法書；專注短時間高魔法傷害的遠程輸出，需注意距離與控場。",
              "精靈星（Spiritmaster / 정령성）— 寶珠；召喚屬性精靈，並使用狀態異常與持續傷害虛弱敵人。",
              "治癒星（Cleric / 치유성）— 戰鎚；以回復技能維持隊友生存與戰鬥續航的核心治療者。",
              "護法星（Chanter / 호법성）— 法杖；以真言強化隊友，並可兼顧控場、輔助治療與輸出。",
            ],
          },
          {
            id: "not-a-build-guide",
            title: "官方介紹不等於 Build 答案",
            paragraphs: [
              "這些來源可證明名稱、武器與高階定位，但不能單獨證明哪個職業「最強」、某組技能順序永久最優，或某套屬性在 PvE 與 PvP 都通用。",
              "選職業時可先用武器、隊伍定位與操作方式縮小範圍；實際 Build、技能倍率、屬性優先序與強度比較，請再對照當期版本及所在伺服器的資料。",
            ],
          },
          {
            id: "version-boundary",
            title: "2026-07-14 版本邊界",
            paragraphs: [
              "武器與定位來自目前可存取的韓文官方 Guidebook；英文名稱來自官方全球預告站。這些頁面未保證各地區的數值、技能平衡或上線版本完全相同。",
              "實際技能、傷害與裝備規則必須回到玩家所在地區的當期官方更新公告再確認。",
            ],
          },
        ],
      }),
      en: articleCopy("en", {
        eyebrow: "OFFICIAL CLASS REFERENCE",
        title: "AION2 Classes: All Eight Official Roles, Weapons, and Class Names",
        description: "Compare all eight AION2 classes by official role and weapon: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter.",
        intro: "Answer first: the eight AION2 base classes in NC's official roster are Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter. This page compares their official weapons and high-level roles; “base classes” does not mean an in-game rarity, tier, or power category.",
        sourceNote: "Roles and weapons were checked class by class in NC's Korean Guidebook; English names were cross-checked against the official global teaser. Verified 2026-07-14.",
        keywords: ["AION2 classes", "AION2 class list", "AION2 class weapons", "AION2 class roles"],
        sections: [
          {
            id: "scope",
            title: "What this roster can establish",
            paragraphs: [
              "NC's 2025 core-content reveal introduced eight playable classes. The current Korean official Guidebook gives each an individual page naming its main role, combat approach, and equipped weapon. The matrix below compresses that official wording; it is not a community tier list.",
              "The official global teaser currently lists Gladiator, Templar, Assassin, Ranger, Sorcerer, SpiritMaster, Cleric, and Chanter. This page follows those current English labels.",
            ],
          },
          {
            id: "official-roster",
            title: "Official weapons and roles for all eight classes",
            paragraphs: ["Every row is anchored to the corresponding NC Guidebook page, with Korean and Traditional Chinese names retained for verification."],
            bullets: [
              "Gladiator (劍星 / 검성) — Greatsword; a melee damage role with high attack and defense, also described by NC as capable of sub-tanking.",
              "Templar (守護星 / 수호성) — Longsword and shield; a frontline tank that blocks attacks and protects allies.",
              "Assassin (殺星 / 살성) — Dual daggers; uses stealth, fast chains, and status effects to pressure a target in a short window.",
              "Ranger (弓星 / 궁성) — Bow; ranged attacks shaped by positioning, timing, and tactical response.",
              "Sorcerer (魔道星 / 마도성) — Spellbook; ranged magic damage in a short window, with range and control management required.",
              "Spiritmaster (精靈星 / 정령성) — Orb; summons elemental spirits and weakens enemies through status effects and damage over time.",
              "Cleric (治癒星 / 치유성) — Mace; the core healer that maintains allied health and combat endurance.",
              "Chanter (護法星 / 호법성) — Staff; uses mantras to strengthen allies and can contribute control, secondary healing, and damage.",
            ],
          },
          {
            id: "not-a-build-guide",
            title: "An official description is not a build answer",
            paragraphs: [
              "These sources establish names, weapons, and high-level roles. They do not prove that a class is “best,” that one skill order is permanently optimal, or that one stat package applies unchanged to both PvE and PvP.",
              "Start by narrowing your choices by weapon, party role, and combat style. For builds, skill coefficients, stat priorities, and strength comparisons, check information dated for your current patch and service region.",
            ],
          },
          {
            id: "version-boundary",
            title: "Version boundary as of 2026-07-14",
            paragraphs: [
              "Weapon and role wording comes from the accessible Korean official Guidebook; English names come from the official global teaser. Those pages do not promise identical coefficients, skill balance, or launch builds in every service region.",
              "Recheck actual skills, damage, and equipment rules against the dated official update notes for the service region being played.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", {
        eyebrow: "공식 클래스 자료",
        title: "AION2 8개 기본 클래스: 공식 역할·무기·버전 범위",
        description: "NC 공식 가이드북을 기준으로 AION2 8개 기본 클래스의 한·영·중 이름, 무기, 공식 역할을 대조하고 미확인 빌드·계수·순위는 제외했습니다.",
        intro: "‘8개 기본 클래스’는 2025년 NC가 처음 공개한 8개 클래스를 함께 가리키며, 게임 내 티어나 강함 분류가 아닙니다.",
        sourceNote: "역할과 무기는 NC 공식 한국어 가이드북, 영문명은 공식 글로벌 티저와 교차 확인했습니다. 2026-07-14 검증.",
        keywords: ["아이온2 클래스", "아이온2 직업", "아이온2 클래스 무기", "AION2 class list"],
        sections: [
          {
            id: "scope",
            title: "확인 가능한 자료 범위",
            paragraphs: [
              "NC의 2025년 핵심 콘텐츠 공개 자료는 8개 플레이 가능 클래스를 소개했습니다. 현재 한국 공식 가이드북은 각 클래스의 역할, 전투 방식, 착용 무기를 제공합니다. 아래 명단은 공식 문구의 요약이지 티어표가 아닙니다.",
              "공식 글로벌 티저에는 Gladiator, Templar, Assassin, Ranger, Sorcerer, SpiritMaster, Cleric, Chanter가 표시됩니다.",
            ],
          },
          {
            id: "official-roster",
            title: "8개 클래스의 공식 무기와 역할",
            paragraphs: ["각 항목은 해당 클래스의 NC 공식 가이드북 페이지를 핵심 근거로 삼습니다."],
            bullets: [
              "검성 (Gladiator / 劍星) — 대검; 높은 공격력과 방어력을 갖춘 근접 딜러이며 서브 탱커 역할도 제시됩니다.",
              "수호성 (Templar / 守護星) — 장검과 방패; 공격을 차단하고 아군을 보호하는 최전선 탱커입니다.",
              "살성 (Assassin / 殺星) — 양손 단검; 은신, 빠른 연계, 상태 이상으로 짧은 시간 내에 대상을 제압합니다.",
              "궁성 (Ranger / 弓星) — 활; 원거리 공격과 위치 선정, 타이밍, 전술적 대응을 중시합니다.",
              "마도성 (Sorcerer / 魔道星) — 마법서; 짧은 시간의 높은 마법 피해에 특화된 원거리 딜러입니다.",
              "정령성 (Spiritmaster / 精靈星) — 보주; 정령을 소환하고 상태 이상과 지속 피해로 적을 약화합니다.",
              "치유성 (Cleric / 治癒星) — 전곤; 회복 스킬로 아군의 생명력과 전투 지속력을 유지하는 힐러입니다.",
              "호법성 (Chanter / 護法星) — 법봉; 진언으로 아군을 강화하고 제어, 보조 힐, 보조 딜에 기여합니다.",
            ],
          },
          {
            id: "not-a-build-guide",
            title: "공식 소개는 빌드 정답이 아닙니다",
            paragraphs: [
              "이 자료로 이름, 무기, 상위 역할은 확인할 수 있지만 ‘최강’ 클래스, 영구적 최적 스킬 순서, PvE·PvP 공통 스탯 세팅은 증명할 수 없습니다.",
              "직업을 고를 때는 무기, 파티 역할, 전투 방식으로 후보를 먼저 좁혀 보세요. 빌드·계수·스탯 우선순위·강함 비교는 현재 패치와 서비스 권역에 맞는 자료를 다시 확인해야 합니다.",
            ],
          },
          {
            id: "version-boundary",
            title: "2026-07-14 버전 범위",
            paragraphs: [
              "무기와 역할은 한국 공식 가이드북, 영문명은 공식 글로벌 티저에서 확인했습니다. 해당 페이지는 모든 서비스 권역의 계수, 스킬 밸런스, 출시 빌드가 동일하다고 보증하지 않습니다.",
              "실제 스킬·피해·장비 규칙은 플레이하는 서비스 권역의 현행 공식 업데이트 노트로 다시 확인해야 합니다.",
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
