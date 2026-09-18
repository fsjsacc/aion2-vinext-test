import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://aion2kina.com";
const reportId = "5d4df667-9b54-41db-9061-f857913af7d8";
const encryptionKey = Buffer.alloc(32, 0x42).toString("base64url");

function request(pathname, options = {}) {
  return new Request(`${origin}${pathname}`, {
    method: options.method ?? "GET",
    headers: {
      accept: "application/json",
      ...(options.method === "PATCH"
        ? { "content-type": "application/json", origin, "sec-fetch-site": "same-origin" }
        : {}),
      ...(options.headers ?? {}),
    },
    body: options.body,
  });
}

function fakeDatabase({ journeyEventRows } = {}) {
  const calls = [];
  const report = {
    id: reportId,
    target_kind: "content",
    target_key: "guides/interactive-map-quickstart",
    locale: "zh-hant",
    service: "kr-tw-live",
    version: null,
    category: "broken-link",
    message: "The static preview image cannot be loaded on the published guide.",
    evidence_url: "https://example.com/screenshot",
    contact: "player@example.com",
    status: "new",
    created_at: 1_756_000_000_000,
    updated_at: null,
    resolved_at: null,
    resolution_note: null,
    requester_hash: "a".repeat(64),
  };
  return {
    calls,
    prepare(sql) {
      const statement = {
        bindings: [],
        bind(...bindings) {
          statement.bindings = bindings;
          calls.push({ sql, bindings });
          return statement;
        },
        async first() {
          if (/reports_total/u.test(sql)) return { reports_total: 4, reports_open: 3 };
          if (/events_today/u.test(sql)) return { events_today: 7, events_period: 42 };
          if (/journey_events/u.test(sql)) {
            return { journey_events: 31, journey_visitors: 9, journey_sessions: 12 };
          }
          if (/select status from content_reports/u.test(sql)) return { status: report.status };
          if (/from content_reports/u.test(sql) && /where id = \?/u.test(sql)) return { ...report };
          return null;
        },
        async all() {
          if (/from content_reports/u.test(sql)) return { success: true, results: [{ ...report }] };
          if (/group by country/u.test(sql)) {
            return { success: true, results: [{ label: "TW", count: 18, visitors: 6 }] };
          }
          if (/group by device_class/u.test(sql)) {
            return { success: true, results: [{ label: "mobile", count: 20, visitors: 7 }] };
          }
          if (/group by browser_family/u.test(sql)) {
            return { success: true, results: [{ label: "chrome", count: 17, visitors: 6 }] };
          }
          if (/group by utm_source/u.test(sql)) {
            return { success: true, results: [{ label: "google", count: 11, visitors: 5 }] };
          }
          if (/group by utm_medium/u.test(sql)) {
            return { success: true, results: [{ label: "organic", count: 10, visitors: 5 }] };
          }
          if (/group by utm_campaign/u.test(sql)) {
            return { success: true, results: [{ label: "launch", count: 8, visitors: 4 }] };
          }
          if (/group by path/u.test(sql)) {
            return { success: true, results: [{ label: "/zh-hant/guides/", count: 14, visitors: 6 }] };
          }
          if (/min\(occurred_at\) as started_at/u.test(sql)) {
            return {
              success: true,
              results: [{
                session_short: "0123abcd",
                started_at: 1_756_000_000_000,
                last_at: 1_756_000_060_000,
                event_count: 3,
                path_count: 2,
              }],
            };
          }
          if (/session_hash in/u.test(sql)) {
            return {
              success: true,
              results: journeyEventRows ?? [
                {
                  session_short: "0123abcd",
                  event_name: "guide_click",
                  path: "/zh-hant/guides/",
                  surface: "content-hub",
                  occurred_at: 1_756_000_060_000,
                },
                {
                  session_short: "0123abcd",
                  event_name: "page_view",
                  path: "/zh-hant/",
                  surface: "home",
                  occurred_at: 1_756_000_000_000,
                },
              ],
            };
          }
          if (/group by day/u.test(sql)) return { success: true, results: [{ day: "2026-07-22", count: 5 }] };
          if (/group by event_name/u.test(sql)) return { success: true, results: [{ label: "guide_click", count: 12 }] };
          if (/group by surface/u.test(sql)) return { success: true, results: [{ label: "home", count: 8 }] };
          if (/group by target_kind/u.test(sql)) return { success: true, results: [{ label: "guides/map", count: 3 }] };
          return { success: true, results: [] };
        },
        async run() {
          if (/update content_reports/u.test(sql)) {
            report.status = statement.bindings[0];
            report.updated_at = statement.bindings[1];
            report.resolved_at = statement.bindings[2];
            report.resolution_note = statement.bindings[3];
          }
          return { success: true, meta: { changes: 1 } };
        },
      };
      return statement;
    },
  };
}

const allowAdmin = async () => ({
  ok: true,
  admin: { email: "admin@example.com", displayName: "KINA Admin" },
});

function environment(db, overrides = {}) {
  return {
    ANALYTICS_IP_ENCRYPTION_KEY: encryptionKey,
    DB: db,
    SITE_URL: origin,
    ...overrides,
  };
}

test("admin data API remains authenticated, private, and free of internal identifiers", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());
  const { handleAdminApi } = await vite.ssrLoadModule("/worker/admin-api.ts");
  const { encryptAnalyticsIp } = await vite.ssrLoadModule("/worker/analytics-ip.ts");

  await context.test("authorization runs before any database query", async () => {
    const db = fakeDatabase();
    const response = await handleAdminApi(
      request("/api/admin/dashboard"),
      environment(db),
      async () => ({ ok: false, response: new Response("Unauthorized", { status: 401 }) }),
    );
    assert.equal(response.status, 401);
    assert.equal(db.calls.length, 0);
  });

  await context.test("dashboard returns anonymous aggregates, consented IP journeys, and safe report fields", async () => {
    const rowId = "journey-row-v2";
    const visitorHash = "f".repeat(64);
    const sessionHash = `0123abcd${"e".repeat(56)}`;
    const occurredAt = 1_756_000_060_000;
    const encrypted = await encryptAnalyticsIp(
      "203.0.113.44",
      { rowId, visitorHash, sessionHash, occurredAt },
      encryptionKey,
    );
    const db = fakeDatabase({
      journeyEventRows: [
        {
          row_id: rowId,
          session_short: "0123abcd",
          consent_version: 2,
          visitor_hash: visitorHash,
          session_hash: sessionHash,
          ip_ciphertext: encrypted.ciphertext,
          ip_iv: encrypted.iv,
          ip_key_version: encrypted.keyVersion,
          event_name: "guide_click",
          path: "/zh-hant/guides/",
          surface: "content-hub",
          occurred_at: occurredAt,
        },
        {
          row_id: "legacy-row-v1",
          session_short: "0123abcd",
          consent_version: 1,
          visitor_hash: visitorHash,
          session_hash: sessionHash,
          ip_ciphertext: null,
          ip_iv: null,
          ip_key_version: null,
          event_name: "page_view",
          path: "/zh-hant/",
          surface: "home",
          occurred_at: 1_756_000_000_000,
        },
      ],
    });
    const response = await handleAdminApi(
      request("/api/admin/dashboard?days=30"),
      environment(db),
      allowAdmin,
    );
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(response.headers.get("cdn-cache-control"), "no-store");
    assert.match(response.headers.get("x-robots-tag"), /noindex/u);
    const body = await response.json();
    assert.equal(body.metrics.reportsOpen, 3);
    assert.equal(body.metrics.eventsPeriod, 42);
    assert.equal(body.analytics.events[0].label, "guide_click");
    assert.equal(body.journeys.days, 30);
    assert.equal(body.journeys.retentionDays, 30);
    assert.equal(body.journeys.sampleThreshold, 3);
    assert.equal(body.journeys.uniqueVisitors, 9);
    assert.deepEqual(body.journeys.countries[0], { label: "TW", count: 18, visitors: 6 });
    assert.deepEqual(body.journeys.utmMediums[0], { label: "organic", count: 10, visitors: 5 });
    assert.equal(body.journeys.recentSessions[0].sessionId, "0123abcd");
    assert.equal(body.journeys.recentSessions[0].ipAddress, "203.0.113.44");
    assert.equal(body.journeys.recentSessions[0].events.length, 2);
    assert.equal(body.journeys.recentSessions[0].events[0].path, "/zh-hant/");
    assert.equal(body.reports[0].contact, undefined);
    assert.equal(body.reports[0].requesterHash, undefined);
    const serialized = JSON.stringify(body);
    assert.doesNotMatch(serialized, /player@example\.com|a{64}/u);
    assert.equal(serialized.includes(encrypted.ciphertext), false);
    assert.equal(serialized.includes(encrypted.iv), false);
    assert.doesNotMatch(
      serialized,
      /network_?hash|visitor_?hash|session_?hash|(?:^|[^0-9a-f])[0-9a-f]{64}(?:[^0-9a-f]|$)/iu,
    );

    const journeyQueries = db.calls.filter((call) => /from analytics_journey_events/u.test(call.sql));
    assert.ok(journeyQueries.length >= 9);
    assert.ok(journeyQueries.every((call) => /consent_version in \(1, 2\)/u.test(call.sql)));
    assert.ok(journeyQueries.every((call) => /occurred_at >= \?/u.test(call.sql)));
    assert.ok(journeyQueries.every((call) => /expires_at > \?/u.test(call.sql)));
    const dimensionQueries = journeyQueries.filter((call) => /group by (?:country|device_class|browser_family|utm_source|utm_medium|utm_campaign|path)/u.test(call.sql));
    assert.equal(dimensionQueries.length, 7);
    assert.ok(dimensionQueries.every((call) => /having count\(distinct visitor_hash\) >= \?/u.test(call.sql)));
    assert.ok(dimensionQueries.every((call) => call.bindings.at(-1) === 3));
  });

  await context.test("journey data is capped to the 30-day retention window", async () => {
    const db = fakeDatabase();
    const response = await handleAdminApi(
      request("/api/admin/dashboard?days=90"),
      environment(db),
      allowAdmin,
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.analytics.days, 90);
    assert.equal(body.journeys.days, 30);
    const metricQuery = db.calls.find((call) => /journey_events/u.test(call.sql));
    assert.ok(metricQuery);
    const elapsed = Date.now() - metricQuery.bindings[0];
    assert.ok(elapsed >= 29 * 24 * 60 * 60 * 1_000);
    assert.ok(elapsed <= 31 * 24 * 60 * 60 * 1_000);
  });

  await context.test("tampered encrypted IP data is never exposed and does not break the dashboard", async () => {
    const db = fakeDatabase({
      journeyEventRows: [{
        row_id: "tampered-row-v2",
        session_short: "0123abcd",
        consent_version: 2,
        visitor_hash: "f".repeat(64),
        session_hash: `0123abcd${"e".repeat(56)}`,
        ip_ciphertext: "A".repeat(24),
        ip_iv: "A".repeat(16),
        ip_key_version: 1,
        event_name: "page_view",
        path: "/en/",
        surface: "home",
        occurred_at: 1_756_000_000_000,
      }],
    });
    const response = await handleAdminApi(
      request("/api/admin/dashboard?days=30"),
      environment(db),
      allowAdmin,
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.journeys.recentSessions[0].ipAddress, null);
    const serialized = JSON.stringify(body);
    assert.equal(serialized.includes("A".repeat(24)), false);
    assert.doesNotMatch(serialized, /visitor_hash|session_hash|ip_ciphertext|ip_iv/iu);
  });

  await context.test("report details reveal contact only to an authorized request", async () => {
    const db = fakeDatabase();
    const response = await handleAdminApi(
      request(`/api/admin/reports/${reportId}`),
      environment(db),
      allowAdmin,
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.contact, "player@example.com");
    assert.equal(body.requesterHash, undefined);
  });

  await context.test("status updates require same-origin JSON and consistent resolution timestamps", async () => {
    const crossOriginDb = fakeDatabase();
    const denied = await handleAdminApi(
      request(`/api/admin/reports/${reportId}`, {
        method: "PATCH",
        headers: { origin: "https://attacker.example" },
        body: JSON.stringify({ status: "resolved", resolutionNote: "Checked" }),
      }),
      environment(crossOriginDb),
      allowAdmin,
    );
    assert.equal(denied.status, 403);
    assert.equal(crossOriginDb.calls.some((call) => /update content_reports/u.test(call.sql)), false);

    const db = fakeDatabase();
    const response = await handleAdminApi(
      request(`/api/admin/reports/${reportId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "resolved", resolutionNote: "Verified and corrected." }),
      }),
      environment(db),
      allowAdmin,
    );
    assert.equal(response.status, 200);
    const update = db.calls.find((call) => /update content_reports/u.test(call.sql));
    assert.ok(update);
    assert.equal(update.bindings[0], "resolved");
    assert.ok(Number.isSafeInteger(update.bindings[1]));
    assert.ok(Number.isSafeInteger(update.bindings[2]));
    assert.equal(update.bindings[3], "Verified and corrected.");
    assert.equal(update.bindings[4], "admin@example.com");

    const reopened = await handleAdminApi(
      request(`/api/admin/reports/${reportId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "triaged", resolutionNote: "Reopened." }),
      }),
      environment(db),
      allowAdmin,
    );
    assert.equal(reopened.status, 200);
    const updates = db.calls.filter((call) => /update content_reports/u.test(call.sql));
    assert.equal(updates.at(-1).bindings[2], null);
  });
});
