import type { ContentSection } from "./content-registry";
import { type SiteLocale } from "./site-config.ts";

export const SEO_TITLE_MAX_LENGTH = 60;
export const SEO_DESCRIPTION_MIN_LENGTH = 110;
export const SEO_DESCRIPTION_MAX_LENGTH = 160;

const englishContentTitleOverrides: Readonly<Record<string, string>> = {
  "guides/interactive-map-quickstart": "AION2 Interactive Map Quickstart",
  "classes/class-planning-framework": "AION2 Build Planning Guide",
  "database/map-data-methodology": "How to Read AION2 Item & Map Data",
  "guides/aether-extraction": "AION2 Aether Extraction Guide",
  "guides/deity-traces": "AION2 Empyrean Traces Guide",
  "news/aion2chapterone-coupon-status": "AION2CHAPTERONE Coupon Status",
  "guides/abyss-status": "AION2 Abyss Status: Season 2 & Chapter 1",
  "guides/godstone-imprint": "AION2 Godstone Imprint & Synthesis",
  "guides/arcana": "AION2 Arcana Sets, Sources & Limits",
  "news/global-release-september-2026": "AION 2 Release Date: Sep 30 Early Access",
  "classes/base-class-roster": "AION2 Classes: All 8 Roles & Weapons",
  "classes/class-choice-guide": "Which AION2 Class Should You Choose?",
  "news/global-server-regions": "AION2 Global Server Regions & Languages",
  "guides/soul-imprint": "AION2 Soul Imprint & Tuning Guide",
  "guides/wing-enhancement": "AION2 Wing Enhancement Guide",
  "guides/equipment-tuning": "AION2 Equipment Tuning & Transfer",
  "guides/atool": "Atool for AION2: Data & Ranking Limits",
  "guides/elyos-vs-asmodians": "AION2 Elyos vs Asmodians: What Changes",
  "guides/global-pre-registration": "AION 2 Global Pre-Register: Official Link",
  "news/founders-packs-announced-july-2026": "AION 2 Founder’s Packs Announced",
  "guides/founders-pack-comparison": "AION 2 Founder’s Pack Prices & Rewards",
  "guides/early-access": "AION 2 Early Access: Date & Servers",
  "guides/steam-vs-purple": "AION 2 Steam vs PURPLE Guide",
  "news/fromis-9-collaboration": "AION2 × fromis_9 Event & Deadline",
  "guides/kinah-bound": "AION2 Kina (Bound): Official Facts",
  "guides/system-requirements": "AION 2 System Requirements & Storage",
  "guides/beginner-launch-checklist": "AION2 Global Launch Preparation Guide",
  "guides/global-monetization-watchlist": "Is AION 2 Free to Play?",
  "guides/spacetime-rift": "AION 2 Spacetime Rift Schedule & Map",
  "guides/ing-meter": "AION2 ING Meter: Third-Party Download & Setup",
  "guides/character-presets-style-shop": "AION2 Character Creation & Preset Guide",
  "guides/crafting-and-transfer-crafting": "AION2 Crafting & Transfer Crafting Guide",
  "guides/scam-check": "AION 2 Scam & Fake-Site Checklist",
  "classes/brawler": "AION2 Brawler Skills: Rage & Rampage",
  "guides/pet-progression": "AION2 Pet Progression & Shared Levels",
  "database/aion-2-wiki": "AION 2 Wiki: Classes, Items, Maps & Guides",
  "guides/aion-2-gameplay": "AION 2 Gameplay: Combat, PvE, PvP & Flight",
  "guides/aion-2-download": "AION 2 Download: Steam & PURPLE Install Guide",
  "guides/aion-2-platforms": "AION 2 Platforms: PC, PS5, Xbox & Mobile",
  "guides/aion-2-server-status": "AION 2 Server Status, Regions & Maintenance",
  "guides/aion-2-tier-list": "AION 2 Tier List: Global Class Method",
};

const localizedContentTitleOverrides: Readonly<
  Partial<Record<SiteLocale, Readonly<Record<string, string>>>>
> = {
  "zh-hans": {
    "news/corroded-decontamination-cross-faction-pve":
      "AION2 腐蚀净化设施：3,700 装等与跨种族 PvE",
  },
  de: {
    "guides/global-pre-registration":
      "AION 2 Vorregistrierung: Link & Belohnungen",
    "guides/global-monetization-watchlist":
      "AION 2 Pay-to-Win? Bezahlmodell",
    "database/aion-2-wiki":
      "AION 2 Wiki: Klassen, Items und Karten",
    "guides/aion-2-gameplay":
      "AION 2 Gameplay: Flug, PvE und PvP",
    "guides/aion-2-download":
      "AION 2 Download: Steam und PURPLE",
    "guides/aion-2-platforms":
      "AION 2 Plattformen: PC, PS5, Xbox, Mobil",
    "guides/aion-2-server-status":
      "AION 2 Serverstatus: Regionen und Wartung",
    "guides/aion-2-tier-list":
      "AION 2 Tier-Liste: Klassen-Methode",
    "guides/character-presets-style-shop":
      "AION2 Charaktererstellung & Vorlagen",
    "classes/sorcerer":
      "AION2 Sorcerer: Build und Skills",
  },
  fr: {
    "guides/global-monetization-watchlist":
      "AION 2 Pay-to-Win ? Modèle économique",
    "database/aion-2-wiki":
      "Wiki AION 2 : classes, objets et cartes",
    "guides/aion-2-gameplay":
      "Gameplay AION 2 : vol, PvE et PvP",
    "guides/aion-2-download":
      "Télécharger AION 2 : Steam et PURPLE",
    "guides/aion-2-platforms":
      "Plateformes AION 2 : PC, PS5, Xbox, mobile",
    "guides/aion-2-server-status":
      "Serveurs AION 2 : régions et maintenance",
    "guides/aion-2-tier-list":
      "Tier List AION 2 : méthode par classe",
    "guides/character-presets-style-shop":
      "Création de personnage AION2 : préréglages",
    "classes/ranger":
      "AION2 Ranger : arbre de compétences",
    "classes/sorcerer":
      "AION2 Sorcerer : build et compétences",
  },
  es: {
    "guides/global-monetization-watchlist":
      "¿AION 2 es Pay-to-Win? Monetización",
    "database/aion-2-wiki":
      "Wiki de AION 2: clases, objetos y mapas",
    "guides/aion-2-gameplay":
      "Gameplay de AION 2: vuelo, PvE y PvP",
    "guides/aion-2-download":
      "Descargar AION 2: Steam y PURPLE",
    "guides/aion-2-platforms":
      "Plataformas AION 2: PC, PS5, Xbox y móvil",
    "guides/aion-2-server-status":
      "Servidores AION 2: regiones y mantenimiento",
    "guides/aion-2-tier-list":
      "Tier List AION 2: método por clase",
    "guides/character-presets-style-shop":
      "Creación de personaje AION2: ajustes",
    "classes/ranger":
      "AION2 Ranger: árbol de habilidades",
    "classes/sorcerer":
      "AION2 Sorcerer: build y habilidades",
  },
  "pt-br": {
    "guides/global-monetization-watchlist":
      "AION 2 é Pay-to-Win? Monetização",
    "database/aion-2-wiki":
      "Wiki de AION 2: classes, itens e mapas",
    "guides/aion-2-gameplay":
      "Jogabilidade de AION 2: voo, PvE e PvP",
    "guides/aion-2-download":
      "Download de AION 2: Steam e PURPLE",
    "guides/aion-2-platforms":
      "Plataformas AION 2: PC, PS5, Xbox e celular",
    "guides/aion-2-server-status":
      "Servidores AION 2: regiões e manutenção",
    "guides/aion-2-tier-list":
      "Tier List AION 2: método por classe",
    "guides/character-presets-style-shop":
      "Criação de personagem AION2: modelos",
    "classes/ranger":
      "AION2 Ranger: árvore de habilidades",
    "classes/sorcerer":
      "AION2 Sorcerer: build e habilidades",
  },
  ru: {
    "guides/global-pre-registration":
      "AION 2: предрегистрация, ссылка и награды",
    "guides/global-monetization-watchlist":
      "AION 2: Pay-to-Win и монетизация",
    "database/aion-2-wiki":
      "AION 2 Wiki: классы, предметы и карты",
    "guides/aion-2-gameplay":
      "Геймплей AION 2: полёт, PvE и PvP",
    "guides/aion-2-download":
      "Загрузка AION 2: Steam и PURPLE",
    "guides/aion-2-platforms":
      "Платформы AION 2: PC, PS5, Xbox и мобильные",
    "guides/aion-2-server-status":
      "Серверы AION 2: регионы и обслуживание",
    "guides/aion-2-tier-list":
      "Тир-лист AION 2: метод по классам",
    "guides/character-presets-style-shop":
      "Создание персонажа AION2: шаблоны",
  },
  ko: {
    "guides/ing-meter":
      "아이온2 잉미터기: 비공식 제3자 도구 설치·안전 안내",
    "database/aion-2-wiki":
      "아이온2 위키: 직업·아이템·지도·제작 정보",
    "guides/aion-2-gameplay":
      "아이온2 게임플레이: 전투·PvE·PvP·비행",
    "guides/aion-2-download":
      "아이온2 다운로드: Steam·PURPLE 설치 안내",
    "guides/aion-2-platforms":
      "아이온2 플랫폼: PC·PS5·Xbox·모바일",
    "guides/aion-2-server-status":
      "아이온2 서버 상태: 글로벌 지역·점검 정보",
    "guides/aion-2-tier-list":
      "아이온2 티어 리스트: 글로벌 직업 비교 방법",
    "guides/character-presets-style-shop":
      "아이온2 캐릭터 생성·프리셋 가이드",
  },
  "zh-hant": {
    "database/aion-2-wiki":
      "AION 2 Wiki：職業、物品、地圖與攻略",
    "guides/aion-2-gameplay":
      "AION 2 Gameplay：戰鬥、PvE、PvP 與飛行",
    "guides/aion-2-download":
      "AION 2 Download：Steam／PURPLE 安裝指南",
    "guides/aion-2-platforms":
      "AION 2 Platforms：PC、PS5、Xbox 與手機",
    "guides/aion-2-server-status":
      "AION 2 Server Status：全球伺服器與維護",
    "guides/aion-2-tier-list":
      "AION 2 Tier List：全球版職業比較方法",
    "guides/character-presets-style-shop":
      "AION2 角色創建與預設外觀攻略",
    "guides/global-monetization-watchlist":
      "AION 2 免費玩嗎？Pay to Win 與付費機制",
  },
};

const descriptionExtensions = {
  "zh-hans": [
    "页面同时标注来源、适用版本、服务地区与最后核对日期，方便玩家在更新后重新确认内容。",
    "实际数值、价格、概率与活动状态请以当前游戏版本和官方公告为准。",
  ],
  "zh-hant": [
    "本頁同時標示發布與更新日期、適用範圍、來源說明及相關攻略、地圖或工具入口，方便玩家在改版後重新核對，並區分已確認資訊與仍需驗證的部分。",
    "頁面保留來源說明、發布與更新日期、適用範圍和相關內容入口，方便玩家在改版後重新核對已確認與未確認資訊。",
    "頁面同時標示來源、更新日期與適用範圍，方便改版後重新核對資訊。",
    "實際數值、價格、機率和活動狀態請以目前遊戲版本為準。",
  ],
  en: [
    "The page also records its sources, version scope, update date, and links to related AION2 guides, maps, and player tools.",
    "Check regional and version notes before applying the information in game.",
  ],
  fr: [
    "La page indique aussi ses sources, la version et la région concernées, ainsi que la date de dernière vérification pour faciliter les contrôles après une mise à jour.",
    "Vérifiez toujours les valeurs, prix, probabilités et événements dans la version actuelle du jeu et les annonces officielles.",
  ],
  de: [
    "Die Seite nennt außerdem Quellen, Versions- und Regionsbezug sowie das letzte Prüfdatum, damit sich die Angaben nach einem Update erneut kontrollieren lassen.",
    "Prüfe Werte, Preise, Wahrscheinlichkeiten und Ereignisse immer in der aktuellen Spielversion und anhand offizieller Meldungen.",
  ],
  es: [
    "La página también indica las fuentes, la versión y región aplicables y la fecha de la última revisión para facilitar nuevas comprobaciones tras una actualización.",
    "Confirma siempre los valores, precios, probabilidades y eventos en la versión actual del juego y en los avisos oficiales.",
  ],
  ja: [
    "ページには出典、対象バージョン、サービス地域、最終確認日も記載し、アップデート後に情報を再確認できるようにしています。",
    "数値、価格、確率、イベント状況は、現在のゲーム内表示と公式告知を基準に確認してください。",
  ],
  "pt-br": [
    "A página também informa as fontes, a versão e a região aplicáveis e a data da última verificação para facilitar novas conferências após uma atualização.",
    "Confirme valores, preços, probabilidades e eventos na versão atual do jogo e nos comunicados oficiais.",
  ],
  ru: [
    "На странице также указаны источники, версия и регион применения, а также дата последней проверки, чтобы сведения можно было перепроверить после обновления.",
    "Значения, цены, вероятности и события следует сверять с текущей версией игры и официальными объявлениями.",
  ],
  ko: [
    "페이지에 출처, 업데이트 날짜, 적용 범위와 관련 콘텐츠 경로를 표시해 패치 후 확인된 내용과 미확인 범위를 다시 검토할 수 있습니다.",
    "출처, 업데이트 날짜와 적용 범위를 함께 표시해 패치 후 내용을 다시 확인할 수 있습니다.",
    "게임에 적용하기 전에 지역 및 버전 안내를 확인하세요.",
  ],
} as const satisfies Record<SiteLocale, readonly string[]>;

const descriptionOverrides: Readonly<Record<string, string>> = {
  "tools": "Use the AION2 class finder, interactive map, crafting calculator, and daily checklist to plan your next session on mobile or desktop.",
  "hub:classes": "Compare AION2 class roles, combat loops, skill priorities, equipment choices, and versioned PvE or PvP plans without relying on an unsupported tier list.",
  "hub:news": "Track sourced AION2 global-release, patch, dungeon, and system news from official NC and platform pages, with dates, regional scope, historical-event labels, and links to relevant guides.",
  "content:news/global-release-september-2026": "AION 2 Global Early Access starts September 30, 2026. NC has not confirmed one consistent full-launch date or exact opening time; check Steam and PURPLE.",
  "content:guides/deity-traces": "Learn what official Chapter 1 material confirms about Daeva Express batch completion for selected Sealed Dungeons, Strongholds, and Empyrean Traces.",
  "content:guides/abyss-status": "Review official 2026 AION2 Abyss changes across Season 2, East and West force rules, siege balance, and the stat-capped Chaotic Upper zone.",
  "content:guides/godstone-imprint": "Check NC's official probability catalog for Godstone material grades, obtainable lists, and Imprint fields—without invented best picks or trigger rates.",
  "content:guides/arcana": "Review three announced AION2 Arcana effects, Season 1–3 extraction materials, and crafting sources without treating one live build as permanent meta.",
  "content:guides/soul-imprint": "Use NC probability disclosures and item data to understand AION2 Soul Imprint, full resets, one-effect tuning, and why priorities depend on current gear.",
  "content:guides/equipment-tuning": "Learn how AION2 Soul Tuning rerolls one effect and recalculates outcomes for the current item, and why in-game probabilities remain the final reference.",
  "content:guides/elyos-vs-asmodians": "Compare the confirmed Elyos and Asmodian starting regions, faction-separated servers, and route into large-scale RvR without unsupported power claims.",
  "content:guides/kinah-bound": "Check what the March 25, 2026 Korea/Taiwan update confirms about Kina (Bound), its source categories, and version scope—without invented farming profits.",
  "content:guides/system-requirements": "Check AION 2 Global's official minimum and recommended Windows PC specs, 100 GB storage requirement, SSD guidance, and the download details still unannounced.",
  "content:classes/class-choice-guide": "Compare AION2's eight base classes by official role, weapon, solo or group fit, and combat preference—without unsupported rankings or launch-meta claims.",
  "content:guides/beginner-launch-checklist": "Prepare for AION2 global launch with Sep 30 advance access, Steam or PURPLE choices, PC specs, server planning, account safety, and first-day decisions.",
  "content:guides/global-monetization-watchlist": "Learn how AION 2's free-to-play model, planned $15 membership, Market access, Kina–Quna Exchange, per-character Daeva Pass, and optional purchases work.",
  "content:guides/global-pre-registration": "Pre-register for AION 2 Global on NC's official page. Checked open July 24, 2026; no fixed deadline is announced. See eligibility and Pagati pet rewards.",
  "content:news/founders-packs-announced-july-2026": "NC confirms all three AION 2 Founder’s Packs start five-day advance access Sep 30; Steam packages list Oct 5, while exact opening hours remain unannounced.",
  "content:guides/founders-pack-comparison": "Compare AION 2 Founder’s Pack USD prices, rewards, five-day Early Access, PURPLE upgrades, platform locks, refund conditions, and edition value.",
  "content:guides/early-access": "Find the confirmed AION 2 Early Access date, five-day duration, eligible Founder’s Packs, server and market rules, and exact start time still unannounced.",
  "content:guides/steam-vs-purple": "Compare AION 2 on Steam and PURPLE, including downloads, accounts, Founder’s Packs, upgrades, refunds, shared servers, and unconfirmed cross-save details.",
  "content:guides/ing-meter": "AION2 ING Meter is a third-party AIONING tool. Check its developer download, installation, use, uploads, and safety risks. KINA does not host or certify files.",
  "content:classes/base-class-roster": "Compare all eight AION2 classes by official role and weapon: Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter.",
  "content:guides/character-presets-style-shop": "Review AION2's 200-plus customization controls, built-in presets, and official Style Shop, while treating third-party preset compatibility as unverified.",
  "content:guides/pet-progression": "Learn how AION2 pet ownership, Genus Insight, and levels are shared across one server, while costs and optimal routes remain tied to current game data.",
  "content:database/aion-2-wiki": "Explore the AION 2 Wiki for classes, official item IDs, interactive maps, crafting calculators, global guides, version scope, and source dates.",
  "content:guides/aion-2-gameplay": "See AION 2 Gameplay across 3D flight combat, eight classes, solo and group PvE, faction PvP, exploration, customization, and global launch limits.",
  "content:guides/aion-2-download": "Use official Steam or PURPLE paths for AION 2 Download, prepare 100 GB free space, avoid installer mirrors, and track the still-unannounced global preload.",
  "content:guides/aion-2-platforms": "Check AION 2 Global platform support: Steam and PURPLE PC are confirmed; PS5, Xbox, mobile, Steam Deck, and controllers remain unconfirmed.",
  "content:guides/aion-2-server-status": "Check confirmed AION 2 Global server regions and launch fields without a fabricated live status, population count, maintenance state, or world-name list.",
  "content:guides/aion-2-tier-list": "See why no reliable AION 2 Global tier list exists before launch and how classes will be compared by patch, activity, gear, role, difficulty, and sample.",
};

const localizedDescriptionOverrides: Readonly<Record<string, string>> = {
  "zh-hant:home": "AION2 KINA 提供繁體中文職業攻略、Build 規劃、互動地圖、物品資料庫、製作計算器、每日與每週清單、兌換碼及官方消息整理。每頁標示資料來源、適用地區、遊戲版本和最後更新日期，並區分官方確認、遊戲內資料與本站整理內容，方便全球服玩家快速查找職業玩法、地圖點位、製作材料和活動資訊。",
  "ko:home": "AION2 플레이어를 위한 한국어 공략, 직업·빌드 계획, 인터랙티브 지도, 공식 업데이트, 아이템 데이터베이스와 실용 도구를 제공합니다. 지역과 버전별 출처 및 업데이트 날짜를 확인하고 직업, 지도, 제작과 일일 활동 정보를 빠르게 찾으세요.",
  "zh-hant:tool:class-finder": "回答 6 個關於操作節奏、戰鬥距離、隊伍定位與 PvE／PvP 偏好的問題，取得三個較符合玩法的 AION2 職業建議，再連結八大職業總覽、操作難度比較與個別攻略交叉核對。結果只反映玩法匹配度，不代表職業強度、傷害排名或版本 Tier。",
  "en:tool:class-finder": "Answer six playstyle questions to get three AION2 class matches, then compare difficulty and guides. Results measure personal fit, not power or patch tiers.",
  "ko:tool:class-finder": "전투 속도, 거리, 파티 역할과 PvE·PvP 선호도에 관한 6개 질문에 답하고 AION2 직업 3개를 추천받으세요. 난이도 비교와 직업 공략으로 결과를 확인할 수 있으며, 추천은 플레이 성향 일치도일 뿐 직업 성능이나 패치 티어를 뜻하지 않습니다.",
  "zh-hant:tool:material-calculator": "搜尋 AION2 製作配方，依製作次數計算直接材料或基礎材料的總需求、目前庫存缺口與自訂單價成本。物品名稱、圖示與分類對照 NC 官方物品資料；配方關係來自標明日期的社群快照，改版後請依遊戲內製作畫面再次核對。",
  "en:tool:material-calculator": "Search AION2 crafting recipes and calculate direct or base-material requirements, inventory shortages, and custom-price costs by craft count. Item identity follows NC's official item data; recipe relationships use a dated community snapshot and should be checked in game after patches.",
  "ko:tool:material-calculator": "AION2 제작 레시피를 검색하고 제작 횟수에 따라 직접 또는 기본 재료의 총 필요량, 보유량 부족분과 사용자 입력 단가 비용을 계산하세요. 아이템 정보는 NC 공식 자료를 따르며 레시피 관계는 날짜가 표시된 커뮤니티 스냅샷이므로 패치 후 게임에서 다시 확인해야 합니다.",
  "zh-hant:content:guides/ing-meter": "查詢 AION2 ING Meter v1.7.1 的 AIONING 開發者下載來源、安裝前準備、基本使用、資料上傳與錯誤排查。KINA 不保存、轉發或認證第三方安裝檔，也不宣稱它是 NC 官方工具。",
  "ko:content:guides/ing-meter": "아이온2 잉미터기(잉 미터기·ING Meter)는 AIONING의 비공식 제3자 도구입니다. KINA는 NC 공식 다운로드 사이트가 아니며 설치 파일을 제공하지 않습니다. 개발자 배포처, 설치 권한, 데이터 업로드 범위와 사용 전 안전 점검을 확인하세요.",
  "fr:content:guides/global-monetization-watchlist": "Analyse du modèle free-to-play d’AION 2 Global : abonnement à 15 $, Marché, échange Kina–Quna, Pass de Daeva et limites encore inconnues.",
  "de:content:guides/global-monetization-watchlist": "Prüfe das Free-to-play-Modell von AION 2 Global: 15-$-Mitgliedschaft, Markt, Kina–Quna-Tausch, Daeva Pass und noch offene Kaufdetails.",
  "es:content:guides/global-monetization-watchlist": "Revisa el modelo free-to-play de AION 2 Global: membresía de 15 USD, Mercado, cambio Kina–Quna, Pase de Daeva y detalles de pago aún sin publicar.",
  "pt-br:content:guides/global-monetization-watchlist": "Veja o modelo free-to-play de AION 2 Global: assinatura de US$ 15, Mercado, câmbio Kina–Quna, Passe de Daeva e detalhes ainda não publicados.",
  "ru:content:guides/global-monetization-watchlist": "Разбор free-to-play-модели AION 2 Global: подписка за 15 $, рынок, обмен Kina–Quna, Daeva Pass и ещё не опубликованные условия покупок.",
  "fr:content:database/aion-2-wiki": "Le Wiki AION 2 réunit classes, objets, cartes interactives, calculateur de matériaux et guides Global, avec sources, dates, versions et régions.",
  "ru:content:guides/aion-2-gameplay": "Гайд по геймплею AION 2: полёт в 3D, ручной бой, восемь классов, одиночное и групповое PvE, фракционное PvP, исследование и настройка.",
  "fr:content:guides/aion-2-server-status": "Consultez les régions confirmées des serveurs AION 2 et les sources de maintenance, sans inventer d’état en direct, de population ni de noms de mondes.",
  "de:content:guides/aion-2-server-status": "Prüfe bestätigte AION 2-Serverregionen und offizielle Wartungsquellen, ohne Live-Status, Bevölkerung oder nicht veröffentlichte Weltnamen zu erfinden.",
  "es:content:guides/aion-2-server-status": "Consulta las regiones confirmadas de servidores AION 2 y las fuentes de mantenimiento sin inventar estado en vivo, población ni nombres de mundos.",
  "pt-br:content:guides/aion-2-server-status": "Confira regiões confirmadas dos servidores AION 2 e fontes de manutenção sem inventar status ao vivo, população ou nomes de mundos não publicados.",
  "ru:content:guides/aion-2-server-status": "Проверьте подтверждённые регионы серверов AION 2 и официальные сообщения о работах без выдуманного онлайн-статуса, населения и названий миров.",
  "fr:content:guides/aion-2-tier-list": "Cette Tier List AION 2 n’invente pas de rangs avant le lancement : elle explique une méthode par version, activité, rôle, équipement, difficulté et échantillon.",
  "fr:content:guides/character-presets-style-shop": "Guide de création de personnage AION2 : plus de 200 réglages, préréglages intégrés et Style Shop officiel, avec contrôle des modèles partagés.",
  "es:content:classes/sorcerer": "Guía AION2 Sorcerer por versión: rol oficial con grimorio, lanzamiento seguro, prioridad de habilidades, PvE, PvP, RvR y límites de prueba.",
  "zh-hant:content:database/aion-2-wiki": "AION 2 Wiki 集中整理職業、物品資料庫、互動地圖、製作計算器與全球版攻略；每項內容標示來源、適用地區、版本和更新日期，方便改版後重新核對。",
  "zh-hant:content:guides/aion-2-gameplay": "AION 2 Gameplay 指南整理立體飛行戰鬥、八大職業、單人與多人 PvE、陣營 PvP、探索及角色創建，並清楚區分全球版已確認內容與尚未公布項目。",
  "zh-hant:content:guides/aion-2-download": "AION 2 Download 指南說明 Steam 與 PURPLE 官方下載、Windows PC 需求、100 GB 空間和安裝安全；全球預載日期、精確開放時間及 PURPLE 全球安裝頁仍待 NC 公布，並以最新官方公告為準。",
  "zh-hant:content:guides/aion-2-platforms": "AION 2 Platforms 指南確認全球版支援 Steam 與 PURPLE 的 Windows PC；PS5、Xbox、手機、Steam Deck 和控制器仍未獲官方確認，請勿把韓國／台灣服務需求當成全球平台公告。",
  "zh-hant:content:guides/aion-2-server-status": "AION 2 Server Status 頁整理全球服務區域、官方維護與公告查詢入口，不虛構即時在線狀態、伺服器人口或世界名稱，並標示最後核對時間。",
  "zh-hant:content:guides/aion-2-tier-list": "AION 2 Tier List 頁說明全球版上線前為何沒有可靠職業排名，並提供按版本、活動、裝備、職責、難度與樣本量建立可驗證比較的方法。",
  "ko:content:database/aion-2-wiki": "아이온2 위키에서 직업, 공식 아이템 ID, 인터랙티브 지도, 제작 계산기와 글로벌 공략을 찾으세요. 각 자료에는 출처, 적용 지역, 버전과 업데이트 날짜를 표시해 패치 후 다시 확인할 수 있습니다.",
  "ko:content:guides/aion-2-gameplay": "아이온2 게임플레이 가이드는 3D 비행 전투, 8개 직업, 솔로·5인·10인 PvE, 진영 PvP, 탐험과 캐릭터 생성을 정리합니다. 글로벌판 확정 정보와 한국·대만 사례, 미발표 범위를 명확히 구분합니다.",
  "ko:content:guides/aion-2-download": "아이온2 다운로드 가이드에서 Steam·PURPLE 공식 경로, Windows PC 요구 사양, 100GB 저장 공간과 설치 안전 점검을 확인하세요. 글로벌 사전 다운로드 일정은 아직 미발표입니다.",
  "ko:content:guides/aion-2-platforms": "아이온2 플랫폼 가이드는 글로벌판에서 확인된 Steam·PURPLE Windows PC 지원을 정리합니다. PS5, Xbox, 모바일, Steam Deck과 컨트롤러 지원은 아직 공식 확인되지 않았습니다.",
  "ko:content:guides/aion-2-server-status": "아이온2 서버 상태 페이지는 글로벌 서비스 지역과 공식 점검·공지 확인 경로를 제공합니다. 실시간 접속 상태, 서버 인구나 월드 이름을 추측하지 않으며 마지막 확인 날짜와 미발표 항목을 함께 표시합니다.",
  "ko:content:guides/aion-2-tier-list": "아이온2 티어 리스트 페이지는 글로벌 출시 전 신뢰할 수 있는 순위가 없는 이유를 설명합니다. 패치, 콘텐츠, 장비, 역할, 난이도와 표본을 기록해 직업을 비교하는 검증 방법과 업데이트 날짜도 제공합니다.",
  "ko:content:classes/gladiator": "아이온2 검성 아르카나·빌드 가이드는 공식 대검, 근접 공격과 보조 탱커 역할을 바탕으로 선택 방법, PvE·PvP·RvR 운용, 조작 난이도와 버전별 검증 기준을 정리하며 미확인 수치는 추측하지 않습니다.",
  "ko:content:classes/assassin": "아이온2 살성 아르카나·빌드 가이드는 공식 양손 단검, 은신과 빠른 연계 역할을 바탕으로 선택 방법, 진입과 이탈, PvE·PvP·RvR 운용과 버전별 검증 기준을 정리하며 미확인 수치는 추측하지 않습니다.",
  "ko:content:classes/ranger": "아이온2 궁성 스킬 트리·빌드 가이드는 공식 원거리 활 역할을 바탕으로 스킬 우선순위, 위치 운용, PvE·PvP·RvR 대응, 자주 하는 실수와 버전별 검증 기준을 정리하며 미확인 수치는 추측하지 않습니다.",
  "ko:content:classes/sorcerer": "아이온2 마도성 빌드·스킬 우선순위 가이드는 공식 마법서, 순간 피해와 군중 제어 역할을 바탕으로 안전한 시전, PvE·PvP·RvR 운용과 버전별 검증 기준을 정리하며 미확인 수치는 추측하지 않습니다.",
};

const contextualDescriptionExtensions: Readonly<Record<string, string>> = {
  "zh-hant:hub": "依主題查找相關攻略、職業資料、物品資訊和實用工具，查看適用地區、版本與更新日期，並從關聯內容直接前往互動地圖、材料計算器、職業比較與官方消息，方便規劃下一步遊玩目標。",
  "ko:hub": "주제별 공략, 직업 정보, 아이템 데이터와 실용 도구를 찾고 적용 지역, 버전과 업데이트 날짜를 확인하세요. 관련 콘텐츠에서 인터랙티브 지도, 제작 계산기, 직업 비교와 공식 소식으로 바로 이동해 다음 플레이 목표를 계획할 수 있습니다.",
  "zh-hant:tools": "使用職業推薦器、互動地圖、製作材料計算器與每日清單；可查看三語資料、保存篩選或任務進度，並在手機與桌面裝置接續規劃探索、養成與日常活動。",
  "ko:tools": "직업 추천기, 인터랙티브 지도, 제작 계산기와 체크리스트를 한곳에서 이용하세요. 다국어 정보를 확인하고 필터나 작업 진행도를 저장하며 모바일과 데스크톱에서 탐험, 성장과 일일 활동 계획을 이어 갈 수 있습니다.",
  "zh-hant:map-hub": "可進一步查看各點位的名稱、座標與資料更新時間，保存篩選、規劃探索路線、記錄已找到的目標，或將目前結果分享給隊友，支援手機與桌面接續操作。",
  "en:map-hub": "Open each location for its name, coordinates, and data update date; save filters, plan an exploration route, track found objectives, or share the current result with your party on mobile or desktop.",
  "ko:map-hub": "각 포인트의 이름, 좌표와 데이터 업데이트 날짜를 확인하고 필터를 저장하세요. 탐험 경로를 계획하거나 발견한 목표를 기록하고, 현재 결과를 파티원과 공유할 수 있습니다.",
  "zh-hant:map": "可進一步查看點位名稱、詳細座標與分類，保存目前篩選、規劃探索路線、記錄已找到的目標，或把目前地圖狀態分享給隊友，方便在手機與桌面接續使用。",
  "en:map": "Open point names, detailed coordinates, and categories; save the current filters, plan an exploration route, track found objectives, or share the map state with your party across mobile and desktop.",
  "ko:map": "포인트 이름, 상세 좌표와 분류를 확인하고 현재 필터를 저장하세요. 탐험 경로를 계획하거나 발견한 목표를 기록하고, 현재 지도 상태를 파티원과 공유할 수 있습니다.",
  "zh-hant:map-type": "開啟後可比較點位名稱、類型、詳細座標與更新時間，直接套用對應地圖篩選，保存探索路線或已找到狀態，並把目前結果分享給隊友。",
  "en:map-type": "Compare point names, types, detailed coordinates, and update dates; open the matching map filter, save an exploration route or found status, and share the current result with your party.",
  "ko:map-type": "포인트 이름, 유형, 상세 좌표와 업데이트 날짜를 비교하세요. 해당 지도 필터를 바로 열고 탐험 경로나 발견 상태를 저장하며, 현재 결과를 파티원과 공유할 수 있습니다.",
  "zh-hant:tool:daily-checklist": "查詢 AION2 每日必做、每週必做活動與次數，依台港澳或韓國伺服器的每日 05:00、每週三 05:00 週期自動更新，也可建立自訂任務；進度只保存在目前裝置。",
  "en:tool:daily-checklist": "Track sourced AION2 daily and weekly activities, automatic 05:00 server cycles for Taiwan/Hong Kong/Macau or Korea, and custom tasks saved only on this device.",
  "ko:tool:daily-checklist": "AION2 일일·주간 활동과 횟수를 확인하고 대만·홍콩·마카오 또는 한국 서버의 매일 05:00·수요일 05:00 주기에 맞춰 자동 갱신하세요. 사용자 작업과 진행도는 현재 기기에만 저장됩니다.",
};

type DescriptionContext =
  | "hub"
  | "tools"
  | "map-hub"
  | "map"
  | "map-type"
  | "tool:daily-checklist";

const localizedContextualDescriptionExtensions = {
  hub: {
    "zh-hans":
      "按主题查找相关攻略、职业资料、物品信息和实用工具，核对适用地区、版本与更新时间，并直接前往互动地图、材料计算器、职业对比和官方消息，方便规划下一步游戏目标。",
    "zh-hant": contextualDescriptionExtensions["zh-hant:hub"],
    en: "Browse related guides, class data, item information, and player tools by topic; check regional scope, version, and update dates, then open the interactive map, material calculator, class comparisons, or official news to plan your next objective.",
    fr: "Parcourez par thème les guides, les classes, les objets et les outils AION2, vérifiez la région, la version et la date de mise à jour, puis accédez directement à la carte interactive, au calculateur de matériaux, aux comparatifs de classes ou aux actualités officielles.",
    de: "Finde nach Thema passende Guides, Klassen- und Gegenstandsdaten sowie nützliche Werkzeuge, prüfe Region, Version und Aktualisierungsdatum und öffne direkt interaktive Karte, Materialrechner, Klassenvergleiche oder offizielle Meldungen.",
    es: "Encuentra por tema guías, datos de clases, información de objetos y herramientas de AION2; comprueba la región, la versión y la fecha de actualización, y abre el mapa interactivo, la calculadora de materiales, las comparativas de clases o las noticias oficiales.",
    ja: "テーマ別に攻略、クラス、アイテム、便利ツールを探し、対象地域・バージョン・更新日を確認できます。関連ページからインタラクティブマップ、素材計算機、クラス比較、公式ニュースへ直接移動して、次の目標を計画できます。",
    "pt-br":
      "Encontre por tema guias, dados de classes, informações de itens e ferramentas de AION2; confira a região, a versão e a data de atualização e acesse diretamente o mapa interativo, a calculadora de materiais, as comparações de classes ou as notícias oficiais.",
    ru: "Ищите по темам руководства, сведения о классах и предметах и полезные инструменты AION2, проверяйте регион, версию и дату обновления, а затем переходите к интерактивной карте, калькулятору материалов, сравнению классов или официальным новостям.",
    ko: contextualDescriptionExtensions["ko:hub"],
  },
  tools: {
    "zh-hans":
      "使用职业推荐器、互动地图、制作材料计算器和每日清单；查看本地化资料、保存筛选或任务进度，并在手机与桌面设备上继续规划探索、养成和日常活动。",
    "zh-hant": contextualDescriptionExtensions["zh-hant:tools"],
    en: "Use the class finder, interactive map, crafting material calculator, and daily checklist; review localized data, save filters or task progress, and continue planning exploration, progression, and routines on mobile or desktop.",
    fr: "Utilisez le sélecteur de classe, la carte interactive, le calculateur de matériaux d’artisanat et la liste quotidienne; consultez les données localisées, enregistrez vos filtres ou votre progression et poursuivez votre planification sur mobile ou ordinateur.",
    de: "Nutze Klassenfinder, interaktive Karte, Herstellungsmaterial-Rechner und Tagescheckliste; lies lokalisierte Daten, speichere Filter oder Aufgabenfortschritt und plane Erkundung, Fortschritt und Routinen auf Mobilgerät oder Desktop weiter.",
    es: "Usa el recomendador de clases, el mapa interactivo, la calculadora de materiales de fabricación y la lista diaria; consulta datos localizados, guarda filtros o tareas y continúa planificando exploración, progreso y rutinas en móvil u ordenador.",
    ja: "クラス診断、インタラクティブマップ、製作素材計算機、デイリーチェックリストを利用できます。ローカライズ済み情報を確認し、フィルターやタスク進捗を保存して、スマートフォンとPCのどちらでも探索・育成・日課を計画できます。",
    "pt-br":
      "Use o recomendador de classes, o mapa interativo, a calculadora de materiais de criação e a lista diária; consulte dados localizados, salve filtros ou tarefas e continue planejando exploração, progressão e rotinas no celular ou computador.",
    ru: "Используйте подбор класса, интерактивную карту, калькулятор материалов для ремесла и ежедневный список; просматривайте локализованные данные, сохраняйте фильтры или прогресс задач и продолжайте планирование на телефоне или компьютере.",
    ko: contextualDescriptionExtensions["ko:tools"],
  },
  "map-hub": {
    "zh-hans":
      "逐一查看各点位的名称、坐标和资料更新时间，保存筛选条件、规划探索路线、记录已找到的目标，或把当前结果分享给队友，并可在手机与桌面设备上继续操作。",
    "zh-hant": contextualDescriptionExtensions["zh-hant:map-hub"],
    en: contextualDescriptionExtensions["en:map-hub"],
    fr: "Consultez le nom, les coordonnées et la date de mise à jour de chaque point; enregistrez des filtres, préparez un itinéraire, notez les objectifs trouvés ou partagez le résultat actuel avec votre groupe sur mobile ou ordinateur.",
    de: "Öffne für jeden Punkt Namen, Koordinaten und Aktualisierungsdatum; speichere Filter, plane eine Erkundungsroute, markiere gefundene Ziele oder teile das aktuelle Ergebnis mit deiner Gruppe auf Mobilgerät oder Desktop.",
    es: "Consulta el nombre, las coordenadas y la fecha de actualización de cada punto; guarda filtros, planifica una ruta, marca los objetivos encontrados o comparte el resultado actual con tu grupo desde el móvil o el ordenador.",
    ja: "各ポイントの名称、座標、データ更新日を確認できます。フィルターを保存し、探索ルートを計画し、発見済み目標を記録したり、現在の結果を仲間と共有したりできます。スマートフォンとPCの両方に対応しています。",
    "pt-br":
      "Consulte o nome, as coordenadas e a data de atualização de cada ponto; salve filtros, planeje uma rota, marque objetivos encontrados ou compartilhe o resultado atual com o grupo no celular ou computador.",
    ru: "Просматривайте название, координаты и дату обновления каждой точки; сохраняйте фильтры, прокладывайте маршрут, отмечайте найденные цели или делитесь текущим результатом с группой на телефоне или компьютере.",
    ko: contextualDescriptionExtensions["ko:map-hub"],
  },
  map: {
    "zh-hans":
      "查看点位名称、详细坐标和分类，保存当前筛选条件、规划探索路线、记录已找到的目标，或将地图状态分享给队友，方便在手机与桌面设备上继续使用。",
    "zh-hant": contextualDescriptionExtensions["zh-hant:map"],
    en: contextualDescriptionExtensions["en:map"],
    fr: "Consultez les noms, les coordonnées détaillées et les catégories des points; enregistrez les filtres actuels, préparez un itinéraire, notez les objectifs trouvés ou partagez l’état de la carte avec votre groupe sur mobile ou ordinateur.",
    de: "Öffne Punktnamen, genaue Koordinaten und Kategorien; speichere die aktuellen Filter, plane eine Erkundungsroute, markiere gefundene Ziele oder teile den Kartenstand mit deiner Gruppe auf Mobilgerät oder Desktop.",
    es: "Consulta nombres, coordenadas detalladas y categorías de puntos; guarda los filtros actuales, planifica una ruta, marca los objetivos encontrados o comparte el estado del mapa con tu grupo en móvil u ordenador.",
    ja: "ポイント名、詳細座標、カテゴリを確認し、現在のフィルターを保存できます。探索ルートの計画、発見済み目標の記録、仲間へのマップ状態の共有も、スマートフォンとPCの両方で行えます。",
    "pt-br":
      "Consulte nomes, coordenadas detalhadas e categorias dos pontos; salve os filtros atuais, planeje uma rota, marque objetivos encontrados ou compartilhe o estado do mapa com o grupo no celular ou computador.",
    ru: "Просматривайте названия точек, точные координаты и категории; сохраняйте текущие фильтры, прокладывайте маршрут, отмечайте найденные цели или делитесь состоянием карты с группой на телефоне или компьютере.",
    ko: contextualDescriptionExtensions["ko:map"],
  },
  "map-type": {
    "zh-hans":
      "对比点位名称、类型、详细坐标和更新时间，打开对应的地图筛选条件，保存探索路线或已找到状态，并把当前结果分享给队友。",
    "zh-hant": contextualDescriptionExtensions["zh-hant:map-type"],
    en: contextualDescriptionExtensions["en:map-type"],
    fr: "Comparez les noms, les types, les coordonnées détaillées et les dates de mise à jour; ouvrez le filtre correspondant sur la carte, enregistrez un itinéraire ou l’état des découvertes et partagez le résultat avec votre groupe.",
    de: "Vergleiche Punktnamen, Typen, genaue Koordinaten und Aktualisierungsdaten; öffne den passenden Kartenfilter, speichere Erkundungsroute oder Fundstatus und teile das aktuelle Ergebnis mit deiner Gruppe.",
    es: "Compara nombres, tipos, coordenadas detalladas y fechas de actualización; abre el filtro correspondiente del mapa, guarda una ruta o el estado de hallazgo y comparte el resultado actual con tu grupo.",
    ja: "ポイント名、種類、詳細座標、更新日を比較し、対応するマップフィルターを開けます。探索ルートや発見済み状態を保存し、現在の結果を仲間と共有できます。",
    "pt-br":
      "Compare nomes, tipos, coordenadas detalhadas e datas de atualização; abra o filtro correspondente no mapa, salve uma rota ou o estado de descoberta e compartilhe o resultado atual com o grupo.",
    ru: "Сравнивайте названия, типы, точные координаты и даты обновления точек; открывайте соответствующий фильтр карты, сохраняйте маршрут или статус находки и делитесь текущим результатом с группой.",
    ko: contextualDescriptionExtensions["ko:map-type"],
  },
  "tool:daily-checklist": {
    "zh-hans":
      "追踪有来源依据的 AION2 每日与每周活动，按台湾、香港、澳门或韩国服务器的 05:00 周期自动刷新，也可添加仅保存在当前设备上的自定义任务。",
    "zh-hant": contextualDescriptionExtensions["zh-hant:tool:daily-checklist"],
    en: contextualDescriptionExtensions["en:tool:daily-checklist"],
    fr: "Suivez les activités quotidiennes et hebdomadaires AION2 documentées, avec une réinitialisation automatique à 05:00 selon les cycles des serveurs de Taïwan, Hong Kong, Macao ou de Corée, et ajoutez des tâches personnalisées enregistrées uniquement sur cet appareil.",
    de: "Verfolge belegte tägliche und wöchentliche AION2-Aktivitäten mit automatischer Zurücksetzung um 05:00 nach den Serverzyklen für Taiwan, Hongkong, Macau oder Korea und füge eigene Aufgaben hinzu, die nur auf diesem Gerät gespeichert werden.",
    es: "Sigue actividades diarias y semanales de AION2 con fuentes, reinicio automático a las 05:00 según los ciclos de los servidores de Taiwán, Hong Kong, Macao o Corea, y tareas personalizadas guardadas solo en este dispositivo.",
    ja: "出典を確認できるAION2の日課・週課を管理し、台湾・香港・マカオまたは韓国サーバーの05:00更新周期に合わせて自動リセットできます。カスタムタスクは現在の端末にのみ保存されます。",
    "pt-br":
      "Acompanhe atividades diárias e semanais documentadas de AION2, com reinício automático às 05:00 conforme os ciclos dos servidores de Taiwan, Hong Kong, Macau ou Coreia, e adicione tarefas personalizadas salvas apenas neste dispositivo.",
    ru: "Отслеживайте подтверждённые источниками ежедневные и еженедельные активности AION2 с автоматическим сбросом в 05:00 по циклам серверов Тайваня, Гонконга, Макао или Кореи и добавляйте свои задачи, сохраняемые только на этом устройстве.",
    ko: contextualDescriptionExtensions["ko:tool:daily-checklist"],
  },
} as const satisfies Readonly<
  Record<DescriptionContext, Readonly<Record<SiteLocale, string>>>
>;

function textLength(value: string) {
  return Array.from(value).length;
}

function sliceText(value: string, length: number) {
  return Array.from(value).slice(0, length).join("");
}

function compactWhitespace(value: string) {
  return value.replace(/\s+/gu, " ").trim();
}

function truncateTitle(value: string, maxLength: number) {
  if (textLength(value) <= maxLength) return value;
  const candidate = sliceText(value, maxLength - 1);
  const wordBoundary = candidate.lastIndexOf(" ");
  const compact =
    wordBoundary >= Math.floor(maxLength * 0.6)
      ? candidate.slice(0, wordBoundary)
      : candidate;
  return `${compact.replace(/[\s,:;–—-]+$/u, "")}…`;
}

function truncateDescription(value: string) {
  if (textLength(value) <= SEO_DESCRIPTION_MAX_LENGTH) return value;

  const candidate = sliceText(value, SEO_DESCRIPTION_MAX_LENGTH - 1);
  const sentenceBoundaries = [...candidate.matchAll(/[.!?。！？](?=\s|$)/gu)];
  const lastSentence = sentenceBoundaries.at(-1);
  if (lastSentence && textLength(candidate.slice(0, (lastSentence.index ?? 0) + 1)) >= SEO_DESCRIPTION_MIN_LENGTH) {
    return candidate.slice(0, (lastSentence.index ?? 0) + 1).trim();
  }

  const wordBoundary = candidate.lastIndexOf(" ");
  const compact =
    wordBoundary >= SEO_DESCRIPTION_MIN_LENGTH
      ? candidate.slice(0, wordBoundary)
      : candidate;
  return `${compact.replace(/[\s,:;–—-]+$/u, "")}…`;
}

export function buildSeoDescription(
  value: string,
  locale: SiteLocale,
  key?: string,
) {
  let description = compactWhitespace(
    (key ? localizedDescriptionOverrides[`${locale}:${key}`] : undefined) ??
      (locale === "en" && key ? descriptionOverrides[key] : undefined) ??
      value,
  );
  const contextualKey: DescriptionContext | undefined =
    key?.startsWith("hub:")
      ? "hub"
      : key?.startsWith("map:")
        ? "map"
        : key && key in localizedContextualDescriptionExtensions
          ? (key as DescriptionContext)
          : undefined;
  const contextualExtension = contextualKey
    ? localizedContextualDescriptionExtensions[contextualKey][locale]
    : undefined;
  const extensions = contextualExtension
    ? [contextualExtension, ...descriptionExtensions[locale]]
    : descriptionExtensions[locale];
  for (const extension of extensions) {
    if (textLength(description) >= SEO_DESCRIPTION_MIN_LENGTH) break;
    description = `${description} ${extension}`;
  }
  return truncateDescription(description);
}

export function buildContentSeoTitle(
  section: ContentSection,
  slug: string,
  locale: SiteLocale,
  sourceTitle: string,
) {
  const key = `${section}/${slug}`;
  const title =
    localizedContentTitleOverrides[locale]?.[key] ??
    (locale === "en"
      ? englishContentTitleOverrides[key] ?? sourceTitle
      : sourceTitle);
  const suffix = " | AION2 KINA";
  return `${truncateTitle(compactWhitespace(title), SEO_TITLE_MAX_LENGTH - textLength(suffix))}${suffix}`;
}
