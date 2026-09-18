import { trendingAugust17Article1 } from "./trending-august-17-a1";
import { trendingAugust17Article2 } from "./trending-august-17-a2";
import { trendingAugust17Article3 } from "./trending-august-17-a3";
import { trendingAugust17Article4 } from "./trending-august-17-a4";
import { trendingAugust17Article5 } from "./trending-august-17-a5";

export const trendingAugust17ContentEntries = [
  trendingAugust17Article1,
  trendingAugust17Article2,
  trendingAugust17Article3,
  trendingAugust17Article4,
  trendingAugust17Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust17GeneratedEditorialEntries = {
  "news/gamescom-2026-ncsoft-lineup-project-bonfire": {},
  "news/aion-2-update-preview-new-dungeons-housing": {},
  "guides/aion-2-housing-system-preview": {},
  "guides/aion-2-pet-system-guide": {},
  "guides/aion-2-dps-meter-guide": {},
} as const;