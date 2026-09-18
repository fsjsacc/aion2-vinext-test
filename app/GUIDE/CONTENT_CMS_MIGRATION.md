# 内容套件（文章/事件）接入统一 CMS — 实施交办（AION2-KINA）

> **来源**：统一 CMS 会话（2026-08-11）
> **目标**：让 AION2 的文章/事件内容通过统一 CMS 管理
> **方案**：A1 — 内容迁移 D1 + SSR 运行时读取（复用外链 header 注入模式）
> **依赖**：`unified-admin/docs/AION2_CONTENT_CMS_MIGRATION_PLAN.md`（方案文档）
> **影响检查**：只改内容数据源，不改渲染方式、不改 content-registry 核心逻辑、不改构建管线

---

## 一、任务范围

| 位置 | 文件 | 改动 |
|------|------|------|
| 本仓库 | `db/schema.ts` | ⭐ 新增 `content_entries` + `content_tags` 表 |
| 本仓库 | `scripts/content/export-to-d1.mjs` | **新建**：迁移脚本 |
| 本仓库 | `worker/index.ts` | ⭐ 新增 `readContentFromDatabase` + header 注入 |
| 本仓库 | `app/content-overrides.ts` | **新建**：内容覆盖读取 |
| 本仓库 | `app/[locale]/news/[slug]/page.tsx` | 改页面组件优先用 DB 内容 |
| 本仓库 | `worker/admin-api.ts` | ⭐ 新增 `/api/admin/content` CRUD |
| 非本仓库 | `unified-admin/cms/**` | CMS 端（另会话负责，见 §六） |

> db11 运行 `vinext dev`（热重载），改 `worker/*.ts` 后重启服务即可生效，**无需重新打包**。

---

## 二、改动详情（精确到代码）

### 改动 1 — `db/schema.ts` 新增内容表

在文件末尾（`analyticsJourneyEvents` 表之后）追加：

```typescript
export const contentEntries = sqliteTable("content_entries", {
  id: text("id").primaryKey(),
  section: text("section").notNull(),
  slug: text("slug").notNull(),
  schemaType: text("schema_type").notNull(),
  publishedAt: text("published_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  readingMinutes: integer("reading_minutes").notNull(),
  publicationJson: text("publication_json").notNull(),
  sourcesJson: text("sources_json"),
  heroImageJson: text("hero_image_json"),
  primaryActionJson: text("primary_action_json"),
  propertiesJson: text("properties_json"),
  relatedJson: text("related_json").notNull(),
  translationsJson: text("translations_json").notNull(),
}, (table) => [
  uniqueIndex("content_entries_section_slug_idx").on(table.section, table.slug),
  index("content_entries_section_updated_idx").on(table.section, table.updatedAt),
]);

export const contentTags = sqliteTable("content_tags", {
  entryId: text("entry_id").notNull().references(() => contentEntries.id),
  locale: text("locale").notNull(),
  keyword: text("keyword").notNull(),
}, (table) => [
  primaryKey({ columns: [table.entryId, table.locale, table.keyword] }),
  index("content_tags_keyword_idx").on(table.keyword),
]);
```

> ⚠️ 需确认 drizzle 已从 `drizzle-orm/sqlite-core` 导入 `uniqueIndex`、`references`（当前 schema.ts 已导入 `uniqueIndex`、`primaryKey`、`index`、`text`、`integer`，`references` 需确认）。

**迁移命令**（生成并应用 D1 表）：
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

### 改动 2 — 迁移脚本（新增 `scripts/content/export-to-d1.mjs`）

从现有 `contentRegistry` 导出所有内容到 D1：

```javascript
// scripts/content/export-to-d1.mjs
import { contentRegistry } from "../../app/content-registry";
import { randomUUID } from "node:crypto";

export async function exportContentToDatabase(db) {
  const entries = contentRegistry;
  let inserted = 0;
  for (const entry of entries) {
    const id = randomUUID();
    await db.prepare(
      `INSERT INTO content_entries
        (id, section, slug, schema_type, published_at, updated_at, reading_minutes,
         publication_json, sources_json, hero_image_json, primary_action_json,
         properties_json, related_json, translations_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, entry.section, entry.slug, entry.schemaType,
      entry.publishedAt, entry.updatedAt, entry.readingMinutes,
      JSON.stringify(entry.publication),
      entry.sources ? JSON.stringify(entry.sources) : null,
      entry.heroImage ? JSON.stringify(entry.heroImage) : null,
      entry.primaryAction ? JSON.stringify(entry.primaryAction) : null,
      entry.properties ? JSON.stringify(entry.properties) : null,
      JSON.stringify(entry.related),
      JSON.stringify(entry.translations),
    ).run();
    inserted++;
  }
  return { total: entries.length, inserted };
}
```

> ⚠️ 迁移脚本需在 `vinext dev` 环境下运行（依赖 `env.DB` binding），建议通过一个临时 admin 路由或 miniflare 的 D1 API 执行。**先只导出 news section 试点**。

---

### 改动 3 — `worker/index.ts` 内容读取 + header 注入

#### 3a. 新增 `readContentFromDatabase` 函数（在文件顶部 imports 之后）

```typescript
type ContentOverrideDatabase = { prepare(query: string): { all(): Promise<{ results: unknown[] }> } };

async function readContentFromDatabase(db: ContentOverrideDatabase) {
  const { results } = await db.prepare(
    `SELECT section, slug, schema_type, published_at, updated_at, reading_minutes,
            publication_json, sources_json, hero_image_json, primary_action_json,
            properties_json, related_json, translations_json
     FROM content_entries WHERE section = 'news'`
  ).all();
  return results;
}
```

#### 3b. 新增 header 常量（在文件顶部，`TRUSTED_EXTERNAL_LINKS_HEADER` 附近）

```typescript
const TRUSTED_CONTENT_OVERRIDES_HEADER = "x-aion2-content-overrides";
```

#### 3c. 注入 header（修改第 922-938 行的外链接入代码块，追加内容读取）

在 `if (localizedDocumentPath && env?.DB)` 块内，外链接入之后追加：

```typescript
    if (localizedDocumentPath && env?.DB) {
      try {
        // ... 现有外链接入代码不变 ...

        // ── 新增：读取内容覆盖 ──
        const contentOverrides = await readContentFromDatabase(
          env.DB as unknown as ContentOverrideDatabase,
        );
        if (contentOverrides.length > 0) {
          requestHeaders.set(
            TRUSTED_CONTENT_OVERRIDES_HEADER,
            JSON.stringify(contentOverrides),
          );
        }
      } catch {
        // Public pages remain available if content storage is unavailable.
      }
    }
```

> ⚠️ **header 长度限制**：Cloudflare Worker header 上限约 32KB。news 内容 JSON 可能超限。**若超限**，改为 header 只传 `section/slug/indexable` 列表（轻量索引），组件再按需查 DB。**第一版先只传 `en` 源语言**（`translations_json` 只保留 `en` 键）。

---

### 改动 4 — 新增 `app/content-overrides.ts`

```typescript
import { headers } from "next/headers";
import type { ContentEntry } from "./content-registry";
import type { SiteLocale } from "./site-config";

const TRUSTED_CONTENT_OVERRIDES_HEADER = "x-aion2-content-overrides";

export async function getContentOverrides(): Promise<
  Map<string, ContentEntry>
> {
  const requestHeaders = await headers();
  const raw = requestHeaders.get(TRUSTED_CONTENT_OVERRIDES_HEADER);
  if (!raw) return new Map();
  try {
    const rows = JSON.parse(raw) as ContentEntry[];
    const map = new Map<string, ContentEntry>();
    for (const row of rows) {
      map.set(`${row.section}/${row.slug}`, row);
    }
    return map;
  } catch {
    return new Map();
  }
}
```

---

### 改动 5 — `app/[locale]/news/[slug]/page.tsx` 优先用 DB 内容

**现状**（`resolveContent` 是同步，第 10-15 行）：
```typescript
function resolveContent(localeValue: string, slug: string) {
  if (!isSiteLocale(localeValue)) notFound();
  const entry = getContentEntry("news", slug);
  if (!entry) notFound();
  return { entry, locale: localeValue as SiteLocale };
}
```

**改后**（改为 async，优先用 DB 覆盖）：
```typescript
async function resolveContent(localeValue: string, slug: string) {
  if (!isSiteLocale(localeValue)) notFound();
  const overrides = await getContentOverrides();
  const entry = overrides.get(`news/${slug}`) ?? getContentEntry("news", slug);
  if (!entry) notFound();
  return { entry, locale: localeValue as SiteLocale };
}
```

调用处同步改为 await：
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const { entry, locale } = await resolveContent(localeValue, slug);
  return buildContentMetadata(entry, locale);
}

export default async function NewsDetailRoute({ params }: Props) {
  const { locale: localeValue, slug } = await params;
  const { entry, locale } = await resolveContent(localeValue, slug);
  return <ContentDetail entry={entry} locale={locale} />;
}
```

---

### 改动 6 — `worker/admin-api.ts` 新增 `/api/admin/content` CRUD

#### 6a. 新增内容 CRUD 处理函数（添加到 `handleAdminApi` 之前）

参考 `handleAdminExternalLinkApi` 的模式（含 `isKeyAuth` 绕过 hasSameOrigin）：

```typescript
const CONTENT_LIST_PATTERN = /^\/api\/admin\/content$/u;
const CONTENT_DETAIL_PATTERN = /^\/api\/admin\/content\/([0-9a-f-]{36})$/u;

export async function handleAdminContentApi(
  request: Request,
  env: AdminApiEnvironment,
  admin: AuthorizedAdmin,
  isKeyAuth: boolean,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (!CONTENT_LIST_PATTERN.test(url.pathname) && !CONTENT_DETAIL_PATTERN.test(url.pathname)) {
    return null;
  }
  if (!isKeyAuth && !hasSameOrigin(request, env)) {
    return json({ error: "请求来源无效。" }, 403);
  }

  // GET 列表（section 过滤）
  if (url.pathname === "/api/admin/content" && request.method === "GET") {
    const section = url.searchParams.get("section");
    const sql = section
      ? `SELECT * FROM content_entries WHERE section = ? ORDER BY updated_at DESC`
      : `SELECT * FROM content_entries ORDER BY updated_at DESC`;
    const { results } = await env.DB.prepare(sql)
      .bind(section ?? null)
      .all();
    return json({ entries: results });
  }

  // POST 创建
  if (url.pathname === "/api/admin/content" && request.method === "POST") {
    const payload = await request.json();
    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO content_entries (id, section, slug, schema_type, published_at, updated_at,
        reading_minutes, publication_json, sources_json, hero_image_json, primary_action_json,
        properties_json, related_json, translations_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, payload.section, payload.slug, payload.schemaType,
      payload.publishedAt, payload.updatedAt, payload.readingMinutes,
      JSON.stringify(payload.publication),
      payload.sources ? JSON.stringify(payload.sources) : null,
      payload.heroImage ? JSON.stringify(payload.heroImage) : null,
      payload.primaryAction ? JSON.stringify(payload.primaryAction) : null,
      payload.properties ? JSON.stringify(payload.properties) : null,
      JSON.stringify(payload.related),
      JSON.stringify(payload.translations),
    ).run();
    return json({ id, ...payload }, 201);
  }

  // GET/PUT/DELETE 详情
  const detailMatch = url.pathname.match(CONTENT_DETAIL_PATTERN);
  if (detailMatch) {
    const id = detailMatch[1];
    if (request.method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM content_entries WHERE id = ?").bind(id).all();
      return json(results[0] ?? null);
    }
    if (request.method === "PUT") {
      const payload = await request.json();
      await env.DB.prepare(
        `UPDATE content_entries SET section=?, slug=?, schema_type=?, published_at=?, updated_at=?,
          reading_minutes=?, publication_json=?, sources_json=?, hero_image_json=?,
          primary_action_json=?, properties_json=?, related_json=?, translations_json=?
         WHERE id = ?`
      ).bind(payload.section, payload.slug, payload.schemaType, payload.publishedAt,
        payload.updatedAt, payload.readingMinutes, JSON.stringify(payload.publication),
        payload.sources ? JSON.stringify(payload.sources) : null,
        payload.heroImage ? JSON.stringify(payload.heroImage) : null,
        payload.primaryAction ? JSON.stringify(payload.primaryAction) : null,
        payload.properties ? JSON.stringify(payload.properties) : null,
        JSON.stringify(payload.related), JSON.stringify(payload.translations), id,
      ).run();
      return json({ id, ...payload });
    }
    if (request.method === "DELETE") {
      await env.DB.prepare("DELETE FROM content_entries WHERE id = ?").bind(id).run();
      return json({ deleted: true });
    }
  }
  return json({ error: "Method not allowed" }, 405);
}
```

#### 6b. 在 `handleAdminApi` 中调用（第 655-660 行，`handleAdminExternalLinkApi` 之后）

```typescript
    const contentResponse = await handleAdminContentApi(
      request,
      env,
      authorization.admin,
      authorization.admin.subject === "key-admin",
    );
    if (contentResponse) return contentResponse;
```

---

## 三、验证步骤（改完后必须执行）

### 3.1 验证 D1 内容表已建

```bash
# SSH db11，确认 content_entries 表存在
cd /opt/app/aion2kina && npx drizzle-kit check
```

### 3.2 验证迁移脚本

```bash
# 运行迁移脚本（需在 vinext dev 环境）
npx tsx scripts/content/export-to-d1.mjs
```

### 3.3 验证 header 注入

```bash
# 访问站点，确认返回 x-aion2-content-overrides header
curl -sI https://www.aion2kina.com/news/<slug> -H "Accept: text/html" | grep -i content-overrides
```

### 3.4 验证 CMS 内容 CRUD

```bash
# 用 key 获取内容列表
curl -H "x-aion2-admin-key: <密钥>" \
  http://127.0.0.1:3000/api/admin/content?section=news
```

### 3.5 验证现有管理员不受影响

```bash
# cookie 登录仍正常
curl -s -X POST http://127.0.0.1:3000/api/admin/auth/password/login \
  -H "content-type: application/json" \
  -d '{"password":"Aion2-UKfEu5YOQPcypaXvCJ66qC5M"}' -c /tmp/ac.txt
# 用 cookie 读内容（应正常）
curl -s -b /tmp/ac.txt http://127.0.0.1:3000/api/admin/content?section=news | head -c 200
```

---

## 四、完工通知

AION2 会话完成 db11 端改动 + 验证通过后，通知统一 CMS 会话：

> AION2 内容迁移 db11 端已完成验证通过。`/api/admin/content` CRUD 可用，header 注入正常。CMS 端可接适配器。

统一 CMS 会话随后完成：
1. `cms/storage/aion2-content-http-api.mjs`（复用外链后端模式）
2. `cms/adapters/aion2-content.mjs` + `loader.mjs` 注册
3. Tunser `.env` + 重启 CMS
4. 端到端验证 + 更新 ISSUES.md

---

## 五、安全说明（零影响确认）

| 现有设施 | 影响 | 原因 |
|---------|:----:|------|
| 现有内容渲染（SSR） | **无** | 只改数据源（DB 覆盖优先），不改渲染逻辑 |
| `content-registry.ts` 核心 | **无** | 不改 `getContentEntry`，只在页面组件加 DB 覆盖回退 |
| 多语言管线 | **无** | 第一版只管理 `en`，其他语言沿用现有 `generated.json` |
| 公共网站 SEO | **无** | SSR 返回完整 HTML，与现状一致 |
| 其他 CMS 项目 | **无** | 独立适配器 |

**新增信任边界**：`/api/admin/content` 写操作需 key auth。内网可接受。

---

## 六、附：CMS 端改动概要（统一 CMS 会话执行）

### 6.1 `cms/storage/aion2-content-http-api.mjs`
- 复用 `Aion2HttpApiBackend` 模式，`basePath: '/api/admin/content'`
- 处理 translations_json 的 `en` 源语言字段映射

### 6.2 `cms/adapters/aion2-content.mjs`
```javascript
storage: {
  type: 'aion2-content-http-api',
  baseUrl: 'http://192.168.4.211:3000',
  auth: { header: 'x-aion2-admin-key', value: process.env.AION2_ADMIN_KEY || '' },
  basePath: '/api/admin/content',
},
```

### 6.3 `loader.mjs` 注册 + Tunser `.env` + 重启 CMS

---

## 七、API 现状摘要

| 端点 | 方法 | 认证 | 说明 |
|------|------|------|------|
| `/api/admin/content` | GET | cookie/key | 列表，支持 `?section=news` |
| `/api/admin/content` | POST | cookie/key | 创建 |
| `/api/admin/content/:id` | GET/PUT/DELETE | cookie/key | 详情/更新/删除 |

---

## 八、实施记录（2026-08-11）

| 事项 | 状态 |
|------|:----:|
| `db/schema.ts` 新增 `content_entries` + `content_tags` | ✅ 迁移 `0011_dark_rhino.sql` 已生成并应用 |
| 迁移应用 | ✅ 直接写入 D1 SQLite（`__appgarden_migrations` 已跟踪 0011） |
| 数据导出 | ✅ 19 条 news 条目已从编译 bundle 导出到 D1 |
| `worker/index.ts` 内容读取 + header 注入 | ✅ 按当前请求 slug 只注入单条（~8KB，<24KB 上限） |
| `app/content-overrides.ts` + `app/content-override-values.ts` | ✅ 新建 |
| `app/[locale]/news/[slug]/page.tsx` | ✅ resolveContent 改 async，DB 覆盖优先 |
| `worker/admin-api.ts` `/api/admin/content` CRUD | ✅ 复用 key auth |
| 验证：content API key 返回 19 条 | ✅ HTTP 200 |
| 验证：cookie 登录 | ✅ `{"ok":true}`（curl 无 origin header 时 content 读取被 hasSameOrigin 阻止，属预期） |
| 验证：header 注入 | ✅ `x-aion2-content-overrides` 注入（单条 ~8KB） |
| 验证：端到端 DB 覆盖 | ✅ 标记测试 `MARKER=True`，页面渲染 DB 内容，测试后已还原 |
| 本地测试 | ✅ tsc 零错误；admin-api/external-link-api 相关测试通过（既有 content-routes 发布验证失败无关） |

> ⚠️ **header 长度决策**：原方案全体注入会超限（19 条 en-only ~73KB > 32KB）。已改为 worker 按当前 URL slug 注入单条（~8KB），页面组件按需读取。其他语言仍走 `getContentTranslation` fallback。
> 
> **待统一 CMS 会话**：`cms/storage/aion2-content-http-api.mjs`、`cms/adapters/aion2-content.mjs` + `loader.mjs`、Tunser `.env` 配 `AION2_ADMIN_KEY`、端到端验证、更新 ISSUES.md C-aion2。