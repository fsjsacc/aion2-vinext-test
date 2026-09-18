"use client";

import {
  isAnalyticsLocale,
  isAnalyticsService,
  isAnalyticsSurface,
  isAnalyticsTargetKind,
  isMirroredAnalyticsEvent,
  type AnalyticsSurface,
  type AnalyticsTargetKind,
  type MirroredAnalyticsPayload,
} from "./analytics-events";
import { collectJourneyEvent, readAnalyticsConsent } from "./analytics-journey";
import { siteLocales } from "./site-config";

export type AnalyticsPayload = Record<string, unknown>;

const ADMIN_PATH_PATTERN = new RegExp(
  `^/(?:(?:${siteLocales.join("|")})/)?admin(?:/|$)`,
  "u",
);
const CONTENT_SECTIONS = new Set(["guides", "classes", "news", "database"]);
const TOOL_KEYS = new Set([
  "class-finder",
  "code-center",
  "daily-checklist",
  "event-timer",
  "interactive-map",
  "material-calculator",
  "site-contact",
]);
const PRODUCTION_ANALYTICS_HOSTS = new Set([
  "aion2kina.com",
  "www.aion2kina.com",
]);
let lastTrackedPageViewLocation: string | null = null;

export function isProductionAnalyticsHost(hostname: string) {
  return PRODUCTION_ANALYTICS_HOSTS.has(hostname.toLowerCase());
}

function mayDispatchAnalytics() {
  return (
    typeof window !== "undefined" &&
    isProductionAnalyticsHost(window.location.hostname) &&
    !ADMIN_PATH_PATTERN.test(window.location.pathname)
  );
}

function slugSegment(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .slice(0, 80);
  return normalized || null;
}

function normalizedPathKey(value: unknown) {
  if (typeof value !== "string") return null;
  const segments = value.split("/").map(slugSegment).filter(Boolean);
  if (segments.length < 1 || segments.length > 2) return null;
  const normalized = segments.join("/");
  return normalized.length <= 160 ? normalized : null;
}

function normalizedLocale(payload: AnalyticsPayload) {
  if (isAnalyticsLocale(payload.locale)) return payload.locale;
  const routeLocale = window.location.pathname.split("/")[1]?.toLowerCase();
  return isAnalyticsLocale(routeLocale) ? routeLocale : "unknown";
}

function normalizedService(payload: AnalyticsPayload) {
  return isAnalyticsService(payload.service) ? payload.service : "unknown";
}

function normalizedSurface(
  event: string,
  payload: AnalyticsPayload,
): AnalyticsSurface {
  const candidate = typeof payload.surface === "string"
    ? payload.surface.replaceAll("_", "-")
    : typeof payload.source === "string"
      ? payload.source.replaceAll("_", "-")
      : "";
  if (/^directory-[0-9]+$/u.test(candidate)) return "home-directory";
  if (candidate === "hub-published-card") return "content-hub";
  if (isAnalyticsSurface(candidate)) return candidate;

  const toolName = slugSegment(payload.tool_name);
  if (toolName && isAnalyticsSurface(toolName)) return toolName;
  if (event === "content_card_click") return "content-hub";
  if (event === "map_to_guide_click") return "map-seo";
  if (event.startsWith("map_")) return "interactive-map";
  if (event.startsWith("material_calculator_")) return "material-calculator";
  if (event.startsWith("event_timer_")) return "event-timer";
  if (event.startsWith("report_outdated_")) return "correction-report";
  if (event === "language_change") return "faction-gate";
  return "unknown";
}

function explicitTarget(payload: AnalyticsPayload): {
  targetKind: AnalyticsTargetKind;
  targetKey: string;
} | null {
  if (!isAnalyticsTargetKind(payload.target_kind)) return null;
  if (payload.target_kind === "none") {
    return { targetKind: "none", targetKey: "none" };
  }
  if (payload.target_kind === "item") {
    const itemId = typeof payload.target_key === "string"
      && /^[1-9]\d{0,17}$/u.test(payload.target_key)
      ? payload.target_key
      : null;
    return itemId ? { targetKind: "item", targetKey: itemId } : null;
  }
  const key = normalizedPathKey(payload.target_key);
  if (!key) return null;
  if (payload.target_kind === "tool" && !TOOL_KEYS.has(key)) return null;
  return { targetKind: payload.target_kind, targetKey: key };
}

function normalizedTarget(
  event: string,
  payload: AnalyticsPayload,
): { targetKind: AnalyticsTargetKind; targetKey: string } {
  const explicit = explicitTarget(payload);
  if (explicit) return explicit;

  const contentSlug = slugSegment(payload.content_slug);
  const contentSection = slugSegment(payload.section);
  if (
    contentSlug &&
    contentSection &&
    CONTENT_SECTIONS.has(contentSection)
  ) {
    return {
      targetKind: "content",
      targetKey: `${contentSection}/${contentSlug}`,
    };
  }

  const mapName = slugSegment(payload.map_name);
  if (mapName) return { targetKind: "map", targetKey: mapName };

  const toolName = slugSegment(payload.tool_name);
  if (toolName && TOOL_KEYS.has(toolName)) {
    return { targetKind: "tool", targetKey: toolName };
  }

  if (event.startsWith("material_calculator_")) {
    return { targetKind: "tool", targetKey: "material-calculator" };
  }
  if (event.startsWith("event_timer_")) {
    return { targetKind: "tool", targetKey: "event-timer" };
  }
  if (event.startsWith("code_")) {
    return { targetKind: "tool", targetKey: "code-center" };
  }
  if (event.startsWith("checklist_") || event === "home_checklist_open") {
    return { targetKind: "tool", targetKey: "daily-checklist" };
  }
  if (
    event.startsWith("map_") ||
    event === "guide_to_map_click"
  ) {
    return { targetKind: "tool", targetKey: "interactive-map" };
  }
  if (
    event === "guide_click" ||
    event === "poster_open" ||
    event === "question_answer" ||
    event === "result_view" ||
    event === "save_local" ||
    event === "tool_start"
  ) {
    return { targetKind: "tool", targetKey: "class-finder" };
  }
  return { targetKind: "none", targetKey: "none" };
}

export function createMirroredAnalyticsPayload(
  event: string,
  payload: AnalyticsPayload,
): MirroredAnalyticsPayload | null {
  if (!isMirroredAnalyticsEvent(event)) return null;
  const target = normalizedTarget(event, payload);
  return {
    event,
    locale: normalizedLocale(payload),
    service: normalizedService(payload),
    surface: normalizedSurface(event, payload),
    ...target,
  };
}

function mirrorEvent(event: string, payload: AnalyticsPayload) {
  if (
    !mayDispatchAnalytics() ||
    readAnalyticsConsent() !== "granted" ||
    ADMIN_PATH_PATTERN.test(window.location.pathname)
  ) return;
  const mirrored = createMirroredAnalyticsPayload(event, payload);
  if (!mirrored) return;

  collectJourneyEvent(mirrored);

  try {
    const body = JSON.stringify(mirrored);
    if (typeof window.navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (window.navigator.sendBeacon("/api/events", blob)) return;
    }
    void window.fetch("/api/events", {
      method: "POST",
      body,
      credentials: "same-origin",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // First-party aggregation is best-effort and must never block navigation.
  }
}

/**
 * Sends one product event to the site's internal event bridge and the active
 * Google Analytics transport (direct gtag when present, otherwise GTM).
 * Keeping this in one place prevents tools from drifting into incompatible
 * event shapes as more planning workflows are connected.
 */
export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (!mayDispatchAnalytics()) return;

  const detail = { event, ...payload };
  window.dispatchEvent(new CustomEvent("aion2:analytics", { detail }));

  const analyticsWindow = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, params: AnalyticsPayload) => void;
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  const maySendGoogleAnalytics =
    readAnalyticsConsent() === "granted" &&
    !ADMIN_PATH_PATTERN.test(window.location.pathname);
  if (maySendGoogleAnalytics && typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", event, payload);
  } else if (maySendGoogleAnalytics) {
    analyticsWindow.dataLayer.push(detail);
  }
  mirrorEvent(event, payload);
}

type PageViewPayload = {
  page_location: string;
  page_referrer: string;
  page_title: string;
};

/**
 * Sends a manually controlled GA4 page view. The direct GA4 config disables
 * automatic page views, so the consent manager can emit exactly one initial
 * view and one view for each client-side route change.
 */
export function trackPageView(payload: PageViewPayload) {
  if (
    !mayDispatchAnalytics() ||
    readAnalyticsConsent() !== "granted" ||
    lastTrackedPageViewLocation === payload.page_location
  ) return;
  lastTrackedPageViewLocation = payload.page_location;

  const analyticsWindow = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: "page_view",
      params: PageViewPayload,
    ) => void;
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", "page_view", payload);
  } else {
    analyticsWindow.dataLayer.push({ event: "page_view", ...payload });
  }
}
