import rawMapSeoData from "./map-seo-data.json";
import mapManifest from "../public/map-assets/manifest.json";
import {
  getMapPagePublication,
  getMapPoiPublication,
  getMapTypePublication,
  isMapPublicationIndexable,
  isMapPoiPublicationIndexable,
  mapSeoPublication,
  type MapTypePublication,
} from "./map-seo-publication";
import {
  getLanguageAlternates,
  localizedHref,
  siteLocaleConfig,
  siteLocales,
  type MapDataLocale,
  type SiteLocale,
} from "./site-config";
import { absoluteSiteUrl } from "./site-url";

export const localeSlugs = siteLocales;
export type LocaleSlug = SiteLocale;
export type MapLocale = MapDataLocale;

type LocalizedText = { name: string; description: string };

export type SeoMap = {
  name: string;
  slug: string;
  type: string;
  width: number;
  height: number;
  sourceWidth: number;
  sourceHeight: number;
  scaleX: number;
  scaleY: number;
  markerCount: number;
  regionCount: number;
  tilePreview: string;
  categoryCounts: Record<string, number>;
  subtypeCounts: Record<string, number>;
  locales: Record<MapLocale, LocalizedText>;
};

export type SeoPoi = {
  id: string;
  slug: string;
  typeSlug: string | null;
  indexable: boolean;
  subtype: string;
  category: string;
  region: string;
  sourceX: number;
  sourceY: number;
  locales: Record<MapLocale, LocalizedText>;
};

type MapSeoData = {
  source: {
    build: string;
    attribution: string;
    generatedAt: string;
    mapOriginProject: string;
  };
  categories: Record<MapLocale, Record<string, string>>;
  maps: SeoMap[];
  poisByMap: Record<string, SeoPoi[]>;
};

export const mapSeoData = rawMapSeoData as unknown as MapSeoData;
export const mapAssetBasePath = "/map-runtime";
export const mapAssetReleaseBasePath =
  `${mapAssetBasePath}/releases/${mapManifest.versionKey}`;
export function mapAssetUrl(path: string) {
  const assetPath = path.replace(/^\/map-assets/, "");
  return `${mapAssetReleaseBasePath}${assetPath}`;
}

export function absoluteMapUrl(path: string, origin?: string | null) {
  return origin === undefined
    ? absoluteSiteUrl(path)
    : absoluteSiteUrl(path, origin);
}

export const localeConfig = siteLocaleConfig;

const mapOpenGraphLocales = {
  "zh-hans": "zh_CN",
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
  es: "es_ES",
  ja: "ja_JP",
  "pt-br": "pt_BR",
  ru: "ru_RU",
  ko: "ko_KR",
  "zh-hant": "zh_TW",
} as const satisfies Record<LocaleSlug, string>;

export const copy = {
  "zh-hant": {
    hubTitle: "AION2 互動地圖",
    hubDescription: "按地區與類型查找世界首領、採集點、收集品和其他探索目標，並保存已找到狀態或分享路線。",
    mapLibrary: "地圖資料庫",
    openMap: "開啟地圖",
    interactiveMap: "互動地圖",
    staticPreview: "靜態地圖預覽",
    points: "點位",
    regions: "地區",
    updated: "資料更新",
    categorySummary: "點位類型摘要",
    popularPoints: "精選點位",
    worldBosses: "世界首領",
    hiddenCubes: "隱藏方塊",
    rifts: "裂隙",
    related: "相關工具與攻略",
    sourceNote: "點位名稱、分類與座標均標示資料更新時間；實際位置與開放狀態仍以遊戲內為準。",
    backToMaps: "返回所有地圖",
    coordinates: "原始座標",
    mapStatus: "地圖狀態",
    ready: "完整地圖 · 含收集元素",
    awaitingData: "完整底圖 · 無收集元素",
    allBosses: "查看全部世界首領",
    poiDescription: "查看點位名稱、類型、座標與資料更新時間；縮放、篩選及已找到狀態只保存在分享網址或本機裝置。",
    breadcrumbLabel: "麵包屑導覽",
  },
  "zh-hans": {
    hubTitle: "AION2 互动地图",
    hubDescription:
      "按区域和类型查找世界首领、采集点、收集品及其他探索目标，并保存已找到状态或分享路线。",
    mapLibrary: "地图数据库",
    openMap: "打开地图",
    interactiveMap: "互动地图",
    staticPreview: "静态地图预览",
    points: "个点位",
    regions: "个区域",
    updated: "数据更新",
    categorySummary: "点位类型概览",
    popularPoints: "精选点位",
    worldBosses: "世界首领",
    hiddenCubes: "隐藏魔方",
    rifts: "裂隙",
    related: "相关工具与攻略",
    sourceNote:
      "可用时会标出点位名称、分类、坐标和更新时间。实际位置及开放状态请以游戏内为准。",
    backToMaps: "返回所有地图",
    coordinates: "原始坐标",
    mapStatus: "地图状态",
    ready: "完整地图 · 含收集要素",
    awaitingData: "完整底图 · 无收集要素",
    allBosses: "查看全部世界首领",
    poiDescription:
      "查看点位名称、类型、坐标和数据更新时间。缩放、筛选及已找到状态仅保存在分享网址或当前设备。",
    breadcrumbLabel: "面包屑导航",
  },
  en: {
    hubTitle: "AION2 Interactive Map",
    hubDescription: "Find world bosses, gathering nodes, collectables, and other objectives by region or type, then save found markers or share a route.",
    mapLibrary: "Map library",
    openMap: "Open map",
    interactiveMap: "Interactive map",
    staticPreview: "Static map preview",
    points: "points",
    regions: "regions",
    updated: "Data updated",
    categorySummary: "Point type summary",
    popularPoints: "Featured points",
    worldBosses: "World bosses",
    hiddenCubes: "Hidden Cubes",
    rifts: "Rifts",
    related: "Related tools and guides",
    sourceNote: "Marker names, categories, coordinates, and update dates are shown where available. Confirm live locations and availability in game.",
    backToMaps: "Back to all maps",
    coordinates: "Source coordinates",
    mapStatus: "Map status",
    ready: "Complete map · collectables available",
    awaitingData: "Complete base map · no collectables",
    allBosses: "View all world bosses",
    poiDescription: "Check the marker name, type, coordinates, and update date. Zoom, filters, and found status stay in the share URL or on this device.",
    breadcrumbLabel: "Breadcrumb",
  },
  fr: {
    hubTitle: "Carte interactive AION2",
    hubDescription:
      "Trouvez les boss mondiaux, ressources, objets à collectionner et autres objectifs par région ou par type, puis enregistrez vos découvertes ou partagez un itinéraire.",
    mapLibrary: "Bibliothèque de cartes",
    openMap: "Ouvrir la carte",
    interactiveMap: "Carte interactive",
    staticPreview: "Aperçu statique de la carte",
    points: "points",
    regions: "régions",
    updated: "Données mises à jour",
    categorySummary: "Résumé des types de points",
    popularPoints: "Points à découvrir",
    worldBosses: "Boss mondiaux",
    hiddenCubes: "Cubes cachés",
    rifts: "Failles",
    related: "Outils et guides associés",
    sourceNote:
      "Les noms, catégories, coordonnées et dates de mise à jour sont indiqués lorsqu’ils sont disponibles. Vérifiez en jeu les emplacements et leur disponibilité.",
    backToMaps: "Retour à toutes les cartes",
    coordinates: "Coordonnées d’origine",
    mapStatus: "État de la carte",
    ready: "Carte complète · objets à collectionner disponibles",
    awaitingData: "Fond de carte complet · aucun objet à collectionner",
    allBosses: "Voir tous les boss mondiaux",
    poiDescription:
      "Consultez le nom, le type, les coordonnées et la date de mise à jour du point. Le zoom, les filtres et les découvertes restent dans l’URL partagée ou sur cet appareil.",
    breadcrumbLabel: "Fil d’Ariane",
  },
  de: {
    hubTitle: "AION2 Interaktive Karte",
    hubDescription:
      "Finde Weltbosse, Sammelstellen, Sammelobjekte und weitere Ziele nach Region oder Typ. Speichere gefundene Orte oder teile eine Route.",
    mapLibrary: "Kartenübersicht",
    openMap: "Karte öffnen",
    interactiveMap: "Interaktive Karte",
    staticPreview: "Statische Kartenvorschau",
    points: "Punkte",
    regions: "Regionen",
    updated: "Daten aktualisiert",
    categorySummary: "Übersicht der Punkttypen",
    popularPoints: "Ausgewählte Punkte",
    worldBosses: "Weltbosse",
    hiddenCubes: "Versteckte Würfel",
    rifts: "Risse",
    related: "Passende Tools und Guides",
    sourceNote:
      "Namen, Kategorien, Koordinaten und Aktualisierungsdaten werden angezeigt, sofern verfügbar. Prüfe aktuelle Positionen und Verfügbarkeit im Spiel.",
    backToMaps: "Zurück zu allen Karten",
    coordinates: "Quellkoordinaten",
    mapStatus: "Kartenstatus",
    ready: "Vollständige Karte · Sammelobjekte verfügbar",
    awaitingData: "Vollständige Grundkarte · keine Sammelobjekte",
    allBosses: "Alle Weltbosse anzeigen",
    poiDescription:
      "Sieh dir Name, Typ, Koordinaten und Aktualisierungsdatum des Punkts an. Zoom, Filter und Gefunden-Status bleiben in der geteilten URL oder auf diesem Gerät.",
    breadcrumbLabel: "Brotkrümelnavigation",
  },
  es: {
    hubTitle: "Mapa interactivo de AION2",
    hubDescription:
      "Encuentra jefes de mundo, puntos de recolección, coleccionables y otros objetivos por región o tipo; guarda lo que hayas encontrado o comparte una ruta.",
    mapLibrary: "Biblioteca de mapas",
    openMap: "Abrir mapa",
    interactiveMap: "Mapa interactivo",
    staticPreview: "Vista previa estática del mapa",
    points: "puntos",
    regions: "regiones",
    updated: "Datos actualizados",
    categorySummary: "Resumen de tipos de punto",
    popularPoints: "Puntos destacados",
    worldBosses: "Jefes de mundo",
    hiddenCubes: "Cubos ocultos",
    rifts: "Fisuras",
    related: "Herramientas y guías relacionadas",
    sourceNote:
      "Se muestran los nombres, categorías, coordenadas y fechas de actualización cuando están disponibles. Confirma en el juego la ubicación y disponibilidad actuales.",
    backToMaps: "Volver a todos los mapas",
    coordinates: "Coordenadas de origen",
    mapStatus: "Estado del mapa",
    ready: "Mapa completo · coleccionables disponibles",
    awaitingData: "Mapa base completo · sin coleccionables",
    allBosses: "Ver todos los jefes de mundo",
    poiDescription:
      "Consulta el nombre, tipo, coordenadas y fecha de actualización del punto. El zoom, los filtros y el estado de encontrado se guardan en el enlace compartido o en este dispositivo.",
    breadcrumbLabel: "Migas de pan",
  },
  ja: {
    hubTitle: "AION2 インタラクティブマップ",
    hubDescription:
      "地域や種類からワールドボス、採集地点、収集アイテムなどの探索目標を検索し、発見状況の保存やルートの共有ができます。",
    mapLibrary: "マップ一覧",
    openMap: "マップを開く",
    interactiveMap: "インタラクティブマップ",
    staticPreview: "静的マッププレビュー",
    points: "地点",
    regions: "地域",
    updated: "データ更新",
    categorySummary: "地点タイプの概要",
    popularPoints: "注目の地点",
    worldBosses: "ワールドボス",
    hiddenCubes: "隠しキューブ",
    rifts: "亀裂",
    related: "関連ツール・攻略",
    sourceNote:
      "確認できる地点名、分類、座標、更新日を掲載しています。現在の位置や出現状況はゲーム内で確認してください。",
    backToMaps: "すべてのマップに戻る",
    coordinates: "元座標",
    mapStatus: "マップの状態",
    ready: "完全マップ・収集要素あり",
    awaitingData: "完全ベースマップ・収集要素なし",
    allBosses: "すべてのワールドボスを見る",
    poiDescription:
      "地点名、種類、座標、データ更新日を確認できます。ズーム、フィルター、発見状況は共有URLまたはこの端末にのみ保存されます。",
    breadcrumbLabel: "パンくずリスト",
  },
  "pt-br": {
    hubTitle: "Mapa interativo de AION2",
    hubDescription:
      "Encontre chefes mundiais, pontos de coleta, colecionáveis e outros objetivos por região ou tipo; salve o que encontrou ou compartilhe uma rota.",
    mapLibrary: "Biblioteca de mapas",
    openMap: "Abrir mapa",
    interactiveMap: "Mapa interativo",
    staticPreview: "Prévia estática do mapa",
    points: "pontos",
    regions: "regiões",
    updated: "Dados atualizados",
    categorySummary: "Resumo dos tipos de ponto",
    popularPoints: "Pontos em destaque",
    worldBosses: "Chefes mundiais",
    hiddenCubes: "Cubos ocultos",
    rifts: "Fendas",
    related: "Ferramentas e guias relacionados",
    sourceNote:
      "Nomes, categorias, coordenadas e datas de atualização são exibidos quando disponíveis. Confirme no jogo a localização e a disponibilidade atuais.",
    backToMaps: "Voltar para todos os mapas",
    coordinates: "Coordenadas de origem",
    mapStatus: "Status do mapa",
    ready: "Mapa completo · colecionáveis disponíveis",
    awaitingData: "Mapa-base completo · sem colecionáveis",
    allBosses: "Ver todos os chefes mundiais",
    poiDescription:
      "Consulte o nome, o tipo, as coordenadas e a data de atualização do ponto. Zoom, filtros e status de encontrado ficam no link compartilhado ou neste dispositivo.",
    breadcrumbLabel: "Navegação estrutural",
  },
  ru: {
    hubTitle: "Интерактивная карта AION2",
    hubDescription:
      "Ищите мировых боссов, ресурсы, коллекционные предметы и другие цели по региону или типу, сохраняйте найденные точки и делитесь маршрутами.",
    mapLibrary: "Библиотека карт",
    openMap: "Открыть карту",
    interactiveMap: "Интерактивная карта",
    staticPreview: "Статический предпросмотр карты",
    points: "точек",
    regions: "регионов",
    updated: "Данные обновлены",
    categorySummary: "Обзор типов точек",
    popularPoints: "Избранные точки",
    worldBosses: "Мировые боссы",
    hiddenCubes: "Скрытые кубы",
    rifts: "Разломы",
    related: "Связанные инструменты и руководства",
    sourceNote:
      "Названия, категории, координаты и даты обновления указаны при наличии. Актуальное расположение и доступность проверяйте в игре.",
    backToMaps: "Вернуться ко всем картам",
    coordinates: "Исходные координаты",
    mapStatus: "Состояние карты",
    ready: "Полная карта · коллекционные предметы доступны",
    awaitingData: "Полная основная карта · без коллекционных предметов",
    allBosses: "Показать всех мировых боссов",
    poiDescription:
      "Проверьте название, тип, координаты и дату обновления точки. Масштаб, фильтры и отметки сохраняются в общей ссылке или на этом устройстве.",
    breadcrumbLabel: "Навигационная цепочка",
  },
  ko: {
    hubTitle: "아이온2 인터랙티브 지도",
    hubDescription: "아이온2 지도에서 지역과 유형별로 월드 보스, 채집 지점, 수집품과 탐험 목표를 찾으세요. 아이온2 공략에 필요한 위치를 확인하고 발견 상태를 저장하거나 경로를 공유할 수 있습니다.",
    mapLibrary: "지도 라이브러리",
    openMap: "지도 열기",
    interactiveMap: "인터랙티브 지도",
    staticPreview: "정적 지도 미리보기",
    points: "포인트",
    regions: "지역",
    updated: "데이터 업데이트",
    categorySummary: "포인트 유형 요약",
    popularPoints: "주요 포인트",
    worldBosses: "월드 보스",
    hiddenCubes: "히든 큐브",
    rifts: "균열",
    related: "아이온2 지도 공략과 관련 도구",
    sourceNote: "확인 가능한 포인트 이름, 분류, 좌표와 업데이트 날짜를 표시합니다. 실제 위치와 이용 가능 여부는 게임에서 다시 확인하세요.",
    backToMaps: "전체 지도로 돌아가기",
    coordinates: "원본 좌표",
    mapStatus: "지도 상태",
    ready: "전체 지도 · 수집 요소 있음",
    awaitingData: "전체 기본 지도 · 수집 요소 없음",
    allBosses: "모든 월드 보스 보기",
    poiDescription: "포인트 이름, 유형, 좌표와 업데이트 날짜를 확인하세요. 확대, 필터, 발견 상태는 공유 주소 또는 현재 기기에만 저장됩니다.",
    breadcrumbLabel: "이동 경로",
  },
} as const;

export function isLocaleSlug(value: string): value is LocaleSlug {
  return localeSlugs.includes(value as LocaleSlug);
}

export function getMapBySlug(slug: string) {
  return mapSeoData.maps.find((map) => map.slug === slug);
}

export function getMapDataLocale(locale: LocaleSlug): MapDataLocale {
  return siteLocaleConfig[locale].mapDataLocale;
}

const editorialMapNameOverrides: Partial<
  Record<LocaleSlug, Readonly<Record<string, string>>>
> = {
  "zh-hans": {
    verteron: "斐尔特朗（天族）",
    altgard: "亚尔特盖德（魔族）",
    eltnen: "耶尔特奈（天族）",
    morheim: "莫尔海姆（魔族）",
    poeta: "波伊塔（天族）",
    ishalgen: "伊斯夏尔肯（魔族）",
    "chaotic-lower-reshanta": "混沌艾雷修蓝塔下层",
    "chaotic-middle-reshanta": "混沌艾雷修蓝塔中层",
    "chaotic-upper-reshanta": "混沌艾雷修蓝塔上层",
    "abyss-rift-zone": "深渊裂隙区域",
  },
  fr: {
    verteron: "Verteron (Élyséens)",
    altgard: "Altgard (Asmodiens)",
    eltnen: "Eltnen (Élyséens)",
    morheim: "Morheim (Asmodiens)",
    poeta: "Poeta (Élyséens)",
    ishalgen: "Ishalgen (Asmodiens)",
    "chaotic-lower-reshanta": "Reshanta inférieur chaotique",
    "chaotic-middle-reshanta": "Reshanta intermédiaire chaotique",
    "chaotic-upper-reshanta": "Reshanta supérieur chaotique",
    "abyss-rift-zone": "Zone de faille des Abysses",
  },
  de: {
    verteron: "Verteron (Elyos)",
    altgard: "Altgard (Asmodier)",
    eltnen: "Eltnen (Elyos)",
    morheim: "Morheim (Asmodier)",
    poeta: "Poeta (Elyos)",
    ishalgen: "Ishalgen (Asmodier)",
    "chaotic-lower-reshanta": "Chaotisches unteres Reshanta",
    "chaotic-middle-reshanta": "Chaotisches mittleres Reshanta",
    "chaotic-upper-reshanta": "Chaotisches oberes Reshanta",
    "abyss-rift-zone": "Abgrund-Risszone",
  },
  es: {
    verteron: "Verteron (elyos)",
    altgard: "Altgard (asmodianos)",
    eltnen: "Eltnen (elyos)",
    morheim: "Morheim (asmodianos)",
    poeta: "Poeta (elyos)",
    ishalgen: "Ishalgen (asmodianos)",
    "chaotic-lower-reshanta": "Reshanta inferior caótica",
    "chaotic-middle-reshanta": "Reshanta intermedia caótica",
    "chaotic-upper-reshanta": "Reshanta superior caótica",
    "abyss-rift-zone": "Zona de fisuras del Abismo",
  },
  ja: {
    verteron: "ベルテロン（天族）",
    altgard: "アルトガルド（魔族）",
    eltnen: "エルテネン（天族）",
    morheim: "モルヘイム（魔族）",
    poeta: "ポエタ（天族）",
    ishalgen: "イスハルゲン（魔族）",
    "chaotic-lower-reshanta": "混沌のエレシュランタ下層",
    "chaotic-middle-reshanta": "混沌のエレシュランタ中層",
    "chaotic-upper-reshanta": "混沌のエレシュランタ上層",
    "abyss-rift-zone": "アビス亀裂地帯",
  },
  "pt-br": {
    verteron: "Verteron (Elyos)",
    altgard: "Altgard (Asmodianos)",
    eltnen: "Eltnen (Elyos)",
    morheim: "Morheim (Asmodianos)",
    poeta: "Poeta (Elyos)",
    ishalgen: "Ishalgen (Asmodianos)",
    "chaotic-lower-reshanta": "Reshanta inferior caótica",
    "chaotic-middle-reshanta": "Reshanta intermediária caótica",
    "chaotic-upper-reshanta": "Reshanta superior caótica",
    "abyss-rift-zone": "Zona de fendas do Abismo",
  },
  ru: {
    verteron: "Вертэрон (элийцы)",
    altgard: "Альтгард (асмодиане)",
    eltnen: "Элтенен (элийцы)",
    morheim: "Морхейм (асмодиане)",
    poeta: "Поэта (элийцы)",
    ishalgen: "Исхальген (асмодиане)",
    "chaotic-lower-reshanta": "Хаотическая нижняя Решанта",
    "chaotic-middle-reshanta": "Хаотическая средняя Решанта",
    "chaotic-upper-reshanta": "Хаотическая верхняя Решанта",
    "abyss-rift-zone": "Зона разломов Бездны",
  },
};

export function getMapName(map: SeoMap, locale: LocaleSlug) {
  const editorialName = editorialMapNameOverrides[locale]?.[map.slug];
  if (editorialName) return editorialName;
  const dataLocale = getMapDataLocale(locale);
  return map.locales[dataLocale]?.name || map.locales.en.name;
}

export function getCompactMapName(map: SeoMap, locale: LocaleSlug) {
  return getMapName(map, locale)
    .replace(/\s*(?:\([^)]*\)|（[^）]*）)\s*$/u, "")
    .trim();
}

export function getMapTypeLabel(typeSlug: string, locale: LocaleSlug) {
  if (typeSlug === "hidden-cube") return copy[locale].hiddenCubes;
  if (typeSlug === "rift") return copy[locale].rifts;
  return copy[locale].worldBosses;
}

export function getMapTypeHeading(
  map: SeoMap,
  locale: LocaleSlug,
  typeSlug: string,
) {
  const mapName = getMapName(map, locale);
  if (typeSlug === "world-boss") {
    return locale === "ko"
      ? `${mapName} 아이온2 월드 보스 지도`
      : `${mapName} · ${copy[locale].worldBosses}`;
  }
  const headings: Record<LocaleSlug, Record<string, string>> = {
    "zh-hans": {
      "hidden-cube": `AION2 互动地图：${mapName} 隐藏魔方位置`,
      rift: `AION2 互动地图：${mapName} 裂隙位置`,
    },
    en: {
      "hidden-cube": `AION2 Interactive Map Hidden Cubes: ${mapName}`,
      rift: `AION2 Interactive Map Rift Locations: ${mapName}`,
    },
    fr: {
      "hidden-cube": `Carte interactive AION2 — Cubes cachés : ${mapName}`,
      rift: `Carte interactive AION2 — Failles : ${mapName}`,
    },
    de: {
      "hidden-cube": `AION2 Interaktive Karte — Versteckte Würfel: ${mapName}`,
      rift: `AION2 Interaktive Karte — Riss-Positionen: ${mapName}`,
    },
    es: {
      "hidden-cube": `Mapa interactivo de AION2 — Cubos ocultos: ${mapName}`,
      rift: `Mapa interactivo de AION2 — Fisuras: ${mapName}`,
    },
    ja: {
      "hidden-cube": `AION2 インタラクティブマップ：${mapName}の隠しキューブ`,
      rift: `AION2 インタラクティブマップ：${mapName}の亀裂位置`,
    },
    "pt-br": {
      "hidden-cube": `Mapa interativo de AION2 — Cubos ocultos: ${mapName}`,
      rift: `Mapa interativo de AION2 — Locais de fendas: ${mapName}`,
    },
    ru: {
      "hidden-cube": `Интерактивная карта AION2 — скрытые кубы: ${mapName}`,
      rift: `Интерактивная карта AION2 — места разломов: ${mapName}`,
    },
    ko: {
      "hidden-cube": `아이온2 인터랙티브 지도: ${mapName} 히든 큐브 위치`,
      rift: `아이온2 인터랙티브 지도: ${mapName} 균열 위치`,
    },
    "zh-hant": {
      "hidden-cube": `AION2 互動地圖：${mapName} 隱藏方塊位置`,
      rift: `AION2 互動地圖：${mapName} 裂隙位置`,
    },
  };
  return headings[locale][typeSlug]
    ?? `${mapName} ${copy[locale].interactiveMap}: ${getMapTypeLabel(typeSlug, locale)}`;
}

export function getMapTypeSeoTitle(
  map: SeoMap,
  locale: LocaleSlug,
  typeSlug: string,
) {
  if (typeSlug === "world-boss") {
    return getMapTypeHeading(map, locale, typeSlug);
  }

  const mapName = getCompactMapName(map, locale);
  const titles: Record<LocaleSlug, Record<"hidden-cube" | "rift", string>> = {
    "zh-hans": {
      "hidden-cube": `AION2 互动地图：${mapName} 隐藏魔方`,
      rift: `AION2 互动地图：${mapName} 裂隙`,
    },
    en: {
      "hidden-cube": `AION2 Interactive Map: ${mapName} Hidden Cubes`,
      rift: `AION2 Interactive Map: ${mapName} Rifts`,
    },
    fr: {
      "hidden-cube": `Carte interactive AION2 : ${mapName} Cubes cachés`,
      rift: `Carte interactive AION2 : ${mapName} Failles`,
    },
    de: {
      "hidden-cube": `AION2 Interaktive Karte: ${mapName} Würfel`,
      rift: `AION2 Interaktive Karte: ${mapName} Risse`,
    },
    es: {
      "hidden-cube": `Mapa interactivo de AION2: ${mapName} cubos`,
      rift: `Mapa interactivo de AION2: ${mapName} fisuras`,
    },
    ja: {
      "hidden-cube": `AION2 インタラクティブマップ：${mapName} 隠しキューブ`,
      rift: `AION2 インタラクティブマップ：${mapName} 亀裂`,
    },
    "pt-br": {
      "hidden-cube": `Mapa interativo de AION2: ${mapName} cubos`,
      rift: `Mapa interativo de AION2: ${mapName} fendas`,
    },
    ru: {
      "hidden-cube": `Интерактивная карта AION2: ${mapName} кубы`,
      rift: `Интерактивная карта AION2: ${mapName} разломы`,
    },
    ko: {
      "hidden-cube": `아이온2 인터랙티브 지도: ${mapName} 히든 큐브`,
      rift: `아이온2 인터랙티브 지도: ${mapName} 균열`,
    },
    "zh-hant": {
      "hidden-cube": `AION2 互動地圖：${mapName} 隱藏方塊`,
      rift: `AION2 互動地圖：${mapName} 裂隙`,
    },
  };

  return titles[locale][typeSlug as "hidden-cube" | "rift"]
    ?? getMapTypeHeading(map, locale, typeSlug);
}

export function buildMapSeoTitle(value: string) {
  const suffix = " | AION2 KINA";
  const maximumPrimaryLength = 60 - Array.from(suffix).length;
  const characters = Array.from(value.replace(/\s+/gu, " ").trim());
  if (characters.length <= maximumPrimaryLength) return `${characters.join("")}${suffix}`;

  const candidate = characters.slice(0, maximumPrimaryLength - 1).join("");
  const wordBoundary = candidate.lastIndexOf(" ");
  const compact =
    wordBoundary >= Math.floor(maximumPrimaryLength * 0.65)
      ? candidate.slice(0, wordBoundary)
      : candidate;
  return `${compact.replace(/[\s,:;·–—-]+$/u, "")}…${suffix}`;
}

export function getMapImageAlt(
  mapName: string,
  locale: LocaleSlug,
  subject?: string,
) {
  const imageAlt: Record<LocaleSlug, (name: string, focus?: string) => string> = {
    "zh-hans": (name, focus) =>
      focus
        ? `AION2 互动地图静态预览：${name}的${focus}`
        : `AION2 互动地图静态预览：${name}`,
    en: (name, focus) =>
      focus
        ? `AION2 Interactive Map static preview: ${focus} on ${name}`
        : `AION2 Interactive Map static preview: ${name}`,
    fr: (name, focus) =>
      focus
        ? `Aperçu statique de la carte interactive AION2 : ${focus} sur ${name}`
        : `Aperçu statique de la carte interactive AION2 : ${name}`,
    de: (name, focus) =>
      focus
        ? `Statische Vorschau der interaktiven AION2-Karte: ${focus} auf ${name}`
        : `Statische Vorschau der interaktiven AION2-Karte: ${name}`,
    es: (name, focus) =>
      focus
        ? `Vista previa del mapa interactivo de AION2: ${focus} en ${name}`
        : `Vista previa del mapa interactivo de AION2: ${name}`,
    ja: (name, focus) =>
      focus
        ? `AION2 インタラクティブマップ静的プレビュー：${name}の${focus}`
        : `AION2 インタラクティブマップ静的プレビュー：${name}`,
    "pt-br": (name, focus) =>
      focus
        ? `Prévia estática do mapa interativo de AION2: ${focus} em ${name}`
        : `Prévia estática do mapa interativo de AION2: ${name}`,
    ru: (name, focus) =>
      focus
        ? `Статический предпросмотр интерактивной карты AION2: ${focus} на карте ${name}`
        : `Статический предпросмотр интерактивной карты AION2: ${name}`,
    ko: (name, focus) =>
      focus
        ? `아이온2 인터랙티브 지도 정적 미리보기: ${name}의 ${focus}`
        : `아이온2 인터랙티브 지도 정적 미리보기: ${name}`,
    "zh-hant": (name, focus) =>
      focus
        ? `AION2 互動地圖靜態預覽：${focus}（${name}）`
        : `AION2 互動地圖靜態預覽：${name}`,
  };
  return imageAlt[locale](mapName, subject);
}

export function getMapOpenGraphLocale(locale: LocaleSlug) {
  return mapOpenGraphLocales[locale];
}

export function getMapOpenGraphAlternateLocales(locale: LocaleSlug) {
  return localeSlugs
    .filter((candidate) => candidate !== locale)
    .map((candidate) => mapOpenGraphLocales[candidate]);
}

export function getMapDescription(map: SeoMap, locale: LocaleSlug) {
  const name = getMapName(map, locale);
  const code = localeConfig[locale].code;
  const dataLocale = getMapDataLocale(locale);
  const categoryLabels = Object.entries(map.categoryCounts)
    .filter(([, count]) => count > 0)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(
      ([category]) =>
        mapSeoData.categories[dataLocale]?.[category] ??
        mapSeoData.categories.en?.[category] ??
        category,
    );
  const points = map.markerCount.toLocaleString(code);

  if (map.markerCount === 0) {
    const emptyDescriptions: Record<LocaleSlug, string> = {
      "zh-hans": `${name} 提供完整区域底图。目前地图数据没有收录收集要素标记，可用于查看地形和区域边界；未收录不代表游戏内不存在相关目标。`,
      en: `${name} provides a complete regional base map. The current map data contains no collectable markers, so use it to check terrain and boundaries; missing data does not mean those objectives do not exist in game.`,
      fr: `${name} propose un fond de carte régional complet. Les données actuelles ne contiennent aucun repère de collection : utilisez la carte pour consulter le terrain et les limites. Une donnée absente ne signifie pas que l’objectif n’existe pas en jeu.`,
      de: `${name} bietet eine vollständige regionale Grundkarte. Die aktuellen Daten enthalten keine Sammelmarkierungen. Nutze sie für Gelände und Grenzen; fehlende Daten bedeuten nicht, dass diese Ziele im Spiel nicht existieren.`,
      es: `${name} ofrece un mapa base regional completo. Los datos actuales no incluyen marcadores de coleccionables; úsalo para consultar el terreno y los límites. La ausencia de datos no significa que esos objetivos no existan en el juego.`,
      ja: `${name}の地域全体を確認できるベースマップです。現在のデータには収集要素の地点が含まれていないため、地形や地域境界の確認に利用できます。未掲載でもゲーム内に対象が存在しないとは限りません。`,
      "pt-br": `${name} oferece um mapa-base regional completo. Os dados atuais não contêm marcadores de colecionáveis; use-o para conferir terreno e limites. A ausência de dados não significa que esses objetivos não existam no jogo.`,
      ru: `${name} — полная основная карта региона. В текущих данных нет меток коллекционных предметов; используйте карту для просмотра местности и границ. Отсутствие данных не означает, что таких целей нет в игре.`,
      ko: `${name}의 전체 지역 기본 지도를 제공합니다. 현재 지도 데이터에는 수집 요소 마커가 없으며 지형과 지역 범위를 확인할 수 있습니다. 데이터 미수록은 게임 내에 관련 목표가 없다는 뜻이 아닙니다.`,
      "zh-hant": `${name} 提供完整地區底圖；目前地圖資料未收錄收集元素標記，可直接查看地形與區域範圍。未收錄不代表遊戲內不存在相關目標。`,
    };
    return emptyDescriptions[locale];
  }

  const fallbackCategories: Record<LocaleSlug, string> = {
    "zh-hans": "区域与探索数据",
    en: "region and exploration data",
    fr: "données de région et d’exploration",
    de: "Regions- und Erkundungsdaten",
    es: "datos de región y exploración",
    ja: "地域・探索データ",
    "pt-br": "dados de região e exploração",
    ru: "данные о регионах и исследовании",
    ko: "지역 및 탐험 데이터",
    "zh-hant": "地區與探索資料",
  };
  const categories = categoryLabels.length
    ? new Intl.ListFormat(code, {
        style: "long",
        type: "conjunction",
      }).format(categoryLabels)
    : fallbackCategories[locale];

  const descriptions: Record<LocaleSlug, string> = {
    "zh-hans": `${name} AION2 互动地图收录 ${points} 个可搜索点位，涵盖${categories}。可按区域和类型筛选，并查看清楚标出的数据更新时间。`,
    en: `Explore ${name} on the AION2 interactive map with ${points} searchable points across ${categories}. Filter by region and type, with the data update time clearly shown.`,
    fr: `Explorez ${name} sur la carte interactive AION2 avec ${points} points consultables couvrant ${categories}. Filtrez par région et par type et consultez la date de mise à jour des données.`,
    de: `Erkunde ${name} auf der interaktiven AION2-Karte mit ${points} durchsuchbaren Punkten aus ${categories}. Filtere nach Region und Typ; der Aktualisierungszeitpunkt ist klar angegeben.`,
    es: `Explora ${name} en el mapa interactivo de AION2 con ${points} puntos consultables de ${categories}. Filtra por región y tipo y consulta claramente cuándo se actualizaron los datos.`,
    ja: `${name}のAION2 インタラクティブマップには、${categories}を含む検索可能な地点が${points}件あります。地域や種類で絞り込み、データ更新時点も確認できます。`,
    "pt-br": `Explore ${name} no mapa interativo de AION2 com ${points} pontos pesquisáveis de ${categories}. Filtre por região e tipo e consulte claramente quando os dados foram atualizados.`,
    ru: `Исследуйте ${name} на интерактивной карте AION2: доступно ${points} точек по категориям ${categories}. Фильтруйте по региону и типу; дата обновления данных указана на странице.`,
    ko: `${name} 아이온2 인터랙티브 지도에서 ${points}개의 검색 가능한 포인트와 ${categories} 정보를 확인하세요. 지역과 유형으로 필터링하고 데이터 업데이트 시점을 확인할 수 있습니다.`,
    "zh-hant": `${name} AION2 互動地圖收錄 ${points} 個可搜尋點位，涵蓋${categories}。可依地區與類型篩選，並查看清楚標示的資料更新時間。`,
  };
  return descriptions[locale];
}

export function getMapTypeDescription(
  map: SeoMap,
  locale: LocaleSlug,
  typeSlug: string,
  itemCount: number,
) {
  const mapName = getMapName(map, locale);
  const count = itemCount.toLocaleString(localeConfig[locale].code);
  if (typeSlug === "world-boss") {
    const descriptions: Record<LocaleSlug, string> = {
      "zh-hans": `在 ${mapName} AION2 互动地图查看 ${count} 个世界首领点位，包括名称、位置和原始坐标，并可直接返回地图筛选。`,
      en: `Browse ${count} world boss locations on the ${mapName} AION2 interactive map, with names, positions, source coordinates, and a direct map filter.`,
      fr: `Consultez ${count} emplacements de boss mondiaux sur la carte interactive AION2 ${mapName}, avec leurs noms, positions, coordonnées d’origine et un accès direct au filtre de la carte.`,
      de: `Finde ${count} Weltboss-Positionen auf der interaktiven AION2-Karte ${mapName} – mit Namen, Positionen, Quellkoordinaten und direktem Kartenfilter.`,
      es: `Consulta ${count} ubicaciones de jefes de mundo en el mapa interactivo de AION2 ${mapName}, con nombres, posiciones, coordenadas de origen y acceso directo al filtro del mapa.`,
      ja: `${mapName}のAION2 インタラクティブマップで${count}件のワールドボス地点を確認できます。名前、位置、元座標を掲載し、マップの絞り込みへ直接移動できます。`,
      "pt-br": `Consulte ${count} locais de chefes mundiais no mapa interativo de AION2 ${mapName}, com nomes, posições, coordenadas de origem e acesso direto ao filtro do mapa.`,
      ru: `На интерактивной карте AION2 ${mapName} доступно ${count} точек мировых боссов с названиями, расположением, исходными координатами и прямым фильтром карты.`,
      ko: `${mapName} 아이온2 지도에서 ${count}개의 월드 보스 이름, 위치와 원본 좌표를 확인하고 인터랙티브 지도 필터로 바로 이동하세요.`,
      "zh-hant": `在 ${mapName} AION2 互動地圖查看 ${count} 個世界首領點位，包括名稱、位置與原始座標，並可返回地圖直接篩選。`,
    };
    return descriptions[locale];
  }
  if (typeSlug === "hidden-cube") {
    const descriptions: Record<LocaleSlug, string> = {
      "zh-hans": `${mapName} AION2 互动地图收录 ${count} 个隐藏魔方位置。打开筛选地图规划探索路线，并以游戏内当前状态确认每个点位。`,
      en: `Find ${count} Hidden Cube locations on the ${mapName} AION2 Interactive Map. Open the filtered map to plan a route, then confirm each point against the current in-game state.`,
      fr: `Trouvez ${count} emplacements de cubes cachés sur la carte interactive AION2 de ${mapName}. Ouvrez la carte filtrée pour préparer votre itinéraire, puis vérifiez chaque point en jeu.`,
      de: `Finde ${count} versteckte Würfel auf der interaktiven AION2-Karte von ${mapName}. Öffne den Kartenfilter, plane deine Route und bestätige jeden Punkt im Spiel.`,
      es: `Encuentra ${count} cubos ocultos en el mapa interactivo de AION2 de ${mapName}. Abre el mapa filtrado para planear la ruta y confirma cada punto en el juego.`,
      ja: `${mapName}のAION2 インタラクティブマップで${count}か所の隠しキューブ位置を確認できます。絞り込みマップでルートを組み、各地点は現在のゲーム内表示で再確認してください。`,
      "pt-br": `Encontre ${count} cubos ocultos no mapa interativo de AION2 de ${mapName}. Abra o mapa filtrado para planejar a rota e confirme cada ponto no jogo.`,
      ru: `Найдите ${count} скрытых кубов на интерактивной карте AION2 региона ${mapName}. Откройте отфильтрованную карту, составьте маршрут и проверьте точки в игре.`,
      ko: `${mapName} 아이온2 인터랙티브 지도에서 히든 큐브 ${count}개 위치를 확인하세요. 필터 지도로 동선을 계획하고 각 포인트는 현재 게임 상태에서 다시 확인할 수 있습니다.`,
      "zh-hant": `${mapName} AION2 互動地圖收錄 ${count} 個隱藏方塊位置。開啟篩選地圖規劃探索路線，並以遊戲內目前狀態確認每個點位。`,
    };
    return descriptions[locale];
  }
  if (typeSlug === "rift") {
    const descriptions: Record<LocaleSlug, string> = {
      "zh-hans": `${mapName} AION2 互动地图收录 ${count} 个裂隙参考位置，可一键仅显示 Rift 点位。入口是否在当前时段开放仍以游戏内状态为准。`,
      en: `Browse ${count} Rift reference locations on the ${mapName} AION2 Interactive Map and open a Rift-only filter. Live portal availability still depends on the current in-game window.`,
      fr: `Consultez ${count} emplacements de faille sur la carte interactive AION2 de ${mapName} et ouvrez le filtre « Failles uniquement ». La disponibilité réelle dépend du créneau affiché en jeu.`,
      de: `Sieh dir ${count} Riss-Referenzpunkte auf der interaktiven AION2-Karte von ${mapName} an und öffne den reinen Rissfilter. Ob ein Portal aktiv ist, zeigt das aktuelle Spielzeitfenster.`,
      es: `Consulta ${count} ubicaciones de fisuras en el mapa interactivo de AION2 de ${mapName} y abre el filtro que solo muestra fisuras. La disponibilidad del portal depende del horario actual del juego.`,
      ja: `${mapName}のAION2 インタラクティブマップで${count}か所の亀裂候補を確認し、亀裂だけを表示できます。現在のポータル開放状況はゲーム内の開催時間を優先してください。`,
      "pt-br": `Consulte ${count} locais de fenda no mapa interativo de AION2 de ${mapName} e abra o filtro que mostra apenas fendas. A disponibilidade do portal depende do período atual no jogo.`,
      ru: `Посмотрите ${count} ориентировочных мест разломов на интерактивной карте AION2 региона ${mapName} и включите фильтр только разломов. Доступность портала зависит от текущего игрового окна.`,
      ko: `${mapName} 아이온2 인터랙티브 지도에서 균열 참고 위치 ${count}개를 확인하고 균열만 표시하세요. 실제 포털 개방 여부는 현재 게임 내 시간대를 기준으로 합니다.`,
      "zh-hant": `${mapName} AION2 互動地圖收錄 ${count} 個裂隙參考位置，可一鍵只顯示 Rift 點位。入口是否在目前時段開放仍以遊戲內狀態為準。`,
    };
    return descriptions[locale];
  }
  return getMapDescription(map, locale);
}

export function getIndexableMaps() {
  return mapSeoData.maps.filter((map) => isMapPublicationIndexable(map.slug));
}

export { getMapPagePublication, isMapPublicationIndexable };

export function getPoiText(poi: SeoPoi, locale: LocaleSlug) {
  const dataLocale = getMapDataLocale(locale);
  return poi.locales[dataLocale] ?? poi.locales.en;
}

export function getMapPoiDescription(
  map: SeoMap,
  poi: SeoPoi,
  locale: LocaleSlug,
) {
  const mapName = getMapName(map, locale);
  const item = getPoiText(poi, locale);
  const coordinates = `${poi.sourceX}, ${poi.sourceY}`;

  const descriptions: Record<LocaleSlug, string> = {
    "zh-hans": `在 ${mapName} AION2 互动地图查看 ${item.name} 的位置、类型和原始坐标（${coordinates}）。${item.description}。`,
    en: `Find ${item.name} on the ${mapName} AION2 interactive map, with its type and source coordinates (${coordinates}). ${item.description}.`,
    fr: `Trouvez ${item.name} sur la carte interactive AION2 ${mapName}, avec son type et ses coordonnées d’origine (${coordinates}). ${item.description}.`,
    de: `Finde ${item.name} auf der interaktiven AION2-Karte ${mapName}, einschließlich Typ und Quellkoordinaten (${coordinates}). ${item.description}.`,
    es: `Encuentra ${item.name} en el mapa interactivo de AION2 ${mapName}, con su tipo y coordenadas de origen (${coordinates}). ${item.description}.`,
    ja: `${mapName}のAION2 インタラクティブマップで${item.name}の位置、種類、元座標（${coordinates}）を確認できます。${item.description}。`,
    "pt-br": `Encontre ${item.name} no mapa interativo de AION2 ${mapName}, com seu tipo e coordenadas de origem (${coordinates}). ${item.description}.`,
    ru: `Найдите ${item.name} на интерактивной карте AION2 ${mapName}; указаны тип и исходные координаты (${coordinates}). ${item.description}.`,
    ko: `${mapName} 아이온2 지도에서 ${item.name} 위치, 유형과 원본 좌표(${coordinates})를 확인하세요. ${item.description}`,
    "zh-hant": `在 ${mapName} AION2 互動地圖查看 ${item.name} 的位置、類型與原始座標（${coordinates}）。${item.description}。`,
  };
  return descriptions[locale];
}

export function getPublishedMapType(mapSlug: string, typeSlug: string) {
  return getMapTypePublication(mapSlug, typeSlug);
}

export function getPublishedMapTypesForMap(mapSlug: string) {
  return mapSeoPublication.types.filter(
    (type) => type.mapSlug === mapSlug && type.indexable,
  );
}

export function getMapTypeItemCount(
  map: SeoMap,
  type: MapTypePublication,
) {
  const publishedPois = getPublishedPoisForType(map.slug, type.slug);
  return publishedPois.length || map.subtypeCounts[type.subtype] || 0;
}

export function getPublishedPoi(mapSlug: string, poiSlug: string) {
  const publication = getMapPoiPublication(mapSlug, poiSlug);
  if (!publication) return undefined;
  const poi = mapSeoData.poisByMap[mapSlug]?.find(
    (entry) => entry.id === publication.markerId && entry.slug === publication.slug,
  );
  return poi ? { publication, poi } : undefined;
}

export function getPublishedPoisForType(mapSlug: string, typeSlug: string) {
  if (!getMapTypePublication(mapSlug, typeSlug)) return [];
  return (mapSeoData.poisByMap[mapSlug] ?? []).filter(
    (poi) => poi.typeSlug === typeSlug,
  );
}

export function getIndexableMapPois() {
  return mapSeoPublication.pois.flatMap((publication) => {
    if (!isMapPoiPublicationIndexable(publication)) return [];
    const poi = mapSeoData.poisByMap[publication.mapSlug]?.find(
      (entry) => entry.id === publication.markerId && entry.slug === publication.slug,
    );
    return poi ? [{ publication, poi }] : [];
  });
}

export function localePath(locale: LocaleSlug, suffix = "/tools/map/") {
  return localizedHref(locale, suffix);
}

export function languageAlternates(suffix = "/tools/map/") {
  return getLanguageAlternates(suffix);
}
