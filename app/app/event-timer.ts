export const eventTimerServices = ["global", "tw", "kr"] as const;

export type EventTimerService = (typeof eventTimerServices)[number];
export type ScheduledEventTimerService = Exclude<EventTimerService, "global">;
export type EventTimerKind = "activity" | "boss" | "rift";
export const eventTimerKoreaGroups = ["a", "b", "c"] as const;
export type EventTimerKoreaGroup = (typeof eventTimerKoreaGroups)[number];

export const EVENT_TIMER_KOREA_GROUP_OFFSETS: Readonly<
  Record<EventTimerKoreaGroup, 0 | 5 | 10>
> = { a: 0, b: 5, c: 10 };

export const EVENT_TIMER_KOREA_GROUP_SERVERS: Readonly<
  Record<EventTimerKoreaGroup, readonly string[]>
> = {
  a: [
    "시엘–이스라펠",
    "루미엘–에레슈키갈",
    "아리엘–아스펠",
    "네몬–콰이링",
    "타하바타–카사카",
    "페르노스–오다르",
    "이슈타르–파프니르",
  ],
  b: [
    "지켈–트리니엘",
    "카이시넬–유스티엘",
    "프레기온–무닌",
    "나니아–브리트라",
    "울고른–인드나흐",
    "크로메데–바바룽",
    "티아마트–챈가룽",
  ],
  c: [
    "바이젤–네자칸",
    "마르쿠탄–루드라",
    "메스람타에다–바카르마",
    "하달–젠카카",
    "루터스–히타니에",
    "코치룽–다미누",
    "포에타–이스할겐",
  ],
};

export type EventTimerServiceProfile = {
  service: EventTimerService;
  timeZone: "UTC" | "Asia/Taipei" | "Asia/Seoul";
  utcOffsetMinutes: 0 | 480 | 540;
};

export const EVENT_TIMER_SERVICE_PROFILES: Readonly<
  Record<EventTimerService, EventTimerServiceProfile>
> = {
  global: {
    service: "global",
    timeZone: "UTC",
    utcOffsetMinutes: 0,
  },
  tw: {
    service: "tw",
    timeZone: "Asia/Taipei",
    utcOffsetMinutes: 480,
  },
  kr: {
    service: "kr",
    timeZone: "Asia/Seoul",
    utcOffsetMinutes: 540,
  },
};

export type DailyTimerRule = {
  type: "daily-times";
  minutesOfDay: readonly number[];
};

export type WeeklyTimerRule = {
  type: "weekly-times";
  slots: readonly {
    /** JavaScript weekday: Sunday = 0, Monday = 1, ... Saturday = 6. */
    weekday: number;
    minuteOfDay: number;
  }[];
};

export type EventTimerRule = DailyTimerRule | WeeklyTimerRule;

export type EventTimerSource = {
  id: string;
  label: string;
  publisher: string;
  url: string;
  verifiedAt: string;
};

export const EVENT_TIMER_SOURCES = {
  twSpacetimeRift: {
    id: "tw-spacetime-rift",
    label: "AION2 Taiwan update — Spacetime Rift schedule",
    publisher: "NC Taiwan",
    url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=692f4c48e81e402e6da16915",
    verifiedAt: "2026-09-16",
  },
  krSpacetimeRift: {
    id: "kr-spacetime-rift",
    label: "아이온2 업데이트 — 시공의 균열 일정",
    publisher: "NCSOFT",
    url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=692f3e3834e7dd2024fd53a4",
    verifiedAt: "2026-09-16",
  },
  krSpacetimeRiftWindow: {
    id: "kr-spacetime-rift-window",
    label: "아이온2 업데이트 — 시공의 균열 포탈 10분 유지",
    publisher: "NCSOFT",
    url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=692603b8d60365665a2fdaa9",
    verifiedAt: "2026-09-16",
  },
  twAbyssSchedule: {
    id: "tw-abyss-schedule",
    label: "AION2 Taiwan update — Abyss schedules",
    publisher: "NC Taiwan",
    url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=6a31a438754f8e55c506f818",
    verifiedAt: "2026-09-16",
  },
  krAbyssSchedule: {
    id: "kr-abyss-schedule",
    label: "아이온2 업데이트 — 어비스 그룹별 일정",
    publisher: "NCSOFT",
    url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=6a31a438acb6f821e1a76c27",
    verifiedAt: "2026-09-16",
  },
  twAbyssBosses: {
    id: "tw-abyss-bosses",
    label: "AION2 Taiwan update — Abyss bosses and Shugo Festa",
    publisher: "NC Taiwan",
    url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=69e7d24d6bea861b7fd195aa",
    verifiedAt: "2026-09-16",
  },
  krAbyssBosses: {
    id: "kr-abyss-bosses",
    label: "아이온2 업데이트 — 어비스 보스와 슈고 페스타",
    publisher: "NCSOFT",
    url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=69e7d0384b054450af1110c4",
    verifiedAt: "2026-09-16",
  },
  twAbyssGuide: {
    id: "tw-abyss-guide",
    label: "AION2 official guide — Abyss content",
    publisher: "NC Taiwan",
    url: "https://tw.ncsoft.com/aion2/guidebook/view?title=%E6%B7%B1%E6%B7%B5%E5%85%A7%E5%AE%B9",
    verifiedAt: "2026-09-16",
  },
  krAbyssGuide: {
    id: "kr-abyss-guide",
    label: "아이온2 공식 가이드 — 어비스",
    publisher: "NCSOFT",
    url: "https://aion2.plaync.com/ko-kr/guidebook/view?title=%EC%96%B4%EB%B9%84%EC%8A%A4",
    verifiedAt: "2026-09-16",
  },
  twLiveActivities: {
    id: "tw-live-activities",
    label: "AION2 Taiwan 4/8 update — live activity schedules",
    publisher: "NC Taiwan",
    url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=69d55b385428ae5b4ea04aa3",
    verifiedAt: "2026-09-16",
  },
  krLiveActivities: {
    id: "kr-live-activities",
    label: "아이온2 4/8 업데이트 — 라이브 이벤트 시간표",
    publisher: "NCSOFT",
    url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=69d55b381e8a8c5fcd9b44a7",
    verifiedAt: "2026-09-16",
  },
} as const satisfies Record<string, EventTimerSource>;

export const eventTimerEntryIds = [
  "spacetime-rift",
  "abyss-rift-zone",
  "shugo-festa",
  "dimensional-invasion",
  "battlefield",
  "artifact-occupation",
  "abyss-bosses",
  "nahma",
] as const;

export type EventTimerEntryId = (typeof eventTimerEntryIds)[number];

export type EventTimerEntry = {
  id: EventTimerEntryId;
  kind: EventTimerKind;
  schedules: Partial<Record<ScheduledEventTimerService, EventTimerRule>>;
  sourceIds: readonly (keyof typeof EVENT_TIMER_SOURCES)[];
  verifiedAt: string;
  mapLinks?: readonly {
    mapSlug: string;
    filterSubtype?: "boss" | "rift";
  }[];
  /** True when some displayed times are a direct expansion of an official interval. */
  hasDerivedSlots?: boolean;
  /** Korea Abyss schedule groups B and C start 5 or 10 minutes after group A. */
  usesKoreaAbyssGroupOffset?: boolean;
  /** Officially documented active window, keyed by live service. */
  activeMinutes?: Partial<Record<ScheduledEventTimerService, number>>;
  /** Official active-window length keyed by its server-local start minute. */
  activeWindowMinutesByStart?: Partial<
    Record<ScheduledEventTimerService, Readonly<Record<number, number>>>
  >;
};

const SPACETIME_RIFT_TIMES = [120, 300, 480, 660, 840, 1_020, 1_200, 1_380] as const;
const HOURLY_ON_THE_HOUR = Array.from({ length: 24 }, (_, hour) => hour * 60);
const HOURLY_HALF_PAST = Array.from({ length: 24 }, (_, hour) => hour * 60 + 30);

export const EVENT_TIMER_ENTRIES: readonly EventTimerEntry[] = [
  {
    id: "spacetime-rift",
    kind: "rift",
    schedules: {
      tw: {
        type: "daily-times",
        minutesOfDay: SPACETIME_RIFT_TIMES,
      },
      kr: {
        type: "daily-times",
        minutesOfDay: SPACETIME_RIFT_TIMES,
      },
    },
    sourceIds: ["twSpacetimeRift", "krSpacetimeRift", "krSpacetimeRiftWindow"],
    verifiedAt: "2026-09-16",
    mapLinks: [
      { mapSlug: "verteron", filterSubtype: "rift" },
      { mapSlug: "altgard", filterSubtype: "rift" },
    ],
    hasDerivedSlots: true,
    activeMinutes: { tw: 10, kr: 10 },
  },
  {
    id: "abyss-rift-zone",
    kind: "rift",
    schedules: {
      tw: {
        type: "weekly-times",
        slots: [
          { weekday: 2, minuteOfDay: 1_320 },
          { weekday: 4, minuteOfDay: 1_320 },
        ],
      },
      kr: {
        type: "weekly-times",
        slots: [
          { weekday: 2, minuteOfDay: 1_320 },
          { weekday: 4, minuteOfDay: 1_320 },
        ],
      },
    },
    sourceIds: ["twAbyssSchedule", "krAbyssSchedule", "twAbyssGuide", "krAbyssGuide"],
    verifiedAt: "2026-09-16",
    mapLinks: [{ mapSlug: "abyss-rift-zone" }],
    usesKoreaAbyssGroupOffset: true,
  },
  {
    id: "shugo-festa",
    kind: "activity",
    schedules: {
      tw: { type: "daily-times", minutesOfDay: HOURLY_ON_THE_HOUR },
      kr: { type: "daily-times", minutesOfDay: HOURLY_ON_THE_HOUR },
    },
    sourceIds: ["twAbyssBosses", "krAbyssBosses"],
    verifiedAt: "2026-09-16",
    hasDerivedSlots: true,
  },
  {
    id: "dimensional-invasion",
    kind: "activity",
    schedules: {
      tw: { type: "daily-times", minutesOfDay: HOURLY_HALF_PAST },
      kr: { type: "daily-times", minutesOfDay: HOURLY_HALF_PAST },
    },
    sourceIds: ["twLiveActivities", "krLiveActivities"],
    verifiedAt: "2026-09-16",
    hasDerivedSlots: true,
  },
  {
    id: "battlefield",
    kind: "activity",
    schedules: {
      tw: { type: "daily-times", minutesOfDay: [660, 1_200] },
      kr: { type: "daily-times", minutesOfDay: [660, 1_200] },
    },
    sourceIds: ["twLiveActivities", "krLiveActivities"],
    verifiedAt: "2026-09-16",
    activeWindowMinutesByStart: {
      tw: { 660: 180, 1_200: 120 },
      kr: { 660: 180, 1_200: 120 },
    },
  },
  {
    id: "artifact-occupation",
    kind: "activity",
    schedules: {
      tw: {
        type: "weekly-times",
        slots: [
          { weekday: 3, minuteOfDay: 1_320 },
          { weekday: 6, minuteOfDay: 1_320 },
        ],
      },
      kr: {
        type: "weekly-times",
        slots: [
          { weekday: 3, minuteOfDay: 1_320 },
          { weekday: 6, minuteOfDay: 1_320 },
        ],
      },
    },
    sourceIds: ["twAbyssBosses", "krAbyssBosses", "twAbyssGuide", "krAbyssGuide"],
    verifiedAt: "2026-09-16",
    mapLinks: [
      { mapSlug: "chaotic-lower-reshanta" },
      { mapSlug: "chaotic-middle-reshanta" },
    ],
    usesKoreaAbyssGroupOffset: true,
  },
  {
    id: "abyss-bosses",
    kind: "boss",
    schedules: {
      tw: {
        type: "weekly-times",
        slots: [
          { weekday: 3, minuteOfDay: 1_350 },
          { weekday: 6, minuteOfDay: 1_350 },
        ],
      },
      kr: {
        type: "weekly-times",
        slots: [
          { weekday: 3, minuteOfDay: 1_350 },
          { weekday: 6, minuteOfDay: 1_350 },
        ],
      },
    },
    sourceIds: ["twAbyssSchedule", "krAbyssSchedule", "twAbyssBosses", "krAbyssBosses"],
    verifiedAt: "2026-09-16",
    mapLinks: [
      { mapSlug: "chaotic-lower-reshanta", filterSubtype: "boss" },
      { mapSlug: "chaotic-middle-reshanta", filterSubtype: "boss" },
    ],
    usesKoreaAbyssGroupOffset: true,
    activeMinutes: { tw: 30, kr: 30 },
  },
  {
    id: "nahma",
    kind: "boss",
    schedules: {
      tw: {
        type: "weekly-times",
        slots: [
          { weekday: 5, minuteOfDay: 1_320 },
          { weekday: 0, minuteOfDay: 1_320 },
        ],
      },
      kr: {
        type: "weekly-times",
        slots: [
          { weekday: 5, minuteOfDay: 1_320 },
          { weekday: 0, minuteOfDay: 1_320 },
        ],
      },
    },
    sourceIds: ["twAbyssSchedule", "krAbyssSchedule", "twAbyssBosses", "krAbyssBosses"],
    verifiedAt: "2026-09-16",
    mapLinks: [
      { mapSlug: "chaotic-lower-reshanta", filterSubtype: "boss" },
      { mapSlug: "chaotic-middle-reshanta", filterSubtype: "boss" },
    ],
    usesKoreaAbyssGroupOffset: true,
    activeMinutes: { tw: 30, kr: 30 },
  },
] as const;

const MINUTE_MS = 60_000;
const MINUTES_PER_DAY = 24 * 60;
const DAY_MS = 24 * 60 * MINUTE_MS;

function asValidDate(value: Date | number | string | undefined) {
  const date = value === undefined ? new Date() : new Date(value);
  return Number.isFinite(date.getTime()) ? date : new Date();
}

function candidateUtcTime(
  localDayStartMs: number,
  dayOffset: number,
  minuteOfDay: number,
  utcOffsetMinutes: number,
) {
  return localDayStartMs
    + dayOffset * DAY_MS
    + minuteOfDay * MINUTE_MS
    - utcOffsetMinutes * MINUTE_MS;
}

export function getNextRuleOccurrence(
  rule: EventTimerRule,
  service: ScheduledEventTimerService,
  now?: Date | number | string,
) {
  const instant = asValidDate(now);
  const profile = EVENT_TIMER_SERVICE_PROFILES[service];
  const localNowMs = instant.getTime() + profile.utcOffsetMinutes * MINUTE_MS;
  const localNow = new Date(localNowMs);
  const localDayStartMs = Date.UTC(
    localNow.getUTCFullYear(),
    localNow.getUTCMonth(),
    localNow.getUTCDate(),
  );

  let nextMs = Number.POSITIVE_INFINITY;
  if (rule.type === "daily-times") {
    for (let dayOffset = 0; dayOffset <= 1; dayOffset += 1) {
      for (const minuteOfDay of rule.minutesOfDay) {
        const candidate = candidateUtcTime(
          localDayStartMs,
          dayOffset,
          minuteOfDay,
          profile.utcOffsetMinutes,
        );
        if (candidate >= instant.getTime() && candidate < nextMs) nextMs = candidate;
      }
    }
  } else {
    const todayWeekday = localNow.getUTCDay();
    for (const slot of rule.slots) {
      const dayOffset = (slot.weekday - todayWeekday + 7) % 7;
      let candidate = candidateUtcTime(
        localDayStartMs,
        dayOffset,
        slot.minuteOfDay,
        profile.utcOffsetMinutes,
      );
      if (candidate < instant.getTime()) candidate += 7 * DAY_MS;
      if (candidate < nextMs) nextMs = candidate;
    }
  }

  return Number.isFinite(nextMs) ? new Date(nextMs) : null;
}

export function getNextEntryOccurrence(
  entry: EventTimerEntry,
  service: EventTimerService,
  now?: Date | number | string,
  koreaGroup: EventTimerKoreaGroup = "a",
) {
  if (service === "global") return null;
  const rule = entry.schedules[service];
  if (!rule) return null;
  const offset = service === "kr" && entry.usesKoreaAbyssGroupOffset
    ? EVENT_TIMER_KOREA_GROUP_OFFSETS[koreaGroup]
    : 0;
  const adjustedRule: EventTimerRule = rule.type === "daily-times"
    ? { ...rule, minutesOfDay: rule.minutesOfDay.map((minute) => minute + offset) }
    : {
      ...rule,
      slots: rule.slots.map((slot) => ({
        ...slot,
        minuteOfDay: slot.minuteOfDay + offset,
      })),
    };
  return getNextRuleOccurrence(adjustedRule, service, now);
}

export type UpcomingEventTimerEntry = {
  entry: EventTimerEntry;
  nextAt: Date;
  countdownAt: Date;
  status: "active" | "upcoming";
  endsAt?: Date;
};

export function getEventTimerEntryState(
  entry: EventTimerEntry,
  service: EventTimerService,
  now?: Date | number | string,
  koreaGroup: EventTimerKoreaGroup = "a",
): UpcomingEventTimerEntry | null {
  if (service === "global") return null;
  const instant = asValidDate(now);
  const fixedActiveMinutes = entry.activeMinutes?.[service];
  const windowMinutesByStart = entry.activeWindowMinutesByStart?.[service];
  const maximumActiveMinutes = Math.max(
    fixedActiveMinutes ?? 0,
    ...Object.values(windowMinutesByStart ?? {}),
  );
  if (maximumActiveMinutes > 0) {
    const maximumDurationMs = maximumActiveMinutes * MINUTE_MS;
    const possibleStart = getNextEntryOccurrence(
      entry,
      service,
      instant.getTime() - maximumDurationMs + 1,
      koreaGroup,
    );
    if (possibleStart && possibleStart.getTime() <= instant.getTime()) {
      const profile = EVENT_TIMER_SERVICE_PROFILES[service];
      const localStart = new Date(
        possibleStart.getTime() + profile.utcOffsetMinutes * MINUTE_MS,
      );
      const localStartMinute = localStart.getUTCHours() * 60 + localStart.getUTCMinutes();
      const koreaGroupOffset = service === "kr" && entry.usesKoreaAbyssGroupOffset
        ? EVENT_TIMER_KOREA_GROUP_OFFSETS[koreaGroup]
        : 0;
      const baseStartMinute = (
        localStartMinute - koreaGroupOffset + MINUTES_PER_DAY
      ) % MINUTES_PER_DAY;
      const activeMinutes = windowMinutesByStart?.[baseStartMinute] ?? fixedActiveMinutes;
      if (!activeMinutes || activeMinutes <= 0) {
        const nextAt = getNextEntryOccurrence(entry, service, instant, koreaGroup);
        return nextAt ? {
          entry,
          nextAt,
          countdownAt: nextAt,
          status: "upcoming",
        } : null;
      }
      const durationMs = activeMinutes * MINUTE_MS;
      const endsAt = new Date(possibleStart.getTime() + durationMs);
      if (endsAt.getTime() > instant.getTime()) {
        return {
          entry,
          nextAt: possibleStart,
          countdownAt: endsAt,
          status: "active",
          endsAt,
        };
      }
    }
  }

  const nextAt = getNextEntryOccurrence(entry, service, instant, koreaGroup);
  return nextAt ? {
    entry,
    nextAt,
    countdownAt: nextAt,
    status: "upcoming",
  } : null;
}

export function getUpcomingEventTimerEntries(
  service: EventTimerService,
  now?: Date | number | string,
  koreaGroup: EventTimerKoreaGroup = "a",
) {
  return EVENT_TIMER_ENTRIES.flatMap<UpcomingEventTimerEntry>((entry) => {
    const state = getEventTimerEntryState(entry, service, now, koreaGroup);
    return state ? [state] : [];
  }).sort((left, right) => (
    Number(left.status !== "active") - Number(right.status !== "active")
    || left.countdownAt.getTime() - right.countdownAt.getTime()
    || left.entry.id.localeCompare(right.entry.id)
  ));
}

export function getNextEventTimerByKind(
  kind: EventTimerKind,
  service: EventTimerService,
  now?: Date | number | string,
  koreaGroup: EventTimerKoreaGroup = "a",
) {
  return getUpcomingEventTimerEntries(service, now, koreaGroup)
    .find((candidate) => candidate.entry.kind === kind) ?? null;
}

export function getEventTimerSource(sourceId: keyof typeof EVENT_TIMER_SOURCES) {
  return EVENT_TIMER_SOURCES[sourceId];
}
