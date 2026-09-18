import { trendingSeptember8Article1 } from "./trending-september-8-a1";
import { trendingSeptember8Article2 } from "./trending-september-8-a2";
import { trendingSeptember8Article3 } from "./trending-september-8-a3";
import { trendingSeptember8Article4 } from "./trending-september-8-a4";
import { trendingSeptember8Article5 } from "./trending-september-8-a5";

export const trendingSeptember8ContentEntries = [
  trendingSeptember8Article1,
  trendingSeptember8Article2,
  trendingSeptember8Article3,
  trendingSeptember8Article4,
  trendingSeptember8Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember8GeneratedEditorialEntries = {
  "news/aion-2-console-version-cross-play-roadmap": {},
  "news/aion-2-global-launch-content-model-season-1": {},
  "news/aion-2-dlss-5-controller-support-confirmed": {},
  "guides/aion-2-global-qol-no-daily-gates-guide": {},
  "guides/aion-2-global-membership-15-guide": {},
} as const;
