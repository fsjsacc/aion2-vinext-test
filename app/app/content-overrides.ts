import { headers } from "next/headers";
import { TRUSTED_CONTENT_OVERRIDES_HEADER } from "./content-override-values";
import type { ContentEntry } from "./content-registry";

/**
 * Read content overrides injected by the edge worker.
 * Priority: globalThis (full DB content, no size limit) > header (single entry fallback).
 * Returns a Map<"section/slug", ContentEntry> for fast lookup.
 */
export async function getContentOverrides(): Promise<
  Map<string, ContentEntry>
> {
  // 优先从 globalThis 读（worker 写入的全量内容对象，无需 JSON.parse）
  const cached = (globalThis as any).__dbContent as
    | ContentEntry[]
    | undefined;
  if (Array.isArray(cached)) {
    const map = new Map<string, ContentEntry>();
    for (const row of cached) {
      map.set(`${row.section}/${row.slug}`, row);
    }
    return map;
  }

  // 兜底：从 header 读（兼容旧方式）
  let requestHeaders: Headers;
  try {
    requestHeaders = await headers();
  } catch {
    return new Map();
  }
  const raw = requestHeaders.get(TRUSTED_CONTENT_OVERRIDES_HEADER);
  if (!raw) return new Map();
  try {
    const rows = JSON.parse(raw) as ContentEntry[];
    const map = new Map<string, ContentEntry>();
    for (const row of rows) {
      map.set(`${row.section}/${row.slug}`, row);
    }
    return map;
  } catch {
    return new Map();
  }
}