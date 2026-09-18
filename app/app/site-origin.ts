export const TRUSTED_SITE_ORIGIN_HEADER = "x-aion2-site-origin";

export function validateSiteOrigin(value: string | null | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}
