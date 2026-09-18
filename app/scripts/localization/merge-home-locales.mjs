import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "tmp", "home-locales");
const outputPath = path.join(
  projectRoot,
  "app",
  "home-editorial-locales.generated.json",
);
const locales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];
const aion2LocalizedPattern =
  /(?:\bAION[\s\u00a0]*2\b|イオン[\s\u00a0]*2|アイオン[\s\u00a0]*2|АИОН[\s\u00a0]*2)/giu;

const translations = Object.fromEntries(
  await Promise.all(
    locales.map(async (locale) => {
      const raw = await readFile(path.join(sourceDir, `${locale}.json`), "utf8");
      const payload = JSON.parse(raw);
      return [
        locale,
        Object.fromEntries(
          Object.entries(payload.entries.home.content).map(([key, value]) => [
            key,
            /\bAION\s*2\b/iu.test(key)
              ? value.replace(aion2LocalizedPattern, "AION2")
              : value,
          ]),
        ),
      ];
    }),
  ),
);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      version: 1,
      sourceLocale: "en",
      generatedAt: "2026-07-25",
      translationStage: "editorial-draft",
      translations,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Merged ${locales.length} complete home translations`);
