import { trendingAugust26Article1 } from "./trending-august-26-a1";
import { trendingAugust26Article2 } from "./trending-august-26-a2";
import { trendingAugust26Article3 } from "./trending-august-26-a3";
import { trendingAugust26Article4 } from "./trending-august-26-a4";
import { trendingAugust26Article5 } from "./trending-august-26-a5";

export const trendingAugust26ContentEntries = [
  trendingAugust26Article1, trendingAugust26Article2, trendingAugust26Article3,
  trendingAugust26Article4, trendingAugust26Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust26GeneratedEditorialEntries = {
  "guides/aion-2-coupon-codes-august-2026": {},
  "guides/aion-2-dungeon-guide": {},
  "guides/aion-2-crafting-professions-guide": {},
  "guides/aion-2-world-bosses-guide": {},
  "guides/aion-2-cross-platform-guide": {},
} as const;