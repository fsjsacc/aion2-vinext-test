import { trendingAugust27Article1 } from "./trending-august-27-a1";
import { trendingAugust27Article2 } from "./trending-august-27-a2";
import { trendingAugust27Article3 } from "./trending-august-27-a3";
import { trendingAugust27Article4 } from "./trending-august-27-a4";
import { trendingAugust27Article5 } from "./trending-august-27-a5";

export const trendingAugust27ContentEntries = [
  trendingAugust27Article1, trendingAugust27Article2, trendingAugust27Article3,
  trendingAugust27Article4, trendingAugust27Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust27GeneratedEditorialEntries = {
  "news/aion-2-gamescom-2026-opening-night-live-recap": {},
  "guides/aion-2-marriage-system-guide": {},
  "guides/aion-2-pc-performance-guide": {},
  "guides/aion-2-global-version-changes-guide": {},
  "guides/aion-2-sailing-life-content-guide": {},
} as const;