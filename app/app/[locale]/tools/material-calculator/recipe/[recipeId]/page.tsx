import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CraftingRecipeCalculator } from "@/app/_components/tools/CraftingRecipeCalculator";
import toolsStyles from "@/app/_components/tools/tools.module.css";
import {
  craftingCatalogManifest,
  getCraftingRecipe,
  type LocalizedCraftingRecipe,
} from "@/app/crafting-catalog";
import {
  getLanguageAlternates,
  getSectionHref,
  isSiteLocale,
  localizedHref,
  siteLocaleConfig,
  siteLocales,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";
import { toolHubCopy } from "@/app/tool-registry";

import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string; recipeId: string }> };

type PageCopy = {
  catalog: string;
  titleSuffix: string;
  description: (recipe: LocalizedCraftingRecipe) => string;
  sourceTitle: string;
  sourceBody: string;
  dataLanguageNotice: string;
  recipeNotesKicker: string;
  breadcrumbLabel: string;
  sourceLink: string;
  officialItem: string;
  relationCount: string;
  direct: string;
  base: string;
  intermediate: string;
  outputWarning: string;
  languageLabel: string;
  back: string;
  featureList: readonly string[];
};

const copy: Record<SiteLocale, PageCopy> = {
  "zh-hant": {
    catalog: "製作配方",
    titleSuffix: "材料計算器",
    description: (recipe) =>
      `計算 ${recipe.name} 的直接材料、基礎材料、庫存缺口與自訂單價成本；製作專業為 ${recipe.professionName ?? "資料未標示"}。`,
    sourceTitle: "配方資料說明",
    sourceBody:
      "物品名稱、圖示、品級與分類對照 NC 官方物品資料；配方關係和數量來自 2026-07-10 社群快照。改版後請以遊戲內製作畫面核對。",
    dataLanguageNotice: "繁體中文物品與材料名稱會優先採用目前可核對的官方資料；未有官方譯名的專名會保留來源語言。",
    recipeNotesKicker: "配方資料",
    breadcrumbLabel: "麵包屑導覽",
    sourceLink: "查看社群來源頁",
    officialItem: "查看官方物品資料",
    relationCount: "材料關係",
    direct: "直接",
    base: "基礎",
    intermediate: "中間製品",
    outputWarning: "來源沒有標示單次產量，因此本頁依製作次數計算；請先在遊戲內確認每次實際產量。",
    languageLabel: "切換此配方語言",
    back: "返回製作配方目錄",
    featureList: ["直接材料", "基礎材料", "庫存缺口", "自訂單價成本"],
  },
  en: {
    catalog: "Crafting recipes",
    titleSuffix: "material calculator",
    description: (recipe) =>
      `Calculate direct materials, base materials, inventory shortages, and custom-price costs for ${recipe.name}; profession: ${recipe.professionName ?? "not stated"}.`,
    sourceTitle: "Recipe information",
    sourceBody:
      "Item names, icons, grades, and categories are matched to NC's official item data. Recipe relationships and quantities use a community snapshot dated 2026-07-10. Verify them in game after a patch.",
    dataLanguageNotice: "Item and material names follow the currently available official or source labels. The calculator interface is localized separately.",
    recipeNotesKicker: "RECIPE NOTES",
    breadcrumbLabel: "Breadcrumb",
    sourceLink: "View community source page",
    officialItem: "Open official item record",
    relationCount: "Material relationships",
    direct: "Direct",
    base: "Base",
    intermediate: "Intermediate",
    outputWarning: "The source does not state output per craft, so this page calculates by craft count. Confirm the actual yield in game first.",
    languageLabel: "Change recipe language",
    back: "Back to crafting recipes",
    featureList: ["Direct materials", "Base materials", "Inventory shortage", "Custom unit-price cost"],
  },

  "zh-hans": {
    catalog: "制作配方",
    titleSuffix: "材料计算器",
    description: (recipe) =>
      `计算 ${recipe.name} 的直接材料、基础材料、库存缺口与自定义单价成本；制作专业为 ${recipe.professionName ?? "数据未标示"}。`,
    sourceTitle: "配方数据说明",
    sourceBody:
      "物品名称、图标、品级与分类对照 NC 官方物品数据；配方关系和数量来自 2026-07-10 社区快照。改版后请以游戏内制作画面核对。",
    dataLanguageNotice: "简体中文物品与材料名称会优先采用当前可核对的官方数据；未有官方译名的专名会保留来源语言。",
    recipeNotesKicker: "配方数据",
    breadcrumbLabel: "面包屑导览",
    sourceLink: "查看社区来源页",
    officialItem: "查看官方物品数据",
    relationCount: "材料关系",
    direct: "直接",
    base: "基础",
    intermediate: "中间制品",
    outputWarning: "来源没有标示单次产量，因此本页依制作次数计算；请先在游戏内确认每次实际产量。",
    languageLabel: "切换此配方语言",
    back: "返回制作配方目录",
    featureList: ["直接材料", "基础材料", "库存缺口", "自定义单价成本"],
  },








  "de": {
    catalog: "Herstellungsrezepte",
    titleSuffix: "Materialrechner",
    description: (recipe) =>
      `Berechnen Sie direkte Materialien, Basismaterialien, Lagermangel und kundenspezifische Preiskosten für ${recipe.name}; Beruf: ${recipe.professionName ?? "nicht angegeben"}.`,
    sourceTitle: "Rezeptinformationen",
    sourceBody:
      "Artikelnamen, Symbole, Noten und Kategorien werden mit den offiziellen Artikeldaten von NC abgeglichen. Rezeptbeziehungen und -mengen verwenden einen community-snapshot mit dem datum 2026-07-10. Überprüfen Sie sie im Spiel nach einem Patch.",
    dataLanguageNotice: "Artikel- und Materialnamen folgen den derzeit verfügbaren offiziellen oder Quelletiketten. Die Rechnerschnittstelle wird separat lokalisiert.",
    recipeNotesKicker: "REZEPTANMERKUNGEN",
    breadcrumbLabel: "Brotkrümelnavigation",
    sourceLink: "Community-Quellseite ansehen",
    officialItem: "Offiziellen Gegenstandseintrag öffnen",
    relationCount: "Materialbeziehungen",
    direct: "Direkt",
    base: "Basis",
    intermediate: "Zwischenprodukt",
    outputWarning: "Die Quelle gibt die Ausgabe nicht pro Handwerk an, daher berechnet diese Seite nach Handwerkszahl. Bestätigen Sie zuerst den tatsächlichen Ertrag im Spiel.",
    languageLabel: "Sprache dieses Rezepts ändern",
    back: "Zurück zu den Rezepten für die Herstellung",
    featureList: ["Direkte Materialien", "Grundstoffe", "Bestandsmangel", "Benutzerdefinierter Stückpreis"],
  },
  "fr": {
    catalog: "Recettes de fabrication",
    titleSuffix: "calculateur de matériaux",
    description: (recipe) =>
      `Calculer les matériaux directs, les matériaux de base, les pénuries d'inventaire et les coûts sur mesure pour ${recipe.name}; profession: ${recipe.professionName ?? "non précisé"}.`,
    sourceTitle: "Recette",
    sourceBody:
      "Les noms d'éléments, les icônes, les grades et les catégories sont appariés aux données officielles de NC. Les relations et les quantités de recettes utilisent un instantané communautaire daté de 2026-07-10. Vérifiez-les dans le jeu après un patch.",
    dataLanguageNotice: "Les noms des articles et des matériaux sont conformes aux étiquettes officielles ou sources actuellement disponibles. L'interface de calculateur est localisée séparément.",
    recipeNotesKicker: "NOTES DE RECETTE",
    breadcrumbLabel: "Fil d'Ariane",
    sourceLink: "Voir la page source de la communauté",
    officialItem: "Ouvrir le dossier officiel",
    relationCount: "Relations matérielles",
    direct: "Direct",
    base: "Base",
    intermediate: "Intermédiaire",
    outputWarning: "La source n’indique pas la quantité produite par fabrication. Cette page calcule donc selon le nombre de fabrications. Vérifiez d’abord le rendement réel en jeu.",
    languageLabel: "Changer la langue de cette recette",
    back: "Retour aux recettes de fabrication",
    featureList: ["Matériaux directs", "Matériaux de base", "Manque en stock", "Prix unitaire personnalisé"],
  },
  "es": {
    catalog: "Recetas de fabricación",
    titleSuffix: "calculadora de materiales",
    description: (recipe) =>
      `Calcular materiales directos, materiales básicos, escasez de inventarios y costos de precio personalizado para ${recipe.name}; profesión: ${recipe.professionName ?? "no declarado"}.`,
    sourceTitle: "Información sobre las recetas",
    sourceBody:
      "Los nombres de artículos, iconos, calificaciones y categorías se corresponden con los datos oficiales de los elementos de NC. Las relaciones y las cantidades de receta usan una instantánea comunitaria de 2026-07-10. Verifiquen en el juego después de un parche.",
    dataLanguageNotice: "Los nombres de artículos y materiales siguen las etiquetas oficiales o de origen disponibles actualmente. La interfaz de calculadora se localiza por separado.",
    recipeNotesKicker: "NOTAS DE LA RECETA",
    breadcrumbLabel: "Migas de pan",
    sourceLink: "Ver la página de la fuente comunitaria",
    officialItem: "Abrir la ficha oficial del objeto",
    relationCount: "Relaciones materiales",
    direct: "Directo",
    base: "Base",
    intermediate: "Intermediato",
    outputWarning: "La fuente no indica la cantidad producida por fabricación, así que esta página calcula según el número de fabricaciones. Confirma primero el rendimiento real en el juego.",
    languageLabel: "Cambiar el idioma de esta receta",
    back: "Volver a las recetas de fabricación",
    featureList: ["Materiales directos", "Materiales base", "Faltantes de inventario", "Precio unitario personalizado"],
  },
  "ja": {
    catalog: "製作レシピ",
    titleSuffix: "材料計算機",
    description: (recipe) =>
      `${recipe.name}の直接材料、基礎材料、所持数の不足、入力単価による費用を計算します。製作職：${recipe.professionName ?? "情報なし"}。`,
    sourceTitle: "レシピ情報",
    sourceBody:
      "アイテム名、アイコン、グレード、カテゴリはNC公式アイテムデータと照合しています。レシピの関係と数量は2026-07-10時点のコミュニティスナップショットを使用しています。アップデート後はゲーム内で再確認してください。",
    dataLanguageNotice: "アイテム名と材料名は、現在確認できる公式表記または出典の表記を使用しています。計算機の操作画面は日本語化済みです。",
    recipeNotesKicker: "レシピ資料",
    breadcrumbLabel: "パンくずリスト",
    sourceLink: "コミュニティ出典ページを見る",
    officialItem: "公式アイテム情報を開く",
    relationCount: "材料関係",
    direct: "直接",
    base: "基礎",
    intermediate: "中間製作品",
    outputWarning: "出典に1回あたりの製作量がないため、製作回数を基準に計算します。実際の製作量はゲーム内で先に確認してください。",
    languageLabel: "このレシピの言語を変更",
    back: "製作レシピ一覧へ戻る",
    featureList: ["直接材料", "基礎材料", "所持数の不足", "入力単価による費用"],
  },
  "pt-br": {
    catalog: "Receitas de fabricação",
    titleSuffix: "calculadora de material",
    description: (recipe) =>
      `Calcule materiais diretos, materiais de base, escassez de estoque e custos customizados para ${recipe.name}; profissão: ${recipe.professionName ?? "não indicado"}.`,
    sourceTitle: "Informação sobre receitas",
    sourceBody:
      "Os nomes dos itens, ícones, notas e categorias são correspondentes aos dados oficiais do NC. Relacionamentos de receitas e quantidades usam um instantâneo comunitário datado de 2026-07-10. Verifique- os no jogo após um patch.",
    dataLanguageNotice: "Nomes de itens e materiais seguem os rótulos oficiais ou de origem atualmente disponíveis. A interface da calculadora é localizada separadamente.",
    recipeNotesKicker: "NOTAS DA RECEITA",
    breadcrumbLabel: "Navegação estrutural",
    sourceLink: "Ver a página da fonte comunitária",
    officialItem: "Abrir a ficha oficial do item",
    relationCount: "Relações de materiais",
    direct: "Direto",
    base: "Base",
    intermediate: "Intermediário",
    outputWarning: "A fonte não informa a quantidade produzida por fabricação. Por isso, esta página calcula conforme o número de fabricações. Confira primeiro o rendimento real no jogo.",
    languageLabel: "Mudar o idioma desta receita",
    back: "Voltar às receitas de fabricação",
    featureList: ["Materiais diretos", "Materiais de base", "Faltantes no estoque", "Preço unitário personalizado"],
  },
  "ru": {
    catalog: "Рецепты изготовления",
    titleSuffix: "калькулятор материалов",
    description: (recipe) =>
      `Расчет прямых материалов, базовых материалов, дефицита запасов и затрат на заказ для ${recipe.name}; профессия: ${recipe.professionName ?? "не указано"}.`,
    sourceTitle: "Информация о рецепте",
    sourceBody:
      "Имена пунктов, значки, оценки и категории соответствуют официальным данным NC. В зависимости от рецепта и количествах используется снимок сообщества, датированный 2026-07-10. Проверяйте их в игре после патча.",
    dataLanguageNotice: "Названия предметов и материалов используют доступные официальные обозначения или обозначения источника. Интерфейс калькулятора локализован отдельно.",
    recipeNotesKicker: "ПРИМЕЧАНИЯ К РЕЦЕПТУ",
    breadcrumbLabel: "Навигационная цепочка",
    sourceLink: "Открыть страницу источника сообщества",
    officialItem: "Открыть официальную запись предмета",
    relationCount: "Связи материалов",
    direct: "Прямые",
    base: "Базовые",
    intermediate: "Промежуточные",
    outputWarning: "Источник не указывает количество результата за одно изготовление, поэтому страница рассчитывает по количеству изготовлений. Сначала проверьте фактический результат в игре.",
    languageLabel: "Изменить язык этого рецепта",
    back: "Вернуться к рецептам изготовления",
    featureList: ["Прямые материалы", "Базовые материалы", "Нехватка запасов", "Пользовательская цена за единицу"],
  },
  ko: {
    catalog: "제작 레시피",
    titleSuffix: "재료 계산기",
    description: (recipe) =>
      `${recipe.name}의 직접 재료, 기본 재료, 보유량 부족분과 사용자 입력 단가 비용을 계산합니다. 전문 기술: ${recipe.professionName ?? "표시되지 않음"}.`,
    sourceTitle: "레시피 정보",
    sourceBody:
      "아이템 이름, 아이콘, 등급과 분류는 NC 공식 아이템 자료와 대조했습니다. 레시피 관계와 수량은 2026-07-10 커뮤니티 스냅샷입니다. 패치 후 게임에서 다시 확인하세요.",
    dataLanguageNotice: "한국어 아이템과 재료 이름은 확인 가능한 공식 자료를 우선 사용하며, 공식 번역이 없는 고유명사는 출처 언어를 유지합니다.",
    recipeNotesKicker: "레시피 정보",
    breadcrumbLabel: "이동 경로",
    sourceLink: "커뮤니티 출처 페이지 보기",
    officialItem: "공식 아이템 정보 열기",
    relationCount: "재료 관계",
    direct: "직접",
    base: "기본",
    intermediate: "중간 제작",
    outputWarning: "출처에 1회 제작 산출량이 없어 제작 횟수를 기준으로 계산합니다. 실제 산출량은 게임에서 먼저 확인하세요.",
    languageLabel: "이 레시피 언어 변경",
    back: "제작 레시피 목록으로 돌아가기",
    featureList: ["직접 재료", "기본 재료", "보유량 부족분", "사용자 입력 단가 비용"],
  },
};

function resolveRoute(localeValue: string, recipeId: string) {
  if (!isSiteLocale(localeValue)) notFound();
  const locale = localeValue as SiteLocale;
  const recipe = getCraftingRecipe(
    recipeId,
    siteLocaleConfig[locale].contentFallbackLocale,
  );
  if (!recipe) notFound();
  return { locale, recipe };
}

function recipePath(recipeId: string) {
  return `/tools/material-calculator/recipe/${recipeId}/`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params;
  const { locale, recipe } = resolveRoute(values.locale, values.recipeId);
  const text = copy[locale];
  const path = recipePath(recipe.recipeId);
  const title = `${recipe.name} ${text.titleSuffix} | AION2 KINA`;
  const description = text.description(recipe);

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: localizedHref(locale, path),
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title,
      description,
      url: localizedHref(locale, path),
      locale: siteLocaleConfig[locale].code,
      images: [{ url: recipe.imageUrl, width: 168, height: 168, alt: recipe.name }],
    },
  };
}

export default async function CraftingRecipePage({ params }: Props) {
  const values = await params;
  const { locale, recipe } = resolveRoute(values.locale, values.recipeId);
  const text = copy[locale];
  const hub = toolHubCopy[locale];
  const path = recipePath(recipe.recipeId);
  const canonicalPath = localizedHref(locale, path);
  const siteOrigin = await getRequestSiteOrigin();
  const canonicalUrl = absoluteSiteUrl(canonicalPath, siteOrigin);
  const catalogPath = localizedHref(locale, "/tools/material-calculator/");
  const catalogUrl = absoluteSiteUrl(catalogPath, siteOrigin);
  const toolsUrl = absoluteSiteUrl(getSectionHref(locale, "tools"), siteOrigin);
  const homeUrl = absoluteSiteUrl(getSectionHref(locale, "home"), siteOrigin);
  const description = text.description(recipe);
  const relations = recipe.direct.length + recipe.base.length + recipe.intermediate.length;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${recipe.name} ${text.titleSuffix}`,
        description,
        inLanguage: siteLocaleConfig[locale].code,
        dateModified: craftingCatalogManifest.provenance.itemIdentity.snapshotDate,
        isPartOf: { "@type": "CollectionPage", "@id": `${catalogUrl}#collection`, url: catalogUrl },
        mainEntity: {
          "@type": "Thing",
          "@id": `${canonicalUrl}#crafted-item`,
          identifier: recipe.outputItemId,
          name: recipe.name,
          image: recipe.imageUrl,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#calculator`,
        name: `${recipe.name} ${text.titleSuffix}`,
        url: canonicalUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        inLanguage: siteLocaleConfig[locale].code,
        featureList: text.featureList,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteShellCopy[locale].navigation.home, item: homeUrl },
          { "@type": "ListItem", position: 2, name: hub.breadcrumb, item: toolsUrl },
          { "@type": "ListItem", position: 3, name: text.catalog, item: catalogUrl },
          { "@type": "ListItem", position: 4, name: recipe.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className={toolsStyles.main} id="main-content">
      <section className={styles.contextBar}>
        <div className="shell">
          <nav className={toolsStyles.breadcrumbs} aria-label={text.breadcrumbLabel}>
            <ol>
              <li><a href={getSectionHref(locale, "home")}>{siteShellCopy[locale].navigation.home}</a></li>
              <li aria-hidden="true">/</li>
              <li><a href={getSectionHref(locale, "tools")}>{hub.breadcrumb}</a></li>
              <li aria-hidden="true">/</li>
              <li><a href={catalogPath}>{text.catalog}</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{recipe.name}</li>
            </ol>
          </nav>
          <a className={styles.backLink} href={catalogPath}>← {text.back}</a>
        </div>
      </section>

      <section className={styles.calculatorSection}>
        <div className="shell">
          <CraftingRecipeCalculator locale={locale} recipe={recipe} />
        </div>
      </section>

      <section aria-labelledby="recipe-source-title" className={styles.sourceSection}>
        <div className={`shell ${styles.sourceGrid}`}>
          <div>
            <p className={toolsStyles.kicker}>{text.recipeNotesKicker}</p>
            <h2 id="recipe-source-title">{text.sourceTitle}</h2>
            <p>{text.sourceBody}</p>
            <p>{text.dataLanguageNotice}</p>
            <p className={styles.outputWarning}>{text.outputWarning}</p>
          </div>
          <aside>
            <dl>
              <div><dt>{text.relationCount}</dt><dd>{relations.toLocaleString(siteLocaleConfig[locale].code)}</dd></div>
              <div><dt>{text.direct}</dt><dd>{recipe.direct.length.toLocaleString(siteLocaleConfig[locale].code)}</dd></div>
              <div><dt>{text.base}</dt><dd>{recipe.base.length.toLocaleString(siteLocaleConfig[locale].code)}</dd></div>
              <div><dt>{text.intermediate}</dt><dd>{recipe.intermediate.length.toLocaleString(siteLocaleConfig[locale].code)}</dd></div>
            </dl>
            <a href={localizedHref(locale, `/database/item/${recipe.outputItemId}/`)}>{text.officialItem}<span aria-hidden="true">↗</span></a>
            <a href={recipe.sourceUrl} rel="nofollow noreferrer" target="_blank">{text.sourceLink}<span aria-hidden="true">↗</span></a>
          </aside>
        </div>
      </section>

      <nav aria-label={text.languageLabel} className={toolsStyles.languageLinks}>
        <div className="shell">
          <span>{text.languageLabel}</span>
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
          <a className={toolsStyles.backLink} href={catalogPath}>{text.back}</a>
        </div>
      </nav>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</gu, "\\u003c") }}
        type="application/ld+json"
      />
    </main>
  );
}
