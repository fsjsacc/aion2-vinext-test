"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  getLiveTools,
  getToolHref,
  toolCategories,
  toolHubCopy,
  type ToolCategory,
} from "@/app/tool-registry";
import {
  buildToolDirectoryFragment,
  defaultToolDirectoryState,
  filterToolDirectoryTools,
  parseToolDirectoryFragment,
  type ToolDirectoryState,
} from "@/app/tool-directory-state";
import type { SiteLocale } from "@/app/site-config";

import styles from "./tools.module.css";

type ToolFilter = "all" | ToolCategory;
const toolDirectoryStateEvent = "tool-directory-statechange";

function subscribeToToolDirectoryFragment(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(toolDirectoryStateEvent, onStoreChange);
  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(toolDirectoryStateEvent, onStoreChange);
  };
}

function getToolDirectoryFragment() {
  return window.location.hash;
}

export function ToolDirectory({ locale }: { locale: SiteLocale }) {
  const fragment = useSyncExternalStore(
    subscribeToToolDirectoryFragment,
    getToolDirectoryFragment,
    () => "",
  );
  const directoryState = useMemo(
    () =>
      fragment
        ? parseToolDirectoryFragment(fragment, toolCategories)
        : defaultToolDirectoryState,
    [fragment],
  );
  const copy = toolHubCopy[locale];
  const tools = useMemo(
    () =>
      filterToolDirectoryTools(getLiveTools(), locale, {
        ...directoryState,
        status: "all",
      }),
    [directoryState, locale],
  );

  const filters: readonly { id: ToolFilter; label: string }[] = [
    { id: "all", label: copy.allTools },
    ...toolCategories.map((category) => ({
      id: category,
      label: copy.categories[category],
    })),
  ];
  const updateDirectoryState = (
    updates: Partial<ToolDirectoryState>,
    historyMode: "push" | "replace" = "push",
  ) => {
    const nextState = { ...directoryState, ...updates };
    const nextHash = buildToolDirectoryFragment(window.location.hash, nextState);
    if (nextHash === window.location.hash) return;
    window.history[historyMode === "push" ? "pushState" : "replaceState"](
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}${nextHash}`,
    );
    window.dispatchEvent(new Event(toolDirectoryStateEvent));
  };

  return (
    <>
      <div className={styles.directoryControls}>
        <div className={styles.searchControl}>
          <label
            className={styles.controlLabel}
            htmlFor="tool-directory-search"
          >
            {copy.searchLabel}
          </label>
          <div className={styles.searchField}>
            <input
              aria-controls="tool-directory-results"
              autoComplete="off"
              id="tool-directory-search"
              maxLength={120}
              onChange={(event) =>
                updateDirectoryState({ query: event.target.value }, "replace")
              }
              placeholder={copy.searchPlaceholder}
              type="search"
              value={directoryState.query}
            />
            <button
              aria-label={copy.clearSearch}
              disabled={!directoryState.query}
              onClick={() => updateDirectoryState({ query: "" }, "replace")}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.categoryControl}>
        <span className={styles.controlLabel} id="tool-category-filter-label">
          {copy.filterLabel}
        </span>
        <div className={styles.filterScroller}>
          <div
            aria-labelledby="tool-category-filter-label"
            className={styles.filters}
            role="group"
          >
            {filters.map((item) => (
              <button
                aria-controls="tool-directory-results"
                aria-pressed={directoryState.category === item.id}
                className={styles.filterButton}
                key={item.id}
                onClick={() => updateDirectoryState({ category: item.id })}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <output
        aria-atomic="true"
        aria-live="polite"
        className={styles.resultCount}
        id="tool-directory-result-count"
      >
        {copy.resultCount(tools.length)}
      </output>

      <div
        aria-labelledby="tool-directory-result-count"
        className={styles.grid}
        id="tool-directory-results"
      >
        {tools.map((tool) => {
          const content = tool.copy[locale];
          const href = getToolHref(locale, tool);
          const cardContent = (
            <>
              <div className={styles.cardHeader}>
                <span className={styles.icon} aria-hidden="true">
                  {tool.icon}
                </span>
                <span className={styles.status}>
                  <i aria-hidden="true" />
                  {copy.categories[tool.category]}
                </span>
              </div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h3>{content.name}</h3>
              <p className={styles.cardDescription}>{content.description}</p>
              {content.highlights.length > 0 ? (
                <ul className={styles.highlights} aria-label={copy.detailFeatures}>
                  {content.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              <span className={styles.cardAction}>
                {content.action || copy.openTool}
                <b aria-hidden="true">↗</b>
              </span>
            </>
          );

          return (
            <a
              className={`${styles.card} ${styles.liveCard}`}
              data-featured={tool.featured ? "true" : "false"}
              data-tool-status={tool.status}
              href={href}
              key={tool.slug}
            >
              {cardContent}
            </a>
          );
        })}
      </div>

      {tools.length === 0 && <p className={styles.empty}>{copy.noResults}</p>}
    </>
  );
}
