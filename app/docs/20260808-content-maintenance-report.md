# AION2 KINA 内容维护报告 — 2026年8月8日

## 概述

本次维护为 2026 年 8 月 8 日的手动趋势内容更新，基于过去 36 小时内与 AION2（aion2kina.com）相关的网络热词和官方公告，选取 5 个最高热度且无重复的主题，生成了 5 篇 SEO 文章（每篇覆盖 10 种语言），同时检查了游戏内事件时间表并梳理了部署管线状态。

## 热词检索结果

检索时间范围覆盖 8 月 6 日 12:00 至 8 月 8 日，信息来源包括：

- **NC Corporation 官方公告**：韩国服更新通知（plaync）
- **第三方社区**：Aion2t、AION2 Hub、MMOEXP、Inven、FM Korea
- **平台页面**：Steam 商店页、NC 新闻稿
- **搜索引擎**：DuckDuckGo 趋势查询

### 选取的 Top 5 主题（去重后）

| # | 主题 | 热度来源 | 网站已有内容 | 去重结论 |
|---|------|---------|-------------|---------|
| 1 | **8 月 5 日更新速报** — Deva Look Change Week、宠物券限购、10 项修复与补偿 | 官方公告 + 社区讨论 | 最新新闻止于 7 月 30 日 | ✅ 新 |
| 2 | **德巴外观变更周指南** — 100 库纳染色、7 款免费花纹、无限次数 | 搜索量最高（ongoing 活动） | 无相关专题指南 | ✅ 新 |
| 3 | **数据挖掘新副本** — Askran 四色能量战、Atiel 人造神、Legacy Noiran 四地图 | 社区热议（aion2t 8 月 5 日发布） | 无挖掘类内容 | ✅ 新 |
| 4 | **全球版 PvE 前瞻** — 官方已确认信息 vs 第三方预期 | mmoexp 8 月 7 日 + 高搜索量 | 已有关注上线日期的文章 | ✅ 新（PvE 内容角度不同） |
| 5 | **8 月兑换码状态核对** — AION2CHAPTERONE 有效期、过期码清册、安全兑换渠道 | 高搜索量（tistory 8 月 5 日汇总） | 已有单码状态文章 | ✅ 新（月度汇总角度） |

## 新增文章详情

所有文章均采用 `ContentEntry` 结构，注册于 `content-registry.ts`，覆盖 10 种语言（zh-hans/en/fr/de/es/ja/pt-br/ru/ko/zh-hant），每篇包含 4 个章节、hero 配图、官方/第三方来源引用及关键词。

### 文章 1：8 月 5 日更新速报

- **路径**：`news/august-5-2026-deva-look-change-week-update`
- **类型**：NewsArticle
- **来源**：官方 KR 更新说明 + AION2 Hub + Aion2t
- **核心内容**：
  - Deva Look Change Week（8/5 维护 ~ 8/19 维护）：染色费用 200→100 库纳、无限次数
  - 7 款免费花纹（横条纹、竖条纹、星星、斑马纹、菱形格、奶牛纹、千鸟格）
  - 4 套时装上架、冬夜霜花武器外观（9 职业）、2 款翅膀
  - 宠物自动拾取券改为每月 2 次限购、绑定版可原价卖回
  - 10 项修复（噩梦 Buff 不再消失、Boss 技能修正等）
  - 深渊回廊积分补偿 + 软萌兔娃外观补发
  - 本次无职业平衡、无新副本；韩服价格不构成全球版定价

### 文章 2：德巴外观变更周指南

- **路径**：`guides/deva-look-change-week-guide`
- **类型**：Article
- **来源**：官方 KR 更新说明 + 第三方交叉核对
- **核心内容**：
  - 活动时间与折扣说明
  - 装饰操作步骤：菜单 → 衣柜 → 装饰 → 染色/材质/花纹/花纹颜色
  - 7 款免费花纹列表
  - 限制与例外：翅膀不可染色、不可交易/销毁
  - FAQ（3 项）：活动时长、染色费用、花纹是否免费
- **SEO 关键词**：Deva Look Change Week, AION2 dyeing guide, Quna dye cost

### 文章 3：数据挖掘新副本（Askran / Atiel / Legacy Noiran）

- **路径**：`news/august-2026-datamine-askran-atiel-noiran`
- **类型**：NewsArticle
- **来源**：Aion2t（第三方挖掘报告，2026-08-05 发布）
- **核心内容**：
  - 8 月 5 日客户端新增 164 条本地化字符串，0 条数据表行
  - **Askran**：四色能量管理战（红/蓝/绿/紫能量，紫无对应护盾）、石化生存窗口、CC 与 AoE 技能组、头盔外观
  - **Atiel**：雷帕尔人造神残次品、99% 完成度、9 职业专属武器、饰品套装、家园雕像
  - **Legacy Noiran**：4 张地图已就绪但无数据表行，入场条件/奖励缺失
  - 三套未具名 Boss 技能包：冰霜（温暖/寒冷管理）、毒素（三层爆炸毒区）、枪刃（激光/定时炸弹）
  - **重要声明**：所有内容未官宣，无发布日期，可能改动或取消
- **配图说明**：使用官方 Chapter 1 宣传图，注明"图片与挖掘内容无直接关联"

### 文章 4：全球版 PvE 前瞻

- **路径**：`news/global-launch-pve-content-what-we-know`
- **类型**：NewsArticle
- **来源**：NC 官方公告 + Steam 页（8 月 8 日复核）+ MMOEXP（第三方预期）
- **核心内容**：
  - **官方已确认**：9 月 30 日 EA（5 天，与创始人包绑定）、三档定价 $24.99/$49.99/$99.99、Steam 显示 2026 年 9 月窗口、全球平台 Steam + PURPLE
  - **未确认**：完整免费上线日期仍不一致；10 月 5 日说法未获官方支撑
  - **第三方预期**（MMOEXP 8 月 7 日）：Crow Cave / Draupnir / Urugugu / Vasharti / Fire Temple / Horn Den 等副本、Nightmare 第一层、Ascension Trial、Ladra 10 人讨伐
  - **重要区分**：韩服/台服内容不等于全球版承诺；KR/TW 自 2025 年 11 月运营至今已到 Season 3 / Chapter 1，全球版将分阶段上线

### 文章 5：8 月兑换码状态核对

- **路径**：`news/august-2026-coupon-codes-status`
- **类型**：NewsArticle
- **来源**：NC Purple Lounge 公告 + 台服公告 + 官方兑换入口（8 月 8 日复核）
- **核心内容**：
  - **有效码**：AION2CHAPTERONE — 2026 年 6 月 14 日 17:00 KST 发布，有效期至 9 月 30 日维护前，每账号限 1 次
  - **过期码**：AION2SEASON3（7 月 1 日过期）、WELCOMEBACK（4 月 8 日过期）
  - **兑换渠道**：官方门户 nshop.plaync.com（繁中服 aion2_tw）/ 游戏内兑换
  - **安全提示**：勿从第三方购买、勿在非官方网站输入账号
  - **总结**：8 月 6–8 日检查未发现新兑换码公告

## 事件时间表检查结果

`event-timer.ts` 中的 8 个周期性事件时间表（Spacetime Rift / Abyss Rift Zone / Shugo Festa / Dimensional Invasion / Battlefield / Artifact Occupation / Abyss Bosses / Nahma）均未在 8 月 5 日补丁中变更，无需更新。

当前进行中的限时活动（Deva Look Change Week 8/5–8/19、Daeva Pass "蔚蓝海之歌" 至 8/25）已通过文章 #1 和 #2 覆盖。

## 技术验证结果

| 验证项 | 结果 |
|-------|------|
| ESLint（新增文件） | ✅ 0 error |
| 生产构建（KEEP_LOCAL_MAP_ASSETS=1） | ✅ 成功 |
| 内容注册表验证（75 条目 × 10 语言） | ✅ 通过 |
| 内容发布快照测试 | ✅ 通过 |
| 内容扩展一致性测试 | ✅ 通过 |
| 在线验证（5 篇文章 × 200 OK） | ✅ 通过 |
| sitemap 收录验证 | ✅ 已收录 |

## 部署说明

- **项目仓库**：`fsjsacc/AION2-KINA`（GitHub）
- **部署位置**：db11（192.168.4.211），systemd `app` 服务，vinext dev 模式 + miniflare 模拟 D1
- **部署方式**：手动上传源码文件 → `systemctl restart app`
- **提交记录**：`9994fef` — feat: 8月8日趋势维护 — 5篇SEO文章（10语言）并同步asOfDate

---

## 附录：改动文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `app/trending-august-08-content.ts` | 新建 | 5 篇文章 ~3400 行，含 11 个来源记录与 5 组配图 |
| `app/content-registry.ts` | 修改 | 导入新条目 + 注册到 registry + 合并 editorial 记录 |
| `tests/editorial-localization.test.mjs` | 修改 | 条目计数 70 → 75 |
| `tests/content-release-pipeline.test.mjs` | 修改 | asOfDate 2026-07-30 → 2026-08-08 |
| `tests/content-expansion.test.mjs` | 修改 | asOfDate 2026-07-30 → 2026-08-08 |