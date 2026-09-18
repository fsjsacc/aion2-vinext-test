import {
  siteLocales,
  type SiteLocale,
} from "./site-config.ts";

/**
 * Version 1 is intentionally user-defined only. It must not be used to present
 * community estimates or example quantities as official AION2 game data.
 */
export const MATERIAL_PLAN_SCHEMA = "aion2kina.material-plan" as const;
export const MATERIAL_PLAN_SCHEMA_VERSION = 1 as const;
export const MATERIAL_PLAN_SHARE_KEY = "plan" as const;
export const materialPlanLocales = siteLocales;

export const materialPlanLimits = {
  maxMaterials: 100,
  maxStages: 100,
  maxCostsPerStage: 100,
  maxTotalCostLines: 1_000,
  maxIdLength: 64,
  maxLabelLength: 120,
  maxSerializedLength: 48_000,
  maxQuantity: Number.MAX_SAFE_INTEGER,
} as const;

export type MaterialPlanProvenance = {
  kind: "user-defined";
  officialGameData: false;
};

export type MaterialPlanMaterial = {
  id: string;
  name: string;
};

export type MaterialPlanCost = {
  materialId: string;
  quantity: number;
};

export type MaterialPlanStage = {
  id: string;
  name: string;
  targetCount: number;
  costs: readonly MaterialPlanCost[];
};

export type MaterialPlanInventoryEntry = {
  materialId: string;
  quantity: number;
};

export type MaterialPlanDraft = {
  locale: SiteLocale;
  title: string;
  materials: readonly MaterialPlanMaterial[];
  stages: readonly MaterialPlanStage[];
  inventory: readonly MaterialPlanInventoryEntry[];
};

export type MaterialPlanState = MaterialPlanDraft & {
  schema: typeof MATERIAL_PLAN_SCHEMA;
  schemaVersion: typeof MATERIAL_PLAN_SCHEMA_VERSION;
  provenance: MaterialPlanProvenance;
};

export type MaterialPlanStageCalculation = {
  id: string;
  name: string;
  targetCount: number;
  materials: readonly {
    materialId: string;
    quantityPerTarget: number;
    required: number;
  }[];
};

export type MaterialPlanMaterialCalculation = {
  materialId: string;
  name: string;
  required: number;
  inventory: number;
  covered: number;
  shortage: number;
  surplus: number;
  completionRatio: number | null;
  hasTarget: boolean;
  isComplete: boolean;
};

export type MaterialPlanCalculation = {
  stages: readonly MaterialPlanStageCalculation[];
  materials: readonly MaterialPlanMaterialCalculation[];
  totals: {
    targetCount: number;
    targetedMaterials: number;
    completeMaterials: number;
    completionRatio: number | null;
    hasTarget: boolean;
    isComplete: boolean;
  };
};

export type MaterialPlanValidationCode =
  | "invalid-type"
  | "invalid-integer"
  | "out-of-range"
  | "invalid-id"
  | "invalid-provenance"
  | "duplicate-id"
  | "unknown-material"
  | "limit-exceeded"
  | "unsafe-arithmetic"
  | "unsupported-schema"
  | "unsupported-version";

export class MaterialPlanValidationError extends Error {
  readonly code: MaterialPlanValidationCode;
  readonly path: string;

  constructor(code: MaterialPlanValidationCode, path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = "MaterialPlanValidationError";
    this.code = code;
    this.path = path;
  }
}

export type MaterialPlanParseErrorCode =
  | "missing-payload"
  | "payload-too-large"
  | "malformed-payload"
  | "malformed-json"
  | "unsupported-schema"
  | "unsupported-version"
  | "invalid-state";

export type MaterialPlanParseResult =
  | { ok: true; state: MaterialPlanState }
  | {
      ok: false;
      code: MaterialPlanParseErrorCode;
      message: string;
    };

const identifierPattern = /^[a-z0-9](?:[a-z0-9._-]{0,63})?$/u;
const controlCharacterPattern = /[\u0000-\u001f\u007f]/u;
const base64UrlAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const base64UrlValues = new Map(
  [...base64UrlAlphabet].map((character, index) => [character, index]),
);

function validationError(
  code: MaterialPlanValidationCode,
  path: string,
  message: string,
): never {
  throw new MaterialPlanValidationError(code, path, message);
}

function recordValue(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    validationError("invalid-type", path, "must be an object");
  }
  return value as Record<string, unknown>;
}

function arrayValue(value: unknown, path: string, maximum: number): unknown[] {
  if (!Array.isArray(value)) {
    validationError("invalid-type", path, "must be an array");
  }
  if (value.length > maximum) {
    validationError(
      "limit-exceeded",
      path,
      `cannot contain more than ${maximum} entries`,
    );
  }
  return value;
}

function labelValue(value: unknown, path: string): string {
  if (typeof value !== "string") {
    validationError("invalid-type", path, "must be a string");
  }
  const normalized = value.trim();
  if (!normalized) {
    validationError("out-of-range", path, "cannot be empty");
  }
  if (controlCharacterPattern.test(normalized)) {
    validationError("out-of-range", path, "must be a single-line label");
  }
  if ([...normalized].length > materialPlanLimits.maxLabelLength) {
    validationError(
      "limit-exceeded",
      path,
      `cannot exceed ${materialPlanLimits.maxLabelLength} characters`,
    );
  }
  return normalized;
}

function identifierValue(value: unknown, path: string): string {
  if (typeof value !== "string") {
    validationError("invalid-type", path, "must be a string");
  }
  if (
    value.length > materialPlanLimits.maxIdLength ||
    !identifierPattern.test(value)
  ) {
    validationError(
      "invalid-id",
      path,
      "must be a lowercase stable identifier using letters, numbers, dots, underscores, or hyphens",
    );
  }
  return value;
}

function integerValue(
  value: unknown,
  path: string,
  minimum: number,
  maximum = materialPlanLimits.maxQuantity,
): number {
  if (!Number.isSafeInteger(value)) {
    validationError("invalid-integer", path, "must be a safe integer");
  }
  const quantity = value as number;
  if (quantity < minimum || quantity > maximum) {
    validationError(
      "out-of-range",
      path,
      `must be between ${minimum} and ${maximum}`,
    );
  }
  return Object.is(quantity, -0) ? 0 : quantity;
}

function checkedAdd(left: number, right: number, path: string) {
  const total = left + right;
  if (!Number.isSafeInteger(total)) {
    validationError(
      "unsafe-arithmetic",
      path,
      "sum exceeds the safe integer boundary",
    );
  }
  return total;
}

function checkedMultiply(left: number, right: number, path: string) {
  const total = left * right;
  if (!Number.isSafeInteger(total)) {
    validationError(
      "unsafe-arithmetic",
      path,
      "product exceeds the safe integer boundary",
    );
  }
  return total;
}

function ensureUnique(
  values: ReadonlySet<string>,
  value: string,
  path: string,
) {
  if (values.has(value)) {
    validationError("duplicate-id", path, `duplicates ${value}`);
  }
}

/**
 * Runtime validation is deliberately strict because share fragments are
 * untrusted input. Unknown object properties are discarded from the canonical
 * state returned by this function.
 */
export function validateMaterialPlanState(value: unknown): MaterialPlanState {
  const root = recordValue(value, "plan");
  if (root.schema !== MATERIAL_PLAN_SCHEMA) {
    validationError(
      "unsupported-schema",
      "plan.schema",
      `must equal ${MATERIAL_PLAN_SCHEMA}`,
    );
  }
  if (root.schemaVersion !== MATERIAL_PLAN_SCHEMA_VERSION) {
    validationError(
      "unsupported-version",
      "plan.schemaVersion",
      `must equal ${MATERIAL_PLAN_SCHEMA_VERSION}`,
    );
  }

  const provenance = recordValue(root.provenance, "plan.provenance");
  if (
    provenance.kind !== "user-defined" ||
    provenance.officialGameData !== false
  ) {
    validationError(
      "invalid-provenance",
      "plan.provenance",
      "version 1 accepts only user-defined, non-official quantities",
    );
  }

  if (
    typeof root.locale !== "string" ||
    !materialPlanLocales.includes(root.locale as SiteLocale)
  ) {
    validationError(
      "out-of-range",
      "plan.locale",
      `must be one of ${materialPlanLocales.join(", ")}`,
    );
  }
  const locale = root.locale as SiteLocale;
  const title = labelValue(root.title, "plan.title");

  const materialValues = arrayValue(
    root.materials,
    "plan.materials",
    materialPlanLimits.maxMaterials,
  );
  const materialIds = new Set<string>();
  const materials = materialValues.map((value, index) => {
    const path = `plan.materials[${index}]`;
    const material = recordValue(value, path);
    const id = identifierValue(material.id, `${path}.id`);
    ensureUnique(materialIds, id, `${path}.id`);
    materialIds.add(id);
    return {
      id,
      name: labelValue(material.name, `${path}.name`),
    };
  });

  const stageValues = arrayValue(
    root.stages,
    "plan.stages",
    materialPlanLimits.maxStages,
  );
  const stageIds = new Set<string>();
  let totalCostLines = 0;
  const stages = stageValues.map((value, stageIndex) => {
    const path = `plan.stages[${stageIndex}]`;
    const stage = recordValue(value, path);
    const id = identifierValue(stage.id, `${path}.id`);
    ensureUnique(stageIds, id, `${path}.id`);
    stageIds.add(id);

    const costValues = arrayValue(
      stage.costs,
      `${path}.costs`,
      materialPlanLimits.maxCostsPerStage,
    );
    totalCostLines = checkedAdd(
      totalCostLines,
      costValues.length,
      "plan.stages.costs",
    );
    if (totalCostLines > materialPlanLimits.maxTotalCostLines) {
      validationError(
        "limit-exceeded",
        "plan.stages.costs",
        `cannot contain more than ${materialPlanLimits.maxTotalCostLines} total entries`,
      );
    }

    const stageMaterialIds = new Set<string>();
    const costs = costValues.map((costValue, costIndex) => {
      const costPath = `${path}.costs[${costIndex}]`;
      const cost = recordValue(costValue, costPath);
      const materialId = identifierValue(
        cost.materialId,
        `${costPath}.materialId`,
      );
      if (!materialIds.has(materialId)) {
        validationError(
          "unknown-material",
          `${costPath}.materialId`,
          `references undefined material ${materialId}`,
        );
      }
      ensureUnique(stageMaterialIds, materialId, `${costPath}.materialId`);
      stageMaterialIds.add(materialId);
      return {
        materialId,
        quantity: integerValue(cost.quantity, `${costPath}.quantity`, 1),
      };
    });

    return {
      id,
      name: labelValue(stage.name, `${path}.name`),
      targetCount: integerValue(
        stage.targetCount,
        `${path}.targetCount`,
        0,
      ),
      costs,
    };
  });

  const inventoryValues = arrayValue(
    root.inventory,
    "plan.inventory",
    materialPlanLimits.maxMaterials,
  );
  const inventoryMaterialIds = new Set<string>();
  const inventory = inventoryValues.map((value, index) => {
    const path = `plan.inventory[${index}]`;
    const entry = recordValue(value, path);
    const materialId = identifierValue(
      entry.materialId,
      `${path}.materialId`,
    );
    if (!materialIds.has(materialId)) {
      validationError(
        "unknown-material",
        `${path}.materialId`,
        `references undefined material ${materialId}`,
      );
    }
    ensureUnique(inventoryMaterialIds, materialId, `${path}.materialId`);
    inventoryMaterialIds.add(materialId);
    return {
      materialId,
      quantity: integerValue(entry.quantity, `${path}.quantity`, 0),
    };
  });

  return {
    schema: MATERIAL_PLAN_SCHEMA,
    schemaVersion: MATERIAL_PLAN_SCHEMA_VERSION,
    provenance: {
      kind: "user-defined",
      officialGameData: false,
    },
    locale,
    title,
    materials,
    stages,
    inventory,
  };
}

export function createMaterialPlanState(
  draft: MaterialPlanDraft,
): MaterialPlanState {
  return validateMaterialPlanState({
    schema: MATERIAL_PLAN_SCHEMA,
    schemaVersion: MATERIAL_PLAN_SCHEMA_VERSION,
    provenance: {
      kind: "user-defined",
      officialGameData: false,
    },
    ...draft,
  });
}

/**
 * Calculates deterministic requirements only. It does not estimate success
 * chances, failure costs, market prices, drop rates, or any other game value.
 */
export function calculateMaterialPlan(
  input: MaterialPlanState,
): MaterialPlanCalculation {
  const state = validateMaterialPlanState(input);
  const requiredByMaterial = new Map(
    state.materials.map((material) => [material.id, 0]),
  );
  let targetCount = 0;

  const stages = state.stages.map((stage, stageIndex) => {
    targetCount = checkedAdd(
      targetCount,
      stage.targetCount,
      "calculation.targetCount",
    );
    const materials = stage.costs.map((cost, costIndex) => {
      const path = `calculation.stages[${stageIndex}].costs[${costIndex}]`;
      const required = checkedMultiply(
        cost.quantity,
        stage.targetCount,
        `${path}.required`,
      );
      requiredByMaterial.set(
        cost.materialId,
        checkedAdd(
          requiredByMaterial.get(cost.materialId) ?? 0,
          required,
          `calculation.materials.${cost.materialId}.required`,
        ),
      );
      return {
        materialId: cost.materialId,
        quantityPerTarget: cost.quantity,
        required,
      };
    });
    return {
      id: stage.id,
      name: stage.name,
      targetCount: stage.targetCount,
      materials,
    };
  });

  const inventoryByMaterial = new Map(
    state.inventory.map((entry) => [entry.materialId, entry.quantity]),
  );
  const materials = state.materials.map((material) => {
    const required = requiredByMaterial.get(material.id) ?? 0;
    const inventory = inventoryByMaterial.get(material.id) ?? 0;
    const covered = Math.min(required, inventory);
    const shortage = Math.max(required - inventory, 0);
    const surplus = Math.max(inventory - required, 0);

    return {
      materialId: material.id,
      name: material.name,
      required,
      inventory,
      covered,
      shortage,
      surplus,
      completionRatio: required === 0 ? null : covered / required,
      hasTarget: required > 0,
      isComplete: required > 0 && shortage === 0,
    };
  });

  const targeted = materials.filter((material) => material.hasTarget);
  const completeMaterials = targeted.filter(
    (material) => material.isComplete,
  ).length;
  const hasTarget = targeted.length > 0;
  // Every targeted material has equal weight. Adding unlike units would let a
  // large currency quantity hide a missing rare material.
  const completionRatio = hasTarget
    ? targeted.reduce(
        (total, material) => total + (material.completionRatio ?? 0),
        0,
      ) / targeted.length
    : null;
  return {
    stages,
    materials,
    totals: {
      targetCount,
      targetedMaterials: targeted.length,
      completeMaterials,
      completionRatio,
      hasTarget,
      isComplete: hasTarget && completeMaterials === targeted.length,
    },
  };
}

function encodeBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  let encoded = "";
  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index] ?? 0;
    const second = bytes[index + 1];
    const third = bytes[index + 2];
    encoded += base64UrlAlphabet[first >> 2];
    encoded += base64UrlAlphabet[((first & 0x03) << 4) | ((second ?? 0) >> 4)];
    if (second !== undefined) {
      encoded +=
        base64UrlAlphabet[((second & 0x0f) << 2) | ((third ?? 0) >> 6)];
    }
    if (third !== undefined) {
      encoded += base64UrlAlphabet[third & 0x3f];
    }
  }
  return encoded;
}

function decodeBase64Url(value: string) {
  if (!value || !/^[A-Za-z0-9_-]+$/u.test(value) || value.length % 4 === 1) {
    throw new Error("Invalid base64url payload");
  }

  let bitBuffer = 0;
  let bitCount = 0;
  const bytes: number[] = [];
  for (const character of value) {
    const digit = base64UrlValues.get(character);
    if (digit === undefined) throw new Error("Invalid base64url character");
    bitBuffer = (bitBuffer << 6) | digit;
    bitCount += 6;
    if (bitCount >= 8) {
      bitCount -= 8;
      bytes.push((bitBuffer >> bitCount) & 0xff);
      bitBuffer &= (1 << bitCount) - 1;
    }
  }
  if (bitCount > 0 && bitBuffer !== 0) {
    throw new Error("Non-canonical base64url padding bits");
  }

  return new TextDecoder("utf-8", { fatal: true }).decode(
    Uint8Array.from(bytes),
  );
}

function extractSharePayload(serialized: string) {
  const trimmed = serialized.trim();
  if (!trimmed) return null;

  if (/^[a-z][a-z0-9+.-]*:/iu.test(trimmed)) {
    let url: URL;
    try {
      url = new URL(trimmed);
    } catch {
      return null;
    }
    const hash = url.hash.replace(/^#/u, "");
    if (hash) {
      const hashParameters = new URLSearchParams(hash);
      return hashParameters.get(MATERIAL_PLAN_SHARE_KEY) ?? hash;
    }
    return url.searchParams.get(MATERIAL_PLAN_SHARE_KEY);
  }

  const fragment = trimmed.replace(/^[#?]/u, "");
  if (
    fragment.startsWith(`${MATERIAL_PLAN_SHARE_KEY}=`) ||
    fragment.includes(`&${MATERIAL_PLAN_SHARE_KEY}=`)
  ) {
    return new URLSearchParams(fragment).get(MATERIAL_PLAN_SHARE_KEY);
  }
  return fragment;
}

export function serializeMaterialPlanState(input: MaterialPlanState) {
  const state = validateMaterialPlanState(input);
  const serialized = encodeBase64Url(JSON.stringify(state));
  if (serialized.length > materialPlanLimits.maxSerializedLength) {
    validationError(
      "limit-exceeded",
      "plan",
      `serialized state cannot exceed ${materialPlanLimits.maxSerializedLength} characters`,
    );
  }
  return serialized;
}

export function buildMaterialPlanShareFragment(input: MaterialPlanState) {
  return `#${MATERIAL_PLAN_SHARE_KEY}=${serializeMaterialPlanState(input)}`;
}

export function parseMaterialPlanState(
  serialized: string,
): MaterialPlanParseResult {
  if (
    typeof serialized !== "string" ||
    serialized.length > materialPlanLimits.maxSerializedLength + 4_096
  ) {
    return {
      ok: false,
      code: "payload-too-large",
      message: "The shared plan exceeds the supported size.",
    };
  }

  const payload = extractSharePayload(serialized);
  if (!payload) {
    return {
      ok: false,
      code: "missing-payload",
      message: "No material plan was found.",
    };
  }
  if (payload.length > materialPlanLimits.maxSerializedLength) {
    return {
      ok: false,
      code: "payload-too-large",
      message: "The shared plan exceeds the supported size.",
    };
  }

  let decoded: string;
  try {
    decoded = decodeBase64Url(payload);
  } catch {
    return {
      ok: false,
      code: "malformed-payload",
      message: "The shared plan encoding is invalid.",
    };
  }

  let value: unknown;
  try {
    value = JSON.parse(decoded);
  } catch {
    return {
      ok: false,
      code: "malformed-json",
      message: "The shared plan JSON is invalid.",
    };
  }

  try {
    return { ok: true, state: validateMaterialPlanState(value) };
  } catch (error) {
    if (error instanceof MaterialPlanValidationError) {
      const code: MaterialPlanParseErrorCode =
        error.code === "unsupported-schema"
          ? "unsupported-schema"
          : error.code === "unsupported-version"
            ? "unsupported-version"
            : "invalid-state";
      return { ok: false, code, message: error.message };
    }
    return {
      ok: false,
      code: "invalid-state",
      message: "The shared plan state is invalid.",
    };
  }
}

export const materialPlanTemplateKinds = [
  "blank",
  "custom-example",
] as const;

export type MaterialPlanTemplateKind =
  (typeof materialPlanTemplateKinds)[number];

type MaterialPlanTemplateCopy = {
  name: string;
  description: string;
  notice: string;
  planTitle: string;
  materialNames: readonly [string, string];
  stageNames: readonly [string, string];
};

export type MaterialPlanTemplate = {
  kind: MaterialPlanTemplateKind;
  officialGameData: false;
  copy: Pick<MaterialPlanTemplateCopy, "name" | "description" | "notice">;
  state: MaterialPlanState;
};

const blankTemplateCopy: Record<SiteLocale, MaterialPlanTemplateCopy> = {
  "zh-hant": {
    name: "空白自訂計畫",
    description: "從空白計畫開始，自行輸入階段、每次材料成本、目標次數與目前庫存。",
    notice: "此範本不包含任何 AION2 官方成本；所有名稱與數量都由使用者輸入。",
    planTitle: "空白自訂材料計畫",
    materialNames: ["示例材料 A", "示例材料 B"],
    stageNames: ["示例階段一", "示例階段二"],
  },
  en: {
    name: "Blank custom plan",
    description:
      "Start with an empty plan and enter stages, per-target costs, target counts, and current inventory.",
    notice:
      "This template contains no official AION2 costs; every name and quantity is user-entered.",
    planTitle: "Blank custom material plan",
    materialNames: ["Example material A", "Example material B"],
    stageNames: ["Example stage one", "Example stage two"],
  },

  "zh-hans": {
    name: "空白自定义计划",
    description: "从空白计划开始，自行输入阶段、每次材料成本、目标次数与当前库存。",
    notice: "此范本不包含任何 AION2 官方成本；所有名称与数量都由用户输入。",
    planTitle: "空白自定义材料计划",
    materialNames: ["示例材料 A", "示例材料 B"],
    stageNames: ["示例阶段一", "示例阶段二"],
  },








  "de": {
    name: "Leerer benutzerdefinierter Plan",
    description:
      "Beginnen Sie mit einem leeren Plan und geben Sie Phasen, Kosten pro Ziel, Zielanzahl und aktuelles Inventar ein.",
    notice:
      "Diese Vorlage enthält keine offiziellen AION2 Kosten; jeder Name und jede Menge wird vom Benutzer eingegeben.",
    planTitle: "Leerer benutzerdefinierter Materialplan",
    materialNames: ["Beispielmaterial A", "Beispielmaterial B"],
    stageNames: ["Beispielstufe 1", "Beispielstufe 2"],
  },
  "fr": {
    name: "Plan personnalisé vierge",
    description:
      "Commencez par un plan vide et entrez les étapes, les coûts par cible, les dénombrements des cibles et l'inventaire actuel.",
    notice:
      "Ce modèle ne contient aucun coût officiel AION2 ; chaque nom et chaque quantité sont entrés par l'utilisateur.",
    planTitle: "Plan de matériaux sur mesure",
    materialNames: ["Exemple de matériel A", "Exemple de matériel B"],
    stageNames: ["Exemple de première étape", "Exemple de deuxième étape"],
  },
  "es": {
    name: "Plan personalizado en blanco",
    description:
      "Comience con un plan vacío y entre etapas, costos per-objetivo, conteos de destino y inventario actual.",
    notice:
      "Esta plantilla no contiene los costos oficiales de AION2; cada nombre y cantidad es de usuario.",
    planTitle: "Plan de material personalizado",
    materialNames: ["Material de ejemplo A", "Ejemplo de material B"],
    stageNames: ["Ejemplo de la primera etapa", "Ejemplo de la segunda etapa"],
  },
  "ja": {
    name: "空のカスタムプラン",
    description:
      "空のプランから始め、段階、目標1回あたりの材料数、目標回数、現在の所持数を入力します。",
    notice:
      "このテンプレートにAION2公式の必要数は含まれません。名前と数量はすべてユーザー入力です。",
    planTitle: "空のカスタム材料プラン",
    materialNames: ["サンプル材料A", "サンプル材料B"],
    stageNames: ["サンプル段階1", "サンプル段階2"],
  },
  "pt-br": {
    name: "Plano personalizado em branco",
    description:
      "Comece com um plano vazio e insira etapas, custos por alvo, contagens de alvo e inventário atual.",
    notice:
      "Este modelo não contém nenhum custo oficial do AION2; cada nome e quantidade é digitado pelo usuário.",
    planTitle: "Plano de materiais personalizados em branco",
    materialNames: ["Material de exemplo A", "Material de exemplo B"],
    stageNames: ["Fase de exemplo um", "Fase de exemplo dois"],
  },
  "ru": {
    name: "Бланковый индивидуальный план",
    description:
      "Начните с пустого плана и введите этапы, целевые затраты, количество целей и текущий инвентарь.",
    notice:
      "Этот шаблон не содержит официальных затрат AION2; каждое имя и количество вводится пользователем.",
    planTitle: "Бланковый индивидуальный план материалов",
    materialNames: ["Пример материала A", "Пример материала B"],
    stageNames: ["Примерный этап один", "Примерный этап два"],
  },
  ko: {
    name: "빈 사용자 계획",
    description:
      "빈 계획에서 단계, 1회당 재료 비용, 목표 횟수와 현재 보유량을 직접 입력합니다.",
    notice:
      "이 템플릿에는 AION2 공식 비용이 없으며 모든 이름과 수량은 사용자가 입력합니다.",
    planTitle: "빈 사용자 재료 계획",
    materialNames: ["예시 재료 A", "예시 재료 B"],
    stageNames: ["예시 단계 1", "예시 단계 2"],
  },
};

const exampleTemplateCopy: Record<SiteLocale, MaterialPlanTemplateCopy> = {
  "zh-hant": {
    name: "自訂計算示例",
    description: "用兩種虛構示例材料展示多階段需求、缺口與餘量的計算方式。",
    notice: "這是自訂算術示例，不是 AION2 官方材料名稱、成本、掉率或成長數值。",
    planTitle: "自訂計算示例（非 AION2 官方數值）",
    materialNames: ["虛構示例材料 A", "虛構示例材料 B"],
    stageNames: ["自訂示例階段一", "自訂示例階段二"],
  },
  en: {
    name: "Custom calculation example",
    description:
      "Use two fictional example materials to demonstrate multi-stage requirements, shortages, and surplus.",
    notice:
      "This is a custom arithmetic example, not official AION2 material names, costs, drop rates, or progression values.",
    planTitle: "Custom calculation example (not official AION2 data)",
    materialNames: ["Fictional example material A", "Fictional example material B"],
    stageNames: ["Custom example stage one", "Custom example stage two"],
  },

  "zh-hans": {
    name: "自定义计算示例",
    description: "用两种虚构示例材料展示多阶段需求、缺口与余量的计算方式。",
    notice: "这是自定义算术示例，不是 AION2 官方材料名称、成本、掉率或成长数值。",
    planTitle: "自定义计算示例（非 AION2 官方数值）",
    materialNames: ["虚构示例材料 A", "虚构示例材料 B"],
    stageNames: ["自定义示例阶段一", "自定义示例阶段二"],
  },








  "de": {
    name: "Beispiel für die Berechnung nach Kundenangaben",
    description:
      "Verwenden Sie zwei fiktive Beispielmaterialien, um mehrstufige Anforderungen, Engpässe und Überschüsse zu demonstrieren.",
    notice:
      "Dies ist ein benutzerdefiniertes arithmetisches Beispiel, nicht offizielle AION2-Materialnamen, Kosten, Drop-Raten oder Progressionswerte.",
    planTitle: "Benutzerdefiniertes Berechnungsbeispiel (nicht offizielle AION2-Daten)",
    materialNames: ["Fiktives Beispielmaterial A", "Fiktives Beispielmaterial B"],
    stageNames: ["Benutzerdefiniertes Beispiel Stufe 1", "Benutzerdefiniertes Beispiel Stufe 2"],
  },
  "fr": {
    name: "Exemple de calcul personnalisé",
    description:
      "Utilisez deux exemples fictifs pour démontrer les exigences, les pénuries et les surplus à plusieurs étapes.",
    notice:
      "Il s'agit d'un exemple arithmétique personnalisé, pas de noms officiels de matériaux AION2, de coûts, de taux de chute ou de valeurs de progression.",
    planTitle: "Exemple de calcul personnalisé (pas de données officielles AION2)",
    materialNames: ["Exemple fictif matériel A", "Exemple fictif matériel B"],
    stageNames: ["Exemple personnalisé étape un", "Exemple personnalisé étape deux"],
  },
  "es": {
    name: "Ejemplo de cálculo personalizado",
    description:
      "Utilice dos materiales de ejemplo ficticios para demostrar necesidades de múltiples etapas, escasez y excedente.",
    notice:
      "Este es un ejemplo aritmético personalizado, no nombres oficiales de materiales AION2, costos, tasas de caída o valores de progresión.",
    planTitle: "Ejemplo de cálculo personalizado (no datos oficiales de AION2)",
    materialNames: ["Material de ejemplo de ficción A", "Material de ejemplo de ficción B"],
    stageNames: ["Primera etapa del ejemplo personalizado", "Etapa de ejemplo personalizada dos"],
  },
  "ja": {
    name: "カスタム計算例",
    description:
      "2種類の架空材料を使い、複数段階の必要量、不足、余りの計算方法を示します。",
    notice:
      "これは計算例であり、AION2公式の材料名、必要数、ドロップ率、成長値ではありません。",
    planTitle: "カスタム計算例（AION2公式データではありません）",
    materialNames: ["架空サンプル材料A", "架空サンプル材料B"],
    stageNames: ["カスタムサンプル段階1", "カスタムサンプル段階2"],
  },
  "pt-br": {
    name: "Exemplo de cálculo personalizado",
    description:
      "Use dois materiais de exemplo fictícios para demonstrar exigências de múltiplos estágios, escassez e excedentes.",
    notice:
      "Este é um exemplo aritmético personalizado, não nomes de materiais oficiais AION2, custos, taxas de queda, ou valores de progressão.",
    planTitle: "Exemplo de cálculo personalizado (não são dados oficiais do AION2)",
    materialNames: ["Material de exemplo fictício A", "Material de exemplo fictício B"],
    stageNames: ["Fase de exemplo personalizada um", "Exemplo personalizado fase dois"],
  },
  "ru": {
    name: "Пример пользовательского расчета",
    description:
      "Используйте два вымышленных примера материалов, чтобы продемонстрировать многоэтапные требования, дефицит и излишки.",
    notice:
      "Это пример арифметики, а не официальные названия материалов AION2, затраты, коэффициенты падения или значения прогрессии.",
    planTitle: "Пример пользовательского расчета (не официальные данные AION2)",
    materialNames: ["Вымышленный пример материала А", "Примерный материал B"],
    stageNames: ["Примерная стадия один", "Примерная стадия два"],
  },
  ko: {
    name: "사용자 계산 예시",
    description:
      "두 가지 가상 예시 재료로 여러 단계의 필요량, 부족량과 잔여량 계산을 보여 줍니다.",
    notice:
      "사용자 산술 예시이며 AION2 공식 재료명, 비용, 획득 확률 또는 성장 수치가 아닙니다.",
    planTitle: "사용자 계산 예시(AION2 공식 수치 아님)",
    materialNames: ["가상 예시 재료 A", "가상 예시 재료 B"],
    stageNames: ["사용자 예시 단계 1", "사용자 예시 단계 2"],
  },
};

function blankTemplateState(
  locale: SiteLocale,
  copy: MaterialPlanTemplateCopy,
) {
  return createMaterialPlanState({
    locale,
    title: copy.planTitle,
    materials: [],
    stages: [],
    inventory: [],
  });
}

/**
 * The quantities below are deliberately small arithmetic fixtures. They do not
 * model any AION2 system and are always paired with an explicit non-official
 * notice in all three languages.
 */
function exampleTemplateState(
  locale: SiteLocale,
  copy: MaterialPlanTemplateCopy,
) {
  return createMaterialPlanState({
    locale,
    title: copy.planTitle,
    materials: [
      { id: "fictional-material-a", name: copy.materialNames[0] },
      { id: "fictional-material-b", name: copy.materialNames[1] },
    ],
    stages: [
      {
        id: "custom-stage-one",
        name: copy.stageNames[0],
        targetCount: 2,
        costs: [
          { materialId: "fictional-material-a", quantity: 3 },
          { materialId: "fictional-material-b", quantity: 1 },
        ],
      },
      {
        id: "custom-stage-two",
        name: copy.stageNames[1],
        targetCount: 1,
        costs: [{ materialId: "fictional-material-a", quantity: 2 }],
      },
    ],
    inventory: [
      { materialId: "fictional-material-a", quantity: 4 },
      { materialId: "fictional-material-b", quantity: 1 },
    ],
  });
}

export function createMaterialPlanTemplate(
  kind: MaterialPlanTemplateKind,
  locale: SiteLocale,
): MaterialPlanTemplate {
  const localized =
    kind === "blank"
      ? blankTemplateCopy[locale]
      : exampleTemplateCopy[locale];
  return {
    kind,
    officialGameData: false,
    copy: {
      name: localized.name,
      description: localized.description,
      notice: localized.notice,
    },
    state:
      kind === "blank"
        ? blankTemplateState(locale, localized)
        : exampleTemplateState(locale, localized),
  };
}

export function getMaterialPlanTemplates(locale: SiteLocale) {
  return materialPlanTemplateKinds.map((kind) =>
    createMaterialPlanTemplate(kind, locale),
  );
}
