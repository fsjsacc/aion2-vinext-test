#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import {
  assertApplyConfirmation,
  immutableObjectExpectation,
  parsePublishArguments,
  readReleasePlan,
  verifyPlanSources,
} from "./publish-r2-release.mjs";

const DEFAULT_CONCURRENCY = 8;
const DEFAULT_MAX_ATTEMPTS = 3;

function parseInteger(value, label, { minimum, maximum }) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new Error(`${label} must be an integer from ${minimum} to ${maximum}.`);
  }
  return parsed;
}

function parseBoolean(value, label, fallback) {
  if (value === undefined || value === "") return fallback;
  if (/^(?:1|true|yes)$/iu.test(value)) return true;
  if (/^(?:0|false|no)$/iu.test(value)) return false;
  throw new Error(`${label} must be true or false.`);
}

export function readSitesReleaseConfig(env = process.env) {
  const endpointValue = env.MAP_RELEASE_ENDPOINT ?? env.SITES_RELEASE_ENDPOINT;
  if (!endpointValue) throw new Error("MAP_RELEASE_ENDPOINT is required for --apply.");
  const endpoint = new URL(endpointValue);
  if (
    endpoint.username ||
    endpoint.password ||
    endpoint.search ||
    endpoint.hash ||
    (endpoint.pathname !== "/" && endpoint.pathname !== "")
  ) {
    throw new Error("MAP_RELEASE_ENDPOINT must be a credential-free origin URL.");
  }
  const allowHttp = parseBoolean(
    env.MAP_RELEASE_ALLOW_HTTP,
    "MAP_RELEASE_ALLOW_HTTP",
    false,
  );
  const localHost = endpoint.hostname === "localhost" || endpoint.hostname === "127.0.0.1";
  if (endpoint.protocol !== "https:" && !(allowHttp && localHost && endpoint.protocol === "http:")) {
    throw new Error("MAP_RELEASE_ENDPOINT must use HTTPS outside an explicitly enabled localhost test.");
  }
  const token = env.MAP_RELEASE_UPLOAD_TOKEN;
  if (!token || token.length < 32 || !/^[A-Za-z0-9._~-]+$/u.test(token)) {
    throw new Error("MAP_RELEASE_UPLOAD_TOKEN must be a strong environment-only bearer token.");
  }
  return {
    concurrency: parseInteger(
      env.MAP_RELEASE_UPLOAD_CONCURRENCY ?? DEFAULT_CONCURRENCY,
      "MAP_RELEASE_UPLOAD_CONCURRENCY",
      { minimum: 1, maximum: 32 },
    ),
    endpoint: endpoint.origin,
    maxAttempts: parseInteger(
      env.MAP_RELEASE_MAX_ATTEMPTS ?? DEFAULT_MAX_ATTEMPTS,
      "MAP_RELEASE_MAX_ATTEMPTS",
      { minimum: 1, maximum: 10 },
    ),
    token,
  };
}

async function mapWithConcurrency(items, concurrency, operation) {
  const results = new Array(items.length);
  let nextIndex = 0;
  let failure;
  async function worker() {
    while (!failure && nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      try {
        results[index] = await operation(items[index], index);
      } catch (error) {
        failure ??= error;
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  if (failure) throw failure;
  return results;
}

async function requestWithRetry(url, init, { fetchImpl, maxAttempts }) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        ...init,
        signal: AbortSignal.timeout(60_000),
      });
      if (response.status < 500 && response.status !== 429) return response;
      lastError = new Error(`Release endpoint returned ${response.status}.`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, Math.min(250 * 2 ** (attempt - 1), 2_000)));
    }
  }
  throw new Error("Release endpoint request failed after retries.", { cause: lastError });
}

async function responseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function readSitesReleaseStatus({ config, fetchImpl = fetch }) {
  const response = await requestWithRetry(
    `${config.endpoint}/__atlas-release/status`,
    {
      headers: { authorization: `Bearer ${config.token}` },
      method: "GET",
    },
    { fetchImpl, maxAttempts: config.maxAttempts },
  );
  const payload = await responseJson(response);
  if (!response.ok || payload?.bindingReady !== true) {
    throw new Error(
      `Sites R2 status failed with ${response.status}: ${payload?.error ?? "unknown-error"}.`,
    );
  }
  return payload;
}

export async function verifySitesReleaseActivation({
  config,
  expectedVersion,
  fetchImpl = fetch,
  publicOrigin = config.endpoint,
}) {
  const status = await readSitesReleaseStatus({ config, fetchImpl });
  if (status.activeVersionKey !== expectedVersion) {
    throw new Error(
      `Sites R2 active version is ${status.activeVersionKey ?? "none"}, expected ${expectedVersion}.`,
    );
  }
  const origin = new URL(publicOrigin);
  if (origin.origin !== publicOrigin || origin.username || origin.password) {
    throw new Error("Public release verification requires a credential-free origin URL.");
  }
  const manifestResponse = await requestWithRetry(
    `${origin.origin}/map-runtime/manifest.json?release-check=${encodeURIComponent(expectedVersion)}`,
    {
      headers: { accept: "application/json" },
      method: "GET",
    },
    { fetchImpl, maxAttempts: config.maxAttempts },
  );
  const manifest = await responseJson(manifestResponse);
  if (!manifestResponse.ok || manifest?.versionKey !== expectedVersion) {
    throw new Error(
      `Public map manifest is ${manifest?.versionKey ?? "unavailable"}, expected ${expectedVersion}.`,
    );
  }
  return { manifest, status };
}

function verifyUploadResponse(response, expectation) {
  const expectedHeaders = {
    "x-atlas-bytes": String(expectation.contentLength),
    "x-atlas-content-type": expectation.contentType,
    "x-atlas-cache-control": expectation.cacheControl,
    "x-atlas-sha256": expectation.metadata["atlas-sha256"],
    "x-atlas-version-key": expectation.metadata["atlas-version-key"],
    "x-atlas-kind": expectation.metadata["atlas-kind"],
  };
  const differences = Object.entries(expectedHeaders)
    .filter(([key, value]) => response.headers.get(key) !== value)
    .map(([key]) => key);
  if (differences.length > 0) {
    throw new Error(`Sites R2 verification headers differ: ${differences.join(", ")}.`);
  }
}

async function publishObjectViaSites({ config, fetchImpl, plan, source }) {
  const { descriptor, sourcePath } = source;
  const expectation = immutableObjectExpectation(descriptor, plan.versionKey);
  const body = await readFile(sourcePath);
  if (
    body.byteLength !== descriptor.bytes ||
    createHash("sha256").update(body).digest("hex") !== descriptor.sha256
  ) {
    throw new Error(`Release source changed before upload: ${descriptor.source}`);
  }
  const transferBody = body.toString("base64");
  let response;
  try {
    response = await requestWithRetry(
      `${config.endpoint}/__atlas-release/object`,
      {
        body: transferBody,
        headers: {
          authorization: `Bearer ${config.token}`,
          "cache-control": expectation.cacheControl,
          "content-type": "application/octet-stream",
          "x-atlas-bytes": String(expectation.contentLength),
          "x-atlas-object-key": descriptor.key,
          "x-atlas-sha256": descriptor.sha256,
          "x-atlas-transfer-encoding": "base64",
          "x-atlas-version-key": plan.versionKey,
        },
        method: "PUT",
      },
      { fetchImpl, maxAttempts: config.maxAttempts },
    );
  } catch (error) {
    throw new Error(`Sites R2 request failed for ${descriptor.key}.`, { cause: error });
  }
  const payload = await responseJson(response);
  if (!response.ok || !["uploaded", "skipped"].includes(payload?.outcome)) {
    throw new Error(
      `Sites R2 rejected ${descriptor.key} with ${response.status}: ${payload?.error ?? "unknown-error"}.`,
    );
  }
  verifyUploadResponse(response, expectation);
  return payload.outcome;
}

async function promoteViaSites({ config, expectedCurrent, fetchImpl, plan }) {
  let response;
  let payload;
  let requestError;
  try {
    response = await requestWithRetry(
      `${config.endpoint}/__atlas-release/promote`,
      {
        body: JSON.stringify({
          confirmVersion: plan.versionKey,
          expectedCurrent,
          plan,
        }),
        headers: {
          authorization: `Bearer ${config.token}`,
          "content-type": "application/json; charset=utf-8",
        },
        method: "POST",
      },
      { fetchImpl, maxAttempts: config.maxAttempts },
    );
    payload = await responseJson(response);
  } catch (error) {
    requestError = error;
  }
  if (response?.ok && payload?.activeVersionKey === plan.versionKey) return;

  try {
    const status = await readSitesReleaseStatus({ config, fetchImpl });
    if (status.activeVersionKey === plan.versionKey) return;
  } catch (statusError) {
    if (requestError) {
      throw new Error("Sites R2 promotion outcome and stable channel are both unverifiable.", {
        cause: new AggregateError([requestError, statusError]),
      });
    }
  }
  if (requestError) throw requestError;
  throw new Error(
    `Sites R2 stable promotion failed with ${response?.status ?? "unknown"}: ${payload?.error ?? "unknown-error"}.`,
  );
}

async function verifyPromotedVersion({ config, fetchImpl, versionKey }) {
  const status = await readSitesReleaseStatus({ config, fetchImpl });
  if (status.activeVersionKey !== versionKey) {
    throw new Error("Sites R2 stable channel could not be verified after promotion.");
  }
}

export async function publishSitesRelease({
  apply = false,
  config,
  confirmVersion,
  expectedCurrent,
  fetchImpl = fetch,
  plan,
  promote = false,
  verifiedSources,
}) {
  assertApplyConfirmation({ apply, confirmVersion }, plan.versionKey);
  if (!Array.isArray(verifiedSources) || verifiedSources.length !== plan.objects.length) {
    throw new Error("Every release source must be locally verified before publication.");
  }
  if (!apply) {
    return {
      mode: "dry-run",
      transport: "sites-r2-binding",
      versionKey: plan.versionKey,
      objectCount: plan.objectCount,
      totalBytes: plan.totalBytes,
      uploaded: 0,
      skipped: 0,
      promoted: false,
    };
  }
  if (!config) throw new Error("Sites release endpoint configuration is required for --apply.");
  if (promote && !expectedCurrent) {
    throw new Error("Promotion requires expectedCurrent to be a versionKey or none.");
  }
  if (!promote && expectedCurrent) throw new Error("expectedCurrent is only valid for promotion.");
  const outcomes = await mapWithConcurrency(
    verifiedSources,
    config.concurrency,
    (source) => publishObjectViaSites({ config, fetchImpl, plan, source }),
  );
  if (promote) {
    await promoteViaSites({ config, expectedCurrent, fetchImpl, plan });
    await verifyPromotedVersion({ config, fetchImpl, versionKey: plan.versionKey });
  }
  return {
    mode: "apply",
    transport: "sites-r2-binding",
    versionKey: plan.versionKey,
    objectCount: plan.objectCount,
    totalBytes: plan.totalBytes,
    uploaded: outcomes.filter((outcome) => outcome === "uploaded").length,
    skipped: outcomes.filter((outcome) => outcome === "skipped").length,
    promoted: promote,
  };
}

function usage() {
  return [
    "Usage:",
    "  publish-sites-r2-release --plan <release-plan.json>",
    "  publish-sites-r2-release --plan <release-plan.json> --apply --confirm-version <versionKey>",
    "  publish-sites-r2-release --plan <release-plan.json> --apply --confirm-version <versionKey> --promote --expected-current <versionKey|none>",
    "",
    "Dry-run is the default. Apply mode reads endpoint and bearer authentication only from environment variables.",
  ].join("\n");
}

async function main() {
  const options = parsePublishArguments(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }
  const plan = await readReleasePlan(options.planPath);
  assertApplyConfirmation(options, plan.versionKey);
  const verifiedSources = await verifyPlanSources(plan);
  const config = options.apply ? readSitesReleaseConfig() : undefined;
  const result = await publishSitesRelease({
    ...options,
    config,
    plan,
    verifiedSources,
  });
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
