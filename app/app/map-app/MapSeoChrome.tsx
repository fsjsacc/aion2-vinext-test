import type { ReactNode } from "react";
import { AnalyticsLink } from "./AnalyticsLink";
import {
  getContentEntry,
  getContentHref,
  type ContentSection,
} from "@/app/content-registry";

import {
  copy,
  getMapName,
  localePath,
  type LocaleSlug,
  type SeoMap,
} from "@/app/map-seo";
import { siteLocaleConfig } from "@/app/site-config";

export function MapBreadcrumbs({
  locale,
  map,
  parent,
  current,
}: {
  locale: LocaleSlug;
  map?: SeoMap;
  parent?: { label: string; href: string };
  current?: string;
}) {
  const items: Array<{ label: string; href?: string }> = [
    { label: "AION2 KINA", href: `/${locale}/` },
    {
      label: copy[locale].mapLibrary,
      href: map || parent || current ? localePath(locale) : undefined,
    },
  ];
  if (map) {
    items.push({
      label: getMapName(map, locale),
      href: current || parent ? localePath(locale, `/tools/map/${map.slug}/`) : undefined,
    });
  }
  if (parent) items.push(parent);
  if (current) items.push({ label: current });

  return (
    <nav
      className="map-seo-breadcrumbs"
      aria-label={copy[locale].breadcrumbLabel}
    >
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function MapPageFrame({ children }: { children: ReactNode }) {
  return <div className="map-seo-shell">{children}</div>;
}

export function MapRelatedContent({
  locale,
  includeClass = false,
  includeRift = false,
}: {
  locale: LocaleSlug;
  includeClass?: boolean;
  includeRift?: boolean;
}) {
  const references: (readonly [ContentSection, string])[] = [
    ["guides", "interactive-map-quickstart"],
    ["database", "map-data-methodology"],
  ];
  if (includeClass) references.push(["classes", "class-planning-framework"]);
  if (includeRift) references.push(["guides", "spacetime-rift"]);
  const entries = references.flatMap(([section, slug]) => {
    const entry = getContentEntry(section, slug);
    return entry ? [entry] : [];
  });

  if (entries.length === 0) return null;
  return (
    <section className="map-seo-section" aria-labelledby="map-related-content-title">
      <div className="map-seo-section-heading">
        <div>
          <p className="map-seo-kicker">AION2 KINA</p>
          <h2 id="map-related-content-title">{copy[locale].related}</h2>
        </div>
      </div>
      <ul className="map-seo-list">
        {entries.map((entry) => {
          const content =
            entry.translations[
              siteLocaleConfig[locale].contentFallbackLocale
            ];
          return (
            <li key={`${entry.section}/${entry.slug}`}>
              <AnalyticsLink
                eventName={entry.section === "guides" ? "map_to_guide_click" : "map_site_navigation_click"}
                href={getContentHref(locale, entry)}
                payload={{
                  destination: `${entry.section}/${entry.slug}`,
                  locale,
                  position: "related-content",
                  surface: "map-seo",
                }}
              >
                <strong>{content.title}</strong>
                <span>{content.description}</span>
              </AnalyticsLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function JsonLd({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }}
    />
  );
}
