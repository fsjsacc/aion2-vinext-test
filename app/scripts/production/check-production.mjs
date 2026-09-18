#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { createProductionReleasePlan, projectRoot } from "./release-plan.mjs";
import {
  readSitesReleaseConfig,
  verifySitesReleaseActivation,
} from "./publish-sites-r2-release.mjs";
import { validateProductionBaseUrl } from "./verify-public-site.mjs";

const requireActivated = process.argv.slice(2).includes("--require-activated");

const TEXT_EXTENSIONS = new Set([
  ".cjs", ".css", ".html", ".js", ".json", ".jsx", ".md", ".mjs",
  ".sql", ".toml", ".ts", ".tsx", ".yaml", ".yml",
]);

const SECRET_RULES = [
  ["Cloudflare API token", /cfat_[A-Za-z0-9_-]{20,}/u],
  ["AWS access key", /AKIA[0-9A-Z]{16}/u],
  [
    "R2 or S3 hexadecimal credential",
    /(?:R2|S3|AWS)_(?:ACCESS_KEY_ID|SECRET_ACCESS_KEY)\s*[:=]\s*["']?[0-9a-f]{32,64}["']?/iu,
  ],
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u],
  [
    "inline privileged credential",
    /(?:CLOUDFLARE_API_TOKEN|AWS_SECRET_ACCESS_KEY|MAP_RELEASE_UPLOAD_TOKEN|MAP_RELEASE_BOOTSTRAP_TOKEN)\s*[:=]\s*["'][^"']{12,}["']/u,
  ],
  [
    "map release upload token",
    /MAP_RELEASE_(?:UPLOAD|BOOTSTRAP)_TOKEN\s*[:=]\s*["']?[A-Za-z0-9._~-]{32,}["']?/u,
  ],
];

async function findSecretFiles() {
  const listed = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: projectRoot },
  ).toString("utf8").split("\0").filter(Boolean);
  const findings = [];
  for (const relativePath of listed) {
    const extension = path.extname(relativePath).toLowerCase();
    if (!TEXT_EXTENSIONS.has(extension)) continue;
    const absolutePath = path.join(projectRoot, relativePath);
    const fileStats = await stat(absolutePath).catch(() => null);
    if (!fileStats || fileStats.size > 2_000_000) continue;
    const content = await readFile(absolutePath, "utf8");
    for (const [rule, pattern] of SECRET_RULES) {
      if (pattern.test(content)) findings.push({ file: relativePath, rule });
    }
  }
  return findings;
}

const plan = await createProductionReleasePlan();
const hosting = JSON.parse(
  await readFile(path.join(projectRoot, ".openai/hosting.json"), "utf8"),
);
const secretFindings = await findSecretFiles();

const errors = [];
const warnings = [];
if (secretFindings.length > 0) {
  errors.push(...secretFindings.map(({ file, rule }) => `${rule} detected in ${file}`));
}
if (!hosting.project_id) errors.push("Sites project_id is missing.");
if (hosting.r2 === null) {
  const message = "Sites R2 binding is not provisioned yet; keep release plans dry-run only.";
  (requireActivated ? errors : warnings).push(message);
} else if (hosting.r2 !== "MAP_ASSETS") {
  errors.push("Sites R2 binding must be named MAP_ASSETS.");
}
const bootstrapVersion = process.env.MAP_RELEASE_BOOTSTRAP_VERSION;
if (bootstrapVersion) {
  if (bootstrapVersion !== plan.versionKey) {
    errors.push("MAP_RELEASE_BOOTSTRAP_VERSION must exactly match the current release versionKey.");
  } else {
    const message = "MAP_RELEASE_BOOTSTRAP_VERSION is temporary and must be removed after stable R2 promotion.";
    (requireActivated ? errors : warnings).push(message);
  }
}
const runtimeSiteUrl = process.env.SITE_URL;
const buildSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
let runtimeOrigin;
if (Boolean(runtimeSiteUrl) !== Boolean(buildSiteUrl)) {
  errors.push("SITE_URL and NEXT_PUBLIC_SITE_URL must be configured together.");
} else if (runtimeSiteUrl && buildSiteUrl) {
  try {
    const validationOptions = { requireCustomDomain: requireActivated };
    runtimeOrigin = validateProductionBaseUrl(runtimeSiteUrl, validationOptions);
    const buildOrigin = validateProductionBaseUrl(buildSiteUrl, validationOptions);
    if (runtimeOrigin.origin !== buildOrigin.origin) {
      errors.push("SITE_URL and NEXT_PUBLIC_SITE_URL must use the same origin.");
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
} else {
  const message = "Final SITE_URL and NEXT_PUBLIC_SITE_URL are not configured yet.";
  (requireActivated ? errors : warnings).push(message);
}
if (requireActivated) {
  try {
    const releaseConfig = readSitesReleaseConfig();
    if (runtimeOrigin && releaseConfig.endpoint !== runtimeOrigin.origin) {
      throw new Error("MAP_RELEASE_ENDPOINT must use the same origin as SITE_URL.");
    }
    await verifySitesReleaseActivation({
      config: releaseConfig,
      expectedVersion: plan.versionKey,
      publicOrigin: runtimeOrigin?.origin ?? releaseConfig.endpoint,
    });
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
}

const result = {
  ok: errors.length === 0,
  mode: requireActivated ? "activated" : "readiness",
  release: {
    versionKey: plan.versionKey,
    objectCount: plan.objectCount,
    totalBytes: plan.totalBytes,
  },
  errors,
  warnings,
};
console.log(JSON.stringify(result, null, 2));
if (errors.length > 0) process.exitCode = 1;
