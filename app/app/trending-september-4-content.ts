import { trendingSeptember4Article1 } from "./trending-september-4-a1";
import { trendingSeptember4Article2 } from "./trending-september-4-a2";
import { trendingSeptember4Article3 } from "./trending-september-4-a3";
import { trendingSeptember4Article4 } from "./trending-september-4-a4";
import { trendingSeptember4Article5 } from "./trending-september-4-a5";

export const trendingSeptember4ContentEntries = [
  trendingSeptember4Article1,
  trendingSeptember4Article2,
  trendingSeptember4Article3,
  trendingSeptember4Article4,
  trendingSeptember4Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember4GeneratedEditorialEntries = {
  "guides/aion-2-founders-pack-complete-guide": {},
  "guides/aion-2-launch-scale-test-preparation-guide": {},
  "news/aion-2-october-5-launch-countdown-roadmap": {},
  "guides/aion-2-korea-server-class-tier-guide": {},
  "guides/aion-2-abyss-system-complete-guide": {},
} as const;
