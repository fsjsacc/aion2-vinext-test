import type { SiteLocale } from "./site-config";

export type CodeStatus = "active" | "expired";

export type LocalizedCodePeriod = {
  from: string;
  until: string;
};

type Localized<T> = Record<SiteLocale, T>;

export type CodeSource = {
  label: Localized<string>;
  publishedAt: string;
  url: string;
};

export type Aion2CodeRecord = {
  id: string;
  code: string;
  status: CodeStatus;
  validFrom: string;
  validUntil: string;
  verifiedAt: string;
  period: Localized<LocalizedCodePeriod>;
  title: Localized<string>;
  serverScope: Localized<string>;
  accountLimit: Localized<string>;
  rewards: Localized<readonly string[]>;
  sources: readonly CodeSource[];
};

const globalCouponPortalUrl = "https://nshop.plaync.com/shop/aion2/coupon";

export const officialCouponPortalUrls: Record<SiteLocale, string> = {
  "zh-hans": globalCouponPortalUrl,
  en: globalCouponPortalUrl,
  fr: globalCouponPortalUrl,
  de: globalCouponPortalUrl,
  es: globalCouponPortalUrl,
  ja: globalCouponPortalUrl,
  "pt-br": globalCouponPortalUrl,
  ru: globalCouponPortalUrl,
  ko: globalCouponPortalUrl,
  "zh-hant": "https://nshop.plaync.com/shop/aion2_tw/coupon",
};

export const officialCouponPortalUrl = officialCouponPortalUrls.en;

const chapterOneSource: CodeSource = {
  label: {
    "zh-hans": "NC 官方 SUMMER FESTA Showcase 兑换码公告",
    en: "Official NC SUMMER FESTA Showcase coupon notice",
    fr: "Avis officiel NC sur le code du SUMMER FESTA Showcase",
    de: "Offizieller NC-Hinweis zum SUMMER FESTA Showcase-Code",
    es: "Aviso oficial de NC sobre el código del SUMMER FESTA Showcase",
    ja: "NC公式 SUMMER FESTA Showcase クーポン案内",
    "pt-br": "Aviso oficial da NC sobre o código do SUMMER FESTA Showcase",
    ru: "Официальное объявление NC о коде SUMMER FESTA Showcase",
    ko: "NC 공식 SUMMER FESTA 쇼케이스 쿠폰 안내",
    "zh-hant": "NC 官方 SUMMER FESTA Showcase 兌換碼公告",
  },
  publishedAt: "2026-06-14",
  url: "https://lounge.plaync.com/feed/72128?country=KR&locale=ko-KR",
};

const chapterOnePressRelease: CodeSource = {
  label: {
    "zh-hans": "NC Chapter 1 奖励新闻稿",
    en: "NC Chapter 1 rewards press release",
    fr: "Communiqué NC sur les récompenses du Chapter 1",
    de: "NC-Pressemitteilung zu den Belohnungen von Chapter 1",
    es: "Comunicado de NC sobre las recompensas de Chapter 1",
    ja: "NC Chapter 1 報酬プレスリリース",
    "pt-br": "Comunicado da NC sobre as recompensas do Chapter 1",
    ru: "Пресс-релиз NC о наградах Chapter 1",
    ko: "NC Chapter 1 보상 보도자료",
    "zh-hant": "NC Chapter 1 獎勵新聞稿",
  },
  publishedAt: "2026-06-17",
  url: "https://about.ncsoft.com/en/news/article/aion2_update_20260617",
};

const chapterOneTaiwanSource: CodeSource = {
  label: {
    "zh-hans": "AION2 台湾官方 SUMMER FESTA Showcase 公告",
    en: "Official AION2 Taiwan SUMMER FESTA Showcase notice",
    fr: "Annonce officielle AION2 Taiwan du SUMMER FESTA Showcase",
    de: "Offizielle AION2-Taiwan-Ankündigung zum SUMMER FESTA Showcase",
    es: "Anuncio oficial de AION2 Taiwán sobre el SUMMER FESTA Showcase",
    ja: "AION2台湾公式 SUMMER FESTA Showcase お知らせ",
    "pt-br": "Anúncio oficial de AION2 Taiwan sobre o SUMMER FESTA Showcase",
    ru: "Официальное объявление AION2 Taiwan о SUMMER FESTA Showcase",
    ko: "AION2 대만 공식 SUMMER FESTA 쇼케이스 공지",
    "zh-hant": "AION2 台灣官方 SUMMER FESTA Showcase 公告",
  },
  publishedAt: "2026-06-14",
  url: "https://tw.ncsoft.com/aion2/board/notice/view?articleId=6a2d31eb44d59531d5ad87c7",
};

const seasonThreeSource: CodeSource = {
  label: {
    "zh-hans": "NC 官方 Season 3 兑换码公告",
    en: "Official NC Season 3 coupon notice",
    fr: "Avis officiel NC sur le code de la Season 3",
    de: "Offizieller NC-Hinweis zum Season-3-Code",
    es: "Aviso oficial de NC sobre el código de Season 3",
    ja: "NC公式 Season 3 クーポン案内",
    "pt-br": "Aviso oficial da NC sobre o código da Season 3",
    ru: "Официальное объявление NC о коде Season 3",
    ko: "NC 공식 시즌3 쿠폰 안내",
    "zh-hant": "NC 官方 Season 3 兌換碼公告",
  },
  publishedAt: "2026-04-08",
  url: "https://lounge.plaync.com/feed/64507?country=KR&locale=ko-KR",
};

const anniversarySource: CodeSource = {
  label: {
    "zh-hans": "NC 官方回归、100 日与农历新年直播兑换码公告",
    en: "Official NC welcome-back, 100-day, and Lunar New Year coupon notice",
    fr: "Avis officiel NC sur les codes de retour, des 100 jours et du Nouvel An lunaire",
    de: "Offizieller NC-Hinweis zu Rückkehr-, 100-Tage- und Mondneujahrs-Codes",
    es: "Aviso oficial de NC sobre los códigos de regreso, 100 días y Año Nuevo Lunar",
    ja: "NC公式 復帰・100日・旧正月ライブ クーポン案内",
    "pt-br": "Aviso oficial da NC sobre os códigos de retorno, 100 dias e Ano-Novo Lunar",
    ru: "Официальное объявление NC о кодах возвращения, 100 дней и Лунного Нового года",
    ko: "NC 공식 복귀·100일·설날 라이브 쿠폰 안내",
    "zh-hant": "NC 官方回歸、100 日與農曆新年直播兌換碼公告",
  },
  publishedAt: "2026-02-22",
  url: "https://lounge.plaync.com/feed/59721?country=KR&locale=ko-KR",
};

const oncePerAccount: Localized<string> = {
  "zh-hans": "每个账号限 1 次",
  en: "Once per account",
  fr: "Une fois par compte",
  de: "Einmal pro Konto",
  es: "Una vez por cuenta",
  ja: "1アカウントにつき1回",
  "pt-br": "Uma vez por conta",
  ru: "Один раз на аккаунт",
  ko: "계정당 1회",
  "zh-hant": "每個帳號限 1 次",
};

export const aion2CodeRegistry: readonly Aion2CodeRecord[] = [
  {
    id: "chapter-one-showcase",
    code: "AION2CHAPTERONE",
    status: "active",
    validFrom: "2026-06-14T17:00:00+09:00",
    validUntil: "2026-09-30",
    verifiedAt: "2026-07-20",
    period: {
      "zh-hans": { from: "2026 年 6 月 14 日 17:00", until: "2026 年 9 月 30 日定期维护前" },
      en: { from: "June 14, 2026 at 17:00", until: "Before scheduled maintenance on September 30, 2026" },
      fr: { from: "14 juin 2026 à 17:00", until: "Avant la maintenance programmée du 30 septembre 2026" },
      de: { from: "14. Juni 2026 um 17:00 Uhr", until: "Vor der planmäßigen Wartung am 30. September 2026" },
      es: { from: "14 de junio de 2026 a las 17:00", until: "Antes del mantenimiento programado del 30 de septiembre de 2026" },
      ja: { from: "2026年6月14日 17:00", until: "2026年9月30日の定期メンテナンス前まで" },
      "pt-br": { from: "14 de junho de 2026 às 17:00", until: "Antes da manutenção programada de 30 de setembro de 2026" },
      ru: { from: "14 июня 2026 г., 17:00", until: "До планового техобслуживания 30 сентября 2026 г." },
      ko: { from: "2026년 6월 14일 17:00", until: "2026년 9월 30일 정기점검 전까지" },
      "zh-hant": { from: "2026 年 6 月 14 日 17:00", until: "2026 年 9 月 30 日定期維護前" },
    },
    title: {
      "zh-hans": "Chapter 1 Showcase 纪念兑换码",
      en: "Chapter 1 Showcase coupon",
      fr: "Code du Chapter 1 Showcase",
      de: "Chapter 1 Showcase-Code",
      es: "Código del Chapter 1 Showcase",
      ja: "Chapter 1 Showcase 記念クーポン",
      "pt-br": "Código do Chapter 1 Showcase",
      ru: "Код Chapter 1 Showcase",
      ko: "Chapter 1 쇼케이스 기념 쿠폰",
      "zh-hant": "Chapter 1 Showcase 紀念兌換碼",
    },
    serverScope: {
      "zh-hans": "官方公告标示当前运营服全服务器；不代表 2026 年 9 月全球 PC 版一定适用",
      en: "The official notice says all live-service servers; this does not confirm global PC edition eligibility",
      fr: "L’avis officiel indique tous les serveurs du service actuel ; l’éligibilité de l’édition PC mondiale n’est pas confirmée",
      de: "Laut offizieller Mitteilung gilt der Code auf allen aktuellen Live-Servern; die globale PC-Version ist damit nicht bestätigt",
      es: "El aviso oficial indica todos los servidores del servicio actual; no confirma que funcione en la edición global para PC",
      ja: "公式案内では現行サービスの全サーバーが対象です。グローバルPC版での利用を保証するものではありません",
      "pt-br": "O aviso oficial inclui todos os servidores do serviço atual; isso não confirma a edição global para PC",
      ru: "В объявлении указаны все серверы текущего сервиса; поддержка глобальной PC-версии не подтверждена",
      ko: "공식 안내 기준 현재 라이브 서비스 전체 서버 대상이며, 글로벌 PC 버전 사용 가능 여부는 확인되지 않았습니다",
      "zh-hant": "官方公告標示現行服務全伺服器；不代表 2026 年 9 月全球 PC 版一定適用",
    },
    accountLimit: oncePerAccount,
    rewards: {
      "zh-hans": ["侵蚀净化所奖励券（30 日）×1", "奥德能量（30 日）×5", "复活精灵石 ×20", "灵魂之书 ×1,000", "每日副本立即完成券 ×10"],
      en: ["Sanctum of Erosion reward ticket (30 days) ×1", "Odyle Energy (30 days) ×5", "Resurrection Spiritstone ×20", "Soul Codex ×1,000", "Daily Dungeon Instant Completion Ticket ×10"],
      fr: ["Ticket de récompense du Sanctuaire de l’érosion (30 jours) ×1", "Énergie d’Odyle (30 jours) ×5", "Pierre spirituelle de résurrection ×20", "Codex d’âme ×1 000", "Ticket d’achèvement instantané du donjon quotidien ×10"],
      de: ["Belohnungsticket für das Heiligtum der Erosion (30 Tage) ×1", "Odyle-Energie (30 Tage) ×5", "Auferstehungs-Geisterstein ×20", "Seelenkodex ×1.000", "Sofortabschluss-Ticket für tägliche Dungeons ×10"],
      es: ["Vale de recompensa del Santuario de la Erosión (30 días) ×1", "Energía de Odyle (30 días) ×5", "Piedra espiritual de resurrección ×20", "Códice de alma ×1.000", "Vale de finalización instantánea de mazmorra diaria ×10"],
      ja: ["侵食の聖所 報酬チケット（30日）×1", "オードエネルギー（30日）×5", "復活の精霊石 ×20", "魂の書 ×1,000", "デイリーダンジョン即時完了券 ×10"],
      "pt-br": ["Bilhete de recompensa do Santuário da Erosão (30 dias) ×1", "Energia de Odyle (30 dias) ×5", "Pedra espiritual da ressurreição ×20", "Códice da alma ×1.000", "Bilhete de conclusão instantânea de masmorra diária ×10"],
      ru: ["Билет награды Святилища эрозии (30 дней) ×1", "Энергия Одиля (30 дней) ×5", "Камень духа воскрешения ×20", "Кодекс души ×1 000", "Билет мгновенного завершения ежедневного подземелья ×10"],
      ko: ["침식의 성소 보상 이용권(30일) ×1", "오드 에너지(30일) ×5", "부활의 정령석 ×20", "영혼의 서 ×1,000", "일일 던전 즉시 완료권 ×10"],
      "zh-hant": ["侵蝕淨化所獎勵券（30 日）×1", "奧德能量（30 日）×5", "復活精靈石 ×20", "靈魂之書 ×1,000", "每日副本立即完成券 ×10"],
    },
    sources: [chapterOneSource, chapterOneTaiwanSource, chapterOnePressRelease],
  },
  {
    id: "season-three",
    code: "AION2SEASON3",
    status: "expired",
    validFrom: "2026-04-08T14:00:00+09:00",
    validUntil: "2026-07-01",
    verifiedAt: "2026-07-20",
    period: {
      "zh-hans": { from: "2026 年 4 月 8 日 14:00", until: "2026 年 7 月 1 日定期维护前" },
      en: { from: "April 8, 2026 at 14:00", until: "Before scheduled maintenance on July 1, 2026" },
      fr: { from: "8 avril 2026 à 14:00", until: "Avant la maintenance programmée du 1er juillet 2026" },
      de: { from: "8. April 2026 um 14:00 Uhr", until: "Vor der planmäßigen Wartung am 1. Juli 2026" },
      es: { from: "8 de abril de 2026 a las 14:00", until: "Antes del mantenimiento programado del 1 de julio de 2026" },
      ja: { from: "2026年4月8日 14:00", until: "2026年7月1日の定期メンテナンス前まで" },
      "pt-br": { from: "8 de abril de 2026 às 14:00", until: "Antes da manutenção programada de 1º de julho de 2026" },
      ru: { from: "8 апреля 2026 г., 14:00", until: "До планового техобслуживания 1 июля 2026 г." },
      ko: { from: "2026년 4월 8일 14:00", until: "2026년 7월 1일 정기점검 전까지" },
      "zh-hant": { from: "2026 年 4 月 8 日 14:00", until: "2026 年 7 月 1 日定期維護前" },
    },
    title: {
      "zh-hans": "Season 3 新旅程兑换码",
      en: "Season 3 New Journey coupon",
      fr: "Code Nouveau voyage de la Season 3",
      de: "Season 3: Neue-Reise-Code",
      es: "Código Nuevo viaje de Season 3",
      ja: "Season 3 新たな旅路クーポン",
      "pt-br": "Código Nova Jornada da Season 3",
      ru: "Код «Новое путешествие» Season 3",
      ko: "시즌3 새로운 여정 쿠폰",
      "zh-hant": "Season 3 新旅程兌換碼",
    },
    serverScope: {
      "zh-hans": "官方公告列出的全部服务器",
      en: "All servers listed by the official notice",
      fr: "Tous les serveurs indiqués dans l’avis officiel",
      de: "Alle in der offiziellen Mitteilung aufgeführten Server",
      es: "Todos los servidores indicados en el aviso oficial",
      ja: "公式案内に記載された全サーバー",
      "pt-br": "Todos os servidores listados no aviso oficial",
      ru: "Все серверы, указанные в официальном объявлении",
      ko: "공식 안내에 명시된 전체 서버",
      "zh-hant": "官方公告列出的全部伺服器",
    },
    accountLimit: oncePerAccount,
    rewards: {
      "zh-hans": ["奥德能量 ×4", "远征／超越挑战券选择箱 ×2", "每日副本立即完成券 ×10", "战斗强化卷轴 ×10"],
      en: ["Odyle Energy ×4", "Expedition/Transcendence ticket selection chest ×2", "Daily Dungeon Instant Completion Ticket ×10", "Battle Enhance Scroll ×10"],
      fr: ["Énergie d’Odyle ×4", "Coffre de sélection de tickets Expédition/Transcendance ×2", "Ticket d’achèvement instantané du donjon quotidien ×10", "Parchemin d’amélioration de combat ×10"],
      de: ["Odyle-Energie ×4", "Auswahltruhe für Expeditions-/Transzendenz-Tickets ×2", "Sofortabschluss-Ticket für tägliche Dungeons ×10", "Kampfverstärkungsrolle ×10"],
      es: ["Energía de Odyle ×4", "Cofre de selección de vales de Expedición/Trascendencia ×2", "Vale de finalización instantánea de mazmorra diaria ×10", "Pergamino de mejora de combate ×10"],
      ja: ["オードエネルギー ×4", "遠征／超越チケット選択箱 ×2", "デイリーダンジョン即時完了券 ×10", "戦闘強化スクロール ×10"],
      "pt-br": ["Energia de Odyle ×4", "Baú de seleção de bilhetes de Expedição/Transcendência ×2", "Bilhete de conclusão instantânea de masmorra diária ×10", "Pergaminho de aprimoramento de combate ×10"],
      ru: ["Энергия Одиля ×4", "Сундук выбора билета Экспедиции/Превосхождения ×2", "Билет мгновенного завершения ежедневного подземелья ×10", "Свиток боевого усиления ×10"],
      ko: ["오드 에너지 ×4", "원정/초월 도전권 선택 상자 ×2", "일일 던전 즉시 완료권 ×10", "전투 강화 주문서 ×10"],
      "zh-hant": ["奧德能量 ×4", "遠征／超越挑戰券選擇箱 ×2", "每日副本立即完成券 ×10", "戰鬥強化卷軸 ×10"],
    },
    sources: [seasonThreeSource],
  },
  {
    id: "welcome-back",
    code: "WELCOMEBACK",
    status: "expired",
    validFrom: "2026-02-25T13:00:00+09:00",
    validUntil: "2026-04-08",
    verifiedAt: "2026-07-20",
    period: {
      "zh-hans": { from: "2026 年 2 月 25 日 13:00", until: "2026 年 4 月 8 日定期维护前" },
      en: { from: "February 25, 2026 at 13:00", until: "Before scheduled maintenance on April 8, 2026" },
      fr: { from: "25 février 2026 à 13:00", until: "Avant la maintenance programmée du 8 avril 2026" },
      de: { from: "25. Februar 2026 um 13:00 Uhr", until: "Vor der planmäßigen Wartung am 8. April 2026" },
      es: { from: "25 de febrero de 2026 a las 13:00", until: "Antes del mantenimiento programado del 8 de abril de 2026" },
      ja: { from: "2026年2月25日 13:00", until: "2026年4月8日の定期メンテナンス前まで" },
      "pt-br": { from: "25 de fevereiro de 2026 às 13:00", until: "Antes da manutenção programada de 8 de abril de 2026" },
      ru: { from: "25 февраля 2026 г., 13:00", until: "До планового техобслуживания 8 апреля 2026 г." },
      ko: { from: "2026년 2월 25일 13:00", until: "2026년 4월 8일 정기점검 전까지" },
      "zh-hant": { from: "2026 年 2 月 25 日 13:00", until: "2026 年 4 月 8 日定期維護前" },
    },
    title: {
      "zh-hans": "回归玩家感谢兑换码",
      en: "Welcome-back appreciation coupon",
      fr: "Code de remerciement pour le retour",
      de: "Willkommens-zurück-Code",
      es: "Código de agradecimiento por el regreso",
      ja: "復帰プレイヤー感謝クーポン",
      "pt-br": "Código de agradecimento pelo retorno",
      ru: "Код благодарности вернувшимся игрокам",
      ko: "복귀 감사 쿠폰",
      "zh-hant": "回歸玩家感謝兌換碼",
    },
    serverScope: {
      "zh-hans": "官方公告列出的全部服务器",
      en: "All servers listed by the official notice",
      fr: "Tous les serveurs indiqués dans l’avis officiel",
      de: "Alle in der offiziellen Mitteilung aufgeführten Server",
      es: "Todos los servidores indicados en el aviso oficial",
      ja: "公式案内に記載された全サーバー",
      "pt-br": "Todos os servidores listados no aviso oficial",
      ru: "Все серверы, указанные в официальном объявлении",
      ko: "공식 안내에 명시된 전체 서버",
      "zh-hant": "官方公告列出的全部伺服器",
    },
    accountLimit: oncePerAccount,
    rewards: {
      "zh-hans": ["+10 征服武器选择箱 ×1", "+10 征服防具选择箱 ×1", "+10 征服饰品选择箱 ×1", "宠物：敏捷鲁吉 ×1"],
      en: ["+10 Conquest weapon selection chest ×1", "+10 Conquest armor selection chest ×1", "+10 Conquest accessory selection chest ×1", "Pet: Swift Rugi ×1"],
      fr: ["Coffre de sélection d’arme de conquête +10 ×1", "Coffre de sélection d’armure de conquête +10 ×1", "Coffre de sélection d’accessoire de conquête +10 ×1", "Familier : Rugi agile ×1"],
      de: ["+10 Auswahltruhe für Eroberungswaffen ×1", "+10 Auswahltruhe für Eroberungsrüstungen ×1", "+10 Auswahltruhe für Eroberungszubehör ×1", "Begleiter: Flinker Rugi ×1"],
      es: ["Cofre de selección de arma de conquista +10 ×1", "Cofre de selección de armadura de conquista +10 ×1", "Cofre de selección de accesorio de conquista +10 ×1", "Mascota: Rugi veloz ×1"],
      ja: ["+10 征服武器選択箱 ×1", "+10 征服防具選択箱 ×1", "+10 征服アクセサリー選択箱 ×1", "ペット：俊敏なルギ ×1"],
      "pt-br": ["Baú de seleção de arma da Conquista +10 ×1", "Baú de seleção de armadura da Conquista +10 ×1", "Baú de seleção de acessório da Conquista +10 ×1", "Mascote: Rugi Ágil ×1"],
      ru: ["Сундук выбора оружия завоевания +10 ×1", "Сундук выбора доспехов завоевания +10 ×1", "Сундук выбора аксессуара завоевания +10 ×1", "Питомец: Быстрый Руги ×1"],
      ko: ["+10 정복 무기 선택 상자 ×1", "+10 정복 방어구 선택 상자 ×1", "+10 정복 장신구 선택 상자 ×1", "펫: 날쌘 루기 ×1"],
      "zh-hant": ["+10 征服武器選擇箱 ×1", "+10 征服防具選擇箱 ×1", "+10 征服飾品選擇箱 ×1", "寵物：敏捷魯吉 ×1"],
    },
    sources: [anniversarySource],
  },
  {
    id: "one-hundred-days",
    code: "AION2DAYS100",
    status: "expired",
    validFrom: "2026-02-26T00:00:00+09:00",
    validUntil: "2026-04-08",
    verifiedAt: "2026-07-20",
    period: {
      "zh-hans": { from: "2026 年 2 月 26 日 00:00", until: "2026 年 4 月 8 日定期维护前" },
      en: { from: "February 26, 2026 at 00:00", until: "Before scheduled maintenance on April 8, 2026" },
      fr: { from: "26 février 2026 à 00:00", until: "Avant la maintenance programmée du 8 avril 2026" },
      de: { from: "26. Februar 2026 um 00:00 Uhr", until: "Vor der planmäßigen Wartung am 8. April 2026" },
      es: { from: "26 de febrero de 2026 a las 00:00", until: "Antes del mantenimiento programado del 8 de abril de 2026" },
      ja: { from: "2026年2月26日 00:00", until: "2026年4月8日の定期メンテナンス前まで" },
      "pt-br": { from: "26 de fevereiro de 2026 às 00:00", until: "Antes da manutenção programada de 8 de abril de 2026" },
      ru: { from: "26 февраля 2026 г., 00:00", until: "До планового техобслуживания 8 апреля 2026 г." },
      ko: { from: "2026년 2월 26일 00:00", until: "2026년 4월 8일 정기점검 전까지" },
      "zh-hant": { from: "2026 年 2 月 26 日 00:00", until: "2026 年 4 月 8 日定期維護前" },
    },
    title: {
      "zh-hans": "上线 100 日纪念兑换码",
      en: "100-day anniversary coupon",
      fr: "Code anniversaire des 100 jours",
      de: "100-Tage-Jubiläumscode",
      es: "Código del aniversario de 100 días",
      ja: "サービス100日記念クーポン",
      "pt-br": "Código comemorativo de 100 dias",
      ru: "Код к 100-дневному юбилею",
      ko: "출시 100일 기념 쿠폰",
      "zh-hant": "上線 100 日紀念兌換碼",
    },
    serverScope: {
      "zh-hans": "官方公告列出的全部服务器",
      en: "All servers listed by the official notice",
      fr: "Tous les serveurs indiqués dans l’avis officiel",
      de: "Alle in der offiziellen Mitteilung aufgeführten Server",
      es: "Todos los servidores indicados en el aviso oficial",
      ja: "公式案内に記載された全サーバー",
      "pt-br": "Todos os servidores listados no aviso oficial",
      ru: "Все серверы, указанные в официальном объявлении",
      ko: "공식 안내에 명시된 전체 서버",
      "zh-hant": "官方公告列出的全部伺服器",
    },
    accountLimit: oncePerAccount,
    rewards: {
      "zh-hans": ["复活精灵石 ×20", "生命结晶 ×20", "奥德能量 ×3", "外观变更券（7 日）×1"],
      en: ["Resurrection Spiritstone ×20", "Life Crystal ×20", "Odyle Energy ×3", "Appearance Change Ticket (7 days) ×1"],
      fr: ["Pierre spirituelle de résurrection ×20", "Cristal de vie ×20", "Énergie d’Odyle ×3", "Ticket de modification d’apparence (7 jours) ×1"],
      de: ["Auferstehungs-Geisterstein ×20", "Lebenskristall ×20", "Odyle-Energie ×3", "Aussehensänderungs-Ticket (7 Tage) ×1"],
      es: ["Piedra espiritual de resurrección ×20", "Cristal de vida ×20", "Energía de Odyle ×3", "Vale de cambio de apariencia (7 días) ×1"],
      ja: ["復活の精霊石 ×20", "生命の結晶 ×20", "オードエネルギー ×3", "外見変更券（7日）×1"],
      "pt-br": ["Pedra espiritual da ressurreição ×20", "Cristal da vida ×20", "Energia de Odyle ×3", "Bilhete de alteração de aparência (7 dias) ×1"],
      ru: ["Камень духа воскрешения ×20", "Кристалл жизни ×20", "Энергия Одиля ×3", "Билет изменения внешности (7 дней) ×1"],
      ko: ["부활의 정령석 ×20", "생명의 결정 ×20", "오드 에너지 ×3", "외형 변경권(7일) ×1"],
      "zh-hant": ["復活精靈石 ×20", "生命結晶 ×20", "奧德能量 ×3", "外觀變更券（7 日）×1"],
    },
    sources: [anniversarySource],
  },
  {
    id: "lunar-new-year-live",
    code: "LUCKYAION2",
    status: "expired",
    validFrom: "2026-02-10T21:00:00+09:00",
    validUntil: "2026-04-08",
    verifiedAt: "2026-07-20",
    period: {
      "zh-hans": { from: "2026 年 2 月 10 日 21:00", until: "2026 年 4 月 8 日定期维护前" },
      en: { from: "February 10, 2026 at 21:00", until: "Before scheduled maintenance on April 8, 2026" },
      fr: { from: "10 février 2026 à 21:00", until: "Avant la maintenance programmée du 8 avril 2026" },
      de: { from: "10. Februar 2026 um 21:00 Uhr", until: "Vor der planmäßigen Wartung am 8. April 2026" },
      es: { from: "10 de febrero de 2026 a las 21:00", until: "Antes del mantenimiento programado del 8 de abril de 2026" },
      ja: { from: "2026年2月10日 21:00", until: "2026年4月8日の定期メンテナンス前まで" },
      "pt-br": { from: "10 de fevereiro de 2026 às 21:00", until: "Antes da manutenção programada de 8 de abril de 2026" },
      ru: { from: "10 февраля 2026 г., 21:00", until: "До планового техобслуживания 8 апреля 2026 г." },
      ko: { from: "2026년 2월 10일 21:00", until: "2026년 4월 8일 정기점검 전까지" },
      "zh-hant": { from: "2026 年 2 月 10 日 21:00", until: "2026 年 4 月 8 日定期維護前" },
    },
    title: {
      "zh-hans": "农历新年直播兑换码",
      en: "Lunar New Year livestream coupon",
      fr: "Code du direct du Nouvel An lunaire",
      de: "Mondneujahrs-Livestream-Code",
      es: "Código del directo del Año Nuevo Lunar",
      ja: "旧正月ライブ配信クーポン",
      "pt-br": "Código da transmissão de Ano-Novo Lunar",
      ru: "Код трансляции к Лунному Новому году",
      ko: "설날 라이브 방송 쿠폰",
      "zh-hant": "農曆新年直播兌換碼",
    },
    serverScope: {
      "zh-hans": "仅韩国服务；台湾官方公告未列出此代码",
      en: "Korea service only; the Taiwan notice did not list this code",
      fr: "Service coréen uniquement ; l’annonce de Taiwan ne mentionnait pas ce code",
      de: "Nur für den koreanischen Dienst; in der Taiwan-Mitteilung wurde der Code nicht aufgeführt",
      es: "Solo para el servicio coreano; el aviso de Taiwán no incluía este código",
      ja: "韓国サービス限定。台湾版の公式案内には掲載されていません",
      "pt-br": "Apenas para o serviço coreano; o aviso de Taiwan não listou este código",
      ru: "Только для корейского сервиса; в объявлении Taiwan этого кода нет",
      ko: "한국 서비스 전용이며 대만 공식 공지에는 포함되지 않은 코드",
      "zh-hant": "僅限韓國服務；台灣官方公告未列出此代碼",
    },
    accountLimit: oncePerAccount,
    rewards: {
      "zh-hans": ["复活精灵石 ×5", "灵魂结晶 ×200", "奥德能量 ×3", "远征／超越挑战券选择箱 ×3"],
      en: ["Resurrection Spiritstone ×5", "Soul Crystal ×200", "Odyle Energy ×3", "Expedition/Transcendence ticket selection chest ×3"],
      fr: ["Pierre spirituelle de résurrection ×5", "Cristal d’âme ×200", "Énergie d’Odyle ×3", "Coffre de sélection de tickets Expédition/Transcendance ×3"],
      de: ["Auferstehungs-Geisterstein ×5", "Seelenkristall ×200", "Odyle-Energie ×3", "Auswahltruhe für Expeditions-/Transzendenz-Tickets ×3"],
      es: ["Piedra espiritual de resurrección ×5", "Cristal de alma ×200", "Energía de Odyle ×3", "Cofre de selección de vales de Expedición/Trascendencia ×3"],
      ja: ["復活の精霊石 ×5", "魂の結晶 ×200", "オードエネルギー ×3", "遠征／超越チケット選択箱 ×3"],
      "pt-br": ["Pedra espiritual da ressurreição ×5", "Cristal da alma ×200", "Energia de Odyle ×3", "Baú de seleção de bilhetes de Expedição/Transcendência ×3"],
      ru: ["Камень духа воскрешения ×5", "Кристалл души ×200", "Энергия Одиля ×3", "Сундук выбора билета Экспедиции/Превосхождения ×3"],
      ko: ["부활의 정령석 ×5", "영혼의 결정 ×200", "오드 에너지 ×3", "원정/초월 도전권 선택 상자 ×3"],
      "zh-hant": ["復活精靈石 ×5", "靈魂結晶 ×200", "奧德能量 ×3", "遠征／超越挑戰券選擇箱 ×3"],
    },
    sources: [anniversarySource],
  },
] as const;

export const codeRegistryUpdatedAt = aion2CodeRegistry.reduce(
  (latest, entry) => entry.verifiedAt > latest ? entry.verifiedAt : latest,
  "",
);

type CodePageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  activeEyebrow: string;
  historyEyebrow: string;
  guideEyebrow: string;
  currentTitle: string;
  currentDescription: string;
  historyTitle: string;
  historyDescription: string;
  guideTitle: string;
  guideDescription: string;
  inGameTitle: string;
  inGameSteps: readonly string[];
  webTitle: string;
  webSteps: readonly string[];
  redeemOfficial: string;
  active: string;
  expired: string;
  periodLabel: string;
  scopeLabel: string;
  limitLabel: string;
  rewardsLabel: string;
  sourceLabel: string;
  showCodeLabel: string;
  loadingCodeLabel: string;
  copyLabel: string;
  copyingLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
  confirmCopyTitle: string;
  confirmCopyMessage: string;
  confirmCopyLabel: string;
  cancelLabel: string;
  verifiedLabel: string;
  statsActive: string;
  statsHistory: string;
  statsVerified: string;
  cautionTitle: string;
  cautions: readonly string[];
  relatedNews: string;
  backHome: string;
};

export const codePageCopy = {
  "zh-hans": {
    eyebrow: "AION2 兑换码中心",
    title: "AION2 兑换码：可用 Code、期限与使用教程",
    description: "查看可用及过期的 AION2 兑换码、官方开始与截止日期、奖励摘要和游戏内兑换步骤。状态以 NC 官方公告核对，不把未经确认的代码标为有效。",
    breadcrumbLabel: "面包屑导航",
    activeEyebrow: "可用／已核实",
    historyEyebrow: "历史／官方日期",
    guideEyebrow: "兑换／分步教程",
    currentTitle: "当前可用",
    currentDescription: "仅列出在最后核实日仍处于官方兑换期限内的公开代码。",
    historyTitle: "历史兑换码",
    historyDescription: "已过期代码保留官方起止时间，便于识别旧帖中的失效信息。",
    guideTitle: "如何使用 AION2 兑换码",
    guideDescription: "NC 提供游戏内与官网两种入口；本站只整理步骤，不会索取你的 NC 密码。",
    inGameTitle: "游戏内兑换",
    inGameSteps: ["登录 AION2，并进入要领取奖励的服务和账号。", "打开游戏菜单并进入“环境设置”。", "依次选择“其他”→“账号”→“优惠券／兑换码登记”。", "输入完整代码并确认，不要添加空格。", "按照成功画面和活动公告领取奖励；不同活动的发放位置可能不同。"],
    webTitle: "在官方网站兑换",
    webSteps: ["打开 NC 官方 AION2 优惠券登记页面。", "登录 NC 账号，并按提示选择服务、账号或角色。", "粘贴代码并确认；保留成功或错误提示以便排查。"],
    redeemOfficial: "打开 NC 官方兑换页面",
    active: "可用",
    expired: "已过期",
    periodLabel: "官方兑换期限（韩国标准时间 KST）",
    scopeLabel: "适用范围",
    limitLabel: "兑换限制",
    rewardsLabel: "奖励摘要",
    sourceLabel: "官方公告",
    showCodeLabel: "显示兑换码",
    loadingCodeLabel: "正在加载兑换码…",
    copyLabel: "复制代码",
    copyingLabel: "正在复制…",
    copiedLabel: "已复制",
    copyFailedLabel: "复制失败，请手动选择代码",
    confirmCopyTitle: "要复制这个兑换码吗？",
    confirmCopyMessage: "确认后会把已显示的兑换码复制到剪贴板。",
    confirmCopyLabel: "确认复制",
    cancelLabel: "取消",
    verifiedLabel: "最后核实",
    statsActive: "可用代码",
    statsHistory: "历史代码",
    statsVerified: "数据核实日",
    cautionTitle: "兑换前先确认",
    cautions: ["公开兑换码与个人预注册序列号不同；不要公开个人序列号。", "现行服务公告中的“全服务器”不代表全球 PC 版一定适用。", "若提示已使用、无效或不符合资格，请检查期限、地区、账号次数和多余空格。", "AION2 KINA 不提供登录框，也不会索取密码、验证码或付款资料。"],
    relatedNews: "阅读 AION2CHAPTERONE 公告背景",
    backHome: "返回首页",
  },
  en: {
    eyebrow: "AION2 CODE CENTER",
    title: "AION2 Codes: Active Coupons, Dates & Redeem Guide",
    description: "Find active and expired AION2 coupon codes with official start and end dates, reward highlights, and in-game redemption steps. Statuses are checked against NC notices instead of community guesses.",
    breadcrumbLabel: "Breadcrumb",
    activeEyebrow: "LIVE / VERIFIED",
    historyEyebrow: "ARCHIVE / OFFICIAL DATES",
    guideEyebrow: "REDEEM / STEP BY STEP",
    currentTitle: "Active codes",
    currentDescription: "Only public codes still inside their official redemption window on the last verification date appear here.",
    historyTitle: "Code history",
    historyDescription: "Expired codes retain their official start and end dates so old posts are easy to identify.",
    guideTitle: "How to redeem an AION2 code",
    guideDescription: "NC documents in-game and web entry points. This site explains the steps and never asks for your NC password.",
    inGameTitle: "Redeem in game",
    inGameSteps: ["Sign in to AION2 and enter the service and account that should receive the reward.", "Open the game menu and choose Settings.", "Go to Other → Account → Coupon Registration.", "Enter the complete code and confirm it without adding spaces.", "Follow the success screen and event notice to find the reward; delivery can differ by event."],
    webTitle: "Redeem on the official website",
    webSteps: ["Open the official NC AION2 coupon registration page.", "Sign in to your NC account and select the service, account, or character when prompted.", "Paste the code, confirm it, and keep the success or error message for troubleshooting."],
    redeemOfficial: "Open the official NC redemption page",
    active: "Active",
    expired: "Expired",
    periodLabel: "Official redemption window (Korea Standard Time)",
    scopeLabel: "Availability",
    limitLabel: "Redemption limit",
    rewardsLabel: "Reward highlights",
    sourceLabel: "Official notice",
    showCodeLabel: "Show code",
    loadingCodeLabel: "Loading code…",
    copyLabel: "Copy code",
    copyingLabel: "Copying…",
    copiedLabel: "Copied",
    copyFailedLabel: "Copy failed—select the code manually",
    confirmCopyTitle: "Copy this code?",
    confirmCopyMessage: "Confirm to copy the revealed code to your clipboard.",
    confirmCopyLabel: "Confirm copy",
    cancelLabel: "Cancel",
    verifiedLabel: "Last verified",
    statsActive: "Active codes",
    statsHistory: "Historical codes",
    statsVerified: "Data checked",
    cautionTitle: "Check before redeeming",
    cautions: ["Public codes and personal pre-registration serials are different; never share a personal serial.", "“All servers” in a live-service notice does not automatically include the global PC edition.", "For used, invalid, or ineligible errors, check the period, region, account limit, and accidental spaces.", "AION2 KINA has no login form and will never ask for your password, verification code, or payment details."],
    relatedNews: "Read the AION2CHAPTERONE announcement context",
    backHome: "Back to home",
  },
  fr: {
    eyebrow: "CENTRE DES CODES AION2",
    title: "Codes AION2 : coupons actifs, dates et guide d’utilisation",
    description: "Consultez les codes AION2 actifs et expirés, leurs dates officielles, les récompenses et les étapes d’utilisation en jeu. Chaque statut est vérifié dans les annonces de NC.",
    breadcrumbLabel: "Fil d’Ariane",
    activeEyebrow: "ACTIFS / VÉRIFIÉS",
    historyEyebrow: "ARCHIVES / DATES OFFICIELLES",
    guideEyebrow: "UTILISATION / ÉTAPES",
    currentTitle: "Codes actifs",
    currentDescription: "Seuls les codes publics encore valides lors de la dernière vérification figurent ici.",
    historyTitle: "Historique des codes",
    historyDescription: "Les codes expirés conservent leurs dates officielles afin d’identifier facilement les anciennes publications.",
    guideTitle: "Comment utiliser un code AION2",
    guideDescription: "NC propose une saisie en jeu et sur le Web. Ce site explique les étapes sans jamais demander votre mot de passe NC.",
    inGameTitle: "Utiliser le code en jeu",
    inGameSteps: ["Connectez-vous à AION2 avec le service et le compte qui doivent recevoir la récompense.", "Ouvrez le menu du jeu, puis Paramètres.", "Accédez à Autres → Compte → Enregistrement de coupon.", "Saisissez le code complet sans espace, puis confirmez.", "Consultez l’écran de réussite et l’avis de l’événement pour récupérer la récompense."],
    webTitle: "Utiliser le code sur le site officiel",
    webSteps: ["Ouvrez la page officielle NC d’enregistrement des coupons AION2.", "Connectez-vous à votre compte NC et choisissez le service, le compte ou le personnage demandé.", "Collez le code, confirmez et conservez le message de réussite ou d’erreur."],
    redeemOfficial: "Ouvrir la page officielle d’utilisation",
    active: "Actif",
    expired: "Expiré",
    periodLabel: "Période officielle (heure normale de Corée)",
    scopeLabel: "Disponibilité",
    limitLabel: "Limite d’utilisation",
    rewardsLabel: "Principales récompenses",
    sourceLabel: "Annonce officielle",
    showCodeLabel: "Afficher le code",
    loadingCodeLabel: "Chargement du code…",
    copyLabel: "Copier le code",
    copyingLabel: "Copie…",
    copiedLabel: "Copié",
    copyFailedLabel: "Échec de la copie — sélectionnez le code manuellement",
    confirmCopyTitle: "Copier ce code ?",
    confirmCopyMessage: "Confirmez pour copier le code affiché dans le presse-papiers.",
    confirmCopyLabel: "Confirmer la copie",
    cancelLabel: "Annuler",
    verifiedLabel: "Dernière vérification",
    statsActive: "Codes actifs",
    statsHistory: "Codes archivés",
    statsVerified: "Données vérifiées",
    cautionTitle: "À vérifier avant utilisation",
    cautions: ["Un code public diffère d’un numéro personnel de préinscription ; ne partagez jamais ce dernier.", "La mention « tous les serveurs » d’un service existant n’inclut pas automatiquement l’édition PC mondiale.", "En cas de code utilisé, invalide ou non admissible, vérifiez la période, la région, la limite du compte et les espaces.", "AION2 KINA ne demande jamais votre mot de passe, votre code de vérification ni vos données de paiement."],
    relatedNews: "Lire le contexte de l’annonce AION2CHAPTERONE",
    backHome: "Retour à l’accueil",
  },
  de: {
    eyebrow: "AION2-CODEZENTRALE",
    title: "AION2-Codes: Aktive Coupons, Termine & Einlöseanleitung",
    description: "Hier findest du aktive und abgelaufene AION2-Codes mit offiziellen Laufzeiten, Belohnungen und Einlöseschritten. Der Status wird anhand der NC-Mitteilungen geprüft.",
    breadcrumbLabel: "Brotkrümelnavigation",
    activeEyebrow: "AKTIV / GEPRÜFT",
    historyEyebrow: "ARCHIV / OFFIZIELLE TERMINE",
    guideEyebrow: "EINLÖSEN / SCHRITT FÜR SCHRITT",
    currentTitle: "Aktive Codes",
    currentDescription: "Hier erscheinen nur öffentliche Codes, die am letzten Prüftag noch im offiziellen Einlösezeitraum lagen.",
    historyTitle: "Code-Archiv",
    historyDescription: "Abgelaufene Codes behalten ihre offiziellen Start- und Endtermine, damit alte Beiträge erkennbar bleiben.",
    guideTitle: "So löst du einen AION2-Code ein",
    guideDescription: "NC beschreibt Wege im Spiel und im Web. Diese Seite erklärt sie und fragt nie nach deinem NC-Passwort.",
    inGameTitle: "Im Spiel einlösen",
    inGameSteps: ["Melde dich bei AION2 mit dem Dienst und Konto an, das die Belohnung erhalten soll.", "Öffne das Spielmenü und wähle Einstellungen.", "Gehe zu Sonstiges → Konto → Coupon-Registrierung.", "Gib den vollständigen Code ohne Leerzeichen ein und bestätige.", "Prüfe Erfolgsanzeige und Event-Hinweis, um die Belohnung zu finden."],
    webTitle: "Auf der offiziellen Website einlösen",
    webSteps: ["Öffne die offizielle NC-Seite zur AION2-Coupon-Registrierung.", "Melde dich bei deinem NC-Konto an und wähle Dienst, Konto oder Charakter.", "Füge den Code ein, bestätige und bewahre die Erfolgs- oder Fehlermeldung auf."],
    redeemOfficial: "Offizielle Einlöseseite öffnen",
    active: "Aktiv",
    expired: "Abgelaufen",
    periodLabel: "Offizieller Einlösezeitraum (Koreanische Standardzeit)",
    scopeLabel: "Verfügbarkeit",
    limitLabel: "Einlöselimit",
    rewardsLabel: "Belohnungen",
    sourceLabel: "Offizielle Mitteilung",
    showCodeLabel: "Code anzeigen",
    loadingCodeLabel: "Code wird geladen…",
    copyLabel: "Code kopieren",
    copyingLabel: "Wird kopiert…",
    copiedLabel: "Kopiert",
    copyFailedLabel: "Kopieren fehlgeschlagen — Code manuell auswählen",
    confirmCopyTitle: "Diesen Code kopieren?",
    confirmCopyMessage: "Bestätige, um den angezeigten Code in die Zwischenablage zu kopieren.",
    confirmCopyLabel: "Kopieren bestätigen",
    cancelLabel: "Abbrechen",
    verifiedLabel: "Zuletzt geprüft",
    statsActive: "Aktive Codes",
    statsHistory: "Historische Codes",
    statsVerified: "Daten geprüft",
    cautionTitle: "Vor dem Einlösen prüfen",
    cautions: ["Öffentliche Codes sind keine persönlichen Vorregistrierungsnummern; teile persönliche Nummern nie.", "„Alle Server“ eines laufenden Dienstes umfasst nicht automatisch die globale PC-Version.", "Prüfe bei Fehlern Zeitraum, Region, Kontolimit und versehentliche Leerzeichen.", "AION2 KINA fragt nie nach Passwort, Verifizierungscode oder Zahlungsdaten."],
    relatedNews: "Hintergrund zur AION2CHAPTERONE-Ankündigung lesen",
    backHome: "Zur Startseite",
  },
  es: {
    eyebrow: "CENTRO DE CÓDIGOS AION2",
    title: "Códigos de AION2: cupones activos, fechas y guía",
    description: "Consulta códigos de AION2 activos y caducados, fechas oficiales, recompensas y pasos para canjearlos. Cada estado se verifica con los avisos de NC.",
    breadcrumbLabel: "Migas de pan",
    activeEyebrow: "ACTIVOS / VERIFICADOS",
    historyEyebrow: "ARCHIVO / FECHAS OFICIALES",
    guideEyebrow: "CANJE / PASO A PASO",
    currentTitle: "Códigos activos",
    currentDescription: "Aquí solo aparecen códigos públicos dentro del periodo oficial en la última fecha de verificación.",
    historyTitle: "Historial de códigos",
    historyDescription: "Los códigos caducados conservan sus fechas oficiales para identificar publicaciones antiguas.",
    guideTitle: "Cómo canjear un código de AION2",
    guideDescription: "NC ofrece acceso desde el juego y la web. Este sitio explica los pasos y nunca pide tu contraseña de NC.",
    inGameTitle: "Canjear en el juego",
    inGameSteps: ["Inicia sesión en AION2 con el servicio y la cuenta que recibirán la recompensa.", "Abre el menú del juego y entra en Ajustes.", "Ve a Otros → Cuenta → Registro de cupón.", "Introduce el código completo sin espacios y confirma.", "Consulta la pantalla de éxito y el aviso del evento para localizar la recompensa."],
    webTitle: "Canjear en el sitio oficial",
    webSteps: ["Abre la página oficial de NC para registrar cupones de AION2.", "Inicia sesión en tu cuenta de NC y elige el servicio, cuenta o personaje solicitado.", "Pega el código, confirma y conserva el mensaje de éxito o error."],
    redeemOfficial: "Abrir la página oficial de canje",
    active: "Activo",
    expired: "Caducado",
    periodLabel: "Periodo oficial (hora estándar de Corea)",
    scopeLabel: "Disponibilidad",
    limitLabel: "Límite de canje",
    rewardsLabel: "Recompensas destacadas",
    sourceLabel: "Aviso oficial",
    showCodeLabel: "Mostrar código",
    loadingCodeLabel: "Cargando código…",
    copyLabel: "Copiar código",
    copyingLabel: "Copiando…",
    copiedLabel: "Copiado",
    copyFailedLabel: "No se pudo copiar; selecciona el código manualmente",
    confirmCopyTitle: "¿Copiar este código?",
    confirmCopyMessage: "Confirma para copiar el código mostrado al portapapeles.",
    confirmCopyLabel: "Confirmar copia",
    cancelLabel: "Cancelar",
    verifiedLabel: "Última verificación",
    statsActive: "Códigos activos",
    statsHistory: "Códigos históricos",
    statsVerified: "Datos verificados",
    cautionTitle: "Comprueba antes de canjear",
    cautions: ["Los códigos públicos son distintos de los números personales de prerregistro; no compartas los personales.", "«Todos los servidores» de un servicio actual no incluye automáticamente la edición global para PC.", "Si aparece usado, no válido o no apto, revisa el periodo, la región, el límite de cuenta y los espacios.", "AION2 KINA nunca pide contraseñas, códigos de verificación ni datos de pago."],
    relatedNews: "Leer el contexto del anuncio AION2CHAPTERONE",
    backHome: "Volver al inicio",
  },
  ja: {
    eyebrow: "AION2 クーポンコード",
    title: "AION2 クーポンコード：使用可能コード・期限・登録方法",
    description: "AION2の使用可能・期限切れクーポンコード、公式期間、報酬、ゲーム内での登録手順をまとめています。状態はNC公式のお知らせで確認しています。",
    breadcrumbLabel: "パンくずリスト",
    activeEyebrow: "使用可能／確認済み",
    historyEyebrow: "履歴／公式期間",
    guideEyebrow: "登録／手順",
    currentTitle: "使用可能なコード",
    currentDescription: "最終確認日に公式期間内だった公開コードのみ掲載しています。",
    historyTitle: "過去のコード",
    historyDescription: "期限切れコードも公式の開始・終了日時を残し、古い投稿を判別できるようにしています。",
    guideTitle: "AION2クーポンコードの登録方法",
    guideDescription: "NCはゲーム内とWebの登録方法を案内しています。本サイトがNCパスワードを求めることはありません。",
    inGameTitle: "ゲーム内で登録",
    inGameSteps: ["報酬を受け取るサービスとアカウントでAION2にログインします。", "ゲームメニューから「環境設定」を開きます。", "「その他」→「アカウント」→「クーポン登録」を選びます。", "空白を入れずにコード全体を入力して確定します。", "完了画面とイベント案内で報酬の受取先を確認します。"],
    webTitle: "公式サイトで登録",
    webSteps: ["NC公式のAION2クーポン登録ページを開きます。", "NCアカウントにログインし、表示に従ってサービス・アカウント・キャラクターを選びます。", "コードを貼り付けて確定し、完了またはエラーメッセージを保存します。"],
    redeemOfficial: "NC公式クーポン登録ページを開く",
    active: "使用可能",
    expired: "期限切れ",
    periodLabel: "公式利用期間（韓国標準時 KST）",
    scopeLabel: "対象範囲",
    limitLabel: "利用制限",
    rewardsLabel: "主な報酬",
    sourceLabel: "公式お知らせ",
    showCodeLabel: "コードを表示",
    loadingCodeLabel: "コードを読み込み中…",
    copyLabel: "コードをコピー",
    copyingLabel: "コピー中…",
    copiedLabel: "コピーしました",
    copyFailedLabel: "コピーできませんでした。手動で選択してください",
    confirmCopyTitle: "このコードをコピーしますか？",
    confirmCopyMessage: "確認すると表示済みのコードをクリップボードにコピーします。",
    confirmCopyLabel: "コピーする",
    cancelLabel: "キャンセル",
    verifiedLabel: "最終確認",
    statsActive: "使用可能コード",
    statsHistory: "過去のコード",
    statsVerified: "データ確認日",
    cautionTitle: "登録前の確認",
    cautions: ["公開コードと個人用の事前登録シリアルは別物です。個人用シリアルは共有しないでください。", "現行サービスの「全サーバー」はグローバルPC版を自動的に含みません。", "使用済み・無効・対象外の場合は、期間、地域、回数、余分な空白を確認してください。", "AION2 KINAがパスワード、認証コード、支払情報を求めることはありません。"],
    relatedNews: "AION2CHAPTERONE発表の背景を読む",
    backHome: "ホームへ戻る",
  },
  "pt-br": {
    eyebrow: "CENTRAL DE CÓDIGOS AION2",
    title: "Códigos de AION2: cupons ativos, datas e guia",
    description: "Veja códigos de AION2 ativos e expirados, datas oficiais, recompensas e etapas de resgate. Cada status é conferido nos avisos da NC.",
    breadcrumbLabel: "Navegação estrutural",
    activeEyebrow: "ATIVOS / VERIFICADOS",
    historyEyebrow: "ARQUIVO / DATAS OFICIAIS",
    guideEyebrow: "RESGATE / PASSO A PASSO",
    currentTitle: "Códigos ativos",
    currentDescription: "Somente códigos públicos dentro do período oficial na última verificação aparecem aqui.",
    historyTitle: "Histórico de códigos",
    historyDescription: "Códigos expirados mantêm as datas oficiais para facilitar a identificação de publicações antigas.",
    guideTitle: "Como resgatar um código de AION2",
    guideDescription: "A NC oferece acesso no jogo e na web. Este site explica as etapas e nunca pede sua senha da NC.",
    inGameTitle: "Resgatar no jogo",
    inGameSteps: ["Entre no AION2 com o serviço e a conta que receberão a recompensa.", "Abra o menu do jogo e acesse Configurações.", "Vá para Outros → Conta → Registro de cupom.", "Digite o código completo sem espaços e confirme.", "Consulte a tela de sucesso e o aviso do evento para encontrar a recompensa."],
    webTitle: "Resgatar no site oficial",
    webSteps: ["Abra a página oficial da NC para registrar cupons de AION2.", "Entre na sua conta NC e escolha o serviço, a conta ou o personagem solicitado.", "Cole o código, confirme e guarde a mensagem de sucesso ou erro."],
    redeemOfficial: "Abrir a página oficial de resgate",
    active: "Ativo",
    expired: "Expirado",
    periodLabel: "Período oficial (horário padrão da Coreia)",
    scopeLabel: "Disponibilidade",
    limitLabel: "Limite de resgate",
    rewardsLabel: "Destaques das recompensas",
    sourceLabel: "Aviso oficial",
    showCodeLabel: "Mostrar código",
    loadingCodeLabel: "Carregando código…",
    copyLabel: "Copiar código",
    copyingLabel: "Copiando…",
    copiedLabel: "Copiado",
    copyFailedLabel: "Falha ao copiar — selecione o código manualmente",
    confirmCopyTitle: "Copiar este código?",
    confirmCopyMessage: "Confirme para copiar o código exibido para a área de transferência.",
    confirmCopyLabel: "Confirmar cópia",
    cancelLabel: "Cancelar",
    verifiedLabel: "Última verificação",
    statsActive: "Códigos ativos",
    statsHistory: "Códigos históricos",
    statsVerified: "Dados verificados",
    cautionTitle: "Confira antes de resgatar",
    cautions: ["Códigos públicos e números pessoais de pré-registro são diferentes; nunca compartilhe um número pessoal.", "“Todos os servidores” de um serviço atual não inclui automaticamente a edição global para PC.", "Se o código aparecer como usado, inválido ou inelegível, confira período, região, limite da conta e espaços.", "AION2 KINA nunca pede senha, código de verificação ou dados de pagamento."],
    relatedNews: "Ler o contexto do anúncio AION2CHAPTERONE",
    backHome: "Voltar ao início",
  },
  ru: {
    eyebrow: "ЦЕНТР КОДОВ AION2",
    title: "Коды AION2: активные купоны, сроки и инструкция",
    description: "Здесь собраны активные и истёкшие коды AION2, официальные сроки, награды и шаги активации. Статус проверяется по объявлениям NC.",
    breadcrumbLabel: "Навигационная цепочка",
    activeEyebrow: "АКТИВНЫЕ / ПРОВЕРЕНО",
    historyEyebrow: "АРХИВ / ОФИЦИАЛЬНЫЕ ДАТЫ",
    guideEyebrow: "АКТИВАЦИЯ / ПОШАГОВО",
    currentTitle: "Активные коды",
    currentDescription: "Здесь показаны только публичные коды, действовавшие на дату последней проверки.",
    historyTitle: "История кодов",
    historyDescription: "Для истёкших кодов сохраняются официальные даты, чтобы отличать устаревшие публикации.",
    guideTitle: "Как активировать код AION2",
    guideDescription: "NC предлагает активацию в игре и на сайте. Мы объясняем шаги и никогда не просим пароль NC.",
    inGameTitle: "Активация в игре",
    inGameSteps: ["Войдите в AION2 через сервис и аккаунт, которые должны получить награду.", "Откройте игровое меню и выберите «Настройки».", "Перейдите в «Прочее» → «Аккаунт» → «Регистрация купона».", "Введите полный код без пробелов и подтвердите.", "Проверьте экран успеха и объявление события, чтобы найти награду."],
    webTitle: "Активация на официальном сайте",
    webSteps: ["Откройте официальную страницу NC для регистрации купонов AION2.", "Войдите в аккаунт NC и выберите сервис, аккаунт или персонажа.", "Вставьте код, подтвердите и сохраните сообщение об успехе или ошибке."],
    redeemOfficial: "Открыть официальную страницу активации",
    active: "Активен",
    expired: "Истёк",
    periodLabel: "Официальный срок (корейское стандартное время)",
    scopeLabel: "Доступность",
    limitLabel: "Лимит активации",
    rewardsLabel: "Основные награды",
    sourceLabel: "Официальное объявление",
    showCodeLabel: "Показать код",
    loadingCodeLabel: "Загрузка кода…",
    copyLabel: "Копировать код",
    copyingLabel: "Копирование…",
    copiedLabel: "Скопировано",
    copyFailedLabel: "Не удалось скопировать — выделите код вручную",
    confirmCopyTitle: "Скопировать этот код?",
    confirmCopyMessage: "Подтвердите копирование показанного кода в буфер обмена.",
    confirmCopyLabel: "Подтвердить",
    cancelLabel: "Отмена",
    verifiedLabel: "Последняя проверка",
    statsActive: "Активные коды",
    statsHistory: "История кодов",
    statsVerified: "Дата проверки",
    cautionTitle: "Проверьте перед активацией",
    cautions: ["Публичные коды отличаются от личных серийных номеров предрегистрации; не публикуйте личный номер.", "«Все серверы» текущего сервиса не означает автоматическую поддержку глобальной PC-версии.", "При ошибке проверьте срок, регион, лимит аккаунта и лишние пробелы.", "AION2 KINA никогда не запрашивает пароль, код подтверждения или платёжные данные."],
    relatedNews: "Читать контекст объявления AION2CHAPTERONE",
    backHome: "На главную",
  },
  ko: {
    eyebrow: "AION2 쿠폰 센터",
    title: "AION2 쿠폰 코드: 사용 가능 코드·기간·등록 방법",
    description: "사용 가능하거나 만료된 AION2 쿠폰 코드와 공식 시작·종료일, 보상, 게임 내 등록 방법을 확인하세요. 상태는 커뮤니티 추측이 아닌 NC 공식 공지를 기준으로 검증합니다.",
    breadcrumbLabel: "이동 경로",
    activeEyebrow: "사용 가능 / 검증 완료",
    historyEyebrow: "기록 / 공식 기간",
    guideEyebrow: "등록 / 단계별 안내",
    currentTitle: "사용 가능한 코드",
    currentDescription: "마지막 확인일 기준 공식 사용 기간 안에 있는 공개 코드만 표시합니다.",
    historyTitle: "지난 쿠폰 코드",
    historyDescription: "만료된 코드도 공식 시작일과 종료일을 남겨 오래된 게시물을 구분할 수 있게 합니다.",
    guideTitle: "AION2 쿠폰 코드 등록 방법",
    guideDescription: "NC는 게임과 웹 등록 경로를 안내합니다. 이 사이트는 절차만 설명하며 NC 비밀번호를 요구하지 않습니다.",
    inGameTitle: "게임에서 등록",
    inGameSteps: ["보상을 받을 서비스와 계정으로 AION2에 로그인합니다.", "게임 메뉴에서 환경 설정을 엽니다.", "기타 → 계정 → 쿠폰 등록을 선택합니다.", "공백 없이 전체 코드를 입력하고 확인합니다.", "완료 화면과 이벤트 공지에서 보상 지급 위치를 확인합니다."],
    webTitle: "공식 웹사이트에서 등록",
    webSteps: ["NC 공식 AION2 쿠폰 등록 페이지를 엽니다.", "NC 계정에 로그인하고 안내에 따라 서비스, 계정 또는 캐릭터를 선택합니다.", "코드를 붙여 넣고 확인한 뒤 성공 또는 오류 메시지를 보관합니다."],
    redeemOfficial: "NC 공식 쿠폰 등록 페이지 열기",
    active: "사용 가능",
    expired: "만료",
    periodLabel: "공식 사용 기간(한국 표준시 KST)",
    scopeLabel: "사용 범위",
    limitLabel: "등록 제한",
    rewardsLabel: "주요 보상",
    sourceLabel: "공식 공지",
    showCodeLabel: "쿠폰 코드 보기",
    loadingCodeLabel: "쿠폰 코드 불러오는 중…",
    copyLabel: "코드 복사",
    copyingLabel: "복사 중…",
    copiedLabel: "복사됨",
    copyFailedLabel: "복사하지 못했습니다. 코드를 직접 선택하세요",
    confirmCopyTitle: "이 쿠폰 코드를 복사할까요?",
    confirmCopyMessage: "확인하면 표시된 코드를 클립보드에 복사합니다.",
    confirmCopyLabel: "복사 확인",
    cancelLabel: "취소",
    verifiedLabel: "마지막 확인",
    statsActive: "사용 가능 코드",
    statsHistory: "지난 코드",
    statsVerified: "자료 확인일",
    cautionTitle: "등록 전 확인",
    cautions: ["공개 쿠폰과 개인 사전 등록 시리얼은 다릅니다. 개인 시리얼을 공유하지 마세요.", "현재 서비스 공지의 ‘전체 서버’가 글로벌 PC 버전을 자동으로 포함하지는 않습니다.", "사용 완료, 무효 또는 대상 아님 오류가 나오면 기간, 지역, 계정 제한과 공백을 확인하세요.", "AION2 KINA는 비밀번호, 인증 코드 또는 결제 정보를 요구하지 않습니다."],
    relatedNews: "AION2CHAPTERONE 발표 배경 읽기",
    backHome: "홈으로",
  },
  "zh-hant": {
    eyebrow: "AION2 兌換碼中心",
    title: "AION2 兌換碼／序號：可用 Code、期限與使用教學",
    description: "查看目前可用與過期的 AION2 兌換碼（序號）、官方開始及截止日期、獎勵摘要和遊戲內兌換步驟。所有狀態以 NC 官方公告核對，不把未確認代碼標成有效。",
    breadcrumbLabel: "麵包屑導覽",
    activeEyebrow: "可用／已核實",
    historyEyebrow: "歷史／官方日期",
    guideEyebrow: "兌換／分步教學",
    currentTitle: "目前可用",
    currentDescription: "只列出在最後核對日仍位於官方使用期間內的公開兌換碼。",
    historyTitle: "歷史兌換碼",
    historyDescription: "已結束的代碼保留官方可用起訖時間，方便辨別過期資訊。",
    guideTitle: "如何使用 AION2 兌換碼",
    guideDescription: "NC 提供遊戲內與官網兩種入口；本站只整理步驟，不會索取你的 NC 密碼。",
    inGameTitle: "遊戲內兌換",
    inGameSteps: ["登入 AION2，進入要領取獎勵的服務與帳號。", "打開遊戲選單，進入「環境設定」。", "依序選擇「其他」→「帳號」→「優惠券／兌換碼登錄」。", "輸入完整代碼並確認，不要加入空格。", "依成功畫面與活動公告檢查獎勵；不同活動的發送位置可能不同。"],
    webTitle: "官方網站兌換",
    webSteps: ["開啟 NC 官方 AION2 優惠券登錄頁面。", "登入 NC 帳號，依頁面提示選擇服務、帳號或角色。", "貼上代碼並確認，保留成功或錯誤訊息以便排查。"],
    redeemOfficial: "前往 NC 官方兌換頁",
    active: "可用",
    expired: "已過期",
    periodLabel: "官方可用期間（韓國時間 KST）",
    scopeLabel: "適用範圍",
    limitLabel: "使用限制",
    rewardsLabel: "獎勵摘要",
    sourceLabel: "官方公告",
    showCodeLabel: "顯示兌換碼",
    loadingCodeLabel: "正在載入兌換碼…",
    copyLabel: "複製 Code",
    copyingLabel: "正在複製…",
    copiedLabel: "已複製",
    copyFailedLabel: "複製失敗，請手動選取",
    confirmCopyTitle: "是否複製兌換碼？",
    confirmCopyMessage: "確認後會將已顯示的兌換碼複製到剪貼簿。",
    confirmCopyLabel: "確認複製",
    cancelLabel: "取消",
    verifiedLabel: "最後核對",
    statsActive: "可用代碼",
    statsHistory: "歷史代碼",
    statsVerified: "資料核對日",
    cautionTitle: "兌換前先確認",
    cautions: ["公開兌換碼與個人事前預約序號不同；個人序號不要公開分享。", "現行服務公告中的「全伺服器」不等於全球 PC 版一定適用。", "若提示已使用、無效或不適用，先確認期間、地區、帳號限制與是否輸入空格。", "AION2 KINA 不提供登入框，也不會索取密碼、驗證碼或付款資料。"],
    relatedNews: "閱讀 AION2CHAPTERONE 公告背景",
    backHome: "返回首頁",
  },
} as const satisfies Record<SiteLocale, CodePageCopy>;

export function validateCodeRegistry(
  records: readonly Aion2CodeRecord[] = aion2CodeRegistry,
) {
  const ids = new Set<string>();
  const codes = new Set<string>();

  for (const record of records) {
    if (!record.id || ids.has(record.id)) {
      throw new Error(`Duplicate or missing code id: ${record.id || "missing"}`);
    }
    ids.add(record.id);

    if (!/^[A-Z0-9]+$/u.test(record.code) || codes.has(record.code)) {
      throw new Error(`Invalid or duplicate code: ${record.code}`);
    }
    codes.add(record.code);

    if (Date.parse(record.validFrom) > Date.parse(record.validUntil)) {
      throw new Error(`Invalid validity window for ${record.code}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(record.verifiedAt)) {
      throw new Error(`Invalid verification date for ${record.code}`);
    }
    if (!record.sources.length) {
      throw new Error(`Missing official source for ${record.code}`);
    }
    for (const source of record.sources) {
      if (!source.url.startsWith("https://")) {
        throw new Error(`Non-HTTPS source for ${record.code}`);
      }
    }
    for (const locale of Object.keys(codePageCopy) as SiteLocale[]) {
      if (
        !record.title[locale] ||
        !record.period[locale]?.from ||
        !record.period[locale]?.until ||
        !record.serverScope[locale] ||
        !record.accountLimit[locale] ||
        !record.rewards[locale]?.length ||
        record.sources.some((source) => !source.label[locale])
      ) {
        throw new Error(`Incomplete ${locale} data for ${record.code}`);
      }
    }
  }

  return true;
}

validateCodeRegistry();
