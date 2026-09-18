import {
  siteLocaleConfig,
  siteLocales,
  type SiteLocale,
} from "./site-config";
import homeEditorialLocales from "./home-editorial-locales.generated.json";
import reviewedJapaneseHome from "./home-editorial-locales.ja.reviewed.json";
import reviewedLatinHome from "./home-editorial-locales.latin.reviewed.json";
import reviewedOtherHome from "./home-editorial-locales.other.reviewed.json";

export const homeLocales = siteLocales;

export type HomeLocale = SiteLocale;

export const homeLocaleConfig: Record<
  HomeLocale,
  { htmlLang: string; hrefLang: string; label: string; shortLabel: string }
> = siteLocaleConfig;

export const homeMetadata: Record<
  HomeLocale,
  { title: string; description: string; keywords: string[] }
> = {
  "zh-hans": {
    title: "AION2 KINA｜攻略、互动地图与物品数据库",
    description:
      "AION2 简体中文攻略、互动地图、物品数据库、职业对比、制作计算器、每日清单与来源明确的新闻。",
    keywords: [
      "AION2",
      "AION2 攻略",
      "AION2 互动地图",
      "AION2 物品数据库",
      "AION2 职业",
      "AION2 工具",
    ],
  },
  "zh-hant": {
    title: "AION2 KINA｜攻略、互動地圖與物品資料庫",
    description:
      "AION2 繁體中文攻略、互動地圖、物品資料庫、職業比較、製作計算器、每日清單與官方消息整理。",
    keywords: [
      "AION2",
      "AION2 攻略",
      "AION2 互動地圖",
      "AION2 物品資料庫",
      "AION2 職業",
      "AION2 工具",
    ],
  },
  en: {
    title: "AION2 KINA | Guides, Interactive Map & Item Database",
    description:
      "AION2 guides, an interactive map, item database, class comparisons, crafting calculators, daily checklists, and source-labeled updates.",
    keywords: [
      "AION2",
      "AION 2 guides",
      "AION2 interactive map",
      "AION2 item database",
      "AION2 classes",
      "AION2 tools",
    ],
  },
  fr: {
    title: "AION2 KINA | Guides, carte interactive et base d’objets",
    description:
      "Guides AION2, carte interactive, base d’objets, comparatifs de classes, calculateurs d’artisanat, listes d’activités et actualités sourcées.",
    keywords: [
      "AION2",
      "guide AION2",
      "carte interactive AION2",
      "base de données objets AION2",
      "classes AION2",
      "outils AION2",
    ],
  },
  de: {
    title: "AION2 KINA | Guides, interaktive Karte & Item-Datenbank",
    description:
      "AION2-Guides, interaktive Karte, Item-Datenbank, Klassenvergleiche, Handwerksrechner, Checklisten und klar belegte Neuigkeiten.",
    keywords: [
      "AION2",
      "AION2 Guide",
      "AION2 interaktive Karte",
      "AION2 Item Datenbank",
      "AION2 Klassen",
      "AION2 Tools",
    ],
  },
  es: {
    title: "AION2 KINA | Guías, mapa interactivo y base de objetos",
    description:
      "Guías de AION2, mapa interactivo, base de objetos, comparativas de clases, calculadoras de fabricación, listas y noticias con fuentes.",
    keywords: [
      "AION2",
      "guía AION2",
      "mapa interactivo AION2",
      "base de datos de objetos AION2",
      "clases AION2",
      "herramientas AION2",
    ],
  },
  ja: {
    title: "AION2 KINA｜攻略・インタラクティブマップ・アイテムDB",
    description:
      "AION2の攻略、インタラクティブマップ、アイテムデータベース、クラス比較、製作計算、日課チェックリスト、出典付きニュース。",
    keywords: [
      "AION2",
      "AION2 攻略",
      "AION2 マップ",
      "AION2 アイテム",
      "AION2 クラス",
      "AION2 ツール",
    ],
  },
  "pt-br": {
    title: "AION2 KINA | Guias, mapa interativo e banco de itens",
    description:
      "Guias de AION2, mapa interativo, banco de itens, comparação de classes, calculadoras de criação, listas e notícias com fontes.",
    keywords: [
      "AION2",
      "guia AION2",
      "mapa interativo AION2",
      "banco de itens AION2",
      "classes AION2",
      "ferramentas AION2",
    ],
  },
  ru: {
    title: "AION2 KINA | Гайды, интерактивная карта и база предметов",
    description:
      "Гайды AION2, интерактивная карта, база предметов, сравнение классов, калькуляторы крафта, списки дел и новости с источниками.",
    keywords: [
      "AION2",
      "гайды AION2",
      "интерактивная карта AION2",
      "база предметов AION2",
      "классы AION2",
      "инструменты AION2",
    ],
  },
  ko: {
    title: "AION2 KINA | 공략, 인터랙티브 지도와 아이템 데이터베이스",
    description:
      "AION2 한국어 공략, 인터랙티브 지도, 아이템 데이터베이스, 직업 비교, 제작 계산기, 체크리스트와 출처별 소식을 제공합니다.",
    keywords: [
      "AION2",
      "아이온2 공략",
      "아이온2 인터랙티브 지도",
      "아이온2 아이템 데이터베이스",
      "아이온2 직업",
      "아이온2 도구",
    ],
  },
};

export const HOME_PUBLISHED_AT = "2026-07-15";
export const HOME_MODIFIED_AT = "2026-07-23";

const homeFaqBase = [
  {
    question: "What can I find on AION2 KINA?",
    answer:
      "AION2 KINA is an independent fan resource with class guides, official item data, interactive maps, crafting calculators, daily and weekly checklists, redeem-code records, and source-labelled news.",
  },
  {
    question: "Is AION2 KINA an official NC Corporation website?",
    answer:
      "No. AION2 KINA is an independent fan resource and is neither affiliated with nor endorsed by NC Corporation. AION2 and related marks belong to NC Corporation.",
  },
  {
    question: "How does AION2 KINA verify information?",
    answer:
      "We distinguish official announcements, official game data, and editorial or community findings. Factual pages show sources, version scope, and review dates when available.",
  },
  {
    question: "Which languages does AION2 KINA support?",
    answer:
      "AION2 KINA provides separate URLs for Simplified Chinese, English, French, German, Spanish (Spain), Japanese, Portuguese (Brazil), Russian, Korean, and Traditional Chinese. Unreviewed game terms are marked as provisional and replaced when official localized terminology becomes available.",
  },
] as const;

const zhHant: Record<string, string> = {
  Home: "首頁",
  Guides: "攻略",
  Classes: "職業",
  Database: "資料庫",
  Tools: "工具",
  News: "新聞",
  "Getting Started": "新手入門",
  "A clear route through the essential systems and early priorities.":
    "快速掌握核心系統與前期優先事項。",
  "Classes & Builds": "職業與配裝",
  "Focused playstyle notes, skill priorities, and build planning.":
    "整理玩法重點、技能優先級與養成規劃。",
  "World Database": "世界資料庫",
  "Organized regions, encounters, items, and progression references.":
    "集中查找地區、戰鬥、物品與成長資料。",
  "START HERE": "從這裡開始",
  "New Player Route": "新手成長路線",
  "A guided path from character setup to your first coordinated expedition.":
    "從角色建立到首次組隊遠征的清晰路線。",
  "Open route": "開啟路線",
  COMBAT: "戰鬥",
  "Compare roles, understand core loops, and shape a progression plan.":
    "比較定位、理解核心循環並規劃成長方向。",
  "Compare classes": "比較職業",
  EXPLORATION: "探索",
  "World & Maps": "世界與地圖",
  "Browse regions, landmarks, travel notes, and field discoveries.":
    "瀏覽地區、地標、移動資訊與野外發現。",
  "Explore the world": "探索世界",
  "GROUP PLAY": "團隊玩法",
  "Expedition Guides": "遠征攻略",
  "Compact mechanics, party checks, and clear encounter callouts.":
    "快速查看機制、隊伍要求與戰鬥提醒。",
  "Review expeditions": "查看遠征",
  COLLECTIONS: "收集",
  "Items & Progression": "物品與成長",
  "Keep equipment, materials, and upgrade references in one place.":
    "集中整理裝備、材料與強化資料。",
  "Browse items": "瀏覽物品",
  UTILITY: "實用工具",
  "Player Tools": "玩家工具",
  "A home for checklists, planners, calculators, and quick comparisons.":
    "整合清單、規劃器、計算器與快速比較。",
  "Open tools": "開啟工具",
  "Check the latest official announcements": "查看最新官方公告",
  "Review your build and progression goals": "檢查配裝與成長目標",
  "Plan your next group activity or resource run": "規劃下一次組隊或資源採集",
  GUIDE: "攻略",
  "6 MIN READ": "閱讀 6 分鐘",
  "New Player Roadmap: Your First Steps in AION2": "AION2 新手路線：踏出第一步",
  "A practical orientation for players building their first route through Atreia.":
    "協助新玩家規劃首次探索亞特雷亞的實用指南。",
  "SOURCE TRACKER": "消息追蹤",
  "3 MIN READ": "閱讀 3 分鐘",
  "Official Channels & Release Watch: What to Follow": "官方頻道與版本情報：該追蹤什麼",
  "Keep announcements, broadcasts, and confirmed information easy to verify.":
    "讓公告、直播與已確認資訊保持清楚可查。",
  "Skip to content": "跳至主要內容",
  "Choose your AION2 faction theme": "選擇 AION2 種族主題",
  "Choose language": "選擇語言",
  "Elyos hero in the luminous world of Elysea": "光明世界中的天族英雄",
  "Asmodian hero in the violet world of Asmodae": "紫夜世界中的魔族英雄",
  "Elyos and Asmodian heroes of Atreia": "亞特雷亞的天族與魔族英雄",
  "ENTER ELYSEA": "天族入口",
  "ENTER AS ELYOS": "以天族身分進入",
  "ENTER ASMODAE": "魔族入口",
  "ENTER AS ASMODIAN": "以魔族身分進入",
  "CHOOSE YOUR FACTION · YOU CAN CHANGE YOUR THEME AT ANY TIME":
    "選擇你的種族 · 之後可隨時切換主題",
  "AION2 KINA home": "AION2 KINA 首頁",
  "Primary navigation": "主要導覽",
  "Search guides, builds, or regions": "搜尋攻略、配裝或地區",
  "Search KINA": "搜尋 KINA",
  "Choose interface": "選擇介面主題",
  "GLOBAL PLAYER RESOURCE": "全球玩家資料站",
  "INTERFACE 01 / ELYOS": "介面 01 / 天族",
  "INTERFACE 02 / ASMODIAN": "介面 02 / 魔族",
  "Two Worlds. One Journey.": "兩個世界，一段旅程。",
  "AION2 Guides, Interactive Map & Item Database": "AION2 攻略、互動地圖與物品資料庫",
  "Find class guides, item data, an interactive map, crafting calculators, and daily or weekly activities, with official announcements, in-game data, and community findings clearly distinguished.":
    "查找職業攻略、物品資料、互動地圖、製作計算器與每日／每週活動；官方公告、遊戲內資料與社群發現會分開標示。",
  "AION2 KINA is an independent AION2 guide hub for class guides, official item data, an interactive map, crafting calculators, and daily and weekly tools. Official announcements, game data, and community findings are labelled separately.":
    "AION2 KINA 是獨立的 AION2 攻略站，提供職業攻略、官方物品資料、互動地圖、製作計算器與每日／每週工具；官方公告、遊戲資料與社群發現均分開標示。",
  "Search AION2 guides, items, classes, maps, and tools": "搜尋 AION2 攻略、物品、職業、地圖與工具",
  "Search items, guides, classes, maps, or tools": "搜尋物品、攻略、職業、地圖或工具",
  Search: "搜尋",
  "Primary actions": "主要操作",
  "Open Interactive Map": "開啟互動地圖",
  "Search Item Database": "搜尋物品資料庫",
  "Quick entries": "快速入口",
  "Browse Guides": "查看攻略",
  "Compare Classes": "比較職業",
  "Open Player Tools": "開啟玩家工具",
  "EXPEDITION / TODAY": "今日 / 遠征",
  "Your Daily Route": "你的每日路線",
  "Daily route progress": "每日路線進度",
  "MY CHECKLIST / THIS DEVICE": "我的清單 / 本機",
  "My checklist": "我的清單",
  "Checklist progress": "清單進度",
  Daily: "每日",
  Weekly: "每週",
  "One-time": "一次性",
  "No checklist items yet.": "還沒有清單項目。",
  "Local storage is unavailable; changes may not persist.":
    "瀏覽器無法使用本機儲存；變更可能不會保留。",
  "Saved on this device. Daily and weekly cycles reset automatically.":
    "儲存在這台裝置；每日與每週完成狀態會依伺服器週期自動更新。",
  "Open full checklist": "開啟完整清單",
  "Source guide": "資料來源說明",
  "Know what’s confirmed.": "快速分清已確認資訊。",
  "Official announcements, in-game data, and community findings are clearly distinguished.":
    "官方公告、遊戲內資料與社群發現會分開標示。",
  "See our source guide": "查看資料來源說明",
  "START HERE / CORE FEATURES": "從這裡開始 / 核心功能",
  "Everything you need, one click away.": "需要的資料與工具，一次直達。",
  "Open the map, search item data, compare classes, calculate crafting materials, track activities, or check redeem codes.":
    "開啟地圖、搜尋物品、比較職業、計算製作材料、追蹤活動，或查看兌換碼。",
  "Interactive Map": "互動地圖",
  "Explore complete AION2 maps and the collection markers available in each region.":
    "查看完整 AION2 地圖，以及各地區目前提供的收集標記。",
  "Item Database": "物品資料庫",
  "Search equipment, materials, consumables, and other item records in one place.":
    "集中搜尋裝備、材料、消耗品與其他物品資料。",
  "Class Guides": "職業攻略",
  "Compare class difficulty, combat roles, playstyles, and progression advice.":
    "比較職業難度、戰鬥定位、玩法與養成建議。",
  "Crafting Calculator": "製作材料計算器",
  "Calculate recipe quantities, base materials, inventory shortages, and estimated cost.":
    "計算配方數量、基礎材料、庫存缺口與預估成本。",
  "Daily & Weekly Checklist": "每日／每週清單",
  "Track recurring activities and your own tasks around the game reset schedule.":
    "依遊戲重置週期追蹤固定活動與自訂任務。",
  "Redeem Codes": "兌換碼",
  "Check currently listed codes, availability dates, and the in-game redemption guide.":
    "查看目前收錄的兌換碼、可用日期與遊戲內兌換指南。",
  "DAILY / WEEKLY": "每日 / 每週",
  "Keep today’s priorities in view.": "今天要做什麼，一眼看清。",
  "Track recurring activities and your own tasks. Completion states stay on this device and refresh with the configured game schedule.":
    "追蹤固定活動與自訂任務；完成狀態保存在本裝置，並依設定的遊戲週期更新。",
  "EXPLORE / TOPICS": "探索 / 內容分類",
  "Browse KINA": "瀏覽 KINA",
  "Browse all guides": "瀏覽所有攻略",
  "ONE WORLD / TWO PERSPECTIVES": "一個世界 / 兩種視角",
  "Choose your side. Keep the same clear route.": "選擇陣營，沿用同一條清晰路線。",
  "Switch between Elyos and Asmodian interfaces at any time. Your preference stays on this device while the guides and data remain consistent.":
    "可隨時切換天族與魔族介面；偏好會保存在本裝置，攻略與資料內容保持一致。",
  "Switch interface from banner": "從橫幅切換介面",
  "Elyos Interface": "天族介面",
  "Asmodian Interface": "魔族介面",
  "FIELD NOTES": "前線筆記",
  "Latest Intel": "最新情報",
  "Short, useful reads designed to get you oriented quickly.": "用精簡實用的內容快速掌握方向。",
  "Browse all notes": "瀏覽全部筆記",
  "Find your path between worlds.": "在兩個世界之間找到你的路。",
  "Footer navigation": "頁尾導覽",
  "Independent fan resource for global players. AION2 and related marks belong to NC Corporation. Not affiliated with or endorsed by NC Corporation.":
    "面向全球玩家的獨立粉絲資料站。AION2 與相關標誌屬於 NC Corporation；本站與 NC Corporation 無隸屬或背書關係。",
  "How does AION2 KINA verify its information?": "AION2 KINA 如何驗證資訊？",
  "AION2 KINA checks factual claims against NC announcements and official game-data pages; editorial and community findings are labelled separately.":
    "AION2 KINA 會以 NC 公告與官方遊戲資料頁核對事實；編輯判斷與社群發現會另外標示。",
  "NC describes AION2 as its vision of a complete evolution of AION.":
    "NC 將 AION2 描述為其對 AION 完整進化的願景。",
  "Official references": "官方參考來源",
  "AION2 official global teaser": "AION2 官方全球預告站",
  "NC press release on AION2 core content": "NC 的 AION2 核心內容新聞稿",
  "AION2 Taiwan official item database": "AION2 台灣官方物品資料庫",
  "Reviewed by": "審閱者",
  "Last reviewed": "最後審閱",
  "AION2 KINA questions and answers": "AION2 KINA 常見問題",
  "Direct answers about this independent fan resource, its sources, and language coverage.":
    "直接說明這個獨立玩家資料站、資料來源與語言範圍。",
  "What can I find on AION2 KINA?": "AION2 KINA 可以找到什麼？",
  "AION2 KINA is an independent fan resource with class guides, official item data, interactive maps, crafting calculators, daily and weekly checklists, redeem-code records, and source-labelled news.":
    "AION2 KINA 是獨立玩家資料站，提供職業攻略、官方物品資料、互動地圖、製作計算器、每日與每週清單、兌換碼紀錄及標明來源的新聞。",
  "Is AION2 KINA an official NC Corporation website?": "AION2 KINA 是 NC Corporation 官方網站嗎？",
  "No. AION2 KINA is an independent fan resource and is neither affiliated with nor endorsed by NC Corporation. AION2 and related marks belong to NC Corporation.":
    "不是。AION2 KINA 是獨立玩家資料站，與 NC Corporation 沒有隸屬或背書關係；AION2 與相關標誌屬於 NC Corporation。",
  "How does AION2 KINA verify information?": "AION2 KINA 如何核對資訊？",
  "We distinguish official announcements, official game data, and editorial or community findings. Factual pages show sources, version scope, and review dates when available.":
    "我們會區分官方公告、官方遊戲資料，以及編輯或社群發現；事實性頁面會在可取得時列出來源、版本範圍與審閱日期。",
  "Which languages does AION2 KINA support?": "AION2 KINA 支援哪些語言？",
  "AION2 KINA provides separate URLs for Simplified Chinese, English, French, German, Spanish (Spain), Japanese, Portuguese (Brazil), Russian, Korean, and Traditional Chinese. Unreviewed game terms are marked as provisional and replaced when official localized terminology becomes available.":
    "AION2 KINA 為簡體中文、英文、法文、德文、西班牙文（西班牙）、日文、巴西葡萄牙文、俄文、韓文與繁體中文提供獨立網址。尚未完成官方術語校對的遊戲名稱會標示為暫譯，並在官方本地化名稱公布後更新。",
};

const ko: Record<string, string> = {
  Home: "홈",
  Guides: "공략",
  Classes: "직업",
  Database: "데이터베이스",
  Tools: "도구",
  News: "뉴스",
  "Getting Started": "시작하기",
  "A clear route through the essential systems and early priorities.":
    "핵심 시스템과 초반 우선순위를 빠르게 익히세요.",
  "Classes & Builds": "직업과 빌드",
  "Focused playstyle notes, skill priorities, and build planning.":
    "플레이 방식, 스킬 우선순위와 성장 계획을 정리합니다.",
  "World Database": "월드 데이터베이스",
  "Organized regions, encounters, items, and progression references.":
    "지역, 전투, 아이템과 성장 정보를 한곳에서 확인하세요.",
  "START HERE": "여기서 시작",
  "New Player Route": "신규 플레이어 루트",
  "A guided path from character setup to your first coordinated expedition.":
    "캐릭터 생성부터 첫 파티 원정까지 이어지는 안내 경로입니다.",
  "Open route": "루트 열기",
  COMBAT: "전투",
  "Compare roles, understand core loops, and shape a progression plan.":
    "역할과 핵심 전투 흐름을 비교하고 성장 계획을 세우세요.",
  "Compare classes": "직업 비교",
  EXPLORATION: "탐험",
  "World & Maps": "월드와 지도",
  "Browse regions, landmarks, travel notes, and field discoveries.":
    "지역, 랜드마크, 이동 정보와 필드 발견을 살펴보세요.",
  "Explore the world": "월드 탐험",
  "GROUP PLAY": "협동 플레이",
  "Expedition Guides": "원정 공략",
  "Compact mechanics, party checks, and clear encounter callouts.":
    "핵심 기믹, 파티 조건과 전투 주의점을 빠르게 확인하세요.",
  "Review expeditions": "원정 보기",
  COLLECTIONS: "수집",
  "Items & Progression": "아이템과 성장",
  "Keep equipment, materials, and upgrade references in one place.":
    "장비, 재료와 강화 정보를 한곳에서 관리하세요.",
  "Browse items": "아이템 보기",
  UTILITY: "유틸리티",
  "Player Tools": "플레이어 도구",
  "A home for checklists, planners, calculators, and quick comparisons.":
    "체크리스트, 플래너, 계산기와 빠른 비교를 제공합니다.",
  "Open tools": "도구 열기",
  "Check the latest official announcements": "최신 공식 공지 확인",
  "Review your build and progression goals": "빌드와 성장 목표 점검",
  "Plan your next group activity or resource run": "다음 파티 활동이나 자원 수집 계획",
  GUIDE: "공략",
  "6 MIN READ": "6분 읽기",
  "New Player Roadmap: Your First Steps in AION2": "AION2 신규 플레이어 로드맵",
  "A practical orientation for players building their first route through Atreia.":
    "아트레이아에서 첫 여정을 준비하는 플레이어를 위한 실용 안내입니다.",
  "SOURCE TRACKER": "소식 추적",
  "3 MIN READ": "3분 읽기",
  "Official Channels & Release Watch: What to Follow": "공식 채널과 출시 소식 확인법",
  "Keep announcements, broadcasts, and confirmed information easy to verify.":
    "공지, 방송과 확인된 정보를 쉽게 검증할 수 있게 정리합니다.",
  "Skip to content": "본문으로 이동",
  "Choose your AION2 faction theme": "AION2 종족 테마 선택",
  "Choose language": "언어 선택",
  "Elyos hero in the luminous world of Elysea": "빛의 세계에 선 천족 영웅",
  "Asmodian hero in the violet world of Asmodae": "보랏빛 세계에 선 마족 영웅",
  "Elyos and Asmodian heroes of Atreia": "아트레이아의 천족과 마족 영웅",
  "ENTER ELYSEA": "천계 입장",
  "ENTER AS ELYOS": "천족으로 입장",
  "ENTER ASMODAE": "마계 입장",
  "ENTER AS ASMODIAN": "마족으로 입장",
  "CHOOSE YOUR FACTION · YOU CAN CHANGE YOUR THEME AT ANY TIME":
    "종족을 선택하세요 · 테마는 언제든 변경할 수 있습니다",
  "AION2 KINA home": "AION2 KINA 홈",
  "Primary navigation": "주요 내비게이션",
  "Search guides, builds, or regions": "공략, 빌드 또는 지역 검색",
  "Search KINA": "KINA 검색",
  "Choose interface": "인터페이스 선택",
  "GLOBAL PLAYER RESOURCE": "글로벌 플레이어 자료",
  "INTERFACE 01 / ELYOS": "인터페이스 01 / 천족",
  "INTERFACE 02 / ASMODIAN": "인터페이스 02 / 마족",
  "Two Worlds. One Journey.": "두 세계, 하나의 여정.",
  "AION2 Guides, Interactive Map & Item Database": "AION2 공략, 인터랙티브 지도와 아이템 데이터베이스",
  "Find class guides, item data, an interactive map, crafting calculators, and daily or weekly activities, with official announcements, in-game data, and community findings clearly distinguished.":
    "직업 공략, 아이템 정보, 인터랙티브 지도, 제작 계산기와 일일·주간 활동을 확인하세요. 공식 공지, 게임 내 정보와 커뮤니티 발견은 구분해 표시합니다.",
  "AION2 KINA is an independent AION2 guide hub for class guides, official item data, an interactive map, crafting calculators, and daily and weekly tools. Official announcements, game data, and community findings are labelled separately.":
    "AION2 KINA는 직업 공략, 공식 아이템 데이터, 인터랙티브 지도, 제작 계산기와 일일·주간 도구를 제공하는 독립 AION2 가이드 허브입니다. 공식 공지, 게임 데이터와 커뮤니티 발견을 구분해 표시합니다.",
  "Search AION2 guides, items, classes, maps, and tools": "AION2 공략, 아이템, 직업, 지도와 도구 검색",
  "Search items, guides, classes, maps, or tools": "아이템, 공략, 직업, 지도 또는 도구 검색",
  Search: "검색",
  "Primary actions": "주요 작업",
  "Open Interactive Map": "인터랙티브 지도 열기",
  "Search Item Database": "아이템 데이터베이스 검색",
  "Quick entries": "빠른 메뉴",
  "Browse Guides": "공략 보기",
  "Compare Classes": "직업 비교",
  "Open Player Tools": "플레이어 도구 열기",
  "EXPEDITION / TODAY": "오늘 / 원정",
  "Your Daily Route": "오늘의 루트",
  "Daily route progress": "오늘의 루트 진행도",
  "MY CHECKLIST / THIS DEVICE": "내 체크리스트 / 현재 기기",
  "My checklist": "내 체크리스트",
  "Checklist progress": "체크리스트 진행도",
  Daily: "일일",
  Weekly: "주간",
  "One-time": "한 번",
  "No checklist items yet.": "아직 체크리스트 항목이 없습니다.",
  "Local storage is unavailable; changes may not persist.":
    "로컬 저장소를 사용할 수 없어 변경 사항이 유지되지 않을 수 있습니다.",
  "Saved on this device. Daily and weekly cycles reset automatically.":
    "이 기기에 저장되며 일일·주간 완료 상태는 서버 주기에 맞춰 자동 갱신됩니다.",
  "Open full checklist": "전체 체크리스트 열기",
  "Source guide": "출처 안내",
  "Know what’s confirmed.": "확인된 정보를 한눈에.",
  "Official announcements, in-game data, and community findings are clearly distinguished.":
    "공식 공지, 게임 내 정보와 커뮤니티 발견을 구분해 제공합니다.",
  "See our source guide": "출처 안내 보기",
  "START HERE / CORE FEATURES": "여기서 시작 / 핵심 기능",
  "Everything you need, one click away.": "필요한 정보와 도구를 한 번에.",
  "Open the map, search item data, compare classes, calculate crafting materials, track activities, or check redeem codes.":
    "지도를 열고 아이템을 검색하거나 직업 비교, 제작 재료 계산, 활동 추적과 쿠폰 확인을 시작하세요.",
  "Interactive Map": "인터랙티브 지도",
  "Explore complete AION2 maps and the collection markers available in each region.":
    "완성된 AION2 지도와 각 지역에서 제공되는 수집 표식을 확인하세요.",
  "Item Database": "아이템 데이터베이스",
  "Search equipment, materials, consumables, and other item records in one place.":
    "장비, 재료, 소모품과 기타 아이템 정보를 한곳에서 검색하세요.",
  "Class Guides": "직업 공략",
  "Compare class difficulty, combat roles, playstyles, and progression advice.":
    "직업 난이도, 전투 역할, 플레이 방식과 성장 조언을 비교하세요.",
  "Crafting Calculator": "제작 재료 계산기",
  "Calculate recipe quantities, base materials, inventory shortages, and estimated cost.":
    "제작 수량, 기본 재료, 보유량 부족분과 예상 비용을 계산하세요.",
  "Daily & Weekly Checklist": "일일·주간 체크리스트",
  "Track recurring activities and your own tasks around the game reset schedule.":
    "게임 초기화 일정에 맞춰 반복 활동과 직접 만든 작업을 추적하세요.",
  "Redeem Codes": "쿠폰 코드",
  "Check currently listed codes, availability dates, and the in-game redemption guide.":
    "현재 등록된 코드, 사용 가능 기간과 게임 내 입력 방법을 확인하세요.",
  "DAILY / WEEKLY": "일일 / 주간",
  "Keep today’s priorities in view.": "오늘 할 일을 한눈에 확인하세요.",
  "Track recurring activities and your own tasks. Completion states stay on this device and refresh with the configured game schedule.":
    "반복 활동과 직접 만든 작업을 추적하세요. 완료 상태는 이 기기에 저장되고 설정된 게임 일정에 맞춰 갱신됩니다.",
  "EXPLORE / TOPICS": "둘러보기 / 콘텐츠 분류",
  "Browse KINA": "KINA 둘러보기",
  "Browse all guides": "모든 공략 보기",
  "ONE WORLD / TWO PERSPECTIVES": "하나의 세계 / 두 시선",
  "Choose your side. Keep the same clear route.": "진영을 선택해도 명확한 길은 그대로입니다.",
  "Switch between Elyos and Asmodian interfaces at any time. Your preference stays on this device while the guides and data remain consistent.":
    "천족과 마족 인터페이스를 언제든 전환할 수 있습니다. 선택은 이 기기에 저장되고 공략과 데이터는 동일하게 유지됩니다.",
  "Switch interface from banner": "배너에서 인터페이스 전환",
  "Elyos Interface": "천족 인터페이스",
  "Asmodian Interface": "마족 인터페이스",
  "FIELD NOTES": "필드 노트",
  "Latest Intel": "최신 정보",
  "Short, useful reads designed to get you oriented quickly.": "짧고 실용적인 글로 빠르게 방향을 잡으세요.",
  "Browse all notes": "모든 노트 보기",
  "Find your path between worlds.": "두 세계 사이에서 나만의 길을 찾으세요.",
  "Footer navigation": "푸터 내비게이션",
  "Independent fan resource for global players. AION2 and related marks belong to NC Corporation. Not affiliated with or endorsed by NC Corporation.":
    "글로벌 플레이어를 위한 독립 팬 자료입니다. AION2와 관련 표시는 NC Corporation의 자산이며, 본 사이트는 NC Corporation과 제휴하거나 보증을 받지 않습니다.",
  "How does AION2 KINA verify its information?": "AION2 KINA는 정보를 어떻게 검증하나요?",
  "AION2 KINA checks factual claims against NC announcements and official game-data pages; editorial and community findings are labelled separately.":
    "AION2 KINA는 NC 공지와 공식 게임 데이터 페이지를 기준으로 사실을 확인하며, 편집 판단과 커뮤니티 발견은 별도로 표시합니다.",
  "NC describes AION2 as its vision of a complete evolution of AION.":
    "NC는 AION2를 AION의 완전한 진화에 대한 비전으로 설명합니다.",
  "Official references": "공식 참고 출처",
  "AION2 official global teaser": "AION2 공식 글로벌 티저",
  "NC press release on AION2 core content": "AION2 핵심 콘텐츠 NC 보도자료",
  "AION2 Taiwan official item database": "AION2 대만 공식 아이템 데이터베이스",
  "Reviewed by": "검토",
  "Last reviewed": "최종 검토",
  "AION2 KINA questions and answers": "AION2 KINA 질문과 답변",
  "Direct answers about this independent fan resource, its sources, and language coverage.":
    "독립 팬 자료, 출처와 지원 언어에 관한 핵심 답변입니다.",
  "What can I find on AION2 KINA?": "AION2 KINA에서 무엇을 찾을 수 있나요?",
  "AION2 KINA is an independent fan resource with class guides, official item data, interactive maps, crafting calculators, daily and weekly checklists, redeem-code records, and source-labelled news.":
    "AION2 KINA는 직업 공략, 공식 아이템 데이터, 인터랙티브 지도, 제작 계산기, 일일·주간 체크리스트, 쿠폰 기록과 출처가 표시된 뉴스를 제공하는 독립 팬 자료입니다.",
  "Is AION2 KINA an official NC Corporation website?": "AION2 KINA는 NC Corporation 공식 사이트인가요?",
  "No. AION2 KINA is an independent fan resource and is neither affiliated with nor endorsed by NC Corporation. AION2 and related marks belong to NC Corporation.":
    "아닙니다. AION2 KINA는 NC Corporation과 제휴하거나 보증을 받지 않은 독립 팬 자료입니다. AION2와 관련 표시는 NC Corporation의 자산입니다.",
  "How does AION2 KINA verify information?": "AION2 KINA는 정보를 어떻게 확인하나요?",
  "We distinguish official announcements, official game data, and editorial or community findings. Factual pages show sources, version scope, and review dates when available.":
    "공식 공지, 공식 게임 데이터, 편집 또는 커뮤니티 발견을 구분합니다. 사실 기반 페이지에는 가능한 경우 출처, 버전 범위와 검토 날짜를 표시합니다.",
  "Which languages does AION2 KINA support?": "AION2 KINA는 어떤 언어를 지원하나요?",
  "AION2 KINA provides separate URLs for Simplified Chinese, English, French, German, Spanish (Spain), Japanese, Portuguese (Brazil), Russian, Korean, and Traditional Chinese. Unreviewed game terms are marked as provisional and replaced when official localized terminology becomes available.":
    "AION2 KINA는 중국어 간체, 영어, 프랑스어, 독일어, 스페인어(스페인), 일본어, 포르투갈어(브라질), 러시아어, 한국어와 중국어 번체에 각각 별도 URL을 제공합니다. 공식 용어 검토가 끝나지 않은 게임 명칭은 임시 번역으로 표시하며 공식 현지화가 공개되면 교체합니다.",
};

export const homeCopyKeys = Object.freeze(Object.keys(zhHant));

const curatedTranslations: Record<HomeLocale, Record<string, string>> = {
  "zh-hans": {
    "Choose your AION2 faction theme": "选择你的 AION2 阵营主题",
    "Choose language": "选择语言",
    "ENTER ELYSEA": "天族入口",
    "ENTER AS ELYOS": "以天族身份进入",
    "ENTER ASMODAE": "魔族入口",
    "ENTER AS ASMODIAN": "以魔族身份进入",
    "GLOBAL PLAYER RESOURCE": "全球玩家资料站",
    "INTERFACE 01 / ELYOS": "界面 01 / 天族",
    "INTERFACE 02 / ASMODIAN": "界面 02 / 魔族",
    "Two Worlds. One Journey.": "两个世界，一段旅程。",
    "AION2 Guides, Interactive Map & Item Database":
      "AION2 攻略、互动地图与物品数据库",
    "Search items, guides, classes, maps, or tools":
      "搜索物品、攻略、职业、地图或工具",
    Search: "搜索",
    "Open Interactive Map": "打开互动地图",
    "Search Item Database": "搜索物品数据库",
    "My checklist": "我的清单",
    Daily: "每日",
    Weekly: "每周",
    "Open full checklist": "打开完整清单",
    "Interactive Map": "互动地图",
    "Item Database": "物品数据库",
    "Class Guides": "职业攻略",
    "Crafting Calculator": "制作材料计算器",
    "Daily & Weekly Checklist": "每日／每周清单",
    "Redeem Codes": "兑换码",
    "Latest Intel": "最新情报",
  },
  "zh-hant": zhHant,
  en: {},
  fr: {
    "Choose your AION2 faction theme": "Choisissez votre faction AION2",
    "Choose language": "Choisir la langue",
    "ENTER ELYSEA": "ENTRER EN ÉLYSÉA",
    "ENTER AS ELYOS": "Entrer en tant qu’Élyséen",
    "ENTER ASMODAE": "ENTRER EN ASMODÉE",
    "ENTER AS ASMODIAN": "Entrer en tant qu’Asmodien",
    "GLOBAL PLAYER RESOURCE": "RESSOURCE POUR LES JOUEURS DU MONDE ENTIER",
    "INTERFACE 01 / ELYOS": "INTERFACE 01 / ÉLYSÉENS",
    "INTERFACE 02 / ASMODIAN": "INTERFACE 02 / ASMODIENS",
    "Two Worlds. One Journey.": "Deux mondes. Une aventure.",
    "AION2 Guides, Interactive Map & Item Database":
      "Guides AION2, carte interactive et base d’objets",
    "Search items, guides, classes, maps, or tools":
      "Rechercher objets, guides, classes, cartes ou outils",
    Search: "Rechercher",
    "Open Interactive Map": "Ouvrir la carte interactive",
    "Search Item Database": "Rechercher dans la base d’objets",
    "My checklist": "Ma liste",
    Daily: "Quotidien",
    Weekly: "Hebdomadaire",
    "Open full checklist": "Ouvrir la liste complète",
    "Interactive Map": "Carte interactive",
    "Item Database": "Base d’objets",
    "Class Guides": "Guides de classes",
    "Crafting Calculator": "Calculateur d’artisanat",
    "Daily & Weekly Checklist": "Liste quotidienne et hebdomadaire",
    "Redeem Codes": "Codes",
    "Latest Intel": "Dernières informations",
  },
  de: {
    "Choose your AION2 faction theme": "Wähle deine AION2-Fraktion",
    "Choose language": "Sprache wählen",
    "ENTER ELYSEA": "ELYSEA BETRETEN",
    "ENTER AS ELYOS": "Als Elyos eintreten",
    "ENTER ASMODAE": "ASMODAE BETRETEN",
    "ENTER AS ASMODIAN": "Als Asmodier eintreten",
    "GLOBAL PLAYER RESOURCE": "RESSOURCE FÜR SPIELER WELTWEIT",
    "INTERFACE 01 / ELYOS": "OBERFLÄCHE 01 / ELYOS",
    "INTERFACE 02 / ASMODIAN": "OBERFLÄCHE 02 / ASMODIER",
    "Two Worlds. One Journey.": "Zwei Welten. Eine Reise.",
    "AION2 Guides, Interactive Map & Item Database":
      "AION2-Guides, interaktive Karte & Item-Datenbank",
    "Search items, guides, classes, maps, or tools":
      "Items, Guides, Klassen, Karten oder Tools suchen",
    Search: "Suchen",
    "Open Interactive Map": "Interaktive Karte öffnen",
    "Search Item Database": "Item-Datenbank durchsuchen",
    "My checklist": "Meine Checkliste",
    Daily: "Täglich",
    Weekly: "Wöchentlich",
    "Open full checklist": "Vollständige Checkliste öffnen",
    "Interactive Map": "Interaktive Karte",
    "Item Database": "Item-Datenbank",
    "Class Guides": "Klassenguides",
    "Crafting Calculator": "Handwerksrechner",
    "Daily & Weekly Checklist": "Tägliche & wöchentliche Checkliste",
    "Redeem Codes": "Codes",
    "Latest Intel": "Neueste Informationen",
  },
  es: {
    "Choose your AION2 faction theme": "Elige tu facción de AION2",
    "Choose language": "Elegir idioma",
    "ENTER ELYSEA": "ENTRAR EN ELYSEA",
    "ENTER AS ELYOS": "Entrar como elyo",
    "ENTER ASMODAE": "ENTRAR EN ASMODAE",
    "ENTER AS ASMODIAN": "Entrar como asmodiano",
    "GLOBAL PLAYER RESOURCE": "RECURSO PARA JUGADORES DE TODO EL MUNDO",
    "INTERFACE 01 / ELYOS": "INTERFAZ 01 / ELYOS",
    "INTERFACE 02 / ASMODIAN": "INTERFAZ 02 / ASMODIANOS",
    "Two Worlds. One Journey.": "Dos mundos. Un viaje.",
    "AION2 Guides, Interactive Map & Item Database":
      "Guías de AION2, mapa interactivo y base de objetos",
    "Search items, guides, classes, maps, or tools":
      "Buscar objetos, guías, clases, mapas o herramientas",
    Search: "Buscar",
    "Open Interactive Map": "Abrir el mapa interactivo",
    "Search Item Database": "Buscar en la base de objetos",
    "My checklist": "Mi lista",
    Daily: "Diario",
    Weekly: "Semanal",
    "Open full checklist": "Abrir la lista completa",
    "Interactive Map": "Mapa interactivo",
    "Item Database": "Base de objetos",
    "Class Guides": "Guías de clases",
    "Crafting Calculator": "Calculadora de fabricación",
    "Daily & Weekly Checklist": "Lista diaria y semanal",
    "Redeem Codes": "Códigos",
    "Latest Intel": "Últimas noticias",
  },
  ja: {
    "Choose your AION2 faction theme": "AION2の種族テーマを選択",
    "Choose language": "言語を選択",
    "ENTER ELYSEA": "天族で入る",
    "ENTER AS ELYOS": "天族として開始",
    "ENTER ASMODAE": "魔族で入る",
    "ENTER AS ASMODIAN": "魔族として開始",
    "GLOBAL PLAYER RESOURCE": "グローバルプレイヤー向け情報サイト",
    "INTERFACE 01 / ELYOS": "インターフェース 01 / 天族",
    "INTERFACE 02 / ASMODIAN": "インターフェース 02 / 魔族",
    "Two Worlds. One Journey.": "二つの世界、一つの旅。",
    "AION2 Guides, Interactive Map & Item Database":
      "AION2 攻略・インタラクティブマップ・アイテムDB",
    "Search items, guides, classes, maps, or tools":
      "アイテム、攻略、クラス、マップ、ツールを検索",
    Search: "検索",
    "Open Interactive Map": "インタラクティブマップを開く",
    "Search Item Database": "アイテムDBを検索",
    "My checklist": "マイチェックリスト",
    Daily: "毎日",
    Weekly: "毎週",
    "Open full checklist": "チェックリストを開く",
    "Interactive Map": "インタラクティブマップ",
    "Item Database": "アイテムデータベース",
    "Class Guides": "クラス攻略",
    "Crafting Calculator": "製作計算機",
    "Daily & Weekly Checklist": "日課・週課チェックリスト",
    "Redeem Codes": "クーポンコード",
    "Latest Intel": "最新情報",
  },
  "pt-br": {
    "Choose your AION2 faction theme": "Escolha sua facção em AION2",
    "Choose language": "Escolher idioma",
    "ENTER ELYSEA": "ENTRAR EM ELYSEA",
    "ENTER AS ELYOS": "Entrar como Elyos",
    "ENTER ASMODAE": "ENTRAR EM ASMODAE",
    "ENTER AS ASMODIAN": "Entrar como Asmodian",
    "GLOBAL PLAYER RESOURCE": "RECURSO PARA JOGADORES DO MUNDO TODO",
    "INTERFACE 01 / ELYOS": "INTERFACE 01 / ELYOS",
    "INTERFACE 02 / ASMODIAN": "INTERFACE 02 / ASMODIAN",
    "Two Worlds. One Journey.": "Dois mundos. Uma jornada.",
    "AION2 Guides, Interactive Map & Item Database":
      "Guias de AION2, mapa interativo e banco de itens",
    "Search items, guides, classes, maps, or tools":
      "Pesquisar itens, guias, classes, mapas ou ferramentas",
    Search: "Pesquisar",
    "Open Interactive Map": "Abrir mapa interativo",
    "Search Item Database": "Pesquisar no banco de itens",
    "My checklist": "Minha lista",
    Daily: "Diário",
    Weekly: "Semanal",
    "Open full checklist": "Abrir lista completa",
    "Interactive Map": "Mapa interativo",
    "Item Database": "Banco de itens",
    "Class Guides": "Guias de classes",
    "Crafting Calculator": "Calculadora de criação",
    "Daily & Weekly Checklist": "Lista diária e semanal",
    "Redeem Codes": "Códigos",
    "Latest Intel": "Últimas informações",
  },
  ru: {
    "Choose your AION2 faction theme": "Выберите фракцию AION2",
    "Choose language": "Выбрать язык",
    "ENTER ELYSEA": "ВОЙТИ ЗА ЭЛИЙЦЕВ",
    "ENTER AS ELYOS": "Начать за элийцев",
    "ENTER ASMODAE": "ВОЙТИ ЗА АСМОДИАН",
    "ENTER AS ASMODIAN": "Начать за асмодиан",
    "GLOBAL PLAYER RESOURCE": "РЕСУРС ДЛЯ ИГРОКОВ СО ВСЕГО МИРА",
    "INTERFACE 01 / ELYOS": "ИНТЕРФЕЙС 01 / ЭЛИЙЦЫ",
    "INTERFACE 02 / ASMODIAN": "ИНТЕРФЕЙС 02 / АСМОДИАНЕ",
    "Two Worlds. One Journey.": "Два мира. Одно путешествие.",
    "AION2 Guides, Interactive Map & Item Database":
      "Гайды AION2, интерактивная карта и база предметов",
    "Search items, guides, classes, maps, or tools":
      "Поиск предметов, гайдов, классов, карт или инструментов",
    Search: "Найти",
    "Open Interactive Map": "Открыть интерактивную карту",
    "Search Item Database": "Поиск в базе предметов",
    "My checklist": "Мой список дел",
    Daily: "Ежедневно",
    Weekly: "Еженедельно",
    "Open full checklist": "Открыть полный список",
    "Interactive Map": "Интерактивная карта",
    "Item Database": "База предметов",
    "Class Guides": "Гайды по классам",
    "Crafting Calculator": "Калькулятор крафта",
    "Daily & Weekly Checklist": "Ежедневный и еженедельный список",
    "Redeem Codes": "Промокоды",
    "Latest Intel": "Последние материалы",
  },
  ko,
};

const englishHomeTranslations = Object.fromEntries(
  homeCopyKeys.map((key) => [key, key]),
) as Record<string, string>;

export const homeTranslations: Record<
  HomeLocale,
  Record<string, string>
> = {
  "zh-hans": {
    ...homeEditorialLocales.translations["zh-hans"],
    ...reviewedOtherHome["zh-hans"],
    ...curatedTranslations["zh-hans"],
  },
  "zh-hant": curatedTranslations["zh-hant"],
  en: englishHomeTranslations,
  fr: {
    ...homeEditorialLocales.translations.fr,
    ...reviewedLatinHome.fr,
    ...curatedTranslations.fr,
  },
  de: {
    ...homeEditorialLocales.translations.de,
    ...reviewedOtherHome.de,
    ...curatedTranslations.de,
  },
  es: {
    ...homeEditorialLocales.translations.es,
    ...reviewedLatinHome.es,
    ...curatedTranslations.es,
  },
  ja: {
    ...homeEditorialLocales.translations.ja,
    ...reviewedJapaneseHome.ja,
    ...curatedTranslations.ja,
  },
  "pt-br": {
    ...homeEditorialLocales.translations["pt-br"],
    ...reviewedLatinHome["pt-br"],
    ...curatedTranslations["pt-br"],
  },
  ru: {
    ...homeEditorialLocales.translations.ru,
    ...reviewedOtherHome.ru,
    ...curatedTranslations.ru,
  },
  ko: curatedTranslations.ko,
};

export function homeText(locale: HomeLocale, value: string) {
  return homeTranslations[locale][value] ?? value;
}

export function getHomeFaq(locale: HomeLocale) {
  return homeFaqBase.map((item) => ({
    question: homeText(locale, item.question),
    answer: homeText(locale, item.answer),
  }));
}

export function isHomeLocale(value: string): value is HomeLocale {
  return homeLocales.includes(value as HomeLocale);
}
