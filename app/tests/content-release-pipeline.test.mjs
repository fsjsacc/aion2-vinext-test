import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import {
  assertContentReleaseApplyGuard,
  assertContentReleaseSnapshotIntegrity,
  assertNoFutureEditorialDates,
  assertNoFutureSnapshotDates,
  contentDatabaseTargetFingerprint,
  createContentReleaseSnapshot,
  loadContentRegistryWithVite,
  renderContentReleaseJson,
  renderContentReleaseSql,
} from "../scripts/content/release.mjs";

const root = path.resolve(import.meta.dirname, "..");
const registryReleaseAsOf = "2026-09-16";

test("content release loader exports the reviewed TypeScript registry deterministically", async () => {
  const registry = await loadContentRegistryWithVite({ root });
  assert.ok(registry.length >= 10);

  const first = await createContentReleaseSnapshot({ root, entries: registry, asOfDate: registryReleaseAsOf });
  const second = await createContentReleaseSnapshot({ root, entries: registry, asOfDate: registryReleaseAsOf });
  assert.deepEqual(second, first);
  assert.match(first.versionKey, /^sha256-[0-9a-f]{64}$/u);
  assert.match(first.snapshotDigest, /^sha256-[0-9a-f]{64}$/u);
  assert.match(first.releaseId, /^[0-9a-f-]{36}$/u);
  assert.equal(first.counts.entries, registry.length);
  assert.equal(first.counts.translations, registry.length * 10);
  assert.equal(first.counts.sources, registry.reduce(
    (count, entry) => count + (entry.sources?.length ?? 0),
    0,
  ));
  assert.equal(first.counts.media, registry.filter((entry) => entry.heroImage).length);
  assert.equal(first.counts.relations, registry.reduce(
    (count, entry) => count + entry.related.length,
    0,
  ));
  assert.equal(new Set(first.entries.map((entry) => entry.contentKey)).size, registry.length);
  assert.equal(first.manifest.versionKey, first.versionKey);
  assert.equal(first.schemaVersion, 2);
  assert.equal(first.sourceBuild, "content-registry-v2");
  assert.ok(
    first.entries.filter((entry) => entry.properties?.item).length >= 12,
    "structured item facts must survive the content release projection",
  );
  assert.ok(
    first.entries.some((entry) => entry.properties?.classComparison),
    "the class difficulty comparison must survive the content release projection",
  );
  assert.deepEqual(first.stats, {
    snapshotDigest: first.snapshotDigest,
    counts: first.counts,
  });
  assert.doesNotThrow(() => assertContentReleaseSnapshotIntegrity(first));

  const tamperedSnapshot = structuredClone(first);
  tamperedSnapshot.entries[0].readingMinutes += 1;
  assert.throws(
    () => assertContentReleaseSnapshotIntegrity(tamperedSnapshot),
    /digest does not match/u,
  );

  const futureSnapshot = structuredClone(first);
  futureSnapshot.sources[0].verifiedAt = "2099-01-01";
  assert.throws(
    () => assertNoFutureSnapshotDates(futureSnapshot, { asOfDate: registryReleaseAsOf }),
    /invalid or future verifiedAt date/u,
  );

  const mutated = structuredClone(registry);
  mutated[0].readingMinutes += 1;
  const changed = await createContentReleaseSnapshot({
    root,
    entries: mutated,
    asOfDate: registryReleaseAsOf,
  });
  assert.notEqual(changed.versionKey, first.versionKey);
  assert.notEqual(changed.snapshotDigest, first.snapshotDigest);

  const futureDated = structuredClone(registry);
  futureDated[0].updatedAt = "2099-01-01";
  assert.throws(() => assertNoFutureEditorialDates(futureDated, {
    asOfDate: "2026-07-14",
  }), /later than release as-of/u);
});

test("content release export is stable, normalized, and safe by default", async () => {
  const registry = await loadContentRegistryWithVite({ root });
  const snapshot = await createContentReleaseSnapshot({
    root,
    entries: registry,
    asOfDate: registryReleaseAsOf,
  });
  const json = renderContentReleaseJson(snapshot);
  const sql = renderContentReleaseSql(snapshot);
  const promotedSql = renderContentReleaseSql(snapshot, {
    promote: true,
    expectedCurrent: "none",
    reason: "CI first activation",
  });

  assert.equal(renderContentReleaseJson(snapshot), json);
  assert.deepEqual(JSON.parse(json).counts, snapshot.counts);
  assert.match(sql, /insert into atlas\.content_releases/u);
  assert.match(sql, /set local standard_conforming_strings = on/u);
  assert.match(sql, /insert into atlas\.content_entries/u);
  assert.match(sql, /insert into atlas\.content_translations/u);
  assert.match(sql, /insert into atlas\.content_sources/u);
  assert.match(sql, /insert into atlas\.content_media/u);
  assert.match(sql, /insert into atlas\.content_relations/u);
  assert.match(sql, /atlas\.publish_content_release/u);
  assert.match(sql, /Content release identity drift/u);
  assert.match(sql, /Content release row drift in atlas\.content_entries/u);
  assert.match(sql, /Content release row drift in atlas\.content_translations/u);
  assert.match(sql, /Content release count mismatch/u);
  assert.doesNotMatch(sql, /atlas\.activate_content_release/u);
  assert.match(promotedSql, /atlas\.activate_content_release/u);
  assert.match(promotedSql, /'stable',\s*null,/u);
  // Editorial scam-safety copy may legitimately contain the word "password";
  // credential-shaped deployment values must still never enter an export.
  assert.doesNotMatch(`${json}\n${sql}`, /secretAccessKey|service_role_key|cfat_[a-z0-9]/iu);

  const poisonedReadingTime = structuredClone(snapshot);
  poisonedReadingTime.entries[0].readingMinutes = "1); select pg_sleep(9); --";
  assert.throws(
    () => renderContentReleaseSql(poisonedReadingTime),
    /readingMinutes must be a safe integer/u,
  );

  const poisonedImageWidth = structuredClone(snapshot);
  poisonedImageWidth.media[0].width = "1); select pg_sleep(9); --";
  assert.throws(
    () => renderContentReleaseSql(poisonedImageWidth),
    /media\.width must be a safe integer/u,
  );

  const poisonedCount = structuredClone(snapshot);
  poisonedCount.counts.entries = "0); commit; --";
  assert.throws(
    () => renderContentReleaseSql(poisonedCount),
    /counts\.entries must be a safe integer/u,
  );

  assert.doesNotThrow(() => assertContentReleaseApplyGuard({
    apply: false,
    confirmVersion: undefined,
    confirmTarget: undefined,
    versionKey: snapshot.versionKey,
    env: {},
  }));
  assert.throws(() => assertContentReleaseApplyGuard({
    apply: true,
    confirmVersion: "sha256-wrong",
    confirmTarget: undefined,
    versionKey: snapshot.versionKey,
    env: {},
  }), /exactly match/u);
  assert.throws(() => assertContentReleaseApplyGuard({
    apply: true,
    confirmVersion: snapshot.versionKey,
    confirmTarget: undefined,
    versionKey: snapshot.versionKey,
    env: {},
  }), /protected PostgreSQL environment variables/u);
  const protectedEnvironment = {
    PGHOST: "protected-host",
    PGPORT: "6543",
    PGDATABASE: "atlas",
    PGUSER: "release-role",
    PGPASSWORD: "not-logged",
  };
  const targetFingerprint = contentDatabaseTargetFingerprint(protectedEnvironment);
  assert.match(targetFingerprint, /^sha256-[0-9a-f]{64}$/u);
  assert.throws(() => assertContentReleaseApplyGuard({
    apply: true,
    confirmVersion: snapshot.versionKey,
    confirmTarget: "sha256-wrong",
    versionKey: snapshot.versionKey,
    env: protectedEnvironment,
  }), /confirm-target/u);
  assert.doesNotThrow(() => assertContentReleaseApplyGuard({
    apply: true,
    confirmVersion: snapshot.versionKey,
    confirmTarget: targetFingerprint,
    versionKey: snapshot.versionKey,
    env: protectedEnvironment,
  }));

  const invalidCalendarDate = structuredClone(registry);
  invalidCalendarDate[0].publishedAt = "2026-02-30";
  assert.throws(
    () => assertNoFutureEditorialDates(invalidCalendarDate, { asOfDate: "2026-07-14" }),
    /invalid publishedAt date/u,
  );
});

test("content migration CI preserves transaction and least-privilege checks", async () => {
  const workflow = await readFile(
    path.join(root, ".github/workflows/production-readiness.yml"),
    "utf8",
  );

  for (const migrationId of ["0001", "0002", "0003"]) {
    assert.match(
      workflow,
      new RegExp(`psql --set ON_ERROR_STOP=1 --single-transaction --file supabase/migrations/20260714${migrationId}_`, "u"),
    );
  }
  assert.match(
    workflow,
    /004 owns an explicit BEGIN\/COMMIT[\s\S]*?psql --set ON_ERROR_STOP=1 --file supabase\/migrations\/202607140004_atlas_content_publication\.sql/u,
  );
  assert.match(
    workflow,
    /psql --set ON_ERROR_STOP=1 --file supabase\/migrations\/202607180001_expose_content_properties\.sql/u,
  );
  const privilegeLoop = workflow.match(
    /foreach content_table in array array\[([\s\S]*?)\] loop([\s\S]*?)end loop;/u,
  );
  assert.ok(privilegeLoop);
  for (const table of [
    "content_releases",
    "content_entries",
    "content_translations",
    "content_sources",
    "content_media",
    "content_relations",
    "content_channels",
    "content_release_events",
  ]) {
    assert.match(privilegeLoop[1], new RegExp(`'${table}'`, "u"));
  }
  for (const privilege of [
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "TRUNCATE",
    "TRIGGER",
    "REFERENCES",
    "MAINTAIN",
  ]) {
    assert.match(privilegeLoop[2], new RegExp(`'${privilege}'`, "u"));
  }
  assert.match(privilegeLoop[2], /content_channels'[\s\S]*?'content_release_events'/u);
  assert.match(workflow, /has_sequence_privilege\([\s\S]*?content_release_events_id_seq[\s\S]*?'USAGE'/u);
  assert.match(workflow, /request\.jwt\.claim\.sub=spoofed-jwt-subject/u);
  assert.match(workflow, /test "\$content_audit_principal" = 'postgres\|spoofed-jwt-subject'/u);
  assert.match(workflow, /Content importer accepted a same-version row drift/u);
  assert.match(workflow, /A stale content-channel CAS unexpectedly succeeded/u);
  assert.match(workflow, /service_role wrote directly to the content audit log/u);
  assert.match(workflow, /Published content child INSERT was not rejected/u);
  assert.match(workflow, /Published content child UPDATE was not rejected/u);
  assert.match(workflow, /Published content child DELETE was not rejected/u);
  assert.match(workflow, /--snapshot-input \/tmp\/atlas-content-release\.json/u);
});
