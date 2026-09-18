import { trendingSeptember7Article1 } from "./trending-september-7-a1";
import { trendingSeptember7Article2 } from "./trending-september-7-a2";
import { trendingSeptember7Article3 } from "./trending-september-7-a3";
import { trendingSeptember7Article4 } from "./trending-september-7-a4";
import { trendingSeptember7Article5 } from "./trending-september-7-a5";

export const trendingSeptember7ContentEntries = [
  trendingSeptember7Article1,
  trendingSeptember7Article2,
  trendingSeptember7Article3,
  trendingSeptember7Article4,
  trendingSeptember7Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember7GeneratedEditorialEntries = {
  "news/aion-2-western-launch-monetization-model-details": {},
  "news/aion-2-nc-two-track-global-strategy-shooters": {},
  "guides/aion-2-early-game-free-gear-progression-guide": {},
  "guides/aion-2-solo-dungeon-boss-mechanics-guide": {},
  "guides/aion-2-cross-server-matching-faction-balance-guide": {},
} as const;