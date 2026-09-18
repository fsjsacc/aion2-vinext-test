"use client";

import {
  CalendarDays,
  Clock3,
  ExternalLink,
  Globe2,
  MapPin,
  Server,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { trackEvent } from "@/app/analytics";
import {
  EVENT_TIMER_SERVICE_PROFILES,
  EVENT_TIMER_ENTRIES,
  EVENT_TIMER_KOREA_GROUP_OFFSETS,
  EVENT_TIMER_KOREA_GROUP_SERVERS,
  EVENT_TIMER_SOURCES,
  eventTimerKoreaGroups,
  eventTimerServices,
  getNextEventTimerByKind,
  getUpcomingEventTimerEntries,
  type EventTimerKind,
  type EventTimerKoreaGroup,
  type EventTimerService,
  type UpcomingEventTimerEntry,
} from "@/app/event-timer";
import {
  eventTimerLocalization,
  type EventTimerFilterId,
} from "@/app/event-timer-localization";
import {
  localizedHref,
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";

import styles from "./EventTimer.module.css";

const SERVICE_STORAGE_KEY = "aion2-kina:event-timer-service:v2";
const KOREA_GROUP_STORAGE_KEY = "aion2-kina:event-timer-korea-group:v1";
const MAP_NAMES: Readonly<Record<string, string>> = {
  altgard: "Altgard",
  "abyss-rift-zone": "Abyss Rift Zone",
  "chaotic-lower-reshanta": "Lower Reshanta",
  "chaotic-middle-reshanta": "Middle Reshanta",
  verteron: "Verteron",
};

function defaultService(locale: SiteLocale): EventTimerService {
  if (locale === "ko") return "kr";
  if (locale === "zh-hans" || locale === "zh-hant") return "tw";
  return "global";
}

function isEventTimerService(value: string | null): value is EventTimerService {
  return eventTimerServices.some((candidate) => candidate === value);
}

function isKoreaGroup(value: string | null): value is EventTimerKoreaGroup {
  return eventTimerKoreaGroups.some((candidate) => candidate === value);
}

function analyticsService(service: EventTimerService) {
  return service === "global" ? "global" : "kr-tw-live";
}

function kindIcon(kind: EventTimerKind) {
  if (kind === "boss") return <MapPin aria-hidden="true" size={15} />;
  if (kind === "rift") return <Globe2 aria-hidden="true" size={15} />;
  return <CalendarDays aria-hidden="true" size={15} />;
}

function countdownLabel(
  target: Date,
  now: number,
  locale: SiteLocale,
) {
  const totalSeconds = Math.max(0, Math.ceil((target.getTime() - now) / 1_000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const clock = [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
  if (!days) return clock;
  const dayLabel = new Intl.NumberFormat(siteLocaleConfig[locale].code, {
    style: "unit",
    unit: "day",
    unitDisplay: "narrow",
  }).format(days);
  return `${dayLabel} ${clock}`;
}

function mapHref(
  locale: SiteLocale,
  mapSlug: string,
  filterSubtype?: "boss" | "rift",
) {
  const path = localizedHref(locale, `/tools/map/${mapSlug}/`);
  return filterSubtype ? `${path}#type=${filterSubtype}` : path;
}

export function EventTimer({
  initialNow,
  locale,
}: {
  initialNow: number;
  locale: SiteLocale;
}) {
  const text = eventTimerLocalization[locale];
  const [now, setNow] = useState(initialNow);
  const [service, setService] = useState<EventTimerService>(() => defaultService(locale));
  const [koreaGroup, setKoreaGroup] = useState<EventTimerKoreaGroup>("a");
  const [filter, setFilter] = useState<EventTimerFilterId>("all");
  const [clientReady, setClientReady] = useState(false);
  const profile = EVENT_TIMER_SERVICE_PROFILES[service];

  useEffect(() => {
    let cancelled = false;
    window.queueMicrotask(() => {
      if (cancelled) return;
      let activeService = defaultService(locale);
      setClientReady(true);
      try {
        const storedService = window.localStorage.getItem(SERVICE_STORAGE_KEY);
        const storedGroup = window.localStorage.getItem(KOREA_GROUP_STORAGE_KEY);
        if (isEventTimerService(storedService)) {
          activeService = storedService;
          setService(storedService);
        }
        if (isKoreaGroup(storedGroup)) setKoreaGroup(storedGroup);
      } catch {
        // The timer remains fully usable when local storage is unavailable.
      }
      trackEvent("tool_open", {
        locale,
        service: analyticsService(activeService),
        surface: "event_timer",
        tool_name: "event_timer",
      });
      trackEvent("event_timer_open", {
        locale,
        service: analyticsService(activeService),
        surface: "event_timer",
        tool_name: "event_timer",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    let serverAnchor = initialNow;
    let performanceAnchor = window.performance.now();
    const updateClock = () => {
      if (cancelled) return;
      setNow(serverAnchor + window.performance.now() - performanceAnchor);
    };
    const synchronize = async () => {
      if (document.visibilityState === "hidden") return;
      const startedAt = window.performance.now();
      try {
        const response = await window.fetch("/api/time", {
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        if (!response.ok) throw new Error("time-sync-failed");
        const payload = await response.json() as { now?: unknown };
        if (typeof payload.now !== "number" || !Number.isFinite(payload.now)) {
          throw new Error("invalid-time-response");
        }
        const completedAt = window.performance.now();
        serverAnchor = payload.now + (completedAt - startedAt) / 2;
        performanceAnchor = completedAt;
      } catch {
        // Keep the SSR server-time anchor when a transient sync request fails.
      }
      updateClock();
    };
    updateClock();
    void synchronize();
    const timer = window.setInterval(updateClock, 1_000);
    const resynchronize = () => void synchronize();
    window.addEventListener("focus", resynchronize);
    document.addEventListener("visibilitychange", resynchronize);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.removeEventListener("focus", resynchronize);
      document.removeEventListener("visibilitychange", resynchronize);
    };
  }, [initialNow]);

  const upcoming = useMemo(
    () => getUpcomingEventTimerEntries(service, now, koreaGroup),
    [koreaGroup, now, service],
  );
  const filteredUpcoming = useMemo(
    () => filter === "all"
      ? upcoming
      : upcoming.filter(({ entry }) => entry.kind === filter),
    [filter, upcoming],
  );
  const activeEntries = useMemo(
    () => upcoming.filter(({ status }) => status === "active"),
    [upcoming],
  );
  const scheduledEntries = useMemo(
    () => filteredUpcoming.filter(({ status }) => status === "upcoming"),
    [filteredUpcoming],
  );
  const summaries = useMemo(() => ([
    { kind: "activity" as const, label: text.nextActivity },
    { kind: "boss" as const, label: text.nextBoss },
    { kind: "rift" as const, label: text.nextRift },
  ]).map((summary) => ({
    ...summary,
    occurrence: getNextEventTimerByKind(summary.kind, service, now, koreaGroup),
  })), [koreaGroup, now, service, text.nextActivity, text.nextBoss, text.nextRift]);

  const serverClock = useMemo(() => new Intl.DateTimeFormat(
    siteLocaleConfig[locale].code,
    {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: profile.timeZone,
    },
  ), [locale, profile.timeZone]);
  const serverDateTime = useMemo(() => new Intl.DateTimeFormat(
    siteLocaleConfig[locale].code,
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: profile.timeZone,
    },
  ), [locale, profile.timeZone]);
  const localClock = useMemo(() => new Intl.DateTimeFormat(
    siteLocaleConfig[locale].code,
    { dateStyle: "medium", timeStyle: "medium" },
  ), [locale]);
  const localDateTime = useMemo(() => new Intl.DateTimeFormat(
    siteLocaleConfig[locale].code,
    { dateStyle: "medium", timeStyle: "short" },
  ), [locale]);
  const checkedFormatter = useMemo(() => new Intl.DateTimeFormat(
    siteLocaleConfig[locale].code,
    { dateStyle: "medium", timeZone: "UTC" },
  ), [locale]);
  const visibleSources = useMemo(() => {
    const relevantIds = new Set(
      EVENT_TIMER_ENTRIES
        .filter((entry) => filter === "all" || entry.kind === filter)
        .flatMap((entry) => entry.sourceIds),
    );
    return Object.entries(EVENT_TIMER_SOURCES).flatMap(([sourceKey, source]) => (
      relevantIds.has(sourceKey as keyof typeof EVENT_TIMER_SOURCES)
      && (
        service === "global"
        || source.id.startsWith(`${service}-`)
        || source.id === "kr-spacetime-rift-window"
      )
        ? [source]
        : []
    ));
  }, [filter, service]);
  const latestSourceVerification = useMemo(
    () => visibleSources.reduce(
      (latest, source) => source.verifiedAt > latest ? source.verifiedAt : latest,
      "",
    ),
    [visibleSources],
  );

  function changeService(value: EventTimerService) {
    if (value === service) return;
    setService(value);
    try {
      window.localStorage.setItem(SERVICE_STORAGE_KEY, value);
    } catch {
      // A persisted preference is optional.
    }
    trackEvent("event_timer_service_change", {
      locale,
      service: analyticsService(value),
      surface: "event_timer",
      timer_service: value,
      tool_name: "event_timer",
    });
  }

  function changeKoreaGroup(value: EventTimerKoreaGroup) {
    if (value === koreaGroup) return;
    setKoreaGroup(value);
    try {
      window.localStorage.setItem(KOREA_GROUP_STORAGE_KEY, value);
    } catch {
      // A persisted preference is optional.
    }
    trackEvent("event_timer_service_change", {
      korea_group: value,
      locale,
      service: "kr-tw-live",
      surface: "event_timer",
      timer_service: "kr",
      tool_name: "event_timer",
    });
  }

  function changeFilter(value: EventTimerFilterId) {
    if (value === filter) return;
    setFilter(value);
    trackEvent("event_timer_filter_change", {
      filter: value,
      locale,
      service: analyticsService(service),
      surface: "event_timer",
      tool_name: "event_timer",
    });
  }

  function trackMapOpen(mapSlug: string, kind: EventTimerKind) {
    trackEvent("event_timer_map_open", {
      event_kind: kind,
      locale,
      map_name: mapSlug,
      service: analyticsService(service),
      surface: "event_timer",
      target_key: mapSlug,
      target_kind: "map",
      tool_name: "event_timer",
    });
  }

  function sourceDisplayLabel(sourceId: string) {
    if (sourceId.endsWith("live-activities")) {
      return `AION2 · ${text.events["shugo-festa"].name} / ${text.events["dimensional-invasion"].name} / ${text.events.battlefield.name}`;
    }
    if (sourceId.endsWith("spacetime-rift-window")) {
      return `AION2 · ${text.events["spacetime-rift"].name} · ${text.portalClosesAt}`;
    }
    if (sourceId.endsWith("spacetime-rift")) {
      return `AION2 · ${text.events["spacetime-rift"].name}`;
    }
    if (sourceId.endsWith("abyss-schedule")) {
      return `AION2 · ${text.events["abyss-rift-zone"].name} / ${text.events["artifact-occupation"].name}`;
    }
    if (sourceId.endsWith("abyss-bosses")) {
      return `AION2 · ${text.events["abyss-bosses"].name} / ${text.events.nahma.name}`;
    }
    if (sourceId.endsWith("abyss-guide")) {
      return `AION2 · ${text.events["abyss-rift-zone"].name} / ${text.events["abyss-bosses"].name}`;
    }
    return `AION2 · ${text.source}`;
  }

  function renderEventList(
    entries: readonly UpcomingEventTimerEntry[],
    className = styles.eventList,
    headingLevel: 3 | 4 = 3,
  ) {
    const CardHeading = headingLevel === 4 ? "h4" : "h3";
    return (
      <ol className={className}>
        {entries.map(({ countdownAt, endsAt, entry, nextAt, status }) => {
          const eventCopy = text.events[entry.id];
          const koreaOffset = service === "kr" && entry.usesKoreaAbyssGroupOffset
            ? EVENT_TIMER_KOREA_GROUP_OFFSETS[koreaGroup]
            : 0;
          const displayAt = status === "active" && endsAt ? endsAt : nextAt;
          const timeLabel = status === "active"
            ? entry.id === "spacetime-rift" ? text.portalClosesAt : text.endsAt
            : text.nextStart;
          return (
            <li
              className={styles.eventCard}
              data-kind={entry.kind}
              data-status={status}
              key={entry.id}
            >
              <div>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.kindBadge}>
                      {kindIcon(entry.kind)}
                      <span className={styles.kind}>{text.filters[entry.kind]}</span>
                    </span>
                    <CardHeading>{eventCopy.name}</CardHeading>
                  </div>
                  <span className={styles.derivedBadge}>
                    {entry.hasDerivedSlots
                      ? text.sourceStatus.projected
                      : text.sourceStatus.official}
                  </span>
                </div>
                <p className={styles.eventDescription}>{eventCopy.description}</p>
                <div className={styles.recurrence}>
                  {eventCopy.repeatRule}
                  {koreaOffset ? ` · ${text.krGroups[koreaGroup]} +${koreaOffset}` : ""}
                </div>
                {entry.mapLinks?.length ? (
                  <div className={styles.cardFooter}>
                    {entry.mapLinks.map((map) => (
                      <a
                        className={styles.mapLink}
                        href={mapHref(locale, map.mapSlug, map.filterSubtype)}
                        key={`${entry.id}:${map.mapSlug}`}
                        onClick={() => trackMapOpen(map.mapSlug, entry.kind)}
                      >
                        <MapPin aria-hidden="true" size={15} />
                        {text.mapLink} · {MAP_NAMES[map.mapSlug] ?? map.mapSlug}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className={styles.timing}>
                <small className={styles.label}>
                  {status === "active" ? `${text.liveNow} · ` : ""}{text.countdown}
                </small>
                <strong className={styles.countdown}>{countdownLabel(countdownAt, now, locale)}</strong>
                <span className={styles.timePair}>
                  <small>{timeLabel} · {text.serverTime}</small>
                  <time dateTime={displayAt.toISOString()}>{serverDateTime.format(displayAt)}</time>
                </span>
                <span className={styles.timePair}>
                  <small>{timeLabel} · {text.localTime}</small>
                  <time dateTime={displayAt.toISOString()}>{clientReady ? localDateTime.format(displayAt) : "—"}</time>
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  const filterControls = (
    <div className={styles.filterBlock}>
      <p className={styles.filterCaption}>{text.filterLabel}</p>
      <div aria-label={text.filterLabel} className={styles.filters} role="group">
        {(["all", "activity", "boss", "rift"] as const).map((value) => (
          <button
            aria-pressed={filter === value}
            key={value}
            onClick={() => changeFilter(value)}
            type="button"
          >
            {text.filters[value]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.timer} aria-labelledby="event-timer-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>AION2 LIVE SCHEDULE</p>
          <h2 id="event-timer-title">{text.title}</h2>
        </div>
      </div>

      <fieldset className={styles.controls}>
        <legend>{text.serviceLabel}</legend>
        <div className={styles.controlRow}>
          <span className={styles.controlIcon} aria-hidden="true"><Server size={18} /></span>
          <label className={styles.label} htmlFor="event-timer-service">{text.serviceLabel}</label>
          <select
            className={styles.select}
            id="event-timer-service"
            onChange={(event) => changeService(event.target.value as EventTimerService)}
            value={service}
          >
            {eventTimerServices.map((value) => (
              <option key={value} value={value}>{text.services[value]}</option>
            ))}
          </select>
          <span className={styles.clockRow}>
            {service !== "global" ? (
              <span className={styles.clock}>
                <small>{text.serverTime} · {profile.timeZone}</small>
                <strong>{serverClock.format(now)}</strong>
              </span>
            ) : null}
            <span className={styles.clock}>
              <small>{text.localTime}</small>
              <strong>{clientReady ? localClock.format(now) : "—"}</strong>
            </span>
          </span>
        </div>

        {service === "kr" ? (
          <div className={styles.groupControl}>
            <label className={styles.label} htmlFor="event-timer-kr-group">{text.krGroupLabel}</label>
            <select
              className={styles.select}
              id="event-timer-kr-group"
              onChange={(event) => changeKoreaGroup(event.target.value as EventTimerKoreaGroup)}
              value={koreaGroup}
            >
              {eventTimerKoreaGroups.map((value) => (
                <option key={value} value={value}>{text.krGroups[value]}</option>
              ))}
            </select>
            <p className={styles.groupNote}>
              {text.krServerGroupHint} {text.krGroupOffsetHint}
              <span className={styles.serverPairs}>
                {text.krGroups[koreaGroup]} · {EVENT_TIMER_KOREA_GROUP_SERVERS[koreaGroup].join(" · ")}
              </span>
            </p>
          </div>
        ) : null}
      </fieldset>

      <div className={styles.summaryGrid}>
        {summaries.map(({ kind, label, occurrence }) => {
          const eventCopy = occurrence ? text.events[occurrence.entry.id] : null;
          return (
            <article className={styles.summaryCard} data-kind={kind} key={kind}>
              <div className={styles.summaryTop}>
                <span>
                  {kindIcon(kind)}
                  <span className={styles.kind}>
                    {occurrence?.status === "active" ? text.liveNow : label}
                  </span>
                </span>
                <Clock3 aria-hidden="true" size={16} />
              </div>
              <h3>{eventCopy?.name ?? text.services.global}</h3>
              {occurrence ? (
                <>
                  <strong className={styles.countdown}>
                    {occurrence.status === "active" ? `${text.liveNow} · ` : ""}
                    {countdownLabel(occurrence.countdownAt, now, locale)}
                  </strong>
                  <time className={styles.nextTime} dateTime={occurrence.countdownAt.toISOString()}>
                    {occurrence.status === "active"
                      ? `${occurrence.entry.id === "spacetime-rift" ? text.portalClosesAt : text.endsAt} · `
                      : ""}
                    {serverDateTime.format(occurrence.countdownAt)}
                  </time>
                </>
              ) : <span className={styles.nextTime}>{text.globalScheduleUnannounced}</span>}
            </article>
          );
        })}
      </div>

      {service === "global" ? filterControls : null}

      {service === "global" ? (
        <>
          <div className={styles.emptyState}>
            <h3>{text.services.global}</h3>
            <p>{text.globalScheduleUnannounced}</p>
          </div>
          <section className={styles.referenceSchedule} aria-labelledby="regional-schedule-title">
            <p className={styles.kicker}>{text.sourceStatus.official}</p>
            <h3 id="regional-schedule-title">{text.services.tw} / {text.services.kr}</h3>
            <div className={styles.referenceGrid}>
              {EVENT_TIMER_ENTRIES
                .filter((entry) => filter === "all" || entry.kind === filter)
                .map((entry) => (
                <article key={entry.id}>
                  <span className={styles.kindBadge}>
                    {kindIcon(entry.kind)}
                    <span className={styles.kind}>{text.filters[entry.kind]}</span>
                  </span>
                  <h4>{text.events[entry.id].name}</h4>
                  <p>{text.events[entry.id].repeatRule}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className={styles.activeSection} aria-labelledby="event-timer-active-title">
            <div className={styles.activeHeading}>
              <div>
                <p className={styles.kicker}>{text.liveNow}</p>
                <h3 id="event-timer-active-title">{text.activeSectionTitle}</h3>
              </div>
              <span
                aria-atomic="true"
                aria-label={`${text.activeSectionTitle}: ${activeEntries.length}`}
                aria-live="polite"
                className={styles.activeCount}
                role="status"
              >
                {activeEntries.length}
              </span>
            </div>
            <p className={styles.activeScopeNote}>{text.activeScopeNote}</p>
            {activeEntries.length > 0
              ? renderEventList(activeEntries, `${styles.eventList} ${styles.activeEventList}`, 4)
              : (
                <div className={`${styles.emptyState} ${styles.compactEmptyState}`}>
                  <p>{text.noActiveEvents}</p>
                </div>
              )}
          </section>

          {filterControls}
          {scheduledEntries.length > 0
            ? renderEventList(scheduledEntries)
            : <div className={styles.emptyState}><p>{text.emptyState}</p></div>}
        </>
      )}

      <section className={styles.sources} aria-labelledby="event-timer-sources">
        <div className={styles.sourceHeading}>
          <div>
            <p className={styles.kicker}>{text.sourceStatus.official}</p>
            <h3 id="event-timer-sources">{text.source}</h3>
          </div>
          <span className={styles.verified}>
            {text.checkedAt} · {latestSourceVerification
              ? checkedFormatter.format(new Date(`${latestSourceVerification}T00:00:00Z`))
              : "—"}
          </span>
        </div>
        <p className={styles.sourceIntro}>{text.maintenanceTakesPriority}</p>
        <ul className={styles.sourceList}>
          {visibleSources.map((source) => (
            <li key={source.id}>
              <a
                className={styles.sourceLink}
                href={source.url}
                onClick={() => trackEvent("event_timer_source_open", {
                  locale,
                  service: analyticsService(service),
                  source_id: source.id,
                  surface: "event_timer",
                  tool_name: "event_timer",
                })}
                rel="noreferrer"
                target="_blank"
              >
                <span>
                  <strong>{sourceDisplayLabel(source.id)}</strong>
                  <span className={styles.sourceMeta}>
                    {source.publisher} · {text.checkedAt} {checkedFormatter.format(new Date(`${source.verifiedAt}T00:00:00Z`))}
                  </span>
                </span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.faq} aria-labelledby="event-timer-faq">
        <p className={styles.kicker}>FAQ</p>
        <h3 id="event-timer-faq">{text.faqTitle}</h3>
        <div className={styles.faqList}>
          {text.faq.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
