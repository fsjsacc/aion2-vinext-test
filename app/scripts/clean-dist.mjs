#!/usr/bin/env node

import { rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(process.cwd());
const distRoot = path.resolve(projectRoot, "dist");

if (distRoot === projectRoot || !distRoot.startsWith(`${projectRoot}${path.sep}`)) {
  throw new Error(`Refusing to clean an unsafe build path: ${distRoot}`);
}

await rm(distRoot, { recursive: true, force: true });
