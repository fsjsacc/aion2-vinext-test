import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createServer } from "vite";

const root = process.cwd();
const fullSourcePath = path.join(
  root,
  "tmp",
  "editorial-content-source.json",
);
const trendSourcePath = path.join(
  root,
  "tmp",
  "editorial-content-source-trend.json",
);

const targetIdentities = [
  "database/aion-2-wiki",
  "guides/aion-2-gameplay",
  "guides/aion-2-download",
  "guides/aion-2-platforms",
  "guides/aion-2-server-status",
  "guides/aion-2-tier-list",
  "classes/gladiator",
  "classes/assassin",
  "classes/ranger",
  "classes/sorcerer",
  "guides/character-presets-style-shop",
  "guides/global-monetization-watchlist",
];

const vite = await createServer({
  configFile: false,
  root,
  server: { middlewareMode: true },
  appType: "custom",
  resolve: { alias: { "@": root } },
});

try {
  const [
    trendingModule,
    classModule,
    p1Module,
    legacyModule,
    depthModule,
  ] = await Promise.all([
    vite.ssrLoadModule("/app/trending-intent-content.ts"),
    vite.ssrLoadModule("/app/class-guide-content.ts"),
    vite.ssrLoadModule("/app/p1-keyword-content.ts"),
    vite.ssrLoadModule("/app/legacy-curated-content.ts"),
    vite.ssrLoadModule("/app/guide-depth-content.ts"),
  ]);

  const candidates = [
    ...trendingModule.trendingIntentContentEntries,
    ...classModule.classGuideContentEntries,
    ...p1Module.p1KeywordContentEntries,
    ...legacyModule.legacyCuratedContentEntries,
  ];
  const byIdentity = new Map(
    candidates.map((entry) => [`${entry.section}/${entry.slug}`, entry]),
  );

  const entries = Object.fromEntries(
    targetIdentities.map((identity) => {
      const baseEntry = byIdentity.get(identity);
      if (!baseEntry) {
        throw new Error(`Missing source entry: ${identity}`);
      }

      const entry = depthModule.applyGuideDepthEnhancement(baseEntry);
      return [
        identity,
        {
          content: {
            ...entry.translations.en,
            byline: "PFG",
          },
          heroImage: entry.heroImage?.translations.en,
          primaryAction: entry.primaryAction?.translations.en,
          sourceLabels: Object.fromEntries(
            (entry.sources ?? []).map((source) => [
              source.id,
              source.localizations?.en?.label ?? source.label,
            ]),
          ),
        },
      ];
    }),
  );

  const trendSource = {
    version: 1,
    sourceLocale: "en",
    entries,
  };

  const currentFullSource = JSON.parse(
    await readFile(fullSourcePath, "utf8"),
  );
  const fullSource = {
    ...currentFullSource,
    version: 1,
    sourceLocale: "en",
    entries: {
      ...currentFullSource.entries,
      ...entries,
    },
  };

  await mkdir(path.dirname(trendSourcePath), { recursive: true });
  await Promise.all([
    writeFile(
      trendSourcePath,
      `${JSON.stringify(trendSource, null, 2)}\n`,
      "utf8",
    ),
    writeFile(
      fullSourcePath,
      `${JSON.stringify(fullSource, null, 2)}\n`,
      "utf8",
    ),
  ]);

  console.log(
    `Exported ${Object.keys(entries).length} enhanced trend entries; full source has ${Object.keys(fullSource.entries).length}.`,
  );
} finally {
  await vite.close();
}
