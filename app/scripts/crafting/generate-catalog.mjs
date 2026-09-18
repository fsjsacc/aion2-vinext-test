import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..", "..");
const sourcePath = path.join(root, "data", "crafting", "source-recipes.jsonl");
const itemCatalogPath = path.join(root, "data", "items", "official-catalog.json");
const outputPath = path.join(root, "data", "crafting", "catalog.json");
const locales = ["zh-hant", "en", "ko"];
const componentModes = {
  direct: "directComponents",
  base: "baseMaterials",
  intermediate: "intermediateCrafts",
};
const professionNames = {
  blacksmithing: {
    "zh-hant": "武器鍛造",
    en: "Blacksmithing",
    ko: "무기 제작",
  },
  jewelcrafting: {
    "zh-hant": "工藝",
    en: "Jewelcrafting",
    ko: "세공",
  },
  tailoring: {
    "zh-hant": "裁縫",
    en: "Tailoring",
    ko: "재봉",
  },
  alchemy: {
    "zh-hant": "煉金",
    en: "Alchemy",
    ko: "연금",
  },
  cooking: {
    "zh-hant": "料理",
    en: "Cooking",
    ko: "요리",
  },
};

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeName(value) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("en-US").replace(/\s+/gu, " ");
}

function professionCode(value) {
  const normalized = normalizeName(value);
  return normalized ? normalized.replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "") : null;
}

function materialNameKey(value) {
  return `name-${sha256(normalizeName(value)).slice(0, 16)}`;
}

function safePositiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new Error(`${label} must be a positive safe integer`);
  }
  return value;
}

function nullableNonNegativeInteger(value, label) {
  if (value === null) return null;
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be null or a non-negative safe integer`);
  }
  return value;
}

function requireText(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value.trim();
}

function localizedNames(item) {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      requireText(item.localizations?.[locale]?.name, `${item.id}.${locale}.name`),
    ]),
  );
}

function localizedGradeNames(item) {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      requireText(
        item.localizations?.[locale]?.gradeName,
        `${item.id}.${locale}.gradeName`,
      ),
    ]),
  );
}

function localizedCategoryNames(item) {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      requireText(
        item.localizations?.[locale]?.categoryName,
        `${item.id}.${locale}.categoryName`,
      ),
    ]),
  );
}

function displaySignature(item) {
  return JSON.stringify({
    names: localizedNames(item),
    imageUrl: item.imageUrl,
    gradeCode: item.gradeCode,
    categoryCode: item.category2Code ?? item.category1Code ?? "unclassified",
  });
}

function exactMaterial(item) {
  return {
    key: `item-${item.id}`,
    itemId: item.id,
    candidateItemIds: [item.id],
    matchStatus: "exact",
    names: localizedNames(item),
    imageUrl: item.imageUrl,
    gradeCode: item.gradeCode,
    gradeNames: localizedGradeNames(item),
    categoryCode: item.category2Code ?? item.category1Code ?? "unclassified",
    categoryNames: localizedCategoryNames(item),
  };
}

function ambiguousMaterial(sourceName, candidates) {
  const signatures = new Set(candidates.map(displaySignature));
  if (signatures.size !== 1) {
    throw new Error(
      `Ambiguous material ${sourceName} does not have one safe display representation`,
    );
  }
  const representative = candidates[0];
  return {
    key: materialNameKey(sourceName),
    itemId: null,
    candidateItemIds: candidates.map((item) => item.id).sort(),
    matchStatus: "ambiguous",
    names: localizedNames(representative),
    imageUrl: representative.imageUrl,
    gradeCode: representative.gradeCode,
    gradeNames: localizedGradeNames(representative),
    categoryCode:
      representative.category2Code ?? representative.category1Code ?? "unclassified",
    categoryNames: localizedCategoryNames(representative),
  };
}

function unmatchedMaterial(sourceName) {
  return {
    key: materialNameKey(sourceName),
    itemId: null,
    candidateItemIds: [],
    matchStatus: "unmatched",
    names: Object.fromEntries(locales.map((locale) => [locale, sourceName])),
    imageUrl: null,
    gradeCode: null,
    gradeNames: Object.fromEntries(locales.map((locale) => [locale, null])),
    categoryCode: null,
    categoryNames: Object.fromEntries(locales.map((locale) => [locale, null])),
  };
}

function parseSource(source) {
  const lines = source.split(/\r?\n/gu).filter((line) => line.trim());
  return lines.map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`Invalid JSON on recipe source line ${index + 1}: ${error.message}`);
    }
  });
}

function normalizeLines(
  rows,
  recipe,
  outputItem,
  itemsByEnglishName,
  materialDefinitions,
  counts,
  mode,
) {
  if (!Array.isArray(rows)) {
    throw new Error(`${recipe.itemId}.${mode} must be an array`);
  }
  const seenKeys = new Set();
  return rows.map((row, index) => {
    const sourceName = requireText(row?.name, `${recipe.itemId}.${mode}[${index}].name`);
    const quantity = safePositiveInteger(
      row?.quantity,
      `${recipe.itemId}.${mode}[${index}].quantity`,
    );
    const normalizedName = normalizeName(sourceName);
    const candidates = itemsByEnglishName.get(normalizedName) ?? [];
    let definition;

    if (normalizedName === normalizeName(outputItem.localizations.en.name)) {
      definition = exactMaterial(outputItem);
    } else if (candidates.length === 1) {
      definition = exactMaterial(candidates[0]);
    } else if (candidates.length > 1) {
      definition = ambiguousMaterial(sourceName, candidates);
    } else {
      definition = unmatchedMaterial(sourceName);
    }

    if (seenKeys.has(definition.key)) {
      throw new Error(`${recipe.itemId}.${mode} contains duplicate material ${sourceName}`);
    }
    seenKeys.add(definition.key);

    const existing = materialDefinitions.get(definition.key);
    if (existing && JSON.stringify(existing) !== JSON.stringify(definition)) {
      throw new Error(`Material key collision for ${sourceName}`);
    }
    materialDefinitions.set(definition.key, definition);
    counts[`${mode}Lines`] += 1;
    counts[`${definition.matchStatus}Lines`] += 1;
    return [definition.key, quantity];
  });
}

async function main() {
  const [source, itemCatalogSource] = await Promise.all([
    readFile(sourcePath, "utf8"),
    readFile(itemCatalogPath, "utf8"),
  ]);
  const sourceRecipes = parseSource(source);
  const itemCatalog = JSON.parse(itemCatalogSource);
  if (
    itemCatalog?.schemaVersion !== 1 ||
    !Array.isArray(itemCatalog.items) ||
    itemCatalog.items.length !== itemCatalog.total
  ) {
    throw new Error("Official item catalog is incomplete or unsupported");
  }

  const itemsById = new Map(itemCatalog.items.map((item) => [item.id, item]));
  const itemsByEnglishName = new Map();
  for (const item of itemCatalog.items) {
    const name = normalizeName(item.localizations.en.name);
    const candidates = itemsByEnglishName.get(name) ?? [];
    candidates.push(item);
    itemsByEnglishName.set(name, candidates);
  }

  const materialDefinitions = new Map();
  const recipeIds = new Set();
  const counts = {
    recipes: sourceRecipes.length,
    directLines: 0,
    baseLines: 0,
    intermediateLines: 0,
    exactLines: 0,
    ambiguousLines: 0,
    unmatchedLines: 0,
    outputQuantityKnown: 0,
    outputQuantityUnknown: sourceRecipes.length,
  };

  const recipes = sourceRecipes.map((recipe, recipeIndex) => {
    const outputItemId = requireText(recipe.itemId, `recipes[${recipeIndex}].itemId`);
    if (!/^[1-9]\d{0,17}$/u.test(outputItemId)) {
      throw new Error(`recipes[${recipeIndex}].itemId is invalid`);
    }
    const recipeId = `item-${outputItemId}`;
    if (recipeIds.has(recipeId)) throw new Error(`Duplicate recipe ${recipeId}`);
    recipeIds.add(recipeId);

    const outputItem = itemsById.get(outputItemId);
    if (!outputItem) throw new Error(`Recipe ${recipeId} has no official output item`);
    if (normalizeName(recipe.name) !== normalizeName(outputItem.localizations.en.name)) {
      throw new Error(`Recipe ${recipeId} output name does not match the official item`);
    }
    const outputDefinition = exactMaterial(outputItem);
    materialDefinitions.set(outputDefinition.key, outputDefinition);

    const normalizedProfessionCode = professionCode(recipe.profession);
    if (
      normalizedProfessionCode !== null &&
      !professionNames[normalizedProfessionCode]
    ) {
      throw new Error(`Recipe ${recipeId} uses unknown profession ${recipe.profession}`);
    }
    const normalized = {
      recipeId,
      outputKey: outputDefinition.key,
      outputItemId,
      // The source snapshot does not expose a verified output amount. Keeping
      // this null is materially different from assuming a one-item yield.
      outputQuantity: null,
      sourceGradeName: requireText(recipe.grade, `${recipeId}.grade`),
      professionCode: normalizedProfessionCode,
      professionName: recipe.profession ? requireText(recipe.profession, `${recipeId}.profession`) : null,
      professionNames:
        normalizedProfessionCode === null
          ? null
          : professionNames[normalizedProfessionCode],
      masteryLevel: nullableNonNegativeInteger(recipe.masteryLevel, `${recipeId}.masteryLevel`),
      sourceTotalCrafts: safePositiveInteger(recipe.totalCrafts, `${recipeId}.totalCrafts`),
      sourceUrl: requireText(recipe.url, `${recipeId}.url`),
    };

    for (const [mode, sourceField] of Object.entries(componentModes)) {
      normalized[mode] = normalizeLines(
        recipe[sourceField],
        recipe,
        outputItem,
        itemsByEnglishName,
        materialDefinitions,
        counts,
        mode,
      );
    }
    return normalized;
  });

  recipes.sort((left, right) => left.recipeId.localeCompare(right.recipeId, "en"));
  const materials = Object.fromEntries(
    [...materialDefinitions.entries()].sort(([left], [right]) => left.localeCompare(right, "en")),
  );
  counts.materialDefinitions = materialDefinitions.size;
  counts.exactMaterialDefinitions = [...materialDefinitions.values()].filter(
    (material) => material.matchStatus === "exact",
  ).length;
  counts.ambiguousMaterialDefinitions = [...materialDefinitions.values()].filter(
    (material) => material.matchStatus === "ambiguous",
  ).length;
  counts.unmatchedMaterialDefinitions = [...materialDefinitions.values()].filter(
    (material) => material.matchStatus === "unmatched",
  ).length;

  const document = {
    schemaVersion: 1,
    provenance: {
      recipeRelationships: {
        kind: "third-party-snapshot",
        publisher: "AION2Hub",
        sourceUrl: "https://aion2hub.com/tools/crafting-calculator",
        sourceFile: "data/crafting/source-recipes.jsonl",
        retrievedAt: null,
        snapshotDate: "2026-07-10",
        sha256: sha256(source),
      },
      itemIdentity: {
        kind: "official-catalog",
        publisher: itemCatalog.publisher,
        sourceUrl: itemCatalog.sourceUrl,
        snapshotDate: itemCatalog.snapshotDate,
        retrievedAt: itemCatalog.retrievedAt,
        versionKey: itemCatalog.versionKey,
        sha256: itemCatalog.checksum,
      },
      outputQuantity: {
        status: "unknown",
        note: "The recipe snapshot does not expose a verified output quantity; no one-item yield is assumed.",
      },
    },
    counts,
    materials,
    recipes,
  };
  const checksum = sha256(JSON.stringify(document));
  const catalog = {
    ...document,
    checksum,
    versionKey: `sha256-${checksum}`,
  };
  await writeFile(outputPath, `${JSON.stringify(catalog)}\n`, "utf8");
  console.log(
    JSON.stringify({
      output: path.relative(root, outputPath).replaceAll("\\", "/"),
      versionKey: catalog.versionKey,
      counts,
    }),
  );
}

await main();
