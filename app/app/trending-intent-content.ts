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
> & { keywords: readonly string[] };

const labels = {
  "zh-hant": {
    byline: "PFG",
    backLabel: "返回內容中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "最後核對",
    relatedLabel: "繼續查詢",
  },
  en: {
    byline: "PFG",
    backLabel: "Back to the content hub",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Continue researching",
  },
  ko: {
    byline: "PFG",
    backLabel: "콘텐츠 허브로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "KINA 게시",
    updatedLabel: "마지막 확인",
    relatedLabel: "계속 확인하기",
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
    retrievedAt: "2026-07-26",
    verifiedAt: "2026-07-26",
  };
}

const globalPlatformSource = officialSource(
  "aion2-global-platform-regions-2026-04-22",
  "AION 2 global PC platforms, regions, and languages announcement",
  "https://about.ncsoft.com/news/article/aion2_update_260422",
  "2026-04-22",
);

const regionalLaunchSource = officialSource(
  "aion2-korea-taiwan-launch-2025-11-18",
  "AION 2 Korea and Taiwan launch and PURPLE pre-install announcement",
  "https://about.ncsoft.com/en/news/article/aion2_update_251118",
  "2025-11-18",
);

const chapterOneSource = officialSource(
  "aion2-chapter-one-2026-07-06",
  "AION 2 Chapter 1 official update overview",
  "https://about.ncsoft.com/en/news/article/aion2_update_260706",
  "2026-07-06",
);

const seasonTwoSource = officialSource(
  "aion2-season-two-2026-01-21",
  "AION 2 Season 2 official combat and ranking update",
  "https://about.ncsoft.com/en/news/article/aion2_update_260121",
  "2026-01-21",
);

const steamSource = {
  id: "aion2-steam-store-2026-07-26",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 official Steam store page",
  url: "https://store.steampowered.com/app/3393110/AION_2/",
  retrievedAt: "2026-07-26",
  verifiedAt: "2026-07-26",
} as const satisfies ContentSource;

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
    translations,
  };
}

const globalHero = officialHero(
  "https://blogfiles.ncsoft.net/news/95839e2b-b030-4f96-a4cb-b8fc2233e3a8.png",
  800,
  420,
  globalPlatformSource.url,
  {
    "zh-hant": {
      alt: "AION 2 全球版 PC、Steam 與 PURPLE 官方宣傳圖",
      caption: "NC 公布 AION 2 全球版以 PC 為專用平台，透過 Steam 與 PURPLE 提供。",
    },
    en: {
      alt: "Official AION 2 Global PC, Steam, and PURPLE artwork",
      caption: "NC announced the AION 2 Global release as a PC-only version delivered through Steam and PURPLE.",
    },
    ko: {
      alt: "아이온2 글로벌 PC·Steam·PURPLE 공식 이미지",
      caption: "NC는 아이온2 글로벌판을 Steam과 PURPLE로 제공하는 PC 전용 버전으로 발표했습니다.",
    },
  },
);

const gameplayHero = officialHero(
  "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  1100,
  605,
  chapterOneSource.url,
  {
    "zh-hant": {
      alt: "AION 2 Gameplay Chapter 1 官方遊戲內容宣傳圖",
      caption: "NC Chapter 1 官方圖片；全球版實際首發內容仍以全球版公告與遊戲客戶端為準。",
    },
    en: {
      alt: "Official AION 2 Gameplay Chapter 1 content artwork",
      caption: "Official NC Chapter 1 artwork; the actual global launch build remains controlled by global notices and the live client.",
    },
    ko: {
      alt: "아이온2 게임플레이 챕터 1 공식 콘텐츠 이미지",
      caption: "NC 챕터 1 공식 이미지이며 글로벌 출시 빌드의 실제 콘텐츠는 글로벌 공지와 게임 클라이언트를 기준으로 합니다.",
    },
  },
);

const downloadHero = officialHero(
  "https://blogfiles.ncsoft.net/news/46221784-ff88-4d9c-8333-e121ca5f517c.jpg",
  2000,
  1126,
  regionalLaunchSource.url,
  {
    "zh-hant": {
      alt: "AION 2 Download 與 PURPLE 官方預先安裝宣傳圖",
      caption: "此圖來自韓國與台灣服務的 PURPLE 預先安裝公告；不可當成全球版預載日期。",
    },
    en: {
      alt: "Official AION 2 Download and PURPLE pre-install artwork",
      caption: "This image belongs to the Korea and Taiwan PURPLE pre-install release and does not establish a global preload date.",
    },
    ko: {
      alt: "아이온2 다운로드 및 PURPLE 사전 설치 공식 이미지",
      caption: "한국·대만 PURPLE 사전 설치 공지 이미지이며 글로벌판 사전 다운로드 날짜를 뜻하지 않습니다.",
    },
  },
);

const tierHero = officialHero(
  "https://blogfiles.ncsoft.net/news/95ec7db7-438b-454f-8072-db80f5d5df49.jpg",
  2000,
  1100,
  seasonTwoSource.url,
  {
    "zh-hant": {
      alt: "AION 2 Tier List 方法所參考的官方賽季更新圖",
      caption: "NC 第 2 賽季更新包含職業平衡與分職業排名規則，說明 Tier 判斷必須標示版本與玩法。",
    },
    en: {
      alt: "Official seasonal update artwork used for the AION 2 Tier List methodology",
      caption: "NC's Season 2 update includes class balance and class-specific ranking rules, showing why tier claims need a patch and activity scope.",
    },
    ko: {
      alt: "아이온2 티어 리스트 방법론에 참고한 공식 시즌 업데이트 이미지",
      caption: "NC 시즌2 업데이트에는 직업 밸런스와 직업별 랭킹 규칙이 포함돼 티어 평가에 버전과 콘텐츠 범위가 필요함을 보여 줍니다.",
    },
  },
);

export const trendingIntentContentEntries = [
  {
    section: "database",
    slug: "aion-2-wiki",
    schemaType: "TechArticle",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [globalPlatformSource, steamSource],
    heroImage: globalHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球 PC 版與已標示的韓國／台灣資料",
        en: "AION 2 Global PC plus explicitly labelled Korea/Taiwan records",
        ko: "아이온2 글로벌 PC 및 별도 표기된 한국·대만 자료",
      },
    },
    related: [
      { kind: "content", section: "classes", slug: "base-class-roster" },
      { kind: "content", section: "guides", slug: "interactive-map-quickstart" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "tool", toolSlug: "map" },
      { kind: "tool", toolSlug: "material-calculator" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 7, {
        eyebrow: "資料中心",
        title: "AION 2 Wiki：職業、物品、地圖、製作與全球版資料中心",
        description: "AION 2 Wiki 入口整合職業、物品資料庫、互動地圖、製作計算器、全球版資訊與來源日期，並清楚區分全球版和韓國／台灣現行資料。",
        intro: "AION 2 Wiki 是 KINA 的可查證內容索引，不是 NC 官方 Wiki。它把本站已完成的職業、物品、地圖、製作、攻略與全球版頁面串在一起，讓你先找到正確資料類型，再查看服務地區、更新日期與第一手來源。",
        sourceNote: "2026 年 7 月 26 日依 NC 全球平台公告與 Steam 官方商店頁核對全球版範圍；個別遊戲數值仍以各資料頁標示的版本和來源為準。",
        keywords: ["AION 2 Wiki", "AION2 Wiki", "AION 2 database", "AION 2 items", "AION 2 map"],
        sections: [
          {
            id: "what-this-hub-is",
            title: "AION 2 Wiki 可以查到什麼？",
            paragraphs: [
              "這個 AION 2 Wiki 以主題分流：職業頁負責角色定位與操作框架，物品資料庫保留官方 ID 與分類，互動地圖處理位置和篩選，製作工具計算材料需求，攻略頁則解釋版本、條件與使用方法。不同類型不會被混成一張缺少日期的總表。",
              "全球版資料以 NC 全球公告和 Steam 頁為基礎；韓國／台灣已上線版本的系統或數值只有在頁面明確標示地區時才會引用。這能避免把現行亞洲服務的內容直接宣稱為全球首發配置。",
            ],
            table: {
              caption: "AION 2 Wiki 主題入口",
              headers: ["主題", "適合查詢", "核對重點"],
              rows: [
                { header: "職業", cells: ["角色定位、武器、操作與攻略", "版本與玩法情境"] },
                { header: "物品", cells: ["官方 ID、分類、說明與圖示", "語言名稱與服務地區"] },
                { header: "互動地圖", cells: ["點位、座標、類型和路線", "地圖版本與收集狀態"] },
                { header: "製作", cells: ["配方與材料需求試算", "遊戲內目前配方"] },
                { header: "全球版", cells: ["平台、日期、伺服器與購買資訊", "NC／Steam 最新公告"] },
              ],
            },
          },
          {
            id: "official-scope",
            title: "哪些內容是官方確認，哪些是 KINA 整理？",
            paragraphs: [
              "NC 與 Steam 能確認的資料會保留來源標籤、來源發布日與本站核對日。KINA 製作的分類、比較、路線和計算方式屬於編輯整理，不會被描述成 NC 官方推薦。",
              "沒有官方答案的欄位會顯示未知、尚未公布或需要在遊戲內核對。未知不代表數值為零，也不代表功能一定不存在；它只表示目前來源不足以支撐肯定結論。",
            ],
            bullets: [
              "優先使用 NC 官方公告、官方資料頁與 Steam 官方商店頁。",
              "物品和點位名稱跨語言不同時，用 ID、圖示、分類和上下文核對。",
              "即時價格、機率、活動和伺服器狀態以目前遊戲或最新營運公告為準。",
            ],
          },
          {
            id: "use-the-hub",
            title: "如何使用 AION 2 Wiki 找到答案？",
            paragraphs: [
              "先把問題縮成「我要查哪個地區、哪個版本、哪一類資料」。例如想準備全球版，先看平台、系統需求和下載頁；想查一件物品，使用物品名稱或官方 ID；想規劃收集路線，再前往相同地圖的類型篩選。",
            ],
            steps: [
              { title: "選擇服務範圍", description: "先分清全球版、韓國或台灣／香港／澳門服務。" },
              { title: "選擇資料類型", description: "職業、物品、地圖、製作、攻略和新聞各自處理不同問題。" },
              { title: "查看日期與來源", description: "先閱讀更新日期和來源，再套用數值、路線或建議。" },
              { title: "回到遊戲核對", description: "涉及即時狀態、價格、機率或活動時，用目前客戶端作最後確認。" },
            ],
          },
          {
            id: "what-is-not-included",
            title: "AION 2 Wiki 不會收錄哪些未證實內容？",
            paragraphs: [
              "本站不會把搜尋熱度、社群傳言、未標版本的試算表或第三方影片本身當成官方事實，也不會捏造全球版伺服器人口、主機支援、手機支援、職業 Tier 或未公布的掉落率。",
              "若目前只有韓國／台灣資料，頁面會保留該服務標示；待全球版有官方資料後，再建立同一內容身份下的全球版欄位，而不是無聲覆蓋舊版本。",
            ],
          },
          {
            id: "wiki-faq",
            title: "AION 2 Wiki 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 Wiki 是 NC 官方網站嗎？", answer: "不是。這是 AION2 KINA 由 PFG 編輯的資料中心，官方事實會連結到 NC 或 Steam 第一手來源。" },
              { question: "AION 2 Wiki 的全球版資料可以直接套用韓國版嗎？", answer: "不一定。每頁會標示服務地區；全球版尚未確認的數值不能由韓國／台灣版本直接推定。" },
              { question: "資料錯誤時應以哪裡為準？", answer: "以目前遊戲客戶端和較新的官方公告為準，並附頁面、版本、日期和可核對欄位回報更正。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 7, {
        eyebrow: "DATA HUB",
        title: "AION 2 Wiki: Classes, Items, Maps, Crafting & Global Guides",
        description: "Use the AION 2 Wiki hub for classes, the item database, interactive maps, crafting calculators, global-release guides, source dates, and clear regional scope.",
        intro: "Answer first: AION 2 Wiki is KINA's source-aware content index, not an official NC wiki. It connects the site's class, item, map, crafting, guide, and global-release pages so you can choose the right data type before checking region, update date, and primary source.",
        sourceNote: "Global scope last checked July 26, 2026 against NC's platform announcement and the official Steam page. Individual values remain tied to the region, version, and sources shown on each record.",
        keywords: ["AION 2 Wiki", "AION2 Wiki", "AION 2 database", "AION 2 items", "AION 2 map"],
        sections: [
          {
            id: "what-this-hub-is",
            title: "What can you find in the AION 2 Wiki?",
            paragraphs: [
              "This AION 2 Wiki separates jobs by data type. Class pages cover roles and play patterns, the item database preserves official IDs and categories, interactive maps handle locations and filters, crafting tools calculate material needs, and guides explain conditions, versions, and practical use. They are not flattened into one undated spreadsheet.",
              "Global information is based on NC's global announcements and the Steam page. Systems or values from the live Korea and Taiwan services appear only when their region is explicitly labelled, preventing a current Asian build from being presented as a confirmed global launch build.",
            ],
            table: {
              caption: "AION 2 Wiki topic directory",
              headers: ["Topic", "Use it for", "Check first"],
              rows: [
                { header: "Classes", cells: ["Roles, weapons, controls, and guides", "Patch and activity context"] },
                { header: "Items", cells: ["Official ID, category, description, and icon", "Localized name and region"] },
                { header: "Interactive map", cells: ["Points, coordinates, types, and routes", "Map version and collection state"] },
                { header: "Crafting", cells: ["Recipes and material estimates", "Current in-game recipe"] },
                { header: "Global release", cells: ["Platforms, dates, servers, and purchases", "Latest NC or Steam notice"] },
              ],
            },
          },
          {
            id: "official-scope",
            title: "Which facts are official and which are KINA editorial work?",
            paragraphs: [
              "Facts supported by NC or Steam retain a source label, source publication date, and KINA verification date. KINA-created grouping, comparisons, routes, and calculations are editorial work and are not described as NC recommendations.",
              "Fields without an official answer remain unknown, unannounced, or marked for in-game verification. Unknown does not mean zero or impossible; it means the available source cannot support a definite answer.",
            ],
            bullets: [
              "Prefer NC announcements, official data pages, and the official Steam listing.",
              "When localized names differ, compare IDs, icons, categories, and context.",
              "Use the current client or latest operations notice for live prices, rates, events, and server state.",
            ],
          },
          {
            id: "use-the-hub",
            title: "How should you use the AION 2 Wiki?",
            paragraphs: [
              "Reduce the question to one region, version, and data type. For global preparation, begin with platforms, requirements, and downloads. For an item, search its name or official ID. For a collection route, open the matching map and then enable only the relevant marker type.",
            ],
            steps: [
              { title: "Choose the service scope", description: "Separate Global from Korea or Taiwan/Hong Kong/Macau service data." },
              { title: "Choose the data type", description: "Classes, items, maps, crafting, guides, and news answer different questions." },
              { title: "Read date and source", description: "Check the update date and evidence before applying a number, route, or recommendation." },
              { title: "Confirm in the client", description: "Use the current client as the final check for live state, prices, rates, and events." },
            ],
          },
          {
            id: "what-is-not-included",
            title: "What does the AION 2 Wiki refuse to invent?",
            paragraphs: [
              "KINA does not treat search interest, rumors, an undated community sheet, or a third-party video as an official fact. The hub will not fabricate global server population, console or mobile support, class tiers, or unpublished drop rates.",
              "When only Korea or Taiwan evidence exists, the page keeps that service label. A later global field can be added under the same content identity after official publication instead of silently overwriting the older regional record.",
            ],
          },
          {
            id: "wiki-faq",
            title: "AION 2 Wiki FAQ",
            paragraphs: [],
            faq: [
              { question: "Is AION 2 Wiki an official NC website?", answer: "No. It is an AION2 KINA data hub edited by PFG. Official claims link to first-party NC or Steam sources." },
              { question: "Can Global players copy Korea values from the AION 2 Wiki?", answer: "Not automatically. Each page identifies its service scope, and an unconfirmed global value cannot be inferred from Korea or Taiwan." },
              { question: "What wins when a record and the game disagree?", answer: "Follow the current client and the newer official notice, then report the page, build, date, and field that can be checked." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 7, {
        eyebrow: "데이터 허브",
        title: "아이온2 위키: 직업·아이템·지도·제작·글로벌 정보 허브",
        description: "아이온2 위키에서 직업, 아이템 데이터베이스, 인터랙티브 지도, 제작 계산기와 글로벌판 정보를 찾고 출처 날짜와 서비스 지역을 확인하세요.",
        intro: "아이온2 위키는 NC 공식 위키가 아니라 KINA가 출처를 표시해 구성한 콘텐츠 색인입니다. 직업, 아이템, 지도, 제작, 공략과 글로벌 출시 페이지를 연결해 먼저 올바른 정보 유형을 고르고 서비스 지역, 업데이트 날짜와 1차 출처를 확인할 수 있습니다.",
        sourceNote: "글로벌 범위는 2026년 7월 26일 NC 플랫폼 발표와 Steam 공식 페이지에서 확인했습니다. 개별 수치는 각 항목에 표시된 지역, 버전과 출처를 따릅니다.",
        keywords: ["아이온2 위키", "AION 2 Wiki", "아이온2 데이터베이스", "아이온2 아이템", "아이온2 지도"],
        sections: [
          {
            id: "what-this-hub-is",
            title: "아이온2 위키에서 무엇을 찾을 수 있나요?",
            paragraphs: [
              "이 아이온2 위키는 정보 유형을 구분합니다. 직업 페이지는 역할과 플레이 흐름, 아이템 데이터베이스는 공식 ID와 분류, 인터랙티브 지도는 위치와 필터, 제작 도구는 재료 수량, 공략은 조건과 버전 및 사용법을 설명합니다. 날짜 없는 하나의 표로 모두 합치지 않습니다.",
              "글로벌 정보는 NC 글로벌 발표와 Steam 페이지를 기준으로 합니다. 한국·대만 라이브 서비스의 시스템이나 수치는 지역이 명확히 표시된 경우에만 사용해 현재 아시아 빌드를 글로벌 출시 빌드로 오해하지 않게 합니다.",
            ],
            table: {
              caption: "아이온2 위키 주제 안내",
              headers: ["주제", "확인할 내용", "먼저 볼 항목"],
              rows: [
                { header: "직업", cells: ["역할, 무기, 조작과 공략", "패치와 콘텐츠 문맥"] },
                { header: "아이템", cells: ["공식 ID, 분류, 설명과 아이콘", "현지화 이름과 지역"] },
                { header: "인터랙티브 지도", cells: ["포인트, 좌표, 유형과 경로", "지도 버전과 수집 상태"] },
                { header: "제작", cells: ["레시피와 재료 예상치", "현재 게임 레시피"] },
                { header: "글로벌 출시", cells: ["플랫폼, 날짜, 서버와 구매", "최신 NC·Steam 공지"] },
              ],
            },
          },
          {
            id: "official-scope",
            title: "공식 사실과 KINA 편집 내용은 어떻게 구분하나요?",
            paragraphs: [
              "NC 또는 Steam으로 확인한 정보에는 출처, 출처 게시일과 KINA 확인일을 남깁니다. KINA가 만든 분류, 비교, 경로와 계산 방식은 편집 자료이며 NC 공식 추천으로 표현하지 않습니다.",
              "공식 답이 없는 필드는 알 수 없음, 미공개 또는 게임 내 재확인으로 표시합니다. 알 수 없음은 0이나 불가능이 아니라 현재 출처로 확정할 수 없다는 뜻입니다.",
            ],
            bullets: [
              "NC 공지, 공식 데이터 페이지와 Steam 공식 상점 페이지를 우선합니다.",
              "언어별 이름이 다르면 ID, 아이콘, 분류와 문맥을 비교합니다.",
              "실시간 가격, 확률, 이벤트와 서버 상태는 현재 클라이언트나 최신 운영 공지를 따릅니다.",
            ],
          },
          {
            id: "use-the-hub",
            title: "아이온2 위키를 어떻게 이용하면 되나요?",
            paragraphs: [
              "질문을 서비스 지역, 버전, 정보 유형으로 좁히세요. 글로벌 준비라면 플랫폼, 사양과 다운로드부터 보고, 아이템은 이름이나 공식 ID로 검색하며, 수집 경로는 같은 지도에서 필요한 마커 유형만 켭니다.",
            ],
            steps: [
              { title: "서비스 범위 선택", description: "글로벌과 한국 또는 대만·홍콩·마카오 서비스 정보를 구분합니다." },
              { title: "정보 유형 선택", description: "직업, 아이템, 지도, 제작, 공략과 뉴스는 서로 다른 질문을 다룹니다." },
              { title: "날짜와 출처 확인", description: "수치, 경로와 추천을 적용하기 전에 업데이트 날짜와 근거를 읽습니다." },
              { title: "클라이언트에서 확인", description: "실시간 상태, 가격, 확률과 이벤트는 현재 게임 화면을 최종 기준으로 합니다." },
            ],
          },
          {
            id: "what-is-not-included",
            title: "아이온2 위키가 만들지 않는 정보는 무엇인가요?",
            paragraphs: [
              "검색 관심도, 소문, 날짜 없는 커뮤니티 표나 제3자 영상만으로 공식 사실을 만들지 않습니다. 글로벌 서버 인구, 콘솔·모바일 지원, 직업 티어와 미공개 드롭 확률도 지어내지 않습니다.",
              "한국 또는 대만 근거만 있으면 해당 서비스 표시를 유지합니다. 글로벌 공식 자료가 나온 뒤 같은 콘텐츠에 글로벌 필드를 추가하며 이전 지역 기록을 조용히 덮어쓰지 않습니다.",
            ],
          },
          {
            id: "wiki-faq",
            title: "아이온2 위키 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "아이온2 위키는 NC 공식 사이트인가요?", answer: "아닙니다. PFG가 편집하는 AION2 KINA 데이터 허브이며 공식 주장은 NC 또는 Steam 1차 출처로 연결합니다." },
              { question: "한국 수치를 글로벌판에 그대로 적용해도 되나요?", answer: "그렇지 않습니다. 각 페이지의 서비스 범위를 확인하고 한국·대만 자료로 미확인 글로벌 수치를 추정하지 마세요." },
              { question: "사이트 정보와 게임이 다르면 무엇을 따라야 하나요?", answer: "현재 클라이언트와 더 최신 공식 공지를 따르고 페이지, 빌드, 날짜와 확인 가능한 필드를 함께 제보해 주세요." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "aion-2-gameplay",
    schemaType: "Article",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    readingMinutes: 8,
    publication: publishedVerified,
    sources: [steamSource, globalPlatformSource, chapterOneSource],
    heroImage: gameplayHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球 PC 版；韓國／台灣現行內容另行標示",
        en: "AION 2 Global PC; live Korea/Taiwan examples are labelled separately",
        ko: "아이온2 글로벌 PC, 한국·대만 라이브 예시는 별도 표기",
      },
    },
    related: [
      { kind: "content", section: "classes", slug: "base-class-roster" },
      { kind: "content", section: "classes", slug: "class-choice-guide" },
      { kind: "content", section: "guides", slug: "elyos-vs-asmodians" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "database", slug: "aion-2-wiki" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 8, {
        eyebrow: "全球版玩法總覽",
        title: "AION 2 Gameplay：飛行戰鬥、職業、PvE、PvP 與探索玩法",
        description: "AION 2 Gameplay 總覽整理官方確認的自由飛行、立體戰鬥、八個職業、單人與 5／10 人 PvE、深淵陣營戰和角色自訂。",
        intro: "AION 2 Gameplay 的核心是把飛行、立體空間與手動戰鬥放進 MMORPG 的探索和陣營衝突。Steam 全球頁確認全球版為 PC 遊戲，包含八個職業、超過 200 個副本、單人與 5／10 人內容；全球首發實際開放清單仍以全球版客戶端與後續公告為準。",
        sourceNote: "2026 年 7 月 26 日依 NC 全球平台公告、Steam 官方頁和 NC Chapter 1 新聞核對。Chapter 1 細節屬韓國／台灣現行服務範例，不代表全球首發完整複製。",
        keywords: ["AION 2 Gameplay", "AION2 gameplay", "AION 2 combat", "AION 2 PvE", "AION 2 PvP"],
        sections: [
          {
            id: "quick-answer",
            title: "AION 2 Gameplay 玩起來是什麼類型？",
            paragraphs: [
              "官方把 AION 2 定位為以天空為戰場的 Unreal Engine 5 MMORPG。玩家選擇天族或魔族，成為 Daeva，在地面與空中探索、戰鬥、收集和參與陣營戰。飛行不是單純的移動動畫，而是定位、取得高度、探索和作戰的一部分。",
              "戰鬥強調精準操作、技能時機和站位，而不是只描述成固定循環。職業可依技能和配置調整玩法，但全球版首發平衡、技能數值與最佳配置尚不能由目前亞洲服務直接推定。",
            ],
          },
          {
            id: "world-flight",
            title: "自由飛行如何改變探索與戰鬥？",
            paragraphs: [
              "Steam 說明世界規模為初代的 36 倍，區域、戰場和遭遇以立體空間設計。玩家可以升高、轉向和從不同高度接近目標，因此地圖閱讀不只看平面距離，也要注意垂直位置、可進入區域和飛行路線。",
              "官方頁亦把坐騎列為可收集內容，並把收集、成長與移動放在同一套世界體驗中。實際飛行限制、區域條件、坐騎取得方式與全球首發內容應由遊戲內教學和全球版資料再次確認。",
            ],
          },
          {
            id: "combat-classes",
            title: "八個職業與手動戰鬥怎麼選？",
            paragraphs: [
              "Steam 全球頁列出八個職業，本站職業中心再按官方角色與武器整理 Gladiator、Templar、Assassin、Ranger、Sorcerer、Spiritmaster、Cleric 與 Chanter。選擇時應先看距離、節奏、隊伍責任和失誤恢復，而不是使用沒有版本的 Tier List。",
              "NC 現行服務更新顯示職業和技能會因賽季調整。這說明一個玩法結論必須附活動類型、版本日期、裝備條件和測試情境；全球上線前無法以韓國／台灣排行榜證明全球版最強職業。",
            ],
          },
          {
            id: "pve-pvp",
            title: "AION 2 PvE、PvP 和休閒內容有哪些？",
            paragraphs: [
              "Steam 官方頁描述超過 200 個副本，包含單人挑戰、5 人隊伍與 10 人團隊內容，另有賽季挑戰、排名和開放世界活動。具體副本規則、配對與中途補位方式仍須以全球版實際營運資料為準。",
              "PvP 的核心包含天族與魔族衝突及深淵；但精確配對、跨服、數值平衡、開放時段與全球首發模式仍應等待全球版營運資料。官方也介紹 Shugo Festival 小遊戲和角色外觀收集，表示玩法不只限於副本和陣營戰。",
            ],
            bullets: [
              "PvE：單人、5 人、10 人副本與開放世界活動。",
              "PvP：陣營衝突、深淵和已公布的競爭內容。",
              "探索：自由飛行、立體地形、收集與坐騎。",
              "休閒：角色自訂、服裝、翅膀、寵物與迷你遊戲。",
            ],
          },
          {
            id: "global-boundary",
            title: "全球版 Gameplay 哪些細節仍未確認？",
            paragraphs: [
              "全球版已確認 PC、Steam／PURPLE、十種語言和四個營運地區。全球首發的完整副本清單、賽季狀態、職業平衡、經濟、每日／每週限制、伺服器名稱和精確開服時間仍需較新的全球公告。",
              "看到韓國／台灣 Chapter 1、Season 2 或活動資料時，可以用來理解系統可能如何運作，但不能刪除地區標籤後當成全球首發保證。",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Gameplay 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 是動作 MMORPG 嗎？", answer: "官方強調手動戰鬥、精準操作、時機、站位和立體飛行；Steam 將其列為動作、冒險、MMO 與 RPG。" },
              { question: "AION 2 有單人內容嗎？", answer: "有。Steam 官方頁確認單人副本，也列出 5 人和 10 人 PvE 內容。" },
              { question: "AION 2 全球版會完整複製韓國版嗎？", answer: "官方尚未保證完整複製。韓國／台灣現行內容只能作為有地區標示的參考。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 8, {
        eyebrow: "GLOBAL GAMEPLAY OVERVIEW",
        title: "AION 2 Gameplay: Flight Combat, Classes, PvE, PvP & Exploration",
        description: "This AION 2 Gameplay overview covers official 3D flight, combat, eight classes, solo and 5/10-player PvE, faction PvP, exploration, and customization.",
        intro: "Answer first: AION 2 Gameplay places flight, vertical space, and manual combat inside MMORPG exploration and faction conflict. The global Steam page confirms a PC game with eight classes, more than 200 dungeons, and solo plus 5/10-player formats. The exact global launch roster still depends on the global client and later notices.",
        sourceNote: "Last checked July 26, 2026 against NC's global platform release, the official Steam page, and NC's Chapter 1 release. Chapter 1 details describe the live Korea/Taiwan service and do not guarantee an identical global launch build.",
        keywords: ["AION 2 Gameplay", "AION2 gameplay", "AION 2 combat", "AION 2 PvE", "AION 2 PvP"],
        sections: [
          {
            id: "quick-answer",
            title: "What kind of game is AION 2 Gameplay?",
            paragraphs: [
              "NC presents AION 2 as an Unreal Engine 5 MMORPG where the sky is a battlefield. You choose Elyos or Asmodians, become a Daeva, and explore, fight, collect, and join faction conflict on the ground and in the air. Flight is not only a travel animation; it contributes to positioning, altitude, exploration, and combat.",
              "Combat emphasizes precision, skill timing, and positioning rather than being described as one fixed rotation. Classes can be customized through skills and builds, but global launch balance, exact values, and best builds cannot be inferred from the current Asian services.",
            ],
          },
          {
            id: "world-flight",
            title: "How does free flight change exploration and combat?",
            paragraphs: [
              "Steam describes a world 36 times larger than the original and says regions, battlefields, and encounters are designed around vertical space. Players can climb, turn, and approach from different heights, so map reading involves elevation, access, and flight routes as well as flat distance.",
              "The official page also lists mounts as collectible content and places collection, progression, and movement within the same world experience. Actual flight restrictions, regional conditions, mount-acquisition methods, and the global launch selection require in-game and global-release confirmation.",
            ],
          },
          {
            id: "combat-classes",
            title: "How do the eight classes and manual combat differ?",
            paragraphs: [
              "The global Steam page names eight classes. KINA's class hub organizes the official roles and weapons for Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter. Choose by range, pace, party responsibility, and error recovery instead of an undated tier list.",
              "NC's live-service releases show that classes and skills change by season. Any conclusion therefore needs an activity, patch date, gear condition, and test context. A Korea/Taiwan ranking cannot prove the strongest global class before launch.",
            ],
          },
          {
            id: "pve-pvp",
            title: "What PvE, PvP, and side activities are confirmed?",
            paragraphs: [
              "Steam describes more than 200 dungeons across solo challenges, five-player parties, and ten-player groups, plus seasonal challenges, rankings, and open-world events. Exact dungeon rules, matchmaking, and mid-run replacement behavior still require Global operations data.",
              "PvP centers on Elyos–Asmodian conflict and the Abyss, but exact matchmaking, cross-server rules, balance, schedules, and global launch modes still need global operations data. The official page also presents Shugo Festival minigames and character collection, so the game is not limited to dungeons and faction war.",
            ],
            bullets: [
              "PvE: solo, five-player, and ten-player dungeons plus open-world events.",
              "PvP: faction conflict, the Abyss, and announced competitive content.",
              "Exploration: free flight, vertical terrain, collection, and mounts.",
              "Side activities: customization, outfits, wings, pets, and minigames.",
            ],
          },
          {
            id: "global-boundary",
            title: "Which global gameplay details remain unconfirmed?",
            paragraphs: [
              "Global PC, Steam/PURPLE, ten languages, and four operating regions are confirmed. The complete launch dungeon list, season state, class balance, economy, daily or weekly limits, server names, and exact opening hour need newer global notices.",
              "Korea/Taiwan Chapter 1, Season 2, or event data can illustrate how a system currently works, but it cannot lose its regional label and become a global launch promise.",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Gameplay FAQ",
            paragraphs: [],
            faq: [
              { question: "Is AION 2 an action MMORPG?", answer: "NC emphasizes manual combat, precision, timing, positioning, and vertical flight. Steam categorizes it as Action, Adventure, MMO, and RPG." },
              { question: "Does AION 2 have solo content?", answer: "Yes. The official Steam page confirms solo dungeons alongside five-player and ten-player PvE." },
              { question: "Will Global copy the Korea version exactly?", answer: "NC has not promised an identical build. Live Korea/Taiwan content is useful only when its regional scope remains visible." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 8, {
        eyebrow: "글로벌 게임플레이 개요",
        title: "아이온2 게임플레이: 비행 전투·직업·PvE·PvP·탐험",
        description: "아이온2 게임플레이의 자유 비행, 입체 전투, 8개 직업, 솔로·5인·10인 PvE, 진영 PvP, 탐험과 커스터마이징을 공식 자료로 정리합니다.",
        intro: "아이온2 게임플레이는 비행, 입체 공간과 수동 전투를 MMORPG 탐험과 진영 대립에 결합합니다. 글로벌 Steam 페이지는 PC 게임, 8개 직업, 200개가 넘는 던전, 솔로와 5인·10인 콘텐츠를 확인합니다. 글로벌 출시 빌드의 정확한 구성은 글로벌 클라이언트와 후속 공지가 기준입니다.",
        sourceNote: "2026년 7월 26일 NC 글로벌 플랫폼 발표, Steam 공식 페이지와 NC 챕터 1 보도자료에서 확인했습니다. 챕터 1 세부 정보는 한국·대만 라이브 서비스 사례이며 글로벌 출시 빌드의 동일 구성을 보장하지 않습니다.",
        keywords: ["아이온2 게임플레이", "AION 2 Gameplay", "아이온2 전투", "아이온2 PvE", "아이온2 PvP"],
        sections: [
          {
            id: "quick-answer",
            title: "아이온2 게임플레이는 어떤 게임인가요?",
            paragraphs: [
              "NC는 아이온2를 하늘이 전장이 되는 Unreal Engine 5 MMORPG로 소개합니다. 천족 또는 마족을 선택해 데바가 되고 지상과 공중에서 탐험, 전투, 수집과 진영전을 즐깁니다. 비행은 이동 연출에 그치지 않고 위치 선정, 고도, 탐험과 전투에 관여합니다.",
              "전투는 고정된 반복보다 정밀 조작, 스킬 타이밍과 위치 선정을 강조합니다. 스킬과 빌드로 직업을 조정할 수 있지만 글로벌 출시 밸런스, 정확한 수치와 최적 빌드는 현재 아시아 서비스에서 추정할 수 없습니다.",
            ],
          },
          {
            id: "world-flight",
            title: "자유 비행은 탐험과 전투를 어떻게 바꾸나요?",
            paragraphs: [
              "Steam은 원작보다 36배 큰 세계와 입체 공간을 축으로 설계한 지역, 전장과 전투를 설명합니다. 높이를 올리고 방향을 바꾸며 다른 고도에서 접근할 수 있어 지도는 평면 거리뿐 아니라 높이, 진입 조건과 비행 경로도 읽어야 합니다.",
              "공식 페이지는 탈것을 수집 가능한 콘텐츠로 소개하며 수집, 성장과 이동을 같은 세계 경험 안에 둡니다. 실제 비행 제한, 지역 조건, 탈것 획득 방식과 글로벌 출시 콘텐츠는 게임 내 안내와 글로벌 자료로 다시 확인해야 합니다.",
            ],
          },
          {
            id: "combat-classes",
            title: "8개 직업과 수동 전투는 어떻게 고르나요?",
            paragraphs: [
              "글로벌 Steam 페이지는 8개 직업을 안내합니다. KINA 직업 허브는 검성, 수호성, 살성, 궁성, 마도성, 정령성, 치유성과 호법성의 공식 역할과 무기를 정리합니다. 날짜 없는 티어표보다 거리, 속도, 파티 책임과 실수 회복을 기준으로 고르세요.",
              "NC 라이브 서비스 업데이트는 직업과 스킬이 시즌에 따라 조정됨을 보여 줍니다. 판단에는 콘텐츠, 패치 날짜, 장비 조건과 테스트 문맥이 필요하며 한국·대만 랭킹으로 글로벌 최강 직업을 증명할 수 없습니다.",
            ],
          },
          {
            id: "pve-pvp",
            title: "어떤 PvE, PvP와 부가 콘텐츠가 확인됐나요?",
            paragraphs: [
              "Steam은 솔로 도전, 5인 파티와 10인 그룹 형식의 200개 이상 던전, 시즌 도전, 랭킹과 오픈 월드 이벤트를 설명합니다. 세부 던전 규칙, 매칭과 중도 인원 보충 방식은 글로벌 운영 자료로 확인해야 합니다.",
              "PvP는 천족·마족 대립과 어비스가 중심이지만 정확한 매칭, 서버 간 규칙, 밸런스, 일정과 글로벌 출시 모드는 글로벌 운영 자료가 필요합니다. 슈고 페스타 미니게임과 캐릭터 수집도 있어 던전과 진영전만 있는 게임은 아닙니다.",
            ],
            bullets: [
              "PvE: 솔로, 5인, 10인 던전과 오픈 월드 이벤트.",
              "PvP: 진영 대립, 어비스와 공개된 경쟁 콘텐츠.",
              "탐험: 자유 비행, 입체 지형, 수집과 탈것.",
              "부가 활동: 커스터마이징, 의상, 날개, 펫과 미니게임.",
            ],
          },
          {
            id: "global-boundary",
            title: "글로벌 게임플레이에서 아직 확인되지 않은 것은?",
            paragraphs: [
              "글로벌 PC, Steam·PURPLE, 10개 언어와 4개 운영 지역은 확인됐습니다. 전체 출시 던전, 시즌 상태, 직업 밸런스, 경제, 일일·주간 제한, 서버 이름과 정확한 오픈 시각은 새 글로벌 공지가 필요합니다.",
              "한국·대만 챕터 1, 시즌2와 이벤트 자료는 시스템의 현재 모습을 이해하는 사례지만 지역 표시를 없애 글로벌 출시 보장으로 바꿀 수 없습니다.",
            ],
          },
          {
            id: "faq",
            title: "아이온2 게임플레이 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "아이온2는 액션 MMORPG인가요?", answer: "NC는 수동 전투, 정밀 조작, 타이밍, 위치 선정과 입체 비행을 강조하며 Steam은 액션·어드벤처·MMO·RPG로 분류합니다." },
              { question: "아이온2에 솔로 콘텐츠가 있나요?", answer: "있습니다. Steam 공식 페이지는 솔로 던전과 5인·10인 PvE를 확인합니다." },
              { question: "글로벌판은 한국판과 완전히 같나요?", answer: "NC는 동일 빌드를 약속하지 않았습니다. 한국·대만 자료는 서비스 지역을 표시한 참고 자료로만 사용해야 합니다." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "aion-2-download",
    schemaType: "TechArticle",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [globalPlatformSource, steamSource, regionalLaunchSource],
    heroImage: downloadHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球 PC 版下載狀態；韓國／台灣 PURPLE 流程僅作地區範例",
        en: "AION 2 Global PC download status; Korea/Taiwan PURPLE flow is a labelled regional example",
        ko: "아이온2 글로벌 PC 다운로드 상태, 한국·대만 PURPLE 절차는 지역 사례",
      },
    },
    primaryAction: {
      id: "open-official-aion2-steam-page",
      href: steamSource.url,
      sourceId: steamSource.id,
      translations: {
        "zh-hant": {
          eyebrow: "官方下載狀態",
          title: "先從官方 Steam 頁確認全球版狀態",
          description: "Steam 全球頁可核對系統需求、語言與商店狀態；目前沒有足夠官方資料證明遊戲檔案或全球 PURPLE 預載已開放。",
          label: "開啟 AION 2 官方 Steam 頁",
          note: "PURPLE 全球版安裝頁或預載日期公布後，本站會再加入經核對的官方入口。",
          facts: [
            { label: "全球平台", value: "Steam／PURPLE（Windows PC）" },
            { label: "儲存空間", value: "100 GB 可用空間" },
            { label: "全球預載", value: "尚未公布" },
          ],
        },
        en: {
          eyebrow: "OFFICIAL DOWNLOAD STATUS",
          title: "Check the official Steam page before downloading",
          description: "The Global Steam page confirms requirements, languages, and store status. It does not yet prove that game files or a Global PURPLE preload are available.",
          label: "Open the official AION 2 Steam page",
          note: "KINA will add the verified Global PURPLE installer or preload notice after NC publishes it.",
          facts: [
            { label: "Global platforms", value: "Steam / PURPLE on Windows PC" },
            { label: "Storage", value: "100 GB available space" },
            { label: "Global preload", value: "Not announced" },
          ],
        },
        ko: {
          eyebrow: "공식 다운로드 상태",
          title: "다운로드 전 공식 Steam 페이지를 확인하세요",
          description: "글로벌 Steam 페이지에서 요구 사양, 언어와 상점 상태를 확인할 수 있습니다. 게임 파일이나 글로벌 PURPLE 사전 다운로드가 열렸다는 뜻은 아닙니다.",
          label: "AION 2 공식 Steam 페이지 열기",
          note: "NC가 글로벌 PURPLE 설치 페이지나 사전 다운로드 일정을 공개하면 검증된 공식 경로를 추가합니다.",
          facts: [
            { label: "글로벌 플랫폼", value: "Steam·PURPLE Windows PC" },
            { label: "저장 공간", value: "100GB 여유 공간" },
            { label: "글로벌 사전 다운로드", value: "미발표" },
          ],
        },
      },
    },
    related: [
      { kind: "content", section: "guides", slug: "steam-vs-purple" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "guides", slug: "scam-check" },
      { kind: "content", section: "guides", slug: "early-access" },
      { kind: "content", section: "database", slug: "aion-2-wiki" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 7, {
        eyebrow: "全球版安裝準備",
        title: "AION 2 Download：Steam／PURPLE 官方下載、預載與安裝指南",
        description: "AION 2 Download 指南整理全球版 Steam 與 PURPLE 官方入口、100 GB 空間需求、安全檢查，以及尚未公布的全球預載時間和檔案大小。",
        intro: "AION 2 Download 的全球版官方渠道已確認為 Steam 和 PURPLE，但截至 2026 年 7 月 26 日，NC 尚未公布全球版預先下載日期、精確開放時間或實際壓縮下載大小。現在能做的是確認平台、準備 Windows PC 與 100 GB 可用空間，並只從官方入口取得安裝程式。",
        sourceNote: "依 NC 全球 PC 平台公告、Steam 官方商店頁及韓國／台灣 PURPLE 預先安裝公告核對。後者只說明已上線地區曾使用的流程，不是全球版預載日期。",
        keywords: ["AION 2 Download", "AION2 download", "AION 2 PURPLE download", "AION 2 Steam download", "PURPLE Launcher"],
        sections: [
          {
            id: "current-status",
            title: "AION 2 Download 現在可以下載全球版嗎？",
            paragraphs: [
              "官方已確認全球版會透過 Steam 和 PURPLE 提供 PC 版本。Steam 頁目前列出 2026 年 9 月、9 月 30 日 Advance Access 與 Founder’s Pack，但這些欄位不等於全球遊戲檔案已開放下載。",
              "截至本站核對時間，官方來源沒有公布全球預載日期、啟動時刻、下載壓縮大小或 PURPLE 全球版的逐步安裝頁。不要把韓國／台灣 2025 年 11 月的 PURPLE 預載公告改寫成全球版時程。",
            ],
          },
          {
            id: "official-channels",
            title: "Steam 與 PURPLE 兩個官方渠道有何不同？",
            paragraphs: [
              "Steam 商店可查看全球版頁面、系統需求、語言、Founder’s Pack 與商店狀態；PURPLE 是 NC 自有平台。NC 已確認兩者都是全球 PC 版渠道，但帳號連結、跨平台進度、購買歸屬、退款和預載流程需以各平台接近上線時的規則為準。",
              "若選擇 Steam，從 Steam 用戶端中的 AION 2 商店頁安裝；若選擇 PURPLE，應從 NC 全球官方站導向的 PURPLE 入口安裝。KINA 不鏡像安裝檔，也不提供所謂高速下載器。",
            ],
            table: {
              caption: "AION 2 全球版下載渠道",
              headers: ["渠道", "已確認", "仍需等待"],
              rows: [
                { header: "Steam", cells: ["全球 PC 渠道、商店頁與 PC 需求", "預載按鈕開放時間與實際下載大小"] },
                { header: "PURPLE", cells: ["NC 公布的全球 PC 渠道", "全球版專用安裝流程與預載時間"] },
              ],
            },
          },
          {
            id: "safe-steps",
            title: "如何安全完成 AION 2 Download？",
            paragraphs: [
              "下載前先從手動輸入或可信書籤開啟 NC 全球站或 Steam，避免從私訊短網址、搜尋廣告仿冒頁或第三方檔案站取得安裝程式。Logo、HTTPS 與相似網域都不能單獨證明檔案由 NC 發布。",
            ],
            steps: [
              { title: "確認平台頁", description: "Steam 應為 app/3393110；PURPLE 應從 NC 官方全球站導向。" },
              { title: "核對系統需求", description: "準備 Windows 10／11 64-bit、DirectX 12 和 100 GB 可用空間，SSD 為官方建議。" },
              { title: "等待官方按鈕", description: "只有官方客戶端顯示可安裝或 NC 公告預載後才開始下載。" },
              { title: "保留平台紀錄", description: "購買、退款、帳號與安裝問題保留平台訂單和官方錯誤訊息，不公開密碼或驗證碼。" },
            ],
          },
          {
            id: "regional-difference",
            title: "為什麼韓國／台灣 PURPLE 下載頁不能直接套用？",
            paragraphs: [
              "韓國／台灣服務在 2025 年 11 月透過 PURPLE 開放預先安裝；該公告記錄的是當地服務流程。NC 2026 年 4 月對全球版的公告則明確寫成 Steam／PURPLE 的 PC 專用版本。",
              "因此，區域版的預載時間與 PURPLE 步驟不能取代全球 Steam 的 100 GB 可用空間欄位，也不能證明全球版會提供手機客戶端。每項流程與數字都必須保留服務地區。",
            ],
          },
          {
            id: "unknowns",
            title: "全球版下載還有哪些未知項目？",
            paragraphs: [
              "全球預載日期與時刻、PURPLE 全球安裝頁、實際下載大小、補丁大小、登入前更新、跨平台進度與區域鎖定細節仍未完整公布。這些欄位應等待官方資料，而不是用倒數或其他地區流程猜測。",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Download 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 全球版現在可以預載嗎？", answer: "截至 2026 年 7 月 26 日，本站核對的官方來源尚未公布全球預載日期或開放時刻。" },
              { question: "AION 2 Download 需要多少空間？", answer: "Steam 全球頁要求 100 GB 可用空間並建議 SSD；這不是實際壓縮下載大小。" },
              { question: "可以從 KINA 下載 PURPLE 嗎？", answer: "不可以。KINA 不保存或轉發安裝程式，只應從 NC 官方入口取得 PURPLE。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 7, {
        eyebrow: "GLOBAL INSTALL PREPARATION",
        title: "AION 2 Download: Official Steam/PURPLE, Preload & Install Guide",
        description: "The AION 2 Download guide covers official Steam and PURPLE channels, the 100 GB requirement, safe installation, and the unannounced global preload.",
        intro: "Answer first: AION 2 Download channels for Global are confirmed as Steam and PURPLE, but as of July 26, 2026 NC has not published a global preload date, exact opening hour, or compressed download size. You can choose a platform, prepare a Windows PC and 100 GB of free space, and obtain installers only from official entry points.",
        sourceNote: "Checked against NC's global PC announcement, the official Steam page, and the Korea/Taiwan PURPLE pre-install release. The regional release illustrates a past live-service flow and is not a global preload schedule.",
        keywords: ["AION 2 Download", "AION2 download", "AION 2 PURPLE download", "AION 2 Steam download", "PURPLE Launcher"],
        sections: [
          {
            id: "current-status",
            title: "Can you download AION 2 Global now?",
            paragraphs: [
              "NC confirms Steam and PURPLE as the two PC channels for Global. Steam currently displays September 2026, September 30 Advance Access, and Founder's Packs, but those store fields do not mean the global game files are already available.",
              "At the verification time, official sources had not published a global preload date, launch hour, compressed download size, or step-by-step PURPLE Global install page. The November 2025 Korea/Taiwan PURPLE preload release must not be reused as a global schedule.",
            ],
          },
          {
            id: "official-channels",
            title: "How do the official Steam and PURPLE channels differ?",
            paragraphs: [
              "Steam exposes the global store page, system requirements, languages, Founder's Packs, and store status. PURPLE is NC's own platform. Both are confirmed Global PC channels, while account linking, cross-platform progress, purchase ownership, refunds, and preload details remain controlled by each platform's launch-time rules.",
              "On Steam, install from the AION 2 page inside the Steam client. For PURPLE, use the entry reached from NC's official global site. KINA does not mirror an installer or provide a special download accelerator.",
            ],
            table: {
              caption: "AION 2 Global download channels",
              headers: ["Channel", "Confirmed", "Still pending"],
              rows: [
                { header: "Steam", cells: ["Global PC channel, store page, and PC requirements", "Preload button timing and actual download size"] },
                { header: "PURPLE", cells: ["NC-announced Global PC channel", "Global install flow and preload timing"] },
              ],
            },
          },
          {
            id: "safe-steps",
            title: "How do you complete an AION 2 Download safely?",
            paragraphs: [
              "Open NC's global site or Steam from a typed address or trusted bookmark. Avoid unsolicited short links, lookalike search ads, and file-hosting mirrors. A logo, HTTPS, and a similar domain do not independently prove an installer was published by NC.",
            ],
            steps: [
              { title: "Verify the platform page", description: "Steam should use app/3393110; reach PURPLE through an official NC global entry." },
              { title: "Check the requirements", description: "Prepare 64-bit Windows 10/11, DirectX 12, and 100 GB free; Steam recommends an SSD." },
              { title: "Wait for the official install state", description: "Download only after an official client enables Install or NC announces preload." },
              { title: "Keep platform records", description: "Retain order and official error records for purchase, refund, account, or install support without exposing passwords or codes." },
            ],
          },
          {
            id: "regional-difference",
            title: "Why can’t you copy the Korea/Taiwan PURPLE instructions?",
            paragraphs: [
              "Korea and Taiwan used PURPLE pre-install in November 2025; that announcement records a regional launch flow. NC's April 2026 announcement explicitly describes the Global version as PC-only through Steam and PURPLE.",
              "That means a regional preload time or PURPLE sequence cannot replace Steam's global 100 GB free-space field or prove a Global mobile client. Every process and number needs its service label.",
            ],
          },
          {
            id: "unknowns",
            title: "Which global download details remain unknown?",
            paragraphs: [
              "Global preload date and hour, the PURPLE Global install page, actual download size, patch size, pre-login update, cross-platform progress, and detailed regional restrictions remain incomplete. Wait for official data instead of deriving them from a countdown or another service.",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Download FAQ",
            paragraphs: [],
            faq: [
              { question: "Can I preload AION 2 Global now?", answer: "As of July 26, 2026, the checked official sources had not announced a global preload date or opening hour." },
              { question: "How much space does AION 2 Download need?", answer: "The global Steam page requires 100 GB of free space and recommends an SSD. That is not the compressed download size." },
              { question: "Can I download PURPLE from KINA?", answer: "No. KINA does not host or relay installers. Obtain PURPLE only from an official NC entry point." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 7, {
        eyebrow: "글로벌 설치 준비",
        title: "아이온2 다운로드: Steam·PURPLE 공식 설치와 사전 다운로드",
        description: "아이온2 다운로드의 공식 Steam·PURPLE 경로, 100GB 공간, 안전한 설치와 아직 공개되지 않은 글로벌 사전 다운로드 일정을 확인하세요.",
        intro: "아이온2 다운로드의 글로벌 공식 채널은 Steam과 PURPLE로 확인됐지만 2026년 7월 26일 기준 글로벌 사전 다운로드 날짜, 정확한 오픈 시각과 압축 다운로드 크기는 공개되지 않았습니다. 플랫폼을 고르고 Windows PC와 100GB 여유 공간을 준비하며 설치 파일은 공식 경로에서만 받아야 합니다.",
        sourceNote: "NC 글로벌 PC 발표, Steam 공식 페이지와 한국·대만 PURPLE 사전 설치 보도자료를 확인했습니다. 지역 보도자료는 과거 라이브 서비스 절차이며 글로벌 사전 다운로드 일정이 아닙니다.",
        keywords: ["아이온2 다운로드", "AION 2 Download", "아이온2 PURPLE 다운로드", "아이온2 Steam 다운로드", "퍼플 런처"],
        sections: [
          {
            id: "current-status",
            title: "지금 아이온2 글로벌을 다운로드할 수 있나요?",
            paragraphs: [
              "NC는 Steam과 PURPLE를 글로벌 PC 채널로 확인했습니다. Steam은 2026년 9월, 9월 30일 어드밴스 액세스와 파운더스 팩을 표시하지만 이 상점 정보가 글로벌 게임 파일 다운로드 시작을 뜻하지는 않습니다.",
              "확인 시점의 공식 출처에는 글로벌 사전 다운로드 날짜, 오픈 시각, 압축 다운로드 크기와 PURPLE 글로벌 단계별 설치 페이지가 없었습니다. 2025년 11월 한국·대만 PURPLE 사전 설치 공지를 글로벌 일정으로 바꾸면 안 됩니다.",
            ],
          },
          {
            id: "official-channels",
            title: "Steam과 PURPLE 공식 채널은 무엇이 다른가요?",
            paragraphs: [
              "Steam은 글로벌 상점, 시스템 요구 사항, 언어, 파운더스 팩과 상점 상태를 제공합니다. PURPLE는 NC 자체 플랫폼입니다. 두 채널 모두 글로벌 PC용이지만 계정 연결, 플랫폼 간 진행도, 구매 귀속, 환불과 사전 다운로드 절차는 출시 시점의 각 플랫폼 규칙이 기준입니다.",
              "Steam은 클라이언트 안의 AION 2 페이지에서 설치하고 PURPLE는 NC 글로벌 공식 사이트에서 연결된 경로를 사용하세요. KINA는 설치 파일을 미러링하거나 다운로드 가속기를 제공하지 않습니다.",
            ],
            table: {
              caption: "아이온2 글로벌 다운로드 채널",
              headers: ["채널", "확인된 내용", "추가 발표 필요"],
              rows: [
                { header: "Steam", cells: ["글로벌 PC 채널, 상점과 PC 사양", "사전 다운로드 버튼 시각과 실제 크기"] },
                { header: "PURPLE", cells: ["NC가 발표한 글로벌 PC 채널", "글로벌 설치 절차와 사전 다운로드 시각"] },
              ],
            },
          },
          {
            id: "safe-steps",
            title: "아이온2 다운로드를 안전하게 진행하는 방법",
            paragraphs: [
              "주소를 직접 입력하거나 신뢰하는 북마크로 NC 글로벌 사이트 또는 Steam을 여세요. 메시지 단축 링크, 유사 검색 광고와 파일 공유 미러는 피합니다. 로고, HTTPS와 비슷한 도메인만으로 NC 설치 파일임을 증명할 수 없습니다.",
            ],
            steps: [
              { title: "플랫폼 페이지 확인", description: "Steam은 app/3393110을 사용하고 PURPLE는 NC 글로벌 공식 경로에서 엽니다." },
              { title: "시스템 요구 사항 확인", description: "64비트 Windows 10/11, DirectX 12와 100GB 여유 공간을 준비하며 SSD를 권장합니다." },
              { title: "공식 설치 상태 대기", description: "공식 클라이언트에 설치가 활성화되거나 NC가 사전 다운로드를 발표한 뒤 받습니다." },
              { title: "플랫폼 기록 보관", description: "구매, 환불, 계정과 설치 지원을 위해 주문과 공식 오류를 보관하되 비밀번호나 인증 코드는 공개하지 않습니다." },
            ],
          },
          {
            id: "regional-difference",
            title: "한국·대만 PURPLE 절차를 그대로 적용할 수 없는 이유",
            paragraphs: [
              "한국과 대만 서비스는 2025년 11월 PURPLE 사전 설치를 사용했으며 해당 공지는 지역 출시 절차를 기록합니다. 그러나 NC의 2026년 4월 글로벌 발표는 Steam·PURPLE PC 전용 버전으로 명시합니다.",
              "지역 사전 설치 시간과 PURPLE 절차는 글로벌 Steam의 100GB 여유 공간 요구를 대체하거나 글로벌 모바일 클라이언트를 증명하지 않습니다. 모든 절차와 수치에 서비스 지역을 남겨야 합니다.",
            ],
          },
          {
            id: "unknowns",
            title: "글로벌 다운로드에서 아직 모르는 내용",
            paragraphs: [
              "글로벌 사전 다운로드 날짜와 시각, PURPLE 글로벌 설치 페이지, 실제 다운로드와 패치 크기, 로그인 전 업데이트, 플랫폼 간 진행도와 지역 제한 세부 사항은 미공개입니다. 카운트다운이나 다른 서비스 절차로 추정하지 마세요.",
            ],
          },
          {
            id: "faq",
            title: "아이온2 다운로드 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "지금 아이온2 글로벌을 사전 다운로드할 수 있나요?", answer: "2026년 7월 26일 기준 확인된 공식 출처에는 글로벌 사전 다운로드 날짜와 오픈 시각이 없습니다." },
              { question: "아이온2 다운로드에 공간이 얼마나 필요한가요?", answer: "글로벌 Steam 페이지는 100GB 여유 공간과 SSD 권장을 표시합니다. 이는 압축 다운로드 크기가 아닙니다." },
              { question: "KINA에서 PURPLE를 받을 수 있나요?", answer: "아닙니다. KINA는 설치 파일을 보관하거나 전달하지 않으며 NC 공식 경로에서 받아야 합니다." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "aion-2-platforms",
    schemaType: "TechArticle",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [globalPlatformSource, steamSource, regionalLaunchSource],
    heroImage: globalHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球版平台支援",
        en: "AION 2 Global platform support",
        ko: "아이온2 글로벌 플랫폼 지원",
      },
    },
    related: [
      { kind: "content", section: "guides", slug: "aion-2-download" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "guides", slug: "steam-vs-purple" },
      { kind: "content", section: "news", slug: "global-server-regions" },
      { kind: "content", section: "database", slug: "aion-2-wiki" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 6, {
        eyebrow: "全球版平台確認",
        title: "AION 2 Platforms：PC、PS5、Xbox、手機與 Controller 支援",
        description: "AION 2 Platforms 指南確認全球版目前為 Steam／PURPLE PC 專用；PS5、Xbox、手機、Steam Deck 和 Controller 尚無完整官方支援公告。",
        intro: "答案先說：NC 對 AION 2 全球版的正式描述是透過 Steam 與 PURPLE 提供的 PC 專用版本。PS5、Xbox、Android、iPhone 與原生全球手機版尚未公布；Steam Deck 顯示相容性未知，官方資料也沒有完整確認 Controller 支援。",
        sourceNote: "2026 年 7 月 26 日依 NC 2026 年 4 月全球平台公告和 Steam 官方頁核對；韓國／台灣手機版只作地區差異說明。",
        keywords: ["AION 2 Platforms", "AION 2 PS5", "AION 2 console", "AION 2 controller support", "AION 2 mobile"],
        sections: [
          {
            id: "global-answer",
            title: "AION 2 全球版支援哪些平台？",
            paragraphs: [
              "NC 2026 年 4 月公告寫明全球版以 Steam 和 PURPLE 的 PC 專用平台開發。Steam 亦標示 Windows 10／11 64-bit 系統需求和「PC only」的產品描述。",
              "因此，目前可以肯定回答的是 Windows PC、Steam 與 PURPLE。對其他平台應使用「尚未公布」或「相容性未知」，而不是因為搜尋量上升就建立未證實的推出日期。",
            ],
          },
          {
            id: "platform-matrix",
            title: "PC、主機、手機和 Steam Deck 狀態表",
            paragraphs: [
              "狀態只反映 2026 年 7 月 26 日能在官方資料核對的內容。未公布不代表永久排除，但在 NC 發布新公告前不能寫成支援。",
            ],
            table: {
              caption: "AION 2 全球版平台狀態",
              headers: ["平台", "官方狀態", "依據"],
              rows: [
                { header: "Windows PC", cells: ["已確認", "NC 全球公告與 Steam 系統需求"] },
                { header: "Steam", cells: ["已確認", "NC 全球公告與官方商店頁"] },
                { header: "PURPLE", cells: ["已確認", "NC 全球公告"] },
                { header: "PS5", cells: ["尚未公布", "沒有全球版 PS5 官方公告"] },
                { header: "Xbox", cells: ["尚未公布", "沒有全球版 Xbox 官方公告"] },
                { header: "Android／iPhone", cells: ["全球版尚未公布", "全球公告為 PC 專用；區域版另有手機服務"] },
                { header: "Steam Deck", cells: ["相容性未知", "尚未找到官方 Steam Deck 相容性聲明"] },
              ],
            },
          },
          {
            id: "controller-status",
            title: "AION 2 Controller Support 已確認嗎？",
            paragraphs: [
              "Steam 功能欄目前沒有提供可核對的完整 Controller 支援聲明，也沒有在公開全球頁列出手把配置、按鍵提示、震動或無障礙控制器支援。這不證明手把永遠無法使用，只表示不能把第三方映射或 Steam Input 推測寫成官方支援。",
              "全球版推出後，應分別確認 Steam 商店功能標籤、遊戲內控制選單、NC 操作指南與實機按鍵提示，再區分完整、部分或未支援。",
            ],
          },
          {
            id: "mobile-difference",
            title: "為什麼網路上有 AION 2 Mobile 資料？",
            paragraphs: [
              "韓國／台灣現行服務的官方下載頁提供 Android、iPhone 和平板需求，NC 也曾描述該區域版可在 PC 與手機遊玩。然而全球版的後續官方公告明確採 PC 專用方式。",
              "兩者屬不同服務範圍。區域版存在手機客戶端，不等於全球版已確認 Android 或 iOS；全球版頁面不能混用區域手機需求、商店連結或安裝容量。",
            ],
          },
          {
            id: "future-updates",
            title: "平台狀態何時會更新？",
            paragraphs: [
              "只有 NC 全球公告、官方商店新增平台、Steam 功能欄更新或平台持有者公布頁面時，才應調整狀態。傳聞、商店占位符、第三方資料庫和搜尋建議不能單獨改變結論。",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Platforms 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 會登上 PS5 嗎？", answer: "截至 2026 年 7 月 26 日，NC 沒有公布全球版 PS5 支援或日期。" },
              { question: "AION 2 全球版有手機版嗎？", answer: "全球公告描述為 PC 專用。韓國／台灣有手機版，但不能因此推定全球 Android 或 iOS。" },
              { question: "AION 2 支援手把嗎？", answer: "目前全球官方資料沒有足以確認完整 Controller 支援的說明，應等待遊戲控制選單和官方功能欄。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 6, {
        eyebrow: "GLOBAL PLATFORM CHECK",
        title: "AION 2 Platforms: PC, PS5, Xbox, Mobile & Controller Support",
        description: "AION 2 Platforms are confirmed as Steam/PURPLE PC for Global. PS5, Xbox, global mobile, Steam Deck compatibility, and controller support remain unconfirmed.",
        intro: "Answer first: NC describes AION 2 Global as a PC-only version distributed through Steam and PURPLE. PS5, Xbox, Android, iPhone, and a native Global mobile client are unannounced. Steam Deck compatibility is shown as unknown, and public official material does not fully confirm controller support.",
        sourceNote: "Last checked July 26, 2026 against NC's April global platform release and the official Steam page. Korea/Taiwan mobile support is included only to explain the regional difference.",
        keywords: ["AION 2 Platforms", "AION 2 PS5", "AION 2 console", "AION 2 controller support", "AION 2 mobile"],
        sections: [
          {
            id: "global-answer",
            title: "Which AION 2 Global platforms are confirmed?",
            paragraphs: [
              "NC's April 2026 announcement says the global version is being developed as a PC-only product through Steam and PURPLE. Steam also lists 64-bit Windows 10/11 requirements and describes the product as PC only.",
              "Windows PC, Steam, and PURPLE are therefore confirmed. Other platforms should remain unannounced or compatibility unknown, not assigned a release date because their search interest increased.",
            ],
          },
          {
            id: "platform-matrix",
            title: "PC, console, mobile, and Steam Deck status",
            paragraphs: [
              "The table reflects what could be checked in official material on July 26, 2026. Unannounced does not mean permanently impossible, but it cannot be labelled supported before NC publishes new information.",
            ],
            table: {
              caption: "AION 2 Global platform status",
              headers: ["Platform", "Official status", "Evidence"],
              rows: [
                { header: "Windows PC", cells: ["Confirmed", "NC global release and Steam requirements"] },
                { header: "Steam", cells: ["Confirmed", "NC global release and official store page"] },
                { header: "PURPLE", cells: ["Confirmed", "NC global release"] },
                { header: "PS5", cells: ["Unannounced", "No official Global PS5 release"] },
                { header: "Xbox", cells: ["Unannounced", "No official Global Xbox release"] },
                { header: "Android/iPhone", cells: ["Unannounced for Global", "Global is PC-only; regional mobile service differs"] },
                { header: "Steam Deck", cells: ["Compatibility unknown", "No official Steam Deck compatibility statement found"] },
              ],
            },
          },
          {
            id: "controller-status",
            title: "Is AION 2 controller support confirmed?",
            paragraphs: [
              "Steam's current feature area does not provide a complete controller-support statement, and the public global page does not list layouts, button prompts, vibration, or accessibility-controller support. That does not prove a controller can never work; it means a third-party mapping or Steam Input guess is not official support.",
              "After launch, check the Steam feature labels, in-game control menu, NC control guide, and actual button prompts before classifying support as full, partial, or absent.",
            ],
          },
          {
            id: "mobile-difference",
            title: "Why does AION 2 mobile information exist online?",
            paragraphs: [
              "The live Korea/Taiwan service has an official download page with Android, iPhone, and tablet requirements, and NC described that regional release as playable on PC and mobile. The later Global announcement explicitly uses a PC-only model.",
              "They are separate service scopes. A regional mobile client does not confirm Global Android or iOS, and a Global page must not reuse regional mobile requirements, store links, or install sizes.",
            ],
          },
          {
            id: "future-updates",
            title: "What evidence can change the platform status?",
            paragraphs: [
              "Update the table only when NC issues a global announcement, an official platform store adds AION 2, Steam changes its feature fields, or a platform holder publishes a product page. Rumors, placeholders, third-party databases, and search suggestions cannot change the answer alone.",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Platforms FAQ",
            paragraphs: [],
            faq: [
              { question: "Is AION 2 coming to PS5?", answer: "As of July 26, 2026, NC had not announced Global PS5 support or a PS5 date." },
              { question: "Does AION 2 Global have a mobile version?", answer: "The global announcement is PC-only. Korea/Taiwan has mobile service, but that does not confirm Global Android or iOS." },
              { question: "Does AION 2 support controllers?", answer: "Current global material is insufficient to confirm full controller support. Wait for official feature fields and the in-game controls." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 6, {
        eyebrow: "글로벌 플랫폼 확인",
        title: "아이온2 플랫폼: PC·PS5·Xbox·모바일·컨트롤러 지원",
        description: "아이온2 글로벌 플랫폼은 Steam·PURPLE PC로 확인됐습니다. PS5, Xbox, 글로벌 모바일, Steam Deck과 컨트롤러 지원은 아직 미확인입니다.",
        intro: "결론부터 말하면 NC는 아이온2 글로벌을 Steam과 PURPLE로 제공하는 PC 전용 버전으로 설명합니다. PS5, Xbox, Android, iPhone과 글로벌 모바일 클라이언트는 발표되지 않았습니다. Steam Deck 호환성은 알 수 없음으로 표시되고 공식 공개 자료만으로 컨트롤러 지원을 완전히 확인할 수 없습니다.",
        sourceNote: "2026년 7월 26일 NC의 4월 글로벌 플랫폼 발표와 Steam 공식 페이지에서 확인했습니다. 한국·대만 모바일 지원은 지역 차이를 설명하기 위해서만 포함합니다.",
        keywords: ["아이온2 플랫폼", "아이온2 PS5", "아이온2 콘솔", "아이온2 컨트롤러", "아이온2 모바일"],
        sections: [
          {
            id: "global-answer",
            title: "아이온2 글로벌은 어떤 플랫폼을 지원하나요?",
            paragraphs: [
              "NC의 2026년 4월 발표는 글로벌판을 Steam과 PURPLE를 통한 PC 전용 제품으로 개발한다고 밝힙니다. Steam도 64비트 Windows 10/11 요구 사항과 PC only 설명을 표시합니다.",
              "현재 확정 답변은 Windows PC, Steam과 PURPLE입니다. 다른 플랫폼은 미공개 또는 호환성 알 수 없음으로 남겨야 하며 검색량 증가만으로 출시 날짜를 만들 수 없습니다.",
            ],
          },
          {
            id: "platform-matrix",
            title: "PC, 콘솔, 모바일과 Steam Deck 상태",
            paragraphs: [
              "표는 2026년 7월 26일 공식 자료에서 확인한 상태입니다. 미공개가 영구 제외를 뜻하지는 않지만 NC의 새 발표 전에는 지원으로 표시할 수 없습니다.",
            ],
            table: {
              caption: "아이온2 글로벌 플랫폼 상태",
              headers: ["플랫폼", "공식 상태", "근거"],
              rows: [
                { header: "Windows PC", cells: ["확인", "NC 글로벌 발표와 Steam 사양"] },
                { header: "Steam", cells: ["확인", "NC 글로벌 발표와 공식 상점"] },
                { header: "PURPLE", cells: ["확인", "NC 글로벌 발표"] },
                { header: "PS5", cells: ["미공개", "글로벌 PS5 공식 발표 없음"] },
                { header: "Xbox", cells: ["미공개", "글로벌 Xbox 공식 발표 없음"] },
                { header: "Android/iPhone", cells: ["글로벌 미공개", "글로벌은 PC 전용, 지역 모바일 서비스는 별도"] },
                { header: "Steam Deck", cells: ["호환성 알 수 없음", "공식 Steam Deck 호환성 안내를 찾지 못함"] },
              ],
            },
          },
          {
            id: "controller-status",
            title: "아이온2 컨트롤러 지원은 확인됐나요?",
            paragraphs: [
              "Steam 기능 영역은 현재 완전한 컨트롤러 지원 문구를 제공하지 않으며 공개 글로벌 페이지에도 레이아웃, 버튼 표시, 진동과 접근성 컨트롤러 지원이 없습니다. 컨트롤러가 절대 작동하지 않는다는 뜻이 아니라 제3자 매핑이나 Steam Input 추측을 공식 지원으로 쓸 수 없다는 뜻입니다.",
              "출시 후 Steam 기능 태그, 게임 내 조작 메뉴, NC 조작 안내와 실제 버튼 표시를 확인한 뒤 완전, 부분 또는 미지원으로 구분해야 합니다.",
            ],
          },
          {
            id: "mobile-difference",
            title: "아이온2 모바일 정보가 있는 이유는 무엇인가요?",
            paragraphs: [
              "한국·대만 라이브 서비스는 Android, iPhone과 태블릿 요구 사항이 있는 공식 다운로드 페이지를 운영하고 NC는 해당 지역판을 PC와 모바일에서 플레이할 수 있다고 설명했습니다. 이후 글로벌 발표는 PC 전용 방식을 명시합니다.",
              "두 서비스 범위는 다릅니다. 지역 모바일 클라이언트가 글로벌 Android나 iOS를 확인하지 않으며 글로벌 페이지에 지역 모바일 사양, 상점 링크와 설치 크기를 섞으면 안 됩니다.",
            ],
          },
          {
            id: "future-updates",
            title: "플랫폼 상태는 어떤 근거로 바뀌나요?",
            paragraphs: [
              "NC 글로벌 발표, 공식 플랫폼 상점의 AION 2 등록, Steam 기능 필드 변경 또는 플랫폼 사업자의 제품 페이지가 있어야 상태를 바꿉니다. 소문, 상점 자리표시자, 제3자 데이터베이스와 검색 제안만으로는 결론을 바꿀 수 없습니다.",
            ],
          },
          {
            id: "faq",
            title: "아이온2 플랫폼 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "아이온2가 PS5로 나오나요?", answer: "2026년 7월 26일 기준 NC는 글로벌 PS5 지원이나 날짜를 발표하지 않았습니다." },
              { question: "아이온2 글로벌에 모바일판이 있나요?", answer: "글로벌 발표는 PC 전용입니다. 한국·대만 모바일 서비스가 글로벌 Android나 iOS를 확인하지는 않습니다." },
              { question: "아이온2는 컨트롤러를 지원하나요?", answer: "현재 글로벌 공식 자료로 완전한 컨트롤러 지원을 확인하기 부족합니다. 공식 기능 필드와 게임 내 조작 메뉴를 기다려야 합니다." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "aion-2-server-status",
    schemaType: "TechArticle",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    readingMinutes: 6,
    publication: publishedVerified,
    sources: [globalPlatformSource, steamSource],
    heroImage: globalHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球版伺服器公開狀態",
        en: "AION 2 Global public server status",
        ko: "아이온2 글로벌 공개 서버 상태",
      },
      liveTelemetry: false,
    },
    related: [
      { kind: "content", section: "news", slug: "global-server-regions" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "early-access" },
      { kind: "content", section: "guides", slug: "aion-2-download" },
      { kind: "content", section: "database", slug: "aion-2-wiki" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 6, {
        eyebrow: "全球伺服器資訊",
        title: "AION 2 Server Status：全球伺服器、維護與開服狀態",
        description: "AION 2 Server Status 頁不偽造即時在線狀態；整理已確認的北美、南美、歐洲、日本營運地區，以及尚未公布的伺服器名稱、維護與人口。",
        intro: "AION 2 Server Status 目前不能顯示一個可驗證的全球即時綠燈。NC 已宣布北美、南美、歐洲與日本四個營運地區，Steam 顯示全球版 2026 年 9 月與 9 月 30 日 Advance Access；官方尚未提供公開伺服器狀態 API、完整名稱清單、即時人口或精確開服時刻。",
        sourceNote: "2026 年 7 月 26 日依 NC 全球地區公告與 Steam 官方頁核對。本站沒有輪詢私有端點，也不以網站可開啟推定遊戲伺服器在線。",
        keywords: ["AION 2 Server Status", "AION2 server status", "AION 2 servers", "AION 2 maintenance", "AION 2 server time"],
        sections: [
          {
            id: "status-answer",
            title: "AION 2 Server Status 現在是 Online 嗎？",
            paragraphs: [
              "無法用目前官方公開資料把全球遊戲伺服器標示為 Online。Steam 商店頁、官網或登入頁可以開啟，只能證明網頁服務可達，不等於角色登入、世界、配對或交易服務正常。",
              "在 NC 公布全球伺服器名稱、營運公告與可核對狀態前，本站顯示的是「尚未提供公開即時狀態」，而不是一個沒有遙測來源的綠色圓點。",
            ],
          },
          {
            id: "confirmed-regions",
            title: "哪些全球伺服器地區已確認？",
            paragraphs: [
              "NC 已宣布為北美、南美、歐洲和日本建立區域性伺服器營運，並支援十種語言。這是營運地區，不是完整伺服器名稱清單，也不能推定資料中心城市、時區、跨區遊玩或角色轉移。",
              "Steam 顯示 9 月 30 日 Advance Access，但精確開服小時與時區仍需 NC 營運公告。商店倒數或使用者所在地午夜不能取代伺服器正式時間。",
            ],
            table: {
              caption: "AION 2 全球伺服器公開狀態",
              headers: ["項目", "目前狀態", "不能推定"],
              rows: [
                { header: "營運地區", cells: ["北美、南美、歐洲、日本已確認", "資料中心城市與延遲排名"] },
                { header: "伺服器名稱", cells: ["尚未公布完整清單", "世界數量與角色限制"] },
                { header: "即時狀態", cells: ["沒有本站可核對的公開 API", "Online、Busy 或 Maintenance"] },
                { header: "人口", cells: ["沒有官方即時數據", "熱門服、陣營比例和排隊長度"] },
              ],
            },
          },
          {
            id: "what-is-not-live",
            title: "為什麼不顯示假的即時 Server Status？",
            paragraphs: [
              "真正的即時狀態需要明確的官方狀態來源、輪詢時間、失敗處理和服務粒度。只抓官網 HTTP 200、社群貼文或玩家回報，無法可靠區分登入、遊戲世界、配對、市場與區域網路問題。",
              "如果沒有這些資料，最誠實的設計是顯示最後核對日、官方公告連結和未知欄位，而不是把未知轉成 Online。",
            ],
          },
          {
            id: "how-to-check",
            title: "開服後如何檢查維護或連線問題？",
            paragraphs: [
              "先查看 NC 全球公告或對應區域的營運通知，再確認 Steam／PURPLE 客戶端是否有更新。若只有自己無法登入，記錄平台、區域、時間、錯誤碼與網路環境；不要公開帳號、一次性驗證碼或 IP。",
            ],
            steps: [
              { title: "確認官方公告", description: "查看是否有排程維護、緊急維護或已知問題。" },
              { title: "確認客戶端更新", description: "重新開啟 Steam 或 PURPLE，檢查遊戲與啟動器更新。" },
              { title: "分清影響範圍", description: "比較同區朋友和官方回報，區分個人、ISP、平台或遊戲服務。" },
              { title: "保留錯誤資料", description: "記錄時間、區域、平台和錯誤碼，再交由官方客服處理。" },
            ],
          },
          {
            id: "status-model",
            title: "未來即時狀態要符合哪些條件？",
            paragraphs: [
              "若 NC 後續提供公開狀態頁或 API，本站才會依官方世界 ID 顯示狀態，並標示來源、最後成功更新、資料延遲和無法取得時的 Unknown。人口與排隊估計除非由官方發布，不會加入。",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Server Status 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 全球伺服器現在開了嗎？", answer: "目前官方資料確認的是 2026 年 9 月和 9 月 30 日 Advance Access，沒有可驗證的全球即時伺服器狀態。" },
              { question: "AION 2 有哪些伺服器？", answer: "NC 已確認北美、南美、歐洲與日本營運地區，但完整伺服器名稱和世界數量尚未公布。" },
              { question: "為什麼官網正常但遊戲可能維護？", answer: "網頁、登入、遊戲世界、配對和市場是不同服務；官網可開啟不等於所有遊戲服務在線。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 6, {
        eyebrow: "GLOBAL SERVER INFORMATION",
        title: "AION 2 Server Status: Global Servers, Maintenance & Launch",
        description: "AION 2 Server Status does not fabricate live availability. See confirmed NA, SA, Europe, and Japan regions plus unannounced names, maintenance, and population.",
        intro: "Answer first: AION 2 Server Status cannot currently show a verifiable live green light for Global. NC has announced North America, South America, Europe, and Japan operations, while Steam shows September 2026 and September 30 Advance Access. There is no checked public server-status API, complete world list, live population, or exact opening hour.",
        sourceNote: "Last checked July 26, 2026 against NC's global region announcement and the official Steam page. KINA does not poll private endpoints or infer game availability from a reachable website.",
        keywords: ["AION 2 Server Status", "AION2 server status", "AION 2 servers", "AION 2 maintenance", "AION 2 server time"],
        sections: [
          {
            id: "status-answer",
            title: "Is AION 2 Server Status online now?",
            paragraphs: [
              "The public official data does not support labelling Global game servers Online. A reachable Steam store, website, or login page proves only that a web service responds; it does not prove character login, worlds, matchmaking, or markets are working.",
              "Until NC publishes global world names, operations notices, and a checkable status source, KINA reports no public live status available instead of displaying a green dot without telemetry.",
            ],
          },
          {
            id: "confirmed-regions",
            title: "Which global server regions are confirmed?",
            paragraphs: [
              "NC announced regional server operations for North America, South America, Europe, and Japan with ten languages. These are operating regions, not a complete server-name list, and they do not establish data-center cities, time zones, cross-region play, or transfers.",
              "Steam shows September 30 Advance Access, but an exact opening hour and time zone still require an NC operations notice. A store countdown or the visitor's local midnight cannot replace server time.",
            ],
            table: {
              caption: "AION 2 Global public server status",
              headers: ["Field", "Current status", "Do not infer"],
              rows: [
                { header: "Operating regions", cells: ["NA, SA, Europe, Japan confirmed", "Data-center cities or latency rank"] },
                { header: "World names", cells: ["Complete list unannounced", "World count or creation restrictions"] },
                { header: "Live status", cells: ["No checked public API", "Online, Busy, or Maintenance"] },
                { header: "Population", cells: ["No official live data", "Most popular world, faction ratio, or queues"] },
              ],
            },
          },
          {
            id: "what-is-not-live",
            title: "Why not display a fake live Server Status?",
            paragraphs: [
              "Real-time status needs a defined official source, poll timestamp, failure handling, and service granularity. A website HTTP 200, social post, or player report cannot reliably separate login, world, matchmaking, market, and regional network failures.",
              "Without that evidence, the honest design shows a verification date, official notices, and unknown fields rather than converting unknown into Online.",
            ],
          },
          {
            id: "how-to-check",
            title: "How should you check maintenance after launch?",
            paragraphs: [
              "Read NC's global notice or the relevant regional operations update, then check Steam or PURPLE for a client update. If only your connection fails, record platform, region, time, error code, and network context without publishing an account, one-time code, or IP address.",
            ],
            steps: [
              { title: "Check the official notice", description: "Look for scheduled maintenance, emergency work, or a known issue." },
              { title: "Check the client update", description: "Restart Steam or PURPLE and inspect launcher and game updates." },
              { title: "Separate the scope", description: "Use same-region friends and official reports to distinguish personal, ISP, platform, or game impact." },
              { title: "Keep error context", description: "Record time, region, platform, and error code for official support." },
            ],
          },
          {
            id: "status-model",
            title: "What would a future live status require?",
            paragraphs: [
              "If NC publishes a public status page or API, KINA can map official world IDs and show the source, last successful update, expected delay, and Unknown when data fails. Population and queue estimates will remain absent unless NC publishes them.",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Server Status FAQ",
            paragraphs: [],
            faq: [
              { question: "Are AION 2 Global servers live now?", answer: "Current official material confirms September 2026 and September 30 Advance Access, not a verifiable live global server state." },
              { question: "What AION 2 servers exist?", answer: "NC confirms North America, South America, Europe, and Japan operations, but the complete world names and count are unannounced." },
              { question: "Why can the website work during game maintenance?", answer: "Web, login, world, matchmaking, and market services differ. A reachable website does not prove every game service is online." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 6, {
        eyebrow: "글로벌 서버 정보",
        title: "아이온2 서버 상태: 글로벌 서버·점검·출시 현황",
        description: "아이온2 서버 상태는 실시간 접속을 지어내지 않습니다. 북미, 남미, 유럽, 일본 지역과 미공개 서버 이름, 점검, 인구 정보를 확인하세요.",
        intro: "아이온2 서버 상태는 현재 글로벌 서버의 검증 가능한 실시간 초록 표시를 제공할 수 없습니다. NC는 북미, 남미, 유럽과 일본 운영을 발표했고 Steam은 2026년 9월과 9월 30일 어드밴스 액세스를 표시합니다. 확인 가능한 공개 서버 상태 API, 전체 월드 목록, 실시간 인구와 정확한 오픈 시각은 없습니다.",
        sourceNote: "2026년 7월 26일 NC 글로벌 지역 발표와 Steam 공식 페이지에서 확인했습니다. KINA는 비공개 엔드포인트를 조회하거나 웹사이트 접속만으로 게임 서버 온라인을 추정하지 않습니다.",
        keywords: ["아이온2 서버 상태", "AION 2 Server Status", "아이온2 서버", "아이온2 점검", "아이온2 서버 시간"],
        sections: [
          {
            id: "status-answer",
            title: "지금 아이온2 서버 상태는 온라인인가요?",
            paragraphs: [
              "현재 공개 공식 자료로 글로벌 게임 서버를 Online으로 표시할 수 없습니다. Steam 상점, 웹사이트나 로그인 페이지 접속은 웹 서비스가 응답한다는 뜻이며 캐릭터 로그인, 월드, 매칭과 시장의 정상 작동을 증명하지 않습니다.",
              "NC가 글로벌 월드 이름, 운영 공지와 확인 가능한 상태 출처를 공개하기 전에는 원격 측정 없는 초록 점 대신 공개 실시간 상태 없음으로 표시합니다.",
            ],
          },
          {
            id: "confirmed-regions",
            title: "어떤 글로벌 서버 지역이 확인됐나요?",
            paragraphs: [
              "NC는 북미, 남미, 유럽과 일본의 지역별 서버 운영과 10개 언어를 발표했습니다. 이는 운영 지역이지 전체 서버 이름 목록이 아니며 데이터 센터 도시, 시간대, 지역 간 플레이와 캐릭터 이전을 확정하지 않습니다.",
              "Steam은 9월 30일 어드밴스 액세스를 표시하지만 정확한 오픈 시각과 시간대는 NC 운영 공지가 필요합니다. 상점 카운트다운이나 이용자 현지 자정은 서버 공식 시간이 아닙니다.",
            ],
            table: {
              caption: "아이온2 글로벌 공개 서버 상태",
              headers: ["항목", "현재 상태", "추정하면 안 되는 내용"],
              rows: [
                { header: "운영 지역", cells: ["북미, 남미, 유럽, 일본 확인", "데이터 센터 도시와 지연 순위"] },
                { header: "월드 이름", cells: ["전체 목록 미공개", "월드 수와 생성 제한"] },
                { header: "실시간 상태", cells: ["확인된 공개 API 없음", "Online, Busy, Maintenance"] },
                { header: "인구", cells: ["공식 실시간 자료 없음", "인기 서버, 진영 비율과 대기열"] },
              ],
            },
          },
          {
            id: "what-is-not-live",
            title: "가짜 실시간 서버 상태를 표시하지 않는 이유",
            paragraphs: [
              "실시간 상태에는 명확한 공식 출처, 조회 시각, 실패 처리와 서비스 단위가 필요합니다. 웹사이트 HTTP 200, 소셜 글이나 플레이어 제보만으로 로그인, 월드, 매칭, 시장과 지역 네트워크 문제를 구분할 수 없습니다.",
              "근거가 없으면 알 수 없음을 Online으로 바꾸지 않고 마지막 확인일, 공식 공지와 미확인 필드를 표시하는 것이 정확합니다.",
            ],
          },
          {
            id: "how-to-check",
            title: "출시 후 점검이나 접속 문제를 확인하는 방법",
            paragraphs: [
              "NC 글로벌 공지나 해당 지역 운영 안내를 보고 Steam·PURPLE 클라이언트 업데이트를 확인하세요. 나만 접속하지 못하면 플랫폼, 지역, 시간, 오류 코드와 네트워크 환경을 기록하되 계정, 일회용 코드나 IP를 공개하지 마세요.",
            ],
            steps: [
              { title: "공식 공지 확인", description: "정기 점검, 긴급 점검 또는 알려진 문제가 있는지 봅니다." },
              { title: "클라이언트 업데이트 확인", description: "Steam 또는 PURPLE를 다시 열고 런처와 게임 업데이트를 확인합니다." },
              { title: "영향 범위 구분", description: "같은 지역 이용자와 공식 제보로 개인, ISP, 플랫폼 또는 게임 문제를 구분합니다." },
              { title: "오류 정보 보관", description: "시간, 지역, 플랫폼과 오류 코드를 기록해 공식 고객센터에 전달합니다." },
            ],
          },
          {
            id: "status-model",
            title: "향후 실시간 상태에 필요한 조건",
            paragraphs: [
              "NC가 공개 상태 페이지나 API를 제공하면 공식 월드 ID를 기준으로 출처, 마지막 성공 업데이트, 데이터 지연과 조회 실패 시 Unknown을 표시할 수 있습니다. 인구와 대기열은 NC가 공개하지 않는 한 추가하지 않습니다.",
            ],
          },
          {
            id: "faq",
            title: "아이온2 서버 상태 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "아이온2 글로벌 서버가 지금 열렸나요?", answer: "현재 공식 자료는 2026년 9월과 9월 30일 어드밴스 액세스를 확인하지만 검증 가능한 글로벌 실시간 서버 상태는 아닙니다." },
              { question: "아이온2 서버는 무엇이 있나요?", answer: "NC는 북미, 남미, 유럽과 일본 운영을 확인했지만 전체 월드 이름과 수는 미공개입니다." },
              { question: "웹사이트가 정상인데 게임은 점검일 수 있나요?", answer: "웹, 로그인, 월드, 매칭과 시장은 서로 다른 서비스이므로 웹사이트 접속만으로 모든 게임 서비스 온라인을 증명할 수 없습니다." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "aion-2-tier-list",
    schemaType: "Article",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [steamSource, seasonTwoSource, chapterOneSource],
    heroImage: tierHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球版職業比較方法；上線前不發布無可靠實測排名",
        en: "AION 2 Global class comparison method; no unsupported pre-launch ranking",
        ko: "아이온2 글로벌 직업 비교 방법, 출시 전 근거 없는 순위 미게시",
      },
      rankingStatus: "withheld-until-comparable-global-evidence",
    },
    related: [
      { kind: "content", section: "classes", slug: "base-class-roster" },
      { kind: "content", section: "classes", slug: "class-choice-guide" },
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "tool", toolSlug: "class-finder" },
      { kind: "content", section: "guides", slug: "aion-2-gameplay" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 7, {
        eyebrow: "版本化職業比較",
        title: "AION 2 Tier List：全球版職業排名、評分方法與更新規則",
        description: "AION 2 Tier List 全球上線前不發布無可靠實測的 S／A 排名；先用官方八職業資料建立 PvE、PvP、團隊與操作難度的版本化評分方法。",
        intro: "目前沒有可靠的 AION 2 Tier List 能代表全球首發。官方確認全球版有八個職業，但尚未公布可比較的全球首發技能數值、完整平衡版本與同條件實測；韓國／台灣的 Season 2 或 Chapter 1 排名不能移除版本標籤後直接套用。",
        sourceNote: "2026 年 7 月 26 日依 Steam 全球職業總覽及 NC Season 2、Chapter 1 更新核對。本站保留方法頁，不把現行地區版本或玩家人氣當成全球強度排名。",
        keywords: ["AION 2 Tier List", "AION2 tier list", "AION 2 class tier list", "AION 2 best class", "AION 2 class ranking"],
        sections: [
          {
            id: "answer",
            title: "現在有可信的 AION 2 Tier List 嗎？",
            paragraphs: [
              "全球版上線前沒有足夠資料建立可重複驗證的 S、A、B 職業排名。Steam 確認八個職業與全球玩法方向，但沒有提供統一裝備、操作熟練度、隊伍配置、內容難度與全球首發平衡下的比較結果。",
              "因此本頁先公開評分條件與更新規則。若搜尋結果只提供字母順位，卻沒有版本、地區、PvE／PvP、裝備和樣本，就不應把它當成普遍結論。",
            ],
          },
          {
            id: "why-no-ranking",
            title: "為什麼韓國／台灣 Tier 不能直接代表全球版？",
            paragraphs: [
              "NC 的 Season 2 公告同時包含職業平衡與依職業計算的排名方式；Chapter 1 又加入 Brawler 並調整等級、技能和內容。這證明比較會受到版本、職業池、裝備和活動影響。",
              "全球 Steam 頁目前描述八個職業，而 Chapter 1 現行服務已有 Brawler。若連可用職業池都不同，把現行地區排行榜複製為全球首發 Tier List 會產生錯誤。",
            ],
          },
          {
            id: "comparison-method",
            title: "AION 2 Tier List 應如何評分？",
            paragraphs: [
              "每張榜只處理一個明確問題，例如同裝等的 5 人 PvE 生存、固定隊伍下的團隊增益、相同規則的競技或新手容錯。把所有活動合成一個總分，會掩蓋職業設計差異。",
            ],
            table: {
              caption: "全球版上線後的職業比較欄位",
              headers: ["欄位", "需要固定", "不應混用"],
              rows: [
                { header: "版本", cells: ["客戶端版本、日期與地區", "不同賽季或地區"] },
                { header: "活動", cells: ["副本、首領、開放世界或 PvP 規則", "PvE 與 PvP 總分"] },
                { header: "條件", cells: ["裝備、技能、隊伍與操作熟練度", "高投資與新手角色"] },
                { header: "指標", cells: ["輸出、生存、控制、支援或容錯", "只看人氣或單次紀錄"] },
                { header: "樣本", cells: ["足夠場次與可重複流程", "單一影片或最高紀錄"] },
              ],
            },
          },
          {
            id: "eight-classes",
            title: "全球版八職業應先比較哪些玩法？",
            paragraphs: [
              "Steam 的全球職業池包含 Gladiator、Templar、Assassin、Ranger、Sorcerer、Spiritmaster、Cleric 與 Chanter。與其先排強弱，應先按近戰／遠程、爆發／持續、輸出／防護／治療、單人／團隊和操作負擔分類。",
              "需要個人選擇時，使用職業推薦器和八職業總覽找出符合距離、節奏與隊伍責任的候選，再閱讀個別攻略。適合自己的職業和版本最高傷害不是同一問題。",
            ],
            bullets: [
              "新手：看容錯、資源管理和失誤恢復。",
              "固定隊：看隊伍增益、控制、保護和治療責任。",
              "單人：看續航、目標切換、移動和準備成本。",
              "PvP：分清小規模、戰場與大規模陣營戰。",
            ],
          },
          {
            id: "update-policy",
            title: "全球版推出後何時會加入排名？",
            paragraphs: [
              "只有全球版可用職業、正式平衡版本、活動規則和可比較樣本確認後，才會建立分活動 Tier。每次更新必須保留舊版本日期、變更原因和樣本限制；重大平衡或新職業推出後，舊榜應標示歷史版本而不是靜默改分。",
              "官方分職業排行榜可以提供同職業內的表現背景，但不會自動證明不同職業間的因果強度。KINA 的結論仍會標示為編輯分析，不冒充 NC 官方排名。",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Tier List 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 全球版最強職業是哪個？", answer: "全球版上線前沒有足夠的同條件實測可以可靠回答；官方也沒有公布唯一最強職業。" },
              { question: "可以用韓國 Tier List 選全球版職業嗎？", answer: "只能理解玩法方向，不能當成全球排名。版本、職業池、技能數值和活動條件可能不同。" },
              { question: "什麼時候會有 KINA Tier List？", answer: "全球版職業池、平衡版本、活動規則與可比較樣本具備後，才會發布附版本和方法的分活動榜。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 7, {
        eyebrow: "VERSIONED CLASS COMPARISON",
        title: "AION 2 Tier List: Global Class Ranking Method & Update Rules",
        description: "The AION 2 Tier List does not publish unsupported pre-launch S/A ranks. See a versioned method for PvE, PvP, group value, difficulty, and eight classes.",
        intro: "Answer first: there is no reliable AION 2 Tier List for the Global launch yet. The official page confirms eight classes, but comparable global launch skill values, a complete balance build, and controlled testing are unavailable. Korea/Taiwan Season 2 or Chapter 1 rankings cannot lose their patch label and become a global tier list.",
        sourceNote: "Last checked July 26, 2026 against Steam's global class overview and NC's Season 2 and Chapter 1 releases. KINA keeps this as a methodology page and does not convert current regional balance or popularity into global power ranks.",
        keywords: ["AION 2 Tier List", "AION2 tier list", "AION 2 class tier list", "AION 2 best class", "AION 2 class ranking"],
        sections: [
          {
            id: "answer",
            title: "Is there a trustworthy AION 2 Tier List now?",
            paragraphs: [
              "Before Global launch, there is not enough evidence for a reproducible S, A, or B ranking. Steam confirms eight classes and the intended gameplay, but not comparable results under one gear level, skill level, party, activity difficulty, and global launch balance.",
              "This page therefore publishes the criteria and update policy first. A letter list without patch, region, PvE or PvP context, gear, and sample should not be treated as a universal result.",
            ],
          },
          {
            id: "why-no-ranking",
            title: "Why can’t a Korea/Taiwan tier represent Global?",
            paragraphs: [
              "NC's Season 2 release contains class balance changes and class-specific ranking rules. Chapter 1 then adds Brawler and changes level, skills, and content. Comparison is clearly affected by patch, class pool, gear, and activity.",
              "The global Steam page currently presents eight classes while the Chapter 1 live service includes Brawler. When the available class pool itself differs, copying a live regional ranking into a Global launch tier list would be misleading.",
            ],
          },
          {
            id: "comparison-method",
            title: "How should an AION 2 Tier List be scored?",
            paragraphs: [
              "Each list should answer one defined question, such as equal-item-level survivability in five-player PvE, group utility in a fixed party, a defined competitive ruleset, or beginner error recovery. One blended score across every activity hides class design differences.",
            ],
            table: {
              caption: "Required fields for post-launch class comparisons",
              headers: ["Field", "Hold constant", "Do not mix"],
              rows: [
                { header: "Version", cells: ["Client build, date, and region", "Different seasons or services"] },
                { header: "Activity", cells: ["Dungeon, boss, open world, or PvP rules", "One PvE/PvP total"] },
                { header: "Conditions", cells: ["Gear, skills, party, and player proficiency", "High investment and beginner characters"] },
                { header: "Metric", cells: ["Damage, survival, control, support, or recovery", "Popularity or one record only"] },
                { header: "Sample", cells: ["Enough runs and a repeatable process", "One video or maximum result"] },
              ],
            },
          },
          {
            id: "eight-classes",
            title: "What should you compare across the eight Global classes?",
            paragraphs: [
              "Steam's global class pool contains Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter. Before ranking them, classify melee or ranged, burst or sustained pressure, damage or defense or healing, solo or group value, and execution load.",
              "For a personal choice, use the class finder and eight-class overview to select candidates that fit range, pace, and party responsibility, then read the class guides. The best fit and the highest damage in one patch are different questions.",
            ],
            bullets: [
              "Beginner: error tolerance, resource management, and recovery.",
              "Static group: buffs, control, protection, and healing responsibility.",
              "Solo: sustain, target switching, movement, and setup cost.",
              "PvP: separate small-scale, battlefield, and large faction war.",
            ],
          },
          {
            id: "update-policy",
            title: "When will the Global ranking be added?",
            paragraphs: [
              "Activity-specific tiers require the global class pool, release balance build, activity rules, and comparable samples. Each update must retain the old version date, reason for change, and sample limits. A major balance patch or new class should turn the old list into a historical version instead of silently changing letters.",
              "An official class-specific leaderboard can supply within-class context, but it does not automatically prove causal strength between classes. KINA conclusions remain labelled editorial analysis rather than an NC ranking.",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Tier List FAQ",
            paragraphs: [],
            faq: [
              { question: "What is the best AION 2 Global class?", answer: "There is not enough controlled Global evidence before launch, and NC has not named one universally strongest class." },
              { question: "Can I use a Korea tier list for Global?", answer: "Use it only to understand play patterns, not as a Global rank. Patch, class pool, skill values, and activity conditions can differ." },
              { question: "When will KINA publish class tiers?", answer: "After the Global class pool, balance build, activity rules, and comparable samples exist, KINA can publish versioned, activity-specific analysis." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 7, {
        eyebrow: "버전 기반 직업 비교",
        title: "아이온2 티어 리스트: 글로벌 직업 순위 방법과 업데이트 규칙",
        description: "아이온2 티어 리스트는 근거 없는 출시 전 S/A 순위를 게시하지 않습니다. 8개 직업의 PvE, PvP, 파티 기여와 난이도를 버전별로 비교하는 방법을 봅니다.",
        intro: "현재 글로벌 출시를 대표할 신뢰할 만한 아이온2 티어 리스트는 없습니다. 공식 페이지는 8개 직업을 확인하지만 비교 가능한 글로벌 출시 스킬 수치, 완전한 밸런스 빌드와 동일 조건 실전 자료가 없습니다. 한국·대만 시즌2 또는 챕터 1 랭킹에서 버전 표시를 지우고 글로벌 순위로 사용할 수 없습니다.",
        sourceNote: "2026년 7월 26일 Steam 글로벌 직업 개요와 NC 시즌2·챕터 1 업데이트에서 확인했습니다. 현재 지역 밸런스나 인기를 글로벌 성능 순위로 바꾸지 않고 방법론 페이지로 유지합니다.",
        keywords: ["아이온2 티어 리스트", "AION 2 Tier List", "아이온2 직업 티어", "아이온2 최강 직업", "아이온2 직업 순위"],
        sections: [
          {
            id: "answer",
            title: "지금 믿을 수 있는 아이온2 티어 리스트가 있나요?",
            paragraphs: [
              "글로벌 출시 전에는 재현 가능한 S, A, B 순위를 만들 근거가 부족합니다. Steam은 8개 직업과 플레이 방향을 확인하지만 같은 장비, 숙련도, 파티, 콘텐츠 난이도와 글로벌 출시 밸런스에서 얻은 비교 결과는 제공하지 않습니다.",
              "따라서 이 페이지는 평가 조건과 업데이트 규칙을 먼저 공개합니다. 패치, 지역, PvE·PvP, 장비와 표본이 없는 글자 순위는 보편적 결론으로 볼 수 없습니다.",
            ],
          },
          {
            id: "why-no-ranking",
            title: "한국·대만 티어를 글로벌에 적용할 수 없는 이유",
            paragraphs: [
              "NC 시즌2 공지에는 직업 밸런스와 직업별 랭킹 규칙이 함께 있으며 챕터 1은 격투성을 추가하고 레벨, 스킬과 콘텐츠를 바꿨습니다. 비교는 패치, 직업 풀, 장비와 콘텐츠에 영향을 받습니다.",
              "글로벌 Steam 페이지는 현재 8개 직업을 제시하지만 챕터 1 라이브 서비스에는 격투성이 있습니다. 사용 가능한 직업 풀부터 다르면 지역 랭킹을 글로벌 출시 티어로 복사하는 것은 부정확합니다.",
            ],
          },
          {
            id: "comparison-method",
            title: "아이온2 티어 리스트를 어떻게 평가해야 하나요?",
            paragraphs: [
              "각 목록은 같은 아이템 레벨의 5인 PvE 생존, 고정 파티의 그룹 기여, 정해진 PvP 규칙 또는 초보자 실수 회복처럼 하나의 질문만 다뤄야 합니다. 모든 콘텐츠를 하나의 점수로 합치면 직업 설계 차이가 사라집니다.",
            ],
            table: {
              caption: "글로벌 출시 후 직업 비교 필드",
              headers: ["필드", "고정할 조건", "섞으면 안 되는 항목"],
              rows: [
                { header: "버전", cells: ["클라이언트 빌드, 날짜와 지역", "다른 시즌과 서비스"] },
                { header: "콘텐츠", cells: ["던전, 보스, 오픈 월드 또는 PvP 규칙", "PvE와 PvP 총점"] },
                { header: "조건", cells: ["장비, 스킬, 파티와 플레이 숙련도", "고투자와 초보 캐릭터"] },
                { header: "지표", cells: ["피해, 생존, 제어, 지원 또는 회복", "인기나 단일 기록"] },
                { header: "표본", cells: ["충분한 횟수와 반복 가능한 절차", "영상 하나나 최고 기록"] },
              ],
            },
          },
          {
            id: "eight-classes",
            title: "글로벌 8개 직업에서 무엇을 먼저 비교하나요?",
            paragraphs: [
              "Steam 글로벌 직업 풀은 검성, 수호성, 살성, 궁성, 마도성, 정령성, 치유성과 호법성입니다. 순위보다 근거리·원거리, 폭발·지속, 공격·방어·치유, 솔로·그룹 가치와 조작 부담을 먼저 구분하세요.",
              "개인 선택에는 직업 추천기와 8직업 개요로 거리, 속도와 파티 책임에 맞는 후보를 찾고 개별 공략을 읽으세요. 자신에게 맞는 직업과 한 패치의 최고 피해는 다른 질문입니다.",
            ],
            bullets: [
              "초보자: 실수 허용, 자원 관리와 회복.",
              "고정 파티: 버프, 제어, 보호와 치유 책임.",
              "솔로: 유지력, 대상 전환, 이동과 준비 비용.",
              "PvP: 소규모, 전장과 대규모 진영전을 구분.",
            ],
          },
          {
            id: "update-policy",
            title: "글로벌 출시 후 언제 순위를 추가하나요?",
            paragraphs: [
              "글로벌 직업 풀, 정식 밸런스 빌드, 콘텐츠 규칙과 비교 가능한 표본이 있어야 콘텐츠별 티어를 만들 수 있습니다. 업데이트는 이전 버전 날짜, 변경 이유와 표본 한계를 남기며 큰 밸런스 패치나 신규 직업 뒤에는 기존 표를 조용히 수정하지 않고 역사 버전으로 표시합니다.",
              "공식 직업별 랭킹은 같은 직업 안의 배경을 제공할 수 있지만 직업 간 인과적 강함을 자동으로 증명하지 않습니다. KINA 결론은 NC 공식 순위가 아니라 편집 분석으로 표시합니다.",
            ],
          },
          {
            id: "faq",
            title: "아이온2 티어 리스트 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "아이온2 글로벌 최강 직업은 무엇인가요?", answer: "출시 전에는 같은 조건의 글로벌 실전 자료가 부족하고 NC도 하나의 최강 직업을 발표하지 않았습니다." },
              { question: "한국 티어표로 글로벌 직업을 골라도 되나요?", answer: "플레이 방향 참고만 가능하며 글로벌 순위는 아닙니다. 패치, 직업 풀, 스킬 수치와 콘텐츠 조건이 다를 수 있습니다." },
              { question: "KINA 티어 리스트는 언제 나오나요?", answer: "글로벌 직업 풀, 밸런스 빌드, 콘텐츠 규칙과 비교 가능한 표본이 갖춰진 뒤 버전과 방법을 표시한 콘텐츠별 분석을 게시합니다." },
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
