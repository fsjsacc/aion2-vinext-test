import { headers } from "next/headers";

import {
  TRUSTED_SITE_ORIGIN_HEADER,
  validateSiteOrigin,
} from "./site-origin";

const configuredBuildSiteOrigin = validateSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
);

function internalSitePath(path: string) {
  const withoutLeadingSlashes = path.replace(/^\/+/, "");
  return withoutLeadingSlashes ? `/${withoutLeadingSlashes}` : "/";
}

export async function getRequestSiteOrigin() {
  const requestHeaders = await headers();
  return (
    validateSiteOrigin(requestHeaders.get(TRUSTED_SITE_ORIGIN_HEADER)) ??
    configuredBuildSiteOrigin
  );
}

export function absoluteSiteUrl(
  path: string,
  origin: string | null = configuredBuildSiteOrigin,
) {
  const internalPath = internalSitePath(path);
  const validatedOrigin = validateSiteOrigin(origin);
  return validatedOrigin
    ? new URL(internalPath, `${validatedOrigin}/`).toString()
    : internalPath;
}
