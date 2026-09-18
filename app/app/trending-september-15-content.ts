import { trendingSeptember15Article1 } from "./trending-september-15-a1";
import { trendingSeptember15Article2 } from "./trending-september-15-a2";
import { trendingSeptember15Article3 } from "./trending-september-15-a3";
import { trendingSeptember15Article4 } from "./trending-september-15-a4";
import { trendingSeptember15Article5 } from "./trending-september-15-a5";

export const trendingSeptember15ContentEntries = [
  trendingSeptember15Article1,
  trendingSeptember15Article2,
  trendingSeptember15Article3,
  trendingSeptember15Article4,
  trendingSeptember15Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember15GeneratedEditorialEntries = {
  "guides/aion-2-fishing-hunting-guide": {},
  "guides/aion-2-siege-warfare-guide": {},
  "guides/aion-2-story-chapter-progression-guide": {},
  "guides/aion-2-ranked-pvp-matchmaking-guide": {},
  "guides/aion-2-time-management-efficiency-guide": {},
} as const;
