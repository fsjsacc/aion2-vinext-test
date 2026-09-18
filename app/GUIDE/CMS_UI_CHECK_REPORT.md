# CMS 面板 UI 检查报告 — AION2-KINA

> **检查时间**: 2026-08-24 | **目标**: db11 (192.168.4.211:3000)
> **认证方式**: Key Auth (`X-Aion2-Admin-Key`) | **凭据来源**: `GUIDE/CREDENTIALS.md` §十三
> **任务**: 只读检查，不修改任何文件、不重启服务、不跑迁移
> **来源**: `GUIDE/CMS_UI_CHECK.md`

---

## 一、端点可用性表

| 端点 | 方法 | 状态 | 响应体示例 | 备注 |
|------|------|------|-----------|------|
| `/api/admin/dashboard?days=7` | GET | ✅ 200 | 完整 Dashboard 数据（7天） | 含 reports 列表内嵌 |
| `/api/admin/dashboard?days=30` | GET | ✅ 200 | 完整 Dashboard 数据（30天） | 默认值 |
| `/api/admin/dashboard?days=90` | GET | ✅ 200 | 完整 Dashboard 数据（90天） | 含大量零值日（2026-05-27 ~ 07-21） |
| `/api/admin/reports` | GET | ❌ 404 | `{"error":"Not found"}` | **无独立列表端点**，reports 内嵌在 dashboard 中 |
| `/api/admin/reports/<UUID>` | GET | ✅ 200 | 完整报告详情（含 contact） | 示例 UUID 返回正常 |
| `/api/admin/reports/<UUID>` | PATCH | ✅ 可访问 | 需 `{"status":"resolved","resolutionNote":"..."}` | 有 origin 校验，Key Auth 不受限 |
| `/api/admin/external-links` | GET | ✅ 200 | 31 links + settings (scalePercent:40) | 全部返回 |
| `/api/admin/external-links` | POST/PATCH/DELETE | ✅ 可访问 | 源码确认 | 新增/更新/删除外链 |
| `/api/admin/content` | GET | ✅ 200 | 所有 content_entries 列表 | 支持 `?section=` 过滤 |
| `/api/admin/content` | POST | ✅ 可访问 | 创建新内容条目 | 需 section + slug |
| `/api/admin/content/<UUID>` | GET/PUT/DELETE | ✅ 可访问 | 详情/更新/删除 | 源码确认 |
| `/__atlas-release/object` | HEAD/PUT | 🔒 404¹ | — | 需 R2 bucket 绑定 + Bearer Token |
| `/__atlas-release/status` | GET | 🔒 404¹ | — | 同上 |
| `/__atlas-release/promote` | POST | 🔒 404¹ | — | 同上 |

¹ 404 是预期行为——dev 环境无 `MAP_ASSETS` (R2) 绑定，生产环境也需 Bearer Token 才能访问。

---

## 二、Reports 端点详情

### 2.1 列表端点

**不存在独立 `/api/admin/reports` 列表端点。** 当前 reports 列表仅通过 dashboard 端点返回（嵌入在 `dashboard.reports[]` 数组中，最多 200 条，按 `created_at` 降序）。

### 2.2 详情端点

`GET /api/admin/reports/{UUID}` 返回字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | UUID |
| `targetKind` | string | "tool" / "content" |
| `targetKey` | string | 目标标识 |
| `locale` | string | 语言代码 |
| `service` | string | 服务标识 |
| `version` | string\|null | 版本号 |
| `category` | string | 分类 |
| `message` | string | 举报内容 |
| `evidenceUrl` | string\|null | 证据链接 |
| `contact` | string\|null | 联系方式（仅 detail 返回） |
| `status` | string | "new" \| "triaged" \| "accepted" \| "rejected" \| "resolved" |
| `createdAt` | number | 创建时间戳 |
| `updatedAt` | number\|null | 更新时间戳 |
| `resolvedAt` | number\|null | 解决时间戳 |
| `resolutionNote` | string\|null | 解决备注（仅 detail 返回） |

### 2.3 PATCH 操作

`PATCH /api/admin/reports/{UUID}` 请求体：

```json
{
  "status": "resolved",
  "resolutionNote": "已处理，这是垃圾邮件"
}
```

- `status`: 必填，必须为 `new` / `triaged` / `accepted` / `rejected` / `resolved` 之一
- `resolutionNote`: 必填，最多 1000 字符
- 约束：origin 校验（仅 same-origin 可 PATCH），Key Auth 不受限
- 内容长度限制：请求体最大 2048 字节

### 2.4 当前数据

- 3 条报告（1 条 open — NickLaunches 合作请求，2 条 resolved — 部署冒烟测试 + 过期内容标记）

---

## 三、Dashboard 数据结构

### 3.1 统一结构

所有 days 值（7/30/90）共享相同 schema：

```json
{
  "generatedAt": 1787554342444,
  "admin": { "displayName": "KINA Admin (API)" },
  "metrics": {
    "reportsTotal": 3,
    "reportsOpen": 1,
    "eventsToday": 0,
    "eventsPeriod": 37
  },
  "reports": [ /* 最多 200 条，按 created_at 降序 */ ],
  "analytics": {
    "days": 7,
    "series": [ /* 日度趋势，完整填充含零值 */ ],
    "events": [ /* Top 8 事件 */ ],
    "surfaces": [ /* Top 8 页面区域 */ ],
    "targets": [ /* Top 8 内容目标 */ ]
  },
  "journeys": {
    "days": 7,                    // 实际旅程天数 = min(days, 30)
    "retentionDays": 30,
    "sampleThreshold": 3,         // 采样阈值
    "eventCount": 135,
    "uniqueVisitors": 70,
    "sessionCount": 84,
    "countries": [ /* Top 10 国家 */ ],
    "devices": [ /* 设备分布 */ ],
    "browsers": [ /* 浏览器分布 */ ],
    "utmSources": [ /* 来源渠道 */ ],
    "utmMediums": [],
    "utmCampaigns": [],
    "paths": [ /* Top 12 路径 */ ],
    "recentSessions": [ /* 最近会话详情（含 IP 解密、事件序列） */ ]
  }
}
```

### 3.2 days 差异

| 参数 | eventsPeriod | 趋势数据 | journeys 覆盖 |
|------|-------------|---------|--------------|
| `days=7` | 37 | 7 天完整 | 7 天 |
| `days=30` | 1092 | 30 天完整 | 30 天 |
| `days=90` | 1295 | 90 天（前 57 天为零值，07-22 起有数据） | **30 天**（retentionDays=30 硬限制） |

### 3.3 关键指标

- 允许的 days 值：`ALLOWED_DAYS = new Set([7, 30, 90])`，其他值默认回退到 30
- 用户旅程保留期：`JOURNEY_RETENTION_DAYS = 30`（硬编码，不受 days 参数影响）
- 采样阈值：`JOURNEY_SAMPLE_THRESHOLD = 3`（国家/设备/浏览器/路径等维度至少 3 独立访客才显示）

---

## 四、Content API 详情

### 4.1 端点

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/admin/content` | GET | 列表，支持 `?section=` 过滤 |
| `/api/admin/content` | POST | 创建（必填: section, slug） |
| `/api/admin/content/<UUID>` | GET | 详情 |
| `/api/admin/content/<UUID>` | PUT | 全量更新 |
| `/api/admin/content/<UUID>` | DELETE | 删除 |
| `/api/admin/content/export` | POST | 全量导出（Key Auth 专有，从 contentRegistry 导入） |

### 4.2 字段说明

- `section` + `slug` 联合唯一（UNIQUE 约束，重复返回 409）
- `schemaType` 默认 `"Article"`
- `publication` 默认 `{ status: "draft", indexable: false, localeReview: {}, sourceReview: "unverified" }`
- 支持 JSON 字段：`sources`、`heroImage`、`primaryAction`、`properties`、`related`、`translations`

---

## 五、External Links API 详情

### 5.1 端点

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/admin/external-links` | GET | 列表（含 settings） |
| `/api/admin/external-links` | POST | 新增（支持 code 模式或自定义字段模式） |
| `/api/admin/external-links` | PATCH | 更新 scalePercent |
| `/api/admin/external-links/<UUID>` | DELETE | 删除 |

### 5.2 当前数据

- 31 条外链（29 个图片徽章 + 2 个文字徽章）
- `scalePercent`: 40（默认值 `DEFAULT_EXTERNAL_LINK_SCALE_PERCENT`）

---

## 六、地图发布风险评估

### 结论：安全，不建议接入 CMS 面板 UI

**风险**: 低。

**理由**:
- `/__atlas-release/` 路径使用 **Bearer Token 认证**（`MAP_RELEASE_BOOTSTRAP_TOKEN` / `MAP_RELEASE_UPLOAD_TOKEN`），Key Auth 无权访问
- 操作类型：对象上传（PUT）、发布（POST promote）、状态查询（GET status）—— 都是底层运维操作
- R2 bucket 绑定在 worker 层面隔离，dev 环境无绑定返回 404（预期行为）
- Token 长度 >= 32 字符，有完善保护

**建议**: 保持不接入 CMS 面板。地图发布作为独立运维流程，通过 CLI 或脚本管理。

---

## 七、Tab 对齐建议

### 7.1 当前可用 Tab 映射

| 面板 Tab | 可用端点 | 状态 |
|---------|---------|------|
| **Dashboard** | `/api/admin/dashboard` | ✅ 可用，数据丰富 |
| **Reports** | 无独立列表端点（数据在 dashboard 中） | ❌ 需拆分 |
| **Content** | `/api/admin/content` | ✅ 可用 |
| **External Links** | `/api/admin/external-links` | ✅ 可用 |
| **Map Release** | `/__atlas-release/` | 🔒 不建议接入 |

### 7.2 建议的行动

1. **拆分 Reports Tab** — 当前 reports 仅通过 dashboard 端点返回。面板需要独立的 reports 列表视图（含分页/筛选/批量操作）。有两种方案：
   - **方案 A（后端）**：添加 `/api/admin/reports` 列表端点（支持 `?status=&locale=&page=&limit=` 参数）
   - **方案 B（前端）**：面板侧从 dashboard 提取 reports 数据（简单但无分页，最多 200 条）

2. **Dashboard 分面板** — 数据量较大，建议按以下组织：
   - KPI 指标卡（reportsTotal, reportsOpen, eventsToday, eventsPeriod）
   - 趋势图（analytics.series 日度线图）
   - 事件分布（analytics.events 柱状图）
   - 用户旅程（analytics.journeys 多维数据 — 国家/设备/浏览器/UTM/路径/会话）

3. **Content 管理** — 支持 `?section=` 过滤，适合按内容类型组织 List/Detail 视图

4. **External Links** — 数据量小（31 条），适合单页管理（列表 + 设置面板）

---

## 八、源码参考

| 文件 | 用途 |
|------|------|
| `worker/admin-api.ts` | 主路由：dashboard、reports、content endpoints |
| `worker/admin-auth.ts` | 认证：Key Auth + 密码登录 + JWT session |
| `worker/external-link-api.ts` | 外链管理 API |
| `worker/map-release-admin.ts` | 地图发布 API（R2 + Bearer Token） |
| `worker/index.ts` | Worker 入口，路由分发 |
| `worker/report-api.ts` | 公共举报提交 API（非管理端） |

**关键路由常量**（源码 `worker/admin-api.ts`）：
```typescript
const ADMIN_API_PREFIX = "/api/admin/";
const REPORT_DETAIL_PATTERN = /^\/api\/admin\/reports\/([0-9a-f-]{36})$/u;
const CONTENT_LIST_PATTERN = /^\/api\/admin\/content$/u;
const CONTENT_DETAIL_PATTERN = /^\/api\/admin\/content\/([0-9a-f-]{36})$/u;
// Dashboard: /api/admin/dashboard?days=7|30|90
// External links: /api/admin/external-links
// Map release: /__atlas-release/object|status|promote|bootstrap
```

---

## 九、交接清单

实施会话（AION2-KINA 项目会话）需要：

- [ ] **（可选）** 添加 `/api/admin/reports` 独立列表端点（支持分页/筛选）
- [ ] 在 CMS 面板中按上述 Tab 映射组织 UI
- [ ] Dashboard 面板按 metrics/analytics/journeys 分组展示
- [ ] Content 面板利用 `?section=` 过滤实现分类管理
- [ ] External Links 面板实现列表 + 新增/编辑/删除 + scalePercent 设置
- [ ] 地图发布保持 CLI 管理，不接入面板