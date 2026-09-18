"use client";

import { Settings2, ShieldCheck, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  clearJourneyIdentity,
  collectJourneyEvent,
  deleteStoredJourney,
  readAnalyticsConsent,
  updateGoogleAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsent,
} from "@/app/analytics-journey";
import {
  isProductionAnalyticsHost,
  trackEvent,
  trackPageView,
} from "@/app/analytics";
import {
  getLocaleFromPathname,
  isSiteLocale,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./AnalyticsConsentManager.module.css";

type ConsentCopy = {
  eyebrow: string;
  title: string;
  body: string;
  accept: string;
  decline: string;
  privacy: string;
  settings: string;
  saved: string;
  basic: string;
  granted: string;
  denied: string;
  close: string;
};

const copy: Record<SiteLocale, ConsentCopy> = {
  "zh-hans": {
    eyebrow: "Cookie 与分析",
    title: "本网站使用 Cookie",
    body: "我们使用必要 Cookie 维持网站功能，并通过 GA4 分析 Cookie 了解使用情况、改进内容与体验。分析 Cookie 默认开启；你可以选择关闭，并随时在“分析偏好”中更改选择。",
    accept: "保留分析 Cookie",
    decline: "拒绝分析 Cookie",
    privacy: "查看隐私政策",
    settings: "分析偏好",
    saved: "当前选择",
    basic: "分析 Cookie（默认开启）",
    granted: "分析 Cookie 已开启",
    denied: "分析 Cookie 已关闭",
    close: "完成",
  },
  "zh-hant": {
    eyebrow: "Cookie 與分析",
    title: "本網站使用 Cookie",
    body: "我們使用必要 Cookie 維持網站功能，並透過 GA4 分析 Cookie 了解使用情況、改善內容與體驗。分析 Cookie 預設開啟，你可以選擇關閉，並隨時在「分析偏好」中更改。",
    accept: "保留分析 Cookie",
    decline: "拒絕分析 Cookie",
    privacy: "查看隱私權政策",
    settings: "分析偏好",
    saved: "目前選擇",
    basic: "分析 Cookie（預設開啟）",
    granted: "分析 Cookie 已開啟",
    denied: "分析 Cookie 已關閉",
    close: "完成",
  },
  en: {
    eyebrow: "Cookies & analytics",
    title: "This site uses cookies",
    body: "We use essential cookies to keep the site working and GA4 analytics cookies to understand usage and improve the experience. Analytics cookies are on by default; you can turn them off and change your choice anytime in Analytics choices.",
    accept: "Keep analytics cookies",
    decline: "Reject analytics cookies",
    privacy: "Read Privacy Policy",
    settings: "Analytics choices",
    saved: "Current choice",
    basic: "Analytics cookies (on by default)",
    granted: "Analytics cookies on",
    denied: "Analytics cookies off",
    close: "Done",
  },
  fr: {
    eyebrow: "Cookies et analyse",
    title: "Ce site utilise des cookies",
    body: "Nous utilisons des cookies essentiels au fonctionnement du site et des cookies d’analyse GA4 pour comprendre son utilisation et améliorer l’expérience. Les cookies d’analyse sont activés par défaut ; vous pouvez les refuser et modifier votre choix à tout moment dans les préférences d’analyse.",
    accept: "Conserver les cookies d’analyse",
    decline: "Refuser les cookies d’analyse",
    privacy: "Consulter la politique de confidentialité",
    settings: "Préférences d’analyse",
    saved: "Choix actuel",
    basic: "Cookies d’analyse (activés par défaut)",
    granted: "Cookies d’analyse activés",
    denied: "Cookies d’analyse désactivés",
    close: "Terminé",
  },
  de: {
    eyebrow: "Cookies und Analyse",
    title: "Diese Website verwendet Cookies",
    body: "Wir verwenden notwendige Cookies für den Betrieb der Website und GA4-Analyse-Cookies, um die Nutzung zu verstehen und das Erlebnis zu verbessern. Analyse-Cookies sind standardmäßig aktiviert; du kannst sie ablehnen und deine Auswahl jederzeit in den Analyse-Einstellungen ändern.",
    accept: "Analyse-Cookies beibehalten",
    decline: "Analyse-Cookies ablehnen",
    privacy: "Datenschutzerklärung lesen",
    settings: "Analyse-Einstellungen",
    saved: "Aktuelle Auswahl",
    basic: "Analyse-Cookies (standardmäßig aktiviert)",
    granted: "Analyse-Cookies aktiviert",
    denied: "Analyse-Cookies deaktiviert",
    close: "Fertig",
  },
  es: {
    eyebrow: "Cookies y analítica",
    title: "Este sitio utiliza cookies",
    body: "Utilizamos cookies esenciales para que el sitio funcione y cookies de analítica de GA4 para conocer su uso y mejorar la experiencia. Las cookies de analítica están activadas de forma predeterminada; puedes rechazarlas y cambiar tu elección en cualquier momento en Preferencias de analítica.",
    accept: "Mantener cookies de analítica",
    decline: "Rechazar cookies de analítica",
    privacy: "Leer la Política de privacidad",
    settings: "Preferencias de analítica",
    saved: "Elección actual",
    basic: "Cookies de analítica (activadas por defecto)",
    granted: "Cookies de analítica activadas",
    denied: "Cookies de analítica desactivadas",
    close: "Listo",
  },
  ja: {
    eyebrow: "Cookie とアクセス解析",
    title: "当サイトでは Cookie を使用します",
    body: "サイトの機能を維持するための必須 Cookie と、利用状況を把握して体験を改善するための GA4 アクセス解析 Cookie を使用します。解析 Cookie は初期設定で有効ですが、拒否したり、「解析設定」からいつでも選択を変更したりできます。",
    accept: "解析 Cookie を有効にする",
    decline: "解析 Cookie を拒否する",
    privacy: "プライバシーポリシーを見る",
    settings: "解析設定",
    saved: "現在の選択",
    basic: "解析 Cookie（初期設定で有効）",
    granted: "解析 Cookie は有効です",
    denied: "解析 Cookie は無効です",
    close: "完了",
  },
  "pt-br": {
    eyebrow: "Cookies e análise",
    title: "Este site usa cookies",
    body: "Usamos cookies essenciais para manter o site funcionando e cookies de análise do GA4 para entender o uso e melhorar a experiência. Os cookies de análise ficam ativados por padrão; você pode recusá-los e alterar sua escolha a qualquer momento em Preferências de análise.",
    accept: "Manter cookies de análise",
    decline: "Recusar cookies de análise",
    privacy: "Ler a Política de Privacidade",
    settings: "Preferências de análise",
    saved: "Escolha atual",
    basic: "Cookies de análise (ativados por padrão)",
    granted: "Cookies de análise ativados",
    denied: "Cookies de análise desativados",
    close: "Concluir",
  },
  ru: {
    eyebrow: "Файлы cookie и аналитика",
    title: "Этот сайт использует файлы cookie",
    body: "Мы используем необходимые файлы cookie для работы сайта и аналитические файлы cookie GA4, чтобы понимать, как используется сайт, и улучшать его. Аналитические файлы cookie включены по умолчанию; их можно отклонить и в любое время изменить выбор в настройках аналитики.",
    accept: "Оставить аналитические cookie",
    decline: "Отклонить аналитические cookie",
    privacy: "Открыть Политику конфиденциальности",
    settings: "Настройки аналитики",
    saved: "Текущий выбор",
    basic: "Аналитические cookie (включены по умолчанию)",
    granted: "Аналитические cookie включены",
    denied: "Аналитические cookie отключены",
    close: "Готово",
  },
  ko: {
    eyebrow: "쿠키 및 분석",
    title: "이 사이트는 쿠키를 사용합니다",
    body: "사이트 기능을 위한 필수 쿠키와 이용 현황을 파악하고 콘텐츠를 개선하기 위한 GA4 분석 쿠키를 사용합니다. 분석 쿠키는 기본으로 켜져 있으며 언제든지 분석 설정에서 끌 수 있습니다.",
    accept: "분석 쿠키 유지",
    decline: "분석 쿠키 거부",
    privacy: "개인정보 처리방침",
    settings: "분석 설정",
    saved: "현재 선택",
    basic: "분석 쿠키(기본 사용)",
    granted: "분석 쿠키 사용 중",
    denied: "분석 쿠키 사용 안 함",
    close: "완료",
  },
} as const;

function routeLocale(pathname: string | null): SiteLocale {
  const value = pathname?.split("/")[1]?.toLowerCase();
  return isSiteLocale(value) ? value : "en";
}

function pageViewSurface(pathname: string) {
  const locale = getLocaleFromPathname(pathname);
  if (locale && (pathname === `/${locale}` || pathname === `/${locale}/`)) {
    return "home" as const;
  }
  if (pathname.includes("/tools/map/")) return "interactive-map" as const;
  if (pathname.includes("/tools/daily-checklist/")) return "daily-checklist" as const;
  if (pathname.includes("/tools/class-finder/")) return "class-finder" as const;
  if (pathname.includes("/tools/material-calculator/")) return "material-calculator" as const;
  if (pathname.includes("/tools/event-timer/")) return "event-timer" as const;
  if (/\/(?:guides|classes|news|database)\//u.test(pathname)) return "content-hub" as const;
  return "unknown" as const;
}

function pageTarget(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const localeOffset = isSiteLocale(segments[0]) ? 1 : 0;
  const section = segments[localeOffset];
  const slug = segments[localeOffset + 1];
  if (section === "database" && slug === "item" && /^[1-9]\d{0,17}$/u.test(segments[localeOffset + 2] ?? "")) {
    return { targetKind: "item" as const, targetKey: segments[localeOffset + 2] };
  }
  if (section && slug && ["guides", "classes", "news", "database"].includes(section)) {
    return { targetKind: "content" as const, targetKey: `${section}/${slug}` };
  }
  if (section === "tools" && slug) {
    return { targetKind: "tool" as const, targetKey: slug === "map" ? "interactive-map" : slug };
  }
  return { targetKind: "none" as const, targetKey: "none" };
}

function isAdminPath(pathname: string | null) {
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const localeOffset = isSiteLocale(segments[0]) ? 1 : 0;
  return segments[localeOffset] === "admin";
}

export function AnalyticsConsentManager() {
  const pathname = usePathname();
  const locale = routeLocale(pathname);
  const text = copy[locale];
  const [choice, setChoice] = useState<AnalyticsConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const initialized = useRef(false);
  const lastPageViewKey = useRef<string | null>(null);
  const previousPageLocation = useRef<string | null>(null);

  const isAdmin = isAdminPath(pathname);

  useEffect(() => {
    const initialize = window.setTimeout(() => {
      const saved = readAnalyticsConsent();
      setChoice(saved);
      setOpen(false);
      setReady(true);
      initialized.current = true;
    }, 0);
    return () => window.clearTimeout(initialize);
  }, []);

  useEffect(() => {
    if (
      !initialized.current ||
      choice !== "granted" ||
      !pathname ||
      isAdmin ||
      !isProductionAnalyticsHost(window.location.hostname)
    ) return;
    const pageLocation =
      `${window.location.origin}${pathname}${window.location.search}`;
    if (lastPageViewKey.current === pageLocation) return;
    const pageReferrer = previousPageLocation.current ?? document.referrer;
    lastPageViewKey.current = pageLocation;
    previousPageLocation.current = pageLocation;
    const target = pageTarget(pathname);
    collectJourneyEvent({
      event: "page_view",
      locale,
      service: "unknown",
      surface: pageViewSurface(pathname),
      ...target,
    });
    trackPageView({
      page_location: pageLocation,
      page_referrer: pageReferrer,
      page_title: document.title,
    });
  }, [choice, isAdmin, locale, pathname]);

  const choose = (next: AnalyticsConsent) => {
    const previous = readAnalyticsConsent();
    if (next === "denied") {
      deleteStoredJourney();
      clearJourneyIdentity();
    }
    writeAnalyticsConsent(next);
    updateGoogleAnalyticsConsent(next);
    setChoice(next);
    setOpen(false);
    trackEvent("analytics_consent_update", {
      consent_state: next,
      previous_state: previous ?? "unset",
      surface: "privacy-consent",
    });
  };

  if (isAdmin) return null;

  return (
    <>
      {open ? (
        <div className={styles.backdrop} role="presentation">
          <section className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="analytics-consent-title">
            <button className={styles.closeButton} onClick={() => setOpen(false)} type="button" aria-label={text.close}><X size={18} /></button>
            <div className={styles.icon}><ShieldCheck size={24} /></div>
            <p className={styles.eyebrow}>{text.eyebrow}</p>
            <h2 id="analytics-consent-title">{text.title}</h2>
            <p className={styles.body}>{text.body}</p>
            <p className={styles.current}><span>{text.saved}</span><strong>{choice === "granted" ? text.granted : choice === "denied" ? text.denied : text.basic}</strong></p>
            <div className={styles.actions}>
              <button className={styles.primary} onClick={() => choose("granted")} type="button">{text.accept}</button>
              <button className={styles.secondary} onClick={() => choose("denied")} type="button">{text.decline}</button>
            </div>
            <a className={styles.privacyLink} href={`/${locale}/privacy/`}>{text.privacy}</a>
          </section>
        </div>
      ) : ready ? (
        <button
          aria-label={text.settings}
          className={styles.settingsButton}
          onClick={() => {
            setOpen(true);
            trackEvent("analytics_preferences_open", { surface: "privacy-consent" });
          }}
          type="button"
        ><Settings2 size={15} /><span>{text.settings}</span></button>
      ) : null}
    </>
  );
}
