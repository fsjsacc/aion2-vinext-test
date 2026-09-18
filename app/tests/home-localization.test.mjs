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

async function loadHomeLocalization() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    return await vite.ssrLoadModule("/app/home-i18n.ts");
  } finally {
    await vite.close();
  }
}

test("all 149 home strings have direct non-empty copy in every site locale", async () => {
  const [home, generatedRaw, japaneseRaw, latinRaw, otherRaw] = await Promise.all([
    loadHomeLocalization(),
    readFile(
      path.join(root, "app", "home-editorial-locales.generated.json"),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "home-editorial-locales.ja.reviewed.json"),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "home-editorial-locales.latin.reviewed.json"),
      "utf8",
    ),
    readFile(
      path.join(root, "app", "home-editorial-locales.other.reviewed.json"),
      "utf8",
    ),
  ]);
  const generated = JSON.parse(generatedRaw);
  const reviewed = {
    ...JSON.parse(japaneseRaw),
    ...JSON.parse(latinRaw),
    ...JSON.parse(otherRaw),
  };
  const sortedKeys = [...home.homeCopyKeys].sort();

  assert.equal(home.homeCopyKeys.length, 149);
  assert.deepEqual([...home.homeLocales], locales);
  assert.deepEqual(
    Object.keys(generated.translations).sort(),
    [...editorialLocales].sort(),
  );

  for (const locale of locales) {
    const copy = home.homeTranslations[locale];
    assert.ok(copy, `${locale} home copy`);
    assert.deepEqual(
      Object.keys(copy).sort(),
      sortedKeys,
      `${locale} must define every home key directly`,
    );

    for (const key of home.homeCopyKeys) {
      assert.equal(typeof copy[key], "string", `${locale}.${key}`);
      assert.ok(copy[key].trim(), `${locale}.${key} must not be empty`);
      assert.equal(home.homeText(locale, key), copy[key], `${locale}.${key}`);
    }
  }

  for (const locale of editorialLocales) {
    const generatedCopy = generated.translations[locale];
    assert.deepEqual(Object.keys(generatedCopy).sort(), sortedKeys);
    for (const key of home.homeCopyKeys) {
      assert.ok(generatedCopy[key].trim(), `${locale}.${key} generated base`);
    }
  }

  assert.deepEqual(Object.keys(reviewed.ja).sort(), sortedKeys);
  for (const [locale, copy] of Object.entries(reviewed)) {
    assert.ok(editorialLocales.includes(locale), `${locale} reviewed locale`);
    for (const [key, value] of Object.entries(copy)) {
      assert.ok(sortedKeys.includes(key), `${locale}.${key} reviewed key`);
      assert.equal(typeof value, "string", `${locale}.${key} reviewed value`);
      assert.ok(value.trim(), `${locale}.${key} reviewed value must not be empty`);
      assert.doesNotMatch(value, /\uFFFD/u, `${locale}.${key} reviewed value`);
    }
  }

  assert.equal(home.homeText("zh-hant", "Home"), "首頁");
  assert.equal(
    home.homeText("zh-hant", "Two Worlds. One Journey."),
    "兩個世界，一段旅程。",
  );
  assert.equal(home.homeText("en", "Home"), "Home");
  assert.equal(
    home.homeText("en", "Two Worlds. One Journey."),
    "Two Worlds. One Journey.",
  );
  assert.equal(home.homeText("ko", "Home"), "홈");
  assert.equal(
    home.homeText("ko", "Two Worlds. One Journey."),
    "두 세계, 하나의 여정.",
  );

  const curatedOverrides = {
    "zh-hans": ["Search", "搜索"],
    fr: ["ENTER ELYSEA", "ENTRER EN ÉLYSÉA"],
    de: ["Choose language", "Sprache wählen"],
    es: ["GLOBAL PLAYER RESOURCE", "RECURSO PARA JUGADORES DE TODO EL MUNDO"],
    ja: ["Choose language", "言語を選択"],
    "pt-br": ["Two Worlds. One Journey.", "Dois mundos. Uma jornada."],
    ru: ["ENTER ELYSEA", "ВОЙТИ ЗА ЭЛИЙЦЕВ"],
  };

  for (const [locale, [key, expected]] of Object.entries(curatedOverrides)) {
    assert.equal(home.homeTranslations[locale][key], expected);
    assert.notEqual(
      generated.translations[locale][key],
      expected,
      `${locale}.${key} must demonstrate curated-over-generated precedence`,
    );
  }
});
