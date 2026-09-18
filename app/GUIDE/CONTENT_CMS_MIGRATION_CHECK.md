# 内容全量迁移（方案 D：globalThis）— 实施前检查报告

> **日期**：2026-08-11
> **会话**：AION2-KINA 项目会话（只读检查，未做任何修改）
> **前置**：news 试点已完成（`GUIDE/CONTENT_CMS_MIGRATION.md` §八）
> **目标**：确认全量迁移 4 个内容类型（news + guides + classes + database，278 条）到 D1（方案 D）的前置条件

---

## 一、代码状态

| 文件 | 当前状态 | 待改？ |
|------|:--------:|:------:|
| `worker/index.ts` `readContentFromDatabase` | `WHERE section = 'news'` 硬编码 | **是** — 需去 section 过滤 |
| `worker/index.ts` 内容读取方式 | **header 注入**（`encodeContentOverrideRecords` + `TRUSTED_CONTENT_OVERRIDES_HEADER`） | **是** — 需改 globalThis |
| `app/content-overrides.ts` | 读 **header**（`next/headers`） | **是** — 需改读 globalThis |
| `app/[locale]/news/[slug]/page.tsx` | 已改 async + DB 覆盖（参照） | 否 |
| `app/[locale]/guides/[slug]/page.tsx` | 同步 `getContentEntry("guides", slug)` | **是** |
| `app/[locale]/classes/[slug]/page.tsx` | 同步 `getContentEntry("classes", slug)` | **是** |
| `app/[locale]/database/[slug]/page.tsx` | 同步 `getContentEntry("database", slug)` | **是** |
| `app/_components/hub/HubPage.tsx:264` | 同步 `getContentEntries(section)`（在 async 函数内） | **是** |
| `worker/admin-api.ts` `/api/admin/content` | CRUD 完整（GET/POST/PUT/DELETE） | 否 |
| `scripts/content/export-to-d1.mjs` | 支持 `--section` 过滤，默认全量导出 | 否（结构已就绪） |

### 1.1 worker/index.ts 现状

- `readContentFromDatabase(db, slug?)` 两个分支均硬编码 `WHERE section = 'news'`
- 内容以 **header 注入** 方式传递：读 D1 → `encodeContentOverrideRecords` → 设置 `TRUSTED_CONTENT_OVERRIDES_HEADER`
- 通过 `newsSlugMatch`（URL 正则）按当前请求的 slug 只注入单条（~8KB，规避 32KB header 上限）

### 1.2 app/content-overrides.ts 现状

- 通过 `next/headers` 读取 `TRUSTED_CONTENT_OVERRIDES_HEADER`
- 解析为 `Map<"section/slug", ContentEntry>`
- 方案 D 需改为读 `globalThis.__dbContent`（保留 header 兜底）

### 1.3 详情页现状

| 页面 | `resolveContent` | 状态 |
|------|:----------------:|:----:|
| news | async + `getContentOverrides()` DB 覆盖优先 | ✅ 已完成（参照） |
| guides | 同步 `getContentEntry("guides", slug)` | ⏳ 待改 |
| classes | 同步 `getContentEntry("classes", slug)` | ⏳ 待改 |
| database | 同步 `getContentEntry("database", slug)` | ⏳ 待改 |

### 1.4 worker/admin-api.ts CRUD（已完整）

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/admin/content` | GET | 列表，支持 `?section=` |
| `/api/admin/content` | POST | 创建 |
| `/api/admin/content/:id` | GET | 详情 |
| `/api/admin/content/:id` | PUT | 更新 |
| `/api/admin/content/:id` | DELETE | 删除 |

已通过 key auth（`x-aion2-admin-key`）保护，`isKeyAuth` 绕过 `hasSameOrigin`。

### 1.5 迁移脚本 export-to-d1.mjs（已就绪）

- 支持 `--section` 过滤（如 `--section=news`）
- 不传则默认导出 `contentRegistry` 全部条目
- 结构已适配全量导出，无需改动

---

## 二、运行时状态（SSH db11，只读）

| 项 | 值 |
|----|-----|
| D1 DB 文件大小 | 3,690,496 bytes (~3.5 MB) |
| `content_entries` 总条数 | **19**（仅 news） |
| 各 section 分布 | `news \| 19`，guides/classes/database 均 **0** |
| `/api/admin/content?section=news` key auth | 返回 19 条 ✅ |
| workerd RSS | **922,972 KB** (~923 MB) |
| vinext (node) RSS | 818,756 KB (~819 MB) |
| 方案 D 估算（278 条 → ~20-30 MB） | workerd 约 →950 MB，可接受 |
| `globalThis.__dbContent` 当前使用 | **无人使用**（worker 0 处，app 0 处） |

> **内存可行性**：当前 workerd 923 MB，全量 278 条（每条 ~35.9 KB → JS 对象 ~20-30 MB）后约 950 MB，占比仍可控。

---

## 三、方案 D 必改文件状态

| # | 文件 | 当前 | 需改 |
|:-:|------|------|:----:|
| 1 | `worker/index.ts` | header 注入 + `WHERE section='news'` | 去 section 过滤 + 写入 `globalThis.__dbContent` |
| 2 | `app/content-overrides.ts` | 读 header | 读 `globalThis`（保留 header 兜底） |
| 3 | `app/[locale]/guides/[slug]/page.tsx` | 同步 `getContentEntry` | async + DB 覆盖 |
| 4 | `app/[locale]/classes/[slug]/page.tsx` | 同步 `getContentEntry` | async + DB 覆盖 |
| 5 | `app/[locale]/database/[slug]/page.tsx` | 同步 `getContentEntry` | async + DB 覆盖 |
| 6 | `app/_components/hub/HubPage.tsx:264` | 同步 `getContentEntries` | 合并 DB 内容 |

---

## 四、发现的额外引用点（方案文档未覆盖）

以下文件调用了 `getContentEntry`/`getContentEntries`，但方案 D 文档未明确列出：

| 文件 | 行 | 调用 | 影响评估 |
|------|:--:|------|:--------:|
| `app/[locale]/author/pfg/page.tsx` | 496 | `getContentEntries().slice(0, 6)` | 作者页最新 6 篇，全量推广后应自动包含 DB 内容 |
| `app/[locale]/page.tsx` | 142-143 | `getContentEntries("guides")[0]` + `getContentEntries("news")` | 首页推荐，**已列方案「可缓」** |
| `app/[locale]/page.tsx` | 175 | `getContentEntry("database", "map-data-methodology")` | 首页数据方法论，**已列方案「可缓」** |
| `app/[locale]/[...missing]/page.tsx` | 26 | `getContentEntry(identity.section, identity.slug)` | 兜底路由，**已列方案「可缓」** |
| `app/_components/content/ContentDetail.tsx` | 145 | `getContentEntry(relation.section, relation.slug)` | 相关内容卡片，DB 内容应能关联 |
| `app/map-app/MapSeoChrome.tsx` | 81 | `getContentEntry(section, slug)` | 地图 SEO 覆盖，影响较小 |
| `app/search-index.ts` | 139 | `for (const entry of getContentEntries())` | 搜索索引，全量推广后应自动包含 DB 内容 |

> **新增注意点**：`author/pfg`、`ContentDetail`、`MapSeoChrome`、`search-index` 4 处为方案文档未覆盖项。其中 `search-index.ts` 需特别关注——全量推广后搜索应能搜到 DB 内容；其余 3 处影响较小（数据源合并后自动生效）。

---

## 五、结论

- **方案 D 前置：满足** — `globalThis.__dbContent` 当前完全无人使用，共享变量空间干净
- **可开始实施：是** — 6 必改文件当前状态清晰：
  - 已完成：news 详情页、`/api/admin/content` CRUD、`db/schema.ts` 表、`export-to-d1.mjs`
  - 待改：`worker/index.ts`（去 section 过滤 + globalThis）、`app/content-overrides.ts`（读 globalThis）、guides/classes/database 详情页、`HubPage.tsx`
- **额外引用点**：7 处，其中 4 处方案文档未覆盖，需在实施时一并评估（尤其 `search-index.ts`）
- **内存可行**：当前 workerd 923 MB，全量后约 950 MB，可接受

---

*本报告为只读检查结论，未修改任何代码、未重启服务、未运行迁移。*