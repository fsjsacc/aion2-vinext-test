import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildCanonicalMapUrl,
  buildMapFragmentUrl,
  findMapRoute,
  isCommittedMapPath,
  localizedMapUrl,
  parseMapLocationUrl,
} from "../app/map-app/map-url-state.ts";
import {
  buildToolDirectoryFragment,
  filterToolDirectoryTools,
  parseToolDirectoryFragment,
} from "../app/tool-directory-state.ts";
import {
  formatGlobalLaunchDate,
  getGlobalLaunchCountdownState,
  globalLaunchCountdownConfig,
} from "../app/global-launch-countdown.ts";
import {
  isPublishedIndexableContent,
  validateContentRegistry,
} from "../app/content-publication.mjs";
import {
  aion2CodeRegistry,
  codePageCopy,
  codeRegistryUpdatedAt,
  officialCouponPortalUrls,
  validateCodeRegistry,
} from "../app/code-registry.ts";
import {
  buildContentSeoTitle,
  buildSeoDescription,
  SEO_DESCRIPTION_MAX_LENGTH,
  SEO_DESCRIPTION_MIN_LENGTH,
  SEO_TITLE_MAX_LENGTH,
} from "../app/seo-metadata.ts";
import {
  siteLocaleConfig,
  siteLocales,
} from "../app/site-config.ts";
import { createSitemapEntryRegistry } from "../app/sitemap-publication.mjs";
import { expandRegistryToolStaticParams } from "../app/tool-publication.mjs";
import { validateLiveToolRouteFiles } from "../scripts/validate-tool-routes.mjs";

const templateRoot = new URL("../", import.meta.url);

let workerPromise;

async function readHomeImplementation() {
  const sources = await Promise.all([
    readFile(
      new URL("../app/_components/home/HomePage.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../app/_components/home/HomeInteractiveShell.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);
  return sources.join("\n");
}

async function loadWorker() {
  if (workerPromise) return workerPromise;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "rendered-html-test",
    `${process.pid}-${Date.now()}-${Math.random()}`,
  );
  workerPromise = import(workerUrl.href).then((module) => module.default);
  return workerPromise;
}

async function renderRequest(url, { env = {}, headers = {} } = {}) {
  const worker = await loadWorker();

  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html", ...headers },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
      ...env,
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function render(pathname = "/") {
  return renderRequest(`http://localhost${pathname}`);
}

function renderedJsonLd(html) {
  return [...html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )].map((match) => match[1]).join("\n");
}

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/giu, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/gu, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/gu, '"')
    .replace(/&apos;|&#39;/gu, "'")
    .replace(/&lt;/gu, "<")
    .replace(/&gt;/gu, ">")
    .replace(/&amp;/gu, "&");
}

function renderedTitle(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/iu)?.[1] ?? "";
  return decodeHtml(title);
}

function htmlAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, "iu"));
  return decodeHtml(match?.[1] ?? match?.[2] ?? "");
}

function renderedMetaContent(html, key, value) {
  for (const match of html.matchAll(/<meta\b[^>]*>/giu)) {
    if (htmlAttribute(match[0], key).toLowerCase() === value.toLowerCase()) {
      return htmlAttribute(match[0], "content");
    }
  }
  return "";
}

function renderedDescription(html) {
  return renderedMetaContent(html, "name", "description");
}

test("redirects a fallback host to the configured primary origin", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://fallback.example/en/guides/?topic=map"),
    {
      SITE_URL: "https://atlas.example.com",
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "https://atlas.example.com/en/guides/?topic=map",
  );
});

test("upgrades public HTTPS alias requests before temporary root locale selection", async () => {
  const worker = await loadWorker();
  const context = { waitUntil() {}, passThroughOnException() {} };
  const assets = { fetch: async () => new Response("Not found", { status: 404 }) };
  const configuredEnvironment = {
    SITE_URL: "https://aion2kina.com",
    ASSETS: assets,
  };
  const permanentRedirects = [
    ["https://www.aion2kina.com/en/", "https://aion2kina.com/en/"],
    ["https://public-alias.example/ko/tools/", "https://aion2kina.com/ko/tools/"],
  ];

  for (const [requestUrl, location] of permanentRedirects) {
    const response = await worker.fetch(
      new Request(requestUrl, { headers: { "accept-language": "zh-TW,zh;q=0.9" } }),
      configuredEnvironment,
      context,
    );
    assert.equal(response.status, 308, requestUrl);
    assert.equal(response.headers.get("location"), location, requestUrl);
  }

  const localeResponse = await worker.fetch(
    new Request("https://aion2kina.com/", {
      headers: { "accept-language": "zh-TW,zh;q=0.9" },
    }),
    { ASSETS: assets },
    context,
  );
  assert.equal(localeResponse.status, 308);
  assert.equal(
    new URL(localeResponse.headers.get("location")).pathname,
    "/",
  );
});

test("serves static files before vinext can append a trailing slash", async () => {
  const worker = await loadWorker();
  const seen = [];
  const response = await worker.fetch(
    new Request("https://atlas.example.com/assets/app.123.js"),
    {
      ASSETS: {
        fetch: async (request) => {
          seen.push(new URL(request.url).pathname);
          return new Response("export {};", {
            headers: { "content-type": "text/javascript" },
          });
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.equal(response.headers.get("cache-control"), "public, max-age=31536000, immutable");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.deepEqual(seen, ["/assets/app.123.js"]);
  assert.equal(await response.text(), "export {};");

  const webpResponse = await worker.fetch(
    new Request("https://atlas.example.com/aion2-logo.webp"),
    {
      ASSETS: {
        fetch: async () => new Response("webp", {
          headers: { "content-type": "application/octet-stream" },
        }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(webpResponse.headers.get("content-type"), "image/webp");
  assert.equal(
    webpResponse.headers.get("cache-control"),
    "public, max-age=86400, stale-while-revalidate=604800",
  );

  const llmsResponse = await worker.fetch(
    new Request("https://atlas.example.com/llms.txt"),
    {
      ASSETS: {
        fetch: async () => new Response("# AION2 KINA", {
          headers: { "content-type": "text/plain; charset=utf-8" },
        }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(llmsResponse.status, 200);
  assert.equal(llmsResponse.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(await llmsResponse.text(), "# AION2 KINA");
});

test("canonicalizes localized documents while leaving asset filenames intact", async () => {
  const response = await renderRequest("https://atlas.example.com/en/guides?topic=map");
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "/en/guides/?topic=map");

  const canonical = await renderRequest("https://atlas.example.com/en/guides/");
  assert.equal(canonical.status, 200);
  assert.match(await canonical.text(), /<h1[^>]*id="hub-title"[^>]*>AION2 Guides: New Player, Systems &amp; Progression<\/h1>/i);

  const worker = await loadWorker();
  const headResponse = await worker.fetch(
    new Request("https://atlas.example.com/en/guides", { method: "HEAD" }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(headResponse.status, 308);
  assert.equal(headResponse.headers.get("location"), "/en/guides/");

  const rscResponse = await worker.fetch(
    new Request("https://atlas.example.com/en/guides", {
      headers: { accept: "text/x-component", rsc: "1" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.notEqual(rscResponse.status, 308);
});

test("uses Worker SITE_URL for metadata and JSON-LD across every map page tier", async () => {
  const origin = "https://atlas.example.com";
  const paths = [
    "/en/tools/map/",
    "/en/tools/map/altgard/",
    "/en/tools/map/altgard/type/world-boss/",
    "/en/tools/map/altgard/poi/black-warrior-aed-52563fe7/",
  ];
  const responses = await Promise.all(paths.map((pathname) => renderRequest(
    `${origin}${pathname}`,
    { env: { SITE_URL: origin } },
  )));

  for (const [index, response] of responses.entries()) {
    assert.equal(response.status, 200);
    const html = await response.text();
    const canonical = `${origin}${paths[index]}`;
    const jsonLd = renderedJsonLd(html);

    assert.match(html, new RegExp(`rel="canonical"[^>]+href="${canonical}"`, "i"));
    assert.match(html, new RegExp(`property="og:url"[^>]+content="${canonical}"`, "i"));
    assert.ok(jsonLd.includes(canonical));
    assert.doesNotMatch(jsonLd, /localhost|aion2-atlas-hub\.panfogao\.chatgpt\.site/i);
  }
});

test("removes an untrusted site-origin header and has no temporary-domain fallback", async () => {
  const pathname = "/en/classes/class-planning-framework/";
  const response = await renderRequest(`https://request.example${pathname}`, {
    headers: {
      host: "request.example",
      "x-aion2-site-origin": "https://evil.example",
      "x-forwarded-proto": "https",
    },
  });
  assert.equal(response.status, 200);
  const html = await response.text();
  const jsonLd = renderedJsonLd(html);

  assert.match(html, /rel="canonical"[^>]+href="https:\/\/request\.example\/en\/classes\/class-planning-framework\/"/i);
  assert.match(jsonLd, /"@id":"\/en\/classes\/class-planning-framework\/#article"/i);
  assert.doesNotMatch(html, /evil\.example|aion2-atlas-hub\.panfogao\.chatgpt\.site/i);
});

test("Worker SITE_URL overrides a spoofed internal origin header", async () => {
  const pathname = "/en/classes/class-planning-framework/";
  const response = await renderRequest(`https://atlas.example.com${pathname}`, {
    env: { SITE_URL: "https://atlas.example.com" },
    headers: {
      host: "evil.example",
      "x-aion2-site-origin": "https://evil.example",
      "x-forwarded-host": "evil.example",
      "x-forwarded-proto": "https",
    },
  });
  assert.equal(response.status, 200);
  const html = await response.text();
  const jsonLd = renderedJsonLd(html);

  assert.match(html, /rel="canonical"[^>]+href="https:\/\/atlas\.example\.com\/en\/classes\/class-planning-framework\/"/i);
  assert.match(jsonLd, /https:\/\/atlas\.example\.com\/en\/classes\/class-planning-framework\/#article/i);
  assert.doesNotMatch(html, /evil\.example|aion2-atlas-hub\.panfogao\.chatgpt\.site/i);
});

test("rejects a Worker SITE_URL that is not a bare HTTPS origin", async () => {
  const response = await renderRequest("https://request.example/robots.txt", {
    env: { SITE_URL: "https://atlas.example.com/not-an-origin" },
  });
  assert.equal(response.status, 200);
  const robots = await response.text();

  assert.match(robots, /Sitemap: https:\/\/request\.example\/sitemap\.xml/);
  assert.doesNotMatch(robots, /atlas\.example\.com/);
});

const publicationLocales = [
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
const approvedPublicationLocales = Object.fromEntries(
  publicationLocales.map((locale) => [locale, "approved"]),
);

function publicationFixture(overrides = {}) {
  const publication = {
    status: "published",
    indexable: true,
    localeReview: approvedPublicationLocales,
    sourceReview: "first-party",
    ...(overrides.publication ?? {}),
  };
  const translation = {
    title: "Reviewed title",
    description: "Reviewed description",
    intro: "Reviewed introduction",
    sections: [{ id: "reviewed", title: "Reviewed", paragraphs: ["Reviewed body"] }],
  };
  return {
    section: "guides",
    slug: "reviewed-entry",
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    publication,
    translations: Object.fromEntries(
      publicationLocales.map((locale) => [locale, translation]),
    ),
    related: [],
    ...overrides,
    publication,
  };
}

test("content publication gate rejects drafts, incomplete locale review, and unverified sources", () => {
  const valid = publicationFixture();
  assert.equal(isPublishedIndexableContent(valid), true);
  assert.deepEqual(validateContentRegistry([valid]), []);

  const draft = publicationFixture({
    publication: { status: "draft", indexable: true },
  });
  assert.equal(isPublishedIndexableContent(draft), false);
  assert.match(validateContentRegistry([draft]).join("\n"), /before publication/u);

  const pendingLocale = publicationFixture({
    publication: {
      localeReview: { ...approvedPublicationLocales, ko: "review" },
    },
  });
  assert.equal(isPublishedIndexableContent(pendingLocale), false);
  assert.match(validateContentRegistry([pendingLocale]).join("\n"), /before ko approval/u);

  const unverified = publicationFixture({
    publication: { sourceReview: "unverified" },
  });
  assert.equal(isPublishedIndexableContent(unverified), false);
  assert.match(validateContentRegistry([unverified]).join("\n"), /unverified source/u);

  const futureDated = publicationFixture({
    publishedAt: "2999-01-01",
    updatedAt: "2999-01-01",
  });
  assert.deepEqual(validateContentRegistry([futureDated]), []);
  assert.match(
    validateContentRegistry([futureDated], undefined, {
      asOfDate: "2026-07-14",
    }).join("\n"),
    /future-dated record/u,
  );
  assert.match(
    validateContentRegistry([valid], undefined, {
      asOfDate: "2026-02-30",
    }).join("\n"),
    /as-of date must use YYYY-MM-DD/u,
  );
});

test("content publication gate validates ten-language table and FAQ structures", () => {
  const sectionWithSeoBlocks = () => ({
    id: "comparison",
    title: "Edition comparison",
    paragraphs: ["Compare the verified options."],
    table: {
      caption: "Founder pack comparison",
      headers: ["Edition", "Access", "Platform"],
      rows: [{
        header: "Standard",
        cells: ["Five days", "Steam"],
      }],
    },
    faq: [{
      question: "When does access begin?",
      answer: "Access begins on the date shown by the verified source.",
    }],
  });
  const translationsWith = (sectionFactory) => Object.fromEntries(
    publicationLocales.map((locale) => [
      locale,
      {
        title: "Reviewed title",
        description: "Reviewed description",
        intro: "Reviewed introduction",
        sections: [sectionFactory(locale)],
      },
    ]),
  );

  const valid = publicationFixture({
    translations: translationsWith(sectionWithSeoBlocks),
  });
  assert.deepEqual(validateContentRegistry([valid]), []);

  const wrongColumnCount = publicationFixture({
    translations: translationsWith(() => ({
      ...sectionWithSeoBlocks(),
      table: {
        ...sectionWithSeoBlocks().table,
        rows: [{ header: "Standard", cells: ["Five days"] }],
      },
    })),
  });
  assert.match(
    validateContentRegistry([wrongColumnCount]).join("\n"),
    /table row 1 has 2 columns; expected 3/u,
  );

  const emptyFaq = publicationFixture({
    translations: translationsWith(() => ({
      ...sectionWithSeoBlocks(),
      faq: [],
    })),
  });
  assert.match(
    validateContentRegistry([emptyFaq]).join("\n"),
    /FAQ must not be empty/u,
  );

  const incompleteFaq = publicationFixture({
    translations: translationsWith(() => ({
      ...sectionWithSeoBlocks(),
      faq: [{ question: "", answer: "Missing a question." }],
    })),
  });
  assert.match(
    validateContentRegistry([incompleteFaq]).join("\n"),
    /FAQ item 1 needs a non-empty question and answer/u,
  );

  const inconsistentTranslations = publicationFixture({
    translations: translationsWith((locale) => ({
      ...sectionWithSeoBlocks(),
      table: locale === "en"
        ? {
            caption: "Founder pack comparison",
            headers: ["Edition", "Access", "Platform", "Region"],
            rows: [{
              header: "Standard",
              cells: ["Five days", "Steam", "Global"],
            }],
          }
        : sectionWithSeoBlocks().table,
    })),
  });
  assert.match(
    validateContentRegistry([inconsistentTranslations]).join("\n"),
    /must keep section ids, table columns and row-header structure, and FAQ counts aligned across all locales/u,
  );
});

test("content detail uses semantic SSR tables and visible FAQ content for FAQPage data", async () => {
  const [component, faqComponent, provenanceComponent, analyticsEvents, styles] = await Promise.all([
    readFile(
      new URL("../app/_components/content/ContentDetail.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/_components/content/ContentFaqList.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/_components/trust/ProvenancePanel.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/analytics-events.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/_components/content/ContentDetail.module.css", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(component, /<table className=\{styles\.dataTable\}>/u);
  assert.match(component, /<caption>\{section\.table\.caption\}<\/caption>/u);
  assert.match(component, /<th[^>]+scope="col">\{header\}<\/th>/u);
  assert.match(component, /<th scope="row">\{row\.header\}<\/th>/u);
  assert.match(component, /<ContentFaqList[\s\S]*?items=\{sectionFaq\}/u);
  assert.match(faqComponent, /<details[\s\S]*?<summary>\{item\.question\}<\/summary>/u);
  assert.match(faqComponent, /trackEvent\("content_faq_toggle"/u);
  assert.match(analyticsEvents, /"content_faq_toggle"/u);
  assert.match(component, /eventName="content_source_click"/u);
  assert.match(component, /link_location:\s*"hero_credit"/u);
  assert.match(provenanceComponent, /eventName="content_source_click"/u);
  assert.match(provenanceComponent, /link_location:\s*"provenance"/u);
  assert.match(analyticsEvents, /"content_source_click"/u);
  assert.match(component, /const faqItems = sections\.flatMap\(visibleFaqItems\)/u);
  assert.match(component, /faqItems\.length[\s\S]*?"@type": "FAQPage"/u);
  assert.match(component, /name: item\.question[\s\S]*?text: item\.answer/u);
  assert.match(styles, /\.tableScroll\s*\{[\s\S]*?overflow-x:\s*auto/u);
  assert.match(styles, /\.faqItem summary\s*\{/u);
});

test("verified content requires attributable sources and localized hero media", () => {
  const source = {
    id: "nc-source",
    kind: "official",
    publisher: "NC Corporation",
    label: "Verified official release",
    url: "https://about.ncsoft.com/en/news/article/aion2_update_260706",
    publishedAt: "2026-07-06",
    retrievedAt: "2026-07-14",
    verifiedAt: "2026-07-14",
  };
  const heroImage = {
    src: "https://blogfiles.ncsoft.net/news/example.jpg",
    width: 800,
    height: 420,
    credit: "NC Corporation",
    sourceUrl: source.url,
    rights: "linked-official-media",
    translations: Object.fromEntries(
      publicationLocales.map((locale) => [
        locale,
        {
          alt: `Verified image ${locale}`,
          caption: `Official-source image ${locale}`,
        },
      ]),
    ),
  };
  const valid = publicationFixture({
    publication: { sourceReview: "verified" },
    sources: [source],
    heroImage,
  });
  assert.deepEqual(validateContentRegistry([valid]), []);

  const actionCopy = {
    eyebrow: "Answer first",
    title: "Open the verified source",
    description: "Read the source before continuing.",
    label: "Open source",
    note: "Opens in a new tab.",
    facts: [{ label: "Status", value: "Verified" }],
  };
  const primaryAction = {
    id: "verified-source",
    href: source.url,
    sourceId: source.id,
    translations: Object.fromEntries(
      publicationLocales.map((locale) => [locale, actionCopy]),
    ),
  };
  const withPrimaryAction = publicationFixture({
    publication: { sourceReview: "verified" },
    sources: [source],
    heroImage,
    primaryAction,
  });
  assert.deepEqual(validateContentRegistry([withPrimaryAction]), []);
  assert.match(
    validateContentRegistry([{
      ...withPrimaryAction,
      primaryAction: { ...primaryAction, sourceId: "missing-source" },
    }]).join("\n"),
    /primary action must reference one of its verified sources/u,
  );
  assert.match(
    validateContentRegistry([{
      ...withPrimaryAction,
      primaryAction: { ...primaryAction, href: "https://example.com/not-the-source" },
    }]).join("\n"),
    /primary action must use its referenced source URL/u,
  );

  const futureSourceDates = publicationFixture({
    publication: { sourceReview: "verified" },
    sources: [{ ...source, retrievedAt: "2999-01-01", verifiedAt: "2999-01-01" }],
    heroImage,
  });
  assert.deepEqual(validateContentRegistry([futureSourceDates]), []);
  assert.match(
    validateContentRegistry([futureSourceDates], undefined, {
      asOfDate: "2026-07-14",
    }).join("\n"),
    /future source retrieval or verification dates/u,
  );

  const missingImage = publicationFixture({
    publication: { sourceReview: "verified" },
    sources: [source],
  });
  assert.match(validateContentRegistry([missingImage]).join("\n"), /attributed hero image/u);

  const falseOfficial = publicationFixture({
    publication: { sourceReview: "verified" },
    sources: [{ ...source, url: "https://example.com/not-official" }],
    heroImage,
  });
  assert.match(validateContentRegistry([falseOfficial]).join("\n"), /non-NC domain as an official source/u);

  const impossibleVerification = publicationFixture({
    publication: { sourceReview: "verified" },
    sources: [{ ...source, retrievedAt: "2026-07-14", verifiedAt: "2026-07-13" }],
    heroImage,
  });
  assert.match(
    validateContentRegistry([impossibleVerification]).join("\n"),
    /verify a source before retrieving it/u,
  );

  const incompleteImage = publicationFixture({
    publication: { sourceReview: "verified" },
    sources: [source],
    heroImage: {
      ...heroImage,
      translations: { ...heroImage.translations, ko: { alt: "", caption: "" } },
    },
  });
  assert.match(validateContentRegistry([incompleteImage]).join("\n"), /incomplete ko hero image copy/u);
});

test("published content relations require complete fields and public entity targets", () => {
  const targets = {
    tool: ["map"],
    map: ["verteron"],
    type: ["verteron/world-boss"],
    // Accessibility, not indexability, is the POI relation contract.
    poi: ["verteron/roah-2f438df2"],
  };
  const valid = publicationFixture({
    related: [
      { kind: "tool", toolSlug: "map" },
      { kind: "map", mapSlug: "verteron" },
      { kind: "type", mapSlug: "verteron", typeSlug: "world-boss" },
      { kind: "poi", mapSlug: "verteron", poiSlug: "roah-2f438df2" },
    ],
  });
  assert.deepEqual(validateContentRegistry([valid], targets), []);

  const incomplete = publicationFixture({
    related: [{ kind: "type", mapSlug: "verteron" }],
  });
  assert.match(
    validateContentRegistry([incomplete], targets).join("\n"),
    /incomplete type relation/u,
  );

  for (const relation of [
    { kind: "tool", toolSlug: "missing-tool" },
    { kind: "map", mapSlug: "missing-map" },
    { kind: "type", mapSlug: "verteron", typeSlug: "missing-type" },
    { kind: "poi", mapSlug: "verteron", poiSlug: "missing-poi" },
  ]) {
    const invalid = publicationFixture({ related: [relation] });
    assert.match(
      validateContentRegistry([invalid], targets).join("\n"),
      new RegExp(`unavailable ${relation.kind} target`, "u"),
    );
  }
});

test("live tools receive one sitemap owner and registry-only static params", () => {
  const liveTools = [
    { slug: "map", status: "live", route: { kind: "custom", href: "/tools/map/" } },
    { slug: "build-planner", status: "live", route: { kind: "registry", href: "/tools/build-planner/" } },
    { slug: "future", status: "coming-soon", route: { kind: "unavailable", href: null } },
  ];
  const sitemaps = createSitemapEntryRegistry({
    pages: [{ suffix: "/" }, { suffix: "/tools/" }],
    content: [],
    maps: [{ suffix: "/tools/map/" }],
    liveTools,
  });
  assert.equal(sitemaps.maps.filter((entry) => entry.suffix === "/tools/map/").length, 1);
  assert.equal(sitemaps.pages.filter((entry) => entry.suffix === "/tools/map/").length, 0);
  assert.equal(
    sitemaps.pages.filter((entry) => entry.suffix === "/tools/build-planner/").length,
    1,
  );
  assert.deepEqual(expandRegistryToolStaticParams(liveTools, ["zh-hant", "en", "ko"]), [
    { locale: "zh-hant", tool: "build-planner" },
    { locale: "en", tool: "build-planner" },
    { locale: "ko", tool: "build-planner" },
  ]);
  assert.throws(
    () => createSitemapEntryRegistry({
      pages: [{ suffix: "/tools/map/" }],
      content: [],
      maps: [{ suffix: "/tools/map/" }],
      liveTools,
    }),
    /Duplicate sitemap suffix/u,
  );
});

test("every live custom tool has an explicit entity route", async () => {
  const root = fileURLToPath(templateRoot);
  assert.deepEqual(
    await validateLiveToolRouteFiles({
      root,
      tools: [{
        slug: "map",
        status: "live",
        route: { kind: "custom", href: "/tools/map/" },
      }],
    }),
    [],
  );
  assert.match(
    (await validateLiveToolRouteFiles({
      root,
      tools: [{
        slug: "missing-custom-tool",
        status: "live",
        route: { kind: "custom", href: "/tools/missing-custom-tool/" },
      }],
    })).join("\n"),
    /requires a custom entity route/u,
  );
});

test("redirects the root directly to the best supported language", async () => {
  const cases = [
    { headers: { cookie: "aion2-atlas-locale=ko", "accept-language": "zh-TW,zh;q=0.9" }, location: "/ko/" },
    { headers: { cookie: "aion2-atlas-locale=fr", "accept-language": "en-US,en;q=0.9" }, location: "/fr/" },
    { headers: { "accept-language": "zh-CN,zh;q=0.9,en;q=0.6" }, location: "/zh-hans/" },
    { headers: { "accept-language": "zh-HK,zh;q=0.9,en;q=0.6" }, location: "/zh-hant/" },
    { headers: { "accept-language": "en-US,en;q=0.8,ko;q=0.5" }, location: "/en/" },
    { headers: { "accept-language": "fr-FR,fr;q=0.9,en;q=0.6" }, location: "/fr/" },
    { headers: { "accept-language": "de-DE,de;q=0.9,en;q=0.6" }, location: "/de/" },
    { headers: { "accept-language": "es-ES,es;q=0.9,en;q=0.6" }, location: "/es/" },
    { headers: { "accept-language": "ja-JP,ja;q=0.9,en;q=0.6" }, location: "/ja/" },
    { headers: { "accept-language": "pt-BR,pt;q=0.9,en;q=0.6" }, location: "/pt-br/" },
    { headers: { "accept-language": "ru-RU,ru;q=0.9,en;q=0.6" }, location: "/ru/" },
    { headers: {}, location: "/en/" },
  ];

  for (const scenario of cases) {
    const response = await renderRequest("http://localhost/", { headers: scenario.headers });
    assert.equal(response.status, 307);
    assert.equal(new URL(response.headers.get("location")).pathname, scenario.location);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.match(response.headers.get("vary") ?? "", /Accept-Language/i);
    assert.match(response.headers.get("vary") ?? "", /Cookie/i);
  }

  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /localeFromCookie/);
  assert.match(page, /localeFromAcceptLanguage/);
  assert.match(page, /redirect\(localizedHref\(locale\)\)/);
  assert.match(page, /generateMetadata/);
  assert.match(page, /robots: \{ index: false, follow: true \}/);
  assert.match(page, /alternates: \{ canonical/);
  assert.doesNotMatch(page, /language-entry|Choose your language|aion2-elyos\.webp/);
});

test("returns true noindex 404 responses while preserving the client-side home fallback", async () => {
  const cases = [
    {
      locale: "zh-hant",
      language: "zh-Hant",
      title: "這個頁面不在這裡",
      homeHref: "/zh-hant/",
    },
    {
      locale: "en",
      language: "en",
      title: "This page is not here",
      homeHref: "/en/",
    },
    {
      locale: "ko",
      language: "ko",
      title: "이 페이지는 존재하지 않습니다",
      homeHref: "/ko/",
    },
  ];

  for (const scenario of cases) {
    const response = await render(`/${scenario.locale}/missing-404-page/`);
    assert.equal(response.status, 404);
    assert.equal(response.headers.get("location"), null);
    const html = await response.text();
    assert.match(
      html,
      /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/i,
    );
    assert.match(html, /NotFoundRedirect/u);
    assert.match(html, new RegExp(`href="${scenario.homeHref.replaceAll("/", "\\/")}"`, "u"));
  }

  const missingGuide = await render("/zh-hant/guides/missing-guide-404/");
  assert.equal(missingGuide.status, 404);
  assert.equal(missingGuide.headers.get("location"), null);
  assert.match(
    await missingGuide.text(),
    /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/i,
  );

  const invalidLocale = await render("/fr/page-qui-n-existe-pas/");
  assert.equal(invalidLocale.status, 404);
  assert.equal(invalidLocale.headers.get("location"), null);
  assert.match(
    await invalidLocale.text(),
    /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/i,
  );

  for (const path of [
    "/assets/missing.js",
    "/missing-image.png",
    "/missing-image.png/",
    "/en/missing-script.js/",
    "/_next/missing",
    "/_vinext/missing",
  ]) {
    const missingAsset = await renderRequest(`http://localhost${path}`);
    assert.equal(missingAsset.status, 404, path);
    assert.equal(missingAsset.headers.get("location"), null, path);
  }

  for (const path of ["/api", "/api/missing-endpoint"]) {
    const missingApi = await renderRequest(`http://localhost${path}`);
    assert.equal(missingApi.status, 404, path);
    assert.equal(missingApi.headers.get("location"), null, path);
    assert.match(
      missingApi.headers.get("content-type") ?? "",
      /application\/json/u,
      path,
    );
  }

  const [
    localizedNotFound,
    globalNotFound,
    localeLayout,
    localizedCatchAll,
    worker,
  ] = await Promise.all([
    readFile(new URL("../app/[locale]/not-found.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/[...missing]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
  ]);
  assert.match(localizedNotFound, /<NotFoundRedirect/u);
  assert.match(
    localizedNotFound,
    /href=\{localizedHref\(isSiteLocale\(locale\) \? locale : "en"\)\}/u,
  );
  assert.match(globalNotFound, /<NotFoundRedirect href="\/en\/" \/>/u);
  assert.match(localeLayout, /if \(!isSiteLocale\(locale\)\) notFound\(\)/u);
  assert.match(localizedCatchAll, /if \(!content\) notFound\(\)/u);
  assert.doesNotMatch(worker, /function publicNotFoundHome/u);
  assert.doesNotMatch(worker, /response\.status === 404[\s\S]{0,500}status: 307/u);
  assert.match(worker, /url\.pathname\.startsWith\("\/api\/"\)[\s\S]+error: "not-found"/u);
  await assert.rejects(
    access(new URL("../app/_components/site/NotFoundContent.tsx", import.meta.url)),
  );
  await assert.rejects(
    access(new URL("../app/_components/site/not-found.module.css", import.meta.url)),
  );
});

test("validates an official-source-backed code registry with one active and four historical codes", () => {
  assert.equal(validateCodeRegistry(), true);
  assert.equal(aion2CodeRegistry.length, 5);
  assert.deepEqual(
    aion2CodeRegistry.filter((entry) => entry.status === "active").map((entry) => entry.code),
    ["AION2CHAPTERONE"],
  );
  assert.deepEqual(
    aion2CodeRegistry.filter((entry) => entry.status === "expired").map((entry) => entry.code),
    ["AION2SEASON3", "WELCOMEBACK", "AION2DAYS100", "LUCKYAION2"],
  );
  assert.ok(
    aion2CodeRegistry.every((entry) =>
      entry.sources.length > 0 &&
      entry.sources.every((source) => source.url.startsWith("https://"))),
  );
  assert.throws(
    () => validateCodeRegistry([
      ...aion2CodeRegistry,
      { ...aion2CodeRegistry[0], id: "duplicate-code-record" },
    ]),
    /duplicate code/i,
  );

  const interactionLabelKeys = [
    "showCodeLabel",
    "loadingCodeLabel",
    "copyLabel",
    "confirmCopyTitle",
    "confirmCopyMessage",
    "confirmCopyLabel",
    "cancelLabel",
  ];
  for (const locale of siteLocales) {
    for (const key of interactionLabelKeys) {
      assert.equal(
        typeof codePageCopy[locale][key],
        "string",
        `${locale} is missing the ${key} code-reveal label`,
      );
      assert.ok(
        codePageCopy[locale][key].trim().length > 0,
        `${locale} has an empty ${key} code-reveal label`,
      );
    }
  }
  for (const key of [
    "showCodeLabel",
    "loadingCodeLabel",
    "copyLabel",
    "confirmCopyLabel",
    "cancelLabel",
  ]) {
    for (const locale of siteLocales.filter((candidate) => candidate !== "en")) {
      assert.notEqual(
        codePageCopy[locale][key],
        codePageCopy.en[key],
        `${locale}.${key} must not fall back to English`,
      );
    }
  }
});

test("keeps every code-page field and registry record directly localized for all ten site locales", () => {
  const expectedLocales = [...siteLocales].sort();
  const assertLocaleKeys = (value, label) => {
    assert.deepEqual(
      Object.keys(value).sort(),
      expectedLocales,
      `${label} must contain every supported locale exactly once`,
    );
  };

  assertLocaleKeys(codePageCopy, "codePageCopy");
  assertLocaleKeys(officialCouponPortalUrls, "officialCouponPortalUrls");

  for (const entry of aion2CodeRegistry) {
    for (const [field, value] of [
      ["period", entry.period],
      ["title", entry.title],
      ["serverScope", entry.serverScope],
      ["accountLimit", entry.accountLimit],
      ["rewards", entry.rewards],
    ]) {
      assertLocaleKeys(value, `${entry.code}.${field}`);
    }
    for (const source of entry.sources) {
      assertLocaleKeys(source.label, `${entry.code}.source.label`);
    }

    for (const locale of siteLocales.filter((candidate) => candidate !== "en")) {
      assert.notEqual(entry.title[locale], entry.title.en, `${entry.code}.${locale}.title`);
      assert.notEqual(
        entry.serverScope[locale],
        entry.serverScope.en,
        `${entry.code}.${locale}.serverScope`,
      );
      assert.notEqual(
        entry.accountLimit[locale],
        entry.accountLimit.en,
        `${entry.code}.${locale}.accountLimit`,
      );
      assert.notEqual(
        entry.rewards[locale].join("\n"),
        entry.rewards.en.join("\n"),
        `${entry.code}.${locale}.rewards`,
      );
    }
  }
});

test("keeps reported SEO title and description outliers inside the Ahrefs-safe ranges", () => {
  const titleFixtures = [
    ["guides", "interactive-map-quickstart", "Interactive map quickstart: from objective to usable route"],
    ["classes", "class-planning-framework", "Build the question before the build: a class planning framework"],
    ["database", "map-data-methodology", "How AION2 interactive map data moves from a source to a public page"],
    ["guides", "aether-extraction", "AION2 gathering (정기추출): level 45, success gauges, and skill points"],
    ["guides", "deity-traces", "AION2 Empyrean Traces: the confirmed Daeva Express batch scope"],
    ["news", "aion2chapterone-coupon-status", "AION2CHAPTERONE coupon: valid until the September 30, 2026 maintenance"],
    ["guides", "abyss-status", "AION2 Abyss status: Season 2, Chaotic Abyss, and Chapter 1"],
    ["guides", "godstone-imprint", "AION2 Godstone Imprint and synthesis: the confirmed candidate rule"],
    ["guides", "arcana", "AION2 Arcana: official set effects, crystal sources, and version limits"],
    ["news", "global-release-september-2026", "AION 2 global launch: Sep 30 advance access and Oct 5 Steam release"],
    ["classes", "base-class-roster", "AION2's eight base classes: official roles, weapons, and version limits"],
    ["classes", "class-choice-guide", "How to choose an AION2 class: shortlist the official eight by playstyle"],
    ["news", "global-server-regions", "AION2 global server regions: North America, South America, Europe, and Japan"],
    ["guides", "soul-imprint", "AION2 Soul Imprint: official probabilities, reset, and Soul Tuning"],
    ["guides", "wing-enhancement", "AION2 Wings Enhance: +10 cap, materials, and success-rate control"],
    ["guides", "equipment-tuning", "AION2 equipment tuning: Soul Tuning flow, probability limits, and Transfer"],
    ["guides", "atool", "What is Atool? Reading character, ranking, and class data correctly"],
    ["guides", "elyos-vs-asmodians", "Elyos or Asmodians in AION2: separate starts, servers, and RvR"],
    ["guides", "global-pre-registration", "AION 2 global pre-registration: official link, timing, and rewards"],
    ["news", "founders-packs-announced-july-2026", "AION 2 Founder’s Packs: September 30 Early Access"],
    ["guides", "founders-pack-comparison", "AION 2 Founder’s Pack Guide: Which Edition to Choose?"],
    ["news", "fromis-9-collaboration", "AION2 × fromis_9: quests, cosmetics, emotes, and the August 12 deadline"],
    ["guides", "kinah-bound", "AION2 Kina (Bound): official introduction date and build boundary"],
    ["guides", "system-requirements", "AION2 official requirements for PC, Android, iPhone, and tablets"],
    ["guides", "beginner-launch-checklist", "AION2 global launch guide: early access, install, and first-day preparation"],
    ["guides", "global-monetization-watchlist", "AION 2 global monetization: confirmed Steam labels and open questions"],
    ["guides", "spacetime-rift", "AION 2 Spacetime Rift schedule and map locations"],
    ["guides", "ing-meter", "AION2 ING Meter: download source, setup, and basic use"],
    ["guides", "character-presets-style-shop", "AION2 character presets and Style Shop: official facts and limits"],
    ["guides", "crafting-and-transfer-crafting", "AION2 crafting and Transfer Crafting: proficiency, Combo, and inheritance rules"],
    ["guides", "scam-check", "AION 2 scam, fake-site, and third-party software checklist"],
    ["classes", "brawler", "AION2 Brawler official skill guide: Rage, Rampage, and three skill groups"],
    ["guides", "pet-progression", "AION2 pet progression: Genus Insight, levels, and server-wide character sharing"],
  ];
  for (const [section, slug, sourceTitle] of titleFixtures) {
    const title = buildContentSeoTitle(section, slug, "en", sourceTitle);
    assert.ok(Array.from(title).length <= SEO_TITLE_MAX_LENGTH, `${section}/${slug}: ${title}`);
    assert.match(title, /\| AION2 KINA$/u);
  }
  assert.equal(
    buildContentSeoTitle(
      "news",
      "corroded-decontamination-cross-faction-pve",
      "zh-hans",
      "AION2 Corroded Decontamination Facility：3,700 门槛与跨种族 PvE 组队",
    ),
    "AION2 腐蚀净化设施：3,700 装等与跨种族 PvE | AION2 KINA",
  );
  assert.equal(
    buildContentSeoTitle(
      "guides",
      "global-pre-registration",
      "de",
      "AION2 Global Pre-Registration Guide: Offizieller Link, Schritte, Belohnungen & FAQ",
    ),
    "AION 2 Vorregistrierung: Link & Belohnungen | AION2 KINA",
  );
  assert.equal(
    buildContentSeoTitle(
      "guides",
      "global-pre-registration",
      "ru",
      "AION2 Global Pre-Registration Guide: Официальные ссылки, шаги, награды и FAQ",
    ),
    "AION 2: предрегистрация, ссылка и награды | AION2 KINA",
  );

  const descriptionFixtures = [
    ["面向 AION2 玩家整理的繁體中文攻略、職業規劃、互動地圖、遠征情報與實用工具。", "zh-hant", "home"],
    ["AION2 플레이어를 위한 한국어 공략, 직업 설계, 인터랙티브 지도, 원정 정보와 실용 도구 모음입니다.", "ko", "home"],
    ["The class finder, interactive map, crafting recipe and material calculator, and daily checklist are live. Build planning will join the same registry with stable, language-aware URLs.", "en", "tools"],
    ["Class pages will connect core loops, skill priorities, equipment choices, PvE and PvP playstyles, and versioned builds instead of presenting another isolated tier list.", "en", "hub:classes"],
    ["NC's official catalog confirms that the grade of material Godstones determines the obtainable-probability list, while the item database exposes a Godstone Imprint field. It does not establish a best Godstone or trigger rate.", "en", "content:guides/godstone-imprint"],
    ["建立自己的每日與每週任務，手動重置完成狀態；所有資料只保存在目前裝置。", "zh-hant", "tool:daily-checklist"],
    ["나만의 일일·주간 항목을 만들고 완료 상태를 직접 초기화하세요. 모든 데이터는 현재 기기에만 저장됩니다.", "ko", "tool:daily-checklist"],
    ["搜尋 AION2 製作配方，依製作次數計算直接材料或基礎材料的總需求、目前庫存缺口與自訂單價成本。", "zh-hant", "tool:material-calculator"],
    ["Search AION2 crafting recipes and calculate direct or base-material requirements, inventory shortages, and custom-price costs by craft count.", "en", "tool:material-calculator"],
    ["搜尋地圖、地區、世界首領、採集點與收集品。頁面內容可直接被搜尋引擎讀取，互動地圖則在需要時載入。", "zh-hant", "map-hub"],
    ["在 斐爾特朗（天族） AION2 互動地圖查看 22 個世界首領點位，包括名稱、位置與原始座標，並可返回地圖直接篩選。", "zh-hant", "map-type"],
    ["알트가르드 (마족) 아이온2 지도에서 18개의 월드 보스 이름, 위치와 원본 좌표를 확인하고 인터랙티브 지도 필터로 바로 이동하세요.", "ko", "map-type"],
  ];
  for (const [source, locale, key] of descriptionFixtures) {
    const description = buildSeoDescription(source, locale, key);
    const length = Array.from(description).length;
    assert.ok(length >= SEO_DESCRIPTION_MIN_LENGTH, `${locale}:${key} is only ${length} characters`);
    assert.ok(length <= SEO_DESCRIPTION_MAX_LENGTH, `${locale}:${key} is ${length} characters`);
  }
});

test("renders non-empty alt text for every AION2 image source reported by Ahrefs", async () => {
  const responses = await Promise.all([
    render("/en/"),
    render("/zh-hant/guides/"),
    render("/ko/tools/map/"),
  ]);
  const reportedSources = new Set([
    "/aion2-logo.webp",
    "/aion2-logo-96.webp",
    "/aion2-elyos.webp",
    "/aion2-asmodian.webp",
    "/aion2-dual-mobile.webp",
    "/aion2-dual.webp",
  ]);

  for (const response of responses) {
    assert.equal(response.status, 200);
    const html = await response.text();
    const imageTags = [...html.matchAll(/<img\b[^>]*>/giu)].map((match) => match[0]);
    for (const tag of imageTags) {
      const source = tag.match(/\bsrc="([^"]+)"/iu)?.[1];
      if (!source || !reportedSources.has(source)) continue;
      const alt = decodeHtml(tag.match(/\balt="([^"]*)"/iu)?.[1] ?? "");
      assert.ok(alt.trim(), `missing alt for ${source} in ${tag}`);
    }
  }
});

test("renders the optimized SEO copy through each affected metadata template", async () => {
  const paths = [
    "/en/guides/godstone-imprint/",
    "/zh-hant/",
    "/ko/tools/daily-checklist/",
    "/en/tools/",
    "/zh-hant/tools/map/verteron/",
    "/ko/tools/map/altgard/type/world-boss/",
  ];
  const responses = await Promise.all(paths.map((pathname) => render(pathname)));

  for (const [index, response] of responses.entries()) {
    assert.equal(response.status, 200);
    const html = await response.text();
    const description = renderedDescription(html);
    const descriptionLength = Array.from(description).length;
    assert.ok(
      descriptionLength >= SEO_DESCRIPTION_MIN_LENGTH &&
        descriptionLength <= SEO_DESCRIPTION_MAX_LENGTH,
      `${paths[index]} description length is ${descriptionLength}`,
    );
    assert.equal(renderedMetaContent(html, "property", "og:description"), description);
    assert.equal(renderedMetaContent(html, "name", "twitter:description"), description);
  }

  const titleHtml = await (await render("/en/guides/godstone-imprint/")).text();
  assert.equal(renderedTitle(titleHtml), "AION2 Godstone Imprint & Synthesis | AION2 KINA");
  assert.ok(Array.from(renderedTitle(titleHtml)).length <= SEO_TITLE_MAX_LENGTH);
});

test("keeps every localized home and content hub description inside the SEO range", async () => {
  const suffixes = ["", "guides/", "classes/", "database/", "tools/", "news/", "tools/map/"];
  const paths = ["zh-hant", "en", "ko"].flatMap((locale) =>
    suffixes.map((suffix) => `/${locale}/${suffix}`),
  );
  const responses = await Promise.all(paths.map((pathname) => render(pathname)));

  for (const [index, response] of responses.entries()) {
    assert.equal(response.status, 200, paths[index]);
    const description = renderedDescription(await response.text());
    const length = Array.from(description).length;
    assert.ok(
      length >= SEO_DESCRIPTION_MIN_LENGTH && length <= SEO_DESCRIPTION_MAX_LENGTH,
      `${paths[index]} description length is ${length}: ${description}`,
    );
  }
});

test("integrates a compact, touch-safe language switch into the faction gate", async () => {
  const [homePage, globalStyles, zhResponse] = await Promise.all([
    readHomeImplementation(),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    render("/zh-hant/"),
  ]);
  const html = await zhResponse.text();
  const languageLinks = [...html.matchAll(/<a\b[^>]*class="race-gate-language"[^>]*>/gi)];

  assert.match(homePage, /className="race-gate-language-picker"/);
  assert.match(homePage, /className="race-gate-languages"/);
  assert.match(homePage, /siteLocales\.map/);
  assert.match(homePage, /aion2-atlas-locale=\$\{language\}/);
  assert.match(homePage, /surface: "faction_gate"/);
  assert.match(homePage, /focusableControls/);
  assert.match(
    homePage,
    /a\[href\]:not\(\[tabindex="-1"\]\), button:not\(\[disabled\]\), summary:not\(\[tabindex="-1"\]\)/,
  );
  assert.match(
    globalStyles,
    /\.race-gate-language-picker summary\s*\{[^}]*min-height:\s*48px;/,
  );
  assert.match(
    globalStyles,
    /\.race-gate-languages a\s*\{[^}]*min-height:\s*44px;/,
  );
  assert.match(globalStyles, /\.race-gate-languages a:focus-visible\s*\{[^}]*outline:\s*2px solid/);
  assert.match(html, /<details[^>]+class="race-gate-language-picker"/i);
  assert.match(html, /<nav[^>]+class="race-gate-languages"[^>]+aria-label="選擇語言"/i);
  assert.match(html, /href="\/zh-hant\/"[^>]+hrefLang="zh-Hant"[^>]+aria-current="page"/i);
  assert.match(html, /href="\/en\/"[^>]+hrefLang="en"/i);
  assert.match(html, /href="\/ko\/"[^>]+hrefLang="ko"/i);
  assert.equal(languageLinks.length, siteLocales.length);
});

test("keeps the localized home static while hydrating only interactive islands", async () => {
  const [homePage, interactiveShell, checklist] = await Promise.all([
    readFile(
      new URL("../app/_components/home/HomePage.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../app/_components/home/HomeInteractiveShell.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL("../app/_components/home/HomeChecklistCard.tsx", import.meta.url),
      "utf8",
    ),
  ]);

  assert.doesNotMatch(homePage, /^"use client";/u);
  assert.match(homePage, /<HomeInteractiveShell/);
  assert.match(homePage, /<section\s+className="evidence-section"/);
  assert.match(homePage, /<section\s+className="intel-section"/);
  assert.match(interactiveShell, /^"use client";/u);
  assert.match(interactiveShell, /\{children\}/);
  assert.match(interactiveShell, /requestIdleCallback\(activate, \{ timeout: 6000 \}\)/);
  assert.match(interactiveShell, /onPointerEnter=\{onActivate\}/);
  assert.match(interactiveShell, /lazy\(\(\) =>\s+import\("\.\/HomeChecklistCard"\)/);
  assert.match(checklist, /^"use client";/u);
});

test("keeps the mobile faction entrance on a single critical artwork request", async () => {
  const [
    homePage,
    globalStyles,
    globalStylesBoundary,
    layout,
    staticHeaders,
    dualAvif,
    logoAvif,
  ] = await Promise.all([
    readHomeImplementation(),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/GlobalStyles.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
    readFile(new URL("../public/aion2-dual-mobile.avif", import.meta.url)),
    readFile(new URL("../public/aion2-logo-96.avif", import.meta.url)),
  ]);

  assert.doesNotMatch(globalStyles, /@import\s+["']tailwindcss/);
  assert.match(globalStylesBoundary, /^"use client";/u);
  assert.match(globalStylesBoundary, /import "\.\.\/globals\.css";/u);
  assert.doesNotMatch(layout, /import "\.\/globals\.css";/u);
  assert.match(layout, /<GlobalStyles \/>/u);
  assert.match(homePage, /const TRANSPARENT_IMAGE_SOURCE/);
  assert.match(homePage, /media="\(min-width: 761px\)" srcSet="\/aion2-elyos\.webp"/);
  assert.match(homePage, /media="\(min-width: 761px\)" srcSet="\/aion2-asmodian\.webp"/);
  assert.match(homePage, /enteringTheme === "elyos" \? "\/aion2-elyos-mobile\.webp" : TRANSPARENT_IMAGE_SOURCE/);
  assert.match(homePage, /enteringTheme === "asmodian" \? "\/aion2-asmodian-mobile\.webp" : TRANSPARENT_IMAGE_SOURCE/);
  assert.match(homePage, /srcSet=\{hasEntered \? "\/aion2-elyos-mobile\.webp" : TRANSPARENT_IMAGE_SOURCE\}/);
  assert.match(homePage, /srcSet=\{hasEntered \? "\/aion2-asmodian-mobile\.webp" : TRANSPARENT_IMAGE_SOURCE\}/);
  assert.match(homePage, /factionImage\.decode\(\)/);
  assert.match(homePage, /type="image\/avif" srcSet="\/aion2-dual-mobile\.avif"/);
  assert.ok(dualAvif.length < 60_000, `mobile gate AVIF is ${dualAvif.length} bytes`);
  assert.ok(logoAvif.length < 5_000, `compact logo AVIF is ${logoAvif.length} bytes`);
  assert.match(staticHeaders, /\/assets\/\*[\s\S]+max-age=31536000, immutable/);
  assert.match(staticHeaders, /\/aion2-\*\.avif[\s\S]+Content-Type: image\/avif/);
});

test("queues one direct GA4 config, preserves deferred GTM, and keeps the rejection control available", async () => {
  const [layout, analytics, consentManager, zhResponse, enResponse, koResponse] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/analytics/AnalyticsConsentManager.tsx", import.meta.url), "utf8"),
    render("/zh-hant/"),
    render("/en/guides/"),
    render("/ko/tools/"),
  ]);
  const htmlDocuments = await Promise.all([
    zhResponse.text(),
    enResponse.text(),
    koResponse.text(),
  ]);

  assert.match(layout, /const GTM_CONTAINER_ID = "GTM-KGNX3NXL"/);
  assert.match(layout, /const GA4_MEASUREMENT_ID = "G-XDH0X1HZR2"/);
  assert.equal(
    (layout.match(/gtag\('config', '\$\{GA4_MEASUREMENT_ID\}'/g) ?? []).length,
    1,
  );
  assert.equal(
    (layout.match(/googletagmanager\.com\/gtag\/js\?id=\$\{GA4_MEASUREMENT_ID\}/g) ?? []).length,
    1,
  );
  assert.match(layout, /send_page_view: false/);
  assert.match(layout, /window\.aion2Ga4MeasurementId = '\$\{GA4_MEASUREMENT_ID\}'/);
  assert.match(layout, /window\.aion2ConfigureGa4/);
  assert.match(layout, /window\.aion2LoadGa4/);
  assert.match(layout, /analytics_storage: analyticsStorage/);
  assert.match(layout, /var analyticsStorage = choice === 'denied' \? 'denied' : 'granted'/);
  assert.match(layout, /var detailedAnalytics = choice === 'granted'/);
  assert.match(layout, /aion2-analytics-consent-v2/);
  assert.match(layout, /window\.aion2LoadGtm/);
  assert.match(layout, /window\.aion2ScheduleGtm/);
  assert.match(
    layout,
    /window\.aion2LoadGa4\(true\);\s*window\.aion2ScheduleGtm\(\);/,
  );
  assert.match(layout, /analyticsHostname === 'aion2kina\.com'/);
  assert.match(layout, /analyticsHostname === 'www\.aion2kina\.com'/);
  assert.doesNotMatch(layout, /<noscript>/);
  assert.match(analytics, /analyticsWindow\.gtag\("event", event, payload\)/);
  assert.match(analytics, /analyticsWindow\.dataLayer\.push\(detail\)/);
  assert.match(analytics, /readAnalyticsConsent\(\) === "granted"/);
  assert.match(analytics, /isProductionAnalyticsHost\(window\.location\.hostname\)/);
  assert.match(analytics, /export function trackPageView/);
  assert.match(analytics, /analyticsWindow\.gtag\("event", "page_view", payload\)/);
  assert.match(consentManager, /updateGoogleAnalyticsConsent\(next\)/);
  assert.match(consentManager, /deleteStoredJourney\(\)/);
  assert.match(consentManager, /This site uses cookies/);
  assert.match(consentManager, /Analytics cookies \(on by default\)/);
  assert.match(consentManager, /We use essential cookies to keep the site working/);
  assert.doesNotMatch(consentManager, /encrypted connection IP|allowlisted UTM|up to 30 days/);
  assert.match(consentManager, /trackEvent\("analytics_preferences_open"/);
  assert.match(consentManager, /aria-label=\{text\.settings\}/);
  assert.match(consentManager, /setOpen\(false\);\s*setReady\(true\)/);
  assert.match(consentManager, /lastPageViewKey\.current === pageLocation/);
  assert.match(consentManager, /trackPageView\(\{/);

  for (const html of htmlDocuments) {
    const renderedHead = html.slice(0, html.indexOf("</head>"));
    assert.match(renderedHead, /googletagmanager\.com\/gtm\.js\?id=/);
    assert.match(renderedHead, /GTM-KGNX3NXL/);
    assert.equal(
      (renderedHead.match(/<script[^>]+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-XDH0X1HZR2"[^>]*><\/script>/g) ?? []).length,
      0,
    );
    assert.equal(
      (renderedHead.match(/gtag\('config', 'G-XDH0X1HZR2', \{/g) ?? []).length,
      1,
    );
    assert.match(renderedHead, /send_page_view: false/);
    assert.match(renderedHead, /gtag\('consent', 'default'/);
    assert.match(renderedHead, /analytics_storage: analyticsStorage/);
    assert.doesNotMatch(renderedHead, /googletagmanager\.com\/ns\.html\?id=GTM-KGNX3NXL/);
    assert.ok(renderedHead.indexOf("gtag('consent', 'default'") < renderedHead.indexOf("window.aion2ScheduleGtm"));
  }
});

test("uses the AION2 KINA brand and supplied logo across the site", async () => {
  const [layout, homePage, siteShell, zhResponse, enResponse, mapResponse] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readHomeImplementation(),
    readFile(new URL("../app/_components/site/SiteShell.tsx", import.meta.url), "utf8"),
    render("/zh-hant/"),
    render("/en/guides/"),
    render("/ko/tools/map/"),
  ]);
  await Promise.all([
    access(new URL("../public/aion2-logo.png", import.meta.url)),
    access(new URL("../public/aion2-logo.webp", import.meta.url)),
    access(new URL("../public/aion2-logo.avif", import.meta.url)),
    access(new URL("../public/aion2-logo-96.avif", import.meta.url)),
    access(new URL("../public/aion2-logo-96.webp", import.meta.url)),
    access(new URL("../public/aion2-logo-160.webp", import.meta.url)),
    access(new URL("../public/aion2-logo-240.webp", import.meta.url)),
    access(new URL("../public/aion2-icon-48.png", import.meta.url)),
    access(new URL("../public/aion2-icon-512.png", import.meta.url)),
    access(new URL("../public/apple-touch-icon.png", import.meta.url)),
  ]);
  for (const [asset, expectedWidth, expectedHeight] of [
    ["aion2-icon-48.png", 48, 48],
    ["aion2-icon-512.png", 512, 512],
    ["apple-touch-icon.png", 180, 180],
  ]) {
    const png = await readFile(new URL(`../public/${asset}`, import.meta.url));
    assert.equal(png.readUInt32BE(16), expectedWidth);
    assert.equal(png.readUInt32BE(20), expectedHeight);
  }

  for (const source of [layout, homePage, siteShell]) {
    assert.doesNotMatch(source, /AION2 Atlas/);
  }
  assert.match(layout, /url: "\/aion2-icon-48\.png", sizes: "48x48"/);
  assert.match(layout, /url: "\/aion2-icon-512\.png", sizes: "512x512"/);
  assert.match(homePage, /className="race-gate-brand"[\s\S]+src="\/aion2-logo\.webp"/);
  assert.match(homePage, /type="image\/avif" srcSet="\/aion2-logo\.avif"/);
  assert.match(homePage, /srcSet="\/aion2-logo-160\.webp 160w, \/aion2-logo-240\.webp 240w, \/aion2-logo\.webp 287w"/);
  assert.match(homePage, /type="image\/avif" srcSet="\/aion2-dual-mobile\.avif"/);
  assert.match(homePage, /src="\/aion2-dual-mobile\.webp"[\s\S]+fetchPriority="high"/);
  assert.match(homePage, /src=\{hasEntered \? "\/aion2-elyos\.webp" : TRANSPARENT_IMAGE_SOURCE\}[\s\S]+fetchPriority="high"/);
  assert.match(siteShell, /type="image\/avif" srcSet="\/aion2-logo-96\.avif"/);
  assert.match(siteShell, /className="site-brand-logo"[\s\S]+src="\/aion2-logo-96\.webp"/);

  const documents = await Promise.all([
    zhResponse.text(),
    enResponse.text(),
    mapResponse.text(),
  ]);
  for (const html of documents) {
    assert.match(html, /AION2 KINA/);
    assert.match(html, /aion2-(?:logo(?:-96)?\.webp|icon-48\.png)/);
    assert.doesNotMatch(html, /AION2 Atlas/);
  }
  assert.match(documents[0], /"@type":"WebSite"/);
  assert.match(documents[0], /"@type":"Organization"/);
  assert.match(documents[0], /#organization/);
  assert.match(documents[0], /"name":"AION2 KINA"/);
  assert.match(documents[0], /"alternateName":\["KINA","AION2 Kina","aion2kina\.com"\]/);
  const mapHeader = documents[2].slice(
    documents[2].indexOf('<header class="site-shell-header"'),
    documents[2].indexOf("</header>") + "</header>".length,
  );
  assert.match(mapHeader, /class="brand site-shell-brand"/u);
  assert.match(mapHeader, /src="\/aion2-logo-96\.webp"/u);
  assert.match(documents[2], /아이온2 인터랙티브 지도/);
  assert.doesNotMatch(documents.join("\n"), /KINA Atlas/i);
});

test("restores the faction entrance once per browsing session", async () => {
  const [layout, homePage, globalStyles] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readHomeImplementation(),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /aion2-atlas-faction-gate-seen/);
  assert.match(layout, /sessionStorage\.getItem/);
  assert.match(layout, /aion2FactionGateSeen/);
  assert.match(homePage, /FACTION_GATE_SESSION_KEY/);
  assert.match(homePage, /sessionStorage\.setItem\(FACTION_GATE_SESSION_KEY, "true"\)/);
  assert.match(homePage, /const completeFactionGate = useCallback/);
  assert.match(homePage, /aion2ThemeSaved === "true"[\s\S]+aion2FactionGateSeen === "true"/);
  assert.match(homePage, /race-gate-art--mobile-dual/);
  assert.match(homePage, /aion2-dual-mobile\.webp/);
  assert.match(homePage, /aion2-logo\.webp[\s\S]+fetchPriority="high"/);
  assert.match(
    globalStyles,
    /html\[data-aion2-faction-gate-seen="true"\] \.race-gate:not\(\[data-entering="true"\]\)/,
  );
  assert.match(globalStyles, /site-shell-content:has\(\.race-gate:not\(\.race-gate--closed\)\)/);
  assert.match(globalStyles, /\.race-gate-art--mobile-dual\s*\{[^}]*display:\s*block;/);
  assert.match(
    globalStyles,
    /\.race-gate:not\(\[data-entering="true"\]\):not\(\.race-gate--closed\) \+ main \.hero-backdrops\s*\{[^}]*visibility:\s*hidden;/,
  );
  assert.match(
    globalStyles,
    /html:not\(\[data-aion2-faction-gate-seen="true"\]\)[\s\S]+\.race-gate:not\(\[data-entering="true"\]\):not\(\.race-gate--closed\)[\s\S]+\+ main\s*\{[^}]*visibility:\s*hidden;/,
  );
  assert.match(
    globalStyles,
    /\.race-gate-art--mobile-dual img\s*\{[^}]*animation:\s*none;/,
  );
  assert.match(
    globalStyles,
    /html:not\(\[data-aion2-faction-gate-seen="true"\]\):has\(\.race-gate:not\(\.race-gate--closed\)\)\s*\{[^}]*overflow:\s*hidden;/,
  );
  assert.match(globalStyles, /\.race-choice button:focus-visible\s*\{[^}]*outline:\s*none;/);
  assert.match(globalStyles, /\.race-choice button:focus-visible::after\s*\{[^}]*height:\s*2px;/);
  assert.doesNotMatch(
    globalStyles,
    /html\[data-aion2-theme-saved="true"\] \.race-gate/,
  );
});

test("server-renders three localized homepages and keeps map links in the same language", async () => {
  const [zhResponse, enResponse, koResponse] = await Promise.all([
    render("/zh-hant/"),
    render("/en/"),
    render("/ko/"),
  ]);
  assert.equal(zhResponse.status, 200);
  assert.equal(enResponse.status, 200);
  assert.equal(koResponse.status, 200);
  assert.equal(zhResponse.headers.get("content-language"), "zh-Hant");
  assert.equal(enResponse.headers.get("content-language"), "en");
  assert.equal(koResponse.headers.get("content-language"), "ko");
  for (const response of [zhResponse, enResponse, koResponse]) {
    assert.equal(response.headers.get("cache-control"), "public, max-age=0, must-revalidate");
    assert.equal(
      response.headers.get("cdn-cache-control"),
      "public, s-maxage=600, stale-while-revalidate=86400",
    );
  }

  const [zhHtml, enHtml, koHtml] = await Promise.all([
    zhResponse.text(),
    enResponse.text(),
    koResponse.text(),
  ]);

  assert.match(zhHtml, /<html[^>]+lang="zh-Hant"/i);
  assert.match(zhHtml, /<h1[^>]*>AION2 攻略、互動地圖與物品資料庫<\/h1>/);
  assert.match(zhHtml, /兩個世界，一段旅程。/);
  assert.match(zhHtml, /<form[^>]+class="hero-search"[^>]+action="\/zh-hant\/search\/"/i);
  assert.match(zhHtml, /href="\/zh-hant\/guides\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/classes\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/database\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/tools\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/codes\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/news\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/tools\/map\/"/);
  assert.doesNotMatch(zhHtml, /href="\/zh-hant\/database\/items\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/tools\/material-calculator\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/tools\/daily-checklist\/"/);
  assert.match(zhHtml, /class="expedition-card hero-checklist-card"/);
  assert.match(zhHtml, /id="hero-checklist-title"/);
  assert.match(
    zhHtml,
    /class="intel-visual[^"]*"[^>]*data-image-rights="(?:linked-official-media|linked-third-party-media|original)"[\s\S]{0,600}<img[^>]+alt="[^"]+"/i,
  );
  assert.match(zhHtml, /class="intel-card" href="\/zh-hant\/guides\/[^"]+\/"/);
  assert.match(zhHtml, /class="intel-card" href="\/zh-hant\/news\/[^"]+\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/aion-2-release-date\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/aion-2-early-access\/"/);
  assert.match(zhHtml, /site-shell-footer--compact/);
  assert.match(zhHtml, /href="\/zh-hant\/about\/"[^>]*>關於本站</);
  assert.match(zhHtml, /href="\/zh-hant\/contact\/"[^>]*>聯絡與更正</);
  assert.match(zhHtml, /AION2 KINA 如何核對資訊？/);
  assert.doesNotMatch(renderedDescription(zhHtml), /…/u);
  assert.match(zhHtml, /rel="canonical"[^>]+\/zh-hant\//);
  assert.doesNotMatch(zhHtml, /href="#(?:directory|guides|intel)"/);

  assert.match(enHtml, /<html[^>]+lang="en"/i);
  assert.match(enHtml, /<h1[^>]*>AION2 Guides, Interactive Map &amp; Item Database<\/h1>/);
  assert.match(
    enHtml,
    /<meta name="keywords" content="[^"]*AION2 interactive map[^"]*AION2 item database[^"]*"/,
  );
  assert.doesNotMatch(
    enHtml,
    /<h2[^>]*>(?:Language|Choose interface theme)<\/h2>/,
  );
  for (const html of [zhHtml, enHtml, koHtml]) {
    const firstHeading = html.match(/<h([1-6])\b[^>]*>/i);
    assert.equal(firstHeading?.[1], "1");
  }
  assert.match(enHtml, /Two Worlds\. One Journey\./);
  assert.match(enHtml, /href="\/en\/tools\/map\/"/);
  assert.match(enHtml, /href="\/en\/aion-2-release-date\/"/);
  assert.match(enHtml, /href="\/en\/aion-2-early-access\/"/);
  assert.match(enHtml, /href="\/en\/codes\/"/);
  assert.match(enHtml, /<h2[^>]+id="home-sources-title"[^>]*>How does AION2 KINA verify its information\?<\/h2>/);
  assert.match(enHtml, /<blockquote[^>]+cite="https:\/\/about\.ncsoft\.com\/en\/news\/article\/aion2-update-250530-2"/);
  assert.match(
    enHtml,
    /href="https:\/\/aion2\.plaync\.com\/en-us\/conts\/teaser"/,
  );
  assert.match(enHtml, /href="https:\/\/tw\.ncsoft\.com\/aion2\/info\/item"/);
  assert.match(enHtml, /Reviewed by/);
  assert.match(enHtml, /src="\/pfg-avatar\.webp"/i);
  assert.match(enHtml, />PFG</);
  assert.match(enHtml, /href="\/en\/about\/"[^>]*>About</);
  assert.match(enHtml, /href="\/en\/contact\/"[^>]*>Contact</);
  assert.match(enHtml, /href="\/en\/privacy\/"[^>]*>Privacy Policy</);
  assert.match(enHtml, /href="\/en\/terms\/"[^>]*>Terms of Use</);
  const homeJsonLd = renderedJsonLd(enHtml);
  assert.match(homeJsonLd, /"@type":"FAQPage"/);
  assert.match(homeJsonLd, /"@type":"VideoGame"/);
  assert.match(homeJsonLd, /"datePublished":"2026-07-15"/);
  assert.match(homeJsonLd, /"dateModified":"2026-07-23"/);
  assert.match(homeJsonLd, /"author":\{"@id":"[^"\\]+#organization"\}/);
  assert.match(homeJsonLd, /"reviewedBy":\{"@id":"[^"\\]*\/en\/author\/pfg\/#person"\}/);
  assert.match(homeJsonLd, /"@type":"Person"/);
  assert.match(homeJsonLd, /"name":"PFG"/);
  assert.match(
    homeJsonLd,
    /"sameAs":\["https:\/\/aion2\.plaync\.com\/en-us\/conts\/teaser","https:\/\/store\.steampowered\.com\/app\/3393110\/AION_2\/","https:\/\/tw\.ncsoft\.com\/aion2\/index\?redirect=false"\]/,
  );
  assert.match(homeJsonLd, /"citation":\[/);

  assert.match(koHtml, /<html[^>]+lang="ko"/i);
  assert.match(koHtml, /<h1[^>]*>AION2 공략, 인터랙티브 지도와 아이템 데이터베이스<\/h1>/);
  assert.match(koHtml, /두 세계, 하나의 여정\./);
  assert.match(koHtml, /href="\/ko\/tools\/map\/"/);
  assert.match(koHtml, /href="\/ko\/codes\/"/);
  assert.match(koHtml, /AION2 KINA는 정보를 어떻게 확인하나요\?/);
  assert.match(koHtml, /hrefLang="zh-Hant"/i);
});

test("renders an accessible trilingual global Early Access countdown without inventing an opening time", async () => {
  const [component, styles, zhResponse, enResponse, koResponse] = await Promise.all([
    readFile(new URL("../app/_components/home/GlobalLaunchCountdown.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/home/GlobalLaunchCountdown.module.css", import.meta.url), "utf8"),
    render("/zh-hant/"),
    render("/en/"),
    render("/ko/"),
  ]);
  const [zhHtml, enHtml, koHtml] = await Promise.all([
    zhResponse.text(),
    enResponse.text(),
    koResponse.text(),
  ]);

  assert.equal(globalLaunchCountdownConfig.earlyAccessDate, "2026-09-30");
  assert.equal(globalLaunchCountdownConfig.earlyAccessDurationDays, 5);
  assert.equal(globalLaunchCountdownConfig.publicLaunchDate, undefined);
  assert.deepEqual(
    getGlobalLaunchCountdownState(new Date(2026, 8, 29, 23, 59)),
    { days: 1, phase: "early-access-countdown" },
  );
  assert.deepEqual(
    getGlobalLaunchCountdownState(new Date(2026, 8, 30, 0, 0)),
    { days: 0, phase: "early-access-live" },
  );
  assert.deepEqual(
    getGlobalLaunchCountdownState(new Date(2026, 9, 5, 0, 0)),
    { days: null, phase: "launch-date-pending" },
  );
  assert.deepEqual(
    getGlobalLaunchCountdownState(
      new Date(2026, 9, 5, 0, 0),
      { earlyAccessDate: "2026-09-30", earlyAccessDurationDays: 5 },
    ),
    { days: null, phase: "launch-date-pending" },
  );
  assert.deepEqual(
    getGlobalLaunchCountdownState(
      new Date(2026, 9, 1, 0, 0),
      { ...globalLaunchCountdownConfig, publicLaunchDate: "2026-10-08" },
    ),
    { days: 7, phase: "public-launch-countdown" },
  );
  assert.deepEqual(
    getGlobalLaunchCountdownState(
      new Date(2026, 9, 8, 0, 0),
      { ...globalLaunchCountdownConfig, publicLaunchDate: "2026-10-08" },
    ),
    { days: 0, phase: "launched" },
  );
  assert.equal(formatGlobalLaunchDate("2030-01-02", "en"), "January 2, 2030");
  assert.equal(formatGlobalLaunchDate("2030-01-02", "zh-hant"), "2030年1月2日");
  assert.equal(formatGlobalLaunchDate("2030-01-02", "ko"), "2030년 1월 2일");

  assert.match(component, /aria-labelledby="global-launch-countdown-title"/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /dateTime=\{config\.earlyAccessDate\}/);
  assert.match(component, /NC has not confirmed the full-launch date or opening time/);
  assert.match(component, /Steam 目前標示「搶先遊玩於 9 月 30 日開始」/);
  assert.match(component, /Steam에는 현재 “얼리 액세스 9월 30일 시작”으로 표시/);
  assert.match(component, /trackEvent\("content_card_click"/);
  assert.match(component, /service: "global"/);
  assert.match(component, /Steam’s pack pages currently list October 5, 2026/);
  assert.doesNotMatch(component, /2026-09-30T|2026-10-05T|00:00(?::00)?Z/);
  assert.match(styles, /min-height:\s*280px/);
  assert.match(styles, /font-variant-numeric:\s*tabular-nums/);
  assert.match(styles, /@media \(max-width: 620px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

  for (const [locale, html] of [
    ["zh-hant", zhHtml],
    ["en", enHtml],
    ["ko", koHtml],
  ]) {
    assert.match(html, /id="global-launch-countdown-title"/);
    assert.match(html, /dateTime="2026-09-30"/i);
    assert.match(
      html,
      new RegExp(`href="/${locale}/aion-2-release-date/"`),
    );
    assert.match(
      html,
      new RegExp(`href="/${locale}/guides/beginner-launch-checklist/"`),
    );
    assert.match(
      html,
      new RegExp(`href="/${locale}/aion-2-early-access/"`),
    );
  }
});

test("publishes localized trust pages with provenance and policy navigation", async () => {
  const locales = siteLocales;
  const kinds = ["about", "contact", "privacy", "terms"];
  const responses = await Promise.all(
    locales.flatMap((locale) => kinds.map((kind) => render(`/${locale}/${kind}/`))),
  );

  for (const [index, response] of responses.entries()) {
    const locale = locales[Math.floor(index / kinds.length)];
    const kind = kinds[index % kinds.length];
    assert.equal(response.status, 200, `${locale}/${kind} should render`);
    const html = await response.text();
    const jsonLd = renderedJsonLd(html);
    assert.match(html, new RegExp(`rel="canonical"[^>]+/${locale}/${kind}/`, "i"));
    for (const language of siteLocales) {
      assert.match(
        html,
        new RegExp(`hreflang="${siteLocaleConfig[language].hreflang}"`, "i"),
      );
    }
    assert.match(html, /<h1[^>]*>[^<]+<\/h1>/i);
    assert.match(html, /<time[^>]+datetime="2026-07-25"/i);
    assert.match(html, /src="\/pfg-avatar\.webp"/i);
    assert.match(jsonLd, /"@type":"Person"/);
    assert.match(
      jsonLd,
      new RegExp(`"author":\\{"@id":"[^"\\\\]*/${locale}/author/pfg/#person"\\}`),
    );
    assert.match(jsonLd, /"publisher":\{"@id":"[^"\\]+#organization"\}/);
    assert.match(jsonLd, /"dateModified":"2026-07-25"/);
  }

  const sitemapResponse = await renderRequest("https://aion2kina.com/sitemaps/pages-en.xml", {
    env: { SITE_URL: "https://aion2kina.com" },
  });
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const kind of kinds) {
    assert.match(sitemap, new RegExp(`https://aion2kina\\.com/en/${kind}/`));
  }

  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
  assert.match(llms, /^# AION2 KINA/m);
  assert.match(llms, /Primary site author: PFG/);
  assert.match(llms, /Canonical: https:\/\/www\.aion2kina\.com\//);
  assert.match(llms, /https:\/\/www\.aion2kina\.com\/sitemap\.xml/);
  assert.match(llms, /\[Guides\]\(https:\/\/www\.aion2kina\.com\/en\/guides\/\)/);
  assert.match(llms, /\[AION 2 Wiki hub\]\(https:\/\/www\.aion2kina\.com\/en\/aion-2-wiki\/\)/);
  assert.match(llms, /https:\/\/www\.aion2kina\.com\/en\/aion-2-server-regions\//);
  assert.match(llms, /\[XML sitemap\]\(https:\/\/www\.aion2kina\.com\/sitemap\.xml\)/);
  assert.match(llms, /Map points are curated by AION2 KINA, reviewed in game, and checked against NC official information and third-party guide data \(Atreia Guide\)/);
  assert.doesNotMatch(llms, /Raw official map and item records/u);
  for (const locale of siteLocales) {
    assert.match(llms, new RegExp(`/${locale}/`));
  }
  assert.doesNotMatch(
    llms,
    /Equivalent content is available under \/zh-hant\/ and \/ko\//u,
  );
});

test("removes the disposable starter preview", async () => {
  const [page, homePage, siteShell, layout, packageJson, mapExperience, globalStyles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readHomeImplementation(),
    readFile(new URL("../app/_components/site/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/MapExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /redirect\(localizedHref\(locale\)\)/);
  assert.doesNotMatch(page, /language-entry|Choose your language/);
  assert.match(siteShell, /aion2-atlas-theme/);
  assert.match(siteShell, /from "\.\/SiteThemeContext"/);
  assert.match(homePage, /@\/app\/_components\/site\/SiteThemeContext/);
  assert.match(siteShell, /startViewTransition/);
  assert.match(siteShell, /prefers-reduced-motion: reduce/);
  assert.match(siteShell, /inert=\{menuOpen \? true : undefined\}/);
  assert.match(siteShell, /inert=\{!menuOpen \? true : undefined\}/);
  assert.match(siteShell, /window\.cancelAnimationFrame\(focusFrame\)/);
  assert.match(siteShell, /focusTarget\?\.isConnected/);
  assert.match(siteShell, /aria-hidden="true"[\s\S]+tabIndex=\{-1\}/);
  assert.match(siteShell, /locationSearch/);
  assert.match(homePage, /race-gate--settling/);
  assert.match(homePage, /race-gate-languages/);
  assert.match(homePage, /--theme-frame-height/);
  assert.match(homePage, /onAnimationEnd=\{handleGateAnimationEnd\}/);
  assert.match(homePage, /onTransitionEnd=\{handleGateTransitionEnd\}/);
  assert.match(homePage, /aria-modal="true"/);
  assert.match(homePage, /querySelector<HTMLElement>\("\.hero-backdrops"\)/);
  assert.match(homePage, /hero\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(homePage, /\.site-shell-skip-link, \.site-shell-header, \.site-shell-footer/);
  assert.match(
    homePage,
    /disabled=\{Boolean\(preparingTheme\) \|\| hasEntered\}/,
  );
  assert.match(homePage, /className="expedition-card hero-checklist-card"/);
  assert.doesNotMatch(homePage, /home-checklist-section/);
  assert.match(
    globalStyles,
    /race-gate--settling\.race-gate--entering-asmodian[\s\S]+object-position: center top/,
  );
  assert.match(
    globalStyles,
    /\.hero-inner\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) minmax\(320px, 400px\);/,
  );
  assert.match(
    globalStyles,
    /\.site-shell \.hero-search input:focus,[\s\S]*?\.site-shell \.hero-search input:focus-visible\s*\{[^}]*outline:\s*none;[^}]*box-shadow:\s*none;/,
  );
  assert.match(
    globalStyles,
    /\.hero-search:focus-within\s*\{[^}]*border-color:\s*var\(--accent\);[^}]*box-shadow:/,
  );
  assert.match(homePage, /const THEME_FRAME_PROPERTIES = \["top", "left", "width", "height"\] as const/);
  assert.match(homePage, /pendingThemeFramePropertiesRef/);
  assert.match(homePage, /completedThemeFramePropertiesRef/);
  assert.match(homePage, /classList\.contains\(`race-gate-art--\$\{enteringTheme\}`\)/);
  assert.match(homePage, /\[\.\.\.pending\]\.every\(\(property\) => completed\.has\(property\)\)/);
  assert.doesNotMatch(
    homePage,
    /if \(!\["top", "left", "width", "height"\]\.includes\(event\.propertyName\)\) return;\s+setHasEntered\(true\)/,
  );
  assert.doesNotMatch(homePage, /setTimeout\(\(\) => setIsSettlingTheme\(true\), 880\)/);
  assert.doesNotMatch(homePage, /setTimeout\(\(\) => setHasEntered\(true\), 1460\)/);
  assert.match(homePage, /INTERFACE 01 \/ ELYOS/);
  assert.match(homePage, /INTERFACE 02 \/ ASMODIAN/);
  assert.match(layout, /AION2 KINA/);
  assert.match(layout, /themeBootstrapScript/);
  assert.match(layout, /aion2ThemeSaved/);
  assert.match(mapExperience, /initialServerLocale=\{props\.initialLocale\}/);
  assert.match(mapExperience, /initialMapName=\{props\.initialMapName\}/);
  assert.match(mapExperience, /\s+embedded\s*\/>/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/", templateRoot)));
});

test("keeps the language menu available across tablet breakpoints", async () => {
  const [siteShell, siteShellStyles] = await Promise.all([
    readFile(new URL("../app/_components/site/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-shell.css", import.meta.url), "utf8"),
  ]);
  const tabletStart = siteShellStyles.indexOf("@media (max-width: 980px)");
  const phoneStart = siteShellStyles.indexOf("@media (max-width: 760px)");
  assert.ok(tabletStart > 0 && phoneStart > tabletStart);
  assert.match(
    siteShellStyles.slice(0, tabletStart),
    /\.site-shell-menu-button\s*\{[\s\S]*?display:\s*none;/,
  );
  assert.match(
    siteShellStyles.slice(tabletStart, phoneStart),
    /\.site-shell-menu-button\s*\{[\s\S]*?display:\s*inline-flex;/,
  );
  assert.match(siteShell, /\{languageSwitcher\(true\)\}/);
});

test("bundles the interactive map runtime for same-origin loading", async () => {
  const [mapExperience, mapDetail, worker, viteConfig, runtimeVars] = await Promise.all([
    readFile(new URL("../app/map-app/MapExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/[map]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../build/sites-runtime-vars.ts", import.meta.url), "utf8"),
    access(new URL("data/map-source/aion2-map-data.json", templateRoot)),
    access(new URL("data/map-source/aion2-map-i18n.json", templateRoot)),
    access(new URL("public/map-assets/manifest.json", templateRoot)),
    access(new URL("public/map-assets/maps/tiles/verteron/0/0/0.webp", templateRoot)),
  ]);

  assert.doesNotMatch(mapExperience, /fallbackBasePath/);
  assert.match(mapDetail, /assetBasePath=\{mapAssetReleaseBasePath\}/);
  assert.doesNotMatch(worker, /panfogao\.chatgpt\.site/u);
  assert.match(viteConfig, /createSitesRuntimeVars\([\s\S]*?mapManifest\.versionKey/u);
  assert.match(runtimeVars, /MAP_RELEASE_BOOTSTRAP_VERSION:\s*mapReleaseBootstrapVersion/u);
  assert.match(worker, /await env\.ASSETS\.fetch\(new Request\(localAssetUrl, request\)\)/);
  assert.match(worker, /url\.pathname\.startsWith\("\/map-runtime\/"\)/);
  assert.match(worker, /const isLegacyRootMapAssetRequest = LEGACY_MAP_ASSET_PATH\.test\(url\.pathname\)/);
  assert.match(worker, /`\/releases\/\$\{mapManifest\.versionKey\}\$\{assetPath\}`/);
  assert.match(worker, /import mapManifest from "\.\.\/public\/map-assets\/manifest\.json"/);
  assert.match(worker, /VERSIONED_MAP_ASSET_PATH/);
  assert.match(worker, /versionedAsset\[1\] !== mapManifest\.versionKey/);
  assert.match(worker, /return `\/map-assets\/\$\{versionedAsset\[2\]\}\/\$\{versionedAsset\[3\]\}`/);
  assert.match(worker, /localMapAssetPath\(assetPath\)/);
  assert.match(worker, /assetPath === "\/manifest\.json"/);
  assert.match(worker, /assetPath\.startsWith\("\/bundles\/"\)/);
  assert.match(worker, /assetPath\.startsWith\("\/releases\/"\)/);
  assert.match(worker, /assetPath\.startsWith\("\/data\/"\)/);
  assert.match(worker, /isAllowedMapRuntimeAssetPath\(assetPath\)/);
  assert.match(worker, /upstreamUrl\.origin === configuredOrigin\.origin/);
  assert.match(worker, /redirect: "manual"/);
  assert.match(worker, /MAP_ASSETS\?: MapReleaseBucket/);
  assert.match(worker, /handleMapReleaseAdmin\(request, env \?\? \{\}\)/);
  assert.match(worker, /MAP_RELEASE_BOOTSTRAP_VERSION/);
  assert.match(worker, /bucket\.get\("channels\/stable\.json"\)/);
  assert.match(worker, /retiredAssetPath[\s\S]{0,300}status: 404/);
  assert.match(viteConfig, /binding: "ASSETS"/);
  assert.doesNotMatch(viteConfig, /run_worker_first/);
  assert.doesNotMatch(worker, /url\.pathname\.startsWith\("\/map-runtime\/"\)[\s\S]{0,1200}status:\s*307/);
});

test("uses the requested map in the embedded shi runtime", async () => {
  const [mapExperience, interactiveMap, mapLibreMap, mapLayout, activationStyles, mapAppStyles, mapSeoStyles] = await Promise.all([
    readFile(new URL("../app/map-app/MapExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/InteractiveMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/MapLibreMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/map-activation.css", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/map-app.css", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/map-seo.css", import.meta.url), "utf8"),
  ]);

  assert.match(mapExperience, /initialServerLocale=\{props\.initialLocale\}/u);
  assert.match(mapExperience, /initialMapName=\{props\.initialMapName\}/u);
  assert.match(mapExperience, /\s+embedded\s*\/>/u);
  assert.match(interactiveMap, /initialMapName = "World_L_A"/u);
  assert.match(interactiveMap, /useState\(initialMapName\)/u);
  assert.match(interactiveMap, /map\.name === initialMapName/u);
  assert.match(interactiveMap, /"\/data\/aion2-map-data\.json"/u);
  assert.match(interactiveMap, /"\/data\/aion2-map-i18n\.json"/u);
  assert.match(mapLibreMap, /const MARKER_ICON_SCALE = 1\.5/u);
  assert.match(mapLibreMap, /const MAX_ZOOM_OVERSCALE = 0\.5/u);
  assert.match(mapLayout, /import "\.\/map-app\.css"/u);
  assert.match(activationStyles, /^\.map-activation-shell\s*\{/mu);
  assert.doesNotMatch(activationStyles, /^\.map-shell\s*\{/mu);
  assert.match(mapAppStyles, /\.map-shell\s*\{[\s\S]+grid-template-columns: 360px minmax\(0, 1fr\)/u);
  assert.match(mapSeoStyles, /\.map-seo-embed\s*\{[^}]*scroll-margin-top: 72px/u);
  assert.match(mapSeoStyles, /\.map-seo-embed\s*\{[^}]*overflow-anchor: none/u);
  assert.match(mapSeoStyles, /\.map-seo-site\s*\{[^}]*overflow-anchor: none/u);
  assert.match(mapSeoStyles, /@media \(max-width: 980px\)[\s\S]+\.map-seo-embed\s*\{[^}]*scroll-margin-top: 124px/u);
  assert.doesNotMatch(mapSeoStyles, /\.map-seo-embed\s*\{[^}]*scroll-margin-top: 0/u);
});

test("ships the complete interactive map layout CSS with the rendered route", async () => {
  const response = await render("/en/tools/map/");
  assert.equal(response.status, 200);

  const html = await response.text();
  const stylesheetHrefs = [...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*>/giu)]
    .map(([tag]) => tag.match(/\bhref="([^"]+\.css(?:\?[^"]*)?)"/iu)?.[1])
    .filter(Boolean);
  assert.ok(stylesheetHrefs.length > 0, "the map route must reference at least one stylesheet");

  const stylesheets = await Promise.all(stylesheetHrefs.map(async (href) => {
    const pathname = new URL(href, "https://local.invalid").pathname;
    return readFile(new URL(`../dist/client${pathname}`, import.meta.url), "utf8");
  }));
  const css = stylesheets.join("\n");
  const normalizedRuleBodies = (selector) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/gu)]
    .filter(([, selectorList]) => selectorList
      .split(",")
      .some((candidate) => candidate.trim() === selector))
    .map(([, , body]) => body.replace(/\s+/gu, "").toLowerCase());
  const expectRuleTokens = (selector, tokens) => {
    const bodies = normalizedRuleBodies(selector);
    assert.ok(
      bodies.some((body) => tokens.every((token) => body.includes(token))),
      `${selector} must include ${tokens.join(", ")} in one shipped rule`,
    );
  };

  expectRuleTokens(".map-shell", ["display:grid", "grid-template-columns:360px"]);
  expectRuleTokens(".map-sidebar", ["display:flex", "flex-direction:column"]);
  expectRuleTokens(".map-workspace", ["display:flex", "position:relative"]);
  expectRuleTokens(".map-viewport", ["position:relative", "overflow:hidden"]);
  expectRuleTokens(".maplibregl-map", ["position:relative", "overflow:hidden"]);
});

test("rejects malformed map runtime paths before local or upstream fetches", async () => {
  const worker = await loadWorker();
  let localFetches = 0;
  let upstreamFetches = 0;
  const originalFetch = globalThis.fetch;
  const unsafeVersion = `sha256-${"a".repeat(64)}`;
  globalThis.fetch = async () => {
    upstreamFetches += 1;
    return new Response("unexpected upstream response");
  };

  try {
    for (const pathname of [
      "/map-runtime//attacker.example/payload",
      "/map-runtime/%2f%2fattacker.example/payload",
      "/map-runtime/%5c%5cattacker.example/payload",
      `/map-runtime/releases/${unsafeVersion}/maps//attacker.example/payload`,
      "/map-runtime/not-an-asset",
    ]) {
      const response = await worker.fetch(
        new Request(`http://localhost${pathname}`),
        {
          ASSETS: {
            fetch: async () => {
              localFetches += 1;
              return new Response("Not found", { status: 404 });
            },
          },
          MAP_ORIGIN: "https://configured-map-origin.example",
        },
        { waitUntil() {}, passThroughOnException() {} },
      );
      assert.equal(response.status, 404);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(localFetches, 0);
  assert.equal(upstreamFetches, 0);
});

test("serves the active R2 manifest through the stable channel pointer", async () => {
  const worker = await loadWorker();
  const manifest = JSON.parse(
    await readFile(new URL("../public/map-assets/manifest.json", import.meta.url), "utf8"),
  );
  const manifestKey = `releases/${manifest.versionKey}/manifest.json`;
  const manifestBody = JSON.stringify(manifest);
  const reads = [];
  let localFetches = 0;
  const object = (body, contentType = "application/json; charset=utf-8") => ({
    body: new Response(body).body,
    httpEtag: '"test-etag"',
    text: async () => body,
    writeHttpMetadata: (headers) => headers.set("content-type", contentType),
  });
  const objects = new Map([
    ["channels/stable.json", JSON.stringify({
      schemaVersion: 1,
      versionKey: manifest.versionKey,
      manifestKey,
    })],
    [manifestKey, manifestBody],
  ]);

  const response = await worker.fetch(
    new Request("http://localhost/map-runtime/manifest.json"),
    {
      MAP_ASSETS: {
        get: async (key) => {
          reads.push(key);
          const body = objects.get(key);
          return body ? object(body) : null;
        },
      },
      ASSETS: {
        fetch: async () => {
          localFetches += 1;
          return new Response("Not found", { status: 404 });
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(reads, ["channels/stable.json", manifestKey]);
  assert.equal(localFetches, 0);
  assert.equal(response.headers.get("etag"), '"test-etag"');
  assert.deepEqual(JSON.parse(await response.text()), manifest);
});

test("never hides a missing immutable R2 object behind local or upstream fallback", async () => {
  const worker = await loadWorker();
  const manifest = JSON.parse(
    await readFile(new URL("../public/map-assets/manifest.json", import.meta.url), "utf8"),
  );
  const bundlePath = `/map-runtime/bundles/${manifest.versionKey}/en/verteron.json`;
  let localFetches = 0;
  let upstreamFetches = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    upstreamFetches += 1;
    return new Response("unexpected upstream response");
  };

  try {
    const response = await worker.fetch(
      new Request(`http://localhost${bundlePath}`),
      {
        MAP_ASSETS: { get: async () => null },
        ASSETS: {
          fetch: async () => {
            localFetches += 1;
            return new Response("unexpected local response");
          },
        },
        MAP_ORIGIN: "https://configured-map-origin.example",
      },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 404);
    assert.equal(response.headers.get("cache-control"), "no-store");
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(localFetches, 0);
  assert.equal(upstreamFetches, 0);
});

test("rejects retired map bundle versions before reading public storage", async () => {
  const worker = await loadWorker();
  let bucketReads = 0;
  let localFetches = 0;
  const retiredVersion = `sha256-${"0".repeat(64)}`;
  const response = await worker.fetch(
    new Request(
      `http://localhost/map-runtime/bundles/${retiredVersion}/en/verteron.json`,
    ),
    {
      MAP_ASSETS: {
        get: async () => {
          bucketReads += 1;
          return null;
        },
      },
      ASSETS: {
        fetch: async () => {
          localFetches += 1;
          return new Response("unexpected local response");
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 404);
  assert.equal(bucketReads, 0);
  assert.equal(localFetches, 0);
});

test("R2 bootstrap fallback is exact-version, missing-pointer-only, and no-store", async () => {
  const worker = await loadWorker();
  const manifest = JSON.parse(
    await readFile(new URL("../public/map-assets/manifest.json", import.meta.url), "utf8"),
  );
  const manifestBody = JSON.stringify(manifest);
  const context = { waitUntil() {}, passThroughOnException() {} };
  let localFetches = 0;
  const localAssets = {
    fetch: async (request) => {
      localFetches += 1;
      return new URL(request.url).pathname === "/map-assets/manifest.json"
        ? new Response(manifestBody, {
            headers: { "content-type": "application/json; charset=utf-8" },
          })
        : new Response("Not found", { status: 404 });
    },
  };

  const bootstrapResponse = await worker.fetch(
    new Request("http://localhost/map-runtime/manifest.json"),
    {
      MAP_ASSETS: {
        get: async () => null,
      },
      MAP_RELEASE_BOOTSTRAP_VERSION: manifest.versionKey,
      ASSETS: localAssets,
    },
    context,
  );
  assert.equal(bootstrapResponse.status, 200);
  assert.equal(bootstrapResponse.headers.get("cache-control"), "no-store");
  assert.deepEqual(JSON.parse(await bootstrapResponse.text()), manifest);
  assert.equal(localFetches, 1);

  const malformedPointer = {
    body: new Response("not-json").body,
    text: async () => "not-json",
  };
  const invalidResponse = await worker.fetch(
    new Request("http://localhost/map-runtime/manifest.json"),
    {
      MAP_ASSETS: { get: async () => malformedPointer },
      MAP_RELEASE_BOOTSTRAP_VERSION: manifest.versionKey,
      ASSETS: localAssets,
    },
    context,
  );
  assert.equal(invalidResponse.status, 503);
  assert.equal(invalidResponse.headers.get("x-atlas-r2-state"), "invalid-pointer");
  assert.equal(localFetches, 1);

  const bundlePath = `/map-runtime/bundles/${manifest.versionKey}/en/verteron.json`;
  const stableExistsResponse = await worker.fetch(
    new Request(`http://localhost${bundlePath}`),
    {
      MAP_ASSETS: {
        get: async () => null,
        head: async (key) => key === "channels/stable.json" ? { size: 1 } : null,
      },
      MAP_RELEASE_BOOTSTRAP_VERSION: manifest.versionKey,
      ASSETS: localAssets,
    },
    context,
  );
  assert.equal(stableExistsResponse.status, 404);
  assert.equal(stableExistsResponse.headers.get("cache-control"), "no-store");
  assert.equal(localFetches, 1);
});

test("server-renders real localized content hubs and keeps language-aware links", async () => {
  const mapManifest = JSON.parse(
    await readFile(new URL("../public/map-assets/manifest.json", import.meta.url), "utf8"),
  );
  const versionedMapPreview =
    `/map-runtime/releases/${mapManifest.versionKey}/maps/tiles/verteron/0/0/0.webp`;
  const [guidesResponse, toolsResponse, newsResponse] = await Promise.all([
    render("/en/guides/"),
    render("/zh-hant/tools/"),
    render("/ko/news/"),
  ]);
  assert.equal(guidesResponse.status, 200);
  assert.equal(toolsResponse.status, 200);
  assert.equal(newsResponse.status, 200);

  const [guidesHtml, toolsHtml, newsHtml] = await Promise.all([
    guidesResponse.text(),
    toolsResponse.text(),
    newsResponse.text(),
  ]);
  assert.match(guidesHtml, /<h1[^>]*>AION2 Guides: New Player, Systems &amp; Progression<\/h1>/i);
  assert.doesNotMatch(guidesHtml, /name="robots"[^>]+noindex/i);
  assert.match(guidesHtml, /href="\/en\/classes\/"/);
  assert.match(guidesHtml, /href="\/zh-hant\/guides\/"/);
  assert.match(guidesHtml, /href="\/en\/guides\/interactive-map-quickstart\/"/);
  assert.ok(guidesHtml.includes(versionedMapPreview));
  assert.doesNotMatch(guidesHtml, /(?:src|content)="[^"]*\/map-assets\/maps\/tiles\/verteron\/0\/0\/0\.webp"/i);
  assert.match(guidesHtml, /Browse content/);
  assert.match(guidesHtml, /property="og:title"[^>]+AION2 Guides/i);
  assert.match(guidesHtml, /name="twitter:title"[^>]+AION2 Guides/i);
  assert.match(toolsHtml, /<h1[^>]*>AION2 工具：互動地圖與玩家規劃<\/h1>/);
  assert.match(toolsHtml, /href="\/zh-hant\/tools\/map\/"/);
  assert.match(
    toolsHtml,
    /"url":"\/zh-hant\/tools\/"/,
  );
  assert.match(toolsHtml, /BreadcrumbList/);
  assert.match(toolsHtml, /name="twitter:title"[^>]+AION2 工具/i);
  assert.doesNotMatch(toolsHtml, /href="\/zh-hant\/tools\/build-planner\/"/);
  assert.match(newsHtml, /AION2 뉴스: 공식 소식과 업데이트/);
  assert.match(newsHtml, /CollectionPage/);
  assert.match(newsHtml, /BreadcrumbList/);
  assert.match(newsHtml, /href="\/ko\/guides\/"/);
  assert.match(newsHtml, /href="\/ko\/news\/chapter-1-lands-of-sand-and-snow\/"/);
});

test("keeps internal site-operation announcements out of the public news experience", async () => {
  const [newsResponse, homeResponse, retiredResponse] = await Promise.all([
    render("/zh-hant/news/"),
    render("/zh-hant/"),
    render("/zh-hant/news/atlas-editorial-desk-launch/"),
  ]);
  assert.equal(newsResponse.status, 200);
  assert.equal(homeResponse.status, 200);
  assert.equal(retiredResponse.status, 404);
  assert.equal(retiredResponse.headers.get("location"), null);
  assert.match(
    await retiredResponse.clone().text(),
    /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/i,
  );

  const [newsHtml, homeHtml] = await Promise.all([
    newsResponse.text(),
    homeResponse.text(),
  ]);
  assert.doesNotMatch(newsHtml, /atlas-editorial-desk-launch|建立三語內容與更正流程/u);
  assert.doesNotMatch(homeHtml, /atlas-editorial-desk-launch|建立三語內容與更正流程/u);
  assert.match(homeHtml, /href="\/zh-hant\/database\/map-data-methodology\/"/u);
  assert.match(homeHtml, />查看資料來源說明</u);
});

test("server-renders all localized code pages with concealed codes, complete SEO, history, and redemption guidance", async () => {
  const scenarios = siteLocales.map((locale) => ({ locale }));
  const responses = await Promise.all(
    scenarios.map(({ locale }) => render(`/${locale}/codes/`)),
  );

  for (const response of responses) {
    assert.equal(response.status, 200);
  }

  const documents = await Promise.all(responses.map((response) => response.text()));
  for (const [index, html] of documents.entries()) {
    const { locale } = scenarios[index];
    const copy = codePageCopy[locale];
    const decodedHtml = decodeHtml(html);
    const linkTags = [...html.matchAll(/<link\b[^>]*>/giu)].map((match) => match[0]);
    const canonicalLinks = linkTags.filter((tag) =>
      htmlAttribute(tag, "rel").toLowerCase() === "canonical");
    const alternates = new Map(
      linkTags
        .filter((tag) => htmlAttribute(tag, "rel").toLowerCase() === "alternate")
        .map((tag) => [
          htmlAttribute(tag, "hreflang"),
          htmlAttribute(tag, "href"),
        ]),
    );

    assert.equal(canonicalLinks.length, 1);
    const canonicalUrl = new URL(htmlAttribute(canonicalLinks[0], "href"));
    assert.equal(canonicalUrl.pathname, `/${locale}/codes/`);
    assert.deepEqual(Object.fromEntries(alternates), {
      ...Object.fromEntries(
        siteLocales.map((language) => [
          siteLocaleConfig[language].hrefLang,
          `${canonicalUrl.origin}/${language}/codes/`,
        ]),
      ),
      "x-default": `${canonicalUrl.origin}/en/codes/`,
    });
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);
    assert.equal((html.match(/<h1\b/giu) ?? []).length, 1);
    assert.ok(decodedHtml.includes(copy.title));
    assert.match(html, /property="og:title"/i);
    assert.match(html, /name="twitter:title"/i);
    assert.ok(Array.from(renderedDescription(html)).length >= SEO_DESCRIPTION_MIN_LENGTH);
    assert.ok(Array.from(renderedDescription(html)).length <= SEO_DESCRIPTION_MAX_LENGTH);

    const revealControls = [
      ...html.matchAll(/<(?:div|section)\b[^>]*data-code-reveal-control\b[^>]*>/giu),
    ];
    const revealTriggers = [
      ...html.matchAll(
        /<button\b[^>]*data-code-reveal="trigger"[^>]*>[\s\S]*?<\/button>/giu,
      ),
    ];
    assert.equal(revealControls.length, aion2CodeRegistry.length);
    assert.equal(revealTriggers.length, aion2CodeRegistry.length);
    assert.ok(
      revealTriggers.every((match) =>
        decodeHtml(match[0]).includes(copy.showCodeLabel)),
      `${locale} must initially label every code control with the localized show action`,
    );
    assert.doesNotMatch(html, /data-state="(?:loading|revealed)"/iu);

    for (const entry of aion2CodeRegistry) {
      const cardHtml = html.match(
        new RegExp(
          `<article\\b(?=[^>]*\\bid="${entry.id}")[^>]*>[\\s\\S]*?</article>`,
          "iu",
        ),
      )?.[0] ?? "";
      assert.ok(cardHtml, `${locale} is missing the card for ${entry.id}`);
      assert.doesNotMatch(
        cardHtml,
        new RegExp(`<code\\b[^>]*>\\s*${entry.code}\\s*</code>`, "iu"),
        `${entry.code} must not be exposed in a server-rendered code element`,
      );
      assert.ok(
        !decodeHtml(cardHtml).includes(entry.code),
        `${entry.code} must remain concealed inside its server-rendered card`,
      );
      assert.ok(
        decodedHtml.includes(entry.period[locale].from),
        `${locale} is missing the start of ${entry.code}`,
      );
      assert.ok(
        decodedHtml.includes(entry.period[locale].until),
        `${locale} is missing the end of ${entry.code}`,
      );
    }
    for (const step of copy.inGameSteps) {
      assert.ok(decodedHtml.includes(step), `${locale} is missing an in-game redemption step`);
    }
    for (const step of copy.webSteps) {
      assert.ok(decodedHtml.includes(step), `${locale} is missing an official-web redemption step`);
    }
    assert.ok(decodedHtml.includes(copy.showCodeLabel));
    assert.ok(
      html.includes(officialCouponPortalUrls[locale].replaceAll("&", "&amp;")),
    );
    assert.match(
      html,
      new RegExp(`href="/${locale}/codes/"[^>]*aria-current="page"`),
    );

    const jsonLd = renderedJsonLd(html);
    for (const schemaType of [
      "CollectionPage",
      "ItemList",
      "HowTo",
      "BreadcrumbList",
    ]) {
      assert.match(jsonLd, new RegExp(`"@type":"${schemaType}"`));
    }
    for (const entry of aion2CodeRegistry) {
      assert.ok(
        !jsonLd.includes(entry.code),
        `${entry.code} must remain concealed from server-rendered structured data`,
      );
      assert.ok(
        jsonLd.includes(entry.title[locale]),
        `${locale} structured data must retain the localized title for ${entry.id}`,
      );
    }
  }
});

test("reveals codes after the delay without displaying its duration and centers the copy confirmation", async () => {
  const [controlSource, pageSource, registrySource, stylesSource] = await Promise.all([
    readFile(
      new URL("../app/_components/codes/CopyCodeButton.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/_components/codes/CodesPage.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/code-registry.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../app/_components/codes/CodesPage.module.css", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(controlSource, /const REVEAL_DELAY_MS\s*=\s*4_500\b/u);
  assert.match(controlSource, /useState<[^>]+>\("hidden"\)/u);
  assert.match(controlSource, /setRevealState\("loading"\)/u);
  assert.match(
    controlSource,
    /setTimeout\(\(\)\s*=>\s*\{[\s\S]*?setRevealState\("revealed"\)[\s\S]*?\},\s*REVEAL_DELAY_MS\)/u,
  );
  assert.match(controlSource, /revealState === "loading"/u);
  assert.match(controlSource, /revealState === "revealed"/u);
  assert.match(
    controlSource,
    /onClick=\{codeIsRevealed \? openCopyConfirmation : revealCode\}/u,
  );
  assert.match(controlSource, /\bshowCodeLabel\b/u);
  assert.match(controlSource, /\bloadingCodeLabel\b/u);
  assert.doesNotMatch(controlSource, /\bloadingCodeHint\b/u);
  assert.doesNotMatch(pageSource, /\bloadingCodeHint\b/u);
  assert.doesNotMatch(registrySource, /(?:4[–-]5|4\s*~\s*5)\s*(?:秒|seconds?|초)/iu);
  assert.match(controlSource, /\bcopyLabel\b/u);

  assert.match(controlSource, /<dialog\b/u);
  assert.match(controlSource, /<dialog\b[^>]*\baria-modal="true"/u);
  assert.match(controlSource, /<dialog\b[\s\S]{0,720}\brole="dialog"/u);
  assert.match(controlSource, /\bonCancel=\{handleDialogCancel\}/u);
  assert.match(controlSource, /copyInFlight\.current/u);
  assert.match(controlSource, /disabled=\{copyState === "copying"\}/u);
  assert.match(controlSource, /\bonClick=\{closeCopyConfirmation\}/u);
  assert.match(controlSource, /\bcancelLabel\b/u);
  assert.match(controlSource, /\bconfirmCopyTitle\b/u);
  assert.match(controlSource, /\bconfirmCopyMessage\b/u);
  assert.match(controlSource, /\bconfirmCopyLabel\b/u);
  assert.match(controlSource, /\bonClick=\{confirmCopy\}/u);
  assert.match(stylesSource, /\.confirmDialog\s*\{[\s\S]*?\bposition:\s*fixed;/u);
  assert.match(stylesSource, /\.confirmDialog\s*\{[\s\S]*?\binset:\s*50%\s+auto\s+auto\s+50%;/u);
  assert.match(stylesSource, /\.confirmDialog\s*\{[\s\S]*?\btransform:\s*translate\(-50%,\s*-50%\);/u);
  assert.match(
    stylesSource,
    /@keyframes confirm-dialog-in[\s\S]*?translate\(-50%,\s*calc\(-50%\s*\+\s*10px\)\)[\s\S]*?translate\(-50%,\s*-50%\)/u,
  );

  const confirmCopyStart = controlSource.search(
    /(?:async\s+function\s+confirmCopy|const\s+confirmCopy\s*=\s*async)/u,
  );
  const clipboardCalls = [
    ...controlSource.matchAll(/\bwriteToClipboard\(code\)/gu),
  ];
  assert.ok(confirmCopyStart >= 0, "the confirmation handler must be explicit");
  assert.equal(
    clipboardCalls.length,
    1,
    "clipboard writing must happen only once and only after confirmation",
  );
  assert.ok(
    clipboardCalls[0].index > confirmCopyStart,
    "clipboard writing must happen inside the confirmation handler",
  );

  assert.match(
    pageSource,
    /<CodeRevealControl[\s\S]*?\bshowCodeLabel=\{copy\.showCodeLabel\}/u,
  );
  assert.match(
    pageSource,
    /<CodeRevealControl[\s\S]*?\bloadingCodeLabel=\{copy\.loadingCodeLabel\}/u,
  );
  assert.match(
    pageSource,
    /<CodeRevealControl[\s\S]*?\bconfirmCopyLabel=\{copy\.confirmCopyLabel\}/u,
  );
  assert.match(
    pageSource,
    /<CodeRevealControl[\s\S]*?\bcancelLabel=\{copy\.cancelLabel\}/u,
  );
});

test("ranks the dedicated codes page first for an exact active-code search", async () => {
  for (const locale of ["zh-hant", "en", "ko"]) {
    const response = await render(`/${locale}/search/?q=AION2CHAPTERONE`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const resultList = html.match(
      /<ol class="hub-search-results">([\s\S]*?)<\/ol>/u,
    )?.[1] ?? "";
    const resultHrefs = [...resultList.matchAll(/<a href="([^"]+)"/gu)]
      .map((match) => match[1]);
    assert.ok(resultHrefs.length > 0);
    assert.equal(resultHrefs[0], `/${locale}/codes/`);
    assert.ok(
      resultHrefs.includes(`/${locale}/news/aion2chapterone-coupon-status/`),
    );
  }
});

test("renders published hub cards with a responsive media hierarchy", async () => {
  const [response, hubSource] = await Promise.all([
    render("/zh-hant/guides/"),
    readFile(new URL("../app/_components/hub/HubPage.tsx", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="hub-published-card has-media"/u);
  assert.match(html, /class="hub-published-image"[^>]+data-image-rights=/u);
  assert.match(html, /data-image-presentation="contain"/u);
  assert.match(
    html,
    /src="\/map-runtime\/releases\/sha256-[0-9a-f]{64}\/maps\/tiles\/verteron\/0\/0\/0\.webp"/u,
  );
  assert.match(html, /class="hub-published-body"/u);
  assert.match(html, /class="hub-published-meta"/u);
  assert.match(html, /class="hub-published-action"/u);
  assert.match(html, /<img[^>]+alt="[^"]+"[^>]+height="\d+"[^>]+width="\d+"/u);

  assert.match(
    hubSource,
    /\.hub-published-list > a\s*\{[^}]*display:\s*grid[^}]*overflow:\s*hidden[^}]*padding:\s*0/su,
  );
  assert.match(
    hubSource,
    /\.hub-published-image\s*\{[^}]*aspect-ratio:\s*1200\s*\/\s*630/su,
  );
  assert.match(
    hubSource,
    /\.hub-published-body\s*\{[^}]*display:\s*flex[^}]*flex-direction:\s*column/su,
  );
  assert.match(
    hubSource,
    /@media \(max-width: 1020px\)[\s\S]*?\.hub-published-list > a\.has-media\s*\{[^}]*grid-template-columns:\s*minmax\(220px,\s*38%\)\s*minmax\(0,\s*1fr\)/u,
  );
  assert.match(
    hubSource,
    /@media \(max-width: 680px\)[\s\S]*?\.hub-published-list > a\.has-media\s*\{[^}]*grid-template-columns:\s*1fr/u,
  );
  assert.match(
    hubSource,
    /\.hub-published-image\[data-image-rights="linked-official-media"\] img\s*\{[^}]*padding:\s*0[^}]*object-fit:\s*cover/su,
  );
  assert.match(
    hubSource,
    /\.hub-published-image\[data-image-presentation="contain"\] img\s*\{[^}]*padding:\s*0[^}]*object-fit:\s*contain/su,
  );
  assert.match(hubSource, /eventName="content_card_click"/u);
  assert.match(hubSource, /content_slug:\s*entry\.slug/u);
  assert.match(hubSource, /surface:\s*"hub_published_card"/u);
});

test("server-renders a noindex search route with only real player-facing results", async () => {
  const response = await render("/en/search/?q=interactive+map");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control") ?? "", /no-store/i);
  assert.equal(response.headers.get("cdn-cache-control"), null);
  const html = await response.text();
  assert.match(html, /name="robots"[^>]+noindex/i);
  assert.doesNotMatch(html, /rel="alternate"[^>]+hrefLang=/i);
  assert.match(html, /Interactive map quickstart/i);
  assert.match(html, /href="\/en\/guides\/interactive-map-quickstart\/"/);
  assert.match(html, /href="\/en\/tools\/map\/"/);
  assert.match(html, /href="\/en\/tools\/"/);
  assert.doesNotMatch(html, /search result 1|fake result|not connected yet/i);

  const missingResponse = await render("/en/search/?q=definitely-not-published");
  assert.equal(missingResponse.status, 200);
  assert.match(await missingResponse.text(), /No content matched/i);

  const brawlerResponse = await render("/ko/search/?q=%EA%B6%8C%EC%84%B1");
  assert.equal(brawlerResponse.status, 200);
  const brawlerHtml = await brawlerResponse.text();
  assert.match(brawlerHtml, /권성\(Brawler\)|권성/);
  assert.match(brawlerHtml, /href="\/ko\/classes\/brawler\/"/);
});

test("server-renders indexable localized content detail pages with sources and structured data", async () => {
  const mapManifest = JSON.parse(
    await readFile(new URL("../public/map-assets/manifest.json", import.meta.url), "utf8"),
  );
  const versionedMapPreview =
    `/map-runtime/releases/${mapManifest.versionKey}/maps/tiles/verteron/0/0/0.webp`;
  const [
    guideResponse,
    classResponse,
    newsResponse,
    databaseResponse,
    releaseResponse,
    meterResponse,
  ] = await Promise.all([
    render("/zh-hant/guides/interactive-map-quickstart/"),
    render("/en/classes/class-planning-framework/"),
    render("/ko/news/chapter-1-lands-of-sand-and-snow/"),
    render("/en/database/map-data-methodology/"),
    render("/zh-hant/aion-2-release-date/"),
    render("/ko/guides/ing-meter/"),
  ]);
  for (const response of [
    guideResponse,
    classResponse,
    newsResponse,
    databaseResponse,
    releaseResponse,
    meterResponse,
  ]) {
    assert.equal(response.status, 200);
  }

  const [guideHtml, classHtml, newsHtml, databaseHtml, releaseHtml, meterHtml] = await Promise.all([
    guideResponse.text(),
    classResponse.text(),
    newsResponse.text(),
    databaseResponse.text(),
    releaseResponse.text(),
    meterResponse.text(),
  ]);
  assert.match(guideHtml, /互動地圖快速上手/);
  assert.match(guideHtml, /hrefLang="x-default"/i);
  assert.match(guideHtml, /href="\/zh-hant\/tools\/map\/"/i);
  assert.match(guideHtml, /href="\/zh-hant\/tools\/map\/verteron\/"/i);
  assert.match(guideHtml, /property="og:image"/i);
  assert.match(guideHtml, /name="twitter:image"/i);
  assert.ok(guideHtml.includes(versionedMapPreview));
  assert.doesNotMatch(guideHtml, /(?:src|content)="[^"]*\/map-assets\/maps\/tiles\/verteron\/0\/0\/0\.webp"/i);
  assert.match(guideHtml, /適用範圍與更新日期/);
  assert.match(guideHtml, /回報過期／提交更正/);
  assert.match(classHtml, /Set the goal before planning an AION2 class build/i);
  assert.match(classHtml, /application\/ld\+json/i);
  assert.match(
    classHtml,
    /"@id":"\/en\/classes\/class-planning-framework\/#article"/,
  );
  assert.match(newsHtml, /Chapter 1/);
  assert.match(newsHtml, /NewsArticle/);
  assert.match(newsHtml, /https:\/\/about\.ncsoft\.com\/en\/news\/article\/aion2_update_260706/);
  assert.match(newsHtml, /"citation":\[/);
  assert.match(newsHtml, /AION 2 챕터 1 공식 업데이트 이미지/);
  assert.match(
    newsHtml,
    /Linked official media|공식 원본에 연결된 미디어|공식 출처 연결 이미지/,
  );
  assert.match(databaseHtml, /How to read AION2 item and interactive map data/i);
  assert.match(databaseHtml, /href="\/en\/tools\/map\/altgard\/"/i);
  assert.match(databaseHtml, /src="\/pfg-avatar\.webp"/i);
  assert.match(databaseHtml, /<meta name="author" content="PFG"/i);
  const databaseJsonLd = renderedJsonLd(databaseHtml);
  assert.match(databaseJsonLd, /"@type":"Person"/);
  assert.match(databaseJsonLd, /"name":"PFG"/);
  assert.match(
    databaseJsonLd,
    /"author":\{"@id":"[^"\\]*\/en\/author\/pfg\/#person"\}/,
  );
  assert.match(
    databaseJsonLd,
    /"publisher":\{"@type":"Organization","@id":"[^"\\]*#organization","name":"AION2 KINA"/,
  );
  const finalSectionPosition = databaseHtml.indexOf("What to do when something differs");
  const sourcesPosition = databaseHtml.indexOf("DATA SOURCES");
  const relatedPosition = databaseHtml.indexOf("Continue reading");
  assert.ok(finalSectionPosition >= 0, "the final editorial section should render");
  assert.ok(
    sourcesPosition > finalSectionPosition,
    "sources should follow the complete editorial body",
  );
  assert.ok(
    relatedPosition > sourcesPosition,
    "related content should follow the source and verification panel",
  );
  assert.doesNotMatch(newsHtml, /href="\/ko\/tools\/map\/(?:eltnen|morheim)\/"/i);
  assert.match(classHtml, /"image":"\/aion2-dual\.webp"/i);
  assert.match(releaseHtml, /目前需要分開理解三組官方或平台欄位/);
  assert.match(releaseHtml, /https:\/\/store\.steampowered\.com\/app\/3393110\/AION_2\//);
  assert.match(releaseHtml, /AION2 全球 PC 版 2026 年 9 月上線官方主視覺/);
  assert.match(releaseHtml, /"citation":\[/);
  assert.match(meterHtml, /아이온2 잉미터기: 비공식 제3자 도구 출처·설치·안전 확인/);
  assert.match(meterHtml, /현재 버전과 잉미터기 다운로드 출처/);
  assert.match(meterHtml, /v1\.6\.6 배포 경고는 과거 기록/);
  assert.match(meterHtml, /잉 미터기/);
  assert.match(meterHtml, /Npcap 또는 WinDivert/);
  assert.match(meterHtml, /AIONING 개발자 배포처 확인/);
  assert.match(meterHtml, /href="https:\/\/aion\.ing\/aion2\/meter\.php"/);
  assert.match(meterHtml, /KINA 설치 파일 미제공/);
  assert.match(meterHtml, /잉미터기 설치 전 준비와 위험 확인/);
  assert.match(meterHtml, /잉미터기 기본 사용법/);
  assert.match(meterHtml, /잉미터기 설치·사용법 자주 묻는 질문/);
  assert.match(meterHtml, /href="\/ko\/tools\/map\/"/);
  assert.match(meterHtml, /href="\/ko\/classes\/base-class-roster\/"/);
  assert.match(meterHtml, /href="\/ko\/news\/aion2chapterone-coupon-status\/"/);
  assert.match(meterHtml, /href="\/ko\/aion-2-server-status\/"/);
  assert.doesNotMatch(meterHtml, /제3자 1차 출처|서드파티 1차 출처|id="source-/);
  assert.match(meterHtml, /"citation":\[/);
  assert.doesNotMatch(
    `${guideHtml}${classHtml}${newsHtml}${databaseHtml}${releaseHtml}${meterHtml}`,
    /name="robots"[^>]+noindex/i,
  );
  for (const html of [
    guideHtml,
    classHtml,
    newsHtml,
    databaseHtml,
    releaseHtml,
    meterHtml,
  ]) {
    assert.match(html, />PFG</);
    assert.match(html, /\/author\/pfg\//);
  }
});

test("renders intent-aligned metadata for the highest-confidence Search Console opportunity", async () => {
  const responses = await Promise.all([
    render("/zh-hant/guides/ing-meter/"),
    render("/en/guides/ing-meter/"),
    render("/ko/guides/ing-meter/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [zhHtml, enHtml, meterHtml] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(
    meterHtml,
    /<title>아이온2 잉미터기: 비공식 제3자 도구 설치·안전 안내 \| AION2 KINA<\/title>/,
  );
  assert.match(
    meterHtml,
    /<meta name="description" content="[^"]*잉미터기\(잉 미터기·ING Meter\)는 AIONING의 비공식 제3자 도구[^"]*KINA는 NC 공식 다운로드 사이트가 아니며 설치 파일을 제공하지 않습니다\./,
  );
  assert.match(
    enHtml,
    /<title>AION2 ING Meter: Third-Party Download &amp; Setup \| AION2 KINA<\/title>/,
  );
  assert.match(
    enHtml,
    /Answer first: ING Meter is third-party AION2 combat-record software from AIONING, not an official NC tool\./,
  );
  assert.match(zhHtml, /AION2 ING Meter：下載來源、安裝與基本使用/);
  for (const html of [zhHtml, enHtml, meterHtml]) {
    assert.match(html, /href="https:\/\/aion\.ing\/aion2\/meter\.php"/);
    assert.match(html, /target="_blank"/);
    assert.match(html, /rel="noopener noreferrer external"/);
    assert.doesNotMatch(html, /INGMeter_Setup_v|INGMeter_Portable_v|github\.com\/[^" ]+\.(?:exe|zip)/i);
  }
  assert.doesNotMatch(meterHtml, /v1\.6\.6 현재 경고/);

  const [actionSource, analyticsEvents] = await Promise.all([
    readFile(new URL("../app/_components/content/ContentPrimaryAction.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics-events.ts", import.meta.url), "utf8"),
  ]);
  assert.match(actionSource, /trackEvent\("content_primary_action_click"/u);
  assert.match(actionSource, /target_key:\s*`\$\{section\}\/\$\{slug\}`/u);
  assert.match(actionSource, /destination_host:\s*destinationHost/u);
  assert.match(
    actionSource,
    /import type \{[\s\S]*?\} from "@\/app\/content-registry";/u,
  );
  assert.doesNotMatch(actionSource, /resolveContentPrimaryActionHref/u);
  assert.match(analyticsEvents, /"content_primary_action_click"/u);
  assert.match(analyticsEvents, /"content-detail"/u);
});

test("publishes the official Spacetime Rift schedule and opens faction maps with only Rift selected", async () => {
  const responses = await Promise.all([
    render("/zh-hant/guides/spacetime-rift/"),
    render("/en/guides/spacetime-rift/"),
    render("/ko/guides/spacetime-rift/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [zhHtml, enHtml, koHtml] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(zhHtml, /02:00[^<]*05:00[^<]*08:00[^<]*11:00[^<]*14:00[^<]*17:00[^<]*20:00[^<]*23:00/u);
  assert.match(zhHtml, /每三小時週期/u);
  assert.match(zhHtml, /深淵裂縫地帶/u);
  assert.match(zhHtml, /每週二、週四 22:00/u);
  assert.match(
    zhHtml,
    /href="\/zh-hant\/tools\/map\/verteron\/#type=rift"/u,
  );
  assert.match(
    zhHtml,
    /href="\/zh-hant\/tools\/map\/altgard\/#type=rift"/u,
  );
  assert.match(enHtml, /Show Rift only — Verteron \(Elyos\)/u);
  assert.match(enHtml, /Show Rift only — Altgard \(Asmodian\)/u);
  assert.match(koHtml, /균열만 보기 — 베르테론\(천족\)/u);
  assert.match(koHtml, /균열만 보기 — 알트가르드\(마족\)/u);
  assert.match(
    zhHtml,
    /https:\/\/tw\.ncsoft\.com\/aion2\/board\/update\/view\?articleId=692f4c48e81e402e6da16915/u,
  );
  assert.match(zhHtml, /article:modified_time" content="2026-07-24"/u);

  const [interactiveMap, sectionLinks, analyticsEvents] = await Promise.all([
    readFile(new URL("../app/map-app/InteractiveMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/content/ContentSectionLinks.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics-events.ts", import.meta.url), "utf8"),
  ]);
  assert.match(interactiveMap, /hash\.get\("type"\)\?\.trim\(\) \|\| null/u);
  assert.match(interactiveMap, /activeUrlSubtype\s*\?\s*new Set\(\[activeUrlSubtype\]\)/u);
  assert.match(interactiveMap, /filterMapName !== selectedMap\.name \|\| activeUrlSubtype/u);
  assert.match(sectionLinks, /trackEvent\("guide_to_map_click"/u);
  assert.match(sectionLinks, /filter_type:\s*link\.filterSubtype/u);
  assert.match(sectionLinks, /target_kind:\s*"map"/u);
  assert.match(analyticsEvents, /"guide_to_map_click"/u);
});

test("renders a source-backed official action for global pre-registration in all locales", async () => {
  const responses = await Promise.all([
    render("/zh-hant/aion-2-pre-registration/"),
    render("/en/aion-2-pre-registration/"),
    render("/ko/aion-2-pre-registration/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [zhHtml, enHtml, koHtml] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(
    enHtml,
    /<title>AION 2 Global Pre-Register: Official Link \| AION2 KINA<\/title>/,
  );
  assert.match(enHtml, /Open the official pre-registration page/);
  assert.match(
    enHtml,
    /AION 2 Global Pre-Register Guide: Official Link, Status, Deadline &amp; Rewards/,
  );
  assert.match(
    enHtml,
    /Answer first: this AION 2 Global pre-register guide uses NC(?:&#x27;|')s official page/,
  );
  assert.match(enHtml, /Open · checked July 24, 2026/);
  assert.match(enHtml, /No fixed deadline announced/);
  assert.match(enHtml, /Age 18\+ · required personal-data consent/);
  assert.match(enHtml, /Pagati \+ one of four pets/);
  assert.match(enHtml, /https:\/\/aion2\.plaync\.com\/en-us\/conts\/teaser/);
  assert.match(enHtml, /The exact claim method and window are unannounced/i);
  assert.match(zhHtml, /前往 NC 官方預先登錄頁/);
  assert.match(zhHtml, /AION 2 全球版預先登錄攻略：官方連結、流程、獎勵與常見問題/);
  assert.match(zhHtml, /開放 · 2026 年 7 月 24 日核對/);
  assert.match(koHtml, /NC 공식 사전예약 페이지 열기/);
  assert.match(koHtml, /아이온2 글로벌 사전예약 가이드/);
  assert.match(koHtml, /진행 중 · 2026년 7월 24일 확인/);
  assert.match(koHtml, /Pagati \+ 펫 4종 중 1종/);

  for (const html of [zhHtml, enHtml, koHtml]) {
    assert.match(
      html,
      /href="https:\/\/aion2\.plaync\.com\/en-us\/conts\/teaser"/,
    );
    assert.match(html, /target="_blank"/);
    assert.match(html, /rel="noopener noreferrer external"/);
    assert.match(html, /article:modified_time" content="2026-07-26"/);
    assert.match(html, /"keywords":/);
    assert.match(html, /"about":\[\{"@type":"Thing","name":/);
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);
  }
});

test("renders direct-answer metadata for the release-date and class-roster search opportunities", async () => {
  const [releaseResponse, classResponse] = await Promise.all([
    render("/en/aion-2-release-date/"),
    render("/en/classes/base-class-roster/"),
  ]);
  assert.equal(releaseResponse.status, 200);
  assert.equal(classResponse.status, 200);
  const [releaseHtml, classHtml] = await Promise.all([
    releaseResponse.text(),
    classResponse.text(),
  ]);

  assert.match(
    releaseHtml,
    /<title>AION 2 Release Date: Sep 30 Early Access \| AION2 KINA<\/title>/,
  );
  assert.match(
    releaseHtml,
    /<meta name="description" content="AION 2 Global Early Access starts September 30, 2026\.[^"]*NC has not confirmed one consistent full-launch date/,
  );
  assert.match(
    releaseHtml,
    /AION 2 Global Release Date: September 30 Early Access and Full-Launch Status/,
  );

  assert.match(
    classHtml,
    /<title>AION2 Classes: All 8 Roles &amp; Weapons \| AION2 KINA<\/title>/,
  );
  assert.match(
    classHtml,
    /<meta name="description" content="Compare all eight AION2 classes by official role and weapon:[^"]*Chanter\."/,
  );
  assert.match(
    classHtml,
    /Answer first: the eight AION2 base classes in NC(?:&#x27;|')s official roster are Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric, and Chanter\./,
  );
  for (const html of [releaseHtml, classHtml]) {
    assert.match(html, /article:modified_time" content="2026-07-26"/);
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);
  }
});

test("publishes global Founder’s Pack news and fully localized edition guides", async () => {
  const routes = [
    "/zh-hant/news/founders-packs-announced-july-2026/",
    "/en/news/founders-packs-announced-july-2026/",
    "/ko/news/founders-packs-announced-july-2026/",
    "/zh-hant/aion-2-founders-pack/",
    "/zh-hans/aion-2-founders-pack/",
    "/en/aion-2-founders-pack/",
    "/ko/aion-2-founders-pack/",
    "/de/aion-2-founders-pack/",
    "/es/aion-2-founders-pack/",
    "/fr/aion-2-founders-pack/",
    "/ja/aion-2-founders-pack/",
    "/pt-br/aion-2-founders-pack/",
    "/ru/aion-2-founders-pack/",
  ];
  const responses = await Promise.all(routes.map((route) => render(route)));
  for (const response of responses) assert.equal(response.status, 200);
  const [
    zhNews,
    enNews,
    koNews,
    zhGuide,
    zhHansGuide,
    enGuide,
    koGuide,
    deGuide,
    esGuide,
    frGuide,
    jaGuide,
    ptGuide,
    ruGuide,
  ] = await Promise.all(responses.map((response) => response.text()));

  assert.match(enNews, /<title>AION 2 Founder’s Packs Announced \| AION2 KINA<\/title>/);
  assert.match(enNews, /AION 2 Founder’s Packs: September 30 Early Access/);
  assert.match(enNews, /"@type":"NewsArticle"/u);
  assert.match(enNews, /Read NC’s July 22 Founder’s Pack notice/);
  assert.match(enNews, /advance access begins September 30, 2026/i);
  assert.match(enNews, /Standard Founder(?:’|&#x27;|')s Pack/);
  assert.match(enNews, /Ultimate Founder(?:’|&#x27;|')s Pack/);
  assert.match(zhNews, /9 月 30 日搶先遊玩，Steam 目前標示 10 月 5 日發布/);
  assert.match(koNews, /9월 30일 사전 플레이와 Steam의 10월 5일 표기/);

  assert.match(enGuide, /<title>AION 2 Founder’s Pack Prices &amp; Rewards \| AION2 KINA<\/title>/);
  assert.match(enGuide, /Confirm the dates first/);
  assert.match(enGuide, /Read the English PLAYNC notice/);
  assert.match(enGuide, /Wait for full release/);
  assert.match(enGuide, /Return, Courage, Speed, Benediction, and Absorption Scrolls/);
  assert.match(enGuide, /\$24\.99[\s\S]*\$49\.99[\s\S]*\$99\.99/);
  assert.match(enGuide, /Standard→Ultimate for \$75/);
  assert.match(enGuide, /Moonlit Aria has six pieces[\s\S]*no pauldrons/);
  assert.match(zhGuide, /先確認時間：9 月 30 日開始 5 日搶先遊玩/);
  assert.match(zhGuide, /Power Shard 10,000/);
  assert.match(zhGuide, /交易、刪除與倉庫欄標為 X/);
  assert.match(zhHansGuide, /AION 2 创始人礼包：价格、奖励与版本对比/);
  assert.match(zhHansGuide, /物品、外观与系统名称为基于英文原文的本地化暂译/);
  assert.match(zhHansGuide, /作者[\s\S]*阅读时间/);
  assert.match(zhHansGuide, /适用范围与更新日期/);
  assert.match(zhHansGuide, /报告过期信息／提交更正/);
  assert.match(koGuide, /먼저 날짜를 확인하세요/);
  assert.match(deGuide, /AION 2 Gründerpaket: Preise, Inhalte und Editionen im Vergleich/);
  assert.match(deGuide, /24,99 \$ \(USD\)/);
  assert.match(esGuide, /Estándar, Deluxe y Definitivo/);
  assert.match(esGuide, /USD 24,99[\s\S]*USD 49,99[\s\S]*USD 99,99/);
  assert.match(frGuide, /Pack de fondateur : prix, contenu et éditions comparés/);
  assert.match(frGuide, /24,99 \$ \(USD\)/);
  assert.match(jaGuide, /¥3,900[\s\S]*¥7,850[\s\S]*¥15,500/);
  assert.match(jaGuide, /日本語のファウンダーズパック公式案内を確認/);
  assert.match(ptGuide, /Pacote do Fundador: preços, conteúdo e edições/);
  assert.match(ptGuide, /USD 24,99[\s\S]*USD 49,99[\s\S]*USD 99,99/);
  assert.match(ruGuide, /Набор основателя AION 2: цены, награды и сравнение изданий/);
  assert.match(ruGuide, /Названия игровых предметов[\s\S]*временными переводами/);
  assert.match(ruGuide, /Автор[\s\S]*Время чтения/);
  assert.match(ruGuide, /Область применения и дата обновления/);
  assert.match(ruGuide, /Сообщить об устаревшей информации/);
  assert.match(enGuide, /"@type":"Article"/u);

  for (const html of [
    zhNews,
    enNews,
    koNews,
    zhGuide,
    zhHansGuide,
    enGuide,
    koGuide,
    deGuide,
    esGuide,
    frGuide,
    jaGuide,
    ptGuide,
    ruGuide,
  ]) {
    assert.match(html, /article:modified_time" content="2026-07-25"/);
  }
  for (const html of [zhNews, enNews, koNews, zhGuide, enGuide, koGuide]) {
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hrefLang="zh-Hant"/);
    assert.match(html, /hrefLang="en"/);
    assert.match(html, /hrefLang="ko"/);
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);
    assert.doesNotMatch(html, /S\$31\.99|S\$63\.99|S\$129\.99/u);
  }
  for (const html of [deGuide, esGuide, frGuide, jaGuide, ptGuide]) {
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hrefLang="de"/);
    assert.match(html, /hrefLang="es-ES"/);
    assert.match(html, /hrefLang="fr"/);
    assert.match(html, /hrefLang="ja"/);
    assert.match(html, /hrefLang="pt-BR"/);
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);
    assert.doesNotMatch(html, /Some game terminology is still under review/);
  }
  for (const html of [zhHansGuide, ruGuide]) {
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hrefLang="zh-Hans"/);
    assert.match(html, /hrefLang="ru"/);
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);
    assert.doesNotMatch(html, /Some game terminology is still under review/);
    assert.match(
      html,
      /articleId=6a5fef1a2c2d9c52e6c79e6f&amp;redirect=false/u,
    );
  }
  assert.match(deGuide, /articleId=6a5fef452c2d9c52e6c79e70/);
  assert.match(esGuide, /articleId=6a5feff1a7ca1a15cf46b6b5/);
  assert.match(frGuide, /articleId=6a5fefd0a7ca1a15cf46b6b3/);
  assert.match(jaGuide, /articleId=6a60bed03b36601c74031053/);
  assert.match(ptGuide, /articleId=6a60bed08370eb695191ca4c/);

  assert.match(
    enNews,
    /https:\/\/st\.ncjapan\.co\.jp\/[^" ]+\/pack1_mb\.webp/u,
  );
  assert.match(
    enGuide,
    /https:\/\/st\.ncjapan\.co\.jp\/[^" ]+\/pack2_mb\.webp/u,
  );
  assert.match(
    enGuide,
    /href="https:\/\/store\.steampowered\.com\/sub\/1675062\/"/u,
  );
  assert.match(enNews, /href="\/en\/aion-2-founders-pack\/"/u);
  assert.match(enGuide, /href="\/en\/news\/founders-packs-announced-july-2026\/"/u);
});

test("publishes the first P1 keyword batch with primary sources and version boundaries", async () => {
  const responses = await Promise.all([
    render("/zh-hant/guides/character-presets-style-shop/"),
    render("/en/guides/soul-imprint/"),
    render("/ko/guides/arcana/"),
    render("/en/aion-2-server-regions/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [presets, soul, arcana, servers] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(presets, /AION2 角色創建[^<]*Style Shop/);
  assert.match(presets, /https:\/\/aion2\.plaync\.com\/ko-kr\/styleshop\/all/);
  assert.match(soul, /official probabilities, reset, and Soul Tuning/i);
  assert.match(soul, /https:\/\/probability\.plaync\.com\/aion2\/view\?probCategoryId=/);
  assert.match(arcana, /글로벌 출시 시점의 구성과 밸런스를 확정하지 않습니다/);
  assert.match(arcana, /https:\/\/about\.ncsoft\.com\/en\/news\/article\/aion2_update_260513/);
  assert.match(servers, /North America, South America, Europe, and Japan/);
  assert.match(servers, /Named-server details remain unannounced/);
  assert.match(servers, /NewsArticle/);
  assert.match(`${presets}${soul}${arcana}${servers}`, /Linked official media|外連官方素材|공식 출처 연결 이미지/);
  assert.doesNotMatch(`${presets}${soul}${arcana}${servers}`, /name="robots"[^>]+noindex/i);
});

test("publishes the second P1 systems batch without inventing rankings or live values", async () => {
  const responses = await Promise.all([
    render("/zh-hant/guides/pet-progression/"),
    render("/en/guides/equipment-tuning/"),
    render("/ko/guides/elyos-vs-asmodians/"),
    render("/en/guides/abyss-status/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [pets, tuning, factions, abyss] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(pets, /理解度、等級與伺服器內角色共享規則/);
  assert.match(pets, /不要把寵物持有共享推廣成跨伺服器或跨帳號共享/);
  assert.match(tuning, /do not establish a universal best affix/i);
  assert.match(tuning, /https:\/\/probability\.plaync\.com\/aion2\/view\?probCategoryId=/);
  assert.match(factions, /발표는 진영 우열이나 인구 순위가 아닙니다/);
  assert.match(factions, /https:\/\/about\.ncsoft\.com\/news\/article\/aion2_update_250530_2/);
  assert.match(abyss, /Live values intentionally not hard-coded here/);
  assert.match(abyss, /https:\/\/about\.ncsoft\.com\/news\/article\/aion2_update_260121/);
  assert.match(abyss, /https:\/\/about\.ncsoft\.com\/news\/article\/aion2_update_260325/);
  assert.match(abyss, /https:\/\/about\.ncsoft\.com\/news\/article\/Aion2_update_20260701/);
  assert.match(abyss, /"citation":\[/);
  assert.match(`${pets}${tuning}${factions}${abyss}`, /Linked official media|外連官方素材|공식 출처 연결 이미지/);
  assert.doesNotMatch(`${pets}${tuning}${factions}${abyss}`, /name="robots"[^>]+noindex/i);
});

test("publishes the reference and base-class batches with official evidence boundaries", async () => {
  const responses = await Promise.all([
    render("/zh-hant/aion-2-system-requirements/"),
    render("/en/guides/deity-traces/"),
    render("/ko/guides/godstone-imprint/"),
    render("/en/guides/kinah-bound/"),
    render("/zh-hant/classes/base-class-roster/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [requirements, traces, godstone, kinah, roster] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(requirements, /AION 2 全球 Steam PC 最低與建議配備表/);
  assert.match(requirements, /GTX 1050 Ti 4 GB/);
  assert.match(requirements, /RTX 2070 8 GB/);
  assert.match(requirements, /100 GB 可用空間；建議 SSD/);
  assert.match(requirements, /實際下載大小、預先下載日期與開放時間尚未公布/);
  assert.doesNotMatch(requirements, /Radeon RX/);
  assert.match(
    requirements,
    /https:\/\/store\.steampowered\.com\/app\/3393110\/AION_2\//,
  );
  assert.match(
    requirements,
    /https:\/\/about\.ncsoft\.com\/news\/article\/aion2_update_260422/,
  );
  assert.match(requirements, /"citation":\[/);
  assert.match(traces, /do not publish every point or a fixed total/i);
  assert.match(traces, /Daeva Express/);
  assert.match(godstone, /공식 자료는 '최고의 신석'을 정하지 않습니다/);
  assert.match(godstone, /probability\.plaync\.com/);
  assert.match(kinah, /No unverified farming claim is made here/i);
  assert.match(kinah, /March 25, 2026/);
  assert.match(roster, /AION2 八大基礎職業總覽/);
  assert.match(roster, /選職業時可先用武器、隊伍定位與操作方式縮小範圍/);
  assert.match(`${requirements}${traces}${godstone}${kinah}${roster}`, /Linked official media|外連官方素材|공식 출처 연결 이미지/);
  assert.doesNotMatch(
    `${requirements}${traces}${godstone}${kinah}${roster}`,
    /name="robots"[^>]+noindex/i,
  );
});

test("publishes curated legacy-site topics in the current sourced trilingual format", async () => {
  const responses = await Promise.all([
    render("/zh-hant/classes/class-choice-guide/"),
    render("/en/guides/beginner-launch-checklist/"),
    render("/ko/aion-2-free-to-play/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [classes, beginner, monetization] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(classes, /依玩法偏好縮小八職業名單/);
  assert.match(classes, /不做 Tier、勝率、傷害或最佳 Build 結論/);
  assert.match(classes, /aion2-update-250530-2/);
  assert.match(
    beginner,
    /Complete registration, protect the account, and learn the global reset/i,
  );
  assert.match(beginner, /website language never selects a server for you/i);
  assert.match(beginner, /href="\/en\/tools\/daily-checklist\/"/i);
  assert.match(monetization, /Free To Play/);
  assert.match(monetization, /In-App Purchases/);
  assert.match(monetization, /월 US\$15 계획/);
  assert.match(monetization, /거래소와 키나·큐나 교환소에는 활성 멤버십이 필요/);
  assert.doesNotMatch(
    `${classes}${beginner}${monetization}`,
    /name="robots"[^>]+noindex/i,
  );
});

test("planned tools remain non-routable until they are released", async () => {
  const response = await render("/en/tools/build-planner/");
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("location"), null);
  assert.match(
    await response.text(),
    /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/i,
  );
});

test("tool directory filters live entirely in the URL fragment", () => {
  const tools = [
    {
      slug: "map",
      category: "world",
      status: "live",
      copy: {
        en: {
          eyebrow: "World exploration",
          name: "Interactive map",
          description: "Find bosses and points",
          action: "Open",
          highlights: ["Map markers"],
        },
      },
    },
    {
      slug: "build-planner",
      category: "planning",
      status: "coming-soon",
      copy: {
        en: {
          eyebrow: "Build planning",
          name: "Build planner",
          description: "Compare skills and equipment",
          action: "Coming soon",
          highlights: ["Skill comparison"],
        },
      },
    },
    {
      slug: "daily-checklist",
      category: "routine",
      status: "live",
      copy: {
        en: {
          eyebrow: "Daily tracking",
          name: "Daily checklist",
          description: "Track daily routines",
          action: "Open",
          highlights: ["Local progress"],
        },
      },
    },
  ];

  assert.deepEqual(
    parseToolDirectoryFragment(
      "#campaign=atlas&tool-category=planning&tool-status=coming-soon&tool-query=skill",
      ["world", "planning", "progression", "routine"],
    ),
    { category: "planning", status: "coming-soon", query: "skill" },
  );
  assert.deepEqual(
    parseToolDirectoryFragment(
      "#tool-category=unknown&tool-status=retired&tool-query=map",
      ["world", "planning", "progression", "routine"],
    ),
    { category: "all", status: "all", query: "map" },
  );

  const fragment = buildToolDirectoryFragment("#campaign=atlas", {
    category: "planning",
    status: "coming-soon",
    query: " skill ",
  });
  const params = new URLSearchParams(fragment.slice(1));
  assert.equal(params.get("campaign"), "atlas");
  assert.equal(params.get("tool-category"), "planning");
  assert.equal(params.get("tool-status"), "coming-soon");
  assert.equal(params.get("tool-query"), "skill");
  assert.doesNotMatch(fragment, /\?/u);

  assert.equal(
    buildToolDirectoryFragment(fragment, {
      category: "all",
      status: "all",
      query: "",
    }),
    "#campaign=atlas",
  );

  assert.deepEqual(
    filterToolDirectoryTools(tools, "en", {
      category: "planning",
      status: "coming-soon",
      query: "skill",
    }).map((tool) => tool.slug),
    ["build-planner"],
  );
  assert.deepEqual(
    filterToolDirectoryTools(tools, "en", {
      category: "all",
      status: "live",
      query: "",
    }).map((tool) => tool.slug),
    ["map", "daily-checklist"],
  );
});

test("tool directory keeps accessible, compact mobile interaction contracts", async () => {
  const [directorySource, directoryStyles] = await Promise.all([
    readFile(
      new URL("../app/_components/tools/ToolDirectory.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/_components/tools/tools.module.css", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(directorySource, /aria-live="polite"/u);
  assert.match(directorySource, /aria-controls="tool-directory-results"/u);
  assert.match(directorySource, /window\.location\.hash/u);
  assert.match(directorySource, /"pushState" : "replaceState"/u);
  assert.match(directorySource, /data-featured=\{tool\.featured/u);
  assert.match(directoryStyles, /\.searchField button \{[\s\S]*?min-width: 44px;[\s\S]*?min-height: 44px;/u);
  assert.match(directoryStyles, /@media \(max-width: 600px\)[\s\S]*?\.card:not\(\[data-featured="true"\]\) \{[\s\S]*?min-height: 0;/u);
  assert.match(directoryStyles, /\.card:not\(\[data-featured="true"\]\) \.highlights,[\s\S]*?display: none;/u);
});

test("server-renders the local-first checklist as a real multilingual tool", async () => {
  const responses = await Promise.all([
    render("/zh-hant/tools/daily-checklist/"),
    render("/en/tools/daily-checklist/"),
    render("/ko/tools/daily-checklist/"),
  ]);
  responses.forEach((response) => assert.equal(response.status, 200));
  const [html, english, korean] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(html, /AION2 每日與每週活動清單/);
  assert.match(html, /我的檢查清單/);
  assert.match(html, /完成狀態只保存在這個瀏覽器/);
  assert.match(html, /台灣／香港／澳門/);
  assert.match(html, /每週三 05:00/);
  assert.match(html, /使命任務/);
  assert.match(html, /AION2 官方：每日 05:00 營運日界線證據/);
  assert.match(html, /WebApplication/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /href="\/en\/tools\/daily-checklist\/"/);
  assert.match(html, /\/zh-hant\/tools\/daily-checklist\/#application/);
  assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);

  for (const [localizedHtml, title, description, locale] of [
    [html, "AION2 每日與每週活動清單", "追蹤已核對來源的每日與每週遊戲活動", "zh-Hant"],
    [english, "AION2 daily and weekly activity checklist", "Track sourced daily and weekly activities", "en"],
    [korean, "AION2 일일·주간 활동 체크리스트", "출처가 표시된 일일·주간 활동", "ko"],
  ]) {
    assert.match(localizedHtml, new RegExp(`property="og:title"[^>]+${title}`, "i"));
    assert.match(localizedHtml, new RegExp(`property="og:description"[^>]+${description}`, "i"));
    assert.match(localizedHtml, /property="og:site_name"[^>]+AION2 KINA/i);
    assert.match(localizedHtml, /property="og:type"[^>]+website/i);
    assert.match(localizedHtml, new RegExp(`property="og:locale"[^>]+${locale}`, "i"));
    assert.match(localizedHtml, /property="og:image"[^>]+\/aion2-dual\.webp/i);
    assert.match(localizedHtml, new RegExp(`property="og:image:alt"[^>]+${title}`, "i"));
    assert.match(localizedHtml, new RegExp(`name="twitter:title"[^>]+${title}`, "i"));
    assert.match(localizedHtml, new RegExp(`name="twitter:description"[^>]+${description}`, "i"));
    assert.match(localizedHtml, /name="twitter:card"[^>]+summary_large_image/i);
    assert.match(localizedHtml, /name="twitter:image"[^>]+\/aion2-dual\.webp/i);
    assert.match(localizedHtml, new RegExp(`name="twitter:image:alt"[^>]+${title}`, "i"));
  }
});

test("server-renders the sourced event, boss, and Rift countdown tool", async () => {
  const responses = await Promise.all([
    render("/zh-hant/tools/event-timer/"),
    render("/en/tools/event-timer/"),
    render("/ko/tools/event-timer/"),
  ]);
  responses.forEach((response) => assert.equal(response.status, 200));
  const [traditional, english, korean] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.match(traditional, /AION2 活動、Boss 與裂隙倒計時/u);
  assert.match(traditional, /AION2 活動倒數/u);
  assert.match(traditional, /台服/u);
  assert.match(traditional, /id="event-timer-active-title"/u);
  assert.match(traditional, /目前可確認進行中的活動/u);
  assert.match(traditional, /2026年9月16日/u);
  assert.match(english, /The Global service schedule has not been announced/u);
  assert.match(korean, /한국 서버 그룹/u);

  for (const html of [traditional, english, korean]) {
    const schema = renderedJsonLd(html);
    assert.match(schema, /"@type":"WebApplication"/u);
    assert.match(schema, /"@type":"ItemList"/u);
    assert.match(schema, /"@type":"FAQPage"/u);
    assert.match(schema, /"@type":"BreadcrumbList"/u);
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/iu);
  }
  const traditionalSchema = renderedJsonLd(traditional);
  assert.match(traditionalSchema, /時空裂隙/u);
  assert.match(traditionalSchema, /深淵 Boss/u);
  assert.match(traditionalSchema, /樹古慶典/u);
  assert.match(traditionalSchema, /次元進攻/u);
  assert.match(traditionalSchema, /戰場配對/u);
});

test("serves an uncached same-origin clock for countdown synchronization", async () => {
  const before = Date.now();
  const response = await render("/api/time");
  const after = Date.now();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.match(response.headers.get("content-type") ?? "", /application\/json/iu);
  const payload = await response.json();
  assert.equal(typeof payload.now, "number");
  assert.ok(payload.now >= before && payload.now <= after);
});

test("publishes a descriptive database title and validator-compatible item schemas", async () => {
  const [databaseResponse, ordinaryResponse, curatedResponse] = await Promise.all([
    render("/zh-hant/database/"),
    render("/en/database/item/110120001/"),
    render("/en/database/theostone-fregions-schemes-513830001/"),
  ]);
  for (const response of [databaseResponse, ordinaryResponse, curatedResponse]) {
    assert.equal(response.status, 200);
  }

  const [databaseHtml, ordinaryHtml, curatedHtml] = await Promise.all([
    databaseResponse.text(),
    ordinaryResponse.text(),
    curatedResponse.text(),
  ]);
  assert.equal(
    renderedTitle(databaseHtml),
    "AION2 物品資料庫：裝備、材料與道具 ID 查詢 | KINA",
  );
  assert.match(databaseHtml, /<h1>AION2 物品資料庫<\/h1>/u);
  assert.equal(
    (
      databaseHtml.match(
        /href="\/zh-hant\/database\/(?:brutalscourge|theostone|lesser-abyssal|intermediate-abyssal|radiant-|maddened-|rampaging-|ancient-aullaeu)[^"]*\/"/gu,
      ) ?? []
    ).length,
    12,
  );
  assert.match(databaseHtml, /"dateModified":"2026-07-25"/u);

  for (const html of [ordinaryHtml, curatedHtml]) {
    const schema = renderedJsonLd(html);
    assert.match(schema, /"@type":"Thing"/u);
    assert.match(schema, /"@type":"Thing"[\s\S]*?"description":/u);
    assert.doesNotMatch(schema, /"additionalProperty":/u);
  }
  assert.match(ordinaryHtml, /name="robots"[^>]+noindex/i);
  assert.doesNotMatch(curatedHtml, /name="robots"[^>]+noindex/i);
  assert.match(
    curatedHtml,
    /href="\/en\/database\/theostone-beritras-conspiracy-513830003\/"/u,
  );
  assert.match(
    curatedHtml,
    /href="\/en\/database\/theostone-nezekans-march-513830004\/"/u,
  );
  assert.equal(
    ordinaryResponse.headers.get("cdn-cache-control"),
    "public, s-maxage=86400, stale-while-revalidate=604800",
  );
  assert.equal(
    curatedResponse.headers.get("cdn-cache-control"),
    "public, s-maxage=600, stale-while-revalidate=86400",
  );
});

test("server-renders the map Hub as a directory and SEO entry without mounting a map", async () => {
  const response = await render("/zh-hant/tools/map/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>AION2 互動地圖 \| AION2 KINA<\/title>/);
  assert.match(html, /<h1>AION2 互動地圖<\/h1>/);
  assert.match(html, /斐爾特朗（天族）/);
  assert.match(html, /4,508/);
  assert.match(html, /rel="canonical"[^>]+\/zh-hant\/tools\/map\//);
  assert.match(html, /hrefLang="ko"/i);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Static map preview|靜態地圖預覽/);
  assert.match(
    html,
    /\/map-runtime\/releases\/sha256-[a-f0-9]{64}\/maps\/tiles\/verteron\/0\/0\/0\.webp/,
  );
  assert.doesNotMatch(html, /src="\/map-runtime\/maps\/tiles\//);
  assert.match(html, /property="og:title"[^>]+AION2 互動地圖/i);
  assert.match(html, /name="twitter:title"[^>]+AION2 互動地圖/i);
  assert.doesNotMatch(html, /KINA Atlas/i);
  assert.match(html, /href="\/zh-hant\/tools\/map\/chaotic-upper-reshanta\/"/i);
  assert.match(html, /href="\/zh-hant\/tools\/map\/(?:eltnen|morheim)\/"/i);
  assert.match(html, /完整底圖 · 無收集元素/u);
  assert.match(html, /map-seo-grid/u);
  assert.match(renderedJsonLd(html), /"@type":"CollectionPage"/u);
  assert.doesNotMatch(html, /id="interactive-map"/u);
  assert.doesNotMatch(html, /href="#interactive-map"/u);
  assert.doesNotMatch(html, /map-activation-shell|class="map-shell/u);

  const hubSource = await readFile(
    new URL("../app/[locale]/tools/map/page.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(hubSource, /MapExperience/u);
});

test("puts the interactive workspace first on localized map detail pages", async () => {
  const routes = [
    ["zh-hant", "/zh-hant/tools/map/verteron/"],
    ["en", "/en/tools/map/verteron/"],
    ["ko", "/ko/tools/map/verteron/"],
  ];
  const responses = await Promise.all(routes.map(([, pathname]) => render(pathname)));
  for (const [index, response] of responses.entries()) {
    assert.equal(response.status, 200, routes[index][1]);
  }

  const documents = await Promise.all(responses.map((response) => response.text()));
  for (const [index, html] of documents.entries()) {
    const [locale, pathname] = routes[index];
    assert.match(html, /<main[^>]+class="map-detail-main"/u);
    assert.match(html, /class="map-detail-hero"/u);
    assert.match(html, /class="map-seo-embed map-detail-map"/u);
    assert.match(html, /class="map-seo-section map-detail-overview"/u);
    assert.match(html, /class="map-seo-preview map-detail-preview"/u);

    const heroIndex = html.indexOf("map-detail-hero");
    const interactiveIndex = html.indexOf("map-detail-map");
    const overviewIndex = html.indexOf("map-detail-overview");
    const previewIndex = html.indexOf("map-detail-preview");
    assert.ok(heroIndex >= 0 && heroIndex < interactiveIndex, `${pathname}: hero precedes map`);
    assert.ok(interactiveIndex < overviewIndex, `${pathname}: map precedes SEO overview`);
    assert.ok(overviewIndex < previewIndex, `${pathname}: preview belongs to the overview`);

    const canonicalTags = [...html.matchAll(/<link\b[^>]*>/giu)].filter(
      (match) => htmlAttribute(match[0], "rel").toLowerCase() === "canonical",
    );
    assert.equal(canonicalTags.length, 1, `${pathname}: one canonical`);
    assert.equal(new URL(htmlAttribute(canonicalTags[0][0], "href")).pathname, pathname);

    const alternates = new Map(
      [...html.matchAll(/<link\b[^>]*>/giu)]
        .filter((match) => htmlAttribute(match[0], "rel").toLowerCase() === "alternate")
        .map((match) => [
          htmlAttribute(match[0], "hrefLang"),
          new URL(htmlAttribute(match[0], "href")).pathname,
        ]),
    );
    assert.deepEqual(Object.fromEntries(alternates), {
      ...Object.fromEntries(
        siteLocales.map((language) => [
          siteLocaleConfig[language].hrefLang,
          `/${language}/tools/map/verteron/`,
        ]),
      ),
      "x-default": "/en/tools/map/verteron/",
    }, `${locale}: localized map alternates`);
    assert.match(
      html,
      new RegExp(`href="/${locale}/tools/map/verteron/type/hidden-cube/"`, "u"),
      `${pathname}: links the Hidden Cube landing page`,
    );
    assert.match(
      html,
      new RegExp(`href="/${locale}/tools/map/verteron/type/rift/"`, "u"),
      `${pathname}: links the Rift landing page`,
    );
  }

  const detailSource = await readFile(
    new URL("../app/[locale]/tools/map/[map]/page.tsx", import.meta.url),
    "utf8",
  );
  const experienceSource = await readFile(
    new URL("../app/map-app/MapExperience.tsx", import.meta.url),
    "utf8",
  );
  assert.match(detailSource, /<MapExperience[\s\S]+?\beager\s*\/>/u);
  assert.match(experienceSource, /props\.eager\s*\?\s*"direct"\s*:\s*"idle"/u);
});

test("uses natural Korean AION2 search language across map page intents", async () => {
  const paths = [
    "/ko/tools/map/",
    "/ko/tools/map/altgard/",
    "/ko/tools/map/altgard/type/world-boss/",
    "/ko/tools/map/altgard/poi/black-warrior-aed-52563fe7/",
  ];
  const responses = await Promise.all(paths.map((pathname) => render(pathname)));
  for (const [index, response] of responses.entries()) {
    assert.equal(response.status, 200, paths[index]);
  }

  const [hubHtml, mapHtml, typeHtml, poiHtml] = await Promise.all(
    responses.map((response) => response.text()),
  );

  assert.equal(renderedTitle(hubHtml), "아이온2 인터랙티브 지도 | AION2 KINA");
  assert.match(hubHtml, /<h1>아이온2 인터랙티브 지도<\/h1>/u);
  assert.match(renderedDescription(hubHtml), /아이온2 지도/u);
  assert.match(renderedDescription(hubHtml), /아이온2 공략/u);

  assert.match(renderedTitle(mapHtml), /알트가르드 \(마족\) 아이온2 지도 \| AION2 KINA/u);
  assert.match(mapHtml, /<h1>알트가르드 \(마족\) 아이온2 인터랙티브 지도<\/h1>/u);
  assert.match(renderedDescription(mapHtml), /아이온2 인터랙티브 지도/u);

  assert.match(renderedTitle(typeHtml), /아이온2 월드 보스 지도/u);
  assert.match(typeHtml, /<h1>알트가르드 \(마족\) 아이온2 월드 보스 지도<\/h1>/u);
  assert.match(renderedDescription(typeHtml), /아이온2 지도/u);

  assert.match(renderedTitle(poiHtml), /아이온2 지도 \| AION2 KINA/u);
  assert.match(renderedDescription(poiHtml), /아이온2 지도/u);

  for (const [html, pathname] of [
    [hubHtml, paths[0]],
    [mapHtml, paths[1]],
    [typeHtml, paths[2]],
  ]) {
    assert.match(html, new RegExp(`rel="canonical"[^>]+${pathname.replaceAll("/", "\\/")}`, "iu"));
    assert.match(html, /hrefLang="zh-Hant"/iu);
    assert.match(html, /hrefLang="en"/iu);
    assert.match(html, /hrefLang="ko"/iu);
    assert.match(html, /hrefLang="x-default"[^>]+\/en\/tools\/map\//iu);
  }
});

test("uses the same localized SiteShell as every other tool across all map routes", async () => {
  const routes = [
    ["zh-hant", "/zh-hant/tools/map/"],
    ["en", "/en/tools/map/"],
    ["ko", "/ko/tools/map/"],
    ["en", "/en/tools/map/verteron/"],
    ["ko", "/ko/tools/map/verteron/type/world-boss/"],
    ["zh-hant", "/zh-hant/tools/map/verteron/poi/roah-2f438df2/"],
    ["en", "/en/tools/"],
  ];
  const responses = await Promise.all(routes.map(([, pathname]) => render(pathname)));
  for (const response of responses) assert.equal(response.status, 200);

  const documents = await Promise.all(responses.map((response) => response.text()));
  const [zhHant, english, korean] = documents;
  const expectedRoutes = ["", "tools/", "about/", "contact/", "privacy/", "terms/"];
  for (const [index, html] of documents.entries()) {
    const [locale, pathname] = routes[index];
    for (const route of expectedRoutes) {
      assert.match(html, new RegExp(`href="/${locale}/${route}"`, "u"));
    }
    assert.equal((html.match(/class="site-shell-header"/gu) ?? []).length, 1, pathname);
    assert.equal((html.match(/class="site-shell-footer(?:\s|")/gu) ?? []).length, 1, pathname);
    assert.match(html, /class="site-shell-search"/u);
    assert.match(html, /class="site-shell-language-picker"/u);
    assert.match(html, /class="site-shell-language-options"/u);
    assert.match(html, /class="site-shell-themes"/u);
    assert.match(html, /id="site-shell-mobile-menu"/u);
    assert.match(html, new RegExp(`href="/${locale}/tools/"[^>]+aria-current="page"`, "u"));
    assert.doesNotMatch(html, /class="map-seo-header/u);
    assert.doesNotMatch(html, /class="map-seo-footer/u);
  }

  assert.match(zhHant, />首頁</u);
  assert.match(zhHant, />關於本站</u);
  assert.match(english, />Home</u);
  assert.match(english, />Privacy Policy</u);
  assert.match(korean, />홈</u);
  assert.match(korean, />개인정보처리방침</u);

  const [siteShell, chrome, mapStyles, ...mapRoutes] = await Promise.all([
    readFile(new URL("../app/_components/site/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/MapSeoChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/map-seo.css", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/[map]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/[map]/type/[type]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/[map]/poi/[poi]/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(siteShell, /function isMapPath/u);
  assert.match(siteShell, /trackEvent\("map_site_navigation_click"/u);
  assert.match(siteShell, /trackEvent\("map_site_search_submit"/u);
  assert.match(siteShell, /trackEvent\("map_site_theme_change"/u);
  assert.match(siteShell, /trackEvent\("language_change"/u);
  assert.match(siteShell, /parameters\.delete\("l"\)/u);
  assert.match(siteShell, /parameters\.delete\("lang"\)/u);
  assert.doesNotMatch(siteShell, /site-shell--immersive|isImmersivePath/u);
  assert.doesNotMatch(chrome, /export function MapHeader|export function MapFooter/u);
  assert.match(chrome, /eventName=\{entry\.section === "guides" \? "map_to_guide_click" : "map_site_navigation_click"\}/u);
  for (const route of mapRoutes) assert.doesNotMatch(route, /MapHeader|MapFooter/u);
  assert.match(mapStyles, /height:\s*min\(900px, calc\(100dvh - 216px\)\)/u);
  assert.match(mapStyles, /height:\s*calc\(100svh - 76px\)/u);
  assert.match(mapStyles, /height:\s*calc\(100svh - 64px\)/u);
  assert.match(mapStyles, /\.map-seo-embed\.map-detail-map \.map-activation-shell\s*\{[^}]*z-index:\s*auto;/u);
  const mapAppStyles = await readFile(
    new URL("../app/[locale]/tools/map/map-app.css", import.meta.url),
    "utf8",
  );
  assert.match(mapAppStyles, /\.share-image-backdrop\s*\{[^}]*z-index:\s*160;/u);
});

test("preserves the shi renderer icon and zoom behavior while changing page layout", async () => {
  const [interactiveMap, mapLibreMap] = await Promise.all([
    readFile(new URL("../app/map-app/InteractiveMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/MapLibreMap.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(interactiveMap, /const MapRoot = embedded \? "section" : "main"/);
  assert.match(interactiveMap, /const MapTitle = embedded \? "h2" : "h1"/);
  assert.match(interactiveMap, /<MapRoot[\s\S]+className="map-shell"/);
  assert.match(interactiveMap, /<MapTitle>\{text\.appTitle\}<\/MapTitle>/);
  assert.match(
    interactiveMap,
    /href=\{`\/\$\{routeLocaleForMapLocale\(locale\)\}\/news\/`\}/,
  );
  assert.doesNotMatch(interactiveMap, /href="https:\/\/aion2kina\.com\/"/);
  assert.match(mapLibreMap, /const MARKER_ICON_SCALE = 1\.5/u);
  assert.match(mapLibreMap, /const MAX_ZOOM_OVERSCALE = 0\.5/u);
  assert.match(mapLibreMap, /maxZoom: mapInfo\.tileMaxZoom \+ MAX_ZOOM_OVERSCALE/u);
  assert.match(mapLibreMap, /"icon-size": iconSizeExpression\(mapInfo\)/u);
  assert.match(mapLibreMap, /"icon-size": iconSizeExpression\(mapInfo, true\)/u);
  assert.match(mapLibreMap, /"icon-size": foundIconSizeExpression\(mapInfo\)/u);
  assert.match(mapLibreMap, /"icon-allow-overlap": true/);
  assert.match(mapLibreMap, /"icon-ignore-placement": true/);
  assert.match(mapLibreMap, /return `\/sprites\/maps\/\$\{mapInfo\.slug\}`/);
  assert.match(mapLibreMap, /verifySpriteAtlas\(primarySpriteUrl, abortController\.signal\)/);
  assert.match(mapLibreMap, /verifySpriteAtlas\(fallbackSpriteUrl, abortController\.signal\)/);
  assert.match(mapLibreMap, /sprite: activeSpriteUrl/);
  assert.match(interactiveMap, /event\.key !== "Tab"/);
});

test("supports an accessible fullscreen map without changing the shi renderer", async () => {
  const [interactiveMap, analyticsEvents, mapAppStyles, mapSeoStyles] = await Promise.all([
    readFile(new URL("../app/map-app/InteractiveMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics-events.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/map-app.css", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/map-seo.css", import.meta.url), "utf8"),
  ]);
  const fullscreenStyles = `${mapAppStyles}\n${mapSeoStyles}`;

  assert.match(interactiveMap, /\.requestFullscreen\(\)/u);
  assert.match(interactiveMap, /document\.exitFullscreen\(\)/u);
  assert.match(interactiveMap, /document\.addEventListener\("fullscreenchange"/u);
  assert.match(interactiveMap, /document\.removeEventListener\("fullscreenchange"/u);
  assert.match(interactiveMap, /type FullscreenMode = "off" \| "native" \| "fallback"/u);
  assert.match(interactiveMap, /data-fullscreen-mode=\{/u);
  assert.match(interactiveMap, /aria-pressed=\{isFullscreen\}/u);
  assert.match(
    interactiveMap,
    /aria-label=\{isFullscreen\s*\?\s*text\.exitFullscreen\s*:\s*text\.enterFullscreen\}/u,
  );
  assert.match(interactiveMap, /const commitFullscreenMode = useCallback/u);
  assert.match(
    interactiveMap,
    /const handleFullscreenChange[\s\S]+commitFullscreenMode\("(?:native|off)"/u,
  );
  assert.match(
    interactiveMap,
    /const commitFullscreenMode = useCallback[\s\S]+scheduleMapResize\(\)/u,
  );
  assert.match(interactiveMap, /mapRef\.current\?\.resize\(\)/u);
  assert.match(interactiveMap, /trackEvent\("map_fullscreen_change"/u);
  assert.match(analyticsEvents, /"map_fullscreen_change"/u);
  assert.match(fullscreenStyles, /:fullscreen/u);
  assert.match(fullscreenStyles, /\[data-fullscreen-mode="fallback"\]/u);
  assert.match(fullscreenStyles, /(?:height|min-height):\s*100dvh/u);
  assert.match(
    mapAppStyles,
    /:root\[data-map-fullscreen="fallback"\]\s+\.site-shell-content\s*\{[\s\S]+?z-index:\s*1000/u,
  );
  assert.match(
    mapAppStyles,
    /:root\[data-map-fullscreen="fallback"\]\s+body\s*>\s*\[inert\][\s\S]+?visibility:\s*hidden/u,
  );
  assert.match(
    mapAppStyles,
    /\.map-shell\[data-embedded="true"\]:is\(:fullscreen,\s*\[data-fullscreen-mode="fallback"\]\)[\s\S]+?\.language-select\s*\{[\s\S]+?display:\s*block/u,
  );
});

test("keeps interactive map imagery versioned, labeled, and free of a success badge", async () => {
  const [
    interactiveMap,
    mapLibreMap,
    mapExperience,
    mapDetailPage,
    mapSeo,
    mapI18n,
  ] = await Promise.all([
    readFile(new URL("../app/map-app/InteractiveMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/MapLibreMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/MapExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/[map]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-seo.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/i18n.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(interactiveMap, /alt=""/u);
  assert.match(interactiveMap, /alt=\{text\.iconImageAlt\(/u);
  assert.match(interactiveMap, /alt=\{text\.shareImageAlt\(/u);
  assert.match(interactiveMap, /const mapAccessibleName = text\.mapCanvasLabel/u);
  assert.match(mapI18n, /AION2 Interactive Map:/u);
  assert.match(mapI18n, /AION2 互動地圖：/u);
  assert.match(mapI18n, /AION2 인터랙티브 지도:/u);
  assert.match(
    mapLibreMap,
    /resolveMapAssetUrl\(mapInfo\.tileTemplate, assetBasePath\)/u,
  );
  assert.doesNotMatch(mapLibreMap, /WebGL · MapLibre/u);
  assert.match(mapLibreMap, /\{fatalError && \(/u);
  assert.match(mapExperience, /assetBasePath=\{props\.assetBasePath\}/u);
  assert.match(mapDetailPage, /assetBasePath=\{mapAssetReleaseBasePath\}/u);
  assert.match(mapSeo, /AION2 Interactive Map static preview:/u);
  assert.match(mapSeo, /AION2 互動地圖靜態預覽：/u);
  assert.match(mapSeo, /아이온2 인터랙티브 지도 정적 미리보기:/u);
});

test("server-renders map, type, and point pages with stable canonical URLs", async () => {
  const [mapResponse, typeResponse, poiResponse] = await Promise.all([
    render("/en/tools/map/verteron/"),
    render("/ko/tools/map/verteron/type/world-boss/"),
    render("/zh-hant/tools/map/verteron/poi/roah-2f438df2/"),
  ]);
  assert.equal(mapResponse.status, 200);
  assert.equal(typeResponse.status, 200);
  assert.equal(poiResponse.status, 200);

  const [mapHtml, typeHtml, poiHtml] = await Promise.all([
    mapResponse.text(),
    typeResponse.text(),
    poiResponse.text(),
  ]);
  assert.match(mapHtml, /Verteron \(Elyos\)/);
  assert.match(
    mapHtml,
    /<h1>AION2 (?:<!-- -->)?Verteron \(Elyos\)(?:<!-- -->)? (?:<!-- -->)?Interactive map<\/h1>/,
  );
  assert.match(mapHtml, /1,830/);
  assert.match(mapHtml, />points</);
  assert.match(mapHtml, /Scope and update date/);
  assert.match(
    mapHtml,
    /AION2 KINA map curation, in-game review, and official information/,
  );
  assert.match(mapHtml, /Atreia Guide third-party guide data/);
  assert.match(mapHtml, /Official AION2 game information and in-game data/);
  assert.doesNotMatch(mapHtml, /TC IMBA|tc-imba|chishu2018/i);
  assert.doesNotMatch(mapHtml, /data snapshot|version hash|draft|review status/i);
  assert.match(mapHtml, /Report outdated info \/ submit a correction/);
  assert.match(mapHtml, /property="og:title"[^>]+Verteron/i);
  assert.match(mapHtml, /name="twitter:title"[^>]+Verteron/i);
  assert.match(typeHtml, /월드 보스/);
  assert.match(typeHtml, /22/);
  assert.match(typeHtml, /property="og:title"[^>]+월드 보스/i);
  assert.match(poiHtml, /古代城市羅伊廢墟/);
  assert.match(poiHtml, /2787/);
  assert.match(poiHtml, /roah-2f438df2/);
  assert.match(poiHtml, /name="robots"[^>]+noindex/i);
  assert.doesNotMatch(poiHtml, /rel="alternate"[^>]+hrefLang=/i);
});

test("indexes current marker catalogs and reviewed base maps without inventing data", async () => {
  const baseMapRoutes = [
    ["zh-hant", "morheim", "目前地圖資料未收錄收集元素標記"],
    ["en", "morheim", "current map data contains no collectable markers"],
    ["ko", "morheim", "현재 지도 데이터에는 수집 요소 마커가 없으며"],
  ];
  const catalogMapRoutes = [
    ["zh-hant", "eltnen"],
    ["en", "eltnen"],
    ["ko", "eltnen"],
  ];
  const [baseMapResponses, catalogMapResponses, publishedResponse, eltnenSearchResponse, morheimSearchResponse, hubResponse] = await Promise.all([
    Promise.all(baseMapRoutes.map(([locale, slug]) => render(`/${locale}/tools/map/${slug}/`))),
    Promise.all(catalogMapRoutes.map(([locale, slug]) => render(`/${locale}/tools/map/${slug}/`))),
    render("/en/tools/map/chaotic-lower-reshanta/"),
    render("/en/search/?q=Eltnen"),
    render("/ko/search/?q=모르헤임"),
    render("/en/tools/map/"),
  ]);
  for (const response of [...baseMapResponses, ...catalogMapResponses, publishedResponse, eltnenSearchResponse, morheimSearchResponse, hubResponse]) {
    assert.equal(response.status, 200);
  }
  const [baseMapHtml, catalogMapHtml, publishedHtml, eltnenSearchHtml, morheimSearchHtml, hubHtml] = await Promise.all([
    Promise.all(baseMapResponses.map((response) => response.text())),
    Promise.all(catalogMapResponses.map((response) => response.text())),
    publishedResponse.text(),
    eltnenSearchResponse.text(),
    morheimSearchResponse.text(),
    hubResponse.text(),
  ]);

  for (const [index, [locale, slug, scopeText]] of baseMapRoutes.entries()) {
    const html = baseMapHtml[index];
    assert.match(html, /name="robots"[^>]+index, follow/i);
    assert.doesNotMatch(html, /name="robots"[^>]+noindex/i);
    assert.match(html, new RegExp(`rel="canonical"[^>]+/${locale}/tools/map/${slug}/`, "i"));
    assert.match(html, new RegExp(`hrefLang="zh-Hant"[^>]+/zh-hant/tools/map/${slug}/`, "i"));
    assert.match(html, new RegExp(`hrefLang="en"[^>]+/en/tools/map/${slug}/`, "i"));
    assert.match(html, new RegExp(`hrefLang="ko"[^>]+/ko/tools/map/${slug}/`, "i"));
    assert.match(html, new RegExp(`hrefLang="x-default"[^>]+/en/tools/map/${slug}/`, "i"));
    assert.match(html, new RegExp(scopeText, "i"));
    assert.match(html, /"@type":"WebApplication"/u);
    assert.match(html, /"dateModified":"2026-07-23"/u);
    assert.doesNotMatch(html, /"@type":"ItemList","itemListElement":\[\]/u);
  }
  for (const [index, [locale, slug]] of catalogMapRoutes.entries()) {
    const html = catalogMapHtml[index];
    assert.match(html, /name="robots"[^>]+index, follow/i);
    assert.match(html, new RegExp(`rel="canonical"[^>]+/${locale}/tools/map/${slug}/`, "i"));
    assert.match(html, /725/u);
    assert.match(html, /"@type":"ItemList"/u);
    assert.match(html, /"dateModified":"2026-07-23"/u);
    assert.doesNotMatch(html, /current map data contains no collectable markers/i);
  }
  assert.match(publishedHtml, /name="robots"[^>]+index, follow/i);
  assert.match(publishedHtml, /hrefLang="x-default"[^>]+\/en\/tools\/map\/chaotic-lower-reshanta\//i);
  assert.match(publishedHtml, /"@type":"ItemList"/u);
  assert.match(publishedHtml, /"dateModified":"2026-07-14"/u);
  assert.match(eltnenSearchHtml, /href="\/en\/tools\/map\/eltnen\/"/i);
  assert.match(morheimSearchHtml, /href="\/ko\/tools\/map\/morheim\/"/i);
  assert.match(hubHtml, /href="\/en\/tools\/map\/eltnen\/"/i);
  assert.match(hubHtml, /Complete base map · no collectables/i);
  assert.match(hubHtml, /href="\/en\/tools\/map\/chaotic-lower-reshanta\/"/i);
});

test("publishes only allowlisted named world-boss type and POI pages", async () => {
  const [verteronType, altgardType, namedBoss, genericBoss, unknownPoi] = await Promise.all([
    render("/en/tools/map/verteron/type/world-boss/"),
    render("/ko/tools/map/altgard/type/world-boss/"),
    render("/en/tools/map/altgard/poi/black-warrior-aed-52563fe7/"),
    render("/en/tools/map/altgard/poi/world-boss-c0f2c226/"),
    render("/en/tools/map/verteron/poi/not-in-the-publication-registry/"),
  ]);

  assert.equal(verteronType.status, 200);
  assert.equal(altgardType.status, 200);
  assert.equal(namedBoss.status, 200);
  assert.equal(genericBoss.status, 404);
  assert.equal(unknownPoi.status, 404);
  assert.equal(genericBoss.headers.get("location"), null);
  assert.equal(unknownPoi.headers.get("location"), null);
  assert.match(
    await genericBoss.clone().text(),
    /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/i,
  );
  assert.match(
    await unknownPoi.clone().text(),
    /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/i,
  );

  const [verteronHtml, altgardHtml, namedHtml] = await Promise.all([
    verteronType.text(),
    altgardType.text(),
    namedBoss.text(),
  ]);
  assert.match(verteronHtml, /content="Browse 22 world boss locations/);
  assert.match(altgardHtml, /content="알트가르드 \(마족\) 아이온2 지도에서 18개의 월드 보스/);
  assert.match(altgardHtml, /hrefLang="zh-Hant"[^>]+\/zh-hant\/tools\/map\/altgard\/type\/world-boss\//i);
  assert.match(namedHtml, /Black Warrior Aed/);
  assert.match(namedHtml, /href="\/en\/tools\/map\/altgard\/type\/world-boss\/"/);
  assert.match(namedHtml, /map-seo-preview-marker/);
  assert.match(namedHtml, /--map-poi-x:31\.201%/);
  assert.match(namedHtml, /--map-poi-y:38\.135%/);
  assert.doesNotMatch(namedHtml, /--map-poi-y:61\.865%/);
  assert.match(namedHtml, /"url":"\/en\/tools\/map\/altgard\/poi\/black-warrior-aed-52563fe7\/"/);
  assert.match(namedHtml, /name="robots"[^>]+noindex/i);
  assert.match(namedHtml, /href="\/en\/guides\/interactive-map-quickstart\/"/i);
  assert.match(namedHtml, /href="\/en\/database\/map-data-methodology\/"/i);
  assert.match(namedHtml, /href="\/en\/classes\/class-planning-framework\/"/i);
  assert.match(namedHtml, /property="og:title"[^>]+Black Warrior Aed/i);
  assert.match(namedHtml, /name="twitter:title"[^>]+Black Warrior Aed/i);
});

test("publishes localized Hidden Cube and Rift map landings from verified subtype counts", async () => {
  const hiddenKeywords = {
    "zh-hans": ["AION2 互动地图", "隐藏魔方"],
    en: ["AION2 Interactive Map", "Hidden Cube"],
    fr: ["carte interactive AION2", "Cubes cachés"],
    de: ["AION2 Interaktive Karte", "Versteckte Würfel"],
    es: ["Mapa interactivo de AION2", "Cubos ocultos"],
    ja: ["AION2 インタラクティブマップ", "隠しキューブ"],
    "pt-br": ["Mapa interativo de AION2", "Cubos ocultos"],
    ru: ["Интерактивная карта AION2", "скрытые кубы"],
    ko: ["아이온2 인터랙티브 지도", "히든 큐브"],
    "zh-hant": ["AION2 互動地圖", "隱藏方塊"],
  };
  const responses = await Promise.all(
    siteLocales.map((locale) =>
      render(`/${locale}/tools/map/verteron/type/hidden-cube/`)),
  );

  for (const [index, response] of responses.entries()) {
    const locale = siteLocales[index];
    assert.equal(response.status, 200, `${locale} Hidden Cube landing`);
    const html = await response.text();
    const decoded = decodeHtml(html);
    const [mapKeyword, hiddenKeyword] = hiddenKeywords[locale];
    const h1 = decodeHtml(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/iu)?.[1] ?? "");
    const previewImage = html.match(/class="map-seo-preview"[\s\S]*?(<img\b[^>]*>)/iu)?.[1] ?? "";
    const previewAlt = htmlAttribute(previewImage, "alt");

    assert.ok(
      renderedTitle(html)
        .toLocaleLowerCase(locale)
        .includes(mapKeyword.toLocaleLowerCase(locale)),
      `${locale} localized map title`,
    );
    assert.doesNotMatch(renderedTitle(html), /…/u, `${locale} complete map title`);
    const normalizedH1 = h1.toLocaleLowerCase(locale);
    assert.ok(
      normalizedH1.includes(mapKeyword.toLocaleLowerCase(locale))
        && normalizedH1.includes(hiddenKeyword.toLocaleLowerCase(locale)),
      `${locale} localized H1`,
    );
    const normalizedDescription = renderedDescription(html).toLocaleLowerCase(locale);
    if (locale === "ru") {
      assert.match(
        normalizedDescription,
        /скрыт[\p{L}]*\s+куб[\p{L}]*/u,
        `${locale} localized description`,
      );
    } else {
      assert.ok(
        normalizedDescription.includes(hiddenKeyword.toLocaleLowerCase(locale)),
        `${locale} localized description`,
      );
    }
    const normalizedPreviewAlt = previewAlt.toLocaleLowerCase(locale);
    const previewBrand = locale === "ko" ? "아이온2" : "aion2";
    assert.ok(
      normalizedPreviewAlt.includes(previewBrand)
        && normalizedPreviewAlt.includes(hiddenKeyword.toLocaleLowerCase(locale)),
      `${locale} localized map image alt`,
    );
    assert.match(decoded, /139/u);
    assert.match(html, /#type=hiddenCube/u);
    assert.match(
      html,
      new RegExp(`rel="canonical"[^>]+/${locale}/tools/map/verteron/type/hidden-cube/`, "iu"),
    );
    assert.match(
      html,
      /hrefLang="x-default"[^>]+\/en\/tools\/map\/verteron\/type\/hidden-cube\//iu,
    );
  }

  const [altgardHidden, eltnenHidden, verteronRift, altgardRift] = await Promise.all([
    render("/en/tools/map/altgard/type/hidden-cube/"),
    render("/ko/tools/map/eltnen/type/hidden-cube/"),
    render("/en/tools/map/verteron/type/rift/"),
    render("/zh-hant/tools/map/altgard/type/rift/"),
  ]);
  for (const response of [altgardHidden, eltnenHidden, verteronRift, altgardRift]) {
    assert.equal(response.status, 200);
  }
  const [altgardHiddenHtml, eltnenHiddenHtml, verteronRiftHtml, altgardRiftHtml] =
    await Promise.all([
      altgardHidden.text(),
      eltnenHidden.text(),
      verteronRift.text(),
      altgardRift.text(),
    ]);
  assert.match(altgardHiddenHtml, /130/u);
  assert.match(eltnenHiddenHtml, /26/u);
  assert.match(verteronRiftHtml, /AION2 Interactive Map Rift Locations/u);
  assert.match(verteronRiftHtml, /#type=rift/u);
  assert.match(verteronRiftHtml, /\/en\/guides\/spacetime-rift\//u);
  assert.match(altgardRiftHtml, /AION2 互動地圖：[^<]+裂隙位置/u);
  assert.match(altgardRiftHtml, /10/u);
  assert.match(altgardRiftHtml, /\/zh-hant\/guides\/spacetime-rift\//u);
});

test("search keeps editorially unreviewed POIs out while retaining the published type index", async () => {
  const namedResponse = await render("/en/search/?q=Black+Warrior+Aed");
  assert.equal(namedResponse.status, 200);
  const namedHtml = await namedResponse.text();
  assert.doesNotMatch(namedHtml, /href="\/en\/tools\/map\/altgard\/poi\/black-warrior-aed-52563fe7\/"/);
  assert.match(namedHtml, /href="\/en\/tools\/map\/altgard\/type\/world-boss\/"/);

  const genericResponse = await render("/en/search/?q=world-boss-c0f2c226");
  assert.equal(genericResponse.status, 200);
  assert.doesNotMatch(
    await genericResponse.text(),
    /href="\/en\/tools\/map\/altgard\/poi\/world-boss-c0f2c226\/"/,
  );
});

test("publishes crawl directives", async () => {
  const [
    sitemapResponse,
    coreResponse,
    pagesResponse,
    contentResponse,
    mapsResponse,
    robotsResponse,
  ] = await Promise.all([
    render("/sitemap.xml/"),
    render("/sitemaps/core.xml"),
    render("/sitemaps/pages-zh-hant.xml"),
    render("/sitemaps/content-en.xml"),
    render("/sitemaps/maps-ko.xml"),
    render("/robots.txt/"),
  ]);
  for (const response of [
    sitemapResponse,
    pagesResponse,
    contentResponse,
    mapsResponse,
    robotsResponse,
  ]) {
    assert.equal(response.status, 200);
  }
  assert.equal(coreResponse.status, 404);

  const [sitemap, pages, content, maps] = await Promise.all([
    sitemapResponse.text(),
    pagesResponse.text(),
    contentResponse.text(),
    mapsResponse.text(),
  ]);
  const sitemapKinds = ["pages", "content", "maps"];
  const expectedSitemapPaths = siteLocales.flatMap((locale) =>
    sitemapKinds.map((kind) => `/sitemaps/${kind}-${locale}.xml`),
  );
  const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)]
    .map((match) => new URL(match[1]).pathname);
  assert.match(sitemap, /<sitemapindex/);
  assert.equal((sitemap.match(/<sitemap>/g) ?? []).length, expectedSitemapPaths.length);
  assert.deepEqual(new Set(sitemapPaths), new Set(expectedSitemapPaths));
  assert.match(sitemap, /\/sitemaps\/pages-zh-hant\.xml/);
  assert.match(sitemap, /\/sitemaps\/content-en\.xml/);
  assert.match(sitemap, /\/sitemaps\/maps-ko\.xml/);
  assert.match(
    sitemap,
    /<loc>http:\/\/localhost\/sitemaps\/pages-zh-hant\.xml<\/loc><lastmod>2026-08-03<\/lastmod>/,
  );
  assert.match(
    sitemap,
    /<loc>http:\/\/localhost\/sitemaps\/maps-ko\.xml<\/loc><lastmod>2026-07-26<\/lastmod>/,
  );
  assert.doesNotMatch(sitemap, /\/sitemaps\/core\.xml/);
  assert.doesNotMatch(sitemap, /<url>/);

  const pageLocations = [...pages.matchAll(/<loc>([^<]+)<\/loc>/gu)]
    .map((match) => match[1]);
  assert.equal(pageLocations.length, 15);
  assert.equal(new Set(pageLocations).size, pageLocations.length);
  assert.equal((pages.match(/<url>/g) ?? []).length, 15);
  assert.equal(
    (pages.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) ?? []).length,
    15,
  );
  assert.match(pages, /<loc>http:\/\/localhost\/zh-hant\/<\/loc>/);
  assert.match(pages, /<loc>http:\/\/localhost\/zh-hant\/codes\/<\/loc>/);
  assert.match(
    pages,
    new RegExp(
      `<loc>http://localhost/zh-hant/codes/</loc><lastmod>${codeRegistryUpdatedAt}</lastmod>`,
    ),
  );
  assert.match(pages, /<loc>http:\/\/localhost\/zh-hant\/tools\/<\/loc>/);
  assert.match(
    pages,
    /<loc>http:\/\/localhost\/zh-hant\/tools\/class-finder\/<\/loc><lastmod>2026-07-23<\/lastmod>/,
  );
  assert.equal(
    (pages.match(/<loc>http:\/\/localhost\/zh-hant\/tools\/class-finder\/<\/loc>/g) ?? []).length,
    1,
  );
  assert.doesNotMatch(pages, /\/tools\/class-finder\/(?:result|quiz)\//);
  assert.match(
    pages,
    /<loc>http:\/\/localhost\/zh-hant\/tools\/daily-checklist\/<\/loc><lastmod>2026-07-22<\/lastmod>/,
  );
  assert.match(
    pages,
    /<loc>http:\/\/localhost\/zh-hant\/tools\/event-timer\/<\/loc><lastmod>2026-08-03<\/lastmod>/,
  );
  assert.match(
    pages,
    /<loc>http:\/\/localhost\/zh-hant\/tools\/material-calculator\/<\/loc><lastmod>2026-07-23<\/lastmod>/,
  );
  assert.equal(
    (pages.match(/<loc>http:\/\/localhost\/zh-hant\/tools\/material-calculator\/<\/loc>/g) ?? []).length,
    1,
  );
  assert.doesNotMatch(pages, /\/tools\/material-calculator\/(?:result|plan)\//);
  assert.doesNotMatch(pages, /[?#]plan=/);
  assert.doesNotMatch(pages, /\/tools\/build-planner\//);
  assert.doesNotMatch(pages, /\/zh-hant\/tools\/map\/<\/loc>/);
  assert.doesNotMatch(pages, /<loc>http:\/\/localhost\/(?:en|ko)\//);
  assert.doesNotMatch(pages, /\/search\//);
  assert.match(pages, /hreflang="x-default" href="http:\/\/localhost\/en\/"/);
  assert.match(pages, /hreflang="x-default" href="http:\/\/localhost\/en\/codes\/"/);
  assert.doesNotMatch(pages, /hreflang="x-default" href="http:\/\/localhost\/"/);

  const contentLocations = [...content.matchAll(/<loc>([^<]+)<\/loc>/gu)]
    .map((match) => match[1]);
  assert.ok(contentLocations.length >= 27);
  assert.equal(new Set(contentLocations).size, contentLocations.length);
  assert.match(content, /\/en\/guides\/interactive-map-quickstart\/<\/loc>/);
  assert.match(content, /hreflang="x-default" href="http:\/\/localhost\/en\/guides\/interactive-map-quickstart\/"/);
  assert.match(content, /\/en\/news\/chapter-1-lands-of-sand-and-snow\/<\/loc>/);
  assert.match(content, /\/en\/aion-2-release-date\/<\/loc>/);
  assert.match(content, /\/en\/classes\/brawler\/<\/loc>/);
  assert.match(content, /\/en\/guides\/scam-check\/<\/loc>/);
  assert.match(content, /\/en\/guides\/soul-imprint\/<\/loc>/);
  assert.match(content, /\/en\/aion-2-server-regions\/<\/loc>/);
  assert.doesNotMatch(content, /\/en\/news\/global-server-regions\/<\/loc>/);
  for (const route of [
    "aion-2-wiki",
    "aion-2-gameplay",
    "aion-2-download",
    "aion-2-platforms",
    "aion-2-server-status",
    "aion-2-tier-list",
  ]) {
    assert.match(content, new RegExp(`/en/${route}/</loc>`, "u"));
  }
  assert.match(content, /\/en\/news\/chalice-of-muspel-sanctuary-update\/<\/loc>/);
  assert.match(content, /\/en\/news\/mirror-of-scarlet-desire-update\/<\/loc>/);
  assert.match(content, /\/en\/news\/corroded-decontamination-cross-faction-pve\/<\/loc>/);
  assert.match(content, /\/en\/news\/sunken-temple-100-day-update\/<\/loc>/);
  assert.match(content, /\/en\/news\/cradle-of-nihility-soul-fuse-update\/<\/loc>/);
  assert.match(content, /\/en\/guides\/pet-progression\/<\/loc>/);
  assert.match(content, /\/en\/guides\/abyss-status\/<\/loc>/);
  assert.doesNotMatch(content, /\/en\/codes\/<\/loc>/);
  assert.match(content, /\/en\/aion-2-system-requirements\/<\/loc>/);
  assert.match(content, /\/en\/guides\/deity-traces\/<\/loc>/);
  assert.match(content, /\/en\/guides\/godstone-imprint\/<\/loc>/);
  assert.match(content, /\/en\/guides\/kinah-bound\/<\/loc>/);
  assert.match(content, /\/en\/classes\/base-class-roster\/<\/loc>/);
  assert.doesNotMatch(content, /atlas-editorial-desk-launch/u);
  assert.match(content, /<lastmod>2026-07-14<\/lastmod>/);
  assert.match(content, /<lastmod>2026-07-22<\/lastmod>/);
  assert.doesNotMatch(content, /\/tools\/map\//);

  assert.equal((maps.match(/<url>/g) ?? []).length, 14);
  assert.equal((maps.match(/<loc>http:\/\/localhost\/ko\/tools\/map\/<\/loc>/g) ?? []).length, 1);
  assert.match(maps, /\/ko\/tools\/map\/<\/loc>/);
  assert.match(maps, /hreflang="x-default" href="http:\/\/localhost\/en\/tools\/map\/"/);
  assert.doesNotMatch(maps, /\/ko\/codes\/<\/loc>/);
  assert.match(maps, /\/ko\/tools\/map\/chaotic-lower-reshanta\/<\/loc>/);
  assert.match(maps, /\/ko\/tools\/map\/chaotic-middle-reshanta\/<\/loc>/);
  assert.match(maps, /\/ko\/tools\/map\/eltnen\/<\/loc>/);
  assert.match(maps, /\/ko\/tools\/map\/morheim\/<\/loc>/);
  assert.match(
    maps,
    /<loc>http:\/\/localhost\/ko\/tools\/map\/eltnen\/<\/loc><lastmod>2026-07-23<\/lastmod>/,
  );
  assert.match(
    maps,
    /<loc>http:\/\/localhost\/ko\/tools\/map\/morheim\/<\/loc><lastmod>2026-07-23<\/lastmod>/,
  );
  assert.match(
    maps,
    /<loc>http:\/\/localhost\/ko\/tools\/map\/verteron\/<\/loc><lastmod>2026-07-14<\/lastmod>/,
  );
  assert.match(maps, /hreflang="zh-Hant" href="http:\/\/localhost\/zh-hant\/tools\/map\/eltnen\/"/);
  assert.match(maps, /hreflang="en" href="http:\/\/localhost\/en\/tools\/map\/morheim\/"/);
  assert.match(maps, /hreflang="x-default" href="http:\/\/localhost\/en\/tools\/map\/eltnen\/"/);
  assert.match(maps, /\/ko\/tools\/map\/verteron\/type\/world-boss\//);
  assert.match(maps, /\/ko\/tools\/map\/altgard\/type\/world-boss\//);
  assert.match(maps, /\/ko\/tools\/map\/verteron\/type\/hidden-cube\//);
  assert.match(maps, /\/ko\/tools\/map\/altgard\/type\/hidden-cube\//);
  assert.match(maps, /\/ko\/tools\/map\/eltnen\/type\/hidden-cube\//);
  assert.match(maps, /\/ko\/tools\/map\/verteron\/type\/rift\//);
  assert.match(maps, /\/ko\/tools\/map\/altgard\/type\/rift\//);
  assert.match(
    maps,
    /<loc>http:\/\/localhost\/ko\/tools\/map\/eltnen\/type\/hidden-cube\/<\/loc><lastmod>2026-07-26<\/lastmod>/,
  );
  assert.doesNotMatch(maps, /\/ko\/tools\/map\/chaotic-upper-reshanta\//);
  assert.doesNotMatch(maps, /\/poi\//);
  assert.match(await robotsResponse.text(), /Sitemap:/i);
});

test("map SEO publication data is generated from stable slugs without file mtimes", async () => {
  const [publication, syncScript] = await Promise.all([
    readFile(new URL("../app/map-seo-publication.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/sync-map-seo-data.mjs", import.meta.url), "utf8"),
  ]);
  assert.match(publication, /black-warrior-aed-52563fe7/);
  assert.match(publication, /black-warrior-aed-52563fe7[^\n]+editorialReady: false, indexable: false/);
  assert.match(publication, /roah-2f438df2[^\n]+editorialReady: false, indexable: false/);
  assert.match(publication, /slug: "eltnen", contentMode: "marker-catalog", editorialReady: true, indexable: true, updatedAt: "2026-07-23"/);
  assert.match(publication, /slug: "morheim", contentMode: "complete-base-map", editorialReady: true, indexable: true, updatedAt: "2026-07-23"/);
  assert.match(publication, /publication\.contentMode === "complete-base-map"/);
  assert.match(publication, /cannot be indexable without use, source, and related content/);
  assert.doesNotMatch(syncScript, /\bmtime\b|\bstat\s*\(/);
  assert.doesNotMatch(syncScript, /replace\(\/\[\^a-z0-9\]/);
});

test("map URL state restores canonical map identity and complete share state", () => {
  const maps = [
    { key: "World_L_A", slug: "verteron" },
    { key: "World_D_A", slug: "morheim" },
  ];
  const restored = parseMapLocationUrl(
    "https://atlas.example/en/tools/map/morheim/#poi=boss-7&type=world-boss&center=123.5%2C456.25&zoom=3.75",
    maps,
    "World_L_A",
  );
  assert.deepEqual(restored, {
    mapName: "World_D_A",
    poi: "boss-7",
    type: "world-boss",
    viewport: { centerX: 123.5, centerY: 456.25, zoom: 3.75 },
  });

  const next = buildCanonicalMapUrl(
    "https://atlas.example/en/tools/map/?campaign=atlas#map=World_L_A&note=keep",
    "ko",
    maps[1],
    {
      poi: "boss-7",
      type: "world-boss",
      viewport: { centerX: 123.456, centerY: 456.254, zoom: 3.755 },
    },
  );
  const fragment = new URLSearchParams(next.hash.slice(1));
  assert.equal(next.pathname, "/ko/tools/map/morheim/");
  assert.equal(next.search, "?campaign=atlas");
  assert.equal(fragment.has("map"), false);
  assert.equal(fragment.get("note"), "keep");
  assert.equal(fragment.get("poi"), "boss-7");
  assert.equal(fragment.get("type"), "world-boss");
  assert.equal(fragment.get("center"), "123.46,456.25");
  assert.equal(fragment.get("zoom"), "3.75");
  assert.equal(new URL(localizedMapUrl(next, "zh-hant", maps[1])).hash, next.hash);

  const activeBundleMap = maps[0];
  const pendingSelection = maps[1].key;
  const pendingRoute = findMapRoute(maps, pendingSelection);
  assert.equal(activeBundleMap.slug, "verteron");
  assert.equal(pendingRoute?.slug, "morheim");
  assert.equal(
    buildCanonicalMapUrl(next, "en", pendingRoute).pathname,
    "/en/tools/map/morheim/",
  );
});

test("map Hub remains a CollectionPage route until an explicit map interaction", () => {
  const maps = [
    { key: "World_L_A", slug: "verteron" },
    { key: "World_D_A", slug: "morheim" },
  ];
  const hubUrl = "https://atlas.example/zh-hant/tools/map/?campaign=atlas#note=keep";

  assert.equal(isCommittedMapPath(hubUrl, maps), false);
  assert.equal(
    isCommittedMapPath("https://atlas.example/zh-hant/tools/map/verteron/", maps),
    true,
  );

  const passiveUpdate = buildMapFragmentUrl(hubUrl, {
    viewport: { centerX: 100, centerY: 200, zoom: 2.5 },
  });
  assert.equal(passiveUpdate.pathname, "/zh-hant/tools/map/");
  assert.equal(passiveUpdate.search, "?campaign=atlas");
  assert.equal(new URLSearchParams(passiveUpdate.hash.slice(1)).get("note"), "keep");

  const explicitInteraction = buildCanonicalMapUrl(
    passiveUpdate,
    "zh-hant",
    maps[1],
    { poi: "boss-7", type: "world-boss" },
  );
  assert.equal(explicitInteraction.pathname, "/zh-hant/tools/map/morheim/");
  assert.equal(new URLSearchParams(explicitInteraction.hash.slice(1)).get("poi"), "boss-7");
});

test("tool and mobile map interaction contracts stay explicit", async () => {
  const [toolRegistrySource, registeredToolRoute, interactiveMap, mapStyles, siteShell, homePage, homeChecklist] = await Promise.all([
    readFile(new URL("../app/tool-registry.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/[tool]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/map-app/InteractiveMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/tools/map/map-app.css", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/site/SiteShell.tsx", import.meta.url), "utf8"),
    readHomeImplementation(),
    readFile(new URL("../app/_components/home/HomeChecklistCard.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(toolRegistrySource, /type LiveToolDefinition[\s\S]+status: "live"[\s\S]+href: ToolRouteHref/);
  assert.match(toolRegistrySource, /route: \{ kind: "custom", href: "\/tools\/map\/" \}/);
  assert.match(toolRegistrySource, /Live tool \$\{tool\.slug\} must use \$\{expectedHref\}/);
  assert.match(toolRegistrySource, /tool\.route\.kind === "registry"/);
  assert.match(registeredToolRoute, /export function generateStaticParams\(\)/);
  assert.match(registeredToolRoute, /createRegistryToolStaticParams\(\)/);
  assert.match(interactiveMap, /window\.addEventListener\("hashchange", applyLocationState\)/);
  assert.match(interactiveMap, /window\.addEventListener\("popstate", applyLocationState\)/);
  assert.match(interactiveMap, /hash\.get\("point"\) \?\? hash\.get\("poi"\)/);
  assert.match(interactiveMap, /addChecklistItem\(\{/);
  assert.match(interactiveMap, /trackEvent\("map_to_checklist_add"/);
  assert.match(mapStyles, /\.detail-actions \.checklist-action/);
  assert.match(interactiveMap, /initialTypesCollapsed\(\)/);
  assert.match(interactiveMap, /initialDetailCollapsed\(\)/);
  assert.match(interactiveMap, /const \[sidebarCollapsed, setSidebarCollapsed\] = useState/);
  assert.match(interactiveMap, /const \[typesCollapsed, setTypesCollapsed\] = useState/);
  assert.match(interactiveMap, /const \[detailCollapsed, setDetailCollapsed\] = useState/);
  assert.match(interactiveMap, /<PanelLeftClose/);
  assert.match(interactiveMap, /<PanelLeftOpen/);
  assert.match(interactiveMap, /event\.key !== "Tab"/);
  assert.match(interactiveMap, /inert=\{sidebarCollapsed \|\| Boolean\(sharePreview\)/);
  assert.match(mapStyles, /@media \(max-width: 920px\)/);
  assert.match(mapStyles, /@media \(max-width: 560px\)/);
  assert.match(interactiveMap, /aria-pressed=\{active\}/);
  assert.match(interactiveMap, /aria-pressed=\{showLabels\}/);
  assert.match(interactiveMap, /aria-pressed=\{showRegions\}/);
  assert.match(siteShell, /aria-busy=\{isThemeTransitioning\}/);
  assert.equal((siteShell.match(/disabled=\{isThemeTransitioning\}/g) ?? []).length, 2);
  assert.equal(
    (
      homePage.match(
        /disabled=\{Boolean\(preparingTheme\) \|\| hasEntered\}/g,
      ) ?? []
    ).length,
    2,
  );
  assert.match(homePage, /LazyHomeChecklistCard/);
  assert.match(homeChecklist, /checklistStore\.subscribe/);
  assert.doesNotMatch(homePage, /const expeditionTasks =/);
});

test("publishes a localized, indexable class finder landing page", async () => {
  const [zhResponse, enResponse, koResponse, toolsResponse] = await Promise.all([
    render("/zh-hant/tools/class-finder/"),
    render("/en/tools/class-finder/"),
    render("/ko/tools/class-finder/"),
    render("/zh-hant/tools/"),
  ]);

  for (const response of [zhResponse, enResponse, koResponse, toolsResponse]) {
    assert.equal(response.status, 200);
  }

  const [zhHtml, enHtml, koHtml, toolsHtml] = await Promise.all([
    zhResponse.text(),
    enResponse.text(),
    koResponse.text(),
    toolsResponse.text(),
  ]);

  assert.match(zhHtml, /<title>AION2 職業推薦器：依玩法找到適合職業 \| AION2 KINA<\/title>/);
  assert.match(zhHtml, /<h1[^>]*>AION2 職業推薦器：依玩法找到適合你的職業<\/h1>/);
  assert.match(zhHtml, /rel="canonical"[^>]+\/zh-hant\/tools\/class-finder\//i);
  assert.match(zhHtml, /hrefLang="x-default"[^>]+\/en\/tools\/class-finder\//i);
  assert.match(zhHtml, /"@type":"WebApplication"/);
  assert.match(zhHtml, /"@type":"FAQPage"/);
  assert.match(zhHtml, /"@type":"BreadcrumbList"/);
  assert.match(zhHtml, /href="\/zh-hant\/classes\/difficulty-comparison\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/classes\/class-choice-guide\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/tools\/map\/"/);
  assert.match(enHtml, /AION2 Class Finder: Find the Right Class for Your Playstyle/);
  assert.match(renderedDescription(enHtml), /personal fit, not power or patch tiers/i);
  assert.match(koHtml, /AION2 직업 추천기: 플레이 성향에 맞는 직업 찾기/);
  for (const html of [zhHtml, enHtml, koHtml]) {
    const descriptionLength = Array.from(renderedDescription(html)).length;
    assert.ok(descriptionLength >= SEO_DESCRIPTION_MIN_LENGTH);
    assert.ok(descriptionLength <= SEO_DESCRIPTION_MAX_LENGTH);
  }
  assert.match(toolsHtml, /href="\/zh-hant\/tools\/class-finder\/"/);
  assert.match(toolsHtml, /AION2 職業推薦器/);
});

test("class finder creates a local, accessible result poster with official class icons", async () => {
  const [finder, dialog, poster] = await Promise.all([
    readFile(
      new URL("../app/_components/tools/ClassFinder.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../app/_components/tools/ClassFinderShareDialog.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../app/class-finder-poster.ts", import.meta.url), "utf8"),
  ]);

  assert.match(finder, /setShareDialogOpen\(true\)/);
  assert.match(finder, /<ClassFinderShareDialog/);
  assert.match(dialog, /<dialog/);
  assert.match(dialog, /aria-labelledby="class-finder-share-title"/);
  assert.match(dialog, /aria-busy=\{posterStatus === "loading"\}/);
  assert.match(dialog, /navigator\.canShare\(\{ files: \[file\] \}\)/);
  assert.match(dialog, /new ClipboardItem\(\{ "image\/png": poster\.blob \}\)/);
  assert.match(dialog, /link\.download = poster\.fileName/);
  assert.match(dialog, /navigator\.clipboard\.writeText\(shareUrl\)/);
  assert.match(poster, /canvas\.width = WIDTH/);
  assert.match(poster, /canvas\.height = HEIGHT/);
  assert.match(poster, /spiritmaster: "\/class-icons\/spiritmaster\.png"/);

  const iconSlugs = [
    "gladiator",
    "templar",
    "assassin",
    "ranger",
    "sorcerer",
    "spiritmaster",
    "cleric",
    "chanter",
    "brawler",
  ];
  for (const slug of iconSlugs) {
    const icon = await readFile(
      new URL(`../public/class-icons/${slug}.png`, import.meta.url),
    );
    assert.deepEqual(Array.from(icon.subarray(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10]);
  }
});

test("publishes a localized, indexable crafting recipe directory", async () => {
  const [zhResponse, enResponse, koResponse, toolsResponse] = await Promise.all([
    render("/zh-hant/tools/material-calculator/"),
    render("/en/tools/material-calculator/"),
    render("/ko/tools/material-calculator/"),
    render("/zh-hant/tools/"),
  ]);

  for (const response of [zhResponse, enResponse, koResponse, toolsResponse]) {
    assert.equal(response.status, 200);
  }

  const [zhHtml, enHtml, koHtml, toolsHtml] = await Promise.all([
    zhResponse.text(),
    enResponse.text(),
    koResponse.text(),
    toolsResponse.text(),
  ]);

  assert.match(zhHtml, /<title>AION2 製作配方與材料計算器｜需求、缺口與成本<\/title>/);
  assert.match(zhHtml, /<h1[^>]*>AION2 製作配方與材料計算器<\/h1>/);
  assert.match(zhHtml, /rel="canonical"[^>]+\/zh-hant\/tools\/material-calculator\//i);
  assert.match(zhHtml, /hrefLang="x-default"[^>]+\/en\/tools\/material-calculator\//i);
  assert.match(zhHtml, /"@type":"WebApplication"/);
  assert.match(zhHtml, /"@type":"CollectionPage"/);
  assert.match(zhHtml, /"@type":"ItemList"/);
  assert.match(zhHtml, /"@type":"FAQPage"/);
  assert.match(zhHtml, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(zhHtml, /"@type":"Recipe"/);
  assert.match(zhHtml, /894 筆明確標示製作專業的配方/);
  assert.match(zhHtml, /2026-07-10 社群快照/);
  assert.match(zhHtml, /直接材料/);
  assert.match(zhHtml, /基礎材料/);
  assert.match(zhHtml, /href="\/zh-hant\/tools\/material-calculator\/recipe\/item-110120001\/"/);
  assert.match(zhHtml, /href="\/zh-hant\/tools\/material-calculator\/custom\/"/);
  assert.doesNotMatch(zhHtml, /name="robots"[^>]+noindex/i);

  assert.match(enHtml, /AION2 Crafting Recipe &amp; Material Calculator/);
  assert.match(enHtml, /894 recipes that identify a crafting profession/i);
  assert.match(enHtml, /href="https:\/\/aion2hub\.com\/"/i);
  assert.match(
    enHtml,
    /rel="nofollow noopener noreferrer"[^>]*>Open the AION2Hub community recipe snapshot<\/a>/i,
  );
  assert.match(enHtml, /"citation":"https:\/\/aion2hub\.com\/"/i);
  assert.match(enHtml, /"isBasedOn":"https:\/\/aion2hub\.com\/"/i);
  assert.match(koHtml, /AION2 제작 레시피 및 재료 계산기/);
  assert.match(koHtml, /제작 전문 기술이 명시된 894개 레시피/);
  for (const html of [zhHtml, enHtml, koHtml]) {
    const descriptionLength = Array.from(renderedDescription(html)).length;
    assert.ok(descriptionLength >= SEO_DESCRIPTION_MIN_LENGTH);
    assert.ok(descriptionLength <= SEO_DESCRIPTION_MAX_LENGTH);
  }

  assert.match(toolsHtml, /href="\/zh-hant\/tools\/material-calculator\/"/);
  assert.match(toolsHtml, /製作配方與材料計算器/);
});

test("renders stable trilingual crafting detail calculators without indexing snapshot pages", async () => {
  const recipeId = "item-110120001";
  const [zhResponse, enResponse, koResponse, customResponse] = await Promise.all([
    render(`/zh-hant/tools/material-calculator/recipe/${recipeId}/`),
    render(`/en/tools/material-calculator/recipe/${recipeId}/`),
    render(`/ko/tools/material-calculator/recipe/${recipeId}/`),
    render("/zh-hant/tools/material-calculator/custom/"),
  ]);
  for (const response of [zhResponse, enResponse, koResponse, customResponse]) {
    assert.equal(response.status, 200);
  }

  const [zhHtml, enHtml, koHtml, customHtml] = await Promise.all([
    zhResponse.text(),
    enResponse.text(),
    koResponse.text(),
    customResponse.text(),
  ]);
  assert.match(zhHtml, /<title>應龍王巨劍 材料計算器 \| AION2 KINA<\/title>/);
  assert.match(zhHtml, /name="robots" content="noindex, follow"/i);
  assert.match(zhHtml, /rel="canonical"[^>]+\/zh-hant\/tools\/material-calculator\/recipe\/item-110120001\//i);
  assert.match(zhHtml, /hrefLang="en"[^>]+\/en\/tools\/material-calculator\/recipe\/item-110120001\//i);
  assert.match(zhHtml, /製作材料計算器/);
  assert.match(zhHtml, /達人閃耀的奧里哈康巨劍/);
  assert.match(zhHtml, /配方資料/);
  assert.match(zhHtml, /來源沒有標示單次產量，因此本頁依製作次數計算/);
  assert.match(zhHtml, /"@type":"WebApplication"/);
  assert.match(zhHtml, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(zhHtml, /"@type":"Recipe"/);
  assert.match(enHtml, /Noble Dragon Lord Greatsword material calculator/i);
  assert.match(koHtml, /응룡왕의 대검 재료 계산기/);
  assert.match(customHtml, /AION2 自訂材料計畫器/);
  assert.match(customHtml, /name="robots" content="noindex, follow"/i);
});
