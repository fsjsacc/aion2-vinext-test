import catalogJson from "@/data/crafting/catalog.json";

import type { SiteLocale } from "./site-config";

export const craftingModes = ["direct", "base", "intermediate"] as const;
export type CraftingMode = (typeof craftingModes)[number];
export type CraftingMaterialMatchStatus = "exact" | "ambiguous" | "unmatched";

export type LocalizedCraftingIngredient = {
  key: string;
  itemId: string | null;
  candidateItemIds: readonly string[];
  matchStatus: CraftingMaterialMatchStatus;
  name: string;
  imageUrl: string | null;
  gradeCode: string | null;
  gradeName: string | null;
  categoryCode: string | null;
  categoryName: string | null;
  quantity: number;
};

export type LocalizedCraftingRecipe = {
  recipeId: string;
  outputItemId: string;
  outputQuantity: null;
  name: string;
  imageUrl: string;
  gradeCode: string;
  gradeName: string;
  categoryCode: string;
  categoryName: string;
  professionCode: string | null;
  /** Localized profession label for directory consumers. */
  profession: string | null;
  /** Alias kept explicit for recipe-detail consumers. */
  professionName: string | null;
  masteryLevel: number | null;
  sourceGradeName: string;
  sourceTotalCrafts: number;
  sourceUrl: string;
  direct: readonly LocalizedCraftingIngredient[];
  base: readonly LocalizedCraftingIngredient[];
  intermediate: readonly LocalizedCraftingIngredient[];
};

export type CraftingDirectoryQuery = {
  query?: string;
  profession?: string | null;
  grade?: string | null;
  category?: string | null;
  page?: number;
  pageSize?: number;
};

export type CraftingDirectoryFacet = {
  code: string;
  label: string;
  count: number;
};

export type CraftingDirectoryPage = {
  items: readonly LocalizedCraftingRecipe[];
  facets: {
    professions: readonly CraftingDirectoryFacet[];
    grades: readonly CraftingDirectoryFacet[];
    categories: readonly CraftingDirectoryFacet[];
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    lastPage: number;
  };
};

type LocalizedValue = Record<SiteLocale, string>;
type NullableLocalizedValue = Record<SiteLocale, string | null>;

type CatalogMaterial = {
  key: string;
  itemId: string | null;
  candidateItemIds: string[];
  matchStatus: CraftingMaterialMatchStatus;
  names: LocalizedValue;
  imageUrl: string | null;
  gradeCode: string | null;
  gradeNames: NullableLocalizedValue;
  categoryCode: string | null;
  categoryNames: NullableLocalizedValue;
};

type CatalogRecipe = {
  recipeId: string;
  outputKey: string;
  outputItemId: string;
  outputQuantity: null;
  sourceGradeName: string;
  professionCode: string | null;
  professionName: string | null;
  professionNames: LocalizedValue | null;
  masteryLevel: number | null;
  sourceTotalCrafts: number;
  sourceUrl: string;
  direct: [string, number][];
  base: [string, number][];
  intermediate: [string, number][];
};

type CraftingCatalogDocument = {
  schemaVersion: 1;
  provenance: {
    recipeRelationships: {
      kind: "third-party-snapshot";
      publisher: string;
      sourceUrl: string;
      sourceFile: string;
      retrievedAt: null;
      snapshotDate: string;
      sha256: string;
    };
    itemIdentity: {
      kind: "official-catalog";
      publisher: string;
      sourceUrl: string;
      snapshotDate: string;
      retrievedAt: string;
      versionKey: string;
      sha256: string;
    };
    outputQuantity: {
      status: "unknown";
      note: string;
    };
  };
  counts: {
    recipes: number;
    directLines: number;
    baseLines: number;
    intermediateLines: number;
    exactLines: number;
    ambiguousLines: number;
    unmatchedLines: number;
    outputQuantityKnown: 0;
    outputQuantityUnknown: number;
    materialDefinitions: number;
    exactMaterialDefinitions: number;
    ambiguousMaterialDefinitions: number;
    unmatchedMaterialDefinitions: number;
  };
  materials: Record<string, CatalogMaterial>;
  recipes: CatalogRecipe[];
  checksum: string;
  versionKey: string;
};

const catalog = catalogJson as unknown as CraftingCatalogDocument;
const recipeIdPattern = /^item-[1-9]\d{0,17}$/u;
const locales = new Set<SiteLocale>(["zh-hant", "en", "ko"]);

function assertCatalog() {
  if (
    catalog.schemaVersion !== 1 ||
    !Array.isArray(catalog.recipes) ||
    catalog.recipes.length !== catalog.counts.recipes ||
    Object.keys(catalog.materials).length !== catalog.counts.materialDefinitions ||
    !/^sha256-[0-9a-f]{64}$/u.test(catalog.versionKey) ||
    !/^[0-9a-f]{64}$/u.test(catalog.checksum)
  ) {
    throw new Error("Crafting catalog is incomplete or unsupported");
  }
  const ids = new Set<string>();
  for (const recipe of catalog.recipes) {
    if (!recipeIdPattern.test(recipe.recipeId) || ids.has(recipe.recipeId)) {
      throw new Error(`Crafting catalog contains invalid recipe ID ${recipe.recipeId}`);
    }
    ids.add(recipe.recipeId);
    if (recipe.outputQuantity !== null || !catalog.materials[recipe.outputKey]) {
      throw new Error(`Crafting recipe ${recipe.recipeId} has invalid output data`);
    }
    for (const mode of craftingModes) {
      for (const [key, quantity] of recipe[mode]) {
        if (
          !catalog.materials[key] ||
          !Number.isSafeInteger(quantity) ||
          quantity < 1
        ) {
          throw new Error(`Crafting recipe ${recipe.recipeId} has an invalid ${mode} line`);
        }
      }
    }
  }
}

assertCatalog();

export const craftingCatalogManifest = Object.freeze({
  schemaVersion: catalog.schemaVersion,
  versionKey: catalog.versionKey,
  checksum: catalog.checksum,
  counts: Object.freeze({ ...catalog.counts }),
  provenance: catalog.provenance,
});

const recipesById = new Map(catalog.recipes.map((recipe) => [recipe.recipeId, recipe]));
const recipeIds = Object.freeze(catalog.recipes.map((recipe) => recipe.recipeId));
const localizedRecipeCache = new Map<SiteLocale, readonly LocalizedCraftingRecipe[]>();

function requireLocale(locale: SiteLocale) {
  if (!locales.has(locale)) throw new RangeError(`Unsupported crafting locale: ${locale}`);
  return locale;
}

function localizeIngredient(
  key: string,
  quantity: number,
  locale: SiteLocale,
): LocalizedCraftingIngredient {
  const material = catalog.materials[key];
  if (!material) throw new Error(`Unknown crafting material key: ${key}`);
  return {
    key,
    itemId: material.itemId,
    candidateItemIds: material.candidateItemIds,
    matchStatus: material.matchStatus,
    name: material.names[locale],
    imageUrl: material.imageUrl,
    gradeCode: material.gradeCode,
    gradeName: material.gradeNames[locale],
    categoryCode: material.categoryCode,
    categoryName: material.categoryNames[locale],
    quantity,
  };
}

function localizeRecipe(
  recipe: CatalogRecipe,
  locale: SiteLocale,
): LocalizedCraftingRecipe {
  const output = catalog.materials[recipe.outputKey];
  if (
    !output?.itemId ||
    !output.imageUrl ||
    !output.gradeCode ||
    !output.gradeNames[locale] ||
    !output.categoryCode ||
    !output.categoryNames[locale]
  ) {
    throw new Error(`Crafting recipe ${recipe.recipeId} has incomplete official output data`);
  }
  const lines = (mode: CraftingMode) =>
    Object.freeze(
      recipe[mode].map(([key, quantity]) =>
        Object.freeze(localizeIngredient(key, quantity, locale)),
      ),
    );
  return Object.freeze({
    recipeId: recipe.recipeId,
    outputItemId: recipe.outputItemId,
    outputQuantity: null,
    name: output.names[locale],
    imageUrl: output.imageUrl,
    gradeCode: output.gradeCode,
    gradeName: output.gradeNames[locale],
    categoryCode: output.categoryCode,
    categoryName: output.categoryNames[locale],
    professionCode: recipe.professionCode,
    profession: recipe.professionNames?.[locale] ?? null,
    professionName: recipe.professionNames?.[locale] ?? null,
    masteryLevel: recipe.masteryLevel,
    sourceGradeName: recipe.sourceGradeName,
    sourceTotalCrafts: recipe.sourceTotalCrafts,
    sourceUrl: recipe.sourceUrl,
    direct: lines("direct"),
    base: lines("base"),
    intermediate: lines("intermediate"),
  });
}

/** Returns the stable, language-neutral recipe IDs in catalog order. */
export function getCraftingRecipeIds(): readonly string[] {
  return recipeIds;
}

/**
 * Returns all localized entries. Consumers should paginate before rendering;
 * the complete array is intentionally cached once per locale.
 */
export function getCraftingDirectoryEntries(
  locale: SiteLocale,
): readonly LocalizedCraftingRecipe[] {
  requireLocale(locale);
  const cached = localizedRecipeCache.get(locale);
  if (cached) return cached;
  const entries = Object.freeze(
    catalog.recipes.map((recipe) => localizeRecipe(recipe, locale)),
  );
  localizedRecipeCache.set(locale, entries);
  return entries;
}

export function getCraftingRecipe(
  recipeId: string,
  locale: SiteLocale,
): LocalizedCraftingRecipe | null {
  requireLocale(locale);
  if (!recipeIdPattern.test(recipeId)) return null;
  const recipe = recipesById.get(recipeId);
  return recipe ? localizeRecipe(recipe, locale) : null;
}

function normalized(value: string, locale: SiteLocale) {
  return value.normalize("NFKC").trim().toLocaleLowerCase(locale).replace(/\s+/gu, " ");
}

function filterCode(value: string | null | undefined) {
  const result = value?.trim() ?? "";
  if (!result) return null;
  if (!/^[A-Za-z0-9_:-]{1,80}$/u.test(result)) {
    throw new RangeError("Crafting filter is invalid");
  }
  return result.toLocaleLowerCase("en-US");
}

function pageValue(value: number | undefined, fallback: number, maximum: number) {
  const result = value ?? fallback;
  if (!Number.isSafeInteger(result) || result < 1 || result > maximum) {
    throw new RangeError("Crafting pagination is invalid");
  }
  return result;
}

function buildFacets(
  entries: readonly LocalizedCraftingRecipe[],
): CraftingDirectoryPage["facets"] {
  const count = (values: readonly (readonly [string | null, string | null])[]) => {
    const facets = new Map<string, CraftingDirectoryFacet>();
    for (const [code, label] of values) {
      if (!code || !label) continue;
      const current = facets.get(code);
      if (current) current.count += 1;
      else facets.set(code, { code, label, count: 1 });
    }
    return Object.freeze(
      [...facets.values()].sort(
        (left, right) => right.count - left.count || left.label.localeCompare(right.label),
      ),
    );
  };
  return Object.freeze({
    professions: count(entries.map((entry) => [entry.professionCode, entry.professionName])),
    grades: count(entries.map((entry) => [entry.gradeCode, entry.gradeName])),
    categories: count(entries.map((entry) => [entry.categoryCode, entry.categoryName])),
  });
}

/** Performs deterministic in-memory search and pagination over 1,613 recipes. */
export function queryCraftingDirectory(
  locale: SiteLocale,
  input: CraftingDirectoryQuery = {},
): CraftingDirectoryPage {
  requireLocale(locale);
  const query = normalized(input.query ?? "", locale);
  if (query.length > 100) throw new RangeError("Crafting query is too long");
  const tokens = [...new Set(query.split(/\s+/gu).filter(Boolean))];
  const profession = filterCode(input.profession);
  const grade = filterCode(input.grade);
  const category = filterCode(input.category);
  const page = pageValue(input.page, 1, 100_000);
  const pageSize = pageValue(input.pageSize, 20, 100);
  const allEntries = getCraftingDirectoryEntries(locale);
  const facets = buildFacets(allEntries);

  const matches = allEntries.filter((recipe) => {
    if (profession && recipe.professionCode?.toLocaleLowerCase("en-US") !== profession) {
      return false;
    }
    if (grade && recipe.gradeCode.toLocaleLowerCase("en-US") !== grade) return false;
    if (category && recipe.categoryCode.toLocaleLowerCase("en-US") !== category) return false;
    if (!tokens.length) return true;
    const haystack = normalized(
      [
        recipe.recipeId,
        recipe.outputItemId,
        recipe.name,
        recipe.gradeName,
        recipe.categoryName,
        recipe.professionName ?? "",
        ...recipe.direct.map((ingredient) => ingredient.name),
        ...recipe.base.map((ingredient) => ingredient.name),
      ].join(" "),
      locale,
    );
    return tokens.every((token) => haystack.includes(token));
  });

  const total = matches.length;
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, lastPage);
  const offset = (safePage - 1) * pageSize;
  return {
    items: Object.freeze(matches.slice(offset, offset + pageSize)),
    facets,
    pagination: {
      page: safePage,
      pageSize,
      total,
      lastPage,
    },
  };
}
