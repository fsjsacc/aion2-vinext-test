# AION2 KINA 内容维护摘要 — 2026-08-08

## 改动

5 篇 SEO 文章（10 语言），注册表 70→75：

| # | 文章 | 类型 | 主题 |
|---|------|------|------|
| 1 | `news/august-5-2026-deva-look-change-week-update` | NewsArticle | 8月5日更新：德巴外观变更周、宠物券限购、Boss修复、补偿 |
| 2 | `guides/deva-look-change-week-guide` | Article | 活动指南：染色折扣、7款免费花纹、操作步骤、FAQ |
| 3 | `news/august-2026-datamine-askran-atiel-noiran` | NewsArticle | 挖掘：Askran/Atiel/Noiran 三副本（未官宣） |
| 4 | `news/global-launch-pve-content-what-we-know` | NewsArticle | 全球版PvE：官方确认 vs 第三方预期 |
| 5 | `news/august-2026-coupon-codes-status` | NewsArticle | 8月兑换码状态：AION2CHAPTERONE有效、过期码清册 |

## 验证

- ESLint 0 error，生产构建成功
- 内容测试通过（editorial-localization / content-release-pipeline / content-expansion）
- 线上 5 篇文章 200 OK，sitemap 已收录

## 部署

- 提交 `9994fef` 已推送 `fsjsacc/AION2-KINA`
- scp 源码到 db11 + `systemctl restart app` 完成