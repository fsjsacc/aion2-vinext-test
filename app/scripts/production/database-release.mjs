#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  createIndexableMapRouteRegistry,
  isMapPoiPublicationIndexable,
  mapSeoPublication,
  serializeMapSeoPublicationPolicy,
} from "../../app/map-seo-publication.ts";

export const projectRoot = path.resolve(import.meta.dirname, "../..");

const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const DATABASE_LOCALES = ["zh-Hant", "en", "ko"];
const ROUTE_LOCALE = { "zh-Hant": "zh-hant", en: "en", ko: "ko" };
const SOURCE_SYSTEM = "tc-imba";
const SQL_BATCH_SIZE = 250;
const DATABASE_RELEASE_SCHEMA_VERSION = 1;

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function contentDigest(value) {
  return `sha256-${sha256(canonicalJson(value))}`;
}

function deterministicUuid(value) {
  const bytes = createHash("sha256").update(value).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function sqlText(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlNullableText(value) {
  return value === null || value === undefined || value === "" ? "null" : sqlText(value);
}

function sqlJson(value) {
  return `${sqlText(JSON.stringify(value))}::jsonb`;
}

function sqlNumber(value) {
  if (value === null || value === undefined) return "null";
  if (!Number.isFinite(value)) throw new Error(`Non-finite database number: ${value}`);
  return String(value);
}

function slugify(value) {
  const slug = String(value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .slice(0, 72)
    .replace(/-+$/gu, "");
  return slug || "poi";
}

function normalizedAlias(value) {
  return String(value).normalize("NFKC").toLocaleLowerCase("en").replace(/\s+/gu, " ").trim();
}

function batches(values, size = SQL_BATCH_SIZE) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

function insertValues({ table, columns, rows, conflict = "", releaseId }) {
  if (rows.length === 0) return "";
  return batches(rows).map((batch) => {
    const values = batch.map((row) => `(${row.join(", ")})`).join(",\n    ");
    const aliases = columns.map((column) => `v.${column}`).join(", ");
    return `insert into ${table} (${columns.join(", ")})\nselect ${aliases}\nfrom (values\n    ${values}\n) as v (${columns.join(", ")})\nwhere exists (\n  select 1 from atlas.releases as release\n  where release.id = ${sqlText(releaseId)}::uuid\n    and release.status_code in ('draft', 'validating')\n)\n${conflict};`;
  }).join("\n\n");
}

function stableEntityUuid(kind, sourceId) {
  return UUID_PATTERN.test(sourceId)
    ? sourceId
    : deterministicUuid(`${kind}-entity:${sourceId}`);
}

function localizedText(i18n, locale, kind, key, fallback) {
  const candidate = i18n.locales?.[locale]?.[kind]?.[key];
  return {
    name: String(candidate?.name || fallback?.name || key),
    description: String(candidate?.description || fallback?.description || ""),
  };
}

function typeLabel(locale, typeSlug) {
  const labels = {
    "world-boss": { "zh-Hant": "世界首領", en: "World Boss", ko: "월드 보스" },
  };
  return labels[typeSlug]?.[locale] ?? typeSlug.replaceAll("-", " ");
}

export async function createDatabaseReleaseSnapshot({ root = projectRoot } = {}) {
  const [manifestBytes, sourceBytes, i18nBytes, seoBytes] = await Promise.all([
    readFile(path.join(root, "public/map-assets/manifest.json")),
    readFile(path.join(root, "data/map-source/aion2-map-data.json")),
    readFile(path.join(root, "data/map-source/aion2-map-i18n.json")),
    readFile(path.join(root, "app/map-seo-data.json")),
  ]);
  const manifest = JSON.parse(manifestBytes.toString("utf8"));
  const source = JSON.parse(sourceBytes.toString("utf8"));
  const i18n = JSON.parse(i18nBytes.toString("utf8"));
  const seo = JSON.parse(seoBytes.toString("utf8"));

  if (!VERSION_KEY_PATTERN.test(manifest.versionKey)) {
    throw new Error("Map manifest has an invalid versionKey.");
  }
  if (manifest.schemaVersion !== 3) {
    throw new Error("Map manifest has no publication-aware release identity.");
  }
  if (manifest.sourceBuild !== source.source?.build || manifest.sourceBuild !== i18n.source?.tcImbaBuild) {
    throw new Error("Manifest, map source, and localization source builds do not match.");
  }
  if (seo.source?.build !== manifest.sourceBuild) {
    throw new Error("SEO data does not match the map release source build.");
  }
  if (JSON.stringify(manifest.locales) !== JSON.stringify(DATABASE_LOCALES)) {
    throw new Error("Map manifest locales do not match the Atlas database locales.");
  }
  for (const [relativePath, bytes] of [
    ["data/aion2-map-data.json", sourceBytes],
    ["data/aion2-map-i18n.json", i18nBytes],
  ]) {
    const entry = manifest.files?.find((candidate) => candidate.path === relativePath);
    if (!entry || entry.bytes !== bytes.byteLength || entry.sha256 !== sha256(bytes)) {
      throw new Error(`Map manifest file integrity check failed: ${relativePath}.`);
    }
  }
  const publicationPolicyBytes = Buffer.from(serializeMapSeoPublicationPolicy(), "utf8");
  const publicationPolicyEntry = manifest.files?.find(
    (candidate) => candidate.path === "policy/map-seo-publication.json",
  );
  if (
    !publicationPolicyEntry ||
    publicationPolicyEntry.bytes !== publicationPolicyBytes.byteLength ||
    publicationPolicyEntry.sha256 !== sha256(publicationPolicyBytes) ||
    JSON.stringify(manifest.publicationPolicy) !== JSON.stringify(publicationPolicyEntry)
  ) {
    throw new Error("Map manifest publication policy digest is stale.");
  }

  const releaseId = deterministicUuid(`release:${manifest.versionKey}`);
  const curatedPois = new Map();
  for (const [mapSlug, pois] of Object.entries(seo.poisByMap ?? {})) {
    for (const poi of pois) {
      const key = `${mapSlug}:${poi.id}`;
      if (curatedPois.has(key)) throw new Error(`Duplicate generated SEO POI: ${key}.`);
      curatedPois.set(key, poi);
    }
  }
  const publicationPois = new Map();
  for (const publication of mapSeoPublication.pois) {
    const key = `${publication.mapSlug}:${publication.markerId}`;
    if (publicationPois.has(key)) throw new Error(`Duplicate publication POI: ${key}.`);
    publicationPois.set(key, publication);
    const projected = curatedPois.get(key);
    const expectedIndexable = isMapPoiPublicationIndexable(publication);
    if (
      !projected ||
      projected.slug !== publication.slug ||
      projected.typeSlug !== publication.typeSlug ||
      projected.indexable !== expectedIndexable
    ) {
      throw new Error(`Generated SEO POI is stale against the publication registry: ${key}.`);
    }
  }
  for (const key of curatedPois.keys()) {
    if (!publicationPois.has(key)) {
      throw new Error(`Generated SEO POI is not present in the publication registry: ${key}.`);
    }
  }
  const seoMapsBySlug = new Map(seo.maps.map((map) => [map.slug, map]));
  if (seoMapsBySlug.size !== seo.maps.length) throw new Error("Generated SEO maps contain duplicate slugs.");
  const indexableMapRoutes = createIndexableMapRouteRegistry(seo.maps);
  const subtypeCompletable = new Map();
  for (const category of source.categories ?? []) {
    for (const subtype of category.subtypes ?? []) {
      subtypeCompletable.set(subtype.name, Boolean(subtype.canComplete));
    }
  }

  const mapEntities = [];
  const mapSourceAliases = [];
  const poiEntities = [];
  const poiSourceAliases = [];
  const maps = [];
  const pois = [];
  const localizations = [];
  const aliases = [];
  const pageStates = [];
  const seenPoiIds = new Set();
  const mapRowsByName = new Map();

  for (const map of source.maps) {
    const mapEntityId = stableEntityUuid("map", map.id);
    const releaseMapId = deterministicUuid(`${manifest.versionKey}:map:${map.id}`);
    mapRowsByName.set(map.name, { source: map, id: releaseMapId, entityId: mapEntityId });
    mapEntities.push({
      id: mapEntityId,
      canonicalKey: map.name,
      canonicalSlug: map.slug,
      properties: { type: map.type },
    });
    mapSourceAliases.push({ sourceId: map.id, entityId: mapEntityId });
    maps.push({
      id: releaseMapId,
      entityId: mapEntityId,
      sourceId: map.id,
      mapKey: map.name,
      slug: map.slug,
      mapType: map.type,
      sortOrder: map.order,
      width: map.width,
      height: map.height,
      sourceWidth: map.sourceWidth,
      sourceHeight: map.sourceHeight,
      tileSize: map.tileSize,
      tileMinZoom: map.tileMinZoom,
      tileMaxZoom: map.tileMaxZoom,
      tileTemplate: `/maps/tiles/${map.slug}/{z}/{x}/{y}.webp`,
      markerCount: map.markerCount,
      regionCount: map.regionCount,
      properties: {
        scaleX: map.scaleX,
        scaleY: map.scaleY,
        tileWorldSize: map.tileWorldSize,
        assetVersionKey: manifest.versionKey,
      },
    });

    for (const locale of DATABASE_LOCALES) {
      const text = localizedText(i18n, locale, "maps", map.name, {
        name: map.displayName || map.localizedName,
        description: map.description,
      });
      localizations.push({ target: "map", targetId: releaseMapId, locale, ...text, properties: {} });
      aliases.push({ target: "map", targetId: releaseMapId, locale, alias: text.name });
    }
  }

  for (const map of source.maps) {
    const mapRow = mapRowsByName.get(map.name);
    const markers = source.markersByMap?.[map.name] ?? [];
    for (const marker of markers) {
      if (seenPoiIds.has(marker.id)) throw new Error(`Duplicate POI source ID: ${marker.id}`);
      seenPoiIds.add(marker.id);
      const poiEntityId = stableEntityUuid("poi", marker.id);
      const releasePoiId = deterministicUuid(`${manifest.versionKey}:poi:${marker.id}`);
      const curated = curatedPois.get(`${map.slug}:${marker.id}`);
      const english = localizedText(i18n, "en", "markers", marker.id, {
        name: marker.name || marker.subtypeLabel || marker.subtype,
        description: marker.description,
      });
      const canonicalSlug = curated?.slug ?? `${slugify(english.name || marker.subtype)}-${marker.id.slice(0, 8)}`;
      poiEntities.push({
        id: poiEntityId,
        mapEntityId: mapRow.entityId,
        canonicalKey: marker.id,
        canonicalSlug,
        properties: { category: marker.category, subtype: marker.subtype },
      });
      poiSourceAliases.push({ sourceId: marker.id, entityId: poiEntityId });
      pois.push({
        id: releasePoiId,
        mapId: mapRow.id,
        mapEntityId: mapRow.entityId,
        entityId: poiEntityId,
        sourceId: marker.id,
        categoryKey: marker.category,
        subtypeKey: marker.subtype,
        regionKey: marker.region || null,
        x: marker.x,
        y: marker.y,
        sourceX: marker.sourceX,
        sourceY: marker.sourceY,
        canComplete: subtypeCompletable.get(marker.subtype) ?? false,
        properties: {
          color: marker.color,
          icon: marker.icon,
          iconUrl: marker.iconUrl,
          darkIcon: marker.darkIcon,
          darkIconUrl: marker.darkIconUrl,
          iconScale: marker.iconScale,
          images: marker.images ?? [],
          indexable: Boolean(curated?.indexable),
          typeSlug: curated?.typeSlug ?? null,
        },
      });
      for (const locale of DATABASE_LOCALES) {
        const subtypeFallback = i18n.locales?.[locale]?.subtypes?.[marker.subtype] ?? marker.subtypeLabel ?? marker.subtype;
        const text = localizedText(i18n, locale, "markers", marker.id, {
          name: marker.name || subtypeFallback,
          description: marker.description,
        });
        localizations.push({
          target: "poi",
          targetId: releasePoiId,
          locale,
          ...text,
          properties: {
            categoryLabel: i18n.locales?.[locale]?.categories?.[marker.category] ?? marker.categoryLabel,
            subtypeLabel: subtypeFallback,
            regionLabel: marker.region
              ? i18n.locales?.[locale]?.regions?.[marker.region] ?? marker.region
              : null,
          },
        });
        aliases.push({ target: "poi", targetId: releasePoiId, locale, alias: text.name });
      }
    }
  }

  for (const route of indexableMapRoutes) {
    const map = seoMapsBySlug.get(route.mapSlug);
    if (!map) throw new Error(`Indexable route references an unknown SEO map: ${route.mapSlug}.`);
    const poi = route.kind === "poi"
      ? curatedPois.get(`${route.mapSlug}:${route.markerId}`)
      : undefined;
    if (route.kind === "poi" && !poi) {
      throw new Error(`Indexable route references an unknown SEO POI: ${route.mapSlug}:${route.markerId}.`);
    }

    for (const locale of DATABASE_LOCALES) {
      const routeLocale = ROUTE_LOCALE[locale];
      const routePath = `/${routeLocale}${route.suffix}`;
      let pageKey;
      let seoCopy;
      if (route.kind === "map") {
        const copy = map.locales[locale];
        pageKey = `map:${route.mapSlug}`;
        seoCopy = { title: copy.name, description: copy.description };
      } else if (route.kind === "type") {
        const label = typeLabel(locale, route.typeSlug);
        pageKey = `type:${route.mapSlug}:${route.typeSlug}`;
        seoCopy = { title: label, description: `${label} · ${route.mapSlug}` };
      } else {
        const copy = poi.locales[locale];
        pageKey = `poi:${route.mapSlug}:${route.markerId}`;
        seoCopy = { title: copy.name, description: copy.description };
      }
      pageStates.push({
        locale,
        pageKind: route.kind,
        pageKey,
        routePath,
        canonicalPath: routePath,
        seo: seoCopy,
      });
    }
  }

  const expectedPoiCount = Object.values(source.markersByMap).reduce((total, markers) => total + markers.length, 0);
  if (maps.length !== manifest.stats.mapCount || pois.length !== manifest.stats.poiCount || pois.length !== expectedPoiCount) {
    throw new Error("Database release row counts do not match the map manifest.");
  }
  if (localizations.length !== (maps.length + pois.length) * DATABASE_LOCALES.length) {
    throw new Error("Database release localization rows are incomplete.");
  }

  const publicationDigest = contentDigest({
    schemaVersion: DATABASE_RELEASE_SCHEMA_VERSION,
    mapSeoPublication,
    seo,
    indexableMapRoutes,
  });
  const databaseSnapshotDigest = contentDigest({
    schemaVersion: DATABASE_RELEASE_SCHEMA_VERSION,
    assetVersionKey: manifest.versionKey,
    manifest: contentDigest(manifest),
    source: `sha256-${sha256(sourceBytes)}`,
    i18n: `sha256-${sha256(i18nBytes)}`,
    publicationDigest,
    pageStates,
  });
  const releaseStats = {
    ...manifest.stats,
    database: {
      schemaVersion: DATABASE_RELEASE_SCHEMA_VERSION,
      publicationDigest,
      snapshotDigest: databaseSnapshotDigest,
      pageStateCount: pageStates.length,
    },
  };

  return {
    schemaVersion: DATABASE_RELEASE_SCHEMA_VERSION,
    versionKey: manifest.versionKey,
    releaseId,
    sourceBuild: manifest.sourceBuild,
    manifest,
    manifestSha256: sha256(manifestBytes),
    stats: manifest.stats,
    releaseStats,
    publicationDigest,
    databaseSnapshotDigest,
    indexableMapRoutes,
    mapEntities,
    mapSourceAliases,
    poiEntities,
    poiSourceAliases,
    maps,
    pois,
    localizations,
    aliases,
    pageStates,
    counts: {
      maps: maps.length,
      pois: pois.length,
      localizations: localizations.length,
      aliases: aliases.length,
      pageStates: pageStates.length,
    },
  };
}

export function renderDatabaseReleaseSql(snapshot) {
  const releaseId = snapshot.releaseId;
  const mapEntityRows = snapshot.mapEntities.map((row) => [
    `${sqlText(row.id)}::uuid`, sqlText(row.canonicalKey), sqlText(row.canonicalSlug),
    `${sqlText(releaseId)}::uuid`, `${sqlText(releaseId)}::uuid`, sqlJson(row.properties),
  ]);
  const mapSourceAliasRows = snapshot.mapSourceAliases.map((row) => [
    sqlText(SOURCE_SYSTEM), sqlText(row.sourceId), `${sqlText(row.entityId)}::uuid`, "'{}'::jsonb",
  ]);
  const poiEntityRows = snapshot.poiEntities.map((row) => [
    `${sqlText(row.id)}::uuid`, `${sqlText(row.mapEntityId)}::uuid`, sqlText(row.canonicalKey),
    sqlText(row.canonicalSlug), `${sqlText(releaseId)}::uuid`, `${sqlText(releaseId)}::uuid`, sqlJson(row.properties),
  ]);
  const poiSourceAliasRows = snapshot.poiSourceAliases.map((row) => [
    sqlText(SOURCE_SYSTEM), sqlText(row.sourceId), `${sqlText(row.entityId)}::uuid`, "'{}'::jsonb",
  ]);
  const mapRows = snapshot.maps.map((row) => [
    `${sqlText(row.id)}::uuid`, `${sqlText(releaseId)}::uuid`, `${sqlText(row.entityId)}::uuid`,
    sqlText(SOURCE_SYSTEM), sqlText(row.sourceId), sqlText(row.mapKey), sqlText(row.slug), sqlText(row.mapType),
    sqlNumber(row.sortOrder), sqlNumber(row.width), sqlNumber(row.height), sqlNumber(row.sourceWidth),
    sqlNumber(row.sourceHeight), sqlNumber(row.tileSize), sqlNumber(row.tileMinZoom), sqlNumber(row.tileMaxZoom),
    sqlText(row.tileTemplate), sqlNumber(row.markerCount), sqlNumber(row.regionCount), sqlJson(row.properties),
  ]);
  const poiRows = snapshot.pois.map((row) => [
    `${sqlText(row.id)}::uuid`, `${sqlText(releaseId)}::uuid`, `${sqlText(row.mapId)}::uuid`,
    `${sqlText(row.mapEntityId)}::uuid`, `${sqlText(row.entityId)}::uuid`, sqlText(SOURCE_SYSTEM),
    sqlText(row.sourceId), sqlText(row.categoryKey), sqlText(row.subtypeKey), sqlNullableText(row.regionKey),
    sqlNumber(row.x), sqlNumber(row.y), sqlNumber(row.sourceX), sqlNumber(row.sourceY),
    row.canComplete ? "true" : "false", sqlJson(row.properties),
  ]);
  const localizationRows = snapshot.localizations.map((row) => [
    `${sqlText(releaseId)}::uuid`,
    row.target === "map" ? `${sqlText(row.targetId)}::uuid` : "null",
    row.target === "poi" ? `${sqlText(row.targetId)}::uuid` : "null",
    sqlText(row.locale), sqlText(row.name), sqlText(row.description), sqlJson(row.properties),
  ]);
  const aliasRows = snapshot.aliases.map((row) => [
    `${sqlText(releaseId)}::uuid`,
    row.target === "map" ? `${sqlText(row.targetId)}::uuid` : "null",
    row.target === "poi" ? `${sqlText(row.targetId)}::uuid` : "null",
    sqlText(row.locale), sqlText(row.alias), sqlText(normalizedAlias(row.alias)),
  ]);
  const pageStateRows = snapshot.pageStates.map((row) => [
    sqlText("stable"), `${sqlText(releaseId)}::uuid`, sqlText(row.locale), sqlText(row.pageKind),
    sqlText(row.pageKey), sqlText("published"), sqlText(row.routePath), sqlText(row.canonicalPath), sqlJson(row.seo),
  ]);

  const statements = [
    "\\set ON_ERROR_STOP on",
    "begin;",
    "set local lock_timeout = '15s';",
    "set local statement_timeout = '15min';",
    `insert into atlas.releases (id, version_key, source_build, status_code, manifest, stats)\nvalues (${sqlText(releaseId)}::uuid, ${sqlText(snapshot.versionKey)}, ${sqlText(snapshot.sourceBuild)}, 'validating', ${sqlJson(snapshot.manifest)}, ${sqlJson(snapshot.releaseStats)})\non conflict (version_key) do nothing;`,
    `do $atlas_release$\ndeclare\n  existing_id uuid;\n  existing_status text;\n  existing_publication_digest text;\n  existing_snapshot_digest text;\nbegin\n  select id, status_code, stats #>> '{database,publicationDigest}', stats #>> '{database,snapshotDigest}'\n    into existing_id, existing_status, existing_publication_digest, existing_snapshot_digest\n  from atlas.releases\n  where version_key = ${sqlText(snapshot.versionKey)}\n  for update;\n  if not found then raise exception 'Atlas release insert did not produce the requested version'; end if;\n  if existing_id is distinct from ${sqlText(releaseId)}::uuid\n    or existing_publication_digest is distinct from ${sqlText(snapshot.publicationDigest)}\n    or existing_snapshot_digest is distinct from ${sqlText(snapshot.databaseSnapshotDigest)} then\n    raise exception 'Atlas release identity drift for version %', ${sqlText(snapshot.versionKey)};\n  end if;\n  if existing_status not in ('draft', 'validating', 'published', 'superseded') then\n    raise exception 'Atlas release % cannot be imported from status %', ${sqlText(snapshot.versionKey)}, existing_status;\n  end if;\nend;\n$atlas_release$;`,
    `delete from atlas.page_states\nwhere release_id = ${sqlText(releaseId)}::uuid\n  and exists (select 1 from atlas.releases where id = ${sqlText(releaseId)}::uuid and status_code in ('draft', 'validating'));`,
    `delete from atlas.revisions\nwhere release_id = ${sqlText(releaseId)}::uuid\n  and exists (select 1 from atlas.releases where id = ${sqlText(releaseId)}::uuid and status_code in ('draft', 'validating'));`,
    `delete from atlas.maps\nwhere release_id = ${sqlText(releaseId)}::uuid\n  and exists (select 1 from atlas.releases where id = ${sqlText(releaseId)}::uuid and status_code in ('draft', 'validating'));`,
    insertValues({
      table: "atlas.map_entities",
      columns: ["id", "canonical_key", "canonical_slug", "first_seen_release_id", "last_seen_release_id", "properties"],
      rows: mapEntityRows,
      conflict: "on conflict (id) do update set canonical_key = excluded.canonical_key, canonical_slug = excluded.canonical_slug, last_seen_release_id = excluded.last_seen_release_id, lifecycle_code = 'active', properties = excluded.properties",
      releaseId,
    }),
    insertValues({
      table: "atlas.map_source_aliases",
      columns: ["source_system", "source_id", "map_entity_id", "properties"],
      rows: mapSourceAliasRows,
      conflict: "on conflict (source_system, source_id) do update set map_entity_id = excluded.map_entity_id, properties = excluded.properties",
      releaseId,
    }),
    insertValues({
      table: "atlas.poi_entities",
      columns: ["id", "map_entity_id", "canonical_key", "canonical_slug", "first_seen_release_id", "last_seen_release_id", "properties"],
      rows: poiEntityRows,
      conflict: "on conflict (id) do update set canonical_slug = excluded.canonical_slug, last_seen_release_id = excluded.last_seen_release_id, lifecycle_code = 'active', properties = excluded.properties",
      releaseId,
    }),
    insertValues({
      table: "atlas.poi_source_aliases",
      columns: ["source_system", "source_id", "poi_entity_id", "properties"],
      rows: poiSourceAliasRows,
      conflict: "on conflict (source_system, source_id) do update set poi_entity_id = excluded.poi_entity_id, properties = excluded.properties",
      releaseId,
    }),
    insertValues({
      table: "atlas.maps",
      columns: ["id", "release_id", "entity_id", "source_system", "source_id", "map_key", "slug", "map_type", "sort_order", "width", "height", "source_width", "source_height", "tile_size", "tile_min_zoom", "tile_max_zoom", "tile_template", "marker_count", "region_count", "properties"],
      rows: mapRows,
      conflict: "on conflict (release_id, map_key) do nothing",
      releaseId,
    }),
    insertValues({
      table: "atlas.pois",
      columns: ["id", "release_id", "map_id", "map_entity_id", "entity_id", "source_system", "source_id", "category_key", "subtype_key", "region_key", "x", "y", "source_x", "source_y", "can_complete", "properties"],
      rows: poiRows,
      conflict: "on conflict (release_id, source_system, source_id) do nothing",
      releaseId,
    }),
    insertValues({
      table: "atlas.localizations",
      columns: ["release_id", "map_id", "poi_id", "locale", "name", "description", "properties"],
      rows: localizationRows,
      conflict: "on conflict do nothing",
      releaseId,
    }),
    insertValues({
      table: "atlas.aliases",
      columns: ["release_id", "map_id", "poi_id", "locale", "alias", "normalized_alias"],
      rows: aliasRows,
      conflict: "on conflict do nothing",
      releaseId,
    }),
    insertValues({
      table: "atlas.page_states",
      columns: ["channel_code", "release_id", "locale", "page_kind", "page_key", "status_code", "route_path", "canonical_path", "seo"],
      rows: pageStateRows,
      conflict: "on conflict (channel_code, release_id, locale, page_key) do nothing",
      releaseId,
    }),
    `insert into atlas.revisions (release_id, entity_kind, entity_key, revision_number, document, document_sha256, change_summary)\nselect ${sqlText(releaseId)}::uuid, 'release', ${sqlText(snapshot.versionKey)}, 1, ${sqlJson(snapshot.manifest)}, ${sqlText(snapshot.manifestSha256)}, 'Deterministic map release import'\nwhere exists (\n  select 1 from atlas.releases\n  where id = ${sqlText(releaseId)}::uuid and status_code in ('draft', 'validating')\n)\non conflict (release_id, entity_kind, entity_key, revision_number) do nothing;`,
    `do $$\ndeclare\n  actual_maps integer;\n  actual_pois integer;\n  actual_localizations integer;\n  actual_aliases integer;\n  actual_page_states integer;\nbegin\n  select count(*) into actual_maps from atlas.maps where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_pois from atlas.pois where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_localizations from atlas.localizations where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_aliases from atlas.aliases where release_id = ${sqlText(releaseId)}::uuid;\n  select count(*) into actual_page_states from atlas.page_states where release_id = ${sqlText(releaseId)}::uuid;\n  if actual_maps <> ${snapshot.counts.maps}\n    or actual_pois <> ${snapshot.counts.pois}\n    or actual_localizations <> ${snapshot.counts.localizations}\n    or actual_aliases <> ${snapshot.counts.aliases}\n    or actual_page_states <> ${snapshot.counts.pageStates} then\n    raise exception 'Atlas release count mismatch: maps %, pois %, localizations %, aliases %, page_states %',\n      actual_maps, actual_pois, actual_localizations, actual_aliases, actual_page_states;\n  end if;\nend;\n$$;`,
    `select atlas.publish_release(\n  ${sqlText(snapshot.versionKey)},\n  ${sqlText(snapshot.databaseSnapshotDigest)},\n  ${snapshot.counts.maps},\n  ${snapshot.counts.pois},\n  ${snapshot.counts.localizations},\n  ${snapshot.counts.aliases},\n  ${snapshot.counts.pageStates}\n);`,
    "commit;",
    `select json_build_object(\n  'versionKey', version_key,\n  'status', status_code,\n  'mapCount', (select count(*) from atlas.maps where release_id = releases.id),\n  'poiCount', (select count(*) from atlas.pois where release_id = releases.id),\n  'localizationCount', (select count(*) from atlas.localizations where release_id = releases.id),\n  'pageStateCount', (select count(*) from atlas.page_states where release_id = releases.id)\n)::text\nfrom atlas.releases as releases\nwhere id = ${sqlText(releaseId)}::uuid;`,
  ].filter(Boolean);
  return `${statements.join("\n\n")}\n`;
}

function argumentValue(argv, name) {
  const index = argv.indexOf(name);
  if (index === -1) return undefined;
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value.`);
  return value;
}

function missingPostgresVariables() {
  return ["PGHOST", "PGDATABASE", "PGUSER", "PGPASSWORD"].filter((name) => !process.env[name]);
}

async function main() {
  const argv = process.argv.slice(2);
  const apply = argv.includes("--apply");
  const output = argumentValue(argv, "--output");
  const confirmVersion = argumentValue(argv, "--confirm-version");
  const snapshot = await createDatabaseReleaseSnapshot();
  const sql = renderDatabaseReleaseSql(snapshot);

  if (output) {
    const outputPath = path.resolve(output);
    await mkdir(path.dirname(outputPath), { recursive: true });
    const temporaryPath = `${outputPath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, sql, "utf8");
    await rename(temporaryPath, outputPath);
  }

  if (!apply) {
    console.log(JSON.stringify({
      mode: "dry-run",
      versionKey: snapshot.versionKey,
      releaseId: snapshot.releaseId,
      publicationDigest: snapshot.publicationDigest,
      databaseSnapshotDigest: snapshot.databaseSnapshotDigest,
      counts: snapshot.counts,
      sqlBytes: Buffer.byteLength(sql),
      output: output ? path.resolve(output) : null,
      note: "No database connection was opened. Use --apply with --confirm-version after protected PostgreSQL variables are configured.",
    }, null, 2));
    return;
  }
  if (confirmVersion !== snapshot.versionKey) {
    throw new Error("--apply requires --confirm-version to exactly match the generated versionKey.");
  }
  const missing = missingPostgresVariables();
  if (missing.length > 0) throw new Error(`Missing PostgreSQL environment variables: ${missing.join(", ")}.`);
  const result = spawnSync(
    "psql",
    ["--no-psqlrc", "--set", "ON_ERROR_STOP=1", "--no-align", "--tuples-only"],
    {
      input: sql,
      encoding: "utf8",
      env: { ...process.env, PGSSLMODE: process.env.PGSSLMODE ?? "require" },
      maxBuffer: 20 * 1024 * 1024,
      windowsHide: true,
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr?.trim() || "Atlas database release import failed.");
  process.stdout.write(result.stdout);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
