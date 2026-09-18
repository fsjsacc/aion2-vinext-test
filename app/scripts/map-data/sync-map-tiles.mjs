#!/usr/bin/env node

import { readFile, mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_TILE_SOURCE_BASE_URL =
  "https://pfypdeuyryburcrhdmsi.supabase.co/storage/v1/object/public/aion2-map-tiles/v1";
export const DEFAULT_CONCURRENCY = 16;
export const DEFAULT_MAX_ATTEMPTS = 4;

const projectRoot = path.resolve(import.meta.dirname, "../..");

function positiveInteger(value, label) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return value;
}

function nonNegativeNumber(value, label) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a non-negative number.`);
  }
  return value;
}

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export function normalizeTileSourceBaseUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("Map tile source must be a credential-free HTTPS URL.");
  }
  return url.href.replace(/\/+$/u, "");
}

export function enumerateMapTiles(mapData) {
  if (!Array.isArray(mapData?.maps) || mapData.maps.length === 0) {
    throw new Error("Map data must contain at least one map.");
  }

  const tiles = [];
  for (const map of mapData.maps) {
    const slug = String(map?.slug ?? "").trim();
    if (!/^[a-z0-9-]+$/u.test(slug)) {
      throw new Error(`Map has an invalid slug: ${slug || "(empty)"}.`);
    }

    const width = positiveInteger(map.width, `${slug}.width`);
    const height = positiveInteger(map.height, `${slug}.height`);
    const tileSize = positiveInteger(map.tileSize, `${slug}.tileSize`);
    const minZoom = Number(map.tileMinZoom);
    const maxZoom = Number(map.tileMaxZoom);
    if (
      !Number.isInteger(minZoom) ||
      !Number.isInteger(maxZoom) ||
      minZoom < 0 ||
      maxZoom < minZoom
    ) {
      throw new Error(`${slug} has an invalid tile zoom range.`);
    }

    for (let zoom = minZoom; zoom <= maxZoom; zoom += 1) {
      const scaleDivisor = tileSize * 2 ** (maxZoom - zoom);
      const columns = Math.ceil(width / scaleDivisor);
      const rows = Math.ceil(height / scaleDivisor);
      for (let x = 0; x < columns; x += 1) {
        for (let y = 0; y < rows; y += 1) {
          tiles.push({
            map: slug,
            relativePath: `${slug}/${zoom}/${x}/${y}.webp`,
          });
        }
      }
    }
  }
  return tiles;
}

async function readExisting(targetPath) {
  try {
    return await readFile(targetPath);
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function syncOneTile({
  tile,
  sourceBaseUrl,
  targetRoot,
  fetchImpl,
  maxAttempts,
  retryDelayMs,
}) {
  const sourceUrl = `${sourceBaseUrl}/${tile.relativePath}`;
  let response;
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      response = await fetchImpl(sourceUrl, {
        headers: { accept: "image/webp" },
      });
      if (response.ok) break;
      lastError = new Error(
        `Unable to download ${tile.relativePath}: HTTP ${response.status}.`,
      );
      await response.body?.cancel();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < maxAttempts) {
      await wait(retryDelayMs * attempt);
    }
  }
  if (!response?.ok) {
    throw new Error(
      `Unable to download ${tile.relativePath} after ${maxAttempts} attempts.`,
      { cause: lastError },
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType && !contentType.toLowerCase().includes("image/webp")) {
    throw new Error(
      `Unexpected content type for ${tile.relativePath}: ${contentType}.`,
    );
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.byteLength === 0) {
    throw new Error(`Downloaded an empty map tile: ${tile.relativePath}.`);
  }

  const targetPath = path.resolve(targetRoot, tile.relativePath);
  const resolvedRoot = path.resolve(targetRoot);
  if (!targetPath.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Map tile path escapes the target root: ${tile.relativePath}.`);
  }

  const existing = await readExisting(targetPath);
  if (existing?.equals(bytes)) return "unchanged";

  await mkdir(path.dirname(targetPath), { recursive: true });
  const temporaryPath = `${targetPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, bytes);
  await rename(temporaryPath, targetPath);
  return existing ? "updated" : "created";
}

export async function syncMapTiles({
  root = projectRoot,
  sourceBaseUrl =
    process.env.MAP_TILE_SOURCE_BASE_URL ?? DEFAULT_TILE_SOURCE_BASE_URL,
  concurrency = Number(process.env.MAP_TILE_SYNC_CONCURRENCY ?? DEFAULT_CONCURRENCY),
  maxAttempts = Number(
    process.env.MAP_TILE_SYNC_MAX_ATTEMPTS ?? DEFAULT_MAX_ATTEMPTS,
  ),
  retryDelayMs = Number(process.env.MAP_TILE_SYNC_RETRY_DELAY_MS ?? 250),
  fetchImpl = fetch,
  onProgress,
} = {}) {
  const normalizedSource = normalizeTileSourceBaseUrl(sourceBaseUrl);
  const workerCount = positiveInteger(concurrency, "concurrency");
  const attemptLimit = positiveInteger(maxAttempts, "maxAttempts");
  const retryDelay = nonNegativeNumber(retryDelayMs, "retryDelayMs");
  const mapDataPath = path.join(root, "data/map-source/aion2-map-data.json");
  const mapData = JSON.parse(await readFile(mapDataPath, "utf8"));
  const tiles = enumerateMapTiles(mapData);
  const targetRoot = path.join(root, "public/map-assets/maps/tiles");
  const totals = { total: tiles.length, created: 0, updated: 0, unchanged: 0 };
  let cursor = 0;
  let completed = 0;

  async function worker() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= tiles.length) return;
      const result = await syncOneTile({
        tile: tiles[index],
        sourceBaseUrl: normalizedSource,
        targetRoot,
        fetchImpl,
        maxAttempts: attemptLimit,
        retryDelayMs: retryDelay,
      });
      totals[result] += 1;
      completed += 1;
      onProgress?.({ ...totals, completed, tile: tiles[index] });
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(workerCount, tiles.length) }, () => worker()),
  );
  return totals;
}

async function main() {
  let lastReported = 0;
  const totals = await syncMapTiles({
    onProgress(progress) {
      if (
        progress.completed === progress.total ||
        progress.completed - lastReported >= 100
      ) {
        lastReported = progress.completed;
        console.log(`Map tiles: ${progress.completed}/${progress.total}`);
      }
    },
  });
  console.log(
    `Map tile sync complete: ${totals.updated} updated, ` +
      `${totals.created} created, ${totals.unchanged} unchanged.`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
