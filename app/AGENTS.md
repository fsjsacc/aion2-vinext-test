# 项目永久规则

## GA4 与行为埋点

- 每次修改项目时，都必须检查 Google Analytics 4 是否仍已接入，Measurement ID 必须为 `G-XDH0X1HZR2`。
- 如果 GA4 缺失，必须在本次修改中补上；如果项目已通过 Google Tag Manager 投放该 Measurement ID，不得再重复加载 `gtag.js` 或重复执行 `gtag('config', ...)`。
- 每次新增或修改用户可交互功能、关键入口、转化路径或重要业务流程时，都必须检查相应的事件埋点是否完整；若缺失，必须使用项目现有的 `trackEvent` / `dataLayer` 方案补齐。
- 修改完成后，应检查或运行相关测试，确认 GA4 接入、Measurement ID 与事件埋点没有被移除、写错或重复加载。
