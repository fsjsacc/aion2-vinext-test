import { trendingSeptember5Article1 } from "./trending-september-5-a1";
import { trendingSeptember5Article2 } from "./trending-september-5-a2";
import { trendingSeptember5Article3 } from "./trending-september-5-a3";
import { trendingSeptember5Article4 } from "./trending-september-5-a4";
import { trendingSeptember5Article5 } from "./trending-september-5-a5";

export const trendingSeptember5ContentEntries = [
  trendingSeptember5Article1,
  trendingSeptember5Article2,
  trendingSeptember5Article3,
  trendingSeptember5Article4,
  trendingSeptember5Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember5GeneratedEditorialEntries = {
  "guides/aion-2-system-requirements-pc-optimization-guide": {},
  "guides/aion-2-solo-leveling-guide-40-cap": {},
  "guides/aion-2-crafting-life-skills-complete-guide": {},
  "guides/aion-2-endgame-progression-roadmap": {},
  "guides/aion-2-mounts-movement-travel-guide": {},
} as const;
