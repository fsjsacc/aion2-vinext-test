import assert from "node:assert/strict";
import test from "node:test";

import {
  MATERIAL_PLAN_SCHEMA,
  MATERIAL_PLAN_SCHEMA_VERSION,
  MaterialPlanValidationError,
  buildMaterialPlanShareFragment,
  calculateMaterialPlan,
  createMaterialPlanTemplate,
  createMaterialPlanState,
  getMaterialPlanTemplates,
  parseMaterialPlanState,
  serializeMaterialPlanState,
  validateMaterialPlanState,
} from "../app/material-calculator.ts";

function fixture(overrides = {}) {
  return createMaterialPlanState({
    locale: "en",
    title: "User plan",
    materials: [
      { id: "ore", name: "Ore" },
      { id: "crystal", name: "Crystal" },
    ],
    stages: [
      {
        id: "stage-a",
        name: "Stage A",
        targetCount: 3,
        costs: [
          { materialId: "ore", quantity: 4 },
          { materialId: "crystal", quantity: 1 },
        ],
      },
      {
        id: "stage-b",
        name: "Stage B",
        targetCount: 2,
        costs: [{ materialId: "ore", quantity: 1 }],
      },
    ],
    inventory: [
      { materialId: "ore", quantity: 10 },
      { materialId: "crystal", quantity: 5 },
    ],
    ...overrides,
  });
}

test("calculates aggregate requirements, shortages, surplus, and completion", () => {
  const result = calculateMaterialPlan(fixture());
  assert.deepEqual(
    result.stages.map((stage) => ({
      id: stage.id,
      targetCount: stage.targetCount,
    })),
    [
      { id: "stage-a", targetCount: 3 },
      { id: "stage-b", targetCount: 2 },
    ],
  );

  assert.deepEqual(result.materials, [
    {
      materialId: "ore",
      name: "Ore",
      required: 14,
      inventory: 10,
      covered: 10,
      shortage: 4,
      surplus: 0,
      completionRatio: 10 / 14,
      hasTarget: true,
      isComplete: false,
    },
    {
      materialId: "crystal",
      name: "Crystal",
      required: 3,
      inventory: 5,
      covered: 3,
      shortage: 0,
      surplus: 2,
      completionRatio: 1,
      hasTarget: true,
      isComplete: true,
    },
  ]);
  assert.deepEqual(result.totals, {
    targetCount: 5,
    targetedMaterials: 2,
    completeMaterials: 1,
    completionRatio: (10 / 14 + 1) / 2,
    hasTarget: true,
    isComplete: false,
  });
});

test("does not report an empty or zero-target plan as completed", () => {
  const blank = createMaterialPlanState({
    locale: "zh-hant",
    title: "空白",
    materials: [{ id: "sample", name: "材料" }],
    stages: [
      {
        id: "later",
        name: "稍後填寫",
        targetCount: 0,
        costs: [{ materialId: "sample", quantity: 2 }],
      },
    ],
    inventory: [{ materialId: "sample", quantity: 7 }],
  });
  const result = calculateMaterialPlan(blank);
  assert.deepEqual(result.materials[0], {
    materialId: "sample",
    name: "材料",
    required: 0,
    inventory: 7,
    covered: 0,
    shortage: 0,
    surplus: 7,
    completionRatio: null,
    hasTarget: false,
    isComplete: false,
  });
  assert.equal(result.totals.completionRatio, null);
  assert.equal(result.totals.hasTarget, false);
  assert.equal(result.totals.isComplete, false);
});

test("marks the plan complete only when every targeted material is covered", () => {
  const result = calculateMaterialPlan(
    fixture({
      inventory: [
        { materialId: "ore", quantity: 14 },
        { materialId: "crystal", quantity: 3 },
      ],
    }),
  );
  assert.equal(result.totals.targetedMaterials, 2);
  assert.equal(result.totals.completeMaterials, 2);
  assert.equal(result.totals.completionRatio, 1);
  assert.equal(result.totals.isComplete, true);
});

test("accepts exact safe-integer boundaries and rejects unsafe arithmetic", () => {
  const boundary = createMaterialPlanState({
    locale: "en",
    title: "Boundary",
    materials: [{ id: "one", name: "One" }],
    stages: [
      {
        id: "single",
        name: "Single",
        targetCount: 1,
        costs: [
          { materialId: "one", quantity: Number.MAX_SAFE_INTEGER },
        ],
      },
    ],
    inventory: [
      { materialId: "one", quantity: Number.MAX_SAFE_INTEGER },
    ],
  });
  assert.equal(
    calculateMaterialPlan(boundary).materials[0].required,
    Number.MAX_SAFE_INTEGER,
  );

  const overflow = createMaterialPlanState({
    locale: "en",
    title: "Overflow",
    materials: [{ id: "one", name: "One" }],
    stages: [
      {
        id: "double",
        name: "Double",
        targetCount: 2,
        costs: [
          { materialId: "one", quantity: Number.MAX_SAFE_INTEGER },
        ],
      },
    ],
    inventory: [],
  });
  assert.throws(
    () => calculateMaterialPlan(overflow),
    (error) =>
      error instanceof MaterialPlanValidationError &&
      error.code === "unsafe-arithmetic",
  );
});

test("rejects fractional, negative, duplicate, and unknown material input", () => {
  assert.throws(
    () =>
      createMaterialPlanState({
        locale: "en",
        title: "Fraction",
        materials: [{ id: "ore", name: "Ore" }],
        stages: [
          {
            id: "stage",
            name: "Stage",
            targetCount: 1.5,
            costs: [{ materialId: "ore", quantity: 1 }],
          },
        ],
        inventory: [],
      }),
    (error) =>
      error instanceof MaterialPlanValidationError &&
      error.code === "invalid-integer",
  );
  assert.throws(
    () =>
      createMaterialPlanState({
        locale: "en",
        title: "Negative",
        materials: [{ id: "ore", name: "Ore" }],
        stages: [],
        inventory: [{ materialId: "ore", quantity: -1 }],
      }),
    (error) =>
      error instanceof MaterialPlanValidationError &&
      error.code === "out-of-range",
  );
  assert.throws(
    () =>
      createMaterialPlanState({
        locale: "en",
        title: "Duplicate",
        materials: [
          { id: "ore", name: "Ore" },
          { id: "ore", name: "Other ore" },
        ],
        stages: [],
        inventory: [],
      }),
    (error) =>
      error instanceof MaterialPlanValidationError &&
      error.code === "duplicate-id",
  );
  assert.throws(
    () =>
      createMaterialPlanState({
        locale: "en",
        title: "Unknown",
        materials: [{ id: "ore", name: "Ore" }],
        stages: [
          {
            id: "stage",
            name: "Stage",
            targetCount: 1,
            costs: [{ materialId: "missing", quantity: 1 }],
          },
        ],
        inventory: [],
      }),
    (error) =>
      error instanceof MaterialPlanValidationError &&
      error.code === "unknown-material",
  );
  assert.throws(
    () =>
      createMaterialPlanState({
        locale: "en",
        title: "Zero cost",
        materials: [{ id: "ore", name: "Ore" }],
        stages: [
          {
            id: "stage",
            name: "Stage",
            targetCount: 1,
            costs: [{ materialId: "ore", quantity: 0 }],
          },
        ],
        inventory: [],
      }),
    (error) =>
      error instanceof MaterialPlanValidationError &&
      error.code === "out-of-range",
  );
});

test("version 1 refuses a plan that claims official game provenance", () => {
  const state = fixture();
  assert.throws(
    () =>
      validateMaterialPlanState({
        ...state,
        provenance: {
          kind: "official",
          officialGameData: true,
        },
      }),
    (error) =>
      error instanceof MaterialPlanValidationError &&
      error.code === "invalid-provenance",
  );
});

test("share state is deterministic, versioned, and round-trips Unicode", () => {
  const state = createMaterialPlanState({
    locale: "ko",
    title: "사용자 계획",
    materials: [{ id: "sample", name: "사용자 재료" }],
    stages: [
      {
        id: "stage",
        name: "사용자 단계",
        targetCount: 7,
        costs: [{ materialId: "sample", quantity: 9 }],
      },
    ],
    inventory: [{ materialId: "sample", quantity: 11 }],
  });
  const payload = serializeMaterialPlanState(state);
  assert.equal(serializeMaterialPlanState(state), payload);

  for (const shared of [
    payload,
    buildMaterialPlanShareFragment(state),
    `https://aion2kina.com/ko/tools/material-calculator/${buildMaterialPlanShareFragment(state)}`,
  ]) {
    const parsed = parseMaterialPlanState(shared);
    assert.equal(parsed.ok, true);
    if (parsed.ok) assert.deepEqual(parsed.state, state);
  }
  assert.equal(state.schema, MATERIAL_PLAN_SCHEMA);
  assert.equal(state.schemaVersion, MATERIAL_PLAN_SCHEMA_VERSION);
});

test("share parser separates malformed data from unsupported versions", () => {
  assert.deepEqual(parseMaterialPlanState(""), {
    ok: false,
    code: "missing-payload",
    message: "No material plan was found.",
  });
  assert.equal(parseMaterialPlanState("not*base64").code, "malformed-payload");
  assert.equal(
    parseMaterialPlanState("a".repeat(48_001)).code,
    "payload-too-large",
  );

  const unsupported = Buffer.from(
    JSON.stringify({
      ...fixture(),
      schemaVersion: MATERIAL_PLAN_SCHEMA_VERSION + 1,
    }),
  ).toString("base64url");
  assert.equal(parseMaterialPlanState(unsupported).code, "unsupported-version");

  const wrongSchema = Buffer.from(
    JSON.stringify({
      ...fixture(),
      schema: "another.schema",
    }),
  ).toString("base64url");
  assert.equal(parseMaterialPlanState(wrongSchema).code, "unsupported-schema");
});

test("blank and custom examples are localized and explicitly non-official", () => {
  const languageChecks = {
    "zh-hant": /不是 AION2 官方|非 AION2 官方|不包含任何 AION2 官方/u,
    en: /not official AION2|no official AION2/iu,
    ko: /AION2 공식.+(?:아니|아님|아닙)|AION2 공식 비용이 없/u,
  };

  for (const locale of ["zh-hant", "en", "ko"]) {
    const templates = getMaterialPlanTemplates(locale);
    assert.equal(templates.length, 2);
    for (const template of templates) {
      assert.equal(template.officialGameData, false);
      assert.equal(template.state.provenance.kind, "user-defined");
      assert.equal(template.state.provenance.officialGameData, false);
      assert.match(`${template.copy.notice} ${template.state.title}`, languageChecks[locale]);
      assert.equal(validateMaterialPlanState(template.state).locale, locale);
    }

    const example = createMaterialPlanTemplate("custom-example", locale);
    const result = calculateMaterialPlan(example.state);
    assert.deepEqual(
      result.materials.map((material) => ({
        required: material.required,
        inventory: material.inventory,
        shortage: material.shortage,
      })),
      [
        { required: 8, inventory: 4, shortage: 4 },
        { required: 2, inventory: 1, shortage: 1 },
      ],
    );
  }
});
