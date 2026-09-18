import {
  isFallbackTranslationLocale,
  localizationStatusCopy,
} from "@/app/localization-status";
import type { SiteLocale } from "@/app/site-config";

import styles from "./LocalizationStatusNotice.module.css";

export function LocalizationStatusNotice({
  locale,
  compact = false,
}: {
  locale: SiteLocale;
  compact?: boolean;
}) {
  if (!isFallbackTranslationLocale(locale)) return null;
  const copy = localizationStatusCopy[locale];

  return (
    <aside
      className={styles.notice}
      data-compact={compact ? "true" : "false"}
      aria-label={copy.badge}
    >
      <p className={styles.marker}>{copy.badge}</p>
      <div className={styles.copy}>
        <strong>{copy.title}</strong>
        <p>{copy.description}</p>
      </div>
    </aside>
  );
}
