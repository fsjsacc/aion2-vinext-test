import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "tmp", "editorial-locales");
const outputPath = path.join(
  projectRoot,
  "app",
  "editorial-content-locales.generated.json",
);
const locales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];
const editorialOverrides = {
  "guides/aether-extraction": {
    fr: {
      content: {
        title:
          "AION2 Aether Extraction : niveau 45, jauges de réussite et points de compétence",
        keywords: [
          "AION2 Aether Extraction",
          "récolte AION2",
          "niveau de récolte AION2",
          "matériaux d’artisanat AION2",
          "points de compétence de récolte",
        ],
      },
    },
    es: {
      content: {
        title:
          "AION2 Aether Extraction: nivel 45, medidores de éxito y puntos de habilidad",
        keywords: [
          "AION2 Aether Extraction",
          "recolección AION2",
          "nivel de recolección AION2",
          "materiales de fabricación AION2",
          "puntos de habilidad de recolección",
        ],
      },
    },
    "pt-br": {
      content: {
        title:
          "AION2 Aether Extraction: nível 45, medidores de sucesso e pontos de habilidade",
        keywords: [
          "AION2 Aether Extraction",
          "coleta AION2",
          "nível de coleta AION2",
          "materiais de fabricação AION2",
          "pontos de habilidade de coleta",
        ],
      },
    },
    ru: {
      content: {
        title:
          "Сбор и добыча эфира в AION2: 45-й уровень, шкала успеха и очки навыков",
        keywords: [
          "сбор эфира AION2",
          "добыча эфира AION2",
          "материалы для крафта AION2",
          "уровень сбора AION2",
        ],
      },
    },
  },
  "guides/crafting-and-transfer-crafting": {
    fr: {
      content: {
        title:
          "AION2 Crafting et Transfer Crafting : maîtrise, combos et règles d’héritage",
        keywords: [
          "AION2 Crafting",
          "AION2 Transfer Crafting",
          "maîtrise d’artisanat AION2",
          "combo d’artisanat AION2",
          "règles d’héritage AION2",
        ],
      },
    },
    es: {
      content: {
        title:
          "AION2 Crafting y Transfer Crafting: dominio, combos y reglas de herencia",
        keywords: [
          "AION2 Crafting",
          "AION2 Transfer Crafting",
          "dominio de fabricación AION2",
          "combo de fabricación AION2",
          "reglas de herencia AION2",
        ],
      },
    },
    "pt-br": {
      content: {
        title:
          "AION2 Crafting e Transfer Crafting: proficiência, combos e regras de herança",
        keywords: [
          "AION2 Crafting",
          "AION2 Transfer Crafting",
          "proficiência de fabricação AION2",
          "combo de fabricação AION2",
          "regras de herança AION2",
        ],
      },
    },
    ja: {
      content: {
        title:
          "AION2 Crafting／Transfer Crafting：熟練度、コンボ、継承ルール",
        keywords: [
          "AION2 Crafting",
          "AION2 Transfer Crafting",
          "AION2 製作熟練度",
          "AION2 コンボ製作",
          "AION2 継承ルール",
        ],
      },
    },
  },
  "guides/wing-enhancement": {
    fr: {
      content: {
        title:
          "Amélioration des ailes dans AION2 : limite +10, matériaux et taux de réussite",
        keywords: [
          "amélioration des ailes AION2",
          "ailes +10 AION2",
          "matériaux d’amélioration des ailes",
          "taux de réussite AION2",
        ],
      },
    },
    es: {
      content: {
        title:
          "Mejora de alas en AION2: límite +10, materiales y tasa de éxito",
        keywords: [
          "mejora de alas AION2",
          "alas +10 AION2",
          "materiales para mejorar alas",
          "tasa de éxito AION2",
        ],
      },
    },
    "pt-br": {
      content: {
        title:
          "Aprimoramento de asas em AION2: limite +10, materiais e taxa de sucesso",
        description:
          "O guia oficial de asas da NC confirma o limite +10, o custo em Kina, Tuning Stone (Unique), Enhancement Stone e uma taxa de sucesso ajustável até 100%.",
        keywords: [
          "aprimoramento de asas AION2",
          "asas +10 AION2",
          "materiais para aprimorar asas",
          "taxa de sucesso AION2",
        ],
      },
    },
    ja: {
      content: {
        title: "AION2 ウイング強化：上限+10、素材、成功率の仕組み",
        keywords: [
          "AION2 ウイング強化",
          "AION2 ウイング +10",
          "ウイング強化素材",
          "AION2 強化成功率",
        ],
      },
    },
  },
  "guides/atool": {
    es: {
      content: {
        title:
          "¿Qué es Atool? Cómo interpretar datos de personajes, rankings y clases",
        keywords: [
          "Atool AION2",
          "personajes AION2",
          "ranking AION2",
          "estadísticas de clase AION2",
        ],
      },
    },
    "pt-br": {
      content: {
        title:
          "O que é o Atool? Como interpretar dados de personagens, rankings e classes",
        keywords: [
          "Atool AION2",
          "personagens AION2",
          "ranking AION2",
          "estatísticas de classe AION2",
        ],
      },
    },
    ru: {
      content: {
        title:
          "Что такое Atool? Как читать данные персонажей, рейтингов и классов",
        description:
          "Atool — сторонний информационный сервис AION2. Узнайте, как правильно читать данные персонажей, рейтинги и статистику классов, а также учитывать задержку обновления и ограничения источника.",
        keywords: [
          "Atool AION2",
          "персонажи AION2",
          "рейтинг AION2",
          "статистика классов AION2",
        ],
      },
    },
  },
  "news/fromis-9-collaboration": {
    fr: {
      content: {
        title:
          "AION2 × fromis_9 : quêtes, cosmétiques, emotes et date limite du 12 août",
        keywords: [
          "AION2 fromis_9",
          "collaboration AION2",
          "quêtes fromis_9",
          "cosmétiques AION2",
          "emotes AION2",
        ],
      },
    },
    es: {
      content: {
        title:
          "AION2 × fromis_9: misiones, cosméticos, gestos y fecha límite del 12 de agosto",
        keywords: [
          "AION2 fromis_9",
          "colaboración AION2",
          "misiones fromis_9",
          "cosméticos AION2",
          "gestos AION2",
        ],
      },
    },
    "pt-br": {
      content: {
        title:
          "AION2 × fromis_9: missões, cosméticos, emotes e prazo de 12 de agosto",
        keywords: [
          "AION2 fromis_9",
          "colaboração AION2",
          "missões fromis_9",
          "cosméticos AION2",
          "emotes AION2",
        ],
      },
    },
    ja: {
      content: {
        title:
          "AION2 × fromis_9：限定クエスト、衣装、エモートと8月12日の終了日",
        description:
          "NCは、8月12日まで実施されるfromis_9コラボについて、限定クエスト、衣装、武器、ウイング、ペット、ダンスエモートを案内しています。",
        keywords: [
          "AION2 fromis_9",
          "AION2 コラボ",
          "LIKE YOU BETTER",
          "fromis_9 クエスト",
          "AION2 イベント",
        ],
      },
    },
  },
  "guides/global-pre-registration": {
    es: {
      content: {
        title:
          "Preinscripción global de AION2: enlace oficial, pasos, recompensas y preguntas frecuentes",
      },
    },
    "pt-br": {
      content: {
        title:
          "Pré-registro global do AION2: link oficial, etapas, recompensas e perguntas frequentes",
      },
    },
    "zh-hans": {
      content: {
        title: "AION2 全球版预注册攻略：官方链接、流程、奖励与常见问题",
        description:
          "通过 NC 官方全球版预注册页面完成 AION2 预注册，查看可用注册方式、活动期限、奖励范围、地区限制与常见问题。",
        keywords: [
          "AION2 全球版预注册",
          "AION2 预注册",
          "AION2 官方链接",
          "AION2 注册奖励",
          "AION2 全球服",
        ],
      },
    },
  },
  "guides/soul-imprint": {
    fr: {
      content: {
        keywords: [
          "AION2 Soul Imprint",
          "Soul Tuning AION2",
          "empreinte d’âme AION2",
          "progression d’âme AION2",
        ],
      },
    },
    es: {
      content: {
        keywords: [
          "AION2 Soul Imprint",
          "Soul Tuning AION2",
          "impronta de alma AION2",
          "progresión del alma AION2",
        ],
      },
    },
    "pt-br": {
      content: {
        keywords: [
          "AION2 Soul Imprint",
          "Soul Tuning AION2",
          "impressão da alma AION2",
          "progressão da alma AION2",
        ],
      },
    },
    ja: {
      content: {
        title:
          "AION2 Soul Imprint：公式確率、リセット、Soul Tuningの仕組み",
        keywords: [
          "AION2 Soul Imprint",
          "AION2 ソウルインプリント",
          "AION2 Soul Tuning",
          "AION2 魂の刻印",
          "AION2 刻印リセット",
        ],
      },
    },
    de: {
      content: {
        title:
          "AION2 Soul Imprint: offizielle Chancen, Reset und Soul Tuning",
        keywords: [
          "AION2 Soul Imprint",
          "AION2 Soul Tuning",
          "Soul Imprint Chancen",
          "Soul Imprint Reset",
          "AION2 Seelenprägung",
        ],
      },
    },
  },
  "guides/arcana": {
    de: {
      content: {
        keywords: [
          "AION2 Arcana",
          "AION2 Arcana Guide",
          "Arcana Scale AION2",
          "Arcana System AION2",
        ],
      },
    },
  },
  "classes/templar": {
    fr: {
      content: {
        title:
          "Guide du Templar AION2 : tank au bouclier, responsabilités et difficulté",
        description:
          "Données officielles sur l’épée longue, le bouclier et le rôle de tank de première ligne du Templar, avec des conseils pour le PvE, le PvP, le RvR, le positionnement et les erreurs fréquentes.",
        keywords: [
          "Templar AION2",
          "guide Templar AION2",
          "tank AION2",
          "difficulté Templar",
          "classe au bouclier AION2",
        ],
      },
    },
    ru: {
      content: {
        title:
          "Гайд по Templar в AION2: танк со щитом, ответственность и сложность",
        keywords: [
          "Templar AION2",
          "гайд Templar AION2",
          "танк AION2",
          "сложность Templar",
          "класс со щитом AION2",
        ],
      },
    },
  },
  "classes/cleric": {
    fr: {
      content: {
        title:
          "Guide du Cleric AION2 : soins principaux, priorités de groupe et difficulté",
        keywords: [
          "Cleric AION2",
          "guide du Cleric",
          "difficulté du Cleric",
          "soigneur AION2",
          "classe de soins AION2",
        ],
      },
    },
  },
  "classes/sorcerer": {
    es: {
      content: {
        description:
          "Datos oficiales sobre el libro de hechizos, el daño mágico explosivo y el control del Sorcerer, además de orientación para PvE, PvP, RvR, posicionamiento durante el lanzamiento, práctica y errores frecuentes.",
      },
    },
  },
  "classes/brawler": {
    es: {
      content: {
        title:
          "Guía del Brawler de AION2: Gauntlets, Rage/Rampage y dificultad",
        keywords: [
          "Brawler AION2",
          "guía Brawler AION2",
          "Gauntlets AION2",
          "Rage Rampage AION2",
          "dificultad Brawler",
        ],
      },
    },
    "pt-br": {
      content: {
        title:
          "Guia do Brawler de AION2: Gauntlets, Rage/Rampage e dificuldade",
        keywords: [
          "Brawler AION2",
          "guia Brawler AION2",
          "Gauntlets AION2",
          "Rage Rampage AION2",
          "dificuldade Brawler",
        ],
      },
    },
  },
  "classes/chanter": {
    ru: {
      content: {
        title:
          "Гайд по Chanter в AION2: мантры, смена ролей и сложность",
        description:
          "Официальные сведения об оружии Chanter, мантрах, контроле и дополнительном лечении, а также рекомендации для PvE, PvP, RvR, позиционирования и групповой игры.",
        keywords: [
          "Chanter AION2",
          "гайд Chanter AION2",
          "мантры AION2",
          "поддержка AION2",
          "сложность Chanter",
        ],
      },
    },
  },
  "guides/system-requirements": {
    fr: {
      content: {
        title:
          "Configuration requise pour AION2 : spécifications minimales et recommandées sur Steam",
        keywords: [
          "configuration requise AION2",
          "AION2 Steam",
          "configuration minimale AION2",
          "configuration recommandée AION2",
        ],
      },
    },
    es: {
      content: {
        title:
          "Requisitos del sistema de AION2: especificaciones mínimas y recomendadas para Steam",
        keywords: [
          "requisitos AION2",
          "AION2 Steam",
          "requisitos mínimos AION2",
          "requisitos recomendados AION2",
        ],
      },
    },
    "pt-br": {
      content: {
        title:
          "Requisitos de sistema do AION2: especificações mínimas e recomendadas para o Steam",
        keywords: [
          "requisitos AION2",
          "AION2 Steam",
          "requisitos mínimos AION2",
          "requisitos recomendados AION2",
        ],
      },
    },
    ja: {
      content: {
        title: "AION2 システム要件：グローバル版Steamの最低・推奨スペック",
        keywords: [
          "AION2 Steam 必要動作環境",
          "AION2 最低スペック",
          "AION2 推奨スペック",
          "AION2 PC",
        ],
      },
    },
  },
  "guides/steam-vs-purple": {
    ja: {
      content: {
        keywords: [
          "AION2 Steam 対 PURPLE",
          "AION2 Steam",
          "AION2 PURPLE",
          "AION2 プラットフォーム比較",
          "AION2 クロスプラットフォーム",
        ],
      },
    },
    de: {
      content: {
        keywords: [
          "AION2 Steam vs. PURPLE",
          "AION2 Steam",
          "AION2 PURPLE",
          "AION2 Plattformvergleich",
          "AION2 Cross-Platform",
        ],
      },
    },
  },
  "guides/deity-traces": {
    ja: {
      content: {
        title:
          "AION2 Empyrean Traces：Daeva Expressで一括完了できる範囲",
        description:
          "Chapter 1の公式案内では、Daeva Expressにより一部のSealed Dungeon、Stronghold、Empyrean Tracesの進行を一括完了できることが確認されています。対象地点と総数は未公表です。",
        keywords: [
          "AION2 Empyrean Traces",
          "AION2 Daeva Express",
          "AION2 Sealed Dungeon",
          "AION2 Stronghold",
        ],
      },
    },
  },
  "database/rampaging-fearsome-aura-weapon-610511036": {
    fr: {
      content: {
        title: "Rampaging Fearsome Aura: Weapon — objet AION2 ID 610511036",
        description:
          "Consultez Rampaging Fearsome Aura: Weapon, objet AION2 ID 610511036, avec sa rareté, sa catégorie, ses attributs et ses sources officielles.",
      },
    },
    es: {
      content: {
        title: "Rampaging Fearsome Aura: Weapon — ítem AION2 ID 610511036",
        description:
          "Consulta Rampaging Fearsome Aura: Weapon, ítem AION2 ID 610511036, con su rareza, categoría, atributos y fuentes oficiales.",
      },
    },
    "pt-br": {
      content: {
        title: "Rampaging Fearsome Aura: Weapon — item AION2 ID 610511036",
        description:
          "Consulte Rampaging Fearsome Aura: Weapon, item AION2 ID 610511036, com raridade, categoria, atributos e fontes oficiais.",
      },
    },
  },
  "database/radiant-yggdrasil-log-610650017": {
    fr: {
      content: {
        title: "Radiant Yggdrasil Log — objet AION2 ID 610650017",
        description:
          "Consultez Radiant Yggdrasil Log, objet AION2 ID 610650017, avec sa rareté, sa catégorie, ses attributs et ses sources officielles.",
      },
    },
    es: {
      content: {
        title: "Radiant Yggdrasil Log — ítem AION2 ID 610650017",
        description:
          "Consulta Radiant Yggdrasil Log, ítem AION2 ID 610650017, con su rareza, categoría, atributos y fuentes oficiales.",
      },
    },
    "pt-br": {
      content: {
        title: "Radiant Yggdrasil Log — item AION2 ID 610650017",
        description:
          "Consulte Radiant Yggdrasil Log, item AION2 ID 610650017, com raridade, categoria, atributos e fontes oficiais.",
      },
    },
  },
  "database/maddened-wrathful-curse-610511019": {
    fr: {
      content: {
        title: "Maddened Wrathful Curse — objet AION2 ID 610511019",
      },
    },
    es: {
      content: {
        title: "Maddened Wrathful Curse — ítem AION2 ID 610511019",
      },
    },
    "pt-br": {
      content: {
        title: "Maddened Wrathful Curse — item AION2 ID 610511019",
      },
    },
    ja: {
      content: {
        title:
          "Maddened Wrathful Curse — AION2 アイテムID 610511019",
        keywords: [
          "AION2",
          "Maddened Wrathful Curse",
          "610511019",
          "AION2 クラフト素材",
        ],
      },
    },
  },
  "database/ancient-aullaeu-wings-512400003": {
    fr: {
      content: {
        title: "Ancient Aullaeu Wings — objet AION2 ID 512400003",
      },
    },
    es: {
      content: {
        title: "Ancient Aullaeu Wings — ítem AION2 ID 512400003",
      },
    },
    "pt-br": {
      content: {
        title: "Ancient Aullaeu Wings — item AION2 ID 512400003",
      },
    },
  },
  "database/intermediate-abyssal-manastone-511351002": {
    fr: {
      content: {
        title:
          "Intermediate Abyssal Manastone — objet AION2 ID 511351002",
      },
    },
    es: {
      content: {
        title:
          "Intermediate Abyssal Manastone — ítem AION2 ID 511351002",
      },
    },
    "pt-br": {
      content: {
        title:
          "Intermediate Abyssal Manastone — item AION2 ID 511351002",
      },
    },
  },
  "news/corroded-decontamination-cross-faction-pve": {
    fr: {
      content: {
        title:
          "Installation de décontamination corrodée : niveau d’objet 3 700 et groupes JcE inter-factions",
      },
    },
    es: {
      content: {
        title:
          "Instalación de descontaminación corroída: nivel de objeto 3.700 y grupos JcE entre facciones",
      },
    },
    "pt-br": {
      content: {
        title:
          "Instalação de Descontaminação Corroída: nível de item 3.700 e grupos PvE entre facções",
      },
    },
  },
  "guides/kinah-bound": {
    "pt-br": {
      content: {
        title:
          "AION2 Kina (Bound): data oficial de introdução e limites das informações disponíveis",
        keywords: [
          "AION2 Kina Bound",
          "Kina vinculada AION2",
          "moeda AION2",
          "data Kina Bound",
        ],
      },
    },
    ja: {
      content: {
        title: "AION2 Kina（Bound）：公式導入日と対象バージョン",
        keywords: [
          "AION2 Kina Bound",
          "AION2 Kina",
          "AION2 通貨",
          "Kina Bound 導入日",
        ],
      },
    },
  },
  "news/global-release-september-2026": {
    ja: {
      content: {
        title: "AION2 グローバル版リリース日：確定情報と未発表項目",
        description:
          "AION2グローバル版の9月30日先行アクセス、対象地域、Steam／PURPLE対応、正式サービス開始日と開始時刻の確認状況を整理します。",
        intro:
          "AION2グローバルPC版は、2026年9月30日から5日間の先行アクセスが予定されています。NCの過去の告知とSteamのメインページは2026年9月という公開時期を示し、Founder’s PackのSteam情報には10月5日が表示されています。ただし、7月24日時点でNCは正式サービス開始日、正確な開始時刻、タイムゾーンをすべての公式チャンネルで統一して発表していません。",
        sourceNote:
          "2026年7月24日、NCのグローバル版告知、先行登録ページ、Steamのメインゲームページ、Founder’s Packページを照合しました。今後の運営告知と各地域ストアの表示が一致するか、公開前に再確認してください。",
        keywords: [
          "AION2 リリース日",
          "AION2 9月30日",
          "AION2 先行アクセス",
          "AION2 グローバルサーバー",
          "AION2 Steam",
        ],
      },
    },
  },
  "guides/abyss-status": {
    ru: {
      content: {
        keywords: [
          "статус Бездны AION2",
          "Бездна AION2",
          "Хаотическая Бездна AION2",
          "Reshanta AION2",
          "PvP AION2",
        ],
      },
    },
    "pt-br": {
      content: {
        description:
          "Os comunicados oficiais de 2026 mostram várias revisões do PvP no Abyss: a 2ª temporada alterou camadas e o equilíbrio de cerco, março adicionou forças Leste/Oeste independentes de raça e julho trouxe uma zona superior caótica com limite de atributos.",
      },
    },
  },
  "guides/godstone-imprint": {
    de: {
      content: {
        description:
          "Der offizielle NC-Katalog bestätigt, dass die Materialqualität eines Godstones den Pool möglicher Ergebnisse bestimmt und die Item-Daten ein Godstone-Imprint-Feld enthalten. Eine allgemeingültige Rangliste oder Auslöserate lässt sich daraus nicht ableiten.",
        intro:
          "Bei Godstone-Fragen müssen drei Punkte getrennt werden: der mögliche Synthese-Pool, die Unterstützung von Godstone Imprint in den Ausrüstungsdaten und die praktische Wirkung im Kampf. Offizielle Quellen bestätigen die ersten beiden Punkte, liefern aber keine vollständigen Auslöseraten, Klassenranglisten oder dauerhafte Best-in-Slot-Antwort.",
      },
    },
  },
  "classes/difficulty-comparison": {
    ja: {
      content: {
        intro:
          "この比較表は「最強クラス」を決めるものではなく、各クラスを習得する際の負担や役割の違いを整理するものです。公式資料で確認できる名称、武器、役割を基礎にし、KINAの難易度・練習量・比較評価は2026年7月18日時点の編集判断として分けて表示します。",
      },
    },
  },
  "news/chalice-of-muspel-sanctuary-update": {
    ja: {
      content: {
        title:
          "AION2 Chalice of Muspelアップデート：アイテムレベル4,500、Transfer Crafting、ウイング強化",
      },
    },
  },
  "news/sunken-temple-100-day-update": {
    ja: {
      content: {
        title:
          "AION2 Sunken Temple of Life：サービス100日記念アップデートとArcana Scale",
        keywords: [
          "AION2 Sunken Temple of Life",
          "AION2 100日記念",
          "AION2 Arcana Scale",
          "AION2 アップデート",
        ],
      },
    },
  },
  "news/cradle-of-nihility-soul-fuse-update": {
    ja: {
      content: {
        title:
          "AION2 Cradle of Nihilityアップデート：Soul FuseとAbyssルール変更",
        description:
          "Cradle of Nihility、Soul Fuse、Abyss Corridorなど、公式アップデートで確認できる主要な追加要素とルール変更を整理します。",
        keywords: [
          "AION2 Cradle of Nihility",
          "AION2 Soul Fuse",
          "AION2 Abyss Corridor",
          "AION2 アップデート",
        ],
      },
    },
  },
  "guides/spacetime-rift": {
    fr: {
      content: {
        publishedLabel: "Publié",
        eyebrow: "HORAIRES OFFICIELS ET CARTES DES RIFTS",
        title: "AION2 Spacetime Rift : horaires et emplacements sur la carte",
        description:
          "Sur le service taïwanais d’AION2, Spacetime Rift suit un cycle de trois heures. Consultez les huit créneaux quotidiens, les règles officielles et les cartes Elyos ou Asmodian filtrées sur les Rifts.",
        intro:
          "Sur le service taïwanais, Spacetime Rift suit chaque jour huit créneaux : 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 et 23:00 (UTC+8). L’annonce de NC indique les quatre premiers horaires et précise que l’activité se répète toutes les trois heures ; les quatre suivants prolongent directement ce cycle. Le calendrier et les alertes affichés en jeu restent prioritaires.",
        sourceNote:
          "Vérifié le 24 juillet 2026 à partir des mises à jour taïwanaises des 3 et 10 décembre, du communiqué de NC, du guide officiel de l’Abyss et de l’avis de matchmaking du 25 mars.",
        keywords: [
          "AION2 Spacetime Rift",
          "horaires Spacetime Rift AION2",
          "emplacements Rift AION2",
          "carte Rift Elyos",
          "carte Rift Asmodian",
          "heures Rift AION2",
        ],
      },
    },
    es: {
      content: {
        publishedLabel: "Publicado",
        eyebrow: "HORARIO OFICIAL Y MAPAS DE RIFT",
        title: "AION2 Spacetime Rift: horarios y ubicaciones en el mapa",
        description:
          "En el servicio de Taiwán de AION2, Spacetime Rift funciona en ciclos de tres horas. Consulta los ocho horarios diarios, las reglas oficiales y los mapas de Elyos o Asmodian filtrados para mostrar solo los Rifts.",
        intro:
          "En el servicio de Taiwán, Spacetime Rift sigue ocho horarios diarios: 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 y 23:00 (UTC+8). La actualización de NC enumera los cuatro primeros y confirma que la actividad se repite cada tres horas; los cuatro restantes continúan ese mismo ciclo. El calendario y los avisos dentro del juego siempre tienen prioridad.",
        sourceNote:
          "Verificado el 24 de julio de 2026 con las actualizaciones de Taiwán del 3 y 10 de diciembre, el comunicado de NC, la guía oficial del Abyss y el aviso de emparejamiento del 25 de marzo.",
        keywords: [
          "AION2 Spacetime Rift",
          "horarios Spacetime Rift AION2",
          "ubicaciones Rift AION2",
          "mapa Rift Elyos",
          "mapa Rift Asmodian",
          "hora Rift AION2",
        ],
      },
    },
    ja: {
      content: {
        publishedLabel: "公開日",
        eyebrow: "公式スケジュールとRIFTマップ",
        title: "AION2 Spacetime Rift：開催時刻とマップ位置",
        description:
          "AION2台湾サービスのSpacetime Riftは3時間周期で開催されます。1日8回の開催時刻、公式ルール、Riftだけを表示するElyos／Asmodianマップを確認できます。",
        intro:
          "台湾サービスのSpacetime Riftは、毎日02:00、05:00、08:00、11:00、14:00、17:00、20:00、23:00（UTC+8）の8枠で開催されます。NCの更新情報には最初の4枠と3時間周期で繰り返すことが記載されており、残りの4枠はその周期を延長したものです。実際の開催状況はゲーム内スケジュールと緊急告知を優先してください。",
        sourceNote:
          "2026年7月24日、台湾サービスの12月3日・10日更新、NCの公式発表、Abyss公式ガイド、3月25日のマッチング案内を照合しました。",
        keywords: [
          "AION2 Spacetime Rift",
          "AION2 Spacetime Rift 時間",
          "AION2 Rift 場所",
          "Elyos Rift マップ",
          "Asmodian Rift マップ",
          "AION2 Rift 開催時刻",
        ],
      },
    },
    "pt-br": {
      content: {
        publishedLabel: "Publicado",
        eyebrow: "HORÁRIOS OFICIAIS E MAPAS DE RIFT",
        title: "AION2 Spacetime Rift: horários e locais no mapa",
        description:
          "No serviço de Taiwan de AION2, o Spacetime Rift ocorre em ciclos de três horas. Veja os oito horários diários, as regras oficiais e os mapas Elyos ou Asmodian filtrados para mostrar somente Rifts.",
        intro:
          "No serviço de Taiwan, o Spacetime Rift segue oito horários diários: 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 e 23:00 (UTC+8). A atualização da NC lista os quatro primeiros horários e informa que a atividade se repete a cada três horas; os quatro restantes continuam o mesmo ciclo. O calendário e os avisos exibidos dentro do jogo sempre têm prioridade.",
        sourceNote:
          "Verificado em 24 de julho de 2026 com as atualizações de Taiwan de 3 e 10 de dezembro, o comunicado da NC, o guia oficial do Abyss e o aviso de pareamento de 25 de março.",
        keywords: [
          "AION2 Spacetime Rift",
          "horários Spacetime Rift AION2",
          "locais Rift AION2",
          "mapa Rift Elyos",
          "mapa Rift Asmodian",
          "horário Rift AION2",
        ],
      },
    },
  },
};
const source = JSON.parse(
  await readFile(
    path.join(projectRoot, "tmp", "editorial-content-source.json"),
    "utf8",
  ),
);
const priorityEditorialOverrides = JSON.parse(
  await readFile(
    path.join(projectRoot, "app", "editorial-priority-overrides.ja.json"),
    "utf8",
  ),
);
const aion2SourcePattern = /\bAION\s*2\b/iu;
const aion2LocalizedPattern =
  /(?:\bAION[\s\u00a0]*2\b|イオン[\s\u00a0]*2|アイオン[\s\u00a0]*2|АИОН[\s\u00a0]*2)/giu;

const localePrefixPattern =
  /^\/(?:zh-hans|en|fr|de|es|ja|pt-br|ru|ko|zh-hant)\//u;
const sourceScriptCharacterPattern =
  /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]/u;
const sourceScriptRunPattern =
  /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]+/gu;
const sourceTermPattern =
  /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}](?:[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]|[ \t:：/「」『』·・ー])*/gu;
const latinOrNumberRunPattern = /[\p{Script=Latin}\p{N}]+/gu;
const termCorePattern = /[\p{L}\p{S}\p{Cn}\uFFFD]/gu;
const unexpectedNonRussianPattern =
  /[\uFFFD\p{Cn}\p{Script=Greek}\p{Script=Cyrillic}\p{Script=Hebrew}\p{Script=Arabic}]/u;
const unexpectedRussianPattern =
  /[\uFFFD\p{Cn}\p{Script=Greek}\p{Script=Hebrew}\p{Script=Arabic}]/u;
const repairLog = [];

function unexpectedPattern(locale) {
  return locale === "ru"
    ? unexpectedRussianPattern
    : unexpectedNonRussianPattern;
}

function hasUnexpectedTranslationText(value, locale) {
  return unexpectedPattern(locale).test(value);
}

function sourceTerms(value) {
  return [...value.matchAll(sourceTermPattern)]
    .map((match) => match[0].trim())
    .filter(Boolean);
}

function logRepair(locale, valuePath, sourceTerm, strategy) {
  repairLog.push({
    locale,
    path: valuePath,
    sourceTerm,
    strategy,
  });
}

function joinSourceTerms(terms, locale) {
  if (terms.length < 2) return terms[0] ?? "";
  if (locale === "ja" || locale === "zh-hans") return terms.join("、");
  const conjunctions = {
    de: "und",
    es: "y",
    fr: "et",
    "pt-br": "e",
    ru: "и",
  };
  const conjunction = conjunctions[locale] ?? "and";
  return `${terms.slice(0, -1).join(", ")} ${conjunction} ${terms.at(-1)}`;
}

function restoreOfficialNameList(
  sourceValue,
  localizedValue,
  locale,
  valuePath,
) {
  if (
    valuePath !==
    "guides/global-pre-registration.content.sections[5].paragraphs[0]"
  ) {
    return null;
  }

  const terms = sourceTerms(sourceValue);
  if (terms.length < 2) return null;
  const sentences = localizedValue.split(/(?<=[.!?])\s+/u);
  const sentenceIndex = sentences.findIndex((sentence) =>
    hasUnexpectedTranslationText(sentence, locale),
  );
  if (sentenceIndex < 0) return null;

  const sentence = sentences[sentenceIndex];
  const presentTerms = terms
    .map((term) => ({
      term,
      index: sentence.indexOf(term),
    }))
    .filter(({ index }) => index >= 0);
  const firstPresent = presentTerms.toSorted((a, b) => a.index - b.index)[0];
  const lastPresent = presentTerms.toSorted((a, b) => b.index - a.index)[0];
  const firstUnexpected = sentence.search(unexpectedPattern(locale));
  const listStart = firstPresent?.index ?? firstUnexpected;
  if (listStart < 0) return null;

  const listEnd = lastPresent
    ? lastPresent.index + lastPresent.term.length
    : sentence.length - (/[.!?]$/u.test(sentence) ? 1 : 0);
  const prefix = sentence.slice(0, listStart).trimEnd();
  const suffix = sentence.slice(listEnd);
  sentences[sentenceIndex] =
    `${prefix} ${joinSourceTerms(terms, locale)}${suffix || "."}`;

  const repaired = sentences.join(" ");
  logRepair(locale, valuePath, terms.join(" | "), "official-name-list");
  return repaired;
}

function restoreCorruptedSourceScript(
  sourceValue,
  localizedValue,
  locale,
  valuePath,
  key,
) {
  if (!hasUnexpectedTranslationText(localizedValue, locale)) {
    return localizedValue;
  }

  const sourceRuns = [...sourceValue.matchAll(sourceScriptRunPattern)];
  if (sourceRuns.length === 0) {
    throw new Error(
      `${locale}.${valuePath} contains unexpected script text but the source has no CJK or Hangul term to restore`,
    );
  }

  const firstSourceRun = sourceRuns[0];
  const lastSourceRun = sourceRuns.at(-1);
  const sourceRegion = sourceValue.slice(
    firstSourceRun.index,
    lastSourceRun.index + lastSourceRun[0].length,
  );
  if (!sourceScriptCharacterPattern.test(sourceRegion)) {
    throw new Error(
      `${locale}.${valuePath} could not identify a source-script term`,
    );
  }

  const repairedList = restoreOfficialNameList(
    sourceValue,
    localizedValue,
    locale,
    valuePath,
  );
  if (repairedList !== null) {
    return repairedList;
  }

  if (valuePath.includes(".sourceLabels.")) {
    const sourceSeparator = sourceValue.match(/\s+—\s+/u);
    const localizedSeparator = localizedValue.match(/\s+—\s+/u);
    let repaired;
    if (sourceSeparator) {
      const sourcePrefix = sourceValue.slice(0, sourceSeparator.index);
      repaired = localizedSeparator
        ? `${sourcePrefix}${localizedValue.slice(localizedSeparator.index)}`
        : sourceValue;
      logRepair(locale, valuePath, sourcePrefix, "source-label-prefix");
    } else {
      const terms = sourceTerms(sourceValue);
      const lastColon = localizedValue.lastIndexOf(":");
      if (terms.length === 1 && lastColon >= 0) {
        repaired = `${localizedValue.slice(0, lastColon + 1)} ${terms[0]}`;
        logRepair(locale, valuePath, terms[0], "source-label-term");
      } else {
        repaired = sourceValue;
        logRepair(locale, valuePath, sourceRegion, "source-label");
      }
    }
    return repaired;
  }

  if (key === "keywords") {
    logRepair(locale, valuePath, sourceValue, "official-keyword");
    return sourceValue;
  }

  const sourceParenthetical = sourceValue.match(
    /\(([^—]*[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}][^—]*)\)(?=\s*—)/u,
  );
  if (
    sourceParenthetical &&
    /\([^—]*\)(?=\s*—)/u.test(localizedValue)
  ) {
    const repaired = localizedValue.replace(
      /\([^—]*\)(?=\s*—)/u,
      `(${sourceParenthetical[1]})`,
    );
    logRepair(
      locale,
      valuePath,
      sourceParenthetical[1],
      "parenthetical-official-term",
    );
    return repaired;
  }

  const segments = [];
  let cursor = 0;
  for (const match of localizedValue.matchAll(latinOrNumberRunPattern)) {
    if (match.index > cursor) {
      segments.push({
        start: cursor,
        end: match.index,
        value: localizedValue.slice(cursor, match.index),
      });
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < localizedValue.length) {
    segments.push({
      start: cursor,
      end: localizedValue.length,
      value: localizedValue.slice(cursor),
    });
  }

  const corruptedSegments = segments.filter((segment) =>
    hasUnexpectedTranslationText(segment.value, locale),
  );
  if (corruptedSegments.length !== 1) {
    throw new Error(
      `${locale}.${valuePath} has ${corruptedSegments.length} ambiguous corrupted segments`,
    );
  }

  const segment = corruptedSegments[0];
  const coreCharacters = [...segment.value.matchAll(termCorePattern)];
  if (coreCharacters.length === 0) {
    throw new Error(
      `${locale}.${valuePath} has no replaceable corrupted term`,
    );
  }
  const firstCore = coreCharacters[0];
  const lastCore = coreCharacters.at(-1);
  const repairedSegment = `${segment.value.slice(0, firstCore.index)}${sourceRegion}${segment.value.slice(lastCore.index + lastCore[0].length)}`;
  const repaired = `${localizedValue.slice(0, segment.start)}${repairedSegment}${localizedValue.slice(segment.end)}`;

  if (hasUnexpectedTranslationText(repaired, locale)) {
    throw new Error(
      `${locale}.${valuePath} still contains unexpected script text after source-term restoration`,
    );
  }

  logRepair(locale, valuePath, sourceRegion, "source-script-region");
  return repaired;
}

function normalizeEditorialTerms(
  sourceValue,
  localizedValue,
  locale,
  key = "",
  valuePath = "",
) {
  if (typeof sourceValue === "string" && typeof localizedValue === "string") {
    let normalized = restoreCorruptedSourceScript(
      sourceValue,
      localizedValue,
      locale,
      valuePath,
      key,
    );
    normalized = aion2SourcePattern.test(sourceValue)
      ? normalized.replace(aion2LocalizedPattern, "AION2")
      : normalized;
    if (key === "href" && localePrefixPattern.test(sourceValue)) {
      normalized = sourceValue.replace(localePrefixPattern, `/${locale}/`);
    }
    if (locale === "ja" && /^No[.!](?:\s|$)/iu.test(sourceValue)) {
      normalized = normalized.replace(/^(?:ナンバー|番号)[。.、\s]*/u, "いいえ。");
    }
    return normalized;
  }
  if (Array.isArray(sourceValue) && Array.isArray(localizedValue)) {
    const normalizedItems = localizedValue.map((item, index) =>
      normalizeEditorialTerms(
        sourceValue[index],
        item,
        locale,
        key,
        `${valuePath}[${index}]`,
      ),
    );
    return key === "keywords"
      ? normalizedItems.filter(
          (item) => typeof item !== "string" || item.trim().length > 0,
        )
      : normalizedItems;
  }
  if (
    sourceValue &&
    localizedValue &&
    typeof sourceValue === "object" &&
    typeof localizedValue === "object"
  ) {
    return Object.fromEntries(
      Object.entries(localizedValue)
        .filter(([key]) => Object.hasOwn(sourceValue, key))
        .map(([key, value]) => [
        key,
        normalizeEditorialTerms(
          sourceValue[key],
          value,
          locale,
          key,
          valuePath ? `${valuePath}.${key}` : key,
        ),
      ]),
    );
  }
  return localizedValue;
}

function mergeEditorialOverride(value, override) {
  if (
    value &&
    override &&
    !Array.isArray(value) &&
    !Array.isArray(override) &&
    typeof value === "object" &&
    typeof override === "object"
  ) {
    return Object.fromEntries(
      [...new Set([...Object.keys(value), ...Object.keys(override)])].map(
        (key) => [
          key,
          key in override
            ? mergeEditorialOverride(value[key], override[key])
            : value[key],
        ],
      ),
    );
  }
  return override;
}

function normalizeOfficialItemEditorial(identity, value, locale) {
  if (!identity.startsWith("database/") || identity === "database/map-data-methodology") {
    return value;
  }

  const sourceTitle = source.entries[identity]?.content?.title;
  const match =
    typeof sourceTitle === "string"
      ? sourceTitle.match(/^(.*?) — AION2 item ID (\d+)$/u)
      : null;
  if (!match || !value?.content) return value;

  const [, officialName, itemId] = match;
  const labels = {
    "zh-hans": {
      title: `${officialName} — AION2 物品 ID ${itemId}`,
      description: `查看 ${officialName}（AION2 物品 ID ${itemId}）的官方品级、分类、等级、限制、交易状态、属性与来源标签。`,
      genericKeyword: "AION2 物品数据库",
    },
    fr: {
      title: `${officialName} — objet AION2 ID ${itemId}`,
      description: `Consultez la fiche vérifiée de ${officialName} (objet AION2 ID ${itemId}) : rareté, catégorie, niveau, restrictions, échange, attributs et sources officielles.`,
      genericKeyword: "base de données d’objets AION2",
    },
    de: {
      title: `${officialName} — AION2-Gegenstand ID ${itemId}`,
      description: `Geprüfter Eintrag für ${officialName} (AION2-Gegenstand ID ${itemId}) mit Seltenheit, Kategorie, Stufe, Einschränkungen, Handel, Werten und Quellen.`,
      genericKeyword: "AION2 Item-Datenbank",
    },
    es: {
      title: `${officialName} — objeto de AION2 ID ${itemId}`,
      description: `Consulta la ficha verificada de ${officialName} (objeto de AION2 ID ${itemId}): rareza, categoría, nivel, restricciones, comercio, atributos y fuentes oficiales.`,
      genericKeyword: "base de datos de objetos AION2",
    },
    ja: {
      title: `${officialName} — AION2 アイテムID ${itemId}`,
      description: `${officialName}（AION2 アイテムID ${itemId}）の公式データを確認できます。グレード、分類、レベル、制限、取引可否、能力値、出典を掲載しています。`,
      genericKeyword: "AION2 アイテムデータベース",
    },
    "pt-br": {
      title: `${officialName} — item do AION2 ID ${itemId}`,
      description: `Consulte o registro verificado de ${officialName} (item do AION2 ID ${itemId}): raridade, categoria, nível, restrições, comércio, atributos e fontes oficiais.`,
      genericKeyword: "banco de itens AION2",
    },
    ru: {
      title: `${officialName} — предмет AION2 ID ${itemId}`,
      description: `Проверенная запись о ${officialName} (предмет AION2 ID ${itemId}): редкость, категория, уровень, ограничения, торговля, характеристики и официальные источники.`,
      genericKeyword: "база предметов AION2",
    },
  };
  const copy = labels[locale];
  if (!copy) return value;

  return mergeEditorialOverride(value, {
    content: {
      title: copy.title,
      description: copy.description,
      keywords: [
        officialName,
        `AION2 ${officialName}`,
        itemId,
        copy.genericKeyword,
      ],
    },
  });
}

function normalizeEditorialChrome(value, locale) {
  const chrome = {
    "zh-hans": {
      backLabel: "返回内容中心",
      contentsLabel: "本页内容",
      publishedLabel: "发布",
      updatedLabel: "最后核对",
      relatedLabel: "相关阅读",
    },
    fr: {
      backLabel: "Retour au centre de contenu",
      contentsLabel: "Dans cette page",
      publishedLabel: "Publié",
      updatedLabel: "Dernière vérification",
      relatedLabel: "À lire aussi",
    },
    de: {
      backLabel: "Zurück zum Inhaltsbereich",
      contentsLabel: "Auf dieser Seite",
      publishedLabel: "Veröffentlicht",
      updatedLabel: "Zuletzt geprüft",
      relatedLabel: "Weiterführende Inhalte",
    },
    es: {
      backLabel: "Volver al centro de contenido",
      contentsLabel: "En esta página",
      publishedLabel: "Publicado",
      updatedLabel: "Última verificación",
      relatedLabel: "Contenido relacionado",
    },
    ja: {
      backLabel: "コンテンツ一覧に戻る",
      contentsLabel: "このページの内容",
      publishedLabel: "公開日",
      updatedLabel: "最終確認",
      relatedLabel: "関連記事",
    },
    "pt-br": {
      backLabel: "Voltar à central de conteúdo",
      contentsLabel: "Nesta página",
      publishedLabel: "Publicado",
      updatedLabel: "Última verificação",
      relatedLabel: "Conteúdo relacionado",
    },
    ru: {
      backLabel: "Вернуться к материалам",
      contentsLabel: "На этой странице",
      publishedLabel: "Опубликовано",
      updatedLabel: "Последняя проверка",
      relatedLabel: "Связанные материалы",
    },
  }[locale];
  return chrome
    ? mergeEditorialOverride(value, { content: { byline: "PFG", ...chrome } })
    : value;
}

const localePayloads = await Promise.all(
  locales.map(async (locale) => {
    const raw = await readFile(path.join(sourceDir, `${locale}.json`), "utf8");
    return [locale, JSON.parse(raw)];
  }),
);

const identities = Object.keys(localePayloads[0][1].entries);
const entries = Object.fromEntries(
  identities.map((identity) => [
    identity,
    Object.fromEntries(
      localePayloads.map(([locale, payload]) => [
        locale,
        mergeEditorialOverride(
          normalizeOfficialItemEditorial(
            identity,
            normalizeEditorialChrome(
              normalizeEditorialTerms(
                source.entries[identity],
                payload.entries[identity],
                locale,
                "",
                identity,
              ),
              locale,
            ),
            locale,
          ),
          mergeEditorialOverride(
            editorialOverrides[identity]?.[locale] ?? {},
            priorityEditorialOverrides[identity]?.[locale] ?? {},
          ),
        ),
      ]),
    ),
  ]),
);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      version: 1,
      sourceLocale: "en",
      generatedAt: "2026-07-28",
      translationStage: "editorial-draft",
      entries,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Merged ${identities.length} entries into ${outputPath}`);
if (repairLog.length > 0) {
  console.log(`Restored ${repairLog.length} corrupted source-script terms:`);
  for (const repair of repairLog) {
    console.log(
      `- ${repair.locale}.${repair.path}: ${JSON.stringify(repair.sourceTerm)}`,
      ` (${repair.strategy})`,
    );
  }
}
