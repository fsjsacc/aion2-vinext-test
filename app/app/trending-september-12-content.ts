import { trendingSeptember12Article1 } from "./trending-september-12-a1";
import { trendingSeptember12Article2 } from "./trending-september-12-a2";
import { trendingSeptember12Article3 } from "./trending-september-12-a3";
import { trendingSeptember12Article4 } from "./trending-september-12-a4";
import { trendingSeptember12Article5 } from "./trending-september-12-a5";

export const trendingSeptember12ContentEntries = [
  trendingSeptember12Article1,
  trendingSeptember12Article2,
  trendingSeptember12Article3,
  trendingSeptember12Article4,
  trendingSeptember12Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember12GeneratedEditorialEntries = {
  "news/aion-2-piloting-crackdown-permanent-bans": {},
  "news/aion-2-tgs-2026-hardware-booth-hands-on": {},
  "news/aion-2-global-launch-revenue-risk-analysis": {},
  "guides/aion-2-fair-play-policy-guide": {},
  "guides/aion-2-global-launch-balance-risk-faq": {},
} as const;