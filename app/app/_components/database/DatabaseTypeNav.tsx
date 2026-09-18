import { Medal, PackageSearch, Sparkles } from "lucide-react";

import {
  databaseTypeDefinitions,
  databaseTypeNavigationCopy,
  type DatabaseTypeId,
} from "@/app/database-type-registry";
import {
  localizedHref,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./DatabaseTypeNav.module.css";

type DatabaseTypeNavProps = {
  activeType: DatabaseTypeId;
  locale: SiteLocale;
};

const typeIcons = {
  items: PackageSearch,
  skills: Sparkles,
  titles: Medal,
} as const;

export function DatabaseTypeNav({
  activeType,
  locale,
}: DatabaseTypeNavProps) {
  const copy = databaseTypeNavigationCopy[locale];

  return (
    <nav className={styles.navigation} aria-label={copy.ariaLabel}>
      <p className={styles.label}>{copy.sectionLabel}</p>
      <ul className={styles.list}>
        {databaseTypeDefinitions
          .filter((definition) => definition.status === "live")
          .map((definition) => {
            const Icon = typeIcons[definition.id];
            const typeCopy = copy.types[definition.id];
            return (
              <li key={definition.id}>
                <a
                  aria-current={
                    definition.id === activeType ? "page" : undefined
                  }
                  className={styles.item}
                  data-active={definition.id === activeType}
                  href={localizedHref(locale, definition.href)}
                >
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={19} strokeWidth={1.7} />
                  </span>
                  <span className={styles.text}>
                    <strong>{typeCopy.label}</strong>
                    <small>{typeCopy.description}</small>
                  </span>
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default DatabaseTypeNav;
