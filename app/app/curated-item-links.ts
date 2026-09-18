export const curatedItemSlugById = {
  "110130039": "brutalscourge-110130039",
  "513830001": "theostone-fregions-schemes-513830001",
  "513830003": "theostone-beritras-conspiracy-513830003",
  "513830004": "theostone-nezekans-march-513830004",
  "511351001": "lesser-abyssal-manastone-511351001",
  "511351002": "intermediate-abyssal-manastone-511351002",
  "610610016": "radiant-odyle-610610016",
  "610620016": "radiant-orichalcum-ore-610620016",
  "610650017": "radiant-yggdrasil-log-610650017",
  "610511019": "maddened-wrathful-curse-610511019",
  "610511036": "rampaging-fearsome-aura-weapon-610511036",
  "512400003": "ancient-aullaeu-wings-512400003",
} as const;

export function curatedItemSlug(itemId: string) {
  return curatedItemSlugById[
    itemId as keyof typeof curatedItemSlugById
  ] ?? null;
}
