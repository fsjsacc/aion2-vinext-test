import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CraftingDirectory,
  type CraftingDirectoryEntry,
} from "@/app/_components/tools/CraftingDirectory";
import toolsStyles from "@/app/_components/tools/tools.module.css";
import {
  craftingCatalogManifest,
  getCraftingDirectoryEntries,
} from "@/app/crafting-catalog";
import {
  getSectionHref,
  isSiteLocale,
  localizedHref,
  siteLocaleConfig,
  siteLocales,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { buildSeoDescription } from "@/app/seo-metadata";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";
import { toolHubCopy } from "@/app/tool-registry";

import { buildStaticRouteMetadata } from "../../_static-route-metadata";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string | string[] }>;
};

type PageCopy = {
  title: string;
  seoTitle: string;
  kicker: string;
  description: string;
  sourceLabel: string;
  sourceSummary: string;
  dataLanguageNotice: string;
  recipesLabel: string;
  itemDataDateLabel: string;
  recipeDataDateLabel: string;
  directoryKicker: string;
  calculationKicker: string;
  breadcrumbLabel: string;
  catalogTitle: string;
  catalogDescription: string;
  methodTitle: string;
  methodDescription: string;
  methodCards: readonly { title: string; description: string }[];
  customTitle: string;
  customDescription: string;
  customAction: string;
  faqTitle: string;
  faqs: readonly { question: string; answer: string }[];
  featureList: readonly string[];
};

const copy: Record<SiteLocale, PageCopy> = {
  "zh-hant": {
    title: "AION2 製作配方與材料計算器",
    seoTitle: "AION2 製作配方與材料計算器｜需求、缺口與成本",
    kicker: "CRAFTING DATABASE / 製作規劃",
    description:
      "搜尋成品與製作專業，打開配方後依製作次數計算直接材料或基礎材料的需求、目前庫存缺口與自訂單價成本。",
    sourceLabel: "資料來源與更新",
    sourceSummary:
      "本目錄先收錄 894 筆明確標示製作專業的配方。物品名稱、圖示、品級與分類對照 NC 官方物品資料；配方關係與數量來自 2026-07-10 社群快照，改版後請以遊戲內製作畫面為準。",
    dataLanguageNotice: "繁體中文物品名稱會優先採用目前可核對的官方資料；未有官方譯名的專名會保留來源語言。",
    recipesLabel: "配方",
    itemDataDateLabel: "物品資料日期",
    recipeDataDateLabel: "配方資料日期",
    directoryKicker: "配方目錄",
    calculationKicker: "計算模型",
    breadcrumbLabel: "麵包屑導覽",
    catalogTitle: "搜尋製作配方",
    catalogDescription:
      "可依名稱、物品 ID、專業、品級、分類與熟練度篩選。選擇成品後再輸入製作次數、持有量和單價，不需要先手動建立每一種材料。",
    methodTitle: "計算方式",
    methodDescription:
      "計算器只處理可核對的整數關係，不推測市場行情、成功率或版本尚未公開的產量。",
    methodCards: [
      { title: "直接材料", description: "顯示完成該配方時直接投入的材料，適合已經備妥中間製品的玩家。" },
      { title: "基礎材料", description: "展開配方鏈後的基礎材料總量，方便從原料開始準備。" },
      { title: "缺口與成本", description: "所需量減去持有量得到缺口；缺口乘以自訂單價得到估算成本。" },
    ],
    customTitle: "找不到配方？",
    customDescription: "可使用自訂計畫器整理活動材料、強化階段或目錄中找不到的配方。",
    customAction: "開啟自訂材料計畫器",
    faqTitle: "製作計算器常見問題",
    faqs: [
      {
        question: "這些配方是 NC 官方資料嗎？",
        answer:
          "不是全部。物品身份、圖示、品級與分類對照 NC 官方物品目錄；製作關係和數量來自標明日期的社群資料快照。本站不會把社群配方標成官方資料。",
      },
      {
        question: "為什麼輸入製作次數，而不是成品數量？",
        answer:
          "目前資料沒有可核對的每次產量欄位。為避免假設每次一定產出一件，工具直接以製作次數計算；請先依遊戲內畫面確認實際產量。",
      },
      {
        question: "直接材料和基礎材料有什麼差別？",
        answer:
          "直接材料是配方畫面第一層投入項目；基礎材料會把可製作的中間材料繼續展開，兩種模式不應相加。",
      },
      {
        question: "持有量和單價會上傳嗎？",
        answer:
          "不會。計算器把這些輸入保存在目前瀏覽器中，分享連結只包含配方、模式與製作次數，不包含庫存或價格。",
      },
    ],
    featureList: ["配方目錄", "直接與基礎材料總量", "庫存缺口與成本計算"],
  },
  en: {
    title: "AION2 Crafting Recipe & Material Calculator",
    seoTitle: "AION2 Crafting Calculator: Materials, Shortages & Cost",
    kicker: "CRAFTING DATABASE / MATERIAL PLANNER",
    description:
      "Search crafted items and professions, then calculate direct or base-material requirements, inventory shortages, and custom-price costs by craft count.",
    sourceLabel: "Sources and update",
    sourceSummary:
      "This directory starts with 894 recipes that identify a crafting profession. Item names, icons, grades, and categories are matched to NC's official item data. Recipe relationships and quantities use a community snapshot dated 2026-07-10; verify them in game after a patch.",
    dataLanguageNotice: "Item and recipe names follow the currently available official or source labels. The interface is localized separately.",
    recipesLabel: "Recipes",
    itemDataDateLabel: "Item data date",
    recipeDataDateLabel: "Recipe data date",
    directoryKicker: "RECIPE DIRECTORY",
    calculationKicker: "CALCULATION MODEL",
    breadcrumbLabel: "Breadcrumb",
    catalogTitle: "Search crafting recipes",
    catalogDescription:
      "Filter by name, item ID, profession, grade, category, or mastery. Open a result to enter craft count, inventory, and unit prices without rebuilding every material row.",
    methodTitle: "How the calculation works",
    methodDescription:
      "The calculator applies traceable integer relationships only. It does not guess market prices, success rates, or an unpublished output quantity.",
    methodCards: [
      { title: "Direct materials", description: "The first-level inputs for the selected recipe, useful when intermediate items are already available." },
      { title: "Base materials", description: "The recipe chain expanded into base-material totals for planning from raw resources." },
      { title: "Shortage and cost", description: "Required minus owned gives the shortage; shortage times your unit price gives estimated cost." },
    ],
    customTitle: "Recipe not listed?",
    customDescription: "Use the custom planner for event materials, upgrade stages, or recipes that are not listed in the directory.",
    customAction: "Open custom material planner",
    faqTitle: "Crafting calculator FAQ",
    faqs: [
      {
        question: "Are these recipes official NC data?",
        answer:
          "Not entirely. Item identity, icons, grades, and categories are matched to NC's official catalog. Crafting relationships and quantities come from a dated community snapshot and are never labelled as official.",
      },
      {
        question: "Why enter craft count instead of desired output?",
        answer:
          "The available dataset has no verifiable output-per-craft field. To avoid assuming every craft yields one item, the tool calculates from craft count and asks you to confirm yield in game.",
      },
      {
        question: "What is the difference between direct and base materials?",
        answer:
          "Direct materials are the first-level recipe inputs. Base materials expand craftable intermediates into raw totals. Do not add the two modes together.",
      },
      {
        question: "Are inventory and prices uploaded?",
        answer:
          "No. Those inputs stay in this browser. Shared links include only the recipe, mode, and craft count—not inventory or price data.",
      },
    ],
    featureList: ["Recipe directory", "Direct and base material totals", "Inventory shortage and cost calculation"],
  },

  "zh-hans": {
    title: "AION2 制作配方与材料计算器",
    seoTitle: "AION2 制作配方与材料计算器｜需求、缺口与成本",
    kicker: "CRAFTING DATABASE / 制作规划",
    description:
      "搜索成品与制作专业，打开配方后依制作次数计算直接材料或基础材料的需求、当前库存缺口与自定义单价成本。",
    sourceLabel: "数据来源与更新",
    sourceSummary:
      "本目录先收录 894 笔明确标示制作专业的配方。物品名称、图标、品级与分类对照 NC 官方物品数据；配方关系与数量来自 2026-07-10 社区快照，改版后请以游戏内制作画面为准。",
    dataLanguageNotice: "简体中文物品名称会优先采用当前可核对的官方数据；未有官方译名的专名会保留来源语言。",
    recipesLabel: "配方",
    itemDataDateLabel: "物品数据日期",
    recipeDataDateLabel: "配方数据日期",
    directoryKicker: "配方目录",
    calculationKicker: "计算模型",
    breadcrumbLabel: "面包屑导览",
    catalogTitle: "搜索制作配方",
    catalogDescription:
      "可依名称、物品 ID、专业、品级、分类与熟练度筛选。选择成品后再输入制作次数、持有量和单价，不需要先手动建立每一种材料。",
    methodTitle: "计算方式",
    methodDescription:
      "计算器只处理可核对的整数关系，不推测市场行情、成功率或版本尚未公开的产量。",
    methodCards: [
      { title: "直接材料", description: "显示完成该配方时直接投入的材料，适合已经备妥中间制品的玩家。" },
      { title: "基础材料", description: "展开配方链后的基础材料总量，方便从原料开始准备。" },
      { title: "缺口与成本", description: "所需量减去持有量得到缺口；缺口乘以自定义单价得到估算成本。" },
    ],
    customTitle: "找不到配方？",
    customDescription: "可使用自定义计划器整理活动材料、强化阶段或目录中找不到的配方。",
    customAction: "打开自定义材料计划器",
    faqTitle: "制作计算器常见问题",
    faqs: [
      {
        question: "这些配方是 NC 官方数据吗？",
        answer:
          "不是全部。物品身份、图标、品级与分类对照 NC 官方物品目录；制作关系和数量来自标明日期的社区数据快照。本站不会把社区配方标成官方数据。",
      },
      {
        question: "为什么输入制作次数，而不是成品数量？",
        answer:
          "当前数据没有可核对的每次产量字段。为避免假设每次一定产出一件，工具直接以制作次数计算；请先依游戏内画面确认实际产量。",
      },
      {
        question: "直接材料和基础材料有什么差别？",
        answer:
          "直接材料是配方画面第一层投入项目；基础材料会把可制作的中间材料继续展开，两种模式不应相加。",
      },
      {
        question: "持有量和单价会上传吗？",
        answer:
          "不会。计算器把这些输入保存在当前浏览器中，分享链接只包含配方、模式与制作次数，不包含库存或价格。",
      },
    ],
    featureList: ["配方目录", "直接与基础材料总量", "库存缺口与成本计算"],
  },








  "de": {
    title: "AION2 Herstellungsrezepte und Materialrechner",
    seoTitle: "AION2 Materialrechner: Bedarf, Fehlmengen & Kosten",
    kicker: "HERSTELLUNGSDATENBANK / MATERIALPLANER",
    description:
      "Suchen Sie herstellbare Gegenstände und Berufe. Berechnen Sie anschließend direkte oder grundlegende Materialmengen, Fehlbestände und Kosten anhand eigener Stückpreise und der Herstellungsanzahl.",
    sourceLabel: "Quellen und Aktualisierung",
    sourceSummary:
      "Dieses Verzeichnis enthält zunächst 894 Rezepte mit zugeordnetem Herstellungsberuf. Gegenstandsnamen, Symbole, Qualitätsstufen und Kategorien sind mit den offiziellen Gegenstandsdaten von NC abgeglichen. Rezeptbeziehungen und Mengen stammen aus einem Community-Schnappschuss vom 10.07.2026; prüfen Sie sie nach einem Update im Spiel.",
    dataLanguageNotice: "Gegenstands- und Rezeptnamen verwenden die derzeit verfügbaren offiziellen Bezeichnungen oder die Bezeichnungen der Quelle. Die Bedienoberfläche ist vollständig lokalisiert.",
    recipesLabel: "Rezepte",
    itemDataDateLabel: "Datum der Gegenstandsdaten",
    recipeDataDateLabel: "Datum der Rezeptdaten",
    directoryKicker: "REZEPTVERZEICHNIS",
    calculationKicker: "BERECHNUNGSMODELL",
    breadcrumbLabel: "Brotkrümelnavigation",
    catalogTitle: "Herstellungsrezepte suchen",
    catalogDescription:
      "Filtern Sie nach Name, Gegenstands-ID, Beruf, Qualitätsstufe, Kategorie oder Fertigkeitsstufe. Öffnen Sie ein Ergebnis und geben Sie Herstellungsanzahl, Bestand und Stückpreise ein.",
    methodTitle: "Wie die Berechnung funktioniert",
    methodDescription:
      "Der Rechner verwendet nur nachvollziehbare ganzzahlige Beziehungen. Marktpreise, Erfolgsraten oder nicht veröffentlichte Ertragsmengen werden nicht geschätzt.",
    methodCards: [
      { title: "Direkte Materialien", description: "Die ersten Eingabeebenen für das ausgewählte Rezept, nützlich, wenn bereits Zwischenelemente verfügbar sind." },
      { title: "Grundstoffe", description: "Herstellbare Zwischenprodukte werden aufgelöst, um die Gesamtmenge der benötigten Rohstoffe zu zeigen." },
      { title: "Fehlmengen und Kosten", description: "Benötigte Menge minus Bestand ergibt die Fehlmenge; multipliziert mit dem Stückpreis ergibt sie die geschätzten Kosten." },
    ],
    customTitle: "Rezept nicht aufgeführt?",
    customDescription: "Verwenden Sie den benutzerdefinierten Planer für Ereignismaterialien, Upgrade-Stufen oder Rezepte, die nicht im Verzeichnis aufgeführt sind.",
    customAction: "Benutzerdefinierten Materialplaner öffnen",
    faqTitle: "Häufige Fragen zum Herstellungsrechner",
    faqs: [
      {
        question: "Sind diese Rezepte offizielle NC-Daten?",
        answer:
          "Nicht vollständig. Gegenstandsidentität, Symbole, Qualitätsstufen und Kategorien sind mit dem offiziellen NC-Katalog abgeglichen. Herstellungsbeziehungen und Mengen stammen aus einem datierten Community-Schnappschuss und werden nicht als offizielle Daten bezeichnet.",
      },
      {
        question: "Warum wird die Herstellungsanzahl statt der gewünschten Ausgabemenge eingegeben?",
        answer:
          "Der verfügbare Datensatz enthält keine überprüfbare Ertragsmenge pro Herstellung. Deshalb berechnet das Tool anhand der Herstellungsanzahl, ohne anzunehmen, dass jeder Vorgang genau einen Gegenstand erzeugt. Prüfen Sie den tatsächlichen Ertrag im Spiel.",
      },
      {
        question: "Was ist der Unterschied zwischen direkten und Basismaterialien?",
        answer:
          "Direkte Materialien sind die ersten Rezepteingaben. Grundstoffe expandieren handwerkliche Zwischenprodukte zu Rohsummen. Fügen Sie die beiden Modi nicht zusammen.",
      },
      {
        question: "Werden Inventar und Preise hochgeladen?",
        answer:
          "Nein. Diese Eingaben bleiben in diesem Browser. Gemeinsame Links enthalten nur Rezept, Modus und Herstellungsanzahl - keine Inventar- oder Preisdaten.",
      },
    ],
    featureList: ["Rezeptverzeichnis", "Gesamtmenge des Direkt- und Grundmaterials", "Bestandsengpässe und Kostenberechnung"],
  },
  "fr": {
    title: "AION2 Calculatrice de recettes et de matériaux",
    seoTitle: "Calculateur AION2 : matériaux, manques et coûts",
    kicker: "BASE DE DONNÉES DE FABRICATION / PLANIFICATEUR",
    description:
      "Recherchez des objets fabriqués et des métiers, puis calculez les matériaux directs ou de base, les manques en stock et les coûts selon vos prix unitaires et le nombre de fabrications.",
    sourceLabel: "Sources et mise à jour",
    sourceSummary:
      "Ce répertoire commence par 894 recettes qui identifient une profession artisanale. Les noms d'éléments, les icônes, les grades et les catégories sont appariés aux données officielles de NC. Les relations et les quantités de recettes utilisent un instantané communautaire daté de 2026-07-10; vérifiez-les dans le jeu après un patch.",
    dataLanguageNotice: "Les noms des articles et des recettes suivent les étiquettes officielles ou sources actuellement disponibles. L'interface est localisée séparément.",
    recipesLabel: "Recettes",
    itemDataDateLabel: "Date de la rubrique",
    recipeDataDateLabel: "Date de la recette",
    directoryKicker: "RÉPERTOIRE",
    calculationKicker: "MODÈLE DE CALCUL",
    breadcrumbLabel: "Fil d'Ariane",
    catalogTitle: "Rechercher des recettes de fabrication",
    catalogDescription:
      "Filtrez par nom, ID d’objet, métier, grade, catégorie ou maîtrise. Ouvrez un résultat pour saisir le nombre de fabrications, le stock et les prix unitaires.",
    methodTitle: "Comment fonctionne le calcul",
    methodDescription:
      "Le calculateur applique uniquement des relations entières traçables. Il n’estime ni les prix du marché, ni les taux de réussite, ni une quantité de production non publiée.",
    methodCards: [
      { title: "Matériaux directs", description: "Les entrées de premier niveau pour la recette sélectionnée, utiles lorsque des éléments intermédiaires sont déjà disponibles." },
      { title: "Matériaux de base", description: "Les produits intermédiaires fabricables sont décomposés pour obtenir le total des ressources brutes." },
      { title: "Manques et coûts", description: "Le besoin moins le stock donne le manque ; multiplié par le prix unitaire, il donne le coût estimé." },
    ],
    customTitle: "La recette n'est pas inscrite ?",
    customDescription: "Utilisez le planificateur personnalisé pour les matériaux d'événement, les étapes de mise à niveau ou les recettes qui ne sont pas listés dans le répertoire.",
    customAction: "Ouvrir le planificateur de matériaux personnalisé",
    faqTitle: "Questions fréquentes sur le calculateur de fabrication",
    faqs: [
      {
        question: "Ces recettes sont-elles des données officielles NC ?",
        answer:
          "Pas tout à fait. Identité des articles, icônes, grades et catégories sont appariés au catalogue officiel de NC. Les relations et les quantités d'fabrication proviennent d'un instantané communautaire daté et ne sont jamais étiquetées comme officielles.",
      },
      {
        question: "Pourquoi saisir le nombre de fabrications plutôt que la quantité souhaitée ?",
        answer:
          "Le jeu de données ne fournit pas de quantité vérifiable par fabrication. Pour ne pas supposer que chaque fabrication produit un objet, l’outil calcule selon le nombre de fabrications et vous demande de vérifier le rendement en jeu.",
      },
      {
        question: "Quelle est la différence entre les matériaux directs et les matériaux de base?",
        answer:
          "Les matières premières sont les intrants de la recette de premier niveau. Les matériaux de base étendent les intermédiaires artisanaux en totaux bruts. Ne pas ajouter les deux modes ensemble.",
      },
      {
        question: "Les stocks et les prix sont-ils téléchargés?",
        answer:
          "Non. Ces données restent dans ce navigateur. Les liens partagés incluent uniquement la recette, le mode et le nombre de fabrications, jamais le stock ni les prix.",
      },
    ],
    featureList: ["Répertoire des recettes", "Total des matières directes et des matières de base", "Manque d'inventaire et calcul des coûts"],
  },
  "es": {
    title: "AION2 Recetas de fabricación y calculadora de materiales",
    seoTitle: "Calculadora AION2: materiales, faltantes y costes",
    kicker: "BASE DE DATOS DE FABRICACIÓN / PLANIFICADOR DE MATERIALES",
    description:
      "Busca objetos fabricados y profesiones, y calcula materiales directos o base, faltantes de inventario y costes según tus precios unitarios y el número de fabricaciones.",
    sourceLabel: "Fuentes y actualización",
    sourceSummary:
      "Este directorio comienza con 894 recetas que identifican una profesión de arte. Los nombres de artículos, iconos, calificaciones y categorías se corresponden con los datos oficiales de los elementos de NC. Las relaciones y las cantidades de receta usan una instantánea comunitaria datada 2026-07-10; verifiquen en juego después de un parche.",
    dataLanguageNotice: "Los nombres de artículos y recetas siguen las etiquetas oficiales o de origen disponibles actualmente. La interfaz se localiza por separado.",
    recipesLabel: "Recetas",
    itemDataDateLabel: "Fecha de datos de objetos",
    recipeDataDateLabel: "Fecha de datos de recetas",
    directoryKicker: "DIRECTORIO DE RECETAS",
    calculationKicker: "MODELO DE CÁLCULO",
    breadcrumbLabel: "Migas de pan",
    catalogTitle: "Buscar recetas de fabricación",
    catalogDescription:
      "Filtra por nombre, ID de objeto, profesión, grado, categoría o maestría. Abre un resultado para introducir el número de fabricaciones, el inventario y los precios unitarios.",
    methodTitle: "Cómo funciona el cálculo",
    methodDescription:
      "La calculadora aplica relaciones de enteros trazables solamente. No se adivinan los precios del mercado, las tasas de éxito o una cantidad de salida inédita.",
    methodCards: [
      { title: "Materiales directos", description: "Los insumos de primer nivel para la receta seleccionada, útiles cuando ya se dispone de artículos intermedios." },
      { title: "Materiales base", description: "Los productos intermedios fabricables se desglosan para obtener el total de recursos básicos." },
      { title: "Faltantes y costes", description: "La cantidad necesaria menos el inventario da el faltante; al multiplicarlo por el precio unitario se obtiene el coste estimado." },
    ],
    customTitle: "¿No hay receta?",
    customDescription: "Utilice el planificador personalizado para materiales de evento, etapas de actualización o recetas que no están listadas en el directorio.",
    customAction: "Abrir el planificador de materiales personalizado",
    faqTitle: "Preguntas frecuentes sobre la calculadora de fabricación",
    faqs: [
      {
        question: "¿Son estos datos oficiales de NC?",
        answer:
          "No del todo. La identidad de elementos, iconos, grados y categorías se corresponden con el catálogo oficial de NC. Las relaciones y las cantidades de la fabricación provienen de una instantánea de la comunidad fechada y nunca se etiquetan como oficiales.",
      },
      {
        question: "¿Por qué entrar en la cuenta de fabricación en lugar de la salida deseada?",
        answer:
          "El conjunto de datos no incluye una cantidad verificable por fabricación. Para no asumir que cada proceso produce un objeto, la herramienta calcula según el número de fabricaciones y te pide confirmar el rendimiento en el juego.",
      },
      {
        question: "¿Cuál es la diferencia entre los materiales directos y básicos?",
        answer:
          "Los materiales directos son los insumos de recetas de primer nivel. Las materias base expanden los intermediarios artesanales en totales brutos. No agregue los dos modos juntos.",
      },
      {
        question: "¿Se cargan inventarios y precios?",
        answer:
          "No. Esas entradas permanecen en este navegador. Los enlaces compartidos incluyen sólo la receta, el modo y el recuento de fabricaciones, no datos de inventario o precio.",
      },
    ],
    featureList: ["Directorio de recetas", "Totales de materiales directos y base", "Faltantes de inventario y cálculo de costes"],
  },
  "ja": {
    title: "AION2 製作レシピ・材料計算機",
    seoTitle: "AION2 製作計算機｜材料必要量・不足・費用",
    kicker: "製作データベース／材料プランナー",
    description:
      "完成品や製作職を検索し、製作回数に応じた直接材料または基礎材料の必要量、所持数の不足、入力単価による費用を計算します。",
    sourceLabel: "出典と更新情報",
    sourceSummary:
      "この一覧には製作職が明記された894件のレシピを収録しています。アイテム名、アイコン、グレード、カテゴリはNC公式アイテムデータと照合し、レシピの関係と数量は2026-07-10時点のコミュニティスナップショットを使用しています。アップデート後はゲーム内で再確認してください。",
    dataLanguageNotice: "アイテム名とレシピ名は、現在確認できる公式表記または出典の表記を使用しています。周辺の操作画面は日本語化済みです。",
    recipesLabel: "レシピ",
    itemDataDateLabel: "アイテムデータ日",
    recipeDataDateLabel: "レシピデータ日",
    directoryKicker: "レシピ一覧",
    calculationKicker: "計算方法",
    breadcrumbLabel: "パンくずリスト",
    catalogTitle: "製作レシピを検索",
    catalogDescription:
      "名前、アイテムID、製作職、グレード、カテゴリ、熟練度で絞り込めます。レシピを開き、製作回数、所持数、単価を入力してください。",
    methodTitle: "計算方法",
    methodDescription:
      "確認できる整数の関係だけを計算します。市場価格、成功率、未公開の製作量は推測しません。",
    methodCards: [
      { title: "直接材料", description: "選択したレシピへ直接投入する第1階層の材料です。中間製作品をすでに用意している場合に適しています。" },
      { title: "基礎材料", description: "製作可能な中間材料を展開し、原材料から準備するための基礎材料合計を示します。" },
      { title: "不足と費用", description: "必要数から所持数を引いて不足数を求め、不足数に入力単価を掛けて推定費用を計算します。" },
    ],
    customTitle: "レシピが見つかりませんか？",
    customDescription: "イベント材料、強化段階、一覧にないレシピはカスタムプランナーで整理できます。",
    customAction: "カスタム材料プランナーを開く",
    faqTitle: "製作計算機のよくある質問",
    faqs: [
      {
        question: "これらのレシピはNC公式データですか？",
        answer:
          "すべてが公式データではありません。アイテム、アイコン、グレード、カテゴリはNC公式一覧と照合していますが、製作関係と数量は日付付きのコミュニティスナップショットであり、公式データとして表示しません。",
      },
      {
        question: "希望個数ではなく製作回数を入力するのはなぜですか？",
        answer:
          "利用可能なデータには確認可能な1回あたりの製作量がありません。毎回1個できると仮定せず、製作回数から計算します。実際の製作量はゲーム内で確認してください。",
      },
      {
        question: "直接材料と基礎材料の違いは何ですか？",
        answer:
          "直接材料はレシピの第1階層の投入物です。基礎材料は製作可能な中間材料を原材料まで展開した合計です。2つのモードを合算しないでください。",
      },
      {
        question: "所持数と単価は送信されますか？",
        answer:
          "送信されません。入力値はこのブラウザ内だけに保存されます。共有リンクにはレシピ、モード、製作回数だけが含まれ、所持数と価格は含まれません。",
      },
    ],
    featureList: ["レシピ一覧", "直接材料と基礎材料の合計", "所持数の不足と費用計算"],
  },
  "pt-br": {
    title: "AION2 Receitas de fabricação e calculadora de materiais",
    seoTitle: "Calculadora de fabricação AION2: Materiais, Escassez e Custo",
    kicker: "BANCO DE DADOS DE FABRICAÇÃO / PLANEJADOR DE MATERIAIS",
    description:
      "Busque itens fabricados e profissões, depois calcule materiais diretos ou de base, faltantes no estoque e custos conforme seus preços unitários e o número de fabricações.",
    sourceLabel: "Fontes e atualização",
    sourceSummary:
      "Este diretório começa com 894 receitas que identificam uma profissão de fabricação. Nomes, ícones, graus e categorias dos itens foram comparados com os dados oficiais da NC. As relações e quantidades das receitas usam um instantâneo da comunidade de 10/07/2026; confira-as no jogo após uma atualização.",
    dataLanguageNotice: "Nomes de itens e receitas seguem as etiquetas oficiais ou de origem disponíveis atualmente. A interface é localizada separadamente.",
    recipesLabel: "Receitas",
    itemDataDateLabel: "Data de dados do item",
    recipeDataDateLabel: "Data de dados da receita",
    directoryKicker: "LISTA DE RECEITAS",
    calculationKicker: "MODELO DE CÁLCULO",
    breadcrumbLabel: "Navegação estrutural",
    catalogTitle: "Buscar receitas de fabricação",
    catalogDescription:
      "Filtre por nome, ID do item, profissão, grau, categoria ou proficiência. Abra um resultado para informar o número de fabricações, o estoque e os preços unitários.",
    methodTitle: "Como funciona o cálculo",
    methodDescription:
      "A calculadora aplica apenas relações inteiras rastreáveis. Não adivinha preços de mercado, taxas de sucesso, ou uma quantidade de produção não publicada.",
    methodCards: [
      { title: "Materiais diretos", description: "As entradas de primeiro nível para a receita selecionada, úteis quando itens intermediários já estão disponíveis." },
      { title: "Materiais de base", description: "Produtos intermediários fabricáveis são decompostos para mostrar o total de recursos básicos." },
      { title: "Faltantes e custos", description: "A quantidade necessária menos o estoque resulta no faltante; multiplicado pelo preço unitário, ele fornece o custo estimado." },
    ],
    customTitle: "A receita não está na lista?",
    customDescription: "Use o planejador personalizado para materiais de eventos, etapas de atualização ou receitas que não estão listadas no diretório.",
    customAction: "Abrir o planejador de materiais personalizado",
    faqTitle: "Perguntas frequentes sobre fabricação",
    faqs: [
      {
        question: "Estas receitas são dados oficiais do NC?",
        answer:
          "Não inteiramente. Identidade de item, ícones, notas e categorias são correspondentes ao catálogo oficial do NC. As relações de criação e as quantidades vêm de um instantâneo datado da comunidade e nunca são rotulados como oficiais.",
      },
      {
        question: "Por que entrar na contagem de fabricações em vez da saída desejada?",
        answer:
          "O conjunto de dados disponível não tem campo de saída por fabricação verificável. Para evitar assumir que cada fabricação produz um item, a ferramenta calcula a partir da contagem de fabricações e pede para confirmar o rendimento no jogo.",
      },
      {
        question: "Qual é a diferença entre materiais diretos e materiais de base?",
        answer:
          "Materiais diretos são os insumos de receita de primeiro nível. Os materiais de base expandem os intermediários fabricáveis em totais brutos. Não adicione os dois modos juntos.",
      },
      {
        question: "O inventário e os preços são carregados?",
        answer:
          "Não. Esses dados ficam neste navegador. Os links compartilhados incluem apenas a receita, o modo e o número de fabricações, nunca o estoque ou os preços.",
      },
    ],
    featureList: ["Lista de receitas", "Total de materiais de base e diretos", "Escassez de inventário e cálculo de custos"],
  },
  "ru": {
    title: "AION2 — рецепты изготовления и калькулятор материалов",
    seoTitle: "Калькулятор AION2: материалы, дефицит и стоимость",
    kicker: "БАЗА РЕЦЕПТОВ / ПЛАНИРОВЩИК МАТЕРИАЛОВ",
    description:
      "Ищите изготавливаемые предметы и профессии, затем рассчитывайте прямые и базовые материалы, нехватку запасов и стоимость по заданным ценам и количеству изготовлений.",
    sourceLabel: "Источники и обновление",
    sourceSummary:
      "Каталог начинается с 894 рецептов с указанной профессией изготовления. Названия, значки, категории качества и категории предметов сопоставлены с официальными данными NC. Связи и количества в рецептах взяты из снимка сообщества от 10.07.2026; после обновлений проверяйте их в игре.",
    dataLanguageNotice: "Названия предметов и рецептов используют доступные официальные обозначения или обозначения источника. Интерфейс локализован отдельно.",
    recipesLabel: "Рецепты",
    itemDataDateLabel: "Дата данных предметов",
    recipeDataDateLabel: "Дата данных рецептов",
    directoryKicker: "КАТАЛОГ РЕЦЕПТОВ",
    calculationKicker: "МОДЕЛЬ РАСЧЕТА",
    breadcrumbLabel: "Навигационная цепочка",
    catalogTitle: "Поиск рецептов изготовления",
    catalogDescription:
      "Фильтруйте по названию, ID предмета, профессии, категории качества, категории или мастерству. Откройте результат, чтобы указать количество изготовлений, запас и цены за единицу.",
    methodTitle: "Как работает расчет",
    methodDescription:
      "Калькулятор применяет только прослеживаемые целочисленные отношения. Он не угадывает рыночные цены, показатели успеха или неопубликованное количество продукции.",
    methodCards: [
      { title: "Прямые материалы", description: "Входные данные первого уровня для выбранного рецепта, полезные, когда промежуточные элементы уже доступны." },
      { title: "Базовые материалы", description: "Изготавливаемые промежуточные изделия раскладываются до общего количества исходных ресурсов." },
      { title: "Нехватка и стоимость", description: "Требуемое количество минус запас дает нехватку; умножение на цену за единицу дает примерную стоимость." },
    ],
    customTitle: "Рецепт не указан?",
    customDescription: "Используйте пользовательский планировщик для материалов для мероприятий, этапов обновления или рецептов, которые не перечислены в каталоге.",
    customAction: "Открыть пользовательский планировщик материалов",
    faqTitle: "Частые вопросы о калькуляторе изготовления",
    faqs: [
      {
        question: "Являются ли эти рецепты официальными данными NC?",
        answer:
          "Не полностью. Идентификаторы, значки, категории качества и категории предметов сопоставлены с официальным каталогом NC. Связи и количества для изготовления взяты из датированного снимка сообщества и не обозначаются как официальные данные.",
      },
      {
        question: "Почему вводится количество изготовлений, а не желаемый результат?",
        answer:
          "В наборе данных нет проверяемого количества результата за одно изготовление. Поэтому инструмент рассчитывает по количеству изготовлений и не предполагает, что каждый процесс дает ровно один предмет. Проверьте фактический результат в игре.",
      },
      {
        question: "В чем разница между прямыми и базовыми материалами?",
        answer:
          "Прямые материалы являются входами рецепта первого уровня. Базовые материалы расширяют ремесленные промежуточные продукты в сырые итоговые показатели. Не добавляйте два режима вместе.",
      },
      {
        question: "Загружены ли запасы и цены?",
        answer:
          "Нет. Эти входные данные остаются в этом браузере. Общие ссылки включают только рецепт, режим и количество ремесел, а не данные о запасах или ценах.",
      },
    ],
    featureList: ["Каталог рецептов", "Общие прямые и базовые материалы", "Нехватка запасов и расчет расходов"],
  },
  ko: {
    title: "AION2 제작 레시피 및 재료 계산기",
    seoTitle: "AION2 제작 계산기｜재료 필요량·부족분·비용",
    kicker: "CRAFTING DATABASE / 제작 계획",
    description:
      "제작 아이템과 전문 기술을 검색한 뒤 제작 횟수에 따라 직접 또는 기본 재료의 필요량, 보유량 부족분과 사용자 입력 단가 비용을 계산하세요.",
    sourceLabel: "출처 및 업데이트",
    sourceSummary:
      "이 목록은 제작 전문 기술이 명시된 894개 레시피부터 제공합니다. 아이템 이름, 아이콘, 등급과 분류는 NC 공식 아이템 자료와 대조했으며 레시피 관계와 수량은 2026-07-10 커뮤니티 스냅샷이므로 패치 후 게임에서 다시 확인하세요.",
    dataLanguageNotice: "한국어 아이템 이름은 확인 가능한 공식 자료를 우선 사용하며, 공식 번역이 없는 고유명사는 출처 언어를 유지합니다.",
    recipesLabel: "레시피",
    itemDataDateLabel: "아이템 정보 날짜",
    recipeDataDateLabel: "레시피 정보 날짜",
    directoryKicker: "레시피 목록",
    calculationKicker: "계산 방식",
    breadcrumbLabel: "이동 경로",
    catalogTitle: "제작 레시피 검색",
    catalogDescription:
      "이름, 아이템 ID, 전문 기술, 등급, 분류와 숙련도로 필터링할 수 있습니다. 결과를 열고 제작 횟수, 보유량과 단가를 입력하세요.",
    methodTitle: "계산 방식",
    methodDescription:
      "확인 가능한 정수 관계만 계산하며 거래소 시세, 성공률 또는 공개되지 않은 제작 수량을 추측하지 않습니다.",
    methodCards: [
      { title: "직접 재료", description: "선택한 레시피에 바로 투입되는 1단계 재료입니다. 중간 재료가 준비되어 있을 때 사용하세요." },
      { title: "기본 재료", description: "제작 가능한 중간 재료를 펼쳐 원재료 기준 총량으로 보여 줍니다." },
      { title: "부족분과 비용", description: "필요량에서 보유량을 뺀 값이 부족분이며, 부족분과 입력 단가를 곱해 예상 비용을 계산합니다." },
    ],
    customTitle: "레시피를 찾을 수 없나요?",
    customDescription: "이벤트 재료, 강화 단계 또는 목록에서 찾을 수 없는 레시피는 사용자 정의 계획기로 정리하세요.",
    customAction: "사용자 정의 재료 계획기 열기",
    faqTitle: "제작 계산기 자주 묻는 질문",
    faqs: [
      {
        question: "모든 레시피가 NC 공식 데이터인가요?",
        answer:
          "아닙니다. 아이템 정보, 아이콘, 등급과 분류는 NC 공식 목록과 대조했지만 제작 관계와 수량은 날짜가 표시된 커뮤니티 스냅샷입니다. 커뮤니티 데이터를 공식으로 표시하지 않습니다.",
      },
      {
        question: "왜 목표 수량 대신 제작 횟수를 입력하나요?",
        answer:
          "현재 자료에는 검증 가능한 1회 제작 산출량 필드가 없습니다. 매번 1개가 나온다고 가정하지 않기 위해 제작 횟수를 기준으로 계산하며 실제 산출량은 게임에서 확인해야 합니다.",
      },
      {
        question: "직접 재료와 기본 재료의 차이는 무엇인가요?",
        answer:
          "직접 재료는 레시피의 첫 단계 투입물이고 기본 재료는 제작 가능한 중간 재료를 원재료까지 펼친 값입니다. 두 모드의 수량을 합산하면 안 됩니다.",
      },
      {
        question: "보유량과 단가가 서버에 업로드되나요?",
        answer:
          "아닙니다. 입력값은 현재 브라우저에만 저장됩니다. 공유 링크에는 레시피, 모드와 제작 횟수만 포함되고 보유량과 가격은 포함되지 않습니다.",
      },
    ],
    featureList: ["레시피 목록", "직접 및 기본 재료 합계", "보유량 부족분 및 비용 계산"],
  },
};

const communityRecipeSourceLabel: Record<SiteLocale, string> = {
  "zh-hant": "查看 AION2Hub 社群配方快照",
  en: "Open the AION2Hub community recipe snapshot",
  "zh-hans": "查看 AION2Hub 社区配方快照",
  de: "AION2Hub-Community-Rezeptstand öffnen",
  fr: "Voir l’instantané communautaire AION2Hub",
  es: "Ver la instantánea comunitaria de AION2Hub",
  ja: "AION2Hub のコミュニティレシピスナップショットを見る",
  "pt-br": "Ver o snapshot comunitário de receitas do AION2Hub",
  ru: "Открыть снимок рецептов сообщества AION2Hub",
  ko: "AION2Hub 커뮤니티 제작법 스냅샷 보기",
};

const COMMUNITY_RECIPE_SOURCE_URL = "https://aion2hub.com/";

function requireLocale(value: string): SiteLocale {
  if (!isSiteLocale(value)) notFound();
  return value;
}

function initialPage(value: string | string[] | undefined) {
  const input = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(input ?? "1", 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const text = copy[locale];
  const path = "/tools/material-calculator/";
  const description = buildSeoDescription(text.description, locale, "tool:material-calculator");

  return buildStaticRouteMetadata({
    locale,
    path,
    title: text.seoTitle,
    description,
    imageAlt: text.title,
  });
}

export default async function MaterialCalculatorPage({ params, searchParams }: Props) {
  const locale = requireLocale((await params).locale);
  const dataLocale = siteLocaleConfig[locale].contentFallbackLocale;
  const text = copy[locale];
  const page = initialPage((await searchParams)?.page);
  const path = "/tools/material-calculator/";
  const canonicalPath = localizedHref(locale, path);
  const siteOrigin = await getRequestSiteOrigin();
  const canonicalUrl = absoluteSiteUrl(canonicalPath, siteOrigin);
  const toolsUrl = absoluteSiteUrl(getSectionHref(locale, "tools"), siteOrigin);
  const homeUrl = absoluteSiteUrl(getSectionHref(locale, "home"), siteOrigin);
  const publishedRecipes = getCraftingDirectoryEntries(dataLocale).filter(
    (entry) => entry.professionCode !== null && entry.masteryLevel !== null,
  );
  const entries: CraftingDirectoryEntry[] = publishedRecipes.map((entry) => ({
    recipeId: entry.recipeId,
    outputItemId: entry.outputItemId,
    name: entry.name,
    imageUrl: entry.imageUrl,
    gradeName: entry.gradeName,
    categoryName: entry.categoryName,
    profession: entry.professionName ?? "",
    masteryLevel: entry.masteryLevel,
  }));
  const total = entries.length;
  const officialDate = craftingCatalogManifest.provenance.itemIdentity.snapshotDate;
  const snapshotDate = craftingCatalogManifest.provenance.recipeRelationships.snapshotDate ?? "2026-07-10";
  const hub = toolHubCopy[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: text.title,
        description: text.description,
        inLanguage: siteLocaleConfig[locale].code,
        dateModified: officialDate,
        citation: COMMUNITY_RECIPE_SOURCE_URL,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: total,
          itemListElement: entries.slice(0, 24).map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: entry.name,
            url: absoluteSiteUrl(
              localizedHref(locale, `/tools/material-calculator/recipe/${entry.recipeId}/`),
              siteOrigin,
            ),
          })),
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#application`,
        name: text.title,
        url: canonicalUrl,
        description: text.description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        inLanguage: siteLocaleConfig[locale].code,
        isBasedOn: COMMUNITY_RECIPE_SOURCE_URL,
        featureList: text.featureList,
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: text.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteShellCopy[locale].navigation.home, item: homeUrl },
          { "@type": "ListItem", position: 2, name: hub.breadcrumb, item: toolsUrl },
          { "@type": "ListItem", position: 3, name: text.title, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className={toolsStyles.main} id="main-content">
      <section aria-labelledby="crafting-title" className={`${toolsStyles.hero} ${toolsStyles.detailHero}`}>
        <div className={`shell ${toolsStyles.shell}`}>
          <nav className={toolsStyles.breadcrumbs} aria-label={text.breadcrumbLabel}>
            <ol>
              <li><a href={getSectionHref(locale, "home")}>{siteShellCopy[locale].navigation.home}</a></li>
              <li aria-hidden="true">/</li>
              <li><a href={getSectionHref(locale, "tools")}>{hub.breadcrumb}</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{text.title}</li>
            </ol>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={toolsStyles.kicker}>{text.kicker}</p>
              <h1 className={styles.pageTitle} id="crafting-title">{text.title}</h1>
              <p className={styles.lead}>{text.description}</p>
            </div>
            <dl className={styles.heroStats}>
              <div><dt>{text.recipesLabel}</dt><dd>{total.toLocaleString(siteLocaleConfig[locale].code)}</dd></div>
              <div><dt>{text.itemDataDateLabel}</dt><dd>{officialDate}</dd></div>
              <div><dt>{text.recipeDataDateLabel}</dt><dd>{snapshotDate}</dd></div>
            </dl>
          </div>
          <div className={styles.sourceNotice}>
            <strong>{text.sourceLabel}</strong>
            <span>
              {text.sourceSummary} {text.dataLanguageNotice}{" "}
              <a
                href={COMMUNITY_RECIPE_SOURCE_URL}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {communityRecipeSourceLabel[locale]}
              </a>
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="crafting-directory-title" className={styles.catalogSection}>
        <div className="shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className={toolsStyles.kicker}>{text.directoryKicker}</p>
              <h2 id="crafting-directory-title">{text.catalogTitle}</h2>
            </div>
            <p>{text.catalogDescription}</p>
          </div>
          <CraftingDirectory entries={entries} initialPage={page} locale={locale} />
        </div>
      </section>

      <section aria-labelledby="crafting-method-title" className={styles.methodSection}>
        <div className="shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className={toolsStyles.kicker}>{text.calculationKicker}</p>
              <h2 id="crafting-method-title">{text.methodTitle}</h2>
            </div>
            <p>{text.methodDescription}</p>
          </div>
          <div className={styles.methodCards}>
            {text.methodCards.map((card, index) => (
              <article key={card.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
          <aside className={styles.customPlanner}>
            <div><h2>{text.customTitle}</h2><p>{text.customDescription}</p></div>
            <a href={localizedHref(locale, "/tools/material-calculator/custom/")}>{text.customAction}<span aria-hidden="true">↗</span></a>
          </aside>
        </div>
      </section>

      <section aria-labelledby="crafting-faq-title" className={styles.faqSection}>
        <div className="shell">
          <p className={toolsStyles.kicker}>FAQ</p>
          <h2 id="crafting-faq-title">{text.faqTitle}</h2>
          <div className={styles.faqList}>
            {text.faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label={hub.detailLanguages} className={toolsStyles.languageLinks}>
        <div className="shell">
          <span>{hub.detailLanguages}</span>
          {siteLocales.map((targetLocale) => (
            <a
              aria-current={targetLocale === locale ? "page" : undefined}
              href={localizedHref(targetLocale, path)}
              hrefLang={siteLocaleConfig[targetLocale].hrefLang}
              key={targetLocale}
            >
              {siteLocaleConfig[targetLocale].label}
            </a>
          ))}
          <a className={toolsStyles.backLink} href={getSectionHref(locale, "tools")}>{hub.backToTools}</a>
        </div>
      </nav>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</gu, "\\u003c") }}
        type="application/ld+json"
      />
    </main>
  );
}
