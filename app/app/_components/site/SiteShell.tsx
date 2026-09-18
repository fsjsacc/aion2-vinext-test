"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import {
  SiteThemeContext,
  type InterfaceTheme,
  type ThemeChangeEvent,
  type ThemeChangeOptions,
} from "./SiteThemeContext";
import { FooterExternalLinks } from "./FooterExternalLinks";

import {
  getActiveSection,
  getSectionHref,
  localizedHref,
  replaceLocaleInPath,
  siteFooterNavigation,
  siteFooterNavigationCopy,
  siteLocaleConfig,
  siteLocales,
  siteNavigation,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { trackEvent } from "@/app/analytics";
import type { ExternalLinkRecord } from "@/app/external-link-values";
import { persistSiteLocale } from "@/app/locale-preference-client";
import "../../site-shell.css";

type SiteShellProps = {
  children: ReactNode;
  externalLinkScalePercent: number;
  externalLinks: ExternalLinkRecord[];
  locale: SiteLocale;
};

type ExtendedShellCopy = {
  navigationLabel: string;
  languageLabel: string;
  openMenu: string;
  closeMenu: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  skipToContent: string;
  siteInformationLabel: string;
  themeLabel: string;
  elyosTheme: string;
  asmodianTheme: string;
  footerTagline: string;
  legalCopy: string;
  moreLabel: string;
  sectionLabels: Record<string, string>;
};

function resolvedCopy(locale: SiteLocale): ExtendedShellCopy {
  const configured = siteShellCopy[locale];

  return {
    ...configured,
    sectionLabels: configured.navigation,
  };
}

function navigationLabel(
  item: (typeof siteNavigation)[number],
  copy: ExtendedShellCopy,
  configured: Record<string, unknown>,
) {
  const direct = configured[item.labelKey];
  if (typeof direct === "string") return direct;

  const nested = configured.navigation;
  if (nested && typeof nested === "object") {
    const value = (nested as Record<string, unknown>)[item.section];
    if (typeof value === "string") return value;
  }

  return copy.sectionLabels[item.section] ?? item.labelKey;
}

function isMapPath(pathname: string) {
  return /\/tools\/map(?:\/|$)/.test(pathname);
}

function getLanguageNavigationSuffix(value: string, mapRoute: boolean) {
  if (!mapRoute || !value) return value;

  const hashIndex = value.indexOf("#");
  const rawSearch = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
  const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
  const parameters = new URLSearchParams(
    rawSearch.startsWith("?") ? rawSearch.slice(1) : rawSearch,
  );
  parameters.delete("l");
  parameters.delete("lang");
  const search = parameters.toString();

  return `${search ? `?${search}` : ""}${hash}`;
}

export function SiteShell({
  children,
  externalLinkScalePercent,
  externalLinks,
  locale,
}: SiteShellProps) {
  const pathname = usePathname() || getSectionHref(locale, "home");
  const mapRoute = isMapPath(pathname);
  const activeSection = getActiveSection(pathname);
  const copy = useMemo(() => resolvedCopy(locale), [locale]);
  const shortSearchLabel = copy.searchButtonLabel;
  const configuredCopy = siteShellCopy[locale] as Record<string, unknown>;
  const [theme, setTheme] = useState<InterfaceTheme>("elyos");
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const languagePickerRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const themeTransitionRef = useRef<Promise<void> | null>(null);
  const themeFallbackTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    let storedTheme: string | null = null;
    try {
      storedTheme = window.localStorage.getItem("aion2-atlas-theme");
    } catch {
      // Storage can be unavailable in restricted/private browsing contexts.
    }
    let stateFrame = 0;
    if (storedTheme === "elyos" || storedTheme === "asmodian") {
      document.documentElement.dataset.aion2Theme = storedTheme;
      document.documentElement.dataset.aion2ThemeSaved = "true";
      stateFrame = window.requestAnimationFrame(() => {
        setTheme(storedTheme);
        setLocationSearch(`${window.location.search}${window.location.hash}`);
      });
    } else {
      document.documentElement.dataset.aion2Theme = "elyos";
      delete document.documentElement.dataset.aion2ThemeSaved;
      stateFrame = window.requestAnimationFrame(() =>
        setLocationSearch(`${window.location.search}${window.location.hash}`)
      );
    }

    const syncTheme = (event: StorageEvent) => {
      if (
        event.key === "aion2-atlas-theme" &&
        (event.newValue === "elyos" || event.newValue === "asmodian")
      ) {
        setTheme(event.newValue);
        document.documentElement.dataset.aion2Theme = event.newValue;
        document.documentElement.dataset.aion2ThemeSaved = "true";
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => {
      if (stateFrame) window.cancelAnimationFrame(stateFrame);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLocationSearch(`${window.location.search}${window.location.hash}`);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!languageMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !languagePickerRef.current?.contains(event.target)
      ) {
        setLanguageMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setLanguageMenuOpen(false);
      languageButtonRef.current?.focus({ preventScroll: true });
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [languageMenuOpen]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (themeFallbackTimerRef.current !== null) {
        window.clearTimeout(themeFallbackTimerRef.current);
        themeFallbackTimerRef.current = null;
      }
      themeTransitionRef.current = null;
      delete document.documentElement.dataset.aion2ThemeTransition;
      document.documentElement.style.removeProperty("--theme-origin-x");
      document.documentElement.style.removeProperty("--theme-origin-y");
      document.documentElement.style.removeProperty("--theme-reveal-radius");
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menuButton = menuButtonRef.current;
    const restoreTarget = previouslyFocused === document.body ? menuButton : previouslyFocused;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      );

    const firstControl = focusables()[0];
    firstControl?.focus({ preventScroll: true });
    const focusFrame = window.requestAnimationFrame(() =>
      firstControl?.focus({ preventScroll: true }),
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      const focusTarget = restoreTarget ?? menuButton;
      if (focusTarget?.isConnected) focusTarget.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  const changeTheme = useCallback(
    (
      nextTheme: InterfaceTheme,
      event?: ThemeChangeEvent,
      options: ThemeChangeOptions = {},
    ) => {
      if (themeTransitionRef.current) return;

      const persistTheme = () => {
        document.documentElement.dataset.aion2Theme = nextTheme;
        document.documentElement.dataset.aion2ThemeSaved = "true";
        try {
          window.localStorage.setItem("aion2-atlas-theme", nextTheme);
        } catch {
          // Keep the live UI consistent even when persistence is unavailable.
        }
      };

      if (nextTheme === theme) {
        persistTheme();
        return;
      }

      const commitTheme = () => {
        flushSync(() => setTheme(nextTheme));
        persistTheme();
      };

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const startViewTransition = document.startViewTransition?.bind(document);
      if (options.skipTransition || reducedMotion) {
        commitTheme();
        return;
      }

      if (!startViewTransition) {
        document.documentElement.dataset.aion2ThemeTransition = "fallback";
        setIsThemeTransitioning(true);
        // Ensure the fallback transition is active before theme tokens change.
        const siteRoot = document.querySelector<HTMLElement>(".site-shell");
        if (siteRoot) void window.getComputedStyle(siteRoot).getPropertyValue("--accent");
        commitTheme();
        themeTransitionRef.current = new Promise<void>((resolve) => {
          themeFallbackTimerRef.current = window.setTimeout(() => {
            themeFallbackTimerRef.current = null;
            delete document.documentElement.dataset.aion2ThemeTransition;
            themeTransitionRef.current = null;
            if (mountedRef.current) setIsThemeTransitioning(false);
            resolve();
          }, 640);
        });
        return;
      }

      const rect = event?.currentTarget?.getBoundingClientRect();
      const pointerTriggered = Boolean(
        event && (event.detail ?? 0) > 0 && event.clientX !== undefined,
      );
      const originX = pointerTriggered
        ? (event?.clientX ?? window.innerWidth / 2)
        : rect
          ? rect.left + rect.width / 2
          : window.innerWidth / 2;
      const originY = pointerTriggered
        ? (event?.clientY ?? window.innerHeight / 2)
        : rect
          ? rect.top + rect.height / 2
          : window.innerHeight / 2;
      const revealRadius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY),
      );

      document.documentElement.style.setProperty(
        "--theme-origin-x",
        `${originX}px`,
      );
      document.documentElement.style.setProperty(
        "--theme-origin-y",
        `${originY}px`,
      );
      document.documentElement.style.setProperty(
        "--theme-reveal-radius",
        `${revealRadius}px`,
      );

      const transition = startViewTransition(commitTheme);
      setIsThemeTransitioning(true);
      themeTransitionRef.current = transition.finished
        .catch(() => undefined)
        .then(() => {
          themeTransitionRef.current = null;
          document.documentElement.style.removeProperty("--theme-origin-x");
          document.documentElement.style.removeProperty("--theme-origin-y");
          document.documentElement.style.removeProperty("--theme-reveal-radius");
          if (mountedRef.current) setIsThemeTransitioning(false);
        });
    },
    [theme],
  );

  const themeContext = useMemo(
    () => ({ theme, isThemeTransitioning, changeTheme }),
    [changeTheme, isThemeTransitioning, theme],
  );

  const navigation = (
    mobile = false,
    position: "header" | "mobile-menu" | "footer" = mobile ? "mobile-menu" : "header",
  ) => (
    <nav
      className={mobile ? "site-shell-mobile-nav" : "site-shell-navigation"}
      aria-label={copy.navigationLabel}
    >
      {siteNavigation.map((item) => (
        <Link
          href={getSectionHref(locale, item.section)}
          aria-current={activeSection === item.section ? "page" : undefined}
          onClick={() => {
            if (mapRoute) {
              trackEvent("map_site_navigation_click", {
                destination: item.section,
                locale,
                position,
                surface: "map-seo",
              });
            }
            if (mobile) setMenuOpen(false);
          }}
          key={item.section}
        >
          {navigationLabel(item, copy, configuredCopy)}
        </Link>
      ))}
    </nav>
  );

  const searchForm = (mobile = false) => (
    <form
      className={mobile ? "site-shell-mobile-search" : "site-shell-search"}
      action={`/${locale}/search/`}
      method="get"
      role="search"
      onSubmit={(event) => {
        if (!mapRoute) return;
        const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
        trackEvent("map_site_search_submit", {
          locale,
          position: mobile ? "mobile-menu" : "header",
          query_length: query.length,
          surface: "map-seo",
        });
      }}
    >
      <label>
        <span className="site-shell-visually-hidden">{copy.searchLabel}</span>
        <input
          type="search"
          name="q"
          placeholder={copy.searchPlaceholder}
          autoComplete="off"
        />
      </label>
      <button type="submit" aria-label={copy.searchLabel}>
        {shortSearchLabel}
      </button>
    </form>
  );

  const trustNavigation = () => (
    <nav
      className="site-shell-trust-navigation"
      aria-label={copy.siteInformationLabel}
    >
      {siteFooterNavigation.map((item) => (
        <Link
          href={localizedHref(locale, item.path)}
          onClick={() => {
            if (mapRoute) {
              trackEvent("map_site_navigation_click", {
                destination: item.key,
                locale,
                position: "footer",
                surface: "map-seo",
              });
            }
          }}
          key={item.key}
        >
          {siteFooterNavigationCopy[locale][item.key]}
        </Link>
      ))}
    </nav>
  );

  const navigateLanguage = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    language: SiteLocale,
    mobile: boolean,
  ) => {
    setLanguageMenuOpen(false);
    if (mobile) setMenuOpen(false);
    if (language !== locale) {
      trackEvent("language_change", {
        from: locale,
        to: language,
        position: mobile ? "mobile-menu" : "header",
        surface: mapRoute ? "map-seo" : "faction-gate",
      });
    }
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    persistSiteLocale(language);
    const suffix = getLanguageNavigationSuffix(
      `${window.location.search}${window.location.hash}`,
      mapRoute,
    );
    const destination = `${replaceLocaleInPath(
      window.location.pathname,
      language,
    )}${suffix}`;
    window.location.assign(destination);
  };

  const languageLinks = (mobile: boolean) =>
    siteLocales.map((language) => (
      <a
        href={`${replaceLocaleInPath(
          pathname,
          language,
        )}${getLanguageNavigationSuffix(locationSearch, mapRoute)}`}
        hrefLang={siteLocaleConfig[language].hrefLang}
        lang={siteLocaleConfig[language].htmlLang}
        aria-current={language === locale ? "page" : undefined}
        onClick={(event) => navigateLanguage(event, language, mobile)}
        key={language}
      >
        {siteLocaleConfig[language].label}
      </a>
    ));

  const languageSwitcher = (mobile = false) => {
    if (mobile) {
      return (
        <nav
          className="site-shell-mobile-languages"
          aria-label={copy.languageLabel}
        >
          {languageLinks(true)}
        </nav>
      );
    }

    const currentLocale = siteLocaleConfig[locale];
    return (
      <div className="site-shell-language-picker" ref={languagePickerRef}>
        <button
          ref={languageButtonRef}
          className="site-shell-language-trigger"
          type="button"
          aria-expanded={languageMenuOpen}
          aria-controls="site-shell-language-options"
          aria-haspopup="true"
          aria-label={`${copy.languageLabel}: ${currentLocale.label}`}
          onClick={() => setLanguageMenuOpen((open) => !open)}
        >
          <span lang={currentLocale.htmlLang}>
            {currentLocale.shortLabel}
          </span>
          <span className="site-shell-language-trigger-label" lang={currentLocale.htmlLang}>
            {currentLocale.label}
          </span>
          <span className="site-shell-language-chevron" aria-hidden="true">
            ▾
          </span>
        </button>
        <nav
          id="site-shell-language-options"
          className="site-shell-language-options"
          aria-label={copy.languageLabel}
          hidden={!languageMenuOpen}
          data-open={languageMenuOpen ? "true" : "false"}
        >
          {languageLinks(false)}
        </nav>
      </div>
    );
  };

  const themeSwitcher = (mobile = false) => (
    <div
      className={mobile ? "site-shell-mobile-themes" : "site-shell-themes"}
      role="group"
      aria-label={copy.themeLabel}
      aria-busy={isThemeTransitioning}
    >
      <button
        type="button"
        aria-pressed={theme === "elyos"}
        disabled={isThemeTransitioning}
        onClick={(event) => {
          if (mapRoute && theme !== "elyos") {
            trackEvent("map_site_theme_change", {
              from: theme,
              locale,
              position: mobile ? "mobile-menu" : "header",
              surface: "map-seo",
              to: "elyos",
            });
          }
          changeTheme("elyos", event);
        }}
      >
        <span aria-hidden="true">01</span>
        {copy.elyosTheme}
      </button>
      <button
        type="button"
        aria-pressed={theme === "asmodian"}
        disabled={isThemeTransitioning}
        onClick={(event) => {
          if (mapRoute && theme !== "asmodian") {
            trackEvent("map_site_theme_change", {
              from: theme,
              locale,
              position: mobile ? "mobile-menu" : "header",
              surface: "map-seo",
              to: "asmodian",
            });
          }
          changeTheme("asmodian", event);
        }}
      >
        <span aria-hidden="true">02</span>
        {copy.asmodianTheme}
      </button>
    </div>
  );

  return (
    <SiteThemeContext.Provider value={themeContext}>
      <div
        className="site site-shell"
        data-theme={theme}
        lang={siteLocaleConfig[locale].htmlLang}
      >
        <>
          <a
              className="site-shell-skip-link"
              href="#site-shell-content"
              inert={menuOpen ? true : undefined}
              aria-hidden={menuOpen ? true : undefined}
            >
              {copy.skipToContent}
            </a>
            <header
              className="site-shell-header"
              inert={menuOpen ? true : undefined}
            >
              <div className="site-shell-header-inner">
                <Link
                  className="brand site-shell-brand"
                  href={getSectionHref(locale, "home")}
                  aria-label="AION2 KINA"
                  onClick={() => {
                    if (mapRoute) {
                      trackEvent("map_site_navigation_click", {
                        destination: "home",
                        locale,
                        position: "header-brand",
                        surface: "map-seo",
                      });
                    }
                  }}
                >
                  <picture className="site-brand-picture">
                    <source type="image/avif" srcSet="/aion2-logo-96.avif" />
                    <img
                      className="site-brand-logo"
                      src="/aion2-logo-96.webp"
                      alt="AION2 KINA"
                      width="96"
                      height="71"
                    />
                  </picture>
                  <span>
                    <strong>AION2</strong>
                    <small>KINA</small>
                  </span>
                </Link>

                {navigation()}

                <div className="site-shell-header-actions">
                  {searchForm()}
                  {languageSwitcher()}
                  {themeSwitcher()}
                  <button
                    ref={menuButtonRef}
                    className="site-shell-menu-button"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="site-shell-mobile-menu"
                    aria-label={copy.openMenu}
                    onClick={() => {
                      setLanguageMenuOpen(false);
                      setMenuOpen(true);
                    }}
                  >
                    {copy.moreLabel}
                  </button>
                </div>
              </div>
            </header>

            <button
              className="site-shell-menu-backdrop"
              type="button"
              aria-hidden="true"
              data-open={menuOpen ? "true" : "false"}
              tabIndex={-1}
              onClick={() => setMenuOpen(false)}
            />
            <aside
              ref={menuRef}
              id="site-shell-mobile-menu"
              className="site-shell-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={copy.navigationLabel}
              aria-hidden={!menuOpen}
              inert={!menuOpen ? true : undefined}
              data-open={menuOpen ? "true" : "false"}
            >
              <div className="site-shell-mobile-menu-heading">
                <strong>AION2 KINA</strong>
                <button type="button" onClick={() => setMenuOpen(false)}>
                  {copy.closeMenu}
                </button>
              </div>
              {searchForm(true)}
              {navigation(true)}
              <section
                aria-labelledby="site-shell-mobile-language-label"
                className="site-shell-mobile-menu-section"
              >
                <p
                  className="site-shell-mobile-menu-label"
                  id="site-shell-mobile-language-label"
                >
                  {copy.languageLabel}
                </p>
                {languageSwitcher(true)}
              </section>
              <section
                aria-labelledby="site-shell-mobile-theme-label"
                className="site-shell-mobile-menu-section"
              >
                <p
                  className="site-shell-mobile-menu-label"
                  id="site-shell-mobile-theme-label"
                >
                  {copy.themeLabel}
                </p>
                {themeSwitcher(true)}
              </section>
          </aside>
        </>

        <div
          id="site-shell-content"
          className="site-shell-content"
          tabIndex={-1}
          inert={menuOpen ? true : undefined}
          aria-hidden={menuOpen ? true : undefined}
        >
          {children}
        </div>

        <footer
            className={`site-shell-footer${activeSection === "home" ? " site-shell-footer--compact" : ""}`}
            inert={menuOpen ? true : undefined}
            aria-hidden={menuOpen ? true : undefined}
          >
            <div className="site-shell-footer-inner">
              <div>
                <Link
                  className="brand site-shell-footer-brand"
                  href={getSectionHref(locale, "home")}
                  aria-label="AION2 KINA"
                  onClick={() => {
                    if (mapRoute) {
                      trackEvent("map_site_navigation_click", {
                        destination: "home",
                        locale,
                        position: "footer-brand",
                        surface: "map-seo",
                      });
                    }
                  }}
                >
                  <picture className="site-brand-picture">
                    <source type="image/avif" srcSet="/aion2-logo-96.avif" />
                    <img
                      className="site-brand-logo"
                      src="/aion2-logo-96.webp"
                      alt="AION2 KINA"
                      width="96"
                      height="71"
                      loading="lazy"
                    />
                  </picture>
                  <span>
                    <strong>AION2</strong>
                    <small>KINA</small>
                  </span>
                </Link>
                <p>{copy.footerTagline}</p>
              </div>
              {activeSection !== "home" ? navigation(false, "footer") : null}
              <div className="site-shell-footer-policy">
                {trustNavigation()}
                <p className="site-shell-legal">
                  © {new Date().getFullYear()} AION2 KINA. {copy.legalCopy}
                </p>
              </div>
            </div>
            <FooterExternalLinks
              links={externalLinks}
              locale={locale}
              scalePercent={externalLinkScalePercent}
            />
        </footer>
      </div>
    </SiteThemeContext.Provider>
  );
}

export default SiteShell;
