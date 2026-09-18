import type {
  ContentEntry,
  ContentSectionBlock,
  LocalizedContent,
} from "./content-registry";
import {
  contentLocales,
  type ContentLocale,
} from "./site-config";

type SeoContentSectionBlock = ContentSectionBlock & {
  table?: {
    caption: string;
    headers: readonly string[];
    rows: readonly { header?: string; cells: readonly string[] }[];
  };
  faq?: readonly { question: string; answer: string }[];
};

type LocalizedGuideEnhancement = {
  sections: readonly SeoContentSectionBlock[];
};

type GuideEnhancement = {
  readingMinutes: number;
  updatedAt?: string;
  related?: ContentEntry["related"];
  translations: Record<ContentLocale, LocalizedGuideEnhancement>;
};

const guideEnhancements = {
  "interactive-map-quickstart": {
    readingMinutes: 6,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "share-and-recheck",
            title: "分享 AION2 互動地圖路線前的檢查",
            paragraphs: [
              "分享路線前，先確認地圖名稱、陣營、啟用中的標記型別與最後核對日期。只傳一張裁切過的圖片，通常會遺失篩選條件與版本脈絡；能保留篩選狀態的頁面連結更容易讓隊友重現結果。",
              "收到別人分享的 AION2 互動地圖連結時，也應先看目前顯示的地圖與型別，再用遊戲內位置核對。若標記名稱、座標或用途不同，不要自行修正成猜測答案，應附上地圖、座標與版本回報。",
            ],
            bullets: [
              "分享前記下地圖、陣營與啟用中的型別。",
              "路線只代表規劃順序，不保證即時重生、開放或可互動狀態。",
              "版本更新後重新開啟連結，確認標記仍與遊戲內畫面一致。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "share-and-recheck",
            title: "Check an AION2 interactive map route before sharing",
            paragraphs: [
              "Before sharing a route, confirm the map, faction, active marker types, and last verification date. A cropped screenshot usually loses filter and version context; a page link that preserves the intended view is easier for another player to reproduce.",
              "When you receive an AION2 interactive map link, verify the displayed map and filters before comparing it with the live client. If a marker name, coordinate, or purpose differs, report the map, coordinate, and build instead of replacing the record with a guess.",
            ],
            bullets: [
              "Record the map, faction, and active marker types before sharing.",
              "A planned route does not guarantee live spawn, availability, or interaction state.",
              "After an update, reopen the link and compare the markers with the current client.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "share-and-recheck",
            title: "AION2 인터랙티브 지도 경로 공유 전 확인",
            paragraphs: [
              "경로를 공유하기 전에 지도, 종족, 활성화된 마커 종류와 마지막 확인 날짜를 점검하세요. 잘린 스크린샷은 필터와 버전 문맥을 잃기 쉬우므로 의도한 화면을 다시 열 수 있는 페이지 링크가 더 유용합니다.",
              "다른 사람이 보낸 AION2 인터랙티브 지도 링크도 현재 지도와 필터를 먼저 확인한 뒤 게임 화면과 비교하세요. 이름, 좌표나 용도가 다르면 추측으로 바꾸지 말고 지도, 좌표와 버전을 함께 제보하세요.",
            ],
            bullets: [
              "공유 전 지도, 종족과 활성 마커 종류를 기록합니다.",
              "계획 경로는 실시간 등장, 개방이나 상호작용 상태를 보장하지 않습니다.",
              "업데이트 뒤 링크를 다시 열어 현재 클라이언트와 비교합니다.",
            ],
          },
        ],
      },
    },
  },
  "global-pre-registration": {
    readingMinutes: 10,
    updatedAt: "2026-07-26",
    related: [
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "guides", slug: "early-access" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "guides", slug: "global-monetization-watchlist" },
      { kind: "content", section: "guides", slug: "scam-check" },
    ],
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "registration-status-2026-07-24",
            title: "AION 2 全球版預先登錄現在還開放嗎？",
            paragraphs: [
              "是。本站在 2026 年 7 月 24 日最後核對時，NC 全球官方頁面的「Pre-register / Join Our Newsletter」表單仍可使用。這只代表核對當下開放；官方尚未公布固定截止日期，因此不能把其他抽獎或社群活動的日期當成預先登錄期限。",
              "目前表單要求參加者年滿 18 歲並同意必要的個人資料條款，Steam 願望清單選項則是自願項目。若官方表單日後改版，以送出當下顯示的欄位、資格與條款為準。",
            ],
            table: {
              caption: "AION 2 全球版預先登錄狀態（最後核對：2026 年 7 月 24 日）",
              headers: ["項目", "目前狀態", "注意事項"],
              rows: [
                { header: "活動狀態", cells: ["開放", "固定截止日未公布"] },
                { header: "表單", cells: ["Pre-register / Join Our Newsletter", "只在 NC 官方頁提交資料"] },
                { header: "年齡", cells: ["需年滿 18 歲", "以官方表單資格文字為準"] },
                { header: "個人資料", cells: ["必要同意", "送出前閱讀當前條款"] },
                { header: "Steam 願望清單", cells: ["自願選項", "不等同於預先登錄本身"] },
                { header: "獎勵領取", cells: ["全球版推出時提供", "詳細領取方式與期限未公布"] },
              ],
            },
          },
          {
            id: "registration-steps",
            title: "如何完成 AION 2 全球版預先登錄？",
            paragraphs: [
              "只從 NC 全球官方預先登錄頁進入，確認網址與頁面品牌後再填寫表單。本站不代收電子郵件、NC 帳號、個人資料或預先登錄結果，也不要求玩家把驗證資訊交給第三方。",
              "官方目前沒有公開一套可永久沿用的驗證、截止與獎勵領取流程。送出後只保留官方頁面實際提供的完成畫面或通知，不自行假設一定會收到哪一種郵件、序號或 Coupon。",
            ],
            steps: [
              { title: "開啟 NC 官方頁", description: "從全球官方頁的預先登錄入口進入，不使用私訊短網址或代登網站。" },
              { title: "閱讀當前表單", description: "確認年滿 18 歲、必要個人資料同意與當前服務地區提示。" },
              { title: "決定自願選項", description: "Steam 願望清單是可選項，不要把願望清單當成預先登錄完成證明。" },
              { title: "送出並保留結果", description: "只保存官方頁面實際顯示的完成狀態；不要公開郵件、帳號或任何驗證資料。" },
            ],
          },
          {
            id: "reward-details",
            title: "AION 2 全球版預先登錄獎勵是什麼？",
            paragraphs: [
              "NC 日本官方 6 月 8 日公告確認兩層獎勵：固定取得夥伴寵物 Pagati，另從四種寵物中選擇一種。公告列出的日文名稱是「黒煙モルト」「コヌティ作業員」「銀色の刃ロータン」「パピス」；正式繁中或英文名稱尚未核對，不自行翻譯成官方名稱。",
              "官方說明這些獎勵在全球版推出時提供，但精確領取介面、驗證方式、領取期間與適用地區細節尚未公布。完成表單不等於物品已進背包，也不應把公開兌換碼、Founder’s Pack 或 Steam 願望清單當成同一獎勵流程。",
            ],
            bullets: [
              "固定獎勵：夥伴寵物 Pagati。",
              "選擇獎勵：四種寵物中選擇一種。",
              "提供時間：全球版推出時。",
              "尚未公布：截止日、完整地區資格、領取方式與領取期限。",
            ],
          },
          {
            id: "registration-vs-purchase",
            title: "預先登錄、Steam 願望清單、Founder’s Pack 有何不同？",
            paragraphs: [
              "預先登錄是提交官方活動表單；Steam 願望清單是可選的商店通知功能；Founder’s Pack 是一次性付費商品並包含搶先遊玩權益。三者彼此不同，完成其中一項不代表另外兩項也完成。",
              "完成登記後，可再查看全球版推出資訊、Founder’s Pack 比較、搶先遊玩、Steam／PURPLE、付費模式與系統需求頁面。精確開服時間、預先下載與獎勵領取方法仍需等待 NC 後續公告。",
            ],
          },
          {
            id: "unknowns-before-submit",
            title: "送出前應保留哪些 AION 2 預先登錄未知項目？",
            paragraphs: [
              "固定截止日期、完整適用地區、詳細驗證流程、獎勵領取介面與領取期限都尚未由官方公布。未知不代表沒有，也不能用其他地區舊活動或社群貼文補答案。",
            ],
            bullets: [
              "每次送出前重新閱讀當前官方表單。",
              "不要承諾未公布的截止、雙份獎勵或領取日期。",
              "若表單狀態改變，以 NC 最新公告更新本頁。",
            ],
          },
          {
            id: "pre-registration-faq",
            title: "AION 2 全球版預先登錄常見問題",
            paragraphs: [],
            faq: [
              { question: "AION 2 全球版預先登錄還開放嗎？", answer: "2026 年 7 月 24 日最後核對時仍開放。活動狀態可能改變，送出前請查看 NC 官方表單。" },
              { question: "AION 2 全球版預先登錄何時截止？", answer: "官方尚未公布固定截止日期。不能用另一項社群活動、抽獎或 Founder’s Pack 銷售日期代替。" },
              { question: "Steam 願望清單等於完成預先登錄嗎？", answer: "不等於。願望清單是目前表單中的自願選項和 Steam 商店通知功能，預先登錄仍以官方表單完成狀態為準。" },
              { question: "預先登錄獎勵何時、如何領取？", answer: "官方表示在全球版推出時提供 Pagati 與四選一寵物；詳細領取方法、驗證、期限與完整地區資格尚未公布。" },
              { question: "預先登錄需要購買 Founder’s Pack 嗎？", answer: "不需要。預先登錄與付費 Founder’s Pack 是不同流程；Founder’s Pack 的搶先遊玩也不會自動完成預先登錄。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "registration-status-2026-07-24",
            title: "Is the AION 2 Global Pre-Register page still open?",
            paragraphs: [
              "Yes. When KINA last verified it on July 24, 2026, NC's global “Pre-register / Join Our Newsletter” form was still available. That status applies to the verification moment; NC has not published a fixed deadline, so a date from another giveaway or social campaign is not the pre-registration cutoff.",
              "The current form requires participants to be 18 or older and accept the necessary personal-data terms. The Steam wishlist option is voluntary. If NC changes the form, follow the fields, eligibility, and terms displayed when you submit.",
            ],
            table: {
              caption: "AION 2 Global Pre-Register status — last verified July 24, 2026",
              headers: ["Item", "Current status", "What to know"],
              rows: [
                { header: "Campaign", cells: ["Open", "No fixed deadline announced"] },
                { header: "Form", cells: ["Pre-register / Join Our Newsletter", "Submit data only on NC's official page"] },
                { header: "Age", cells: ["18 or older", "Use the eligibility text on the live form"] },
                { header: "Personal data", cells: ["Required consent", "Read the current terms before submitting"] },
                { header: "Steam wishlist", cells: ["Optional", "Not the same as pre-registration"] },
                { header: "Reward delivery", cells: ["At global launch", "Claim method and deadline unannounced"] },
              ],
            },
          },
          {
            id: "registration-steps",
            title: "How do you use the AION 2 Global Pre-Register form?",
            paragraphs: [
              "Start only from NC's official global pre-registration page and verify the address and branding before entering information. KINA does not collect email addresses, NC accounts, personal data, or registration results and will never ask for verification details.",
              "NC has not published a permanent verification, deadline, and claim workflow. After submitting, keep only the completion state or notice the official page actually provides; do not assume that a particular email, serial code, or coupon must arrive.",
            ],
            steps: [
              { title: "Open NC's official page", description: "Use the global pre-registration entry, not a message short link or registration proxy." },
              { title: "Read the live form", description: "Confirm the 18+ rule, required personal-data consent, and any current service-region notice." },
              { title: "Choose optional items", description: "Steam wishlist is optional and is not proof that pre-registration is complete." },
              { title: "Submit and retain the result", description: "Keep only the completion state NC actually displays; never publish an email, account, or verification data." },
            ],
          },
          {
            id: "reward-details",
            title: "What are the AION 2 Global pre-registration rewards?",
            paragraphs: [
              "NC Japan's June 8 announcement confirms two reward layers: the guaranteed Pagati companion pet and one additional pet chosen from four. It lists the Japanese names 黒煙モルト, コヌティ作業員, 銀色の刃ロータン, and パピス. Official English localized names for those four have not been verified, so KINA does not invent them.",
              "NC says the rewards become available at global launch, but the exact claim interface, verification method, claim period, and detailed regional eligibility are unannounced. Submitting the form does not mean the items are already in inventory, and a public coupon, Founder's Pack, or Steam wishlist is not the same reward flow.",
            ],
            bullets: [
              "Guaranteed reward: the Pagati companion pet.",
              "Choice reward: one pet selected from four.",
              "Availability: at global launch.",
              "Unannounced: deadline, full regional eligibility, claim method, and claim window.",
            ],
          },
          {
            id: "registration-vs-purchase",
            title: "How do pre-registration, Steam wishlist, and Founder's Packs differ?",
            paragraphs: [
              "Pre-registration submits NC's campaign form. Steam wishlist is an optional store-notification feature. A Founder's Pack is a separate one-time paid product with Advanced Access. Completing one does not complete the other two.",
              "After registration, use the related Global release, Founder's Pack comparison, Advanced Access, Steam/PURPLE, monetization, and system-requirements pages for the next decisions. Exact launch time, preload, and reward claim instructions still require a later NC notice.",
            ],
          },
          {
            id: "unknowns-before-submit",
            title: "Which AION 2 pre-registration details remain unknown?",
            paragraphs: [
              "The fixed deadline, complete eligible regions, detailed verification flow, reward-claim interface, and claim window have not been announced. Unknown does not mean absent, and an old regional event or community post cannot fill the gap.",
            ],
            bullets: [
              "Read the current official form again before each submission.",
              "Do not promise an unannounced deadline, duplicate reward, or claim date.",
              "If the form state changes, use NC's latest notice to update this guide.",
            ],
          },
          {
            id: "pre-registration-faq",
            title: "AION 2 global pre-registration FAQ",
            paragraphs: [],
            faq: [
              { question: "Is AION 2 Global pre-registration still open?", answer: "It was open when last verified on July 24, 2026. Campaign state can change, so check NC's official form before submitting." },
              { question: "When does AION 2 Global pre-registration end?", answer: "NC has not announced a fixed deadline. Do not substitute a date from another social campaign, giveaway, or Founder's Pack sale." },
              { question: "Does adding AION 2 to my Steam wishlist complete pre-registration?", answer: "No. Wishlist is a voluntary form option and Steam store notification feature; registration depends on the completion state of NC's official form." },
              { question: "When and how do I claim the pre-registration rewards?", answer: "NC says Pagati and one of four pets become available at global launch. The detailed claim method, verification, window, and full regional eligibility are unannounced." },
              { question: "Do I need a Founder's Pack to pre-register?", answer: "No. Pre-registration and the paid Founder's Packs are separate. Advanced Access from a pack does not automatically complete pre-registration." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "registration-status-2026-07-24",
            title: "아이온2 글로벌 사전예약은 지금도 열려 있나요?",
            paragraphs: [
              "네. KINA가 2026년 7월 24일 마지막으로 확인했을 때 NC 글로벌 공식 “Pre-register / Join Our Newsletter” 양식은 열려 있었습니다. 이 상태는 확인 시점 기준이며 NC는 고정 마감일을 발표하지 않았으므로 다른 경품이나 SNS 이벤트 날짜를 사전예약 마감으로 쓰면 안 됩니다.",
              "현재 양식은 만 18세 이상과 필수 개인정보 동의를 요구하고 Steam 찜은 선택 항목입니다. NC가 양식을 바꾸면 제출 시점에 표시되는 입력 항목, 자격과 약관을 따르세요.",
            ],
            table: {
              caption: "아이온2 글로벌 사전예약 현황 — 2026년 7월 24일 마지막 확인",
              headers: ["항목", "현재 상태", "확인할 내용"],
              rows: [
                { header: "이벤트 상태", cells: ["진행 중", "고정 마감일 미공개"] },
                { header: "양식", cells: ["Pre-register / Join Our Newsletter", "NC 공식 페이지에서만 정보 제출"] },
                { header: "연령", cells: ["만 18세 이상", "실시간 양식의 자격 문구 확인"] },
                { header: "개인정보", cells: ["필수 동의", "제출 전 현재 약관 확인"] },
                { header: "Steam 찜", cells: ["선택", "사전예약 자체와 다름"] },
                { header: "보상 지급", cells: ["글로벌 출시 시", "수령 방법과 기한 미공개"] },
              ],
            },
          },
          {
            id: "registration-steps",
            title: "아이온2 글로벌 사전예약은 어떻게 완료하나요?",
            paragraphs: [
              "NC 글로벌 공식 사전예약 페이지에서만 시작하고 정보를 입력하기 전에 주소와 브랜드를 확인하세요. KINA는 이메일, NC 계정, 개인정보나 사전예약 결과를 수집하지 않으며 인증 정보를 요구하지 않습니다.",
              "NC는 영구적으로 적용되는 인증, 마감과 보상 수령 절차를 공개하지 않았습니다. 제출 뒤 공식 페이지가 실제로 보여 주는 완료 상태나 안내만 보관하고 특정 메일, 시리얼이나 쿠폰이 반드시 온다고 가정하지 마세요.",
            ],
            steps: [
              { title: "NC 공식 페이지 열기", description: "메시지 단축 주소나 대리 신청 사이트가 아니라 글로벌 사전예약 입구를 이용합니다." },
              { title: "현재 양식 읽기", description: "만 18세, 필수 개인정보 동의와 현재 서비스 지역 안내를 확인합니다." },
              { title: "선택 항목 결정", description: "Steam 찜은 선택 항목이며 사전예약 완료 증명이 아닙니다." },
              { title: "제출과 결과 보관", description: "NC가 실제로 표시한 완료 상태만 보관하고 이메일, 계정이나 인증 정보를 공개하지 않습니다." },
            ],
          },
          {
            id: "reward-details",
            title: "아이온2 글로벌 사전예약 보상은 무엇인가요?",
            paragraphs: [
              "NC Japan의 6월 8일 발표는 확정 동료 펫 Pagati와 네 종류 중 선택하는 추가 펫 하나를 확인했습니다. 일본어 이름은 「黒煙モルト」「コヌティ作業員」「銀色の刃ロータン」「パピス」입니다. 네 펫의 공식 한국어·영어 이름은 확인되지 않아 KINA가 임의로 공식 이름을 만들지 않습니다.",
              "NC는 글로벌 출시 때 보상을 제공한다고 설명하지만 정확한 수령 화면, 인증 방식, 수령 기간과 세부 지역 자격은 미공개입니다. 양식을 제출했다고 즉시 인벤토리에 들어오는 것이 아니며 공개 쿠폰, Founder's Pack이나 Steam 찜과 같은 절차가 아닙니다.",
            ],
            bullets: [
              "확정 보상: 동료 펫 Pagati.",
              "선택 보상: 펫 네 종류 중 하나.",
              "제공 시점: 글로벌 출시 때.",
              "미공개: 마감일, 전체 지역 자격, 수령 방법과 수령 기한.",
            ],
          },
          {
            id: "registration-vs-purchase",
            title: "사전예약·Steam 찜·Founder’s Pack은 어떻게 다른가요?",
            paragraphs: [
              "사전예약은 NC 이벤트 양식을 제출하는 절차입니다. Steam 찜은 선택형 상점 알림이고 Founder's Pack은 선행 접속을 포함한 별도 일회성 유료 상품입니다. 하나를 완료해도 나머지 둘이 완료되지 않습니다.",
              "신청 뒤 글로벌 출시, Founder's Pack 비교, 선행 접속, Steam/PURPLE, 과금과 시스템 사양 페이지에서 다음 결정을 확인하세요. 정확한 오픈 시각, 사전 다운로드와 보상 수령 방법은 후속 NC 공지가 필요합니다.",
            ],
          },
          {
            id: "unknowns-before-submit",
            title: "제출 전 어떤 아이온2 사전예약 정보가 아직 미공개인가요?",
            paragraphs: [
              "고정 마감일, 전체 참여 지역, 상세 인증 흐름, 보상 수령 화면과 수령 기간은 발표되지 않았습니다. 미공개는 없다는 뜻이 아니며 과거 지역 이벤트나 커뮤니티 글로 빈칸을 채울 수 없습니다.",
            ],
            bullets: [
              "제출할 때마다 현재 공식 양식을 다시 읽습니다.",
              "미공개 마감, 중복 보상이나 수령 날짜를 약속하지 않습니다.",
              "양식 상태가 바뀌면 NC 최신 공지로 가이드를 갱신합니다.",
            ],
          },
          {
            id: "pre-registration-faq",
            title: "아이온2 글로벌 사전예약 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "아이온2 글로벌 사전예약은 아직 열려 있나요?", answer: "2026년 7월 24일 마지막 확인 때 열려 있었습니다. 상태가 바뀔 수 있으므로 제출 전에 NC 공식 양식을 확인하세요." },
              { question: "아이온2 글로벌 사전예약은 언제 끝나나요?", answer: "NC는 고정 마감일을 발표하지 않았습니다. 다른 SNS 이벤트, 경품 또는 Founder's Pack 판매 날짜로 대신하면 안 됩니다." },
              { question: "Steam 찜을 하면 사전예약이 완료되나요?", answer: "아닙니다. 찜은 양식의 선택 항목이자 Steam 상점 알림 기능이며 사전예약은 NC 공식 양식의 완료 상태가 기준입니다." },
              { question: "사전예약 보상은 언제 어떻게 받나요?", answer: "NC는 글로벌 출시 때 Pagati와 펫 네 종류 중 하나를 제공한다고 밝혔습니다. 상세 수령 방법, 인증, 기간과 전체 지역 자격은 미공개입니다." },
              { question: "사전예약에 Founder's Pack이 필요한가요?", answer: "필요하지 않습니다. 사전예약과 유료 Founder's Pack은 별도이며 팩의 선행 접속이 사전예약을 자동 완료하지 않습니다." },
            ],
          },
        ],
      },
    },
  },
  "wing-enhancement": {
    readingMinutes: 10,
    updatedAt: "2026-07-28",
    related: [
      { kind: "content", section: "news", slug: "chalice-of-muspel-sanctuary-update" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
      { kind: "content", section: "guides", slug: "crafting-and-transfer-crafting" },
      { kind: "tool", toolSlug: "material-calculator" },
    ],
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "resource-priority",
            title: "材料與翅膀的投資優先順序",
            paragraphs: [
              "先保留近期確定要花費的基納與成長材料，再分配翅膀預算。輸出向前期可先檢查惡夢、德拉瑪塔、藍色電光／鬥士與守護者最上級，因為社群攻略分別整理了強擊、傷害增幅、武器傷害增幅與額外攻擊效果；需要暴擊時再比較克羅梅德或藍色蝴蝶。這是 2026 年 5 月玩家版本整理，不是 NC 排名，名稱與下一階效果都要回到目前區服核對。",
              "5 月 27 日韓國服務更新說明亦提到，遠征取得的各種翅膀羽毛可物質轉換為強化石或靈魂結晶。這能補充強化石來源，但文章沒有取得固定兌換比率，因此轉換前仍應讀取當前遊戲畫面。",
            ],
            bullets: [
              "資源有限時，先把數隻真正需要其屬性的翅膀做到 +5，再集中一隻核心翅膀。",
              "三種材料中任何一種成為瓶頸，都按瓶頸材料決定是否停止。",
              "下一階效果不能改善目前目標時，不因為材料足夠就強化。",
              "職業已有必定暴擊或更缺命中、生存、輔助效果時，不照抄輸出排序。",
            ],
          },
          {
            id: "stop-and-failure",
            title: "什麼時候停手？失敗後要檢查什麼？",
            paragraphs: [
              "任一材料將跌破保留線、下一階效果不符合目前目標、成本與攻略不同、無法確認失敗後果，或已達成本輪目標時，就應停止。最危險的訊號是「剛才失敗，所以下一次更容易成功」；官方資料沒有把連續失敗描述成保底進度。",
              "官方指南與機率表沒有完整說明失敗後是否降級、重置、返還材料、累積保底或存在保護道具。不要把「不掉級」「有保底」「墊刀有效」寫成既定規則。",
            ],
            steps: [
              { title: "保存結果", description: "發生失敗時先截圖，不立刻再次按下強化。" },
              { title: "確認階段", description: "查看強化階段是否改變，不能依其他遊戲或舊版本猜測。" },
              { title: "核對扣除", description: "逐項記錄基納、調律石（唯一）和強化石的實際扣除量。" },
              { title: "讀取下一次", description: "重新查看顯示成功率、材料成本與下一階效果。" },
              { title: "決定是否結束", description: "任一結果與預覽或預算不同，本輪立即停止。" },
            ],
          },
          {
            id: "mistakes",
            title: "最常見的六個錯誤",
            paragraphs: [],
            bullets: [
              "把套用外觀誤認為取得裝備效果或持有效果。",
              "只計算基納，忽略調律石（唯一）與強化石。",
              "把唯一翅膀的基礎材料總量誤當成保證升到 +10 的成本。",
              "用韓國服務、單一翅膀或舊補丁表格套用其他區服。",
              "把 +10 系統上限誤解為所有角色的第一投資優先。",
              "失敗後為追回已消耗材料而突破原定預算。",
            ],
          },
          {
            id: "quick-reference",
            title: "AION2 翅膀強化資料口徑速查",
            paragraphs: ["下列數字只代表 2026 年 7 月 22 日韓國服務機率表的版本快照；KINA 依官方逐階資料計算累計總量，操作前仍須核對當前區服客戶端。"],
            table: {
              caption: "AION2 翅膀強化版本、機率與資料邊界",
              headers: ["問題", "答案"],
              rows: [
                { header: "這份數字來自哪裡？", cells: ["NC 2026 年 7 月 22 日韓國服務官方逐階機率表。"] },
                { header: "唯一翅膀 +10 的基礎率？", cells: ["韓國服務目前公開為 30%；每組追加材料增加 10 個百分點。"] },
                { header: "唯一翅膀全程 100% 到 +10？", cells: ["KINA 依官方逐階表加總為 20,230,000 基納、160 調律石（唯一）、103,800 強化石。"] },
                { header: "失敗是否降級或有保底？", cells: ["官方已核對頁面未完整說明，不自行推定。"] },
              ],
            },
          },
          {
            id: "faq",
            title: "AION2 翅膀強化常見問題",
            paragraphs: [],
            faq: [
              { question: "為什麼不直接推薦固定成功率？", answer: "因為成功率越高，材料成本越高，而且每位玩家的材料保留量不同。需要確定結果且 100% 即時成本在預算內時可以選 100%；否則延期比追損更容易控制資源。" },
              { question: "前期應該先升哪一隻翅膀？", answer: "輸出向可先檢查惡夢、德拉瑪塔、藍色電光／鬥士和守護者最上級的下一階效果；需要暴擊時再看克羅梅德或藍色蝴蝶。資源有限可先把符合職業需求的數隻翅膀做到 +5，再集中核心翅膀。這是玩家社群路線，不是 NC 官方排名。" },
              { question: "商店購買的翅膀有屬性嗎？", answer: "官方翅膀指南註明，商店購買的翅膀沒有持有效果或裝備效果；外觀裝備亦不會套用裝備效果。" },
              { question: "唯一翅膀 9,890,000 基納就能保證 +10 嗎？", answer: "不能。這只是每一階使用一次基礎材料的合計；+4 之後基礎率低於 100%。依韓國服務官方表把每階調至 100% 的總量是 20,230,000 基納、160 調律石和 103,800 強化石。" },
              { question: "舊材料表可以直接照用嗎？", answer: "不可以跨區服或跨版本直接套用。本文數值來自 2026 年 7 月 22 日韓國服務官方機率表，執行前仍要讀取所在服務的當前介面。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "resource-priority",
            title: "Prioritize materials and Wings by the next useful effect",
            paragraphs: [
              "Protect known near-term progression expenses before assigning a Wing budget. For an early damage shortlist, the community guide names Nightmare, Dramatha, Blue Lightning or Fighter, and Superior Guardian for Smash, Damage Amplification, Weapon Damage Amplification, and Additional Attack. Kromede or Blue Butterfly can fill a Crit gap. This is a May 2026 player snapshot, not an NC ranking; verify names and next-tier effects in the current service.",
              "The May 27 Korean update also says Wing Feathers obtained from Expeditions can be material-converted into Enhancement Stones or Soul Crystals. Check the live conversion choice and ratio before using them.",
            ],
            bullets: [
              "When resources are limited, take several role-relevant Wings to +5 before concentrating on one core target.",
              "Let the first material to hit its reserve determine the stop point.",
              "Do not enhance when the next effect does not support the current goal.",
              "Do not copy the damage order when guaranteed critical hits, accuracy, survival, or support is the real gap.",
            ],
          },
          {
            id: "stop-and-failure",
            title: "When to stop and what to check after a failure",
            paragraphs: ["Stop when a reserve breaks, the next effect is not useful, the displayed values differ, the failure outcome is unclear, or the session goal is complete. A previous failure is not evidence that the next attempt is more likely to succeed.", "The checked NC guide and probability table do not fully state downgrade, reset, refund, pity accumulation, or protection-item rules. Do not present any of those outcomes as confirmed."],
            steps: [
              { title: "Save the result", description: "Capture the failure screen before attempting again." },
              { title: "Check the tier", description: "Observe whether the stage changed instead of importing a rule from another game or build." },
              { title: "Audit deductions", description: "Record the actual Kinah, Tuning Stone, and Enhancement Stone deductions." },
              { title: "Read the next attempt", description: "Check the displayed rate, cost, and next effect again." },
              { title: "End the session if needed", description: "Stop when any result differs from the preview or budget." },
            ],
          },
          {
            id: "mistakes",
            title: "Six common Wing Enhancement mistakes",
            paragraphs: [],
            bullets: ["Treating appearance equip as an ownership or equipment effect.", "Budgeting Kinah while ignoring both Stone resources.", "Reading the Unique base-material total as a guaranteed +10 cost.", "Applying a Korean-service, single-Wing, or old-build table to another service.", "Treating +10 as every character's first progression priority.", "Breaking the original budget to recover materials spent after a failure."],
          },
          {
            id: "quick-reference",
            title: "AION2 Wing Enhancement data-scope reference",
            paragraphs: ["These figures are a snapshot of the Korean-service probability table updated July 22, 2026. KINA calculated cumulative totals from NC's per-tier rows; verify the current regional client before acting."],
            table: {
              caption: "AION2 Wing Enhancement version, rates, and data boundaries",
              headers: ["Question", "Answer"],
              rows: [
                { header: "What is the source version?", cells: ["NC's official Korean-service per-tier probability table updated July 22, 2026."] },
                { header: "Unique +10 base rate?", cells: ["Currently 30% in the Korean disclosure; each additional group adds 10 percentage points."] },
                { header: "Unique +0 to +10 at 100%?", cells: ["KINA totals 20,230,000 Kinah, 160 Tuning Stones (Unique), and 103,800 Enhancement Stones from NC's per-tier rows."] },
                { header: "Failure downgrade or pity?", cells: ["Not fully stated in the checked official pages; do not assume."] },
              ],
            },
          },
          {
            id: "faq",
            title: "AION2 Wing Enhancement FAQ",
            paragraphs: [],
            faq: [
              { question: "Why not recommend one fixed success rate?", answer: "A higher rate costs more materials and every player protects a different reserve. Use 100% when certainty matters and its live cost fits the budget; otherwise postpone instead of chasing losses." },
              { question: "Which Wing should I enhance first?", answer: "For damage, first inspect the next-tier effects on Nightmare, Dramatha, Blue Lightning or Fighter, and Superior Guardian; use Kromede or Blue Butterfly when Crit is the gap. With limited resources, a community route is to take several role-relevant Wings to +5 before concentrating on one core Wing. This is not an NC ranking." },
              { question: "Do shop-purchased Wings provide stats?", answer: "NC's guide states that shop-purchased Wings have no ownership or equipment effects, and appearance equip does not apply equipment effects." },
              { question: "Does 9,890,000 Kinah guarantee +10 for a Unique Wing?", answer: "No. That total counts one base-material attempt at each tier. The Korean table totals 20,230,000 Kinah, 160 Tuning Stones, and 103,800 Enhancement Stones when every tier is raised to 100%." },
              { question: "Can I follow an old material table?", answer: "Do not carry it across regions or builds. This article uses the Korean disclosure updated July 22, 2026; verify the current service screen before acting." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "resource-priority",
            title: "다음 효과를 기준으로 재료와 날개 우선순위를 정하세요",
            paragraphs: [
              "가까운 시일에 확정적으로 쓸 성장 비용을 먼저 남기고 날개 예산을 배정하세요. 공격형 초반 후보로 커뮤니티 공략은 강타의 악몽, 피해 증폭의 드라마타, 무기 피해 증폭의 푸른 전광 또는 투사, 추가 공격의 수호자 최상급을 제시합니다. 치명이 부족하면 크로메데나 푸른 나비를 비교할 수 있습니다. 이는 2026년 5월 플레이어 자료이며 NC 순위가 아니므로 현재 서비스에서 이름과 다음 효과를 확인하세요.",
              "5월 27일 업데이트 노트는 원정에서 얻은 각종 날개 깃털을 강화석 또는 영혼 결정으로 물질 변환할 수 있다고 설명합니다. 전환 비율과 선택지는 현재 게임 화면에서 확인하세요.",
            ],
            bullets: [
              "자원이 부족하면 역할에 필요한 여러 날개를 +5까지 올린 뒤 핵심 하나에 집중합니다.",
              "세 재료 중 가장 먼저 보유선에 닿는 재료를 중단 기준으로 삼습니다.",
              "다음 효과가 현재 목표에 도움이 되지 않으면 재료가 있어도 미룹니다.",
              "확정 치명, 명중, 생존 또는 지원 효과가 더 필요하면 공격 순위를 그대로 적용하지 않습니다.",
            ],
          },
          {
            id: "stop-and-failure",
            title: "중단 조건과 실패 후 확인 순서",
            paragraphs: ["보유선이 깨지거나, 다음 효과가 필요 없거나, 표시값이 다르거나, 실패 결과를 확인할 수 없거나, 이번 목표를 달성했으면 멈추세요. 이전 실패는 다음 시도의 성공 확률이 더 높다는 증거가 아닙니다.", "확인한 공식 가이드와 확률표는 실패 시 단계 하락, 초기화, 재료 반환, 보정 누적 또는 보호 아이템을 완전히 설명하지 않습니다. 이를 확정 규칙으로 쓰면 안 됩니다."],
            steps: [
              { title: "결과 저장", description: "실패 화면을 저장하고 바로 다시 누르지 않습니다." },
              { title: "단계 확인", description: "다른 게임이나 이전 빌드 규칙을 가져오지 말고 실제 변화를 봅니다." },
              { title: "차감 기록", description: "키나, 조율석과 강화석의 실제 차감량을 기록합니다." },
              { title: "다음 시도 읽기", description: "표시 확률, 비용과 다음 효과를 다시 확인합니다." },
              { title: "필요하면 종료", description: "미리보기나 예산과 다른 결과가 있으면 이번 세션을 끝냅니다." },
            ],
          },
          {
            id: "mistakes",
            title: "날개 강화에서 자주 하는 여섯 가지 실수",
            paragraphs: [],
            bullets: ["외형 장착을 보유 또는 장착 효과로 오해합니다.", "키나만 계산하고 조율석과 강화석을 빼먹습니다.", "유일 기본 재료 합계를 +10 보장 비용으로 읽습니다.", "한국 서비스·한 날개·이전 빌드 표를 다른 서비스에 적용합니다.", "+10 상한을 모든 캐릭터의 첫 투자 목표로 봅니다.", "실패 뒤 사용한 재료를 되찾으려 원래 예산을 넘깁니다."],
          },
          {
            id: "quick-reference",
            title: "AION2 날개 강화 데이터 기준 빠른 확인",
            paragraphs: ["아래 수치는 2026년 7월 22일 한국 서비스 확률표의 버전 스냅샷입니다. 누적 총량은 KINA가 NC의 단계별 행을 합산했으며, 실제 진행 전 현재 지역 클라이언트를 확인하세요."],
            table: {
              caption: "AION2 날개 강화 버전·확률과 자료 경계",
              headers: ["질문", "답"],
              rows: [
                { header: "어느 버전의 수치인가요?", cells: ["NC가 2026년 7월 22일 갱신한 한국 서비스 공식 단계별 확률표입니다."] },
                { header: "유일 +10 기본 확률?", cells: ["현재 한국 확률표는 30%, 추가 재료 한 묶음마다 10%p 증가입니다."] },
                { header: "유일 전 단계 100% 총량?", cells: ["KINA가 공식 단계별 표를 합산한 값은 키나 20,230,000, 조율석(유일) 160, 강화석 103,800입니다."] },
                { header: "실패 시 하락 또는 보정?", cells: ["확인한 공식 페이지에 완전한 설명이 없어 추정하지 않습니다."] },
              ],
            },
          },
          {
            id: "faq",
            title: "AION2 날개 강화 자주 묻는 질문",
            paragraphs: [],
            faq: [
              { question: "왜 하나의 고정 성공 확률을 추천하지 않나요?", answer: "확률이 높을수록 재료가 더 들고 이용자마다 보유선이 다릅니다. 확정 결과가 필요하고 100% 실시간 비용이 예산 안이면 100%를, 아니면 손실 추격 대신 연기를 선택하세요." },
              { question: "초반에는 어떤 날개를 먼저 강화해야 하나요?", answer: "공격형은 악몽, 드라마타, 푸른 전광 또는 투사, 수호자 최상급의 다음 효과를 먼저 확인하고 치명이 부족하면 크로메데나 푸른 나비를 봅니다. 자원이 부족하면 필요한 날개 여러 개를 +5까지 올린 뒤 핵심 하나에 집중할 수 있습니다. 이는 커뮤니티 육성안이며 NC 공식 순위가 아닙니다." },
              { question: "상점 구매 날개에 능력치가 있나요?", answer: "공식 가이드는 상점 구매 날개에 보유 효과와 장착 효과가 없고 외형 장착도 장착 효과를 적용하지 않는다고 설명합니다." },
              { question: "유일 날개는 키나 9,890,000으로 +10이 보장되나요?", answer: "아닙니다. 각 단계의 기본 재료를 한 번씩 합친 값입니다. 모든 단계를 100%로 맞추면 한국 표 기준 키나 20,230,000, 조율석 160, 강화석 103,800입니다." },
              { question: "예전 재료표를 그대로 사용해도 되나요?", answer: "지역과 빌드를 넘겨 적용하면 안 됩니다. 이 글은 2026년 7월 22일 한국 확률표를 사용하며 실행 전 현재 서비스 화면을 확인해야 합니다." },
            ],
          },
        ],
      },
    },
  },
  atool: {
    readingMinutes: 6,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "comparison-checklist",
            title: "用 Atool 比較角色與職業時的統一條件",
            paragraphs: [
              "比較兩個角色前，先統一伺服器、職業、等級區間、資料更新時間與頁面篩選。若條件不同，排名差距可能只是樣本與進度不同，不能直接解釋成職業強弱。",
              "職業統計也應同時看樣本數、統計期間與資料來源。Atool 的分數適合做同條件下的索引，不是 NC 公佈的戰力標準，也不代表副本輸出、PvP 表現或操作難度的永久排名。",
            ],
            bullets: [
              "比較同一伺服器、相近進度與同一資料日期。",
              "截圖時保留篩選條件與頁面更新時間。",
              "不要把單一分數當成配裝、招募或職業平衡的唯一依據。",
            ],
          },
          {
            id: "privacy-and-verification",
            title: "Atool 第三方資料的隱私與複核方式",
            paragraphs: [
              "Atool 屬於第三方服務。只查看公開資料時，也應從自己儲存的可信網址進入，並避免在非官方頁面輸入 NC 密碼、一次性驗證碼或付款資料。",
              "如果 Atool 與遊戲內角色資料不同，先比較抓取時間、伺服器與角色名稱，再以當前遊戲畫面為準。需要回報時只提供足以定位公開資料的連結與時間，不公開登入或個人驗證資訊。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "comparison-checklist",
            title: "Use consistent conditions for Atool character comparisons",
            paragraphs: [
              "Before comparing two characters, align the server, class, level range, data timestamp, and page filters. If those conditions differ, a ranking gap may reflect the sample and progression state rather than class strength.",
              "For class charts, read the sample size, measurement period, and source together. An Atool score can index records under comparable conditions; it is not an NC combat-power standard or a permanent ranking of dungeon damage, PvP performance, or execution difficulty.",
            ],
            bullets: [
              "Compare the same server, similar progression, and the same data date.",
              "Keep filters and the page timestamp in a screenshot.",
              "Do not use one score as the sole basis for gearing, recruitment, or balance claims.",
            ],
          },
          {
            id: "privacy-and-verification",
            title: "Privacy and verification for third-party Atool data",
            paragraphs: [
              "Atool is a third-party service. Even when reading public records, enter through a trusted bookmark and never provide an NC password, one-time code, or payment information to an unofficial page.",
              "If Atool and the current client differ, compare the collection time, server, and character name, then treat the live game screen as the final reference. A report needs only the public record link and observation time, not login or personal verification data.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "comparison-checklist",
            title: "아툴 캐릭터·직업 비교 조건 통일",
            paragraphs: [
              "두 캐릭터를 비교하기 전에 서버, 직업, 레벨 구간, 데이터 시각과 화면 필터를 맞추세요. 조건이 다르면 순위 차이는 직업 성능이 아니라 표본과 성장 진행도의 차이일 수 있습니다.",
              "직업 통계는 표본 수, 집계 기간과 출처를 함께 읽어야 합니다. 아툴 점수는 같은 조건의 자료를 찾는 지표이며 NC 공식 전투력 기준이나 던전 딜, PvP 성능, 조작 난도의 영구 순위가 아닙니다.",
            ],
            bullets: [
              "같은 서버, 비슷한 진행도와 같은 데이터 날짜를 비교합니다.",
              "스크린샷에 필터와 페이지 갱신 시각을 남깁니다.",
              "점수 하나만으로 장비, 모집이나 밸런스를 결론 내리지 않습니다.",
            ],
          },
          {
            id: "privacy-and-verification",
            title: "제3자 아툴 데이터의 개인정보와 재확인",
            paragraphs: [
              "아툴은 제3자 서비스입니다. 공개 자료만 보더라도 신뢰한 북마크로 들어가고 비공식 페이지에 NC 비밀번호, 일회용 코드나 결제 정보를 입력하지 마세요.",
              "아툴과 게임 화면이 다르면 수집 시각, 서버와 캐릭터 이름을 비교한 뒤 현재 클라이언트를 최종 기준으로 삼으세요. 제보에는 공개 링크와 확인 시각이면 충분하며 로그인이나 개인 인증 정보는 필요하지 않습니다.",
            ],
          },
        ],
      },
    },
  },
  "scam-check": {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "after-a-suspicious-click",
            title: "點到 AION 2 可疑連結後如何處理？",
            paragraphs: [
              "若只打開頁面而尚未輸入資料，先關閉頁面並從自己儲存的 NC 官方入口重新檢查帳號。若已經輸入密碼或驗證碼，應立即從官方頁面變更憑證、檢查可用的登入與安全設定，並確認電子郵件帳號沒有同時失守。",
              "若下載或執行了檔案，停止再次開啟，保留檔名、來源網址與時間，並使用系統安全工具檢查裝置。涉及付款、帳號異常或虛假客服時，從 NC 官方支援入口提交證據，不要繼續與來路不明的帳號爭辯或傳送更多資料。",
            ],
            steps: [
              { title: "切斷可疑流程", description: "關閉頁面或程式，不再輸入任何密碼、驗證碼或付款資料。" },
              { title: "從官方入口保護帳號", description: "變更憑證並檢查可用的登入、安全與電子郵件設定。" },
              { title: "檢查裝置", description: "儲存檔案資訊並使用可信的系統安全工具掃描。" },
              { title: "保留證據並回報", description: "記錄網址、時間與畫面，從官方支援管道處理。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "after-a-suspicious-click",
            title: "What to do after opening a suspicious AION 2 link",
            paragraphs: [
              "If you only opened the page and entered nothing, close it and return through your own saved NC entry to check the account. If you submitted a password or code, change the credential from the official site immediately, review the available login and security settings, and make sure the email account is still secure.",
              "If you downloaded or ran a file, stop reopening it, preserve the filename, source URL, and time, and scan the device with trusted system security tools. For payment, account, or fake-support incidents, send evidence through official NC support instead of continuing the conversation or providing more data.",
            ],
            steps: [
              { title: "Stop the suspicious flow", description: "Close the page or program and enter no more passwords, codes, or payment details." },
              { title: "Protect the account officially", description: "Change credentials and review login, security, and email settings from a trusted entry." },
              { title: "Check the device", description: "Preserve file details and scan with trusted system security tools." },
              { title: "Preserve and report", description: "Record the URL, time, and screen, then use the official support channel." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "after-a-suspicious-click",
            title: "AION 2 의심 링크를 연 뒤 대처 방법",
            paragraphs: [
              "페이지를 열기만 하고 정보를 입력하지 않았다면 닫은 뒤 직접 저장한 NC 공식 경로에서 계정을 확인하세요. 비밀번호나 코드를 제출했다면 공식 사이트에서 즉시 자격 증명을 바꾸고 이용 가능한 로그인·보안 설정과 이메일 계정 상태를 점검하세요.",
              "파일을 내려받거나 실행했다면 다시 열지 말고 파일명, 출처 주소와 시간을 보관한 뒤 신뢰할 수 있는 시스템 보안 도구로 기기를 검사하세요. 결제, 계정 이상이나 가짜 고객센터 문제는 더 많은 정보를 보내지 말고 NC 공식 지원에 증거를 제출하세요.",
            ],
            steps: [
              { title: "의심 흐름 중단", description: "페이지나 프로그램을 닫고 비밀번호, 코드와 결제 정보를 더 입력하지 않습니다." },
              { title: "공식 경로에서 계정 보호", description: "자격 증명을 바꾸고 로그인, 보안과 이메일 설정을 확인합니다." },
              { title: "기기 점검", description: "파일 정보를 보관하고 신뢰할 수 있는 시스템 보안 도구로 검사합니다." },
              { title: "증거 보관과 신고", description: "주소, 시간과 화면을 기록하고 공식 지원 경로를 이용합니다." },
            ],
          },
        ],
      },
    },
  },
  "character-presets-style-shop": {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "preset-workflow",
            title: "AION2 捏臉預設的安全儲存與重做流程",
            paragraphs: [
              "要保留外觀時，先儲存正面、側面與關鍵滑桿畫面，並記錄客戶端版本、種族、性別與使用的預設來源。這樣即使預設無法直接匯入，也能在相同版本內逐項重做。",
              "來自社群的『預設』若要求執行程式、關閉防護或輸入帳號，就不應繼續。外觀截圖與引數資料不需要 NC 密碼；檔案格式與匯入入口應以當前客戶端實際提供的功能為準。",
            ],
            bullets: [
              "儲存多角度截圖與關鍵滑桿，而不是隻留成品照。",
              "記錄版本、種族、性別與原始來源。",
              "不執行來歷不明的轉換器、指令碼或安裝檔。",
            ],
          },
          {
            id: "style-shop-boundary",
            title: "Style Shop 頁面能確認與不能確認的事",
            paragraphs: [
              "官方 Style Shop 頁面能證明官方提供外觀展示或相關入口，但不能自動證明每個舊預設都與當前地區、種族或客戶端版本相容。",
              "套用前先確認頁面地區、角色條件、價格或使用次數等當前畫面資訊。若官方網頁與遊戲內顯示不同，以當前遊戲內介面和後續公告為準，不把社群範例寫成永久規則。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "preset-workflow",
            title: "Safely preserve and rebuild an AION2 character preset",
            paragraphs: [
              "Save front, side, and key-slider screens together with the client build, faction or race, gender, and preset source. If direct import is unavailable, that record still lets you rebuild the appearance inside the same version.",
              "A community “preset” should not require an executable, disabled protection, or account credentials. Appearance screenshots and parameters do not need an NC password; use only the file format and import surface actually exposed by the current client.",
            ],
            bullets: [
              "Keep multiple angles and key sliders, not only a finished portrait.",
              "Record the build, race, gender, and original source.",
              "Do not run an unknown converter, script, or installer.",
            ],
          },
          {
            id: "style-shop-boundary",
            title: "What the Style Shop page does and does not confirm",
            paragraphs: [
              "The official Style Shop page confirms an official appearance showcase or related entry. It does not automatically prove that every older preset works across regions, races, or client builds.",
              "Before applying anything, check the current page region plus the character, price, and use-limit details shown in the client. When the web page and client differ, follow the current game interface and later notice rather than treating a community example as a permanent rule.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "preset-workflow",
            title: "AION2 커마 프리셋 안전 보관과 재현 절차",
            paragraphs: [
              "정면, 측면과 핵심 슬라이더 화면을 클라이언트 버전, 종족, 성별과 프리셋 출처와 함께 보관하세요. 직접 불러오기가 되지 않아도 같은 버전에서 항목별로 외형을 재현할 수 있습니다.",
              "커뮤니티 ‘프리셋’이 실행 파일, 보안 해제나 계정 입력을 요구하면 중단하세요. 외형 화면과 파라미터에는 NC 비밀번호가 필요하지 않으며 현재 클라이언트가 실제 제공하는 파일 형식과 불러오기 기능만 사용해야 합니다.",
            ],
            bullets: [
              "완성 사진만이 아니라 여러 각도와 핵심 슬라이더를 저장합니다.",
              "버전, 종족, 성별과 원래 출처를 기록합니다.",
              "출처를 모르는 변환기, 스크립트나 설치 파일을 실행하지 않습니다.",
            ],
          },
          {
            id: "style-shop-boundary",
            title: "Style Shop 페이지로 확인할 수 있는 범위",
            paragraphs: [
              "공식 Style Shop 페이지는 공식 외형 전시나 관련 진입점이 있다는 사실을 확인해 줍니다. 모든 과거 프리셋이 지역, 종족과 클라이언트 버전을 넘어 호환된다는 증거는 아닙니다.",
              "적용 전 페이지 지역과 게임 화면의 캐릭터 조건, 가격 또는 이용 횟수를 확인하세요. 웹과 게임이 다르면 현재 클라이언트와 후속 공지를 따르고 커뮤니티 예시를 영구 규칙으로 쓰지 않습니다.",
            ],
          },
        ],
      },
    },
  },
  "soul-imprint": {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "before-reset",
            title: "AION2 靈魂刻印重置前的核對順序",
            paragraphs: [
              "重置前先截圖目前詞條、數值、可選候選與遊戲內顯示機率，並記錄裝備 ID、等級、品質與伺服器版本。網頁機率頁用於理解規則，但當前遊戲畫面才是這次操作的直接輸入。",
              "如果候選、費用或重置結果與過去資料不同，先停止連續操作。確認是否換了裝備、材料、階段或版本，再決定是否繼續，不要用單一物品的結果替代所有裝備規則。",
            ],
            steps: [
              { title: "儲存當前狀態", description: "記錄裝備與現有刻印，確保能比較重置前後差異。" },
              { title: "讀取當前候選", description: "使用遊戲內顯示的候選、費用與機率，不套用舊錶。" },
              { title: "設定停止條件", description: "先決定可接受的材料消耗與目標範圍。" },
              { title: "逐次複核", description: "每次結果後重新讀取條件，發生差異就暫停。" },
            ],
          },
          {
            id: "imprint-vs-tuning",
            title: "靈魂刻印與靈魂調律不要混為一談",
            paragraphs: [
              "刻印、重置與靈魂調律屬於不同操作層次。攻略提到其中一個系統的機率或保留規則時，不能直接搬到另一個按鈕或裝備流程。",
              "判斷資料是否可用時，至少對齊系統名稱、裝備種類、操作畫面與版本日期。若任何一項不同，就把結果視為待核對，而不是通用答案。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "before-reset",
            title: "AION2 Soul Imprint checks before a reset",
            paragraphs: [
              "Before resetting, capture the current affixes, values, candidate pool, and in-game rates together with the item ID, level, grade, and service build. A web probability page explains the rule set, but the live client is the direct input to this attempt.",
              "If the candidates, cost, or result differ from an older record, stop repeated actions. Check whether the item, material, stage, or build changed before continuing; one item's outcome cannot replace the rule for every item.",
            ],
            steps: [
              { title: "Save the current state", description: "Record the item and imprint so the before-and-after result remains comparable." },
              { title: "Read the live candidates", description: "Use the pool, cost, and rates displayed in the current client instead of an old table." },
              { title: "Set a stop rule", description: "Choose an acceptable material budget and target range before acting." },
              { title: "Recheck every result", description: "Read the conditions again after each attempt and pause when they differ." },
            ],
          },
          {
            id: "imprint-vs-tuning",
            title: "Do not merge Soul Imprint and Soul Tuning rules",
            paragraphs: [
              "Imprint, reset, and Soul Tuning are different operation layers. A rate or retention rule attached to one system cannot be moved directly to another button or item flow.",
              "Align at least the system name, item category, operation screen, and build date before using a reference. If any one differs, treat the result as pending verification rather than a universal answer.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "before-reset",
            title: "AION2 영혼 각인 초기화 전 확인 순서",
            paragraphs: [
              "초기화 전 현재 옵션, 수치, 후보와 게임 내 표시 확률을 아이템 ID, 레벨, 등급과 서비스 버전과 함께 저장하세요. 웹 확률 페이지는 규칙을 이해하는 자료이고 이번 조작의 직접 조건은 현재 게임 화면입니다.",
              "후보, 비용이나 결과가 과거 자료와 다르면 연속 조작을 멈추세요. 아이템, 재료, 단계 또는 버전이 바뀌었는지 확인한 뒤 계속하고 한 아이템의 결과를 모든 장비 규칙으로 만들지 않습니다.",
            ],
            steps: [
              { title: "현재 상태 저장", description: "장비와 각인을 기록해 전후 결과를 비교할 수 있게 합니다." },
              { title: "현재 후보 확인", description: "오래된 표가 아니라 클라이언트의 후보, 비용과 확률을 읽습니다." },
              { title: "중단 조건 설정", description: "허용할 재료 예산과 목표 범위를 먼저 정합니다." },
              { title: "결과별 재확인", description: "매번 조건을 다시 읽고 차이가 생기면 멈춥니다." },
            ],
          },
          {
            id: "imprint-vs-tuning",
            title: "영혼 각인과 영혼 조율 규칙을 섞지 마세요",
            paragraphs: [
              "각인, 초기화와 영혼 조율은 서로 다른 조작 단계입니다. 한 시스템의 확률이나 유지 규칙을 다른 버튼이나 장비 흐름에 바로 적용할 수 없습니다.",
              "자료를 사용할 때 시스템명, 아이템 종류, 조작 화면과 버전 날짜를 맞추세요. 하나라도 다르면 공통 답이 아니라 재확인 대상입니다.",
            ],
          },
        ],
      },
    },
  },
  arcana: {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "arcana-comparison",
            title: "AION2 Arcana 套裝如何做同版本比較？",
            paragraphs: [
              "比較 Arcana 時，把套裝名稱、觸發件數、效果文字、結晶來源、服務地區與核對日期放在同一張表。只有這些條件對齊，才能判斷兩套效果差異來自設計還是版本。",
              "選擇時先寫用途，例如副本推進、單人穩定或特定隊伍配置，再檢查效果是否真的支援該目標。沒有戰鬥環境、角色配置與版本日期的『最佳 Arcana』結論無法重複驗證。",
            ],
            bullets: [
              "同一服務地區與同一版本再比較。",
              "保留完整效果文字，不只抄數值。",
              "把用途、隊伍與觸發條件寫進選擇理由。",
            ],
          },
          {
            id: "arcana-update-check",
            title: "Arcana 更新後要重新確認哪些項目？",
            paragraphs: [
              "版本更新後先核對套裝名稱、件數門檻、效果、結晶取得與是否有轉換或重置說明。任何一項改變，都可能讓舊搭配結論失效。",
              "本站會保留來源與核對日期；實際投入資源前，仍應開啟當前遊戲說明。若頁面與遊戲不同，請附版本、套裝名稱和完整效果畫面回報。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "arcana-comparison",
            title: "Compare AION2 Arcana sets inside one build",
            paragraphs: [
              "Place the set name, piece threshold, full effect text, crystal source, service region, and verification date in one table. Only after those conditions align can a difference be attributed to the sets instead of the build.",
              "Define the purpose first—such as dungeon progression, stable solo play, or a specific party setup—then check whether the effect actually supports it. A “best Arcana” claim without combat context, character setup, and build date cannot be reproduced.",
            ],
            bullets: [
              "Compare the same service region and build.",
              "Keep the complete effect text, not only a number.",
              "Include purpose, party, and trigger conditions in the selection reason.",
            ],
          },
          {
            id: "arcana-update-check",
            title: "What to recheck after an Arcana update",
            paragraphs: [
              "After a release, verify the set name, piece threshold, effect, crystal acquisition, and any conversion or reset notice. A change to any one can invalidate an older setup conclusion.",
              "KINA keeps the source and verification date visible, but you should still open the current in-game description before spending resources. If it differs, report the build, set name, and complete effect screen.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "arcana-comparison",
            title: "같은 버전에서 AION2 아르카나 세트 비교",
            paragraphs: [
              "세트명, 발동 부위 수, 전체 효과 문구, 결정 획득처, 서비스 지역과 확인 날짜를 한 표에 놓으세요. 이 조건이 맞아야 차이가 세트 설계인지 버전 때문인지 판단할 수 있습니다.",
              "던전 진행, 안정적인 솔로 플레이 또는 특정 파티처럼 목적을 먼저 적고 효과가 실제로 그 목표를 지원하는지 확인하세요. 전투 환경, 캐릭터 구성과 버전 날짜가 없는 ‘최고 아르카나’ 결론은 재현할 수 없습니다.",
            ],
            bullets: [
              "같은 서비스 지역과 같은 버전을 비교합니다.",
              "수치만이 아니라 전체 효과 문구를 남깁니다.",
              "용도, 파티와 발동 조건을 선택 이유에 포함합니다.",
            ],
          },
          {
            id: "arcana-update-check",
            title: "아르카나 업데이트 뒤 재확인할 항목",
            paragraphs: [
              "업데이트 뒤 세트명, 부위 수 조건, 효과, 결정 획득과 변환·초기화 안내를 확인하세요. 하나라도 바뀌면 과거 조합 결론이 무효가 될 수 있습니다.",
              "KINA는 출처와 확인 날짜를 표시하지만 자원을 쓰기 전 현재 게임 설명을 열어 보세요. 내용이 다르면 버전, 세트명과 전체 효과 화면을 함께 제보하세요.",
            ],
          },
        ],
      },
    },
  },
  "pet-progression": {
    readingMinutes: 6,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "pet-investment-order",
            title: "AION2 寵物成長的投入順序",
            paragraphs: [
              "先確認目前伺服器內哪些寵物資料由角色共享，再記錄寵物種類、理解度、等級與下一步成本。共享規則會影響重複培養是否有意義，而當前數值與費用仍應從遊戲內讀取。",
              "投入前把目標分成收藏、目前隊伍用途與長期成長三類。先完成能服務明確目標的步驟，並保留資源給尚未確認的系統；不要因為單一排行或舊版本範例就假設存在永久最佳寵物。",
            ],
            steps: [
              { title: "確認共享範圍", description: "先分清伺服器內共享與單一角色狀態。" },
              { title: "記錄當前成長", description: "儲存種類理解度、寵物等級與下一步成本。" },
              { title: "定義本次目標", description: "在收藏、當前用途與長期成長中選擇優先順序。" },
              { title: "更新後複查", description: "版本變化後重新確認共享規則與數值。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "pet-investment-order",
            title: "Order an AION2 pet-progression investment",
            paragraphs: [
              "Confirm which pet records are shared by characters on the current server, then record genus, Genus Insight, level, and the next displayed cost. Sharing rules determine whether duplicate investment is useful; current values and costs still come from the live client.",
              "Split the goal into collection, current-party use, and long-term progression. Complete steps tied to an explicit goal first and preserve resources for systems that remain unconfirmed. One ranking or old-build example does not establish a permanent best pet.",
            ],
            steps: [
              { title: "Confirm sharing", description: "Separate server-wide records from character-specific state." },
              { title: "Record progression", description: "Save genus insight, pet level, and the next displayed cost." },
              { title: "Define the goal", description: "Prioritize collection, current use, or long-term progression." },
              { title: "Recheck after updates", description: "Verify the sharing rule and values again after a build change." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "pet-investment-order",
            title: "AION2 펫 성장 투자 순서",
            paragraphs: [
              "현재 서버에서 캐릭터가 공유하는 펫 정보를 먼저 확인한 뒤 종족, 종족 이해도, 레벨과 다음 비용을 기록하세요. 공유 규칙은 중복 투자의 의미를 결정하고 현재 수치와 비용은 게임 화면에서 읽어야 합니다.",
              "목표를 수집, 현재 파티 용도와 장기 성장으로 나누세요. 분명한 목적에 연결된 단계부터 진행하고 확인되지 않은 시스템을 위해 자원을 남깁니다. 순위 하나나 과거 버전 예시는 영구 최고의 펫을 증명하지 않습니다.",
            ],
            steps: [
              { title: "공유 범위 확인", description: "서버 공유 정보와 캐릭터 개별 상태를 구분합니다." },
              { title: "현재 성장 기록", description: "종족 이해도, 펫 레벨과 다음 비용을 저장합니다." },
              { title: "목표 정의", description: "수집, 현재 용도와 장기 성장의 우선순위를 정합니다." },
              { title: "업데이트 뒤 확인", description: "버전 변경 후 공유 규칙과 수치를 다시 봅니다." },
            ],
          },
        ],
      },
    },
  },
  "equipment-tuning": {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "tuning-session",
            title: "AION2 裝備調律一次操作的檢查表",
            paragraphs: [
              "開始前記錄裝備 ID、等級、品質、當前詞條、調律候選、畫面機率與材料成本。若計劃之後繼承裝備，也要先閱讀繼承畫面列出的保留與重置項目。",
              "每次調律後只比較同一件裝備的前後變化，並重新讀取下一次候選與成本。達到預算或取得可接受結果後停止；若介面與攻略不同，以當前版本為準並保留完整畫面。",
            ],
            bullets: [
              "操作前儲存裝備與詞條完整狀態。",
              "把調律與裝備繼承分成兩個決定。",
              "先定預算與可接受範圍，再開始消耗材料。",
              "版本變化後不沿用舊候選或舊機率表。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "tuning-session",
            title: "AION2 equipment-tuning session checklist",
            paragraphs: [
              "Before acting, record the item ID, level, grade, current affixes, tuning candidates, displayed rates, and material cost. If a later equipment Transfer is planned, read the retention and reset fields shown by that operation first.",
              "After each tuning result, compare the same item's before-and-after state and reread the next candidates and cost. Stop at the budget or acceptable result. If the interface differs from the guide, follow the current build and keep the complete screen.",
            ],
            bullets: [
              "Save the full item and affix state before an operation.",
              "Treat tuning and equipment Transfer as two decisions.",
              "Set the budget and acceptable range before consuming materials.",
              "Do not carry an old candidate or probability table into a new build.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "tuning-session",
            title: "AION2 장비 조율 1회 작업 체크리스트",
            paragraphs: [
              "시작 전 아이템 ID, 레벨, 등급, 현재 옵션, 조율 후보, 화면 확률과 재료 비용을 기록하세요. 이후 장비 계승을 계획한다면 계승 화면의 유지와 초기화 항목도 먼저 읽어야 합니다.",
              "매 조율 뒤 같은 장비의 전후 상태만 비교하고 다음 후보와 비용을 다시 확인하세요. 예산이나 허용 결과에 도달하면 멈춥니다. 화면이 가이드와 다르면 현재 버전을 따르고 전체 화면을 보관하세요.",
            ],
            bullets: [
              "작업 전 장비와 옵션 전체 상태를 저장합니다.",
              "조율과 장비 계승을 서로 다른 결정으로 봅니다.",
              "재료를 쓰기 전에 예산과 허용 범위를 정합니다.",
              "새 버전에 과거 후보나 확률표를 그대로 적용하지 않습니다.",
            ],
          },
        ],
      },
    },
  },
  "elyos-vs-asmodians": {
    readingMinutes: 6,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "faction-decision",
            title: "AION2 天族與魔族選擇檢查表",
            paragraphs: [
              "先問固定隊與公會要進入哪一方、預計選擇哪一區域與伺服器，再比較自己偏好的起始區域、美術與角色設定。陣營會影響可一起遊玩的物件，應該在建立主要角色前取得團隊共識。",
              "不要用社群投票、短期排隊或單一伺服器截圖斷言天族或魔族永久較強。人口、開放狀態與限制會隨伺服器和時間變化，最後選擇前應檢視當前官方伺服器介面。",
            ],
            bullets: [
              "先確認朋友、公會與固定隊的陣營。",
              "再比較起始區域、外觀與世界觀偏好。",
              "建立角色前檢查當前伺服器開放與限制。",
              "若沒有團隊約束，選擇願意長期遊玩的主題即可。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "faction-decision",
            title: "AION2 Elyos or Asmodians decision checklist",
            paragraphs: [
              "Ask which faction, region, and server your regular party or guild plans to use, then compare your preference for the starting region, art direction, and character identity. Faction affects who can play together, so reach a group decision before creating the main character.",
              "A community poll, short queue, or one-server screenshot cannot prove that Elyos or Asmodians are permanently stronger. Population, availability, and restrictions change by server and time; check the current official server interface before the final choice.",
            ],
            bullets: [
              "Confirm the faction used by friends, guild, and regular party.",
              "Then compare the starting area, visual identity, and story preference.",
              "Check current server availability and restrictions before character creation.",
              "Without a group constraint, choose the theme you want to play long term.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "faction-decision",
            title: "AION2 천족·마족 선택 체크리스트",
            paragraphs: [
              "고정 파티나 길드가 어느 종족, 지역과 서버를 선택하는지 먼저 묻고 시작 지역, 미술 방향과 캐릭터 설정 취향을 비교하세요. 종족은 함께 플레이할 대상을 결정하므로 주 캐릭터 생성 전에 팀 합의가 필요합니다.",
              "커뮤니티 투표, 짧은 대기열이나 한 서버 화면으로 천족 또는 마족이 영구적으로 강하다고 결론 내릴 수 없습니다. 인구, 개방 상태와 제한은 서버와 시간에 따라 바뀌므로 현재 공식 서버 화면을 확인하세요.",
            ],
            bullets: [
              "친구, 길드와 고정 파티의 종족을 확인합니다.",
              "그다음 시작 지역, 외형과 세계관 취향을 비교합니다.",
              "캐릭터 생성 전 현재 서버 개방과 제한을 봅니다.",
              "팀 제약이 없다면 오래 플레이하고 싶은 테마를 선택합니다.",
            ],
          },
        ],
      },
    },
  },
  "abyss-status": {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "abyss-session-check",
            title: "AION2 深淵進場前的當日核對",
            paragraphs: [
              "先確認自己檢視的是深淵、混沌深淵還是其他裂縫內容，再從當前遊戲日曆讀取開放時間、入場條件、隊伍規模與獎勵狀態。名稱相近不代表使用同一配對或重新整理規則。",
              "把等級、裝備條件、陣營、隊伍與可用時間一次確認完，再決定是否前往。若攻略數值與遊戲內不同，以當前介面為準，並記錄服務地區與版本，避免把韓國／臺灣現行版條件直接套到全球版。",
            ],
            bullets: [
              "確認玩法全名與目前賽季。",
              "從遊戲日曆讀取當天開放與剩餘時間。",
              "檢查等級、裝備、隊伍和陣營條件。",
              "進入前確認獎勵次數或能量等當前狀態。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "abyss-session-check",
            title: "Same-day AION2 Abyss entry checks",
            paragraphs: [
              "Confirm whether the activity is Abyss, Chaotic Abyss, or a different Rift feature, then read the live calendar for opening time, entry conditions, party size, and reward state. Similar names do not mean the same matchmaking or reset rule.",
              "Check level, gear condition, faction, party, and available time together before traveling. If a guide value differs from the client, follow the current interface and record the service region and build rather than applying a Korea/Taiwan live condition directly to Global.",
            ],
            bullets: [
              "Confirm the full activity name and current season.",
              "Read today's opening and remaining time from the game calendar.",
              "Check level, gear, party, and faction conditions.",
              "Verify the current reward count, energy, or equivalent state before entry.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "abyss-session-check",
            title: "AION2 어비스 당일 입장 확인",
            paragraphs: [
              "어비스, 혼돈의 어비스 또는 다른 균열 콘텐츠 중 무엇인지 먼저 확인하고 현재 게임 달력에서 개방 시간, 입장 조건, 파티 규모와 보상 상태를 읽으세요. 이름이 비슷해도 매칭과 초기화 규칙이 같다는 뜻이 아닙니다.",
              "레벨, 장비 조건, 종족, 파티와 이용 시간을 한 번에 확인한 뒤 이동하세요. 가이드와 게임 수치가 다르면 현재 화면을 따르고 서비스 지역과 버전을 기록해 한국·대만 라이브 조건을 글로벌에 바로 적용하지 않습니다.",
            ],
            bullets: [
              "콘텐츠 전체 이름과 현재 시즌을 확인합니다.",
              "게임 달력에서 오늘 개방과 남은 시간을 읽습니다.",
              "레벨, 장비, 파티와 종족 조건을 확인합니다.",
              "입장 전 보상 횟수나 에너지 등 현재 상태를 봅니다.",
            ],
          },
        ],
      },
    },
  },
  "system-requirements": {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "performance-check",
            title: "用 AION 2 全球 Steam 配備做開服前檢查",
            paragraphs: [
              "先把自己的 Windows PC 對照全球 Steam 最低或建議欄，再依官方 FHD Very Low／Low 目標做實測。符合零件名稱不代表所有城市、大型戰鬥、溫度或背景程式下都能維持相同幀率。",
              "安裝前至少保留 Steam 要求的 100 GB 可用空間並更新 Windows 與顯示驅動；100 GB 不是下載大小。首次進入後從保守畫質開始，觀察溫度、RAM、VRAM、網路與載入，再一次提高一項設定。",
            ],
            steps: [
              { title: "對照全球 Steam 表", description: "只使用本頁的 Windows PC 最低與建議欄，不混入其他服務地區資料。" },
              { title: "確認儲存與驅動", description: "保留至少 100 GB 可用空間，並完成 Windows 與顯示驅動更新。" },
              { title: "建立基準場景", description: "用固定解析度、畫質與場景記錄幀率、溫度和載入。" },
              { title: "逐項調整", description: "一次只改變一個設定，避免無法判斷改善來源。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "performance-check",
            title: "Turn the AION 2 Global Steam specs into a launch benchmark",
            paragraphs: [
              "Compare the Windows PC with the global Steam minimum or recommended column, then test against the official FHD Very Low or Low target. Matching a part name does not guarantee the same frame rate in every city, large fight, temperature, or background-process combination.",
              "Keep at least Steam's required 100 GB of available storage and update Windows plus the graphics driver before installation; 100 GB is not the download size. Start conservatively and observe temperature, RAM, VRAM, network, and loading before raising one setting at a time.",
            ],
            steps: [
              { title: "Use the global Steam table", description: "Use only this page's Windows PC minimum and recommended columns, not another service region's data." },
              { title: "Prepare storage and drivers", description: "Keep at least 100 GB available and update Windows plus the graphics driver." },
              { title: "Create a benchmark scene", description: "Record frame rate, temperature, and loading at a fixed resolution, preset, and scene." },
              { title: "Change one setting", description: "Adjust one variable at a time so the source of an improvement remains visible." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "performance-check",
            title: "아이온2 글로벌 Steam 사양으로 출시 전 성능 확인",
            paragraphs: [
              "Windows PC를 글로벌 Steam 최소 또는 권장 열과 비교한 뒤 공식 FHD Very Low/Low 목표로 실제 테스트하세요. 부품 이름이 조건을 충족해도 모든 도시, 대규모 전투, 온도와 백그라운드 프로그램에서 같은 프레임을 보장하지 않습니다.",
              "설치 전 Steam이 요구하는 100GB 여유 공간을 확보하고 Windows와 그래픽 드라이버를 갱신하세요. 100GB는 다운로드 크기가 아닙니다. 보수적인 설정으로 시작해 온도, RAM, VRAM, 네트워크와 로딩을 본 뒤 하나씩 높입니다.",
            ],
            steps: [
              { title: "글로벌 Steam 표 사용", description: "다른 서비스 지역 자료를 섞지 않고 이 페이지의 Windows PC 최소·권장 열만 사용합니다." },
              { title: "저장 공간과 드라이버 준비", description: "100GB 이상 여유 공간을 확보하고 Windows와 그래픽 드라이버를 갱신합니다." },
              { title: "기준 장면 만들기", description: "고정 해상도, 프리셋과 장면에서 프레임, 온도와 로딩을 기록합니다." },
              { title: "설정 하나씩 변경", description: "한 번에 한 변수만 조정해 개선 원인을 확인합니다." },
            ],
          },
        ],
      },
    },
  },
  "deity-traces": {
    readingMinutes: 6,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "batch-completion-audit",
            title: "Daeva Express 批次完成後的主神痕跡檢查",
            paragraphs: [
              "使用批次完成功能前，先記錄角色、版本與目前已完成項目；操作後重新檢視任務或收集介面，只把實際標成完成的項目列入結果。",
              "官方來源沒有給出所有點位與固定總數，所以『一次完成』不代表地圖上任何相關項目都已清空。仍未完成的內容應依當前遊戲說明處理，不從舊地圖總數推算遺漏。",
            ],
            bullets: [
              "操作前後各儲存一次完成狀態。",
              "確認角色與伺服器版本相同。",
              "只記錄介面實際標示完成的項目。",
              "剩餘項目回到當前任務與地圖說明核對。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "batch-completion-audit",
            title: "Audit Empyrean Traces after Daeva Express batch completion",
            paragraphs: [
              "Before using the batch-completion function, record the character, build, and already-completed entries. Afterward, reopen the quest or collection interface and count only the entries actually marked complete.",
              "The official sources do not provide every coordinate or a fixed universal total, so “batch completion” does not mean every related map entry is cleared. Follow the current quest and map description for anything that remains instead of calculating a missing count from an old map.",
            ],
            bullets: [
              "Save completion state before and after the action.",
              "Keep the character and service build consistent.",
              "Count only entries marked complete by the interface.",
              "Recheck remaining entries in the current quest and map description.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "batch-completion-audit",
            title: "데바 익스프레스 일괄 완료 뒤 주신의 흔적 확인",
            paragraphs: [
              "일괄 완료를 사용하기 전에 캐릭터, 버전과 기존 완료 항목을 기록하세요. 사용 뒤 퀘스트나 수집 화면을 다시 열고 실제 완료로 표시된 항목만 결과에 포함합니다.",
              "공식 출처에는 모든 위치와 고정 총개수가 없으므로 ‘일괄 완료’가 지도상의 관련 항목 전체 삭제를 뜻하지 않습니다. 남은 항목은 과거 지도 총개수로 추정하지 말고 현재 퀘스트와 지도 설명을 따르세요.",
            ],
            bullets: [
              "작업 전후 완료 상태를 각각 저장합니다.",
              "같은 캐릭터와 서비스 버전을 유지합니다.",
              "화면에서 완료 표시된 항목만 셉니다.",
              "남은 항목은 현재 퀘스트와 지도 설명으로 확인합니다.",
            ],
          },
        ],
      },
    },
  },
  "godstone-imprint": {
    readingMinutes: 6,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "candidate-comparison",
            title: "AION2 神石刻印候選比較流程",
            paragraphs: [
              "先固定裝備、材料等級與當前版本，再抄下游戲內顯示的全部候選與機率。材料等級改變時應建立新的候選表，不能把不同材料的結果混在一起排序。",
              "選擇神石前寫下用途與可接受成本，並檢查裝備是否顯示神石刻印欄位。官方資料沒有指定通用最佳神石，任何建議都應說明角色、內容、材料與版本。",
            ],
            steps: [
              { title: "固定輸入", description: "確認裝備、材料等級、服務地區與版本。" },
              { title: "儲存完整候選", description: "記錄所有候選與顯示機率，不只擷取想要的一項。" },
              { title: "檢查適用欄位", description: "確認目標裝備當前可使用神石刻印。" },
              { title: "按用途決定", description: "以當前玩法與預算選擇，不把建議寫成永久排名。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "candidate-comparison",
            title: "AION2 Godstone Imprint candidate comparison",
            paragraphs: [
              "Hold the item, material grade, and build constant, then copy the complete candidate pool and displayed rates from the client. A different material grade requires a new candidate table; results from different inputs should not be merged into one ranking.",
              "Define the use and acceptable cost before choosing a Godstone, and confirm that the target item exposes a Godstone Imprint field. Official records do not name one universal best Godstone, so a recommendation must include character, content, material, and build.",
            ],
            steps: [
              { title: "Fix the inputs", description: "Confirm the item, material grade, service region, and build." },
              { title: "Save the full pool", description: "Record every candidate and displayed rate, not only the desired result." },
              { title: "Check item support", description: "Verify that the target item currently exposes a Godstone Imprint field." },
              { title: "Choose by use", description: "Decide from the current activity and budget, not a permanent ranking claim." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "candidate-comparison",
            title: "AION2 신석 각인 후보 비교 절차",
            paragraphs: [
              "장비, 재료 등급과 버전을 고정한 뒤 게임에 표시된 전체 후보와 확률을 기록하세요. 재료 등급이 바뀌면 새 후보표를 만들어야 하며 서로 다른 입력의 결과를 한 순위로 합치면 안 됩니다.",
              "신석 선택 전 용도와 허용 비용을 적고 장비에 신석 각인 항목이 표시되는지 확인하세요. 공식 자료는 공통 최고의 신석을 정하지 않으므로 추천에는 캐릭터, 콘텐츠, 재료와 버전이 필요합니다.",
            ],
            steps: [
              { title: "입력 고정", description: "장비, 재료 등급, 서비스 지역과 버전을 확인합니다." },
              { title: "전체 후보 저장", description: "원하는 항목만이 아니라 모든 후보와 표시 확률을 기록합니다." },
              { title: "장비 지원 확인", description: "대상 장비가 현재 신석 각인 항목을 제공하는지 봅니다." },
              { title: "용도로 선택", description: "현재 콘텐츠와 예산으로 결정하고 영구 순위를 만들지 않습니다." },
            ],
          },
        ],
      },
    },
  },
  "kinah-bound": {
    readingMinutes: 6,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "bound-kinah-ledger",
            title: "AION2 綁定基納的收支記錄方式",
            paragraphs: [
              "把一般基納與綁定基納分成兩欄，記錄來源、數量、日期、服務地區與可購買項目。只有當前介面明確接受綁定基納的項目，才應列入可用範圍。",
              "付款前確認介面實際扣除哪一種貨幣，並保留餘額畫面。不要假設兩種基納可互換、轉移或用於所有相同商店；版本更新後也要重新核對接受範圍。",
            ],
            bullets: [
              "一般基納與綁定基納分開記帳。",
              "每筆記錄服務地區、版本、來源與用途。",
              "消費前看清貨幣圖示與扣除順序。",
              "未由當前介面證明的交換或轉移一律視為未知。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "bound-kinah-ledger",
            title: "Keep an AION2 Kina (Bound) income and spending ledger",
            paragraphs: [
              "Separate normal Kina and Kina (Bound) into two columns with source, amount, date, service region, and accepted purchase. Include an item in the usable range only when the current interface explicitly accepts the bound currency.",
              "Before a purchase, verify which currency the interface will deduct and preserve the balance screen. Do not assume the two currencies convert, transfer, or work in every similar shop; recheck the accepted scope after a release.",
            ],
            bullets: [
              "Track normal and bound Kina separately.",
              "Record service region, build, source, and use for every entry.",
              "Read the currency icon and deduction order before spending.",
              "Treat any unconfirmed conversion or transfer as unknown.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "bound-kinah-ledger",
            title: "AION2 각인 키나 수입·지출 기록",
            paragraphs: [
              "일반 키나와 각인 키나를 두 열로 나누고 출처, 수량, 날짜, 서비스 지역과 구매 가능 항목을 기록하세요. 현재 화면이 각인 키나를 명시적으로 받는 항목만 사용 범위에 포함합니다.",
              "구매 전 어떤 화폐가 차감되는지 확인하고 잔액 화면을 보관하세요. 두 키나가 전환·이전되거나 비슷한 모든 상점에서 사용된다고 가정하지 말고 업데이트 뒤 허용 범위를 다시 봅니다.",
            ],
            bullets: [
              "일반 키나와 각인 키나를 따로 기록합니다.",
              "각 항목에 서비스 지역, 버전, 출처와 용도를 남깁니다.",
              "지출 전 화폐 아이콘과 차감 순서를 확인합니다.",
              "확인되지 않은 전환이나 이전은 알 수 없음으로 둡니다.",
            ],
          },
        ],
      },
    },
  },
  "global-monetization-watchlist": {
    readingMinutes: 9,
    updatedAt: "2026-07-26",
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "shop-evaluation",
            title: "AION 2 全球版商品上線後如何重新核對？",
            paragraphs: [
              "目前可用的基準是：基本遊戲免費、會員規劃每月 15 美元、Market 與 Exchange 需有效會員、Daeva Pass 逐角色。商品上線後先核對這四項是否改動，再記錄實際區域價格、貨幣、綁定、適用角色／帳號、購買次數、期限、續訂與退款入口。",
              "任何未公布欄位都保留為未知，尤其是 Quna 套裝、交換率、完整會員權益、Pass 定價與直接玩家交易。Founder’s Pack 是另一項一次性商品，不能用它推算會員月費或包含會員。",
            ],
            bullets: [
              "儲存官方商品頁與核對日期。",
              "逐項記錄會員、角色／帳號範圍、期限、次數與退款條件。",
              "區分已確認文字、介面觀察與個人價值判斷。",
              "商品更新後重新比較，不沿用舊價格或舊內容。",
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "shop-evaluation",
            title: "How to recheck AION 2 Global products at launch",
            paragraphs: [
              "The current baseline is a free base game, a planned $15 monthly Membership, active-Membership access for the Market and Exchange, and a per-character Daeva Pass. At launch, first check whether those four facts changed, then record regional price, currency, binding, character/account scope, purchase limit, duration, renewal, and refund entry.",
              "Keep every unpublished field unknown, especially Quna packs, exchange rates, the full Membership list, Pass pricing, and direct player trading. Founder's Packs are separate one-time products and cannot be used to infer monthly Membership or Membership inclusion.",
            ],
            bullets: [
              "Save the official product page and verification date.",
              "Record Membership, character/account scope, duration, limit, and refund terms separately.",
              "Separate confirmed text, interface observation, and personal value judgment.",
              "Recompare after a product update instead of carrying forward an old price or bundle.",
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "shop-evaluation",
            title: "아이온2 글로벌 상품 출시 후 다시 확인하는 방법",
            paragraphs: [
              "현재 기준은 기본 게임 무료, 월 15달러 멤버십 계획, 거래소·교환소의 활성 멤버십 요구, 캐릭터별 데바 패스입니다. 출시 때 먼저 이 네 가지가 바뀌었는지 확인하고 지역 가격, 재화, 귀속, 캐릭터·계정 범위, 구매 횟수, 기간, 갱신과 환불 진입점을 기록하세요.",
              "큐나 묶음, 교환 비율, 전체 멤버십 혜택, 패스 가격과 직접 거래처럼 공개되지 않은 필드는 미확인으로 둡니다. Founder's Pack은 별도 일회성 상품이므로 월 멤버십이나 멤버십 포함 여부를 추정할 수 없습니다.",
            ],
            bullets: [
              "공식 상품 페이지와 확인 날짜를 저장합니다.",
              "멤버십, 캐릭터·계정 범위, 기간, 횟수와 환불 조건을 따로 기록합니다.",
              "확인 문구, 화면 관찰과 개인 가치 판단을 구분합니다.",
              "상품 업데이트 뒤 과거 가격과 구성을 그대로 사용하지 않습니다.",
            ],
          },
        ],
      },
    },
  },
  "aether-extraction": {
    readingMinutes: 7,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "extraction-session",
            title: "AION2 精氣提取一次採集流程",
            paragraphs: [
              "達到目前版本的開放條件後，先確認採集物件、提取等級、成功／失敗計量與可獲得技能點，再開始一輪嘗試。畫面顯示的條件不同，就不要沿用舊路線。",
              "完成後記錄實際結果、技能點變化、材料名稱與位置，並區分固定機制與這次觀察。若目標是規劃長期材料路線，還要重新確認當前地圖分佈、需求與伺服器市場，而不能只靠機制說明。",
            ],
            steps: [
              { title: "確認條件", description: "檢查等級、提取等級、物件與當前畫面提示。" },
              { title: "觀察計量", description: "記錄成功與失敗計量如何變化，不預設單次結果。" },
              { title: "儲存結果", description: "記下技能點、材料、位置、日期與服務地區。" },
              { title: "再規劃路線", description: "用當前地圖和實際需求安排下一輪，不把舊路線當永久答案。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "extraction-session",
            title: "One AION2 aether-extraction session workflow",
            paragraphs: [
              "After meeting the current build's access condition, confirm the node, extraction level, success/failure gauges, and available skill-point result before beginning a set of attempts. If the screen differs, do not carry forward an old route.",
              "Record the actual result, skill-point change, material name, and location, separating the fixed mechanic from this observation. A long-term material route also needs the current map distribution, demand, and server market; the mechanic alone cannot supply it.",
            ],
            steps: [
              { title: "Confirm access", description: "Check level, extraction level, node, and current interface prompt." },
              { title: "Observe the gauges", description: "Record how success and failure gauges change without assuming one outcome." },
              { title: "Save the result", description: "Note skill points, material, location, date, and service region." },
              { title: "Plan the next route", description: "Use the current map and actual demand instead of treating an old route as permanent." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "extraction-session",
            title: "AION2 정기추출 1회 채집 흐름",
            paragraphs: [
              "현재 버전의 이용 조건을 충족한 뒤 채집 대상, 추출 레벨, 성공·실패 게이지와 획득 가능한 스킬 포인트를 확인하고 시도를 시작하세요. 화면 조건이 다르면 과거 경로를 그대로 쓰지 않습니다.",
              "완료 뒤 실제 결과, 스킬 포인트 변화, 재료명과 위치를 기록하고 고정 규칙과 이번 관찰을 구분하세요. 장기 재료 경로에는 현재 지도 분포, 수요와 서버 시장도 필요하므로 메커니즘 설명만으로 결정할 수 없습니다.",
            ],
            steps: [
              { title: "조건 확인", description: "레벨, 추출 레벨, 대상과 현재 화면 안내를 봅니다." },
              { title: "게이지 관찰", description: "한 결과를 가정하지 않고 성공·실패 게이지 변화를 기록합니다." },
              { title: "결과 저장", description: "스킬 포인트, 재료, 위치, 날짜와 서비스 지역을 남깁니다." },
              { title: "다음 경로 계획", description: "현재 지도와 실제 수요로 계획하고 과거 경로를 영구 답으로 쓰지 않습니다." },
            ],
          },
        ],
      },
    },
  },
  "crafting-and-transfer-crafting": {
    readingMinutes: 8,
    translations: {
      "zh-hant": {
        sections: [
          {
            id: "crafting-plan",
            title: "AION2 製作材料計算與繼承製作檢查表",
            paragraphs: [
              "先選定當前配方與目標數量，再把每次產量、直接材料與下層材料輸入本站材料計算器。計算結果用於整理需求，不代表倉庫庫存、市場價格、Combo 結果或遊戲內成功狀態。",
              "進行繼承製作前，另存原裝備與目標裝備的完整畫面，並逐項讀取介面標示的保留與重置內容。配方、數量或規則只要更新，就重新計算，不在舊結果上手動補差額。",
            ],
            steps: [
              { title: "核對當前配方", description: "確認製作分類、目標物、每次產量與版本。" },
              { title: "展開材料層級", description: "用計算器彙總直接與下層材料，並與遊戲介面複核。" },
              { title: "檢查庫存與缺口", description: "把已持有、需要製作與需要取得的數量分開。" },
              { title: "繼承前儲存狀態", description: "記錄原裝備、目標裝備和介面列出的保留／重置項目。" },
            ],
          },
        ],
      },
      en: {
        sections: [
          {
            id: "crafting-plan",
            title: "AION2 crafting-material and Transfer Crafting checklist",
            paragraphs: [
              "Choose the current recipe and target quantity, then enter output per craft, direct ingredients, and lower-tier ingredients into the material calculator. The result organizes requirements; it does not represent inventory, market price, Combo outcome, or live success state.",
              "Before Transfer Crafting, save complete screens of the source and target items and read every retained and reset field shown by the interface. If the recipe, quantity, or rule changes, recalculate from the current record instead of manually patching an old total.",
            ],
            steps: [
              { title: "Verify the live recipe", description: "Confirm category, target item, output per craft, and build." },
              { title: "Expand ingredient layers", description: "Use the calculator for direct and lower-tier materials, then compare with the client." },
              { title: "Separate inventory and deficit", description: "Track owned, crafted, and still-required quantities independently." },
              { title: "Save state before Transfer", description: "Record source, target, and every retention or reset field displayed." },
            ],
          },
        ],
      },
      ko: {
        sections: [
          {
            id: "crafting-plan",
            title: "AION2 제작 재료 계산과 계승 제작 체크리스트",
            paragraphs: [
              "현재 도안과 목표 수량을 선택한 뒤 1회 생산량, 직접 재료와 하위 재료를 재료 계산기에 입력하세요. 계산 결과는 필요량 정리이며 창고 재고, 시세, Combo 결과나 게임 내 성공 상태를 의미하지 않습니다.",
              "계승 제작 전 원본과 목표 장비 전체 화면을 저장하고 인터페이스가 표시한 유지·초기화 항목을 하나씩 읽으세요. 도안, 수량이나 규칙이 바뀌면 과거 합계에 차이를 더하지 말고 현재 자료로 다시 계산합니다.",
            ],
            steps: [
              { title: "현재 도안 확인", description: "제작 분류, 목표 아이템, 1회 생산량과 버전을 봅니다." },
              { title: "재료 단계 펼치기", description: "계산기로 직접·하위 재료를 합산하고 게임 화면과 비교합니다." },
              { title: "재고와 부족분 구분", description: "보유, 제작 필요와 추가 획득 수량을 따로 기록합니다." },
              { title: "계승 전 상태 저장", description: "원본, 목표와 표시된 유지·초기화 항목을 남깁니다." },
            ],
          },
        ],
      },
    },
  },
} as const satisfies Record<string, GuideEnhancement>;

function titlePrimaryKeyword(title: string) {
  const colonIndex = title.search(/[：:]/u);
  if (colonIndex > 0) {
    return title
      .slice(0, colonIndex)
      .trim()
      .replace(/攻略$/u, "")
      .replace(/\s+Guide$/iu, "")
      .replace(/\s*가이드$/u, "")
      .trim();
  }

  const questionIndex = title.search(/[？?]/u);
  if (questionIndex > 0) return title.slice(0, questionIndex).trim();

  return title.trim();
}

function localizedReadingTime(locale: ContentLocale, readingMinutes: number) {
  if (locale === "zh-hant") return `約 ${readingMinutes} 分鐘`;
  if (locale === "ko") return `약 ${readingMinutes}분`;
  return `${readingMinutes} min read`;
}

function withPrimaryKeyword(
  content: LocalizedContent,
  additionalSections: readonly SeoContentSectionBlock[],
  locale: ContentLocale,
  readingMinutes: number,
): LocalizedContent {
  const primaryKeyword = titlePrimaryKeyword(content.title);
  const keywords = [
    primaryKeyword,
    ...(content.keywords ?? []).filter(
      (keyword) => keyword.toLocaleLowerCase() !== primaryKeyword.toLocaleLowerCase(),
    ),
  ];

  return {
    ...content,
    readingTime: localizedReadingTime(locale, readingMinutes),
    keywords,
    sections: [...content.sections, ...additionalSections],
  };
}

export function applyGuideDepthEnhancement(entry: ContentEntry): ContentEntry {
  if (entry.section !== "guides") return entry;

  const enhancement: GuideEnhancement | undefined =
    guideEnhancements[entry.slug as keyof typeof guideEnhancements];
  const readingMinutes = enhancement?.readingMinutes ?? entry.readingMinutes;

  return {
    ...entry,
    ...(enhancement
      ? {
          readingMinutes,
          updatedAt: enhancement.updatedAt ?? "2026-07-24",
          ...(enhancement.related ? { related: enhancement.related } : {}),
        }
      : {}),
    translations: {
      ...entry.translations,
      ...Object.fromEntries(
        contentLocales.map((locale) => [
          locale,
          withPrimaryKeyword(
            entry.translations[locale],
            enhancement?.translations[locale]?.sections ?? [],
            locale,
            readingMinutes,
          ),
        ]),
      ),
    } as ContentEntry["translations"],
  };
}
