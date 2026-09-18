import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..", "..");

const SITE_LOCALES = ["zh-hant", "en", "ko"];
const API_LOCALES = {
  "zh-hant": "zh-TW",
  en: "en-US",
  ko: "ko-KR",
};
const API_BASES = {
  "zh-hant": "https://tw.ncsoft.com/aion2_tw/v2.0",
  en: "https://api-goats.plaync.com/aion2/v2.0",
  ko: "https://api-goats.plaync.com/aion2/v2.0",
};
const GRADE_RANK = {
  Common: 1,
  Rare: 2,
  Legend: 3,
  Unique: 4,
  Epic: 5,
};
const CLASS_IDS = {
  Gladiator: "gladiator",
  Templar: "templar",
  Assassin: "assassin",
  Ranger: "ranger",
  Sorcerer: "sorcerer",
  Elementalist: "spiritmaster",
  Cleric: "cleric",
  Chanter: "chanter",
  Fighter: "brawler",
};
const FALLBACK_LABELS = {
  "zh-hant": { category: "未分類", grade: "未知" },
  en: { category: "Unclassified", grade: "Unknown" },
  ko: { category: "미분류", grade: "알 수 없음" },
};
const DEFAULT_OUTPUT = path.join(root, "data", "items", "official-catalog.json");
const DEFAULT_BOOTSTRAP = path.join(root, "app", "item-catalog-bootstrap.json");
const DEFAULT_CACHE = path.join(root, "data", "items", "cache");
const PAGE_SIZE = 1_000;
const REQUEST_INTERVAL_MS = 225;
const USER_AGENT = "AION2KINA-Official-Catalog/1.0 (+https://aion2kina.com)";

function parseArguments(argv) {
  const options = {
    output: DEFAULT_OUTPUT,
    bootstrap: DEFAULT_BOOTSTRAP,
    cacheDirectory: DEFAULT_CACHE,
    force: false,
    skipClasses: false,
    skipCategories: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--force") options.force = true;
    else if (argument === "--skip-classes") options.skipClasses = true;
    else if (argument === "--skip-categories") options.skipCategories = true;
    else if (argument === "--output") {
      options.output = path.resolve(root, argv[++index]);
    } else if (argument === "--bootstrap") {
      options.bootstrap = path.resolve(root, argv[++index]);
    } else if (argument === "--cache-dir") {
      options.cacheDirectory = path.resolve(root, argv[++index]);
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return options;
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

let requestQueue = Promise.resolve();
async function waitForRequestSlot() {
  const previous = requestQueue;
  let release;
  requestQueue = new Promise((resolve) => {
    release = resolve;
  });
  await previous;
  await sleep(REQUEST_INTERVAL_MS);
  release();
}

function cacheKey(value) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_.-]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .slice(0, 180);
}

async function writeJsonAtomic(file, value, pretty = false) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(
    temporary,
    `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`,
    "utf8",
  );
  await rename(temporary, file);
}

async function fetchJson(url, label) {
  let lastError;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      await waitForRequestSlot();
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          referer: "https://tw.ncsoft.com/aion2/info/item",
          "user-agent": USER_AGENT,
        },
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) {
        const retryAfter = Number(response.headers.get("retry-after") ?? "0");
        if (response.status === 429 || response.status >= 500) {
          await sleep(Math.max(retryAfter * 1_000, 600 * 2 ** attempt));
          continue;
        }
        throw new Error(`${label} returned HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < 5) await sleep(600 * 2 ** attempt);
    }
  }
  throw new Error(`${label} failed after retries: ${lastError?.message ?? lastError}`);
}

async function fetchJsonCached(options, key, url) {
  const file = path.join(options.cacheDirectory, `${cacheKey(key)}.json`);
  if (!options.force) {
    try {
      return JSON.parse(await readFile(file, "utf8"));
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  const result = await fetchJson(url, key);
  await writeJsonAtomic(file, result);
  return result;
}

function apiUrl(locale, pathname, parameters = {}) {
  const url = new URL(`${API_BASES[locale]}${pathname}`);
  url.search = new URLSearchParams({
    locale: API_LOCALES[locale],
    ...parameters,
  }).toString();
  return url;
}

async function mapLimit(values, limit, worker) {
  const results = new Array(values.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(values[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

function assertListResponse(value, label) {
  if (
    !value ||
    !Array.isArray(value.contents) ||
    !value.pagination ||
    !Number.isInteger(value.pagination.total)
  ) {
    throw new Error(`${label} did not return the official list schema`);
  }
}

async function fetchPartition(options, locale, partitionKey, parameters) {
  const firstKey = `${locale}-${partitionKey}-page-1`;
  const firstUrl = apiUrl(locale, "/dict/search/item", {
    size: String(PAGE_SIZE),
    page: "1",
    ...parameters,
  });
  const first = await fetchJsonCached(options, firstKey, firstUrl);
  assertListResponse(first, firstKey);
  if (first.pagination.total > first.pagination.limit) {
    throw new Error(
      `${firstKey} exceeds official limit ${first.pagination.limit}; add a finer partition`,
    );
  }

  const pageCount = Math.ceil(first.pagination.total / PAGE_SIZE);
  const remainingPages = Array.from(
    { length: Math.max(0, pageCount - 1) },
    (_, index) => index + 2,
  );
  const remaining = await mapLimit(remainingPages, 2, async (page) => {
    const key = `${locale}-${partitionKey}-page-${page}`;
    const result = await fetchJsonCached(
      options,
      key,
      apiUrl(locale, "/dict/search/item", {
        size: String(PAGE_SIZE),
        page: String(page),
        ...parameters,
      }),
    );
    assertListResponse(result, key);
    return result;
  });

  const contents = [
    ...first.contents,
    ...remaining.flatMap((page) => page.contents),
  ];
  if (contents.length !== first.pagination.total) {
    throw new Error(
      `${locale}/${partitionKey} expected ${first.pagination.total}, received ${contents.length}`,
    );
  }
  return {
    contents,
    total: first.pagination.total,
    limit: first.pagination.limit,
  };
}

async function fetchMetadata(options, locale) {
  const [grades, categories, classes, totalProbe] = await Promise.all([
    fetchJsonCached(
      options,
      `${locale}-meta-grades`,
      apiUrl(locale, "/game/item/grade"),
    ),
    fetchJsonCached(
      options,
      `${locale}-meta-categories`,
      apiUrl(locale, "/game/item/category"),
    ),
    fetchJsonCached(
      options,
      `${locale}-meta-classes`,
      apiUrl(locale, "/game/character/class"),
    ),
    fetchJsonCached(
      options,
      `${locale}-total`,
      apiUrl(locale, "/dict/search/item", { size: "1", page: "1" }),
    ),
  ]);
  assertListResponse(totalProbe, `${locale}-total`);
  if (!Array.isArray(grades) || !Array.isArray(categories) || !Array.isArray(classes)) {
    throw new Error(`${locale} metadata did not return arrays`);
  }
  return {
    grades,
    categories,
    classes,
    total: totalProbe.pagination.total,
    limit: totalProbe.pagination.limit,
  };
}

async function fetchLocaleItems(options, locale, metadata) {
  const partitions = [];
  for (const grade of metadata.grades) {
    const result = await fetchPartition(
      options,
      locale,
      `grade-${grade.id}`,
      { grades: grade.id },
    );
    partitions.push({ grade: grade.id, ...result });
  }

  const sum = partitions.reduce((total, partition) => total + partition.total, 0);
  if (sum !== metadata.total) {
    throw new Error(
      `${locale} grade partitions total ${sum}, official total is ${metadata.total}`,
    );
  }

  const byId = new Map();
  for (const partition of partitions) {
    for (const item of partition.contents) {
      const id = String(item.id);
      if (byId.has(id)) {
        throw new Error(`${locale} item ${id} appeared in more than one grade partition`);
      }
      byId.set(id, item);
    }
  }
  if (byId.size !== metadata.total) {
    throw new Error(
      `${locale} has ${byId.size} unique IDs, expected ${metadata.total}`,
    );
  }
  return byId;
}

async function fetchCategoryMembership(options, metadata) {
  const assignments = new Map();
  const categoryEntries = metadata.categories.flatMap((parent) =>
    (parent.child ?? []).map((child) => ({
      category1Code: parent.id,
      category2Code: child.id,
    })),
  );

  if (options.skipCategories) return assignments;
  // Some official rows belong to a published top-level category but have no
  // category2 entry in the public metadata tree. Capture category1 first, then
  // let the more specific child partitions override it.
  for (const parent of metadata.categories) {
    const result = await fetchPartition(
      options,
      "zh-hant",
      `category1-${parent.id}`,
      { category1: parent.id },
    );
    for (const item of result.contents) {
      assignments.set(String(item.id), {
        category1Code: parent.id,
        category2Code: null,
      });
    }
  }
  for (const entry of categoryEntries) {
    const result = await fetchPartition(
      options,
      "zh-hant",
      `category-${entry.category2Code}`,
      { category2: entry.category2Code },
    );
    for (const item of result.contents) {
      const id = String(item.id);
      const previous = assignments.get(id);
      if (
        previous?.category2Code &&
        previous.category2Code !== entry.category2Code
      ) {
        throw new Error(
          `Item ${id} belongs to both ${previous.category2Code} and ${entry.category2Code}`,
        );
      }
      assignments.set(id, entry);
    }
  }
  return assignments;
}

async function fetchClassMembership(options, metadata) {
  const membership = new Map();
  if (options.skipClasses) return membership;

  for (const officialClass of metadata.classes) {
    const classId = CLASS_IDS[officialClass.id];
    if (!classId) throw new Error(`Unsupported official class: ${officialClass.id}`);
    const result = await fetchPartition(
      options,
      "zh-hant",
      `class-${officialClass.id}`,
      { classes: officialClass.id },
    );
    for (const item of result.contents) {
      const id = String(item.id);
      const values = membership.get(id) ?? [];
      values.push(classId);
      membership.set(id, values);
    }
  }
  return membership;
}

function sameIdSet(left, right) {
  if (left.size !== right.size) return false;
  for (const id of left.keys()) {
    if (!right.has(id)) return false;
  }
  return true;
}

function normalizeSearchText(value, locale) {
  return value
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase(API_LOCALES[locale])
    .replace(/\s+/gu, " ");
}

function officialUrl(locale, item) {
  if (locale === "zh-hant") {
    return `https://tw.ncsoft.com/aion2/info/item?detail=item_${item.id}_0_0`;
  }
  if (locale === "ko") {
    return `https://aion2.plaync.com/ko-kr/info/item?detail=item_${item.id}_0_0`;
  }
  const url = new URL("https://api-goats.plaync.com/aion2/v2.0/dict/search/item");
  url.search = new URLSearchParams({
    locale: "en-US",
    searchKeyword: item.name,
    exact: "true",
    size: "10",
  }).toString();
  return url.toString();
}

function buildFacets(items, locale, metadata) {
  const gradeLabels = new Map(metadata.grades.map((grade) => [grade.id, grade.name]));
  const parentCategorySuffix =
    locale === "zh-hant" ? "（其他）" : locale === "ko" ? " (기타)" : " (Other)";
  const officialCategoryLabels = new Map([
    ...metadata.categories.map((category) => [
      category.id,
      `${category.name}${parentCategorySuffix}`,
    ]),
    ...metadata.categories.flatMap((category) =>
      (category.child ?? []).map((child) => [child.id, child.name]),
    ),
    ["unclassified", FALLBACK_LABELS[locale].category],
  ]);
  const categoryCounts = new Map();
  const gradeCounts = new Map();
  const classCounts = new Map();
  const classLabels = new Map(
    metadata.classes.map((entry) => [CLASS_IDS[entry.id], entry.name]),
  );

  for (const item of items) {
    gradeCounts.set(item.gradeCode, (gradeCounts.get(item.gradeCode) ?? 0) + 1);
    const categoryCode =
      item.category2Code ?? item.category1Code ?? "unclassified";
    categoryCounts.set(
      categoryCode,
      (categoryCounts.get(categoryCode) ?? 0) + 1,
    );
    const classes = item.classCodes.length
      ? item.classCodes.filter((value) => value !== "__none__")
      : [...classLabels.keys()];
    for (const classId of classes) {
      classCounts.set(classId, (classCounts.get(classId) ?? 0) + 1);
    }
  }

  const categoryLabels = new Map();
  for (const item of items) {
    const code =
      item.category2Code ?? item.category1Code ?? "unclassified";
    if (!categoryLabels.has(code)) {
      categoryLabels.set(
        code,
        officialCategoryLabels.get(code) ||
          item.localizations[locale].categoryName ||
          FALLBACK_LABELS[locale].category,
      );
    }
  }

  return {
    grades: [...gradeCounts.entries()]
      .map(([code, count]) => ({
        code,
        label: gradeLabels.get(code) ?? FALLBACK_LABELS[locale].grade,
        count,
        rank: GRADE_RANK[code] ?? 0,
      }))
      .sort((left, right) => right.rank - left.rank),
    categories: [...categoryCounts.entries()]
      .map(([code, count]) => ({
        code,
        label: categoryLabels.get(code) ?? FALLBACK_LABELS[locale].category,
        count,
      }))
      .sort((left, right) => left.label.localeCompare(right.label, API_LOCALES[locale])),
    classes: [...classLabels.entries()].map(([code, label]) => ({
      code,
      label,
      count: classCounts.get(code) ?? 0,
    })),
  };
}

function toCatalogRow(item, locale) {
  const copy = item.localizations[locale];
  return {
    id: item.id,
    name: copy.name,
    imageUrl: item.imageUrl,
    gradeCode: item.gradeCode,
    gradeName: copy.gradeName,
    categoryCode: item.category2Code ?? item.category1Code ?? "unclassified",
    categoryName: copy.categoryName,
    optionLines: copy.options,
    classIds: item.classCodes.filter((value) => value !== "__none__"),
    tradable: item.tradable,
    officialUrl: officialUrl(locale, { id: item.id, name: copy.name }),
    detailSlug: null,
  };
}

function createBootstrap(catalog, metadataByLocale) {
  const itemsByLocale = {};
  const facetsByLocale = {};
  for (const locale of SITE_LOCALES) {
    const sorted = [...catalog.items].sort((left, right) => {
      const gradeDifference = right.gradeRank - left.gradeRank;
      if (gradeDifference) return gradeDifference;
      return Number(left.id) - Number(right.id);
    });
    itemsByLocale[locale] = sorted.slice(0, 20).map((item) => toCatalogRow(item, locale));
    facetsByLocale[locale] = buildFacets(
      catalog.items,
      locale,
      metadataByLocale[locale],
    );
  }

  return {
    schemaVersion: 1,
    publisher: "NCSOFT",
    sourceUrl: "https://tw.ncsoft.com/aion2/info/item",
    snapshotDate: catalog.snapshotDate,
    retrievedAt: catalog.retrievedAt,
    total: catalog.total,
    checksum: catalog.checksum,
    versionKey: catalog.versionKey,
    itemsByLocale,
    facetsByLocale,
  };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  await mkdir(options.cacheDirectory, { recursive: true });

  const metadataByLocale = {};
  for (const locale of SITE_LOCALES) {
    metadataByLocale[locale] = await fetchMetadata(options, locale);
  }
  const officialTotal = metadataByLocale["zh-hant"].total;
  for (const locale of SITE_LOCALES) {
    if (metadataByLocale[locale].total !== officialTotal) {
      throw new Error(
        `${locale} total ${metadataByLocale[locale].total} differs from ${officialTotal}`,
      );
    }
  }

  const itemsByLocale = {};
  for (const locale of SITE_LOCALES) {
    itemsByLocale[locale] = await fetchLocaleItems(
      options,
      locale,
      metadataByLocale[locale],
    );
  }
  if (
    !sameIdSet(itemsByLocale["zh-hant"], itemsByLocale.en) ||
    !sameIdSet(itemsByLocale["zh-hant"], itemsByLocale.ko)
  ) {
    throw new Error("Official locale item ID sets differ; refusing to publish");
  }

  const [categoryMembership, classMembership] = await Promise.all([
    fetchCategoryMembership(options, metadataByLocale["zh-hant"]),
    fetchClassMembership(options, metadataByLocale["zh-hant"]),
  ]);
  const allClassCount = metadataByLocale["zh-hant"].classes.length;
  const gradeNames = Object.fromEntries(
    SITE_LOCALES.map((locale) => [
      locale,
      new Map(metadataByLocale[locale].grades.map((grade) => [grade.id, grade.name])),
    ]),
  );

  const items = [...itemsByLocale["zh-hant"].keys()]
    .map((id) => {
      const localizedItems = Object.fromEntries(
        SITE_LOCALES.map((locale) => [locale, itemsByLocale[locale].get(id)]),
      );
      const shared = localizedItems["zh-hant"];
      for (const locale of ["en", "ko"]) {
        const candidate = localizedItems[locale];
        if (
          String(candidate.id) !== id ||
          candidate.grade !== shared.grade ||
          candidate.image !== shared.image
        ) {
          throw new Error(`Shared fields differ for item ${id} in ${locale}`);
        }
      }
      const categories = categoryMembership.get(id) ?? {
        category1Code: null,
        category2Code: null,
      };
      const memberships = classMembership.get(id) ?? [];
      const classCodes =
        memberships.length === allClassCount
          ? []
          : memberships.length
            ? [...new Set(memberships)].sort()
            : options.skipClasses
              ? []
              : ["__none__"];
      const localizations = Object.fromEntries(
        SITE_LOCALES.map((locale) => {
          const entry = localizedItems[locale];
          const name = String(entry.name ?? "").trim();
          if (!name) throw new Error(`Item ${id} has no ${locale} name`);
          const categoryName =
            String(entry.categoryName ?? "").trim() ||
            FALLBACK_LABELS[locale].category;
          const optionsText = Array.isArray(entry.options)
            ? entry.options.map((value) => String(value).trim()).filter(Boolean)
            : [];
          return [
            locale,
            {
              sourceLocale: API_LOCALES[locale],
              name,
              gradeName:
                gradeNames[locale].get(shared.grade) ??
                FALLBACK_LABELS[locale].grade,
              categoryName,
              options: optionsText,
              normalizedName: normalizeSearchText(name, locale),
              searchText: normalizeSearchText(
                [id, name, categoryName, ...optionsText].join(" "),
                locale,
              ),
            },
          ];
        }),
      );
      return {
        id,
        imageUrl: String(shared.image ?? ""),
        gradeCode: String(shared.grade ?? ""),
        gradeRank: GRADE_RANK[shared.grade] ?? 0,
        category1Code: categories.category1Code,
        category2Code: categories.category2Code,
        classCodes,
        tradable:
          typeof shared.tradable === "boolean" ? shared.tradable : null,
        localizations,
      };
    })
    .sort((left, right) => Number(left.id) - Number(right.id));

  if (items.length !== officialTotal) {
    throw new Error(`Merged catalog has ${items.length} items, expected ${officialTotal}`);
  }

  const retrievedAt = new Date().toISOString();
  const snapshotDate = retrievedAt.slice(0, 10);
  const checksum = createHash("sha256")
    .update(JSON.stringify(items))
    .digest("hex");
  const catalog = {
    schemaVersion: 1,
    publisher: "NCSOFT",
    sourceUrl: "https://tw.ncsoft.com/aion2/info/item",
    sourceEndpoints: {
      "zh-hant": `${API_BASES["zh-hant"]}/dict/search/item`,
      en: `${API_BASES.en}/dict/search/item`,
      ko: `${API_BASES.ko}/dict/search/item`,
    },
    snapshotDate,
    retrievedAt,
    total: officialTotal,
    unclassifiedCount: items.filter(
      (item) => !item.category1Code && !item.category2Code,
    ).length,
    checksum,
    versionKey: `sha256-${checksum}`,
    items,
  };
  const bootstrap = createBootstrap(catalog, metadataByLocale);
  await writeJsonAtomic(options.output, catalog);
  await writeJsonAtomic(options.bootstrap, bootstrap, true);

  console.log(
    JSON.stringify(
      {
        output: path.relative(root, options.output),
        bootstrap: path.relative(root, options.bootstrap),
        total: catalog.total,
        unclassifiedCount: catalog.unclassifiedCount,
        versionKey: catalog.versionKey,
        classCoverage: {
          assigned: classMembership.size,
          officialClasses: allClassCount,
        },
        categoryCoverage: {
          assigned: categoryMembership.size,
          officialTotal,
        },
      },
      null,
      2,
    ),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  });
}

export {
  API_BASES,
  API_LOCALES,
  GRADE_RANK,
  buildFacets,
  createBootstrap,
  fetchPartition,
  normalizeSearchText,
};
