"use client";

import type { CSSProperties } from "react";

import { trackEvent } from "@/app/analytics";
import type { ExternalLinkRecord } from "@/app/external-link-values";
import type { SiteLocale } from "@/app/site-config";

const label = {
  "zh-hans": "合作伙伴",
  fr: "Partenaires",
  de: "Partner",
  es: "Socios",
  ja: "パートナー",
  "pt-br": "Parceiros",
  ru: "Партнёры",
  "zh-hant": "合作夥伴",
  en: "Partners",
  ko: "파트너",
} satisfies Record<SiteLocale, string>;

export function FooterExternalLinks({
  links,
  locale,
  scalePercent,
}: {
  links: ExternalLinkRecord[];
  locale: SiteLocale;
  scalePercent: number;
}) {
  if (!links.length) return null;

  const renderLinks = (duplicate: boolean) =>
    links.map((link) => {
      const displayHeight = Math.round(
        link.height * (scalePercent / 100),
      );
      const displayWidth = Math.round(displayHeight * (250 / 54));
      const textScale = scalePercent / 100;

      return (
        <a
          className="site-shell-external-link"
          href={link.href}
          key={`${duplicate ? "duplicate" : "primary"}-${link.id}`}
          onClick={() => {
            let destination = "external";
            try {
              destination = new URL(link.href).hostname;
            } catch {
              // The server already validates URLs; keep a safe fallback.
            }
            trackEvent("footer_external_link_click", {
              destination,
              locale,
              position: "site-footer",
              surface: "site-footer",
            });
          }}
          rel="noopener noreferrer"
          tabIndex={duplicate ? -1 : undefined}
          target="_blank"
        >
          {link.badgeType === "text" ? (
            <span
              className="site-shell-external-link-text"
              style={{
                fontSize: Math.max(10, Math.round(12 * textScale)),
                height: displayHeight,
                paddingInline: Math.max(10, Math.round(16 * textScale)),
              }}
            >
              {link.alt}
            </span>
          ) : link.imageSrc ? (
            <>
              {/* Remote partner badges are intentionally rendered at their supplied URL. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={link.alt}
                height={displayHeight}
                loading="lazy"
                src={link.imageSrc}
                style={{ height: displayHeight, width: displayWidth }}
                width={displayWidth}
              />
            </>
          ) : null}
        </a>
      );
    });

  return (
    <section
      className="site-shell-external-links"
      aria-label={label[locale]}
      style={
        {
          "--external-links-duration": `${Math.max(
            24,
            links.length * 4,
          )}s`,
        } as CSSProperties
      }
    >
      <span className="site-shell-external-links-label">{label[locale]}</span>
      <div className="site-shell-external-links-list">
        <div className="site-shell-external-links-track">
          <div className="site-shell-external-links-group">
            {renderLinks(false)}
          </div>
          <div
            aria-hidden="true"
            className="site-shell-external-links-group site-shell-external-links-group--duplicate"
          >
            {renderLinks(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
