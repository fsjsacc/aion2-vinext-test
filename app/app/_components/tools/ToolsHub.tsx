import { ToolDirectory } from "./ToolDirectory";
import styles from "./tools.module.css";
import {
  getToolHref,
  isLiveTool,
  toolHubCopy,
  toolRegistry,
} from "@/app/tool-registry";
import {
  breadcrumbAriaLabel,
  getSectionHref,
  localizedHref,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";

export async function ToolsHub({ locale }: { locale: SiteLocale }) {
  const siteOrigin = await getRequestSiteOrigin();
  const copy = toolHubCopy[locale];
  const liveTools = toolRegistry.filter(isLiveTool);
  const homeUrl = absoluteSiteUrl(getSectionHref(locale, "home"), siteOrigin);
  const canonicalUrl = absoluteSiteUrl(localizedHref(locale, "/tools/"), siteOrigin);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: copy.title,
        description: copy.description,
        url: canonicalUrl,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: liveTools.length,
          itemListElement: liveTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.copy[locale].name,
            url: absoluteSiteUrl(getToolHref(locale, tool)!, siteOrigin),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AION2 KINA", item: homeUrl },
          { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.main} id="main-content">
      <section className={styles.hero} aria-labelledby="tools-title">
        <div className={`shell ${styles.shell}`}>
          <nav className={styles.breadcrumbs} aria-label={breadcrumbAriaLabel[locale]}>
            <ol>
              <li>
                <a href={getSectionHref(locale, "home")}>
                  {siteShellCopy[locale].navigation.home}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{copy.breadcrumb}</li>
            </ol>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>{copy.kicker}</p>
              <h1 id="tools-title">{copy.title}</h1>
            </div>
            <div className={styles.heroAside}>
              <p>{copy.description}</p>
              <div className={styles.counts} aria-label={copy.availability}>
                <span>
                  <i aria-hidden="true" data-status="live" />
                  {copy.liveCount(liveTools.length)}
                </span>
              </div>
            </div>
          </div>

          <p className={styles.availability}>
            <span aria-hidden="true" />
            {copy.availability}
          </p>
        </div>
      </section>

      <section className={styles.directory} aria-labelledby="tool-directory-title">
        <div className={`shell ${styles.shell}`}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>{copy.directoryKicker}</p>
              <h2 id="tool-directory-title">{copy.directoryTitle}</h2>
            </div>
            <p>{copy.directoryDescription}</p>
          </div>
          <ToolDirectory locale={locale} />
        </div>
      </section>

      <section className={styles.related} aria-label={siteShellCopy[locale].navigation.guides}>
        <div className={`shell ${styles.relatedInner}`}>
          <p>{copy.directoryDescription}</p>
          <div>
            <a href={localizedHref(locale, "/guides/")}>
              {siteShellCopy[locale].navigation.guides}<span aria-hidden="true">↗</span>
            </a>
            <a href={localizedHref(locale, "/database/")}>
              {siteShellCopy[locale].navigation.database}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </main>
  );
}
