import {
  itemFactsCopy,
  type ItemFactsCopy,
} from "@/app/content-facts-localization";
import type { ContentEntry } from "@/app/content-registry";
import type { ItemDatabaseRecord } from "@/app/item-database-types";
import {
  resolveContentLocale,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./StructuredContentFacts.module.css";

export function isItemDatabaseRecord(value: unknown): value is ItemDatabaseRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Partial<ItemDatabaseRecord>;
  return (
    typeof record.id === "string" &&
    typeof record.slug === "string" &&
    typeof record.icon === "string" &&
    typeof record.snapshotDate === "string" &&
    Boolean(record.names && typeof record.names === "object") &&
    Boolean(record.officialUrls && typeof record.officialUrls === "object") &&
    Array.isArray(record.mainStats)
  );
}

export function getItemDatabaseRecord(entry: ContentEntry) {
  const item = entry.properties?.item;
  return isItemDatabaseRecord(item) ? item : null;
}

function displayValue(value: string | number | null, unknown: string) {
  return value === null || value === "" ? unknown : String(value);
}

function localizedList(values: readonly string[], none: string) {
  return values.length ? values.join(" / ") : none;
}

function flagValue(
  value: boolean | null,
  copy: ItemFactsCopy,
) {
  return value === null ? copy.unknown : value ? copy.yes : copy.no;
}

function statValue(stat: ItemDatabaseRecord["mainStats"][number], unknown: string) {
  if (stat.minValue && stat.value && stat.minValue !== stat.value) {
    return `${stat.minValue}–${stat.value}`;
  }
  return stat.value ?? stat.minValue ?? unknown;
}

export function ItemFactsPanel({
  item,
  locale,
}: {
  item: ItemDatabaseRecord;
  locale: SiteLocale;
}) {
  const contentLocale = resolveContentLocale(locale);
  const copy = itemFactsCopy[locale];
  const facts = [
    [copy.id, item.id],
    [copy.quality, item.gradeNames[contentLocale]],
    [copy.category, item.categoryNames[contentLocale]],
    [copy.itemLevel, displayValue(item.itemLevel, copy.unknown)],
    [copy.equipLevel, displayValue(item.equipLevel, copy.unknown)],
    [copy.race, localizedList(item.raceNames[contentLocale], copy.none)],
    [copy.class, localizedList(item.classNames[contentLocale], copy.none)],
    [
      copy.acquisition,
      item.acquisition?.[contentLocale] || copy.unknown,
    ],
  ];
  const numericFactCandidates: [string, number | null][] = [
    [copy.enchant, item.maxEnchantLevel],
    [copy.exceed, item.maxExceedEnchantLevel],
    [copy.magicStone, item.magicStoneSlots],
    [copy.godStone, item.godStoneSlots],
  ];
  const numericFacts = numericFactCandidates.filter(
    (fact): fact is [string, number] => fact[1] !== null,
  );
  const flags: [string, boolean | null][] = [
    [copy.storable, item.flags.storable],
    [copy.tradable, item.flags.tradable],
    [copy.personalTradable, item.flags.personalTradable],
    [copy.enchantable, item.flags.enchantable],
    [copy.decomposable, item.flags.decomposable],
  ];

  return (
    <section className={styles.itemPanel} aria-labelledby="official-item-facts-title">
      <div className={styles.itemIdentity}>
        <span className={styles.itemIcon}>
          {/* Official media stays on its credited origin. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`${item.names[contentLocale]} ${item.categoryNames[contentLocale]}`}
            height="144"
            referrerPolicy="no-referrer"
            src={item.icon}
            width="144"
          />
        </span>
        <div>
          <p>{copy.label}</p>
          <h2 id="official-item-facts-title">{item.names[contentLocale]}</h2>
          <span>
            {copy.snapshot}:{" "}
            <time dateTime={item.snapshotDate}>{item.snapshotDate}</time>
          </span>
        </div>
      </div>

      <dl className={styles.factGrid}>
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        {numericFacts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {item.descriptions || item.effects ? (
        <div className={styles.officialText}>
          {item.descriptions ? (
            <div>
              <h3>{copy.description}</h3>
              <p>{item.descriptions[contentLocale]}</p>
            </div>
          ) : null}
          {item.effects ? (
            <div>
              <h3>{copy.effect}</h3>
              <p>{item.effects[contentLocale]}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={styles.flagSection}>
        <h3>{copy.states}</h3>
        <ul>
          {flags.map(([label, value]) => (
            <li data-state={value === null ? "unknown" : value ? "yes" : "no"} key={label}>
              <span>{label}</span>
              <b>{flagValue(value, copy)}</b>
            </li>
          ))}
        </ul>
      </div>

      {item.mainStats.length ? (
        <div className={styles.statsSection}>
          <h3>{copy.mainStats}</h3>
          <div className={styles.tableScroller}>
            <table>
              <thead>
                <tr>
                  <th scope="col">{copy.stat}</th>
                  <th scope="col">{copy.value}</th>
                </tr>
              </thead>
              <tbody>
                {item.mainStats.map((stat) => (
                  <tr key={stat.id}>
                    <th scope="row">{stat.names[contentLocale]}</th>
                    <td>{statValue(stat, copy.unknown)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <a
        className={styles.officialLink}
        href={item.officialUrls[contentLocale]}
        rel="noopener noreferrer"
        target="_blank"
      >
        {copy.official}<span aria-hidden="true"> ↗</span>
      </a>
    </section>
  );
}
