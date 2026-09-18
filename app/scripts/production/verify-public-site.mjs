#!/usr/bin/env node

import { pathToFileURL } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;
const RETRYABLE_STATUS_CODES = new Set([403, 408, 425, 429, 500, 502, 503, 504]);
const DEFAULT_FETCH_ATTEMPTS = 4;
const DEFAULT_FETCH_CONCURRENCY = 2;
const FULL_CRAWL_CONCURRENCY = 4;
const SEO_TITLE_MAX_LENGTH = 60;
const SEO_DESCRIPTION_MIN_LENGTH = 110;
const SEO_DESCRIPTION_MAX_LENGTH = 160;
export const PUBLIC_LOCALE_CONFIG = Object.freeze({
  "zh-hans": Object.freeze({ htmlLang: "zh-Hans", hreflang: "zh-Hans" }),
  en: Object.freeze({ htmlLang: "en", hreflang: "en" }),
  fr: Object.freeze({ htmlLang: "fr", hreflang: "fr" }),
  de: Object.freeze({ htmlLang: "de", hreflang: "de" }),
  es: Object.freeze({ htmlLang: "es-ES", hreflang: "es-ES" }),
  ja: Object.freeze({ htmlLang: "ja", hreflang: "ja" }),
  "pt-br": Object.freeze({ htmlLang: "pt-BR", hreflang: "pt-BR" }),
  ru: Object.freeze({ htmlLang: "ru", hreflang: "ru" }),
  ko: Object.freeze({ htmlLang: "ko", hreflang: "ko" }),
  "zh-hant": Object.freeze({ htmlLang: "zh-Hant", hreflang: "zh-Hant" }),
});
export const PUBLIC_LOCALES = Object.freeze(Object.keys(PUBLIC_LOCALE_CONFIG));
export const PUBLIC_SITEMAP_KINDS = Object.freeze(["pages", "content", "maps"]);
const AUDITED_IMAGE_SOURCES = new Set([
  "/aion2-logo.webp",
  "/aion2-elyos.webp",
  "/aion2-asmodian.webp",
  "/aion2-dual-mobile.webp",
  "/aion2-dual.webp",
]);

export function validateProductionBaseUrl(value, { requireCustomDomain = false } = {}) {
  const url = new URL(value);
  if (url.protocol !== "https:") throw new Error("Production URL must use HTTPS.");
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Production URL must be an origin without a path, query, or fragment.");
  }
  if (requireCustomDomain && url.hostname.endsWith(".chatgpt.site")) {
    throw new Error("A custom primary domain is required; chatgpt.site is only the source/fallback host.");
  }
  return url;
}

function timeoutSignal(milliseconds = 15_000) {
  return AbortSignal.timeout(milliseconds);
}

function retryDelay(attempt) {
  return Math.min(2_000, 250 * (2 ** attempt));
}

export async function fetchWithRetry(url, options = {}, {
  attempts = DEFAULT_FETCH_ATTEMPTS,
  acceptedStatuses,
  retryForbidden = false,
  onRetry,
} = {}) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        redirect: "follow",
        signal: timeoutSignal(),
        ...options,
      });
    } catch (error) {
      lastError = error;
      if (attempt + 1 >= attempts) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`${url} failed after ${attempts} attempts: ${reason}`, { cause: error });
      }
      onRetry?.({ attempt: attempt + 1, reason: "network", url: String(url) });
      await delay(retryDelay(attempt));
      continue;
    }
    if (new URL(response.url).origin !== new URL(url).origin) {
      throw new Error(`${url} redirected to a foreign origin.`);
    }
    const accepted = acceptedStatuses
      ? acceptedStatuses.has(response.status)
      : response.ok;
    if (accepted) return response;
    lastError = new Error(`${url} returned ${response.status}.`);
    const retryable = RETRYABLE_STATUS_CODES.has(response.status) &&
      (response.status !== 403 || retryForbidden);
    if (!retryable || attempt + 1 >= attempts) throw lastError;
    await response.body?.cancel().catch(() => undefined);
    onRetry?.({
      attempt: attempt + 1,
      reason: `http-${response.status}`,
      url: String(url),
    });
    if (attempt + 1 < attempts) {
      await delay(retryDelay(attempt));
    }
  }
  throw lastError ?? new Error(`${url} failed without a response.`);
}

async function fetchOk(url, options = {}, policy = {}) {
  return fetchWithRetry(url, options, policy);
}

async function mapWithConcurrency(values, mapper, concurrency = DEFAULT_FETCH_CONCURRENCY) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, () => worker()),
  );
  return results;
}

function decodeHtmlAttribute(value) {
  return value
    .replace(/&#x([0-9a-f]+);/giu, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/gu, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "iu"));
  const value = match?.[1] ?? match?.[2];
  return value === undefined ? undefined : decodeHtmlAttribute(value);
}

function metaContent(document, key, value) {
  for (const match of document.matchAll(/<meta\b[^>]*>/giu)) {
    const tag = match[0];
    if (attributeValue(tag, key)?.toLowerCase() === value.toLowerCase()) {
      return attributeValue(tag, "content");
    }
  }
  return undefined;
}

function linkValues(document, relation) {
  const values = [];
  for (const match of document.matchAll(/<link\b[^>]*>/giu)) {
    const tag = match[0];
    const relations = (attributeValue(tag, "rel") ?? "").toLowerCase().split(/\s+/u);
    if (!relations.includes(relation.toLowerCase())) continue;
    values.push({
      href: attributeValue(tag, "href"),
      hreflang: attributeValue(tag, "hreflang") ?? attributeValue(tag, "hrefLang"),
    });
  }
  return values;
}

export function inspectIndexableHtml(document, requestedUrl) {
  const url = new URL(requestedUrl);
  const canonical = linkValues(document, "canonical").map((link) => link.href).filter(Boolean);
  const alternates = linkValues(document, "alternate")
    .filter((link) => link.href && link.hreflang)
    .map((link) => ({ href: link.href, hreflang: link.hreflang }));
  const rawTitle = document.match(/<title>([\s\S]*?)<\/title>/iu)?.[1]?.trim();
  const title = rawTitle ? decodeHtmlAttribute(rawTitle) : undefined;
  const description = metaContent(document, "name", "description")?.trim();
  const robots = metaContent(document, "name", "robots") ?? "";
  const htmlLang = document.match(/<html\b[^>]*\blang=(?:"([^"]+)"|'([^']+)')/iu)?.slice(1).find(Boolean);
  const headings = [...document.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/giu)]
    .map((match) => match[1].replace(/<[^>]+>/gu, " ").replace(/\s+/gu, " ").trim())
    .filter(Boolean);
  const structuredData = [];
  for (const match of document.matchAll(/<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/giu)) {
    try {
      structuredData.push(JSON.parse(match[1]));
    } catch {
      structuredData.push(null);
    }
  }
  const images = [...document.matchAll(/<img\b[^>]*>/giu)].map((match) => ({
    src: attributeValue(match[0], "src"),
    alt: attributeValue(match[0], "alt"),
  }));
  return {
    url: url.toString(),
    title,
    description,
    canonical,
    alternates,
    robots,
    htmlLang,
    headings,
    social: {
      openGraphTitle: metaContent(document, "property", "og:title"),
      openGraphDescription: metaContent(document, "property", "og:description"),
      openGraphImage: metaContent(document, "property", "og:image"),
      openGraphImageAlt: metaContent(document, "property", "og:image:alt"),
      twitterCard: metaContent(document, "name", "twitter:card"),
      twitterTitle: metaContent(document, "name", "twitter:title"),
      twitterDescription: metaContent(document, "name", "twitter:description"),
      twitterImage: metaContent(document, "name", "twitter:image"),
      twitterImageAlt: metaContent(document, "name", "twitter:image:alt"),
    },
    images,
    structuredData,
  };
}

function duplicateValues(records, field) {
  const values = new Map();
  for (const record of records) {
    const value = record[field];
    if (!value) continue;
    const urls = values.get(value) ?? [];
    urls.push(record.url);
    values.set(value, urls);
  }
  return [...values.entries()].filter(([, urls]) => urls.length > 1);
}

function structuredDataNodes(values) {
  const nodes = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== "object") return;
    if (value["@type"]) nodes.push(value);
    if (Array.isArray(value["@graph"])) value["@graph"].forEach(visit);
  };
  values.forEach(visit);
  return nodes;
}

function structuredDataTypes(node) {
  return new Set(
    (Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]])
      .filter((value) => typeof value === "string"),
  );
}

function validateStructuredData(record, origin) {
  const nodes = structuredDataNodes(record.structuredData);
  if (nodes.length === 0) {
    throw new Error(`${record.url} has no typed JSON-LD entity.`);
  }

  for (const node of nodes) {
    const types = structuredDataTypes(node);
    if (
      [...types].some((type) =>
        ["Article", "NewsArticle", "TechArticle"].includes(type))
    ) {
      for (const field of [
        "headline",
        "datePublished",
        "dateModified",
        "author",
        "publisher",
        "mainEntityOfPage",
        "image",
      ]) {
        if (!node[field]) {
          throw new Error(`${record.url} has an article entity without ${field}.`);
        }
      }
    }
    if (types.has("BreadcrumbList")) {
      const items = node.itemListElement;
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error(`${record.url} has an empty BreadcrumbList.`);
      }
      for (const [index, item] of items.entries()) {
        if (
          item?.["@type"] !== "ListItem" ||
          item.position !== index + 1 ||
          !item.name ||
          !item.item
        ) {
          throw new Error(`${record.url} has an invalid breadcrumb at position ${index + 1}.`);
        }
        if (new URL(item.item, origin).origin !== origin.origin) {
          throw new Error(`${record.url} has a breadcrumb URL outside the primary domain.`);
        }
      }
    }
  }
}

function requirePinnedAssetPath(value, prefix, label) {
  if (
    typeof value !== "string" ||
    !value.startsWith(prefix) ||
    value.includes("\\") ||
    /[?#]/u.test(value) ||
    value.split("/").some((segment) => segment === "." || segment === "..")
  ) {
    throw new Error(`${label} is not pinned to ${prefix}`);
  }
  return value;
}

export function validateRuntimeBundleAssets(bundle, versionKey) {
  if (!VERSION_KEY_PATTERN.test(versionKey)) {
    throw new Error("Runtime bundle asset validation received an invalid versionKey.");
  }
  const releasePrefix = `/releases/${versionKey}/`;
  const tilePrefix = `${releasePrefix}maps/`;
  const iconPrefix = `${releasePrefix}icons/`;
  if (!Array.isArray(bundle.maps) || bundle.maps.length === 0) {
    throw new Error("Runtime bundle has no maps to validate.");
  }
  if (!Array.isArray(bundle.categories) || !Array.isArray(bundle.markers)) {
    throw new Error("Runtime bundle has no category or marker assets to validate.");
  }

  const tileTemplates = bundle.maps.map((map, index) =>
    requirePinnedAssetPath(map?.tileTemplate, tilePrefix, `Map tile template ${index}`),
  );
  const iconPaths = [];
  for (const [categoryIndex, category] of (bundle.categories ?? []).entries()) {
    for (const [subtypeIndex, subtype] of (category.subtypes ?? []).entries()) {
      for (const field of ["iconUrl", "darkIconUrl"]) {
        const value = subtype?.[field];
        if (!value) continue;
        iconPaths.push(requirePinnedAssetPath(
          value,
          iconPrefix,
          `Category ${categoryIndex} subtype ${subtypeIndex} ${field}`,
        ));
      }
    }
  }
  for (const [markerIndex, marker] of (bundle.markers ?? []).entries()) {
    for (const field of ["iconUrl", "darkIconUrl"]) {
      const value = marker?.[field];
      if (!value) continue;
      iconPaths.push(requirePinnedAssetPath(value, iconPrefix, `Marker ${markerIndex} ${field}`));
    }
  }
  if (iconPaths.length === 0) {
    throw new Error("Runtime bundle has no versioned icon to verify.");
  }

  const map = bundle.maps.find((candidate) => candidate?.name === bundle.mapName) ?? bundle.maps[0];
  const tilePath = map.tileTemplate
    .replace("{z}", String(map.tileMinZoom ?? 0))
    .replace("{x}", "0")
    .replace("{y}", "0");
  if (/[{}]/u.test(tilePath)) {
    throw new Error("Runtime bundle tile template contains unsupported placeholders.");
  }
  return { tilePath, iconPath: iconPaths[0], tileTemplates, iconPaths };
}

export async function verifyPublicSite(baseUrl, { requireCustomDomain = false } = {}) {
  const origin = validateProductionBaseUrl(baseUrl, { requireCustomDomain });
  let transientRetryCount = 0;
  const fetchPolicy = {
    retryForbidden: !requireCustomDomain,
    onRetry: () => { transientRetryCount += 1; },
  };
  const initialUrls = [
    new URL("/robots.txt", origin),
    new URL("/sitemap.xml", origin),
    new URL("/zh-hant/tools/map/verteron/", origin),
    new URL("/map-runtime/manifest.json", origin),
    new URL("/zh-hant/news/", origin),
    new URL("/zh-hant/tools/", origin),
    new URL("/en/classes/class-planning-framework/", origin),
    new URL("/zh-hant/aion-2-release-date/", origin),
  ];
  const [
    robotsResponse,
    sitemapResponse,
    mapPageResponse,
    manifestResponse,
    newsHubResponse,
    toolsHubResponse,
    contentDetailResponse,
    keywordDetailResponse,
  ] = await mapWithConcurrency(initialUrls, (url) => fetchOk(url, {}, fetchPolicy));
  const [
    robots,
    sitemap,
    mapPage,
    manifest,
    newsHub,
    toolsHub,
    contentDetail,
    keywordDetail,
  ] = await Promise.all([
    robotsResponse.text(),
    sitemapResponse.text(),
    mapPageResponse.text(),
    manifestResponse.json(),
    newsHubResponse.text(),
    toolsHubResponse.text(),
    contentDetailResponse.text(),
    keywordDetailResponse.text(),
  ]);
  if (!robots.includes(`${origin.origin}/sitemap.xml`)) {
    throw new Error("robots.txt does not advertise the primary-domain sitemap.");
  }
  if (
    !robots.includes("Disallow: /admin/") ||
    !robots.includes("Disallow: /api/admin/")
  ) {
    throw new Error("robots.txt does not protect the private administration routes.");
  }
  const [llmsResponse, faviconResponse] = await mapWithConcurrency(
    [new URL("/llms.txt", origin), new URL("/favicon.ico", origin)],
    (url) => fetchOk(url, {}, fetchPolicy),
  );
  const llms = await llmsResponse.text();
  if (
    !llms.includes(`Canonical: ${origin.origin}/`) ||
    !llms.includes(`XML sitemap: ${origin.origin}/sitemap.xml`) ||
    llms.includes("/database/items/")
  ) {
    throw new Error("llms.txt is missing canonical discovery links or contains a retired route.");
  }
  if (!/^image\/(?:x-icon|vnd\.microsoft\.icon)/iu.test(faviconResponse.headers.get("content-type") ?? "")) {
    throw new Error("favicon.ico is missing or is not served as an icon.");
  }
  if (!sitemap.includes("<sitemapindex")) {
    throw new Error("Primary sitemap is not a sitemap index.");
  }
  const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/gu)]
    .map((match) => new URL(match[1]));
  const expectedSitemaps = PUBLIC_LOCALES.flatMap((locale) =>
    PUBLIC_SITEMAP_KINDS.map((kind) => `/sitemaps/${kind}-${locale}.xml`),
  );
  if (
    sitemapUrls.length !== expectedSitemaps.length ||
    expectedSitemaps.some((pathname) => !sitemapUrls.some((candidate) => candidate.pathname === pathname))
  ) {
    throw new Error("Sitemap index does not contain the complete language and content-type set.");
  }
  if (sitemapUrls.some((candidate) => candidate.origin !== origin.origin)) {
    throw new Error("Sitemap index contains a foreign host.");
  }
  const childSitemapResponses = await mapWithConcurrency(
    sitemapUrls,
    (url) => fetchOk(url, { redirect: "manual" }, fetchPolicy),
  );
  const childSitemaps = await Promise.all(childSitemapResponses.map((response) => response.text()));
  const indexedUrls = [...new Map(childSitemaps.flatMap((document) =>
    [...document.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/gu)]
      .map((match) => {
        const candidate = new URL(decodeHtmlAttribute(match[1]));
        return [candidate.toString(), candidate];
      }),
  )).values()];
  const childUrls = childSitemaps.flatMap((document) => [
    ...[...document.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/gu)]
      .map((match) => new URL(match[1])),
    ...[...document.matchAll(/<xhtml:link\b[^>]*\bhref="(https:\/\/[^"<]+)"[^>]*\/?\s*>/gu)]
      .map((match) => new URL(match[1])),
  ]);
  if (childUrls.length === 0 || childUrls.some((candidate) => candidate.origin !== origin.origin)) {
    throw new Error("A child sitemap is empty or contains a foreign canonical host.");
  }
  if (indexedUrls.length === 0 || indexedUrls.some((candidate) => candidate.origin !== origin.origin)) {
    throw new Error("Child sitemaps do not expose a valid same-origin indexable URL set.");
  }
  for (const locale of PUBLIC_LOCALES) {
    if (!childUrls.some((candidate) => candidate.pathname === `/${locale}/tools/map/`)) {
      throw new Error(`Map sitemap is missing the ${locale} map hub.`);
    }
    if (!indexedUrls.some((candidate) => candidate.pathname === `/${locale}/codes/`)) {
      throw new Error(`Sitemap set is missing the ${locale} codes page.`);
    }
  }
  if (!mapPage.includes(`rel="canonical" href="${origin.origin}/zh-hant/tools/map/verteron/"`)) {
    throw new Error("Map page canonical does not use the primary domain.");
  }

  const indexedDocuments = await mapWithConcurrency(
    indexedUrls,
    async (url) => {
      const response = await fetchOk(
        url,
        { headers: { accept: "text/html" }, redirect: "manual" },
        fetchPolicy,
      );
      return response.text();
    },
    FULL_CRAWL_CONCURRENCY,
  );
  const indexedRecords = indexedDocuments.map((document, index) =>
    inspectIndexableHtml(document, indexedUrls[index]));
  const indexedUrlSet = new Set(indexedRecords.map((record) => record.url));
  const expectedHreflangs = new Set([
    ...Object.values(PUBLIC_LOCALE_CONFIG).map(({ hreflang }) => hreflang),
    "x-default",
  ]);
  for (const record of indexedRecords) {
    if (record.canonical.length !== 1 || record.canonical[0] !== record.url) {
      throw new Error(`${record.url} does not expose exactly one matching self-canonical.`);
    }
    if (!record.title || !record.description) {
      throw new Error(`${record.url} is missing a title or meta description.`);
    }
    const titleLength = Array.from(record.title).length;
    const descriptionLength = Array.from(record.description).length;
    if (titleLength > SEO_TITLE_MAX_LENGTH) {
      throw new Error(`${record.url} title is ${titleLength} characters; maximum is ${SEO_TITLE_MAX_LENGTH}.`);
    }
    if (
      descriptionLength < SEO_DESCRIPTION_MIN_LENGTH ||
      descriptionLength > SEO_DESCRIPTION_MAX_LENGTH
    ) {
      throw new Error(
        `${record.url} meta description is ${descriptionLength} characters; expected ${SEO_DESCRIPTION_MIN_LENGTH}-${SEO_DESCRIPTION_MAX_LENGTH}.`,
      );
    }
    const localeSlug = new URL(record.url).pathname.split("/").filter(Boolean)[0];
    const expectedHtmlLang = PUBLIC_LOCALE_CONFIG[localeSlug]?.htmlLang;
    if (!expectedHtmlLang || record.htmlLang !== expectedHtmlLang) {
      throw new Error(`${record.url} has an incorrect or missing HTML language.`);
    }
    if (record.headings.length !== 1) {
      throw new Error(`${record.url} must expose exactly one non-empty H1.`);
    }
    if (/\bnoindex\b/iu.test(record.robots)) {
      throw new Error(`${record.url} is listed in a sitemap but marked noindex.`);
    }
    const alternateLanguages = new Set(record.alternates.map((alternate) => alternate.hreflang));
    if (
      alternateLanguages.size !== expectedHreflangs.size ||
      [...expectedHreflangs].some((language) => !alternateLanguages.has(language))
    ) {
      throw new Error(`${record.url} does not expose the complete reciprocal hreflang set.`);
    }
    for (const alternate of record.alternates) {
      const alternateUrl = new URL(alternate.href);
      if (alternateUrl.origin !== origin.origin || !indexedUrlSet.has(alternateUrl.toString())) {
        throw new Error(`${record.url} references a hreflang URL outside the indexed same-origin set.`);
      }
    }
    if (Object.values(record.social).some((value) => !value)) {
      throw new Error(`${record.url} is missing Open Graph or Twitter metadata.`);
    }
    if (
      record.social.openGraphDescription !== record.description ||
      record.social.twitterDescription !== record.description
    ) {
      throw new Error(`${record.url} does not use the optimized description consistently.`);
    }
    const missingAuditedAlt = record.images.find(({ src, alt }) =>
      src && AUDITED_IMAGE_SOURCES.has(new URL(src, record.url).pathname) && !alt?.trim());
    if (missingAuditedAlt) {
      throw new Error(`${record.url} has an empty alt for ${missingAuditedAlt.src}.`);
    }
    if (record.structuredData.some((value) => value === null)) {
      throw new Error(`${record.url} contains malformed JSON-LD.`);
    }
    validateStructuredData(record, origin);
    const imageWithoutAlt = record.images.find(({ alt }) => alt === undefined);
    if (imageWithoutAlt) {
      throw new Error(`${record.url} has an image without an alt attribute.`);
    }
  }
  const duplicateTitles = duplicateValues(indexedRecords, "title");
  const duplicateDescriptions = duplicateValues(indexedRecords, "description");
  if (duplicateTitles.length > 0 || duplicateDescriptions.length > 0) {
    throw new Error("The indexed URL set contains duplicate titles or descriptions.");
  }

  const noindexPaths = [
    "/en/search/?q=aion2",
    "/en/database/item/110120001/",
    "/en/tools/material-calculator/custom/",
    "/en/tools/material-calculator/recipe/item-110120001/",
    "/en/tools/map/altgard/poi/black-warrior-aed-52563fe7/",
    "/admin/login/",
  ];
  const noindexResponses = await mapWithConcurrency(
    noindexPaths.map((path) => new URL(path, origin)),
    (url) => fetchOk(url, { headers: { accept: "text/html" } }, fetchPolicy),
  );
  const noindexDocuments = await Promise.all(noindexResponses.map((response) => response.text()));
  for (const [index, document] of noindexDocuments.entries()) {
    const requestedUrl = new URL(noindexPaths[index], origin);
    const record = inspectIndexableHtml(document, requestedUrl);
    if (!/\bnoindex\b/iu.test(record.robots)) {
      throw new Error(`${requestedUrl} is a private, generated, or thin page without noindex.`);
    }
    if (indexedUrlSet.has(requestedUrl.toString())) {
      throw new Error(`${requestedUrl} is marked noindex but is also listed in a sitemap.`);
    }
  }
  const adminRobots = noindexResponses.at(-1)?.headers.get("x-robots-tag") ?? "";
  if (!/\bnoindex\b/iu.test(adminRobots) || !/\bnofollow\b/iu.test(adminRobots)) {
    throw new Error("The admin login is missing an X-Robots-Tag noindex, nofollow header.");
  }
  for (const [label, document, expectedUrl] of [
    ["News hub", newsHub, `${origin.origin}/zh-hant/news/`],
    ["Tools hub", toolsHub, `${origin.origin}/zh-hant/tools/`],
    ["Content detail", contentDetail, `${origin.origin}/en/classes/class-planning-framework/#article`],
    ["Keyword detail", keywordDetail, `${origin.origin}/zh-hant/aion-2-release-date/#article`],
  ]) {
    if (!document.includes("application/ld+json") || !document.includes(expectedUrl)) {
      throw new Error(`${label} structured data does not use the primary domain.`);
    }
  }
  if (
    !keywordDetail.includes("目前需要分開理解三組官方或平台欄位") ||
    !keywordDetail.includes("https://store.steampowered.com/app/3393110/AION_2/") ||
    !keywordDetail.includes("AION2 全球 PC 版 2026 年 9 月上線官方主視覺")
  ) {
    throw new Error("Keyword detail is missing its verified status, primary source, or attributed image.");
  }
  if (!VERSION_KEY_PATTERN.test(manifest.versionKey)) {
    throw new Error("Runtime manifest has an invalid versionKey.");
  }
  const entry = manifest.runtimeBundles?.entries?.["zh-Hant"]?.World_L_A;
  if (!entry?.path?.includes(manifest.versionKey)) {
    throw new Error("Runtime bundle path is not pinned to the manifest version.");
  }
  const bundleResponse = await fetchOk(
    new URL(`/map-runtime/${entry.path}`, origin),
    {},
    fetchPolicy,
  );
  const bundle = await bundleResponse.json();
  if (
    bundle.versionKey !== manifest.versionKey ||
    bundle.locale !== "zh-Hant" ||
    bundle.mapName !== "World_L_A"
  ) {
    throw new Error("Runtime bundle identity does not match the manifest request.");
  }
  const runtimeAssets = validateRuntimeBundleAssets(bundle, manifest.versionKey);
  const manifestCacheControl = manifestResponse.headers.get("cache-control") ?? "";
  const bundleCacheControl = bundleResponse.headers.get("cache-control") ?? "";
  if (!/max-age=300(?:\D|$)/u.test(manifestCacheControl)) {
    throw new Error("Runtime manifest does not use the expected short cache policy.");
  }
  if (!/max-age=31536000(?:\D|$)/u.test(bundleCacheControl) || !/\bimmutable\b/u.test(bundleCacheControl)) {
    throw new Error("Versioned runtime bundle is not immutable for one year.");
  }
  const [tileResponse, iconResponse] = await mapWithConcurrency([
    new URL(`/map-runtime${runtimeAssets.tilePath}`, origin),
    new URL(`/map-runtime${runtimeAssets.iconPath}`, origin),
  ], (url) => fetchOk(url, {}, fetchPolicy));
  const tileCacheControl = tileResponse.headers.get("cache-control") ?? "";
  const iconCacheControl = iconResponse.headers.get("cache-control") ?? "";
  for (const [label, cacheControl] of [["Map tile", tileCacheControl], ["Map icon", iconCacheControl]]) {
    if (!/max-age=31536000(?:\D|$)/u.test(cacheControl) || !/\bimmutable\b/u.test(cacheControl)) {
      throw new Error(`${label} is not immutable for one year.`);
    }
  }
  const retiredResponse = await fetchWithRetry(
    new URL("/map-runtime/data/aion2-map-data.json", origin),
    { redirect: "manual" },
    { ...fetchPolicy, acceptedStatuses: new Set([404]) },
  );
  if (retiredResponse.status !== 404) {
    throw new Error("Retired full map JSON is still publicly routable.");
  }
  return {
    ok: true,
    origin: origin.origin,
    versionKey: manifest.versionKey,
    sitemapCount: sitemapUrls.length,
    indexedUrlReferenceCount: childUrls.length,
    indexedPageCount: indexedRecords.length,
    auditedNoindexPageCount: noindexPaths.length,
    structuredDataPageCount: indexedRecords.filter((record) => record.structuredData.length > 0).length,
    manifestCacheControl,
    bundleCacheControl,
    tileCacheControl,
    iconCacheControl,
    transientRetryCount,
  };
}

function parseArguments(argv) {
  const baseUrlIndex = argv.indexOf("--base-url");
  const baseUrl = baseUrlIndex === -1 ? undefined : argv[baseUrlIndex + 1];
  if (!baseUrl) throw new Error("Usage: verify-public-site --base-url https://example.com [--require-custom-domain]");
  return { baseUrl, requireCustomDomain: argv.includes("--require-custom-domain") };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  console.log(JSON.stringify(await verifyPublicSite(options.baseUrl, options), null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.stack ?? error.message : String(error));
    process.exitCode = 1;
  });
}
