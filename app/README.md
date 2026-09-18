# AION2 KINA

AION2 KINA is a multilingual information hub, database, tools collection, and interactive map built with Vinext, React, and MapLibre.

**Production**: <https://www.aion2kina.com> — Dokploy (2.25.206.13) + CF 橙云 + Traefik  
**Session Guide**: [`AION2_KINA_SESSION_GUIDE.md`](AION2_KINA_SESSION_GUIDE.md) — current operations and maintenance  
**Site Analysis**: [`SITE_ANALYSIS.md`](SITE_ANALYSIS.md) — architecture and content inventory  
**Migration Guide**: `GUIDE/DOKPLOY_MIGRATION_GUIDE.md` — Dokploy deployment reference

## Product surface

- Ten localized routes under `/zh-hans/`, `/en/`, `/fr/`, `/de/`, `/es/`,
  `/ja/`, `/pt-br/`, `/ru/`, `/ko/`, and `/zh-hant/`.
- Independent hubs and detail routes for guides, classes, database content, tools, codes, news, and search.
- Interactive maps under `/{locale}/tools/map/`, with server-rendered map summaries, named POI pages, world-boss indexes, canonical URLs, and hreflang links.
- A mobile-first tool registry designed to accept more calculators and planners without creating indexable placeholder pages.
- Theme and race-entry transitions with reduced-motion support.

## Map release model

The source snapshot lives in `data/map-source/`. A deterministic release pipeline publishes only runtime-safe assets to `public/map-assets/`:

```bash
npm run map-data:check
npm run map-data:release
npm run test:map-bundles
```

The browser first requests `/map-runtime/manifest.json`, then one versioned bundle for the active language and map. The Worker proxies `/map-runtime/*` to the `MAP_ASSETS` R2 binding so it can apply short manifest caching and one-year immutable caching to versioned bundles, tiles, and icons. The first stable release is promoted and the temporary bootstrap route is retired.

Production builds remove the retired `dist/client/map-assets` bootstrap copy after vinext finishes. The authoritative source snapshot in `public/map-assets` is retained for validation and future R2 releases, while hosted runtime reads stay on the stable R2 pointer. Set `KEEP_LOCAL_MAP_ASSETS=1` only when testing a local production build without an R2 binding; normal `npm run dev` keeps using the source assets directly.

Raw source JSON, legacy sprites, and retired manifests are not public runtime routes.

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Quality gates:

```bash
npm run production:check
npm test
npm run lint
```

Before publishing a source-backed article, verify its live source pages and linked hero image with `npm run content:check-remote -- --section <section> --slug <slug>`. The checker follows HTTPS redirects, checks response types, and compares supported remote image dimensions with the registry declaration. Run without filters for a full registry audit; it is intentionally a release-time check rather than a network-dependent build gate.

`npm run lint` currently reports six intentional `no-img-element` warnings for
fixed-size server-rendered map previews and one source-linked home image; it
must report zero errors.

## SEO output

- `/sitemap.xml` is a Sitemap Index.
- `/sitemaps/{pages|content|maps}-{locale}.xml` separates indexable URLs by
  language and page class for all ten locales.
- Submit only `https://www.aion2kina.com/sitemap.xml` in Google Search Console; the
  index advertises all 30 language-and-page-class child sitemaps.
- Search and arbitrary map filter states are `noindex` or URL-fragment/local-storage state and never enter a sitemap.
- Editorial and map detail pages emit canonical, hreflang, breadcrumb, collection/article, and item-list structured data.

## Deployment (Dokploy)

The site runs on Dokploy (2.25.206.13) as a Docker Compose service behind Traefik, with Cloudflare orange cloud proxying.

```
用户 → CF 边缘 (橙云, A 2.25.206.13) → Traefik (:443) → nginx-proxy → app (wrangler + vinext)
```

### Update flow

```bash
# 1. Build locally
set KEEP_LOCAL_MAP_ASSETS=1
npx vinext build

# 2. Copy dist to Dokploy repo
xcopy /e /i /q dist .worktmp\aion2-dokploy-repo\app\dist\

# 3. Commit and push
cd .worktmp\aion2-dokploy-repo
git add -A && git commit -m "update: ..." && git push

# 4. Trigger Dokploy deployment (via API)
# compose.deploy → if queue stuck → compose.stop + compose.start
```

### Key files

| File | Purpose |
|------|---------|
| `docker-migration/dokploy-package/docker-compose.yml` | Compose config (Traefik labels) |
| `docker-migration/dokploy-package/app/Dockerfile` | Container image |
| `docker-migration/dokploy-package/app/entrypoint.sh` | Startup script (.dev.vars generation) |
| `.worktmp/aion2-dokploy-repo/` | GitHub deployment mirror (fsjsacc/aion2-dokploy) |

### Rollback

DNS rollback (seconds): change CF DNS www record from A `2.25.206.13` back to CNAME `<tunnel-id>.cfargotunnel.com` (proxied=true).

## Secrets

Do not commit, paste into documentation, or pass on command lines:

- Cloudflare API tokens
- R2/S3 access and secret keys
- Admin auth secrets (`ADMIN_AUTH_SECRET`, `ADMIN_PASSWORD_HASH`)
- Database passwords

Provision credentials through Dokploy API (environment variables). Run `npm run production:check` before every release; it scans tracked and untracked text files for common privileged credential patterns.

## Historical notes

- **Pre-Dokploy** (before 2026-09-16): hosted on db11 via Cloudflare tunnel, using vinext dev mode with miniflare-simulated D1. The `supabase/migrations/` directory has been removed; all data now uses local miniflare D1 (SQLite).
- **Item catalog Supabase fallback**: `worker/item-catalog-api.ts` retains optional `SUPABASE_URL`/`SUPABASE_PUBLISHABLE_KEY` env vars for the item catalog RPC fallback. When unconfigured, the system gracefully degrades to `app/item-catalog-bootstrap.json`.
