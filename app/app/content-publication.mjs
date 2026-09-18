const CONTENT_LOCALES = [
  "zh-hans",
  "en",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
  "ko",
  "zh-hant",
];
const PUBLICATION_STATUSES = new Set(["draft", "review", "published"]);
const LOCALE_REVIEW_STATUSES = new Set(["pending", "review", "approved"]);
const SOURCE_REVIEW_STATUSES = new Set(["unverified", "first-party", "verified"]);
const SOURCE_KINDS = new Set(["official", "platform", "third-party"]);
const IMAGE_RIGHTS = new Set([
  "linked-official-media",
  "linked-third-party-media",
  "original",
]);
const RELATION_KINDS = new Set(["content", "map", "type", "poi", "tool"]);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const OFFICIAL_SOURCE_DOMAINS = ["ncsoft.com", "ncsoft.jp", "plaync.com"];

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validDate(value) {
  if (!nonEmpty(value) || !ISO_DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function hostMatches(hostname, domains) {
  const normalized = hostname.toLowerCase();
  return domains.some(
    (domain) => normalized === domain || normalized.endsWith(`.${domain}`),
  );
}

function relationIdentity(relation) {
  switch (relation?.kind) {
    case "content":
      return nonEmpty(relation.section) && nonEmpty(relation.slug)
        ? `${relation.section}/${relation.slug}`
        : null;
    case "map":
      return nonEmpty(relation.mapSlug) ? relation.mapSlug : null;
    case "type":
      return nonEmpty(relation.mapSlug) && nonEmpty(relation.typeSlug)
        ? `${relation.mapSlug}/${relation.typeSlug}`
        : null;
    case "poi":
      return nonEmpty(relation.mapSlug) && nonEmpty(relation.poiSlug)
        ? `${relation.mapSlug}/${relation.poiSlug}`
        : null;
    case "tool":
      return nonEmpty(relation.toolSlug) ? relation.toolSlug : null;
    default:
      return null;
  }
}

function relationTargetSets(targets) {
  return Object.fromEntries(
    ["map", "type", "poi", "tool"].map((kind) => [
      kind,
      new Set(
        (targets?.[kind] ?? []).filter(nonEmpty).map((identity) => identity.trim()),
      ),
    ]),
  );
}

function localizedSectionStructure(translation) {
  return translation.sections.map((section) => ({
    id: section?.id,
    table: section?.table === undefined
      ? null
      : {
          columns: Array.isArray(section.table?.headers)
            ? section.table.headers.length
            : "invalid",
          rowHeaders: Array.isArray(section.table?.rows)
            ? section.table.rows.map((row) => row?.header !== undefined)
            : "invalid",
        },
    faq: section?.faq === undefined
      ? null
      : Array.isArray(section.faq)
        ? section.faq.length
        : "invalid",
  }));
}

function validateLocalizedSectionBlocks(identity, locale, sections, issues) {
  for (const [sectionIndex, section] of sections.entries()) {
    const sectionLabel = nonEmpty(section?.id)
      ? `section ${section.id}`
      : `section ${sectionIndex + 1}`;
    const table = section?.table;

    if (table !== undefined) {
      if (!table || typeof table !== "object" || Array.isArray(table)) {
        issues.push(`${identity} ${locale} ${sectionLabel} has an invalid table.`);
      } else {
        const headers = table.headers;
        const rows = table.rows;
        if (!nonEmpty(table.caption)) {
          issues.push(`${identity} ${locale} ${sectionLabel} table needs a caption.`);
        }
        if (
          !Array.isArray(headers) ||
          headers.length === 0 ||
          headers.some((header) => !nonEmpty(header))
        ) {
          issues.push(`${identity} ${locale} ${sectionLabel} table needs non-empty headers.`);
        }
        if (!Array.isArray(rows) || rows.length === 0) {
          issues.push(`${identity} ${locale} ${sectionLabel} table needs at least one row.`);
        } else {
          for (const [rowIndex, row] of rows.entries()) {
            if (!row || typeof row !== "object" || Array.isArray(row)) {
              issues.push(
                `${identity} ${locale} ${sectionLabel} table row ${rowIndex + 1} is invalid.`,
              );
              continue;
            }
            const hasRowHeader = row.header !== undefined;
            if (hasRowHeader && !nonEmpty(row.header)) {
              issues.push(
                `${identity} ${locale} ${sectionLabel} table row ${rowIndex + 1} has an empty row header.`,
              );
            }
            if (
              !Array.isArray(row.cells) ||
              row.cells.some((cell) => !nonEmpty(cell))
            ) {
              issues.push(
                `${identity} ${locale} ${sectionLabel} table row ${rowIndex + 1} needs non-empty cells.`,
              );
            }
            if (Array.isArray(headers) && Array.isArray(row.cells)) {
              const actualColumns = row.cells.length + (hasRowHeader ? 1 : 0);
              if (actualColumns !== headers.length) {
                issues.push(
                  `${identity} ${locale} ${sectionLabel} table row ${rowIndex + 1} has ${actualColumns} columns; expected ${headers.length}.`,
                );
              }
            }
          }
        }
      }
    }

    const faq = section?.faq;
    if (faq !== undefined) {
      if (!Array.isArray(faq) || faq.length === 0) {
        issues.push(`${identity} ${locale} ${sectionLabel} FAQ must not be empty.`);
      } else {
        for (const [faqIndex, item] of faq.entries()) {
          if (!nonEmpty(item?.question) || !nonEmpty(item?.answer)) {
            issues.push(
              `${identity} ${locale} ${sectionLabel} FAQ item ${faqIndex + 1} needs a non-empty question and answer.`,
            );
          }
        }
      }
    }
  }
}

/**
 * Only entries that have passed the complete editorial gate may be exposed to
 * hubs, search, static params, or sitemaps.
 */
export function isPublishedIndexableContent(entry) {
  return Boolean(
    entry?.publication?.status === "published" &&
      entry.publication.indexable === true &&
      CONTENT_LOCALES.every(
        (locale) => entry.publication.localeReview?.[locale] === "approved",
      ) &&
      (entry.publication.sourceReview === "first-party" ||
        entry.publication.sourceReview === "verified"),
  );
}

export function validateContentRegistry(
  entries,
  relationTargets,
  { asOfDate } = {},
) {
  const issues = [];
  const identities = new Map();
  const publicTargets = relationTargetSets(relationTargets);
  const hasValidAsOfDate = asOfDate === undefined || validDate(asOfDate);

  if (!hasValidAsOfDate) {
    issues.push("Content validation as-of date must use YYYY-MM-DD.");
  }

  for (const entry of entries ?? []) {
    const identity = `${entry?.section ?? "unknown"}/${entry?.slug ?? "unknown"}`;
    const localizedStructures = new Map();
    if (identities.has(identity)) {
      issues.push(`Duplicate content identity: ${identity}`);
    } else {
      identities.set(identity, entry);
    }

    const publication = entry?.publication;
    if (!publication || !PUBLICATION_STATUSES.has(publication.status)) {
      issues.push(`${identity} has an invalid publication status.`);
      continue;
    }
    if (
      entry?.properties !== undefined &&
      (
        entry.properties === null ||
        typeof entry.properties !== "object" ||
        Array.isArray(entry.properties)
      )
    ) {
      issues.push(`${identity} properties must be a JSON object.`);
    }
    const localizedValidationLocales = [
      ...CONTENT_LOCALES,
      ...Object.entries(publication?.localeReview ?? {})
        .filter(
          ([locale, review]) =>
            !CONTENT_LOCALES.includes(locale) && review === "approved",
        )
        .map(([locale]) => locale),
    ];
    if (typeof publication.indexable !== "boolean") {
      issues.push(`${identity} must declare publication.indexable.`);
    }
    if (!SOURCE_REVIEW_STATUSES.has(publication.sourceReview)) {
      issues.push(`${identity} has an invalid source review status.`);
    }

    const publishedAtValid = validDate(entry?.publishedAt);
    const updatedAtValid = validDate(entry?.updatedAt);
    if (!publishedAtValid || !updatedAtValid) {
      issues.push(`${identity} must record valid publication and update dates.`);
    } else {
      if (entry.updatedAt < entry.publishedAt) {
        issues.push(`${identity} cannot be updated before it is published.`);
      }
      if (
        asOfDate !== undefined &&
        hasValidAsOfDate &&
        publication.status === "published" &&
        publication.indexable === true &&
        (entry.publishedAt > asOfDate || entry.updatedAt > asOfDate)
      ) {
        issues.push(`${identity} cannot publish an indexable future-dated record.`);
      }
    }

    for (const locale of localizedValidationLocales) {
      const review = publication.localeReview?.[locale];
      if (!LOCALE_REVIEW_STATUSES.has(review)) {
        issues.push(`${identity} has no valid ${locale} review status.`);
      }
      const translation = entry?.translations?.[locale];
      if (
        !translation ||
        !nonEmpty(translation.title) ||
        !nonEmpty(translation.description) ||
        !nonEmpty(translation.intro) ||
        !Array.isArray(translation.sections) ||
        translation.sections.length === 0
      ) {
        issues.push(`${identity} has incomplete ${locale} content.`);
      }
      if (
        translation &&
        Array.isArray(translation.sections) &&
        translation.sections.length > 0
      ) {
        validateLocalizedSectionBlocks(
          identity,
          locale,
          translation.sections,
          issues,
        );
        localizedStructures.set(
          locale,
          localizedSectionStructure(translation),
        );
      }
    }

    if (localizedStructures.size === localizedValidationLocales.length) {
      const referenceStructure = JSON.stringify(
        localizedStructures.get(localizedValidationLocales[0]),
      );
      if (
        localizedValidationLocales.slice(1).some(
          (locale) =>
            JSON.stringify(localizedStructures.get(locale)) !==
            referenceStructure,
        )
      ) {
        issues.push(
          `${identity} must keep section ids, table columns and row-header structure, and FAQ counts aligned across all locales.`,
        );
      }
    }

    if (publication.status !== "published" && publication.indexable) {
      issues.push(`${identity} cannot be indexable before publication.`);
    }
    if (publication.status === "published" && publication.indexable) {
      for (const locale of localizedValidationLocales) {
        if (publication.localeReview?.[locale] !== "approved") {
          issues.push(`${identity} cannot be indexed before ${locale} approval.`);
        }
      }
      if (
        publication.sourceReview !== "first-party" &&
        publication.sourceReview !== "verified"
      ) {
        issues.push(`${identity} cannot be indexed with an unverified source.`);
      }
    }

    const sources = Array.isArray(entry?.sources) ? entry.sources : [];
    if (sources.length > 0 && publication.sourceReview !== "verified") {
      issues.push(`${identity} has external sources that are not verified.`);
    } else if (sources.length === 0 && publication.sourceReview === "verified") {
      issues.push(`${identity} declares verified sources without source records.`);
    }

    const sourceIds = new Set();
    for (const source of sources) {
      if (!nonEmpty(source?.id)) {
        issues.push(`${identity} has a source without an id.`);
      } else if (sourceIds.has(source.id)) {
        issues.push(`${identity} has duplicate source id ${source.id}.`);
      } else {
        sourceIds.add(source.id);
      }
      if (!SOURCE_KINDS.has(source?.kind)) {
        issues.push(`${identity} has an invalid source kind.`);
      }
      if (!nonEmpty(source?.publisher) || !nonEmpty(source?.label)) {
        issues.push(`${identity} has an incomplete source record.`);
      }
      const sourceUrl = httpsUrl(source?.url);
      if (!sourceUrl) {
        issues.push(`${identity} must use valid HTTPS source URLs.`);
      } else if (
        source.kind === "official" &&
        !hostMatches(sourceUrl.hostname, OFFICIAL_SOURCE_DOMAINS)
      ) {
        issues.push(`${identity} labels a non-NC domain as an official source.`);
      } else if (
        source.kind === "platform" &&
        !hostMatches(sourceUrl.hostname, ["steampowered.com"])
      ) {
        issues.push(`${identity} labels a non-Steam domain as a platform source.`);
      }
      if (source?.publishedAt !== undefined && !validDate(source.publishedAt)) {
        issues.push(`${identity} has an invalid source publication date.`);
      }
      if (!validDate(source?.retrievedAt) || !validDate(source?.verifiedAt)) {
        issues.push(`${identity} must record valid source retrieval and verification dates.`);
      } else {
        if (source.verifiedAt < source.retrievedAt) {
          issues.push(`${identity} cannot verify a source before retrieving it.`);
        }
        if (
          asOfDate !== undefined &&
          hasValidAsOfDate &&
          (source.retrievedAt > asOfDate || source.verifiedAt > asOfDate)
        ) {
          issues.push(`${identity} cannot use future source retrieval or verification dates.`);
        }
        if (
          validDate(source?.publishedAt) &&
          (source.publishedAt > source.retrievedAt ||
            (asOfDate !== undefined &&
              hasValidAsOfDate &&
              source.publishedAt > asOfDate))
        ) {
          issues.push(`${identity} cannot use a future source publication date.`);
        }
      }
      for (const [locale, localization] of Object.entries(
        source?.localizations ?? {},
      )) {
        const localizedUrl = httpsUrl(localization?.url);
        if (!nonEmpty(localization?.label) || !localizedUrl) {
          issues.push(
            `${identity} has an incomplete ${locale} source localization.`,
          );
        } else if (
          source.kind === "official" &&
          !hostMatches(localizedUrl.hostname, OFFICIAL_SOURCE_DOMAINS)
        ) {
          issues.push(
            `${identity} labels a non-NC ${locale} source as official.`,
          );
        } else if (
          source.kind === "platform" &&
          !hostMatches(localizedUrl.hostname, ["steampowered.com"])
        ) {
          issues.push(
            `${identity} labels a non-Steam ${locale} source as a platform source.`,
          );
        }
      }
    }

    const primaryAction = entry?.primaryAction;
    if (primaryAction !== undefined) {
      const actionUrl = httpsUrl(primaryAction?.href);
      const actionSource = sources.find((source) => source.id === primaryAction?.sourceId);
      if (!nonEmpty(primaryAction?.id)) {
        issues.push(`${identity} has a primary action without an id.`);
      }
      if (!actionUrl) {
        issues.push(`${identity} must use a valid HTTPS primary-action URL.`);
      }
      if (!nonEmpty(primaryAction?.sourceId) || !actionSource) {
        issues.push(`${identity} primary action must reference one of its verified sources.`);
      } else if (actionUrl && actionUrl.href !== httpsUrl(actionSource.url)?.href) {
        issues.push(`${identity} primary action must use its referenced source URL.`);
      }
      for (const [locale, href] of Object.entries(primaryAction?.hrefs ?? {})) {
        const localizedActionUrl = httpsUrl(href);
        const localizedSourceUrl = httpsUrl(
          actionSource?.localizations?.[locale]?.url,
        );
        if (!localizedActionUrl) {
          issues.push(
            `${identity} has an invalid ${locale} primary-action URL.`,
          );
        } else if (
          !localizedSourceUrl ||
          localizedActionUrl.href !== localizedSourceUrl.href
        ) {
          issues.push(
            `${identity} ${locale} primary action must use its localized source URL.`,
          );
        }
      }
      for (const locale of localizedValidationLocales) {
        const actionCopy = primaryAction?.translations?.[locale];
        if (
          !nonEmpty(actionCopy?.eyebrow) ||
          !nonEmpty(actionCopy?.title) ||
          !nonEmpty(actionCopy?.description) ||
          !nonEmpty(actionCopy?.label) ||
          !nonEmpty(actionCopy?.note) ||
          !Array.isArray(actionCopy?.facts) ||
          actionCopy.facts.length === 0 ||
          actionCopy.facts.some(
            (fact) => !nonEmpty(fact?.label) || !nonEmpty(fact?.value),
          )
        ) {
          issues.push(`${identity} has incomplete ${locale} primary-action copy.`);
        }
      }
    }

    const heroImage = entry?.heroImage;
    if (heroImage) {
      const localImage = nonEmpty(heroImage.src) && heroImage.src.startsWith("/");
      if (!localImage && !httpsUrl(heroImage.src)) {
        issues.push(`${identity} has an invalid hero image URL.`);
      }
      if (!Number.isInteger(heroImage.width) || heroImage.width <= 0 ||
          !Number.isInteger(heroImage.height) || heroImage.height <= 0) {
        issues.push(`${identity} must declare positive hero image dimensions.`);
      }
      if (!nonEmpty(heroImage.credit) || !httpsUrl(heroImage.sourceUrl)) {
        issues.push(`${identity} has incomplete hero image attribution.`);
      }
      if (!IMAGE_RIGHTS.has(heroImage.rights)) {
        issues.push(`${identity} has an invalid hero image rights label.`);
      }
      const imageSource = httpsUrl(heroImage.sourceUrl);
      if (
        heroImage.rights === "linked-official-media" &&
        imageSource &&
        !hostMatches(imageSource.hostname, OFFICIAL_SOURCE_DOMAINS)
      ) {
        issues.push(`${identity} labels a non-NC image as linked official media.`);
      }
      for (const locale of localizedValidationLocales) {
        const imageCopy = heroImage.translations?.[locale];
        if (!nonEmpty(imageCopy?.alt) || !nonEmpty(imageCopy?.caption)) {
          issues.push(`${identity} has incomplete ${locale} hero image copy.`);
        }
      }
    } else if (
      publication.status === "published" &&
      publication.indexable === true &&
      publication.sourceReview === "verified"
    ) {
      issues.push(`${identity} must include an attributed hero image.`);
    }

    for (const relation of entry?.related ?? []) {
      if (!RELATION_KINDS.has(relation?.kind)) {
        issues.push(`${identity} has an invalid related-content kind.`);
        continue;
      }
      if (!relationIdentity(relation)) {
        issues.push(`${identity} has an incomplete ${relation.kind} relation.`);
      }
    }
  }

  for (const entry of entries ?? []) {
    const identity = `${entry?.section ?? "unknown"}/${entry?.slug ?? "unknown"}`;
    if (entry?.publication?.status !== "published") continue;
    for (const relation of entry.related ?? []) {
      const targetIdentity = relationIdentity(relation);
      if (!targetIdentity) continue;
      if (relation.kind === "content") {
        const target = identities.get(targetIdentity);
        if (!target || !isPublishedIndexableContent(target)) {
          issues.push(`${identity} links to unpublished content ${targetIdentity}.`);
        }
        continue;
      }
      if (!publicTargets[relation.kind]?.has(targetIdentity)) {
        issues.push(
          `${identity} links to an unavailable ${relation.kind} target ${targetIdentity}.`,
        );
      }
    }
  }

  return [...new Set(issues)];
}

export function assertContentRegistryValid(entries, relationTargets, options) {
  const issues = validateContentRegistry(entries, relationTargets, options);
  if (issues.length > 0) {
    throw new Error(`Content publication validation failed:\n- ${issues.join("\n- ")}`);
  }
}
