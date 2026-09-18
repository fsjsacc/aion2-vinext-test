"use client";

import {
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";

import { trackEvent } from "@/app/analytics";
import type { SiteLocale } from "@/app/site-config";

import styles from "./CodesPage.module.css";

const REVEAL_DELAY_MS = 4_500;

type RevealState = "hidden" | "loading" | "revealed";
type CopyState = "idle" | "copying" | "copied" | "failed";

type Props = {
  code: string;
  codeId: string;
  codeStatus: "active" | "expired";
  controlId: string;
  locale: SiteLocale;
  showCodeLabel: string;
  loadingCodeLabel: string;
  copyLabel: string;
  copyingLabel: string;
  copiedLabel: string;
  failedLabel: string;
  confirmCopyTitle: string;
  confirmCopyMessage: string;
  confirmCopyLabel: string;
  cancelLabel: string;
};

async function writeToClipboard(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard copy was rejected");
}

export function CodeRevealControl({
  code,
  codeId,
  codeStatus,
  controlId,
  locale,
  showCodeLabel,
  loadingCodeLabel,
  copyLabel,
  copyingLabel,
  copiedLabel,
  failedLabel,
  confirmCopyTitle,
  confirmCopyMessage,
  confirmCopyLabel,
  cancelLabel,
}: Props) {
  const [revealState, setRevealState] = useState<RevealState>("hidden");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const revealTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);
  const copyInFlight = useRef(false);
  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const analyticsPayload = {
    code_id: codeId,
    code_status: codeStatus,
    locale,
    surface: "content-detail",
    target_kind: "tool",
    target_key: "code-center",
    tool_name: "code-center",
  };

  useEffect(() => () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  function revealCode() {
    if (revealState !== "hidden") return;
    trackEvent("code_reveal_start", analyticsPayload);
    setRevealState("loading");
    revealTimer.current = window.setTimeout(() => {
      setRevealState("revealed");
      revealTimer.current = null;
      trackEvent("code_reveal_complete", {
        ...analyticsPayload,
        reveal_delay_ms: REVEAL_DELAY_MS,
      });
    }, REVEAL_DELAY_MS);
  }

  function openCopyConfirmation() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    trackEvent("code_copy_confirm_open", analyticsPayload);
    window.requestAnimationFrame(() => confirmButtonRef.current?.focus());
  }

  function closeCopyConfirmation() {
    if (dialogRef.current?.open) dialogRef.current.close();
    window.requestAnimationFrame(() => actionButtonRef.current?.focus());
  }

  function handleDialogCancel(event: SyntheticEvent<HTMLDialogElement>) {
    if (copyInFlight.current) {
      event.preventDefault();
      return;
    }
    closeCopyConfirmation();
  }

  async function confirmCopy() {
    if (copyInFlight.current) return;
    copyInFlight.current = true;
    setCopyState("copying");
    const copyMethod =
      navigator.clipboard && window.isSecureContext
        ? "async_clipboard"
        : "exec_command";
    try {
      await writeToClipboard(code);
      setCopyState("copied");
      trackEvent("code_copy_success", {
        ...analyticsPayload,
        copy_method: copyMethod,
      });
    } catch {
      setCopyState("failed");
      trackEvent("code_copy_failure", {
        ...analyticsPayload,
        copy_method: copyMethod,
        failure_reason: "clipboard_rejected",
      });
    } finally {
      copyInFlight.current = false;
    }
    closeCopyConfirmation();

    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyState("idle"), 2600);
  }

  const copyButtonLabel =
    copyState === "copying"
      ? copyingLabel
      : copyState === "copied"
      ? copiedLabel
      : copyState === "failed"
        ? failedLabel
        : copyLabel;
  const actionLabel =
    revealState === "hidden"
      ? showCodeLabel
      : revealState === "loading"
        ? loadingCodeLabel
        : copyButtonLabel;
  const codeIsRevealed = revealState === "revealed";

  return (
    <div
      className={styles.copyControl}
      data-code-reveal-control
      data-reveal-delay-ms={REVEAL_DELAY_MS}
      data-state={revealState}
    >
      <code
        aria-label={codeIsRevealed ? code : showCodeLabel}
        className={styles.codeValue}
        data-hidden={codeIsRevealed ? "false" : "true"}
        id={`${controlId}-value`}
      >
        {codeIsRevealed ? code : "••••••••••••"}
      </code>

      <div className={styles.loadingSlot}>
        {revealState === "loading" ? (
          <div
            aria-live="polite"
            className={styles.loadingStatus}
            role="status"
          >
            <span className={styles.loadingText}>
              <i aria-hidden="true" />
              {loadingCodeLabel}
            </span>
            <span aria-hidden="true" className={styles.loadingTrack}>
              <span />
            </span>
          </div>
        ) : revealState === "revealed" ? (
          <p className={styles.revealHint}>
            {confirmCopyMessage}
          </p>
        ) : null}
      </div>

      <button
        aria-controls={`${controlId}-value`}
        aria-expanded={codeIsRevealed ? undefined : false}
        className={styles.copyButton}
        data-code-reveal={revealState === "hidden" ? "trigger" : undefined}
        data-state={revealState === "revealed" ? copyState : revealState}
        disabled={revealState === "loading"}
        onClick={codeIsRevealed ? openCopyConfirmation : revealCode}
        ref={actionButtonRef}
        type="button"
      >
        <span aria-hidden="true">
          {revealState === "loading"
            ? "◌"
            : copyState === "copied"
              ? "✓"
              : codeIsRevealed
                ? "⧉"
                : "◉"}
        </span>
        <span>{actionLabel}</span>
      </button>
      <span aria-live="polite" className={styles.srOnly} role="status">
        {copyState === "idle" ? "" : copyButtonLabel}
      </span>

      <dialog
        aria-describedby={`${controlId}-confirm-message`}
        aria-labelledby={`${controlId}-confirm-title`}
        aria-modal="true"
        className={styles.confirmDialog}
        data-code-confirmation
        onCancel={handleDialogCancel}
        onClick={(event) => {
          if (
            event.currentTarget === event.target &&
            !copyInFlight.current
          ) {
            closeCopyConfirmation();
          }
        }}
        ref={dialogRef}
        role="dialog"
      >
        <div className={styles.confirmDialogInner}>
          <span aria-hidden="true" className={styles.confirmIcon}>⧉</span>
          <h3 id={`${controlId}-confirm-title`}>{confirmCopyTitle}</h3>
          <p id={`${controlId}-confirm-message`}>{confirmCopyMessage}</p>
          <div className={styles.confirmActions}>
            <button
              className={styles.cancelButton}
              disabled={copyState === "copying"}
              onClick={closeCopyConfirmation}
              type="button"
            >
              {cancelLabel}
            </button>
            <button
              className={styles.confirmButton}
              aria-busy={copyState === "copying"}
              disabled={copyState === "copying"}
              onClick={confirmCopy}
              ref={confirmButtonRef}
              type="button"
            >
              {copyState === "copying" ? copyingLabel : confirmCopyLabel}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
