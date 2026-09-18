import { headers } from "next/headers";

import { NotFoundRedirect } from "@/app/_components/site/NotFoundRedirect";
import { isSiteLocale, localizedHref } from "@/app/site-config";

export default async function LocalizedNotFound() {
  const locale = (await headers()).get("x-aion2-locale");
  return (
    <NotFoundRedirect
      href={localizedHref(isSiteLocale(locale) ? locale : "en")}
    />
  );
}
