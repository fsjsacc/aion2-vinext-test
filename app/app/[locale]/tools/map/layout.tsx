import "./map-seo.css";
import "./map-app.css";
import { isLocaleSlug, localeConfig } from "@/app/map-seo";

export default async function MapLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocaleSlug(locale) ? localeConfig[locale].htmlLang : "en";
  return (
    <div className="map-seo-site" lang={lang}>
      <link rel="preload" href="/data/aion2-map-data.json" as="fetch" crossOrigin="anonymous" />
      <link rel="preload" href="/data/aion2-map-i18n.json" as="fetch" crossOrigin="anonymous" />
      {children}
    </div>
  );
}
