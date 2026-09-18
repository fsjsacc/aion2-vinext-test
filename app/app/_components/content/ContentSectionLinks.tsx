"use client";

import type {
  ContentSection,
  ContentSectionBlock,
} from "@/app/content-registry";
import { trackEvent } from "@/app/analytics";
import type { SiteLocale } from "@/app/site-config";

import styles from "./ContentDetail.module.css";

type ContentSectionLinksProps = {
  links: NonNullable<ContentSectionBlock["links"]>;
  locale: SiteLocale;
  section: ContentSection;
  service: string;
  slug: string;
};

export function ContentSectionLinks({
  links,
  locale,
  section,
  service,
  slug,
}: ContentSectionLinksProps) {
  return (
    <div className={styles.sectionLinks}>
      {links.map((link) => (
        <a
          href={link.href}
          key={link.id}
          onClick={() => {
            trackEvent("guide_to_map_click", {
              content_slug: slug,
              filter_type: link.filterSubtype,
              locale,
              map_name: link.mapSlug,
              section,
              service,
              entry_source: "content-detail-rift-map",
              surface: "content-detail",
              target_key: link.mapSlug,
              target_kind: "map",
            });
          }}
        >
          <span>{link.label}</span>
          <p>{link.description}</p>
          <b aria-hidden="true">→</b>
        </a>
      ))}
    </div>
  );
}
