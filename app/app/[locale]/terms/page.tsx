import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrustPage } from "@/app/_components/trust/TrustPage";
import { getPfgAuthorHref, PFG_AUTHOR_NAME } from "@/app/author-profile";
import { isSiteLocale } from "@/app/site-config";

import {
  buildStaticRouteMetadata,
  trustRouteSeoCopy,
} from "../_static-route-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();
  const seo = trustRouteSeoCopy[locale].terms;
  return buildStaticRouteMetadata({
    locale,
    path: "/terms/",
    title: seo.title,
    description: seo.description,
    imageAlt: seo.title,
    authors: [{ name: PFG_AUTHOR_NAME, url: getPfgAuthorHref(locale) }],
    creator: PFG_AUTHOR_NAME,
    publisher: "AION2 KINA",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();
  return <TrustPage kind="terms" locale={locale} />;
}
