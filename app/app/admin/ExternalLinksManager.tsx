"use client";

import {
  CheckCircle2,
  Code2,
  ExternalLink,
  ImageIcon,
  Link2,
  LoaderCircle,
  SlidersHorizontal,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { trackEvent } from "@/app/analytics";
import {
  DEFAULT_EXTERNAL_LINK_SCALE_PERCENT,
  MAX_EXTERNAL_LINK_SCALE_PERCENT,
  MIN_EXTERNAL_LINK_SCALE_PERCENT,
} from "@/app/external-link-values";

import styles from "./AdminDashboard.module.css";

type ExternalLinkItem = {
  id: string;
  href: string;
  badgeType: "image" | "text";
  imageSrc: string | null;
  alt: string;
  height: number;
  createdAt: number;
};

type ExternalLinkSettings = {
  scalePercent: number;
};

type RequestState = "idle" | "loading" | "saving" | "success" | "error";

const exampleCode =
  '<a target="_blank" href="https://goodaitools.com/ai/aion2kina"><img src="https://goodaitools.com/assets/images/badge.png" alt="优秀的AI工具" height="54" loading="lazy"></a>';
const exampleTextCode =
  '<a href="https://mossai.org" title="MossAI Tools">MossAI Tools</a>';

function formatDate(value: number) {
  return new Intl.DateTimeFormat("zh-Hant", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ExternalLinksManager() {
  const [links, setLinks] = useState<ExternalLinkItem[]>([]);
  const [code, setCode] = useState("");
  const [customHref, setCustomHref] = useState("");
  const [customAlt, setCustomAlt] = useState("");
  const [customImageSrc, setCustomImageSrc] = useState("");
  const [state, setState] = useState<RequestState>("loading");
  const [message, setMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [scalePercent, setScalePercent] = useState(
    DEFAULT_EXTERNAL_LINK_SCALE_PERCENT,
  );
  const [savedScalePercent, setSavedScalePercent] = useState(
    DEFAULT_EXTERNAL_LINK_SCALE_PERCENT,
  );
  const [settingsSaving, setSettingsSaving] = useState(false);

  const loadLinks = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/external-links", {
        cache: "no-store",
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      if (response.status === 401) {
        window.location.assign("/admin/login/");
        return;
      }
      const body = (await response.json()) as {
        links?: ExternalLinkItem[];
        settings?: ExternalLinkSettings;
        error?: string;
      };
      if (!response.ok) throw new Error(body.error ?? "外链资料暂时无法读取。");
      setLinks(body.links ?? []);
      const nextScalePercent =
        body.settings?.scalePercent ??
        DEFAULT_EXTERNAL_LINK_SCALE_PERCENT;
      setScalePercent(nextScalePercent);
      setSavedScalePercent(nextScalePercent);
      setState("idle");
    } catch (caught) {
      setState("error");
      setMessage(
        caught instanceof Error ? caught.message : "外链资料暂时无法读取。",
      );
    }
  }, []);

  useEffect(() => {
    // The loader performs an awaited network request before committing state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadLinks();
  }, [loadLinks]);

  const saveScalePercent = async () => {
    if (settingsSaving || scalePercent === savedScalePercent) return;
    setSettingsSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/external-links", {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ scalePercent }),
      });
      const body = (await response.json()) as {
        settings?: ExternalLinkSettings;
        error?: string;
      };
      if (!response.ok || !body.settings) {
        throw new Error(body.error ?? "徽章比例未能保存，请稍后再试。");
      }
      setScalePercent(body.settings.scalePercent);
      setSavedScalePercent(body.settings.scalePercent);
      setState("success");
      setMessage(`徽章显示比例已更新为 ${body.settings.scalePercent}%。`);
      trackEvent("admin_external_link_scale_update", {
        audience: "admin",
        scale_percent: body.settings.scalePercent,
        surface: "admin_external_links",
      });
    } catch (caught) {
      setState("error");
      setMessage(
        caught instanceof Error
          ? caught.message
          : "徽章比例未能保存，请稍后再试。",
      );
    } finally {
      setSettingsSaving(false);
    }
  };

  const saveLink = async (
    payload:
      | { code: string }
      | { href: string; imageSrc: string; alt: string },
    entryMode: "code" | "custom",
  ) => {
    if (state === "saving") return;
    setState("saving");
    setMessage(null);
    try {
      const response = await fetch("/api/admin/external-links", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as {
        link?: ExternalLinkItem;
        operation?: "created" | "updated";
        error?: string;
      };
      if (!response.ok || !body.link) {
        throw new Error(body.error ?? "外链未能保存，请稍后再试。");
      }
      const savedLink = body.link;
      const updated = body.operation === "updated";
      setLinks((current) =>
        updated
          ? current.map((item) =>
              item.id === savedLink.id ? savedLink : item,
            )
          : [...current, savedLink],
      );
      if (entryMode === "code") {
        setCode("");
      } else {
        setCustomHref("");
        setCustomAlt("");
        setCustomImageSrc("");
      }
      setState("success");
      setMessage(
        updated
          ? "已更新现有外链的徽章样式，公开页面会在短时间内显示。"
          : "已加入网站底部，公开页面会在短时间内显示这个徽章。",
      );
      trackEvent(
        updated
          ? "admin_external_link_update"
          : "admin_external_link_add",
        {
          audience: "admin",
          badge_type: savedLink.badgeType,
          destination: new URL(savedLink.href).hostname,
          entry_mode: entryMode,
          surface: "admin_external_links",
        },
      );
    } catch (caught) {
      setState("error");
      setMessage(
        caught instanceof Error ? caught.message : "外链未能保存，请稍后再试。",
      );
    }
  };

  const deleteLink = async (link: ExternalLinkItem) => {
    if (deletingId || !window.confirm(`确定删除「${link.alt}」吗？`)) return;
    setDeletingId(link.id);
    setMessage(null);
    try {
      const response = await fetch(
        `/api/admin/external-links/${encodeURIComponent(link.id)}`,
        {
          method: "DELETE",
          credentials: "same-origin",
          headers: { accept: "application/json" },
        },
      );
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "外链未能删除，请稍后再试。");
      }
      setLinks((current) => current.filter((item) => item.id !== link.id));
      setState("success");
      setMessage("外链已删除。");
      trackEvent("admin_external_link_delete", {
        audience: "admin",
        destination: new URL(link.href).hostname,
        surface: "admin_external_links",
      });
    } catch (caught) {
      setState("error");
      setMessage(
        caught instanceof Error ? caught.message : "外链未能删除，请稍后再试。",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={styles.externalLinksSection}>
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>FOOTER PARTNERS</p>
          <h2>页脚外链</h2>
          <p>
            可粘贴图片或纯文字徽章代码，也可以直接填写网址、名称和徽章图片。
            系统只保存经过验证的 HTTPS 链接与安全字段，不会执行贴入的 HTML。
          </p>
        </div>
        <span className={styles.resultCount}>{links.length} 个外链</span>
      </div>

      <div className={styles.externalLinkSettings}>
        <div className={styles.externalLinkSettingsHeader}>
          <span className={styles.externalLinkSettingsIcon}>
            <SlidersHorizontal size={18} />
          </span>
          <div>
            <strong>徽章显示比例</strong>
            <small>统一控制页脚跑马灯内所有反向链接徽章的尺寸。</small>
          </div>
          <output htmlFor="external-link-scale">{scalePercent}%</output>
        </div>
        <div className={styles.externalLinkScaleControl}>
          <span>{MIN_EXTERNAL_LINK_SCALE_PERCENT}%</span>
          <input
            aria-label="徽章显示比例"
            disabled={state === "loading" || settingsSaving}
            id="external-link-scale"
            max={MAX_EXTERNAL_LINK_SCALE_PERCENT}
            min={MIN_EXTERNAL_LINK_SCALE_PERCENT}
            onChange={(event) => {
              setScalePercent(Number(event.target.value));
              if (state === "success") {
                setState("idle");
                setMessage(null);
              }
            }}
            step={5}
            type="range"
            value={scalePercent}
          />
          <span>{MAX_EXTERNAL_LINK_SCALE_PERCENT}%</span>
          <button
            disabled={
              state === "loading" ||
              settingsSaving ||
              scalePercent === savedScalePercent
            }
            onClick={() => void saveScalePercent()}
            type="button"
          >
            {settingsSaving ? (
              <LoaderCircle className={styles.spin} size={16} />
            ) : (
              <CheckCircle2 size={16} />
            )}
            保存比例
          </button>
        </div>
      </div>

      <div className={styles.externalLinkEntryGrid}>
        <div className={styles.externalLinkEditor}>
          <div className={styles.externalLinkEditorHeading}>
            <Code2 size={17} />
            <div>
              <strong>粘贴一行徽章代码</strong>
              <small>
                支持 <code>&lt;a&gt;&lt;img&gt;&lt;/a&gt;</code> 图片徽章和{" "}
                <code>&lt;a&gt;文字&lt;/a&gt;</code> 纯文字徽章。
              </small>
            </div>
          </div>
          <label>
            <span>一行徽章代码</span>
            <textarea
              maxLength={4096}
              onChange={(event) => {
                setCode(event.target.value);
                if (state === "success") {
                  setState("idle");
                  setMessage(null);
                }
              }}
              placeholder={`${exampleCode}\n\n或\n\n${exampleTextCode}`}
              spellCheck={false}
              value={code}
            />
          </label>
          <button
            disabled={!code.trim() || state === "saving"}
            onClick={() => void saveLink({ code }, "code")}
            type="button"
          >
            {state === "saving" ? (
              <LoaderCircle className={styles.spin} size={17} />
            ) : (
              <Link2 size={17} />
            )}
            加入网站底部
          </button>
        </div>

        <div className={styles.externalLinkCustomEditor}>
          <div className={styles.externalLinkEditorHeading}>
            <ImageIcon size={17} />
            <div>
              <strong>自定义徽章</strong>
              <small>
                图片网址可以留空；留空时会自动生成纯文字徽章。
              </small>
            </div>
          </div>
          <div className={styles.externalLinkCustomFields}>
            <label>
              <span>跳转网址</span>
              <input
                maxLength={2048}
                onChange={(event) => setCustomHref(event.target.value)}
                placeholder="https://example.com/item/aion2-kina"
                type="url"
                value={customHref}
              />
            </label>
            <label>
              <span>徽章名称</span>
              <input
                maxLength={120}
                onChange={(event) => setCustomAlt(event.target.value)}
                placeholder="Featured on Example"
                type="text"
                value={customAlt}
              />
            </label>
            <label className={styles.externalLinkCustomImageField}>
              <span>徽章图片网址（可选）</span>
              <input
                maxLength={2048}
                onChange={(event) => setCustomImageSrc(event.target.value)}
                placeholder="https://example.com/badge.svg"
                type="url"
                value={customImageSrc}
              />
            </label>
          </div>
          <button
            disabled={
              !customHref.trim() ||
              !customAlt.trim() ||
              state === "saving"
            }
            onClick={() =>
              void saveLink(
                {
                  href: customHref,
                  imageSrc: customImageSrc,
                  alt: customAlt,
                },
                "custom",
              )
            }
            type="button"
          >
            {state === "saving" ? (
              <LoaderCircle className={styles.spin} size={17} />
            ) : (
              <Link2 size={17} />
            )}
            保存自定义徽章
          </button>
        </div>
      </div>

      {message ? (
        <p
          className={`${styles.externalLinkMessage} ${
            state === "error"
              ? styles.externalLinkMessageError
              : styles.externalLinkMessageSuccess
          }`}
          role={state === "error" ? "alert" : "status"}
        >
          {state === "error" ? (
            <TriangleAlert size={16} />
          ) : (
            <CheckCircle2 size={16} />
          )}
          {message}
        </p>
      ) : null}

      {state === "loading" ? (
        <div className={styles.externalLinkEmpty}>
          <LoaderCircle className={styles.spin} size={20} />
          正在读取外链…
        </div>
      ) : links.length ? (
        <div className={styles.externalLinkList}>
          {links.map((link) => {
            const displayHeight = Math.round(
              link.height * (scalePercent / 100),
            );
            return (
              <article className={styles.externalLinkRow} key={link.id}>
                <div className={styles.externalLinkBadge}>
                  {link.badgeType === "text" ? (
                    <span
                      className={styles.externalLinkTextBadge}
                      style={{ height: displayHeight }}
                    >
                      {link.alt}
                    </span>
                  ) : link.imageSrc ? (
                    <>
                      {/* Admin preview intentionally shows the supplied remote partner badge. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={link.alt}
                        height={displayHeight}
                        loading="lazy"
                        src={link.imageSrc}
                      />
                    </>
                  ) : null}
                </div>
                <div className={styles.externalLinkMeta}>
                  <strong>{link.alt}</strong>
                  <a href={link.href} rel="noopener noreferrer" target="_blank">
                    {link.href}
                    <ExternalLink size={13} />
                  </a>
                  <small>加入于 {formatDate(link.createdAt)}</small>
                </div>
                <button
                  aria-label={`删除 ${link.alt}`}
                  disabled={deletingId === link.id}
                  onClick={() => void deleteLink(link)}
                  title="删除外链"
                  type="button"
                >
                  {deletingId === link.id ? (
                    <LoaderCircle className={styles.spin} size={17} />
                  ) : (
                    <Trash2 size={17} />
                  )}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.externalLinkEmpty}>
          <Link2 size={24} />
          <strong>还没有页脚外链</strong>
          <span>贴入徽章代码或填写自定义徽章后，会立即出现在这里。</span>
        </div>
      )}
    </section>
  );
}
