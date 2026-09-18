"use client";

import type { SiteLocale } from "./site-config";

export function persistSiteLocale(locale: SiteLocale) {
  document.cookie = `aion2-atlas-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
