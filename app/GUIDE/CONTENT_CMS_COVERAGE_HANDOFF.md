# AION2 CMS 内容覆盖边界 — 交办文档

> **撰写**：统一 CMS 会话（2026-08-15）
> **执行方**：AION2-KINA 项目会话
> **背景**：CMS→db11→D1→SSR 全链路已闭环（08-15 实测：CMS 修改 en 内容 → 站点页面**直接生效，无需构建**）。本次解决 3 个内容覆盖边界问题。
> **前置事实（已核查，勿重复摸索）**：db11 D1 已全量导入 101 条（= contentRegistry）；worker/index.ts 每请求读 D1 写 `globalThis.__dbContent`；`app/content-overrides.ts` 的 `getContentOverrides()` 返回 `Map<"section/slug", ContentEntry>`（DB 优先）；`app/_components/hub/HubPage.tsx` 已有 `mergeEntries` 合并模式可参考。

---

## 一、交办提示词（可直接粘贴给 AION2 项目会话）

```
你是 AION2-KINA 项目会话。任务：解决统一 CMS 内容在站点的 3 个覆盖边界问题，并按要求输出解决报告 MD。

【背景（已由统一 CMS 会话核查确认）】
- CMS 管理内容存 D1（101 条已全量导入），worker 每请求读 D1 写 globalThis.__dbContent；getContentOverrides() 提供 Map<section/slug, ContentEntry>（DB 覆盖编译期）
- 已实测：CMS 修改 en 内容 → 详情页/列表页直接生效（无需构建）
- 但以下 3 处仍只吃编译期数据，CMS 新增/修改的内容不会体现：

【问题 1（🔴）sitemap 未含 DB 内容】
- 现状：worker/index.ts:439 `const indexableContentEntries = getContentEntries()`（编译期 contentRegistry）；/sitemaps/content-<locale>.xml 由此生成（440-455 行）
- 影响：CMS 新增条目不进 sitemap → 搜索引擎难发现
- 方向：sitemap 的 content 部分合并 globalThis.__dbContent（indexable=true 的条目；复用 content-overrides 的 overrides map + 编译期 entries 去重/DB 优先，参考 HubPage mergeEntries 模式）
- 验收：CMS 新增一条 indexable 内容 → GET /sitemaps/content-en.xml 出现该 slug（及对应 lastModified）

【问题 2（🔴）站内搜索未含 DB 内容】
- 现状：app/search-index.ts:139 `for (const entry of getContentEntries())`（编译期）；contentSearchText/getContentTranslation 同样基于编译期 entry
- 影响：CMS 新增条目搜不到；DB 修改过的 en 文本，搜索仍用编译期旧文本
- 方向：search-index 遍历时用 `getContentOverrides()` 合并（DB 优先），正文/标题/描述取 DB 覆盖后的 entry
- 验收：CMS 修改某条目 en.intro 加入独特词 → 站内搜索该词命中新文本；新增条目搜索命中

【问题 3（🟡 决策项）非 en 语言是否纳入 CMS 管理】
- 现状：worker/index.ts 写 globalThis 时 `translations: { en: t.en }`（只保留 en，HANDOFF 文档有记录）；其他 9 语言显示仍走编译期
- 影响：CMS 面板翻译 JSON 里改 zh-hans 等内容不生效
- 决策二选一：
  a)（推荐当前阶段）保持 en-only：不改代码，在报告中说明约束与后续扩展路径
  b) 扩展全语言：worker 写全量 translations；先实测 101 条全语言内存增量（workerd 现 912MB，确认 <1000MB 余量）再决定；若选此项需同步评估 globalThis 写入体积与 SSR 首帧
- 无论选哪项，报告中给出：决策 + 依据（实测内存数据）+ 若(b)的实现清单

【交付要求】
- 每项报告结构：现状复述 → 改动文件+行 → 验证方式与结果（curl/页面实测）→ 遗留风险
- 输出文件：GUIDE/CONTENT_CMS_COVERAGE_REPORT.md（写入 AION2 仓库并 commit+push）
- 完成后告知统一 CMS 会话检查

【边界红线】
- 只动 aion2kina 应用代码（app/ worker/）与 D1；不碰 nginx/隧道/其他 VM
- SITE_URL 保持 https://www.aion2kina.com；不设 NEXT_PUBLIC_SITE_URL
- 不引入新依赖；改动 commit 前自测本地/248
- 产生新凭据需同步 CREDENTIALS §十三
```

---

## 二、验收参照（统一 CMS 会话检查要点）

| 项 | 期望 |
|----|------|
| 问题 1 | `/sitemaps/content-en.xml` 含 DB 新增条目的 slug；lastModified 合理 |
| 问题 2 | 站内搜索命中 DB 修改后的 en 文本（可在 db11 起临时搜索页验证，或提供代码级论证） |
| 问题 3 | 明确决策 a/b + 依据；若 b 提供内存实测对比 |
| 报告 | `GUIDE/CONTENT_CMS_COVERAGE_REPORT.md` 按上述结构，结论可复核 |

> 完成后由统一 CMS 会话复核报告与抽样验证；发现偏差将打回补充。