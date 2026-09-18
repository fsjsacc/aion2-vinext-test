# AION2 内容全量迁移（方案 D：globalThis）— 交接文档

> **来源**：AION2-KINA 项目会话（2026-08-11）
> **交付对象**：统一 CMS 会话（先检查）
> **状态**：✅ 248 测试环境验证通过，6 文件改动已完成，等待部署到 db11 线上
> **关联文档**：
> - 方案 D 计划：`GUIDE/CONTENT_CMS_MIGRATION.md`
> - 实施前检查：`GUIDE/CONTENT_CMS_MIGRATION_CHECK.md`
> - 248 测试报告：`GUIDE/TEST_248_REPORT.md`

---

## 一、本会话工作摘要

| 阶段 | 内容 | 状态 |
|------|------|:----:|
| 1 | 248 测试环境搭建（Debian 13 + Node 22.23.2 + 从 db11 复制代码/D1） | ✅ |
| 2 | 方案 D 实施（6 文件改动，本地仓库） | ✅ |
| 3 | 248 端到端验证（globalThis/内容API/详情页/列表页/内存） | ✅ |
| 4 | 关键 bug 修复（`translations_json` JSON 解析） | ✅ |
| 5 | 测试报告输出 | ✅ |

---

## 二、改动文件清单（6 文件）

| # | 文件 | 改动 | 说明 |
|:-:|------|------|------|
| 1 | `worker/index.ts` | `readContentFromDatabase` 去 section 过滤；写入 `globalThis.__dbContent`（JSON 字段已解析为对象） | ⚠️ 待 db11 同步 |
| 2 | `app/content-overrides.ts` | 优先读 `globalThis.__dbContent`，兜底走 header（兼容旧方式） | ⚠️ 待 db11 同步 |
| 3 | `app/[locale]/guides/[slug]/page.tsx` | `resolveContent` 改 async + DB 覆盖 | ⚠️ 待 db11 同步 |
| 4 | `app/[locale]/classes/[slug]/page.tsx` | 同上 | ⚠️ 待 db11 同步 |
| 5 | `app/[locale]/database/[slug]/page.tsx` | 同上 | ⚠️ 待 db11 同步 |
| 6 | `app/_components/hub/HubPage.tsx` | `mergeEntries` 合并 DB 内容（DB 优先覆盖编译期） | ⚠️ 待 db11 同步 |

### 关键实现细节

**1. `worker/index.ts` — globalThis 写入（含 JSON 字段解析）**

```typescript
const contentRows = await readContentFromDatabase(
  env.DB as unknown as ContentOverrideDatabase,
);
if (contentRows.length > 0) {
  (globalThis as any).__dbContent = contentRows.map((row: any) => ({
    section: row.section,
    slug: row.slug,
    schemaType: row.schema_type,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    readingMinutes: row.reading_minutes,
    publication: JSON.parse(row.publication_json),
    sources: row.sources_json ? JSON.parse(row.sources_json) : undefined,
    heroImage: row.hero_image_json ? JSON.parse(row.hero_image_json) : undefined,
    primaryAction: row.primary_action_json ? JSON.parse(row.primary_action_json) : undefined,
    properties: row.properties_json ? JSON.parse(row.properties_json) : undefined,
    related: JSON.parse(row.related_json),
    translations: (() => {
      const t = JSON.parse(row.translations_json);
      return { en: t.en };  // 只保留 en，其他语言走 fallback
    })(),
  }));
}
```

> ⚠️ **关键 bug**：`ContentOverrideRow` 的 `translations_json` 等字段是 JSON 字符串，必须解析为对象后再写入 `globalThis`，否则 `getContentTranslation` 报 `Cannot read properties of undefined (reading 'en')`。

**2. `app/content-overrides.ts` — globalThis 优先读取**

```typescript
const cached = (globalThis as any).__dbContent as ContentEntry[] | undefined;
if (Array.isArray(cached)) {
  const map = new Map<string, ContentEntry>();
  for (const row of cached) map.set(`${row.section}/${row.slug}`, row);
  return map;
}
// 兜底：从 header 读
```

---

## 三、248 测试验证结果

| 验证项 | 结果 |
|--------|:----:|
| 248 环境可用（Node 22.23.2） | ✅ |
| content API key auth 返回 19 条 | ✅ |
| 详情页 news 渲染正常 | ✅（无 `en` 错误） |
| 详情页 guides/classes/database DB 覆盖 | ✅（代码已改，缺数据回退编译期） |
| 列表页 HubPage 合并 DB 内容 | ✅ |
| workerd RSS | 485 MB（19 条 baseline） |
| 全量 278 条估算 | ~515 MB，**可接受** |
| cookie 管理员登录 | ⏳ 未完整测试（缺 CMS 环境） |

---

## 四、待办项

### 🔴 高优先级（AION2 会话待执行）

| # | 任务 | 说明 |
|:-:|------|------|
| 1 | 提交 6 文件改动到 GitHub | 当前未提交 |
| 2 | 恢复 `/api/admin/content/export` 临时路由 | news 试点后已移除，全量导出需恢复 |
| 3 | 全量导出 278 条到 db11 D1 | 建议分 section 执行（`--section=guides` 等） |
| 4 | 同步 6 文件到 db11 + 重启服务 | `sudo systemctl restart app` |
| 5 | 验证 db11 线上 | 内容 API 全部 section、详情页、列表页、内存 |

### 🟡 中优先级（统一 CMS 会话）

| # | 任务 |
|:-:|------|
| 6 | `cms/storage/aion2-content-http-api.mjs` |
| 7 | `cms/adapters/aion2-content.mjs` + `loader.mjs` 注册 |
| 8 | Tunser `.env` 配 `AION2_ADMIN_KEY` + 重启 CMS |
| 9 | 端到端验证：面板 → CMS → db11 `/api/admin/content` |
| 10 | 更新 `ISSUES.md` C-aion2 为 `✅ 已接入` |

### 🔵 低优先级（可暂缓）

| # | 文件 | 说明 |
|:-:|------|------|
| 11 | `[...missing]/page.tsx` | 兜底路由 `findContent` 改 async |
| 12 | `[locale]/page.tsx` | 首页 `getContentEntry/getContentEntries` 改 async |
| 13 | `search-index.ts` | 搜索索引自动包含 DB 内容（需确认合并策略） |
| 14 | `ContentDetail.tsx` 相关内容卡片 | 自动生效 |
| 15 | `MapSeoChrome.tsx` 地图 SEO | 自动生效 |

---

## 五、注意事项

1. **临时导出路由**：`/api/admin/content/export` 已从 `admin-api.ts` 移除，全量导出前需恢复
2. **内存监控**：db11 workerd 923 MB → 278 条后约 950 MB，部署后监控 `ps -o rss,command -C workerd`
3. **EN-only 翻译**：当前仅保留 `en`，其他语言走 `getContentTranslation` fallback；若 CMS 需管理多语言，需扩展
4. **额外引用点**：`author/pfg`、`ContentDetail`、`MapSeoChrome`、`search-index` 4 处调用 `getContentEntry/getContentEntries`，方案文档未覆盖，其中 `search-index.ts` 需确认合并策略

---

## 六、凭据参考

| 项 | 值 | 位置 |
|----|-----|------|
| db11 管理后台密码 | `Aion2-UKfEu5YOQPcypaXvCJ66qC5M` | `CREDENTIALS.md` §十三 |
| `ADMIN_API_KEY` | `b39573e09bb60354f83bd0fc336a16f8ae9977318355599f12433e4edf249386` | `CREDENTIALS.md` §十三 |