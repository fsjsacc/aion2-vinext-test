import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const locales = [
  "zh-hant",
  "en",
  "ko",
  "zh-hans",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
];
const addedLocales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];

async function loadMaterialModules() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    resolve: { alias: { "@": root } },
    server: { middlewareMode: true, watch: null },
  });

  try {
    const [directory, recipeCalculator, customCalculator, plans] =
      await Promise.all([
        vite.ssrLoadModule("/app/_components/tools/CraftingDirectory.tsx"),
        vite.ssrLoadModule(
          "/app/_components/tools/CraftingRecipeCalculator.tsx",
        ),
        vite.ssrLoadModule("/app/_components/tools/MaterialCalculator.tsx"),
        vite.ssrLoadModule("/app/material-calculator.ts"),
      ]);
    return { directory, recipeCalculator, customCalculator, plans };
  } finally {
    await vite.close();
  }
}

function assertCompleteCopy(record, label) {
  assert.deepEqual(
    Object.keys(record).sort(),
    [...locales].sort(),
    `${label} locale keys`,
  );

  for (const locale of locales) {
    const localized = record[locale];
    assert.ok(localized, `${label}.${locale}`);
    for (const [field, value] of Object.entries(localized)) {
      assert.ok(
        typeof value === "function" ||
          (typeof value === "string" && value.trim().length > 0),
        `${label}.${locale}.${field} must be a non-empty string or formatter`,
      );
    }
  }
}

test("material and crafting tool controls have direct copy in all ten locales", async () => {
  const { directory, recipeCalculator, customCalculator } =
    await loadMaterialModules();

  assertCompleteCopy(directory.craftingDirectoryCopy, "directory");
  assertCompleteCopy(
    recipeCalculator.craftingRecipeCalculatorCopy,
    "recipeCalculator",
  );
  assertCompleteCopy(
    customCalculator.materialCalculatorUiCopy,
    "customCalculator",
  );

  for (const locale of addedLocales) {
    assert.notStrictEqual(
      directory.craftingDirectoryCopy[locale],
      directory.craftingDirectoryCopy.en,
      `${locale} directory copy must not reuse English`,
    );
    assert.notEqual(
      directory.craftingDirectoryCopy[locale].searchLabel,
      directory.craftingDirectoryCopy.en.searchLabel,
      `${locale} directory heading must be localized`,
    );
    assert.notEqual(
      recipeCalculator.craftingRecipeCalculatorCopy[locale].calculator,
      recipeCalculator.craftingRecipeCalculatorCopy.en.calculator,
      `${locale} recipe calculator heading must be localized`,
    );
    assert.notEqual(
      customCalculator.materialCalculatorUiCopy[locale].title,
      customCalculator.materialCalculatorUiCopy.en.title,
      `${locale} custom calculator heading must be localized`,
    );
  }
});

test("material plan templates retain the selected locale and localized labels", async () => {
  const { plans } = await loadMaterialModules();

  for (const locale of locales) {
    const templates = plans.getMaterialPlanTemplates(locale);
    assert.equal(templates.length, 2, `${locale} template count`);
    for (const template of templates) {
      assert.equal(template.state.locale, locale, `${locale}.${template.kind}`);
      assert.ok(
        template.copy.name.trim(),
        `${locale}.${template.kind}.name`,
      );
      assert.ok(
        template.copy.description.trim(),
        `${locale}.${template.kind}.description`,
      );
      assert.ok(
        template.copy.notice.trim(),
        `${locale}.${template.kind}.notice`,
      );
    }
  }

  for (const locale of addedLocales) {
    assert.notEqual(
      plans.getMaterialPlanTemplates(locale)[0].copy.name,
      plans.getMaterialPlanTemplates("en")[0].copy.name,
      `${locale} template name must not fall back to English`,
    );
  }
});

test("material pages use direct locale copy and keep raw-name fallback explicit", async () => {
  const files = [
    "app/material-calculator.ts",
    "app/_components/tools/CraftingDirectory.tsx",
    "app/_components/tools/CraftingRecipeCalculator.tsx",
    "app/_components/tools/MaterialCalculator.tsx",
    "app/[locale]/tools/material-calculator/page.tsx",
    "app/[locale]/tools/material-calculator/custom/page.tsx",
    "app/[locale]/tools/material-calculator/recipe/[recipeId]/page.tsx",
  ];
  const sources = await Promise.all(
    files.map((file) => readFile(path.join(root, file), "utf8")),
  );

  for (const [index, source] of sources.entries()) {
    assert.doesNotMatch(source, /resolveContentLocale|ContentLocale/);
    assert.doesNotMatch(
      source,
      /fabricaçãogador|выход на судно|количеств[ао] судов|ZXQPH\d+QXZ/u,
      `${files[index]} must not contain known translation corruption`,
    );
  }

  const mainPage = sources[4];
  const recipePage = sources[6];
  assert.match(mainPage, /dataLanguageNotice/);
  assert.match(recipePage, /dataLanguageNotice/);
  assert.match(mainPage, /siteLocaleConfig\[locale\]\.contentFallbackLocale/);
  assert.match(recipePage, /siteLocaleConfig\[locale\]\.contentFallbackLocale/);
});
