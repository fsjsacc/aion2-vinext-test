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

const customizationAnnouncement = officialSource(
  "customization-announcement",
  "AION2 pre-launch character customization announcement",
  "https://about.ncsoft.com/news/article/aion2_update_251117",
  "2025-11-17",
);

const officialStyleShop = officialSource(
  "official-style-shop",
  "AION2 official Style Shop",
  "https://aion2.plaync.com/ko-kr/styleshop/all",
);

const seasonTwoAnnouncement = officialSource(
  "season-two-update",
  "AION2 Season 2 systems and equipment progression update",
  "https://about.ncsoft.com/news/article/aion2_update_260121",
  "2026-01-21",
);

const officialProbabilityIndex = officialSource(
  "official-probability-index",
  "AION2 official probability disclosure index",
  "https://probability.plaync.com/aion2/index",
);

const officialSoulImprintProbability = officialSource(
  "soul-imprint-probability",
  "AION2 official weapon Soul Imprint probability disclosure",
  "https://probability.plaync.com/aion2/view?probCategoryId=68f1fb1157c8986afe4405ed",
);

const officialItemSample = officialSource(
  "official-item-sample",
  "AION2 official item database sample with Soul and Godstone Imprint fields",
  "https://aion2.plaync.com/ko-kr/info/item?detail=item_110130039_0_0&grade=Unique&page=",
);

const arcanaAnnouncement = officialSource(
  "arcana-may-update",
  "AION2 Mirror of Scarlet Desire and Arcana sets update",
  "https://about.ncsoft.com/en/news/article/aion2_update_260513",
  "2026-05-13",
);

const arcanaSeasonTwoPage = officialSource(
  "arcana-season-two-page",
  "AION2 official Season 2 content page",
  "https://aion2.plaync.com/ko-kr/conts/260116_update",
  "2026-01-21",
);

const globalServerAnnouncement = officialSource(
  "global-server-announcement",
  "AION2 global PC platform, server-region, and language announcement",
  "https://about.ncsoft.com/news/article/aion2_update_260422",
  "2026-04-22",
);

const globalOfficialSite = officialSource(
  "global-official-site",
  "AION2 official global site",
  "https://aion2.ncsoft.jp/en/contents",
);

export const p1KeywordContentEntries = [
  {
    section: "guides",
    slug: "character-presets-style-shop",
    schemaType: "Article",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-26",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [customizationAnnouncement, officialStyleShop],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/88ad0655-707c-452c-9c85-0d48af6a04f2.png",
      customizationAnnouncement.url,
      {
        "zh-hant": {
          alt: "AION2 官方角色自訂宣傳圖",
          caption: "NC 的角色自訂活動圖片；預設相容性與分享規則仍以遊戲及官方 Style Shop 為準。",
        },
        en: {
          alt: "Official AION2 character customization artwork",
          caption: "NC customization artwork; preset compatibility and sharing rules remain controlled by the game and official Style Shop.",
        },
        ko: {
          alt: "AION2 공식 캐릭터 커스터마이징 이미지",
          caption: "NC의 커스터마이징 안내 이미지이며 프리셋 호환성과 공유 규칙은 게임 및 공식 스타일샵을 기준으로 합니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "classes", slug: "brawler" },
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "content", section: "guides", slug: "scam-check" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "角色外觀",
        title: "AION2 角色創建：捏臉預設、Character Creation 與 Style Shop",
        description: "AION2 角色創建支援超過 200 個自訂項目、內建捏臉預設及官方 Style Shop；第三方 Character Creation 參數仍需驗證。",
        intro: "AION2 角色創建（Character Creation）提供細緻捏臉與官方外觀瀏覽功能；使用網路預設前，先分清官方功能與玩家投稿。官方資料沒有保證任何一組數值都能跨版本、跨地區或跨種族重現。",
        sourceNote: "依 NC 角色自訂公告與官方 Style Shop 核對；沒有把玩家投稿當成官方預設。",
        keywords: ["AION2 角色創建", "AION2 Character Creation", "AION2 捏臉", "AION2 角色預設", "AION2 Style Shop", "커마 공유"],
        sections: [
          {
            id: "official-features",
            title: "官方已確認的角色自訂功能",
            paragraphs: [
              "NC 在 2025 年 11 月 17 日的公告中表示，AION2 支援超過 200 個自訂項目，可調整體型、皮膚、虹膜、肌肉等身體元素，並為不熟悉自訂的玩家提供多種預先製作的外觀預設。官方網站目前也設有 Style Shop 頁面。",
              "這些資料可以支撐『有細緻捏臉和官方外觀瀏覽入口』，但不等於每個玩家貼出的參數都經 NC 審核。瀏覽投稿時仍要保留作者、發布日期、角色條件與遊戲版本。",
            ],
          },
          {
            id: "safe-use",
            title: "匯入或重做前要核對什麼",
            paragraphs: [
              "官方公告沒有在可核對文字中承諾所有預設可跨種族、性別、伺服器地區或未來版本相容，也沒有公布通用的第三方檔案格式。看到『一鍵匯入』『全球版保證可用』等說法時，不應只靠截圖判定。",
            ],
            bullets: [
              "優先從官方 Style Shop 或遊戲內入口查看，不安裝來路不明的執行檔。",
              "記錄種族、性別、伺服器版本與發布日期，再比對參數欄位。",
              "轉載玩家臉型前取得授權並標示作者；外觀可見不代表可任意再發布。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "CHARACTER APPEARANCE",
        title: "AION2 Character Creation: presets, customization & Style Shop",
        description: "Use AION2 Character Creation with 200-plus customization controls, built-in presets, and the official Style Shop while checking third-party preset compatibility.",
        intro: "AION2 Character Creation includes detailed customization, ready-made appearance presets, and an official Style Shop. Separate those official features from community submissions before using shared values, because the sources do not establish universal compatibility.",
        sourceNote: "Checked against NC's customization announcement and official Style Shop; community submissions are not labeled as official presets.",
        keywords: ["AION2 character presets", "AION2 character creation", "AION2 Style Shop", "AION2 customization", "AION2 preset share"],
        sections: [
          {
            id: "official-features",
            title: "Customization features confirmed by NC",
            paragraphs: [
              "NC's November 17, 2025 announcement says AION2 supports more than 200 customization items, including detailed control of body shape, skin, iris, and musculature. It also says multiple ready-made appearance presets are provided for players less familiar with character creation. The official site now exposes a Style Shop page.",
              "That supports the existence of detailed creation tools and an official browsing surface. It does not turn every community parameter sheet into an NC-reviewed preset, so author, date, character conditions, and build should remain attached to a submission.",
            ],
          },
          {
            id: "safe-use",
            title: "What to verify before importing or recreating",
            paragraphs: [
              "The audited official text does not promise that every preset crosses race, sex, server region, or future-version boundaries. It also does not document a universal third-party file format. A screenshot alone cannot prove a claimed one-click import or global-build compatibility.",
            ],
            bullets: [
              "Start from the official Style Shop or in-game interface; do not run an unknown executable for a face preset.",
              "Record race, sex, regional build, and publication date before matching values.",
              "Obtain permission and retain creator credit when republishing a community appearance.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "캐릭터 외형",
        title: "AION2 캐릭터 생성: 커마 프리셋·커스터마이징·스타일샵",
        description: "AION2 캐릭터 생성의 200개 이상 커스터마이징 항목, 기본 커마 프리셋과 공식 스타일샵을 확인하고 외부 수치 호환성을 점검합니다.",
        intro: "AION2 캐릭터 생성은 세밀한 커스터마이징, 기본 외형 프리셋과 공식 스타일샵을 제공합니다. 공유 수치를 쓰기 전 공식 기능과 이용자 게시물을 구분해야 하며 모든 수치가 버전과 지역을 넘어 재현된다고 보장할 수 없습니다.",
        sourceNote: "NC 커스터마이징 안내와 공식 스타일샵을 대조했으며 이용자 게시물을 공식 프리셋으로 표시하지 않습니다.",
        keywords: ["아이온2 캐릭터 생성", "AION2 Character Creation", "아이온2 커마", "아이온2 커마 공유", "아이온2 스타일샵", "아이온2 프리셋"],
        sections: [
          {
            id: "official-features",
            title: "NC가 확인한 커스터마이징 기능",
            paragraphs: [
              "NC의 2025년 11월 17일 안내는 AION2가 200개 이상의 커스터마이징 항목을 지원하고 체형, 피부, 홍채, 근육 등을 세밀하게 조정할 수 있다고 설명합니다. 커스터마이징이 익숙하지 않은 이용자를 위한 여러 기본 외형 프리셋도 안내했으며 공식 사이트에는 현재 스타일샵 페이지가 있습니다.",
              "이는 세밀한 제작 기능과 공식 탐색 화면이 있다는 근거입니다. 다만 이용자가 올린 수치표까지 NC가 검수했다는 뜻은 아니므로 작성자, 게시일, 캐릭터 조건, 게임 버전을 함께 보존해야 합니다.",
            ],
          },
          {
            id: "safe-use",
            title: "불러오기나 재현 전에 확인할 것",
            paragraphs: [
              "확인한 공식 문구는 모든 프리셋이 종족, 성별, 서비스 지역, 향후 버전 사이에서 호환된다고 보장하지 않으며 범용 외부 파일 형식도 공개하지 않습니다. 스크린샷만으로 원클릭 불러오기나 글로벌 버전 호환을 확정할 수 없습니다.",
            ],
            bullets: [
              "공식 스타일샵이나 게임 내 화면부터 이용하고 커마용 출처 불명 실행 파일은 열지 않습니다.",
              "종족, 성별, 지역 빌드, 게시일을 기록한 뒤 수치 항목을 비교합니다.",
              "이용자 외형을 재게시할 때는 허락을 받고 제작자 표시를 유지합니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "soul-imprint",
    schemaType: "TechArticle",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [officialSoulImprintProbability, officialItemSample, seasonTwoAnnouncement, officialProbabilityIndex],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/22c86287-aa98-4909-bfdb-9c2d2aff9c3b.png",
      seasonTwoAnnouncement.url,
      {
        "zh-hant": { alt: "AION2 第二賽季官方更新圖", caption: "第二賽季更新包含新的靈魂刻印選項、額外調律欄位及裝備繼承系統。" },
        en: { alt: "Official AION2 Season 2 update artwork", caption: "The Season 2 update introduced new Soul Imprint options, additional tuning slots, and equipment transfer changes." },
        ko: { alt: "AION2 시즌2 공식 업데이트 이미지", caption: "시즌2 업데이트에는 신규 영혼 각인 옵션, 추가 조율 슬롯, 장비 계승 시스템이 포함됐습니다." },
      },
    ),
    related: [
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "content", section: "guides", slug: "wing-enhancement" },
      { kind: "content", section: "database", slug: "map-data-methodology" },
      { kind: "tool", toolSlug: "material-calculator" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 6, {
        eyebrow: "裝備系統",
        title: "AION2 靈魂刻印：官方機率、重置與靈魂調律邊界",
        description: "用 NC 官方機率頁與物品庫解釋靈魂刻印、重置和單條調律，並說明為何職業詞條優先級不能脫離當前裝備直接套用。",
        intro: "靈魂刻印不是一張永遠有效的固定詞條表。官方披露顯示，裝備部位、職業、已存在的效果與操作方式都會改變候選結果；最後應以自己裝備的遊戲內機率提示為準。",
        sourceNote: "主要依 NC 官方機率披露；物品庫頁面只作具名裝備範例，不外推成所有裝備的固定規則。",
        keywords: ["AION2 靈魂刻印", "AION2 靈魂調律", "영혼 각인", "영혼 조율", "AION2 刻印詞條"],
        sections: [
          {
            id: "official-rules",
            title: "官方機率頁確認的運作方式",
            paragraphs: [
              "NC 的武器靈魂刻印機率說明指出，首次刻印會依該裝備的『選項賦予數量』套用效果；相同效果不會重複，技能效果只會從符合自身職業的項目中產生，技能效果數量也受裝備上限限制。數值大小另依官方的數值賦予機率表決定。",
              "『靈魂刻印：初始化』會移除原有效果並重新賦予整組效果。『靈魂調律』則可選一條既有效果重新賦予；由於既有效果會從候選中排除，實際重新計算後的機率可能與網站總表不同，官方要求以遊戲內針對當前裝備顯示的機率為準。",
            ],
          },
          {
            id: "item-specific",
            title: "不要把單一物品範例當成通用答案",
            paragraphs: [
              "官方物品庫的具名武器『잔인무도』頁面顯示首次靈魂刻印賦予 3 個選項，並列出該武器可出現的屬性範圍與最多 3 個技能效果。這只能證明該物品頁面當前公開的候選，不代表其他武器、防具或飾品也固定是 3 條。",
              "第二賽季公告另確認新增靈魂刻印選項、額外調律欄位與裝備繼承；因此舊攻略的候選池和成本資訊可能過期。",
            ],
            bullets: [
              "選詞條前先確認裝備部位、物品與職業，不只看戰鬥力數字。",
              "整組初始化與單條靈魂調律是不同操作，風險不可混寫。",
              "本站不發布未經當前官方表或遊戲內提示核對的成功率與成本。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 6, {
        eyebrow: "EQUIPMENT SYSTEM",
        title: "AION2 Soul Imprint: official probabilities, reset, and Soul Tuning",
        description: "NC's probability disclosures and item database explain Soul Imprint, full reset, and one-effect tuning—and why priorities must be tied to the current item and class.",
        intro: "Soul Imprint is not one permanent universal affix table. NC's disclosure shows that slot, class, existing effects, and the selected operation shape the result. The in-game probability display for the item in hand is the final reference.",
        sourceNote: "Based primarily on NC's official probability disclosures; the item-database page is a named example, not a rule for every item.",
        keywords: ["AION2 Soul Imprint", "AION2 Soul Tuning", "AION2 soul engraving", "영혼 각인", "영혼 조율"],
        sections: [
          {
            id: "official-rules",
            title: "Rules confirmed by the official probability page",
            paragraphs: [
              "NC's weapon disclosure says an initial Soul Imprint applies the item's stated number of effects. Identical effects do not stack, skill effects are restricted to the character's class, and the item caps how many skill effects can be assigned. The value within an effect is governed by a separate official value-probability table.",
              "Soul Imprint Reset removes all existing effects and assigns a new set. Soul Tuning selects one assigned effect for replacement. Because effects already present are excluded from the candidate pool, the recalculated probability can differ from the general web table; NC directs players to the in-game disclosure for their current item.",
            ],
          },
          {
            id: "item-specific",
            title: "Do not turn one item example into a universal rule",
            paragraphs: [
              "The official database page for the named greatsword 잔인무도 says its first Soul Imprint assigns three options and lists that weapon's possible stat ranges and a maximum of three skill effects. That establishes the current record for this item, not a fixed three-option rule for every weapon, armor piece, or accessory.",
              "NC's Season 2 announcement also confirms new Soul Imprint options, additional tuning slots, and equipment transfer changes, so older candidate pools and cost guides can become stale.",
            ],
            bullets: [
              "Check slot, exact item, and class before ranking effects; combat power alone is not enough.",
              "A full reset and one-effect Soul Tuning are different operations with different risk.",
              "KINA does not publish a rate or cost unless the current official table or in-game disclosure supports it.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 6, {
        eyebrow: "장비 시스템",
        title: "AION2 영혼 각인: 공식 확률, 초기화, 영혼 조율의 범위",
        description: "NC 공식 확률 정보와 아이템 DB로 영혼 각인, 전체 초기화, 단일 옵션 조율을 구분하고 직업별 우선순위를 현재 장비와 함께 봐야 하는 이유를 설명합니다.",
        intro: "영혼 각인은 항상 같은 고정 옵션표가 아닙니다. 공식 안내상 장비 부위, 직업, 이미 붙은 효과, 선택한 작업에 따라 결과가 달라지며 최종 기준은 현재 장비에 대한 게임 내 확률 정보입니다.",
        sourceNote: "NC 공식 확률 정보를 우선 사용하며 아이템 DB는 이름이 확인된 장비의 예시일 뿐 모든 장비의 공통 규칙으로 확대하지 않습니다.",
        keywords: ["아이온2 영혼 각인", "아이온2 영혼 조율", "영혼 각인 확률", "영혼 각인 옵션", "AION2 Soul Imprint"],
        sections: [
          {
            id: "official-rules",
            title: "공식 확률 페이지가 확인한 방식",
            paragraphs: [
              "NC의 무기 영혼 각인 확률 안내에 따르면 최초 각인 시 해당 장비의 옵션 부여 수량만큼 효과가 적용됩니다. 같은 효과는 중복되지 않고 스킬 효과는 자신의 직업에 맞는 항목만 부여되며 장비별 최대 스킬 옵션 수도 적용됩니다. 효과의 수치는 별도 수치 부여 확률표를 따릅니다.",
              "영혼 각인 초기화는 기존 효과를 모두 없애고 새 효과 묶음을 부여합니다. 영혼 조율은 부여된 효과 한 개를 골라 다시 부여합니다. 기존 효과가 후보에서 제외돼 실제 확률이 웹의 일반 표와 달라질 수 있으므로 NC는 현재 장비에 표시되는 게임 내 확률 정보를 확인하도록 안내합니다.",
            ],
          },
          {
            id: "item-specific",
            title: "한 아이템 예시를 공통 규칙으로 만들지 않기",
            paragraphs: [
              "공식 아이템 DB의 대검 잔인무도 페이지는 최초 영혼 각인 시 옵션 3개가 부여된다고 표시하고 해당 무기의 가능 수치 범위와 최대 스킬 효과 3개를 공개합니다. 이는 그 아이템의 현재 공개 정보이며 모든 무기, 방어구, 장신구가 항상 3개라는 뜻은 아닙니다.",
              "시즌2 공식 발표는 신규 영혼 각인 옵션, 추가 조율 슬롯, 장비 계승도 확인했습니다. 따라서 이전 시즌의 후보 옵션이나 비용 안내는 현재와 다를 수 있습니다.",
            ],
            bullets: [
              "옵션을 고르기 전에 장비 부위, 정확한 아이템, 직업을 함께 확인합니다.",
              "전체 초기화와 단일 옵션 영혼 조율을 같은 작업으로 설명하지 않습니다.",
              "현재 공식 표나 게임 내 안내로 확인되지 않은 확률과 비용은 확정값으로 쓰지 않습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "arcana",
    schemaType: "TechArticle",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [arcanaAnnouncement, arcanaSeasonTwoPage, officialProbabilityIndex],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/9a942147-548a-4fe6-b2ca-d4752bc03ad3.png",
      arcanaAnnouncement.url,
      {
        "zh-hant": { alt: "AION2 紅色欲望之鏡與 Arcana 官方更新圖", caption: "2026 年 5 月 13 日更新加入三組 Arcana 套裝及新的結晶提取範圍。" },
        en: { alt: "Official AION2 Mirror of Scarlet Desire and Arcana update artwork", caption: "The May 13, 2026 update added three Arcana sets and expanded crystal extraction." },
        ko: { alt: "AION2 붉은 연심의 거울과 아르카나 공식 업데이트 이미지", caption: "2026년 5월 13일 업데이트에서 아르카나 세트 3종과 결정 추출 범위가 추가됐습니다." },
      },
    ),
    related: [
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "content", section: "guides", slug: "wing-enhancement" },
      { kind: "content", section: "news", slug: "chapter-1-lands-of-sand-and-snow" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "養成系統",
        title: "AION2 Arcana：官方套裝效果、結晶來源與版本邊界",
        description: "整理 NC 已公布的三組 Arcana 效果、Season 1–3 提取材料與製作來源，不把單一版本結論寫成全球版永久最佳搭配。",
        intro: "Arcana 的套裝和材料會隨賽季更新。以下數值只描述 NC 於 2026 年 5 月 13 日公告的當前韓國／台灣營運內容；全球版的初始池與平衡尚不能由此推定。",
        sourceNote: "採用 NC 官方更新頁、第二賽季內容頁與官方機率目錄；職業最佳搭配沒有官方定論。",
        keywords: ["AION2 Arcana", "AION2 阿爾卡那", "아르카나", "AION2 Arcana 套裝", "AION2 Arcana 搭配"],
        sections: [
          {
            id: "may-sets",
            title: "2026 年 5 月公告確認的三組套裝",
            paragraphs: [
              "NC 的英文公告列出 Punishing Overture、Protected Soul、Indomitable Dedication 三組新 Arcana 套裝：分別提高 5% Boss Damage Tolerance、5% Restoration、5% Weapon Damage Tolerance。這些是該公告的官方英文名稱與數值，不應自行改寫成未公布的傷害增幅。",
              "三組套裝可用 Noble Crystal (Bound) 製作，公告指該材料來自超越副本 Mirror of Scarlet Desire。Season 1、2 Arcana 可提取為 Mysterious Crystal (Bound)，Season 3 Arcana 可提取為 Noble Crystal (Bound)。",
            ],
          },
          {
            id: "version-boundary",
            title: "搭配建議必須綁定賽季與用途",
            paragraphs: [
              "第二賽季官方頁另確認新增 Arcana 部件 Scales，以及 Death、War、Mystery、Freedom、Single Strike 系列。這說明 Arcana 池會擴充，舊版圖表不能在沒有日期時當成完整清單。",
              "官方來源沒有為每個職業公布唯一最佳套裝，也沒有確認全球版上線時會完整照搬目前的賽季池。實際選擇仍需對照職業、PvE／PvP 目標、已啟用部件與遊戲內當前說明。",
            ],
            bullets: [
              "記錄套裝名稱、部件、賽季與核對日期。",
              "抽取或製作前再次打開官方機率目錄與遊戲內材料說明。",
              "把『推薦』標成編輯判斷，不要包裝成 NC 官方排名。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "PROGRESSION SYSTEM",
        title: "AION2 Arcana: official set effects, crystal sources, and version limits",
        description: "A source-bound guide to three announced Arcana effects, Season 1–3 extraction materials, and crafting sources without presenting one live build as a permanent global meta.",
        intro: "Arcana sets and materials change with seasons. The values below describe NC's May 13, 2026 live-service announcement for Korea and Taiwan; they do not establish the global launch pool or balance.",
        sourceNote: "Uses NC's update release, official Season 2 page, and probability index; NC has not named one best set for every class.",
        keywords: ["AION2 Arcana", "AION2 Arcana sets", "AION2 Arcana build", "AION2 Arcana crystals", "아르카나"],
        sections: [
          {
            id: "may-sets",
            title: "Three sets confirmed in the May 2026 release",
            paragraphs: [
              "NC's English release names Punishing Overture, Protected Soul, and Indomitable Dedication. Their announced effects respectively add 5% Boss Damage Tolerance, 5% Restoration, and 5% Weapon Damage Tolerance. Those are the source's official English labels and values; they are not general damage bonuses.",
              "The sets can be crafted with Noble Crystal (Bound), which the announcement ties to clearing Mirror of Scarlet Desire. Season 1 and 2 Arcana can be extracted into Mysterious Crystal (Bound), while Season 3 Arcana can be extracted into Noble Crystal (Bound).",
            ],
          },
          {
            id: "version-boundary",
            title: "Recommendations must name season and purpose",
            paragraphs: [
              "The official Season 2 page also introduced the Scales Arcana part and the Death, War, Mystery, Freedom, and Single Strike series. That expansion is evidence that undated older charts are not complete permanent lists.",
              "The sources do not name one best set for every class and do not confirm that the global launch will copy the current seasonal pool unchanged. A choice still depends on class, PvE or PvP objective, active parts, and the current in-game description.",
            ],
            bullets: [
              "Record set, part, season, and verification date.",
              "Reopen the official probability index and in-game material description before extraction or crafting.",
              "Label a recommendation as editorial analysis rather than an NC ranking.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "성장 시스템",
        title: "AION2 아르카나: 공식 세트 효과, 결정 출처, 버전 범위",
        description: "NC가 발표한 아르카나 세트 3종, 시즌 1~3 추출 재료, 연성 출처를 정리하되 현재 라이브 빌드를 글로벌 영구 메타로 확대하지 않습니다.",
        intro: "아르카나 세트와 재료는 시즌에 따라 바뀝니다. 아래 수치는 2026년 5월 13일 NC가 한국·대만 서비스에 발표한 내용이며 글로벌 출시 시점의 구성과 밸런스를 확정하지 않습니다.",
        sourceNote: "NC 공식 업데이트, 시즌2 페이지, 확률 정보 목차를 사용했으며 모든 직업의 유일한 최적 세트는 공식 발표되지 않았습니다.",
        keywords: ["아이온2 아르카나", "아르카나 세트", "아르카나 조합", "아르카나 결정", "AION2 Arcana"],
        sections: [
          {
            id: "may-sets",
            title: "2026년 5월 발표로 확인된 세트 3종",
            paragraphs: [
              "NC의 공식 발표는 징벌, 수호, 불굴 세트를 추가했고 각각 보스 피해 내성, 재생, 무기 피해 내성을 5% 올린다고 설명합니다. 이는 발표에 적힌 효과와 수치이며 임의의 공격력 증가로 바꿔 해석할 수 없습니다.",
              "세트는 붉은 연심의 거울 공략으로 얻는 고결한 결정(각인)을 사용해 연성할 수 있습니다. 시즌 1·2 아르카나는 신비로운 결정(각인)으로, 시즌 3 아르카나는 고결한 결정(각인)으로 추출할 수 있다고 발표했습니다.",
            ],
          },
          {
            id: "version-boundary",
            title: "조합 안내에는 시즌과 목적이 필요합니다",
            paragraphs: [
              "시즌2 공식 페이지는 아르카나 파츠 천칭과 죽음·전쟁·신비·자유·일격 시리즈 추가도 확인합니다. 아르카나 풀이 늘어났으므로 날짜 없는 이전 표를 영구적인 전체 목록으로 사용할 수 없습니다.",
              "공식 출처는 모든 직업의 유일한 최적 세트를 정하지 않았고 글로벌 출시 빌드가 현재 시즌 구성을 그대로 가져온다고 확인하지 않았습니다. 직업, PvE·PvP 목적, 활성 파츠, 현재 게임 설명을 함께 봐야 합니다.",
            ],
            bullets: [
              "세트명, 파츠, 시즌, 확인 날짜를 함께 기록합니다.",
              "추출이나 연성 전 공식 확률 정보와 게임 내 재료 설명을 다시 확인합니다.",
              "추천은 편집 분석으로 표시하고 NC 공식 순위처럼 쓰지 않습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "global-server-regions",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [globalServerAnnouncement, globalOfficialSite],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/95839e2b-b030-4f96-a4cb-b8fc2233e3a8.png",
      globalServerAnnouncement.url,
      {
        "zh-hant": { alt: "AION2 全球 PC 版官方宣傳圖", caption: "NC 於 2026 年 4 月公布全球 PC 平台、四個伺服器營運地區與十種支援語言。" },
        en: { alt: "Official AION2 global PC announcement artwork", caption: "NC announced the global PC platforms, four operating regions, and ten supported languages in April 2026." },
        ko: { alt: "AION2 글로벌 PC 버전 공식 이미지", caption: "NC는 2026년 4월 글로벌 PC 플랫폼, 4개 운영 지역, 지원 언어 10종을 발표했습니다." },
      },
    ),
    related: [
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
      { kind: "content", section: "guides", slug: "scam-check" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 4, {
        eyebrow: "全球版伺服器",
        title: "AION2 全球版伺服器地區：北美、南美、歐洲與日本已確認",
        description: "NC 已公布全球 PC 版將分區營運北美、南美、歐洲、日本伺服器並支援十種語言；實際伺服器名稱、時區與人口尚未公布。",
        intro: "目前可以做的是選擇『營運地區』，還不能根據傳言挑具體伺服器。NC 的正式公告確認四個地區，但沒有提供開服清單、機房城市、跨區角色轉移或即時人口。",
        sourceNote: "以 NC 2026 年 4 月 22 日全球版公告和官方全球站為準；未引用非官方人口估算。",
        keywords: ["AION2 伺服器", "AION2 全球版伺服器", "AION2 server regions", "AION2 北美伺服器", "AION2 日本伺服器"],
        sections: [
          {
            id: "confirmed-regions",
            title: "官方確認的地區、平台與語言",
            paragraphs: [
              "NC 於 2026 年 4 月 22 日宣布，全球版會為北美、南美、歐洲、日本各自建立並營運地區伺服器。公告把全球版描述為 Steam 與 PURPLE 的 PC 專用版本。",
              "同一公告列出十種支援語言：英文、德文、法文、西班牙文、葡萄牙文、日文、韓文、俄文、簡體中文及繁體中文。語言支援不等同於每種語言都有獨立伺服器，也不能由此推定可自由跨區。",
            ],
          },
          {
            id: "not-announced",
            title: "具體伺服器資訊仍未公布",
            paragraphs: [
              "截至 2026 年 7 月 14 日，本頁核對的官方來源沒有列出全球版伺服器名稱、數量、資料中心城市、遊戲時區、延遲、人口、陣營比例、跨區配對或角色轉移政策。這些欄位應保持未知，不能用韓國／台灣現況代填。",
            ],
            bullets: [
              "先按所在位置、好友群與官方地區政策規劃，不依未經測試的延遲榜單。",
              "伺服器名稱與建立限制公布後，再製作可持續更新的狀態頁。",
              "任何『最熱門』『最少延遲』『某陣營必勝』都需要可追溯、帶日期的數據。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 4, {
        eyebrow: "GLOBAL SERVERS",
        title: "AION2 global server regions: North America, South America, Europe, and Japan",
        description: "NC confirms four regional operations and ten languages for the global PC release; server names, time zones, and population remain unannounced.",
        intro: "Players can plan around an operating region, but not yet choose a named global server from an official list. NC confirms four regions without publishing data-center cities, transfers, or live population.",
        sourceNote: "Based on NC's April 22, 2026 global announcement and official global site; no unofficial population estimate is used.",
        keywords: ["AION2 servers", "AION2 global servers", "AION2 server regions", "AION2 NA server", "AION2 Europe server", "AION2 Japan server"],
        sections: [
          {
            id: "confirmed-regions",
            title: "Regions, platforms, and languages confirmed by NC",
            paragraphs: [
              "NC announced on April 22, 2026 that it plans separate regional server operations for North America, South America, Europe, and Japan. The same announcement describes the global release as PC-only through Steam and PURPLE.",
              "It lists ten supported languages: English, German, French, Spanish, Portuguese, Japanese, Korean, Russian, Simplified Chinese, and Traditional Chinese. Language support does not prove a separate server for each language or unrestricted movement between regions.",
            ],
          },
          {
            id: "not-announced",
            title: "Named-server details remain unannounced",
            paragraphs: [
              "As of July 14, 2026, the checked sources do not list global server names or counts, data-center cities, game time zones, measured latency, population, faction ratios, cross-region matchmaking, or character-transfer rules. Korea and Taiwan live-service fields cannot be used as substitutes.",
            ],
            bullets: [
              "Plan around location, friends, and official regional policy rather than an untested latency ranking.",
              "Create a live status table only after NC publishes named servers and creation restrictions.",
              "Claims such as most populated, lowest latency, or dominant faction need dated, traceable evidence.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 4, {
        eyebrow: "글로벌 서버",
        title: "AION2 글로벌 서버 지역: 북미·남미·유럽·일본 공식 확인",
        description: "NC는 글로벌 PC 버전의 4개 지역 서버 운영과 10개 언어를 발표했지만 서버명, 시간대, 인구 정보는 아직 공개하지 않았습니다.",
        intro: "현재는 운영 지역을 기준으로 준비할 수 있지만 공식 목록에서 특정 서버를 고를 단계는 아닙니다. NC는 네 지역을 확인했으나 데이터센터 도시, 이전 정책, 실시간 인구는 발표하지 않았습니다.",
        sourceNote: "NC의 2026년 4월 22일 글로벌 발표와 공식 글로벌 사이트를 기준으로 하며 비공식 인구 추정치는 사용하지 않습니다.",
        keywords: ["아이온2 서버", "아이온2 글로벌 서버", "AION2 server regions", "아이온2 북미 서버", "아이온2 일본 서버"],
        sections: [
          {
            id: "confirmed-regions",
            title: "NC가 확인한 지역·플랫폼·언어",
            paragraphs: [
              "NC는 2026년 4월 22일 글로벌 버전에서 북미, 남미, 유럽, 일본 지역별 서버를 구축해 운영할 계획이라고 발표했습니다. 같은 발표는 글로벌 버전을 Steam과 PURPLE를 통한 PC 전용 서비스로 설명합니다.",
              "지원 언어는 영어, 독일어, 프랑스어, 스페인어, 포르투갈어, 일본어, 한국어, 러시아어, 중국어 간체·번체의 10종입니다. 언어 지원이 언어별 독립 서버나 자유로운 지역 이동을 뜻하지는 않습니다.",
            ],
          },
          {
            id: "not-announced",
            title: "구체적인 서버 정보는 아직 미공개",
            paragraphs: [
              "2026년 7월 14일 기준 확인한 공식 출처에는 글로벌 서버명과 수, 데이터센터 도시, 게임 시간대, 지연 시간, 인구, 종족 비율, 지역 간 매칭, 캐릭터 이전 정책이 없습니다. 한국·대만 서비스 정보를 대신 넣을 수 없습니다.",
            ],
            bullets: [
              "검증되지 않은 지연 순위보다 거주 위치, 친구, 공식 지역 정책을 먼저 봅니다.",
              "서버명과 생성 제한이 발표된 뒤에 상태표를 제작하고 날짜를 붙여 갱신합니다.",
              "최다 인구, 최저 지연, 특정 종족 우세 주장은 날짜와 추적 가능한 데이터가 필요합니다.",
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
