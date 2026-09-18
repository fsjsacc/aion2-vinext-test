import {
  articleCopy,
  localizations,
  newsLabels,
  publishedVerified,
  readingTime,
  section,
} from "./trending-september-4-shared";
import type { ContentSource, ContentHeroImage } from "./content-registry";

// Source 1: Official NCSoft announcement
const launchRoadmapSource: ContentSource = {
  id: "ncsoft-launch-roadmap-announcement",
  kind: "official",
  publisher: "NCSoft",
  label: "AION 2 Official Launch Roadmap",
  url: "https://aion2.plaync.com/en-us/board/notice",
  publishedAt: "2026-08-26",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "AION 2 官方发布路线图",
      en: "AION 2 Official Launch Roadmap",
      fr: "Feuille de route officielle du lancement d'AION 2",
      de: "AION 2 Offizieller Start-Fahrplan",
      es: "Hoja de ruta oficial del lanzamiento de AION 2",
      ja: "AION 2 公式ローンチロードマップ",
      "pt-br": "Roteiro oficial de lançamento do AION 2",
      ru: "Официальная дорожная карта запуска AION 2",
      ko: "AION 2 공식 출시 로드맵",
      "zh-hant": "AION 2 官方發布路線圖",
    },
    "https://aion2.plaync.com/en-us/board/notice",
  ),
};

// Source 2: Steam store page
const steamLaunchSource: ContentSource = {
  id: "steam-aion2-launch-info",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 on Steam - Launch Information",
  url: "https://store.steampowered.com/app/2858220/AION_2/",
  publishedAt: "2026-08-25",
  retrievedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  localizations: localizations(
    {
      "zh-hans": "Steam 上的 AION 2 - 发布信息",
      en: "AION 2 on Steam - Launch Information",
      fr: "AION 2 sur Steam - Informations de lancement",
      de: "AION 2 auf Steam - Startinformationen",
      es: "AION 2 en Steam - Información de lanzamiento",
      ja: "SteamのAION 2 - ローンチ情報",
      "pt-br": "AION 2 no Steam - Informações de lançamento",
      ru: "AION 2 в Steam - Информация о запуске",
      ko: "Steam의 AION 2 - 출시 정보",
      "zh-hant": "Steam 上的 AION 2 - 發布資訊",
    },
    "https://store.steampowered.com/app/2858220/AION_2/",
  ),
};

// Hero image
const launchCountdownHero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1200, height: 630,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/en-us/board/notice",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 10月5日全球发布倒计时横幅", caption: "从创始人包提前访问到正式发布的关键里程碑路线图。" },
    en: { alt: "AION 2 October 5 global launch countdown banner", caption: "Roadmap of key milestones from Founder's Pack early access to official launch." },
    fr: { alt: "Bannière de compte à rebours du lancement mondial d'AION 2 le 5 octobre", caption: "Feuille de route des étapes clés de l'accès anticipé au lancement officiel." },
    de: { alt: "AION 2 5. Oktober globaler Start-Countdown-Banner", caption: "Fahrplan der wichtigen Meilensteine vom Gründerpaket-Frühzugang bis zum offiziellen Start." },
    es: { alt: "Banner de cuenta regresiva del lanzamiento global de AION 2 el 5 de octubre", caption: "Hoja de ruta de hitos clave desde el acceso anticipado hasta el lanzamiento oficial." },
    ja: { alt: "AION 2 10月5日グローバルローンチカウントダウンバナー", caption: "創設者パック早期アクセスから公式リリースまでの重要なマイルストーンのロードマップ。" },
    "pt-br": { alt: "Banner de contagem regressiva do lançamento global do AION 2 em 5 de outubro", caption: "Roteiro de marcos-chave do acesso antecipado ao lançamento oficial." },
    ru: { alt: "Баннер обратного отсчёта глобального запуска AION 2 5 октября", caption: "Дорожная карта ключевых вех от раннего доступа до официального запуска." },
    ko: { alt: "AION 2 10월 5일 글로벌 출시 카운트다운 배너", caption: "창립자 팩 조기 액세스부터 공식 출시까지의 주요 마일스톤 로드맵." },
    "zh-hant": { alt: "AION 2 10月5日全球發布倒計時橫幅", caption: "從創始人包提前訪問到正式發布的關鍵里程碑路線圖。" },
  },
};

export const trendingSeptember4Article3 = {
  section: "news" as const,
  slug: "aion-2-october-5-launch-countdown-roadmap",
  schemaType: "NewsArticle" as const,
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  readingMinutes: 5,
  publication: publishedVerified,
  sources: [launchRoadmapSource, steamLaunchSource],
  heroImage: launchCountdownHero,
  related: [
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-founders-pack-complete-guide" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-launch-scale-test-preparation-guide" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-abyss-system-complete-guide" },
  ],
  translations: {
    "zh-hans": articleCopy(newsLabels, "zh-hans", 5, {
      eyebrow: "发布路线图",
      title: "AION 2 10月5日发布倒计时：关键里程碑与时间线完整解析",
      description:
        "从9月17日发布规模测试到10月5日正式发布，完整解析AION 2发布前的所有关键节点、创始人包提前访问窗口、预下载时间和发布日计划",
      intro:
        "AION 2将于2026年10月5日全球同步发布。从今天起，我们为你梳理了从当前到发布日的所有关键时间节点，帮助你做好准备，不错过任何重要时刻。",
      keywords: ["AION 2 发布时间", "AION 2 10月5日", "AION 2 倒计时", "AION 2 提前访问", "AION 2 预下载"],
      sourceNote: "基于 NCSoft 官方发布路线图公告（2026-08-26）和 Steam 商店页面信息整理。",
      sections: [
        section(
          "september-milestones",
          "9月关键里程碑",
          "9月17-18日：发布规模测试（LST）韩国时间举行，这是正式发布前的最后一次大规模技术测试。测试内容包括37级上限的完整游戏体验。9月30日：创始人包购买者提前访问开始（UTC时间）。购买Standard/Deluxe/Ultimate版本的玩家可以率先登录游戏。",
        ),
        section(
          "early-access-window",
          "创始人包提前访问窗口",
          "提前访问从9月30日持续到10月4日，共5天。在此期间，创始人包购买者可以体验完整的游戏内容，建立角色，加入公会，甚至在PVP区域建立据点。10月5日全球发布时，所有提前访问进度将保留并延续。",
        ),
        section(
          "pre-download-schedule",
          "预下载时间安排",
          "游戏客户端预下载将在发布前一周左右开放。Steam和NCSoft启动器用户可以在预下载期间下载并安装游戏，发布日当天即可直接登录。建议提前下载以避免发布首日的服务器拥堵。",
        ),
        section(
          "launch-day-plan",
          "发布日（10月5日）计划",
          "AION 2将于10月5日全球同步上线。发布时刻因地区而异：韩国时间凌晨开始，随后依次覆盖亚洲、欧洲和北美服务器。发布日将开放完整的PVE内容（主线任务、副本、开放世界探索）和PVP内容（竞技场、深渊战场）。",
        ),
        section(
          "post-launch-roadmap",
          "发布后内容展望",
          "NCSoft已确认发布后将持续更新内容。首个大型补丁预计在发布后4-6周内推出，包括新的副本、职业平衡调整和PVP赛季系统。长期路线图还包括跨服务器战场、攻城战和季节性活动。",
        ),
      ],
    }),
    en: articleCopy(newsLabels, "en", 5, {
      eyebrow: "LAUNCH ROADMAP",
      title: "AION 2 October 5 Launch Countdown: Complete Timeline of Key Milestones",
      description:
        "From September 17 Launch Scale Test to October 5 official launch, complete analysis of all key nodes before AION 2 launch including Founder's Pack early access window, pre-download timing, and launch day plans",
      intro:
        "AION 2 launches globally on October 5, 2026. From today, we've mapped out all key time points from now to launch day to help you prepare and not miss any important moments.",
      keywords: ["AION 2 launch date", "AION 2 October 5", "AION 2 countdown", "AION 2 early access", "AION 2 pre-download"],
      sourceNote: "Based on NCSoft's official launch roadmap announcement (August 26, 2026) and Steam store page information.",
      sections: [
        section(
          "september-milestones",
          "September Key Milestones",
          "September 17-18: Launch Scale Test (LST) held in KST, the final large-scale technical test before official launch. Test content includes complete gaming experience up to level 37 cap. September 30: Founder's Pack early access begins (UTC). Players who purchased Standard/Deluxe/Ultimate editions can log in first.",
        ),
        section(
          "early-access-window",
          "Founder's Pack Early Access Window",
          "Early access runs from September 30 to October 4, totaling 5 days. During this period, Founder's Pack buyers can experience complete game content, create characters, join guilds, and even establish footholds in PVP zones. When global launch occurs on October 5, all early access progress will be retained and continued.",
        ),
        section(
          "pre-download-schedule",
          "Pre-download Schedule",
          "Game client pre-download will open approximately one week before launch. Steam and NCSoft Launcher users can download and install the game during pre-download, ready to log in directly on launch day. Download early to avoid Day 1 server congestion.",
        ),
        section(
          "launch-day-plan",
          "Launch Day (October 5) Plan",
          "AION 2 goes live globally on October 5. Launch times vary by region: starting in Korea at midnight, followed by Asia, Europe, and North America servers. Launch day opens complete PVE content (main quests, dungeons, open-world exploration) and PVP content (arenas, Abyss battlegrounds).",
        ),
        section(
          "post-launch-roadmap",
          "Post-launch Content Outlook",
          "NCSoft has confirmed continuous content updates after launch. The first major patch is expected within 4-6 weeks post-launch, including new dungeons, class balance adjustments, and PVP season system. The long-term roadmap also includes cross-server battlegrounds, siege warfare, and seasonal events.",
        ),
      ],
    }),
    fr: articleCopy(newsLabels, "fr", 5, {
      eyebrow: "FEUILLE DE ROUTE",
      title: "Compte à rebours du lancement d'AION 2 le 5 octobre : Chronologie complète des étapes clés",
      description:
        "Du test d'échelle de lancement du 17 septembre au lancement officiel du 5 octobre, analyse complète de tous les nœuds clés avant le lancement d'AION 2",
      intro:
        "AION 2 sort mondialement le 5 octobre 2026. À partir d'aujourd'hui, nous avons cartographié tous les points temporels clés d'ici le jour du lancement.",
      keywords: ["Date de lancement AION 2", "AION 2 5 octobre", "Compte à rebours AION 2", "Accès anticipé AION 2", "Pré-téléchargement AION 2"],
      sourceNote: "Basé sur la feuille de route officielle de NCSoft (26 août 2026) et les informations de la page Steam.",
      sections: [
        section("september-milestones", "Étapes clés de septembre", "17-18 septembre : Test d'échelle de lancement (LST) en KST, le dernier test technique à grande échelle avant le lancement officiel. 30 septembre : Début de l'accès anticipé du pack fondateur (UTC)."),
        section("early-access-window", "Fenêtre d'accès anticipé du pack fondateur", "L'accès anticipé dure du 30 septembre au 4 octobre, soit 5 jours au total. Tous les progrès de l'accès anticipé seront conservés."),
        section("pre-download-schedule", "Calendrier de pré-téléchargement", "Le pré-téléchargement du client de jeu ouvrira environ une semaine avant le lancement."),
        section("launch-day-plan", "Plan du jour de lancement (5 octobre)", "AION 2 sera lancé mondialement le 5 octobre. Le contenu PVE complet et le contenu PVP seront ouverts."),
        section("post-launch-roadmap", "Perspectives de contenu post-lancement", "NCSoft a confirmé des mises à jour continues après le lancement. Le premier patch majeur est attendu dans les 4 à 6 semaines suivant le lancement."),
      ],
    }),
    de: articleCopy(newsLabels, "de", 5, {
      eyebrow: "START-FAHRPLAN",
      title: "AION 2 5. Oktober Start-Countdown: Vollständige Zeitleiste der wichtigen Meilensteine",
      description:
        "Vom Start-Skalentest am 17. September bis zum offiziellen Start am 5. Oktober, vollständige Analyse aller wichtigen Knotenpunkte vor dem AION 2 Start",
      intro:
        "AION 2 startet am 5. Oktober 2026 weltweit. Ab heute haben wir alle wichtigen Zeitpunkte bis zum Starttag für Sie zusammengestellt.",
      keywords: ["AION 2 Startdatum", "AION 2 5. Oktober", "AION 2 Countdown", "AION 2 Frühzugang", "AION 2 Vorab-Download"],
      sourceNote: "Basierend auf NCSofts offiziellem Start-Fahrplan (26. August 2026) und Steam-Shop-Informationen.",
      sections: [
        section("september-milestones", "Wichtige Meilensteine im September", "17.-18. September: Start-Skalentest (LST) in KST, der letzte großangelegte technische Test vor dem offiziellen Start. 30. September: Gründerpaket-Frühzugang beginnt (UTC)."),
        section("early-access-window", "Gründerpaket-Frühzugangfenster", "Der Frühzugang läuft vom 30. September bis 4. Oktober, insgesamt 5 Tage. Alle Frühzugangs-Fortschritte werden beibehalten."),
        section("pre-download-schedule", "Vorab-Download-Zeitplan", "Der Vorab-Download des Spielclients wird etwa eine Woche vor dem Start geöffnet."),
        section("launch-day-plan", "Starttag-Plan (5. Oktober)", "AION 2 geht am 5. Oktober weltweit live. Vollständige PVE- und PVP-Inhalte werden geöffnet."),
        section("post-launch-roadmap", "Ausblick auf Inhalte nach dem Start", "NCSoft hat kontinuierliche Inhalts-Updates nach dem Start bestätigt. Der erste große Patch wird innerhalb von 4-6 Wochen nach dem Start erwartet."),
      ],
    }),
    es: articleCopy(newsLabels, "es", 5, {
      eyebrow: "HOJA DE RUTA",
      title: "Cuenta regresiva del lanzamiento de AION 2 el 5 de octubre: Cronología completa de hitos clave",
      description:
        "Desde la prueba de escala de lanzamiento del 17 de septiembre hasta el lanzamiento oficial del 5 de octubre, análisis completo de todos los nodos clave antes del lanzamiento de AION 2",
      intro:
        "AION 2 se lanza globalmente el 5 de octubre de 2026. Desde hoy, hemos mapeado todos los puntos temporales clave hasta el día del lanzamiento.",
      keywords: ["Fecha de lanzamiento AION 2", "AION 2 5 de octubre", "Cuenta regresiva AION 2", "Acceso anticipado AION 2", "Predescarga AION 2"],
      sourceNote: "Basado en la hoja de ruta oficial de NCSoft (26 de agosto de 2026) e información de la tienda de Steam.",
      sections: [
        section("september-milestones", "Hitos clave de septiembre", "17-18 de septiembre: Prueba de escala de lanzamiento (LST) en KST, la última prueba técnica a gran escala antes del lanzamiento oficial. 30 de septiembre: Comienza el acceso anticipado del paquete fundador (UTC)."),
        section("early-access-window", "Ventana de acceso anticipado del paquete fundador", "El acceso anticipado se extiende del 30 de septiembre al 4 de octubre, totalizando 5 días. Todo el progreso de acceso anticipado se conservará."),
        section("pre-download-schedule", "Calendario de predescarga", "La predescarga del cliente del juego se abrirá aproximadamente una semana antes del lanzamiento."),
        section("launch-day-plan", "Plan del día de lanzamiento (5 de octubre)", "AION 2 se activa globalmente el 5 de octubre. Se abre contenido PVE y PVP completo."),
        section("post-launch-roadmap", "Perspectiva de contenido post-lanzamiento", "NCSoft ha confirmado actualizaciones continuas de contenido después del lanzamiento. El primer parche mayor se espera dentro de las 4-6 semanas posteriores al lanzamiento."),
      ],
    }),
    ja: articleCopy(newsLabels, "ja", 5, {
      eyebrow: "ローンチロードマップ",
      title: "AION 2 10月5日ローンチカウントダウン：主要マイルストーンの完全タイムライン",
      description:
        "9月17日のローンチスケールテストから10月5日の公式リリースまで、AION 2ローンチ前のすべての主要ノードの完全分析",
      intro:
        "AION 2は2026年10月5日にグローバルリリースされます。今日からリリース日までのすべての主要なタイムポイントをまとめました。",
      keywords: ["AION 2 ローンチ日", "AION 2 10月5日", "AION 2 カウントダウン", "AION 2 早期アクセス", "AION 2 プレダウンロード"],
      sourceNote: "NCSoft公式ローンチロードマップ発表（2026年8月26日）およびSteamストアページ情報に基づく。",
      sections: [
        section("september-milestones", "9月の主要マイルストーン", "9月17-18日：ローンチスケールテスト（LST）KSTで開催、公式リリース前の最終大規模技術テスト。9月30日：創設者パック早期アクセス開始（UTC）。"),
        section("early-access-window", "創設者パック早期アクセスウィンドウ", "早期アクセスは9月30日から10月4日まで、合計5日間。すべての早期アクセスプログレスは保持されます。"),
        section("pre-download-schedule", "プレダウンロードスケジュール", "ゲームクライアントのプレダウンロードはリリースの約1週間前に開始されます。"),
        section("launch-day-plan", "ローンチ日（10月5日）プラン", "AION 2は10月5日にグローバルに開始。完全なPVEおよびPVPコンテンツが開放されます。"),
        section("post-launch-roadmap", "リリース後のコンテンツ見通し", "NCSoftはリリース後の継続的なコンテンツアップデートを確認。最初の大型パッチはリリース後4-6週間以内に予想されます。"),
      ],
    }),
    "pt-br": articleCopy(newsLabels, "pt-br", 5, {
      eyebrow: "ROTEIRO DE LANÇAMENTO",
      title: "Contagem regressiva do lançamento do AION 2 em 5 de outubro: Cronograma completo de marcos-chave",
      description:
        "Do teste de escala de lançamento de 17 de setembro ao lançamento oficial de 5 de outubro, análise completa de todos os nós-chave antes do lançamento do AION 2",
      intro:
        "O AION 2 é lançado globalmente em 5 de outubro de 2026. A partir de hoje, mapeamos todos os pontos temporais-chave até o dia do lançamento.",
      keywords: ["Data de lançamento AION 2", "AION 2 5 de outubro", "Contagem regressiva AION 2", "Acesso antecipado AION 2", "Pré-download AION 2"],
      sourceNote: "Baseado no roteiro oficial de lançamento da NCSoft (26 de agosto de 2026) e informações da loja Steam.",
      sections: [
        section("september-milestones", "Marcos-chave de setembro", "17-18 de setembro: Teste de escala de lançamento (LST) em KST, o último teste técnico em grande escala antes do lançamento oficial. 30 de setembro: Acesso antecipado do Pacote Fundador começa (UTC)."),
        section("early-access-window", "Janela de acesso antecipado do Pacote Fundador", "O acesso antecipado vai de 30 de setembro a 4 de outubro, totalizando 5 dias. Todo o progresso de acesso antecipado será mantido."),
        section("pre-download-schedule", "Cronograma de pré-download", "O pré-download do cliente do jogo será aberto aproximadamente uma semana antes do lançamento."),
        section("launch-day-plan", "Plano do dia de lançamento (5 de outubro)", "O AION 2 entra no ar globalmente em 5 de outubro. Conteúdo PVE e PVP completo será aberto."),
        section("post-launch-roadmap", "Perspectiva de conteúdo pós-lançamento", "A NCSoft confirmou atualizações contínuas de conteúdo após o lançamento. O primeiro patch grande é esperado dentro de 4-6 semanas após o lançamento."),
      ],
    }),
    ru: articleCopy(newsLabels, "ru", 5, {
      eyebrow: "ДОРОЖНАЯ КАРТА ЗАПУСКА",
      title: "Обратный отсчёт запуска AION 2 5 октября: Полная хронология ключевых вех",
      description:
        "От масштабного теста запуска 17 сентября до официального запуска 5 октября, полный анализ всех ключевых узлов перед запуском AION 2",
      intro:
        "AION 2 выходит глобально 5 октября 2026 года. С сегодняшнего дня мы составили карту всех ключевых временных точек до дня запуска.",
      keywords: ["Дата запуска AION 2", "AION 2 5 октября", "Обратный отсчёт AION 2", "Ранний доступ AION 2", "Предзагрузка AION 2"],
      sourceNote: "На основе официальной дорожной карты запуска NCSoft (26 августа 2026 г.) и информации магазина Steam.",
      sections: [
        section("september-milestones", "Ключевые вехи сентября", "17-18 сентября: Масштабный тест запуска (LST) в KST, последний крупномасштабный технический тест перед официальным запуском. 30 сентября: Начинается ранний доступ пакета основателя (UTC)."),
        section("early-access-window", "Окно раннего доступа пакета основателя", "Ранний доступ длится с 30 сентября по 4 октября, всего 5 дней. Весь прогресс раннего доступа будет сохранён."),
        section("pre-download-schedule", "График предзагрузки", "Предзагрузка игрового клиента откроется примерно за неделю до запуска."),
        section("launch-day-plan", "План дня запуска (5 октября)", "AION 2 запускается глобально 5 октября. Откроется полный контент PVE и PVP."),
        section("post-launch-roadmap", "Перспективы контента после запуска", "NCSoft подтвердила постоянные обновления контента после запуска. Первый крупный патч ожидается в течение 4-6 недель после запуска."),
      ],
    }),
    ko: articleCopy(newsLabels, "ko", 5, {
      eyebrow: "출시 로드맵",
      title: "AION 2 10월 5일 출시 카운트다운: 주요 마일스톤 완전 타임라인",
      description:
        "9월 17일 출시 규모 테스트부터 10월 5일 공식 출시까지, AION 2 출시 전 모든 주요 노드 완전 분석",
      intro:
        "AION 2는 2026년 10월 5일 글로벌 출시됩니다. 오늘부터 출시일까지의 모든 주요 타임포인트를 정리했습니다.",
      keywords: ["AION 2 출시일", "AION 2 10월 5일", "AION 2 카운트다운", "AION 2 조기 액세스", "AION 2 사전 다운로드"],
      sourceNote: "NCSoft 공식 출시 로드맵 발표(2026-08-26) 및 Steam 스토어 페이지 정보 기반.",
      sections: [
        section("september-milestones", "9월 주요 마일스톤", "9월 17-18일: 출시 규모 테스트(LST) KST로 개최, 공식 출시 전 마지막 대규모 기술 테스트. 9월 30일: 창립자 팩 조기 액세스 시작(UTC)."),
        section("early-access-window", "창립자 팩 조기 액세스 창", "조기 액세스는 9월 30일부터 10월 4일까지, 총 5일간 진행됩니다. 모든 조기 액세스 진행 상황이 유지됩니다."),
        section("pre-download-schedule", "사전 다운로드 일정", "게임 클라이언트 사전 다운로드는 출시 약 1주일 전에 열립니다."),
        section("launch-day-plan", "출시일(10월 5일) 계획", "AION 2는 10월 5일 글로벌 오픈됩니다. 완전한 PVE 및 PVP 콘텐츠가 개방됩니다."),
        section("post-launch-roadmap", "출시 후 콘텐츠 전망", "NCSoft는 출시 후 지속적인 콘텐츠 업데이트를 확인했습니다. 첫 번째 대형 패치는 출시 후 4-6주 이내에 예상됩니다."),
      ],
    }),
    "zh-hant": articleCopy(newsLabels, "zh-hant", 5, {
      eyebrow: "發布路線圖",
      title: "AION 2 10月5日發布倒計時：關鍵里程碑與時間線完整解析",
      description:
        "從9月17日發布規模測試到10月5日正式發布，完整解析AION 2發布前的所有關鍵節點、創始人包提前訪問窗口、預下載時間和發布日計劃",
      intro:
        "AION 2將於2026年10月5日全球同步發布。從今天起，我們為你梳理了從當前到發布日的所有關鍵時間節點，幫助你做好準備，不錯過任何重要時刻。",
      keywords: ["AION 2 發布時間", "AION 2 10月5日", "AION 2 倒計時", "AION 2 提前訪問", "AION 2 預下載"],
      sourceNote: "基於 NCSoft 官方發布路線圖公告（2026-08-26）和 Steam 商店頁面資訊整理。",
      sections: [
        section("september-milestones", "9月關鍵里程碑", "9月17-18日：發布規模測試（LST）韓國時間舉行，這是正式發布前的最後一次大規模技術測試。測試內容包括37級上限的完整遊戲體驗。9月30日：創始人包購買者提前訪問開始（UTC時間）。購買Standard/Deluxe/Ultimate版本的玩家可以率先登錄遊戲。"),
        section("early-access-window", "創始人包提前訪問窗口", "提前訪問從9月30日持續到10月4日，共5天。在此期間，創始人包購買者可以體驗完整的遊戲內容，建立角色，加入公會，甚至在PVP區域建立據點。10月5日全球發布時，所有提前訪問進度將保留並延續。"),
        section("pre-download-schedule", "預下載時間安排", "遊戲客戶端預下載將在發布前一週左右開放。Steam和NCSoft啟動器用戶可以在預下載期間下載並安裝遊戲，發布日當天即可直接登錄。建議提前下載以避免發布首日的服務器擁堵。"),
        section("launch-day-plan", "發布日（10月5日）計劃", "AION 2將於10月5日全球同步上線。發布時刻因地區而異：韓國時間凌晨開始，隨後依次覆蓋亞洲、歐洲和北美服務器。發布日將開放完整的PVE內容（主線任務、副本、開放世界探索）和PVP內容（競技場、深淵戰場）。"),
        section("post-launch-roadmap", "發布後內容展望", "NCSoft已確認發布後將持續更新內容。首個大型補丁預計在發布後4-6週內推出，包括新的副本、職業平衡調整和PVP賽季系統。長期路線圖還包括跨服務器戰場、攻城戰和季節性活動。"),
      ],
    }),
  },
};
