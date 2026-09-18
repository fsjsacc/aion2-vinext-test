export type CountdownPhase =
  | "early-access-countdown"
  | "early-access-live"
  | "public-launch-countdown"
  | "launch-date-pending"
  | "launched";

export type GlobalLaunchCountdownConfig = {
  earlyAccessDate: string;
  earlyAccessDurationDays: number;
  publicLaunchDate?: string;
};

export type GlobalLaunchCountdownState = {
  days: number | null;
  phase: CountdownPhase;
};

export type GlobalLaunchCountdownLocale = string;

const DAY_IN_MS = 86_400_000;

export const globalLaunchCountdownConfig: GlobalLaunchCountdownConfig = {
  earlyAccessDate: "2026-09-30",
  earlyAccessDurationDays: 5,
};

function parseDateOnly(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(date);
  if (!match) throw new Error(`Expected an ISO date without a time: ${date}`);
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function localCalendarDay(now: Date) {
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatGlobalLaunchDate(
  date: string,
  locale: GlobalLaunchCountdownLocale,
) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(parseDateOnly(date)));
}

export function getGlobalLaunchCountdownState(
  now: Date,
  config: GlobalLaunchCountdownConfig = globalLaunchCountdownConfig,
): GlobalLaunchCountdownState {
  const today = localCalendarDay(now);
  const earlyAccessDay = parseDateOnly(config.earlyAccessDate);
  const publicLaunchDay = config.publicLaunchDate
    ? parseDateOnly(config.publicLaunchDate)
    : null;

  if (today < earlyAccessDay) {
    return {
      days: Math.ceil((earlyAccessDay - today) / DAY_IN_MS),
      phase: "early-access-countdown",
    };
  }

  if (publicLaunchDay !== null) {
    if (today < publicLaunchDay) {
      return {
        days: Math.ceil((publicLaunchDay - today) / DAY_IN_MS),
        phase: "public-launch-countdown",
      };
    }
    return { days: 0, phase: "launched" };
  }

  const earlyAccessEnd = earlyAccessDay + config.earlyAccessDurationDays * DAY_IN_MS;
  if (today < earlyAccessEnd) {
    return { days: 0, phase: "early-access-live" };
  }

  return { days: null, phase: "launch-date-pending" };
}
