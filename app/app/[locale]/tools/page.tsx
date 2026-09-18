import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolsHub } from "@/app/_components/tools/ToolsHub";
import {
  isSiteLocale,
  siteLocales,
  type SiteLocale,
} from "@/app/site-config";
import { buildSeoDescription } from "@/app/seo-metadata";
import { toolHubCopy } from "@/app/tool-registry";

import { buildStaticRouteMetadata } from "../_static-route-metadata";

type Props = { params: Promise<{ locale: string }> };

function requireLocale(value: string): SiteLocale {
  if (!isSiteLocale(value)) notFound();
  return value;
}

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const content = toolHubCopy[locale];
  const title = `${content.title} | AION2 KINA`;
  const description = buildSeoDescription(content.description, locale, "tools");

  return buildStaticRouteMetadata({
    locale,
    path: "/tools/",
    title,
    description,
    imageAlt: content.title,
  });
}

export default async function ToolsHubRoute({ params }: Props) {
  const locale = requireLocale((await params).locale);
  return <ToolsHub locale={locale} />;
}
