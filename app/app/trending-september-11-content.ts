import { trendingSeptember11Article1 } from "./trending-september-11-a1";
import { trendingSeptember11Article2 } from "./trending-september-11-a2";

export const trendingSeptember11ContentEntries = [
  trendingSeptember11Article1,
  trendingSeptember11Article2,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember11GeneratedEditorialEntries = {
  "news/aion-2-launch-scale-test-countdown-6-days": {},
  "guides/aion-2-skill-preset-overhaul-guide": {},
} as const;