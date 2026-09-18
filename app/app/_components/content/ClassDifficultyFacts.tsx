import {
  classDifficultyProfiles,
  type ClassDifficultyProfile,
  type ClassDifficultyScore,
} from "@/app/class-guide-content";
import { classDifficultyFactsCopy } from "@/app/content-facts-localization";
import type { ContentEntry } from "@/app/content-registry";
import { localizedHref, type SiteLocale } from "@/app/site-config";

import styles from "./ClassDifficultyFacts.module.css";

const metricKeys = [
  "inputs",
  "positioning",
  "resourceManagement",
  "partyResponsibility",
  "errorRecovery",
] as const;

function isDifficultyScore(value: unknown): value is ClassDifficultyScore {
  return Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 5;
}

function isClassDifficultyProfile(value: unknown): value is ClassDifficultyProfile {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const profile = value as Partial<ClassDifficultyProfile>;
  return (
    typeof profile.slug === "string" &&
    profile.basis === "editorial-assessment" &&
    Boolean(profile.names && typeof profile.names === "object") &&
    Boolean(profile.role && typeof profile.role === "object") &&
    Boolean(profile.weapon && typeof profile.weapon === "object") &&
    isDifficultyScore(profile.overall) &&
    Boolean(
      profile.metrics &&
      metricKeys.every((key) => isDifficultyScore(profile.metrics?.[key])),
    )
  );
}

function entryClassProfile(entry: ContentEntry) {
  const profile = entry.properties?.classProfile;
  return isClassDifficultyProfile(profile) ? profile : null;
}

function entryComparisonProfiles(entry: ContentEntry) {
  const comparison = entry.properties?.classComparison;
  if (comparison && typeof comparison === "object" && !Array.isArray(comparison)) {
    const profiles = (comparison as { profiles?: unknown }).profiles;
    if (Array.isArray(profiles) && profiles.every(isClassDifficultyProfile)) {
      return profiles;
    }
  }
  return entry.slug === "difficulty-comparison" ? classDifficultyProfiles : null;
}

function Score({
  label,
  value,
}: {
  label: string;
  value: ClassDifficultyScore;
}) {
  return (
    <span
      className={styles.score}
      aria-label={`${label}: ${value} / 5`}
      title={`${label}: ${value} / 5`}
    >
      <span aria-hidden="true">
        {[1, 2, 3, 4, 5].map((step) => (
          <i className={step <= value ? styles.active : undefined} key={step} />
        ))}
      </span>
      <b>{value}</b>
    </span>
  );
}

function ProfilePanel({
  locale,
  profile,
}: {
  locale: SiteLocale;
  profile: ClassDifficultyProfile;
}) {
  const ui = classDifficultyFactsCopy[locale];
  return (
    <section className={styles.profilePanel} aria-labelledby="class-difficulty-title">
      <div className={styles.profileHeader}>
        <div>
          <p>{ui.editorial}</p>
          <h2 id="class-difficulty-title">{profile.names[locale]}</h2>
          <span>{ui.notTier}</span>
        </div>
        <div className={styles.overall}>
          <span>{ui.overall}</span>
          <strong>{profile.overall}<small>/5</small></strong>
          <small>{ui.scale}</small>
        </div>
      </div>

      <dl className={styles.officialFacts}>
        <div>
          <dt>{ui.weapon}</dt>
          <dd>{profile.weapon[locale]}</dd>
        </div>
        <div>
          <dt>{ui.role}</dt>
          <dd>{profile.role[locale]}</dd>
        </div>
      </dl>

      <div className={styles.metricGrid}>
        {metricKeys.map((key) => (
          <div key={key}>
            <span>{ui.metrics[key]}</span>
            <Score label={ui.metrics[key]} value={profile.metrics[key]} />
          </div>
        ))}
      </div>

      <p className={styles.rationale}>{profile.rationale[locale]}</p>
      <footer className={styles.methodLine}>
        <span>{ui.assessed}: {profile.assessedAt}</span>
        <span>{ui.method}: {profile.methodVersion}</span>
        <span>{ui.confidence}: {ui.medium}</span>
      </footer>
    </section>
  );
}

function ComparisonPanel({
  locale,
  profiles,
}: {
  locale: SiteLocale;
  profiles: readonly ClassDifficultyProfile[];
}) {
  const ui = classDifficultyFactsCopy[locale];
  return (
    <section className={styles.comparisonPanel} aria-labelledby="class-comparison-title">
      <header>
        <p>{ui.editorial}</p>
        <h2 id="class-comparison-title">{ui.comparisonTitle}</h2>
        <span>{ui.comparisonIntro}</span>
      </header>
      <div className={styles.tableScroller}>
        <table>
          <thead>
            <tr>
              <th scope="col">{ui.class}</th>
              <th scope="col">{ui.weapon}</th>
              <th scope="col">{ui.overall}</th>
              {metricKeys.map((key) => (
                <th scope="col" key={key}>{ui.metrics[key]}</th>
              ))}
              <th scope="col">{ui.details}</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.slug}>
                <th scope="row">
                  <strong>{profile.names[locale]}</strong>
                  <span>{profile.rationale[locale]}</span>
                </th>
                <td>{profile.weapon[locale]}</td>
                <td><Score label={ui.overall} value={profile.overall} /></td>
                {metricKeys.map((key) => (
                  <td key={key}>
                    <Score label={ui.metrics[key]} value={profile.metrics[key]} />
                  </td>
                ))}
                <td>
                  <a href={localizedHref(locale, `/classes/${profile.routeSlug}/`)}>
                    {ui.open}<span aria-hidden="true"> →</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer>
        <span>{ui.notTier}</span>
        <span>{ui.assessed}: {profiles[0]?.assessedAt}</span>
        <span>{ui.method}: {profiles[0]?.methodVersion}</span>
      </footer>
    </section>
  );
}

export function ClassDifficultyFacts({
  entry,
  locale,
}: {
  entry: ContentEntry;
  locale: SiteLocale;
}) {
  const comparison = entryComparisonProfiles(entry);
  if (comparison) return <ComparisonPanel locale={locale} profiles={comparison} />;
  const profile = entryClassProfile(entry);
  return profile ? <ProfilePanel locale={locale} profile={profile} /> : null;
}
