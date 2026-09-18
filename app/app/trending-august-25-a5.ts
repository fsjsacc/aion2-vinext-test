import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-25-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "plaync-gear-2026-08-25", kind: "official", publisher: "NCSOFT", label: "AION 2 Official Item Database", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-25", verifiedAt: "2026-08-25", localizations: localizations({ "zh-hans": "AION 2 官方物品数据库", en: "AION 2 Official Item Database", fr: "Base de données officielle des objets d'AION 2", de: "AION 2 Offizielle Gegenstandsdatenbank", es: "Base de datos oficial de objetos de AION 2", ja: "AION 2 公式アイテムデータベース", "pt-br": "Banco de dados oficial de itens do AION 2", ru: "Официальная база предметов AION 2", ko: "AION 2 공식 아이템 데이터베이스", "zh-hant": "AION 2 官方物品資料庫", }, "https://aion2.plaync.com/"), };
const source2: ContentSource = { id: "aion2hub-gear-2026-08-25", kind: "third-party", publisher: "AION2Hub", label: "Aion 2 Gear Progression Guide", url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-25", verifiedAt: "2026-08-25", localizations: localizations({ "zh-hans": "Aion 2 装备成长指南", en: "Aion 2 Gear Progression Guide", fr: "Guide de progression d'équipement Aion 2", de: "Aion 2 Ausrüstungsfortschritts-Guide", es: "Guía de progresión de equipo de Aion 2", ja: "Aion 2 装備進行ガイド", "pt-br": "Guia de progressão de equipamento de Aion 2", ru: "Руководство по прогрессии экипировки Aion 2", ko: "Aion 2 장비 진행 가이드", "zh-hant": "Aion 2 裝備成長指南", }, "https://aion2hub.com/"), };
const source3: ContentSource = { id: "aion2base-gear-2026-08-25", kind: "third-party", publisher: "Aion2Base", label: "Aion 2 Endgame Gear Guide", url: "https://aion2base.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-25", verifiedAt: "2026-08-25", localizations: localizations({ "zh-hans": "Aion 2 终局装备指南", en: "Aion 2 Endgame Gear Guide", fr: "Guide de l'équipement de fin de jeu d'Aion 2", de: "Aion 2 Endgame-Ausrüstungs-Guide", es: "Guía de equipo de fin de juego de Aion 2", ja: "Aion 2 エンドゲーム装備ガイド", "pt-br": "Guia de equipamento de fim de jogo de Aion 2", ru: "Гайд по экипировке эндгейма Aion 2", ko: "Aion 2 엔드게임 장비 가이드", "zh-hant": "Aion 2 終局裝備指南", }, "https://aion2base.com/"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "终局装备指南配图", caption: "NC 官方配图；AION 2 装备系统。" }, en: { alt: "Endgame gear guide image", caption: "Official NC artwork; AION 2 gear system." }, fr: { alt: "Image du guide d'équipement de fin de jeu", caption: "Visuel officiel NC ; système d'équipement d'AION 2." }, de: { alt: "Endgame-Ausrüstungs-Guide-Bild", caption: "Offizielles NC-Artwork; AION 2 Ausrüstungssystem." }, es: { alt: "Imagen de la guía de equipo de fin de juego", caption: "Arte oficial de NC; sistema de equipo de AION 2." }, ja: { alt: "エンドゲーム装備ガイド画像", caption: "NC公式アートワーク；AION 2 装備システム。" }, "pt-br": { alt: "Imagem do guia de equipamento de fim de jogo", caption: "Arte oficial da NC; sistema de equipamento do AION 2." }, ru: { alt: "Изображение гайда по экипировке эндгейма", caption: "Официальный арт NC; система экипировки AION 2." }, ko: { alt: "엔드게임 장비 가이드 이미지", caption: "NC 공식 이미지; AION 2 장비 시스템." }, "zh-hant": { alt: "終局裝備指南配圖", caption: "NC 官方配圖；AION 2 裝備系統。" }, }, };

export const trendingAugust25Article5: ContentEntry = {
  section: "guides", slug: "aion-2-endgame-gear-guide", schemaType: "Article",
  publishedAt: "2026-08-25", updatedAt: "2026-08-25", readingMinutes: 6,
  publication: publishedVerified,
  sources: [source1, source2, source3],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-gear-enhancement-guide" },
    { kind: "content", section: "guides", slug: "draconic-abyss-gear-august-2026" },
    { kind: "content", section: "guides", slug: "aion-2-solo-player-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "ENDGAME GEAR GUIDE", title: "AION 2 Endgame Gear: Ultimate Weapons, Armor Sets & Enhancement", description: "Complete guide to AION 2 endgame gear progression. Learn about ultimate weapons, armor sets, enhancement systems, and the best gear paths for each class.", intro: "Reaching the level cap in AION 2 is just the beginning. The endgame gear system offers multiple paths to power, from crafted sets to raid drops, with an enhancement system that can push your gear to its limits. This guide covers everything you need to know about endgame gear.", sourceNote: "Based on the official NCSoft item database, AION2Hub's gear progression guide, and Aion2Base's endgame coverage.", keywords: ["Aion 2 endgame gear", "Aion 2 ultimate weapons", "Aion 2 armor sets", "Aion 2 gear enhancement", "Aion 2 endgame progression"],
      sections: [
        section("gear-tiers", "Gear Tiers & Progression Path", ["AION 2's endgame gear is organized into tiers. The base endgame gear is obtained through level 50 quests and open-world content. The first upgrade tier comes from the Abyss PvPvE zone, offering gear with both PvE and PvP stats.", "The second tier comes from instanced dungeons and expeditions. These are the first group-content gear sets and offer significant stat improvements. Each dungeon has a specific gear slot drop, so you will need to run multiple dungeons to complete a set.", "The highest tier of gear comes from raids and the enhancement system. Raid gear has unique set bonuses that cannot be obtained elsewhere. The enhancement system allows you to upgrade existing gear to higher tiers, making it competitive with raid drops."]),
        section("weapon-systems", "Ultimate Weapons & Weapon Types", ["Each class in AION 2 has access to multiple weapon types. The weapon you choose affects your available skills and combat style. Endgame weapons come in several varieties: crafted weapons with customizable stats, dungeon weapons with set bonuses, and raid weapons with unique effects.", "The enhancement system for weapons is called 'Enchanting.' Weapons can be enchanted up to +15, with each level providing a significant stat boost. Enchanting materials are obtained from disenchanting unwanted gear, completing daily quests, and opening world chests.", "Ultimate weapons are the highest tier of weapons in the game. They require rare materials from multiple sources, including raid bosses, high-level crafting, and the Abyss. Ultimate weapons have unique visual effects and are a major prestige symbol."]),
        section("armor-sets", "Armor Sets & Set Bonuses", ["Armor in AION 2 is divided into five slots: head, chest, legs, gloves, and boots. Each slot can be obtained from different sources. Complete armor sets provide additional set bonuses when multiple pieces are equipped.", "The Abyss gear set provides balanced stats suitable for both PvE and PvP. The dungeon gear sets are specialized for PvE with higher damage reduction and threat generation. The raid gear sets offer the highest stats and unique set bonuses that can define your role in a group.", "Crafted armor sets offer customization options. You can choose which stats to prioritize, making crafted gear ideal for min-maxing specific builds. The crafting system allows you to add socket slots for additional stat gems."]),
        section("enhancement-enchanting", "Enhancement & Enchanting System", ["The enhancement system in AION 2 has two main components: Enchanting and Socketing. Enchanting increases the base stats of your gear up to +15. Each level requires more materials and has a success rate that decreases at higher levels.", "Socketing allows you to add gems to your gear for additional stats. Gems come in various types — attack, defense, support, and utility. Higher-level gems provide better stats and can be upgraded by combining multiple lower-level gems.", "The endgame enhancement loop works as follows: run dungeons for gear drops, disenchant unwanted gear for enchanting materials, enchant your best gear, add sockets for gems, and repeat with higher-tier content."]),
        section("class-specific-gear", "Class-Specific Gear Recommendations", ["Tanks should prioritize armor with threat generation and damage reduction. The Abyss heavy armor set is an excellent starting point, with the raid tank set as the ultimate goal. Enchanting defensive stats first provides the most benefit for group content.", "DPS classes should focus on weapons first, then armor. The weapon enchantment level provides the largest single damage increase. For armor, prioritize pieces with critical strike and attack power. The dungeon DPS set offers excellent offensive stats.", "Healers and support classes need a balance of healing power and survivability. The crafted gear set is particularly good for healers because it allows you to customize your stat distribution. Prioritize enchantments that increase healing output and mana regeneration."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "终局装备指南", title: "AION 2 终局装备：终极武器、防具套装与强化", description: "完整的 AION 2 终局装备成长指南。了解终极武器、防具套装、强化系统。", intro: "达到等级上限只是开始。终局装备系统提供了多种成长路径。", sourceNote: "基于 NCSoft 官方物品数据库、AION2Hub 的装备成长指南和 Aion2Base 的终局内容。", keywords: ["Aion 2 终局装备", "Aion 2 终极武器", "Aion 2 防具套装", "Aion 2 装备强化"],
      sections: [
        section("gear-tiers", "装备等级与成长路径", ["AION 2 的终局装备按等级组织。基础终局装备通过 50 级任务和开放世界内容获得。", "第二等级来自副本和远征。最高等级来自团队副本和强化系统。"]),
        section("weapon-systems", "终极武器与武器类型", ["每个职业可以使用多种武器类型。武器强化系统称为'附魔'，最高可达 +15。", "终极武器是游戏中最高的武器等级，需要稀有材料制作。"]),
        section("armor-sets", "防具套装与套装加成", ["防具分为五个部位：头、胸、腿、手、靴。完整套装提供额外套装加成。", "Abyss 装备套装、副本装备套装和团队副本装备套装各有特色。"]),
        section("enhancement-enchanting", "强化与附魔系统", ["强化系统有两个主要组件：附魔和镶嵌。附魔最高 +15，每级需要更多材料。", "镶嵌允许你在装备上添加宝石以获得额外属性。"]),
        section("class-specific-gear", "职业专属装备推荐", ["坦克应优先选择带有威胁生成和伤害减免的装备。DPS 职业应优先武器。", "治疗和辅助职业需要平衡治疗输出和生存能力。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "엔드게임 장비 가이드", title: "AION 2 엔드게임 장비 가이드", description: "AION 2 엔드게임 장비 진행에 대한 완벽한 가이드.", intro: "레벨 상한에 도달하는 것은 시작에 불과합니다.", sourceNote: "NCSoft 공식 아이템 DB, AION2Hub, Aion2Base 기반.", keywords: ["Aion 2 엔드게임 장비", "Aion 2 무기", "Aion 2 방어구"],
      sections: [
        section("gear-tiers", "장비 등급", ["50레벨 퀘스트와 오픈 월드 콘텐츠로 기본 장비 획득.", "인스턴스 던전과 공격대에서 상위 장비 획득."]),
        section("weapon-systems", "무기 시스템", ["각 직업은 여러 무기 유형 사용 가능. 강화는 +15까지 가능.", "궁극의 무기는 희귀 재료 필요."]),
        section("armor-sets", "방어구 세트", ["5개 부위. 완전 세트는 추가 보너스 제공.", "Abyss/던전/공격대 세트 각각 특화."]),
        section("enhancement-enchanting", "강화 시스템", ["인챈트와 소켓 두 가지 구성 요소. +15까지 강화.", "보석을 추가하여 추가 능력치 획득."]),
        section("class-specific-gear", "직업별 장비", ["탱크: 위협 생성. DPS: 무기 우선. 힐러: 치유량."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "エンドゲーム装備ガイド", title: "AION 2 エンドゲーム装備ガイド", description: "AION 2のエンドゲーム装備進行についての完全ガイド。", intro: "レベル上限に達することは始まりに過ぎません。", sourceNote: "NCSoft公式アイテムDB、AION2Hub、Aion2Baseに基づきます。", keywords: ["Aion 2 エンドゲーム装備", "Aion 2 武器", "Aion 2 防具"],
      sections: [
        section("gear-tiers", "装備ティア", ["レベル50クエストとオープンワールドで基本装備。", "インスタンスダンジョンとレイドで上位装備。"]),
        section("weapon-systems", "武器システム", ["各クラスは複数の武器タイプを使用可能。強化+15まで。", "究極武器はレア素材が必要。"]),
        section("armor-sets", "防具セット", ["5部位。完全セットで追加ボーナス。", "Abyss/ダンジョン/レイドセット。"]),
        section("enhancement-enchanting", "強化システム", ["エンチャントとソケットの2要素。+15まで強化。", "ジェムで追加ステータス。"]),
        section("class-specific-gear", "クラス別装備", ["タンク: 脅威生成。DPS: 武器優先。ヒーラー: 回復量。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "GUIDE D'ÉQUIPEMENT", title: "Guide de l'équipement de fin de jeu d'AION 2", description: "Guide complet de la progression d'équipement en fin de jeu.", intro: "Atteindre le niveau maximum n'est que le début.", sourceNote: "Basé sur la base de données officielle NCSoft, AION2Hub et Aion2Base.", keywords: ["Aion 2 équipement fin de jeu", "Aion 2 armes", "Aion 2 armures"],
      sections: [
        section("gear-tiers", "Niveaux d'équipement", ["Équipement de base via quêtes niveau 50 et monde ouvert.", "Équipement supérieur via donjons et raids."]),
        section("weapon-systems", "Armes", ["Chaque classe a plusieurs types d'armes. Enchantement jusqu'à +15.", "Armes ultimes nécessitant des matériaux rares."]),
        section("armor-sets", "Ensembles d'armure", ["5 pièces. Bonus d'ensemble complets. Abyss/donjon/raid."]),
        section("enhancement-enchanting", "Amélioration", ["Enchantement et sertissage. Jusqu'à +15."]),
        section("class-specific-gear", "Équipement par classe", ["Tank: menace. DPS: arme prioritaire. Soigneur: soins."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "ENDGAME-AUSRÜSTUNG", title: "AION 2 Endgame-Ausrüstungs-Guide", description: "Vollständiger Guide zur Endgame-Ausrüstungsprogression.", intro: "Das Erreichen der Stufenobergrenze ist erst der Anfang.", sourceNote: "Basierend auf der offiziellen NCSoft-Datenbank, AION2Hub und Aion2Base.", keywords: ["Aion 2 Endgame Ausrüstung", "Aion 2 Waffen", "Aion 2 Rüstungen"],
      sections: [
        section("gear-tiers", "Ausrüstungsstufen", ["Basisausrüstung durch Stufe-50-Quests und offene Welt.", "Höhere Ausrüstung durch Dungeons und Raids."]),
        section("weapon-systems", "Waffensystem", ["Jede Klasse hat mehrere Waffentypen. Verzauberung bis +15."]),
        section("armor-sets", "Rüstungssets", ["5 Teile. Komplette Sets geben Bonus. Abyss/Dungeon/Raid."]),
        section("enhancement-enchanting", "Verbesserung", ["Verzauberung und Sockel. Bis zu +15."]),
        section("class-specific-gear", "Klassenausrüstung", ["Tank: Bedrohung. DPS: Waffe priorisiert. Heiler: Heilung."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "GUÍA DE EQUIPO", title: "Guía de equipo de fin de juego de AION 2", description: "Guía completa de progresión de equipo en el fin de juego.", intro: "Alcanzar el límite de nivel es solo el comienzo.", sourceNote: "Basado en la base de datos oficial de NCSoft, AION2Hub y Aion2Base.", keywords: ["Aion 2 equipo fin de juego", "Aion 2 armas", "Aion 2 armaduras"],
      sections: [
        section("gear-tiers", "Niveles de equipo", ["Equipo base mediante misiones de nivel 50 y mundo abierto.", "Equipo superior mediante mazmorras y incursiones."]),
        section("weapon-systems", "Armas", ["Cada clase tiene múltiples tipos de arma. Encantamiento hasta +15."]),
        section("armor-sets", "Conjuntos de armadura", ["5 piezas. Conjuntos completos dan bonificaciones."]),
        section("enhancement-enchanting", "Mejora", ["Encantamiento y engaste. Hasta +15."]),
        section("class-specific-gear", "Equipo por clase", ["Tanque: amenaza. DPS: arma prioritaria. Sanador: curación."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "GUIA DE EQUIPAMENTO", title: "Guia de equipamento de fim de jogo do AION 2", description: "Guia completo de progressão de equipamento no fim de jogo.", intro: "Alcançar o limite de nível é apenas o começo.", sourceNote: "Baseado no banco de dados oficial NCSoft, AION2Hub e Aion2Base.", keywords: ["Aion 2 equipamento fim de jogo", "Aion 2 armas", "Aion 2 armaduras"],
      sections: [
        section("gear-tiers", "Níveis de equipamento", ["Equipamento base por missões nível 50 e mundo aberto.", "Equipamento superior por masmorras e raides."]),
        section("weapon-systems", "Armas", ["Cada classe tem múltiplos tipos de arma. Encantamento até +15."]),
        section("armor-sets", "Conjuntos de armadura", ["5 peças. Conjuntos completos dão bônus."]),
        section("enhancement-enchanting", "Melhoria", ["Encantamento e engaste. Até +15."]),
        section("class-specific-gear", "Equipamento por classe", ["Tanque: ameaça. DPS: arma prioritária. Curador: cura."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "ГАЙД ПО ЭКИПИРОВКЕ", title: "Гайд по экипировке эндгейма AION 2", description: "Полное руководство по прогрессии экипировки в эндгейме.", intro: "Достижение максимального уровня — это только начало.", sourceNote: "Основано на официальной базе NCSoft, AION2Hub и Aion2Base.", keywords: ["Aion 2 эндгейм экипировка", "Aion 2 оружие", "Aion 2 броня"],
      sections: [
        section("gear-tiers", "Уровни экипировки", ["Базовая экипировка через квесты 50 уровня и открытый мир.", "Высшая экипировка через подземелья и рейды."]),
        section("weapon-systems", "Оружие", ["Каждый класс имеет несколько типов оружия. Зачарование до +15."]),
        section("armor-sets", "Наборы брони", ["5 частей. Полные наборы дают бонусы."]),
        section("enhancement-enchanting", "Улучшение", ["Зачарование и вставка камней. До +15."]),
        section("class-specific-gear", "Экипировка по классам", ["Танк: угроза. ДПС: оружие приоритет. Хилер: лечение."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "終局裝備指南", title: "AION 2 終局裝備指南", description: "完整的 AION 2 終局裝備成長指南。", intro: "達到等級上限只是開始。", sourceNote: "基於 NCSoft 官方物品資料庫、AION2Hub 和 Aion2Base。", keywords: ["Aion 2 終局裝備", "Aion 2 武器", "Aion 2 防具"],
      sections: [
        section("gear-tiers", "裝備等級", ["50 級任務和開放世界獲得基礎裝備。", "副本和團隊副本獲得高級裝備。"]),
        section("weapon-systems", "武器系統", ["每個職業可使用多種武器類型。強化最高 +15。"]),
        section("armor-sets", "防具套裝", ["5 個部位。完整套裝提供加成。"]),
        section("enhancement-enchanting", "強化系統", ["附魔和鑲嵌。最高 +15。"]),
        section("class-specific-gear", "職業裝備", ["坦克：威脅。DPS：武器優先。治療：治療量。"]),
      ],
    }),
  },
};