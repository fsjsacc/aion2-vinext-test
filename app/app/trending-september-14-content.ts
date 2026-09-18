import { trendingSeptember14Article1 } from "./trending-september-14-a1";
import { trendingSeptember14Article2 } from "./trending-september-14-a2";
import { trendingSeptember14Article3 } from "./trending-september-14-a3";
import { trendingSeptember14Article4 } from "./trending-september-14-a4";
import { trendingSeptember14Article5 } from "./trending-september-14-a5";

export const trendingSeptember14ContentEntries = [
  trendingSeptember14Article1,
  trendingSeptember14Article2,
  trendingSeptember14Article3,
  trendingSeptember14Article4,
  trendingSeptember14Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember14GeneratedEditorialEntries = {
  "news/aion-2-battleground-br-pvp-system-breakdown": {},
  "guides/aion-2-enhancement-system-strategy-guide": {},
  "guides/aion-2-crafting-weapons-standard-progression": {},
  "guides/aion-2-item-level-progression-roadmap": {},
  "guides/aion-2-skill-system-deep-dive": {},
} as const;
