import { trendingAugust22Article1 } from "./trending-august-22-a1";
import { trendingAugust22Article2 } from "./trending-august-22-a2";
import { trendingAugust22Article3 } from "./trending-august-22-a3";
import { trendingAugust22Article4 } from "./trending-august-22-a4";
import { trendingAugust22Article5 } from "./trending-august-22-a5";

export const trendingAugust22ContentEntries = [
  trendingAugust22Article1, trendingAugust22Article2, trendingAugust22Article3,
  trendingAugust22Article4, trendingAugust22Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust22GeneratedEditorialEntries = {
  "guides/aion-2-pvp-guide": {},
  "guides/aion-2-class-tier-list-guide": {},
  "guides/aion-2-server-regions-guide": {},
  "guides/aion-2-expedition-boss-guide": {},
  "guides/aion-2-flight-system-guide": {},
} as const;