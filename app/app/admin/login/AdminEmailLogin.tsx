"use client";

import {
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/app/analytics";

import styles from "./AdminEmailLogin.module.css";

type RequestState = "idle" | "loading" | "success" | "error";

export function AdminEmailLogin() {
  const [state, setState] = useState<RequestState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const submitPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state === "loading" || !password) return;
    setState("loading");
    setMessage(null);
    trackEvent("admin_password_login_attempt", {
      audience: "admin",
      surface: "admin_login",
    });

    try {
      const response = await fetch("/api/admin/auth/password/login", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 429) {
        setState("error");
        setMessage("请求次数过多，请稍后再试。");
        trackEvent("admin_password_login_result", {
          audience: "admin",
          result: "rate_limited",
          surface: "admin_login",
        });
        return;
      }

      if (response.status === 401) {
        setState("error");
        setMessage("密码错误，请重试。");
        setPassword("");
        trackEvent("admin_password_login_result", {
          audience: "admin",
          result: "invalid_password",
          surface: "admin_login",
        });
        return;
      }

      if (!response.ok) {
        setState("error");
        setMessage("登录服务暂时无法使用，请稍后重试。");
        trackEvent("admin_password_login_result", {
          audience: "admin",
          result: "error",
          surface: "admin_login",
        });
        return;
      }

      setState("success");
      setMessage("登录成功，正在进入管理后台……");
      trackEvent("admin_password_login_result", {
        audience: "admin",
        result: "success",
        surface: "admin_login",
      });
      window.location.replace("/admin/");
    } catch {
      setState("error");
      setMessage("网络连接失败，请检查网络后重试。");
      trackEvent("admin_password_login_result", {
        audience: "admin",
        result: "network_error",
        surface: "admin_login",
      });
    }
  };

  const statusClassName = state === "error"
    ? styles.errorStatus
    : state === "success"
      ? styles.successStatus
      : styles.infoStatus;

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true" />
      <section className={styles.loginShell} aria-labelledby="admin-login-title">
        <header className={styles.brandHeader}>
          <Link className={styles.brand} href="/zh-hant/" aria-label="返回 AION2 KINA 首页">
            {/* The platform image optimizer does not serve this private-route asset reliably. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/aion2-logo.webp" width={287} height={213} alt="" />
            <span><strong>AION2</strong><small>KINA ADMIN</small></span>
          </Link>
          <span className={styles.privateBadge}><LockKeyhole size={14} /> PRIVATE</span>
        </header>

        <div className={styles.content}>
          <div className={styles.securityMark} aria-hidden="true">
            {state === "loading"
              ? <LoaderCircle className={styles.spin} size={28} />
              : <ShieldCheck size={28} />}
          </div>
          <p className={styles.eyebrow}>ADMIN ACCESS</p>
          <h1 id="admin-login-title">管理员安全登录</h1>
          <p className={styles.lead}>
            请输入管理员密码以进入后台。此页面与管理后台均不向搜索引擎开放。
          </p>

          <form onSubmit={submitPassword} className={styles.verificationField}>
            <LockKeyhole size={18} aria-hidden="true" />
            <div style={{ flex: 1 }}>
              <span>管理员密码</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入密码"
                disabled={state === "loading"}
                autoFocus
                autoComplete="current-password"
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "10px 12px",
                  background: "rgba(10, 20, 30, 0.8)",
                  border: "1px solid #2a3b49",
                  borderRadius: 8,
                  color: "#eef7ff",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
          </form>

          <button
            className={styles.primaryButton}
            disabled={state === "loading" || !password}
            onClick={submitPassword as unknown as React.MouseEventHandler}
            type="button"
            style={{ marginTop: 16 }}
          >
            {state === "loading"
              ? <LoaderCircle className={styles.spin} size={18} />
              : <LockKeyhole size={18} />}
            {state === "loading" ? "正在验证……" : "登录"}
          </button>

          {message ? (
            <p className={`${styles.statusMessage} ${statusClassName}`} role={state === "error" ? "alert" : "status"}>
              {state === "success" ? <ShieldCheck size={16} /> : null}
              {message}
            </p>
          ) : null}
        </div>

        <footer>
          <ShieldCheck size={14} />
          <span>登录页与管理后台均不向搜索引擎开放，验证凭据不会写入分析数据。</span>
        </footer>
      </section>
    </main>
  );
}
