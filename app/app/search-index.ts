import {
  getContentEntries,
  getContentHref,
  getContentTranslation,
  type ContentEntry,
} from "./content-registry";
import { getContentOverrides } from "./content-overrides";
import { aion2CodeRegistry, codePageCopy } from "./code-registry";
import {
  copy as mapCopy,
  getIndexableMaps,
  getIndexableMapPois,
  getMapBySlug,
  getMapDescription,
  getMapName,
  getMapTypeDescription,
  getMapTypeHeading,
  getMapTypeItemCount,
  getMapTypeLabel,
  getPoiText,
  getPublishedPoisForType,
  localePath,
} from "./map-seo";
import { mapSeoPublication } from "./map-seo-publication";
import {
  resolveContentLocale,
  siteLocaleConfig,
  siteShellCopy,
  type SiteLocale,
} from "./site-config";
import { getToolHref, toolHubCopy, toolRegistry } from "./tool-registry";

export type SiteSearchResult = {
  id: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  score: number;
};

function normalize(value: string, locale: SiteLocale) {
  return value.normalize("NFKC").trim().toLocaleLowerCase(locale);
}

function contentSearchText(entry: ContentEntry, locale: SiteLocale) {
  const copy = getContentTranslation(entry, locale).content;
  return [
    entry.section,
    entry.slug,
    copy.eyebrow,
    copy.title,
    copy.description,
    copy.intro,
    JSON.stringify(entry.properties ?? {}),
    ...(copy.keywords ?? []),
    ...copy.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.steps ?? []).flatMap((step) => [step.title, step.description]),
    ]),
  ].join(" ");
}

function scoreMatch(
  queryTokens: readonly string[],
  fields: { title: string; slug: string; description: string; body: string },
) {
  let score = 0;
  for (const token of queryTokens) {
    if (fields.title.includes(token)) score += 12;
    if (fields.slug.includes(token)) score += 8;
    if (fields.description.includes(token)) score += 4;
    if (fields.body.includes(token)) score += 1;
  }
  return score;
}

export async function searchSite(
  locale: SiteLocale,
  rawQuery: string,
  limit = 24,
): Promise<SiteSearchResult[]> {
  const query = normalize(rawQuery, locale);
  if (!query) return [];

  const tokens = [...new Set(query.split(/\s+/).filter(Boolean))];
  const results: SiteSearchResult[] = [];

  const contentLocale = resolveContentLocale(locale);
  const codesCopy = codePageCopy[contentLocale];
  const codesBody = normalize(
    [
      "codes",
      "code",
      "coupon",
      "redeem",
      codesCopy.eyebrow,
      codesCopy.title,
      codesCopy.description,
      codesCopy.currentTitle,
      codesCopy.historyTitle,
      codesCopy.guideTitle,
      ...aion2CodeRegistry.flatMap((entry) => [
        entry.code,
        entry.status,
        entry.title[contentLocale],
        entry.period[contentLocale].from,
        entry.period[contentLocale].until,
        entry.serverScope[contentLocale],
        entry.accountLimit[contentLocale],
        ...entry.rewards[contentLocale],
      ]),
    ].join(" "),
    locale,
  );
  if (tokens.every((token) => codesBody.includes(token))) {
    const exactCodeMatch = aion2CodeRegistry.some(
      (entry) => normalize(entry.code, locale) === query,
    );
    results.push({
      id: "page:codes",
      href: localePath(locale, "/codes/"),
      eyebrow: codesCopy.eyebrow,
      title: codesCopy.title,
      description: codesCopy.description,
      meta: `${codesCopy.currentTitle} · ${codesCopy.historyTitle}`,
      score:
        scoreMatch(tokens, {
          title: normalize(codesCopy.title, locale),
          slug: normalize("codes code coupon redeem", locale),
          description: normalize(codesCopy.description, locale),
          body: codesBody,
        }) + (exactCodeMatch ? 100 : 0),
    });
  }

  for (const entry of getContentEntries()) {
    const copy = getContentTranslation(entry, locale).content;
    const body = normalize(contentSearchText(entry, locale), locale);
    if (!tokens.every((token) => body.includes(token))) continue;

    results.push({
      id: `content:${entry.section}:${entry.slug}`,
      href: getContentHref(locale, entry),
      eyebrow: copy.eyebrow,
      title: copy.title,
      description: copy.description,
      meta: `${siteShellCopy[locale].navigation[entry.section]} · ${copy.readingTime}`,
      score: scoreMatch(tokens, {
        title: normalize(copy.title, locale),
        slug: normalize(entry.slug, locale),
        description: normalize(copy.description, locale),
        body,
      }),
    });
  }

  // ── 合并 DB 内容（CMS 新增/修改的条目，覆盖编译期）──
  const overrides = await getContentOverrides();
  if (overrides.size > 0) {
    const seen = new Set<string>();
    for (const entry of getContentEntries()) {
      seen.add(`${entry.section}/${entry.slug}`);
    }
    for (const [, entry] of overrides) {
      const key = `${entry.section}/${entry.slug}`;
      if (seen.has(key)) continue; // 已在编译期循环中处理
      const copy = getContentTranslation(entry, locale).content;
      const body = normalize(contentSearchText(entry, locale), locale);
      if (!tokens.every((token) => body.includes(token))) continue;
      results.push({
        id: `content:${entry.section}:${entry.slug}`,
        href: getContentHref(locale, entry),
        eyebrow: copy.eyebrow,
        title: copy.title,
        description: copy.description,
        meta: `${siteShellCopy[locale].navigation[entry.section]} · ${copy.readingTime}`,
        score: scoreMatch(tokens, {
          title: normalize(copy.title, locale),
          slug: normalize(entry.slug, locale),
          description: normalize(copy.description, locale),
          body,
        }),
      });
    }
  }

  for (const tool of toolRegistry) {
    const href = getToolHref(locale, tool);
    if (!href) continue;
    const copy = tool.copy[locale];
    const body = normalize(
      [tool.slug, tool.category, copy.eyebrow, copy.name, copy.description, copy.action, ...copy.highlights].join(" "),
      locale,
    );
    if (!tokens.every((token) => body.includes(token))) continue;

    results.push({
      id: `tool:${tool.slug}`,
      href,
      eyebrow: copy.eyebrow,
      title: copy.name,
      description: copy.description,
      meta: `${siteShellCopy[locale].navigation.tools} · ${toolHubCopy[locale].live}`,
      score: scoreMatch(tokens, {
        title: normalize(copy.name, locale),
        slug: normalize(tool.slug, locale),
        description: normalize(copy.description, locale),
        body,
      }),
    });
  }

  for (const map of getIndexableMaps()) {
    const title = `${getMapName(map, locale)} ${mapCopy[locale].interactiveMap}`;
    const description = getMapDescription(map, locale);
    const body = normalize(
      [
        map.slug,
        map.type,
        title,
        description,
        ...Object.keys(map.categoryCounts),
      ].join(" "),
      locale,
    );
    if (!tokens.every((token) => body.includes(token))) continue;

    results.push({
      id: `map:${map.slug}`,
      href: localePath(locale, `/tools/map/${map.slug}/`),
      eyebrow: "MAP / INTERACTIVE",
      title,
      description,
      meta: `${siteShellCopy[locale].navigation.tools} · ${map.markerCount.toLocaleString(siteLocaleConfig[locale].code)} ${mapCopy[locale].points}`,
      score: scoreMatch(tokens, {
        title: normalize(title, locale),
        slug: normalize(map.slug, locale),
        description: normalize(description, locale),
        body,
      }),
    });
  }

  for (const type of mapSeoPublication.types) {
    if (!type.indexable) continue;
    const map = getMapBySlug(type.mapSlug);
    if (!map) continue;
    const points = getPublishedPoisForType(type.mapSlug, type.slug);
    const itemCount = getMapTypeItemCount(map, type);
    const typeLabel = getMapTypeLabel(type.slug, locale);
    const title = getMapTypeHeading(map, locale, type.slug);
    const description = getMapTypeDescription(map, locale, type.slug, itemCount);
    const body = normalize(
      [
        type.mapSlug,
        type.slug,
        type.subtype,
        title,
        description,
        typeLabel,
        ...points.flatMap((point) => {
          const item = getPoiText(point, locale);
          return [point.slug, item.name, item.description];
        }),
      ].join(" "),
      locale,
    );
    if (!tokens.every((token) => body.includes(token))) continue;

    results.push({
      id: `map-type:${type.mapSlug}:${type.slug}`,
      href: localePath(locale, `/tools/map/${type.mapSlug}/type/${type.slug}/`),
      eyebrow: "MAP INDEX",
      title,
      description,
      meta: `${siteShellCopy[locale].navigation.tools} · ${itemCount} ${mapCopy[locale].points}`,
      score: scoreMatch(tokens, {
        title: normalize(title, locale),
        slug: normalize(`${type.mapSlug} ${type.slug}`, locale),
        description: normalize(description, locale),
        body,
      }),
    });
  }

  for (const { publication, poi } of getIndexableMapPois()) {
    const map = getMapBySlug(publication.mapSlug);
    if (!map) continue;
    const item = getPoiText(poi, locale);
    const mapName = getMapName(map, locale);
    const body = normalize(
      [
        publication.mapSlug,
        publication.slug,
        publication.typeSlug ?? "",
        mapName,
        item.name,
        item.description,
        poi.locales.en.name,
        poi.region,
        poi.sourceX,
        poi.sourceY,
      ].join(" "),
      locale,
    );
    if (!tokens.every((token) => body.includes(token))) continue;

    results.push({
      id: `map-poi:${publication.mapSlug}:${publication.markerId}`,
      href: localePath(locale, `/tools/map/${publication.mapSlug}/poi/${publication.slug}/`),
      eyebrow: mapCopy[locale].worldBosses,
      title: item.name,
      description: item.description,
      meta: `${mapName} · ${poi.sourceX}, ${poi.sourceY}`,
      score: scoreMatch(tokens, {
        title: normalize(item.name, locale),
        slug: normalize(publication.slug, locale),
        description: normalize(item.description, locale),
        body,
      }),
    });
  }

  return results
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title, locale))
    .slice(0, limit);
}
