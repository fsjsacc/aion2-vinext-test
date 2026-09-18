import {
  breadcrumbAriaLabel,
  getSectionHref,
  localizedHref,
  siteLocaleConfig,
  siteLocales,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import type { ToolDefinition } from "@/app/tool-registry";
import { toolHubCopy } from "@/app/tool-registry";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";
import { EVENT_TIMER_ENTRIES } from "@/app/event-timer";
import { eventTimerLocalization } from "@/app/event-timer-localization";

import { DailyChecklist } from "./DailyChecklist";
import { EventTimer } from "./EventTimer";
import styles from "./tools.module.css";

export async function ToolDetail({
  locale,
  tool,
}: {
  locale: SiteLocale;
  tool: ToolDefinition;
}) {
  const siteOrigin = await getRequestSiteOrigin();
  const content = tool.copy[locale];
  const copy = toolHubCopy[locale];
  const suffix = `/tools/${tool.slug}/`;
  const canonicalUrl = absoluteSiteUrl(localizedHref(locale, suffix), siteOrigin);
  const homeUrl = absoluteSiteUrl(getSectionHref(locale, "home"), siteOrigin);
  const toolsUrl = absoluteSiteUrl(getSectionHref(locale, "tools"), siteOrigin);
  // ToolDetail is a server component. This value is serialized into the client
  // component so the server HTML and the first hydration render use the same clock.
  // eslint-disable-next-line react-hooks/purity
  const toolInitialNow = Date.now();
  const eventTimerCopy = eventTimerLocalization[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#application`,
        name: content.name,
        description: content.description,
        url: canonicalUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        ...("updatedAt" in tool ? { dateModified: tool.updatedAt } : {}),
        inLanguage: siteLocaleConfig[locale].code,
        featureList: [...content.highlights],
      },
      ...(tool.slug === "event-timer" ? [
        {
          "@type": "ItemList",
          "@id": `${canonicalUrl}#schedule-types`,
          name: content.name,
          itemListElement: EVENT_TIMER_ENTRIES.map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: eventTimerCopy.events[entry.id].name,
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: eventTimerCopy.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteShellCopy[locale].navigation.home, item: homeUrl },
          { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: toolsUrl },
          { "@type": "ListItem", position: 3, name: content.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.main} id="main-content">
      <section className={`${styles.hero} ${styles.detailHero}`} aria-labelledby="tool-title">
        <div className={`shell ${styles.shell}`}>
          <nav className={styles.breadcrumbs} aria-label={breadcrumbAriaLabel[locale]}>
            <ol>
              <li><a href={getSectionHref(locale, "home")}>{siteShellCopy[locale].navigation.home}</a></li>
              <li aria-hidden="true">/</li>
              <li><a href={getSectionHref(locale, "tools")}>{copy.breadcrumb}</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{content.name}</li>
            </ol>
          </nav>
          <div className={styles.detailTitle}>
            <span className={styles.detailIcon} aria-hidden="true">{tool.icon}</span>
            <div>
              <p className={styles.kicker}>{content.eyebrow}</p>
              <h1 id="tool-title">{content.name}</h1>
              <p>{content.description}</p>
            </div>
          </div>
        </div>
      </section>

      {tool.slug === "daily-checklist" ? (
        <div className="shell"><DailyChecklist initialNow={toolInitialNow} locale={locale} /></div>
      ) : null}

      {tool.slug === "event-timer" ? (
        <div className="shell"><EventTimer initialNow={toolInitialNow} locale={locale} /></div>
      ) : null}

      <section className={styles.detailBody} aria-labelledby="tool-overview-title">
        <div className={`shell ${styles.detailGrid}`}>
          <div>
            <p className={styles.kicker}>{copy.detailOverview}</p>
            <h2 id="tool-overview-title">{content.name}</h2>
            <p className={styles.detailDescription}>{content.description}</p>
          </div>
          <aside className={styles.detailPanel}>
            <h2>{copy.detailFeatures}</h2>
            <ul>
              {content.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <nav className={styles.languageLinks} aria-label={copy.detailLanguages}>
        <div className="shell">
          <span>{copy.detailLanguages}</span>
          {siteLocales.map((targetLocale) => (
            <a
              aria-current={targetLocale === locale ? "page" : undefined}
              href={localizedHref(targetLocale, suffix)}
              hrefLang={siteLocaleConfig[targetLocale].hrefLang}
              key={targetLocale}
            >
              {siteLocaleConfig[targetLocale].label}
            </a>
          ))}
          <a className={styles.backLink} href={getSectionHref(locale, "tools")}>{copy.backToTools}</a>
        </div>
      </nav>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </main>
  );
}
