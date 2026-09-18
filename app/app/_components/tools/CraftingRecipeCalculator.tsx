"use client";

import {
  Check,
  ClipboardCopy,
  Coins,
  Layers3,
  PackageSearch,
  RotateCcw,
  X,
} from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  calculateCraftingRecipe,
  craftingCalculationLimits,
  type CraftingRecipeCalculation,
} from "@/app/crafting-calculator";
import type {
  LocalizedCraftingIngredient,
  LocalizedCraftingRecipe,
} from "@/app/crafting-catalog";
import {
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./CraftingRecipeCalculator.module.css";

export const CRAFTING_RECIPE_STORAGE_PREFIX =
  "aion2-kina:crafting-recipe-calculator:v1";

const MAX_VALUE = Math.min(
  craftingCalculationLimits.maxCraftCount,
  craftingCalculationLimits.maxUnitPrice,
);

export type CraftingCalculatorIngredient = LocalizedCraftingIngredient;
export type CraftingCalculatorRecipe = LocalizedCraftingRecipe;

export type CraftingRecipeCalculatorProps = {
  locale: SiteLocale;
  recipe: CraftingCalculatorRecipe;
};

type MaterialMode = "direct" | "base";
type Status = { kind: "success" | "error"; message: string } | null;

type StoredInputs = {
  version: 1;
  inventory: Record<string, string>;
  unitPrices: Record<string, string>;
  craftingFee: string;
};

export type CraftingRecipeCalculatorCopy = {
  calculator: string;
  recipeId: string;
  profession: string;
  mastery: string;
  outputPerCraft: string;
  totalOutput: string;
  unknown: string;
  crafts: string;
  craftsHint: string;
  direct: string;
  directHint: string;
  base: string;
  baseHint: string;
  baseUnavailable: string;
  share: string;
  copied: string;
  copyFailed: string;
  reset: string;
  ingredients: string;
  ingredientsDescription: string;
  item: string;
  perCraft: string;
  required: string;
  owned: string;
  unitPrice: string;
  need: string;
  cost: string;
  ready: string;
  unpriced: string;
  unpricedSummary: (count: number) => string;
  calculationError: string;
  missingDataTitle: string;
  missingDataBody: string;
  savedLocally: string;
  intermediateTitle: string;
  intermediateHint: string;
  intermediateCount: (count: number) => string;
  totalCost: string;
  materialCost: string;
  craftingFeePerCraft: string;
  craftingFeeTotal: string;
  costPerCraft: string;
  costPerOutput: string;
  grandTotal: string;
  currency: string;
  resetTitle: string;
  resetBody: string;
  cancel: string;
  confirmReset: string;
  resetDone: string;
  close: string;
  imageAlt: (name: string) => string;
  level: (level: number) => string;
};

export const craftingRecipeCalculatorCopy: Record<SiteLocale, CraftingRecipeCalculatorCopy> = {
  "zh-hant": {
    calculator: "製作材料計算器",
    recipeId: "配方 ID",
    profession: "製作專業",
    mastery: "熟練度",
    outputPerCraft: "單次產量",
    totalOutput: "預計產量",
    unknown: "資料未標示",
    crafts: "製作次數",
    craftsHint: "材料需求會依製作次數即時更新",
    direct: "直接材料",
    directHint: "依配方第一層材料計算",
    base: "基礎材料",
    baseHint: "展開中間製作後的底層材料",
    baseUnavailable: "此配方尚無可驗證的基礎材料拆解",
    share: "複製分享連結",
    copied: "分享連結已複製；庫存與單價未包含在連結中。",
    copyFailed: "無法複製連結，請從瀏覽器網址列手動複製。",
    reset: "重設輸入",
    ingredients: "材料需求",
    ingredientsDescription: "輸入目前持有量與市場單價，系統只計算尚缺材料的成本。",
    item: "材料",
    perCraft: "每次用量",
    required: "總需求",
    owned: "已持有",
    unitPrice: "單價",
    need: "尚缺",
    cost: "缺口成本",
    ready: "已備齊",
    unpriced: "尚未填寫單價",
    unpricedSummary: (count) => `仍有 ${count} 種缺口材料未填單價，因此總成本暫不顯示。`,
    calculationError: "輸入值過大，無法安全計算。請降低製作次數、庫存或單價。",
    missingDataTitle: "此模式沒有可驗證的材料資料",
    missingDataBody: "本站不會把空白配方顯示成零成本；請切換材料模式或稍後再查。",
    savedLocally: "庫存、單價與手續費只儲存在此裝置。分享連結僅包含配方、材料模式與製作次數。",
    intermediateTitle: "中間製作品",
    intermediateHint: "這些項目用於說明基礎材料的拆解路徑，不會重複加入成本。",
    intermediateCount: (count) => `${count} 個中間項目`,
    totalCost: "成本摘要",
    materialCost: "缺口材料成本",
    craftingFeePerCraft: "每次製作手續費",
    craftingFeeTotal: "手續費合計",
    costPerCraft: "每次製作成本",
    costPerOutput: "每件成品成本",
    grandTotal: "總成本",
    currency: "基納",
    resetTitle: "重設這份配方的輸入？",
    resetBody: "目前庫存、單價、手續費、材料模式與製作次數都會清除。這項操作無法復原。",
    cancel: "取消",
    confirmReset: "確認重設",
    resetDone: "已重設這份配方的本機輸入。",
    close: "關閉確認視窗",
    imageAlt: (name) => `${name} 圖示`,
    level: (level) => `Lv. ${level}`,
  },
  en: {
    calculator: "Crafting material calculator",
    recipeId: "Recipe ID",
    profession: "Profession",
    mastery: "Mastery",
    outputPerCraft: "Output / craft",
    totalOutput: "Planned output",
    unknown: "Not available",
    crafts: "Craft count",
    craftsHint: "Material requirements update with the craft count",
    direct: "Direct materials",
    directHint: "Calculate the first-level recipe ingredients",
    base: "Base materials",
    baseHint: "Expand intermediate crafts into their lowest-level materials",
    baseUnavailable: "No base-material breakdown is available for this recipe",
    share: "Copy share link",
    copied: "Share link copied. Inventory and prices were not included.",
    copyFailed: "The link could not be copied. Copy it from the browser address bar.",
    reset: "Reset inputs",
    ingredients: "Material requirements",
    ingredientsDescription: "Enter what you own and a unit price. Only missing units contribute to cost.",
    item: "Material",
    perCraft: "Per craft",
    required: "Required",
    owned: "Owned",
    unitPrice: "Unit price",
    need: "Need",
    cost: "Shortage cost",
    ready: "Ready",
    unpriced: "Unit price not entered",
    unpricedSummary: (count) =>
      `${count} shortage material entries have no unit price, so the grand total is not shown yet.`,
    calculationError: "The values are too large to calculate safely. Lower the craft count, inventory, or unit price.",
    missingDataTitle: "No material breakdown in this mode",
    missingDataBody: "Try Direct materials or choose another recipe.",
    savedLocally: "Inventory, prices, and fees stay on this device. Shared links contain only the recipe, material mode, and craft count.",
    intermediateTitle: "Intermediate crafts",
    intermediateHint: "These explain the base-material path and are not charged a second time.",
    intermediateCount: (count) => `${count} intermediate items`,
    totalCost: "Cost summary",
    materialCost: "Missing material cost",
    craftingFeePerCraft: "Fee per craft",
    craftingFeeTotal: "Total crafting fee",
    costPerCraft: "Cost per craft",
    costPerOutput: "Cost per output",
    grandTotal: "Grand total",
    currency: "Kina",
    resetTitle: "Reset inputs for this recipe?",
    resetBody: "Inventory, prices, fees, material mode, and craft count will be cleared. This cannot be undone.",
    cancel: "Cancel",
    confirmReset: "Reset now",
    resetDone: "Local inputs for this recipe were reset.",
    close: "Close confirmation",
    imageAlt: (name) => `${name} icon`,
    level: (level) => `Lv. ${level}`,
  },

  "zh-hans": {
    calculator: "制作材料计算器",
    recipeId: "配方 ID",
    profession: "制作专业",
    mastery: "熟练度",
    outputPerCraft: "单次产量",
    totalOutput: "预计产量",
    unknown: "数据未标示",
    crafts: "制作次数",
    craftsHint: "材料需求会依制作次数即时更新",
    direct: "直接材料",
    directHint: "依配方第一层材料计算",
    base: "基础材料",
    baseHint: "展开中间制作后的底层材料",
    baseUnavailable: "此配方尚无可验证的基础材料拆解",
    share: "复制分享链接",
    copied: "分享链接已复制；库存与单价未包含在链接中。",
    copyFailed: "无法复制链接，请从浏览器网址列手动复制。",
    reset: "重设输入",
    ingredients: "材料需求",
    ingredientsDescription: "输入当前持有量与市场单价，系统只计算尚缺材料的成本。",
    item: "材料",
    perCraft: "每次用量",
    required: "总需求",
    owned: "已持有",
    unitPrice: "单价",
    need: "尚缺",
    cost: "缺口成本",
    ready: "已备齐",
    unpriced: "尚未填写单价",
    unpricedSummary: (count) => `仍有 ${count} 种缺口材料未填单价，因此总成本暂不显示。`,
    calculationError: "输入值过大，无法安全计算。请降低制作次数、库存或单价。",
    missingDataTitle: "此模式没有可验证的材料数据",
    missingDataBody: "本站不会把空白配方显示成零成本；请切换材料模式或稍后再查。",
    savedLocally: "库存、单价与手续费只保存在此设备。分享链接仅包含配方、材料模式与制作次数。",
    intermediateTitle: "中间制作品",
    intermediateHint: "这些项目用于说明基础材料的拆解路径，不会重复加入成本。",
    intermediateCount: (count) => `${count} 个中间项目`,
    totalCost: "成本摘要",
    materialCost: "缺口材料成本",
    craftingFeePerCraft: "每次制作手续费",
    craftingFeeTotal: "手续费合计",
    costPerCraft: "每次制作成本",
    costPerOutput: "每件成品成本",
    grandTotal: "总成本",
    currency: "基纳",
    resetTitle: "重设这份配方的输入？",
    resetBody: "当前库存、单价、手续费、材料模式与制作次数都会清除。这项操作无法复原。",
    cancel: "取消",
    confirmReset: "确认重设",
    resetDone: "已重设这份配方的本地输入。",
    close: "关闭确认视窗",
    imageAlt: (name) => `${name} 图标`,
    level: (level) => `Lv. ${level}`,
  },








  "de": {
    calculator: "Rechner für Herstellungsmaterialien",
    recipeId: "Rezept-ID",
    profession: "Beruf",
    mastery: "Fertigkeitsstufe",
    outputPerCraft: "Ertrag pro Herstellung",
    totalOutput: "Geplante Produktion",
    unknown: "Nicht verfügbar",
    crafts: "Herstellungsanzahl",
    craftsHint: "Der Materialbedarf wird mit der Herstellungsanzahl aktualisiert",
    direct: "Direkte Materialien",
    directHint: "Berechnet die Zutaten der ersten Rezeptstufe",
    base: "Grundstoffe",
    baseHint: "Löst herstellbare Zwischenprodukte bis zu den Grundstoffen auf",
    baseUnavailable: "Für dieses Rezept ist keine Aufschlüsselung des Grundmaterials verfügbar",
    share: "Freigabelink kopieren",
    copied: "Freigabelink kopiert. Bestand und Preise sind nicht enthalten.",
    copyFailed: "Der Link konnte nicht kopiert werden. Kopieren Sie ihn aus der Adressleiste des Browsers.",
    reset: "Eingaben zurücksetzen",
    ingredients: "Materialbedarf",
    ingredientsDescription: "Geben Sie ein, was Sie besitzen und einen Einheitspreis. Nur fehlende Einheiten tragen zu den Kosten bei.",
    item: "Material",
    perCraft: "pro Herstellung",
    required: "Erforderlich",
    owned: "Im Besitz",
    unitPrice: "Stückpreis",
    need: "Fehlmenge",
    cost: "Kosten der fehlenden Menge",
    ready: "Fertig",
    unpriced: "Preis je Einheit nicht angegeben",
    unpricedSummary: (count) =>
      `${count} fehlenden Materialien ist kein Stückpreis zugewiesen; deshalb wird die Gesamtsumme noch nicht angezeigt.`,
    calculationError: "Die Werte sind zu groß für eine sichere Berechnung. Verringern Sie Herstellungsanzahl, Bestand oder Stückpreis.",
    missingDataTitle: "Für diesen Modus ist keine Materialaufschlüsselung verfügbar",
    missingDataBody: "Probieren Sie Direktmaterialien aus oder wählen Sie ein anderes Rezept.",
    savedLocally: "Inventar, Preise und Gebühren bleiben auf diesem Gerät. Gemeinsame Links enthalten nur das Rezept, den Materialmodus und die Anzahl der Herstellungen.",
    intermediateTitle: "Zwischenprodukte",
    intermediateHint: "Diese zeigen den Weg zu den Grundstoffen und werden nicht ein zweites Mal berechnet.",
    intermediateCount: (count) => `${count} Zwischenprodukte`,
    totalCost: "Kostenübersicht",
    materialCost: "Fehlende Materialkosten",
    craftingFeePerCraft: "Gebühr pro Herstellung",
    craftingFeeTotal: "Gesamtgebühr für die Herstellung",
    costPerCraft: "Kosten pro Herstellung",
    costPerOutput: "Kosten pro Erzeugnis",
    grandTotal: "Gesamtsumme",
    currency: "Kina",
    resetTitle: "Eingaben für dieses Rezept zurücksetzen?",
    resetBody: "Inventar, Preise, Gebühren, Materialmodus und Herstellungsanzahl werden gelöscht. Das kann nicht rückgängig gemacht werden.",
    cancel: "Abbruch",
    confirmReset: "Jetzt zurücksetzen",
    resetDone: "Lokale Eingaben für dieses Rezept wurden zurückgesetzt.",
    close: "Bestätigungsdialog schließen",
    imageAlt: (name) => `${name} Icon`,
    level: (level) => `Lv. ${level}`,
  },
  "fr": {
    calculator: "Calculateur de matériaux de fabrication",
    recipeId: "ID de recette",
    profession: "Profession",
    mastery: "Maîtrise",
    outputPerCraft: "Production par fabrication",
    totalOutput: "Production prévue",
    unknown: "Non disponible",
    crafts: "Nombre de fabrications",
    craftsHint: "Les besoins en matériaux sont mis à jour selon le nombre de fabrications",
    direct: "Matériaux directs",
    directHint: "Calculer les ingrédients de la recette de premier niveau",
    base: "Matériaux de base",
    baseHint: "Décomposer les produits intermédiaires jusqu’aux matériaux de base",
    baseUnavailable: "Aucune ventilation de base n'est disponible pour cette recette",
    share: "Copier le lien de partage",
    copied: "Lien de partage copié. Le stock et les prix ne sont pas inclus.",
    copyFailed: "Le lien n'a pas pu être copié. Copiez-le depuis la barre d'adresse du navigateur.",
    reset: "Réinitialiser les entrées",
    ingredients: "Exigences en matière de matériaux",
    ingredientsDescription: "Entrez ce que vous possédez et un prix unitaire. Seules les unités manquantes contribuent au coût.",
    item: "Matériau",
    perCraft: "Par fabrication",
    required: "Requis",
    owned: "En stock",
    unitPrice: "Prix unitaire",
    need: "Manquant",
    cost: "Coût du manque",
    ready: "Prêt",
    unpriced: "Prix unitaire non indiqué",
    unpricedSummary: (count) =>
      `${count} matériaux manquants n’ont pas de prix unitaire ; le total général n’est donc pas encore affiché.`,
    calculationError: "Les valeurs sont trop élevées pour un calcul fiable. Réduisez le nombre de fabrications, le stock ou le prix unitaire.",
    missingDataTitle: "Aucun détail de matériaux pour ce mode",
    missingDataBody: "Essayez les matériaux directs ou choisissez une autre recette.",
    savedLocally: "Le stock, les prix et les frais restent sur cet appareil. Les liens partagés contiennent uniquement la recette, le mode de matériaux et le nombre de fabrications.",
    intermediateTitle: "Produits intermédiaires",
    intermediateHint: "Ils indiquent le chemin vers les matériaux de base et ne sont pas comptés une seconde fois.",
    intermediateCount: (count) => `${count} articles intermédiaires`,
    totalCost: "Résumé des coûts",
    materialCost: "Coût des matériaux manquants",
    craftingFeePerCraft: "Taxe par fabrication",
    craftingFeeTotal: "Total des frais de fabrication",
    costPerCraft: "Coût par fabrication",
    costPerOutput: "Coût par produit",
    grandTotal: "Total général",
    currency: "Kina",
    resetTitle: "Réinitialiser les entrées de cette recette?",
    resetBody: "Le stock, les prix, les frais, le mode de matériaux et le nombre de fabrications seront effacés. Cette action est irréversible.",
    cancel: "Annuler",
    confirmReset: "Réinitialiser",
    resetDone: "Les entrées locales de cette recette ont été réinitialisées.",
    close: "Fermer la fenêtre de confirmation",
    imageAlt: (name) => `icône ${name}`,
    level: (level) => `Lv. ${level}`,
  },
  "es": {
    calculator: "Calculadora de materiales de fabricación",
    recipeId: "Receta ID",
    profession: "Profesión",
    mastery: "Maestría",
    outputPerCraft: "Producción por fabricación",
    totalOutput: "Producción prevista",
    unknown: "No disponible",
    crafts: "Número de fabricaciones",
    craftsHint: "Los materiales se actualizan según el número de fabricaciones",
    direct: "Materiales directos",
    directHint: "Calcular los ingredientes de la receta de primer nivel",
    base: "Materiales de base",
    baseHint: "Desglosa los productos intermedios hasta sus materiales base",
    baseUnavailable: "No hay desglose de material base disponible para esta receta",
    share: "Copiar enlace para compartir",
    copied: "Enlace para compartir copiado. No incluye inventario ni precios.",
    copyFailed: "No se pudo copiar el enlace. Cópialo desde la barra de direcciones del navegador.",
    reset: "Restablecer datos",
    ingredients: "Materiales necesarios",
    ingredientsDescription: "Introduzca lo que posee y un precio unitario. Sólo las unidades faltantes contribuyen a costear.",
    item: "Material",
    perCraft: "Por fabricación",
    required: "Necesario",
    owned: "En posesión",
    unitPrice: "Precio unitario",
    need: "Faltante",
    cost: "Coste del faltante",
    ready: "Listo",
    unpriced: "Precio unitario no introducido",
    unpricedSummary: (count) =>
      `${count} materiales faltantes no tienen precio unitario, por lo que el total general aún no se muestra.`,
    calculationError: "Los valores son demasiado grandes para calcularlos con seguridad. Reduce el número de fabricaciones, el inventario o el precio unitario.",
    missingDataTitle: "No hay desglose de material en este modo",
    missingDataBody: "Pruebe materiales directos o elija otra receta.",
    savedLocally: "Inventario, precios y tarifas permanecen en este dispositivo. Los enlaces compartidos contienen sólo la receta, el modo material y el número de fabricaciones.",
    intermediateTitle: "Productos intermedios",
    intermediateHint: "Muestran la ruta hacia los materiales base y no se contabilizan por segunda vez.",
    intermediateCount: (count) => `${count} elementos intermedios`,
    totalCost: "Resumen de gastos",
    materialCost: "Costo de material faltante",
    craftingFeePerCraft: "Tarifa por fabricación",
    craftingFeeTotal: "Tarifa total de fabricación",
    costPerCraft: "Coste por fabricación",
    costPerOutput: "Costo por producto",
    grandTotal: "Total general",
    currency: "Kina",
    resetTitle: "¿Reiniciar las entradas para esta receta?",
    resetBody: "Se limpiarán los inventarios, precios, tarifas, modo material y número de fabricaciones. Esto no puede ser deshecho.",
    cancel: "Cancelar",
    confirmReset: "Reiniciar ahora",
    resetDone: "Los datos locales de esta receta se han restablecido.",
    close: "Cerrar confirmación",
    imageAlt: (name) => `Icono de ${name}`,
    level: (level) => `Lv. ${level}`,
  },
  "ja": {
    calculator: "製作材料計算機",
    recipeId: "レシピID",
    profession: "製作職",
    mastery: "熟練度",
    outputPerCraft: "1回の製作量",
    totalOutput: "予定製作量",
    unknown: "情報なし",
    crafts: "製作回数",
    craftsHint: "製作回数に応じて材料必要量を更新します",
    direct: "直接材料",
    directHint: "レシピの第1階層の材料を計算します",
    base: "基礎材料",
    baseHint: "中間製作品を最下層の材料まで展開します",
    baseUnavailable: "このレシピには確認可能な基礎材料の内訳がありません",
    share: "共有リンクをコピー",
    copied: "共有リンクをコピーしました。在庫数と価格は含まれません。",
    copyFailed: "リンクをコピーできませんでした。ブラウザのアドレスバーからコピーしてください。",
    reset: "入力をリセット",
    ingredients: "材料必要量",
    ingredientsDescription: "所持数と単価を入力すると、不足分だけを費用として計算します。",
    item: "材料",
    perCraft: "1回あたり",
    required: "必要数",
    owned: "所持数",
    unitPrice: "単価",
    need: "不足数",
    cost: "不足分の費用",
    ready: "準備済み",
    unpriced: "単価未入力",
    unpricedSummary: (count) =>
      `不足材料${count}種類の単価が未入力のため、合計費用はまだ表示されません。`,
    calculationError: "値が大きすぎるため安全に計算できません。製作回数、所持数、または単価を下げてください。",
    missingDataTitle: "このモードには材料内訳がありません",
    missingDataBody: "直接材料へ切り替えるか、別のレシピを選んでください。",
    savedLocally: "所持数、価格、手数料はこの端末にのみ保存されます。共有リンクにはレシピ、材料モード、製作回数だけが含まれます。",
    intermediateTitle: "中間製作品",
    intermediateHint: "基礎材料への展開経路を示す項目で、費用には重複して加算しません。",
    intermediateCount: (count) => `中間製作品${count}件`,
    totalCost: "費用の概要",
    materialCost: "不足材料の費用",
    craftingFeePerCraft: "1回あたりの製作手数料",
    craftingFeeTotal: "製作手数料合計",
    costPerCraft: "1回あたりの製作費用",
    costPerOutput: "完成品1個あたりの費用",
    grandTotal: "合計費用",
    currency: "ギーナ",
    resetTitle: "このレシピの入力をリセットしますか？",
    resetBody: "所持数、価格、手数料、材料モード、製作回数を消去します。この操作は元に戻せません。",
    cancel: "キャンセル",
    confirmReset: "リセットする",
    resetDone: "このレシピの端末内入力をリセットしました。",
    close: "確認画面を閉じる",
    imageAlt: (name) => `${name}のアイコン`,
    level: (level) => `Lv. ${level}`,
  },
  "pt-br": {
    calculator: "Calculadora de material de fabricação",
    recipeId: "ID da receita",
    profession: "Profissão",
    mastery: "Proficiência",
    outputPerCraft: "Produção por fabricação",
    totalOutput: "Produção planejada",
    unknown: "Não disponível",
    crafts: "Número de fabricações",
    craftsHint: "Os materiais são atualizados conforme o número de fabricações",
    direct: "Materiais diretos",
    directHint: "Calcula os ingredientes do primeiro nível da receita",
    base: "Materiais de base",
    baseHint: "Decompõe produtos intermediários até os materiais de base",
    baseUnavailable: "Não está disponível nenhuma discriminação de base para esta receita",
    share: "Copiar link de compartilhamento",
    copied: "Link de compartilhamento copiado. Estoque e preços não estão incluídos.",
    copyFailed: "Não foi possível copiar o link. Copie-o da barra de endereços do navegador.",
    reset: "Redefinir dados",
    ingredients: "Materiais necessários",
    ingredientsDescription: "Digite o que você possui e um preço unitário. Apenas as unidades em falta contribuem para o custo.",
    item: "Material",
    perCraft: "Por fabricação",
    required: "Necessário",
    owned: "Em estoque",
    unitPrice: "Preço unitário",
    need: "Faltante",
    cost: "Custo da falta",
    ready: "Pronto",
    unpriced: "Preço unitário não indicado",
    unpricedSummary: (count) =>
      `${count} materiais faltantes não têm preço unitário; por isso, o total geral ainda não é exibido.`,
    calculationError: "Os valores são grandes demais para um cálculo seguro. Reduza o número de fabricações, o estoque ou o preço unitário.",
    missingDataTitle: "Não há detalhamento de materiais neste modo",
    missingDataBody: "Experimente materiais diretos ou escolha outra receita.",
    savedLocally: "Estoque, preços e taxas ficam neste dispositivo. Links compartilhados contêm apenas a receita, o modo de materiais e o número de fabricações.",
    intermediateTitle: "Produtos intermediários",
    intermediateHint: "Eles mostram a rota até os materiais de base e não são contabilizados uma segunda vez.",
    intermediateCount: (count) => `${count} itens intermediários`,
    totalCost: "Resumo dos custos",
    materialCost: "Custo do material em falta",
    craftingFeePerCraft: "Taxa por fabricação",
    craftingFeeTotal: "Taxa total de fabricação",
    costPerCraft: "Custo por fabricação",
    costPerOutput: "Custo por produto",
    grandTotal: "Total geral",
    currency: "Kina",
    resetTitle: "Reiniciar entradas para esta receita?",
    resetBody: "Estoque, preços, taxas, modo de materiais e número de fabricações serão apagados. Essa ação não pode ser desfeita.",
    cancel: "Cancelar",
    confirmReset: "Reiniciar agora",
    resetDone: "As entradas locais para esta receita foram reiniciadas.",
    close: "Fechar a confirmação",
    imageAlt: (name) => `Ícone de ${name}`,
    level: (level) => `Lv. ${level}`,
  },
  "ru": {
    calculator: "Калькулятор материалов для изготовления",
    recipeId: "ID рецепта",
    profession: "Профессия",
    mastery: "Мастерство",
    outputPerCraft: "Результат за изготовление",
    totalOutput: "Планируемый выпуск",
    unknown: "Недоступно",
    crafts: "Количество изготовлений",
    craftsHint: "Потребность в материалах обновляется с учетом количества изготовлений",
    direct: "Прямые материалы",
    directHint: "Рассчитывает ингредиенты первого уровня рецепта",
    base: "Базовые материалы",
    baseHint: "Раскладывает промежуточные изделия до базовых материалов",
    baseUnavailable: "Ни один базовый материал не доступен для этого рецепта.",
    share: "Копировать ссылку",
    copied: "Ссылка на общий доступ скопирована. Запасы и цены не учитывались.",
    copyFailed: "Ссылку не удалось скопировать. Скопируйте его из адресной строки браузера.",
    reset: "Сброс входных данных",
    ingredients: "Требования к материалам",
    ingredientsDescription: "Введите то, что у вас есть, и единичную цену. Только недостающие единицы способствуют росту стоимости.",
    item: "Материал",
    perCraft: "За изготовление",
    required: "Требуется",
    owned: "В наличии",
    unitPrice: "Цена за единицу",
    need: "Не хватает",
    cost: "Стоимость недостающего",
    ready: "Готово",
    unpriced: "Цена не указана",
    unpricedSummary: (count) =>
      `Для ${count} недостающих материалов не указана цена, поэтому общая сумма пока не отображается.`,
    calculationError: "Значения слишком велики для безопасного расчета. Уменьшите количество изготовлений, запас или цену за единицу.",
    missingDataTitle: "Нет разбивки материала в этом режиме",
    missingDataBody: "Попробуйте прямые материалы или выберите другой рецепт.",
    savedLocally: "Запас, цены и комиссии остаются на этом устройстве. В общую ссылку входят только рецепт, режим материалов и количество изготовлений.",
    intermediateTitle: "Промежуточные изделия",
    intermediateHint: "Они показывают путь к базовым материалам и не учитываются повторно.",
    intermediateCount: (count) => `Промежуточные элементы ${count}`,
    totalCost: "Смета расходов",
    materialCost: "Недостающие материальные затраты",
    craftingFeePerCraft: "Комиссия за изготовление",
    craftingFeeTotal: "Общая комиссия",
    costPerCraft: "Стоимость одного изготовления",
    costPerOutput: "Стоимость единицы результата",
    grandTotal: "Общая сумма",
    currency: "Кина",
    resetTitle: "Сброс входов для этого рецепта?",
    resetBody: "Запасы, цены, комиссии, режим материалов и количество изготовлений будут удалены. Это действие нельзя отменить.",
    cancel: "Отмена",
    confirmReset: "Сбросить",
    resetDone: "Локальные данные этого рецепта сброшены.",
    close: "Закрыть подтверждение",
    imageAlt: (name) => `Значок ${name}`,
    level: (level) => `Lv. ${level}`,
  },
  ko: {
    calculator: "제작 재료 계산기",
    recipeId: "레시피 ID",
    profession: "전문 기술",
    mastery: "숙련도",
    outputPerCraft: "1회 생산량",
    totalOutput: "예상 생산량",
    unknown: "정보 없음",
    crafts: "제작 횟수",
    craftsHint: "제작 횟수에 따라 재료 요구량이 바로 갱신됩니다",
    direct: "직접 재료",
    directHint: "레시피의 1단계 재료를 계산합니다",
    base: "기초 재료",
    baseHint: "중간 제작품을 최하위 재료까지 펼칩니다",
    baseUnavailable: "이 레시피에는 검증된 기초 재료 분해 정보가 없습니다",
    share: "공유 링크 복사",
    copied: "공유 링크를 복사했습니다. 보유량과 가격은 포함하지 않았습니다.",
    copyFailed: "링크를 복사하지 못했습니다. 브라우저 주소 표시줄에서 복사해 주세요.",
    reset: "입력 초기화",
    ingredients: "재료 요구량",
    ingredientsDescription: "현재 보유량과 단가를 입력하면 부족한 재료의 비용만 계산합니다.",
    item: "재료",
    perCraft: "1회 필요량",
    required: "총 필요량",
    owned: "보유",
    unitPrice: "단가",
    need: "부족",
    cost: "부족 비용",
    ready: "준비 완료",
    unpriced: "단가 미입력",
    unpricedSummary: (count) => `부족한 재료 ${count}종에 단가가 없어 총비용을 아직 표시하지 않습니다.`,
    calculationError: "입력값이 너무 커서 안전하게 계산할 수 없습니다. 제작 횟수, 보유량 또는 단가를 줄여 주세요.",
    missingDataTitle: "이 모드에는 재료 내역이 없습니다",
    missingDataBody: "직접 재료로 전환하거나 다른 레시피를 선택하세요.",
    savedLocally: "보유량, 가격, 수수료는 이 기기에만 저장됩니다. 공유 링크에는 레시피, 재료 모드, 제작 횟수만 포함됩니다.",
    intermediateTitle: "중간 제작품",
    intermediateHint: "기초 재료의 분해 경로를 보여 주며 비용에 중복 합산하지 않습니다.",
    intermediateCount: (count) => `중간 항목 ${count}개`,
    totalCost: "비용 요약",
    materialCost: "부족 재료 비용",
    craftingFeePerCraft: "1회 제작 수수료",
    craftingFeeTotal: "제작 수수료 합계",
    costPerCraft: "1회 제작 비용",
    costPerOutput: "결과물 1개 비용",
    grandTotal: "총비용",
    currency: "키나",
    resetTitle: "이 레시피의 입력을 초기화할까요?",
    resetBody: "보유량, 가격, 수수료, 재료 모드와 제작 횟수가 모두 삭제되며 되돌릴 수 없습니다.",
    cancel: "취소",
    confirmReset: "초기화",
    resetDone: "이 레시피의 로컬 입력을 초기화했습니다.",
    close: "확인 창 닫기",
    imageAlt: (name) => `${name} 아이콘`,
    level: (level) => `Lv. ${level}`,
  },
};

function storageKey(recipeId: string) {
  return `${CRAFTING_RECIPE_STORAGE_PREFIX}:${recipeId}`;
}

function numberValue(value: string | number | undefined | null) {
  const parsed = typeof value === "number" ? value : Number(value ?? 0);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(Math.trunc(parsed), MAX_VALUE);
}

function countValue(value: string | number | undefined | null) {
  return Math.max(1, Math.trunc(numberValue(value)) || 1);
}

function materialKey(material: LocalizedCraftingIngredient) {
  return material.key;
}

function aggregateMaterials(materials: readonly LocalizedCraftingIngredient[]) {
  const byKey = new Map<string, LocalizedCraftingIngredient>();
  for (const material of materials) {
    const key = materialKey(material);
    const existing = byKey.get(key);
    if (existing) {
      byKey.set(key, {
        ...existing,
        quantity: numberValue(existing.quantity) + numberValue(material.quantity),
      });
    } else {
      byKey.set(key, { ...material, key });
    }
  }
  return [...byKey.values()];
}

function numberRecord(values: Readonly<Record<string, string>>) {
  return Object.fromEntries(
    Object.entries(values)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => [key, numberValue(value)]),
  );
}

function safeCalculation(
  recipe: LocalizedCraftingRecipe,
  mode: MaterialMode,
  craftCount: number,
  inventory: Readonly<Record<string, string>>,
  unitPrices: Readonly<Record<string, string>>,
  craftingFee: string,
): CraftingRecipeCalculation | null {
  try {
    return calculateCraftingRecipe(recipe, {
      mode,
      craftCount,
      ownedByKey: numberRecord(inventory),
      unitPriceByKey: numberRecord(unitPrices),
      feePerCraft: numberValue(craftingFee),
    });
  } catch {
    return null;
  }
}

function gradeTone(value?: string | null) {
  const normalized = (value ?? "").normalize("NFKC").toLocaleLowerCase();
  if (/myth|신화|神話|神话/u.test(normalized)) return "mythic";
  if (/legend|전설|傳說|传说/u.test(normalized)) return "legendary";
  if (/unique|유일|유니크|獨特|独特/u.test(normalized)) return "unique";
  if (/epic|영웅|史詩|史诗/u.test(normalized)) return "epic";
  if (/rare|희귀|稀有/u.test(normalized)) return "rare";
  return "normal";
}

function readStoredInputs(recipeId: string): StoredInputs | null {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(storageKey(recipeId)) ?? "null",
    );
    if (!parsed || typeof parsed !== "object") return null;
    const value = parsed as Partial<StoredInputs>;
    if (value.version !== 1) return null;
    return {
      version: 1,
      inventory:
        value.inventory && typeof value.inventory === "object"
          ? value.inventory
          : {},
      unitPrices:
        value.unitPrices && typeof value.unitPrices === "object"
          ? value.unitPrices
          : {},
      craftingFee:
        typeof value.craftingFee === "string" ? value.craftingFee : "",
    };
  } catch {
    return null;
  }
}

function readSharedState(recipeId: string) {
  const params = new URLSearchParams(window.location.hash.slice(1));
  if (params.get("recipe") !== recipeId) return null;
  const mode = params.get("mode") === "base" ? "base" : "direct";
  const crafts = countValue(params.get("crafts"));
  return { mode, crafts } as const;
}

export function CraftingRecipeCalculator({
  locale,
  recipe,
}: CraftingRecipeCalculatorProps) {
  const text = craftingRecipeCalculatorCopy[locale];
  const headingId = useId();
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<MaterialMode>("direct");
  const [craftCount, setCraftCount] = useState(1);
  const [inventory, setInventory] = useState<Record<string, string>>({});
  const [unitPrices, setUnitPrices] = useState<Record<string, string>>({});
  const [craftingFee, setCraftingFee] = useState("");
  const [loadedRecipeId, setLoadedRecipeId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const directMaterials = useMemo(() => aggregateMaterials(recipe.direct), [recipe.direct]);
  const baseMaterials = useMemo(() => aggregateMaterials(recipe.base), [recipe.base]);
  const intermediateMaterials = useMemo(
    () => aggregateMaterials(recipe.intermediate),
    [recipe.intermediate],
  );
  const activeMaterials = mode === "base" ? baseMaterials : directMaterials;
  const outputQuantity = recipe.outputQuantity;
  const profession = recipe.professionName || recipe.profession || text.unknown;
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(
        siteLocaleConfig[locale].code,
        { maximumFractionDigits: 2 },
      ),
    [locale],
  );

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const stored = readStoredInputs(recipe.recipeId);
      const shared = readSharedState(recipe.recipeId);
      setInventory(stored?.inventory ?? {});
      setUnitPrices(stored?.unitPrices ?? {});
      setCraftingFee(stored?.craftingFee ?? "");
      setMode(shared?.mode === "base" && baseMaterials.length ? "base" : "direct");
      setCraftCount(shared?.crafts ?? 1);
      setStatus(null);
      setLoadedRecipeId(recipe.recipeId);
    });
    return () => {
      cancelled = true;
    };
  }, [baseMaterials.length, recipe.recipeId]);

  useEffect(() => {
    if (loadedRecipeId !== recipe.recipeId) return;
    const next: StoredInputs = {
      version: 1,
      inventory,
      unitPrices,
      craftingFee,
    };
    try {
      window.localStorage.setItem(storageKey(recipe.recipeId), JSON.stringify(next));
    } catch {
      // The current calculation remains usable when browser storage is blocked.
    }
  }, [craftingFee, inventory, loadedRecipeId, recipe.recipeId, unitPrices]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (resetOpen && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => cancelButtonRef.current?.focus());
    } else if (!resetOpen && dialog.open) {
      dialog.close();
    }
  }, [resetOpen]);

  const calculation = useMemo(
    () =>
      safeCalculation(
        recipe,
        mode,
        craftCount,
        inventory,
        unitPrices,
        craftingFee,
      ),
    [craftCount, craftingFee, inventory, mode, recipe, unitPrices],
  );
  const rows = calculation?.lines ?? [];
  const materialCost = calculation?.totals.pricedMaterialCost ?? 0;
  const craftingFeeTotal = calculation?.totals.feeCost ?? 0;
  const grandTotal = calculation?.totals.totalCost ?? null;
  const costPerCraft = grandTotal === null ? null : grandTotal / craftCount;
  const costPerOutput =
    grandTotal !== null && outputQuantity
      ? grandTotal / (craftCount * outputQuantity)
      : null;
  const totalOutput = outputQuantity ? craftCount * outputQuantity : null;

  const updateInput = (
    setter: Dispatch<SetStateAction<Record<string, string>>>,
    key: string,
    value: string,
  ) => {
    if (value !== "" && numberValue(value) !== Number(value)) return;
    setter((current) => ({ ...current, [key]: value }));
    setStatus(null);
  };

  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams({
      recipe: recipe.recipeId,
      mode,
      crafts: String(craftCount),
    });
    url.hash = params.toString();
    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus({ kind: "success", message: text.copied });
    } catch {
      setStatus({ kind: "error", message: text.copyFailed });
    }
  };

  const closeResetDialog = () => {
    setResetOpen(false);
    window.requestAnimationFrame(() => resetButtonRef.current?.focus());
  };

  const confirmReset = () => {
    setInventory({});
    setUnitPrices({});
    setCraftingFee("");
    setMode("direct");
    setCraftCount(1);
    try {
      window.localStorage.removeItem(storageKey(recipe.recipeId));
    } catch {
      // State has still been cleared for the current session.
    }
    const url = new URL(window.location.href);
    if (new URLSearchParams(url.hash.slice(1)).get("recipe") === recipe.recipeId) {
      url.hash = "";
      window.history.replaceState(window.history.state, "", url);
    }
    setStatus({ kind: "success", message: text.resetDone });
    closeResetDialog();
  };

  return (
    <section className={styles.calculator} aria-labelledby={headingId}>
      <header className={styles.recipeHeader}>
        <span className={styles.outputIcon} data-grade={gradeTone(`${recipe.gradeCode ?? ""} ${recipe.gradeName ?? ""}`)}>
          {recipe.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={text.imageAlt(recipe.name)}
              fetchPriority="high"
              height="104"
              referrerPolicy="no-referrer"
              src={recipe.imageUrl}
              width="104"
            />
          ) : (
            <PackageSearch aria-hidden="true" size={34} />
          )}
        </span>
        <div className={styles.recipeIdentity}>
          <p>{text.calculator}</p>
          <h1 id={headingId}>{recipe.name}</h1>
          <div className={styles.recipeTags}>
            {recipe.gradeName ? <span data-grade={gradeTone(`${recipe.gradeCode ?? ""} ${recipe.gradeName}`)}>{recipe.gradeName}</span> : null}
            {recipe.categoryName ? <span>{recipe.categoryName}</span> : null}
            <span>{profession}</span>
            {recipe.masteryLevel !== null ? <span>{text.level(recipe.masteryLevel)}</span> : null}
          </div>
          <small>{text.recipeId} {recipe.recipeId} · {recipe.outputItemId}</small>
        </div>
        <div className={styles.outputFacts}>
          <div><span>{text.outputPerCraft}</span><strong>{outputQuantity ? formatter.format(outputQuantity) : "—"}</strong></div>
          <div><span>{text.totalOutput}</span><strong>{totalOutput ? formatter.format(totalOutput) : "—"}</strong></div>
        </div>
      </header>

      <div className={styles.plannerBar}>
        <label className={styles.craftCount}>
          <span>{text.crafts}</span>
          <input
            aria-describedby={`${headingId}-craft-hint`}
            inputMode="numeric"
            max={MAX_VALUE}
            min="1"
            onChange={(event) => {
              setCraftCount(countValue(event.target.value));
              setStatus(null);
            }}
            type="number"
            value={craftCount}
          />
          <small id={`${headingId}-craft-hint`}>{text.craftsHint}</small>
        </label>

        <div className={styles.modePicker} aria-label={text.ingredients} role="group">
          <button
            aria-pressed={mode === "direct"}
            onClick={() => {
              setMode("direct");
              setStatus(null);
            }}
            type="button"
          >
            <span>{text.direct}</span>
            <small>{text.directHint}</small>
          </button>
          <button
            aria-pressed={mode === "base"}
            disabled={!baseMaterials.length}
            onClick={() => {
              setMode("base");
              setStatus(null);
            }}
            title={!baseMaterials.length ? text.baseUnavailable : undefined}
            type="button"
          >
            <span>{text.base}</span>
            <small>{baseMaterials.length ? text.baseHint : text.baseUnavailable}</small>
          </button>
        </div>

        <div className={styles.actions}>
          <button onClick={() => void copyShareLink()} type="button">
            <ClipboardCopy aria-hidden="true" size={16} />
            {text.share}
          </button>
          <button onClick={() => setResetOpen(true)} ref={resetButtonRef} type="button">
            <RotateCcw aria-hidden="true" size={16} />
            {text.reset}
          </button>
        </div>
      </div>

      {status ? (
        <div aria-live="polite" className={styles.status} data-kind={status.kind} role={status.kind === "error" ? "alert" : "status"}>
          {status.kind === "success" ? <Check aria-hidden="true" size={15} /> : <X aria-hidden="true" size={15} />}
          <span>{status.message}</span>
        </div>
      ) : null}

      <div className={styles.calculatorGrid}>
        <section className={styles.materialPanel} aria-labelledby={`${headingId}-materials`}>
          <div className={styles.panelHeading}>
            <div>
              <p>{mode === "base" ? text.base : text.direct}</p>
              <h3 id={`${headingId}-materials`}>{text.ingredients}</h3>
            </div>
            <span>{activeMaterials.length.toLocaleString(locale)}</span>
          </div>
          <p className={styles.panelDescription}>{text.ingredientsDescription}</p>

          {!calculation ? (
            <div className={styles.missingData} role="alert">
              <PackageSearch aria-hidden="true" size={27} />
              <h4>{text.calculationError}</h4>
            </div>
          ) : rows.length ? (
            <div className={styles.materialTable}>
              <table>
                <thead>
                  <tr>
                    <th>{text.item}</th>
                    <th>{text.perCraft}</th>
                    <th>{text.required}</th>
                    <th>{text.owned}</th>
                    <th>{text.unitPrice}</th>
                    <th>{text.need}</th>
                    <th>{text.cost}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr data-ready={row.shortage === 0 || undefined} key={row.ingredient.key}>
                      <th scope="row">
                        <span className={styles.materialIdentity}>
                          <span className={styles.materialIcon} data-grade={gradeTone(`${row.ingredient.gradeCode ?? ""} ${row.ingredient.gradeName ?? ""}`)}>
                            {row.ingredient.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={text.imageAlt(row.ingredient.name)}
                                height="44"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                src={row.ingredient.imageUrl}
                                width="44"
                              />
                            ) : (
                              <Layers3 aria-hidden="true" size={18} />
                            )}
                          </span>
                          <span>
                            <strong>{row.ingredient.name}</strong>
                            {row.ingredient.gradeName ? <small>{row.ingredient.gradeName}</small> : null}
                          </span>
                        </span>
                      </th>
                      <td data-label={text.perCraft}>{formatter.format(row.quantityPerCraft)}</td>
                      <td data-label={text.required}><strong>{formatter.format(row.required)}</strong></td>
                      <td data-label={text.owned}>
                        <label>
                          <span className={styles.visuallyHidden}>{row.ingredient.name} · {text.owned}</span>
                          <input
                            inputMode="numeric"
                            max={MAX_VALUE}
                            min="0"
                            onChange={(event) => updateInput(setInventory, row.ingredient.key, event.target.value)}
                            placeholder="0"
                            step="1"
                            type="number"
                            value={inventory[row.ingredient.key] ?? ""}
                          />
                        </label>
                      </td>
                      <td data-label={text.unitPrice}>
                        <label>
                          <span className={styles.visuallyHidden}>{row.ingredient.name} · {text.unitPrice}</span>
                          <input
                            inputMode="numeric"
                            max={MAX_VALUE}
                            min="0"
                            onChange={(event) => updateInput(setUnitPrices, row.ingredient.key, event.target.value)}
                            placeholder="0"
                            step="1"
                            type="number"
                            value={unitPrices[row.ingredient.key] ?? ""}
                          />
                        </label>
                      </td>
                      <td data-label={text.need}>
                        <span className={styles.need} data-ready={row.shortage === 0 || undefined}>
                          {row.shortage === 0 ? <Check aria-hidden="true" size={13} /> : null}
                          {row.shortage === 0 ? text.ready : formatter.format(row.shortage)}
                        </span>
                      </td>
                      <td data-label={text.cost} title={row.purchaseCost === null && row.shortage > 0 ? text.unpriced : undefined}>
                        <strong>{row.shortage === 0 ? formatter.format(0) : row.purchaseCost === null ? "—" : formatter.format(row.purchaseCost)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.missingData} role="status">
              <PackageSearch aria-hidden="true" size={27} />
              <h4>{text.missingDataTitle}</h4>
              <p>{text.missingDataBody}</p>
            </div>
          )}
        </section>

        <aside className={styles.costPanel} aria-labelledby={`${headingId}-cost`}>
          <div className={styles.costHeading}>
            <Coins aria-hidden="true" size={20} />
            <h3 id={`${headingId}-cost`}>{text.totalCost}</h3>
          </div>
          <label className={styles.feeInput}>
            <span>{text.craftingFeePerCraft}</span>
            <span>
              <input
                inputMode="numeric"
                max={MAX_VALUE}
                min="0"
                onChange={(event) => {
                  const value = event.target.value;
                  if (value !== "" && numberValue(value) !== Number(value)) return;
                  setCraftingFee(value);
                  setStatus(null);
                }}
                placeholder="0"
                step="1"
                type="number"
                value={craftingFee}
              />
              <b>{text.currency}</b>
            </span>
          </label>
          <dl className={styles.costList}>
            <div><dt>{text.materialCost}</dt><dd>{formatter.format(materialCost)}</dd></div>
            <div><dt>{text.craftingFeeTotal}</dt><dd>{formatter.format(craftingFeeTotal)}</dd></div>
            <div><dt>{text.costPerCraft}</dt><dd>{costPerCraft === null ? "—" : formatter.format(costPerCraft)}</dd></div>
            <div><dt>{text.costPerOutput}</dt><dd>{costPerOutput === null ? "—" : formatter.format(costPerOutput)}</dd></div>
          </dl>
          {calculation && calculation.totals.unpricedShortageMaterials > 0 ? (
            <p className={styles.costWarning} role="status">
              {text.unpricedSummary(calculation.totals.unpricedShortageMaterials)}
            </p>
          ) : null}
          <div className={styles.grandTotal}>
            <span>{text.grandTotal}</span>
            <strong>{grandTotal === null ? "—" : formatter.format(grandTotal)} <small>{text.currency}</small></strong>
          </div>
          <p className={styles.localNote}>{text.savedLocally}</p>
        </aside>
      </div>

      {mode === "base" && intermediateMaterials.length ? (
        <details className={styles.intermediatePanel}>
          <summary>
            <span>
              <Layers3 aria-hidden="true" size={18} />
              <span><strong>{text.intermediateTitle}</strong><small>{text.intermediateHint}</small></span>
            </span>
            <b>{text.intermediateCount(intermediateMaterials.length)}</b>
          </summary>
          <ul>
            {intermediateMaterials.map((material) => (
              <li key={materialKey(material)}>
                <span>{material.name}</span>
                <strong>× {formatter.format(numberValue(material.quantity) * craftCount)}</strong>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <div className={styles.mobileSummary} aria-label={text.totalCost}>
        <span><small>{text.grandTotal}</small><strong>{grandTotal === null ? "—" : formatter.format(grandTotal)} {text.currency}</strong></span>
        <span><small>{text.need}</small><strong>{rows.filter((row) => row.shortage > 0).length}</strong></span>
      </div>

      <dialog
        aria-describedby={dialogDescriptionId}
        aria-labelledby={dialogTitleId}
        className={styles.resetDialog}
        onCancel={(event) => {
          event.preventDefault();
          closeResetDialog();
        }}
        onClose={() => setResetOpen(false)}
        ref={dialogRef}
      >
        <button aria-label={text.close} className={styles.dialogClose} onClick={closeResetDialog} type="button">
          <X aria-hidden="true" size={18} />
        </button>
        <RotateCcw aria-hidden="true" className={styles.dialogIcon} size={24} />
        <h3 id={dialogTitleId}>{text.resetTitle}</h3>
        <p id={dialogDescriptionId}>{text.resetBody}</p>
        <div className={styles.dialogActions}>
          <button onClick={closeResetDialog} ref={cancelButtonRef} type="button">{text.cancel}</button>
          <button data-danger="true" onClick={confirmReset} type="button">{text.confirmReset}</button>
        </div>
      </dialog>
    </section>
  );
}
