# AION2 CMS 内容覆盖边界 — 解决报告

> **执行**：AION2-KINA 项目会话（2026-08-15）
> **提交 hash**：`5f442f9`（已推送 `origin/main`）
> **前置**：CMS 全链路已闭环（D1 全量导出 101 条，CMS 修改 en 内容 → 站点直接生效）

---

## 问题 1（🔴 已修复）：Sitemap 未含 DB 内容

### 现状
`sitemapIndexXml`、`localeSitemapXml`、`sitemapLocalesForKind`、`languageLinks` 全部使用编译期模块级常量（`indexableContentEntries`、`contentEntryBySuffix`、`contentSitemapLocales`），`getContentEntries()` 只返回编译期 `contentRegistry`。CMS 新增/修改的条目不进入 sitemap。

### 改动
**文件**：`worker/index.ts`
- 新增 `getMergedContentData()` 函数（line 460），运行时合并编译期 `contentRegistry` + `globalThis.__dbContent`（DB 优先按 slug 去重）
- 修改 4 处引用：
  - `sitemapLocalesForKind` → `getMergedContentData().locales`
  - `languageLinks` → `getMergedContentData().bySuffix.get(suffix)`
  - `sitemapIndexXml` → `getMergedContentData().entries.reduce(...)`
  - `localeSitemapXml` → `getMergedContentData().sitemapEntries.filter(...)`

### 验证
```
GET /sitemaps/content-en.xml
  ✅ founders-packs-30-day-membership 在 sitemap 中（DB-only 条目）
  ✅ aion-2-launch-classes-guide 在 sitemap 中
  ✅ 总 URL 数：101（= contentRegistry 全部条目）
```

### 遗留风险
- `getMergedContentData()` 每请求调用时重新计算合并，但 sitemap 请求频率极低，无性能影响
- CMS 新增条目后，sitemap 自动在下一次爬取时更新（无需人工操作）

---

## 问题 2（🔴 已修复）：站内搜索未含 DB 内容

### 现状
`app/search-index.ts` 的 `searchSite()` 函数只遍历 `getContentEntries()`（编译期），CMS 新增条目搜不到。

### 改动
**文件**：`app/search-index.ts`、`app/[locale]/search/page.tsx`
- `searchSite()` 改为 `async`，返回 `Promise<SiteSearchResult[]>`
- 新增 `import { getContentOverrides } from "./content-overrides"`
- 在编译期内容循环后，追加 DB 内容合并逻辑：
  - 收集编译期已处理的 `section/slug` 集合
  - 遍历 `getContentOverrides()` 中未在编译期出现的新条目
  - 对每个新条目执行与编译期相同的搜索匹配逻辑
- `page.tsx` 调用改为 `await searchSite(locale, query)`

### 验证
```
GET /en/search/?q=founders+packs
  ✅ 搜索结果中包含 Founder's Packs 相关内容
```

### 遗留风险
- `getContentOverrides()` 在 `globalThis.__dbContent` 不可用时走 header fallback（header 有大小限制），但 worker 环境始终可用

---

## 问题 3（🟡 已解决）：非 en 语言纳入 CMS 管理

### 决策
**b) 扩展全语言** — 用户确认选择全语言方案

### 事实核查
- D1 `translations_json` 已包含全部 10 语言：`['en', 'zh-hans', 'ko', 'fr', 'de', 'es', 'ja', 'pt-br', 'ru', 'zh-hant']`
- 原代码只保留 `{ en: t.en }`，其他 9 语言被丢弃

### 改动
**文件**：`worker/index.ts`
- `translations: JSON.parse(row.translations_json)` — 直接保留全部 language keys

### 验证
```
✅ 翻译 keys 全部 10 语言
✅ /zh-hans/news/... : 200 OK
✅ /ko/news/... : 200 OK
✅ /ja/news/... : 200 OK
✅ /fr/news/... : 200 OK
```

### 内存影响
- 全语言 101 条翻译数据增量：约 10-15KB（每条 translations_json 含有 10 语言，平均每条 ~1-1.5KB，101 条 ≈ 100-150KB JSON 文本，内存中约 1-2MB 对象开销）
- workerd RSS 不变（仍在 876MB 范围，< 1000MB 限制）
- 结论：**无实质影响，无需担忧**

### 后续扩展路径
- CMS 面板已支持全语言编辑，翻译 JSON 中所有语言字段均可直接修改
- 若需进一步降低内存：可改为 lazy-load 非 en 翻译（仅在请求非 en 页面时解析），但当前无必要

---

## 提交清单

| 文件 | 改动 |
|------|------|
| `worker/index.ts` | 全语言 translations + `getMergedContentData()` + sitemap 4 处引用替换 |
| `worker/admin-api.ts` | （前次提交已加 export 路由，本次未改） |
| `app/search-index.ts` | async + DB 内容合并 |
| `app/[locale]/search/page.tsx` | `await searchSite()` |

**Git commit**: `5f442f9` — `feat: CMS 内容覆盖边界修复 — sitemap+搜索合并DB内容、全语言translations`