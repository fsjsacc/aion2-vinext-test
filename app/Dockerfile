# AION2-KINA — Dokploy Docker 部署（复刻 db11）
#
# 目标：在容器内完整复刻 db11 的 app.service 运行形态
#   db11:    npx vinext dev --port 3000 --hostname 127.0.0.1
#   Docker:  npx vinext dev --port 3000 --hostname 0.0.0.0
#
# 为什么必须用 vinext dev 而不是 vinext start：
#   db11 文档 §五 第1条（🔴）实测 —— `vinext start` 是纯生产预览，
#   不注入 Cloudflare bindings（ASSETS/MAP_ASSETS/D1/vars），
#   /map-runtime/* 全 502、后台 503、地图交互不可用。
#   切换为 `vinext dev`（miniflare 本地运行时，bindings 完整）后
#   manifest/bundle/tile 全 200，图标正常。
#
# 为什么不用现状的 wrangler dev --local：
#   vinext dev  = vinext 自己拉起 miniflare，bindings 全自动注入
#   wrangler dev = 外部 CLI 拉起，bindings 需手工配
#                  （改 wrangler.json / .dev.vars / state 路径），
#                  且 dist/server/index.js 不含 vinext dev server 的静态资源层
#
# 为什么不需要 dist/：
#   vinext dev 是源码模式（Vite dev server），从源码实时编译。
#   已实测：无 dist/ 时 /en/、/health、/sprites/*、/map-runtime/* 全部正常，
#          且 4508 个 marker 的图标 100% 命中 sprite atlas。
#   dist/ 只是 `vinext build` 的产物，供 `vinext start` 使用，dev 模式不需要。

FROM node:22-bookworm-slim

WORKDIR /app

# ── 依赖 ──────────────────────────────────────────────────────────────
# ⚠️ vinext / vite / wrangler 均在 devDependencies
#    绝对不能加 --omit=dev，否则 vinext CLI 不存在
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ── 源码（vinext dev 需要完整源码，非纯产物模式）─────────────────────
COPY .openai/ ./.openai/
COPY app/ ./app/
COPY build/ ./build/
COPY config/ ./config/
COPY db/ ./db/
COPY drizzle/ ./drizzle/
COPY public/ ./public/
COPY scripts/ ./scripts/
COPY worker/ ./worker/
COPY data/ ./data/
COPY *.ts *.mjs *.json ./

# ── entrypoint（必须显式 COPY，*.* 通配不含 .sh）────────────────────────
COPY entrypoint.sh /app/entrypoint.sh

# ── 初始化数据（D1 / R2 / cache / game data）──────────────────────────
COPY init-data/ /app/init-data/

# ── miniflare state 目录 ──────────────────────────────────────────────
# 注意：vinext dev 用【项目根】.wrangler/state/v3
#       不是 wrangler dev 方案的 dist/server/.wrangler/
RUN mkdir -p /app/.wrangler/state/v3 && chmod +x /app/entrypoint.sh

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/en/').then(r=>{if(!r.ok)throw 1})" || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npx","vinext","dev","--port","3000","--hostname","0.0.0.0"]
