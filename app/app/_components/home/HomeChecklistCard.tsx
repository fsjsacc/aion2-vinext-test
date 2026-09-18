"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

import { trackEvent } from "@/app/analytics";
import {
  CHECKLIST_BUILTIN_DEFINITIONS,
  getChecklistItemLabel,
} from "@/app/checklist-activities";
import {
  checklistStore,
  ensureBuiltinChecklistItems,
  readChecklistSnapshot,
  updateChecklistItems,
} from "@/app/checklist-store";
import type { HomeLocale } from "@/app/home-i18n";

export function HomeChecklistCard({
  locale,
  checklistHref,
  copy,
}: {
  locale: HomeLocale;
  checklistHref: string;
  copy: Readonly<Record<string, string>>;
}) {
  const t = (value: string) => copy[value] ?? value;
  const storedChecklist = useSyncExternalStore(
    checklistStore.subscribe,
    checklistStore.getSnapshot,
    checklistStore.getServerSnapshot,
  );
  const checklistSnapshot = useMemo(
    () => readChecklistSnapshot(storedChecklist),
    [storedChecklist],
  );
  const checklistItems = checklistSnapshot.items;
  const checklistSummary = useMemo(
    () =>
      [...checklistItems]
        .sort((left, right) => {
          if (left.done !== right.done) return left.done ? 1 : -1;
          if (left.frequency !== right.frequency) {
            if (left.frequency === "daily") return -1;
            if (right.frequency === "daily") return 1;
            if (left.frequency === "weekly") return -1;
            if (right.frequency === "weekly") return 1;
          }
          return left.source === "builtin" && right.source !== "builtin" ? -1 : 0;
        })
        .slice(0, 3),
    [checklistItems],
  );
  const completedCount = checklistItems.filter((item) => item.done).length;

  useEffect(() => {
    ensureBuiltinChecklistItems(CHECKLIST_BUILTIN_DEFINITIONS);
  }, []);

  const toggleChecklistItem = (id: string) => {
    const currentItem = checklistItems.find((item) => item.id === id);
    if (!currentItem) return;
    const done = !currentItem.done;
    updateChecklistItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              done,
              ...(done
                ? { completedAt: new Date().toISOString() }
                : { completedAt: undefined }),
            }
          : item,
      ),
    );
    trackEvent(done ? "checklist_item_complete" : "checklist_item_reopen", {
      frequency: currentItem.frequency,
      has_map_ref: Boolean(currentItem.mapRef),
      surface: "home",
    });
  };

  return (
    <aside
      className="expedition-card hero-checklist-card"
      aria-labelledby="hero-checklist-title"
    >
      <div className="card-topline">
        <p>{t("MY CHECKLIST / THIS DEVICE")}</p>
        <span>
          {String(completedCount).padStart(2, "0")} /{" "}
          {String(checklistItems.length).padStart(2, "0")}
        </span>
      </div>
      <h2 id="hero-checklist-title">{t("My checklist")}</h2>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={t("Checklist progress")}
        aria-valuemin={0}
        aria-valuemax={Math.max(checklistItems.length, 1)}
        aria-valuenow={completedCount}
        aria-valuetext={
          checklistItems.length
            ? `${completedCount} / ${checklistItems.length}`
            : t("No checklist items yet.")
        }
      >
        <span
          style={{
            width: `${
              checklistItems.length
                ? (completedCount / checklistItems.length) * 100
                : 0
            }%`,
          }}
        />
      </div>
      <div className="checklist">
        {checklistSummary.length ? (
          checklistSummary.map((item) => (
            <label className="check-row" key={item.id}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleChecklistItem(item.id)}
              />
              <span className="custom-check" aria-hidden="true" />
              <span className="check-row-copy">
                <span>{getChecklistItemLabel(item, locale)}</span>
                <small>
                  {t(
                    item.frequency === "daily"
                      ? "Daily"
                      : item.frequency === "weekly"
                        ? "Weekly"
                        : "One-time",
                  )}
                </small>
              </span>
            </label>
          ))
        ) : (
          <p className="checklist-empty">{t("No checklist items yet.")}</p>
        )}
      </div>
      <div className="checklist-card-footer">
        <p>
          {checklistSnapshot.storageUnavailable
            ? t("Local storage is unavailable; changes may not persist.")
            : t(
                "Saved on this device. Daily and weekly cycles reset automatically.",
              )}
        </p>
        <a
          href={checklistHref}
          onClick={() =>
            trackEvent("home_checklist_open", {
              item_count: checklistItems.length,
              surface: "home-hero",
            })
          }
        >
          {t("Open full checklist")} <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}

