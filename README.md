# AION2-KINA — 临时隔离验证部署

**目的**：在 Dokploy 上验证「`vinext dev` 运行时」能否完整复刻 db11 的地图标记图标行为。

**性质**：临时验证包。验证通过后，同样的运行时改动再应用到线上 `kina` compose。

---

## 1. 为什么会有这个包

`www.aion2kina.com` 迁移到 Dokploy 后，地图页 `/tools/map/` 的所有标记图标显示为空。
db11（迁移前设备）上同一功能正常。

根因（已定位，见 `GUIDE/archive/AION2-KINA-DB11-DEPLOY-20260803.md` §五）：

```
db11（正常）：   npx vinext dev  --port 3000 --hostname 127.0.0.1
                  ↑ vinext 自己拉起 miniflare，Cloudflare bindings 全自动注入
                    （ASSETS / MAP_ASSETS / D1 / R2 / vars）

Dokploy（坏）：  npx wrangler dev dist/server/index.js --local --port 3001
                  ↑ 外部 CLI 拉起 miniflare，bindings 需手工配
                    （7 处补丁：改 wrangler.json / 生成 .dev.vars / strip legacy_env
                     / 改 assets.directory / compose 的 ASSETS 变量 / nginx 加 CORP 头）
                    且 dist/server/index.js 是纯 Worker 产物，
                    不含 vinext dev server 的静态资源层
```

**结论**：迁移时用 `wrangler dev` 替代了 db11 的 `vinext dev`，导致 bindings 半通不通。

---

## 2. 本包与 db11 的唯一差异

```
db11:    npx vinext dev --port 3000 --hostname 127.0.0.1
本包:    npx vinext dev --port 3000 --hostname 0.0.0.0     ← 仅此一处
```

架构与内容与 db11 **完全一致**。

---

## 3. 运行时形态（复刻 db11 app.service）

| 项 | db11 原值 | 本包值 |
|---|---|---|
| 启动命令 | `npx vinext dev --port 3000 --hostname 127.0.0.1` | `npx vinext dev --port 3000 --hostname 0.0.0.0` |
| `NODE_ENV` | **不设**（Vite 仅在未设时走 development 管线） | **不设**（entrypoint 里 `unset`） |
| `X_LOCAL_EXPLORER` | `false` | `false` |
| `WRANGLER_WRITE_LOGS` | `false` | `false` |
| miniflare state | 项目根 `.wrangler/state/v3` | `/app/.wrangler/state/v3` |
| 内存限制 | MemoryHigh 2500M / MemoryMax 3000M | `mem_limit: 3g` / `memswap_limit: 4g` |
| 反向代理 | nginx → 127.0.0.1:3000 | nginx → app:3000 |

---

## 4. 架构

```
CF 橙云
  │
  ▼
Traefik (443, Dokploy 托管)
  │  Host(`test.aion2kina.com`)
  ▼
nginx:80  (本仓库 nginx/)
  │  proxy_pass http://app:3000
  │  deny /cdn-cgi /__debug        ← 只挡 miniflare Explorer
  │  放行 /@fs /@vite /@id         ← Vite dev server 正常路径，必须放行
  ▼
app:3000  (node:22-bookworm-slim, vinext dev)
  │
  ├── /app/.wrangler/state/v3   ← D1 / R2 / cache（volume 持久化）
  └── /app/data                 ← 游戏数据（volume 持久化）
```

---

## 5. 目录结构

```
.
├── docker-compose.yml          nginx + app 两个服务
├── .env.example                环境变量模板（真实凭据不进仓库）
├── nginx/
│   ├── Dockerfile
│   └── default.conf            反代 + dev 内部路径屏蔽
├── tools/
│   ├── verify-runtime.mjs      逐路径验证 HTTP 状态与字节数
│   ├── check-sprite-coverage.mjs   单地图 marker → sprite atlas 覆盖率
│   └── check-all-maps.mjs      全地图覆盖率汇总
└── app/
    ├── Dockerfile
    ├── entrypoint.sh           state 初始化（D1/R2/cache/game data）
    └── <完整项目源码>
```

---

## 6. 关键设计点

### 6.1 镜像必须含完整源码

`vinext dev` 是 Vite dev server 模式，从源码实时编译，**不读 `dist/`**。
实测：移除 `dist/` 后 `/en/`、`/health`、`/sprites/*`、`/map-runtime/*` 全部正常。
`dist/` 只是 `vinext build` 的产物，供 `vinext start` 使用。

### 6.2 `npm ci` 不能加 `--omit=dev`

`vinext` / `vite` / `wrangler` **全部在 `devDependencies`**。
加 `--omit=dev` 会导致 vinext CLI 不存在，容器启动即失败。

### 6.3 `NODE_ENV` 绝对不能设

Vite 仅在 `NODE_ENV` 未设时走 development 管线。设成 `production` 会与 dev 管线冲突。
entrypoint 里显式 `unset NODE_ENV`。

### 6.4 state 路径是**项目根** `.wrangler/state/v3`

不是 `wrangler dev` 方案的 `dist/server/.wrangler/state/v3`。这是两套运行时的差异点。

### 6.5 D1 换库后必须删除残留 WAL

miniflare D1 是 WAL 模式。主库文件换入后若残留 `-wal` / `-shm`，WAL 会污染新库。
entrypoint 在 copy 后执行 `rm -f *.sqlite-wal *.sqlite-shm`。
（db11 文档 §七 第 2 条踩过此坑）

### 6.6 `package-lock.json` 曾被修复

原 lock 文件存在不一致：`node_modules/pbf` 声明 `4.0.2`，但实际安装 `5.1.2`，
导致 `npm ci` 直接失败（`lock file's pbf@4.0.2 does not satisfy pbf@5.1.2`）。
已用 `npm install` 重新生成 lock，现 `pbf@5.1.2` 正确 dedupe。

> ⚠️ 这是**潜伏地雷**：任何全新环境的 `npm ci` 都会失败，包括当前线上 `kina` compose 的下一次重建。
> 线上部署仓库的 `package-lock.json` 也需要同步修复。

---

## 7. 验证清单

部署后执行：

```bash
# 1. 运行时端点
node tools/verify-runtime.mjs https://test.aion2kina.com <versionKey> verify_out

# 2. 全地图图标覆盖率（核心验收项）
node tools/check-all-maps.mjs https://test.aion2kina.com
```

### 预期结果

```
结果 | 状态 |     字节数 | 用途             | 路径
OK   200    172459  html             /en/
OK   200    175044  html             /zh-hans/
OK   200    119018  html             /en/tools/map/
OK   200         2  text             /health
OK   200     52116  sprite-json      /sprites/aion2.json
OK   200   2535541  sprite-png       /sprites/aion2.png
OK   200     29851  map-sprite-json  /sprites/maps/verteron.json
OK   200   1876206  map-data         /data/aion2-map-data.json
OK   200   1303817  map-i18n         /data/aion2-map-i18n.json
OK   200     12183  manifest         /map-runtime/manifest.json
OK   200      2360  icon             /map-runtime/releases/<vk>/icons/*.webp
OK   200     58856  tile             /map-runtime/releases/<vk>/maps/tiles/*.webp
```

```
地图                           标记数   atlas      命中      缺失  状态
verteron                    1830     299    1830       0  ✅ 全覆盖
altgard                     1469     239    1469       0  ✅ 全覆盖
eltnen                       725      18     725       0  ✅ 全覆盖
chaotic-lower-reshanta       346      15     346       0  ✅ 全覆盖
chaotic-middle-reshanta      135      10     135       0  ✅ 全覆盖
chaotic-upper-reshanta         3       3       3       0  ✅ 全覆盖
合计标记 4508，缺失 0 → ✅ 全部图标可解析
```

**核心验收项**：浏览器打开 `/tools/map/`，点击标记，图标正常显示。

> ℹ️ `/map-runtime/releases/<vk>/sprites/*` 与 `.../data/*` 返回 404 是**设计如此**。
> `worker/index.ts` 的 `VERSIONED_MAP_ASSET_PATH` 白名单只允许 `icons|maps`。
> 前端实际请求 `https://<origin>/sprites/maps/<slug>`（绝对、非版本化路径），
> 由 `MapLibreMap.tsx:598` 构造，不经过 `resolveMapAssetUrl`。这两条 404 不影响图标。

---

## 8. 与线上 `kina` compose 的隔离

| 项 | 线上 kina | 本验证包 |
|---|---|---|
| compose 名 | `kina` | `vinext-test` |
| 域名 | `www.aion2kina.com` / `aion2kina.com` | `test.aion2kina.com` |
| Traefik router | `aion2-kina` | `aion2-vinext-test` |
| volume | `wrangler-state` / `app-data` | `vinext-test-state` / `vinext-test-data` |
| 端口 | 3001 | 3000 |

**两者完全独立，验证过程不影响线上。db11 保持运行，不做任何改动。**

### DNS 配置（已完成）

`test.aion2kina.com` 已在 Cloudflare 创建 A 记录：

```
zone    aion2kina.com        5444fe07aa23b1166525744ffd9e4543  (Jimsky88 账号)
record  test.aion2kina.com   A -> 2.25.206.13   proxied=true
id      2cbf7648184fe1f2cc2dc62196bbf961
```

流量路径：`CF 橙云 → 2.25.206.13:443 (Traefik) → nginx:80 → app:3000`

> 与线上 `www.aion2kina.com` 用同一条 A 记录模式（`A → 2.25.206.13` + 橙云），
> 由 Traefik 按 Host 头分流，互不干扰。

---

## 9. 待办

- [x] 在 Cloudflare 为 `test.aion2kina.com` 添加 A 记录 → `2.25.206.13`（橙云代理）
- [ ] 验证通过后，把同样的运行时改动应用到线上 `kina` compose
- [ ] 同步修复线上部署仓库的 `package-lock.json`（pbf 版本不一致）
