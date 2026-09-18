import { trendingSeptember3Article1 } from "./trending-september-3-a1";
import { trendingSeptember3Article2 } from "./trending-september-3-a2";
import { trendingSeptember3Article3 } from "./trending-september-3-a3";
import { trendingSeptember3Article4 } from "./trending-september-3-a4";
import { trendingSeptember3Article5 } from "./trending-september-3-a5";

export const trendingSeptember3ContentEntries = [
  trendingSeptember3Article1,
  trendingSeptember3Article2,
  trendingSeptember3Article3,
  trendingSeptember3Article4,
  trendingSeptember3Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember3GeneratedEditorialEntries = {
  "news/aion-2-gamescom-2026-demo-overview": {},
  "guides/aion-2-pet-collection-companion-guide": {},
  "guides/aion-2-raid-boss-split-merge-design": {},
  "news/aion-2-prelaunch-roadmap-stress-test-to-october-5": {},
  "guides/aion-2-wings-system-unlock-progression": {},
} as const;