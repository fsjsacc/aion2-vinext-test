import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  enumerateMapTiles,
  normalizeTileSourceBaseUrl,
  syncMapTiles,
} from "../scripts/map-data/sync-map-tiles.mjs";

const fixtureMap = {
  slug: "fixture-map",
  width: 1024,
  height: 1024,
  tileSize: 512,
  tileMinZoom: 0,
  tileMaxZoom: 1,
};

test("map tile sync enumerates every zoom coordinate", () => {
  assert.deepEqual(
    enumerateMapTiles({ maps: [fixtureMap] }).map((tile) => tile.relativePath),
    [
      "fixture-map/0/0/0.webp",
      "fixture-map/1/0/0.webp",
      "fixture-map/1/0/1.webp",
      "fixture-map/1/1/0.webp",
      "fixture-map/1/1/1.webp",
    ],
  );
});

test("map tile source accepts only credential-free HTTPS URLs", () => {
  assert.equal(
    normalizeTileSourceBaseUrl("https://example.com/tiles///"),
    "https://example.com/tiles",
  );
  assert.throws(
    () => normalizeTileSourceBaseUrl("http://example.com/tiles"),
    /credential-free HTTPS/u,
  );
  assert.throws(
    () => normalizeTileSourceBaseUrl("https://user:secret@example.com/tiles"),
    /credential-free HTTPS/u,
  );
});

test("map tile sync writes changed files and preserves identical files", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "aion2-map-tile-sync-"));
  const dataRoot = path.join(root, "data/map-source");
  await mkdir(dataRoot, { recursive: true });
  await writeFile(
    path.join(dataRoot, "aion2-map-data.json"),
    JSON.stringify({ maps: [fixtureMap] }),
  );

  const fetchImpl = async (url) =>
    new Response(Buffer.from(`tile:${new URL(url).pathname}`), {
      status: 200,
      headers: { "content-type": "image/webp" },
    });

  const first = await syncMapTiles({
    root,
    sourceBaseUrl: "https://example.com/tiles",
    concurrency: 2,
    fetchImpl,
  });
  assert.deepEqual(first, {
    total: 5,
    created: 5,
    updated: 0,
    unchanged: 0,
  });

  const written = await readFile(
    path.join(root, "public/map-assets/maps/tiles/fixture-map/1/1/1.webp"),
    "utf8",
  );
  assert.equal(written, "tile:/tiles/fixture-map/1/1/1.webp");

  const second = await syncMapTiles({
    root,
    sourceBaseUrl: "https://example.com/tiles",
    concurrency: 3,
    fetchImpl,
  });
  assert.deepEqual(second, {
    total: 5,
    created: 0,
    updated: 0,
    unchanged: 5,
  });
});

test("map tile sync retries a transient source failure", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "aion2-map-tile-retry-"));
  const dataRoot = path.join(root, "data/map-source");
  await mkdir(dataRoot, { recursive: true });
  await writeFile(
    path.join(dataRoot, "aion2-map-data.json"),
    JSON.stringify({ maps: [{ ...fixtureMap, width: 512, height: 512, tileMinZoom: 0, tileMaxZoom: 0 }] }),
  );

  let attempt = 0;
  const result = await syncMapTiles({
    root,
    sourceBaseUrl: "https://example.com/tiles",
    concurrency: 1,
    maxAttempts: 2,
    retryDelayMs: 0,
    fetchImpl: async () => {
      attempt += 1;
      if (attempt === 1) throw new TypeError("temporary network failure");
      return new Response(Buffer.from("retried tile"), {
        status: 200,
        headers: { "content-type": "image/webp" },
      });
    },
  });

  assert.equal(attempt, 2);
  assert.deepEqual(result, {
    total: 1,
    created: 1,
    updated: 0,
    unchanged: 0,
  });
});
