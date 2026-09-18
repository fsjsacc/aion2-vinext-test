import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://aion2kina.com";

const validPayload = {
  targetKind: "content",
  targetKey: "guides/map-usage",
  locale: "en",
  service: "kr-tw-live",
  version: "chapter-1",
  category: "outdated",
  message: "This step changed after the latest game update.",
  evidenceUrl: "https://example.com/official-notice",
  contact: "player@example.com",
  website: "",
};

function reportRequest(payload = validPayload, options = {}) {
  return new Request(`${origin}/api/reports`, {
    method: options.method ?? "POST",
    headers: {
      "cf-connecting-ip": options.ip ?? "203.0.113.10",
      "content-type": options.contentType ?? "application/json",
      origin: options.origin ?? origin,
      ...(options.headers ?? {}),
    },
    body: (options.method ?? "POST") === "GET"
      ? undefined
      : options.body ?? JSON.stringify(payload),
  });
}

function fakeDatabase({ changes = 1, success = true, error = null } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      return {
        bind(...bindings) {
          calls.push({ sql, bindings });
          return {
            async run() {
              if (error) throw error;
              return { success, meta: { changes } };
            },
          };
        },
      };
    },
  };
}

test("structured report API validates, persists, and rate-limits safely", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());
  const { handleReportApi } = await vite.ssrLoadModule("/worker/report-api.ts");

  await context.test("a valid same-origin report is inserted without storing the raw IP", async () => {
    const db = fakeDatabase();
    const response = await handleReportApi(reportRequest(), {
      DB: db,
      SITE_URL: origin,
    });
    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.ok, true);
    assert.match(body.id, /^[0-9a-f-]{36}$/u);
    assert.equal(db.calls.length, 1);
    assert.match(db.calls[0].sql, /insert into content_reports/u);
    assert.match(db.calls[0].sql, /select count\(\*\)[\s\S]*requester_hash/u);
    assert.equal(db.calls[0].bindings[1], "content");
    assert.equal(db.calls[0].bindings[2], "guides/map-usage");
    assert.match(db.calls[0].bindings[13], /^[0-9a-f]{64}$/u);
    assert.equal(db.calls[0].bindings[13], db.calls[0].bindings[14]);
    assert.doesNotMatch(JSON.stringify(db.calls[0].bindings), /203\.0\.113\.10/u);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
  });

  await context.test("all public route locales can submit a report", async () => {
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
      const response = await handleReportApi(
        reportRequest({ ...validPayload, locale }),
        { DB: db, SITE_URL: origin },
      );
      assert.equal(response.status, 201);
      assert.equal(db.calls[0].bindings[3], locale);
    }
  });

  await context.test("invalid fields, insecure evidence, and unknown input are rejected", async () => {
    for (const payload of [
      { ...validPayload, category: "urgent" },
      { ...validPayload, evidenceUrl: "http://example.com/not-secure" },
      { ...validPayload, unexpected: true },
      { ...validPayload, targetKey: "../../admin" },
    ]) {
      const db = fakeDatabase();
      const response = await handleReportApi(reportRequest(payload), {
        DB: db,
        SITE_URL: origin,
      });
      assert.equal(response.status, 400);
      assert.equal(db.calls.length, 0);
    }
  });

  await context.test("an HTTPS evidence URL that expands beyond the database limit is rejected", async () => {
    const db = fakeDatabase();
    const response = await handleReportApi(
      reportRequest({
        ...validPayload,
        evidenceUrl: `https://example.com/${"漢".repeat(300)}`,
      }),
      { DB: db, SITE_URL: origin },
    );
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "evidenceUrl is too long" });
    assert.equal(db.calls.length, 0);
  });

  await context.test("malformed JSON and non-JSON content types are rejected", async () => {
    const malformedDb = fakeDatabase();
    const malformed = await handleReportApi(
      reportRequest(validPayload, { body: "{not-json" }),
      { DB: malformedDb, SITE_URL: origin },
    );
    assert.equal(malformed.status, 400);
    assert.equal(malformedDb.calls.length, 0);

    const contentTypeDb = fakeDatabase();
    const wrongContentType = await handleReportApi(
      reportRequest(validPayload, { contentType: "text/plain" }),
      { DB: contentTypeDb, SITE_URL: origin },
    );
    assert.equal(wrongContentType.status, 415);
    assert.equal(contentTypeDb.calls.length, 0);
  });

  await context.test("cross-origin and oversized requests are rejected before persistence", async () => {
    const crossOriginDb = fakeDatabase();
    const crossOrigin = await handleReportApi(
      reportRequest(validPayload, { origin: "https://attacker.example" }),
      { DB: crossOriginDb, SITE_URL: origin },
    );
    assert.equal(crossOrigin.status, 403);
    assert.equal(crossOriginDb.calls.length, 0);

    const oversizedDb = fakeDatabase();
    const oversized = await handleReportApi(
      reportRequest(validPayload, { body: JSON.stringify({ message: "x".repeat(9_000) }) }),
      { DB: oversizedDb, SITE_URL: origin },
    );
    assert.equal(oversized.status, 413);
    assert.equal(oversizedDb.calls.length, 0);
  });

  await context.test("the honeypot returns an empty success without a database write", async () => {
    const db = fakeDatabase();
    const response = await handleReportApi(
      reportRequest({ website: "https://spam.example" }),
      { DB: db, SITE_URL: origin },
    );
    assert.equal(response.status, 204);
    assert.equal(db.calls.length, 0);
  });

  await context.test("GET cannot list reports", async () => {
    const db = fakeDatabase();
    const response = await handleReportApi(
      reportRequest(undefined, { method: "GET" }),
      { DB: db, SITE_URL: origin },
    );
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "POST");
    assert.equal(db.calls.length, 0);
  });

  await context.test("a missing D1 binding returns an explicit service error", async () => {
    const response = await handleReportApi(reportRequest(), { SITE_URL: origin });
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "Report service is temporarily unavailable",
    });
  });

  await context.test("an exhausted fingerprint window returns 429", async () => {
    const db = fakeDatabase({ changes: 0 });
    const response = await handleReportApi(reportRequest(), {
      DB: db,
      SITE_URL: origin,
    });
    assert.equal(response.status, 429);
    assert.ok(Number(response.headers.get("retry-after")) >= 1);
    assert.equal(db.calls.length, 1);
  });

  await context.test("database failures remain private and return 503", async () => {
    const db = fakeDatabase({ error: new Error("no such table: content_reports") });
    const response = await handleReportApi(reportRequest(), {
      DB: db,
      SITE_URL: origin,
    });
    assert.equal(response.status, 503);
    assert.doesNotMatch(await response.text(), /no such table/u);
  });
});
