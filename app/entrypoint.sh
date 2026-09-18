#!/bin/sh
# AION2-KINA entrypoint — 复刻 db11 app.service 运行形态
#
# db11 权威配置（GUIDE/archive/AION2-KINA-DB11-DEPLOY-20260803.md §五 §六）：
#   ExecStart=/usr/bin/npx vinext dev --port 3000 --hostname 127.0.0.1
#   Environment=X_LOCAL_EXPLORER=false WRANGLER_WRITE_LOGS=false ...
#   ⚠️ 不含 NODE_ENV（Vite 仅在 NODE_ENV 未设时走 development 管线）

set -e

# ── 环境变量（复刻 db11 app.service）──────────────────────────────────
# NODE_ENV 必须不设：设 production 会与 Vite dev 管线冲突
unset NODE_ENV
export X_LOCAL_EXPLORER=false
export WRANGLER_WRITE_LOGS=false

# ── 数据初始化 ────────────────────────────────────────────────────────
# vinext dev 用【项目根】.wrangler/state/v3
STATE_DIR="/app/.wrangler/state/v3"
INIT_STATE="/app/init-data/wrangler-state/v3"

mkdir -p "$STATE_DIR"

# --- D1 ---
D1_DIR="$STATE_DIR/d1/miniflare-D1DatabaseObject"
INIT_D1="$INIT_STATE/d1/miniflare-D1DatabaseObject"
if [ -d "$INIT_D1" ] && [ ! -f "$D1_DIR/metadata.sqlite" ]; then
  echo "[entrypoint] Initializing D1 database..."
  mkdir -p "$D1_DIR"
  for f in "$INIT_D1"/*.sqlite*; do
    [ -e "$f" ] || continue
    case "$(basename "$f")" in *.broken*) continue ;; esac
    cp "$f" "$D1_DIR/"
  done
  # miniflare D1 为 WAL 模式：主库换入后必须删除残留 -wal/-shm，
  # 否则 WAL 会污染新库（db11 文档 §七 第2条踩过此坑）
  rm -f "$D1_DIR"/*.sqlite-wal "$D1_DIR"/*.sqlite-shm
  echo "[entrypoint] D1 initialized ($(du -sh "$D1_DIR" | cut -f1))"
fi

# --- R2 ---
R2_DIR="$STATE_DIR/r2/miniflare-R2BucketObject"
INIT_R2="$INIT_STATE/r2/miniflare-R2BucketObject"
if [ -d "$INIT_R2" ] && [ ! -f "$R2_DIR/metadata.sqlite" ]; then
  echo "[entrypoint] Initializing R2..."
  mkdir -p "$R2_DIR"
  cp -r "$INIT_R2"/. "$R2_DIR/" 2>/dev/null || true
fi

# --- cache ---
CACHE_DIR="$STATE_DIR/cache/miniflare-CacheObject"
INIT_CACHE="$INIT_STATE/cache/miniflare-CacheObject"
if [ -d "$INIT_CACHE" ] && [ ! -f "$CACHE_DIR/metadata.sqlite" ]; then
  echo "[entrypoint] Initializing cache..."
  mkdir -p "$CACHE_DIR"
  cp -r "$INIT_CACHE"/. "$CACHE_DIR/" 2>/dev/null || true
fi

# --- game data ---
DATA_DIR="/app/data"
INIT_DATA="/app/init-data/app-data"
if [ -d "$INIT_DATA" ] && [ ! -f "$DATA_DIR/.initialized" ]; then
  echo "[entrypoint] Initializing game data..."
  mkdir -p "$DATA_DIR"
  cp -r "$INIT_DATA"/. "$DATA_DIR/" 2>/dev/null || true
  touch "$DATA_DIR/.initialized"
fi

echo "[entrypoint] NODE_ENV=${NODE_ENV:-<unset>}"
echo "[entrypoint] STATE_DIR=$STATE_DIR"
echo "[entrypoint] Starting: $@"
exec "$@"
