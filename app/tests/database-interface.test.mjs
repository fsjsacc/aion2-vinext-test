import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const appRoot = path.join(root, "app");
const locales = ["zh-hant", "en", "ko"];
const siteLocales = [
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
const databaseTypes = ["items", "skills", "titles"];

async function walkSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkSourceFiles(absolutePath));
    } else if (/\.(?:ts|tsx)$/u.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function findSourceExporting(symbol) {
  const files = await walkSourceFiles(appRoot);
  const exportPattern = new RegExp(
    String.raw`\bexport\s+(?:const|function|class|type)\s+${symbol}\b`,
    "u",
  );

  for (const file of files) {
    const source = await readFile(file, "utf8");
    if (exportPattern.test(source)) return { file, source };
  }

  return null;
}

async function readDatabaseInterfaceSources() {
  const databaseRoots = [
    path.join(appRoot, "_components", "database"),
    path.join(appRoot, "[locale]", "database"),
  ];
  const files = [];

  for (const directory of databaseRoots) {
    files.push(...await walkSourceFiles(directory));
  }

  const appEntries = await readdir(appRoot, { withFileTypes: true });
  files.push(
    ...appEntries
      .filter(
        (entry) =>
          entry.isFile() &&
          /^database.*\.(?:ts|tsx)$/u.test(entry.name),
      )
      .map((entry) => path.join(appRoot, entry.name)),
  );

  const navigationModel = await findSourceExporting("databaseTypeDefinitions");
  if (navigationModel && !files.includes(navigationModel.file)) {
    files.push(navigationModel.file);
  }

  const chunks = await Promise.all(
    files.map(async (file) => `\n/* ${path.relative(root, file)} */\n${await readFile(file, "utf8")}`),
  );
  return { files, source: chunks.join("\n") };
}

function collectStrings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap(collectStrings);
}

function assertNonEmptyLocalizedRecord(value, label) {
  assert.ok(value && typeof value === "object", `${label} must be an object`);
  for (const locale of locales) {
    assert.equal(typeof value[locale], "string", `${label}.${locale} must be a string`);
    assert.ok(value[locale].trim(), `${label}.${locale} must not be empty`);
  }
}

test("database type navigation keeps only published datasets crawlable", async () => {
  const modelFile = await findSourceExporting("databaseTypeDefinitions");
  const copyFile = await findSourceExporting("databaseTypeNavigationCopy");
  const navFile = await findSourceExporting("DatabaseTypeNav");

  assert.ok(
    modelFile,
    "export databaseTypeDefinitions so future database sections share one route contract",
  );
  assert.ok(
    copyFile,
    "export databaseTypeNavigationCopy so the database navigation is localized",
  );
  assert.ok(
    navFile,
    "export a reusable DatabaseTypeNav rather than duplicating section navigation",
  );

  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const modelModule = await vite.ssrLoadModule(
      `/${path.relative(root, modelFile.file).replaceAll("\\", "/")}`,
    );
    const copyModule = copyFile.file === modelFile.file
      ? modelModule
      : await vite.ssrLoadModule(
        `/${path.relative(root, copyFile.file).replaceAll("\\", "/")}`,
      );
    const definitions = modelModule.databaseTypeDefinitions;
    const copy = copyModule.databaseTypeNavigationCopy;

    assert.ok(Array.isArray(definitions), "databaseTypeDefinitions must be an array");
    assert.deepEqual(
      definitions.map((entry) => entry.id),
      databaseTypes,
      "database navigation order must remain items, skills, titles",
    );

    const items = definitions.find((entry) => entry.id === "items");
    assert.equal(items.status, "live");
    assert.equal(
      items.href,
      "/database/",
      "the published item dataset needs one stable localized route",
    );

    for (const type of ["skills", "titles"]) {
      const entry = definitions.find((candidate) => candidate.id === type);
      assert.equal(entry.status, "planned", `${type} must remain planned until data exists`);
      assert.ok(
        entry.href === undefined || entry.href === null,
        `${type} must not expose a crawlable href before its dataset is published`,
      );
    }

    assert.ok(copy && typeof copy === "object", "databaseTypeNavigationCopy is missing");
    for (const locale of locales) {
      const strings = collectStrings(copy[locale]);
      assert.ok(strings.length >= 5, `${locale} navigation copy is incomplete`);
      assert.ok(strings.every((value) => value.trim()), `${locale} navigation copy has blanks`);
    }
  } finally {
    await vite.close();
  }

  assert.match(navFile.source, /\bdatabaseTypeDefinitions\b/u);
  assert.match(navFile.source, /\bdatabaseTypeNavigationCopy\b/u);
  assert.match(navFile.source, /\blocalizedHref\s*\(/u);
  assert.match(
    navFile.source,
    /\.filter\([\s\S]{0,120}status\s*===?\s*["']live["'][\s\S]{0,40}\)/u,
    "the public navigation must filter to released datasets before rendering links",
  );
  assert.doesNotMatch(
    navFile.source,
    /aria-disabled|data-planned|plannedLabel/u,
    "planned database types must stay out of the public navigation",
  );
});

test("database UI and item-detail chrome provide complete direct copy for every site locale", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const [catalogModule, detailModule, typeModule] = await Promise.all([
      vite.ssrLoadModule("/app/item-database-copy.ts"),
      vite.ssrLoadModule("/app/item-detail-copy.ts"),
      vite.ssrLoadModule("/app/database-type-registry.ts"),
    ]);
    const catalogCopy = catalogModule.itemDatabaseCatalogCopy;
    const detailCopy = detailModule.itemDetailCopy;
    const typeCopy = typeModule.databaseTypeNavigationCopy;
    const classDefinitions = typeModule.databaseClassDefinitions;

    for (const [label, record] of [
      ["itemDatabaseCatalogCopy", catalogCopy],
      ["itemDetailCopy", detailCopy],
      ["databaseTypeNavigationCopy", typeCopy],
    ]) {
      assert.deepEqual(
        Object.keys(record).sort(),
        [...siteLocales].sort(),
        `${label} must directly define all public locales`,
      );
    }

    for (const locale of siteLocales) {
      const catalog = catalogCopy[locale];
      const detail = detailCopy[locale];
      const navigation = typeCopy[locale];
      assert.ok(
        collectStrings(catalog).every((value) => value.trim()),
        `${locale} catalog copy contains a blank string`,
      );
      assert.ok(
        collectStrings(detail).every((value) => value.trim()),
        `${locale} item-detail copy contains a blank string`,
      );
      assert.ok(
        collectStrings(navigation).every((value) => value.trim()),
        `${locale} database navigation contains a blank string`,
      );
      assert.ok(catalog.resultsLabel(2).trim(), `${locale} result label is blank`);
      assert.ok(catalog.pageLabel(1, 2).trim(), `${locale} page label is blank`);
      assert.ok(catalog.itemImageAlt("Example", "Weapon").trim());
      assert.ok(detail.candidateHelp(2).trim(), `${locale} candidate help is blank`);
      assert.ok(detail.imageAlt("Example", "Weapon").trim());
      assert.ok(
        detail.seoDescription("Example", "1", "Rare", "Weapon").trim(),
        `${locale} item SEO description is blank`,
      );
      for (const definition of classDefinitions) {
        assert.ok(
          definition.labels[locale]?.trim(),
          `${definition.id}.${locale} class label is missing`,
        );
      }
    }
  } finally {
    await vite.close();
  }

  const [catalogComponent, detailComponent, navComponent, databasePage, detailPage] =
    await Promise.all([
      readFile(path.join(appRoot, "_components", "database", "ItemCatalog.tsx"), "utf8"),
      readFile(path.join(appRoot, "_components", "database", "OfficialItemDetail.tsx"), "utf8"),
      readFile(path.join(appRoot, "_components", "database", "DatabaseTypeNav.tsx"), "utf8"),
      readFile(path.join(appRoot, "[locale]", "database", "page.tsx"), "utf8"),
      readFile(
        path.join(appRoot, "[locale]", "database", "item", "[id]", "page.tsx"),
        "utf8",
      ),
    ]);
  assert.match(catalogComponent, /itemDatabaseCatalogCopy\[locale\]/u);
  assert.match(detailComponent, /itemDetailCopy\[locale\]/u);
  assert.match(navComponent, /databaseTypeNavigationCopy\[locale\]/u);
  assert.match(databasePage, /itemDatabaseCatalogCopy\[locale\]/u);
  assert.match(detailPage, /itemDetailCopy\[locale\]/u);
  assert.match(detailPage, /<LocalizationStatusNotice\s+locale=\{locale\}\s+compact\s*\/>/u);
});

test("item catalog exposes accessible search, filters, bookmarks, and SEO-safe state", async () => {
  const { source } = await readDatabaseInterfaceSources();

  assert.match(source, /type=["']search["']/u, "item search must use a search input");
  assert.match(
    source,
    /searchLabel|aria-label=\{[^}]*search|<label[\s\S]*type=["']search["']/u,
    "item search needs an accessible name",
  );
  const filterStatePatterns = {
    category:
      /categoryFilter|selectedCategory|filters?\.category|useState(?:<[^>]+>)?\([^)]*\)[\s\S]{0,100}\bcategory\b/iu,
    class:
      /classFilter|selectedClass(?:es)?|filters?\.class|useState(?:<[^>]+>)?\([^)]*\)[\s\S]{0,100}\bclass(?:es)?\b/iu,
    grade:
      /gradeFilter|selectedGrade(?:s)?|filters?\.grade|useState(?:<[^>]+>)?\([^)]*\)[\s\S]{0,100}\bgrade(?:s)?\b/iu,
  };
  for (const filter of ["category", "class", "grade"]) {
    assert.match(
      source,
      filterStatePatterns[filter],
      `item catalog must expose a ${filter} filter`,
    );
  }
  assert.match(
    source,
    /fetch\s*\(\s*["']\/api\/items["']/u,
    "catalog filters must use the same-origin paginated item API",
  );
  assert.match(
    source,
    /AbortController\s*\(/u,
    "stale catalog searches must be cancelled",
  );
  assert.match(
    source,
    /aria-busy=\{loading\}/u,
    "the results region must announce server-side loading",
  );
  assert.match(source, /aria-live=["']polite["']/u, "result counts need a polite live region");

  assert.match(
    source,
    /aion2kina:database:item-bookmarks:v1/u,
    "bookmark storage requires a stable versioned key",
  );
  assert.match(source, /localStorage\.getItem\s*\(/u, "bookmarks must restore locally");
  assert.match(source, /localStorage\.setItem\s*\(/u, "bookmark changes must persist locally");
  assert.match(
    source,
    /aria-pressed=\{[^}]*bookmark|aria-label=\{[^}]*bookmark/iu,
    "bookmark toggles must expose their state or action to assistive technology",
  );

  assert.match(source, /window\.location\.hash/u, "filter state must restore from the fragment");
  assert.match(source, /URLSearchParams\s*\(/u, "fragment filters need structured parsing");
  assert.match(
    source,
    /history\.(?:replaceState|pushState)\s*\(/u,
    "filter changes must update the fragment without navigation",
  );
  assert.match(source, /["']hashchange["']/u, "back/forward fragment changes must restore filters");
  assert.doesNotMatch(
    source,
    /new\s+URLSearchParams\s*\(\s*window\.location\.search|useSearchParams\s*\(/u,
    "catalog state must not create crawlable query-parameter combinations",
  );
});

test("mobile filters use an accessible drawer that closes with Escape", async () => {
  const { files, source } = await readDatabaseInterfaceSources();
  const cssFiles = (
    await Promise.all(
      [
        path.join(appRoot, "_components", "database"),
        path.join(appRoot, "[locale]", "database"),
      ].map(async (directory) => {
        const entries = await readdir(directory, { withFileTypes: true });
        return entries
          .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
          .map((entry) => path.join(directory, entry.name));
      }),
    )
  ).flat();
  const css = (
    await Promise.all(cssFiles.map((file) => readFile(file, "utf8")))
  ).join("\n");

  assert.ok(files.length > 0, "database interface sources are missing");
  assert.match(source, /aria-expanded=\{/u, "filter trigger must expose its open state");
  assert.match(source, /aria-controls=["'{]/u, "filter trigger must identify its drawer");
  assert.match(source, /role=["']dialog["']/u, "mobile filter panel must be a dialog");
  assert.match(
    source,
    /aria-label(?:ledby)?=["'{]/u,
    "the filter dialog must have an accessible name",
  );
  assert.match(
    source,
    /aria-labelledby=\{filterTitleId\}/u,
    "the filter dialog must use its visible heading as the accessible name",
  );
  assert.match(
    source,
    /filterCloseButtonRef\.current\?\.focus\(\)/u,
    "opening the filter dialog must move focus into it",
  );
  assert.match(
    source,
    /event\.key\s*!==?\s*["']Tab["']/u,
    "Tab handling must keep keyboard focus inside the open dialog",
  );
  assert.match(
    source,
    /drawer\.contains\(active\)/u,
    "the filter dialog must detect and redirect focus that starts outside it",
  );
  assert.match(source, /event\.key\s*===?\s*["']Escape["']/u, "Escape must close the drawer");
  assert.match(source, /addEventListener\s*\(\s*["']keydown["']/u);
  assert.match(css, /@media\s*\(max-width:\s*\d+px\)/u, "drawer needs a mobile breakpoint");
  assert.match(css, /position:\s*fixed/u, "mobile drawer must remain viewport anchored");
  assert.match(
    css,
    /overflow(?:-y)?:\s*auto/u,
    "long filter lists must remain usable on short screens",
  );
  assert.match(
    `${source}\n${css}`,
    /visibility:\s*hidden|\binert=\{|hidden=\{/u,
    "a closed off-canvas drawer must not retain focusable controls",
  );
});

test("database root stays localized and filter state stays outside canonical URLs", async () => {
  const pageSource = await readFile(
    path.join(appRoot, "[locale]", "database", "page.tsx"),
    "utf8",
  );
  const legacyRouteSource = await readFile(
    path.join(appRoot, "[locale]", "database", "items", "page.tsx"),
    "utf8",
  );
  const catalogSource = await readFile(
    path.join(appRoot, "_components", "database", "ItemCatalog.tsx"),
    "utf8",
  );

  assert.match(pageSource, /generateStaticParams\s*\(\)/u);
  assert.match(pageSource, /\bsiteLocales\.map\s*\(/u);
  assert.match(
    pageSource,
    /<DatabaseTypeNav\s+activeType=["']items["']\s+locale=\{locale\}\s*\/>/u,
    "the published item route must render the shared database navigation",
  );
  assert.match(pageSource, /localizedHref\(locale,\s*["']\/database\/["']\)/u);
  assert.match(pageSource, /buildStaticRouteMetadata\s*\(\s*\{/u);
  assert.match(pageSource, /path:\s*["']\/database\/["']/u);
  assert.doesNotMatch(
    pageSource,
    /const\s+canonical(?:Href)?\s*=\s*[^;\n]*(?:\?|#)/u,
    "canonical URLs must not include catalog state",
  );

  assert.match(
    catalogSource,
    /localizedHref\s*\([\s\S]{0,120}locale[\s\S]{0,120}`\/database\/\$\{item\.detailSlug\}\/`/u,
    "item detail links must preserve the selected locale",
  );
  assert.doesNotMatch(
    catalogSource,
    /itemDatabaseRecords/u,
    "the 10,910-row official catalog must not be imported into the client bundle",
  );
  assert.doesNotMatch(
    catalogSource,
    /href=\{[^}]*\?(?:q|query|category|class|grade)=/u,
    "filters must not create crawlable links",
  );
  assert.match(
    legacyRouteSource,
    /permanentRedirect\s*\(\s*localizedHref\(locale,\s*["']\/database\/["']\)\s*\)/u,
    "the legacy item route must permanently redirect to the canonical database root",
  );
});

test("the curated item dataset keeps twelve complete, stable records", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const {
      itemDatabaseContentEntries,
      itemDatabaseRecords,
    } = await vite.ssrLoadModule("/app/item-database-content.ts");

    assert.equal(itemDatabaseRecords.length, 12);
    assert.equal(itemDatabaseContentEntries.length, 12);
    assert.equal(new Set(itemDatabaseRecords.map((item) => item.id)).size, 12);
    assert.equal(new Set(itemDatabaseRecords.map((item) => item.slug)).size, 12);

    for (const item of itemDatabaseRecords) {
      assert.match(item.id, /^\d+$/u, `${item.id} must remain an official numeric ID`);
      assert.ok(
        item.slug.endsWith(`-${item.id}`),
        `${item.slug} must keep its stable official ID suffix`,
      );
      assert.match(item.snapshotDate, /^\d{4}-\d{2}-\d{2}$/u);
      assert.ok(item.icon.startsWith("https://"), `${item.id} icon must use HTTPS`);
      assertNonEmptyLocalizedRecord(item.names, `${item.id}.names`);
      assertNonEmptyLocalizedRecord(item.gradeNames, `${item.id}.gradeNames`);
      assertNonEmptyLocalizedRecord(item.categoryNames, `${item.id}.categoryNames`);
      assert.ok(item.flags && typeof item.flags === "object", `${item.id}.flags is missing`);
      assert.ok(Array.isArray(item.mainStats), `${item.id}.mainStats must be an array`);

      for (const locale of locales) {
        const officialUrl = new URL(item.officialUrls[locale]);
        assert.equal(officialUrl.protocol, "https:");
        assert.ok(
          officialUrl.hostname.endsWith("ncsoft.com") ||
            officialUrl.hostname.endsWith("plaync.com"),
          `${item.id}.${locale} must retain an official source`,
        );
      }

      const entry = itemDatabaseContentEntries.find(
        (candidate) => candidate.slug === item.slug,
      );
      assert.ok(entry, `${item.slug} needs one matching detail entry`);
      assert.equal(entry.section, "database");
      assert.deepEqual(entry.properties?.item, item);
    }
  } finally {
    await vite.close();
  }
});

test("database roots expose twelve localized canonical item links in server HTML", async () => {
  const pageSource = await readFile(
    path.join(appRoot, "[locale]", "database", "page.tsx"),
    "utf8",
  );
  const pageCss = await readFile(
    path.join(
      appRoot,
      "[locale]",
      "database",
      "items",
      "ItemDatabasePage.module.css",
    ),
    "utf8",
  );

  assert.match(
    pageSource,
    /import\s+\{\s*AnalyticsLink\s*\}\s+from\s+["']@\/app\/map-app\/AnalyticsLink["']/u,
    "featured item links must retain the existing analytics-aware anchor",
  );
  assert.match(
    pageSource,
    /itemDatabaseRecords\.map\s*\(\s*\(item,\s*index\)\s*=>/u,
    "all twelve curated records must be linked from every localized database root",
  );
  assert.match(
    pageSource,
    /href=\{localizedHref\(locale,\s*`\/database\/\$\{item\.slug\}\/`\)\}/u,
    "featured links must use each curated page's localized canonical URL",
  );
  assert.match(pageSource, /eventName=["']content_card_click["']/u);
  assert.match(pageSource, /surface:\s*["']content-hub["']/u);
  assert.match(pageSource, /target_kind:\s*["']item["']/u);
  assert.match(
    pageSource,
    /target_key:\s*item\.id/u,
    "item analytics must use the official numeric ID required by the event contract",
  );
  assert.match(
    pageSource,
    /itemDatabaseCatalogCopy\[locale\]/u,
    "featured item chrome must use the direct site-locale copy",
  );
  assert.match(pageCss, /\.featuredGrid\s*\{/u);
  assert.match(
    pageCss,
    /@media\s*\(max-width:\s*620px\)[\s\S]*?\.featuredGrid\s*\{\s*grid-template-columns:\s*1fr/u,
    "featured item links must collapse to one touch-friendly column on phones",
  );
});

test("the official item bootstrap records the complete validated catalog", async () => {
  const bootstrap = JSON.parse(
    await readFile(path.join(appRoot, "item-catalog-bootstrap.json"), "utf8"),
  );

  assert.equal(bootstrap.schemaVersion, 1);
  assert.equal(bootstrap.publisher, "NCSOFT");
  assert.equal(bootstrap.total, 10_910);
  assert.match(bootstrap.versionKey, /^sha256-[0-9a-f]{64}$/u);
  assert.match(bootstrap.checksum, /^[0-9a-f]{64}$/u);
  assert.match(bootstrap.snapshotDate, /^\d{4}-\d{2}-\d{2}$/u);

  for (const locale of locales) {
    assert.equal(
      bootstrap.itemsByLocale[locale].length,
      20,
      `${locale} bootstrap must contain exactly one server page`,
    );
    assert.equal(
      bootstrap.facetsByLocale[locale].grades.reduce(
        (total, facet) => total + facet.count,
        0,
      ),
      bootstrap.total,
      `${locale} grade facets must reconcile to the official total`,
    );
    assert.equal(
      bootstrap.facetsByLocale[locale].categories.reduce(
        (total, facet) => total + facet.count,
        0,
      ),
      bootstrap.total,
      `${locale} category facets must reconcile to the official total`,
    );
  }
});
