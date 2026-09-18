"use client";

import { trackEvent } from "@/app/analytics";
import type { ContentSection } from "@/app/content-registry";
import type { SiteLocale } from "@/app/site-config";

import styles from "./ContentDetail.module.css";

type ContentFaqItem = {
  question: string;
  answer: string;
};

type ContentFaqListProps = {
  items: readonly ContentFaqItem[];
  locale: SiteLocale;
  section: ContentSection;
  service: string;
  slug: string;
};

export function ContentFaqList({
  items,
  locale,
  section,
  service,
  slug,
}: ContentFaqListProps) {
  return (
    <div className={styles.faqList}>
      {items.map((item, faqIndex) => (
        <details
          className={styles.faqItem}
          key={`${item.question}-${faqIndex}`}
          onToggle={(event) => {
            trackEvent("content_faq_toggle", {
              content_slug: slug,
              faq_index: faqIndex + 1,
              faq_state: event.currentTarget.open ? "open" : "closed",
              locale,
              section,
              service,
              surface: "content-detail",
              target_key: `${section}/${slug}`,
              target_kind: "content",
            });
          }}
        >
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
