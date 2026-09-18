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
    retrievedAt: "2026-07-15",
    verifiedAt: "2026-07-15",
  };
}

function officialHero(
  src: string,
  width: number,
  height: number,
  sourceUrl: string,
  translations: ContentHeroImage["translations"],
): ContentHeroImage {
  return {
    src,
    width,
    height,
    credit: "NC Corporation",
    sourceUrl,
    rights: "linked-official-media",
    presentation: src.includes("/guidebook/files/") ? "contain" : "cover",
    translations,
  };
}

const aetherExtractionGuideSource = officialSource(
  "nc-guidebook-aether-extraction",
  "AION2 official gathering and extraction guide",
  "https://aion2.plaync.com/ko-kr/guidebook/view?title=%EC%A0%95%EA%B8%B0%EC%B6%94%EC%B6%9C",
);

const gatheringLevelSource = officialSource(
  "nc-gathering-level-and-anti-bot-2026-01-28",
  "AION 2 anti-bot update confirming the level 45 gathering requirement",
  "https://about.ncsoft.com/en/news/article/aion2_update_260128",
  "2026-01-28",
);

const craftingGuideSource = officialSource(
  "nc-guidebook-crafting-management",
  "AION2 official Crafting Management and Transfer Crafting guide",
  "https://aion2.plaync.com/ko-kr/guidebook/view?title=%EC%A0%9C%EC%9E%91%20%EA%B4%80%EB%A6%AC",
);

const transferCraftingSource = officialSource(
  "nc-transfer-crafting-update-2026-05-27",
  "AION 2 update introducing new equipment available through Transfer Crafting",
  "https://about.ncsoft.com/en/news/article/aion2_update_260527",
  "2026-05-27",
);

const fromisCollaborationSource = officialSource(
  "nc-fromis9-collaboration-2026-06-26",
  "AION 2 launches the fromis_9 collaboration",
  "https://about.ncsoft.com/en/news/article/aion2_update_260527-copy",
  "2026-06-26",
);

const summerFestaSource = officialSource(
  "nc-summer-festa-fromis9-2026-06-17",
  "AION 2 SUMMER FESTA collaboration and Chapter 1 announcement",
  "https://about.ncsoft.com/en/news/article/aion2_update_20260617",
  "2026-06-17",
);

export const verifiedKeywordExpansionContentEntries = [
  {
    section: "guides",
    slug: "aether-extraction",
    schemaType: "Article",
    publishedAt: "2026-07-15",
    updatedAt: "2026-07-15",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [aetherExtractionGuideSource, gatheringLevelSource],
    heroImage: officialHero(
      "https://fizz-download.playnccdn.com/download/v2/buckets/guidebook/files/19a90ca97d3-4851ce8f-090e-4369-b534-f030f6dd22d1",
      520,
      308,
      aetherExtractionGuideSource.url,
      {
        "zh-hant": {
          alt: "AION2 官方精氣提取指南縮圖",
          caption: "NC 官方精氣提取指南圖片；採集路線與節點狀態仍需在當前伺服器核對。",
        },
        en: {
          alt: "Official AION2 gathering and extraction guide thumbnail",
          caption: "Official NC extraction-guide image; routes and node state still require a current-server check.",
        },
        ko: {
          alt: "AION2 공식 정기추출 가이드 이미지",
          caption: "NC 공식 정기추출 가이드 이미지이며 채집 경로와 채집물 상태는 현재 서버에서 확인해야 합니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "crafting-and-transfer-crafting" },
      { kind: "content", section: "guides", slug: "interactive-map-quickstart" },
      { kind: "content", section: "guides", slug: "scam-check" },
      { kind: "content", section: "guides", slug: "kinah-bound" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 6, {
        eyebrow: "生活系統｜採集",
        title: "AION2 採集／精氣提取：45 級解鎖、成功失敗計量與技能點",
        description: "依官方精氣提取指南整理 45 級門檻、成功／失敗計量、採集物耐久、技能點和專業升級，不提供巨集或虛構路線。",
        intro: "韓國官方指南將這套採集系統稱為 정기추출。本文保留來源名稱並說明可核對的操作規則；即時節點、材料價格與最佳路線會隨伺服器和版本改變。",
        sourceNote: "NC 官方精氣提取指南與 2026 年 1 月 28 日反自動化公告交叉核對。",
        keywords: ["AION2 採集", "AION2 精氣提取", "아이온2 채집", "정기추출", "AION2 製作材料"],
        sections: [
          {
            id: "unlock-and-attempt",
            title: "45 級解鎖與一次採集嘗試",
            paragraphs: [
              "官方指南說明角色從 45 級起可使用精氣提取；NC 的反自動化公告也確認採集最低等級已提高到 45。與採集物互動後會同時累積成功與失敗計量，成功計量先達 100% 才算取得採集物。",
              "每次嘗試都會消耗採集物耐久，不論成功或失敗；耐久耗盡後節點消失。這表示畫面上的剩餘嘗試次數與兩條計量都會影響當次結果。",
            ],
            bullets: [
              "角色門檻：45 級。",
              "成功條件：成功計量先達 100%。",
              "失敗條件：失敗計量先達 100%。",
              "節點耐久：每次嘗試都會減少。",
            ],
          },
          {
            id: "skills",
            title: "提取等級、技能點與專業方向",
            paragraphs: [
              "重複進行精氣提取會提升提取等級並取得專用技能點。官方指南表示，技能可提高採集速度與成功率，學會後以被動方式持續生效；已分配的技能也可重置並返還技能點。",
              "當『精氣提取入門』達到 Lv.50，可透過升級任務轉為專業階段。這裡的 Lv.50 是提取系統進度，不應誤寫成另一個角色等級門檻。專業技能可針對特定採集物類型。",
            ],
          },
          {
            id: "route-boundary",
            title: "官方規則不等於永久材料路線",
            paragraphs: [
              "官方來源支持採集機制，但沒有提供能跨伺服器、跨補丁永久使用的材料價格或最佳巡迴路線。若日後加入地圖路線，應同時記錄區域、節點、版本和最後實測時間。",
              "NC 明確把自動採集巨集列入反自動化措施背景。本頁不提供巨集、繞過限制或無人值守採集方法。",
            ],
            bullets: [
              "用遊戲內節點狀態驗證地圖資料。",
              "材料價值與重生時間分開記錄。",
              "不把第三方巨集標示為安全工具。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 6, {
        eyebrow: "LIFE SYSTEM｜GATHERING",
        title: "AION2 gathering (정기추출): level 45, success gauges, and skill points",
        description: "An official-source guide to the level 45 gate, success and failure gauges, node durability, skill points, and specialization without macros or invented routes.",
        intro: "The Korean official guide calls this gathering system 정기추출. This page retains the source label and explains verifiable rules; live nodes, material prices, and best routes change by server and build.",
        sourceNote: "Cross-checked against NC's official extraction guide and January 28, 2026 anti-bot release.",
        keywords: ["AION 2 gathering", "AION2 extraction", "정기추출", "AION2 crafting materials", "AION2 gathering level"],
        sections: [
          {
            id: "unlock-and-attempt",
            title: "Level 45 access and one extraction attempt",
            paragraphs: [
              "The official guide says characters can use extraction from level 45. NC's anti-bot release independently confirms that the minimum gathering level was raised to 45. Interacting with a node fills success and failure gauges, and the success gauge must reach 100% first to obtain the material.",
              "Every attempt reduces node durability whether it succeeds or fails. The node disappears when durability is exhausted, so remaining attempts and both gauges matter to the current interaction.",
            ],
            bullets: [
              "Character requirement: level 45.",
              "Success: the success gauge reaches 100% first.",
              "Failure: the failure gauge reaches 100% first.",
              "Node durability: decreases on every attempt.",
            ],
          },
          {
            id: "skills",
            title: "Extraction levels, skill points, and specialization",
            paragraphs: [
              "Repeated extraction raises the extraction level and awards dedicated skill points. The guide says learned skills improve speed and success and remain active as passives. Allocated skills can be reset for a full skill-point return.",
              "When the Intro extraction track reaches Lv.50, a promotion quest can unlock the specialist stage. That Lv.50 belongs to extraction progression and is not another character-level requirement. Specialist skills can focus on selected node types.",
            ],
          },
          {
            id: "route-boundary",
            title: "Official mechanics are not a permanent material route",
            paragraphs: [
              "The sources establish gathering mechanics but do not publish a best route or material price that remains valid across servers and patches. A future map route needs region, node, build, and last-tested time attached.",
              "NC explicitly discussed automated gathering macros when describing its countermeasures. This page does not provide macros, restriction bypasses, or unattended gathering instructions.",
            ],
            bullets: [
              "Verify map data against the live node state.",
              "Track material value separately from respawn observations.",
              "Do not label a third-party macro as safe.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 6, {
        eyebrow: "생활 시스템｜채집",
        title: "AION2 정기추출: 45레벨, 성공·실패 게이지, 스킬 포인트",
        description: "공식 정기추출 가이드를 바탕으로 45레벨 조건, 성공·실패 게이지, 채집물 내구도, 스킬 포인트와 전문 승급을 정리하며 매크로나 임의 경로는 제공하지 않습니다.",
        intro: "정기추출은 지역의 채집물을 수확하는 공식 생활 시스템입니다. 실시간 채집물, 재료 가격과 최적 경로는 서버와 버전에 따라 달라지므로 확인 가능한 조작 규칙과 분리합니다.",
        sourceNote: "NC 공식 정기추출 가이드와 2026년 1월 28일 자동화 대응 발표를 교차 확인했습니다.",
        keywords: ["아이온2 채집", "아이온2 정기추출", "정기추출 스킬", "아이온2 제작 재료", "정기추출 45레벨"],
        sections: [
          {
            id: "unlock-and-attempt",
            title: "45레벨 이용 조건과 한 번의 추출 시도",
            paragraphs: [
              "공식 가이드는 캐릭터 45레벨부터 정기추출을 이용할 수 있다고 설명합니다. NC의 자동화 대응 발표도 채집 최소 레벨이 45로 상향됐음을 확인합니다. 채집물과 상호작용하면 성공과 실패 게이지가 오르며 성공 게이지가 먼저 100%가 되어야 재료를 얻습니다.",
              "성공 여부와 관계없이 시도할 때마다 채집물 내구도가 감소하고 모두 소모되면 채집물이 사라집니다. 따라서 남은 시도 횟수와 두 게이지를 함께 봐야 합니다.",
            ],
            bullets: [
              "캐릭터 조건: 45레벨.",
              "성공: 성공 게이지가 먼저 100% 도달.",
              "실패: 실패 게이지가 먼저 100% 도달.",
              "채집물 내구도: 시도할 때마다 감소.",
            ],
          },
          {
            id: "skills",
            title: "추출 레벨, 스킬 포인트와 전문화",
            paragraphs: [
              "반복 정기추출로 추출 레벨을 높이면 전용 스킬 포인트를 얻습니다. 가이드에 따르면 스킬은 속도와 성공률을 높이고 습득 후 패시브로 계속 적용됩니다. 배분한 스킬은 초기화해 포인트를 모두 돌려받을 수 있습니다.",
              "'정기 추출 입문'이 Lv.50에 도달하면 승급 퀘스트로 전문 단계에 진입할 수 있습니다. 이 Lv.50은 추출 진행도이며 별도의 캐릭터 레벨 조건이 아닙니다. 전문 스킬은 특정 채집물 유형에 집중할 수 있습니다.",
            ],
          },
          {
            id: "route-boundary",
            title: "공식 규칙은 영구 재료 경로가 아닙니다",
            paragraphs: [
              "공식 출처는 채집 구조를 확인하지만 서버와 패치를 넘어 유지되는 재료 가격이나 최적 순회 경로를 제공하지 않습니다. 향후 지도 경로에는 지역, 채집물, 버전과 마지막 실측 시각이 필요합니다.",
              "NC는 자동 채집 매크로 제한을 강화 배경으로 명시했습니다. 이 페이지는 매크로, 제한 우회나 무인 채집 방법을 제공하지 않습니다.",
            ],
            bullets: [
              "게임 내 채집물 상태와 지도 데이터를 대조합니다.",
              "재료 가치와 재생 관찰을 분리해 기록합니다.",
              "서드파티 매크로를 안전 도구로 표시하지 않습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "crafting-and-transfer-crafting",
    schemaType: "Article",
    publishedAt: "2026-07-15",
    updatedAt: "2026-07-15",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [craftingGuideSource, transferCraftingSource],
    heroImage: officialHero(
      "https://fizz-download.playnccdn.com/download/v2/buckets/guidebook/files/19a90cbfaa1-d033e052-12c2-4721-829e-a22e841162b3",
      520,
      308,
      craftingGuideSource.url,
      {
        "zh-hant": {
          alt: "AION2 官方製作管理指南縮圖",
          caption: "NC 官方製作管理圖片；配方材料、成功率與市場價格以當前遊戲資料為準。",
        },
        en: {
          alt: "Official AION2 Crafting Management guide thumbnail",
          caption: "Official NC crafting image; recipe materials, rates, and market prices remain live-game data.",
        },
        ko: {
          alt: "AION2 공식 제작 관리 가이드 이미지",
          caption: "NC 공식 제작 관리 이미지이며 도안 재료, 확률과 시세는 현재 게임 데이터를 기준으로 합니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "aether-extraction" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
      { kind: "content", section: "guides", slug: "soul-imprint" },
      { kind: "content", section: "guides", slug: "godstone-imprint" },
      { kind: "tool", toolSlug: "material-calculator" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 7, {
        eyebrow: "生活系統｜製作",
        title: "AION2 製作與繼承製作：熟練度、Combo 與繼承規則",
        description: "依官方製作管理指南整理五類製作、熟練度、Combo、刻印狀態與繼承製作會保留或重置的欄位。",
        intro: "製作頁最容易把配方、市價和成功率混成永久答案。本頁只整理官方指南可證明的系統規則，材料數量、即時機率和價格仍回到當前遊戲畫面核對。",
        sourceNote: "NC 官方製作管理指南與 2026 年 5 月 27 日繼承製作裝備公告交叉核對。",
        keywords: ["AION2 製作", "AION2 繼承製作", "아이온2 제작", "AION2 製作熟練度", "AION2 Combo 製作"],
        sections: [
          {
            id: "crafting-basics",
            title: "五類製作與熟練度",
            paragraphs: [
              "官方指南將製作分為鍛造、護甲、工藝、鍊金與料理，可製作裝備、材料、消耗品和食物。開始製作前需要對應材料與製作熟練度。",
              "成功或失敗都會提供製作經驗，用來提升熟練度；熟練度越高，成功率越高。已開始的製作不能中途取消，因此應在執行前確認材料與數量。",
            ],
          },
          {
            id: "combo-and-imprint",
            title: "Combo 與完成品的刻印狀態",
            paragraphs: [
              "部分裝備製作可能觸發 Combo，成功時取得高一個等級的物品。官方指南沒有把這個機率寫成所有配方通用值，應查看所選配方的當前畫面。",
              "製作完成的裝備為未刻印狀態，部分消耗品則可能以刻印狀態完成。兩種結果不能只依物品類型名稱推測。",
            ],
          },
          {
            id: "transfer-crafting",
            title: "繼承製作會保留與重置什麼",
            paragraphs: [
              "可使用繼承製作的配方會顯示專用圖示。選入舊裝備後，新裝備可繼承強化、突破階段與靈魂刻印資訊。NC 也在 5 月更新中確認，部分新增龍帝裝備只能透過繼承製作取得。",
              "官方指南同時警告，已裝備的魔石、神石與結縛資訊會初始化，靈魂刻印率也會改變。『繼承』不代表舊裝備的所有欄位原封不動搬移。",
            ],
            bullets: [
              "保留：強化階段、突破階段、靈魂刻印資訊。",
              "初始化：已裝備魔石、神石、結縛資訊。",
              "會改變：靈魂刻印率。",
            ],
          },
          {
            id: "data-boundary",
            title: "配方、機率與價格仍是即時資料",
            paragraphs: [
              "官方來源沒有提供一張能跨版本使用的完整配方成本表，也沒有證明某個製作類別永遠最賺。材料需求、Combo 機率與市場價格要綁定區服、配方和核對日期。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 7, {
        eyebrow: "LIFE SYSTEM｜CRAFTING",
        title: "AION2 crafting and Transfer Crafting: proficiency, Combo, and inheritance rules",
        description: "An official-source guide to five crafting categories, proficiency, Combo outcomes, imprint state, and the fields retained or reset by Transfer Crafting.",
        intro: "Crafting pages can easily turn recipes, prices, and rates into false permanent answers. This page records only system rules supported by NC; quantities, live rates, and prices remain current-game data.",
        sourceNote: "Cross-checked against NC's Crafting Management guide and May 27, 2026 Transfer Crafting equipment release.",
        keywords: ["AION 2 crafting", "AION2 Transfer Crafting", "AION2 crafting proficiency", "AION2 Combo crafting", "아이온2 제작"],
        sections: [
          {
            id: "crafting-basics",
            title: "Five crafting categories and proficiency",
            paragraphs: [
              "The official guide groups crafting into smithing, armor, handicraft, alchemy, and cooking, covering equipment, materials, consumables, and food. A craft requires its listed materials and sufficient proficiency.",
              "Both success and failure award crafting experience that raises proficiency, and higher proficiency increases success rate. A craft already in progress cannot be stopped, so materials and quantity should be confirmed first.",
            ],
          },
          {
            id: "combo-and-imprint",
            title: "Combo and the finished item's imprint state",
            paragraphs: [
              "Selected equipment recipes can trigger Combo and yield an item one grade higher. The guide does not publish one universal Combo rate, so the selected recipe's live panel remains the direct source.",
              "Crafted equipment finishes in an unimprinted state, while selected consumables can be produced as imprinted items. The result should not be guessed from a broad item category alone.",
            ],
          },
          {
            id: "transfer-crafting",
            title: "What Transfer Crafting retains and resets",
            paragraphs: [
              "Eligible recipes display a Transfer Crafting icon. Selecting old equipment lets the new item inherit enhancement stages, breakthrough stages, and Soul Imprint information. NC's May update also confirms selected Dragon Lord equipment is available only through Transfer Crafting.",
              "The guide warns that equipped Manastones, Godstones, and Binding information are reset, while the Soul Imprint rate changes. Transfer does not move every field unchanged.",
            ],
            bullets: [
              "Retained: enhancement stage, breakthrough stage, and Soul Imprint information.",
              "Reset: equipped Manastones, Godstones, and Binding information.",
              "Changed: Soul Imprint rate.",
            ],
          },
          {
            id: "data-boundary",
            title: "Recipes, rates, and prices remain live data",
            paragraphs: [
              "The sources do not provide one complete cost table that survives every patch, and they do not prove that one profession is always the most profitable. Material needs, Combo rate, and market price need a region, recipe, and verification date.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 7, {
        eyebrow: "생활 시스템｜제작",
        title: "AION2 제작과 계승 제작: 숙련도, Combo, 계승 규칙",
        description: "공식 제작 관리 가이드를 기준으로 다섯 제작 분류, 숙련도, Combo, 각인 상태와 계승 제작에서 유지·초기화되는 항목을 정리합니다.",
        intro: "제작 정보는 도안, 시세와 확률을 영구값처럼 쓰기 쉽습니다. 이 페이지는 NC 공식 가이드가 확인하는 시스템 규칙만 기록하며 수량, 실시간 확률과 가격은 현재 게임 화면에서 확인합니다.",
        sourceNote: "NC 공식 제작 관리 가이드와 2026년 5월 27일 계승 제작 장비 발표를 교차 확인했습니다.",
        keywords: ["아이온2 제작", "아이온2 계승 제작", "제작 숙련도", "Combo 제작", "아이온2 제작 재료"],
        sections: [
          {
            id: "crafting-basics",
            title: "다섯 제작 분류와 숙련도",
            paragraphs: [
              "공식 가이드는 제작을 대장, 갑옷, 세공, 연금, 요리로 구분하며 장비, 제작 재료, 소모품과 음식을 만들 수 있다고 설명합니다. 제작에는 대상 도안의 재료와 제작 숙련도가 필요합니다.",
              "성공과 실패 모두 제작 경험치를 제공해 숙련도를 높이고 숙련도가 높을수록 성공률이 증가합니다. 시작된 제작은 중단할 수 없으므로 재료와 수량을 먼저 확인해야 합니다.",
            ],
          },
          {
            id: "combo-and-imprint",
            title: "Combo와 완성품의 각인 상태",
            paragraphs: [
              "일부 장비 제작은 Combo가 발동해 한 단계 높은 등급 아이템을 얻을 수 있습니다. 공식 가이드는 모든 도안 공통 확률을 제시하지 않으므로 선택한 도안의 현재 화면을 확인해야 합니다.",
              "제작된 장비는 미각인 상태로 완성되며 일부 소모품은 각인 상태로 제작될 수 있습니다. 넓은 아이템 분류만으로 결과를 추측하면 안 됩니다.",
            ],
          },
          {
            id: "transfer-crafting",
            title: "계승 제작에서 유지되고 초기화되는 항목",
            paragraphs: [
              "계승 제작이 가능한 도안에는 전용 아이콘이 표시됩니다. 기존 장비를 선택하면 강화 단계, 돌파 단계와 영혼 각인 정보를 새 장비에 계승할 수 있습니다. NC의 5월 발표는 일부 신규 용제 장비가 계승 제작으로만 획득된다고 확인합니다.",
              "공식 가이드는 장착된 마석, 신석과 결속 정보가 초기화되고 영혼 각인율도 변경된다고 경고합니다. 계승이 모든 필드를 그대로 이동한다는 뜻은 아닙니다.",
            ],
            bullets: [
              "유지: 강화 단계, 돌파 단계, 영혼 각인 정보.",
              "초기화: 장착 마석, 신석, 결속 정보.",
              "변경: 영혼 각인율.",
            ],
          },
          {
            id: "data-boundary",
            title: "도안, 확률과 시세는 실시간 데이터입니다",
            paragraphs: [
              "공식 출처는 모든 패치에 유지되는 전체 도안 비용표를 제공하지 않으며 특정 제작 분야가 항상 가장 수익성이 높다고 증명하지 않습니다. 재료, Combo 확률과 시세에는 지역, 도안과 확인일이 필요합니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "fromis-9-collaboration",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-15",
    updatedAt: "2026-07-15",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [fromisCollaborationSource, summerFestaSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/bdfc1de8-445f-4ef3-9ea0-ee42635df254.jpg",
      1100,
      582,
      fromisCollaborationSource.url,
      {
        "zh-hant": {
          alt: "AION2 × fromis_9 官方聯動宣傳圖",
          caption: "NC 官方聯動新聞圖片；限時任務依公告於 2026 年 8 月 12 日結束。",
        },
        en: {
          alt: "Official AION2 × fromis_9 collaboration artwork",
          caption: "Official NC collaboration image; the announced limited quest ends August 12, 2026.",
        },
        ko: {
          alt: "AION2 × fromis_9 공식 컬래버레이션 이미지",
          caption: "NC 공식 컬래버레이션 이미지이며 공지된 기간 한정 퀘스트는 2026년 8월 12일 종료됩니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "news", slug: "chapter-1-lands-of-sand-and-snow" },
      { kind: "content", section: "news", slug: "aion2chapterone-coupon-status" },
      { kind: "content", section: "guides", slug: "character-presets-style-shop" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "限時聯動｜官方狀態",
        title: "AION2 × fromis_9 聯動：任務、外觀、表情與 8 月 12 日期限",
        description: "NC 官方公告確認 fromis_9 聯動外觀、武器、翅膀、寵物、舞蹈表情，以及截至 2026 年 8 月 12 日的限時任務。",
        intro: "這篇新聞只整理 NC 已公布的聯動內容與時間，不把付費外觀寫成免費獎勵，也不承諾活動會在 2026 年 9 月全球版重開。",
        sourceNote: "NC 2026 年 6 月 17 日 SUMMER FESTA 公告與 6 月 26 日聯動上線公告交叉核對。",
        keywords: ["AION2 fromis_9", "아이온2 프로 미스 나인", "AION2 聯動", "LIKE YOU BETTER", "fromis_9 活動"],
        sections: [
          {
            id: "collaboration-content",
            title: "官方確認的聯動內容",
            paragraphs: [
              "NC 表示聯動加入以 fromis_9 為主題的服裝、武器、翅膀、寵物與專用表情。穿著完整外觀套裝可變身為對應成員外觀；公告還列出 Baby Flomeow、Flostick、Four-Leaf Flover Wings 與 fromis_9 Light Stick 武器外觀。",
              "兩個表情取自 LIKE YOU BETTER 編舞，使用時會播放歌曲；附近玩家也可加入舞蹈。城鎮中的聯動舞台會在使用表情時觸發舞台效果。",
            ],
          },
          {
            id: "limited-quest",
            title: "限時任務與 8 月 12 日截止",
            paragraphs: [
              "官方 6 月 26 日公告表示，玩家可在 2026 年 8 月 12 日前參與 The Case of the Stolen Stage Props 限時任務。完成任務可取得三個表情與一個限量稱號。",
              "公告沒有把所有主題外觀都列為任務免費獎勵，因此任務獎勵與可取得的聯動商品必須分開描述。",
            ],
          },
          {
            id: "service-boundary",
            title: "現行服務與全球版的邊界",
            paragraphs: [
              "這批公告描述的是目前已營運版本中的聯動。官方全球版仍預定於 2026 年 9 月推出，但已核對來源沒有承諾 fromis_9 聯動會在全球版同步或重開。",
              "8 月 12 日後本頁應改標示為歷史活動，保留官方內容與截止日期，而不是繼續顯示為進行中。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "LIMITED COLLABORATION｜OFFICIAL STATUS",
        title: "AION2 × fromis_9: quests, cosmetics, emotes, and the August 12 deadline",
        description: "NC confirms fromis_9-themed outfits, weapons, Wings, pets, dance emotes, and a limited quest ending August 12, 2026.",
        intro: "This news record separates NC's announced content and timing. It does not call paid cosmetics free rewards or promise that the collaboration will return for the September 2026 global launch.",
        sourceNote: "Cross-checked against NC's June 17 SUMMER FESTA announcement and June 26 collaboration launch release.",
        keywords: ["AION 2 fromis_9", "AION2 collaboration", "LIKE YOU BETTER emote", "fromis_9 quest", "AION2 event"],
        sections: [
          {
            id: "collaboration-content",
            title: "Collaboration content confirmed by NC",
            paragraphs: [
              "NC says the collaboration adds fromis_9-themed outfits, weapons, Wings, pets, and exclusive emotes. Equipping a complete cosmetic set can transform the character into a member's likeness. The release also names Baby Flomeow, Flostick, Four-Leaf Flover Wings, and a fromis_9 Light Stick weapon skin.",
              "Two emotes use choreography from LIKE YOU BETTER and play the song when activated. Nearby players can join the dance, while collaboration stages in towns respond with stage effects.",
            ],
          },
          {
            id: "limited-quest",
            title: "Limited quest and August 12 cutoff",
            paragraphs: [
              "NC's June 26 release says The Case of the Stolen Stage Props is available until August 12, 2026. Completing it awards three emotes and a limited-edition title.",
              "The release does not label every themed cosmetic as a free quest reward, so quest rewards and other obtainable collaboration items must remain separate.",
            ],
          },
          {
            id: "service-boundary",
            title: "Live-service and global-launch boundary",
            paragraphs: [
              "These releases describe the collaboration in the current live service. The global edition remains scheduled for September 2026, but the checked sources do not promise a synchronized or returning fromis_9 event for that launch.",
              "After August 12, this page should be marked as a historical event while retaining the official content and cutoff instead of appearing active.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "기간 한정 컬래버레이션｜공식 현황",
        title: "AION2 × fromis_9: 퀘스트·외형·이모트와 8월 12일 종료일",
        description: "NC 공식 발표로 fromis_9 테마 의상, 무기, 날개, 펫, 댄스 이모트와 2026년 8월 12일까지 진행되는 기간 한정 퀘스트를 확인합니다.",
        intro: "이 뉴스는 NC가 공개한 콘텐츠와 기간을 구분해 기록합니다. 유료 외형을 무료 보상으로 쓰거나 2026년 9월 글로벌 출시에 컬래버레이션이 다시 열린다고 약속하지 않습니다.",
        sourceNote: "NC의 2026년 6월 17일 SUMMER FESTA 발표와 6월 26일 컬래버레이션 출시 발표를 교차 확인했습니다.",
        keywords: ["아이온2 프로미스나인", "아이온2 fromis_9", "LIKE YOU BETTER 이모트", "fromis_9 퀘스트", "아이온2 컬래버"],
        sections: [
          {
            id: "collaboration-content",
            title: "NC가 확인한 컬래버레이션 콘텐츠",
            paragraphs: [
              "NC는 fromis_9 테마 의상, 무기, 날개, 펫과 전용 이모트를 추가했다고 밝혔습니다. 외형 세트를 모두 착용하면 멤버 외형으로 변신할 수 있으며 영어 공식 발표에는 Baby Flomeow, Flostick, Four-Leaf Flover Wings와 fromis_9 Light Stick 무기 외형도 포함됩니다.",
              "두 이모트는 LIKE YOU BETTER 안무를 바탕으로 하며 사용 시 음악이 재생됩니다. 주변 이용자도 춤에 참여할 수 있고 마을 컬래버레이션 무대에서는 이모트 사용 시 무대 효과가 실행됩니다.",
            ],
          },
          {
            id: "limited-quest",
            title: "기간 한정 퀘스트와 8월 12일 종료",
            paragraphs: [
              "6월 26일 공식 발표에 따르면 The Case of the Stolen Stage Props 기간 한정 퀘스트는 2026년 8월 12일까지 진행됩니다. 완료 보상은 이모트 세 종과 한정 칭호입니다.",
              "공식 발표는 모든 테마 외형을 무료 퀘스트 보상이라고 설명하지 않으므로 퀘스트 보상과 그 밖의 획득 가능 컬래버레이션 상품을 구분해야 합니다.",
            ],
          },
          {
            id: "service-boundary",
            title: "현재 서비스와 글로벌 출시 범위",
            paragraphs: [
              "이번 발표는 현재 라이브 서비스에 적용된 컬래버레이션을 설명합니다. 글로벌 버전은 2026년 9월 출시 예정이지만 확인한 출처에는 fromis_9 이벤트의 글로벌 동시 적용이나 재진행 약속이 없습니다.",
              "8월 12일 이후에는 공식 내용과 종료일을 보존하면서 진행 중이 아닌 지난 이벤트로 표시해야 합니다.",
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
