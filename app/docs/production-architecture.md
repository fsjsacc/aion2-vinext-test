# AION2 Atlas production architecture

## Intended production boundary

- The public site and interactive map use one HTTPS primary origin. Map pages stay under `/{locale}/tools/map/` and runtime assets stay under `/map-runtime/`.
- Supabase PostgreSQL schema `atlas` is the single catalog and release source of truth. Public reads resolve only through the active `stable` channel.
- R2 stores immutable tile/icon objects under `releases/<versionKey>/maps/` and `releases/<versionKey>/icons/`. Runtime bundles keep their manifest-declared keys under `bundles/<versionKey>/...`; they are not nested under a second release prefix. `channels/stable.json` is the only mutable asset pointer.
- A site deployment, an R2 release, and an `atlas.releases.version_key` are promoted together. Previous objects are retained for rollback.

## Repository state

- The map release has content-addressed `versionKey` values and 30 map/locale runtime bundles. Manifest schema 3 includes a source-only SHA-256 descriptor of the normalized map publication policy, so an editorial indexability change creates a new coordinated asset/database version even when tiles and source POIs are unchanged.
- The PostgreSQL catalog, immutable published releases, RLS policies, and stable/preview channels are declared in Supabase migrations.
- `202607140004_atlas_content_publication.sql` adds an independent, content-addressed editorial release stream with normalized entries, translations, sources, media, and relations. Its public surface is the read-only `atlas.public_content_entries` view resolved through the active content `stable` channel; draft/review rows remain behind RLS and table privileges.
- `202607140002_atlas_release_activation.sql` adds an audited, compare-and-swap channel switch that can reactivate a superseded release during rollback.
- `202607140003_atlas_release_privileges.sql` makes release finalization a count-and-digest-checked security-definer operation. `service_role` may insert and populate a validating snapshot, but cannot directly update release status, move a channel, or alter the append-only release-event log.
- `release-plan.mjs` creates a deterministic, credential-free R2/database promotion plan. It never deletes an older release.
- `database-release.mjs` expands the same indexable map-route registry used by the public sitemap. Its release metadata stores a canonical publication digest and a full database snapshot digest, so an existing asset `versionKey` cannot be silently reused with different SEO/page-state content.
- `scripts/content/release.mjs` loads the live TypeScript content registry with Vite SSR, creates deterministic JSON and SQL snapshots, and refuses apply mode without an exact content-version confirmation and protected PostgreSQL variables. Publication validates row counts and editorial gates before making the snapshot immutable; changing the public content pointer remains an explicit compare-and-swap promotion.
- `publish-r2-release.mjs` is dry-run by default, revalidates every source byte count and SHA-256, refuses to overwrite mismatched immutable keys, verifies each upload with `HeadObject`, and changes `channels/stable.json` only when apply mode also has explicit promotion enabled. Pointer promotion requires an expected current version and uses `If-Match` (or `If-None-Match: *` for the first release), matching the database compare-and-swap model.
- `publish-sites-r2-release.mjs` provides the preferred Sites-managed path. It sends release objects through a strict Base64 binary transport to a same-origin, bearer-protected Worker endpoint backed by the logical `MAP_ASSETS` binding. The Worker decodes the payload, validates the original byte count and versioned key, checks SHA-256 in R2, refuses immutable overwrites, compares the complete paginated release object set to the signed-off plan, and promotes `channels/stable.json` with an R2 conditional write.
- `bootstrap-sites-r2-release.mjs` exists only for the first empty Sites bucket, where the temporary `chatgpt.site` edge may reject non-browser mutation requests. Authenticated, no-store GET batches copy at most 128 plan-owned bundled assets while retaining an 8 MiB byte ceiling, verify their bytes and SHA-256, and remain unavailable unless the independent bootstrap token and exact bundled version are enabled. When that edge also rejects command-line GETs or automated JSON navigation, the same one-time token and exact version may be supplied through the fixed same-origin HTML adapter at `/zh-hant/tools/map/release-bootstrap`; it performs the identical copy or promotion operation and renders only the escaped JSON result under `no-store`, `no-referrer`, CSP, and `noindex`. An explicitly bounded `auto=1&remaining=<1..64>` mode advances only to the plan-returned next cursor and then promotion, stops on any non-2xx response, and never redirects off the fixed path. The endpoint refuses all copying after a stable pointer exists, and both bootstrap variables are removed immediately after promotion, so this is not the normal forward-release transport.
- When `MAP_ASSETS` is provisioned, the Worker resolves `/map-runtime/manifest.json` through `channels/stable.json` and reads immutable bundles, tiles, and icons from their versioned R2 keys. Without the binding it retains the current static/upstream compatibility path.
- Because the stable R2 pointer is authoritative and the bootstrap route is retired, `postbuild` removes only the copied `dist/client/map-assets` directory. The release source under `public/map-assets` remains intact for deterministic plans and future uploads. `KEEP_LOCAL_MAP_ASSETS=1` is an explicit local-production-preview escape hatch and is not used for hosted releases.
- `verify-public-site.mjs` checks HTTPS, custom-domain canonical URLs, sitemap host consistency, every Sitemap URL's self-canonical/hreflang/indexability/title/description/social metadata, duplicate titles and descriptions, parseable JSON-LD, same-origin runtime bundles, version identity, version-pinned tile/icon URLs, one-year immutable caching, and retirement of the legacy full JSON.

## Remaining platform operations

These actions cannot be safely inferred or completed from repository source alone:

1. Attach the chosen custom domain to the Sites project and make it the canonical public origin.
2. Provision the logical `MAP_ASSETS` R2 binding through Sites. Store the independent 256-bit `MAP_RELEASE_UPLOAD_TOKEN` as a hosted secret; no physical bucket identifier or S3 credential belongs in Git.
3. Apply all four Supabase migrations in filename order through the trusted database deployment path.
4. Add runtime `SITE_URL` and build-time `NEXT_PUBLIC_SITE_URL` with the same HTTPS origin for canonical, JSON-LD, and sitemap generation; remove the temporary upstream map origin after the R2 read path is live.
5. Configure CI environment secrets out of band. Never paste API tokens, service-role keys, database passwords, or S3 credentials into source, workflow YAML, command arguments, logs, or release plans.

For the first Sites-managed release, deploy the binding and authenticated release endpoint with `MAP_RELEASE_BOOTSTRAP_VERSION` set to the exact bundled version. Bootstrap fallback is allowed only while `channels/stable.json` is absent, only for that exact bundled version, and is always `no-store`. An invalid pointer, a missing promoted manifest, or a missing object after promotion fails closed. Remove the bootstrap variable immediately after the first stable promotion.

## Release sequence

1. Run `npm run map-data:release`, then `npm run production:check` and `npm test`.
2. Generate `npm run release:plan -- -- --output output/release-plan.json`.
3. Dry-run `npm run release:r2:sites -- -- --plan output/release-plan.json`; this needs no endpoint or token and must revalidate every local source.
4. For the first release only, store independent `MAP_RELEASE_UPLOAD_TOKEN` and `MAP_RELEASE_BOOTSTRAP_TOKEN` hosted secrets, set `MAP_RELEASE_BOOTSTRAP_VERSION` to the exact plan version, deploy the commit with the `MAP_ASSETS` binding, and verify the authenticated status endpoint. This bootstrap deployment must happen before any upload because it creates the Sites-managed bucket binding and release endpoints.
5. For an empty Sites bucket behind the temporary `chatgpt.site` edge, set the endpoint and both tokens in the protected release environment, then run `npm run release:r2:sites:bootstrap -- -- --plan output/release-plan.json --apply --confirm-version <versionKey>`. It copies deterministic batches from the exact deployed build without moving the stable pointer. On a custom production domain or later releases, use `release:r2:sites` or the protected direct R2 transport instead.
6. Dry-run `npm run release:database -- -- --output output/database-release.sql`, inspect the reported `publicationDigest`, `databaseSnapshotDigest`, and 18 page states, then import from the protected PostgreSQL environment with `--apply --confirm-version <versionKey>`. The importer recreates draft/validating release rows transactionally, verifies all counts, and publishes the database snapshot without activating `stable`.
7. Dry-run `npm run release:content -- -- --json-output output/content-release.json --sql-output output/content-release.sql` with only the non-secret PostgreSQL target variables present, review the content version, row counts, source/media attribution, relations, and database `targetFingerprint`, then pass that exact immutable artifact to the credentialed importer with `--snapshot-input output/content-release.json --apply --confirm-version <contentVersionKey> --confirm-target <targetFingerprint>`. The importer rechecks the artifact digest without loading the TypeScript registry. Add `--promote --expected-current <currentContentVersionKey|none>` only in the controlled window that should move the public content `stable` channel.
8. In one controlled deployment window, rerun the selected R2 command with the same plan and confirmation plus `--promote --expected-current <currentVersionKey|none>`; use `none` only for the first release. The Worker paginates and verifies the complete release set and conditionally writes the `no-cache, no-store, must-revalidate` pointer. Coordinate this pointer change with `atlas.activate_release` using the same expected current version.
9. After the first stable pointer is verified, remove both `MAP_RELEASE_BOOTSTRAP_VERSION` and `MAP_RELEASE_BOOTSTRAP_TOKEN`, redeploy the same validated source, and run `npm run verify:public -- -- --base-url https://www.example.com --require-custom-domain`.

The preferred Sites path uses only environment-held `MAP_RELEASE_ENDPOINT` and `MAP_RELEASE_UPLOAD_TOKEN`. The direct S3 publisher remains an explicit recovery path and accepts `R2_S3_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, and `R2_SECRET_ACCESS_KEY`. Never put either token type in the release plan, command line, repository, or logs.

`atlas.releases.version_key` remains the exact R2/map asset version; the database does not invent a second public version key. `map-data:release` hashes semantic JSON from the publication registry, not TypeScript formatting or comments, and writes its descriptor to `manifest.files` as `policy/map-seo-publication.json`. The database adds the full SEO projection and page-state digests under `atlas.releases.stats.database`. Re-importing a matching published or superseded release is a no-op verification, while any attempt to reuse a version with different source, policy, SEO projection, or page states fails closed. Existing schema-2/pre-digest manifests must be regenerated as schema 3 and published under their newly derived version; their old immutable bundles remain valid rollback artifacts.

## Rollback

Rollback is a pointer operation, not a destructive upload:

1. Verify the target version's R2 manifest and objects still exist.
2. Dry-run `npm run release:rollback -- -- --channel stable --expected-current <current-versionKey> --target <previous-versionKey>`.
3. With PostgreSQL connection variables supplied by the protected CI environment, repeat with `--apply --confirm-target <previous-versionKey>`.
4. Move the R2 stable pointer to the same target version and verify the public site.

The compare-and-swap argument prevents a stale operator or concurrent job from replacing a newer active release.
