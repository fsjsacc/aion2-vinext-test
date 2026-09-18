import assert from "node:assert/strict";
import test from "node:test";

import {
  CHECKLIST_SCHEMA_VERSION,
  CHECKLIST_STORAGE_KEY,
  MAX_CHECKLIST_ITEMS,
  addChecklistItem,
  checklistStore,
  ensureBuiltinChecklistItems,
  readChecklistSnapshot,
  serializeChecklistDocument,
  setChecklistRegion,
} from "../app/checklist-store.ts";

test("reads the legacy v1 bare array without losing daily and weekly progress", () => {
  const snapshot = readChecklistSnapshot(JSON.stringify([
    { id: "daily-1", label: "Daily reward", frequency: "daily", done: true },
    { id: "weekly-1", label: "Weekly dungeon", frequency: "weekly", done: false },
    { id: "invalid", label: "Not valid in v1", frequency: "once", done: false },
  ]));

  assert.equal(snapshot.sourceVersion, 1);
  assert.equal(snapshot.storageUnavailable, false);
  assert.deepEqual(snapshot.items.map(({ id, done }) => ({ id, done })), [
    { id: "daily-1", done: true },
    { id: "weekly-1", done: false },
  ]);
  assert.deepEqual(snapshot.items.map((item) => item.source), ["custom", "custom"]);
  assert.equal(snapshot.needsPersistence, true);
});

test("migrates a v2 document while preserving one-time and map items", () => {
  const raw = JSON.stringify({
    schemaVersion: 2,
    items: [{
      id: "map-1",
      label: "Find Roah",
      frequency: "once",
      done: false,
      mapRef: {
        mapName: "World_L_A",
        mapSlug: "verteron",
        markerId: "roah-2f438df2",
        markerNameSnapshot: "Roah",
        sourceVersion: "2026-07-21",
      },
    }],
  });
  const snapshot = readChecklistSnapshot(raw, { now: "2026-07-21T12:00:00.000Z" });

  assert.equal(snapshot.sourceVersion, 2);
  assert.equal(snapshot.needsPersistence, true);
  assert.equal(snapshot.items[0].frequency, "once");
  assert.equal(snapshot.items[0].source, "map");
  assert.equal(snapshot.items[0].mapRef.markerId, "roah-2f438df2");
});

test("serializes v3 one-time items and stable map references", () => {
  const raw = serializeChecklistDocument([{
    id: "map-1",
    label: "Find Roah",
    frequency: "once",
    done: false,
    mapRef: {
      mapName: "World_L_A",
      mapSlug: "verteron",
      markerId: "roah-2f438df2",
      markerNameSnapshot: "Roah",
      sourceVersion: "2026-07-21",
    },
  }], { now: "2026-07-21T12:00:00.000Z", region: "tw" });
  const document = JSON.parse(raw);
  const snapshot = readChecklistSnapshot(raw, { now: "2026-07-21T12:00:00.000Z" });

  assert.equal(document.schemaVersion, CHECKLIST_SCHEMA_VERSION);
  assert.equal(document.settings.region, "tw");
  assert.equal(document.periods.daily, "tw:daily:2026-07-21");
  assert.equal(snapshot.sourceVersion, CHECKLIST_SCHEMA_VERSION);
  assert.equal(snapshot.items[0].frequency, "once");
  assert.equal(snapshot.items[0].mapRef.markerId, "roah-2f438df2");
});

test("resets only the cadence whose server cycle changed", () => {
  const raw = serializeChecklistDocument([
    { id: "daily", label: "Daily", frequency: "daily", done: true },
    { id: "weekly", label: "Weekly", frequency: "weekly", done: true },
    { id: "once", label: "Once", frequency: "once", done: true },
  ], { now: "2026-07-20T10:00:00.000Z", region: "tw" });
  const snapshot = readChecklistSnapshot(raw, { now: "2026-07-21T10:00:00.000Z" });

  assert.equal(snapshot.resetApplied, true);
  assert.deepEqual(snapshot.items.map(({ id, done }) => ({ id, done })), [
    { id: "daily", done: false },
    { id: "weekly", done: true },
    { id: "once", done: true },
  ]);
  assert.equal(snapshot.items[0].completedAt, undefined);
  assert.equal(snapshot.items[1].completedAt, "2026-07-20T10:00:00.000Z");
});

test("resets weekly items after Wednesday 05:00 but preserves one-time progress", () => {
  const raw = serializeChecklistDocument([
    { id: "daily", label: "Daily", frequency: "daily", done: true },
    { id: "weekly", label: "Weekly", frequency: "weekly", done: true },
    { id: "once", label: "Once", frequency: "once", done: true },
  ], { now: "2026-07-21T10:00:00.000Z", region: "tw" });
  const snapshot = readChecklistSnapshot(raw, { now: "2026-07-22T00:00:00.000Z" });

  assert.deepEqual(snapshot.items.map(({ id, done }) => ({ id, done })), [
    { id: "daily", done: false },
    { id: "weekly", done: false },
    { id: "once", done: true },
  ]);
});

test("adds and removes completion timestamps when completion changes", () => {
  const completedRaw = serializeChecklistDocument([{
    id: "daily",
    label: "Daily",
    frequency: "daily",
    done: true,
  }], { now: "2026-07-21T12:34:56.000Z", region: "tw" });
  const completed = readChecklistSnapshot(completedRaw, { now: "2026-07-21T12:34:56.000Z" });
  assert.equal(completed.items[0].completedAt, "2026-07-21T12:34:56.000Z");

  const reopenedRaw = serializeChecklistDocument([
    { ...completed.items[0], done: false },
  ], { now: "2026-07-21T12:35:00.000Z", region: "tw" });
  assert.equal(JSON.parse(reopenedRaw).items[0].completedAt, undefined);
});

test("switching game service preserves the current checklist progress", () => {
  const initial = serializeChecklistDocument([
    { id: "daily", label: "Daily", frequency: "daily", done: true },
    { id: "weekly", label: "Weekly", frequency: "weekly", done: true },
    { id: "once", label: "Once", frequency: "once", done: true },
  ], { region: "tw" });
  const values = new Map([[CHECKLIST_STORAGE_KEY, initial]]);
  globalThis.window = {
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
  };

  const result = setChecklistRegion("kr");
  const stored = readChecklistSnapshot(values.get(CHECKLIST_STORAGE_KEY));

  assert.equal(result.changed, true);
  assert.equal(stored.settings.region, "kr");
  assert.deepEqual(stored.items.map(({ id, done }) => ({ id, done })), [
    { id: "daily", done: true },
    { id: "weekly", done: true },
    { id: "once", done: true },
  ]);
  delete globalThis.window;
});

test("ensures built-in items with locale-independent stable IDs", () => {
  const values = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
  };

  const first = ensureBuiltinChecklistItems([
    { id: "daily-mission", frequency: "daily", label: "Daily mission" },
    { id: "weekly-sanctuary", frequency: "weekly", label: "Sanctuary" },
  ]);
  const second = ensureBuiltinChecklistItems([
    { id: "daily-mission", frequency: "daily", label: "每日任務" },
    { id: "weekly-sanctuary", frequency: "weekly", label: "聖所" },
  ]);
  const snapshot = readChecklistSnapshot(values.get(CHECKLIST_STORAGE_KEY));

  assert.equal(first.added, 2);
  assert.equal(second.added, 0);
  assert.deepEqual(snapshot.items.map(({ id, builtinId, source }) => ({ id, builtinId, source })), [
    { id: "builtin:daily-mission", builtinId: "daily-mission", source: "builtin" },
    { id: "builtin:weekly-sanctuary", builtinId: "weekly-sanctuary", source: "builtin" },
  ]);
  assert.deepEqual(snapshot.items.map((item) => item.label), ["每日任務", "聖所"]);
  delete globalThis.window;
});

test("does not add the same map marker twice", () => {
  const values = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
  };

  const input = {
    label: "Roah",
    frequency: "once",
    mapRef: {
      mapName: "World_L_A",
      mapSlug: "verteron",
      markerId: "roah-2f438df2",
      markerNameSnapshot: "Roah",
    },
  };
  const first = addChecklistItem(input);
  const second = addChecklistItem({ ...input, label: "Roah again" });

  assert.equal(first?.added, true);
  assert.equal(first?.persisted, true);
  assert.equal(second?.added, false);
  assert.equal(second?.outcome, "duplicate");
  assert.equal(first?.item.id, second?.item.id);
  assert.equal(readChecklistSnapshot(values.get(CHECKLIST_STORAGE_KEY)).items.length, 1);
  delete globalThis.window;
});

test("refuses a new item at the limit instead of deleting the oldest one", () => {
  const existing = Array.from({ length: MAX_CHECKLIST_ITEMS }, (_, index) => ({
    id: `item-${index}`,
    label: `Item ${index}`,
    frequency: "daily",
    done: false,
  }));
  const values = new Map([[CHECKLIST_STORAGE_KEY, serializeChecklistDocument(existing)]]);
  globalThis.window = {
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
  };

  const result = addChecklistItem({ label: "One item too many" });

  assert.equal(result?.added, false);
  assert.equal(result?.outcome, "limit");
  const storedItems = readChecklistSnapshot(values.get(CHECKLIST_STORAGE_KEY)).items;
  assert.equal(storedItems.length, MAX_CHECKLIST_ITEMS);
  assert.equal(storedItems[0].id, "item-0");
  delete globalThis.window;
});

test("reports session-only storage when local storage is blocked", () => {
  globalThis.window = {
    localStorage: {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    },
  };

  const result = addChecklistItem({ label: "Session task" });

  assert.equal(result?.added, true);
  assert.equal(result?.outcome, "added");
  assert.equal(result?.persisted, false);
  assert.equal(readChecklistSnapshot(checklistStore.getSnapshot()).storageUnavailable, true);
  delete globalThis.window;
});
