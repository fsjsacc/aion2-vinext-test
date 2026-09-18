"use client";

import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  databaseClassDefinitions,
  type DatabaseClassId,
} from "@/app/database-type-registry";
import {
  itemDatabaseCatalogCopy,
} from "@/app/item-database-copy";
import type {
  ItemCatalogRow,
  ItemCatalogSearchResponse,
} from "@/app/item-catalog-types";
import {
  localizedHref,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./ItemCatalog.module.css";

type ItemCatalogProps = {
  locale: SiteLocale;
  initialResponse: ItemCatalogSearchResponse;
};

const BOOKMARK_STORAGE_KEY = "aion2kina:database:item-bookmarks:v1";
const PAGE_SIZE = 20;

type CatalogFragmentState = {
  query: string;
  category: string;
  selectedClasses: DatabaseClassId[];
  selectedGrades: string[];
  bookmarkedOnly: boolean;
  page: number;
};

function displayRestriction(
  locale: SiteLocale,
  classIds: readonly DatabaseClassId[],
  fallback: string,
) {
  if (classIds.length) {
    return classIds
      .map((classId) =>
        databaseClassDefinitions.find((entry) => entry.id === classId)
          ?.labels[locale] ?? classId,
      )
      .join(" / ");
  }
  return fallback;
}

function itemSummary(item: ItemCatalogRow) {
  return item.optionLines.length
    ? item.optionLines.join(" · ")
    : "—";
}

function parseFragment(): CatalogFragmentState {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const knownClasses = new Set(databaseClassDefinitions.map(({ id }) => id));
  const selectedClasses = (params.get("class")?.split(",") ?? []).filter(
    (value): value is DatabaseClassId =>
      knownClasses.has(value as DatabaseClassId),
  );
  const pageValue = Number.parseInt(params.get("page") ?? "1", 10);

  return {
    query: params.get("q") ?? "",
    category: params.get("category") ?? "all",
    selectedClasses,
    selectedGrades: (params.get("grade")?.split(",") ?? []).filter(Boolean),
    bookmarkedOnly: params.get("bookmarks") === "1",
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
  };
}

function readBookmarks() {
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(BOOKMARK_STORAGE_KEY) ?? "[]",
    );
    return new Set<string>(
      Array.isArray(parsed)
        ? parsed.filter((value): value is string => typeof value === "string")
        : [],
    );
  } catch {
    return new Set<string>();
  }
}

export function ItemCatalog({ locale, initialResponse }: ItemCatalogProps) {
  const copy = itemDatabaseCatalogCopy[locale];
  const filterTitleId = useId();
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDrawerRef = useRef<HTMLElement>(null);
  const filterCloseButtonRef = useRef<HTMLButtonElement>(null);
  const drawerWasOpen = useRef(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClasses, setSelectedClasses] = useState<DatabaseClassId[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [fragmentReady, setFragmentReady] = useState(false);
  const [result, setResult] = useState(initialResponse);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [requestRevision, setRequestRevision] = useState(0);
  const categories = result.facets.categories.map((facet) => ({
    key: facet.code,
    label: facet.label,
    count: facet.count,
  }));
  const grades = result.facets.grades;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setResult(initialResponse);
      setLoading(false);
      setRequestError(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialResponse, locale]);

  useEffect(() => {
    let cancelled = false;
    const restoreFragment = () => {
      if (cancelled) return;
      const state = parseFragment();
      setQuery(state.query);
      setSelectedCategory(state.category);
      setSelectedClasses(state.selectedClasses);
      setSelectedGrades(state.selectedGrades);
      setBookmarkedOnly(state.bookmarkedOnly);
      setPage(state.page);
    };
    queueMicrotask(() => {
      restoreFragment();
      if (cancelled) return;
      setBookmarks(readBookmarks());
      setFragmentReady(true);
    });

    const onHashChange = () => restoreFragment();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    if (!fragmentReady) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    if (selectedClasses.length) {
      params.set("class", selectedClasses.join(","));
    }
    if (selectedGrades.length) {
      params.set("grade", selectedGrades.join(","));
    }
    if (bookmarkedOnly) params.set("bookmarks", "1");
    if (page > 1) params.set("page", String(page));

    const fragment = params.toString();
    const nextUrl = `${window.location.pathname}${
      fragment ? `#${fragment}` : ""
    }`;
    window.history.replaceState(null, "", nextUrl);
  }, [
    bookmarkedOnly,
    fragmentReady,
    page,
    query,
    selectedCategory,
    selectedClasses,
    selectedGrades,
  ]);

  useEffect(() => {
    if (!filterOpen) {
      document.body.style.removeProperty("overflow");
      if (drawerWasOpen.current) {
        drawerWasOpen.current = false;
        filterButtonRef.current?.focus();
      }
      return;
    }

    drawerWasOpen.current = true;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      filterCloseButtonRef.current?.focus();
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setFilterOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const drawer = filterDrawerRef.current;
      if (!drawer) return;
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => {
        const style = window.getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      });
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !drawer.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !drawer.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filterOpen]);

  useEffect(() => {
    if (!fragmentReady) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setRequestError(false);
      try {
        const response = await fetch("/api/items", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            locale,
            query,
            category: selectedCategory === "all" ? null : selectedCategory,
            grades: selectedGrades,
            classes: selectedClasses,
            itemIds: bookmarkedOnly ? [...bookmarks] : null,
            page,
            pageSize: PAGE_SIZE,
          }),
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Item catalog request failed");
        const next = (await response.json()) as ItemCatalogSearchResponse;
        if (
          !Array.isArray(next.items) ||
          !next.pagination ||
          typeof next.pagination.total !== "number"
        ) {
          throw new Error("Item catalog response is invalid");
        }
        setResult(next);
        if (page > next.pagination.lastPage) {
          setPage(next.pagination.lastPage);
        }
      } catch {
        if (!controller.signal.aborted) setRequestError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, query ? 280 : 80);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [
    bookmarkedOnly,
    bookmarks,
    fragmentReady,
    locale,
    page,
    query,
    requestRevision,
    selectedCategory,
    selectedClasses,
    selectedGrades,
  ]);

  const pageCount = Math.max(1, result.pagination.lastPage);
  const safePage = Math.min(page, pageCount);
  const pageItems = result.items;
  const hasFilters =
    Boolean(query) ||
    selectedCategory !== "all" ||
    selectedClasses.length > 0 ||
    selectedGrades.length > 0 ||
    bookmarkedOnly;

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedClasses([]);
    setSelectedGrades([]);
    setBookmarkedOnly(false);
    setPage(1);
  };

  const toggleClass = (classId: DatabaseClassId) => {
    setSelectedClasses((current) =>
      current.includes(classId)
        ? current.filter((value) => value !== classId)
        : [...current, classId],
    );
    setPage(1);
  };

  const toggleGrade = (gradeCode: string) => {
    setSelectedGrades((current) =>
      current.includes(gradeCode)
        ? current.filter((value) => value !== gradeCode)
        : [...current, gradeCode],
    );
    setPage(1);
  };

  const toggleBookmark = (itemId: string) => {
    setBookmarks((current) => {
      const next = new Set(current);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      try {
        window.localStorage.setItem(
          BOOKMARK_STORAGE_KEY,
          JSON.stringify([...next]),
        );
      } catch {
        // Bookmarking remains usable for this session if storage is blocked.
      }
      return next;
    });
  };

  return (
    <section className={styles.catalog} aria-labelledby="item-catalog-title">
      <div className={styles.searchBand}>
        <label className={styles.searchField}>
          <span className={styles.visuallyHidden}>{copy.searchLabel}</span>
          <Search aria-hidden="true" size={20} strokeWidth={1.6} />
          <input
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={copy.searchPlaceholder}
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label={copy.clearLabel}
              className={styles.searchClear}
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              type="button"
            >
              <X aria-hidden="true" size={17} />
            </button>
          ) : null}
        </label>
      </div>

      <div className={styles.mobileActions}>
        <button
          aria-controls="item-database-filters"
          aria-expanded={filterOpen}
          className={styles.mobileFilterButton}
          onClick={() => setFilterOpen(true)}
          ref={filterButtonRef}
          type="button"
        >
          <SlidersHorizontal aria-hidden="true" size={17} />
          {copy.filterOpenLabel}
          {hasFilters ? <span aria-hidden="true" /> : null}
        </button>
        <button
          aria-pressed={bookmarkedOnly}
          className={styles.mobileBookmarkButton}
          onClick={() => {
            setBookmarkedOnly((current) => !current);
            setPage(1);
          }}
          type="button"
        >
          <Star
            aria-hidden="true"
            fill={bookmarkedOnly ? "currentColor" : "none"}
            size={17}
          />
          {bookmarkedOnly
            ? copy.showAllItemsLabel
            : copy.showBookmarksLabel}
        </button>
      </div>

      <div className={styles.workspace}>
        <button
          aria-hidden={!filterOpen}
          className={styles.backdrop}
          onClick={() => setFilterOpen(false)}
          tabIndex={filterOpen ? 0 : -1}
          type="button"
        />
        <aside
          aria-labelledby={filterTitleId}
          aria-modal={filterOpen || undefined}
          className={styles.filters}
          data-open={filterOpen}
          id="item-database-filters"
          ref={filterDrawerRef}
          role="dialog"
        >
          <div className={styles.filterHeader}>
            <h2 id={filterTitleId}>{copy.filterTitle}</h2>
            <button
              className={styles.resetButton}
              disabled={!hasFilters}
              onClick={resetFilters}
              type="button"
            >
              <RotateCcw aria-hidden="true" size={13} />
              {copy.clearLabel}
            </button>
            <button
              aria-label={copy.filterCloseLabel}
              className={styles.drawerClose}
              onClick={() => setFilterOpen(false)}
              ref={filterCloseButtonRef}
              type="button"
            >
              <X aria-hidden="true" size={19} />
            </button>
          </div>

          <fieldset className={styles.filterGroup}>
            <legend>{copy.classFilterLabel}</legend>
            <button
              className={styles.allOption}
              data-selected={!selectedClasses.length}
              onClick={() => {
                setSelectedClasses([]);
                setPage(1);
              }}
              type="button"
            >
              {copy.allLabel}
            </button>
            <div className={styles.checkboxGrid}>
              {databaseClassDefinitions.map((definition) => (
                <label key={definition.id}>
                  <input
                    checked={selectedClasses.includes(definition.id)}
                    onChange={() => toggleClass(definition.id)}
                    type="checkbox"
                  />
                  <span>{definition.labels[locale]}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.filterGroup}>
            <legend>{copy.gradeFilterLabel}</legend>
            <button
              className={styles.allOption}
              data-selected={!selectedGrades.length}
              onClick={() => {
                setSelectedGrades([]);
                setPage(1);
              }}
              type="button"
            >
              {copy.allLabel}
            </button>
            <div className={styles.checkboxGrid}>
              {grades.map((grade) => (
                <label key={grade.code}>
                  <input
                    checked={selectedGrades.includes(grade.code)}
                    onChange={() => toggleGrade(grade.code)}
                    type="checkbox"
                  />
                  <span>{grade.label}</span>
                  <small>{grade.count}</small>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.filterGroup}>
            <legend>{copy.categoryFilterLabel}</legend>
            <div className={styles.categoryList}>
              <button
                data-selected={selectedCategory === "all"}
                onClick={() => {
                  setSelectedCategory("all");
                  setPage(1);
                }}
                type="button"
              >
                <span>{copy.allCategories}</span>
                <small>{initialResponse.pagination.total}</small>
              </button>
              {categories.map((itemCategory) => (
                <button
                  data-selected={selectedCategory === itemCategory.key}
                  key={itemCategory.key}
                  onClick={() => {
                    setSelectedCategory(itemCategory.key);
                    setPage(1);
                  }}
                  type="button"
                >
                  <span>{itemCategory.label}</span>
                  <small>{itemCategory.count}</small>
                </button>
              ))}
            </div>
          </fieldset>
        </aside>

        <div className={styles.results} aria-busy={loading}>
          <div className={styles.resultHeader}>
            <div>
              <p>{copy.resultsTitle}</p>
              <h2 id="item-catalog-title" aria-live="polite">
                {copy.resultsLabel(result.pagination.total)}
              </h2>
            </div>
            <button
              aria-pressed={bookmarkedOnly}
              className={styles.bookmarkView}
              onClick={() => {
                setBookmarkedOnly((current) => !current);
                setPage(1);
              }}
              type="button"
            >
              <Star
                aria-hidden="true"
                fill={bookmarkedOnly ? "currentColor" : "none"}
                size={15}
              />
              {bookmarkedOnly
                ? copy.showAllItemsLabel
                : copy.bookmarksLabel}
              {bookmarks.size ? <b>{bookmarks.size}</b> : null}
            </button>
          </div>
          {loading || requestError ? (
            <div
              className={styles.requestStatus}
              data-error={requestError || undefined}
              role={requestError ? "alert" : "status"}
            >
              <span>
                {requestError
                  ? copy.requestErrorLabel
                  : copy.requestLoadingLabel}
              </span>
              {requestError ? (
                <button
                  onClick={() => setRequestRevision((current) => current + 1)}
                  type="button"
                >
                  {copy.retryLabel}
                </button>
              ) : null}
            </div>
          ) : null}

          {pageItems.length ? (
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th aria-label={copy.bookmarksLabel} />
                    <th>{copy.columnNameLabel}</th>
                    <th>{copy.columnCategoryLabel}</th>
                    <th>{copy.columnDescriptionLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((item) => {
                    const isBookmarked = bookmarks.has(item.id);
                    return (
                      <tr
                        data-grade={item.gradeCode?.toLowerCase() ?? "unknown"}
                        key={item.id}
                      >
                        <td className={styles.bookmarkCell}>
                          <button
                            aria-label={
                              isBookmarked
                                ? copy.removeBookmarkLabel(item.name)
                                : copy.addBookmarkLabel(item.name)
                            }
                            aria-pressed={isBookmarked}
                            onClick={() => toggleBookmark(item.id)}
                            type="button"
                          >
                            <Star
                              aria-hidden="true"
                              fill={isBookmarked ? "currentColor" : "none"}
                              size={17}
                            />
                          </button>
                        </td>
                        <td className={styles.nameCell}>
                          <span className={styles.iconFrame}>
                            {/* Official game-data media remains on its credited origin. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt={copy.itemImageAlt(item.name, item.categoryName)}
                              height="58"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              src={item.imageUrl}
                              width="58"
                            />
                          </span>
                          <span className={styles.itemIdentity}>
                            <a
                              href={
                                item.detailSlug
                                  ? localizedHref(
                                      locale,
                                      `/database/${item.detailSlug}/`,
                                    )
                                  : localizedHref(
                                      locale,
                                      `/database/item/${item.id}/`,
                                    )
                              }
                            >
                              {item.name}
                            </a>
                            <small>
                              {item.gradeName} · {copy.itemIdLabel}{" "}
                              {item.id}
                            </small>
                          </span>
                        </td>
                        <td className={styles.categoryCell}>
                          <span>{copy.columnCategoryLabel}</span>
                          {item.categoryName}
                        </td>
                        <td className={styles.descriptionCell}>
                          <span>{copy.columnDescriptionLabel}</span>
                          <p>{itemSummary(item)}</p>
                          <small>
                            {displayRestriction(
                              locale,
                              item.classIds,
                              copy.noClassRestrictionLabel,
                            )}
                          </small>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.empty}>
              <Star aria-hidden="true" size={24} strokeWidth={1.4} />
              <h2>
                {bookmarkedOnly
                  ? copy.noBookmarksTitle
                  : copy.emptyTitle}
              </h2>
              <p>
                {bookmarkedOnly
                  ? copy.noBookmarksDescription
                  : copy.emptyDescription}
              </p>
              <button onClick={resetFilters} type="button">
                {copy.clearLabel}
              </button>
            </div>
          )}

          {pageCount > 1 ? (
            <nav className={styles.pagination} aria-label={copy.pageLabel(safePage, pageCount)}>
              <button
                aria-label={copy.previousPageLabel}
                disabled={safePage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                type="button"
              >
                <ChevronLeft aria-hidden="true" size={17} />
              </button>
              <span>{copy.pageLabel(safePage, pageCount)}</span>
              <button
                aria-label={copy.nextPageLabel}
                disabled={safePage === pageCount}
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                type="button"
              >
                <ChevronRight aria-hidden="true" size={17} />
              </button>
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ItemCatalog;
