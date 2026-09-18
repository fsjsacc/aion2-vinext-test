import type { Metadata } from "next";
import { headers } from "next/headers";
import { DeferredAnalyticsConsentManager } from "./_components/analytics/DeferredAnalyticsConsentManager";
import { GlobalStyles } from "./_components/GlobalStyles";
import { isSiteLocale, siteLocaleConfig } from "./site-config";
import { getRequestSiteOrigin } from "./site-url";

const title = "AION2 KINA | Guides, Builds, Maps & Field Data";
const description =
  "A 10-language AION2 hub for guides, maps and tools. Item identity, icons and grades are checked against NC data; map markers are curated and verified in game.";

const GTM_CONTAINER_ID = "GTM-KGNX3NXL";
const GA4_MEASUREMENT_ID = "G-XDH0X1HZR2";
// The published GTM container currently has no GA4 tag. GA4 is therefore
// initialized once through the direct Google tag below. Keep send_page_view
// disabled: AnalyticsConsentManager owns the initial and SPA page views.

const adminAuthFragmentBridgeScript = `(function(){
  var hash = window.location.hash;
  if (!hash) return;
  var looksLikeAuthCallback = /(?:^|[&#])(?:access_token|refresh_token|error|error_code|error_description)=/.test(hash);
  if (!looksLikeAuthCallback) return;
  window.__aion2SkipAnalyticsForAuthCallback = true;
  var isAdminLogin = window.location.pathname === '/admin/login/' || window.location.pathname === '/admin/login';
  if (hash.length > 20000) {
    if (!isAdminLogin) window.location.replace('/admin/login/#error=access_denied&error_code=invalid_callback');
    return;
  }
  var params;
  try { params = new URLSearchParams(hash.slice(1)); } catch (error) { return; }
  var accessToken = params.get('access_token');
  var tokenType = params.get('token_type');
  var callbackType = params.get('type');
  var hasProviderError = params.has('error') || params.has('error_code') || params.has('error_description');
  var hasSensitiveAuthValue = params.has('access_token') || params.has('refresh_token') || hasProviderError;
  if (!hasSensitiveAuthValue) return;
  if (isAdminLogin) return;
  var isValidAccessToken = typeof accessToken === 'string'
    && accessToken.length <= 3500
    && /^[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+$/.test(accessToken)
    && typeof tokenType === 'string'
    && tokenType.toLowerCase() === 'bearer'
    && (callbackType === 'magiclink' || callbackType === 'signup');
  var forwarded = new URLSearchParams();
  if (isValidAccessToken) {
    forwarded.set('access_token', accessToken);
    forwarded.set('token_type', 'bearer');
    forwarded.set('type', callbackType);
  } else {
    forwarded.set('error', params.get('error') || 'access_denied');
    forwarded.set('error_code', params.get('error_code') || 'invalid_callback');
  }
  window.location.replace('/admin/login/#' + forwarded.toString());
})();`;

const googleConsentBootstrapScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function(){
  if (window.__aion2SkipAnalyticsForAuthCallback === true) return;
  var analyticsHostname = window.location.hostname || '';
  var isProductionAnalyticsHost = analyticsHostname === 'aion2kina.com'
    || analyticsHostname === 'www.aion2kina.com';
  var isAdminPath = window.location.pathname === '/admin'
    || window.location.pathname.startsWith('/admin/');
  if (!isProductionAnalyticsHost || isAdminPath) return;
  var choice = null;
  try { choice = window.localStorage.getItem('aion2-analytics-consent-v2'); } catch (error) {}
  if (choice !== 'granted' && choice !== 'denied') {
    // Default every visitor to detailed analytics consent; no banner is shown.
    choice = 'granted';
    try { window.localStorage.setItem('aion2-analytics-consent-v2', 'granted'); } catch (error) {}
    document.cookie = 'aion2_analytics_consent=granted-v2; Path=/; Max-Age=31536000; SameSite=Lax' + (window.location.protocol === 'https:' ? '; Secure' : '');
  }
  var detailedAnalytics = choice === 'granted';
  var analyticsStorage = choice === 'denied' ? 'denied' : 'granted';
  gtag('consent', 'default', {
    analytics_storage: analyticsStorage,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', {
    page_location: window.location.origin + window.location.pathname
      + (detailedAnalytics ? window.location.search : ''),
    page_referrer: detailedAnalytics ? document.referrer : ''
  });
  window.aion2Ga4MeasurementId = '${GA4_MEASUREMENT_ID}';
  var googleTagLoaded = false;
  var ga4Configured = false;
  var tagManagerLoaded = false;
  window.aion2ConfigureGa4 = function(consentGranted){
    var mayConfigureGa4 = consentGranted === true;
    try {
      mayConfigureGa4 = mayConfigureGa4 || window.localStorage.getItem('aion2-analytics-consent-v2') === 'granted';
    } catch (error) {}
    if (!mayConfigureGa4 || ga4Configured) return;
    ga4Configured = true;
    gtag('js', new Date());
    gtag('config', '${GA4_MEASUREMENT_ID}', {
      send_page_view: false
    });
  };
  window.aion2LoadGa4 = function(consentGranted){
    var mayLoadGoogleTag = consentGranted === true;
    try {
      mayLoadGoogleTag = mayLoadGoogleTag || window.localStorage.getItem('aion2-analytics-consent-v2') === 'granted';
    } catch (error) {}
    if (!mayLoadGoogleTag) return;
    window.aion2ConfigureGa4(true);
    if (googleTagLoaded) return;
    googleTagLoaded = true;
    var googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}';
    document.head.appendChild(googleTag);
  };
  window.aion2LoadGtm = function(consentGranted){
    var mayLoadTagManager = consentGranted === true;
    try {
      mayLoadTagManager = mayLoadTagManager || window.localStorage.getItem('aion2-analytics-consent-v2') === 'granted';
    } catch (error) {}
    if (mayLoadTagManager) window.aion2LoadGa4(true);
    if (tagManagerLoaded || !mayLoadTagManager) return;
    tagManagerLoaded = true;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
  };
  window.aion2ScheduleGtm = function(){
    if (tagManagerLoaded) return;
    if (typeof window.addEventListener !== 'function') return;
    var start = function(){ window.aion2LoadGtm(detailedAnalytics); };
    var afterLoad = function(){ window.setTimeout(start, 5000); };
    window.addEventListener('pointerdown', start, { once: true, passive: true });
    window.addEventListener('keydown', start, { once: true });
    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });
  };
  window.aion2ResetAnalyticsAfterDenial = function(){
    if (typeof document.cookie === 'string') {
      document.cookie.split(';').forEach(function(entry){
        var name = entry.split('=')[0].trim();
        if (/^_ga(?:_|$)/.test(name) || name === '_gid' || name === '_gat') {
          document.cookie = name + '=; Path=/; Max-Age=0; SameSite=Lax';
          if (window.location.hostname && window.location.hostname.indexOf('.') !== -1) {
            document.cookie = name + '=; Path=/; Domain=.' + window.location.hostname.replace(/^www\./, '') + '; Max-Age=0; SameSite=Lax';
          }
        }
      });
    }
    if (tagManagerLoaded) window.location.reload();
  };
  if (choice === 'denied') window.aion2ResetAnalyticsAfterDenial();
  if (detailedAnalytics) {
    window.aion2LoadGa4(true);
    window.aion2ScheduleGtm();
  }
})();`;

const themeBootstrapScript = `(() => {
  try {
    const theme = window.localStorage.getItem("aion2-atlas-theme");
    if (theme === "elyos" || theme === "asmodian") {
      document.documentElement.dataset.aion2Theme = theme;
      document.documentElement.dataset.aion2ThemeSaved = "true";
      try {
        const gateSeen = window.sessionStorage.getItem("aion2-atlas-faction-gate-seen");
        if (gateSeen === "true") {
          document.documentElement.dataset.aion2FactionGateSeen = "true";
        }
      } catch {}
    }
  } catch {}
})();

// Bootstrap the client-side RSC application via the modulepreload entry point.
// vinext does not inject a client loader script in dev or start mode. The
// entry URL differs per mode: production emits hashed /assets/index-* pages
// while dev emits the virtual module /@id/__x00__virtual:vite-rsc/entry-browser.
// The loader creates a fresh module script element per attempt, so a transient
// load failure (tunnel reset, vite cold-compile, dev-server restart invalidating
// the ?v= version) retries with backoff and self-heals instead of leaving the
// page permanently unhydrated (faction gate / all client interactions dead).
(function() {
  var entryLink = document.querySelector(
    'link[rel="modulepreload"][href*="/assets/index-"], link[rel="modulepreload"][href*="entry-browser"]'
  );
  if (!entryLink) return;
  var entryUrl = entryLink.getAttribute("href");
  if (!entryUrl) return;
  var attempts = 0;
  var MAX_ATTEMPTS = 12;
  function loadEntry() {
    attempts++;
    var moduleScript = document.createElement("script");
    moduleScript.type = "module";
    moduleScript.src = entryUrl;
    moduleScript.async = true;
    moduleScript.onload = function() {
      moduleScript.remove();
    };
    moduleScript.onerror = function() {
      moduleScript.remove();
      if (attempts < MAX_ATTEMPTS) {
        var delay = Math.min(15000, 1000 * Math.pow(2, attempts));
        window.setTimeout(loadEntry, delay);
      }
    };
    document.head.appendChild(moduleScript);
  }
  loadEntry();
})();`;

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  const trustedSiteOrigin = await getRequestSiteOrigin();
  let metadataBase: URL;
  try {
    metadataBase = new URL(trustedSiteOrigin ?? `${protocol}://${host}`);
  } catch {
    metadataBase = new URL("http://localhost:3000");
  }

  const socialImage = new URL("/aion2-dual.webp", metadataBase).toString();

  return {
    metadataBase,
    title,
    description,
    applicationName: "AION2 KINA",
    keywords: [
      "AION2",
      "AION 2 guides",
      "AION2 builds",
      "AION2 database",
      "AION2 maps",
      "AION2 English",
      "AION2 繁體中文",
      "아이온2 공략",
    ],
    icons: {
      icon: [
        { url: "/aion2-icon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/aion2-icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1920,
          height: 1080,
          alt: "AION2 KINA guides, builds, maps, and field data",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: socialImage,
          alt: "AION2 KINA guides, builds, maps, and field data",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-aion2-locale");
  const htmlLang = locale && isSiteLocale(locale)
    ? siteLocaleConfig[locale].htmlLang
    : "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: adminAuthFragmentBridgeScript }} />
        <script dangerouslySetInnerHTML={{ __html: googleConsentBootstrapScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <GlobalStyles />
        {children}
        <DeferredAnalyticsConsentManager />
      </body>
    </html>
  );
}
