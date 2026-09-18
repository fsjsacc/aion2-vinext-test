import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "data", "crafting", "source-recipes.jsonl");
const catalogPath = path.join(root, "data", "crafting", "catalog.json");
const itemCatalogPath = path.join(root, "data", "items", "official-catalog.json");

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function loadCraftingModules() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    resolve: { alias: { "@": root } },
    server: { middlewareMode: true, watch: null },
  });
  return {
    vite,
    catalog: await vite.ssrLoadModule("/app/crafting-catalog.ts"),
    calculator: await vite.ssrLoadModule("/app/crafting-calculator.ts"),
  };
}

test("normalizes all 1,613 snapshot recipes without inventing output quantities", async () => {
  const [source, catalogSource, itemCatalogSource] = await Promise.all([
    readFile(sourcePath, "utf8"),
    readFile(catalogPath, "utf8"),
    readFile(itemCatalogPath, "utf8"),
  ]);
  const sourceRecipes = source.trim().split(/\r?\n/gu).map(JSON.parse);
  const catalog = JSON.parse(catalogSource);
  const itemCatalog = JSON.parse(itemCatalogSource);
  const officialItemIds = new Set(itemCatalog.items.map((item) => item.id));
  const { checksum, versionKey, ...document } = catalog;

  assert.equal(sourceRecipes.length, 1_613);
  assert.equal(catalog.schemaVersion, 1);
  assert.equal(catalog.counts.recipes, 1_613);
  assert.equal(catalog.recipes.length, 1_613);
  assert.equal(new Set(catalog.recipes.map((recipe) => recipe.recipeId)).size, 1_613);
  assert.equal(catalog.counts.outputQuantityKnown, 0);
  assert.equal(catalog.counts.outputQuantityUnknown, 1_613);
  assert.ok(catalog.recipes.every((recipe) => recipe.outputQuantity === null));
  assert.ok(
    catalog.recipes.every(
      (recipe) =>
        recipe.recipeId === `item-${recipe.outputItemId}` &&
        officialItemIds.has(recipe.outputItemId),
    ),
  );

  assert.equal(catalog.counts.directLines, 8_001);
  assert.equal(catalog.counts.baseLines, 14_195);
  assert.equal(catalog.counts.intermediateLines, 5_130);
  assert.equal(catalog.counts.materialDefinitions, 1_814);
  assert.equal(
    catalog.counts.exactLines +
      catalog.counts.ambiguousLines +
      catalog.counts.unmatchedLines,
    27_326,
  );
  assert.equal(catalog.counts.unmatchedMaterialDefinitions, 5);

  assert.equal(catalog.provenance.recipeRelationships.kind, "third-party-snapshot");
  assert.equal(catalog.provenance.recipeRelationships.publisher, "AION2Hub");
  assert.equal(catalog.provenance.recipeRelationships.snapshotDate, "2026-07-10");
  assert.equal(catalog.provenance.recipeRelationships.retrievedAt, null);
  assert.equal(catalog.provenance.recipeRelationships.sha256, sha256(source));
  assert.equal(catalog.provenance.itemIdentity.kind, "official-catalog");
  assert.equal(
    catalog.provenance.itemIdentity.versionKey,
    itemCatalog.versionKey,
  );
  assert.equal(catalog.provenance.outputQuantity.status, "unknown");
  assert.match(catalog.provenance.outputQuantity.note, /no one-item yield is assumed/i);
  assert.equal(checksum, sha256(JSON.stringify(document)));
  assert.equal(versionKey, `sha256-${checksum}`);

  for (const material of Object.values(catalog.materials)) {
    assert.ok(material.names["zh-hant"]);
    assert.ok(material.names.en);
    assert.ok(material.names.ko);
    if (material.matchStatus === "unmatched") {
      assert.equal(material.itemId, null);
      assert.equal(material.imageUrl, null);
      assert.deepEqual(material.candidateItemIds, []);
    } else {
      assert.match(material.imageUrl, /^https:\/\//u);
      assert.ok(material.candidateItemIds.length >= 1);
    }
  }
});
test("exposes stable localized recipe lookup, directory query, and pagination", async () => {
  const { vite, catalog } = await loadCraftingModules();
  try {
    const ids = catalog.getCraftingRecipeIds();
    assert.equal(ids.length, 1_613);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.every((id) => /^item-[1-9]\d{0,17}$/u.test(id)));

    const [zh, en, ko] = ["zh-hant", "en", "ko"].map((locale) =>
      catalog.getCraftingRecipe("item-110120001", locale),
    );
    assert.equal(zh.name, "應龍王巨劍");
    assert.equal(en.name, "Noble Dragon Lord Greatsword");
    assert.equal(ko.name, "응룡왕의 대검");
    assert.equal(zh.profession, "武器鍛造");
    assert.equal(en.professionName, "Blacksmithing");
    assert.equal(ko.professionName, "무기 제작");
    assert.equal(en.outputQuantity, null);
    assert.ok(en.direct.length > 0);
    assert.ok(en.base.length >= en.direct.length);
    assert.ok(en.intermediate.length > 0);
    assert.equal(catalog.getCraftingRecipe("item-0", "en"), null);
    assert.equal(catalog.getCraftingRecipe("missing", "en"), null);

    const search = catalog.queryCraftingDirectory("en", {
      query: "Noble Dragon Lord Greatsword",
      profession: "blacksmithing",
      page: 1,
      pageSize: 20,
    });
    assert.ok(search.items.some((recipe) => recipe.recipeId === "item-110120001"));
    assert.ok(search.items.every((recipe) => recipe.professionCode === "blacksmithing"));
    assert.equal(search.pagination.page, 1);
    assert.ok(search.facets.professions.some((facet) => facet.code === "blacksmithing"));

    const enPage = catalog.queryCraftingDirectory("en", { page: 7, pageSize: 20 });
    const zhPage = catalog.queryCraftingDirectory("zh-hant", { page: 7, pageSize: 20 });
    assert.deepEqual(
      enPage.items.map((recipe) => recipe.recipeId),
      zhPage.items.map((recipe) => recipe.recipeId),
      "empty-query pagination must keep recipe identity stable across languages",
    );
    assert.equal(catalog.getCraftingDirectoryEntries("ko").length, 1_613);
    assert.throws(
      () => catalog.queryCraftingDirectory("en", { pageSize: 101 }),
      RangeError,
    );
    assert.throws(
      () => catalog.queryCraftingDirectory("en", { profession: "bad value!" }),
      RangeError,
    );
  } finally {
    await vite.close();
  }
});

test("calculates selected recipe mode with inventory, prices, and per-craft fees", async () => {
  const { vite, calculator } = await loadCraftingModules();
  try {
    const ingredient = (key, name, quantity) => ({
      key,
      itemId: null,
      candidateItemIds: [],
      matchStatus: "unmatched",
      name,
      imageUrl: null,
      gradeCode: null,
      gradeName: null,
      categoryCode: null,
      categoryName: null,
      quantity,
    });
    const recipe = {
      recipeId: "item-1",
      outputItemId: "1",
      outputQuantity: null,
      name: "Fixture",
      imageUrl: "https://example.com/item.png",
      gradeCode: "Common",
      gradeName: "Common",
      categoryCode: "Fixture",
      categoryName: "Fixture",
      professionCode: null,
      profession: null,
      professionName: null,
      masteryLevel: null,
      sourceGradeName: "Common",
      sourceTotalCrafts: 1,
      sourceUrl: "https://example.com/fixture",
      direct: [ingredient("a", "A", 3), ingredient("b", "B", 2)],
      base: [ingredient("a", "A", 4)],
      intermediate: [ingredient("c", "C", 1)],
    };

    const result = calculator.calculateCraftingRecipe(recipe, {
      craftCount: 2,
      mode: "direct",
      ownedByKey: { a: 4, b: 10 },
      unitPriceByKey: { a: 5, b: 7 },
      feePerCraft: 10,
    });
    assert.equal(result.outputQuantityPerCraft, null);
    assert.equal(result.outputQuantity, null);
    assert.deepEqual(
      result.lines.map((line) => ({
        key: line.ingredient.key,
        required: line.required,
        shortage: line.shortage,
        surplus: line.surplus,
        cost: line.purchaseCost,
      })),
      [
        { key: "a", required: 6, shortage: 2, surplus: 0, cost: 10 },
        { key: "b", required: 4, shortage: 0, surplus: 6, cost: 0 },
      ],
    );
    assert.deepEqual(result.totals, {
      targetedMaterials: 2,
      completeMaterials: 1,
      shortageMaterials: 1,
      pricedShortageMaterials: 1,
      unpricedShortageMaterials: 0,
      pricedMaterialCost: 10,
      feeCost: 20,
      totalCost: 30,
      isComplete: false,
    });

    const unpriced = calculator.calculateCraftingRecipe(recipe, {
      craftCount: 1,
      mode: "base",
      ownedByKey: {},
      unitPriceByKey: {},
      feePerCraft: 2,
    });
    assert.equal(unpriced.lines[0].required, 4);
    assert.equal(unpriced.lines[0].purchaseCost, null);
    assert.equal(unpriced.totals.totalCost, null);
    assert.equal(unpriced.totals.feeCost, 2);

    assert.throws(
      () => calculator.calculateCraftingRecipe(recipe, { craftCount: 0, mode: "direct" }),
      (error) => error.code === "invalid-craft-count",
    );
    assert.throws(
      () =>
        calculator.calculateCraftingRecipe(recipe, {
          craftCount: 2,
          mode: "direct",
          unitPriceByKey: { a: Number.MAX_SAFE_INTEGER },
        }),
      (error) => error.code === "unsafe-arithmetic",
    );
    assert.throws(
      () =>
        calculator.calculateCraftingRecipe(recipe, {
          craftCount: 1,
          mode: "direct",
          ownedByKey: { a: -1 },
        }),
      (error) => error.code === "invalid-owned",
    );
  } finally {
    await vite.close();
  }
});
