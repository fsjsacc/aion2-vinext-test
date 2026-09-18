import {
  resolveContentLocale,
  type ContentLocale,
  type SiteLocale,
} from "./site-config";

export const officialItemIdPattern = /^\d{1,18}$/u;

export type OfficialItemStat = {
  id: string;
  name: string;
  minValue: string | null;
  value: string | null;
  extra: string | null;
  exceed: boolean;
};

export type OfficialItemDetail = {
  detailStatus: "full" | "summary";
  id: string;
  name: string;
  description: string | null;
  gradeCode: string | null;
  gradeName: string;
  iconUrl: string;
  itemLevel: number | null;
  levelValue: number | null;
  enchantLevel: number;
  equipLevel: number | null;
  typeCode: string | null;
  categoryName: string;
  raceName: string;
  classNames: readonly string[];
  storable: boolean | null;
  tradable: boolean | null;
  personalTradable: boolean | null;
  enchantable: boolean | null;
  decomposable: boolean | null;
  safeEnchantLevel: number | null;
  maxEnchantLevel: number | null;
  maxExceedEnchantLevel: number | null;
  magicStoneSlots: number | null;
  godStoneSlots: number | null;
  subStatCount: number | null;
  subSkillCountMax: number | null;
  subStatRandom: boolean | null;
  durationMin: number | null;
  durationMax: number | null;
  coolTime: number | null;
  costumes: readonly string[];
  sources: readonly string[];
  summaryLines: readonly string[];
  mainStats: readonly OfficialItemStat[];
  subStats: readonly OfficialItemStat[];
  releaseVersion: string | null;
  sourceRetrievedAt: string | null;
  officialPageUrl: string;
  officialSourceUrl: string;
};

export function isOfficialItemDetail(
  value: unknown,
  expectedId?: string,
): value is OfficialItemDetail {
  const record = recordValue(value);
  return Boolean(
    record &&
    (record.detailStatus === "full" || record.detailStatus === "summary") &&
    typeof record.id === "string" &&
    (!expectedId || record.id === expectedId) &&
    typeof record.name === "string" &&
    typeof record.gradeName === "string" &&
    typeof record.categoryName === "string" &&
    Number.isInteger(record.enchantLevel) &&
    Number(record.enchantLevel) >= 0 &&
    Number(record.enchantLevel) <= 50 &&
    typeof record.iconUrl === "string" &&
    isTrustedOfficialMediaUrl(record.iconUrl) &&
    stringArrayValue(record.classNames) &&
    stringArrayValue(record.summaryLines) &&
    statArrayValue(record.mainStats) &&
    statArrayValue(record.subStats),
  );
}

const officialLanguageCodes: Record<ContentLocale, "zh" | "en" | "ko"> = {
  "zh-hant": "zh",
  en: "en",
  ko: "ko",
};

function officialApiOrigin() {
  // The Taiwan game-data endpoint is the canonical API host for all three
  // supported language payloads. The plaync host currently redirects this
  // API path to a non-existent page.
  return "https://tw.ncsoft.com";
}

export function officialItemSourceUrl(
  id: string,
  locale: SiteLocale,
  enchantLevel = 0,
) {
  const contentLocale = resolveContentLocale(locale);
  const url = new URL("/aion2/api/gameconst/item", officialApiOrigin());
  url.searchParams.set("id", id);
  url.searchParams.set("enchantLevel", String(enchantLevel));
  url.searchParams.set("lang", officialLanguageCodes[contentLocale]);
  return url.toString();
}

export function officialItemPageUrl(id: string, locale: SiteLocale) {
  const contentLocale = resolveContentLocale(locale);
  if (contentLocale === "zh-hant") {
    return `https://tw.ncsoft.com/aion2/info/item?detail=item_${id}_0_0`;
  }
  if (contentLocale === "ko") {
    return `https://aion2.plaync.com/ko-kr/info/item?detail=item_${id}_0_0`;
  }
  return officialItemSourceUrl(id, contentLocale);
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function stringArrayValue(value: unknown) {
  return Array.isArray(value) &&
    value.length <= 100 &&
    value.every((entry) => typeof entry === "string");
}

function statArrayValue(value: unknown) {
  return Array.isArray(value) &&
    value.length <= 100 &&
    value.every((entry) => {
      const record = recordValue(entry);
      return Boolean(
        record &&
        typeof record.id === "string" &&
        typeof record.name === "string" &&
        (record.minValue === null || typeof record.minValue === "string") &&
        (record.value === null || typeof record.value === "string") &&
        (record.extra === null || typeof record.extra === "string") &&
        typeof record.exceed === "boolean",
      );
    });
}

function isTrustedOfficialMediaUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === "https:" && (
      hostname === "playnccdn.com" ||
      hostname.endsWith(".playnccdn.com") ||
      hostname === "ncsoft.com" ||
      hostname.endsWith(".ncsoft.com") ||
      hostname === "plaync.com" ||
      hostname.endsWith(".plaync.com")
    );
  } catch {
    return false;
  }
}

function textValue(value: unknown, fallback = "", maximum = 500) {
  return typeof value === "string"
    ? value.trim().slice(0, maximum)
    : fallback;
}

function optionalText(value: unknown) {
  const result = textValue(value);
  return result || null;
}

function optionalNumber(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function boundedInteger(value: unknown, maximum: number) {
  const number = optionalNumber(value);
  if (
    number === null ||
    !Number.isInteger(number) ||
    number < 0 ||
    number > maximum
  ) {
    return null;
  }
  return number;
}

function optionalBoolean(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

function textList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 100)
    .map((entry) => textValue(entry))
    .filter(Boolean);
}

function plainOfficialText(value: unknown) {
  const source = textValue(value, "", 10_000);
  if (!source) return null;
  return source
    .replace(/<br\s*\/?>/giu, "\n")
    .replace(/<[^>]*>/gu, "")
    .replace(/\r\n?/gu, "\n")
    .replace(/[ \t]+\n/gu, "\n")
    .replace(/\n{3,}/gu, "\n\n")
    .trim() || null;
}

function normalizeStats(value: unknown): OfficialItemStat[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 100).flatMap((entry) => {
    const record = recordValue(entry);
    if (!record) return [];
    const id = textValue(record.id);
    const name = textValue(record.name);
    if (!id || !name) return [];
    return [{
      id,
      name,
      minValue: optionalText(record.minValue),
      value: optionalText(record.value),
      extra: optionalText(record.extra),
      exceed: record.exceed === true,
    }];
  });
}

export function normalizeOfficialItemDetail(
  value: unknown,
  expectedId: string,
  locale: SiteLocale,
  enchantLevel: number,
): OfficialItemDetail | null {
  const record = recordValue(value);
  if (!record || String(record.id ?? "") !== expectedId) return null;
  const name = textValue(record.name);
  const iconUrl = textValue(record.icon);
  if (!name || !isTrustedOfficialMediaUrl(iconUrl)) return null;
  const returnedEnchantLevel = boundedInteger(record.enchantLevel, 50);
  if (returnedEnchantLevel !== enchantLevel) {
    return null;
  }

  return {
    detailStatus: "full",
    id: expectedId,
    name,
    description: plainOfficialText(record.desc),
    gradeCode: optionalText(record.grade),
    gradeName: textValue(record.gradeName, "—"),
    iconUrl,
    itemLevel: boundedInteger(record.level, 1_000_000),
    levelValue: boundedInteger(record.levelValue, 1_000_000_000),
    enchantLevel,
    equipLevel: boundedInteger(record.equipLevel, 10_000),
    typeCode: optionalText(record.type),
    categoryName: textValue(record.categoryName, "—"),
    raceName: textValue(record.raceName, "—"),
    classNames: textList(record.classNames),
    storable: optionalBoolean(record.storable),
    tradable: optionalBoolean(record.tradable),
    personalTradable: optionalBoolean(record.tradablePersonal),
    enchantable: optionalBoolean(record.enchantable),
    decomposable: optionalBoolean(record.decomposable),
    safeEnchantLevel: boundedInteger(record.safeEnchantLevel, 50),
    maxEnchantLevel: boundedInteger(record.maxEnchantLevel, 50),
    maxExceedEnchantLevel: boundedInteger(record.maxExceedEnchantLevel, 50),
    magicStoneSlots: boundedInteger(record.magicStoneSlotCount, 100),
    godStoneSlots: boundedInteger(record.godStoneSlotCount, 100),
    subStatCount: boundedInteger(record.subStatCount, 100),
    subSkillCountMax: boundedInteger(record.subSkillCountMax, 100),
    subStatRandom: optionalBoolean(record.subStatRandom),
    durationMin: boundedInteger(record.durationMin, 525_600),
    durationMax: boundedInteger(record.durationMax, 525_600),
    coolTime: boundedInteger(record.coolTime, 31_536_000),
    costumes: textList(record.costumes),
    sources: textList(record.sources),
    summaryLines: [],
    mainStats: normalizeStats(record.mainStats),
    subStats: normalizeStats(record.subStats),
    releaseVersion: null,
    sourceRetrievedAt: new Date().toISOString(),
    officialPageUrl: officialItemPageUrl(expectedId, locale),
    officialSourceUrl: officialItemSourceUrl(expectedId, locale, enchantLevel),
  };
}

export async function fetchOfficialItemDetail(
  id: string,
  locale: SiteLocale,
  enchantLevel = 0,
  fetchImpl: typeof fetch = fetch,
) {
  if (
    !officialItemIdPattern.test(id) ||
    !Number.isInteger(enchantLevel) ||
    enchantLevel < 0 ||
    enchantLevel > 50
  ) {
    return null;
  }

  const sourceUrl = officialItemSourceUrl(id, locale, enchantLevel);
  const response = await fetchImpl(sourceUrl, {
    headers: {
      accept: "application/json",
      referer: `${officialApiOrigin()}/aion2/info/item`,
    },
    // Cloudflare's edge fetch only supports "follow" and "manual".
    // Keep redirects manual so an upstream redirect can never silently move
    // this trusted server-side request to a different origin.
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
  });
  if (response.status >= 300 && response.status < 400) {
    throw new Error("Official item source attempted a redirect");
  }
  if (!response.ok) {
    throw new Error(`Official item source returned ${response.status}`);
  }
  const contentLength = Number(response.headers.get("content-length") ?? 0);
  if (contentLength > 262_144) {
    throw new Error("Official item source response is too large");
  }
  const body = await response.text();
  if (body.length > 262_144) {
    throw new Error("Official item source response is too large");
  }
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    throw new Error("Official item source returned invalid JSON");
  }
  return normalizeOfficialItemDetail(
    payload,
    id,
    locale,
    enchantLevel,
  );
}
