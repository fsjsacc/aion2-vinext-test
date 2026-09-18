"use client";

import type {
  ContentPrimaryAction as ContentPrimaryActionRecord,
  ContentSection,
} from "@/app/content-registry";
import { trackEvent } from "@/app/analytics";
import {
  resolveContentLocale,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./ContentDetail.module.css";

type ContentPrimaryActionProps = {
  action: ContentPrimaryActionRecord;
  locale: SiteLocale;
  section: ContentSection;
  service: string;
  slug: string;
};

export function ContentPrimaryAction({
  action,
  locale,
  section,
  service,
  slug,
}: ContentPrimaryActionProps) {
  const copy =
    action.translations[locale] ??
    action.translations[resolveContentLocale(locale)] ??
    action.translations.en;
  // Keep the client boundary independent from the server-side content
  // registry. Importing the registry at runtime pulls Next request context
  // (`next/headers`) into the browser bundle.
  const href = action.hrefs?.[locale] ?? action.href;
  const headingId = `content-action-${action.id}`;
  const destinationHost = new URL(href).hostname;

  return (
    <section className={styles.primaryAction} aria-labelledby={headingId}>
      <p className={styles.primaryActionEyebrow}>{copy.eyebrow}</p>
      <h2 id={headingId}>{copy.title}</h2>
      <p className={styles.primaryActionDescription}>{copy.description}</p>

      <dl className={styles.primaryActionFacts}>
        {copy.facts.map((fact) => (
          <div key={`${fact.label}-${fact.value}`}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.primaryActionFooter}>
        <a
          className={styles.primaryActionLink}
          href={href}
          onClick={() => {
            trackEvent("content_primary_action_click", {
              action_id: action.id,
              content_slug: slug,
              destination_host: destinationHost,
              locale,
              section,
              service,
              surface: "content-detail",
              target_key: `${section}/${slug}`,
              target_kind: "content",
            });
          }}
          rel="noopener noreferrer external"
          target="_blank"
        >
          {copy.label}
          <span aria-hidden="true">↗</span>
        </a>
        <p>{copy.note}</p>
      </div>
    </section>
  );
}
