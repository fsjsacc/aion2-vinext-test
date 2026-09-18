import type {
  ContentEntry,
  ContentRelation,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { ItemDatabaseRecord } from "./item-database-types";
import type { ContentLocale } from "./site-config";

export type {
  ItemDatabaseCatalogCopy,
  ItemDatabaseRecord,
} from "./item-database-types";
export { itemDatabaseCatalogCopy } from "./item-database-copy";

const SNAPSHOT_DATE = "2026-07-18";
const EDITORIAL_UPDATED_DATE = "2026-07-25";

const allRaces = {
  "zh-hant": ["全部"],
  en: ["All"],
  ko: ["전체"],
} as const;

const elyosRace = {
  "zh-hant": ["天族"],
  en: ["Elyos"],
  ko: ["천족"],
} as const;

const noClassRestriction = {
  "zh-hant": [],
  en: [],
  ko: [],
} as const;

const gladiatorRestriction = {
  "zh-hant": ["劍星"],
  en: ["Gladiator"],
  ko: ["검성"],
} as const;

const uniqueGrade = {
  "zh-hant": "獨特",
  en: "Unique",
  ko: "유일",
} as const;

const rareGrade = {
  "zh-hant": "稀有",
  en: "Rare",
  ko: "희귀",
} as const;

const epicGrade = {
  "zh-hant": "英雄",
  en: "Epic",
  ko: "영웅",
} as const;

const standardUsableFlags = {
  storable: true,
  tradable: true,
  personalTradable: true,
  enchantable: false,
  decomposable: false,
} as const;

function makeEnglishDictionaryUrl(name: string) {
  return (
    "https://api-goats.plaync.com/aion2/v2.0/dict/search/item" +
    `?locale=en-US&searchKeyword=${encodeURIComponent(name)}&exact=true&size=10`
  );
}

function makeItemRecord(
  input: Omit<ItemDatabaseRecord, "officialUrls" | "snapshotDate">,
): ItemDatabaseRecord {
  return {
    ...input,
    officialUrls: {
      "zh-hant": `https://tw.ncsoft.com/aion2/info/item?detail=item_${input.id}_0_0`,
      en: makeEnglishDictionaryUrl(input.names.en),
      ko: `https://aion2.plaync.com/ko-kr/info/item?detail=item_${input.id}_0_0`,
    },
    snapshotDate: SNAPSHOT_DATE,
  };
}

export const itemDatabaseRecords = [
  makeItemRecord({
    id: "110130039",
    slug: "brutalscourge-110130039",
    names: {
      "zh-hant": "殘忍無道",
      en: "Brutalscourge",
      ko: "잔인무도",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Equip_WP_L_GS_0035_T06.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "巨劍(伸縮)",
      en: "Greatsword",
      ko: "대검(늘어남)",
    },
    descriptions: null,
    effects: null,
    itemType: "Equip",
    itemLevel: 88,
    equipLevel: 45,
    raceNames: allRaces,
    classNames: gladiatorRestriction,
    acquisition: {
      "zh-hant": "怪物掉落",
      en: "Monster drop",
      ko: "몬스터 드랍",
    },
    flags: {
      storable: true,
      tradable: true,
      personalTradable: true,
      enchantable: true,
      decomposable: true,
    },
    maxEnchantLevel: 15,
    maxExceedEnchantLevel: 5,
    magicStoneSlots: 4,
    godStoneSlots: 1,
    mainStats: [
      {
        id: "WeaponFixingDamage",
        names: {
          "zh-hant": "攻擊力",
          en: "Attack",
          ko: "공격력",
        },
        minValue: "378",
        value: "512",
      },
      {
        id: "WeaponAccuracy",
        names: {
          "zh-hant": "命中",
          en: "Accuracy",
          ko: "명중",
        },
        minValue: null,
        value: "100",
      },
      {
        id: "Critical",
        names: {
          "zh-hant": "暴擊",
          en: "Critical Hit",
          ko: "치명타",
        },
        minValue: null,
        value: "150",
      },
      {
        id: "Block",
        names: {
          "zh-hant": "格擋",
          en: "Block",
          ko: "막기",
        },
        minValue: null,
        value: "150",
      },
    ],
  }),
  makeItemRecord({
    id: "513830001",
    slug: "theostone-fregions-schemes-513830001",
    names: {
      "zh-hant": "神石：普雷奇翁的計謀",
      en: "Theostone: Fregion's Schemes",
      ko: "신석: 프레기온의 술책",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Usable_Godstone_WP_r_001.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "神石",
      en: "Theostone",
      ko: "신석",
    },
    descriptions: {
      "zh-hant":
        "獲得神石：普雷奇翁的計謀。獲得的神石可在綜合強化視窗中確認。",
      en: "Grants Theostone: Fregion's Schemes. The obtained Theostone can be found in the Enhancement menu.",
      ko: "신석: 프레기온의 술책을 획득합니다. 획득한 신석은 통합 강화창에서 확인할 수 있습니다.",
    },
    effects: {
      "zh-hant":
        "攻擊時，以 3% 機率使目標失明 7 秒。效果發動冷卻時間為 15 秒；穿戴多個相同神石時僅套用一個效果。",
      en: "Has a 3% chance to inflict Blind for 7s on attack. Effect activation cooldown: 15s. Only one effect applies when identical Theostones are engraved.",
      ko: "공격 시 3% 확률로 7초간 실명시킵니다. 효과 발동 쿨타임은 15초이며, 동일한 신석을 여러 개 착용해도 한 개의 효과만 적용됩니다.",
    },
    itemType: "Usable",
    itemLevel: 0,
    equipLevel: 9,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: null,
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "513830003",
    slug: "theostone-beritras-conspiracy-513830003",
    names: {
      "zh-hant": "神石：布里特拉的陰謀",
      en: "Theostone: Beritra's Conspiracy",
      ko: "신석: 브리트라의 음모",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Usable_Godstone_WP_r_003.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "神石",
      en: "Theostone",
      ko: "신석",
    },
    descriptions: {
      "zh-hant":
        "獲得神石：布里特拉的陰謀。獲得的神石可在綜合強化視窗中確認。",
      en: "Grants Theostone: Beritra's Conspiracy. The obtained Theostone can be found in the Enhancement menu.",
      ko: "신석: 브리트라의 음모를 획득합니다. 획득한 신석은 통합 강화창에서 확인할 수 있습니다.",
    },
    effects: {
      "zh-hant":
        "攻擊時，以 3% 機率使目標封印 5 秒。效果發動冷卻時間為 15 秒；穿戴多個相同神石時僅套用一個效果。",
      en: "Has a 3% chance to inflict Seal for 5s on attack. Effect activation cooldown: 15s. Only one effect applies when identical Theostones are engraved.",
      ko: "공격 시 3% 확률로 5초간 봉인시킵니다. 효과 발동 쿨타임은 15초이며, 동일한 신석을 여러 개 착용해도 한 개의 효과만 적용됩니다.",
    },
    itemType: "Usable",
    itemLevel: 0,
    equipLevel: 9,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: null,
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "513830004",
    slug: "theostone-nezekans-march-513830004",
    names: {
      "zh-hant": "神石：奈薩肯的進軍",
      en: "Theostone: Nezekan's March",
      ko: "신석: 네자칸의 진군",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Usable_Godstone_WP_r_004.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "神石",
      en: "Theostone",
      ko: "신석",
    },
    descriptions: {
      "zh-hant":
        "獲得神石：奈薩肯的進軍。獲得的神石可在綜合強化視窗中確認。",
      en: "Grants Theostone: Nezekan's March. The obtained Theostone can be found in the Enhancement menu.",
      ko: "신석: 네자칸의 진군을 획득합니다. 획득한 신석은 통합 강화창에서 확인할 수 있습니다.",
    },
    effects: {
      "zh-hant":
        "攻擊時，以 2% 機率使目標束縛 5 秒。效果發動冷卻時間為 15 秒；穿戴多個相同神石時僅套用一個效果。",
      en: "Has a 2% chance to inflict Root for 5s on attack. Effect activation cooldown: 15s. Only one effect applies when identical Theostones are engraved.",
      ko: "공격 시 2% 확률로 5초간 속박시킵니다. 효과 발동 쿨타임은 15초이며, 동일한 신석을 여러 개 착용해도 한 개의 효과만 적용됩니다.",
    },
    itemType: "Usable",
    itemLevel: 0,
    equipLevel: 9,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: null,
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "511351001",
    slug: "lesser-abyssal-manastone-511351001",
    names: {
      "zh-hant": "下級深淵魔石",
      en: "Lesser Abyssal Manastone",
      ko: "하급 심연의 마석",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Usable_Enchant_MagicStone_Abyss_A_r_001.png",
    gradeCode: "Rare",
    gradeNames: rareGrade,
    categoryNames: {
      "zh-hant": "魔石",
      en: "Manastone/Soulstone",
      ko: "마석",
    },
    descriptions: {
      "zh-hant":
        "可刻印於所有武器、防具的魔石欄位，並賦予能力值。根據機率決定能力值的種類與數值。",
      en: "Can be engraved on Manastone slots in all weapons and armor to imbue them with stats. The type and value of the stats are determined by chance.",
      ko: "모든 무기, 방어구의 마석 슬롯에 각인하여 스탯을 부여할 수 있습니다. 확률에 의해 스탯의 종류와 수치가 결정됩니다.",
    },
    effects: null,
    itemType: "Usable",
    itemLevel: 0,
    equipLevel: 1,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: null,
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "511351002",
    slug: "intermediate-abyssal-manastone-511351002",
    names: {
      "zh-hant": "中級深淵魔石",
      en: "Intermediate Abyssal Manastone",
      ko: "중급 심연의 마석",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Usable_Enchant_MagicStone_Abyss_A_r_002.png",
    gradeCode: "Rare",
    gradeNames: rareGrade,
    categoryNames: {
      "zh-hant": "魔石",
      en: "Manastone/Soulstone",
      ko: "마석",
    },
    descriptions: {
      "zh-hant":
        "可刻印於所有武器、防具的魔石欄位，並賦予能力值。根據機率決定能力值的種類與數值。",
      en: "Can be engraved on Manastone slots in all weapons and armor to imbue them with stats. The type and value of the stats are determined by chance.",
      ko: "모든 무기, 방어구의 마석 슬롯에 각인하여 스탯을 부여할 수 있습니다. 확률에 의해 스탯의 종류와 수치가 결정됩니다.",
    },
    effects: null,
    itemType: "Usable",
    itemLevel: 0,
    equipLevel: 1,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: {
      "zh-hant": "製作",
      en: "Crafting",
      ko: "제작",
    },
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "610610016",
    slug: "radiant-odyle-610610016",
    names: {
      "zh-hant": "燦爛的奧德",
      en: "Radiant Odyle",
      ko: "찬란한 오드",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Gather_Od_A_u_001.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "採集物",
      en: "Gathering Material",
      ko: "채집물",
    },
    descriptions: {
      "zh-hant": "可為道具注入奧德力量，製作與物質變換的材料。",
      en: "Used to imbue an item with the power of Odyle. Used as a material for Crafting and Substance Morph.",
      ko: "아이템에 오드의 힘을 불어넣을 수 있습니다. 제작과 물질변환의 재료입니다.",
    },
    effects: null,
    itemType: "Misc",
    itemLevel: 0,
    equipLevel: 40,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: {
      "zh-hant": "任務、採集、樹古慶典",
      en: "Quest, Gathering, Shugo Festival",
      ko: "슈고 페스타, 채집, 퀘스트",
    },
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "610620016",
    slug: "radiant-orichalcum-ore-610620016",
    names: {
      "zh-hant": "燦爛的奧里哈康礦石",
      en: "Radiant Orichalcum Ore",
      ko: "찬란한 오리하르콘 광석",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Gather_Ore_A_u_001.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "採集物",
      en: "Gathering Material",
      ko: "채집물",
    },
    descriptions: {
      "zh-hant": "堅固的礦石，鐵匠與盔甲製作的材料。",
      en: "A hard ore. Used as a material for Blacksmithing and Armorsmithing.",
      ko: "단단함을 갖춘 광석입니다. 대장 및 갑옷 제작의 재료입니다.",
    },
    effects: null,
    itemType: "Misc",
    itemLevel: 0,
    equipLevel: 40,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: {
      "zh-hant": "任務、採集",
      en: "Quest, Gathering",
      ko: "채집, 퀘스트",
    },
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "610650017",
    slug: "radiant-yggdrasil-log-610650017",
    names: {
      "zh-hant": "燦爛的世界樹木頭",
      en: "Radiant Yggdrasil Log",
      ko: "찬란한 이그드라실 나무",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Gather_Wood_A_u_001.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "採集物",
      en: "Gathering Material",
      ko: "채집물",
    },
    descriptions: {
      "zh-hant": "蘊含魔法力量的木頭，弓與法杖手工藝的材料。",
      en: "A magic-imbued log. Used as a material for handicrafting bows and staffs.",
      ko: "마법의 힘이 깃든 나무입니다. 활과 법봉 세공의 재료입니다.",
    },
    effects: null,
    itemType: "Misc",
    itemLevel: 0,
    equipLevel: 40,
    raceNames: elyosRace,
    classNames: noClassRestriction,
    acquisition: {
      "zh-hant": "任務、採集",
      en: "Quest, Gathering",
      ko: "채집, 퀘스트",
    },
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "610511019",
    slug: "maddened-wrathful-curse-610511019",
    names: {
      "zh-hant": "發狂的憤怒巫蠱",
      en: "Maddened Wrathful Curse",
      ko: "광기에 찬 분노의 무고",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Craft_Drop_Draconic_Soul_A_l_004.png",
    gradeCode: "Epic",
    gradeNames: epicGrade,
    categoryNames: {
      "zh-hant": "製作材料",
      en: "Crafting Material",
      ko: "제작 재료",
    },
    descriptions: {
      "zh-hant":
        "仿造龍族發狂的憤怒巫蠱製成的物質，製作龍系裝備的材料。",
      en: "Materialized form of a Balaur's Maddened Wrathful Curse. Used to craft Draconic gear.",
      ko: "용족의 광기에 찬 분노의 무고가 형상화된 물질입니다. 드라코닉 장비를 만드는 재료입니다.",
    },
    effects: null,
    itemType: "Misc",
    itemLevel: 0,
    equipLevel: 40,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: {
      "zh-hant": "獎勵箱、聖域",
      en: "Reward Chest, Sanctuary",
      ko: "성역, 보상 상자",
    },
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "610511036",
    slug: "rampaging-fearsome-aura-weapon-610511036",
    names: {
      "zh-hant": "暴走的恐懼氣息：武器",
      en: "Rampaging Fearsome Aura: Weapon",
      ko: "폭주한 공포의 기운: 무기",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_Item_Craft_Drop_Draconic_T6_A_02.png",
    gradeCode: "Epic",
    gradeNames: epicGrade,
    categoryNames: {
      "zh-hant": "製作材料",
      en: "Crafting Material",
      ko: "제작 재료",
    },
    descriptions: {
      "zh-hant":
        "仿造龍族因暴走而陷入恐懼的氣息製成的物質。用於製作創龍王、滅龍王或熔岩心臟武器。",
      en: "Materialized form of a Balaur's rampaging fearsome aura. Used to craft Genesis Dragon Lord, Nemesis Dragon Lord, or Lava Heart weapons.",
      ko: "용족의 폭주로 공포에 질린 기운이 형상화된 물질입니다. 창룡왕, 멸룡왕 또는 용암 심장 무기를 만드는 데 사용되는 재료입니다.",
    },
    effects: null,
    itemType: "Misc",
    itemLevel: 0,
    equipLevel: 40,
    raceNames: allRaces,
    classNames: noClassRestriction,
    acquisition: null,
    flags: standardUsableFlags,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
  makeItemRecord({
    id: "512400003",
    slug: "ancient-aullaeu-wings-512400003",
    names: {
      "zh-hant": "古代阿爾拉烏翅膀",
      en: "Ancient Aullaeu Wings",
      ko: "고대 아울라우의 날개",
    },
    icon: "https://assets.playnccdn.com/static-aion2-gamedata/resources/Icon_WingE_002.png",
    gradeCode: "Unique",
    gradeNames: uniqueGrade,
    categoryNames: {
      "zh-hant": "翅膀解鎖道具",
      en: "Wings",
      ko: "날개 해금 아이템",
    },
    descriptions: {
      "zh-hant": "獲得古代阿爾拉烏翅膀。",
      en: "Grants Ancient Aullaeu Wings.",
      ko: "고대 아울라우의 날개를 획득합니다.",
    },
    effects: {
      "zh-hant":
        "裝備效果：額外攻擊力 60、額外防禦力 400、生命力 500、生命力自然恢復 250。持有效果：飛行力 200、額外命中 20、後方攻擊力 10。",
      en: "Equip effects: Attack Bonus 60, Defense Bonus 400, HP 500, Natural HP Regen 250. Owned effects: Flight Power 200, Accuracy Bonus 20, Back Attack 10.",
      ko: "장착 효과: 추가 공격력 60, 추가 방어력 400, 생명력 500, 생명력 자연 회복 250. 보유 효과: 비행력 200, 추가 명중 20, 후방 공격력 10.",
    },
    itemType: "Usable",
    itemLevel: 0,
    equipLevel: 1,
    raceNames: elyosRace,
    classNames: noClassRestriction,
    acquisition: {
      "zh-hant": "物質變換",
      en: "Substance Morph",
      ko: "물질 변환",
    },
    flags: {
      storable: true,
      tradable: true,
      personalTradable: true,
      enchantable: false,
      decomposable: true,
    },
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    mainStats: [],
  }),
] as const satisfies readonly ItemDatabaseRecord[];

const publishedVerified = {
  status: "published",
  indexable: true,
  localeReview: {
    "zh-hant": "approved",
    en: "approved",
    ko: "approved",
  },
  sourceReview: "verified",
} as const;

const commonEditorialCopy = {
  "zh-hant": {
    eyebrow: "AION2 物品資料庫",
    byline: "AION2 KINA 資料編輯",
    backLabel: "返回物品資料庫",
    contentsLabel: "本頁內容",
    publishedLabel: "發布",
    updatedLabel: "更新",
    readingTime: "約 3 分鐘",
    relatedLabel: "相關攻略",
    officialTitle: "官方物品說明與效果",
    fieldsTitle: "已核對的官方欄位",
    fieldsIntro:
      "以下資料直接整理自官方物品回應；英文名稱另以官方 en-US 字典精確查詢同一物品 ID。",
    boundaryTitle: "物品資料與閱讀方式",
    noDescription:
      "官方物品回應沒有提供獨立說明文字；本頁只呈現該記錄中可核對的分類、等級、限制、插槽與主要能力值。",
    acquisitionBoundary:
      "「取得來源」顯示官方頁面在資料更新日列出的標籤。若顯示未列出，代表官方回應沒有提供該欄位，不代表遊戲內無法取得。",
    editorialBoundary:
      "本頁不加入未公開的掉落率、交易價格、配方數量或最佳配置判斷。遊戲版本更新後，請以遊戲內介面與官方物品頁為準。",
    sourceNote:
      "物品資料 · 2026-07-18 核對 NC 台灣、韓國物品資料與 en-US 字典",
  },
  en: {
    eyebrow: "AION2 ITEM DATABASE",
    byline: "AION2 KINA data desk",
    backLabel: "Back to item database",
    contentsLabel: "On this page",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    readingTime: "About 3 minutes",
    relatedLabel: "Related guides",
    officialTitle: "Official item description and effects",
    fieldsTitle: "Verified official fields",
    fieldsIntro:
      "The fields below come from the official item responses. The English name was independently matched to the same item ID in the official en-US dictionary.",
    boundaryTitle: "Item data and how to read it",
    noDescription:
      "The official item response does not provide a standalone description. This page therefore reports only the category, levels, restrictions, sockets, and main stats that can be verified.",
    acquisitionBoundary:
      "Acquisition shows only the tags listed by the official page on the data update date. “Not listed” means that the response omitted the field; it does not mean that the item is unobtainable.",
    editorialBoundary:
      "This page does not add unpublished drop rates, market prices, recipe quantities, or best-build claims. After a game update, treat the in-game interface and official item page as final.",
    sourceNote:
      "Item data · checked 2026-07-18 against NC Taiwan, Korea, and the en-US dictionary",
  },
  ko: {
    eyebrow: "AION2 아이템 데이터베이스",
    byline: "AION2 KINA 데이터 편집팀",
    backLabel: "아이템 데이터베이스로 돌아가기",
    contentsLabel: "페이지 목차",
    publishedLabel: "게시",
    updatedLabel: "업데이트",
    readingTime: "약 3분",
    relatedLabel: "관련 가이드",
    officialTitle: "공식 아이템 설명과 효과",
    fieldsTitle: "검증한 공식 필드",
    fieldsIntro:
      "아래 필드는 공식 아이템 응답에서 정리했습니다. 영문 이름은 공식 en-US 사전에서 같은 아이템 ID로 다시 대조했습니다.",
    boundaryTitle: "데이터 범위와 읽는 법",
    noDescription:
      "공식 아이템 응답에 별도 설명문이 없습니다. 따라서 이 페이지는 확인 가능한 분류, 레벨, 제한, 슬롯과 주요 능력치만 표시합니다.",
    acquisitionBoundary:
      "획득처는 데이터 업데이트 날짜에 공식 페이지가 표시한 태그만 옮겼습니다. ‘미기재’는 응답에 해당 필드가 없다는 뜻이며, 획득할 수 없다는 뜻이 아닙니다.",
    editorialBoundary:
      "공개되지 않은 드롭률, 거래 가격, 제작 수량 또는 최적 세팅은 추가하지 않습니다. 업데이트 이후에는 게임 내 화면과 공식 아이템 페이지를 최종 기준으로 확인하세요.",
    sourceNote:
      "아이템 데이터 · 2026-07-18 NC 대만·한국 아이템 정보와 en-US 사전 대조",
  },
} as const;

function formatNullableBoolean(locale: ContentLocale, value: boolean | null) {
  if (value === null) {
    return locale === "zh-hant"
      ? "未列出"
      : locale === "ko"
        ? "미기재"
        : "Not listed";
  }
  if (locale === "zh-hant") return value ? "是" : "否";
  if (locale === "ko") return value ? "가능" : "불가";
  return value ? "Yes" : "No";
}

function formatNullableNumber(locale: ContentLocale, value: number | null) {
  if (value !== null) return String(value);
  return locale === "zh-hant"
    ? "未列出"
    : locale === "ko"
      ? "미기재"
      : "Not listed";
}

function formatRestriction(
  locale: ContentLocale,
  values: readonly string[],
) {
  if (values.length) return values.join(" / ");
  return locale === "zh-hant"
    ? "官方回應未列出"
    : locale === "ko"
      ? "공식 응답에 미기재"
      : "Not listed by the official response";
}

function formatStatValue(
  stat: ItemDatabaseRecord["mainStats"][number],
) {
  if (stat.minValue !== null && stat.value !== null) {
    return `${stat.minValue}–${stat.value}`;
  }
  return stat.value ?? stat.minValue ?? "—";
}

function getOfficialFieldBullets(
  item: ItemDatabaseRecord,
  locale: ContentLocale,
) {
  const itemLevel = formatNullableNumber(locale, item.itemLevel);
  const equipLevel = formatNullableNumber(locale, item.equipLevel);
  const races = formatRestriction(locale, item.raceNames[locale]);
  const classes = formatRestriction(locale, item.classNames[locale]);
  const acquisition =
    item.acquisition?.[locale] ??
    (locale === "zh-hant"
      ? "官方回應未列出"
      : locale === "ko"
        ? "공식 응답에 미기재"
        : "Not listed by the official response");
  const statSummary = item.mainStats.length
    ? item.mainStats
        .map(
          (stat) =>
            `${stat.names[locale]} ${formatStatValue(stat)}`,
        )
        .join(" · ")
    : locale === "zh-hant"
      ? "官方回應未列出"
      : locale === "ko"
        ? "공식 응답에 미기재"
        : "Not listed by the official response";

  if (locale === "zh-hant") {
    return [
      `識別：ID ${item.id} · ${item.gradeNames[locale]} · ${item.categoryNames[locale]} · 記錄類型 ${item.itemType ?? "未列出"}`,
      `等級：物品等級 ${itemLevel} · 需求等級 ${equipLevel}`,
      `限制：種族 ${races} · 職業 ${classes}`,
      `保管與交易：可保管 ${formatNullableBoolean(locale, item.flags.storable)} · 可交易 ${formatNullableBoolean(locale, item.flags.tradable)} · 可個人交易 ${formatNullableBoolean(locale, item.flags.personalTradable)}`,
      `強化與分解：可強化 ${formatNullableBoolean(locale, item.flags.enchantable)} · 一般強化上限 ${formatNullableNumber(locale, item.maxEnchantLevel)} · 超越強化上限 ${formatNullableNumber(locale, item.maxExceedEnchantLevel)} · 可分解 ${formatNullableBoolean(locale, item.flags.decomposable)}`,
      `插槽：魔石 ${formatNullableNumber(locale, item.magicStoneSlots)} · 神石 ${formatNullableNumber(locale, item.godStoneSlots)}`,
      `主要能力：${statSummary}`,
      `官方取得來源標籤：${acquisition}`,
    ];
  }

  if (locale === "ko") {
    return [
      `식별: ID ${item.id} · ${item.gradeNames[locale]} · ${item.categoryNames[locale]} · 기록 유형 ${item.itemType ?? "미기재"}`,
      `레벨: 아이템 레벨 ${itemLevel} · 요구 레벨 ${equipLevel}`,
      `제한: 종족 ${races} · 직업 ${classes}`,
      `보관·거래: 보관 ${formatNullableBoolean(locale, item.flags.storable)} · 거래 ${formatNullableBoolean(locale, item.flags.tradable)} · 개인 거래 ${formatNullableBoolean(locale, item.flags.personalTradable)}`,
      `강화·분해: 강화 ${formatNullableBoolean(locale, item.flags.enchantable)} · 일반 강화 상한 ${formatNullableNumber(locale, item.maxEnchantLevel)} · 초월 강화 상한 ${formatNullableNumber(locale, item.maxExceedEnchantLevel)} · 분해 ${formatNullableBoolean(locale, item.flags.decomposable)}`,
      `슬롯: 마석 ${formatNullableNumber(locale, item.magicStoneSlots)} · 신석 ${formatNullableNumber(locale, item.godStoneSlots)}`,
      `주요 능력치: ${statSummary}`,
      `공식 획득처 태그: ${acquisition}`,
    ];
  }

  return [
    `Identity: ID ${item.id} · ${item.gradeNames[locale]} · ${item.categoryNames[locale]} · record type ${item.itemType ?? "Not listed"}`,
    `Levels: item level ${itemLevel} · required level ${equipLevel}`,
    `Restrictions: race ${races} · class ${classes}`,
    `Storage and trade: storable ${formatNullableBoolean(locale, item.flags.storable)} · tradable ${formatNullableBoolean(locale, item.flags.tradable)} · personal trade ${formatNullableBoolean(locale, item.flags.personalTradable)}`,
    `Enhancement and dismantling: enchantable ${formatNullableBoolean(locale, item.flags.enchantable)} · normal cap ${formatNullableNumber(locale, item.maxEnchantLevel)} · exceed cap ${formatNullableNumber(locale, item.maxExceedEnchantLevel)} · decomposable ${formatNullableBoolean(locale, item.flags.decomposable)}`,
    `Sockets: Manastone ${formatNullableNumber(locale, item.magicStoneSlots)} · Theostone ${formatNullableNumber(locale, item.godStoneSlots)}`,
    `Main stats: ${statSummary}`,
    `Official acquisition tags: ${acquisition}`,
  ];
}

function getItemRelations(item: ItemDatabaseRecord): readonly ContentRelation[] {
  const sameCategoryItems: ContentRelation[] = itemDatabaseRecords
    .filter(
      (candidate) =>
        candidate.id !== item.id &&
        candidate.categoryNames.en === item.categoryNames.en,
    )
    .slice(0, 3)
    .map((candidate) => ({
      kind: "content",
      section: "database",
      slug: candidate.slug,
    }));

  if (item.id === "110130039") {
    return [
      ...sameCategoryItems,
      { kind: "content", section: "guides", slug: "soul-imprint" },
      { kind: "content", section: "guides", slug: "godstone-imprint" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
    ];
  }
  if (item.categoryNames.en === "Theostone") {
    return [
      ...sameCategoryItems,
      { kind: "content", section: "guides", slug: "godstone-imprint" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
    ];
  }
  if (item.categoryNames.en === "Manastone/Soulstone") {
    return [
      ...sameCategoryItems,
      { kind: "content", section: "guides", slug: "equipment-tuning" },
      { kind: "content", section: "guides", slug: "soul-imprint" },
    ];
  }
  if (item.categoryNames.en === "Gathering Material") {
    return [
      ...sameCategoryItems,
      { kind: "content", section: "guides", slug: "aether-extraction" },
      {
        kind: "content",
        section: "guides",
        slug: "crafting-and-transfer-crafting",
      },
    ];
  }
  if (item.categoryNames.en === "Crafting Material") {
    return [
      ...sameCategoryItems,
      {
        kind: "content",
        section: "guides",
        slug: "crafting-and-transfer-crafting",
      },
      { kind: "content", section: "guides", slug: "aether-extraction" },
    ];
  }
  return [
    ...sameCategoryItems,
    { kind: "content", section: "guides", slug: "wing-enhancement" },
    { kind: "content", section: "guides", slug: "equipment-tuning" },
  ];
}

function getItemSources(item: ItemDatabaseRecord): readonly ContentSource[] {
  return [
    {
      id: `nc-aion2-item-${item.id}-tw`,
      kind: "official",
      publisher: "NCSOFT",
      label: `${item.names["zh-hant"]} — AION2 Taiwan official item page`,
      url: item.officialUrls["zh-hant"],
      retrievedAt: SNAPSHOT_DATE,
      verifiedAt: SNAPSHOT_DATE,
    },
    {
      id: `nc-aion2-item-${item.id}-kr`,
      kind: "official",
      publisher: "NCSOFT",
      label: `${item.names.ko} — AION2 Korea official item page`,
      url: item.officialUrls.ko,
      retrievedAt: SNAPSHOT_DATE,
      verifiedAt: SNAPSHOT_DATE,
    },
    {
      id: `nc-aion2-item-${item.id}-en`,
      kind: "official",
      publisher: "PLAYNC",
      label: `${item.names.en} — official AION2 en-US dictionary result`,
      url: item.officialUrls.en,
      retrievedAt: SNAPSHOT_DATE,
      verifiedAt: SNAPSHOT_DATE,
    },
  ];
}

function getLocalizedTitle(item: ItemDatabaseRecord, locale: ContentLocale) {
  if (locale === "zh-hant") {
    return `AION2 ${item.names[locale]} 物品資料｜ID ${item.id}`;
  }
  if (locale === "ko") {
    return `AION2 ${item.names[locale]} 아이템 정보 · ID ${item.id}`;
  }
  return `${item.names[locale]} — AION2 item ID ${item.id}`;
}

function getLocalizedDescription(
  item: ItemDatabaseRecord,
  locale: ContentLocale,
) {
  if (locale === "zh-hant") {
    return `已核對的 AION2 ${item.names[locale]}（ID ${item.id}）資料：官方品級、分類、等級、限制、交易狀態、能力與取得來源。`;
  }
  if (locale === "ko") {
    return `AION2 ${item.names[locale]}(ID ${item.id})의 공식 등급, 분류, 레벨, 제한, 거래 여부, 능력치와 획득처를 확인합니다.`;
  }
  return `Verified AION2 record for ${item.names[locale]} (ID ${item.id}): official grade, category, level, restrictions, trade flags, stats, and source tags.`;
}

function getLocalizedIntro(item: ItemDatabaseRecord, locale: ContentLocale) {
  if (locale === "zh-hant") {
    return `本頁以官方物品 ID ${item.id} 為主鍵，對照 NC 台灣、韓國物品頁與 en-US 字典，整理 ${item.names[locale]} 的可驗證欄位。`;
  }
  if (locale === "ko") {
    return `이 페이지는 공식 아이템 ID ${item.id}를 기준으로 NC 한국·대만 아이템 페이지와 en-US 사전을 대조해 ${item.names[locale]}의 검증 가능한 필드를 정리합니다.`;
  }
  return `This record uses official item ID ${item.id} as its key and cross-checks NC's Taiwan and Korea item pages with the en-US dictionary for ${item.names[locale]}.`;
}

function getLocalizedItemContent(
  item: ItemDatabaseRecord,
  locale: ContentLocale,
): LocalizedContent {
  const copy = commonEditorialCopy[locale];
  const officialParagraphs = [
    item.descriptions?.[locale] ?? copy.noDescription,
    ...(item.effects ? [item.effects[locale]] : []),
  ];

  return {
    eyebrow: copy.eyebrow,
    title: getLocalizedTitle(item, locale),
    description: getLocalizedDescription(item, locale),
    intro: getLocalizedIntro(item, locale),
    byline: copy.byline,
    backLabel: copy.backLabel,
    contentsLabel: copy.contentsLabel,
    publishedLabel: copy.publishedLabel,
    updatedLabel: copy.updatedLabel,
    readingTime: copy.readingTime,
    relatedLabel: copy.relatedLabel,
    sourceNote: copy.sourceNote,
    keywords: [
      "AION2",
      item.names[locale],
      item.names.en,
      item.id,
      item.categoryNames[locale],
    ],
    sections: [
      {
        id: "official-description",
        title: copy.officialTitle,
        paragraphs: officialParagraphs,
      },
      {
        id: "verified-fields",
        title: copy.fieldsTitle,
        paragraphs: [copy.fieldsIntro],
        bullets: getOfficialFieldBullets(item, locale),
      },
      {
        id: "data-boundary",
        title: copy.boundaryTitle,
        paragraphs: [copy.acquisitionBoundary, copy.editorialBoundary],
      },
    ],
  };
}

function makeItemContentEntry(item: ItemDatabaseRecord): ContentEntry {
  return {
    section: "database",
    slug: item.slug,
    schemaType: "TechArticle",
    publishedAt: SNAPSHOT_DATE,
    updatedAt: EDITORIAL_UPDATED_DATE,
    readingMinutes: 3,
    publication: publishedVerified,
    sources: getItemSources(item),
    heroImage: {
      src: item.icon,
      width: 256,
      height: 256,
      credit: "NCSOFT / AION2 official game data",
      sourceUrl: item.officialUrls["zh-hant"],
      rights: "linked-official-media",
      translations: {
        "zh-hant": {
          alt: `${item.names["zh-hant"]} 官方物品圖示`,
          caption: `${item.names["zh-hant"]} 的 AION2 官方物品圖示。`,
        },
        en: {
          alt: `${item.names.en} official item icon`,
          caption: `Official AION2 item icon for ${item.names.en}.`,
        },
        ko: {
          alt: `${item.names.ko} 공식 아이템 아이콘`,
          caption: `${item.names.ko}의 AION2 공식 아이템 아이콘입니다.`,
        },
      },
    },
    properties: {
      item,
    },
    related: getItemRelations(item),
    translations: {
      "zh-hant": getLocalizedItemContent(item, "zh-hant"),
      en: getLocalizedItemContent(item, "en"),
      ko: getLocalizedItemContent(item, "ko"),
    },
  };
}

export const itemDatabaseContentEntries = itemDatabaseRecords.map(
  makeItemContentEntry,
) satisfies readonly ContentEntry[];
