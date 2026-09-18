import { notFound } from "next/navigation";

import { SiteShell } from "@/app/_components/site/SiteShell";
import { getFooterExternalLinkConfiguration } from "@/app/footer-external-links";
import { isSiteLocale, siteLocales } from "@/app/site-config";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();
  const externalLinkConfiguration =
    await getFooterExternalLinkConfiguration();

  return (
    <SiteShell
      externalLinkScalePercent={externalLinkConfiguration.scalePercent}
      externalLinks={externalLinkConfiguration.links}
      locale={locale}
    >
      {children}
    </SiteShell>
  );
}
