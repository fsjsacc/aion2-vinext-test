import type { SiteLocale } from "./site-config";
import type {
  ToolCategory,
  ToolDefinition,
  ToolStatus,
} from "./tool-registry";

export type ToolCategoryFilter = "all" | ToolCategory;
export type ToolStatusFilter = "all" | ToolStatus;

export type ToolDirectoryState = {
  category: ToolCategoryFilter;
  status: ToolStatusFilter;
  query: string;
};

export const defaultToolDirectoryState: ToolDirectoryState = {
  category: "all",
  status: "all",
  query: "",
};

const fragmentKeys = {
  category: "tool-category",
  status: "tool-status",
  query: "tool-query",
} as const;
const toolStatuses: readonly ToolStatus[] = ["live", "coming-soon"];
const MAX_FRAGMENT_QUERY_LENGTH = 120;

function fragmentParams(fragment: string) {
  return new URLSearchParams(fragment.replace(/^#/u, ""));
}

export function parseToolDirectoryFragment(
  fragment: string,
  categories: readonly ToolCategory[],
): ToolDirectoryState {
  const params = fragmentParams(fragment);
  const category = params.get(fragmentKeys.category);
  const status = params.get(fragmentKeys.status);
  return {
    category: categories.includes(category as ToolCategory)
      ? (category as ToolCategory)
      : "all",
    status: toolStatuses.includes(status as ToolStatus)
      ? (status as ToolStatus)
      : "all",
    query: (params.get(fragmentKeys.query) ?? "").slice(0, MAX_FRAGMENT_QUERY_LENGTH),
  };
}

export function buildToolDirectoryFragment(
  currentFragment: string,
  state: ToolDirectoryState,
) {
  const params = fragmentParams(currentFragment);
  if (state.category === "all") params.delete(fragmentKeys.category);
  else params.set(fragmentKeys.category, state.category);
  if (state.status === "all") params.delete(fragmentKeys.status);
  else params.set(fragmentKeys.status, state.status);

  const query = state.query.trim().slice(0, MAX_FRAGMENT_QUERY_LENGTH);
  if (query) params.set(fragmentKeys.query, query);
  else params.delete(fragmentKeys.query);

  const serialized = params.toString();
  return serialized ? `#${serialized}` : "";
}

export function filterToolDirectoryTools<T extends ToolDefinition>(
  tools: readonly T[],
  locale: SiteLocale,
  state: ToolDirectoryState,
): T[] {
  const query = state.query.trim().toLocaleLowerCase(locale);
  return tools.filter((tool) => {
    if (state.category !== "all" && tool.category !== state.category) return false;
    if (state.status !== "all" && tool.status !== state.status) return false;
    if (!query) return true;

    const content = tool.copy[locale];
    return [
      tool.slug,
      tool.category,
      tool.status,
      content.eyebrow,
      content.name,
      content.description,
      ...content.highlights,
    ]
      .join(" ")
      .toLocaleLowerCase(locale)
      .includes(query);
  });
}
