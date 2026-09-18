import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildContentMetadata,
  ContentDetail,
} from "@/app/_components/content/ContentDetail";
import {
  getCanonicalContentStaticParams,
  getContentEntry,
} from "@/app/content-registry";
import { getContentIdentityByCanonicalSuffix } from "@/app/content-routes";
import {
  isSiteLocale,
  type SiteLocale,
} from "@/app/site-config";

type Props = {
  params: Promise<{ locale: string; missing: string[] }>;
};

function findContent(localeValue: string, missing: string[]) {
  if (!isSiteLocale(localeValue)) return null;
  const identity = getContentIdentityByCanonicalSuffix(`/${missing.join("/")}/`);
  if (!identity) return null;
  const entry = getContentEntry(identity.section, identity.slug);
  if (!entry) return null;
  return { entry, locale: localeValue as SiteLocale };
}

export function generateStaticParams() {
  return getCanonicalContentStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeValue, missing } = await params;
  const content = findContent(localeValue, missing);
  if (!content) return {};
  const { entry, locale } = content;
  return buildContentMetadata(entry, locale);
}

export default async function MissingLocalizedRoute({ params }: Props) {
  const { locale: localeValue, missing } = await params;
  const content = findContent(localeValue, missing);
  if (!content) notFound();
  const { entry, locale } = content;
  return <ContentDetail entry={entry} locale={locale} />;
}
