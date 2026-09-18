import { trendingAugust21Article1 } from "./trending-august-21-a1";
import { trendingAugust21Article2 } from "./trending-august-21-a2";
import { trendingAugust21Article3 } from "./trending-august-21-a3";
import { trendingAugust21Article4 } from "./trending-august-21-a4";
import { trendingAugust21Article5 } from "./trending-august-21-a5";

export const trendingAugust21ContentEntries = [
  trendingAugust21Article1, trendingAugust21Article2, trendingAugust21Article3,
  trendingAugust21Article4, trendingAugust21Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust21GeneratedEditorialEntries = {
  "guides/aion-2-endgame-path-guide": {},
  "guides/aion-2-abyss-surface-guide": {},
  "guides/aion-2-crafting-guide": {},
  "guides/aion-2-guild-social-guide": {},
  "guides/aion-2-client-pre-download-guide": {},
} as const;