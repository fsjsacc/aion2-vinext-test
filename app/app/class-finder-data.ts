import {
  localizedHref,
  type ContentLocale,
  type SiteLocale,
} from "./site-config";
import {
  editorialClassFinderDataCopy,
  editorialResultReason,
  editorialScopeNotes,
  getEditorialOptionCopy,
  getEditorialProfileCopy,
  getEditorialQuestionCopy,
  type ClassFinderEditorialLocale,
} from "./class-finder-localization";

export type ClassFinderClassId =
  | "gladiator"
  | "templar"
  | "assassin"
  | "ranger"
  | "sorcerer"
  | "spiritmaster"
  | "cleric"
  | "chanter";

export type ClassFinderQuestionId =
  | "contribution"
  | "combat-rhythm"
  | "learning-load"
  | "preferred-position"
  | "party-responsibility"
  | "mistake-tolerance";

export type ClassFinderDimension =
  | "directDamage"
  | "frontline"
  | "rangedPositioning"
  | "shortWindowExecution"
  | "tacticalControl"
  | "stateManagement"
  | "protection"
  | "healing"
  | "teamSupport"
  | "positioningLoad"
  | "executionLoad"
  | "groupResponsibility";

type CoreLocalized<T> = Readonly<Record<ContentLocale, T>>;
type Localized<T> = Readonly<Record<SiteLocale, T>>;
type LocalizedText = Localized<string>;

export function resolveClassFinderCopy<T>(
  copy: Readonly<Record<SiteLocale, T>>,
  locale: SiteLocale,
): T {
  return copy[locale];
}

type ClassFinderOptionCopy = {
  label: string;
  description: string;
};

export type ClassFinderOption = {
  id: string;
  copy: Localized<ClassFinderOptionCopy>;
  /**
   * Internal preference coefficients, not game statistics.
   * Positive values prefer more of a dimension; negative values prefer less.
   */
  weights: Readonly<Partial<Record<ClassFinderDimension, number>>>;
};

type CoreClassFinderOption = Omit<ClassFinderOption, "copy"> & {
  copy: CoreLocalized<ClassFinderOptionCopy>;
};

export type ClassFinderQuestion = {
  id: ClassFinderQuestionId;
  copy: Localized<{
    title: string;
    hint: string;
  }>;
  options: readonly ClassFinderOption[];
};

type CoreClassFinderQuestion = Omit<ClassFinderQuestion, "copy" | "options"> & {
  copy: CoreLocalized<{ title: string; hint: string }>;
  options: readonly CoreClassFinderOption[];
};

export type ClassFinderAnswerMap = Partial<
  Record<ClassFinderQuestionId, string>
>;

/** Backwards-compatible name for consumers that prefer the shorter noun. */
export type ClassFinderAnswers = ClassFinderAnswerMap;

type PreferenceLevel = 0 | 1 | 2 | 3 | 4;

export type ClassFinderClassProfile = {
  classId: ClassFinderClassId;
  guideSlug: ClassFinderClassId;
  copy: Localized<{
    name: string;
    weapon: string;
    officialRole: string;
    summary: string;
  }>;
  /**
   * Editorial matching profile on a 0–4 internal scale.
   * These values are never class power, damage, win rate, or official ratings.
   */
  traits: Readonly<Record<ClassFinderDimension, PreferenceLevel>>;
};

type CoreClassFinderClassProfile = Omit<ClassFinderClassProfile, "copy"> & {
  copy: CoreLocalized<{
    name: string;
    weapon: string;
    officialRole: string;
    summary: string;
  }>;
};

export type ClassFinderResult = {
  rank: 1 | 2 | 3;
  classId: ClassFinderClassId;
  name: string;
  weapon: string;
  officialRole: string;
  summary: string;
  guideHref: string;
  matchPercent: number;
  rawScore: number;
  maxScore: number;
  matchedPreferences: readonly string[];
  reason: string;
  disclaimer: string;
};

/** Backwards-compatible result type name. */
export type ClassFinderRecommendation = ClassFinderResult;

export type ClassFinderProgress = {
  answered: number;
  total: number;
  complete: boolean;
};

const coreClassFinderCopy = {
  "zh-hant": {
    kicker: "AION2 互動工具",
    title: "AION2 職業推薦器",
    description:
      "回答六個偏好問題，從八個基礎職業中建立三個候選，再前往各職業攻略核對實際玩法。",
    privacy: "無需登入；答案只在你的瀏覽器中處理，除非你主動儲存或分享。",
    start: "開始配對",
    progress: "完成進度",
    back: "上一題",
    next: "下一題",
    restart: "重新測試",
    resultsTitle: "你的職業候選",
    resultsDescription:
      "以下結果按偏好匹配排列。請保留兩至三個候選，閱讀攻略並以實際版本體驗確認。",
    save: "儲存結果",
    saved: "已儲存",
    share: "分享結果",
    shared: "已複製分享連結",
    copyFailed: "無法複製，請手動複製網址。",
    classesOverview: "查看八大基礎職業",
    guide: "閱讀職業攻略",
    primaryMatch: "最高匹配",
    matchedPreferences: "匹配偏好",
    disclaimer:
      "這是 KINA 依遊玩偏好製作的編輯推薦，不是 NC 官方排名，也不代表職業強度、傷害、勝率或 Tier。",
    methodNote:
      "職業名稱、武器與高層定位依目前可核對的 NC 官方資料；偏好維度、匹配權重與結果解讀屬 KINA 編輯模型。",
    incomplete: "完成全部六題後即可查看三個候選職業。",
  },
  en: {
    kicker: "AION2 INTERACTIVE TOOL",
    title: "AION2 class finder",
    description:
      "Answer six preference questions to shortlist three of the eight base classes, then check each guide against the version you can play.",
    privacy:
      "No sign-in is required. Answers are processed in your browser unless you choose to save or share.",
    start: "Start matching",
    progress: "Progress",
    back: "Back",
    next: "Next",
    restart: "Retake",
    resultsTitle: "Your class shortlist",
    resultsDescription:
      "Results are ordered by preference fit. Keep two or three candidates, read their guides, and confirm them in the playable build.",
    save: "Save result",
    saved: "Saved",
    share: "Share result",
    shared: "Share link copied",
    copyFailed: "Could not copy. Please copy the URL manually.",
    classesOverview: "See all eight base classes",
    guide: "Read class guide",
    primaryMatch: "Primary match",
    matchedPreferences: "Matched preferences",
    disclaimer:
      "This is a KINA editorial preference match, not an official NC ranking or a statement about class power, damage, win rate, or tier.",
    methodNote:
      "Class names, weapons, and high-level roles follow currently verifiable NC material. Preference dimensions, weights, and interpretation are a KINA editorial model.",
    incomplete: "Answer all six questions to see a three-class shortlist.",
  },
  ko: {
    kicker: "AION2 인터랙티브 도구",
    title: "AION2 직업 추천기",
    description:
      "여섯 가지 선호 질문에 답해 기본 8개 직업 중 세 후보를 고르고, 각 직업 공략에서 실제 플레이를 확인하세요.",
    privacy:
      "로그인이 필요하지 않습니다. 저장하거나 공유하지 않는 한 답변은 브라우저 안에서 처리됩니다.",
    start: "추천 시작",
    progress: "진행도",
    back: "이전",
    next: "다음",
    restart: "다시 하기",
    resultsTitle: "나의 직업 후보",
    resultsDescription:
      "결과는 선호 적합도 순서입니다. 두세 후보의 공략을 읽고 플레이 가능한 버전에서 직접 확인하세요.",
    save: "결과 저장",
    saved: "저장됨",
    share: "결과 공유",
    shared: "공유 링크를 복사했습니다",
    copyFailed: "복사할 수 없습니다. 주소를 직접 복사해 주세요.",
    classesOverview: "기본 8개 직업 보기",
    guide: "직업 공략 읽기",
    primaryMatch: "가장 높은 적합도",
    matchedPreferences: "일치한 선호",
    disclaimer:
      "이 결과는 KINA의 편집 선호도 매칭이며 NC 공식 순위가 아닙니다. 직업 성능, 피해량, 승률, 티어를 뜻하지 않습니다.",
    methodNote:
      "직업명, 무기, 상위 역할은 현재 확인 가능한 NC 자료를 따릅니다. 선호 차원, 가중치, 결과 해석은 KINA 편집 모델입니다.",
    incomplete: "여섯 문항을 모두 답하면 세 직업 후보를 볼 수 있습니다.",
  },
} as const satisfies CoreLocalized<{
  kicker: string;
  title: string;
  description: string;
  privacy: string;
  start: string;
  progress: string;
  back: string;
  next: string;
  restart: string;
  resultsTitle: string;
  resultsDescription: string;
  save: string;
  saved: string;
  share: string;
  shared: string;
  copyFailed: string;
  classesOverview: string;
  guide: string;
  primaryMatch: string;
  matchedPreferences: string;
  disclaimer: string;
  methodNote: string;
  incomplete: string;
}>;

export const classFinderCopy = {
  ...coreClassFinderCopy,
  ...editorialClassFinderDataCopy,
} as const satisfies Localized<{
  kicker: string;
  title: string;
  description: string;
  privacy: string;
  start: string;
  progress: string;
  back: string;
  next: string;
  restart: string;
  resultsTitle: string;
  resultsDescription: string;
  save: string;
  saved: string;
  share: string;
  shared: string;
  copyFailed: string;
  classesOverview: string;
  guide: string;
  primaryMatch: string;
  matchedPreferences: string;
  disclaimer: string;
  methodNote: string;
  incomplete: string;
}>;

const coreClassFinderQuestions = [
  {
    id: "contribution",
    copy: {
      "zh-hant": {
        title: "你最想在戰鬥中提供什麼？",
        hint: "選擇最吸引你的主要貢獻，不必考慮目前熟練度。",
      },
      en: {
        title: "What do you most want to contribute in combat?",
        hint: "Choose the main contribution that appeals to you, regardless of current experience.",
      },
      ko: {
        title: "전투에서 가장 하고 싶은 역할은 무엇인가요?",
        hint: "현재 숙련도와 관계없이 가장 끌리는 핵심 기여를 고르세요.",
      },
    },
    options: [
      {
        id: "frontline-damage",
        copy: {
          "zh-hant": {
            label: "前線輸出",
            description: "貼近戰線，直接向目標施加壓力。",
          },
          en: {
            label: "Front-line damage",
            description: "Stay close to the line and apply direct pressure.",
          },
          ko: {
            label: "전방 공격",
            description: "전선 가까이에서 대상에게 직접 압박을 가합니다.",
          },
        },
        weights: { directDamage: 3, frontline: 4 },
      },
      {
        id: "protect-allies",
        copy: {
          "zh-hant": {
            label: "保護隊友",
            description: "承擔前線責任，阻擋攻擊並維持隊伍安全。",
          },
          en: {
            label: "Protect allies",
            description: "Take front-line responsibility and keep the party safe.",
          },
          ko: {
            label: "아군 보호",
            description: "전방 책임을 맡아 공격을 막고 파티를 지킵니다.",
          },
        },
        weights: { protection: 4, frontline: 2, groupResponsibility: 3 },
      },
      {
        id: "ranged-offence",
        copy: {
          "zh-hant": {
            label: "遠程攻擊",
            description: "運用距離、視線與時機輸出。",
          },
          en: {
            label: "Ranged offence",
            description: "Deal damage through range, line of sight, and timing.",
          },
          ko: {
            label: "원거리 공격",
            description: "거리, 시야, 타이밍을 활용해 공격합니다.",
          },
        },
        weights: { directDamage: 3, rangedPositioning: 4 },
      },
      {
        id: "restore-allies",
        copy: {
          "zh-hant": {
            label: "維持隊友生存",
            description: "以治療與優先級判斷支撐隊伍。",
          },
          en: {
            label: "Keep allies alive",
            description: "Support the party through healing and priority decisions.",
          },
          ko: {
            label: "아군 생존 유지",
            description: "치유와 우선순위 판단으로 파티를 지탱합니다.",
          },
        },
        weights: { healing: 4, teamSupport: 2, groupResponsibility: 3 },
      },
      {
        id: "flexible-support",
        copy: {
          "zh-hant": {
            label: "彈性支援",
            description: "在強化、控制、輔助治療與輸出間調整。",
          },
          en: {
            label: "Flexible support",
            description: "Shift among buffs, control, secondary healing, and damage.",
          },
          ko: {
            label: "유연한 지원",
            description: "강화, 제어, 보조 치유, 공격 사이를 조절합니다.",
          },
        },
        weights: { teamSupport: 4, tacticalControl: 2, healing: 1 },
      },
      {
        id: "weaken-and-control",
        copy: {
          "zh-hant": {
            label: "削弱與控場",
            description: "管理狀態、持續效果或召喚物來改變戰局。",
          },
          en: {
            label: "Weaken and control",
            description: "Shape the fight through states, persistent effects, or summons.",
          },
          ko: {
            label: "약화와 제어",
            description: "상태, 지속 효과, 소환수를 관리해 전투 흐름을 바꿉니다.",
          },
        },
        weights: { stateManagement: 4, tacticalControl: 3 },
      },
    ],
  },
  {
    id: "combat-rhythm",
    copy: {
      "zh-hant": {
        title: "你偏好哪種戰鬥節奏？",
        hint: "這是節奏偏好，不代表任何職業的輸出高低。",
      },
      en: {
        title: "Which combat rhythm do you prefer?",
        hint: "This is a rhythm preference, not a statement about class output.",
      },
      ko: {
        title: "어떤 전투 흐름을 선호하나요?",
        hint: "전투 흐름에 대한 선호이며 직업 공격력 비교가 아닙니다.",
      },
    },
    options: [
      {
        id: "steady-front-pressure",
        copy: {
          "zh-hant": {
            label: "持續前壓",
            description: "保持接觸並穩定推進戰線。",
          },
          en: {
            label: "Steady front pressure",
            description: "Maintain contact and press the line consistently.",
          },
          ko: {
            label: "지속적인 전방 압박",
            description: "접촉을 유지하며 전선을 꾸준히 밀어갑니다.",
          },
        },
        weights: { frontline: 4, directDamage: 2, shortWindowExecution: -1 },
      },
      {
        id: "decisive-window",
        copy: {
          "zh-hant": {
            label: "把握短時間機會",
            description: "等待時機，再集中操作與壓力。",
          },
          en: {
            label: "Commit in a short window",
            description: "Wait for an opening, then concentrate execution and pressure.",
          },
          ko: {
            label: "짧은 기회 집중",
            description: "기회를 기다린 뒤 조작과 압박을 집중합니다.",
          },
        },
        weights: { shortWindowExecution: 4, executionLoad: 2, directDamage: 2 },
      },
      {
        id: "move-at-range",
        copy: {
          "zh-hant": {
            label: "移動並保持距離",
            description: "在移動、視線與安全距離間尋找輸出時段。",
          },
          en: {
            label: "Move and keep range",
            description: "Find attack windows through movement, sight lines, and safe range.",
          },
          ko: {
            label: "이동하며 거리 유지",
            description: "이동, 시야, 안전 거리로 공격 시간을 만듭니다.",
          },
        },
        weights: { rangedPositioning: 4, positioningLoad: 3 },
      },
      {
        id: "layered-effects",
        copy: {
          "zh-hant": {
            label: "疊加並追蹤效果",
            description: "同時留意目標狀態、持續效果或召喚物。",
          },
          en: {
            label: "Layer and track effects",
            description: "Watch target states, persistent effects, or summons together.",
          },
          ko: {
            label: "효과 누적과 추적",
            description: "대상 상태, 지속 효과, 소환수를 함께 확인합니다.",
          },
        },
        weights: { stateManagement: 4, tacticalControl: 2 },
      },
      {
        id: "react-to-party",
        copy: {
          "zh-hant": {
            label: "依隊伍狀況反應",
            description: "隨隊友風險與戰況改變當下優先級。",
          },
          en: {
            label: "React to the party",
            description: "Change priorities as ally risk and the fight change.",
          },
          ko: {
            label: "파티 상황에 대응",
            description: "아군 위험과 전투 변화에 맞춰 우선순위를 바꿉니다.",
          },
        },
        weights: { groupResponsibility: 3, teamSupport: 3, healing: 1 },
      },
    ],
  },
  {
    id: "learning-load",
    copy: {
      "zh-hant": {
        title: "你願意學習哪一種負擔？",
        hint: "高負擔不代表更強，低負擔也不表示不需練習。",
      },
      en: {
        title: "Which kind of learning load are you willing to take on?",
        hint: "A higher load is not stronger, and a lower load still requires practice.",
      },
      ko: {
        title: "어떤 학습 부담을 감수할 수 있나요?",
        hint: "부담이 높다고 강한 것은 아니며, 낮아도 연습은 필요합니다.",
      },
    },
    options: [
      {
        id: "clear-baseline",
        copy: {
          "zh-hant": {
            label: "先建立清楚、可重複的基礎",
            description: "希望同時處理的操作、狀態與團隊責任較少。",
          },
          en: {
            label: "Build a clear repeatable baseline",
            description: "Prefer fewer simultaneous inputs, states, and party duties.",
          },
          ko: {
            label: "명확하고 반복 가능한 기초",
            description: "동시에 처리할 조작, 상태, 파티 책임이 적은 편을 선호합니다.",
          },
        },
        weights: {
          executionLoad: -3,
          stateManagement: -2,
          groupResponsibility: -1,
        },
      },
      {
        id: "precise-execution",
        copy: {
          "zh-hant": {
            label: "精準時機與連續決定",
            description: "願意練習壓縮在短時間內的操作。",
          },
          en: {
            label: "Precise timing and chained decisions",
            description: "Willing to practise execution compressed into a short window.",
          },
          ko: {
            label: "정확한 타이밍과 연속 판단",
            description: "짧은 시간에 집중되는 조작을 연습할 수 있습니다.",
          },
        },
        weights: { executionLoad: 4, shortWindowExecution: 3 },
      },
      {
        id: "positioning-work",
        copy: {
          "zh-hant": {
            label: "站位與移動路線",
            description: "願意持續管理距離、視線與進退時機。",
          },
          en: {
            label: "Position and movement routes",
            description: "Willing to manage range, sight lines, and engage-disengage timing.",
          },
          ko: {
            label: "위치와 이동 경로",
            description: "거리, 시야, 진입과 이탈 시점을 계속 관리할 수 있습니다.",
          },
        },
        weights: { positioningLoad: 4, rangedPositioning: 1, frontline: 1 },
      },
      {
        id: "multiple-states",
        copy: {
          "zh-hant": {
            label: "多層資訊與狀態",
            description: "願意建立固定檢查順序，追蹤多個狀態。",
          },
          en: {
            label: "Layered information and states",
            description: "Willing to build a check order for several active states.",
          },
          ko: {
            label: "여러 정보와 상태",
            description: "여러 상태를 확인하는 고정 순서를 만들 수 있습니다.",
          },
        },
        weights: { stateManagement: 4, tacticalControl: 2 },
      },
      {
        id: "team-decisions",
        copy: {
          "zh-hant": {
            label: "高團隊責任的判斷",
            description: "願意根據全隊狀況決定下一步。",
          },
          en: {
            label: "High-responsibility team decisions",
            description: "Willing to choose the next action from the party's state.",
          },
          ko: {
            label: "책임이 큰 파티 판단",
            description: "파티 전체 상태를 보고 다음 행동을 결정할 수 있습니다.",
          },
        },
        weights: { groupResponsibility: 4, teamSupport: 2 },
      },
    ],
  },
  {
    id: "preferred-position",
    copy: {
      "zh-hant": {
        title: "你想把注意力放在哪個位置？",
        hint: "選擇你最舒服的戰場視角。",
      },
      en: {
        title: "Where do you want to focus your attention?",
        hint: "Choose the battlefield perspective that feels most natural.",
      },
      ko: {
        title: "어느 위치에 집중하고 싶나요?",
        hint: "가장 편하게 느껴지는 전장 시점을 고르세요.",
      },
    },
    options: [
      {
        id: "at-the-front",
        copy: {
          "zh-hant": {
            label: "戰線前方",
            description: "貼近敵人並直接讀取前線變化。",
          },
          en: {
            label: "At the front",
            description: "Stay close to enemies and read changes on the line directly.",
          },
          ko: {
            label: "전선 앞",
            description: "적과 가까이에서 전선 변화를 직접 읽습니다.",
          },
        },
        weights: { frontline: 4, positioningLoad: 2 },
      },
      {
        id: "at-range",
        copy: {
          "zh-hant": {
            label: "安全距離",
            description: "從遠處管理距離、視線與攻擊時段。",
          },
          en: {
            label: "At range",
            description: "Manage range, sight lines, and attack windows from a distance.",
          },
          ko: {
            label: "안전 거리",
            description: "먼 거리에서 거리, 시야, 공격 시간을 관리합니다.",
          },
        },
        weights: { rangedPositioning: 4, positioningLoad: 2 },
      },
      {
        id: "with-the-party",
        copy: {
          "zh-hant": {
            label: "隊伍核心附近",
            description: "持續觀察隊友，讓支援能及時到位。",
          },
          en: {
            label: "Around the party core",
            description: "Keep allies in view so support can arrive on time.",
          },
          ko: {
            label: "파티 중심 근처",
            description: "아군을 계속 보며 필요한 지원을 제때 제공합니다.",
          },
        },
        weights: { teamSupport: 4, healing: 2, groupResponsibility: 2 },
      },
      {
        id: "adapt-as-needed",
        copy: {
          "zh-hant": {
            label: "依戰況調整",
            description: "願意在前後位置與多種責任間切換。",
          },
          en: {
            label: "Adapt as needed",
            description: "Willing to shift position and responsibility with the fight.",
          },
          ko: {
            label: "상황에 맞춰 조절",
            description: "전투에 따라 위치와 역할을 바꿀 수 있습니다.",
          },
        },
        weights: { teamSupport: 3, tacticalControl: 2, positioningLoad: 2 },
      },
    ],
  },
  {
    id: "party-responsibility",
    copy: {
      "zh-hant": {
        title: "你希望承擔多少團隊責任？",
        hint: "責任只描述決策負擔，不代表組隊資格或固定隊伍配置。",
      },
      en: {
        title: "How much party responsibility do you want?",
        hint: "Responsibility describes decision load, not eligibility or a fixed party composition.",
      },
      ko: {
        title: "어느 정도의 파티 책임을 원하나요?",
        hint: "책임은 판단 부담을 뜻하며 고정 조합이나 참가 자격을 뜻하지 않습니다.",
      },
    },
    options: [
      {
        id: "own-pressure",
        copy: {
          "zh-hant": {
            label: "以自己的攻擊責任為主",
            description: "希望主要關注目標、站位與自身循環。",
          },
          en: {
            label: "Focus on my own pressure",
            description: "Primarily watch the target, position, and personal loop.",
          },
          ko: {
            label: "내 공격 책임에 집중",
            description: "대상, 위치, 자신의 흐름을 주로 확인합니다.",
          },
        },
        weights: {
          directDamage: 3,
          groupResponsibility: -3,
          teamSupport: -1,
        },
      },
      {
        id: "support-when-needed",
        copy: {
          "zh-hant": {
            label: "輸出為主，必要時支援",
            description: "保留明確主責，同時願意補上部分隊伍功能。",
          },
          en: {
            label: "Deal damage and assist when needed",
            description: "Keep a clear primary job while contributing some party utility.",
          },
          ko: {
            label: "공격 중심, 필요할 때 지원",
            description: "주요 역할을 유지하면서 일부 파티 기능을 돕습니다.",
          },
        },
        weights: { directDamage: 2, teamSupport: 2, groupResponsibility: 1 },
      },
      {
        id: "lead-and-protect",
        copy: {
          "zh-hant": {
            label: "承擔前線與保護責任",
            description: "願意讓自己的站位與判斷直接影響隊伍安全。",
          },
          en: {
            label: "Lead and protect",
            description: "Accept that position and judgment directly affect party safety.",
          },
          ko: {
            label: "전방 책임과 보호",
            description: "내 위치와 판단이 파티 안전에 직접 영향을 주는 역할을 맡습니다.",
          },
        },
        weights: { protection: 4, groupResponsibility: 4, frontline: 2 },
      },
      {
        id: "healing-priority",
        copy: {
          "zh-hant": {
            label: "負責治療優先級",
            description: "願意持續判斷誰最需要支援並維持自身安全。",
          },
          en: {
            label: "Own healing priorities",
            description: "Continually decide who needs help most while staying safe.",
          },
          ko: {
            label: "치유 우선순위 담당",
            description: "누가 가장 위험한지 계속 판단하면서 자신의 안전도 유지합니다.",
          },
        },
        weights: { healing: 4, groupResponsibility: 4, teamSupport: 2 },
      },
    ],
  },
  {
    id: "mistake-tolerance",
    copy: {
      "zh-hant": {
        title: "面對失誤時，你接受哪種練習方式？",
        hint: "選擇你願意反覆改善的失誤類型。",
      },
      en: {
        title: "How do you want to practise through mistakes?",
        hint: "Choose the kind of error you are willing to improve repeatedly.",
      },
      ko: {
        title: "실수를 어떤 방식으로 연습하고 싶나요?",
        hint: "반복해서 개선할 수 있는 실수 유형을 고르세요.",
      },
    },
    options: [
      {
        id: "forgiving-baseline",
        copy: {
          "zh-hant": {
            label: "先從較寬容的基礎開始",
            description: "希望先減少短時間操作與多狀態追蹤。",
          },
          en: {
            label: "Start from a more forgiving baseline",
            description: "First reduce compressed execution and multi-state tracking.",
          },
          ko: {
            label: "여유 있는 기초부터 시작",
            description: "짧은 시간 조작과 여러 상태 추적 부담을 먼저 줄입니다.",
          },
        },
        weights: {
          executionLoad: -4,
          stateManagement: -2,
          groupResponsibility: -1,
        },
      },
      {
        id: "repeat-precision",
        copy: {
          "zh-hant": {
            label: "反覆修正進場與操作時機",
            description: "接受短時間決定與操作失誤需要重新練習。",
          },
          en: {
            label: "Repeat entry and execution timing",
            description: "Accept retraining decisions and inputs made in a short window.",
          },
          ko: {
            label: "진입과 조작 타이밍 반복",
            description: "짧은 시간의 판단과 조작 실수를 다시 연습할 수 있습니다.",
          },
        },
        weights: { executionLoad: 4, shortWindowExecution: 3 },
      },
      {
        id: "improve-check-order",
        copy: {
          "zh-hant": {
            label: "改善資訊檢查順序",
            description: "接受因漏看狀態而調整自己的觀察流程。",
          },
          en: {
            label: "Improve an information check order",
            description: "Accept changing the observation loop after missing a state.",
          },
          ko: {
            label: "정보 확인 순서 개선",
            description: "상태를 놓쳤을 때 관찰 순서를 조정할 수 있습니다.",
          },
        },
        weights: { stateManagement: 4, tacticalControl: 2 },
      },
      {
        id: "review-team-decisions",
        copy: {
          "zh-hant": {
            label: "檢討影響隊伍的判斷",
            description: "接受自己的優先級與站位會直接影響隊友。",
          },
          en: {
            label: "Review decisions that affect the party",
            description: "Accept that priorities and positioning can directly affect allies.",
          },
          ko: {
            label: "파티에 영향을 준 판단 복기",
            description: "내 우선순위와 위치가 아군에게 직접 영향을 줄 수 있음을 받아들입니다.",
          },
        },
        weights: { groupResponsibility: 4, teamSupport: 2, protection: 1 },
      },
    ],
  },
] as const satisfies readonly CoreClassFinderQuestion[];

const coreClassFinderClassProfiles = [
  {
    classId: "gladiator",
    guideSlug: "gladiator",
    copy: {
      "zh-hant": {
        name: "劍星",
        weapon: "大劍",
        officialRole: "高攻防的近戰輸出；官方亦提到可兼任副坦克。",
        summary: "主要目標清楚，偏好持續前線壓力與攻守判斷的玩家可優先了解。",
      },
      en: {
        name: "Gladiator",
        weapon: "Greatsword",
        officialRole:
          "A high-attack, high-defense melee damage role that NC also describes as capable of sub-tanking.",
        summary:
          "Its main objective is clear and may suit players drawn to steady front-line pressure and attack-defence judgment.",
      },
      ko: {
        name: "검성",
        weapon: "대검",
        officialRole:
          "높은 공격력과 방어력을 갖춘 근접 딜러이며 서브 탱커 역할도 제시됩니다.",
        summary:
          "핵심 목표가 분명하며 지속적인 전방 압박과 공수 판단을 선호한다면 먼저 살펴볼 수 있습니다.",
      },
    },
    traits: {
      directDamage: 4,
      frontline: 4,
      rangedPositioning: 0,
      shortWindowExecution: 2,
      tacticalControl: 1,
      stateManagement: 1,
      protection: 2,
      healing: 0,
      teamSupport: 1,
      positioningLoad: 3,
      executionLoad: 2,
      groupResponsibility: 2,
    },
  },
  {
    classId: "templar",
    guideSlug: "templar",
    copy: {
      "zh-hant": {
        name: "守護星",
        weapon: "長劍與盾牌",
        officialRole: "阻擋攻擊、保護隊友的前線坦克。",
        summary: "適合願意承擔前線站位、保護時機與主要團隊責任的玩家了解。",
      },
      en: {
        name: "Templar",
        weapon: "Longsword and shield",
        officialRole: "A front-line tank that blocks attacks and protects allies.",
        summary:
          "Worth exploring if you want front-line positioning, protection timing, and primary party responsibility.",
      },
      ko: {
        name: "수호성",
        weapon: "장검과 방패",
        officialRole: "공격을 차단하고 아군을 보호하는 최전선 탱커입니다.",
        summary:
          "전방 위치, 보호 타이밍, 핵심 파티 책임을 맡고 싶다면 살펴볼 만합니다.",
      },
    },
    traits: {
      directDamage: 1,
      frontline: 4,
      rangedPositioning: 0,
      shortWindowExecution: 0,
      tacticalControl: 2,
      stateManagement: 1,
      protection: 4,
      healing: 0,
      teamSupport: 3,
      positioningLoad: 4,
      executionLoad: 2,
      groupResponsibility: 4,
    },
  },
  {
    classId: "assassin",
    guideSlug: "assassin",
    copy: {
      "zh-hant": {
        name: "殺星",
        weapon: "雙手短劍",
        officialRole: "以隱身、快速連擊與狀態異常在短時間內壓制目標。",
        summary: "適合願意反覆練習進場時機、短時間操作、目標選擇與安全撤離的玩家。",
      },
      en: {
        name: "Assassin",
        weapon: "Dual daggers",
        officialRole:
          "A precision melee role using stealth, fast chains, and status effects to pressure a target in a short window.",
        summary:
          "May suit players willing to repeat entry timing, compressed execution, target choice, and safe disengagement.",
      },
      ko: {
        name: "살성",
        weapon: "양손 단검",
        officialRole:
          "은신, 빠른 연계, 상태 이상으로 짧은 시간 안에 대상을 제압합니다.",
        summary:
          "진입 타이밍, 짧은 조작, 대상 선택, 안전한 이탈을 반복 연습하고 싶다면 어울릴 수 있습니다.",
      },
    },
    traits: {
      directDamage: 4,
      frontline: 3,
      rangedPositioning: 0,
      shortWindowExecution: 4,
      tacticalControl: 2,
      stateManagement: 2,
      protection: 0,
      healing: 0,
      teamSupport: 0,
      positioningLoad: 4,
      executionLoad: 4,
      groupResponsibility: 1,
    },
  },
  {
    classId: "ranger",
    guideSlug: "ranger",
    copy: {
      "zh-hant": {
        name: "弓星",
        weapon: "弓",
        officialRole: "重視站位、時機與戰術應對的遠距離攻擊職業。",
        summary: "適合想在移動中管理安全距離、視線與攻擊時段的玩家了解。",
      },
      en: {
        name: "Ranger",
        weapon: "Bow",
        officialRole:
          "A ranged attack role shaped by positioning, timing, and tactical response.",
        summary:
          "Worth exploring if you want to manage safe range, sight lines, and attack windows while moving.",
      },
      ko: {
        name: "궁성",
        weapon: "활",
        officialRole:
          "원거리 공격과 위치 선정, 타이밍, 전술적 대응을 중시합니다.",
        summary:
          "이동하면서 안전 거리, 시야, 공격 시간을 관리하고 싶다면 살펴볼 만합니다.",
      },
    },
    traits: {
      directDamage: 4,
      frontline: 0,
      rangedPositioning: 4,
      shortWindowExecution: 2,
      tacticalControl: 1,
      stateManagement: 1,
      protection: 0,
      healing: 0,
      teamSupport: 0,
      positioningLoad: 4,
      executionLoad: 2,
      groupResponsibility: 1,
    },
  },
  {
    classId: "sorcerer",
    guideSlug: "sorcerer",
    copy: {
      "zh-hant": {
        name: "魔道星",
        weapon: "魔法書",
        officialRole: "專注短時間高魔法傷害，並需管理距離與控場的遠程輸出。",
        summary: "適合喜歡遠程站位、短時間施壓與控場判斷的玩家了解。",
      },
      en: {
        name: "Sorcerer",
        weapon: "Spellbook",
        officialRole:
          "A ranged role focused on high magic damage in a short window, with range and control management required.",
        summary:
          "May suit players drawn to ranged positioning, short pressure windows, and control decisions.",
      },
      ko: {
        name: "마도성",
        weapon: "마법서",
        officialRole:
          "짧은 시간의 높은 마법 피해에 특화되고 거리와 제어를 관리하는 원거리 딜러입니다.",
        summary:
          "원거리 위치, 짧은 압박 시간, 제어 판단을 선호한다면 살펴볼 만합니다.",
      },
    },
    traits: {
      directDamage: 4,
      frontline: 0,
      rangedPositioning: 4,
      shortWindowExecution: 4,
      tacticalControl: 4,
      stateManagement: 2,
      protection: 0,
      healing: 0,
      teamSupport: 0,
      positioningLoad: 4,
      executionLoad: 3,
      groupResponsibility: 1,
    },
  },
  {
    classId: "spiritmaster",
    guideSlug: "spiritmaster",
    copy: {
      "zh-hant": {
        name: "精靈星",
        weapon: "寶珠",
        officialRole: "召喚屬性精靈，並以狀態異常與持續傷害削弱敵人。",
        summary: "適合願意同時追蹤召喚物、持續效果、目標狀態與自身位置的玩家。",
      },
      en: {
        name: "SpiritMaster",
        weapon: "Orb",
        officialRole:
          "A summoner that uses elemental spirits, status effects, and damage over time to weaken enemies.",
        summary:
          "May suit players willing to track a summon, persistent effects, target states, and personal position together.",
      },
      ko: {
        name: "정령성",
        weapon: "보주",
        officialRole:
          "정령을 소환하고 상태 이상과 지속 피해로 적을 약화합니다.",
        summary:
          "소환수, 지속 효과, 대상 상태, 자신의 위치를 함께 확인하고 싶다면 어울릴 수 있습니다.",
      },
    },
    traits: {
      directDamage: 3,
      frontline: 0,
      rangedPositioning: 3,
      shortWindowExecution: 1,
      tacticalControl: 4,
      stateManagement: 4,
      protection: 0,
      healing: 0,
      teamSupport: 1,
      positioningLoad: 3,
      executionLoad: 3,
      groupResponsibility: 2,
    },
  },
  {
    classId: "cleric",
    guideSlug: "cleric",
    copy: {
      "zh-hant": {
        name: "治癒星",
        weapon: "戰鎚",
        officialRole: "以回復技能維持隊友生存與戰鬥續航的核心治療者。",
        summary: "適合願意持續閱讀多人狀態、維持自身安全並承擔治療優先級的玩家。",
      },
      en: {
        name: "Cleric",
        weapon: "Mace",
        officialRole:
          "The core healer that maintains allied health and combat endurance.",
        summary:
          "Worth exploring if you want to read several ally states, preserve your own safety, and own healing priorities.",
      },
      ko: {
        name: "치유성",
        weapon: "전곤",
        officialRole:
          "회복 스킬로 아군의 생명력과 전투 지속력을 유지하는 핵심 힐러입니다.",
        summary:
          "여러 아군 상태를 읽고 자신의 안전을 유지하며 치유 우선순위를 맡고 싶다면 살펴볼 만합니다.",
      },
    },
    traits: {
      directDamage: 1,
      frontline: 1,
      rangedPositioning: 2,
      shortWindowExecution: 0,
      tacticalControl: 1,
      stateManagement: 4,
      protection: 1,
      healing: 4,
      teamSupport: 4,
      positioningLoad: 4,
      executionLoad: 3,
      groupResponsibility: 4,
    },
  },
  {
    classId: "chanter",
    guideSlug: "chanter",
    copy: {
      "zh-hant": {
        name: "護法星",
        weapon: "法杖",
        officialRole: "以真言強化隊友，並兼顧控場、輔助治療與輸出。",
        summary: "適合想保留一項主要支援責任，再逐步切換控制、治療與輸出的玩家。",
      },
      en: {
        name: "Chanter",
        weapon: "Staff",
        officialRole:
          "A support using mantras to strengthen allies while contributing control, secondary healing, and damage.",
        summary:
          "May suit players who want one primary support duty while gradually switching among control, healing, and damage.",
      },
      ko: {
        name: "호법성",
        weapon: "법봉",
        officialRole:
          "진언으로 아군을 강화하고 제어, 보조 치유, 보조 피해에 기여합니다.",
        summary:
          "한 가지 핵심 지원 책임을 두고 제어, 치유, 공격을 단계적으로 전환하고 싶다면 어울릴 수 있습니다.",
      },
    },
    traits: {
      directDamage: 2,
      frontline: 2,
      rangedPositioning: 1,
      shortWindowExecution: 1,
      tacticalControl: 3,
      stateManagement: 3,
      protection: 1,
      healing: 2,
      teamSupport: 4,
      positioningLoad: 3,
      executionLoad: 2,
      groupResponsibility: 3,
    },
  },
] as const satisfies readonly CoreClassFinderClassProfile[];

const editorialLocales = [
  "zh-hans",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
] as const satisfies readonly ClassFinderEditorialLocale[];

export const classFinderQuestions: readonly ClassFinderQuestion[] =
  coreClassFinderQuestions.map((question) => ({
    ...question,
    copy: {
      ...question.copy,
      ...Object.fromEntries(
        editorialLocales.map((locale) => [
          locale,
          getEditorialQuestionCopy(locale, question.id),
        ]),
      ),
    } as Localized<{ title: string; hint: string }>,
    options: question.options.map((option) => ({
      ...option,
      copy: {
        ...option.copy,
        ...Object.fromEntries(
          editorialLocales.map((locale) => [
            locale,
            getEditorialOptionCopy(locale, option.id),
          ]),
        ),
      } as Localized<ClassFinderOptionCopy>,
    })),
  }));

export const classFinderClassProfiles: readonly ClassFinderClassProfile[] =
  coreClassFinderClassProfiles.map((profile) => ({
    ...profile,
    copy: {
      ...profile.copy,
      ...Object.fromEntries(
        editorialLocales.map((locale) => [
          locale,
          getEditorialProfileCopy(locale, profile.classId),
        ]),
      ),
    } as ClassFinderClassProfile["copy"],
  }));

const questionOrder = classFinderQuestions.map(
  (question) => question.id,
) as readonly ClassFinderQuestionId[];

const classOrder = new Map<ClassFinderClassId, number>(
  classFinderClassProfiles.map((profile, index) => [profile.classId, index]),
);

function findOption(
  question: ClassFinderQuestion,
  optionId: string | undefined,
) {
  if (!optionId) return undefined;
  return question.options.find((option) => option.id === optionId);
}

function validSelections(answers: ClassFinderAnswerMap) {
  return classFinderQuestions.flatMap((question) => {
    const option = findOption(question, answers[question.id]);
    return option ? [{ question, option }] : [];
  });
}

function scoreWeight(trait: PreferenceLevel, weight: number) {
  return weight >= 0 ? trait * weight : (4 - trait) * Math.abs(weight);
}

function optionMaximum(option: ClassFinderOption) {
  return Object.values(option.weights).reduce(
    (total, weight) => total + Math.abs(weight ?? 0) * 4,
    0,
  );
}

function optionScore(
  profile: ClassFinderClassProfile,
  option: ClassFinderOption,
) {
  return (
    Object.entries(option.weights) as Array<[ClassFinderDimension, number]>
  ).reduce(
    (total, [dimension, weight]) =>
      total + scoreWeight(profile.traits[dimension], weight),
    0,
  );
}

function resultReason(locale: SiteLocale, preferences: readonly string[]) {
  if (locale === "zh-hant") {
    return `你的「${preferences.join("」、「")}」偏好與這個職業的定位較相符。`;
  }
  if (locale === "ko") {
    return `「${preferences.join("」, 「")}」 선호가 이 직업의 역할과 비교적 잘 맞습니다.`;
  }
  if (locale === "en") {
    return `Your preferences for ${preferences.join(" and ")} align relatively well with this class profile.`;
  }
  return editorialResultReason(locale, preferences);
}

export function getClassFinderGuideHref(
  locale: SiteLocale,
  classId: ClassFinderClassId,
) {
  return localizedHref(locale, `/classes/${classId}/`);
}

export function getClassFinderProgress(
  answers: ClassFinderAnswerMap,
): ClassFinderProgress {
  const answered = validSelections(answers).length;
  return {
    answered,
    total: classFinderQuestions.length,
    complete: answered === classFinderQuestions.length,
  };
}

/**
 * Produce a stable top-three shortlist.
 *
 * Identical valid answers always produce the same scores and ordering. Ties use
 * the documented eight-class roster order, never randomness. Partial answers
 * are supported for previews; callers can require `getClassFinderProgress().complete`
 * before presenting the final result.
 */
export function scoreClassFinder(
  answers: ClassFinderAnswerMap,
  locale: SiteLocale,
): ClassFinderResult[] {
  const selections = validSelections(answers);
  if (selections.length === 0) return [];
  const maxScore = selections.reduce(
    (total, { option }) => total + optionMaximum(option),
    0,
  );

  const scored = classFinderClassProfiles.map((profile) => {
    const perAnswer = selections.map(({ question, option }, questionIndex) => {
      const maximum = optionMaximum(option);
      const score = optionScore(profile, option);
      return {
        questionIndex,
        score,
        ratio: maximum > 0 ? score / maximum : 0,
        label: option.copy[locale].label,
        questionId: question.id,
      };
    });
    const rawScore = perAnswer.reduce((total, item) => total + item.score, 0);

    return {
      profile,
      rawScore,
      maxScore,
      matchPercent:
        maxScore > 0 ? Math.max(0, Math.min(100, Math.round((rawScore / maxScore) * 100))) : 0,
      matchedPreferences: perAnswer
        .sort(
          (left, right) =>
            right.ratio - left.ratio ||
            left.questionIndex - right.questionIndex ||
            left.questionId.localeCompare(right.questionId),
        )
        .slice(0, 2)
        .map((item) => item.label),
    };
  });

  return scored
    .sort(
      (left, right) =>
        right.rawScore - left.rawScore ||
        (classOrder.get(left.profile.classId) ?? 0) -
          (classOrder.get(right.profile.classId) ?? 0),
    )
    .slice(0, 3)
    .map((item, index) => {
      const copy = item.profile.copy[locale];
      const rank = (index + 1) as 1 | 2 | 3;
      return {
        rank,
        classId: item.profile.classId,
        name: copy.name,
        weapon: copy.weapon,
        officialRole: copy.officialRole,
        summary: copy.summary,
        guideHref: getClassFinderGuideHref(locale, item.profile.classId),
        matchPercent: item.matchPercent,
        rawScore: item.rawScore,
        maxScore: item.maxScore,
        matchedPreferences: item.matchedPreferences,
        reason: resultReason(locale, item.matchedPreferences),
        disclaimer: classFinderCopy[locale].disclaimer,
      };
    });
}

/** Alias retained for the initial component integration contract. */
export const scoreClassFinderAnswers = scoreClassFinder;

export function serializeClassFinderAnswers(answers: ClassFinderAnswerMap) {
  const params = new URLSearchParams();
  for (const questionId of questionOrder) {
    const question = classFinderQuestions.find((item) => item.id === questionId);
    const option = question && findOption(question, answers[questionId]);
    if (option) params.set(questionId, option.id);
  }
  return params.toString();
}

export function parseClassFinderAnswers(
  serialized: string,
): ClassFinderAnswerMap {
  let value = serialized.trim();
  const queryIndex = value.indexOf("?");
  if (queryIndex >= 0) value = value.slice(queryIndex + 1);
  if (value.startsWith("#")) value = value.slice(1);
  const hashIndex = value.indexOf("#");
  if (hashIndex >= 0) value = value.slice(0, hashIndex);

  const params = new URLSearchParams(value);
  const answers: ClassFinderAnswerMap = {};
  for (const question of classFinderQuestions) {
    const optionId = params.get(question.id) ?? undefined;
    if (findOption(question, optionId)) answers[question.id] = optionId;
  }
  return answers;
}

/**
 * Plain-language scope notice for surfaces that render only the data module.
 * Brawler is intentionally absent because the Global official roster currently
 * exposes these eight base classes; this tool does not predict launch balance.
 */
export const classFinderScopeNote: LocalizedText = {
  "zh-hant":
    "本工具只涵蓋目前全球官方名冊可核對的八個基礎職業；不預測全球版平衡、首日強度或未來新增職業。",
  en:
    "This tool covers only the eight base classes verifiable on the current Global official roster; it does not predict Global balance, launch power, or future additions.",
  ko:
    "이 도구는 현재 글로벌 공식 목록에서 확인할 수 있는 기본 8개 직업만 다루며 글로벌 밸런스, 출시 성능, 향후 추가 직업을 예측하지 않습니다.",
  ...editorialScopeNotes,
};
