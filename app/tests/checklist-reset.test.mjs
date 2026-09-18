import assert from "node:assert/strict";
import test from "node:test";

import {
  CHECKLIST_SERVER_PROFILES,
  getChecklistCycleState,
  getNextDailyReset,
  getNextWeeklyReset,
} from "../app/checklist-reset.ts";

test("uses the Taiwan server's 05:00 boundary for daily cycles", () => {
  const before = getChecklistCycleState("tw", "2026-07-21T20:59:59.000Z");
  const after = getChecklistCycleState("tw", "2026-07-21T21:00:00.000Z");

  assert.equal(CHECKLIST_SERVER_PROFILES.tw.timeZone, "Asia/Taipei");
  assert.equal(before.dailyCycleKey, "tw:daily:2026-07-21");
  assert.equal(before.nextDailyResetAt.toISOString(), "2026-07-21T21:00:00.000Z");
  assert.equal(after.dailyCycleKey, "tw:daily:2026-07-22");
  assert.equal(after.nextDailyResetAt.toISOString(), "2026-07-22T21:00:00.000Z");
});

test("uses the Korea server's own local 05:00 instead of the browser timezone", () => {
  const before = getChecklistCycleState("kr", "2026-07-20T19:59:59.000Z");
  const after = getChecklistCycleState("kr", "2026-07-20T20:00:00.000Z");

  assert.equal(CHECKLIST_SERVER_PROFILES.kr.timeZone, "Asia/Seoul");
  assert.equal(before.dailyCycleKey, "kr:daily:2026-07-20");
  assert.equal(after.dailyCycleKey, "kr:daily:2026-07-21");
  assert.equal(getNextDailyReset("kr", "2026-07-20T20:00:00.000Z").toISOString(), "2026-07-21T20:00:00.000Z");
});

test("rolls the weekly cycle at Wednesday 05:00 server-local time", () => {
  const before = getChecklistCycleState("tw", "2026-07-21T20:59:59.000Z");
  const after = getChecklistCycleState("tw", "2026-07-21T21:00:00.000Z");

  assert.equal(before.weeklyCycleKey, "tw:weekly:2026-07-15");
  assert.equal(after.weeklyCycleKey, "tw:weekly:2026-07-22");
  assert.equal(getNextWeeklyReset("tw", "2026-07-21T21:00:00.000Z").toISOString(), "2026-07-28T21:00:00.000Z");
});
