import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { createServer } from "vite";

const projectRoot = process.cwd();
const sourceLocale = process.argv[2] ?? "en";
if (!["en", "zh-hant"].includes(sourceLocale)) {
  throw new Error(`Unsupported checklist source locale: ${sourceLocale}`);
}
const outputPath = path.join(
  projectRoot,
  "tmp",
  sourceLocale === "en"
    ? "checklist-source.json"
    : `checklist-source-${sourceLocale}.json`,
);

const ui = {
  title: "My checklist",
  privacy: "Completion stays in this browser and is never uploaded to KINA. Daily and weekly items move to a new cycle automatically for the selected game service.",
  recommendationNote: "Core, recommended, and situational are KINA route suggestions—not an official mandatory list. After an update, trust the in-game panel for special windows, counts, and rewards.",
  serverLegend: "Game service and reset time",
  region: "Game service",
  tw: "Taiwan / Hong Kong / Macau",
  kr: "Korea",
  serverTime: "Current server time",
  dailyReset: "Daily reset",
  weeklyReset: "Weekly reset",
  dailyRule: "Daily at 05:00",
  weeklyRule: "Wednesday at 05:00",
  resetIn: "in",
  maintenanceNote: "Reset times follow the selected service. During maintenance or event periods, check the in-game timer because individual activities may differ.",
  filtersLabel: "Checklist view",
  daily: "Today",
  weekly: "This week",
  once: "One-time",
  custom: "Custom",
  completed: "Completed",
  dailyGroup: "Daily activities",
  weeklyGroup: "Weekly activities",
  customGroup: "Custom tasks",
  dailyDescription: "Finish before the next daily reset; spend charge-based entries first when close to the cap.",
  weeklyDescription: "Spread these across the week instead of leaving everything until Wednesday reset.",
  customDescription: "Your daily, weekly, and one-time tasks. Daily and weekly tasks follow the selected service.",
  customAction: "Add custom task",
  taskLabel: "Task name",
  taskPlaceholder: "For example: claim a character reward",
  frequencyLabel: "Frequency",
  add: "Add to checklist",
  cancel: "Cancel",
  formTitle: "Add a custom task",
  formDescription: "Daily and weekly tasks follow the selected service's 05:00 cycle. One-time tasks never reset automatically.",
  progressDaily: "Daily {done} / {total}",
  progressWeekly: "Weekly {done} / {total}",
  empty: "There are no items in this view yet.",
  delete: "Delete “{label}”",
  reset: "Clear current-cycle checks",
  clear: "Delete completed one-time tasks",
  saved: "Saved on this device",
  storageError: "This browser blocked local storage, so changes may not persist.",
  limit: "Custom and map tasks can hold up to {limit} items. Delete one before adding another.",
  viewOnMap: "View on map",
  mapLinkLabel: "View “{marker}” on the map",
  details: "View details",
  closeDetails: "Hide details",
  cadence: "Count and schedule",
  entry: "How to enter",
  reward: "Main use / rewards",
  tip: "KINA tip",
  sources: "Official guides and references",
  sourceOfficial: "Official",
  sourceReference: "Reference",
  checked: "checked",
  customItem: "Custom task",
  mapItem: "Map task",
  core: "Core",
  recommended: "Recommended",
  situational: "Situational",
  server: "Server",
  account: "Account",
  character: "Character",
  daysRemaining: "{days}d {clock}",
  dailyKicker: "DAILY",
  weeklyKicker: "WEEKLY",
  customKicker: "CUSTOM",
  completedKicker: "COMPLETE",
  trackerKicker: "AION2 ROUTINE TRACKER",
  customTaskKicker: "CUSTOM TASK",
};

const vite = await createServer({
  configFile: false,
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  resolve: { alias: { "@": projectRoot } },
});

try {
  const {
    CHECKLIST_ACTIVITIES,
    CHECKLIST_SOURCES,
  } = await vite.ssrLoadModule("/app/checklist-activities.ts");
  const { coreChecklistUiCopy } = await vite.ssrLoadModule(
    "/app/_components/tools/DailyChecklist.tsx",
  );

  const sources = Object.fromEntries(
    Object.entries(CHECKLIST_SOURCES).map(([id, source]) => [
      id,
      source.copy[sourceLocale],
    ]),
  );
  const activities = Object.fromEntries(
    CHECKLIST_ACTIVITIES.map((activity) => [
      activity.id,
      activity.copy[sourceLocale],
    ]),
  );
  const sourceUi = coreChecklistUiCopy[sourceLocale];
  const selectedUi = sourceLocale === "en"
    ? ui
    : {
        ...sourceUi,
        progressDaily: sourceUi.progressDaily("{done}", "{total}"),
        progressWeekly: sourceUi.progressWeekly("{done}", "{total}"),
        delete: sourceUi.delete("{label}"),
        limit: sourceUi.limit.replace(/\b100\b/, "{limit}"),
        mapLinkLabel: sourceUi.mapLinkLabel("{marker}"),
        daysRemaining: "{days} 天 {clock}",
        dailyKicker: "每日",
        weeklyKicker: "每週",
        customKicker: "自訂",
        completedKicker: "已完成",
        trackerKicker: "AION2 例行清單",
        customTaskKicker: "自訂任務",
      };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify({
      version: 1,
      sourceLocale,
      entries: { ui: selectedUi, sources, activities },
    }, null, 2)}\n`,
    "utf8",
  );
  console.log(`Exported checklist source to ${outputPath}`);
} finally {
  await vite.close();
}
