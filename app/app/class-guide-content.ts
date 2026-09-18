import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import {
  classDifficultyProfileTranslations,
  difficultyScopeNotes,
  editorialClassProfileLocales,
  type EditorialClassProfileLocale,
} from "./class-difficulty-profile-locales";
import {
  contentLocales,
  siteLocales,
  type ContentLocale,
  type SiteLocale,
} from "./site-config";

export type ClassDifficultyScore = 1 | 2 | 3 | 4 | 5;

type ClassDifficultyProfileDraft = {
  classId:
    | "gladiator"
    | "templar"
    | "assassin"
    | "ranger"
    | "sorcerer"
    | "spiritmaster"
    | "cleric"
    | "chanter"
    | "brawler";
  routeSlug: string;
  assessment: {
    basis: "editorial-assessment";
    notStrengthOrTier: true;
    assessedAt: "2026-07-18";
    applicableVersion: "global-official-roster-and-kr-tw-live-guidebook-2026-07-18";
    rubricVersion: "kina-class-difficulty-v1";
  };
  scores: {
    onboarding: ClassDifficultyScore;
    mastery: ClassDifficultyScore;
    execution: ClassDifficultyScore;
    positioning: ClassDifficultyScore;
    resourceTracking: ClassDifficultyScore;
    decisionLoad: ClassDifficultyScore;
    groupResponsibility: ClassDifficultyScore;
    errorRecoveryDemand: ClassDifficultyScore;
  };
  officialSourceIds: readonly string[];
  translations: Record<
    ContentLocale,
    {
      name: string;
      weapon: string;
      officialRole: string;
      assessmentSummary: string;
      practiceFocus: string;
      disclaimer: string;
    }
  >;
};

export type ClassDifficultyProfile = ClassDifficultyProfileDraft & {
  /** Stable UI and database key. */
  slug: ClassDifficultyProfileDraft["classId"];
  names: Record<SiteLocale, string>;
  role: Record<SiteLocale, string>;
  weapon: Record<SiteLocale, string>;
  scope: {
    version: ClassDifficultyProfileDraft["assessment"]["applicableVersion"];
    locales: readonly SiteLocale[];
    notes: Record<SiteLocale, string>;
  };
  /** Rounded summary of the five visible metrics, never a power score. */
  overall: ClassDifficultyScore;
  metrics: {
    inputs: ClassDifficultyScore;
    positioning: ClassDifficultyScore;
    resourceManagement: ClassDifficultyScore;
    partyResponsibility: ClassDifficultyScore;
    errorRecovery: ClassDifficultyScore;
  };
  rationale: Record<SiteLocale, string>;
  basis: "editorial-assessment";
  methodVersion: ClassDifficultyProfileDraft["assessment"]["rubricVersion"];
  assessedAt: "2026-07-18";
  confidence: "medium";
};

const difficultyAssessment = {
  basis: "editorial-assessment",
  notStrengthOrTier: true,
  assessedAt: "2026-07-18",
  applicableVersion:
    "global-official-roster-and-kr-tw-live-guidebook-2026-07-18",
  rubricVersion: "kina-class-difficulty-v1",
} as const satisfies ClassDifficultyProfileDraft["assessment"];

const classDifficultyProfileDrafts = [
  {
    classId: "gladiator",
    routeSlug: "gladiator",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 2,
      mastery: 4,
      execution: 3,
      positioning: 4,
      resourceTracking: 2,
      decisionLoad: 3,
      groupResponsibility: 2,
      errorRecoveryDemand: 3,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-gladiator",
    ],
    translations: {
      "zh-hant": {
        name: "劍星",
        weapon: "大劍",
        officialRole: "高攻防的近戰輸出，官方亦提到可兼任副坦克。",
        assessmentSummary:
          "基本責任容易理解，但貼身輸出、戰線判斷與攻守切換會提高精通門檻。",
        practiceFocus: "先練習穩定貼近目標、識別危險範圍，再練習何時前壓或撤回。",
        disclaimer: "此難度是 KINA 編輯評估，不是 NC 官方強度、Tier 或傷害排名。",
      },
      en: {
        name: "Gladiator",
        weapon: "Greatsword",
        officialRole:
          "A high-attack, high-defense melee damage role that NC also describes as capable of sub-tanking.",
        assessmentSummary:
          "The basic responsibility is easy to read, while melee uptime, front-line judgment, and attack-defense switching raise the mastery burden.",
        practiceFocus:
          "Practise safe melee uptime and hazard recognition before deciding when to press forward or disengage.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not an official NC power, tier, or damage ranking.",
      },
      ko: {
        name: "검성",
        weapon: "대검",
        officialRole:
          "높은 공격력과 방어력을 갖춘 근접 딜러이며 서브 탱커 역할도 제시됩니다.",
        assessmentSummary:
          "기본 역할은 이해하기 쉽지만 근접 유지, 전선 판단, 공수 전환 때문에 숙련 부담이 높아집니다.",
        practiceFocus:
          "안전하게 근접 거리를 유지하고 위험 범위를 확인한 뒤 전진과 이탈 시점을 연습합니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 NC 공식 성능·티어·피해량 순위가 아닙니다.",
      },
    },
  },
  {
    classId: "templar",
    routeSlug: "templar",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 3,
      mastery: 5,
      execution: 3,
      positioning: 4,
      resourceTracking: 2,
      decisionLoad: 4,
      groupResponsibility: 5,
      errorRecoveryDemand: 4,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-templar",
    ],
    translations: {
      "zh-hant": {
        name: "守護星",
        weapon: "長劍與盾牌",
        officialRole: "阻擋攻擊、保護隊友的前線坦克。",
        assessmentSummary:
          "操作本身未必最繁複，但站位、保護時機與主要承傷責任使團隊玩法的精通難度很高。",
        practiceFocus: "先練習保持敵人、自己與隊友的相對位置，再練習處理突發目標。",
        disclaimer: "此難度是 KINA 編輯評估，不是 NC 官方強度、Tier 或必選職業結論。",
      },
      en: {
        name: "Templar",
        weapon: "Longsword and shield",
        officialRole:
          "A front-line tank that blocks attacks and protects allies.",
        assessmentSummary:
          "Execution may not be the busiest, but positioning, protection timing, and primary tank responsibility create a high group-play mastery burden.",
        practiceFocus:
          "Practise the relative position of enemy, tank, and party before reacting to unexpected targets.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not an official NC power, tier, or mandatory-class verdict.",
      },
      ko: {
        name: "수호성",
        weapon: "장검과 방패",
        officialRole: "공격을 차단하고 아군을 보호하는 최전선 탱커입니다.",
        assessmentSummary:
          "조작 자체보다 위치 선정, 보호 타이밍, 주 탱킹 책임 때문에 파티 숙련 난이도가 높습니다.",
        practiceFocus:
          "적·자신·파티의 상대 위치를 유지한 뒤 예상하지 못한 대상 변화에 대응하는 연습을 합니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 NC 공식 성능·티어·필수 직업 판정이 아닙니다.",
      },
    },
  },
  {
    classId: "assassin",
    routeSlug: "assassin",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 4,
      mastery: 5,
      execution: 5,
      positioning: 5,
      resourceTracking: 3,
      decisionLoad: 4,
      groupResponsibility: 2,
      errorRecoveryDemand: 5,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-assassin",
    ],
    translations: {
      "zh-hant": {
        name: "殺星",
        weapon: "雙手短劍",
        officialRole: "以隱身、快速連擊與狀態異常在短時間內壓制目標。",
        assessmentSummary:
          "進場時機、短時間操作、目標選擇與失誤後撤離都要求較高，因此上手與精通負擔都偏高。",
        practiceFocus: "先練習觀察與安全撤離，再練習短時間接近、施壓和重置。",
        disclaimer: "此難度是 KINA 編輯評估，不表示殺星較強、較弱或屬於任何 Tier。",
      },
      en: {
        name: "Assassin",
        weapon: "Dual daggers",
        officialRole:
          "A precision melee role using stealth, fast chains, and status effects to pressure a target in a short window.",
        assessmentSummary:
          "Entry timing, compressed execution, target choice, and recovery after a failed engage create a high onboarding and mastery burden.",
        practiceFocus:
          "Practise observation and safe disengagement before compressing approach, pressure, and reset into a short window.",
        disclaimer:
          "This difficulty is a KINA editorial assessment and does not place Assassin in a power tier.",
      },
      ko: {
        name: "살성",
        weapon: "양손 단검",
        officialRole:
          "은신, 빠른 연계, 상태 이상으로 짧은 시간 안에 대상을 제압합니다.",
        assessmentSummary:
          "진입 타이밍, 짧은 시간의 조작, 대상 선택, 실패 뒤 이탈 부담이 커서 입문과 숙련 난이도가 모두 높습니다.",
        practiceFocus:
          "관찰과 안전한 이탈을 먼저 익힌 뒤 짧은 진입·압박·재정비 흐름을 연습합니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 살성의 강약이나 티어를 뜻하지 않습니다.",
      },
    },
  },
  {
    classId: "ranger",
    routeSlug: "ranger",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 3,
      mastery: 4,
      execution: 3,
      positioning: 5,
      resourceTracking: 2,
      decisionLoad: 4,
      groupResponsibility: 2,
      errorRecoveryDemand: 4,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-ranger",
    ],
    translations: {
      "zh-hant": {
        name: "弓星",
        weapon: "弓",
        officialRole: "重視站位、時機與戰術應對的遠距離攻擊職業。",
        assessmentSummary:
          "保持距離能降低部分接觸壓力，但視線、移動路線和輸出時機讓站位成為主要學習成本。",
        practiceFocus: "先練習在移動中維持安全距離與視線，再提高攻擊時段的穩定性。",
        disclaimer: "此難度是 KINA 編輯評估，不是遠程職業的強度、Tier 或勝率排名。",
      },
      en: {
        name: "Ranger",
        weapon: "Bow",
        officialRole:
          "A ranged attack role shaped by positioning, timing, and tactical response.",
        assessmentSummary:
          "Range reduces some contact pressure, but line of sight, movement routes, and attack timing make positioning the main learning cost.",
        practiceFocus:
          "Practise keeping safe range and line of sight while moving before increasing the consistency of attack windows.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not a ranged-class power, tier, or win-rate ranking.",
      },
      ko: {
        name: "궁성",
        weapon: "활",
        officialRole:
          "원거리 공격과 위치 선정, 타이밍, 전술적 대응을 중시합니다.",
        assessmentSummary:
          "거리가 일부 접촉 부담을 줄이지만 시야, 이동 경로, 공격 타이밍 때문에 위치 선정이 핵심 학습 요소입니다.",
        practiceFocus:
          "이동하면서 안전 거리와 시야를 유지한 뒤 공격 가능 시간의 안정성을 높입니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 원거리 직업의 성능·티어·승률 순위가 아닙니다.",
      },
    },
  },
  {
    classId: "sorcerer",
    routeSlug: "sorcerer",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 3,
      mastery: 4,
      execution: 4,
      positioning: 5,
      resourceTracking: 3,
      decisionLoad: 4,
      groupResponsibility: 2,
      errorRecoveryDemand: 4,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-sorcerer",
    ],
    translations: {
      "zh-hant": {
        name: "魔道星",
        weapon: "魔法書",
        officialRole: "專注短時間高魔法傷害，並需要管理距離與控場的遠程輸出。",
        assessmentSummary:
          "目標清楚，但安全施法時段、距離與控場判斷使失誤成本集中在站位和時機。",
        practiceFocus: "先練習保持安全施法位置與中止錯誤決定，再安排短時間施壓。",
        disclaimer: "此難度是 KINA 編輯評估，不是魔法傷害、Tier 或最佳職業結論。",
      },
      en: {
        name: "Sorcerer",
        weapon: "Spellbook",
        officialRole:
          "A ranged role focused on high magic damage in a short window, with range and control management required.",
        assessmentSummary:
          "The objective is clear, but safe casting windows, range, and control decisions concentrate the error cost in positioning and timing.",
        practiceFocus:
          "Practise holding a safe casting position and cancelling a poor decision before arranging short pressure windows.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not a magic-damage, tier, or best-class verdict.",
      },
      ko: {
        name: "마도성",
        weapon: "마법서",
        officialRole:
          "짧은 시간의 높은 마법 피해에 특화되고 거리와 제어를 관리하는 원거리 딜러입니다.",
        assessmentSummary:
          "목표는 명확하지만 안전한 시전 시간, 거리, 제어 판단 때문에 위치와 타이밍 실수 비용이 큽니다.",
        practiceFocus:
          "안전한 시전 위치와 잘못된 판단 중단을 먼저 익힌 뒤 짧은 압박 시간을 구성합니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 마법 피해·티어·최고 직업 판정이 아닙니다.",
      },
    },
  },
  {
    classId: "spiritmaster",
    routeSlug: "spiritmaster",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 4,
      mastery: 5,
      execution: 4,
      positioning: 4,
      resourceTracking: 5,
      decisionLoad: 5,
      groupResponsibility: 3,
      errorRecoveryDemand: 4,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-spiritmaster",
    ],
    translations: {
      "zh-hant": {
        name: "精靈星",
        weapon: "寶珠",
        officialRole: "召喚屬性精靈，並以狀態異常與持續傷害削弱敵人。",
        assessmentSummary:
          "召喚物、持續效果、目標狀態與自身站位需要同時關注，資訊管理負擔高於單一輸出循環。",
        practiceFocus: "先練習召喚物與自身位置，再逐步加入狀態與持續效果的檢查順序。",
        disclaimer: "此難度是 KINA 編輯評估，不代表精靈星的強度、Tier 或單人效率排名。",
      },
      en: {
        name: "SpiritMaster",
        weapon: "Orb",
        officialRole:
          "A summoner that uses elemental spirits, status effects, and damage over time to weaken enemies.",
        assessmentSummary:
          "The summon, persistent effects, target state, and personal positioning compete for attention, creating more information-management load than a single damage loop.",
        practiceFocus:
          "Practise summon and personal positioning first, then add a repeatable check order for status and persistent effects.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not a SpiritMaster power, tier, or solo-efficiency ranking.",
      },
      ko: {
        name: "정령성",
        weapon: "보주",
        officialRole:
          "정령을 소환하고 상태 이상과 지속 피해로 적을 약화합니다.",
        assessmentSummary:
          "소환수, 지속 효과, 대상 상태, 자신의 위치를 함께 확인해야 해 단일 피해 흐름보다 정보 관리 부담이 큽니다.",
        practiceFocus:
          "소환수와 자신의 위치를 먼저 익힌 뒤 상태 이상과 지속 효과를 확인하는 순서를 추가합니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 정령성의 성능·티어·솔로 효율 순위가 아닙니다.",
      },
    },
  },
  {
    classId: "cleric",
    routeSlug: "cleric",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 4,
      mastery: 5,
      execution: 4,
      positioning: 4,
      resourceTracking: 4,
      decisionLoad: 5,
      groupResponsibility: 5,
      errorRecoveryDemand: 4,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-cleric",
    ],
    translations: {
      "zh-hant": {
        name: "治癒星",
        weapon: "戰鎚",
        officialRole: "以回復技能維持隊友生存與戰鬥續航的核心治療者。",
        assessmentSummary:
          "角色目標明確，但多人狀態判斷、自身生存、優先級與團隊責任造成很高的決策負擔。",
        practiceFocus: "先練習保持自身安全與辨認最高風險目標，再縮短判斷時間。",
        disclaimer: "此難度是 KINA 編輯評估，不是治療量、Tier 或團隊必選結論。",
      },
      en: {
        name: "Cleric",
        weapon: "Mace",
        officialRole:
          "The core healer that maintains allied health and combat endurance.",
        assessmentSummary:
          "The objective is clear, but multi-target state reading, self-preservation, priority decisions, and group responsibility create a very high decision load.",
        practiceFocus:
          "Practise personal safety and identifying the highest-risk ally before reducing decision time.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not a healing-output, tier, or mandatory-party verdict.",
      },
      ko: {
        name: "치유성",
        weapon: "전곤",
        officialRole:
          "회복 스킬로 아군의 생명력과 전투 지속력을 유지하는 핵심 힐러입니다.",
        assessmentSummary:
          "목표는 명확하지만 여러 대상 상태, 자신의 생존, 우선순위, 파티 책임 때문에 판단 부담이 매우 높습니다.",
        practiceFocus:
          "자신의 안전과 가장 위험한 아군을 먼저 식별한 뒤 판단 시간을 줄입니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 치유량·티어·파티 필수 판정이 아닙니다.",
      },
    },
  },
  {
    classId: "chanter",
    routeSlug: "chanter",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 3,
      mastery: 4,
      execution: 3,
      positioning: 4,
      resourceTracking: 3,
      decisionLoad: 4,
      groupResponsibility: 4,
      errorRecoveryDemand: 3,
    },
    officialSourceIds: [
      "global-class-roster",
      "core-class-reveal",
      "guide-chanter",
    ],
    translations: {
      "zh-hant": {
        name: "護法星",
        weapon: "法杖",
        officialRole: "以真言強化隊友，並兼顧控場、輔助治療與輸出。",
        assessmentSummary:
          "單一責任較易開始，但要在增益、控制、輔助治療與輸出之間切換，需要持續讀取隊伍情況。",
        practiceFocus: "先維持一項主要支援責任，再逐步加入控制、治療與輸出判斷。",
        disclaimer: "此難度是 KINA 編輯評估，不是護法星的強度、Tier 或無課推薦排名。",
      },
      en: {
        name: "Chanter",
        weapon: "Staff",
        officialRole:
          "A support using mantras to strengthen allies while contributing control, secondary healing, and damage.",
        assessmentSummary:
          "One support responsibility is approachable, but switching among buffs, control, secondary healing, and damage requires continuous party-state reading.",
        practiceFocus:
          "Maintain one primary support responsibility first, then add control, healing, and damage decisions gradually.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not a Chanter power, tier, or free-to-play ranking.",
      },
      ko: {
        name: "호법성",
        weapon: "법봉",
        officialRole:
          "진언으로 아군을 강화하고 제어, 보조 치유, 보조 피해에 기여합니다.",
        assessmentSummary:
          "한 가지 지원 책임은 시작하기 쉽지만 강화, 제어, 보조 치유, 피해 사이를 전환하려면 파티 상태를 계속 읽어야 합니다.",
        practiceFocus:
          "한 가지 핵심 지원 책임을 유지한 뒤 제어, 치유, 피해 판단을 단계적으로 추가합니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 호법성의 성능·티어·무과금 추천 순위가 아닙니다.",
      },
    },
  },
  {
    classId: "brawler",
    routeSlug: "brawler",
    assessment: difficultyAssessment,
    scores: {
      onboarding: 3,
      mastery: 4,
      execution: 4,
      positioning: 4,
      resourceTracking: 4,
      decisionLoad: 4,
      groupResponsibility: 2,
      errorRecoveryDemand: 4,
    },
    officialSourceIds: [
      "current-class-roster",
      "chapter-1-brawler-2026-07-01",
      "guide-brawler",
    ],
    translations: {
      "zh-hant": {
        name: "拳星",
        weapon: "拳甲",
        officialRole:
          "使用拳甲在前線持續突進與連擊，透過攻擊累積 Rage 並在條件達成後進入 Rampage。",
        assessmentSummary:
          "角色目標容易理解，但貼身站位、連續輸入、資源狀態與失誤後重新接近需要同時處理。",
        practiceFocus:
          "先分開練習安全接近與資源觀察，再把連續施壓和撤離接回同一個短循環。",
        disclaimer:
          "此難度是 KINA 編輯評估，不是拳星的強度、Tier、傷害或新職業優待排名。",
      },
      en: {
        name: "Brawler",
        weapon: "Gauntlets",
        officialRole:
          "A front-line fighter using Gauntlets for repeated charges and combos, generating Rage through attacks and entering Rampage when the condition is met.",
        assessmentSummary:
          "The objective is readable, while melee position, repeated inputs, resource state, and re-entry after an error must be managed together.",
        practiceFocus:
          "Practise safe approaches and resource observation separately before joining sustained pressure and disengagement into one short loop.",
        disclaimer:
          "This difficulty is a KINA editorial assessment, not a Brawler power, tier, damage, or new-class-favor ranking.",
      },
      ko: {
        name: "권성",
        weapon: "권갑",
        officialRole:
          "권갑으로 전방에서 연속 돌진과 연계를 펼치며 공격으로 분노를 얻고 조건을 충족하면 폭주 상태에 들어갑니다.",
        assessmentSummary:
          "역할 목표는 이해하기 쉽지만 근접 위치, 연속 입력, 자원 상태, 실수 뒤 재진입을 함께 관리해야 합니다.",
        practiceFocus:
          "안전한 접근과 자원 확인을 따로 익힌 뒤 지속 압박과 이탈을 짧은 흐름으로 연결합니다.",
        disclaimer:
          "이 난이도는 KINA 편집 평가이며 권성의 성능·티어·피해량·신규 직업 우대 순위가 아닙니다.",
      },
    },
  },
] as const satisfies readonly ClassDifficultyProfileDraft[];

function summarizeDifficulty(
  scores: ClassDifficultyProfileDraft["scores"],
): ClassDifficultyScore {
  const total =
    scores.execution +
    scores.positioning +
    scores.resourceTracking +
    scores.groupResponsibility +
    scores.errorRecoveryDemand;
  return Math.max(1, Math.min(5, Math.round(total / 5))) as ClassDifficultyScore;
}

type LocalizedProfileField =
  | "name"
  | "weapon"
  | "officialRole"
  | "assessmentSummary";

function isContentLocale(locale: SiteLocale): locale is ContentLocale {
  return contentLocales.includes(locale as ContentLocale);
}

function isEditorialClassProfileLocale(
  locale: SiteLocale,
): locale is EditorialClassProfileLocale {
  return editorialClassProfileLocales.includes(
    locale as EditorialClassProfileLocale,
  );
}

function localizedProfileField(
  draft: (typeof classDifficultyProfileDrafts)[number],
  field: LocalizedProfileField,
): Record<SiteLocale, string> {
  return Object.fromEntries(
    siteLocales.map((locale) => {
      if (isContentLocale(locale)) {
        return [locale, draft.translations[locale][field]];
      }
      if (isEditorialClassProfileLocale(locale)) {
        return [
          locale,
          classDifficultyProfileTranslations[draft.classId][locale][field],
        ];
      }
      throw new Error(`Missing class profile locale: ${locale}`);
    }),
  ) as Record<SiteLocale, string>;
}

export const classDifficultyProfiles: readonly ClassDifficultyProfile[] =
  classDifficultyProfileDrafts.map((draft) => ({
    ...draft,
    slug: draft.classId,
    names: localizedProfileField(draft, "name"),
    role: localizedProfileField(draft, "officialRole"),
    weapon: localizedProfileField(draft, "weapon"),
    scope: {
      version: draft.assessment.applicableVersion,
      locales: siteLocales,
      notes: difficultyScopeNotes,
    },
    overall: summarizeDifficulty(draft.scores),
    metrics: {
      inputs: draft.scores.execution,
      positioning: draft.scores.positioning,
      resourceManagement: draft.scores.resourceTracking,
      partyResponsibility: draft.scores.groupResponsibility,
      errorRecovery: draft.scores.errorRecoveryDemand,
    },
    rationale: localizedProfileField(draft, "assessmentSummary"),
    basis: draft.assessment.basis,
    methodVersion: draft.assessment.rubricVersion,
    assessedAt: draft.assessment.assessedAt,
    confidence: "medium",
  }));

type ClassLocaleDraft = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  officialFacts: readonly [string, string];
  gameplayLoop: readonly [string, string];
  scenarios: {
    pve: string;
    pvp: string;
    rvr: string;
  };
  difficultyNotes: readonly [string, string];
  beginnerPractice: readonly [string, string, string];
  commonMistakes: readonly [string, string, string];
  versionBoundary: readonly [string, string];
  keywords: readonly string[];
  specializedSections?: readonly {
    id: string;
    title: string;
    paragraphs: readonly string[];
    bullets?: readonly string[];
  }[];
};

type ClassGuideDefinition = {
  slug: ClassDifficultyProfile["classId"];
  koreanGuideTitle: string;
  translations: Record<ContentLocale, ClassLocaleDraft>;
};

const publication = {
  status: "published",
  indexable: true,
  localeReview: {
    "zh-hant": "approved",
    en: "approved",
    ko: "approved",
  },
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

const globalClassRosterSource = {
  id: "global-class-roster",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 official global teaser: current English class roster",
  url: "https://aion2.ncsoft.jp/en/teaser",
  retrievedAt: "2026-07-18",
  verifiedAt: "2026-07-18",
} as const satisfies ContentSource;

const coreClassRevealSource = {
  id: "core-class-reveal",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 core content reveal: eight playable class profiles",
  url: "https://about.ncsoft.com/en/news/article/aion2-update-250530-2",
  publishedAt: "2025-06-04",
  retrievedAt: "2026-07-18",
  verifiedAt: "2026-07-18",
} as const satisfies ContentSource;

const currentClassRosterSource = {
  id: "current-class-roster",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 official Taiwan current class roster API",
  url: "https://tw.ncsoft.com/aion2/api/gameinfo/classes?lang=zh",
  retrievedAt: "2026-07-18",
  verifiedAt: "2026-07-18",
} as const satisfies ContentSource;

const brawlerChapterSource = {
  id: "chapter-1-brawler-2026-07-01",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 Chapter 1 update: Brawler added on 2026-07-01",
  url: "https://about.ncsoft.com/news/article/Aion2_update_20260701",
  publishedAt: "2026-07-01",
  retrievedAt: "2026-07-18",
  verifiedAt: "2026-07-18",
} as const satisfies ContentSource;

const officialCombatOverviewSource = {
  id: "official-combat-overview",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 official game overview: decision-led manual combat and skills",
  url: "https://aion2.plaync.com/ko-kr/index?redirect=false",
  retrievedAt: "2026-07-26",
  verifiedAt: "2026-07-26",
} as const satisfies ContentSource;

const officialArcanaUpdateSource = {
  id: "official-arcana-update",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 official Season 2 update: Arcana expansion",
  url: "https://aion2.plaync.com/ko-kr/conts/260116_update",
  publishedAt: "2026-01-21",
  retrievedAt: "2026-07-26",
  verifiedAt: "2026-07-26",
} as const satisfies ContentSource;

const classOverviewUrl =
  "https://aion2.plaync.com/ko-kr/guidebook/view?title=%ED%81%B4%EB%9E%98%EC%8A%A4%20%EC%86%8C%EA%B0%9C";

function guidebookSource(
  slug: ClassDifficultyProfile["classId"],
  title: string,
) {
  return {
    id: `guide-${slug}`,
    kind: "official",
    publisher: "NC Corporation",
    label: `AION2 official Guidebook: ${title}`,
    url: `https://aion2.plaync.com/ko-kr/guidebook/view?title=${encodeURIComponent(title)}`,
    retrievedAt: "2026-07-18",
    verifiedAt: "2026-07-18",
  } as const satisfies ContentSource;
}

function heroImage(
  names: Record<ContentLocale, string>,
): ContentHeroImage {
  return {
    src: "https://fizz-download.playnccdn.com/download/v2/buckets/guidebook/files/19a8f6a3698-672c7082-3c90-46e9-ba88-4c3aa1d36419",
    width: 520,
    height: 308,
    credit: "NC Corporation / AION2 official Guidebook",
    sourceUrl: classOverviewUrl,
    rights: "linked-official-media",
    presentation: "contain",
    translations: {
      "zh-hant": {
        alt: `AION2 官方職業介紹圖片，用於${names["zh-hant"]}攻略`,
        caption:
          `NC 官方 Guidebook 職業介紹圖片；${names["zh-hant"]}武器與定位另以該職業官方頁面核對。`,
      },
      en: {
        alt: `Official AION2 class-overview image for the ${names.en} guide`,
        caption:
          `Official NC Guidebook class-overview image; ${names.en} weapon and role are checked against the dedicated official page.`,
      },
      ko: {
        alt: `AION2 ${names.ko} 가이드에 사용한 공식 클래스 소개 이미지`,
        caption:
          `NC 공식 가이드북 클래스 소개 이미지이며 ${names.ko} 무기와 역할은 개별 공식 페이지에서 확인했습니다.`,
      },
    },
  };
}

function brawlerHeroImage(): ContentHeroImage {
  const sourceUrl =
    "https://aion2.plaync.com/ko-kr/guidebook/view?title=%EA%B6%8C%EC%84%B1%20%EC%8A%A4%ED%82%AC";
  return {
    src: "https://fizz-download.playnccdn.com/download/v2/buckets/guidebook/files/19f1107fab3-3baaf58a-f196-45a0-a2a6-d323bc14909e",
    width: 520,
    height: 308,
    credit: "NC Corporation / AION2 official Guidebook",
    sourceUrl,
    rights: "linked-official-media",
    presentation: "contain",
    translations: {
      "zh-hant": {
        alt: "AION2 拳星官方技能指南圖片",
        caption:
          "NC 官方拳星技能指南圖片；拳星已於 2026-07-01 加入韓國／台灣 Chapter 1。",
      },
      en: {
        alt: "Official AION2 Brawler skill-guide image",
        caption:
          "Official NC Brawler guide image; Brawler joined the Korea/Taiwan Chapter 1 build on 2026-07-01.",
      },
      ko: {
        alt: "AION2 공식 권성 스킬 가이드 이미지",
        caption:
          "NC 공식 권성 가이드 이미지이며 권성은 2026-07-01 한국·대만 Chapter 1에 추가됐습니다.",
      },
    },
  };
}

const uiCopy = {
  "zh-hant": {
    byline: "AION2 KINA 職業編輯組",
    backLabel: "返回職業中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "最後核對",
    readingTime: "約 9 分鐘",
    relatedLabel: "比較其他職業",
    sourceNote:
      "官方名稱、武器與定位來自 NC 官方來源；玩法、難度、練習與失誤分析為 KINA 於 2026-07-18 的編輯評估，不是官方 Tier、強度、傷害或最佳 Build。",
    officialTitle: "官方確認：武器與職業定位",
    loopTitle: "編輯解讀：可練習的玩法循環",
    scenariosTitle: "編輯解讀：PvE、PvP 與 RvR 場景",
    difficultyTitle: "編輯難度評估：不是強度或 Tier",
    practiceTitle: "新手練習順序",
    mistakesTitle: "常見失誤與修正",
    boundaryTitle: "適用版本與證據邊界",
    pve: "PvE",
    pvp: "PvP",
    rvr: "RvR",
    practiceSteps: ["先建立安全基線", "只增加一項負擔", "在當前版本重新核對"],
    difficultyScale: (onboarding: number, mastery: number) =>
      `KINA v1 評估為上手 ${onboarding}/5、精通 ${mastery}/5；1 代表學習負擔較低，5 代表需要同時處理更多操作、資訊或責任。`,
    difficultyDisclaimer:
      "分數不比較傷害、勝率、職業價值、裝備投資或隊伍需求，也不能用來宣稱最強、最弱或任何 Tier。",
    versionCommon:
      "資料集涵蓋 2026-07-18 可核對的九職業：全球名單的八個基礎職業，以及 2026-07-01 加入韓國／台灣 Chapter 1 的拳星。全球版技能、名單、平衡與最終玩法仍須在對應客戶端和公告中重新確認。",
  },
  en: {
    byline: "AION2 KINA Class Desk",
    backLabel: "Back to classes",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    readingTime: "9 min read",
    relatedLabel: "Compare other classes",
    sourceNote:
      "Official names, weapons, and roles come from NC sources. Playstyle, difficulty, practice, and mistake analysis are KINA editorial assessments dated 2026-07-18—not official tiers, power, damage, or best builds.",
    officialTitle: "Official fact: weapon and class role",
    loopTitle: "Editorial interpretation: a practice-ready combat loop",
    scenariosTitle: "Editorial interpretation: PvE, PvP, and RvR contexts",
    difficultyTitle: "Editorial difficulty assessment—not power or tier",
    practiceTitle: "Beginner practice order",
    mistakesTitle: "Common mistakes and corrections",
    boundaryTitle: "Version and evidence boundary",
    pve: "PvE",
    pvp: "PvP",
    rvr: "RvR",
    practiceSteps: [
      "Build a safe baseline",
      "Add one burden at a time",
      "Recheck the current build",
    ],
    difficultyScale: (onboarding: number, mastery: number) =>
      `KINA rubric v1 rates onboarding at ${onboarding}/5 and mastery at ${mastery}/5. One means a lower learning burden; five means more simultaneous execution, information, or responsibility.`,
    difficultyDisclaimer:
      "The scores do not compare damage, win rate, class value, gear investment, or party demand and cannot establish a best, worst, or tier.",
    versionCommon:
      "The dataset covers nine classes verified on 2026-07-18: the eight base classes on the Global roster and Brawler, added to the Korea/Taiwan Chapter 1 build on 2026-07-01. Global skills, roster, balance, and final play patterns still require client and notice verification.",
  },
  ko: {
    byline: "AION2 KINA 직업 편집팀",
    backLabel: "직업으로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "KINA 게시",
    updatedLabel: "마지막 확인",
    readingTime: "약 9분",
    relatedLabel: "다른 직업 비교",
    sourceNote:
      "공식 이름·무기·역할은 NC 공식 출처를 사용합니다. 플레이 방식·난이도·연습·실수 분석은 2026-07-18 KINA 편집 평가이며 공식 티어·성능·피해량·최적 빌드가 아닙니다.",
    officialTitle: "공식 확인: 무기와 직업 역할",
    loopTitle: "편집 해석: 연습 가능한 전투 흐름",
    scenariosTitle: "편집 해석: PvE·PvP·RvR 상황",
    difficultyTitle: "편집 난이도 평가: 성능이나 티어가 아닙니다",
    practiceTitle: "초보 연습 순서",
    mistakesTitle: "자주 하는 실수와 수정",
    boundaryTitle: "적용 버전과 근거 범위",
    pve: "PvE",
    pvp: "PvP",
    rvr: "RvR",
    practiceSteps: [
      "안전한 기준 만들기",
      "부담을 하나씩 추가하기",
      "현재 버전 다시 확인하기",
    ],
    difficultyScale: (onboarding: number, mastery: number) =>
      `KINA v1 평가는 입문 ${onboarding}/5, 숙련 ${mastery}/5입니다. 1은 학습 부담이 낮고 5는 더 많은 조작·정보·책임을 동시에 처리해야 한다는 뜻입니다.`,
    difficultyDisclaimer:
      "점수는 피해량, 승률, 직업 가치, 장비 투자, 파티 수요를 비교하지 않으며 최강·최약·티어를 정하지 않습니다.",
    versionCommon:
      "데이터는 2026-07-18 확인한 9개 직업을 다룹니다. 글로벌 목록의 기본 8개와 2026-07-01 한국·대만 Chapter 1에 추가된 권성입니다. 글로벌 스킬, 명단, 밸런스와 최종 플레이는 클라이언트와 공지에서 다시 확인해야 합니다.",
  },
} as const;

function createLocalizedContent(
  locale: ContentLocale,
  draft: ClassLocaleDraft,
  profile: ClassDifficultyProfile,
): LocalizedContent {
  const labels = uiCopy[locale];
  const practiceSteps = draft.beginnerPractice.map((description, index) => ({
    title: labels.practiceSteps[index],
    description,
  }));

  return {
    eyebrow: draft.eyebrow,
    title: draft.title,
    description: draft.description,
    intro: draft.intro,
    byline: labels.byline,
    backLabel: labels.backLabel,
    contentsLabel: labels.contentsLabel,
    publishedLabel: labels.publishedLabel,
    updatedLabel: labels.updatedLabel,
    readingTime: labels.readingTime,
    relatedLabel: labels.relatedLabel,
    sourceNote: labels.sourceNote,
    keywords: draft.keywords,
    sections: [
      {
        id: "official-profile",
        title: labels.officialTitle,
        paragraphs: draft.officialFacts,
      },
      {
        id: "editorial-gameplay-loop",
        title: labels.loopTitle,
        paragraphs: draft.gameplayLoop,
      },
      ...(draft.specializedSections ?? []),
      {
        id: "editorial-scenarios",
        title: labels.scenariosTitle,
        paragraphs: [
          locale === "zh-hant"
            ? "以下是從官方角色輪廓推導的練習情境，不是 NC 官方玩法排名或勝率結論。"
            : locale === "en"
              ? "These practice contexts are editorial deductions from the official role profile, not NC playstyle rankings or win-rate claims."
              : "아래 연습 상황은 공식 역할 설명을 바탕으로 한 편집 해석이며 NC 공식 플레이 순위나 승률 결론이 아닙니다.",
        ],
        bullets: [
          `${labels.pve}：${draft.scenarios.pve}`,
          `${labels.pvp}：${draft.scenarios.pvp}`,
          `${labels.rvr}：${draft.scenarios.rvr}`,
        ],
      },
      {
        id: "editorial-difficulty",
        title: labels.difficultyTitle,
        paragraphs: [
          labels.difficultyScale(
            profile.scores.onboarding,
            profile.scores.mastery,
          ),
          ...draft.difficultyNotes,
          labels.difficultyDisclaimer,
        ],
      },
      {
        id: "beginner-practice",
        title: labels.practiceTitle,
        paragraphs: [
          profile.translations[locale].practiceFocus,
        ],
        steps: practiceSteps,
      },
      {
        id: "common-mistakes",
        title: labels.mistakesTitle,
        paragraphs: [
          locale === "zh-hant"
            ? "這些是編輯練習提醒，不是對任何技能、冷卻或數值的假設。"
            : locale === "en"
              ? "These are editorial practice reminders and do not assume any unverified skill, cooldown, or coefficient."
              : "아래 내용은 편집 연습 안내이며 미확인 스킬·재사용 시간·계수를 가정하지 않습니다.",
        ],
        bullets: draft.commonMistakes,
      },
      {
        id: "version-boundary",
        title: labels.boundaryTitle,
        paragraphs: [
          ...draft.versionBoundary,
          labels.versionCommon,
        ],
      },
    ],
  };
}

const classGuideDefinitions: readonly ClassGuideDefinition[] = [
  {
    slug: "gladiator",
    koreanGuideTitle: "검성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 劍星 Arcana 與 Build 攻略",
        description:
          "AION2 劍星 Arcana 與 Build 攻略：依官方大劍、近戰與副坦克定位，整理 Arcana 選擇方法、PvE／PvP／RvR 循環、操作難度及版本核對方式。",
        intro:
          "本頁把 NC 能證明的武器與角色定位放在「官方確認」，把玩法、難度與練習建議放在「編輯評估」。不提供未核實技能名、倍率、配裝或 Tier。",
        officialFacts: [
          "NC 官方 Guidebook 將劍星列為使用大劍的近戰輸出，並描述其具有較高攻擊力與防禦力，可兼任副坦克。",
          "全球官方預告站目前列出 Gladiator；2025 年核心內容公告亦把它描述為具廣域能力的近戰職業。這些資料證明角色輪廓，不證明當前傷害排名。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：確認安全接近路線、保持可持續的貼身位置、觀察何時承受或避開壓力，最後在戰線不利時撤回重整。",
          "副坦克只是官方角色輪廓的一部分，不代表任何隊伍都應由劍星取代主要坦克。實際責任仍由當前副本、隊伍與技能說明決定。",
        ],
        specializedSections: [
          {
            id: "gladiator-arcana-selection",
            title: "劍星 Arcana 選擇方法：先解決近戰時段，不照抄固定答案",
            paragraphs: [
              "截至 2026-07-26，NC 已確認 Arcana 系統持續增加卡牌與系列，但沒有公布一套適用所有版本與場景的劍星最佳 Arcana。本站因此只提供可重複的選擇方法：先說明要打的內容，再處理最常中斷的近戰環節，最後才比較輸出。",
              "劍星應先問「能否安全接近並維持有效時段」，再問「這張 Arcana 的觸發條件能否在該場景穩定達成」。卡牌名稱、效果文字、強化狀態或版本變動後，都要重新跑同一套測試。",
            ],
            bullets: [
              "記錄區服、遊戲版本、內容類型與隊伍責任；PvE 首領、多人戰線與單人內容分開保存。",
              "先比較能改善接近、站位容錯或有效近戰時間的候選，再比較只在理想條件生效的候選。",
              "一次只更換一張或一個系列，重複相同場景並記錄死亡、被迫中斷與實際可維持時段。",
              "若觸發條件、套裝規則或卡牌文字改動，舊結論立即標記為過期，而不是沿用成永久 Meta。",
            ],
          },
        ],
        scenarios: {
          pve: "先以穩定近戰時間和機制處理為目標，不為延長輸出而停留在危險區域。",
          pvp: "先辨認能安全接近的目標和撤離方向，再評估是否持續施壓。",
          rvr: "跟隨己方戰線移動，避免在缺乏支援時單獨越過前排。",
        },
        difficultyNotes: [
          "劍星的角色目標直觀，因此上手分數較低；精通負擔主要來自近戰站位、接觸時間和攻守切換。",
          "這個評估沒有使用傷害表、勝率、裝備門檻或未公開技能數值。",
        ],
        beginnerPractice: [
          "只練習在不承受額外危險的情況下接近與離開目標。",
          "加入戰線判斷：每次前壓前先確認隊友、危險範圍與撤離方向。",
          "在所在地區的現行技能說明中建立自己的短循環，記錄版本與測試情境。",
        ],
        commonMistakes: [
          "把高防禦角色輪廓理解成可以忽略機制；修正方式是把生存當成容錯，不是免責。",
          "只追目標而離開隊友與撤離路線；修正方式是每次接近前先確認戰線。",
          "把副坦克描述寫成固定隊伍需求；修正方式是回到當期內容與隊伍責任核對。",
        ],
        versionBoundary: [
          "大劍、近戰輸出與副坦克輪廓來自 2026-07-18 可存取的官方資料。",
          "本文沒有確認全球版首日技能組、傷害、冷卻、屬性優先級或最佳裝備。",
        ],
        keywords: ["AION2 劍星", "AION2 劍星攻略", "劍星 Arcana", "劍星 Build", "Gladiator build"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 Gladiator Arcana & Build Guide",
        description:
          "A version-aware AION2 Gladiator Arcana and build guide covering the official Greatsword role, selection method, PvE, PvP, RvR, and difficulty.",
        intro:
          "NC-supported weapon and role claims are labeled official fact. Playstyle, difficulty, and practice advice are labeled editorial assessment. No unverified skill name, coefficient, gear build, or tier is supplied.",
        officialFacts: [
          "NC's official Guidebook presents Gladiator as a Greatsword melee damage role with relatively high attack and defense, and says it can contribute as a sub-tank.",
          "The official global teaser currently lists Gladiator, while NC's 2025 core-content release describes powerful wide-area melee attacks. Those statements establish a role profile, not a current damage rank.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: identify a safe approach, maintain sustainable melee position, read when to absorb or avoid pressure, and disengage when the front line becomes unfavorable.",
          "Sub-tanking is part of the official profile, not proof that Gladiator replaces a main tank in every party. Current content rules, party composition, and live skill text still control the actual responsibility.",
        ],
        specializedSections: [
          {
            id: "gladiator-arcana-selection",
            title: "Gladiator Arcana selection: protect melee access before copying a fixed list",
            paragraphs: [
              "As of July 26, 2026, NC has confirmed an expanding Arcana system, but it has not published one permanent best Gladiator Arcana set for every build and activity. Use a repeatable selection method instead: name the activity, identify what most often breaks melee uptime, and only then compare output.",
              "Start with whether the Gladiator can approach and sustain a useful window, then ask whether an Arcana trigger is repeatable in that exact context. Re-run the worksheet whenever the card text, set rule, upgrade state, or regional build changes.",
            ],
            bullets: [
              "Record region, game build, activity, and assigned party responsibility; keep boss, solo, and mass-PvP tests separate.",
              "Compare candidates that improve access, positional recovery, or usable melee time before effects that only work in an ideal window.",
              "Change one card or set at a time and repeat the same scenario, recording deaths, forced disengagements, and sustainable windows.",
              "Expire the result when a trigger or set rule changes; do not preserve a dated test as a permanent meta.",
            ],
          },
        ],
        scenarios: {
          pve: "Prioritize stable melee uptime and mechanic handling instead of remaining in danger to extend damage.",
          pvp: "Identify a safe target, approach path, and exit before committing to continued pressure.",
          rvr: "Move with the friendly front line and avoid crossing it alone without support.",
        },
        difficultyNotes: [
          "The class objective is readable, which lowers onboarding burden. Melee position, contact time, and attack-defense switching raise mastery demand.",
          "The assessment uses no damage table, win rate, gear threshold, or unpublished skill value.",
        ],
        beginnerPractice: [
          "Practise approaching and leaving a target without accepting unnecessary danger.",
          "Add front-line reading: check allies, hazard area, and exit before each forward move.",
          "Build a short personal loop from the live regional skill text and record build and test context.",
        ],
        commonMistakes: [
          "Treating defensive identity as permission to ignore mechanics; use durability as recovery, not immunity.",
          "Chasing beyond allies and the exit route; check the front line before every approach.",
          "Turning sub-tank wording into a fixed party rule; verify the current activity and assigned responsibility.",
        ],
        versionBoundary: [
          "Greatsword, melee damage, and sub-tank wording reflect official material accessible on 2026-07-18.",
          "This page does not confirm Global launch skills, damage, cooldowns, stat priorities, or best equipment.",
        ],
        keywords: ["AION2 Gladiator", "Gladiator Arcana", "Gladiator build", "Gladiator guide", "AION2 classes"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "아이온2 검성 아르카나·빌드 가이드",
        description:
          "아이온2 검성 아르카나와 빌드 가이드입니다. 공식 대검·근접·보조 탱커 역할을 바탕으로 선택 방법, PvE·PvP·RvR 운용, 난이도와 버전 확인 기준을 정리합니다.",
        intro:
          "NC가 확인하는 무기와 역할은 공식 사실로, 플레이 방식·난이도·연습은 편집 평가로 표시합니다. 미확인 스킬명, 계수, 장비 빌드, 티어는 제시하지 않습니다.",
        officialFacts: [
          "NC 공식 가이드북은 검성을 대검을 사용하는 근접 딜러로 소개하고 높은 공격력과 방어력, 서브 탱커 역할을 설명합니다.",
          "글로벌 공식 티저는 Gladiator를 표시하며 2025년 핵심 콘텐츠 발표는 강력한 광역 근접 공격을 소개합니다. 이는 역할 설명이지 현재 피해 순위가 아닙니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 안전한 접근 경로 확인, 유지 가능한 근접 위치 확보, 압박을 버티거나 피할 시점 판단, 전선이 불리할 때 이탈 순서로 정리할 수 있습니다.",
          "서브 탱커는 공식 역할 설명의 일부이며 모든 파티에서 주 탱커를 대신한다는 뜻이 아닙니다. 실제 책임은 현재 콘텐츠, 파티, 스킬 설명으로 확인해야 합니다.",
        ],
        specializedSections: [
          {
            id: "gladiator-arcana-selection",
            title: "검성 아르카나 선택법: 고정 답보다 근접 유지부터 확인",
            paragraphs: [
              "2026년 7월 26일 기준 NC는 아르카나 카드와 시리즈가 계속 추가되는 시스템임을 확인했지만, 모든 버전과 콘텐츠에 통하는 검성 최적 아르카나는 공개하지 않았습니다. 먼저 콘텐츠를 정하고 근접 유지가 끊기는 원인을 찾은 뒤 마지막에 피해 효율을 비교합니다.",
              "검성은 안전하게 접근해 유효 시간을 유지할 수 있는지 먼저 보고, 해당 상황에서 아르카나 발동 조건을 반복해서 달성할 수 있는지 확인해야 합니다. 카드 문구, 세트 규칙, 강화 상태나 지역 빌드가 바뀌면 같은 절차로 다시 시험합니다.",
            ],
            bullets: [
              "서비스 지역, 게임 버전, 콘텐츠와 파티 역할을 기록하고 보스·솔로·대규모 PvP 결과를 분리합니다.",
              "이상적인 순간에만 작동하는 효과보다 접근, 위치 복구, 실제 근접 시간을 돕는 후보를 먼저 비교합니다.",
              "한 번에 카드나 세트 하나만 바꾸고 같은 상황을 반복해 사망, 강제 이탈, 유지 시간을 기록합니다.",
              "발동 조건이나 세트 규칙이 바뀌면 기존 결과를 만료 처리하고 영구 메타로 남기지 않습니다.",
            ],
          },
        ],
        scenarios: {
          pve: "피해 시간을 늘리기 위해 위험 지역에 남기보다 안정적인 근접 유지와 기믹 처리를 우선합니다.",
          pvp: "안전하게 접근할 대상과 이탈 방향을 먼저 확인한 뒤 압박 지속 여부를 판단합니다.",
          rvr: "아군 전선과 함께 움직이고 지원 없이 혼자 전열을 넘지 않습니다.",
        },
        difficultyNotes: [
          "역할 목표가 직관적이어서 입문 부담은 낮지만 근접 위치, 접촉 시간, 공수 전환 때문에 숙련 부담이 커집니다.",
          "이 평가는 피해 표, 승률, 장비 기준이나 미공개 스킬 수치를 사용하지 않습니다.",
        ],
        beginnerPractice: [
          "불필요한 위험을 받지 않고 대상에게 접근하고 이탈하는 연습만 합니다.",
          "전진 전에 아군, 위험 범위, 이탈 방향을 확인하는 전선 판단을 추가합니다.",
          "현재 지역의 스킬 설명으로 짧은 개인 흐름을 만들고 버전과 테스트 상황을 기록합니다.",
        ],
        commonMistakes: [
          "높은 방어 역할을 기믹 무시로 이해하지 말고 생존력을 면역이 아닌 복구 여유로 사용합니다.",
          "아군과 이탈 경로를 벗어나 추격하지 말고 접근 전 전선을 확인합니다.",
          "서브 탱커 설명을 고정 파티 규칙으로 바꾸지 말고 현재 콘텐츠 책임을 확인합니다.",
        ],
        versionBoundary: [
          "대검, 근접 딜러, 서브 탱커 설명은 2026-07-18 접근 가능한 공식 자료 기준입니다.",
          "글로벌 출시 스킬, 피해량, 재사용 시간, 능력치 우선순위, 최적 장비는 확인하지 않았습니다.",
        ],
        keywords: ["아이온2 검성", "검성 아르카나", "검성 빌드", "검성 가이드", "Gladiator build"],
      },
    },
  },
  {
    slug: "templar",
    koreanGuideTitle: "수호성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 守護星攻略：盾牌坦克、團隊責任與難度",
        description:
          "整理守護星官方長劍盾牌與前線坦克定位，並以編輯評估說明 PvE、PvP、RvR、站位、團隊責任、新手練習與常見失誤。",
        intro:
          "守護星的武器、阻擋與保護定位屬官方事實；團隊責任、玩法循環和難度屬 KINA 編輯評估。本文不宣稱任何副本必須使用守護星。",
        officialFacts: [
          "NC 官方 Guidebook 將守護星列為使用長劍與盾牌、阻擋攻擊並保護隊友的前線坦克。",
          "全球官方預告站目前列出 Templar；2025 年核心內容公告稱其承擔核心坦克角色。官方資料沒有因此保證每種內容的固定隊伍構成。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：建立敵人與隊伍之間的位置、維持可預測的戰線、觀察威脅轉移，並在隊友承壓時調整保護方向。",
          "主要難點不是追求最多操作，而是在資訊不完整時保持位置與責任清楚。實際仇恨、阻擋或保護規則仍以現行遊戲文字為準。",
        ],
        scenarios: {
          pve: "先保持敵人朝向、危險區域與隊伍位置可讀，再處理額外目標。",
          pvp: "把保護隊友和限制敵方推進放在盲目追擊之前。",
          rvr: "與己方核心隊伍形成可辨識的前線，避免脫離後排支援。",
        },
        difficultyNotes: [
          "操作密度不是唯一難點；站位、威脅判斷和失誤會直接影響隊友，因此精通與團隊責任分數很高。",
          "評分不表示守護星比其他職業更強，也不證明其為所有隊伍的必選角色。",
        ],
        beginnerPractice: [
          "先在低壓力情境保持敵人、自身與隊友的相對位置。",
          "一次只加入一種額外威脅，練習威脅轉移後重新建立戰線。",
          "依現行內容記錄實際坦克規則、隊伍要求和失誤恢復方式。",
        ],
        commonMistakes: [
          "只看自身生存而忽略隊友位置；修正方式是持續確認隊伍是否仍能利用你的前線。",
          "為追擊離開需要保護的區域；修正方式是先確認移動是否會暴露隊伍。",
          "把官方坦克定位寫成固定副本需求；修正方式是標示區服、版本與實際隊伍規則。",
        ],
        versionBoundary: [
          "長劍盾牌、阻擋、保護與核心坦克定位來自 2026-07-18 可核對的官方來源。",
          "本文沒有確認全球版仇恨公式、減傷數值、必備技能或固定副本席位。",
        ],
        keywords: ["AION2 守護星", "守護星攻略", "守護星難度", "AION2 坦克", "Templar guide"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 Templar guide: shield tanking, responsibility, and difficulty",
        description:
          "Official longsword, shield, and front-line tank facts for Templar, plus labeled editorial PvE, PvP, RvR, positioning, responsibility, practice, and mistake guidance.",
        intro:
          "Weapon, blocking, and protection identity are official facts. Group responsibility, combat loop, and difficulty are KINA editorial assessments. The page does not claim every activity requires a Templar.",
        officialFacts: [
          "NC's official Guidebook presents Templar with a longsword and shield as a front-line tank that blocks attacks and protects allies.",
          "The global teaser currently lists Templar, and NC's 2025 core-content release calls it the core tanking role. That does not publish a fixed party composition for every activity.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: establish position between threat and party, maintain a readable front, notice threat movement, and redirect protection when an ally comes under pressure.",
          "The main burden is not maximum input count but keeping position and responsibility clear with incomplete information. Live threat, block, and protection rules remain controlled by the game text.",
        ],
        scenarios: {
          pve: "Keep enemy facing, hazard space, and party position readable before handling additional targets.",
          pvp: "Protect allies and limit an enemy advance before defaulting to a chase.",
          rvr: "Create a recognizable front with the core group and avoid losing back-line support.",
        },
        difficultyNotes: [
          "Input density is not the only burden. Position, threat reading, and mistakes directly affecting allies drive the high mastery and responsibility scores.",
          "The rating does not make Templar stronger than another class or mandatory for every group.",
        ],
        beginnerPractice: [
          "Maintain the relative position of enemy, self, and party in a low-pressure context.",
          "Add one extra threat at a time and rebuild the front after it moves.",
          "Record live tank rules, party requirements, and recovery behavior for the current activity.",
        ],
        commonMistakes: [
          "Watching only personal survival; keep checking whether the party can still use the front you created.",
          "Leaving the protected area to chase; verify whether the movement exposes the party.",
          "Turning an official tank role into a fixed dungeon rule; attach region, build, and live party requirements.",
        ],
        versionBoundary: [
          "Longsword, shield, blocking, protection, and core tank wording come from official sources checked on 2026-07-18.",
          "This page does not confirm Global threat formulas, mitigation values, required skills, or guaranteed dungeon slots.",
        ],
        keywords: ["AION2 Templar", "Templar guide", "Templar difficulty", "AION2 tank", "shield class"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "AION2 수호성 가이드: 방패 탱킹, 파티 책임과 난이도",
        description:
          "수호성의 공식 장검·방패·최전선 탱커 역할과 편집 평가로 구분한 PvE, PvP, RvR, 위치, 책임, 연습, 실수 안내입니다.",
        intro:
          "무기, 방어, 보호 정체성은 공식 사실이고 파티 책임, 전투 흐름, 난이도는 KINA 편집 평가입니다. 모든 콘텐츠에 수호성이 필수라고 주장하지 않습니다.",
        officialFacts: [
          "NC 공식 가이드북은 수호성을 장검과 방패로 공격을 차단하고 아군을 보호하는 최전선 탱커로 소개합니다.",
          "글로벌 공식 티저는 Templar를 표시하고 2025년 핵심 콘텐츠 발표는 핵심 탱킹 역할이라고 설명합니다. 모든 콘텐츠의 고정 파티 구성을 뜻하지 않습니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 위협과 파티 사이에 위치 만들기, 읽기 쉬운 전선 유지, 위협 이동 확인, 아군이 압박받을 때 보호 방향 조정입니다.",
          "가장 많은 입력보다 불완전한 정보에서 위치와 책임을 명확히 유지하는 것이 핵심 부담입니다. 실제 적대치, 방어, 보호 규칙은 현재 게임 설명을 따릅니다.",
        ],
        scenarios: {
          pve: "추가 대상을 처리하기 전에 적 방향, 위험 공간, 파티 위치를 읽기 쉽게 유지합니다.",
          pvp: "무조건 추격하기보다 아군 보호와 적 진입 제한을 먼저 판단합니다.",
          rvr: "핵심 파티와 구분되는 전선을 만들고 후방 지원에서 벗어나지 않습니다.",
        },
        difficultyNotes: [
          "입력량만이 난이도는 아닙니다. 위치, 위협 판단, 실수가 아군에 미치는 영향 때문에 숙련과 책임 점수가 높습니다.",
          "평가는 수호성이 더 강하거나 모든 파티에 필수라는 뜻이 아닙니다.",
        ],
        beginnerPractice: [
          "낮은 압박 상황에서 적, 자신, 파티의 상대 위치를 유지합니다.",
          "추가 위협을 하나씩 넣고 이동 뒤 전선을 다시 만드는 연습을 합니다.",
          "현재 콘텐츠의 탱킹 규칙, 파티 요구, 실수 복구 방식을 기록합니다.",
        ],
        commonMistakes: [
          "자신의 생존만 보지 말고 파티가 만든 전선을 이용할 수 있는지 계속 확인합니다.",
          "추격 때문에 보호 구역을 떠나지 말고 이동이 파티를 노출하는지 먼저 봅니다.",
          "공식 탱커 역할을 고정 던전 규칙으로 바꾸지 말고 지역, 버전, 실제 파티 조건을 표시합니다.",
        ],
        versionBoundary: [
          "장검과 방패, 차단, 보호, 핵심 탱킹 역할은 2026-07-18 확인한 공식 출처 기준입니다.",
          "글로벌 적대치 공식, 피해 감소 수치, 필수 스킬, 고정 던전 자리는 확인하지 않았습니다.",
        ],
        keywords: ["AION2 수호성", "아이온2 수호성 가이드", "수호성 난이도", "아이온2 탱커", "Templar"],
      },
    },
  },
  {
    slug: "assassin",
    koreanGuideTitle: "살성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 殺星 Arcana 與 Build 攻略",
        description:
          "AION2 殺星 Arcana 與 Build 攻略：依官方雙短劍、隱身與快速連擊定位，整理 Arcana 選擇方法、進退節奏、PvE／PvP／RvR 與版本核對方式。",
        intro:
          "官方資料能說明殺星的武器和短時間壓制輪廓，不能直接證明最佳連段、PvP Tier 或傷害排名。所有難度與練習建議均明確標為編輯評估。",
        officialFacts: [
          "NC 官方 Guidebook 將殺星列為使用雙手短劍，利用隱身、快速連擊與狀態異常在短時間內壓制目標的近戰職業。",
          "全球官方預告站列出 Assassin；2025 年核心內容公告稱其為精準近戰專家。官方頁面沒有提供永久通用的最佳連段或排名。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：先觀察目標與退路、等待可控的進場時段、在短時間內完成既定操作，然後依結果撤離或重新定位。",
          "隱身不應被當成永遠安全或保證先手。實際可見性、控制和技能互動必須回到當前版本說明。",
        ],
        specializedSections: [
          {
            id: "assassin-arcana-selection",
            title: "殺星 Arcana 選擇方法：用進場、壓制與撤離三段驗證",
            paragraphs: [
              "NC 的更新證明 Arcana 卡牌與系列會增加，但截至 2026-07-26 沒有一份官方殺星永久最佳表。殺星的候選應分別放進「能否進場」「短時段能否穩定完成」「失敗後能否撤離」三段測試，而不是只看一次理想狀態的數字。",
              "每個測試只回答一個問題：觸發條件是否與目前技能和場景相容。若候選需要難以重複的前置狀態，或迫使玩家放棄原定撤離路線，就應標記為特定情境，而不是通用推薦。",
            ],
            bullets: [
              "先固定目標類型、進場條件和撤離點，再比較 Arcana；不要在不同場景之間混用結果。",
              "把成功進場率、被迫中止次數與安全重置能力列為觀察項，不用單次高傷害取代完整判斷。",
              "PvE、競技場與大規模戰鬥各留一份版本化紀錄，因為可控時段與反制來源不同。",
              "官方或遊戲內文字改動後重新核對觸發、持續與系列條件；本站不宣稱固定 BiS 或永久 Meta。",
            ],
          },
        ],
        scenarios: {
          pve: "先確保近戰機制和撤離方向，再追求短時間操作的完整度。",
          pvp: "把目標選擇、進場條件與撤離計畫視為同一個決策。",
          rvr: "以側翼觀察和有限目標為練習重點，避免離開支援後仍持續深入。",
        },
        difficultyNotes: [
          "短時間操作、站位、時機與失敗後恢復同時存在，因此上手和精通負擔都較高。",
          "高難度不等於高強度；本文完全不以難度推導勝率、傷害或 Tier。",
        ],
        beginnerPractice: [
          "不進場，只練習辨認目標、危險來源和安全撤離方向。",
          "加入一次短接近與撤回，確定可以停止錯誤進場。",
          "依現行技能說明建立可重複的小段操作，再測試不同情境。",
        ],
        commonMistakes: [
          "沒有退路就進場；修正方式是在操作前先指定撤離方向。",
          "把隱身當成無條件安全；修正方式是保留未知，依當前技能與敵方反制核對。",
          "用舊版連段或影片當成現行最佳答案；修正方式是記錄區服、版本與技能文字。",
        ],
        versionBoundary: [
          "雙手短劍、隱身、快速連擊、狀態異常與精準近戰輪廓為 2026-07-18 官方資料範圍。",
          "本文沒有列出技能名、冷卻、倍率、控制時間、裝備或最佳連段。",
        ],
        keywords: ["AION2 殺星", "殺星攻略", "殺星 Arcana", "殺星 Build", "Assassin build"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 Assassin Arcana & Build Guide",
        description:
          "A version-aware AION2 Assassin Arcana and build guide covering the official dual-dagger role, selection method, engagement, PvE, PvP, and RvR.",
        intro:
          "Official material supports the weapon and short-window pressure profile. It does not establish a best rotation, PvP tier, or damage rank. Every difficulty and practice recommendation is labeled editorial.",
        officialFacts: [
          "NC's official Guidebook presents Assassin with dual daggers, using stealth, fast chains, and status effects to pressure a target in a short window.",
          "The official global teaser lists Assassin, and the 2025 core-content release calls it a precision melee specialist. The pages do not publish one permanent best chain or rank.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: observe target and exit, wait for a controllable entry window, complete a predefined short sequence, then disengage or reposition based on the result.",
          "Stealth should not be read as permanent safety or a guaranteed first action. Current visibility, control, and skill interaction remain live-version questions.",
        ],
        specializedSections: [
          {
            id: "assassin-arcana-selection",
            title: "Assassin Arcana selection: validate entry, pressure, and exit separately",
            paragraphs: [
              "NC's updates confirm that Arcana cards and series continue to expand, but as of July 26, 2026 there is no official permanent best Assassin list. Test every candidate across three stages—entry, repeatable short-window pressure, and safe exit—instead of ranking it from one ideal result.",
              "Each test should answer whether the trigger fits the current skills and context. If a candidate requires an unreliable setup or removes the planned exit, label it situational rather than turning it into a general recommendation.",
            ],
            bullets: [
              "Fix the target type, entry condition, and exit point before comparing Arcana; do not mix results from different scenarios.",
              "Track successful entries, forced cancellations, and safe resets instead of letting one high-damage attempt decide the result.",
              "Keep separate versioned notes for PvE, arena play, and mass combat because controllable windows and counters differ.",
              "Recheck triggers, durations, and set conditions after official or in-game text changes; no fixed best-in-slot or permanent meta is asserted.",
            ],
          },
        ],
        scenarios: {
          pve: "Secure the melee mechanic and exit before optimizing completion of a short action window.",
          pvp: "Treat target choice, entry conditions, and exit plan as one decision.",
          rvr: "Practise flank observation and limited targets without continuing deeper after support is lost.",
        },
        difficultyNotes: [
          "Compressed execution, position, timing, and recovery after failure all compete for attention, producing high onboarding and mastery burden.",
          "High difficulty does not mean high power; no win rate, damage, or tier is inferred from it.",
        ],
        beginnerPractice: [
          "Do not engage; identify target, danger source, and safe exit only.",
          "Add one short approach and return, proving that a poor entry can be cancelled.",
          "Build a repeatable small sequence from the live skill text, then test separate contexts.",
        ],
        commonMistakes: [
          "Entering without an exit; designate the disengagement direction before acting.",
          "Treating stealth as unconditional safety; keep unknowns visible and verify current counters.",
          "Using an old rotation or video as the current best answer; record region, build, and skill text.",
        ],
        versionBoundary: [
          "Dual daggers, stealth, fast chains, status effects, and precision melee reflect official material checked on 2026-07-18.",
          "No skill name, cooldown, coefficient, control duration, gear set, or best chain is asserted.",
        ],
        keywords: ["AION2 Assassin", "Assassin Arcana", "Assassin build", "Assassin guide", "AION2 PvP class"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "아이온2 살성 아르카나·빌드 가이드",
        description:
          "아이온2 살성 아르카나와 빌드 가이드입니다. 공식 양손 단검·은신·빠른 연계 역할을 바탕으로 선택 방법, 진입과 이탈, PvE·PvP·RvR 및 버전 확인 기준을 정리합니다.",
        intro:
          "공식 자료는 무기와 짧은 압박 역할을 설명하지만 최적 연계, PvP 티어, 피해 순위를 증명하지 않습니다. 난이도와 연습은 모두 편집 평가로 표시합니다.",
        officialFacts: [
          "NC 공식 가이드북은 살성을 양손 단검으로 은신, 빠른 연계, 상태 이상을 사용해 짧은 시간에 대상을 제압하는 근접 직업으로 소개합니다.",
          "글로벌 공식 티저는 Assassin을 표시하며 2025년 핵심 콘텐츠 발표는 정밀 근접 전문가라고 설명합니다. 영구적인 최적 연계나 순위는 공개하지 않습니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 대상과 이탈 경로 관찰, 통제 가능한 진입 시간 대기, 정한 짧은 조작 실행, 결과에 따른 이탈 또는 재배치입니다.",
          "은신을 영구적인 안전이나 선행 행동 보장으로 이해하면 안 됩니다. 현재 가시성, 제어, 스킬 상호작용은 라이브 버전에서 확인합니다.",
        ],
        specializedSections: [
          {
            id: "assassin-arcana-selection",
            title: "살성 아르카나 선택법: 진입·압박·이탈을 나누어 검증",
            paragraphs: [
              "NC 업데이트는 아르카나 카드와 시리즈가 계속 확장되는 것을 확인하지만 2026년 7월 26일 기준 공식 영구 최적 살성 목록은 없습니다. 한 번의 이상적인 결과가 아니라 진입, 반복 가능한 짧은 압박, 안전한 이탈 세 단계로 후보를 시험합니다.",
              "각 시험은 발동 조건이 현재 스킬과 상황에 맞는지만 답해야 합니다. 재현하기 어려운 선행 조건이 필요하거나 예정한 이탈을 포기하게 만드는 후보는 범용 추천이 아니라 특정 상황용으로 표시합니다.",
            ],
            bullets: [
              "대상 유형, 진입 조건, 이탈 지점을 고정한 뒤 비교하고 서로 다른 상황의 결과를 섞지 않습니다.",
              "한 번의 높은 피해보다 진입 성공, 강제 중단, 안전한 재정비 횟수를 함께 기록합니다.",
              "통제 가능한 시간과 대응 수단이 다르므로 PvE·투기장·대규모 전투 기록을 버전별로 분리합니다.",
              "공식 또는 게임 내 문구가 바뀌면 발동·지속·세트 조건을 다시 확인하며 고정 BiS나 영구 메타를 주장하지 않습니다.",
            ],
          },
        ],
        scenarios: {
          pve: "짧은 조작 완성보다 근접 기믹과 이탈 경로를 먼저 확보합니다.",
          pvp: "대상 선택, 진입 조건, 이탈 계획을 하나의 결정으로 다룹니다.",
          rvr: "측면 관찰과 제한된 대상을 연습하고 지원을 잃은 뒤 더 깊이 들어가지 않습니다.",
        },
        difficultyNotes: [
          "짧은 조작, 위치, 타이밍, 실패 뒤 복구를 동시에 처리해 입문과 숙련 부담이 높습니다.",
          "높은 난이도는 높은 성능이 아니며 승률, 피해량, 티어를 추론하지 않습니다.",
        ],
        beginnerPractice: [
          "진입하지 않고 대상, 위험 원인, 안전한 이탈 경로만 식별합니다.",
          "짧은 접근과 복귀를 한 번 추가해 잘못된 진입을 중단하는 연습을 합니다.",
          "현재 스킬 설명으로 반복 가능한 작은 흐름을 만들고 상황을 나누어 시험합니다.",
        ],
        commonMistakes: [
          "이탈 경로 없이 진입하지 말고 행동 전에 방향을 정합니다.",
          "은신을 무조건 안전으로 보지 말고 현재 대응 수단을 확인합니다.",
          "예전 연계나 영상을 현재 최적 답으로 쓰지 말고 지역, 버전, 스킬 설명을 기록합니다.",
        ],
        versionBoundary: [
          "양손 단검, 은신, 빠른 연계, 상태 이상, 정밀 근접 역할은 2026-07-18 공식 자료 기준입니다.",
          "스킬명, 재사용 시간, 계수, 제어 시간, 장비, 최적 연계는 제시하지 않습니다.",
        ],
        keywords: ["아이온2 살성", "살성 아르카나", "살성 빌드", "살성 가이드", "Assassin build"],
      },
    },
  },
  {
    slug: "ranger",
    koreanGuideTitle: "궁성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 弓星 Skill Tree 與 Build 攻略",
        description:
          "AION2 弓星 Skill Tree 與 Build 攻略：依官方遠程弓職定位，整理技能樹優先框架、站位循環、PvE／PvP／RvR、常見失誤及版本核對方式。",
        intro:
          "弓星的弓、遠距離攻擊、站位與時機輪廓來自官方資料；如何練習和難度高低是編輯評估。本文不提供未核實射程、技能或傷害排名。",
        officialFacts: [
          "NC 官方 Guidebook 將弓星列為使用弓的遠距離職業，強調站位、時機與戰術應對。",
          "全球官方預告站目前使用 Ranger 名稱；2025 年英文核心內容公告曾使用 Marksman 並稱其為長距離偵察職業。本站以現行全球站名稱為主。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：先建立安全距離與視線、在目標或環境移動時重新站位、只在位置允許時維持攻擊，並預留下一段移動空間。",
          "遠距離不等於無風險。實際射程、移動限制和技能行為都必須依當前遊戲說明核對。",
        ],
        specializedSections: [
          {
            id: "ranger-skill-tree-priority",
            title: "弓星 Skill Tree 與技能優先框架：先確保可用，再增加輸出",
            paragraphs: [
              "截至 2026-07-26，官方資料確認弓星以站位、時機與戰術應對進行遠距攻擊，但沒有公布全球版永久最佳 Skill Tree。以下是版本化規劃框架，不是虛構技能名稱或固定點法。",
              "先把目前可用技能按「保持距離與視線」「穩定完成主要攻擊」「回應場景機制」「理想條件下增加輸出」分組，再依實際失敗原因調整。每次版本更新後保留舊樹日期，另建新版本，不覆蓋測試背景。",
            ],
            bullets: [
              "第一優先：讓角色能在移動與機制中維持安全位置、視線及下一條路線。",
              "第二優先：強化可穩定使用的主要功能；若條件經常失效，不因試算較高就優先。",
              "第三優先：依 PvE、PvP 或 RvR 補足控場、機動、保命或團隊需要，三種場景分開保存。",
              "最後才比較純輸出候選，並記錄區服、版本、裝備背景與測試內容；官方技能文字改動即重新評估。",
            ],
          },
        ],
        scenarios: {
          pve: "在機制移動前預留下一個安全位置，避免只為攻擊而失去視線或路線。",
          pvp: "把距離、障礙物和敵方接近路線一起納入目標選擇。",
          rvr: "跟隨後排與前線距離，避免因追擊而暴露在己方保護之外。",
        },
        difficultyNotes: [
          "距離能降低部分接觸壓力，但站位、視線和移動規劃帶來中等上手與較高精通負擔。",
          "評分不代表弓星在 PvE、PvP 或 RvR 的強度與排名。",
        ],
        beginnerPractice: [
          "不攻擊，只練習在移動中維持距離、視線和下一個安全位置。",
          "加入單一目標，確保每次攻擊後仍保留移動路線。",
          "在現行版本核對實際射程、移動限制與技能提示後再細化循環。",
        ],
        commonMistakes: [
          "只看與目標的距離而忽略障礙和退路；修正方式是同時確認視線與下一位置。",
          "為追擊離開隊伍保護；修正方式是設定不可越過的戰線。",
          "把遠距角色等同新手必然容易；修正方式是獨立評估站位與決策負擔。",
        ],
        versionBoundary: [
          "弓、遠距離、站位、時機與戰術應對為 2026-07-18 官方資料範圍。",
          "本文沒有確認射程數值、移動射擊規則、技能名、傷害、配裝或全球版平衡。",
        ],
        keywords: ["AION2 弓星", "弓星攻略", "弓星 Skill Tree", "弓星 Build", "Ranger build"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 Ranger Skill Tree & Build Guide",
        description:
          "A version-aware AION2 Ranger skill tree and build guide covering the official bow role, skill priorities, positioning, PvE, PvP, and RvR.",
        intro:
          "Bow, ranged attacks, positioning, and timing come from official material. Practice method and difficulty are editorial. No unverified range, skill, or damage ranking is supplied.",
        officialFacts: [
          "NC's official Guidebook presents Ranger with a Bow and emphasizes positioning, timing, and tactical response in ranged attacks.",
          "The current official global teaser uses Ranger. NC's 2025 English core-content release used Marksman and described a long-range scout. KINA follows the current global name.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: establish safe range and line of sight, reposition when target or environment moves, attack only while position permits, and preserve space for the next movement.",
          "Range is not immunity. Actual distance, movement restrictions, and skill behavior must be checked in the current game text.",
        ],
        specializedSections: [
          {
            id: "ranger-skill-tree-priority",
            title: "Ranger skill-tree priority: make the build usable before adding output",
            paragraphs: [
              "As of July 26, 2026, official material confirms a ranged role shaped by positioning, timing, and tactical response, but it does not publish one permanent best Global skill tree. This is a versioned planning framework, not an invented skill list or fixed allocation.",
              "Group the skills available in the current client by four jobs: preserve range and line of sight, deliver the reliable core action, answer the activity mechanic, and add output under ideal conditions. Change priority according to the failure observed, and save a new dated tree after a build update instead of overwriting its context.",
            ],
            bullets: [
              "First: preserve safe position, line of sight, and the next movement route during mechanics.",
              "Second: support the core function that remains repeatable; do not prioritize a higher estimate when its condition regularly fails.",
              "Third: add control, mobility, survival, or party utility for PvE, PvP, or RvR and keep those trees separate.",
              "Only then compare pure-output candidates, recording region, build, gear context, and activity; reassess when official skill text changes.",
            ],
          },
        ],
        scenarios: {
          pve: "Reserve the next safe position before mechanic movement instead of losing line of sight or route for one more action.",
          pvp: "Include range, obstacles, and enemy approach routes in target selection.",
          rvr: "Maintain the relationship between back line and front, avoiding chases beyond friendly protection.",
        },
        difficultyNotes: [
          "Range reduces some contact pressure, while position, line of sight, and movement planning create moderate onboarding and higher mastery burden.",
          "The rating says nothing about Ranger strength or rank in PvE, PvP, or RvR.",
        ],
        beginnerPractice: [
          "Do not attack; maintain range, line of sight, and a next safe position while moving.",
          "Add one target and preserve a movement route after every action.",
          "Verify live range, movement restrictions, and tooltips before refining the loop.",
        ],
        commonMistakes: [
          "Watching target distance but not obstacles or exit; check line of sight and next position together.",
          "Chasing beyond party protection; define a front that should not be crossed.",
          "Assuming every ranged role is automatically easy for beginners; assess positioning and decision load separately.",
        ],
        versionBoundary: [
          "Bow, range, positioning, timing, and tactical-response wording reflect official material checked on 2026-07-18.",
          "No range value, moving-attack rule, skill name, damage, gear build, or Global balance claim is made.",
        ],
        keywords: ["AION2 Ranger", "Ranger skill tree", "Ranger build", "Ranger guide", "AION2 ranged class"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "아이온2 궁성 스킬 트리·빌드 가이드",
        description:
          "아이온2 궁성 스킬 트리와 빌드 가이드입니다. 공식 원거리 활 역할을 바탕으로 스킬 우선순위, 위치 운용, PvE·PvP·RvR, 실수와 버전 확인 기준을 정리합니다.",
        intro:
          "활, 원거리 공격, 위치, 타이밍은 공식 자료이며 연습 방식과 난이도는 편집 평가입니다. 미확인 사거리, 스킬, 피해 순위를 제시하지 않습니다.",
        officialFacts: [
          "NC 공식 가이드북은 궁성을 활을 사용하는 원거리 직업으로 소개하고 위치 선정, 타이밍, 전술 대응을 강조합니다.",
          "현재 글로벌 공식 티저는 Ranger를 사용합니다. 2025년 영문 핵심 콘텐츠 발표는 Marksman과 장거리 정찰 역할을 사용했으며 KINA는 현재 글로벌 이름을 따릅니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 안전 거리와 시야 만들기, 대상이나 환경 이동 뒤 재배치, 위치가 허용할 때만 공격 유지, 다음 이동 공간 보존입니다.",
          "원거리는 무위험이 아닙니다. 실제 거리, 이동 제한, 스킬 행동은 현재 게임 설명에서 확인해야 합니다.",
        ],
        specializedSections: [
          {
            id: "ranger-skill-tree-priority",
            title: "궁성 스킬 트리 우선순위: 피해보다 실제 사용 가능성을 먼저 확보",
            paragraphs: [
              "2026년 7월 26일 기준 공식 자료는 궁성이 위치, 타이밍과 전술 대응을 중시하는 원거리 직업임을 확인하지만 글로벌 영구 최적 스킬 트리는 공개하지 않았습니다. 아래는 스킬명이나 고정 포인트를 만들지 않는 버전별 설계 틀입니다.",
              "현재 클라이언트의 스킬을 거리·시야 유지, 반복 가능한 핵심 행동, 콘텐츠 기믹 대응, 이상적인 조건의 추가 피해로 나눈 뒤 실제 실패 원인에 따라 우선순위를 바꿉니다. 업데이트 뒤에는 기존 배경을 덮어쓰지 말고 날짜가 있는 새 트리를 저장합니다.",
            ],
            bullets: [
              "1순위: 기믹 중 안전한 위치, 시야와 다음 이동 경로를 유지하게 합니다.",
              "2순위: 반복해서 사용할 수 있는 핵심 기능을 보완하고 조건이 자주 깨지는 높은 기대값은 뒤로 둡니다.",
              "3순위: PvE·PvP·RvR에 필요한 제어, 기동, 생존 또는 파티 기능을 추가하고 트리를 분리합니다.",
              "마지막에 순수 피해 후보를 비교하며 지역, 버전, 장비 배경과 콘텐츠를 기록하고 공식 스킬 문구 변경 시 재평가합니다.",
            ],
          },
        ],
        scenarios: {
          pve: "기믹 이동 전에 다음 안전 위치를 남기고 한 번의 행동 때문에 시야나 경로를 잃지 않습니다.",
          pvp: "거리, 장애물, 적 접근 경로를 함께 대상 선택에 반영합니다.",
          rvr: "후열과 전선의 관계를 유지하고 아군 보호 밖으로 추격하지 않습니다.",
        },
        difficultyNotes: [
          "거리가 일부 접촉 부담을 줄이지만 위치, 시야, 이동 계획 때문에 입문은 중간, 숙련 부담은 더 높습니다.",
          "평가는 PvE, PvP, RvR에서 궁성의 성능이나 순위를 뜻하지 않습니다.",
        ],
        beginnerPractice: [
          "공격하지 않고 이동하면서 거리, 시야, 다음 안전 위치를 유지합니다.",
          "대상 하나를 추가하고 매 행동 뒤 이동 경로를 남깁니다.",
          "현재 사거리, 이동 제한, 툴팁을 확인한 뒤 흐름을 세분화합니다.",
        ],
        commonMistakes: [
          "대상 거리만 보고 장애물과 이탈을 놓치지 말고 시야와 다음 위치를 함께 봅니다.",
          "파티 보호 밖으로 추격하지 말고 넘지 않을 전선을 정합니다.",
          "원거리 직업이 자동으로 쉬운 직업이라고 보지 말고 위치와 판단 부담을 따로 평가합니다.",
        ],
        versionBoundary: [
          "활, 원거리, 위치, 타이밍, 전술 대응은 2026-07-18 공식 자료 기준입니다.",
          "사거리 수치, 이동 공격 규칙, 스킬명, 피해량, 장비, 글로벌 밸런스는 확인하지 않았습니다.",
        ],
        keywords: ["아이온2 궁성", "궁성 스킬 트리", "궁성 빌드", "궁성 가이드", "Ranger build"],
      },
    },
  },
  {
    slug: "sorcerer",
    koreanGuideTitle: "마도성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 魔道星 Build 與技能優先攻略",
        description:
          "AION2 魔道星 Build 與技能優先攻略：依官方魔法書、短時間高魔法傷害與控場定位，整理版本化 Build、技能優先框架、PvE／PvP／RvR 與核對方法。",
        intro:
          "官方資料支持魔道星的武器與短時間魔法輸出輪廓；安全施法時段、玩法難度和練習順序是編輯評估。本文不捏造技能或倍率。",
        officialFacts: [
          "NC 官方 Guidebook 將魔道星列為使用魔法書、專注短時間高魔法傷害，並需注意距離與控場的遠程輸出。",
          "全球官方預告站列出 Sorcerer；2025 年核心內容公告亦描述其高爆發魔法傷害。官方輪廓沒有提供傷害排名或最佳技能順序。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：建立安全施法位置、觀察目標與危險移動、只在時段允許時完成短壓力，並在位置失效時先中止而不是硬撐。",
          "控場屬官方角色輪廓，但具體技能、持續時間與對抗規則必須由現行技能文字確認。",
        ],
        specializedSections: [
          {
            id: "sorcerer-versioned-build",
            title: "魔道星 Build Planning：每個版本保留一份可驗證配置",
            paragraphs: [
              "NC 的官方介紹確認 AION 2 採用重視即時判斷的手動戰鬥，但沒有公布魔道星永久最佳 Build。截至 2026-07-26，建議把每份 Build 記為「區服＋版本日期＋內容＋目標」，不要只留一張會失去背景的點法截圖。",
              "先寫下這份 Build 要解決的問題，例如移動頻繁、可施法時段短或需要控場回應，再從當前客戶端的實際技能文字選擇。若遊戲版本、技能條件或場景改變，就複製舊版本另建新紀錄。",
            ],
            bullets: [
              "頁首記錄區服、客戶端版本、核對日期、PvE／PvP／RvR 場景及裝備背景。",
              "每個選擇附上一句目的與可觀察結果；沒有實測證據時標示「待驗證」。",
              "一次只調整一個優先項並重複相同場景，避免把裝備、隊友或機制差異誤判成 Build 效果。",
              "保留舊版而非宣稱永久 Meta；本頁不提供未核實倍率、冷卻或最佳傷害結論。",
            ],
          },
          {
            id: "sorcerer-skill-priority",
            title: "魔道星技能優先思路：安全施法、可靠功能、場景回應、理想輸出",
            paragraphs: [
              "技能優先不是固定輪轉。先保留能讓施法位置成立或避免錯誤時段的工具，再處理能穩定履行短時間魔法輸出與控場定位的功能；只有前兩層可靠後，才比較理想條件下的額外輸出。",
            ],
            bullets: [
              "第一層：安全位置與中止能力，條件失效時能移動或停止錯誤決策。",
              "第二層：目前場景中可重複使用的核心功能，不依賴難以維持的前置條件。",
              "第三層：依副本機制、對手或大型戰線加入控場、機動、保命等回應。",
              "第四層：在前三層不被破壞的前提下比較額外輸出；每次更新後由第一層重新核對。",
            ],
          },
        ],
        scenarios: {
          pve: "把安全施法位置和機制移動排在完整輸出時段之前。",
          pvp: "先創造距離與視線，再決定是否使用短時間壓力。",
          rvr: "依己方前線調整後排位置，避免長時間停留在可被直接接近的路線。",
        },
        difficultyNotes: [
          "角色目標清楚，但站位、施法時段與控場判斷使精通負擔高於單純理解角色。",
          "難度不等於傷害上限，亦不支持任何 PvE 或 PvP Tier。",
        ],
        beginnerPractice: [
          "不追求完整操作，只練習選擇安全施法位置和下一個位置。",
          "加入一個短時段，練習在條件失效時中止並移動。",
          "依所在地區的現行技能文字建立控制與輸出的分開測試。",
        ],
        commonMistakes: [
          "位置失效後仍完成操作；修正方式是先練習中止和移動。",
          "只看距離而忽略視線與接近路線；修正方式是同時規劃下一位置。",
          "把高爆發官方描述當成傷害第一；修正方式是只保留角色輪廓，不推導排名。",
        ],
        versionBoundary: [
          "魔法書、短時間高魔法傷害、距離與控場為 2026-07-18 官方資料範圍。",
          "本文沒有確認技能名、施法時間、冷卻、倍率、控制持續、裝備或最佳循環。",
        ],
        keywords: ["AION2 魔道星", "魔道星攻略", "魔道星 Build", "魔道星技能優先", "Sorcerer build"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 Sorcerer Build & Skill Priority Guide",
        description:
          "A version-aware AION2 Sorcerer build guide covering the official spellbook role, skill priorities, safe casting, PvE, PvP, and RvR.",
        intro:
          "Official material supports the weapon and short-window magic profile. Safe casting windows, play difficulty, and practice order are editorial. No skill or coefficient is invented.",
        officialFacts: [
          "NC's official Guidebook presents Sorcerer with a Spellbook, focused on high magic damage in a short window while managing range and control.",
          "The official global teaser lists Sorcerer, and NC's 2025 core-content release describes high burst magic damage. The profile supplies no damage rank or best skill order.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: establish a safe casting position, read target and hazard movement, complete short pressure only while the window permits, and cancel rather than force an action after position fails.",
          "Control is part of the official profile, while actual skills, durations, and counter rules must come from the current skill text.",
        ],
        specializedSections: [
          {
            id: "sorcerer-versioned-build",
            title: "Sorcerer build planning: keep one verifiable sheet per game build",
            paragraphs: [
              "NC's official overview describes decision-led manual combat, but it does not publish a permanent best Sorcerer build. As of July 26, 2026, label every plan with region, build date, activity, and objective instead of preserving a context-free allocation screenshot.",
              "Write the problem first—frequent movement, short casting windows, or a control requirement—then choose from the skill text in the client you can actually play. When the game build, condition, or activity changes, copy the old sheet and create a new record.",
            ],
            bullets: [
              "Record region, client build, verification date, PvE/PvP/RvR context, and relevant gear background.",
              "Give every choice one purpose and one observable result; mark it unverified when no repeatable test exists.",
              "Change one priority at a time and repeat the same scenario so gear, party, or mechanic differences are not mistaken for build effects.",
              "Retain dated versions instead of claiming a permanent meta; no unverified coefficient, cooldown, or best-damage conclusion is supplied.",
            ],
          },
          {
            id: "sorcerer-skill-priority",
            title: "Sorcerer skill priority: safe casting, reliable function, context, then ideal output",
            paragraphs: [
              "Priority is not a fixed rotation. Preserve tools that keep a casting position valid or stop a bad window first, then support the repeatable functions behind the official short-window magic and control profile. Compare extra ideal-condition output only after those two layers remain reliable.",
            ],
            bullets: [
              "Layer one: safe position and cancellation, so a failed condition becomes movement rather than a forced action.",
              "Layer two: a repeatable core function for the current activity, without relying on an unstable prerequisite.",
              "Layer three: control, mobility, survival, or another response required by the encounter, opponent, or mass-combat line.",
              "Layer four: additional output that does not break the first three layers; restart the review at layer one after an update.",
            ],
          },
        ],
        scenarios: {
          pve: "Place safe casting position and mechanic movement ahead of completing a full pressure window.",
          pvp: "Create range and line of sight before deciding whether to commit a short pressure window.",
          rvr: "Adjust back-line position with the friendly front and avoid remaining on a direct approach route.",
        },
        difficultyNotes: [
          "The objective is clear, while position, casting window, and control decisions make mastery harder than understanding the role.",
          "Difficulty is not damage ceiling and supports no PvE or PvP tier.",
        ],
        beginnerPractice: [
          "Ignore full execution and choose a safe casting position plus the next position.",
          "Add one short window and cancel into movement when its condition fails.",
          "Use current regional skill text to test control and damage decisions separately.",
        ],
        commonMistakes: [
          "Finishing an action after position fails; practise cancellation and movement first.",
          "Watching range but not line of sight or approach route; plan the next position together.",
          "Turning official burst wording into a number-one damage claim; keep it as role profile only.",
        ],
        versionBoundary: [
          "Spellbook, short-window magic damage, range, and control reflect official material checked on 2026-07-18.",
          "No skill name, cast time, cooldown, coefficient, control duration, equipment, or best loop is asserted.",
        ],
        keywords: ["AION2 Sorcerer", "Sorcerer build", "Sorcerer skill priority", "Sorcerer guide", "magic class"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "아이온2 마도성 빌드·스킬 우선순위 가이드",
        description:
          "아이온2 마도성 빌드와 스킬 우선순위 가이드입니다. 공식 마법서·순간 피해·거리·군중 제어 역할을 바탕으로 PvE·PvP·RvR과 버전별 검증 기준을 정리합니다.",
        intro:
          "공식 자료는 무기와 짧은 마법 피해 역할을 설명합니다. 안전한 시전 시간, 난이도, 연습 순서는 편집 평가이며 스킬이나 계수를 만들지 않습니다.",
        officialFacts: [
          "NC 공식 가이드북은 마도성을 마법서로 짧은 시간 높은 마법 피해를 주며 거리와 제어를 관리하는 원거리 딜러로 소개합니다.",
          "글로벌 공식 티저는 Sorcerer를 표시하고 2025년 핵심 콘텐츠 발표는 높은 순간 마법 피해를 설명합니다. 피해 순위나 최적 스킬 순서는 없습니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 안전한 시전 위치 만들기, 대상과 위험 이동 확인, 가능한 시간에만 짧은 압박 실행, 위치가 무너지면 억지로 끝내지 않고 중단하기입니다.",
          "제어는 공식 역할의 일부지만 실제 스킬, 지속 시간, 대응 규칙은 현재 스킬 설명으로 확인해야 합니다.",
        ],
        specializedSections: [
          {
            id: "sorcerer-versioned-build",
            title: "마도성 빌드 설계: 게임 버전마다 검증 가능한 기록을 따로 보관",
            paragraphs: [
              "NC 공식 소개는 순간 판단을 중시하는 수동 전투를 설명하지만 영구 최적 마도성 빌드를 공개하지 않습니다. 2026년 7월 26일 기준 모든 계획에 지역, 버전 날짜, 콘텐츠와 목표를 붙이고 배경 없는 배분 스크린샷만 남기지 않습니다.",
              "잦은 이동, 짧은 시전 시간, 제어 대응 등 해결할 문제를 먼저 쓰고 실제 플레이 가능한 클라이언트의 스킬 문구에서 선택합니다. 게임 버전, 조건이나 상황이 바뀌면 기존 기록을 복사해 새 버전으로 만듭니다.",
            ],
            bullets: [
              "지역, 클라이언트 버전, 확인일, PvE·PvP·RvR 상황과 관련 장비 배경을 기록합니다.",
              "각 선택에 목적과 관찰 결과를 하나씩 적고 반복 시험이 없으면 미확인으로 표시합니다.",
              "한 번에 우선순위 하나만 바꾸고 같은 상황을 반복해 장비·파티·기믹 차이를 빌드 효과로 오해하지 않습니다.",
              "영구 메타 대신 날짜별 기록을 남기며 미확인 계수, 재사용 시간이나 최고 피해 결론을 제시하지 않습니다.",
            ],
          },
          {
            id: "sorcerer-skill-priority",
            title: "마도성 스킬 우선순위: 안전한 시전, 반복 기능, 상황 대응, 이상적 피해",
            paragraphs: [
              "우선순위는 고정 로테이션이 아닙니다. 시전 위치를 유지하거나 잘못된 시간을 중단하는 기능을 먼저 남기고, 공식 역할인 짧은 마법 피해와 제어를 반복해서 수행하는 기능을 보완합니다. 두 층이 안정된 뒤에만 이상적인 조건의 추가 피해를 비교합니다.",
            ],
            bullets: [
              "1단계: 조건이 무너지면 행동을 강제하지 않고 이동하거나 중단할 수 있는 안전 위치와 취소 능력.",
              "2단계: 불안정한 선행 조건 없이 현재 콘텐츠에서 반복 가능한 핵심 기능.",
              "3단계: 던전 기믹, 상대 또는 대규모 전선에 필요한 제어, 기동, 생존 등의 대응.",
              "4단계: 앞의 세 층을 깨지 않는 추가 피해이며 업데이트 뒤에는 1단계부터 다시 확인합니다.",
            ],
          },
        ],
        scenarios: {
          pve: "전체 압박 시간을 끝내기보다 안전한 시전 위치와 기믹 이동을 먼저 둡니다.",
          pvp: "짧은 압박을 결정하기 전에 거리와 시야를 만듭니다.",
          rvr: "아군 전선에 맞춰 후열 위치를 바꾸고 직접 접근 경로에 오래 머물지 않습니다.",
        },
        difficultyNotes: [
          "역할 목표는 명확하지만 위치, 시전 시간, 제어 판단 때문에 역할 이해보다 숙련 부담이 높습니다.",
          "난이도는 피해 상한이 아니며 PvE나 PvP 티어를 뜻하지 않습니다.",
        ],
        beginnerPractice: [
          "전체 조작보다 안전한 시전 위치와 다음 위치만 고릅니다.",
          "짧은 시간 하나를 추가하고 조건이 무너지면 이동으로 중단합니다.",
          "현재 지역 스킬 설명으로 제어와 피해 판단을 나누어 시험합니다.",
        ],
        commonMistakes: [
          "위치가 무너진 뒤 행동을 끝내지 말고 중단과 이동을 먼저 연습합니다.",
          "거리만 보고 시야와 접근 경로를 놓치지 말고 다음 위치를 함께 계획합니다.",
          "공식 순간 피해 설명을 피해 1위로 바꾸지 말고 역할 설명으로만 유지합니다.",
        ],
        versionBoundary: [
          "마법서, 짧은 마법 피해, 거리, 제어는 2026-07-18 공식 자료 기준입니다.",
          "스킬명, 시전 시간, 재사용 시간, 계수, 제어 지속, 장비, 최적 흐름은 확인하지 않았습니다.",
        ],
        keywords: ["아이온2 마도성", "마도성 빌드", "마도성 스킬 우선순위", "마도성 가이드", "Sorcerer build"],
      },
    },
  },
  {
    slug: "spiritmaster",
    koreanGuideTitle: "정령성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 精靈星攻略：召喚、持續效果與管理難度",
        description:
          "整理精靈星官方寶珠、精靈召喚、狀態異常與持續傷害定位，並以編輯評估說明 PvE、PvP、RvR、資訊管理、練習和失誤。",
        intro:
          "官方資料能證明精靈星的召喚與削弱輪廓；如何管理召喚物、狀態和玩法難度屬編輯評估。本文不捏造召喚物數值、技能或最佳循環。",
        officialFacts: [
          "NC 官方 Guidebook 將精靈星列為使用寶珠、召喚屬性精靈，並以狀態異常與持續傷害削弱敵人的職業。",
          "全球官方預告站列出 SpiritMaster；2025 年核心內容公告描述其偏向單人玩法。這不證明任何版本的單人效率排名。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：先確認召喚物與自身位置、依固定順序查看目標狀態與持續效果、在環境改變時重新安排位置，最後確認是否仍能安全維持壓力。",
          "召喚物行為、狀態規則與效果持續時間都可能隨版本改變，必須由當前技能和介面核對。",
        ],
        scenarios: {
          pve: "以召喚物、自身站位和持續效果的穩定管理為目標，不假設單一最佳順序。",
          pvp: "先確認目標狀態、距離和反制，再決定是否維持或轉移壓力。",
          rvr: "限制同時追蹤的目標數量，避免資訊過量導致自身位置失控。",
        },
        difficultyNotes: [
          "召喚物、持續效果、目標狀態與自身站位同時競爭注意力，因此資訊與決策負擔高。",
          "高管理難度不代表較高傷害、單人效率或任何 Tier。",
        ],
        beginnerPractice: [
          "先只練習召喚物與自身保持可控位置，不加入額外狀態管理。",
          "建立固定查看順序，一次加入一種狀態或持續效果。",
          "在現行技能文字中核對召喚物行為、效果條件與版本差異。",
        ],
        commonMistakes: [
          "同時查看太多目標而失去自身位置；修正方式是限制追蹤數量。",
          "假設召喚物會自動處理所有情況；修正方式是把行為未知處留待現行版本核對。",
          "把單人取向寫成單人最強；修正方式是只描述官方角色輪廓。",
        ],
        versionBoundary: [
          "寶珠、屬性精靈、狀態異常、持續傷害與單人取向來自 2026-07-18 官方資料。",
          "本文沒有確認召喚物 AI、技能名、持續時間、倍率、資源、裝備或最佳順序。",
        ],
        keywords: ["AION2 精靈星", "精靈星攻略", "精靈星難度", "精靈星玩法", "SpiritMaster guide"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 SpiritMaster guide: summons, persistent effects, and difficulty",
        description:
          "Official Orb, elemental-spirit, status-effect, and damage-over-time facts for SpiritMaster, plus editorial PvE, PvP, RvR, information-management, practice, and mistake guidance.",
        intro:
          "Official material supports the summon and weakening profile. Summon management, status management, and difficulty are editorial. No summon value, skill, or best loop is invented.",
        officialFacts: [
          "NC's official Guidebook presents Spiritmaster with an Orb, summoning elemental spirits and weakening enemies through status effects and damage over time.",
          "The official global teaser spells the name SpiritMaster, while NC's 2025 core-content release describes a solo-oriented profile. That does not prove a solo-efficiency rank.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: check summon and personal position, review target state and persistent effects in a fixed order, reposition when the environment changes, then confirm pressure remains safe to maintain.",
          "Summon behavior, status rules, and effect duration can change by build and must be checked in current skill and interface text.",
        ],
        scenarios: {
          pve: "Aim for stable summon, personal position, and persistent-effect management without assuming one best order.",
          pvp: "Read target state, range, and counterplay before maintaining or transferring pressure.",
          rvr: "Limit simultaneous tracked targets so information load does not break personal positioning.",
        },
        difficultyNotes: [
          "Summon, persistent effects, target state, and personal position compete for attention, creating high information and decision load.",
          "High management difficulty does not mean higher damage, solo efficiency, or tier.",
        ],
        beginnerPractice: [
          "Control summon and personal position without adding extra status management.",
          "Create a fixed check order and add one status or persistent effect at a time.",
          "Verify summon behavior, effect conditions, and build differences in the current skill text.",
        ],
        commonMistakes: [
          "Tracking too many targets and losing personal position; limit the active tracking set.",
          "Assuming the summon automatically resolves every context; leave behavior unknown until checked in the live build.",
          "Turning a solo-oriented profile into 'best solo'; retain the official wording only.",
        ],
        versionBoundary: [
          "Orb, elemental spirits, status effects, damage over time, and solo-oriented wording reflect official material checked on 2026-07-18.",
          "No summon AI, skill name, duration, coefficient, resource, equipment, or best order is asserted.",
        ],
        keywords: ["AION2 SpiritMaster", "Spiritmaster guide", "Spiritmaster difficulty", "summoner class", "AION2 solo class"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "AION2 정령성 가이드: 소환, 지속 효과와 관리 난이도",
        description:
          "정령성의 공식 보주·정령 소환·상태 이상·지속 피해 역할과 편집 평가로 구분한 PvE, PvP, RvR, 정보 관리, 연습, 실수 안내입니다.",
        intro:
          "공식 자료는 소환과 약화 역할을 확인합니다. 소환수·상태 관리와 난이도는 편집 평가이며 소환수 수치, 스킬, 최적 흐름을 만들지 않습니다.",
        officialFacts: [
          "NC 공식 가이드북은 정령성을 보주로 정령을 소환하고 상태 이상과 지속 피해로 적을 약화하는 직업으로 소개합니다.",
          "글로벌 공식 티저는 SpiritMaster를 표시하고 2025년 핵심 콘텐츠 발표는 솔로 지향 역할을 설명합니다. 솔로 효율 순위를 증명하지 않습니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 소환수와 자신의 위치 확인, 고정 순서로 대상 상태와 지속 효과 확인, 환경 변화 뒤 재배치, 안전한 압박 유지 여부 확인입니다.",
          "소환수 행동, 상태 규칙, 효과 지속 시간은 버전에 따라 달라질 수 있어 현재 스킬과 화면에서 확인해야 합니다.",
        ],
        scenarios: {
          pve: "하나의 최적 순서를 가정하지 않고 소환수, 자신의 위치, 지속 효과를 안정적으로 관리합니다.",
          pvp: "대상 상태, 거리, 대응 수단을 읽은 뒤 압박 유지 또는 전환을 결정합니다.",
          rvr: "동시에 추적하는 대상을 제한해 정보 과부하로 자신의 위치를 잃지 않습니다.",
        },
        difficultyNotes: [
          "소환수, 지속 효과, 대상 상태, 자신의 위치가 주의를 경쟁해 정보와 판단 부담이 높습니다.",
          "높은 관리 난이도는 더 높은 피해, 솔로 효율, 티어를 뜻하지 않습니다.",
        ],
        beginnerPractice: [
          "추가 상태 관리 없이 소환수와 자신의 위치만 통제합니다.",
          "고정 확인 순서를 만들고 상태나 지속 효과를 하나씩 추가합니다.",
          "현재 스킬 설명으로 소환수 행동, 효과 조건, 버전 차이를 확인합니다.",
        ],
        commonMistakes: [
          "너무 많은 대상을 추적해 자신의 위치를 잃지 말고 활성 추적 수를 제한합니다.",
          "소환수가 모든 상황을 자동 처리한다고 가정하지 말고 라이브 버전 확인 전에는 미확인으로 둡니다.",
          "솔로 지향 역할을 솔로 최강으로 바꾸지 말고 공식 설명만 유지합니다.",
        ],
        versionBoundary: [
          "보주, 정령, 상태 이상, 지속 피해, 솔로 지향 역할은 2026-07-18 공식 자료 기준입니다.",
          "소환수 AI, 스킬명, 지속 시간, 계수, 자원, 장비, 최적 순서는 확인하지 않았습니다.",
        ],
        keywords: ["AION2 정령성", "아이온2 정령성 가이드", "정령성 난이도", "정령성 플레이", "SpiritMaster"],
      },
    },
  },
  {
    slug: "cleric",
    koreanGuideTitle: "치유성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 治癒星攻略：核心治療、優先級與團隊難度",
        description:
          "整理治癒星官方戰鎚與核心治療定位，並以編輯評估說明 PvE、PvP、RvR、目標優先級、自身生存、新手練習與常見失誤。",
        intro:
          "官方資料能證明治癒星維持隊伍生存的角色，不能證明固定治療循環、必選地位或治療量排名。玩法和難度均標為編輯評估。",
        officialFacts: [
          "NC 官方 Guidebook 將治癒星列為使用戰鎚，以回復技能維持隊友生存與戰鬥續航的核心治療者。",
          "全球官方預告站列出 Cleric；2025 年核心內容公告也提到其傷害能力獲得改善。這不改變本頁只把核心治療角色視為可證明事實。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：先確保自身位置安全、快速識別最高風險隊友、採取符合當前資訊的回應，然後重新掃描隊伍而不是只盯單一目標。",
          "實際治療技能、資源、清除效果與優先級依當前版本而異，不能從角色定位自行補寫。",
        ],
        scenarios: {
          pve: "把自身安全、機制與隊伍最高風險放在固定按鍵順序之前。",
          pvp: "同時觀察敵方壓力來源與己方危險目標，避免只對血量做被動反應。",
          rvr: "維持能看見核心隊伍又不過度前壓的位置，限制一次處理的資訊層級。",
        },
        difficultyNotes: [
          "核心目標清楚，但多人狀態、優先級、自身生存與團隊責任造成很高的決策和精通負擔。",
          "高責任不表示治癒星較強、必選或具有最高治療量。",
        ],
        beginnerPractice: [
          "先練習在低壓情境保持自身安全並持續掃描所有隊友。",
          "加入兩種不同風險，練習選擇誰需要先處理並說明理由。",
          "依現行技能和內容記錄資源、恢復方式與實際隊伍責任。",
        ],
        commonMistakes: [
          "只看隊友而忽略自身位置；修正方式是每次處理後重新確認自身風險。",
          "只盯單一低血量目標；修正方式是持續掃描壓力來源與其他隊友。",
          "把核心治療定位寫成固定必選；修正方式是區分角色輪廓與當期隊伍規則。",
        ],
        versionBoundary: [
          "戰鎚、回復、隊伍續航與核心治療定位來自 2026-07-18 官方資料。",
          "本文沒有確認治療技能名、數值、資源、清除規則、裝備、隊伍席位或全球版平衡。",
        ],
        keywords: ["AION2 治癒星", "治癒星攻略", "治癒星難度", "AION2 治療", "Cleric guide"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 Cleric guide: core healing, priority, and group difficulty",
        description:
          "Official Mace and core-healer facts for Cleric, plus labeled editorial PvE, PvP, RvR, triage, self-preservation, beginner practice, and mistake guidance.",
        intro:
          "Official material supports the role of maintaining party survival. It does not establish a fixed healing loop, mandatory slot, or healing-output rank. Playstyle and difficulty are editorial.",
        officialFacts: [
          "NC's official Guidebook presents Cleric with a Mace as the core healer maintaining allied health and combat endurance through recovery skills.",
          "The official global teaser lists Cleric, while NC's 2025 core-content release also mentions improved damage capability. This page retains core healing as the supported role fact.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: secure personal position, identify the highest-risk ally quickly, respond to current information, then rescan the party instead of watching one target only.",
          "Actual healing skills, resources, cleansing behavior, and priority change by build and cannot be filled in from the role label.",
        ],
        scenarios: {
          pve: "Place personal safety, mechanics, and highest party risk ahead of a fixed button order.",
          pvp: "Read the enemy pressure source and friendly risk together instead of reacting to health alone.",
          rvr: "Stay where the core group remains visible without overextending, and limit information layers handled at once.",
        },
        difficultyNotes: [
          "The core objective is clear, but multi-target state, priority, self-preservation, and group responsibility create very high decision and mastery burden.",
          "High responsibility does not make Cleric stronger, mandatory, or the highest-output healer.",
        ],
        beginnerPractice: [
          "Maintain personal safety while repeatedly scanning the whole party in a low-pressure setting.",
          "Add two different risks and practise explaining which one must be handled first.",
          "Record live resources, recovery behavior, and actual party responsibility from current skills and content.",
        ],
        commonMistakes: [
          "Watching allies but not personal position; rescan personal risk after every response.",
          "Staring at one low-health target; keep scanning pressure source and other allies.",
          "Turning core-healer wording into a mandatory slot; separate role profile from current party rules.",
        ],
        versionBoundary: [
          "Mace, recovery, party endurance, and core-healer wording reflect official material checked on 2026-07-18.",
          "No healing skill name, value, resource, cleanse rule, equipment, party slot, or Global balance claim is made.",
        ],
        keywords: ["AION2 Cleric", "Cleric guide", "Cleric difficulty", "AION2 healer", "healing class"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "AION2 치유성 가이드: 핵심 치유, 우선순위와 파티 난이도",
        description:
          "치유성의 공식 전곤·핵심 힐러 역할과 편집 평가로 구분한 PvE, PvP, RvR, 우선순위, 생존, 초보 연습, 실수 안내입니다.",
        intro:
          "공식 자료는 파티 생존을 유지하는 역할을 확인하지만 고정 치유 흐름, 필수 자리, 치유량 순위를 증명하지 않습니다. 플레이와 난이도는 편집 평가입니다.",
        officialFacts: [
          "NC 공식 가이드북은 치유성을 전곤으로 회복 스킬을 사용해 아군 생명력과 전투 지속력을 유지하는 핵심 힐러로 소개합니다.",
          "글로벌 공식 티저는 Cleric을 표시하고 2025년 핵심 콘텐츠 발표는 향상된 피해 능력도 언급합니다. 이 페이지는 핵심 치유 역할만 확인된 사실로 사용합니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 자신의 안전 확보, 가장 위험한 아군 빠르게 식별, 현재 정보에 맞는 대응, 한 대상만 보지 않고 파티 다시 확인하기입니다.",
          "실제 치유 스킬, 자원, 해제 행동, 우선순위는 버전에 따라 달라 역할 이름으로 채울 수 없습니다.",
        ],
        scenarios: {
          pve: "고정 버튼 순서보다 자신의 안전, 기믹, 가장 큰 파티 위험을 먼저 둡니다.",
          pvp: "생명력만 반응하지 말고 적 압박 원인과 아군 위험을 함께 읽습니다.",
          rvr: "과도하게 전진하지 않고 핵심 파티가 보이는 위치를 유지하며 한 번에 처리할 정보 층을 제한합니다.",
        },
        difficultyNotes: [
          "핵심 목표는 명확하지만 여러 대상 상태, 우선순위, 자신의 생존, 파티 책임 때문에 판단과 숙련 부담이 매우 높습니다.",
          "높은 책임은 치유성이 더 강하거나 필수이거나 치유량이 가장 높다는 뜻이 아닙니다.",
        ],
        beginnerPractice: [
          "낮은 압박에서 자신의 안전을 유지하며 파티 전체를 반복해서 확인합니다.",
          "서로 다른 위험 두 개를 추가하고 누구를 먼저 처리할지 이유를 설명합니다.",
          "현재 스킬과 콘텐츠에서 자원, 복구, 실제 파티 책임을 기록합니다.",
        ],
        commonMistakes: [
          "아군만 보고 자신의 위치를 놓치지 말고 매 대응 뒤 자신의 위험을 다시 봅니다.",
          "한 명의 낮은 생명력만 보지 말고 압박 원인과 다른 아군을 계속 확인합니다.",
          "핵심 힐러 역할을 필수 자리로 바꾸지 말고 역할 설명과 현재 파티 규칙을 구분합니다.",
        ],
        versionBoundary: [
          "전곤, 회복, 파티 지속력, 핵심 힐러 역할은 2026-07-18 공식 자료 기준입니다.",
          "치유 스킬명, 수치, 자원, 해제 규칙, 장비, 파티 자리, 글로벌 밸런스는 확인하지 않았습니다.",
        ],
        keywords: ["AION2 치유성", "아이온2 치유성 가이드", "치유성 난이도", "아이온2 힐러", "Cleric"],
      },
    },
  },
  {
    slug: "chanter",
    koreanGuideTitle: "호법성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜官方事實＋編輯評估",
        title: "AION2 護法星攻略：真言支援、多角色切換與難度",
        description:
          "整理護法星官方法杖、真言、控場、輔助治療與輸出定位，並以編輯評估說明 PvE、PvP、RvR、支援判斷、練習和失誤。",
        intro:
          "官方資料支持護法星的多用途支援角色；如何在支援、控制、治療與輸出之間切換，以及難度高低，是 KINA 編輯評估。",
        officialFacts: [
          "NC 官方 Guidebook 將護法星列為使用法杖，以真言強化隊友，並可兼顧控場、輔助治療與輸出。",
          "全球官方預告站列出 Chanter；2025 年核心內容公告稱其為具多人用途的多功能支援。這些資料沒有提供增益數值或隊伍排名。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：先維持一項最重要的支援責任、掃描隊伍是否需要控制或輔助治療，只在主要責任穩定時加入輸出，然後重新確認支援狀態。",
          "多用途不代表同時完成所有事情。具體真言、控制、治療和輸出技能必須依現行遊戲文字核對。",
        ],
        scenarios: {
          pve: "先確保主要增益或支援責任連續，再在安全空間加入其他貢獻。",
          pvp: "根據隊伍當前最大風險在控制、輔助治療與壓力之間切換。",
          rvr: "保持與核心隊伍的距離，使支援可持續作用而不因前壓中斷。",
        },
        difficultyNotes: [
          "單一支援責任容易開始，但多角色切換與隊伍狀態判斷提高精通和團隊責任負擔。",
          "支援用途不證明護法星較強、無課最優或任何內容的固定必選。",
        ],
        beginnerPractice: [
          "先選一項主要支援責任並在整段練習中保持穩定。",
          "一次加入一種次要責任，練習何時應放棄輸出回到支援。",
          "在現行版本核對真言、控制與輔助效果的實際條件。",
        ],
        commonMistakes: [
          "同時嘗試所有角色而失去主要責任；修正方式是先設定優先順序。",
          "只看輸出而讓支援中斷；修正方式是每段操作後重新確認隊伍狀態。",
          "把多用途支援寫成低裝備或無課保證；修正方式是把經濟與裝備結論留待證據。",
        ],
        versionBoundary: [
          "法杖、真言、控場、輔助治療、輸出與多人支援來自 2026-07-18 官方資料。",
          "本文沒有確認增益數值、技能名、持續時間、疊加規則、裝備、無課效率或隊伍席位。",
        ],
        keywords: ["AION2 護法星", "護法星攻略", "護法星難度", "AION2 支援", "Chanter guide"],
      },
      en: {
        eyebrow: "CLASS GUIDE｜OFFICIAL FACT + EDITORIAL ASSESSMENT",
        title: "AION2 Chanter guide: mantra support, role switching, and difficulty",
        description:
          "Official Staff, mantra, control, secondary-healing, and damage facts for Chanter, plus editorial PvE, PvP, RvR, support-decision, practice, and mistake guidance.",
        intro:
          "Official material supports a versatile support role. Switching among support, control, healing, and damage—and the difficulty of doing so—is a KINA editorial assessment.",
        officialFacts: [
          "NC's official Guidebook presents Chanter with a Staff, using mantras to strengthen allies while contributing control, secondary healing, and damage.",
          "The official global teaser lists Chanter, and NC's 2025 core-content release calls it a versatile support with multiplayer utility. No buff value or party rank is published.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: maintain the most important support responsibility, scan for control or secondary-healing need, add damage only while the main responsibility is stable, then recheck support state.",
          "Versatility does not mean doing everything simultaneously. Actual mantra, control, healing, and damage skills must be verified in current game text.",
        ],
        scenarios: {
          pve: "Keep the primary buff or support responsibility continuous before adding other contributions in safe space.",
          pvp: "Switch among control, secondary healing, and pressure according to the party's largest current risk.",
          rvr: "Stay connected to the core group so support remains continuous instead of breaking through overextension.",
        },
        difficultyNotes: [
          "One support responsibility is approachable, while role switching and party-state reading raise mastery and group-responsibility burden.",
          "Support utility does not prove Chanter stronger, best for free-to-play, or mandatory in any activity.",
        ],
        beginnerPractice: [
          "Choose one primary support responsibility and keep it stable through the full practice period.",
          "Add one secondary responsibility at a time and practise abandoning damage to return to support.",
          "Verify live conditions for mantras, control, and secondary effects in the current build.",
        ],
        commonMistakes: [
          "Attempting every role and losing the primary responsibility; set a priority order first.",
          "Watching damage while support drops; recheck party state after each action group.",
          "Turning versatility into a low-gear or free-to-play guarantee; leave economy and gear conclusions pending evidence.",
        ],
        versionBoundary: [
          "Staff, mantras, control, secondary healing, damage, and multiplayer support reflect official material checked on 2026-07-18.",
          "No buff value, skill name, duration, stacking rule, equipment, free-to-play efficiency, or party slot is asserted.",
        ],
        keywords: ["AION2 Chanter", "Chanter guide", "Chanter difficulty", "support class", "AION2 mantra"],
      },
      ko: {
        eyebrow: "직업 가이드｜공식 사실＋편집 평가",
        title: "AION2 호법성 가이드: 진언 지원, 역할 전환과 난이도",
        description:
          "호법성의 공식 법봉·진언·제어·보조 치유·피해 역할과 편집 평가로 구분한 PvE, PvP, RvR, 지원 판단, 연습, 실수 안내입니다.",
        intro:
          "공식 자료는 다용도 지원 역할을 확인합니다. 지원, 제어, 치유, 피해 사이 전환과 난이도는 KINA 편집 평가입니다.",
        officialFacts: [
          "NC 공식 가이드북은 호법성을 법봉으로 진언을 사용해 아군을 강화하고 제어, 보조 치유, 보조 피해에 기여하는 직업으로 소개합니다.",
          "글로벌 공식 티저는 Chanter를 표시하고 2025년 핵심 콘텐츠 발표는 다인 콘텐츠 유틸리티를 가진 다용도 지원이라고 설명합니다. 강화 수치나 파티 순위는 없습니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 가장 중요한 지원 책임 유지, 제어나 보조 치유 필요 확인, 핵심 책임이 안정적일 때만 피해 추가, 지원 상태 다시 확인하기입니다.",
          "다용도는 모든 일을 동시에 한다는 뜻이 아닙니다. 실제 진언, 제어, 치유, 피해 스킬은 현재 게임 설명에서 확인해야 합니다.",
        ],
        scenarios: {
          pve: "주요 강화나 지원 책임을 계속 유지한 뒤 안전한 여유에 다른 기여를 추가합니다.",
          pvp: "파티의 가장 큰 현재 위험에 따라 제어, 보조 치유, 압박을 전환합니다.",
          rvr: "핵심 파티와 연결을 유지해 과도한 전진으로 지원이 끊기지 않게 합니다.",
        },
        difficultyNotes: [
          "한 가지 지원 책임은 시작하기 쉽지만 역할 전환과 파티 상태 판단 때문에 숙련과 책임 부담이 높아집니다.",
          "지원 유틸리티는 호법성이 더 강하거나 무과금 최적이거나 필수라는 증거가 아닙니다.",
        ],
        beginnerPractice: [
          "핵심 지원 책임 하나를 선택하고 전체 연습 동안 안정적으로 유지합니다.",
          "부가 책임을 하나씩 추가하고 피해를 중단해 지원으로 돌아갈 시점을 연습합니다.",
          "현재 버전에서 진언, 제어, 부가 효과의 실제 조건을 확인합니다.",
        ],
        commonMistakes: [
          "모든 역할을 동시에 시도해 핵심 책임을 놓치지 말고 우선순위를 먼저 정합니다.",
          "피해만 보다가 지원이 끊기지 않도록 행동 묶음마다 파티 상태를 다시 봅니다.",
          "다용도를 낮은 장비나 무과금 보장으로 바꾸지 말고 경제와 장비 결론은 근거를 기다립니다.",
        ],
        versionBoundary: [
          "법봉, 진언, 제어, 보조 치유, 피해, 다인 지원은 2026-07-18 공식 자료 기준입니다.",
          "강화 수치, 스킬명, 지속 시간, 중첩 규칙, 장비, 무과금 효율, 파티 자리는 확인하지 않았습니다.",
        ],
        keywords: ["AION2 호법성", "아이온2 호법성 가이드", "호법성 난이도", "아이온2 지원", "Chanter"],
      },
    },
  },
  {
    slug: "brawler",
    koreanGuideTitle: "권성",
    translations: {
      "zh-hant": {
        eyebrow: "職業攻略｜2026-07-01 新增職業",
        title: "AION2 拳星攻略：拳甲、Rage／Rampage 與操作難度",
        description:
          "整理拳星於 2026-07-01 Chapter 1 新增的官方拳甲、前線連擊、Rage／Rampage 事實，並以編輯評估說明 PvE、PvP、RvR、練習與難度。",
        intro:
          "拳星已加入韓國／台灣現行 Chapter 1，因此本站的現行職業資料集為九職業。官方事實與 KINA 難度評估分開呈現；不把新職業寫成強度、Tier 或全球版首日保證。",
        officialFacts: [
          "NC 於 2026-07-01 的 Chapter 1 官方公告新增拳星。拳星使用拳甲，定位為擅長前方攻擊、連續技與突進的前線戰鬥職業。",
          "官方說明一般攻擊與主動技能會取得 Rage，達到條件後進入 Rampage。這是可核對的資源輪廓，不等於本站可以推導未公開倍率、最佳循環或配裝。",
        ],
        gameplayLoop: [
          "編輯練習循環可整理為：先確認安全接近路線，在貼身位置觀察資源狀態，只在可維持位置時延續壓力，戰線或資源條件不利時撤回並重新建立入口。",
          "連續技與 Rampage 是官方角色輪廓；實際輸入次序、持續時間、冷卻與收益必須回到目前客戶端和官方技能文字核對。",
        ],
        scenarios: {
          pve: "先維持機制安全與可持續的貼身位置，再觀察資源狀態；不要為延續連擊停留在危險區域。",
          pvp: "在進場前確認目標、距離與撤離方向，失去安全窗口時先重置而非盲目追擊。",
          rvr: "跟隨己方戰線選擇接觸點，避免在缺乏後續支援時單獨突進敵方深處。",
        },
        difficultyNotes: [
          "角色目標比多角色支援容易辨認，但貼身站位、連續輸入、資源狀態與失誤後重新接近會同時增加操作負擔。",
          "分數沒有使用傷害、勝率、裝備成本或新職業加成，也不表示拳星屬於任何 Tier。",
        ],
        beginnerPractice: [
          "先只練習安全接近、短暫貼身與離開，不追求持續連擊。",
          "加入 Rage／Rampage 狀態觀察，但一次只記錄一個失誤原因。",
          "最後依現行技能文字建立短循環，註明區服、版本與測試情境。",
        ],
        commonMistakes: [
          "把突進特色理解成需要每次立刻進場；修正方式是先確認接觸點與撤離路線。",
          "只看資源而忽略危險範圍；修正方式是把站位安全放在延續連擊之前。",
          "把新職業發布等同版本最強；修正方式是將難度、熱度與實際強度完全分開。",
        ],
        versionBoundary: [
          "拳甲、前方攻擊、連續技、突進、Rage 與 Rampage 來自 2026-07-01 更新及 2026-07-18 可核對的官方職業資料。",
          "拳星目前屬韓國／台灣 Chapter 1 現行內容；本文不保證全球版首日可用，也不確認技能倍率、冷卻、最佳配裝或職業排名。",
        ],
        keywords: [
          "AION2 拳星",
          "拳星攻略",
          "拳星難度",
          "Brawler guide",
          "Rage Rampage",
        ],
      },
      en: {
        eyebrow: "CLASS GUIDE｜ADDED 2026-07-01",
        title: "AION2 Brawler guide: Gauntlets, Rage/Rampage, and difficulty",
        description:
          "Official facts for the Brawler added in the 2026-07-01 Chapter 1 update—Gauntlets, front-line combos, and Rage/Rampage—plus labeled editorial PvE, PvP, RvR, practice, and difficulty guidance.",
        intro:
          "Brawler is live in the current Korea/Taiwan Chapter 1 build, so the current class dataset contains nine classes. Official facts remain separate from KINA difficulty analysis; a new class is not treated as a power tier or Global launch-day promise.",
        officialFacts: [
          "NC's official 2026-07-01 Chapter 1 release added Brawler. It uses Gauntlets and specializes in front-line attacks, combo chains, and charges.",
          "NC states that basic attacks and active skills generate Rage and that meeting the gauge condition triggers Rampage. That establishes a resource profile, not unpublished coefficients, a best rotation, or a gear build.",
        ],
        gameplayLoop: [
          "An editorial practice loop is: identify a safe approach, observe resource state from sustainable melee position, continue pressure only while position remains viable, then disengage and rebuild the entry when the front or resource condition turns unfavorable.",
          "Combos and Rampage are official role facts. Exact input order, duration, cooldown, and payoff must be verified in the current client and official skill text.",
        ],
        scenarios: {
          pve: "Maintain mechanic safety and sustainable melee position before tracking resource state; do not remain in danger merely to continue a chain.",
          pvp: "Confirm target, distance, and exit before entering, and reset instead of chasing after the safe window closes.",
          rvr: "Choose contact points with the friendly front and avoid charging deep without follow-up support.",
        },
        difficultyNotes: [
          "The objective is easier to identify than a multi-role support job, but melee position, repeated input, resource state, and re-entry after errors create simultaneous execution load.",
          "The score uses no damage, win rate, gear cost, or new-class bonus and does not place Brawler in any tier.",
        ],
        beginnerPractice: [
          "Practise only safe approach, brief contact, and disengagement before trying to sustain a chain.",
          "Add Rage/Rampage state observation while recording one error cause at a time.",
          "Build a short loop from current live skill text and label the region, version, and test context.",
        ],
        commonMistakes: [
          "Treating a charge identity as a command to enter immediately; confirm contact point and exit first.",
          "Watching the resource while ignoring danger; put position safety before chain continuation.",
          "Equating a new release with strongest-in-version; keep difficulty, popularity, and power separate.",
        ],
        versionBoundary: [
          "Gauntlets, front-line attacks, combos, charges, Rage, and Rampage reflect the 2026-07-01 update and official class material checked on 2026-07-18.",
          "Brawler is current Korea/Taiwan Chapter 1 content. This page does not promise Global launch availability or assert skill coefficients, cooldowns, best equipment, or class rank.",
        ],
        keywords: [
          "AION2 Brawler",
          "Brawler guide",
          "Brawler difficulty",
          "Gauntlets",
          "Rage Rampage",
        ],
      },
      ko: {
        eyebrow: "직업 가이드｜2026-07-01 신규 직업",
        title: "AION2 권성 가이드: 권갑, 분노·폭주와 조작 난이도",
        description:
          "2026-07-01 Chapter 1에 추가된 권성의 공식 권갑, 전방 연계, 분노·폭주 사실과 편집 평가로 구분한 PvE, PvP, RvR, 연습, 난이도 안내입니다.",
        intro:
          "권성은 현재 한국·대만 Chapter 1에 적용되어 현행 직업 데이터는 9개입니다. 공식 사실과 KINA 난이도 평가는 분리하며 신규 직업을 성능 티어나 글로벌 출시 직업으로 단정하지 않습니다.",
        officialFacts: [
          "NC의 2026-07-01 Chapter 1 공식 발표에서 권성이 추가됐습니다. 권갑을 사용하며 전방 공격, 연속기와 돌진에 특화된 전투 직업입니다.",
          "일반 공격과 액티브 스킬로 분노를 얻고 게이지 조건을 충족하면 폭주 상태에 들어갑니다. 이는 공식 자원 구조이며 미공개 계수, 최적 순환이나 장비를 뜻하지 않습니다.",
        ],
        gameplayLoop: [
          "편집 연습 흐름은 안전한 접근 경로 확인, 유지 가능한 근접 위치에서 자원 상태 관찰, 위치가 안정적일 때만 압박 지속, 전선이나 자원 조건이 불리하면 이탈 후 재진입 준비입니다.",
          "연속기와 폭주는 공식 역할 사실이지만 정확한 입력 순서, 지속 시간, 재사용 시간, 효율은 현재 클라이언트와 공식 스킬 설명에서 확인해야 합니다.",
        ],
        scenarios: {
          pve: "기믹 안전과 유지 가능한 근접 위치를 먼저 확보하고 자원을 확인하며 연계를 위해 위험 지역에 남지 않습니다.",
          pvp: "진입 전 대상, 거리, 이탈 방향을 확인하고 안전한 구간이 끝나면 무리하게 추격하지 않고 재정비합니다.",
          rvr: "아군 전선과 함께 접촉 지점을 선택하고 후속 지원 없이 적진 깊이 혼자 돌진하지 않습니다.",
        },
        difficultyNotes: [
          "다중 역할 지원보다 목표는 구분하기 쉽지만 근접 위치, 연속 입력, 자원 상태, 실수 뒤 재진입을 함께 처리해야 합니다.",
          "점수는 피해량, 승률, 장비 비용, 신규 직업 보정을 사용하지 않으며 권성의 티어를 뜻하지 않습니다.",
        ],
        beginnerPractice: [
          "연속기를 유지하기 전에 안전한 접근, 짧은 접촉, 이탈만 연습합니다.",
          "분노·폭주 상태 확인을 추가하되 한 번에 실수 원인 하나만 기록합니다.",
          "현재 스킬 설명으로 짧은 흐름을 만들고 지역, 버전, 시험 상황을 표시합니다.",
        ],
        commonMistakes: [
          "돌진 특성을 즉시 진입해야 한다는 뜻으로 이해하지 말고 접촉점과 이탈 경로를 먼저 확인합니다.",
          "자원만 보고 위험 범위를 놓치지 말고 연계 지속보다 위치 안전을 우선합니다.",
          "신규 직업 출시를 버전 최강으로 바꾸지 말고 난이도, 인기, 성능을 분리합니다.",
        ],
        versionBoundary: [
          "권갑, 전방 공격, 연속기, 돌진, 분노와 폭주는 2026-07-01 업데이트와 2026-07-18 확인한 공식 직업 자료 기준입니다.",
          "권성은 현재 한국·대만 Chapter 1 콘텐츠이며 글로벌 출시 적용, 스킬 계수, 재사용 시간, 최적 장비, 직업 순위는 확인하지 않았습니다.",
        ],
        keywords: [
          "AION2 권성",
          "아이온2 권성 가이드",
          "권성 난이도",
          "권갑",
          "분노 폭주",
        ],
      },
    },
  },
];

function profileFor(slug: ClassDifficultyProfile["classId"]) {
  const profile = classDifficultyProfiles.find((item) => item.classId === slug);
  if (!profile) throw new Error(`Missing class difficulty profile: ${slug}`);
  return profile;
}

const trendEnhancedClassSlugs: readonly ClassDifficultyProfile["classId"][] = [
  "gladiator",
  "assassin",
  "ranger",
  "sorcerer",
];

const arcanaEnhancedClassSlugs: readonly ClassDifficultyProfile["classId"][] = [
  "gladiator",
  "assassin",
];

function createClassGuideEntry(definition: ClassGuideDefinition): ContentEntry {
  const profile = profileFor(definition.slug);
  const isBrawler = definition.slug === "brawler";
  const isTrendEnhanced = trendEnhancedClassSlugs.includes(definition.slug);
  const hasArcanaMethod = arcanaEnhancedClassSlugs.includes(definition.slug);
  const names = {
    "zh-hant": profile.translations["zh-hant"].name,
    en: profile.translations.en.name,
    ko: profile.translations.ko.name,
  };

  return {
    section: "classes",
    slug: definition.slug,
    schemaType: "Article",
    publishedAt: "2026-07-18",
    updatedAt: isTrendEnhanced ? "2026-07-26" : "2026-07-18",
    readingMinutes: isTrendEnhanced ? 11 : 9,
    publication,
    sources: [
      ...(isBrawler
        ? [
          currentClassRosterSource,
          brawlerChapterSource,
          guidebookSource(definition.slug, definition.koreanGuideTitle),
        ]
        : [
          globalClassRosterSource,
          coreClassRevealSource,
          guidebookSource(definition.slug, definition.koreanGuideTitle),
        ]),
      ...(isTrendEnhanced ? [officialCombatOverviewSource] : []),
      ...(hasArcanaMethod ? [officialArcanaUpdateSource] : []),
    ],
    heroImage: isBrawler ? brawlerHeroImage() : heroImage(names),
    properties: {
      classProfile: profile,
      ...(isBrawler
        ? {
            reportService: "kr-tw-live",
            serviceScope: {
              "zh-hant": "韓國／台灣 Chapter 1 現行服務",
              en: "Korea/Taiwan Chapter 1 live service",
              ko: "한국·대만 Chapter 1 라이브 서비스",
            },
            releaseVersion: "Chapter 1 · 2026-07-01",
          }
        : {}),
    },
    related: [
      ...(hasArcanaMethod
        ? [
            {
              kind: "content" as const,
              section: "guides" as const,
              slug: "arcana",
            },
          ]
        : []),
      {
        kind: "content",
        section: "classes",
        slug: "difficulty-comparison",
      },
      {
        kind: "content",
        section: "classes",
        slug: "base-class-roster",
      },
      {
        kind: "content",
        section: "classes",
        slug: "class-choice-guide",
      },
      {
        kind: "content",
        section: "classes",
        slug: "class-planning-framework",
      },
    ],
    translations: {
      "zh-hant": createLocalizedContent(
        "zh-hant",
        definition.translations["zh-hant"],
        profile,
      ),
      en: createLocalizedContent("en", definition.translations.en, profile),
      ko: createLocalizedContent("ko", definition.translations.ko, profile),
    },
  };
}

const comparisonCopy = {
  "zh-hant": {
    eyebrow: "職業難度比較｜編輯評估",
    title: "AION2 九職業難度比較：上手、精通與團隊責任",
    description:
      "以統一方法比較 AION2 現行九職業的上手、精通與五項學習負擔；拳星於 2026-07-01 加入韓國／台灣 Chapter 1，所有分數均為編輯評估，不是強度或 Tier。",
    intro:
      "這張表回答「需要同時學什麼」，不是「哪個最強」。官方來源只負責名稱、武器與角色定位；難度分數、練習重點和比較結論由 KINA 於 2026-07-18 依公開角色輪廓編輯評估。",
    byline: "AION2 KINA 職業編輯組",
    backLabel: "返回職業中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "評估日期",
    readingTime: "約 8 分鐘",
    relatedLabel: "查看完整職業攻略",
    sourceNote:
      "官方來源證明九職業資料、武器與角色輪廓；所有難度分數為 KINA 編輯評估，不是 NC 官方結論、傷害排名、勝率、Tier 或最佳職業。",
    keywords: ["AION2 職業難度", "AION2 職業比較", "AION2 新手職業", "AION2 九職業", "AION2 職業推薦"],
    sections: {
      scope: {
        title: "先分清楚官方事實與編輯評估",
        paragraphs: [
          "NC 官方資料可確認現行資料集的九職業名稱、武器與廣義角色定位：全球名單有八個基礎職業，拳星於 2026-07-01 加入韓國／台灣 Chapter 1。官方沒有提供統一的簡單／困難或 Tier 表。",
          "本頁的難度只表示學習負擔。上手分數衡量能否建立可重複的安全基線；精通分數衡量在壓力下同時維持操作、資訊、位置與責任的負擔。",
        ],
      },
      rubric: {
        title: "KINA class-difficulty-v1 評估方法",
        paragraphs: [
          "每項使用 1 至 5 分：1 代表同時負擔較少，5 代表需要處理更多輸入、站位、資源、團隊責任或失誤恢復。範圍為 2026-07-18 核對的八個全球基礎職業與韓國／台灣現行拳星。",
        ],
        bullets: [
          "上手：建立安全、可重複基線所需的學習負擔。",
          "精通：在壓力與變化下保持穩定判斷的負擔。",
          "操作：短時間輸入、連續決定與時機處理。",
          "站位：距離、視線、戰線與移動路線管理。",
          "資訊：資源、狀態、目標與環境的追蹤量。",
          "團隊責任：個人失誤對隊伍造成直接影響的程度。",
        ],
      },
      table: {
        title: "九職業上手、精通與五維分數",
        intro:
          "以下每一列都標示為編輯評估；括號中的分數不是戰力、輸出或排名。",
      },
      interpretation: {
        title: "如何正確閱讀差異",
        paragraphs: [
          "殺星與精靈星的高分主要來自短時間操作或多層資訊；守護星與治癒星的高分則大量來自團隊責任。相同總分不代表相同難點。",
          "劍星較易建立基本角色目標，不表示它在高壓近戰中容易精通。護法星能從單一支援責任開始，也不表示完整多角色切換沒有負擔。",
        ],
      },
      choose: {
        title: "把比較變成兩至三個候選",
        paragraphs: [
          "先選擇你願意承擔的難點：短時間操作、站位、多狀態管理或團隊責任。再保留兩至三個候選，閱讀個別攻略並在實際遊玩版本核對技能。",
          "不要因分數較高就刪除喜歡的職業，也不要因分數較低就期待不用練習。難度只用來安排學習順序。",
        ],
      },
      boundary: {
        title: "版本、地區與更新邊界",
        paragraphs: [
          "全球官方站目前列出八個基礎職業；拳星已於 2026-07-01 加入韓國／台灣 Chapter 1。本比較涵蓋九職業，但不把拳星默認為全球首日內容。",
          "當全球版技能、戰鬥節奏或隊伍規則正式可玩後，應以相同 rubric 重新評估並保留舊版日期。",
        ],
      },
    },
  },
  en: {
    eyebrow: "CLASS DIFFICULTY｜EDITORIAL ASSESSMENT",
    title: "AION2 class difficulty comparison: onboarding, mastery, and responsibility",
    description:
      "Compare nine current classes across onboarding, mastery, and five learning-load metrics. Brawler joined Korea/Taiwan Chapter 1 on 2026-07-01; every score is editorial, not power or a tier.",
    intro:
      "This table answers what must be learned together, not which class is strongest. Official sources establish names, weapons, and role profiles. KINA difficulty, practice, and comparison judgments are editorial assessments dated 2026-07-18.",
    byline: "AION2 KINA Class Desk",
    backLabel: "Back to classes",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Assessment date",
    readingTime: "8 min read",
    relatedLabel: "Read the full class guides",
    sourceNote:
      "Official sources establish the nine-class dataset, weapons, and role profiles. Every difficulty score is a KINA editorial assessment—not an NC conclusion, damage rank, win rate, tier, or best-class verdict.",
    keywords: ["AION2 class difficulty", "AION2 class comparison", "AION2 beginner class", "AION2 classes", "AION2 class guide"],
    sections: {
      scope: {
        title: "Separate official fact from editorial assessment",
        paragraphs: [
          "NC material establishes the nine-class dataset: eight base classes on the Global roster and Brawler added to Korea/Taiwan Chapter 1 on 2026-07-01. It does not publish a normalized easy/hard or tier table.",
          "Difficulty here means learning burden only. Onboarding measures the work required to build a safe repeatable baseline. Mastery measures the work required to preserve execution, information, position, and responsibility under pressure.",
        ],
      },
      rubric: {
        title: "KINA class-difficulty-v1 rubric",
        paragraphs: [
          "Each axis uses 1–5. One means fewer simultaneous burdens; five means more inputs, positioning, resource management, party responsibility, or error recovery. Scope is the eight Global base classes plus the live Korea/Taiwan Brawler material checked on 2026-07-18.",
        ],
        bullets: [
          "Onboarding: work required to establish a safe repeatable baseline.",
          "Mastery: work required to preserve judgment under pressure and change.",
          "Execution: compressed input, chained decisions, and timing.",
          "Positioning: distance, line of sight, front, and movement routes.",
          "Information: resources, states, targets, and environment tracked.",
          "Group responsibility: how directly personal errors affect the party.",
        ],
      },
      table: {
        title: "Onboarding, mastery, and five metrics for all nine",
        intro:
          "Every row below is an editorial assessment. Parenthesized scores are not power, output, or rank.",
      },
      interpretation: {
        title: "Read equal scores as different kinds of work",
        paragraphs: [
          "Assassin and SpiritMaster score highly mainly through compressed execution or layered information. Templar and Cleric draw much of their burden from group responsibility. Similar totals do not mean similar difficulty.",
          "Gladiator can establish its basic objective earlier without becoming easy to master in high-pressure melee. Chanter can start with one support responsibility without making full role switching effortless.",
        ],
      },
      choose: {
        title: "Turn the comparison into a two- or three-class shortlist",
        paragraphs: [
          "Choose the burden you are willing to learn: compressed execution, positioning, multi-state management, or group responsibility. Keep two or three candidates, read their full guides, and verify live skills in the build you can play.",
          "Do not delete a preferred class because its score is high, and do not expect a lower score to remove the need for practice. Difficulty only helps order the learning plan.",
        ],
      },
      boundary: {
        title: "Version, region, and update boundary",
        paragraphs: [
          "The official Global site currently lists eight base classes. Brawler joined Korea/Taiwan Chapter 1 on 2026-07-01. This nine-class comparison does not assume Brawler is Global launch-day content.",
          "When Global skills, combat rhythm, and party rules become playable, repeat the same rubric and retain the previous dated assessment.",
        ],
      },
    },
  },
  ko: {
    eyebrow: "직업 난이도 비교｜편집 평가",
    title: "AION2 9개 직업 난이도 비교: 입문, 숙련과 파티 책임",
    description:
      "AION2 현행 9개 직업의 입문, 숙련과 5개 학습 부담을 비교합니다. 권성은 2026-07-01 한국·대만 Chapter 1에 추가됐으며 모든 점수는 편집 평가입니다.",
    intro:
      "이 표는 무엇을 함께 배워야 하는지 답하며 어떤 직업이 가장 강한지 정하지 않습니다. 공식 출처는 이름, 무기, 역할을 확인하고 난이도와 연습 판단은 2026-07-18 KINA 편집 평가입니다.",
    byline: "AION2 KINA 직업 편집팀",
    backLabel: "직업으로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "KINA 게시",
    updatedLabel: "평가 날짜",
    readingTime: "약 8분",
    relatedLabel: "전체 직업 가이드 보기",
    sourceNote:
      "공식 출처는 9개 직업 자료, 무기, 역할을 확인합니다. 모든 난이도 점수는 KINA 편집 평가이며 NC 공식 결론·피해 순위·승률·티어·최고 직업 판정이 아닙니다.",
    keywords: ["AION2 직업 난이도", "아이온2 직업 비교", "아이온2 초보 직업", "아이온2 클래스", "아이온2 직업 추천"],
    sections: {
      scope: {
        title: "공식 사실과 편집 평가를 구분합니다",
        paragraphs: [
          "NC 공식 자료는 글로벌 기본 8개와 2026-07-01 한국·대만 Chapter 1에 추가된 권성으로 현행 9개 자료를 확인합니다. 통일된 쉬움/어려움이나 티어 표는 공개하지 않습니다.",
          "이 페이지의 난이도는 학습 부담만 뜻합니다. 입문은 안전하고 반복 가능한 기준을 만드는 부담, 숙련은 압박에서 조작·정보·위치·책임을 유지하는 부담입니다.",
        ],
      },
      rubric: {
        title: "KINA class-difficulty-v1 평가 방법",
        paragraphs: [
          "각 축은 1–5입니다. 1은 동시 부담이 적고 5는 더 많은 입력, 위치, 자원, 파티 책임, 실수 복구를 처리한다는 뜻입니다. 2026-07-18 확인한 글로벌 기본 8개와 한국·대만 권성을 범위로 사용합니다.",
        ],
        bullets: [
          "입문: 안전하고 반복 가능한 기준을 만드는 학습 부담.",
          "숙련: 압박과 변화에서 판단을 유지하는 부담.",
          "조작: 짧은 입력, 연속 판단, 타이밍 처리.",
          "위치: 거리, 시야, 전선, 이동 경로 관리.",
          "정보: 자원, 상태, 대상, 환경 추적량.",
          "파티 책임: 개인 실수가 파티에 직접 영향을 주는 정도.",
        ],
      },
      table: {
        title: "9개 직업의 입문, 숙련과 5개 지표",
        intro:
          "아래 모든 행은 편집 평가이며 괄호 점수는 전투력, 피해량, 순위가 아닙니다.",
      },
      interpretation: {
        title: "같은 점수도 다른 부담으로 읽습니다",
        paragraphs: [
          "살성과 정령성은 짧은 조작 또는 여러 정보 때문에 높은 점수를 받습니다. 수호성과 치유성은 파티 책임이 큰 비중을 차지합니다. 비슷한 총점이 같은 난이도를 뜻하지 않습니다.",
          "검성이 기본 역할을 빨리 이해할 수 있어도 고압 근접 숙련이 쉬운 것은 아닙니다. 호법성이 한 가지 지원 책임으로 시작할 수 있어도 전체 역할 전환이 쉬운 것은 아닙니다.",
        ],
      },
      choose: {
        title: "비교를 두세 개 후보로 바꿉니다",
        paragraphs: [
          "짧은 조작, 위치, 여러 상태 관리, 파티 책임 중 배우고 싶은 부담을 고릅니다. 두세 개 후보를 남기고 개별 가이드를 읽은 뒤 실제 플레이 버전의 스킬을 확인합니다.",
          "점수가 높다는 이유로 좋아하는 직업을 지우지 말고 점수가 낮다고 연습이 필요 없다고 생각하지 않습니다. 난이도는 학습 순서만 돕습니다.",
        ],
      },
      boundary: {
        title: "버전, 지역과 업데이트 범위",
        paragraphs: [
          "글로벌 공식 사이트는 현재 기본 8개를 표시하고 권성은 2026-07-01 한국·대만 Chapter 1에 추가됐습니다. 9개를 비교하지만 권성을 글로벌 출시 첫날 콘텐츠로 가정하지 않습니다.",
          "글로벌 스킬, 전투 흐름, 파티 규칙을 실제로 플레이할 수 있게 되면 같은 rubric으로 다시 평가하고 이전 날짜 기록을 보존합니다.",
        ],
      },
    },
  },
} as const;

function comparisonLines(locale: ContentLocale) {
  return classDifficultyProfiles.map((profile) => {
    const copy = profile.translations[locale];
    const { onboarding, mastery } = profile.scores;
    const {
      inputs,
      positioning,
      resourceManagement,
      partyResponsibility,
      errorRecovery,
    } = profile.metrics;
    if (locale === "zh-hant") {
      return `${copy.name}｜整體 ${profile.overall}/5、上手 ${onboarding}/5、精通 ${mastery}/5；輸入 ${inputs}/5、站位 ${positioning}/5、資源 ${resourceManagement}/5、團隊責任 ${partyResponsibility}/5、失誤恢復 ${errorRecovery}/5。${copy.assessmentSummary}`;
    }
    if (locale === "ko") {
      return `${copy.name}｜종합 ${profile.overall}/5, 입문 ${onboarding}/5, 숙련 ${mastery}/5; 입력 ${inputs}/5, 위치 ${positioning}/5, 자원 ${resourceManagement}/5, 파티 책임 ${partyResponsibility}/5, 실수 복구 ${errorRecovery}/5. ${copy.assessmentSummary}`;
    }
    return `${copy.name}｜Overall ${profile.overall}/5, onboarding ${onboarding}/5, mastery ${mastery}/5; inputs ${inputs}/5, positioning ${positioning}/5, resources ${resourceManagement}/5, party responsibility ${partyResponsibility}/5, error recovery ${errorRecovery}/5. ${copy.assessmentSummary}`;
  });
}

function createComparisonLocalizedContent(locale: ContentLocale): LocalizedContent {
  const copy = comparisonCopy[locale];
  return {
    eyebrow: copy.eyebrow,
    title: copy.title,
    description: copy.description,
    intro: copy.intro,
    byline: copy.byline,
    backLabel: copy.backLabel,
    contentsLabel: copy.contentsLabel,
    publishedLabel: copy.publishedLabel,
    updatedLabel: copy.updatedLabel,
    readingTime: copy.readingTime,
    relatedLabel: copy.relatedLabel,
    sourceNote: copy.sourceNote,
    keywords: copy.keywords,
    sections: [
      {
        id: "fact-vs-assessment",
        title: copy.sections.scope.title,
        paragraphs: copy.sections.scope.paragraphs,
      },
      {
        id: "difficulty-rubric",
        title: copy.sections.rubric.title,
        paragraphs: copy.sections.rubric.paragraphs,
        bullets: copy.sections.rubric.bullets,
      },
      {
        id: "class-comparison",
        title: copy.sections.table.title,
        paragraphs: [copy.sections.table.intro],
        bullets: comparisonLines(locale),
      },
      {
        id: "interpretation",
        title: copy.sections.interpretation.title,
        paragraphs: copy.sections.interpretation.paragraphs,
      },
      {
        id: "shortlist",
        title: copy.sections.choose.title,
        paragraphs: copy.sections.choose.paragraphs,
      },
      {
        id: "version-boundary",
        title: copy.sections.boundary.title,
        paragraphs: copy.sections.boundary.paragraphs,
      },
    ],
  };
}

function createDifficultyComparisonEntry(): ContentEntry {
  const translations: Record<ContentLocale, LocalizedContent> = {
    "zh-hant": createComparisonLocalizedContent("zh-hant"),
    en: createComparisonLocalizedContent("en"),
    ko: createComparisonLocalizedContent("ko"),
  };

  return {
    section: "classes",
    slug: "difficulty-comparison",
    schemaType: "Article",
    publishedAt: "2026-07-18",
    updatedAt: "2026-07-18",
    readingMinutes: 8,
    publication,
    sources: [
      globalClassRosterSource,
      coreClassRevealSource,
      currentClassRosterSource,
      brawlerChapterSource,
      ...classGuideDefinitions.map((definition) =>
        guidebookSource(definition.slug, definition.koreanGuideTitle),
      ),
    ],
    heroImage: heroImage({
      "zh-hant": "九職業難度比較",
      en: "nine-class difficulty comparison",
      ko: "9개 직업 난이도 비교",
    }),
    properties: {
      reportService: "other",
      serviceScope: {
        "zh-hant": "全球八個基礎職業＋韓國／台灣 Chapter 1 拳星",
        en: "Eight Global base classes plus Korea/Taiwan Chapter 1 Brawler",
        ko: "글로벌 기본 8개 직업 + 한국·대만 Chapter 1 권성",
      },
      releaseVersion: "KINA class comparison · 2026-07-18",
      classComparison: {
        profiles: classDifficultyProfiles,
        basis: "editorial-assessment",
        methodVersion: "kina-class-difficulty-v1",
        assessedAt: "2026-07-18",
        notStrengthOrTier: true,
      },
    },
    related: [
      ...classGuideDefinitions.map((definition) => ({
        kind: "content" as const,
        section: "classes" as const,
        slug: definition.slug,
      })),
      {
        kind: "content",
        section: "classes",
        slug: "class-choice-guide",
      },
    ],
    translations,
  };
}

export const classGuideContentEntries: readonly ContentEntry[] = [
  ...classGuideDefinitions.map(createClassGuideEntry),
  createDifficultyComparisonEntry(),
];
