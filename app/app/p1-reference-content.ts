import type {
  ContentEntry,
  ContentHeroImage,
  ContentSectionBlock,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { ContentLocale } from "./site-config";

type SeoContentSectionBlock = ContentSectionBlock & {
  table?: {
    caption: string;
    headers: readonly string[];
    rows: readonly { header?: string; cells: readonly string[] }[];
  };
  faq?: readonly { question: string; answer: string }[];
};

type LocalizedArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote"
> & {
  keywords?: readonly string[];
  sections: readonly SeoContentSectionBlock[];
};

const labels = {
  "zh-hant": {
    byline: "AION2 KINA 編輯團隊",
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
    byline: "AION2 KINA 편집팀",
    backLabel: "가이드로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "KINA 게시일",
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

const globalPcPlatformSource = officialSource(
  "aion2-global-pc-platform-2026-04-22",
  "AION2 global PC platform announcement",
  "https://about.ncsoft.com/news/article/aion2_update_260422",
  "2026-04-22",
);

const globalSteamRequirementsSource = {
  id: "aion2-global-steam-system-requirements-2026-07-17",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 global Steam store page and PC system requirements",
  url: "https://store.steampowered.com/app/3393110/AION_2/",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const daevaExpressAnnouncementSource = officialSource(
  "aion2-daeva-express-2026-06-15",
  "AION2 SUMMER FESTA and Daeva Express announcement",
  "https://about.ncsoft.com/news/article/aion2_update_260615",
  "2026-06-15",
);

const chapterOneOfficialPageSource = officialSource(
  "aion2-chapter-one-official-page",
  "AION2 Chapter 1 official content page",
  "https://aion2.plaync.com/ko-kr/conts/260614_update",
);

const godstoneProbabilitySource = officialSource(
  "aion2-godstone-synthesis-probability",
  "AION2 official Godstone synthesis probability disclosure",
  "https://probability.plaync.com/aion2/view?probCategoryId=68f1fe3357c8986afe440615",
);

const officialGodstoneItemSource = officialSource(
  "aion2-item-godstone-imprint-field",
  "AION2 official item database sample with a Godstone Imprint field",
  "https://aion2.plaync.com/ko-kr/info/item?detail=item_110130039_0_0&grade=Unique&page=",
);

const boundKinaSource = officialSource(
  "aion2-kina-bound-2026-03-25",
  "AION2 Chaotic Abyss update introducing Kina (Bound)",
  "https://about.ncsoft.com/en/news/article/aion2_update_260325",
  "2026-03-25",
);

export const p1ReferenceContentEntries = [
  {
    section: "guides",
    slug: "system-requirements",
    schemaType: "TechArticle",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-24",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [
      globalPcPlatformSource,
      globalSteamRequirementsSource,
    ],
    heroImage: officialHero(
      "https://fizz-download.playnccdn.com/download/v2/buckets/conti-upload/files/19eba80a4da-643345c3-e89a-45dc-9b71-feca825684bf",
      1200,
      630,
      globalPcPlatformSource.url,
      {
        "zh-hant": {
          alt: "AION 2 全球 Steam PC 系統需求官方商店圖片",
          caption: "本頁只整理全球 Steam Windows PC 版目前公布的最低與建議配備。",
        },
        en: {
          alt: "Official AION 2 Global Steam PC system requirements store image",
          caption: "This page covers only the currently published requirements for the global Steam Windows PC build.",
        },
        ko: {
          alt: "아이온2 글로벌 Steam PC 시스템 요구 사항 공식 상점 이미지",
          caption: "글로벌 Steam Windows PC 버전에 공개된 최소·권장 사양만 정리합니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "news", slug: "global-server-regions" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "steam-vs-purple" },
      { kind: "content", section: "guides", slug: "scam-check" },
      { kind: "content", section: "guides", slug: "beginner-launch-checklist" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 7, {
        eyebrow: "全球 Steam PC 系統需求",
        title: "AION 2 全球版系統需求：Steam PC 最低與建議配備",
        description: "AION 2 全球 Steam PC 版最低需要 Windows 10／11 64 位元、8 GB RAM、GTX 1050 Ti 與 100 GB 可用空間；查看完整建議配備與下載大小說明。",
        intro: "答案先說：AION 2 全球版目前只公布 Windows PC 的 Steam 配備表。最低目標是 FHD Very Low，建議目標是 FHD Low；兩者都要求 100 GB 可用儲存空間並建議 SSD。100 GB 是安裝前應保留的 available storage，不是已確認的壓縮下載大小。",
        sourceNote: "2026 年 7 月 24 日依 AION 2 全球 Steam 商店配備欄核對，並以 NC 全球 PC 平台公告確認服務範圍。本頁不混入韓國／臺灣行動版或當地 PC 規格。",
        keywords: ["AION 2 全球版系統需求", "AION2 Steam 配備", "AION2 PC 最低配備", "AION2 建議配備", "AION2 100GB"],
        sections: [
          {
            id: "global-steam-table",
            title: "AION 2 全球 Steam PC 最低與建議配備表",
            paragraphs: [
              "最低與建議欄位都來自同一張全球 Steam PC 表。相近型號、筆電版 GPU 或未列出的硬體不會因名稱接近而自動取得官方保證；購買硬體前應比較實際效能與顯示記憶體。",
            ],
            table: {
              caption: "AION 2 全球 Steam Windows PC 系統需求",
              headers: ["項目", "最低配備", "建議配備"],
              rows: [
                { header: "作業系統", cells: ["Windows 10／11 64 位元", "Windows 10／11 64 位元"] },
                { header: "AMD CPU", cells: ["Ryzen 5 2600", "Ryzen 7 3700X"] },
                { header: "Intel CPU", cells: ["Core i5-10500", "Core i7-11700"] },
                { header: "記憶體", cells: ["8 GB RAM", "16 GB RAM"] },
                { header: "NVIDIA GPU", cells: ["GTX 1050 Ti 4 GB", "RTX 2070 8 GB"] },
                { header: "DirectX", cells: ["Version 12", "Version 12"] },
                { header: "網路", cells: ["寬頻網路連線", "寬頻網路連線"] },
                { header: "儲存空間", cells: ["100 GB 可用空間；建議 SSD", "100 GB 可用空間；建議 SSD"] },
                { header: "官方目標", cells: ["FHD／Very Low", "FHD／Low"] },
              ],
            },
          },
          {
            id: "storage-download-preload",
            title: "100 GB 是下載大小嗎？預先下載何時開放？",
            paragraphs: [
              "不是。Steam 的 100 GB 欄位是 required available storage，代表磁碟需要保留的可用空間。它不能直接當成下載流量、壓縮檔大小或最終安裝資料夾大小。",
              "截至核對日，全球版實際下載大小、預先下載日期與開放時間尚未公布。更新、解壓縮與暫存也可能需要額外空間；若磁碟剛好只剩 100 GB，應先等待正式下載公告再安排。",
            ],
          },
          {
            id: "platform-scope",
            title: "這張 AION 2 配備表支援哪些平台？",
            paragraphs: [
              "這是全球 Steam 的 Windows PC 表。NC 已宣布全球 PC 版透過 Steam 與 PURPLE 提供，但目前沒有另一張已核對的 PURPLE 專用配備表，因此本站不自行宣稱兩個啟動器存在不同硬體門檻。",
              "官方尚未為全球版公布 macOS、Linux、Steam Deck、主機或行動裝置系統需求。本頁不引用韓國／臺灣現行服務的 Android、iPhone 或平板資料來代表全球版。",
            ],
          },
          {
            id: "requirements-faq",
            title: "AION 2 全球版 PC 配備常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 全球版最低需要多少 RAM？", answer: "Steam 最低配備是 8 GB RAM，建議配備是 16 GB RAM。最低欄位不保證所有大型戰鬥都維持固定幀率。" },
              { question: "AION 2 全球版需要 SSD 嗎？", answer: "Steam 目前寫的是 SSD recommended，而不是把 SSD 列為絕對最低條件；但兩個配備級別都建議 SSD，並要求 100 GB 可用空間。" },
              { question: "100 GB 是 AION 2 的實際下載大小嗎？", answer: "不是。100 GB 是 Steam 公布的可用儲存空間要求；實際壓縮下載大小與最終安裝大小尚未公布。" },
              { question: "AION 2 全球版何時可以預先下載？", answer: "截至 2026 年 7 月 24 日，官方尚未公布全球版預先下載日期、時間或實際下載大小。" },
              { question: "AION 2 全球版有手機或 Steam Deck 配備嗎？", answer: "目前沒有。全球版已公布的是 Windows PC 表；Android、iPhone、Steam Deck、macOS、Linux 與主機支援不能由這張表推定。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 7, {
        eyebrow: "GLOBAL STEAM PC REQUIREMENTS",
        title: "AION 2 System Requirements: Global Steam Minimum & Recommended Specs",
        description: "AION 2 Global on Steam requires at least 64-bit Windows 10/11, 8 GB RAM, a GTX 1050 Ti, and 100 GB available storage. Compare the complete recommended PC specs.",
        intro: "Answer first: AION 2 Global currently publishes a Windows PC requirements table on Steam. Minimum targets FHD Very Low and recommended targets FHD Low; both ask for 100 GB of available storage and recommend an SSD. The 100 GB figure is required free storage, not a confirmed compressed download size.",
        sourceNote: "Verified July 24, 2026 against the AION 2 Global Steam requirements panel, with NC's global PC platform announcement used to define scope. Korea/Taiwan mobile and local PC requirements are not mixed into this page.",
        keywords: ["AION 2 system requirements", "AION 2 Steam requirements", "AION 2 minimum specs", "AION 2 recommended specs", "AION 2 100 GB"],
        sections: [
          {
            id: "global-steam-table",
            title: "AION 2 Global Steam minimum and recommended PC specs",
            paragraphs: [
              "Both columns below come from the same global Steam PC table. A nearby desktop part, laptop GPU, or unlisted device does not become officially supported just because its name is similar; compare real performance and VRAM before buying hardware.",
            ],
            table: {
              caption: "AION 2 Global Steam Windows PC system requirements",
              headers: ["Component", "Minimum", "Recommended"],
              rows: [
                { header: "Operating system", cells: ["Windows 10/11 64-bit", "Windows 10/11 64-bit"] },
                { header: "AMD CPU", cells: ["Ryzen 5 2600", "Ryzen 7 3700X"] },
                { header: "Intel CPU", cells: ["Core i5-10500", "Core i7-11700"] },
                { header: "Memory", cells: ["8 GB RAM", "16 GB RAM"] },
                { header: "NVIDIA GPU", cells: ["GTX 1050 Ti 4 GB", "RTX 2070 8 GB"] },
                { header: "DirectX", cells: ["Version 12", "Version 12"] },
                { header: "Network", cells: ["Broadband internet", "Broadband internet"] },
                { header: "Storage", cells: ["100 GB available; SSD recommended", "100 GB available; SSD recommended"] },
                { header: "Official target", cells: ["FHD / Very Low", "FHD / Low"] },
              ],
            },
          },
          {
            id: "storage-download-preload",
            title: "Is 100 GB the download size, and when is preload?",
            paragraphs: [
              "No. Steam's 100 GB field is required available storage: free disk space to reserve for installation. It is not the download transfer, compressed archive size, or confirmed final folder size.",
              "As of the verification date, the actual global download size, preload date, and preload opening time are unannounced. Updates, decompression, and temporary files may also need headroom, so a drive with exactly 100 GB free should wait for the download notice before planning.",
            ],
          },
          {
            id: "platform-scope",
            title: "Which platforms does this AION 2 requirements table cover?",
            paragraphs: [
              "This is the global Steam Windows PC table. NC has announced the global PC release for Steam and PURPLE, but a separate verified PURPLE requirement table is not currently used here, so KINA does not invent different hardware thresholds between launchers.",
              "No global requirements have been published for macOS, Linux, Steam Deck, consoles, or mobile devices. Korea/Taiwan Android, iPhone, and tablet requirements are not evidence for the global build and are intentionally excluded.",
            ],
          },
          {
            id: "requirements-faq",
            title: "AION 2 Global PC requirements FAQ",
            paragraphs: [],
            faq: [
              { question: "How much RAM does AION 2 Global need?", answer: "Steam lists 8 GB RAM as minimum and 16 GB RAM as recommended. The minimum tier does not promise a fixed frame rate in every large encounter." },
              { question: "Does AION 2 Global require an SSD?", answer: "Steam currently says SSD recommended rather than making it an absolute minimum, but both tiers recommend an SSD and require 100 GB of available storage." },
              { question: "Is 100 GB the actual AION 2 download size?", answer: "No. It is Steam's available-storage requirement. The compressed transfer and final installation size have not been announced." },
              { question: "When can I preload AION 2 Global?", answer: "As of July 24, 2026, the global preload date, time, and actual download size have not been announced." },
              { question: "Are there AION 2 Global mobile or Steam Deck requirements?", answer: "Not currently. The published global table is for Windows PC; Android, iPhone, Steam Deck, macOS, Linux, and console support cannot be inferred from it." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 7, {
        eyebrow: "글로벌 STEAM PC 시스템 요구 사항",
        title: "아이온2 글로벌 시스템 요구 사항: Steam 최소·권장 PC 사양",
        description: "아이온2 글로벌 Steam 최소 사양은 64비트 Windows 10/11, RAM 8GB, GTX 1050 Ti, 100GB 여유 공간입니다. 전체 권장 PC 사양을 비교하세요.",
        intro: "먼저 답하면 아이온2 글로벌은 현재 Steam에 Windows PC 사양표만 공개했습니다. 최소는 FHD Very Low, 권장은 FHD Low를 목표로 하며 모두 100GB 여유 공간과 SSD 권장을 표시합니다. 100GB는 설치 전에 확보할 available storage이며 확인된 압축 다운로드 크기가 아닙니다.",
        sourceNote: "2026년 7월 24일 AION 2 글로벌 Steam 사양과 NC 글로벌 PC 플랫폼 발표를 확인했습니다. 한국·대만 모바일 또는 현지 PC 사양은 이 페이지에 섞지 않습니다.",
        keywords: ["아이온2 글로벌 사양", "아이온2 Steam 사양", "아이온2 최소 사양", "아이온2 권장 사양", "아이온2 100GB"],
        sections: [
          {
            id: "global-steam-table",
            title: "아이온2 글로벌 Steam 최소·권장 PC 사양표",
            paragraphs: [
              "아래 두 열은 같은 글로벌 Steam PC 표에서 가져왔습니다. 이름이 비슷한 데스크톱 부품, 노트북 GPU 또는 목록에 없는 기기가 자동으로 공식 지원되는 것은 아니므로 구매 전에 실제 성능과 VRAM을 비교하세요.",
            ],
            table: {
              caption: "아이온2 글로벌 Steam Windows PC 시스템 요구 사항",
              headers: ["항목", "최소 사양", "권장 사양"],
              rows: [
                { header: "운영체제", cells: ["Windows 10/11 64비트", "Windows 10/11 64비트"] },
                { header: "AMD CPU", cells: ["Ryzen 5 2600", "Ryzen 7 3700X"] },
                { header: "Intel CPU", cells: ["Core i5-10500", "Core i7-11700"] },
                { header: "메모리", cells: ["RAM 8GB", "RAM 16GB"] },
                { header: "NVIDIA GPU", cells: ["GTX 1050 Ti 4GB", "RTX 2070 8GB"] },
                { header: "DirectX", cells: ["Version 12", "Version 12"] },
                { header: "네트워크", cells: ["광대역 인터넷", "광대역 인터넷"] },
                { header: "저장 공간", cells: ["100GB 여유, SSD 권장", "100GB 여유, SSD 권장"] },
                { header: "공식 목표", cells: ["FHD / Very Low", "FHD / Low"] },
              ],
            },
          },
          {
            id: "storage-download-preload",
            title: "100GB는 다운로드 크기인가요? 사전 다운로드는 언제인가요?",
            paragraphs: [
              "아닙니다. Steam의 100GB 항목은 설치를 위해 남겨야 할 required available storage입니다. 전송되는 다운로드 데이터, 압축 파일이나 최종 폴더 크기로 바로 해석할 수 없습니다.",
              "확인일 기준 실제 글로벌 다운로드 크기, 사전 다운로드 날짜와 시작 시각은 미공개입니다. 업데이트, 압축 해제와 임시 파일에도 추가 공간이 들 수 있으므로 정확히 100GB만 남은 드라이브는 공식 다운로드 공지를 기다려 계획하세요.",
            ],
          },
          {
            id: "platform-scope",
            title: "이 아이온2 사양표는 어떤 플랫폼에 적용되나요?",
            paragraphs: [
              "글로벌 Steam Windows PC 표입니다. NC는 글로벌 PC판을 Steam과 PURPLE로 제공한다고 발표했지만 별도의 검증된 PURPLE 전용 사양표는 이 페이지에 사용하지 않으므로 런처마다 다른 하드웨어 조건을 만들어 내지 않습니다.",
              "글로벌판 macOS, Linux, Steam Deck, 콘솔 또는 모바일 시스템 요구 사항은 아직 공개되지 않았습니다. 한국·대만 Android, iPhone과 태블릿 표는 글로벌판 근거가 아니므로 제외했습니다.",
            ],
          },
          {
            id: "requirements-faq",
            title: "아이온2 글로벌 PC 사양 FAQ",
            paragraphs: [],
            faq: [
              { question: "아이온2 글로벌은 RAM이 얼마나 필요한가요?", answer: "Steam 최소 사양은 RAM 8GB, 권장 사양은 RAM 16GB입니다. 최소 사양이 모든 대규모 전투에서 고정 프레임을 보장하지는 않습니다." },
              { question: "아이온2 글로벌은 SSD가 필수인가요?", answer: "Steam은 현재 SSD recommended로 적어 절대 최소 조건으로 표시하지 않았지만 두 사양 모두 SSD를 권장하고 100GB 여유 공간을 요구합니다." },
              { question: "100GB가 아이온2 실제 다운로드 크기인가요?", answer: "아닙니다. Steam의 여유 저장 공간 요구치이며 압축 다운로드와 최종 설치 크기는 공개되지 않았습니다." },
              { question: "아이온2 글로벌 사전 다운로드는 언제인가요?", answer: "2026년 7월 24일 기준 글로벌 사전 다운로드 날짜, 시각과 실제 다운로드 크기는 발표되지 않았습니다." },
              { question: "아이온2 글로벌 모바일이나 Steam Deck 사양이 있나요?", answer: "현재 없습니다. 공개된 글로벌 표는 Windows PC용이며 Android, iPhone, Steam Deck, macOS, Linux와 콘솔 지원을 이 표에서 추정할 수 없습니다." },
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "deity-traces",
    schemaType: "Article",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [daevaExpressAnnouncementSource, chapterOneOfficialPageSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/06722263-e6d7-49e8-96c0-c885363eb4c9.png",
      800,
      420,
      daevaExpressAnnouncementSource.url,
      {
        "zh-hant": {
          alt: "AION2 SUMMER FESTA 官方宣傳圖",
          caption: "NC 在 SUMMER FESTA 資料中公開 Daeva Express 及可一次完成的成長項目。",
        },
        en: {
          alt: "Official AION2 SUMMER FESTA artwork",
          caption: "NC used the SUMMER FESTA materials to introduce Daeva Express and the progression it can complete in a batch.",
        },
        ko: {
          alt: "AION2 SUMMER FESTA 공식 이미지",
          caption: "NC는 SUMMER FESTA 자료에서 데바 익스프레스와 일괄 완료 가능한 성장 항목을 공개했습니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "interactive-map-quickstart" },
      { kind: "content", section: "database", slug: "map-data-methodology" },
      { kind: "content", section: "news", slug: "chapter-1-lands-of-sand-and-snow" },
      { kind: "tool", toolSlug: "map" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "成長支援",
        title: "AION2 主神的痕跡：Daeva Express 已確認的一次完成範圍",
        description: "官方 Chapter 1 資料確認 Daeva Express 可一次完成特定區域的封印副本、駐屯地與主神的痕跡取得；本文不虛構完整點位、數量或路線。",
        intro: "搜尋主神的痕跡時，最可靠的新資訊不是一張沒有版本日期的『全收集圖』，而是 NC 在 Chapter 1 前後公開的 Daeva Express 範圍。官方文字能證明哪些成長項目可一次完成，但沒有在這兩份來源中提供可核對的完整點位與總數。",
        sourceNote: "依 NC 2026 年 6 月 15 日 SUMMER FESTA 公告及 Chapter 1 官方內容頁核對；只記錄 Daeva Express 明文列出的地區與項目。",
        keywords: ["AION2 主神的痕跡", "AION2 神的痕跡", "AION2 Daeva Express", "AION2 德巴快線", "주신의 흔적"],
        sections: [
          {
            id: "confirmed-batch-scope",
            title: "官方確認的批次完成內容",
            paragraphs: [
              "NC 的 2026 年 6 月 15 日公告把 Daeva Express 描述為可一次完成駐屯地、封印副本與主神的痕跡進度的功能。Chapter 1 官方頁再把範圍收窄到貝爾特倫與阿爾特蓋德，並寫明封印副本、駐屯地和主神的痕跡取得可以批次完成。",
              "Chapter 1 頁面另註明，主神的痕跡範圍包含混沌的艾雷修蘭塔區域。這是官方頁面對 Daeva Express 的範圍註記，不代表所有地圖、未來新增區域或每個帳號狀態都自動包含。",
            ],
          },
          {
            id: "what-is-not-published",
            title: "來源沒有公布完整點位和總數",
            paragraphs: [
              "兩份官方來源沒有列出每一個主神的痕跡座標、名稱、互動順序、帳號條件或全版本固定總數。因此本頁不製作『缺一不可』的完整清單，也不把舊地圖標記補成官方數據。",
              "若需要找尚未由 Daeva Express 處理的個別點位，先在遊戲內確認目前區域、角色進度與功能提示，再把可追溯的官方或實測證據加入地圖。空白欄位應保持未知，而不是用推測補齊。",
            ],
          },
          {
            id: "version-check",
            title: "使用前先核對版本與角色狀態",
            paragraphs: [
              "Daeva Express 是 Chapter 1 時期新增的成長支援系統。實際顯示、可用條件或之後新增地區可能隨更新改變；若遊戲內說明與 6 月的預告不同，應以當前遊戲顯示及較新的官方公告為準。",
            ],
            bullets: [
              "確認正在使用韓國／台灣現行版，而不是尚未採用相同系統的全球版資料。",
              "確認功能名稱為 Daeva Express，避免和一般立即完成券混為一談。",
              "只把貝爾特倫、阿爾特蓋德及官方註明的混沌區域列為本次已核對範圍。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "PROGRESSION SUPPORT",
        title: "AION2 Empyrean Traces: the confirmed Daeva Express batch scope",
        description: "Official Chapter 1 material confirms that Daeva Express can batch-complete selected Sealed Dungeon, Stronghold, and Empyrean Trace progression without publishing a complete point list or total.",
        intro: "The reliable new fact for an Empyrean Trace search is not an undated 'all locations' image. It is the Daeva Express scope published by NC around Chapter 1. Those sources establish which progression categories can be completed together, but they do not provide a verifiable master list of every trace and coordinate.",
        sourceNote: "Checked against NC's June 15, 2026 SUMMER FESTA release and the official Chapter 1 content page. Only regions and categories stated for Daeva Express are recorded.",
        keywords: ["AION2 Empyrean Trace", "AION2 deity traces", "AION2 god traces", "AION2 Daeva Express", "AION2 trace locations"],
        sections: [
          {
            id: "confirmed-batch-scope",
            title: "What NC confirms can be completed in a batch",
            paragraphs: [
              "NC's June 15 announcement describes Daeva Express as a feature that completes Stronghold, Sealed Dungeon, and Empyrean Trace progression at once. The official Chapter 1 page narrows the named regional scope to Verteron and Altgard and states that their Sealed Dungeons, Strongholds, and Empyrean Trace acquisition can be completed in a batch.",
              "The Chapter 1 page adds that the Empyrean Trace scope includes the Chaotic Ereshuranta area. This is a Daeva Express scope note, not proof that every map, future region, or account state is automatically covered.",
            ],
          },
          {
            id: "what-is-not-published",
            title: "The sources do not publish every point or a fixed total",
            paragraphs: [
              "Neither source lists every trace coordinate, name, interaction order, account condition, or permanent total across all builds. This page therefore does not manufacture a complete checklist or promote old community markers to official data.",
              "If an individual trace still needs to be found, first confirm the current region, character progression, and Daeva Express message in game. Add a map marker only when it has traceable official or observed evidence. An empty field remains unknown rather than a guessed location.",
            ],
          },
          {
            id: "version-check",
            title: "Check the build and character state before using the scope",
            paragraphs: [
              "Daeva Express was introduced as Chapter 1 progression support. Its presentation, eligibility, or later regional coverage can change. When the live game differs from the June preview, use the current in-game explanation and a newer official notice.",
            ],
            bullets: [
              "Confirm that the guide refers to the current Korea/Taiwan service rather than an unverified global-build implementation.",
              "Confirm the feature is Daeva Express, not a general instant-completion ticket.",
              "Treat Verteron, Altgard, and the expressly included Chaotic area as the reviewed scope—not the entire world.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "성장 지원",
        title: "AION2 주신의 흔적: 데바 익스프레스 일괄 완료 확인 범위",
        description: "공식 Chapter 1 자료는 데바 익스프레스가 특정 지역의 봉인 던전, 주둔지, 주신의 흔적 획득을 일괄 완료한다고 확인하지만 전체 위치와 총개수는 공개하지 않습니다.",
        intro: "주신의 흔적을 검색할 때 가장 신뢰할 수 있는 새 정보는 버전이 없는 '전체 수집 지도'가 아니라 NC가 Chapter 1 전후에 공개한 데바 익스프레스 범위입니다. 공식 문구는 일괄 완료 가능한 성장 항목을 확인해 주지만 모든 흔적의 위치와 총개수까지 제공하지는 않습니다.",
        sourceNote: "NC의 2026년 6월 15일 SUMMER FESTA 발표와 Chapter 1 공식 콘텐츠 페이지를 확인했으며 데바 익스프레스에 명시된 지역과 항목만 기록했습니다.",
        keywords: ["아이온2 주신의 흔적", "아이온2 데바 익스프레스", "주신의 흔적 위치", "주신의 흔적 개수", "AION2 Empyrean Trace"],
        sections: [
          {
            id: "confirmed-batch-scope",
            title: "공식 확인된 일괄 완료 항목",
            paragraphs: [
              "NC의 2026년 6월 15일 발표는 데바 익스프레스를 주둔지, 봉인 던전, 주신의 흔적 진행을 한 번에 완료하는 기능으로 설명합니다. Chapter 1 공식 페이지는 베르테론과 알트가르드의 봉인 던전·주둔지·주신의 흔적 획득을 일괄 완료한다고 지역 범위를 더 구체적으로 밝힙니다.",
              "Chapter 1 페이지에는 주신의 흔적이 혼돈의 에레슈란타 지역까지 포함된다는 주석도 있습니다. 이는 데바 익스프레스 범위에 대한 설명이며 모든 지도, 향후 지역, 모든 계정 상태가 자동으로 포함된다는 뜻은 아닙니다.",
            ],
          },
          {
            id: "what-is-not-published",
            title: "전체 위치와 고정 총개수는 공개되지 않았습니다",
            paragraphs: [
              "두 공식 출처에는 모든 주신의 흔적 좌표, 이름, 상호작용 순서, 계정 조건, 전체 버전에 걸친 고정 총개수가 없습니다. 따라서 이 페이지는 완전 수집표를 만들어 내거나 오래된 커뮤니티 마커를 공식 데이터로 바꾸지 않습니다.",
              "개별 흔적을 찾아야 한다면 게임에서 현재 지역, 캐릭터 진행도, 데바 익스프레스 안내를 먼저 확인해야 합니다. 공식 또는 검증 가능한 관찰 근거가 있을 때만 지도에 추가하고 빈 항목은 추측으로 채우지 않습니다.",
            ],
          },
          {
            id: "version-check",
            title: "버전과 캐릭터 상태를 먼저 확인하세요",
            paragraphs: [
              "데바 익스프레스는 Chapter 1 성장 지원 시스템으로 소개됐습니다. 실제 표시, 사용 조건, 이후 지역 범위는 업데이트로 달라질 수 있으므로 라이브 게임이 6월 예고와 다르면 현재 게임 설명과 더 최신 공식 공지를 우선해야 합니다.",
            ],
            bullets: [
              "현재 한국·대만 서비스 기준인지, 글로벌 버전에 확인되지 않은 내용을 적용한 것인지 구분합니다.",
              "일반 즉시 완료권이 아니라 데바 익스프레스 기능인지 확인합니다.",
              "베르테론, 알트가르드, 공식 주석의 혼돈 지역만 이번 검토 범위로 취급합니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "godstone-imprint",
    schemaType: "TechArticle",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [godstoneProbabilitySource, officialGodstoneItemSource],
    heroImage: officialHero(
      "https://fizz-download.playnccdn.com/download/v2/buckets/conti-upload/files/1916d7cba79-fe439470-dacc-4faa-9d44-8fd33f2a84d8",
      1200,
      630,
      godstoneProbabilitySource.url,
      {
        "zh-hant": {
          alt: "NC 官方機率資訊頁圖片",
          caption: "神石合成候選應以 NC 官方機率目錄及當前遊戲內資訊核對。",
        },
        en: {
          alt: "NC official probability-information page image",
          caption: "Godstone synthesis candidates should be checked against NC's official probability catalog and the current in-game display.",
        },
        ko: {
          alt: "NC 공식 확률정보 페이지 이미지",
          caption: "신석 합성 후보는 NC 공식 확률정보와 현재 게임 내 표시를 기준으로 확인해야 합니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "soul-imprint" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
      { kind: "content", section: "database", slug: "map-data-methodology" },
      { kind: "content", section: "classes", slug: "class-planning-framework" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "裝備系統",
        title: "AION2 神石刻印與合成：官方可確認的候選規則",
        description: "NC 官方機率資訊只確認投入材料神石的等級會決定可取得神石的機率清單，物品庫則顯示裝備具有神石刻印欄位；本文不編造最佳神石或觸發率。",
        intro: "神石問題常被混成三件事：合成時有哪些候選、裝備資料是否支援神石刻印，以及某效果實戰上是否最好。官方資料能直接支持前兩件事；沒有逐項核對的效果觸發率、職業排名和『畢業答案』不能由此推導。",
        sourceNote: "以 NC 官方神石合成機率目錄與官方物品庫範例核對；不轉錄未確認的玩家排行、最佳搭配或效果觸發率。",
        keywords: ["AION2 神石", "AION2 神石合成", "AION2 神石刻印", "AION2 Godstone", "신석 합성", "신석 각인"],
        sections: [
          {
            id: "synthesis-candidate-rule",
            title: "材料等級決定候選機率清單",
            paragraphs: [
              "NC 的神石合成機率頁明文說明：依照作為材料使用的神石等級，會決定可取得神石的機率清單。這能支持『材料等級會改變候選池』，但不能在沒有查看當期表格時補出候選名稱、數量或個別機率。",
              "官方頁面也提醒機率會在小數點第七位四捨五入，四捨五入可能讓總和不是剛好 100%，而且表格上下部分可能因分頁分開顯示。閱讀時要保留頁面版本和更新時間，不應只截取其中一頁當成完整候選。",
            ],
          },
          {
            id: "imprint-field",
            title: "官方物品庫可確認神石刻印欄位",
            paragraphs: [
              "AION2 官方物品庫的具名武器範例在物品資訊中列有『神石刻印』欄位，和靈魂刻印、魔石刻印分開呈現。這證明官方資料模型會把神石刻印當成獨立裝備資訊。",
              "單一武器頁有這個欄位，不等於每種裝備都可刻印任意神石，也不證明頁面當下已有某個效果。是否可用、已刻印內容與限制，仍要看該物品的實際遊戲內說明。",
            ],
          },
          {
            id: "decision-boundary",
            title: "官方資料沒有給出『最佳神石』",
            paragraphs: [
              "候選機率只描述合成結果如何組成，不等於效果強度排名。官方物品欄位也只證明資訊結構存在，不能推算觸發率、內置冷卻、傷害、職業適性或市場價值。",
            ],
            bullets: [
              "合成前按材料等級打開當期官方機率頁，確認完整分頁。",
              "刻印前在遊戲內核對目標物品是否支援及顯示的限制。",
              "任何最佳搭配都要標示版本、職業和用途，不能冒充 NC 官方結論。",
              "本頁不列未由來源支持的效果觸發率或成功率。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "EQUIPMENT SYSTEM",
        title: "AION2 Godstone Imprint and synthesis: the confirmed candidate rule",
        description: "NC's official catalog confirms that the grade of material Godstones determines the obtainable-probability list, while the item database exposes a Godstone Imprint field. It does not establish a best Godstone or trigger rate.",
        intro: "Godstone questions often combine three separate issues: the synthesis candidate pool, whether equipment data supports a Godstone Imprint, and which effect is best in combat. Official sources directly support the first two. They do not let us invent effect trigger rates, class rankings, or a permanent best-in-slot answer.",
        sourceNote: "Checked against NC's official Godstone synthesis probability catalog and an official item-database example. No community ranking, best pairing, or unverified trigger rate is presented as official.",
        keywords: ["AION2 Godstone", "AION2 Godstone synthesis", "AION2 Godstone Imprint", "AION2 Godstone probability", "best AION2 Godstone"],
        sections: [
          {
            id: "synthesis-candidate-rule",
            title: "Material grade determines the probability candidate list",
            paragraphs: [
              "NC's Godstone synthesis disclosure says that the grade of the Godstones used as materials determines the probability list of Godstones that can be obtained. That supports a grade-dependent candidate pool. It does not support filling in names, counts, or individual probabilities without reading the current table.",
              "The official page also says probabilities are rounded at the seventh decimal place, rounding can make the displayed total differ from exactly 100%, and the upper and lower parts of the probability table can appear on separate pages. Keep the page version and update time instead of treating one screenshot as the full pool.",
            ],
          },
          {
            id: "imprint-field",
            title: "The official item database exposes a Godstone Imprint field",
            paragraphs: [
              "A named weapon example in AION2's official item database includes a Godstone Imprint section, presented separately from Soul Imprint and Manastone Imprint. This confirms that the official item model treats Godstone Imprint as a distinct equipment field.",
              "A field on one weapon page does not prove that every equipment type accepts any Godstone or that a specific effect is already imprinted. Use the live item description for eligibility, the installed effect, and its restrictions.",
            ],
          },
          {
            id: "decision-boundary",
            title: "The sources do not name a best Godstone",
            paragraphs: [
              "A synthesis probability list describes how outcomes are selected; it is not an effect-strength ranking. An item field likewise cannot establish trigger rate, internal cooldown, damage, class fit, or market value.",
            ],
            bullets: [
              "Before synthesis, select the material grade and review every page of the current official table.",
              "Before imprinting, confirm the target item's support and restrictions in game.",
              "Label any recommendation with build, class, and use case; do not present it as an NC ranking.",
              "This page intentionally omits effect trigger and success rates not supported by the cited sources.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "장비 시스템",
        title: "AION2 신석 각인과 합성: 공식 확인 가능한 후보 규칙",
        description: "NC 공식 확률정보는 재료 신석의 등급에 따라 획득 가능한 신석 확률 목록이 결정된다고 설명하며 공식 아이템 정보에는 신석 각인 항목이 있습니다. 최적 신석이나 발동률은 확인되지 않습니다.",
        intro: "신석 질문에는 합성 후보, 장비의 신석 각인 지원 정보, 실전에서 가장 좋은 효과가 자주 섞입니다. 공식 자료는 앞의 두 항목을 직접 확인해 주지만 효과 발동률, 직업 순위, 영구적인 최종 답을 만들어 낼 근거는 아닙니다.",
        sourceNote: "NC 공식 신석 합성 확률정보와 공식 아이템 정보 예시를 확인했습니다. 커뮤니티 순위, 최적 조합, 확인되지 않은 발동률을 공식 정보처럼 표시하지 않습니다.",
        keywords: ["아이온2 신석", "아이온2 신석 합성", "아이온2 신석 각인", "신석 합성 확률", "아이온2 신석 추천"],
        sections: [
          {
            id: "synthesis-candidate-rule",
            title: "재료 등급이 후보 확률 목록을 결정합니다",
            paragraphs: [
              "NC 신석 합성 확률 페이지는 재료로 사용한 신석의 등급에 따라 획득할 수 있는 신석의 확률 목록이 결정된다고 명시합니다. 따라서 재료 등급별 후보군이 다르다는 점은 확인할 수 있지만 현재 표를 보지 않고 후보 이름, 개수, 개별 확률을 채울 수는 없습니다.",
              "공식 페이지는 확률이 소수점 일곱 번째 자리에서 반올림되고, 그 차이로 합이 정확히 100%가 아닐 수 있으며, 표 위아래 정보가 페이지 전환으로 나뉠 수 있다고 안내합니다. 한 장의 캡처를 전체 후보로 보지 말고 페이지 버전과 갱신 시각을 함께 확인해야 합니다.",
            ],
          },
          {
            id: "imprint-field",
            title: "공식 아이템 정보에서 신석 각인 항목을 확인할 수 있습니다",
            paragraphs: [
              "AION2 공식 아이템 정보의 특정 무기 예시에는 영혼 각인, 마석 각인과 별도로 '신석 각인' 항목이 표시됩니다. 공식 아이템 데이터에서 신석 각인을 독립된 장비 정보로 다룬다는 점을 확인할 수 있습니다.",
              "한 무기 페이지에 항목이 있다는 사실은 모든 장비가 모든 신석을 지원하거나 현재 특정 효과가 각인됐다는 뜻이 아닙니다. 사용 가능 여부, 실제 각인 효과, 제한은 해당 아이템의 게임 내 설명을 확인해야 합니다.",
            ],
          },
          {
            id: "decision-boundary",
            title: "공식 자료는 '최고의 신석'을 정하지 않습니다",
            paragraphs: [
              "합성 확률 목록은 결과 후보가 정해지는 방식을 설명할 뿐 효과 성능 순위가 아닙니다. 아이템 항목만으로 발동률, 내부 재사용 시간, 피해, 직업 적합성, 거래 가치를 계산할 수도 없습니다.",
            ],
            bullets: [
              "합성 전에 재료 등급을 선택하고 현재 공식 확률표의 전체 페이지를 확인합니다.",
              "각인 전에 게임에서 대상 아이템의 지원 여부와 제한을 확인합니다.",
              "추천에는 버전, 직업, 용도를 붙이고 NC 공식 순위처럼 표시하지 않습니다.",
              "출처가 뒷받침하지 않는 효과 발동률과 성공률은 이 페이지에 싣지 않습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "kinah-bound",
    schemaType: "Article",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    readingMinutes: 4,
    publication: publishedVerified,
    sources: [boundKinaSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/7af391d9-a145-40ff-93bd-3ac40bd21c08.png",
      800,
      420,
      boundKinaSource.url,
      {
        "zh-hant": {
          alt: "AION2 2026 年 3 月 25 日官方更新宣傳圖",
          caption: "NC 在這次韓國／台灣現行版更新中導入 Kina (Bound)。",
        },
        en: {
          alt: "Official AION2 March 25, 2026 update artwork",
          caption: "NC introduced Kina (Bound) in this Korea/Taiwan live-service update.",
        },
        ko: {
          alt: "AION2 2026년 3월 25일 공식 업데이트 이미지",
          caption: "NC는 이 한국·대만 라이브 서비스 업데이트에서 각인 키나를 도입했습니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "scam-check" },
      { kind: "content", section: "news", slug: "global-server-regions" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
      { kind: "content", section: "guides", slug: "system-requirements" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 4, {
        eyebrow: "貨幣版本紀錄",
        title: "AION2 綁定基納：Kina (Bound) 的官方導入時間與版本邊界",
        description: "NC 在 2026 年 3 月 25 日韓國／台灣現行版更新中導入 Kina (Bound)；本文只記錄官方名稱、來源類別與版本範圍，不編刷錢路線、收益率或市場價格。",
        intro: "官方英文公告使用 Kina (Bound)，韓文公告使用『각인 키나』。這是一項在 2026 年 3 月加入現行服務的貨幣變更，不代表所有舊攻略、全球版或之後的經濟規則都相同。",
        sourceNote: "依 NC 2026 年 3 月 25 日官方更新公告核對；不以玩家行情、拍賣場截圖或未標日期的收益測試補充經濟結論。",
        keywords: ["AION2 綁定基納", "AION2 綁定 Kinah", "AION2 Kina Bound", "AION2 各印基納", "각인 키나"],
        sections: [
          {
            id: "introduced-in-march",
            title: "2026 年 3 月 25 日正式導入",
            paragraphs: [
              "NC 的 3 月 25 日公告明確把 Kina (Bound) 列為當日更新內容。公告表示這項變更回應玩家意見，並把任務與使命獎勵、NPC 商店、封印副本和駐屯地列為綁定基納的取得類別。",
              "同一公告把一般 Kina 分開說明，列出的取得類別包括玩家交易、怪物狩獵與 Odyle Energy Cubes。這能證明公告區分兩種貨幣來源，但不能由此推定兩者的固定兌換關係、可交易範圍或現行價格。",
            ],
          },
          {
            id: "version-boundary",
            title: "這是韓國／台灣現行版的版本節點",
            paragraphs: [
              "Kina (Bound) 的導入發生在韓國／台灣服務已上線後的 2026 年 3 月更新。全球版另有 PC 平台與發布節奏；在全球官方公告明確列入前，不能假設全球版首日一定沿用相同貨幣來源或限制。",
              "後續更新也可能調整任務、商店、內容獎勵及貨幣用途。本頁保留 2026 年 3 月 25 日這個可追溯節點，不把當時公告寫成永遠不變的經濟規則。",
            ],
          },
          {
            id: "no-farming-claims",
            title: "本頁不提供未驗證的刷錢結論",
            paragraphs: [
              "官方公告沒有提供每小時收益、最佳路線、伺服器物價、NPC 買賣差價、帳號每日上限或市場投資建議。本頁因此不排列『最快基納』路線，也不把單一玩家的短期測試變成全服收益率。",
            ],
            bullets: [
              "看到收益數字時先核對伺服器、版本、日期、角色條件與樣本時間。",
              "綁定與一般 Kina 的用途、限制以當前遊戲內貨幣說明為準。",
              "涉及真實金錢、代儲或場外交易時，先閱讀官方規範與防詐指南。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 4, {
        eyebrow: "CURRENCY VERSION NOTE",
        title: "AION2 Kina (Bound): official introduction date and build boundary",
        description: "NC introduced Kina (Bound) in the March 25, 2026 Korea/Taiwan live-service update. This page records the official name, source categories, and build boundary without inventing farming routes, hourly yield, or market prices.",
        intro: "The official English release uses the term Kina (Bound), while the Korean release calls it 각인 키나. It is a currency change added to the live service in March 2026, not proof that every old guide, the global build, or every later economy rule works the same way.",
        sourceNote: "Checked against NC's official March 25, 2026 update announcement. Player prices, auction screenshots, and undated yield tests are not used to manufacture economy conclusions.",
        keywords: ["AION2 Kina Bound", "AION2 Kinah Bound", "AION2 bound currency", "AION2 Kina", "AION2 currency"],
        sections: [
          {
            id: "introduced-in-march",
            title: "Introduced on March 25, 2026",
            paragraphs: [
              "NC explicitly lists Kina (Bound) among the March 25 update additions. The release says it was added in response to player feedback and names quests and Duty rewards, NPC shops, Sealed Dungeons, and Strongholds as source categories for Kina (Bound).",
              "The same release discusses regular Kina separately and names player trading, monster hunting, and Odyle Energy Cubes as its source categories. That proves the announcement distinguishes the two currencies; it does not establish a fixed exchange relationship, every trading restriction, or a current price.",
            ],
          },
          {
            id: "version-boundary",
            title: "A Korea/Taiwan live-build checkpoint",
            paragraphs: [
              "Kina (Bound) was introduced after the Korea/Taiwan service had launched, in the March 2026 live update. The global release has a separate PC platform and release path. Until a global official notice includes the system, do not assume that the global launch build uses the same sources or restrictions on day one.",
              "Later updates can also change quests, shops, content rewards, and currency uses. This page preserves March 25, 2026 as a traceable checkpoint instead of turning that announcement into a permanent economy rule.",
            ],
          },
          {
            id: "no-farming-claims",
            title: "No unverified farming claim is made here",
            paragraphs: [
              "The source does not provide hourly yield, an optimal route, server prices, NPC arbitrage, daily account caps, or market-investment advice. This page therefore does not rank a 'fastest Kina' route or turn one player's short test into a server-wide yield rate.",
            ],
            bullets: [
              "For any yield number, verify server, build, date, character conditions, and sample duration.",
              "Use the current in-game currency description for the uses and restrictions of bound and regular Kina.",
              "For real-money, top-up, or off-platform trade claims, check official policy and the scam-safety guide first.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 4, {
        eyebrow: "재화 버전 기록",
        title: "AION2 각인 키나: 공식 도입 시점과 버전 범위",
        description: "NC는 2026년 3월 25일 한국·대만 라이브 서비스 업데이트에 각인 키나를 도입했습니다. 이 페이지는 공식 명칭, 획득 범주, 버전 범위만 기록하며 파밍 동선, 시간당 수익, 시세를 만들지 않습니다.",
        intro: "한국어 공식 발표의 명칭은 '각인 키나'이고 영어 발표는 Kina (Bound)를 사용합니다. 2026년 3월 라이브 서비스에 추가된 재화 변경이며 오래된 모든 공략, 글로벌 버전, 이후 경제 규칙이 같다는 증거는 아닙니다.",
        sourceNote: "NC의 2026년 3월 25일 공식 업데이트 발표를 확인했습니다. 이용자 시세, 거래소 캡처, 날짜 없는 수익 테스트로 경제 결론을 보충하지 않습니다.",
        keywords: ["아이온2 각인 키나", "아이온2 키나", "각인 키나 획득", "아이온2 키나 파밍", "AION2 Kina Bound"],
        sections: [
          {
            id: "introduced-in-march",
            title: "2026년 3월 25일 도입",
            paragraphs: [
              "NC는 3월 25일 업데이트 항목에 각인 키나를 명확히 포함했습니다. 이용자 의견을 반영해 추가했으며 퀘스트 및 사명 보상, NPC 상점, 봉인 던전, 주둔지를 각인 키나 획득 범주로 안내했습니다.",
              "같은 발표는 일반 키나를 별도로 설명하고 이용자 거래, 몬스터 사냥, 오드 에너지 큐브를 획득 범주로 제시합니다. 두 재화를 구분했다는 사실은 확인되지만 고정 교환 관계, 모든 거래 제한, 현재 시세까지 증명하지는 않습니다.",
            ],
          },
          {
            id: "version-boundary",
            title: "한국·대만 라이브 버전의 기준 시점입니다",
            paragraphs: [
              "각인 키나는 한국·대만 서비스 출시 후인 2026년 3월 라이브 업데이트에서 도입됐습니다. 글로벌 버전은 별도 PC 플랫폼과 출시 경로를 가집니다. 글로벌 공식 공지에서 확인하기 전까지 글로벌 출시 빌드가 같은 획득처와 제한을 그대로 사용한다고 가정할 수 없습니다.",
              "이후 업데이트로 퀘스트, 상점, 콘텐츠 보상, 재화 용도가 바뀔 수도 있습니다. 이 페이지는 2026년 3월 25일을 추적 가능한 기준점으로 남기며 당시 발표를 영구적인 경제 규칙으로 쓰지 않습니다.",
            ],
          },
          {
            id: "no-farming-claims",
            title: "검증되지 않은 파밍 결론은 제공하지 않습니다",
            paragraphs: [
              "공식 발표에는 시간당 수익, 최적 동선, 서버 시세, NPC 차익, 계정 일일 한도, 시장 투자 조언이 없습니다. 따라서 이 페이지는 '가장 빠른 키나' 동선을 순위화하거나 한 이용자의 짧은 테스트를 전체 서버 수익률로 만들지 않습니다.",
            ],
            bullets: [
              "수익 수치를 볼 때 서버, 버전, 날짜, 캐릭터 조건, 표본 시간을 확인합니다.",
              "각인 키나와 일반 키나의 용도 및 제한은 현재 게임 내 재화 설명을 기준으로 합니다.",
              "현금, 대리 결제, 외부 거래 주장에는 공식 운영정책과 사기 예방 가이드를 먼저 확인합니다.",
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
