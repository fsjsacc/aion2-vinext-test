import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SearchPage } from "@/app/_components/hub/HubPage";
import { searchSite } from "@/app/search-index";
import {
  isSiteLocale,
  siteLocales,
  type SiteLocale,
} from "@/app/site-config";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
};

function requireLocale(value: string): SiteLocale {
  if (!isSiteLocale(value)) notFound();
  return value;
}

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const titles: Record<SiteLocale, string> = {
    "zh-hans": "搜索 AION2 KINA",
    "zh-hant": "搜尋 AION2 KINA",
    en: "Search AION2 KINA",
    fr: "Rechercher sur AION2 KINA",
    de: "AION2 KINA durchsuchen",
    es: "Buscar en AION2 KINA",
    ja: "AION2 KINA を検索",
    "pt-br": "Pesquisar no AION2 KINA",
    ru: "Поиск по AION2 KINA",
    ko: "AION2 KINA 검색",
  };

  return {
    title: `${titles[locale]} | AION2 KINA`,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/search/`,
    },
  };
}

export default async function SearchRoute({ params, searchParams }: Props) {
  const locale = requireLocale((await params).locale);
  const rawQuery = (await searchParams).q;
  const query = (Array.isArray(rawQuery) ? rawQuery[0] : rawQuery ?? "")
    .trim()
    .slice(0, 160);

  return <SearchPage locale={locale} query={query} results={await searchSite(locale, query)} />;
}
