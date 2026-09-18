import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CodesPage } from "@/app/_components/codes/CodesPage";
import { codePageCopy } from "@/app/code-registry";
import { buildSeoDescription } from "@/app/seo-metadata";
import {
  isSiteLocale,
  siteLocales,
  type SiteLocale,
} from "@/app/site-config";

import { buildStaticRouteMetadata } from "../_static-route-metadata";

type Props = { params: Promise<{ locale: string }> };

const pageTitles: Record<SiteLocale, string> = {
  "zh-hans": "AION2 兑换码 Code、有效期限与使用教程 | KINA",
  en: "AION2 Codes: Active Coupons & Redeem Guide | KINA",
  fr: "Codes AION2 actifs, dates et guide d’utilisation | KINA",
  de: "AION2-Codes: Aktive Coupons & Einlöseanleitung | KINA",
  es: "Códigos de AION2 activos, fechas y guía | KINA",
  ja: "AION2 クーポンコード・期限・登録方法 | KINA",
  "pt-br": "Códigos de AION2 ativos, datas e guia | KINA",
  ru: "Коды AION2: активные купоны и инструкция | KINA",
  ko: "AION2 쿠폰 코드·기간·등록 방법 | KINA",
  "zh-hant": "AION2 兌換碼／序號、期限與使用教學 | KINA",
};

const pageKeywords: Record<SiteLocale, readonly string[]> = {
  "zh-hans": ["AION2 兑换码", "AION2 优惠券", "AION2 code", "AION2CHAPTERONE"],
  en: ["AION2 codes", "AION2 coupon code", "AION2 redeem code", "AION2CHAPTERONE"],
  fr: ["codes AION2", "code coupon AION2", "utiliser code AION2", "AION2CHAPTERONE"],
  de: ["AION2 Codes", "AION2 Coupon Code", "AION2 Code einlösen", "AION2CHAPTERONE"],
  es: ["códigos AION2", "código cupón AION2", "canjear código AION2", "AION2CHAPTERONE"],
  ja: ["AION2 クーポンコード", "AION2 コード", "AION2 クーポン 登録", "AION2CHAPTERONE"],
  "pt-br": ["códigos AION2", "código de cupom AION2", "resgatar código AION2", "AION2CHAPTERONE"],
  ru: ["коды AION2", "купон AION2", "активировать код AION2", "AION2CHAPTERONE"],
  ko: ["AION2 쿠폰", "AION2 쿠폰 코드", "AION2 쿠폰 등록", "AION2CHAPTERONE"],
  "zh-hant": ["AION2 兌換碼", "AION2 序號", "AION2 優惠券", "AION2 Code", "AION2CHAPTERONE"],
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
  const copy = codePageCopy[locale];
  const title = pageTitles[locale];
  const description = buildSeoDescription(copy.description, locale, "codes");

  return buildStaticRouteMetadata({
    locale,
    path: "/codes/",
    title,
    description,
    keywords: [...pageKeywords[locale]],
    imageAlt: copy.title,
  });
}

export default async function CodesRoute({ params }: Props) {
  const locale = requireLocale((await params).locale);
  return <CodesPage locale={locale} />;
}
