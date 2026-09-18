---

# AION2 CMS 面板修复计划

> 来源：`GUIDE/CMS_UI_CHECK_REPORT.md`（08-24 检查报告）
> 执行归属：AION2-KINA 项目会话
> 审查：unified-admin 会话（2026-08-24）

---

## 一、检查结论摘要

| 端点 | 状态 | 说明 |
|------|------|------|
| Dashboard | ✅ 可用，数据丰富 | metrics/analytics/journeys 三维 |
| Reports | ❌ 无独立列表端点 | 内嵌在 dashboard 中，最多 200 条 |
| Content (4 types) | ✅ 完整 CRUD | 支持 `?section=` 过滤 |
| External Links | ✅ 31 条正常 | 含 scalePercent 设置 |
| Map Release | 🔒 不建议接入 CMS | Bearer Token 认证，底层运维操作 |

---

## 二、修复项

### 修复 1：添加 Reports 独立列表端点（后端，AION2 项目会话）

**现状**：`/api/admin/reports` 返回 404，reports 仅通过 dashboard 端点内嵌返回（最多 200 条，无分页/筛选）。

**操作**：在 `worker/admin-api.ts` 中添加：

```
GET /api/admin/reports?status=&locale=&page=&limit=  → 200 JSON
```

支持参数：
- `status`（可选）：`new` / `triaged` / `accepted` / `rejected` / `resolved`
- `locale`（可选）：语言代码筛选
- `page`（可选，默认 1）
- `limit`（可选，默认 20，最大 100）
- 返回：`{ data: [...], total: N, page: N, limit: N }`

**工作量**：~30 分钟（新增路由 + D1 查询 + 分页）

### 修复 2：面板 Tab 重组（前端，cms-panel 通用能力）

**注意**：AION2 的面板 UI 优化是在 **cms-panel/**（通用 CRUD 架构）中做的，不在项目代码中。cms-panel 的 ContentList/ContentEdit 已支持 schema 驱动的通用 CRUD，AION2 的 Content 和 External Links 已自动适配。

**需要做的**：cms-panel 需要支持 AION2 特有的 Dashboard 数据展示（metrics/analytics/journeys 三维）。这是 cms-panel 的通用能力，不归 AION2 项目会话。

**AION2 项目会话不需要做此工作**，只需完成修复 1（后端端点）。

### 修复 3：地图发布保持 CLI 管理（不接入 CMS）

**决策**：地图发布使用 Bearer Token 认证，属于底层运维操作，不建议接入 CMS 面板。保持现状。

---

## 三、执行步骤

### Step 1：添加 reports 独立列表端点

文件：`worker/admin-api.ts`

```typescript
// 新增路由常量
const ADMIN_REPORTS_LIST_PATTERN = /^\/api\/admin\/reports$/u;

// 在 handleRequest 中添加
if (ADMIN_REPORTS_LIST_PATTERN.test(path)) {
  if (request.method === 'GET') {
    return handleAdminReportsList(request, env);
  }
}

// 实现处理函数
async function handleAdminReportsList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const locale = url.searchParams.get('locale');
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20', 10), 100);
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM reports';
  const conditions: string[] = [];
  const params: any[] = [];

  if (status) { conditions.push('status = ?'); params.push(status); }
  if (locale) { conditions.push('locale = ?'); params.push(locale); }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // 先查总数
  const countResult = await env.DB.prepare(
    'SELECT COUNT(*) as total FROM reports' + (conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '')
  ).bind(...params).first();

  // 再查分页
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  const { results } = await env.DB.prepare(query).bind(...params).all();

  return Response.json({
    data: results,
    total: (countResult as any).total,
    page,
    limit,
  });
}
```

### Step 2：验证

```bash
# 重启后测试
curl -s -H "X-Aion2-Admin-Key: <KEY>" "http://192.168.4.211:3000/api/admin/reports"
curl -s -H "X-Aion2-Admin-Key: <KEY>" "http://192.168.4.211:3000/api/admin/reports?status=new&page=1&limit=10"
```

---

## 四、验证清单

| # | 验证项 | 预期 |
|---|--------|------|
| 1 | `GET /api/admin/reports` | 200，返回全部 reports 分页列表 |
| 2 | `GET /api/admin/reports?status=new` | 200，仅返回 status=new 的报告 |
| 3 | `GET /api/admin/reports?page=1&limit=5` | 200，返回前 5 条 |
| 4 | `GET /api/admin/reports?status=invalid` | 200，返回空列表 |
| 5 | 旧 dashboard 端点不受影响 | `GET /api/admin/dashboard?days=7` 仍返回完整数据 |

---

## 五、输出要求

执行完毕后，必须产出执行报告文档，路径为：

```
GUIDE/CMS_UI_FIX_REPORT.md
```

报告内容必须包含：

1. **改动文件清单**：每个文件 → 修改内容 / 行数
2. **验证结果**：验证清单中 5 项测试的实测结果（curl 命令 + 返回体）
3. **部署确认**：`systemctl restart app` 后的服务状态
4. **未做的说明**：确认哪些项目按计划不做
5. **完整文档路径**：本文档路径 + 执行报告文档路径（供 unified-admin 会话审查）

---

## 六、不做的

- ❌ 地图发布接入 CMS 面板
- ❌ Dashboard 面板 UI（cms-panel 侧的工作，不归 AION2 会话）
- ❌ 修改认证方式（Key Auth 保持现状）
- ❌ 修改 Content API 结构（当前 schema 已适配 CMS）