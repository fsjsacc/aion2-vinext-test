import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-21-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 2 — Abyss Surface PvPvE guide */
const abyssSource1: ContentSource = { id: "aion2hub-surface-2026-08-21", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Abyss — Surface & PvP Toggle", url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2 深渊——地面层与 PvP 开关", en: "AION 2 Abyss — Surface & PvP Toggle", fr: "AION 2 Abîme — Surface et bascule PvP", de: "AION 2 Abgrund — Oberfläche & PvP-Umschalter", es: "AION 2 Abismo — Superficie y conmutador PvP", ja: "AION 2 深淵 — 地表層とPvPトグル", "pt-br": "AION 2 Abismo — Superfície e alternância PvP", ru: "AION 2 Бездна — Поверхность и переключатель PvP", ko: "AION 2 심연 — 표면층과 PvP 토글", "zh-hant": "AION 2 深淵——地面層與 PvP 開關", }, "https://aion2hub.com/"), };
const abyssSource2: ContentSource = { id: "mmobomb-surface-2026-08-21", kind: "third-party", publisher: "MMOBomb", label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "NC 首次全球开发者直播", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar", ja: "NCが初のグローバル開発者ストリーム", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar", ru: "NC делится тем, что игроки Aion 2 могут ожидать", ko: "NC, 첫 글로벌 개발자 스트림", "zh-hant": "NC 首次全球開發者直播", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const abyssSource3: ContentSource = { id: "plaync-abbys-2026-08-21", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — 심연 시스템 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2（韩服）— 深渊系统说明", en: "AION 2 (KR) — Abyss System Guide", fr: "AION 2 (KR) — Guide du système Abîme", de: "AION 2 (KR) — Abgrund-System-Guide", es: "AION 2 (KR) — Guía del sistema Abismo", ja: "AION 2 (KR) — 深淵システムガイド", "pt-br": "AION 2 (KR) — Guia do sistema Abismo", ru: "AION 2 (KR) — Гайд по системе Бездны", ko: "AION 2 (KR) — 심연 시스템 안내", "zh-hant": "AION 2（韓服）— 深淵系統說明", }, "https://aion2.plaync.com/ko-kr/board/notice"), };
const abyssSurfaceHero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media", translations: { "zh-hans": { alt: "深渊地面层指南配图", caption: "NC 官方配图；深落地地面层在 45 级开放，PvP 开关全站可用。" }, en: { alt: "Abyss surface guide image", caption: "Official NC artwork; the Abyss surface layer opens at level 45 with a PvP toggle available everywhere." }, fr: { alt: "Image du guide de la surface de l'Abîme", caption: "Visuel officiel NC ; la surface de l'Abîme s'ouvre au niveau 45." }, de: { alt: "Abgrund-Oberflächen-Guide-Bild", caption: "Offizielles NC-Artwork; die Abgrund-Oberfläche öffnet auf Stufe 45." }, es: { alt: "Imagen de la guía de la superficie del Abismo", caption: "Arte oficial de NC; la superficie del Abismo se abre en el nivel 45." }, ja: { alt: "深淵地表層ガイド画像", caption: "NC公式アートワーク；深淵地表層はレベル45で開放されます。" }, "pt-br": { alt: "Imagem do guia da superfície do Abismo", caption: "Arte oficial da NC; a superfície do Abismo abre no nível 45." }, ru: { alt: "Изображение гайда по поверхности Бездны", caption: "Официальный арт NC; поверхность Бездны открывается на 45 уровне." }, ko: { alt: "심연 표면층 가이드 이미지", caption: "NC 공식 이미지입니다. 심연 표면층은 45레벨에 개방됩니다." }, "zh-hant": { alt: "深淵地面層指南配圖", caption: "NC 官方配圖；深淵地面層在 45 級開放，PvP 開關全站可用。" }, }, };

export const trendingAugust21Article2: ContentEntry = {
  section: "guides", slug: "aion-2-abyss-surface-guide", schemaType: "Article",
  publishedAt: "2026-08-21", updatedAt: "2026-08-21", readingMinutes: 5, publication: publishedVerified,
  sources: [abyssSource1, abyssSource2, abyssSource3], heroImage: abyssSurfaceHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-abyss-rift-zone-guide" },
    { kind: "content", section: "guides", slug: "aion-2-pvp-guide-battlegrounds-abyss" },
    { kind: "content", section: "guides", slug: "aion-2-daily-weekly-routine-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "PVPVE GUIDE", title: "Aion 2 Abyss Surface Guide: Open World PvPvE & Faction Warfare", description: "The Abyss surface is Aion 2's open-world PvPvE zone — faction battles, Abyss Points, and a unique PvP toggle. How it works and how to use it.", intro: "Beyond the structured 10v10 battlegrounds and the massive 300v300 Abyss Rift Zone lies the Abyss surface — a persistent open-world PvPvE zone where Elyos and Asmodians clash for resources, objectives, and Abyss Points. Accessible from level 45 with a unique PvP toggle system, it is the everyday PvP content that keeps the faction war alive between scheduled events.",
      sourceNote: "Based on the August 7 developer stream, AION2Hub coverage, and confirmed KR service structure. PvP toggle mechanics reflect the latest confirmed state.",
      keywords: ["Aion 2 Abyss surface", "Aion 2 open world PvP", "Aion 2 PvPvE", "Aion 2 Abyss Points", "Aion 2 faction warfare"],
      sections: [
        section("what", "What Is the Abyss Surface?", ["The Abyss surface is a persistent open-world zone accessible from level 45. Unlike instanced battlegrounds, it is always active — Elyos and Asmodians occupy the same space, fight over control points, boss spawns, and resource nodes, and earn Abyss Points (AP) continuously.", "The surface is the entry point to the Abyss progression track. It feeds into the same AP economy as the Rift Zone but at a lower intensity, making it the ideal daily PvP content for players who want faction warfare without the 300v300 scale."]),
        section("toggle", "The PvP Toggle System", ["A key feature of the Abyss surface is the PvP toggle flag, which the dev stream confirmed is available everywhere — not just in the Abyss. You can opt into PvP in most open-world zones, but the Abyss surface is where the toggle is most active, with the highest density of flagged players.", "The toggle creates a layered risk-reward dynamic: stay unflagged and you are safe from other players but miss out on AP and faction objectives. Flag up to participate in the full Abyss economy, but accept that enemies can attack you anywhere within the zone."]),
        section("ap", "Abyss Points & Progression", ["Abyss Points (AP) are the currency of the Abyss. Earned through kills, objective captures, boss contributions, and zone events, AP is spent on Abyss-tier gear, enhancement materials, and honor medals. The weekly AP cap encourages steady participation rather than grinding.", "The Abyss surface provides the primary AP income for most players, with the Rift Zone offering a high-intensity burst of AP during its server rotation events. Gear from the Abyss track is a parallel endgame set that competes with PvE Dragon-tier gear."]),
        section("global", "What Global Players Should Expect", ["The Abyss surface with the PvP toggle is confirmed as a launch feature for the September 30 early access. Unlike the Rift Zone (which is KR-only for now), the surface is a core launch system.", "For launch, plan to enter the Abyss as soon as you hit level 45 — even if you are primarily a PvE player, the AP earned from passive faction activity funds gear options that supplement your PvE build. The toggle lets you control your engagement level."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "PvPvE 指南", title: "Aion 2 深渊地面层指南：开放世界 PvPvE 与阵营战争", description: "深落地地面层是 Aion 2 的开放世界 PvPvE 区域——阵营战斗、深渊点数与独特的 PvP 开关。运作方式与使用技巧。", intro: "在结构化的 10v10 战场与大规模 300v300 深渊裂隙地带之外，是深落地地面层——一个持续的开放世界 PvPvE 区域，天族与魔族在此争夺资源、目标与深渊点数。", sourceNote: "基于 8 月 7 日开发者直播、AION2Hub 报道与已确认的韩服结构。", keywords: ["Aion 2 深渊地面层", "Aion 2 开放世界 PvP", "Aion 2 PvPvE", "Aion 2 深渊点数", "Aion 2 阵营战争"],
      sections: [
        section("what", "什么是深落地地面层？", ["深落地地面层是 45 级开放的持续开放世界区域。与实例战场不同，它始终活跃——天族与魔族占据同一空间，争夺控制点、BOSS 刷新与资源节点，持续获得深渊点数（AP）。", "地面层是深渊养成轨道的入口点。"]),
        section("toggle", "PvP 开关系统", ["PvP 开关标志确认全站可用——不仅在深渊。但深落地地面层是开关最活跃的区域。"],),
        section("ap", "深渊点数与养成", ["深渊点数（AP）通过击杀、目标占领、BOSS 贡献与区域事件获得，用于深渊装备、强化材料与荣誉勋章。每周 AP 上限鼓励稳定参与。"]),
        section("global", "全球玩家的预期", ["深落地地面层与 PvP 开关已确认为 9 月 30 日抢先体验的上线功能。45 级后尽快进入深渊。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "PVPVE 가이드", title: "Aion 2 심연 표면층 가이드: 오픈월드 PvPvE와 진영 전쟁", description: "심연 표면층은 Aion 2의 오픈월드 PvPvE 지역입니다. 진영 전투, 심연 포인트, PvP 토글 시스템.", intro: "심연 표면층은 45레벨부터 접근 가능한 지속적 오픈월드 PvPvE 지역입니다.", sourceNote: "8월 7일 개발자 스트림, AION2Hub 보도, 공식 KR 서비스 구조에 기반합니다.", keywords: ["Aion 2 심연 표면층", "Aion 2 오픈월드 PvP", "Aion 2 PvPvE", "Aion 2 심연 포인트", "Aion 2 진영 전쟁"],
      sections: [
        section("what", "심연 표면층이란?", ["45레벨부터 접근 가능한 지속적 오픈월드 PvPvE 지역. 통제점, 보스, 자원 노드를 두고 진영 간 전투가 벌어집니다."]),
        section("toggle", "PvP 토글 시스템", ["PvP 토글 플래그는 전역에서 사용 가능하지만, 심연 표면층이 가장 활성화된 지역입니다."]),
        section("ap", "심연 포인트와 성장", ["AP는 처치, 목표 점령, 보스 기여로 획득하며 심연 장비와 강화 재료에 사용됩니다."]),
        section("global", "글로벌 플레이어의 기대", ["심연 표면층과 PvP 토글은 9월 30일 얼리 액세스의 출시 기능으로 확인되었습니다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "PvPvEガイド", title: "Aion 2 深淵地表層ガイド：オープンワールドPvPvEと陣営戦争", description: "深淵地表層は Aion 2 のオープンワールドPvPvEゾーンです。陣営戦闘、深淵ポイント、PvPトグルシステム。", intro: "深淵地表層はレベル45からアクセス可能な持続的オープンワールドPvPvEゾーンです。", sourceNote: "8月7日の開発者ストリーム、AION2Hub 報道、公式 KR サービス構造に基づきます。", keywords: ["Aion 2 深淵地表層", "Aion 2 オープンワールドPvP", "Aion 2 PvPvE", "Aion 2 深淵ポイント", "Aion 2 陣営戦争"],
      sections: [
        section("what", "深淵地表層とは？", ["レベル45からアクセス可能な持続的オープンワールドPvPvEゾーン。陣営間で支配点、ボス、資源を巡る戦闘が行われます。"]),
        section("toggle", "PvPトグルシステム", ["PvPトグルは全エリアで使用可能ですが、深淵地表層が最も活発なエリアです。"]),
        section("ap", "深淵ポイントと成長", ["APはキル、目標占拠、ボス貢献で獲得し、深淵装備や強化素材に使用します。"]),
        section("global", "グローバルプレイヤーの期待", ["深淵地表層とPvPトグルは9月30日の早期アクセスで提供されることが確認されています。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE PVPVE", title: "Guide de la surface de l'Abîme d'Aion 2 : PvPvE et guerre de factions", description: "La surface de l'Abîme est la zone PvPvE open-world d'Aion 2. Batailles de factions, points d'Abîme et bascule PvP.", intro: "La surface de l'Abîme est accessible dès le niveau 45, zone PvPvE persistante.", sourceNote: "Basé sur le dev stream du 7 août, la couverture AION2Hub et la structure KR officielle.", keywords: ["Aion 2 surface de l'Abîme", "Aion 2 PvP monde ouvert", "Aion 2 PvPvE", "Aion 2 points d'Abîme"],
      sections: [
        section("what", "La surface de l'Abîme", ["Zone PvPvE persistante dès le niveau 45. Elyos et Asmodiens s'affrontent pour des points de contrôle et des ressources."]),
        section("toggle", "Bascule PvP", ["Disponible partout, mais la surface de l'Abîme est la zone la plus active."]),
        section("ap", "Points d'Abîme", ["Gagnés via kills, objectifs et boss. Dépensés en équipement et matériaux d'amélioration."]),
        section("global", "Pour les joueurs globaux", ["Confirmé pour le lancement du 30 septembre. Entrez dans l'Abîme dès le niveau 45."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "PVPVE-GUIDE", title: "Aion 2 Abgrund-Oberflächen-Guide: Open-World-PvPvE & Fraktionskrieg", description: "Die Abgrund-Oberfläche ist Aion 2s Open-World-PvPvE-Zone. Fraktionskämpfe, Abgrund-Punkte und PvP-Umschalter.", intro: "Die Abgrund-Oberfläche ist ab Stufe 45 zugänglich, eine persistente Open-World-PvPvE-Zone.", sourceNote: "Basierend auf dem Dev-Stream vom 7. August, AION2Hub-Berichterstattung und der offiziellen KR-Struktur.", keywords: ["Aion 2 Abgrund-Oberfläche", "Aion 2 Open-World-PvP", "Aion 2 PvPvE", "Aion 2 Abgrund-Punkte"],
      sections: [
        section("what", "Die Abgrund-Oberfläche", ["Persistente PvPvE-Zone ab Stufe 45. Elyos und Asmodier kämpfen um Kontrollpunkte und Ressourcen."]),
        section("toggle", "PvP-Umschalter", ["Überall verfügbar, aber die Abgrund-Oberfläche ist die aktivste Zone."]),
        section("ap", "Abgrund-Punkte", ["Erhalten durch Kills, Ziele und Bosse. Ausgegeben für Ausrüstung und Verbesserungsmaterialien."]),
        section("global", "Für Global-Spieler", ["Bestätigt für den Launch am 30. September. Betreten Sie den Abgrund ab Stufe 45."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA PVPVE", title: "Guía de la superficie del Abismo de Aion 2: PvPvE de mundo abierto y guerra de facciones", description: "La superficie del Abismo es la zona PvPvE de mundo abierto de Aion 2. Batallas de facciones, puntos del Abismo y conmutador PvP.", intro: "La superficie del Abismo es accesible desde el nivel 45, una zona PvPvE persistente.", sourceNote: "Basado en el dev stream del 7 de agosto, la cobertura de AION2Hub y la estructura oficial de KR.", keywords: ["Aion 2 superficie del Abismo", "Aion 2 PvP mundo abierto", "Aion 2 PvPvE", "Aion 2 puntos del Abismo"],
      sections: [
        section("what", "La superficie del Abismo", ["Zona PvPvE persistente desde el nivel 45. Elyos y Asmodianos luchan por puntos de control y recursos."]),
        section("toggle", "Conmutador PvP", ["Disponible en todas partes, pero la superficie del Abismo es la zona más activa."]),
        section("ap", "Puntos del Abismo", ["Ganados mediante kills, objetivos y jefes. Gastados en equipo y materiales de mejora."]),
        section("global", "Para jugadores globales", ["Confirmado para el lanzamiento del 30 de septiembre. Entra al Abismo desde el nivel 45."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA PVPVE", title: "Guia da superfície do Abismo de Aion 2: PvPvE de mundo aberto e guerra de facções", description: "A superfície do Abismo é a zona PvPvE de mundo aberto de Aion 2. Batalhas de facções, pontos do Abismo e alternância PvP.", intro: "A superfície do Abismo é acessível a partir do nível 45, uma zona PvPvE persistente.", sourceNote: "Baseado no dev stream de 7 de agosto, na cobertura da AION2Hub e na estrutura oficial da KR.", keywords: ["Aion 2 superfície do Abismo", "Aion 2 PvP mundo aberto", "Aion 2 PvPvE", "Aion 2 pontos do Abismo"],
      sections: [
        section("what", "A superfície do Abismo", ["Zona PvPvE persistente desde o nível 45. Elyos e Asmodianos lutam por pontos de controle e recursos."]),
        section("toggle", "Alternância PvP", ["Disponível em todo lugar, mas a superfície do Abismo é a zona mais ativa."]),
        section("ap", "Pontos do Abismo", ["Ganhos via kills, objetivos e chefes. Gastos em equipamento e materiais de melhoria."]),
        section("global", "Para jogadores globais", ["Confirmado para o lançamento de 30 de setembro. Entre no Abismo a partir do nível 45."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ГАЙД ПО PVPVE", title: "Гайд по поверхности Бездны Aion 2: PvPvE в открытом мире и межфракционная война", description: "Поверхность Бездны — зона PvPvE в открытом мире Aion 2. Межфракционные бои, очки Бездны и переключатель PvP.", intro: "Поверхность Бездны доступна с 45 уровня, постоянная PvPvE-зона.", sourceNote: "На основе dev-стрима от 7 августа, материалов AION2Hub и официальной структуры KR.", keywords: ["Aion 2 поверхность Бездны", "Aion 2 PvP в открытом мире", "Aion 2 PvPvE", "Aion 2 очки Бездны"],
      sections: [
        section("what", "Поверхность Бездны", ["Постоянная PvPvE-зона с 45 уровня. Элиос и Асмодиане борются за контрольные точки и ресурсы."]),
        section("toggle", "Переключатель PvP", ["Доступен везде, но поверхность Бездны — самая активная зона."]),
        section("ap", "Очки Бездны", ["Зарабатываются через убийства, цели и боссов. Тратятся на экипировку и материалы улучшения."]),
        section("global", "Глобальным игрокам", ["Подтверждено для запуска 30 сентября. Входите в Бездну с 45 уровня."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "PvPvE 指南", title: "Aion 2 深淵地面層指南：開放世界 PvPvE 與陣營戰爭", description: "深淵地面層是 Aion 2 的開放世界 PvPvE 區域——陣營戰鬥、深淵點數與獨特的 PvP 開關。運作方式與使用技巧。", intro: "在結構化的 10v10 戰場與大規模 300v300 深淵裂隙地帶之外，是深淵地面層——一個持續的開放世界 PvPvE 區域，天族與魔族在此爭奪資源、目標與深淵點數。", sourceNote: "基於 8 月 7 日開發者直播、AION2Hub 報導與已確認的韓服結構。", keywords: ["Aion 2 深淵地面層", "Aion 2 開放世界 PvP", "Aion 2 PvPvE", "Aion 2 深淵點數", "Aion 2 陣營戰爭"],
      sections: [
        section("what", "什麼是深淵地面層？", ["深淵地面層是 45 級開放的持續開放世界區域。與實例戰場不同，它始終活躍——天族與魔族佔據同一空間，爭奪控制點、BOSS 刷新與資源節點，持續獲得深淵點數（AP）。", "地面層是深淵養成軌道的入口點。"]),
        section("toggle", "PvP 開關系統", ["PvP 開關標誌確認全站可用——不僅在深淵。但深淵地面層是開關最活躍的區域。"]),
        section("ap", "深淵點數與養成", ["深淵點數（AP）透過擊殺、目標佔領、BOSS 貢獻與區域事件獲得，用於深淵裝備、強化材料與榮譽勳章。每週 AP 上限鼓勵穩定參與。"]),
        section("global", "全球玩家的預期", ["深淵地面層與 PvP 開關已確認為 9 月 30 日搶先體驗的上線功能。45 級後盡快進入深淵。"]),
      ],
    }),
  },
};