const SITEMAP_KINDS = ["pages", "content", "maps"];

function isCanonicalSuffix(value) {
  return typeof value === "string" && value.startsWith("/") && value.endsWith("/");
}

/**
 * Build one disjoint sitemap registry. A live tool keeps an existing specialised
 * assignment (the map hub belongs to `maps`); otherwise its base route is added
 * to `pages`. This makes future registry-backed and custom tools discoverable
 * without listing their slugs in the Worker.
 */
export function createSitemapEntryRegistry({ pages, content, maps, liveTools }) {
  const registry = {
    pages: [...(pages ?? [])],
    content: [...(content ?? [])],
    maps: [...(maps ?? [])],
  };
  const owners = new Map();

  for (const kind of SITEMAP_KINDS) {
    for (const entry of registry[kind]) {
      if (!isCanonicalSuffix(entry?.suffix)) {
        throw new Error(`Invalid ${kind} sitemap suffix: ${entry?.suffix ?? "missing"}`);
      }
      const previous = owners.get(entry.suffix);
      if (previous) {
        throw new Error(
          `Duplicate sitemap suffix ${entry.suffix} in ${previous} and ${kind}.`,
        );
      }
      owners.set(entry.suffix, kind);
    }
  }

  for (const tool of liveTools ?? []) {
    if (tool?.status !== "live") continue;
    const suffix = tool.route?.href;
    if (!isCanonicalSuffix(suffix)) {
      throw new Error(`Live tool ${tool?.slug ?? "unknown"} has no canonical base href.`);
    }
    if (!owners.has(suffix)) {
      registry.pages.push({
        suffix,
        ...(tool.updatedAt ? { lastModified: tool.updatedAt } : {}),
      });
      owners.set(suffix, "pages");
    }
  }

  for (const tool of liveTools ?? []) {
    if (tool?.status !== "live") continue;
    const suffix = tool.route?.href;
    const occurrences = SITEMAP_KINDS.reduce(
      (count, kind) => count + registry[kind].filter((entry) => entry.suffix === suffix).length,
      0,
    );
    if (occurrences !== 1) {
      throw new Error(
        `Live tool ${tool.slug} must appear in exactly one sitemap; found ${occurrences}.`,
      );
    }
  }

  return registry;
}
