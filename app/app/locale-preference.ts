import {
  DEFAULT_SITE_LOCALE,
  isSiteLocale,
  type SiteLocale,
} from "./site-config";

export const LOCALE_COOKIE = "aion2-atlas-locale";

export function localeFromCookie(value: string | null): SiteLocale | null {
  const encodedLocale = value
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE}=`))
    ?.slice(LOCALE_COOKIE.length + 1);

  if (!encodedLocale) return null;
  try {
    const locale = decodeURIComponent(encodedLocale);
    return isSiteLocale(locale) ? locale : null;
  } catch {
    return null;
  }
}

export function localeFromAcceptLanguage(value: string | null): SiteLocale {
  const preferences = (value ?? "")
    .split(",")
    .map((entry, index) => {
      const [rawLanguage, ...parameters] = entry.trim().toLowerCase().split(";");
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const quality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1;
      return {
        language: rawLanguage,
        quality: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .filter(({ language, quality }) => Boolean(language) && quality > 0)
    .sort(
      (left, right) =>
        right.quality - left.quality || left.index - right.index,
    );

  for (const { language } of preferences) {
    if (
      language === "zh-hant" ||
      language.startsWith("zh-hant-") ||
      /^zh-(?:tw|hk|mo)(?:-|$)/.test(language) ||
      language === "zh-yue" ||
      language.startsWith("zh-yue-")
    ) {
      return "zh-hant";
    }
    if (
      language === "zh" ||
      language === "zh-hans" ||
      language.startsWith("zh-hans-") ||
      /^zh-(?:cn|sg|my)(?:-|$)/.test(language)
    ) {
      return "zh-hans";
    }
    if (language === "ko" || language.startsWith("ko-")) return "ko";
    if (language === "ja" || language.startsWith("ja-")) return "ja";
    if (language === "fr" || language.startsWith("fr-")) return "fr";
    if (language === "de" || language.startsWith("de-")) return "de";
    if (language === "es" || language.startsWith("es-")) return "es";
    if (language === "pt" || language.startsWith("pt-")) return "pt-br";
    if (language === "ru" || language.startsWith("ru-")) return "ru";
    if (language === "en" || language.startsWith("en-")) return "en";
  }

  return DEFAULT_SITE_LOCALE;
}

export function preferredSiteLocale(
  cookieHeader: string | null,
  acceptLanguage: string | null,
): SiteLocale {
  return (
    localeFromCookie(cookieHeader) ??
    localeFromAcceptLanguage(acceptLanguage)
  );
}
