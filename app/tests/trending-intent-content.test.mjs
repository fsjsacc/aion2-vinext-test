import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const locales = ["zh-hant", "en", "ko"];
const allLocales = [
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
const expectedRoutes = new Map([
  ["database/aion-2-wiki", "/aion-2-wiki/"],
  ["guides/aion-2-gameplay", "/aion-2-gameplay/"],
  ["guides/aion-2-download", "/aion-2-download/"],
  ["guides/aion-2-platforms", "/aion-2-platforms/"],
  ["guides/aion-2-server-status", "/aion-2-server-status/"],
  ["guides/aion-2-tier-list", "/aion-2-tier-list/"],
]);
const westernLocales = ["fr", "de", "es", "pt-br"];
const reviewedDepthIdentities = [
  ...expectedRoutes.keys(),
  "classes/gladiator",
  "classes/assassin",
  "classes/ranger",
  "classes/sorcerer",
  "guides/character-presets-style-shop",
  "guides/global-monetization-watchlist",
];

async function loadModules() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    resolve: { alias: { "@": root } },
    server: { middlewareMode: true, watch: null },
  });
  try {
    const [content, registry, routes, seo] = await Promise.all([
      vite.ssrLoadModule("/app/trending-intent-content.ts"),
      vite.ssrLoadModule("/app/content-registry.ts"),
      vite.ssrLoadModule("/app/content-routes.ts"),
      vite.ssrLoadModule("/app/seo-metadata.ts"),
    ]);
    return { content, registry, routes, seo };
  } finally {
    await vite.close();
  }
}

function textLength(value) {
  return Array.from(value).length;
}

function collectBodyStrings(value, output = []) {
  if (typeof value === "string") {
    output.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectBodyStrings(item, output);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectBodyStrings(item, output);
  }
  return output;
}

test("trend-intent pages publish source-bound three-language content", async () => {
  const { content } = await loadModules();
  const entries = content.trendingIntentContentEntries;

  assert.equal(entries.length, expectedRoutes.size);
  assert.deepEqual(
    new Set(entries.map((entry) => `${entry.section}/${entry.slug}`)),
    new Set(expectedRoutes.keys()),
  );

  for (const entry of entries) {
    const identity = `${entry.section}/${entry.slug}`;
    assert.equal(entry.publication.status, "published", identity);
    assert.equal(entry.publication.indexable, true, identity);
    assert.equal(entry.publication.sourceReview, "verified", identity);
    assert.equal(entry.updatedAt, "2026-07-26", identity);
    assert.ok(entry.sources.length >= 2, `${identity} needs multiple primary sources`);

    for (const source of entry.sources) {
      const url = new URL(source.url);
      if (source.kind === "official") {
        assert.match(url.hostname, /(?:^|\.)ncsoft\.com$/u, `${identity} ${source.id}`);
      } else {
        assert.equal(source.kind, "platform", `${identity} ${source.id}`);
        assert.match(url.hostname, /(?:^|\.)steampowered\.com$/u, `${identity} ${source.id}`);
      }
      assert.equal(source.verifiedAt, "2026-07-26", `${identity} ${source.id}`);
    }

    const structures = [];
    for (const locale of locales) {
      const copy = entry.translations[locale];
      assert.ok(copy, `${identity}.${locale} translation`);
      assert.ok(copy.keywords.length >= 3, `${identity}.${locale} keywords`);
      assert.match(
        copy.title.toLocaleLowerCase(),
        new RegExp(copy.keywords[0].toLocaleLowerCase().replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u"),
        `${identity}.${locale} H1 must contain its primary keyword`,
      );
      const introFloor = locale === "en" ? 120 : 90;
      assert.ok(copy.intro.length >= introFloor, `${identity}.${locale} answer-first intro`);
      assert.ok(copy.sections.length >= 5, `${identity}.${locale} depth`);
      assert.ok(copy.sections.some((section) => section.faq?.length >= 3), `${identity}.${locale} FAQ`);
      const ids = copy.sections.map((section) => section.id);
      assert.equal(new Set(ids).size, ids.length, `${identity}.${locale} section IDs`);
      structures.push(ids);
    }
    assert.deepEqual(structures[1], structures[0], `${identity} English structure`);
    assert.deepEqual(structures[2], structures[0], `${identity} Korean structure`);
  }
});

test("trend-intent pages have clean canonical routes and bounded SEO metadata", async () => {
  const { content, registry, routes, seo } = await loadModules();

  for (const entry of content.trendingIntentContentEntries) {
    const identity = `${entry.section}/${entry.slug}`;
    assert.equal(
      routes.getContentCanonicalSuffix(entry),
      expectedRoutes.get(identity),
      `${identity} canonical route`,
    );

    const publishedEntry = registry.contentRegistry.find(
      (candidate) =>
        candidate.section === entry.section && candidate.slug === entry.slug,
    );
    assert.ok(publishedEntry, `${identity} published registry entry`);

    for (const locale of allLocales) {
      const copy = publishedEntry.translations[locale];
      const title = seo.buildContentSeoTitle(
        entry.section,
        entry.slug,
        locale,
        copy.title,
      );
      const description = seo.buildSeoDescription(
        copy.description,
        locale,
        `content:${identity}`,
      );
      assert.ok(textLength(title) <= 60, `${identity}.${locale} SEO title`);
      assert.ok(textLength(description) >= 110, `${identity}.${locale} SEO description floor`);
      assert.ok(textLength(description) <= 160, `${identity}.${locale} SEO description cap`);
      assert.doesNotMatch(title, /…/u, `${identity}.${locale} SEO title truncation`);
      assert.doesNotMatch(description, /…/u, `${identity}.${locale} SEO description truncation`);
    }
  }
});

test("reviewed western trend and class pages publish localized full bodies", async () => {
  const { registry } = await loadModules();
  const entries = new Map(
    registry.contentRegistry.map((entry) => [
      `${entry.section}/${entry.slug}`,
      entry,
    ]),
  );

  for (const identity of reviewedDepthIdentities) {
    const entry = entries.get(identity);
    assert.ok(entry, `${identity} registry entry`);
    const english = entry.translations.en;
    const englishBody = new Set(
      collectBodyStrings(english.sections).filter(
        (value) => value.length >= 18 && value.trim().split(/\s+/u).length >= 3,
      ),
    );

    for (const locale of westernLocales) {
      const copy = entry.translations[locale];
      assert.deepEqual(
        copy.sections.map((section) => section.id),
        english.sections.map((section) => section.id),
        `${identity}.${locale} section structure`,
      );
      assert.doesNotMatch(
        `${copy.intro} ${JSON.stringify(copy.sections)}`,
        /provisoirement en anglais|vorläufig auf Englisch|provisionalmente en inglés|temporariamente em inglês/iu,
        `${identity}.${locale} must not disclose an English body fallback`,
      );
      for (const value of collectBodyStrings(copy.sections)) {
        if (value.length >= 18 && value.trim().split(/\s+/u).length >= 3) {
          assert.ok(
            !englishBody.has(value),
            `${identity}.${locale} must localize body text: ${value}`,
          );
        }
      }
    }
  }
});

test("platform, status, and tier pages retain explicit unknown-state safeguards", async () => {
  const { content } = await loadModules();
  const entries = new Map(
    content.trendingIntentContentEntries.map((entry) => [entry.slug, entry]),
  );

  const platforms = JSON.stringify(entries.get("aion-2-platforms").translations.en);
  assert.match(platforms, /PC-only/u);
  assert.match(platforms, /PS5[\s\S]*Unannounced/u);
  assert.match(platforms, /Steam Deck[\s\S]*unknown/iu);
  assert.match(platforms, /controller[\s\S]*not official support/iu);

  const serverStatus = entries.get("aion-2-server-status");
  assert.ok(serverStatus.heroImage, "server status needs an attributed hero image");
  assert.equal(serverStatus.properties.liveTelemetry, false);
  assert.match(
    JSON.stringify(serverStatus.translations.en),
    /no public live status available[\s\S]*(?:instead of|rather than) displaying a green dot/iu,
  );

  const tier = entries.get("aion-2-tier-list");
  assert.equal(
    tier.properties.rankingStatus,
    "withheld-until-comparable-global-evidence",
  );
  assert.match(
    tier.translations.en.intro,
    /no reliable AION 2 Tier List for the Global launch yet/iu,
  );

  const download = entries.get("aion-2-download");
  assert.equal(
    download.primaryAction.sourceId,
    "aion2-steam-store-2026-07-26",
  );
  assert.match(download.primaryAction.href, /store\.steampowered\.com\/app\/3393110/u);
  assert.match(
    download.primaryAction.translations.en.note,
    /Global PURPLE installer|preload notice/iu,
  );
});
