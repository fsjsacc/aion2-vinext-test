# AION2-KINA 性能优化方案

> 文档版本：2026-08-12（第二次更新，含实测数据分析）
> 检查范围：db11（192.168.4.211）+ Tunser（192.168.4.250）— aion2kina.com 生产环境
> 检查方法：SSH 远程 + curl 定时分解 + 系统状态分析 + 多轮延迟测试

---

## 一、当前性能基线

### 延迟分层对比（IPv4-only 实测）

| 测量路径 | TTFB | 总耗时 | 相对基线 |
|----------|------|--------|----------|
| LAN 直连 `http://192.168.4.211/zh-hans/` | **0.19s** | **0.19s** | ✅ 应用本身正常 |
| 公网 `https://www.aion2kina.com/zh-hans/`（IPv4，warm） | **1.7-2.1s** | **2.4-2.9s** | ❌ 慢 10-15 倍 |
| 公网 `https://www.aion2kina.com/zh-hans/`（IPv6，含 DNS 超时） | 3.0-8.0s | 3.9-9.2s | ❌ 偶发灾难级 |

### 公网请求时间分解（warm，IPv4-only）

```
[应用 SSR 渲染: 0.19s]  ← 本地运行，正常
[TLS 握手:      0.5-0.9s]  ← Cloudflare 隧道（SaaS 证书路径）
[TCP 连接:      0.16-0.41s]  ← Cloudflare 边缘→隧道
[DNS 解析:      < 0.01s]  ← IPv4 正常（IPv6 可达 5s+）
```

### 关键发现汇总

| 发现 | 详情 | 影响 |
|------|------|------|
| **DNS 配置问题** | `/etc/resolv.conf` 含 IPv6 DNS（`240e:46:4088::4088`），偶发 5s 超时 | 造成偶发 8s+ 总延迟 |
| **隧道健康** | 云隧道运行 4 天，状态 active，52M 内存，cloudflared 2026.7.3 | 本身无问题 |
| **证书** | SSL Corp Cloudflare TLS Issuing ECC CA 4，有效期至 2026-11-05 | 正常 |
| **静态缓存** | 静态资源 `Cache-Control: no-cache`（浏览器每次重新验证） | 重复访问浪费带宽 |
| **动态缓存** | CDN 端已配置 `s-maxage=600, stale-while-revalidate=86400` | 正常 |
| **Gzip** | 动态内容已由 vinext 压缩（188KB→42KB） | 不需要额外配置 |
| **内存** | db11 3.8GB 总量，2.9GB 已用，988MB swap 已用 | 有压力 |
| **Tunser 内存** | 3.8GB 总量，仅 570MB 已用，0 swap | 充裕 |

---

## 二、诊断出的问题

### 问题 1：❌ 公网延迟（P0）

**症状**：公网 TTFB 1.7-2.1s（warm），偶发 8s+（IPv6 DNS 超时）

**根因分析**（已实测验证）：

| 因素 | 实测 | 占比 |
|------|------|------|
| 应用 SSR 渲染（LAN 直连） | 0.19s | 7-8% |
| Cloudflare 隧道 + SaaS 证书 | 1.5-1.8s | 70-80% |
| IPv6 DNS 超时（偶发） | +5s | 灾难级 |

**DNS 具体问题**：
- `/etc/resolv.conf` 的 nameserver 顺序：`192.168.44.2` → `240e:46:4088::4088`（IPv6）→ `240e:46:4888::4888`（IPv6）→ `192.168.4.1` → `223.5.5.5`
- IPv6 DNS 服务器 `240e:46:4088::4088` 可能不可达，glibc resolver 逐个尝试导致 5s 超时
- `curl` 默认启用 Happy Eyeballs（IPv6 优先），触发 IPv6 DNS 查询

**隧道延迟**：
- Tunser 的 cloudflared 运行正常（4 天 uptime，52M 内存）
- 隧道回环（db11→公网→CF→隧道→db11）耗时约 3s（含 DNS）
- 纯隧道 + CF 边缘延迟约 1.5-2s（ipv4-only warm），这是 Cloudflare SaaS 证书路径的固有延迟

### 问题 2：⚠️ 静态资源 `Cache-Control: no-cache`（P1）

**症状**：静态文件（如 `aion2-dual.webp` 206KB）返回 `Cache-Control: no-cache`，浏览器每次重新验证。

**根因分析**：
- nginx 将所有请求代理到 `vinext dev` 服务器
- `vinext dev` 不设置静态资源缓存头
- 未在 nginx 层添加静态资源缓存规则

**影响**：123MB 静态资源（91MB map-assets + 24MB sprites + 其他）每次加载完整传输

### 问题 3：⚠️ 内存压力（P2）

**症状**：988 MiB swap 已用，活跃内存超物理内存。

**主要消耗者**：
- `workerd serve`（miniflare D1 模拟器）：1.9 GB（49.2%）
- `vinext dev`：545 MB（13.7%）
- `MemoryMax=3000M` 已设 cgroup 上限

### 问题 4：⚠️ 应用运行在 `vinext dev` 开发模式（P2）

**症状**：本地 TTFB 0.19s 对开发模式来说尚可，但比生产模式慢。

**现状**：
- `systemctl cat app` 确认 `ExecStart=/usr/bin/npx vinext dev --port 3000 --hostname 0.0.0.0`
- `dist/` 目录存在（8 月 5 日构建），有 `client/` + `server/` 子目录
- `dist/server/index.js` 约 10MB
- 存在 `vinext start` 命令，但**未验证**是否支持 miniflare D1 本地绑定

---

## 三、优化方案（按优先级排序）

### P0：修复 DNS 配置（新发现，快速见效）

| 项目 | 内容 |
|------|------|
| **目标** | 消除 IPv6 DNS 超时导致的偶发 8s+ 延迟 |
| **预期效果** | 消除 5s+ 的 DNS 超时；公网延迟稳定在 2-3s |
| **操作步骤** | 修改 `/etc/resolv.conf`，方案 A（推荐）：<br>```bash<br># 先备份<br>sudo cp /etc/resolv.conf /etc/resolv.conf.bak<br># 写入新配置（仅保留 IPv4 DNS）<br>sudo tee /etc/resolv.conf << 'EOF'<br>search localdomain<br>nameserver 192.168.4.1<br>nameserver 223.5.5.5<br>EOF<br>```<br>或者方案 B（保留 IPv6 但放最后）：<br>```bash<br>sudo tee /etc/resolv.conf << 'EOF'<br>search localdomain<br>nameserver 192.168.4.1<br>nameserver 223.5.5.5<br>nameserver 192.168.44.2<br>nameserver 240e:46:4088::4088<br>nameserver 240e:46:4888::4888<br>EOF<br>``` |
| **风险** | 低。`/etc/resolv.conf` 由 NetworkManager 管理，重启 network 或被覆盖。可用 `chattr +i` 锁定 |
| **验证方法** | 修改后运行 `nslookup www.aion2kina.com` 确认响应时间 < 0.01s |

### P1：nginx 静态资源缓存

| 项目 | 内容 |
|------|------|
| **目标** | 对静态资源添加浏览器缓存策略 |
| **预期效果** | 重复访问时浏览器缓存命中，减少回源请求；减少带宽消耗 |
| **操作步骤** | 在 `/etc/nginx/conf.d/00-default.conf` 的 `proxy_pass` 主 location 前添加：<br>```nginx<br>location ~* \.(webp|avif|png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$ {<br>    expires 7d;<br>    add_header Cache-Control "public, immutable";<br>    proxy_pass http://127.0.0.1:3000;<br>}<br>```<br>然后 `nginx -t && systemctl reload nginx` |
| **风险** | 低。map-assets 通过版本化 manifest 管理，`immutable` 安全 |
| **验证方法** | `curl -I http://127.0.0.1/aion2-dual.webp` 检查 `Cache-Control` 头 |

### P1：优化 DNS 配置（可选替代方案）

| 项目 | 内容 |
|------|------|
| **目标** | 在 `/etc/resolv.conf` 中禁用 IPv6 DNS |
| **操作步骤** | 通过 NetworkManager 配置：<br>`nmcli con mod "Wired connection 1" ipv6.dns ""` |
| **风险** | 低。NetworkManager 可能覆盖手动修改 |
| **验证方法** | 修改后 `nslookup www.aion2kina.com` 应仅返回 IPv4 地址 |

### P2：切换生产模式 `vinext start`

| 项目 | 内容 |
|------|------|
| **前提** | 需验证 `vinext start` 是否支持 miniflare D1 绑定 |
| **测试方法** | 1. 在 db11 上 `cd /opt/app/aion2kina && npm run build`<br>2. 用测试配置启动：`KEEP_LOCAL_MAP_ASSETS=1 SITE_URL=https://www.aion2kina.com ADMIN_AUTH_SECRET=... ADMIN_PASSWORD_HASH=... vinext start --port 3001`<br>3. 测试首页、文章页、地图页、D1 查询页面<br>4. 验证通过后修改 `app.service` |
| **操作步骤** | 修改 `/etc/systemd/system/app.service`：<br>`ExecStart=/usr/bin/npx vinext start --port 3000 --hostname 0.0.0.0`<br>`systemctl daemon-reload && systemctl restart app` |
| **风险** | 中。`vinext start` 可能不兼容 miniflare D1 绑定，导致 D1 查询失败 |
| **回滚** | 改回 `ExecStart=/usr/bin/npx vinext dev --port 3000 --hostname 0.0.0.0` |

### P2：增加 db11 内存

| 项目 | 内容 |
|------|------|
| **目标** | 消除 swap 使用，消除偶发延迟尖峰 |
| **操作步骤** | VM 层面调整内存分配（4GB → 8GB） |
| **风险** | 中。涉及 VM 关机，需确认 host 资源 |

---

## 四、建议执行顺序

```
第1步（P0）：修复 DNS 配置 → 消除 IPv6 超时，快速见效（< 5分钟，0风险）
    │
第2步（P1）：nginx 静态资源缓存 → 降低重复访问带宽（< 5分钟，低风险）
    │
第3步（P2验证）：测试 vinext start 生产模式兼容性
    │
第4步（P2）：切换生产模式（如兼容）
    │
第5步（P2）：增加 db11 内存（如可行）
```

**隧道延迟说明**：Cloudflare SaaS 证书路径的 1.5-2s 延迟在隧道架构下是固有损耗。修复 DNS 后公网延迟稳定在 2-3s（而非经过精确的 8s+），对体验改善明显。如需进一步降低隧道延迟，需考虑架构调整（如直接在 db11 运行 cloudflared 消除 Tunser 跳转，或使用 Cloudflare Spectrum 直连）。

---

## 五、地图数据 CF 边缘缓存尝试（结论：不可行）

### 背景

地图数据 `/data/aion2-map-data.json`（1.8MB）与 `/data/aion2-map-i18n.json`（1.3MB）冷回源经 Cloudflare 隧道慢（~15KB/s，16-30s），超过原 15s 客户端超时 → 地图报 timed out。已用 45s 超时兜底（`9729b48`）。

### 尝试 1：nginx Cache-Control

nginx `/data/` 直读 + `Cache-Control: public, max-age=86400` → `cf-cache-status` 始终 **DYNAMIC**，失败。已回退。

### 尝试 2：CF Cache Rule（www + apex 两域名）

用户给 token 加 Cache Rules 权限后，API 在 cfb27.com zone 创建 Cache Rule：
```
(http.host in {"www.aion2kina.com" "aion2kina.com"} and starts_with(http.request.uri.path, "/data/"))
→ cache eligible, edge_ttl override 86400, browser_ttl override 3600
```
ruleset id `d4b8d0889aac4462ac87c795f57d1d74`。结果仍 **DYNAMIC**，失败。规则保留（无害）。

### 结论

aion2kina.com 走 **Cloudflare for SaaS / 隧道自定义主机名**，自定义主机名**不继承 SaaS zone 缓存规则**，CF 边缘缓存对此架构**不可行**。

**要秒开只能**：① 独立 CDN 托管地图数据；② 减小地图数据体积（拆分/压缩）。

---

## 六、附录：检查命令速查

```bash
# DNS 检查
nslookup www.aion2kina.com
cat /etc/resolv.conf

# 延迟测试（IPv4-only，避免 IPv6 干扰）
curl -4 -s -o /dev/null -w 'dns=%{time_namelookup}s connect=%{time_connect}s tls=%{time_appconnect}s ttfb=%{time_starttransfer}s total=%{time_total}s\n' https://www.aion2kina.com/zh-hans/

# 缓存头检查
curl -I http://127.0.0.1/aion2-dual.webp | grep -i cache

# 静态文件大小
curl -s -o /dev/null -w '%{size_download} bytes\n' http://127.0.0.1/aion2-dual.webp

# 隧道状态（Tunser）
systemctl status cloudflared
cloudflared version

# 内存
free -h
swapon --show
cat /proc/meminfo | grep -E 'Swap|MemAvailable|MemFree'

# 证书检查
openssl s_client -connect www.aion2kina.com:443 -servername www.aion2kina.com 2>/dev/null < /dev/null | openssl x509 -noout -subject -dates -issuer
```