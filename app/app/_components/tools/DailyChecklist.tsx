"use client";

import {
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Plus,
  Server,
  Trash2,
  X,
} from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

import { trackEvent } from "@/app/analytics";
import checklistEditorialLocales from "../../checklist-editorial-locales.generated.json";
import {
  CHECKLIST_ACTIVITIES,
  CHECKLIST_BUILTIN_DEFINITIONS,
  CHECKLIST_SOURCES,
  getChecklistActivity,
  getChecklistActivityCopy,
  getChecklistItemLabel,
  getChecklistSourceCopy,
} from "@/app/checklist-activities";
import {
  addChecklistItem,
  checklistStore,
  ensureBuiltinChecklistItems,
  getChecklistCycleState,
  MAX_CHECKLIST_ITEMS,
  readChecklistSnapshot,
  setChecklistRegion,
  syncChecklistResets,
  updateChecklistItems,
  type ChecklistFrequency,
  type ChecklistItem,
  type ChecklistMapRef,
  type ChecklistRegion,
} from "@/app/checklist-store";
import {
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./DailyChecklist.module.css";

type Filter = "daily" | "weekly" | "custom" | "completed";

export const coreChecklistUiCopy = {
  "zh-hant": {
    title: "我的檢查清單",
    privacy: "完成狀態只保存在這個瀏覽器，不會上傳到 KINA。每日與每週項目會依所選遊戲服務的週期自動更新。",
    recommendationNote: "「核心／推薦／情境性」是 KINA 的路線建議，不是官方強制清單。特殊時段、次數與獎勵在改版後請以遊戲內顯示為準。",
    serverLegend: "遊戲服務與重置時間",
    region: "遊戲服務",
    tw: "台灣／香港／澳門",
    kr: "韓國",
    serverTime: "目前伺服器時間",
    dailyReset: "每日重置",
    weeklyReset: "每週重置",
    dailyRule: "每日 05:00",
    weeklyRule: "每週三 05:00",
    resetIn: "剩餘",
    maintenanceNote: "重置時間會依所選遊戲服務顯示；維護或活動期間個別內容可能調整，請以遊戲內倒數與官方公告為準。",
    filtersLabel: "查看清單",
    daily: "今日",
    weekly: "本週",
    once: "一次性",
    custom: "自訂",
    completed: "已完成",
    dailyGroup: "每日活動",
    weeklyGroup: "每週活動",
    customGroup: "自訂任務",
    dailyDescription: "在下一次每日重置前完成；票券型內容接近上限時優先消耗。",
    weeklyDescription: "分散到整週處理，不要全部留到週三重置前。",
    customDescription: "你建立的每日、每週與一次性任務。每日與每週會跟隨目前服務刷新。",
    customAction: "新增自訂任務",
    taskLabel: "任務名稱",
    taskPlaceholder: "例如：領取角色獎勵",
    frequencyLabel: "週期",
    add: "加入清單",
    cancel: "取消",
    formTitle: "新增自訂任務",
    formDescription: "每日與每週任務會跟隨目前遊戲服務的 05:00 週期；一次性任務不會自動重置。",
    progressDaily: (done: number, total: number) => `每日 ${done} / ${total}`,
    progressWeekly: (done: number, total: number) => `每週 ${done} / ${total}`,
    empty: "這個分類目前沒有項目。",
    delete: (label: string) => `刪除「${label}」`,
    reset: "清除本週期勾選",
    clear: "刪除已完成的一次性任務",
    saved: "已保存在目前裝置",
    storageError: "瀏覽器封鎖了本機儲存；本次變更可能不會保留。",
    limit: `自訂與地圖任務最多可加入 ${MAX_CHECKLIST_ITEMS} 項，請先刪除一些項目。`,
    viewOnMap: "在地圖查看",
    mapLinkLabel: (marker: string) => `在地圖查看「${marker}」`,
    details: "查看詳情",
    closeDetails: "收起詳情",
    cadence: "次數與時段",
    entry: "如何進行",
    reward: "主要用途／獎勵",
    tip: "KINA 建議",
    sources: "官方指南與參考資料",
    sourceOfficial: "官方",
    sourceReference: "參考資料",
    checked: "核對",
    customItem: "自訂任務",
    mapItem: "地圖任務",
    core: "核心",
    recommended: "推薦",
    situational: "情境性",
    server: "伺服器",
    account: "帳號",
    character: "角色",
    trackerKicker: "AION2 例行清單",
    dailyKicker: "每日",
    weeklyKicker: "每週",
    customKicker: "自訂",
    completedKicker: "已完成",
    customTaskKicker: "自訂任務",
    daysRemaining: (days: number, clock: string) => `${days} 天 ${clock}`,
  },
  en: {
    title: "My checklist",
    privacy: "Completion stays in this browser and is never uploaded to KINA. Daily and weekly items move to a new cycle automatically for the selected game service.",
    recommendationNote: "Core, recommended, and situational are KINA route suggestions—not an official mandatory list. After an update, trust the in-game panel for special windows, counts, and rewards.",
    serverLegend: "Game service and reset time",
    region: "Game service",
    tw: "Taiwan / Hong Kong / Macau",
    kr: "Korea",
    serverTime: "Current server time",
    dailyReset: "Daily reset",
    weeklyReset: "Weekly reset",
    dailyRule: "Daily at 05:00",
    weeklyRule: "Wednesday at 05:00",
    resetIn: "in",
    maintenanceNote: "Reset times follow the selected service. During maintenance or event periods, check the in-game timer because individual activities may differ.",
    filtersLabel: "Checklist view",
    daily: "Today",
    weekly: "This week",
    once: "One-time",
    custom: "Custom",
    completed: "Completed",
    dailyGroup: "Daily activities",
    weeklyGroup: "Weekly activities",
    customGroup: "Custom tasks",
    dailyDescription: "Finish before the next daily reset; spend charge-based entries first when close to the cap.",
    weeklyDescription: "Spread these across the week instead of leaving everything until Wednesday reset.",
    customDescription: "Your daily, weekly, and one-time tasks. Daily and weekly tasks follow the selected service.",
    customAction: "Add custom task",
    taskLabel: "Task name",
    taskPlaceholder: "For example: claim a character reward",
    frequencyLabel: "Frequency",
    add: "Add to checklist",
    cancel: "Cancel",
    formTitle: "Add a custom task",
    formDescription: "Daily and weekly tasks follow the selected service's 05:00 cycle. One-time tasks never reset automatically.",
    progressDaily: (done: number, total: number) => `Daily ${done} / ${total}`,
    progressWeekly: (done: number, total: number) => `Weekly ${done} / ${total}`,
    empty: "There are no items in this view yet.",
    delete: (label: string) => `Delete “${label}”`,
    reset: "Clear current-cycle checks",
    clear: "Delete completed one-time tasks",
    saved: "Saved on this device",
    storageError: "This browser blocked local storage, so changes may not persist.",
    limit: `Custom and map tasks can hold up to ${MAX_CHECKLIST_ITEMS} items. Delete one before adding another.`,
    viewOnMap: "View on map",
    mapLinkLabel: (marker: string) => `View “${marker}” on the map`,
    details: "View details",
    closeDetails: "Hide details",
    cadence: "Count and schedule",
    entry: "How to enter",
    reward: "Main use / rewards",
    tip: "KINA tip",
    sources: "Official guides and references",
    sourceOfficial: "Official",
    sourceReference: "Reference",
    checked: "checked",
    customItem: "Custom task",
    mapItem: "Map task",
    core: "Core",
    recommended: "Recommended",
    situational: "Situational",
    server: "Server",
    account: "Account",
    character: "Character",
    trackerKicker: "AION2 ROUTINE TRACKER",
    dailyKicker: "DAILY",
    weeklyKicker: "WEEKLY",
    customKicker: "CUSTOM",
    completedKicker: "COMPLETE",
    customTaskKicker: "CUSTOM TASK",
    daysRemaining: (days: number, clock: string) => `${days}d ${clock}`,
  },
  ko: {
    title: "내 체크리스트",
    privacy: "완료 상태는 이 브라우저에만 저장되며 KINA로 전송되지 않습니다. 일일·주간 항목은 선택한 게임 서비스 주기에 맞춰 자동으로 새 주기로 전환됩니다.",
    recommendationNote: "핵심·추천·상황별 표시는 KINA의 루트 제안이며 공식 필수 목록이 아닙니다. 업데이트 후 특수 시간, 횟수, 보상은 게임 내 표시를 우선하세요.",
    serverLegend: "게임 서비스와 초기화 시간",
    region: "게임 서비스",
    tw: "대만 / 홍콩 / 마카오",
    kr: "한국",
    serverTime: "현재 서버 시간",
    dailyReset: "일일 초기화",
    weeklyReset: "주간 초기화",
    dailyRule: "매일 05:00",
    weeklyRule: "수요일 05:00",
    resetIn: "남음",
    maintenanceNote: "초기화 시간은 선택한 서비스를 따릅니다. 점검 또는 이벤트 기간에는 개별 활동 시간이 달라질 수 있으므로 게임 내 타이머를 확인하세요.",
    filtersLabel: "체크리스트 보기",
    daily: "오늘",
    weekly: "이번 주",
    once: "한 번",
    custom: "사용자",
    completed: "완료",
    dailyGroup: "일일 활동",
    weeklyGroup: "주간 활동",
    customGroup: "사용자 작업",
    dailyDescription: "다음 일일 초기화 전에 완료하고 입장권이 상한에 가까운 콘텐츠를 먼저 소모하세요.",
    weeklyDescription: "수요일 초기화 직전에 몰리지 않도록 한 주 동안 나눠 진행하세요.",
    customDescription: "직접 만든 일일·주간·일회성 작업입니다. 일일·주간 작업은 현재 서비스를 따릅니다.",
    customAction: "사용자 작업 추가",
    taskLabel: "작업 이름",
    taskPlaceholder: "예: 캐릭터 보상 받기",
    frequencyLabel: "주기",
    add: "체크리스트에 추가",
    cancel: "취소",
    formTitle: "사용자 작업 추가",
    formDescription: "일일·주간 작업은 현재 게임 서비스의 05:00 주기를 따르며 일회성 작업은 자동 초기화되지 않습니다.",
    progressDaily: (done: number, total: number) => `일일 ${done} / ${total}`,
    progressWeekly: (done: number, total: number) => `주간 ${done} / ${total}`,
    empty: "이 보기에 아직 항목이 없습니다.",
    delete: (label: string) => `“${label}” 삭제`,
    reset: "현재 주기 체크 해제",
    clear: "완료한 일회성 작업 삭제",
    saved: "현재 기기에 저장됨",
    storageError: "브라우저가 로컬 저장소를 차단해 변경 사항이 유지되지 않을 수 있습니다.",
    limit: `사용자·지도 작업은 최대 ${MAX_CHECKLIST_ITEMS}개까지 추가할 수 있습니다. 일부 항목을 먼저 삭제해 주세요.`,
    viewOnMap: "지도에서 보기",
    mapLinkLabel: (marker: string) => `지도에서 “${marker}” 보기`,
    details: "상세 보기",
    closeDetails: "상세 닫기",
    cadence: "횟수와 시간",
    entry: "진행 방법",
    reward: "주요 용도·보상",
    tip: "KINA 제안",
    sources: "공식 안내 및 참고 자료",
    sourceOfficial: "공식",
    sourceReference: "참고",
    checked: "확인",
    customItem: "사용자 작업",
    mapItem: "지도 작업",
    core: "핵심",
    recommended: "추천",
    situational: "상황별",
    server: "서버",
    account: "계정",
    character: "캐릭터",
    trackerKicker: "AION2 루틴 체크리스트",
    dailyKicker: "일일",
    weeklyKicker: "주간",
    customKicker: "사용자",
    completedKicker: "완료",
    customTaskKicker: "사용자 작업",
    daysRemaining: (days: number, clock: string) => `${days}일 ${clock}`,
  },
} as const;

type CoreChecklistUiCopy = typeof coreChecklistUiCopy.en;
type ChecklistUiCopy = {
  -readonly [Key in keyof CoreChecklistUiCopy]:
    CoreChecklistUiCopy[Key] extends (...args: infer Args) => unknown
      ? (...args: Args) => string
      : string;
};
type ChecklistUiTemplateFunctionKey =
  | "progressDaily"
  | "progressWeekly"
  | "delete"
  | "mapLinkLabel"
  | "daysRemaining";
type ChecklistUiTemplate = Omit<
  ChecklistUiCopy,
  ChecklistUiTemplateFunctionKey
> & Record<ChecklistUiTemplateFunctionKey, string>;
type EditorialChecklistLocale = Exclude<
  SiteLocale,
  keyof typeof coreChecklistUiCopy
>;

const editorialChecklistLocales = [
  "zh-hans",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
] as const satisfies readonly EditorialChecklistLocale[];

const generatedChecklistUi = checklistEditorialLocales.translations as unknown as Record<
  EditorialChecklistLocale,
  { ui: ChecklistUiTemplate }
>;

const editorialChecklistUiOverrides: Record<
  EditorialChecklistLocale,
  Partial<ChecklistUiTemplate>
> = {
  "zh-hans": {
    title: "我的检查清单",
    serverLegend: "游戏服务与重置时间",
    region: "游戏服务",
    tw: "台湾／香港／澳门",
    kr: "韩国",
    trackerKicker: "AION2 日常清单",
    dailyKicker: "每日",
    weeklyKicker: "每周",
    customKicker: "自定义",
    completedKicker: "已完成",
    customTaskKicker: "自定义任务",
    progressDaily: "每日 {done} / {total}",
    progressWeekly: "每周 {done} / {total}",
    delete: "删除“{label}”",
    limit: "自定义与地图任务最多可添加 {limit} 项，请先删除一些项目。",
    mapLinkLabel: "在地图上查看“{marker}”",
    daysRemaining: "{days} 天 {clock}",
  },
  fr: {
    title: "Ma liste de suivi",
    serverLegend: "Service de jeu et heure de réinitialisation",
    region: "Service de jeu",
    tw: "Taïwan / Hong Kong / Macao",
    kr: "Corée",
    trackerKicker: "SUIVI DES ROUTINES AION2",
    dailyKicker: "QUOTIDIEN",
    weeklyKicker: "HEBDOMADAIRE",
    customKicker: "PERSONNALISÉ",
    completedKicker: "TERMINÉ",
    customTaskKicker: "TÂCHE PERSONNALISÉE",
    progressDaily: "Quotidien {done} / {total}",
    progressWeekly: "Hebdomadaire {done} / {total}",
    delete: "Supprimer « {label} »",
    limit: "Les tâches personnalisées et de carte sont limitées à {limit}. Supprimez-en une avant d'en ajouter une autre.",
    mapLinkLabel: "Voir « {marker} » sur la carte",
    daysRemaining: "{days} j {clock}",
  },
  de: {
    title: "Meine Checkliste",
    serverLegend: "Spielservice und Rücksetzzeit",
    region: "Spielservice",
    tw: "Taiwan / Hongkong / Macau",
    kr: "Korea",
    trackerKicker: "AION2-ROUTINENPLANER",
    dailyKicker: "TÄGLICH",
    weeklyKicker: "WÖCHENTLICH",
    customKicker: "EIGENE",
    completedKicker: "ERLEDIGT",
    customTaskKicker: "EIGENE AUFGABE",
    progressDaily: "Täglich {done} / {total}",
    progressWeekly: "Wöchentlich {done} / {total}",
    delete: "„{label}“ löschen",
    limit: "Eigene und Kartenaufgaben sind auf {limit} Einträge begrenzt. Lösche vor dem Hinzufügen einen Eintrag.",
    mapLinkLabel: "„{marker}“ auf der Karte anzeigen",
    daysRemaining: "{days} T {clock}",
  },
  es: {
    title: "Mi lista de seguimiento",
    serverLegend: "Servicio de juego y hora de reinicio",
    region: "Servicio de juego",
    tw: "Taiwán / Hong Kong / Macao",
    kr: "Corea",
    trackerKicker: "SEGUIMIENTO DE RUTINAS DE AION2",
    dailyKicker: "DIARIO",
    weeklyKicker: "SEMANAL",
    customKicker: "PERSONALIZADO",
    completedKicker: "COMPLETADO",
    customTaskKicker: "TAREA PERSONALIZADA",
    progressDaily: "Diario {done} / {total}",
    progressWeekly: "Semanal {done} / {total}",
    delete: "Eliminar «{label}»",
    limit: "Las tareas personalizadas y del mapa admiten hasta {limit} elementos. Elimina uno antes de añadir otro.",
    mapLinkLabel: "Ver «{marker}» en el mapa",
    daysRemaining: "{days} d {clock}",
  },
  ja: {
    title: "マイチェックリスト",
    serverLegend: "ゲームサービスとリセット時刻",
    region: "ゲームサービス",
    tw: "台湾／香港／マカオ",
    kr: "韓国",
    trackerKicker: "AION2 ルーティンチェック",
    dailyKicker: "デイリー",
    weeklyKicker: "ウィークリー",
    customKicker: "カスタム",
    completedKicker: "完了",
    customTaskKicker: "カスタムタスク",
    progressDaily: "デイリー {done} / {total}",
    progressWeekly: "ウィークリー {done} / {total}",
    delete: "「{label}」を削除",
    limit: "カスタムタスクとマップタスクは最大 {limit} 件です。追加する前に項目を削除してください。",
    mapLinkLabel: "マップで「{marker}」を見る",
    daysRemaining: "{days}日 {clock}",
  },
  "pt-br": {
    title: "Minha lista de atividades",
    serverLegend: "Serviço de jogo e horário de redefinição",
    region: "Serviço de jogo",
    tw: "Taiwan / Hong Kong / Macau",
    kr: "Coreia",
    trackerKicker: "ROTINA AION2",
    dailyKicker: "DIÁRIO",
    weeklyKicker: "SEMANAL",
    customKicker: "PERSONALIZADO",
    completedKicker: "CONCLUÍDO",
    customTaskKicker: "TAREFA PERSONALIZADA",
    progressDaily: "Diário {done} / {total}",
    progressWeekly: "Semanal {done} / {total}",
    delete: "Excluir “{label}”",
    limit: "As tarefas personalizadas e do mapa comportam até {limit} itens. Exclua um antes de adicionar outro.",
    mapLinkLabel: "Ver “{marker}” no mapa",
    daysRemaining: "{days} d {clock}",
  },
  ru: {
    title: "Мой список дел",
    serverLegend: "Игровой сервис и время сброса",
    region: "Игровой сервис",
    tw: "Тайвань / Гонконг / Макао",
    kr: "Корея",
    trackerKicker: "ТРЕКЕР РУТИН AION2",
    dailyKicker: "ЕЖЕДНЕВНО",
    weeklyKicker: "ЕЖЕНЕДЕЛЬНО",
    customKicker: "СВОИ",
    completedKicker: "ВЫПОЛНЕНО",
    customTaskKicker: "СВОЯ ЗАДАЧА",
    progressDaily: "Ежедневно {done} / {total}",
    progressWeekly: "Еженедельно {done} / {total}",
    delete: "Удалить «{label}»",
    limit: "Можно сохранить не более {limit} своих задач и задач с карты. Перед добавлением удалите одну.",
    mapLinkLabel: "Показать «{marker}» на карте",
    daysRemaining: "{days} д. {clock}",
  },
};

function applyTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function hydrateChecklistUiCopy(template: ChecklistUiTemplate): ChecklistUiCopy {
  return {
    ...template,
    progressDaily: (done, total) => applyTemplate(template.progressDaily, { done, total }),
    progressWeekly: (done, total) => applyTemplate(template.progressWeekly, { done, total }),
    delete: (label) => applyTemplate(template.delete, { label }),
    limit: applyTemplate(template.limit, { limit: MAX_CHECKLIST_ITEMS }),
    mapLinkLabel: (marker) => applyTemplate(template.mapLinkLabel, { marker }),
    daysRemaining: (days, clock) => applyTemplate(template.daysRemaining, { days, clock }),
  };
}

export const checklistUiCopy: Record<SiteLocale, ChecklistUiCopy> = {
  "zh-hant": coreChecklistUiCopy["zh-hant"],
  en: coreChecklistUiCopy.en,
  ko: coreChecklistUiCopy.ko,
  ...Object.fromEntries(
    editorialChecklistLocales.map((locale) => [
      locale,
      hydrateChecklistUiCopy({
        ...generatedChecklistUi[locale].ui,
        ...editorialChecklistUiOverrides[locale],
      }),
    ]),
  ) as Record<EditorialChecklistLocale, ChecklistUiCopy>,
};

function getMapHref(locale: SiteLocale, mapRef: ChecklistMapRef) {
  return `/${locale}/tools/map/${encodeURIComponent(mapRef.mapSlug)}/#poi=${encodeURIComponent(mapRef.markerId)}`;
}

function durationLabel(milliseconds: number, text: ChecklistUiCopy) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1_000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const clock = [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
  if (!days) return clock;
  return text.daysRemaining(days, clock);
}

function virtualBuiltinItem(activity: (typeof CHECKLIST_ACTIVITIES)[number]): ChecklistItem {
  return {
    id: `builtin:${activity.id}`,
    builtinId: activity.id,
    label: activity.copy.en.name,
    frequency: activity.frequency,
    done: false,
    source: "builtin",
  };
}

export function DailyChecklist({
  initialNow,
  locale,
}: {
  initialNow: number;
  locale: SiteLocale;
}) {
  const text = checklistUiCopy[locale];
  const labelId = useId();
  const frequencyId = useId();
  const dialogTitleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [label, setLabel] = useState("");
  const [frequency, setFrequency] = useState<ChecklistFrequency>("daily");
  const [filter, setFilter] = useState<Filter>("daily");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [addLimitReached, setAddLimitReached] = useState(false);
  const [now, setNow] = useState(initialNow);
  const storedValue = useSyncExternalStore(
    checklistStore.subscribe,
    checklistStore.getSnapshot,
    checklistStore.getServerSnapshot,
  );
  const snapshot = useMemo(() => readChecklistSnapshot(storedValue, { now }), [now, storedValue]);

  const items = useMemo(() => {
    const storedBuiltins = new Map(
      snapshot.items
        .filter((item) => item.source === "builtin" && item.builtinId)
        .map((item) => [item.builtinId, item]),
    );
    const catalogItems = CHECKLIST_ACTIVITIES.map((activity) => (
      storedBuiltins.get(activity.id) ?? virtualBuiltinItem(activity)
    ));
    const customItems = snapshot.items.filter((item) => item.source !== "builtin");
    return [...catalogItems, ...customItems];
  }, [snapshot.items]);

  const cycleState = useMemo(
    () => getChecklistCycleState(snapshot.settings.region, now),
    [now, snapshot.settings.region],
  );
  const visibleItems = useMemo(() => {
    if (filter === "custom") return items.filter((item) => item.source !== "builtin");
    if (filter === "completed") return items.filter((item) => item.done);
    return items.filter((item) => item.frequency === filter);
  }, [filter, items]);
  const dailyItems = items.filter((item) => item.frequency === "daily");
  const weeklyItems = items.filter((item) => item.frequency === "weekly");
  const dailyDone = dailyItems.filter((item) => item.done).length;
  const weeklyDone = weeklyItems.filter((item) => item.done).length;
  const userItemCount = items.filter((item) => item.source !== "builtin").length;
  const resetDateFormatter = useMemo(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: cycleState.serverTimeZone,
  }), [cycleState.serverTimeZone, locale]);
  const serverTimeFormatter = useMemo(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: cycleState.serverTimeZone,
  }), [cycleState.serverTimeZone, locale]);

  useEffect(() => {
    ensureBuiltinChecklistItems(CHECKLIST_BUILTIN_DEFINITIONS);
    syncChecklistResets();
    trackEvent("tool_open", { locale, tool_name: "daily_checklist" });
  }, [locale]);

  useEffect(() => {
    const updateClock = () => setNow(Date.now());
    const timer = window.setInterval(updateClock, 1_000);
    const synchronize = () => {
      if (document.visibilityState === "hidden") return;
      syncChecklistResets();
      updateClock();
    };
    window.addEventListener("focus", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (customOpen && !dialog.open) dialog.showModal();
    if (!customOpen && dialog.open) dialog.close();
  }, [customOpen]);

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = addChecklistItem({ label, frequency });
    if (result?.outcome === "limit") {
      setAddLimitReached(true);
      return;
    }
    if (!result?.added) return;
    setAddLimitReached(false);
    trackEvent("checklist_item_create", { frequency, surface: "daily_checklist" });
    setLabel("");
    setFilter("custom");
    setCustomOpen(false);
  }

  function toggleItem(item: ChecklistItem) {
    ensureBuiltinChecklistItems(CHECKLIST_BUILTIN_DEFINITIONS);
    const done = !item.done;
    updateChecklistItems((current) => current.map((candidate) => (
      candidate.id === item.id
        ? { ...candidate, done, ...(done ? { completedAt: new Date().toISOString() } : { completedAt: undefined }) }
        : candidate
    )));
    trackEvent(done ? "checklist_item_complete" : "checklist_item_reopen", {
      frequency: item.frequency,
      has_map_ref: Boolean(item.mapRef),
      is_builtin: item.source === "builtin",
      surface: "daily_checklist",
    });
  }

  function deleteItem(id: string) {
    updateChecklistItems((current) => current.filter((item) => item.id !== id));
    setAddLimitReached(false);
  }

  function changeRegion(region: ChecklistRegion) {
    if (region === snapshot.settings.region) return;
    setChecklistRegion(region);
    setNow(Date.now());
    trackEvent("checklist_region_change", { region, surface: "daily_checklist" });
  }

  const groupTitle = filter === "daily"
    ? text.dailyGroup
    : filter === "weekly"
      ? text.weeklyGroup
      : filter === "custom"
        ? text.customGroup
        : text.completed;
  const groupDescription = filter === "daily"
    ? text.dailyDescription
    : filter === "weekly"
      ? text.weeklyDescription
      : filter === "custom"
        ? text.customDescription
        : text.recommendationNote;

  return (
    <section className={styles.checklist} aria-labelledby="daily-checklist-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>{text.trackerKicker}</p>
          <h2 id="daily-checklist-title">{text.title}</h2>
        </div>
        <div className={styles.progressSummary} aria-label={`${text.progressDaily(dailyDone, dailyItems.length)}; ${text.progressWeekly(weeklyDone, weeklyItems.length)}`}>
          <span>{text.progressDaily(dailyDone, dailyItems.length)}</span>
          <span>{text.progressWeekly(weeklyDone, weeklyItems.length)}</span>
        </div>
      </div>
      <p className={styles.privacy}>{text.privacy}</p>

      <fieldset className={styles.resetPanel}>
        <legend>{text.serverLegend}</legend>
        <div className={styles.serverPicker}>
          <span className={styles.resetIcon} aria-hidden="true"><Server size={18} /></span>
          <label htmlFor="checklist-region">{text.region}</label>
          <select
            id="checklist-region"
            onChange={(event) => changeRegion(event.target.value as ChecklistRegion)}
            value={snapshot.settings.region}
          >
            <option value="tw">{text.tw}</option>
            <option value="kr">{text.kr}</option>
          </select>
          <span className={styles.serverClock}>
            <small>{text.serverTime}</small>
            <strong>{serverTimeFormatter.format(now)}</strong>
          </span>
        </div>
        <div className={styles.resetCards}>
          <article>
            <span aria-hidden="true"><Clock3 size={18} /></span>
            <div>
              <small>{text.dailyReset} · {text.dailyRule}</small>
              <strong>{text.resetIn} {durationLabel(cycleState.nextDailyResetAt.getTime() - now, text)}</strong>
              <time dateTime={cycleState.nextDailyResetAt.toISOString()}>{resetDateFormatter.format(cycleState.nextDailyResetAt)}</time>
            </div>
          </article>
          <article>
            <span aria-hidden="true"><CalendarDays size={18} /></span>
            <div>
              <small>{text.weeklyReset} · {text.weeklyRule}</small>
              <strong>{text.resetIn} {durationLabel(cycleState.nextWeeklyResetAt.getTime() - now, text)}</strong>
              <time dateTime={cycleState.nextWeeklyResetAt.toISOString()}>{resetDateFormatter.format(cycleState.nextWeeklyResetAt)}</time>
            </div>
          </article>
        </div>
        <p className={styles.maintenanceNote}>{text.maintenanceNote}</p>
        <div className={styles.resetEvidence}>
          {(["dailyBoundary", "weeklyReset"] as const).map((sourceId) => {
            const source = CHECKLIST_SOURCES[sourceId];
            return (
              <a href={source.url} key={sourceId} rel="noreferrer" target="_blank">
                {getChecklistSourceCopy(sourceId, locale).label}
                <ExternalLink aria-hidden="true" size={13} />
              </a>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.toolbar}>
        <div aria-label={text.filtersLabel} className={styles.filters} role="group">
          {(["daily", "weekly", "custom", "completed"] as const).map((value) => (
            <button
              aria-pressed={filter === value}
              key={value}
              onClick={() => setFilter(value)}
              type="button"
            >
              {text[value]}
              <span>
                {value === "daily"
                  ? dailyItems.length
                  : value === "weekly"
                    ? weeklyItems.length
                    : value === "custom"
                      ? userItemCount
                      : items.filter((item) => item.done).length}
              </span>
            </button>
          ))}
        </div>
        <button className={styles.addTaskButton} onClick={() => setCustomOpen(true)} type="button">
          <Plus size={17} aria-hidden="true" />
          {text.customAction}
        </button>
      </div>

      <div className={styles.groupHeading}>
        <div>
          <p>
            {filter === "daily"
              ? text.dailyKicker
              : filter === "weekly"
                ? text.weeklyKicker
                : filter === "custom"
                  ? text.customKicker
                  : text.completedKicker}
          </p>
          <h3>{groupTitle}</h3>
        </div>
        <span>{visibleItems.filter((item) => item.done).length} / {visibleItems.length}</span>
      </div>
      <p className={styles.groupDescription}>{groupDescription}</p>

      {visibleItems.length ? (
        <ul className={styles.items}>
          {visibleItems.map((item) => {
            const activity = getChecklistActivity(item.builtinId);
            const activityCopy = activity
              ? getChecklistActivityCopy(activity, locale)
              : undefined;
            const itemLabel = getChecklistItemLabel(item, locale);
            const isExpanded = expandedId === item.id;
            return (
              <li className={item.done ? styles.done : undefined} key={item.id}>
                <div className={styles.itemMain}>
                  <label className={styles.checkControl} aria-label={`${item.done ? text.completed : ""} ${itemLabel}`}>
                    <input
                      checked={item.done}
                      onChange={() => toggleItem(item)}
                      type="checkbox"
                    />
                  </label>
                  <div className={styles.itemCopy}>
                    <div className={styles.itemTitleLine}>
                      <strong>{itemLabel}</strong>
                      {activity ? <span data-priority={activity.priority}>{text[activity.priority]}</span> : null}
                    </div>
                    <p>{activityCopy?.summary ?? (item.mapRef ? text.mapItem : text.customItem)}</p>
                    <div className={styles.itemMeta}>
                      <span>{activity ? text[activity.scope] : text[item.frequency]}</span>
                      <span>{activityCopy?.cadence ?? text[item.frequency]}</span>
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    {activity ? (
                      <button
                        aria-controls={`checklist-detail-${activity.id}`}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? text.closeDetails : text.details}
                        className={styles.detailButton}
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        title={isExpanded ? text.closeDetails : text.details}
                        type="button"
                      >
                        <ChevronDown aria-hidden="true" size={18} />
                      </button>
                    ) : null}
                    {item.mapRef ? (
                      <a
                        aria-label={text.mapLinkLabel(item.mapRef.markerNameSnapshot ?? itemLabel)}
                        className={styles.mapLink}
                        href={getMapHref(locale, item.mapRef)}
                        onClick={() => trackEvent("checklist_to_map_open", {
                          map_name: item.mapRef?.mapName,
                          marker_id: item.mapRef?.markerId,
                          surface: "daily_checklist",
                        })}
                      >
                        {text.viewOnMap}
                      </a>
                    ) : null}
                    {item.source !== "builtin" ? (
                      <button
                        aria-label={text.delete(itemLabel)}
                        className={styles.delete}
                        onClick={() => deleteItem(item.id)}
                        title={text.delete(itemLabel)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" size={17} />
                      </button>
                    ) : null}
                  </div>
                </div>
                {activity && isExpanded ? (
                  <div className={styles.itemDetails} id={`checklist-detail-${activity.id}`}>
                    <dl>
                      <div><dt>{text.cadence}</dt><dd>{activityCopy?.cadence}</dd></div>
                      <div><dt>{text.entry}</dt><dd>{activityCopy?.entry}</dd></div>
                      <div><dt>{text.reward}</dt><dd>{activityCopy?.reward}</dd></div>
                      <div><dt>{text.tip}</dt><dd>{activityCopy?.tip}</dd></div>
                    </dl>
                    <div className={styles.sources}>
                      <strong>{text.sources}</strong>
                      {activity.sourceIds.map((sourceId) => {
                        const source = CHECKLIST_SOURCES[sourceId];
                        const sourceCopy = getChecklistSourceCopy(sourceId, locale);
                        return (
                          <a href={source.url} key={sourceId} rel="noreferrer" target="_blank">
                            <span>{source.status === "official" ? text.sourceOfficial : text.sourceReference}</span>
                            <span>{sourceCopy.label}</span>
                            <small>{sourceCopy.note} · {text.checked} {source.checkedAt}</small>
                            <ExternalLink aria-hidden="true" size={14} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.empty}>{text.empty}</p>
      )}

      <div className={styles.footerRow}>
        <span aria-live="polite" className={snapshot.storageUnavailable ? styles.error : styles.saved}>
          {snapshot.storageUnavailable ? text.storageError : text.saved}
        </span>
        <div className={styles.actions}>
          <button
            disabled={!items.some((item) => item.done && item.frequency !== "once")}
            onClick={() => {
              updateChecklistItems((current) => current.map((item) => (
                item.frequency === "once" ? item : { ...item, done: false, completedAt: undefined }
              )));
              trackEvent("checklist_reset", { surface: "daily_checklist" });
            }}
            type="button"
          >
            {text.reset}
          </button>
          <button
            disabled={!items.some((item) => item.source !== "builtin" && item.frequency === "once" && item.done)}
            onClick={() => {
              updateChecklistItems((current) => current.filter((item) => !(
                item.source !== "builtin" && item.frequency === "once" && item.done
              )));
              trackEvent("checklist_clear_completed", { surface: "daily_checklist" });
            }}
            type="button"
          >
            {text.clear}
          </button>
        </div>
      </div>

      <dialog
        aria-labelledby={dialogTitleId}
        className={styles.taskDialog}
        onCancel={() => setCustomOpen(false)}
        onClose={() => setCustomOpen(false)}
        ref={dialogRef}
      >
        <form className={styles.form} onSubmit={addItem}>
          <div className={styles.dialogHeading}>
            <div>
              <p className={styles.kicker}>{text.customTaskKicker}</p>
              <h3 id={dialogTitleId}>{text.formTitle}</h3>
            </div>
            <button aria-label={text.cancel} onClick={() => setCustomOpen(false)} type="button">
              <X aria-hidden="true" size={19} />
            </button>
          </div>
          <p>{text.formDescription}</p>
          <label htmlFor={labelId}>{text.taskLabel}</label>
          <input
            autoComplete="off"
            id={labelId}
            maxLength={80}
            onChange={(event) => setLabel(event.target.value)}
            placeholder={text.taskPlaceholder}
            required
            value={label}
          />
          <label htmlFor={frequencyId}>{text.frequencyLabel}</label>
          <select
            id={frequencyId}
            onChange={(event) => setFrequency(event.target.value as ChecklistFrequency)}
            value={frequency}
          >
            <option value="daily">{text.daily}</option>
            <option value="weekly">{text.weekly}</option>
            <option value="once">{text.once}</option>
          </select>
          {addLimitReached ? <p className={styles.error} role="alert">{text.limit}</p> : null}
          <div className={styles.dialogActions}>
            <button onClick={() => setCustomOpen(false)} type="button">{text.cancel}</button>
            <button disabled={userItemCount >= MAX_CHECKLIST_ITEMS} type="submit">{text.add}</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
