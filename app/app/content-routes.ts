import type { ContentEntry } from "./content-registry";
import { DEFAULT_SITE_LOCALE, isSiteLocale } from "./site-config";

export type ContentRouteIdentity = Pick<ContentEntry, "section" | "slug">;

export type ContentCanonicalRoute = ContentRouteIdentity & {
  suffix: `/${string}/`;
};

/**
 * Evergreen, query-led content uses locale-root URLs while retaining the
 * existing content identity for publication, relations, and analytics.
 */
export const contentCanonicalRoutes = [
  {
    section: "guides",
    slug: "founders-pack-comparison",
    suffix: "/aion-2-founders-pack/",
  },
  {
    section: "guides",
    slug: "early-access",
    suffix: "/aion-2-early-access/",
  },
  {
    section: "news",
    slug: "global-release-september-2026",
    suffix: "/aion-2-release-date/",
  },
  {
    section: "guides",
    slug: "steam-vs-purple",
    suffix: "/aion-2-steam-vs-purple/",
  },
  {
    section: "guides",
    slug: "global-monetization-watchlist",
    suffix: "/aion-2-free-to-play/",
  },
  {
    section: "guides",
    slug: "system-requirements",
    suffix: "/aion-2-system-requirements/",
  },
  {
    section: "guides",
    slug: "global-pre-registration",
    suffix: "/aion-2-pre-registration/",
  },
  {
    section: "news",
    slug: "global-server-regions",
    suffix: "/aion-2-server-regions/",
  },
  {
    section: "database",
    slug: "aion-2-wiki",
    suffix: "/aion-2-wiki/",
  },
  {
    section: "guides",
    slug: "aion-2-gameplay",
    suffix: "/aion-2-gameplay/",
  },
  {
    section: "guides",
    slug: "aion-2-download",
    suffix: "/aion-2-download/",
  },
  {
    section: "guides",
    slug: "aion-2-platforms",
    suffix: "/aion-2-platforms/",
  },
  {
    section: "guides",
    slug: "aion-2-server-status",
    suffix: "/aion-2-server-status/",
  },
  {
    section: "guides",
    slug: "aion-2-tier-list",
    suffix: "/aion-2-tier-list/",
  },
  {
    section: "guides",
    slug: "virtual-currency-economy-madden-27-cross-game",
    suffix: "/virtual-currency-economy-madden-27-cross-game/",
  },
] as const satisfies readonly ContentCanonicalRoute[];

function identityKey(entry: ContentRouteIdentity) {
  return `${entry.section}/${entry.slug}`;
}

export function getLegacyContentSuffix(entry: ContentRouteIdentity) {
  return `/${entry.section}/${entry.slug}/`;
}

function normalizeDocumentSuffix(pathname: string) {
  if (!pathname.startsWith("/") || pathname.includes("?") || pathname.includes("#")) {
    return null;
  }
  const collapsed = pathname.replace(/\/{2,}/gu, "/");
  return collapsed.endsWith("/") ? collapsed : `${collapsed}/`;
}

export function validateContentCanonicalRoutes(
  routes: readonly ContentCanonicalRoute[] = contentCanonicalRoutes,
) {
  const errors: string[] = [];
  const identities = new Set<string>();
  const suffixes = new Set<string>();

  for (const route of routes) {
    const identity = identityKey(route);
    if (identities.has(identity)) {
      errors.push(`Duplicate canonical content identity: ${identity}.`);
    }
    identities.add(identity);

    if (
      !route.suffix.startsWith("/") ||
      !route.suffix.endsWith("/") ||
      route.suffix.includes("?") ||
      route.suffix.includes("#") ||
      route.suffix.includes("//")
    ) {
      errors.push(`Invalid canonical content suffix: ${route.suffix}.`);
    }
    if (suffixes.has(route.suffix)) {
      errors.push(`Duplicate canonical content suffix: ${route.suffix}.`);
    }
    suffixes.add(route.suffix);

    if (route.suffix === getLegacyContentSuffix(route)) {
      errors.push(`Canonical content route must differ from its legacy route: ${identity}.`);
    }
  }

  return errors;
}

const canonicalRouteErrors = validateContentCanonicalRoutes();
if (canonicalRouteErrors.length > 0) {
  throw new Error(canonicalRouteErrors.join("\n"));
}

const canonicalRouteByIdentity: ReadonlyMap<string, ContentCanonicalRoute> = new Map(
  contentCanonicalRoutes.map((route) => [identityKey(route), route]),
);
const canonicalRouteBySuffix: ReadonlyMap<string, ContentCanonicalRoute> = new Map(
  contentCanonicalRoutes.map((route) => [route.suffix, route]),
);
const canonicalRouteByLegacySuffix: ReadonlyMap<string, ContentCanonicalRoute> = new Map(
  contentCanonicalRoutes.map((route) => [getLegacyContentSuffix(route), route]),
);

export function getContentCanonicalRoute(entry: ContentRouteIdentity) {
  return canonicalRouteByIdentity.get(identityKey(entry));
}

export function getContentCanonicalSuffix(entry: ContentRouteIdentity) {
  return getContentCanonicalRoute(entry)?.suffix ?? getLegacyContentSuffix(entry);
}

export function getContentIdentityByCanonicalSuffix(pathname: string) {
  const suffix = normalizeDocumentSuffix(pathname);
  if (!suffix) return undefined;
  const route = canonicalRouteBySuffix.get(suffix);
  return route
    ? { section: route.section, slug: route.slug }
    : undefined;
}

export function hasCleanContentCanonicalRoute(entry: ContentRouteIdentity) {
  return canonicalRouteByIdentity.has(identityKey(entry));
}

/**
 * Resolve only SEO migrations:
 * - an old locale-prefixed section URL moves to the same locale's clean URL;
 * - a locale-less clean URL moves deterministically to the English canonical.
 */
export function getContentCanonicalRedirectPath(pathname: string) {
  const normalized = normalizeDocumentSuffix(pathname);
  if (!normalized) return null;

  const segments = normalized.split("/").filter(Boolean);
  const locale = segments[0];
  if (isSiteLocale(locale)) {
    const legacySuffix = `/${segments.slice(1).join("/")}/`;
    const route = canonicalRouteByLegacySuffix.get(legacySuffix);
    return route ? `/${locale}${route.suffix}` : null;
  }

  const cleanRoute = canonicalRouteBySuffix.get(normalized);
  return cleanRoute ? `/${DEFAULT_SITE_LOCALE}${cleanRoute.suffix}` : null;
}
