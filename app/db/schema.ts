import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const externalLinks = sqliteTable(
  "external_links",
  {
    id: text("id").primaryKey(),
    href: text("href").notNull(),
    badgeType: text("badge_type").notNull().default("image"),
    imageSrc: text("image_src"),
    alt: text("alt").notNull(),
    height: integer("height").notNull().default(54),
    active: integer("active").notNull().default(1),
    createdAt: integer("created_at").notNull(),
    createdBy: text("created_by").notNull(),
  },
  (table) => [
    check(
      "external_links_values_check",
      sql`
        length(${table.id}) = 36
        and length(${table.href}) between 9 and 2048
        and substr(${table.href}, 1, 8) = 'https://'
        and ${table.badgeType} in ('image', 'text')
        and (
          (
            ${table.badgeType} = 'image'
            and length(${table.imageSrc}) between 9 and 2048
            and substr(${table.imageSrc}, 1, 8) = 'https://'
          )
          or (
            ${table.badgeType} = 'text'
            and ${table.imageSrc} is null
          )
        )
        and length(${table.alt}) between 1 and 120
        and ${table.height} between 20 and 120
        and ${table.active} in (0, 1)
        and ${table.createdAt} >= 1
        and length(${table.createdBy}) between 3 and 254
      `,
    ),
    uniqueIndex("external_links_href_unique").on(table.href),
    index("external_links_active_created_idx").on(
      table.active,
      table.createdAt,
    ),
  ],
);

export const externalLinkSettings = sqliteTable(
  "external_link_settings",
  {
    scope: text("scope").primaryKey(),
    scalePercent: integer("scale_percent").notNull().default(70),
    updatedAt: integer("updated_at").notNull(),
    updatedBy: text("updated_by").notNull(),
  },
  (table) => [
    check(
      "external_link_settings_values_check",
      sql`
        ${table.scope} = 'footer'
        and ${table.scalePercent} between 40 and 100
        and ${table.updatedAt} >= 1
        and length(${table.updatedBy}) between 3 and 254
      `,
    ),
  ],
);

export const contentReports = sqliteTable(
  "content_reports",
  {
    id: text("id").primaryKey(),
    targetKind: text("target_kind").notNull(),
    targetKey: text("target_key").notNull(),
    locale: text("locale").notNull(),
    service: text("service").notNull(),
    version: text("version"),
    category: text("category").notNull(),
    message: text("message").notNull(),
    evidenceUrl: text("evidence_url"),
    contact: text("contact"),
    status: text("status").notNull().default("new"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at"),
    resolvedAt: integer("resolved_at"),
    resolutionNote: text("resolution_note"),
    resolvedBy: text("resolved_by"),
    requesterHash: text("requester_hash").notNull(),
  },
  (table) => [
    check(
      "content_reports_target_kind_check",
      sql`${table.targetKind} in ('content', 'item', 'map', 'tool')`,
    ),
    check(
      "content_reports_locale_check",
      sql`${table.locale} in ('zh-hans', 'en', 'fr', 'de', 'es', 'ja', 'pt-br', 'ru', 'ko', 'zh-hant')`,
    ),
    check(
      "content_reports_service_check",
      sql`${table.service} in ('kr-tw-live', 'global', 'unknown', 'other')`,
    ),
    check(
      "content_reports_category_check",
      sql`${table.category} in ('outdated', 'incorrect', 'translation', 'missing', 'broken-link', 'other')`,
    ),
    check(
      "content_reports_status_check",
      sql`${table.status} in ('new', 'triaged', 'accepted', 'rejected', 'resolved')`,
    ),
    check(
      "content_reports_lengths_check",
      sql`
        length(${table.id}) between 1 and 64
        and length(${table.targetKey}) between 1 and 300
        and (${table.version} is null or length(${table.version}) between 1 and 80)
        and length(${table.message}) between 10 and 2000
        and (${table.evidenceUrl} is null or length(${table.evidenceUrl}) <= 2048)
        and (${table.contact} is null or length(${table.contact}) <= 254)
        and (${table.resolutionNote} is null or length(${table.resolutionNote}) <= 1000)
        and (${table.resolvedBy} is null or length(${table.resolvedBy}) <= 254)
        and length(${table.requesterHash}) = 64
      `,
    ),
    check(
      "content_reports_resolution_check",
      sql`${table.resolvedAt} is null or ${table.status} <> 'new'`,
    ),
    index("content_reports_requester_window_idx").on(
      table.requesterHash,
      table.createdAt,
    ),
    index("content_reports_status_created_idx").on(
      table.status,
      table.createdAt,
    ),
    index("content_reports_target_created_idx").on(
      table.targetKind,
      table.targetKey,
      table.createdAt,
    ),
  ],
);

/**
 * Privacy-preserving first-party analytics. Each row is a daily aggregate;
 * individual requests, visitors, sessions, IP addresses, user agents,
 * referrers, and URL query strings are deliberately not represented here.
 */
export const analyticsDaily = sqliteTable(
  "analytics_daily",
  {
    day: text("day").notNull(),
    eventName: text("event_name").notNull(),
    locale: text("locale").notNull(),
    service: text("service").notNull(),
    surface: text("surface").notNull(),
    targetKind: text("target_kind").notNull(),
    targetKey: text("target_key").notNull(),
    count: integer("count").notNull().default(1),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [
    primaryKey({
      name: "analytics_daily_dimensions_pk",
      columns: [
        table.day,
        table.eventName,
        table.locale,
        table.service,
        table.surface,
        table.targetKind,
        table.targetKey,
      ],
    }),
    check(
      "analytics_daily_day_check",
      sql`
        length(${table.day}) = 10
        and ${table.day} glob '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
      `,
    ),
    check(
      "analytics_daily_event_name_check",
      sql`
        length(${table.eventName}) between 1 and 64
        and ${table.eventName} not glob '*[^a-z0-9_]*'
      `,
    ),
    check(
      "analytics_daily_locale_check",
      sql`${table.locale} in ('zh-hans', 'en', 'fr', 'de', 'es', 'ja', 'pt-br', 'ru', 'ko', 'zh-hant', 'unknown')`,
    ),
    check(
      "analytics_daily_service_check",
      sql`${table.service} in ('kr-tw-live', 'global', 'unknown', 'other')`,
    ),
    check(
      "analytics_daily_surface_check",
      sql`${table.surface} in ('unknown', 'home', 'home-hero', 'home-core-entry', 'home-directory', 'faction-gate', 'content-hub', 'content-detail', 'map-seo', 'interactive-map', 'daily-checklist', 'class-finder', 'material-calculator', 'correction-report', 'not-found')`,
    ),
    check(
      "analytics_daily_target_kind_check",
      sql`${table.targetKind} in ('none', 'content', 'item', 'map', 'tool')`,
    ),
    check(
      "analytics_daily_target_key_check",
      sql`
        length(${table.targetKey}) between 1 and 160
        and ${table.targetKey} not glob '*[^a-z0-9._:/-]*'
        and (
          (${table.targetKind} = 'none' and ${table.targetKey} = 'none')
          or (${table.targetKind} <> 'none' and ${table.targetKey} <> 'none')
        )
      `,
    ),
    check(
      "analytics_daily_counter_check",
      sql`${table.count} >= 1 and ${table.updatedAt} >= 1`,
    ),
    index("analytics_daily_event_day_idx").on(table.eventName, table.day),
    index("analytics_daily_surface_day_idx").on(table.surface, table.day),
    index("analytics_daily_target_day_idx").on(
      table.targetKind,
      table.targetKey,
      table.day,
    ),
  ],
);

/**
 * Short-lived, non-identifying abuse-control buckets for the public event
 * endpoint. The hash changes every window and expired rows are removed during
 * ingestion. No raw network identifiers are stored.
 */
export const analyticsIngestWindows = sqliteTable(
  "analytics_ingest_windows",
  {
    bucketHash: text("bucket_hash").primaryKey(),
    windowStart: integer("window_start").notNull(),
    requestCount: integer("request_count").notNull().default(1),
    expiresAt: integer("expires_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [
    check(
      "analytics_ingest_windows_hash_check",
      sql`
        length(${table.bucketHash}) = 64
        and ${table.bucketHash} not glob '*[^0-9a-f]*'
      `,
    ),
    check(
      "analytics_ingest_windows_counter_check",
      sql`
        ${table.windowStart} >= 1
        and ${table.requestCount} >= 1
        and ${table.expiresAt} > ${table.windowStart}
        and ${table.updatedAt} >= ${table.windowStart}
      `,
    ),
    index("analytics_ingest_windows_expires_idx").on(table.expiresAt),
  ],
);

/**
 * Consent-only journey records. Version 2 consent permits storing an
 * AES-GCM-encrypted normalized IP together with pseudonymous visitor/session
 * hashes. Complete user agents, referrers, and query strings are never
 * represented, and every row expires after 30 days.
 */
export const analyticsJourneyEvents = sqliteTable(
  "analytics_journey_events",
  {
    id: text("id").primaryKey(),
    consentVersion: integer("consent_version").notNull(),
    visitorHash: text("visitor_hash").notNull(),
    sessionHash: text("session_hash").notNull(),
    networkHash: text("network_hash").notNull(),
    ipCiphertext: text("ip_ciphertext"),
    ipIv: text("ip_iv"),
    ipKeyVersion: integer("ip_key_version"),
    country: text("country").notNull(),
    deviceClass: text("device_class").notNull(),
    browserFamily: text("browser_family").notNull(),
    osFamily: text("os_family").notNull(),
    path: text("path").notNull(),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    eventName: text("event_name").notNull(),
    locale: text("locale").notNull(),
    service: text("service").notNull(),
    surface: text("surface").notNull(),
    targetKind: text("target_kind").notNull(),
    targetKey: text("target_key").notNull(),
    occurredAt: integer("occurred_at").notNull(),
    expiresAt: integer("expires_at").notNull(),
  },
  (table) => [
    check(
      "analytics_journey_events_identity_check",
      sql`
        length(${table.id}) between 1 and 64
        and ${table.consentVersion} in (1, 2)
        and length(${table.visitorHash}) = 64
        and ${table.visitorHash} not glob '*[^0-9a-f]*'
        and length(${table.sessionHash}) = 64
        and ${table.sessionHash} not glob '*[^0-9a-f]*'
        and length(${table.networkHash}) = 64
        and ${table.networkHash} not glob '*[^0-9a-f]*'
      `,
    ),
    check(
      "analytics_journey_events_encrypted_ip_check",
      sql`
        (
          ${table.consentVersion} = 1
          and ${table.ipCiphertext} is null
          and ${table.ipIv} is null
          and ${table.ipKeyVersion} is null
        ) or (
          ${table.consentVersion} = 2
          and length(${table.ipCiphertext}) between 24 and 84
          and ${table.ipCiphertext} not glob '*[^A-Za-z0-9_-]*'
          and length(${table.ipIv}) = 16
          and ${table.ipIv} not glob '*[^A-Za-z0-9_-]*'
          and ${table.ipKeyVersion} = 1
        )
      `,
    ),
    check(
      "analytics_journey_events_country_check",
      sql`
        ${table.country} = 'unknown'
        or (
          length(${table.country}) = 2
          and ${table.country} not glob '*[^A-Z]*'
        )
      `,
    ),
    check(
      "analytics_journey_events_device_check",
      sql`${table.deviceClass} in ('desktop', 'mobile', 'tablet', 'other', 'unknown')`,
    ),
    check(
      "analytics_journey_events_browser_check",
      sql`${table.browserFamily} in ('chrome', 'edge', 'firefox', 'safari', 'samsung', 'other', 'unknown')`,
    ),
    check(
      "analytics_journey_events_os_check",
      sql`${table.osFamily} in ('windows', 'macos', 'ios', 'android', 'linux', 'chromeos', 'other', 'unknown')`,
    ),
    check(
      "analytics_journey_events_path_check",
      sql`
        length(${table.path}) between 1 and 300
        and substr(${table.path}, 1, 1) = '/'
        and ${table.path} not glob '*[?#%\\]*'
        and ${table.path} not glob '*[^/a-z0-9._:-]*'
      `,
    ),
    check(
      "analytics_journey_events_marketing_check",
      sql`
        (${table.utmSource} is null or (
          length(${table.utmSource}) between 1 and 80
          and ${table.utmSource} not glob '*[^a-z0-9._-]*'
        ))
        and (${table.utmMedium} is null or (
          length(${table.utmMedium}) between 1 and 80
          and ${table.utmMedium} not glob '*[^a-z0-9._-]*'
        ))
        and (${table.utmCampaign} is null or (
          length(${table.utmCampaign}) between 1 and 120
          and ${table.utmCampaign} not glob '*[^a-z0-9._-]*'
        ))
      `,
    ),
    check(
      "analytics_journey_events_event_check",
      sql`
        length(${table.eventName}) between 1 and 64
        and ${table.eventName} not glob '*[^a-z0-9_]*'
      `,
    ),
    check(
      "analytics_journey_events_locale_check",
      sql`${table.locale} in ('zh-hans', 'en', 'fr', 'de', 'es', 'ja', 'pt-br', 'ru', 'ko', 'zh-hant', 'unknown')`,
    ),
    check(
      "analytics_journey_events_service_check",
      sql`${table.service} in ('kr-tw-live', 'global', 'unknown', 'other')`,
    ),
    check(
      "analytics_journey_events_surface_check",
      sql`${table.surface} in ('unknown', 'home', 'home-hero', 'home-core-entry', 'home-directory', 'faction-gate', 'content-hub', 'content-detail', 'map-seo', 'interactive-map', 'daily-checklist', 'class-finder', 'material-calculator', 'correction-report', 'not-found')`,
    ),
    check(
      "analytics_journey_events_target_check",
      sql`
        ${table.targetKind} in ('none', 'content', 'item', 'map', 'tool')
        and length(${table.targetKey}) between 1 and 160
        and ${table.targetKey} not glob '*[^a-z0-9._:/-]*'
        and (
          (${table.targetKind} = 'none' and ${table.targetKey} = 'none')
          or (${table.targetKind} <> 'none' and ${table.targetKey} <> 'none')
        )
      `,
    ),
    check(
      "analytics_journey_events_expiry_check",
      sql`
        ${table.occurredAt} >= 1
        and ${table.expiresAt} = ${table.occurredAt} + 2592000000
      `,
    ),
    index("analytics_journey_events_visitor_time_idx").on(
      table.visitorHash,
      table.occurredAt,
    ),
    index("analytics_journey_events_session_time_idx").on(
      table.sessionHash,
      table.occurredAt,
    ),
    index("analytics_journey_events_event_time_idx").on(
      table.eventName,
      table.occurredAt,
    ),
    index("analytics_journey_events_path_time_idx").on(
      table.path,
      table.occurredAt,
    ),
    index("analytics_journey_events_expires_idx").on(table.expiresAt),
  ],
);

export const contentEntries = sqliteTable(
  "content_entries",
  {
    id: text("id").primaryKey(),
    section: text("section").notNull(),
    slug: text("slug").notNull(),
    schemaType: text("schema_type").notNull(),
    publishedAt: text("published_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    readingMinutes: integer("reading_minutes").notNull(),
    publicationJson: text("publication_json").notNull(),
    sourcesJson: text("sources_json"),
    heroImageJson: text("hero_image_json"),
    primaryActionJson: text("primary_action_json"),
    propertiesJson: text("properties_json"),
    relatedJson: text("related_json").notNull(),
    translationsJson: text("translations_json").notNull(),
  },
  (table) => [
    uniqueIndex("content_entries_section_slug_idx").on(
      table.section,
      table.slug,
    ),
    index("content_entries_section_updated_idx").on(
      table.section,
      table.updatedAt,
    ),
  ],
);

export const contentTags = sqliteTable(
  "content_tags",
  {
    entryId: text("entry_id")
      .notNull()
      .references(() => contentEntries.id),
    locale: text("locale").notNull(),
    keyword: text("keyword").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.entryId, table.locale, table.keyword] }),
    index("content_tags_keyword_idx").on(table.keyword),
  ],
);
