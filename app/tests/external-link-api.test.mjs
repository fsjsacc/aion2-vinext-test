import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://aion2kina.com";
const admin = { email: "admin@example.com", displayName: "KINA Admin" };
const sampleCode =
  '<a target="_blank" href="https://goodaitools.com/ai/aion2kina"><img src="https://goodaitools.com/assets/images/badge.png" alt="优秀的AI工具" height="54" loading="lazy"></a>';
const toolFameCode = `<a href="https://toolfame.com/item/aion2-kina" target="_blank" rel="noopener noreferrer">
<img src="https://toolfame.com/badge-light.svg" alt="Featured on toolfame.com" style="height: 54px; width: auto;" />
</a>`;
const productHuntLightCode =
  '<a href="https://www.producthunt.com/products/aion2-kina?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-aion2-kina" target="_blank" rel="noopener noreferrer"><img alt="AION2 KINA on Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1197249&amp;theme=light"></a>';
const productHuntDarkCode =
  '<a href="https://www.producthunt.com/products/aion2-kina?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-aion2-kina" target="_blank" rel="noopener noreferrer"><img alt="AION2 KINA on Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1197249&amp;theme=dark"></a>';
const mossAiTextCode =
  '<a href="https://mossai.org" title="MossAI Tools">MossAI Tools</a>';

function request(pathname, options = {}) {
  const writeMethod =
    options.method === "POST" ||
    options.method === "PATCH" ||
    options.method === "DELETE";
  return new Request(`${origin}${pathname}`, {
    method: options.method ?? "GET",
    headers: {
      accept: "application/json",
      ...(options.method === "POST" || options.method === "PATCH"
        ? { "content-type": "application/json" }
        : {}),
      ...(writeMethod
        ? { origin, "sec-fetch-site": "same-origin" }
        : {}),
      ...(options.headers ?? {}),
    },
    body: options.body,
  });
}

function fakeDatabase() {
  const rows = [];
  const calls = [];
  const settings = {
    scalePercent: null,
    updatedAt: null,
    updatedBy: null,
  };
  return {
    rows,
    calls,
    settings,
    prepare(sql) {
      const statement = {
        bindings: [],
        bind(...bindings) {
          statement.bindings = bindings;
          calls.push({ sql, bindings });
          return statement;
        },
        async first() {
          if (/from external_link_settings/u.test(sql)) {
            return settings.scalePercent === null
              ? null
              : { scale_percent: settings.scalePercent };
          }
          if (/where href = \?/u.test(sql)) {
            const match = rows.find((row) => row.href === statement.bindings[0]);
            return match
              ? { id: match.id, created_at: match.createdAt }
              : null;
          }
          return null;
        },
        async all() {
          if (/from external_links/u.test(sql)) {
            return {
              success: true,
              results: rows.map((row) => ({
                id: row.id,
                href: row.href,
                badge_type: row.badgeType,
                image_src: row.imageSrc,
                alt: row.alt,
                height: row.height,
                created_at: row.createdAt,
              })),
            };
          }
          return { success: true, results: [] };
        },
        async run() {
          if (/insert into external_link_settings/u.test(sql)) {
            const [scalePercent, updatedAt, updatedBy] =
              statement.bindings;
            Object.assign(settings, {
              scalePercent,
              updatedAt,
              updatedBy,
            });
            return { success: true, meta: { changes: 1 } };
          }
          if (/insert into external_links/u.test(sql)) {
            const [
              id,
              href,
              badgeType,
              imageSrc,
              alt,
              height,
              createdAt,
              createdBy,
            ] = statement.bindings;
            rows.push({
              id,
              href,
              badgeType,
              imageSrc,
              alt,
              height,
              createdAt,
              createdBy,
            });
            return { success: true, meta: { changes: 1 } };
          }
          if (/update external_links/u.test(sql)) {
            const [badgeType, imageSrc, alt, height, createdBy, id] =
              statement.bindings;
            const match = rows.find((row) => row.id === id);
            if (!match) {
              return { success: true, meta: { changes: 0 } };
            }
            Object.assign(match, {
              badgeType,
              imageSrc,
              alt,
              height,
              active: 1,
              createdBy,
            });
            return { success: true, meta: { changes: 1 } };
          }
          if (/delete from external_links/u.test(sql)) {
            const index = rows.findIndex(
              (row) => row.id === statement.bindings[0],
            );
            if (index < 0) {
              return { success: true, meta: { changes: 0 } };
            }
            rows.splice(index, 1);
            return { success: true, meta: { changes: 1 } };
          }
          return { success: true, meta: { changes: 0 } };
        },
      };
      return statement;
    },
  };
}

test("external-link code is parsed into safe fields and never returned as raw HTML", async (context) => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });
  context.after(() => vite.close());
  const {
    handleAdminExternalLinkApi,
    handleExternalLinkApi,
    parseCustomExternalLink,
    parseExternalLinkCode,
  } = await vite.ssrLoadModule("/worker/external-link-api.ts");
  const {
    decodeExternalLinkRecords,
    encodeExternalLinkRecords,
  } = await vite.ssrLoadModule("/app/external-link-values.ts");

  const parsed = parseExternalLinkCode(sampleCode);
  assert.deepEqual(parsed, {
    href: "https://goodaitools.com/ai/aion2kina",
    badgeType: "image",
    imageSrc: "https://goodaitools.com/assets/images/badge.png",
    alt: "优秀的AI工具",
    height: 54,
  });
  assert.deepEqual(parseExternalLinkCode(toolFameCode), {
    href: "https://toolfame.com/item/aion2-kina",
    badgeType: "image",
    imageSrc: "https://toolfame.com/badge-light.svg",
    alt: "Featured on toolfame.com",
    height: 54,
  });
  assert.deepEqual(parseExternalLinkCode(mossAiTextCode), {
    href: "https://mossai.org/",
    badgeType: "text",
    imageSrc: null,
    alt: "MossAI Tools",
    height: 36,
  });
  assert.deepEqual(
    parseCustomExternalLink({
      href: "https://example.com/listing",
      alt: "Featured on Example",
      imageSrc: "https://example.com/badge.svg",
    }),
    {
      href: "https://example.com/listing",
      badgeType: "image",
      imageSrc: "https://example.com/badge.svg",
      alt: "Featured on Example",
      height: 54,
    },
  );
  assert.deepEqual(
    parseCustomExternalLink({
      href: "https://example.com/text",
      alt: "Example Directory",
      imageSrc: "",
    }),
    {
      href: "https://example.com/text",
      badgeType: "text",
      imageSrc: null,
      alt: "Example Directory",
      height: 36,
    },
  );
  assert.equal(
    parseExternalLinkCode(
      '<a href="https://example.com/?a=1&amp;b=2"><img src="https://example.com/badge.svg?dark=1&amp;size=54" alt="A &amp; B"></a>',
    ).href,
    "https://example.com/?a=1&b=2",
  );
  assert.throws(
    () =>
      parseExternalLinkCode(
        '<a href="javascript:alert(1)"><img src="https://example.com/a.png" alt="bad"></a>',
      ),
    /HTTPS/u,
  );
  assert.throws(
    () =>
      parseExternalLinkCode(
        '<a href="https://example.com"><img src="data:image/png;base64,AAAA" alt="bad"></a>',
      ),
    /HTTPS/u,
  );
  assert.throws(
    () =>
      parseExternalLinkCode(
        '<a href="https://example.com"><span>unsafe</span></a>',
      ),
    /格式/u,
  );

  await context.test("admin can add, list, and delete a validated badge", async () => {
    const db = fakeDatabase();
    const env = { DB: db, SITE_URL: origin };
    const createdResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "POST",
        body: JSON.stringify({ code: sampleCode }),
      }),
      env,
      admin,
    );
    assert.equal(createdResponse.status, 201);
    const createdBody = await createdResponse.json();
    assert.match(createdBody.link.id, /^[0-9a-f-]{36}$/u);
    assert.equal(createdBody.link.href, parsed.href);
    assert.equal(createdBody.link.imageSrc, parsed.imageSrc);
    assert.equal(createdBody.operation, "created");
    assert.equal(JSON.stringify(createdBody).includes("<a"), false);
    assert.equal(db.rows[0].createdBy, admin.email);

    const listedResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links"),
      env,
      admin,
    );
    assert.equal(listedResponse.status, 200);
    assert.match(listedResponse.headers.get("cache-control"), /no-store/u);
    const listed = await listedResponse.json();
    assert.equal(listed.links.length, 1);
    assert.equal(listed.settings.scalePercent, 70);

    const deletedResponse = await handleAdminExternalLinkApi(
      request(`/api/admin/external-links/${createdBody.link.id}`, {
        method: "DELETE",
      }),
      env,
      admin,
    );
    assert.equal(deletedResponse.status, 200);
    assert.equal(db.rows.length, 0);
  });

  await context.test("admin can add text and custom image badges without full HTML", async () => {
    const db = fakeDatabase();
    const env = { DB: db, SITE_URL: origin };
    const textResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "POST",
        body: JSON.stringify({ code: mossAiTextCode }),
      }),
      env,
      admin,
    );
    assert.equal(textResponse.status, 201);
    const textBody = await textResponse.json();
    assert.equal(textBody.link.badgeType, "text");
    assert.equal(textBody.link.imageSrc, null);

    const customResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "POST",
        body: JSON.stringify({
          href: "https://directory.example/aion2-kina",
          alt: "Featured on Directory",
          imageSrc: "https://directory.example/badge.svg",
        }),
      }),
      env,
      admin,
    );
    assert.equal(customResponse.status, 201);
    const customBody = await customResponse.json();
    assert.equal(customBody.link.badgeType, "image");
    assert.equal(
      customBody.link.imageSrc,
      "https://directory.example/badge.svg",
    );
    assert.equal(db.rows.length, 2);
  });

  await context.test("admin can persist a global footer badge scale", async () => {
    const db = fakeDatabase();
    const env = { DB: db, SITE_URL: origin };
    const response = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "PATCH",
        body: JSON.stringify({ scalePercent: 60 }),
      }),
      env,
      admin,
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      settings: { scalePercent: 60 },
    });
    assert.equal(db.settings.scalePercent, 60);
    assert.equal(db.settings.updatedBy, admin.email);

    const listedResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links"),
      env,
      admin,
    );
    assert.equal((await listedResponse.json()).settings.scalePercent, 60);

    const invalidResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "PATCH",
        body: JSON.stringify({ scalePercent: 20 }),
      }),
      env,
      admin,
    );
    assert.equal(invalidResponse.status, 400);
    assert.equal(db.settings.scalePercent, 60);
  });

  await context.test("saving the same destination updates its badge instead of duplicating it", async () => {
    const db = fakeDatabase();
    const env = { DB: db, SITE_URL: origin };
    const createdResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "POST",
        body: JSON.stringify({ code: productHuntLightCode }),
      }),
      env,
      admin,
    );
    assert.equal(createdResponse.status, 201);
    const created = await createdResponse.json();
    assert.equal(created.operation, "created");

    const updatedResponse = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "POST",
        body: JSON.stringify({ code: productHuntDarkCode }),
      }),
      env,
      admin,
    );
    assert.equal(updatedResponse.status, 200);
    const updated = await updatedResponse.json();
    assert.equal(updated.operation, "updated");
    assert.equal(updated.link.id, created.link.id);
    assert.equal(updated.link.createdAt, created.link.createdAt);
    assert.match(updated.link.imageSrc, /theme=dark/u);
    assert.equal(db.rows.length, 1);
    assert.match(db.rows[0].imageSrc, /theme=dark/u);
  });

  await context.test("writes require a same-origin request", async () => {
    const db = fakeDatabase();
    const denied = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "POST",
        headers: { origin: "https://attacker.example" },
        body: JSON.stringify({ code: sampleCode }),
      }),
      { DB: db, SITE_URL: origin },
      admin,
    );
    assert.equal(denied.status, 403);
    assert.equal(db.calls.length, 0);

    const deniedSettings = await handleAdminExternalLinkApi(
      request("/api/admin/external-links", {
        method: "PATCH",
        headers: { origin: "https://attacker.example" },
        body: JSON.stringify({ scalePercent: 100 }),
      }),
      { DB: db, SITE_URL: origin },
      admin,
    );
    assert.equal(deniedSettings.status, 403);
    assert.equal(db.calls.length, 0);
  });

  await context.test("public endpoint returns only active safe fields", async () => {
    const db = fakeDatabase();
    db.rows.push({
      id: "078337de-3cc9-4011-a96d-0bb1572d980f",
      href: parsed.href,
      imageSrc: parsed.imageSrc,
      alt: parsed.alt,
      height: parsed.height,
      createdAt: 1_756_000_000_000,
      createdBy: admin.email,
    });
    const response = await handleExternalLinkApi(
      request("/api/external-links"),
      { DB: db },
    );
    assert.equal(response.status, 200);
    assert.match(response.headers.get("cache-control"), /public/u);
    const body = await response.json();
    assert.equal(body.links.length, 1);
    assert.equal(body.settings.scalePercent, 70);
    assert.equal(body.links[0].createdBy, undefined);
    assert.equal(JSON.stringify(body).includes(admin.email), false);
  });

  await context.test("server-rendered footer keeps newly added badges beyond twelve", () => {
    const links = Array.from({ length: 20 }, (_, index) => ({
      id: `badge-${index + 1}`,
      href: `https://directory-${index + 1}.example/item/aion2-kina`,
      badgeType: "image",
      imageSrc: `https://directory-${index + 1}.example/badge.svg`,
      alt: `Featured on directory ${index + 1}`,
      height: 54,
      createdAt: 1_756_000_000_000 + index,
    }));
    const encoded = encodeExternalLinkRecords(links);
    assert.notEqual(encoded, "");
    assert.deepEqual(decodeExternalLinkRecords(encoded), links);
  });

  await context.test("localized pages pass database links into the server-rendered footer", async () => {
    const layout = await fs.readFile(
      path.join(root, "app", "[locale]", "layout.tsx"),
      "utf8",
    );
    const footer = await fs.readFile(
      path.join(root, "app", "_components", "site", "FooterExternalLinks.tsx"),
      "utf8",
    );
    const footerStyles = await fs.readFile(
      path.join(root, "app", "site-shell.css"),
      "utf8",
    );
    assert.match(layout, /await getFooterExternalLinkConfiguration\(\)/u);
    assert.match(
      layout,
      /externalLinkScalePercent=\{externalLinkConfiguration\.scalePercent\}/u,
    );
    assert.match(
      layout,
      /externalLinks=\{externalLinkConfiguration\.links\}/u,
    );
    assert.match(footer, /const renderLinks = \(duplicate: boolean\)/u);
    assert.match(footer, /scalePercent/u);
    assert.match(footer, /link\.badgeType === "text"/u);
    assert.match(footer, /site-shell-external-link-text/u);
    assert.match(footer, /rel="noopener noreferrer"/u);
    assert.doesNotMatch(footer, /\b(?:nofollow|sponsored)\b/u);
    assert.match(
      footer,
      /style=\{\{ height: displayHeight, width: displayWidth \}\}/u,
    );
    assert.match(footerStyles, /@keyframes external-links-marquee/u);
    assert.match(footerStyles, /prefers-reduced-motion: reduce/u);
    assert.match(footerStyles, /animation-play-state: paused/u);
    assert.doesNotMatch(footer, /fetch\(|useEffect|useState/u);
  });

  await context.test("admin exposes and tracks the footer badge scale control", async () => {
    const manager = await fs.readFile(
      path.join(root, "app", "admin", "ExternalLinksManager.tsx"),
      "utf8",
    );
    assert.match(manager, /type="range"/u);
    assert.match(manager, /method: "PATCH"/u);
    assert.match(manager, /admin_external_link_scale_update/u);
    assert.match(manager, /entry_mode: entryMode/u);
    assert.match(manager, /徽章图片网址（可选）/u);
    assert.match(manager, /纯文字徽章/u);
    assert.match(manager, /保存比例/u);
  });

  await context.test("built HTML contains the ToolFame backlink before JavaScript runs", async () => {
    const db = fakeDatabase();
    db.rows.push({
      id: "873661a7-ed85-48d0-ac70-a7d1f41f6555",
      href: "https://toolfame.com/item/aion2-kina",
      imageSrc: "https://toolfame.com/badge-light.svg",
      alt: "Featured on toolfame.com",
      height: 54,
      createdAt: 1_784_810_323_767,
      createdBy: admin.email,
    });
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set(
      "external-link-ssr-test",
      `${process.pid}-${Date.now()}`,
    );
    const { default: worker } = await import(workerUrl.href);
    const response = await worker.fetch(
      new Request(`${origin}/en/`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
        DB: db,
        SITE_URL: origin,
      },
      {
        passThroughOnException() {},
        waitUntil() {},
      },
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(
      html,
      /href="https:\/\/toolfame\.com\/item\/aion2-kina"/u,
    );
    assert.match(
      html,
      /src="https:\/\/toolfame\.com\/badge-light\.svg"/u,
    );
    assert.match(html, /height="38"/u);

    const spoofed = await worker.fetch(
      new Request(`${origin}/en/`, {
        headers: {
          accept: "text/html",
          "x-aion2-footer-links": encodeURIComponent(
            JSON.stringify([
              {
                id: "attacker",
                href: "https://attacker.example/",
                imageSrc: "https://attacker.example/badge.svg",
                alt: "Attacker",
                height: 54,
                createdAt: 1,
              },
            ]),
          ),
        },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
        SITE_URL: origin,
      },
      {
        passThroughOnException() {},
        waitUntil() {},
      },
    );
    assert.doesNotMatch(await spoofed.text(), /attacker\.example/u);
  });
});
