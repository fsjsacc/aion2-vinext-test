"use client";

import { ExternalLink, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { curatedItemSlug } from "@/app/curated-item-links";
import { itemDetailCopy } from "@/app/item-detail-copy";
import {
  isOfficialItemDetail,
  type OfficialItemDetail as OfficialItemDetailRecord,
  type OfficialItemStat,
} from "@/app/official-item-detail";
import {
  localizedHref,
  type SiteLocale,
} from "@/app/site-config";
import { ProvenancePanel } from "@/app/_components/trust/ProvenancePanel";

import styles from "./OfficialItemDetail.module.css";

type Props = {
  databaseHref: string;
  initialItem: OfficialItemDetailRecord;
  locale: SiteLocale;
};

function displayValue(value: string | number | null, fallback: string) {
  return value === null || value === "" ? fallback : String(value);
}

function statValue(stat: OfficialItemStat, fallback: string) {
  if (stat.minValue && stat.value && stat.minValue !== stat.value) {
    return `${stat.minValue}–${stat.value}`;
  }
  return stat.value ?? stat.minValue ?? fallback;
}

function hasBonus(value: string | null) {
  return Boolean(value && !/^0(?:\.0+)?%?$/u.test(value));
}

function measuredRange(
  minimum: number | null,
  maximum: number | null,
  unit: string,
) {
  if (minimum === null && maximum === null) return null;
  const value =
    minimum !== null && maximum !== null && minimum !== maximum
      ? `${minimum}–${maximum}`
      : String(minimum ?? maximum);
  return `${value} ${unit}`;
}

function retrievalTimestamp(value: string | null) {
  if (!value) return null;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return null;
  return `${new Date(timestamp).toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

export function OfficialItemDetail({
  databaseHref,
  initialItem,
  locale,
}: Props) {
  const copy = itemDetailCopy[locale];
  const [item, setItem] = useState(initialItem);
  const [pendingEnchant, setPendingEnchant] = useState<number | null>(null);
  const [failedEnchant, setFailedEnchant] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const requestController = useRef<AbortController | null>(null);
  useEffect(() => () => requestController.current?.abort(), []);
  useEffect(() => {
    if (initialItem.detailStatus !== "summary") return;

    const controller = new AbortController();
    requestController.current = controller;
    void fetch(
      `/api/items/${initialItem.id}?locale=${locale}&enchant=0`,
      { headers: { accept: "application/json" }, signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) return null;
        const next: unknown = await response.json();
        return isOfficialItemDetail(next, initialItem.id) &&
          next.enchantLevel === 0
          ? next
          : null;
      })
      .then((next) => {
        if (!controller.signal.aborted && next) setItem(next);
      })
      .catch(() => {
        // The server-rendered catalog summary remains usable when enrichment fails.
      })
      .finally(() => {
        if (requestController.current === controller) {
          requestController.current = null;
        }
      });

    return () => controller.abort();
  }, [initialItem.detailStatus, initialItem.id, locale]);
  const maximumEnhancement = Math.min(
    50,
    Math.max(
      0,
      (item.maxEnchantLevel ?? 0) +
        (item.maxExceedEnchantLevel ?? 0),
    ),
  );
  const curatedSlug = curatedItemSlug(item.id);
  const curatedHref = curatedSlug
    ? localizedHref(locale, `/database/${curatedSlug}/`)
    : null;
  const typeLabel =
    item.typeCode &&
    item.typeCode in copy.typeLabels
      ? copy.typeLabels[item.typeCode as keyof typeof copy.typeLabels]
      : item.typeCode ?? copy.unknown;

  const loadEnhancement = async (level: number) => {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setPendingEnchant(level);
    setFailedEnchant(null);
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `/api/items/${item.id}?locale=${locale}&enchant=${level}`,
        { headers: { accept: "application/json" }, signal: controller.signal },
      );
      if (!response.ok) throw new Error("Official item request failed");
      const next: unknown = await response.json();
      if (
        !isOfficialItemDetail(next, item.id) ||
        next.enchantLevel !== level
      ) {
        throw new Error("Official item response mismatch");
      }
      setItem(next);
    } catch {
      if (!controller.signal.aborted) {
        setFailedEnchant(level);
        setError(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        setPendingEnchant(null);
        setLoading(false);
      }
    }
  };

  const facts = [
    [copy.itemId, item.id],
    [copy.grade, item.gradeName],
    [copy.category, item.categoryName],
    [copy.type, typeLabel],
    [copy.itemLevel, displayValue(item.itemLevel, copy.unknown)],
    [copy.equipLevel, displayValue(item.equipLevel, copy.unknown)],
    [copy.race, item.raceName || copy.none],
    [copy.classes, item.classNames.length ? item.classNames.join(" / ") : copy.none],
  ];
  const limitCandidates: [string, number | null][] = [
    [copy.maxEnchant, item.maxEnchantLevel],
    [copy.maxExceed, item.maxExceedEnchantLevel],
    [copy.safeEnchant, item.safeEnchantLevel],
    [copy.magicSlots, item.magicStoneSlots],
    [copy.godSlots, item.godStoneSlots],
  ];
  const limits = limitCandidates.filter(
    (entry): entry is [string, number] => entry[1] !== null,
  );
  const duration = measuredRange(
    item.durationMin,
    item.durationMax,
    copy.minutes,
  );
  const retrievedAt = retrievalTimestamp(item.sourceRetrievedAt);
  const provenanceSources = [
    {
      kind: "official" as const,
      label: copy.officialDataLabel,
      publisher: "NCSOFT",
      retrievedAt: item.sourceRetrievedAt,
      url: item.officialSourceUrl,
    },
    ...(item.officialPageUrl !== item.officialSourceUrl
      ? [{
          kind: "official" as const,
          label: copy.officialPageLabel,
          publisher: "NCSOFT",
          url: item.officialPageUrl,
        }]
      : []),
  ];
  const usageFacts: [string, string | number][] = [
    ...(duration ? [[copy.duration, duration] as [string, string]] : []),
    ...(item.coolTime !== null && item.coolTime > 0
      ? [[copy.cooldown, `${item.coolTime} ${copy.seconds}`] as [string, string]]
      : []),
    ...(item.subSkillCountMax !== null
      ? [[copy.imprintSkillLimit, item.subSkillCountMax] as [string, number]]
      : []),
    ...(item.subStatRandom !== null
      ? [[copy.randomImprint, item.subStatRandom ? copy.yes : copy.no] as [string, string]]
      : []),
    ...(retrievedAt
      ? [[copy.retrievedAt, retrievedAt] as [string, string]]
      : []),
  ];
  const flags = [
    [copy.storable, item.storable],
    [copy.tradable, item.tradable],
    [copy.personalTradable, item.personalTradable],
    [copy.enchantable, item.enchantable],
    [copy.decomposable, item.decomposable],
  ] as const;

  return (
    <div className={styles.detail}>
      <a className={styles.backLink} href={databaseHref}>
        <span aria-hidden="true">←</span> {copy.back}
      </a>

      <section className={styles.identityCard}>
        <span className={styles.iconFrame} data-grade={item.gradeCode?.toLowerCase()}>
          {/* Official media remains on its credited origin. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={copy.imageAlt(item.name, item.categoryName)}
            fetchPriority="high"
            height="168"
            referrerPolicy="no-referrer"
            src={item.iconUrl}
            width="168"
          />
        </span>
        <div className={styles.identityCopy}>
          <p>{copy.snapshot}</p>
          <h1>{item.name}</h1>
          <div className={styles.identityTags}>
            <span>{item.gradeName}</span>
            <span>{item.categoryName}</span>
            <span>ID {item.id}</span>
          </div>
          <p className={styles.sourceNote}>{copy.sourceNote}</p>
        </div>
      </section>

      <div className={styles.provenance}>
        <ProvenancePanel
          locale={locale}
          note={copy.sourceNote}
          reportService="unknown"
          retrievedAt={item.sourceRetrievedAt}
          sources={provenanceSources}
          status={item.detailStatus === "full" ? "official-detail" : "catalog-summary"}
          targetKey={item.id}
          targetKind="item"
          targetLabel={item.name}
          version={item.releaseVersion}
        />
      </div>

      {item.detailStatus === "summary" ? (
        <div className={styles.summaryNotice} role="status">
          <strong>{copy.summaryTitle}</strong>
          <span>{copy.summaryNotice}</span>
        </div>
      ) : null}

      {maximumEnhancement > 0 ? (
        <section className={styles.enhancement} aria-labelledby="item-enhancement-title">
          <div>
            <p>{copy.enhancement}</p>
            <h2 id="item-enhancement-title">
              {copy.enhancementLevel} +{item.enchantLevel}
            </h2>
          </div>
          <label>
            <span>{copy.enhancementLevel}</span>
            <select
              disabled={loading}
              onChange={(event) => void loadEnhancement(Number(event.target.value))}
              value={pendingEnchant ?? item.enchantLevel}
            >
              {Array.from({ length: maximumEnhancement + 1 }, (_, level) => (
                <option key={level} value={level}>+{level}</option>
              ))}
            </select>
          </label>
          <div
            aria-live="polite"
            className={styles.enhancementStatus}
            data-error={error || undefined}
          >
            {loading ? copy.updating : error ? copy.updateError : null}
            {error && failedEnchant !== null ? (
              <button onClick={() => void loadEnhancement(failedEnchant)} type="button">
                <RotateCcw aria-hidden="true" size={14} />
                {copy.retry}
              </button>
            ) : null}
          </div>
        </section>
      ) : null}

      <div className={styles.contentGrid}>
        <div className={styles.primaryColumn}>
          {item.description ? (
            <section className={styles.panel}>
              <h2>{copy.description}</h2>
              <p className={styles.description}>{item.description}</p>
            </section>
          ) : null}

          {item.summaryLines.length &&
          (item.detailStatus === "summary" || !item.mainStats.length) ? (
            <section className={styles.panel}>
              <h2>{copy.summaryTitle}</h2>
              <ul className={styles.summaryLines}>
                {item.summaryLines.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </section>
          ) : null}

          {item.mainStats.length ? (
            <section className={styles.panel}>
              <h2>{copy.mainStats}</h2>
              <div className={styles.tableScroller}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">{copy.stat}</th>
                      <th scope="col">{copy.baseValue}</th>
                      <th scope="col">{copy.enchantBonus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.mainStats.map((stat) => (
                      <tr key={`${stat.id}:${stat.exceed ? "exceed" : "base"}`}>
                        <th scope="row">{stat.name}</th>
                        <td>{statValue(stat, copy.unknown)}</td>
                        <td>{hasBonus(stat.extra) ? `+${stat.extra}` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {item.subStats.length ? (
            <section className={styles.panel}>
              <h2>{copy.candidateStats}</h2>
              <p className={styles.helper}>{copy.candidateHelp(item.subStatCount)}</p>
              <div className={styles.candidateGrid}>
                {item.subStats.map((stat) => (
                  <div key={stat.id}>
                    <span>{stat.name}</span>
                    <b>{statValue(stat, copy.unknown)}</b>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {item.sources.length || item.costumes.length ? (
            <section className={styles.panel}>
              {item.sources.length ? (
                <div className={styles.tagGroup}>
                  <h2>{copy.sources}</h2>
                  <ul>{item.sources.map((source) => <li key={source}>{source}</li>)}</ul>
                </div>
              ) : null}
              {item.costumes.length ? (
                <div className={styles.tagGroup}>
                  <h2>{copy.costumes}</h2>
                  <ul>{item.costumes.map((costume) => <li key={costume}>{costume}</li>)}</ul>
                </div>
              ) : null}
            </section>
          ) : null}
        </div>

        <aside className={styles.sideColumn}>
          <section className={styles.panel}>
            <h2>{copy.eyebrow}</h2>
            <dl className={styles.factList}>
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              {limits.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              {usageFacts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.panel}>
            <h2>{copy.systemStates}</h2>
            <ul className={styles.flags}>
              {flags.map(([label, value]) => (
                <li data-state={value === null ? "unknown" : value ? "yes" : "no"} key={label}>
                  <span>{label}</span>
                  <b>{value === null ? copy.unknown : value ? copy.yes : copy.no}</b>
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.actions}>
            {curatedHref ? (
              <a href={curatedHref}>
                {copy.curated}<span aria-hidden="true"> →</span>
              </a>
            ) : null}
            <a href={item.officialPageUrl} rel="noopener noreferrer" target="_blank">
              {copy.official}<ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default OfficialItemDetail;
