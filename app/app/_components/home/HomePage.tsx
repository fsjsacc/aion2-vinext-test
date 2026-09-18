import type { HomeLocale } from "@/app/home-i18n";
import {
  isFallbackTranslationLocale,
  localizationStatusCopy,
} from "@/app/localization-status";
import {
  getSectionHref,
  type SiteSection,
} from "@/app/site-config";

import { GlobalLaunchCountdown } from "./GlobalLaunchCountdown";
import { HomeInteractiveShell } from "./HomeInteractiveShell";
import { HomeThemeSwitcher } from "./HomeThemeSwitcher";
import { HomeTrackedLink } from "./HomeTrackedLink";

const coreEntries = [
  {
    title: "Interactive Map",
    description:
      "Explore complete AION2 maps and the collection markers available in each region.",
    path: "/tools/map/",
  },
  {
    title: "Item Database",
    description:
      "Search equipment, materials, consumables, and other item records in one place.",
    path: "/database/",
  },
  {
    title: "Class Guides",
    description:
      "Compare class difficulty, combat roles, playstyles, and progression advice.",
    path: "/classes/",
  },
  {
    title: "Crafting Calculator",
    description:
      "Calculate recipe quantities, base materials, inventory shortages, and estimated cost.",
    path: "/tools/material-calculator/",
  },
  {
    title: "Daily & Weekly Checklist",
    description:
      "Track recurring activities and your own tasks around the game reset schedule.",
    path: "/tools/daily-checklist/",
  },
  {
    title: "Redeem Codes",
    description:
      "Check currently listed codes, availability dates, and the in-game redemption guide.",
    path: "/codes/",
  },
] as const;

const officialSources = [
  {
    labelByLocale: {
      "zh-hans": "AION 2 官方全球预注册页面",
      en: "AION 2 official global pre-registration page",
      fr: "Page officielle de préinscription mondiale d’AION 2",
      de: "Offizielle globale Vorregistrierungsseite von AION 2",
      es: "Página oficial de prerregistro global de AION 2",
      ja: "AION 2 グローバル事前登録公式ページ",
      "pt-br": "Página oficial de pré-registro global de AION 2",
      ru: "Официальная страница глобальной предварительной регистрации AION 2",
      ko: "AION 2 글로벌 사전 등록 공식 페이지",
      "zh-hant": "AION 2 官方全球預先登錄頁面",
    } satisfies Record<HomeLocale, string>,
    href: "https://aion2.plaync.com/en-us/conts/teaser",
  },
  {
    label: "NC press release on AION2 core content",
    href: "https://about.ncsoft.com/en/news/article/aion2-update-250530-2",
  },
  {
    label: "AION2 Taiwan official item database",
    href: "https://tw.ncsoft.com/aion2/info/item",
  },
] as const;

function HomeLocalizationStatusNotice({ locale }: { locale: HomeLocale }) {
  if (!isFallbackTranslationLocale(locale)) return null;
  const status = localizationStatusCopy[locale];

  return (
    <aside
      className="home-localization-notice"
      aria-label={status.badge}
    >
      <p className="home-localization-notice-marker">{status.badge}</p>
      <div className="home-localization-notice-copy">
        <strong>{status.title}</strong>
        <p>{status.description}</p>
      </div>
    </aside>
  );
}

const resourceGroups = [
  {
    number: "01",
    eyebrow: "START HERE",
    title: "New Player Route",
    description:
      "A guided path from character setup to your first coordinated expedition.",
    link: "Open route",
    target: "guides",
  },
  {
    number: "02",
    eyebrow: "COMBAT",
    title: "Classes & Builds",
    description:
      "Compare roles, understand core loops, and shape a progression plan.",
    link: "Compare classes",
    target: "classes",
  },
  {
    number: "03",
    eyebrow: "EXPLORATION",
    title: "World & Maps",
    description:
      "Browse regions, landmarks, travel notes, and field discoveries.",
    link: "Explore the world",
    target: "map",
  },
  {
    number: "04",
    eyebrow: "GROUP PLAY",
    title: "Expedition Guides",
    description:
      "Compact mechanics, party checks, and clear encounter callouts.",
    link: "Review expeditions",
    target: "guides",
  },
  {
    number: "05",
    eyebrow: "COLLECTIONS",
    title: "Items & Progression",
    description:
      "Keep equipment, materials, and upgrade references in one place.",
    link: "Browse items",
    target: "database",
  },
  {
    number: "06",
    eyebrow: "UTILITY",
    title: "Player Tools",
    description:
      "A home for checklists, planners, calculators, and quick comparisons.",
    link: "Open tools",
    target: "tools",
  },
] as const;

export type HomeIntelCard = {
  label: string;
  detail: string;
  title: string;
  summary: string;
  href: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    rights: "linked-official-media" | "linked-third-party-media" | "original";
  };
};

export type HomeChecklistPreviewItem = {
  id: string;
  label: string;
  frequency: "daily" | "weekly";
};

export type HomeReviewer = {
  name: string;
  href: string;
  jobTitle: string;
  avatarAlt: string;
  avatar: {
    src: string;
    width: number;
    height: number;
  };
};

export function HomePage({
  locale = "en",
  intelCards,
  dataMethodologyHref,
  copy,
  homeFaq,
  homeModifiedAt,
  reviewedDate,
  reviewer,
  checklistPreview,
}: {
  locale?: HomeLocale;
  intelCards: readonly HomeIntelCard[];
  dataMethodologyHref: string;
  copy: Readonly<Record<string, string>>;
  homeFaq: readonly { question: string; answer: string }[];
  homeModifiedAt: string;
  reviewedDate: string;
  reviewer: HomeReviewer;
  checklistPreview: readonly HomeChecklistPreviewItem[];
}) {
  const t = (value: string) => copy[value] ?? value;
  const guidesHref = getSectionHref(locale, "guides");
  const newsHref = getSectionHref(locale, "news");
  const mapHref = `/${locale}/tools/map/`;
  const globalLaunchNewsHref = `/${locale}/aion-2-release-date/`;
  const globalLaunchGuideHref = `/${locale}/guides/beginner-launch-checklist/`;
  const globalEarlyAccessHref = `/${locale}/aion-2-early-access/`;

  return (
    <HomeInteractiveShell
      locale={locale}
      copy={copy}
      checklistPreview={checklistPreview}
    >
      <HomeLocalizationStatusNotice locale={locale} />

      <GlobalLaunchCountdown
        locale={locale}
        newsHref={globalLaunchNewsHref}
        guideHref={globalLaunchGuideHref}
        earlyAccessHref={globalEarlyAccessHref}
      />

      <section className="trust-rail" aria-label={t("Source guide")}>
        <div className="shell trust-inner">
          <span className="status-dot" aria-hidden="true" />
          <p>
            <strong>{t("Know what’s confirmed.")}</strong>{" "}
            {t(
              "Official announcements, in-game data, and community findings are clearly distinguished.",
            )}
          </p>
          <a href={dataMethodologyHref}>
            {t("See our source guide")} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section
        className="evidence-section"
        aria-labelledby="home-sources-title"
      >
        <div className="shell evidence-layout">
          <header className="evidence-heading">
            <p className="section-kicker">SOURCES / EDITORIAL REVIEW</p>
            <h2 id="home-sources-title">
              {t("How does AION2 KINA verify its information?")}
            </h2>
            <p>
              {t(
                "AION2 KINA checks factual claims against NC announcements and official game-data pages; editorial and community findings are labelled separately.",
              )}
            </p>
            <div className="evidence-review">
              <div className="evidence-author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={reviewer.avatarAlt}
                  decoding="async"
                  height={reviewer.avatar.height}
                  loading="lazy"
                  src={reviewer.avatar.src}
                  width={reviewer.avatar.width}
                />
                <span>
                  <strong>
                    {t("Reviewed by")} {reviewer.name}
                  </strong>
                  <small>{reviewer.jobTitle}</small>
                </span>
              </div>
              <span>
                {t("Last reviewed")}{" "}
                <time dateTime={homeModifiedAt}>{reviewedDate}</time>
              </span>
            </div>
          </header>

          <div className="evidence-citations">
            <blockquote cite="https://about.ncsoft.com/en/news/article/aion2-update-250530-2">
              <p>“AION2 is our vision of a complete evolution of AION.”</p>
              <cite>
                — NC Corporation,{" "}
                <a
                  href="https://about.ncsoft.com/en/news/article/aion2-update-250530-2"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t("NC press release on AION2 core content")}
                </a>
              </cite>
            </blockquote>
            <div className="evidence-source-list">
              <h3>{t("Official references")}</h3>
              <ol>
                {officialSources.map((source, index) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>[{index + 1}]</span>{" "}
                      {"labelByLocale" in source
                        ? source.labelByLocale[locale]
                        : t(source.label)}{" "}
                      <i aria-hidden="true">↗</i>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section
        className="resource-section"
        id="guides"
        aria-labelledby="guides-title"
      >
        <div className="shell">
          <div className="section-intro">
            <div>
              <p className="section-kicker">
                {t("START HERE / CORE FEATURES")}
              </p>
              <h2 id="guides-title">
                {t("Everything you need, one click away.")}
              </h2>
            </div>
            <p>
              {t(
                "Open the map, search item data, compare classes, calculate crafting materials, track activities, or check redeem codes.",
              )}
            </p>
          </div>

          <div className="quick-entry-grid quick-entry-grid--core">
            {coreEntries.map((entry, index) =>
              entry.path === "/tools/map/" ? (
                <HomeTrackedLink
                  className="quick-entry"
                  href={`/${locale}${entry.path}`}
                  key={entry.title}
                  eventName="guide_to_map_click"
                  eventParams={{
                    entry_source: "home-core-entry",
                    locale,
                    surface: "home-core-entry",
                  }}
                >
                  <span className="entry-index">0{index + 1}</span>
                  <div>
                    <h3>{t(entry.title)}</h3>
                    <p>{t(entry.description)}</p>
                  </div>
                  <span className="entry-arrow" aria-hidden="true">
                    ↗
                  </span>
                </HomeTrackedLink>
              ) : (
                <a
                  className="quick-entry"
                  href={`/${locale}${entry.path}`}
                  key={entry.title}
                >
                  <span className="entry-index">0{index + 1}</span>
                  <div>
                    <h3>{t(entry.title)}</h3>
                    <p>{t(entry.description)}</p>
                  </div>
                  <span className="entry-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        className="home-faq-section"
        id="faq"
        aria-labelledby="home-faq-title"
      >
        <div className="shell">
          <div className="section-intro home-faq-intro">
            <div>
              <p className="section-kicker">AION2 KINA FAQ</p>
              <h2 id="home-faq-title">
                {t("AION2 KINA questions and answers")}
              </h2>
            </div>
            <p>
              {t(
                "Direct answers about this independent fan resource, its sources, and language coverage.",
              )}
            </p>
          </div>
          <div className="home-faq-grid">
            {homeFaq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="directory-section"
        id="directory"
        aria-labelledby="directory-title"
      >
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">{t("EXPLORE / TOPICS")}</p>
              <h2 id="directory-title">{t("Browse KINA")}</h2>
            </div>
            <a className="text-link" href={guidesHref}>
              {t("Browse all guides")} <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="directory-grid">
            {resourceGroups.map((group) =>
              group.target === "map" ? (
                <HomeTrackedLink
                  className="directory-card"
                  href={mapHref}
                  key={group.number}
                  eventName="guide_to_map_click"
                  eventParams={{
                    entry_source: `directory-${group.number}`,
                    locale,
                    surface: "home-directory",
                  }}
                >
                  <div className="directory-card-top">
                    <span>{group.number}</span>
                    <i aria-hidden="true">↗</i>
                  </div>
                  <p>{t(group.eyebrow)}</p>
                  <h3>{t(group.title)}</h3>
                  <div className="card-rule" aria-hidden="true" />
                  <span className="directory-description">
                    {t(group.description)}
                  </span>
                  <b>{t(group.link)}</b>
                </HomeTrackedLink>
              ) : (
                <a
                  className="directory-card"
                  href={getSectionHref(locale, group.target as SiteSection)}
                  key={group.number}
                >
                  <div className="directory-card-top">
                    <span>{group.number}</span>
                    <i aria-hidden="true">↗</i>
                  </div>
                  <p>{t(group.eyebrow)}</p>
                  <h3>{t(group.title)}</h3>
                  <div className="card-rule" aria-hidden="true" />
                  <span className="directory-description">
                    {t(group.description)}
                  </span>
                  <b>{t(group.link)}</b>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="worlds-banner" aria-labelledby="worlds-title">
        <picture className="worlds-background">
          <source
            media="(max-width: 760px)"
            srcSet="/aion2-dual-mobile.webp"
          />
          <img
            src="/aion2-dual.webp"
            alt={t("Elyos and Asmodian heroes of Atreia")}
            loading="lazy"
          />
        </picture>
        <div className="worlds-shade" aria-hidden="true" />
        <div className="shell worlds-content">
          <p className="section-kicker">
            {t("ONE WORLD / TWO PERSPECTIVES")}
          </p>
          <h2 id="worlds-title">
            {t("Choose your side. Keep the same clear route.")}
          </h2>
          <p>
            {t(
              "Switch between Elyos and Asmodian interfaces at any time. Your preference stays on this device while the guides and data remain consistent.",
            )}
          </p>
          <HomeThemeSwitcher
            ariaLabel={t("Switch interface from banner")}
            elyosLabel={t("Elyos Interface")}
            asmodianLabel={t("Asmodian Interface")}
          />
        </div>
      </section>

      <section
        className="intel-section"
        id="intel"
        aria-labelledby="intel-title"
      >
        <div className="shell intel-layout">
          <header className="intel-heading">
            <p className="section-kicker">{t("FIELD NOTES")}</p>
            <h2 id="intel-title">{t("Latest Intel")}</h2>
            <p>
              {t("Short, useful reads designed to get you oriented quickly.")}
            </p>
            <a className="text-link" href={newsHref}>
              {t("Browse all notes")} <span aria-hidden="true">→</span>
            </a>
          </header>

          <div className="intel-cards">
            {intelCards.map((card, index) => (
              <a className="intel-card" href={card.href} key={card.href}>
                <span
                  className={`intel-visual intel-visual-${index + 1}`}
                  data-image-rights={card.image?.rights}
                >
                  {card.image ? (
                    <img
                      alt={card.image.alt}
                      decoding="async"
                      height={card.image.height}
                      loading="lazy"
                      src={card.image.src}
                      width={card.image.width}
                    />
                  ) : (
                    <span
                      className="intel-visual-placeholder"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className="intel-copy">
                  <span className="intel-meta">
                    <b>{card.label}</b>
                    <i>{card.detail}</i>
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.summary}</p>
                </span>
                <span className="intel-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </HomeInteractiveShell>
  );
}

export default HomePage;
