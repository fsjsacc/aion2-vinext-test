import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { SiteLocale } from "./site-config";
import {
  july30DailyNewsEntry,
  july30DailyNewsGeneratedEditorialEntry,
} from "./daily-news-july-30-content";

type LocalizedArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote" | "sections"
> & { keywords?: readonly string[] };

type ArticleLabels = Pick<
  LocalizedContent,
  | "backLabel"
  | "contentsLabel"
  | "publishedLabel"
  | "updatedLabel"
  | "relatedLabel"
>;

const labels: Record<SiteLocale, ArticleLabels> = {
  "zh-hans": {
    backLabel: "返回新闻中心",
    contentsLabel: "本期重点",
    publishedLabel: "发布",
    updatedLabel: "最后核对",
    relatedLabel: "延伸阅读",
  },
  en: {
    backLabel: "Back to news",
    contentsLabel: "In this report",
    publishedLabel: "Published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  fr: {
    backLabel: "Retour aux actualités",
    contentsLabel: "Dans ce rapport",
    publishedLabel: "Publié",
    updatedLabel: "Dernière vérification",
    relatedLabel: "À lire aussi",
  },
  de: {
    backLabel: "Zurück zu den News",
    contentsLabel: "In diesem Bericht",
    publishedLabel: "Veröffentlicht",
    updatedLabel: "Zuletzt geprüft",
    relatedLabel: "Weiterführende Artikel",
  },
  es: {
    backLabel: "Volver a noticias",
    contentsLabel: "En este informe",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificación",
    relatedLabel: "Lecturas relacionadas",
  },
  ja: {
    backLabel: "ニュース一覧へ",
    contentsLabel: "この記事の要点",
    publishedLabel: "公開日",
    updatedLabel: "最終確認",
    relatedLabel: "関連記事",
  },
  "pt-br": {
    backLabel: "Voltar às notícias",
    contentsLabel: "Neste relatório",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificação",
    relatedLabel: "Leituras relacionadas",
  },
  ru: {
    backLabel: "Назад к новостям",
    contentsLabel: "В этом материале",
    publishedLabel: "Опубликовано",
    updatedLabel: "Последняя проверка",
    relatedLabel: "Читайте также",
  },
  ko: {
    backLabel: "뉴스로 돌아가기",
    contentsLabel: "이번 소식의 핵심",
    publishedLabel: "게시일",
    updatedLabel: "최종 확인",
    relatedLabel: "관련 글",
  },
  "zh-hant": {
    backLabel: "返回新聞中心",
    contentsLabel: "本期重點",
    publishedLabel: "發布",
    updatedLabel: "最後核對",
    relatedLabel: "延伸閱讀",
  },
};

const readingTime: Record<SiteLocale, string> = {
  "zh-hans": "约 6 分钟",
  en: "6 min read",
  fr: "6 min de lecture",
  de: "6 Min. Lesezeit",
  es: "6 min de lectura",
  ja: "約6分",
  "pt-br": "6 min de leitura",
  ru: "6 мин чтения",
  ko: "약 6분",
  "zh-hant": "約 6 分鐘",
};

function articleCopy(
  locale: SiteLocale,
  body: LocalizedArticleBody,
): LocalizedContent {
  return {
    ...labels[locale],
    byline: "PFG",
    readingTime: readingTime[locale],
    ...body,
  };
}

const sourceLabels = {
  maintenance: {
    "zh-hans": "AION2 韩国服 7月29日例行维护公告",
    en: "Official AION2 Korea July 29 maintenance notice",
    fr: "Avis officiel de maintenance AION2 Corée du 29 juillet",
    de: "Offizielle AION2-Korea-Wartungsankündigung vom 29. Juli",
    es: "Aviso oficial de mantenimiento de AION2 Corea del 29 de julio",
    ja: "AION2韓国サービス 7月29日定期メンテナンス案内",
    "pt-br": "Aviso oficial de manutenção de AION2 Coreia em 29 de julho",
    ru: "Официальное уведомление о техработах AION2 Korea 29 июля",
    ko: "AION2 7월 29일 정기점검 공식 안내",
    "zh-hant": "AION2 韓國服 7 月 29 日例行維護公告",
  },
  update: {
    "zh-hans": "AION2 官方 7月29日更新说明",
    en: "Official AION2 July 29 update notes",
    fr: "Notes de mise à jour officielles AION2 du 29 juillet",
    de: "Offizielle AION2-Update-Hinweise vom 29. Juli",
    es: "Notas oficiales de la actualización de AION2 del 29 de julio",
    ja: "AION2公式 7月29日アップデートノート",
    "pt-br": "Notas oficiais da atualização de AION2 de 29 de julho",
    ru: "Официальные примечания к обновлению AION2 от 29 июля",
    ko: "AION2 7월 29일 공식 업데이트 노트",
    "zh-hant": "AION2 官方 7 月 29 日更新說明",
  },
  cm: {
    "zh-hans": "AION2 官方 CM 小屋：7月第5周更新新闻",
    en: "Official AION2 CM story: July week 5 update news",
    fr: "Chronique CM officielle AION2 : mise à jour de la 5e semaine de juillet",
    de: "Offizielle AION2-CM-Story: Update-News zur 5. Juliwoche",
    es: "Historia oficial del CM de AION2: novedades de la quinta semana de julio",
    ja: "AION2公式CMストーリー：7月第5週アップデートニュース",
    "pt-br": "História oficial do CM de AION2: novidades da 5ª semana de julho",
    ru: "Официальная заметка CM AION2: новости обновления пятой недели июля",
    ko: "AION2 공식 CM 아지트: 7월 5주차 업데이트 뉴스",
    "zh-hant": "AION2 官方 CM 小屋：7 月第 5 週更新新聞",
  },
  matching: {
    "zh-hans": "AION2 官方 Chapter 1 第三轮服务器匹配公告",
    en: "Official AION2 Chapter 1 third server-matching notice",
    fr: "Avis officiel AION2 sur le troisième appariement de serveurs du Chapter 1",
    de: "Offizielle AION2-Ankündigung zum dritten Chapter-1-Server-Matching",
    es: "Aviso oficial de AION2 sobre el tercer emparejamiento de servidores del Chapter 1",
    ja: "AION2公式 Chapter 1 第3次サーバーマッチング案内",
    "pt-br": "Aviso oficial de AION2 sobre o terceiro pareamento de servidores do Chapter 1",
    ru: "Официальное уведомление AION2 о третьем подборе серверов Chapter 1",
    ko: "AION2 공식 Chapter 1 3차 서버 매칭 안내",
    "zh-hant": "AION2 官方 Chapter 1 第三輪伺服器配對公告",
  },
  pass: {
    "zh-hans": "AION2 官方 Daeva Pass「蔚蓝海之歌」销售公告",
    en: "Official AION2 Song of the Blue Sea Daeva Pass notice",
    fr: "Avis officiel AION2 sur le Daeva Pass Song of the Blue Sea",
    de: "Offizielle AION2-Ankündigung zum Daeva Pass Song of the Blue Sea",
    es: "Aviso oficial del Daeva Pass Song of the Blue Sea de AION2",
    ja: "AION2公式 Daeva Pass「Song of the Blue Sea」販売案内",
    "pt-br": "Aviso oficial do Daeva Pass Song of the Blue Sea de AION2",
    ru: "Официальное уведомление AION2 о Daeva Pass Song of the Blue Sea",
    ko: "AION2 공식 데바 패스 '푸른 바다의 노래' 판매 안내",
    "zh-hant": "AION2 官方 Daeva Pass「蔚藍海之歌」販售公告",
  },
  founder: {
    "zh-hans": "AION 2 官方创始人包公告（7月22日）",
    en: "Official AION 2 Founder's Pack notice (July 22)",
    fr: "Annonce officielle du pack Fondateur d’AION 2 (22 juillet)",
    de: "Offizielle AION-2-Gründerpaket-Ankündigung (22. Juli)",
    es: "Aviso oficial del paquete de fundador de AION 2 (22 de julio)",
    ja: "AION 2公式ファウンダーズパック案内（7月22日）",
    "pt-br": "Aviso oficial do Pacote de Fundador de AION 2 (22 de julho)",
    ru: "Официальное объявление о наборе основателя AION 2 (22 июля)",
    ko: "AION 2 공식 파운더스 팩 안내(7월 22일)",
    "zh-hant": "AION 2 官方創始人包公告（7 月 22 日）",
  },
} as const satisfies Record<string, Record<SiteLocale, string>>;

function localizations(
  values: Record<SiteLocale, string>,
  url: string,
): NonNullable<ContentSource["localizations"]> {
  return Object.fromEntries(
    Object.entries(values).map(([locale, label]) => [
      locale,
      { label, url },
    ]),
  ) as NonNullable<ContentSource["localizations"]>;
}

const maintenanceUrl =
  "https://aion2.plaync.com/ko-kr/board/notice/view?articleId=6a688bb0065bf16436e45e08";
const updateUrl =
  "https://aion2.plaync.com/ko-kr/board/update/view?articleId=6a6903388bae191e2da7e2ed";
const cmStoryUrl =
  "https://aion2.plaync.com/ko-kr/board/cm_story/view?articleId=6a688bb0065bf16436e45dff";
const matchingUrl =
  "https://aion2.plaync.com/ko-kr/board/cm_story/view?articleId=6a688bb08bae191e2da7e2d1";
const passUrl =
  "https://aion2.plaync.com/ko-kr/board/notice/view?articleId=6a6903388370eb695191cb1b";
const founderUrl =
  "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f";

const sources: readonly ContentSource[] = [
  {
    id: "plaync-korea-maintenance-july-29-2026",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.maintenance.en,
    url: maintenanceUrl,
    publishedAt: "2026-07-28",
    retrievedAt: "2026-07-29",
    verifiedAt: "2026-07-29",
    localizations: localizations(sourceLabels.maintenance, maintenanceUrl),
  },
  {
    id: "plaync-july-29-update-note-2026",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.update.en,
    url: updateUrl,
    publishedAt: "2026-07-29",
    retrievedAt: "2026-07-29",
    verifiedAt: "2026-07-29",
    localizations: localizations(sourceLabels.update, updateUrl),
  },
  {
    id: "plaync-july-week5-cm-story-2026",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.cm.en,
    url: cmStoryUrl,
    publishedAt: "2026-07-28",
    retrievedAt: "2026-07-29",
    verifiedAt: "2026-07-29",
    localizations: localizations(sourceLabels.cm, cmStoryUrl),
  },
  {
    id: "plaync-chapter-1-third-server-matching-2026",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.matching.en,
    url: matchingUrl,
    publishedAt: "2026-07-28",
    retrievedAt: "2026-07-29",
    verifiedAt: "2026-07-29",
    localizations: localizations(sourceLabels.matching, matchingUrl),
  },
  {
    id: "plaync-song-of-blue-sea-daeva-pass-2026",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.pass.en,
    url: passUrl,
    publishedAt: "2026-07-29",
    retrievedAt: "2026-07-29",
    verifiedAt: "2026-07-29",
    localizations: localizations(sourceLabels.pass, passUrl),
  },
  {
    id: "plaync-global-founders-pack-2026-07-22",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.founder.en,
    url: founderUrl,
    publishedAt: "2026-07-22",
    retrievedAt: "2026-07-29",
    verifiedAt: "2026-07-29",
    localizations: localizations(sourceLabels.founder, founderUrl),
  },
];

const heroTranslations: ContentHeroImage["translations"] = {
  "zh-hans": {
    alt: "AION2 2026年7月第5周更新官方资讯图",
    caption: "NC Corporation 官方更新资讯图；具体开放时间与条件以游戏内及官方公告为准。",
  },
  en: {
    alt: "Official AION2 July week 5 update news artwork",
    caption: "Official NC Corporation update artwork; in-game timing and conditions remain authoritative.",
  },
  fr: {
    alt: "Visuel officiel de la mise à jour AION2 de la cinquième semaine de juillet",
    caption: "Visuel officiel de NC Corporation ; les horaires et conditions en jeu font foi.",
  },
  de: {
    alt: "Offizielles Artwork zum AION2-Update der fünften Juliwoche",
    caption: "Offizielles Update-Artwork von NC Corporation; maßgeblich sind Zeiten und Bedingungen im Spiel.",
  },
  es: {
    alt: "Imagen oficial de la actualización de AION2 de la quinta semana de julio",
    caption: "Imagen oficial de NC Corporation; prevalecen los horarios y condiciones indicados en el juego.",
  },
  ja: {
    alt: "AION2 7月第5週アップデートニュースの公式画像",
    caption: "NC Corporationの公式アップデート画像。実施時間と条件はゲーム内および公式告知が優先されます。",
  },
  "pt-br": {
    alt: "Arte oficial das novidades da atualização de AION2 da 5ª semana de julho",
    caption: "Arte oficial da NC Corporation; horários e condições exibidos no jogo são os definitivos.",
  },
  ru: {
    alt: "Официальный арт обновления AION2 за пятую неделю июля",
    caption: "Официальный арт NC Corporation; точные сроки и условия следует проверять в игре.",
  },
  ko: {
    alt: "AION2 2026년 7월 5주차 업데이트 뉴스 공식 이미지",
    caption: "NC Corporation 공식 업데이트 이미지이며, 세부 일정과 조건은 게임 내 및 공식 공지를 기준으로 합니다.",
  },
  "zh-hant": {
    alt: "AION2 2026 年 7 月第 5 週更新官方資訊圖",
    caption: "NC Corporation 官方更新資訊圖；實際開放時間與條件以遊戲內及官方公告為準。",
  },
};

const heroImage: ContentHeroImage = {
  src: "https://fizz-download.playnccdn.com/lg/file/aion2/download/19fa8ab9921-a4c59018-8842-47f3-a99a-41409b9293bf",
  width: 584,
  height: 298,
  credit: "NC Corporation",
  sourceUrl: cmStoryUrl,
  rights: "linked-official-media",
  presentation: "cover",
  translations: heroTranslations,
};

const translations: ContentEntry["translations"] = {
  "zh-hans": articleCopy("zh-hans", {
    eyebrow: "今日更新简报",
    title: "AION2 7月29日更新：宠物自动拾取、职业调整与第三轮服务器匹配",
    description:
      "整理7月29日韩国服维护、宠物自动拾取、七职业平衡、第三轮服务器匹配、新通行证与限时活动，并划清全球版已确认信息边界。",
    intro:
      "AION2 韩国服于7月29日04:30至09:30（KST）进行维护，正式更新说明现已发布。本次更新的核心不是单一副本，而是日常效率、职业平衡和服务器竞争格局同时变化；若运营条件后续调整，以官方修订和游戏内显示为准。",
    sourceNote:
      "资料核对：韩国服7月29日维护公告与正式更新说明、7月第5周 CM 简报、第三轮服务器匹配及 Daeva Pass 公告，以及7月22日全球版创始人包公告。本文实时内容仅适用于韩国服，不等同于未来全球版规则。",
    keywords: ["AION2 7月29日更新", "AION2 宠物自动拾取", "AION2 服务器匹配", "AION2 职业平衡"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "宠物自动拾取与日常体验优化",
        paragraphs: [
          "韩国服已加入宠物自动拾取商品：按角色以3,000,000基纳购买30天使用期，剩余有效期少于30天时才可再次使用。购买前仍应检查游戏内商店的“特殊”分类，因为销售状态与适用范围以实时说明为准。",
          "同批便利性改动包括隐藏宠物外观、无需返回大厅即可即时切换角色、材料转换支持更顺手的多选、巴克隆空岛重试流程优化，以及以太能量列表排序改善。它们不直接提高伤害，却会明显减少整理、移动和重复操作的时间。",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "七职业调整与第三轮服务器匹配",
        paragraphs: [
          "官方预告覆盖通用技能以及守护星、格斗家、弓星、护法星、治愈星、精灵星和魔道星。方向集中在PvE伤害、控制抗性、专精联动与状态效果；具体系数应在维护完成后逐项对照技能说明，不宜只凭预告直接重做整套配装。",
          "Chapter 1第三轮服务器匹配随本次维护启用，深渊与裂缝组合参考击杀、服务器战斗力、神器占领次数和战斗活跃度等指标。神器占领状态与深渊回廊使用信息已随轮换重置，因此军团应核对重置结果，并在新对手确定后再调整时段和据点策略。",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "新通行证、成长加速与限时外观",
        paragraphs: [
          "Daeva Pass“蔚蓝海之歌”限45级以上角色购买：基础档为2,000,000基纳，高级档为1,000 Quna，每个角色各限购一次；销售于8月25日05:00 KST结束，任务与领奖持续至8月26日维护前。购买前应核对截止时间与角色等级。",
          "7月29日至8月12日的远征与超越加速活动追加不稳定烙印碎片、混沌碎片或水晶碎片；混沌碎片可兑换熔岩之心防具选择箱，服务器限一次。Classic Athletic外观持续至8月26日维护前，并以角色名显示名牌。",
        ],
      },
      {
        id: "global-version-boundary",
        title: "全球版边界：9月30日抢先体验不等于完整上线日",
        paragraphs: [
          "全球版目前可确认的节点仍是创始人包对应的9月30日抢先体验。官方尚未在已核对来源中给出完整上线日、预载时间或服务器清单，因此不能把韩国服7月29日的价格、职业数值或活动奖励直接当作全球版承诺。",
          "当前玩家应先核对服务器匹配重置结果、宠物商品和技能面板，再决定基纳、Quna与配装投入；全球版玩家则应继续等待本地化公告，而不是依据本次韩国服更新提前消费。",
        ],
      },
    ],
  }),
  en: articleCopy("en", {
    eyebrow: "DAILY UPDATE BRIEF",
    title: "AION2 July 29 update: pet auto-loot, class changes, and third server matching",
    description:
      "A sourced guide to the July 29 Korean-service maintenance, pet auto-loot, seven-class balance pass, third server matching, new pass, and limited events.",
    intro:
      "AION2's Korean service underwent maintenance from 04:30 to 09:30 KST on July 29, and the full update notes are now published. The update changes everyday efficiency, class balance, and server competition at the same time. Official revisions and live in-game text take priority if operating conditions change.",
    sourceNote:
      "Checked against the Korean service's July 29 maintenance and update notes, the July week 5 CM brief, the third server-matching and Daeva Pass notices, and the July 22 global Founder's Pack notice. Live details in this report apply only to the Korean service and are not promises for the future global build.",
    keywords: ["AION2 July 29 update", "AION2 pet auto-loot", "AION2 server matching", "AION2 class balance"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "Pet auto-loot and everyday quality-of-life changes",
        paragraphs: [
          "The Korean service now offers pet auto-loot per character for 3,000,000 Kina per 30 days. It can be used again only when fewer than 30 days remain. Check the live shop's Special category before buying because availability and scope remain live service conditions.",
          "The same update adds a hide-pet option, instant character switching without returning to the lobby, smoother multi-selection for material conversion, a better Vakron Sky Island retry flow, and improved Aether Energy sorting. None is a direct damage increase, but together they reduce time spent on inventory work, travel, and repeated inputs.",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "Seven-class balance pass and third server matching",
        paragraphs: [
          "The preview covers common skills plus Templar, Brawler, Ranger, Chanter, Cleric, Spiritmaster, and Sorcerer. Its direction centers on PvE damage, control resistance, specialization links, and status effects. Compare every live coefficient with the post-maintenance skill text before rebuilding an entire loadout.",
          "Chapter 1's third server matching began with this maintenance. Abyss and Rift groupings use indicators including kills, server combat power, artifact occupations, and combat activity. Artifact occupation status and Abyss Corridor usage information reset with the rotation, so legions should verify the reset results and revise plans after their new opponents are confirmed.",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "New pass, progression boost, and limited outfit",
        paragraphs: [
          "The Song of the Blue Sea Daeva Pass is limited to level-45-or-higher characters. The basic track costs 2,000,000 Kina and Premium costs 1,000 Quna, each once per character. Sales end August 25 at 05:00 KST, while missions and reward claims remain open until maintenance on August 26.",
          "An Expedition and Transcendence boost from July 29 through August 12 adds Unstable Stigma Shards plus Chaos or Crystal fragments. Chaos fragments can be exchanged for a Lava Heart Armor Selection Box once per server. The Classic Athletic outfit also runs until maintenance on August 26 and displays the character name on its name tag.",
        ],
      },
      {
        id: "global-version-boundary",
        title: "Global boundary: September 30 early access is not a full launch date",
        paragraphs: [
          "For the global release, the confirmed milestone remains Founder's Pack early access on September 30. The reviewed official sources still do not specify the full launch date, preload timing, or server list, so the July 29 Korean-service prices, class values, and event rewards should not be treated as global promises.",
          "Current players should now verify the server-matching reset results, pet listing, and skill panels before committing Kina, Quna, or gear. Global players are better served by waiting for localized notices than by spending around assumptions from this Korean-service update.",
        ],
      },
    ],
  }),
  fr: articleCopy("fr", {
    eyebrow: "BRÈVE QUOTIDIENNE",
    title: "Mise à jour AION2 du 29 juillet : ramassage automatique par le familier, équilibrage et troisième appariement",
    description:
      "Synthèse sourcée de la maintenance du service coréen du 29 juillet, du ramassage automatique, de l’équilibrage de sept classes, du nouvel appariement et des événements.",
    intro:
      "Le service coréen d’AION2 a été maintenu le 29 juillet de 04 h 30 à 09 h 30 KST, et les notes complètes sont publiées. La mise à jour touche l’efficacité quotidienne, l’équilibrage et la compétition entre serveurs. Les révisions officielles et le texte en jeu restent prioritaires.",
    sourceNote:
      "Vérifié avec les avis coréens de maintenance et de mise à jour du 29 juillet, la brève CM, les avis d’appariement et de Daeva Pass, ainsi que l’annonce mondiale du pack Fondateur. Les détails en direct concernent uniquement le service coréen.",
    keywords: ["AION2 mise à jour 29 juillet", "AION2 ramassage automatique", "AION2 appariement serveurs", "AION2 équilibrage classes"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "Ramassage automatique du familier et confort de jeu",
        paragraphs: [
          "Le service coréen propose désormais le ramassage automatique par le familier, par personnage, pour 3 000 000 Kina pendant 30 jours. Il ne peut être réutilisé que lorsqu’il reste moins de 30 jours. Vérifiez la catégorie Special de la boutique avant l’achat.",
          "La mise à jour ajoute aussi le masquage du familier, le changement instantané de personnage sans repasser par le lobby, une multisélection plus pratique pour la conversion de matériaux, une nouvelle tentative améliorée sur Vakron Sky Island et un meilleur tri de l’Aether Energy.",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "Sept classes ajustées et troisième appariement de serveurs",
        paragraphs: [
          "L’aperçu couvre les compétences communes ainsi que Templar, Brawler, Ranger, Chanter, Cleric, Spiritmaster et Sorcerer. Il vise surtout les dégâts JcE, la résistance au contrôle, les spécialisations et les effets d’état. Comparez les coefficients après maintenance avant de refaire tout un équipement.",
          "Le troisième appariement de serveurs du Chapter 1 commence avec cette maintenance. Les groupes Abyss et Rift prennent notamment en compte les éliminations, la puissance du serveur, les occupations d’artefacts et l’activité de combat. L’état d’occupation et les données d’utilisation du couloir de l’Abyss sont réinitialisés.",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "Nouveau pass, accélération et tenue limitée",
        paragraphs: [
          "Le Daeva Pass Song of the Blue Sea est réservé aux personnages de niveau 45 ou plus : 2 000 000 Kina pour la piste de base et 1 000 Quna pour Premium, une fois chacune par personnage. Les ventes cessent le 25 août à 05 h 00 KST ; missions et récompenses restent ouvertes jusqu’à la maintenance du 26 août.",
          "Du 29 juillet au 12 août, un bonus Expedition et Transcendence ajoute des Unstable Stigma Shards et des fragments Chaos ou Crystal. Les fragments Chaos permettent un échange unique par serveur contre une Lava Heart Armor Selection Box. Classic Athletic reste disponible jusqu’à la maintenance du 26 août et son badge affiche le nom du personnage.",
        ],
      },
      {
        id: "global-version-boundary",
        title: "Version mondiale : l’accès anticipé du 30 septembre n’est pas la date de lancement complet",
        paragraphs: [
          "Pour la version mondiale, le jalon confirmé reste l’accès anticipé du pack Fondateur le 30 septembre. Les sources vérifiées ne donnent toujours ni date de lancement complet, ni préchargement, ni liste de serveurs ; les prix et valeurs régionaux du 29 juillet ne sont donc pas des promesses mondiales.",
          "Les joueurs actuels devraient maintenant vérifier la réinitialisation de l’appariement, la boutique du familier et les fiches de compétences avant de dépenser. Les joueurs mondiaux ont intérêt à attendre les annonces localisées.",
        ],
      },
    ],
  }),
  de: articleCopy("de", {
    eyebrow: "TÄGLICHES UPDATE-BRIEFING",
    title: "AION2-Update vom 29. Juli: Pet-Autoloot, Klassenänderungen und drittes Server-Matching",
    description:
      "Quellenbasierte Übersicht zu Wartung, Pet-Autoloot, Balance für sieben Klassen, drittem Server-Matching, neuem Pass und Events.",
    intro:
      "Der koreanische AION2-Dienst wurde am 29. Juli von 04:30 bis 09:30 Uhr KST gewartet; die vollständigen Update-Hinweise sind veröffentlicht. Das Update verändert Alltagseffizienz, Klassenbalance und Serverwettbewerb zugleich. Offizielle Korrekturen und aktuelle Spieltexte haben Vorrang.",
    sourceNote:
      "Abgeglichen mit den koreanischen Wartungs- und Update-Hinweisen vom 29. Juli, der CM-Kurzmeldung, den Ankündigungen zu Server-Matching und Daeva Pass sowie der globalen Gründerpaket-Ankündigung. Live-Details gelten nur für den koreanischen Dienst.",
    keywords: ["AION2 Update 29. Juli", "AION2 Pet Autoloot", "AION2 Server Matching", "AION2 Klassenbalance"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "Pet-Autoloot und Komfortverbesserungen",
        paragraphs: [
          "Der koreanische Dienst bietet Pet-Autoloot nun pro Charakter für 3.000.000 Kina je 30 Tage an. Es kann erst erneut verwendet werden, wenn weniger als 30 Tage Restlaufzeit bestehen. Prüft vor dem Kauf die Kategorie Special im Live-Shop.",
          "Hinzu kommen das Ausblenden des Pets, sofortiger Charakterwechsel ohne Rückkehr in die Lobby, bessere Mehrfachauswahl bei der Materialumwandlung, ein verbesserter Wiederholungsablauf auf Vakron Sky Island und eine übersichtlichere Sortierung der Aether Energy.",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "Balance für sieben Klassen und drittes Server-Matching",
        paragraphs: [
          "Die Vorschau umfasst allgemeine Fertigkeiten sowie Templar, Brawler, Ranger, Chanter, Cleric, Spiritmaster und Sorcerer. Im Mittelpunkt stehen PvE-Schaden, Kontrollresistenz, Spezialisierungen und Statuseffekte. Vergleicht nach der Wartung jeden Wert mit dem aktuellen Fertigkeitstext.",
          "Das dritte Server-Matching von Chapter 1 startet mit dieser Wartung. Für Abyss- und Rift-Gruppen zählen Kills, Serverkampfkraft, Artefaktbesetzungen und Kampfaktivität. Artefaktbesetzungsstatus und Nutzungsinformationen des Abyss-Korridors werden mit der Rotation zurückgesetzt.",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "Neuer Pass, Fortschrittsbonus und limitiertes Outfit",
        paragraphs: [
          "Der Daeva Pass Song of the Blue Sea ist für Charaktere ab Stufe 45: Basis kostet 2.000.000 Kina, Premium 1.000 Quna, jeweils einmal pro Charakter. Der Verkauf endet am 25. August um 05:00 Uhr KST; Missionen und Belohnungen bleiben bis zur Wartung am 26. August offen.",
          "Vom 29. Juli bis 12. August bringt ein Expedition- und Transcendence-Boost zusätzliche Unstable Stigma Shards sowie Chaos- oder Crystal-Fragmente. Chaos-Fragmente lassen sich serverweit einmal gegen eine Lava Heart Armor Selection Box tauschen. Classic Athletic bleibt bis zur Wartung am 26. August; das Namensschild zeigt den Charakternamen.",
        ],
      },
      {
        id: "global-version-boundary",
        title: "Globale Grenze: Early Access am 30. September ist kein vollständiger Starttermin",
        paragraphs: [
          "Für die globale Version ist weiterhin nur der Early Access des Gründerpakets am 30. September bestätigt. Die geprüften Quellen nennen weder den vollständigen Starttermin noch Preload oder Serverliste. Regionale Preise und Werte vom 29. Juli sind daher keine globalen Zusagen.",
          "Aktive Spieler sollten jetzt das zurückgesetzte Server-Matching, den Pet-Shop und die Fertigkeitsfenster prüfen. Global interessierte Spieler warten besser auf lokalisierte Bekanntmachungen.",
        ],
      },
    ],
  }),
  es: articleCopy("es", {
    eyebrow: "RESUMEN DIARIO",
    title: "Actualización de AION2 del 29 de julio: recogida automática por la mascota, ajustes y tercer emparejamiento",
    description:
      "Resumen con fuentes sobre mantenimiento, recogida automática, equilibrio de siete clases, tercer emparejamiento, nuevo pase y eventos.",
    intro:
      "El servicio coreano de AION2 tuvo mantenimiento el 29 de julio de 04:30 a 09:30 KST y ya publicó las notas completas. La actualización cambia a la vez la eficiencia diaria, el equilibrio y la competición entre servidores. Prevalecen las correcciones oficiales y el texto en vivo del juego.",
    sourceNote:
      "Contrastado con los avisos coreanos de mantenimiento y actualización del 29 de julio, el resumen del CM, los avisos de emparejamiento y Daeva Pass y el aviso global del paquete de fundador. Los datos en vivo solo se aplican al servicio coreano.",
    keywords: ["AION2 actualización 29 de julio", "AION2 recogida automática", "AION2 emparejamiento servidores", "AION2 equilibrio clases"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "Recogida automática de mascota y mejoras de comodidad",
        paragraphs: [
          "El servicio coreano ya ofrece recogida automática de objetos por la mascota, por personaje, por 3.000.000 de Kina durante 30 días. Solo puede usarse de nuevo cuando queden menos de 30 días. Revisa la categoría Special de la tienda antes de comprar.",
          "También llegan la opción de ocultar la mascota, el cambio instantáneo de personaje sin volver al lobby, una selección múltiple más cómoda para convertir materiales, un mejor reintento en Vakron Sky Island y una clasificación mejorada de Aether Energy.",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "Ajustes a siete clases y tercer emparejamiento de servidores",
        paragraphs: [
          "El avance cubre habilidades comunes y Templar, Brawler, Ranger, Chanter, Cleric, Spiritmaster y Sorcerer. Se centra en daño JcE, resistencia al control, especializaciones y estados. Hay que comparar cada coeficiente con el texto posterior al mantenimiento antes de rehacer una configuración.",
          "El tercer emparejamiento del Chapter 1 comienza con este mantenimiento. Los grupos de Abyss y Rift consideran bajas, poder de combate del servidor, ocupaciones de artefactos y actividad de combate. El estado de ocupación y la información de uso del corredor de Abyss se reinician con la rotación.",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "Nuevo pase, impulso de progreso y atuendo limitado",
        paragraphs: [
          "El Daeva Pass Song of the Blue Sea exige nivel 45 o superior: 2.000.000 de Kina para la ruta básica y 1.000 Quna para Premium, una vez cada una por personaje. La venta termina el 25 de agosto a las 05:00 KST; misiones y recompensas siguen hasta el mantenimiento del 26 de agosto.",
          "Del 29 de julio al 12 de agosto, un impulso de Expedition y Transcendence añade Unstable Stigma Shards y fragmentos Chaos o Crystal. Los Chaos se cambian una vez por servidor por una Lava Heart Armor Selection Box. Classic Athletic estará hasta el mantenimiento del 26 de agosto y su placa muestra el nombre del personaje.",
        ],
      },
      {
        id: "global-version-boundary",
        title: "Límite global: el acceso anticipado del 30 de septiembre no es el lanzamiento completo",
        paragraphs: [
          "Para la versión mundial, el único hito confirmado sigue siendo el acceso anticipado del paquete de fundador el 30 de septiembre. Las fuentes revisadas no indican lanzamiento completo, precarga ni lista de servidores, por lo que los precios y cifras regionales no son promesas globales.",
          "Los jugadores actuales deberían comprobar ahora el reinicio del emparejamiento, la tienda y las habilidades. Los jugadores globales deberían esperar anuncios localizados.",
        ],
      },
    ],
  }),
  ja: articleCopy("ja", {
    eyebrow: "本日のアップデート速報",
    title: "AION2 7月29日アップデート：ペット自動拾得、クラス調整、第3次サーバーマッチング",
    description:
      "7月29日の韓国サービスのメンテナンス、ペットによる自動拾得、7クラス調整、第3次サーバーマッチング、新パスとイベントを整理します。",
    intro:
      "AION2韓国サービスでは7月29日04:30から09:30 KSTまでメンテナンスが行われ、正式なアップデートノートが公開されました。今回は日課の効率、クラスバランス、サーバー競争が同時に変わります。公式の修正とゲーム内表示が優先されます。",
    sourceNote:
      "韓国サービスの7月29日メンテナンス／更新ノート、CM速報、第3次サーバーマッチングとDaeva Passの告知、グローバル版ファウンダーズパック告知を照合。ライブ情報は韓国サービスのみに適用されます。",
    keywords: ["AION2 7月29日アップデート", "AION2 ペット自動拾得", "AION2 サーバーマッチング", "AION2 クラス調整"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "ペット自動拾得と利便性改善",
        paragraphs: [
          "韓国サービスでは、キャラクター単位で30日間3,000,000 Kinaのペットによる自動拾得が追加されました。残り期間が30日未満の場合のみ再使用できます。購入前にゲーム内ショップのSpecialカテゴリを確認してください。",
          "ペットの表示／非表示切り替え、ロビーを経由しない即時キャラクター切替、素材変換の複数選択、Vakron Sky Islandの再挑戦導線、Aether Energyの並び替えも改善されます。火力ではなく反復操作の時間を減らす更新です。",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "7クラス調整と第3次サーバーマッチング",
        paragraphs: [
          "共通スキルに加え、Templar、Brawler、Ranger、Chanter、Cleric、Spiritmaster、Sorcererが対象です。PvEダメージ、行動妨害耐性、特化連携、状態効果が主眼。装備を全面変更する前に、メンテナンス後のスキル説明と数値を確認しましょう。",
          "Chapter 1の第3次サーバーマッチングは今回のメンテナンスから始まります。AbyssとRiftの組み合わせには撃破数、サーバー戦闘力、アーティファクト占領回数、戦闘活動度などが反映されます。占領状況とAbyss Corridorの利用情報はローテーション時に初期化されます。",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "新パス、成長支援、期間限定衣装",
        paragraphs: [
          "Daeva Pass「Song of the Blue Sea」はレベル45以上が対象です。基本は2,000,000 Kina、Premiumは1,000 Qunaで各キャラクター1回。販売は8月25日05:00 KSTまで、ミッションと報酬受取は8月26日のメンテナンス前までです。",
          "7月29日から8月12日のExpedition／Transcendence支援では、Unstable Stigma ShardsとChaosまたはCrystal fragmentsが追加されます。Chaos fragmentsはサーバーごとに1回、Lava Heart Armor Selection Boxと交換可能。Classic Athleticは8月26日のメンテナンス前までで、名札にはキャラクター名が表示されます。",
        ],
      },
      {
        id: "global-version-boundary",
        title: "グローバル版：9月30日の先行アクセスは正式サービス日ではない",
        paragraphs: [
          "グローバル版で確認済みなのは、ファウンダーズパックによる9月30日の先行アクセスです。正式サービス日、事前ダウンロード、サーバー一覧は確認した公式資料にまだなく、7月29日の地域価格や数値をグローバル版の確約とは扱えません。",
          "現行サービスのプレイヤーは、サーバーマッチングのリセット結果、ペット商品、スキル画面を確認してから投資を決めるのが安全です。グローバル版待機組はローカライズ告知を待ちましょう。",
        ],
      },
    ],
  }),
  "pt-br": articleCopy("pt-br", {
    eyebrow: "RESUMO DIÁRIO",
    title: "Atualização de AION2 de 29 de julho: coleta automática por pet, ajustes e terceiro pareamento",
    description:
      "Resumo com fontes sobre manutenção, coleta automática, equilíbrio de sete classes, terceiro pareamento, novo passe e eventos.",
    intro:
      "O serviço coreano de AION2 passou por manutenção em 29 de julho, das 04h30 às 09h30 KST, e as notas completas já foram publicadas. A atualização altera eficiência diária, equilíbrio e competição entre servidores ao mesmo tempo. Correções oficiais e textos ao vivo no jogo prevalecem.",
    sourceNote:
      "Conferido com os avisos coreanos de manutenção e atualização de 29 de julho, o resumo do CM, os avisos de pareamento e Daeva Pass e o aviso global do Pacote de Fundador. Os dados ao vivo valem apenas para o serviço coreano.",
    keywords: ["AION2 atualização 29 de julho", "AION2 coleta automática", "AION2 pareamento de servidores", "AION2 equilíbrio de classes"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "Coleta automática do pet e melhorias de conveniência",
        paragraphs: [
          "O serviço coreano agora oferece coleta automática de itens pelo pet, por personagem, por 3.000.000 de Kina durante 30 dias. Só pode ser usada novamente quando restarem menos de 30 dias. Confira a categoria Special da loja antes da compra.",
          "Também chegam ocultação do pet, troca instantânea de personagem sem voltar ao lobby, multisseleção mais prática na conversão de materiais, nova tentativa melhorada em Vakron Sky Island e ordenação de Aether Energy mais clara.",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "Ajustes em sete classes e terceiro pareamento de servidores",
        paragraphs: [
          "A prévia cobre habilidades comuns e Templar, Brawler, Ranger, Chanter, Cleric, Spiritmaster e Sorcerer. O foco está em dano PvE, resistência a controle, especializações e efeitos de status. Compare os coeficientes com os textos após a manutenção antes de refazer um conjunto inteiro.",
          "O terceiro pareamento do Chapter 1 começa com esta manutenção. Grupos de Abyss e Rift consideram abates, poder de combate do servidor, ocupações de artefatos e atividade de combate. O estado de ocupação e as informações de uso do corredor de Abyss são reiniciados na rotação.",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "Novo passe, impulso de progresso e traje limitado",
        paragraphs: [
          "O Daeva Pass Song of the Blue Sea exige nível 45 ou superior: 2.000.000 de Kina na faixa básica e 1.000 Quna na Premium, uma vez cada por personagem. As vendas terminam em 25 de agosto às 05h00 KST; missões e recompensas seguem até a manutenção de 26 de agosto.",
          "De 29 de julho a 12 de agosto, um bônus de Expedition e Transcendence adiciona Unstable Stigma Shards e fragmentos Chaos ou Crystal. Chaos fragments podem ser trocados uma vez por servidor por uma Lava Heart Armor Selection Box. Classic Athletic vai até a manutenção de 26 de agosto e sua placa exibe o nome do personagem.",
        ],
      },
      {
        id: "global-version-boundary",
        title: "Limite global: o acesso antecipado de 30 de setembro não é o lançamento completo",
        paragraphs: [
          "Para a versão global, o marco confirmado continua sendo o acesso antecipado do Pacote de Fundador em 30 de setembro. As fontes revisadas ainda não informam lançamento completo, pré-carregamento ou lista de servidores; preços e números regionais não são promessas globais.",
          "Jogadores atuais devem conferir agora o resultado do pareamento reiniciado, a loja e as habilidades. Quem aguarda a versão global deve esperar os anúncios localizados.",
        ],
      },
    ],
  }),
  ru: articleCopy("ru", {
    eyebrow: "ЕЖЕДНЕВНАЯ СВОДКА",
    title: "Обновление AION2 от 29 июля: автосбор предметов питомцем, правки классов и третий подбор серверов",
    description:
      "Сводка по техработам, автосбору, балансу семи классов, третьему подбору серверов, новому пропуску и событиям.",
    intro:
      "Корейский сервис AION2 прошёл техработы 29 июля с 04:30 до 09:30 KST, после чего были опубликованы полные примечания к обновлению. Оно одновременно меняет повседневную эффективность, баланс классов и межсерверную конкуренцию. Приоритет имеют официальные правки и актуальный текст в игре.",
    sourceNote:
      "Сверено с корейскими уведомлениями о техработах и обновлении от 29 июля, сводкой CM, объявлениями о подборе серверов и Daeva Pass, а также глобальным объявлением о наборе основателя. Оперативные данные относятся только к корейскому сервису.",
    keywords: ["AION2 обновление 29 июля", "AION2 автосбор питомца", "AION2 подбор серверов", "AION2 баланс классов"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "Автосбор питомца и улучшения удобства",
        paragraphs: [
          "В корейском сервисе доступен автоматический сбор предметов питомцем: 3 000 000 Kina за 30 дней для одного персонажа. Повторное использование возможно, только когда остаётся меньше 30 дней. Перед покупкой проверьте категорию Special в игровом магазине.",
          "Также появились скрытие питомца, мгновенное переключение персонажа без возврата в лобби, удобный множественный выбор при конвертации материалов, улучшенный повтор Vakron Sky Island и сортировка Aether Energy.",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "Правки семи классов и третий подбор серверов",
        paragraphs: [
          "Анонс охватывает общие умения и Templar, Brawler, Ranger, Chanter, Cleric, Spiritmaster и Sorcerer. Основные темы — PvE-урон, сопротивление контролю, специализации и эффекты состояний. Перед полной сменой сборки сравните коэффициенты с описаниями после техработ.",
          "Третий подбор серверов Chapter 1 начинается с этих техработ. Для групп Abyss и Rift учитываются убийства, боевая мощь сервера, число захватов артефактов и боевая активность. Статус захвата и данные об использовании коридора Abyss сбрасываются при ротации.",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "Новый пропуск, ускорение развития и временный костюм",
        paragraphs: [
          "Daeva Pass Song of the Blue Sea доступен персонажам 45-го уровня и выше: базовая дорожка стоит 2 000 000 Kina, Premium — 1 000 Quna, по одной покупке каждого типа на персонажа. Продажа заканчивается 25 августа в 05:00 KST, а задания и награды — перед техработами 26 августа.",
          "С 29 июля по 12 августа бонус Expedition и Transcendence добавит Unstable Stigma Shards и фрагменты Chaos или Crystal. Chaos fragments можно один раз на сервер обменять на Lava Heart Armor Selection Box. Classic Athletic доступен до техработ 26 августа, а на бирке отображается имя персонажа.",
        ],
      },
      {
        id: "global-version-boundary",
        title: "Глобальная версия: ранний доступ 30 сентября не равен полному запуску",
        paragraphs: [
          "Для глобальной версии подтверждён только ранний доступ набора основателя 30 сентября. В проверенных источниках по-прежнему нет даты полного запуска, предзагрузки или списка серверов, поэтому региональные цены и значения от 29 июля не являются глобальными обещаниями.",
          "Текущим игрокам стоит проверить результаты сброса подбора серверов, магазин и умения. Ожидающим глобальную версию лучше дождаться локализованных объявлений.",
        ],
      },
    ],
  }),
  ko: articleCopy("ko", {
    eyebrow: "오늘의 업데이트 브리핑",
    title: "AION2 7월 29일 업데이트: 펫 자동 줍기, 클래스 조정, 3차 서버 매칭",
    description:
      "7월 29일 한국 서비스 점검, 펫 자동 줍기, 7개 클래스 밸런스, 3차 서버 매칭, 신규 패스와 기간 이벤트를 정리했습니다.",
    intro:
      "AION2 한국 서비스는 7월 29일 04:30부터 09:30 KST까지 정기점검을 진행했고 정식 업데이트 노트가 공개됐습니다. 이번 업데이트는 일상 효율, 클래스 밸런스, 서버 경쟁 구도를 함께 바꿉니다. 운영 조건이 달라질 경우 공식 수정 공지와 게임 내 표기가 우선합니다.",
    sourceNote:
      "한국 서비스의 7월 29일 점검·업데이트 노트, 7월 5주차 CM 브리핑, 3차 서버 매칭 및 데바 패스 공지, 글로벌 파운더스 팩 공지를 교차 확인했습니다. 실시간 내용은 한국 서비스에만 적용됩니다.",
    keywords: ["AION2 7월 29일 업데이트", "AION2 펫 자동 줍기", "AION2 서버 매칭", "AION2 클래스 밸런스"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "펫 자동 줍기와 편의성 개선",
        paragraphs: [
          "한국 서비스에 펫 자동 줍기 상품이 추가됐습니다. 캐릭터 단위로 3,000,000 키나에 30일을 이용하며 남은 유효 기간이 30일 미만일 때만 다시 사용할 수 있습니다. 구매 전 게임 내 상점의 특수 카테고리를 확인해야 합니다.",
          "펫 외형 숨기기, 로비를 거치지 않는 캐릭터 즉시 변경, 재료 변환 다중 선택, 바크론 공중섬 재도전 동선, 에테르 에너지 정렬도 개선됩니다. 직접적인 화력 상승은 아니지만 정리와 반복 조작 시간을 줄이는 변화입니다.",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "7개 클래스 조정과 3차 서버 매칭",
        paragraphs: [
          "공용 스킬과 수호성, 권성, 궁성, 호법성, 치유성, 정령성, 마도성이 조정 대상입니다. PvE 피해, 상태 이상 저항, 특화 연계와 상태 효과가 핵심 방향입니다. 전체 세팅을 바꾸기 전에 점검 후 스킬 설명의 실제 계수를 확인하는 편이 안전합니다.",
          "Chapter 1 3차 서버 매칭은 이번 점검부터 시작됐습니다. 어비스와 시공의 균열 조합에는 처치, 서버 전투력, 아티팩트 점령 횟수, 전투 활동도 등이 반영됩니다. 매칭 변경과 함께 아티팩트 점령 상태와 어비스 회랑 이용 정보가 초기화됐으므로 초기화 결과와 새 상대를 확인한 뒤 전략을 조정해야 합니다.",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "신규 패스, 성장 지원, 기간 한정 의상",
        paragraphs: [
          "데바 패스 '푸른 바다의 노래'는 45레벨 이상 캐릭터가 대상입니다. 기본 2,000,000 키나, 프리미엄 1,000 큐나이며 종류별 캐릭터당 1회입니다. 판매는 8월 25일 05:00 KST, 미션과 보상 수령은 8월 26일 점검 전까지입니다.",
          "7월 29일부터 8월 12일까지 원정·초월 부스팅으로 불안정한 스티그마 샤드와 혼돈 또는 결정 조각이 추가됩니다. 혼돈 조각은 서버당 1회 용암 심장 방어구 선택 상자로 교환할 수 있습니다. Classic Athletic 의상은 8월 26일 점검 전까지이며 이름표에 캐릭터명이 표시됩니다.",
        ],
      },
      {
        id: "global-version-boundary",
        title: "글로벌 버전 경계: 9월 30일 얼리 액세스는 정식 출시일이 아니다",
        paragraphs: [
          "글로벌 버전에서 확인된 일정은 파운더스 팩의 9월 30일 얼리 액세스입니다. 확인한 공식 자료에는 정식 출시일, 사전 다운로드, 서버 목록이 아직 없으므로 7월 29일 지역 가격과 수치, 이벤트 보상을 글로벌 확정안으로 볼 수 없습니다.",
          "현재 서비스 이용자는 서버 매칭 초기화 결과, 펫 상품, 스킬 창을 확인한 뒤 키나·큐나·장비 투자를 결정하는 것이 좋습니다. 글로벌 대기자는 현지화 공지를 기다려야 합니다.",
        ],
      },
    ],
  }),
  "zh-hant": articleCopy("zh-hant", {
    eyebrow: "今日更新簡報",
    title: "AION2 7 月 29 日更新：寵物自動拾取、職業調整與第三輪伺服器配對",
    description:
      "整理 7 月 29 日韓國服務維護、寵物自動拾取、七職業平衡、第三輪伺服器配對、新通行證與限時活動。",
    intro:
      "AION2 韓國服務於 7 月 29 日 04:30 至 09:30（KST）進行維護，正式更新說明現已發布。本次更新同時改變日常效率、職業平衡與伺服器競爭；若營運條件後續調整，以官方修訂和遊戲內顯示為準。",
    sourceNote:
      "資料核對：韓國服務 7 月 29 日維護與更新說明、7 月第 5 週 CM 簡報、第三輪伺服器配對及 Daeva Pass 公告，以及全球版創始人包公告。即時內容僅適用韓國服務。",
    keywords: ["AION2 7月29日更新", "AION2 寵物自動拾取", "AION2 伺服器配對", "AION2 職業平衡"],
    sections: [
      {
        id: "pet-auto-loot-and-qol",
        title: "寵物自動拾取與日常體驗優化",
        paragraphs: [
          "韓國服務已加入寵物自動拾取商品：每個角色以 3,000,000 基納購買 30 天，剩餘有效期少於 30 天時才可再次使用。購買前仍應核對遊戲內商店的特殊分類。",
          "同批便利性調整包括隱藏寵物外觀、無須返回大廳即可即時切換角色、材料轉換多選操作、巴克隆空島重試流程，以及以太能量排序改善。這些不直接提高傷害，但能減少整理、移動與重複操作時間。",
        ],
      },
      {
        id: "class-balance-and-server-matching",
        title: "七職業調整與第三輪伺服器配對",
        paragraphs: [
          "預告涵蓋共用技能及守護星、格鬥家、弓星、護法星、治癒星、精靈星與魔道星，方向集中在 PvE 傷害、控制抗性、專精連動及狀態效果。全面更換配裝前，應先比對維護後的實際技能係數。",
          "Chapter 1 第三輪伺服器配對隨本次維護啟用，深淵與裂縫組合會參考擊殺、伺服器戰力、神器占領次數及戰鬥活躍度等指標。神器占領狀態與深淵迴廊使用資訊已隨輪換重置，軍團應核對重置結果並依新對手調整策略。",
        ],
      },
      {
        id: "passes-events-and-rewards",
        title: "新通行證、成長加速與限時外觀",
        paragraphs: [
          "Daeva Pass「蔚藍海之歌」限 45 級以上角色購買：基本軌為 2,000,000 基納，高級軌為 1,000 Quna，每個角色各限購一次；販售於 8 月 25 日 05:00 KST 結束，任務與領獎持續至 8 月 26 日維護前。",
          "7 月 29 日至 8 月 12 日的遠征與超越加速活動將追加不穩定烙印碎片、混沌或水晶碎片；混沌碎片可兌換熔岩之心防具選擇箱，伺服器限一次。Classic Athletic 外觀持續至 8 月 26 日維護前，名牌會顯示角色名稱。",
        ],
      },
      {
        id: "global-version-boundary",
        title: "全球版邊界：9 月 30 日搶先體驗不等於完整上線日",
        paragraphs: [
          "全球版目前可確認的節點仍是創始人包對應的 9 月 30 日搶先體驗。已核對的官方來源尚未給出完整上線日、預載時間或伺服器清單，因此不能把 7 月 29 日區域服價格、職業數值及活動獎勵視為全球版承諾。",
          "現行服務玩家宜先核對伺服器配對重置結果、寵物商品和技能面板，再決定基納、Quna 與配裝投入；全球版玩家則應等待在地化公告。",
        ],
      },
    ],
  }),
};

export const dailyNewsContentEntries = [
  july30DailyNewsEntry,
  {
    section: "news",
    slug: "july-29-2026-pet-auto-loot-server-matching-update",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-29",
    updatedAt: "2026-07-29",
    readingMinutes: 6,
    publication: {
      status: "published",
      indexable: true,
      localeReview: {
        "zh-hans": "approved",
        en: "approved",
        fr: "approved",
        de: "approved",
        es: "approved",
        ja: "approved",
        "pt-br": "approved",
        ru: "approved",
        ko: "approved",
        "zh-hant": "approved",
      },
      sourceReview: "verified",
    },
    sources,
    heroImage,
    related: [
      { kind: "content", section: "guides", slug: "abyss-status" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
      {
        kind: "content",
        section: "news",
        slug: "chapter-1-lands-of-sand-and-snow",
      },
    ],
    translations,
  },
] as const satisfies readonly ContentEntry[];

/**
 * This article carries reviewed translations for every public locale directly.
 * The empty generated-locale record keeps it compatible with the shared
 * editorial expansion pipeline without replacing those curated translations.
 */
export const dailyNewsGeneratedEditorialEntries = {
  ...july30DailyNewsGeneratedEditorialEntry,
  "news/july-29-2026-pet-auto-loot-server-matching-update": {},
} as const;
