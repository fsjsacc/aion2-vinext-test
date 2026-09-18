import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-20-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 1 — Mounts & Wings guide */

const mountSource1: ContentSource = {
  id: "aion2hub-mounts-2026-08-20", kind: "third-party", publisher: "AION2Hub",
  label: "AION 2 Mounts & Pets — 200+ Collection System Overview",
  url: "https://aion2hub.com/", publishedAt: "2026-08-10", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2 坐骑与宠物——200+ 收集系统概览", en: "AION 2 Mounts & Pets — 200+ Collection System Overview", fr: "AION 2 Montures et animaux — aperçu du système de collection 200+", de: "AION 2 Reittiere & Haustiere — Übersicht über das 200+-Sammelsystem", es: "AION 2 Monturas y mascotas — descripción general del sistema de colección 200+", ja: "AION 2 マウント&ペット — 200+コレクションシステム概要", "pt-br": "AION 2 Montarias e pets — visão geral do sistema de coleção 200+", ru: "AION 2 Скакуны и питомцы — обзор системы коллекции 200+", ko: "AION 2 탈것·펫 — 200+ 컬렉션 시스템 개요", "zh-hant": "AION 2 坐騎與寵物——200+ 收集系統概覽", }, "https://aion2hub.com/"),
};
const mountSource2: ContentSource = {
  id: "mmobomb-stream-mounts-2026-08-20", kind: "third-party", publisher: "MMOBomb",
  label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream",
  url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream",
  publishedAt: "2026-08-10", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "NC 首次全球开发者直播：Aion 2 玩家可期待什么", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre du lancement", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar en el lanzamiento", ja: "NCが初のグローバル開発者ストリームでAion 2プレイヤーが発売時に期待できることを共有", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar no lançamento", ru: "NC делится тем, что игроки Aion 2 могут ожидать от запуска", ko: "NC, 첫 글로벌 개발자 스트림에서 Aion 2 플레이어가 출시 시 기대할 수 있는 것 공유", "zh-hant": "NC 首次全球開發者直播：Aion 2 玩家可期待什麼", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"),
};
const mountSource3: ContentSource = {
  id: "plaync-mounts-2026-08-20", kind: "official", publisher: "NCSOFT",
  label: "AION 2 (KR) — 탈것/날개 시스템 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-20", verifiedAt: "2026-08-20",
  localizations: localizations({ "zh-hans": "AION 2（韩服）— 坐骑/翅膀系统说明", en: "AION 2 (KR) — Mount/Wings System Guide", fr: "AION 2 (KR) — Guide du système de montures/ailes", de: "AION 2 (KR) — Reittier/Flügel-System-Guide", es: "AION 2 (KR) — Guía del sistema de monturas/alas", ja: "AION 2 (KR) — マウント/翼システムガイド", "pt-br": "AION 2 (KR) — Guia do sistema de montarias/asas", ru: "AION 2 (KR) — Гайд по системе скакунов/крыльев", ko: "AION 2 (KR) — 탈것/날개 시스템 안내", "zh-hant": "AION 2（韓服）— 坐騎/翅膀系統說明", }, "https://aion2.plaync.com/ko-kr/board/notice"),
};
const mountHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605,
  credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media",
  translations: { "zh-hans": { alt: "坐骑与翅膀指南配图", caption: "NC 官方配图；Aion 2 提供 200+ 坐骑与宠物，并支持翅膀外观系统。" }, en: { alt: "Mounts and wings guide image", caption: "Official NC artwork; Aion 2 offers 200+ mounts and pets alongside a wing glamour system." }, fr: { alt: "Image du guide des montures et ailes", caption: "Visuel officiel NC ; Aion 2 offre 200+ montures et animaux avec un système d'appaence d'ailes." }, de: { alt: "Reittier- und Flügel-Guide-Bild", caption: "Offizielles NC-Artwork; Aion 2 bietet 200+ Reittiere und Haustiere mit einem Flügel-Erscheinungssystem." }, es: { alt: "Imagen de la guía de monturas y alas", caption: "Arte oficial de NC; Aion 2 ofrece 200+ monturas y mascotas con un sistema de apariencia de alas." }, ja: { alt: "マウントと翼ガイド画像", caption: "NC公式アートワーク；Aion 2 は200以上のマウントとペットに加え、翼の見た目システムを提供します。" }, "pt-br": { alt: "Imagem do guia de montarias e asas", caption: "Arte oficial da NC; Aion 2 oferece 200+ montarias e pets com sistema de aparência de asas." }, ru: { alt: "Изображение гайда по скакунам и крыльям", caption: "Официальный арт NC; Aion 2 предлагает 200+ скакунов и питомцев с системой внешнего вида крыльев." }, ko: { alt: "탈것·날개 가이드 이미지", caption: "NC 공식 이미지입니다. Aion 2는 200개 이상의 탈것과 펫, 그리고 날개 외형 시스템을 제공합니다." }, "zh-hant": { alt: "坐騎與翅膀指南配圖", caption: "NC 官方配圖；Aion 2 提供 200+ 坐騎與寵物，並支援翅膀外觀系統。" }, },
};

export const trendingAugust20Article1: ContentEntry = {
  section: "guides", slug: "aion-2-mounts-and-wings-guide", schemaType: "Article",
  publishedAt: "2026-08-20", updatedAt: "2026-08-20", readingMinutes: 5,
  publication: publishedVerified,
  sources: [mountSource1, mountSource2, mountSource3],
  heroImage: mountHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-pet-system-guide" },
    { kind: "content", section: "news", slug: "aion-2-first-global-dev-stream-recap" },
    { kind: "content", section: "guides", slug: "aion-2-character-customization-guide" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "SYSTEM GUIDE", title: "Aion 2 Mounts & Wings Guide: 200+ Rides, Flying & Glamour",
      description: "Aion 2 ships with over 200 mounts and pets plus a wing system for flying. Here's how mounts, wings, and the glamour system work — and what to collect first.",
      intro: "Travel in Aion 2 is split between ground mounts and the signature wing flights of the Aion series. With over 200 mounts and pets confirmed for launch, plus a wing glamour system that lets you swap appearances freely, understanding how these systems work early helps you spend your collection budget wisely. This guide covers mounts, wings, and the cosmetic rules around them.",
      sourceNote: "Based on the August 7 global developer stream, MMOBomb's recap, and the official KR service structure. Collection counts reflect NCSoft's confirmed numbers.",
      keywords: ["Aion 2 mounts", "Aion 2 wings", "Aion 2 flying", "Aion 2 mount collection", "Aion 2 glamour"],
      sections: [
        section("mounts", "Mounts: 200+ Rides at Launch", ["Aion 2 launches with over 200 pets and mounts combined, and many creatures serve as both a pet companion and a ride. Mounts speed up overworld travel and are collected through quests, events, the cash shop, and seasonal passes.", "The collection is primarily cosmetic plus mobility — mounts do not carry combat bonuses. That makes collection decisions about style and rarity rather than power, a friendly system for launch."]),
        section("wings", "Wings & Flying", ["Flying is a core Aion identity feature. Characters unlock flight through the campaign and gain wing abilities as they progress. In the open world, wing flights cover long distances and unlock vertical exploration — some zones are only reachable by air.", "The dev stream confirmed a wing glamour system: you can collect wing skins and swap their appearance freely without losing the underlying flight stats. Cosmetic wing styles are expected to be a major collection theme from the shop and season passes."]),
        section("glamour", "Glamour & Appearance Rules", ["The glamour system lets you overlay cosmetic looks onto functional items. For wings specifically, the system separates the skin you see from the flight utility underneath.", "The same principle extends to pets and mounts in many cases — collect the cosmetic variant you like, keep the functionality you need. This keeps the 200+ collection strictly additive rather than gear-progression pressure."]),
        section("collect", "What to Collect First", ["For launch, prioritize mounts that also function as pets for auto-loot efficiency (see our pet guide), then work on the campaign flight quests to unlock flying as early as possible.", "After that, collect by preference: season pass rewards and founder perks include mounts, so check what your pack already grants before spending in the cash shop. The collection is a marathon, not a day-one race."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "系统指南", title: "Aion 2 坐骑与翅膀指南：200+ 坐骑、飞行与幻化",
      description: "Aion 2 上线时提供超过 200 种坐骑与宠物，还有用于飞行的翅膀系统。了解坐骑、翅膀与幻化系统如何运作——以及先收集什么。",
      intro: "Aion 2 的旅行分为地面坐骑与 Aion 系列标志性的翅膀飞行。随着上线确认的 200+ 坐骑与宠物，以及可自由更换外观的翅膀幻化系统，尽早了解这些系统的运作有助于合理分配收集预算。本指南涵盖坐骑、翅膀与相关外观规则。",
      sourceNote: "基于 8 月 7 日全球开发者直播、MMOBomb 的总结与官方韩服服务结构。收集数量反映 NCSoft 确认的数据。",
      keywords: ["Aion 2 坐骑", "Aion 2 翅膀", "Aion 2 飞行", "Aion 2 坐骑收集", "Aion 2 幻化"],
      sections: [
        section("mounts", "坐骑：上线时 200+ 坐骑", ["Aion 2 上线时提供 200+ 宠物与坐骑，许多生物同时兼具宠物伙伴与坐骑功能。坐骑加快世界旅行速度，通过任务、活动、商城与赛季通行证收集。", "收集主要是外观与机动性——坐骑不携带战斗加成。这使得收集决策关乎风格与稀有度而非强度，对上线友好。"]),
        section("wings", "翅膀与飞行", ["飞行是 Aion 的核心身份特征。角色通过战役解锁飞行，随进度获得翅膀能力。在开放世界，翅膀飞行覆盖长距离并解锁垂直探索——有些区域只能空中到达。", "开发者直播确认了翅膀幻化系统：可收集翅膀外观并自由更换，不损失底层飞行属性。翅膀外观预计将成为商城与赛季通行证的主要收集主题。"]),
        section("glamour", "幻化与外观规则", ["幻化系统允许将外观覆盖到功能物品上。对翅膀而言，系统将可见皮肤与底下的飞行功能分离。", "同样的原则在许多情况下延伸到宠物与坐骑——收集你喜欢的外观变体，保留所需功能。这使 200+ 收集严格为增量式，而非装备压力。"]),
        section("collect", "先收集什么", ["上线时，优先选择兼具宠物功能的坐骑（自动拾取效率，见宠物指南），然后尽早推进战役飞行任务以解锁飞行。", "之后按喜好收集：赛季通行证奖励与创始人权益包含坐骑，直接在商城消费前先检查你的包已赠送什么。收集是马拉松，不是首日竞赛。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "시스템 가이드", title: "Aion 2 탈것·날개 가이드: 200개 이상의 탈것, 비행과 글래머",
      description: "Aion 2는 200개 이상의 탈것과 펫, 그리고 비행용 날개 시스템과 함께 출시됩니다. 탈것, 날개, 글래머 시스템의 작동 방식과 우선 수집 목록을 알아보세요.",
      intro: "Aion 2의 이동은 지상 탈것과 Aion 시리즈의 상징인 날개 비행으로 나뉩니다. 출시 확정 200+ 탈것과 펫, 그리고 외형을 자유롭게 바꾸는 날개 글래머 시스템을 통해, 이 시스템을 일찍 이해하면 수집 예산을 현명하게 쓸 수 있습니다.",
      sourceNote: "8월 7일 글로벌 개발자 스트림, MMOBomb 요약, 공식 KR 서비스 구조에 기반합니다.",
      keywords: ["Aion 2 탈것", "Aion 2 날개", "Aion 2 비행", "Aion 2 탈것 컬렉션", "Aion 2 글래머"],
      sections: [
        section("mounts", "탈것: 출시 시 200개 이상", ["Aion 2는 200개 이상의 펫과 탈것으로 출시되며, 많은 생물이 펫과 탈것을 겸합니다. 탈것은 오버월드 이동을 가속하며 퀘스트, 이벤트, 캐시샵, 시즌 패스로 수집합니다.", "수집은 주로 외형과 이동성 — 탈것에 전투 보너스는 없습니다."]),
        section("wings", "날개와 비행", ["비행은 Aion의 핵심 정체성입니다. 캐릭터는 캠페인을 통해 비행을 해금합니다. 날개 외형 시스템은 비행 능력을 잃지 않고 외형을 교체합니다."]),
        section("glamour", "글래머와 외형 규칙", ["글래머 시스템은 기능 아이템 위에 코스메틱 외형을 입힙니다. 날개는 표시되는 스킨과 비행 기능을 분리합니다."]),
        section("collect", "우선 수집 목록", ["출시 시 펫 기능을 겸하는 탈것을 우선시하고(자동 루팅 효율), 캠페인 비행 퀘스트를 빨리 진행하세요. 시즌 패스와 파운더스 팩 혜택을 먼저 확인하세요."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "システムガイド", title: "Aion 2 マウント&翼ガイド：200以上の乗り物、飛行とグラマー",
      description: "Aion 2 は200以上のマウントとペット、そして飛行用の翼システムとともにローンチします。マウント、翼、グラマーシステムの仕組みと優先収集アイテムを解説します。",
      intro: "Aion 2 の移動は地上マウントと Aion シリーズの象徴である翼飛行に分かれます。200以上のマウントとペットに加え、外観を自由に変えられる翼グラマーシステムにより、コレクション予算を賢く使うための知識をこのガイドで得られます。",
      sourceNote: "8月7日のグローバル開発者ストリーム、MMOBomb の要約、公式 KR サービス構造に基づきます。",
      keywords: ["Aion 2 マウント", "Aion 2 翼", "Aion 2 飛行", "Aion 2 マウントコレクション", "Aion 2 グラマー"],
      sections: [
        section("mounts", "マウント：ローンチ時200以上", ["Aion 2 は200以上のペットとマウントでローンチし、多くの生物がペットとマウントを兼ねます。移動速度を高め、クエスト・イベント・キャッシュショップ・シーズンパスで収集します。", "収集は主に外観と機動性 — マウントに戦闘ボーナスはありません。"]),
        section("wings", "翼と飛行", ["飛行は Aion の核となるアイデンティティです。翼のグラマーシステムは、飛行能力を失わずに外観を交換します。"]),
        section("glamour", "グラマーと外観ルール", ["グラマーシステムは機能アイテムにコスメティック外観を重ねます。翼は見た目スキンと飛行機能を分離します。"]),
        section("collect", "優先収集リスト", ["ローンチ時はペット機能を兼ねるマウントを優先し(自動ルート効率)、キャンペーン飛行クエストを早めに進めましょう。シーズンパスとファウンダーズパック特典を先に確認してください。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE SYSTÈME", title: "Guide des montures et ailes d'Aion 2 : plus de 200 montures, vol et glamour",
      description: "Aion 2 lance avec plus de 200 montures et animaux et un système d'ailes. Comment fonctionnent montures, ailes et glamour — et que collectionner en premier.",
      intro: "Les montures au sol et le vol avec les ailes sont les deux facettes de la mobilité d'Aion 2, avec un système de glamour pour changer d'apparence.",
      sourceNote: "Basé sur le dev stream du 7 août, le récapitulatif MMOBomb et la structure officielle KR.",
      keywords: ["Aion 2 montures", "Aion 2 ailes", "Aion 2 vol", "Aion 2 glamour"],
      sections: [
        section("mounts", "Montures", ["200+ montures et animaux au lancement. Collecte via quêtes, événements, boutique et passes de saison. Aucun bonus de combat."]),
        section("wings", "Ailes et vol", ["Le vol est un élément identitaire. Système de glamour pour changer l'apparence sans perdre les stats."]),
        section("glamour", "Glamour", ["Apparence cosmétique superposée aux objets fonctionnels. Collection purement additive."]),
        section("collect", "Que collectionner d'abord", ["Montures doubles (animal+monture) pour l'auto-ramassage, puis les quêtes de vol de campagne."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "SYSTEM-GUIDE", title: "Aion 2 Reittier- & Flügel-Guide: 200+ Reittiere, Fliegen und Glamour",
      description: "Aion 2 startet mit über 200 Reittieren und Haustieren plus Flügelsystem. Wie Reittiere, Flügel und Glamour funktionieren — und was man zuerst sammelt.",
      intro: "Boden-Reittiere und das Fliegen mit Flügeln sind die beiden Seiten der Mobilität von Aion 2, mit einem Glamour-System für Erscheinungswechsel.",
      sourceNote: "Basierend auf dem Dev-Stream vom 7. August, dem MMOBomb-Recap und der offiziellen KR-Struktur.",
      keywords: ["Aion 2 Reittiere", "Aion 2 Flügel", "Aion 2 Fliegen", "Aion 2 Glamour"],
      sections: [
        section("mounts", "Reittiere", ["200+ Reittiere und Haustiere beim Launch. Sammeln via Quests, Events, Shop und Saisonpass. Keine Kampfboni."]),
        section("wings", "Flügel und Fliegen", ["Fliegen ist ein Identitätselement. Glamour-System für Erscheinungswechsel ohne Statverlust."]),
        section("glamour", "Glamour", ["Kosmetische Optik auf funktionalen Gegenständen. Rein additive Sammlung."]),
        section("collect", "Was zuerst sammeln", ["Doppel-Reittiere (Tier+Reittier) für Auto-Loot, dann die Kampagnen-Flugquests."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA DEL SISTEMA", title: "Guía de monturas y alas de Aion 2: más de 200 monturas, vuelo y glamour",
      description: "Aion 2 lanza con más de 200 monturas y mascotas y un sistema de alas. Cómo funcionan monturas, alas y glamour, y qué coleccionar primero.",
      intro: "Las monturas terrestres y el vuelo con alas son las dos facetas de la movilidad de Aion 2, con un sistema de glamour para cambiar de apariencia.",
      sourceNote: "Basado en el dev stream del 7 de agosto, el resumen de MMOBomb y la estructura oficial de KR.",
      keywords: ["Aion 2 monturas", "Aion 2 alas", "Aion 2 vuelo", "Aion 2 glamour"],
      sections: [
        section("mounts", "Monturas", ["Más de 200 monturas y mascotas en el lanzamiento. Colección vía misiones, eventos, tienda y pases de temporada. Sin bonos de combate."]),
        section("wings", "Alas y vuelo", ["El vuelo es un elemento identitario. Sistema de glamour para cambiar apariencia sin perder estadísticas."]),
        section("glamour", "Glamour", ["Apariencia cosmética superpuesta a objetos funcionales. Colección puramente aditiva."]),
        section("collect", "Qué coleccionar primero", ["Monturas dobles (mascota+montura) para auto-recolección, luego las misiones de vuelo de campaña."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA DO SISTEMA", title: "Guia de montarias e asas de Aion 2: mais de 200 montarias, voo e glamour",
      description: "Aion 2 lança com mais de 200 montarias e pets e um sistema de asas. Como funcionam montarias, asas e glamour, e o que colecionar primeiro.",
      intro: "As montarias terrestres e o voo com asas são as duas facetas da mobilidade de Aion 2, com um sistema de glamour para trocar de aparência.",
      sourceNote: "Baseado no dev stream de 7 de agosto, no resumo da MMOBomb e na estrutura oficial da KR.",
      keywords: ["Aion 2 montarias", "Aion 2 asas", "Aion 2 voo", "Aion 2 glamour"],
      sections: [
        section("mounts", "Montarias", ["Mais de 200 montarias e pets no lançamento. Coleção via missões, eventos, loja e passes de temporada. Sem bônus de combate."]),
        section("wings", "Asas e voo", ["O voo é um elemento identitário. Sistema de glamour para trocar aparência sem perder stats."]),
        section("glamour", "Glamour", ["Aparência cosmética sobre itens funcionais. Coleção puramente aditiva."]),
        section("collect", "O que colecionar primeiro", ["Montarias duplas (pet+montaria) para auto-loot, depois as missões de voo da campanha."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "ГАЙД ПО СИСТЕМЕ", title: "Гайд по скакунам и крыльям Aion 2: 200+ скакунов, полёт и гламур",
      description: "Aion 2 запускается с 200+ скакунами и питомцами плюс системой крыльев. Механика скакунов, крыльев и гламура — и что собирать первым.",
      intro: "Наземные скакуны и полёт на крыльях — две грани мобильности Aion 2, с системой гламура для смены внешности.",
      sourceNote: "На основе dev-стрима от 7 августа, резюме MMOBomb и официальной структуры KR.",
      keywords: ["Aion 2 скакуны", "Aion 2 крылья", "Aion 2 полёт", "Aion 2 гламур"],
      sections: [
        section("mounts", "Скакуны", ["200+ скакунов и питомцев при запуске. Сбор через квесты, события, магазин и сезонные пропуска. Без бонусов к бою."]),
        section("wings", "Крылья и полёт", ["Полёт — фирменная черта. Система гламура для смены внешности без потери статов."]),
        section("glamour", "Гламур", ["Косметический вид поверх функциональных предметов. Чисто аддитивная коллекция."]),
        section("collect", "Что собирать первым", ["Двойные скакуны (питомец+скакун) для автосбора, затем кампанийские квесты полёта."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "系統指南", title: "Aion 2 坐騎與翅膀指南：200+ 坐騎、飛行與幻化",
      description: "Aion 2 上線時提供超過 200 種坐騎與寵物，還有用於飛行的翅膀系統。了解坐騎、翅膀與幻化系統如何運作——以及先收集什麼。",
      intro: "Aion 2 的旅行分為地面坐騎與 Aion 系列標誌性的翅膀飛行。隨著上線確認的 200+ 坐騎與寵物，以及可自由更換外觀的翅膀幻化系統，儘早了解這些系統的運作有助於合理分配收集預算。本指南涵蓋坐騎、翅膀與相關外觀規則。",
      sourceNote: "基於 8 月 7 日全球開發者直播、MMOBomb 的總結與官方韓服服務結構。收集數量反映 NCSoft 確認的數據。",
      keywords: ["Aion 2 坐騎", "Aion 2 翅膀", "Aion 2 飛行", "Aion 2 坐騎收集", "Aion 2 幻化"],
      sections: [
        section("mounts", "坐騎：上線時 200+ 坐騎", ["Aion 2 上線時提供 200+ 寵物與坐騎，許多生物同時兼具寵物夥伴與坐騎功能。坐騎加快世界旅行速度，透過任務、活動、商城與賽季通行證收集。", "收集主要是外觀與機動性——坐騎不攜帶戰鬥加成。這使得收集決策關乎風格與稀有度而非強度，對上線友善。"]),
        section("wings", "翅膀與飛行", ["飛行是 Aion 的核心身分特徵。角色透過戰役解鎖飛行，隨進度獲得翅膀能力。在開放世界，翅膀飛行覆蓋長距離並解鎖垂直探索——有些區域只能空中到達。", "開發者直播確認了翅膀幻化系統：可收集翅膀外觀並自由更換，不損失底層飛行屬性。翅膀外觀預計將成為商城與賽季通行證的主要收集主題。"]),
        section("glamour", "幻化與外觀規則", ["幻化系統允許將外觀覆蓋到功能物品上。對翅膀而言，系統將可見皮膚與底下的飛行功能分離。", "同樣的原則在許多情況下延伸到寵物與坐騎——收集你喜歡的外觀變體，保留所需功能。這使 200+ 收集嚴格為增量式，而非裝備壓力。"]),
        section("collect", "先收集什麼", ["上線時，優先選擇兼具寵物功能的坐騎（自動拾取效率，見寵物指南），然後儘早推進戰役飛行任務以解鎖飛行。", "之後按喜好收集：賽季通行證獎勵與創始人權益包含坐騎，直接在商城消費前先檢查你的包已贈送什麼。收集是馬拉松，不是首日競賽。"]),
      ],
    }),
  },
};