#!/usr/bin/env node

import { pathToFileURL } from "node:url";

import {
  assertApplyConfirmation,
  parsePublishArguments,
  readReleasePlan,
  verifyPlanSources,
} from "./publish-r2-release.mjs";
import {
  readSitesReleaseConfig,
  readSitesReleaseStatus,
} from "./publish-sites-r2-release.mjs";

const BATCH_LIMIT = 128;

function readBootstrapConfig(env = process.env) {
  const statusConfig = readSitesReleaseConfig(env);
  const token = env.MAP_RELEASE_BOOTSTRAP_TOKEN;
  if (!token || token.length < 32 || !/^[A-Za-z0-9._~-]+$/u.test(token)) {
    throw new Error("MAP_RELEASE_BOOTSTRAP_TOKEN must be a strong environment-only bearer token.");
  }
  return { ...statusConfig, bootstrapToken: token };
}

async function requestJson(url, init, { maxAttempts = 5 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(90_000) });
      const body = await response.json().catch(() => null);
      if (response.ok) return body;
      if (response.status < 500 && response.status !== 429) {
        const error = new Error(`Bootstrap endpoint returned ${response.status}: ${body?.error ?? "unknown-error"}.`);
        error.retryable = false;
        throw error;
      }
      lastError = new Error(`Bootstrap endpoint returned ${response.status}.`);
    } catch (error) {
      if (error?.retryable === false) throw error;
      lastError = error;
    }
    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, Math.min(500 * 2 ** (attempt - 1), 4_000)));
    }
  }
  throw new Error("Bootstrap endpoint request failed after retries.", { cause: lastError });
}

export async function bootstrapSitesRelease({
  config,
  expectedCurrent,
  plan,
  promote = false,
}) {
  if (promote && expectedCurrent !== "none") {
    throw new Error("Bundled bootstrap promotion is only valid for an empty stable channel.");
  }
  if (!promote && expectedCurrent) {
    throw new Error("expectedCurrent is only valid with --promote.");
  }
  const headers = {
    authorization: `Bearer ${config.bootstrapToken}`,
    "x-atlas-confirm-version": plan.versionKey,
  };
  let cursor = 0;
  let batches = 0;
  let uploaded = 0;
  let skipped = 0;
  while (cursor < plan.objectCount) {
    const payload = await requestJson(
      `${config.endpoint}/__atlas-release/bootstrap?start=${cursor}&limit=${BATCH_LIMIT}`,
      { headers, method: "GET" },
      { maxAttempts: config.maxAttempts },
    );
    if (
      payload?.versionKey !== plan.versionKey ||
      payload?.manifestSha256 !== plan.manifestSha256 ||
      payload.start !== cursor ||
      !Number.isSafeInteger(payload.next) ||
      payload.next <= cursor ||
      payload.next > plan.objectCount ||
      payload.total !== plan.objectCount
    ) {
      throw new Error("Bootstrap endpoint returned an invalid cursor or release identity.");
    }
    cursor = payload.next;
    uploaded += payload.uploaded;
    skipped += payload.skipped;
    batches += 1;
    if (batches % 25 === 0 || cursor === plan.objectCount) {
      console.error(`Bootstrap progress: ${cursor}/${plan.objectCount}`);
    }
  }

  if (promote) {
    await requestJson(
      `${config.endpoint}/__atlas-release/bootstrap/promote`,
      { headers, method: "GET" },
      { maxAttempts: config.maxAttempts },
    ).catch(async (error) => {
      const status = await readSitesReleaseStatus({ config });
      if (status.activeVersionKey !== plan.versionKey) throw error;
    });
    const status = await readSitesReleaseStatus({ config });
    if (status.activeVersionKey !== plan.versionKey) {
      throw new Error("Stable channel does not match the bundled release after promotion.");
    }
  }

  return {
    batches,
    mode: "apply",
    objectCount: plan.objectCount,
    promoted: promote,
    skipped,
    transport: "sites-bundled-bootstrap",
    uploaded,
    versionKey: plan.versionKey,
  };
}

async function main() {
  const options = parsePublishArguments(process.argv.slice(2));
  if (options.help) {
    console.log("Usage: bootstrap-sites-r2-release --plan <plan> [--apply --confirm-version <version> --promote --expected-current none]");
    return;
  }
  const plan = await readReleasePlan(options.planPath);
  assertApplyConfirmation(options, plan.versionKey);
  await verifyPlanSources(plan);
  if (!options.apply) {
    console.log(JSON.stringify({
      mode: "dry-run",
      objectCount: plan.objectCount,
      promoted: false,
      totalBytes: plan.totalBytes,
      transport: "sites-bundled-bootstrap",
      versionKey: plan.versionKey,
    }, null, 2));
    return;
  }
  const result = await bootstrapSitesRelease({
    config: readBootstrapConfig(),
    expectedCurrent: options.expectedCurrent,
    plan,
    promote: options.promote,
  });
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
