import {
  DEFAULT_CHECKLIST_REGION,
  getChecklistCycleState,
  isChecklistRegion,
  type ChecklistCycleState,
  type ChecklistRegion,
} from "./checklist-reset.ts";

export {
  CHECKLIST_SERVER_PROFILES,
  DEFAULT_CHECKLIST_REGION,
  getChecklistCycleState,
  getNextDailyReset,
  getNextWeeklyReset,
  isChecklistRegion,
  type ChecklistCycleState,
  type ChecklistRegion,
  type ChecklistServerProfile,
} from "./checklist-reset.ts";

export const CHECKLIST_SCHEMA_VERSION = 3 as const;
export const CHECKLIST_STORAGE_KEY = "aion2-atlas:daily-checklist:v3";
export const LEGACY_V2_CHECKLIST_STORAGE_KEY = "aion2-atlas:daily-checklist:v2";
export const LEGACY_CHECKLIST_STORAGE_KEY = "aion2-atlas:daily-checklist:v1";

const STORAGE_UNAVAILABLE_PREFIX = "__aion2_atlas_storage_unavailable__:";
export const MAX_CHECKLIST_ITEMS = 100;
export const MAX_BUILTIN_CHECKLIST_ITEMS = 64;
const MAX_LABEL_LENGTH = 80;
const MAX_REFERENCE_LENGTH = 160;
const MAX_TIMER_DELAY = 2_147_000_000;

export type ChecklistFrequency = "daily" | "weekly" | "once";
export type ChecklistItemSource = "builtin" | "custom" | "map";

export type ChecklistMapRef = {
  mapName: string;
  mapSlug: string;
  markerId: string;
  markerNameSnapshot?: string;
  sourceVersion?: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  frequency: ChecklistFrequency;
  done: boolean;
  source: ChecklistItemSource;
  builtinId?: string;
  completedAt?: string;
  mapRef?: ChecklistMapRef;
};

export type ChecklistSettings = {
  region: ChecklistRegion;
};

export type ChecklistPeriods = {
  daily: string;
  weekly: string;
};

export type ChecklistDocument = {
  schemaVersion: typeof CHECKLIST_SCHEMA_VERSION;
  settings: ChecklistSettings;
  periods: ChecklistPeriods;
  items: ChecklistItem[];
};

export type ChecklistItemInput = {
  label: string;
  frequency?: ChecklistFrequency;
  mapRef?: ChecklistMapRef;
};

export type ChecklistBuiltinDefinition = {
  id: string;
  frequency: "daily" | "weekly";
  label?: string;
};

export type ChecklistSnapshot = {
  items: ChecklistItem[];
  settings: ChecklistSettings;
  periods: ChecklistPeriods;
  cycleState: ChecklistCycleState;
  storageUnavailable: boolean;
  sourceVersion: 1 | 2 | typeof CHECKLIST_SCHEMA_VERSION | null;
  resetApplied: boolean;
  needsPersistence: boolean;
};

export type ChecklistReadOptions = {
  now?: Date | number | string;
  defaultRegion?: ChecklistRegion;
};

export type ChecklistSerializeOptions = {
  now?: Date | number | string;
  region?: ChecklistRegion;
};

type ParsedChecklist = {
  items: ChecklistItem[];
  region: ChecklistRegion;
  periods: Partial<ChecklistPeriods>;
  sourceVersion: ChecklistSnapshot["sourceVersion"];
  needsPersistence: boolean;
};

function boundedString(value: unknown, maxLength = MAX_REFERENCE_LENGTH) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized && normalized.length <= maxLength ? normalized : null;
}

function normalizeLabel(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(/\s+/gu, " ");
  return normalized ? normalized.slice(0, MAX_LABEL_LENGTH) : null;
}

function normalizeBuiltinId(value: unknown) {
  const id = boundedString(value, 100);
  return id && /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/u.test(id) ? id : null;
}

function normalizeCompletedAt(value: unknown) {
  const timestamp = boundedString(value, 64);
  if (!timestamp) return null;
  const parsed = Date.parse(timestamp);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

function normalizeMapRef(value: unknown): ChecklistMapRef | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<ChecklistMapRef>;
  const mapName = boundedString(candidate.mapName);
  const mapSlug = boundedString(candidate.mapSlug, 100);
  const markerId = boundedString(candidate.markerId);
  if (!mapName || !mapSlug || !markerId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(mapSlug)) {
    return null;
  }

  const markerNameSnapshot = boundedString(candidate.markerNameSnapshot);
  const sourceVersion = boundedString(candidate.sourceVersion);
  return {
    mapName,
    mapSlug,
    markerId,
    ...(markerNameSnapshot ? { markerNameSnapshot } : {}),
    ...(sourceVersion ? { sourceVersion } : {}),
  };
}

function normalizeItem(value: unknown, allowOnce: boolean): ChecklistItem | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<ChecklistItem>;
  const originalId = boundedString(candidate.id);
  const label = normalizeLabel(candidate.label);
  const validFrequency = candidate.frequency === "daily" || candidate.frequency === "weekly"
    || (allowOnce && candidate.frequency === "once");
  if (!originalId || !label || !validFrequency || typeof candidate.done !== "boolean") return null;

  const mapRef = candidate.mapRef === undefined ? undefined : normalizeMapRef(candidate.mapRef);
  if (candidate.mapRef !== undefined && !mapRef) return null;

  let id = originalId;
  let source: ChecklistItemSource = mapRef ? "map" : "custom";
  let builtinId: string | undefined;
  if (candidate.source === "builtin") {
    const normalizedBuiltinId = normalizeBuiltinId(candidate.builtinId);
    if (!normalizedBuiltinId || mapRef || candidate.frequency === "once") return null;
    builtinId = normalizedBuiltinId;
    id = `builtin:${normalizedBuiltinId}`;
    source = "builtin";
  } else if (candidate.source === "map" && !mapRef) {
    return null;
  }

  const completedAt = candidate.done ? normalizeCompletedAt(candidate.completedAt) : null;
  return {
    id,
    label,
    frequency: candidate.frequency as ChecklistFrequency,
    done: candidate.done,
    source,
    ...(builtinId ? { builtinId } : {}),
    ...(completedAt ? { completedAt } : {}),
    ...(mapRef ? { mapRef } : {}),
  };
}

function normalizeItems(values: readonly unknown[], allowOnce = true) {
  const items: ChecklistItem[] = [];
  const seenIds = new Set<string>();
  let builtinCount = 0;
  let userItemCount = 0;
  for (const value of values) {
    const item = normalizeItem(value, allowOnce);
    if (!item || seenIds.has(item.id)) continue;
    if (item.source === "builtin") {
      if (builtinCount >= MAX_BUILTIN_CHECKLIST_ITEMS) continue;
      builtinCount += 1;
    } else {
      if (userItemCount >= MAX_CHECKLIST_ITEMS) continue;
      userItemCount += 1;
    }
    seenIds.add(item.id);
    items.push(item);
  }
  return items;
}

function reopenChecklistItem(item: ChecklistItem): ChecklistItem {
  const openItem = { ...item, done: false };
  delete openItem.completedAt;
  return openItem;
}

function currentPeriods(cycleState: ChecklistCycleState): ChecklistPeriods {
  return {
    daily: cycleState.dailyCycleKey,
    weekly: cycleState.weeklyCycleKey,
  };
}

function normalizePeriod(value: unknown, cadence: "daily" | "weekly") {
  const period = boundedString(value, 40);
  if (!period) return null;
  const pattern = cadence === "daily"
    ? /^(?:tw|kr):daily:\d{4}-\d{2}-\d{2}$/u
    : /^(?:tw|kr):weekly:\d{4}-\d{2}-\d{2}$/u;
  return pattern.test(period) ? period : null;
}

function parseRawChecklist(raw: string | null, defaultRegion: ChecklistRegion): ParsedChecklist {
  const empty: ParsedChecklist = {
    items: [],
    region: defaultRegion,
    periods: {},
    sourceVersion: null,
    needsPersistence: false,
  };
  if (!raw) return empty;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return {
        items: normalizeItems(parsed, false),
        region: defaultRegion,
        periods: {},
        sourceVersion: 1,
        needsPersistence: true,
      };
    }
    if (!parsed || typeof parsed !== "object") return empty;

    const document = parsed as {
      schemaVersion?: unknown;
      settings?: { region?: unknown };
      periods?: { daily?: unknown; weekly?: unknown };
      items?: unknown;
    };
    if (document.schemaVersion === 2 && Array.isArray(document.items)) {
      return {
        items: normalizeItems(document.items),
        region: defaultRegion,
        periods: {},
        sourceVersion: 2,
        needsPersistence: true,
      };
    }
    if (document.schemaVersion !== CHECKLIST_SCHEMA_VERSION || !Array.isArray(document.items)) {
      return empty;
    }

    const region = isChecklistRegion(document.settings?.region)
      ? document.settings.region
      : defaultRegion;
    const daily = normalizePeriod(document.periods?.daily, "daily");
    const weekly = normalizePeriod(document.periods?.weekly, "weekly");
    return {
      items: normalizeItems(document.items),
      region,
      periods: {
        ...(daily ? { daily } : {}),
        ...(weekly ? { weekly } : {}),
      },
      sourceVersion: CHECKLIST_SCHEMA_VERSION,
      needsPersistence: !isChecklistRegion(document.settings?.region) || !daily || !weekly,
    };
  } catch {
    return empty;
  }
}

export function readChecklistSnapshot(
  value: string | null,
  options: ChecklistReadOptions = {},
): ChecklistSnapshot {
  const storageUnavailable = value?.startsWith(STORAGE_UNAVAILABLE_PREFIX) ?? false;
  const raw = storageUnavailable
    ? value?.slice(STORAGE_UNAVAILABLE_PREFIX.length) || null
    : value;
  const defaultRegion = options.defaultRegion ?? DEFAULT_CHECKLIST_REGION;
  const parsed = parseRawChecklist(raw, defaultRegion);
  const cycleState = getChecklistCycleState(parsed.region, options.now);
  const periods = currentPeriods(cycleState);
  const dailyMismatch = Boolean(parsed.periods.daily && parsed.periods.daily !== periods.daily);
  const weeklyMismatch = Boolean(parsed.periods.weekly && parsed.periods.weekly !== periods.weekly);
  const resetApplied = dailyMismatch || weeklyMismatch;
  const items = resetApplied
    ? parsed.items.map((item) => {
      const shouldReset = (
        (item.frequency === "daily" && dailyMismatch)
        || (item.frequency === "weekly" && weeklyMismatch)
      );
      if (!shouldReset || !item.done) return item;
      return reopenChecklistItem(item);
    })
    : parsed.items;

  return {
    items,
    settings: { region: parsed.region },
    periods,
    cycleState,
    storageUnavailable,
    sourceVersion: parsed.sourceVersion,
    resetApplied,
    needsPersistence: parsed.needsPersistence || resetApplied,
  };
}

function prepareItemsForWrite(items: readonly ChecklistItem[], now: Date) {
  return normalizeItems(items).map((item) => {
    if (!item.done) return reopenChecklistItem(item);
    return item.completedAt ? item : { ...item, completedAt: now.toISOString() };
  });
}

export function serializeChecklistDocument(
  items: readonly ChecklistItem[],
  options: ChecklistSerializeOptions = {},
) {
  const region = options.region ?? DEFAULT_CHECKLIST_REGION;
  const now = options.now === undefined ? new Date() : new Date(options.now);
  const safeNow = Number.isFinite(now.getTime()) ? now : new Date();
  const cycleState = getChecklistCycleState(region, safeNow);
  const document: ChecklistDocument = {
    schemaVersion: CHECKLIST_SCHEMA_VERSION,
    settings: { region },
    periods: currentPeriods(cycleState),
    items: prepareItemsForWrite(items, safeNow),
  };
  return JSON.stringify(document);
}

function createChecklistStore() {
  const subscribers = new Set<() => void>();
  let volatileValue: string | null = null;
  let fallbackActive = false;
  let resetTimer: number | null = null;

  function getSnapshot() {
    if (fallbackActive) {
      return `${STORAGE_UNAVAILABLE_PREFIX}${volatileValue ?? ""}`;
    }
    try {
      return window.localStorage.getItem(CHECKLIST_STORAGE_KEY)
        ?? window.localStorage.getItem(LEGACY_V2_CHECKLIST_STORAGE_KEY)
        ?? window.localStorage.getItem(LEGACY_CHECKLIST_STORAGE_KEY);
    } catch {
      fallbackActive = true;
      return `${STORAGE_UNAVAILABLE_PREFIX}${volatileValue ?? ""}`;
    }
  }

  function getServerSnapshot() {
    return null;
  }

  function notify() {
    for (const callback of subscribers) callback();
  }

  function scheduleReset() {
    if (resetTimer !== null) window.clearTimeout(resetTimer);
    resetTimer = null;
    if (!subscribers.size) return;

    const now = new Date();
    const snapshot = readChecklistSnapshot(getSnapshot(), { now });
    const nextResetAt = Math.min(
      snapshot.cycleState.nextDailyResetAt.getTime(),
      snapshot.cycleState.nextWeeklyResetAt.getTime(),
    );
    const delay = Math.min(MAX_TIMER_DELAY, Math.max(0, nextResetAt - now.getTime()) + 250);
    resetTimer = window.setTimeout(() => {
      synchronize(new Date());
      scheduleReset();
    }, delay);
  }

  function write(
    items: readonly ChecklistItem[],
    options: ChecklistSerializeOptions = {},
  ) {
    const now = options.now === undefined ? new Date() : new Date(options.now);
    const safeNow = Number.isFinite(now.getTime()) ? now : new Date();
    const current = readChecklistSnapshot(getSnapshot(), { now: safeNow });
    const region = options.region ?? current.settings.region;
    const value = serializeChecklistDocument(items, { now: safeNow, region });
    volatileValue = value;
    let persisted = true;
    try {
      if (fallbackActive) throw new Error("Local storage unavailable");
      window.localStorage.setItem(CHECKLIST_STORAGE_KEY, value);
    } catch {
      fallbackActive = true;
      persisted = false;
    }
    notify();
    scheduleReset();
    return persisted;
  }

  function synchronize(now: Date | number | string = new Date()) {
    const snapshot = readChecklistSnapshot(getSnapshot(), { now });
    if (!snapshot.needsPersistence) {
      scheduleReset();
      return false;
    }
    write(snapshot.items, { region: snapshot.settings.region, now });
    return true;
  }

  function handleStorage(event: StorageEvent) {
    if (
      event.key !== CHECKLIST_STORAGE_KEY
      && event.key !== LEGACY_V2_CHECKLIST_STORAGE_KEY
      && event.key !== LEGACY_CHECKLIST_STORAGE_KEY
      && event.key !== null
    ) return;
    if (!synchronize(new Date())) notify();
    scheduleReset();
  }

  function handleVisibilityOrFocus() {
    if (document.visibilityState === "hidden") return;
    if (!synchronize(new Date())) notify();
    scheduleReset();
  }

  function subscribe(callback: () => void) {
    subscribers.add(callback);
    if (subscribers.size === 1) {
      window.addEventListener("storage", handleStorage);
      window.addEventListener("focus", handleVisibilityOrFocus);
      document.addEventListener("visibilitychange", handleVisibilityOrFocus);
      queueMicrotask(() => {
        if (!subscribers.size) return;
        synchronize(new Date());
        scheduleReset();
      });
    }
    return () => {
      subscribers.delete(callback);
      if (subscribers.size) return;
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      if (resetTimer !== null) window.clearTimeout(resetTimer);
      resetTimer = null;
    };
  }

  return { getServerSnapshot, getSnapshot, subscribe, synchronize, write };
}

export const checklistStore = createChecklistStore();

export function syncChecklistResets(now: Date | number | string = new Date()) {
  return checklistStore.synchronize(now);
}

export function updateChecklistItems(
  update: (current: ChecklistItem[]) => readonly ChecklistItem[],
) {
  const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
  const next = normalizeItems(update(snapshot.items));
  checklistStore.write(next, { region: snapshot.settings.region });
  return readChecklistSnapshot(checklistStore.getSnapshot()).items;
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

export function addChecklistItem(input: ChecklistItemInput) {
  const label = normalizeLabel(input.label);
  const frequency = input.frequency ?? "daily";
  const mapRef = input.mapRef === undefined ? undefined : normalizeMapRef(input.mapRef);
  if (
    !label
    || (frequency !== "daily" && frequency !== "weekly" && frequency !== "once")
    || (input.mapRef !== undefined && !mapRef)
  ) return null;

  const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
  const current = snapshot.items;
  if (mapRef) {
    const existing = current.find((candidate) => (
      candidate.mapRef?.mapName === mapRef.mapName
      && candidate.mapRef.markerId === mapRef.markerId
    ));
    if (existing) {
      return {
        item: existing,
        added: false,
        outcome: "duplicate",
        persisted: !snapshot.storageUnavailable,
      } as const;
    }
  }

  const userItemCount = current.filter((item) => item.source !== "builtin").length;
  if (userItemCount >= MAX_CHECKLIST_ITEMS) {
    return {
      item: null,
      added: false,
      outcome: "limit",
      persisted: !snapshot.storageUnavailable,
    } as const;
  }

  const item: ChecklistItem = {
    id: createId(),
    label,
    frequency,
    done: false,
    source: mapRef ? "map" : "custom",
    ...(mapRef ? { mapRef } : {}),
  };
  const persisted = checklistStore.write([...current, item], {
    region: snapshot.settings.region,
  });
  return { item, added: true, outcome: "added", persisted } as const;
}

export function ensureBuiltinChecklistItems(
  definitions: readonly ChecklistBuiltinDefinition[],
) {
  const normalizedDefinitions: Array<Required<ChecklistBuiltinDefinition>> = [];
  const seen = new Set<string>();
  for (const definition of definitions) {
    const id = normalizeBuiltinId(definition.id);
    const label = normalizeLabel(definition.label ?? definition.id);
    if (!id || !label || seen.has(id)) continue;
    if (definition.frequency !== "daily" && definition.frequency !== "weekly") continue;
    seen.add(id);
    normalizedDefinitions.push({ id, frequency: definition.frequency, label });
    if (normalizedDefinitions.length >= MAX_BUILTIN_CHECKLIST_ITEMS) break;
  }

  const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
  const currentBuiltins = new Map(
    snapshot.items
      .filter((item): item is ChecklistItem & { builtinId: string } => (
        item.source === "builtin" && Boolean(item.builtinId)
      ))
      .map((item) => [item.builtinId, item]),
  );
  let added = 0;
  const ensured = normalizedDefinitions.map((definition): ChecklistItem => {
    const existing = currentBuiltins.get(definition.id);
    if (!existing) {
      added += 1;
      return {
        id: `builtin:${definition.id}`,
        builtinId: definition.id,
        label: definition.label,
        frequency: definition.frequency,
        done: false,
        source: "builtin",
      };
    }
    return {
      ...existing,
      id: `builtin:${definition.id}`,
      builtinId: definition.id,
      label: definition.label,
      frequency: definition.frequency,
      source: "builtin",
    };
  });
  const knownIds = new Set(normalizedDefinitions.map((definition) => definition.id));
  const retained = snapshot.items.filter((item) => (
    item.source !== "builtin" || !item.builtinId || !knownIds.has(item.builtinId)
  ));
  const next = normalizeItems([...ensured, ...retained]);
  const changed = snapshot.needsPersistence || JSON.stringify(next) !== JSON.stringify(snapshot.items);
  const persisted = changed
    ? checklistStore.write(next, { region: snapshot.settings.region })
    : !snapshot.storageUnavailable;

  return { items: next, added, changed, persisted } as const;
}

export function setChecklistRegion(region: ChecklistRegion) {
  const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
  if (region === snapshot.settings.region) {
    if (snapshot.needsPersistence) {
      const persisted = checklistStore.write(snapshot.items, { region });
      return { items: snapshot.items, region, changed: false, persisted } as const;
    }
    return {
      items: snapshot.items,
      region,
      changed: false,
      persisted: !snapshot.storageUnavailable,
    } as const;
  }

  // Changing the game service only changes the server clock used for future
  // resets. A service switch is a display/settings change, not a new daily or
  // weekly cycle, so keep the player's current completion state intact.
  const items = snapshot.items;
  const persisted = checklistStore.write(items, { region });
  return { items, region, changed: true, persisted } as const;
}
