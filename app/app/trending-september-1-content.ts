import { trendingSeptember1Article1 } from "./trending-september-1-a1";
import { trendingSeptember1Article2 } from "./trending-september-1-a2";
import { trendingSeptember1Article3 } from "./trending-september-1-a3";
import { trendingSeptember1Article4 } from "./trending-september-1-a4";
import { trendingSeptember1Article5 } from "./trending-september-1-a5";

export const trendingSeptember1ContentEntries = [
  trendingSeptember1Article1,
  trendingSeptember1Article2,
  trendingSeptember1Article3,
  trendingSeptember1Article4,
  trendingSeptember1Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember1GeneratedEditorialEntries = {
  "news/aion-2-steam-store-countdown-four-weeks": {},
  "news/aion-2-ncsoft-h1-record-pc-revenue": {},
  "news/aion-2-release-date-rumor-check": {},
  "news/aion-2-ncsoft-tgs-2026-astraea-lst-overlap": {},
  "news/aion-2-korea-game-industry-six-changes-kpmg": {},
} as const;