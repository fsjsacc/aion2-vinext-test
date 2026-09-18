import { trendingAugust24Article1 } from "./trending-august-24-a1";
import { trendingAugust24Article2 } from "./trending-august-24-a2";
import { trendingAugust24Article3 } from "./trending-august-24-a3";
import { trendingAugust24Article4 } from "./trending-august-24-a4";
import { trendingAugust24Article5 } from "./trending-august-24-a5";

export const trendingAugust24ContentEntries = [
  trendingAugust24Article1, trendingAugust24Article2, trendingAugust24Article3,
  trendingAugust24Article4, trendingAugust24Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust24GeneratedEditorialEntries = {
  "guides/aion-2-faction-guide": {},
  "guides/aion-2-questing-leveling-guide": {},
  "guides/aion-2-gathering-resource-guide": {},
  "guides/aion-2-housing-guide": {},
  "guides/aion-2-trials-raids-guide": {},
} as const;