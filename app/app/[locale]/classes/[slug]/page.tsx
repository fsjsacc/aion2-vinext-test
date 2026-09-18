import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildContentMetadata,
  ContentDetail,
} from "@/app/_components/content/ContentDetail";
import {
  getContentEntry,
  getContentStaticParams,
} from "@/app/content-registry";
import { isSiteLocale, type SiteLocale } from "@/app/site-config";
import { getContentOverrides } from "@/app/content-overrides";

type Props = { params: Promise<{ locale: string; slug: string }> };

async function resolveContent(localeValue: string, slug: string) {
  if (!isSiteLocale(localeValue)) notFound();
  const overrides = await getContentOverrides();
  const entry = overrides.get(`classes/${slug}`) ?? getContentEntry("classes", slug);
  if (!entry) notFound();
  return { entry, locale: localeValue as SiteLocale };
}

export function generateStaticParams() {
  return getContentStaticParams("classes");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const { entry, locale } = await resolveContent(localeValue, slug);
  return buildContentMetadata(entry, locale);
}

export default async function ClassDetailRoute({ params }: Props) {
  const { locale: localeValue, slug } = await params;
  const { entry, locale } = await resolveContent(localeValue, slug);
  return <ContentDetail entry={entry} locale={locale} />;
}
