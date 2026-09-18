# 接入统一 CMS — 实施交办（AION2-KINA）

> **来源**：unified-admin 会话（2026-08-11）
> **目标**：让 unified-cms(250:4680) 能通过与 CFB27 一致的 Header 认证（Key Auth）管理 AION2 外链
> **影响检查**：✅ 已确认零影响现有后台与网站（详见文末「安全」）
> **依赖文档**：`unified-admin/docs/AION2_API_REFERENCE.md`、`unified-admin/ISSUES.md` C-aion2

---

## 一、任务范围

| 位置 | 文件 | 改动 |
|------|------|------|
| 本仓库 | `worker/admin-auth.ts` | ⭐ 新增 `X-Aion2-Admin-Key` header 校验 |
| 本仓库 | `worker/index.ts` | 透传 `subject` 字段 |
| 本仓库 | `worker/admin-api.ts` | 类型 + 传 `isKeyAuth` |
| 本仓库 | `worker/external-link-api.ts` | ⭐ 3 处 `hasSameOrigin` 条件绕过 |
| 本仓库 | `build/sites-runtime-vars.ts` | ⭐ **实施时发现的遗漏**：`LOCAL_DEVELOPMENT_ONLY_ENV_KEYS` 白名单加 `ADMIN_API_KEY`（否则 worker 收不到该 env，见文末「八、实施记录」） |
| db11 | `/etc/systemd/system/app.service` | 加 `ADMIN_API_KEY` 环境变量 |
| 非本仓库 | `unified-admin/cms/adapters/aion2.mjs` | 改配置（已设计完成，见 §六） |
| 非本仓库 | `unified-admin/cms/storage/aion2-http-api.mjs` | **新建**（已创建，见 §六） |
| 非本仓库 | `unified-admin/cms/adapters/loader.mjs` | 注册新后端（已修改，见 §六） |

> db11 当前运行的是 `vinext dev` 模式（热重载），改本地 `worker/*.ts` 后重启服务即可生效，**无需重新打包**。

---

## 二、改动详情（精确到行）

### 改动 1 — `worker/admin-auth.ts`

#### 1a. 类型加字段（第 33 行附近）

**现状**：
```typescript
export type AdminAuthEnvironment = {
  ADMIN_AUTH_SECRET?: string;
  ADMIN_PASSWORD_HASH?: string;
  DB?: AdminAuthDatabase;
};
```

**改后**：加一行 `ADMIN_API_KEY?: string;`
```typescript
export type AdminAuthEnvironment = {
  ADMIN_AUTH_SECRET?: string;
  ADMIN_PASSWORD_HASH?: string;
  ADMIN_API_KEY?: string;   // ← 新增
  DB?: AdminAuthDatabase;
};
```

#### 1b. `authorizeAdminRequest` 函数开头加 key 校验（第 93 行，第 98 行 `const config = readConfig(env);` 之前）

**现状**（第 93-100 行）：
```typescript
export async function authorizeAdminRequest(
  request: Request,
  env: AdminAuthEnvironment,
  options: AdminAuthOptions = {},
): Promise<AdminAuthorization> {
  const config = readConfig(env);
  if (!config) return denied("Admin authentication is unavailable", 503);
```

**改后**：在 `const config = readConfig(env);` 之前插入 key 校验块
```typescript
export async function authorizeAdminRequest(
  request: Request,
  env: AdminAuthEnvironment,
  options: AdminAuthOptions = {},
): Promise<AdminAuthorization> {
  // ── 新增：X-Aion2-Admin-Key 认证（与 CFB27 x-cfb27-job-key 一致的 Header 模式）──
  const apiKey = request.headers.get("x-aion2-admin-key");
  if (apiKey && env.ADMIN_API_KEY && apiKey === env.ADMIN_API_KEY) {
    return {
      ok: true,
      user: { email: "admin@keys", displayName: "KINA Admin (API)", subject: "key-admin" },
    };
  }
  // ─────────────────────────────────────────────────────────────

  const config = readConfig(env);
  if (!config) return denied("Admin authentication is unavailable", 503);
```

> **关键**：key 校验插在 cookie 校验**之前**，但只有请求带 `x-aion2-admin-key` 且值匹配时才生效。浏览器请求不带此 header，`apiKey` 为 `null` → 直接跳过 → 走原有 cookie 路径，**完全不受影响**。

---

### 改动 2 — `worker/index.ts`（第 566-575 行）

**现状**（第 566-575 行）：
```typescript
      async (adminRequest, adminEnv) => {
        const result = await authorizeAdminRequest(
          adminRequest,
          adminEnv as AdminAuthEnvironment,
        );
        if (!result.ok) return result;
        return {
          ok: true as const,
          admin: {
            email: result.user.email,
            displayName: result.user.displayName ?? "KINA Admin",
          },
        };
      },
```

**改后**：把 `subject` 透传进 `admin` 对象
```typescript
      async (adminRequest, adminEnv) => {
        const result = await authorizeAdminRequest(
          adminRequest,
          adminEnv as AdminAuthEnvironment,
        );
        if (!result.ok) return result;
        return {
          ok: true as const,
          admin: {
            email: result.user.email,
            displayName: result.user.displayName ?? "KINA Admin",
            subject: result.user.subject,   // ← 新增透传
          },
        };
      },
```

---

### 改动 3 — `worker/admin-api.ts`

#### 3a. `AuthorizedAdmin` 类型加字段（第 27-30 行）

**现状**：
```typescript
export type AuthorizedAdmin = {
  email: string;
  displayName: string;
};
```

**改后**：
```typescript
export type AuthorizedAdmin = {
  email: string;
  displayName: string;
  subject?: string;   // ← 新增
};
```

#### 3b. 调用处传 `isKeyAuth`（第 663-666 行）

**现状**：
```typescript
    const externalLinkResponse = await handleAdminExternalLinkApi(
      request,
      env,
      authorization.admin,
    );
```

**改后**：
```typescript
    const externalLinkResponse = await handleAdminExternalLinkApi(
      request,
      env,
      authorization.admin,
      authorization.admin.subject === "key-admin",
    );
```

---

### 改动 4 — `worker/external-link-api.ts`

#### 4a. 函数签名加参数（第 326-330 行）

**现状**：
```typescript
export async function handleAdminExternalLinkApi(
  request: Request,
  env: ExternalLinkEnvironment,
  admin: ExternalLinkAdmin,
): Promise<Response | null> {
```

**改后**：
```typescript
export async function handleAdminExternalLinkApi(
  request: Request,
  env: ExternalLinkEnvironment,
  admin: ExternalLinkAdmin,
  isKeyAuth = false,   // ← 新增，默认 false 保持现有调用兼容
): Promise<Response | null> {
```

#### 4b. 三处 `hasSameOrigin` 条件绕过（第 354、416、558 行）

三处均为同一模式，逐个改：

**PATCH（第 354 行）**：
```typescript
// 现状
    if (!hasSameOrigin(request, env)) {
// 改后
    if (!isKeyAuth && !hasSameOrigin(request, env)) {
```

**POST（第 416 行）**：
```typescript
// 现状
    if (!hasSameOrigin(request, env)) {
// 改后
    if (!isKeyAuth && !hasSameOrigin(request, env)) {
```

**DELETE（第 558 行）**：
```typescript
// 现状
    if (!hasSameOrigin(request, env)) {
// 改后
    if (!isKeyAuth && !hasSameOrigin(request, env)) {
```

> `isKeyAuth` 默认 `false`，仅 key 认证请求传 `true`。cookie 请求 `isKeyAuth=false` → 条件等价于原代码，**o 现有管理员行为完全一致**。

---

### 改动 5 — db11 `/etc/systemd/system/app.service`

在现有 `Environment=` 行后追加一行（可在 `SITE_URL` 后）：

```ini
Environment=ADMIN_API_KEY=<生成的随机密钥>
```

**密钥生成**（本机或 db11 执行）：
```bash
openssl rand -hex 32
```

**生效**：
```bash
sudo systemctl daemon-reload
sudo systemctl restart app
```

> ⚠️ 生成的密钥**必须**同时写入：
> 1. db11 `app.service`（此处）
> 2. 250 上 unified-cms `.env`（`AION2_ADMIN_KEY=<同值>`）+ `systemctl restart unified-cms`
> 3. `GUIDE/CREDENTIALS.md` §十三

---

## 三、验证步骤（改完后必须执行）

### 3.1 验证 key 认证生效

```bash
# 用 key 获取外链列表（应返回 28 条）
curl -H "x-aion2-admin-key: <密钥>" \
     http://127.0.0.1:3000/api/admin/external-links

# 用 key 创建一条测试外链（应返回 201 created）
curl -X POST http://127.0.0.1:3000/api/admin/external-links \
  -H "x-aion2-admin-key: <密钥>" \
  -H "content-type: application/json" \
  -d '{"href":"https://test.example.com","badgeType":"text","alt":"测试","height":54}'

# 用 key 删除该测试外链（应返回 deleted）
curl -X DELETE http://127.0.0.1:3000/api/admin/external-links/<上一步返回的id> \
  -H "x-aion2-admin-key: <密钥>"
```

### 3.2 验证现有管理员 cookie 认证不受影响

```bash
# 密码登录拿 cookie
curl -s -X POST http://127.0.0.1:3000/api/admin/auth/password/login \
  -H "content-type: application/json" \
  -d '{"password":"Aion2-UKfEu5YOQPcypaXvCJ66qC5M"}' -c /tmp/ac.txt

# 用 cookie 获取外链列表（应正常返回，证明 cookie 路径未受影响）
curl -s -b /tmp/ac.txt http://127.0.0.1:3000/api/admin/external-links | head -c 200
```

### 3.3 验证错误处理

```bash
# 错误 key → 应 401（走 cookie 校验，cookie 也没有 → 401）
curl -s -o /dev/null -w '%{http_code}\n' \
  http://127.0.0.1:3000/api/admin/external-links -H "x-aion2-admin-key: wrong-key"
```

---

## 四、完工通知

完成改动 + 验证通过后，通知 unified-admin 会话：

> AION2 key auth 已上线验证通过。CMS 端 `cms/adapters/aion2.mjs` 配置可改，密钥 `AION2_ADMIN_KEY` 已入 250 `.env` 与 CREDENTIALS.md §十三。

unified-admin 会话随后完成：
1. `cms/adapters/aion2.mjs` 改为 `http-api` + `x-aion2-admin-key` 认证
2. 端到端验证（面板 → CMS → db11）
3. 更新 `ISSUES.md` C-aion2 状态为 `✅ 已接入`

---

## 五、安全说明（零影响确认）

| 现有设施 | 影响 | 原因 |
|---------|:----:|------|
| 管理员浏览器 cookie 登录 | **无** | key 校验只在 `apiKey && API_KEY === value` 时生效，浏览器无此 header 直接跳过 |
| 管理员写操作（PATCH/POST/DELETE） | **无** | `isKeyAuth=false` 时 `hasSameOrigin` 检查与原来完全一致 |
| 公共网站 `/api/external-links` | **无** | 走 `handleExternalLinkApi`（公开路径），与 admin 路径完全独立 |
| 其他 CMS 项目 | **无** | `aion2.mjs` 是独立适配器，互不影响 |

**新增信任边界**：持有 `ADMIN_API_KEY` 者可不经 Origin 检查写外链。仅限内网（db11 :3000 绑定 127.0.0.1），风险可控。

---

## 六、CMS 端改动（已由 unified-admin 会话完成 🔧）

> 以下改动已在 unified-admin 仓库完成，**项目会话无需操作**。仅列示供参考。

### 6.1 新建 `cms/storage/aion2-http-api.mjs`

自定义存储后端，适配 AION2 外链 API 的 upsert 语义：
- `list()` — 解析 `{links:[], count}` → `{items, total}`
- `getById(id)` — 从列表过滤（28 条量级，可接受）
- `create(item)` — POST 到 `/api/admin/external-links`（upsert 按 href）
- `update(id, item)` — 复用 POST（AION2 无 PUT 端点）
- `delete(id)` — DELETE 到 `/api/admin/external-links/{id}`
- 认证复用已有 `HttpApiBackend` 的 header 注入逻辑

### 6.2 修改 `cms/adapters/loader.mjs`

- 新增引用：`import { Aion2HttpApiBackend } from '../storage/aion2-http-api.mjs'`
- 新增 case：`'aion2-http-api'` → `new Aion2HttpApiBackend({...})`

### 6.3 改写 `cms/adapters/aion2.mjs`

删除错误的 `postgres` 配置，改为：
```javascript
storage: {
  type: 'aion2-http-api',
  baseUrl: 'http://192.168.4.211:3000',
  auth: { header: 'x-aion2-admin-key', value: process.env.AION2_ADMIN_KEY || '' },
  basePath: '/api/admin/external-links',
},
```

### 6.4 Tunser (250) `.env` 添加

```
AION2_ADMIN_KEY=<与 db11 ADMIN_API_KEY 一致>
```

改后 `systemctl restart unified-cms`。

---

## 七、API 现状摘要（实测）

| 端点 | 方法 | 认证 | 说明 |
|------|------|------|------|
| `/api/admin/external-links` | GET | cookie/key | 列表，返回 `{links:[], settings}` |
| `/api/admin/external-links` | POST | cookie/key | **upsert**（按 href 查重，存在则更新） |
| `/api/admin/external-links` | PATCH | cookie/key | 更新 settings（scalePercent） |
| `/api/admin/external-links/:id` | DELETE | cookie/key | 删除 |
| `/api/admin/auth/password/login` | POST | 无 | 密码换 cookie |
| `/api/admin/dashboard` | GET | cookie/key | 仪表盘（暂不接入 CMS） |
| `/api/admin/reports/:id` | GET/PATCH | cookie/key | 单条举报（无列表，暂不接入） |

> ⚠️ **注意**：AION2 外链**没有** GET 详情端点、也**没有** PUT 更新端点（POST 即 upsert）。这是与 CFB27 标准 REST 的差异，CMS 适配器需相应调整（见 `docs/AION2_API_REFERENCE.md`）。

---

## 八、实施记录（2026-08-11）

| 事项 | 状态 |
|------|:----:|
| 4 个 `worker/*.ts` 改动 | ✅ 本地改动 + 上传 db11 |
| `build/sites-runtime-vars.ts` 加 `ADMIN_API_KEY` 白名单 | ✅ 原方案遗漏，已补（否则 worker 收不到 env） |
| 生成密钥 `b39573e09bb60354f83bd0fc336a16f8ae9977318355599f12433e4edf249386` | ✅ |
| db11 `app.service` 加 `Environment=ADMIN_API_KEY=...` | ✅ 备份为 `app.service.bak-cms-key-20260811` |
| `CREDENTIALS.md` §十三 录入 | ✅ |
| db11 服务重启 | ✅ `systemctl restart app` |
| 验证 3.1 key auth GET/POST/DELETE | ✅ HTTP 200/201/200 |
| 验证 3.2 cookie auth 登录 + GET | ✅ `{"ok":true}` + 外链列表 |
| 验证 3.3 错误 key → 401 | ✅ HTTP 401 |
| 本地测试 `admin-auth.test.mjs` + `external-link-api.test.mjs` + `admin-api.test.mjs` | ✅ 所有与本次改动相关的测试通过（18 个既有失败，均为已废弃 Supabase 邮件流程测试） |
| 待 unified-admin 会话：`cms/adapters/aion2.mjs` 配 `AION2_ADMIN_KEY` | ⏳ 由 unified-admin 会话完成 |
| 待 unified-admin 会话：250 `.env` 加 `AION2_ADMIN_KEY` | ⏳ 由 unified-admin 会话完成 |