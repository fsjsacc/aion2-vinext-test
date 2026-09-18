import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const locales = [
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
const hubSections = ["guides", "classes", "database", "tools", "news"];

async function loadPublicCopy() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: false,
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
  });

  try {
    const [site, tools, hubs, trust, mapSeo, mapUi] = await Promise.all([
      vite.ssrLoadModule("/app/site-config.ts"),
      vite.ssrLoadModule("/app/tool-registry.ts"),
      vite.ssrLoadModule("/app/hub-content.ts"),
      vite.ssrLoadModule("/app/trust-content.ts"),
      vite.ssrLoadModule("/app/map-seo.ts"),
      vite.ssrLoadModule("/app/map-app/i18n.ts"),
    ]);
    return { site, tools, hubs, trust, mapSeo, mapUi };
  } finally {
    await vite.close();
  }
}

function collectStrings(value, output = []) {
  if (typeof value === "string") output.push(value);
  if (!value || typeof value !== "object") return output;
  for (const nested of Object.values(value)) collectStrings(nested, output);
  return output;
}

test("public chrome copy is direct and complete in all ten site locales", async () => {
  const { site, tools, hubs, trust, mapSeo, mapUi } = await loadPublicCopy();
  assert.deepEqual([...site.siteLocales], locales);

  for (const locale of locales) {
    const shell = site.siteShellCopy[locale];
    assert.ok(shell?.searchPlaceholder, `${locale} site shell`);
    assert.ok(shell?.siteInformationLabel, `${locale} site policy aria label`);

    const toolHub = tools.toolHubCopy[locale];
    assert.ok(toolHub?.searchPlaceholder, `${locale} tool search`);
    assert.ok(toolHub?.detailLanguages, `${locale} tool language label`);

    for (const section of hubSections) {
      const hub = hubs.hubContent[locale]?.[section];
      assert.ok(hub?.kicker, `${locale}.${section}.kicker`);
      assert.ok(hub?.title, `${locale}.${section}.title`);
      assert.equal(hub?.cards.length, 3, `${locale}.${section}.cards`);
    }

    for (const kind of ["about", "contact", "privacy", "terms"]) {
      const page = trust.trustPageCopy[locale]?.[kind];
      assert.ok(page?.eyebrow, `${locale}.${kind}.eyebrow`);
      assert.ok(page?.title, `${locale}.${kind}.title`);
    }

    assert.ok(mapSeo.copy[locale]?.breadcrumbLabel, `${locale} map breadcrumb`);
    const mapLocale = site.siteLocaleConfig[locale].code;
    assert.ok(mapUi.UI_TEXT[mapLocale]?.mapEngineError, `${locale} map error`);
  }
});

test("trust copy distinguishes official item checks from editorial map curation", async () => {
  const { trust } = await loadPublicCopy();
  const expectedClaims = {
    "zh-hans": ["物品身份、图标与品级", "地图点位由 AION2 KINA 编辑整理"],
    en: ["Item identity, icons, grades", "Interactive-map markers are curated"],
    fr: ["L’identité, l’icône, la qualité", "Les points de la carte interactive sont sélectionnés"],
    de: ["Identität, Symbol, Qualitätsstufe", "Die Punkte der interaktiven Karte werden"],
    es: ["La identidad, el icono, la calidad", "Los puntos del mapa interactivo los recopila"],
    ja: ["アイテムの識別情報、アイコン、等級", "インタラクティブマップの地点は"],
    "pt-br": ["A identidade, o ícone, a qualidade", "Os pontos do mapa interativo são organizados"],
    ru: ["Идентификатор, значок, качество", "Точки интерактивной карты редакция"],
    ko: ["아이템의 식별 정보, 아이콘, 등급", "인터랙티브 지도 포인트는"],
    "zh-hant": ["物品身份、圖示與品級", "互動地圖點位則由 AION2 KINA 編輯整理"],
  };
  const misleadingCombinedClaim =
    /raw official map|raw map\/item|地圖與物品(?:資料)?的官方原始|地图与物品(?:资料)?的官方原始|지도와 아이템의 원본 공식|マップとアイテムの公式(?:ゲーム)?生データ|données de jeu officielles brutes de la carte et des objets|offiziellen Rohdaten für Karte und Gegenstände|datos oficiales sin procesar del mapa y los objetos|dados oficiais brutos do mapa e dos itens|официальные игровые данные карты и предметов/iu;

  for (const locale of locales) {
    const copy = collectStrings(trust.trustPageCopy[locale].about).join(" ");
    for (const expected of expectedClaims[locale]) {
      assert.match(copy, new RegExp(expected, "u"), `${locale} provenance claim`);
    }
    assert.doesNotMatch(copy, misleadingCombinedClaim, `${locale} combined official-data claim`);
  }
});

test("established non-English chrome no longer exposes English-only display labels", async () => {
  const { tools, hubs, trust } = await loadPublicCopy();
  const disallowed = new Set([
    "PLAYER GUIDES",
    "START HERE",
    "SYSTEM CHECK",
    "WORLD ROUTE",
    "CLASSES & BUILDS",
    "DIFFICULTY COMPARISON",
    "NEW CLASS",
    "BUILD METHOD",
    "REFERENCE DATA",
    "ITEM DATABASE",
    "DATA GUIDE",
    "WORLD DATA",
    "PLAYER TOOLS",
    "LIVE NOW",
    "CLASS FINDER",
    "CRAFTING DATABASE",
    "AION2 NEWS",
    "OFFICIAL UPDATES",
    "COUPON CODES",
    "EVERGREEN CONTEXT",
    "CONTACT / CORRECTIONS",
    "PRIVACY",
    "TERMS",
    "TOOL DIRECTORY",
    "WORLD EXPLORATION",
    "CLASS MATCHING",
    "BUILD PLANNER",
    "CRAFTING",
    "DAILY ROUTINE",
  ]);

  for (const locale of ["zh-hant", "ko"]) {
    const values = collectStrings({
      hub: hubs.hubContent[locale],
      tools: {
        hub: tools.toolHubCopy[locale],
        registry: tools.toolRegistry.map((tool) => tool.copy[locale]),
      },
      trust: trust.trustPageCopy[locale],
    });
    const leaked = values.filter((value) => disallowed.has(value));
    assert.deepEqual(leaked, [], `${locale} visible English labels`);
  }
});

test("public components use requested-locale chrome and localized status labels", async () => {
  const files = {
    classFinder: await readFile(
      path.join(root, "app", "[locale]", "tools", "class-finder", "page.tsx"),
      "utf8",
    ),
    classFinderShare: await readFile(
      path.join(root, "app", "_components", "tools", "ClassFinderShareDialog.tsx"),
      "utf8",
    ),
    contentDetail: await readFile(
      path.join(root, "app", "_components", "content", "ContentDetail.tsx"),
      "utf8",
    ),
    toolsHub: await readFile(
      path.join(root, "app", "_components", "tools", "ToolsHub.tsx"),
      "utf8",
    ),
    toolDetail: await readFile(
      path.join(root, "app", "_components", "tools", "ToolDetail.tsx"),
      "utf8",
    ),
    hubPage: await readFile(
      path.join(root, "app", "_components", "hub", "HubPage.tsx"),
      "utf8",
    ),
    footerExternalLinks: await readFile(
      path.join(root, "app", "_components", "site", "FooterExternalLinks.tsx"),
      "utf8",
    ),
    mapSeoChrome: await readFile(
      path.join(root, "app", "map-app", "MapSeoChrome.tsx"),
      "utf8",
    ),
    interactiveMap: await readFile(
      path.join(root, "app", "map-app", "InteractiveMap.tsx"),
      "utf8",
    ),
    mapLibre: await readFile(
      path.join(root, "app", "map-app", "MapLibreMap.tsx"),
      "utf8",
    ),
    mapPoi: await readFile(
      path.join(
        root,
        "app",
        "[locale]",
        "tools",
        "map",
        "[map]",
        "poi",
        "[poi]",
        "page.tsx",
      ),
      "utf8",
    ),
    mapType: await readFile(
      path.join(
        root,
        "app",
        "[locale]",
        "tools",
        "map",
        "[map]",
        "type",
        "[type]",
        "page.tsx",
      ),
      "utf8",
    ),
  };

  assert.match(
    files.classFinder,
    /aria-label=\{breadcrumbAriaLabel\[locale\]\}/,
  );
  assert.doesNotMatch(files.classFinder, /aria-label="Breadcrumb"/);
  assert.doesNotMatch(files.classFinderShare, />AION2 KINA · CLASS MATCH</);

  assert.match(files.contentDetail, /pfgAuthorCopy\[locale\]/);
  assert.match(files.contentDetail, /sourceUiCopyClean\[locale\]/);
  assert.match(files.contentDetail, /articleMetaCopy\[locale\]/);
  assert.doesNotMatch(
    files.contentDetail,
    /(?:pfgAuthorCopy|sourceUiCopyClean|articleMetaCopy)\[contentLocale\]/,
  );

  assert.match(files.toolsHub, /const copy = toolHubCopy\[locale\]/);
  assert.match(files.toolsHub, /tool\.copy\[locale\]/);
  assert.match(
    files.toolsHub,
    /aria-label=\{breadcrumbAriaLabel\[locale\]\}/,
  );
  assert.match(files.toolDetail, /const content = tool\.copy\[locale\]/);
  assert.match(files.toolDetail, /const copy = toolHubCopy\[locale\]/);
  assert.match(
    files.toolDetail,
    /aria-label=\{breadcrumbAriaLabel\[locale\]\}/,
  );
  assert.match(files.hubPage, /const copy = searchCopy\[locale\]/);
  assert.match(
    files.hubPage,
    /aria-label=\{breadcrumbAriaLabel\[locale\]\}/,
  );
  assert.match(files.footerExternalLinks, /aria-label=\{label\[locale\]\}/);
  assert.match(files.mapSeoChrome, /aria-label=\{copy\[locale\]\.breadcrumbLabel\}/);

  assert.doesNotMatch(files.mapLibre, />\s*Map unavailable\s*</);
  assert.match(files.mapLibre, /\{unavailableLabel\}/);
  assert.doesNotMatch(
    files.interactiveMap,
    /message:\s*(?:error\.message|"Map engine startup timed out")/,
  );
  assert.doesNotMatch(files.mapPoi, /AION2 MAP/);
  assert.doesNotMatch(files.mapType, /AION2 MAP/);
});
