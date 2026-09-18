#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const projectRoot = path.resolve(import.meta.dirname, "../..");

const CONTENT_RELEASE_SCHEMA_VERSION = 2;
const CONTENT_SOURCE_BUILD = "content-registry-v2";
const CONTENT_LOCALES = [
  "zh-hans",
  "en",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
  "ko",
  "zh-hant",
];
const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;
const SQL_BATCH_SIZE = 200;

function canonicalValue(value) {
  if (Array.isArray(value)) return value.map(canonicalValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalValue(value[key])]),
    );
  }
  return value;
}

function canonicalJson(value) {
  return JSON.stringify(canonicalValue(value));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function contentDigest(value) {
  return `sha256-${sha256(canonicalJson(value))}`;
}

function deterministicUuid(value) {
  const bytes = createHash("sha256").update(value).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function sqlText(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlJson(value) {
  return `${sqlText(JSON.stringify(value))}::jsonb`;
}

function sqlDate(value) {
  return `${sqlText(value)}::date`;
}

function assertSafeInteger(value, label, { min, max }) {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < min ||
    value > max
  ) {
    throw new Error(`${label} must be a safe integer between ${min} and ${max}.`);
  }
  return value;
}

function sqlInteger(value, label, range) {
  return String(assertSafeInteger(value, label, range));
}

function batches(values, size = SQL_BATCH_SIZE) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

function relationKey(relation) {
  switch (relation.kind) {
    case "content": return `${relation.section}/${relation.slug}`;
    case "map": return relation.mapSlug;
    case "type": return `${relation.mapSlug}/${relation.typeSlug}`;
    case "poi": return `${relation.mapSlug}/${relation.poiSlug}`;
    case "tool": return relation.toolSlug;
    default: throw new Error(`Unsupported content relation kind: ${relation.kind}`);
  }
}

function pureData(value) {
  return JSON.parse(JSON.stringify(value));
}

function currentIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function validIsoDate(value) {
  if (typeof value !== "string" || !ISO_DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function assertNoFutureEditorialDates(entries, {
  asOfDate = process.env.CONTENT_RELEASE_AS_OF ?? currentIsoDate(),
} = {}) {
  if (!validIsoDate(asOfDate)) {
    throw new Error("Content release as-of date must use YYYY-MM-DD.");
  }
  for (const entry of entries) {
    const contentKey = `${entry.section}/${entry.slug}`;
    for (const [field, value] of [
      ["publishedAt", entry.publishedAt],
      ["updatedAt", entry.updatedAt],
    ]) {
      if (!validIsoDate(value)) throw new Error(`${contentKey} has an invalid ${field} date.`);
      if (value > asOfDate) {
        throw new Error(`${contentKey} ${field} ${value} is later than release as-of ${asOfDate}.`);
      }
    }
    if (entry.updatedAt < entry.publishedAt) {
      throw new Error(`${contentKey} updatedAt cannot precede publishedAt.`);
    }
    for (const source of entry.sources ?? []) {
      for (const [field, value] of [
        ["publishedAt", source.publishedAt],
        ["retrievedAt", source.retrievedAt],
        ["verifiedAt", source.verifiedAt],
      ]) {
        if (value === undefined) continue;
        if (!validIsoDate(value)) {
          throw new Error(`${contentKey} source ${source.id} has an invalid ${field} date.`);
        }
        if (value > asOfDate) {
          throw new Error(
            `${contentKey} source ${source.id} ${field} ${value} is later than release as-of ${asOfDate}.`,
          );
        }
      }
    }
  }
}

/**
 * Load the actual TypeScript registry through Vite's SSR transformer. This
 * follows imports and TypeScript syntax exactly as the app does; no source-code
 * regular expressions or hand-maintained duplicate registry are involved.
 */
export async function loadContentRegistryWithVite({ root = projectRoot } = {}) {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  try {
    const registryModule = await vite.ssrLoadModule("/app/content-registry.ts");
    if (!Array.isArray(registryModule.contentRegistry)) {
      throw new Error("The application content registry did not export an array.");
    }
    return pureData(registryModule.contentRegistry);
  } finally {
    await vite.close();
  }
}

function validateRegistryProjection(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error("Content release requires at least one registry entry.");
  }
  const identities = new Set();
  for (const entry of entries) {
    const contentKey = `${entry.section}/${entry.slug}`;
    if (identities.has(contentKey)) throw new Error(`Duplicate content entry: ${contentKey}`);
    identities.add(contentKey);
    if (!entry.publication || !entry.translations || !Array.isArray(entry.related)) {
      throw new Error(`Content entry is incomplete: ${contentKey}`);
    }
    assertSafeInteger(entry.readingMinutes, `${contentKey} readingMinutes`, {
      min: 1,
      max: 32_767,
    });
    if (entry.heroImage) {
      assertSafeInteger(entry.heroImage.width, `${contentKey} heroImage.width`, {
        min: 1,
        max: 2_147_483_647,
      });
      assertSafeInteger(entry.heroImage.height, `${contentKey} heroImage.height`, {
        min: 1,
        max: 2_147_483_647,
      });
    }
    for (const locale of CONTENT_LOCALES) {
      if (!entry.translations[locale]) {
        throw new Error(`Content entry ${contentKey} has no ${locale} translation.`);
      }
    }
    const sourceIds = new Set();
    for (const source of entry.sources ?? []) {
      if (sourceIds.has(source.id)) {
        throw new Error(`Content entry ${contentKey} repeats source ${source.id}.`);
      }
      sourceIds.add(source.id);
    }
  }
  for (const entry of entries) {
    for (const relation of entry.related) {
      if (relation.kind === "content" && !identities.has(relationKey(relation))) {
        throw new Error(
          `Content entry ${entry.section}/${entry.slug} links to missing content ${relationKey(relation)}.`,
        );
      }
    }
  }
}

export async function createContentReleaseSnapshot({
  root = projectRoot,
  entries: suppliedEntries,
  asOfDate,
} = {}) {
  const entries = pureData(suppliedEntries ?? await loadContentRegistryWithVite({ root }));
  validateRegistryProjection(entries);
  assertNoFutureEditorialDates(entries, { asOfDate });

  const normalizedEntries = entries
    .map((entry) => ({
      contentKey: `${entry.section}/${entry.slug}`,
      section: entry.section,
      slug: entry.slug,
      schemaType: entry.schemaType,
      publishedAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      readingMinutes: entry.readingMinutes,
      publication: entry.publication,
      properties: entry.properties ?? {},
      translations: CONTENT_LOCALES.map((locale) => ({
        locale,
        reviewStatus: entry.publication.localeReview[locale],
        document: entry.translations[locale],
      })),
      sources: [...(entry.sources ?? [])].sort((left, right) => left.id.localeCompare(right.id)),
      media: entry.heroImage
        ? [{ mediaKey: "hero", mediaRole: "hero", ...entry.heroImage }]
        : [],
      relations: entry.related.map((relation, ordinal) => ({
        ordinal,
        targetKind: relation.kind,
        targetKey: relationKey(relation),
        document: relation,
      })),
    }))
    .sort((left, right) => left.contentKey.localeCompare(right.contentKey));

  const semanticProjection = {
    schemaVersion: CONTENT_RELEASE_SCHEMA_VERSION,
    sourceBuild: CONTENT_SOURCE_BUILD,
    locales: CONTENT_LOCALES,
    entries: normalizedEntries,
  };
  const versionKey = contentDigest(semanticProjection);
  const releaseId = deterministicUuid(`content-release:${versionKey}`);
  const entryIdByKey = new Map(
    normalizedEntries.map((entry) => [
      entry.contentKey,
      deterministicUuid(`${versionKey}:content-entry:${entry.contentKey}`),
    ]),
  );

  const entryRows = normalizedEntries.map((entry) => ({
    id: entryIdByKey.get(entry.contentKey),
    contentKey: entry.contentKey,
    section: entry.section,
    slug: entry.slug,
    schemaType: entry.schemaType,
    publishedAt: entry.publishedAt,
    updatedAt: entry.updatedAt,
    readingMinutes: entry.readingMinutes,
    publicationStatus: entry.publication.status,
    indexable: entry.publication.indexable,
    sourceReviewStatus: entry.publication.sourceReview,
    properties: entry.properties,
  }));
  const translationRows = normalizedEntries.flatMap((entry) =>
    entry.translations.map((translation) => ({
      contentEntryId: entryIdByKey.get(entry.contentKey),
      contentKey: entry.contentKey,
      locale: translation.locale,
      localeReviewStatus: translation.reviewStatus,
      title: translation.document.title,
      description: translation.document.description,
      document: translation.document,
    })));
  const sourceRows = normalizedEntries.flatMap((entry) =>
    entry.sources.map((source) => ({
      contentEntryId: entryIdByKey.get(entry.contentKey),
      contentKey: entry.contentKey,
      ...source,
    })));
  const mediaRows = normalizedEntries.flatMap((entry) =>
    entry.media.map((media) => ({
      contentEntryId: entryIdByKey.get(entry.contentKey),
      contentKey: entry.contentKey,
      ...media,
    })));
  const relationRows = normalizedEntries.flatMap((entry) =>
    entry.relations.map((relation) => ({
      contentEntryId: entryIdByKey.get(entry.contentKey),
      contentKey: entry.contentKey,
      targetContentEntryId: relation.targetKind === "content"
        ? entryIdByKey.get(relation.targetKey)
        : null,
      ...relation,
    })));
  const counts = {
    entries: entryRows.length,
    translations: translationRows.length,
    sources: sourceRows.length,
    media: mediaRows.length,
    relations: relationRows.length,
  };
  const manifest = {
    schemaVersion: CONTENT_RELEASE_SCHEMA_VERSION,
    sourceBuild: CONTENT_SOURCE_BUILD,
    versionKey,
    locales: CONTENT_LOCALES,
    contentKeys: entryRows.map((entry) => entry.contentKey),
    counts,
  };
  const snapshotDigest = contentDigest({
    schemaVersion: CONTENT_RELEASE_SCHEMA_VERSION,
    versionKey,
    entryRows,
    translationRows,
    sourceRows,
    mediaRows,
    relationRows,
  });
  const stats = { snapshotDigest, counts };

  return {
    schemaVersion: CONTENT_RELEASE_SCHEMA_VERSION,
    sourceBuild: CONTENT_SOURCE_BUILD,
    versionKey,
    releaseId,
    snapshotDigest,
    manifest,
    stats,
    counts,
    entries: entryRows,
    translations: translationRows,
    sources: sourceRows,
    media: mediaRows,
    relations: relationRows,
  };
}

export function assertContentReleaseSnapshotIntegrity(snapshot) {
  if (!snapshot || typeof snapshot !== "object") {
    throw new Error("Content snapshot must be a JSON object.");
  }
  for (const collection of ["entries", "translations", "sources", "media", "relations"]) {
    if (!Array.isArray(snapshot[collection])) {
      throw new Error(`Content snapshot ${collection} must be an array.`);
    }
    if (snapshot.counts?.[collection] !== snapshot[collection].length) {
      throw new Error(`Content snapshot ${collection} count does not match its rows.`);
    }
    if (snapshot.manifest?.counts?.[collection] !== snapshot[collection].length) {
      throw new Error(`Content snapshot manifest ${collection} count is inconsistent.`);
    }
  }
  if (!VERSION_KEY_PATTERN.test(snapshot.versionKey)) {
    throw new Error("Content snapshot has an invalid versionKey.");
  }
  const expectedReleaseId = deterministicUuid(`content-release:${snapshot.versionKey}`);
  if (snapshot.releaseId !== expectedReleaseId) {
    throw new Error("Content snapshot releaseId does not match its versionKey.");
  }
  if (
    snapshot.manifest?.versionKey !== snapshot.versionKey ||
    snapshot.manifest?.schemaVersion !== snapshot.schemaVersion ||
    snapshot.manifest?.sourceBuild !== snapshot.sourceBuild
  ) {
    throw new Error("Content snapshot manifest identity is inconsistent.");
  }
  const expectedDigest = contentDigest({
    schemaVersion: snapshot.schemaVersion,
    versionKey: snapshot.versionKey,
    entryRows: snapshot.entries,
    translationRows: snapshot.translations,
    sourceRows: snapshot.sources,
    mediaRows: snapshot.media,
    relationRows: snapshot.relations,
  });
  if (
    snapshot.snapshotDigest !== expectedDigest ||
    snapshot.stats?.snapshotDigest !== expectedDigest
  ) {
    throw new Error("Content snapshot digest does not match its row payload.");
  }
  for (const collection of ["entries", "translations", "sources", "media", "relations"]) {
    if (snapshot.stats?.counts?.[collection] !== snapshot[collection].length) {
      throw new Error(`Content snapshot stats ${collection} count is inconsistent.`);
    }
  }
  return snapshot;
}

export function assertNoFutureSnapshotDates(snapshot, {
  asOfDate = process.env.CONTENT_RELEASE_AS_OF ?? currentIsoDate(),
} = {}) {
  if (!validIsoDate(asOfDate)) {
    throw new Error("Content release as-of date must use YYYY-MM-DD.");
  }
  for (const entry of snapshot.entries ?? []) {
    for (const [field, value] of [
      ["publishedAt", entry.publishedAt],
      ["updatedAt", entry.updatedAt],
    ]) {
      if (!validIsoDate(value) || value > asOfDate) {
        throw new Error(
          `Content snapshot ${entry.contentKey} has an invalid or future ${field} date.`,
        );
      }
    }
    if (entry.updatedAt < entry.publishedAt) {
      throw new Error(`Content snapshot ${entry.contentKey} has reversed editorial dates.`);
    }
  }
  for (const source of snapshot.sources ?? []) {
    for (const [field, value] of [
      ["publishedAt", source.publishedAt],
      ["retrievedAt", source.retrievedAt],
      ["verifiedAt", source.verifiedAt],
    ]) {
      if (value === undefined) continue;
      if (!validIsoDate(value) || value > asOfDate) {
        throw new Error(
          `Content snapshot ${source.contentKey} source ${source.id} has an invalid or future ${field} date.`,
        );
      }
    }
    if (
      (source.publishedAt && source.publishedAt > source.retrievedAt) ||
      source.retrievedAt > source.verifiedAt
    ) {
      throw new Error(
        `Content snapshot ${source.contentKey} source ${source.id} has inconsistent source dates.`,
      );
    }
  }
}

export async function loadContentReleaseSnapshot(inputPath) {
  let parsed;
  try {
    parsed = JSON.parse(await readFile(path.resolve(inputPath), "utf8"));
  } catch (error) {
    throw new Error(
      `Unable to load content snapshot input: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  return assertContentReleaseSnapshotIntegrity(parsed);
}

function insertRows({ table, columns, rows, releaseId }) {
  if (rows.length === 0) return "";
  return batches(rows).map((batch, batchIndex) => {
    const values = batch.map((row) => `(${row.join(", ")})`).join(",\n    ");
    const expectedColumns = columns.map((column) => `expected.${column}`).join(", ");
    const actualColumns = columns.map((column) => `actual.${column}`).join(", ");
    return `insert into ${table} (${columns.join(", ")})\nselect ${columns.map((column) => `v.${column}`).join(", ")}\nfrom (values\n    ${values}\n) as v (${columns.join(", ")})\nwhere exists (\n  select 1 from atlas.content_releases as release\n  where release.id = ${sqlText(releaseId)}::uuid\n    and release.status_code in ('draft', 'validating')\n)\non conflict do nothing;\n\ndo $$\nbegin\n  if exists (\n    select 1\n    from (\n      select ${expectedColumns}\n      from (values\n        ${values}\n      ) as expected (${columns.join(", ")})\n      except\n      select ${actualColumns}\n      from ${table} as actual\n      where actual.release_id = ${sqlText(releaseId)}::uuid\n    ) as drift\n  ) then\n    raise exception 'Content release row drift in ${table} batch ${batchIndex + 1}';\n  end if;\nend;\n$$;`;
  }).join("\n\n");
}

function normalizeExpectedCurrent(value) {
  if (value === "none") return null;
  if (!VERSION_KEY_PATTERN.test(value ?? "")) {
    throw new Error("--expected-current must be a content versionKey or the literal none.");
  }
  return value;
}

export function renderContentReleaseSql(snapshot, {
  promote = false,
  expectedCurrent,
  reason = "Deterministic content registry release",
} = {}) {
  if (!VERSION_KEY_PATTERN.test(snapshot.versionKey) || !VERSION_KEY_PATTERN.test(snapshot.snapshotDigest)) {
    throw new Error("Content snapshot has an invalid digest.");
  }
  const schemaVersion = sqlInteger(snapshot.schemaVersion, "schemaVersion", {
    min: 1,
    max: 32_767,
  });
  const expectedCounts = Object.fromEntries(
    ["entries", "translations", "sources", "media", "relations"].map((name) => [
      name,
      sqlInteger(snapshot.counts?.[name], `counts.${name}`, {
        min: 0,
        max: 2_147_483_647,
      }),
    ]),
  );
  const normalizedExpectedCurrent = promote ? normalizeExpectedCurrent(expectedCurrent) : undefined;
  const releaseId = snapshot.releaseId;

  const entryRows = snapshot.entries.map((entry) => [
    `${sqlText(entry.id)}::uuid`, `${sqlText(releaseId)}::uuid`, sqlText(entry.contentKey),
    sqlText(entry.section), sqlText(entry.slug), sqlText(entry.schemaType),
    sqlDate(entry.publishedAt), sqlDate(entry.updatedAt),
    sqlInteger(entry.readingMinutes, `${entry.contentKey} readingMinutes`, {
      min: 1,
      max: 32_767,
    }),
    sqlText(entry.publicationStatus), entry.indexable ? "true" : "false",
    sqlText(entry.sourceReviewStatus), sqlJson(entry.properties),
  ]);
  const translationRows = snapshot.translations.map((translation) => [
    `${sqlText(releaseId)}::uuid`, `${sqlText(translation.contentEntryId)}::uuid`,
    sqlText(translation.locale), sqlText(translation.localeReviewStatus),
    sqlText(translation.title), sqlText(translation.description), sqlJson(translation.document),
  ]);
  const sourceRows = snapshot.sources.map((source) => [
    `${sqlText(releaseId)}::uuid`, `${sqlText(source.contentEntryId)}::uuid`,
    sqlText(source.id), sqlText(source.kind), sqlText(source.publisher), sqlText(source.label),
    sqlText(source.url), source.publishedAt ? sqlDate(source.publishedAt) : "null::date",
    sqlDate(source.retrievedAt), sqlDate(source.verifiedAt),
  ]);
  const mediaRows = snapshot.media.map((media) => [
    `${sqlText(releaseId)}::uuid`, `${sqlText(media.contentEntryId)}::uuid`,
    sqlText(media.mediaKey), sqlText(media.mediaRole), sqlText(media.src),
    sqlInteger(media.width, `${media.contentKey} media.width`, {
      min: 1,
      max: 2_147_483_647,
    }),
    sqlInteger(media.height, `${media.contentKey} media.height`, {
      min: 1,
      max: 2_147_483_647,
    }),
    sqlText(media.credit), sqlText(media.sourceUrl), sqlText(media.rights),
    sqlJson(media.translations),
  ]);
  const relationRows = snapshot.relations.map((relation) => [
    `${sqlText(releaseId)}::uuid`, `${sqlText(relation.contentEntryId)}::uuid`,
    sqlInteger(relation.ordinal, `${relation.contentKey} relation.ordinal`, {
      min: 0,
      max: 2_147_483_647,
    }),
    sqlText(relation.targetKind), sqlText(relation.targetKey),
    relation.targetContentEntryId ? `${sqlText(relation.targetContentEntryId)}::uuid` : "null::uuid",
    sqlJson(relation.document),
  ]);

  const statements = [
    "\\set ON_ERROR_STOP on",
    "begin;",
    "set local standard_conforming_strings = on;",
    "set local lock_timeout = '15s';",
    "set local statement_timeout = '5min';",
    `insert into atlas.content_releases (id, version_key, schema_version, source_build, status_code, snapshot_digest, manifest, stats)\nvalues (${sqlText(releaseId)}::uuid, ${sqlText(snapshot.versionKey)}, ${schemaVersion}, ${sqlText(snapshot.sourceBuild)}, 'validating', ${sqlText(snapshot.snapshotDigest)}, ${sqlJson(snapshot.manifest)}, ${sqlJson(snapshot.stats)})\non conflict (version_key) do nothing;`,
    `do $$\ndeclare\n  existing atlas.content_releases%rowtype;\nbegin\n  select * into existing from atlas.content_releases where version_key = ${sqlText(snapshot.versionKey)};\n  if existing.id is distinct from ${sqlText(releaseId)}::uuid\n    or existing.schema_version is distinct from ${schemaVersion}\n    or existing.source_build is distinct from ${sqlText(snapshot.sourceBuild)}\n    or existing.snapshot_digest is distinct from ${sqlText(snapshot.snapshotDigest)}\n    or existing.manifest is distinct from ${sqlJson(snapshot.manifest)}\n    or existing.stats is distinct from ${sqlJson(snapshot.stats)} then\n    raise exception 'Content release identity drift for %', ${sqlText(snapshot.versionKey)};\n  end if;\nend;\n$$;`,
    insertRows({
      table: "atlas.content_entries",
      columns: ["id", "release_id", "content_key", "section", "slug", "schema_type", "published_on", "updated_on", "reading_minutes", "publication_status", "is_indexable", "source_review_status", "properties"],
      rows: entryRows,
      releaseId,
    }),
    insertRows({
      table: "atlas.content_translations",
      columns: ["release_id", "content_entry_id", "locale", "locale_review_status", "title", "description", "document"],
      rows: translationRows,
      releaseId,
    }),
    insertRows({
      table: "atlas.content_sources",
      columns: ["release_id", "content_entry_id", "source_id", "source_kind", "publisher", "label", "url", "published_on", "retrieved_on", "verified_on"],
      rows: sourceRows,
      releaseId,
    }),
    insertRows({
      table: "atlas.content_media",
      columns: ["release_id", "content_entry_id", "media_key", "media_role", "src", "width", "height", "credit", "source_url", "rights_code", "localized_copy"],
      rows: mediaRows,
      releaseId,
    }),
    insertRows({
      table: "atlas.content_relations",
      columns: ["release_id", "content_entry_id", "ordinal", "target_kind", "target_key", "target_content_entry_id", "document"],
      rows: relationRows,
      releaseId,
    }),
    `do $$\ndeclare\n  actual_entries integer;\n  actual_translations integer;\n  actual_sources integer;\n  actual_media integer;\n  actual_relations integer;\nbegin\n  select count(*) into actual_entries from atlas.content_entries where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_translations from atlas.content_translations where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_sources from atlas.content_sources where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_media from atlas.content_media where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_relations from atlas.content_relations where release_id = ${sqlText(releaseId)}::uuid;\n  if actual_entries <> ${expectedCounts.entries}\n    or actual_translations <> ${expectedCounts.translations}\n    or actual_sources <> ${expectedCounts.sources}\n    or actual_media <> ${expectedCounts.media}\n    or actual_relations <> ${expectedCounts.relations} then\n    raise exception 'Content release count mismatch: entries %, translations %, sources %, media %, relations %',\n      actual_entries, actual_translations, actual_sources, actual_media, actual_relations;\n  end if;\nend;\n$$;`,
    `select atlas.publish_content_release(\n  ${sqlText(snapshot.versionKey)},\n  ${sqlText(snapshot.snapshotDigest)},\n  ${expectedCounts.entries},\n  ${expectedCounts.translations},\n  ${expectedCounts.sources},\n  ${expectedCounts.media},\n  ${expectedCounts.relations}\n);`,
    promote
      ? `select * from atlas.activate_content_release(\n  'stable',\n  ${normalizedExpectedCurrent === null ? "null" : sqlText(normalizedExpectedCurrent)},\n  ${sqlText(snapshot.versionKey)},\n  ${sqlText(reason)}\n);`
      : "",
    "commit;",
    `select json_build_object(\n  'versionKey', version_key,\n  'status', status_code,\n  'snapshotDigest', snapshot_digest,\n  'entryCount', (select count(*) from atlas.content_entries where release_id = releases.id),\n  'translationCount', (select count(*) from atlas.content_translations where release_id = releases.id)\n)::text\nfrom atlas.content_releases as releases\nwhere id = ${sqlText(releaseId)}::uuid;`,
  ].filter(Boolean);
  return `${statements.join("\n\n")}\n`;
}

export function renderContentReleaseJson(snapshot) {
  return `${JSON.stringify(canonicalValue(snapshot), null, 2)}\n`;
}

function argumentValue(argv, name) {
  const index = argv.indexOf(name);
  if (index === -1) return undefined;
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value.`);
  return value;
}

function missingPostgresVariables(env) {
  return ["PGHOST", "PGDATABASE", "PGUSER", "PGPASSWORD"].filter((name) => !env[name]);
}

export function contentDatabaseTargetFingerprint(env) {
  if (["PGHOST", "PGDATABASE", "PGUSER"].some((name) => !env[name])) return null;
  return contentDigest({
    host: env.PGHOST,
    hostAddress: env.PGHOSTADDR ?? null,
    port: env.PGPORT ?? "5432",
    database: env.PGDATABASE,
    user: env.PGUSER,
    service: env.PGSERVICE ?? null,
    serviceFile: env.PGSERVICEFILE ?? null,
    options: env.PGOPTIONS ?? null,
    sslMode: env.PGSSLMODE ?? "require",
  });
}

export function assertContentReleaseApplyGuard({
  apply,
  confirmVersion,
  confirmTarget,
  versionKey,
  env,
}) {
  if (!apply) return;
  if (confirmVersion !== versionKey) {
    throw new Error("--apply requires --confirm-version to exactly match the generated content versionKey.");
  }
  const missing = missingPostgresVariables(env);
  if (missing.length > 0) {
    throw new Error(`Missing protected PostgreSQL environment variables: ${missing.join(", ")}.`);
  }
  const expectedTarget = contentDatabaseTargetFingerprint(env);
  if (confirmTarget !== expectedTarget) {
    throw new Error(
      "--apply requires --confirm-target to exactly match the dry-run targetFingerprint.",
    );
  }
}

async function atomicWrite(output, bytes) {
  const outputPath = path.resolve(output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, bytes, "utf8");
  await rename(temporaryPath, outputPath);
  return outputPath;
}

async function main() {
  const argv = process.argv.slice(2);
  const apply = argv.includes("--apply");
  const promote = argv.includes("--promote");
  const confirmVersion = argumentValue(argv, "--confirm-version");
  const confirmTarget = argumentValue(argv, "--confirm-target");
  const expectedCurrent = argumentValue(argv, "--expected-current");
  const reason = argumentValue(argv, "--reason") ?? "Deterministic content registry release";
  const asOfDate = argumentValue(argv, "--as-of") ?? process.env.CONTENT_RELEASE_AS_OF;
  const jsonOutput = argumentValue(argv, "--json-output");
  const sqlOutput = argumentValue(argv, "--sql-output");
  const snapshotInput = argumentValue(argv, "--snapshot-input");

  if (promote && !expectedCurrent) {
    throw new Error("--promote requires --expected-current <versionKey|none>.");
  }

  if (apply && !snapshotInput) {
    throw new Error(
      "--apply requires --snapshot-input so production credentials never load the TypeScript registry.",
    );
  }
  const snapshot = snapshotInput
    ? await loadContentReleaseSnapshot(snapshotInput)
    : await createContentReleaseSnapshot({ asOfDate });
  if (snapshotInput) assertNoFutureSnapshotDates(snapshot, { asOfDate });
  const sql = renderContentReleaseSql(snapshot, { promote, expectedCurrent, reason });
  const json = renderContentReleaseJson(snapshot);
  const outputs = {
    json: jsonOutput ? await atomicWrite(jsonOutput, json) : null,
    sql: sqlOutput ? await atomicWrite(sqlOutput, sql) : null,
  };

  assertContentReleaseApplyGuard({
    apply,
    confirmVersion,
    confirmTarget,
    versionKey: snapshot.versionKey,
    env: process.env,
  });

  if (!apply) {
    console.log(JSON.stringify({
      mode: "dry-run",
      versionKey: snapshot.versionKey,
      releaseId: snapshot.releaseId,
      snapshotDigest: snapshot.snapshotDigest,
      counts: snapshot.counts,
      jsonBytes: Buffer.byteLength(json),
      sqlBytes: Buffer.byteLength(sql),
      promote,
      targetFingerprint: contentDatabaseTargetFingerprint(process.env),
      outputs,
      note: "No database connection was opened. Apply requires an exact version confirmation and protected PostgreSQL environment variables.",
    }, null, 2));
    return;
  }

  const result = spawnSync(
    "psql",
    ["--no-psqlrc", "--set", "ON_ERROR_STOP=1", "--no-align", "--tuples-only"],
    {
      input: sql,
      encoding: "utf8",
      env: { ...process.env, PGSSLMODE: process.env.PGSSLMODE ?? "require" },
      maxBuffer: 20 * 1024 * 1024,
      windowsHide: true,
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr?.trim() || "Content database release failed.");
  process.stdout.write(result.stdout);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
