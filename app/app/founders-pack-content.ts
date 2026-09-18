import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { ContentLocale } from "./site-config";
import {
  officialFounderActionHrefs,
  officialFounderActionTranslations,
  officialFounderGuideTranslations,
  officialFounderHeroTranslations,
  officialFounderNoticeLocalizations,
} from "./founders-pack-global-locales";
import {
  editorialFounderActionTranslations,
  editorialFounderGuideTranslations,
  editorialFounderHeroTranslations,
  editorialFounderSourceLocalizations,
} from "./founders-pack-editorial-locales";

type LocalizedArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote" | "sections"
> & { keywords?: readonly string[] };

type ArticleLabels = Pick<
  LocalizedContent,
  | "byline"
  | "backLabel"
  | "contentsLabel"
  | "publishedLabel"
  | "updatedLabel"
  | "relatedLabel"
>;

const newsLabels = {
  "zh-hant": {
    byline: "AION2 KINA 編輯部",
    backLabel: "返回新聞中心",
    contentsLabel: "本文重點",
    publishedLabel: "本站發布",
    updatedLabel: "資料核對",
    relatedLabel: "延伸閱讀",
  },
  en: {
    byline: "AION2 KINA Editorial",
    backLabel: "Back to news",
    contentsLabel: "In this report",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  ko: {
    byline: "AION2 KINA 편집부",
    backLabel: "뉴스로 돌아가기",
    contentsLabel: "이 글의 핵심",
    publishedLabel: "사이트 게시",
    updatedLabel: "자료 확인",
    relatedLabel: "관련 글",
  },
} as const satisfies Record<ContentLocale, ArticleLabels>;

const guideLabels = {
  "zh-hant": {
    byline: "AION2 KINA 編輯部",
    backLabel: "返回攻略中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "最後核對",
    relatedLabel: "相關內容",
  },
  en: {
    byline: "AION2 KINA Editorial",
    backLabel: "Back to guides",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  ko: {
    byline: "AION2 KINA 편집부",
    backLabel: "공략으로 돌아가기",
    contentsLabel: "페이지 내용",
    publishedLabel: "사이트 게시",
    updatedLabel: "마지막 확인",
    relatedLabel: "관련 콘텐츠",
  },
} as const satisfies Record<ContentLocale, ArticleLabels>;

function articleCopy(
  locale: ContentLocale,
  readingMinutes: number,
  labels: Record<ContentLocale, ArticleLabels>,
  body: LocalizedArticleBody,
): LocalizedContent {
  const readingTime = {
    "zh-hant": `約 ${readingMinutes} 分鐘`,
    en: `${readingMinutes} min read`,
    ko: `${readingMinutes}분 읽기`,
  }[locale];

  return { ...labels[locale], readingTime, ...body };
}

const publishedVerified = {
  status: "published",
  indexable: true,
  localeReview: { "zh-hant": "approved", en: "approved", ko: "approved" },
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

const publishedVerifiedFounderGuide = {
  status: "published",
  indexable: true,
  localeReview: {
    "zh-hans": "approved",
    "zh-hant": "approved",
    en: "approved",
    ko: "approved",
    de: "approved",
    es: "approved",
    fr: "approved",
    ja: "approved",
    "pt-br": "approved",
    ru: "approved",
  },
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

const globalFoundersPackSource = {
  id: "aion2-global-founders-packs-2026-07-22",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 official notice — 7/22 New Product Info: Founder's Pack",
  url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f&redirect=false",
  publishedAt: "2026-07-22",
  retrievedAt: "2026-07-25",
  verifiedAt: "2026-07-25",
  localizations: {
    ...officialFounderNoticeLocalizations,
    ...editorialFounderSourceLocalizations,
  },
} as const satisfies ContentSource;

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

const steamFoundersPackSource = {
  id: "steam-aion2-founders-pack",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 Standard Founder’s Pack on Steam",
  url: "https://store.steampowered.com/sub/1675062/",
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

const officialImageBase =
  "https://st.ncjapan.co.jp/ncjapan/ncsoft/aion2/official/contents/phase2_EJiepgDgardbi3sE/images/foundersPack_phmi69/en";

function officialPackHero(
  file: "pack1_mb.webp" | "pack2_mb.webp",
  translations: ContentHeroImage["translations"],
): ContentHeroImage {
  return {
    src: `${officialImageBase}/${file}`,
    width: 1200,
    height: 710,
    credit: "NC Corporation",
    sourceUrl: globalFoundersPackSource.url,
    rights: "linked-official-media",
    presentation: "contain",
    translations,
  };
}

export const foundersPackContentEntries = [
  {
    section: "news",
    slug: "founders-packs-announced-july-2026",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-25",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [
      globalFoundersPackSource,
      earlyAccessSource,
      globalBusinessModelSource,
      steamFoundersPackSource,
    ],
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hant": "AION 2 全球 PC 版",
        en: "AION 2 Global PC",
        ko: "AION 2 글로벌 PC",
      },
    },
    heroImage: officialPackHero("pack1_mb.webp", {
      "zh-hant": {
        alt: "AION 2 Standard Founder’s Pack 官方包裝圖",
        caption: "NC Corporation 的 Standard Founder’s Pack 官方圖片；本文同時整理三種版本。",
      },
      en: {
        alt: "Official AION 2 Standard Founder’s Pack artwork",
        caption: "Official Standard Founder’s Pack artwork from NC Corporation; the report covers all three editions.",
      },
      ko: {
        alt: "AION 2 Standard 파운더스 팩 공식 이미지",
        caption: "NC Corporation의 Standard 파운더스 팩 공식 이미지이며, 본문은 세 에디션을 모두 다룹니다.",
      },
    }),
    primaryAction: {
      id: "view-official-founders-packs",
      href: globalFoundersPackSource.url,
      hrefs: officialFounderActionHrefs,
      sourceId: globalFoundersPackSource.id,
      translations: {
        "zh-hant": {
          eyebrow: "官方資料",
          title: "查看 7 月 22 日 Founder’s Pack 官方公告",
          description: "直接核對 NC 公布的版本內容、9 月 30 日搶先遊玩日期、平台限制及最新注意事項。",
          label: "查看 NC 官方公告",
          note: "連結會在新分頁開啟 NC Corporation 官方網站。",
          facts: [
            { label: "版本", value: "Standard、Deluxe、Ultimate" },
            { label: "搶先遊玩", value: "2026-09-30 起，共 5 日" },
            { label: "正式發布", value: "NC 尚未一致確認；Steam 套裝元資料顯示 2026-10-05" },
          ],
        },
        en: {
          eyebrow: "OFFICIAL SOURCE",
          title: "Read NC’s July 22 Founder’s Pack notice",
          description: "Verify the editions, September 30 advance-access date, platform restrictions, and current purchase notes.",
          label: "Read the NC notice",
          note: "Opens the official NC Corporation site in a new tab.",
          facts: [
            { label: "Editions", value: "Standard, Deluxe, Ultimate" },
            { label: "Advance access", value: "Five days from September 30, 2026" },
            { label: "Full launch", value: "Not consistently confirmed by NC; Steam pack metadata lists October 5" },
          ],
        },
        ko: {
          eyebrow: "공식 출처",
          title: "7월 22일 파운더스 팩 공식 공지 확인",
          description: "NC가 공개한 에디션 구성, 9월 30일 사전 플레이 일정, 플랫폼 제한과 최신 유의사항을 확인하세요.",
          label: "NC 공식 공지 보기",
          note: "NC Corporation 공식 사이트가 새 탭에서 열립니다.",
          facts: [
            { label: "에디션", value: "Standard, Deluxe, Ultimate" },
            { label: "사전 플레이", value: "2026-09-30부터 5일" },
            { label: "정식 출시", value: "NC 통합 확인 전; Steam 패키지 메타데이터는 2026-10-05 표시" },
          ],
        },
        ...officialFounderActionTranslations,
      },
    },
    related: [
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 7, newsLabels, {
        eyebrow: "全球服官方消息",
        title: "AION2 全球服搶先遊玩 9/30 開始：Founder’s Pack 公布",
        description:
          "NC 公布 AION2 全球服三款 Founder’s Pack；搶先遊玩於 2026 年 9 月 30 日開始並持續 5 天，本文核對 Steam 標示的 10 月 5 日正式發布日期、平台限制與伺服器安排，並提醒確切開放時間尚未公告。",
        intro:
          "NC 在 2026 年 7 月 22 日公布 Standard、Deluxe 與 Ultimate 三款 Founder’s Pack，並確認全球服搶先遊玩於 9 月 30 日開始、持續 5 天。Steam 三款套裝頁目前把正式發布日期標為 10 月 5 日；NC 尚未公布確切開服時刻，因此倒數與行程安排應以日期為準，不應自行假設時區或小時。",
        sourceNote:
          "資料依 NC 7 月 22 日全球服英語產品公告、德語／西語／法語／巴葡／日語本地化公告、7 月 17 日 Early Access 說明、全球版商業模式與 Steam 套裝頁核對。繁體中文內容以英語全球公告為基準翻譯，美元是官方全球基準；日語頁的日圓屬該地區價格，不套用到本頁。",
        keywords: [
          "AION 2 Founder's Pack",
          "AION2 創始者禮包",
          "AION2 9月30日搶先遊玩",
          "AION2 全球版 2026",
        ],
        sections: [
          {
            id: "timeline",
            title: "9 月 30 日搶先遊玩，Steam 目前標示 10 月 5 日發布",
            paragraphs: [
              "NC 的 7 月 22 日公告寫明 Advanced Access 將於 2026 年 9 月 30 日開始並運行 5 天，所有買家的開始與結束日期相同；即使在活動開始後才購買，也只能加入剩餘時段。伺服器維護或更新可能令實際可玩時間少於完整 5 天。",
              "Steam 的 Standard、Deluxe 與 Ultimate 套裝頁目前都列出 2026 年 10 月 5 日為 Release Date，與 9 月 30 日起 5 天的安排相符。不過 NC 公告沒有提供開服小時，較早的宣傳頁也仍保留「2026 年 9 月」字樣，所以本站不把未公布的 00:00、PDT 或 UTC 當成官方時間。",
            ],
          },
          {
            id: "confirmed-contents",
            title: "三個版本都有相同的 5 日搶先遊玩",
            paragraphs: [
              "Standard 包含 5-Day Advanced Access、Daeva's Campaign Supply Chest (Bound) ×1 與唯一級 Title: Vanguard of Atreia ×1。補給箱內有 Return、Courage、Speed、Benediction、Absorption Scroll 各 10，Life Potion 100、Life Serum 50、Healing Potion 30、Power Shard 10,000 與 Resurrection Spiritstone 5。",
              "Deluxe 包含 Standard 全部內容，再加入七部位 Ascended Daeva 外觀套裝（胸甲、腿甲、頭盔、護肩、手套、靴子、斗篷各 1）與 Eternal Sun 武器外觀箱 ×1。Ultimate 再加入 Styling Chest ×1、六部位 Moonlit Aria 外觀（不含護肩）、Black Dragon 寵物 ×1 與 Blazing Sun Wings ×1；Styling Chest 內有 Customization Voucher ×1 及 7 日 Appearance Change Voucher ×1。",
              "官方商品表把上述內容的交易、刪除與倉庫欄全部標為 X。三個版本的搶先遊玩時間完全相同，較高版本不會增加天數；稱號、護甲與武器造型、寵物及翅膀屬外觀內容，不提供額外能力值。",
            ],
            table: {
              caption: "AION 2 全球服 Founder’s Pack 官方美元價格（2026 年 7 月 22 日）",
              headers: ["版本", "官方 USD 價格", "共同內容", "該版本新增"],
              rows: [
                { header: "Standard", cells: ["$24.99", "5 日搶先、補給箱、稱號", "共同基礎內容"] },
                { header: "Deluxe", cells: ["$49.99", "Standard 全部內容", "Ascended Daeva 七部位外觀、Eternal Sun 武器外觀"] },
                { header: "Ultimate", cells: ["$99.99", "Deluxe 全部內容", "造型券箱、Moonlit Aria 六部位外觀、Black Dragon、Blazing Sun Wings"] },
              ],
            },
          },
          {
            id: "purchase-rules",
            title: "Steam 與 PURPLE 平台鎖定，但玩家使用同一批伺服器",
            paragraphs: [
              "NC 公告要求每個帳號從三個版本中選擇一款。購買多款不會增加獎勵，5 日權益也不能疊加。Steam 購買的版本只能透過 Steam 啟動，PURPLE 購買的版本只能透過 PURPLE 啟動；兩個平台仍連到相同伺服器，因此平台選擇不會把朋友分到不同遊戲世界。",
              "PURPLE 公布了補差升級商品：Standard→Deluxe 為 $25、Standard→Ultimate 為 $75、Deluxe→Ultimate 為 $50。Steam 目前沒有公布對應升級方式，所以 Steam 玩家應在結帳前一次選好版本。官方標示為 USD，其他幣別與稅費應以登入帳號顯示的結算頁為準。",
            ],
          },
          {
            id: "server-boundaries",
            title: "Early Access 與 Launch 伺服器如何銜接？",
            paragraphs: [
              "搶先遊玩開始時，NC 會先開放 Early Access Servers，最初只有持有 Founder’s Pack 的玩家能進入。正式發布時會再開第二批 Launch Servers；沒有購買搶先遊玩的玩家可選新伺服器，也可在容量允許時加入仍開放的 Early Access Server。",
              "搶先期間的副本組隊會在同一地理區域的 Early Access Servers 之間匹配，正式發布後再擴展到同區 Early Access 與 Launch Servers。Server Market 系統從搶先首日提供並只服務單一世界；依目前全球版商業模式方案，實際使用 Market 仍需有效會員。Cross-Server Market 在搶先期間與正式發布當下都不開放，要等參與伺服器進度接近後另行通知。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 7, newsLabels, {
        eyebrow: "OFFICIAL GLOBAL NEWS",
        title: "AION 2 Founder’s Packs: September 30 Early Access",
        description:
          "NC’s three AION 2 Founder’s Packs include five-day early access from September 30; Steam currently lists the full release for October 5, 2026.",
        intro:
          "NC announced Standard, Deluxe, and Ultimate Founder’s Packs on July 22, 2026 and confirmed that advance access starts September 30 for five days. Steam’s three package pages currently list October 5 as the release date. NC has not announced an exact launch hour, so players should treat both milestones as calendar dates rather than assume a time zone.",
        sourceNote:
          "Verified July 25, 2026 against NC’s July 22 global English notice and its German, Spanish, French, Brazilian Portuguese, and Japanese localized editions, plus the Early Access update, global business-model update, and Steam package pages. The English global notice is the base source; each official locale keeps its own terminology, sale window, and displayed currency.",
        keywords: [
          "AION 2 Founder's Packs announcement",
          "AION 2 Founder's Pack",
          "AION 2 September 30 early access",
          "AION 2 October 5 release",
        ],
        sections: [
          {
            id: "timeline",
            title: "September 30 advance access and Steam’s October 5 date",
            paragraphs: [
              "NC’s July 22 notice says advance access begins September 30, 2026 and runs for five days. Every buyer shares the same start and end dates; purchasing after the window begins only grants the remaining time. Maintenance and patches can also reduce the actual playable time.",
              "Steam’s Standard, Deluxe, and Ultimate package pages currently show October 5, 2026 as the release date, consistent with a five-day head start. NC has not published an exact opening hour, and older official marketing still says September, so this article does not invent a midnight, PDT, or UTC launch time.",
            ],
          },
          {
            id: "confirmed-contents",
            title: "Every edition grants the same five-day access period",
            paragraphs: [
              "Standard includes 5-Day Advanced Access, Daeva's Campaign Supply Chest (Bound) ×1, and the Unique-grade Title: Vanguard of Atreia ×1. The chest contains Return, Courage, Speed, Benediction, and Absorption Scrolls ×10 each, Life Potions ×100, Life Serums ×50, Healing Potions ×30, Power Shards ×10,000, and Resurrection Spiritstones ×5.",
              "Deluxe adds the seven-piece Ascended Daeva appearance set—breastplate, greaves, helm, pauldrons, gloves, boots, and cloak—and Eternal Sun Weapon Skin Chest ×1. Ultimate adds Styling Chest ×1, the six-piece Moonlit Aria set without pauldrons, Black Dragon pet ×1, and Blazing Sun Wings ×1. The Styling Chest contains Customization Voucher ×1 and a seven-day Appearance Change Voucher ×1.",
              "The official item table marks trade, deletion, and storage as unavailable for every listed reward. Higher tiers do not add access days, and NC states that the title, armor and weapon skins, pet, and wings grant no additional stats.",
            ],
            table: {
              caption: "Official AION 2 Global Founder’s Pack USD prices from the July 22, 2026 notice",
              headers: ["Edition", "Official USD price", "Shared contents", "Added at this tier"],
              rows: [
                { header: "Standard", cells: ["$24.99", "Five-day access, supply chest, title", "Shared base contents"] },
                { header: "Deluxe", cells: ["$49.99", "Everything in Standard", "Seven-piece Ascended Daeva set and Eternal Sun weapon skin"] },
                { header: "Ultimate", cells: ["$99.99", "Everything in Deluxe", "Styling vouchers, six-piece Moonlit Aria set, Black Dragon, and Blazing Sun Wings"] },
              ],
            },
          },
          {
            id: "purchase-rules",
            title: "Steam and PURPLE are platform-locked but share servers",
            paragraphs: [
              "NC instructs each account to choose one of the three tiers. Buying more than one pack provides no extra rewards, and the five-day benefit does not stack. A Steam purchase can be played only through Steam, while a PURPLE purchase can be played only through PURPLE; both platforms connect to the same servers.",
              "PURPLE lists paid upgrades: Standard→Deluxe for $25, Standard→Ultimate for $75, and Deluxe→Ultimate for $50. Steam has not announced an equivalent path, so Steam buyers should choose their tier before checkout. The global notice labels these amounts in USD; currency conversion, tax, and the final charge depend on the signed-in storefront.",
            ],
          },
          {
            id: "server-boundaries",
            title: "How Early Access and Launch Servers connect",
            paragraphs: [
              "NC will first open Early Access Servers to Founder’s Pack holders. A second wave of Launch Servers opens at full release; non-buyers can choose those new worlds and may join an Early Access Server if it remains open and available.",
              "Dungeon matching spans the Early Access Servers within a region during the head start, then expands to both server waves at launch. The local Server Market system opens on day one; under the current global business-model plan, using it still requires active Membership. The Cross-Server Market will not open during advance access or at launch and comes later when participating servers have reached a similar stage.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 7, newsLabels, {
        eyebrow: "글로벌 공식 소식",
        title: "아이온2 파운더스 팩 공개: 9월 30일 사전 플레이",
        description:
          "NC가 아이온2 글로벌 파운더스 팩 3종과 9월 30일부터 5일간 진행되는 사전 플레이를 공개했습니다. Steam은 현재 정식 출시일을 2026년 10월 5일로 표시하며, 정확한 시작 시각은 아직 공지되지 않았습니다.",
        intro:
          "NC는 2026년 7월 22일 Standard, Deluxe, Ultimate 파운더스 팩을 공개하고 사전 플레이가 9월 30일부터 5일간 진행된다고 확인했습니다. Steam의 세 패키지 페이지는 현재 10월 5일을 출시일로 표시합니다. NC가 정확한 서버 오픈 시각은 발표하지 않았으므로 임의의 시간대나 자정을 공식 일정으로 단정할 수 없습니다.",
        sourceNote:
          "2026년 7월 25일 NC 글로벌 영문 상품 공지와 독일어·스페인어·프랑스어·브라질 포르투갈어·일본어 공식 현지화 공지, Early Access 안내, 글로벌 비즈니스 모델 및 Steam 페이지를 교차 확인했습니다. 한국어는 영문 글로벌 공지를 기준으로 번역하며 일본어 페이지의 JPY 가격을 한국 결제 가격으로 적용하지 않습니다.",
        keywords: [
          "아이온2 파운더스 팩",
          "AION2 파운더스 팩 공개",
          "아이온2 9월 30일 사전 플레이",
          "아이온2 10월 5일 출시",
        ],
        sections: [
          {
            id: "timeline",
            title: "9월 30일 사전 플레이와 Steam의 10월 5일 표기",
            paragraphs: [
              "NC의 7월 22일 공지에 따르면 사전 플레이는 2026년 9월 30일 시작해 5일간 진행됩니다. 모든 구매자의 시작일과 종료일은 같고, 기간 도중 구매하면 남은 시간만 이용할 수 있습니다. 점검과 패치로 실제 플레이 시간이 줄어들 수도 있습니다.",
              "Steam의 Standard, Deluxe, Ultimate 패키지 페이지는 현재 출시일을 2026년 10월 5일로 표시합니다. 이는 5일 사전 플레이 일정과 맞지만 NC는 정확한 오픈 시각을 공개하지 않았고 이전 공식 홍보에는 9월 표기가 남아 있습니다.",
            ],
          },
          {
            id: "confirmed-contents",
            title: "세 에디션의 사전 플레이 기간은 동일",
            paragraphs: [
              "Standard에는 5-Day Advanced Access, Daeva's Campaign Supply Chest (Bound) ×1, 유일 등급 Title: Vanguard of Atreia ×1이 포함됩니다. 보급 상자에는 Return·Courage·Speed·Benediction·Absorption Scroll 각 10개, Life Potion 100개, Life Serum 50개, Healing Potion 30개, Power Shard 10,000개, Resurrection Spiritstone 5개가 들어 있습니다.",
              "Deluxe는 Standard 전체 구성에 흉갑·각반·투구·견갑·장갑·부츠·망토로 된 7부위 Ascended Daeva 외형과 Eternal Sun 무기 외형 상자 1개를 더합니다. Ultimate는 Styling Chest 1개, 견갑이 없는 Moonlit Aria 6부위 외형, Black Dragon 펫 1개, Blazing Sun Wings 1개를 추가하며 Styling Chest에는 Customization Voucher 1개와 7일 Appearance Change Voucher 1개가 들어 있습니다.",
              "공식 상품 표는 모든 구성품의 거래·삭제·창고 이용을 X로 표시합니다. 상위 에디션도 사전 플레이 일수는 늘어나지 않으며 칭호, 방어구·무기 스킨, 펫과 날개에는 추가 능력치가 없습니다.",
            ],
            table: {
              caption: "2026년 7월 22일 AION 2 글로벌 파운더스 팩 공식 USD 가격",
              headers: ["에디션", "공식 USD 가격", "공통 구성", "해당 단계 추가 구성"],
              rows: [
                { header: "Standard", cells: ["$24.99", "5일 사전 플레이, 보급 상자, 칭호", "공통 기본 구성"] },
                { header: "Deluxe", cells: ["$49.99", "Standard 전체", "Ascended Daeva 7부위 외형, Eternal Sun 무기 외형"] },
                { header: "Ultimate", cells: ["$99.99", "Deluxe 전체", "스타일링 이용권, Moonlit Aria 6부위, Black Dragon, Blazing Sun Wings"] },
              ],
            },
          },
          {
            id: "purchase-rules",
            title: "Steam과 PURPLE은 플랫폼이 고정되지만 서버는 공유",
            paragraphs: [
              "NC는 계정마다 세 에디션 중 하나를 선택하도록 안내합니다. 여러 팩을 구매해도 추가 보상은 없고 5일 혜택도 중첩되지 않습니다. Steam 구매분은 Steam으로만, PURPLE 구매분은 PURPLE로만 실행할 수 있지만 두 플랫폼의 플레이어는 같은 서버에서 만납니다.",
              "PURPLE 차액 업그레이드는 Standard→Deluxe $25, Standard→Ultimate $75, Deluxe→Ultimate $50입니다. Steam은 같은 방식을 발표하지 않았으므로 결제 전에 에디션을 정해야 합니다. 공식 글로벌 공지는 USD로 표시하며 실제 통화, 세금과 결제 금액은 로그인한 상점에서 확인하세요.",
            ],
          },
          {
            id: "server-boundaries",
            title: "Early Access Server와 Launch Server의 경계",
            paragraphs: [
              "사전 플레이가 시작되면 파운더스 팩 구매자용 Early Access Server가 먼저 열립니다. 정식 출시 때는 두 번째 Launch Server 물결이 추가되고, 미구매자는 새 서버를 선택하거나 수용 여유가 있는 Early Access Server에 들어갈 수 있습니다.",
              "사전 기간 던전 매칭은 같은 지역의 Early Access Server 전체에서 이루어지고 출시 후 두 서버군으로 확대됩니다. Server Market 시스템은 첫날 열리지만 현재 글로벌 비즈니스 모델 계획상 실제 이용에는 유효한 Membership이 필요합니다. Cross-Server Market은 사전 플레이와 정식 출시 시점 모두 열리지 않고 서버 진행도가 비슷해진 뒤 별도 안내로 개방됩니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "founders-pack-comparison",
    schemaType: "Article",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-25",
    readingMinutes: 12,
    publication: publishedVerifiedFounderGuide,
    sources: [
      globalFoundersPackSource,
      earlyAccessSource,
      globalBusinessModelSource,
      steamFoundersPackSource,
    ],
    properties: {
      reportService: "global",
      serviceScope: {
        "zh-hans": "AION 2 全球 PC 版",
        "zh-hant": "AION 2 全球 PC 版",
        en: "AION 2 Global PC",
        ko: "AION 2 글로벌 PC",
        de: "AION 2 Global PC",
        es: "AION 2 Global para PC",
        fr: "AION 2 Global sur PC",
        ja: "AION 2 グローバルPC版",
        "pt-br": "AION 2 Global para PC",
        ru: "Глобальная версия AION 2 для ПК",
      },
    },
    heroImage: officialPackHero("pack2_mb.webp", {
      "zh-hant": {
        alt: "AION 2 Deluxe Founder’s Pack 官方包裝圖",
        caption: "NC Corporation 的 Deluxe Founder’s Pack 官方圖片；本攻略比較 Standard、Deluxe 與 Ultimate。",
      },
      en: {
        alt: "Official AION 2 Deluxe Founder’s Pack artwork",
        caption: "Official Deluxe Founder’s Pack artwork from NC Corporation; this guide compares Standard, Deluxe, and Ultimate.",
      },
      ko: {
        alt: "AION 2 Deluxe 파운더스 팩 공식 이미지",
        caption: "NC Corporation의 Deluxe 파운더스 팩 공식 이미지이며, 이 가이드는 Standard·Deluxe·Ultimate를 비교합니다.",
      },
      ...officialFounderHeroTranslations,
      ...editorialFounderHeroTranslations,
    }),
    primaryAction: {
      id: "open-localized-founders-notice",
      href: globalFoundersPackSource.url,
      hrefs: officialFounderActionHrefs,
      sourceId: globalFoundersPackSource.id,
      translations: {
        "zh-hant": {
          eyebrow: "全球服官方來源",
          title: "開啟 Founder’s Pack 全球服官方公告",
          description: "直接核對三個版本、USD 價格、PURPLE 升級、5 日搶先遊玩與平台限制。",
          label: "查看英語 PLAYNC 公告",
          note: "繁體中文內容依英語全球公告翻譯；官方站目前沒有繁體中文商品公告。",
          facts: [
            { label: "版本", value: "Standard、Deluxe、Ultimate" },
            { label: "官方 USD", value: "$24.99／$49.99／$99.99" },
            { label: "搶先遊玩", value: "2026-09-30 起 5 日" },
          ],
        },
        en: {
          eyebrow: "OFFICIAL GLOBAL SOURCE",
          title: "Open NC’s global Founder’s Pack notice",
          description: "Verify all three tiers, USD prices, PURPLE upgrades, five-day Early Access, and platform restrictions.",
          label: "Read the English PLAYNC notice",
          note: "This is the English edition of the official global announcement.",
          facts: [
            { label: "Tiers", value: "Standard, Deluxe, Ultimate" },
            { label: "Official USD", value: "$24.99 / $49.99 / $99.99" },
            { label: "Early Access", value: "Five days from September 30, 2026" },
          ],
        },
        ko: {
          eyebrow: "글로벌 공식 출처",
          title: "파운더스 팩 글로벌 공식 공지 열기",
          description: "세 에디션, USD 가격, PURPLE 업그레이드, 5일 사전 플레이와 플랫폼 제한을 직접 확인하세요.",
          label: "영문 PLAYNC 공지 보기",
          note: "한국어 상품 공지가 없어 영문 글로벌 공지를 기준으로 번역했습니다.",
          facts: [
            { label: "에디션", value: "Standard, Deluxe, Ultimate" },
            { label: "공식 USD", value: "$24.99 / $49.99 / $99.99" },
            { label: "사전 플레이", value: "2026-09-30부터 5일" },
          ],
        },
        ...officialFounderActionTranslations,
        ...editorialFounderActionTranslations,
      },
    },
    related: [
      { kind: "content", section: "news", slug: "founders-packs-announced-july-2026" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "early-access" },
      { kind: "content", section: "guides", slug: "steam-vs-purple" },
      { kind: "content", section: "guides", slug: "global-monetization-watchlist" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 12, guideLabels, {
        eyebrow: "全球版購買指南",
        title: "AION 2 Founder’s Pack：價格、獎勵與版本比較",
        description:
          "比較 AION 2 Standard、Deluxe 與 Ultimate Founder’s Pack 的美元基準價格、獎勵、5 日 Early Access、PURPLE 升級、平台與退款條件。",
        intro:
          "先說結論：AION 2 Founder’s Pack 有 Standard（官方美元基準 $24.99）、Deluxe（$49.99）與 Ultimate（$99.99）三款，全部包含 2026 年 9 月 30 日開始的相同 5 日 Early Access。只想提早進入的普通玩家，Standard 已提供完整搶先資格；Deluxe 和 Ultimate 的價差主要購買已列出的外觀與收藏內容。地區售價、稅費與幣別以登入後商店為準，精確開服小時仍未公布。",
        sourceNote:
          "依 NC 7 月 22 日全球服英語公告及其德語／西語／法語／巴葡／日語官方本地化版本、7 月 17 日 Early Access 說明與 Steam 套裝頁核對。繁體中文以英語全球公告為事實基準；USD 是全球公告基準，日本語頁另顯示 JPY。選購建議是 KINA 的用途分析，不是 NC 官方排名。",
        keywords: [
          "AION 2 Founder's Pack 比較",
          "AION2 Standard Deluxe Ultimate",
          "AION2 創始者禮包怎麼選",
          "AION2 9月30日搶先遊玩",
        ],
        sections: [
          {
            id: "quick-answer",
            title: "先確認時間：9 月 30 日開始 5 日搶先遊玩",
            paragraphs: [
              "NC 明確寫出 Advanced Access 於 2026 年 9 月 30 日開始並持續 5 天。所有玩家的開始與結束日期相同；在活動開始後才購買，只能使用剩餘時段，購買多份也不能延長。官方同時提醒，這 5 天內可能安排維護與更新，因此實際可玩時間可能少於完整 120 小時。",
              "Steam 的 Standard、Deluxe 與 Ultimate 套裝頁目前都列出 2026 年 10 月 5 日為 Release Date，與上述 5 日安排相符。不過 NC 尚未公布開服小時，較早的 NC 宣傳與 Steam 主遊戲頁也仍有「2026 年 9 月」文字，所以應把 9 月 30 日與 10 月 5 日視為日期里程碑，不要自行加入 00:00、PDT 或 UTC。",
            ],
          },
          {
            id: "platform-choice",
            title: "先選平台：Steam 與 PURPLE 權益不能跨用",
            paragraphs: [
              "在 Steam 購買的 Founder’s Pack 只能透過 Steam 遊玩，在 PURPLE 購買的版本也只能透過 PURPLE 遊玩，包含 5 日搶先權。這不代表玩家被分開：NC 說明兩個平台共用相同伺服器，所以 Steam 與 PURPLE 玩家仍能在遊戲內相遇。真正不能跨用的是購買權益與啟動平台。",
              "NC 公告要求每個帳號在各購買平台從 Standard、Deluxe、Ultimate 中選一款；跨平台重複購買不會增加獎勵，也不會疊加搶先天數。PURPLE 提供補差升級：Standard→Deluxe $25、Standard→Ultimate $75、Deluxe→Ultimate $50；Steam 目前沒有公布相同的升級方式。全球公告以 USD 標價，結帳幣別、稅費與匯率依帳號地區而異。",
            ],
          },
          {
            id: "edition-differences",
            title: "三個版本的完整差異",
            paragraphs: [
              "Standard 是共同基礎：5-Day Advanced Access、Daeva's Campaign Supply Chest (Bound) ×1，以及唯一級 Title: Vanguard of Atreia ×1。補給箱包括 Return、Courage、Speed、Benediction、Absorption Scroll 各 10、Life Potion 100、Life Serum 50、Healing Potion 30、Power Shard 10,000 與 Resurrection Spiritstone 5。",
              "Deluxe 保留 Standard 全部內容，再加入 Ascended Daeva (Skin: Set) (Bound) 與 Weapon Skin Chest: Eternal Sun (Bound) ×1。Ascended Daeva 的七件外觀是胸甲、腿甲、頭盔、護肩、手套、靴子和斗篷各 1；Eternal Sun 是帶特殊視覺效果的武器外觀箱。",
              "Ultimate 保留 Deluxe 全部內容，再加入 Daeva's Styling Chest (Bound) ×1、Moonlit Aria (Skin: Set) (Bound)、Pet: Black Dragon ×1 與 Blazing Sun Wings (Bound) ×1。Moonlit Aria 是胸甲、腿甲、頭盔、手套、靴子和斗篷六件套，不包含護肩；造型箱內有 Customization Voucher ×1 與 7 日 Appearance Change Voucher ×1。",
              "官方表格把全部列示物品的交易、刪除與倉庫欄標為 X。NC 同時明確說明稱號、兩套護甲外觀、武器外觀、寵物及翅膀不提供額外能力值；Standard 補給箱則是初期消耗品便利。",
            ],
            table: {
              caption: "AION 2 Founder’s Pack 官方價格基準與完整版本差異",
              headers: ["版本", "官方 USD 價格", "Early Access", "主要額外內容"],
              rows: [
                { header: "Standard", cells: ["$24.99", "5 日", "補給箱 10 類物品、Vanguard of Atreia 稱號"] },
                { header: "Deluxe", cells: ["$49.99", "5 日", "Standard 全部、Ascended Daeva 七件、Eternal Sun 武器外觀"] },
                { header: "Ultimate", cells: ["$99.99", "5 日", "Deluxe 全部、兩張造型券、Moonlit Aria 六件、Black Dragon、Blazing Sun Wings"] },
              ],
            },
          },
          {
            id: "choose-by-use-case",
            title: "按用途選擇，不把版本當成戰力排名",
            paragraphs: [
              "三款都提供同一段搶先時間，因此升級只應取決於你是否確定需要官方列出的外觀與收藏物品。Founder’s Pack 銷售至搶先遊玩結束，付款前仍應重新核對所在地區商店、退款規則與商品狀態。",
            ],
            steps: [
              { title: "選 Standard", description: "你的重點是 9 月 30 日提早進服、初期補給箱與稱號，不需要額外外觀收藏。" },
              { title: "考慮 Deluxe", description: "你明確想要 Ascended Daeva 七件外觀與 Eternal Sun 武器外觀，而且已確定購買平台。" },
              { title: "考慮 Ultimate", description: "你確定會使用 Moonlit Aria、Black Dragon、Blazing Sun Wings 與角色外觀變更內容，而不是期待額外戰力。" },
              { title: "等待正式發布", description: "你不在意提早 5 天進服或尚未決定平台；全球版基礎遊戲正式發布後可免費遊玩，不需要 Founder’s Pack。" },
            ],
          },
          {
            id: "server-plan",
            title: "Early Access Server 與 Launch Server 怎麼選？",
            paragraphs: [
              "9 月 30 日會先開第一批 Early Access Servers，最初只有 Founder’s Pack 玩家可進入。正式發布時 NC 會開第二批 Launch Servers；沒有購買搶先權的玩家可選新伺服器，也能在容量允許時加入仍開放的 Early Access Server。若你重視固定公會、天族或魔族陣營與深淵 PvP，應先與朋友統一地區、伺服器批次及陣營。",
              "搶先期間的副本組隊會在同一地理區域的所有 Early Access Servers 之間匹配，不侷限單一世界；正式發布後配對池會擴展到同區的 Early Access 與 Launch Servers。天族與魔族世界彼此分開，搶先期間的深淵配對只在 Early Access Servers 之間進行，發布後再按各服進度與強度安排。",
            ],
          },
          {
            id: "market-and-transfer",
            title: "市場與轉服有哪些邊界？",
            paragraphs: [
              "Server Market 是單一世界的本地交易市場，系統從搶先遊玩首日開放並會在發布後保留；依目前全球版商業模式方案，玩家實際使用 Market 需要有效會員。Cross-Server Market 連接同一地區的多個世界，但不會在搶先首日或正式發布當天開放；NC 會等參與伺服器到達相近進度後再公布時間。",
              "NC 已承諾提供 Server Transfer Service，但尚未公布日期、費用與限制，團隊會在搶先及發布後先評估伺服器人數。即使朋友起步於不同世界，官方表示仍可加好友及跨服組副本；但不要把這解讀為深淵、市場或所有內容都能自由跨服。",
            ],
          },
          {
            id: "pre-purchase-checks",
            title: "付款前最後檢查",
            paragraphs: [
              "在登入後的 Steam 或 PURPLE 商品頁確認地區供應、幣別、版本與退款規則，再核對朋友的平台、區域、伺服器批次及陣營。若選 Steam，也要接受目前沒有官方升級方案的限制。",
              "官方銷售期從 2026 年 7 月 22 日 06:00 PDT 開始並持續至 Early Access 結束，但沒有公布精確停售小時。上線前可依平台流程申請退款；上線後，公告列出的基本資格是購買後 14 日內、遊玩少於 2 小時且尚未領取套裝物品，最終仍以 Steam 或 PURPLE 的實際政策與審核為準。",
            ],
            bullets: [
              "9 月 30 日是日期，不是已公布的確切開服小時。預先下載時間也仍待官方公告。",
              "購買平台會鎖定啟動方式；同服不代表 Steam 與 PURPLE 權益可以互轉。",
              "一個版本已包含完整 5 日，重複購買或購買較高版本都不會延長。",
              "跨服市場與轉服服務不會因購買 Founder’s Pack 而提前開放。",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Founder’s Pack 常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 Founder’s Pack 多少錢？", answer: "官方美元基準是 Standard $24.99、Deluxe $49.99、Ultimate $99.99。地區幣別、稅費與結帳價會不同，請以登入後的 Steam 或 PURPLE 商店為準。" },
              { question: "哪一款 AION 2 Founder’s Pack 最值得買？", answer: "若唯一目標是 5 日 Early Access，Standard 已提供完整資格。Deluxe 與 Ultimate 只適合確定會使用其外觀與收藏內容的玩家。" },
              { question: "所有版本都包含 Early Access 嗎？", answer: "是。Standard、Deluxe 與 Ultimate 都包含從 2026 年 9 月 30 日開始的相同 5 日，不會因版本更高而延長。" },
              { question: "可以之後升級 Founder’s Pack 嗎？", answer: "PURPLE 已列 Standard→Deluxe／Ultimate 與 Deluxe→Ultimate 升級商品；Steam 尚未公布同等升級路徑。" },
              { question: "Founder’s Pack 獎勵是帳號共用嗎？", answer: "官方表格列出不可交易、刪除或存倉等限制，但沒有完整確認所有獎勵最終是帳號共用或角色綁定；領取前請查看最新商品條款。" },
              { question: "AION 2 Founder’s Pack 是 pay-to-win 嗎？", answer: "稱號、外觀、寵物與翅膀已明確不提供額外屬性；Standard 補給箱包含早期消耗品便利。這些事實不足以替所有玩家下單一標籤，也不代表高階版本增加戰力。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 12, guideLabels, {
        eyebrow: "GLOBAL PURCHASE GUIDE",
        title: "AION 2 Founder’s Pack: Prices, Rewards and Edition Comparison",
        description:
          "Compare AION 2 Founder’s Pack USD reference prices, rewards, five-day Early Access, PURPLE upgrades, platform locks, refund conditions, and edition value.",
        intro:
          "Answer first: AION 2 offers Standard (official USD reference $24.99), Deluxe ($49.99), and Ultimate ($99.99) Founder’s Packs. All three grant the same five-day Early Access period beginning September 30, 2026. Standard is the practical choice for a typical player who only wants the head start; Deluxe and Ultimate charge for the listed cosmetic and collection additions, not extra access days. Regional currency, tax, and checkout price vary, and NC has not announced the exact opening hour.",
        sourceNote:
          "Verified July 25, 2026 against NC’s July 22 global English notice and its official German, Spanish, French, Brazilian Portuguese, and Japanese localizations, plus the July 17 Early Access update and Steam package pages. This English page uses the global USD notice; each official localization keeps its own terminology, sale window, and displayed currency. KINA’s recommendations are use-case guidance, not an NC ranking.",
        keywords: [
          "AION 2 Founder's Pack comparison",
          "Standard vs Deluxe vs Ultimate",
          "which AION 2 Founder's Pack",
          "AION 2 September 30 early access",
        ],
        sections: [
          {
            id: "quick-answer",
            title: "Confirm the dates first",
            paragraphs: [
              "NC says advance access begins September 30 and runs for five days. Everyone receives the same start and end dates; buying after the window begins grants only its remaining time, and duplicate purchases cannot extend it. Maintenance or patches may make actual playtime shorter than 120 hours.",
              "Steam’s three package pages currently list October 5, 2026 as the release date. NC has not published an opening hour, and older official promotions still say September, so do not invent a midnight, PDT, or UTC launch time.",
            ],
          },
          {
            id: "platform-choice",
            title: "Choose Steam or PURPLE before choosing a tier",
            paragraphs: [
              "A pack bought on Steam can be used only through Steam, and a PURPLE purchase can be used only through PURPLE, including advance access. The platforms still connect to the same servers, so Steam and PURPLE players can play together; the restriction applies to the purchase entitlement and launcher.",
              "NC tells each account to choose one tier on each purchase platform; duplicate cross-platform purchases provide no extra rewards and the five days do not stack. PURPLE offers Standard→Deluxe for $25, Standard→Ultimate for $75, and Deluxe→Ultimate for $50. Steam has no announced equivalent route. The global notice labels these prices in USD; conversion, tax, and the final charge depend on the signed-in storefront.",
            ],
          },
          {
            id: "edition-differences",
            title: "What every edition contains",
            paragraphs: [
              "Standard includes 5-Day Advanced Access, Daeva’s Campaign Supply Chest (Bound) ×1, and the Unique-grade Title: Vanguard of Atreia ×1. The chest contains Return, Courage, Speed, Benediction, and Absorption Scrolls ×10 each, Life Potions ×100, Life Serums ×50, Healing Potions ×30, Power Shards ×10,000, and Resurrection Spiritstones ×5.",
              "Deluxe keeps Standard and adds Ascended Daeva (Skin: Set) (Bound) plus Weapon Skin Chest: Eternal Sun (Bound) ×1. The seven Ascended Daeva pieces are breastplate, greaves, helm, pauldrons, gloves, boots, and cloak; Eternal Sun is a weapon appearance with a special visual effect.",
              "Ultimate keeps Deluxe and adds Daeva’s Styling Chest (Bound) ×1, Moonlit Aria (Skin: Set) (Bound), Pet: Black Dragon ×1, and Blazing Sun Wings (Bound) ×1. Moonlit Aria has six pieces—breastplate, greaves, helm, gloves, boots, and cloak, with no pauldrons. The Styling Chest contains Customization Voucher ×1 and a seven-day Appearance Change Voucher ×1.",
              "The official table marks trade, deletion, and storage as unavailable for every listed reward. NC says the title, armor and weapon skins, pet, and wings add no stats; Standard’s supply chest is the early consumable convenience.",
            ],
            table: {
              caption: "Official AION 2 Founder’s Pack price references and full tier differences",
              headers: ["Edition", "Official USD price", "Early Access", "Main additions"],
              rows: [
                { header: "Standard", cells: ["$24.99", "Five days", "Ten supply categories and Vanguard of Atreia title"] },
                { header: "Deluxe", cells: ["$49.99", "Five days", "All Standard contents, seven Ascended Daeva pieces, Eternal Sun weapon skin"] },
                { header: "Ultimate", cells: ["$99.99", "Five days", "All Deluxe contents, two styling vouchers, six Moonlit Aria pieces, Black Dragon, Blazing Sun Wings"] },
              ],
            },
          },
          {
            id: "choose-by-use-case",
            title: "Choose by use case, not assumed power",
            paragraphs: [
              "All tiers grant the same head start, so upgrade only for the disclosed collection items. Prices and currencies vary by region and should be checked on the signed-in storefront.",
            ],
            steps: [
              { title: "Choose Standard", description: "You want the September 30 head start, supply chest, and title without extra appearance collections." },
              { title: "Consider Deluxe", description: "You specifically want the seven-piece Ascended Daeva set and Eternal Sun weapon appearance and have chosen your platform." },
              { title: "Consider Ultimate", description: "You will use Moonlit Aria, Black Dragon, Blazing Sun Wings, and the character-styling items—not an assumed power benefit." },
              { title: "Wait for full release", description: "The head start does not matter or your platform is undecided. The base game is free to play at full release and requires no Founder’s Pack." },
            ],
          },
          {
            id: "server-plan",
            title: "Plan for Early Access and Launch Servers",
            paragraphs: [
              "NC will first open Early Access Servers to Founder’s Pack holders. A second wave of Launch Servers opens at full release. Non-buyers can choose those new worlds and may enter an Early Access Server if it remains open and available. Friends who care about guilds, factions, or Abyss PvP should coordinate region, server wave, and faction before launch.",
              "During the head start, dungeon matching spans all Early Access Servers in the same geographical region. At full release it expands to both server waves. Elyos and Asmodian worlds remain separate; Early Access Abyss matching occurs only between Early Access Servers, then NC pairs worlds by progress and strength after launch.",
            ],
          },
          {
            id: "market-and-transfer",
            title: "Understand market and transfer limits",
            paragraphs: [
              "The local Server Market system opens on the first day of Early Access and remains after launch; under the current global business-model plan, actually using it requires active Membership. The Cross-Server Market will not open during Early Access or at full release and comes later when participating worlds have reached a similar stage.",
              "NC has committed to a Server Transfer Service but has not announced its date, price, or restrictions. Players on different worlds can still add each other and form cross-world dungeon parties, but that does not make Abyss, markets, or every activity fully cross-server.",
            ],
          },
          {
            id: "pre-purchase-checks",
            title: "Final checks before paying",
            paragraphs: [
              "Verify regional availability, currency, tier, and refund terms on the signed-in Steam or PURPLE page. Confirm your friends’ region, server wave, and faction, and remember that Steam currently has no announced tier-upgrade route.",
              "The official sale began July 22, 2026 at 06:00 PDT and continues until Early Access ends, but an exact stop hour is not published. Refunds can be requested before launch; after launch, the notice lists a baseline of within 14 days, under two hours played, and no pack item claimed. Steam or PURPLE policy and review still control the outcome.",
            ],
            bullets: [
              "September 30 is a confirmed date, not a confirmed opening hour; preload timing is still unannounced.",
              "The launcher is platform-locked even though both platforms use the same servers.",
              "One tier already grants all five days; duplicates and higher tiers do not extend them.",
              "A Founder’s Pack does not open the Cross-Server Market or Server Transfer early.",
            ],
          },
          {
            id: "faq",
            title: "AION 2 Founder’s Pack FAQ",
            paragraphs: [],
            faq: [
              { question: "How much is the AION 2 Founder’s Pack?", answer: "Official USD references are $24.99 for Standard, $49.99 for Deluxe, and $99.99 for Ultimate. Regional currency, tax, and checkout prices vary; verify the signed-in Steam or PURPLE store." },
              { question: "Which AION 2 Founder’s Pack is worth it?", answer: "Standard is enough when five-day Early Access is the only goal. Deluxe and Ultimate make sense only when you value their listed cosmetic and collection items." },
              { question: "Does every edition include Early Access?", answer: "Yes. Standard, Deluxe, and Ultimate all grant the same five-day period beginning September 30, 2026. A higher tier does not add days." },
              { question: "Can I upgrade from Standard to Deluxe or Ultimate?", answer: "PURPLE lists Standard-to-Deluxe, Standard-to-Ultimate, and Deluxe-to-Ultimate upgrades. Steam has not announced an equivalent upgrade route." },
              { question: "Are Founder’s Pack rewards account-wide?", answer: "The official table gives trade, deletion, and storage restrictions but does not fully confirm that every delivered reward is account-wide rather than character-bound. Check the latest claim terms." },
              { question: "Is the AION 2 Founder’s Pack pay-to-win?", answer: "NC says the title, skins, pet, and wings add no stats. Standard’s supply chest provides early consumable convenience. Those facts do not make higher editions a combat-power upgrade or settle every player’s definition." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 12, guideLabels, {
        eyebrow: "글로벌 구매 가이드",
        title: "아이온2 파운더스 팩 가격·보상·에디션 비교",
        description:
          "아이온2 Standard·Deluxe·Ultimate 파운더스 팩의 공식 USD 기준 가격, 보상, 5일 얼리 액세스, PURPLE 업그레이드, 플랫폼과 환불 조건을 비교합니다.",
        intro:
          "먼저 답하면 아이온2 파운더스 팩은 Standard(공식 USD 기준 $24.99), Deluxe($49.99), Ultimate($99.99) 세 가지이며 모두 2026년 9월 30일부터 같은 5일 얼리 액세스를 제공합니다. 먼저 시작하는 것이 목적이면 일반 이용자는 Standard로 충분합니다. Deluxe와 Ultimate의 차액은 공개된 외형·수집품을 위한 것이며 기간을 늘리지 않습니다. 지역 통화, 세금과 실제 결제 가격은 로그인한 상점에서 확인해야 하고 정확한 서버 오픈 시각은 미공개입니다.",
        sourceNote:
          "2026년 7월 25일 NC 글로벌 영문 공지와 독일어·스페인어·프랑스어·브라질 포르투갈어·일본어 공식 현지화 공지, 7월 17일 Early Access 안내 및 Steam 페이지를 확인했습니다. 한국어 페이지는 영문 글로벌 공지의 USD 정보를 기준으로 번역하며 일본어 페이지의 JPY를 한국 결제 가격으로 사용하지 않습니다.",
        keywords: [
          "아이온2 파운더스 팩 비교",
          "AION2 Standard Deluxe Ultimate",
          "아이온2 파운더스 팩 추천",
          "아이온2 9월 30일 사전 플레이",
        ],
        sections: [
          {
            id: "quick-answer",
            title: "먼저 날짜를 확인하세요",
            paragraphs: [
              "NC는 사전 플레이가 2026년 9월 30일 시작해 5일간 진행된다고 밝혔습니다. 모든 구매자의 시작일과 종료일은 같고, 기간 중 구매하면 남은 시간만 이용할 수 있습니다. 여러 팩을 사도 기간은 늘어나지 않으며 점검과 패치로 실제 플레이 시간이 줄 수 있습니다.",
              "Steam의 세 패키지 페이지는 현재 2026년 10월 5일을 출시일로 표시합니다. NC는 정확한 오픈 시각을 발표하지 않았고 이전 공식 홍보에는 9월 표기가 남아 있으므로 임의의 자정이나 시간대를 확정 일정으로 쓰면 안 됩니다.",
            ],
          },
          {
            id: "platform-choice",
            title: "에디션보다 먼저 Steam과 PURPLE을 선택",
            paragraphs: [
              "Steam에서 산 팩은 Steam으로만, PURPLE에서 산 팩은 PURPLE로만 이용할 수 있으며 사전 플레이 권한도 같은 제한을 받습니다. 두 플랫폼은 같은 서버에 연결되므로 함께 플레이할 수 있지만, 구매 권한과 실행 플랫폼은 서로 옮길 수 없습니다.",
              "NC는 계정마다 각 구매 플랫폼에서 Standard·Deluxe·Ultimate 중 하나를 선택하도록 안내하며 플랫폼을 달리해 중복 구매해도 추가 보상과 기간이 없습니다. PURPLE 업그레이드는 Standard→Deluxe $25, Standard→Ultimate $75, Deluxe→Ultimate $50입니다. Steam은 같은 경로를 발표하지 않았으며 실제 통화, 세금과 결제 금액은 로그인한 상점에서 확인해야 합니다.",
            ],
          },
          {
            id: "edition-differences",
            title: "세 에디션의 구성 차이",
            paragraphs: [
              "Standard에는 5-Day Advanced Access, Daeva’s Campaign Supply Chest (Bound) ×1, 유일 등급 Title: Vanguard of Atreia ×1이 포함됩니다. 보급 상자에는 Return·Courage·Speed·Benediction·Absorption Scroll 각 10개, Life Potion 100개, Life Serum 50개, Healing Potion 30개, Power Shard 10,000개와 Resurrection Spiritstone 5개가 들어 있습니다.",
              "Deluxe는 Standard 전체 구성에 Ascended Daeva (Skin: Set) (Bound)와 특수 시각 효과가 있는 Weapon Skin Chest: Eternal Sun (Bound) ×1을 추가합니다. Ascended Daeva는 흉갑·각반·투구·견갑·장갑·부츠·망토의 7부위입니다.",
              "Ultimate는 Deluxe 전체 구성에 Daeva’s Styling Chest (Bound) ×1, Moonlit Aria (Skin: Set) (Bound), Pet: Black Dragon ×1, Blazing Sun Wings (Bound) ×1을 더합니다. Moonlit Aria는 견갑이 없는 흉갑·각반·투구·장갑·부츠·망토 6부위이며 Styling Chest에는 Customization Voucher 1개와 7일 Appearance Change Voucher 1개가 포함됩니다.",
              "공식 표는 모든 구성품의 거래·삭제·창고 이용을 X로 표시합니다. NC는 칭호, 방어구·무기 외형, 펫과 날개에 추가 능력치가 없다고 명시했으며 Standard 보급 상자는 초반 소모품 편의입니다.",
            ],
            table: {
              caption: "아이온2 파운더스 팩 공식 가격 기준과 전체 에디션 차이",
              headers: ["에디션", "공식 USD 가격", "얼리 액세스", "주요 추가 구성"],
              rows: [
                { header: "Standard", cells: ["$24.99", "5일", "보급품 10종, Vanguard of Atreia 칭호"] },
                { header: "Deluxe", cells: ["$49.99", "5일", "Standard 전체, Ascended Daeva 7부위, Eternal Sun 무기 외형"] },
                { header: "Ultimate", cells: ["$99.99", "5일", "Deluxe 전체, 스타일링 이용권 2종, Moonlit Aria 6부위, Black Dragon, Blazing Sun Wings"] },
              ],
            },
          },
          {
            id: "choose-by-use-case",
            title: "전투력 추측이 아닌 용도로 선택",
            paragraphs: [
              "세 에디션의 사전 플레이 기간은 같으므로 공개된 수집품이 실제로 필요한지로 판단하세요. 가격과 통화는 지역별 상점에서 확인해야 합니다.",
            ],
            steps: [
              { title: "Standard 선택", description: "9월 30일 사전 플레이, 보급 상자와 칭호가 목적이며 추가 외형은 필요하지 않습니다." },
              { title: "Deluxe 고려", description: "Ascended Daeva 7부위 외형과 Eternal Sun 무기 외형을 원하고 플랫폼을 이미 정했습니다." },
              { title: "Ultimate 고려", description: "Moonlit Aria, Black Dragon, Blazing Sun Wings와 캐릭터 외형 변경 아이템을 실제로 사용할 계획입니다." },
              { title: "정식 출시까지 대기", description: "5일 먼저 시작할 필요가 없거나 플랫폼을 정하지 못했습니다. 정식 출시 후 기본 게임은 무료로 플레이할 수 있습니다." },
            ],
          },
          {
            id: "server-plan",
            title: "Early Access Server와 Launch Server 계획",
            paragraphs: [
              "NC는 파운더스 팩 구매자용 Early Access Server를 먼저 엽니다. 정식 출시 때 두 번째 Launch Server 물결이 추가되며 미구매자는 새 서버를 선택하거나 수용 여유가 있는 Early Access Server에 들어갈 수 있습니다. 길드·진영·어비스 PvP가 중요하다면 친구들과 지역, 서버군, 진영을 미리 맞추세요.",
              "사전 기간 던전 매칭은 같은 지역의 모든 Early Access Server에서 이루어지고 출시 후 두 서버군으로 확대됩니다. 천족과 마족 세계는 분리되며, 사전 기간 어비스 매칭은 Early Access Server끼리만 진행됩니다.",
            ],
          },
          {
            id: "market-and-transfer",
            title: "시장과 서버 이전의 제한",
            paragraphs: [
              "로컬 Server Market 시스템은 사전 플레이 첫날 열리고 출시 후에도 유지됩니다. 현재 글로벌 비즈니스 모델 계획상 실제 Market 이용에는 유효한 Membership이 필요합니다. Cross-Server Market은 사전 플레이와 정식 출시 시점 모두 열리지 않으며 참여 서버의 진행도가 비슷해진 뒤 별도 안내로 개방됩니다.",
              "NC는 Server Transfer Service 제공을 약속했지만 날짜, 가격과 제한은 공개하지 않았습니다. 다른 월드의 친구와 친구 추가 및 던전 파티는 가능하지만 어비스, 시장과 모든 콘텐츠가 자유롭게 통합된다는 뜻은 아닙니다.",
            ],
          },
          {
            id: "pre-purchase-checks",
            title: "결제 전 마지막 확인",
            paragraphs: [
              "로그인한 Steam 또는 PURPLE 페이지에서 지역 판매 여부, 통화, 에디션과 환불 조건을 확인하세요. 친구들의 지역, 서버군과 진영도 맞추고 Steam에는 현재 공식 업그레이드 경로가 없다는 점을 기억해야 합니다.",
              "공식 판매는 2026년 7월 22일 06:00 PDT에 시작해 얼리 액세스 종료까지 이어지지만 정확한 판매 종료 시각은 공개되지 않았습니다. 출시 전에는 환불을 요청할 수 있고, 출시 후 공지의 기본 조건은 구매 후 14일 이내, 플레이 2시간 미만, 팩 아이템 미수령입니다. 최종 결과는 Steam 또는 PURPLE 정책과 심사를 따릅니다.",
            ],
            bullets: [
              "9월 30일은 확정 날짜이지 정확한 오픈 시각이 아니며 사전 다운로드 일정도 미공개입니다.",
              "두 플랫폼이 같은 서버를 써도 구매 권한과 실행 방식은 플랫폼에 고정됩니다.",
              "한 에디션으로 5일 전체를 받으며 중복 구매나 상위 에디션이 기간을 늘리지 않습니다.",
              "파운더스 팩을 사도 Cross-Server Market이나 Server Transfer가 먼저 열리지 않습니다.",
            ],
          },
          {
            id: "faq",
            title: "아이온2 파운더스 팩 FAQ",
            paragraphs: [],
            faq: [
              { question: "아이온2 파운더스 팩 가격은 얼마인가요?", answer: "공식 USD 기준은 Standard $24.99, Deluxe $49.99, Ultimate $99.99입니다. 지역 통화, 세금과 결제 가격은 로그인한 Steam 또는 PURPLE 상점에서 확인하세요." },
              { question: "어떤 아이온2 파운더스 팩이 가장 적합한가요?", answer: "5일 얼리 액세스만 원하면 Standard로 충분합니다. Deluxe와 Ultimate는 공개된 외형과 수집품을 실제로 원하는 경우에 맞습니다." },
              { question: "모든 에디션이 얼리 액세스를 제공하나요?", answer: "Standard·Deluxe·Ultimate 모두 2026년 9월 30일부터 같은 5일을 제공하며 상위 에디션이 기간을 늘리지 않습니다." },
              { question: "Standard에서 Deluxe 또는 Ultimate로 업그레이드할 수 있나요?", answer: "PURPLE은 Standard→Deluxe／Ultimate 및 Deluxe→Ultimate 상품을 공개했지만 Steam은 같은 업그레이드 경로를 발표하지 않았습니다." },
              { question: "파운더스 팩 보상은 계정 공유인가요?", answer: "공식 표에는 거래·삭제·창고 제한이 있지만 모든 보상이 계정 공유인지 캐릭터 귀속인지 완전히 확인되지 않았습니다. 수령 전 최신 약관을 확인하세요." },
              { question: "아이온2 파운더스 팩은 pay-to-win인가요?", answer: "NC는 칭호, 외형, 펫과 날개에 추가 능력치가 없다고 밝혔고 Standard 보급 상자는 초반 소모품 편의를 제공합니다. 상위 에디션이 전투력을 추가한다는 근거는 아닙니다." },
            ],
          },
        ],
      }),
      ...officialFounderGuideTranslations,
      ...editorialFounderGuideTranslations,
    },
  },
] as const satisfies readonly ContentEntry[];
