import { articleCopy, newsLabels, localizations, publishedVerified, section } from "./trending-september-3-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 4 — Pre-launch roadmap news: stress test → headstart → Oct 5 global launch, plus Gamescom demo implications */

const rmSource1: ContentSource = {
  id: "ncsoft-open-night-2026-08-29",
  kind: "official", publisher: "NCSoft",
  label: "AION 2 Announced at Opening Night Live: Global Launch Oct 5 2026",
  url: "https://aion2.plaync.com/ja-jp/board/notice/list",
  publishedAt: "2026-08-29",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "AION 2 在 Opening Night Live 公布：2026 年 10 月 5 日全球上线",
    en: "AION 2 Announced at Opening Night Live: Global Launch Oct 5 2026",
    fr: "AION 2 annoncé à Opening Night Live : lancement mondial le 5 oct. 2026",
    de: "AION 2 auf Opening Night Live vorgestellt: Global-Launch am 5. Okt. 2026",
    es: "AION 2 anunciado en Opening Night Live: lanzamiento global el 5 de oct. 2026",
    ja: "AION 2、Opening Night Live で発表：2026 年 10 月 5 日グローバル発売",
    "pt-br": "AION 2 anunciado no Opening Night Live: lançamento global em 5 de out. 2026",
    ru: "AION 2 объявлен на Opening Night Live: глобальный запуск 5 окт. 2026",
    ko: "AION 2, Opening Night Live 에서 공개: 2026년 10월 5일 글로벌 출시",
    "zh-hant": "AION 2 在 Opening Night Live 公佈：2026 年 10 月 5 日全球上線",
  }, "https://aion2.plaync.com/ja-jp/board/notice/list"),
};

const rmSource2: ContentSource = {
  id: "mmorpg-stress-test-2026-08",
  kind: "third-party", publisher: "MMORPG.com",
  label: "AION 2 Stress Test Completed Ahead of Oct 5 Global Launch",
  url: "https://www.mmorpg.com/preview/aion-2/20141",
  publishedAt: "2026-08-30",
  retrievedAt: "2026-09-03",
  verifiedAt: "2026-09-03",
  localizations: localizations({
    "zh-hans": "AION 2 压力测试完成，为 10 月 5 日全球上线铺路",
    en: "AION 2 Stress Test Completed Ahead of Oct 5 Global Launch",
    fr: "Test de stress d'AION 2 terminé avant le lancement mondial du 5 oct.",
    de: "AION 2 Stress-Test vor dem Global-Launch am 5. Okt. abgeschlossen",
    es: "Prueba de estrés de AION 2 completada antes del lanzamiento global del 5 de oct.",
    ja: "AION 2 ストレステスト完了、10 月 5 日グローバル発売へ",
    "pt-br": "Teste de estresse de AION 2 concluído antes do lançamento global de 5 de out.",
    ru: "Стресс-тест AION 2 завершён перед глобальным запуском 5 окт.",
    ko: "AION 2 스트레스 테스트 완료, 10월 5일 글로벌 출시로 이어져",
    "zh-hant": "AION 2 壓力測試完成，為 10 月 5 日全球上線鋪路",
  }, "https://www.mmorpg.com/preview/aion-2/20141"),
};

const rmHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1100, height: 605,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/ja-jp/board/notice/list",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 路线图新闻配图", caption: "压力测试完成 → 预上线 Headstart → 10/5 全球上线 → Gamescom 试玩验证。" },
    en: { alt: "AION 2 roadmap news image", caption: "Stress test complete → pre-launch headstart → Oct 5 global launch → Gamescom demo validation." },
    fr: { alt: "Image du roadmap d'AION 2", caption: "Test de stress terminé → avance avant lancement → lancement mondial 5 oct. → démo Gamescom." },
    de: { alt: "AION 2 Roadmap Bild", caption: "Stress-Test abgeschlossen → Pre-Launch-Vorsprung → 5. Okt. Global-Launch → Gamescom-Demo." },
    es: { alt: "Imagen del roadmap de AION 2", caption: "Prueba de estrés completada → ventaja previa al lanzamiento → lanzamiento global 5 de oct. → demo Gamescom." },
    ja: { alt: "AION 2 ロードマップニュース画像", caption: "ストレステスト完了 → 発売前 Headstart → 10/5 グローバル発売 → Gamescom デモ検証。" },
    "pt-br": { alt: "Imagem do roadmap de AION 2", caption: "Teste de estresse concluído → vantagem pré-lançamento → lançamento global 5 de out. → demo Gamescom." },
    ru: { alt: "Изображение дорожной карты AION 2", caption: "Стресс-тест завершён → головной старт → запуск 5 окт. → демо Gamescom." },
    ko: { alt: "AION 2 로드맵 뉴스 이미지", caption: "스트레스 테스트 완료 → 출시 전 Headstart → 10/5 글로벌 출시 → Gamescom 데모 검증." },
    "zh-hant": { alt: "AION 2 路線圖新聞配圖", caption: "壓力測試完成 → 預上線 Headstart → 10/5 全球上線 → Gamescom 試玩驗證。" },
  },
};

export const trendingSeptember3Article4: ContentEntry = {
  section: "news",
  slug: "aion-2-prelaunch-roadmap-stress-test-to-october-5",
  schemaType: "NewsArticle",
  publishedAt: "2026-09-03",
  updatedAt: "2026-09-03",
  readingMinutes: 5,
  publication: publishedVerified,
  sources: [rmSource1, rmSource2],
  heroImage: rmHero,
  related: [
    { kind: "content", section: "news", slug: "aion-2-release-date-october-5-2026" },
    { kind: "content", section: "news", slug: "aion-2-gamescom-2026-demo-overview" },
    { kind: "content", section: "news", slug: "aion-2-global-launch-no-oceania-server" },
    { kind: "content", section: "guides", slug: "aion-2-prelaunch-access-routes-guide" },
  ],
  translations: {
    en: articleCopy(newsLabels, "en", 5, {
      eyebrow: "PRE-LAUNCH ROADMAP",
      title: "AION 2's Road to October 5: Stress Test Done, Headstart Confirmed, Gamescom Demo Delivered",
      description: "With the stress test completed, a pre-launch headstart window confirmed, and a playable Gamescom demo now on the record, AION 2's path to October 5 is the most defined it has been. This report maps the remaining 32 days, what each milestone means, and what the Gamescom demo changes for the global launch.",
      intro: "AION 2 launched its Western push at Opening Night Live on August 29, 2026 with a confirmed October 5 global launch date. The stress test was announced as completed, and a pre-launch headstart window was flagged. Gamescom 2026 (Sept 2) added a playable demo — a first for the franchise in the West. This report maps the remaining 32 days, what each milestone delivers, and what the demo proved about launch readiness.",
      sourceNote: "Based on NCSoft's official Gamescom press page (aion2.plaync.com), MMORPG.com's August 30 stress-test report, MMORPG.com's September 2 Gamescom demo coverage, and the Massively OP Podcast 578 (September 1, 2026).",
      keywords: ["AION 2 roadmap", "AION 2 stress test", "AION 2 pre-launch headstart", "AION 2 October 5 launch", "AION 2 Gamescom demo", "AION 2 global launch"],
      sections: [
        section("stress-test-done", "Stress Test Complete: The Technical Foundation", [
          "The pre-launch stress test was announced as completed in late August 2026, confirming server-side load handling ahead of the October 5 global launch.",
          "Completion of the stress test closes one of the two major technical unknowns for the global launch — the other being post-launch patch cadence, which is not yet on a published schedule.",
          "For players, stress-test completion means the server infrastructure has already been tested under load conditions that approach launch-day density."
        ]),
        section("headstart-window", "Pre-Launch Headstart: Early Access Before Oct 5", [
          "A pre-launch headstart window was flagged at ONL and confirmed in subsequent coverage — players on certain access routes are expected to play before October 5.",
          "The exact eligibility and start date for the headstart have not been fully published, but the signal is consistent across sources: some players will get early time in-world.",
          "Early-access content scope remains to be confirmed. The headstart is best understood as a soft-launch window for account preparation, tutorial progression, and early collection (pets, wings, first zones)."
        ]),
        section("gamescom-validation", "Gamescom Demo: The First Western Hands-On", [
          "The September 2 Gamescom demo is the first playable Western build of AION 2. MMORPG.com's Luis Gutierrez reported he left with the strongest confidence he has had about the game to date.",
          "Key demos features validated: pet system (200+ pets), deep character customization inspired by Black Desert Online, raid split-and-merge (10 players, two 5-player groups), and fast-paced combat with wing-based aerial mechanics.",
          "The demo also confirmed NetEase's active involvement in the Western launch, including travel and accommodation support for Gamescom — a signal of investment level."
        ]),
        section("32-day-countdown", "The 32-Day Countdown: What to Expect", [
          "Days 1–7 (Sept 3–9): Post-Gamescom content wave and patch notes. Expect official videos, screenshots, and any final access-route adjustments.",
          "Days 8–21 (Sept 10–23): Likely server prep, class/role finalizations, and potential beta or closed-test sessions.",
          "Days 22–32 (Sept 24 – Oct 5): Headstart opens for eligible accounts, followed by global launch on October 5."
        ]),
        section("what-remains-open", "What Remains Undisclosed", [
          "The Oceania server question, raised in early coverage, still has no confirmed answer — AION 2's regional server structure has not been published.",
          "Post-launch content cadence — whether raids, seasonal events, and new zones follow a fixed schedule — is not yet public.",
          "The exact headstart eligibility and content scope remain the most significant launch detail still to be clarified before October 5."
        ]),
      ],
    }),
    "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
      eyebrow: "预上线路线图",
      title: "AION 2 通往 10 月 5 日的路线：压力测试完成、Headstart 确认、Gamescom 试玩交付",
      description: "压力测试完成、预上线 Headstart 窗口确认、Gamescom 试玩已交付——AION 2 通往 10 月 5 日的路线比以往任何时候都清晰。本报告覆盖剩余 32 天的每个里程碑、其意义以及 Gamescom 试玩对全球上线的影响。",
      intro: "AION 2 在 2026 年 8 月 29 日 ONL 公布 10 月 5 日全球上线日期。压力测试在 8 月底宣布完成，预上线 Headstart 窗口已被确认。Gamescom 2026（9/2）提供试玩——这是 AION 系列在西方首次。本报告覆盖剩余 32 天，每个里程碑的交付物，以及试玩对上线准备度的意义。",
      sourceNote: "基于 NCSoft 官方 Gamescom 新闻页、MMORPG.com 8/30 压力测试报道、MMORPG.com 9/2 Gamescom 试玩报道以及 Massively OP Podcast 578（2026-09-01）。",
      keywords: ["AION 2 路线图", "AION 2 压力测试", "AION 2 预上线", "AION 2 10 月 5 日上线", "AION 2 Gamescom 试玩", "AION 2 全球上线"],
      sections: [
        section("stress-test-done", "压力测试完成：技术基础", ["预上线压力测试在 2026 年 8 月底宣布完成，确认服务器负载已就绪。", "压力测试完成关闭了全球上线两大技术未知数之一——另一个是上线后补丁节奏，尚未公布。", "对玩家而言，压力测试完成意味着服务器基础设施已在接近上线日密度的负载下被检验。"]),
        section("headstart-window", "预上线 Headstart：10 月 5 日前的提前进入", ["Headstart 窗口在 ONL 公布并后续报道确认——特定准入路线的玩家将在 10 月 5 日前进入游戏。", "Headstart 的具体资格和开始日期尚未完全公布，但信号跨来源一致：部分玩家将提前进入世界。", "提前访问内容范围尚未确认。Headstart 最佳理解为账号准备、教程进程和早期收集的软上线窗口。"]),
        section("gamescom-validation", "Gamescom 试玩：首次西方可玩版本", ["9 月 2 日 Gamescom 试玩是 AION 2 首个可玩的西方版本。MMORPG.com 的 Luis Gutierrez 报告称这是他目前对游戏最高的信心来源。", "已验证的试玩功能：宠物系统（200+）、BDO 级角色自定义、副本拆分合并（10 人、两个 5 人组）、快节奏的翅膀空中战斗。", "试玩还确认了 NetEase 在西向上线中的积极参与，包括 Gamescom 的差旅支持——投入级别的信号。"]),
        section("32-day-countdown", "32 天倒计时：预期", ["第 1–7 天（9/3–9/9）：Gamescom 后续内容波和补丁说明。预期官方视频、截图和最终准入调整。", "第 8–21 天（9/10–9/23）：可能服务器准备、职业最终化和潜在测试场次。", "第 22–32 天（9/24–10/5）：Headstart 为符合条件的账号开放，随后 10 月 5 日全球上线。"]),
        section("what-remains-open", "仍待披露的内容", ["早期报道提出的大洋洲服务器问题仍无明确答案——AION 2 的区域服务器结构尚未公布。", "上线后内容节奏——副本、季节性活动和新区是否遵循固定时间表——尚未公开。", "Headstart 的具体资格和内容范围仍是 10 月 5 日前最关键的待披露上线细节。"]),
      ],
    }),
    ko: articleCopy(newsLabels, "ko", 5, {
      eyebrow: "출시 전 로드맵",
      title: "AION 2의 10월 5일 로드: 스트레스 테스트 완료, Headstart 확인, Gamescom 데모 전달",
      description: "스트레스 테스트 완료, 출시 전 Headstart 확인, Gamescom playable 데모 — AION 2의 10월 5일 로드만큼 선명해진 적이 없다. 남은 32일 마일스톤, 각 의미, Gamescom 데모의 글로벌 출시 의미 가이드.",
      intro: "AION 2는 2026년 8월 29일 ONL에서 10월 5일 글로벌 출시일을 발표했다. 스트레스 테스트는 8월 말 완료, Headstart도 확인. Gamescom 2026(9/2)에서는 서방 첫 플레이 데모가 나왔다.",
      sourceNote: "NCSoft 공식 Gamescom 보도자료, MMORPG.com 8/30 스트레스 테스트, MMORPG.com 9/2 Gamescom 데모, Massively OP Podcast 578(2026-09-01) 쇼 노트 기반.",
      keywords: ["AION 2 로드맵", "AION 2 스트레스 테스트", "AION 2 출시 전 Headstart", "AION 2 10월 5일 출시", "AION 2 Gamescom 데모"],
      sections: [
        section("stress-test-done", "스트레스 테스트 완료: 기술적 기반", ["출시 전 스트레스 테스트가 8월 말 완료. 서버 부하 핸들링 확인. 글로벌 출시의 두 기술적 미지수 중 하나 해결. 다른 하나는 패치 cadence — 아직 schedule 미확인."]),
        section("headstart-window", "출시 전 Headstart: 10월 5일 전 조기 접속", ["ONL에서 Headstart가 flag되었고 후속 보도에서 확인. 일부 access route의 플레이어가 10월 5일 전에 게임에 진입할 예정. 정확한 자격·시작일은 미완."]),
        section("gamescom-validation", "Gamescom 데모: 서방 첫 플레이 빌드", ["9월 2일 Gamescom 데모는 AION 2의 서방 첫 playable 빌드. MMORPG.com 루이스는 '지금까지 가장 높은 신뢰도'라고 보고. 펫(200+), BDO급 커스텀, 레이드 분할·합체, 날개 공중 전투 모두 확인."]),
        section("32-day-countdown", "32일 카운트다운: 기대할 것", ["1–7일(9/3–9/9): Gamescom 후속 콘텐츠 파도와 패치 노트. 8–21일(9/10–9/23): 서버 준비, 클래스 최종화, 잠재 beta. 22–32일(9/24–10/5): Headstart → 10월 5일 글로벌 출시."]),
        section("what-remains-open", "아직 미개시 항목", ["오세아니아 서버 여부 — 지역 서버 구조 미공표. 출시 후 콘텐츠 cadence — 레이드·이벤트·새 존 스케줄 미공표. Headstart 자격·범위가 10월 5일까지 가장 중요한 미해결."]),
      ],
    }),
    ja: articleCopy(newsLabels, "ja", 5, {
      eyebrow: "発売前ロードマップ",
      title: "AION 2、10月5日への道：ストレステスト完了、Headstart 確認、Gamescom デモ交付",
      description: "ストレステスト完了、発売前 Headstart 確認、Gamescom プレイデモ — AION 2の10月5日への道はこれまでにない明確さ。残り32日のマイルストーン、Gamescom デモがグローバル発売に与える影響。",
      intro: "AION 2は2026年8月29日ONLで10月5日グローバル発売を発表。ストレステストは8月末完了、Headstartも確認済み。Gamescom 2026(9/2)で初めて西側でプレイデモ。",
      sourceNote: "NCSoft 公式 Gamescom ページ、MMORPG.com 8/30 ストレステスト、MMORPG.com 9/2 Gamescom デモ、Massively OP Podcast 578(2026-09-01)ショーノートに基づいて作成。",
      keywords: ["AION 2 ロードマップ", "AION 2 ストレステスト", "AION 2 発売前 Headstart", "AION 2 10月5日発売", "AION 2 Gamescom デモ"],
      sections: [
        section("stress-test-done", "ストレステスト完了：技術的基盤", ["プレローンチストレステストは8月末完了。サーバサイドの負荷処理が確認された。グローバル発売の2大技術的未知数のうち1つを解消。もう1つはパッチ cadence — 未公開。", "ストレステスト完了は、サーバ基盤が発売日密度に近い負荷で試験済みであることを意味する。"]),
        section("headstart-window", "発売前 Headstart：10月5日前の早期アクセス", ["ONLでHeadstartがflagされ、後続報道で確認。特定の access route にいるプレイヤーは10月5日前にゲームに進むことが期待される。正確な資格・開始日は未公開。", "ヘッドスタートのコンテンツ範囲は未確認。アカウント準備・チュートリアル・初期収集（ペット・翼・初め地区）のソフトローンチと捉えるのが妥当。"]),
        section("gamescom-validation", "Gamescom デモ：西側初のプレイ可能ビルド", ["9月2日 Gamescom デモは AION 2 の西側初のプレイ可能ビルド。MMORPG.com の Luis は「これまでにない信頼感」と報告。", "確認されたデモ機能：ペット(200+)、BDO級キャラメイク、レイド分割・合体(10人・2つの5人グループ)、翼による高速空中戦闘。", "デモは NetEase の西側ローンチへの積極的関与も確認 — Gamescom 移動・宿泊サポート。"]),
        section("32-day-countdown", "32日カウントダウン：期待されるもの", ["1–7日(9/3–9/9)：Gamescom 後続コンテンツ波とパッチノート。8–21日(9/10–9/23)：サーバ準備、クラス最終化、潜在 beta。22–32日(9/24–10/5)：Headstart 開放 → 10月5日グローバル発売。"]),
        section("what-remains-open", "まだ未開示の項目", ["オセアニアサーバ問題 — 地域サーバ構造未公表。発売後コンテンツ cadence — レイド・イベント・新区のスケジュール未公開。Headstart 資格・範囲が10月5日までに最も重要な未明点。"]),
      ],
    }),
    fr: articleCopy(newsLabels, "fr", 5, {
      eyebrow: "ROADMAP PRÉ-LANCEMENT",
      title: "La route d'AION 2 vers le 5 oct.: test de stress terminé, avance confirmée, démo Gamescom livrée",
      description: "Test de stress terminé, fenêtre d'avance pré-lancement confirmée, démo Gamescom livrée — la route d'AION 2 vers le 5 oct. est la plus définie qu'elle ait été. Guide couvrant les 32 jours restants, chaque jalon, et ce que la démo Gamescom change pour le lancement.",
      intro: "AION 2 a lancé sa poussée occidentale à Opening Night Live le 29 août 2026 avec la date de lancement mondial du 5 oct. Le test de stress a été annoncé terminé. Gamescom a livré une démo jouable — la première pour le Western.",
      sourceNote: "Basé sur la page presse Gamescom officielle de NCSoft, le rapport MMORPG.com du 30 août, la couverture Gamescom du 2 sept., et le podcast Massively OP 578 (1 sept. 2026).",
      keywords: ["AION 2 roadmap", "AION 2 test de stress", "AION 2 avance pré-lancement", "AION 2 lancement 5 oct.", "AION 2 démo Gamescom"],
      sections: [
        section("stress-test-done", "Test de stress terminé: fondation technique", ["Le test de stress pré-lancement a été annoncé terminé fin août. L'infrastructure serveur a été testée sous charge proche de celle du jour de lancement."]),
        section("headstart-window", "Avance pré-lancement: accès avant le 5 oct.", ["Une fenêtre d'avance a été signalée à ONL. Certains joueurs accéderont au jeu avant le 5 oct. L'étendue exacte reste à confirmer."]),
        section("gamescom-validation", "Démo Gamescom: premier build occidental jouable", ["La démo du 2 sept. est le premier build occidental jouable. MMORPG.com en est ressorti avec la plus grande confiance à ce jour. Système de familiers (200+), customisation BDO, raids split-merge, combat rapide avec ailes."]),
        section("32-day-countdown", "Compte à rebours de 32 jours", ["Jours 1–7 (3–9 sept.) : vague post-Gamescom et notes de patch. Jours 8–21 (10–23 sept.) : préparation serveur et tests. Jours 22–32 (24 sept.–5 oct.) : avance puis lancement mondial."]),
        section("what-remains-open", "Ce qui reste non divulgué", ["Le serveur Océanie reste sans réponse confirmée. La cadence post-lancement — raids, événements, zones — n'est pas encore publique. Les critères d'éligibilité de l'avance sont le détail de lancement le plus significatif encore à clarifier."]),
      ],
    }),
    de: articleCopy(newsLabels, "de", 5, {
      eyebrow: "PRE-LAUNCH-ROADMAP",
      title: "Der Weg von AION 2 zum 5. Okt.: Stress-Test abgeschlossen, Vorsprung bestätigt, Gamescom-Demo geliefert",
      description: "Stress-Test abgeschlossen, Pre-Launch-Vorsprung bestätigt, Gamescom-Demo geliefert — der Weg von AION 2 zum 5. Okt. ist bisher der definierteste. Guide deckt die restlichen 32 Tage, jeden Meilenstein und was die Gamescom-Demo für den Global-Launch bedeutet.",
      intro: "AION 2 hat am 29. Aug. 2026 auf Opening Night Live den Global-Launch am 5. Okt. 2026 bekanntgegeben. Der Stress-Test wurde als abgeschlossen gemeldet. Gamescom hat eine spielbare Demo geliefert — die erste für den Westen.",
      sourceNote: "Basierend auf der offiziellen Gamescom-Presseseite von NCSoft, dem MMORPG.com-Stress-Test-Bericht vom 30. Aug., der Gamescom-Demo vom 2. Sept., und dem Massively OP Podcast 578 (1. Sept. 2026).",
      keywords: ["AION 2 Roadmap", "AION 2 Stress-Test", "AION 2 Pre-Launch-Vorsprung", "AION 2 5. Okt. Launch", "AION 2 Gamescom-Demo"],
      sections: [
        section("stress-test-done", "Stress-Test abgeschlossen: technische Grundlage", ["Der Pre-Launch-Stress-Test wurde Ende August als abgeschlossen gemeldet. Die Serverinfrastruktur wurde unter Lastbedingungen getestet, die der Launch-Tagesdichte nahekommen."]),
        section("headstart-window", "Pre-Launch-Vorsprung: früher Zugang vor dem 5. Okt.", ["Ein Vorsprungszeitraum wurde auf ONL gemeldet. Bestimmte Access-Routes werden vor dem 5. Okt. Zugang erhalten. Der genaue Umfang bleibt zu bestätigen."]),
        section("gamescom-validation", "Gamescom-Demo: erster westlicher spielbarer Build", ["Die Demo vom 2. Sept. ist der erste westliche spielbare Build. MMORPG.com ist mit der höchsten bisherigen Zuversicht gegangen. 200+ Haustiere, BDO-Customization, Split-Merge-Raids, schneller Kampf mit Flügeln."]),
        section("32-day-countdown", "32-Tage-Rückzähler", ["Tage 1–7 (3.–9. Sept.) : Post-Gamescom-Inhalte und Patch-Notizen. Tage 8–21 (10.–23. Sept.) : Server-Vorbereitung und Tests. Tage 22–32 (24. Sept.–5. Okt.) : Vorsprung dann Global-Launch."]),
        section("what-remains-open", "Was noch unveröffentlicht bleibt", ["Der Ozeanien-Server bleibt ohne bestätigte Antwort. Die Post-Launch-Cadence — Raids, Events, Zonen — ist nicht öffentlich. Die Zulassungskriterien des Vorsprungs sind das bedeutendste Launch-Detail, das noch zu klären ist."]),
      ],
    }),
    es: articleCopy(newsLabels, "es", 5, {
      eyebrow: "ROADMAP PRE-LANZAMIENTO",
      title: "El camino de AION 2 al 5 de oct.: prueba de estrés completada, ventaja confirmada, demo Gamescom entregada",
      description: "Prueba de estrés completada, ventana de ventaja pre-lanzamiento confirmada, demo Gamescom entregada — el camino de AION 2 al 5 de oct. es el más definido hasta ahora. Guía cubriendo los 32 días restantes, cada hito, y lo que la demo Gamescom cambia para el lanzamiento.",
      intro: "AION 2 lanzó su impulso occidental en Opening Night Live el 29 de agosto de 2026 con la fecha de lanzamiento global del 5 de oct. La prueba de estrés se anunció completada. Gamescom entregó una demo jugable — la primera para el Western.",
      sourceNote: "Basado en la página de prensa Gamescom oficial de NCSoft, el reporte MMORPG.com del 30 de agosto, la cobertura Gamescom del 2 de sept., y el podcast Massively OP 578 (1 de sept. 2026).",
      keywords: ["AION 2 roadmap", "AION 2 prueba estrés", "AION 2 ventaja pre-lanzamiento", "AION 2 lanzamiento 5 oct.", "AION 2 demo Gamescom"],
      sections: [
        section("stress-test-done", "Prueba de estrés completada: fundación técnica", ["La prueba de estrés pre-lanzamiento se anunció completada a finales de agosto. La infraestructura de servidor se probó bajo carga cercana a la del día de lanzamiento."]),
        section("headstart-window", "Ventaja pre-lanzamiento: acceso antes del 5 de oct.", ["Una ventana de ventaja se anunció en ONL. Ciertos jugadores accederán antes del 5 de oct. El alcance exacto queda por confirmar."]),
        section("gamescom-validation", "Demo Gamescom: primer build occidental jugable", ["La demo del 2 de sept. es el primer build occidental jugable. MMORPG.com salió con la mayor confianza hasta ahora. Sistema de mascotas (200+), customización BDO, raids split-merge, combate rápido con alas."]),
        section("32-day-countdown", "Cuenta regresiva de 32 días", ["Días 1–7 (3–9 sept.) : ola post-Gamescom y notas de parche. Días 8–21 (10–23 sept.) : preparación de servidor y pruebas. Días 22–32 (24 sept.–5 oct.) : ventaja luego lanzamiento global."]),
        section("what-remains-open", "Lo que queda sin divulgar", ["El servidor de Oceanía queda sin respuesta confirmada. La cadencia post-lanzamiento — raids, eventos, zonas — no es pública. Los criterios de elegibilidad de la ventaja son el detalle de lanzamiento más significativo que queda por aclarar."]),
      ],
    }),
    "pt-br": articleCopy(newsLabels, "pt-br", 5, {
      eyebrow: "ROADMAP PRÉ-LANÇAMENTO",
      title: "O caminho de AION 2 para 5 de out.: teste de estresse concluído, vantagem confirmada, demo Gamescom entregue",
      description: "Teste de estresse concluído, janela de vantagem pré-lançamento confirmada, demo Gamescom entregue — o caminho de AION 2 para 5 de out. é o mais definido até agora. Guia cobrindo os 32 dias restantes, cada marco, e o que a demo Gamescom muda para o lançamento.",
      intro: "AION 2 lançou seu impulso ocidental em Opening Night Live em 29 de agosto de 2026 com a data de lançamento global de 5 de out. O teste de estresse foi anunciado concluído. Gamescom entregou uma demo jogável — a primeiro para o Western.",
      sourceNote: "Baseado na página de imprensa Gamescom oficial da NCSoft, o relatório MMORPG.com de 30 de ago., a cobertura Gamescom de 2 de set., e o podcast Massively OP 578 (1 de set. 2026).",
      keywords: ["AION 2 roadmap", "AION 2 teste estresse", "AION 2 vantagem pré-lançamento", "AION 2 lançamento 5 out.", "AION 2 demo Gamescom"],
      sections: [
        section("stress-test-done", "Teste de estresse concluído: fundação técnica", ["O teste de estresse pré-lançamento foi anunciado concluído em meados de agosto. A infraestrutura de servidor foi testada sob carga próxima à do dia de lançamento."]),
        section("headstart-window", "Vantagem pré-lançamento: acesso antes de 5 de out.", ["Uma janela de vantagem foi sinalizada no ONL. Certos jogadores terão acesso antes de 5 de out. O escopo exato fica para confirmar."]),
        section("gamescom-validation", "Demo Gamescom: primeiro build ocidental jogável", ["A demo de 2 de set. é a primeiro build ocidental jogável. MMORPG.com saiu com a maior confiança até agora. Sistema de pets (200+), customização BDO, raids split-merge, combate rápido com asas."]),
        section("32-day-countdown", "Contagem regressiva de 32 dias", ["Dias 1–7 (3–9 set.) : onda pós-Gamescom e notas de patch. Dias 8–21 (10–23 set.) : preparação de servidor e testes. Dias 22–32 (24 set.–5 out.) : vantagem então lançamento global."]),
        section("what-remains-open", "O que fica sem divulgar", ["O servidor Oceania fica sem resposta confirmada. A cadência pós-lançamento — raids, eventos, zonas — não é pública. Os critérios de elegibilidade da vantagem são o detalhe de lançamento mais significativo ainda a ser esclarecido."]),
      ],
    }),
    ru: articleCopy(newsLabels, "ru", 5, {
      eyebrow: "ДОРОЖНАЯ КАРТА",
      title: "Путь AION 2 к 5 окт.: стресс-тест завершён, головной старт подтверждён, демо Gamescom доставлено",
      description: "Стресс-тест завершён, окно головного старта подтверждено, демо Gamescom доставлено — путь AION 2 к 5 окт. самый определённый из когда-либо. Гайд по оставшимся 32 дням, каждому этапу, и что демо Gamescom меняет для запуска.",
      intro: "AION 2 начал свой западный рывок на Opening Night Live 29 августа 2026 с датой глобального запуска 5 окт. Стресс-тест объявлен завершённым. Gamescom доставил играбельное демо — первое для Запада.",
      sourceNote: "По данным официальной Gamescom-страницы NCSoft, отчёта MMORPG.com от 30 авг., обзора Gamescom от 2 сент., и Massively OP Podcast 578 (1 сент. 2026).",
      keywords: ["AION 2 дорожная карта", "AION 2 стресс-тест", "AION 2 головной старт", "AION 2 запуск 5 окт.", "AION 2 демо Gamescom"],
      sections: [
        section("stress-test-done", "Стресс-тест завершён: техническая основа", ["Стресс-тест объявлен завершённым в конце августа. Инфраструктура сервера протестирована при нагрузке, близкой к дню запуска."]),
        section("headstart-window", "Головной старт: доступ до 5 окт.", ["Окно головного старта объявлено на ONL. Определённые игроки получат доступ до 5 окт. Точный масштаб остаётся подтвердить."]),
        section("gamescom-validation", "Демо Gamescom: первый западный играбельный билд", ["Демо от 2 сент. — первый западный играбельный билд. MMORPG.com ушёл с максимальным доверием. Система питомцев (200+), кастомизация уровня BDO, рейды с разделением/объединением, быстрый бой с крыльями."]),
        section("32-day-countdown", "Обратный отсчёт 32 дней", ["Дни 1–7 (3–9 сент.) : волна после Gamescom и патч-ноты. Дни 8–21 (10–23 сент.) : подготовка серверов и тесты. Дни 22–32 (24 сент.–5 окт.) : головной старт, затем глобальный запуск."]),
        section("what-remains-open", "Что остаётся нераскрытым", ["Сервер Океании остаётся без подтверждённого ответа. Темп после запуска — рейды, события, зоны — не опубликован. Критерии головного старта — самый значимый запуск, который остаётся уточнить."]),
      ],
    }),
    "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
      eyebrow: "預上線路線圖",
      title: "AION 2 通往 10 月 5 日的路線：壓力測試完成、Headstart 確認、Gamescom 試玩交付",
      description: "壓力測試完成、預上線 Headstart 窗口確認、Gamescom 試玩已交付——AION 2 通往 10 月 5 日的路線比以往任何時候都清晰。本報導覆蓋剩餘 32 天的每個里程碑、其意義以及 Gamescom 試玩對全球上線的影響。",
      intro: "AION 2 在 2026 年 8 月 29 日 ONL 公佈 10 月 5 日全球上線日期。壓力測試在 8 月底宣布完成，預上線 Headstart 窗口已被確認。Gamescom 2026（9/2）提供試玩——這是 AION 系列在西方首次。本報導覆蓋剩餘 32 天，每個里程碑的交付物，以及試玩對上線準備度的意義。",
      sourceNote: "基於 NCSoft 官方 Gamescom 新聞頁、MMORPG.com 8/30 壓力測試報導、MMORPG.com 9/2 Gamescom 試玩報導以及 Massively OP Podcast 578（2026-09-01）。",
      keywords: ["AION 2 路線圖", "AION 2 壓力測試", "AION 2 預上線", "AION 2 10 月 5 日上線", "AION 2 Gamescom 試玩", "AION 2 全球上線"],
      sections: [
        section("stress-test-done", "壓力測試完成：技術基礎", ["預上線壓力測試在 2026 年 8 月底宣布完成，確認伺服器負載已就緒。", "壓力測試完成關閉了全球上線兩大技術未知數之一——另一個是上線後補丁節奏，尚未公佈。", "對玩家而言，壓力測試完成意味著伺服器基礎設施已在接近上線日密度的負載下被檢驗。"]),
        section("headstart-window", "預上線 Headstart：10 月 5 日前的提前進入", ["Headstart 窗口在 ONL 公佈並後續報導確認——特定准入路線的玩家將在 10 月 5 日前進入遊戲。", "Headstart 的具體資格和開始日期尚未完全公佈，但信號跨來源一致：部分玩家將提前進入世界。", "提前訪問內容範圍尚未確認。Headstart 最佳理解為帳號準備、教程進程和早期收集的軟上線窗口。"]),
        section("gamescom-validation", "Gamescom 試玩：首次西方可玩版本", ["9 月 2 日 Gamescom 試玩是 AION 2 首個可玩的西方版本。MMORPG.com 的 Luis Gutierrez 報告稱這是他對遊戲最高的信心來源。", "已驗證的試玩功能：寵物系統（200+）、BDO 級角色客製化、副本拆分合併（10 人、兩個 5 人組）、快節奏的翅膀空中戰鬥。", "試玩還確認了 NetEase 在西向上線中的積極參與，包括 Gamescom 的差旅支持——投入級別的訊號。"]),
        section("32-day-countdown", "32 天倒數：預期", ["第 1–7 天（9/3–9/9）：Gamescom 後續內容波和補丁說明。預期官方影片、截圖和最終准入調整。", "第 8–21 天（9/10–9/23）：可能伺服器準備、職業最終化和潛在測試場次。", "第 22–32 天（9/24–10/5）：Headstart 為符合資格的帳號開放，隨後 10 月 5 日全球上線。"]),
        section("what-remains-open", "仍待披露的內容", ["早期報導提出之大洋洲伺服器問題仍無明確答案——AION 2 的區域伺服器結構尚未公佈。", "上線後內容節奏——副本、季節性活動和新區是否遵循固定時間表——尚未公開。", "Headstart 的具體資格和內容範圍仍是 10 月 5 日前最關鍵的待披露上線細節。"]),
      ],
    }),
  },
};