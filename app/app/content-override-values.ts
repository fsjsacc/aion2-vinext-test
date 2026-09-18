import type { ContentEntry } from "./content-registry";

export const TRUSTED_CONTENT_OVERRIDES_HEADER = "x-aion2-content-overrides";

/**
 * Cloudflare Worker request headers are size-limited (~32 KB). Content
 * overrides are delivered as a single header, so payloads are kept compact by
 * sending only the `en` source language. Other locales continue to resolve
 * through the existing editorial-localization fallback (see getContentTranslation).
 */
const MAX_ENCODED_CONTENT_OVERRIDES_LENGTH = 24_000;

type ContentOverrideRow = {
  section: string;
  slug: string;
  schema_type: string;
  published_at: string;
  updated_at: string;
  reading_minutes: number;
  publication_json: string;
  sources_json: string | null;
  hero_image_json: string | null;
  primary_action_json: string | null;
  properties_json: string | null;
  related_json: string;
  translations_json: string;
};

function parseJsonField(value: string | null): unknown {
  if (!value) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

/**
 * Normalise one database row into a ContentEntry-shaped override, keeping only
 * the `en` translation so the injected header stays within size limits.
 */
function rowToContentEntry(row: ContentOverrideRow): ContentEntry {
  const translations = (parseJsonField(row.translations_json) ??
    {}) as Record<string, unknown>;
  const enTranslation = (translations.en ?? translations["en"]) as
    | ContentEntry["translations"]["en"]
    | undefined;
  return {
    section: row.section as ContentEntry["section"],
    slug: row.slug,
    schemaType: row.schema_type as ContentEntry["schemaType"],
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    readingMinutes: row.reading_minutes,
    publication: parseJsonField(row.publication_json) as ContentEntry["publication"],
    sources: parseJsonField(row.sources_json) as ContentEntry["sources"],
    heroImage: parseJsonField(row.hero_image_json) as ContentEntry["heroImage"],
    primaryAction: parseJsonField(
      row.primary_action_json,
    ) as ContentEntry["primaryAction"],
    properties: parseJsonField(row.properties_json) as ContentEntry["properties"],
    related: parseJsonField(row.related_json) as ContentEntry["related"],
    translations: enTranslation ? ({ en: enTranslation } as ContentEntry["translations"]) : ({} as ContentEntry["translations"]),
  };
}

/**
 * Encode override rows into a single header value. Returns null when the
 * payload would exceed the header size budget (caller then skips injection).
 */
export function encodeContentOverrideRecords(
  rows: readonly ContentOverrideRow[],
): string | null {
  if (rows.length === 0) return null;
  const encoded = JSON.stringify(rows.map(rowToContentEntry));
  if (encoded.length > MAX_ENCODED_CONTENT_OVERRIDES_LENGTH) return null;
  return encoded;
}

export type { ContentOverrideRow };