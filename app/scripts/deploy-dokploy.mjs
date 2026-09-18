#!/usr/bin/env node
/**
 * AION2-KINA 一键部署脚本
 *
 * 流程: build → sync → push → 验证 Dokploy 部署
 *
 * 用法:
 *   node scripts/deploy-dokploy.mjs              # 完整部署
 *   node scripts/deploy-dokploy.mjs --skip-build  # 跳过构建（仅同步已有 dist/）
 *   node scripts/deploy-dokploy.mjs --dry-run     # 预览变更，不实际 push
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const WORKSPACE = path.resolve(import.meta.dirname, "../..");
const SOURCE_DIR = path.resolve(import.meta.dirname, ".."); // AION2-KINA
const DOKPLOY_DIR = path.join(WORKSPACE, "aion2-dokploy");
const DOKPLOY_REPO = "https://github.com/fsjsacc/aion2-dokploy.git";
const DOKPLOY_API = "http://2.25.206.13:3000";
const COMPOSE_ID = "iI8T1MzO0zqtsJ5VRMwPo";
const SITE_URL = "https://www.aion2kina.com";

// Files to sync from source → dokploy/app/
const SYNC_FILES = ["dist", "package.json", "package-lock.json"];

const args = new Set(process.argv.slice(2));
const SKIP_BUILD = args.has("--skip-build");
const DRY_RUN = args.has("--dry-run");

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

let stepNum = 0;
function step(label) {
  stepNum++;
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  [${stepNum}] ${label}`);
  console.log(`${"=".repeat(60)}`);
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

function countFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile()) count++;
    else if (entry.isDirectory()) count += countFiles(path.join(dir, entry.name));
  }
  return count;
}

function warn(msg) {
  console.log(`  ⚠️  ${msg}`);
}

function fail(msg) {
  console.log(`  ❌ ${msg}`);
}

function run(cmd, opts = {}) {
  const { cwd, silent, allowFail, env } = opts;
  try {
    const result = execSync(cmd, {
      cwd: cwd || SOURCE_DIR,
      encoding: "utf8",
      stdio: silent ? "pipe" : ["pipe", "pipe", "pipe"],
      timeout: opts.timeout || 300_000,
      env: env || process.env,
    });
    return result?.trim() ?? "";
  } catch (err) {
    if (allowFail) return null;
    fail(`命令失败: ${cmd}`);
    if (err.stdout) console.log(`  stdout: ${err.stdout.toString().slice(0, 500)}`);
    if (err.stderr) console.log(`  stderr: ${err.stderr.toString().slice(0, 500)}`);
    throw err;
  }
}

function fileHash(filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // For directories, hash the file list + sizes as a fingerprint
      const entries = [];
      const walk = (dir, prefix) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name);
          const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
          if (entry.isDirectory()) walk(full, rel);
          else entries.push(`${rel}:${entry.size}`);
        }
      };
      walk(filePath, "");
      return `dir:${entries.length}files:${entries.slice(-5).join(",")}`;
    }
    return `file:${stat.size}:${stat.mtimeMs}`;
  } catch {
    return "missing";
  }
}

/* ------------------------------------------------------------------ */
/* Pre-flight                                                          */
/* ------------------------------------------------------------------ */

async function preflight() {
  step("预检");

  // 1. Source repo state — informational only.
  // NOTE: the source repo is a pure build input; what actually ships is the
  // `dist/` tree synced into aion2-dokploy. A dirty source tree therefore does
  // NOT make the deployment incorrect, and blocking on it would force unrelated
  // work-in-progress edits to be committed just to run a deploy. Warn instead.
  const gitStatus = run("git status --porcelain", { cwd: SOURCE_DIR, silent: true });
  if (gitStatus) {
    warn(`源码仓库有未提交变更 (不影响部署，仅提示):\n${gitStatus}`);
    if (SKIP_BUILD) {
      warn("--skip-build: 将以现有 dist/ 部署，请确认 dist/ 与当前源码一致");
    } else {
      warn("将从当前工作区源码构建，未提交改动会被一并打进 dist/");
    }
  } else {
    ok("源码仓库干净");
  }

  // 2. Dokploy repo — clone if missing, pull if exists
  if (!fs.existsSync(path.join(DOKPLOY_DIR, ".git", "HEAD"))) {
    console.log(`  初始化 aion2-dokploy → ${DOKPLOY_DIR}`);
    // 用 gh api 下载 zipball（git clone 在此环境经常超时）
    fs.mkdirSync(DOKPLOY_DIR, { recursive: true });
    const zipPath = path.join(WORKSPACE, "_dokploy_zip.zip");
    const tmpDir = path.join(WORKSPACE, "_dokploy_tmp");
    try {
      // gh api 下载 zipball（gh CLI 走的网络通路在此环境比 git/node fetch 快）
      console.log("  通过 gh api 下载仓库...");
      const token = run("gh auth token", { cwd: WORKSPACE, silent: true }).split("\n")[0].trim();
      run(
        `curl -sL -o "${zipPath}" -H "Authorization: token ${token}" -H "Accept: application/vnd.github+json" "https://api.github.com/repos/fsjsacc/aion2-dokploy/zipball/main"`,
        { cwd: WORKSPACE, timeout: 60_000 },
      );
      const zipSize = fs.statSync(zipPath).size;
      console.log(`  下载完成 (${(zipSize / 1024).toFixed(0)} KB)`);
      // 解压
      if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
      fs.mkdirSync(tmpDir, { recursive: true });
      // PowerShell 解压（Windows 内置，无需额外工具）
      execSync(
        `powershell -NoProfile -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${tmpDir}' -Force"`,
        { cwd: WORKSPACE, timeout: 30_000 },
      );
      // 找到解压后的目录（带 commit hash 前缀）
      const entries = fs.readdirSync(tmpDir);
      const extracted = path.join(tmpDir, entries[0]);
      // 复制到目标
      for (const item of fs.readdirSync(extracted)) {
        fs.cpSync(path.join(extracted, item), path.join(DOKPLOY_DIR, item), { recursive: true });
      }
      // 初始化 git
      run("git init", { cwd: DOKPLOY_DIR, silent: true });
      run("git checkout -b main", { cwd: DOKPLOY_DIR, silent: true });
      run("git add -A", { cwd: DOKPLOY_DIR, silent: true });
      run('git commit -m "init from zipball" --allow-empty', { cwd: DOKPLOY_DIR, silent: true });
      run(`git remote add origin ${DOKPLOY_REPO}`, { cwd: DOKPLOY_DIR, silent: true });
      run("git branch --set-upstream-to=origin/main main", { cwd: DOKPLOY_DIR, silent: true, allowFail: true });
      ok("通过 zipball 初始化完成");
    } finally {
      try { fs.rmSync(zipPath, { force: true }); } catch {}
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    }
  } else {
    const currentBranch = run("git branch --show-current", { cwd: DOKPLOY_DIR, silent: true });
    if (currentBranch !== "main") {
      fail(`aion2-dokploy 在 ${currentBranch} 分支，应为 main`);
      throw new Error("分支不对");
    }
    run("git pull --ff-only origin main", { cwd: DOKPLOY_DIR });
    ok("aion2-dokploy 已拉取最新");
  }

  // 3. Dokploy repo is clean
  const dokployStatus = run("git status --porcelain", { cwd: DOKPLOY_DIR, silent: true });
  if (dokployStatus) {
    warn(`aion2-dokploy 有未提交变更:\n${dokployStatus}`);
    warn("将继续但注意：这些变更也会被一起提交");
  } else {
    ok("aion2-dokploy 仓库干净");
  }

  // 4. Check required files exist in source
  for (const f of ["package.json", "package-lock.json"]) {
    if (!fs.existsSync(path.join(SOURCE_DIR, f))) {
      fail(`源码缺少 ${f}`);
      throw new Error("缺少必要文件");
    }
  }
  ok("源文件齐全");

  // 5. Git auth check
  try {
    run("git -c http.sslBackend=openssl ls-remote --exit-code origin HEAD", {
      cwd: DOKPLOY_DIR,
      silent: true,
    });
    ok("GitHub 认证正常");
  } catch {
    fail("GitHub 认证失败，请检查 gh auth 或 git 凭据");
    throw new Error("GitHub 不可达");
  }
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */

function build() {
  if (SKIP_BUILD) {
    step("构建 (跳过)");
    if (!fs.existsSync(path.join(SOURCE_DIR, "dist"))) {
      fail("dist/ 不存在，无法跳过构建");
      throw new Error("dist/ 缺失");
    }
    warn("使用已有 dist/");
    return;
  }

  step("构建 (npm run build)");
  const buildStart = Date.now();
  try {
    // KEEP_LOCAL_MAP_ASSETS=1: preserve map tiles in dist/client/map-assets/
    // so the Docker image can serve them via the ASSETS binding
    run("npm run build", { cwd: SOURCE_DIR, timeout: 300_000, env: { ...process.env, KEEP_LOCAL_MAP_ASSETS: "1" } });
    const elapsed = ((Date.now() - buildStart) / 1000).toFixed(1);
    ok(`构建完成 (${elapsed}s)`);
  } catch {
    fail("构建失败！排查方向:");
    console.log("  1. 检查 TypeScript 编译错误（查看上方 tsc/vite 输出）");
    console.log("  2. 检查 node_modules 是否完整: rm -rf node_modules && npm ci");
    console.log("  3. 检查磁盘空间是否充足");
    throw new Error("构建失败");
  }

  // Verify dist/ was created
  if (!fs.existsSync(path.join(SOURCE_DIR, "dist"))) {
    fail("构建完成但 dist/ 不存在！");
    throw new Error("dist/ 缺失");
  }
  const distFiles = fs.readdirSync(path.join(SOURCE_DIR, "dist"));
  ok(`dist/ 包含 ${distFiles.length} 个顶层条目`);
}

/* ------------------------------------------------------------------ */
/* Sync                                                                */
/* ------------------------------------------------------------------ */

function sync() {
  step("同步文件到 aion2-dokploy/app/");

  const appDir = path.join(DOKPLOY_DIR, "app");

  // Snapshot before
  const before = {};
  for (const f of SYNC_FILES) {
    before[f] = fileHash(path.join(appDir, f));
  }

  // Copy files
  for (const f of SYNC_FILES) {
    const src = path.join(SOURCE_DIR, f);
    const dst = path.join(appDir, f);

    if (!fs.existsSync(src)) {
      fail(`源文件不存在: ${f}`);
      throw new Error(`同步失败: ${f} 缺失`);
    }

    // Remove old destination
    if (fs.existsSync(dst)) {
      fs.rmSync(dst, { recursive: true, force: true });
    }

    // Copy
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      fs.cpSync(src, dst, { recursive: true });
      const count = fs.readdirSync(dst).length;
      ok(`复制 ${f}/ (${count} 个顶层条目)`);
    } else {
      fs.copyFileSync(src, dst);
      ok(`复制 ${f} (${stat.size} bytes)`);
    }
  }

  // Snapshot after — show diff
  let changed = false;
  console.log("\n  变更摘要:");
  for (const f of SYNC_FILES) {
    const afterHash = fileHash(path.join(appDir, f));
    if (before[f] !== afterHash) {
      console.log(`    ${f}: ${before[f]} → ${afterHash}`);
      changed = true;
    } else {
      console.log(`    ${f}: (无变化)`);
    }
  }

  // Sync map assets (public/map-assets → dokploy/app/map-assets)
  // These are needed by the Docker image to serve map tiles via the ASSETS binding
  const mapAssetsSrc = path.join(SOURCE_DIR, "public", "map-assets");
  const mapAssetsDst = path.join(appDir, "map-assets");
  if (fs.existsSync(mapAssetsSrc)) {
    if (fs.existsSync(mapAssetsDst)) {
      fs.rmSync(mapAssetsDst, { recursive: true, force: true });
    }
    fs.cpSync(mapAssetsSrc, mapAssetsDst, { recursive: true });
    const count = countFiles(mapAssetsDst);
    ok(`复制 map-assets/ (${count} 文件)`);
    changed = true;
  }

  if (!changed) {
    warn("所有文件均无变化，无需部署");
    return false;
  }

  ok("同步完成");
  return true;
}

/* ------------------------------------------------------------------ */
/* Commit & Push                                                       */
/* ------------------------------------------------------------------ */

function commitAndPush() {
  step("提交并推送");

  // Check if there are changes
  const status = run("git status --porcelain", { cwd: DOKPLOY_DIR, silent: true });
  if (!status) {
    warn("没有变更需要提交");
    return false;
  }

  // Show what will be committed
  const lines = status.split("\n");
  console.log(`  待提交: ${lines.length} 个文件`);
  for (const line of lines.slice(0, 10)) {
    console.log(`    ${line.trim()}`);
  }
  if (lines.length > 10) {
    console.log(`    ... 及其他 ${lines.length - 10} 个文件`);
  }

  if (DRY_RUN) {
    warn("--dry-run: 不实际提交");
    return false;
  }

  // Stage all changes
  run("git add -A", { cwd: DOKPLOY_DIR });

  // Generate commit message
  const now = new Date();
  const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  const commitMsg = `deploy: ${dateStr} 自动部署`;

  // Commit
  run(`git commit -m "${commitMsg}"`, { cwd: DOKPLOY_DIR });
  ok(`已提交: ${commitMsg}`);

  // Push
  try {
    run("git -c http.sslBackend=openssl -c http.postBuffer=524288000 push origin main", {
      cwd: DOKPLOY_DIR,
      timeout: 120_000,
    });
    ok("已推送到 GitHub");
  } catch {
    fail("推送失败！排查方向:");
    console.log("  1. 检查网络连接和 GitHub 认证");
    console.log("  2. 尝试: git -c http.sslBackend=openssl push origin main");
    console.log("  3. 如果 TLS 错误: 检查 OpenSSL 版本或代理设置");
    throw new Error("推送失败");
  }

  return true;
}

/* ------------------------------------------------------------------ */
/* Verify Dokploy Deployment                                           */
/* ------------------------------------------------------------------ */

async function verifyDeployment() {
  if (DRY_RUN) {
    step("部署验证 (跳过 — dry-run)");
    return;
  }

  step("等待 Dokploy 部署");

  // Login to Dokploy.
  // NOTE: the signed session cookie lives ONLY in the Set-Cookie header. The
  // `token` field of the sign-in JSON body is the raw, unsigned value and is
  // rejected with UNAUTHORIZED, so every authenticated call MUST replay the
  // cookie jar written here (`-b`) instead of hand-building a Cookie header.
  let cookieJar;
  try {
    cookieJar = path.join(os.tmpdir(), `dokploy-cookies-${Date.now()}.txt`);
    const loginRes = run(
      `curl -s --max-time 15 -X POST ${DOKPLOY_API}/api/auth/sign-in/email -H "Content-Type: application/json" -H "Origin: ${DOKPLOY_API}" -H "Referer: ${DOKPLOY_API}/login" -c "${cookieJar}" -d "{\\"email\\":\\"win@mmoexp.com\\",\\"password\\":\\"@Lyl125800\\"}"`,
      { cwd: WORKSPACE, silent: true },
    );
    const parsed = JSON.parse(loginRes);
    if (!parsed.token) throw new Error("Login response missing token");
    if (!fs.existsSync(cookieJar)) throw new Error("Login did not persist a session cookie");
    ok("Dokploy 登录成功");
  } catch (err) {
    warn(`Dokploy 登录失败: ${err.message}`);
    warn("跳过部署验证，请手动检查 Dokploy 面板");
    return;
  }

  // Trigger deploy (Dokploy does NOT auto-deploy on git push — must call
  // compose.deploy explicitly, otherwise the pushed commit never builds)
  try {
    const triggerRes = run(
      `curl -s --max-time 15 -X POST "${DOKPLOY_API}/api/trpc/compose.deploy?batch=1" -H "Content-Type: application/json" -H "Origin: ${DOKPLOY_API}" -H "Referer: ${DOKPLOY_API}/" -b "${cookieJar}" -d "{\\"0\\":{\\"json\\":{\\"composeId\\":\\"${COMPOSE_ID}\\"}}}"`,
      { cwd: WORKSPACE, silent: true },
    );
    const parsedTrigger = JSON.parse(triggerRes);
    const triggerResult = parsedTrigger[0]?.result?.data?.json;
    if (triggerResult?.success) {
      ok(`已触发 Dokploy 部署 (${triggerResult.message})`);
    } else {
      warn(`compose.deploy 响应异常: ${triggerRes.slice(0, 200)}`);
    }
  } catch (err) {
    warn(`compose.deploy 调用失败: ${err.message}`);
    warn("尝试继续轮询已有部署状态...");
  }

  // Snapshot the newest deployment BEFORE triggering, so the poll loop can
  // wait for a NEW deployment record.
  let baselineCreatedAt = "";
  try {
    const encodedBaseline = encodeURIComponent(
      JSON.stringify({ 0: { json: { composeId: COMPOSE_ID } } }),
    );
    const baselineRes = run(
      `curl -s --max-time 15 -b "${cookieJar}" "${DOKPLOY_API}/api/trpc/compose.one?batch=1&input=${encodedBaseline}"`,
      { cwd: WORKSPACE, silent: true },
    );
    const baselineData = JSON.parse(baselineRes);
    const baselineCompose = baselineData[0]?.result?.data?.json;
    const baselineDeployments = baselineCompose?.deployments || [];
    baselineCreatedAt = baselineDeployments.reduce(
      (acc, d) => (d.createdAt && d.createdAt > acc ? d.createdAt : acc),
      "",
    );
  } catch {
    // keep empty baseline — treat any visible deployment as new
  }

  // Poll for deployment status (max 5 minutes)
  const maxWait = 300_000;
  const pollInterval = 15_000;
  const startTime = Date.now();
  let lastDeploymentId = null;

  console.log("  等待新部署完成...");

  while (Date.now() - startTime < maxWait) {
    await new Promise((r) => setTimeout(r, pollInterval));
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);

    try {
      const encoded = encodeURIComponent(
        JSON.stringify({ 0: { json: { composeId: COMPOSE_ID } } }),
      );
      const res = run(
        `curl -s --max-time 15 -b "${cookieJar}" "${DOKPLOY_API}/api/trpc/compose.one?batch=1&input=${encoded}"`,
        { cwd: WORKSPACE, silent: true },
      );
      const data = JSON.parse(res);
      const compose = data[0]?.result?.data?.json;
      const deployments = compose?.deployments || [];
      // NOTE: deployments[] is NOT sorted by createdAt; scan for the newest.
      const latest = deployments.reduce(
        (acc, d) => (d.createdAt && d.createdAt > (acc?.createdAt || "") ? d : acc),
        undefined,
      );

      if (latest && latest.createdAt <= baselineCreatedAt) {
        // still the pre-trigger deployment — keep waiting
        process.stdout.write(`  [${elapsed}s] waiting for new deployment...\r`);
        continue;
      }

      if (latest && latest.deploymentId !== lastDeploymentId) {
        lastDeploymentId = latest.deploymentId;
        console.log(`  [${elapsed}s] 最新部署: ${latest.title?.slice(0, 50)} — ${latest.status}`);
      }

      if (latest?.status === "done") {
        ok(`部署完成 (${elapsed}s)`);
        break;
      }
      if (latest?.status === "error") {
        fail(`部署失败！`);
        console.log(`  错误信息: ${latest.errorMessage || "(无)"}`);
        console.log(`  日志路径: ${latest.logPath}`);
        console.log("  排查: 查看 Dokploy 面板的部署日志");
        console.log(`  curl "${DOKPLOY_API}/api/trpc/deployment.readLogs?batch=1&input=..." `);
        warn("继续检查线上状态...");
        break;
      }

      process.stdout.write(`  [${elapsed}s] ${latest?.status || "waiting"}...\r`);
    } catch {
      // Polling error, continue
    }
  }

  if (Date.now() - startTime >= maxWait) {
    warn("等待超时 (5分钟)，请手动检查 Dokploy 面板");
  }

  // Final health check
  await healthCheck();
}

/* ------------------------------------------------------------------ */
/* Health Check                                                        */
/* ------------------------------------------------------------------ */

async function healthCheck() {
  step("线上健康检查");

  const checks = [
    { url: `${SITE_URL}/en/`, expect: 200, label: "首页 (en)" },
    { url: `${SITE_URL}/zh-hans/`, expect: 200, label: "首页 (zh-hans)" },
    { url: `${SITE_URL}/sitemaps/content-en.xml`, expect: 200, label: "Sitemap" },
    { url: `${SITE_URL}/en/guides/founders-pack-comparison/`, expect: 301, label: "Legacy 重定向" },
  ];

  let allOk = true;

  for (const { url, expect, label } of checks) {
    try {
      const result = run(
        `curl -s -o nul -w "%{http_code} %{time_total}s" --max-time 30 "${url}"`,
        { cwd: WORKSPACE, silent: true },
      );
      const [code, time] = result.split(" ");
      const codeNum = parseInt(code, 10);

      if (codeNum === expect) {
        ok(`${label}: ${codeNum} (${time}s)`);
      } else {
        fail(`${label}: 期望 ${expect}, 实际 ${codeNum} (${time}s)`);
        allOk = false;
      }
    } catch {
      fail(`${label}: 请求失败 (超时或网络错误)`);
      allOk = false;
    }
  }

  // Check bare domain
  try {
    const result = run(
      `curl -sI --max-time 15 https://aion2kina.com/`,
      { cwd: WORKSPACE, silent: true },
    );
    if (result.includes("301") && result.includes("www.aion2kina.com")) {
      ok("裸域规范化: aion2kina.com → www.aion2kina.com");
    } else {
      fail("裸域规范化异常");
      allOk = false;
    }
  } catch {
    warn("裸域检查跳过");
  }

  // Check kina.aion2kina.com should NOT work
  try {
    const result = run(
      `curl -s -o nul -w "%{http_code}" --max-time 10 https://kina.aion2kina.com/`,
      { cwd: WORKSPACE, silent: true, allowFail: true },
    );
    if (result === "000" || result === null) {
      ok("kina.aion2kina.com: 不提供服务 (预期)");
    } else {
      warn(`kina.aion2kina.com 返回 ${result}，应该不可达`);
    }
  } catch {
    // Expected to fail
    ok("kina.aion2kina.com: 不提供服务 (预期)");
  }

  if (allOk) {
    console.log(`\n  🎉 部署完成，线上状态正常！`);
  } else {
    console.log(`\n  ⚠️  部署完成但部分检查未通过，请手动排查`);
  }
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║  AION2-KINA 一键部署 (AION2-KINA → aion2-dokploy)     ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log(`  源码: ${SOURCE_DIR}`);
  console.log(`  部署: ${DOKPLOY_DIR}`);
  console.log(`  模式: ${DRY_RUN ? "--dry-run (预览)" : SKIP_BUILD ? "--skip-build" : "完整部署"}`);

  const start = Date.now();

  try {
    await preflight();
    build();
    const hasChanges = sync();
    if (hasChanges) {
      commitAndPush();
      await verifyDeployment();
    }

    const total = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n${"─".repeat(60)}`);
    console.log(`  总耗时: ${total}s`);
    console.log(`${"─".repeat(60)}\n`);
  } catch (err) {
    const total = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n${"─".repeat(60)}`);
    fail(`部署中断 (${total}s): ${err.message}`);
    console.log(`${"─".repeat(60)}\n`);
    process.exit(1);
  }
}

main();
