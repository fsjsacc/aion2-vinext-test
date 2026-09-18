import type { Metadata } from "next";

import {
  getLanguageAlternates,
  localizedHref,
  siteLocaleConfig,
  type SiteLocale,
} from "./site-config";
import { trustPageCopy, type TrustPageKind } from "./trust-content";

export function getTrustPageMetadata(
  locale: SiteLocale,
  kind: TrustPageKind,
): Metadata {
  const copy = trustPageCopy[locale][kind];
  const path = `/${kind}/`;
  const canonical = localizedHref(locale, path);
  const title = `${copy.title} | AION2 KINA`;

  return {
    title,
    description: copy.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title,
      description: copy.description,
      url: canonical,
      locale: siteLocaleConfig[locale].openGraphLocale,
      images: [{ url: "/aion2-dual.webp", width: 1920, height: 1080 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.description,
      images: ["/aion2-dual.webp"],
    },
  };
}
