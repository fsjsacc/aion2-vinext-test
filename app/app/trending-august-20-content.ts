import { trendingAugust20Article1 } from "./trending-august-20-a1";
import { trendingAugust20Article2 } from "./trending-august-20-a2";
import { trendingAugust20Article3 } from "./trending-august-20-a3";
import { trendingAugust20Article4 } from "./trending-august-20-a4";
import { trendingAugust20Article5 } from "./trending-august-20-a5";

export const trendingAugust20ContentEntries = [
  trendingAugust20Article1,
  trendingAugust20Article2,
  trendingAugust20Article3,
  trendingAugust20Article4,
  trendingAugust20Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust20GeneratedEditorialEntries = {
  "guides/aion-2-mounts-and-wings-guide": {},
  "guides/aion-2-gear-enhancement-guide": {},
  "guides/aion-2-daily-weekly-routine-guide": {},
  "guides/aion-2-character-customization-guide": {},
  "guides/aion-2-trinity-roles-guide": {},
} as const;