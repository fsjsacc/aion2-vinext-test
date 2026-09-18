"use client";

import type { MirroredAnalyticsPayload } from "./analytics-events";
import { siteLocales } from "./site-config";

export type AnalyticsConsent = "granted" | "denied";

export const ANALYTICS_CONSENT_STORAGE_KEY = "aion2-analytics-consent-v2";
export const ANALYTICS_VISITOR_STORAGE_KEY = "aion2-analytics-visitor-v1";
export const ANALYTICS_SESSION_STORAGE_KEY = "aion2-analytics-session-v1";
export const ANALYTICS_CONSENT_COOKIE = "aion2_analytics_consent";

const ADMIN_PATH_PATTERN = new RegExp(
  `^/(?:(?:${siteLocales.join("|")})/)?admin(?:/|$)`,
  "u",
);

function validUuid(value: string | null) {
  return value && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value)
    ? value.toLowerCase()
    : null;
}

function randomId() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : null;
}

function storedId(storage: Storage, key: string) {
  try {
    const current = validUuid(storage.getItem(key));
    if (current) return current;
    const next = randomId();
    if (next) storage.setItem(key, next);
    return next;
  } catch {
    return null;
  }
}

function safeMarketingValue(value: string | null, maximum: number) {
  if (!value) return undefined;
  const normalized = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/gu, "-")
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/gu, "")
    .slice(0, maximum)
    .replace(/[^a-z0-9]+$/gu, "");
  return normalized || undefined;
}

function marketingParameters() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = safeMarketingValue(params.get("utm_source"), 80);
  const utmMedium = safeMarketingValue(params.get("utm_medium"), 80);
  const utmCampaign = safeMarketingValue(params.get("utm_campaign"), 120);
  return {
    ...(utmSource ? { utmSource } : {}),
    ...(utmMedium ? { utmMedium } : {}),
    ...(utmCampaign ? { utmCampaign } : {}),
  };
}

function send(path: string, value: unknown) {
  try {
    const body = JSON.stringify(value);
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(path, blob)) return;
    }
    void fetch(path, {
      method: "POST",
      body,
      credentials: "same-origin",
      headers: { "content-type": "application/json", accept: "application/json" },
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Journey analytics is best-effort and must never block navigation.
  }
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    // Consent now defaults to granted for every visitor; only an explicit
    // stored "denied" choice keeps detailed analytics disabled.
    return value === "denied" ? "denied" : "granted";
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(value: AnalyticsConsent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
    window.localStorage.removeItem("aion2-analytics-consent-v1");
  } catch {
    // Cookie remains the server-side consent signal when storage is blocked.
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ANALYTICS_CONSENT_COOKIE}=${value}-v2; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export function updateGoogleAnalyticsConsent(value: AnalyticsConsent) {
  const analyticsWindow = window as typeof window & {
    gtag?: (command: string, action: string, payload: Record<string, string>) => void;
    aion2LoadGtm?: (consentGranted?: boolean) => void;
    aion2ResetAnalyticsAfterDenial?: () => void;
  };
  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: value === "denied" ? "denied" : "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (value === "granted") {
    analyticsWindow.aion2LoadGtm?.(true);
  } else {
    analyticsWindow.aion2ResetAnalyticsAfterDenial?.();
  }
}

export function clearJourneyIdentity() {
  try {
    window.localStorage.removeItem(ANALYTICS_VISITOR_STORAGE_KEY);
    window.sessionStorage.removeItem(ANALYTICS_SESSION_STORAGE_KEY);
  } catch {
    // Nothing else to clear.
  }
}

export function deleteStoredJourney() {
  let visitorId: string | null = null;
  try {
    visitorId = validUuid(window.localStorage.getItem(ANALYTICS_VISITOR_STORAGE_KEY));
  } catch {
    visitorId = null;
  }
  if (visitorId) {
    send("/api/journey-events/delete", { consentVersion: 2, visitorId });
  }
}

type JourneyEvent = MirroredAnalyticsPayload | {
  event: "page_view";
  locale: MirroredAnalyticsPayload["locale"];
  service: MirroredAnalyticsPayload["service"];
  surface: MirroredAnalyticsPayload["surface"];
  targetKind: MirroredAnalyticsPayload["targetKind"];
  targetKey: string;
};

export function collectJourneyEvent(event: JourneyEvent) {
  if (
    typeof window === "undefined" ||
    readAnalyticsConsent() !== "granted" ||
    ADMIN_PATH_PATTERN.test(window.location.pathname)
  ) {
    return;
  }
  const visitorId = storedId(window.localStorage, ANALYTICS_VISITOR_STORAGE_KEY);
  const sessionId = storedId(window.sessionStorage, ANALYTICS_SESSION_STORAGE_KEY);
  if (!visitorId || !sessionId) return;
  send("/api/journey-events/collect", {
    consentVersion: 2,
    visitorId,
    sessionId,
    ...event,
    path: window.location.pathname,
    marketing: marketingParameters(),
  });
}
