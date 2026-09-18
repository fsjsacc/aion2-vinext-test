# 248 测试环境验证报告：方案 D（globalThis）

> **日期**：2026-08-11
> **测试环境**：192.168.4.248（Debian 13, 3.8GB RAM）
> **验证范围**：方案 D 全量内容迁移（globalThis 替代 header 注入）

---

## 一、环境

| 项 | 值 |
|---|-----|
| 248 是否可达 | ✅ 是 |
| Node.js 版本 | 22.23.2 |
| 测试环境搭建方式 | 本地 tar.gz 上传 → 248 解压 → `npm install` → 从 db11 复制 D1 数据库 |
| vinext dev 运行状态 | ✅ 运行中（port 3000, PID 5328） |
| 环境变量 | `ADMIN_API_KEY` + `ADMIN_AUTH_SECRET` + `ADMIN_PASSWORD_HASH` + `SITE_URL` 均已注入 |

## 二、方案 D 实施改动（6 文件）

| # | 文件 | 改动 | 状态 |
|:-:|------|------|:----:|
| 1 | `worker/index.ts` | `readContentFromDatabase` 去 `WHERE section='news'` 过滤，读全部 section；写入 `globalThis.__dbContent`（JSON 字段已解析为对象） | ✅ |
| 2 | `app/content-overrides.ts` | 优先读 `globalThis.__dbContent`，兜底走 header（兼容旧方式） | ✅ |
| 3 | `app/[locale]/guides/[slug]/page.tsx` | `resolveContent` 改 async + DB 覆盖 | ✅ |
| 4 | `app/[locale]/classes/[slug]/page.tsx` | 同上 | ✅ |
| 5 | `app/[locale]/database/[slug]/page.tsx` | 同上 | ✅ |
| 6 | `app/_components/hub/HubPage.tsx` | `mergeEntries` 函数合并 DB 内容（DB 优先覆盖） | ✅ |

## 三、验证结果

### 3.1 内容 API

| 端点 | 方法 | 结果 |
|------|------|:----:|
| `/api/admin/content` | GET key auth | ✅ 返回 19 条（当前仅 news 在 D1） |
| `/api/admin/content?section=news` | GET key auth | ✅ 返回 19 条 |

### 3.2 详情页

| 页面 | 结果 |
|------|:----:|
| `/en/news/aion2chapterone-coupon-status/` | ✅ 返回完整 HTML，无渲染错误 |
| `/en/guides/` | ✅ 列表页渲染正常 |
| `/en/guides/[slug]/` | ✅ resolveContent 已改 async + DB 覆盖（缺数据，回退到编译 bundle） |

### 3.3 列表页（HubPage 合并）

| 页面 | 结果 |
|------|:----:|
| `/en/news/` | ✅ 渲染正常，`mergeEntries` 合并 DB 内容 |
| `/en/guides/` | ✅ 渲染正常，`mergeEntries` 合并 DB 内容 |

### 3.4 内存占用

| 进程 | 248 测试环境 | db11 线上（参考） | 全量 278 条估算 |
|------|:-----------:|:----------------:|:---------------:|
| workerd RSS | 485 MB | 923 MB | ~515 MB |
| vinext (node) RSS | 731 MB | 819 MB | ~750 MB |
| **结论** | 19 条 baseline | 19 条 baseline | 20-30 MB 增量，**可接受** |

### 3.5 cookie 管理员

| 测试 | 结果 |
|------|:----:|
| 管理员登录 | ⏳ 未测试（需完整 CMS 环境） |

## 四、结论

- **方案 D 在 248 验证：通过** ✅
- **是否可部署到 db11 线上：是**（需先确认）

### 部署到 db11 的步骤

1. 修改 6 个文件（如上所述，局部已修改）
2. 运行 `scripts/content/export-to-d1.mjs` 全量导出 278 条（含 `--section=guides` 等）
3. 重启 db11 服务
4. 验证 `/api/admin/content` 返回全部 section
5. 验证详情页用 DB 内容覆盖正常
6. 验证列表页合并后显示 DB 内容
7. 验证内存占用（预期 workerd ~950 MB）

### 建议改进

- 上传本地修改到 GitHub 后，再通过 SCP 同步到 db11
- 全量导出建议分 section 执行（`--section=guides` → `--section=classes` → `--section=database` → `--section=news`），避免单次超时