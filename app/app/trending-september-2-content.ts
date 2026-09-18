import { trendingSeptember2Article1 } from "./trending-september-2-a1";
import { trendingSeptember2Article2 } from "./trending-september-2-a2";
import { trendingSeptember2Article3 } from "./trending-september-2-a3";
import { trendingSeptember2Article4 } from "./trending-september-2-a4";
import { trendingSeptember2Article5 } from "./trending-september-2-a5";

export const trendingSeptember2ContentEntries = [
  trendingSeptember2Article1,
  trendingSeptember2Article2,
  trendingSeptember2Article3,
  trendingSeptember2Article4,
  trendingSeptember2Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember2GeneratedEditorialEntries = {
  "news/aion-2-global-launch-no-oceania-server": {},
  "news/aion-2-dlss-5-support-release-september": {},
  "news/aion-2-kr-update-september-2-domination-revert": {},
  "guides/aion-2-server-region-selection-guide": {},
  "guides/aion-2-spacetime-rift-domination-guide": {},
} as const;