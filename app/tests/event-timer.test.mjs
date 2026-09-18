import assert from "node:assert/strict";
import test from "node:test";

import {
  EVENT_TIMER_ENTRIES,
  EVENT_TIMER_KOREA_GROUP_OFFSETS,
  EVENT_TIMER_SOURCES,
  getEventTimerEntryState,
  getNextEntryOccurrence,
  getNextRuleOccurrence,
  getUpcomingEventTimerEntries,
} from "../app/event-timer.ts";
import { eventTimerLocalization } from "../app/event-timer-localization.ts";
import { siteLocales } from "../app/site-config.ts";

function entry(id) {
  const result = EVENT_TIMER_ENTRIES.find((candidate) => candidate.id === id);
  assert.ok(result, `missing timer entry ${id}`);
  return result;
}

test("calculates the next Spacetime Rift in each service timezone", () => {
  const rift = entry("spacetime-rift");
  assert.equal(
    getNextEntryOccurrence(rift, "tw", "2026-07-30T17:59:59.000Z")?.toISOString(),
    "2026-07-30T18:00:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(rift, "kr", "2026-07-30T16:59:59.000Z")?.toISOString(),
    "2026-07-30T17:00:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(rift, "tw", "2026-07-30T18:00:01.000Z")?.toISOString(),
    "2026-07-30T21:00:00.000Z",
  );
});

test("keeps weekly events on server-local weekdays across UTC day boundaries", () => {
  const abyssRift = entry("abyss-rift-zone");
  assert.equal(
    getNextEntryOccurrence(abyssRift, "tw", "2026-07-27T13:00:00.000Z")?.toISOString(),
    "2026-07-28T14:00:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(abyssRift, "kr", "2026-07-27T13:00:00.000Z")?.toISOString(),
    "2026-07-28T13:00:00.000Z",
  );
});

test("applies Korea group offsets only to Abyss schedule entries", () => {
  assert.deepEqual(EVENT_TIMER_KOREA_GROUP_OFFSETS, { a: 0, b: 5, c: 10 });
  const artifact = entry("artifact-occupation");
  const rift = entry("spacetime-rift");
  const now = "2026-07-29T12:55:00.000Z";

  assert.equal(getNextEntryOccurrence(artifact, "kr", now, "a")?.toISOString(), "2026-07-29T13:00:00.000Z");
  assert.equal(getNextEntryOccurrence(artifact, "kr", now, "b")?.toISOString(), "2026-07-29T13:05:00.000Z");
  assert.equal(getNextEntryOccurrence(artifact, "kr", now, "c")?.toISOString(), "2026-07-29T13:10:00.000Z");
  assert.equal(
    getNextEntryOccurrence(rift, "kr", "2026-07-29T13:59:00.000Z", "c")?.toISOString(),
    "2026-07-29T14:00:00.000Z",
  );
});

test("applies Korea offsets to boss schedules", () => {
  const abyssBosses = entry("abyss-bosses");
  const nahma = entry("nahma");

  assert.equal(
    getNextEntryOccurrence(abyssBosses, "kr", "2026-07-29T13:29:00.000Z", "b")?.toISOString(),
    "2026-07-29T13:35:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(abyssBosses, "kr", "2026-07-29T13:29:00.000Z", "c")?.toISOString(),
    "2026-07-29T13:40:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(nahma, "kr", "2026-07-31T12:59:00.000Z", "c")?.toISOString(),
    "2026-07-31T13:10:00.000Z",
  );
});

test("keeps officially documented Rift and boss windows active", () => {
  const activeRift = getEventTimerEntryState(
    entry("spacetime-rift"),
    "tw",
    "2026-07-30T18:05:00.000Z",
  );
  assert.equal(activeRift?.status, "active");
  assert.equal(activeRift?.nextAt.toISOString(), "2026-07-30T18:00:00.000Z");
  assert.equal(activeRift?.endsAt?.toISOString(), "2026-07-30T18:10:00.000Z");
  assert.equal(
    getEventTimerEntryState(
      entry("spacetime-rift"),
      "tw",
      "2026-07-30T18:10:00.000Z",
    )?.status,
    "upcoming",
  );

  const activeBoss = getEventTimerEntryState(
    entry("abyss-bosses"),
    "kr",
    "2026-07-29T13:36:00.000Z",
    "b",
  );
  assert.equal(activeBoss?.status, "active");
  assert.equal(activeBoss?.endsAt?.toISOString(), "2026-07-29T14:05:00.000Z");
});

test("expands the official hourly Shugo and half-hour Dimension Invasion cycles", () => {
  const shugo = entry("shugo-festa");
  const invasion = entry("dimensional-invasion");

  assert.equal(shugo.hasDerivedSlots, true);
  assert.equal(invasion.hasDerivedSlots, true);
  assert.equal(
    getNextEntryOccurrence(shugo, "tw", "2026-07-30T13:59:59.000Z")?.toISOString(),
    "2026-07-30T14:00:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(shugo, "tw", "2026-07-30T14:00:01.000Z")?.toISOString(),
    "2026-07-30T15:00:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(invasion, "tw", "2026-07-30T13:29:59.000Z")?.toISOString(),
    "2026-07-30T13:30:00.000Z",
  );
  assert.equal(
    getNextEntryOccurrence(invasion, "kr", "2026-07-30T12:29:59.000Z")?.toISOString(),
    "2026-07-30T12:30:00.000Z",
  );
});

test("keeps both officially documented Battlefield matching windows active", () => {
  const battlefield = entry("battlefield");
  const midday = getEventTimerEntryState(
    battlefield,
    "tw",
    "2026-07-30T04:30:00.000Z",
  );
  const evening = getEventTimerEntryState(
    battlefield,
    "tw",
    "2026-07-30T13:00:00.000Z",
  );

  assert.equal(midday?.status, "active");
  assert.equal(midday?.endsAt?.toISOString(), "2026-07-30T06:00:00.000Z");
  assert.equal(evening?.status, "active");
  assert.equal(evening?.endsAt?.toISOString(), "2026-07-30T14:00:00.000Z");
  assert.equal(
    getEventTimerEntryState(
      battlefield,
      "tw",
      "2026-07-30T14:00:00.000Z",
    )?.status,
    "upcoming",
  );
});

test("looks up variable active windows before applying Korea group offsets", () => {
  const battlefield = entry("battlefield");
  const offsetWindow = {
    ...battlefield,
    usesKoreaAbyssGroupOffset: true,
  };
  const active = getEventTimerEntryState(
    offsetWindow,
    "kr",
    "2026-07-30T11:06:00.000Z",
    "b",
  );

  assert.equal(active?.status, "active");
  assert.equal(active?.nextAt.toISOString(), "2026-07-30T11:05:00.000Z");
  assert.equal(active?.endsAt?.toISOString(), "2026-07-30T13:05:00.000Z");
});

test("identifies every currently active event without inventing unknown windows", () => {
  const activeIds = (service, now, group = "a") => getUpcomingEventTimerEntries(
    service,
    now,
    group,
  ).filter(({ status }) => status === "active").map(({ entry: item }) => item.id);

  assert.deepEqual(
    activeIds("tw", "2026-08-05T03:05:00.000Z"),
    ["spacetime-rift", "battlefield"],
  );
  assert.deepEqual(
    activeIds("tw", "2026-08-05T14:35:00.000Z"),
    ["abyss-bosses"],
  );
  assert.deepEqual(
    activeIds("kr", "2026-08-05T13:35:00.000Z", "b"),
    ["abyss-bosses"],
  );
  assert.deepEqual(
    activeIds("kr", "2026-08-05T13:35:00.000Z", "c"),
    [],
  );
  assert.deepEqual(activeIds("tw", "2026-08-03T02:15:00.000Z"), []);
  assert.deepEqual(activeIds("global", "2026-08-05T03:05:00.000Z"), []);
  assert.ok(!activeIds("tw", "2026-08-05T03:05:00.000Z").includes("shugo-festa"));
  assert.ok(!activeIds("tw", "2026-08-05T03:05:00.000Z").includes("dimensional-invasion"));
});

test("does not invent a Global schedule and sorts available entries", () => {
  assert.equal(getNextEntryOccurrence(entry("nahma"), "global", Date.now()), null);
  assert.deepEqual(getUpcomingEventTimerEntries("global", Date.now()), []);

  const upcoming = getUpcomingEventTimerEntries("tw", "2026-07-30T13:59:00.000Z");
  assert.equal(upcoming.length, EVENT_TIMER_ENTRIES.length);
  assert.ok(
    upcoming.every((candidate, index) => (
      index === 0 || candidate.nextAt >= upcoming[index - 1].nextAt
    )),
  );
});

test("handles empty rules defensively", () => {
  assert.equal(
    getNextRuleOccurrence({ type: "daily-times", minutesOfDay: [] }, "tw", "2026-07-31T00:00:00Z"),
    null,
  );
  assert.equal(
    getNextRuleOccurrence({ type: "weekly-times", slots: [] }, "kr", "2026-07-31T00:00:00Z"),
    null,
  );
});

test("ships direct localized UI and event copy in every public locale", () => {
  assert.deepEqual(Object.keys(eventTimerLocalization).sort(), [...siteLocales].sort());
  for (const locale of siteLocales) {
    const copy = eventTimerLocalization[locale];
    assert.ok(copy.title.trim(), `${locale} timer title`);
    assert.ok(copy.globalScheduleUnannounced.trim(), `${locale} global status`);
    assert.ok(copy.activeSectionTitle.trim(), `${locale} active section title`);
    assert.ok(copy.activeScopeNote.trim(), `${locale} active scope note`);
    assert.ok(copy.noActiveEvents.trim(), `${locale} no-active status`);
    assert.equal(copy.faq.length, 3, `${locale} FAQ count`);
    for (const item of EVENT_TIMER_ENTRIES) {
      assert.ok(copy.events[item.id]?.name.trim(), `${locale}.${item.id}.name`);
      assert.ok(copy.events[item.id]?.repeatRule.trim(), `${locale}.${item.id}.repeatRule`);
    }
  }
});

test("timer sources are official HTTPS pages with verification dates", () => {
  for (const source of Object.values(EVENT_TIMER_SOURCES)) {
    const url = new URL(source.url);
    assert.equal(url.protocol, "https:");
    assert.ok(["tw.ncsoft.com", "aion2.plaync.com"].includes(url.hostname));
    assert.match(source.verifiedAt, /^2026-\d{2}-\d{2}$/u);
  }
});
