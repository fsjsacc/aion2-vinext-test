"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe2,
  Inbox,
  LoaderCircle,
  LogOut,
  MessageSquareText,
  MonitorSmartphone,
  MousePointerClick,
  RefreshCw,
  Route,
  Search,
  ShieldCheck,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { trackEvent } from "@/app/analytics";

import { ExternalLinksManager } from "./ExternalLinksManager";
import styles from "./AdminDashboard.module.css";

type ReportStatus = "new" | "triaged" | "accepted" | "rejected" | "resolved";

type ReportSummary = {
  id: string;
  targetKind: string;
  targetKey: string;
  locale: string;
  service: string;
  version: string | null;
  category: string;
  message: string;
  evidenceUrl: string | null;
  status: ReportStatus;
  createdAt: number;
  updatedAt: number | null;
  resolvedAt: number | null;
};

type ReportDetail = ReportSummary & {
  contact: string | null;
  resolutionNote: string | null;
};

type JourneyDimension = {
  label: string;
  count: number;
  visitors: number;
};

type JourneySession = {
  sessionId: string;
  ipAddress: string | null;
  startedAt: number;
  lastAt: number;
  eventCount: number;
  pathCount: number;
  events: Array<{
    sessionId: string;
    eventName: string;
    path: string;
    surface: string;
    occurredAt: number;
  }>;
};

type DashboardData = {
  generatedAt: number;
  admin: { displayName: string };
  metrics: {
    reportsTotal: number;
    reportsOpen: number;
    eventsToday: number;
    eventsPeriod: number;
  };
  reports: ReportSummary[];
  analytics: {
    days: number;
    series: Array<{ day: string; count: number }>;
    events: Array<{ label: string; count: number }>;
    surfaces: Array<{ label: string; count: number }>;
    targets: Array<{ label: string; count: number }>;
  };
  journeys: {
    days: number;
    retentionDays: number;
    sampleThreshold: number;
    eventCount: number;
    uniqueVisitors: number;
    sessionCount: number;
    countries: JourneyDimension[];
    devices: JourneyDimension[];
    browsers: JourneyDimension[];
    utmSources: JourneyDimension[];
    utmCampaigns: JourneyDimension[];
    paths: JourneyDimension[];
    recentSessions: JourneySession[];
    utmMediums: JourneyDimension[];
  };
};

const statusCopy: Record<ReportStatus, string> = {
  new: "新回报",
  triaged: "已初审",
  accepted: "已确认",
  rejected: "不处理",
  resolved: "已解决",
};

const categoryCopy: Record<string, string> = {
  outdated: "资料已过期",
  incorrect: "内容有误",
  translation: "翻译问题",
  missing: "资料缺漏",
  "broken-link": "链接失效",
  other: "其他",
};

const localeCopy: Record<string, string> = {
  "zh-hant": "繁中",
  en: "英文",
  ko: "韩文",
};

const emptyDashboard: DashboardData = {
  generatedAt: 0,
  admin: { displayName: "管理员" },
  metrics: { reportsTotal: 0, reportsOpen: 0, eventsToday: 0, eventsPeriod: 0 },
  reports: [],
  analytics: { days: 30, series: [], events: [], surfaces: [], targets: [] },
  journeys: {
    days: 30,
    retentionDays: 30,
    sampleThreshold: 3,
    eventCount: 0,
    uniqueVisitors: 0,
    sessionCount: 0,
    countries: [],
    devices: [],
    browsers: [],
    utmSources: [],
    utmMediums: [],
    utmCampaigns: [],
    paths: [],
    recentSessions: [],
  },
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-Hant").format(value);
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat("zh-Hant", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function targetHref(report: Pick<ReportSummary, "targetKind" | "targetKey" | "locale">) {
  const locale = report.locale === "zh-hant" || report.locale === "ko" ? report.locale : "en";
  if (report.targetKind === "content") return `/${locale}/${report.targetKey}/`;
  if (report.targetKind === "item") return `/${locale}/database/item/${report.targetKey}/`;
  if (report.targetKind === "tool") return `/${locale}/tools/${report.targetKey}/`;
  return null;
}

function ProgressRows({ rows, empty }: { rows: Array<{ label: string; count: number }>; empty: string }) {
  const maximum = Math.max(1, ...rows.map((row) => row.count));
  if (!rows.length) return <p className={styles.emptyCompact}>{empty}</p>;
  return (
    <div className={styles.progressRows}>
      {rows.map((row) => (
        <div className={styles.progressRow} key={row.label}>
          <div className={styles.progressMeta}>
            <span title={row.label}>{row.label}</span>
            <strong>{formatNumber(row.count)}</strong>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <span style={{ width: `${Math.max(4, (row.count / maximum) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function journeyLabel(kind: "country" | "device" | "browser", label: string) {
  if (label === "unknown") return "未知";
  if (kind === "country" && /^[A-Z]{2}$/u.test(label)) {
    try {
      return new Intl.DisplayNames(["zh-Hant"], { type: "region" }).of(label) ?? label;
    } catch {
      return label;
    }
  }
  const translations: Record<string, string> = {
    desktop: "桌面装置",
    mobile: "手机",
    tablet: "平板",
    other: "其他",
    chrome: "Chrome",
    edge: "Edge",
    firefox: "Firefox",
    safari: "Safari",
    samsung: "Samsung Internet",
  };
  return translations[label] ?? label;
}

function JourneyRows({
  rows,
  empty,
  kind,
}: {
  rows: JourneyDimension[];
  empty: string;
  kind?: "country" | "device" | "browser";
}) {
  const maximum = Math.max(1, ...rows.map((row) => row.count));
  if (!rows.length) return <p className={styles.emptyCompact}>{empty}</p>;
  return (
    <div className={styles.progressRows}>
      {rows.map((row) => {
        const label = kind ? journeyLabel(kind, row.label) : row.label;
        return (
          <div className={styles.progressRow} key={row.label}>
            <div className={styles.progressMeta}>
              <span title={label}>{label}</span>
              <strong>{formatNumber(row.count)} <small>· {formatNumber(row.visitors)} 人</small></strong>
            </div>
            <div className={styles.progressTrack} aria-hidden="true">
              <span style={{ width: `${Math.max(4, (row.count / maximum) * 100)}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AdminDashboard() {
  const [days, setDays] = useState(30);
  const [dashboard, setDashboard] = useState<DashboardData>(emptyDashboard);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ReportStatus>("all");
  const [locale, setLocale] = useState("all");
  const [selectedReport, setSelectedReport] = useState<ReportDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nextStatus, setNextStatus] = useState<ReportStatus>("triaged");
  const [resolutionNote, setResolutionNote] = useState("");

  const loadDashboard = useCallback(async (range: number, quiet = false) => {
    if (quiet) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/dashboard?days=${range}`, {
        credentials: "same-origin",
        headers: { accept: "application/json" },
        cache: "no-store",
      });
      if (response.status === 401) {
        window.location.assign("/admin/login/");
        return;
      }
      if (!response.ok) throw new Error("后台资料暂时无法读取，请稍后再试。");
      const value = (await response.json()) as DashboardData;
      setDashboard(value);
      trackEvent("admin_dashboard_view", {
        audience: "admin",
        range_days: range,
        surface: "admin_dashboard",
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "后台资料暂时无法读取，请稍后再试。");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadDashboard(days), 0);
    return () => window.clearTimeout(timeout);
  }, [days, loadDashboard]);

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return dashboard.reports.filter((report) => {
      if (status !== "all" && report.status !== status) return false;
      if (locale !== "all" && report.locale !== locale) return false;
      if (!normalizedQuery) return true;
      return `${report.targetKey} ${report.message} ${report.category}`
        .toLocaleLowerCase()
        .includes(normalizedQuery);
    });
  }, [dashboard.reports, locale, query, status]);

  const openReport = async (report: ReportSummary) => {
    setDetailLoading(true);
    setSelectedReport({ ...report, contact: null, resolutionNote: null });
    setNextStatus(report.status === "new" ? "triaged" : report.status);
    setResolutionNote("");
    trackEvent("admin_report_open", {
      audience: "admin",
      category: report.category,
      surface: "admin_feedback",
    });
    try {
      const response = await fetch(`/api/admin/reports/${encodeURIComponent(report.id)}`, {
        credentials: "same-origin",
        headers: { accept: "application/json" },
        cache: "no-store",
      });
      if (!response.ok) throw new Error();
      const detail = (await response.json()) as ReportDetail;
      setSelectedReport(detail);
      setNextStatus(detail.status === "new" ? "triaged" : detail.status);
      setResolutionNote(detail.resolutionNote ?? "");
    } catch {
      setError("这笔回报的完整内容暂时无法读取。");
    } finally {
      setDetailLoading(false);
    }
  };

  const updateReport = async () => {
    if (!selectedReport || saving) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/reports/${encodeURIComponent(selectedReport.id)}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ status: nextStatus, resolutionNote }),
      });
      if (!response.ok) throw new Error();
      const updated = (await response.json()) as ReportDetail;
      setSelectedReport(updated);
      setDashboard((current) => ({
        ...current,
        reports: current.reports.map((report) => report.id === updated.id ? updated : report),
      }));
      trackEvent("admin_report_status_change", {
        audience: "admin",
        from_status: selectedReport.status,
        to_status: updated.status,
        surface: "admin_feedback",
      });
    } catch {
      setError("处理状态未能保存，请稍后再试。");
    } finally {
      setSaving(false);
    }
  };

  const applyFilter = (kind: "status" | "locale", value: string) => {
    trackEvent("admin_report_filter", {
      audience: "admin",
      filter_kind: kind,
      filter_value: value,
      surface: "admin_feedback",
    });
  };

  const signOut = async () => {
    trackEvent("admin_sign_out", { audience: "admin", surface: "admin_header" });
    try {
      await fetch("/api/admin/auth/signout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      window.location.assign("/");
    }
  };

  const seriesMaximum = Math.max(1, ...dashboard.analytics.series.map((item) => item.count));

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/zh-hant/" aria-label="返回 AION2 KINA 首页">
          {/* The platform image optimizer does not serve this private-route asset reliably. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aion2-logo.webp" width={287} height={213} alt="" />
          <span><strong>AION2</strong><small>KINA ADMIN</small></span>
        </Link>
        <div className={styles.account}>
          <span><ShieldCheck size={15} /> {dashboard.admin.displayName}</span>
          <button onClick={() => void signOut()} type="button">
            <LogOut size={15} /> 登出
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}><span /> PRIVATE OPERATIONS</p>
          <h1>站点管理中心</h1>
          <p>集中查看匿名点击趋势、经同意的短期浏览旅程、玩家资料回报与处理进度。这里的资料不会出现在公开页面或搜索索引中。</p>
        </div>
        <button
          className={styles.refreshButton}
          disabled={refreshing}
          onClick={() => void loadDashboard(days, true)}
          type="button"
        >
          <RefreshCw className={refreshing ? styles.spin : undefined} size={16} />
          重新整理
        </button>
      </section>

      {error ? (
        <div className={styles.errorBanner} role="alert">
          <TriangleAlert size={18} /><span>{error}</span>
          <button onClick={() => setError(null)} type="button" aria-label="关闭提示"><X size={16} /></button>
        </div>
      ) : null}

      {loading ? (
        <div className={styles.loadingState}><LoaderCircle className={styles.spin} /> 正在读取管理资料…</div>
      ) : (
        <>
          <section className={styles.metrics} aria-label="站点摘要">
            <article><span><MessageSquareText size={18} /> 待处理回报</span><strong>{formatNumber(dashboard.metrics.reportsOpen)}</strong><small>共 {formatNumber(dashboard.metrics.reportsTotal)} 笔</small></article>
            <article><span><Activity size={18} /> 今日互动</span><strong>{formatNumber(dashboard.metrics.eventsToday)}</strong><small>匿名聚合事件</small></article>
            <article><span><BarChart3 size={18} /> {days} 天互动</span><strong>{formatNumber(dashboard.metrics.eventsPeriod)}</strong><small>不含管理员操作</small></article>
            <article><span><Clock3 size={18} /> 最近更新</span><strong className={styles.dateMetric}>{dashboard.generatedAt ? formatDate(dashboard.generatedAt) : "—"}</strong><small>后台资料时间</small></article>
          </section>

          <section className={styles.analyticsSection}>
            <div className={styles.sectionHeader}>
              <div><p className={styles.eyebrow}>FIRST-PARTY ANALYTICS</p><h2>玩家互动趋势</h2><p>此处为匿名每日聚合事件，不包含管理员操作，也不会返回访客识别资料。</p></div>
              <div className={styles.rangePicker} aria-label="统计范围">
                {[7, 30, 90].map((range) => (
                  <button className={days === range ? styles.active : undefined} key={range} onClick={() => setDays(range)} type="button">{range} 天</button>
                ))}
              </div>
            </div>

            <div className={styles.analyticsGrid}>
              <article className={styles.chartCard}>
                <div className={styles.cardTitle}><div><h3>每日互动</h3><p>公开页面的重要点击与工具操作</p></div><Activity size={19} /></div>
                {dashboard.analytics.series.length ? (
                  <div className={styles.chart} aria-label={`${days} 天每日互动长条图`}>
                    {dashboard.analytics.series.map((item) => (
                      <div className={styles.barColumn} key={item.day} title={`${item.day}: ${item.count}`}>
                        <span style={{ height: `${Math.max(3, (item.count / seriesMaximum) * 100)}%` }} />
                      </div>
                    ))}
                  </div>
                ) : <p className={styles.emptyCompact}>新统计会从这次版本上线后开始累积。</p>}
              </article>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>热门操作</h3><p>依事件名称汇总</p></div><BarChart3 size={19} /></div>
                <ProgressRows rows={dashboard.analytics.events} empty="尚无事件资料。" />
              </article>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>热门入口</h3><p>依页面区域汇总</p></div><ArrowUpRight size={19} /></div>
                <ProgressRows rows={dashboard.analytics.surfaces} empty="尚无入口资料。" />
              </article>
            </div>
          </section>

          <section className={styles.journeySection}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>CONSENTED JOURNEYS</p>
                <h2>已同意的假名化旅程与来源</h2>
                <p>仅统计明确同意第 2 版分析条款的访客，旅程最多保留 {dashboard.journeys.retentionDays} 天；会话以短标识显示，IP 在数据库中加密保存。</p>
              </div>
            </div>

            <div className={styles.privacyNotice}>
              <ShieldCheck size={18} />
              <p>
                明确同意后，服务器会保存加密 IP、HMAC 假名标识、粗略国家／装置／浏览器、公开路径，以及限定的 UTM 来源／媒介／活动，最长 30 天；不保存完整 User-Agent、Referrer、完整查询参数或账号身份。下方 IP 仅由受保护的管理接口按需解密，细分统计至少需 {dashboard.journeys.sampleThreshold} 位访客才会显示。
              </p>
            </div>

            <div className={styles.journeyMetrics} aria-label="已同意的假名化旅程摘要">
              <article><span><MousePointerClick size={18} /> 旅程事件</span><strong>{formatNumber(dashboard.journeys.eventCount)}</strong><small>最近 {dashboard.journeys.days} 天</small></article>
              <article><span><Users size={18} /> 同意访客</span><strong>{formatNumber(dashboard.journeys.uniqueVisitors)}</strong><small>服务器假名化后去重</small></article>
              <article><span><Route size={18} /> 假名化会话</span><strong>{formatNumber(dashboard.journeys.sessionCount)}</strong><small>不显示完整会话标识</small></article>
            </div>

            <div className={styles.journeyBreakdownGrid}>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>国家／地区</h3><p>Cloudflare 提供的粗略国家代码</p></div><Globe2 size={19} /></div>
                <JourneyRows rows={dashboard.journeys.countries} kind="country" empty="尚无达到显示门槛的地区资料。" />
              </article>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>装置类型</h3><p>仅分为桌面、手机、平板或其他</p></div><MonitorSmartphone size={19} /></div>
                <JourneyRows rows={dashboard.journeys.devices} kind="device" empty="尚无达到显示门槛的装置资料。" />
              </article>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>浏览器</h3><p>仅保留浏览器家族，不保存完整版本</p></div><BarChart3 size={19} /></div>
                <JourneyRows rows={dashboard.journeys.browsers} kind="browser" empty="尚无达到显示门槛的浏览器资料。" />
              </article>
            </div>

            <div className={styles.marketingGrid}>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>UTM 来源</h3><p>仅允许 utm_source 白名单参数</p></div><ArrowUpRight size={19} /></div>
                <JourneyRows rows={dashboard.journeys.utmSources} empty="尚无达到显示门槛的来源资料。" />
              </article>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>UTM 媒介</h3><p>仅允许 utm_medium 白名单参数</p></div><MousePointerClick size={19} /></div>
                <JourneyRows rows={dashboard.journeys.utmMediums} empty="尚无达到显示门槛的媒介资料。" />
              </article>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>UTM 活动</h3><p>仅允许 utm_campaign 白名单参数</p></div><Activity size={19} /></div>
                <JourneyRows rows={dashboard.journeys.utmCampaigns} empty="尚无达到显示门槛的活动资料。" />
              </article>
            </div>

            <div className={styles.journeyDetailGrid}>
              <article className={styles.listCard}>
                <div className={styles.cardTitle}><div><h3>热门公开路径</h3><p>查询参数与 URL fragment 已移除</p></div><Route size={19} /></div>
                <JourneyRows rows={dashboard.journeys.paths} empty="尚无达到显示门槛的路径资料。" />
              </article>
              <article className={`${styles.listCard} ${styles.sessionCard}`}>
                <div className={styles.cardTitle}><div><h3>最近假名化会话</h3><p>仅显示至少 2 个事件的同意会话；最多展示 8 个最近事件</p></div><Clock3 size={19} /></div>
                {dashboard.journeys.recentSessions.length ? (
                  <div className={styles.sessionList}>
                    {dashboard.journeys.recentSessions.map((session) => (
                      <section className={styles.session} key={`${session.sessionId}-${session.startedAt}`}>
                        <header>
                          <div><strong>会话 {session.sessionId.toUpperCase()}</strong><time>{formatDate(session.lastAt)}</time></div>
                          <span>{session.eventCount} 个事件 · {session.pathCount} 个路径 · IP {session.ipAddress ?? "未记录"}</span>
                        </header>
                        <ol>
                          {session.events.map((event, index) => (
                            <li key={`${event.occurredAt}-${event.eventName}-${index}`}>
                              <time>{new Intl.DateTimeFormat("zh-Hant", { hour: "2-digit", minute: "2-digit" }).format(new Date(event.occurredAt))}</time>
                              <span>{event.eventName}</span>
                              <code title={event.path}>{event.path}</code>
                            </li>
                          ))}
                        </ol>
                      </section>
                    ))}
                  </div>
                ) : <p className={styles.emptyCompact}>尚无符合条件的假名化会话；访客同意第 2 版分析条款并产生连续事件后才会显示。</p>}
              </article>
            </div>
          </section>

          <section className={styles.feedbackSection}>
            <div className={styles.sectionHeader}>
              <div><p className={styles.eyebrow}>PLAYER FEEDBACK</p><h2>玩家回报</h2><p>处理资料过期、内容错误、翻译与链接问题。</p></div>
              <span className={styles.resultCount}>{filteredReports.length} 笔结果</span>
            </div>

            <div className={styles.filters}>
              <label className={styles.searchField}><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜寻目标或回报内容" /></label>
              <label><span>状态</span><select value={status} onChange={(event) => { const value = event.target.value as "all" | ReportStatus; setStatus(value); applyFilter("status", value); }}><option value="all">全部状态</option>{Object.entries(statusCopy).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
              <label><span>语言</span><select value={locale} onChange={(event) => { setLocale(event.target.value); applyFilter("locale", event.target.value); }}><option value="all">全部语言</option>{Object.entries(localeCopy).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            </div>

            <div className={styles.reportList}>
              {filteredReports.length ? filteredReports.map((report) => {
                const href = targetHref(report);
                return (
                  <article className={styles.reportRow} key={report.id}>
                    <button className={styles.reportMain} onClick={() => void openReport(report)} type="button">
                      <span className={`${styles.statusDot} ${styles[`status_${report.status}`]}`} />
                      <span className={styles.reportCopy}>
                        <span className={styles.reportMeta}><strong>{categoryCopy[report.category] ?? report.category}</strong><span>{localeCopy[report.locale] ?? report.locale}</span><span>{statusCopy[report.status]}</span><time>{formatDate(report.createdAt)}</time></span>
                        <span className={styles.reportTarget}>{report.targetKey}</span>
                        <span className={styles.reportMessage}>{report.message}</span>
                      </span>
                      <ChevronRight size={18} />
                    </button>
                    {href ? <a className={styles.targetLink} href={href} target="_blank" rel="noopener noreferrer" title="开启目标页面"><ExternalLink size={15} /></a> : null}
                  </article>
                );
              }) : (
                <div className={styles.emptyState}><Inbox size={28} /><strong>没有符合条件的回报</strong><span>调整筛选条件，或稍后等待新的玩家回报。</span></div>
              )}
            </div>
          </section>

          <ExternalLinksManager />
        </>
      )}

      {selectedReport ? (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelectedReport(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="report-detail-title">
            <header><div><p className={styles.eyebrow}>FEEDBACK DETAIL</p><h2 id="report-detail-title">回报详情</h2></div><button type="button" onClick={() => setSelectedReport(null)} aria-label="关闭回报详情"><X /></button></header>
            {detailLoading ? <div className={styles.loadingState}><LoaderCircle className={styles.spin} /> 正在读取完整回报…</div> : (
              <div className={styles.modalBody}>
                <div className={styles.detailGrid}>
                  <div><span>资料目标</span><strong>{selectedReport.targetKey}</strong></div>
                  <div><span>问题类型</span><strong>{categoryCopy[selectedReport.category] ?? selectedReport.category}</strong></div>
                  <div><span>语言 / 服务</span><strong>{localeCopy[selectedReport.locale] ?? selectedReport.locale} · {selectedReport.service}</strong></div>
                  <div><span>送出时间</span><strong>{formatDate(selectedReport.createdAt)}</strong></div>
                </div>
                <div className={styles.detailBlock}><span>问题说明</span><p>{selectedReport.message}</p></div>
                {selectedReport.evidenceUrl ? <div className={styles.detailBlock}><span>证据链接</span><a href={selectedReport.evidenceUrl} target="_blank" rel="noopener noreferrer">开启玩家提供的参考资料 <ExternalLink size={14} /></a></div> : null}
                {selectedReport.contact ? <div className={styles.detailBlock}><span>联络方式（敏感资料）</span><p>{selectedReport.contact}</p></div> : null}
                <div className={styles.actionPanel}>
                  <label><span>处理状态</span><select value={nextStatus} onChange={(event) => setNextStatus(event.target.value as ReportStatus)}>{Object.entries(statusCopy).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
                  <label><span>内部处理备注</span><textarea value={resolutionNote} onChange={(event) => setResolutionNote(event.target.value)} maxLength={1000} placeholder="记录核对结果或后续处理方式；不会显示给玩家。" /></label>
                  <button type="button" onClick={() => void updateReport()} disabled={saving}>{saving ? <LoaderCircle className={styles.spin} size={16} /> : <CheckCircle2 size={16} />} 保存处理结果</button>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </main>
  );
}
