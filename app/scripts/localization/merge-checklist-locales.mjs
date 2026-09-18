import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const locales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];
const sourceDir = path.join(projectRoot, "tmp", "checklist-locales");
const outputPath = path.join(
  projectRoot,
  "app",
  "checklist-editorial-locales.generated.json",
);

const translations = {};
for (const locale of locales) {
  const payload = JSON.parse(
    await readFile(path.join(sourceDir, `${locale}.json`), "utf8"),
  );
  if (payload.locale !== locale) {
    throw new Error(`Unexpected locale in ${locale}.json: ${payload.locale}`);
  }
  translations[locale] = payload.entries;
}

await writeFile(
  outputPath,
  `${JSON.stringify({
    version: 1,
    sourceLocale: "en",
    translations,
  }, null, 2)}\n`,
  "utf8",
);
console.log(`Wrote ${locales.length} checklist locales to ${outputPath}`);
