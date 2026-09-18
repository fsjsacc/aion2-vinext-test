import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { createServer } from "vite";

const projectRoot = process.cwd();
const sourceLocale = process.argv[2] ?? "en";
const outputPath = path.join(
  projectRoot,
  "tmp",
  sourceLocale === "en"
    ? "home-copy-source.json"
    : `home-copy-source-${sourceLocale}.json`,
);
const vite = await createServer({
  configFile: false,
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  resolve: { alias: { "@": projectRoot } },
});

try {
  const home = await vite.ssrLoadModule("/app/home-i18n.ts");
  const content = Object.fromEntries(
    home.homeCopyKeys.map((key) => [
      key,
      sourceLocale === "en" ? key : home.homeText(sourceLocale, key),
    ]),
  );
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(
      {
        version: 1,
        sourceLocale,
        entries: {
          home: {
            content,
            heroImage: null,
            primaryAction: null,
            sourceLabels: {},
          },
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  console.log(`Exported ${home.homeCopyKeys.length} home strings`);
} finally {
  await vite.close();
}
