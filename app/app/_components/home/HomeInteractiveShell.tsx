"use client";

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
  type TransitionEvent,
} from "react";

import { useSiteTheme } from "@/app/_components/site/SiteThemeContext";
import { trackEvent } from "@/app/analytics";
import type { HomeLocale } from "@/app/home-i18n";
import {
  getSectionHref,
  siteLocaleConfig,
  siteLocales,
} from "@/app/site-config";

const LazyHomeChecklistCard = lazy(() =>
  import("./HomeChecklistCard").then((module) => ({
    default: module.HomeChecklistCard,
  })),
);

type ThemeFrameStyle = CSSProperties & {
  "--theme-frame-x"?: string;
  "--theme-frame-y"?: string;
  "--theme-frame-width"?: string;
  "--theme-frame-height"?: string;
};

const THEME_FRAME_PROPERTIES = ["top", "left", "width", "height"] as const;
const FACTION_GATE_SESSION_KEY = "aion2-atlas-faction-gate-seen";
const TRANSPARENT_IMAGE_SOURCE =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
type ThemeFrameProperty = (typeof THEME_FRAME_PROPERTIES)[number];
type HomeChecklistPreviewItem = {
  id: string;
  label: string;
  frequency: "daily" | "weekly";
};

const heroSupportLinks = [
  ["Browse Guides", "guides"],
  ["Compare Classes", "classes"],
  ["Open Player Tools", "tools"],
] as const;

function isThemeFrameProperty(value: string): value is ThemeFrameProperty {
  return (THEME_FRAME_PROPERTIES as readonly string[]).includes(value);
}

function HomeChecklistPlaceholder({
  checklistHref,
  checklistPreview,
  copy,
  onActivate,
}: {
  checklistHref: string;
  checklistPreview: readonly HomeChecklistPreviewItem[];
  copy: Readonly<Record<string, string>>;
  onActivate?: () => void;
}) {
  const t = (value: string) => copy[value] ?? value;

  return (
    <aside
      className="expedition-card hero-checklist-card"
      aria-labelledby="hero-checklist-title"
      aria-busy="true"
      onFocusCapture={onActivate}
      onPointerEnter={onActivate}
    >
      <div className="card-topline">
        <p>{t("MY CHECKLIST / THIS DEVICE")}</p>
        <span>
          00 / {String(checklistPreview.length).padStart(2, "0")}
        </span>
      </div>
      <h2 id="hero-checklist-title">{t("My checklist")}</h2>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={t("Checklist progress")}
        aria-valuemin={0}
        aria-valuemax={Math.max(checklistPreview.length, 1)}
        aria-valuenow={0}
      >
        <span style={{ width: "0%" }} />
      </div>
      <div className="checklist">
        {checklistPreview.map((item) => (
          <div className="check-row" key={item.id}>
            <span className="custom-check" aria-hidden="true" />
            <span className="check-row-copy">
              <span>{item.label}</span>
              <small>{t(item.frequency === "daily" ? "Daily" : "Weekly")}</small>
            </span>
          </div>
        ))}
      </div>
      <div className="checklist-card-footer">
        <p>{t("Saved on this device. Daily and weekly cycles reset automatically.")}</p>
        <a
          href={checklistHref}
          onClick={() =>
            trackEvent("home_checklist_open", {
              item_count: checklistPreview.length,
              surface: "home-hero-placeholder",
            })
          }
        >
          {t("Open full checklist")} <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}

export function HomeInteractiveShell({
  children,
  checklistPreview,
  copy,
  locale,
}: {
  children: ReactNode;
  checklistPreview: readonly HomeChecklistPreviewItem[];
  copy: Readonly<Record<string, string>>;
  locale: HomeLocale;
}) {
  const t = (value: string) => copy[value] ?? value;
  const { theme, changeTheme } = useSiteTheme();
  const itemDatabaseHref = `/${locale}/database/`;
  const mapHref = `/${locale}/tools/map/`;
  const checklistHref = `/${locale}/tools/daily-checklist/`;
  const [hasEntered, setHasEntered] = useState(false);
  const [checklistReady, setChecklistReady] = useState(false);
  const [enteringTheme, setEnteringTheme] = useState<"elyos" | "asmodian" | null>(null);
  const [preparingTheme, setPreparingTheme] = useState<"elyos" | "asmodian" | null>(null);
  const [isSettlingTheme, setIsSettlingTheme] = useState(false);
  const [themeFrameStyle, setThemeFrameStyle] = useState<ThemeFrameStyle>({});
  const gateRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const pendingThemeFramePropertiesRef = useRef<Set<ThemeFrameProperty>>(new Set());
  const completedThemeFramePropertiesRef = useRef<Set<ThemeFrameProperty>>(new Set());

  const completeFactionGate = useCallback(() => {
    try {
      window.sessionStorage.setItem(FACTION_GATE_SESSION_KEY, "true");
    } catch {
      // Session storage can be unavailable in restricted/private browsing contexts.
    }
    document.documentElement.dataset.aion2FactionGateSeen = "true";
    setHasEntered(true);
  }, []);

  useEffect(() => {
    if (hasEntered) return;
    if (
      document.documentElement.dataset.aion2ThemeSaved === "true" &&
      document.documentElement.dataset.aion2FactionGateSeen === "true"
    ) {
      const restoredFrame = window.requestAnimationFrame(() => setHasEntered(true));
      return () => window.cancelAnimationFrame(restoredFrame);
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const hero = heroRef.current;
    const gate = gateRef.current;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".site-shell-skip-link, .site-shell-header, .site-shell-footer",
      ),
    );
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";

    const focusableControls = () =>
      Array.from(
        gateRef.current?.querySelectorAll<HTMLElement>(
          'a[href]:not([tabindex="-1"]), button:not([disabled]), summary:not([tabindex="-1"])',
        ) ?? [],
      );
    const focusFrame = window.requestAnimationFrame(() =>
      gateRef.current
        ?.querySelector<HTMLButtonElement>('[data-faction-entry="elyos"]')
        ?.focus(),
    );
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = focusableControls();
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = false;
      });
      if (
        previouslyFocused?.isConnected &&
        previouslyFocused !== document.body &&
        !gate?.contains(previouslyFocused)
      ) {
        previouslyFocused.focus();
      } else {
        hero?.focus({ preventScroll: true });
      }
    };
  }, [hasEntered]);

  useEffect(() => {
    if (!enteringTheme || isSettlingTheme || hasEntered) return;
    const fallback = window.setTimeout(() => setIsSettlingTheme(true), 600);
    return () => window.clearTimeout(fallback);
  }, [enteringTheme, hasEntered, isSettlingTheme]);

  useEffect(() => {
    if (!hasEntered || checklistReady) return;

    let idleHandle: number | undefined;
    let fallbackHandle: ReturnType<typeof setTimeout> | undefined;
    const activate = () => setChecklistReady(true);
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(activate, { timeout: 6000 });
      } else {
        fallbackHandle = globalThis.setTimeout(activate, 6000);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      if (idleHandle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (fallbackHandle !== undefined) globalThis.clearTimeout(fallbackHandle);
    };
  }, [checklistReady, hasEntered]);

  useEffect(() => {
    if (!isSettlingTheme || hasEntered) return;
    const fallback = window.setTimeout(completeFactionGate, 450);
    return () => window.clearTimeout(fallback);
  }, [completeFactionGate, hasEntered, isSettlingTheme]);

  const enterTheme = (nextTheme: "elyos" | "asmodian") => {
    if (enteringTheme || preparingTheme) {
      if (enteringTheme && !isSettlingTheme && !hasEntered) {
        completeFactionGate();
      }
      return;
    }

    const beginTransition = () => {
      const heroRect =
        heroRef.current
          ?.querySelector<HTMLElement>(".hero-backdrops")
          ?.getBoundingClientRect() ?? heroRef.current?.getBoundingClientRect();
      const gateArtRect = gateRef.current
        ?.querySelector<HTMLElement>(`.race-gate-art--${nextTheme}`)
        ?.getBoundingClientRect();
      const pendingProperties = new Set<ThemeFrameProperty>();
      if (heroRect && gateArtRect) {
        const geometry: Record<ThemeFrameProperty, readonly [number, number]> = {
          top: [gateArtRect.top, heroRect.top],
          left: [gateArtRect.left, heroRect.left],
          width: [gateArtRect.width, heroRect.width],
          height: [gateArtRect.height, heroRect.height],
        };
        for (const property of THEME_FRAME_PROPERTIES) {
          if (Math.abs(geometry[property][0] - geometry[property][1]) > 0.5) {
            pendingProperties.add(property);
          }
        }
      } else {
        for (const property of THEME_FRAME_PROPERTIES) {
          pendingProperties.add(property);
        }
      }
      pendingThemeFramePropertiesRef.current = pendingProperties;
      completedThemeFramePropertiesRef.current.clear();
      if (heroRect) {
        setThemeFrameStyle({
          "--theme-frame-x": `${heroRect.left}px`,
          "--theme-frame-y": `${heroRect.top}px`,
          "--theme-frame-width": `${heroRect.width}px`,
          "--theme-frame-height": `${heroRect.height}px`,
        });
      }

      changeTheme(nextTheme, undefined, { skipTransition: true });
      setEnteringTheme(nextTheme);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        completeFactionGate();
      }
    };

    if (!window.matchMedia("(max-width: 760px)").matches) {
      beginTransition();
      return;
    }

    setPreparingTheme(nextTheme);
    const factionImage = new Image();
    let completed = false;
    let prepareFallbackTimer = 0;
    const finishPreparing = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(prepareFallbackTimer);
      setPreparingTheme(null);
      beginTransition();
    };
    factionImage.onload = () => {
      if (typeof factionImage.decode === "function") {
        void factionImage.decode().catch(() => undefined).then(finishPreparing);
        return;
      }
      finishPreparing();
    };
    factionImage.onerror = finishPreparing;
    prepareFallbackTimer = window.setTimeout(finishPreparing, 2500);
    factionImage.src = `/aion2-${nextTheme}-mobile.webp`;
    if (factionImage.complete) finishPreparing();
  };

  const handleGateAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLElement>) => {
      if (
        !enteringTheme ||
        isSettlingTheme ||
        !event.animationName.startsWith("unroll-")
      ) {
        return;
      }
      setIsSettlingTheme(true);
      if (pendingThemeFramePropertiesRef.current.size === 0) {
        completeFactionGate();
      }
    },
    [completeFactionGate, enteringTheme, isSettlingTheme],
  );

  const handleGateTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLElement>) => {
      if (
        !enteringTheme ||
        !isSettlingTheme ||
        !(event.target instanceof HTMLElement)
      ) {
        return;
      }
      if (!event.target.classList.contains(`race-gate-art--${enteringTheme}`)) {
        return;
      }
      if (!isThemeFrameProperty(event.propertyName)) return;

      const pending = pendingThemeFramePropertiesRef.current;
      if (!pending.has(event.propertyName)) return;
      const completed = completedThemeFramePropertiesRef.current;
      completed.add(event.propertyName);
      if ([...pending].every((property) => completed.has(property))) {
        completeFactionGate();
      }
    },
    [completeFactionGate, enteringTheme, isSettlingTheme],
  );

  return (
    <>
      <section
        ref={gateRef}
        className={`race-gate${hasEntered ? " race-gate--closed" : ""}${
          enteringTheme ? ` race-gate--entering-${enteringTheme}` : ""
        }${isSettlingTheme ? " race-gate--settling" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t("Choose your AION2 faction theme")}
        aria-hidden={hasEntered}
        aria-busy={Boolean(enteringTheme || preparingTheme)}
        data-entering={enteringTheme ? "true" : "false"}
        onAnimationEnd={handleGateAnimationEnd}
        onTransitionEnd={handleGateTransitionEnd}
        style={themeFrameStyle}
      >
        <picture className="race-gate-art race-gate-art--elyos">
          <source media="(min-width: 761px)" srcSet="/aion2-elyos.webp" />
          <img
            src={enteringTheme === "elyos" ? "/aion2-elyos-mobile.webp" : TRANSPARENT_IMAGE_SOURCE}
            alt={t("Elyos hero in the luminous world of Elysea")}
            width="1920"
            height="1080"
            decoding="async"
          />
        </picture>
        <picture className="race-gate-art race-gate-art--asmodian">
          <source media="(min-width: 761px)" srcSet="/aion2-asmodian.webp" />
          <img
            src={enteringTheme === "asmodian" ? "/aion2-asmodian-mobile.webp" : TRANSPARENT_IMAGE_SOURCE}
            alt={t("Asmodian hero in the violet world of Asmodae")}
            width="1920"
            height="1080"
            decoding="async"
          />
        </picture>
        <picture className="race-gate-art race-gate-art--mobile-dual">
          <source type="image/avif" srcSet="/aion2-dual-mobile.avif" />
          <img
            src="/aion2-dual-mobile.webp"
            alt={t("Elyos and Asmodian heroes of Atreia")}
            width="750"
            height="1234"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="race-gate-shade" aria-hidden="true" />
        <div className="race-gate-seam" aria-hidden="true" />

        <div className="race-gate-brand" aria-hidden="true">
          <picture>
            <source type="image/avif" srcSet="/aion2-logo.avif" />
            <img
              src="/aion2-logo.webp"
              srcSet="/aion2-logo-160.webp 160w, /aion2-logo-240.webp 240w, /aion2-logo.webp 287w"
              sizes="(max-width: 760px) 40vw, 18vw"
              alt="AION2"
              width="287"
              height="213"
              fetchPriority="high"
            />
          </picture>
        </div>

        <div className="race-choice race-choice--elyos">
          <button
            data-faction-entry="elyos"
            type="button"
            onClick={() => enterTheme("elyos")}
            disabled={Boolean(preparingTheme) || hasEntered}
            tabIndex={hasEntered ? -1 : 0}
          >
            <small>ELYSEA · LIGHT OF ATREIA</small>
            <strong>{t("ENTER ELYSEA")}</strong>
            <span>{t("ENTER AS ELYOS")}</span>
          </button>
        </div>
        <div className="race-choice race-choice--asmodian">
          <button
            data-faction-entry="asmodian"
            type="button"
            onClick={() => enterTheme("asmodian")}
            disabled={Boolean(preparingTheme) || hasEntered}
            tabIndex={hasEntered ? -1 : 0}
          >
            <small>ASMODAE · SHADOW OF ATREIA</small>
            <strong>{t("ENTER ASMODAE")}</strong>
            <span>{t("ENTER AS ASMODIAN")}</span>
          </button>
        </div>

        <details className="race-gate-language-picker">
          <summary
            aria-label={`${t("Choose language")}: ${siteLocaleConfig[locale].label}`}
            tabIndex={enteringTheme || preparingTheme || hasEntered ? -1 : 0}
          >
            <strong lang={siteLocaleConfig[locale].htmlLang}>
              {siteLocaleConfig[locale].shortLabel}
            </strong>
            <span aria-hidden="true">▾</span>
          </summary>
          <nav
            className="race-gate-languages"
            aria-label={t("Choose language")}
          >
            {siteLocales.map((language) => {
              const config = siteLocaleConfig[language];
              const isCurrent = language === locale;
              return (
                <a
                  key={language}
                  className="race-gate-language"
                  href={`/${language}/`}
                  hrefLang={config.hrefLang}
                  lang={config.htmlLang}
                  aria-current={isCurrent ? "page" : undefined}
                  tabIndex={
                    enteringTheme || preparingTheme || hasEntered ? -1 : 0
                  }
                  onClick={(event) => {
                    if (enteringTheme || preparingTheme || hasEntered) {
                      event.preventDefault();
                      return;
                    }
                    document.cookie = `aion2-atlas-locale=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
                    trackEvent("language_change", {
                      from: locale,
                      to: language,
                      surface: "faction_gate",
                    });
                    if (isCurrent) event.preventDefault();
                  }}
                >
                  {config.label}
                </a>
              );
            })}
          </nav>
        </details>

        <p className="race-gate-hint">
          {t("CHOOSE YOUR FACTION · YOU CAN CHANGE YOUR THEME AT ANY TIME")}
        </p>
      </section>

      <main id="main-content" inert={!hasEntered ? true : undefined}>
        <section
          className="hero"
          id="top"
          aria-labelledby="hero-title"
          ref={heroRef}
          tabIndex={-1}
        >
          <div className="hero-backdrops" aria-hidden="true">
            <picture className="hero-backdrop hero-backdrop-elyos">
              <source
                media="(max-width: 760px)"
                srcSet={hasEntered ? "/aion2-elyos-mobile.webp" : TRANSPARENT_IMAGE_SOURCE}
              />
              <img
                src={hasEntered ? "/aion2-elyos.webp" : TRANSPARENT_IMAGE_SOURCE}
                alt={t("Elyos hero in the luminous world of Elysea")}
                width="1920"
                height="1080"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <picture className="hero-backdrop hero-backdrop-asmodian">
              <source
                media="(max-width: 760px)"
                srcSet={hasEntered ? "/aion2-asmodian-mobile.webp" : TRANSPARENT_IMAGE_SOURCE}
              />
              <img
                src={hasEntered ? "/aion2-asmodian.webp" : TRANSPARENT_IMAGE_SOURCE}
                alt={t("Asmodian hero in the violet world of Asmodae")}
                width="1920"
                height="1080"
                decoding="async"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="rift-seam" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span>{t("GLOBAL PLAYER RESOURCE")}</span>
                <b aria-live="polite">
                  {theme === "elyos"
                    ? t("INTERFACE 01 / ELYOS")
                    : t("INTERFACE 02 / ASMODIAN")}
                </b>
              </p>
              <h1 id="hero-title">
                {t("AION2 Guides, Interactive Map & Item Database")}
              </h1>
              <p className="hero-tagline">{t("Two Worlds. One Journey.")}</p>
              <p className="hero-summary">
                {t(
                  "AION2 KINA is an independent AION2 guide hub for class guides, official item data, an interactive map, crafting calculators, and daily and weekly tools. Official announcements, game data, and community findings are labelled separately.",
                )}
              </p>
              <form
                className="hero-search"
                action={`/${locale}/search/`}
                method="get"
                role="search"
              >
                <label
                  className="sr-only"
                  htmlFor={`home-search-${locale}`}
                >
                  {t(
                    "Search AION2 guides, items, classes, maps, and tools",
                  )}
                </label>
                <input
                  id={`home-search-${locale}`}
                  type="search"
                  name="q"
                  placeholder={t(
                    "Search items, guides, classes, maps, or tools",
                  )}
                  autoComplete="off"
                />
                <button type="submit">{t("Search")}</button>
              </form>
              <div className="hero-actions" aria-label={t("Primary actions")}>
                <a
                  className="button button-primary"
                  href={mapHref}
                  onClick={() =>
                    trackEvent("guide_to_map_click", {
                      entry_source: "home-hero",
                      locale,
                      surface: "home-hero",
                    })
                  }
                >
                  {t("Open Interactive Map")}{" "}
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  className="button button-secondary"
                  href={itemDatabaseHref}
                >
                  {t("Search Item Database")}{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <nav className="quick-links" aria-label={t("Quick entries")}>
                {heroSupportLinks.map(([title, target]) => (
                  <a href={getSectionHref(locale, target)} key={title}>
                    <span aria-hidden="true" />
                    {t(title)}
                  </a>
                ))}
              </nav>
            </div>

            {checklistReady ? (
              <Suspense
                fallback={
                  <HomeChecklistPlaceholder
                    checklistHref={checklistHref}
                    checklistPreview={checklistPreview}
                    copy={copy}
                    onActivate={() => setChecklistReady(true)}
                  />
                }
              >
                <LazyHomeChecklistCard
                  locale={locale}
                  checklistHref={checklistHref}
                  copy={copy}
                />
              </Suspense>
            ) : (
              <HomeChecklistPlaceholder
                checklistHref={checklistHref}
                checklistPreview={checklistPreview}
                copy={copy}
                onActivate={() => setChecklistReady(true)}
              />
            )}
          </div>
        </section>

        {children}
      </main>
    </>
  );
}
