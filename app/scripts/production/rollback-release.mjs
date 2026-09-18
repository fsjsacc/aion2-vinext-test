#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;
const CHANNEL_PATTERN = /^[a-z][a-z0-9_]{1,31}$/u;

function requiredOption(argv, name) {
  const index = argv.indexOf(name);
  const value = index === -1 ? undefined : argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} is required.`);
  return value;
}

export function createRollbackCommand({ channel, expectedCurrent, target, reason = "operator rollback" }) {
  if (!CHANNEL_PATTERN.test(channel)) throw new Error("Invalid channel code.");
  if (!VERSION_KEY_PATTERN.test(expectedCurrent)) throw new Error("Invalid expected current versionKey.");
  if (!VERSION_KEY_PATTERN.test(target)) throw new Error("Invalid target versionKey.");
  if (expectedCurrent === target) throw new Error("Rollback target must differ from the active release.");
  if (reason.length === 0 || reason.length > 500 || /[\u0000-\u001f]/u.test(reason)) {
    throw new Error("Rollback reason must be 1-500 printable characters.");
  }
  const quote = (value) => `'${value.replaceAll("'", "''")}'`;
  return `select * from atlas.activate_release(${quote(channel)}, ${quote(target)}, ${quote(expectedCurrent)}, ${quote(reason)});\n`;
}

function parseArguments(argv) {
  const channel = requiredOption(argv, "--channel");
  const expectedCurrent = requiredOption(argv, "--expected-current");
  const target = requiredOption(argv, "--target");
  const reasonIndex = argv.indexOf("--reason");
  const reason = reasonIndex === -1 ? "operator rollback" : argv[reasonIndex + 1];
  if (!reason) throw new Error("--reason requires a value.");
  const apply = argv.includes("--apply");
  const confirmIndex = argv.indexOf("--confirm-target");
  const confirmTarget = confirmIndex === -1 ? undefined : argv[confirmIndex + 1];
  if (apply && confirmTarget !== target) {
    throw new Error("--apply requires --confirm-target to exactly match --target.");
  }
  return { channel, expectedCurrent, target, reason, apply };
}

function missingPostgresVariables() {
  return ["PGHOST", "PGDATABASE", "PGUSER", "PGPASSWORD"]
    .filter((name) => !process.env[name]);
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  const sql = createRollbackCommand(options);
  if (!options.apply) {
    console.log(JSON.stringify({
      mode: "dry-run",
      channel: options.channel,
      expectedCurrent: options.expectedCurrent,
      target: options.target,
      sql,
      note: "No database connection was opened. Versioned R2 objects must be verified before --apply.",
    }, null, 2));
    return;
  }

  const missing = missingPostgresVariables();
  if (missing.length > 0) {
    throw new Error(`Missing PostgreSQL environment variables: ${missing.join(", ")}.`);
  }
  const result = spawnSync(
    "psql",
    ["--no-psqlrc", "--set", "ON_ERROR_STOP=1", "--no-align", "--tuples-only"],
    {
      input: sql,
      encoding: "utf8",
      env: { ...process.env, PGSSLMODE: process.env.PGSSLMODE ?? "require" },
      windowsHide: true,
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(result.stderr?.trim() || "PostgreSQL rollback failed.");
  }
  process.stdout.write(result.stdout);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
