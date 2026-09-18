import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const editorialLocales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];
const localizedToolSlugs = [
  "map",
  "class-finder",
  "build-planner",
  "material-calculator",
  "daily-checklist",
  "event-timer",
];

async function loadToolRegistry() {
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
    return await vite.ssrLoadModule("/app/tool-registry.ts");
  } finally {
    await vite.close();
  }
}

async function loadClassFinderLocalization() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const [data, localization] = await Promise.all([
      vite.ssrLoadModule("/app/class-finder-data.ts"),
      vite.ssrLoadModule("/app/class-finder-localization.ts"),
    ]);
    return { data, localization };
  } finally {
    await vite.close();
  }
}

async function loadChecklistLocalization() {
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
    const [component, activities] = await Promise.all([
      vite.ssrLoadModule("/app/_components/tools/DailyChecklist.tsx"),
      vite.ssrLoadModule("/app/checklist-activities.ts"),
    ]);
    return { component, activities };
  } finally {
    await vite.close();
  }
}

test("tool hub and registry expose independent localized copy for every added locale", async () => {
  const { toolHubCopy, toolRegistry } = await loadToolRegistry();
  const englishHub = toolHubCopy.en;

  for (const locale of editorialLocales) {
    const localizedHub = toolHubCopy[locale];
    assert.ok(localizedHub, `${locale} tool hub copy`);
    assert.notStrictEqual(
      localizedHub,
      englishHub,
      `${locale} must not reuse the English hub object`,
    );

    for (const field of [
      "title",
      "description",
      "directoryTitle",
      "searchPlaceholder",
      "openTool",
      "backToTools",
    ]) {
      assert.notEqual(
        localizedHub[field],
        englishHub[field],
        `${locale}.toolHubCopy.${field} must be localized`,
      );
    }
  }

  for (const slug of localizedToolSlugs) {
    const tool = toolRegistry.find((candidate) => candidate.slug === slug);
    assert.ok(tool, `${slug} registry entry`);
    const english = tool.copy.en;

    for (const locale of editorialLocales) {
      const localized = tool.copy[locale];
      assert.ok(localized, `${slug}.${locale} copy`);
      assert.notStrictEqual(
        localized,
        english,
        `${slug}.${locale} must not reuse the English copy object`,
      );

      for (const field of ["name", "description", "action"]) {
        assert.notEqual(
          localized[field],
          english[field],
          `${slug}.${locale}.${field} must be localized`,
        );
      }

      if (english.highlights.length > 0) {
        assert.equal(
          localized.highlights.length,
          english.highlights.length,
          `${slug}.${locale} feature count`,
        );
        assert.notDeepEqual(
          localized.highlights,
          english.highlights,
          `${slug}.${locale} features must be localized`,
        );
      }
    }
  }
});

test("class finder questions, results, page, sharing and poster copy are direct in all ten locales", async () => {
  const { data, localization } = await loadClassFinderLocalization();
  const locales = ["zh-hans", "en", "fr", "de", "es", "ja", "pt-br", "ru", "ko", "zh-hant"];

  assert.deepEqual(Object.keys(data.classFinderCopy).sort(), [...locales].sort());
  assert.equal(data.classFinderQuestions.length, 6);
  assert.equal(data.classFinderClassProfiles.length, 8);

  for (const locale of locales) {
    assert.ok(data.classFinderCopy[locale]?.title, `${locale} data UI`);
    assert.ok(data.classFinderScopeNote[locale], `${locale} scope note`);

    for (const question of data.classFinderQuestions) {
      assert.ok(question.copy[locale]?.title, `${locale}.${question.id}.title`);
      assert.ok(question.copy[locale]?.hint, `${locale}.${question.id}.hint`);
      for (const option of question.options) {
        assert.ok(option.copy[locale]?.label, `${locale}.${option.id}.label`);
        assert.ok(option.copy[locale]?.description, `${locale}.${option.id}.description`);
      }
    }

    for (const profile of data.classFinderClassProfiles) {
      assert.ok(profile.copy[locale]?.name, `${locale}.${profile.classId}.name`);
      assert.ok(profile.copy[locale]?.weapon, `${locale}.${profile.classId}.weapon`);
      assert.ok(profile.copy[locale]?.officialRole, `${locale}.${profile.classId}.officialRole`);
      assert.ok(profile.copy[locale]?.summary, `${locale}.${profile.classId}.summary`);
    }
  }

  for (const locale of editorialLocales) {
    assert.ok(localization.editorialClassFinderPageCopy[locale]?.seoTitle);
    assert.ok(localization.editorialClassFinderUiCopy[locale]?.introTitle);
    assert.ok(localization.editorialClassFinderShareCopy[locale]?.title);
    assert.ok(localization.editorialClassFinderPosterCopy[locale]?.title);
    assert.notEqual(
      localization.editorialClassFinderUiCopy[locale].introTitle,
      "Narrow your class choices in 6 decisions",
      `${locale} must not fall back to English`,
    );
  }

  const files = await Promise.all([
    readFile(path.join(root, "app", "_components", "tools", "ClassFinder.tsx"), "utf8"),
    readFile(path.join(root, "app", "_components", "tools", "ClassFinderShareDialog.tsx"), "utf8"),
    readFile(path.join(root, "app", "class-finder-poster.ts"), "utf8"),
    readFile(path.join(root, "app", "class-finder-data.ts"), "utf8"),
  ]);
  for (const source of files) {
    assert.doesNotMatch(source, /resolveContentLocale/);
  }
});

test("daily checklist UI, activities and evidence are direct in all ten locales", async () => {
  const { component, activities } = await loadChecklistLocalization();
  const locales = ["zh-hans", "en", "fr", "de", "es", "ja", "pt-br", "ru", "ko", "zh-hant"];

  assert.deepEqual(
    Object.keys(component.checklistUiCopy).sort(),
    [...locales].sort(),
  );
  assert.equal(activities.CHECKLIST_ACTIVITIES.length, 15);
  assert.equal(Object.keys(activities.CHECKLIST_SOURCES).length, 10);

  for (const locale of locales) {
    const ui = component.checklistUiCopy[locale];
    assert.ok(ui?.title, `${locale} checklist title`);
    assert.ok(ui?.maintenanceNote, `${locale} reset guidance`);
    assert.ok(ui?.customAction, `${locale} custom task action`);
    assert.ok(ui?.filtersLabel, `${locale} filter aria label`);
    assert.match(ui.progressDaily(1, 3), /1.*3/u);
    assert.match(ui.delete("Target"), /Target/u);
    assert.match(ui.limit, /100/u);
    assert.match(ui.mapLinkLabel("Marker"), /Marker/u);
    assert.match(ui.daysRemaining(2, "03:04:05"), /2.*03:04:05/u);

    for (const activity of activities.CHECKLIST_ACTIVITIES) {
      const copy = activities.getChecklistActivityCopy(activity, locale);
      for (const field of ["name", "summary", "cadence", "entry", "reward", "tip"]) {
        assert.ok(copy[field]?.trim(), `${locale}.${activity.id}.${field}`);
      }
    }

    for (const sourceId of Object.keys(activities.CHECKLIST_SOURCES)) {
      const copy = activities.getChecklistSourceCopy(sourceId, locale);
      assert.ok(copy.label?.trim(), `${locale}.${sourceId}.label`);
      assert.ok(copy.note?.trim(), `${locale}.${sourceId}.note`);
    }
  }

  for (const locale of editorialLocales) {
    assert.notDeepEqual(
      component.checklistUiCopy[locale],
      component.checklistUiCopy.en,
      `${locale} checklist UI must not reuse English`,
    );
    for (const activity of activities.CHECKLIST_ACTIVITIES) {
      assert.notDeepEqual(
        activities.getChecklistActivityCopy(activity, locale),
        activities.getChecklistActivityCopy(activity, "en"),
        `${locale}.${activity.id} must not reuse English`,
      );
    }
    for (const sourceId of Object.keys(activities.CHECKLIST_SOURCES)) {
      assert.notDeepEqual(
        activities.getChecklistSourceCopy(sourceId, locale),
        activities.getChecklistSourceCopy(sourceId, "en"),
        `${locale}.${sourceId} must not reuse English`,
      );
    }
  }

  const [componentSource, activitySource] = await Promise.all([
    readFile(path.join(root, "app", "_components", "tools", "DailyChecklist.tsx"), "utf8"),
    readFile(path.join(root, "app", "checklist-activities.ts"), "utf8"),
  ]);
  assert.doesNotMatch(componentSource, /resolveContentLocale/);
  assert.doesNotMatch(activitySource, /resolveContentLocale/);
});
