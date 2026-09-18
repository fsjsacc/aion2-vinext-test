import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { ContentLocale } from "./site-config";

type LocalizedArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote" | "sections"
> & { keywords?: readonly string[] };

const labels = {
  "zh-hant": {
    byline: "AION2 KINA 編輯團隊",
    backLabel: "返回內容中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "最後核對",
    relatedLabel: "相關內容",
  },
  en: {
    byline: "AION2 KINA Editorial",
    backLabel: "Back to the content hub",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  ko: {
    byline: "AION2 KINA 편집팀",
    backLabel: "콘텐츠 허브로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "KINA 게시",
    updatedLabel: "마지막 확인",
    relatedLabel: "관련 콘텐츠",
  },
} as const;

function articleCopy(
  locale: ContentLocale,
  readingMinutes: number,
  body: LocalizedArticleBody,
): LocalizedContent {
  const readingTime = {
    "zh-hant": `約 ${readingMinutes} 分鐘`,
    en: `${readingMinutes} min read`,
    ko: `약 ${readingMinutes}분`,
  }[locale];
  return { ...labels[locale], readingTime, ...body };
}

const publishedVerified = {
  status: "published",
  indexable: true,
  localeReview: { "zh-hant": "approved", en: "approved", ko: "approved" },
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

function officialSource(
  id: string,
  label: string,
  url: string,
  publishedAt?: string,
): ContentSource {
  return {
    id,
    kind: "official",
    publisher: "NC Corporation",
    label,
    url,
    ...(publishedAt ? { publishedAt } : {}),
    retrievedAt: "2026-07-14",
    verifiedAt: "2026-07-14",
  };
}

function officialHero(
  src: string,
  sourceUrl: string,
  translations: ContentHeroImage["translations"],
): ContentHeroImage {
  return {
    src,
    width: 800,
    height: 420,
    credit: "NC Corporation",
    sourceUrl,
    rights: "linked-official-media",
    translations,
  };
}

const petRoadmapSource = officialSource(
  "pet-server-sharing-2026-01-07",
  "AION2 Season 2 roadmap and pet system sharing rules",
  "https://about.ncsoft.com/news/article/aion2_update_260107",
  "2026-01-07",
);

const officialProbabilityIndex = officialSource(
  "aion2-probability-index",
  "AION2 official probability disclosure index",
  "https://probability.plaync.com/aion2/index",
);

const seasonTwoSource = officialSource(
  "season-two-systems-2026-01-21",
  "AION2 Season 2 equipment and system update",
  "https://about.ncsoft.com/news/article/aion2_update_260121",
  "2026-01-21",
);

const soulTuningProbabilitySource = officialSource(
  "soul-tuning-probability-rules",
  "AION2 official weapon Soul Imprint and Soul Tuning probability rules",
  "https://probability.plaync.com/aion2/view?probCategoryId=68f1fb1157c8986afe4405ed",
);

const factionRevealSource = officialSource(
  "elyos-asmodians-core-reveal-2025-05-30",
  "AION2 core content reveal: Elyos, Asmodians, and RvR",
  "https://about.ncsoft.com/news/article/aion2_update_250530_2",
  "2025-05-30",
);

const chaoticAbyssSource = officialSource(
  "chaotic-abyss-2026-03-25",
  "AION2 class overhaul and Chaotic Abyss update",
  "https://about.ncsoft.com/news/article/aion2_update_260325",
  "2026-03-25",
);

const chapterOneSource = officialSource(
  "chapter-one-abyss-2026-07-01",
  "AION2 Chapter 1 update and new PvP content",
  "https://about.ncsoft.com/news/article/Aion2_update_20260701",
  "2026-07-01",
);

export const p1SystemsContentEntries = [
  {
    section: "guides",
    slug: "pet-progression",
    schemaType: "TechArticle",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [petRoadmapSource, officialProbabilityIndex],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/a29ce0d6-dd1b-4b63-9809-7000646b5985.png",
      petRoadmapSource.url,
      {
        "zh-hant": {
          alt: "AION2 2026 年第 2 賽季官方路線圖宣傳圖",
          caption: "NC 在第 2 賽季路線圖公告中確認 2026 年 1 月 7 日的寵物共享規則調整。",
        },
        en: {
          alt: "Official AION2 Season 2 roadmap artwork",
          caption: "NC used the Season 2 roadmap announcement to confirm the January 7, 2026 pet-sharing rule changes.",
        },
        ko: {
          alt: "AION2 2026 시즌2 공식 로드맵 이미지",
          caption: "NC는 시즌2 로드맵 안내에서 2026년 1월 7일 적용된 펫 공유 규칙 변경을 확인했습니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "soul-imprint" },
      { kind: "content", section: "guides", slug: "arcana" },
      { kind: "content", section: "classes", slug: "class-planning-framework" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "寵物成長",
        title: "AION2 寵物成長：理解度、等級與伺服器內角色共享規則",
        description: "NC 已確認寵物持有狀態、種族理解度和寵物等級在同一伺服器角色間的計算方式；材料消耗與最優培養路線仍須以當前遊戲資料為準。",
        intro: "寵物改版後，最容易混淆的不是材料名稱，而是哪些數值取最高、哪些數值會相加。這篇只整理 NC 已公布的伺服器內規則，不用未核實的掉落表或『最快路線』填補空白。",
        sourceNote: "依 NC 2026 年 1 月 7 日公告與官方機率資訊入口核對；不推定跨伺服器、跨帳號或全球版規則。",
        keywords: ["AION2 寵物", "AION2 寵物成長", "AION2 種族理解度", "AION2 pet progression", "아이온2 펫"],
        sections: [
          {
            id: "server-sharing-rules",
            title: "三個已確認的伺服器內規則",
            paragraphs: [
              "NC 的 2026 年 1 月 7 日公告表示，原本以角色為單位的『種族理解度』與『寵物持有』改為同一伺服器內角色共享。這個公告沒有把範圍擴大到其他伺服器或其他帳號。",
              "種族理解度採用同一伺服器角色中已達成的最高數值；寵物等級則會合計該伺服器所有角色的等級。『取最高』與『加總』是兩種不同規則，規劃分身時不要混用。",
            ],
          },
          {
            id: "verify-progress",
            title: "培養前先核對共享範圍與當前數值",
            paragraphs: [
              "先確認角色位於同一伺服器，再分別記錄理解度、寵物持有狀態和寵物等級。若畫面結果與預期不符，應先檢查伺服器、版本與介面說明，而不是假設所有寵物欄位都用相同算法。",
              "官方機率資訊站設有『寵物種族理解度』分類，但表格可能隨版本更新。需要判斷某一等級或種族的可取得選項時，應直接查看當期官方表格與遊戲內顯示。",
            ],
            bullets: [
              "理解度看同伺服器角色中的最高達成值。",
              "寵物等級按同伺服器所有角色加總。",
              "不要把寵物持有共享推廣成跨伺服器或跨帳號共享。",
            ],
          },
          {
            id: "progression-boundary",
            title: "官方資料沒有提供通用最優培養路線",
            paragraphs: [
              "本次公告沒有列出完整材料來源、每級固定消耗、最省資源的角色分配或所有寵物的優先順序。因此不能僅憑共享規則寫出永久有效的『先練哪一隻』答案。",
              "把成長建議綁定到伺服器版本、當前持有寵物和官方機率頁，才能在數值調整後重新核對；沒有這些條件時，準確答案應是尚未確認。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "PET PROGRESSION",
        title: "AION2 pet progression: Genus Insight, levels, and server-wide character sharing",
        description: "NC confirms how pet ownership, Genus Insight, and pet levels are calculated across characters on one server; material costs and optimal routes still require current game data.",
        intro: "The key distinction after the pet update is not a material name, but which value uses a maximum and which values are added together. This page stays within NC's published server-sharing rules and does not invent a drop table or fastest route.",
        sourceNote: "Checked against NC's January 7, 2026 announcement and official probability index; no cross-server, cross-account, or global-build rule is inferred.",
        keywords: ["AION2 pets", "AION2 pet progression", "AION2 Genus Insight", "AION2 pet level", "AION2 pet guide"],
        sections: [
          {
            id: "server-sharing-rules",
            title: "Three confirmed server-wide rules",
            paragraphs: [
              "NC's January 7, 2026 announcement says Genus Insight and pet ownership, previously handled per character, changed to sharing among characters on the same server. It does not extend that scope to another server or account.",
              "Genus Insight uses the highest value reached by a character on that server. Pet levels are aggregated across all characters on the server. Maximum and sum are separate rules and should not be interchanged when planning alternate characters.",
            ],
          },
          {
            id: "verify-progress",
            title: "Verify scope and current values before investing",
            paragraphs: [
              "Confirm that the characters are on the same server, then record Genus Insight, owned pets, and pet levels separately. If the result differs from expectation, check server, build, and interface wording before assuming every pet field uses one calculation.",
              "The official probability site includes a Pet Genus Insight category, but its tables can change with the live build. Use the current official table and in-game display when evaluating outcomes for a level or genus.",
            ],
            bullets: [
              "Genus Insight uses the highest achievement on the same server.",
              "Pet levels are summed across characters on that server.",
              "Do not turn server-wide pet ownership into a cross-server or cross-account claim.",
            ],
          },
          {
            id: "progression-boundary",
            title: "The sources do not provide one optimal pet route",
            paragraphs: [
              "The announcement does not publish a complete material-source table, fixed cost for every level, ideal character allocation, or permanent pet priority list. A universal 'level this pet first' answer cannot be derived from the sharing rule alone.",
              "Version, current pet roster, and the live official probability page are the minimum context for a reproducible recommendation. Without them, the accurate status is unverified.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "펫 성장",
        title: "AION2 펫 성장: 종족 이해도, 레벨, 서버 내 캐릭터 공유 규칙",
        description: "NC가 펫 보유, 종족 이해도, 펫 레벨이 같은 서버의 캐릭터 사이에서 계산되는 방식을 확인했으며 재료 소모와 최적 성장 경로는 현재 게임 자료로 별도 확인해야 합니다.",
        intro: "펫 개편 뒤 가장 중요한 구분은 재료 이름이 아니라 어떤 값은 최댓값을 쓰고 어떤 값은 합산하는지입니다. 이 글은 NC가 공개한 서버 내 공유 규칙만 다루며 확인되지 않은 드롭표나 최단 경로를 만들지 않습니다.",
        sourceNote: "NC의 2026년 1월 7일 안내와 공식 확률정보 페이지를 대조했으며 서버 간, 계정 간, 글로벌 버전 규칙은 추정하지 않습니다.",
        keywords: ["아이온2 펫", "아이온2 펫 성장", "아이온2 종족 이해도", "아이온2 펫 레벨", "AION2 pet progression"],
        sections: [
          {
            id: "server-sharing-rules",
            title: "확인된 세 가지 서버 공유 규칙",
            paragraphs: [
              "NC의 2026년 1월 7일 안내에 따르면 캐릭터 단위였던 종족 이해도와 펫 보유가 같은 서버의 캐릭터 공유로 변경됐습니다. 다른 서버나 다른 계정까지 공유된다는 내용은 없습니다.",
              "종족 이해도는 같은 서버 캐릭터 중 가장 높은 달성 수치를 적용하고, 펫 레벨은 서버 내 모든 캐릭터의 수치를 합산합니다. 최댓값과 합산은 서로 다른 규칙이므로 부캐릭터 계획에서 섞어 해석하면 안 됩니다.",
            ],
          },
          {
            id: "verify-progress",
            title: "성장 전에 공유 범위와 현재 수치 확인",
            paragraphs: [
              "캐릭터가 같은 서버에 있는지 확인한 뒤 종족 이해도, 펫 보유, 펫 레벨을 각각 기록합니다. 예상과 다르면 모든 펫 항목이 같은 계산식을 쓴다고 단정하기 전에 서버와 빌드, 화면 안내를 먼저 확인해야 합니다.",
              "공식 확률정보 사이트에는 펫 종족 이해도 분류가 있지만 표는 라이브 버전에 따라 바뀔 수 있습니다. 특정 레벨이나 종족의 결과를 판단할 때는 현재 공식 표와 게임 내 표시를 직접 확인합니다.",
            ],
            bullets: [
              "종족 이해도는 같은 서버의 가장 높은 달성값을 봅니다.",
              "펫 레벨은 같은 서버 캐릭터 전체의 값을 합산합니다.",
              "펫 보유 공유를 서버 간 또는 계정 간 공유로 확대 해석하지 않습니다.",
            ],
          },
          {
            id: "progression-boundary",
            title: "공식 자료에는 공통 최적 성장 경로가 없습니다",
            paragraphs: [
              "해당 안내는 전체 재료 획득처, 레벨별 고정 비용, 가장 효율적인 캐릭터 배분, 모든 펫의 영구 우선순위를 공개하지 않았습니다. 공유 규칙만으로 '무조건 먼저 키울 펫'을 정할 수 없습니다.",
              "서버 버전, 현재 보유 펫, 최신 공식 확률표를 함께 남겨야 조정 뒤에도 다시 검증할 수 있습니다. 이 조건이 없다면 정확한 상태는 미확인입니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "equipment-tuning",
    schemaType: "TechArticle",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [seasonTwoSource, soulTuningProbabilitySource, officialProbabilityIndex],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/22c86287-aa98-4909-bfdb-9c2d2aff9c3b.png",
      seasonTwoSource.url,
      {
        "zh-hant": {
          alt: "AION2 第 2 賽季官方更新宣傳圖",
          caption: "NC 在 2026 年 1 月 21 日第 2 賽季公告中說明新增調律欄位與裝備繼承系統。",
        },
        en: {
          alt: "Official AION2 Season 2 update artwork",
          caption: "NC's January 21, 2026 Season 2 announcement documents additional tuning slots and the equipment Transfer system.",
        },
        ko: {
          alt: "AION2 시즌2 공식 업데이트 이미지",
          caption: "NC의 2026년 1월 21일 시즌2 안내는 추가 조율 슬롯과 장비 계승 시스템을 설명합니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "soul-imprint" },
      { kind: "content", section: "guides", slug: "arcana" },
      { kind: "content", section: "guides", slug: "wing-enhancement" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 6, {
        eyebrow: "裝備系統",
        title: "AION2 裝備調律：靈魂調律流程、機率邊界與裝備繼承",
        description: "官方資料確認靈魂調律可重抽一個已賦予效果，剩餘候選機率會按當前裝備重算；因此網頁表格不能取代遊戲內的即時機率資訊。",
        intro: "搜尋『裝備調律』時，常會把靈魂刻印、靈魂調律和裝備繼承混成同一件事。第 2 賽季同時調整這些系統，但它們負責的步驟不同；先分清流程，才不會把公開機率誤套到手上那件裝備。",
        sourceNote: "依 NC 2026 年 1 月 21 日第 2 賽季公告與官方靈魂刻印機率頁核對；不提供跨職業通用的最佳選項表。",
        keywords: ["AION2 裝備調律", "AION2 靈魂調律", "AION2 裝備繼承", "AION2 equipment tuning", "아이온2 조율"],
        sections: [
          {
            id: "separate-systems",
            title: "先分清刻印、調律與繼承",
            paragraphs: [
              "NC 的第 2 賽季公告確認新增靈魂刻印選項、額外調律欄位與裝備繼承系統。裝備繼承可把既有裝備的突破及強化階段、靈魂刻印效果移到新裝備；它不是替目前選項重新抽取結果。",
              "官方機率頁則把『靈魂調律』描述為：從已賦予的效果中選一個，重新賦予為另一個效果。要查機率時，必須先確認正在做的是首次刻印、全部初始化，還是只調律其中一個效果。",
            ],
          },
          {
            id: "probability-boundary",
            title: "為什麼網頁機率可能不同於遊戲內機率",
            paragraphs: [
              "調律時，包含被選中重抽的原效果在內，與裝備上既有選項相同的效果不會重複賦予。由於這些既有結果會從候選池排除，剩餘選項的機率會依遊戲內公式重新計算。",
              "NC 明確提醒，網頁公開的基礎機率可能與玩家當前裝備在遊戲內顯示的調律機率不同。執行前應開啟遊戲內機率資訊，確認該件裝備、該職業和當前已持有選項所對應的候選結果。",
            ],
            steps: [
              { title: "確認操作", description: "分辨首次刻印、初始化、單一選項調律或裝備繼承。" },
              { title: "記錄現有選項", description: "候選池會受裝備已具備的效果影響，不能只抄網頁上的一列數字。" },
              { title: "查看遊戲內機率", description: "以當前裝備畫面提供的機率資訊作為這次操作的直接依據。" },
              { title: "操作後再核對", description: "保留版本與結果，避免把舊機率當成後續更新的固定值。" },
            ],
          },
          {
            id: "no-universal-best",
            title: "官方來源不支持通用『最佳詞條』",
            paragraphs: [
              "這些來源解釋系統與機率邊界，沒有給出適用所有職業、內容與版本的選項排名。某個效果是否值得保留，還取決於職業、用途、現有配裝和當前平衡版本。",
              "因此可靠做法是先定義使用情境，再依遊戲內候選機率與目前裝備作決定；沒有版本與配裝上下文的『必洗』清單不應標示成官方結論。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 6, {
        eyebrow: "EQUIPMENT SYSTEMS",
        title: "AION2 equipment tuning: Soul Tuning flow, probability limits, and Transfer",
        description: "Official rules confirm that Soul Tuning rerolls one applied effect and recalculates remaining outcomes for the current item, so a web table cannot replace the in-game probability display.",
        intro: "Searches for equipment tuning often collapse Soul Imprint, Soul Tuning, and equipment Transfer into one action. Season 2 changed these systems together, but each owns a different step. Separate them before applying a published probability to an item.",
        sourceNote: "Checked against NC's January 21, 2026 Season 2 announcement and official Soul Imprint probability page; no universal best-affix list is presented.",
        keywords: ["AION2 equipment tuning", "AION2 Soul Tuning", "AION2 equipment Transfer", "AION2 Soul Imprint probability", "AION2 gear options"],
        sections: [
          {
            id: "separate-systems",
            title: "Separate Imprint, Tuning, and Transfer",
            paragraphs: [
              "NC's Season 2 announcement confirms new Soul Imprint options, additional tuning slots, and the equipment Transfer system. Transfer can move breakthrough and enhancement stages plus Soul Binding effects from existing equipment to new gear; it is not a reroll of the current option result.",
              "The official probability page defines Soul Tuning as selecting one applied effect and granting a different effect in its place. Before reading a probability, identify whether the action is an initial imprint, a full reset, one-effect tuning, or equipment Transfer.",
            ],
          },
          {
            id: "probability-boundary",
            title: "Why the web probability can differ from the in-game value",
            paragraphs: [
              "During tuning, an effect identical to an effect already granted on the item—including the selected effect being replaced—is not granted again. Excluding those existing results changes the remaining pool, which is recalculated through the in-game formula.",
              "NC explicitly says the probability disclosed on the web page can therefore differ from the probability offered for the player's current equipment. Open the in-game probability information before acting so the item, class, and existing effects are reflected.",
            ],
            steps: [
              { title: "Identify the action", description: "Distinguish initial Imprint, reset, one-effect Tuning, and equipment Transfer." },
              { title: "Record existing effects", description: "The current effects alter the eligible pool, so one row from a web table is not enough." },
              { title: "Read the in-game probability", description: "Use the value displayed for this item immediately before the action." },
              { title: "Recheck after the result", description: "Keep the build and outcome attached rather than treating an old value as permanent." },
            ],
          },
          {
            id: "no-universal-best",
            title: "The sources do not establish a universal best affix",
            paragraphs: [
              "The official sources explain systems and probability boundaries. They do not rank one option for every class, activity, and balance build. The value of an effect still depends on class, use case, current equipment, and game version.",
              "Define the use case first, then decide from the in-game candidate probabilities and actual item. A context-free 'must reroll' list should not be presented as an official conclusion.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 6, {
        eyebrow: "장비 시스템",
        title: "AION2 장비 조율: 영혼 조율 절차, 확률 범위, 장비 계승",
        description: "공식 규칙에 따르면 영혼 조율은 부여된 효과 하나를 다시 정하고 현재 장비에 맞춰 남은 결과 확률을 재계산하므로 웹 표가 게임 내 확률 표시를 대신할 수 없습니다.",
        intro: "장비 조율을 찾을 때 영혼 각인, 영혼 조율, 장비 계승을 하나의 동작처럼 섞기 쉽습니다. 시즌2에서 함께 다뤄졌지만 담당 단계는 서로 다르므로 공개 확률을 장비에 적용하기 전에 먼저 구분해야 합니다.",
        sourceNote: "NC의 2026년 1월 21일 시즌2 안내와 공식 영혼 각인 확률 페이지를 대조했으며 모든 직업에 공통인 최적 옵션표는 제시하지 않습니다.",
        keywords: ["아이온2 장비 조율", "아이온2 영혼 조율", "아이온2 장비 계승", "아이온2 영혼 각인 확률", "AION2 equipment tuning"],
        sections: [
          {
            id: "separate-systems",
            title: "각인, 조율, 계승을 먼저 구분",
            paragraphs: [
              "NC의 시즌2 안내는 신규 영혼 각인 옵션, 추가 조율 슬롯, 장비 계승 시스템 도입을 확인합니다. 장비 계승은 기존 장비의 돌파 및 강화 단계와 영혼 각인 효과를 새 장비로 옮기는 시스템이며 현재 옵션 결과를 다시 뽑는 동작이 아닙니다.",
              "공식 확률 페이지는 영혼 조율을 이미 부여된 효과 중 하나를 선택해 다른 효과로 다시 부여하는 절차로 설명합니다. 확률을 보기 전에 최초 각인, 전체 초기화, 한 효과 조율, 장비 계승 중 어떤 작업인지 확인해야 합니다.",
            ],
          },
          {
            id: "probability-boundary",
            title: "웹 확률과 게임 내 확률이 달라질 수 있는 이유",
            paragraphs: [
              "조율 대상 효과를 포함해 장비에 이미 부여된 효과와 같은 효과는 다시 중복 부여되지 않습니다. 기존 결과가 후보에서 빠지므로 남은 옵션의 확률은 게임 내 공식에 따라 다시 계산됩니다.",
              "NC는 이 때문에 웹 페이지의 공개 확률과 현재 장비에 적용되는 게임 내 확률이 다를 수 있다고 명시합니다. 실행 전 게임 내 확률정보를 열어 해당 장비, 직업, 기존 옵션이 반영된 후보를 확인해야 합니다.",
            ],
            steps: [
              { title: "작업 확인", description: "최초 각인, 초기화, 단일 효과 조율, 장비 계승을 구분합니다." },
              { title: "현재 효과 기록", description: "기존 효과가 후보군에 영향을 주므로 웹 표의 한 줄만 옮기지 않습니다." },
              { title: "게임 내 확률 확인", description: "작업 직전에 해당 장비 화면이 제공하는 확률정보를 기준으로 합니다." },
              { title: "결과 재확인", description: "버전과 결과를 함께 남겨 예전 확률을 고정값으로 쓰지 않습니다." },
            ],
          },
          {
            id: "no-universal-best",
            title: "공식 출처는 공통 '최고 옵션'을 정하지 않습니다",
            paragraphs: [
              "공식 자료는 시스템과 확률의 범위를 설명하지만 모든 직업, 콘텐츠, 밸런스 버전에 공통인 옵션 순위를 제공하지 않습니다. 효과의 가치는 직업, 용도, 현재 장비, 게임 버전에 따라 달라집니다.",
              "먼저 사용 목적을 정하고 게임 내 후보 확률과 실제 장비를 바탕으로 선택해야 합니다. 버전과 세팅 맥락이 없는 '무조건 조율' 목록을 공식 결론처럼 표시해서는 안 됩니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "elyos-vs-asmodians",
    schemaType: "Article",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [factionRevealSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/51293bba-533a-4e39-b2d6-f5b334b7a23c.png",
      factionRevealSource.url,
      {
        "zh-hant": {
          alt: "AION2 核心內容官方公開宣傳圖",
          caption: "NC 在 2025 年 5 月 30 日首次公開天族、魔族獨立起始區域與 RvR 結構。",
        },
        en: {
          alt: "Official artwork for the AION2 core-content reveal",
          caption: "NC's May 30, 2025 reveal established separate Elyos and Asmodian starting regions and the RvR structure.",
        },
        ko: {
          alt: "AION2 핵심 콘텐츠 공식 공개 이미지",
          caption: "NC는 2025년 5월 30일 천족과 마족의 독립된 시작 지역 및 RvR 구조를 처음 공개했습니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "news", slug: "global-server-regions" },
      { kind: "content", section: "guides", slug: "spacetime-rift" },
      { kind: "content", section: "guides", slug: "abyss-status" },
      { kind: "tool", toolSlug: "map" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "陣營選擇",
        title: "AION2 天族與魔族怎麼選：獨立起始區、伺服器分離與 RvR",
        description: "NC 已確認天族與魔族從各自獨立區域開始，並以分離伺服器改善陣營平衡，故事之後銜接大型 RvR；官方沒有公布固定人口或強弱結論。",
        intro: "天族與魔族的選擇會改變起始舞台和陣營脈絡，但官方核心內容公告沒有把任何一方定義為較強、較多人或較適合某職業。這篇把已確認的世界結構與尚未確認的營運數據分開。",
        sourceNote: "依 NC 2025 年 5 月 30 日核心內容公告核對；不引用非官方人口統計、陣營排名或原作數值。",
        keywords: ["AION2 天族", "AION2 魔族", "AION2 天族 魔族", "AION2 陣營", "Elyos vs Asmodians"],
        sections: [
          {
            id: "confirmed-structure",
            title: "官方已確認的陣營結構",
            paragraphs: [
              "NC 表示 AION2 的故事位於原作 200 年後，玩家選擇天族或魔族，並從各陣營彼此獨立的區域開始遊戲。隨敘事推進，遊戲體驗會自然銜接以天族與魔族為核心的大型 RvR。",
              "同一份公告把天族、魔族伺服器分離列為改善陣營不平衡的設計。這是官方公布的服務結構方向，但不能反推出任一區域未來的具體伺服器名稱、人口比例或角色轉移政策。",
            ],
          },
          {
            id: "not-a-power-ranking",
            title: "公告沒有證明哪一方更強或更多人",
            paragraphs: [
              "官方來源沒有提供天族與魔族的即時人口、勝率、職業加成、經濟價格或連線延遲，因此無法從這份公告得出『人多必選』『某陣營傷害較高』或永久優勢等結論。",
              "原作的地圖、種族印象與營運規則也不應直接當成 AION2 當前版本的證據。全球版另有營運地區安排，在官方公布命名伺服器與創角政策前，要把這些欄位保留為未確認。",
            ],
          },
          {
            id: "choice-framework",
            title: "用可核對條件做選擇",
            paragraphs: [
              "優先確認想體驗的起始區域與故事氛圍，再和固定隊友選擇同一服務範圍。若目標是 RvR，還要在創角前閱讀當期官方伺服器、配對與限制公告。",
            ],
            bullets: [
              "視覺與故事偏好：選擇想長期遊覽的陣營起始區。",
              "社交條件：先和朋友確認地區、伺服器及陣營安排。",
              "營運條件：只用有日期的官方公告判斷創角與配對規則。",
              "未知資料：不以社群截圖代替官方人口與平衡數據。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "FACTION CHOICE",
        title: "Elyos or Asmodians in AION2: separate starts, servers, and RvR",
        description: "NC confirms separate Elyos and Asmodian starting regions, faction-separated servers intended to improve balance, and a path into large-scale RvR; it does not publish a permanent population or power verdict.",
        intro: "Choosing Elyos or Asmodians changes the starting setting and faction context. The official core-content reveal does not label either side stronger, more populated, or better for a class. This guide separates confirmed world structure from unannounced operational data.",
        sourceNote: "Checked against NC's May 30, 2025 core-content announcement; no unofficial population table, faction ranking, or original-game stat is used.",
        keywords: ["AION2 Elyos", "AION2 Asmodians", "Elyos vs Asmodians", "AION2 factions", "AION2 faction servers"],
        sections: [
          {
            id: "confirmed-structure",
            title: "The faction structure confirmed by NC",
            paragraphs: [
              "NC places AION2 200 years after the original game. Players choose Elyos or Asmodians and begin in entirely separate regions for their faction. As the narrative advances, the experience develops into large-scale RvR centered on the two factions.",
              "The same reveal lists separate Elyos and Asmodian servers as a design intended to improve faction balance. That establishes a service-structure direction, not named global servers, a measured faction ratio, or a character-transfer policy.",
            ],
          },
          {
            id: "not-a-power-ranking",
            title: "The announcement is not a power or population ranking",
            paragraphs: [
              "The source provides no live population, win rate, class modifier, economy price, or latency data for the factions. It cannot support claims that the more populated side is mandatory, that one faction deals more damage, or that either has a permanent advantage.",
              "Maps, faction expectations, and service rules from the original AION are not evidence for the current AION2 build. The global release also has its own operating regions, so named servers and character-creation policy remain unknown until NC publishes them.",
            ],
          },
          {
            id: "choice-framework",
            title: "Choose with conditions you can verify",
            paragraphs: [
              "Start with the region and story atmosphere you want to experience, then coordinate the same service scope with regular teammates. If RvR is the objective, read the current official server, matching, and restriction notice before character creation.",
            ],
            bullets: [
              "World preference: choose the faction starting region you want to explore long term.",
              "Social requirement: align region, server, and faction with friends first.",
              "Service rule: use dated official notices for creation and matching policy.",
              "Unknown data: do not replace official population or balance data with a community screenshot.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "진영 선택",
        title: "AION2 천족과 마족 선택: 독립 시작 지역, 서버 분리, RvR",
        description: "NC는 천족과 마족의 독립된 시작 지역, 진영 불균형을 보완하기 위한 서버 분리, 대규모 RvR로 이어지는 구조를 확인했지만 고정 인구나 우열을 발표하지 않았습니다.",
        intro: "천족과 마족 선택은 시작 무대와 진영 맥락을 바꾸지만 공식 핵심 콘텐츠 발표는 어느 쪽도 더 강하거나 인구가 많거나 특정 직업에 유리하다고 정의하지 않습니다. 확인된 월드 구조와 미공개 운영 자료를 구분해 봅니다.",
        sourceNote: "NC의 2025년 5월 30일 핵심 콘텐츠 발표를 대조했으며 비공식 인구 통계, 진영 순위, 원작 수치를 사용하지 않습니다.",
        keywords: ["아이온2 천족", "아이온2 마족", "아이온2 천족 마족", "아이온2 진영", "Elyos vs Asmodians"],
        sections: [
          {
            id: "confirmed-structure",
            title: "NC가 확인한 진영 구조",
            paragraphs: [
              "NC는 AION2의 배경을 원작 200년 후로 설명합니다. 이용자는 천족 또는 마족을 선택해 각 진영의 완전히 독립된 지역에서 시작하고, 이야기가 진행되면서 두 진영을 중심으로 한 대규모 RvR 경험으로 이어집니다.",
              "같은 발표는 종족 불균형을 보완하기 위한 천족과 마족 서버 분리를 발전 요소로 제시했습니다. 이는 서비스 구조의 방향을 확인할 뿐 글로벌 서버 이름, 측정 인구 비율, 캐릭터 이전 정책을 확정하지 않습니다.",
            ],
          },
          {
            id: "not-a-power-ranking",
            title: "발표는 진영 우열이나 인구 순위가 아닙니다",
            paragraphs: [
              "공식 출처에는 진영별 실시간 인구, 승률, 직업 보정, 경제 가격, 지연시간 자료가 없습니다. 따라서 '인구가 많은 쪽이 필수', '특정 진영의 피해가 더 높다', 영구 우위 같은 결론을 낼 수 없습니다.",
              "원작 AION의 지도, 종족 인상, 운영 규칙도 현재 AION2 빌드의 근거로 그대로 쓸 수 없습니다. 글로벌 버전은 별도 운영 지역을 두므로 NC가 공개하기 전까지 서버 이름과 캐릭터 생성 정책은 미확인입니다.",
            ],
          },
          {
            id: "choice-framework",
            title: "확인 가능한 조건으로 선택",
            paragraphs: [
              "먼저 오래 경험하고 싶은 시작 지역과 이야기 분위기를 고르고, 고정 파티원과 같은 서비스 범위를 맞춥니다. RvR이 목적이라면 캐릭터를 만들기 전에 당시의 공식 서버, 매칭, 제한 안내를 확인해야 합니다.",
            ],
            bullets: [
              "월드 취향: 장기간 탐험하고 싶은 진영 시작 지역을 고릅니다.",
              "친구 조건: 지역, 서버, 진영을 먼저 맞춥니다.",
              "운영 조건: 캐릭터 생성과 매칭은 날짜가 있는 공식 공지를 기준으로 합니다.",
              "미확인 자료: 커뮤니티 스크린샷을 공식 인구·밸런스 자료처럼 쓰지 않습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "abyss-status",
    schemaType: "Article",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [seasonTwoSource, chaoticAbyssSource, chapterOneSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/ead54e86-a7fe-4ea8-9742-e6c8c244200d.jpg",
      chapterOneSource.url,
      {
        "zh-hant": {
          alt: "AION2 Chapter 1 沙與雪之地官方更新宣傳圖",
          caption: "2026 年 7 月 1 日 Chapter 1 更新再次改動 PvP，加入混沌上層 Reshanta 與戰場佔領模式。",
        },
        en: {
          alt: "Official AION2 Chapter 1 Lands of Sand and Snow artwork",
          caption: "The July 1, 2026 Chapter 1 update changed the PvP surface again with Chaotic Upper Reshanta and a Battlefield capture mode.",
        },
        ko: {
          alt: "AION2 Chapter 1 모래와 서리의 땅 공식 이미지",
          caption: "2026년 7월 1일 Chapter 1 업데이트는 혼돈의 에레슈타인 표층과 전장 점령전을 추가해 PvP 구성을 다시 바꿨습니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "spacetime-rift" },
      { kind: "content", section: "guides", slug: "elyos-vs-asmodians" },
      { kind: "content", section: "news", slug: "global-server-regions" },
      { kind: "content", section: "classes", slug: "class-planning-framework" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 6, {
        eyebrow: "深淵現況",
        title: "AION2 深淵現況：從第 2 賽季、混沌深淵到 Chapter 1",
        description: "2026 年官方公告顯示深淵 PvP 已多次改版：第 2 賽季調整區層與攻城平衡，3 月加入跨種族的東西陣營玩法，7 月再加入受限屬性的混沌上層區域。",
        intro: "『深淵現在怎麼玩』不能只靠一張舊攻略回答。NC 在 2026 年 1 月、3 月與 7 月公布了不同結構；這篇用時間線分清模式，但不把可能繼續變動的 AP 數量、開放時間或排名門檻寫成固定規則。",
        sourceNote: "依 NC 2026 年 1 月 21 日、3 月 25 日與 7 月 1 日官方公告核對；即時排程、獎勵與伺服器配對仍以遊戲內公告為準。",
        keywords: ["AION2 深淵", "AION2 混沌深淵", "AION2 Reshanta", "AION2 Abyss", "아이온2 어비스"],
        sections: [
          {
            id: "version-timeline",
            title: "三個官方版本節點",
            paragraphs: [
              "2026 年 1 月 21 日第 2 賽季啟用中層 Reshanta，並調整下層、中層的守護神將配置。Artifact Siege 也加入面向弱勢種族陣營的增益，目標是緩和戰力差距。",
              "3 月 25 日，NC 推出『混沌深淵』：玩家不再按天族、魔族分隊，而是按伺服器被分為西部與東部陣營作戰。同一公告特別說明，時空裂縫仍維持敵對種族配對。",
              "7 月 1 日 Chapter 1 又加入混沌上層 Reshanta，該區限制物品等級與戰力，且不出現首領或 Artifact；同次更新另加入以佔領區域取得分數、各隊同條件開始的 Battlefield: Siege。",
            ],
          },
          {
            id: "modes-are-not-interchangeable",
            title: "深淵、混沌深淵與時空裂縫不是同一個配對規則",
            paragraphs: [
              "第 2 賽季的 Reshanta 與 Artifact Siege 仍以種族陣營平衡為核心；混沌深淵則改用伺服器層級的東、西陣營，不看原本種族；時空裂縫仍是天族對魔族。把其中一個模式的隊伍規則套到另一個模式，會直接造成錯誤。",
              "Chapter 1 的混沌上層 Reshanta 又增加屬性限制與不同場景條件。看到攻略時，至少要核對模式名稱、公告日期、伺服器版本及是否為一般或混沌區域。",
            ],
          },
          {
            id: "live-status-boundary",
            title: "哪些即時數值不在本頁硬編碼",
            paragraphs: [
              "這三份公告證明規則會隨賽季和大型更新改動，因此本頁不固定列出 AP 獲得量或損失量、每天開放時段、即時排名門檻、當前伺服器配對、首領刷新時間或獎勵數量。舊公告中的數字也不等於今天仍有效。",
              "進場前應查看遊戲內模式說明與最新官方更新公告；若兩者和舊攻略不同，以當前遊戲顯示與較新的官方公告為準，並保留日期供之後複查。",
            ],
            bullets: [
              "先確認模式全名與一般／混沌區域。",
              "再確認當前伺服器配對和陣營分配方式。",
              "獎勵、AP 與排名只採用當期遊戲內數值。",
              "攻略必須附版本日期，不能只寫『現版本』。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 6, {
        eyebrow: "ABYSS STATUS",
        title: "AION2 Abyss status: Season 2, Chaotic Abyss, and Chapter 1",
        description: "Official 2026 releases show repeated Abyss PvP revisions: Season 2 changed layers and siege balance, March added race-independent East and West forces, and July added a stat-capped Chaotic Upper zone.",
        intro: "An old guide cannot answer how the Abyss works now. NC published different structures in January, March, and July 2026. This timeline separates the modes without freezing changeable AP values, schedules, or ranking thresholds into permanent rules.",
        sourceNote: "Checked against NC's January 21, March 25, and July 1, 2026 announcements; live schedules, rewards, and server matching remain subject to the current in-game notice.",
        keywords: ["AION2 Abyss", "AION2 Chaotic Abyss", "AION2 Reshanta", "AION2 Abyss status", "AION2 PvP"],
        sections: [
          {
            id: "version-timeline",
            title: "Three official version checkpoints",
            paragraphs: [
              "On January 21, Season 2 activated Middle Reshanta and changed Guardian Lord arrangements across Lower and Middle Abyss. Artifact Siege also gained faction-wide buffs intended to help a disadvantaged race faction and reduce the power gap.",
              "On March 25, NC launched Chaotic Abyss. Players are assigned to West and East forces at server level regardless of Elyos or Asmodian alignment. The same release explicitly says Spacetime Rift keeps its opposing-race matchmaking.",
              "On July 1, Chapter 1 added Chaotic Upper Reshanta, where item level and combat power are capped and bosses and Artifacts do not appear. The update separately added Battlefield: Siege, a capture-and-score mode in which teams start under the same conditions.",
            ],
          },
          {
            id: "modes-are-not-interchangeable",
            title: "Abyss, Chaotic Abyss, and Spacetime Rift do not share one team rule",
            paragraphs: [
              "Season 2 Reshanta and Artifact Siege still discuss balance between race factions. Chaotic Abyss instead creates server-level East and West forces without the original race division. Spacetime Rift remains Elyos versus Asmodians. Applying one mode's team rule to another produces a direct factual error.",
              "Chapter 1's Chaotic Upper Reshanta adds its own stat limits and encounter conditions. At minimum, check the mode name, announcement date, regional build, and whether the guide describes a standard or Chaotic zone.",
            ],
          },
          {
            id: "live-status-boundary",
            title: "Live values intentionally not hard-coded here",
            paragraphs: [
              "These releases demonstrate that rules move with seasons and major updates. This page therefore does not freeze AP gain or loss, daily opening windows, current ranking cutoffs, server match lists, boss timers, or reward quantities. A number in an older release is not proof of today's value.",
              "Before entering, read the in-game mode description and latest official update notice. If they differ from an older guide, use the current game display and newer official notice, retaining the date for the next review.",
            ],
            bullets: [
              "Confirm the full mode name and standard or Chaotic zone first.",
              "Check the current server match and faction-assignment rule.",
              "Use only current in-game values for rewards, AP, and rankings.",
              "Require a build date on a guide instead of the phrase 'current patch.'",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 6, {
        eyebrow: "어비스 현황",
        title: "AION2 어비스 현황: 시즌2, 혼돈의 어비스, Chapter 1 변화",
        description: "2026년 공식 안내에 따르면 어비스 PvP는 여러 차례 개편됐습니다. 시즌2는 구역과 점령전 균형을 조정했고 3월에는 종족과 무관한 동서 진영, 7월에는 능력치가 제한된 혼돈 표층이 추가됐습니다.",
        intro: "지금의 어비스를 오래된 공략 하나로 설명할 수 없습니다. NC는 2026년 1월, 3월, 7월에 서로 다른 구조를 발표했습니다. 이 글은 모드를 시간순으로 구분하되 바뀔 수 있는 AP 수치, 운영 시간, 랭킹 기준을 고정 규칙으로 쓰지 않습니다.",
        sourceNote: "NC의 2026년 1월 21일, 3월 25일, 7월 1일 공식 발표를 대조했으며 실시간 일정, 보상, 서버 매칭은 현재 게임 내 공지를 기준으로 합니다.",
        keywords: ["아이온2 어비스", "아이온2 혼돈의 어비스", "아이온2 에레슈타인", "AION2 Abyss", "아이온2 PvP"],
        sections: [
          {
            id: "version-timeline",
            title: "세 번의 공식 버전 변화",
            paragraphs: [
              "1월 21일 시즌2는 어비스 중층을 활성화하고 하층과 중층의 수호신장 구성을 바꿨습니다. 아티팩트 점령전에는 열세 종족 진영의 전력 격차를 줄이기 위한 진영 버프도 적용됐습니다.",
              "3월 25일 NC는 혼돈의 어비스를 출시했습니다. 천족과 마족 구분 없이 서버 단위로 서부와 동부 진영을 나눠 전투합니다. 같은 발표는 시공의 균열이 기존의 상대 종족 매칭을 유지한다고 명시합니다.",
              "7월 1일 Chapter 1은 아이템 레벨과 전투력이 제한되고 보스와 아티팩트가 등장하지 않는 혼돈의 에레슈타인 표층을 추가했습니다. 별도 콘텐츠인 전장: 점령전은 구역을 점령해 점수를 얻고 모든 팀이 같은 조건에서 시작합니다.",
            ],
          },
          {
            id: "modes-are-not-interchangeable",
            title: "어비스, 혼돈의 어비스, 시공의 균열은 팀 규칙이 다릅니다",
            paragraphs: [
              "시즌2의 에레슈타인과 아티팩트 점령전은 종족 진영 간 균형을 다룹니다. 혼돈의 어비스는 원래 종족과 무관하게 서버 단위 동서 진영을 만들고, 시공의 균열은 천족 대 마족 매칭을 유지합니다. 한 모드의 진영 규칙을 다른 모드에 적용하면 사실 오류가 됩니다.",
              "Chapter 1의 혼돈 표층은 별도의 능력치 제한과 등장 조건까지 둡니다. 공략을 볼 때 모드 전체 이름, 발표 날짜, 서비스 빌드, 일반 또는 혼돈 구역 여부를 최소한 확인해야 합니다.",
            ],
          },
          {
            id: "live-status-boundary",
            title: "이 페이지에 실시간 수치를 고정하지 않는 이유",
            paragraphs: [
              "세 발표는 시즌과 대형 업데이트에 따라 규칙이 변한다는 사실을 보여 줍니다. 따라서 AP 획득·손실량, 일일 입장 시간, 현재 랭킹 기준, 서버 매칭 목록, 보스 시간, 보상 수량을 이 페이지에 고정하지 않습니다. 예전 공지의 숫자는 오늘도 같다는 증거가 아닙니다.",
              "입장 전 게임 내 모드 설명과 최신 공식 업데이트 공지를 확인합니다. 오래된 공략과 다르면 현재 게임 표시와 더 최근 공식 공지를 우선하고 날짜를 남겨 다음 검토가 가능하게 합니다.",
            ],
            bullets: [
              "모드 전체 이름과 일반·혼돈 구역을 먼저 확인합니다.",
              "현재 서버 매칭과 진영 배정 방식을 확인합니다.",
              "보상, AP, 랭킹은 현재 게임 내 수치만 사용합니다.",
              "'현 버전' 대신 공략에 빌드 날짜를 표시합니다.",
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
