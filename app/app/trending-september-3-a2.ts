import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-september-3-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 2 — Pet system guide (mmorpg.com, Sept 2): 200+ pets, mob-to-pet mechanics, monster transformation, collection strategy */

const petSource1: ContentSource = {
  id: "mmorpg-pets-2026-09-02",
  kind: "third-party", publisher: "MMORPG.com",
  label: "AION 2 Pet System: Collection, Transformation, and Companion Strategy",
  url: "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845",
  publishedAt: "2026-09-02",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "AION 2 宠物系统：收集、转化与伙伴策略",
    en: "AION 2 Pet System: Collection, Transformation, and Companion Strategy",
    fr: "Système de familiers d'AION 2 : collection, transformation et stratégie",
    de: "Haustier-System von AION 2: Sammlung, Verwandlung und Gefährten-Strategie",
    es: "Sistema de mascotas de AION 2: colección, transformación y estrategia",
    ja: "AION 2 ペットシステム：収集・変身・コンパニオン戦略",
    "pt-br": "Sistema de pets de AION 2: coleta, transformação e estratégia",
    ru: "Система питомцев AION 2: коллекция, превращение и стратегия",
    ko: "AION 2 펫 시스템: 수집, 변신, 컴패니언 전략",
    "zh-hant": "AION 2 寵物系統：收集、轉化與夥伴策略",
  }, "https://www.mmorpg.com/previews/gamescom-2026-aion-2s-demo-highlights-pets-customizations-and-colorful-yet-intense-raid-bosses-2000138845"),
};

const petSource2: ContentSource = {
  id: "gamescom-podcast-pets-2026-09-01",
  kind: "third-party", publisher: "Massively Overpowered",
  label: "Massively OP Podcast 578: AION 2 Pet System Highlighted at Gamescom",
  url: "https://massivelyop.com/2026/09/01/massively-op-podcast-episode-578-gamescoming-and-gamesgoing/",
  publishedAt: "2026-09-01",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "Massively OP 播客 578：AION 2 宠物系统 Gamescom 亮点",
    en: "Massively OP Podcast 578: AION 2 Pet System Highlighted at Gamescom",
    fr: "Massively OP Podcast 578 : AION 2 Familiers en vedette à Gamescom",
    de: "Massively OP Podcast 578: AION 2 Haustiere im Fokus bei Gamescom",
    es: "Massively OP Podcast 578: Sistema de mascotas de AION 2 destacado en Gamescom",
    ja: "Massively OP ポッドキャスト 578：AION 2 ペットシステム Gamescom 特集",
    "pt-br": "Massively OP Podcast 578: Pets de AION 2 em destaque no Gamescom",
    ru: "Massively OP Podcast 578: питомцы AION 2 на Gamescom",
    ko: "Massively OP 팟캐스트 578: AION 2 펫 시스템 Gamescom 하이라이트",
    "zh-hant": "Massively OP 播客 578：AION 2 寵物系統 Gamescom 亮點",
  }, "https://massivelyop.com/2026/09/01/massively-op-podcast-episode-578-gamescoming-and-gamesgoing/"),
};

const petHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/7c10b2a1-8d5f-4e9b-a2f6-3f0a7c9d1e2b.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ja-jp/board/notice/list",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 宠物系统配图", caption: "200+ 宠物，击败怪物后转化为同伴——小兔、巨兽、棺材载具，全部纳入收集路线。" },
    en: { alt: "AION 2 pet system guide image", caption: "200+ pets, mobs converted to companions — from bunnies to giant beasts and coffin mounts — all on one collection path." },
    fr: { alt: "Image du système de familiers d'AION 2", caption: "200+ familiers, mobs transformés en compagnons — du lapin à la bête géante en passant par le cercueil montable." },
    de: { alt: "AION 2 Haustier-System Bild", caption: "200+ Haustiere, Monster zu Gefährten umgewandelt — vom Hasen bis zum Riesen und Sarg-Reittier." },
    es: { alt: "Imagen del sistema de mascotas de AION 2", caption: "200+ mascotas, monstruos convertidos en compañeros — desde conejos hasta bestias gigantes y monturas de ataúd." },
    ja: { alt: "AION 2 ペットシステム画像", caption: "200 種超ペット、倒したモンスターがペットに——うさぎ、巨獣、棺の乗り物まで収集ルートに。" },
    "pt-br": { alt: "Imagem do sistema de pets de AION 2", caption: "200+ pets, monstros viram companheiros — de coelhos a criaturas gigantes e montarias de caixão." },
    ru: { alt: "Изображение системы питомцев AION 2", caption: "200+ питомцев, монстры становятся компаньонами — от кроликов до гигантских существ и гроб-ездового." },
    ko: { alt: "AION 2 펫 시스템 이미지", caption: "200+ 펫, 몹이 컴패니언으로 변신—토끼부터 거대 생물, 관 라이더까지 수집 루트." },
    "zh-hant": { alt: "AION 2 寵物系統配圖", caption: "200+ 寵物，擊敗怪物後轉化為同伴——小兔、巨獸、棺材載具，全部納入收集路線。" },
  },
};

export const trendingSeptember3Article2: ContentEntry = {
  section: "guides",
  slug: "aion-2-pet-collection-companion-guide",
  schemaType: "Article",
  publishedAt: "2026-09-03",
  updatedAt: "2026-09-03",
  readingMinutes: 6,
  publication: publishedVerified,
  sources: [petSource1, petSource2],
  heroImage: petHero,
  related: [
    { kind: "content", section: "news", slug: "aion-2-gamescom-2026-demo-overview" },
    { kind: "content", section: "guides", slug: "aion-2-prelaunch-access-routes-guide" },
    { kind: "content", section: "guides", slug: "aion-2-spacetime-rift-domination-guide" },
    { kind: "content", section: "news", slug: "aion-2-release-date-october-5-2026" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 6, {
      eyebrow: "PET SYSTEM",
      title: "AION 2 Pet Collection Guide: 200+ Companions, Monster Transformation, and Collection Routes",
      description: "AION 2's pet system lets players turn nearly every mob into a companion — over 200 pets ranging from a cute bunny to a giant eldritch beast you can ride into town. This guide covers acquisition mechanics, monster transformation, and what to prioritize in the first 32 days before October 5.",
      intro: "The pet system is AION 2's most visible collection loop — a feature senior producer Andrew Long admitted was so ambitious that making every mob a possible pet burned more manpower than planned. This guide explains how the system works based on the Gamescom 2026 demo (MMORPG.com, Sept 2), how to plan your collection route, and what the monster transformation layer adds on top.",
      sourceNote: "Based on MMORPG.com's September 2, 2026 Gamescom hands-on (Luis Gutierrez) covering the pet system and companion mechanics, and Massively OP Podcast 578 (September 1, 2026) which highlighted AION 2 as a Gamescom headline.",
      keywords: ["AION 2 pets", "AION 2 companion collection", "AION 2 pet acquisition", "AION 2 monster transformation", "AION 2 pet guide", "AION 2 mob to pet"],
      sections: [
        section("how-pets-work", "How the Pet System Works", [
          "Unlike the original AION where defeated mobs drop gear, AION 2 lets you convert defeated mobs into companions. The range runs from a cute little bunny to a giant eldritch beast that carries you around town on its back or in a coffin.",
          "More than 200 pets are available, and the team made a deliberate choice to keep almost every mob eligible. Senior producer Andrew Long called this 'a disaster' from a resource standpoint but the team stayed 'headstrong about seeing through' the idea.",
          "Pets function as both collection content and emotional anchors — a design that signals how much production headroom the sequel has over the original."
        ]),
        section("acquisition-methods", "Acquisition: What You Collect, What You Transform", [
          "Pets are obtained by defeating mobs and choosing conversion over standard loot. There is no traditional 'pet shop' — the world itself is the collection source.",
          "This means area familiarity matters: knowing which mobs spawn where directly translates into knowing which pets are available. Exploration and repeat visits to mob-dense zones are the primary collection strategy.",
          "Some pets may have additional unlock conditions tied to story progress, zones reached, or special encounters — the exact gating was not fully detailed in the demo."
        ]),
        section("monster-transformation", "Monster Transformation: The Hidden Combat Layer", [
          "Players can also transform into monsters during combat and use their abilities. This was confirmed by the team but not shown directly in the Gamescom demo build.",
          "Transformation adds a burst and utility layer on top of the standard pet-companion loop — it is not a passive collection feature but an active combat tool.",
          "Which monsters are available for transformation is not yet confirmed. The demo treated transformation as a tease rather than a fully documented system."
        ]),
        section("collection-routes", "Collection Routes for the First 32 Days", [
          "With 200+ pets and 32 days until the October 5 global launch, early collectors should prioritize zones with high mob density and varied mob types.",
          "The pet system doubles as a motivation to visit zones that might otherwise be skipped — even low-level areas have unique mob companions to claim.",
          "For players focused on PvP or raids, pets remain a parallel track: collection happens in the background while you engage with other endgame content."
        ]),
        section("wings-as-parallel", "Pets and Wings: Two Collection Tracks Running Together", [
          "Wings — the franchise's most recognizable visual feature — remain a separate but parallel status and collection system, unlocked through milestones and gameplay.",
          "Both pets and wings signal how far a player has traveled. Early-game, both tracks should be progressed together; neither requires sacrificing the other.",
          "Expect community guides and trading strategies to emerge once the collection pool is fully explored post-launch."
        ]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 6, {
      eyebrow: "宠物系统",
      title: "AION 2 宠物收集攻略：200+ 同伴、怪物变身与收集路线",
      description: "AION 2 的宠物系统让玩家把几乎任何怪都变成同伴——200 多只宠物从小兔到巨型古神巨兽。本攻略覆盖获取机制、怪物变身与 10 月 5 日前 32 天的优先级建议。",
      intro: "宠物系统是 AION 2 最醒目的收集回路——高级制作人 Andrew Long 承认让每个怪都可能变宠物烧掉的人力比计划的多。本攻略基于 Gamescom 2026 试玩（MMORPG.com 9/2）和播客 578 报道，解释系统如何运作、如何规划收集路线，以及怪物变身层的作用。",
      sourceNote: "基于 MMORPG.com 2026 年 9 月 2 日 Gamescom 试玩（Luis Gutierrez）以及 Massively OP Podcast 578（2026-09-01）。",
      keywords: ["AION 2 宠物", "AION 2 同伴收集", "AION 2 宠物获取", "AION 2 怪物变身", "AION 2 宠物攻略", "AION 2 怪变宠物"],
      sections: [
        section("how-pets-work", "宠物系统如何运作", ["原版 AION 中怪掉落装备，AION 2 中你可以选择把击败的怪转化为同伴。范围从小兔到巨型古神巨兽——后者能背你进城或把你装进棺材。", "超过 200 只宠物可选，团队刻意让几乎所有怪都符合条件。高级制作人 Andrew Long 称之为「人力灾难」，但团队「头铁」坚持做了。", "宠物同时是收集内容和情感锚点——这是 AION 2 相较原版制作深度的最直观信号。"]),
        section("acquisition-methods", "获取方式：收集什么、转化什么", ["宠物通过击败怪并选择转化（而非标准掉落）获得。没有传统「宠物商店」——世界本身就是收集来源。", "这意味着区域熟悉度很重要：知道哪个怪在哪出现，直接等于知道哪只宠物可用。探索与高密度怪区重复访问是主要策略。", "部分宠物可能受剧情进度、区域到达或特殊遭遇等额外条件限制——试玩版未完整说明。"]),
        section("monster-transformation", "怪物变身：隐藏的战斗层", ["玩家可以在战斗中变身成怪物并使用其技能。试玩版未直接展示，但团队已确认。", "变身在宠物-同伴回路之上添加爆发和工具层——它是主动战斗工具，而非被动收集特性。", "哪些怪可变身尚未确认。试玩将其作为悬念处理，而非完整说明。"]),
        section("collection-routes", "前 32 天收集路线", ["200+ 宠物和 10 月 5 日前 32 天——早期收集者应优先怪密度高、类型多的区域。", "宠物系统同时是访问低优先级区域的动机——即使是低等级区也有独特的怪同伴可收集。", "对专注 PvP 或副本的玩家而言，宠物是并行路线：收集在后台进行，不影响主线内容。"]),
        section("wings-as-parallel", "宠物与翅膀：两条并行收集线", ["翅膀——AION 系列最具标志性的视觉特征——是独立但平行的状态和收集系统，通过里程碑与玩法解锁。", "宠物与翅膀同时代表玩家走多远。前期两条线应一起推进，不需要放弃任一条。", "预计上线后社区攻略和交易策略会随收集池完整而涌现。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 6, {
      eyebrow: "펫 시스템",
      title: "AION 2 펫 수집 가이드: 200+ 컴패니언, 몬스터 변신, 수집 루트",
      description: "AION 2 펫 시스템: 거의 모든 몹을 컴패니언으로 만드는 200+ 펫, 토끼부터 거대 생물까지. 10월 5일까지 32일 동안의 수집 우선순위 가이드.",
      intro: "펫 시스템은 AION 2의 가장 눈에 띄는 수집 루프다. 시니어 프로듀서 Andrew Long은 모든 몹을 펫으로 만들면 자원이 넘쳐난다고 인정하면서도 팀은 이를 밀어붙였다. Gamescom 2026 데모(MMORPG.com 9/2)를 기반으로 작동 방식을 설명한다.",
      sourceNote: "MMORPG.com 2026년 9월 2일 Gamescom 핸즈온(Luis Gutierrez)과 Massively OP Podcast 578(2026-09-01) 쇼 노트 기반.",
      keywords: ["AION 2 펫", "AION 2 컴패니언 수집", "AION 2 펫 획득", "AION 2 몬스터 변신", "AION 2 펫 가이드"],
      sections: [
        section("how-pets-work", "펫 시스템 작동 방식", ["원작 AION에서는 몹이 장비로 떨어졌지만, AION 2는 몹을 컴패니언으로 변환할 수 있다. 토끼부터 거대 괴수까지. 200개 이상. Andrew Long은 자원 관점에서 '재난'이라고 말했다.", "펫은 수집 콘텐츠이자 감정적 연결고리다. 원작 대비 시퀀셜의 제작 여유를 가장 시각적으로 보여주는 신호다."]),
        section("acquisition-methods", "획득 방식: 무엇을 수집하고 무엇을 변환할까", ["펫은 몹을 물리치고 변환을 선택하면 획득한다. 전통 '펫 숍'이 없다. 지역 familiarity가 곧 펫 수집 능력이다."]),
        section("monster-transformation", "몬스터 변신: 숨겨진 전투 레이어", ["전투 중 몬스터로 변신하고 능력을 사용할 수 있다. 데모에서는 직접 보이지 않지만 확인된 기능. 펫-컴패니언 루프 위에 버스트·유틸리티 레이어."]),
        section("collection-routes", "첫 32일 수집 루트", ["200+ 펫과 10월 5일까지 32일. 초기 수집자는 고밀도·다양한 몹 지역을 우선. 펫은 다른 엔드게임 콘텐츠와 병행."]),
        section("wings-as-parallel", "펫과 날개: 두 수집 트랙", ["날개는 마일스톤과 게임 플레이로 해제되는 별개의 상태·수집 시스템. 펫과 날개는 동시에 진행한다."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 6, {
      eyebrow: "ペットシステム",
      title: "AION 2 ペット収集ガイド：200+ コンパニオン、モンスター変身、収集ルート",
      description: "AION 2のペットシステムは、ほぼすべてのモンスターをコンパニオンに変える200種超のペットを提供する。うさぎから巨大生物まで。10月5日前の32日間の収集優先順位ガイド。",
      intro: "ペットシステムはAION 2の最も可視的な収集ループ。シニアプロデューサーAndrew Longは全モンスターをペットにすることの規模を認めた上で、チームは突き進んだ。Gamescom 2026デモ(MMORPG.com 9/2)に基づく動作説明。",
      sourceNote: "MMORPG.com 2026年9月2日Gamescomハンズオン(Luis Gutierrez)とMassively OP Podcast 578(2026-09-01)ショーノートに基づいて作成。",
      keywords: ["AION 2 ペット", "AION 2 コンパニオン収集", "AION 2 ペット取得", "AION 2 モンスター変身", "AION 2 ペットガイド"],
      sections: [
        section("how-pets-work", "ペットシステムの仕組み", ["元作AIONでは敵が装備をドロップしたが、AION 2では倒れた敵をコンパニオンに変換可能。うさぎから巨大生物まで。Andrew Longは「資源上の災難」と冗談。", "200種超のペット、チームはほぼ全モンスターを条件に含めた。"]),
        section("acquisition-methods", "取得方法：何を収集し何を変換するか", ["ペットは敵を倒し変換を選択して取得。伝統的な「ペットショップ」はない。地区の熟知度が収集力に直結。"]),
        section("monster-transformation", "モンスター変身：戦闘レイヤー", ["戦闘中、モンスターに変身し能力を発動可能。デモでは未提示だが確認済みの機能。"]),
        section("collection-routes", "最初の32日間の収集ルート", ["200+ペット、10月5日前32日。高密度・多様性のある地区を優先。PvP/レイドと並行。"]),
        section("wings-as-parallel", "ペットと翼：並行収集", ["翼はマイルストーンとゲームプレイで解放される別系統。両方を同時に進行。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 6, {
      eyebrow: "SYSTÈME DE FAMILIERS",
      title: "Guide de collection de familiers d'AION 2: 200+ compagnons, transformation en monstre et itinéraires",
      description: "Le système de familiers permet de transformer presque chaque mob en compagnon — 200+ familiers du lapin à la bête géante. Guide couvrant l'acquisition, la transformation et les itinéraires pour les 32 premiers jours avant le 5 oct.",
      intro: "Le système de familiers est le boucle de collection la plus visible d'AION 2. Andrew Long a admis que rendre chaque mob possible en familier a brûlé plus de ressources que prévu.",
      sourceNote: "Basé sur MMORPG.com 2 sept. 2026 (Luis Gutierrez) et Massively OP Podcast 578 (1 sept. 2026).",
      keywords: ["AION 2 familiers", "AION 2 collection compagnons", "AION 2 acquisition", "AION 2 transformation monstre", "AION 2 guide familiers"],
      sections: [
        section("how-pets-work", "Comment fonctionne le système", ["Plutôt que de faire tomber des équipements, les mobs deviennent des familiers. 200+ familiers, du lapin à la bête géante. Andrew Long a qualifié cela de 'calvaire' en ressources."]),
        section("acquisition-methods", "Acquisition: quoi collecter, quoi transformer", ["Les familiers sont obtenus en convertissant les mobs vaincus. Pas de 'magasin de familiers' — le monde est la source. La familiarité avec les zones compte."]),
        section("monster-transformation", "Transformation en monstre: couche de combat", ["Les joueurs peuvent se transformer en monstre pendant le combat et utiliser leurs pouvoirs — confirmé mais pas montré."]),
        section("collection-routes", "Itinéraires pour les 32 premiers jours", ["200+ familiers et 32 jours avant le 5 oct. Les premiers collectionneurs devraient prioriser les zones à forte densité de mobs."]),
        section("wings-as-parallel", "Familiers et ailes: deux pistes parallèles", ["Les ailes restent un système de statut séparé, débloquées par les jalons. Les deux pistes se font en parallèle."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 6, {
      eyebrow: "HAUSTIER-SYSTEM",
      title: "AION 2 Haustier-Sammel-Guide: 200+ Gefährten, Monster-Verwandlung und Sammelrouten",
      description: "Das Haustier-System lässt fast jeden Mob zum Gefährten werden — 200+ Haustiere vom Hasen bis zum Riesen. Guide deckt Acquisition, Verwandlung und Sammelrouten für die ersten 32 Tage vor dem 5. Okt. ab.",
      intro: "Das Haustier-System ist der sichtbarste Sammelkreislauf von AION 2. Andrew Long räumte ein, dass die Ressourcen dafür weit über den Erwartungen lagen.",
      sourceNote: "Basierend auf MMORPG.com 2. Sept. 2026 (Luis Gutierrez) und Massively OP Podcast 578 (1. Sept. 2026).",
      keywords: ["AION 2 Haustiere", "AION 2 Gefährten-Sammlung", "AION 2 Erwerb", "AION 2 Monster-Verwandlung", "AION 2 Haustier-Guide"],
      sections: [
        section("how-pets-work", "Wie das System funktioniert", ["Statt Equipment zu droppen, werden Mobs zu Gefährten. 200+ Haustiere vom Hasen bis zum Riesen. Andrew Long nannte es scherzhaft eine 'Ressourcen-Katastrophe'."]),
        section("acquisition-methods", "Erwerb: was sammeln, was verwandeln", ["Haustiere werden durch Umwandlung besiegener Mobs erhalten. Kein 'Haustier-Laden' — die Welt ist die Quelle. Regionenkenntnis zählt."]),
        section("monster-transformation", "Monster-Verwandlung: Kampfschicht", ["Spieler können sich im Kampf in Monster verwandeln und deren Fähigkeiten nutzen — bestätigt, nicht gezeigt."]),
        section("collection-routes", "Sammelrouten für die ersten 32 Tage", ["200+ Haustiere und 32 Tage vor dem 5. Okt. Hochdichte-Regionen mit vielerlei Mob-Typen zuerst."]),
        section("wings-as-parallel", "Haustiere und Flügel: zwei parallele Spuren", ["Flügel bleiben ein separates Status-System. Beide Spuren parallel vorantreiben."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 6, {
      eyebrow: "SISTEMA DE MASCOTAS",
      title: "Guía de colección de mascotas de AION 2: 200+ compañeros, transformación en monstruo y rutas",
      description: "El sistema de mascotas convierte casi cualquier monstruo en compañero — 200+ mascotas del conejo a la bestia gigante. Guía cubre adquisición, transformación y rutas para los primeros 32 días antes del 5 de oct.",
      intro: "El sistema de mascotas es la bucle de colección más visible de AION 2. Andrew Long admitió que hacer mascotas de cada monstruo consumió más recursos de lo planeado.",
      sourceNote: "Basado en MMORPG.com 2 sept. 2026 (Luis Gutierrez) y Massively OP Podcast 578 (1 sept. 2026).",
      keywords: ["AION 2 mascotas", "AION 2 colección compañeros", "AION 2 adquisición", "AION 2 transformación monstruo", "AION 2 guía mascotas"],
      sections: [
        section("how-pets-work", "Cómo funciona el sistema", ["En lugar de soltar equipo, los monstruos se convierten en compañeros. 200+ mascotas, del conejo a la bestia gigante. Andrew Long lo llamó 'desastre' de recursos."]),
        section("acquisition-methods", "Adquisición: qué recolectar, qué transformar", ["Las mascotas se obtienen convirtiendo monstruos derrotados. No hay 'tienda de mascotas'. La familiaridad con las zonas importa."]),
        section("monster-transformation", "Transformación en monstruo: capa de combate", ["Los jugadores pueden transformarse en monstruos durante el combate y usar sus habilidades — confirmado pero no mostrado."]),
        section("collection-routes", "Rutas para los primeros 32 días", ["200+ mascotas y 32 días antes del 5 de oct. Priorizar zonas de alta densidad y variedad de monstruos."]),
        section("wings-as-parallel", "Mascotas y alas: dos pistas paralelas", ["Las alas siguen siendo un sistema de estado separado. Ambas pistas en paralelo."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 6, {
      eyebrow: "SISTEMA DE PETS",
      title: "Guia de coleta de pets de AION 2: 200+ companheiros, transformação em monstro e rotas",
      description: "O sistema de pets transforma quase qualquer mob em companheiro — 200+ pets de coelho a criatura gigante. Guia cobre aquisição, transformação e rotas para os primeiros 32 dias antes de 5 de out.",
      intro: "O sistema de pets é a espiral de coleta mais visível de AION 2. Andrew Long admitiu que fazer pets de todos os mobs consumiu mais recursos do que o planejado.",
      sourceNote: "Baseado em MMORPG.com 2 set. 2026 (Luis Gutierrez) e Massively OP Podcast 578 (1 set. 2026).",
      keywords: ["AION 2 pets", "AION 2 coleta companheiros", "AION 2 aquisição", "AION 2 transformação monstro", "AION 2 guia pets"],
      sections: [
        section("how-pets-work", "Como funciona o sistema", ["Em vez de soltar equipamento, mobs viram companheiros. 200+ pets, de coelho a criatura gigante. Andrew Long chamou de 'desastre' de recursos."]),
        section("acquisition-methods", "Aquisição: o que coletar, o que transformar", ["Pets são obtidos convertendo mobs derrotados. Sem 'loja de pets'. A familiaridade com zonas importa."]),
        section("monster-transformation", "Transformação em monstro: camada de combate", ["Jogadores podem se transformar em monstros durante o combate e usar habilidades — confirmado mas não mostrado."]),
        section("collection-routes", "Rotas para os primeiros 32 dias", ["200+ pets e 32 dias antes de 5 de out. Zonas de alta densidade e variedade em primeiro lugar."]),
        section("wings-as-parallel", "Pets e asas: duas trilhas paralelas", ["Asas continuam sendo um sistema de status separado. Ambas trilhas em paralelo."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 6, {
      eyebrow: "СИСТЕМА ПИТОМЦЕВ",
      title: "Гайд по коллекции питомцев AION 2: 200+ компаньонов, превращение в монстра и маршруты",
      description: "Система питомцев превращает почти любого моба в компаньона — 200+ питомцев от кролика до гигантского существа. Гайд по приобретению, превращению и маршрутам для первых 32 дней до 5 окт.",
      intro: "Система питомцев — самый заметный цикл коллекции в AION 2. Эндрю Лонг признал, что превращение всех мобов в питомцев потребовало больше ресурсов, чем планировалось.",
      sourceNote: "По данным MMORPG.com 2 сент. 2026 (Luis Gutierrez) и Massively OP Podcast 578 (1 сент. 2026).",
      keywords: ["AION 2 питомцы", "AION 2 коллекция компаньонов", "AION 2 приобретение", "AION 2 превращение монстра", "AION 2 гайд питомцы"],
      sections: [
        section("how-pets-work", "Как работает система", ["Вместо дропа экипировки, монстры становятся компаньонами. 200+ питомцев от кролика до гигантского существа. Лонг назвал это 'катастрофой' ресурсов."]),
        section("acquisition-methods", "Приобретение: что собирать, что превращать", ["Питомцы получаются превращением побеждённых мобов. Нет 'магазина питомцев'. Знание районов важно."]),
        section("monster-transformation", "Превращение в монстра: боевой слой", ["Игроки могут превращаться в монстров в бою и использовать способности — подтверждено, но не показано."]),
        section("collection-routes", "Маршруты для первых 32 дней", ["200+ питомцев и 32 дня до 5 окт. Сначала зоны с высокой плотностью и разнообразием мобов."]),
        section("wings-as-parallel", "Питомцы и крылья: два параллельных трека", ["Крылья остаются отдельной системой статуса. Оба трека параллельно."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 6, {
      eyebrow: "寵物系統",
      title: "AION 2 寵物收集攻略：200+ 同伴、怪物變身與收集路線",
      description: "AION 2 的寵物系統讓玩家把幾乎任何怪都變成同伴——200 多隻寵物從小兔到巨型古神巨獸。本攻略覆蓋獲取機制、怪物變身與 10 月 5 日前 32 天的優先級建議。",
      intro: "寵物系統是 AION 2 最醒目的收集回路——高級製作人 Andrew Long 承認讓每個怪都可能變寵物燒掉的人力比計畫的多。本攻略基於 Gamescom 2026 試玩（MMORPG.com 9/2）和播客 578 報導，解釋系統如何運作、如何規劃收集路線，以及怪物變身層的作用。",
      sourceNote: "基於 MMORPG.com 2026 年 9 月 2 日 Gamescom 試玩（Luis Gutierrez）以及 Massively OP Podcast 578（2026-09-01）。",
      keywords: ["AION 2 寵物", "AION 2 同伴收集", "AION 2 寵物獲取", "AION 2 怪物變身", "AION 2 寵物攻略"],
      sections: [
        section("how-pets-work", "寵物系統如何運作", ["原版 AION 中怪掉落裝備，AION 2 中你可以選擇把擊敗的怪轉化為同伴。範圍從小兔到巨型古神巨獸——後者能背你進城或把你裝進棺材。", "超過 200 隻寵物可選，團隊刻意讓幾乎所有怪都符合條件。高級製作人 Andrew Long 稱之為「人力災難」，但團隊「頭鐵」堅持做了。", "寵物同時是收集內容也是情感錨點——這是 AION 2 相較原版投入深度的最直觀信號。"]),
        section("acquisition-methods", "獲取方式：收集什麼、轉化什麼", ["寵物透過擊敗怪並選擇轉化（而非標準掉落）獲得。沒有傳統「寵物商店」——世界本身就是收集來源。", "這意味著區域熟悉度很重要：知道哪個怪在哪出現，直接等於知道哪隻寵物可用。", "部分寵物可能受劇情進度、區域到達或特殊遭遇等額外條件限制——試玩版未完整說明。"]),
        section("monster-transformation", "怪物變身：隱藏的戰鬥層", ["玩家可以 在戰鬥中變身成怪物並使用其技能。試玩版未直接展示，但團隊已確認。", "變身在寵物-同伴回路之上添加爆發和工具層——它是主動戰鬥工具，而非被動收集特性。", "哪些怪可變身尚未確認。試玩將其作為懸念處理，而非完整說明。"]),
        section("collection-routes", "前 32 天收集路線", ["200+ 寵物和 10 月 5 日前 32 天——早期收集者應優先怪密度高、類型多的區域。", "寵物系統同時是訪問低優先級區域的動機——即使是低等級區也有獨特的怪同伴可收集。", "對專注 PvP 或副本的玩家而言，寵物是並行路線：收集在後台進行，不影響主線內容。"]),
        section("wings-as-parallel", "寵物與翅膀：兩條並行收集線", ["翅膀——AION 系列最具標誌性的視覺特徵——是獨立但平行的狀態和收集系統，透過里程碑與玩法解鎖。", "寵物與翅膀同時代表玩家走多遠。前期兩條線應一起推進，不需要放棄任一條。", "預計上線後社群攻略和交易策略會隨收集池完整而出現。"]),
      ],
    }),
  },
};