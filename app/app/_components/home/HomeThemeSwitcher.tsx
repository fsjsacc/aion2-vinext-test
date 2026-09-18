"use client";

import { useSiteTheme } from "@/app/_components/site/SiteThemeContext";

export function HomeThemeSwitcher({
  ariaLabel,
  asmodianLabel,
  elyosLabel,
}: {
  ariaLabel: string;
  asmodianLabel: string;
  elyosLabel: string;
}) {
  const { theme, isThemeTransitioning, changeTheme } = useSiteTheme();

  return (
    <div
      className="banner-theme-switch"
      role="group"
      aria-label={ariaLabel}
      aria-busy={isThemeTransitioning}
    >
      <button
        type="button"
        aria-pressed={theme === "elyos"}
        disabled={isThemeTransitioning}
        onClick={(event) => changeTheme("elyos", event)}
      >
        <span>01</span> {elyosLabel}
      </button>
      <button
        type="button"
        aria-pressed={theme === "asmodian"}
        disabled={isThemeTransitioning}
        onClick={(event) => changeTheme("asmodian", event)}
      >
        <span>02</span> {asmodianLabel}
      </button>
    </div>
  );
}
