import {
  craftingModes,
  type CraftingMode,
  type LocalizedCraftingIngredient,
  type LocalizedCraftingRecipe,
} from "./crafting-catalog";

export const craftingCalculationLimits = {
  maxCraftCount: Number.MAX_SAFE_INTEGER,
  maxQuantity: Number.MAX_SAFE_INTEGER,
  maxUnitPrice: Number.MAX_SAFE_INTEGER,
  maxFeePerCraft: Number.MAX_SAFE_INTEGER,
} as const;

export type CraftingCalculationOptions = {
  craftCount: number;
  mode: CraftingMode;
  ownedByKey?: Readonly<Record<string, number>>;
  unitPriceByKey?: Readonly<Record<string, number>>;
  feePerCraft?: number;
};

export type CraftingIngredientCalculation = {
  ingredient: LocalizedCraftingIngredient;
  quantityPerCraft: number;
  required: number;
  owned: number;
  covered: number;
  shortage: number;
  surplus: number;
  unitPrice: number | null;
  purchaseCost: number | null;
  isComplete: boolean;
};

export type CraftingRecipeCalculation = {
  recipeId: string;
  mode: CraftingMode;
  craftCount: number;
  /** Remains null because the source snapshot has no verified output yield. */
  outputQuantityPerCraft: null;
  outputQuantity: null;
  lines: readonly CraftingIngredientCalculation[];
  totals: {
    targetedMaterials: number;
    completeMaterials: number;
    shortageMaterials: number;
    pricedShortageMaterials: number;
    unpricedShortageMaterials: number;
    pricedMaterialCost: number;
    feeCost: number;
    /** Null when at least one missing material has no unit price. */
    totalCost: number | null;
    isComplete: boolean;
  };
};

export type CraftingCalculationErrorCode =
  | "invalid-craft-count"
  | "invalid-mode"
  | "invalid-quantity"
  | "invalid-owned"
  | "invalid-unit-price"
  | "invalid-fee"
  | "unsafe-arithmetic";

export class CraftingCalculationError extends Error {
  readonly code: CraftingCalculationErrorCode;
  readonly path: string;

  constructor(code: CraftingCalculationErrorCode, path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = "CraftingCalculationError";
    this.code = code;
    this.path = path;
  }
}
function safeInteger(
  value: unknown,
  path: string,
  code: CraftingCalculationErrorCode,
  minimum = 0,
) {
  if (!Number.isSafeInteger(value) || Number(value) < minimum) {
    throw new CraftingCalculationError(
      code,
      path,
      `must be a safe integer greater than or equal to ${minimum}`,
    );
  }
  return Number(value);
}

function checkedMultiply(left: number, right: number, path: string) {
  const value = left * right;
  if (!Number.isSafeInteger(value)) {
    throw new CraftingCalculationError(
      "unsafe-arithmetic",
      path,
      "multiplication exceeds the safe-integer range",
    );
  }
  return value;
}

function checkedAdd(left: number, right: number, path: string) {
  const value = left + right;
  if (!Number.isSafeInteger(value)) {
    throw new CraftingCalculationError(
      "unsafe-arithmetic",
      path,
      "addition exceeds the safe-integer range",
    );
  }
  return value;
}

function optionalMapValue(
  values: Readonly<Record<string, number>> | undefined,
  key: string,
  path: string,
  code: CraftingCalculationErrorCode,
): number | null {
  if (!values || !Object.prototype.hasOwnProperty.call(values, key)) return null;
  return safeInteger(values[key], path, code);
}

function mergeIngredients(
  ingredients: readonly LocalizedCraftingIngredient[],
  mode: CraftingMode,
) {
  const byKey = new Map<
    string,
    { ingredient: LocalizedCraftingIngredient; quantity: number }
  >();
  for (const [index, ingredient] of ingredients.entries()) {
    const quantity = safeInteger(
      ingredient.quantity,
      `recipe.${mode}[${index}].quantity`,
      "invalid-quantity",
      1,
    );
    const current = byKey.get(ingredient.key);
    if (current) {
      current.quantity = checkedAdd(
        current.quantity,
        quantity,
        `recipe.${mode}.${ingredient.key}.quantity`,
      );
    } else {
      byKey.set(ingredient.key, { ingredient, quantity });
    }
  }
  return [...byKey.values()];
}

/**
 * Calculates deterministic requirements for a number of recipe executions.
 * Recipe quantities come from the attributed snapshot; item identity and
 * localization come from the bound official item catalog. This function does
 * not infer an output yield, success chance, market price, or recursive recipe.
 */
export function calculateCraftingRecipe(
  recipe: LocalizedCraftingRecipe,
  options: CraftingCalculationOptions,
): CraftingRecipeCalculation {
  const craftCount = safeInteger(
    options.craftCount,
    "options.craftCount",
    "invalid-craft-count",
    1,
  );
  if (!craftingModes.includes(options.mode)) {
    throw new CraftingCalculationError(
      "invalid-mode",
      "options.mode",
      "must be direct, base, or intermediate",
    );
  }
  const mode = options.mode;
  const feePerCraft = safeInteger(
    options.feePerCraft ?? 0,
    "options.feePerCraft",
    "invalid-fee",
  );
  const mergedIngredients = mergeIngredients(recipe[mode], mode);
  let pricedMaterialCost = 0;
  let completeMaterials = 0;
  let pricedShortageMaterials = 0;
  let unpricedShortageMaterials = 0;

  const lines = mergedIngredients.map(({ ingredient, quantity }, index) => {
    const required = checkedMultiply(
      quantity,
      craftCount,
      `calculation.lines[${index}].required`,
    );
    const owned =
      optionalMapValue(
        options.ownedByKey,
        ingredient.key,
        `options.ownedByKey.${ingredient.key}`,
        "invalid-owned",
      ) ?? 0;
    const covered = Math.min(required, owned);
    const shortage = Math.max(required - owned, 0);
    const surplus = Math.max(owned - required, 0);
    const unitPrice = optionalMapValue(
      options.unitPriceByKey,
      ingredient.key,
      `options.unitPriceByKey.${ingredient.key}`,
      "invalid-unit-price",
    );
    const purchaseCost =
      unitPrice === null
        ? null
        : checkedMultiply(
            shortage,
            unitPrice,
            `calculation.lines[${index}].purchaseCost`,
          );
    if (shortage === 0) completeMaterials += 1;
    else if (purchaseCost === null) unpricedShortageMaterials += 1;
    else pricedShortageMaterials += 1;
    if (purchaseCost !== null) {
      pricedMaterialCost = checkedAdd(
        pricedMaterialCost,
        purchaseCost,
        "calculation.totals.pricedMaterialCost",
      );
    }
    return Object.freeze({
      ingredient,
      quantityPerCraft: quantity,
      required,
      owned,
      covered,
      shortage,
      surplus,
      unitPrice,
      purchaseCost,
      isComplete: shortage === 0,
    });
  });

  const feeCost = checkedMultiply(
    craftCount,
    feePerCraft,
    "calculation.totals.feeCost",
  );
  const totalCost =
    unpricedShortageMaterials > 0
      ? null
      : checkedAdd(
          pricedMaterialCost,
          feeCost,
          "calculation.totals.totalCost",
        );
  const targetedMaterials = lines.length;
  return {
    recipeId: recipe.recipeId,
    mode,
    craftCount,
    outputQuantityPerCraft: null,
    outputQuantity: null,
    lines: Object.freeze(lines),
    totals: {
      targetedMaterials,
      completeMaterials,
      shortageMaterials: targetedMaterials - completeMaterials,
      pricedShortageMaterials,
      unpricedShortageMaterials,
      pricedMaterialCost,
      feeCost,
      totalCost,
      isComplete: targetedMaterials > 0 && completeMaterials === targetedMaterials,
    },
  };
}
