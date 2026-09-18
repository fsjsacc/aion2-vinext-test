# AION2 内容全量迁移（方案 D）执行交办

> **撰写**：统一 CMS 会话（2026-08-15）
> **执行方**：AION2-KINA 项目会话
> **前置就绪（已核查，勿重复摸索）**：代码侧 100% 完成——6 文件方案 D 改动已在 `fc86e64`（08-11 17:31，已推送 origin/main），且**已同步到 db11 线上**（SSH 实测 `/opt/app/aion2kina/` 下 `worker/index.ts` 含 `__dbContent`、`content-overrides.ts` 已改读、guides 详情页 `resolveContent` async+DB 覆盖、`HubPage.tsx` 含 `mergeEntries`；`app` 服务 active）。统一 CMS 端也已部署 250（适配器 5 contentTypes）。
> **唯一缺口**：db11 D1 中仅 19 条 news（试点），**278 条全量未导出**（guides/classes/database 均 0）。
> **关联**：`GUIDE/CONTENT_CMS_MIGRATION.md`（方案）、`CONTENT_CMS_MIGRATION_HANDOFF.md`（交接）、`TEST_248_REPORT.md`（248 验证报告）

---

## 一、交办提示词（可直接粘贴给 AION2 项目会话）

```
你是 AION2-KINA 项目会话。任务：完成内容全量迁移方案 D（globalThis）的最后执行——把全部 278 条内容（guides 174 / classes 37 / database 15 / news 52）导出到 db11 D1。

【背景（已由统一 CMS 会话核查确认，勿重复探索）】
- 6 文件方案 D 代码已提交（fc86e64）并推送 origin/main，且已同步到 db11（SSH 实测在线 worker 已含 __dbContent/mergeEntries/async 详情页覆盖，app 服务 active）
- db11 content API 现状：news=19（试点）、guides/classes/database=0
- 导出脚本 scripts/content/export-to-d1.mjs 依赖 env.DB binding，只能经 worker 内路由触发——但 /api/admin/content/export 临时路由已在 news 试点后被移除，需先恢复

【步骤 0 · 只读核查（5 分钟，不改任何文件）】
1. grep 确认 db11 /opt/app/aion2kina/worker/index.ts 已含 __dbContent 且无 WHERE section='news'
2. grep 确认 worker/admin-api.ts 当前无 export 路由
3. 确认 D1 数据文件位置（.wrangler/state/）与备份机制（aion2-state-backup.sh 每日 03:15）
4. 上报核查结论

【步骤 1 · 恢复 export 路由】
- worker/admin-api.ts 新增端点（建议 POST /api/admin/content/export，支持可选 ?section=，鉴权同 content CRUD：X-Aion2-Admin-Key）
- 调用 exportContentToDatabase(env.DB as ...)，返回 {total, inserted}
- 参考实现：git 历史中 news 试点时的临时路由版本（git log -S export -- worker/admin-api.ts），或按脚本导出函数签名直写
- 注意导出函数在 scripts/content/export-to-d1.mjs，确保 imports 正确

【步骤 2 · 提交 + 同步 db11 + 重启】
- git commit + push（沿用仓库提交惯例）
- 同步到 db11 /opt/app/aion2kina/（沿用仓库惯例同步方式，参考维护手册 §2.3）
- sudo systemctl restart app
- 冒烟：/api/admin/content 仍返回 news=19，dashboard 200

【步骤 3 · 数据冲突处理（关键，先备份）】
- ⚠️ content_entries 有 unique(section,slug) 约束，而 export 脚本 INSERT 无 ON CONFLICT；现有 19 条 news 会撞约束导致导出中断
- 先备份 D1：tar 打包 .wrangler/state/ 或 sqlite .backup 到 /opt/backups/（命名含时间戳），或依赖当日 03:15 自动备份并人工确认
- 二选一：
  a)（推荐）备份后 DELETE FROM content_entries 清空，再全量导出——所有内容源即 contentRegistry，导出即完整重建；清空后站点 SSR 自动回退编译期内容（短窗口可接受，建议低峰执行）
  b) 改脚本为 upsert（INSERT ... ON CONFLICT(section,slug) DO UPDATE）——需另行测试，工作量+0.5h
- 决策后先在 248 或本地验证一次再上 db11

【步骤 4 · 全量导出（分 section）】
- 逐 section 触发：guides → classes → database → news（curl -H "x-aion2-admin-key: <§十三 key>"）
- 每段确认返回条数正确后再下一段（174 / 37 / 15 / 52）

【步骤 5 · 验证（验收标准）】
- /api/admin/content?section=X 各返回 ≥ 期望条数（news 应变为 52）
- 实测详情页：/en/guides/<slug>/、/en/classes/<slug>/、/en/database/<slug>/ 渲染正常（DB 覆盖生效）
- 列表页 ×4：/en/news/ /en/guides/ /en/classes/ /en/database/ 渲染正常
- 抽查 4 个自动生效引用点不回归：author/pfg 页、ContentDetail 相关卡片、MapSeoChrome、search-index
- 内存：ps -o rss,cmd -C workerd，预期 ≤1000MB（实测 278 条 ~20-30MB 增量）
- 公网抽验：aion2kina.com 随机内容页 200

【步骤 6 · 上报】
- 提交 hash、导出分节条数、验证结果（curl 输出/页面状态）、workerd RSS
- 若产生新凭据/密钥，同步录入 CREDENTIALS §十三

【边界红线】
- 只动 db11 aion2kina 应用与 D1 数据；不碰 nginx、不碰隧道/cloudflared、不碰其他 VM
- SITE_URL 保持 https://www.aion2kina.com（canonical 门控，勿改）；不设 NEXT_PUBLIC_SITE_URL
- 除 export 路由外不新增其他写 API；导出前必须完成备份
```

---

## 二、验收参照（统一 CMS 侧，数据到位后自动生效）

| 项 | 期望 |
|----|------|
| CMS 面板 aion2 → 攻略/职业/资料库 列表非空 | guides 174 / classes 37 / database 15（分页 20/页） |
| news 列表从 19 → 52 | 全量 |
| CMS CRUD → db11 生效（改 slug 条目后站点页面变化） | SSR 即改即生效 |

> 数据导出完成后，如需 CMS 端 CRUD 端到端收口验证，由统一 CMS 会话跟进（预计 0.5h）。