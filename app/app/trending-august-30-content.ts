import { trendingAugust30Article1 } from "./trending-august-30-a1";
import { trendingAugust30Article2 } from "./trending-august-30-a2";
import { trendingAugust30Article3 } from "./trending-august-30-a3";
import { trendingAugust30Article4 } from "./trending-august-30-a4";
import { trendingAugust30Article5 } from "./trending-august-30-a5";

export const trendingAugust30ContentEntries = [
  trendingAugust30Article1, trendingAugust30Article2, trendingAugust30Article3,
  trendingAugust30Article4, trendingAugust30Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust30GeneratedEditorialEntries = {
  "news/aion-2-gamescom-2026-preview-impressions": {},
  "guides/aion-2-underwater-exploration-guide": {},
  "guides/aion-2-monetization-f2p-cosmetics-guide": {},
  "guides/aion-2-class-roles-trinity-guide": {},
  "guides/aion-2-no-autoplay-anti-grind-design-guide": {},
} as const;