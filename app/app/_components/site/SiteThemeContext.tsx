"use client";

import {
  createContext,
  useContext,
} from "react";

export type InterfaceTheme = "elyos" | "asmodian";

export type ThemeChangeEvent = {
  clientX?: number;
  clientY?: number;
  currentTarget?: { getBoundingClientRect(): DOMRect };
  detail?: number;
};

export type ThemeChangeOptions = {
  skipTransition?: boolean;
};

export type SiteThemeContextValue = {
  theme: InterfaceTheme;
  isThemeTransitioning: boolean;
  changeTheme: (
    nextTheme: InterfaceTheme,
    event?: ThemeChangeEvent,
    options?: ThemeChangeOptions,
  ) => void;
};

export const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

export function useSiteTheme(): SiteThemeContextValue {
  const context = useContext(SiteThemeContext);
  if (!context) throw new Error("useSiteTheme must be used inside SiteShell");
  return context;
}
