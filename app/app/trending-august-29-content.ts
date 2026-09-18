import { trendingAugust29Article1 } from "./trending-august-29-a1";
import { trendingAugust29Article2 } from "./trending-august-29-a2";
import { trendingAugust29Article3 } from "./trending-august-29-a3";
import { trendingAugust29Article4 } from "./trending-august-29-a4";
import { trendingAugust29Article5 } from "./trending-august-29-a5";

export const trendingAugust29ContentEntries = [
  trendingAugust29Article1, trendingAugust29Article2, trendingAugust29Article3,
  trendingAugust29Article4, trendingAugust29Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust29GeneratedEditorialEntries = {
  "news/aion-2-launch-scale-test-september-17-18": {},
  "guides/aion-2-dlss-45-rtx-support-guide": {},
  "guides/aion-2-moonlit-oasis-daeva-pass-guide": {},
  "guides/aion-2-new-dungeons-ascension-trials-august-2026": {},
  "news/aion-2-japan-livestream-august-28-2026": {},
} as const;