#!/usr/bin/env node

import { lstat, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function assertSafeChildPath(root, target) {
  if (target === root || !target.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Refusing to prune an unsafe build path: ${target}`);
  }
}

export async function pruneRetiredMapBootstrap({
  root = process.cwd(),
  keepLocalMapAssets = process.env.KEEP_LOCAL_MAP_ASSETS === "1",
} = {}) {
  const projectRoot = path.resolve(root);
  const hostingPath = path.join(projectRoot, ".openai", "hosting.json");
  const sourceManifestPath = path.join(projectRoot, "public", "map-assets", "manifest.json");
  const buildAssetRoot = path.resolve(projectRoot, "dist", "client", "map-assets");

  assertSafeChildPath(projectRoot, buildAssetRoot);

  const [hosting, sourceManifest] = await Promise.all([
    readJson(hostingPath),
    readJson(sourceManifestPath),
  ]);
  if (hosting.r2 !== "MAP_ASSETS") {
    throw new Error("Refusing to prune map assets without the MAP_ASSETS Sites binding contract.");
  }
  if (!VERSION_KEY_PATTERN.test(sourceManifest.versionKey ?? "")) {
    throw new Error("Refusing to prune map assets because the source manifest version is invalid.");
  }
  if (keepLocalMapAssets) {
    return {
      pruned: false,
      reason: "KEEP_LOCAL_MAP_ASSETS=1",
      versionKey: sourceManifest.versionKey,
      target: buildAssetRoot,
    };
  }

  let targetStats;
  try {
    targetStats = await lstat(buildAssetRoot);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return {
        pruned: false,
        reason: "build copy absent",
        versionKey: sourceManifest.versionKey,
        target: buildAssetRoot,
      };
    }
    throw error;
  }
  if (!targetStats.isDirectory() || targetStats.isSymbolicLink()) {
    throw new Error(`Refusing to prune a non-directory build asset path: ${buildAssetRoot}`);
  }

  await rm(buildAssetRoot, { recursive: true, force: false });
  return {
    pruned: true,
    reason: "stable R2 runtime is authoritative",
    versionKey: sourceManifest.versionKey,
    target: buildAssetRoot,
  };
}

async function main() {
  console.log(JSON.stringify(await pruneRetiredMapBootstrap(), null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
