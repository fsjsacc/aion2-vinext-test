"use client";

/* eslint-disable @next/next/no-img-element -- The preview is a runtime-created Blob URL. */

import { Copy, Download, Link2, RefreshCw, Share2, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

import type { ClassFinderResult } from "@/app/class-finder-data";
import {
  editorialClassFinderShareCopy,
  type ClassFinderShareCopy,
} from "@/app/class-finder-localization";
import {
  createClassFinderPoster,
  type ClassFinderPoster,
} from "@/app/class-finder-poster";
import type { SiteLocale } from "@/app/site-config";

import styles from "./ClassFinderShareDialog.module.css";

const coreShareCopy = {
  "zh-hant": {
    title: "分享你的職業結果",
    description: "圖片只會在目前裝置產生，不會上傳你的答案。",
    generating: "正在生成結果圖片…",
    ready: "結果圖片已生成",
    failed: "圖片生成失敗，仍可複製結果連結。",
    retry: "重新生成",
    shareImage: "分享圖片",
    copyImage: "複製圖片",
    downloadImage: "下載圖片",
    copyLink: "複製結果連結",
    shared: "已開啟圖片分享",
    copiedImage: "結果圖片已複製",
    downloaded: "結果圖片已下載",
    copiedLink: "結果連結已複製",
    copyFailed: "瀏覽器無法自動複製，請手動複製下方連結。",
    close: "關閉分享結果",
    imageAlt: (name: string) => `${name} 為首選的 AION2 職業適性結果圖片`,
    resultSummary: "圖片中的職業結果",
  },
  en: {
    title: "Share your class matches",
    description: "The image is created on this device. Your answers are not uploaded.",
    generating: "Creating your result image…",
    ready: "Result image ready",
    failed: "The image could not be created. You can still copy the result link.",
    retry: "Try again",
    shareImage: "Share image",
    copyImage: "Copy image",
    downloadImage: "Download image",
    copyLink: "Copy result link",
    shared: "Image sharing opened",
    copiedImage: "Result image copied",
    downloaded: "Result image downloaded",
    copiedLink: "Result link copied",
    copyFailed: "Automatic copy failed. Copy the link below manually.",
    close: "Close shared result",
    imageAlt: (name: string) => `AION2 class match image with ${name} as the top match`,
    resultSummary: "Classes shown in the image",
  },
  ko: {
    title: "직업 추천 결과 공유",
    description: "이미지는 현재 기기에서만 생성되며 답변은 업로드되지 않습니다.",
    generating: "결과 이미지를 만드는 중…",
    ready: "결과 이미지가 준비되었습니다",
    failed: "이미지를 만들지 못했습니다. 결과 링크는 계속 복사할 수 있습니다.",
    retry: "다시 만들기",
    shareImage: "이미지 공유",
    copyImage: "이미지 복사",
    downloadImage: "이미지 다운로드",
    copyLink: "결과 링크 복사",
    shared: "이미지 공유 창을 열었습니다",
    copiedImage: "결과 이미지를 복사했습니다",
    downloaded: "결과 이미지를 다운로드했습니다",
    copiedLink: "결과 링크를 복사했습니다",
    copyFailed: "자동 복사에 실패했습니다. 아래 링크를 직접 복사해 주세요.",
    close: "공유 결과 닫기",
    imageAlt: (name: string) => `${name}이 최우선 추천인 AION2 직업 적합도 결과 이미지`,
    resultSummary: "이미지에 표시된 직업 결과",
  },
} as const satisfies Record<"zh-hant" | "en" | "ko", ClassFinderShareCopy>;

const shareCopy: Record<SiteLocale, ClassFinderShareCopy> = {
  ...coreShareCopy,
  ...editorialClassFinderShareCopy,
};

const shareKicker: Record<SiteLocale, string> = {
  "zh-hans": "AION2 KINA · 职业适配",
  en: "AION2 KINA · CLASS MATCH",
  fr: "AION2 KINA · AFFINITÉ DE CLASSE",
  de: "AION2 KINA · KLASSENPASSUNG",
  es: "AION2 KINA · AFINIDAD DE CLASE",
  ja: "AION2 KINA · クラス適性",
  "pt-br": "AION2 KINA · AFINIDADE DE CLASSE",
  ru: "AION2 KINA · ПОДБОР КЛАССА",
  ko: "AION2 KINA · 직업 적합도",
  "zh-hant": "AION2 KINA · 職業適性",
};

type PosterStatus = "idle" | "loading" | "ready" | "error";

type ClassFinderShareDialogProps = {
  locale: SiteLocale;
  onClose: () => void;
  onEvent: (event: string, payload?: Record<string, unknown>) => void;
  open: boolean;
  recommendations: readonly ClassFinderResult[];
  shareUrl: string;
};

export function ClassFinderShareDialog({
  locale,
  onClose,
  onEvent,
  open,
  recommendations,
  shareUrl,
}: ClassFinderShareDialogProps) {
  const text = shareCopy[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const generationRef = useRef(0);
  const posterUrlRef = useRef("");
  const [poster, setPoster] = useState<ClassFinderPoster | null>(null);
  const [posterUrl, setPosterUrl] = useState("");
  const [posterStatus, setPosterStatus] = useState<PosterStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [manualLink, setManualLink] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);

  function releasePosterUrl() {
    if (!posterUrlRef.current) return;
    URL.revokeObjectURL(posterUrlRef.current);
    posterUrlRef.current = "";
  }

  async function generatePoster() {
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    releasePosterUrl();
    await Promise.resolve();
    if (generationRef.current !== generation) return;
    setPosterUrl("");
    setPoster(null);
    setPosterStatus("loading");
    setStatusMessage(text.generating);
    setCanShareFiles(false);

    try {
      const nextPoster = await createClassFinderPoster(locale, recommendations);
      if (generationRef.current !== generation) return;
      const nextUrl = URL.createObjectURL(nextPoster.blob);
      posterUrlRef.current = nextUrl;
      setPoster(nextPoster);
      setPosterUrl(nextUrl);
      setPosterStatus("ready");
      setStatusMessage(text.ready);

      const file = new File([nextPoster.blob], nextPoster.fileName, {
        type: "image/png",
      });
      setCanShareFiles(
        typeof navigator.share === "function" &&
          typeof navigator.canShare === "function" &&
          navigator.canShare({ files: [file] }),
      );
      onEvent("poster_ready", {
        primary_class: recommendations[0]?.classId,
        image_width: nextPoster.width,
        image_height: nextPoster.height,
      });
    } catch {
      if (generationRef.current !== generation) return;
      setPosterStatus("error");
      setStatusMessage(text.failed);
      onEvent("poster_error", {
        primary_class: recommendations[0]?.classId,
      });
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
        dialog.showModal();
      }
      queueMicrotask(() => {
        if (dialogRef.current?.open) void generatePoster();
      });
      return;
    }

    generationRef.current += 1;
    if (dialog.open) dialog.close();
    releasePosterUrl();
    previousFocusRef.current?.focus();
  // generatePoster and releasePosterUrl intentionally depend on the open snapshot.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, open, recommendations]);

  useEffect(() => () => {
    generationRef.current += 1;
    if (posterUrlRef.current) URL.revokeObjectURL(posterUrlRef.current);
  }, []);

  function closeDialog() {
    generationRef.current += 1;
    releasePosterUrl();
    setPosterUrl("");
    setPoster(null);
    setPosterStatus("idle");
    setStatusMessage("");
    setManualLink(false);
    onClose();
  }

  function handleBackdropClick(event: ReactMouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeDialog();
  }

  async function shareImage() {
    if (!poster || !canShareFiles) return;
    const file = new File([poster.blob], poster.fileName, { type: "image/png" });
    try {
      await navigator.share({
        files: [file],
        title: text.title,
        text: recommendations[0]?.name,
        url: shareUrl,
      });
      setStatusMessage(text.shared);
      onEvent("share", {
        share_method: "poster_web_share",
        primary_class: recommendations[0]?.classId,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatusMessage(text.failed);
    }
  }

  async function copyImage() {
    if (!poster) return;
    try {
      if (typeof ClipboardItem !== "function" || !navigator.clipboard?.write) {
        throw new Error("Image clipboard is unavailable.");
      }
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": poster.blob }),
      ]);
      setStatusMessage(text.copiedImage);
      onEvent("share", {
        share_method: "poster_image_copy",
        primary_class: recommendations[0]?.classId,
      });
    } catch {
      downloadImage();
    }
  }

  function downloadImage() {
    if (!poster || !posterUrl) return;
    const link = document.createElement("a");
    link.href = posterUrl;
    link.download = poster.fileName;
    link.click();
    setStatusMessage(text.downloaded);
    onEvent("poster_download", {
      primary_class: recommendations[0]?.classId,
    });
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setManualLink(false);
      setStatusMessage(text.copiedLink);
      onEvent("share", {
        share_method: "poster_link_copy",
        primary_class: recommendations[0]?.classId,
      });
    } catch {
      setManualLink(true);
      setStatusMessage(text.copyFailed);
    }
  }

  const primaryName = recommendations[0]?.name ?? "AION2";

  return (
    <dialog
      aria-describedby="class-finder-share-description"
      aria-labelledby="class-finder-share-title"
      className={styles.dialog}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={handleBackdropClick}
      ref={dialogRef}
    >
      <div
        aria-busy={posterStatus === "loading"}
        className={styles.panel}
      >
        <header className={styles.header}>
          <div>
            <p>{shareKicker[locale]}</p>
            <h2 id="class-finder-share-title">{text.title}</h2>
            <span id="class-finder-share-description">{text.description}</span>
          </div>
          <button
            aria-label={text.close}
            className={styles.closeButton}
            onClick={closeDialog}
            type="button"
          >
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
        </header>

        <div className={styles.preview} data-status={posterStatus}>
          {posterUrl ? (
            <img
              alt={text.imageAlt(primaryName)}
              height={poster?.height}
              src={posterUrl}
              width={poster?.width}
            />
          ) : (
            <div className={styles.placeholder}>
              {posterStatus === "loading" ? (
                <span className={styles.loader} aria-hidden="true" />
              ) : null}
              <p>{posterStatus === "error" ? text.failed : text.generating}</p>
              {posterStatus === "error" ? (
                <button onClick={() => void generatePoster()} type="button">
                  <RefreshCw aria-hidden="true" size={16} />
                  {text.retry}
                </button>
              ) : null}
            </div>
          )}
        </div>

        <section className={styles.visuallyHidden} aria-label={text.resultSummary}>
          <ol>
            {recommendations.map((result) => (
              <li key={result.classId}>
                {result.rank}. {result.name}, {Math.round(result.matchPercent)}%
              </li>
            ))}
          </ol>
        </section>

        <p aria-live="polite" className={styles.status}>
          {statusMessage}
        </p>

        {manualLink ? (
          <input
            aria-label={text.copyLink}
            className={styles.manualLink}
            onFocus={(event) => event.currentTarget.select()}
            readOnly
            value={shareUrl}
          />
        ) : null}

        <footer className={styles.actions}>
          {canShareFiles ? (
            <button
              className={styles.primaryAction}
              disabled={!poster}
              onClick={() => void shareImage()}
              type="button"
            >
              <Share2 aria-hidden="true" size={17} />
              {text.shareImage}
            </button>
          ) : null}
          <button
            disabled={!poster}
            onClick={() => void copyImage()}
            type="button"
          >
            <Copy aria-hidden="true" size={17} />
            {text.copyImage}
          </button>
          <button disabled={!poster} onClick={downloadImage} type="button">
            <Download aria-hidden="true" size={17} />
            {text.downloadImage}
          </button>
          <button onClick={() => void copyLink()} type="button">
            <Link2 aria-hidden="true" size={17} />
            {text.copyLink}
          </button>
        </footer>
      </div>
    </dialog>
  );
}
