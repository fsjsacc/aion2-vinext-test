"use client";

/* Local marker sprites intentionally bypass the image optimizer. */
/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  LoaderCircle,
  ListPlus,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Route as RouteIcon,
  Share2,
  Trash2,
  Undo2,
  X,
} from "lucide-react";

import { trackEvent } from "@/app/analytics";
import { addChecklistItem } from "@/app/checklist-store";

import { resolveMapAssetUrl } from "./asset-url";
import {
  MapLibreMap,
  type InteractiveMapErrorEvent,
  type MapLibreMapHandle,
} from "./MapLibreMap";
import {
  DEFAULT_LOCALE,
  LANGUAGE_OPTIONS,
  LOCALE_STORAGE_KEY,
  UI_TEXT,
  isLocale,
  mapDataLocaleForLocale,
  numberLocaleForMapLocale,
  routeLocaleForMapLocale,
} from "./i18n";
import type {
  Locale,
  MapInfo,
  MapI18nPayload,
  MapPayload,
  Marker,
  Subtype,
} from "./map-types";
import {
  MAX_ROUTE_MARKERS,
  decodeSharedPoint,
  decodeSharedProgress,
  decodeSharedRoute,
  encodeSharedPoint,
  encodeSharedMapProgress,
  encodeSharedRoute,
} from "./share-state";
import {
  createPointShareCard,
  createProgressShareCard,
  createRouteShareCard,
  pointShareCardFilename,
  progressShareCardFilename,
  routeShareCardFilename,
} from "./share-card";

const mapOrder = [
  "World_L_B",
  "World_D_B",
  "World_L_A",
  "World_D_A",
  "World_L_Starter",
  "World_D_Starter",
  "Abyss_Reshanta_A",
  "Abyss_Reshanta_B",
  "Abyss_Reshanta_C",
  "ReforgedAbyss",
];

const categoryPalette: Record<string, string> = {
  location: "#42d6ff",
  gathering: "#58d68d",
  creature: "#f47c48",
  collection: "#c49cff",
  quest: "#f4cf4f",
  unknown: "#cbd5e1",
};

const FOUND_STORAGE_PREFIX = "aion2-map-found-v1";
const FILTER_STORAGE_PREFIX = "aion2-map-filters-v1";
const FOUND_BROADCAST_CHANNEL = "aion2-map-found-sync-v1";
const MARKER_PAGE_SIZE = 120;
const RESOURCE_TIMEOUT_MS = 45_000;
const MAP_ENGINE_TIMEOUT_MS = 45_000;

type LoadStatus =
  | { status: "loading" }
  | { status: "ready" }
  | { status: "error"; reason: "failed" | "timeout" };

type MapEngineStatus =
  | { status: "loading" }
  | { status: "ready" }
  | { status: "error"; message: string };

type FullscreenMode = "off" | "native" | "fallback";

type InertSnapshot = {
  element: HTMLElement;
  inert: boolean;
};

type SharedMapProgress = {
  mapName: string;
  foundMarkerIds: Set<string>;
  foundCount: number;
  totalCount: number;
};

type ShareImagePreview = {
  kind: "progress" | "point" | "route";
  blob: Blob;
  imageUrl: string;
  shareUrl: string;
  fileName: string;
  title: string;
  shareText: string;
  mapName: string;
  heading: string;
  summaryLabel: string;
  summaryValue: string;
  copiedMessage: string;
};

function formatNumber(value: number, locale: Locale) {
  return Math.round(value).toLocaleString(numberLocaleForMapLocale(locale));
}

function displayColor(marker: Marker) {
  if (marker.color && marker.color !== "#000000") return marker.color;
  return categoryPalette[marker.category] ?? categoryPalette.unknown;
}

function markerIconUrl(marker: Marker, map?: MapInfo, assetBasePath?: string) {
  const icon =
    map?.type === "dark" && marker.darkIconUrl
      ? marker.darkIconUrl
      : marker.iconUrl || marker.darkIconUrl || "";
  return resolveMapAssetUrl(icon, assetBasePath);
}

function subtypeIconUrl(subtype: Subtype, map?: MapInfo, assetBasePath?: string) {
  const icon =
    map?.type === "dark" && subtype.darkIconUrl
      ? subtype.darkIconUrl
      : subtype.iconUrl || subtype.darkIconUrl || "";
  return resolveMapAssetUrl(icon, assetBasePath);
}

function normalizeSearch(value: string, locale: Locale) {
  return value.trim().toLocaleLowerCase(locale);
}

function initialTypesCollapsed() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 920px)").matches;
}

function initialDetailCollapsed() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
}

function parseStoredStringSet(value: string | null) {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;
    return new Set(parsed.filter((item): item is string => typeof item === "string"));
  } catch {
    return null;
  }
}

function readStoredStringSet(key: string) {
  try {
    return parseStoredStringSet(window.localStorage.getItem(key));
  } catch {
    return null;
  }
}

function writeStoredStringSet(key: string, value: Set<string>) {
  try {
    window.localStorage.setItem(key, JSON.stringify([...value]));
    return true;
  } catch {
    return false;
  }
}

function decodeProgressForMap(
  payload: MapPayload,
  mapName: string,
  token: string,
): SharedMapProgress | null {
  const decoded = decodeSharedProgress(payload, token);
  if (!decoded) return null;
  if (decoded.scope.kind === "current-map" && decoded.scope.mapName !== mapName) return null;
  const decodedIds = decoded.byMapName.get(mapName);
  if (!decodedIds) return null;

  const markers = payload.markersByMap[mapName] ?? [];
  const validIds = new Set(markers.map((marker) => marker.id));
  const foundMarkerIds = new Set([...decodedIds].filter((markerId) => validIds.has(markerId)));
  return {
    mapName,
    foundMarkerIds,
    foundCount: foundMarkerIds.size,
    totalCount: markers.length,
  };
}

async function copyText(value: string) {
  if (window.navigator.clipboard?.writeText) {
    try {
      await window.navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Fall through to the selection-based copy path.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  try {
    textarea.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

function updateCurrentUrl(
  update: (url: URL, hash: URLSearchParams) => void,
  mode: "push" | "replace" = "replace",
) {
  const url = new URL(window.location.href);
  const hash = new URLSearchParams(url.hash.slice(1));
  update(url, hash);
  if (url.searchParams.has("m")) url.searchParams.delete("map");
  if (url.searchParams.has("l")) url.searchParams.delete("lang");
  url.hash = hash.toString();
  const method = mode === "push" ? "pushState" : "replaceState";
  window.history[method](window.history.state, "", url);
}

function clearHashParameters(hash: URLSearchParams, names: string[]) {
  for (const name of names) hash.delete(name);
}

export function InteractiveMap({
  initialServerLocale = DEFAULT_LOCALE,
  initialMapName = "World_L_A",
  embedded: embeddedMode = false,
  assetBasePath,
}: {
  initialServerLocale?: Locale;
  initialMapName?: string;
  embedded?: boolean;
  assetBasePath?: string;
}) {
  const [payload, setPayload] = useState<MapPayload | null>(null);
  const [translations, setTranslations] = useState<MapI18nPayload | null>(null);
  const [mapDataLoad, setMapDataLoad] = useState<LoadStatus>({ status: "loading" });
  const [translationLoad, setTranslationLoad] = useState<LoadStatus>({ status: "loading" });
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [locale, setLocale] = useState<Locale>(initialServerLocale);
  const [selectedMapName, setSelectedMapName] = useState(initialMapName);
  const [embedded, setEmbedded] = useState(embeddedMode);
  const [query, setQuery] = useState("");
  const [selectedSubtypes, setSelectedSubtypes] = useState<Set<string>>(new Set());
  const [urlRequestedSubtype, setUrlRequestedSubtype] = useState<string | null>(null);
  const [filterMapName, setFilterMapName] = useState("");
  const [foundMarkerIds, setFoundMarkerIds] = useState<Set<string>>(new Set());
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(false);
  const [showRegions, setShowRegions] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [typesCollapsed, setTypesCollapsed] = useState(false);
  const [detailCollapsed, setDetailCollapsed] = useState(false);
  const [sharedProgress, setSharedProgress] = useState<SharedMapProgress | null>(null);
  const [forcedVisibleMarkerIds, setForcedVisibleMarkerIds] = useState<Set<string>>(new Set());
  const [routeMode, setRouteMode] = useState(false);
  const [routeMarkerIds, setRouteMarkerIds] = useState<string[]>([]);
  const [markerPage, setMarkerPage] = useState(0);
  const [mapEngineAttempt, setMapEngineAttempt] = useState(0);
  const [locationApplyVersion, setLocationApplyVersion] = useState(0);
  const [mapEngineStatus, setMapEngineStatus] = useState<MapEngineStatus>({ status: "loading" });
  const [shareNotice, setShareNotice] = useState("");
  const [sharePreview, setSharePreview] = useState<ShareImagePreview | null>(null);
  const [isGeneratingShareImage, setIsGeneratingShareImage] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState<FullscreenMode>("off");
  const mapShellRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<MapLibreMapHandle | null>(null);
  const mapViewportRef = useRef<HTMLDivElement | null>(null);
  const coordinateRef = useRef<HTMLDivElement | null>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement | null>(null);
  const fullscreenModeRef = useRef<FullscreenMode>("off");
  const fullscreenTriggerRef = useRef<"button" | "escape" | "browser">("browser");
  const fullscreenScrollRef = useRef({ x: 0, y: 0 });
  const inertSnapshotsRef = useRef<InertSnapshot[]>([]);
  const collapseSidebarButtonRef = useRef<HTMLButtonElement | null>(null);
  const expandSidebarButtonRef = useRef<HTMLButtonElement | null>(null);
  const shareDialogRef = useRef<HTMLElement | null>(null);
  const shareDialogCloseRef = useRef<HTMLButtonElement | null>(null);
  const modalReturnFocusRef = useRef<HTMLElement | null>(null);
  const foundBroadcastRef = useRef<BroadcastChannel | null>(null);
  const mapEngineReadyRef = useRef(false);
  const mapEngineStartedAtRef = useRef<number | null>(null);
  const pendingSharedPointIdRef = useRef<string | null>(null);
  const pendingSharedRouteIdsRef = useRef<string[] | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const analyticsOpenKeyRef = useRef("");
  const analyticsReadyKeyRef = useRef("");
  const analyticsMarkerOpenKeyRef = useRef("");
  const markerEntrySourceRef = useRef<
    "map-canvas" | "map-canvas-route" | "marker-list" | "marker-list-route" | "shared-link"
  >("shared-link");
  const text = UI_TEXT[locale];
  const MapRoot = embedded ? "section" : "main";
  const MapTitle = embedded ? "h2" : "h1";
  const isFullscreen = fullscreenMode !== "off";

  const scheduleMapResize = useCallback(() => {
    const frame = window.requestAnimationFrame(() => mapRef.current?.resize());
    const settled = window.setTimeout(() => mapRef.current?.resize(), 220);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settled);
    };
  }, []);

  const restoreFallbackDocument = useCallback(() => {
    delete document.documentElement.dataset.mapFullscreen;
    for (const snapshot of inertSnapshotsRef.current) {
      if (snapshot.element.isConnected) snapshot.element.inert = snapshot.inert;
    }
    inertSnapshotsRef.current = [];
  }, []);

  const prepareFallbackDocument = useCallback((shell: HTMLElement) => {
    const snapshots: InertSnapshot[] = [];
    let current: HTMLElement | null = shell;

    while (current && current !== document.body) {
      const parentElement: HTMLElement | null = current.parentElement;
      if (!parentElement) break;
      for (const sibling of parentElement.children) {
        if (sibling === current || !(sibling instanceof HTMLElement)) continue;
        snapshots.push({ element: sibling, inert: sibling.inert });
        sibling.inert = true;
      }
      current = parentElement;
    }

    inertSnapshotsRef.current = snapshots;
    document.documentElement.dataset.mapFullscreen = "fallback";
  }, []);

  const commitFullscreenMode = useCallback(
    (
      nextMode: FullscreenMode,
      trigger: "button" | "escape" | "browser",
      options: { track?: boolean; restoreFocus?: boolean } = {},
    ) => {
      const previousMode = fullscreenModeRef.current;
      if (previousMode === nextMode) return;

      if (previousMode !== "off") restoreFallbackDocument();
      if (nextMode === "fallback" && mapShellRef.current) {
        prepareFallbackDocument(mapShellRef.current);
      } else if (nextMode === "native") {
        document.documentElement.dataset.mapFullscreen = "native";
      }

      fullscreenModeRef.current = nextMode;
      setFullscreenMode(nextMode);
      scheduleMapResize();

      if (options.track !== false) {
        const activeMode = nextMode === "off" ? previousMode : nextMode;
        trackEvent("map_fullscreen_change", {
          action: nextMode === "off" ? "exit" : "enter",
          mode: activeMode,
          trigger,
          locale: locale.toLowerCase(),
          map_name: selectedMapName,
          embedded,
          surface: "interactive-map",
          target_kind: "map",
          target_key: selectedMapName,
        });
      }

      if (nextMode === "off") {
        window.requestAnimationFrame(() => {
          window.scrollTo(fullscreenScrollRef.current.x, fullscreenScrollRef.current.y);
          if (options.restoreFocus !== false) fullscreenButtonRef.current?.focus();
        });
      }
    },
    [
      embedded,
      locale,
      prepareFallbackDocument,
      restoreFallbackDocument,
      scheduleMapResize,
      selectedMapName,
    ],
  );

  const toggleFullscreen = useCallback(async () => {
    const shell = mapShellRef.current;
    if (!shell) return;

    if (fullscreenModeRef.current === "fallback") {
      commitFullscreenMode("off", "button");
      return;
    }

    if (
      fullscreenModeRef.current === "native" ||
      document.fullscreenElement === shell
    ) {
      fullscreenTriggerRef.current = "button";
      try {
        await document.exitFullscreen();
      } catch {
        if (document.fullscreenElement !== shell) {
          commitFullscreenMode("off", "button");
        }
      }
      return;
    }

    fullscreenScrollRef.current = { x: window.scrollX, y: window.scrollY };
    fullscreenTriggerRef.current = "button";

    if (typeof shell.requestFullscreen === "function") {
      try {
        await shell.requestFullscreen();
        if (document.fullscreenElement === shell) {
          commitFullscreenMode("native", "button");
        }
        return;
      } catch {
        // Browsers without element fullscreen support use the CSS viewport fallback.
      }
    }

    commitFullscreenMode("fallback", "button");
  }, [commitFullscreenMode]);

  const showNotice = useCallback((message: string) => {
    setShareNotice(message);
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => {
      setShareNotice("");
      noticeTimerRef.current = null;
    }, 2800);
  }, []);

  useEffect(
    () => () => {
      if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    },
    [],
  );

  const closeSharePreview = useCallback(() => setSharePreview(null), []);

  const captureShareReturnFocus = useCallback(() => {
    const activeElement = document.activeElement;
    modalReturnFocusRef.current =
      activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null;
  }, []);

  const restoreShareReturnFocus = useCallback(() => {
    const returnTarget = modalReturnFocusRef.current;
    modalReturnFocusRef.current = null;
    if (returnTarget?.isConnected) {
      window.requestAnimationFrame(() => returnTarget.focus());
    }
  }, []);

  useEffect(() => {
    if (!sharePreview) return;
    const activeElement = document.activeElement;
    if (
      !modalReturnFocusRef.current &&
      activeElement instanceof HTMLElement &&
      activeElement !== document.body
    ) {
      modalReturnFocusRef.current = activeElement;
    }
    const focusFrame = window.requestAnimationFrame(() => shareDialogCloseRef.current?.focus());
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSharePreview();
        return;
      }
      if (event.key !== "Tab" || !shareDialogRef.current) return;
      const focusable = [...shareDialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hasAttribute("hidden"));
      if (focusable.length === 0) {
        event.preventDefault();
        shareDialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleDialogKeys);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleDialogKeys);
      URL.revokeObjectURL(sharePreview.imageUrl);
      restoreShareReturnFocus();
    };
  }, [closeSharePreview, restoreShareReturnFocus, sharePreview]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const shell = mapShellRef.current;
      if (shell && document.fullscreenElement === shell) {
        commitFullscreenMode("native", fullscreenTriggerRef.current);
      } else if (fullscreenModeRef.current === "native") {
        commitFullscreenMode("off", fullscreenTriggerRef.current);
      }
      fullscreenTriggerRef.current = "browser";
    };

    const handleFullscreenKey = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" ||
        event.defaultPrevented ||
        sharePreview ||
        fullscreenModeRef.current !== "fallback"
      ) {
        return;
      }
      event.preventDefault();
      commitFullscreenMode("off", "escape");
    };

    const handlePageHide = () => {
      if (fullscreenModeRef.current === "fallback") {
        commitFullscreenMode("off", "browser", {
          track: false,
          restoreFocus: false,
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleFullscreenKey);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleFullscreenKey);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [commitFullscreenMode, sharePreview]);

  useEffect(
    () => () => {
      restoreFallbackDocument();
      const shell = mapShellRef.current;
      if (shell && document.fullscreenElement === shell) {
        void document.exitFullscreen().catch(() => undefined);
      }
    },
    [restoreFallbackDocument],
  );

  useEffect(() => {
    return scheduleMapResize();
  }, [scheduleMapResize, sidebarCollapsed]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLocale(initialServerLocale);
      setEmbedded(embeddedMode);
      setTypesCollapsed(initialTypesCollapsed());
      setDetailCollapsed(initialDetailCollapsed());
    });
    return () => window.cancelAnimationFrame(frame);
  }, [embeddedMode, initialServerLocale]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }, [locale]);

  useEffect(() => {
    let alive = true;
    const controllers: AbortController[] = [];

    const loadResource = async <T,>(
      url: string,
      setStatus: (status: LoadStatus) => void,
      setValue: (value: T) => void,
    ) => {
      const controller = new AbortController();
      controllers.push(controller);
      let timedOut = false;
      const timeout = window.setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, RESOURCE_TIMEOUT_MS);
      try {
        const response = await fetch(url, { cache: "force-cache", signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const value = (await response.json()) as T;
        if (!alive) return;
        setValue(value);
        setStatus({ status: "ready" });
      } catch (error) {
        if (!alive) return;
        console.error(`Failed to load ${url}`, error);
        setStatus({ status: "error", reason: timedOut ? "timeout" : "failed" });
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void loadResource<MapPayload>("/data/aion2-map-data.json", setMapDataLoad, setPayload);
    void loadResource<MapI18nPayload>(
      "/data/aion2-map-i18n.json",
      setTranslationLoad,
      setTranslations,
    );
    return () => {
      alive = false;
      for (const controller of controllers) controller.abort();
    };
  }, [loadAttempt]);

  const applyLocationState = useCallback(() => {
    if (!payload) return;
    const url = new URL(window.location.href);
    const requestedLocale = url.searchParams.get("l") ?? url.searchParams.get("lang");
    const nextLocale = isLocale(requestedLocale) ? requestedLocale : initialServerLocale;
    const requestedMapName = url.searchParams.get("m") ?? url.searchParams.get("map");
    const fallbackMap =
      payload.maps.find((map) => map.name === initialMapName) ??
      payload.maps.find((map) => map.name === "World_L_A") ??
      payload.maps[0];
    const requestedMap =
      payload.maps.find((map) => map.name === requestedMapName) ?? fallbackMap;
    if (!requestedMap) return;

    const hash = new URLSearchParams(url.hash.slice(1));
    const requestedSubtype = hash.get("type")?.trim() || null;
    const routeToken = hash.get("r") ?? hash.get("route");
    const decodedRoute = routeToken
      ? decodeSharedRoute(payload, requestedMap.name, routeToken)
      : null;
    const pointToken = hash.get("pt");
    const legacyPointId = hash.get("point") ?? hash.get("poi");
    const compactPointId = pointToken
      ? decodeSharedPoint(payload, requestedMap.name, pointToken)
      : null;
    const legacyPointMap = legacyPointId
      ? payload.maps.find((map) =>
          (payload.markersByMap[map.name] ?? []).some((marker) => marker.id === legacyPointId),
        ) ?? null
      : null;
    const requestedPointId = compactPointId ?? (legacyPointMap ? legacyPointId : null);
    const pointMap = compactPointId ? requestedMap : legacyPointMap;
    const targetMap = decodedRoute ? requestedMap : pointMap ?? requestedMap;

    setLocale(nextLocale);
    setEmbedded(embeddedMode || url.searchParams.get("embed") === "1");
    setUrlRequestedSubtype(requestedSubtype);
    if (targetMap.name !== selectedMapName) {
      setMapEngineStatus({ status: "loading" });
    }
    setSelectedMapName(targetMap.name);
    setMarkerPage(0);
    pendingSharedPointIdRef.current = null;
    pendingSharedRouteIdsRef.current = null;
    setLocationApplyVersion((version) => version + 1);

    if (routeToken) {
      setSharedProgress(null);
      setSelectedMarkerId(null);
      if (decodedRoute) {
        pendingSharedRouteIdsRef.current = decodedRoute;
        setRouteMarkerIds(decodedRoute);
        setForcedVisibleMarkerIds(new Set(decodedRoute));
        setRouteMode(true);
      } else {
        setRouteMarkerIds([]);
        setForcedVisibleMarkerIds(new Set());
        setRouteMode(false);
        showNotice(UI_TEXT[nextLocale].sharedRouteInvalid);
      }
      return;
    }

    if (pointToken || legacyPointId) {
      setSharedProgress(null);
      setRouteMarkerIds([]);
      setRouteMode(false);
      if (requestedPointId && pointMap) {
        pendingSharedPointIdRef.current = requestedPointId;
        markerEntrySourceRef.current = "shared-link";
        setSelectedMarkerId(requestedPointId);
        setForcedVisibleMarkerIds(new Set([requestedPointId]));
      } else {
        setSelectedMarkerId(null);
        setForcedVisibleMarkerIds(new Set());
        showNotice(UI_TEXT[nextLocale].shareFailed);
      }
      return;
    }

    setSelectedMarkerId(null);
    setRouteMarkerIds([]);
    setRouteMode(false);
    setForcedVisibleMarkerIds(new Set());
    const progressToken = hash.get("p") ?? hash.get("progress");
    if (progressToken) {
      const decodedProgress = decodeProgressForMap(payload, requestedMap.name, progressToken);
      if (decodedProgress) setSharedProgress(decodedProgress);
      else {
        setSharedProgress(null);
        showNotice(UI_TEXT[nextLocale].sharedProgressInvalid);
      }
    } else {
      setSharedProgress(null);
    }
  }, [embeddedMode, initialMapName, initialServerLocale, payload, selectedMapName, showNotice]);

  useEffect(() => {
    if (!payload) return;
    const applyFrame = window.requestAnimationFrame(applyLocationState);
    window.addEventListener("hashchange", applyLocationState);
    window.addEventListener("popstate", applyLocationState);
    return () => {
      window.cancelAnimationFrame(applyFrame);
      window.removeEventListener("hashchange", applyLocationState);
      window.removeEventListener("popstate", applyLocationState);
    };
  }, [applyLocationState, payload]);

  const maps = useMemo(() => {
    if (!payload) return [];
    return [...payload.maps].sort((a, b) => {
      const aIndex = mapOrder.indexOf(a.name);
      const bIndex = mapOrder.indexOf(b.name);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    });
  }, [payload]);

  const selectedMap = useMemo(
    () => maps.find((item) => item.name === selectedMapName) ?? maps[0],
    [maps, selectedMapName],
  );

  // Map entity translations currently ship only in zh-Hant, en, and ko.
  // New public UI languages intentionally reuse the English data bundle
  // instead of requesting a bundle that does not exist.
  const mapDataLocale = mapDataLocaleForLocale(locale);
  const localeBundle =
    translations?.locales[mapDataLocale] ?? translations?.locales.en;

  const sourceMarkers = useMemo(() => {
    if (!payload || !selectedMap) return [];
    return payload.markersByMap[selectedMap.name] ?? [];
  }, [payload, selectedMap]);

  const selectedMapDataUnavailable = Boolean(selectedMap && sourceMarkers.length === 0);

  const validMarkerIdsByMap = useMemo(() => {
    const result = new Map<string, Set<string>>();
    if (!payload) return result;
    for (const map of payload.maps) {
      result.set(
        map.name,
        new Set((payload.markersByMap[map.name] ?? []).map((marker) => marker.id)),
      );
    }
    return result;
  }, [payload]);

  const markers = useMemo(() => {
    if (!localeBundle) return sourceMarkers;
    return sourceMarkers.map((marker) => {
      const translated = localeBundle.markers[marker.id];
      const subtypeLabel = localeBundle.subtypes[marker.subtype] ?? marker.subtypeLabel;
      return {
        ...marker,
        name: translated?.name || subtypeLabel,
        description: translated?.description ?? marker.description,
        subtypeLabel,
        categoryLabel: localeBundle.categories[marker.category] ?? marker.categoryLabel,
      };
    });
  }, [localeBundle, sourceMarkers]);

  const sourceRegions = useMemo(() => {
    if (!payload || !selectedMap) return [];
    return payload.regionsByMap[selectedMap.name] ?? [];
  }, [payload, selectedMap]);

  const regions = useMemo(() => {
    const labels = selectedMap ? localeBundle?.regions[selectedMap.name] : undefined;
    if (!labels) return sourceRegions;
    return sourceRegions.map((region) => ({
      ...region,
      label: labels[region.name] ?? region.label,
    }));
  }, [localeBundle, selectedMap, sourceRegions]);

  const selectedMapText = useMemo(() => {
    if (!selectedMap) return null;
    return (
      localeBundle?.maps[selectedMap.name] ?? {
        name: selectedMap.displayName,
        description: selectedMap.description || selectedMap.type,
      }
    );
  }, [localeBundle, selectedMap]);

  useEffect(() => {
    if (!payload || !selectedMap) return;
    const key = `${selectedMap.name}:${locale}`;
    if (analyticsOpenKeyRef.current === key) return;
    analyticsOpenKeyRef.current = key;
    trackEvent("tool_open", {
      tool_name: "interactive_map",
      locale,
      map_name: selectedMap.name,
      embedded,
    });
  }, [embedded, locale, payload, selectedMap]);

  const categoriesForMap = useMemo(() => {
    if (!payload) return [];
    const subtypeCounts = new Map<string, number>();
    for (const marker of sourceMarkers) {
      subtypeCounts.set(marker.subtype, (subtypeCounts.get(marker.subtype) ?? 0) + 1);
    }
    return payload.categories
      .map((category) => ({
        ...category,
        subtypes: category.subtypes
          .filter((subtype) => subtypeCounts.has(subtype.name))
          .map((subtype) => ({
            ...subtype,
            count: subtypeCounts.get(subtype.name) ?? 0,
          })),
      }))
      .filter((category) => category.subtypes.length > 0)
      .map((category) => ({
        ...category,
        count: category.subtypes.reduce((total, subtype) => total + subtype.count, 0),
      }));
  }, [payload, sourceMarkers]);

  const allSubtypeNamesForMap = useMemo(
    () => categoriesForMap.flatMap((category) => category.subtypes.map((subtype) => subtype.name)),
    [categoriesForMap],
  );
  const activeUrlSubtype = useMemo(
    () =>
      urlRequestedSubtype && allSubtypeNamesForMap.includes(urlRequestedSubtype)
        ? urlRequestedSubtype
        : null,
    [allSubtypeNamesForMap, urlRequestedSubtype],
  );

  const activeFoundMarkerIds = useMemo(
    () =>
      selectedMap && sharedProgress?.mapName === selectedMap.name
        ? sharedProgress.foundMarkerIds
        : foundMarkerIds,
    [foundMarkerIds, selectedMap, sharedProgress],
  );

  const foundCountsBySubtype = useMemo(() => {
    const counts = new Map<string, number>();
    for (const marker of markers) {
      if (!activeFoundMarkerIds.has(marker.id)) continue;
      counts.set(marker.subtype, (counts.get(marker.subtype) ?? 0) + 1);
    }
    return counts;
  }, [activeFoundMarkerIds, markers]);

  const buildCollectibleBreakdown = useCallback(
    (foundIds: ReadonlySet<string>) => {
      const counts = new Map<string, number>();
      for (const marker of markers) {
        if (!foundIds.has(marker.id)) continue;
        counts.set(marker.subtype, (counts.get(marker.subtype) ?? 0) + 1);
      }
      return categoriesForMap.flatMap((category) =>
        category.subtypes
          .filter((subtype) => subtype.canComplete)
          .map((subtype) => ({
            name: localeBundle?.subtypes[subtype.name] ?? subtype.label,
            foundCount: counts.get(subtype.name) ?? 0,
            totalCount: subtype.count,
            iconUrl: subtypeIconUrl(subtype, selectedMap, assetBasePath),
          })),
      );
    },
    [assetBasePath, categoriesForMap, localeBundle, markers, selectedMap],
  );

  useEffect(() => {
    if (!selectedMap) return;
    const allowed = new Set(allSubtypeNamesForMap);
    const stored = readStoredStringSet(`${FILTER_STORAGE_PREFIX}:${selectedMap.name}`);
    let next = activeUrlSubtype
      ? new Set([activeUrlSubtype])
      : stored
        ? new Set([...stored].filter((subtypeName) => allowed.has(subtypeName)))
        : new Set(
            categoriesForMap
              .filter((category) => category.name === "location")
              .flatMap((category) => category.subtypes.map((subtype) => subtype.name)),
          );

    if (
      !activeUrlSubtype &&
      stored === null &&
      selectedMap.type === "abyss" &&
      allowed.has("monolithMaterial")
    ) {
      next.add("monolithMaterial");
    }
    if (
      !activeUrlSubtype &&
      stored === null &&
      next.size === 0 &&
      allSubtypeNamesForMap.length > 0
    ) {
      next = new Set(categoriesForMap[0]?.subtypes.map((subtype) => subtype.name) ?? []);
    }

    const pendingRouteIds = pendingSharedRouteIdsRef.current;
    const hasPendingSharedState =
      pendingSharedPointIdRef.current !== null || pendingRouteIds !== null;
    const frame = requestAnimationFrame(() => {
      setSelectedSubtypes(next);
      setFilterMapName(selectedMap.name);
      if (!hasPendingSharedState) setSelectedMarkerId(null);
      if (coordinateRef.current) coordinateRef.current.textContent = "0, 0";
    });
    return () => cancelAnimationFrame(frame);
  }, [activeUrlSubtype, allSubtypeNamesForMap, categoriesForMap, selectedMap]);

  useEffect(() => {
    if (!selectedMap || filterMapName !== selectedMap.name || activeUrlSubtype) return;
    writeStoredStringSet(`${FILTER_STORAGE_PREFIX}:${selectedMap.name}`, selectedSubtypes);
  }, [activeUrlSubtype, filterMapName, selectedMap, selectedSubtypes]);

  const readLatestFoundForMap = useCallback(
    (mapName: string, fallback: ReadonlySet<string> = new Set<string>()) => {
      const validIds = validMarkerIdsByMap.get(mapName) ?? new Set<string>();
      const stored = readStoredStringSet(`${FOUND_STORAGE_PREFIX}:${mapName}`);
      return new Set(
        [...(stored ?? fallback)].filter((markerId) => validIds.has(markerId)),
      );
    },
    [validMarkerIdsByMap],
  );

  const persistFoundForMap = useCallback(
    async (
      mapName: string,
      fallback: ReadonlySet<string>,
      update: (latest: Set<string>) => void,
    ) => {
      const commit = () => {
        const next = readLatestFoundForMap(mapName, fallback);
        update(next);
        const saved = writeStoredStringSet(`${FOUND_STORAGE_PREFIX}:${mapName}`, next);
        if (saved) {
          foundBroadcastRef.current?.postMessage({ mapName, markerIds: [...next] });
        }
        return { next, saved };
      };
      if (window.navigator.locks) {
        return window.navigator.locks.request(`${FOUND_STORAGE_PREFIX}:${mapName}`, commit);
      }
      return commit();
    },
    [readLatestFoundForMap],
  );

  useEffect(() => {
    if (!selectedMap) return;
    const next = readLatestFoundForMap(selectedMap.name);
    const frame = requestAnimationFrame(() => setFoundMarkerIds(next));
    return () => cancelAnimationFrame(frame);
  }, [readLatestFoundForMap, selectedMap]);

  useEffect(() => {
    if (!payload) return;
    const applyIncomingProgress = (mapName: string, incoming: ReadonlySet<string>) => {
      const validIds = validMarkerIdsByMap.get(mapName);
      if (!validIds || selectedMap?.name !== mapName) return;
      setFoundMarkerIds(new Set([...incoming].filter((markerId) => validIds.has(markerId))));
    };
    const handleStorage = (event: StorageEvent) => {
      const keyPrefix = `${FOUND_STORAGE_PREFIX}:`;
      if (!event.key?.startsWith(keyPrefix)) return;
      const mapName = event.key.slice(keyPrefix.length);
      applyIncomingProgress(mapName, parseStoredStringSet(event.newValue) ?? new Set<string>());
    };
    const refreshCurrentMap = () => {
      if (selectedMap) setFoundMarkerIds(readLatestFoundForMap(selectedMap.name));
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", refreshCurrentMap);
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      try {
        channel = new BroadcastChannel(FOUND_BROADCAST_CHANNEL);
        foundBroadcastRef.current = channel;
        channel.onmessage = (event: MessageEvent<unknown>) => {
          if (!event.data || typeof event.data !== "object") return;
          const message = event.data as { mapName?: unknown; markerIds?: unknown };
          if (typeof message.mapName !== "string" || !Array.isArray(message.markerIds)) return;
          applyIncomingProgress(
            message.mapName,
            new Set(message.markerIds.filter((id): id is string => typeof id === "string")),
          );
        };
      } catch {
        channel = null;
      }
    }
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", refreshCurrentMap);
      channel?.close();
      if (foundBroadcastRef.current === channel) foundBroadcastRef.current = null;
    };
  }, [payload, readLatestFoundForMap, selectedMap, validMarkerIdsByMap]);

  useEffect(() => {
    const markerId = pendingSharedPointIdRef.current;
    if (!markerId || !selectedMap) return;
    const marker = markers.find((item) => item.id === markerId);
    if (!marker) return;

    pendingSharedPointIdRef.current = null;
    setSelectedMarkerId(marker.id);
    const frame = requestAnimationFrame(() => {
      setDetailCollapsed(initialDetailCollapsed());
      mapRef.current?.focusMarker(marker);
    });
    return () => cancelAnimationFrame(frame);
  }, [locationApplyVersion, markers, selectedMap]);

  useEffect(() => {
    const markerIds = pendingSharedRouteIdsRef.current;
    if (!markerIds || !selectedMap) return;
    const markerById = new Map(markers.map((marker) => [marker.id, marker]));
    const sharedRouteMarkers = markerIds
      .map((markerId) => markerById.get(markerId))
      .filter((marker): marker is Marker => Boolean(marker));
    if (sharedRouteMarkers.length < 2) return;

    pendingSharedRouteIdsRef.current = null;
    setRouteMarkerIds(sharedRouteMarkers.map((marker) => marker.id));
    setRouteMode(true);
    const frame = requestAnimationFrame(() => {
      mapRef.current?.fitRoute(sharedRouteMarkers);
    });
    return () => cancelAnimationFrame(frame);
  }, [locationApplyVersion, markers, selectedMap]);

  const deferredQuery = useDeferredValue(query);

  const filteredMarkers = useMemo(() => {
    const normalized = normalizeSearch(deferredQuery, locale);
    return markers.filter((marker) => {
      if (forcedVisibleMarkerIds.has(marker.id)) return true;
      if (!selectedSubtypes.has(marker.subtype)) return false;
      if (!normalized) return true;
      return (
        marker.name.toLocaleLowerCase(locale).includes(normalized) ||
        marker.description.toLocaleLowerCase(locale).includes(normalized) ||
        marker.subtypeLabel.toLocaleLowerCase(locale).includes(normalized) ||
        marker.categoryLabel.toLocaleLowerCase(locale).includes(normalized)
      );
    });
  }, [deferredQuery, forcedVisibleMarkerIds, locale, markers, selectedSubtypes]);

  const markerPageCount = Math.max(1, Math.ceil(filteredMarkers.length / MARKER_PAGE_SIZE));
  const activeMarkerPage = Math.min(markerPage, markerPageCount - 1);
  const markerPageStart = activeMarkerPage * MARKER_PAGE_SIZE;
  const pagedMarkers = filteredMarkers.slice(
    markerPageStart,
    markerPageStart + MARKER_PAGE_SIZE,
  );
  const markerRangeStart = filteredMarkers.length === 0 ? 0 : markerPageStart + 1;
  const markerRangeEnd = Math.min(markerPageStart + MARKER_PAGE_SIZE, filteredMarkers.length);

  const selectedMarker = useMemo(
    () => markers.find((marker) => marker.id === selectedMarkerId) ?? null,
    [markers, selectedMarkerId],
  );

  useEffect(() => {
    if (!selectedMap || !selectedMarker) {
      analyticsMarkerOpenKeyRef.current = "";
      return;
    }
    const markerOpenKey = `${selectedMap.name}:${selectedMarker.id}`;
    if (analyticsMarkerOpenKeyRef.current === markerOpenKey) return;
    analyticsMarkerOpenKeyRef.current = markerOpenKey;
    trackEvent("marker_open", {
      entry_source: markerEntrySourceRef.current,
      locale,
      map_name: selectedMap.name,
      marker_id: selectedMarker.id,
      surface: "interactive-map",
      tool_name: "interactive_map",
    });
  }, [locale, selectedMap, selectedMarker]);

  const routeMarkers = useMemo(() => {
    const markerById = new Map(markers.map((marker) => [marker.id, marker]));
    return routeMarkerIds
      .map((markerId) => markerById.get(markerId))
      .filter((marker): marker is Marker => Boolean(marker));
  }, [markers, routeMarkerIds]);

  const handleMapEngineReady = useCallback(() => {
    mapEngineReadyRef.current = true;
    setMapEngineStatus({ status: "ready" });
    if (!selectedMap) return;
    const readyKey = `${selectedMap.name}:${locale}:${mapEngineAttempt}`;
    if (analyticsReadyKeyRef.current === readyKey) return;
    analyticsReadyKeyRef.current = readyKey;
    const startedAt = mapEngineStartedAtRef.current;
    const readyDurationMs = startedAt === null
      ? undefined
      : Math.max(0, Math.round(performance.now() - startedAt));
    trackEvent("map_ready", {
      embedded,
      locale,
      map_name: selectedMap.name,
      marker_count: sourceMarkers.length,
      ready_duration_ms: readyDurationMs,
      surface: "interactive-map",
      tool_name: "interactive_map",
    });
  }, [embedded, locale, mapEngineAttempt, selectedMap, sourceMarkers.length]);

  const handleMapEngineError = useCallback((error: InteractiveMapErrorEvent) => {
    if (error.recoverable) {
      console.warn("Recoverable map engine error", error);
      showNotice(text.mapEngineWarning);
      return;
    }
    mapEngineReadyRef.current = false;
    console.error("Fatal map engine error", error);
    setMapEngineStatus({
      status: "error",
      message: text.mapEngineError,
    });
  }, [showNotice, text.mapEngineError, text.mapEngineWarning]);

  useEffect(() => {
    if (!selectedMap) return;
    mapEngineReadyRef.current = false;
    mapEngineStartedAtRef.current = performance.now();
    const timeout = window.setTimeout(() => {
      if (!mapEngineReadyRef.current) {
        setMapEngineStatus({
          status: "error",
          message: text.mapEngineError,
        });
      }
    }, MAP_ENGINE_TIMEOUT_MS);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [mapEngineAttempt, selectedMap, text.mapEngineError]);

  const regionLabelByName = useMemo(
    () => new Map(regions.map((region) => [region.name, region.label])),
    [regions],
  );

  const updateCoordinate = useCallback((x: number, y: number) => {
    if (coordinateRef.current) {
      coordinateRef.current.textContent = `${formatNumber(x, locale)}, ${formatNumber(y, locale)}`;
    }
  }, [locale]);

  const focusMarkerOnMap = useCallback((marker: Marker) => {
    setSelectedMarkerId(marker.id);
    setDetailCollapsed(initialDetailCollapsed());
    mapRef.current?.focusMarker(marker);
  }, []);

  const focusMarker = useCallback(
    (marker: Marker, entrySource: "map-canvas" | "marker-list") => {
      if (!payload || !selectedMap) return;
      markerEntrySourceRef.current = entrySource;
      focusMarkerOnMap(marker);
      setSharedProgress(null);
      setForcedVisibleMarkerIds(new Set());
      const encodedPoint = encodeSharedPoint(payload, selectedMap.name, marker.id);
      updateCurrentUrl((url, hash) => {
        url.searchParams.set("m", selectedMap.name);
        url.searchParams.set("l", locale);
        clearHashParameters(hash, ["pt", "point", "poi", "r", "route", "p", "progress"]);
        if (encodedPoint) hash.set("pt", encodedPoint);
        else hash.set("point", marker.id);
      }, "push");
    },
    [focusMarkerOnMap, locale, payload, selectedMap],
  );

  const addRouteMarker = useCallback(
    (marker: Marker, entrySource: "map-canvas-route" | "marker-list-route") => {
      markerEntrySourceRef.current = entrySource;
      focusMarkerOnMap(marker);
      setRouteMarkerIds((current) => {
        if (current.includes(marker.id)) return current;
        if (current.length >= MAX_ROUTE_MARKERS) {
          showNotice(text.routeLimitReached(MAX_ROUTE_MARKERS));
          return current;
        }
        return [...current, marker.id];
      });
    },
    [focusMarkerOnMap, showNotice, text],
  );

  const selectMarkerFromMap = useCallback(
    (markerId: string) => {
      const marker = markers.find((item) => item.id === markerId);
      if (!marker) return;
      if (routeMode) addRouteMarker(marker, "map-canvas-route");
      else focusMarker(marker, "map-canvas");
    },
    [addRouteMarker, focusMarker, markers, routeMode],
  );

  const beginRoute = useCallback(() => {
    if (!selectedMap || selectedMapDataUnavailable) return;
    setRouteMarkerIds([]);
    setRouteMode(true);
    setSelectedMarkerId(null);
    setSharedProgress(null);
    setForcedVisibleMarkerIds(new Set());
    updateCurrentUrl((url, hash) => {
      url.searchParams.set("m", selectedMap.name);
      url.searchParams.set("l", locale);
      clearHashParameters(hash, ["pt", "point", "poi", "r", "route", "p", "progress"]);
    }, "push");
  }, [locale, selectedMap, selectedMapDataUnavailable]);

  const closeRoute = useCallback(() => {
    setRouteMarkerIds([]);
    setRouteMode(false);
    setSelectedMarkerId(null);
    setForcedVisibleMarkerIds(new Set());
    updateCurrentUrl((_url, hash) => {
      clearHashParameters(hash, ["r", "route", "pt", "point", "poi"]);
    });
  }, []);

  useEffect(() => {
    if (!payload || !selectedMap || !routeMode) return;
    const encodedRoute =
      routeMarkerIds.length >= 2
        ? encodeSharedRoute(payload, selectedMap.name, routeMarkerIds)
        : null;
    updateCurrentUrl((url, hash) => {
      url.searchParams.set("m", selectedMap.name);
      url.searchParams.set("l", locale);
      clearHashParameters(hash, ["pt", "point", "poi", "route", "p", "progress"]);
      if (encodedRoute) hash.set("r", encodedRoute);
      else hash.delete("r");
    });
  }, [locale, payload, routeMarkerIds, routeMode, selectedMap]);

  const changeMap = useCallback(
    (mapName: string) => {
      setMapEngineStatus({ status: "loading" });
      setSelectedMapName(mapName);
      setMarkerPage(0);
      setSelectedMarkerId(null);
      setRouteMarkerIds([]);
      setRouteMode(false);
      setSharedProgress(null);
      setForcedVisibleMarkerIds(new Set());
      updateCurrentUrl((url, hash) => {
        url.searchParams.set("m", mapName);
        url.searchParams.set("l", locale);
        clearHashParameters(hash, ["pt", "point", "poi", "r", "route", "p", "progress"]);
      }, "push");
    },
    [locale],
  );

  const changeLocale = useCallback((nextLocale: Locale) => {
    trackEvent("language_change", {
      from: locale,
      to: nextLocale,
      surface: "interactive_map",
      data_locale: mapDataLocaleForLocale(nextLocale),
    });
    setLocale(nextLocale);
    updateCurrentUrl((url) => {
      url.searchParams.set("l", nextLocale);
    });
  }, [locale]);

  const closeMarkerDetails = useCallback(() => {
    setSelectedMarkerId(null);
    if (!routeMode) {
      setForcedVisibleMarkerIds(new Set());
      updateCurrentUrl((_url, hash) => clearHashParameters(hash, ["pt", "point", "poi"]));
    }
  }, [routeMode]);

  const collapseSidebar = useCallback(() => {
    setSidebarCollapsed(true);
    window.requestAnimationFrame(() => expandSidebarButtonRef.current?.focus());
  }, []);

  const expandSidebar = useCallback(() => {
    setSidebarCollapsed(false);
    window.requestAnimationFrame(() => collapseSidebarButtonRef.current?.focus());
  }, []);

  const toggleSubtype = (subtypeName: string) => {
    setMarkerPage(0);
    setSelectedSubtypes((current) => {
      const next = new Set(current);
      if (next.has(subtypeName)) next.delete(subtypeName);
      else next.add(subtypeName);
      return next;
    });
  };

  const setSubtypesActive = (subtypeNames: string[], active: boolean) => {
    setMarkerPage(0);
    setSelectedSubtypes((current) => {
      const next = new Set(current);
      for (const subtypeName of subtypeNames) {
        if (active) next.add(subtypeName);
        else next.delete(subtypeName);
      }
      return next;
    });
  };

  const toggleMarkerFound = useCallback(
    async (markerId: string) => {
      if (!selectedMap) return;
      const { next } = await persistFoundForMap(selectedMap.name, foundMarkerIds, (latest) => {
        if (latest.has(markerId)) latest.delete(markerId);
        else latest.add(markerId);
      });
      const isFound = next.has(markerId);
      setFoundMarkerIds(next);
      trackEvent("map_marker_found_toggle", {
        tool_name: "interactive_map",
        locale,
        map_name: selectedMap.name,
        marker_id: markerId,
        found: isFound,
        surface: "interactive-map",
      });
      if (isFound) {
        trackEvent("marker_found", {
          tool_name: "interactive_map",
          locale,
          map_name: selectedMap.name,
          marker_id: markerId,
          found: true,
          surface: "interactive-map",
        });
      }
    },
    [foundMarkerIds, locale, persistFoundForMap, selectedMap],
  );

  const addMarkerToChecklist = useCallback(
    (marker: Marker) => {
      if (!payload || !selectedMap) return;
      try {
        const result = addChecklistItem({
          label: marker.name || marker.subtypeLabel,
          frequency: "once",
          mapRef: {
            mapName: selectedMap.name,
            mapSlug: selectedMap.slug,
            markerId: marker.id,
            markerNameSnapshot: marker.name || marker.subtypeLabel,
            sourceVersion: payload.source.build,
          },
        });
        if (!result) {
          showNotice(text.checklistAddFailed);
          return;
        }
        if (result.outcome === "limit") {
          showNotice(text.checklistLimit);
        } else if (!result.added) {
          showNotice(text.alreadyInChecklist);
        } else if (!result.persisted) {
          showNotice(text.checklistTemporary);
        } else {
          showNotice(text.addedToChecklist);
        }
        trackEvent("map_to_checklist_add", {
          tool_name: "interactive_map",
          locale,
          map_name: selectedMap.name,
          marker_id: marker.id,
          added: result.added,
          outcome: result.outcome,
          persisted: result.persisted,
        });
      } catch {
        showNotice(text.checklistAddFailed);
      }
    },
    [locale, payload, selectedMap, showNotice, text],
  );

  const buildShareUrl = useCallback(() => {
    if (!selectedMap) return null;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("m", selectedMap.name);
    url.searchParams.set("l", locale);
    url.hash = "";
    return url;
  }, [locale, selectedMap]);

  const shareUrlOrCopy = useCallback(
    async ({
      url,
      title,
      shareText,
      copiedMessage,
    }: {
      url: string;
      title: string;
      shareText: string;
      copiedMessage: string;
    }) => {
      if (window.navigator.share) {
        try {
          await window.navigator.share({ title, text: shareText, url });
          showNotice(text.shareComplete);
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") return;
        }
      }
      const copied = await copyText(url);
      showNotice(copied ? copiedMessage : text.shareFailed);
    },
    [showNotice, text.shareComplete, text.shareFailed],
  );

  const shareMarker = useCallback(
    async (marker: Marker) => {
      if (!payload || !selectedMap || !selectedMapText || isGeneratingShareImage) return;
      const encodedPoint = encodeSharedPoint(payload, selectedMap.name, marker.id);
      const url = buildShareUrl();
      if (!url || !encodedPoint) return;
      url.hash = new URLSearchParams({ pt: encodedPoint }).toString();
      const shareUrl = url.toString();
      trackEvent("map_point_share", {
        tool_name: "interactive_map",
        locale,
        map_name: selectedMap.name,
        marker_id: marker.id,
      });
      const coordinates = `${Math.round(marker.sourceX)}, ${Math.round(marker.sourceY)}`;
      const markerName = marker.name || marker.subtypeLabel;
      const region = regionLabelByName.get(marker.region) || marker.region || "-";
      captureShareReturnFocus();
      setIsGeneratingShareImage(true);
      let previewCreated = false;

      try {
        const blob = await createPointShareCard({
          map: selectedMap,
          mapName: selectedMapText.name,
          locale,
          shareUrl,
          linkLabel: text.progressCardLinkLabel,
          markerName,
          categoryLabel: marker.categoryLabel,
          subtypeLabel: marker.subtypeLabel,
          coordinates,
          region,
          iconUrl: markerIconUrl(marker, selectedMap, assetBasePath),
          pointLabel: text.pointDetails,
          coordinatesLabel: text.coordinates,
          regionLabel: text.region,
        });
        setSharePreview({
          kind: "point",
          blob,
          imageUrl: URL.createObjectURL(blob),
          shareUrl,
          fileName: pointShareCardFilename(selectedMap, locale),
          title: `${markerName} | ${text.documentTitle}`,
          shareText: text.markerShareText(markerName, selectedMapText.name, coordinates),
          mapName: selectedMapText.name,
          heading: text.share,
          summaryLabel: text.pointDetails,
          summaryValue: `${marker.subtypeLabel} · ${coordinates}`,
          copiedMessage: text.pointLinkCopied,
        });
        previewCreated = true;
      } catch (error) {
        console.error("Failed to create point share image", error);
        await shareUrlOrCopy({
          url: shareUrl,
          title: `${markerName} | ${text.documentTitle}`,
          shareText: text.markerShareText(markerName, selectedMapText.name, coordinates),
          copiedMessage: text.pointLinkCopied,
        });
      } finally {
        setIsGeneratingShareImage(false);
        if (!previewCreated) restoreShareReturnFocus();
      }
    },
    [
      assetBasePath,
      buildShareUrl,
      captureShareReturnFocus,
      isGeneratingShareImage,
      locale,
      payload,
      regionLabelByName,
      selectedMap,
      selectedMapText,
      restoreShareReturnFocus,
      shareUrlOrCopy,
      text,
    ],
  );

  const shareCollectionProgress = useCallback(async () => {
    if (
      !payload ||
      !selectedMap ||
      !selectedMapText ||
      isGeneratingShareImage
    ) {
      return;
    }
    const progressIds =
      sharedProgress?.mapName === selectedMap.name
        ? sharedProgress.foundMarkerIds
        : readLatestFoundForMap(selectedMap.name, foundMarkerIds);
    let encoded: string | null = null;
    try {
      encoded = encodeSharedMapProgress(payload, selectedMap.name, progressIds).token;
    } catch (error) {
      console.error("Failed to encode map progress", error);
    }
    const url = buildShareUrl();
    if (!url || !encoded) {
      setIsGeneratingShareImage(false);
      showNotice(text.shareFailed);
      return;
    }
    url.hash = new URLSearchParams({ p: encoded }).toString();
    const shareUrl = url.toString();
    trackEvent("map_progress_share", {
      tool_name: "interactive_map",
      locale,
      map_name: selectedMap.name,
      found_count: progressIds.size,
    });
    const progressBreakdown = buildCollectibleBreakdown(progressIds);
    const progressSnapshot = progressBreakdown.reduce(
      (progress, item) => ({
        foundCount: progress.foundCount + item.foundCount,
        totalCount: progress.totalCount + item.totalCount,
      }),
      { foundCount: 0, totalCount: 0 },
    );
    captureShareReturnFocus();
    setIsGeneratingShareImage(true);
    let previewCreated = false;

    try {
      const blob = await createProgressShareCard({
        map: selectedMap,
        mapName: selectedMapText.name,
        locale,
        foundCount: progressSnapshot.foundCount,
        totalCount: progressSnapshot.totalCount,
        shareUrl,
        breakdown: progressBreakdown,
        progressLabel: text.collectibleProgress,
        breakdownLabel: text.collectionBreakdown,
        noBreakdownLabel: text.noCollectionBreakdown,
        linkLabel: text.progressCardLinkLabel,
      });
      setSharePreview({
        kind: "progress",
        blob,
        imageUrl: URL.createObjectURL(blob),
        shareUrl,
        fileName: progressShareCardFilename(selectedMap, locale),
        title: `${selectedMapText.name} | ${text.shareProgress}`,
        shareText: text.progressShareText(
          selectedMapText.name,
          progressSnapshot.foundCount,
          progressSnapshot.totalCount,
        ),
        mapName: selectedMapText.name,
        heading: text.shareCurrentMapProgress,
        summaryLabel: text.currentMapOnly(selectedMapText.name),
        summaryValue: `${formatNumber(progressSnapshot.foundCount, locale)}/${formatNumber(progressSnapshot.totalCount, locale)}`,
        copiedMessage: text.progressLinkCopied,
      });
      previewCreated = true;
    } catch (error) {
      console.error("Failed to create progress share image", error);
      await shareUrlOrCopy({
        url: shareUrl,
        title: `${selectedMapText.name} | ${text.shareCurrentMapProgress}`,
        shareText: text.progressShareText(
          selectedMapText.name,
          progressSnapshot.foundCount,
          progressSnapshot.totalCount,
        ),
        copiedMessage: text.progressLinkCopied,
      });
    } finally {
      setIsGeneratingShareImage(false);
      if (!previewCreated) restoreShareReturnFocus();
    }
  }, [
    buildCollectibleBreakdown,
    buildShareUrl,
    captureShareReturnFocus,
    foundMarkerIds,
    isGeneratingShareImage,
    locale,
    payload,
    readLatestFoundForMap,
    restoreShareReturnFocus,
    selectedMap,
    selectedMapText,
    shareUrlOrCopy,
    sharedProgress,
    showNotice,
    text,
  ]);

  const shareRoute = useCallback(async () => {
    if (!payload || !selectedMap || !selectedMapText || isGeneratingShareImage) return;
    if (routeMarkers.length < 2) {
      showNotice(text.routeNeedsTwo);
      return;
    }
    const encodedRoute = encodeSharedRoute(payload, selectedMap.name, routeMarkerIds);
    const url = buildShareUrl();
    if (!encodedRoute || !url) {
      showNotice(text.shareFailed);
      return;
    }
    url.hash = new URLSearchParams({ r: encodedRoute }).toString();
    const shareUrl = url.toString();
    trackEvent("map_route_share", {
      tool_name: "interactive_map",
      locale,
      map_name: selectedMap.name,
      stop_count: routeMarkers.length,
    });
    const stopsLabel = text.routeStopsLabel(routeMarkers.length);
    captureShareReturnFocus();
    setIsGeneratingShareImage(true);
    let previewCreated = false;

    try {
      const blob = await createRouteShareCard({
        map: selectedMap,
        mapName: selectedMapText.name,
        locale,
        shareUrl,
        linkLabel: text.progressCardLinkLabel,
        routeLabel: text.routeBuilder,
        stopsLabel,
        steps: routeMarkers.map((marker) => ({
          name: marker.name || marker.subtypeLabel,
          iconUrl: markerIconUrl(marker, selectedMap, assetBasePath),
        })),
      });
      setSharePreview({
        kind: "route",
        blob,
        imageUrl: URL.createObjectURL(blob),
        shareUrl,
        fileName: routeShareCardFilename(selectedMap, locale),
        title: `${selectedMapText.name} | ${text.shareRoute}`,
        shareText: text.routeShareText(selectedMapText.name, routeMarkers.length),
        mapName: selectedMapText.name,
        heading: text.shareRoute,
        summaryLabel: text.routeBuilder,
        summaryValue: stopsLabel,
        copiedMessage: text.routeLinkCopied,
      });
      previewCreated = true;
    } catch (error) {
      console.error("Failed to create route share image", error);
      await shareUrlOrCopy({
        url: shareUrl,
        title: `${selectedMapText.name} | ${text.shareRoute}`,
        shareText: text.routeShareText(selectedMapText.name, routeMarkers.length),
        copiedMessage: text.routeLinkCopied,
      });
    } finally {
      setIsGeneratingShareImage(false);
      if (!previewCreated) restoreShareReturnFocus();
    }
  }, [
    assetBasePath,
    buildShareUrl,
    captureShareReturnFocus,
    isGeneratingShareImage,
    locale,
    payload,
    routeMarkerIds,
    routeMarkers,
    restoreShareReturnFocus,
    selectedMap,
    selectedMapText,
    shareUrlOrCopy,
    showNotice,
    text,
  ]);

  const downloadShareImage = useCallback(() => {
    if (!sharePreview) return;
    const anchor = document.createElement("a");
    anchor.href = sharePreview.imageUrl;
    anchor.download = sharePreview.fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }, [sharePreview]);

  const saveShareImage = useCallback(() => {
    downloadShareImage();
    showNotice(text.shareImageSaved);
  }, [downloadShareImage, showNotice, text.shareImageSaved]);

  const copyShareLink = useCallback(async () => {
    if (!sharePreview) return;
    const copied = await copyText(sharePreview.shareUrl);
    showNotice(copied ? sharePreview.copiedMessage : text.shareFailed);
  }, [sharePreview, showNotice, text.shareFailed]);

  const shareCurrentImage = useCallback(async () => {
    if (!sharePreview) return;
    const file = new File([sharePreview.blob], sharePreview.fileName, {
      type: "image/png",
    });
    const shareData: ShareData = {
      files: [file],
      title: sharePreview.title,
      text: `${sharePreview.shareText}\n${sharePreview.shareUrl}`,
    };
    const canShareFile =
      typeof window.navigator.canShare === "function" && window.navigator.canShare({ files: [file] });

    if (window.navigator.share && canShareFile) {
      try {
        await window.navigator.share(shareData);
        closeSharePreview();
        showNotice(text.shareComplete);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await shareUrlOrCopy({
      url: sharePreview.shareUrl,
      title: sharePreview.title,
      shareText: sharePreview.shareText,
      copiedMessage: sharePreview.copiedMessage,
    });
  }, [
    closeSharePreview,
    sharePreview,
    shareUrlOrCopy,
    showNotice,
    text.shareComplete,
  ]);

  const dismissSharedProgress = useCallback(() => {
    setSharedProgress(null);
    updateCurrentUrl((_url, hash) => clearHashParameters(hash, ["p", "progress"]));
  }, []);

  const importSharedProgress = useCallback(async () => {
    if (
      !selectedMap ||
      !selectedMapText ||
      !sharedProgress ||
      sharedProgress.mapName !== selectedMap.name
    ) {
      showNotice(text.progressImportFailed);
      return;
    }
    const { next, saved } = await persistFoundForMap(
      selectedMap.name,
      foundMarkerIds,
      (latest) => {
        for (const markerId of sharedProgress.foundMarkerIds) latest.add(markerId);
      },
    );
    if (!saved) {
      showNotice(text.progressImportFailed);
      return;
    }
    setFoundMarkerIds(next);
    setSharedProgress(null);
    updateCurrentUrl((_url, hash) => clearHashParameters(hash, ["p", "progress"]));
    showNotice(text.progressImportedForMap(selectedMapText.name, sharedProgress.foundCount));
  }, [
    foundMarkerIds,
    persistFoundForMap,
    selectedMap,
    selectedMapText,
    sharedProgress,
    showNotice,
    text,
  ]);

  if (!payload || !translations || !selectedMap || !selectedMapText) {
    const hasLoadError =
      mapDataLoad.status === "error" || translationLoad.status === "error";
    const statusText = (status: LoadStatus, resource: string) => {
      if (status.status === "loading") return text.loadStateLoading;
      if (status.status === "ready") return text.loadStateReady;
      return status.reason === "timeout" ? text.loadTimedOut(resource) : text.loadFailed(resource);
    };
    return (
      <MapRoot
        ref={mapShellRef}
        className="map-shell loading-shell"
        lang={locale}
        data-embedded={embedded ? "true" : undefined}
      >
        <section
          className="load-state-panel"
          role={hasLoadError ? "alert" : "status"}
          aria-live="polite"
          aria-busy={!hasLoadError}
        >
          {hasLoadError ? (
            <AlertTriangle size={30} aria-hidden="true" />
          ) : (
            <LoaderCircle className="share-spinner" size={30} aria-hidden="true" />
          )}
          <MapTitle>{text.loadingMapApp}</MapTitle>
          <dl className="load-resource-list">
            <div data-status={mapDataLoad.status}>
              <dt>{text.mapDataResource}</dt>
              <dd>{statusText(mapDataLoad, text.mapDataResource)}</dd>
            </div>
            <div data-status={translationLoad.status}>
              <dt>{text.translationResource}</dt>
              <dd>{statusText(translationLoad, text.translationResource)}</dd>
            </div>
          </dl>
          {hasLoadError && (
            <button
              type="button"
              className="load-retry-button"
              onClick={() => {
                setPayload(null);
                setTranslations(null);
                setMapDataLoad({ status: "loading" });
                setTranslationLoad({ status: "loading" });
                setLoadAttempt((value) => value + 1);
              }}
            >
              <RefreshCw size={16} aria-hidden="true" />
              <span>{text.retryLoading}</span>
            </button>
          )}
        </section>
      </MapRoot>
    );
  }

  const mapAccessibleName = text.mapCanvasLabel(selectedMapText.name);

  return (
    <MapRoot
      ref={mapShellRef}
      className="map-shell"
      lang={locale}
      data-embedded={embedded ? "true" : undefined}
      data-fullscreen-mode={fullscreenMode !== "off" ? fullscreenMode : undefined}
      data-sidebar-collapsed={sidebarCollapsed ? "true" : undefined}
    >
      <aside
        className="map-sidebar"
        aria-hidden={sidebarCollapsed || Boolean(sharePreview)}
        inert={sidebarCollapsed || Boolean(sharePreview) ? true : undefined}
      >
        <header className="brand-block">
          <div>
            <p className="eyebrow">AION2</p>
            <MapTitle>{text.appTitle}</MapTitle>
          </div>
          <div className="brand-actions">
            <div className="brand-action-row">
              <select
                className="language-select"
                value={locale}
                aria-label={text.language}
                title={text.language}
                onChange={(event) => {
                  if (isLocale(event.target.value)) changeLocale(event.target.value);
                }}
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="sidebar-collapse-button"
                ref={collapseSidebarButtonRef}
                aria-label={text.collapseSidebar}
                title={text.collapseSidebar}
                onClick={collapseSidebar}
              >
                <PanelLeftClose size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="total-pill">
              {markers.length ? `${filteredMarkers.length}/${markers.length}` : "0"}
            </div>
          </div>
        </header>

        <section className="control-section">
          <label className="field-label" htmlFor="map-select">
            {text.map}
          </label>
          <select
            id="map-select"
            value={selectedMap.name}
            onChange={(event) => changeMap(event.target.value)}
          >
            {maps.map((map) => (
              <option value={map.name} key={map.name}>
                {localeBundle?.maps[map.name]?.name ?? map.displayName}
              </option>
            ))}
          </select>
          <div className="map-meta">
            <span>{selectedMapText.description}</span>
            <span>
              {formatNumber(selectedMap.width, locale)} x {formatNumber(selectedMap.height, locale)}
            </span>
          </div>
        </section>

        <section className="control-section">
          <label className="field-label" htmlFor="marker-search">
            {text.search}
          </label>
          <input
            id="marker-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setMarkerPage(0);
            }}
            placeholder={text.searchPlaceholder}
          />
        </section>

        <section className="control-section">
          <div className="section-row">
            <span className="field-label">{text.types}</span>
            <div className="filter-shortcuts">
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setSelectedSubtypes(new Set(allSubtypeNamesForMap));
                  setMarkerPage(0);
                }}
              >
                {text.all}
              </button>
              <button
                type="button"
                className="text-button muted-action"
                onClick={() => {
                  setSelectedSubtypes(new Set());
                  setMarkerPage(0);
                }}
              >
                {text.hideAll}
              </button>
              <button
                type="button"
                className="section-collapse-button"
                aria-controls="type-groups"
                aria-expanded={!typesCollapsed}
                aria-label={typesCollapsed ? text.expandTypes : text.collapseTypes}
                title={typesCollapsed ? text.expandTypes : text.collapseTypes}
                onClick={() => setTypesCollapsed((collapsed) => !collapsed)}
              >
                {typesCollapsed ? (
                  <ChevronDown size={16} aria-hidden="true" />
                ) : (
                  <ChevronUp size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <div
            id="type-groups"
            className="type-groups"
            hidden={typesCollapsed}
          >
            {categoriesForMap.length === 0 ? (
              <p className="empty-copy">{text.noMarkerData}</p>
            ) : (
              categoriesForMap.map((category) => {
                const subtypeNames = category.subtypes.map((subtype) => subtype.name);
                const activeCount = subtypeNames.filter((name) => selectedSubtypes.has(name)).length;
                const allActive = activeCount === subtypeNames.length;
                const categoryLabel =
                  localeBundle?.categories[category.name] ?? category.label;
                return (
                  <section className="type-group" key={category.name}>
                    <div className="type-group-header">
                      <span>{categoryLabel}</span>
                      <span className="chip-count">
                        {activeCount}/{subtypeNames.length} · {category.count}
                      </span>
                      <button
                        type="button"
                        className="type-group-toggle"
                        aria-pressed={allActive}
                        aria-label={
                          allActive
                            ? text.hideNamed(categoryLabel)
                            : text.showNamed(categoryLabel)
                        }
                        onClick={() => setSubtypesActive(subtypeNames, !allActive)}
                      >
                        {allActive ? text.hide : text.show}
                      </button>
                    </div>
                    <div className="subtype-grid">
                      {category.subtypes.map((subtype) => {
                        const active = selectedSubtypes.has(subtype.name);
                        const iconUrl = subtypeIconUrl(subtype, selectedMap, assetBasePath);
                        const foundCount = foundCountsBySubtype.get(subtype.name) ?? 0;
                        const subtypeLabel =
                          localeBundle?.subtypes[subtype.name] ?? subtype.label;
                        return (
                          <button
                            type="button"
                            className={`subtype-chip ${active ? "active" : ""}`}
                            aria-pressed={active}
                            aria-label={`${
                              active
                                ? text.hideNamed(subtypeLabel)
                                : text.showNamed(subtypeLabel)
                            } (${subtype.count})`}
                            onClick={() => toggleSubtype(subtype.name)}
                            title={subtypeLabel}
                            key={subtype.name}
                          >
                            {iconUrl ? (
                              <img
                                className="chip-icon"
                                src={iconUrl}
                                alt={text.iconImageAlt(subtypeLabel)}
                                draggable={false}
                              />
                            ) : (
                              <span
                                className="chip-fallback"
                                style={{ background: categoryPalette[category.name] ?? subtype.color }}
                              />
                            )}
                            <span>{subtypeLabel}</span>
                            <span className="chip-count">
                              {subtype.canComplete || foundCount > 0
                                ? `${foundCount}/${subtype.count}`
                                : subtype.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </section>

        <section className="control-section compact-controls">
          <button
            type="button"
            onClick={() => {
              setMarkerPage(0);
              mapRef.current?.fit();
            }}
          >
            {text.reset}
          </button>
          <button
            type="button"
            onClick={() => setShowLabels((value) => !value)}
            className={showLabels ? "active" : ""}
            aria-pressed={showLabels}
            aria-label={showLabels ? text.hideNamed(text.names) : text.showNamed(text.names)}
          >
            {text.names}
          </button>
          <button
            type="button"
            onClick={() => setShowRegions((value) => !value)}
            className={showRegions ? "active" : ""}
            aria-pressed={showRegions}
            aria-label={showRegions ? text.hideNamed(text.regions) : text.showNamed(text.regions)}
          >
            {text.regions}
          </button>
          <button
            type="button"
            onClick={routeMode ? closeRoute : beginRoute}
            className={routeMode ? "active route-control-action" : "route-control-action"}
            aria-pressed={routeMode}
            disabled={selectedMapDataUnavailable}
          >
            <RouteIcon size={14} aria-hidden="true" />
            <span>{routeMode ? text.closeRoute : text.createRoute}</span>
          </button>
          <button
            type="button"
            className="share-progress-action"
            onClick={shareCollectionProgress}
            disabled={isGeneratingShareImage || selectedMapDataUnavailable}
            aria-label={text.shareCurrentMapProgress}
          >
            {isGeneratingShareImage ? (
              <LoaderCircle className="share-spinner" size={14} aria-hidden="true" />
            ) : (
              <Share2 size={14} aria-hidden="true" />
            )}
            <span>
              {isGeneratingShareImage ? text.generatingShareImage : text.shareCurrentMapProgress}
            </span>
          </button>
        </section>

        <section className="marker-list-section">
          <div className="section-row">
            <span className="field-label">{text.markers}</span>
            <span className="marker-range" aria-live="polite">
              {text.markerRange(markerRangeStart, markerRangeEnd, filteredMarkers.length)}
            </span>
          </div>
          <div className="marker-list">
            {selectedMapDataUnavailable && (
              <div className="sidebar-empty-state" role="status">
                <strong>{text.mapDataUnavailableTitle}</strong>
                <span>{text.mapDataUnavailableDetail}</span>
              </div>
            )}
            {!selectedMapDataUnavailable && filteredMarkers.length === 0 && (
              <p className="empty-copy">{text.noMarkerData}</p>
            )}
            {pagedMarkers.map((marker) => {
              const iconUrl = markerIconUrl(marker, selectedMap, assetBasePath);
              const isFound = activeFoundMarkerIds.has(marker.id);
              const routeOrder = routeMarkerIds.indexOf(marker.id);
              return (
                <button
                  type="button"
                  className={`marker-row ${selectedMarkerId === marker.id ? "selected" : ""} ${isFound ? "found" : ""} ${routeOrder >= 0 ? "route-stop" : ""}`}
                  aria-current={selectedMarkerId === marker.id ? "true" : undefined}
                  aria-label={`${marker.name || marker.subtypeLabel} — ${marker.categoryLabel} / ${marker.subtypeLabel}`}
                  onClick={() => (
                    routeMode
                      ? addRouteMarker(marker, "marker-list-route")
                      : focusMarker(marker, "marker-list")
                  )}
                  key={marker.id}
                >
                  {iconUrl ? (
                    <img
                      className="marker-row-icon"
                      src={iconUrl}
                      alt={text.iconImageAlt(marker.name || marker.subtypeLabel)}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <span className="marker-row-dot" style={{ background: displayColor(marker) }} />
                  )}
                  <span className="marker-row-main">
                    <span className="marker-row-name">{marker.name || marker.subtypeLabel}</span>
                    <span className="marker-row-sub">
                      {marker.categoryLabel} / {marker.subtypeLabel}
                    </span>
                  </span>
                  <span className="coord">
                    {routeOrder >= 0
                      ? `#${routeOrder + 1}`
                      : isFound
                      ? text.found
                      : `${Math.round(marker.sourceX)}, ${Math.round(marker.sourceY)}`}
                  </span>
                </button>
              );
            })}
          </div>
          {!selectedMapDataUnavailable && filteredMarkers.length > 0 && (
            <nav className="marker-pagination" aria-label={text.markers}>
              <button
                type="button"
                onClick={() => setMarkerPage((page) => Math.max(0, page - 1))}
                disabled={activeMarkerPage === 0}
                aria-label={text.previousPage}
                title={text.previousPage}
              >
                <ChevronLeft size={16} aria-hidden="true" />
                <span>{text.previousPage}</span>
              </button>
              <span className="pagination-position" aria-live="polite">
                {activeMarkerPage + 1}/{markerPageCount}
              </span>
              <button
                type="button"
                onClick={() =>
                  setMarkerPage((page) => Math.min(markerPageCount - 1, page + 1))
                }
                disabled={activeMarkerPage >= markerPageCount - 1}
                aria-label={text.nextPage}
                title={text.nextPage}
              >
                <span>{text.nextPage}</span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
        </section>
      </aside>

      <section className="map-workspace">
        <div
          className="map-interaction-layer"
          aria-hidden={sharePreview ? true : undefined}
          inert={sharePreview ? true : undefined}
        >
        <div className="top-bar">
          <div className="map-title-group">
            {sidebarCollapsed && (
              <button
                type="button"
                className="sidebar-expand-button"
                ref={expandSidebarButtonRef}
                aria-label={text.expandSidebar}
                title={text.expandSidebar}
                onClick={expandSidebar}
              >
                <PanelLeftOpen size={17} aria-hidden="true" />
              </button>
            )}
            <div className="map-title">
              <strong>{selectedMapText.name}</strong>
              <span>{selectedMapText.description}</span>
            </div>
          </div>
          <a
            className="information-link"
            href={`/${routeLocaleForMapLocale(locale)}/news/`}
          >
            <span>{text.information}</span>
            <span aria-hidden="true">→</span>
          </a>
          <div className="top-controls">
            <div className="zoom-controls" aria-label={text.zoomControls}>
              <button type="button" aria-label={text.zoomOut} onClick={() => mapRef.current?.zoomOut()}>
                -
              </button>
              <button type="button" aria-label={text.zoomIn} onClick={() => mapRef.current?.zoomIn()}>
                +
              </button>
              <button type="button" aria-label={text.resetView} onClick={() => mapRef.current?.fit()}>
                {text.reset}
              </button>
            </div>
            {embedded && (
              <button
                type="button"
                className="map-fullscreen-button"
                ref={fullscreenButtonRef}
                aria-label={isFullscreen ? text.exitFullscreen : text.enterFullscreen}
                aria-pressed={isFullscreen}
                title={isFullscreen ? text.exitFullscreen : text.enterFullscreen}
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 size={16} aria-hidden="true" />
                ) : (
                  <Maximize2 size={16} aria-hidden="true" />
                )}
              </button>
            )}
            <div className="coordinate-readout" ref={coordinateRef}>
              0, 0
            </div>
          </div>
        </div>

        {sharedProgress && (
          <div className="shared-progress-bar" role="region" aria-label={text.viewingSharedProgress}>
            <div className="shared-progress-copy">
              <strong>{text.viewingSharedProgressForMap(selectedMapText.name)}</strong>
              <span>
                {formatNumber(sharedProgress.foundCount, locale)}/
                {formatNumber(sharedProgress.totalCount, locale)}
              </span>
            </div>
            <div className="shared-progress-actions">
              <button
                type="button"
                aria-label={text.mergeProgressForMap(selectedMapText.name)}
                title={text.mergeProgressForMap(selectedMapText.name)}
                onClick={importSharedProgress}
              >
                <Download size={14} aria-hidden="true" />
                <span>{text.mergeProgress}</span>
              </button>
              <button
                type="button"
                className="shared-progress-close"
                aria-label={text.closeSharedProgress}
                title={text.closeSharedProgress}
                onClick={dismissSharedProgress}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {routeMode && (
          <div className="route-builder-bar">
            <div className="route-builder-copy">
              <RouteIcon size={18} aria-hidden="true" />
              <div>
                <strong>{text.routeBuilder}</strong>
                <span className="route-limit-status" aria-live="polite">
                  {text.routeStopsLimit(routeMarkerIds.length, MAX_ROUTE_MARKERS)}
                </span>
              </div>
            </div>
            <div className="route-step-strip" aria-label={text.routeBuilder}>
              {routeMarkers.length === 0 ? (
                <span className="route-empty">{text.routeHint}</span>
              ) : (
                routeMarkers.map((marker, index) => {
                  const iconUrl = markerIconUrl(marker, selectedMap, assetBasePath);
                  return (
                    <button
                      type="button"
                      className="route-step"
                      onClick={() => focusMarkerOnMap(marker)}
                      aria-label={`${index + 1}. ${marker.name || marker.subtypeLabel}`}
                      title={marker.name || marker.subtypeLabel}
                      key={marker.id}
                    >
                      <b>{index + 1}</b>
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={text.iconImageAlt(marker.name || marker.subtypeLabel)}
                          draggable={false}
                        />
                      )}
                      <span>{marker.name || marker.subtypeLabel}</span>
                    </button>
                  );
                })
              )}
            </div>
            <div className="route-builder-actions">
              <button
                type="button"
                onClick={() => setRouteMarkerIds((current) => current.slice(0, -1))}
                disabled={routeMarkerIds.length === 0}
                aria-label={text.undoLast}
                title={text.undoLast}
              >
                <Undo2 size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setRouteMarkerIds([]);
                  setSelectedMarkerId(null);
                }}
                disabled={routeMarkerIds.length === 0}
                aria-label={text.clearRoute}
                title={text.clearRoute}
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="route-share-action"
                onClick={shareRoute}
                disabled={isGeneratingShareImage}
                title={text.shareRoute}
              >
                {isGeneratingShareImage ? (
                  <LoaderCircle className="share-spinner" size={15} aria-hidden="true" />
                ) : (
                  <Share2 size={15} aria-hidden="true" />
                )}
                <span>{text.shareRoute}</span>
              </button>
              <button
                type="button"
                onClick={closeRoute}
                aria-label={text.closeRoute}
                title={text.closeRoute}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div
          className="map-viewport maplibre-viewport"
          ref={mapViewportRef}
          role="region"
          aria-label={mapAccessibleName}
          aria-busy={mapEngineStatus.status === "loading"}
        >
            <MapLibreMap
              key={`${selectedMap.name}:${mapEngineAttempt}`}
              ref={mapRef}
              mapInfo={selectedMap}
              accessibleName={mapAccessibleName}
              unavailableLabel={text.mapEngineError}
              assetBasePath={assetBasePath}
            markers={filteredMarkers}
            regions={regions}
            foundMarkerIds={activeFoundMarkerIds}
            routeMarkers={routeMarkers}
            selectedMarker={selectedMarker}
            showLabels={showLabels}
            showRegions={showRegions}
            onSelectMarker={selectMarkerFromMap}
            onCoordinate={updateCoordinate}
            onReady={handleMapEngineReady}
            onError={handleMapEngineError}
          />
          {mapEngineStatus.status === "loading" && (
            <div className="map-state-overlay" role="status" aria-live="polite">
              <LoaderCircle className="share-spinner" size={24} aria-hidden="true" />
              <strong>{text.mapEngineLoading}</strong>
            </div>
          )}
          {mapEngineStatus.status === "error" && (
            <div className="map-state-overlay map-state-error" role="alert">
              <AlertTriangle size={24} aria-hidden="true" />
              <strong>{text.mapEngineError}</strong>
              <span className="map-error-detail">{mapEngineStatus.message}</span>
              <button
                type="button"
                onClick={() => {
                  setMapEngineStatus({ status: "loading" });
                  setMapEngineAttempt((attempt) => attempt + 1);
                }}
              >
                <RefreshCw size={15} aria-hidden="true" />
                <span>{text.retryMapEngine}</span>
              </button>
            </div>
          )}
          {selectedMapDataUnavailable && mapEngineStatus.status === "ready" && (
            <div className="map-empty-state" role="status">
              <AlertTriangle size={22} aria-hidden="true" />
              <div>
                <strong>{text.mapDataUnavailableTitle}</strong>
                <span>{text.mapDataUnavailableDetail}</span>
              </div>
            </div>
          )}
        </div>

        {selectedMarker && (
          <aside
            className="detail-panel"
            aria-label={text.pointDetails}
            data-collapsed={detailCollapsed ? "true" : undefined}
          >
            <div className="detail-heading">
              <span className="detail-icon-frame">
                {markerIconUrl(selectedMarker, selectedMap, assetBasePath) ? (
                  <img
                    className="detail-icon"
                    src={markerIconUrl(selectedMarker, selectedMap, assetBasePath)}
                    alt={text.iconImageAlt(selectedMarker.subtypeLabel)}
                    aria-hidden="true"
                    draggable={false}
                  />
                ) : (
                  <span className="detail-dot" style={{ background: displayColor(selectedMarker) }} />
                )}
              </span>
              <div>
                <h2>{selectedMarker.name || selectedMarker.subtypeLabel}</h2>
                <p>
                  {selectedMarker.categoryLabel} / {selectedMarker.subtypeLabel}
                </p>
              </div>
              <div className="detail-heading-actions">
                <button
                  type="button"
                  className="detail-collapse-button"
                  aria-controls={`detail-body-${selectedMarker.id}`}
                  aria-expanded={!detailCollapsed}
                  aria-label={detailCollapsed ? text.expandDetails : text.collapseDetails}
                  title={detailCollapsed ? text.expandDetails : text.collapseDetails}
                  onClick={() => setDetailCollapsed((collapsed) => !collapsed)}
                >
                  {detailCollapsed ? (
                    <ChevronUp size={17} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={17} aria-hidden="true" />
                  )}
                </button>
                <button type="button" aria-label={text.close} onClick={closeMarkerDetails}>
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id={`detail-body-${selectedMarker.id}`}
              className="detail-body"
              hidden={detailCollapsed}
            >
            <div className="detail-grid">
              <span>{text.coordinates}</span>
              <strong>
                {Math.round(selectedMarker.sourceX)}, {Math.round(selectedMarker.sourceY)}
              </strong>
              <span>{text.mapPixels}</span>
              <strong>
                {Math.round(selectedMarker.x)}, {Math.round(selectedMarker.y)}
              </strong>
              <span>{text.region}</span>
              <strong>{regionLabelByName.get(selectedMarker.region) || selectedMarker.region || "-"}</strong>
              <span>{text.status}</span>
              <strong>{activeFoundMarkerIds.has(selectedMarker.id) ? text.found : text.notFound}</strong>
            </div>
            {selectedMarker.description && (
              <p className="detail-description">{selectedMarker.description}</p>
            )}
            <div className="detail-actions">
              {sharedProgress ? (
                <button type="button" className="found-action" disabled>
                  {text.sharedProgressReadOnly}
                </button>
              ) : (
                <button
                  type="button"
                  className={`found-action ${activeFoundMarkerIds.has(selectedMarker.id) ? "active" : ""}`}
                  aria-pressed={activeFoundMarkerIds.has(selectedMarker.id)}
                  onClick={() => toggleMarkerFound(selectedMarker.id)}
                >
                  {activeFoundMarkerIds.has(selectedMarker.id) ? text.cancelFound : text.markFound}
                </button>
              )}
              <button
                type="button"
                className="primary-action"
                onClick={() => shareMarker(selectedMarker)}
                disabled={isGeneratingShareImage}
              >
                {isGeneratingShareImage ? (
                  <LoaderCircle className="share-spinner" size={15} aria-hidden="true" />
                ) : (
                  <Share2 size={15} aria-hidden="true" />
                )}
                <span>{text.share}</span>
              </button>
              <button
                type="button"
                className="checklist-action"
                onClick={() => addMarkerToChecklist(selectedMarker)}
              >
                <ListPlus size={15} aria-hidden="true" />
                <span>{text.addToChecklist}</span>
              </button>
            </div>
            </div>
          </aside>
        )}
        </div>
        {sharePreview && (
          <div
            className="share-image-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeSharePreview();
            }}
          >
            <section
              className="share-image-dialog"
              ref={shareDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-image-title"
              aria-describedby="share-image-description"
              tabIndex={-1}
            >
              <header className="share-image-heading">
                <div>
                  <p>{sharePreview.mapName}</p>
                  <h2 id="share-image-title">{sharePreview.heading}</h2>
                </div>
                <button
                  type="button"
                  ref={shareDialogCloseRef}
                  aria-label={text.close}
                  title={text.close}
                  onClick={closeSharePreview}
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </header>
              <div className="share-image-preview">
                <img
                  src={sharePreview.imageUrl}
                  alt={text.shareImageAlt(sharePreview.mapName, sharePreview.heading)}
                  draggable={false}
                />
              </div>
              <div className="share-image-summary" id="share-image-description">
                <span>{sharePreview.summaryLabel}</span>
                <strong>{sharePreview.summaryValue}</strong>
              </div>
              <div className="share-image-actions">
                <button type="button" className="primary-action" onClick={shareCurrentImage}>
                  <Share2 size={15} aria-hidden="true" />
                  <span>{text.shareImage}</span>
                </button>
                <button type="button" onClick={saveShareImage}>
                  <Download size={15} aria-hidden="true" />
                  <span>{text.saveImage}</span>
                </button>
                <button type="button" onClick={copyShareLink}>
                  <Copy size={15} aria-hidden="true" />
                  <span>{text.copyLink}</span>
                </button>
              </div>
            </section>
          </div>
        )}
        {shareNotice && (
          <div className="share-toast" role="status" aria-live="polite">
            {shareNotice}
          </div>
        )}
      </section>
    </MapRoot>
  );
}
