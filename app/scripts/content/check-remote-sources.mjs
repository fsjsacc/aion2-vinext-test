#!/usr/bin/env node

import { pathToFileURL } from "node:url";

import { loadContentRegistryWithVite } from "./release.mjs";

const DEFAULT_TIMEOUT_MS = 20_000;
const DEFAULT_CONCURRENCY = 4;
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

function argumentValue(argv, name) {
  const index = argv.indexOf(name);
  return index === -1 ? undefined : argv[index + 1];
}

function positiveInteger(value, fallback, label) {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return parsed;
}

function contentIdentity(entry) {
  return `${entry.section}/${entry.slug}`;
}

export function collectRemoteReferences(entries, { section, slug } = {}) {
  const references = new Map();
  for (const entry of entries) {
    if (section && entry.section !== section) continue;
    if (slug && entry.slug !== slug) continue;
    const identity = contentIdentity(entry);
    for (const source of entry.sources ?? []) {
      const current = references.get(source.url) ?? {
        url: source.url,
        kind: "document",
        identities: [],
      };
      current.identities.push(`${identity} source:${source.id}`);
      references.set(source.url, current);
    }
    const image = entry.heroImage;
    if (image?.sourceUrl?.startsWith("https://")) {
      const sourcePage = references.get(image.sourceUrl) ?? {
        url: image.sourceUrl,
        kind: "document",
        identities: [],
      };
      sourcePage.identities.push(`${identity} hero-source`);
      references.set(image.sourceUrl, sourcePage);
    }
    if (image?.src?.startsWith("https://")) {
      const current = references.get(image.src) ?? {
        url: image.src,
        kind: "image",
        identities: [],
        expectedDimensions: [],
      };
      if (current.kind !== "image") {
        throw new Error(`${identity} reuses one URL as both a source page and an image.`);
      }
      current.identities.push(`${identity} hero`);
      current.expectedDimensions.push({ width: image.width, height: image.height });
      references.set(image.src, current);
    }
  }
  return [...references.values()].map((reference) => ({
    ...reference,
    identities: [...new Set(reference.identities)].sort(),
    ...(reference.expectedDimensions
      ? {
          expectedDimensions: [...new Map(reference.expectedDimensions.map((dimensions) => [
            `${dimensions.width}x${dimensions.height}`,
            dimensions,
          ])).values()],
        }
      : {}),
  })).sort((left, right) => left.url.localeCompare(right.url));
}

function uint24LittleEndian(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
}

function jpegDimensions(bytes) {
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = bytes[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }
    if (offset + 2 > bytes.length) break;
    const segmentLength = (bytes[offset] << 8) | bytes[offset + 1];
    if (segmentLength < 2 || offset + segmentLength > bytes.length) break;
    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isStartOfFrame && segmentLength >= 7) {
      return {
        width: (bytes[offset + 5] << 8) | bytes[offset + 6],
        height: (bytes[offset + 3] << 8) | bytes[offset + 4],
      };
    }
    offset += segmentLength;
  }
  return null;
}

export function readImageDimensions(value) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  if (
    bytes.length >= 24 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
  ) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    return { width: view.getUint32(16), height: view.getUint32(20) };
  }
  if (bytes.length >= 10 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return {
      width: bytes[6] | (bytes[7] << 8),
      height: bytes[8] | (bytes[9] << 8),
    };
  }
  if (bytes.length >= 12 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    return jpegDimensions(bytes);
  }
  if (
    bytes.length >= 30 &&
    String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP"
  ) {
    const chunk = String.fromCharCode(...bytes.subarray(12, 16));
    if (chunk === "VP8X") {
      return {
        width: uint24LittleEndian(bytes, 24) + 1,
        height: uint24LittleEndian(bytes, 27) + 1,
      };
    }
    if (chunk === "VP8L" && bytes[20] === 0x2f) {
      return {
        width: 1 + (((bytes[22] & 0x3f) << 8) | bytes[21]),
        height: 1 + (((bytes[24] & 0x0f) << 10) | (bytes[23] << 2) | ((bytes[22] & 0xc0) >> 6)),
      };
    }
    if (chunk === "VP8 " && bytes.length >= 30) {
      return {
        width: (bytes[26] | (bytes[27] << 8)) & 0x3fff,
        height: (bytes[28] | (bytes[29] << 8)) & 0x3fff,
      };
    }
  }
  return null;
}

async function fetchWithRetry(url, options, attempts = 3) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.ok || !RETRYABLE_STATUS_CODES.has(response.status) || attempt + 1 >= attempts) {
        return response;
      }
      await response.body?.cancel().catch(() => undefined);
      lastError = new Error(`${url} returned ${response.status}.`);
    } catch (error) {
      lastError = error;
      if (attempt + 1 >= attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * (2 ** attempt)));
  }
  throw lastError ?? new Error(`${url} failed without a response.`);
}

export async function checkRemoteReference(reference, {
  timeoutMs = DEFAULT_TIMEOUT_MS,
  userAgent = "AION2-Atlas-Source-Check/1.0",
} = {}) {
  const response = await fetchWithRetry(reference.url, {
    redirect: "follow",
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      accept: reference.kind === "image" ? "image/*,*/*;q=0.8" : "text/html,application/xhtml+xml,*/*;q=0.8",
      "user-agent": userAgent,
    },
  });
  const finalUrl = new URL(response.url || reference.url);
  if (finalUrl.protocol !== "https:") {
    throw new Error(`${reference.url} redirected to a non-HTTPS URL.`);
  }
  if (!response.ok) {
    throw new Error(`${reference.url} returned ${response.status}.`);
  }
  const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
  if (reference.kind !== "image") {
    await response.body?.cancel().catch(() => undefined);
    return { ...reference, ok: true, status: response.status, finalUrl: finalUrl.toString(), contentType };
  }
  if (!contentType.startsWith("image/")) {
    await response.body?.cancel().catch(() => undefined);
    throw new Error(`${reference.url} returned non-image content type ${contentType || "(missing)"}.`);
  }
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_IMAGE_BYTES) {
    await response.body?.cancel().catch(() => undefined);
    throw new Error(`${reference.url} exceeds the ${MAX_IMAGE_BYTES} byte image safety limit.`);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_IMAGE_BYTES) {
    throw new Error(`${reference.url} returned an empty or oversized image.`);
  }
  const dimensions = readImageDimensions(bytes);
  if (!dimensions) throw new Error(`${reference.url} uses an unsupported or malformed image format.`);
  for (const expected of reference.expectedDimensions ?? []) {
    if (dimensions.width !== expected.width || dimensions.height !== expected.height) {
      throw new Error(
        `${reference.url} is ${dimensions.width}x${dimensions.height}, expected ${expected.width}x${expected.height}.`,
      );
    }
  }
  return {
    ...reference,
    ok: true,
    status: response.status,
    finalUrl: finalUrl.toString(),
    contentType,
    bytes: bytes.byteLength,
    dimensions,
  };
}

async function mapWithConcurrency(values, mapper, concurrency) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      try {
        results[index] = await mapper(values[index], index);
      } catch (error) {
        results[index] = {
          ...values[index],
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, () => worker()));
  return results;
}

export async function checkRemoteContentSources({
  entries,
  section,
  slug,
  concurrency = DEFAULT_CONCURRENCY,
  timeoutMs = DEFAULT_TIMEOUT_MS,
} = {}) {
  const registry = entries ?? await loadContentRegistryWithVite();
  const references = collectRemoteReferences(registry, { section, slug });
  if (references.length === 0) throw new Error("No matching remote content references were found.");
  const results = await mapWithConcurrency(
    references,
    (reference) => checkRemoteReference(reference, { timeoutMs }),
    concurrency,
  );
  const failures = results.filter((result) => !result.ok);
  return {
    ok: failures.length === 0,
    checkedAt: new Date().toISOString(),
    section: section ?? null,
    slug: slug ?? null,
    counts: {
      references: results.length,
      documents: results.filter((result) => result.kind === "document").length,
      images: results.filter((result) => result.kind === "image").length,
      failures: failures.length,
    },
    results,
  };
}

async function main(argv = process.argv.slice(2)) {
  const section = argumentValue(argv, "--section");
  const slug = argumentValue(argv, "--slug");
  const concurrency = positiveInteger(argumentValue(argv, "--concurrency"), DEFAULT_CONCURRENCY, "concurrency");
  const timeoutMs = positiveInteger(argumentValue(argv, "--timeout-ms"), DEFAULT_TIMEOUT_MS, "timeout-ms");
  const report = await checkRemoteContentSources({ section, slug, concurrency, timeoutMs });
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
