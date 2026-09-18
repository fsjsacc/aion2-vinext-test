import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { SiteLocale } from "./site-config";

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
  "zh-hans": "约 5 分钟",
  en: "5 min read",
  fr: "5 min de lecture",
  de: "5 Min. Lesezeit",
  es: "5 min de lectura",
  ja: "約5分",
  "pt-br": "5 min de leitura",
  ru: "5 мин чтения",
  ko: "약 5분",
  "zh-hant": "約 5 分鐘",
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
  pcPatch: {
    "zh-hans": "AION2 韩国服 7月29日 PURPLE PC 无停机补丁公告",
    en: "Official AION2 Korea July 29 PURPLE PC no-downtime patch notice",
    fr: "Avis officiel AION2 Corée du correctif sans maintenance PURPLE PC du 29 juillet",
    de: "Offizielle AION2-Korea-Mitteilung zum PURPLE-PC-Hotfix vom 29. Juli",
    es: "Aviso oficial de AION2 Corea sobre el parche sin mantenimiento de PURPLE PC del 29 de julio",
    ja: "AION2韓国サービス 7月29日PURPLE PC無停止パッチ案内",
    "pt-br": "Aviso oficial de AION2 Coreia sobre o patch sem manutenção do PURPLE PC em 29 de julho",
    ru: "Официальное уведомление AION2 Korea о патче PURPLE PC без техработ от 29 июля",
    ko: "AION2 7월 29일 PURPLE PC 무점검 패치 공식 안내",
    "zh-hant": "AION2 韓國服 7 月 29 日 PURPLE PC 無停機修補公告",
  },
  androidPatch: {
    "zh-hans": "AION2 韩国服 Android 稳定性应用更新公告",
    en: "Official AION2 Korea Android stability app update notice",
    fr: "Avis officiel AION2 Corée sur la mise à jour de stabilité Android",
    de: "Offizielle AION2-Korea-Mitteilung zum Android-Stabilitätsupdate",
    es: "Aviso oficial de AION2 Corea sobre la actualización de estabilidad para Android",
    ja: "AION2韓国サービス Android安定性向上アプリ更新案内",
    "pt-br": "Aviso oficial de AION2 Coreia sobre a atualização de estabilidade para Android",
    ru: "Официальное уведомление AION2 Korea об обновлении стабильности Android",
    ko: "AION2 AOS 서비스 안정성 향상 앱 업데이트 공식 안내",
    "zh-hant": "AION2 韓國服 Android 穩定性應用程式更新公告",
  },
  knownIssues: {
    "zh-hans": "AION2 韩国服 7月第5周已知问题与处理公告",
    en: "Official AION2 Korea July week 5 known issues and actions",
    fr: "Problèmes connus et mesures officielles AION2 Corée de la 5e semaine de juillet",
    de: "Offizielle bekannte Probleme und Maßnahmen für AION2 Korea in der 5. Juliwoche",
    es: "Problemas conocidos y medidas oficiales de AION2 Corea de la quinta semana de julio",
    ja: "AION2韓国サービス 7月第5週の既知の問題と対応案内",
    "pt-br": "Problemas conhecidos e medidas oficiais de AION2 Coreia na 5ª semana de julho",
    ru: "Официальный список известных проблем AION2 Korea за пятую неделю июля",
    ko: "AION2 7월 5주차 알려진 이슈 및 조치 공식 안내",
    "zh-hant": "AION2 韓國服 7 月第 5 週已知問題與處理公告",
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

const pcPatchUrl =
  "https://aion2.plaync.com/ko-kr/board/notice/view?articleId=6a6994fed97eae18cc40d81e";
const androidPatchUrl =
  "https://aion2.plaync.com/ko-kr/board/notice/view?articleId=6a6a016dda5dd1068be9701c";
const knownIssuesUrl =
  "https://aion2.plaync.com/ko-kr/board/notice/view?articleId=6a6950903b36601c7403115b";
const updateUrl =
  "https://aion2.plaync.com/ko-kr/board/update/view?articleId=6a6903388bae191e2da7e2ed";
const cmStoryUrl =
  "https://aion2.plaync.com/ko-kr/board/cm_story/view?articleId=6a688bb0065bf16436e45dff";
const founderUrl =
  "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f";

const sources: readonly ContentSource[] = [
  {
    id: "plaync-purple-pc-no-downtime-patch-2026-07-29",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.pcPatch.en,
    url: pcPatchUrl,
    publishedAt: "2026-07-29",
    retrievedAt: "2026-07-30",
    verifiedAt: "2026-07-30",
    localizations: localizations(sourceLabels.pcPatch, pcPatchUrl),
  },
  {
    id: "plaync-android-stability-update-2026-07-29",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.androidPatch.en,
    url: androidPatchUrl,
    publishedAt: "2026-07-29",
    retrievedAt: "2026-07-30",
    verifiedAt: "2026-07-30",
    localizations: localizations(sourceLabels.androidPatch, androidPatchUrl),
  },
  {
    id: "plaync-july-week5-known-issues-2026",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.knownIssues.en,
    url: knownIssuesUrl,
    publishedAt: "2026-07-29",
    retrievedAt: "2026-07-30",
    verifiedAt: "2026-07-30",
    localizations: localizations(sourceLabels.knownIssues, knownIssuesUrl),
  },
  {
    id: "plaync-july-29-update-note-rechecked-2026-07-30",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.update.en,
    url: updateUrl,
    publishedAt: "2026-07-29",
    retrievedAt: "2026-07-30",
    verifiedAt: "2026-07-30",
    localizations: localizations(sourceLabels.update, updateUrl),
  },
  {
    id: "plaync-july-week5-cm-story-rechecked-2026-07-30",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.cm.en,
    url: cmStoryUrl,
    publishedAt: "2026-07-28",
    retrievedAt: "2026-07-30",
    verifiedAt: "2026-07-30",
    localizations: localizations(sourceLabels.cm, cmStoryUrl),
  },
  {
    id: "plaync-global-founders-pack-rechecked-2026-07-30",
    kind: "official",
    publisher: "NC Corporation",
    label: sourceLabels.founder.en,
    url: founderUrl,
    publishedAt: "2026-07-22",
    retrievedAt: "2026-07-30",
    verifiedAt: "2026-07-30",
    localizations: localizations(sourceLabels.founder, founderUrl),
  },
];

const heroTranslations: ContentHeroImage["translations"] = {
  "zh-hans": {
    alt: "AION2 7月第5周更新新闻官方主图",
    caption: "本文复用7月第5周 CM 更新新闻主图；补丁与已知问题以正文列出的官方来源为准。",
  },
  en: {
    alt: "Official AION2 July week 5 update news artwork",
    caption: "This report reuses the July week 5 CM update artwork; the cited notices in the article are authoritative for patches and known issues.",
  },
  fr: {
    alt: "Visuel officiel des nouvelles de mise à jour AION2 de la 5e semaine de juillet",
    caption: "Cet article réutilise le visuel CM de la 5e semaine de juillet ; les avis cités font foi pour les correctifs et problèmes connus.",
  },
  de: {
    alt: "Offizielles AION2-Artwork zu den Update-News der 5. Juliwoche",
    caption: "Der Bericht verwendet das CM-Update-Artwork der 5. Juliwoche; für Patches und bekannte Probleme gelten die zitierten Mitteilungen.",
  },
  es: {
    alt: "Imagen oficial de las novedades de AION2 de la quinta semana de julio",
    caption: "El artículo reutiliza la imagen del CM de la quinta semana de julio; los avisos citados son la referencia para parches y problemas conocidos.",
  },
  ja: {
    alt: "AION2 7月第5週アップデートニュースの公式メイン画像",
    caption: "本記事では7月第5週CMアップデート画像を再利用しています。パッチと既知の問題は本文の公式出典が基準です。",
  },
  "pt-br": {
    alt: "Arte oficial das novidades de AION2 da 5ª semana de julho",
    caption: "O artigo reutiliza a arte do CM da 5ª semana de julho; os avisos citados são a referência para patches e problemas conhecidos.",
  },
  ru: {
    alt: "Официальный арт новостей обновления AION2 за пятую неделю июля",
    caption: "В статье повторно используется арт CM за пятую неделю июля; сведения о патчах и проблемах подтверждаются указанными источниками.",
  },
  ko: {
    alt: "AION2 7월 5주차 업데이트 뉴스 공식 메인 이미지",
    caption: "본문은 7월 5주차 CM 업데이트 이미지를 재사용하며 패치와 알려진 이슈는 본문에 인용한 공식 공지를 기준으로 합니다.",
  },
  "zh-hant": {
    alt: "AION2 7 月第 5 週更新新聞官方主圖",
    caption: "本文沿用 7 月第 5 週 CM 更新新聞主圖；修補與已知問題以正文列出的官方來源為準。",
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
    eyebrow: "今日运营简报",
    title: "AION2 7月30日简报：PC与Android稳定性补丁、角色切换风险",
    description:
      "汇总韩国服PC与Android稳定性补丁、角色切换和副本列表已知问题、8月修复节点，并更正宠物自动拾取规则。",
    intro:
      "截至7月30日08:00（香港时间），韩国服没有新的正式更新说明或 CM 文章；昨晚新增的可执行信息主要来自稳定性补丁和7月第5周已知问题公告。以下内容仅适用于韩国服，实际修复状态应以官方后续修订和游戏内表现为准。",
    sourceNote:
      "资料核对：PURPLE PC无停机补丁、Android稳定性应用更新、7月第5周已知问题、7月29日正式更新说明与 CM 简报，以及7月22日全球版创始人包公告。",
    keywords: ["AION2 7月30日简报", "AION2 崩溃补丁", "AION2 角色切换问题", "AION2 封魂石"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PC与Android客户端都需要主动更新",
        paragraphs: [
          "PURPLE PC已推送无停机补丁，用于改善间歇性连接终止与崩溃。正在运行PC版的玩家需要完整退出游戏后重新登录，单纯停留在角色界面不能保证补丁已经应用。",
          "Android版于7月29日22:17（KST）应用稳定性更新。官方明确要求从Google Play更新到最新版；公告没有把这项要求扩展到iOS，因此不同平台应分别核对客户端版本。",
        ],
      },
      {
        id: "character-switching-risks",
        title: "角色切换：先看数据，再检查快捷栏",
        paragraphs: [
          "首次打开角色切换窗口时，其他角色的战力与装备等级可能显示为“—”，通过大厅重新进入可刷新；切换后主菜单头像也可能异常，官方计划在8月12日例行维护时修复头像问题。",
          "风险更高的是角色切换后，快捷栏中的封魂石可能变成更高阶封魂石。该问题暂未公布修复日期，当前最稳妥的做法是在切换前后都检查快捷栏，避免误用高价值消耗品。",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "副本房间显示0，不等于角色实际归零",
        paragraphs: [
          "远征与超越房间列表中，正在进行副本的参与者装备和战力可能显示为0。官方把它列为显示问题，并计划在8月5日例行维护修复；组队判断不应只依赖这个0值。",
          "8月5日和8月12日是当前公告中的计划修复节点，并非不可变更的保证。每次维护后应先复查已知问题公告，再根据游戏内实际显示决定是否恢复原有切换和组队流程。",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "规则勘误与全球版边界",
        paragraphs: [
          "7月第5周官方CM简报图确认，宠物自动拾取按角色以3,000,000基纳购买30天，剩余有效期少于30天时才能再次使用；已核对的正式更新说明与CM资料均未列出“角色10级＋会员”门槛。同批正式更新确认的便利性改动是无需返回大厅即可切换角色，并非即时改名。",
          "全球版已核对来源仍只确认创始人包对应的9月30日抢先体验，没有新的预载时间、服务器清单或完整上线日。韩国服补丁、价格与修复时间不能直接视为全球版承诺。",
        ],
      },
    ],
  }),
  en: articleCopy("en", {
    eyebrow: "DAILY OPERATIONS BRIEF",
    title: "AION2 July 30 brief: PC and Android stability patches, character-switch risks",
    description:
      "A sourced recap of Korea-service PC and Android patches, character-switch and dungeon-list issues, August fix dates, and corrected pet auto-loot rules.",
    intro:
      "As of 08:00 Hong Kong time on July 30, the Korean service has no newer formal update note or CM story. The actionable overnight changes come from stability patches and the July week 5 known-issues notice. This report applies only to the Korean service, and later official revisions and live behavior take priority.",
    sourceNote:
      "Checked against the PURPLE PC no-downtime patch, Android stability update, July week 5 known-issues notice, July 29 update notes and CM brief, plus the July 22 global Founder's Pack notice.",
    keywords: ["AION2 July 30 brief", "AION2 crash patch", "AION2 character switch issue", "AION2 Power Shard"],
    sections: [
      {
        id: "client-stability-patches",
        title: "Both PC and Android clients need an active update step",
        paragraphs: [
          "A no-downtime PURPLE PC patch targets intermittent disconnects and crashes. Players already running the PC client must fully exit the game and reconnect; remaining at character selection does not confirm that the patch has been applied.",
          "The Android stability update was applied at 22:17 KST on July 29. NC specifically directs Google Play users to install the latest version. The notice does not extend that instruction to iOS, so version checks should remain platform-specific.",
        ],
      },
      {
        id: "character-switching-risks",
        title: "Character switching: verify data, then inspect the quick slot",
        paragraphs: [
          "The first visit to the character-switch window can show other characters' combat power and item level as “—”; returning through the lobby refreshes the data. The main-menu portrait can also render incorrectly after a switch, with a fix planned for the August 12 maintenance.",
          "More importantly, a Power Shard registered in a quick slot may change to a higher-grade Power Shard after switching characters. No fix date is posted, so check the quick slot before and after every switch to avoid consuming a more valuable item by mistake.",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "A zero in the dungeon room list is not an actual stat reset",
        paragraphs: [
          "Expedition and Transcendence room lists may show item and combat-power values of zero for players already inside an active dungeon. NC lists this as a display issue and plans a fix for the August 5 maintenance, so group decisions should not rely on that zero alone.",
          "August 5 and August 12 are planned fix points in the current notice, not immutable guarantees. Recheck the known-issues page after each maintenance and confirm live behavior before returning to the previous switching or group-selection routine.",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "Rule correction and the global-build boundary",
        paragraphs: [
          "The official July week 5 CM infographic says pet auto-loot costs 3,000,000 Kina per character for 30 days and can be used again only with fewer than 30 days remaining. Neither the reviewed update note nor the CM material states a level-10 or membership requirement. The related formal update confirms instant character switching without returning to the lobby, not instant renaming.",
          "The reviewed global source still confirms Founder's Pack early access on September 30, with no new preload time, server list, or full-launch date. Korean-service patches, prices, and fix schedules are not global promises.",
        ],
      },
    ],
  }),
  fr: articleCopy("fr", {
    eyebrow: "BRÈVE D’EXPLOITATION",
    title: "AION2 au 30 juillet : correctifs PC et Android, risques du changement de personnage",
    description:
      "Récapitulatif sourcé des correctifs coréens, problèmes de changement de personnage et de liste de donjon, dates d’août et règles corrigées du ramassage automatique.",
    intro:
      "Au 30 juillet à 08 h 00, heure de Hong Kong, aucun nouveau patch note complet ni article CM n’a été publié pour le service coréen. Les informations utiles de la nuit concernent les correctifs de stabilité et les problèmes connus de la 5e semaine de juillet. Les révisions officielles ultérieures restent prioritaires.",
    sourceNote:
      "Vérifié avec le correctif PURPLE PC sans maintenance, la mise à jour Android, l’avis des problèmes connus, les notes et la brève CM du 29 juillet, ainsi que l’avis mondial du pack Fondateur.",
    keywords: ["AION2 30 juillet", "AION2 correctif crash", "AION2 changement personnage", "AION2 Power Shard"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PC et Android demandent une mise à jour active",
        paragraphs: [
          "Le correctif PURPLE PC sans maintenance vise les déconnexions et plantages intermittents. Les joueurs déjà connectés doivent fermer complètement le jeu puis se reconnecter pour appliquer le correctif.",
          "La mise à jour de stabilité Android a été appliquée le 29 juillet à 22 h 17 KST. NC demande aux utilisateurs de Google Play d’installer la dernière version ; l’avis ne donne pas la même consigne pour iOS.",
        ],
      },
      {
        id: "character-switching-risks",
        title: "Changement de personnage : vérifier les données et le raccourci",
        paragraphs: [
          "À la première ouverture, la fenêtre peut afficher « — » pour la puissance et le niveau d’objet des autres personnages ; un retour par le lobby actualise les données. Le portrait du menu peut aussi être incorrect après un changement, avec une correction prévue le 12 août.",
          "Une Power Shard placée dans un raccourci peut être remplacée par une Power Shard de rang supérieur après le changement de personnage. Aucune date de correction n’est annoncée : contrôlez le raccourci avant et après chaque changement.",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "Un zéro dans la liste de donjon n’est pas une remise à zéro réelle",
        paragraphs: [
          "Les listes Expedition et Transcendence peuvent afficher zéro pour l’équipement et la puissance des joueurs déjà dans un donjon actif. Il s’agit d’un problème d’affichage, dont la correction est prévue pour la maintenance du 5 août.",
          "Les 5 et 12 août sont des échéances prévues, susceptibles de changer. Relisez l’avis après chaque maintenance et confirmez le comportement en jeu avant de reprendre vos habitudes de groupe ou de changement.",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "Correction des règles et limite de la version mondiale",
        paragraphs: [
          "L’infographie CM officielle de la 5e semaine de juillet fixe le ramassage automatique à 3 000 000 Kina par personnage pour 30 jours, renouvelable seulement lorsqu’il reste moins de 30 jours. Ni la note de mise à jour vérifiée ni le document CM ne mentionnent le niveau 10 ou un abonnement. La mise à jour officielle associée confirme le changement instantané sans retour au lobby, pas le renommage.",
          "La source mondiale vérifiée confirme toujours seulement l’accès anticipé du pack Fondateur le 30 septembre. Aucun nouvel horaire de préchargement, liste de serveurs ou lancement complet n’est annoncé.",
        ],
      },
    ],
  }),
  de: articleCopy("de", {
    eyebrow: "TÄGLICHES BETRIEBS-BRIEFING",
    title: "AION2 am 30. Juli: PC- und Android-Patches, Risiken beim Charakterwechsel",
    description:
      "Quellenbasierte Übersicht zu Korea-Patches, Problemen beim Charakterwechsel und in Dungeonlisten, August-Terminen und korrigierten Pet-Autoloot-Regeln.",
    intro:
      "Bis zum 30. Juli um 08:00 Uhr Hongkong-Zeit erschien für den koreanischen Dienst kein neuer vollständiger Update-Hinweis und keine neue CM-Story. Relevant sind die nächtlichen Stabilitäts-Patches und die bekannten Probleme der fünften Juliwoche. Spätere offizielle Korrekturen haben Vorrang.",
    sourceNote:
      "Abgeglichen mit dem PURPLE-PC-Hotfix, dem Android-Update, der Liste bekannter Probleme, den Update-Hinweisen und der CM-Kurzmeldung vom 29. Juli sowie der globalen Gründerpaket-Ankündigung.",
    keywords: ["AION2 30. Juli", "AION2 Crash Patch", "AION2 Charakterwechsel Problem", "AION2 Power Shard"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PC und Android erfordern einen aktiven Update-Schritt",
        paragraphs: [
          "Der PURPLE-PC-Hotfix ohne Wartung soll sporadische Verbindungsabbrüche und Abstürze reduzieren. Bereits eingeloggte Spieler müssen das Spiel vollständig beenden und neu starten, damit der Patch sicher angewendet wird.",
          "Das Android-Stabilitätsupdate wurde am 29. Juli um 22:17 Uhr KST aktiviert. NC fordert Google-Play-Nutzer zum Update auf die neueste Version auf; für iOS enthält die Mitteilung keine entsprechende Anweisung.",
        ],
      },
      {
        id: "character-switching-risks",
        title: "Charakterwechsel: Daten und Schnellzugriff prüfen",
        paragraphs: [
          "Beim ersten Öffnen können Kampfkraft und Gegenstandsstufe anderer Charaktere als „—“ erscheinen; ein erneuter Einstieg über die Lobby aktualisiert sie. Ein fehlerhaftes Menüporträt nach dem Wechsel soll am 12. August behoben werden.",
          "Ein im Schnellzugriff registrierter Power Shard kann nach dem Wechsel durch einen höherwertigen Power Shard ersetzt werden. Da noch kein Fixtermin vorliegt, sollte der Slot vor und nach jedem Charakterwechsel geprüft werden.",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "Nullwerte in der Dungeonliste sind kein echter Werteverlust",
        paragraphs: [
          "Expedition- und Transcendence-Listen können für Teilnehmer eines laufenden Dungeons Gegenstands- und Kampfkraftwerte von null anzeigen. NC stuft dies als Anzeigeproblem ein und plant die Korrektur für die Wartung am 5. August.",
          "Der 5. und 12. August sind geplante, veränderbare Fixtermine. Nach jeder Wartung sollten die Problemliste und das tatsächliche Verhalten im Spiel erneut geprüft werden.",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "Regelkorrektur und Grenze zur globalen Version",
        paragraphs: [
          "Laut offizieller CM-Infografik zur fünften Juliwoche kostet Pet-Autoloot 3.000.000 Kina pro Charakter für 30 Tage und kann erst bei weniger als 30 Resttagen erneut verwendet werden. Weder der geprüfte Update-Hinweis noch das CM-Material nennen Stufe 10 oder eine Mitgliedschaft. Das zugehörige offizielle Update bestätigt den Wechsel ohne Lobby, nicht eine sofortige Umbenennung.",
          "Für Global ist weiterhin nur der Early Access des Gründerpakets am 30. September bestätigt. Neue Angaben zu Preload, Serverliste oder vollständigem Start fehlen.",
        ],
      },
    ],
  }),
  es: articleCopy("es", {
    eyebrow: "RESUMEN OPERATIVO DIARIO",
    title: "AION2 al 30 de julio: parches de PC y Android, riesgos al cambiar de personaje",
    description:
      "Resumen con fuentes de los parches coreanos, problemas de cambio de personaje y lista de mazmorra, fechas de agosto y reglas corregidas de recogida automática.",
    intro:
      "Hasta las 08:00 de Hong Kong del 30 de julio, el servicio coreano no había publicado nuevas notas completas ni otra historia del CM. Las novedades prácticas de la noche son los parches de estabilidad y los problemas conocidos de la quinta semana de julio. Prevalecen las revisiones oficiales posteriores.",
    sourceNote:
      "Contrastado con el parche de PURPLE PC, la actualización de Android, el aviso de problemas conocidos, las notas y el resumen CM del 29 de julio y el aviso global del paquete de fundador.",
    keywords: ["AION2 30 de julio", "AION2 parche de cierres", "AION2 cambio de personaje", "AION2 Power Shard"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PC y Android requieren una actualización activa",
        paragraphs: [
          "El parche sin mantenimiento de PURPLE PC busca reducir desconexiones y cierres intermitentes. Quien ya estuviera jugando debe cerrar el juego por completo y volver a entrar para aplicar el parche.",
          "La actualización de estabilidad para Android se aplicó el 29 de julio a las 22:17 KST. NC pide instalar la última versión desde Google Play; el aviso no extiende esa instrucción a iOS.",
        ],
      },
      {
        id: "character-switching-risks",
        title: "Cambio de personaje: revisar datos y acceso rápido",
        paragraphs: [
          "La primera apertura puede mostrar «—» en el poder y nivel de objeto de otros personajes; volver por el lobby actualiza los datos. El retrato del menú también puede fallar tras el cambio y se prevé corregirlo el 12 de agosto.",
          "Una Power Shard registrada en un acceso rápido puede convertirse en una Power Shard de mayor rango después del cambio. Sin fecha de arreglo, conviene revisar la ranura antes y después de cada cambio.",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "Un cero en la lista de mazmorra no reinicia las estadísticas",
        paragraphs: [
          "Las listas de Expedition y Transcendence pueden mostrar equipo y poder cero para participantes que ya están en una mazmorra activa. NC lo trata como un fallo visual y prevé arreglarlo en el mantenimiento del 5 de agosto.",
          "El 5 y el 12 de agosto son fechas previstas que pueden cambiar. Tras cada mantenimiento hay que revisar el aviso y confirmar el comportamiento real antes de recuperar la rutina anterior.",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "Corrección de reglas y límite de la versión global",
        paragraphs: [
          "La infografía CM oficial de la quinta semana de julio fija la recogida automática en 3.000.000 de Kina por personaje durante 30 días, reutilizable solo con menos de 30 días restantes. Ni las notas revisadas ni el material CM indican nivel 10 o membresía. La actualización oficial asociada confirma el cambio sin volver al lobby, no el cambio de nombre.",
          "La fuente global revisada solo confirma el acceso anticipado del paquete de fundador el 30 de septiembre. No hay nuevo horario de precarga, lista de servidores ni fecha de lanzamiento completo.",
        ],
      },
    ],
  }),
  ja: articleCopy("ja", {
    eyebrow: "本日の運営速報",
    title: "AION2 7月30日速報：PC／Android安定化パッチとキャラクター切替の注意点",
    description:
      "韓国サービスの安定化パッチ、キャラクター切替とダンジョン一覧の既知問題、8月の修正予定、ペット自動拾得の訂正を整理します。",
    intro:
      "7月30日08:00（香港時間）時点で、韓国サービスに新しい正式アップデートノートやCM記事はありません。夜間の実用的な追加情報は、安定化パッチと7月第5週の既知問題です。修正状況は公式の続報とゲーム内表示を優先してください。",
    sourceNote:
      "PURPLE PC無停止パッチ、Android安定化更新、既知問題、7月29日アップデートノートとCM速報、グローバル版ファウンダーズパック告知を照合しました。",
    keywords: ["AION2 7月30日", "AION2 クラッシュ修正", "AION2 キャラクター切替", "AION2 封魂石"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PCとAndroidはいずれも利用者側の更新が必要",
        paragraphs: [
          "PURPLE PCの無停止パッチは、断続的な接続終了とクラッシュの改善を目的としています。プレイ中だった場合はゲームを完全に終了し、再接続して反映させる必要があります。",
          "Androidの安定化更新は7月29日22:17 KSTに適用されました。Google Playから最新版へ更新するよう案内されており、iOSについて同じ指示は出ていません。",
        ],
      },
      {
        id: "character-switching-risks",
        title: "キャラクター切替後は情報とショートカットを確認",
        paragraphs: [
          "初回表示では他キャラクターの戦闘力とアイテムレベルが「—」になる場合があり、ロビー経由で再接続すると更新されます。切替後のメニュー画像異常は8月12日の修正予定です。",
          "切替後、ショートカットに登録した封魂石が上位の封魂石へ変わる場合があります。修正日は未定のため、切替の前後でスロットを確認し、高価な消耗品の誤使用を防いでください。",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "ダンジョン一覧の0表示は実数値の初期化ではない",
        paragraphs: [
          "Expedition／Transcendenceのルーム一覧で、進行中ダンジョンの参加者情報が装備・戦闘力とも0になる場合があります。表示問題として8月5日のメンテナンスで修正予定です。",
          "8月5日と12日は現時点の予定で、変更される可能性があります。各メンテナンス後に既知問題とゲーム内挙動を再確認してください。",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "ルール訂正とグローバル版の境界",
        paragraphs: [
          "7月第5週の公式CMインフォグラフィックでは、ペット自動拾得はキャラクターごとに30日間3,000,000 Kinaで、残り30日未満の場合のみ再使用できます。確認した更新ノートとCM資料のどちらにも、レベル10や会員資格の条件は記載されていません。関連する公式更新で確認された利便性改善はロビーを経由しない切替であり、即時改名ではありません。",
          "グローバル版で確認済みなのは、ファウンダーズパックによる9月30日の先行アクセスです。事前ダウンロード、サーバー一覧、正式サービス日の新情報はありません。",
        ],
      },
    ],
  }),
  "pt-br": articleCopy("pt-br", {
    eyebrow: "RESUMO OPERACIONAL DIÁRIO",
    title: "AION2 em 30 de julho: patches de PC e Android e riscos na troca de personagem",
    description:
      "Resumo com fontes dos patches coreanos, falhas na troca de personagem e lista de masmorras, datas de agosto e regras corrigidas da coleta automática.",
    intro:
      "Até 08h00 de Hong Kong em 30 de julho, o serviço coreano não publicou novas notas completas nem outra matéria do CM. As informações práticas da noite são os patches de estabilidade e os problemas conhecidos da 5ª semana de julho. Revisões oficiais posteriores prevalecem.",
    sourceNote:
      "Conferido com o patch do PURPLE PC, a atualização Android, o aviso de problemas conhecidos, as notas e o resumo do CM de 29 de julho e o aviso global do Pacote de Fundador.",
    keywords: ["AION2 30 de julho", "AION2 patch de crash", "AION2 troca de personagem", "AION2 Power Shard"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PC e Android exigem uma atualização ativa",
        paragraphs: [
          "O patch sem manutenção do PURPLE PC busca reduzir desconexões e crashes intermitentes. Quem já estava jogando precisa fechar o jogo por completo e entrar novamente para aplicar o patch.",
          "A atualização de estabilidade do Android foi aplicada em 29 de julho às 22h17 KST. A NC orienta instalar a versão mais recente pelo Google Play; o aviso não estende essa instrução ao iOS.",
        ],
      },
      {
        id: "character-switching-risks",
        title: "Troca de personagem: confira dados e atalho",
        paragraphs: [
          "Na primeira abertura, poder e nível de item de outros personagens podem aparecer como “—”; voltar pelo lobby atualiza os dados. O retrato do menu também pode falhar após a troca, com correção prevista para 12 de agosto.",
          "Uma Power Shard registrada no atalho pode mudar para uma Power Shard de grau superior após a troca. Sem data de correção, confira o slot antes e depois de cada mudança.",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "Zero na lista da masmorra não significa atributos zerados",
        paragraphs: [
          "Listas de Expedition e Transcendence podem exibir item e poder zero para participantes já dentro de uma masmorra ativa. A NC trata isso como falha visual e planeja corrigi-la na manutenção de 5 de agosto.",
          "5 e 12 de agosto são datas planejadas e podem mudar. Após cada manutenção, releia o aviso e confirme o comportamento no jogo antes de retomar a rotina anterior.",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "Correção das regras e limite da versão global",
        paragraphs: [
          "A infografia CM oficial da 5ª semana de julho define a coleta automática em 3.000.000 de Kina por personagem por 30 dias, reutilizável apenas com menos de 30 dias restantes. Nem as notas verificadas nem o material CM citam nível 10 ou assinatura. A atualização oficial associada confirma a troca sem voltar ao lobby, não a mudança de nome.",
          "A fonte global revisada só confirma o acesso antecipado do Pacote de Fundador em 30 de setembro. Não há novo horário de pré-carregamento, lista de servidores ou lançamento completo.",
        ],
      },
    ],
  }),
  ru: articleCopy("ru", {
    eyebrow: "ЕЖЕДНЕВНАЯ ОПЕРАЦИОННАЯ СВОДКА",
    title: "AION2 на 30 июля: патчи PC и Android, риски при смене персонажа",
    description:
      "Сводка по патчам корейского сервиса, проблемам смены персонажа и списка подземелий, августовским срокам и исправленным правилам автосбора.",
    intro:
      "К 08:00 по Гонконгу 30 июля в корейском сервисе не вышло новых полных примечаний к обновлению или материала CM. Практические ночные изменения — патчи стабильности и список известных проблем пятой недели июля. Приоритет имеют последующие официальные правки.",
    sourceNote:
      "Сверено с патчем PURPLE PC, обновлением Android, списком известных проблем, примечаниями и сводкой CM от 29 июля, а также глобальным объявлением о наборе основателя.",
    keywords: ["AION2 30 июля", "AION2 патч вылетов", "AION2 смена персонажа", "AION2 Power Shard"],
    sections: [
      {
        id: "client-stability-patches",
        title: "На PC и Android требуется активное обновление",
        paragraphs: [
          "Патч PURPLE PC без техработ должен уменьшить случайные разрывы соединения и вылеты. Уже запущенную игру необходимо полностью закрыть и войти заново, чтобы применить изменения.",
          "Обновление стабильности Android применено 29 июля в 22:17 KST. NC просит установить последнюю версию из Google Play; для iOS такое требование в объявлении не указано.",
        ],
      },
      {
        id: "character-switching-risks",
        title: "После смены персонажа проверьте данные и быстрый слот",
        paragraphs: [
          "При первом открытии сила и уровень предметов других персонажей могут отображаться как «—»; повторный вход через лобби обновляет данные. Ошибочный портрет меню планируют исправить 12 августа.",
          "Power Shard в быстром слоте после смены персонажа может замениться Power Shard более высокого ранга. Срок исправления не назван, поэтому проверяйте слот до и после каждой смены.",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "Ноль в списке подземелья не означает реальный сброс",
        paragraphs: [
          "В списках Expedition и Transcendence экипировка и сила участников активного подземелья могут показываться как ноль. NC считает это ошибкой отображения и планирует исправить её во время техработ 5 августа.",
          "5 и 12 августа — текущие планы, которые могут измениться. После каждой профилактики снова проверяйте объявление и поведение игры.",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "Исправление правил и граница глобальной версии",
        paragraphs: [
          "По официальной инфографике CM за пятую неделю июля автосбор питомцем стоит 3 000 000 Kina на персонажа за 30 дней и повторно используется только при остатке менее 30 дней. Ни проверенные примечания к обновлению, ни материал CM не указывают уровень 10 или подписку. Связанное официальное обновление подтверждает смену без лобби, а не мгновенное переименование.",
          "Для глобальной версии подтверждён только ранний доступ набора основателя 30 сентября. Новых данных о предзагрузке, серверах или полном запуске нет.",
        ],
      },
    ],
  }),
  ko: articleCopy("ko", {
    eyebrow: "오늘의 운영 브리핑",
    title: "AION2 7월 30일 브리핑: PC·AOS 안정성 패치와 캐릭터 변경 주의점",
    description:
      "한국 서비스의 PC·AOS 안정성 패치, 캐릭터 변경 및 던전 목록 이슈, 8월 수정 일정과 펫 자동 줍기 정정 내용을 정리했습니다.",
    intro:
      "7월 30일 08:00 홍콩 시간 기준으로 한국 서비스에 새로운 정식 업데이트 노트나 CM 아지트 글은 없습니다. 밤사이 확인할 핵심은 안정성 패치와 7월 5주차 알려진 이슈입니다. 실제 수정 상태는 후속 공식 공지와 게임 내 표기를 우선합니다.",
    sourceNote:
      "PURPLE PC 무점검 패치, AOS 안정성 업데이트, 7월 5주차 알려진 이슈, 7월 29일 업데이트 노트와 CM 브리핑, 글로벌 파운더스 팩 공지를 교차 확인했습니다.",
    keywords: ["AION2 7월 30일", "AION2 크래시 패치", "AION2 캐릭터 변경 이슈", "AION2 봉혼석"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PC와 AOS 모두 직접 업데이트 확인이 필요",
        paragraphs: [
          "PURPLE PC 무점검 패치는 간헐적인 접속 종료와 크래시 개선이 목적입니다. 이미 접속 중이었다면 게임을 완전히 종료한 뒤 다시 접속해야 패치가 반영됩니다.",
          "AOS 안정성 업데이트는 7월 29일 22:17 KST에 적용됐습니다. 구글 플레이에서 최신 버전으로 업데이트해야 하며, 공지는 iOS에 같은 조치를 요구하지 않습니다.",
        ],
      },
      {
        id: "character-switching-risks",
        title: "캐릭터 변경 후 정보와 단축 슬롯을 확인",
        paragraphs: [
          "캐릭터 변경창 최초 진입 시 다른 캐릭터의 전투력과 아이템 레벨이 ‘—’로 보일 수 있으며 로비를 통해 재접속하면 갱신됩니다. 변경 후 메인 메뉴 포트레이트 오류는 8월 12일 수정 예정입니다.",
          "캐릭터 변경 뒤 단축 슬롯의 봉혼석이 상급 봉혼석으로 바뀔 수 있습니다. 수정 일정은 아직 없어 변경 전후 슬롯을 확인하고 고가 소모품을 잘못 사용하는 상황을 피해야 합니다.",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "던전 목록의 0 표기는 실제 능력치 초기화가 아니다",
        paragraphs: [
          "원정·초월 방 목록에서 진행 중인 던전 참여자의 아이템과 전투력이 0으로 표시될 수 있습니다. 공식은 표시 이슈로 분류했고 8월 5일 정기점검 수정을 예정했습니다.",
          "8월 5일과 12일은 현재 공지의 예정 일정으로 변경될 수 있습니다. 각 점검 뒤 알려진 이슈와 실제 동작을 다시 확인한 뒤 기존 변경·파티 선택 절차로 돌아가는 편이 안전합니다.",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "규칙 정정과 글로벌 버전 경계",
        paragraphs: [
          "7월 5주 차 공식 CM 인포그래픽에 따르면 펫 자동 줍기는 캐릭터당 3,000,000 키나로 30일 이용하며 남은 기간이 30일 미만일 때만 다시 사용할 수 있습니다. 확인한 업데이트 노트와 CM 자료 어디에도 10레벨이나 멤버십 조건은 적혀 있지 않습니다. 관련 공식 업데이트에서 확인된 편의성 변경은 로비를 거치지 않는 즉시 캐릭터 변경이지 이름 변경이 아닙니다.",
          "글로벌 버전은 파운더스 팩의 9월 30일 얼리 액세스만 확인됐습니다. 사전 다운로드 시각, 서버 목록, 정식 출시일의 새 공지는 없습니다.",
        ],
      },
    ],
  }),
  "zh-hant": articleCopy("zh-hant", {
    eyebrow: "今日營運簡報",
    title: "AION2 7 月 30 日簡報：PC 與 Android 穩定性修補、角色切換風險",
    description:
      "彙整韓國服 PC 與 Android 穩定性修補、角色切換和副本列表已知問題、8 月修正節點，並更正寵物自動拾取規則。",
    intro:
      "截至 7 月 30 日 08:00（香港時間），韓國服務沒有新的正式更新說明或 CM 文章；昨晚新增的可執行資訊主要來自穩定性修補與 7 月第 5 週已知問題公告。實際修正狀態以官方後續修訂和遊戲內表現為準。",
    sourceNote:
      "資料核對：PURPLE PC 無停機修補、Android 穩定性應用程式更新、7 月第 5 週已知問題、7 月 29 日更新說明與 CM 簡報，以及全球版創始人包公告。",
    keywords: ["AION2 7月30日簡報", "AION2 當機修補", "AION2 角色切換問題", "AION2 封魂石"],
    sections: [
      {
        id: "client-stability-patches",
        title: "PC 與 Android 用戶端都要主動更新",
        paragraphs: [
          "PURPLE PC 已推送無停機修補，用於改善間歇性斷線與當機。正在執行 PC 版的玩家需要完整退出遊戲後重新登入，才能確保修補已套用。",
          "Android 版於 7 月 29 日 22:17 KST 套用穩定性更新。官方要求從 Google Play 更新至最新版；公告沒有把這項要求擴及 iOS。",
        ],
      },
      {
        id: "character-switching-risks",
        title: "角色切換：先看資料，再檢查快捷欄",
        paragraphs: [
          "首次開啟角色切換視窗時，其他角色的戰力與裝備等級可能顯示「—」，透過大廳重新進入即可更新；切換後主選單頭像異常預計於 8 月 12 日修正。",
          "角色切換後，快捷欄中的封魂石可能變成更高階封魂石。官方尚未公布修正日期，切換前後都應檢查快捷欄，避免誤用高價值消耗品。",
        ],
      },
      {
        id: "dungeon-display-and-fix-dates",
        title: "副本房間顯示 0，不代表實際能力歸零",
        paragraphs: [
          "遠征與超越房間列表中，正在進行副本的參與者裝備和戰力可能顯示為 0。官方將其列為顯示問題，預計在 8 月 5 日例行維護修正。",
          "8 月 5 日與 12 日是目前公告中的預定節點，仍可能變動。每次維護後應重新檢查已知問題與遊戲內實際表現。",
        ],
      },
      {
        id: "fact-check-and-global-boundary",
        title: "規則勘誤與全球版邊界",
        paragraphs: [
          "7 月第 5 週官方 CM 簡報圖確認，寵物自動拾取為每個角色支付 3,000,000 基納使用 30 天，剩餘不足 30 天時才能再次使用；已核對的正式更新說明與 CM 資料均未列出「角色 10 級＋會員」門檻。相關正式更新確認的便利性改動是無須返回大廳即可切換角色，並非即時改名。",
          "全球版已核對來源仍只確認創始人包的 9 月 30 日搶先體驗，沒有新的預載時間、伺服器清單或完整上線日。韓國服修補與時程不能直接視為全球版承諾。",
        ],
      },
    ],
  }),
};

export const july30DailyNewsEntry = {
  section: "news",
  slug: "july-30-2026-client-patches-character-switch-known-issues",
  schemaType: "NewsArticle",
  publishedAt: "2026-07-30",
  updatedAt: "2026-07-30",
  readingMinutes: 5,
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
    {
      kind: "content",
      section: "news",
      slug: "july-29-2026-pet-auto-loot-server-matching-update",
    },
    { kind: "content", section: "guides", slug: "equipment-tuning" },
    { kind: "content", section: "guides", slug: "abyss-status" },
  ],
  translations,
} as const satisfies ContentEntry;

export const july30DailyNewsGeneratedEditorialEntry = {
  "news/july-30-2026-client-patches-character-switch-known-issues": {},
} as const;
