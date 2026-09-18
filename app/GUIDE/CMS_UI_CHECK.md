---

# 只读检查：AION2 — CMS 面板 UI 检查

> 来源：`unified-admin/docs/CHECKS/aion2-panel-ui-check.md`
> 任务：**只读检查，不修改任何文件、不重启服务、不跑迁移**
> 目标：检查 AION2 worker admin API 可用端点与面板 Tab 对齐

---

## 背景

AION2 已通过 Key Auth 接入 CMS（08-11），内容套件 4 类型 + 外链已全量迁移。

## 检查范围

### 1. 运行时端点检查

通过 250 到 db11:3000，检查以下端点：

```bash
# 举报审核列表（确认是否存在列表端点）
curl -s -H "X-Aion2-Admin-Key: <KEY>" http://192.168.4.211:3000/api/admin/reports | head -c 500

# 举报详情
curl -s -H "X-Aion2-Admin-Key: <KEY>" http://192.168.4.211:3000/api/admin/reports/<UUID> | head -c 500

# 举报审核（PATCH）
curl -s -X PATCH -H "X-Aion2-Admin-Key: <KEY>" -H "Content-Type: application/json" \
  http://192.168.4.211:3000/api/admin/reports/<UUID> \
  -d '{"status":"resolved"}' | head -c 500

# Dashboard 数据
curl -s -H "X-Aion2-Admin-Key: <KEY>" http://192.168.4.211:3000/api/admin/dashboard?days=7 | head -c 500
curl -s -H "X-Aion2-Admin-Key: <KEY>" http://192.168.4.211:3000/api/admin/dashboard?days=30 | head -c 500
curl -s -H "X-Aion2-Admin-Key: <KEY>" http://192.168.4.211:3000/api/admin/dashboard?days=90 | head -c 500

# 地图发布端点（确认是否可安全接入）
curl -s -o /dev/null -w "%{http_code}" -H "X-Aion2-Admin-Key: <KEY>" \
  http://192.168.4.211:3000/__atlas-release/object
```

### 2. 端点响应结构

- reports 列表返回格式（分页？字段？）
- Dashboard 数据结构（KPIs、趋势、图表数据格式）

### 3. 源码确认

检查 `worker/admin-api.ts` 和 `worker/external-link-api.ts` 中 reports 和 dashboard 的完整路由定义。

## 输出要求

上报检查报告，包括：

1. **端点可用性表**：每个端点 → 状态码 / 响应体示例 / 备注
2. **reports 端点详情**：是否有列表端点？PATCH 操作的请求体格式
3. **Dashboard 数据结构**：days=7/30/90 的返回差异
4. **地图发布风险评估**：是否可安全接入面板，或应保持不接入
5. **Tab 对齐建议**：哪些 Tab 应该合并/拆分/重命名

## 报告输出

检查完毕后，必须产出检查报告文档，路径为：

```
GUIDE/CMS_UI_CHECK_REPORT.md
```

报告内容必须包含以上输出要求的所有项目，并附上每条 curl 命令的完整返回体。报告末尾注明文档路径：
- 本文档路径：`GUIDE/CMS_UI_CHECK.md`
- 报告文档路径：`GUIDE/CMS_UI_CHECK_REPORT.md`

## 红线

- ❌ 不修改任何文件
- ❌ 不重启服务
- ❌ 不跑迁移
- ❌ 不更改数据库
- ✅ 只执行 curl/文件读取等只读操作