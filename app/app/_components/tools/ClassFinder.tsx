"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  classFinderQuestions,
  parseClassFinderAnswers,
  scoreClassFinderAnswers,
  serializeClassFinderAnswers,
  type ClassFinderAnswers,
} from "@/app/class-finder-data";
import {
  editorialClassFinderUiCopy,
  type ClassFinderUiCopy,
} from "@/app/class-finder-localization";
import { trackEvent } from "@/app/analytics";
import {
  localizedHref,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./ClassFinder.module.css";
import { ClassFinderShareDialog } from "./ClassFinderShareDialog";

type FinderStage = "intro" | "questions" | "results";
type FeedbackKind = "neutral" | "success" | "error";

const STORAGE_KEY = "aion2-kina:class-finder:v1";
const HASH_PREFIX = "#finder=";

const coreCopy = {
  "zh-hant": {
    kicker: "職業適性",
    introTitle: "用 6 個選擇，縮小你的職業範圍",
    introDescription:
      "依照操作節奏、戰鬥距離、隊伍責任與容錯偏好，找出最值得先深入了解的三個職業。",
    duration: "約 2 分鐘",
    questionCount: `${classFinderQuestions.length} 個問題`,
    privateByDesign: "無需帳號",
    privacy:
      "你的進度只保存在目前裝置；完成或分享結果時，選項會寫入網址片段，但不會建立公開結果頁。",
    start: "開始推薦",
    resume: "繼續上次進度",
    restart: "重新開始",
    progress: (current: number, total: number) => `第 ${current} 題，共 ${total} 題`,
    answered: (count: number, total: number) => `已回答 ${count} / ${total}`,
    chooseOne: "選擇最接近你的答案",
    back: "上一題",
    next: "下一題",
    seeResults: "查看推薦",
    resultsKicker: "你的職業適性",
    resultsTitle: "最適合先了解的三個職業",
    resultsDescription:
      "推薦反映你的遊玩偏好，不代表職業強度、版本排名或官方結論。",
    primaryMatch: "首選",
    match: "適配度",
    matchedPreferences: "符合你的偏好",
    guide: "查看職業攻略",
    allClasses: "比較全部職業",
    share: "分享結果",
    shared: "已開啟系統分享",
    copied: "結果連結已複製",
    copyFailed: "無法自動複製，請從瀏覽器網址列複製連結。",
    saved: "進度已保存在目前裝置",
    saveFailed: "瀏覽器封鎖了本機儲存；本次作答仍可繼續。",
    emptyResults: "還沒有足夠答案。請完成問卷後再查看推薦。",
    continueQuestions: "繼續完成問卷",
    rankLabel: (rank: number) => `第 ${rank} 名推薦`,
  },
  en: {
    kicker: "CLASS MATCH",
    introTitle: "Narrow your class choices in 6 decisions",
    introDescription:
      "Match your preferred pace, combat range, party responsibility, and tolerance for mistakes with three classes worth exploring first.",
    duration: "About 2 minutes",
    questionCount: `${classFinderQuestions.length} questions`,
    privateByDesign: "No account",
    privacy:
      "Progress stays on this device. Completing or sharing a result adds answers to the URL fragment, but never creates a public result page.",
    start: "Start class finder",
    resume: "Continue previous answers",
    restart: "Start over",
    progress: (current: number, total: number) => `Question ${current} of ${total}`,
    answered: (count: number, total: number) => `${count} of ${total} answered`,
    chooseOne: "Choose the answer closest to you",
    back: "Back",
    next: "Next",
    seeResults: "See my matches",
    resultsKicker: "YOUR CLASS MATCH",
    resultsTitle: "Three classes to explore first",
    resultsDescription:
      "Matches reflect your play preferences, not class strength, a patch tier list, or an official verdict.",
    primaryMatch: "Top match",
    match: "match",
    matchedPreferences: "Why it matches",
    guide: "View class guide",
    allClasses: "Compare all classes",
    share: "Share results",
    shared: "System sharing opened",
    copied: "Result link copied",
    copyFailed: "Automatic copy failed. Copy the link from your browser address bar.",
    saved: "Progress saved on this device",
    saveFailed: "This browser blocked local storage. You can still finish this session.",
    emptyResults: "There are not enough answers yet. Finish the questions to see a match.",
    continueQuestions: "Continue questions",
    rankLabel: (rank: number) => `Recommendation ${rank}`,
  },
  ko: {
    kicker: "직업 적합도",
    introTitle: "6가지 선택으로 직업 후보를 좁혀 보세요",
    introDescription:
      "선호하는 조작 속도, 전투 거리, 파티 책임과 실수 허용도를 바탕으로 먼저 살펴볼 직업 3개를 추천합니다.",
    duration: "약 2분",
    questionCount: `질문 ${classFinderQuestions.length}개`,
    privateByDesign: "계정 불필요",
    privacy:
      "진행 상황은 현재 기기에만 저장됩니다. 완료하거나 공유하면 선택지가 URL 조각에 포함되지만 공개 결과 페이지는 생성하지 않습니다.",
    start: "직업 추천 시작",
    resume: "이전 답변 계속하기",
    restart: "처음부터 다시",
    progress: (current: number, total: number) => `${total}개 중 ${current}번째 질문`,
    answered: (count: number, total: number) => `${total}개 중 ${count}개 답변`,
    chooseOne: "가장 가까운 답변을 선택하세요",
    back: "이전",
    next: "다음",
    seeResults: "추천 결과 보기",
    resultsKicker: "나의 직업 적합도",
    resultsTitle: "먼저 살펴볼 직업 3개",
    resultsDescription:
      "추천은 플레이 취향을 반영한 편집 기준이며 직업 성능, 패치 티어 또는 공식 평가가 아닙니다.",
    primaryMatch: "최우선 추천",
    match: "적합",
    matchedPreferences: "추천 이유",
    guide: "직업 공략 보기",
    allClasses: "모든 직업 비교",
    share: "결과 공유",
    shared: "시스템 공유 창을 열었습니다",
    copied: "결과 링크를 복사했습니다",
    copyFailed: "자동 복사에 실패했습니다. 브라우저 주소창에서 링크를 복사해 주세요.",
    saved: "현재 기기에 진행 상황을 저장했습니다",
    saveFailed: "브라우저가 로컬 저장을 차단했습니다. 이번 세션은 계속할 수 있습니다.",
    emptyResults: "답변이 충분하지 않습니다. 질문을 완료한 뒤 결과를 확인해 주세요.",
    continueQuestions: "질문 계속하기",
    rankLabel: (rank: number) => `${rank}순위 추천`,
  },
} as const satisfies Record<"zh-hant" | "en" | "ko", ClassFinderUiCopy>;

const copy: Record<SiteLocale, ClassFinderUiCopy> = {
  ...coreCopy,
  ...editorialClassFinderUiCopy,
};

function pushAnalytics(event: string, payload: Record<string, unknown> = {}) {
  trackEvent(event, {
    tool_name: "class_finder",
    ...payload,
  });
}

function safeParseAnswers(value: string): ClassFinderAnswers {
  if (!value) return {};
  try {
    return parseClassFinderAnswers(value);
  } catch {
    return {};
  }
}

function getBootstrapSnapshot() {
  if (typeof window === "undefined") return "";
  try {
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      const value = window.location.hash.slice(HASH_PREFIX.length);
      return `hash:${decodeURIComponent(value)}`;
    }
    return `storage:${window.localStorage.getItem(STORAGE_KEY) ?? ""}`;
  } catch {
    return "";
  }
}

function subscribeToBootstrapState(callback: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("hashchange", callback);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("storage", syncStorage);
  };
}

function answeredQuestionCount(answers: ClassFinderAnswers) {
  return classFinderQuestions.reduce(
    (count, question) => count + (answers[question.id] ? 1 : 0),
    0,
  );
}

function findFirstUnanswered(answers: ClassFinderAnswers) {
  const index = classFinderQuestions.findIndex((question) => !answers[question.id]);
  return index < 0 ? classFinderQuestions.length - 1 : index;
}

function clampPercentage(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function ClassFinder({ locale }: { locale: SiteLocale }) {
  const text = copy[locale];
  const bootstrapSnapshot = useSyncExternalStore(
    subscribeToBootstrapState,
    getBootstrapSnapshot,
    () => "",
  );
  const bootstrapSource = bootstrapSnapshot.startsWith("hash:")
    ? "hash"
    : "storage";
  const bootstrapAnswers = useMemo(
    () => safeParseAnswers(bootstrapSnapshot.replace(/^(?:hash|storage):/u, "")),
    [bootstrapSnapshot],
  );
  const [sessionAnswers, setSessionAnswers] = useState<ClassFinderAnswers | null>(null);
  const [requestedStage, setRequestedStage] = useState<FinderStage | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<{
    kind: FeedbackKind;
    message: string;
  }>({ kind: "neutral", message: "" });
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultEventKeyRef = useRef("");
  const saveEventSentRef = useRef(false);

  const answers = sessionAnswers ?? bootstrapAnswers;
  const completedCount = answeredQuestionCount(answers);
  const hasCompleteSharedResult =
    bootstrapSource === "hash" && completedCount === classFinderQuestions.length;
  const stage = requestedStage ?? (hasCompleteSharedResult ? "results" : "intro");
  const currentQuestion = classFinderQuestions[questionIndex];
  const selectedOption = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const recommendations = useMemo(
    () => (stage === "results" ? scoreClassFinderAnswers(answers, locale) : []),
    [answers, locale, stage],
  );

  useEffect(() => {
    if (stage !== "intro") headingRef.current?.focus();
  }, [questionIndex, stage]);

  useEffect(() => {
    if (stage !== "results" || recommendations.length === 0) return;
    const eventKey = `${serializeClassFinderAnswers(answers)}:${locale}`;
    if (resultEventKeyRef.current === eventKey) return;
    resultEventKeyRef.current = eventKey;
    pushAnalytics("result_view", {
      result_count: recommendations.length,
      primary_class: recommendations[0]?.classId,
      primary_match_percent: recommendations[0]?.matchPercent,
      result_source: bootstrapSource === "hash" && requestedStage === null
        ? "shared_url"
        : "completed_quiz",
    });
  }, [
    answers,
    bootstrapSource,
    locale,
    recommendations,
    requestedStage,
    stage,
  ]);

  function storeAnswers(nextAnswers: ClassFinderAnswers) {
    setSessionAnswers(nextAnswers);
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        serializeClassFinderAnswers(nextAnswers),
      );
      setFeedback({ kind: "success", message: text.saved });
      if (!saveEventSentRef.current) {
        saveEventSentRef.current = true;
        pushAnalytics("save_local", {
          answered_count: answeredQuestionCount(nextAnswers),
          storage_scope: "device",
        });
      }
    } catch {
      setFeedback({ kind: "error", message: text.saveFailed });
    }
  }

  function writeResultFragment(nextAnswers: ClassFinderAnswers) {
    const url = new URL(window.location.href);
    url.hash = `finder=${encodeURIComponent(
      serializeClassFinderAnswers(nextAnswers),
    )}`;
    window.history.replaceState(window.history.state, "", url);
    return url.toString();
  }

  function startFinder() {
    const nextIndex = findFirstUnanswered(answers);
    pushAnalytics("tool_start", {
      resumed: completedCount > 0,
      answered_count: completedCount,
    });
    if (completedCount === classFinderQuestions.length) {
      writeResultFragment(answers);
      setRequestedStage("results");
      return;
    }
    setQuestionIndex(nextIndex);
    setRequestedStage("questions");
    setFeedback({ kind: "neutral", message: "" });
  }

  function selectAnswer(optionId: string) {
    if (!currentQuestion) return;
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: optionId,
    } as ClassFinderAnswers;
    storeAnswers(nextAnswers);
    pushAnalytics("question_answer", {
      question_id: currentQuestion.id,
      option_id: optionId,
      question_step: questionIndex + 1,
      question_total: classFinderQuestions.length,
    });
  }

  function goForward() {
    if (!selectedOption) return;
    if (questionIndex >= classFinderQuestions.length - 1) {
      writeResultFragment(answers);
      setRequestedStage("results");
      return;
    }
    setQuestionIndex((current) => current + 1);
    setFeedback({ kind: "neutral", message: "" });
  }

  function goBack() {
    if (questionIndex === 0) {
      setRequestedStage("intro");
      return;
    }
    setQuestionIndex((current) => current - 1);
    setFeedback({ kind: "neutral", message: "" });
  }

  function restartFinder() {
    setShareDialogOpen(false);
    setSessionAnswers({});
    setRequestedStage("intro");
    setQuestionIndex(0);
    setFeedback({ kind: "neutral", message: "" });
    resultEventKeyRef.current = "";
    saveEventSentRef.current = false;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The in-memory reset still works when storage is unavailable.
    }
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      const url = new URL(window.location.href);
      url.hash = "";
      window.history.replaceState(window.history.state, "", url);
    }
  }

  function shareResults() {
    const url = writeResultFragment(answers);
    const primary = recommendations[0];
    setShareUrl(url);
    setShareDialogOpen(true);
    setFeedback({ kind: "neutral", message: "" });
    pushAnalytics("poster_open", {
      primary_class: primary?.classId,
      primary_match_percent: primary?.matchPercent,
    });
  }

  if (stage === "intro") {
    return (
      <section
        aria-labelledby="class-finder-intro-title"
        className={`${styles.finder} ${styles.intro}`}
      >
        <div className={styles.introGlow} aria-hidden="true">
          <span>01</span>
          <span>02</span>
          <span>03</span>
        </div>
        <div className={styles.introContent}>
          <p className={styles.kicker}>{text.kicker}</p>
          <h2 id="class-finder-intro-title">{text.introTitle}</h2>
          <p className={styles.lede}>{text.introDescription}</p>
          <ul className={styles.facts} aria-label={text.privateByDesign}>
            <li>{text.duration}</li>
            <li>{text.questionCount}</li>
            <li>{text.privateByDesign}</li>
          </ul>
          <p className={styles.privacy}>
            <span aria-hidden="true">◇</span>
            {text.privacy}
          </p>
          {completedCount > 0 ? (
            <p className={styles.resumeProgress}>
              {text.answered(completedCount, classFinderQuestions.length)}
            </p>
          ) : null}
          <div className={styles.introActions}>
            <button
              className={styles.primaryButton}
              onClick={startFinder}
              type="button"
            >
              {completedCount > 0 ? text.resume : text.start}
              <span aria-hidden="true">→</span>
            </button>
            {completedCount > 0 ? (
              <button
                className={styles.textButton}
                onClick={restartFinder}
                type="button"
              >
                {text.restart}
              </button>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (stage === "questions" && currentQuestion) {
    const questionText = currentQuestion.copy[locale];
    const progressValue = questionIndex + 1;

    return (
      <section
        aria-labelledby="class-finder-question-title"
        className={`${styles.finder} ${styles.questionStage}`}
      >
        <header className={styles.questionHeader}>
          <div>
            <p className={styles.kicker}>{text.kicker}</p>
            <p className={styles.progressLabel}>
              {text.progress(progressValue, classFinderQuestions.length)}
            </p>
          </div>
          <span>{text.answered(completedCount, classFinderQuestions.length)}</span>
        </header>

        <progress
          aria-label={text.progress(progressValue, classFinderQuestions.length)}
          className={styles.progress}
          max={classFinderQuestions.length}
          value={progressValue}
        />

        <fieldset className={styles.question}>
          <legend className={styles.visuallyHidden}>{questionText.title}</legend>
          <p className={styles.stepNumber} aria-hidden="true">
            {String(progressValue).padStart(2, "0")}
          </p>
          <h2
            id="class-finder-question-title"
            ref={headingRef}
            tabIndex={-1}
          >
            {questionText.title}
          </h2>
          <p className={styles.questionHint}>
            {questionText.hint || text.chooseOne}
          </p>

          <div
            aria-labelledby="class-finder-question-title"
            className={styles.options}
            role="group"
          >
            {currentQuestion.options.map((option, optionIndex) => {
              const optionText = option.copy[locale];
              const selected = selectedOption === option.id;
              return (
                <button
                  aria-pressed={selected}
                  className={styles.option}
                  key={option.id}
                  onClick={() => selectAnswer(option.id)}
                  type="button"
                >
                  <span className={styles.optionIndex} aria-hidden="true">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span className={styles.optionCopy}>
                    <strong>{optionText.label}</strong>
                    <small>{optionText.description}</small>
                  </span>
                  <span className={styles.optionCheck} aria-hidden="true">
                    {selected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className={styles.questionFooter}>
          <button
            className={styles.secondaryButton}
            onClick={goBack}
            type="button"
          >
            <span aria-hidden="true">←</span>
            {text.back}
          </button>
          <p
            aria-live="polite"
            className={styles.feedback}
            data-kind={feedback.kind}
          >
            {feedback.message}
          </p>
          <button
            className={styles.primaryButton}
            disabled={!selectedOption}
            onClick={goForward}
            type="button"
          >
            {questionIndex === classFinderQuestions.length - 1
              ? text.seeResults
              : text.next}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="class-finder-results-title"
      className={`${styles.finder} ${styles.results}`}
    >
      <header className={styles.resultsHeader}>
        <div>
          <p className={styles.kicker}>{text.resultsKicker}</p>
          <h2
            id="class-finder-results-title"
            ref={headingRef}
            tabIndex={-1}
          >
            {text.resultsTitle}
          </h2>
          <p>{text.resultsDescription}</p>
        </div>
        <div className={styles.resultActions}>
          <button
            className={styles.secondaryButton}
            onClick={shareResults}
            type="button"
          >
            <span aria-hidden="true">↗</span>
            {text.share}
          </button>
          <button
            className={styles.textButton}
            onClick={restartFinder}
            type="button"
          >
            {text.restart}
          </button>
        </div>
      </header>

      <p
        aria-live="polite"
        className={styles.resultFeedback}
        data-kind={feedback.kind}
      >
        {feedback.message}
      </p>

      {recommendations.length > 0 ? (
        <ol className={styles.resultGrid}>
          {recommendations.map((result) => {
            const percentage = clampPercentage(result.matchPercent);
            return (
              <li
                className={styles.resultCard}
                data-rank={result.rank}
                key={result.classId}
              >
                <div className={styles.resultCardTop}>
                  <span className={styles.rank}>
                    {result.rank === 1
                      ? text.primaryMatch
                      : text.rankLabel(result.rank)}
                  </span>
                  <span className={styles.percentage}>
                    <strong>{percentage}%</strong> {text.match}
                  </span>
                </div>
                <div className={styles.scoreTrack} aria-hidden="true">
                  <span style={{ width: `${percentage}%` }} />
                </div>
                <h3>{result.name}</h3>
                <p className={styles.weapon}>{result.weapon}</p>
                <p className={styles.summary}>{result.summary}</p>

                <div className={styles.preferenceBlock}>
                  <h4>{text.matchedPreferences}</h4>
                  <ul>
                    {result.matchedPreferences.map((preference) => (
                      <li key={preference}>{preference}</li>
                    ))}
                  </ul>
                </div>

                <p className={styles.officialRole}>{result.officialRole}</p>
                <a
                  className={styles.guideLink}
                  href={result.guideHref}
                  onClick={() => pushAnalytics("guide_click", {
                    class_id: result.classId,
                    result_rank: result.rank,
                    link_target: "class_guide",
                  })}
                >
                  {text.guide}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className={styles.emptyResults}>
          <p>{text.emptyResults}</p>
          <button
            className={styles.primaryButton}
            onClick={startFinder}
            type="button"
          >
            {text.continueQuestions}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <footer className={styles.resultsFooter}>
        <p>{recommendations[0]?.disclaimer ?? text.resultsDescription}</p>
        <a
          href={localizedHref(locale, "/classes/")}
          onClick={() => pushAnalytics("guide_click", {
            link_target: "class_overview",
          })}
        >
          {text.allClasses}
          <span aria-hidden="true">→</span>
        </a>
      </footer>

      <ClassFinderShareDialog
        locale={locale}
        onClose={() => setShareDialogOpen(false)}
        onEvent={pushAnalytics}
        open={shareDialogOpen}
        recommendations={recommendations}
        shareUrl={shareUrl}
      />
    </section>
  );
}
