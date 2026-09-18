export type ChecklistRegion = "tw" | "kr";

export type ChecklistServerProfile = {
  region: ChecklistRegion;
  timeZone: "Asia/Taipei" | "Asia/Seoul";
  utcOffsetMinutes: 480 | 540;
  dailyResetHour: 5;
  weeklyResetDay: 3;
};

export type ChecklistCycleState = {
  region: ChecklistRegion;
  serverTimeZone: ChecklistServerProfile["timeZone"];
  serverNow: Date;
  dailyCycleKey: string;
  weeklyCycleKey: string;
  nextDailyResetAt: Date;
  nextWeeklyResetAt: Date;
};

export const DEFAULT_CHECKLIST_REGION: ChecklistRegion = "tw";

/**
 * Checklist cycle model for AION2's live Taiwan/Hong Kong/Macao and Korea
 * services. Wednesday 05:00 has direct official reset evidence; daily 05:00
 * follows the official operating-day boundary plus the current routine
 * reference. Individual in-game timers still take priority. Neither timezone
 * observes daylight saving time, so fixed offsets keep boundaries deterministic.
 */
export const CHECKLIST_SERVER_PROFILES: Readonly<Record<ChecklistRegion, ChecklistServerProfile>> = {
  tw: {
    region: "tw",
    timeZone: "Asia/Taipei",
    utcOffsetMinutes: 480,
    dailyResetHour: 5,
    weeklyResetDay: 3,
  },
  kr: {
    region: "kr",
    timeZone: "Asia/Seoul",
    utcOffsetMinutes: 540,
    dailyResetHour: 5,
    weeklyResetDay: 3,
  },
};

const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * MINUTE_MS;
const WEEK_MS = 7 * DAY_MS;

export function isChecklistRegion(value: unknown): value is ChecklistRegion {
  return value === "tw" || value === "kr";
}

function asValidDate(value: Date | number | string | undefined) {
  const date = value === undefined ? new Date() : new Date(value);
  return Number.isFinite(date.getTime()) ? date : new Date();
}

function formatUtcDate(value: Date) {
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localBoundaryToUtc(localBoundaryMs: number, profile: ChecklistServerProfile) {
  return new Date(localBoundaryMs - profile.utcOffsetMinutes * MINUTE_MS);
}

export function getChecklistCycleState(
  region: ChecklistRegion = DEFAULT_CHECKLIST_REGION,
  now?: Date | number | string,
): ChecklistCycleState {
  const profile = CHECKLIST_SERVER_PROFILES[region];
  const instant = asValidDate(now);
  const localNowMs = instant.getTime() + profile.utcOffsetMinutes * MINUTE_MS;
  const localNow = new Date(localNowMs);
  const localDayStartMs = Date.UTC(
    localNow.getUTCFullYear(),
    localNow.getUTCMonth(),
    localNow.getUTCDate(),
  );
  const todayResetMs = localDayStartMs + profile.dailyResetHour * 60 * MINUTE_MS;
  const dailyStartMs = localNowMs >= todayResetMs ? todayResetMs : todayResetMs - DAY_MS;
  const nextDailyResetMs = dailyStartMs + DAY_MS;

  const daysSinceWeeklyReset = (
    localNow.getUTCDay() - profile.weeklyResetDay + 7
  ) % 7;
  let weeklyStartMs = (
    localDayStartMs
    - daysSinceWeeklyReset * DAY_MS
    + profile.dailyResetHour * 60 * MINUTE_MS
  );
  if (weeklyStartMs > localNowMs) weeklyStartMs -= WEEK_MS;
  const nextWeeklyResetMs = weeklyStartMs + WEEK_MS;

  const dailyDate = new Date(dailyStartMs);
  const weeklyDate = new Date(weeklyStartMs);
  return {
    region,
    serverTimeZone: profile.timeZone,
    // Keep the real instant on the Date; consumers can format it with
    // serverTimeZone without accidentally applying the UTC offset twice.
    serverNow: new Date(instant.getTime()),
    dailyCycleKey: `${region}:daily:${formatUtcDate(dailyDate)}`,
    weeklyCycleKey: `${region}:weekly:${formatUtcDate(weeklyDate)}`,
    nextDailyResetAt: localBoundaryToUtc(nextDailyResetMs, profile),
    nextWeeklyResetAt: localBoundaryToUtc(nextWeeklyResetMs, profile),
  };
}

export function getNextDailyReset(
  region: ChecklistRegion = DEFAULT_CHECKLIST_REGION,
  now?: Date | number | string,
) {
  return getChecklistCycleState(region, now).nextDailyResetAt;
}

export function getNextWeeklyReset(
  region: ChecklistRegion = DEFAULT_CHECKLIST_REGION,
  now?: Date | number | string,
) {
  return getChecklistCycleState(region, now).nextWeeklyResetAt;
}
