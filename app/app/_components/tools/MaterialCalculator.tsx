"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import {
  MATERIAL_PLAN_SHARE_KEY,
  buildMaterialPlanShareFragment,
  calculateMaterialPlan,
  createMaterialPlanState,
  createMaterialPlanTemplate,
  getMaterialPlanTemplates,
  materialPlanLimits,
  parseMaterialPlanState,
  serializeMaterialPlanState,
  type MaterialPlanState,
  type MaterialPlanTemplateKind,
} from "@/app/material-calculator";
import { trackEvent } from "@/app/analytics";
import {
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./MaterialCalculator.module.css";

const STORAGE_KEY = "aion2-kina:material-calculator:v1";
const MAX_QUANTITY = materialPlanLimits.maxQuantity;

type PlanOrigin = "session" | "local" | "shared";
type Status = { kind: "success" | "error" | "info"; text: string } | null;

export type MaterialCalculatorCopy = {
  kicker: string;
  title: string;
  description: string;
  nonOfficial: string;
  localOnly: string;
  templateLegend: string;
  templateHint: string;
  useTemplate: (name: string) => string;
  selectedTemplate: string;
  planTitleLabel: string;
  planTitleHint: string;
  sourceLabel: string;
  sourceSession: string;
  sourceLocal: string;
  sourceShared: string;
  sourceLoading: string;
  sharedWarning: string;
  save: string;
  saveCopy: string;
  share: string;
  copyShortage: string;
  reset: string;
  materialsLegend: string;
  materialsHint: string;
  addMaterial: string;
  emptyMaterials: string;
  materialName: string;
  inventory: string;
  removeMaterial: (name: string) => string;
  newMaterialName: (index: number) => string;
  stagesLegend: string;
  stagesHint: string;
  addStage: string;
  emptyStages: string;
  stageName: string;
  targetCount: string;
  targetCountHint: string;
  costsTitle: string;
  costsHint: string;
  costFor: (material: string) => string;
  removeStage: (name: string) => string;
  newStageName: (index: number) => string;
  unnamedMaterial: string;
  unnamedStage: string;
  summaryKicker: string;
  summaryTitle: string;
  readyTypes: string;
  shortageTypes: string;
  targetedTypes: string;
  configuredStages: string;
  noTargets: string;
  allReady: string;
  comparisonWarning: string;
  resultRequired: string;
  resultInventory: string;
  resultShortage: string;
  resultSurplus: string;
  resultReady: string;
  resultNotTargeted: string;
  materialProgress: (name: string, percent: number) => string;
  saved: string;
  savedCopy: string;
  storageError: string;
  invalidStored: string;
  invalidShared: string;
  invalidPlan: string;
  quantityError: string;
  limitError: string;
  shareOpened: string;
  linkCopied: string;
  copiedShortage: string;
  copyFailed: string;
  nothingToCopy: string;
  resetDone: string;
  confirmTitle: string;
  confirmBody: string;
  cancel: string;
  confirmReset: string;
  closeDialog: string;
  shortageListTitle: string;
};

export const materialCalculatorUiCopy: Record<SiteLocale, MaterialCalculatorCopy> = {
  "zh-hant": {
    kicker: "USER-DEFINED PLANNER",
    title: "自訂材料需求計算器",
    description:
      "建立多個階段，填入每個目標所需的材料與目標次數，再和目前庫存即時比對。",
    nonOfficial:
      "所有名稱、數量與結果都由你輸入並在瀏覽器中計算；不是 AION2 官方材料資料、掉落率、成功率或推薦。請依目前遊戲版本自行核對。",
    localOnly:
      "方案只儲存在這台裝置的瀏覽器。分享連結使用網址片段，不會把方案上傳至 KINA。",
    templateLegend: "選擇起始範本",
    templateHint: "範本會取代目前編輯中的方案。",
    useTemplate: (name) => `使用「${name}」`,
    selectedTemplate: "目前範本",
    planTitleLabel: "方案名稱",
    planTitleHint: "方便辨識這份自訂規劃，不會影響計算。",
    sourceLabel: "儲存狀態",
    sourceSession: "目前工作階段",
    sourceLocal: "已儲存在此裝置",
    sourceShared: "分享連結副本",
    sourceLoading: "正在讀取本機方案",
    sharedWarning:
      "你正在編輯分享連結的副本。本機原有方案不會被覆寫；要保留這份內容，請按「儲存副本」。",
    save: "儲存在此裝置",
    saveCopy: "儲存副本",
    share: "分享方案",
    copyShortage: "複製缺口清單",
    reset: "清除並重設",
    materialsLegend: "材料與庫存",
    materialsHint: "每種材料各自計算；名稱與庫存皆可編輯。",
    addMaterial: "新增材料",
    emptyMaterials: "尚未加入材料。先新增一種你要追蹤的材料。",
    materialName: "材料名稱",
    inventory: "目前庫存",
    removeMaterial: (name) => `移除材料「${name}」`,
    newMaterialName: (index) => `自訂材料 ${index}`,
    stagesLegend: "階段與每個目標成本",
    stagesHint: "每個階段可設定目標次數，以及完成一次目標所需的各項材料。",
    addStage: "新增階段",
    emptyStages: "尚未加入階段。新增階段後即可填寫每次材料成本。",
    stageName: "階段名稱",
    targetCount: "目標次數",
    targetCountHint: "此階段要完成幾次",
    costsTitle: "每個目標的材料成本",
    costsHint: "填 0 代表這個階段不使用該材料。",
    costFor: (material) => `${material}：每次需要`,
    removeStage: (name) => `移除階段「${name}」`,
    newStageName: (index) => `自訂階段 ${index}`,
    unnamedMaterial: "未命名材料",
    unnamedStage: "未命名階段",
    summaryKicker: "LIVE SUMMARY",
    summaryTitle: "需求摘要",
    readyTypes: "已備齊材料種類",
    shortageTypes: "有缺口材料種類",
    targetedTypes: "有需求的材料種類",
    configuredStages: "已設定階段",
    noTargets: "請加入材料、階段及大於 0 的目標次數以開始計算。",
    allReady: "目前所有有需求的材料種類都已備齊。",
    comparisonWarning:
      "不同材料的單位不能直接相加比較，因此不顯示合併總數或整體百分比；進度只在每種材料內計算。",
    resultRequired: "需求",
    resultInventory: "庫存",
    resultShortage: "缺口",
    resultSurplus: "餘量",
    resultReady: "已備齊",
    resultNotTargeted: "尚無需求",
    materialProgress: (name, percent) => `${name} 已備妥 ${percent}%`,
    saved: "方案已儲存在此裝置。",
    savedCopy: "分享方案的副本已儲存在此裝置，本機舊方案已由這份副本取代。",
    storageError: "瀏覽器封鎖了本機儲存；你仍可在目前工作階段繼續編輯。",
    invalidStored: "本機方案格式無效，已保留空白方案，且沒有覆寫原始資料。",
    invalidShared: "分享連結中的方案無效或版本不受支援，未載入其內容。",
    invalidPlan: "請補齊所有名稱並檢查數量；目前方案無法計算、儲存或分享。",
    quantityError: `數量必須是 0 至 ${MAX_QUANTITY.toLocaleString("en-US")} 之間的整數。`,
    limitError: "已達此版本支援的材料、階段或成本項目上限。",
    shareOpened: "系統分享視窗已開啟。",
    linkCopied: "方案分享連結已複製。",
    copiedShortage: "缺口清單已複製。",
    copyFailed: "瀏覽器無法自動複製，請檢查剪貼簿權限後再試。",
    nothingToCopy: "目前沒有可複製的材料缺口。",
    resetDone: "方案已清除，並回到空白自訂計畫。",
    confirmTitle: "清除整份方案？",
    confirmBody:
      "這會刪除此裝置儲存的材料、階段、成本與庫存，並回到空白範本。此動作無法復原。",
    cancel: "取消",
    confirmReset: "確認清除",
    closeDialog: "關閉確認視窗",
    shortageListTitle: "材料缺口清單（使用者自訂，非 AION2 官方資料）",
  },
  en: {
    kicker: "USER-DEFINED PLANNER",
    title: "Custom material requirement calculator",
    description:
      "Create multiple stages, enter the material cost per target and target count, then compare the result with your current inventory.",
    nonOfficial:
      "Every name, quantity, and result is entered by you and calculated in this browser. Nothing here is official AION2 material data, a drop rate, a success rate, or a recommendation. Verify values against your current game version.",
    localOnly:
      "Plans stay in this browser on this device. Share links use the URL fragment and do not upload your plan to KINA.",
    templateLegend: "Choose a starting template",
    templateHint: "A template replaces the plan currently being edited.",
    useTemplate: (name) => `Use “${name}”`,
    selectedTemplate: "Current template",
    planTitleLabel: "Plan name",
    planTitleHint: "A label for your own reference; it does not affect the calculation.",
    sourceLabel: "Save status",
    sourceSession: "Current session only",
    sourceLocal: "Saved on this device",
    sourceShared: "Shared-link copy",
    sourceLoading: "Reading local plan",
    sharedWarning:
      "You are editing a copy from a shared link. Your existing local plan will not be overwritten until you choose Save copy.",
    save: "Save on this device",
    saveCopy: "Save copy",
    share: "Share plan",
    copyShortage: "Copy shortage list",
    reset: "Clear and reset",
    materialsLegend: "Materials and inventory",
    materialsHint: "Each material is calculated separately. Names and inventory are editable.",
    addMaterial: "Add material",
    emptyMaterials: "No materials yet. Add the first material you want to track.",
    materialName: "Material name",
    inventory: "Current inventory",
    removeMaterial: (name) => `Remove material “${name}”`,
    newMaterialName: (index) => `Custom material ${index}`,
    stagesLegend: "Stages and per-target costs",
    stagesHint:
      "Each stage has a target count and the material cost required for one target.",
    addStage: "Add stage",
    emptyStages: "No stages yet. Add a stage to enter its per-target costs.",
    stageName: "Stage name",
    targetCount: "Target count",
    targetCountHint: "How many times to complete this stage",
    costsTitle: "Material cost per target",
    costsHint: "Enter 0 when this stage does not use a material.",
    costFor: (material) => `${material}: required per target`,
    removeStage: (name) => `Remove stage “${name}”`,
    newStageName: (index) => `Custom stage ${index}`,
    unnamedMaterial: "Unnamed material",
    unnamedStage: "Unnamed stage",
    summaryKicker: "LIVE SUMMARY",
    summaryTitle: "Requirement summary",
    readyTypes: "Material types ready",
    shortageTypes: "Material types short",
    targetedTypes: "Material types required",
    configuredStages: "Stages configured",
    noTargets: "Add materials, stages, and a target count above 0 to begin calculating.",
    allReady: "Every currently required material type is ready.",
    comparisonWarning:
      "Unlike material units cannot be meaningfully added together, so no combined unit total or overall percentage is shown. Progress is calculated within each material only.",
    resultRequired: "Required",
    resultInventory: "Inventory",
    resultShortage: "Shortage",
    resultSurplus: "Surplus",
    resultReady: "Ready",
    resultNotTargeted: "No requirement",
    materialProgress: (name, percent) => `${name} is ${percent}% covered`,
    saved: "Plan saved on this device.",
    savedCopy: "The shared plan copy is now saved on this device and replaces the previous local plan.",
    storageError: "This browser blocked local storage. You can still edit during this session.",
    invalidStored:
      "The saved plan is invalid. A blank plan is shown, and the original stored value was not overwritten.",
    invalidShared:
      "The shared plan is invalid or uses an unsupported version, so its contents were not loaded.",
    invalidPlan:
      "Complete every required name and check the quantities. This plan cannot currently be calculated, saved, or shared.",
    quantityError: `Quantities must be whole numbers from 0 to ${MAX_QUANTITY.toLocaleString("en-US")}.`,
    limitError: "This plan has reached the supported material, stage, or cost-entry limit.",
    shareOpened: "The system share sheet opened.",
    linkCopied: "Plan share link copied.",
    copiedShortage: "Shortage list copied.",
    copyFailed: "The browser could not copy automatically. Check clipboard permission and try again.",
    nothingToCopy: "There are no material shortages to copy.",
    resetDone: "The plan was cleared and returned to the blank custom template.",
    confirmTitle: "Clear the entire plan?",
    confirmBody:
      "This deletes the materials, stages, costs, and inventory saved on this device and returns to the blank template. It cannot be undone.",
    cancel: "Cancel",
    confirmReset: "Clear plan",
    closeDialog: "Close confirmation",
    shortageListTitle: "Material shortage list (user-defined, not official AION2 data)",
  },

  "zh-hans": {
    kicker: "USER-DEFINED PLANNER",
    title: "自定义材料需求计算器",
    description:
      "建立多个阶段，填入每个目标所需的材料与目标次数，再和当前库存即时比对。",
    nonOfficial:
      "所有名称、数量与结果都由你输入并在浏览器中计算；不是 AION2 官方材料数据、掉落率、成功率或推荐。请依当前游戏版本自行核对。",
    localOnly:
      "方案只保存在这台设备的浏览器。分享链接使用网址片段，不会把方案上传至 KINA。",
    templateLegend: "选择起始范本",
    templateHint: "范本会取代当前编辑中的方案。",
    useTemplate: (name) => `使用「${name}」`,
    selectedTemplate: "当前范本",
    planTitleLabel: "方案名称",
    planTitleHint: "方便辨识这份自定义规划，不会影响计算。",
    sourceLabel: "保存状态",
    sourceSession: "当前工作阶段",
    sourceLocal: "已保存在此设备",
    sourceShared: "分享链接副本",
    sourceLoading: "正在读取本地方案",
    sharedWarning:
      "你正在编辑分享链接的副本。本地原有方案不会被覆写；要保留这份内容，请按「保存副本」。",
    save: "保存在此设备",
    saveCopy: "保存副本",
    share: "分享方案",
    copyShortage: "复制缺口清单",
    reset: "清除并重设",
    materialsLegend: "材料与库存",
    materialsHint: "每种材料各自计算；名称与库存皆可编辑。",
    addMaterial: "新增材料",
    emptyMaterials: "尚未加入材料。先新增一种你要追踪的材料。",
    materialName: "材料名称",
    inventory: "当前库存",
    removeMaterial: (name) => `移除材料「${name}」`,
    newMaterialName: (index) => `自定义材料 ${index}`,
    stagesLegend: "阶段与每个目标成本",
    stagesHint: "每个阶段可设定目标次数，以及完成一次目标所需的各项材料。",
    addStage: "新增阶段",
    emptyStages: "尚未加入阶段。新增阶段后即可填写每次材料成本。",
    stageName: "阶段名称",
    targetCount: "目标次数",
    targetCountHint: "此阶段要完成几次",
    costsTitle: "每个目标的材料成本",
    costsHint: "填 0 代表这个阶段不使用该材料。",
    costFor: (material) => `${material}：每次需要`,
    removeStage: (name) => `移除阶段「${name}」`,
    newStageName: (index) => `自定义阶段 ${index}`,
    unnamedMaterial: "未命名材料",
    unnamedStage: "未命名阶段",
    summaryKicker: "LIVE SUMMARY",
    summaryTitle: "需求摘要",
    readyTypes: "已备齐材料种类",
    shortageTypes: "有缺口材料种类",
    targetedTypes: "有需求的材料种类",
    configuredStages: "已设定阶段",
    noTargets: "请加入材料、阶段及大于 0 的目标次数以开始计算。",
    allReady: "当前所有有需求的材料种类都已备齐。",
    comparisonWarning:
      "不同材料的单位不能直接相加比较，因此不显示合并总数或整体百分比；进度只在每种材料内计算。",
    resultRequired: "需求",
    resultInventory: "库存",
    resultShortage: "缺口",
    resultSurplus: "余量",
    resultReady: "已备齐",
    resultNotTargeted: "尚无需求",
    materialProgress: (name, percent) => `${name} 已备妥 ${percent}%`,
    saved: "方案已保存在此设备。",
    savedCopy: "分享方案的副本已保存在此设备，本地旧方案已由这份副本取代。",
    storageError: "浏览器封锁了本地保存；你仍可在当前工作阶段继续编辑。",
    invalidStored: "本地方案格式无效，已保留空白方案，且没有覆写原始数据。",
    invalidShared: "分享链接中的方案无效或版本不受支援，未载入其内容。",
    invalidPlan: "请补齐所有名称并检查数量；当前方案无法计算、保存或分享。",
    quantityError: `数量必须是 0 至 ${MAX_QUANTITY.toLocaleString("zh-Hans")} 之间的整数。`,
    limitError: "已达此版本支援的材料、阶段或成本项目上限。",
    shareOpened: "系统分享视窗已打开。",
    linkCopied: "方案分享链接已复制。",
    copiedShortage: "缺口清单已复制。",
    copyFailed: "浏览器无法自动复制，请检查剪贴簿权限后再试。",
    nothingToCopy: "当前没有可复制的材料缺口。",
    resetDone: "方案已清除，并回到空白自定义计划。",
    confirmTitle: "清除整份方案？",
    confirmBody:
      "这会删除此设备保存的材料、阶段、成本与库存，并回到空白范本。此动作无法复原。",
    cancel: "取消",
    confirmReset: "确认清除",
    closeDialog: "关闭确认视窗",
    shortageListTitle: "材料缺口清单（用户自定义，非 AION2 官方数据）",
  },








  "de": {
    kicker: "BENUTZERDEfinierter PLANNER",
    title: "Benutzerdefinierter Materialbedarfsrechner",
    description:
      "Erstellen Sie mehrere Phasen, geben Sie die Materialkosten pro Ziel und Zielanzahl ein und vergleichen Sie das Ergebnis dann mit Ihrem aktuellen Inventar.",
    nonOfficial:
      "Jeder Name, jede Menge und jedes Ergebnis werden von Ihnen eingegeben und in diesem Browser berechnet. Nichts hier ist offizielle AION2 Materialdaten, eine Drop-Rate, eine Erfolgsrate oder eine Empfehlung. Überprüfen Sie die Werte mit Ihrer aktuellen Spielversion.",
    localOnly:
      "Pläne bleiben in diesem Browser auf diesem Gerät. Freigabelinks verwenden das URL-Fragment und laden Sie Ihren Plan nicht in KINA hoch.",
    templateLegend: "Wählen Sie eine Startvorlage",
    templateHint: "Eine Vorlage ersetzt den Plan, der derzeit bearbeitet wird.",
    useTemplate: (name) => `Verwenden Sie ‚${name}‘`,
    selectedTemplate: "Aktuelle Vorlage",
    planTitleLabel: "Planbezeichnung",
    planTitleHint: "Ein Label für Ihre eigene Referenz; es hat keinen Einfluss auf die Berechnung.",
    sourceLabel: "Speicherstatus",
    sourceSession: "Nur aktuelle Sitzung",
    sourceLocal: "Auf diesem Gerät gespeichert",
    sourceShared: "Gemeinsame Link-Kopie",
    sourceLoading: "Lesen des lokalen Plans",
    sharedWarning:
      "Sie bearbeiten eine Kopie von einem freigegebenen Link. Ihr vorhandener lokaler Plan wird nicht überschrieben, bis Sie Kopie speichern auswählen.",
    save: "Sparen Sie auf diesem Gerät",
    saveCopy: "Speicherkopie",
    share: "Aktienplan",
    copyShortage: "Kopiermangelliste",
    reset: "Deaktivieren und Zurücksetzen",
    materialsLegend: "Material und Bestand",
    materialsHint: "Jedes Material wird separat berechnet. Namen und Inventar sind editierbar.",
    addMaterial: "Material hinzufügen",
    emptyMaterials: "Noch keine Materialien. Fügen Sie das erste Material hinzu, das Sie verfolgen möchten.",
    materialName: "Materialbezeichnung",
    inventory: "Aktueller Bestand",
    removeMaterial: (name) => `Material entfernen ‚${name}‘`,
    newMaterialName: (index) => `Benutzerdefiniertes Material ${index}`,
    stagesLegend: "Stufen und Kosten je Zielvorgabe",
    stagesHint:
      "Jede Stufe hat eine Zielanzahl und die für ein Ziel erforderlichen Materialkosten.",
    addStage: "Addierstufe",
    emptyStages: "Noch keine Etappen. Fügen Sie eine Stufe hinzu, um die Kosten pro Ziel einzugeben.",
    stageName: "Stufe Name",
    targetCount: "Zielzahl",
    targetCountHint: "Wie oft diese Phase abgeschlossen werden soll",
    costsTitle: "Materialkosten pro Ziel",
    costsHint: "Geben Sie 0 ein, wenn diese Stufe kein Material verwendet.",
    costFor: (material) => `${material}: pro Ziel erforderlich`,
    removeStage: (name) => `Entfernen Sie die Stufe „${name}`,
    newStageName: (index) => `Benutzerdefinierte Stufe ${index}`,
    unnamedMaterial: "Unbenanntes Material",
    unnamedStage: "Unbenannte Bühne",
    summaryKicker: "LEBENDGESCHLOSSEN",
    summaryTitle: "Anforderungszusammenfassung",
    readyTypes: "Werkstoffe bereit",
    shortageTypes: "Materialarten kurz",
    targetedTypes: "Erforderliche Materialtypen",
    configuredStages: "Bühnen konfiguriert",
    noTargets: "Fügen Sie Materialien, Stufen und eine Zielanzahl über 0 hinzu, um mit der Berechnung zu beginnen.",
    allReady: "Jeder aktuell benötigte Materialtyp ist bereit.",
    comparisonWarning:
      "Im Gegensatz zu materiellen Einheiten können sie nicht sinnvoll addiert werden, so dass keine kombinierte Gesamt- oder Gesamtprozentzahl angezeigt wird. Der Fortschritt wird nur innerhalb jedes Materials berechnet.",
    resultRequired: "Erforderlich",
    resultInventory: "Bestandsaufnahme",
    resultShortage: "Mangel",
    resultSurplus: "Überschuss",
    resultReady: "Fertig",
    resultNotTargeted: "Keine Anforderung",
    materialProgress: (name, percent) => `${name} ist ${percent}% abgedeckt`,
    saved: "Plan auf diesem Gerät gespeichert.",
    savedCopy: "Die freigegebene Plankopie wird nun auf diesem Gerät gespeichert und ersetzt den vorherigen lokalen Plan.",
    storageError: "Dieser Browser blockierte den lokalen Speicher. Sie können während dieser Sitzung noch bearbeiten.",
    invalidStored:
      "Der gespeicherte Plan ist ungültig. Es wird ein leerer Plan angezeigt und der ursprüngliche gespeicherte Wert wurde nicht überschrieben.",
    invalidShared:
      "Der freigegebene Plan ist ungültig oder verwendet eine nicht unterstützte Version, so dass der Inhalt nicht geladen wurde.",
    invalidPlan:
      "Füllen Sie alle erforderlichen Namen aus und überprüfen Sie die Mengen. Dieser Plan kann derzeit nicht berechnet, gespeichert oder geteilt werden.",
    quantityError: `Die Mengen müssen ganze Zahlen von 0 bis ${MAX_QUANTITY.toLocaleString("de-DE")} sein.`,
    limitError: "Dieser Plan hat das unterstützte Material, die Phase oder das Kosteneintrittslimit erreicht.",
    shareOpened: "Das System Freigabedialog wurde geöffnet.",
    linkCopied: "Plan Share Link kopiert.",
    copiedShortage: "Vervielfältigungsliste kopiert.",
    copyFailed: "Der Browser konnte nicht automatisch kopieren. Überprüfen Sie die Clipboard-Berechtigung und versuchen Sie es erneut.",
    nothingToCopy: "Es gibt keine materiellen Mängel zu kopieren.",
    resetDone: "Der Plan wurde gelöscht und in die leere benutzerdefinierte Vorlage zurückgegeben.",
    confirmTitle: "Den gesamten Plan löschen?",
    confirmBody:
      "Dadurch werden die auf diesem Gerät gespeicherten Materialien, Stufen, Kosten und das Inventar gelöscht und es wird in die leere Vorlage zurückgeführt. Sie kann nicht rückgängig gemacht werden.",
    cancel: "Abbruch",
    confirmReset: "Klarer Plan",
    closeDialog: "Bestätigungsdialog schließen",
    shortageListTitle: "Materialmangelliste (benutzerdefinierte, nicht offizielle AION2-Daten)",
  },
  "fr": {
    kicker: "PLANNIER DÉFINITEUR",
    title: "Calculatrice des besoins en matière personnalisée",
    description:
      "Créez plusieurs étapes, entrez le coût matériel par cible et le nombre de cibles, puis comparez le résultat avec votre inventaire actuel.",
    nonOfficial:
      "Chaque nom, quantité et résultat est entré par vous et calculé dans ce navigateur. Rien ici n'est des données officielles de matériel AION2, un taux de chute, un taux de réussite ou une recommandation. Vérifiez les valeurs par rapport à votre version actuelle du jeu.",
    localOnly:
      "Les plans restent dans ce navigateur sur cet appareil. Les liens de partage utilisent le fragment URL et ne téléchargent pas votre plan sur KINA.",
    templateLegend: "Choisir un modèle de démarrage",
    templateHint: "Un modèle remplace le plan en cours d'édition.",
    useTemplate: (name) => `Utiliser - -${name}`,
    selectedTemplate: "Modèle actuel",
    planTitleLabel: "Nom du plan",
    planTitleHint: "Une étiquette pour votre propre référence; elle n'affecte pas le calcul.",
    sourceLabel: "Enregistrer l' état",
    sourceSession: "Session en cours seulement",
    sourceLocal: "Enregistré sur ce périphérique",
    sourceShared: "Copie de lien partagé",
    sourceLoading: "Lecture du plan local",
    sharedWarning:
      "Vous modifiez une copie à partir d'un lien partagé. Votre plan local existant ne sera pas écrasé avant que vous ayez choisi Sauvegarder copie.",
    save: "Enregistrer sur ce périphérique",
    saveCopy: "Enregistrer la copie",
    share: "Plan d'action",
    copyShortage: "Copier la liste des pénuries",
    reset: "Effacer et réinitialiser",
    materialsLegend: "Matériel et inventaire",
    materialsHint: "Chaque matériau est calculé séparément. Les noms et l'inventaire sont modifiables.",
    addMaterial: "Ajouter le matériau",
    emptyMaterials: "Pas encore de matériaux. Ajoutez le premier matériel que vous voulez suivre.",
    materialName: "Nom du matériau",
    inventory: "Inventaire actuel",
    removeMaterial: (name) => `Supprimer le matériau - -${name}`,
    newMaterialName: (index) => `Matériel personnalisé ${index}`,
    stagesLegend: "Étapes et coûts par objectif",
    stagesHint:
      "Chaque étape a un nombre cible et le coût matériel requis pour une cible.",
    addStage: "Ajouter une étape",
    emptyStages: "Pas encore de scène. Ajouter une étape pour entrer dans ses coûts par objectif.",
    stageName: "Nom de l'étape",
    targetCount: "Nombre de cibles",
    targetCountHint: "Combien de fois pour terminer cette étape",
    costsTitle: "Coût matériel par objectif",
    costsHint: "Saisissez 0 lorsque cette étape n'utilise pas de matériau.",
    costFor: (material) => `${material}: requis par cible`,
    removeStage: (name) => `Supprimer l'étape -${name}`,
    newStageName: (index) => `Stade personnalisé ${index}`,
    unnamedMaterial: "Matériel non dénommé",
    unnamedStage: "Étape sans nom",
    summaryKicker: "RÉSUMÉ",
    summaryTitle: "Résumé des besoins",
    readyTypes: "Types de matériaux prêts",
    shortageTypes: "Types de matériaux courts",
    targetedTypes: "Types de matériaux requis",
    configuredStages: "Étapes configurées",
    noTargets: "Ajouter des matériaux, des étapes et un nombre de cibles supérieur à 0 pour commencer à calculer.",
    allReady: "Chaque type de matériel actuellement requis est prêt.",
    comparisonWarning:
      "Contrairement aux unités matérielles, on ne peut pas les additionner de façon significative, de sorte qu'aucun pourcentage total ou total de l'unité combinée n'est indiqué. Les progrès sont calculés à l'intérieur de chaque matériau seulement.",
    resultRequired: "Requis",
    resultInventory: "Inventaire",
    resultShortage: "Manque",
    resultSurplus: "Excédent",
    resultReady: "Prêt",
    resultNotTargeted: "Aucune prescription",
    materialProgress: (name, percent) => `${name} est couvert par ${percent}%`,
    saved: "Plan sauvegardé sur cet appareil.",
    savedCopy: "La copie du plan partagé est maintenant sauvegardée sur cet appareil et remplace le plan local précédent.",
    storageError: "Ce navigateur a bloqué le stockage local. Vous pouvez toujours modifier pendant cette session.",
    invalidStored:
      "Le plan sauvegardé est invalide. Un plan vierge est affiché, et la valeur originale stockée n'a pas été écrasée.",
    invalidShared:
      "Le plan partagé est invalide ou utilise une version non prise en charge, de sorte que son contenu n'a pas été chargé.",
    invalidPlan:
      "Remplissez chaque nom requis et vérifiez les quantités. Ce plan ne peut actuellement être calculé, sauvegardé ou partagé.",
    quantityError: `Les quantités doivent être des nombres entiers de 0 à ${MAX_QUANTITY.toLocaleString("fr-FR")}.`,
    limitError: "Ce plan a atteint la limite de la quantité, de l'étape ou de la valeur des coûts.",
    shareOpened: "La feuille de partage du système s'est ouverte.",
    linkCopied: "Le lien de partage du plan a été copié.",
    copiedShortage: "Liste de pénurie copiée.",
    copyFailed: "Le navigateur ne pouvait pas copier automatiquement. Vérifiez la permission du presse-papiers et essayez à nouveau.",
    nothingToCopy: "Il n'y a pas de pénuries matérielles à copier.",
    resetDone: "Le plan a été approuvé et retourné au modèle personnalisé vierge.",
    confirmTitle: "- Tout est réglé ?",
    confirmBody:
      "Cela supprime les matériaux, les étapes, les coûts et l'inventaire sauvegardés sur cet appareil et retourne au modèle vide. Il ne peut pas être annulé.",
    cancel: "Annuler",
    confirmReset: "Effacer le plan",
    closeDialog: "Fermer la fenêtre de confirmation",
    shortageListTitle: "Liste de pénuries de matériel (données définies par l'utilisateur, pas officielles AION2)",
  },
  "es": {
    kicker: "PLANNER DE USUARIO DE FINED",
    title: "Calculadora de requisitos de material personalizado",
    description:
      "Cree múltiples etapas, introduzca el costo de material por objetivo y cuenta de destino, y luego compare el resultado con su inventario actual.",
    nonOfficial:
      "Cada nombre, cantidad y resultado es introducido por usted y calculado en este navegador. Nada aquí es datos oficiales de material AION2, una tasa de caída, una tasa de éxito o una recomendación. Verifica los valores contra tu versión actual del juego.",
    localOnly:
      "Los planes permanecen en este navegador en este dispositivo. Los enlaces de compartir usan el fragmento URL y no suben su plan a KINA.",
    templateLegend: "Elija una plantilla inicial",
    templateHint: "Una plantilla reemplaza el plan que se está editando actualmente.",
    useTemplate: (name) => `Use “${name}”`,
    selectedTemplate: "Plantilla actual",
    planTitleLabel: "Nombre del plan",
    planTitleHint: "Una etiqueta para su propia referencia; no afecta el cálculo.",
    sourceLabel: "Salvo el estado",
    sourceSession: "Período de sesiones actual únicamente",
    sourceLocal: "Guardado en este dispositivo",
    sourceShared: "Copia de enlace compartido",
    sourceLoading: "Leyendo el plan local",
    sharedWarning:
      "Estás editando una copia de un enlace compartido. Su plan local existente no será sobrescrito hasta que elija Guardar copia.",
    save: "Guardar en este dispositivo",
    saveCopy: "Guardar la copia",
    share: "Plan de acción",
    copyShortage: "Lista de escasez de copias",
    reset: "Despejado y reajustado",
    materialsLegend: "Materiales e inventario",
    materialsHint: "Cada material se calcula por separado. Los nombres y el inventario son editables.",
    addMaterial: "Añadir material",
    emptyMaterials: "Todavía no hay materiales. Agregue el primer material que desee rastrear.",
    materialName: "Nombre del material",
    inventory: "Inventario actual",
    removeMaterial: (name) => `Quitar material “${name}”`,
    newMaterialName: (index) => `Material personalizado ${index}`,
    stagesLegend: "Gastos de las etapas y los objetivos",
    stagesHint:
      "Cada etapa tiene un recuento de destino y el costo de material necesario para un objetivo.",
    addStage: "Agregar etapa",
    emptyStages: "Todavía no hay etapas. Agregue una etapa para introducir sus costos per-objetivo.",
    stageName: "Nombre de la escena",
    targetCount: "Conteo de objetivos",
    targetCountHint: "¿Cuántas veces para completar esta etapa",
    costsTitle: "Costo de material por objetivo",
    costsHint: "Entra 0 cuando esta etapa no use material.",
    costFor: (material) => `${material}: requerido por objetivo`,
    removeStage: (name) => `Quitar el escenario “${name}”`,
    newStageName: (index) => `Etapa personalizada ${index}`,
    unnamedMaterial: "Material sin nombre",
    unnamedStage: "Etapa no anotada",
    summaryKicker: "RESUMEN DE LA VIVIDA",
    summaryTitle: "Resumen de las necesidades",
    readyTypes: "Tipos de material listos",
    shortageTypes: "Tipos de material corto",
    targetedTypes: "Tipos de material requeridos",
    configuredStages: "Estadios configurados",
    noTargets: "Agregue materiales, etapas y un recuento de destino por encima de 0 para comenzar a calcular.",
    allReady: "Cada tipo de material actualmente requerido está listo.",
    comparisonWarning:
      "A diferencia de las unidades materiales no pueden ser significativamente agregadas juntas, por lo que no se muestra un porcentaje total o total de unidad combinado. El progreso se calcula dentro de cada material solamente.",
    resultRequired: "Necesidad",
    resultInventory: "Inventario",
    resultShortage: "Shortage",
    resultSurplus: "Superávit",
    resultReady: "Listo",
    resultNotTargeted: "No se requiere",
    materialProgress: (name, percent) => `${name} es ${percent}% cubierto`,
    saved: "Plan guardado en este dispositivo.",
    savedCopy: "La copia del plan compartido se guarda ahora en este dispositivo y reemplaza el plan local anterior.",
    storageError: "Este navegador bloqueó el almacenamiento local. Aún puedes editarlo durante esta sesión.",
    invalidStored:
      "El plan salvado es inválido. Se muestra un plan en blanco, y el valor almacenado original no fue sobrescrito.",
    invalidShared:
      "El plan compartido es inválido o utiliza una versión sin soporte, por lo que su contenido no se carga.",
    invalidPlan:
      "Completar todos los nombres requeridos y comprobar las cantidades. Este plan no puede ser calculado, salvado o compartido actualmente.",
    quantityError: `Las cantidades deben ser números enteros de 0 a ${MAX_QUANTITY.toLocaleString("es-ES")}.`,
    limitError: "Este plan ha alcanzado el límite de entrada de material, etapa o costo.",
    shareOpened: "La hoja de acción del sistema se abrió.",
    linkCopied: "El enlace de la parte del plan copiado.",
    copiedShortage: "La lista de la escasez copiada.",
    copyFailed: "El navegador no pudo copiar automáticamente. Compruebe el permiso de portapapeles e inténtelo de nuevo.",
    nothingToCopy: "No hay escasez de material que copiar.",
    resetDone: "El plan fue aclarado y devuelto a la plantilla personalizada en blanco.",
    confirmTitle: "¿Despejar todo el plan?",
    confirmBody:
      "Esto elimina los materiales, etapas, costos e inventarios guardados en este dispositivo y regresa a la plantilla en blanco. No puede ser deshecho.",
    cancel: "Cancelar",
    confirmReset: "Plan claro",
    closeDialog: "Cerrar confirmación",
    shortageListTitle: "Lista de escasez de materiales (datos AION2 definidos por el usuario)",
  },
  "ja": {
    kicker: "ユーザー定義プランナー",
    title: "カスタム材料必要量計算機",
    description:
      "複数の段階を作成し、目標1回あたりの材料数と目標回数を入力して、現在の所持数と比較します。",
    nonOfficial:
      "名前、数量、計算結果はすべてユーザーが入力した内容です。AION2公式の材料データ、ドロップ率、成功率、推奨情報ではありません。現在のゲームバージョンで必ず確認してください。",
    localOnly:
      "プランはこの端末のブラウザ内だけに保存されます。共有リンクはURLフラグメントを使用し、プランをKINAへ送信しません。",
    templateLegend: "開始テンプレートを選択",
    templateHint: "テンプレートを選ぶと、編集中のプランが置き換わります。",
    useTemplate: (name) => `「${name}」を使用`,
    selectedTemplate: "現在のテンプレート",
    planTitleLabel: "プラン名",
    planTitleHint: "プランを識別するための名前です。計算結果には影響しません。",
    sourceLabel: "保存状態",
    sourceSession: "現在のセッションのみ",
    sourceLocal: "この端末に保存済み",
    sourceShared: "共有リンクのコピー",
    sourceLoading: "端末内のプランを読み込み中",
    sharedWarning:
      "共有リンクから読み込んだコピーを編集中です。「コピーを保存」を選ぶまで、既存の端末内プランは上書きされません。",
    save: "この端末に保存",
    saveCopy: "コピーを保存",
    share: "プランを共有",
    copyShortage: "不足リストをコピー",
    reset: "消去してリセット",
    materialsLegend: "材料と所持数",
    materialsHint: "材料ごとに個別計算します。名前と所持数は編集できます。",
    addMaterial: "材料を追加",
    emptyMaterials: "材料がありません。追跡したい材料を追加してください。",
    materialName: "材料名",
    inventory: "現在の所持数",
    removeMaterial: (name) => `材料「${name}」を削除`,
    newMaterialName: (index) => `カスタム材料${index}`,
    stagesLegend: "段階と目標1回あたりの材料数",
    stagesHint:
      "各段階に目標回数と、目標1回に必要な材料数を設定します。",
    addStage: "段階を追加",
    emptyStages: "段階がありません。段階を追加して、目標1回あたりの材料数を入力してください。",
    stageName: "段階名",
    targetCount: "目標回数",
    targetCountHint: "この段階を完了する回数",
    costsTitle: "目標1回あたりの材料数",
    costsHint: "この段階で使わない材料には0を入力してください。",
    costFor: (material) => `${material}：目標1回あたりの必要数`,
    removeStage: (name) => `段階「${name}」を削除`,
    newStageName: (index) => `カスタム段階${index}`,
    unnamedMaterial: "名前のない材料",
    unnamedStage: "名前のない段階",
    summaryKicker: "リアルタイム集計",
    summaryTitle: "必要量の集計",
    readyTypes: "準備済みの材料種類",
    shortageTypes: "不足している材料種類",
    targetedTypes: "必要な材料種類",
    configuredStages: "設定済みの段階",
    noTargets: "材料と段階を追加し、目標回数を1以上にすると計算を開始します。",
    allReady: "現在必要な材料はすべて準備できています。",
    comparisonWarning:
      "異なる材料の単位は合算できないため、合計数量や全体割合は表示しません。進捗率は材料ごとに計算します。",
    resultRequired: "必要数",
    resultInventory: "所持数",
    resultShortage: "不足",
    resultSurplus: "余り",
    resultReady: "準備済み",
    resultNotTargeted: "必要量なし",
    materialProgress: (name, percent) => `${name}は${percent}％準備済み`,
    saved: "プランをこの端末に保存しました。",
    savedCopy: "共有プランのコピーをこの端末に保存し、以前の端末内プランを置き換えました。",
    storageError: "ブラウザで端末内保存がブロックされています。このセッション中は引き続き編集できます。",
    invalidStored:
      "保存済みプランの形式が正しくありません。空のプランを表示し、元の保存データは上書きしていません。",
    invalidShared:
      "共有プランが無効、または未対応のバージョンのため読み込みませんでした。",
    invalidPlan:
      "必要な名前をすべて入力し、数量を確認してください。現在のプランは計算、保存、共有できません。",
    quantityError: `数量は0から${MAX_QUANTITY.toLocaleString("ja-JP")}までの整数で入力してください。`,
    limitError: "このバージョンで対応する材料、段階、材料数の上限に達しました。",
    shareOpened: "端末の共有画面を開きました。",
    linkCopied: "プランの共有リンクをコピーしました。",
    copiedShortage: "不足リストをコピーしました。",
    copyFailed: "自動コピーできませんでした。クリップボードの権限を確認して、もう一度お試しください。",
    nothingToCopy: "コピーする材料不足はありません。",
    resetDone: "プランを消去し、空のカスタムテンプレートへ戻しました。",
    confirmTitle: "プラン全体を消去しますか？",
    confirmBody:
      "この端末に保存した材料、段階、必要数、所持数を削除して空のテンプレートへ戻します。この操作は元に戻せません。",
    cancel: "キャンセル",
    confirmReset: "プランを消去",
    closeDialog: "確認画面を閉じる",
    shortageListTitle: "材料不足リスト（ユーザー入力・AION2公式データではありません）",
  },
  "pt-br": {
    kicker: "PLANEJADOR PERSONALIZADO",
    title: "Calculadora de requisitos de material personalizado",
    description:
      "Crie várias etapas, digite o custo do material por alvo e a contagem do alvo, e depois compare o resultado com o seu inventário atual.",
    nonOfficial:
      "Todos os nomes, quantidades e resultados são informados por você e calculados neste navegador. Nada aqui representa dados oficiais de materiais do AION2, taxas de obtenção, taxas de sucesso ou recomendações. Confira os valores na versão atual do jogo.",
    localOnly:
      "Os planos ficam apenas no navegador deste dispositivo. Os links compartilhados usam o fragmento da URL e não enviam seu plano para a KINA.",
    templateLegend: "Escolha um modelo inicial",
    templateHint: "Um modelo substitui o plano atualmente sendo editado.",
    useTemplate: (name) => `Usar “${name}”`,
    selectedTemplate: "Modelo atual",
    planTitleLabel: "Nome do plano",
    planTitleHint: "Um rótulo para a sua própria referência; não afeta o cálculo.",
    sourceLabel: "Estado de salvamento",
    sourceSession: "Somente nesta sessão",
    sourceLocal: "Salvo neste dispositivo",
    sourceShared: "Cópia de link compartilhado",
    sourceLoading: "Carregando o plano local",
    sharedWarning:
      "Você está editando uma cópia de um link compartilhado. O seu plano local existente não será substituído até que você escolha Salvar cópia.",
    save: "Salvar neste dispositivo",
    saveCopy: "Salvar cópia",
    share: "Compartilhar plano",
    copyShortage: "Copiar lista de materiais faltantes",
    reset: "Limpar e reiniciar",
    materialsLegend: "Materiais e inventário",
    materialsHint: "Cada material é calculado separadamente. Nomes e inventário são editáveis.",
    addMaterial: "Adicionar material",
    emptyMaterials: "Ainda não há material. Adicione o primeiro material que você deseja rastrear.",
    materialName: "Nome do material",
    inventory: "Estoque atual",
    removeMaterial: (name) => `Remover o material “${name}”`,
    newMaterialName: (index) => `Material personalizado ${index}`,
    stagesLegend: "Etapas e materiais por objetivo",
    stagesHint:
      "Cada etapa tem uma contagem de alvos e o custo material necessário para um alvo.",
    addStage: "Adicionar etapa",
    emptyStages: "Ainda não há etapas. Adicione uma etapa para informar os materiais por objetivo.",
    stageName: "Nome da etapa",
    targetCount: "Quantidade do objetivo",
    targetCountHint: "Quantas vezes esta etapa deve ser concluída",
    costsTitle: "Material necessário por objetivo",
    costsHint: "Digite 0 quando esta fase não usar um material.",
    costFor: (material) => `${material}: requerido por alvo`,
    removeStage: (name) => `Remover a etapa “${name}”`,
    newStageName: (index) => `Etapa personalizada ${index}`,
    unnamedMaterial: "Material não identificado",
    unnamedStage: "Etapa sem nome",
    summaryKicker: "RESUMO EM TEMPO REAL",
    summaryTitle: "Resumo dos requisitos",
    readyTypes: "Tipos de materiais prontos",
    shortageTypes: "Tipos de materiais faltantes",
    targetedTypes: "Tipos de materiais necessários",
    configuredStages: "Etapas configuradas",
    noTargets: "Adicione materiais, estágios e uma contagem de alvo acima de 0 para começar a calcular.",
    allReady: "Todo tipo de material atualmente necessário está pronto.",
    comparisonWarning:
      "Unidades de materiais diferentes não podem ser somadas de forma útil; por isso, não exibimos um total combinado nem uma porcentagem geral. O progresso é calculado separadamente para cada material.",
    resultRequired: "Necessário",
    resultInventory: "Inventário",
    resultShortage: "Faltante",
    resultSurplus: "Excedente",
    resultReady: "Pronto",
    resultNotTargeted: "Não é necessário",
    materialProgress: (name, percent) => `${name}: ${percent}% disponível`,
    saved: "Plano salvo neste dispositivo.",
    savedCopy: "A cópia do plano compartilhado agora é salva neste dispositivo e substitui o plano local anterior.",
    storageError: "Este navegador bloqueou o armazenamento local. Você ainda pode editar durante esta sessão.",
    invalidStored:
      "O plano salvo é inválido. Um plano em branco é mostrado, e o valor original armazenado não foi substituído.",
    invalidShared:
      "O plano compartilhado é inválido ou usa uma versão não suportada, então seu conteúdo não foi carregado.",
    invalidPlan:
      "Preencha todos os nomes necessários e verifique as quantidades. Este plano não pode ser calculado, salvo ou compartilhado atualmente.",
    quantityError: `Quantidades devem ser números inteiros de 0 a ${MAX_QUANTITY.toLocaleString("pt-BR")}.`,
    limitError: "Este plano atingiu o limite de materiais, etapas ou campos de quantidade suportados.",
    shareOpened: "A janela de compartilhamento do sistema foi aberta.",
    linkCopied: "Link de compartilhamento do plano copiado.",
    copiedShortage: "Lista de materiais faltantes copiada.",
    copyFailed: "O navegador não conseguiu copiar automaticamente. Verifique a permissão da área de transferência e tente novamente.",
    nothingToCopy: "Não há materiais faltantes para copiar.",
    resetDone: "O plano foi limpo e voltou ao modelo personalizado em branco.",
    confirmTitle: "Limpar o plano todo?",
    confirmBody:
      "Isso exclui os materiais, estágios, custos e inventário salvos neste dispositivo e retorna ao modelo em branco. Não pode ser desfeito.",
    cancel: "Cancelar",
    confirmReset: "Limpar plano",
    closeDialog: "Fechar a confirmação",
    shortageListTitle: "Lista de escassez de materiais (dados AION2 definidos pelo utilizador, não oficiais)",
  },
  "ru": {
    kicker: "ПОЛЬЗОВАТЕЛЬСКИЙ ПЛАНИРОВЩИК",
    title: "Калькулятор пользовательского плана материалов",
    description:
      "Создайте несколько этапов, укажите материалы на одну цель и количество целей, затем сравните результат с текущими запасами.",
    nonOfficial:
      "Все названия, количества и результаты вводятся вами и рассчитываются в браузере. Это не официальные данные AION2 о материалах, шансах получения, вероятности успеха или рекомендациях. Сверяйте значения с текущей версией игры.",
    localOnly:
      "Планы остаются в этом браузере на этом устройстве. Ссылки для обмена используют фрагмент URL и не загружают ваш план в KINA.",
    templateLegend: "Выберите стартовый шаблон",
    templateHint: "Шаблон заменяет план, который в настоящее время редактируется.",
    useTemplate: (name) => `Использование «${name}»`,
    selectedTemplate: "Текущий шаблон",
    planTitleLabel: "Название плана",
    planTitleHint: "Ярлык для вашей собственной ссылки; это не влияет на расчет.",
    sourceLabel: "Состояние сохранения",
    sourceSession: "Только текущий сеанс",
    sourceLocal: "Сохранено на этом устройстве",
    sourceShared: "Копия из общей ссылки",
    sourceLoading: "Загрузка локального плана",
    sharedWarning:
      "Вы редактируете копию из общей ссылки. Ваш существующий локальный план не будет перезаписан, пока вы не выберете Сохранить копию.",
    save: "Сохранить на этом устройстве",
    saveCopy: "Сохранить копию",
    share: "Поделиться планом",
    copyShortage: "Копировать список недостающих материалов",
    reset: "Очистить и сбросить",
    materialsLegend: "Материалы и инвентарь",
    materialsHint: "Каждый материал рассчитывается отдельно. Имена и инвентарь можно редактировать.",
    addMaterial: "Добавить материал",
    emptyMaterials: "Материалов пока нет. Добавьте первый материал, который вы хотите отследить.",
    materialName: "Название материала",
    inventory: "Текущий запас",
    removeMaterial: (name) => `Удалить материал «${name}»`,
    newMaterialName: (index) => `Пользовательский материал ${index}`,
    stagesLegend: "Этапы и материалы на одну цель",
    stagesHint:
      "Для каждого этапа задаются количество целей и материалы, необходимые для одной цели.",
    addStage: "Добавить этап",
    emptyStages: "Этапов пока нет. Добавьте этап и укажите материалы на одну цель.",
    stageName: "Название этапа",
    targetCount: "Количество целей",
    targetCountHint: "Сколько раз нужно пройти этот этап",
    costsTitle: "Материалы на одну цель",
    costsHint: "Введите 0, если на этом этапе не используется материал.",
    costFor: (material) => `${material}: требуется для каждой цели`,
    removeStage: (name) => `Удалить этап «${name}»`,
    newStageName: (index) => `Пользовательский этап ${index}`,
    unnamedMaterial: "Неназванный материал",
    unnamedStage: "Этап без названия",
    summaryKicker: "РАСЧЕТ В РЕАЛЬНОМ ВРЕМЕНИ",
    summaryTitle: "Сводка потребностей",
    readyTypes: "Готовые типы материалов",
    shortageTypes: "Типы недостающих материалов",
    targetedTypes: "Необходимые типы материалов",
    configuredStages: "Настроенные этапы",
    noTargets: "Добавьте материалы, этапы и целевое число выше 0, чтобы начать вычисление.",
    allReady: "Все необходимые на данный момент материалы готовы.",
    comparisonWarning:
      "Единицы разных материалов нельзя корректно складывать, поэтому общий итог и общий процент не отображаются. Прогресс рассчитывается отдельно для каждого материала.",
    resultRequired: "Требуется",
    resultInventory: "В наличии",
    resultShortage: "Нехватка",
    resultSurplus: "Излишек",
    resultReady: "Готово",
    resultNotTargeted: "Нет требований",
    materialProgress: (name, percent) => `${name} покрыт ${percent}%`,
    saved: "План сохранен на этом устройстве.",
    savedCopy: "Копия общего плана теперь сохраняется на этом устройстве и заменяет предыдущий локальный план.",
    storageError: "Этот браузер заблокировал локальное хранилище. Вы можете редактировать в течение этого сеанса.",
    invalidStored:
      "Сохраненный план поврежден. Показан пустой план, а исходные сохраненные данные не перезаписаны.",
    invalidShared:
      "Общий план недействителен или использует неподдерживаемую версию, поэтому его содержимое не было загружено.",
    invalidPlan:
      "Заполните все необходимые имена и проверьте их количество. В настоящее время этот план не может быть рассчитан, сохранен или распространен.",
    quantityError: `Количества должны быть целыми числами от 0 до ${MAX_QUANTITY.toLocaleString("ru-RU")}.`,
    limitError: "Достигнут поддерживаемый предел материалов, этапов или полей количества.",
    shareOpened: "Открылся лист системного обмена.",
    linkCopied: "Ссылка на план скопирована.",
    copiedShortage: "Список недостающих материалов скопирован.",
    copyFailed: "Браузер не может копировать автоматически. Проверьте разрешение буфера обмена и попробуйте еще раз.",
    nothingToCopy: "Нет недостающих материалов для копирования.",
    resetDone: "План был очищен и возвращен к пустому шаблону.",
    confirmTitle: "Очистить весь план?",
    confirmBody:
      "Это удаляет материалы, этапы, затраты и инвентарь, сохраненные на этом устройстве, и возвращается к пустому шаблону. Его нельзя отменить.",
    cancel: "Отмена",
    confirmReset: "Очистить план",
    closeDialog: "Закрыть подтверждение",
    shortageListTitle: "Список дефицита материалов (определяемый пользователем, а не официальные данные AION2)",
  },
  ko: {
    kicker: "USER-DEFINED PLANNER",
    title: "사용자 재료 필요량 계산기",
    description:
      "여러 단계를 만들고 목표 1회당 재료 비용과 목표 횟수를 입력한 뒤 현재 보유량과 바로 비교합니다.",
    nonOfficial:
      "모든 이름, 수량과 결과는 사용자가 입력하고 이 브라우저에서 계산합니다. AION2 공식 재료 정보, 획득 확률, 성공 확률 또는 추천이 아닙니다. 현재 게임 버전에서 직접 확인해 주세요.",
    localOnly:
      "계획은 이 기기의 브라우저에만 저장됩니다. 공유 링크는 URL 조각을 사용하며 KINA로 계획을 업로드하지 않습니다.",
    templateLegend: "시작 템플릿 선택",
    templateHint: "템플릿을 선택하면 현재 편집 중인 계획을 대체합니다.",
    useTemplate: (name) => `“${name}” 사용`,
    selectedTemplate: "현재 템플릿",
    planTitleLabel: "계획 이름",
    planTitleHint: "사용자가 계획을 구분하는 이름이며 계산에는 영향을 주지 않습니다.",
    sourceLabel: "저장 상태",
    sourceSession: "현재 세션에서만 사용",
    sourceLocal: "이 기기에 저장됨",
    sourceShared: "공유 링크 사본",
    sourceLoading: "로컬 계획 불러오는 중",
    sharedWarning:
      "공유 링크에서 가져온 사본을 편집하고 있습니다. ‘사본 저장’을 누르기 전에는 기존 로컬 계획을 덮어쓰지 않습니다.",
    save: "이 기기에 저장",
    saveCopy: "사본 저장",
    share: "계획 공유",
    copyShortage: "부족 목록 복사",
    reset: "지우고 초기화",
    materialsLegend: "재료와 보유량",
    materialsHint: "각 재료는 따로 계산합니다. 이름과 현재 보유량을 편집할 수 있습니다.",
    addMaterial: "재료 추가",
    emptyMaterials: "아직 재료가 없습니다. 추적할 첫 재료를 추가하세요.",
    materialName: "재료 이름",
    inventory: "현재 보유량",
    removeMaterial: (name) => `재료 “${name}” 삭제`,
    newMaterialName: (index) => `사용자 재료 ${index}`,
    stagesLegend: "단계와 목표 1회당 비용",
    stagesHint: "각 단계에 목표 횟수와 목표 1회에 필요한 재료를 설정합니다.",
    addStage: "단계 추가",
    emptyStages: "아직 단계가 없습니다. 단계를 추가해 1회당 비용을 입력하세요.",
    stageName: "단계 이름",
    targetCount: "목표 횟수",
    targetCountHint: "이 단계를 완료할 횟수",
    costsTitle: "목표 1회당 재료 비용",
    costsHint: "이 단계에서 쓰지 않는 재료는 0을 입력하세요.",
    costFor: (material) => `${material}: 목표 1회당 필요량`,
    removeStage: (name) => `단계 “${name}” 삭제`,
    newStageName: (index) => `사용자 단계 ${index}`,
    unnamedMaterial: "이름 없는 재료",
    unnamedStage: "이름 없는 단계",
    summaryKicker: "LIVE SUMMARY",
    summaryTitle: "필요량 요약",
    readyTypes: "준비된 재료 종류",
    shortageTypes: "부족한 재료 종류",
    targetedTypes: "필요한 재료 종류",
    configuredStages: "설정한 단계",
    noTargets: "재료와 단계를 추가하고 목표 횟수를 1 이상 입력하면 계산을 시작합니다.",
    allReady: "현재 필요한 모든 재료 종류가 준비되었습니다.",
    comparisonWarning:
      "서로 다른 재료의 단위는 직접 합산해 비교할 수 없으므로 통합 수량이나 전체 퍼센트를 표시하지 않습니다. 진행률은 각 재료 안에서만 계산합니다.",
    resultRequired: "필요",
    resultInventory: "보유",
    resultShortage: "부족",
    resultSurplus: "여유",
    resultReady: "준비 완료",
    resultNotTargeted: "필요량 없음",
    materialProgress: (name, percent) => `${name} ${percent}% 준비`,
    saved: "이 기기에 계획을 저장했습니다.",
    savedCopy: "공유 계획 사본을 이 기기에 저장했으며 이전 로컬 계획을 대체했습니다.",
    storageError: "브라우저가 로컬 저장을 차단했습니다. 현재 세션에서는 계속 편집할 수 있습니다.",
    invalidStored:
      "저장된 계획이 올바르지 않습니다. 빈 계획을 표시하며 기존 저장 값은 덮어쓰지 않았습니다.",
    invalidShared:
      "공유 계획이 올바르지 않거나 지원하지 않는 버전이어서 내용을 불러오지 않았습니다.",
    invalidPlan:
      "필수 이름을 모두 입력하고 수량을 확인하세요. 현재 계획은 계산, 저장 또는 공유할 수 없습니다.",
    quantityError: `수량은 0부터 ${MAX_QUANTITY.toLocaleString("en-US")}까지의 정수여야 합니다.`,
    limitError: "이 버전에서 지원하는 재료, 단계 또는 비용 항목 한도에 도달했습니다.",
    shareOpened: "시스템 공유 창을 열었습니다.",
    linkCopied: "계획 공유 링크를 복사했습니다.",
    copiedShortage: "부족 목록을 복사했습니다.",
    copyFailed: "브라우저가 자동 복사를 허용하지 않았습니다. 클립보드 권한을 확인해 주세요.",
    nothingToCopy: "복사할 재료 부족분이 없습니다.",
    resetDone: "계획을 지우고 빈 사용자 계획으로 초기화했습니다.",
    confirmTitle: "전체 계획을 지울까요?",
    confirmBody:
      "이 기기에 저장된 재료, 단계, 비용과 보유량을 삭제하고 빈 템플릿으로 돌아갑니다. 되돌릴 수 없습니다.",
    cancel: "취소",
    confirmReset: "계획 지우기",
    closeDialog: "확인 창 닫기",
    shortageListTitle: "재료 부족 목록(사용자 입력, AION2 공식 자료 아님)",
  },
};

let idSequence = 0;

function nextStableId(prefix: "material" | "stage", existingIds: ReadonlySet<string>) {
  let candidate = "";
  do {
    idSequence += 1;
    candidate = `${prefix}-${Date.now().toString(36)}-${idSequence.toString(36)}`;
  } while (existingIds.has(candidate));
  return candidate;
}

function pushAnalytics(event: string, payload: Record<string, unknown> = {}) {
  trackEvent(event, {
    tool_name: "material_calculator",
    ...payload,
  });
}

function planWithLocale(state: MaterialPlanState, locale: SiteLocale) {
  return createMaterialPlanState({
    locale,
    title: state.title,
    materials: state.materials,
    stages: state.stages,
    inventory: state.inventory,
  });
}

function hashContainsPlan(hash: string) {
  if (!hash) return false;
  return new URLSearchParams(hash.replace(/^#/u, "")).has(
    MATERIAL_PLAN_SHARE_KEY,
  );
}

function removePlanHash() {
  if (typeof window === "undefined" || !hashContainsPlan(window.location.hash)) {
    return;
  }
  const url = new URL(window.location.href);
  const parameters = new URLSearchParams(url.hash.replace(/^#/u, ""));
  parameters.delete(MATERIAL_PLAN_SHARE_KEY);
  const remaining = parameters.toString();
  url.hash = remaining ? `#${remaining}` : "";
  window.history.replaceState(window.history.state, "", url);
}

function numberFromInput(value: string) {
  if (value.trim() === "") return 0;
  const quantity = Number(value);
  return Number.isSafeInteger(quantity) &&
    quantity >= 0 &&
    quantity <= MAX_QUANTITY
    ? quantity
    : null;
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard copy was rejected");
}

function sourceText(
  text: MaterialCalculatorCopy,
  origin: PlanOrigin,
  hydrated: boolean,
) {
  if (!hydrated) return text.sourceLoading;
  if (origin === "shared") return text.sourceShared;
  if (origin === "local") return text.sourceLocal;
  return text.sourceSession;
}

export function MaterialCalculator({ locale }: { locale: SiteLocale }) {
  const text = materialCalculatorUiCopy[locale];
  const templates = useMemo(() => getMaterialPlanTemplates(locale), [locale]);
  const instanceId = useId();
  const [plan, setPlan] = useState<MaterialPlanState>(
    () => createMaterialPlanTemplate("blank", locale).state,
  );
  const [origin, setOrigin] = useState<PlanOrigin>("session");
  const [activeTemplate, setActiveTemplate] =
    useState<MaterialPlanTemplateKind | null>("blank");
  const [hydrated, setHydrated] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const startedRef = useRef(false);
  const pendingFocusRef = useRef<string | null>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const calculationResult = useMemo(() => {
    try {
      return { calculation: calculateMaterialPlan(plan), valid: true as const };
    } catch {
      return { calculation: null, valid: false as const };
    }
  }, [plan]);

  const calculation = calculationResult.calculation;
  const targetedMaterials =
    calculation?.materials.filter((material) => material.hasTarget) ?? [];
  const shortageMaterials = targetedMaterials.filter(
    (material) => material.shortage > 0,
  );
  const readyMaterials = targetedMaterials.filter(
    (material) => material.isComplete,
  );
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(siteLocaleConfig[locale].code),
    [locale],
  );

  function markStarted(entryAction: string) {
    if (startedRef.current) return;
    startedRef.current = true;
    pushAnalytics("material_calculator_start", {
      entry_action: entryAction,
    });
  }

  function persistPlan(nextPlan: MaterialPlanState, announce = false) {
    try {
      calculateMaterialPlan(nextPlan);
      const serialized = serializeMaterialPlanState(nextPlan);
      window.localStorage.setItem(STORAGE_KEY, serialized);
      setStorageBlocked(false);
      setOrigin("local");
      if (announce) {
        setStatus({
          kind: "success",
          text: origin === "shared" ? text.savedCopy : text.saved,
        });
      }
      return true;
    } catch (error) {
      if (
        error instanceof DOMException ||
        (error instanceof Error &&
          /storage|quota|security|denied/iu.test(error.message))
      ) {
        setStorageBlocked(true);
        setStatus({ kind: "error", text: text.storageError });
      } else {
        setStatus({ kind: "error", text: text.invalidPlan });
      }
      return false;
    }
  }

  function commitPlan(nextPlan: MaterialPlanState, entryAction = "edit") {
    markStarted(entryAction);
    setPlan(nextPlan);
    if (entryAction !== "template") setActiveTemplate(null);
    if (origin === "shared") {
      setStatus({ kind: "info", text: text.sharedWarning });
      return;
    }
    removePlanHash();
    persistPlan(nextPlan);
  }

  function setQuantityError() {
    setStatus({ kind: "error", text: text.quantityError });
  }

  useEffect(() => {
    let initialStatus: Status = null;
    let initialPlan: MaterialPlanState | null = null;
    let initialOrigin: PlanOrigin = "session";
    let initialStorageBlocked = false;
    let sharedWasLoaded = false;
    let disposed = false;

    if (hashContainsPlan(window.location.hash)) {
      const parsed = parseMaterialPlanState(window.location.hash);
      if (parsed.ok) {
        try {
          initialPlan = planWithLocale(parsed.state, locale);
          initialOrigin = "shared";
          sharedWasLoaded = true;
          initialStatus = { kind: "info", text: text.sharedWarning };
        } catch {
          initialStatus = { kind: "error", text: text.invalidShared };
        }
      } else {
        initialStatus = { kind: "error", text: text.invalidShared };
      }
    }

    if (!sharedWasLoaded) {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = parseMaterialPlanState(stored);
          if (parsed.ok) {
            initialPlan = planWithLocale(parsed.state, locale);
            initialOrigin = "local";
          } else if (!initialStatus) {
            initialStatus = { kind: "error", text: text.invalidStored };
          }
        }
      } catch {
        initialStorageBlocked = true;
        if (!initialStatus) {
          initialStatus = { kind: "error", text: text.storageError };
        }
      }
    }

    queueMicrotask(() => {
      if (disposed) return;
      if (initialPlan) setPlan(initialPlan);
      setOrigin(initialOrigin);
      setActiveTemplate(initialPlan ? null : "blank");
      setStorageBlocked(initialStorageBlocked);
      setStatus(initialStatus);
      setHydrated(true);
    });

    const handleHashChange = () => {
      if (!hashContainsPlan(window.location.hash)) return;
      const parsed = parseMaterialPlanState(window.location.hash);
      if (!parsed.ok) {
        setStatus({ kind: "error", text: text.invalidShared });
        return;
      }
      try {
        setPlan(planWithLocale(parsed.state, locale));
        setOrigin("shared");
        setActiveTemplate(null);
        setStatus({ kind: "info", text: text.sharedWarning });
      } catch {
        setStatus({ kind: "error", text: text.invalidShared });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      disposed = true;
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [locale, text.invalidShared, text.invalidStored, text.sharedWarning, text.storageError]);

  useEffect(() => {
    const focusId = pendingFocusRef.current;
    if (!focusId) return;
    const element = document.getElementById(focusId);
    if (element instanceof HTMLElement) {
      element.focus();
      pendingFocusRef.current = null;
    }
  }, [plan.materials, plan.stages]);

  useEffect(() => {
    if (!confirmOpen) return;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : resetButtonRef.current;
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setConfirmOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const buttons = [
        closeButtonRef.current,
        cancelButtonRef.current,
        confirmButtonRef.current,
      ].filter((button): button is HTMLButtonElement => Boolean(button));
      if (buttons.length === 0) return;
      const currentIndex = buttons.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? buttons.length - 1
          : currentIndex - 1
        : currentIndex >= buttons.length - 1
          ? 0
          : currentIndex + 1;
      event.preventDefault();
      buttons[nextIndex]?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [confirmOpen]);

  function applyTemplate(kind: MaterialPlanTemplateKind) {
    const template = createMaterialPlanTemplate(kind, locale);
    setActiveTemplate(kind);
    markStarted("template");
    setPlan(template.state);
    pushAnalytics("material_calculator_template_select", {
      template_kind: kind,
    });
    if (origin === "shared") {
      setStatus({ kind: "info", text: text.sharedWarning });
      return;
    }
    removePlanHash();
    persistPlan(template.state);
  }

  function addMaterial() {
    if (plan.materials.length >= materialPlanLimits.maxMaterials) {
      setStatus({ kind: "error", text: text.limitError });
      return;
    }
    const id = nextStableId(
      "material",
      new Set(plan.materials.map((material) => material.id)),
    );
    const nextPlan: MaterialPlanState = {
      ...plan,
      materials: [
        ...plan.materials,
        { id, name: text.newMaterialName(plan.materials.length + 1) },
      ],
      inventory: [...plan.inventory, { materialId: id, quantity: 0 }],
    };
    pendingFocusRef.current = `${instanceId}-material-${id}-name`;
    commitPlan(nextPlan, "add_material");
    pushAnalytics("material_calculator_add_material", {
      material_count: nextPlan.materials.length,
    });
  }

  function removeMaterial(materialId: string) {
    const index = plan.materials.findIndex(
      (material) => material.id === materialId,
    );
    const remaining = plan.materials.filter(
      (material) => material.id !== materialId,
    );
    const focusMaterial = remaining[Math.min(index, remaining.length - 1)];
    pendingFocusRef.current = focusMaterial
      ? `${instanceId}-material-${focusMaterial.id}-name`
      : `${instanceId}-add-material`;
    const nextPlan: MaterialPlanState = {
      ...plan,
      materials: remaining,
      inventory: plan.inventory.filter(
        (entry) => entry.materialId !== materialId,
      ),
      stages: plan.stages.map((stage) => ({
        ...stage,
        costs: stage.costs.filter((cost) => cost.materialId !== materialId),
      })),
    };
    commitPlan(nextPlan, "remove_material");
    pushAnalytics("material_calculator_remove_material", {
      material_count: nextPlan.materials.length,
    });
  }

  function updateMaterialName(materialId: string, name: string) {
    commitPlan(
      {
        ...plan,
        materials: plan.materials.map((material) =>
          material.id === materialId ? { ...material, name } : material,
        ),
      },
      "edit_material",
    );
  }

  function updateInventory(materialId: string, rawValue: string) {
    const quantity = numberFromInput(rawValue);
    if (quantity === null) {
      setQuantityError();
      return;
    }
    const hasEntry = plan.inventory.some(
      (entry) => entry.materialId === materialId,
    );
    commitPlan(
      {
        ...plan,
        inventory: hasEntry
          ? plan.inventory.map((entry) =>
              entry.materialId === materialId
                ? { ...entry, quantity }
                : entry,
            )
          : [...plan.inventory, { materialId, quantity }],
      },
      "edit_inventory",
    );
  }

  function addStage() {
    if (plan.stages.length >= materialPlanLimits.maxStages) {
      setStatus({ kind: "error", text: text.limitError });
      return;
    }
    const id = nextStableId(
      "stage",
      new Set(plan.stages.map((stage) => stage.id)),
    );
    const nextPlan: MaterialPlanState = {
      ...plan,
      stages: [
        ...plan.stages,
        {
          id,
          name: text.newStageName(plan.stages.length + 1),
          targetCount: 1,
          costs: [],
        },
      ],
    };
    pendingFocusRef.current = `${instanceId}-stage-${id}-name`;
    commitPlan(nextPlan, "add_stage");
    pushAnalytics("material_calculator_add_stage", {
      stage_count: nextPlan.stages.length,
    });
  }

  function removeStage(stageId: string) {
    const index = plan.stages.findIndex((stage) => stage.id === stageId);
    const remaining = plan.stages.filter((stage) => stage.id !== stageId);
    const focusStage = remaining[Math.min(index, remaining.length - 1)];
    pendingFocusRef.current = focusStage
      ? `${instanceId}-stage-${focusStage.id}-name`
      : `${instanceId}-add-stage`;
    const nextPlan: MaterialPlanState = { ...plan, stages: remaining };
    commitPlan(nextPlan, "remove_stage");
    pushAnalytics("material_calculator_remove_stage", {
      stage_count: nextPlan.stages.length,
    });
  }

  function updateStageName(stageId: string, name: string) {
    commitPlan(
      {
        ...plan,
        stages: plan.stages.map((stage) =>
          stage.id === stageId ? { ...stage, name } : stage,
        ),
      },
      "edit_stage",
    );
  }

  function updateTargetCount(stageId: string, rawValue: string) {
    const targetCount = numberFromInput(rawValue);
    if (targetCount === null) {
      setQuantityError();
      return;
    }
    commitPlan(
      {
        ...plan,
        stages: plan.stages.map((stage) =>
          stage.id === stageId ? { ...stage, targetCount } : stage,
        ),
      },
      "edit_target",
    );
  }

  function updateCost(stageId: string, materialId: string, rawValue: string) {
    const quantity = numberFromInput(rawValue);
    if (quantity === null) {
      setQuantityError();
      return;
    }
    const stage = plan.stages.find((candidate) => candidate.id === stageId);
    if (!stage) return;
    const hasCost = stage.costs.some((cost) => cost.materialId === materialId);
    const totalCostLines = plan.stages.reduce(
      (total, candidate) => total + candidate.costs.length,
      0,
    );
    if (
      quantity > 0 &&
      !hasCost &&
      totalCostLines >= materialPlanLimits.maxTotalCostLines
    ) {
      setStatus({ kind: "error", text: text.limitError });
      return;
    }
    const costs =
      quantity === 0
        ? stage.costs.filter((cost) => cost.materialId !== materialId)
        : hasCost
          ? stage.costs.map((cost) =>
              cost.materialId === materialId ? { ...cost, quantity } : cost,
            )
          : [...stage.costs, { materialId, quantity }];
    commitPlan(
      {
        ...plan,
        stages: plan.stages.map((candidate) =>
          candidate.id === stageId ? { ...candidate, costs } : candidate,
        ),
      },
      "edit_cost",
    );
  }

  function savePlanCopy() {
    markStarted("save");
    if (!persistPlan(plan, true)) return;
    removePlanHash();
    pushAnalytics("material_calculator_save", {
      entry_source: origin,
      material_count: plan.materials.length,
      stage_count: plan.stages.length,
    });
  }

  async function sharePlan() {
    markStarted("share");
    try {
      calculateMaterialPlan(plan);
      const fragment = buildMaterialPlanShareFragment(plan);
      const url = new URL(window.location.href);
      url.hash = fragment;
      window.history.replaceState(window.history.state, "", url);
      if (navigator.share) {
        await navigator.share({
          title: plan.title,
          text: text.nonOfficial,
          url: url.toString(),
        });
        setStatus({ kind: "success", text: text.shareOpened });
        pushAnalytics("material_calculator_share", {
          method: "native",
          material_count: plan.materials.length,
          stage_count: plan.stages.length,
        });
        return;
      }
      await copyText(url.toString());
      setStatus({ kind: "success", text: text.linkCopied });
      pushAnalytics("material_calculator_share", {
        method: "clipboard",
        material_count: plan.materials.length,
        stage_count: plan.stages.length,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus({
        kind: "error",
        text: calculationResult.valid ? text.copyFailed : text.invalidPlan,
      });
    }
  }

  async function copyShortageList() {
    markStarted("copy_shortage");
    if (shortageMaterials.length === 0) {
      setStatus({ kind: "info", text: text.nothingToCopy });
      return;
    }
    const lines = shortageMaterials.map(
      (material) =>
        `${material.name}: ${text.resultShortage} ${formatter.format(material.shortage)} (${text.resultRequired} ${formatter.format(material.required)} · ${text.resultInventory} ${formatter.format(material.inventory)})`,
    );
    try {
      await copyText([text.shortageListTitle, plan.title, "", ...lines].join("\n"));
      setStatus({ kind: "success", text: text.copiedShortage });
      pushAnalytics("material_calculator_copy_shortage", {
        shortage_type_count: shortageMaterials.length,
      });
    } catch {
      setStatus({ kind: "error", text: text.copyFailed });
    }
  }

  function confirmReset() {
    const blank = createMaterialPlanTemplate("blank", locale).state;
    setPlan(blank);
    setActiveTemplate("blank");
    setOrigin("session");
    setConfirmOpen(false);
    removePlanHash();
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setStorageBlocked(false);
      setStatus({ kind: "success", text: text.resetDone });
    } catch {
      setStorageBlocked(true);
      setStatus({ kind: "error", text: text.storageError });
    }
    markStarted("reset");
    pushAnalytics("material_calculator_reset", {
      previous_material_count: plan.materials.length,
      previous_stage_count: plan.stages.length,
    });
  }

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") setConfirmOpen(false);
  }

  return (
    <section className={styles.calculator} aria-labelledby={`${instanceId}-title`}>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>{text.kicker}</p>
          <h2 id={`${instanceId}-title`}>{text.title}</h2>
          <p className={styles.description}>{text.description}</p>
        </div>
        <div className={styles.sourceCard} aria-label={text.sourceLabel}>
          <span>{text.sourceLabel}</span>
          <strong data-origin={origin}>
            {sourceText(text, origin, hydrated)}
          </strong>
        </div>
      </header>

      <div className={styles.disclaimer} role="note">
        <strong>{text.nonOfficial}</strong>
        <span>{text.localOnly}</span>
      </div>

      {origin === "shared" ? (
        <div className={styles.sharedNotice} role="status">
          <p>{text.sharedWarning}</p>
          <button type="button" className={styles.primaryButton} onClick={savePlanCopy}>
            {text.saveCopy}
          </button>
        </div>
      ) : null}

      {storageBlocked ? (
        <p className={styles.storageWarning} role="alert">
          {text.storageError}
        </p>
      ) : null}

      <fieldset className={styles.templatePicker}>
        <legend>{text.templateLegend}</legend>
        <p className={styles.fieldHint}>{text.templateHint}</p>
        <div className={styles.templateGrid}>
          {templates.map((template) => {
            const selected = activeTemplate === template.kind;
            return (
              <button
                type="button"
                key={template.kind}
                className={styles.templateCard}
                aria-pressed={selected}
                onClick={() => applyTemplate(template.kind)}
              >
                <span className={styles.templateCardHeader}>
                  <strong>{template.copy.name}</strong>
                  {selected ? <small>{text.selectedTemplate}</small> : null}
                </span>
                <span>{template.copy.description}</span>
                <em>{template.copy.notice}</em>
                <span className={styles.templateAction}>
                  {text.useTemplate(template.copy.name)}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.planBar}>
        <label htmlFor={`${instanceId}-plan-title`}>
          <span>{text.planTitleLabel}</span>
          <input
            id={`${instanceId}-plan-title`}
            type="text"
            value={plan.title}
            maxLength={materialPlanLimits.maxLabelLength}
            aria-invalid={!plan.title.trim()}
            aria-describedby={`${instanceId}-plan-title-hint`}
            onChange={(event) =>
              commitPlan({ ...plan, title: event.currentTarget.value }, "edit_title")
            }
          />
        </label>
        <p id={`${instanceId}-plan-title-hint`}>{text.planTitleHint}</p>
        <div className={styles.planActions}>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={!calculationResult.valid}
            onClick={savePlanCopy}
          >
            {origin === "shared" ? text.saveCopy : text.save}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={!calculationResult.valid}
            onClick={sharePlan}
          >
            {text.share}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={shortageMaterials.length === 0}
            onClick={copyShortageList}
          >
            {text.copyShortage}
          </button>
          <button
            ref={resetButtonRef}
            type="button"
            className={styles.dangerButton}
            onClick={() => setConfirmOpen(true)}
          >
            {text.reset}
          </button>
        </div>
      </div>

      <p
        className={`${styles.status} ${
          status ? styles[`status_${status.kind}`] : ""
        }`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status?.text ?? " "}
      </p>

      <div className={styles.workspace}>
        <div className={styles.editorColumn}>
          <fieldset className={styles.editorSection}>
            <legend>{text.materialsLegend}</legend>
            <div className={styles.sectionHeader}>
              <p>{text.materialsHint}</p>
              <button
                id={`${instanceId}-add-material`}
                type="button"
                className={styles.addButton}
                disabled={plan.materials.length >= materialPlanLimits.maxMaterials}
                onClick={addMaterial}
              >
                <span aria-hidden="true">＋</span>
                {text.addMaterial}
              </button>
            </div>

            {plan.materials.length === 0 ? (
              <p className={styles.emptyState}>{text.emptyMaterials}</p>
            ) : (
              <div className={styles.materialList}>
                {plan.materials.map((material) => {
                  const inventory =
                    plan.inventory.find(
                      (entry) => entry.materialId === material.id,
                    )?.quantity ?? 0;
                  const displayName =
                    material.name.trim() || text.unnamedMaterial;
                  return (
                    <div className={styles.materialRow} key={material.id}>
                      <label
                        htmlFor={`${instanceId}-material-${material.id}-name`}
                      >
                        <span>{text.materialName}</span>
                        <input
                          id={`${instanceId}-material-${material.id}-name`}
                          type="text"
                          value={material.name}
                          maxLength={materialPlanLimits.maxLabelLength}
                          aria-invalid={!material.name.trim()}
                          onChange={(event) =>
                            updateMaterialName(
                              material.id,
                              event.currentTarget.value,
                            )
                          }
                        />
                      </label>
                      <label
                        htmlFor={`${instanceId}-material-${material.id}-inventory`}
                      >
                        <span>{text.inventory}</span>
                        <input
                          id={`${instanceId}-material-${material.id}-inventory`}
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={MAX_QUANTITY}
                          step={1}
                          value={inventory}
                          onChange={(event) =>
                            updateInventory(
                              material.id,
                              event.currentTarget.value,
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label={text.removeMaterial(displayName)}
                        title={text.removeMaterial(displayName)}
                        onClick={() => removeMaterial(material.id)}
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </fieldset>

          <fieldset className={styles.editorSection}>
            <legend>{text.stagesLegend}</legend>
            <div className={styles.sectionHeader}>
              <p>{text.stagesHint}</p>
              <button
                id={`${instanceId}-add-stage`}
                type="button"
                className={styles.addButton}
                disabled={plan.stages.length >= materialPlanLimits.maxStages}
                onClick={addStage}
              >
                <span aria-hidden="true">＋</span>
                {text.addStage}
              </button>
            </div>

            {plan.stages.length === 0 ? (
              <p className={styles.emptyState}>{text.emptyStages}</p>
            ) : (
              <div className={styles.stageList}>
                {plan.stages.map((stage, stageIndex) => {
                  const displayName = stage.name.trim() || text.unnamedStage;
                  const costHeadingId = `${instanceId}-stage-${stage.id}-cost-heading`;
                  const costHintId = `${instanceId}-stage-${stage.id}-cost-hint`;
                  return (
                    <fieldset className={styles.stageCard} key={stage.id}>
                      <legend>
                        <span>{formatter.format(stageIndex + 1)}</span>
                        {displayName}
                      </legend>
                      <div className={styles.stageHeader}>
                        <label htmlFor={`${instanceId}-stage-${stage.id}-name`}>
                          <span>{text.stageName}</span>
                          <input
                            id={`${instanceId}-stage-${stage.id}-name`}
                            type="text"
                            value={stage.name}
                            maxLength={materialPlanLimits.maxLabelLength}
                            aria-invalid={!stage.name.trim()}
                            onChange={(event) =>
                              updateStageName(
                                stage.id,
                                event.currentTarget.value,
                              )
                            }
                          />
                        </label>
                        <label
                          htmlFor={`${instanceId}-stage-${stage.id}-target`}
                        >
                          <span>{text.targetCount}</span>
                          <input
                            id={`${instanceId}-stage-${stage.id}-target`}
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={MAX_QUANTITY}
                            step={1}
                            value={stage.targetCount}
                            aria-describedby={`${instanceId}-stage-${stage.id}-target-hint`}
                            onChange={(event) =>
                              updateTargetCount(
                                stage.id,
                                event.currentTarget.value,
                              )
                            }
                          />
                          <small
                            id={`${instanceId}-stage-${stage.id}-target-hint`}
                          >
                            {text.targetCountHint}
                          </small>
                        </label>
                        <button
                          type="button"
                          className={styles.iconButton}
                          aria-label={text.removeStage(displayName)}
                          title={text.removeStage(displayName)}
                          onClick={() => removeStage(stage.id)}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>

                      <div
                        className={styles.costSection}
                        role="group"
                        aria-labelledby={costHeadingId}
                        aria-describedby={costHintId}
                      >
                        <h3 id={costHeadingId}>{text.costsTitle}</h3>
                        <p id={costHintId}>{text.costsHint}</p>
                        {plan.materials.length === 0 ? (
                          <p className={styles.inlineEmpty}>
                            {text.emptyMaterials}
                          </p>
                        ) : (
                          <div className={styles.costGrid}>
                            {plan.materials.map((material) => {
                              const quantity =
                                stage.costs.find(
                                  (cost) =>
                                    cost.materialId === material.id,
                                )?.quantity ?? 0;
                              const displayMaterial =
                                material.name.trim() || text.unnamedMaterial;
                              const inputId = `${instanceId}-stage-${stage.id}-cost-${material.id}`;
                              return (
                                <label key={material.id} htmlFor={inputId}>
                                  <span>{text.costFor(displayMaterial)}</span>
                                  <input
                                    id={inputId}
                                    type="number"
                                    inputMode="numeric"
                                    min={0}
                                    max={MAX_QUANTITY}
                                    step={1}
                                    value={quantity}
                                    onChange={(event) =>
                                      updateCost(
                                        stage.id,
                                        material.id,
                                        event.currentTarget.value,
                                      )
                                    }
                                  />
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            )}
          </fieldset>
        </div>

        <aside className={styles.summary} aria-labelledby={`${instanceId}-summary-title`}>
          <p className={styles.kicker}>{text.summaryKicker}</p>
          <h2 id={`${instanceId}-summary-title`}>{text.summaryTitle}</h2>
          <p className={styles.comparisonWarning}>{text.comparisonWarning}</p>

          {calculation ? (
            <>
              <output className={styles.summaryStats} aria-live="polite">
                <span className={styles.summaryStatReady}>
                  <strong>{formatter.format(readyMaterials.length)}</strong>
                  <small>{text.readyTypes}</small>
                </span>
                <span className={styles.summaryStatShort}>
                  <strong>{formatter.format(shortageMaterials.length)}</strong>
                  <small>{text.shortageTypes}</small>
                </span>
                <span>
                  <strong>
                    {formatter.format(calculation.totals.targetedMaterials)}
                  </strong>
                  <small>{text.targetedTypes}</small>
                </span>
                <span>
                  <strong>{formatter.format(plan.stages.length)}</strong>
                  <small>{text.configuredStages}</small>
                </span>
              </output>

              {!calculation.totals.hasTarget ? (
                <p className={styles.summaryEmpty}>{text.noTargets}</p>
              ) : shortageMaterials.length === 0 ? (
                <p className={styles.allReady}>{text.allReady}</p>
              ) : null}

              <div className={styles.resultList}>
                {calculation.materials.map((material) => {
                  const percentage =
                    material.completionRatio === null
                      ? null
                      : Math.max(
                          0,
                          Math.min(
                            100,
                            Math.round(material.completionRatio * 100),
                          ),
                        );
                  return (
                    <article className={styles.resultCard} key={material.materialId}>
                      <header>
                        <h3>{material.name}</h3>
                        <span
                          data-state={
                            !material.hasTarget
                              ? "idle"
                              : material.isComplete
                                ? "ready"
                                : "short"
                          }
                        >
                          {!material.hasTarget
                            ? text.resultNotTargeted
                            : material.isComplete
                              ? text.resultReady
                              : `${text.resultShortage} ${formatter.format(material.shortage)}`}
                        </span>
                      </header>
                      {percentage !== null ? (
                        <div className={styles.progressRow}>
                          <progress
                            max={material.required}
                            value={material.covered}
                            aria-label={text.materialProgress(
                              material.name,
                              percentage,
                            )}
                          >
                            {percentage}%
                          </progress>
                          <span aria-hidden="true">{percentage}%</span>
                        </div>
                      ) : null}
                      <dl>
                        <div>
                          <dt>{text.resultRequired}</dt>
                          <dd>{formatter.format(material.required)}</dd>
                        </div>
                        <div>
                          <dt>{text.resultInventory}</dt>
                          <dd>{formatter.format(material.inventory)}</dd>
                        </div>
                        <div>
                          <dt>{text.resultShortage}</dt>
                          <dd data-tone={material.shortage > 0 ? "short" : undefined}>
                            {formatter.format(material.shortage)}
                          </dd>
                        </div>
                        <div>
                          <dt>{text.resultSurplus}</dt>
                          <dd data-tone={material.surplus > 0 ? "ready" : undefined}>
                            {formatter.format(material.surplus)}
                          </dd>
                        </div>
                      </dl>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <p className={styles.invalidSummary} role="alert">
              {text.invalidPlan}
            </p>
          )}
        </aside>
      </div>

      {confirmOpen ? (
        <div
          className={styles.dialogBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmOpen(false);
          }}
          onKeyDown={handleDialogKeyDown}
        >
          <section
            className={styles.dialog}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`${instanceId}-confirm-title`}
            aria-describedby={`${instanceId}-confirm-description`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.dialogClose}
              aria-label={text.closeDialog}
              onClick={() => setConfirmOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <h2 id={`${instanceId}-confirm-title`}>{text.confirmTitle}</h2>
            <p id={`${instanceId}-confirm-description`}>{text.confirmBody}</p>
            <div className={styles.dialogActions}>
              <button
                ref={cancelButtonRef}
                type="button"
                className={styles.secondaryButton}
                onClick={() => setConfirmOpen(false)}
              >
                {text.cancel}
              </button>
              <button
                ref={confirmButtonRef}
                type="button"
                className={styles.confirmDangerButton}
                onClick={confirmReset}
              >
                {text.confirmReset}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}

export default MaterialCalculator;
