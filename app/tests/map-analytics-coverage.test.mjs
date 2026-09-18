import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

async function source(relativePath) {
  return readFile(path.join(root, ...relativePath.split("/")), "utf8");
}

test("interactive map lifecycle and detail events are covered", async () => {
  const [events, interactiveMap, mapLibreMap, mapExperience, mapDetail, mapType] = await Promise.all([
    source("app/analytics-events.ts"),
    source("app/map-app/InteractiveMap.tsx"),
    source("app/map-app/MapLibreMap.tsx"),
    source("app/map-app/MapExperience.tsx"),
    source("app/[locale]/tools/map/[map]/page.tsx"),
    source("app/[locale]/tools/map/[map]/type/[type]/page.tsx"),
  ]);

  for (const eventName of [
    "map_activate",
    "map_ready",
    "map_site_navigation_click",
    "map_type_filter_open",
    "marker_found",
    "marker_open",
  ]) {
    assert.match(events, new RegExp(`"${eventName}"`, "u"));
  }

  assert.match(mapLibreMap, /onReadyRef\.current\?\.\(\{ map, spriteUrl:/u);
  assert.match(interactiveMap, /trackEvent\("map_ready", \{/u);
  assert.match(interactiveMap, /ready_duration_ms: readyDurationMs/u);
  assert.match(interactiveMap, /marker_count: sourceMarkers\.length/u);
  assert.match(interactiveMap, /trackEvent\("marker_open", \{/u);
  assert.match(interactiveMap, /entry_source: markerEntrySourceRef\.current/u);
  assert.match(interactiveMap, /trackEvent\("map_marker_found_toggle", \{/u);
  assert.match(
    interactiveMap,
    /const isFound = next\.has\(markerId\);[\s\S]*?found: isFound,[\s\S]*?if \(isFound\) \{\s*trackEvent\("marker_found", \{/u,
  );
  assert.match(mapExperience, /trackEvent\("map_activate", \{/u);
  assert.match(mapExperience, /surface: "interactive-map"/u);
  assert.match(mapDetail, /eventName="map_site_navigation_click"/u);
  assert.match(mapType, /eventName="map_type_filter_open"/u);
  for (const sourceText of [mapDetail, mapType]) {
    assert.match(sourceText, /map_slug: map\.slug/u);
    assert.match(sourceText, /type_slug: type\.slug/u);
    assert.match(sourceText, /\blocale,/u);
  }
});

test("code reveal, copy, and official redemption events form a privacy-safe funnel", async () => {
  const [events, analytics, revealControl, codesPage, eventApi, journeyApi] =
    await Promise.all([
      source("app/analytics-events.ts"),
      source("app/analytics.ts"),
      source("app/_components/codes/CopyCodeButton.tsx"),
      source("app/_components/codes/CodesPage.tsx"),
      source("worker/event-api.ts"),
      source("worker/journey-event-api.ts"),
    ]);

  for (const eventName of [
    "code_reveal_start",
    "code_reveal_complete",
    "code_copy_confirm_open",
    "code_copy_success",
    "code_copy_failure",
    "code_redeem_official_click",
  ]) {
    assert.match(events, new RegExp(`"${eventName}"`, "u"));
  }
  for (const eventName of [
    "code_reveal_start",
    "code_reveal_complete",
    "code_copy_confirm_open",
    "code_copy_success",
    "code_copy_failure",
  ]) {
    assert.match(revealControl, new RegExp(`trackEvent\\("${eventName}"`, "u"));
  }
  assert.match(codesPage, /eventName="code_redeem_official_click"/u);
  assert.match(revealControl, /code_id: codeId/u);
  assert.match(revealControl, /code_status: codeStatus/u);
  assert.doesNotMatch(
    revealControl.match(/const analyticsPayload = \{[\s\S]*?\n  \};/u)?.[0] ?? "",
    /\bcode\s*:/u,
  );
  for (const implementation of [analytics, eventApi, journeyApi]) {
    assert.match(implementation, /"code-center"/u);
  }
});

test("entry labels do not use the GA4 acquisition source parameter", async () => {
  const [home, homeInteractive, contentLinks, mapHub, materialCalculator] = await Promise.all([
    source("app/_components/home/HomePage.tsx"),
    source("app/_components/home/HomeInteractiveShell.tsx"),
    source("app/_components/content/ContentSectionLinks.tsx"),
    source("app/[locale]/tools/map/page.tsx"),
    source("app/_components/tools/MaterialCalculator.tsx"),
  ]);

  for (const [fileSource, oldValue] of [
    [homeInteractive, /\bsource: "home-hero"/u],
    [home, /\bsource: "home-core-entry"/u],
    [home, /\bsource: `directory-\$\{group\.number\}`/u],
    [contentLinks, /\bsource: "content-detail-rift-map"/u],
    [mapHub, /\bsource: "map-hub-primary"/u],
    [mapHub, /\bsource: "map-hub-directory"/u],
    [materialCalculator, /\bsource: origin/u],
  ]) {
    assert.doesNotMatch(fileSource, oldValue);
  }

  assert.match(homeInteractive, /entry_source: "home-hero"/u);
  assert.match(home, /surface: "home-directory"/u);
  assert.match(contentLinks, /entry_source: "content-detail-rift-map"/u);
  assert.match(mapHub, /entry_source: "map-hub-primary"/u);
  assert.match(mapHub, /surface: "map-seo"/u);
  assert.match(materialCalculator, /entry_source: origin/u);
});
