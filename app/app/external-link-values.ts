export type ExternalLinkBadgeType = "image" | "text";

export type ExternalLinkRecord = {
  id: string;
  href: string;
  badgeType: ExternalLinkBadgeType;
  imageSrc: string | null;
  alt: string;
  height: number;
  createdAt: number;
};

export const TRUSTED_EXTERNAL_LINKS_HEADER = "x-aion2-footer-links";
export const TRUSTED_EXTERNAL_LINK_SCALE_HEADER = "x-aion2-footer-scale";
export const DEFAULT_EXTERNAL_LINK_SCALE_PERCENT = 70;
export const MIN_EXTERNAL_LINK_SCALE_PERCENT = 40;
export const MAX_EXTERNAL_LINK_SCALE_PERCENT = 100;
const MAX_SERVER_RENDERED_LINKS = 32;
const MAX_ENCODED_LINKS_LENGTH = 24_000;

export function isExternalLinkScalePercent(
  value: unknown,
): value is number {
  return (
    Number.isInteger(value) &&
    Number(value) >= MIN_EXTERNAL_LINK_SCALE_PERCENT &&
    Number(value) <= MAX_EXTERNAL_LINK_SCALE_PERCENT
  );
}

export function externalLinkScalePercentFromValue(value: unknown) {
  const parsed = Number(value);
  return isExternalLinkScalePercent(parsed)
    ? parsed
    : DEFAULT_EXTERNAL_LINK_SCALE_PERCENT;
}

export function decodeHtmlAttribute(value: string) {
  return value.replace(
    /&(?:amp|quot|apos|lt|gt|#(?:x[0-9a-f]+|\d+));/giu,
    (entity) => {
      const normalized = entity.toLowerCase();
      if (normalized === "&amp;") return "&";
      if (normalized === "&quot;") return '"';
      if (normalized === "&apos;") return "'";
      if (normalized === "&lt;") return "<";
      if (normalized === "&gt;") return ">";

      const numeric = normalized.slice(2, -1);
      const codePoint = numeric.startsWith("x")
        ? Number.parseInt(numeric.slice(1), 16)
        : Number.parseInt(numeric, 10);
      if (
        !Number.isInteger(codePoint) ||
        codePoint < 0 ||
        codePoint > 0x10ffff ||
        (codePoint >= 0xd800 && codePoint <= 0xdfff)
      ) {
        return entity;
      }
      return String.fromCodePoint(codePoint);
    },
  );
}

export function safeExternalHttpsUrl(value: string) {
  const decoded = decodeHtmlAttribute(value.trim());
  if (!decoded || decoded.length > 2_048) return null;
  try {
    const parsed = new URL(decoded);
    if (
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password ||
      !parsed.hostname
    ) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export function externalLinkRecordFromRow(
  row: Record<string, unknown>,
): ExternalLinkRecord | null {
  return externalLinkRecordFromValue({
    id: row.id,
    href: row.href,
    badgeType: row.badge_type,
    imageSrc: row.image_src,
    alt: row.alt,
    height: row.height,
    createdAt: row.created_at,
  });
}

function externalLinkRecordFromValue(
  value: Record<string, unknown>,
): ExternalLinkRecord | null {
  const href = safeExternalHttpsUrl(String(value.href ?? ""));
  const badgeType =
    value.badgeType === "text"
      ? "text"
      : value.badgeType === "image" || value.badgeType === undefined
        ? "image"
        : null;
  const imageSrc =
    badgeType === "image"
      ? safeExternalHttpsUrl(String(value.imageSrc ?? ""))
      : null;
  const alt = decodeHtmlAttribute(String(value.alt ?? ""))
    .trim()
    .replace(/\s+/gu, " ");
  const height = Number(value.height ?? 54);
  const id = String(value.id ?? "");
  const createdAt = Number(value.createdAt ?? 0);
  if (
    !href ||
    !badgeType ||
    (badgeType === "image" && !imageSrc) ||
    !id ||
    !alt ||
    [...alt].length > 120 ||
    !Number.isInteger(height) ||
    height < 20 ||
    height > 120 ||
    !Number.isSafeInteger(createdAt) ||
    createdAt < 1
  ) {
    return null;
  }
  return { id, href, badgeType, imageSrc, alt, height, createdAt };
}

export function encodeExternalLinkRecords(links: ExternalLinkRecord[]) {
  let encoded = "";
  const included: ExternalLinkRecord[] = [];
  for (const link of links.slice(0, MAX_SERVER_RENDERED_LINKS)) {
    const candidate = encodeURIComponent(
      JSON.stringify([...included, link]),
    );
    if (candidate.length > MAX_ENCODED_LINKS_LENGTH) break;
    included.push(link);
    encoded = candidate;
  }
  return encoded;
}

export function decodeExternalLinkRecords(value: string | null) {
  if (!value || value.length > MAX_ENCODED_LINKS_LENGTH) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .slice(0, MAX_SERVER_RENDERED_LINKS)
      .map((item) =>
        item && typeof item === "object" && !Array.isArray(item)
          ? externalLinkRecordFromValue(item as Record<string, unknown>)
          : null,
      )
      .filter(
        (link: ExternalLinkRecord | null): link is ExternalLinkRecord =>
          link !== null,
      );
  } catch {
    return [];
  }
}
