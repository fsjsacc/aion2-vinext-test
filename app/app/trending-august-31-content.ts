import { trendingAugust31Article1 } from "./trending-august-31-a1";
import { trendingAugust31Article2 } from "./trending-august-31-a2";
import { trendingAugust31Article3 } from "./trending-august-31-a3";
import { trendingAugust31Article4 } from "./trending-august-31-a4";
import { trendingAugust31Article5 } from "./trending-august-31-a5";

export const trendingAugust31ContentEntries = [
  trendingAugust31Article1,
  trendingAugust31Article2,
  trendingAugust31Article3,
  trendingAugust31Article4,
  trendingAugust31Article5,
] as const satisfies readonly import("./content-registry").ContentEntry[];

export const trendingAugust31GeneratedEditorialEntries = {
  "news/aion-2-genai-asset-disclosure-steam": {},
  "guides/aion-2-language-support-8-languages-guide": {},
  "news/aion-2-october-2026-gta6-launch-crowd": {},
  "guides/aion-2-prelaunch-access-routes-guide": {},
  "news/aion-2-ncsoft-global-strategy-korea-playbook": {},
} as const;
