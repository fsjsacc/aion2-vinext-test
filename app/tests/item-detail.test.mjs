import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

const officialFixture = {
  id: 110120001,
  name: "Noble Dragon Lord Greatsword",
  desc: "<desc_point>Official description</desc_point>\nSecond line",
  grade: "Epic",
  gradeName: "Heroic",
  icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/item.png",
  level: 108,
  equipLevel: 45,
  enchantLevel: 0,
  storable: true,
  tradable: true,
  tradablePersonal: true,
  enchantable: true,
  decomposable: true,
  maxEnchantLevel: 20,
  maxExceedEnchantLevel: 5,
  raceName: "Elyos",
  classNames: ["Gladiator"],
  categoryName: "Greatsword",
  type: "Equip",
  magicStoneSlotCount: 5,
  godStoneSlotCount: 1,
  subStatCount: 6,
  mainStats: [{
    id: "WeaponFixingDamage",
    name: "Attack",
    minValue: "463",
    value: "627",
    extra: "0",
    exceed: false,
  }],
  subStats: [{
    id: "STR",
    name: "Power",
    minValue: "81",
    value: "100",
  }],
  sources: ["Crafting"],
};

function catalogResponse(items) {
  return {
    release: {
      versionKey: `sha256-${"a".repeat(64)}`,
      snapshotDate: "2026-07-19",
      retrievedAt: "2026-07-19T00:00:00.000Z",
      digest: `sha256-${"b".repeat(64)}`,
    },
    items,
    pagination: {
      page: 1,
      pageSize: 1,
      total: items.length,
      lastPage: 1,
    },
  };
}

const summaryRow = {
  id: "110120001",
  name: "Noble Dragon Lord Greatsword",
  imageUrl: officialFixture.icon,
  gradeCode: "Epic",
  gradeName: "Heroic",
  categoryCode: "Greatsword",
  categoryName: "Greatsword",
  optionLines: ["Attack 463 ~ 627"],
  classIds: ["gladiator"],
  tradable: true,
  officialUrl: "https://example.com",
  detailSlug: null,
};

test("official item details are normalized, bounded, and rendered as plain text", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const officialModule = await vite.ssrLoadModule("/app/official-item-detail.ts");
    const summaryModule = await vite.ssrLoadModule("/app/item-detail-summary.ts");
    const siteConfig = await vite.ssrLoadModule("/app/site-config.ts");
    const item = officialModule.normalizeOfficialItemDetail(
      officialFixture,
      "110120001",
      "en",
      0,
    );
    assert.ok(item);
    assert.equal(item.name, "Noble Dragon Lord Greatsword");
    assert.equal(item.description, "Official description\nSecond line");
    assert.equal(item.itemLevel, 108);
    assert.equal(item.equipLevel, 45);
    assert.equal(item.magicStoneSlots, 5);
    assert.equal(item.godStoneSlots, 1);
    assert.equal(item.subStatCount, 6);
    assert.equal(item.mainStats.length, 1);
    assert.equal(item.subStats.length, 1);
    assert.equal(item.detailStatus, "full");
    assert.equal(
      new URL(officialModule.officialItemSourceUrl("110120001", "ko")).origin,
      "https://tw.ncsoft.com",
    );
    assert.equal(
      new URL(officialModule.officialItemSourceUrl("110120001", "ko")).searchParams.get("lang"),
      "ko",
    );
    assert.equal(
      new URL(officialModule.officialItemSourceUrl("110120001", "en")).origin,
      "https://tw.ncsoft.com",
    );
    assert.equal(
      new URL(officialModule.officialItemSourceUrl("110120001", "en")).searchParams.get("lang"),
      "en",
    );
    assert.equal(
      new URL(officialModule.officialItemSourceUrl("110120001", "zh-hant")).searchParams.get("lang"),
      "zh",
    );

    assert.equal(
      officialModule.normalizeOfficialItemDetail(
        { ...officialFixture, id: 0 },
        "110120001",
        "en",
        0,
      ),
      null,
      "the official API's id=0 not-found response must be rejected",
    );
    assert.equal(
      officialModule.normalizeOfficialItemDetail(
        { ...officialFixture, enchantLevel: 25 },
        "110120001",
        "en",
        50,
      ),
      null,
      "an upstream-clamped enhancement level must not be mislabeled",
    );
    assert.equal(
      officialModule.normalizeOfficialItemDetail(
        { ...officialFixture, enchantLevel: undefined },
        "110120001",
        "en",
        0,
      ),
      null,
      "a response without the requested enhancement level must be rejected",
    );
    const bounded = officialModule.normalizeOfficialItemDetail(
      { ...officialFixture, maxEnchantLevel: 1_000_000 },
      "110120001",
      "en",
      0,
    );
    assert.equal(bounded.maxEnchantLevel, null);
    assert.equal(
      siteConfig.replaceLocaleInPath(
        "/zh-hant/database/item/110120001/",
        "ko",
      ),
      "/ko/database/item/110120001/",
      "switching locale must retain the exact ordinary item ID",
    );
    assert.equal(
      siteConfig.replaceLocaleInPath(
        "/en/database/brutalscourge-110130039/",
        "zh-hant",
      ),
      "/zh-hant/database/brutalscourge-110130039/",
      "switching locale must retain the exact curated item slug",
    );
    const bootstrapSummary = summaryModule.getBootstrapItemSummary(
      "110120001",
      "en",
    );
    assert.equal(bootstrapSummary?.detailStatus, "summary");
    assert.equal(bootstrapSummary?.id, "110120001");
    assert.ok(bootstrapSummary?.name);
    assert.match(bootstrapSummary?.releaseVersion ?? "", /^sha256-[a-f0-9]{64}$/u);
    assert.equal(
      summaryModule.getBootstrapItemSummary("999999999", "en"),
      null,
    );
  } finally {
    await vite.close();
  }
});

test("the same-origin item API returns full data and falls back to the Supabase summary", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  const originalFetch = globalThis.fetch;

  try {
    const {
      handleItemCatalogApi,
      parseItemCatalogRequest,
    } = await vite.ssrLoadModule(
      "/worker/item-catalog-api.ts",
    );
    const env = {
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "public-test-key",
    };

    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      if (calls === 1) return Response.json(catalogResponse([summaryRow]));
      return Response.json(officialFixture);
    };
    const fullResponse = await handleItemCatalogApi(
      new Request("https://aion2kina.com/api/items/110120001?locale=en&enchant=0"),
      env,
    );
    assert.equal(fullResponse.status, 200);
    const full = await fullResponse.json();
    assert.equal(full.detailStatus, "full");
    assert.equal(full.id, "110120001");
    assert.equal(full.mainStats[0].name, "Attack");
    assert.deepEqual(full.summaryLines, ["Attack 463 ~ 627"]);
    assert.match(fullResponse.headers.get("cache-control"), /s-maxage=21600/u);

    calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      if (calls === 1) return Response.json(catalogResponse([summaryRow]));
      throw new Error("official source unavailable");
    };
    const summaryResponse = await handleItemCatalogApi(
      new Request("https://aion2kina.com/api/items/110120001?locale=en&enchant=0"),
      env,
    );
    assert.equal(summaryResponse.status, 200);
    const summary = await summaryResponse.json();
    assert.equal(summary.detailStatus, "summary");
    assert.deepEqual(summary.summaryLines, ["Attack 463 ~ 627"]);
    assert.equal(summary.classNames[0], "Gladiator");
    assert.deepEqual(
      {
        requestedLocale: summary.requestedLocale,
        contentLocale: summary.contentLocale,
        isFallback: summary.isFallback,
        status: summary.status,
      },
      {
        requestedLocale: "en",
        contentLocale: "en",
        isFallback: false,
        status: "localized",
      },
    );

    const publicLocales = [
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
    for (const locale of publicLocales) {
      assert.equal(
        parseItemCatalogRequest({
          locale,
          query: "",
          category: null,
          grades: [],
          classes: [],
          itemIds: null,
          page: 1,
          pageSize: 20,
        }).locale,
        locale,
      );
    }

    const fallbackCalls = [];
    globalThis.fetch = async (input, init = {}) => {
      fallbackCalls.push({
        url: String(input),
        body: init.body ? JSON.parse(init.body) : null,
      });
      if (fallbackCalls.length === 1) {
        return Response.json(catalogResponse([summaryRow]));
      }
      return Response.json(officialFixture);
    };
    const fallbackResponse = await handleItemCatalogApi(
      new Request("https://aion2kina.com/api/items/110120001?locale=fr&enchant=0"),
      env,
    );
    assert.equal(fallbackResponse.status, 200);
    const fallback = await fallbackResponse.json();
    assert.deepEqual(
      {
        requestedLocale: fallback.requestedLocale,
        contentLocale: fallback.contentLocale,
        isFallback: fallback.isFallback,
        status: fallback.status,
      },
      {
        requestedLocale: "fr",
        contentLocale: "en",
        isFallback: true,
        status: "fallback",
      },
    );
    assert.equal(fallbackCalls[0].body.p_locale, "en");
    assert.equal(new URL(fallbackCalls[1].url).searchParams.get("lang"), "en");

    let catalogRequestBody;
    globalThis.fetch = async (_input, init = {}) => {
      catalogRequestBody = JSON.parse(init.body);
      return Response.json(catalogResponse([summaryRow]));
    };
    const catalogFallbackResponse = await handleItemCatalogApi(
      new Request("https://aion2kina.com/api/items", {
        method: "POST",
        body: JSON.stringify({
          locale: "pt-br",
          query: "",
          category: null,
          grades: [],
          classes: [],
          itemIds: null,
          page: 1,
          pageSize: 20,
        }),
      }),
      env,
    );
    assert.equal(catalogFallbackResponse.status, 200);
    const catalogFallback = await catalogFallbackResponse.json();
    assert.equal(catalogRequestBody.p_locale, "en");
    assert.equal(catalogFallback.requestedLocale, "pt-br");
    assert.equal(catalogFallback.contentLocale, "en");
    assert.equal(catalogFallback.isFallback, true);
    assert.equal(catalogFallback.status, "fallback");
    assert.ok(catalogFallback.facets);

    globalThis.fetch = async () => Response.json(catalogResponse([]));
    const missingResponse = await handleItemCatalogApi(
      new Request("https://aion2kina.com/api/items/999999999?locale=en&enchant=0"),
      env,
    );
    assert.equal(missingResponse.status, 404);

    const invalidResponse = await handleItemCatalogApi(
      new Request("https://aion2kina.com/api/items/001?locale=en&enchant=0"),
      env,
    );
    assert.equal(invalidResponse, null);

    const cacheBustResponse = await handleItemCatalogApi(
      new Request(
        "https://aion2kina.com/api/items/110120001?locale=en&enchant=0&nonce=random",
      ),
      env,
    );
    assert.equal(cacheBustResponse.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
    await vite.close();
  }
});

test("all ordinary catalog links use a localized internal detail route without creating thin sitemap pages", async () => {
  const [
    catalog,
    databasePage,
    page,
    detailComponent,
    siteShell,
    sitemap,
  ] = await Promise.all([
    readFile(
      path.join(root, "app", "_components", "database", "ItemCatalog.tsx"),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "[locale]", "database", "page.tsx"),
      "utf8",
    ),
    readFile(
      path.join(
        root,
        "app",
        "[locale]",
        "database",
        "item",
        "[id]",
        "page.tsx",
      ),
      "utf8",
    ),
    readFile(
      path.join(
        root,
        "app",
        "_components",
        "database",
        "OfficialItemDetail.tsx",
      ),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "_components", "site", "SiteShell.tsx"),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "sitemap-publication.mjs"),
      "utf8",
    ),
  ]);

  assert.match(catalog, /`\/database\/item\/\$\{item\.id\}\/`/u);
  assert.doesNotMatch(catalog, /target=\{item\.detailSlug/u);
  assert.match(page, /buildStaticRouteMetadata\s*\(\s*\{/u);
  assert.match(page, /\bpath,\s*\n\s*title,\s*\n\s*description,/u);
  assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/u);
  assert.match(page, /permanentRedirect\(/u);
  assert.match(page, /key=\{`\$\{locale\}:\$\{item\.id\}`\}/u);
  assert.doesNotMatch(page, /generateStaticParams/u);
  assert.doesNotMatch(
    page,
    /new URL\(`\/api\/items/u,
    "SSR must not call its own Worker route while rendering a detail page",
  );
  assert.ok(
    page.indexOf("getBootstrapItemSummary(id, locale)") <
      page.indexOf("fetchOfficialItemDetail(id, locale)"),
    "the server-rendered route must use its bundled item summary before any upstream request",
  );
  assert.match(detailComponent, /useState\(initialItem\)/u);
  assert.match(
    detailComponent,
    /initialItem\.detailStatus !== "summary"[\s\S]*?`\/api\/items\/\$\{initialItem\.id\}\?locale=\$\{locale\}&enchant=0`/u,
    "a summary page must enrich itself through the cached same-origin API after hydration",
  );
  assert.match(catalog, /setResult\(initialResponse\)/u);
  assert.match(catalog, /\[initialResponse,\s*locale\]/u);
  assert.match(databasePage, /key=\{locale\}/u);
  const languageSwitcher = siteShell.slice(
    siteShell.indexOf("const languageLinks"),
    siteShell.indexOf("const themeSwitcher"),
  );
  assert.match(languageSwitcher, /<a[\s\S]*replaceLocaleInPath/u);
  assert.doesNotMatch(languageSwitcher, /<Link/u);
  assert.match(siteShell, /window\.location\.search\}\$\{window\.location\.hash/u);
  assert.match(siteShell, /window\.location\.assign\(destination\)/u);
  assert.doesNotMatch(
    sitemap,
    /database\/item/u,
    "ordinary item detail pages must stay out of the sitemap until they have editorial depth",
  );
});
