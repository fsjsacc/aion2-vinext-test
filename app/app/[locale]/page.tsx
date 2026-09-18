import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  HomePage,
  type HomeChecklistPreviewItem,
  type HomeIntelCard,
  type HomeReviewer,
} from "@/app/_components/home/HomePage";
import {
  buildPfgPersonSchema,
  getPfgAuthorPersonId,
  getPfgAuthorHref,
  PFG_AUTHOR_AVATAR,
  PFG_AUTHOR_NAME,
  pfgAuthorCopy,
} from "@/app/author-profile";
import {
  CHECKLIST_BUILTIN_DEFINITIONS,
  getChecklistActivity,
  getChecklistActivityCopy,
} from "@/app/checklist-activities";
import {
  getContentEntries,
  getContentEntry,
  getContentHref,
  getContentTranslation,
  type ContentEntry,
} from "@/app/content-registry";
import {
  getHomeFaq,
  homeCopyKeys,
  HOME_MODIFIED_AT,
  HOME_PUBLISHED_AT,
  homeLocaleConfig,
  homeLocales,
  homeMetadata,
  homeText,
  isHomeLocale,
  type HomeLocale,
} from "@/app/home-i18n";
import { buildSeoDescription } from "@/app/seo-metadata";
import { siteLocaleConfig } from "@/app/site-config";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";

import { buildStaticRouteMetadata } from "./_static-route-metadata";

type Props = { params: Promise<{ locale: string }> };

function requireLocale(value: string): HomeLocale {
  if (!isHomeLocale(value)) notFound();
  return value;
}

export function generateStaticParams() {
  return homeLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const metadata = homeMetadata[locale];
  const description = buildSeoDescription(metadata.description, locale, "home");

  return buildStaticRouteMetadata({
    locale,
    path: "/",
    title: metadata.title,
    description,
    imageAlt: metadata.title,
    keywords: metadata.keywords,
  });
}

export default async function LocalizedHomePage({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const siteOrigin = await getRequestSiteOrigin();
  const metadata = homeMetadata[locale];
  const description = buildSeoDescription(
    metadata.description,
    locale,
    "home",
  );
  const rootUrl = absoluteSiteUrl("/", siteOrigin);
  const homeUrl = absoluteSiteUrl(`/${locale}/`, siteOrigin);
  const organizationId = `${rootUrl}#organization`;
  const authorId = getPfgAuthorPersonId(locale, siteOrigin);
  const websiteId = `${rootUrl}#website`;
  const gameId = `${rootUrl}#aion2`;
  const faqId = `${homeUrl}#faq`;
  const homeFaq = getHomeFaq(locale);
  const copy = Object.fromEntries(
    homeCopyKeys.map((key) => [key, homeText(locale, key)]),
  ) as Record<string, string>;
  const reviewerCopy =
    pfgAuthorCopy[locale] ??
    pfgAuthorCopy[siteLocaleConfig[locale].contentFallbackLocale];
  const reviewer: HomeReviewer = {
    name: PFG_AUTHOR_NAME,
    href: getPfgAuthorHref(locale),
    jobTitle: reviewerCopy.jobTitle,
    avatarAlt: reviewerCopy.avatarAlt,
    avatar: PFG_AUTHOR_AVATAR,
  };
  const reviewedDate = new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${HOME_MODIFIED_AT}T00:00:00.000Z`));
  const checklistPreview: HomeChecklistPreviewItem[] =
    CHECKLIST_BUILTIN_DEFINITIONS.slice(0, 3).flatMap((definition) => {
      const activity = getChecklistActivity(definition.id);
      if (!activity) return [];
      return [
        {
          id: definition.id,
          label: getChecklistActivityCopy(activity, locale).name,
          frequency: definition.frequency,
        },
      ];
    });
  const citations = [
    {
      name: "AION 2 official global pre-registration page",
      url: "https://aion2.plaync.com/en-us/conts/teaser",
    },
    {
      name: "AION 2 July 22 advance-access notice",
      url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f",
    },
    {
      name: "AION 2 Steam store page",
      url: "https://store.steampowered.com/app/3393110/AION_2/",
    },
    {
      name: "AION2 core content press release",
      url: "https://about.ncsoft.com/en/news/article/aion2-update-250530-2",
    },
    {
      name: "AION2 Taiwan official item database",
      url: "https://tw.ncsoft.com/aion2/info/item",
    },
  ];
  const featuredGuide = getContentEntries("guides")[0];
  const featuredNewsEntries = getContentEntries("news");
  const featuredNews =
    featuredNewsEntries.find(
      (entry) =>
        !featuredGuide?.heroImage?.src ||
        entry.heroImage?.src !== featuredGuide.heroImage.src,
    ) ?? featuredNewsEntries[0];
  const featuredEntries = [featuredGuide, featuredNews].filter(
    (entry): entry is ContentEntry => Boolean(entry),
  );
  const intelCards: HomeIntelCard[] = featuredEntries.map((entry) => {
    const { content, contentLocale } = getContentTranslation(entry, locale);
    const heroCopy =
      entry.heroImage?.translations[locale] ??
      entry.heroImage?.translations[contentLocale];
    return {
      label: content.eyebrow,
      detail: content.readingTime,
      title: content.title,
      summary: content.description,
      href: getContentHref(locale, entry),
      image: entry.heroImage
        ? {
            src: entry.heroImage.src,
            alt: heroCopy?.alt ?? content.title,
            width: entry.heroImage.width,
            height: entry.heroImage.height,
            rights: entry.heroImage.rights,
          }
        : undefined,
    };
  });
  const dataMethodology = getContentEntry("database", "map-data-methodology");
  const dataMethodologyHref = dataMethodology
    ? getContentHref(locale, dataMethodology)
    : `/${locale}/database/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "AION2 KINA",
        alternateName: ["KINA", "AION2 Kina", "aion2kina.com"],
        url: rootUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteSiteUrl("/aion2-logo.png", siteOrigin),
          width: 287,
          height: 213,
        },
        knowsAbout: { "@id": gameId },
      },
      buildPfgPersonSchema(locale, siteOrigin),
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "AION2 KINA",
        alternateName: ["KINA", "AION2 Kina", "aion2kina.com"],
        url: rootUrl,
        publisher: { "@id": organizationId },
        inLanguage: homeLocales.map(
          (candidate) => homeLocaleConfig[candidate].htmlLang,
        ),
      },
      {
        "@type": "VideoGame",
        "@id": gameId,
        name: "AION2",
        alternateName: "AION 2",
        url: "https://aion2.plaync.com/en-us/conts/teaser",
        sameAs: [
          "https://aion2.plaync.com/en-us/conts/teaser",
          "https://store.steampowered.com/app/3393110/AION_2/",
          "https://tw.ncsoft.com/aion2/index?redirect=false",
        ],
        publisher: {
          "@type": "Organization",
          name: "NC Corporation",
          url: "https://www.ncsoft.com/",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        url: homeUrl,
        name: metadata.title,
        description,
        inLanguage: homeLocaleConfig[locale].htmlLang,
        isPartOf: { "@id": websiteId },
        about: { "@id": gameId },
        author: { "@id": organizationId },
        reviewedBy: { "@id": authorId },
        publisher: { "@id": organizationId },
        datePublished: HOME_PUBLISHED_AT,
        dateModified: HOME_MODIFIED_AT,
        lastReviewed: HOME_MODIFIED_AT,
        hasPart: { "@id": faqId },
        citation: citations.map((source) => ({
          "@type": "CreativeWork",
          name: source.name,
          url: source.url,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: faqId,
        inLanguage: homeLocaleConfig[locale].htmlLang,
        isPartOf: { "@id": `${homeUrl}#webpage` },
        mainEntity: homeFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage
        locale={locale}
        intelCards={intelCards}
        dataMethodologyHref={dataMethodologyHref}
        copy={copy}
        homeFaq={homeFaq}
        homeModifiedAt={HOME_MODIFIED_AT}
        reviewedDate={reviewedDate}
        reviewer={reviewer}
        checklistPreview={checklistPreview}
      />
    </>
  );
}
