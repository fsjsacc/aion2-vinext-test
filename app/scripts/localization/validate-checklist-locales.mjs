import { readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const source = JSON.parse(
  await readFile(path.join(projectRoot, "tmp", "checklist-source.json"), "utf8"),
);
const localized = JSON.parse(
  await readFile(
    path.join(projectRoot, "app", "checklist-editorial-locales.generated.json"),
    "utf8",
  ),
);
const locales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];

function assertSameShape(reference, candidate, location) {
  if (typeof reference === "string") {
    if (typeof candidate !== "string" || !candidate.trim()) {
      throw new Error(`${location} must be a non-empty string`);
    }
    if (/KINA (?:START|END)|984\d{9}|985\d{9}/u.test(candidate)) {
      throw new Error(`${location} contains a translation marker`);
    }
    return;
  }
  if (
    !reference
    || typeof reference !== "object"
    || Array.isArray(reference)
  ) {
    if (typeof candidate !== typeof reference) {
      throw new Error(`${location} has the wrong value type`);
    }
    return;
  }
  const expectedKeys = Object.keys(reference).sort();
  const actualKeys = Object.keys(candidate ?? {}).sort();
  if (JSON.stringify(expectedKeys) !== JSON.stringify(actualKeys)) {
    throw new Error(`${location} has a different key set`);
  }
  for (const key of expectedKeys) {
    assertSameShape(reference[key], candidate[key], `${location}.${key}`);
  }
}

for (const locale of locales) {
  const entries = localized.translations[locale];
  if (!entries) throw new Error(`Missing checklist locale ${locale}`);
  assertSameShape(source.entries, entries, locale);
}

console.log(`Validated ${locales.length} complete checklist locales`);
