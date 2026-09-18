import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { createServer } from "vite";

const projectRoot = process.cwd();
const sourceLocale = process.argv[2] ?? "en";
const outputPath = path.join(
  projectRoot,
  "tmp",
  sourceLocale === "en"
    ? "editorial-content-source.json"
    : `editorial-content-source-${sourceLocale}.json`,
);

const vite = await createServer({
  configFile: false,
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  resolve: { alias: { "@": projectRoot } },
});

try {
  const { contentRegistry } = await vite.ssrLoadModule(
    "/app/content-registry.ts",
  );

  const entries = Object.fromEntries(
    contentRegistry.map((entry) => [
      `${entry.section}/${entry.slug}`,
      {
        content: entry.translations[sourceLocale],
        heroImage: entry.heroImage?.translations[sourceLocale],
        primaryAction: entry.primaryAction?.translations[sourceLocale],
        sourceLabels: Object.fromEntries(
          (entry.sources ?? []).map((source) => [
            source.id,
            source.localizations?.[sourceLocale]?.label ?? source.label,
          ]),
        ),
      },
    ]),
  );

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(
      {
        version: 1,
        sourceLocale,
        entries,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(`Exported ${Object.keys(entries).length} entries to ${outputPath}`);
} finally {
  await vite.close();
}
