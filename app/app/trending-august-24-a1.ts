import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-24-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "aion2hub-faction-2026-08-24", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Faction Guide — Elyos vs Asmodians", url: "https://aion2hub.com/", publishedAt: "2026-07-10", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 阵营指南——Elyos vs Asmodians", en: "AION 2 Faction Guide — Elyos vs Asmodians", fr: "Guide des factions AION 2 — Elyos vs Asmodiens", de: "AION 2 Fraktions-Guide — Elyos vs Asmodianer", es: "Guía de facciones de AION 2 — Elyos vs Asmodianos", ja: "AION 2 派閥ガイド — Elyos vs Asmodians", "pt-br": "Guia de facções de AION 2 — Elyos vs Asmodianos", ru: "Руководство по фракциям AION 2 — Elyos vs Asmodians", ko: "AION 2 진영 가이드 — Elyos vs Asmodians", "zh-hant": "AION 2 陣營指南——Elyos vs Asmodians", }, "https://aion2hub.com/"), };
const source2: ContentSource = { id: "plaync-faction-2026-08-24", kind: "official", publisher: "NCSOFT", label: "AION 2 — Official Site", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "AION 2 官方网站", en: "AION 2 — Official Site", fr: "AION 2 — Site officiel", de: "AION 2 — Offizielle Website", es: "AION 2 — Sitio oficial", ja: "AION 2 — 公式サイト", "pt-br": "AION 2 — Site oficial", ru: "AION 2 — Официальный сайт", ko: "AION 2 — 공식 사이트", "zh-hant": "AION 2 官方網站", }, "https://aion2.plaync.com/"), };
const source3: ContentSource = { id: "pcgamesn-faction-2026-08-24", kind: "third-party", publisher: "PCGamesN", label: "Aion 2 preview — faction and character creation", url: "https://www.pcgamesn.com/aion-2/for-character-creation-enthusiasts", publishedAt: "2026-06-01", retrievedAt: "2026-08-24", verifiedAt: "2026-08-24", localizations: localizations({ "zh-hans": "PCGamesN Aion 2 预览——阵营与角色创建", en: "PCGamesN Aion 2 preview — faction and character creation", fr: "Aperçu PCGamesN d'Aion 2 — faction et création", de: "PCGamesN Aion 2 Vorschau — Fraktion und Erstellung", es: "Vista previa de PCGamesN de Aion 2 — facción", ja: "PCGamesN Aion 2 プレビュー — 派閥とキャラ作成", "pt-br": "Prévia do PCGamesN de Aion 2 — facção", ru: "Превью PCGamesN Aion 2 — фракция", ko: "PCGamesN Aion 2 미리보기 — 진영", "zh-hant": "PCGamesN Aion 2 預覽——陣營與角色創建", }, "https://www.pcgamesn.com/aion-2/for-character-creation-enthusiasts"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "阵营选择指南配图", caption: "NC 官方配图；Elyos 与 Asmodians 是 Aion 2 的两大阵营。" }, en: { alt: "Faction guide image", caption: "Official NC artwork; Elyos and Asmodians are Aion 2's two factions." }, fr: { alt: "Image du guide des factions", caption: "Visuel officiel NC ; Elyos et Asmodiens sont les deux factions." }, de: { alt: "Fraktions-Guide-Bild", caption: "Offizielles NC-Artwork; Elyos und Asmodianer." }, es: { alt: "Imagen de la guía de facciones", caption: "Arte oficial de NC; Elyos y Asmodianos." }, ja: { alt: "派閥ガイド画像", caption: "NC公式アートワーク；ElyosとAsmodians。" }, "pt-br": { alt: "Imagem do guia de facções", caption: "Arte oficial da NC; Elyos e Asmodianos." }, ru: { alt: "Изображение гайда по фракциям", caption: "Официальный арт NC; Elyos и Asmodians." }, ko: { alt: "진영 가이드 이미지", caption: "NC 공식 이미지입니다. Elyos와 Asmodians는 Aion 2의 두 진영입니다." }, "zh-hant": { alt: "陣營選擇指南配圖", caption: "NC 官方配圖；Elyos 與 Asmodians 是 Aion 2 的兩大陣營。" }, }, };

export const trendingAugust24Article1: ContentEntry = {
  section: "guides", slug: "aion-2-faction-guide", schemaType: "Article",
  publishedAt: "2026-08-24", updatedAt: "2026-08-24", readingMinutes: 5,
  publication: publishedVerified,
  sources: [source1, source2, source3],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-pvp-guide" },
    { kind: "content", section: "guides", slug: "aion-2-server-regions-guide" },
    { kind: "content", section: "guides", slug: "aion-2-trinity-roles-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "FACTION GUIDE", title: "Aion 2 Faction Guide: Elyos vs Asmodians — Which Side to Choose", description: "Choose your faction in Aion 2. Compare Elyos and Asmodians — faction-specific zones, story, PvP alignment, and community. Complete guide to make the right choice at launch.", intro: "One of the most important decisions in Aion 2 is choosing your faction: the Elyos (Guardians of Light) or the Asmodians (Children of Darkness). This choice determines your starting zone, faction-specific quests, NPCs, and which players you can group with. This guide breaks down the differences to help you decide.", sourceNote: "Based on AION2Hub's faction overview, official NCSoft materials, and PCGamesN's preview of the character creation system. Faction details confirmed from official sources.", keywords: ["Aion 2 faction guide", "Elyos vs Asmodians", "Aion 2 faction choice", "Aion 2 Elyos", "Aion 2 Asmodians"],
      sections: [
        section("elyos-overview", "Elyos: The Guardians of Light", ["The Elyos are one of the two playable factions in Aion 2, descended from the original inhabitants of Atreia who were blessed with luminous wings and a connection to the power of light. They inhabit the western side of the world, with their capital city of Sanctum serving as a bastion of order and civilization.", "Elyos characters start in the Poeta region, a lush forest zone with golden skies and sacred temples. The early Elyos questing experience focuses on themes of protection, duty, and reclaiming lost territories from the Balaur threat. Elyos architecture is characterized by white marble, gold accents, and flowing water features.", "The Elyos faction is generally more popular among new players and those who prefer a traditional heroic fantasy aesthetic. The faction has a slightly larger population on most servers, which can affect world PvP dynamics and auction house availability."]),
        section("asmodian-overview", "Asmodians: The Children of Darkness", ["The Asmodians are the second playable faction, transformed from the original Elyos who were corrupted by the power of the Balaur. They inhabit the eastern side of Atreia, with their capital city of Pandaemonium rising from volcanic rock and dark crystal formations.", "Asmodian characters start in the Ishalgen region, a dark, volcanic landscape with crimson skies and crystalline structures. The early Asmodian questing experience focuses on themes of survival, ambition, and the pursuit of power at any cost. Asmodian architecture is characterized by dark stone, crystal formations, and dramatic angular designs.", "The Asmodian faction appeals to players who prefer an edgier aesthetic and a more aggressive playstyle. While the faction population is typically smaller than the Elyos, this creates a tighter-knit community and can make coordinated PvP more effective."]),
        section("faction-differences", "Faction Differences: Zones, NPCs & Story", ["Faction choice determines which zones you can access. The first 30 levels are spent entirely in faction-specific territories — Elyos quest in Poeta, Verteron, and Eltnen, while Asmodians quest in Ishalgen, Altgard, and Morheim. You cannot enter the opposing faction's starting zones.", "After level 30, the Abyss opens as a shared PvPvE zone where both factions compete. Certain dungeons have faction-specific entrances, though most endgame content is accessible to both factions. NPCs, flight masters, and merchants are completely separate between factions.", "The main story diverges significantly between factions. While the overarching narrative of the Balaur invasion is the same, the perspective and motivations differ. Many players choose to experience both faction stories through alts, as the early game experience is meaningfully different."]),
        section("how-to-choose", "How to Choose Your Faction", ["When choosing your faction, consider: aesthetic preference (golden Elyos vs dark Asmodian), community culture (larger Elyos population vs tighter Asmodian community), and whether you have friends already playing — you must be on the same faction to group together.", "You cannot change faction after character creation. Each character is permanently locked to its faction. However, you can create characters on both factions on the same server, though they cannot trade or communicate across factions.", "For the best experience, choose the faction that matches your aesthetic and roleplaying preferences. Both factions have access to the same classes, gear, and endgame content. The only difference is the journey to get there and the community you will be part of."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "阵营指南", title: "Aion 2 阵营选择指南：Elyos vs Asmodians——选择哪一方", description: "在 Aion 2 中选择你的阵营。比较 Elyos 和 Asmodians——阵营专属区域、故事、PvP 归属与社区。", intro: "Aion 2 中最重要的决定之一就是选择阵营。这个选择决定了你的起始区域、阵营专属任务和 NPC。", sourceNote: "基于 AION2Hub 阵营概述、NCSoft 官方资料与 PCGamesN 预览。", keywords: ["Aion 2 阵营指南", "Elyos vs Asmodians", "Aion 2 阵营选择", "Aion 2 Elyos", "Aion 2 Asmodians"],
      sections: [
        section("elyos-overview", "Elyos：光明守护者", ["Elyos 是 Aion 2 中两个可玩阵营之一，拥有光之翼和与光明力量的连接。他们居住在世界西部，主城 Sanctum 是秩序与文明的堡垒。", "Elyos 角色在 Poeta 区域开始，这是一个拥有金色天空和神圣庙宇的森林区域。早期任务主题围绕保护、责任和夺回失地。"]),
        section("asmodian-overview", "Asmodians：黑暗之子", ["Asmodians 是第二个可玩阵营，被 Balaur 的力量腐蚀。他们居住在世界东部，主城 Pandaemonium 由火山岩和暗色水晶构成。", "Asmodian 角色在 Ishalgen 区域开始，以黑暗的火山景观和深红天空为特色。早期任务主题围绕生存、野心和力量追求。"]),
        section("faction-differences", "阵营差异", ["阵营选择决定了你可以进入哪些区域。前 30 级完全在阵营专属领土中度过。30 级后，Abyss 作为共享 PvPvE 区域开放。", "主线故事在阵营间有显著差异。虽然 Balaur 入侵的总体叙事相同，但视角和动机不同。"]),
        section("how-to-choose", "如何选择阵营", ["考虑：审美偏好（金色 Elyos vs 暗色 Asmodian）、社区文化、以及是否有朋友已经加入某一阵营。", "创建角色后不能更改阵营。但可以在同一服务器创建两个阵营的角色，不过它们不能跨阵营交易或通信。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "진영 가이드", title: "Aion 2 진영 선택 가이드: Elyos vs Asmodians", description: "Aion 2에서 진영을 선택하세요. Elyos와 Asmodians를 비교합니다.", intro: "Aion 2에서 가장 중요한 결정 중 하나는 진영 선택입니다.", sourceNote: "AION2Hub, NCSoft 공식 자료, PCGamesN 리뷰에 기반합니다.", keywords: ["Aion 2 진영 가이드", "Elyos vs Asmodians", "Aion 2 진영 선택"],
      sections: [
        section("elyos-overview", "Elyos: 빛의 수호자", ["빛의 날개를 가진 진영. 서부 지역, Sanctum 수도. Poeta에서 시작."]),
        section("asmodian-overview", "Asmodians: 어둠의 아이들", ["Balaur의 힘에 타락한 진영. 동부 지역, Pandaemonium 수도. Ishalgen에서 시작."]),
        section("faction-differences", "진영 차이점", ["1-30레벨은 진영 전용 지역. 30레벨 이후 Abyss 공유 PvPvE."]),
        section("how-to-choose", "진영 선택 방법", ["취향에 따라 선택. 캐릭터 생성 후 변경 불가. 같은 서버에 양쪽 진영 생성 가능."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "派閥ガイド", title: "Aion 2 派閥選択ガイド：Elyos vs Asmodians", description: "Aion 2で派閥を選択。ElyosとAsmodiansを比較。", intro: "Aion 2で最も重要な決断の一つが派閥選択です。", sourceNote: "AION2Hub、NCSoft公式資料、PCGamesNプレビューに基づきます。", keywords: ["Aion 2 派閥ガイド", "Elyos vs Asmodians", "Aion 2 派閥選択"],
      sections: [
        section("elyos-overview", "Elyos：光の守護者", ["光の翼を持つ派閥。西部地域、Sanctum首都。Poetaで開始。"]),
        section("asmodian-overview", "Asmodians：闇の子ら", ["Balaurの力に堕落した派閥。東部地域、Pandaemonium首都。"]),
        section("faction-differences", "派閥の違い", ["1-30レベルは派閥専用地域。30レベル以降はAbyss共有PvPvE。"]),
        section("how-to-choose", "派閥の選び方", ["好みで選択。作成後変更不可。同一サーバーに両方作成可能。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE DES FACTIONS", title: "Guide des factions d'Aion 2 : Elyos vs Asmodiens — Quel camp choisir", description: "Choisissez votre faction dans Aion 2. Comparez Elyos et Asmodiens.", intro: "L'une des décisions les plus importantes dans Aion 2 est le choix de la faction.", sourceNote: "Basé sur AION2Hub, les matériels officiels NCSoft et l'aperçu PCGamesN.", keywords: ["Aion 2 guide faction", "Elyos vs Asmodiens", "Aion 2 choix faction"],
      sections: [
        section("elyos-overview", "Elyos : Gardiens de la Lumière", ["Ailes lumineuses. Région ouest, capitale Sanctum. Départ à Poeta."]),
        section("asmodian-overview", "Asmodiens : Enfants des Ténèbres", ["Corrompus par Balaur. Région est, capitale Pandaemonium."]),
        section("faction-differences", "Différences", ["Niveaux 1-30 en territoire de faction. Abyss PvPvE partagé au niveau 30+."]),
        section("how-to-choose", "Comment choisir", ["Préférence esthétique. Impossible de changer après création."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "FRAKTIONS-GUIDE", title: "Aion 2 Fraktions-Guide: Elyos vs Asmodianer", description: "Wählen Sie Ihre Fraktion in Aion 2. Vergleichen Sie Elyos und Asmodianer.", intro: "Eine der wichtigsten Entscheidungen in Aion 2 ist die Fraktionswahl.", sourceNote: "Basierend auf AION2Hub, offiziellen NCSoft-Materialien und PCGamesN.", keywords: ["Aion 2 Fraktions-Guide", "Elyos vs Asmodianer", "Aion 2 Fraktionswahl"],
      sections: [
        section("elyos-overview", "Elyos: Hüter des Lichts", ["Lichtflügel. Westregion, Hauptstadt Sanctum. Start in Poeta."]),
        section("asmodian-overview", "Asmodianer: Kinder der Dunkelheit", ["Von Balaur korrumpiert. Ostregion, Hauptstadt Pandaemonium."]),
        section("faction-differences", "Unterschiede", ["Stufe 1-30 in Fraktionsgebieten. Ab Stufe 30 Abyss PvPvE."]),
        section("how-to-choose", "Wahl der Fraktion", ["Ästhetik bevorzugen. Nach Erstellung nicht änderbar."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DE FACCIÓN", title: "Guía de facciones de Aion 2: Elyos vs Asmodianos", description: "Elige tu facción en Aion 2. Compara Elyos y Asmodianos.", intro: "Una de las decisiones más importantes en Aion 2 es elegir facción.", sourceNote: "Basado en AION2Hub, materiales oficiales de NCSoft y PCGamesN.", keywords: ["Aion 2 guía facción", "Elyos vs Asmodianos", "Aion 2 elección facción"],
      sections: [
        section("elyos-overview", "Elyos: Guardianes de la Luz", ["Alas luminosas. Región oeste, capital Sanctum. Inicio en Poeta."]),
        section("asmodian-overview", "Asmodianos: Hijos de la Oscuridad", ["Corrompidos por Balaur. Región este, capital Pandaemonium."]),
        section("faction-differences", "Diferencias", ["Niveles 1-30 en territorio de facción. Abyss PvPvE desde nivel 30."]),
        section("how-to-choose", "Cómo elegir", ["Preferencia estética. No cambiable tras creación."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DE FACÇÃO", title: "Guia de facções de Aion 2: Elyos vs Asmodianos", description: "Escolha sua facção em Aion 2. Compare Elyos e Asmodianos.", intro: "Uma das decisões mais importantes em Aion 2 é escolher a facção.", sourceNote: "Baseado no AION2Hub, materiais oficiais NCSoft e PCGamesN.", keywords: ["Aion 2 guia facção", "Elyos vs Asmodianos", "Aion 2 escolha facção"],
      sections: [
        section("elyos-overview", "Elyos: Guardiões da Luz", ["Asas luminosas. Região oeste, capital Sanctum. Início em Poeta."]),
        section("asmodian-overview", "Asmodianos: Filhos das Trevas", ["Corrompidos por Balaur. Região leste, capital Pandaemonium."]),
        section("faction-differences", "Diferenças", ["Níveis 1-30 em território da facção. Abyss PvPvE compartilhado."]),
        section("how-to-choose", "Como escolher", ["Preferência estética. Impossível mudar após criação."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "РУКОВОДСТВО ПО ФРАКЦИЯМ", title: "Руководство по фракциям Aion 2: Elyos vs Asmodians", description: "Выберите фракцию в Aion 2. Сравните Elyos и Asmodians.", intro: "Одно из самых важных решений в Aion 2 — выбор фракции.", sourceNote: "Основано на AION2Hub, официальных материалах NCSoft и PCGamesN.", keywords: ["Aion 2 руководство фракция", "Elyos vs Asmodians", "Aion 2 выбор фракции"],
      sections: [
        section("elyos-overview", "Elyos: Стражи Света", ["Светлые крылья. Западный регион, столица Sanctum. Старт в Poeta."]),
        section("asmodian-overview", "Asmodians: Дети Тьмы", ["Искажены Balaur. Восточный регион, столица Pandaemonium."]),
        section("faction-differences", "Различия", ["Уровни 1-30 на территории фракции. Abyss PvPvE с 30 уровня."]),
        section("how-to-choose", "Как выбрать", ["Эстетические предпочтения. Нельзя изменить после создания."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "陣營指南", title: "Aion 2 陣營選擇指南：Elyos vs Asmodians", description: "在 Aion 2 中選擇你的陣營。比較 Elyos 和 Asmodians。", intro: "Aion 2 中最重要的決定之一就是選擇陣營。", sourceNote: "基於 AION2Hub 陣營概述、NCSoft 官方資料與 PCGamesN 預覽。", keywords: ["Aion 2 陣營指南", "Elyos vs Asmodians", "Aion 2 陣營選擇"],
      sections: [
        section("elyos-overview", "Elyos：光明守護者", ["光之翼。西部區域，主城 Sanctum。從 Poeta 開始。"]),
        section("asmodian-overview", "Asmodians：黑暗之子", ["被 Balaur 力量腐蝕。東部區域，主城 Pandaemonium。"]),
        section("faction-differences", "陣營差異", ["1-30 級在陣營專屬領土。30 級後 Abyss 共享 PvPvE。"]),
        section("how-to-choose", "如何選擇", ["審美偏好。創建後不可更改。"]),
      ],
    }),
  },
};