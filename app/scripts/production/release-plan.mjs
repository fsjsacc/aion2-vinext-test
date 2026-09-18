#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { RUNTIME_BUNDLE_SCHEMA_VERSION } from "../map-data/bundles.mjs";

export const projectRoot = path.resolve(import.meta.dirname, "../..");
const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;

const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");

const toPosixPath = (value) => value.split(path.sep).join("/");
const compareText = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

async function walkFiles(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => compareText(a.name, b.name))) {
    const absolutePath = path.join(current, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(root, absolutePath));
    else if (entry.isFile()) files.push(toPosixPath(path.relative(root, absolutePath)));
  }
  return files;
}

export async function createProductionReleasePlan({ root = projectRoot } = {}) {
  const assetRoot = path.join(root, "public/map-assets");
  const manifestPath = path.join(assetRoot, "manifest.json");
  const manifestBytes = await readFile(manifestPath);
  const manifest = JSON.parse(manifestBytes.toString("utf8"));
  if (!VERSION_KEY_PATTERN.test(manifest.versionKey)) {
    throw new Error("Map manifest has an invalid versionKey.");
  }
  if (
    !manifest.runtimeBundles ||
    manifest.runtimeBundles.schemaVersion !== RUNTIME_BUNDLE_SCHEMA_VERSION
  ) {
    throw new Error("Map manifest has no supported runtime bundle index.");
  }
  const expectedBundleBasePath = `bundles/${manifest.versionKey}`;
  if (manifest.runtimeBundles.basePath !== expectedBundleBasePath) {
    throw new Error("Map manifest runtime bundle basePath is not pinned to its versionKey.");
  }

  const bundleEntries = Object.values(manifest.runtimeBundles.entries)
    .flatMap((entries) => Object.values(entries));
  if (bundleEntries.length !== manifest.stats.mapCount * manifest.locales.length) {
    throw new Error("Map manifest runtime bundle count is incomplete.");
  }
  const currentBundlePaths = new Set();
  for (const entry of bundleEntries) {
    if (
      typeof entry.path !== "string" ||
      !entry.path.startsWith(`${expectedBundleBasePath}/`) ||
      entry.path.includes("..") ||
      currentBundlePaths.has(entry.path)
    ) {
      throw new Error(`Runtime bundle has an invalid or duplicate path: ${entry.path}`);
    }
    currentBundlePaths.add(entry.path);
    const bytes = await readFile(path.join(assetRoot, entry.path));
    if (bytes.byteLength !== entry.bytes || sha256(bytes) !== entry.sha256) {
      throw new Error(`Runtime bundle does not match its manifest descriptor: ${entry.path}`);
    }
  }

  const relativeFiles = (await walkFiles(assetRoot))
    .filter((relativePath) =>
      !relativePath.startsWith("data/") &&
      (!relativePath.startsWith("bundles/") || currentBundlePaths.has(relativePath)),
    );
  const objects = [];
  for (const relativePath of relativeFiles) {
    const absolutePath = path.join(assetRoot, relativePath);
    const [bytes, fileStats] = await Promise.all([
      readFile(absolutePath),
      stat(absolutePath),
    ]);
    const isRuntimeBundle = currentBundlePaths.has(relativePath);
    objects.push({
      source: `public/map-assets/${relativePath}`,
      key: isRuntimeBundle
        ? relativePath
        : `releases/${manifest.versionKey}/${relativePath}`,
      bytes: fileStats.size,
      sha256: sha256(bytes),
      cacheControl: relativePath === "manifest.json"
        ? "public, max-age=31536000, immutable"
        : "public, max-age=31536000, immutable",
    });
  }
  objects.sort((a, b) => compareText(a.key, b.key));

  const manifestObject = objects.find((object) => object.source.endsWith("/manifest.json"));
  if (!manifestObject) throw new Error("Release plan is missing the versioned manifest object.");

  return {
    schemaVersion: 1,
    versionKey: manifest.versionKey,
    sourceBuild: manifest.sourceBuild,
    manifestSha256: sha256(manifestBytes),
    objectCount: objects.length,
    totalBytes: objects.reduce((total, object) => total + object.bytes, 0),
    objects,
    channelPointer: {
      key: "channels/stable.json",
      cacheControl: "no-cache, no-store, must-revalidate",
      body: {
        schemaVersion: 1,
        versionKey: manifest.versionKey,
        manifestKey: manifestObject.key,
      },
    },
    database: {
      provider: "miniflare-d1",
      schema: "atlas",
      channel: "stable",
      versionKey: manifest.versionKey,
    },
    safety: {
      deletesPreviousVersions: false,
      promotionIsPointerOnly: true,
      rollbackIsPointerAndDatabaseChannelSwitch: true,
    },
  };
}

function parseArguments(argv) {
  const outputIndex = argv.indexOf("--output");
  if (outputIndex === -1) return {};
  const output = argv[outputIndex + 1];
  if (!output) throw new Error("--output requires a path.");
  return { output };
}

async function main() {
  const { output } = parseArguments(process.argv.slice(2));
  const plan = await createProductionReleasePlan();
  const serialized = `${JSON.stringify(plan, null, 2)}\n`;
  if (!output) {
    process.stdout.write(serialized);
    return;
  }
  const outputPath = path.resolve(output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, serialized, "utf8");
  await rename(temporaryPath, outputPath);
  console.log(`Wrote credential-free release plan: ${outputPath}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
