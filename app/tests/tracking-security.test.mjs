import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { siteLocales } from "../app/site-config.ts";

const root = path.resolve(import.meta.dirname, "..");
const productionOrigin = "https://aion2kina.com";
const indexedContentLocales = siteLocales;

async function loadBuiltWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "tracking-security-test",
    `${process.pid}-${Date.now()}-${Math.random()}`,
  );
  return (await import(workerUrl.href)).default;
}

function workerEnvironment(overrides = {}) {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
    SITE_URL: productionOrigin,
    ...overrides,
  };
}

function workerContext() {
  return {
    passThroughOnException() {},
    waitUntil() {},
  };
}

function base64Url(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
  return Buffer.from(bytes).toString("base64url");
}

async function authenticatedAdminFixture() {
  const authSecret = "admin-route-test-secret-that-is-at-least-thirty-two-bytes";
  const passwordHash = "a".repeat(64);
  const nowSeconds = Math.floor(Date.now() / 1_000);
  const nonce = base64Url(crypto.getRandomValues(new Uint8Array(16)));
  const payload = JSON.stringify({ exp: nowSeconds + 86_400, nonce, sub: "local-admin" });
  const payloadB64 = base64Url(payload);
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(authSecret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC", key,
    new TextEncoder().encode(`aion2kina-admin-session-v1\n${payloadB64}`),
  );
  return {
    env: {
      ADMIN_AUTH_SECRET: authSecret,
      ADMIN_PASSWORD_HASH: passwordHash,
    },
    token: `${payloadB64}.${base64Url(sig)}`,
  };
}

async function workerRequest(worker, pathname, { env = {}, headers = {}, method = "GET" } = {}) {
  return worker.fetch(
    new Request(`${productionOrigin}${pathname}`, {
      method,
      headers: { accept: "text/html", ...headers },
    }),
    workerEnvironment(env),
    workerContext(),
  );
}

function privateNoIndex(response, { requireCdnHeader = true } = {}) {
  assert.match(response.headers.get("cache-control") ?? "", /(?:^|[,; ])no-store(?:$|[,; ])/iu);
  if (requireCdnHeader) assert.equal(response.headers.get("cdn-cache-control"), "no-store");
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/iu);
  assert.match(response.headers.get("x-robots-tag") ?? "", /nofollow/iu);
}

function analyticsBootstrap(html) {
  const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/giu)]
    .map((match) => match[1])
    .find((source) => source.includes("window.aion2LoadGtm"));
  assert.ok(script, "rendered HTML must contain the consent bootstrap");
  return script;
}

function adminAuthFragmentBridge(html) {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/giu)]
    .map((match) => match[1]);
  const bridgeIndex = scripts.findIndex((source) =>
    source.includes("/admin/login/") &&
    source.includes("access_token") &&
    source.includes("error_code"));
  const analyticsIndex = scripts.findIndex((source) =>
    source.includes("window.aion2LoadGtm"));
  assert.notEqual(bridgeIndex, -1, "rendered HTML must contain the admin auth fragment bridge");
  assert.notEqual(analyticsIndex, -1, "rendered HTML must contain the consent bootstrap");
  assert.ok(
    bridgeIndex < analyticsIndex,
    "the admin auth fragment bridge must run before GA4 or GTM can initialize",
  );
  return scripts[bridgeIndex];
}

function runAnalyticsBootstrap(
  source,
  {
    choice,
    hash = "",
    hostname = "aion2kina.com",
    pathname,
    search = "?private=query",
    storageThrows = false,
    simulateBrowserEvents = false,
  },
) {
  const inserted = [];
  const listeners = new Map();
  const timers = [];
  let reloads = 0;
  let storedChoice = choice;
  const firstScript = {
    parentNode: {
      insertBefore(node) {
        inserted.push(node.src);
      },
    },
  };
  const sandbox = {
    dataLayer: [],
    document: {
      referrer: "https://search.example/?private=query",
      readyState: simulateBrowserEvents ? "loading" : undefined,
      createElement() {
        return { async: false, src: "" };
      },
      getElementsByTagName() {
        return [firstScript];
      },
      head: {
        appendChild(node) {
          inserted.push(node.src);
        },
      },
    },
    localStorage: {
      getItem(key) {
        assert.equal(key, "aion2-analytics-consent-v2");
        if (storageThrows) throw new Error("Storage is blocked");
        return storedChoice;
      },
      setItem(key, value) {
        assert.equal(key, "aion2-analytics-consent-v2");
        if (storageThrows) throw new Error("Storage is blocked");
        storedChoice = value;
      },
    },
    location: {
      hash,
      hostname,
      href: `${productionOrigin}${pathname}${search}${hash}`,
      origin: productionOrigin,
      pathname,
      protocol: "https:",
      search,
      reload() {
        reloads += 1;
      },
    },
  };
  if (simulateBrowserEvents) {
    sandbox.addEventListener = (type, listener) => {
      const registered = listeners.get(type) ?? [];
      registered.push(listener);
      listeners.set(type, registered);
    };
    sandbox.setTimeout = (callback, delay) => {
      timers.push({ callback, delay });
      return timers.length;
    };
  }
  sandbox.window = sandbox;
  vm.runInNewContext(source, sandbox, { timeout: 1_000 });
  return {
    commands: sandbox.dataLayer.map((entry) => Array.from(entry)),
    inserted,
    loadGtmAgain: () => sandbox.aion2LoadGtm(),
    loadGtmWithConsent: () => sandbox.aion2LoadGtm(true),
    fire: (type) => {
      for (const listener of listeners.get(type) ?? []) listener();
    },
    runTimers: () => {
      for (const timer of timers.splice(0)) timer.callback();
    },
    scheduledDelays: () => timers.map((timer) => timer.delay),
    resetAfterDenial: () => sandbox.aion2ResetAnalyticsAfterDenial(),
    reloadCount: () => reloads,
  };
}

function runAdminAuthSecurityBootstraps(
  bridgeSource,
  analyticsSource,
  {
    choice = "granted",
    hash = "",
    pathname = "/en/",
    search = "?private=query",
  } = {},
) {
  const inserted = [];
  const replacements = [];
  const historyReplacements = [];
  const firstScript = {
    parentNode: {
      insertBefore(node) {
        inserted.push(node.src);
      },
    },
  };
  const sandbox = {
    URLSearchParams,
    dataLayer: [],
    document: {
      cookie: "",
      referrer: "https://search.example/?private=query#private-fragment",
      createElement() {
        return { async: false, src: "" };
      },
      getElementsByTagName() {
        return [firstScript];
      },
      head: {
        appendChild(node) {
          inserted.push(node.src);
        },
      },
    },
    history: {
      state: null,
      replaceState(state, _title, url) {
        historyReplacements.push(url);
        this.state = state;
      },
    },
    localStorage: {
      getItem(key) {
        assert.equal(key, "aion2-analytics-consent-v2");
        return choice;
      },
      setItem() {},
    },
    location: {
      hash,
      href: `${productionOrigin}${pathname}${search}${hash}`,
      hostname: "aion2kina.com",
      origin: productionOrigin,
      pathname,
      protocol: "https:",
      search,
      reload() {},
      replace(url) {
        replacements.push(url);
      },
    },
  };
  sandbox.window = sandbox;

  vm.runInNewContext(bridgeSource, sandbox, { timeout: 1_000 });
  vm.runInNewContext(analyticsSource, sandbox, { timeout: 1_000 });

  return {
    commands: sandbox.dataLayer.map((entry) => Array.from(entry)),
    historyReplacements,
    inserted,
    replacements,
  };
}

test("admin auth fragments are routed to the private login before analytics starts", async () => {
  const worker = await loadBuiltWorker();
  const response = await workerRequest(worker, "/en/");
  assert.equal(response.status, 200);
  const html = await response.text();
  const bridge = adminAuthFragmentBridge(html);
  const analytics = analyticsBootstrap(html);

  const expiredHash = "#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired&sb=";
  const expired = runAdminAuthSecurityBootstraps(bridge, analytics, {
    hash: expiredHash,
    pathname: "/en/",
  });
  assert.deepEqual(
    expired.replacements,
    ["/admin/login/#error=access_denied&error_code=otp_expired"],
  );
  assert.deepEqual(expired.inserted, [], "an auth error callback must not load GA4 or GTM");
  assert.equal(expired.commands.some((command) => command[0] === "config"), false);
  assert.doesNotMatch(
    JSON.stringify({ commands: expired.commands, redirects: expired.replacements }),
    /error_description|Email\+link|sb=/u,
    "provider error details and auxiliary parameters must be discarded before redirecting",
  );

  const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkbWluIn0.eyJhdWQiOiJhdXRoZW50aWNhdGVkIn0.c2lnbmF0dXJl";
  const successHash = `#access_token=${accessToken}&expires_in=3600&refresh_token=must-not-forward&token_type=bearer&type=magiclink`;
  const success = runAdminAuthSecurityBootstraps(bridge, analytics, {
    hash: successHash,
    pathname: "/zh-hant/",
  });
  assert.deepEqual(
    success.replacements,
    [`/admin/login/#access_token=${accessToken}&token_type=bearer&type=magiclink`],
  );
  assert.deepEqual(success.inserted, [], "a successful auth callback must not load GA4 or GTM");
  assert.equal(success.commands.some((command) => command[0] === "config"), false);
  assert.doesNotMatch(
    JSON.stringify({ commands: success.commands, inserted: success.inserted }),
    /access_token|refresh_token|must-not-forward|c2lnbmF0dXJl/u,
    "authentication credentials must never enter analytics payloads",
  );
  assert.doesNotMatch(
    success.replacements[0],
    /refresh_token|must-not-forward|expires_in/u,
    "only the access token, token type, and callback type may cross the private redirect",
  );

  const ordinaryAnchor = runAdminAuthSecurityBootstraps(bridge, analytics, {
    hash: "#article",
    pathname: "/en/guides/",
    search: "?page=2",
  });
  assert.deepEqual(ordinaryAnchor.replacements, []);
  const ordinaryPageFields = ordinaryAnchor.commands.find(
    (command) => command[0] === "set" && typeof command[1] === "object",
  );
  assert.ok(ordinaryPageFields, "ordinary page anchors must preserve normal analytics fields");
  assert.equal(ordinaryPageFields[1].page_location, `${productionOrigin}/en/guides/?page=2`);
  assert.doesNotMatch(ordinaryPageFields[1].page_location, /#/u);

  const alreadyPrivate = runAdminAuthSecurityBootstraps(bridge, analytics, {
    hash: expiredHash,
    pathname: "/admin/login/",
    search: "",
  });
  assert.deepEqual(alreadyPrivate.replacements, []);
  assert.deepEqual(alreadyPrivate.inserted, []);
  assert.equal(alreadyPrivate.commands.some((command) => command[0] === "config"), false);
});

test("direct GA4 loads gtag.js eagerly and defers GTM while explicit rejection disables both", async () => {
  const worker = await loadBuiltWorker();
  const response = await workerRequest(worker, "/en/");
  assert.equal(response.status, 200);
  const html = await response.text();
  const bootstrap = analyticsBootstrap(html);

  assert.equal(
    (html.match(/<script[^>]+src="https:\/\/www\.googletagmanager\.com\/(?:gtag\/js|gtm\.js)[^"]*"/giu) ?? []).length,
    0,
    "the server response must not eagerly load Google scripts",
  );

  const undecided = runAnalyticsBootstrap(bootstrap, {
    choice: null,
    pathname: "/en/",
    simulateBrowserEvents: true,
  });
  assert.deepEqual(
    undecided.inserted,
    ["https://www.googletagmanager.com/gtag/js?id=G-XDH0X1HZR2"],
    "gtag.js must load immediately when consent defaults to granted; GTM stays deferred",
  );
  assert.equal(undecided.commands[0][0], "consent");
  assert.equal(undecided.commands[0][1], "default");
  assert.equal(undecided.commands[0][2].analytics_storage, "granted");
  assert.equal(undecided.commands[0][2].ad_storage, "denied");
  const basicPageFields = undecided.commands.find(
    (command) => command[0] === "set" && typeof command[1] === "object",
  );
  assert.ok(basicPageFields);
  assert.equal(basicPageFields[1].page_location, `${productionOrigin}/en/?private=query`);
  assert.equal(basicPageFields[1].page_referrer, "https://search.example/?private=query");
  const undecidedGa4Config = undecided.commands.filter(
    (command) => command[0] === "config" && command[1] === "G-XDH0X1HZR2",
  );
  assert.equal(undecidedGa4Config.length, 1);
  assert.equal(undecidedGa4Config[0][2].send_page_view, false);
  undecided.fire("pointerdown");
  assert.deepEqual(undecided.inserted, [
    "https://www.googletagmanager.com/gtag/js?id=G-XDH0X1HZR2",
    "https://www.googletagmanager.com/gtm.js?id=GTM-KGNX3NXL",
  ]);
  undecided.loadGtmAgain();
  assert.equal(undecided.inserted.length, 2, "gtag.js loaded eagerly; GTM must each load once");
  assert.equal(
    undecided.commands.filter(
      (command) => command[0] === "config" && command[1] === "G-XDH0X1HZR2",
    ).length,
    1,
    "the direct GA4 config must remain idempotent",
  );
  undecided.resetAfterDenial();
  assert.equal(undecided.reloadCount(), 1, "denial reloads a document that already loaded GTM");

  const denied = runAnalyticsBootstrap(bootstrap, {
    choice: "denied",
    pathname: "/en/",
    simulateBrowserEvents: true,
  });
  assert.equal(denied.inserted.length, 0);
  assert.equal(denied.commands[0][2].analytics_storage, "denied");
  assert.equal(denied.commands.some((command) => command[0] === "config"), false);
  assert.equal(
    denied.inserted.some((url) => url.includes("/gtm.js?id=")),
    false,
    "explicit rejection must keep GTM blocked",
  );

  const invalidChoice = runAnalyticsBootstrap(bootstrap, {
    choice: "legacy-or-invalid",
    pathname: "/en/",
    simulateBrowserEvents: true,
  });
  assert.equal(invalidChoice.commands[0][2].analytics_storage, "granted");
  assert.equal(
    invalidChoice.inserted.filter((url) => url.includes("/gtag/js?id=")).length,
    1,
    "unknown stored values fall back to granted and load gtag.js eagerly",
  );
  assert.equal(
    invalidChoice.commands.filter(
      (command) => command[0] === "config" && command[1] === "G-XDH0X1HZR2",
    ).length,
    1,
  );
  invalidChoice.fire("keydown");
  assert.equal(invalidChoice.inserted.length, 2);
  assert.equal(
    invalidChoice.inserted.some((url) => url.includes("/gtm.js?id=")),
    true,
    "unknown stored values fall back to the default detailed setting",
  );

  const granted = runAnalyticsBootstrap(bootstrap, {
    choice: "granted",
    pathname: "/en/guides/",
    simulateBrowserEvents: true,
  });
  assert.deepEqual(
    granted.inserted,
    ["https://www.googletagmanager.com/gtag/js?id=G-XDH0X1HZR2"],
    "gtag.js must load immediately when consent is explicitly granted",
  );
  granted.loadGtmAgain();
  assert.equal(
    granted.inserted.filter((url) => url === "https://www.googletagmanager.com/gtm.js?id=GTM-KGNX3NXL").length,
    1,
  );
  assert.equal(
    granted.inserted.filter((url) => url === "https://www.googletagmanager.com/gtag/js?id=G-XDH0X1HZR2").length,
    1,
  );
  assert.equal(
    granted.commands.filter(
      (command) => command[0] === "config" && command[1] === "G-XDH0X1HZR2",
    ).length,
    1,
  );
  const grantedPageFields = granted.commands.find(
    (command) => command[0] === "set" && typeof command[1] === "object",
  );
  assert.equal(grantedPageFields[1].page_location, `${productionOrigin}/en/guides/?private=query`);
  assert.equal(grantedPageFields[1].page_referrer, "https://search.example/?private=query");
  granted.loadGtmAgain();
  assert.equal(granted.inserted.length, 2, "both loaders must remain idempotent");
  assert.equal(granted.commands.filter((command) => command[0] === "config").length, 1);
  granted.resetAfterDenial();
  assert.equal(granted.reloadCount(), 1, "withdrawing consent reloads a document that loaded GTM");

  const blockedStorage = runAnalyticsBootstrap(bootstrap, {
    choice: "granted",
    pathname: "/en/",
    storageThrows: true,
    simulateBrowserEvents: true,
  });
  assert.equal(
    blockedStorage.inserted.filter((url) => url.includes("/gtag/js?id=")).length,
    1,
    "blocked storage must still load gtag.js eagerly when consent defaults to granted",
  );
  assert.equal(blockedStorage.commands[0][2].analytics_storage, "granted");
  assert.equal(
    blockedStorage.commands.filter(
      (command) => command[0] === "config" && command[1] === "G-XDH0X1HZR2",
    ).length,
    1,
    "the in-memory detailed setting must still queue the direct GA4 config",
  );
  blockedStorage.loadGtmWithConsent();
  assert.equal(blockedStorage.inserted.length, 2);
  assert.equal(
    blockedStorage.inserted.filter((url) =>
      url === "https://www.googletagmanager.com/gtm.js?id=GTM-KGNX3NXL").length,
    1,
    "an explicit in-memory grant must work when localStorage is blocked",
  );

  const delayedBlockedStorage = runAnalyticsBootstrap(bootstrap, {
    choice: "granted",
    pathname: "/en/",
    storageThrows: true,
    simulateBrowserEvents: true,
  });
  assert.equal(
    delayedBlockedStorage.inserted.filter((url) => url.includes("/gtag/js?id=")).length,
    1,
    "gtag.js must load eagerly even when storage is blocked",
  );
  delayedBlockedStorage.fire("load");
  assert.deepEqual(delayedBlockedStorage.scheduledDelays(), [5_000]);
  assert.equal(
    delayedBlockedStorage.inserted.filter((url) => url.includes("/gtag/js?id=")).length,
    1,
    "gtag.js must not be loaded twice",
  );
  delayedBlockedStorage.runTimers();
  assert.equal(
    delayedBlockedStorage.inserted.filter((url) =>
      url === "https://www.googletagmanager.com/gtm.js?id=GTM-KGNX3NXL").length,
    1,
    "the delayed loader must start GTM exactly once",
  );

  const interactionStart = runAnalyticsBootstrap(bootstrap, {
    choice: "granted",
    pathname: "/en/",
    simulateBrowserEvents: true,
  });
  assert.equal(
    interactionStart.inserted.filter((url) => url.includes("/gtag/js?id=")).length,
    1,
    "gtag.js must load eagerly when consent is granted",
  );
  interactionStart.fire("pointerdown");
  assert.equal(interactionStart.inserted.length, 2, "the first interaction must start GTM");
  interactionStart.fire("keydown");
  interactionStart.fire("load");
  interactionStart.runTimers();
  assert.equal(interactionStart.inserted.length, 2, "all delayed triggers must remain idempotent");

  const delayedDenied = runAnalyticsBootstrap(bootstrap, {
    choice: "denied",
    pathname: "/en/",
    simulateBrowserEvents: true,
  });
  delayedDenied.fire("pointerdown");
  delayedDenied.fire("load");
  delayedDenied.runTimers();
  assert.equal(delayedDenied.inserted.length, 0, "explicit rejection must not schedule GTM");

  const admin = runAnalyticsBootstrap(bootstrap, {
    choice: "granted",
    pathname: "/admin/",
  });
  assert.deepEqual(admin.inserted, []);
  assert.equal(admin.commands.some((command) => command[0] === "config"), false);

  for (const hostname of ["localhost", "127.0.0.1", "preview.example.com"]) {
    const nonProduction = runAnalyticsBootstrap(bootstrap, {
      choice: "granted",
      hostname,
      pathname: "/en/",
    });
    assert.deepEqual(
      nonProduction.inserted,
      [],
      `${hostname} must not load GA4 or GTM`,
    );
    assert.equal(
      nonProduction.commands.some((command) => command[0] === "config"),
      false,
      `${hostname} must not configure GA4`,
    );
  }
});

test("trackEvent cannot send Google or first-party journey events from admin", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());

  const previousWindow = globalThis.window;
  const previousCustomEvent = globalThis.CustomEvent;
  const googleCalls = [];
  const fetchCalls = [];
  globalThis.CustomEvent = class CustomEvent {
    constructor(type, init) {
      this.type = type;
      this.detail = init?.detail;
    }
  };
  globalThis.window = {
    dataLayer: [],
    dispatchEvent() {},
    fetch(...args) {
      fetchCalls.push(args);
      return Promise.resolve(new Response(null, { status: 204 }));
    },
    gtag(...args) {
      googleCalls.push(args);
    },
    localStorage: { getItem: () => "granted" },
    location: { hostname: "aion2kina.com", pathname: "/admin/", search: "" },
    navigator: { sendBeacon: () => false },
    sessionStorage: { getItem: () => null, setItem() {} },
  };

  try {
    const analytics = await vite.ssrLoadModule("/app/analytics.ts");
    analytics.trackEvent("guide_click", {
      locale: "en",
      surface: "admin-dashboard",
    });
    assert.deepEqual(googleCalls, []);
    assert.deepEqual(globalThis.window.dataLayer, []);
    assert.deepEqual(fetchCalls, []);
  } finally {
    globalThis.window = previousWindow;
    globalThis.CustomEvent = previousCustomEvent;
  }
});

test("analytics events and page views stay silent outside the production domain", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());

  const previousWindow = globalThis.window;
  const previousCustomEvent = globalThis.CustomEvent;
  const dispatched = [];
  const googleCalls = [];
  const fetchCalls = [];
  globalThis.CustomEvent = class CustomEvent {
    constructor(type, init) {
      this.type = type;
      this.detail = init?.detail;
    }
  };

  try {
    const analytics = await vite.ssrLoadModule("/app/analytics.ts");
    for (const hostname of ["localhost", "127.0.0.1", "preview.example.com"]) {
      globalThis.window = {
        dataLayer: [],
        dispatchEvent(event) {
          dispatched.push(event);
        },
        fetch(...args) {
          fetchCalls.push(args);
          return Promise.resolve(new Response(null, { status: 204 }));
        },
        gtag(...args) {
          googleCalls.push(args);
        },
        localStorage: { getItem: () => "granted" },
        location: { hostname, pathname: "/en/", search: "?private=query" },
        navigator: { sendBeacon: () => false },
        sessionStorage: { getItem: () => null, setItem() {} },
      };
      analytics.trackEvent("guide_click", { locale: "en" });
      analytics.trackPageView({
        page_location: `http://${hostname}/en/?private=query`,
        page_referrer: "",
        page_title: "AION2 KINA",
      });
      assert.deepEqual(globalThis.window.dataLayer, []);
    }
    assert.deepEqual(dispatched, []);
    assert.deepEqual(googleCalls, []);
    assert.deepEqual(fetchCalls, []);
  } finally {
    globalThis.window = previousWindow;
    globalThis.CustomEvent = previousCustomEvent;
  }
});

test("trackEvent sends approved custom events during the default detailed setting", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());

  const previousWindow = globalThis.window;
  const previousCustomEvent = globalThis.CustomEvent;
  const dispatched = [];
  const googleCalls = [];
  const fetchCalls = [];
  globalThis.CustomEvent = class CustomEvent {
    constructor(type, init) {
      this.type = type;
      this.detail = init?.detail;
    }
  };
  globalThis.window = {
    dataLayer: [],
    dispatchEvent(event) {
      dispatched.push(event);
    },
    fetch(...args) {
      fetchCalls.push(args);
      return Promise.resolve(new Response(null, { status: 204 }));
    },
    gtag(...args) {
      googleCalls.push(args);
    },
    localStorage: { getItem: () => null },
    location: { hostname: "aion2kina.com", pathname: "/en/", search: "?private=query" },
    navigator: { sendBeacon: () => false },
    sessionStorage: { getItem: () => null, setItem() {} },
  };

  try {
    const analytics = await vite.ssrLoadModule("/app/analytics.ts");
    analytics.trackEvent("guide_click", {
      locale: "en",
      surface: "content-hub",
      target_kind: "content",
      target_key: "guides/example",
    });
    assert.equal(dispatched.length, 1, "a local DOM event may still support same-page UI");
    assert.deepEqual(googleCalls, [["event", "guide_click", {
      locale: "en",
      surface: "content-hub",
      target_kind: "content",
      target_key: "guides/example",
    }]]);
    assert.deepEqual(globalThis.window.dataLayer, []);
    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0][0], "/api/events");

    analytics.trackPageView({
      page_location: "https://aion2kina.com/en/?private=query",
      page_referrer: "https://www.google.com/",
      page_title: "AION2 KINA",
    });
    analytics.trackPageView({
      page_location: "https://aion2kina.com/en/?private=query",
      page_referrer: "https://www.google.com/",
      page_title: "AION2 KINA",
    });
    assert.equal(
      googleCalls.filter(
        (call) => call[0] === "event" && call[1] === "page_view",
      ).length,
      1,
      "the same initial or SPA page view must be emitted exactly once",
    );
  } finally {
    globalThis.window = previousWindow;
    globalThis.CustomEvent = previousCustomEvent;
  }
});

test("admin documents and APIs are private, uncached, and excluded from discovery", async () => {
  const worker = await loadBuiltWorker();
  const [adminRedirect, adminPage, adminLoginRedirect, adminLogin, adminApi, adminApiRoot, robots, sitemapIndex] = await Promise.all([
    workerRequest(worker, "/admin"),
    workerRequest(worker, "/admin/"),
    workerRequest(worker, "/admin/login"),
    workerRequest(worker, "/admin/login/"),
    workerRequest(worker, "/api/admin/dashboard", { headers: { accept: "application/json" } }),
    workerRequest(worker, "/api/admin", { headers: { accept: "application/json" } }),
    workerRequest(worker, "/robots.txt"),
    workerRequest(worker, "/sitemap.xml"),
  ]);

  assert.equal(adminRedirect.status, 308);
  assert.equal(adminRedirect.headers.get("location"), "/admin/");
  privateNoIndex(adminRedirect);
  assert.equal(adminPage.status, 503);
  privateNoIndex(adminPage);
  assert.equal(adminLoginRedirect.status, 308);
  assert.equal(adminLoginRedirect.headers.get("location"), "/admin/login/");
  privateNoIndex(adminLoginRedirect);
  assert.equal(adminLogin.status, 200);
  privateNoIndex(adminLogin);
  const loginHtml = await adminLogin.text();
  assert.match(loginHtml, /管理员安全登录|ADMIN ACCESS/u);
  assert.match(loginHtml, /密码|password|登录|login/iu);
  assert.doesNotMatch(loginHtml, /(?:[A-Z0-9._%+-]+@|gmail|outlook|hotmail|yahoo)/iu);
  assert.match(loginHtml, /src="\/aion2-logo\.webp"/u);
  assert.doesNotMatch(
    loginHtml,
    /\/_vinext\/image\?[^"']*(?:aion2-logo\.webp|%2Faion2-logo\.webp)/iu,
    "the admin brand must use the original logo instead of an image optimization URL",
  );
  assert.equal(adminApi.status, 503);
  privateNoIndex(adminApi);

  assert.equal(adminApiRoot.status, 404);
  privateNoIndex(adminApiRoot);

  const robotsText = await robots.text();
  assert.match(robotsText, /^Disallow: \/admin(?:\/)?$/mu);
  assert.match(robotsText, /^Disallow: \/api\/admin(?:\/)?$/mu);

  const indexText = await sitemapIndex.text();
  assert.doesNotMatch(indexText, /\/admin(?:\/|<)/iu);
  const childLocations = [...indexText.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => match[1]);
  assert.equal(
    childLocations.length,
    siteLocales.length * 2 + indexedContentLocales.length,
  );
  for (const location of childLocations) {
    const child = await worker.fetch(
      new Request(location),
      workerEnvironment(),
      workerContext(),
    );
    assert.equal(child.status, 200);
    const xml = await child.text();
    assert.doesNotMatch(xml, /\/admin(?:\/|<)/iu);
    assert.doesNotMatch(xml, /\/api\/admin(?:\/|<)/iu);
  }
});

test("public HTML responses carry production browser security headers", async () => {
  const worker = await loadBuiltWorker();
  const response = await workerRequest(worker, "/en/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /text\/html/iu,
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  );
  assert.equal(
    response.headers.get("strict-transport-security"),
    "max-age=31536000; includeSubDomains",
  );
  assert.equal(
    response.headers.get("content-security-policy"),
    null,
    "do not add CSP until the inline bootstrap and GTM policy is nonce-ready",
  );
});

test("authenticated admin root renders without a trailing-slash redirect loop", async () => {
  const worker = await loadBuiltWorker();
  const fixture = await authenticatedAdminFixture();

  const canonicalRedirect = await workerRequest(worker, "/admin", {
    env: fixture.env,
    headers: { cookie: `__Host-aion2-admin-session=${fixture.token}` },
  });
  assert.equal(canonicalRedirect.status, 308);
  assert.equal(canonicalRedirect.headers.get("location"), "/admin/");

  const response = await workerRequest(worker, "/admin/", {
    env: fixture.env,
    headers: { cookie: `__Host-aion2-admin-session=${fixture.token}` },
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  privateNoIndex(response);
  assert.match(await response.text(), /管理中心|ADMIN CONSOLE/u);
});

test("journey collect and delete security handlers are wired into the Worker", async () => {
  const worker = await loadBuiltWorker();
  for (const pathname of [
    "/api/journey-events/collect",
    "/api/journey-events/delete",
  ]) {
    const response = await workerRequest(worker, pathname, {
      headers: { accept: "application/json" },
    });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "POST");
    privateNoIndex(response, { requireCdnHeader: false });
  }

  const crossOrigin = await workerRequest(worker, "/api/journey-events/collect", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      cookie: "aion2_analytics_consent=granted-v2",
      origin: "https://attacker.example",
      "sec-fetch-site": "cross-site",
    },
  });
  assert.equal(crossOrigin.status, 403);
  privateNoIndex(crossOrigin, { requireCdnHeader: false });

  const source = await readFile(
    path.join(root, "worker", "journey-event-api.ts"),
    "utf8",
  );
  assert.match(source, /JOURNEY_RETENTION_MS\s*=\s*30\s*\*\s*24\s*\*\s*60\s*\*\s*60\s*\*\s*1_000/u);
  assert.match(source, /createHmacSigner/u);
  assert.match(source, /encryptAnalyticsIp/u);
  assert.match(source, /ip_ciphertext/u);
  assert.doesNotMatch(source, /\bip_address\b/u);
  assert.doesNotMatch(source, /insert into analytics_journey_events[\s\S]*user_agent/iu);
  assert.doesNotMatch(source, /insert into analytics_journey_events[\s\S]*referrer/iu);
});
