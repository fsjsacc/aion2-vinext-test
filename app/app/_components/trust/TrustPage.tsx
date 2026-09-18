import Link from "next/link";

import {
  buildPfgPersonSchema,
  getPfgAuthorPersonId,
  PFG_AUTHOR_AVATAR,
  PFG_AUTHOR_NAME,
  pfgAuthorCopy,
} from "@/app/author-profile";
import {
  TRUST_PAGE_MODIFIED_AT,
  TRUST_PAGE_PUBLISHED_AT,
  trustPageCopy,
  type TrustPageKind,
} from "@/app/trust-content";
import { trustRouteSeoCopy } from "@/app/[locale]/_static-route-metadata";
import { trustContactEyebrowCopy } from "@/app/content-facts-localization";
import {
  localizedHref,
  resolveLocalizedCopy,
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";

import { FeedbackReportDialog } from "./FeedbackReportDialog";
import styles from "./TrustPage.module.css";

const schemaType: Record<TrustPageKind, "AboutPage" | "ContactPage" | "WebPage"> = {
  about: "AboutPage",
  contact: "ContactPage",
  privacy: "WebPage",
  terms: "WebPage",
};

function isExternalHref(href: string) {
  return /^https:\/\//u.test(href);
}

export async function TrustPage({
  kind,
  locale,
}: {
  kind: TrustPageKind;
  locale: SiteLocale;
}) {
  const copy = trustPageCopy[locale][kind];
  const siteOrigin = await getRequestSiteOrigin();
  const rootUrl = absoluteSiteUrl("/", siteOrigin);
  const pagePath = localizedHref(locale, `/${kind}/`);
  const pageUrl = absoluteSiteUrl(pagePath, siteOrigin);
  const organizationId = `${rootUrl}#organization`;
  const authorId = getPfgAuthorPersonId(locale, siteOrigin);
  const authorCopy = resolveLocalizedCopy(pfgAuthorCopy, locale);
  const routeSeoCopy = resolveLocalizedCopy(trustRouteSeoCopy, locale)[kind];
  const formatter = new Intl.DateTimeFormat(
    siteLocaleConfig[locale].htmlLang,
    { dateStyle: "long", timeZone: "UTC" },
  );
  const publishedDate = formatter.format(new Date(`${TRUST_PAGE_PUBLISHED_AT}T00:00:00.000Z`));
  const modifiedDate = formatter.format(new Date(`${TRUST_PAGE_MODIFIED_AT}T00:00:00.000Z`));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "AION2 KINA",
        alternateName: ["KINA", "AION2 Kina", "aion2kina.com"],
        url: rootUrl,
        logo: absoluteSiteUrl("/aion2-logo.png", siteOrigin),
      },
      buildPfgPersonSchema(locale, siteOrigin),
      {
        "@type": schemaType[kind],
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.title,
        description: routeSeoCopy.description,
        inLanguage: siteLocaleConfig[locale].htmlLang,
        author: { "@id": authorId },
        publisher: { "@id": organizationId },
        about: kind === "about" ? { "@id": organizationId } : undefined,
        datePublished: TRUST_PAGE_PUBLISHED_AT,
        dateModified: TRUST_PAGE_MODIFIED_AT,
        lastReviewed: TRUST_PAGE_MODIFIED_AT,
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <header className={styles.hero}>
        <div className={`shell ${styles.heroInner}`}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className={styles.intro}>{copy.intro}</p>
          <div className={styles.provenance}>
            <div className={styles.authorLink}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={authorCopy.avatarAlt}
                decoding="async"
                height={PFG_AUTHOR_AVATAR.height}
                src={PFG_AUTHOR_AVATAR.src}
                width={PFG_AUTHOR_AVATAR.width}
              />
              <span>
                <strong>{PFG_AUTHOR_NAME}</strong>
                <small>{authorCopy.jobTitle}</small>
              </span>
            </div>
            <span>{copy.publishedLabel} <time dateTime={TRUST_PAGE_PUBLISHED_AT}>{publishedDate}</time></span>
            <span>{copy.updatedLabel} <time dateTime={TRUST_PAGE_MODIFIED_AT}>{modifiedDate}</time></span>
          </div>
        </div>
      </header>

      <div className={`shell ${styles.content}`}>
        {copy.sections.map((section) => (
          <section className={styles.section} key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets?.length ? (
              <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            ) : null}
            {section.links?.length ? (
              <div className={styles.links}>
                {section.links.map((link) => isExternalHref(link.href) ? (
                  <a href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link href={localizedHref(locale, link.href)} key={link.href}>
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </section>
        ))}

        {kind === "contact" && copy.contactAction ? (
          <section className={styles.contactPanel} aria-labelledby="contact-form-title">
            <div>
              <p className={styles.eyebrow}>{trustContactEyebrowCopy[locale]}</p>
              <h2 id="contact-form-title">{copy.contactAction}</h2>
            </div>
            <FeedbackReportDialog
              locale={locale}
              service="unknown"
              targetKey="site-contact"
              targetKind="tool"
              targetLabel={copy.title}
              triggerLabel={copy.contactAction}
            />
          </section>
        ) : null}
      </div>
    </main>
  );
}

export default TrustPage;
