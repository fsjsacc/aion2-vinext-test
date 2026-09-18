import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolDetail } from "@/app/_components/tools/ToolDetail";
import {
  getLanguageAlternates,
  isSiteLocale,
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";
import { buildSeoDescription } from "@/app/seo-metadata";
import {
  createRegistryToolStaticParams,
  getRegistryDetailTool,
} from "@/app/tool-registry";

type Props = { params: Promise<{ locale: string; tool: string }> };

export function generateStaticParams() {
  return createRegistryToolStaticParams();
}

function resolveTool(localeValue: string, slug: string) {
  if (!isSiteLocale(localeValue)) notFound();
  const tool = getRegistryDetailTool(slug);
  if (!tool) notFound();
  return { locale: localeValue as SiteLocale, tool };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await params;
  const { locale, tool } = resolveTool(route.locale, route.tool);
  const content = tool.copy[locale];
  const suffix = `/tools/${tool.slug}/`;
  const canonical = `/${locale}${suffix}`;
  const title = `${content.name} | AION2 KINA`;
  const description = buildSeoDescription(
    content.description,
    locale,
    `tool:${tool.slug}`,
  );
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
      locale: siteLocaleConfig[locale].code,
      images: [{
        url: socialImage,
        width: 1920,
        height: 1080,
        alt: content.name,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{
        url: socialImage,
        width: 1920,
        height: 1080,
        alt: content.name,
      }],
    },
  };
}

export default async function RegisteredToolRoute({ params }: Props) {
  const route = await params;
  const { locale, tool } = resolveTool(route.locale, route.tool);
  return <ToolDetail locale={locale} tool={tool} />;
}
