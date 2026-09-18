import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://aion2kina.com";
const pseudonymKey = "event-test-key-with-at-least-32-bytes";

const validPayload = {
  event: "content_card_click",
  locale: "en",
  service: "global",
  surface: "content-hub",
  targetKind: "content",
  targetKey: "guides/interactive-map-quickstart",
};

function eventRequest(payload = validPayload, options = {}) {
  const method = options.method ?? "POST";
  return new Request(`${origin}${options.path ?? "/api/events"}`, {
    method,
    headers: {
      "cf-connecting-ip": options.ip ?? "203.0.113.20",
      "content-type": options.contentType ?? "application/json",
      ...(options.cookie === null
        ? {}
        : { cookie: options.cookie ?? "aion2_analytics_consent=granted-v2" }),
      origin: options.origin ?? origin,
      ...(options.headers ?? {}),
    },
    body: method === "GET"
      ? undefined
      : options.body ?? JSON.stringify(payload),
  });
}

function eventEnvironment(DB) {
  return {
    ANALYTICS_PSEUDONYM_KEY: pseudonymKey,
    DB,
    SITE_URL: origin,
  };
}

function fakeDatabase({ rateChanges = 1, eventSuccess = true, error = null } = {}) {
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
              if (error) throw error;
              if (/insert into analytics_ingest_windows/u.test(sql)) {
                return { success: true, meta: { changes: rateChanges } };
              }
              if (/insert into analytics_daily/u.test(sql)) {
                return { success: eventSuccess, meta: { changes: 1 } };
              }
              return { success: true, meta: { changes: 0 } };
            },
          };
        },
      };
    },
  };
}

test("privacy-preserving first-party event API", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());
  const { handleEventApi } = await vite.ssrLoadModule("/worker/event-api.ts");

  await context.test("aggregates an allowlisted same-origin event without raw request identity", async () => {
    const db = fakeDatabase();
    const response = await handleEventApi(eventRequest(), eventEnvironment(db));

    assert.equal(response.status, 204);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.match(response.headers.get("x-robots-tag"), /noindex/u);
    assert.equal(db.calls.length, 3);
    assert.match(db.calls[0].sql, /delete from analytics_ingest_windows/u);
    assert.match(db.calls[1].sql, /insert into analytics_ingest_windows/u);
    assert.match(db.calls[1].sql, /request_count = analytics_ingest_windows\.request_count \+ 1/u);
    assert.match(db.calls[2].sql, /insert into analytics_daily/u);
    assert.match(db.calls[2].sql, /count = analytics_daily\.count \+ 1/u);
    assert.match(db.calls[1].bindings[0], /^[0-9a-f]{64}$/u);
    assert.doesNotMatch(JSON.stringify(db.calls), /203\.0\.113\.20/u);
    assert.deepEqual(db.calls[2].bindings.slice(1, 7), [
      "content_card_click",
      "en",
      "global",
      "content-hub",
      "content",
      "guides/interactive-map-quickstart",
    ]);
  });

  await context.test("accepts a privacy-safe 404 recovery event", async () => {
    const db = fakeDatabase();
    const response = await handleEventApi(
      eventRequest({
        event: "not_found_recovery_click",
        locale: "zh-hant",
        service: "unknown",
        surface: "not-found",
        targetKind: "none",
        targetKey: "none",
      }),
      eventEnvironment(db),
    );

    assert.equal(response.status, 204);
    assert.deepEqual(db.calls[2].bindings.slice(1, 7), [
      "not_found_recovery_click",
      "zh-hant",
      "unknown",
      "not-found",
      "none",
      "none",
    ]);
  });

  await context.test("accepts a content source click with a content-detail target", async () => {
    const db = fakeDatabase();
    const response = await handleEventApi(
      eventRequest({
        event: "content_source_click",
        locale: "en",
        service: "kr-tw-live",
        surface: "content-detail",
        targetKind: "content",
        targetKey: "news/july-29-2026-pet-auto-loot-server-matching-update",
      }),
      eventEnvironment(db),
    );

    assert.equal(response.status, 204);
    assert.deepEqual(db.calls[2].bindings.slice(1, 7), [
      "content_source_click",
      "en",
      "kr-tw-live",
      "content-detail",
      "content",
      "news/july-29-2026-pet-auto-loot-server-matching-update",
    ]);
  });

  await context.test("accepts each privacy-safe code conversion event", async () => {
    for (const event of [
      "code_reveal_start",
      "code_reveal_complete",
      "code_copy_confirm_open",
      "code_copy_success",
      "code_copy_failure",
      "code_redeem_official_click",
    ]) {
      const db = fakeDatabase();
      const response = await handleEventApi(
        eventRequest({
          event,
          locale: "en",
          service: "global",
          surface: "content-detail",
          targetKind: "tool",
          targetKey: "code-center",
        }),
        eventEnvironment(db),
      );

      assert.equal(response.status, 204);
      assert.deepEqual(db.calls[2].bindings.slice(1, 7), [
        event,
        "en",
        "global",
        "content-detail",
        "tool",
        "code-center",
      ]);
    }
  });

  await context.test("accepts the event timer interaction funnel", async () => {
    for (const event of [
      "event_timer_open",
      "event_timer_service_change",
      "event_timer_filter_change",
      "event_timer_map_open",
      "event_timer_source_open",
    ]) {
      const db = fakeDatabase();
      const response = await handleEventApi(
        eventRequest({
          event,
          locale: "zh-hant",
          service: "kr-tw-live",
          surface: "event-timer",
          targetKind: "tool",
          targetKey: "event-timer",
        }),
        eventEnvironment(db),
      );

      assert.equal(response.status, 204);
      assert.deepEqual(db.calls[2].bindings.slice(1, 7), [
        event,
        "zh-hant",
        "kr-tw-live",
        "event-timer",
        "tool",
        "event-timer",
      ]);
    }
  });

  await context.test("accepts marker completion without exposing marker identity", async () => {
    const db = fakeDatabase();
    const response = await handleEventApi(
      eventRequest({
        event: "marker_found",
        locale: "zh-hant",
        service: "kr-tw-live",
        surface: "interactive-map",
        targetKind: "map",
        targetKey: "verteron",
      }),
      eventEnvironment(db),
    );

    assert.equal(response.status, 204);
    assert.deepEqual(db.calls[2].bindings.slice(1, 7), [
      "marker_found",
      "zh-hant",
      "kr-tw-live",
      "interactive-map",
      "map",
      "verteron",
    ]);
  });

  await context.test("accepts every public route locale", async () => {
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
      const response = await handleEventApi(
        eventRequest({ ...validPayload, locale }),
        eventEnvironment(db),
      );
      assert.equal(response.status, 204);
      assert.equal(db.calls[2].bindings[2], locale);
    }
  });

  await context.test("rejects unknown events, dimensions, target keys, and extra data", async () => {
    const invalidPayloads = [
      { ...validPayload, event: "arbitrary_click" },
      { ...validPayload, locale: "xx" },
      { ...validPayload, service: "private-server" },
      { ...validPayload, surface: "free-form-surface" },
      { ...validPayload, targetKind: "user" },
      { ...validPayload, targetKey: "guides/example?email=player@example.com" },
      { ...validPayload, userAgent: "browser fingerprint" },
      { ...validPayload, sessionId: "visitor-123" },
    ];

    for (const payload of invalidPayloads) {
      const db = fakeDatabase();
      const response = await handleEventApi(eventRequest(payload), eventEnvironment(db));
      assert.equal(response.status, 400);
      assert.equal(db.calls.length, 0);
    }
  });

  await context.test("requires same-origin JSON and rejects oversized bodies", async () => {
    for (const request of [
      eventRequest(validPayload, { origin: "https://attacker.example" }),
      eventRequest(validPayload, { headers: { origin: "" } }),
      eventRequest(validPayload, { contentType: "text/plain" }),
      eventRequest(validPayload, {
        body: JSON.stringify({ ...validPayload, padding: "x".repeat(3_000) }),
      }),
    ]) {
      const db = fakeDatabase();
      const response = await handleEventApi(request, eventEnvironment(db));
      assert.ok([400, 403, 413, 415].includes(response.status));
      assert.equal(db.calls.length, 0);
    }
  });

  await context.test("rate-limits before changing the daily aggregate", async () => {
    const db = fakeDatabase({ rateChanges: 0 });
    const response = await handleEventApi(eventRequest(), eventEnvironment(db));
    assert.equal(response.status, 429);
    assert.ok(Number(response.headers.get("retry-after")) >= 1);
    assert.equal(db.calls.length, 2);
    assert.equal(db.calls.some((call) => /insert into analytics_daily/u.test(call.sql)), false);
  });

  await context.test("does not expose database errors or accept read access", async () => {
    const missing = await handleEventApi(eventRequest(), eventEnvironment(undefined));
    assert.equal(missing.status, 503);

    const failed = await handleEventApi(eventRequest(), {
      ANALYTICS_PSEUDONYM_KEY: pseudonymKey,
      DB: fakeDatabase({ error: new Error("no such table: analytics_daily") }),
      SITE_URL: origin,
    });
    assert.equal(failed.status, 503);
    assert.doesNotMatch(await failed.text(), /no such table/u);

    const read = await handleEventApi(eventRequest(undefined, { method: "GET" }), {
      ...eventEnvironment(fakeDatabase()),
    });
    assert.equal(read.status, 405);
    assert.equal(read.headers.get("allow"), "POST");

    assert.equal(
      await handleEventApi(eventRequest(validPayload, { path: "/api/not-events" }), {
        ...eventEnvironment(fakeDatabase()),
      }),
      null,
    );
  });

  await context.test("requires explicit analytics consent and a secret HMAC key", async () => {
    for (const cookie of [
      null,
      "aion2_analytics_consent=granted",
      "aion2_analytics_consent=denied-v2",
      "aion2_analytics_consent=granted-v2; aion2_analytics_consent=denied-v2",
    ]) {
      const noConsent = await handleEventApi(
        eventRequest(validPayload, { cookie }),
        eventEnvironment(fakeDatabase()),
      );
      assert.equal(noConsent.status, 403);
    }

    const noKey = await handleEventApi(eventRequest(), {
      DB: fakeDatabase(),
      SITE_URL: origin,
    });
    assert.equal(noKey.status, 503);
  });
});

test("client analytics limits detailed events to consent and mirrors only allowlisted non-admin events", async () => {
  const [analytics, layout, schema, aggregateMigration, journeyMigration, encryptedIpMigration, privacy] = await Promise.all([
    readFile(path.join(root, "app", "analytics.ts"), "utf8"),
    readFile(path.join(root, "app", "layout.tsx"), "utf8"),
    readFile(path.join(root, "db", "schema.ts"), "utf8"),
    readFile(path.join(root, "drizzle", "0001_familiar_wendigo.sql"), "utf8"),
    readFile(path.join(root, "drizzle", "0003_daily_mole_man.sql"), "utf8"),
    readFile(path.join(root, "drizzle", "0004_minor_red_ghost.sql"), "utf8"),
    readFile(path.join(root, "app", "trust-content.ts"), "utf8"),
  ]);

  assert.match(layout, /GA4_MEASUREMENT_ID = "G-XDH0X1HZR2"/u);
  assert.match(analytics, /analyticsWindow\.gtag\("event", event, payload\)/u);
  assert.match(analytics, /analyticsWindow\.dataLayer\.push\(detail\)/u);
  assert.match(analytics, /navigator\.sendBeacon\("\/api\/events"/u);
  assert.match(analytics, /keepalive: true/u);
  assert.match(analytics, /readAnalyticsConsent\(\) !== "granted"/u);
  assert.match(analytics, /ADMIN_PATH_PATTERN\.test\(window\.location\.pathname\)/u);
  assert.match(schema, /individual requests, visitors, sessions, IP addresses/u);
  assert.match(schema, /analytics_journey_events/u);
  assert.match(aggregateMigration, /CREATE TABLE `analytics_daily`/u);
  assert.match(aggregateMigration, /CREATE TABLE `analytics_ingest_windows`/u);
  assert.doesNotMatch(
    `${aggregateMigration}\n${journeyMigration}\n${encryptedIpMigration}`,
    /raw_ip|user_agent|referrer_url|query_string|visitor_id|session_id/iu,
  );
  assert.match(encryptedIpMigration, /ip_ciphertext/u);
  assert.match(privacy, /detailed analytics are enabled by default for every visitor/u);
  assert.match(privacy, /full page_location including query parameters/u);
  assert.match(privacy, /approved custom feature events are sent/u);
  assert.match(privacy, /connection IP encrypted at rest/u);
});
