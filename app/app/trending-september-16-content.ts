import { trendingSeptember16Article1 } from "./trending-september-16-a1";
import { trendingSeptember16Article2 } from "./trending-september-16-a2";
import { trendingSeptember16Article3 } from "./trending-september-16-a3";
import { trendingSeptember16Article4 } from "./trending-september-16-a4";
import { trendingSeptember16Article5 } from "./trending-september-16-a5";

export const trendingSeptember16ContentEntries = [
  trendingSeptember16Article1,
  trendingSeptember16Article2,
  trendingSeptember16Article3,
  trendingSeptember16Article4,
  trendingSeptember16Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember16GeneratedEditorialEntries = {
  "guides/aion-2-aion-1-to-aion-2-transition-guide": {},
  "guides/aion-2-first-week-roadmap-guide": {},
  "guides/aion-2-class-switching-guide": {},
  "guides/aion-2-combat-mechanics-guide": {},
  "guides/aion-2-accessibility-features-guide": {},
} as const;
