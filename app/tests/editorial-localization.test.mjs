import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import {
  PUBLIC_LOCALE_CONFIG,
  PUBLIC_LOCALES,
  PUBLIC_SITEMAP_KINDS,
} from "../scripts/production/verify-public-site.mjs";

const root = path.resolve(import.meta.dirname, "..");
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
const generatedLocales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];

async function loadEditorialRegistry() {
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
    const [registry, site, detail] = await Promise.all([
      vite.ssrLoadModule("/app/content-registry.ts"),
      vite.ssrLoadModule("/app/site-config.ts"),
      vite.ssrLoadModule("/app/_components/content/ContentDetail.tsx"),
    ]);
    return { registry, site, detail };
  } finally {
    await vite.close();
  }
}

test("every public editorial entry is directly approved in all ten locales", async () => {
  const { registry, site, detail } = await loadEditorialRegistry();

  assert.equal(registry.contentRegistry.length, 239);
  const july30News = registry.getContentEntry(
    "news",
    "july-30-2026-client-patches-character-switch-known-issues",
  );
  assert.ok(july30News, "the July 30 daily brief must be published as news");
  assert.equal(july30News.schemaType, "NewsArticle");
  assert.equal(july30News.publishedAt, "2026-07-30");
  assert.equal(july30News.updatedAt, "2026-07-30");
  assert.equal(july30News.sources.length, 6);
  assert.equal(july30News.heroImage.width, 584);
  assert.equal(july30News.heroImage.height, 298);
  assert.match(
    july30News.heroImage.translations.en.alt,
    /July week 5 update news artwork/u,
  );
  assert.doesNotMatch(
    JSON.stringify(july30News.heroImage.translations),
    /client patch and known-issues briefing|客户端补丁与已知问题简报/u,
  );
  assert.ok(
    july30News.sources.every((source) => /\/view\?articleId=/u.test(source.url)),
    "the July 30 brief must cite permanent article URLs",
  );
  assert.match(july30News.translations.en.title, /July 30 brief/u);
  assert.match(july30News.translations["zh-hans"].title, /7月30日简报/u);
  assert.match(
    july30News.translations.en.sections[1].paragraphs.join(" "),
    /Power Shard[\s\S]*higher-grade/u,
  );
  assert.match(
    july30News.translations.en.sections[3].paragraphs.join(" "),
    /official July week 5 CM infographic/u,
  );
  assert.doesNotMatch(JSON.stringify(july30News.translations), /\bSoul Stone\b/u);
  assert.match(
    july30News.translations.en.sections[2].paragraphs.join(" "),
    /August 5[\s\S]*August 12/u,
  );
  assert.doesNotMatch(
    JSON.stringify(july30News.translations),
    /level-10 or membership requirement applies|instant renaming is available/u,
  );
  const dailyNews = registry.getContentEntry(
    "news",
    "july-29-2026-pet-auto-loot-server-matching-update",
  );
  assert.ok(dailyNews, "the July 29 daily brief must be published as news");
  assert.equal(dailyNews.schemaType, "NewsArticle");
  assert.equal(dailyNews.publishedAt, "2026-07-29");
  assert.equal(dailyNews.updatedAt, "2026-07-29");
  assert.equal(dailyNews.sources.length, 6);
  assert.equal(dailyNews.heroImage.width, 584);
  assert.equal(dailyNews.heroImage.height, 298);
  assert.ok(
    dailyNews.sources.every((source) => /\/view\?articleId=/u.test(source.url)),
    "the July 29 brief must cite permanent article URLs instead of list pages",
  );
  assert.match(dailyNews.translations.en.title, /July 29 update/u);
  assert.match(dailyNews.translations["zh-hans"].title, /7月29日更新/u);
  assert.match(dailyNews.translations.en.intro, /Korean service/u);
  assert.match(dailyNews.translations.en.intro, /KST/u);
  assert.match(
    dailyNews.translations.ja.sections[0].paragraphs.join(" "),
    /ペットによる自動拾得/u,
  );
  assert.doesNotMatch(
    JSON.stringify(dailyNews.translations),
    /character level 10|qualifying membership|キャラクターレベル10|対象メンバーシップ/u,
  );
  assert.match(
    dailyNews.translations.en.sections.at(-1).title,
    /September 30 early access/u,
  );
  assert.deepEqual([...site.siteLocales], allLocales);
  assert.deepEqual([...PUBLIC_LOCALES], allLocales);
  assert.deepEqual([...PUBLIC_SITEMAP_KINDS], ["pages", "content", "maps"]);
  for (const locale of allLocales) {
    assert.equal(
      PUBLIC_LOCALE_CONFIG[locale].htmlLang,
      site.siteLocaleConfig[locale].htmlLang,
    );
    assert.equal(
      PUBLIC_LOCALE_CONFIG[locale].hreflang,
      site.siteLocaleConfig[locale].hreflang,
    );
  }
  const expectedHreflangs = allLocales.map(
    (locale) => site.siteLocaleConfig[locale].hreflang,
  );
  const canonicalPaths = new Set();

  for (const entry of registry.contentRegistry) {
    const identity = `${entry.section}/${entry.slug}`;
    assert.deepEqual(
      registry.getIndexableContentLocales(entry),
      allLocales,
      `${identity} must expose ten indexable locale URLs`,
    );

    for (const locale of allLocales) {
      const content = entry.translations[locale];
      const metadata = detail.buildContentMetadata(entry, locale);
      assert.ok(content, `${identity} needs direct ${locale} content`);
      assert.equal(
        entry.publication.localeReview[locale],
        "approved",
        `${identity} ${locale} must be approved`,
      );
      assert.equal(content.byline, "PFG", `${identity} ${locale} needs the PFG byline`);
      assert.ok(content.title.trim(), `${identity} ${locale} needs a title`);
      assert.ok(content.description.trim(), `${identity} ${locale} needs a description`);
      assert.ok(content.intro.trim(), `${identity} ${locale} needs an intro`);
      assert.ok(content.sections.length > 0, `${identity} ${locale} needs body sections`);
      for (const keyword of content.keywords ?? []) {
        assert.ok(
          keyword.length <= 90,
          `${identity} ${locale} keyword is too long: ${keyword}`,
        );
        assert.doesNotMatch(
          keyword,
          /\p{Extended_Pictographic}/u,
          `${identity} ${locale} keyword must not contain emoji`,
        );
      }
      assert.doesNotMatch(
        JSON.stringify(content),
        /\uFFFD/u,
        `${identity} ${locale} must not contain replacement characters`,
      );
      assert.doesNotMatch(
        content.title,
        /&(?:gt|lt|quot|amp);/u,
        `${identity} ${locale} title must contain decoded text`,
      );
      const itemId = identity.match(/^database\/.+-(\d+)$/u)?.[1];
      if (itemId) {
        assert.match(
          content.title,
          new RegExp(itemId, "u"),
          `${identity} ${locale} title must retain the exact item ID`,
        );
      }
      assert.equal(metadata.robots.index, true, `${identity} ${locale} must be indexable`);
      assert.equal(
        metadata.alternates.canonical,
        registry.getContentHref(locale, entry),
        `${identity} ${locale} must be self-canonical`,
      );
    }

    const alternates = registry.getContentAlternates(entry);
    assert.deepEqual(
      Object.keys(alternates).sort(),
      [...expectedHreflangs, "x-default"].sort(),
      `${identity} must expose every hreflang plus x-default`,
    );
    assert.equal(
      alternates["x-default"],
      registry.getContentHref("en", entry),
      `${identity} x-default must resolve to English`,
    );
    for (const locale of allLocales) {
      const href = registry.getContentHref(locale, entry);
      assert.equal(
        alternates[site.siteLocaleConfig[locale].hreflang],
        href,
        `${identity} ${locale} hreflang must use its canonical URL`,
      );
      assert.ok(!canonicalPaths.has(href), `${href} must be unique`);
      canonicalPaths.add(href);
    }

    if (entry.heroImage) {
      for (const locale of allLocales) {
        assert.ok(entry.heroImage.translations[locale]?.alt.trim());
        assert.ok(entry.heroImage.translations[locale]?.caption.trim());
      }
    }

    if (entry.primaryAction) {
      for (const locale of allLocales) {
        assert.ok(entry.primaryAction.translations[locale]?.title.trim());
        assert.ok(entry.primaryAction.translations[locale]?.label.trim());
      }
    }

    for (const source of entry.sources ?? []) {
      for (const locale of generatedLocales) {
        assert.ok(
          source.localizations?.[locale]?.label.trim(),
          `${identity} source ${source.id} needs a ${locale} label`,
        );
        assert.match(source.localizations[locale].url, /^https:\/\//u);
      }
    }
  }

  const legacyParams = ["guides", "classes", "database", "news"].flatMap(
    (section) => registry.getContentStaticParams(section),
  );
  const canonicalParams = registry.getCanonicalContentStaticParams();
  assert.equal(
    legacyParams.length + canonicalParams.length,
    registry.contentRegistry.length * allLocales.length,
  );
  assert.equal(canonicalPaths.size, registry.contentRegistry.length * allLocales.length);
});
