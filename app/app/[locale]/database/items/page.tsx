import { notFound, permanentRedirect } from "next/navigation";

import {
  isSiteLocale,
  localizedHref,
  siteLocales,
  type SiteLocale,
} from "@/app/site-config";

type Props = { params: Promise<{ locale: string }> };

function requireLocale(value: string): SiteLocale {
  if (!isSiteLocale(value)) notFound();
  return value;
}

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export default async function LegacyItemDatabaseRoute({ params }: Props) {
  const locale = requireLocale((await params).locale);
  permanentRedirect(localizedHref(locale, "/database/"));
}
