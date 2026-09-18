import vinext from "vinext";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json";
import { toolRegistry } from "./app/tool-registry";
import { createSitesRuntimeVars } from "./build/sites-runtime-vars";
import { sites } from "./build/sites-vite-plugin";
import mapManifest from "./public/map-assets/manifest.json";
import { assertLiveToolRouteFiles } from "./scripts/validate-tool-routes.mjs";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig(async ({ command }) => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  if (command === "build") {
    await assertLiveToolRouteFiles({ root: process.cwd(), tools: toolRegistry });
  }

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  const localBindingConfig = {
    main: "./worker/index.ts",
    compatibility_flags: ["nodejs_compat"],
    vars: createSitesRuntimeVars(
      command,
      mapManifest.versionKey,
      process.env,
    ),
    assets: {
      binding: "ASSETS",
    },
    d1_databases: d1
      ? [
          {
            binding: d1,
            database_name: "site-creator-d1",
            database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
          },
        ]
      : [],
    r2_buckets: r2
      ? [
          {
            binding: r2,
            bucket_name: "site-creator-r2",
          },
        ]
      : [],
  };

  return {
    // ── 依赖预打包（optimizeDeps）──────────────────────────────────────
    // lucide-react 的每个图标模块首行都是 `"use client"`。若让 Vite 对它
    // 做预打包，rsc 环境会把它当成 client component 再 optimize 一遍，
    // 于是 rsc/ssr/client 三个环境各自持有一份 **browserHash 不同** 的
    // react 依赖链。当 RSC 渲染结果（如 vinext 的 shims/slot.js）被 rsc
    // 环境 transform 时，注入的 `/node_modules/.vite/deps/react.js?v=<rsc hash>`
    // 在 client 侧不存在 → 404/504 → React shared internals 为 null →
    // "Cannot read properties of null (reading 'useContext')" → 整页崩溃。
    //
    // Vite 自身在启动时会就此打印 warning 并明确给出这条修复建议：
    //   [vite] (rsc) warning: client component dependency is inconsistently
    //   optimized. It's recommended to add the dependency to 'optimizeDeps.exclude'.
    //
    // 排除后 lucide-react 走源码 ESM 直连（它本身已是 ESM 产物），
    // 不再产生第二份带不同 hash 的依赖链。
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
    server: {
      // 允许的 Host 头白名单。Vite 默认会校验 Host 以防 DNS rebinding，
      // 不在列表内的一律拒绝（返回 403 "Blocked request"）。
      // EXTRA_ALLOWED_HOSTS 用于临时/隔离环境注入额外域名（逗号分隔），
      // 生产环境不设置该变量时行为与此前完全一致。
      allowedHosts: [
        "aion2kina.com",
        "www.aion2kina.com",
        "aion2.cfb27.com",
        ...(process.env.EXTRA_ALLOWED_HOSTS?.split(",")
          .map((host) => host.trim())
          .filter(Boolean) ?? []),
      ],
      ...(isCodexSeatbeltSandbox && { watch: { useFsEvents: false, usePolling: true } }),
    },
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
