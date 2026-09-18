import type { SiteLocale } from "./site-config";
import { PFG_AUTHOR_NAME } from "./author-profile";

export type TrustPageKind = "about" | "contact" | "privacy" | "terms";

export type TrustSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  links?: readonly { href: string; label: string }[];
};

export type TrustPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  byline: string;
  publishedLabel: string;
  updatedLabel: string;
  sections: readonly TrustSection[];
  contactAction?: string;
};

export const TRUST_PAGE_PUBLISHED_AT = "2026-07-22";
export const TRUST_PAGE_MODIFIED_AT = "2026-07-25";

const establishedTrustPageCopy: Record<
  "zh-hant" | "en" | "ko",
  Record<TrustPageKind, TrustPageCopy>
> = {
  "zh-hant": {
    about: {
      eyebrow: "關於本站／編輯原則",
      title: "關於 AION2 KINA",
      description: "了解 AION2 KINA 如何以 10 種語言發布編輯內容、核對資料、標示作者及處理更正。",
      intro: "AION2 KINA 是面向全球 AION2 玩家的獨立粉絲資料站，以 10 種語言發布攻略、新聞、職業比較與玩家工具，另提供互動地圖及物品資料。本站與 NC Corporation 無隸屬、合作或背書關係。",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "發布",
      updatedLabel: "更新",
      sections: [
        {
          title: "AION2 KINA 提供什麼？",
          paragraphs: ["本站以 10 種語言發布攻略、職業資料、製作計算器、每日與每週清單、兌換碼及新聞；每種語言都有獨立且可索引的網址。互動地圖與物品資料亦整合於同一站內。"],
        },
        {
          title: "我們如何核對內容？",
          paragraphs: ["物品身份、圖示與品級等欄位會對照 NC 官方資料，來源語言或回退狀態會在受影響頁面標示。互動地圖點位則由 AION2 KINA 編輯整理、參考玩家回報並在遊戲內複核；NC 官方資料僅用於校對可確認的名稱、規則與範圍。編輯判斷、工具計算與社群發現會明確分開。"],
          links: [{ href: "/database/map-data-methodology/", label: "查看資料來源與地圖方法說明" }],
        },
        {
          title: "誰在編輯本站？",
          paragraphs: ["內容由網站作者 PFG 署名。PFG 是本站公開使用的作者筆名，負責整理、核對來源與維護更新；作者頁使用的是識別用插畫，不是真人照片，也不代表 NC 官方身份或任何未經證實的專家資格。編輯評估與官方結論會在頁面中明確區分。"],
        },
        {
          title: "如何提交更正？",
          paragraphs: ["若你發現過期資料、翻譯問題、失效來源或錯誤內容，可使用站內聯絡與更正表單。PFG 會先核對可公開驗證的證據，再調整公開頁面。"],
          links: [{ href: "/contact/", label: "前往聯絡與更正" }],
        },
      ],
    },
    contact: {
      eyebrow: "聯絡／更正",
      title: "聯絡與更正",
      description: "使用 AION2 KINA 站內表單回報過期或錯誤資料、翻譯問題、失效來源、權利疑慮或網站故障。",
      intro: "本站目前的公開聯絡渠道是站內回報表單。可用於回報過期或錯誤資料、翻譯問題、失效來源、權利疑慮和網站故障；請勿提交遊戲帳號、密碼、驗證碼或付款資料。",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "發布",
      updatedLabel: "更新",
      contactAction: "開啟聯絡與更正表單",
      sections: [
        {
          title: "可以回報哪些問題？",
          paragraphs: ["可提交內容過期、事實錯誤、重要資料缺漏、翻譯問題、來源連結失效、素材權利疑慮及其他網站問題。請盡量附上可公開核對的官方公告或證據連結。"],
        },
        {
          title: "表單會收集什麼？",
          paragraphs: ["表單會附上目前頁面、語言與資料範圍，並保存你填寫的問題說明、選填的證據連結及選填聯絡方式。聯絡方式只供核對這次回報，不會顯示在公開頁面。"],
        },
        {
          title: "帳號或付款問題怎麼辦？",
          paragraphs: ["AION2 KINA 不提供遊戲帳號、付款、退款或客服服務。這些問題必須透過你所在服務地區的 NC 官方支援渠道處理。"],
          links: [{ href: "https://tw.ncsoft.com/aion2/", label: "前往 AION2 台灣官方網站" }],
        },
      ],
    },
    privacy: {
      eyebrow: "隱私權",
      title: "隱私權政策",
      description: "AION2 KINA 隱私權政策：說明分析工具、本機儲存、語言 Cookie、站內回報與外部連結如何處理資料。",
      intro: "AION2 KINA 不要求訪客註冊帳號。網站只處理提供功能、分析使用情況與審核更正回報所需的有限資料。",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "發布",
      updatedLabel: "更新",
      sections: [
        {
          title: "瀏覽器會保存哪些資料？",
          paragraphs: ["Google Analytics 4 的統計與分析 Cookie 在公共頁面預設啟用；語言偏好另以有效期一年的 Cookie 保存。種族主題、清單勾選、地圖進度、收藏、職業問卷與計算器狀態可能保存在你的瀏覽器本機儲存空間；這些裝置內資料不會由 KINA 自動上傳。"],
        },
        {
          title: "網站如何使用分析工具？",
          paragraphs: ["公共頁面預設以 Consent Mode 的 analytics_storage granted 載入 Google Analytics 4 Cookie 統計，並對所有訪客預設啟用詳細分析：Google Tag Manager 會隨頁面載入，GA4 會收到含查詢參數的完整 page_location 與 page_referrer，核准的自訂功能事件也會一併傳送。若你拒絕分析 Cookie，analytics_storage 會改為 denied，只保留無 Cookie 基礎測量，不再載入 Google Tag Manager，傳送給 GA4 的 page_location 也僅保留移除查詢參數的網域與頁面路徑、page_referrer 留空。為建立 HTTPS 連線、提供頁面及推導粗略地區，Cloudflare 與 Google 仍可能在傳輸或處理期間短暫接觸連線 IP；依 Google 的 GA4 說明，個別 IP 不會被記錄或保存。", "在預設啟用的詳細分析（第 2 版條款）下，本站會把頁面路徑與功能操作保存為最長 30 天的假名化使用歷程。記錄可包含加密保存的連線 IP、隨機訪客與 Session 識別碼的伺服器端 HMAC、國家、粗略裝置／瀏覽器／作業系統類別，以及白名單內的 utm_source、utm_medium、utm_campaign。本站不保存完整 User-Agent、參照網址、完整查詢字串、網址 Fragment、姓名或登入帳號；加密 IP 只會在受保護的管理介面按需要解密顯示。過期記錄會在後續收件時清理。"],
          links: [{ href: "https://policies.google.com/privacy", label: "Google 隱私權政策" }],
        },
        {
          title: "提交更正時會保存什麼？",
          paragraphs: ["提交站內回報時，資料庫會保存問題類型、說明、頁面與語言脈絡、選填證據連結、選填聯絡方式及時間戳。API 會為防止濫用建立限流用的雜湊識別；本站應用程式不在回報資料表保存原始 IP。資料會按編輯審核需要保留，目前不承諾固定刪除期限。"],
        },
        {
          title: "外部連結與你的選擇",
          paragraphs: ["詳細分析對所有訪客預設啟用，無需任何操作；你可隨時使用頁面左下角的「分析偏好」拒絕分析 Cookie。拒絕時，本站會以本機訪客識別碼要求刪除仍在 30 天保留期內的假名化歷程及其中的加密 IP，並清除該識別碼；每日彙總無法再連回個別訪客。拒絕後 analytics_storage 會改為 denied，本站會清除可存取的 GA Cookie，只保留無 Cookie 測量，也不再把詳細 IP 或個人使用歷程寫入資料庫。前往 NC、Steam、Google 或其他外部網站後，資料處理由對方政策規範。你也可以在瀏覽器中清除 Cookie 與本機儲存，並在更正表單中留空選填聯絡資訊。"],
        },
      ],
    },
    terms: {
      eyebrow: "使用條款",
      title: "使用條款",
      description: "AION2 KINA 使用條款：涵蓋非官方身份、資料準確性、允許使用、外部連結、商標與玩家責任。",
      intro: "使用 AION2 KINA 代表你理解本站是獨立、非官方的玩家資料站。即時遊戲資料、活動狀態與服務規則，應以目前遊戲客戶端及相關 NC 官方公告為準。",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "發布",
      updatedLabel: "更新",
      sections: [
        {
          title: "資料可以如何使用？",
          paragraphs: ["本站內容用於一般資訊、攻略整理與玩家規劃，不構成官方承諾。版本更新可能改變數值、價格、機率、掉落、活動與可用性；在遊戲內採取行動前請再次核對。"],
        },
        {
          title: "哪些行為不被允許？",
          paragraphs: ["不得破壞服務、繞過安全措施、濫用回報表單、提交惡意程式或以自動化方式造成不合理負載。不得利用本站冒充 NC、索取玩家憑證或進行未授權交易。"],
        },
        {
          title: "商標、素材與外部連結歸誰？",
          paragraphs: ["AION2 名稱、標誌及官方素材的權利屬 NC Corporation 或相應權利人。外部網站與其內容受各自條款和政策約束；連結不代表 KINA 對第三方服務作出背書。"],
        },
        {
          title: "本站提供帳號或交易服務嗎？",
          paragraphs: ["不提供。AION2 KINA 不出售遊戲帳號、虛擬物品或代儲服務，也不處理付款、退款或官方客服案件。"],
        },
      ],
    },
  },
  en: {
    about: {
      eyebrow: "ABOUT / EDITORIAL POLICY",
      title: "About AION2 KINA",
      description: "Learn how AION2 KINA publishes editorial content in 10 languages, verifies sources, identifies its editor, and handles corrections.",
      intro: "AION2 KINA is an independent fan resource for AION2 players worldwide. It publishes guides, news, class comparisons, and player tools in 10 languages, alongside an interactive map and item data. It is not affiliated with, partnered with, or endorsed by NC Corporation.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "Published",
      updatedLabel: "Updated",
      sections: [
        {
          title: "What does AION2 KINA provide?",
          paragraphs: ["The site publishes guides, class references, crafting calculators, daily and weekly checklists, redeem codes, and news in a 10-language structure. Each language has a separate, indexable URL, while the map and item database are also integrated into the site."],
        },
        {
          title: "How do we verify content?",
          paragraphs: ["Item identity, icons, grades, and similar fields are checked against NC's official data; affected pages label the source language or fallback. Interactive-map markers are curated by AION2 KINA editors from player reports and reviewed in game. NC materials are used only to cross-check names, rules, and scope that they actually confirm. Editorial assessments, tool calculations, and community findings are labelled separately."],
          links: [{ href: "/database/map-data-methodology/", label: "Read the data-source and map methodology" }],
        },
        {
          title: "Who edits this site?",
          paragraphs: ["Content is signed by PFG, the site's public author pen name. PFG organizes the material, checks cited sources, and maintains updates. The profile illustration is an identifying avatar, not a real photograph, and does not imply NC affiliation or unverified expert credentials. Pages distinguish editorial assessments from official findings."],
        },
        {
          title: "How can I submit a correction?",
          paragraphs: ["Use the site correction form to report outdated information, translation problems, broken sources, or factual errors. PFG checks publicly verifiable evidence before changing a public page."],
          links: [{ href: "/contact/", label: "Open Contact & Corrections" }],
        },
      ],
    },
    contact: {
      eyebrow: "CONTACT / CORRECTIONS",
      title: "Contact & Corrections",
      description: "Use the AION2 KINA form to report outdated or incorrect data, translation issues, broken sources, rights concerns, or site problems.",
      intro: "The on-site report form is AION2 KINA's current public contact channel. Use it for outdated or incorrect information, translation issues, broken sources, rights concerns, and site problems. Do not submit game-account credentials, passwords, one-time codes, or payment information.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "Published",
      updatedLabel: "Updated",
      contactAction: "Open the contact and correction form",
      sections: [
        {
          title: "What can I report?",
          paragraphs: ["You can report outdated content, factual errors, missing material, translation problems, broken source links, media-rights concerns, and other site issues. When possible, include a public official notice or another verifiable evidence link."],
        },
        {
          title: "What does the form collect?",
          paragraphs: ["The form attaches the current page, language, and data scope. It stores your issue description plus an optional evidence URL and optional contact detail. Contact details are used only to review that report and are not displayed publicly."],
        },
        {
          title: "What about account or billing support?",
          paragraphs: ["AION2 KINA does not provide game-account, payment, refund, or customer-support services. Use the official NC support channel for the service region where you play."],
          links: [{ href: "https://aion2.plaync.com/en-us/conts/teaser", label: "Open the AION 2 official global site" }],
        },
      ],
    },
    privacy: {
      eyebrow: "PRIVACY",
      title: "Privacy Policy",
      description: "AION2 KINA's privacy policy explains analytics, browser storage, the language cookie, correction reports, and third-party links.",
      intro: "AION2 KINA does not require a visitor account. The site processes only the limited data needed to provide features, understand site use, and review correction reports.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "Published",
      updatedLabel: "Updated",
      sections: [
        {
          title: "What stays in my browser?",
          paragraphs: ["Google Analytics 4 analytics cookies are enabled by default on public pages; a separate language-preference cookie lasts for one year. Faction theme, checklist completion, map progress, favourites, class-finder answers, and calculator state may use local browser storage. KINA does not automatically upload that device-local state."],
        },
        {
          title: "How does the site use analytics?",
          paragraphs: ["Public pages load Google Analytics 4 cookie-based measurement with Consent Mode analytics_storage granted, and detailed analytics are enabled by default for every visitor: Google Tag Manager loads with the page, GA4 receives the full page_location including query parameters together with the page_referrer, and approved custom feature events are sent. If you reject analytics cookies, analytics_storage changes to denied, only cookieless basic measurement remains, Google Tag Manager no longer loads, and GA4 receives a page_location limited to the origin and page path without query parameters with an empty page_referrer. Cloudflare and Google may still handle the connection IP briefly while establishing HTTPS connections, serving the page, or deriving an approximate region. Google states that GA4 does not log or store individual IP addresses.", "Under the default detailed-analytics mode (version 2 terms), KINA retains page paths and feature actions as a pseudonymous journey for up to 30 days. A record can include the connection IP encrypted at rest, server-side HMACs of random visitor and session IDs, country, coarse device/browser/operating-system categories, and allowlisted utm_source, utm_medium, and utm_campaign values. KINA does not retain full user-agent strings, referrer URLs, complete query strings, URL fragments, names, or signed-in accounts. The encrypted IP is decrypted only when needed in the protected admin console, and expired records are removed during later ingestion."],
          links: [{ href: "https://policies.google.com/privacy", label: "Read Google's Privacy Policy" }],
        },
        {
          title: "What is stored when I submit a correction?",
          paragraphs: ["A correction report stores its category, message, page and language context, optional evidence URL, optional contact detail, and timestamp. The API creates a hashed identifier for abuse rate-limiting; the report table does not store the raw IP address. Reports are retained as needed for editorial review, and no fixed deletion period is currently promised."],
        },
        {
          title: "What choices do I have?",
          paragraphs: ["Detailed analytics are enabled by default and require no action; you can use the Analytics choices control at the lower-left of a page at any time to reject analytics cookies. When you reject, KINA uses the device-local visitor ID to request deletion of pseudonymous journey records and their encrypted IP values still inside the 30-day retention window, then clears that ID. Daily totals can no longer be connected to an individual visitor. Rejecting analytics cookies changes analytics_storage to denied, clears accessible GA cookies, leaves only cookieless measurement, and stops writing the detailed IP or personal journey to the database. NC, Steam, Google, and other external sites apply their own policies after you follow a link. You can also clear cookies and local storage, and leave the optional report-contact field blank."],
        },
      ],
    },
    terms: {
      eyebrow: "TERMS",
      title: "Terms of Use",
      description: "AION2 KINA's terms cover its unofficial status, information accuracy, acceptable use, external links, trademarks, and player responsibility.",
      intro: "By using AION2 KINA, you understand that it is an independent, unofficial player resource. Treat the current game client and the relevant NC official notices as authoritative for live game data, event status, and service rules.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "Published",
      updatedLabel: "Updated",
      sections: [
        {
          title: "How may I use the information?",
          paragraphs: ["The site provides general information, guide summaries, and planning tools rather than official promises. Updates can change values, prices, probabilities, drops, events, and availability. Recheck live information before acting in game."],
        },
        {
          title: "What use is prohibited?",
          paragraphs: ["Do not disrupt the service, bypass security controls, abuse the report form, submit malicious material, or create unreasonable automated load. Do not use KINA to impersonate NC, solicit player credentials, or conduct unauthorized transactions."],
        },
        {
          title: "Who owns the marks and linked material?",
          paragraphs: ["AION2 names, marks, and official media belong to NC Corporation or their respective rights holders. External sites and content follow their own terms and policies. A link does not mean KINA endorses a third-party service."],
        },
        {
          title: "Does this site provide accounts or transactions?",
          paragraphs: ["No. AION2 KINA does not sell game accounts, virtual goods, or top-up services, and it does not process payments, refunds, or official support cases."],
        },
      ],
    },
  },
  ko: {
    about: {
      eyebrow: "사이트 소개／편집 원칙",
      title: "AION2 KINA 소개",
      description: "AION2 KINA가 편집 콘텐츠를 10개 언어로 발행하는 방식, 출처 검증, 편집 주체와 정정 절차를 안내합니다.",
      intro: "AION2 KINA는 전 세계 AION2 플레이어를 위한 독립 팬 자료 사이트입니다. 공략, 뉴스, 직업 비교와 플레이어 도구를 10개 언어로 발행하고 인터랙티브 지도와 아이템 데이터도 제공합니다. NC Corporation과 제휴·협력 관계가 아니며 보증을 받지 않습니다.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "게시",
      updatedLabel: "업데이트",
      sections: [
        {
          title: "AION2 KINA는 무엇을 제공하나요?",
          paragraphs: ["공략, 직업 자료, 제작 계산기, 일일·주간 체크리스트, 쿠폰과 뉴스를 10개 언어 구조로 발행합니다. 각 언어에는 별도의 색인 가능한 URL이 있으며 지도와 아이템 데이터도 같은 사이트에 제공됩니다."],
        },
        {
          title: "콘텐츠는 어떻게 확인하나요?",
          paragraphs: ["아이템의 식별 정보, 아이콘, 등급 등은 NC 공식 데이터와 대조하며, 해당 페이지에는 원문 언어나 대체 언어 사용 여부를 표시합니다. 인터랙티브 지도 포인트는 AION2 KINA 편집자가 플레이어 제보를 바탕으로 정리하고 게임 안에서 재확인합니다. NC 공식 자료는 실제로 확인 가능한 명칭, 규칙과 범위를 교차 검증하는 용도로만 사용합니다. 편집 평가, 도구 계산과 커뮤니티 발견은 별도로 표시합니다."],
          links: [{ href: "/database/map-data-methodology/", label: "데이터 출처와 지도 방법론 보기" }],
        },
        {
          title: "누가 사이트를 편집하나요?",
          paragraphs: ["콘텐츠는 사이트의 공개 필명인 PFG가 작성자로 서명합니다. PFG는 자료 정리, 출처 확인과 업데이트 관리를 담당합니다. 프로필 이미지는 식별용 일러스트이며 실제 사진이 아니고 NC 소속이나 확인되지 않은 전문가 자격을 의미하지 않습니다. 편집 판단과 공식 결론은 페이지에서 구분합니다."],
        },
        {
          title: "정정은 어떻게 제보하나요?",
          paragraphs: ["오래된 정보, 번역 문제, 끊어진 출처 또는 사실 오류는 사이트 정정 양식으로 알려 주세요. PFG는 공개 페이지를 변경하기 전에 공개적으로 확인 가능한 근거를 검토합니다."],
          links: [{ href: "/contact/", label: "문의 및 정정 페이지 열기" }],
        },
      ],
    },
    contact: {
      eyebrow: "문의／수정",
      title: "문의 및 정정",
      description: "AION2 KINA 양식으로 오래되거나 잘못된 데이터, 번역 문제, 출처 오류, 권리 우려 또는 사이트 문제를 신고하세요.",
      intro: "사이트 내 신고 양식은 AION2 KINA의 현재 공개 연락 채널입니다. 오래되거나 잘못된 정보, 번역 문제, 출처 오류, 권리 우려와 사이트 문제를 제보할 수 있습니다. 게임 계정 정보, 비밀번호, 일회용 코드 또는 결제 정보는 제출하지 마세요.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "게시",
      updatedLabel: "업데이트",
      contactAction: "문의 및 정정 양식 열기",
      sections: [
        {
          title: "어떤 문제를 신고할 수 있나요?",
          paragraphs: ["오래된 콘텐츠, 사실 오류, 누락된 자료, 번역 문제, 끊어진 출처 링크, 미디어 권리 우려와 기타 사이트 문제를 신고할 수 있습니다. 가능하면 공개 확인이 가능한 공식 공지나 근거 링크를 포함해 주세요."],
        },
        {
          title: "양식은 무엇을 수집하나요?",
          paragraphs: ["양식에는 현재 페이지, 언어와 데이터 범위가 첨부됩니다. 문제 설명과 선택 사항인 근거 URL 및 연락처를 저장합니다. 연락처는 해당 신고를 검토할 때만 사용하고 공개하지 않습니다."],
        },
        {
          title: "계정이나 결제 지원은 어디서 받나요?",
          paragraphs: ["AION2 KINA는 게임 계정, 결제, 환불 또는 고객지원 서비스를 제공하지 않습니다. 플레이 중인 서비스 지역의 NC 공식 지원 채널을 이용하세요."],
          links: [{ href: "https://aion2.plaync.com/ko-kr", label: "AION2 한국 공식 사이트 열기" }],
        },
      ],
    },
    privacy: {
      eyebrow: "개인정보",
      title: "개인정보처리방침",
      description: "AION2 KINA 개인정보처리방침은 분석, 브라우저 저장소, 언어 쿠키, 정정 신고와 외부 링크의 데이터 처리를 설명합니다.",
      intro: "AION2 KINA는 방문자 계정 등록을 요구하지 않습니다. 기능 제공, 사이트 이용 분석과 정정 신고 검토에 필요한 제한된 데이터만 처리합니다.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "게시",
      updatedLabel: "업데이트",
      sections: [
        {
          title: "브라우저에는 무엇이 저장되나요?",
          paragraphs: ["공개 페이지에서는 Google Analytics 4 분석 쿠키가 기본으로 활성화되며, 별도의 언어 기본 설정 쿠키는 1년 동안 유지됩니다. 종족 테마, 체크리스트 완료, 지도 진행, 즐겨찾기, 직업 찾기 답변과 계산기 상태는 브라우저 로컬 저장소를 사용할 수 있습니다. KINA는 이 기기 내 상태를 자동 업로드하지 않습니다."],
        },
        {
          title: "분석 도구는 어떻게 사용하나요?",
          paragraphs: ["공개 페이지는 Consent Mode의 analytics_storage granted 상태로 Google Analytics 4 쿠키 측정을 불러오고 모든 방문자에게 상세 분석을 기본으로 사용합니다. Google Tag Manager가 페이지와 함께 로드되고, GA4는 쿼리 매개변수를 포함한 전체 page_location과 page_referrer를 수신하며 승인된 맞춤 기능 이벤트가 전송됩니다. 분석 쿠키를 거부하면 analytics_storage가 denied로 바뀌고 쿠키 없는 기본 측정만 남으며, Google Tag Manager를 더 이상 불러오지 않고 GA4의 page_location도 쿼리 매개변수를 제거한 출처와 페이지 경로만 사용하고 page_referrer는 비웁니다. HTTPS 연결, 페이지 제공 및 대략적인 지역 판정을 위해 Cloudflare와 Google이 전송·처리 과정에서 접속 IP를 일시적으로 처리할 수 있으며, Google은 GA4가 개별 IP 주소를 기록하거나 저장하지 않는다고 설명합니다.", "기본으로 사용되는 상세 분석(제2판 약관 기준)에서 KINA는 페이지 경로와 기능 동작을 최대 30일 동안 가명 처리된 이용 흐름으로 보관합니다. 저장 항목에는 암호화된 접속 IP, 임의 방문자·세션 ID의 서버 측 HMAC, 국가, 대략적인 기기·브라우저·운영체제 유형, 허용된 utm_source·utm_medium·utm_campaign 값이 포함될 수 있습니다. 전체 User-Agent, 참조 URL, 전체 쿼리 문자열, URL Fragment, 이름 또는 로그인 계정은 보관하지 않습니다. 암호화된 IP는 보호된 관리자 화면에서 필요한 경우에만 복호화해 표시하며 만료 기록은 이후 수집 시 삭제합니다."],
          links: [{ href: "https://policies.google.com/privacy", label: "Google 개인정보처리방침 보기" }],
        },
        {
          title: "정정 신고를 보내면 무엇이 저장되나요?",
          paragraphs: ["신고 유형, 설명, 페이지와 언어 맥락, 선택 사항인 근거 URL과 연락처, 타임스탬프가 저장됩니다. API는 남용 제한을 위해 해시 식별자를 만들며 신고 테이블에 원본 IP 주소를 저장하지 않습니다. 신고는 편집 검토에 필요한 동안 보관하며 현재 고정 삭제 기간을 약속하지 않습니다."],
        },
        {
          title: "어떤 선택을 할 수 있나요?",
          paragraphs: ["상세 분석은 기본으로 활성화되어 있으며 별도의 조치가 필요하지 않습니다. 언제든지 페이지 왼쪽 아래의 ‘분석 설정’에서 분석 쿠키를 거부할 수 있습니다. 거부하면 KINA는 기기 내 방문자 ID로 30일 보관 기간 안의 가명 처리된 이용 흐름과 암호화된 IP 삭제를 요청한 뒤 해당 ID를 지웁니다. 일일 집계는 개별 방문자에게 다시 연결할 수 없습니다. 분석 쿠키를 거부하면 analytics_storage가 denied로 바뀌고 접근 가능한 GA 쿠키를 지운 뒤 쿠키 없는 측정만 유지하며, 상세 IP나 개인 이용 흐름을 더 이상 데이터베이스에 저장하지 않습니다. NC, Steam, Google과 기타 외부 사이트는 링크 이동 후 각자의 정책을 적용합니다. 브라우저의 쿠키와 로컬 저장소를 지우거나 신고 시 선택 연락처를 비워 둘 수도 있습니다."],
        },
      ],
    },
    terms: {
      eyebrow: "이용약관",
      title: "이용약관",
      description: "AION2 KINA 이용약관은 비공식 정체성, 정보 정확성, 허용 사용, 외부 링크, 상표와 플레이어 책임을 설명합니다.",
      intro: "AION2 KINA는 독립 비공식 플레이어 자료입니다. 실시간 게임 데이터, 이벤트 상태와 서비스 규칙은 현재 게임 클라이언트와 해당 NC 공식 공지를 우선하세요.",
      byline: PFG_AUTHOR_NAME,
      publishedLabel: "게시",
      updatedLabel: "업데이트",
      sections: [
        {
          title: "정보를 어떻게 사용할 수 있나요?",
          paragraphs: ["사이트는 공식 약속이 아닌 일반 정보, 공략 요약과 계획 도구를 제공합니다. 업데이트로 수치, 가격, 확률, 드롭, 이벤트와 이용 가능성이 바뀔 수 있으므로 게임 내 행동 전에 다시 확인하세요."],
        },
        {
          title: "어떤 이용이 금지되나요?",
          paragraphs: ["서비스 방해, 보안 통제 우회, 신고 양식 남용, 악성 자료 제출 또는 과도한 자동 요청을 금지합니다. KINA를 이용해 NC를 사칭하거나 플레이어 인증 정보를 요구하거나 승인되지 않은 거래를 해서는 안 됩니다."],
        },
        {
          title: "상표와 외부 자료의 권리는 누구에게 있나요?",
          paragraphs: ["AION2 이름, 표장과 공식 미디어의 권리는 NC Corporation 또는 각 권리자에게 있습니다. 외부 사이트와 콘텐츠는 각자의 약관과 정책을 따르며 링크가 KINA의 제3자 서비스 보증을 의미하지 않습니다."],
        },
        {
          title: "계정이나 거래 서비스를 제공하나요?",
          paragraphs: ["제공하지 않습니다. AION2 KINA는 게임 계정, 가상 아이템 또는 충전 서비스를 판매하지 않으며 결제, 환불 또는 공식 고객지원 건을 처리하지 않습니다."],
        },
      ],
    },
  },
};

type GlobalTrustLocale = Exclude<SiteLocale, "zh-hant" | "en" | "ko">;

const globalTrustPageCopy: Record<
  GlobalTrustLocale,
  Record<TrustPageKind, TrustPageCopy>
> = {
  "zh-hans": {
    about: {
      eyebrow: "关于本站 / 编辑原则",
      title: "关于 AION2 KINA",
      description: "了解 AION2 KINA 如何用 10 种语言发布攻略、新闻和工具，核对资料、标明作者并处理更正。物品身份、图标与品级对照 NC 官方数据；地图点位由编辑整理、玩家回报并在游戏内复核。页面也说明独立站身份、编辑责任、更新日期与公开更正入口，方便玩家核对版本和适用范围。",
      intro: "AION2 KINA 是面向全球 AION2 玩家的独立资料站，用 10 种语言发布攻略、新闻、职业对比和玩家工具，并提供互动地图与物品资料。本站与 NC Corporation 没有隶属、合作或背书关系。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "发布", updatedLabel: "更新",
      sections: [
        { title: "本站提供哪些内容？", paragraphs: ["本站用 10 种语言发布攻略、职业资料、制作计算器、清单、兑换码和新闻，每种语言都有独立且可索引的网址；互动地图和物品资料也整合在站内。"] },
        { title: "如何核对资料？", paragraphs: ["物品身份、图标与品级等字段会对照 NC 官方数据，相关页面会注明来源语言或回退状态。互动地图点位由 AION2 KINA 编辑整理、参考玩家回报并在游戏内复核；NC 官方资料仅用于校对其确实确认的名称、规则与范围。编辑判断、工具计算和社区发现会明确区分。"], links: [{ href: "/database/map-data-methodology/", label: "查看资料来源与地图方法" }] },
        { title: "谁负责编辑？", paragraphs: ["内容由网站作者 PFG 署名。PFG 是公开使用的作者笔名，负责整理来源、核对内容与维护更新；作者头像是识别用插画，不是真人照片，也不代表官方身份。"] },
        { title: "如何提交更正？", paragraphs: ["发现过期资料、翻译问题、失效来源或错误内容时，可使用站内更正表单并附上可公开核对的证据。"], links: [{ href: "/contact/", label: "前往联系与更正" }] },
      ],
    },
    contact: {
      eyebrow: "联系 / 更正",
      title: "联系与内容更正",
      description: "通过 AION2 KINA 站内表单反馈过期或错误资料、翻译问题、失效来源、素材权利疑虑与网站故障。可附公开证据链接和选填联系方式；请勿提交游戏账号、密码、验证码或付款资料，账号与付款问题请联系所在地区的 NC 官方支持。",
      intro: "公开联系渠道为站内反馈表单。请勿提交游戏账号、密码、验证码或付款资料。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "发布", updatedLabel: "更新", contactAction: "打开联系与更正表单",
      sections: [
        { title: "可以反馈哪些问题？", paragraphs: ["可反馈资料过期、事实错误、重要内容缺失、翻译问题、来源链接失效、素材权利疑虑或网站故障。"] },
        { title: "表单会保存什么？", paragraphs: ["表单会保存你填写的问题说明，以及选填的证据链接和联系方式，并附上当前页面与语言。联系方式不会公开显示。"] },
        { title: "账号或付款问题怎么办？", paragraphs: ["AION2 KINA 不提供游戏账号、付款、退款或官方客服服务，请联系所在地区的 NC 官方支持。"], links: [{ href: "https://aion2.plaync.com/", label: "前往 AION2 官方网站" }] },
      ],
    },
    privacy: {
      eyebrow: "隐私",
      title: "隐私政策",
      description: "了解 AION2 KINA 如何使用 Google Analytics 4、分析 Cookie、语言 Cookie 与浏览器本地存储，以及更正反馈、加密 IP、数据保留、删除选择和外部链接的处理方式。本站不要求访客注册账号，也可通过页面设置调整分析偏好。",
      intro: "本站不要求访客注册账号，仅处理提供功能、分析使用情况和审核更正反馈所需的有限资料。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "发布", updatedLabel: "更新",
      sections: [
        { title: "浏览器会保存哪些资料？", paragraphs: ["公共页面默认启用 GA4 统计与分析 Cookie；语言偏好会保存在 Cookie 中。主题、清单、地图进度、收藏、问卷与计算器状态可能保存在浏览器本地，不会由 KINA 自动上传。"] },
        { title: "分析工具如何工作？", paragraphs: ["详细分析默认启用，可包含页面路径、功能操作、加密保存的连接 IP、随机访客与会话标识的服务器端 HMAC、国家和粗略设备类别，最长保留 30 天。本站不保存完整 User-Agent、完整参照网址、完整查询字符串、姓名或登录账号。拒绝分析 Cookie 后只保留无 Cookie 基础测量，并停止写入详细历程。"], links: [{ href: "https://policies.google.com/privacy", label: "Google 隐私政策" }] },
        { title: "提交更正时会保存什么？", paragraphs: ["反馈会保存问题类型、说明、页面与语言、选填证据链接、选填联系方式和时间戳。API 会使用哈希标识限制滥用，反馈表不会保存原始 IP。"] },
        { title: "我有哪些选择？", paragraphs: ["可随时通过页面左下角的分析偏好拒绝分析 Cookie，也可清除浏览器 Cookie 与本地存储，并在反馈表中不填写联系方式。"] },
      ],
    },
    terms: {
      eyebrow: "使用条款",
      title: "使用条款",
      description: "阅读 AION2 KINA 的使用条款，包括独立非官方身份、资料准确性与版本变化、允许及禁止行为、外部链接、AION2 商标与官方素材权利，以及玩家核对信息的责任。本站不销售账号、虚拟物品或充值服务，也不处理付款、退款或官方客服事项。",
      intro: "使用本站即表示你理解 AION2 KINA 是独立的非官方玩家资源。即时游戏数据、活动状态与服务规则应以游戏客户端和 NC 官方公告为准。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "发布", updatedLabel: "更新",
      sections: [
        { title: "如何使用本站资料？", paragraphs: ["本站提供一般资讯、攻略摘要和规划工具，不构成官方承诺。版本更新可能改变数值、掉落、活动和可用性，请在游戏内重新确认。"] },
        { title: "哪些行为不被允许？", paragraphs: ["不得破坏服务、绕过安全措施、滥用反馈表单、提交恶意内容、制造不合理的自动化负载或冒充 NC。"] },
        { title: "商标和外部内容属于谁？", paragraphs: ["AION2 名称、商标与官方素材属于 NC Corporation 或各权利人。外部网站适用其自身条款，链接不代表本站为其背书。"] },
        { title: "本站是否提供交易或账号服务？", paragraphs: ["不提供。本站不销售游戏账号、虚拟物品或充值服务，也不处理付款、退款或官方客服事项。"] },
      ],
    },
  },
  fr: {
    about: {
      eyebrow: "À PROPOS / PRINCIPES ÉDITORIAUX",
      title: "À propos d’AION2 KINA",
      description: "Découvrez comment AION2 KINA publie ses contenus éditoriaux en 10 langues, vérifie ses sources, identifie son auteur et traite les corrections.",
      intro: "AION2 KINA est une ressource indépendante pour les joueurs d’AION2. Le site publie guides, actualités, comparatifs de classes et outils en 10 langues, avec une carte interactive et des données d’objets. Il n’est ni affilié à NC Corporation ni soutenu par elle.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publié", updatedLabel: "Mis à jour",
      sections: [
        { title: "Que propose AION2 KINA ?", paragraphs: ["Guides, classes, calculateurs de fabrication, checklists, codes et actualités sont publiés dans une structure en 10 langues, chacune avec sa propre URL indexable. La carte et la base d’objets sont également intégrées au site."] },
        { title: "Comment les informations sont-elles vérifiées ?", paragraphs: ["L’identité, l’icône, la qualité et les champs similaires des objets sont vérifiés par rapport aux données officielles de NC ; les pages concernées indiquent la langue source ou de repli. Les points de la carte interactive sont sélectionnés par la rédaction d’AION2 KINA à partir des signalements de joueurs, puis vérifiés en jeu. Les documents officiels de NC servent uniquement à recouper les noms, règles et périmètres qu’ils confirment effectivement. Les analyses éditoriales, calculs et découvertes communautaires sont distingués."], links: [{ href: "/database/map-data-methodology/", label: "Voir la méthode et les sources" }] },
        { title: "Qui édite le site ?", paragraphs: ["Les contenus sont signés PFG, nom d’auteur public chargé des sources et des mises à jour. L’avatar est une illustration d’identification, pas une photo ni une preuve de statut officiel."] },
        { title: "Comment demander une correction ?", paragraphs: ["Signalez une donnée obsolète, une traduction, une source cassée ou une erreur avec, si possible, une preuve publique."], links: [{ href: "/contact/", label: "Contacter la rédaction" }] },
      ],
    },
    contact: {
      eyebrow: "CONTACT / CORRECTIONS", title: "Contact et corrections",
      description: "Signalez une information erronée ou obsolète, un problème de traduction, une source cassée ou un dysfonctionnement.",
      intro: "Le formulaire interne est le canal public de contact. N’envoyez jamais identifiant de jeu, mot de passe, code de vérification ou donnée de paiement.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publié", updatedLabel: "Mis à jour", contactAction: "Ouvrir le formulaire de correction",
      sections: [
        { title: "Que puis-je signaler ?", paragraphs: ["Informations obsolètes ou incorrectes, contenu manquant, traduction, lien source, droits sur un média ou problème technique."] },
        { title: "Quelles données sont enregistrées ?", paragraphs: ["Le formulaire joint la page et la langue, puis conserve votre message ainsi que le lien de preuve et le contact facultatifs. Le contact n’est pas affiché publiquement."] },
        { title: "Compte ou paiement ?", paragraphs: ["KINA ne gère ni comptes, ni paiements, ni remboursements. Contactez l’assistance officielle NC de votre région."], links: [{ href: "https://aion2.plaync.com/", label: "Site officiel AION2" }] },
      ],
    },
    privacy: {
      eyebrow: "CONFIDENTIALITÉ", title: "Politique de confidentialité",
      description: "Découvrez comment AION2 KINA utilise les statistiques, le stockage local, le cookie de langue, les signalements, le consentement et les liens externes.",
      intro: "Aucun compte visiteur n’est requis. Le site traite uniquement les données nécessaires à ses fonctions, à la mesure d’audience et aux corrections.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publié", updatedLabel: "Mis à jour",
      sections: [
        { title: "Que conserve le navigateur ?", paragraphs: ["Les statistiques GA4 sont activées par défaut et la langue est mémorisée par cookie. Thème, checklist, progression de carte, favoris, questionnaire et calculateur peuvent rester en stockage local sans envoi automatique à KINA."] },
        { title: "Comment fonctionne l’analyse ?", paragraphs: ["L’analyse détaillée activée par défaut peut conserver pendant 30 jours les parcours pseudonymisés, l’IP chiffrée, des HMAC d’identifiants aléatoires, le pays et des catégories techniques générales. Aucun nom, compte connecté, User-Agent complet ni requête complète n’est conservé. Un refus arrête ce journal détaillé et maintient seulement une mesure sans cookie."], links: [{ href: "https://policies.google.com/privacy", label: "Règles de confidentialité de Google" }] },
        { title: "Que conserve un signalement ?", paragraphs: ["Catégorie, message, page, langue, preuve et contact facultatifs, ainsi que l’horodatage. Un identifiant haché sert à limiter les abus ; l’IP brute n’est pas stockée dans la table des signalements."] },
        { title: "Quels sont mes choix ?", paragraphs: ["Le bouton de préférences d’analyse permet de refuser les cookies. Vous pouvez aussi effacer cookies et stockage local et laisser le contact vide."] },
      ],
    },
    terms: {
      eyebrow: "CONDITIONS", title: "Conditions d’utilisation",
      description: "Consultez le statut non officiel d’AION2 KINA, les règles d’exactitude et d’usage, les liens externes, les marques ainsi que la responsabilité du joueur.",
      intro: "AION2 KINA est une ressource indépendante et non officielle. Le client de jeu et les annonces NC font autorité pour les données en direct et les règles du service.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publié", updatedLabel: "Mis à jour",
      sections: [
        { title: "Comment utiliser les informations ?", paragraphs: ["Les guides et outils ne sont pas des promesses officielles. Une mise à jour peut modifier valeurs, butin, événements ou disponibilité : vérifiez en jeu."] },
        { title: "Quels usages sont interdits ?", paragraphs: ["Ne perturbez pas le service, ne contournez pas sa sécurité, n’abusez pas du formulaire, n’envoyez pas de contenu malveillant et n’usurpez pas l’identité de NC."] },
        { title: "À qui appartiennent les marques ?", paragraphs: ["Les noms, marques et médias AION2 appartiennent à NC Corporation ou à leurs ayants droit. Les sites externes suivent leurs propres conditions."] },
        { title: "Le site propose-t-il des transactions ?", paragraphs: ["Non. KINA ne vend ni comptes, ni biens virtuels, ni recharge et ne traite ni paiement, ni remboursement, ni dossier d’assistance."] },
      ],
    },
  },
  de: {
    about: {
      eyebrow: "ÜBER UNS / REDAKTION", title: "Über AION2 KINA",
      description: "Erfahre, wie AION2 KINA redaktionelle Inhalte in 10 Sprachen veröffentlicht, Quellen prüft, die Autorenschaft ausweist und Korrekturen bearbeitet.",
      intro: "AION2 KINA ist eine unabhängige Ressource für AION2-Spieler. Guides, News, Klassenvergleiche und Tools erscheinen in 10 Sprachen; hinzu kommen eine interaktive Karte und Gegenstandsdaten. Es besteht keine Zugehörigkeit zu oder Unterstützung durch NC Corporation.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Veröffentlicht", updatedLabel: "Aktualisiert",
      sections: [
        { title: "Was bietet AION2 KINA?", paragraphs: ["Guides, Klasseninfos, Herstellungsrechner, Checklisten, Codes und News erscheinen in einer Struktur mit 10 Sprachen und jeweils eigener indexierbarer URL. Karte und Gegenstandsdaten sind ebenfalls eingebunden."] },
        { title: "Wie werden Angaben geprüft?", paragraphs: ["Identität, Symbol, Qualitätsstufe und ähnliche Gegenstandsfelder werden mit offiziellen NC-Daten abgeglichen; betroffene Seiten kennzeichnen die Quell- oder Ersatzsprache. Die Punkte der interaktiven Karte werden von der AION2-KINA-Redaktion anhand von Spielerhinweisen zusammengestellt und im Spiel überprüft. Offizielle NC-Unterlagen dienen nur zum Abgleich der Namen, Regeln und Bereiche, die sie tatsächlich bestätigen. Redaktionelle Einschätzungen, Berechnungen und Community-Funde werden getrennt."], links: [{ href: "/database/map-data-methodology/", label: "Quellen und Datenmethode" }] },
        { title: "Wer bearbeitet die Inhalte?", paragraphs: ["PFG ist der öffentliche Autorenname für Quellenprüfung und Aktualisierung. Der Avatar ist eine Illustration und weder Foto noch Nachweis einer offiziellen Funktion."] },
        { title: "Wie melde ich eine Korrektur?", paragraphs: ["Melde veraltete Angaben, Übersetzungsfehler, defekte Quellen oder andere Fehler möglichst mit öffentlich prüfbarem Beleg."], links: [{ href: "/contact/", label: "Kontakt und Korrektur" }] },
      ],
    },
    contact: {
      eyebrow: "KONTAKT / KORREKTUREN", title: "Kontakt und Korrekturen",
      description: "Melde über das interne Formular veraltete oder falsche Informationen, Übersetzungsprobleme, defekte Quellen, mögliche Rechtefragen und technische Fehler.",
      intro: "Das interne Formular ist der öffentliche Kontaktweg. Sende keine Spielkonten, Passwörter, Prüfcodes oder Zahlungsdaten.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Veröffentlicht", updatedLabel: "Aktualisiert", contactAction: "Korrekturformular öffnen",
      sections: [
        { title: "Was kann gemeldet werden?", paragraphs: ["Veraltete oder falsche Inhalte, wichtige Lücken, Übersetzungen, Quellenlinks, Medienrechte und technische Probleme."] },
        { title: "Was speichert das Formular?", paragraphs: ["Seite und Sprache werden angehängt; gespeichert werden Nachricht sowie optionale Beleg-URL und Kontaktangabe. Der Kontakt wird nicht öffentlich angezeigt."] },
        { title: "Probleme mit Konto oder Zahlung?", paragraphs: ["KINA bietet keinen Konto-, Zahlungs-, Erstattungs- oder offiziellen Support. Nutze den NC-Support deiner Region."], links: [{ href: "https://aion2.plaync.com/", label: "Offizielle AION2-Website" }] },
      ],
    },
    privacy: {
      eyebrow: "DATENSCHUTZ", title: "Datenschutzerklärung",
      description: "Erfahre, wie AION2 KINA Analyse, lokalen Speicher, Sprach-Cookies, Korrekturmeldungen, Einwilligungsoptionen und externe Links verarbeitet.",
      intro: "Besucher benötigen kein Konto. Verarbeitet werden nur begrenzte Daten für Funktionen, Nutzungsanalyse und redaktionelle Korrekturen.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Veröffentlicht", updatedLabel: "Aktualisiert",
      sections: [
        { title: "Was speichert der Browser?", paragraphs: ["GA4-Analyse ist standardmäßig aktiviert; die Sprache wird per Cookie gespeichert. Thema, Checkliste, Kartenfortschritt, Favoriten, Fragebogen und Rechner können lokal bleiben und werden nicht automatisch an KINA übertragen."] },
        { title: "Wie funktioniert die Analyse?", paragraphs: ["Die standardmäßig aktive Detailanalyse kann pseudonymisierte Wege, verschlüsselte Verbindungs-IP, Server-HMACs zufälliger Kennungen, Land und grobe Technikklassen bis zu 30 Tage speichern. Namen, angemeldete Konten, vollständige User-Agents und vollständige Abfragen werden nicht gespeichert. Eine Ablehnung beendet die Detailprotokollierung und lässt nur cookielose Basismessung zu."], links: [{ href: "https://policies.google.com/privacy", label: "Google-Datenschutzerklärung" }] },
        { title: "Was wird bei einer Korrektur gespeichert?", paragraphs: ["Kategorie, Nachricht, Seite, Sprache, optionale Beleg-URL und Kontakt sowie Zeitstempel. Eine Hash-Kennung begrenzt Missbrauch; die rohe IP steht nicht in der Meldetabelle."] },
        { title: "Welche Wahl habe ich?", paragraphs: ["Über die Analyse-Einstellungen kannst du Cookies ablehnen. Cookies und lokalen Speicher kannst du zusätzlich löschen und das Kontaktfeld leer lassen."] },
      ],
    },
    terms: {
      eyebrow: "BEDINGUNGEN", title: "Nutzungsbedingungen",
      description: "Lies die Regeln zu nichtoffiziellem Status, Genauigkeit, erlaubter Nutzung, externen Links, Markenrechten und Verantwortung der Spieler.",
      intro: "AION2 KINA ist eine unabhängige, nichtoffizielle Spielerressource. Für Live-Daten und Serviceregeln gelten der Spielclient und offizielle NC-Mitteilungen.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Veröffentlicht", updatedLabel: "Aktualisiert",
      sections: [
        { title: "Wie darf ich die Inhalte nutzen?", paragraphs: ["Guides und Tools sind keine offiziellen Zusagen. Updates können Werte, Beute, Events und Verfügbarkeit ändern; prüfe aktuelle Daten im Spiel."] },
        { title: "Was ist untersagt?", paragraphs: ["Störe den Dienst nicht, umgehe keine Sicherheitsmaßnahmen, missbrauche das Formular nicht, sende nichts Schädliches und gib dich nicht als NC aus."] },
        { title: "Wem gehören Marken und Medien?", paragraphs: ["AION2-Namen, Marken und offizielle Medien gehören NC Corporation oder den jeweiligen Rechteinhabern. Externe Websites haben eigene Bedingungen."] },
        { title: "Bietet KINA Konten oder Transaktionen?", paragraphs: ["Nein. Es werden keine Konten, virtuellen Güter oder Aufladungen verkauft und keine Zahlungen, Erstattungen oder Supportfälle bearbeitet."] },
      ],
    },
  },
  es: {
    about: {
      eyebrow: "ACERCA DE / EDICIÓN", title: "Acerca de AION2 KINA",
      description: "Conoce cómo AION2 KINA publica contenido editorial en 10 idiomas, verifica sus fuentes, identifica la autoría y tramita correcciones.",
      intro: "AION2 KINA es un recurso independiente para jugadores de AION2. Publica guías, noticias, comparativas de clases y herramientas en 10 idiomas, además de ofrecer un mapa interactivo y datos de objetos. No está afiliado ni respaldado por NC Corporation.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Actualizado",
      sections: [
        { title: "¿Qué ofrece AION2 KINA?", paragraphs: ["Guías, clases, calculadoras de fabricación, listas, códigos y noticias se publican en una estructura de 10 idiomas, cada uno con su propia URL indexable. El mapa y la base de objetos también forman parte del sitio."] },
        { title: "¿Cómo verificamos la información?", paragraphs: ["La identidad, el icono, la calidad y otros campos de los objetos se contrastan con los datos oficiales de NC; las páginas afectadas indican el idioma de origen o de respaldo. Los puntos del mapa interactivo los recopila el equipo editorial de AION2 KINA a partir de reportes de jugadores y los verifica dentro del juego. Los materiales oficiales de NC solo se usan para cotejar los nombres, reglas y ámbitos que realmente confirman. Los análisis editoriales, cálculos y hallazgos de la comunidad se distinguen claramente."], links: [{ href: "/database/map-data-methodology/", label: "Ver fuentes y metodología" }] },
        { title: "¿Quién edita el sitio?", paragraphs: ["PFG es el nombre público del autor responsable de revisar fuentes y actualizar contenidos. El avatar es una ilustración identificativa, no una foto ni una acreditación oficial."] },
        { title: "¿Cómo envío una corrección?", paragraphs: ["Informa de datos obsoletos, traducciones, fuentes rotas o errores e incluye una prueba pública cuando sea posible."], links: [{ href: "/contact/", label: "Contacto y correcciones" }] },
      ],
    },
    contact: {
      eyebrow: "CONTACTO / CORRECCIONES", title: "Contacto y correcciones",
      description: "Informa mediante el formulario de AION2 KINA sobre datos incorrectos u obsoletos, traducciones, fuentes rotas, derechos de contenido o fallos técnicos.",
      intro: "El formulario interno es el canal público de contacto. No envíes cuentas, contraseñas, códigos de verificación ni datos de pago.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Actualizado", contactAction: "Abrir formulario de corrección",
      sections: [
        { title: "¿Qué puedo comunicar?", paragraphs: ["Contenido obsoleto o incorrecto, datos ausentes, traducciones, enlaces, derechos de material o problemas del sitio."] },
        { title: "¿Qué guarda el formulario?", paragraphs: ["Adjunta la página y el idioma, y guarda el mensaje, el enlace de prueba y el contacto opcionales. El contacto no se muestra públicamente."] },
        { title: "¿Problemas de cuenta o pago?", paragraphs: ["KINA no presta soporte de cuentas, pagos o reembolsos. Contacta con la asistencia oficial de NC de tu región."], links: [{ href: "https://aion2.plaync.com/", label: "Sitio oficial de AION2" }] },
      ],
    },
    privacy: {
      eyebrow: "PRIVACIDAD", title: "Política de privacidad",
      description: "Cómo usa AION2 KINA las analíticas, el almacenamiento local, la cookie de idioma, los informes y los enlaces externos.",
      intro: "No se exige una cuenta de visitante. Solo se procesan datos limitados para funciones, medición de uso y revisión de correcciones.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Actualizado",
      sections: [
        { title: "¿Qué guarda el navegador?", paragraphs: ["GA4 está activo por defecto y el idioma se conserva en una cookie. Tema, checklist, progreso del mapa, favoritos, cuestionario y calculadora pueden guardarse localmente sin envío automático a KINA."] },
        { title: "¿Cómo funciona la analítica?", paragraphs: ["El análisis detallado predeterminado puede conservar durante 30 días recorridos seudonimizados, IP cifrada, HMAC del servidor para identificadores aleatorios, país y categorías técnicas generales. No se guardan nombres, cuentas, User-Agent completo ni consultas completas. Al rechazarlo se detiene el historial detallado y queda medición básica sin cookies."], links: [{ href: "https://policies.google.com/privacy", label: "Política de privacidad de Google" }] },
        { title: "¿Qué guarda una corrección?", paragraphs: ["Categoría, mensaje, página, idioma, enlace de prueba y contacto opcionales y fecha. Un identificador hash limita abusos; la IP sin procesar no se guarda en la tabla."] },
        { title: "¿Qué opciones tengo?", paragraphs: ["Puedes rechazar cookies desde las preferencias de analítica, borrar cookies y almacenamiento local, y dejar vacío el contacto."] },
      ],
    },
    terms: {
      eyebrow: "CONDICIONES", title: "Condiciones de uso",
      description: "Consulta el carácter no oficial de AION2 KINA, las normas de exactitud y uso, los enlaces externos, las marcas y la responsabilidad del jugador.",
      intro: "AION2 KINA es un recurso independiente y no oficial. El cliente del juego y los avisos oficiales de NC prevalecen para datos en directo y reglas del servicio.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Actualizado",
      sections: [
        { title: "¿Cómo puedo usar la información?", paragraphs: ["Las guías y herramientas no son promesas oficiales. Las actualizaciones cambian valores, botín, eventos y disponibilidad; vuelve a comprobarlo en el juego."] },
        { title: "¿Qué uso está prohibido?", paragraphs: ["No interrumpas el servicio, eludas la seguridad, abuses del formulario, envíes material dañino ni suplantes a NC."] },
        { title: "¿Quién posee las marcas?", paragraphs: ["Los nombres, marcas y medios oficiales de AION2 pertenecen a NC Corporation o a sus titulares. Los sitios externos tienen sus propias condiciones."] },
        { title: "¿Ofrece KINA transacciones?", paragraphs: ["No. No vende cuentas, bienes virtuales ni recargas y no procesa pagos, reembolsos ni casos de soporte oficial."] },
      ],
    },
  },
  ja: {
    about: {
      eyebrow: "このサイトについて / 編集方針", title: "AION2 KINA について",
      description: "AION2 KINA が 10 言語で情報を公開し、出典、執筆者、訂正を管理する方針を説明します。アイテム情報は NC 公式データと照合し、マップ地点は編集部とプレイヤー報告をもとにゲーム内で確認します。公開日、更新日、適用範囲、訂正窓口も明記し、更新後に再確認できるようにしています。",
      intro: "AION2 KINA は、AION2 プレイヤー向けの独立した情報サイトです。攻略、ニュース、クラス比較、各種ツールを 10 言語で公開し、インタラクティブマップとアイテム情報も提供します。NC Corporation との提携・所属・公式な承認関係はありません。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "公開", updatedLabel: "更新",
      sections: [
        { title: "どのような情報を提供しますか？", paragraphs: ["攻略、クラス情報、製作計算、チェックリスト、クーポン、ニュースを、言語ごとに独立したインデックス可能な URL を持つ 10 言語構成で公開しています。マップとアイテムデータも同じサイトに統合しています。"] },
        { title: "情報はどのように確認しますか？", paragraphs: ["アイテムの識別情報、アイコン、等級などは NC 公式データと照合し、該当ページには出典言語またはフォールバックの有無を明記します。インタラクティブマップの地点は、AION2 KINA 編集部がプレイヤーからの報告をもとに整理し、ゲーム内で再確認しています。NC 公式資料は、実際に確認できる名称、ルール、対象範囲の照合にのみ使用します。編集上の判断、計算、コミュニティ情報は区別して表示します。"], links: [{ href: "/database/map-data-methodology/", label: "データ出典と方法を見る" }] },
        { title: "誰が編集していますか？", paragraphs: ["PFG は出典確認と更新を担当する公開上の著者名です。アバターは識別用のイラストで、本人写真や公式資格を示すものではありません。"] },
        { title: "訂正はどこから送れますか？", paragraphs: ["古い情報、翻訳、無効な出典、誤りを見つけた場合は、可能であれば公開確認できる根拠とともにフォームからお知らせください。"], links: [{ href: "/contact/", label: "連絡・訂正フォームへ" }] },
      ],
    },
    contact: {
      eyebrow: "連絡 / 訂正", title: "連絡と情報訂正",
      description: "AION2 KINA のサイト内フォームから、古い情報、事実誤認、翻訳、出典リンク、素材の権利、サイト不具合を報告できます。公開確認できる根拠 URL と任意の連絡先を添付できますが、ゲームアカウント、パスワード、認証コード、決済情報は送信しないでください。",
      intro: "公開の連絡窓口はサイト内フォームです。ゲームアカウント、パスワード、認証コード、決済情報は送らないでください。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "公開", updatedLabel: "更新", contactAction: "訂正フォームを開く",
      sections: [
        { title: "何を報告できますか？", paragraphs: ["古い・誤った情報、重要な欠落、翻訳、無効な出典、素材の権利、技術的な問題を報告できます。"] },
        { title: "フォームには何が保存されますか？", paragraphs: ["現在のページと言語に加え、説明、任意の根拠 URL、任意の連絡先を保存します。連絡先は公開されません。"] },
        { title: "アカウントや決済の問題は？", paragraphs: ["KINA はアカウント、決済、返金、公式サポートを扱いません。地域の NC 公式サポートへお問い合わせください。"], links: [{ href: "https://aion2.plaync.com/", label: "AION2 公式サイト" }] },
      ],
    },
    privacy: {
      eyebrow: "プライバシー", title: "プライバシーポリシー",
      description: "AION2 KINA がアクセス解析、分析 Cookie、言語 Cookie、ブラウザのローカル保存、訂正報告、暗号化 IP、保存期間、削除の選択肢、外部リンクをどのように扱うか説明します。閲覧者アカウントは不要で、ページ上から分析設定を変更できます。",
      intro: "閲覧にアカウントは不要です。機能提供、利用分析、訂正確認に必要な範囲のデータだけを扱います。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "公開", updatedLabel: "更新",
      sections: [
        { title: "ブラウザには何が保存されますか？", paragraphs: ["GA4 分析は初期状態で有効で、言語は Cookie に保存されます。テーマ、チェックリスト、マップ進捗、お気に入り、診断、計算機はローカル保存される場合があり、KINA へ自動送信されません。"] },
        { title: "アクセス解析はどのように動作しますか？", paragraphs: ["初期状態の詳細分析では、仮名化した閲覧経路、暗号化 IP、ランダム識別子のサーバー HMAC、国、概略の端末区分を最長 30 日保存する場合があります。氏名、ログインアカウント、完全な User-Agent、完全なクエリは保存しません。拒否後は詳細履歴を停止し、Cookie を使わない基本計測だけを残します。"], links: [{ href: "https://policies.google.com/privacy", label: "Google プライバシーポリシー" }] },
        { title: "訂正報告には何が保存されますか？", paragraphs: ["種類、説明、ページ、言語、任意の根拠 URL と連絡先、時刻を保存します。不正利用対策にハッシュ識別子を使い、報告テーブルに生の IP は保存しません。"] },
        { title: "どのような選択ができますか？", paragraphs: ["分析設定から Cookie を拒否できます。Cookie とローカル保存を削除し、連絡先を空欄にすることもできます。"] },
      ],
    },
    terms: {
      eyebrow: "利用条件", title: "利用規約",
      description: "AION2 KINA の非公式サイトとしての立場、情報の正確性と更新、許可・禁止される利用、外部リンク、AION2 の商標・公式素材の権利、利用者自身による確認責任を説明します。アカウントや仮想アイテムの販売、決済、返金、公式サポートは行いません。",
      intro: "AION2 KINA は独立した非公式のプレイヤー向け情報サイトです。最新データとサービス規則はゲーム内表示および NC 公式告知を優先してください。",
      byline: PFG_AUTHOR_NAME, publishedLabel: "公開", updatedLabel: "更新",
      sections: [
        { title: "情報はどのように利用できますか？", paragraphs: ["ガイドとツールは公式な保証ではありません。更新で数値、ドロップ、イベント、利用可否が変わるため、ゲーム内で再確認してください。"] },
        { title: "禁止される利用は？", paragraphs: ["サービス妨害、セキュリティ回避、フォーム悪用、悪意ある素材の送信、NC のなりすましは禁止します。"] },
        { title: "商標と外部素材の権利は？", paragraphs: ["AION2 の名称、商標、公式素材は NC Corporation または各権利者に帰属します。外部サイトには各社の条件が適用されます。"] },
        { title: "取引やアカウントサービスはありますか？", paragraphs: ["ありません。アカウント、仮想アイテム、チャージを販売せず、決済、返金、公式サポート案件を処理しません。"] },
      ],
    },
  },
  "pt-br": {
    about: {
      eyebrow: "SOBRE / PRINCÍPIOS EDITORIAIS", title: "Sobre o AION2 KINA",
      description: "Saiba como o AION2 KINA publica conteúdo editorial em 10 idiomas, verifica fontes, identifica a autoria e trata correções.",
      intro: "AION2 KINA é um recurso independente para jogadores de AION2. Publica guias, notícias, comparações de classes e ferramentas em 10 idiomas, além de oferecer mapa interativo e dados de itens. Não possui vínculo nem endosso da NC Corporation.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Atualizado",
      sections: [
        { title: "O que o AION2 KINA oferece?", paragraphs: ["Guias, classes, calculadora de fabricação, checklists, códigos e notícias são publicados em uma estrutura de 10 idiomas, cada um com uma URL indexável própria. O mapa e a base de itens também fazem parte do site."] },
        { title: "Como as informações são verificadas?", paragraphs: ["A identidade, o ícone, a qualidade e campos semelhantes dos itens são conferidos com os dados oficiais da NC; as páginas afetadas indicam o idioma de origem ou de apoio. Os pontos do mapa interativo são organizados pela equipe editorial do AION2 KINA a partir de relatos de jogadores e verificados dentro do jogo. Os materiais oficiais da NC são usados apenas para conferir os nomes, regras e escopos que realmente confirmam. Análises editoriais, cálculos e descobertas da comunidade são separados."], links: [{ href: "/database/map-data-methodology/", label: "Ver fontes e metodologia" }] },
        { title: "Quem edita o site?", paragraphs: ["PFG é o nome público do autor responsável por fontes e atualizações. O avatar é uma ilustração de identificação, não uma foto nem credencial oficial."] },
        { title: "Como enviar uma correção?", paragraphs: ["Informe dados desatualizados, tradução, fonte quebrada ou erro e, quando possível, inclua evidência pública."], links: [{ href: "/contact/", label: "Contato e correções" }] },
      ],
    },
    contact: {
      eyebrow: "CONTATO / CORREÇÕES", title: "Contato e correções",
      description: "Informe pelo formulário do AION2 KINA dados incorretos ou desatualizados, traduções, fontes quebradas, dúvidas de direitos ou falhas técnicas.",
      intro: "O formulário interno é o canal público de contato. Não envie conta, senha, código de verificação ou dados de pagamento.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Atualizado", contactAction: "Abrir formulário de correção",
      sections: [
        { title: "O que posso informar?", paragraphs: ["Conteúdo desatualizado ou incorreto, lacunas, tradução, links, direitos de mídia e problemas técnicos."] },
        { title: "O que o formulário salva?", paragraphs: ["A página e o idioma são anexados; mensagem, evidência e contato são opcionais. O contato nunca é exibido publicamente."] },
        { title: "Problemas de conta ou pagamento?", paragraphs: ["KINA não oferece suporte de conta, pagamento ou reembolso. Procure o suporte oficial da NC da sua região."], links: [{ href: "https://aion2.plaync.com/", label: "Site oficial de AION2" }] },
      ],
    },
    privacy: {
      eyebrow: "PRIVACIDADE", title: "Política de privacidade",
      description: "Saiba como o AION2 KINA usa análises, armazenamento local, cookie de idioma, relatos, opções de consentimento, retenção e links externos.",
      intro: "Não é necessário criar conta. Apenas dados limitados para funções, análise de uso e revisão de correções são tratados.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Atualizado",
      sections: [
        { title: "O que o navegador guarda?", paragraphs: ["GA4 fica ativo por padrão e o idioma é salvo em cookie. Tema, checklist, progresso do mapa, favoritos, questionário e calculadora podem ficar apenas no armazenamento local."] },
        { title: "Como funciona a análise?", paragraphs: ["A análise detalhada padrão pode guardar por até 30 dias jornadas pseudonimizadas, IP criptografado, HMACs de identificadores aleatórios, país e categorias técnicas gerais. Não guardamos nomes, contas conectadas, User-Agent completo nem consultas completas. Ao recusar, o histórico detalhado para e permanece somente a medição básica sem cookies."], links: [{ href: "https://policies.google.com/privacy", label: "Política de Privacidade do Google" }] },
        { title: "O que é salvo em uma correção?", paragraphs: ["Categoria, mensagem, página, idioma, evidência e contato opcionais e horário. Um identificador hash limita abuso; o IP bruto não fica na tabela."] },
        { title: "Quais são minhas opções?", paragraphs: ["Você pode recusar cookies nas preferências de análise, apagar cookies e dados locais e deixar o contato em branco."] },
      ],
    },
    terms: {
      eyebrow: "TERMOS", title: "Termos de uso",
      description: "Consulte o status não oficial do AION2 KINA, as regras de precisão e uso, links externos, marcas registradas e a responsabilidade do jogador.",
      intro: "AION2 KINA é um recurso independente e não oficial. Para dados ao vivo e regras do serviço, prevalecem o cliente do jogo e os avisos oficiais da NC.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Publicado", updatedLabel: "Atualizado",
      sections: [
        { title: "Como posso usar as informações?", paragraphs: ["Guias e ferramentas não são promessas oficiais. Atualizações podem alterar valores, saques, eventos e disponibilidade; confirme no jogo."] },
        { title: "O que é proibido?", paragraphs: ["Não interrompa o serviço, contorne a segurança, abuse do formulário, envie material malicioso nem se passe pela NC."] },
        { title: "Quem possui as marcas?", paragraphs: ["Nomes, marcas e mídia oficial de AION2 pertencem à NC Corporation ou aos respectivos titulares. Sites externos têm seus próprios termos."] },
        { title: "KINA oferece transações?", paragraphs: ["Não. Não vende contas, bens virtuais ou recargas e não processa pagamentos, reembolsos ou suporte oficial."] },
      ],
    },
  },
  ru: {
    about: {
      eyebrow: "О САЙТЕ / РЕДАКЦИЯ", title: "Об AION2 KINA",
      description: "Узнайте, как AION2 KINA публикует редакционные материалы на 10 языках, проверяет источники, указывает авторство и вносит исправления.",
      intro: "AION2 KINA — независимый ресурс для игроков AION2. Гайды, новости, сравнения классов и инструменты публикуются на 10 языках; также доступны интерактивная карта и данные предметов. Сайт не связан с NC Corporation и не имеет её официальной поддержки.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Опубликовано", updatedLabel: "Обновлено",
      sections: [
        { title: "Что предлагает AION2 KINA?", paragraphs: ["Гайды, сведения о классах, калькулятор крафта, чек-листы, коды и новости публикуются в структуре из 10 языков, у каждого есть отдельный индексируемый URL. Карта и база предметов также интегрированы в сайт."] },
        { title: "Как проверяются сведения?", paragraphs: ["Идентификатор, значок, качество и аналогичные поля предмета сверяются с официальными данными NC; на соответствующих страницах указан язык источника или резервного перевода. Точки интерактивной карты редакция AION2 KINA собирает по сообщениям игроков и проверяет в игре. Официальные материалы NC используются только для сверки тех названий, правил и границ, которые они действительно подтверждают. Редакционные выводы, расчёты и находки сообщества отделены."], links: [{ href: "/database/map-data-methodology/", label: "Источники и методика" }] },
        { title: "Кто редактирует сайт?", paragraphs: ["PFG — публичное имя автора, отвечающего за проверку источников и обновления. Аватар — иллюстрация, а не фотография или подтверждение официального статуса."] },
        { title: "Как отправить исправление?", paragraphs: ["Сообщите об устаревших данных, переводе, неработающем источнике или ошибке и по возможности приложите открыто проверяемое доказательство."], links: [{ href: "/contact/", label: "Связаться с редакцией" }] },
      ],
    },
    contact: {
      eyebrow: "СВЯЗЬ / ИСПРАВЛЕНИЯ", title: "Связь и исправления",
      description: "Сообщите через форму AION2 KINA об ошибочных или устаревших данных, переводе, неработающем источнике, правах на материалы или технической проблеме.",
      intro: "Внутренняя форма — публичный канал связи. Не отправляйте аккаунт, пароль, код подтверждения или платёжные данные.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Опубликовано", updatedLabel: "Обновлено", contactAction: "Открыть форму исправления",
      sections: [
        { title: "О чём можно сообщить?", paragraphs: ["Об устаревшем или ошибочном содержании, пробелах, переводе, ссылках, правах на материалы и проблемах сайта."] },
        { title: "Что сохраняет форма?", paragraphs: ["К обращению добавляются страница и язык; сообщение, ссылка-доказательство и контакт необязательны. Контакт не публикуется."] },
        { title: "Проблемы с аккаунтом или оплатой?", paragraphs: ["KINA не оказывает поддержку аккаунтов, оплат или возвратов. Обращайтесь в официальную поддержку NC своего региона."], links: [{ href: "https://aion2.plaync.com/", label: "Официальный сайт AION2" }] },
      ],
    },
    privacy: {
      eyebrow: "КОНФИДЕНЦИАЛЬНОСТЬ", title: "Политика конфиденциальности",
      description: "Узнайте, как AION2 KINA использует аналитику, локальное хранилище, языковые Cookie, обращения, настройки согласия, сроки хранения и внешние ссылки.",
      intro: "Для просмотра не нужна учётная запись. Обрабатываются только ограниченные данные для функций, анализа и проверки исправлений.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Опубликовано", updatedLabel: "Обновлено",
      sections: [
        { title: "Что хранит браузер?", paragraphs: ["GA4 включён по умолчанию, язык сохраняется в Cookie. Тема, чек-лист, прогресс карты, избранное, анкета и калькулятор могут храниться локально без автоматической отправки KINA."] },
        { title: "Как работает аналитика?", paragraphs: ["Подробная аналитика по умолчанию может до 30 дней хранить псевдонимные маршруты, зашифрованный IP, серверные HMAC случайных идентификаторов, страну и общие технические категории. Имена, аккаунты, полный User-Agent и полные запросы не сохраняются. После отказа подробная история прекращается и остаётся базовое измерение без Cookie."], links: [{ href: "https://policies.google.com/privacy", label: "Политика конфиденциальности Google" }] },
        { title: "Что хранится в исправлении?", paragraphs: ["Категория, текст, страница, язык, необязательная ссылка и контакт, время. Хеш ограничивает злоупотребления; исходный IP не хранится в таблице обращений."] },
        { title: "Какой у меня выбор?", paragraphs: ["Можно отказаться от Cookie через настройки аналитики, удалить Cookie и локальные данные и не указывать контакт."] },
      ],
    },
    terms: {
      eyebrow: "УСЛОВИЯ", title: "Условия использования",
      description: "Изучите неофициальный статус AION2 KINA, правила точности и использования, внешние ссылки, товарные знаки и ответственность самого игрока.",
      intro: "AION2 KINA — независимый неофициальный ресурс. Для актуальных данных и правил сервиса приоритетны клиент игры и официальные объявления NC.",
      byline: PFG_AUTHOR_NAME, publishedLabel: "Опубликовано", updatedLabel: "Обновлено",
      sections: [
        { title: "Как можно использовать информацию?", paragraphs: ["Гайды и инструменты не являются официальными обещаниями. Обновления меняют значения, добычу, события и доступность; проверяйте в игре."] },
        { title: "Что запрещено?", paragraphs: ["Не нарушайте работу сервиса, не обходите защиту, не злоупотребляйте формой, не отправляйте вредоносные материалы и не выдавайте себя за NC."] },
        { title: "Кому принадлежат знаки?", paragraphs: ["Названия, товарные знаки и официальные материалы AION2 принадлежат NC Corporation или соответствующим правообладателям. У внешних сайтов свои условия."] },
        { title: "Предлагает ли KINA сделки?", paragraphs: ["Нет. Сайт не продаёт аккаунты, виртуальные товары или пополнение и не обрабатывает платежи, возвраты или официальную поддержку."] },
      ],
    },
  },
};

export const trustPageCopy: Record<
  SiteLocale,
  Record<TrustPageKind, TrustPageCopy>
> = {
  ...establishedTrustPageCopy,
  ...globalTrustPageCopy,
};
