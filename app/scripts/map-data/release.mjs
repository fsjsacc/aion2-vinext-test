#!/usr/bin/env node

import { generateRelease } from "./pipeline.mjs";

try {
  const { manifest, changed, outputPath } = await generateRelease();
  console.log(
    `${changed ? "Wrote" : "Verified unchanged"} ${outputPath}\n` +
      `${manifest.versionKey} | ${manifest.stats.mapCount} maps | ` +
      `${manifest.stats.poiCount} POIs | ${manifest.stats.regionCount} regions`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
