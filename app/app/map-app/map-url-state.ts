export type MapRouteEntry = {
  key: string;
  slug: string;
};

export type MapViewportState = {
  centerX: number;
  centerY: number;
  zoom: number;
};

export type MapLocationState = {
  mapName: string;
  poi: string | null;
  type: string | null;
  viewport: MapViewportState | null;
};

export type MapLocationUpdates = {
  poi?: string | null;
  type?: string | null;
  viewport?: MapViewportState | null;
};

export function findMapRoute(
  maps: readonly MapRouteEntry[],
  mapName: string,
) {
  return maps.find((map) => map.key === mapName) ?? null;
}

const MAP_PATH = /\/tools\/map\/([^/?#]+)\/?$/u;

function finiteNumber(value: string | null) {
  if (value === null || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatCoordinate(value: number) {
  return Number(value.toFixed(2)).toString();
}

function routeMapFromUrl(url: URL, maps: readonly MapRouteEntry[]) {
  const routeSlug = MAP_PATH.exec(url.pathname)?.[1];
  if (!routeSlug) return null;
  return maps.find((map) => map.slug === decodeURIComponent(routeSlug)) ?? null;
}

export function isCommittedMapPath(
  input: string | URL,
  maps?: readonly MapRouteEntry[],
) {
  const url = input instanceof URL ? new URL(input) : new URL(input, "https://atlas.invalid");
  const routeSlug = MAP_PATH.exec(url.pathname)?.[1];
  if (!routeSlug) return false;
  if (!maps) return true;
  return maps.some((map) => map.slug === decodeURIComponent(routeSlug));
}

function applyLocationUpdates(url: URL, updates: MapLocationUpdates) {
  const fragment = new URLSearchParams(url.hash.replace(/^#/u, ""));

  if (updates.poi !== undefined) {
    if (updates.poi) fragment.set("poi", updates.poi);
    else fragment.delete("poi");
  }
  if (updates.type !== undefined) {
    if (updates.type) fragment.set("type", updates.type);
    else fragment.delete("type");
  }
  if (updates.viewport !== undefined) {
    if (updates.viewport) {
      fragment.set(
        "center",
        `${formatCoordinate(updates.viewport.centerX)},${formatCoordinate(updates.viewport.centerY)}`,
      );
      fragment.set("zoom", formatCoordinate(updates.viewport.zoom));
    } else {
      fragment.delete("center");
      fragment.delete("zoom");
    }
  }

  const hash = fragment.toString();
  url.hash = hash ? `#${hash}` : "";
  return url;
}

export function parseMapLocationUrl(
  input: string | URL,
  maps: readonly MapRouteEntry[],
  fallbackMapName: string,
): MapLocationState {
  const url = input instanceof URL ? new URL(input) : new URL(input, "https://atlas.invalid");
  const fragment = new URLSearchParams(url.hash.replace(/^#/u, ""));
  const hashMap = fragment.get("map");
  const selectedMap = maps.find((map) => map.key === hashMap || map.slug === hashMap)
    ?? routeMapFromUrl(url, maps)
    ?? maps.find((map) => map.key === fallbackMapName)
    ?? maps[0];
  const center = fragment.get("center")?.split(",") ?? [];
  const centerX = finiteNumber(center[0] ?? null);
  const centerY = finiteNumber(center[1] ?? null);
  const zoom = finiteNumber(fragment.get("zoom"));

  return {
    mapName: selectedMap?.key ?? fallbackMapName,
    poi: fragment.get("poi"),
    type: fragment.get("type"),
    viewport: centerX !== null && centerY !== null && zoom !== null
      ? { centerX, centerY, zoom }
      : null,
  };
}

export function buildCanonicalMapUrl(
  input: string | URL,
  localeSlug: string,
  map: MapRouteEntry,
  updates: MapLocationUpdates = {},
) {
  const url = input instanceof URL ? new URL(input) : new URL(input, "https://atlas.invalid");
  url.pathname = `/${localeSlug}/tools/map/${map.slug}/`;
  const fragment = new URLSearchParams(url.hash.replace(/^#/u, ""));
  fragment.delete("map");
  url.hash = fragment.toString() ? `#${fragment.toString()}` : "";
  return applyLocationUpdates(url, updates);
}

export function buildMapFragmentUrl(
  input: string | URL,
  updates: MapLocationUpdates = {},
) {
  const url = input instanceof URL ? new URL(input) : new URL(input, "https://atlas.invalid");
  return applyLocationUpdates(url, updates);
}

export function localizedMapUrl(
  input: string | URL,
  localeSlug: string,
  map: MapRouteEntry,
) {
  return buildCanonicalMapUrl(input, localeSlug, map).toString();
}
