import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import { createContentReleaseSnapshot } from "../scripts/content/release.mjs";

const root = path.resolve(import.meta.dirname, "..");
const locales = ["zh-hant", "en", "ko"];
const baseClassSlugs = [
  "gladiator",
  "templar",
  "assassin",
  "ranger",
  "sorcerer",
  "spiritmaster",
  "cleric",
  "chanter",
];
const recentOfficialNewsSlugs = [
  "chalice-of-muspel-sanctuary-update",
  "mirror-of-scarlet-desire-update",
  "corroded-decontamination-cross-faction-pve",
  "sunken-temple-100-day-update",
  "cradle-of-nihility-soul-fuse-update",
];
const difficultyMetricKeys = [
  "inputs",
  "positioning",
  "resourceManagement",
  "partyResponsibility",
  "errorRecovery",
];

function assertNonEmptyString(value, label) {
  assert.equal(typeof value, "string", `${label} must be a string`);
  assert.ok(value.trim().length > 0, `${label} must not be empty`);
}

function assertUnique(values, label) {
  assert.equal(
    new Set(values).size,
    values.length,
    `${label} must contain no duplicates`,
  );
}

function assertLocalizedStrings(value, label) {
  assert.ok(value && typeof value === "object", `${label} must be an object`);
  for (const locale of locales) {
    assertNonEmptyString(value[locale], `${label}.${locale}`);
  }
}

function assertNullableLocalizedStrings(value, label) {
  if (value === null) return;
  assertLocalizedStrings(value, label);
}

function assertNullableNumber(value, label) {
  assert.ok(
    value === null || (typeof value === "number" && Number.isFinite(value)),
    `${label} must be a finite number or null`,
  );
}

function assertNullableBoolean(value, label) {
  assert.ok(
    value === null || typeof value === "boolean",
    `${label} must be a boolean or null`,
  );
}

function assertLocalizedContentComplete(entry) {
  for (const locale of locales) {
    const copy = entry.translations?.[locale];
    assert.ok(copy && typeof copy === "object", `${entry.slug}.${locale} copy is missing`);

    for (const field of [
      "eyebrow",
      "title",
      "description",
      "intro",
      "byline",
      "backLabel",
      "contentsLabel",
      "publishedLabel",
      "updatedLabel",
      "readingTime",
      "relatedLabel",
      "sourceNote",
    ]) {
      assertNonEmptyString(copy[field], `${entry.slug}.${locale}.${field}`);
    }

    assert.ok(
      Array.isArray(copy.sections) && copy.sections.length > 0,
      `${entry.slug}.${locale} must include content sections`,
    );
    for (const [sectionIndex, section] of copy.sections.entries()) {
      const label = `${entry.slug}.${locale}.sections[${sectionIndex}]`;
      assertNonEmptyString(section.id, `${label}.id`);
      assertNonEmptyString(section.title, `${label}.title`);
      assert.ok(
        Array.isArray(section.paragraphs) && section.paragraphs.length > 0,
        `${label}.paragraphs must not be empty`,
      );
      for (const [paragraphIndex, paragraph] of section.paragraphs.entries()) {
        assertNonEmptyString(paragraph, `${label}.paragraphs[${paragraphIndex}]`);
      }
      for (const [linkIndex, link] of (section.links ?? []).entries()) {
        const linkLabel = `${label}.links[${linkIndex}]`;
        for (const field of [
          "id",
          "href",
          "label",
          "description",
          "mapSlug",
          "filterSubtype",
        ]) {
          assertNonEmptyString(link[field], `${linkLabel}.${field}`);
        }
        assert.doesNotThrow(
          () => new URL(link.href, "https://aion2kina.com"),
          `${linkLabel}.href must be valid`,
        );
      }
    }

    assertNonEmptyString(
      entry.heroImage?.translations?.[locale]?.alt,
      `${entry.slug}.heroImage.${locale}.alt`,
    );
  }

  assert.ok(
    Array.isArray(entry.sources) && entry.sources.length > 0,
    `${entry.slug} must include sources`,
  );
  for (const [sourceIndex, source] of entry.sources.entries()) {
    const label = `${entry.slug}.sources[${sourceIndex}]`;
    for (const field of [
      "id",
      "kind",
      "publisher",
      "label",
      "url",
      "retrievedAt",
      "verifiedAt",
    ]) {
      assertNonEmptyString(source[field], `${label}.${field}`);
    }
    assert.equal(source.kind, "official", `${label} must be an official source`);
    assert.doesNotThrow(() => new URL(source.url), `${label}.url must be valid`);
  }
}

function visibleContentText(copy) {
  return [
    copy.title,
    copy.intro,
    ...copy.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.steps ?? []).flatMap((step) => [step.title, step.description]),
    ]),
  ].join(" ");
}

function countExactPhrase(value, phrase) {
  if (!phrase) return 0;
  return value.toLocaleLowerCase().split(phrase.toLocaleLowerCase()).length - 1;
}

test("published guides keep the title topic primary and meet the detailed-content floor", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const { contentRegistry } = await vite.ssrLoadModule("/app/content-registry.ts");
    const guides = contentRegistry.filter((entry) => entry.section === "guides");
    assert.ok(guides.length >= 23, "the published guide catalog unexpectedly shrank");

    for (const entry of guides) {
      const sectionIdsByLocale = [];
      for (const locale of locales) {
        const copy = entry.translations[locale];
        assert.ok(
          copy.sections.length >= 4,
          `${entry.slug}.${locale} must expose at least four useful sections`,
        );
        assertNonEmptyString(
          copy.keywords?.[0],
          `${entry.slug}.${locale} primary keyword`,
        );
        assert.ok(
          copy.title.toLocaleLowerCase().includes(copy.keywords[0].toLocaleLowerCase()),
          `${entry.slug}.${locale} H1 must contain its primary keyword`,
        );
        const ids = copy.sections.map((section) => section.id);
        assertUnique(ids, `${entry.slug}.${locale} section IDs`);
        sectionIdsByLocale.push(ids);
      }
      assert.deepEqual(
        sectionIdsByLocale[1],
        sectionIdsByLocale[0],
        `${entry.slug} English and Traditional Chinese section structure must align`,
      );
      assert.deepEqual(
        sectionIdsByLocale[2],
        sectionIdsByLocale[0],
        `${entry.slug} Korean and Traditional Chinese section structure must align`,
      );
    }

    const registration = guides.find(
      (entry) => entry.slug === "global-pre-registration",
    );
    assert.ok(registration, "global pre-registration guide is missing");
    assert.equal(registration.updatedAt, "2026-07-26");
    assert.equal(registration.readingMinutes, 10);
    assert.equal(registration.sources.length, 3);
    assert.equal(registration.properties?.reportService, "global");

    for (const locale of locales) {
      const copy = registration.translations[locale];
      assert.equal(copy.sections.length, 9);
      const visibleText = visibleContentText(copy);
      const primaryCount = countExactPhrase(visibleText, copy.keywords[0]);
      assert.ok(
        primaryCount >= 3,
        `${locale} primary pre-registration phrase must recur naturally`,
      );
      for (const secondary of copy.keywords.slice(1)) {
        assert.ok(
          primaryCount > countExactPhrase(visibleText, secondary),
          `${locale} primary pre-registration phrase must outrank ${secondary}`,
        );
      }
    }
  } finally {
    await vite.close();
  }
});

function assertItemRecordComplete(item) {
  assertNonEmptyString(item.id, "item.id");
  assertNonEmptyString(item.slug, `${item.id}.slug`);
  assertLocalizedStrings(item.names, `${item.id}.names`);
  assertNonEmptyString(item.icon, `${item.id}.icon`);
  assert.doesNotThrow(() => new URL(item.icon), `${item.id}.icon must be a valid URL`);

  assert.ok(
    Object.prototype.hasOwnProperty.call(item, "gradeCode"),
    `${item.id}.gradeCode must be explicit`,
  );
  assert.ok(
    item.gradeCode === null ||
      (typeof item.gradeCode === "string" && item.gradeCode.trim().length > 0),
    `${item.id}.gradeCode must be a non-empty string or null`,
  );
  assertLocalizedStrings(item.gradeNames, `${item.id}.gradeNames`);
  assertLocalizedStrings(item.categoryNames, `${item.id}.categoryNames`);
  assertNullableLocalizedStrings(item.descriptions, `${item.id}.descriptions`);
  assertNullableLocalizedStrings(item.effects, `${item.id}.effects`);
  assertNullableLocalizedStrings(item.acquisition, `${item.id}.acquisition`);

  assert.ok(
    item.itemType === null ||
      (typeof item.itemType === "string" && item.itemType.trim().length > 0),
    `${item.id}.itemType must be a non-empty string or null`,
  );
  for (const field of [
    "itemLevel",
    "equipLevel",
    "maxEnchantLevel",
    "maxExceedEnchantLevel",
    "magicStoneSlots",
    "godStoneSlots",
  ]) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(item, field),
      `${item.id}.${field} must be explicit`,
    );
    assertNullableNumber(item[field], `${item.id}.${field}`);
  }

  for (const field of [
    "storable",
    "tradable",
    "personalTradable",
    "enchantable",
    "decomposable",
  ]) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(item.flags, field),
      `${item.id}.flags.${field} must be explicit`,
    );
    assertNullableBoolean(item.flags[field], `${item.id}.flags.${field}`);
  }

  for (const field of ["raceNames", "classNames"]) {
    for (const locale of locales) {
      assert.ok(
        Array.isArray(item[field][locale]),
        `${item.id}.${field}.${locale} must be an array`,
      );
      for (const [index, value] of item[field][locale].entries()) {
        assertNonEmptyString(value, `${item.id}.${field}.${locale}[${index}]`);
      }
    }
  }

  assert.ok(Array.isArray(item.mainStats), `${item.id}.mainStats must be an array`);
  for (const [index, stat] of item.mainStats.entries()) {
    const label = `${item.id}.mainStats[${index}]`;
    assertNonEmptyString(stat.id, `${label}.id`);
    assertLocalizedStrings(stat.names, `${label}.names`);
    assert.ok(
      Object.prototype.hasOwnProperty.call(stat, "minValue") &&
        Object.prototype.hasOwnProperty.call(stat, "value"),
      `${label} nullable values must be explicit`,
    );
    for (const field of ["minValue", "value"]) {
      assert.ok(
        stat[field] === null ||
          (typeof stat[field] === "string" && stat[field].trim().length > 0),
        `${label}.${field} must be a non-empty string or null`,
      );
    }
    assert.ok(
      stat.minValue !== null || stat.value !== null,
      `${label} must include at least one measured value`,
    );
  }

  assertLocalizedStrings(item.officialUrls, `${item.id}.officialUrls`);
  for (const locale of locales) {
    const url = new URL(item.officialUrls[locale]);
    assert.equal(url.protocol, "https:", `${item.id}.${locale} source must use HTTPS`);
    assert.ok(
      url.hostname === "tw.ncsoft.com" ||
        url.hostname === "aion2.plaync.com" ||
        url.hostname === "api-goats.plaync.com",
      `${item.id}.${locale} source must use an official NCSOFT/PLAYNC host`,
    );
  }
  assertNonEmptyString(item.snapshotDate, `${item.id}.snapshotDate`);
}

test("item database and class guide expansion stays complete across registry, search, and release", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const itemModule = await vite.ssrLoadModule("/app/item-database-content.ts");
    const classModule = await vite.ssrLoadModule("/app/class-guide-content.ts");
    const newsModule = await vite.ssrLoadModule("/app/recent-official-news-content.ts");
    const registryModule = await vite.ssrLoadModule("/app/content-registry.ts");
    const searchModule = await vite.ssrLoadModule("/app/search-index.ts");

    const {
      itemDatabaseCatalogCopy,
      itemDatabaseContentEntries,
      itemDatabaseRecords,
    } = itemModule;
    const { classDifficultyProfiles, classGuideContentEntries } = classModule;
    const { recentOfficialNewsContentEntries } = newsModule;
    const { contentRegistry } = registryModule;
    const { searchSite } = searchModule;

    for (const entry of contentRegistry) {
      for (const locale of locales) {
        assert.equal(
          entry.translations[locale].byline,
          "PFG",
          `${entry.section}/${entry.slug}.${locale} must use the public PFG byline`,
        );
      }
    }

    assert.equal(itemDatabaseRecords.length, 12, "the catalog must contain 12 items");
    assert.equal(
      itemDatabaseContentEntries.length,
      12,
      "each catalog item must have one content entry",
    );
    assertUnique(itemDatabaseRecords.map((item) => item.id), "item IDs");
    assertUnique(itemDatabaseRecords.map((item) => item.slug), "item slugs");
    assertUnique(itemDatabaseRecords.map((item) => item.icon), "item icons");
    assertUnique(
      itemDatabaseRecords.flatMap((item) =>
        locales.map((locale) => item.officialUrls[locale]),
      ),
      "item official source URLs",
    );

    for (const item of itemDatabaseRecords) {
      assertItemRecordComplete(item);
      const entry = itemDatabaseContentEntries.find(
        (candidate) => candidate.slug === item.slug,
      );
      assert.ok(entry, `${item.slug} content entry is missing`);
      assert.equal(entry.section, "database");
      assert.ok(
        entry.properties &&
          Object.keys(entry.properties).length > 0 &&
          entry.properties.item,
        `${item.slug} must expose non-empty item properties`,
      );
      assert.deepEqual(entry.properties.item, item);
      assertLocalizedContentComplete(entry);

      const registered = contentRegistry.find(
        (candidate) =>
          candidate.section === "database" && candidate.slug === item.slug,
      );
      assert.ok(registered, `database/${item.slug} is missing from the registry`);
      assert.deepEqual(registered.properties?.item, item);
    }

    for (const locale of locales) {
      const copy = itemDatabaseCatalogCopy[locale];
      assert.ok(copy, `item catalog copy is missing ${locale}`);
      for (const [key, value] of Object.entries(copy)) {
        if (Array.isArray(value)) {
          assert.ok(value.length > 0, `${locale}.${key} must not be empty`);
          for (const [index, item] of value.entries()) {
            assertNonEmptyString(item, `${locale}.${key}[${index}]`);
          }
        } else if (typeof value === "function") {
          assert.equal(typeof value, "function", `${locale}.${key} must be a function`);
          const args = key === "pageLabel"
            ? [1, 2]
            : key === "resultsLabel"
              ? [12]
              : ["Example item"];
          assertNonEmptyString(value(...args), `${locale}.${key}(sample)`);
        } else {
          assertNonEmptyString(value, `${locale}.${key}`);
        }
      }
    }

    assert.equal(
      classDifficultyProfiles.length,
      9,
      "difficulty comparison must include nine class profiles",
    );
    assertUnique(
      classDifficultyProfiles.map((profile) => profile.classId),
      "class profile IDs",
    );
    assertUnique(
      classDifficultyProfiles.map((profile) => profile.routeSlug),
      "class profile route slugs",
    );
    for (const profile of classDifficultyProfiles) {
      assert.equal(profile.basis, "editorial-assessment");
      assert.equal(profile.assessment?.basis, "editorial-assessment");
      assert.equal(
        profile.assessment?.notStrengthOrTier,
        true,
        `${profile.classId} must declare that difficulty is not a tier or power conclusion`,
      );
      assert.deepEqual(
        Object.keys(profile.metrics).sort(),
        [...difficultyMetricKeys].sort(),
        `${profile.classId} must expose exactly the five difficulty dimensions`,
      );
      for (const metric of difficultyMetricKeys) {
        assert.ok(
          Number.isInteger(profile.metrics[metric]) &&
            profile.metrics[metric] >= 1 &&
            profile.metrics[metric] <= 5,
          `${profile.classId}.${metric} must be an integer from 1 to 5`,
        );
      }
      assertLocalizedStrings(profile.names, `${profile.classId}.names`);
      for (const forbiddenKey of ["tier", "power", "strength", "damageRank", "winRate"]) {
        assert.equal(
          Object.prototype.hasOwnProperty.call(profile, forbiddenKey),
          false,
          `${profile.classId} must not publish ${forbiddenKey} as a difficulty conclusion`,
        );
      }
    }

    for (const slug of [...baseClassSlugs, "difficulty-comparison"]) {
      assert.ok(
        classGuideContentEntries.some(
          (entry) => entry.section === "classes" && entry.slug === slug,
        ),
        `classes/${slug} is missing from class guide content`,
      );
      assert.ok(
        contentRegistry.some(
          (entry) => entry.section === "classes" && entry.slug === slug,
        ),
        `classes/${slug} is missing from the registry`,
      );
    }
    assert.equal(
      baseClassSlugs.filter((slug) =>
        classGuideContentEntries.some((entry) => entry.slug === slug),
      ).length,
      8,
      "all eight base class guide pages must be registered",
    );
    for (const entry of classGuideContentEntries) {
      assertLocalizedContentComplete(entry);
    }

    const trendClassSections = {
      gladiator: ["gladiator-arcana-selection"],
      assassin: ["assassin-arcana-selection"],
      ranger: ["ranger-skill-tree-priority"],
      sorcerer: ["sorcerer-versioned-build", "sorcerer-skill-priority"],
    };
    for (const [slug, sectionIds] of Object.entries(trendClassSections)) {
      const entry = classGuideContentEntries.find(
        (candidate) => candidate.slug === slug,
      );
      assert.ok(entry, `classes/${slug} trend enhancement is missing`);
      assert.equal(entry.updatedAt, "2026-07-26");
      assert.ok(
        entry.sources.some((source) => source.id === "official-combat-overview"),
        `${slug} must cite the official combat overview`,
      );
      if (slug === "gladiator" || slug === "assassin") {
        assert.ok(
          entry.sources.some(
            (source) => source.id === "official-arcana-update",
          ),
          `${slug} Arcana method must cite the official Arcana update`,
        );
      }
      for (const locale of locales) {
        const ids = entry.translations[locale].sections.map(
          (section) => section.id,
        );
        for (const sectionId of sectionIds) {
          assert.ok(
            ids.includes(sectionId),
            `${slug}.${locale} must include ${sectionId}`,
          );
        }
        const trendText = visibleContentText(entry.translations[locale]);
        assert.match(
          trendText,
          /2026(?:年|년|-).*7(?:月|월|-).*26|July 26, 2026|26(?:\.| de)?\s+(?:juillet|Juli|julio|julho|июля)(?:\s+de)?\s+2026/iu,
          `${slug}.${locale} must expose a dated build boundary`,
        );
      }
    }

    const characterCreationEntry = contentRegistry.find(
      (entry) =>
        entry.section === "guides" &&
        entry.slug === "character-presets-style-shop",
    );
    assert.ok(characterCreationEntry, "character creation guide is missing");
    for (const locale of locales) {
      assert.match(
        `${characterCreationEntry.translations[locale].title} ${characterCreationEntry.translations[locale].intro}`,
        /Character Creation|角色創建|캐릭터 생성/u,
        `character creation intent must lead ${locale} title and intro`,
      );
    }

    const monetizationEntry = contentRegistry.find(
      (entry) =>
        entry.section === "guides" &&
        entry.slug === "global-monetization-watchlist",
    );
    assert.ok(monetizationEntry, "free-to-play guide is missing");
    assert.equal(monetizationEntry.updatedAt, "2026-07-26");
    for (const locale of locales) {
      const section = monetizationEntry.translations[locale].sections.find(
        (candidate) => candidate.id === "pay-to-win-assessment",
      );
      assert.ok(section, `monetization.${locale} needs an answer-first P2W section`);
      assert.match(
        `${section.title} ${section.paragraphs[0]}`,
        /Pay-to-Win|pay-to-win/u,
      );
    }

    assert.equal(
      recentOfficialNewsContentEntries.length,
      recentOfficialNewsSlugs.length,
      "all researched official-news entries must be exported",
    );
    assertUnique(
      recentOfficialNewsContentEntries.map((entry) => entry.slug),
      "recent official news slugs",
    );
    for (const slug of recentOfficialNewsSlugs) {
      const entry = recentOfficialNewsContentEntries.find(
        (candidate) => candidate.slug === slug,
      );
      assert.ok(entry, `news/${slug} is missing from the news expansion`);
      assert.equal(entry.section, "news");
      assert.equal(entry.schemaType, "NewsArticle");
      assert.equal(entry.heroImage?.width, 800);
      assert.equal(entry.heroImage?.height, 420);
      assert.equal(entry.heroImage?.rights, "linked-official-media");
      assertLocalizedContentComplete(entry);

      for (const source of entry.sources) {
        assert.equal(source.retrievedAt, "2026-07-21");
        assert.equal(source.verifiedAt, "2026-07-21");
      }
      for (const locale of locales) {
        assert.ok(
          entry.translations[locale].sections.length >= 3,
          `${slug}.${locale} must include at least three substantial sections`,
        );
        assert.ok(
          entry.translations[locale].sections.every(
            (section) => section.paragraphs.length >= 2,
          ),
          `${slug}.${locale} sections must include at least two paragraphs`,
        );
      }

      const zhText = JSON.stringify(entry.translations["zh-hant"]);
      const enText = JSON.stringify(entry.translations.en);
      const koText = JSON.stringify(entry.translations.ko);
      assert.match(zhText, /全球版/);
      assert.match(zhText, /歷史|已過去|已結束/);
      assert.match(enText, /global/i);
      assert.match(enText, /historical|already passed|ended/i);
      assert.match(koText, /글로벌/);
      assert.match(koText, /과거|지난|종료/);

      assert.ok(
        contentRegistry.some(
          (candidate) =>
            candidate.section === "news" && candidate.slug === slug,
        ),
        `news/${slug} is missing from the registry`,
      );
    }

    for (const item of itemDatabaseRecords) {
      for (const locale of locales) {
        assert.ok(
          (await searchSite(locale, item.names[locale])).some(
            (result) => result.id === `content:database:${item.slug}`,
          ),
          `${locale} search must find ${item.slug} by localized item name`,
        );
      }
      assert.ok(
        (await searchSite("en", item.id)).some(
          (result) => result.id === `content:database:${item.slug}`,
        ),
        `search must find ${item.slug} by official item ID ${item.id}`,
      );
    }
    for (const profile of classDifficultyProfiles) {
      for (const locale of locales) {
        assert.ok(
          (await searchSite(locale, profile.names[locale])).some(
            (result) => result.id === `content:classes:${profile.routeSlug}`,
          ),
          `${locale} search must find ${profile.routeSlug} by localized class name`,
        );
      }
    }

    const snapshot = await createContentReleaseSnapshot({
      root,
      entries: contentRegistry,
      asOfDate: "2026-09-16",
    });
    for (const entry of [
      ...itemDatabaseContentEntries,
      ...classGuideContentEntries,
    ]) {
      const snapshotEntry = snapshot.entries.find(
        (candidate) =>
          candidate.contentKey === `${entry.section}/${entry.slug}`,
      );
      assert.ok(
        snapshotEntry,
        `${entry.section}/${entry.slug} is missing from the release snapshot`,
      );
      assert.deepEqual(
        snapshotEntry.properties,
        entry.properties,
        `${entry.section}/${entry.slug} properties must survive the release snapshot`,
      );
    }
  } finally {
    await vite.close();
  }
});
