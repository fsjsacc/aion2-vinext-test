import {
  aion2CodeRegistry,
  codePageCopy,
  codeRegistryUpdatedAt,
  officialCouponPortalUrls,
  type Aion2CodeRecord,
} from "@/app/code-registry";
import {
  getSectionHref,
  localizedHref,
  siteLocaleConfig,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";
import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";

import { CodeRevealControl } from "./CopyCodeButton";
import styles from "./CodesPage.module.css";

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</gu, "\\u003c");
}

function CodeCard({
  entry,
  locale,
  featured = false,
}: {
  entry: Aion2CodeRecord;
  locale: SiteLocale;
  featured?: boolean;
}) {
  const copy = codePageCopy[locale];
  const period = entry.period[locale];

  return (
    <article
      className={`${styles.codeCard} ${featured ? styles.featuredCard : styles.historyCard}`}
      id={entry.id}
    >
      <header className={styles.cardHeader}>
        <div>
          <p className={styles.cardTitle}>{entry.title[locale]}</p>
          <CodeRevealControl
            cancelLabel={copy.cancelLabel}
            code={entry.code}
            codeId={entry.id}
            codeStatus={entry.status}
            confirmCopyLabel={copy.confirmCopyLabel}
            confirmCopyMessage={copy.confirmCopyMessage}
            confirmCopyTitle={copy.confirmCopyTitle}
            controlId={`code-${entry.id}`}
            copiedLabel={copy.copiedLabel}
            copyLabel={copy.copyLabel}
            copyingLabel={copy.copyingLabel}
            failedLabel={copy.copyFailedLabel}
            loadingCodeLabel={copy.loadingCodeLabel}
            locale={locale}
            showCodeLabel={copy.showCodeLabel}
          />
        </div>
        <span
          className={styles.statusBadge}
          data-status={entry.status}
        >
          <i aria-hidden="true" />
          {entry.status === "active" ? copy.active : copy.expired}
        </span>
      </header>

      <dl className={styles.factList}>
        <div className={styles.periodFact}>
          <dt>{copy.periodLabel}</dt>
          <dd>
            <time dateTime={entry.validFrom}>{period.from}</time>
            <span aria-hidden="true">→</span>
            <time dateTime={entry.validUntil}>{period.until}</time>
          </dd>
        </div>
        <div>
          <dt>{copy.scopeLabel}</dt>
          <dd>{entry.serverScope[locale]}</dd>
        </div>
        <div>
          <dt>{copy.limitLabel}</dt>
          <dd>{entry.accountLimit[locale]}</dd>
        </div>
      </dl>

      <div className={styles.rewards}>
        <h3>{copy.rewardsLabel}</h3>
        <ul>
          {entry.rewards[locale].map((reward) => (
            <li key={reward}>{reward}</li>
          ))}
        </ul>
      </div>

      <footer className={styles.cardFooter}>
        <span>
          {copy.verifiedLabel}{" "}
          <time dateTime={entry.verifiedAt}>{entry.verifiedAt}</time>
        </span>
        <div className={styles.sourceLinks}>
          {entry.sources.map((source, index) => (
            <a
              href={source.url}
              key={source.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {index === 0 ? copy.sourceLabel : source.label[locale]}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
}

export async function CodesPage({ locale }: { locale: SiteLocale }) {
  const copy = codePageCopy[locale];
  const siteOrigin = await getRequestSiteOrigin();
  const homeHref = getSectionHref(locale, "home");
  const codesHref = localizedHref(locale, "/codes/");
  const codesUrl = absoluteSiteUrl(codesHref, siteOrigin);
  const activeCodes = aion2CodeRegistry.filter((entry) => entry.status === "active");
  const historicalCodes = aion2CodeRegistry.filter((entry) => entry.status === "expired");
  const codeItems = [...activeCodes, ...historicalCodes];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${codesUrl}#page`,
        url: codesUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: siteLocaleConfig[locale].code,
        dateModified: codeRegistryUpdatedAt,
        mainEntity: {
          "@id": `${codesUrl}#codes`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${codesUrl}#codes`,
        numberOfItems: codeItems.length,
        itemListElement: codeItems.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.title[locale],
          url: `${codesUrl}#${entry.id}`,
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${codesUrl}#redeem-guide`,
        name: copy.guideTitle,
        description: copy.guideDescription,
        inLanguage: siteLocaleConfig[locale].code,
        step: copy.inGameSteps.map((text, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `${index + 1}`,
          text,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteShellCopy[locale].navigation.home,
            item: absoluteSiteUrl(homeHref, siteOrigin),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: siteShellCopy[locale].navigation.codes,
            item: codesUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="codes-title">
        <div className={`shell ${styles.shell}`}>
          <nav className={styles.breadcrumbs} aria-label={copy.breadcrumbLabel}>
            <ol>
              <li><a href={homeHref}>{siteShellCopy[locale].navigation.home}</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{siteShellCopy[locale].navigation.codes}</li>
            </ol>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="codes-title">{copy.title}</h1>
            </div>
            <div className={styles.heroAside}>
              <p>{copy.description}</p>
              <nav className={styles.jumpLinks} aria-label={copy.title}>
                <a href="#active-codes">{copy.currentTitle}</a>
                <a href="#code-history">{copy.historyTitle}</a>
                <a href="#redeem-guide">{copy.guideTitle}</a>
              </nav>
            </div>
          </div>

          <dl className={styles.stats}>
            <div>
              <dt>{copy.statsActive}</dt>
              <dd>{activeCodes.length}</dd>
            </div>
            <div>
              <dt>{copy.statsHistory}</dt>
              <dd>{historicalCodes.length}</dd>
            </div>
            <div>
              <dt>{copy.statsVerified}</dt>
              <dd><time dateTime={codeRegistryUpdatedAt}>{codeRegistryUpdatedAt}</time></dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.activeSection} id="active-codes" aria-labelledby="active-codes-title">
        <div className={`shell ${styles.shell}`}>
          <header className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>{copy.activeEyebrow}</p>
              <h2 id="active-codes-title">{copy.currentTitle}</h2>
            </div>
            <p>{copy.currentDescription}</p>
          </header>
          <div className={styles.activeGrid}>
            {activeCodes.map((entry) => (
              <CodeCard entry={entry} featured key={entry.id} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.historySection} id="code-history" aria-labelledby="code-history-title">
        <div className={`shell ${styles.shell}`}>
          <header className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>{copy.historyEyebrow}</p>
              <h2 id="code-history-title">{copy.historyTitle}</h2>
            </div>
            <p>{copy.historyDescription}</p>
          </header>
          <div className={styles.historyGrid}>
            {historicalCodes.map((entry) => (
              <CodeCard entry={entry} key={entry.id} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.guideSection} id="redeem-guide" aria-labelledby="redeem-guide-title">
        <div className={`shell ${styles.shell}`}>
          <header className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>{copy.guideEyebrow}</p>
              <h2 id="redeem-guide-title">{copy.guideTitle}</h2>
            </div>
            <p>{copy.guideDescription}</p>
          </header>

          <div className={styles.guideGrid}>
            <article className={styles.guideCard}>
              <span className={styles.guideNumber} aria-hidden="true">01</span>
              <h3>{copy.inGameTitle}</h3>
              <ol>
                {copy.inGameSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </article>
            <article className={styles.guideCard}>
              <span className={styles.guideNumber} aria-hidden="true">02</span>
              <h3>{copy.webTitle}</h3>
              <ol>
                {copy.webSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <AnalyticsLink
                className={styles.officialButton}
                eventName="code_redeem_official_click"
                href={officialCouponPortalUrls[locale]}
                payload={{
                  locale,
                  surface: "content-detail",
                  target_kind: "tool",
                  target_key: "code-center",
                  tool_name: "code-center",
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                {copy.redeemOfficial}<span aria-hidden="true">↗</span>
              </AnalyticsLink>
            </article>
          </div>

          <aside className={styles.caution} aria-labelledby="codes-caution-title">
            <div>
              <span aria-hidden="true">!</span>
              <h3 id="codes-caution-title">{copy.cautionTitle}</h3>
            </div>
            <ul>
              {copy.cautions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </aside>

          <div className={styles.relatedLinks}>
            <a href={localizedHref(locale, "/news/aion2chapterone-coupon-status/")}>
              {copy.relatedNews}<span aria-hidden="true">↗</span>
            </a>
            <a href={homeHref}>
              {copy.backHome}<span aria-hidden="true">←</span>
            </a>
          </div>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{ __html: safeJson(structuredData) }}
        type="application/ld+json"
      />
    </main>
  );
}
