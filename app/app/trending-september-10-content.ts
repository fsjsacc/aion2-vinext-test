import { trendingSeptember10Article1 } from "./trending-september-10-a1";
import { trendingSeptember10Article2 } from "./trending-september-10-a2";
import { trendingSeptember10Article3 } from "./trending-september-10-a3";
import { trendingSeptember10Article4 } from "./trending-september-10-a4";
import { trendingSeptember10Article5 } from "./trending-september-10-a5";

export const trendingSeptember10ContentEntries = [
  trendingSeptember10Article1,
  trendingSeptember10Article2,
  trendingSeptember10Article3,
  trendingSeptember10Article4,
  trendingSeptember10Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember10GeneratedEditorialEntries = {
  "news/aion-2-snowfield-of-sorrow-first-clear": {},
  "guides/aion-2-snowfield-of-sorrow-farming-guide": {},
  "news/aion-2-nc-chuseok-offensive": {},
  "guides/aion-2-hall-of-fame-commendation-guide": {},
  "guides/aion-2-snowfield-of-sorrow-first-clear-composition-guide": {},
} as const;
