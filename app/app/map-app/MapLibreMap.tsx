"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type {
  ErrorEvent as MapLibreErrorEvent,
  GeoJSONSource,
  ExpressionSpecification,
  LngLatBoundsLike,
  Map as MapLibreInstance,
  MapMouseEvent,
} from "maplibre-gl";
import type {
  Feature,
  FeatureCollection,
  LineString,
  Point,
} from "geojson";

import type { MapInfo, Marker, Region } from "./map-types";
import { resolveMapAssetUrl } from "./asset-url";

type MarkerProperties = {
  markerId: string;
  iconId: string;
  iconScale: number;
  label: string;
};

type RegionProperties = {
  name: string;
  label: string;
};

type RouteProperties = {
  route: true;
};

type RoutePointProperties = {
  markerId: string;
  routeIndex: string;
};

export type InteractiveMapErrorStage =
  | "import"
  | "webgl"
  | "sprite"
  | "initialization"
  | "runtime";

export type InteractiveMapErrorEvent = Error & {
  stage: InteractiveMapErrorStage;
  recoverable: boolean;
  resourceUrl?: string;
};

type InteractiveMapErrorDetails = {
  stage: InteractiveMapErrorStage;
  error: Error;
  recoverable: boolean;
  resourceUrl?: string;
};

export type InteractiveMapReadyEvent = {
  map: MapLibreInstance;
  spriteUrl: string;
  usedSpriteFallback: boolean;
};

export type InteractiveMapLifecycleCallbacks = {
  onError?: (event: InteractiveMapErrorEvent) => void;
  onReady?: (event: InteractiveMapReadyEvent) => void;
};

export type MapLibreMapProps = InteractiveMapLifecycleCallbacks & {
  mapInfo: MapInfo;
  accessibleName?: string;
  unavailableLabel: string;
  assetBasePath?: string;
  markers: Marker[];
  regions: Region[];
  foundMarkerIds: Set<string>;
  routeMarkers: Marker[];
  selectedMarker: Marker | null;
  showLabels: boolean;
  showRegions: boolean;
  onSelectMarker: (markerId: string) => void;
  onCoordinate: (x: number, y: number) => void;
};

export type MapLibreMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  resize: () => void;
  fit: () => void;
  fitRoute: (markers: Marker[]) => void;
  focusMarker: (marker: Marker) => void;
};

const MARKER_SOURCE = "aion2-markers";
const MARKER_LAYER = "aion2-marker-icons";
const MARKER_LABEL_LAYER = "aion2-marker-labels";
const FOUND_LAYER = "aion2-marker-found";
const SELECTED_LAYER = "aion2-marker-selected";
const REGION_SOURCE = "aion2-regions";
const REGION_LAYER = "aion2-region-lines";
const ROUTE_SOURCE = "aion2-route";
const ROUTE_HALO_LAYER = "aion2-route-halo";
const ROUTE_LAYER = "aion2-route-line";
const ROUTE_POINT_SOURCE = "aion2-route-points";
const ROUTE_POINT_LAYER = "maplibre-route-index";
const ROUTE_POINT_LABEL_LAYER = "aion2-route-index-label";
const INTERACTIVE_MARKER_LAYERS = [
  ROUTE_POINT_LABEL_LAYER,
  ROUTE_POINT_LAYER,
  SELECTED_LAYER,
  FOUND_LAYER,
  MARKER_LABEL_LAYER,
  MARKER_LAYER,
];
const FALLBACK_SPRITE_URL = "/sprites/aion2";
const MAX_MERCATOR_LATITUDE = 85.0511287798066;
const MAX_ZOOM_OVERSCALE = 0.5;
const MARKER_ICON_SCALE = 1.5;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function worldYToLatitude(y: number) {
  const normalized = Math.PI * (1 - 2 * y);
  return (Math.atan(Math.sinh(normalized)) * 180) / Math.PI;
}

function latitudeToWorldY(latitude: number) {
  const safeLatitude = clamp(latitude, -MAX_MERCATOR_LATITUDE, MAX_MERCATOR_LATITUDE);
  const radians = (safeLatitude * Math.PI) / 180;
  return (1 - Math.asinh(Math.tan(radians)) / Math.PI) / 2;
}

export function gamePointToLngLat(mapInfo: MapInfo, x: number, y: number): [number, number] {
  const worldX = x / mapInfo.tileWorldSize;
  const worldY = y / mapInfo.tileWorldSize;
  return [worldX * 360 - 180, worldYToLatitude(worldY)];
}

function lngLatToGamePoint(mapInfo: MapInfo, longitude: number, latitude: number) {
  return {
    x: ((longitude + 180) / 360) * mapInfo.tileWorldSize,
    y: latitudeToWorldY(latitude) * mapInfo.tileWorldSize,
  };
}

function mapBounds(mapInfo: MapInfo): LngLatBoundsLike {
  const southWest = gamePointToLngLat(mapInfo, 0, mapInfo.height);
  const northEast = gamePointToLngLat(mapInfo, mapInfo.width, 0);
  return [southWest, northEast];
}

function hasUsableViewport(map: MapLibreInstance) {
  const container = map.getContainer();
  return container.clientWidth > 0 && container.clientHeight > 0;
}

function iconUrl(marker: Marker, mapInfo: MapInfo) {
  if (mapInfo.type === "dark" && marker.darkIconUrl) return marker.darkIconUrl;
  return marker.iconUrl || marker.darkIconUrl || "";
}

function spriteId(url: string) {
  const filename = url.split("/").pop()?.split("?")[0] ?? "";
  const extension = filename.lastIndexOf(".");
  return extension > 0 ? filename.slice(0, extension) : filename || "__fallback";
}

function markerDensityScale(markerCount: number) {
  const count = Math.max(0, markerCount);
  const density = Math.log1p(count / 240) / Math.log1p(1800 / 240);
  return clamp(1 - density * 0.42, 0.58, 1);
}

function markerFeatures(
  mapInfo: MapInfo,
  markers: Marker[],
): FeatureCollection<Point, MarkerProperties> {
  const densityScale = markerDensityScale(markers.length);
  return {
    type: "FeatureCollection",
    features: markers.map((marker) => ({
      type: "Feature",
      id: marker.id,
      geometry: {
        type: "Point",
        coordinates: gamePointToLngLat(mapInfo, marker.x, marker.y),
      },
      properties: {
        markerId: marker.id,
        iconId: spriteId(iconUrl(marker, mapInfo)),
        iconScale: (Number.isFinite(marker.iconScale) ? marker.iconScale : 1) * densityScale,
        label: marker.name || marker.subtypeLabel,
      },
    })),
  };
}

function regionFeatures(
  mapInfo: MapInfo,
  regions: Region[],
): FeatureCollection<LineString, RegionProperties> {
  const features: Array<Feature<LineString, RegionProperties>> = [];
  for (const region of regions) {
    for (const border of region.borders) {
      if (border.length < 2) continue;
      features.push({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: border.map(([x, y]) => gamePointToLngLat(mapInfo, x, y)),
        },
        properties: {
          name: region.name,
          label: region.label,
        },
      });
    }
  }
  return { type: "FeatureCollection", features };
}

function routeFeatures(
  mapInfo: MapInfo,
  markers: Marker[],
): FeatureCollection<LineString, RouteProperties> {
  return {
    type: "FeatureCollection",
    features:
      markers.length >= 2
        ? [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: markers.map((marker) =>
                  gamePointToLngLat(mapInfo, marker.x, marker.y),
                ),
              },
              properties: { route: true },
            },
          ]
        : [],
  };
}

function routePointFeatures(
  mapInfo: MapInfo,
  markers: Marker[],
): FeatureCollection<Point, RoutePointProperties> {
  return {
    type: "FeatureCollection",
    features: markers.map((marker, index) => ({
      type: "Feature",
      id: `${marker.id}:${index}`,
      geometry: {
        type: "Point",
        coordinates: gamePointToLngLat(mapInfo, marker.x, marker.y),
      },
      properties: {
        markerId: marker.id,
        routeIndex: String(index + 1),
      },
    })),
  };
}

function iconSizeExpression(mapInfo: MapInfo, selected = false): ExpressionSpecification {
  const multiplier = (selected ? 1.18 : 1) * MARKER_ICON_SCALE;
  const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
  return [
    "interpolate",
    ["exponential", 1.35],
    ["zoom"],
    0,
    [
      "*",
      ["coalesce", ["get", "iconScale"], 1],
      multiplier * 0.52,
    ],
    detailZoom,
    ["*", ["coalesce", ["get", "iconScale"], 1], multiplier * 0.72],
    detailZoom + MAX_ZOOM_OVERSCALE,
    ["*", ["coalesce", ["get", "iconScale"], 1], multiplier * 0.78],
  ] as ExpressionSpecification;
}

function labelSizeExpression(mapInfo: MapInfo): ExpressionSpecification {
  const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    0,
    10,
    detailZoom,
    12,
    detailZoom + MAX_ZOOM_OVERSCALE,
    12.5,
  ] as ExpressionSpecification;
}

function routeCircleRadiusExpression(mapInfo: MapInfo): ExpressionSpecification {
  const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    0,
    10,
    detailZoom,
    13,
    detailZoom + MAX_ZOOM_OVERSCALE,
    14,
  ] as ExpressionSpecification;
}

function routeTextSizeExpression(mapInfo: MapInfo): ExpressionSpecification {
  const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    0,
    11,
    detailZoom,
    13,
    detailZoom + MAX_ZOOM_OVERSCALE,
    14,
  ] as ExpressionSpecification;
}

function foundIconSizeExpression(mapInfo: MapInfo): ExpressionSpecification {
  const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    0,
    0.24,
    detailZoom,
    0.32,
    detailZoom + MAX_ZOOM_OVERSCALE,
    0.35,
  ] as ExpressionSpecification;
}

function toError(value: unknown, fallbackMessage: string) {
  if (value instanceof Error) return value;
  if (value && typeof value === "object" && "message" in value) {
    return new Error(String(value.message));
  }
  return new Error(value == null ? fallbackMessage : String(value));
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function mapSpriteUrl(mapInfo: MapInfo) {
  return `/sprites/maps/${mapInfo.slug}`;
}

async function verifySpriteAtlas(spriteUrl: string, signal: AbortSignal) {
  const resolutionSuffix = window.devicePixelRatio > 1 ? "@2x" : "";
  await Promise.all(
    [".json", ".png"].map(async (extension) => {
      const assetUrl = `${spriteUrl}${resolutionSuffix}${extension}`;
      const response = await fetch(assetUrl, {
        method: "HEAD",
        cache: "no-cache",
        signal,
      });
      if (!response.ok) {
        throw new Error(`Sprite atlas request failed (${response.status}): ${assetUrl}`);
      }
    }),
  );
}

function isSpriteRuntimeError(error: Error) {
  return /sprite|style image|image .* (?:missing|not found)|\/sprites\/.*\.(?:png|json)/i.test(
    error.message,
  );
}

export const MapLibreMap = forwardRef<MapLibreMapHandle, MapLibreMapProps>(
  function MapLibreMap(
    {
      mapInfo,
      accessibleName,
      unavailableLabel,
      assetBasePath,
      markers,
      regions,
      foundMarkerIds,
      routeMarkers,
      selectedMarker,
      showLabels,
      showRegions,
      onSelectMarker,
      onCoordinate,
      onError,
      onReady,
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreInstance | null>(null);
    const loadedRef = useRef(false);
    const appliedFoundRef = useRef<Set<string>>(new Set());
    const markersRef = useRef(markers);
    const regionsRef = useRef(regions);
    const foundRef = useRef(foundMarkerIds);
    const routeMarkersRef = useRef(routeMarkers);
    const selectedRef = useRef(selectedMarker);
    const labelsVisibleRef = useRef(showLabels);
    const regionsVisibleRef = useRef(showRegions);
    const onSelectRef = useRef(onSelectMarker);
    const onCoordinateRef = useRef(onCoordinate);
    const onErrorRef = useRef(onError);
    const onReadyRef = useRef(onReady);
    const accessibleNameRef = useRef(accessibleName);
    const pendingFocusRef = useRef<Marker | null>(null);
    const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");
    const [fatalError, setFatalError] = useState<Error | null>(null);

    markersRef.current = markers;
    regionsRef.current = regions;
    foundRef.current = foundMarkerIds;
    routeMarkersRef.current = routeMarkers;
    selectedRef.current = selectedMarker;
    labelsVisibleRef.current = showLabels;
    regionsVisibleRef.current = showRegions;
    onSelectRef.current = onSelectMarker;
    onCoordinateRef.current = onCoordinate;
    onErrorRef.current = onError;
    onReadyRef.current = onReady;
    accessibleNameRef.current = accessibleName;

    const reportError = useCallback((event: InteractiveMapErrorDetails) => {
      if (!event.recoverable) {
        setFatalError(event.error);
        setMapStatus("error");
      }
      const callbackError = Object.assign(event.error, {
        stage: event.stage,
        recoverable: event.recoverable,
        resourceUrl: event.resourceUrl,
      }) satisfies InteractiveMapErrorEvent;
      onErrorRef.current?.(callbackError);
    }, []);

    const syncFoundState = useCallback((reset = false) => {
      const map = mapRef.current;
      if (!map || !loadedRef.current || !map.getSource(MARKER_SOURCE)) return;

      try {
        if (reset) map.removeFeatureState({ source: MARKER_SOURCE });
        const previous = reset ? new Set<string>() : appliedFoundRef.current;
        const next = foundRef.current;

        for (const markerId of previous) {
          if (!next.has(markerId)) {
            map.setFeatureState({ source: MARKER_SOURCE, id: markerId }, { found: false });
          }
        }
        for (const markerId of next) {
          if (reset || !previous.has(markerId)) {
            map.setFeatureState({ source: MARKER_SOURCE, id: markerId }, { found: true });
          }
        }
        appliedFoundRef.current = new Set(next);
      } catch (error) {
        reportError({
          stage: "runtime",
          error: toError(error, "Failed to update marker progress"),
          recoverable: true,
        });
      }
    }, [reportError]);

    const syncRoute = useCallback(() => {
      const map = mapRef.current;
      if (!map || !loadedRef.current) return;
      (map.getSource(ROUTE_SOURCE) as GeoJSONSource | undefined)?.setData(
        routeFeatures(mapInfo, routeMarkersRef.current),
      );
      (map.getSource(ROUTE_POINT_SOURCE) as GeoJSONSource | undefined)?.setData(
        routePointFeatures(mapInfo, routeMarkersRef.current),
      );
    }, [mapInfo]);

    const fitMap = useCallback((duration = 0) => {
      const map = mapRef.current;
      if (!map || !hasUsableViewport(map)) return false;
      map.fitBounds(mapBounds(mapInfo), {
        padding: 24,
        duration,
        maxZoom: mapInfo.tileMaxZoom,
      });
      return true;
    }, [mapInfo]);

    const fitRoute = useCallback((route: Marker[], duration = 320) => {
      const map = mapRef.current;
      if (!map || route.length === 0 || !hasUsableViewport(map)) return;
      if (route.length === 1) {
        map.easeTo({
          center: gamePointToLngLat(mapInfo, route[0].x, route[0].y),
          zoom: Math.max(2.25, mapInfo.tileMaxZoom - 1),
          duration,
        });
        return;
      }
      const coordinates = route.map((marker) => gamePointToLngLat(mapInfo, marker.x, marker.y));
      const longitudes = coordinates.map(([longitude]) => longitude);
      const latitudes = coordinates.map(([, latitude]) => latitude);
      map.fitBounds(
        [
          [Math.min(...longitudes), Math.min(...latitudes)],
          [Math.max(...longitudes), Math.max(...latitudes)],
        ],
        { padding: 84, duration, maxZoom: Math.max(2.25, mapInfo.tileMaxZoom - 0.5) },
      );
    }, [mapInfo]);

    const focusMapMarker = useCallback((marker: Marker) => {
      pendingFocusRef.current = marker;
      const map = mapRef.current;
      if (!map || !loadedRef.current) return;
      pendingFocusRef.current = null;
      map.easeTo({
        center: gamePointToLngLat(mapInfo, marker.x, marker.y),
        zoom: Math.max(map.getZoom(), Math.max(2.25, mapInfo.tileMaxZoom - 1)),
        duration: 420,
      });
    }, [mapInfo]);

    useImperativeHandle(
      ref,
      () => ({
        zoomIn() {
          mapRef.current?.easeTo({ zoom: (mapRef.current?.getZoom() ?? 0) + 0.5, duration: 220 });
        },
        zoomOut() {
          mapRef.current?.easeTo({ zoom: (mapRef.current?.getZoom() ?? 0) - 0.5, duration: 220 });
        },
        resize() {
          mapRef.current?.resize();
        },
        fit() {
          fitMap(300);
        },
        fitRoute(markers) {
          fitRoute(markers);
        },
        focusMarker(marker) {
          focusMapMarker(marker);
        },
      }),
      [fitMap, fitRoute, focusMapMarker],
    );

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const abortController = new AbortController();
      const origin = window.location.origin;
      const fallbackSpriteUrl = `${origin}${FALLBACK_SPRITE_URL}`;
      let cancelled = false;
      let cursorFrame = 0;
      let webglRestoreTimer: number | null = null;
      let activeSpriteUrl = `${origin}${mapSpriteUrl(mapInfo)}`;
      let usedSpriteFallback = false;
      let spriteFallbackAttempted = false;
      let reportedMissingFallbackImage = false;
      const reportedRuntimeErrors = new Set<string>();

      setFatalError(null);
      setMapStatus("loading");

      const reportRuntimeOnce = (
        error: Error,
        stage: InteractiveMapErrorStage = "runtime",
        resourceUrl?: string,
      ) => {
        const signature = `${stage}:${resourceUrl ?? ""}:${error.message}`;
        if (reportedRuntimeErrors.has(signature)) return;
        reportedRuntimeErrors.add(signature);
        reportError({ stage, error, recoverable: true, resourceUrl });
      };

      async function initialize() {
        let maplibre: typeof import("maplibre-gl");
        try {
          maplibre = await import("maplibre-gl");
        } catch (error) {
          if (!cancelled) {
            reportError({
              stage: "import",
              error: toError(error, "Failed to load MapLibre"),
              recoverable: false,
            });
          }
          return;
        }
        if (cancelled || !container) return;

        if (!hasWebGLSupport()) {
          reportError({
            stage: "webgl",
            error: new Error("WebGL is unavailable in this browser"),
            recoverable: false,
          });
          return;
        }

        const primarySpriteUrl = `${origin}${mapSpriteUrl(mapInfo)}`;
        try {
          await verifySpriteAtlas(primarySpriteUrl, abortController.signal);
        } catch (error) {
          if (cancelled || isAbortError(error)) return;
          reportError({
            stage: "sprite",
            error: toError(error, "Failed to load the map sprite atlas"),
            recoverable: true,
            resourceUrl: primarySpriteUrl,
          });
          activeSpriteUrl = fallbackSpriteUrl;
          usedSpriteFallback = true;
          spriteFallbackAttempted = true;
          try {
            await verifySpriteAtlas(fallbackSpriteUrl, abortController.signal);
          } catch (fallbackError) {
            if (cancelled || isAbortError(fallbackError)) return;
            reportError({
              stage: "sprite",
              error: toError(fallbackError, "Failed to load the fallback sprite atlas"),
              recoverable: false,
              resourceUrl: fallbackSpriteUrl,
            });
            return;
          }
        }
        if (cancelled) return;

        const bounds = mapBounds(mapInfo);
        const tilePath = resolveMapAssetUrl(mapInfo.tileTemplate, assetBasePath);
        const tileUrl = /^(?:https?:)?\/\//u.test(tilePath)
          ? tilePath
          : `${origin}${tilePath}`;
        let map: MapLibreInstance;
        try {
          map = new maplibre.Map({
            container,
            style: {
              version: 8,
              sprite: activeSpriteUrl,
              sources: {
                "aion2-base-map": {
                  type: "raster",
                  tiles: [tileUrl],
                  tileSize: mapInfo.tileSize,
                  minzoom: mapInfo.tileMinZoom,
                  maxzoom: mapInfo.tileMaxZoom,
                  bounds: [
                    (bounds as [[number, number], [number, number]])[0][0],
                    (bounds as [[number, number], [number, number]])[0][1],
                    (bounds as [[number, number], [number, number]])[1][0],
                    (bounds as [[number, number], [number, number]])[1][1],
                  ],
                },
              },
              layers: [
                {
                  id: "aion2-background",
                  type: "background",
                  paint: { "background-color": "#090c11" },
                },
                {
                  id: "aion2-base-map-layer",
                  type: "raster",
                  source: "aion2-base-map",
                  paint: {
                    "raster-fade-duration": 80,
                    "raster-resampling": "linear",
                  },
                },
              ],
            },
            center: gamePointToLngLat(mapInfo, mapInfo.width / 2, mapInfo.height / 2),
            zoom: 0,
            minZoom: -2,
            maxZoom: mapInfo.tileMaxZoom + MAX_ZOOM_OVERSCALE,
            attributionControl: false,
            renderWorldCopies: false,
            dragRotate: false,
            pitchWithRotate: false,
            touchPitch: false,
            fadeDuration: 0,
            localIdeographFontFamily: "Arial, sans-serif",
          });
        } catch (error) {
          const mapError = toError(error, "Failed to initialize MapLibre");
          reportError({
            stage: /webgl/i.test(mapError.message) ? "webgl" : "initialization",
            error: mapError,
            recoverable: false,
          });
          container.replaceChildren();
          return;
        }
        if (cancelled) {
          map.remove();
          return;
        }

        mapRef.current = map;
        map.touchZoomRotate.disableRotation();
        map.getCanvas().setAttribute(
          "aria-label",
          accessibleNameRef.current || mapInfo.localizedName || mapInfo.displayName || mapInfo.name,
        );

        const activateSpriteFallback = (error: Error) => {
          if (cancelled || spriteFallbackAttempted) return;
          spriteFallbackAttempted = true;
          usedSpriteFallback = true;
          activeSpriteUrl = fallbackSpriteUrl;
          reportError({
            stage: "sprite",
            error,
            recoverable: true,
            resourceUrl: primarySpriteUrl,
          });
          void verifySpriteAtlas(fallbackSpriteUrl, abortController.signal)
            .then(() => {
              if (!cancelled && mapRef.current === map) map.setSprite(fallbackSpriteUrl);
            })
            .catch((fallbackError) => {
              if (cancelled || isAbortError(fallbackError)) return;
              reportError({
                stage: "sprite",
                error: toError(fallbackError, "Failed to load the fallback sprite atlas"),
                recoverable: false,
                resourceUrl: fallbackSpriteUrl,
              });
            });
        };

        map.on("error", (event: MapLibreErrorEvent) => {
          if (cancelled) return;
          const error = toError(event.error, "MapLibre runtime error");
          if (!usedSpriteFallback && isSpriteRuntimeError(error)) {
            activateSpriteFallback(error);
            return;
          }
          reportRuntimeOnce(error);
        });
        map.on("styleimagemissing", (event) => {
          const error = new Error(`Sprite image is missing: ${event.id}`);
          if (!usedSpriteFallback) {
            activateSpriteFallback(error);
            return;
          }
          if (reportedMissingFallbackImage) return;
          reportedMissingFallbackImage = true;
          reportRuntimeOnce(error, "sprite", activeSpriteUrl);
        });
        map.on("webglcontextlost", () => {
          setMapStatus("loading");
          reportRuntimeOnce(new Error("The WebGL context was lost"), "webgl");
          if (webglRestoreTimer !== null) window.clearTimeout(webglRestoreTimer);
          webglRestoreTimer = window.setTimeout(() => {
            webglRestoreTimer = null;
            if (cancelled || mapRef.current !== map) return;
            reportError({
              stage: "webgl",
              error: new Error("The WebGL context could not be restored"),
              recoverable: false,
            });
          }, 10_000);
        });
        map.on("webglcontextrestored", () => {
          map.once("render", () => {
            if (cancelled) return;
            if (webglRestoreTimer !== null) {
              window.clearTimeout(webglRestoreTimer);
              webglRestoreTimer = null;
            }
            appliedFoundRef.current = new Set();
            syncFoundState(true);
            setFatalError(null);
            setMapStatus("ready");
            onReadyRef.current?.({ map, spriteUrl: activeSpriteUrl, usedSpriteFallback });
          });
          map.triggerRepaint();
        });

        map.on("load", () => {
          if (cancelled) return;
          try {
            loadedRef.current = true;
            map.addSource(REGION_SOURCE, {
              type: "geojson",
              data: regionFeatures(mapInfo, regionsRef.current),
            });
            map.addLayer({
              id: REGION_LAYER,
              type: "line",
              source: REGION_SOURCE,
              layout: { visibility: regionsVisibleRef.current ? "visible" : "none" },
              paint: {
                "line-color": "rgba(255,255,255,0.78)",
                "line-width": 2,
                "line-dasharray": [4, 3],
              },
            });
            map.addSource(ROUTE_SOURCE, {
              type: "geojson",
              data: routeFeatures(mapInfo, routeMarkersRef.current),
            });
            map.addLayer({
              id: ROUTE_HALO_LAYER,
              type: "line",
              source: ROUTE_SOURCE,
              paint: {
                "line-color": "rgba(4, 7, 10, 0.88)",
                "line-width": 8,
                "line-opacity": 0.86,
              },
            });
            map.addLayer({
              id: ROUTE_LAYER,
              type: "line",
              source: ROUTE_SOURCE,
              paint: {
                "line-color": "#f2c94c",
                "line-width": 4,
                "line-opacity": 0.96,
                "line-dasharray": [1.5, 1],
              },
            });
            map.addSource(ROUTE_POINT_SOURCE, {
              type: "geojson",
              data: routePointFeatures(mapInfo, routeMarkersRef.current),
            });
            map.addSource(MARKER_SOURCE, {
              type: "geojson",
              data: markerFeatures(mapInfo, markersRef.current),
              promoteId: "markerId",
            });
            map.addLayer({
              id: MARKER_LABEL_LAYER,
              type: "symbol",
              source: MARKER_SOURCE,
              layout: {
                visibility: labelsVisibleRef.current ? "visible" : "none",
                "icon-image": ["get", "iconId"],
                "icon-size": iconSizeExpression(mapInfo),
                "icon-padding": 2,
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
                "text-field": ["get", "label"],
                "text-font": ["Arial"],
                "text-size": labelSizeExpression(mapInfo),
                "text-variable-anchor": ["left", "right", "top", "bottom"],
                "text-radial-offset": 1.1,
                "text-justify": "auto",
                "text-max-width": 18,
                "text-padding": 2,
                "text-optional": true,
              },
              paint: {
                "icon-opacity": [
                  "case",
                  ["boolean", ["feature-state", "found"], false],
                  0.38,
                  1,
                ],
                "text-color": "#f8fafc",
                "text-halo-color": "rgba(10, 12, 16, 0.92)",
                "text-halo-width": 2,
                "text-halo-blur": 0.5,
                "text-opacity": [
                  "case",
                  ["boolean", ["feature-state", "found"], false],
                  0.5,
                  1,
                ],
              },
            });
            map.addLayer({
              id: MARKER_LAYER,
              type: "symbol",
              source: MARKER_SOURCE,
              layout: {
                visibility: labelsVisibleRef.current ? "none" : "visible",
                "icon-image": ["get", "iconId"],
                "icon-size": iconSizeExpression(mapInfo),
                "icon-padding": 2,
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
              },
              paint: {
                "icon-opacity": [
                  "case",
                  ["boolean", ["feature-state", "found"], false],
                  0.38,
                  1,
                ],
              },
            });
            map.addLayer({
              id: SELECTED_LAYER,
              type: "symbol",
              source: MARKER_SOURCE,
              filter: ["==", ["get", "markerId"], selectedRef.current?.id ?? "__none"],
              layout: {
                "icon-image": ["get", "iconId"],
                "icon-size": iconSizeExpression(mapInfo, true),
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
              },
            });
            map.addLayer({
              id: FOUND_LAYER,
              type: "symbol",
              source: MARKER_SOURCE,
              layout: {
                "icon-image": "__found",
                "icon-size": foundIconSizeExpression(mapInfo),
                "icon-offset": [20, 20],
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
              },
              paint: {
                "icon-opacity": [
                  "case",
                  ["boolean", ["feature-state", "found"], false],
                  1,
                  0,
                ],
              },
            });
            map.addLayer({
              id: ROUTE_POINT_LAYER,
              type: "circle",
              source: ROUTE_POINT_SOURCE,
              paint: {
                "circle-radius": routeCircleRadiusExpression(mapInfo),
                "circle-color": "#f2c94c",
                "circle-stroke-color": "rgba(7, 10, 14, 0.92)",
                "circle-stroke-width": 3,
              },
            });
            map.addLayer({
              id: ROUTE_POINT_LABEL_LAYER,
              type: "symbol",
              source: ROUTE_POINT_SOURCE,
              layout: {
                "text-field": ["get", "routeIndex"],
                "text-font": ["Consolas"],
                "text-size": routeTextSizeExpression(mapInfo),
                "text-allow-overlap": true,
                "text-ignore-placement": true,
              },
              paint: {
                "text-color": "#0a0e14",
              },
            });
            syncFoundState(true);
          } catch (error) {
            loadedRef.current = false;
            reportError({
              stage: "initialization",
              error: toError(error, "Failed to configure the map"),
              recoverable: false,
            });
            map.remove();
            if (mapRef.current === map) mapRef.current = null;
            return;
          }

          try {
            if (fitMap()) {
              const fittedZoom = map.getZoom();
              map.setMinZoom(Math.max(-2, fittedZoom - 1));
            }
            if (pendingFocusRef.current) focusMapMarker(pendingFocusRef.current);
            if (routeMarkersRef.current.length > 0) fitRoute(routeMarkersRef.current, 0);
          } catch (error) {
            reportRuntimeOnce(toError(error, "Failed to set the initial map camera"));
          }
          setFatalError(null);
          setMapStatus("ready");
          onReadyRef.current?.({ map, spriteUrl: activeSpriteUrl, usedSpriteFallback });
        });

        map.on("click", INTERACTIVE_MARKER_LAYERS, (event) => {
          const markerId = event.features?.[0]?.properties?.markerId;
          if (typeof markerId === "string") onSelectRef.current(markerId);
        });
        map.on("mouseenter", INTERACTIVE_MARKER_LAYERS, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", INTERACTIVE_MARKER_LAYERS, () => {
          map.getCanvas().style.cursor = "grab";
        });
        map.on("mousemove", (event: MapMouseEvent) => {
          if (cursorFrame) return;
          cursorFrame = window.requestAnimationFrame(() => {
            cursorFrame = 0;
            const point = lngLatToGamePoint(mapInfo, event.lngLat.lng, event.lngLat.lat);
            const sourceX = clamp(point.x / mapInfo.scaleX, 0, mapInfo.sourceWidth);
            const sourceY = clamp(
              mapInfo.sourceHeight - point.y / mapInfo.scaleY,
              0,
              mapInfo.sourceHeight,
            );
            onCoordinateRef.current(sourceX, sourceY);
          });
        });
      }

      void initialize().catch((error) => {
        if (cancelled || isAbortError(error)) return;
        reportError({
          stage: "initialization",
          error: toError(error, "Unexpected map initialization failure"),
          recoverable: false,
        });
      });
      return () => {
        cancelled = true;
        abortController.abort();
        if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
        if (webglRestoreTimer !== null) window.clearTimeout(webglRestoreTimer);
        loadedRef.current = false;
        appliedFoundRef.current = new Set();
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }, [assetBasePath, fitMap, fitRoute, focusMapMarker, mapInfo, reportError, syncFoundState]);

    useEffect(() => {
      mapRef.current?.getCanvas().setAttribute(
        "aria-label",
        accessibleName || mapInfo.localizedName || mapInfo.displayName || mapInfo.name,
      );
    }, [accessibleName, mapInfo.displayName, mapInfo.localizedName, mapInfo.name]);

    useEffect(() => {
      const map = mapRef.current;
      if (!map || !loadedRef.current) return;
      (map.getSource(MARKER_SOURCE) as GeoJSONSource | undefined)?.setData(
        markerFeatures(mapInfo, markers),
      );
      syncFoundState(true);
    }, [mapInfo, markers, syncFoundState]);

    useEffect(() => {
      syncFoundState();
    }, [foundMarkerIds, syncFoundState]);

    useEffect(() => {
      syncRoute();
    }, [routeMarkers, syncRoute]);

    useEffect(() => {
      const map = mapRef.current;
      if (!map || !loadedRef.current || !map.getLayer(SELECTED_LAYER)) return;
      map.setFilter(SELECTED_LAYER, [
        "==",
        ["get", "markerId"],
        selectedMarker?.id ?? "__none",
      ]);
    }, [selectedMarker]);

    useEffect(() => {
      const map = mapRef.current;
      if (!map || !loadedRef.current) return;
      (map.getSource(REGION_SOURCE) as GeoJSONSource | undefined)?.setData(
        regionFeatures(mapInfo, regions),
      );
    }, [mapInfo, regions]);

    useEffect(() => {
      const map = mapRef.current;
      if (!map || !loadedRef.current || !map.getLayer(REGION_LAYER)) return;
      map.setLayoutProperty(REGION_LAYER, "visibility", showRegions ? "visible" : "none");
    }, [showRegions]);

    useEffect(() => {
      const map = mapRef.current;
      if (
        !map ||
        !loadedRef.current ||
        !map.getLayer(MARKER_LABEL_LAYER) ||
        !map.getLayer(MARKER_LAYER)
      ) {
        return;
      }
      map.setLayoutProperty(
        MARKER_LABEL_LAYER,
        "visibility",
        showLabels ? "visible" : "none",
      );
      map.setLayoutProperty(
        MARKER_LAYER,
        "visibility",
        showLabels ? "none" : "visible",
      );
    }, [showLabels]);

    return (
      <div className="maplibre-map-root" data-map-status={mapStatus}>
        <div
          className="maplibre-map-canvas"
          ref={containerRef}
          role="region"
          aria-label={accessibleName || mapInfo.localizedName || mapInfo.displayName || mapInfo.name}
          aria-busy={mapStatus === "loading"}
        />
        {fatalError && (
          <div
            className="maplibre-engine-badge"
            role="alert"
            title={unavailableLabel}
          >
            {unavailableLabel}
          </div>
        )}
      </div>
    );
  },
);
