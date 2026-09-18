import { trendingAugust25Article1 } from "./trending-august-25-a1";
import { trendingAugust25Article2 } from "./trending-august-25-a2";
import { trendingAugust25Article3 } from "./trending-august-25-a3";
import { trendingAugust25Article4 } from "./trending-august-25-a4";
import { trendingAugust25Article5 } from "./trending-august-25-a5";

export const trendingAugust25ContentEntries = [
  trendingAugust25Article1, trendingAugust25Article2, trendingAugust25Article3,
  trendingAugust25Article4, trendingAugust25Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust25GeneratedEditorialEntries = {
  "guides/aion-2-pre-launch-checklist": {},
  "guides/aion-2-steam-release-guide": {},
  "guides/aion-2-gamescom-2026-trailer-analysis": {},
  "guides/aion-2-solo-player-guide": {},
  "guides/aion-2-endgame-gear-guide": {},
} as const;