/**
 * Export content from the compiled bundle into the D1 database.
 *
 * Run via vinext dev (depends on env.DB binding):
 *   npx tsx scripts/content/export-to-d1.mjs
 *
 * First pass: all entries from contentRegistry.
 * In production: can be scoped to a single section (e.g. --section=news).
 */

import { contentRegistry } from "../../app/content-registry";
import { randomUUID } from "node:crypto";

const SECTION_FILTER = process.argv.includes("--section")
  ? process.argv[process.argv.indexOf("--section") + 1]
  : null;

export async function exportContentToDatabase(db: {
  prepare(sql: string): {
    bind(...args: unknown[]): { run(): Promise<unknown> };
  };
}) {
  const entries = SECTION_FILTER
    ? contentRegistry.filter((e) => e.section === SECTION_FILTER)
    : [...contentRegistry];

  let inserted = 0;
  for (const entry of entries) {
    const id = randomUUID();
    await db
      .prepare(
        `INSERT INTO content_entries
          (id, section, slug, schema_type, published_at, updated_at, reading_minutes,
           publication_json, sources_json, hero_image_json, primary_action_json,
           properties_json, related_json, translations_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        id,
        entry.section,
        entry.slug,
        entry.schemaType,
        entry.publishedAt,
        entry.updatedAt,
        entry.readingMinutes,
        JSON.stringify(entry.publication),
        entry.sources ? JSON.stringify(entry.sources) : null,
        entry.heroImage ? JSON.stringify(entry.heroImage) : null,
        entry.primaryAction ? JSON.stringify(entry.primaryAction) : null,
        entry.properties ? JSON.stringify(entry.properties) : null,
        JSON.stringify(entry.related),
        JSON.stringify(entry.translations),
      )
      .run();
    inserted++;
  }
  return { total: entries.length, inserted };
}

// ── CLI runner ──
const isMain = process.argv[1]?.endsWith("export-to-d1.mjs");
if (isMain) {
  // This script runs inside vinext dev where env.DB is available.
  // The runner is invoked via a temporary admin route.
  console.log(
    "Use the admin route at /api/admin/content/export to trigger migration.",
  );
  console.log(
    `Will export ${SECTION_FILTER ? `section="${SECTION_FILTER}"` : "all sections"} entries.`,
  );
}