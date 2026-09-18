import type { SiteLocale } from "./site-config";

export type DatabaseTypeId = "items" | "skills" | "titles";

type LiveDatabaseType = {
  id: DatabaseTypeId;
  status: "live";
  href: string;
};

type PlannedDatabaseType = {
  id: DatabaseTypeId;
  status: "planned";
  href?: never;
};

export type DatabaseTypeDefinition = LiveDatabaseType | PlannedDatabaseType;

export const databaseTypeDefinitions = [
  { id: "items", status: "live", href: "/database/" },
  { id: "skills", status: "planned" },
  { id: "titles", status: "planned" },
] as const satisfies readonly DatabaseTypeDefinition[];

type DatabaseTypeNavigationCopy = {
  ariaLabel: string;
  sectionLabel: string;
  types: Record<
    DatabaseTypeId,
    {
      label: string;
      description: string;
    }
  >;
};

export const databaseTypeNavigationCopy = {
  "zh-hans": {
    ariaLabel: "数据库类型",
    sectionLabel: "选择资料类型",
    types: {
      items: { label: "物品", description: "装备、材料、消耗品与强化道具" },
      skills: { label: "技能", description: "职业技能、效果与成长资料" },
      titles: { label: "称号", description: "取得条件、能力加成与收集进度" },
    },
  },
  en: {
    ariaLabel: "Database types",
    sectionLabel: "Choose a data type",
    types: {
      items: { label: "Items", description: "Equipment, materials, consumables, and upgrades" },
      skills: { label: "Skills", description: "Class skills, effects, and progression data" },
      titles: { label: "Titles", description: "Unlock requirements, bonuses, and collection progress" },
    },
  },
  fr: {
    ariaLabel: "Types de données",
    sectionLabel: "Choisir un type de données",
    types: {
      items: { label: "Objets", description: "Équipement, matériaux, consommables et améliorations" },
      skills: { label: "Compétences", description: "Compétences de classe, effets et progression" },
      titles: { label: "Titres", description: "Conditions, bonus et progression de collection" },
    },
  },
  de: {
    ariaLabel: "Datenbankbereiche",
    sectionLabel: "Datentyp auswählen",
    types: {
      items: { label: "Gegenstände", description: "Ausrüstung, Materialien, Verbrauchsgüter und Verbesserungen" },
      skills: { label: "Fertigkeiten", description: "Klassenfertigkeiten, Effekte und Fortschrittsdaten" },
      titles: { label: "Titel", description: "Freischaltungen, Boni und Sammlungsfortschritt" },
    },
  },
  es: {
    ariaLabel: "Tipos de datos",
    sectionLabel: "Elige un tipo de datos",
    types: {
      items: { label: "Objetos", description: "Equipo, materiales, consumibles y mejoras" },
      skills: { label: "Habilidades", description: "Habilidades de clase, efectos y progresión" },
      titles: { label: "Títulos", description: "Requisitos, bonificaciones y progreso de colección" },
    },
  },
  ja: {
    ariaLabel: "データベースの種類",
    sectionLabel: "データの種類を選択",
    types: {
      items: { label: "アイテム", description: "装備、素材、消耗品、強化アイテム" },
      skills: { label: "スキル", description: "クラススキル、効果、成長データ" },
      titles: { label: "タイトル", description: "獲得条件、ボーナス、収集進捗" },
    },
  },
  "pt-br": {
    ariaLabel: "Tipos de dados",
    sectionLabel: "Escolha um tipo de dado",
    types: {
      items: { label: "Itens", description: "Equipamentos, materiais, consumíveis e melhorias" },
      skills: { label: "Habilidades", description: "Habilidades de classe, efeitos e progressão" },
      titles: { label: "Títulos", description: "Requisitos, bônus e progresso de coleção" },
    },
  },
  ru: {
    ariaLabel: "Разделы базы данных",
    sectionLabel: "Выберите тип данных",
    types: {
      items: { label: "Предметы", description: "Снаряжение, материалы, расходники и улучшения" },
      skills: { label: "Умения", description: "Умения классов, эффекты и развитие" },
      titles: { label: "Титулы", description: "Условия получения, бонусы и прогресс коллекции" },
    },
  },
  ko: {
    ariaLabel: "데이터베이스 유형",
    sectionLabel: "자료 유형 선택",
    types: {
      items: { label: "아이템", description: "장비, 재료, 소모품과 강화 아이템" },
      skills: { label: "스킬", description: "직업 스킬, 효과와 성장 자료" },
      titles: { label: "타이틀", description: "획득 조건, 능력치 보너스와 수집 진행도" },
    },
  },
  "zh-hant": {
    ariaLabel: "資料庫類型",
    sectionLabel: "選擇資料類型",
    types: {
      items: { label: "物品", description: "裝備、材料、消耗品與強化道具" },
      skills: { label: "技能", description: "職業技能、效果與成長資料" },
      titles: { label: "稱號", description: "取得條件、能力加成與收藏進度" },
    },
  },
} as const satisfies Record<SiteLocale, DatabaseTypeNavigationCopy>;

export type DatabaseClassId =
  | "gladiator"
  | "templar"
  | "assassin"
  | "ranger"
  | "sorcerer"
  | "spiritmaster"
  | "cleric"
  | "chanter"
  | "brawler";

export const databaseClassDefinitions = [
  {
    id: "gladiator",
    labels: {
      "zh-hans": "剑星", en: "Gladiator", fr: "Gladiateur", de: "Gladiator",
      es: "Gladiador", ja: "グラディエーター", "pt-br": "Gladiador",
      ru: "Гладиатор", ko: "검성", "zh-hant": "劍星",
    },
  },
  {
    id: "templar",
    labels: {
      "zh-hans": "守护星", en: "Templar", fr: "Templier", de: "Templer",
      es: "Templario", ja: "テンプラー", "pt-br": "Templário",
      ru: "Страж", ko: "수호성", "zh-hant": "守護星",
    },
  },
  {
    id: "assassin",
    labels: {
      "zh-hans": "杀星", en: "Assassin", fr: "Assassin", de: "Assassine",
      es: "Asesino", ja: "アサシン", "pt-br": "Assassino",
      ru: "Убийца", ko: "살성", "zh-hant": "殺星",
    },
  },
  {
    id: "ranger",
    labels: {
      "zh-hans": "弓星", en: "Ranger", fr: "Rôdeur", de: "Jäger",
      es: "Arquero", ja: "レンジャー", "pt-br": "Patrulheiro",
      ru: "Стрелок", ko: "궁성", "zh-hant": "弓星",
    },
  },
  {
    id: "sorcerer",
    labels: {
      "zh-hans": "魔道星", en: "Sorcerer", fr: "Sorcier", de: "Zauberer",
      es: "Hechicero", ja: "ソーサラー", "pt-br": "Feiticeiro",
      ru: "Волшебник", ko: "마도성", "zh-hant": "魔道星",
    },
  },
  {
    id: "spiritmaster",
    labels: {
      "zh-hans": "精灵星", en: "Spiritmaster", fr: "Spiritualiste", de: "Beschwörer",
      es: "Maestro espiritual", ja: "スピリットマスター", "pt-br": "Mestre espiritual",
      ru: "Заклинатель", ko: "정령성", "zh-hant": "精靈星",
    },
  },
  {
    id: "cleric",
    labels: {
      "zh-hans": "治愈星", en: "Cleric", fr: "Clerc", de: "Kleriker",
      es: "Clérigo", ja: "クレリック", "pt-br": "Clérigo",
      ru: "Целитель", ko: "치유성", "zh-hant": "治癒星",
    },
  },
  {
    id: "chanter",
    labels: {
      "zh-hans": "护法星", en: "Chanter", fr: "Aède", de: "Kantor",
      es: "Cantor", ja: "チャンター", "pt-br": "Cantor",
      ru: "Чародей", ko: "호법성", "zh-hant": "護法星",
    },
  },
  {
    id: "brawler",
    labels: {
      "zh-hans": "拳星", en: "Brawler", fr: "Combattant", de: "Kämpfer",
      es: "Luchador", ja: "ブロウラー", "pt-br": "Lutador",
      ru: "Боец", ko: "권성", "zh-hant": "拳星",
    },
  },
] as const satisfies ReadonlyArray<{
  id: DatabaseClassId;
  labels: Readonly<Record<SiteLocale, string>>;
}>;
