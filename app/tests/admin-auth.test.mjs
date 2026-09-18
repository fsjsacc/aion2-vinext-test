import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const siteOrigin = "https://aion2kina.com";
const adminPassword = "test-admin-password-2026";

async function sha256Hex(input) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function base64Url(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
  return Buffer.from(bytes).toString("base64url").replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function fakeRateLimitDb(initialCount = 0) {
  let count = initialCount;
  const makeStatement = () => ({
    bind(...bindings) { this._bindings = bindings; return this; },
    async run() { count++; return { success: true, meta: { changes: 1 } }; },
    async first() { return null; },
  });
  return {
    prepare(_sql) { return makeStatement(); },
    get callCount() { return count; },
  };
}

function adminEnv(overrides = {}) {
  return {
    ADMIN_AUTH_SECRET: "admin-auth-test-secret-that-is-at-least-thirty-two-bytes-long",
    ADMIN_PASSWORD_HASH: undefined,
    DB: fakeRateLimitDb(),
    ...overrides,
  };
}

function assertPrivateNoIndex(response) {
  assert.match(response.headers.get("cache-control") ?? "", /private|no-store|no-cache/u);
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/u);
}

async function loadAuth() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  const auth = await vite.ssrLoadModule("/worker/admin-auth.ts");
  await vite.close();
  return auth;
}

// ─── Tests ──────────────────────────────────────────────────────────

test("admin password auth helper is fail-closed and server-only", async (context) => {
  const auth = await loadAuth();
  const passwordHash = await sha256Hex(adminPassword);
  const configuredEnv = {
    ...adminEnv({ ADMIN_PASSWORD_HASH: passwordHash }),
    SITE_URL: siteOrigin,
  };
  const now = 1_800_000_000_000;

  await context.test("source has no Supabase privileged-key dependency", async () => {
    const source = await fs.readFile(path.join(root, "worker", "admin-auth.ts"), "utf8");
    assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY/u);
    assert.doesNotMatch(source, /SUPABASE_JWKS_URL/u);
    assert.doesNotMatch(source, /supabase\.co\/auth/u);
  });

  await context.test("admin login source never exposes the password or its hash", async () => {
    const source = await fs.readFile(path.join(root, "worker", "admin-auth.ts"), "utf8");
    assert.doesNotMatch(source, /ADMIN_PASSWORD_HASH.*=.*["'][0-9a-f]{64}/u);
  });

  await context.test("missing configuration returns 503 before authentication", async () => {
    const result = await auth.authorizeAdminRequest(
      new Request(`${siteOrigin}/api/admin/reports`),
      { ADMIN_AUTH_SECRET: "", ADMIN_PASSWORD_HASH: "", DB: fakeRateLimitDb() },
      { now: () => now },
    );
    assert.equal(result.ok, false);
    assert.equal(result.response.status, 503);
    assertPrivateNoIndex(result.response);
  });

  await context.test("missing sessions return 401 and admin pages redirect to login", async () => {
    const apiResult = await auth.authorizeAdminRequest(
      new Request(`${siteOrigin}/api/admin/reports`, { headers: { accept: "application/json" } }),
      configuredEnv,
      { now: () => now },
    );
    assert.equal(apiResult.ok, false);
    assert.equal(apiResult.response.status, 401);

    const pageResult = await auth.requireAdminPage(
      new Request(`${siteOrigin}/admin/`),
      configuredEnv,
      { now: () => now },
    );
    assert.equal(pageResult.status, 302);
    assert.match(pageResult.headers.get("location") ?? "", /\/admin\/login/);
  });

  await context.test("password login requires POST and enforces method", async () => {
    const getResponse = await auth.handleAdminAuthRequest(
      new Request(`${siteOrigin}/api/admin/auth/password/login`),
      configuredEnv,
    );
    assert.equal(getResponse.status, 405);
  });

  await context.test("correct password returns session cookie", async () => {
    const response = await auth.handleAdminAuthRequest(
      new Request(`${siteOrigin}/api/admin/auth/password/login`, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      }),
      configuredEnv,
      { now: () => now },
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.ok, true);
    const setCookies = response.headers.getSetCookie?.() ?? [];
    const sessionCookie = setCookies.find((c) => c.includes("__Host-aion2-admin-session="));
    assert.ok(sessionCookie, "session cookie must be set");
    const token = sessionCookie.match(/__Host-aion2-admin-session=([^;]+)/)[1];
    assert.match(token, /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
  });

  await context.test("wrong password returns 401 without session cookie", async () => {
    const response = await auth.handleAdminAuthRequest(
      new Request(`${siteOrigin}/api/admin/auth/password/login`, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ password: "wrong-password" }),
      }),
      configuredEnv,
      { now: () => now },
    );
    assert.equal(response.status, 401);
    const body = await response.json();
    assert.equal(body.error, "Invalid credentials.");
    const setCookies = response.headers.getSetCookie?.() ?? [];
    const sessionCookie = setCookies.find((c) => c.includes("__Host-aion2-admin-session="));
    assert.equal(sessionCookie, undefined);
  });

  await context.test("authenticated session grants access to admin API", async () => {
    const loginResponse = await auth.handleAdminAuthRequest(
      new Request(`${siteOrigin}/api/admin/auth/password/login`, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      }),
      configuredEnv,
      { now: () => now },
    );
    const setCookies = loginResponse.headers.getSetCookie?.() ?? [];
    const sessionCookie = setCookies.find((c) => c.includes("__Host-aion2-admin-session="));
    assert.ok(sessionCookie, "login must provide session token");
    const token = sessionCookie.match(/__Host-aion2-admin-session=([^;]+)/)[1];

    const result = await auth.authorizeAdminRequest(
      new Request(`${siteOrigin}/api/admin/dashboard`, {
        headers: { cookie: `__Host-aion2-admin-session=${token}` },
      }),
      configuredEnv,
      { now: () => now },
    );
    assert.equal(result.ok, true);
    assert.equal(result.user.email, "admin@local");
  });

  await context.test("expired session is rejected", async () => {
    const authSecret = configuredEnv.ADMIN_AUTH_SECRET;
    const expiredPayload = JSON.stringify({ exp: 1_000_000_000, nonce: "expired-test-nonce", sub: "local-admin" });
    const payloadB64 = base64Url(expiredPayload);
    const key = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(authSecret),
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
    );
    const sig = await crypto.subtle.sign(
      "HMAC", key,
      new TextEncoder().encode(`aion2kina-admin-session-v1\n${payloadB64}`),
    );
    const expiredToken = `${payloadB64}.${base64Url(sig)}`;

    const result = await auth.authorizeAdminRequest(
      new Request(`${siteOrigin}/api/admin/dashboard`, {
        headers: { cookie: `__Host-aion2-admin-session=${expiredToken}` },
      }),
      configuredEnv,
      { now: () => now },
    );
    assert.equal(result.ok, false);
    assert.equal(result.response.status, 401);
  });

  await context.test("sign-out clears session cookie", async () => {
    const response = await auth.handleAdminAuthRequest(
      new Request(`${siteOrigin}/api/admin/auth/signout`, { method: "POST" }),
      configuredEnv,
    );
    assert.equal(response.status, 204);
    const setCookies = response.headers.getSetCookie?.() ?? [];
    const clearCookie = setCookies.find((c) => c.includes("__Host-aion2-admin-session="));
    assert.ok(clearCookie, "sign-out must clear the session cookie");
    assert.match(clearCookie, /Max-Age=0/);
  });

  await context.test("safe return paths never leave the admin surface", async () => {
    assert.equal(auth.safeAdminReturnTo("/admin/reports?page=2"), "/admin/reports?page=2");
    assert.equal(auth.safeAdminReturnTo("/admin"), "/admin/");
    assert.equal(auth.safeAdminReturnTo(null), "/admin/");
    assert.equal(auth.safeAdminReturnTo("https://evil.example/admin/"), "/admin/");
    assert.equal(auth.safeAdminReturnTo("//evil.example/admin/"), "/admin/");
    assert.equal(auth.safeAdminReturnTo("/guides/"), "/admin/");
  });

  await context.test("retired and unknown authentication routes are private 404s", async () => {
    for (const pathName of [
      "/api/admin/auth/email/start",
      "/api/admin/auth/email/verify",
      "/api/admin/auth/callback",
      "/api/admin/auth/unknown",
    ]) {
      const response = await auth.handleAdminAuthRequest(
        new Request(`${siteOrigin}${pathName}`, { headers: { accept: "application/json" } }),
        configuredEnv,
      );
      assert.equal(response.status, 404, `${pathName} should be 404`);
      assertPrivateNoIndex(response);
    }
  });

  await context.test("X-Aion2-Admin-Key header bypasses cookie auth", async () => {
    const apiKey = "test-api-key-for-unified-cms";
    const result = await auth.authorizeAdminRequest(
      new Request(`${siteOrigin}/api/admin/dashboard`, {
        headers: { "x-aion2-admin-key": apiKey },
      }),
      { ...configuredEnv, ADMIN_API_KEY: apiKey },
    );
    assert.equal(result.ok, true);
    assert.equal(result.user.email, "admin@keys");
  });
});

test("rate limiting uses D1 database for login attempts", async () => {
  const auth = await loadAuth();
  const passwordHash = await sha256Hex(adminPassword);
  const db = fakeRateLimitDb();
  const env = {
    ADMIN_AUTH_SECRET: "admin-auth-test-secret-that-is-at-least-thirty-two-bytes-long",
    ADMIN_PASSWORD_HASH: passwordHash,
    DB: db,
  };

  await auth.handleAdminAuthRequest(
    new Request(`${siteOrigin}/api/admin/auth/password/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: adminPassword }),
    }),
    env,
  );
  assert.ok(db.callCount > 0, "rate limiting should call the database");
});
