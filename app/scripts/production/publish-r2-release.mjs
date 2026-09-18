#!/usr/bin/env node

import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { projectRoot } from "./release-plan.mjs";

const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;
const SHA256_PATTERN = /^[0-9a-f]{64}$/u;
const ACCOUNT_ID_PATTERN = /^[0-9a-f]{32}$/u;
const DEFAULT_CONCURRENCY = 8;

const requiredString = (value, label) => {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} is required.`);
  }
  return value;
};

const parseInteger = (value, label, { minimum, maximum }) => {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new Error(`${label} must be an integer from ${minimum} to ${maximum}.`);
  }
  return parsed;
};

function isContainedPath(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

export function parsePublishArguments(argv) {
  const options = {
    apply: false,
    confirmVersion: undefined,
    expectedCurrent: undefined,
    help: false,
    planPath: undefined,
    promote: false,
  };
  const valueOptions = new Map([
    ["--plan", "planPath"],
    ["--confirm-version", "confirmVersion"],
    ["--expected-current", "expectedCurrent"],
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }
    if (argument === "--apply") {
      options.apply = true;
      continue;
    }
    if (argument === "--promote") {
      options.promote = true;
      continue;
    }
    const optionName = valueOptions.get(argument);
    if (optionName) {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${argument} requires a value.`);
      if (options[optionName] !== undefined) throw new Error(`${argument} may only be provided once.`);
      options[optionName] = value;
      index += 1;
      continue;
    }
    throw new Error(`Unknown option: ${argument}`);
  }
  if (!options.help && !options.planPath) throw new Error("--plan is required.");
  if (options.promote && !options.apply) throw new Error("--promote requires --apply.");
  if (options.promote && !options.expectedCurrent) {
    throw new Error("--promote requires --expected-current <versionKey|none>.");
  }
  if (!options.promote && options.expectedCurrent) {
    throw new Error("--expected-current is only accepted with --promote.");
  }
  if (
    options.expectedCurrent &&
    options.expectedCurrent !== "none" &&
    !VERSION_KEY_PATTERN.test(options.expectedCurrent)
  ) {
    throw new Error("--expected-current must be a versionKey or none.");
  }
  if (!options.apply && options.confirmVersion) {
    throw new Error("--confirm-version is only accepted with --apply.");
  }
  return options;
}

export function assertApplyConfirmation(options, versionKey) {
  if (!options.apply) return;
  if (options.confirmVersion !== versionKey) {
    throw new Error(`--apply requires --confirm-version to exactly match ${versionKey}.`);
  }
}

export function validateReleasePlan(plan) {
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) {
    throw new Error("Release plan must be a JSON object.");
  }
  if (plan.schemaVersion !== 1) throw new Error("Unsupported release plan schemaVersion.");
  if (!VERSION_KEY_PATTERN.test(plan.versionKey)) {
    throw new Error("Release plan has an invalid versionKey.");
  }
  if (!Array.isArray(plan.objects) || plan.objects.length === 0) {
    throw new Error("Release plan has no immutable objects.");
  }
  if (plan.objectCount !== plan.objects.length) {
    throw new Error("Release plan objectCount does not match its objects array.");
  }

  const expectedReleasePrefix = `releases/${plan.versionKey}/`;
  const expectedBundlePrefix = `bundles/${plan.versionKey}/`;
  const keys = new Set();
  const sources = new Set();
  let totalBytes = 0;
  for (const [index, object] of plan.objects.entries()) {
    if (!object || typeof object !== "object" || Array.isArray(object)) {
      throw new Error(`Release object ${index} is invalid.`);
    }
    requiredString(object.key, `Release object ${index} key`);
    requiredString(object.source, `Release object ${index} source`);
    if (
      object.key.startsWith("/") ||
      object.key.includes("\\") ||
      object.key.split("/").some((segment) => !segment || segment === "." || segment === "..") ||
      (!object.key.startsWith(expectedReleasePrefix) &&
        !object.key.startsWith(expectedBundlePrefix))
    ) {
      throw new Error(`Release object ${index} key is not pinned to its versionKey.`);
    }
    if (
      path.isAbsolute(object.source) ||
      object.source.includes("\\") ||
      !object.source.startsWith("public/map-assets/") ||
      object.source.split("/").some((segment) => !segment || segment === "." || segment === "..")
    ) {
      throw new Error(`Release object ${index} source is outside public/map-assets.`);
    }
    if (keys.has(object.key)) throw new Error(`Duplicate release object key: ${object.key}`);
    if (sources.has(object.source)) throw new Error(`Duplicate release object source: ${object.source}`);
    keys.add(object.key);
    sources.add(object.source);
    if (!Number.isSafeInteger(object.bytes) || object.bytes < 0) {
      throw new Error(`Release object ${object.key} has an invalid byte count.`);
    }
    if (!SHA256_PATTERN.test(object.sha256)) {
      throw new Error(`Release object ${object.key} has an invalid sha256.`);
    }
    if (
      typeof object.cacheControl !== "string" ||
      !/\bmax-age=31536000\b/u.test(object.cacheControl) ||
      !/\bimmutable\b/u.test(object.cacheControl)
    ) {
      throw new Error(`Release object ${object.key} must use one-year immutable caching.`);
    }
    totalBytes += object.bytes;
    if (!Number.isSafeInteger(totalBytes)) throw new Error("Release plan totalBytes is unsafe.");
  }
  if (plan.totalBytes !== totalBytes) {
    throw new Error("Release plan totalBytes does not match its objects array.");
  }

  const expectedManifestKey = `${expectedReleasePrefix}manifest.json`;
  const manifest = plan.objects.find((object) => object.key === expectedManifestKey);
  if (!manifest) throw new Error("Release plan is missing its versioned manifest object.");
  if (plan.manifestSha256 !== manifest.sha256) {
    throw new Error("Release plan manifestSha256 does not match its manifest object.");
  }
  if (
    plan.channelPointer?.key !== "channels/stable.json" ||
    plan.channelPointer?.cacheControl !== "no-cache, no-store, must-revalidate" ||
    plan.channelPointer?.body?.schemaVersion !== 1 ||
    plan.channelPointer?.body?.versionKey !== plan.versionKey ||
    plan.channelPointer?.body?.manifestKey !== expectedManifestKey
  ) {
    throw new Error("Release plan has an invalid stable channel pointer.");
  }
  if (plan.safety?.deletesPreviousVersions !== false || plan.safety?.promotionIsPointerOnly !== true) {
    throw new Error("Release plan does not declare immutable pointer-only promotion safety.");
  }
  return plan;
}

export async function readReleasePlan(planPath) {
  const absolutePath = path.resolve(planPath);
  let parsed;
  try {
    parsed = JSON.parse(await readFile(absolutePath, "utf8"));
  } catch (error) {
    const reason = error instanceof SyntaxError ? "invalid JSON" : "unreadable file";
    throw new Error(`Release plan is an ${reason}: ${absolutePath}`, { cause: error });
  }
  return validateReleasePlan(parsed);
}

export async function sha256File(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex");
}

export async function verifyPlanSources(plan, { root = projectRoot } = {}) {
  validateReleasePlan(plan);
  const rootPath = await realpath(path.resolve(root));
  const verified = [];
  for (const descriptor of plan.objects) {
    const unresolvedPath = path.resolve(rootPath, descriptor.source);
    if (!isContainedPath(rootPath, unresolvedPath)) {
      throw new Error(`Release source escapes the project root: ${descriptor.source}`);
    }
    const sourcePath = await realpath(unresolvedPath).catch((error) => {
      throw new Error(`Release source is missing: ${descriptor.source}`, { cause: error });
    });
    if (!isContainedPath(rootPath, sourcePath)) {
      throw new Error(`Release source resolves outside the project root: ${descriptor.source}`);
    }
    const sourceStats = await stat(sourcePath);
    if (!sourceStats.isFile()) throw new Error(`Release source is not a file: ${descriptor.source}`);
    if (sourceStats.size !== descriptor.bytes) {
      throw new Error(`Release source byte count changed: ${descriptor.source}`);
    }
    const digest = await sha256File(sourcePath);
    if (digest !== descriptor.sha256) {
      throw new Error(`Release source sha256 changed: ${descriptor.source}`);
    }
    verified.push({ descriptor, sourcePath });
  }
  return verified;
}

function parseBoolean(value, label, fallback) {
  if (value === undefined || value === "") return fallback;
  if (/^(?:1|true|yes)$/iu.test(value)) return true;
  if (/^(?:0|false|no)$/iu.test(value)) return false;
  throw new Error(`${label} must be true or false.`);
}

export function readObjectStoreConfig(env = process.env) {
  const endpointValue = env.R2_S3_ENDPOINT ?? env.R2_ENDPOINT ?? env.S3_ENDPOINT ??
    env.AWS_ENDPOINT_URL_S3 ?? env.AWS_ENDPOINT_URL;
  const accountId = env.R2_ACCOUNT_ID ?? env.CLOUDFLARE_ACCOUNT_ID;
  let endpoint;
  if (endpointValue) {
    endpoint = new URL(endpointValue);
  } else {
    if (!ACCOUNT_ID_PATTERN.test(accountId ?? "")) {
      throw new Error("Set R2_S3_ENDPOINT or a valid R2_ACCOUNT_ID/CLOUDFLARE_ACCOUNT_ID.");
    }
    endpoint = new URL(`https://${accountId}.r2.cloudflarestorage.com`);
  }
  if (endpoint.username || endpoint.password || endpoint.search || endpoint.hash) {
    throw new Error("R2_S3_ENDPOINT must not contain credentials, a query, or a fragment.");
  }
  const allowHttp = parseBoolean(env.R2_S3_ALLOW_HTTP, "R2_S3_ALLOW_HTTP", false);
  if (endpoint.protocol !== "https:" && !(allowHttp && endpoint.protocol === "http:")) {
    throw new Error("R2_S3_ENDPOINT must use HTTPS unless R2_S3_ALLOW_HTTP=true.");
  }

  const bucket = env.R2_BUCKET ?? env.S3_BUCKET;
  if (!bucket || !/^[A-Za-z0-9][A-Za-z0-9._-]{1,62}$/u.test(bucket)) {
    throw new Error("Set a valid R2_BUCKET or S3_BUCKET.");
  }
  const accessKeyId = env.R2_ACCESS_KEY_ID ?? env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY ?? env.AWS_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("R2/S3 access key environment variables are required for --apply.");
  }
  const sessionToken = env.R2_SESSION_TOKEN ?? env.AWS_SESSION_TOKEN;
  const concurrency = parseInteger(
    env.R2_UPLOAD_CONCURRENCY ?? DEFAULT_CONCURRENCY,
    "R2_UPLOAD_CONCURRENCY",
    { minimum: 1, maximum: 32 },
  );
  const maxAttempts = parseInteger(
    env.R2_S3_MAX_ATTEMPTS ?? 3,
    "R2_S3_MAX_ATTEMPTS",
    { minimum: 1, maximum: 10 },
  );
  return {
    bucket,
    client: {
      endpoint: endpoint.toString().replace(/\/$/u, ""),
      region: env.R2_S3_REGION ?? env.AWS_REGION ?? "auto",
      forcePathStyle: parseBoolean(env.R2_S3_FORCE_PATH_STYLE, "R2_S3_FORCE_PATH_STYLE", false),
      maxAttempts,
      credentials: {
        accessKeyId,
        secretAccessKey,
        ...(sessionToken ? { sessionToken } : {}),
      },
    },
    concurrency,
  };
}

function contentTypeForSource(source) {
  const extension = path.extname(source).toLowerCase();
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".webp") return "image/webp";
  if (extension === ".png") return "image/png";
  if (extension === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

export function immutableObjectExpectation(descriptor, versionKey) {
  return {
    contentLength: descriptor.bytes,
    contentType: contentTypeForSource(descriptor.source),
    cacheControl: descriptor.cacheControl,
    metadata: {
      "atlas-sha256": descriptor.sha256,
      "atlas-version-key": versionKey,
      "atlas-bytes": String(descriptor.bytes),
      "atlas-kind": "immutable-release-object",
    },
  };
}

function normalizedMetadata(metadata = {}) {
  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => [key.toLowerCase(), String(value)]),
  );
}

export function compareHeadToExpectation(head, expectation) {
  const differences = [];
  if (head.ContentLength !== expectation.contentLength) differences.push("content-length");
  if (head.ContentType !== expectation.contentType) differences.push("content-type");
  if (head.CacheControl !== expectation.cacheControl) differences.push("cache-control");
  const actualMetadata = normalizedMetadata(head.Metadata);
  for (const [key, expectedValue] of Object.entries(expectation.metadata)) {
    if (actualMetadata[key] !== expectedValue) differences.push(`metadata:${key}`);
  }
  return { matches: differences.length === 0, differences };
}

export function isNotFoundError(error) {
  return Boolean(
    error &&
    (error.name === "NotFound" ||
      error.name === "NoSuchKey" ||
      error.Code === "NoSuchKey" ||
      error.$metadata?.httpStatusCode === 404),
  );
}

async function headObject(client, bucket, key) {
  try {
    return await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw new Error(`Unable to inspect object ${key}: ${error?.name ?? "S3Error"}`, { cause: error });
  }
}

async function publishImmutableObject({ bucket, client, source, versionKey }) {
  const { descriptor, sourcePath } = source;
  const expectation = immutableObjectExpectation(descriptor, versionKey);
  const existing = await headObject(client, bucket, descriptor.key);
  if (existing) {
    const comparison = compareHeadToExpectation(existing, expectation);
    if (!comparison.matches) {
      throw new Error(
        `Refusing to overwrite immutable object ${descriptor.key}; mismatch: ${comparison.differences.join(", ")}.`,
      );
    }
    return "skipped";
  }

  // Upload an already rehashed in-memory snapshot so a source file cannot be
  // changed between the local integrity check and the S3 request body read.
  const body = await readFile(sourcePath);
  if (body.byteLength !== descriptor.bytes || createHash("sha256").update(body).digest("hex") !== descriptor.sha256) {
    throw new Error(`Release source changed before upload: ${descriptor.source}`);
  }
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: descriptor.key,
    Body: body,
    ContentLength: expectation.contentLength,
    ContentType: expectation.contentType,
    CacheControl: expectation.cacheControl,
    Metadata: expectation.metadata,
  }));
  const uploaded = await headObject(client, bucket, descriptor.key);
  if (!uploaded) throw new Error(`Uploaded object could not be verified: ${descriptor.key}`);
  const comparison = compareHeadToExpectation(uploaded, expectation);
  if (!comparison.matches) {
    throw new Error(
      `Uploaded object verification failed for ${descriptor.key}: ${comparison.differences.join(", ")}.`,
    );
  }
  return "uploaded";
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

function channelPointerExpectation(plan, body) {
  return {
    contentLength: body.byteLength,
    contentType: "application/json; charset=utf-8",
    cacheControl: plan.channelPointer.cacheControl,
    metadata: {
      "atlas-sha256": createHash("sha256").update(body).digest("hex"),
      "atlas-version-key": plan.versionKey,
      "atlas-bytes": String(body.byteLength),
      "atlas-kind": "channel-pointer",
    },
  };
}

export function stablePointerCondition(existing, expectedCurrent) {
  if (expectedCurrent === "none") {
    if (existing) throw new Error("Stable channel conflict: expected no current pointer, but one exists.");
    return { IfNoneMatch: "*" };
  }
  if (!VERSION_KEY_PATTERN.test(expectedCurrent ?? "")) {
    throw new Error("Stable channel promotion requires an expected current versionKey or none.");
  }
  if (!existing) {
    throw new Error(`Stable channel conflict: expected ${expectedCurrent}, but the pointer is missing.`);
  }
  const metadata = normalizedMetadata(existing.Metadata);
  if (metadata["atlas-version-key"] !== expectedCurrent) {
    throw new Error(
      `Stable channel conflict: expected ${expectedCurrent}, found ${metadata["atlas-version-key"] ?? "unknown"}.`,
    );
  }
  if (typeof existing.ETag !== "string" || existing.ETag.length === 0) {
    throw new Error("Stable channel pointer has no ETag; refusing an unconditional overwrite.");
  }
  return { IfMatch: existing.ETag };
}

export function isPreconditionFailedError(error) {
  return Boolean(
    error &&
    (error.name === "PreconditionFailed" ||
      error.Code === "PreconditionFailed" ||
      error.$metadata?.httpStatusCode === 412),
  );
}

async function promoteStablePointerWithCas({ bucket, client, expectedCurrent, plan }) {
  const existing = await headObject(client, bucket, plan.channelPointer.key);
  const condition = stablePointerCondition(existing, expectedCurrent);
  const body = Buffer.from(`${JSON.stringify(plan.channelPointer.body)}\n`, "utf8");
  const expectation = channelPointerExpectation(plan, body);
  try {
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: plan.channelPointer.key,
      Body: body,
      ContentLength: expectation.contentLength,
      ContentType: expectation.contentType,
      CacheControl: expectation.cacheControl,
      Metadata: expectation.metadata,
      ...condition,
    }));
  } catch (error) {
    if (isPreconditionFailedError(error)) {
      throw new Error("Stable channel changed during promotion; conditional write was rejected.", {
        cause: error,
      });
    }
    throw error;
  }
  const promoted = await headObject(client, bucket, plan.channelPointer.key);
  if (!promoted) throw new Error("Stable channel pointer could not be verified after promotion.");
  const comparison = compareHeadToExpectation(promoted, expectation);
  if (!comparison.matches) {
    throw new Error(`Stable channel pointer verification failed: ${comparison.differences.join(", ")}.`);
  }
}

export async function publishRelease({
  apply = false,
  bucket,
  client,
  concurrency = DEFAULT_CONCURRENCY,
  confirmVersion,
  expectedCurrent,
  plan,
  promote = false,
  verifiedSources,
}) {
  validateReleasePlan(plan);
  assertApplyConfirmation({ apply, confirmVersion }, plan.versionKey);
  if (promote && !apply) throw new Error("Promotion requires apply mode.");
  if (promote && !expectedCurrent) {
    throw new Error("Promotion requires expectedCurrent to be a versionKey or none.");
  }
  if (promote && expectedCurrent !== "none" && !VERSION_KEY_PATTERN.test(expectedCurrent)) {
    throw new Error("Promotion expectedCurrent must be a versionKey or none.");
  }
  if (!promote && expectedCurrent) throw new Error("expectedCurrent is only valid for promotion.");
  if (!Array.isArray(verifiedSources) || verifiedSources.length !== plan.objects.length) {
    throw new Error("Every release source must be locally verified before publication.");
  }
  if (!apply) {
    return {
      mode: "dry-run",
      versionKey: plan.versionKey,
      objectCount: plan.objectCount,
      totalBytes: plan.totalBytes,
      uploaded: 0,
      skipped: 0,
      promoted: false,
    };
  }
  if (!client || !bucket) throw new Error("An S3 client and bucket are required for apply mode.");
  parseInteger(concurrency, "Upload concurrency", { minimum: 1, maximum: 32 });

  const outcomes = await mapWithConcurrency(
    verifiedSources,
    concurrency,
    (source) => publishImmutableObject({ bucket, client, source, versionKey: plan.versionKey }),
  );
  if (promote) {
    await promoteStablePointerWithCas({ bucket, client, expectedCurrent, plan });
  }
  return {
    mode: "apply",
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
    "  publish-r2-release --plan <release-plan.json>",
    "  publish-r2-release --plan <release-plan.json> --apply --confirm-version <versionKey>",
    "  publish-r2-release --plan <release-plan.json> --apply --confirm-version <versionKey> --promote --expected-current <versionKey|none>",
    "",
    "Dry-run is the default and never opens an S3 connection.",
    "Credentials and endpoint configuration are accepted only through environment variables.",
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
  if (!options.apply) {
    console.log(JSON.stringify(await publishRelease({
      plan,
      verifiedSources,
    }), null, 2));
    return;
  }

  const config = readObjectStoreConfig();
  const client = new S3Client(config.client);
  try {
    const result = await publishRelease({
      apply: true,
      bucket: config.bucket,
      client,
      concurrency: config.concurrency,
      confirmVersion: options.confirmVersion,
      expectedCurrent: options.expectedCurrent,
      plan,
      promote: options.promote,
      verifiedSources,
    });
    console.log(JSON.stringify(result, null, 2));
  } finally {
    client.destroy();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
