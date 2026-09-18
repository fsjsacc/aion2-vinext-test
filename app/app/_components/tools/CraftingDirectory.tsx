"use client";

import {
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import type { LocalizedCraftingRecipe } from "@/app/crafting-catalog";
import {
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./CraftingDirectory.module.css";

const PAGE_SIZE = 24;

export type CraftingDirectoryEntry = Pick<
  LocalizedCraftingRecipe,
  | "recipeId"
  | "outputItemId"
  | "name"
  | "imageUrl"
  | "gradeName"
  | "categoryName"
  | "profession"
  | "masteryLevel"
>;

export type CraftingDirectoryProps = {
  entries: readonly CraftingDirectoryEntry[];
  locale: SiteLocale;
  initialPage?: number;
};

export type DirectoryCopy = {
  searchLabel: string;
  searchPlaceholder: string;
  filtersTitle: string;
  allProfessions: string;
  allGrades: string;
  allCategories: string;
  allMastery: string;
  profession: string;
  grade: string;
  category: string;
  mastery: string;
  reset: string;
  total: string;
  filtered: string;
  professions: string;
  results: (count: number) => string;
  resultRange: (start: number, end: number, total: number) => string;
  recipe: string;
  itemId: string;
  openRecipe: (name: string) => string;
  emptyTitle: string;
  emptyBody: string;
  previous: string;
  next: string;
  pageLabel: (page: number, total: number) => string;
  goToPage: (page: number) => string;
  imageAlt: (name: string) => string;
  level: (value: number) => string;
  unknown: string;
};

export const craftingDirectoryCopy: Record<SiteLocale, DirectoryCopy> = {
  "zh-hant": {
    searchLabel: "搜尋製作配方",
    searchPlaceholder: "搜尋成品、專業、分類或物品 ID",
    filtersTitle: "篩選配方",
    allProfessions: "全部專業",
    allGrades: "全部品級",
    allCategories: "全部分類",
    allMastery: "全部熟練度",
    profession: "製作專業",
    grade: "成品品級",
    category: "成品分類",
    mastery: "熟練度",
    reset: "清除篩選",
    total: "全部配方",
    filtered: "目前結果",
    professions: "製作專業",
    results: (count) => `${count.toLocaleString("zh-Hant")} 個配方`,
    resultRange: (start, end, total) =>
      `顯示第 ${start.toLocaleString("zh-Hant")}–${end.toLocaleString("zh-Hant")} 個，共 ${total.toLocaleString("zh-Hant")} 個`,
    recipe: "配方",
    itemId: "物品 ID",
    openRecipe: (name) => `開啟「${name}」材料計算器`,
    emptyTitle: "找不到符合條件的配方",
    emptyBody: "請縮短搜尋文字，或清除一項篩選條件後再試。",
    previous: "上一頁",
    next: "下一頁",
    pageLabel: (page, total) => `第 ${page} 頁，共 ${total} 頁`,
    goToPage: (page) => `前往第 ${page} 頁`,
    imageAlt: (name) => `${name} 圖示`,
    level: (value) => `Lv. ${value}`,
    unknown: "未分類",
  },
  en: {
    searchLabel: "Search crafting recipes",
    searchPlaceholder: "Search output, profession, category, or item ID",
    filtersTitle: "Filter recipes",
    allProfessions: "All professions",
    allGrades: "All grades",
    allCategories: "All categories",
    allMastery: "All mastery levels",
    profession: "Profession",
    grade: "Output grade",
    category: "Output category",
    mastery: "Mastery",
    reset: "Clear filters",
    total: "All recipes",
    filtered: "Current results",
    professions: "Professions",
    results: (count) => `${count.toLocaleString("en")} recipes`,
    resultRange: (start, end, total) =>
      `Showing ${start.toLocaleString("en")}–${end.toLocaleString("en")} of ${total.toLocaleString("en")}`,
    recipe: "Recipe",
    itemId: "Item ID",
    openRecipe: (name) => `Open the material calculator for ${name}`,
    emptyTitle: "No matching recipes",
    emptyBody: "Try a shorter search or clear one of the filters.",
    previous: "Previous",
    next: "Next",
    pageLabel: (page, total) => `Page ${page} of ${total}`,
    goToPage: (page) => `Go to page ${page}`,
    imageAlt: (name) => `${name} icon`,
    level: (value) => `Lv. ${value}`,
    unknown: "Uncategorized",
  },

  "zh-hans": {
    searchLabel: "搜索制作配方",
    searchPlaceholder: "搜索成品、专业、分类或物品 ID",
    filtersTitle: "筛选配方",
    allProfessions: "全部专业",
    allGrades: "全部品级",
    allCategories: "全部分类",
    allMastery: "全部熟练度",
    profession: "制作专业",
    grade: "成品品级",
    category: "成品分类",
    mastery: "熟练度",
    reset: "清除筛选",
    total: "全部配方",
    filtered: "当前结果",
    professions: "制作专业",
    results: (count) => `${count.toLocaleString("zh-Hans")} 个配方`,
    resultRange: (start, end, total) =>
      `显示第 ${start.toLocaleString("zh-Hans")}–${end.toLocaleString("zh-Hans")} 个，共 ${total.toLocaleString("zh-Hans")} 个`,
    recipe: "配方",
    itemId: "物品 ID",
    openRecipe: (name) => `打开「${name}」材料计算器`,
    emptyTitle: "找不到符合条件的配方",
    emptyBody: "请缩短搜索文字，或清除一项筛选条件后再试。",
    previous: "上一页",
    next: "下一页",
    pageLabel: (page, total) => `第 ${page} 页，共 ${total} 页`,
    goToPage: (page) => `前往第 ${page} 页`,
    imageAlt: (name) => `${name} 图标`,
    level: (value) => `Lv. ${value}`,
    unknown: "未分类",
  },








  "de": {
    searchLabel: "Herstellungsrezepte suchen",
    searchPlaceholder: "Erzeugnis, Beruf, Kategorie oder Gegenstands-ID",
    filtersTitle: "Rezepte filtern",
    allProfessions: "Alle Berufe",
    allGrades: "Alle Qualitätsstufen",
    allCategories: "Alle Kategorien",
    allMastery: "Alle Fertigkeitsstufen",
    profession: "Beruf",
    grade: "Qualität des Erzeugnisses",
    category: "Kategorie des Erzeugnisses",
    mastery: "Fertigkeitsstufe",
    reset: "Filter löschen",
    total: "Alle Rezepte",
    filtered: "Aktuelle Ergebnisse",
    professions: "Berufe",
    results: (count) => `${count.toLocaleString("de-DE")} Rezepte`,
    resultRange: (start, end, total) =>
      `${start.toLocaleString("de-DE")}–${end.toLocaleString("de-DE")} von ${total.toLocaleString("de-DE")} werden angezeigt`,
    recipe: "Rezept",
    itemId: "Gegenstands-ID",
    openRecipe: (name) => `Materialrechner für ${name} öffnen`,
    emptyTitle: "Keine passenden Rezepte",
    emptyBody: "Versuchen Sie eine kürzere Suche oder löschen Sie einen der Filter.",
    previous: "Zurück",
    next: "Weiter",
    pageLabel: (page, total) => `Seite ${page} von ${total}`,
    goToPage: (page) => `Zu Seite ${page} wechseln`,
    imageAlt: (name) => `Symbol für ${name}`,
    level: (value) => `Lv. ${value}`,
    unknown: "Nicht kategorisiert",
  },
  "fr": {
    searchLabel: "Rechercher des recettes de fabrication",
    searchPlaceholder: "Rechercher un produit, un métier, une catégorie ou un ID d’objet",
    filtersTitle: "Filtrer les recettes",
    allProfessions: "Toutes les professions",
    allGrades: "Tous les grades",
    allCategories: "Toutes catégories",
    allMastery: "Tous niveaux de maîtrise",
    profession: "Profession",
    grade: "Qualité du produit",
    category: "Catégorie du produit",
    mastery: "Maîtrise",
    reset: "Effacer les filtres",
    total: "Toutes les recettes",
    filtered: "Résultats actuels",
    professions: "Professions",
    results: (count) => `${count.toLocaleString("fr-FR")} recettes`,
    resultRange: (start, end, total) =>
      `Affichage de ${start.toLocaleString("fr-FR")}–${end.toLocaleString("fr-FR")} de ${total.toLocaleString("fr-FR")}`,
    recipe: "Recette",
    itemId: "ID d’objet",
    openRecipe: (name) => `Ouvrir la calculatrice de matériaux pour ${name}`,
    emptyTitle: "Pas de recettes correspondantes",
    emptyBody: "Essayez une recherche plus courte ou videz l'un des filtres.",
    previous: "Précédent",
    next: "Suivant",
    pageLabel: (page, total) => `Page ${page} de ${total}`,
    goToPage: (page) => `Aller à la page ${page}`,
    imageAlt: (name) => `icône ${name}`,
    level: (value) => `Lv. ${value}`,
    unknown: "Non classé",
  },
  "es": {
    searchLabel: "Buscar recetas de fabricación",
    searchPlaceholder: "Buscar producto, profesión, categoría o ID de objeto",
    filtersTitle: "Filtrar recetas",
    allProfessions: "Todas las profesiones",
    allGrades: "Todas las calificaciones",
    allCategories: "Todas las categorías",
    allMastery: "Todos los niveles de maestría",
    profession: "Profesión",
    grade: "Grado del producto",
    category: "Categoría del producto",
    mastery: "Maestría",
    reset: "Borrar filtros",
    total: "Todas las recetas",
    filtered: "Resultados actuales",
    professions: "Profesiones",
    results: (count) => `${count.toLocaleString("es-ES")} recetas`,
    resultRange: (start, end, total) =>
      `Mostrando ${start.toLocaleString("es-ES")}–${end.toLocaleString("es-ES")} de ${total.toLocaleString("es-ES")}`,
    recipe: "Receta",
    itemId: "ID del objeto",
    openRecipe: (name) => `Abrir la calculadora de materiales de ${name}`,
    emptyTitle: "No hay recetas que coincidan",
    emptyBody: "Pruebe una búsqueda más corta o despeje uno de los filtros.",
    previous: "Anterior",
    next: "Siguiente",
    pageLabel: (page, total) => `Página ${page} de ${total}`,
    goToPage: (page) => `Ir a la página ${page}`,
    imageAlt: (name) => `Icono de ${name}`,
    level: (value) => `Lv. ${value}`,
    unknown: "Sin categorizar",
  },
  "ja": {
    searchLabel: "製作レシピを検索",
    searchPlaceholder: "完成品、製作職、カテゴリ、アイテムIDを検索",
    filtersTitle: "レシピを絞り込む",
    allProfessions: "すべての製作職",
    allGrades: "すべてのグレード",
    allCategories: "すべてのカテゴリ",
    allMastery: "すべての熟練度",
    profession: "製作職",
    grade: "完成品グレード",
    category: "完成品カテゴリ",
    mastery: "熟練度",
    reset: "絞り込みを解除",
    total: "全レシピ",
    filtered: "現在の結果",
    professions: "製作職",
    results: (count) => `${count.toLocaleString("ja-JP")}件のレシピ`,
    resultRange: (start, end, total) =>
      `全${total.toLocaleString("ja-JP")}件中${start.toLocaleString("ja-JP")}～${end.toLocaleString("ja-JP")}件を表示`,
    recipe: "レシピ",
    itemId: "アイテムID",
    openRecipe: (name) => `${name}の材料計算機を開く`,
    emptyTitle: "条件に一致するレシピはありません",
    emptyBody: "検索語を短くするか、絞り込み条件を解除してください。",
    previous: "前へ",
    next: "次へ",
    pageLabel: (page, total) => `${total}ページ中${page}ページ`,
    goToPage: (page) => `${page}ページへ移動`,
    imageAlt: (name) => `${name}のアイコン`,
    level: (value) => `Lv. ${value}`,
    unknown: "未分類",
  },
  "pt-br": {
    searchLabel: "Buscar receitas de fabricação",
    searchPlaceholder: "Buscar produto, profissão, categoria ou ID do item",
    filtersTitle: "Filtrar receitas",
    allProfessions: "Todas as profissões",
    allGrades: "Todos os graus de qualidade",
    allCategories: "Todas as categorias",
    allMastery: "Todos os níveis de proficiência",
    profession: "Profissão",
    grade: "Grau do produto",
    category: "Categoria do produto",
    mastery: "Proficiência",
    reset: "Limpar os filtros",
    total: "Todas as receitas",
    filtered: "Resultados atuais",
    professions: "Profissões",
    results: (count) => `${count.toLocaleString("pt-BR")} receitas`,
    resultRange: (start, end, total) =>
      `Mostrando ${start.toLocaleString("pt-BR")}–${end.toLocaleString("pt-BR")} de ${total.toLocaleString("pt-BR")}`,
    recipe: "Receita",
    itemId: "Item ID",
    openRecipe: (name) => `Abrir a calculadora de materiais de ${name}`,
    emptyTitle: "Sem receitas correspondentes",
    emptyBody: "Tente uma pesquisa mais curta ou limpe um dos filtros.",
    previous: "Anterior",
    next: "Próximo",
    pageLabel: (page, total) => `Página ${page} de ${total}`,
    goToPage: (page) => `Ir para a página ${page}`,
    imageAlt: (name) => `Ícone de ${name}`,
    level: (value) => `Lv. ${value}`,
    unknown: "Sem categoria",
  },
  "ru": {
    searchLabel: "Поиск рецептов изготовления",
    searchPlaceholder: "Название, профессия, категория или ID предмета",
    filtersTitle: "Фильтры рецептов",
    allProfessions: "Все профессии",
    allGrades: "Все категории качества",
    allCategories: "Все категории",
    allMastery: "Все уровни мастерства",
    profession: "Профессия",
    grade: "Качество результата",
    category: "Категория результата",
    mastery: "Мастерство",
    reset: "Сбросить фильтры",
    total: "Все рецепты",
    filtered: "Текущие результаты",
    professions: "Профессии",
    results: (count) => `${count.toLocaleString("ru-RU")} рецептов`,
    resultRange: (start, end, total) =>
      `Показаны ${start.toLocaleString("ru-RU")}–${end.toLocaleString("ru-RU")} из ${total.toLocaleString("ru-RU")}`,
    recipe: "Рецепт",
    itemId: "ID предмета",
    openRecipe: (name) => `Открыть калькулятор материалов для ${name}`,
    emptyTitle: "Подходящих рецептов нет",
    emptyBody: "Сократите поисковый запрос или сбросьте один из фильтров.",
    previous: "Назад",
    next: "Далее",
    pageLabel: (page, total) => `Страница ${page} из ${total}`,
    goToPage: (page) => `Перейти на страницу ${page}`,
    imageAlt: (name) => `Значок ${name}`,
    level: (value) => `Lv. ${value}`,
    unknown: "Без категории",
  },
  ko: {
    searchLabel: "제작 레시피 검색",
    searchPlaceholder: "결과물, 전문 기술, 분류 또는 아이템 ID 검색",
    filtersTitle: "레시피 필터",
    allProfessions: "모든 전문 기술",
    allGrades: "모든 등급",
    allCategories: "모든 분류",
    allMastery: "모든 숙련도",
    profession: "전문 기술",
    grade: "결과물 등급",
    category: "결과물 분류",
    mastery: "숙련도",
    reset: "필터 초기화",
    total: "전체 레시피",
    filtered: "현재 결과",
    professions: "전문 기술",
    results: (count) => `레시피 ${count.toLocaleString("ko-KR")}개`,
    resultRange: (start, end, total) =>
      `${total.toLocaleString("ko-KR")}개 중 ${start.toLocaleString("ko-KR")}–${end.toLocaleString("ko-KR")}개 표시`,
    recipe: "레시피",
    itemId: "아이템 ID",
    openRecipe: (name) => `${name} 재료 계산기 열기`,
    emptyTitle: "조건에 맞는 레시피가 없습니다",
    emptyBody: "검색어를 줄이거나 필터를 하나 해제해 보세요.",
    previous: "이전",
    next: "다음",
    pageLabel: (page, total) => `${total}페이지 중 ${page}페이지`,
    goToPage: (page) => `${page}페이지로 이동`,
    imageAlt: (name) => `${name} 아이콘`,
    level: (value) => `Lv. ${value}`,
    unknown: "미분류",
  },
};

function normalizeSearch(value: string) {
  return value.normalize("NFKC").trim().toLocaleLowerCase();
}

function compareLabels(locale: SiteLocale, left: string, right: string) {
  return left.localeCompare(right, siteLocaleConfig[locale].code, {
    numeric: true,
    sensitivity: "base",
  });
}

function uniqueLabels(
  entries: readonly CraftingDirectoryEntry[],
  select: (entry: CraftingDirectoryEntry) => string | null | undefined,
  locale: SiteLocale,
) {
  const values = entries
    .map(select)
    .filter((value): value is string => Boolean(value));
  return [...new Set(values)].sort((left, right) =>
    compareLabels(locale, left, right),
  );
}

function gradeTone(value: string) {
  const normalized = normalizeSearch(value);
  if (/myth|신화|神話|神话/u.test(normalized)) return "mythic";
  if (/legend|전설|傳說|传说/u.test(normalized)) return "legendary";
  if (/unique|유일|유니크|獨特|独特/u.test(normalized)) return "unique";
  if (/epic|영웅|史詩|史诗/u.test(normalized)) return "epic";
  if (/rare|희귀|稀有/u.test(normalized)) return "rare";
  return "normal";
}

function recipeHref(locale: SiteLocale, recipeId: string) {
  return `/${locale}/tools/material-calculator/recipe/${encodeURIComponent(recipeId)}/`;
}

function pageHref(page: number) {
  return page > 1 ? `?page=${page}` : "?";
}

function paginationItems(page: number, pageCount: number) {
  const pages = new Set([1, pageCount, page - 1, page, page + 1]);
  const visible = [...pages]
    .filter((value) => value >= 1 && value <= pageCount)
    .sort((left, right) => left - right);
  const result: Array<number | "ellipsis"> = [];
  visible.forEach((value, index) => {
    if (index > 0 && value - visible[index - 1] > 1) result.push("ellipsis");
    result.push(value);
  });
  return result;
}

export function CraftingDirectory({
  entries,
  locale,
  initialPage = 1,
}: CraftingDirectoryProps) {
  const text = craftingDirectoryCopy[locale];
  const resultsId = useId();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [profession, setProfession] = useState("");
  const [grade, setGrade] = useState("");
  const [category, setCategory] = useState("");
  const [mastery, setMastery] = useState("");
  const [page, setPage] = useState(Math.max(1, Math.trunc(initialPage) || 1));

  const professions = useMemo(
    () => uniqueLabels(entries, (entry) => entry.profession, locale),
    [entries, locale],
  );
  const grades = useMemo(
    () => uniqueLabels(entries, (entry) => entry.gradeName, locale),
    [entries, locale],
  );
  const categories = useMemo(
    () => uniqueLabels(entries, (entry) => entry.categoryName, locale),
    [entries, locale],
  );
  const masteryLevels = useMemo(
    () =>
      [...new Set(entries.map((entry) => entry.masteryLevel).filter((value): value is number => value !== null))]
        .sort((left, right) => left - right),
    [entries],
  );

  const normalizedQuery = normalizeSearch(query);
  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        if (profession && entry.profession !== profession) return false;
        if (grade && entry.gradeName !== grade) return false;
        if (category && entry.categoryName !== category) return false;
        if (mastery && String(entry.masteryLevel ?? "") !== mastery) return false;
        if (!normalizedQuery) return true;
        return normalizeSearch(
          [
            entry.name,
            entry.outputItemId,
            entry.profession,
            entry.gradeName,
            entry.categoryName,
            entry.masteryLevel === null ? "" : String(entry.masteryLevel),
          ].join(" "),
        ).includes(normalizedQuery);
      }),
    [category, entries, grade, mastery, normalizedQuery, profession],
  );

  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageEntries = filteredEntries.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const rangeStart = filteredEntries.length ? (safePage - 1) * PAGE_SIZE + 1 : 0;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filteredEntries.length);
  const hasFilters = Boolean(query || profession || grade || category || mastery);

  useEffect(() => {
    const onPopState = () => {
      const value = Number.parseInt(new URL(window.location.href).searchParams.get("page") ?? "1", 10);
      setPage(Number.isFinite(value) && value > 0 ? value : 1);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const resetToFirstPage = () => {
    setPage(1);
    if (window.location.search) {
      window.history.replaceState(
        { ...window.history.state, craftingPage: 1 },
        "",
        pageHref(1),
      );
    }
  };

  const resetFilters = () => {
    setQuery("");
    setProfession("");
    setGrade("");
    setCategory("");
    setMastery("");
    resetToFirstPage();
  };

  const changePage = (nextPage: number, event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    const clamped = Math.max(1, Math.min(nextPage, pageCount));
    if (clamped === safePage) return;
    setPage(clamped);
    const href = pageHref(clamped);
    window.history.pushState({ ...window.history.state, craftingPage: clamped }, "", href);
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className={styles.directory} aria-labelledby={`${resultsId}-title`}>
      <div className={styles.summaryRail} aria-label={text.filtersTitle}>
        <div>
          <span>{text.total}</span>
          <strong>{entries.length.toLocaleString(locale)}</strong>
        </div>
        <div>
          <span>{text.filtered}</span>
          <strong>{filteredEntries.length.toLocaleString(locale)}</strong>
        </div>
        <div>
          <span>{text.professions}</span>
          <strong>{professions.length.toLocaleString(locale)}</strong>
        </div>
      </div>

      <div className={styles.controlPanel}>
        <label className={styles.searchField}>
          <span>{text.searchLabel}</span>
          <span className={styles.searchInput}>
            <Search aria-hidden="true" size={19} strokeWidth={1.7} />
            <input
              autoComplete="off"
              maxLength={120}
              onChange={(event) => {
                setQuery(event.target.value);
                resetToFirstPage();
              }}
              placeholder={text.searchPlaceholder}
              type="search"
              value={query}
            />
          </span>
        </label>

        <div className={styles.filterHeading}>
          <span>
            <SlidersHorizontal aria-hidden="true" size={15} />
            {text.filtersTitle}
          </span>
          <button disabled={!hasFilters} onClick={resetFilters} type="button">
            <RotateCcw aria-hidden="true" size={14} />
            {text.reset}
          </button>
        </div>

        <div className={styles.filters}>
          <label>
            <span>{text.profession}</span>
            <select
              onChange={(event) => {
                setProfession(event.target.value);
                resetToFirstPage();
              }}
              value={profession}
            >
              <option value="">{text.allProfessions}</option>
              {professions.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>{text.grade}</span>
            <select
              onChange={(event) => {
                setGrade(event.target.value);
                resetToFirstPage();
              }}
              value={grade}
            >
              <option value="">{text.allGrades}</option>
              {grades.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>{text.category}</span>
            <select
              onChange={(event) => {
                setCategory(event.target.value);
                resetToFirstPage();
              }}
              value={category}
            >
              <option value="">{text.allCategories}</option>
              {categories.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>{text.mastery}</span>
            <select
              onChange={(event) => {
                setMastery(event.target.value);
                resetToFirstPage();
              }}
              value={mastery}
            >
              <option value="">{text.allMastery}</option>
              {masteryLevels.map((value) => (
                <option key={value} value={value}>{text.level(value)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={styles.resultHeader} ref={resultsRef}>
        <div>
          <p>{text.filtered}</p>
          <h2 id={`${resultsId}-title`}>{text.results(filteredEntries.length)}</h2>
        </div>
        <output aria-live="polite">
          {text.resultRange(rangeStart, rangeEnd, filteredEntries.length)}
        </output>
      </div>

      {pageEntries.length ? (
        <>
          <div className={styles.desktopTable}>
            <table>
              <thead>
                <tr>
                  <th>{text.recipe}</th>
                  <th>{text.profession}</th>
                  <th>{text.category}</th>
                  <th>{text.grade}</th>
                  <th>{text.mastery}</th>
                  <th>{text.itemId}</th>
                </tr>
              </thead>
              <tbody>
                {pageEntries.map((entry) => {
                  const href = recipeHref(locale, entry.recipeId);
                  return (
                    <tr key={entry.recipeId}>
                      <th scope="row">
                        <a className={styles.recipeIdentity} href={href}>
                          <span className={styles.itemIcon} data-grade={gradeTone(entry.gradeName)}>
                            {entry.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={text.imageAlt(entry.name)}
                                height="52"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                src={entry.imageUrl}
                                width="52"
                              />
                            ) : (
                              <PackageSearch aria-hidden="true" size={22} />
                            )}
                          </span>
                          <span>
                            <strong>{entry.name}</strong>
                            <small>{entry.gradeName || text.unknown}</small>
                          </span>
                        </a>
                      </th>
                      <td>{entry.profession || text.unknown}</td>
                      <td>{entry.categoryName || text.unknown}</td>
                      <td><span className={styles.grade} data-grade={gradeTone(entry.gradeName)}>{entry.gradeName || text.unknown}</span></td>
                      <td>{entry.masteryLevel === null ? text.unknown : text.level(entry.masteryLevel)}</td>
                      <td>
                        <a aria-label={text.openRecipe(entry.name)} className={styles.idLink} href={href}>
                          <span>{entry.outputItemId}</span>
                          <ChevronRight aria-hidden="true" size={16} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.mobileCards}>
            {pageEntries.map((entry) => (
              <a
                aria-label={text.openRecipe(entry.name)}
                className={styles.mobileCard}
                href={recipeHref(locale, entry.recipeId)}
                key={entry.recipeId}
              >
                <span className={styles.itemIcon} data-grade={gradeTone(entry.gradeName)}>
                  {entry.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={text.imageAlt(entry.name)}
                      height="56"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      src={entry.imageUrl}
                      width="56"
                    />
                  ) : (
                    <PackageSearch aria-hidden="true" size={23} />
                  )}
                </span>
                <span className={styles.mobileCardBody}>
                  <span className={styles.mobileCardTitle}>
                    <strong>{entry.name}</strong>
                    <ChevronRight aria-hidden="true" size={18} />
                  </span>
                  <span className={styles.mobileMeta}>
                    <b data-grade={gradeTone(entry.gradeName)}>{entry.gradeName || text.unknown}</b>
                    <span>{entry.profession || text.unknown}</span>
                    <span>{entry.categoryName || text.unknown}</span>
                    <span>{entry.masteryLevel === null ? text.unknown : text.level(entry.masteryLevel)}</span>
                  </span>
                  <small>{text.itemId} {entry.outputItemId}</small>
                </span>
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyState} role="status">
          <PackageSearch aria-hidden="true" size={30} />
          <h3>{text.emptyTitle}</h3>
          <p>{text.emptyBody}</p>
          <button disabled={!hasFilters} onClick={resetFilters} type="button">
            {text.reset}
          </button>
        </div>
      )}

      {filteredEntries.length > PAGE_SIZE ? (
        <nav className={styles.pagination} aria-label={text.pageLabel(safePage, pageCount)}>
          <a
            aria-disabled={safePage === 1}
            className={styles.pageArrow}
            href={pageHref(Math.max(1, safePage - 1))}
            onClick={(event) => safePage > 1 && changePage(safePage - 1, event)}
            tabIndex={safePage === 1 ? -1 : undefined}
          >
            <ChevronLeft aria-hidden="true" size={17} />
            <span>{text.previous}</span>
          </a>
          <div className={styles.pageNumbers}>
            {paginationItems(safePage, pageCount).map((item, index) =>
              item === "ellipsis" ? (
                <span aria-hidden="true" className={styles.ellipsis} key={`ellipsis-${index}`}>…</span>
              ) : (
                <a
                  aria-current={item === safePage ? "page" : undefined}
                  aria-label={text.goToPage(item)}
                  href={pageHref(item)}
                  key={item}
                  onClick={(event) => changePage(item, event)}
                >
                  {item}
                </a>
              ),
            )}
          </div>
          <span className={styles.mobilePageLabel}>{text.pageLabel(safePage, pageCount)}</span>
          <a
            aria-disabled={safePage === pageCount}
            className={styles.pageArrow}
            href={pageHref(Math.min(pageCount, safePage + 1))}
            onClick={(event) => safePage < pageCount && changePage(safePage + 1, event)}
            tabIndex={safePage === pageCount ? -1 : undefined}
          >
            <span>{text.next}</span>
            <ChevronRight aria-hidden="true" size={17} />
          </a>
        </nav>
      ) : null}
    </section>
  );
}
