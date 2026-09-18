import { trendingAugust18Article1 } from "./trending-august-18-a1";
import { trendingAugust18Article2 } from "./trending-august-18-a2";
import { trendingAugust18Article3 } from "./trending-august-18-a3";
import { trendingAugust18Article4 } from "./trending-august-18-a4";
import { trendingAugust18Article5 } from "./trending-august-18-a5";

export const trendingAugust18ContentEntries = [
  trendingAugust18Article1,
  trendingAugust18Article2,
  trendingAugust18Article3,
  trendingAugust18Article4,
  trendingAugust18Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust18GeneratedEditorialEntries = {
  "news/gamescom-2026-aion-2-watch-guide": {},
  "guides/aion-2-trial-guide-vakron-sky-island": {},
  "guides/aion-2-encroached-deus-research-base-expedition-guide": {},
  "guides/aion-2-dps-meter-built-in-vs-aionflex": {},
  "guides/aion-2-brokerage-market-guide": {},
} as const;