import { trendingAugust28Article1 } from "./trending-august-28-a1";
import { trendingAugust28Article2 } from "./trending-august-28-a2";
import { trendingAugust28Article3 } from "./trending-august-28-a3";
import { trendingAugust28Article4 } from "./trending-august-28-a4";
import { trendingAugust28Article5 } from "./trending-august-28-a5";

export const trendingAugust28ContentEntries = [
  trendingAugust28Article1, trendingAugust28Article2, trendingAugust28Article3,
  trendingAugust28Article4, trendingAugust28Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust28GeneratedEditorialEntries = {
  "news/aion-2-release-date-october-5-2026": {},
  "guides/aion-2-great-rebalance-patch-guide": {},
  "guides/aion-2-server-transfers-guide": {},
  "guides/aion-2-tenth-class-guide": {},
  "guides/aion-2-gamescom-show-floor-2026-guide": {},
} as const;