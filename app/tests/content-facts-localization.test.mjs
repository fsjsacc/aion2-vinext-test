import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const locales = [
  "zh-hans",
  "en",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
  "ko",
  "zh-hant",
];
const editorialLocales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];

async function loadLocalization() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const [profiles, copy] = await Promise.all([
      vite.ssrLoadModule("/app/class-guide-content.ts"),
      vite.ssrLoadModule("/app/content-facts-localization.ts"),
    ]);
    return { profiles, copy };
  } finally {
    await vite.close();
  }
}

test("class difficulty facts and nine class profiles are direct in all ten locales", async () => {
  const { profiles, copy } = await loadLocalization();
  assert.equal(profiles.classDifficultyProfiles.length, 9);
  assert.deepEqual(
    Object.keys(copy.classDifficultyFactsCopy).sort(),
    [...locales].sort(),
  );

  for (const profile of profiles.classDifficultyProfiles) {
    assert.deepEqual(Object.keys(profile.names).sort(), [...locales].sort());
    assert.deepEqual(Object.keys(profile.weapon).sort(), [...locales].sort());
    assert.deepEqual(Object.keys(profile.role).sort(), [...locales].sort());
    assert.deepEqual(Object.keys(profile.rationale).sort(), [...locales].sort());
    assert.deepEqual([...profile.scope.locales].sort(), [...locales].sort());

    for (const locale of locales) {
      assert.ok(profile.names[locale]?.trim(), `${profile.slug}.${locale}.name`);
      assert.ok(profile.weapon[locale]?.trim(), `${profile.slug}.${locale}.weapon`);
      assert.ok(profile.role[locale]?.trim(), `${profile.slug}.${locale}.role`);
      assert.ok(
        profile.rationale[locale]?.trim(),
        `${profile.slug}.${locale}.rationale`,
      );
      assert.ok(
        profile.scope.notes[locale]?.trim(),
        `${profile.slug}.${locale}.scope`,
      );
    }

    for (const locale of editorialLocales) {
      assert.notEqual(
        profile.role[locale],
        profile.role.en,
        `${profile.slug}.${locale} must not use the English role`,
      );
    }
  }
});

test("item facts UI and trust contact label are localized independently of raw item data", async () => {
  const { copy } = await loadLocalization();
  assert.deepEqual(Object.keys(copy.itemFactsCopy).sort(), [...locales].sort());
  assert.deepEqual(
    Object.keys(copy.trustContactEyebrowCopy).sort(),
    [...locales].sort(),
  );

  for (const locale of editorialLocales) {
    assert.notEqual(copy.itemFactsCopy[locale].label, copy.itemFactsCopy.en.label);
    assert.notEqual(copy.itemFactsCopy[locale].unknown, copy.itemFactsCopy.en.unknown);
    assert.notEqual(copy.itemFactsCopy[locale].official, copy.itemFactsCopy.en.official);
    assert.notEqual(
      copy.trustContactEyebrowCopy[locale],
      copy.trustContactEyebrowCopy.en,
    );
  }

  const [classFactsSource, itemFactsSource, trustSource] = await Promise.all([
    readFile(
      path.join(root, "app", "_components", "content", "ClassDifficultyFacts.tsx"),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "_components", "content", "StructuredContentFacts.tsx"),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "_components", "trust", "TrustPage.tsx"),
      "utf8",
    ),
  ]);
  assert.doesNotMatch(classFactsSource, /resolveContentLocale/);
  assert.match(itemFactsSource, /const copy = itemFactsCopy\[locale\]/);
  assert.match(itemFactsSource, /const contentLocale = resolveContentLocale\(locale\)/);
  assert.doesNotMatch(trustSource, />EDITORIAL CONTACT</);
});
