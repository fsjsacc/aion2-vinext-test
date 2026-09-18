import { databaseClassDefinitions } from "./database-type-registry";
import type {
  ItemCatalogRow,
  ItemCatalogSearchResponse,
} from "./item-catalog-types";
import {
  officialItemPageUrl,
  officialItemSourceUrl,
  type OfficialItemDetail,
} from "./official-item-detail";
import { getItemCatalogBootstrap } from "./item-catalog-bootstrap";
import {
  resolveContentLocale,
  type SiteLocale,
} from "./site-config";

type SupabaseItemCatalogResponse = Pick<
  ItemCatalogSearchResponse,
  "release" | "items" | "pagination"
>;

type SummaryEnvironment = {
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
};

function configuration(env: SummaryEnvironment = {}) {
  const processEnvironment =
    typeof process === "undefined" ? undefined : process.env;
  const supabaseUrl =
    env.SUPABASE_URL?.trim() || processEnvironment?.SUPABASE_URL?.trim();
  const publishableKey =
    env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    processEnvironment?.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!supabaseUrl || !publishableKey) return null;
  try {
    const rpcUrl = new URL("/rest/v1/rpc/search_aion2_items", supabaseUrl);
    if (rpcUrl.protocol !== "https:") return null;
    return { publishableKey, rpcUrl };
  } catch {
    return null;
  }
}

function validResponse(
  value: unknown,
): value is SupabaseItemCatalogResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Record<string, unknown>;
  const pagination = response.pagination as Record<string, unknown> | undefined;
  return (
    Array.isArray(response.items) &&
    pagination !== null &&
    typeof pagination === "object" &&
    Number.isInteger(pagination.page) &&
    Number.isInteger(pagination.pageSize) &&
    Number.isInteger(pagination.total) &&
    Number.isInteger(pagination.lastPage)
  );
}

export function itemCatalogRowToSummary(
  row: ItemCatalogRow,
  locale: SiteLocale,
  release: ItemCatalogSearchResponse["release"] = null,
): OfficialItemDetail {
  return {
    detailStatus: "summary",
    id: row.id,
    name: row.name,
    description: null,
    gradeCode: row.gradeCode,
    gradeName: row.gradeName,
    iconUrl: row.imageUrl,
    itemLevel: null,
    levelValue: null,
    enchantLevel: 0,
    equipLevel: null,
    typeCode: null,
    categoryName: row.categoryName,
    raceName: "",
    classNames: row.classIds.map((classId) =>
      databaseClassDefinitions.find((entry) => entry.id === classId)
        ?.labels[locale] ?? classId
    ),
    storable: null,
    tradable: row.tradable,
    personalTradable: null,
    enchantable: null,
    decomposable: null,
    safeEnchantLevel: null,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    subStatCount: null,
    subSkillCountMax: null,
    subStatRandom: null,
    durationMin: null,
    durationMax: null,
    coolTime: null,
    costumes: [],
    sources: [],
    summaryLines: [...row.optionLines],
    mainStats: [],
    subStats: [],
    releaseVersion: release?.versionKey ?? null,
    sourceRetrievedAt: release?.retrievedAt ?? null,
    officialPageUrl: officialItemPageUrl(row.id, locale),
    officialSourceUrl: officialItemSourceUrl(row.id, locale),
  };
}

export function getBootstrapItemSummary(
  id: string,
  locale: SiteLocale,
): OfficialItemDetail | null {
  const response = getItemCatalogBootstrap(locale);
  const row = response.items.find((item) => item.id === id);
  return row ? itemCatalogRowToSummary(row, locale, response.release) : null;
}

export async function fetchPublishedItemSummary(
  id: string,
  locale: SiteLocale,
  env: SummaryEnvironment = {},
): Promise<OfficialItemDetail | null> {
  const contentLocale = resolveContentLocale(locale);
  const configured = configuration(env);
  if (!configured) return null;
  try {
    const response = await fetch(configured.rpcUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        apikey: configured.publishableKey,
        authorization: `Bearer ${configured.publishableKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        p_locale: contentLocale,
        p_query: id,
        p_category: null,
        p_grades: null,
        p_classes: null,
        p_item_ids: [id],
        p_page: 1,
        p_page_size: 1,
      }),
      signal: AbortSignal.timeout(6_000),
    });
    if (!response.ok) return null;
    const value: unknown = await response.json();
    if (!validResponse(value)) return null;
    const result = value as SupabaseItemCatalogResponse;
    const row = result.items[0] as ItemCatalogRow | undefined;
    if (!row || row.id !== id) return null;
    return itemCatalogRowToSummary(row, locale, result.release);
  } catch {
    return null;
  }
}
