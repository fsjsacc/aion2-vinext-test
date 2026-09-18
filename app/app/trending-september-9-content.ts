import { trendingSeptember9Article1 } from "./trending-september-9-a1";
import { trendingSeptember9Article2 } from "./trending-september-9-a2";
import { trendingSeptember9Article3 } from "./trending-september-9-a3";
import { trendingSeptember9Article4 } from "./trending-september-9-a4";
import { trendingSeptember9Article5 } from "./trending-september-9-a5";

export const trendingSeptember9ContentEntries = [
  trendingSeptember9Article1,
  trendingSeptember9Article2,
  trendingSeptember9Article3,
  trendingSeptember9Article4,
  trendingSeptember9Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingSeptember9GeneratedEditorialEntries = {
  "news/aion-2-snowfield-of-grief-sanctuary-raid": {},
  "news/aion-2-abyss-september-9-update": {},
  "guides/aion-2-seal-system-guide": {},
  "guides/aion-2-true-dragon-lord-gear-guide": {},
  "guides/aion-2-september-events-daeva-pass-guide": {},
} as const;
