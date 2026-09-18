import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { DatabaseSync } from "node:sqlite";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://aion2kina.com";
const secret = "journey-test-secret-that-is-at-least-32-bytes-long";
const encryptionKey = Buffer.alloc(32, 0x42).toString("base64url");
const visitorId = "0f4f97ce-0b42-4aba-8f9e-39d28c84ee71";
const sessionId = "590af8b3-1d57-4e27-bb9a-2f1656653510";

const validCollectPayload = {
  consentVersion: 2,
  visitorId,
  sessionId,
  event: "page_view",
  locale: "zh-hant",
  service: "kr-tw-live",
  surface: "home",
  targetKind: "none",
  targetKey: "none",
  path: "/zh-hant/",
  marketing: {
    utmSource: "Google",
    utmMedium: "Organic",
    utmCampaign: "AION2_Launch",
  },
};

function journeyRequest(pathname, payload, options = {}) {
  const method = options.method ?? "POST";
  return new Request(`${origin}${pathname}`, {
    method,
    headers: {
      cookie: options.cookie ?? "aion2_analytics_consent=granted-v2",
      "cf-connecting-ip": options.ip ?? "203.0.113.44",
      "cf-ipcountry": options.country ?? "tw",
      "content-type": options.contentType ?? "application/json",
      origin: options.origin ?? origin,
      "sec-fetch-site": options.fetchSite ?? "same-origin",
      "user-agent": options.userAgent ??
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/126.0.0.0 Mobile/15E148 Safari/604.1 SECRET-UA-TOKEN",
      referer: options.referrer ?? `${origin}/zh-hant/?private=query-value`,
      ...(options.headers ?? {}),
    },
    body: method === "GET"
      ? undefined
      : options.body ?? JSON.stringify(payload),
  });
}

function fakeDatabase({ rateChanges = 1, failurePattern = null } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      return {
        bind(...bindings) {
          const call = { sql, bindings };
          calls.push(call);
          return {
            async run() {
              if (failurePattern?.test(sql)) throw new Error("private database failure");
              if (/insert into analytics_ingest_windows/u.test(sql)) {
                return { success: true, meta: { changes: rateChanges } };
              }
              return { success: true, meta: { changes: 1 } };
            },
          };
        },
      };
    },
  };
}

function environment(db, overrides = {}) {
  return {
    ANALYTICS_IP_ENCRYPTION_KEY: encryptionKey,
    ANALYTICS_PSEUDONYM_KEY: secret,
    DB: db,
    SITE_URL: origin,
    ...overrides,
  };
}

test("consent-only journey event API", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());
  const { handleJourneyEventApi } = await vite.ssrLoadModule(
    "/worker/journey-event-api.ts",
  );
  const { decryptAnalyticsIp } = await vite.ssrLoadModule(
    "/worker/analytics-ip.ts",
  );

  await context.test("requires an unambiguous granted consent cookie", async () => {
    for (const cookie of [
      "",
      "aion2_analytics_consent=denied-v2",
      "aion2_analytics_consent=granted",
      "aion2_analytics_consent=granted-v2; aion2_analytics_consent=denied-v2",
      "other_cookie=granted",
    ]) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest("/api/journey-events/collect", validCollectPayload, { cookie }),
        environment(db),
      );
      assert.equal(response.status, 403);
      assert.equal(db.calls.length, 0);
    }
  });

  await context.test("accepts journey events for every public route locale", async () => {
    const locales = [
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
    for (const locale of locales) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest("/api/journey-events/collect", {
          ...validCollectPayload,
          locale,
          path: `/${locale}/`,
        }),
        environment(db),
      );
      assert.equal(response.status, 204);
      const insert = db.calls.find((call) =>
        /insert into analytics_journey_events/u.test(call.sql)
      );
      assert.equal(insert?.bindings[17], locale);
    }
  });

  await context.test("accepts the code conversion funnel with a stable tool target", async () => {
    for (const event of [
      "code_reveal_start",
      "code_reveal_complete",
      "code_copy_confirm_open",
      "code_copy_success",
      "code_copy_failure",
      "code_redeem_official_click",
    ]) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest("/api/journey-events/collect", {
          ...validCollectPayload,
          event,
          locale: "en",
          service: "global",
          surface: "content-detail",
          targetKind: "tool",
          targetKey: "code-center",
          path: "/en/codes/",
        }),
        environment(db),
      );
      assert.equal(response.status, 204);
    }
  });

  await context.test("accepts the event timer funnel with a stable tool target", async () => {
    for (const event of [
      "event_timer_open",
      "event_timer_service_change",
      "event_timer_filter_change",
      "event_timer_map_open",
      "event_timer_source_open",
    ]) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest("/api/journey-events/collect", {
          ...validCollectPayload,
          event,
          locale: "zh-hant",
          service: "kr-tw-live",
          surface: "event-timer",
          targetKind: "tool",
          targetKey: "event-timer",
          path: "/zh-hant/tools/event-timer/",
        }),
        environment(db),
      );
      assert.equal(response.status, 204);
    }
  });

  await context.test("accepts marker completion with the map as its stable target", async () => {
    const db = fakeDatabase();
    const response = await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", {
        ...validCollectPayload,
        event: "marker_found",
        locale: "zh-hant",
        service: "kr-tw-live",
        surface: "interactive-map",
        targetKind: "map",
        targetKey: "verteron",
        path: "/zh-hant/tools/map/verteron/",
      }),
      environment(db),
    );
    assert.equal(response.status, 204);
  });

  await context.test("rejects cross-origin, query-bearing, and oversized requests", async () => {
    const requests = [
      journeyRequest("/api/journey-events/collect", validCollectPayload, {
        origin: "https://attacker.example",
      }),
      journeyRequest("/api/journey-events/collect", validCollectPayload, {
        fetchSite: "cross-site",
      }),
      journeyRequest("/api/journey-events/collect?debug=1", validCollectPayload),
      journeyRequest("/api/journey-events/collect", validCollectPayload, {
        body: JSON.stringify({ ...validCollectPayload, padding: "x".repeat(5_000) }),
      }),
    ];
    for (const request of requests) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(request, environment(db));
      assert.ok([400, 403, 413].includes(response.status));
      assert.equal(db.calls.length, 0);
    }
  });

  await context.test("requires a server-only HMAC key of at least 32 UTF-8 bytes", async () => {
    for (const key of [undefined, "too-short", " ".repeat(64)]) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest("/api/journey-events/collect", validCollectPayload),
        environment(db, { ANALYTICS_PSEUDONYM_KEY: key }),
      );
      assert.equal(response.status, 503);
      assert.equal(db.calls.length, 0);
      assert.doesNotMatch(await response.text(), /HMAC|secret|key/iu);
    }
  });

  await context.test("fails closed when the consented IP cannot be encrypted", async () => {
    for (const options of [
      { ANALYTICS_IP_ENCRYPTION_KEY: undefined },
      { ANALYTICS_IP_ENCRYPTION_KEY: "not-a-32-byte-base64url-key" },
      { request: { ip: "999.1.1.1" } },
      { request: { headers: { "cf-connecting-ip": "" } } },
    ]) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest(
          "/api/journey-events/collect",
          validCollectPayload,
          options.request ?? {},
        ),
        environment(db, options.request ? {} : options),
      );
      assert.equal(response.status, 503);
      assert.equal(
        db.calls.some((call) => /insert into analytics_journey_events/u.test(call.sql)),
        false,
      );
      assert.doesNotMatch(await response.text(), /encrypt|AES|IP|key/iu);
    }
  });

  await context.test("normalizes and encrypts IPv6 without persisting plaintext", async () => {
    const db = fakeDatabase();
    const response = await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", validCollectPayload, {
        ip: "2001:0DB8:0000:0000:0000:0000:0000:0001",
      }),
      environment(db),
    );
    assert.equal(response.status, 204);
    const bindings = db.calls.find((call) =>
      /insert into analytics_journey_events/u.test(call.sql))?.bindings;
    assert.ok(bindings);
    assert.doesNotMatch(JSON.stringify(db.calls), /2001:0DB8|2001:db8/iu);
    assert.equal(
      await decryptAnalyticsIp(
        { ciphertext: bindings[5], iv: bindings[6], keyVersion: bindings[7] },
        {
          rowId: bindings[0],
          visitorHash: bindings[2],
          sessionHash: bindings[3],
          occurredAt: bindings[22],
        },
        encryptionKey,
      ),
      "2001:db8::1",
    );
  });

  await context.test("stores an encrypted IP with HMAC identities and coarse client dimensions", async () => {
    const db = fakeDatabase();
    const response = await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", validCollectPayload),
      environment(db),
    );
    assert.equal(response.status, 204);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.match(response.headers.get("x-robots-tag"), /noindex/u);
    assert.equal(db.calls.length, 4);
    assert.match(db.calls[0].sql, /delete from analytics_journey_events[\s\S]*expires_at/u);
    assert.match(db.calls[1].sql, /delete from analytics_ingest_windows[\s\S]*expires_at/u);
    assert.match(db.calls[2].sql, /insert into analytics_ingest_windows/u);
    assert.match(db.calls[3].sql, /insert into analytics_journey_events/u);

    const bindings = db.calls[3].bindings;
    for (const index of [2, 3, 4]) assert.match(bindings[index], /^[0-9a-f]{64}$/u);
    assert.notEqual(bindings[2], bindings[3]);
    assert.notEqual(bindings[2], bindings[4]);
    assert.match(bindings[5], /^[A-Za-z0-9_-]{24,84}$/u);
    assert.match(bindings[6], /^[A-Za-z0-9_-]{16}$/u);
    assert.equal(bindings[7], 1);
    assert.equal(bindings[8], "TW");
    assert.equal(bindings[9], "mobile");
    assert.equal(bindings[10], "chrome");
    assert.equal(bindings[11], "ios");
    assert.equal(bindings[12], "/zh-hant/");
    assert.deepEqual(bindings.slice(13, 16), ["google", "organic", "aion2_launch"]);
    assert.equal(bindings[16], "page_view");
    assert.equal(bindings[23] - bindings[22], 30 * 24 * 60 * 60 * 1_000);

    const decryptedIp = await decryptAnalyticsIp(
      { ciphertext: bindings[5], iv: bindings[6], keyVersion: bindings[7] },
      {
        rowId: bindings[0],
        visitorHash: bindings[2],
        sessionHash: bindings[3],
        occurredAt: bindings[22],
      },
      encryptionKey,
    );
    assert.equal(decryptedIp, "203.0.113.44");

    const persisted = JSON.stringify(db.calls);
    for (const raw of [
      visitorId,
      sessionId,
      "203.0.113.44",
      "SECRET-UA-TOKEN",
      "private=query-value",
    ]) {
      assert.equal(persisted.includes(raw), false, `must not persist raw ${raw}`);
    }
  });

  await context.test("uses stable visitor HMACs and visitor-scoped session HMACs", async () => {
    const firstDb = fakeDatabase();
    const secondDb = fakeDatabase();
    await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", validCollectPayload),
      environment(firstDb),
    );
    await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", {
        ...validCollectPayload,
        sessionId: "4a5424d5-5506-4671-9ee8-98517137c329",
      }),
      environment(secondDb),
    );
    assert.equal(firstDb.calls[3].bindings[2], secondDb.calls[3].bindings[2]);
    assert.notEqual(firstDb.calls[3].bindings[3], secondDb.calls[3].bindings[3]);
    assert.match(firstDb.calls[2].bindings[0], /^[0-9a-f]{64}$/u);
    assert.doesNotMatch(JSON.stringify(firstDb.calls[2].bindings), /203\.0\.113\.44/u);
  });

  await context.test("strictly allowlists events, paths, device-independent dimensions, and UTM fields", async () => {
    const invalidPayloads = [
      { ...validCollectPayload, event: "keystroke" },
      { ...validCollectPayload, path: "/zh-hant/?email=player@example.com" },
      { ...validCollectPayload, path: "https://aion2kina.com/zh-hant/" },
      { ...validCollectPayload, visitorId: "player@example.com" },
      { ...validCollectPayload, sessionId: "session-one" },
      { ...validCollectPayload, surface: "free-form" },
      { ...validCollectPayload, marketing: { utmSource: "google ads" } },
      { ...validCollectPayload, marketing: { utmSource: "google", clickId: "secret" } },
      { ...validCollectPayload, rawUserAgent: "browser" },
      { ...validCollectPayload, ip: "203.0.113.99" },
    ];
    for (const payload of invalidPayloads) {
      const db = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest("/api/journey-events/collect", payload),
        environment(db),
      );
      assert.equal(response.status, 400);
      assert.equal(db.calls.length, 0);
    }
  });

  await context.test("deletes every visitor journey after consent is denied or cleared", async () => {
    const collectDb = fakeDatabase();
    await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", validCollectPayload),
      environment(collectDb),
    );
    const visitorHash = collectDb.calls[3].bindings[2];

    for (const cookie of ["aion2_analytics_consent=denied-v2", ""]) {
      const deleteDb = fakeDatabase();
      const response = await handleJourneyEventApi(
        journeyRequest("/api/journey-events/delete", {
          consentVersion: 2,
          visitorId,
        }, { cookie }),
        environment(deleteDb),
      );
      assert.equal(response.status, 204);
      assert.equal(deleteDb.calls.length, 4);
      assert.match(deleteDb.calls[3].sql, /delete from analytics_journey_events[\s\S]*visitor_hash = \?/u);
      assert.deepEqual(deleteDb.calls[3].bindings, [visitorHash]);
      assert.doesNotMatch(JSON.stringify(deleteDb.calls), new RegExp(visitorId, "u"));
    }
  });

  await context.test("rate limits before insert and keeps database failures private", async () => {
    const limitedDb = fakeDatabase({ rateChanges: 0 });
    const limited = await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", validCollectPayload),
      environment(limitedDb),
    );
    assert.equal(limited.status, 429);
    assert.equal(limitedDb.calls.some((call) => /insert into analytics_journey_events/u.test(call.sql)), false);

    const failedDb = fakeDatabase({ failurePattern: /analytics_journey_events/u });
    const failed = await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", validCollectPayload),
      environment(failedDb),
    );
    assert.equal(failed.status, 503);
    assert.doesNotMatch(await failed.text(), /private database failure/u);
  });

  await context.test("does not expose a read endpoint", async () => {
    const read = await handleJourneyEventApi(
      journeyRequest("/api/journey-events/collect", undefined, { method: "GET" }),
      environment(fakeDatabase()),
    );
    assert.equal(read.status, 405);
    assert.equal(read.headers.get("allow"), "POST");
    assert.equal(
      await handleJourneyEventApi(
        journeyRequest("/api/journey-events/list", validCollectPayload),
        environment(fakeDatabase()),
      ),
      null,
    );
  });
});

function executeMigration(database, sql) {
  for (const statement of sql.split("--> statement-breakpoint")) {
    const normalized = statement.trim();
    if (normalized) database.exec(normalized);
  }
}

test("journey migration follows report migrations without losing old data", async () => {
  const migrations = await Promise.all(
    [
      "0000_lethal_the_fury.sql",
      "0001_familiar_wendigo.sql",
      "0002_useful_wild_child.sql",
      "0003_daily_mole_man.sql",
      "0004_minor_red_ghost.sql",
      "0005_silly_betty_brant.sql",
      "0006_complete_may_parker.sql",
      "0007_fast_spyke.sql",
      "0008_grey_darkstar.sql",
    ].map((name) => readFile(path.join(root, "drizzle", name), "utf8")),
  );
  const database = new DatabaseSync(":memory:");
  executeMigration(database, migrations[0]);
  database.prepare(`
    insert into content_reports (
      id, target_kind, target_key, locale, service, version, category,
      message, evidence_url, contact, status, created_at, resolved_at,
      requester_hash
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "legacy-report",
    "content",
    "guides/interactive-map-quickstart",
    "en",
    "global",
    null,
    "outdated",
    "A legacy report that must survive migrations.",
    null,
    null,
    "new",
    1_784_000_000_000,
    null,
    "a".repeat(64),
  );
  for (const migration of migrations.slice(1, 4)) executeMigration(database, migration);
  const occurredAt = 1_784_000_000_000;
  database.prepare(`
    insert into analytics_journey_events (
      id, consent_version, visitor_hash, session_hash, network_hash, country,
      device_class, browser_family, os_family, path, utm_source, utm_medium,
      utm_campaign, event_name, locale, service, surface, target_kind,
      target_key, occurred_at, expires_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "legacy-journey",
    1,
    "b".repeat(64),
    "c".repeat(64),
    "d".repeat(64),
    "TW",
    "desktop",
    "chrome",
    "windows",
    "/en/",
    "google",
    "organic",
    null,
    "page_view",
    "en",
    "global",
    "home",
    "none",
    "none",
    occurredAt,
    occurredAt + 30 * 24 * 60 * 60 * 1_000,
  );
  for (const migration of migrations.slice(4)) executeMigration(database, migration);

  const report = database.prepare(
    "select id, message, updated_at, resolution_note, resolved_by from content_reports where id = ?",
  ).get("legacy-report");
  assert.deepEqual({ ...report }, {
    id: "legacy-report",
    message: "A legacy report that must survive migrations.",
    updated_at: null,
    resolution_note: null,
    resolved_by: null,
  });
  const tables = database.prepare(
    "select name from sqlite_master where type = 'table' order by name",
  ).all().map((row) => row.name);
  assert.ok(tables.includes("analytics_daily"));
  assert.ok(tables.includes("analytics_ingest_windows"));
  assert.ok(tables.includes("analytics_journey_events"));
  const legacyJourney = database.prepare(`
    select consent_version, ip_ciphertext, ip_iv, ip_key_version
    from analytics_journey_events where id = ?
  `).get("legacy-journey");
  assert.deepEqual({ ...legacyJourney }, {
    consent_version: 1,
    ip_ciphertext: null,
    ip_iv: null,
    ip_key_version: null,
  });

  database.prepare(`
    insert into content_reports (
      id, target_kind, target_key, locale, service, category, message,
      status, created_at, requester_hash
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "localized-report",
    "content",
    "guides/interactive-map-quickstart",
    "fr",
    "global",
    "translation",
    "The French route can now submit a correction report.",
    "new",
    occurredAt,
    "e".repeat(64),
  );
  database.prepare(`
    insert into analytics_daily (
      day, event_name, locale, service, surface, target_kind, target_key,
      count, updated_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "2026-07-25",
    "page_view",
    "pt-br",
    "global",
    "home",
    "none",
    "none",
    1,
    occurredAt,
  );
  database.prepare(`
    insert into analytics_daily (
      day, event_name, locale, service, surface, target_kind, target_key,
      count, updated_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "2026-07-25",
    "not_found_recovery_click",
    "en",
    "global",
    "not-found",
    "none",
    "none",
    1,
    occurredAt,
  );
  database.prepare(`
    insert into analytics_journey_events (
      id, consent_version, visitor_hash, session_hash, network_hash, country,
      device_class, browser_family, os_family, path, event_name, locale,
      service, surface, target_kind, target_key, occurred_at, expires_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "content-detail-journey",
    1,
    "f".repeat(64),
    "1".repeat(64),
    "2".repeat(64),
    "TW",
    "desktop",
    "chrome",
    "windows",
    "/en/guides/interactive-map-quickstart/",
    "content_primary_action_click",
    "en",
    "global",
    "content-detail",
    "content",
    "guides/interactive-map-quickstart",
    occurredAt,
    occurredAt + 30 * 24 * 60 * 60 * 1_000,
  );
  assert.equal(
    database.prepare(
      "select locale from content_reports where id = 'localized-report'",
    ).get().locale,
    "fr",
  );
  assert.equal(
    database.prepare(
      "select locale from analytics_daily where locale = 'pt-br'",
    ).get().locale,
    "pt-br",
  );
  assert.equal(
    database.prepare(
      "select surface from analytics_daily where surface = 'not-found'",
    ).get().surface,
    "not-found",
  );
  assert.equal(
    database.prepare(
      "select surface from analytics_journey_events where id = 'content-detail-journey'",
    ).get().surface,
    "content-detail",
  );
  database.close();
});
