import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HubPage } from "@/app/_components/hub/HubPage";
import { hubContent } from "@/app/hub-content";
import { buildSeoDescription } from "@/app/seo-metadata";
import {
  isSiteLocale,
  siteLocales,
  type SiteLocale,
} from "@/app/site-config";

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
  const content = hubContent[locale].guides;
  const title = `${content.title} | AION2 KINA`;
  return buildStaticRouteMetadata({
    locale,
    path: "/guides/",
    title,
    description: buildSeoDescription(
      content.description,
      locale,
      "hub:guides",
    ),
    imageAlt: content.title,
  });
}

export default async function GuidesHubRoute({ params }: Props) {
  const locale = requireLocale((await params).locale);
  return <HubPage locale={locale} section="guides" content={hubContent[locale].guides} />;
}
