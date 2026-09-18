import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  localeFromAcceptLanguage,
  localeFromCookie,
} from "./locale-preference";
import {
  localizedHref,
  DEFAULT_SITE_LOCALE,
} from "./site-config";
import { getRequestSiteOrigin } from "./site-url";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const locale =
    localeFromCookie(requestHeaders.get("cookie")) ??
    localeFromAcceptLanguage(requestHeaders.get("accept-language")) ??
    DEFAULT_SITE_LOCALE;
  const siteOrigin = await getRequestSiteOrigin();
  const canonical = siteOrigin
    ? `${siteOrigin}/${locale}/`
    : `/${locale}/`;

  return {
    robots: { index: false, follow: true },
    alternates: { canonical },
  };
}

export default async function LocaleEntryRedirect() {
  const requestHeaders = await headers();
  const locale =
    localeFromCookie(requestHeaders.get("cookie")) ??
    localeFromAcceptLanguage(requestHeaders.get("accept-language"));

  redirect(localizedHref(locale));
}
