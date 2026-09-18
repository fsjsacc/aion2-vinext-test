import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = JSON.parse(
  await readFile(
    path.join(root, "tmp", "editorial-content-source.json"),
    "utf8",
  ),
);
const generated = JSON.parse(
  await readFile(
    path.join(root, "app", "editorial-content-locales.generated.json"),
    "utf8",
  ),
);
const locales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];
const preservedKeys = new Set(["id", "byline", "mapSlug", "filterSubtype"]);
const markerPattern = /KINA\s*(?:START|END)|98[45][\s.,]*\d{6}/iu;
const localePrefixPattern =
  /^\/(?:zh-hans|en|fr|de|es|ja|pt-br|ru|ko|zh-hant)\//u;
const sourceScriptPattern =
  /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]/u;
const unexpectedNonRussianPattern =
  /[\uFFFD\p{Cn}\p{Script=Greek}\p{Script=Cyrillic}\p{Script=Hebrew}\p{Script=Arabic}]/u;
const unexpectedRussianPattern =
  /[\uFFFD\p{Cn}\p{Script=Greek}\p{Script=Hebrew}\p{Script=Arabic}]/u;

function unexpectedPattern(locale) {
  return locale === "ru"
    ? unexpectedRussianPattern
    : unexpectedNonRussianPattern;
}

function validateValue(
  sourceValue,
  localizedValue,
  label,
  key = "",
  locale = "",
) {
  if (typeof sourceValue === "string") {
    assert.equal(
      typeof localizedValue,
      "string",
      `${label} must remain a string`,
    );
    assert.ok(localizedValue.trim(), `${label} must not be empty`);
    assert.doesNotMatch(localizedValue, /\uFFFD/u, `${label} contains invalid text`);
    assert.doesNotMatch(localizedValue, markerPattern, `${label} contains a batch marker`);
    if (sourceScriptPattern.test(sourceValue)) {
      assert.doesNotMatch(
        localizedValue,
        unexpectedPattern(locale),
        `${label} contains script corruption in a source-language term`,
      );
    }
    if (preservedKeys.has(key)) {
      assert.equal(
        localizedValue,
        sourceValue,
        `${label} is a technical identifier and must not be translated`,
      );
    }
    if (key === "href") {
      if (localePrefixPattern.test(sourceValue)) {
        assert.ok(
          localizedValue.startsWith(`/${locale}/`),
          `${label} must point to the equivalent ${locale} route`,
        );
      } else if (/^https:\/\//u.test(sourceValue)) {
        assert.equal(
          localizedValue,
          sourceValue,
          `${label} external destination must not change`,
        );
      }
    }
    return;
  }

  if (Array.isArray(sourceValue)) {
    assert.ok(Array.isArray(localizedValue), `${label} must remain an array`);
    if (key === "keywords") {
      assert.ok(localizedValue.length > 0, `${label} must not be empty`);
      localizedValue.forEach((item, index) => {
        assert.equal(
          typeof item,
          "string",
          `${label}[${index}] must remain a string`,
        );
        assert.ok(item.trim(), `${label}[${index}] must not be empty`);
        assert.doesNotMatch(
          item,
          /\uFFFD/u,
          `${label}[${index}] contains invalid text`,
        );
        if (
          typeof sourceValue[index] === "string" &&
          sourceScriptPattern.test(sourceValue[index])
        ) {
          assert.doesNotMatch(
            item,
            unexpectedPattern(locale),
            `${label}[${index}] contains script corruption in a source-language term`,
          );
        }
        assert.doesNotMatch(
          item,
          markerPattern,
          `${label}[${index}] contains a batch marker`,
        );
      });
      return;
    }
    assert.equal(
      localizedValue.length,
      sourceValue.length,
      `${label} array length changed`,
    );
    sourceValue.forEach((item, index) =>
      validateValue(
        item,
        localizedValue[index],
        `${label}[${index}]`,
        key,
        locale,
      ),
    );
    return;
  }

  if (sourceValue && typeof sourceValue === "object") {
    assert.ok(
      localizedValue && typeof localizedValue === "object",
      `${label} must remain an object`,
    );
    assert.deepEqual(
      Object.keys(localizedValue),
      Object.keys(sourceValue),
      `${label} object shape changed`,
    );
    for (const [childKey, childValue] of Object.entries(sourceValue)) {
      validateValue(
        childValue,
        localizedValue[childKey],
        `${label}.${childKey}`,
        childKey,
        locale,
      );
    }
    return;
  }

  assert.deepEqual(localizedValue, sourceValue, `${label} scalar changed`);
}

assert.deepEqual(
  Object.keys(generated.entries).toSorted(),
  Object.keys(source.entries).toSorted(),
  "the generated registry must cover every English content identity",
);

for (const [identity, sourceEntry] of Object.entries(source.entries)) {
  for (const locale of locales) {
    const localized = generated.entries[identity]?.[locale];
    assert.ok(localized, `${identity}.${locale} is missing`);
    validateValue(sourceEntry, localized, `${identity}.${locale}`, "", locale);
  }
}

console.log(
  `Validated ${Object.keys(source.entries).length} entries across ${locales.length} editorial locales`,
);
