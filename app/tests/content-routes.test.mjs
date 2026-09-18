import assert from "node:assert/strict";
import test from "node:test";

const canonicalRoutes = [
  {
    legacy: "/guides/founders-pack-comparison/",
    clean: "/aion-2-founders-pack/",
  },
  {
    legacy: "/guides/early-access/",
    clean: "/aion-2-early-access/",
  },
  {
    legacy: "/news/global-release-september-2026/",
    clean: "/aion-2-release-date/",
  },
  {
    legacy: "/guides/steam-vs-purple/",
    clean: "/aion-2-steam-vs-purple/",
  },
  {
    legacy: "/guides/global-monetization-watchlist/",
    clean: "/aion-2-free-to-play/",
  },
  {
    legacy: "/guides/system-requirements/",
    clean: "/aion-2-system-requirements/",
  },
  {
    legacy: "/guides/global-pre-registration/",
    clean: "/aion-2-pre-registration/",
  },
  {
    legacy: "/news/global-server-regions/",
    clean: "/aion-2-server-regions/",
  },
  {
    legacy: "/database/aion-2-wiki/",
    clean: "/aion-2-wiki/",
  },
  {
    legacy: "/guides/aion-2-gameplay/",
    clean: "/aion-2-gameplay/",
  },
  {
    legacy: "/guides/aion-2-download/",
    clean: "/aion-2-download/",
  },
  {
    legacy: "/guides/aion-2-platforms/",
    clean: "/aion-2-platforms/",
  },
  {
    legacy: "/guides/aion-2-server-status/",
    clean: "/aion-2-server-status/",
  },
  {
    legacy: "/guides/aion-2-tier-list/",
    clean: "/aion-2-tier-list/",
  },
];
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
const hreflangs = {
  "zh-hans": "zh-Hans",
  en: "en",
  fr: "fr",
  de: "de",
  es: "es-ES",
  ja: "ja",
  "pt-br": "pt-BR",
  ru: "ru",
  ko: "ko",
  "zh-hant": "zh-Hant",
};

let workerPromise;

async function loadWorker() {
  if (workerPromise) return workerPromise;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "content-route-test",
    `${process.pid}-${Date.now()}-${Math.random()}`,
  );
  workerPromise = import(workerUrl.href).then((module) => module.default);
  return workerPromise;
}

async function render(url, init = {}) {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html", ...(init.headers ?? {}) },
      ...init,
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("redirects every legacy localized P0 route to one clean same-locale URL", async () => {
  for (const route of canonicalRoutes) {
    for (const locale of locales) {
      const response = await render(
        `https://www.aion2kina.com/${locale}${route.legacy}?utm_source=route-test`,
      );
      assert.ok(response.status === 301 || response.status === 308, `${locale}${route.legacy} redirect status`);
      assert.equal(
        response.headers.get("location"),
        `/${locale}${route.clean}?utm_source=route-test`,
        `${locale}${route.legacy}`,
      );
      assert.equal(
        response.headers.get("cache-control"),
        "public, max-age=3600",
      );
    }
  }
});

test("redirects bare clean P0 routes deterministically to English and preserves query", async () => {
  for (const route of canonicalRoutes) {
    const response = await render(
      `https://www.aion2kina.com${route.clean.slice(0, -1)}?ref=bare-clean`,
    );
    assert.ok(response.status === 301 || response.status === 308, route.clean);
    assert.equal(
      response.headers.get("location"),
      `/en${route.clean}?ref=bare-clean`,
      route.clean,
    );
  }
});

test("server-renders published clean routes with clean canonical and hreflang URLs", async () => {
  for (const route of canonicalRoutes) {
    const response = await render(`http://localhost/en${route.clean}`);
    assert.equal(response.status, 200, route.clean);
    const html = await response.text();
    assert.match(
      html,
      new RegExp(
        `rel="canonical"[^>]+href="https?://[^"]+/en${route.clean.replaceAll("/", "\\/")}"`,
        "iu",
      ),
      route.clean,
    );
    for (const locale of locales) {
      const hreflang = hreflangs[locale];
      assert.match(
        html,
        new RegExp(
          `hreflang="${hreflang}"[^>]+href="https?://[^"]+/${locale}${route.clean.replaceAll("/", "\\/")}"`,
          "iu",
        ),
        `${route.clean} ${locale}`,
      );
    }
    assert.match(
      html,
      new RegExp(
        `hreflang="x-default"[^>]+href="https?://[^"]+/en${route.clean.replaceAll("/", "\\/")}"`,
        "iu",
      ),
      route.clean,
    );
  }
});

test("content sitemap lists published clean canonicals and excludes their legacy URLs", async () => {
  const response = await render(
    "https://www.aion2kina.com/sitemaps/content-en.xml",
  );
  assert.equal(response.status, 200);
  const xml = await response.text();

  for (const route of canonicalRoutes) {
    assert.match(
      xml,
      new RegExp(
        `<loc>https://(?:www\\.)?aion2kina\\.com/en${route.clean.replaceAll("/", "\\/")}<\\/loc>`,
        "u",
      ),
      route.clean,
    );
    assert.doesNotMatch(
      xml,
      new RegExp(
        `<loc>https://(?:www\\.)?aion2kina\\.com/en${route.legacy.replaceAll("/", "\\/")}<\\/loc>`,
        "u",
      ),
      route.legacy,
    );
  }
});

test("localized Founder’s Pack guides publish self-canonical sitemap URLs", async () => {
  for (const locale of [
    "zh-hans",
    "de",
    "es",
    "fr",
    "ja",
    "pt-br",
    "ru",
  ]) {
    const response = await render(
      `https://www.aion2kina.com/sitemaps/content-${locale}.xml`,
    );
    assert.equal(response.status, 200, locale);
    const xml = await response.text();
    assert.match(
      xml,
      new RegExp(
        `<loc>https://(?:www\\.)?aion2kina\\.com/${locale}/aion-2-founders-pack/<\\/loc>`,
        "u",
      ),
      locale,
    );
    assert.match(xml, /hreflang="en"/u);
    assert.match(xml, /hreflang="ja"/u);
    assert.match(xml, /hreflang="zh-Hans"/u);
    assert.match(xml, /hreflang="ru"/u);
    assert.doesNotMatch(xml, /\/guides\/founders-pack-comparison\//u);
  }
});

test("P0 pages ship answer-first SSR content, provenance, and matching visible FAQ schema", async () => {
  const expectedFacts = new Map([
    ["/aion-2-founders-pack/", /Standard[\s\S]*Deluxe[\s\S]*Ultimate/iu],
    ["/aion-2-early-access/", /September 30, 2026/iu],
    ["/aion-2-release-date/", /full launch[\s\S]*not[\s\S]*confirm/iu],
    ["/aion-2-steam-vs-purple/", /Steam[\s\S]*PURPLE/iu],
    ["/aion-2-free-to-play/", /\$15[\s\S]*Membership/iu],
    ["/aion-2-system-requirements/", /100 GB[\s\S]*SSD/iu],
    ["/aion-2-pre-registration/", /Pagati[\s\S]*one of four/iu],
    ["/aion-2-wiki/", /not an official NC wiki/iu],
    ["/aion-2-gameplay/", /eight classes[\s\S]*more than 200 dungeons/iu],
    ["/aion-2-download/", /Steam[\s\S]*PURPLE[\s\S]*100 GB/iu],
    ["/aion-2-platforms/", /PC-only[\s\S]*PS5[\s\S]*unannounced/iu],
    ["/aion-2-server-status/", /no public live status available/iu],
    ["/aion-2-tier-list/", /no reliable AION 2 Tier List/iu],
  ]);

  for (const [route, factPattern] of expectedFacts) {
    const response = await render(`http://localhost/en${route}`);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/gu) ?? []).length, 1, `${route} H1`);
    assert.match(html, /Answer first/iu, `${route} answer-first copy`);
    assert.match(html, factPattern, `${route} key fact`);
    assert.match(html, /Last verified/iu, `${route} verification label`);
    assert.match(
      html,
      /href="https:\/\/(?:aion2\.plaync\.com|about\.ncsoft\.com|store\.steampowered\.com)\//u,
      `${route} official source`,
    );
    assert.match(html, /<details[\s\S]*?<summary>/u, `${route} visible FAQ`);
    assert.match(html, /"@type":"FAQPage"/u, `${route} FAQPage`);
    assert.match(html, /"@type":"(?:Tech)?Article"/u, `${route} Article`);
    assert.match(html, /"@type":"BreadcrumbList"/u, `${route} breadcrumbs`);
  }

  for (const route of [
    "/aion-2-founders-pack/",
    "/aion-2-early-access/",
    "/aion-2-steam-vs-purple/",
    "/aion-2-free-to-play/",
    "/aion-2-system-requirements/",
    "/aion-2-pre-registration/",
  ]) {
    const response = await render(`http://localhost/en${route}`);
    const html = await response.text();
    assert.match(html, /<table\b[\s\S]*?<caption>/u, `${route} comparison table`);
  }

  const releaseResponse = await render(
    "http://localhost/en/aion-2-release-date/",
  );
  const releaseHtml = await releaseResponse.text();
  assert.doesNotMatch(
    releaseHtml,
    /<title>[^<]*October 5|<h1[^>]*>[^<]*October 5/iu,
    "unconfirmed full-launch date must not appear in the release title or H1",
  );
});

test("Founder’s Pack comparison uses the matching global English and Japanese notices", async () => {
  const [englishResponse, japaneseResponse] = await Promise.all([
    render("http://localhost/en/aion-2-founders-pack/"),
    render("http://localhost/ja/aion-2-founders-pack/"),
  ]);
  assert.equal(englishResponse.status, 200);
  assert.equal(japaneseResponse.status, 200);
  const [english, japanese] = await Promise.all([
    englishResponse.text(),
    japaneseResponse.text(),
  ]);

  assert.match(
    english,
    /href="https:\/\/aion2\.plaync\.com\/en-us\/board\/notice\/view\?articleId=6a5fef1a2c2d9c52e6c79e6f(?:&amp;|&)redirect=false"/u,
  );
  assert.match(english, /\$24\.99[\s\S]*\$49\.99[\s\S]*\$99\.99/u);
  assert.match(english, /Power Shards ×10,000/u);
  assert.match(english, /Moonlit Aria has six pieces[\s\S]*no pauldrons/u);
  assert.match(
    japanese,
    /href="https:\/\/aion2\.plaync\.com\/ja-jp\/board\/notice\/view\?articleId=6a60bed03b36601c74031053(?:&amp;|&)redirect=false"/u,
  );
  assert.match(japanese, /¥3,900[\s\S]*¥7,850[\s\S]*¥15,500/u);
  assert.match(japanese, /月光のアリア[\s\S]*ブラック ドラゴン/u);
  assert.doesNotMatch(japanese, /less than two hours played/iu);
  for (const html of [english, japanese]) {
    assert.match(html, /article:modified_time" content="2026-07-25"/u);
    assert.match(html, /"dateModified":"2026-07-25"/u);
  }
  assert.match(english, /AION 2 Global/u);
  assert.match(japanese, /AION 2 グローバルPC版/u);
});
