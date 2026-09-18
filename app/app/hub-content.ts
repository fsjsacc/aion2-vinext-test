import type { SiteLocale, SiteSection } from "./site-config";

export type HubSection = Exclude<SiteSection, "home" | "codes">;

export type HubCard = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  action: string;
};

export type HubContent = {
  kicker: string;
  title: string;
  description: string;
  availability: string;
  cards: readonly HubCard[];
  exploreLabel: string;
};

const establishedHubContent: Record<
  "zh-hant" | "en" | "ko",
  Record<HubSection, HubContent>
> = {
  "zh-hant": {
    guides: {
      kicker: "玩家攻略",
      title: "AION2 攻略：新手、系統與養成指南",
      description:
        "查找新手路線、系統解析、遠征機制與版本養成建議；每篇攻略均標示來源、適用版本與更新時間。",
      availability: "可從全球預先登錄、翅膀強化、時空裂縫與帳號安全等主題開始閱讀。",
      cards: [
        {
          eyebrow: "入門指南",
          title: "全球版預先登錄",
          description: "確認官方入口、期間、獎勵與帳號安全邊界。",
          href: "/aion-2-pre-registration/",
          action: "查看核對指南",
        },
        {
          eyebrow: "系統查核",
          title: "翅膀強化資料邊界",
          description: "分清官方已確認內容與尚未公開的材料、機率及順序。",
          href: "/guides/wing-enhancement/",
          action: "閱讀翅膀指南",
        },
        {
          eyebrow: "世界探索",
          title: "用互動地圖規劃探索",
          description: "查找地區、世界首領、採集點與收集項目。",
          href: "/tools/map/",
          action: "開啟互動地圖",
        },
      ],
      exploreLabel: "繼續探索其他內容中心",
    },
    classes: {
      kicker: "職業與 BUILD",
      title: "AION2 職業與 Build 規劃",
      description:
        "比較職業武器、核心循環、操作難度、隊伍定位與 PvE／PvP 玩法，再依自己的目標規劃 Build。",
      availability: "可查看九職業總覽、個別職業攻略、五維難度比較與 Build 規劃方法。",
      cards: [
        {
          eyebrow: "職業索引",
          title: "拳星 Brawler 官方基礎",
          description: "查看拳甲、Rage、Rampage 與目前可證實的職業定位。",
          href: "/classes/brawler/",
          action: "查看拳星資料",
        },
        {
          eyebrow: "BUILD 方法",
          title: "Build 規劃方法",
          description: "用玩法情境、資源限制、替代配置與測試紀錄比較方案。",
          href: "/classes/class-planning-framework/",
          action: "查看規劃方法",
        },
        {
          eyebrow: "玩家工具",
          title: "用測驗找到適合的職業",
          description: "依操作節奏、隊伍定位與 PvE／PvP 偏好取得三個職業建議。",
          href: "/tools/class-finder/",
          action: "開始職業測驗",
        },
      ],
      exploreLabel: "連接攻略、資料與工具",
    },
    database: {
      kicker: "參考資料",
      title: "AION2 資料庫：物品、技能與地區",
      description:
        "搜尋 AION2 裝備、材料與消耗品，依名稱、官方 ID、分類、品級或職業限制縮小結果。",
      availability: "物品資料庫提供三語名稱、屬性摘要、交易狀態、官方來源與資料更新日期。",
      cards: [
        {
          eyebrow: "物品",
          title: "搜尋物品與成長材料",
          description: "查看裝備、材料、消耗品與強化道具的分類、限制和屬性摘要。",
          href: "/database/",
          action: "開啟物品資料庫",
        },
        {
          eyebrow: "資料指南",
          title: "看懂物品與地圖資料",
          description: "了解更新日期、未知欄位、多語名稱與座標應如何閱讀。",
          href: "/database/map-data-methodology/",
          action: "查看資料閱讀指南",
        },
        {
          eyebrow: "世界資料",
          title: "從地圖查看世界資料",
          description: "目前可先由互動地圖瀏覽地區、點位與世界首領。",
          href: "/tools/map/",
          action: "瀏覽世界地圖",
        },
      ],
      exploreLabel: "前往相關內容中心",
    },
    tools: {
      kicker: "玩家工具",
      title: "AION2 工具：互動地圖與玩家規劃",
      description:
        "使用互動地圖、職業推薦器、製作材料計算器與每日清單，安排探索、養成與日常活動。",
      availability: "工具中心提供十種介面語言，可在手機與桌面裝置上使用。",
      cards: [
        {
          eyebrow: "現已上線",
          title: "AION2 互動地圖",
          description: "搜尋地區、世界首領、採集點、收集品與數千個地圖點位。",
          href: "/tools/map/",
          action: "開啟地圖",
        },
        {
          eyebrow: "職業推薦",
          title: "AION2 職業推薦器",
          description: "依操作難度、隊伍定位與 PvE／PvP 偏好找到適合的職業。",
          href: "/tools/class-finder/",
          action: "開始職業測驗",
        },
        {
          eyebrow: "製作資料",
          title: "製作配方與材料計算器",
          description: "搜尋製作配方，計算直接或基礎材料需求、庫存缺口與自訂單價成本。",
          href: "/tools/material-calculator/",
          action: "搜尋製作配方",
        },
      ],
      exploreLabel: "工具需要的攻略與資料",
    },
    news: {
      kicker: "AION2 新聞",
      title: "AION2 新聞：官方消息與版本情報",
      description:
        "新聞中心以 NC 與平台一手來源整理全球發布、版本更新、副本與系統變動，並把公告事實、歷史活動和全球版未確認範圍分開標示。",
      availability: "每篇消息均分開標示原文日期、本站核對日期、適用地區與版本範圍。",
      cards: [
        {
          eyebrow: "官方更新",
          title: "全球版：9/30 搶先，正式上線日期待確認",
          description: "核對 NC 與 Steam 欄位差異，整理五日搶先遊玩、平台、地區，以及仍待官方統一確認的正式日期與開服時刻。",
          href: "/aion-2-release-date/",
          action: "查看上線指南",
        },
        {
          eyebrow: "兌換碼",
          title: "AION2 兌換碼一覽",
          description: "查看目前可用的 AION2CHAPTERONE、官方期限、歷史代碼與兌換教學。",
          href: "/codes/",
          action: "查看兌換碼",
        },
        {
          eyebrow: "長期內容",
          title: "從新聞回到完整攻略",
          description: "前往攻略中心查看不受短期消息限制的玩法與系統說明。",
          href: "/guides/",
          action: "查看攻略中心",
        },
      ],
      exploreLabel: "查找相關攻略與工具",
    },
  },
  en: {
    guides: {
      kicker: "PLAYER GUIDES",
      title: "AION2 Guides: New Player, Systems & Progression",
      description:
        "Find new-player routes, system explainers, expedition mechanics, and version-aware progression advice with clear sources and update dates.",
      availability: "Start with global pre-registration, wing enhancement, rifts, third-party tools, or account-safety guides.",
      cards: [
        {
          eyebrow: "START HERE",
          title: "Global pre-registration",
          description: "Check the official entry point, timing, rewards, and account-safety boundary.",
          href: "/aion-2-pre-registration/",
          action: "Read verified guide",
        },
        {
          eyebrow: "SYSTEM CHECK",
          title: "Wing enhancement evidence boundary",
          description: "Separate confirmed facts from unpublished materials, rates, and upgrade order.",
          href: "/guides/wing-enhancement/",
          action: "Read wing guide",
        },
        {
          eyebrow: "WORLD ROUTE",
          title: "Plan exploration on the map",
          description: "Find regions, world bosses, gathering points, and collectables.",
          href: "/tools/map/",
          action: "Open interactive map",
        },
      ],
      exploreLabel: "Explore the other KINA hubs",
    },
    classes: {
      kicker: "CLASSES & BUILDS",
      title: "AION2 Classes & Build Planning",
      description:
        "Compare class weapons, core loops, execution difficulty, party roles, and PvE or PvP playstyles before shaping a build for your goals.",
      availability: "Browse the nine-class overview, individual guides, five-dimension difficulty comparison, and practical build-planning method.",
      cards: [
        {
          eyebrow: "CLASS INDEX",
          title: "Official Brawler basics",
          description: "Review Gauntlets, Rage, Rampage, and the role supported by NC's release.",
          href: "/classes/brawler/",
          action: "View Brawler profile",
        },
        {
          eyebrow: "BUILD METHOD",
          title: "Build-planning method",
          description: "Compare options by activity, constraints, alternatives, and repeatable test notes.",
          href: "/classes/class-planning-framework/",
          action: "View planning method",
        },
        {
          eyebrow: "PLAYER TOOLS",
          title: "Find a class that fits you",
          description: "Get three class suggestions based on combat pace, party role, and PvE or PvP preference.",
          href: "/tools/class-finder/",
          action: "Start class finder",
        },
      ],
      exploreLabel: "Connect guides, data, and tools",
    },
    database: {
      kicker: "REFERENCE DATA",
      title: "AION2 Database: Items, Skills & Regions",
      description:
        "Search AION2 equipment, materials, and consumables by name, official ID, category, grade, or class restriction.",
      availability: "Item records include localized names, stat summaries, trade status, official sources, and update dates.",
      cards: [
        {
          eyebrow: "ITEMS",
          title: "Search items and progression materials",
          description: "Browse equipment, materials, consumables, and upgrade items with filters and stat summaries.",
          href: "/database/",
          action: "Open item database",
        },
        {
          eyebrow: "DATA GUIDE",
          title: "How to read item and map data",
          description: "Understand update dates, unknown fields, localized names, and map coordinates.",
          href: "/database/map-data-methodology/",
          action: "Open data guide",
        },
        {
          eyebrow: "WORLD DATA",
          title: "Browse world data on the map",
          description: "The interactive map already exposes regions, points of interest, and world bosses.",
          href: "/tools/map/",
          action: "Browse world map",
        },
      ],
      exploreLabel: "Visit related KINA hubs",
    },
    tools: {
      kicker: "PLAYER TOOLS",
      title: "AION2 Tools: Interactive Map & Player Planners",
      description:
        "Use the interactive map, class finder, crafting calculator, and daily checklist to organize exploration, progression, and recurring activities.",
      availability: "The tool center is available in ten interface languages on mobile and desktop.",
      cards: [
        {
          eyebrow: "LIVE NOW",
          title: "AION2 Interactive Map",
          description: "Search regions, world bosses, gathering nodes, collectables, and thousands of map points.",
          href: "/tools/map/",
          action: "Open map",
        },
        {
          eyebrow: "CLASS FINDER",
          title: "AION2 Class Finder",
          description: "Match classes by execution difficulty, party role, and PvE or PvP preference.",
          href: "/tools/class-finder/",
          action: "Start class finder",
        },
        {
          eyebrow: "CRAFTING DATABASE",
          title: "Crafting recipe and material calculator",
          description: "Search recipes and calculate direct or base materials, inventory shortages, and custom-price costs.",
          href: "/tools/material-calculator/",
          action: "Search crafting recipes",
        },
      ],
      exploreLabel: "Guides and data behind the tools",
    },
    news: {
      kicker: "AION2 NEWS",
      title: "AION2 News: Official Updates & Patch Intel",
      description:
        "The newsroom uses first-party NC and platform sources for global release, patch, dungeon, and system updates while separating confirmed facts, historical events, and unknown global-build details.",
      availability: "Each report shows the original publication date, KINA verification date, regional scope, and relevant version.",
      cards: [
        {
          eyebrow: "OFFICIAL UPDATES",
          title: "Sep 30 Early Access; full launch confirmation pending",
          description: "Cross-check NC and Steam fields for five-day access, platforms, regions, and the full-launch date and opening hour still awaiting one consistent official notice.",
          href: "/aion-2-release-date/",
          action: "Read the launch guide",
        },
        {
          eyebrow: "COUPON CODES",
          title: "AION2 coupon code registry",
          description: "See the active AION2CHAPTERONE code, official dates, code history, and redemption guide.",
          href: "/codes/",
          action: "View coupon codes",
        },
        {
          eyebrow: "EVERGREEN CONTEXT",
          title: "Move from news to a complete guide",
          description: "Visit the guide hub for systems and playstyles that outlive a short news cycle.",
          href: "/guides/",
          action: "View guide hub",
        },
      ],
      exploreLabel: "Find related guides and tools",
    },
  },
  ko: {
    guides: {
      kicker: "플레이어 공략",
      title: "AION2 공략: 초보자, 시스템과 성장 가이드",
      description:
        "신규 플레이어 루트, 시스템 해설, 원정 기믹과 버전별 성장 조언을 명확한 출처 및 업데이트 날짜와 함께 확인하세요.",
      availability: "글로벌 사전등록, 날개 강화, 시공의 균열, 제3자 도구 또는 계정 보안 공략부터 시작할 수 있습니다.",
      cards: [
        {
          eyebrow: "시작 가이드",
          title: "글로벌 사전등록",
          description: "공식 진입점, 기간, 보상과 계정 보안 경계를 확인합니다.",
          href: "/aion-2-pre-registration/",
          action: "검증 가이드 보기",
        },
        {
          eyebrow: "시스템 확인",
          title: "날개 강화 정보 경계",
          description: "공식 확인 내용과 미공개 재료, 확률 및 순서를 구분합니다.",
          href: "/guides/wing-enhancement/",
          action: "날개 가이드 보기",
        },
        {
          eyebrow: "월드 탐험",
          title: "지도에서 탐험 계획하기",
          description: "지역, 월드 보스, 채집 지점과 수집 요소를 찾아보세요.",
          href: "/tools/map/",
          action: "인터랙티브 지도 열기",
        },
      ],
      exploreLabel: "다른 KINA 허브 둘러보기",
    },
    classes: {
      kicker: "직업과 빌드",
      title: "AION2 직업과 빌드 가이드",
      description:
        "직업별 무기, 핵심 전투 흐름, 조작 난이도, 파티 역할과 PvE·PvP 방식을 비교하고 목표에 맞는 빌드를 계획하세요.",
      availability: "아홉 직업 개요, 개별 공략, 5개 기준 난이도 비교와 실전 빌드 계획 방법을 확인할 수 있습니다.",
      cards: [
        {
          eyebrow: "직업 목록",
          title: "권성 공식 기초",
          description: "권갑, 분노, 폭주와 공식 발표로 확인되는 역할을 살펴봅니다.",
          href: "/classes/brawler/",
          action: "권성 정보 보기",
        },
        {
          eyebrow: "빌드 방법",
          title: "빌드 계획 방법",
          description: "활동, 제한 조건, 대체 구성과 반복 가능한 테스트 기록으로 선택지를 비교합니다.",
          href: "/classes/class-planning-framework/",
          action: "계획 방법 보기",
        },
        {
          eyebrow: "플레이어 도구",
          title: "나에게 맞는 직업 찾기",
          description: "전투 속도, 파티 역할과 PvE·PvP 선호도에 따라 세 가지 직업을 추천받으세요.",
          href: "/tools/class-finder/",
          action: "직업 추천 시작",
        },
      ],
      exploreLabel: "공략, 데이터와 도구 연결하기",
    },
    database: {
      kicker: "참고 데이터",
      title: "AION2 데이터베이스: 아이템, 스킬과 지역",
      description:
        "AION2 장비, 재료와 소모품을 이름, 공식 ID, 분류, 등급 또는 직업 제한으로 검색하세요.",
      availability: "아이템 정보에서 다국어 이름, 옵션 요약, 거래 상태, 공식 출처와 업데이트 날짜를 확인할 수 있습니다.",
      cards: [
        {
          eyebrow: "아이템",
          title: "아이템과 성장 재료 검색",
          description: "장비, 재료, 소모품과 강화 아이템을 필터와 옵션 요약으로 살펴보세요.",
          href: "/database/",
          action: "아이템 데이터베이스 열기",
        },
        {
          eyebrow: "데이터 안내",
          title: "아이템과 지도 정보 읽는 법",
          description: "업데이트 날짜, 알 수 없는 필드, 다국어 이름과 지도 좌표를 이해하세요.",
          href: "/database/map-data-methodology/",
          action: "데이터 안내 보기",
        },
        {
          eyebrow: "월드 데이터",
          title: "지도에서 월드 데이터 보기",
          description: "현재 인터랙티브 지도에서 지역, 지점과 월드 보스를 확인할 수 있습니다.",
          href: "/tools/map/",
          action: "월드 지도 보기",
        },
      ],
      exploreLabel: "관련 KINA 허브로 이동",
    },
    tools: {
      kicker: "플레이어 도구",
      title: "AION2 도구: 인터랙티브 지도와 플래너",
      description:
        "인터랙티브 지도, 직업 추천기, 제작 재료 계산기와 체크리스트로 탐험, 성장과 반복 활동을 정리하세요.",
      availability: "도구 센터는 모바일과 데스크톱에서 10개 인터페이스 언어를 지원합니다.",
      cards: [
        {
          eyebrow: "이용 가능",
          title: "AION2 인터랙티브 지도",
          description: "지역, 월드 보스, 채집 지점, 수집 요소와 수천 개의 지도 포인트를 검색하세요.",
          href: "/tools/map/",
          action: "지도 열기",
        },
        {
          eyebrow: "직업 추천",
          title: "AION2 직업 추천기",
          description: "조작 난이도, 파티 역할과 PvE·PvP 선호도에 맞는 직업을 찾아보세요.",
          href: "/tools/class-finder/",
          action: "직업 추천 시작",
        },
        {
          eyebrow: "제작 데이터",
          title: "제작 레시피 및 재료 계산기",
          description: "레시피를 검색하고 직접 또는 기본 재료, 보유량 부족분과 사용자 입력 단가 비용을 계산합니다.",
          href: "/tools/material-calculator/",
          action: "제작 레시피 검색",
        },
      ],
      exploreLabel: "도구와 연결되는 공략 및 데이터",
    },
    news: {
      kicker: "AION2 뉴스",
      title: "AION2 뉴스: 공식 소식과 업데이트",
      description:
        "NC와 플랫폼의 1차 출처로 글로벌 출시, 패치, 던전과 시스템 업데이트를 정리하고 확인된 사실, 지난 이벤트와 글로벌 빌드 미확인 범위를 구분합니다.",
      availability: "각 소식에 원문 날짜, KINA 확인일, 적용 지역과 관련 버전을 구분해 표시합니다.",
      cards: [
        {
          eyebrow: "공식 업데이트",
          title: "9월 30일 얼리 액세스·정식 출시는 확인 대기",
          description: "NC와 Steam 표시 차이를 대조해 5일 얼리 액세스, 플랫폼, 지역 및 일치하는 공식 확인을 기다리는 정식 날짜와 오픈 시각을 정리합니다.",
          href: "/aion-2-release-date/",
          action: "출시 가이드 보기",
        },
        {
          eyebrow: "쿠폰 코드",
          title: "AION2 쿠폰 코드 목록",
          description: "사용 가능한 AION2CHAPTERONE, 공식 기간, 지난 코드와 등록 방법을 확인하세요.",
          href: "/codes/",
          action: "쿠폰 코드 보기",
        },
        {
          eyebrow: "상시 정보",
          title: "뉴스에서 전체 공략으로 이동",
          description: "짧은 뉴스 주기를 넘어서는 시스템과 플레이 방식은 공략 허브에서 확인하세요.",
          href: "/guides/",
          action: "공략 허브 보기",
        },
      ],
      exploreLabel: "관련 공략과 도구 찾기",
    },
  },
};

type GlobalHubLocale = Exclude<SiteLocale, "zh-hant" | "en" | "ko">;

const globalHubContent: Record<
  GlobalHubLocale,
  Record<HubSection, HubContent>
> = {
  "zh-hans": {
    guides: {
      kicker: "玩家攻略",
      title: "AION2 攻略：新手、系统与成长指南",
      description: "查找新手路线、系统说明、探索机制与版本相关的成长建议。页面会标明来源、适用范围和更新时间。",
      availability: "可以从全球服预注册、翅膀强化、时空裂缝或账号安全指南开始。",
      cards: [
        { eyebrow: "入门指南", title: "全球服预注册", description: "核对官方入口、开放时间、奖励与账号安全注意事项。", href: "/aion-2-pre-registration/", action: "阅读核对指南" },
        { eyebrow: "系统说明", title: "翅膀强化资料范围", description: "区分官方已确认内容，以及尚未公布的材料、概率和强化顺序。", href: "/guides/wing-enhancement/", action: "阅读翅膀指南" },
        { eyebrow: "世界探索", title: "使用互动地图规划路线", description: "查找地区、世界首领、采集点与收集要素。", href: "/tools/map/", action: "打开互动地图" },
      ],
      exploreLabel: "继续浏览其他内容中心",
    },
    classes: {
      kicker: "职业与 BUILD",
      title: "AION2 职业对比与 Build 规划",
      description: "比较职业武器、核心循环、操作难度、队伍定位和 PvE／PvP 玩法，再按自己的目标规划 Build。",
      availability: "查看职业总览、单职业攻略、难度对比与可重复使用的 Build 规划方法。",
      cards: [
        { eyebrow: "职业资料", title: "拳星 Brawler 官方基础", description: "查看目前有官方依据的武器、核心机制与职业定位。", href: "/classes/brawler/", action: "查看拳星资料" },
        { eyebrow: "规划方法", title: "Build 规划框架", description: "按玩法场景、资源限制、替代方案与测试记录比较配置。", href: "/classes/class-planning-framework/", action: "查看规划方法" },
        { eyebrow: "玩家工具", title: "寻找适合你的职业", description: "根据操作节奏、队伍定位和 PvE／PvP 偏好获得职业建议。", href: "/tools/class-finder/", action: "开始职业问卷" },
      ],
      exploreLabel: "连接攻略、资料与工具",
    },
    database: {
      kicker: "游戏资料",
      title: "AION2 数据库：物品、技能与地区",
      description: "按名称、官方 ID、分类、品质或职业限制搜索 AION2 装备、材料和消耗品。",
      availability: "核心界面已本地化；尚未完成官方简体中文术语校对的物品名称与长篇资料暂以英文显示。",
      cards: [
        { eyebrow: "物品", title: "搜索物品与成长材料", description: "浏览装备、材料、消耗品和强化道具的分类、限制与属性摘要。", href: "/database/", action: "打开物品数据库" },
        { eyebrow: "资料说明", title: "如何阅读物品与地图资料", description: "了解更新时间、未知字段、本地化名称和地图坐标的标示方式。", href: "/database/map-data-methodology/", action: "查看资料说明" },
        { eyebrow: "世界资料", title: "在地图中浏览世界资料", description: "从互动地图查看地区、兴趣点和世界首领。", href: "/tools/map/", action: "浏览世界地图" },
      ],
      exploreLabel: "前往相关内容中心",
    },
    tools: {
      kicker: "玩家工具",
      title: "AION2 工具：互动地图与玩家规划器",
      description: "使用互动地图、职业推荐、制作材料计算器和每日清单，规划探索、成长与周期活动。",
      availability: "核心工具界面提供简体中文；未完成术语校对的地图与物品资料会暂时使用英文数据。",
      cards: [
        { eyebrow: "已上线", title: "AION2 互动地图", description: "搜索地区、世界首领、采集点、收集要素和地图标记。", href: "/tools/map/", action: "打开地图" },
        { eyebrow: "职业推荐", title: "AION2 职业推荐器", description: "按操作难度、队伍定位与 PvE／PvP 偏好匹配职业。", href: "/tools/class-finder/", action: "开始职业推荐" },
        { eyebrow: "制作资料", title: "制作配方与材料计算器", description: "搜索配方，并计算直接材料、基础材料、库存缺口与自定义价格。", href: "/tools/material-calculator/", action: "搜索制作配方" },
      ],
      exploreLabel: "查看工具所依据的攻略与资料",
    },
    news: {
      kicker: "AION2 新闻",
      title: "AION2 新闻：官方消息与版本情报",
      description: "以 NC 与平台的一手来源整理全球服、版本、系统和活动消息，并区分已确认事实、历史活动与待确认资料。",
      availability: "每篇报道会标明原文日期、本站核对日期、适用地区与版本范围。",
      cards: [
        { eyebrow: "官方消息", title: "全球服上线与抢先体验", description: "集中核对官方公布的日期、平台、地区和仍待统一确认的资料。", href: "/aion-2-release-date/", action: "阅读上线指南" },
        { eyebrow: "兑换码", title: "AION2 兑换码记录", description: "查看可用兑换码、官方有效期、历史记录与兑换方法。", href: "/codes/", action: "查看兑换码" },
        { eyebrow: "长期指南", title: "从新闻前往完整攻略", description: "到攻略中心查看不受短期新闻周期限制的系统与玩法说明。", href: "/guides/", action: "查看攻略中心" },
      ],
      exploreLabel: "查找相关攻略与工具",
    },
  },
  fr: {
    guides: {
      kicker: "GUIDES JOUEURS",
      title: "Guides AION2 : débuter, systèmes et progression",
      description: "Retrouvez des parcours pour débutants, des explications de systèmes et des conseils de progression avec sources, portée et date de mise à jour.",
      availability: "Commencez par la préinscription mondiale, l'amélioration des ailes, les failles ou la sécurité du compte.",
      cards: [
        { eyebrow: "BIEN DÉBUTER", title: "Préinscription mondiale", description: "Vérifiez le portail officiel, les dates, les récompenses et les règles de sécurité du compte.", href: "/aion-2-pre-registration/", action: "Lire le guide vérifié" },
        { eyebrow: "SYSTÈMES", title: "Amélioration des ailes : données confirmées", description: "Distinguez les éléments officiels des matériaux, taux et priorités encore non publiés.", href: "/guides/wing-enhancement/", action: "Lire le guide des ailes" },
        { eyebrow: "EXPLORATION", title: "Planifier son parcours sur la carte", description: "Localisez régions, boss mondiaux, points de récolte et objets à collectionner.", href: "/tools/map/", action: "Ouvrir la carte interactive" },
      ],
      exploreLabel: "Explorer les autres rubriques KINA",
    },
    classes: {
      kicker: "CLASSES ET BUILDS",
      title: "Classes AION2 et planification de builds",
      description: "Comparez armes, boucle de jeu, difficulté d'exécution, rôle en groupe et styles PvE ou PvP avant de préparer un build.",
      availability: "Consultez la vue d'ensemble des classes, les guides dédiés, la comparaison des difficultés et la méthode de planification.",
      cards: [
        { eyebrow: "FICHE DE CLASSE", title: "Bases officielles du Brawler", description: "Consultez les armes, mécaniques et rôles actuellement étayés par des sources officielles.", href: "/classes/brawler/", action: "Voir la fiche Brawler" },
        { eyebrow: "MÉTHODE DE BUILD", title: "Cadre de planification d'un build", description: "Comparez les options selon l'activité, les contraintes, les alternatives et vos essais.", href: "/classes/class-planning-framework/", action: "Voir la méthode" },
        { eyebrow: "OUTIL JOUEUR", title: "Trouver une classe adaptée", description: "Obtenez des suggestions selon le rythme de combat, le rôle et votre préférence PvE ou PvP.", href: "/tools/class-finder/", action: "Lancer le questionnaire" },
      ],
      exploreLabel: "Relier guides, données et outils",
    },
    database: {
      kicker: "DONNÉES DE JEU",
      title: "Base de données AION2 : objets, compétences et régions",
      description: "Recherchez équipements, matériaux et consommables par nom, identifiant officiel, catégorie, rareté ou restriction de classe.",
      availability: "L'interface principale est traduite. Les noms d'objets et contenus longs sans terminologie française officielle validée restent provisoirement en anglais.",
      cards: [
        { eyebrow: "OBJETS", title: "Rechercher objets et matériaux", description: "Parcourez équipements, matériaux, consommables et objets d'amélioration avec filtres et statistiques.", href: "/database/", action: "Ouvrir la base d'objets" },
        { eyebrow: "MÉTHODOLOGIE", title: "Comprendre les données d'objets et de carte", description: "Consultez les dates, champs inconnus, noms localisés et conventions de coordonnées.", href: "/database/map-data-methodology/", action: "Lire la méthodologie" },
        { eyebrow: "DONNÉES DU MONDE", title: "Explorer les données sur la carte", description: "Affichez régions, points d'intérêt et boss mondiaux dans la carte interactive.", href: "/tools/map/", action: "Parcourir la carte" },
      ],
      exploreLabel: "Accéder aux rubriques associées",
    },
    tools: {
      kicker: "OUTILS JOUEURS",
      title: "Outils AION2 : carte et planificateurs",
      description: "Utilisez la carte, le sélecteur de classe, le calculateur de fabrication et la checklist pour organiser exploration et progression.",
      availability: "L'interface essentielle est disponible en français ; les données de carte et d'objets non encore validées utilisent provisoirement l'anglais.",
      cards: [
        { eyebrow: "DISPONIBLE", title: "Carte interactive AION2", description: "Recherchez régions, boss mondiaux, récoltes, collections et repères de carte.", href: "/tools/map/", action: "Ouvrir la carte" },
        { eyebrow: "CLASSES", title: "Sélecteur de classe AION2", description: "Trouvez une classe selon la difficulté, le rôle et vos préférences PvE ou PvP.", href: "/tools/class-finder/", action: "Trouver ma classe" },
        { eyebrow: "FABRICATION", title: "Recettes et calculateur de matériaux", description: "Calculez les matériaux directs ou de base, les manques en stock et les coûts personnalisés.", href: "/tools/material-calculator/", action: "Rechercher une recette" },
      ],
      exploreLabel: "Voir les guides et données associés",
    },
    news: {
      kicker: "ACTUALITÉS AION2",
      title: "Actualités AION2 : annonces et mises à jour",
      description: "Suivez la version mondiale, les mises à jour et les événements à partir des sources NC et des plateformes, avec une séparation claire des faits confirmés.",
      availability: "Chaque article indique la date d'origine, la date de vérification KINA, la région et la version concernées.",
      cards: [
        { eyebrow: "ANNONCES OFFICIELLES", title: "Sortie mondiale et accès anticipé", description: "Vérifiez dates, plateformes, régions et informations encore en attente d'une confirmation cohérente.", href: "/aion-2-release-date/", action: "Lire le guide de sortie" },
        { eyebrow: "CODES", title: "Registre des codes AION2", description: "Consultez les codes actifs, leurs dates officielles, l'historique et la procédure d'utilisation.", href: "/codes/", action: "Voir les codes" },
        { eyebrow: "GUIDES DURABLES", title: "Passer d'une actualité à un guide complet", description: "Retrouvez les systèmes et styles de jeu qui restent utiles au-delà du cycle d'actualité.", href: "/guides/", action: "Voir les guides" },
      ],
      exploreLabel: "Trouver les guides et outils associés",
    },
  },
  de: {
    guides: {
      kicker: "SPIELER-GUIDES",
      title: "AION2 Guides: Einstieg, Systeme und Fortschritt",
      description: "Finde Einsteiger-Routen, Systemerklärungen und Fortschrittstipps mit klaren Quellen, Geltungsbereich und Aktualisierungsdatum.",
      availability: "Starte mit globaler Vorregistrierung, Flügelverbesserung, Rissen oder Kontosicherheit.",
      cards: [
        { eyebrow: "ERSTE SCHRITTE", title: "Globale Vorregistrierung", description: "Prüfe den offiziellen Einstieg, Termine, Belohnungen und Hinweise zur Kontosicherheit.", href: "/aion-2-pre-registration/", action: "Geprüften Guide lesen" },
        { eyebrow: "SYSTEME", title: "Flügelverbesserung: belegte Daten", description: "Trenne bestätigte Angaben von unveröffentlichten Materialien, Raten und Prioritäten.", href: "/guides/wing-enhancement/", action: "Flügel-Guide lesen" },
        { eyebrow: "ERKUNDUNG", title: "Routen mit der Karte planen", description: "Finde Regionen, Weltbosse, Sammelpunkte und Collectibles.", href: "/tools/map/", action: "Interaktive Karte öffnen" },
      ],
      exploreLabel: "Weitere KINA-Bereiche entdecken",
    },
    classes: {
      kicker: "KLASSEN UND BUILDS",
      title: "AION2 Klassenvergleich und Build-Planung",
      description: "Vergleiche Waffen, Spielablauf, Ausführungsanspruch, Gruppenrolle sowie PvE- und PvP-Stile, bevor du einen Build planst.",
      availability: "Nutze Klassenübersicht, Einzel-Guides, Schwierigkeitsvergleich und eine nachvollziehbare Build-Methode.",
      cards: [
        { eyebrow: "KLASSENPROFIL", title: "Offizielle Grundlagen des Brawlers", description: "Sieh dir Waffen, Mechaniken und Rollen an, die aktuell durch offizielle Quellen belegt sind.", href: "/classes/brawler/", action: "Brawler-Profil öffnen" },
        { eyebrow: "BUILD-METHODE", title: "Rahmen für die Build-Planung", description: "Vergleiche Optionen nach Aktivität, Einschränkungen, Alternativen und eigenen Tests.", href: "/classes/class-planning-framework/", action: "Methode ansehen" },
        { eyebrow: "SPIELER-TOOL", title: "Passende Klasse finden", description: "Erhalte Vorschläge nach Kampftempo, Gruppenrolle und PvE- oder PvP-Vorliebe.", href: "/tools/class-finder/", action: "Klassenfinder starten" },
      ],
      exploreLabel: "Guides, Daten und Tools verbinden",
    },
    database: {
      kicker: "SPIELDATEN",
      title: "AION2 Datenbank: Gegenstände, Fertigkeiten und Regionen",
      description: "Suche Ausrüstung, Materialien und Verbrauchsgegenstände nach Name, offizieller ID, Kategorie, Qualität oder Klassenbeschränkung.",
      availability: "Die Kernoberfläche ist lokalisiert. Nicht geprüfte deutsche Spielbegriffe und längere Inhalte werden vorläufig auf Englisch angezeigt.",
      cards: [
        { eyebrow: "GEGENSTÄNDE", title: "Gegenstände und Materialien suchen", description: "Durchsuche Ausrüstung, Materialien, Verbrauchs- und Verbesserungsgegenstände mit Filtern.", href: "/database/", action: "Gegenstandsdatenbank öffnen" },
        { eyebrow: "METHODIK", title: "Gegenstands- und Kartendaten verstehen", description: "Lies, wie Aktualisierungen, unbekannte Felder, lokalisierte Namen und Koordinaten markiert werden.", href: "/database/map-data-methodology/", action: "Methodik lesen" },
        { eyebrow: "WELTDATEN", title: "Weltdaten auf der Karte", description: "Zeige Regionen, interessante Orte und Weltbosse in der interaktiven Karte an.", href: "/tools/map/", action: "Weltkarte öffnen" },
      ],
      exploreLabel: "Verwandte Bereiche besuchen",
    },
    tools: {
      kicker: "SPIELER-TOOLS",
      title: "AION2 Tools: interaktive Karte und Planer",
      description: "Organisiere Erkundung und Fortschritt mit Karte, Klassenfinder, Herstellungsrechner und Checkliste.",
      availability: "Die wichtigsten Bedienelemente sind auf Deutsch verfügbar; ungeprüfte Karten- und Gegenstandsdaten nutzen vorläufig Englisch.",
      cards: [
        { eyebrow: "VERFÜGBAR", title: "AION2 Interaktive Karte", description: "Suche Regionen, Weltbosse, Sammelpunkte, Collectibles und Kartenmarkierungen.", href: "/tools/map/", action: "Karte öffnen" },
        { eyebrow: "KLASSENFINDER", title: "AION2 Klassenfinder", description: "Finde Klassen nach Schwierigkeit, Gruppenrolle und PvE- oder PvP-Vorliebe.", href: "/tools/class-finder/", action: "Klasse finden" },
        { eyebrow: "HERSTELLUNG", title: "Rezepte und Materialrechner", description: "Berechne direkte oder Grundmaterialien, Fehlmengen und Kosten mit eigenen Preisen.", href: "/tools/material-calculator/", action: "Rezept suchen" },
      ],
      exploreLabel: "Zugehörige Guides und Daten ansehen",
    },
    news: {
      kicker: "AION2-NEUIGKEITEN",
      title: "AION2 News: offizielle Meldungen und Updates",
      description: "Verfolge globale Veröffentlichung, Updates und Events anhand von NC- und Plattformquellen; bestätigte Fakten werden klar von offenen Angaben getrennt.",
      availability: "Jeder Beitrag zeigt Originaldatum, KINA-Prüfdatum, Region und Versionsumfang.",
      cards: [
        { eyebrow: "OFFIZIELLE MELDUNGEN", title: "Globaler Start und Early Access", description: "Prüfe Termine, Plattformen, Regionen und Angaben, die noch einheitlich bestätigt werden müssen.", href: "/aion-2-release-date/", action: "Start-Guide lesen" },
        { eyebrow: "CODES", title: "AION2 Code-Verzeichnis", description: "Sieh aktive Codes, offizielle Laufzeiten, Verlauf und Einlöseanleitung.", href: "/codes/", action: "Codes anzeigen" },
        { eyebrow: "DAUERHAFTE GUIDES", title: "Von News zum vollständigen Guide", description: "Wechsle zu System- und Spielstil-Guides, die länger als ein Nachrichtenzyklus relevant bleiben.", href: "/guides/", action: "Guide-Bereich öffnen" },
      ],
      exploreLabel: "Passende Guides und Tools finden",
    },
  },
  es: {
    guides: {
      kicker: "GUÍAS PARA JUGADORES",
      title: "Guías de AION2: inicio, sistemas y progresión",
      description: "Encuentra rutas para principiantes, explicaciones de sistemas y consejos de progresión con fuentes, alcance y fecha de actualización.",
      availability: "Empieza por el registro previo global, la mejora de alas, las grietas o la seguridad de la cuenta.",
      cards: [
        { eyebrow: "PRIMEROS PASOS", title: "Registro previo global", description: "Comprueba el acceso oficial, las fechas, las recompensas y las precauciones de seguridad.", href: "/aion-2-pre-registration/", action: "Leer la guía verificada" },
        { eyebrow: "SISTEMAS", title: "Mejora de alas: datos confirmados", description: "Distingue los datos oficiales de materiales, probabilidades y prioridades aún no publicados.", href: "/guides/wing-enhancement/", action: "Leer la guía de alas" },
        { eyebrow: "EXPLORACIÓN", title: "Planifica rutas con el mapa", description: "Localiza regiones, jefes de mundo, puntos de recolección y coleccionables.", href: "/tools/map/", action: "Abrir el mapa interactivo" },
      ],
      exploreLabel: "Explorar otras secciones de KINA",
    },
    classes: {
      kicker: "CLASES Y BUILDS",
      title: "Clases de AION2 y planificación de builds",
      description: "Compara armas, ciclo de juego, dificultad, función en grupo y estilos PvE o PvP antes de planificar tu build.",
      availability: "Consulta el resumen de clases, guías individuales, comparación de dificultad y método de planificación.",
      cards: [
        { eyebrow: "FICHA DE CLASE", title: "Fundamentos oficiales del Brawler", description: "Revisa las armas, mecánicas y funciones respaldadas actualmente por fuentes oficiales.", href: "/classes/brawler/", action: "Ver ficha del Brawler" },
        { eyebrow: "MÉTODO DE BUILD", title: "Marco para planificar builds", description: "Compara opciones por actividad, limitaciones, alternativas y resultados de prueba.", href: "/classes/class-planning-framework/", action: "Ver el método" },
        { eyebrow: "HERRAMIENTA", title: "Encuentra una clase adecuada", description: "Recibe sugerencias según ritmo de combate, función y preferencia PvE o PvP.", href: "/tools/class-finder/", action: "Iniciar selector de clase" },
      ],
      exploreLabel: "Conectar guías, datos y herramientas",
    },
    database: {
      kicker: "DATOS DEL JUEGO",
      title: "Base de datos de AION2: objetos, habilidades y regiones",
      description: "Busca equipo, materiales y consumibles por nombre, ID oficial, categoría, calidad o restricción de clase.",
      availability: "La interfaz principal está localizada. Los términos y contenidos largos sin revisión oficial en español se muestran provisionalmente en inglés.",
      cards: [
        { eyebrow: "OBJETOS", title: "Buscar objetos y materiales", description: "Explora equipo, materiales, consumibles y objetos de mejora con filtros y resúmenes.", href: "/database/", action: "Abrir la base de objetos" },
        { eyebrow: "METODOLOGÍA", title: "Cómo interpretar los datos", description: "Consulta fechas, campos desconocidos, nombres localizados y convenciones de coordenadas.", href: "/database/map-data-methodology/", action: "Leer la metodología" },
        { eyebrow: "DATOS DEL MUNDO", title: "Explorar datos en el mapa", description: "Consulta regiones, puntos de interés y jefes de mundo en el mapa interactivo.", href: "/tools/map/", action: "Abrir el mapa" },
      ],
      exploreLabel: "Visitar secciones relacionadas",
    },
    tools: {
      kicker: "HERRAMIENTAS",
      title: "Herramientas AION2: mapa y planificadores",
      description: "Organiza exploración y progresión con el mapa, el selector de clase, la calculadora de fabricación y la lista de tareas.",
      availability: "La interfaz esencial está disponible en español de España; los datos sin revisar usan inglés provisionalmente.",
      cards: [
        { eyebrow: "DISPONIBLE", title: "Mapa interactivo de AION2", description: "Busca regiones, jefes de mundo, recolección, coleccionables y marcadores.", href: "/tools/map/", action: "Abrir el mapa" },
        { eyebrow: "CLASES", title: "Selector de clase de AION2", description: "Encuentra una clase según dificultad, función de grupo y preferencia PvE o PvP.", href: "/tools/class-finder/", action: "Buscar mi clase" },
        { eyebrow: "FABRICACIÓN", title: "Recetas y calculadora de materiales", description: "Calcula materiales directos o básicos, faltantes y costes con precios personalizados.", href: "/tools/material-calculator/", action: "Buscar recetas" },
      ],
      exploreLabel: "Ver las guías y datos relacionados",
    },
    news: {
      kicker: "NOTICIAS DE AION2",
      title: "Noticias AION2: anuncios y actualizaciones",
      description: "Sigue el lanzamiento global, las actualizaciones y eventos mediante fuentes de NC y plataformas, separando hechos confirmados de datos pendientes.",
      availability: "Cada noticia indica fecha original, fecha de verificación de KINA, región y versión aplicables.",
      cards: [
        { eyebrow: "ANUNCIOS OFICIALES", title: "Lanzamiento global y acceso anticipado", description: "Comprueba fechas, plataformas, regiones y datos que aún requieren confirmación coherente.", href: "/aion-2-release-date/", action: "Leer la guía de lanzamiento" },
        { eyebrow: "CÓDIGOS", title: "Registro de códigos de AION2", description: "Consulta códigos activos, periodos oficiales, historial e instrucciones de canje.", href: "/codes/", action: "Ver códigos" },
        { eyebrow: "GUÍAS PERMANENTES", title: "De una noticia a una guía completa", description: "Consulta sistemas y estilos de juego que siguen siendo útiles tras el ciclo de noticias.", href: "/guides/", action: "Ver las guías" },
      ],
      exploreLabel: "Encontrar guías y herramientas relacionadas",
    },
  },
  ja: {
    guides: {
      kicker: "プレイヤーガイド",
      title: "AION2 攻略：初心者・システム・育成ガイド",
      description: "初心者向けの進行ルート、システム解説、育成の考え方を、出典・対象範囲・更新日とともに確認できます。",
      availability: "グローバル事前登録、ウイング強化、時空の裂け目、アカウント安全対策から確認できます。",
      cards: [
        { eyebrow: "はじめに", title: "グローバル事前登録", description: "公式入口、期間、報酬、アカウントを安全に扱うための注意点を確認します。", href: "/aion-2-pre-registration/", action: "確認済みガイドを読む" },
        { eyebrow: "システム", title: "ウイング強化の確認範囲", description: "公式に確認できる内容と、未公開の素材・確率・優先順位を分けて整理します。", href: "/guides/wing-enhancement/", action: "ウイングガイドを読む" },
        { eyebrow: "探索", title: "インタラクティブマップでルート作成", description: "地域、ワールドボス、採集地点、収集要素を検索できます。", href: "/tools/map/", action: "マップを開く" },
      ],
      exploreLabel: "ほかの KINA コンテンツを見る",
    },
    classes: {
      kicker: "クラスとビルド",
      title: "AION2 クラス比較・ビルド計画",
      description: "武器、基本ループ、操作難度、パーティーでの役割、PvE／PvP のプレイスタイルを比較してビルドを計画します。",
      availability: "クラス一覧、個別ガイド、難度比較、再現可能なビルド計画手順を確認できます。",
      cards: [
        { eyebrow: "クラス情報", title: "Brawler の公式基礎情報", description: "現時点で公式資料から確認できる武器、メカニクス、役割を整理します。", href: "/classes/brawler/", action: "Brawler 情報を見る" },
        { eyebrow: "ビルド方法", title: "ビルド計画フレームワーク", description: "コンテンツ、制約、代替案、テスト結果を基準に候補を比較します。", href: "/classes/class-planning-framework/", action: "計画方法を見る" },
        { eyebrow: "プレイヤーツール", title: "自分に合うクラスを探す", description: "戦闘テンポ、役割、PvE／PvP の好みから候補を提案します。", href: "/tools/class-finder/", action: "クラス診断を始める" },
      ],
      exploreLabel: "攻略・データ・ツールをつなげる",
    },
    database: {
      kicker: "ゲームデータ",
      title: "AION2 データベース：アイテム・スキル・地域",
      description: "名前、公式 ID、カテゴリ、等級、クラス制限から装備・素材・消耗品を検索できます。",
      availability: "主要画面は日本語化済みです。公式日本語用語の確認が終わっていない名称と長文は、一時的に英語で表示します。",
      cards: [
        { eyebrow: "アイテム", title: "アイテムと育成素材を検索", description: "装備、素材、消耗品、強化アイテムをフィルターと能力概要付きで確認します。", href: "/database/", action: "アイテム DB を開く" },
        { eyebrow: "データ方針", title: "アイテム・マップデータの見方", description: "更新日、不明項目、ローカライズ名、座標表記の扱いを確認します。", href: "/database/map-data-methodology/", action: "データ方針を読む" },
        { eyebrow: "ワールドデータ", title: "マップで世界データを確認", description: "地域、注目地点、ワールドボスをインタラクティブマップで表示します。", href: "/tools/map/", action: "ワールドマップを見る" },
      ],
      exploreLabel: "関連コンテンツへ",
    },
    tools: {
      kicker: "プレイヤーツール",
      title: "AION2 ツール：インタラクティブマップと計画機能",
      description: "マップ、クラス診断、製作素材計算、チェックリストで探索と育成を整理できます。",
      availability: "主要操作は日本語に対応しています。未確認のマップ・アイテム用語は一時的に英語データを使用します。",
      cards: [
        { eyebrow: "公開中", title: "AION2 インタラクティブマップ", description: "地域、ワールドボス、採集地点、収集要素、マーカーを検索します。", href: "/tools/map/", action: "マップを開く" },
        { eyebrow: "クラス診断", title: "AION2 クラス診断", description: "操作難度、役割、PvE／PvP の好みからクラスを提案します。", href: "/tools/class-finder/", action: "クラスを探す" },
        { eyebrow: "製作", title: "レシピ・素材計算機", description: "直接素材・基礎素材・不足数・任意価格による費用を計算します。", href: "/tools/material-calculator/", action: "レシピを検索" },
      ],
      exploreLabel: "関連する攻略とデータを見る",
    },
    news: {
      kicker: "AION2 ニュース",
      title: "AION2 ニュース：公式発表とアップデート",
      description: "NC と各プラットフォームの一次情報を基に、グローバル版、更新、イベントを整理し、確認済み情報と未確定情報を分けます。",
      availability: "各記事に原文公開日、KINA 確認日、対象地域、対象バージョンを表示します。",
      cards: [
        { eyebrow: "公式発表", title: "グローバル版リリースと先行アクセス", description: "日程、プラットフォーム、地域、追加確認が必要な項目をまとめて確認します。", href: "/aion-2-release-date/", action: "リリースガイドを読む" },
        { eyebrow: "クーポン", title: "AION2 クーポンコード一覧", description: "利用可能なコード、公式期間、履歴、入力方法を確認します。", href: "/codes/", action: "コードを見る" },
        { eyebrow: "継続ガイド", title: "ニュースから詳しい攻略へ", description: "ニュース期間後も役立つシステムとプレイスタイルの解説を確認します。", href: "/guides/", action: "攻略一覧を見る" },
      ],
      exploreLabel: "関連する攻略とツールを探す",
    },
  },
  "pt-br": {
    guides: {
      kicker: "GUIAS PARA JOGADORES",
      title: "Guias de AION2: início, sistemas e progressão",
      description: "Encontre rotas para iniciantes, explicações de sistemas e orientações de progressão com fontes, escopo e data de atualização.",
      availability: "Comece pelo pré-registro global, aprimoramento de asas, fendas ou segurança da conta.",
      cards: [
        { eyebrow: "COMECE AQUI", title: "Pré-registro global", description: "Confira o acesso oficial, as datas, as recompensas e os cuidados com a conta.", href: "/aion-2-pre-registration/", action: "Ler guia verificado" },
        { eyebrow: "SISTEMAS", title: "Aprimoramento de asas: dados confirmados", description: "Separe informações oficiais de materiais, taxas e prioridades ainda não publicados.", href: "/guides/wing-enhancement/", action: "Ler guia de asas" },
        { eyebrow: "EXPLORAÇÃO", title: "Planeje rotas no mapa", description: "Encontre regiões, chefes mundiais, pontos de coleta e colecionáveis.", href: "/tools/map/", action: "Abrir mapa interativo" },
      ],
      exploreLabel: "Explorar outras áreas da KINA",
    },
    classes: {
      kicker: "CLASSES E BUILDS",
      title: "Classes de AION2 e planejamento de builds",
      description: "Compare armas, ciclo principal, dificuldade, função no grupo e estilos PvE ou PvP antes de montar uma build.",
      availability: "Veja a visão geral das classes, guias individuais, comparação de dificuldade e método de planejamento.",
      cards: [
        { eyebrow: "PERFIL DE CLASSE", title: "Fundamentos oficiais do Brawler", description: "Confira armas, mecânicas e funções atualmente apoiadas por fontes oficiais.", href: "/classes/brawler/", action: "Ver perfil do Brawler" },
        { eyebrow: "MÉTODO DE BUILD", title: "Estrutura para planejar builds", description: "Compare opções por atividade, limitações, alternativas e resultados dos testes.", href: "/classes/class-planning-framework/", action: "Ver o método" },
        { eyebrow: "FERRAMENTA", title: "Encontre uma classe adequada", description: "Receba sugestões conforme ritmo de combate, função e preferência por PvE ou PvP.", href: "/tools/class-finder/", action: "Iniciar seletor de classe" },
      ],
      exploreLabel: "Conectar guias, dados e ferramentas",
    },
    database: {
      kicker: "DADOS DO JOGO",
      title: "Banco de dados de AION2: itens, habilidades e regiões",
      description: "Busque equipamentos, materiais e consumíveis por nome, ID oficial, categoria, raridade ou restrição de classe.",
      availability: "A interface principal está localizada. Termos e conteúdos longos sem revisão oficial em português aparecem temporariamente em inglês.",
      cards: [
        { eyebrow: "ITENS", title: "Buscar itens e materiais", description: "Consulte equipamentos, materiais, consumíveis e itens de aprimoramento com filtros.", href: "/database/", action: "Abrir banco de itens" },
        { eyebrow: "METODOLOGIA", title: "Como interpretar os dados", description: "Entenda datas, campos desconhecidos, nomes localizados e convenções de coordenadas.", href: "/database/map-data-methodology/", action: "Ler a metodologia" },
        { eyebrow: "DADOS DO MUNDO", title: "Explorar dados no mapa", description: "Veja regiões, pontos de interesse e chefes mundiais no mapa interativo.", href: "/tools/map/", action: "Abrir o mapa" },
      ],
      exploreLabel: "Visitar áreas relacionadas",
    },
    tools: {
      kicker: "FERRAMENTAS",
      title: "Ferramentas AION2: mapa e planejadores",
      description: "Organize exploração e progressão com mapa, seletor de classe, calculadora de fabricação e checklist.",
      availability: "A interface essencial está em português do Brasil; dados ainda não revisados usam inglês temporariamente.",
      cards: [
        { eyebrow: "DISPONÍVEL", title: "Mapa interativo de AION2", description: "Busque regiões, chefes mundiais, coleta, colecionáveis e marcadores.", href: "/tools/map/", action: "Abrir o mapa" },
        { eyebrow: "CLASSES", title: "Seletor de classe de AION2", description: "Encontre classes por dificuldade, função no grupo e preferência PvE ou PvP.", href: "/tools/class-finder/", action: "Encontrar minha classe" },
        { eyebrow: "FABRICAÇÃO", title: "Receitas e calculadora de materiais", description: "Calcule materiais diretos ou básicos, faltas no inventário e custos personalizados.", href: "/tools/material-calculator/", action: "Buscar receitas" },
      ],
      exploreLabel: "Ver guias e dados relacionados",
    },
    news: {
      kicker: "NOTÍCIAS DE AION2",
      title: "Notícias AION2: anúncios e atualizações",
      description: "Acompanhe lançamento global, atualizações e eventos por fontes da NC e das plataformas, separando fatos confirmados de dados pendentes.",
      availability: "Cada matéria mostra data original, data de verificação da KINA, região e versão aplicáveis.",
      cards: [
        { eyebrow: "ANÚNCIOS OFICIAIS", title: "Lançamento global e acesso antecipado", description: "Confira datas, plataformas, regiões e informações que ainda precisam de confirmação consistente.", href: "/aion-2-release-date/", action: "Ler guia de lançamento" },
        { eyebrow: "CÓDIGOS", title: "Registro de códigos de AION2", description: "Consulte códigos ativos, períodos oficiais, histórico e instruções de resgate.", href: "/codes/", action: "Ver códigos" },
        { eyebrow: "GUIAS PERMANENTES", title: "Da notícia para um guia completo", description: "Veja sistemas e estilos de jogo úteis mesmo após o ciclo da notícia.", href: "/guides/", action: "Ver os guias" },
      ],
      exploreLabel: "Encontrar guias e ferramentas relacionados",
    },
  },
  ru: {
    guides: {
      kicker: "РУКОВОДСТВА",
      title: "Гайды AION2: старт, системы и развитие",
      description: "Маршруты для новичков, объяснения систем и советы по развитию с указанием источников, области применения и даты обновления.",
      availability: "Начните с глобальной предрегистрации, усиления крыльев, разломов или безопасности аккаунта.",
      cards: [
        { eyebrow: "НАЧАЛО ИГРЫ", title: "Глобальная предрегистрация", description: "Проверьте официальный вход, сроки, награды и правила безопасности аккаунта.", href: "/aion-2-pre-registration/", action: "Читать проверенный гайд" },
        { eyebrow: "СИСТЕМЫ", title: "Усиление крыльев: подтверждённые данные", description: "Отделите официальные сведения от неопубликованных материалов, шансов и приоритетов.", href: "/guides/wing-enhancement/", action: "Читать гайд по крыльям" },
        { eyebrow: "ИССЛЕДОВАНИЕ", title: "Планирование маршрута на карте", description: "Найдите регионы, мировых боссов, точки сбора и коллекционные объекты.", href: "/tools/map/", action: "Открыть интерактивную карту" },
      ],
      exploreLabel: "Перейти к другим разделам KINA",
    },
    classes: {
      kicker: "КЛАССЫ И БИЛДЫ",
      title: "Классы AION2 и планирование билдов",
      description: "Сравните оружие, игровой цикл, сложность, роль в группе и стили PvE или PvP перед созданием билда.",
      availability: "Доступны обзор классов, отдельные гайды, сравнение сложности и методика планирования.",
      cards: [
        { eyebrow: "ПРОФИЛЬ КЛАССА", title: "Официальные основы Brawler", description: "Оружие, механики и роль, которые сейчас подтверждаются официальными источниками.", href: "/classes/brawler/", action: "Открыть профиль Brawler" },
        { eyebrow: "МЕТОДИКА БИЛДА", title: "Схема планирования билда", description: "Сравните варианты по типу активности, ограничениям, альтернативам и результатам тестов.", href: "/classes/class-planning-framework/", action: "Посмотреть методику" },
        { eyebrow: "ИНСТРУМЕНТ", title: "Найдите подходящий класс", description: "Получите варианты по темпу боя, роли и предпочтениям PvE или PvP.", href: "/tools/class-finder/", action: "Запустить подбор класса" },
      ],
      exploreLabel: "Связать гайды, данные и инструменты",
    },
    database: {
      kicker: "ИГРОВЫЕ ДАННЫЕ",
      title: "База AION2: предметы, навыки и регионы",
      description: "Ищите снаряжение, материалы и расходники по названию, официальному ID, категории, качеству или ограничению класса.",
      availability: "Основной интерфейс локализован. Термины и большие материалы без официальной русской сверки временно отображаются на английском.",
      cards: [
        { eyebrow: "ПРЕДМЕТЫ", title: "Поиск предметов и материалов", description: "Просматривайте снаряжение, материалы, расходники и предметы усиления с фильтрами.", href: "/database/", action: "Открыть базу предметов" },
        { eyebrow: "МЕТОДИКА", title: "Как читать данные предметов и карты", description: "Узнайте, как отмечаются даты, неизвестные поля, локализованные названия и координаты.", href: "/database/map-data-methodology/", action: "Читать методику" },
        { eyebrow: "ДАННЫЕ МИРА", title: "Данные мира на карте", description: "Откройте регионы, точки интереса и мировых боссов на интерактивной карте.", href: "/tools/map/", action: "Открыть карту мира" },
      ],
      exploreLabel: "Перейти к связанным разделам",
    },
    tools: {
      kicker: "ИНСТРУМЕНТЫ",
      title: "Инструменты AION2: карта и планировщики",
      description: "Организуйте исследование и развитие с помощью карты, подбора класса, калькулятора крафта и списка задач.",
      availability: "Основные элементы доступны на русском; непроверенные данные карты и предметов временно используют английский.",
      cards: [
        { eyebrow: "ДОСТУПНО", title: "Интерактивная карта AION2", description: "Ищите регионы, мировых боссов, точки сбора, коллекции и отметки.", href: "/tools/map/", action: "Открыть карту" },
        { eyebrow: "КЛАССЫ", title: "Подбор класса AION2", description: "Найдите класс по сложности, роли в группе и предпочтениям PvE или PvP.", href: "/tools/class-finder/", action: "Подобрать класс" },
        { eyebrow: "КРАФТ", title: "Рецепты и калькулятор материалов", description: "Рассчитайте прямые и базовые материалы, дефицит и стоимость по своим ценам.", href: "/tools/material-calculator/", action: "Найти рецепт" },
      ],
      exploreLabel: "Посмотреть связанные гайды и данные",
    },
    news: {
      kicker: "НОВОСТИ AION2",
      title: "Новости AION2: объявления и обновления",
      description: "Следите за глобальным релизом, обновлениями и событиями по источникам NC и платформ; подтверждённые факты отделяются от ожидающих проверки.",
      availability: "В каждой публикации указаны исходная дата, дата проверки KINA, регион и версия.",
      cards: [
        { eyebrow: "ОФИЦИАЛЬНО", title: "Глобальный релиз и ранний доступ", description: "Проверьте даты, платформы, регионы и сведения, которым ещё требуется единое подтверждение.", href: "/aion-2-release-date/", action: "Читать гайд по релизу" },
        { eyebrow: "КОДЫ", title: "Реестр кодов AION2", description: "Смотрите активные коды, официальные сроки, историю и инструкцию по активации.", href: "/codes/", action: "Показать коды" },
        { eyebrow: "ПОСТОЯННЫЕ ГАЙДЫ", title: "От новости к полному руководству", description: "Откройте системные и игровые гайды, полезные после завершения новостного цикла.", href: "/guides/", action: "Открыть гайды" },
      ],
      exploreLabel: "Найти связанные гайды и инструменты",
    },
  },
};

export const hubContent: Record<
  SiteLocale,
  Record<HubSection, HubContent>
> = {
  ...establishedHubContent,
  ...globalHubContent,
};

const liveHubOverrides: Record<
  "zh-hant" | "en" | "ko",
  Pick<Record<HubSection, HubContent>, "classes" | "database">
> = {
  "zh-hant": {
    classes: {
      kicker: "職業攻略與 BUILD",
      title: "AION2 職業攻略、難易度比較與玩法",
      description:
        "查看九個現行職業的官方武器與定位、KINA 編輯難度評估、PvE／PvP／RvR 玩法，以及不捏造技能數值的入門練習路線。",
      availability:
        "可查看九職業總覽、八個基礎職業攻略、拳星資料與五維難度比較；難度是編輯評估，不代表強度或 Tier。",
      cards: [
        {
          eyebrow: "難易度比較",
          title: "九職業五維難易度比較",
          description: "比較操作、站位、資源管理、隊伍責任與失誤容錯，並閱讀每個評分的依據。",
          href: "/classes/difficulty-comparison/",
          action: "比較職業難度",
        },
        {
          eyebrow: "新職業",
          title: "拳星官方基礎與資源循環",
          description: "查看拳甲、Rage、Rampage 與官方已確認的前線戰鬥定位。",
          href: "/classes/brawler/",
          action: "查看拳星攻略",
        },
        {
          eyebrow: "BUILD 方法",
          title: "Build 規劃方法",
          description: "用玩法情境、資源限制、替代配置與測試紀錄比較職業方案。",
          href: "/classes/class-planning-framework/",
          action: "查看規劃方法",
        },
      ],
      exploreLabel: "連接攻略、資料庫與玩家工具",
    },
    database: {
      kicker: "參考資料",
      title: "AION2 物品資料庫、材料與世界資料",
      description:
        "搜尋 AION2 裝備、神石、魔石、翅膀、採集與製作材料，並依名稱、分類、品級或職業限制縮小結果。",
      availability:
        "可直接查詢官方 ID、三語名稱、主要屬性、交易狀態與資料更新日期；未提供的欄位會清楚標示。",
      cards: [
        {
          eyebrow: "物品資料庫",
          title: "搜尋 AION2 物品與材料",
          description: "依名稱、官方 ID 或分類搜尋，查看品質、限制、主要屬性、系統狀態與官方來源。",
          href: "/database/",
          action: "開啟物品資料庫",
        },
        {
          eyebrow: "資料指南",
          title: "看懂物品與地圖資料",
          description: "了解資料日期、未知欄位、多語名稱與地圖座標應如何閱讀。",
          href: "/database/map-data-methodology/",
          action: "查看資料閱讀指南",
        },
        {
          eyebrow: "世界資料",
          title: "在互動地圖查看世界資料",
          description: "搜尋地區、點位、世界首領、採集與收集內容。",
          href: "/tools/map/",
          action: "瀏覽互動地圖",
        },
      ],
      exploreLabel: "前往相關攻略、職業與工具",
    },
  },
  en: {
    classes: {
      kicker: "CLASSES & BUILDS",
      title: "AION2 Class Guides, Difficulty & Playstyles",
      description:
        "Compare the nine current classes by official weapon and role, KINA editorial difficulty, PvE/PvP/RvR playstyle, and a practice route that does not invent skill values.",
      availability:
        "Browse the nine-class overview, eight base-class guides, Brawler profile, and five-dimension comparison. Difficulty is editorial analysis, not power or a tier list.",
      cards: [
        {
          eyebrow: "DIFFICULTY COMPARISON",
          title: "Nine-class difficulty comparison",
          description: "Compare inputs, positioning, resource management, party responsibility, and error recovery with stated reasoning.",
          href: "/classes/difficulty-comparison/",
          action: "Compare class difficulty",
        },
        {
          eyebrow: "NEW CLASS",
          title: "Official Brawler basics and resource loop",
          description: "Review Gauntlets, Rage, Rampage, and the front-line role confirmed by NC.",
          href: "/classes/brawler/",
          action: "Open Brawler guide",
        },
        {
          eyebrow: "BUILD METHOD",
          title: "Build-planning method",
          description: "Compare class options by activity, constraints, alternatives, and repeatable test notes.",
          href: "/classes/class-planning-framework/",
          action: "View planning method",
        },
      ],
      exploreLabel: "Connect guides, data, and player tools",
    },
    database: {
      kicker: "REFERENCE DATA",
      title: "AION2 Item Database, Materials & World Data",
      description:
        "Search AION2 equipment, Theostones, Manastones, wings, gathering resources, and crafting materials by name, category, grade, or class restriction.",
      availability:
        "Look up official IDs, localized names, main stats, trade status, and update dates. Fields absent from the source are clearly marked.",
      cards: [
        {
          eyebrow: "ITEM DATABASE",
          title: "Search AION2 items and materials",
          description: "Search by name, official ID, or category, then inspect grade, restrictions, main stats, system states, and official sources.",
          href: "/database/",
          action: "Open item database",
        },
        {
          eyebrow: "DATA GUIDE",
          title: "How to read item and map data",
          description: "Understand update dates, unknown fields, localized names, and map coordinates.",
          href: "/database/map-data-methodology/",
          action: "Open data guide",
        },
        {
          eyebrow: "WORLD DATA",
          title: "Browse world data on the map",
          description: "Search regions, points of interest, world bosses, gathering, and collectables.",
          href: "/tools/map/",
          action: "Browse interactive map",
        },
      ],
      exploreLabel: "Visit related guides, classes, and tools",
    },
  },
  ko: {
    classes: {
      kicker: "직업 공략과 빌드",
      title: "AION2 직업 공략, 난이도 비교와 플레이 방식",
      description:
        "현재 아홉 직업의 공식 무기와 역할, KINA 편집 난이도, PvE·PvP·RvR 플레이 방식, 확인되지 않은 수치를 만들지 않는 연습 순서를 확인하세요.",
      availability:
        "아홉 직업 개요, 여덟 기본 직업 공략, 권성 정보와 5개 기준 난이도 비교를 확인할 수 있습니다. 난이도는 편집 평가이며 성능이나 티어가 아닙니다.",
      cards: [
        {
          eyebrow: "난이도 비교",
          title: "아홉 직업 5개 기준 난이도 비교",
          description: "입력, 위치 선정, 자원 관리, 파티 책임, 실수 회복을 평가 근거와 함께 비교합니다.",
          href: "/classes/difficulty-comparison/",
          action: "직업 난이도 비교",
        },
        {
          eyebrow: "신규 직업",
          title: "권성 공식 기초와 자원 흐름",
          description: "권갑, 분노, 폭주와 NC가 확인한 전방 전투 역할을 살펴봅니다.",
          href: "/classes/brawler/",
          action: "권성 공략 보기",
        },
        {
          eyebrow: "빌드 방법",
          title: "빌드 계획 방법",
          description: "활동, 제한 조건, 대안 구성과 반복 가능한 테스트 기록으로 선택지를 비교합니다.",
          href: "/classes/class-planning-framework/",
          action: "계획 방법 읽기",
        },
      ],
      exploreLabel: "공략, 데이터와 플레이어 도구 연결",
    },
    database: {
      kicker: "참고 데이터",
      title: "AION2 아이템 데이터베이스, 재료와 월드 정보",
      description:
        "AION2 장비, 신석, 마석, 날개, 채집 및 제작 재료를 이름, 분류, 등급 또는 직업 제한으로 검색하세요.",
      availability:
        "공식 ID, 다국어 이름, 주요 능력치, 거래 상태와 업데이트 날짜를 확인할 수 있으며 출처에 없는 필드는 명확히 표시합니다.",
      cards: [
        {
          eyebrow: "아이템 데이터베이스",
          title: "AION2 아이템과 재료 검색",
          description: "이름, 공식 ID, 분류로 검색하고 등급, 제한, 주요 능력치, 시스템 상태와 공식 출처를 확인합니다.",
          href: "/database/",
          action: "아이템 데이터베이스 열기",
        },
        {
          eyebrow: "데이터 안내",
          title: "아이템과 지도 정보 읽는 법",
          description: "업데이트 날짜, 알 수 없는 필드, 다국어 이름과 지도 좌표를 이해하세요.",
          href: "/database/map-data-methodology/",
          action: "데이터 안내 보기",
        },
        {
          eyebrow: "월드 데이터",
          title: "인터랙티브 지도에서 월드 정보 보기",
          description: "지역, 주요 지점, 월드 보스, 채집과 수집 정보를 검색합니다.",
          href: "/tools/map/",
          action: "인터랙티브 지도 보기",
        },
      ],
      exploreLabel: "관련 공략, 직업과 도구로 이동",
    },
  },
};

for (const locale of Object.keys(liveHubOverrides) as Array<"zh-hant" | "en" | "ko">) {
  hubContent[locale].classes = liveHubOverrides[locale].classes;
  hubContent[locale].database = liveHubOverrides[locale].database;
}
