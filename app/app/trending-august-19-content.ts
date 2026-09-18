import { trendingAugust19Article1 } from "./trending-august-19-a1";
import { trendingAugust19Article2 } from "./trending-august-19-a2";
import { trendingAugust19Article3 } from "./trending-august-19-a3";
import { trendingAugust19Article4 } from "./trending-august-19-a4";
import { trendingAugust19Article5 } from "./trending-august-19-a5";

export const trendingAugust19ContentEntries = [
  trendingAugust19Article1,
  trendingAugust19Article2,
  trendingAugust19Article3,
  trendingAugust19Article4,
  trendingAugust19Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust19GeneratedEditorialEntries = {
  "guides/aion-2-leveling-guide-1-50": {},
  "guides/aion-2-abyss-rift-zone-guide": {},
  "guides/aion-2-daeva-pass-guide": {},
  "guides/aion-2-stigma-skill-system-guide": {},
  "guides/aion-2-inheritance-transcendence-guide": {},
} as const;