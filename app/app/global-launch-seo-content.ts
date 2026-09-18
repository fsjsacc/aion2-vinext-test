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
    backLabel: "返回攻略中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "最後核對",
    relatedLabel: "下一步",
  },
  en: {
    byline: "AION2 KINA Editorial",
    backLabel: "Back to guides",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Continue planning",
  },
  ko: {
    byline: "AION2 KINA 편집팀",
    backLabel: "공략으로 돌아가기",
    contentsLabel: "페이지 내용",
    publishedLabel: "사이트 게시",
    updatedLabel: "마지막 확인",
    relatedLabel: "다음 준비",
  },
} as const satisfies Record<
  ContentLocale,
  Pick<
    LocalizedContent,
    | "byline"
    | "backLabel"
    | "contentsLabel"
    | "publishedLabel"
    | "updatedLabel"
    | "relatedLabel"
  >
>;

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

const earlyAccessSource = {
  id: "aion2-global-early-access-2026-07-17",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 official Team Update — Early Access: How It Will Work",
  url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5819287b798626e79a8892",
  publishedAt: "2026-07-17",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const foundersPackSource = {
  id: "aion2-global-founders-packs-2026-07-22",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 official notice — 7/22 New Product Info",
  url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f",
  publishedAt: "2026-07-22",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const globalBusinessModelSource = {
  id: "aion2-global-business-model-2026-07-24",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 Team Update — Global business model",
  url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a4d7d47a729ca5877f5e1ef",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const globalPlatformSource = {
  id: "aion2-global-platform-regions-2026-04-22",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 global PC platforms, regions, and languages announcement",
  url: "https://about.ncsoft.com/news/article/aion2_update_260422",
  publishedAt: "2026-04-22",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const steamSource = {
  id: "aion2-global-steam-2026-07-24",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 official Steam store page",
  url: "https://store.steampowered.com/app/3393110/AION_2/",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const earlyAccessHero = {
  src: "https://fizz-download.playnccdn.com/download/v2/buckets/marketing-platform/files/19daa0916cf-44ee37e4-32f3-43fd-96f5-209f0afce2ad",
  width: 1200,
  height: 630,
  credit: "NC Corporation",
  sourceUrl: earlyAccessSource.url,
  rights: "linked-official-media",
  translations: {
    "zh-hant": {
      alt: "AION 2 全球版 Early Access 官方公告主視覺",
      caption: "NC 的 AION 2 全球版 Early Access 官方公告圖片；日期與伺服器規則最後核對於 2026 年 7 月 24 日。",
    },
    en: {
      alt: "Official AION 2 Global Early Access announcement artwork",
      caption: "Official NC artwork for the AION 2 Global Early Access update; dates and server rules were last checked July 24, 2026.",
    },
    ko: {
      alt: "아이온2 글로벌 얼리 액세스 공식 공지 이미지",
      caption: "NC 아이온2 글로벌 얼리 액세스 공식 공지 이미지이며 날짜와 서버 규칙은 2026년 7월 24일 확인했습니다.",
    },
  },
} as const satisfies ContentHeroImage;

const platformHero = {
  src: "https://blogfiles.ncsoft.net/news/95839e2b-b030-4f96-a4cb-b8fc2233e3a8.png",
  width: 800,
  height: 420,
  credit: "NC Corporation",
  sourceUrl: globalPlatformSource.url,
  rights: "linked-official-media",
  translations: {
    "zh-hant": {
      alt: "AION 2 全球版 Steam 與 PURPLE PC 平台官方圖片",
      caption: "NC 公布 AION 2 全球 PC 版將透過 Steam 與 PURPLE 提供；個別購買與帳號規則仍以各平台最新頁面為準。",
    },
    en: {
      alt: "Official AION 2 Global Steam and PURPLE PC platform image",
      caption: "NC confirms Steam and PURPLE for the global PC release; current account and purchase terms remain controlled by each platform.",
    },
    ko: {
      alt: "아이온2 글로벌 Steam 및 PURPLE PC 플랫폼 공식 이미지",
      caption: "NC는 아이온2 글로벌 PC판의 Steam·PURPLE 서비스를 발표했으며 계정과 구매 조건은 각 플랫폼의 최신 안내가 기준입니다.",
    },
  },
} as const satisfies ContentHeroImage;

export const globalLaunchSeoContentEntries = [
  {
    section: "guides",
    slug: "early-access",
    schemaType: "Article",
    publishedAt: "2026-07-24",
    updatedAt: "2026-07-24",
    readingMinutes: 9,
    publication: publishedVerified,
    sources: [earlyAccessSource, foundersPackSource, globalBusinessModelSource, steamSource],
    heroImage: earlyAccessHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球 PC 版",
        en: "AION 2 Global PC",
        ko: "AION 2 글로벌 PC",
      },
    },
    primaryAction: {
      id: "open-official-early-access-update",
      href: earlyAccessSource.url,
      sourceId: earlyAccessSource.id,
      translations: {
        "zh-hant": {
          eyebrow: "官方時程",
          title: "Early Access 日期已公布，精確開服時刻仍未公布",
          description: "NC 確認 2026 年 9 月 30 日開始、持續 5 日；不要把商店倒數或所在地午夜當成官方開服時刻。",
          label: "查看 NC Early Access 公告",
          note: "若後續營運公告更新時區、預載或維護時間，應以較新的 NC 公告為準。",
          facts: [
            { label: "日期", value: "2026 年 9 月 30 日" },
            { label: "資格", value: "Standard、Deluxe、Ultimate 均包含" },
            { label: "精確時刻", value: "尚未公布" },
          ],
        },
        en: {
          eyebrow: "OFFICIAL SCHEDULE",
          title: "The Early Access date is published; the opening hour is not",
          description: "NC confirms a five-day period beginning September 30, 2026. A store countdown or local midnight is not an official server-opening time.",
          label: "Read NC’s Early Access update",
          note: "If a later operations notice adds a time zone, preload, or maintenance window, follow that newer NC notice.",
          facts: [
            { label: "Date", value: "September 30, 2026" },
            { label: "Eligibility", value: "Standard, Deluxe, and Ultimate" },
            { label: "Opening hour", value: "Not announced yet" },
          ],
        },
        ko: {
          eyebrow: "공식 일정",
          title: "얼리 액세스 날짜는 공개됐지만 정확한 오픈 시각은 미공개",
          description: "NC는 2026년 9월 30일부터 5일간 진행한다고 확인했습니다. 상점 카운트다운이나 현지 자정은 공식 서버 오픈 시각이 아닙니다.",
          label: "NC 얼리 액세스 공지 보기",
          note: "이후 운영 공지에서 시간대, 사전 다운로드나 점검 시간이 추가되면 최신 NC 공지를 따르세요.",
          facts: [
            { label: "날짜", value: "2026년 9월 30일" },
            { label: "대상", value: "Standard·Deluxe·Ultimate" },
            { label: "정확한 시각", value: "아직 미공개" },
          ],
        },
      },
    },
    related: [
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "steam-vs-purple" },
      { kind: "content", section: "guides", slug: "global-monetization-watchlist" },
      { kind: "content", section: "news", slug: "global-server-regions" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 9, {
        eyebrow: "全球版上線指南",
        title: "AION 2 Early Access 攻略：日期、資格、伺服器與開服準備",
        description: "查詢 AION 2 Early Access 已確認日期、5 日資格、Founder’s Pack、伺服器、市場與跨服規則，以及仍未公布的開服時刻和預載資訊。",
        intro: "答案先說：AION 2 全球版 Early Access 已確認於 2026 年 9 月 30 日開始，Standard、Deluxe、Ultimate 三款 Founder’s Pack 都提供同樣 5 日資格。NC 尚未公布確切開服小時、時區與預先下載時間。官方把 Early Access Servers 描述為正式服務的第一批世界，並未宣布正式發布時清除角色；具體營運安排仍以接近上線時的公告為準。",
        sourceNote: "2026 年 7 月 24 日核對 NC 7 月 17 日 Early Access 機制說明、7 月 22 日商品公告與 Steam 商店欄位。未公布的時刻、預載與轉服條件均保留為未知。",
        keywords: [
          "AION 2 Early Access",
          "AION 2 Early Access 日期",
          "AION2 搶先遊玩",
          "AION2 9 月 30 日",
          "AION 2 Early Access 伺服器",
        ],
        sections: [
          {
            id: "confirmed-status",
            title: "AION 2 Early Access 已確認什麼？",
            paragraphs: [
              "官方已確認日期、持續時間、購買資格與第一批伺服器機制；尚未確認的是精確開服小時、採用時區、預載時間，以及 Server Transfer 的日期、費用和限制。下表把可直接使用的資訊與必須等待的欄位分開。",
            ],
            table: {
              caption: "AION 2 Early Access 已確認與未公布項目",
              headers: ["項目", "目前狀態", "玩家應如何理解"],
              rows: [
                { header: "開始日期", cells: ["已確認", "2026 年 9 月 30 日；不是已確認的所在地 00:00。"] },
                { header: "持續時間", cells: ["已確認", "5 日；期間內仍可能有維護與更新。"] },
                { header: "取得資格", cells: ["已確認", "Standard、Deluxe、Ultimate 均包含相同時段。"] },
                { header: "開服時刻／時區", cells: ["尚未公布", "等待 NC 的全球營運公告，不使用商店倒數推算。"] },
                { header: "預先下載", cells: ["尚未公布", "不要下載第三方所謂提前客戶端。"] },
                { header: "正式發布", cells: ["尚未一致確認", "Steam 套裝元資料列 10 月 5 日，但 NC 與 Steam 遊戲主頁仍有 9 月欄位。"] },
              ],
            },
          },
          {
            id: "access-eligibility",
            title: "如何取得 AION 2 Early Access？",
            paragraphs: [
              "購買任一 Founder’s Pack 即包含五日資格，高階版本不會再增加天數。活動開始後才購買，只能使用剩餘時段；重複購買也不能延長。若你只為提早進入，Standard 已提供和另外兩款相同的時間。",
              "預先登錄與 Early Access 是兩件事。預先登錄用於活動資格與寵物獎勵；Early Access 是 Founder’s Pack 的付費權益。完成預先登錄不會自動取得搶先權，購買 Founder’s Pack 也不等於已完成預先登錄。",
            ],
          },
          {
            id: "server-waves",
            title: "Early Access Servers 與 Launch Servers 有什麼差別？",
            paragraphs: [
              "9 月 30 日先開放 Early Access Servers，最初只讓有資格的玩家進入。正式發布時會再開一批 Launch Servers；未購買的玩家可選新世界，也可在伺服器仍開放且有容量時加入 Early Access Server。",
              "這是兩批上線世界，不應理解成搶先服一定會清空或與正式服永久隔離。NC 會觀察人口並提供 Server Transfer Service，但轉服日期、價格與限制尚未公布。公會應先統一地區、伺服器批次與天族／魔族，而不是依傳聞服名做不可更改的承諾。",
            ],
          },
          {
            id: "matching-pvp",
            title: "副本組隊、PvP 與跨服範圍怎麼運作？",
            paragraphs: [
              "搶先期間，副本匹配可涵蓋同一地理區域的所有 Early Access Servers；正式發布後再擴大到同區 Early Access 與 Launch 兩批世界。不同世界的朋友仍可加好友並組成跨服副本隊伍。",
              "天族與魔族世界維持分開。搶先期間的深淵配對只在 Early Access Servers 之間進行，正式發布後 NC 會依各世界進度與強度安排。跨服副本不代表深淵、交易市場與所有活動都完全共通。",
            ],
          },
          {
            id: "markets-progress",
            title: "市場與進度會受到哪些限制？",
            paragraphs: [
              "Server Market 的系統從搶先首日開放；依目前全球版商業模式方案，玩家實際使用 Market 與 Kina／Quna Exchange 需要有效會員。Cross-Server Market 在 Early Access 與正式發布當天都不會開放；NC 預計等參與世界進度相近後再另行公告。提早五日並不等於能立即進入跨服經濟。",
              "是否值得搶先，應看朋友、公會、陣營與你能投入的時間，而不是假設五天一定轉化成長期優勢。官方也提醒期間可能維護或更新，因此不應把五日寫成保證完整 120 小時。",
            ],
          },
          {
            id: "launch-checklist",
            title: "AION 2 Early Access 開始前要準備什麼？",
            paragraphs: ["先完成帳號與裝置準備，再等待官方公布時區、預載與伺服器名單。任何要求交出 NC 密碼、Steam 登入或一次性驗證碼的代登服務都不應使用。"],
            steps: [
              { title: "選定 Steam 或 PURPLE", description: "購買權益與啟動平台會鎖定，先確認朋友的平台計畫與所在地商店條款。" },
              { title: "確認 Founder’s Pack", description: "只想提前進入可選 Standard；需要外觀收藏再比較 Deluxe 或 Ultimate。" },
              { title: "準備 PC 與帳號", description: "預留 100 GB 以上可用空間、更新驅動並啟用可用的帳號安全功能。" },
              { title: "等待營運公告", description: "開服小時、時區、預載和最終伺服器名單未公布前不要自行推算。" },
            ],
          },
          {
            id: "faq",
            title: "AION 2 Early Access 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 Early Access 什麼時候開始？", answer: "已確認日期是 2026 年 9 月 30 日；NC 尚未公布確切開服小時與時區。" },
              { question: "AION 2 Early Access 持續多久？", answer: "所有合資格玩家使用同一個 5 日時段。維護或更新可能使實際可玩時間少於完整 120 小時。" },
              { question: "哪一款 Founder’s Pack 包含 Early Access？", answer: "Standard、Deluxe 與 Ultimate 都包含相同五日資格；高階版本不會增加搶先天數。" },
              { question: "需要先完成 AION 2 預先登錄嗎？", answer: "預先登錄與 Founder’s Pack 是獨立流程。預先登錄本身不提供五日搶先資格。" },
              { question: "Early Access 角色會在正式發布時清除嗎？", answer: "官方把 Early Access Servers 規劃為正式服務的第一批世界，並未宣布正式發布時清除角色。實際營運變更仍以最新公告為準。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 9, {
        eyebrow: "GLOBAL LAUNCH GUIDE",
        title: "AION 2 Early Access: Date, Access, Servers and Launch Checklist",
        description: "Check the confirmed AION 2 Early Access date, five-day eligibility, Founder’s Packs, server waves, markets, matching, and the opening-time details still unannounced.",
        intro: "Answer first: AION 2 Global Early Access begins September 30, 2026. Standard, Deluxe, and Ultimate Founder’s Packs all grant the same five-day period. NC has not announced the exact opening hour, time zone, or preload schedule. NC describes Early Access Servers as the first launch wave and has not announced a full-release character wipe; near-launch operations notices remain authoritative.",
        sourceNote: "Verified July 24, 2026 against NC’s July 17 Early Access update, July 22 product notice, and current Steam store fields. Unpublished opening times, preload timing, and transfer terms remain explicitly unknown.",
        keywords: [
          "AION 2 Early Access",
          "AION 2 Early Access date",
          "AION 2 early access start time",
          "AION 2 Early Access servers",
          "AION 2 September 30",
        ],
        sections: [
          {
            id: "confirmed-status",
            title: "What is confirmed for AION 2 Early Access?",
            paragraphs: [
              "The date, duration, purchase eligibility, and first server wave are confirmed. The exact opening hour, time zone, preload schedule, and the date, price, or restrictions for Server Transfer are not. The table separates facts players can act on from fields that still require an operations notice.",
            ],
            table: {
              caption: "Confirmed and unannounced AION 2 Early Access details",
              headers: ["Topic", "Current status", "What it means"],
              rows: [
                { header: "Start date", cells: ["Confirmed", "September 30, 2026; not a confirmed local-midnight opening."] },
                { header: "Duration", cells: ["Confirmed", "Five days, with possible maintenance and updates during the period."] },
                { header: "Eligibility", cells: ["Confirmed", "Standard, Deluxe, and Ultimate grant the same period."] },
                { header: "Opening hour / time zone", cells: ["Not announced", "Wait for NC operations news; do not infer it from a store countdown."] },
                { header: "Preload", cells: ["Not announced", "Do not install a third-party “early client.”"] },
                { header: "Full release", cells: ["Not consistently confirmed", "Steam pack metadata lists October 5, while NC and the main Steam game page retain September fields."] },
              ],
            },
          },
          {
            id: "access-eligibility",
            title: "How do you get AION 2 Early Access?",
            paragraphs: [
              "Any Founder’s Pack grants the five-day entitlement. Higher tiers do not add days. A purchase after the period begins grants only the remaining time, and duplicate purchases cannot extend it. Standard is enough if the head start is your only reason to buy.",
              "Pre-registration and Early Access are separate. Registration concerns campaign eligibility and pet rewards; Early Access is a paid Founder’s Pack entitlement. Completing one does not automatically complete the other.",
            ],
          },
          {
            id: "server-waves",
            title: "How do Early Access Servers differ from Launch Servers?",
            paragraphs: [
              "Early Access Servers open first for eligible players. At full release, NC adds a second Launch Server wave. Non-buyers can choose a new world and may enter an Early Access Server if it remains open and has capacity.",
              "These are launch waves, not a statement that early worlds will be wiped or permanently isolated. NC plans a Server Transfer Service after monitoring populations, but its date, price, and restrictions are unannounced. Coordinate region, server wave, and faction with your guild instead of committing to rumored server names.",
            ],
          },
          {
            id: "matching-pvp",
            title: "How do dungeon matching, PvP, and cross-world play work?",
            paragraphs: [
              "During the head start, dungeon matching spans Early Access Servers in the same geographical region. It expands to both server waves at full release. Friends on different worlds can still add one another and form cross-world dungeon parties.",
              "Elyos and Asmodian worlds remain separate. Early Access Abyss matching initially uses the early-server pool, with later pairings based on world progress and strength. Cross-world dungeons do not make Abyss, markets, or every activity fully shared.",
            ],
          },
          {
            id: "markets-progress",
            title: "What market and progression limits apply?",
            paragraphs: [
              "The local Server Market system opens on the first day of Early Access. Under the current global business-model plan, actually using the Market and Kina–Quna Exchange requires active Membership. The Cross-Server Market will not open during the head start or on full-release day; NC plans to announce it after participating worlds reach a comparable stage.",
              "Whether the head start is useful depends on your party, guild, faction, and available time. NC also warns that maintenance or updates can occur, so five days should not be presented as a guaranteed uninterrupted 120 hours.",
            ],
          },
          {
            id: "launch-checklist",
            title: "What should you prepare before AION 2 Early Access?",
            paragraphs: ["Secure the account and PC first, then wait for the official time zone, preload schedule, and server list. Never give an NC password, Steam login, or one-time code to a registration or leveling service."],
            steps: [
              { title: "Choose Steam or PURPLE", description: "The entitlement and launcher are platform-locked, so review your party plan and regional storefront terms first." },
              { title: "Choose a Founder’s Pack", description: "Standard covers the head start; compare Deluxe or Ultimate only for their disclosed collection items." },
              { title: "Prepare the PC and account", description: "Reserve at least 100 GB of available storage, update drivers, and enable available account security." },
              { title: "Wait for operations news", description: "Do not invent an hour, time zone, preload, or final server name before NC publishes it." },
            ],
          },
          {
            id: "faq",
            title: "AION 2 Early Access FAQ",
            paragraphs: [],
            faq: [
              { question: "When does AION 2 Early Access start?", answer: "The confirmed date is September 30, 2026. NC has not announced the exact opening hour or time zone." },
              { question: "How long is AION 2 Early Access?", answer: "Eligible players share one five-day period. Maintenance or updates may reduce uninterrupted playtime below 120 hours." },
              { question: "Which Founder’s Pack includes Early Access?", answer: "Standard, Deluxe, and Ultimate all grant the same five days; higher tiers do not add more access time." },
              { question: "Do I need AION 2 pre-registration?", answer: "Pre-registration and the Founder’s Pack are separate. Registration alone does not grant five-day access." },
              { question: "Will Early Access characters be wiped?", answer: "NC describes Early Access Servers as the first launch wave and has not announced a full-release character wipe. Follow any later operations notice for changes." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 9, {
        eyebrow: "글로벌 출시 가이드",
        title: "아이온2 얼리 액세스 가이드: 날짜·대상·서버·출시 준비",
        description: "아이온2 얼리 액세스 확정 날짜, 5일 이용 대상, 파운더스 팩, 서버군, 시장과 매칭 규칙, 아직 공개되지 않은 오픈 시각과 사전 다운로드를 확인하세요.",
        intro: "먼저 답하면 아이온2 글로벌 얼리 액세스는 2026년 9월 30일 시작합니다. Standard·Deluxe·Ultimate 파운더스 팩 모두 동일한 5일 이용 기간을 제공합니다. NC는 정확한 서버 오픈 시각, 시간대와 사전 다운로드 일정을 아직 발표하지 않았습니다. NC는 Early Access Server를 첫 출시 서버군으로 설명하며 정식 출시 시 캐릭터 초기화를 발표하지 않았습니다.",
        sourceNote: "2026년 7월 24일 NC의 7월 17일 얼리 액세스 안내, 7월 22일 상품 공지와 Steam 상점 필드를 확인했습니다. 오픈 시각, 사전 다운로드와 서버 이전 조건은 미공개로 유지합니다.",
        keywords: [
          "아이온2 얼리 액세스",
          "아이온2 얼리 액세스 날짜",
          "아이온2 사전 플레이",
          "아이온2 9월 30일",
          "아이온2 얼리 액세스 서버",
        ],
        sections: [
          {
            id: "confirmed-status",
            title: "아이온2 얼리 액세스에서 확인된 내용은 무엇인가요?",
            paragraphs: [
              "날짜, 기간, 구매 대상과 첫 서버군은 확인됐습니다. 정확한 오픈 시각과 시간대, 사전 다운로드 일정, Server Transfer의 날짜·가격·제한은 아직 공개되지 않았습니다.",
            ],
            table: {
              caption: "아이온2 얼리 액세스 확인 및 미공개 정보",
              headers: ["항목", "현재 상태", "이용자 확인 사항"],
              rows: [
                { header: "시작 날짜", cells: ["확인", "2026년 9월 30일이며 현지 자정 오픈이 확정된 것은 아닙니다."] },
                { header: "기간", cells: ["확인", "5일이며 기간 중 점검과 업데이트가 있을 수 있습니다."] },
                { header: "대상", cells: ["확인", "Standard·Deluxe·Ultimate가 동일한 기간을 제공합니다."] },
                { header: "오픈 시각／시간대", cells: ["미공개", "상점 카운트다운으로 추정하지 말고 NC 운영 공지를 기다립니다."] },
                { header: "사전 다운로드", cells: ["미공개", "제3자 ‘선행 클라이언트’를 설치하지 않습니다."] },
                { header: "정식 출시", cells: ["일치 확인 전", "Steam 팩 메타데이터는 10월 5일, NC와 Steam 게임 메인 페이지는 9월 필드를 유지합니다."] },
              ],
            },
          },
          {
            id: "access-eligibility",
            title: "아이온2 얼리 액세스 이용 방법",
            paragraphs: [
              "파운더스 팩 어느 에디션이든 5일 이용 권한이 포함됩니다. 상위 에디션이 기간을 늘리지 않으며 시작 뒤 구매하면 남은 기간만 이용합니다. 먼저 시작하는 것이 유일한 목적이면 Standard로도 충분합니다.",
              "사전예약과 얼리 액세스는 별도 절차입니다. 사전예약은 이벤트와 펫 보상, 얼리 액세스는 유료 파운더스 팩 권한이므로 하나를 완료해도 다른 하나가 자동 완료되지 않습니다.",
            ],
          },
          {
            id: "server-waves",
            title: "Early Access Server와 Launch Server의 차이",
            paragraphs: [
              "Early Access Server가 대상 이용자에게 먼저 열리고 정식 출시 때 두 번째 Launch Server군이 추가됩니다. 미구매자는 새 월드를 선택하거나 해당 서버가 열려 있고 수용 가능할 때 Early Access Server에 들어갈 수 있습니다.",
              "NC는 인구를 살핀 뒤 Server Transfer Service를 제공할 계획이지만 날짜, 가격과 제한은 미공개입니다. 길드와 지역, 서버군, 종족을 맞추고 소문으로 나온 서버명에 계획을 고정하지 마세요.",
            ],
          },
          {
            id: "matching-pvp",
            title: "던전 매칭, PvP와 월드 간 플레이",
            paragraphs: [
              "사전 기간 던전 매칭은 같은 지역의 Early Access Server 전체에서 진행되고 정식 출시 뒤 두 서버군으로 넓어집니다. 다른 월드 친구와 친구 추가 및 월드 간 던전 파티도 가능합니다.",
              "천족과 마족 월드는 분리됩니다. 사전 기간 어비스 매칭은 Early Access Server군에서 먼저 진행되며, 월드 간 던전이 어비스와 시장을 포함한 모든 콘텐츠 공유를 뜻하지 않습니다.",
            ],
          },
          {
            id: "markets-progress",
            title: "시장과 진행도 제한",
            paragraphs: [
              "로컬 Server Market 시스템은 얼리 액세스 첫날 열립니다. 현재 글로벌 비즈니스 모델 계획상 Market과 Kina／Quna Exchange의 실제 이용에는 유효한 Membership이 필요합니다. Cross-Server Market은 얼리 액세스나 정식 출시 당일 열리지 않고 참여 월드의 진행도가 비슷해진 뒤 별도 공지됩니다.",
              "5일의 가치가 장기 우위를 보장하는 것은 아닙니다. 파티, 길드, 종족과 실제 플레이 시간으로 판단하고 점검과 업데이트로 120시간 전체를 이용하지 못할 수 있다는 점을 고려하세요.",
            ],
          },
          {
            id: "launch-checklist",
            title: "아이온2 얼리 액세스 전 준비 사항",
            paragraphs: ["계정과 PC를 먼저 준비하고 공식 시간대, 사전 다운로드와 서버 목록을 기다립니다. NC 비밀번호, Steam 로그인이나 일회용 인증번호를 요구하는 대리 서비스를 사용하지 마세요."],
            steps: [
              { title: "Steam 또는 PURPLE 선택", description: "구매 권한과 실행 플랫폼이 고정되므로 파티 계획과 지역 상점 조건을 먼저 확인합니다." },
              { title: "파운더스 팩 선택", description: "사전 플레이만 원하면 Standard, 공개된 외형을 원할 때만 Deluxe·Ultimate를 비교합니다." },
              { title: "PC와 계정 준비", description: "100GB 이상의 여유 공간, 드라이버 업데이트와 계정 보안 설정을 확인합니다." },
              { title: "운영 공지 대기", description: "NC가 발표하기 전 오픈 시각, 시간대, 사전 다운로드와 서버명을 추정하지 않습니다." },
            ],
          },
          {
            id: "faq",
            title: "아이온2 얼리 액세스 FAQ",
            paragraphs: [],
            faq: [
              { question: "아이온2 얼리 액세스는 언제 시작하나요?", answer: "확인된 날짜는 2026년 9월 30일이며 정확한 오픈 시각과 시간대는 아직 미공개입니다." },
              { question: "아이온2 얼리 액세스 기간은 며칠인가요?", answer: "대상 이용자는 동일한 5일 기간을 이용하며 점검이나 업데이트로 연속 이용 시간이 줄 수 있습니다." },
              { question: "어떤 파운더스 팩이 얼리 액세스를 제공하나요?", answer: "Standard·Deluxe·Ultimate 모두 동일한 5일을 제공하고 상위 팩이 기간을 늘리지 않습니다." },
              { question: "아이온2 사전예약이 필요한가요?", answer: "사전예약과 파운더스 팩은 별도이며 사전예약만으로 5일 이용 권한을 받지 않습니다." },
              { question: "얼리 액세스 캐릭터가 정식 출시 때 초기화되나요?", answer: "NC는 Early Access Server를 첫 출시 서버군으로 설명했고 정식 출시 시 캐릭터 초기화를 발표하지 않았습니다. 이후 운영 공지를 확인하세요." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "steam-vs-purple",
    schemaType: "Article",
    publishedAt: "2026-07-24",
    updatedAt: "2026-07-24",
    readingMinutes: 8,
    publication: publishedVerified,
    sources: [globalPlatformSource, earlyAccessSource, foundersPackSource, steamSource],
    heroImage: platformHero,
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球 PC 版",
        en: "AION 2 Global PC",
        ko: "AION 2 글로벌 PC",
      },
    },
    primaryAction: {
      id: "open-official-global-platform-announcement",
      href: globalPlatformSource.url,
      sourceId: globalPlatformSource.id,
      translations: {
        "zh-hant": {
          eyebrow: "平台結論",
          title: "Steam 與 PURPLE 連到相同伺服器，但購買權益不能跨平台",
          description: "先按帳號習慣、所在地商店、退款方式與是否需要 PURPLE 升級商品選擇；不要假設之後可以轉移購買。",
          label: "查看 NC 全球平台公告",
          note: "帳號綁定、跨購買與遷移未確認的部分，本文不依其他 NC 遊戲推測。",
          facts: [
            { label: "平台", value: "Steam、PURPLE" },
            { label: "伺服器", value: "相同地區伺服器" },
            { label: "購買", value: "權益與啟動平台鎖定" },
          ],
        },
        en: {
          eyebrow: "PLATFORM ANSWER",
          title: "Steam and PURPLE use the same servers, but purchases are platform-locked",
          description: "Choose by account preference, regional storefront, refund path, and whether PURPLE’s pack upgrades matter. Do not assume a later entitlement transfer.",
          label: "Read NC’s global platform announcement",
          note: "Unconfirmed account binding, cross-purchase, and migration details are not inferred from other NC games.",
          facts: [
            { label: "Platforms", value: "Steam and PURPLE" },
            { label: "Servers", value: "The same regional servers" },
            { label: "Purchases", value: "Entitlement and launcher locked" },
          ],
        },
        ko: {
          eyebrow: "플랫폼 결론",
          title: "Steam과 PURPLE은 같은 서버를 사용하지만 구매 권한은 플랫폼에 고정",
          description: "계정 선호, 지역 상점, 환불 경로와 PURPLE 업그레이드 상품 필요 여부로 선택하고 추후 이전 가능성을 가정하지 마세요.",
          label: "NC 글로벌 플랫폼 발표 보기",
          note: "미확인 계정 연동, 교차 구매와 이전은 다른 NC 게임으로 추정하지 않습니다.",
          facts: [
            { label: "플랫폼", value: "Steam·PURPLE" },
            { label: "서버", value: "같은 지역 서버" },
            { label: "구매", value: "권한·실행 플랫폼 고정" },
          ],
        },
      },
    },
    related: [
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "guides", slug: "early-access" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 8, {
        eyebrow: "全球版平台比較",
        title: "AION 2 Steam vs PURPLE：購買、帳號、更新與同服差異",
        description: "比較 AION 2 Steam 與 PURPLE 的下載、Founder’s Pack、平台鎖定、升級、同服、付款與退款，並標示帳號遷移和跨購買的未確認項目。",
        intro: "先說結論：AION 2 全球 PC 版將透過 Steam 與 PURPLE 提供，兩邊連到相同地區伺服器，因此玩家不會因啟動器分到兩套世界；但 Founder’s Pack、Early Access 權益與啟動方式會鎖在購買平台。已有 Steam 使用習慣、錢包或退款流程的玩家可優先選 Steam；重視 NC 啟動器與已公布版本升級商品的玩家可考慮 PURPLE。官方尚未確認購買遷移、跨平台升級或完整帳號綁定流程。",
        sourceNote: "2026 年 7 月 24 日核對 NC 4 月 22 日全球 PC 平台公告、7 月 17 日 Early Access 說明、7 月 22 日商品公告與 Steam 商店。未確認的帳號與遷移欄位明確保留為未知。",
        keywords: [
          "AION 2 Steam vs PURPLE",
          "AION2 Steam",
          "AION2 PURPLE",
          "AION 2 平台選擇",
          "AION 2 跨平台",
        ],
        sections: [
          {
            id: "platform-comparison",
            title: "AION 2 Steam 與 PURPLE 差異一覽",
            paragraphs: ["兩個平台提供同一款全球 PC 服務，但商店、啟動器、付款與 Founder’s Pack 升級安排不同。下表只列目前官方可支持的差異。"],
            table: {
              caption: "AION 2 Steam vs PURPLE 官方可確認比較",
              headers: ["比較項目", "Steam", "PURPLE"],
              rows: [
                { header: "下載與啟動", cells: ["透過 Steam 客戶端", "透過 NC PURPLE 啟動器"] },
                { header: "伺服器", cells: ["與 PURPLE 使用相同地區伺服器", "與 Steam 使用相同地區伺服器"] },
                { header: "Founder’s Pack", cells: ["Steam 購買並以 Steam 啟動", "PURPLE 購買並以 PURPLE 啟動"] },
                { header: "版本升級", cells: ["尚未公布升級商品", "已公布 Standard→Deluxe／Ultimate 與 Deluxe→Ultimate"] },
                { header: "跨平台權益", cells: ["不能把購買權益拿到 PURPLE 使用", "不能把購買權益拿到 Steam 使用"] },
                { header: "價格與退款", cells: ["按所在地 Steam 商店和平台條款", "按所在地 PURPLE 商店和 NC 條款"] },
                { header: "帳號遷移", cells: ["未確認", "未確認"] },
              ],
            },
          },
          {
            id: "download-updates",
            title: "下載、更新與全球版地區",
            paragraphs: [
              "Steam 使用 Steam 客戶端管理安裝與更新；PURPLE 使用 NC 的 PURPLE 啟動器。全球版已公布北美、南美、歐洲與日本地區伺服器，以及十種介面語言。平台選擇不會替你自動決定伺服器地區。",
              "兩邊實際下載大小、預載時間與上線日補丁尚未公布。Steam 目前要求 100 GB 可用空間並建議 SSD，但 100 GB 是儲存需求，不是已確認的壓縮下載量。PURPLE 客戶端需求應在開放下載後重新核對。",
            ],
          },
          {
            id: "accounts-friends",
            title: "帳號、好友與同服遊玩",
            paragraphs: [
              "NC 明確表示 Steam 與 PURPLE 玩家連到相同伺服器，能在遊戲世界中相遇。跨世界副本、好友與伺服器規則取決於同一地區的世界架構，而不是啟動器品牌。",
              "然而，已核對來源沒有完整說明 Steam 帳號與 NC 帳號的綁定步驟、解除方式、同一個人能否共用角色資料，以及日後是否能從一個啟動器遷到另一個。這些欄位應標記未確認，不能用其他 NC 遊戲的登入流程補答案。",
            ],
          },
          {
            id: "founders-packs",
            title: "Founder’s Pack 與 Early Access 怎麼選平台？",
            paragraphs: [
              "在 Steam 買的 Founder’s Pack 只能透過 Steam 使用，在 PURPLE 買的版本只能透過 PURPLE 使用，五日 Early Access 也跟著購買平台。兩邊同服不代表商品能跨用。",
              "PURPLE 已公布版本補差升級商品；Steam 尚未公布同等升級路徑。因此 Steam 玩家應在結帳前確認版本，PURPLE 玩家也應閱讀升級商品實際價差、地區與條款。所有版本提供相同五日，平台與版本都不會增加額外天數。",
            ],
          },
          {
            id: "payments-refunds",
            title: "付款、地區價格與退款要注意什麼？",
            paragraphs: [
              "Steam 顯示所在地區貨幣、支付方式與 Steam 退款規則；PURPLE 由 NC 商店顯示可購買地區、幣別與條款。價格可能因地區、稅費與時間不同，不應把一個國家的售價寫成全球統一價格。",
              "付款前保存商品頁與版本內容，確認帳號、地區、幣別、退款入口和停售日期。任何聲稱可場外代購、轉移平台權益或要求提供一次性驗證碼的服務，都不屬於官方結帳流程。",
            ],
          },
          {
            id: "which-platform",
            title: "哪一種 AION 2 平台比較適合你？",
            paragraphs: ["選擇重點不是伺服器人口，因為兩平台共用世界；真正差異在商店、帳號習慣、付款退款與升級選項。"],
            steps: [
              { title: "選 Steam", description: "你想集中 Steam 遊戲庫、使用 Steam 錢包與既有退款流程，而且已確定 Founder’s Pack 版本。" },
              { title: "考慮 PURPLE", description: "你習慣 NC 啟動器，或在意已公布的 Founder’s Pack 補差升級商品。" },
              { title: "先等待", description: "你仍需要帳號綁定、地區供應、預載或遷移細節；等官方流程公開後再購買。" },
            ],
          },
          {
            id: "faq",
            title: "AION 2 Steam vs PURPLE 常見問題",
            paragraphs: [],
            faq: [
              { question: "Steam 與 PURPLE 玩家可以一起玩 AION 2 嗎？", answer: "可以。NC 表示兩個平台使用相同伺服器；實際跨世界內容仍依地區與遊戲系統規則。" },
              { question: "Steam 買的 Founder’s Pack 可以在 PURPLE 使用嗎？", answer: "不可以。購買權益與五日 Early Access 會鎖在購買平台，反向也相同。" },
              { question: "Steam 可以升級 AION 2 Founder’s Pack 嗎？", answer: "截至最後核對，PURPLE 已公布補差升級商品，Steam 尚未公布同等升級路徑。" },
              { question: "Steam 和 PURPLE 的 AION 2 價格一樣嗎？", answer: "不一定。價格、幣別、稅費與供應會按地區和平台顯示，付款前應在登入後商店核對。" },
              { question: "以後能把角色從 Steam 轉到 PURPLE 嗎？", answer: "官方尚未確認啟動器之間的角色或購買遷移，不能假設日後一定支援。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 8, {
        eyebrow: "GLOBAL PLATFORM COMPARISON",
        title: "AION 2 Steam vs PURPLE: Purchases, Accounts, Updates and Servers",
        description: "Compare AION 2 on Steam and PURPLE: download, Founder’s Packs, platform locks, upgrades, shared servers, payments, refunds, and unconfirmed migration details.",
        intro: "Answer first: AION 2 Global PC will be available through Steam and PURPLE, and both connect to the same regional servers. Players are not split into separate worlds by launcher, but a Founder’s Pack, its Early Access entitlement, and the launch method are locked to the purchase platform. Choose Steam for an existing library, wallet, or refund workflow; consider PURPLE if its NC launcher and announced pack-upgrade products matter. Purchase migration, cross-platform upgrades, and the complete account-linking flow remain unconfirmed.",
        sourceNote: "Verified July 24, 2026 against NC’s April 22 global PC announcement, July 17 Early Access update, July 22 product notice, and the Steam store. Unpublished account and migration fields remain explicitly unknown.",
        keywords: [
          "AION 2 Steam vs PURPLE",
          "AION 2 Steam",
          "AION 2 PURPLE",
          "AION 2 platform",
          "AION 2 cross platform",
        ],
        sections: [
          {
            id: "platform-comparison",
            title: "AION 2 Steam vs PURPLE comparison",
            paragraphs: ["Both distribute the same global PC service, but their storefronts, launchers, payments, and Founder’s Pack upgrade options differ. The table includes only distinctions supported by current official sources."],
            table: {
              caption: "Confirmed AION 2 Steam and PURPLE differences",
              headers: ["Topic", "Steam", "PURPLE"],
              rows: [
                { header: "Download and launch", cells: ["Steam client", "NC PURPLE launcher"] },
                { header: "Servers", cells: ["The same regional servers as PURPLE", "The same regional servers as Steam"] },
                { header: "Founder’s Pack", cells: ["Bought and launched through Steam", "Bought and launched through PURPLE"] },
                { header: "Edition upgrade", cells: ["No upgrade product announced", "Standard→Deluxe/Ultimate and Deluxe→Ultimate announced"] },
                { header: "Cross-platform entitlement", cells: ["Cannot be used through PURPLE", "Cannot be used through Steam"] },
                { header: "Price and refunds", cells: ["Regional Steam store and platform terms", "Regional PURPLE store and NC terms"] },
                { header: "Account migration", cells: ["Unconfirmed", "Unconfirmed"] },
              ],
            },
          },
          {
            id: "download-updates",
            title: "Downloads, updates, and global regions",
            paragraphs: [
              "Steam manages installation and updates through the Steam client; PURPLE uses NC’s PURPLE launcher. The announced global service regions are North America, South America, Europe, and Japan, with ten interface languages. A launcher does not automatically select the best server region.",
              "Neither platform has published the final download size, preload schedule, or launch-day patch. Steam currently requires 100 GB of available storage and recommends an SSD, but 100 GB is a storage requirement—not a confirmed compressed download size.",
            ],
          },
          {
            id: "accounts-friends",
            title: "Accounts, friends, and shared servers",
            paragraphs: [
              "NC explicitly says Steam and PURPLE players connect to the same servers and can meet in the same world. Cross-world dungeons, friends, and server rules follow the regional world structure rather than the launcher brand.",
              "The checked sources do not fully explain Steam-to-NC account linking, unlinking, whether one person can expose the same character data in both launchers, or a future launcher migration. Mark those fields unconfirmed instead of copying a login flow from another NC game.",
            ],
          },
          {
            id: "founders-packs",
            title: "How do Founder’s Packs and Early Access affect the choice?",
            paragraphs: [
              "A Founder’s Pack bought on Steam works through Steam; a PURPLE purchase works through PURPLE. The five-day Early Access entitlement follows the purchase platform. Shared servers do not make products cross-platform.",
              "PURPLE has announced paid edition-upgrade products, while Steam has not announced an equivalent route. Steam buyers should select a tier before checkout. All tiers still grant the same five days; neither platform nor edition adds more access time.",
            ],
          },
          {
            id: "payments-refunds",
            title: "What should you check for payments, regional pricing, and refunds?",
            paragraphs: [
              "Steam shows local currency, payment methods, and Steam refund terms. PURPLE uses the NC storefront for regional availability, currency, and terms. Prices can vary by region, tax, platform, and date, so one country’s price is not a universal price.",
              "Save the product page and tier contents before paying. Verify account, region, currency, refund entry, and sale period. An off-platform reseller promising entitlement transfers or requesting a one-time code is not part of either official checkout.",
            ],
          },
          {
            id: "which-platform",
            title: "Which AION 2 platform should you choose?",
            paragraphs: ["Server population is not the deciding factor because the platforms share worlds. The practical differences are storefront, account preference, payment and refund workflow, and upgrade availability."],
            steps: [
              { title: "Choose Steam", description: "You want the game in your Steam library, prefer Steam payment or refund tools, and can choose the intended pack tier now." },
              { title: "Consider PURPLE", description: "You already use NC’s launcher or value the announced paid edition-upgrade products." },
              { title: "Wait before buying", description: "Account linking, regional availability, preload, or migration details still determine your choice." },
            ],
          },
          {
            id: "faq",
            title: "AION 2 Steam vs PURPLE FAQ",
            paragraphs: [],
            faq: [
              { question: "Can Steam and PURPLE players play AION 2 together?", answer: "Yes. NC says both platforms use the same servers. Cross-world activities still follow regional and in-game rules." },
              { question: "Can I use a Steam Founder’s Pack on PURPLE?", answer: "No. The purchase and five-day Early Access entitlement are locked to the purchase platform, and the reverse also applies." },
              { question: "Can I upgrade an AION 2 Founder’s Pack on Steam?", answer: "At the last verification, PURPLE had announced paid upgrades and Steam had not announced an equivalent upgrade route." },
              { question: "Does AION 2 cost the same on Steam and PURPLE?", answer: "Not necessarily. Price, currency, tax, and availability are displayed by region and platform; check the signed-in store before paying." },
              { question: "Can I move an AION 2 character from Steam to PURPLE later?", answer: "NC has not confirmed launcher-to-launcher character or purchase migration. Do not assume it will be supported." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 8, {
        eyebrow: "글로벌 플랫폼 비교",
        title: "아이온2 Steam vs PURPLE: 구매·계정·업데이트·서버 차이",
        description: "아이온2 Steam과 PURPLE의 다운로드, 파운더스 팩, 플랫폼 제한, 업그레이드, 공용 서버, 결제·환불 및 미확인 이전 정보를 비교합니다.",
        intro: "먼저 답하면 아이온2 글로벌 PC판은 Steam과 PURPLE로 제공되고 두 플랫폼은 같은 지역 서버에 연결됩니다. 실행 프로그램 때문에 월드가 분리되지는 않지만 파운더스 팩, 얼리 액세스 권한과 실행 방식은 구매 플랫폼에 고정됩니다. Steam 라이브러리·지갑·환불 흐름이 중요하면 Steam, NC 런처와 공개된 팩 업그레이드 상품이 중요하면 PURPLE을 고려하세요. 구매 이전, 플랫폼 간 업그레이드와 전체 계정 연동 절차는 미확인입니다.",
        sourceNote: "2026년 7월 24일 NC의 4월 22일 글로벌 PC 발표, 7월 17일 얼리 액세스 안내, 7월 22일 상품 공지와 Steam 상점을 확인했습니다. 미공개 계정과 이전 항목은 알 수 없음으로 둡니다.",
        keywords: [
          "아이온2 Steam vs PURPLE",
          "아이온2 스팀",
          "아이온2 퍼플",
          "아이온2 플랫폼",
          "아이온2 크로스 플랫폼",
        ],
        sections: [
          {
            id: "platform-comparison",
            title: "아이온2 Steam과 PURPLE 차이",
            paragraphs: ["같은 글로벌 PC 서비스를 제공하지만 상점, 런처, 결제와 파운더스 팩 업그레이드가 다릅니다. 현재 공식 출처로 확인 가능한 차이만 정리합니다."],
            table: {
              caption: "아이온2 Steam vs PURPLE 확인 비교",
              headers: ["항목", "Steam", "PURPLE"],
              rows: [
                { header: "다운로드·실행", cells: ["Steam 클라이언트", "NC PURPLE 런처"] },
                { header: "서버", cells: ["PURPLE과 같은 지역 서버", "Steam과 같은 지역 서버"] },
                { header: "파운더스 팩", cells: ["Steam 구매·실행", "PURPLE 구매·실행"] },
                { header: "에디션 업그레이드", cells: ["업그레이드 상품 미공개", "Standard→Deluxe／Ultimate, Deluxe→Ultimate 공개"] },
                { header: "플랫폼 간 권한", cells: ["PURPLE에서 사용 불가", "Steam에서 사용 불가"] },
                { header: "가격·환불", cells: ["지역 Steam 상점과 플랫폼 약관", "지역 PURPLE 상점과 NC 약관"] },
                { header: "계정 이전", cells: ["미확인", "미확인"] },
              ],
            },
          },
          {
            id: "download-updates",
            title: "다운로드, 업데이트와 글로벌 지역",
            paragraphs: [
              "Steam은 Steam 클라이언트, PURPLE은 NC 런처로 설치와 업데이트를 관리합니다. 글로벌 서비스 지역은 북미, 남미, 유럽, 일본이며 인터페이스 10개 언어가 발표됐습니다. 플랫폼 선택이 서버 지역을 자동 결정하지 않습니다.",
              "최종 다운로드 용량, 사전 다운로드와 출시일 패치는 미공개입니다. Steam은 여유 공간 100GB와 SSD 권장을 표시하지만 100GB는 저장 공간 요구 사항이지 압축 다운로드 용량이 아닙니다.",
            ],
          },
          {
            id: "accounts-friends",
            title: "계정, 친구와 공용 서버",
            paragraphs: [
              "NC는 Steam과 PURPLE 이용자가 같은 서버에 연결된다고 밝혔습니다. 월드 간 던전, 친구와 서버 규칙은 런처가 아니라 지역 월드 구조를 따릅니다.",
              "Steam과 NC 계정의 전체 연동·해제 절차, 두 런처에서 같은 캐릭터를 보는 방법, 향후 런처 이전은 확인한 출처에 없습니다. 다른 NC 게임의 로그인 방식으로 빈칸을 채우지 않습니다.",
            ],
          },
          {
            id: "founders-packs",
            title: "파운더스 팩과 얼리 액세스의 플랫폼 제한",
            paragraphs: [
              "Steam에서 산 팩은 Steam, PURPLE에서 산 팩은 PURPLE로 이용하고 5일 얼리 액세스도 구매 플랫폼을 따릅니다. 같은 서버를 사용해도 상품은 교차 이용할 수 없습니다.",
              "PURPLE은 유료 에디션 업그레이드 상품을 발표했지만 Steam은 같은 경로를 공개하지 않았습니다. Steam 구매자는 결제 전 에디션을 정해야 하며 어느 에디션도 5일보다 더 긴 기간을 제공하지 않습니다.",
            ],
          },
          {
            id: "payments-refunds",
            title: "결제, 지역 가격과 환불 확인",
            paragraphs: [
              "Steam은 지역 통화, 결제와 Steam 환불 약관을, PURPLE은 NC 상점의 지역 판매·통화·약관을 표시합니다. 가격은 지역, 세금, 플랫폼과 날짜에 따라 달라 한 국가 가격을 글로벌 공통 가격으로 볼 수 없습니다.",
              "결제 전 상품 페이지와 구성을 저장하고 계정, 지역, 통화, 환불 진입점과 판매 기간을 확인하세요. 플랫폼 권한 이전을 약속하거나 일회용 인증번호를 요구하는 외부 판매자는 공식 결제 과정이 아닙니다.",
            ],
          },
          {
            id: "which-platform",
            title: "아이온2 플랫폼 선택 기준",
            paragraphs: ["두 플랫폼은 월드를 공유하므로 서버 인구가 선택 기준은 아닙니다. 상점, 계정 선호, 결제·환불 방식과 업그레이드 제공 여부를 비교하세요."],
            steps: [
              { title: "Steam 선택", description: "Steam 라이브러리, 지갑과 환불 도구를 선호하고 지금 팩 에디션을 확정할 수 있습니다." },
              { title: "PURPLE 고려", description: "NC 런처를 사용하거나 공개된 유료 에디션 업그레이드가 중요합니다." },
              { title: "구매 대기", description: "계정 연동, 지역 판매, 사전 다운로드나 이전 정보가 선택에 필요합니다." },
            ],
          },
          {
            id: "faq",
            title: "아이온2 Steam vs PURPLE FAQ",
            paragraphs: [],
            faq: [
              { question: "Steam과 PURPLE 이용자가 아이온2를 함께 플레이할 수 있나요?", answer: "가능합니다. NC는 두 플랫폼이 같은 서버를 사용한다고 밝혔으며 월드 간 콘텐츠는 지역과 게임 규칙을 따릅니다." },
              { question: "Steam 파운더스 팩을 PURPLE에서 사용할 수 있나요?", answer: "불가능합니다. 구매와 5일 얼리 액세스 권한은 구매 플랫폼에 고정되고 반대도 같습니다." },
              { question: "Steam에서 아이온2 파운더스 팩을 업그레이드할 수 있나요?", answer: "마지막 확인 기준 PURPLE은 유료 업그레이드를 발표했지만 Steam은 동일한 경로를 발표하지 않았습니다." },
              { question: "Steam과 PURPLE 아이온2 가격은 같은가요?", answer: "항상 같다고 확인되지 않았습니다. 가격, 통화, 세금과 판매 여부를 로그인한 지역 상점에서 확인하세요." },
              { question: "나중에 Steam 캐릭터를 PURPLE로 옮길 수 있나요?", answer: "NC는 런처 간 캐릭터 또는 구매 이전을 확인하지 않았으므로 지원될 것이라고 가정하면 안 됩니다." },
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
