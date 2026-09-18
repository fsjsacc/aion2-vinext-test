import type { Metadata } from "next";

import type { HubContent, HubSection } from "./hub-content";
import {
  getLanguageAlternates,
  siteLocaleConfig,
  type SiteLocale,
} from "./site-config";
import { buildSeoDescription } from "./seo-metadata";

export function buildHubMetadata(
  locale: SiteLocale,
  section: HubSection,
  content: HubContent,
): Metadata {
  const suffix = `/${section}/`;
  const canonical = `/${locale}${suffix}`;
  const title = `${content.title} | AION2 KINA`;
  const description = buildSeoDescription(content.description, locale, `hub:${section}`);
  const socialImage = "/aion2-dual.webp";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: getLanguageAlternates(suffix),
    },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title,
      description,
      url: canonical,
      locale: siteLocaleConfig[locale].openGraphLocale,
      images: [{ url: socialImage, width: 1920, height: 1080, alt: content.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
