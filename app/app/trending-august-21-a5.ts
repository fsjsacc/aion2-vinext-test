import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-21-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

/* ARTICLE 5 — Client & pre-download guide */
const clientSource1: ContentSource = { id: "aion2hub-client-2026-08-21", kind: "third-party", publisher: "AION2Hub", label: "AION 2 Global — Release Date & Pre-registration Hub", url: "https://aion2hub.com/", publishedAt: "2026-08-01", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2 全球版——上线日期与预注册中心", en: "AION 2 Global — Release Date & Pre-registration Hub", fr: "AION 2 Global — Hub de date de sortie et de pré-inscription", de: "AION 2 Global — Hub für Veröffentlichungsdatum und Vorregistrierung", es: "AION 2 Global — Centro de fecha de lanzamiento y preinscripción", ja: "AION 2 グローバル — リリース日・事前登録ハブ", "pt-br": "AION 2 Global — Hub de data de lançamento e pré-registro", ru: "AION 2 Global — Хаб даты релиза и предрегистрации", ko: "AION 2 글로벌 — 출시일·사전등록 허브", "zh-hant": "AION 2 全球版——上線日期與預註冊中心", }, "https://aion2hub.com/"), };
const clientSource2: ContentSource = { id: "mmobomb-client-2026-08-21", kind: "third-party", publisher: "MMOBomb", label: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", url: "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream", publishedAt: "2026-08-10", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "NC 首次全球开发者直播", en: "NC Shares What Aion 2 Players Can Expect At Launch On First Global Dev Stream", fr: "NC partage ce que les joueurs d'Aion 2 peuvent attendre", de: "NC teilt mit, was Aion 2-Spieler beim Launch erwarten können", es: "NC comparte lo que los jugadores de Aion 2 pueden esperar", ja: "NCが初のグローバル開発者ストリーム", "pt-br": "NC compartilha o que os jogadores de Aion 2 podem esperar", ru: "NC делится тем, что игроки Aion 2 могут ожидать", ko: "NC, 첫 글로벌 개발자 스트림", "zh-hant": "NC 首次全球開發者直播", }, "https://www.mmobomb.com/news/nc-shares-what-aion-2-players-can-expect-launch-first-global-dev-stream"), };
const clientSource3: ContentSource = { id: "plaync-client-2026-08-21", kind: "official", publisher: "NCSOFT", label: "AION 2 (KR) — 게임 클라이언트 안내", url: "https://aion2.plaync.com/ko-kr/board/notice", publishedAt: "2026-07-01", retrievedAt: "2026-08-21", verifiedAt: "2026-08-21", localizations: localizations({ "zh-hans": "AION 2（韩服）— 游戏客户端说明", en: "AION 2 (KR) — Game Client Guide", fr: "AION 2 (KR) — Guide du client de jeu", de: "AION 2 (KR) — Spielclient-Guide", es: "AION 2 (KR) — Guía del cliente del juego", ja: "AION 2 (KR) — ゲームクライアントガイド", "pt-br": "AION 2 (KR) — Guia do cliente do jogo", ru: "AION 2 (KR) — Гайд по игровому клиенту", ko: "AION 2 (KR) — 게임 클라이언트 안내", "zh-hant": "AION 2（韓服）— 遊戲客戶端說明", }, "https://aion2.plaync.com/ko-kr/board/notice"), };
const clientHero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice", rights: "linked-official-media", translations: { "zh-hans": { alt: "客户端与预载指南配图", caption: "NC 官方配图；Aion 2 全球版预计通过 Steam 与 PURPLE 平台提供。" }, en: { alt: "Client and pre-download guide image", caption: "Official NC artwork; Aion 2 global is expected to launch on Steam and PURPLE platforms." }, fr: { alt: "Image du guide du client et pré-téléchargement", caption: "Visuel officiel NC ; Aion 2 global devrait être lancé sur Steam et PURPLE." }, de: { alt: "Client- und Vorabdownload-Guide-Bild", caption: "Offizielles NC-Artwork; Aion 2 global startet voraussichtlich auf Steam und PURPLE." }, es: { alt: "Imagen de la guía del cliente y precarga", caption: "Arte oficial de NC; Aion 2 global se lanzará en Steam y PURPLE." }, ja: { alt: "クライアントと事前ダウンロードガイド画像", caption: "NC公式アートワーク；Aion 2 グローバルは Steam と PURPLE で提供予定。" }, "pt-br": { alt: "Imagem do guia do cliente e pré-download", caption: "Arte oficial da NC; Aion 2 global deve ser lançado no Steam e PURPLE." }, ru: { alt: "Изображение гайда по клиенту и предзагрузке", caption: "Официальный арт NC; глобальный Aion 2 ожидается на Steam и PURPLE." }, ko: { alt: "클라이언트·사전 다운로드 가이드 이미지", caption: "NC 공식 이미지입니다. Aion 2 글로벌은 Steam과 PURPLE 플랫폼으로 출시 예정입니다." }, "zh-hant": { alt: "客戶端與預載指南配圖", caption: "NC 官方配圖；Aion 2 全球版預計透過 Steam 與 PURPLE 平台提供。" }, }, };

export const trendingAugust21Article5: ContentEntry = {
  section: "guides", slug: "aion-2-client-pre-download-guide", schemaType: "Article",
  publishedAt: "2026-08-21", updatedAt: "2026-08-21", readingMinutes: 5, publication: publishedVerified,
  sources: [clientSource1, clientSource2, clientSource3], heroImage: clientHero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-global-server-regions-guide" },
    { kind: "content", section: "guides", slug: "aion-2-daeva-pass-guide" },
    { kind: "content", section: "guides", slug: "aion-2-leveling-guide-1-50" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "PLATFORM GUIDE", title: "Aion 2 Client & Pre-Download Guide: Steam, PURPLE & PC Requirements", description: "Aion 2 global launches on Steam and PURPLE. Here is what you need to know about the client, PC requirements, pre-download, and how to prepare for September 30.", intro: "With the September 30 early access approaching, knowing the platform details and PC requirements helps you arrive ready. Aion 2 is expected to launch on Steam and NCSoft's own PURPLE platform, with pre-download likely available before the early access start date. This guide covers what we know about the client, the platforms, and how to prepare your system.",
      sourceNote: "Based on the global release information on AION2Hub, the developer stream platform mentions, and the official KR service structure.",
      keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 client download", "Aion 2 PC requirements", "Aion 2 pre-download"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Aion 2 global is expected to be available on Steam (the most popular PC gaming platform) and NCSoft's PURPLE launcher. Both platforms will offer the same game client and server access, with the main difference being the launcher overlay and community features.", "Steam offers the convenience of the Steam ecosystem — friends list, achievements, and community features. PURPLE is NCSoft's own platform, used for their other global titles. The Founder's Packs are available on Steam, and it is likely that PURPLE pre-orders will also be available."]),
        section("requirements", "PC System Requirements", ["Exact PC system requirements for the global version have not been released yet. Based on the KR service and the Unreal Engine 5 foundation, expect a modern mid-range PC to be the baseline.", "Typical recommendations for a UE5 MMO: a recent multi-core CPU (Intel i5 / AMD Ryzen 5 or better), 16GB of RAM, and a dedicated GPU (NVIDIA GTX 1060 / AMD RX 580 or better). An SSD is strongly recommended for loading times."]),
        section("prep", "Pre-Download & Launch Prep", ["Pre-download is expected to be available a few days before the September 30 early access, following the standard MMO launch pattern. The client size is unknown but likely significant — expect 50-80GB based on the UE5 engine and high-resolution assets.", "Prepare by updating your graphics drivers, ensuring your SSD has enough free space, and creating your Steam or PURPLE account in advance. The server region selection happens at character creation, not account creation, so you can decide on launch day."]),
        section("global", "What to Do Now", ["With 40 days until early access, now is the time to: (1) create or update your Steam account, (2) check your PC specs against the expected requirements, (3) decide on your server region, and (4) consider a Founder's Pack purchase if you want the 30-day Membership.", "Bookmark our hub for the latest pre-download information — we will update this guide as soon as NCSoft announces the exact client details for the global launch."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "平台指南", title: "Aion 2 客户端与预载指南：Steam、PURPLE 与 PC 配置要求", description: "Aion 2 全球版在 Steam 与 PURPLE 平台上线。了解客户端、PC 配置要求、预载方式与 9 月 30 日准备。", intro: "随着 9 月 30 日抢先体验临近，了解平台细节与 PC 配置要求能让你做好准备。", sourceNote: "基于 AION2Hub 全球上线信息、开发者直播平台提及与官方韩服结构。", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 客户端下载", "Aion 2 PC 配置要求", "Aion 2 预载"],
      sections: [
        section("platforms", "Steam 与 PURPLE", ["Aion 2 全球版预计在 Steam 与 NCSoft 的 PURPLE 启动器上提供。创始人包在 Steam 上可购。"]),
        section("requirements", "PC 系统要求", ["全球版具体 PC 配置尚未公布。基于 UE5 引擎，预期现代中端 PC 为基线。"]),
        section("prep", "预载与上线准备", ["预载预计在 9 月 30 日前数天开放。提前更新显卡驱动、确保 SSD 有足够空间。"]),
        section("global", "现在该做什么", ["距抢先体验 40 天：(1) 创建/更新 Steam 账号，(2) 检查 PC 配置，(3) 决定服务器区域，(4) 考虑创始人包。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "플랫폼 가이드", title: "Aion 2 클라이언트·사전 다운로드 가이드: Steam, PURPLE과 PC 요구 사양", description: "Aion 2 글로벌은 Steam과 PURPLE로 출시됩니다. 클라이언트, PC 요구 사양, 사전 다운로드와 9월 30일 준비 방법.", intro: "9월 30일 얼리 액세스가 다가옴에 따라 플랫폼 세부사항과 PC 요구 사양을 아는 것이 중요합니다.", sourceNote: "AION2Hub 글로벌 출시 정보, 개발자 스트림 플랫폼 언급, 공식 KR 서비스 구조에 기반합니다.", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 클라이언트 다운로드", "Aion 2 PC 요구 사양", "Aion 2 사전 다운로드"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Steam과 NCSoft의 PURPLE 런처에서 제공 예정. 파운더스 팩은 Steam에서 구매 가능."]),
        section("requirements", "PC 요구 사양", ["글로벌 버전의 정확한 PC 요구 사양은 아직 발표되지 않음. UE5 기반 중급 PC 예상."]),
        section("prep", "사전 다운로드", ["9월 30일 며칠 전에 사전 다운로드가 열릴 것으로 예상."]),
        section("global", "지금 할 일", ["얼리 액세스까지 40일: Steam 계정 생성, PC 사양 확인, 서버 지역 결정, 파운더스 팩 검토."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "プラットフォームガイド", title: "Aion 2 クライアント・事前ダウンロードガイド：Steam、PURPLE と PC 要件", description: "Aion 2 グローバルは Steam と PURPLE でリリース予定。クライアント、PC 要件、事前ダウンロードと9月30日の準備。", intro: "9月30日の早期アクセスが近づく中、プラットフォームの詳細とPC要件を把握することが重要です。", sourceNote: "AION2Hub のグローバルリリース情報、開発者ストリームのプラットフォーム言及、公式 KR サービス構造に基づきます。", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 クライアントダウンロード", "Aion 2 PC 要件", "Aion 2 事前ダウンロード"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Steam と NCSoft の PURPLE ランチャーで提供予定。ファウンダーズパックは Steam で購入可能。"]),
        section("requirements", "PC システム要件", ["グローバル版の正確なPC要件は未発表。UE5ベースでミッドレンジPCを想定。"]),
        section("prep", "事前ダウンロード", ["9月30日の数日前に事前ダウンロードが可能になる見込み。"]),
        section("global", "今すべきこと", ["早期アクセスまで40日: Steamアカウント作成、PCスペック確認、サーバー地域決定、ファウンダーズパック検討。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, { eyebrow: "GUIDE PLATEFORME", title: "Guide du client et pré-téléchargement d'Aion 2 : Steam, PURPLE et configuration PC", description: "Aion 2 global sort sur Steam et PURPLE. Ce qu'il faut savoir sur le client, la configuration PC, le pré-téléchargement.", intro: "À l'approche du 30 septembre, connaître les plateformes et la configuration PC vous prépare au lancement.", sourceNote: "Basé sur les infos de sortie d'AION2Hub, les mentions du dev stream et la structure KR officielle.", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 téléchargement client", "Aion 2 configuration PC"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Disponible sur Steam et PURPLE. Les packs Fondateur sont sur Steam."]),
        section("requirements", "Configuration PC", ["Non annoncée officiellement. Basé sur UE5 : PC milieu de gamme moderne attendu."]),
        section("prep", "Pré-téléchargement", ["Attendu quelques jours avant le 30 septembre."]),
        section("global", "Que faire maintenant", ["Créez votre compte Steam, vérifiez votre configuration, choisissez votre région."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, { eyebrow: "PLATTFORM-GUIDE", title: "Aion 2 Client- & Vorabdownload-Guide: Steam, PURPLE & PC-Anforderungen", description: "Aion 2 global startet auf Steam und PURPLE. Was Sie über Client, PC-Anforderungen und Vorabdownload wissen müssen.", intro: "Vor dem 30. September bereiten Sie sich am besten mit Plattform- und PC-Wissen vor.", sourceNote: "Basierend auf den AION2Hub-Release-Infos, Dev-Stream-Erwähnungen und der offiziellen KR-Struktur.", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 Client-Download", "Aion 2 PC-Anforderungen"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Verfügbar auf Steam und PURPLE. Founder's Packs sind auf Steam erhältlich."]),
        section("requirements", "PC-Anforderungen", ["Offiziell nicht angekündigt. UE5-basiert: moderner Mittelklasse-PC erwartet."]),
        section("prep", "Vorabdownload", ["Wird einige Tage vor dem 30. September erwartet."]),
        section("global", "Was jetzt tun", ["Steam-Konto erstellen, PC-Konfiguration prüfen, Serverregion wählen."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, { eyebrow: "GUÍA DE PLATAFORMA", title: "Guía del cliente y precarga de Aion 2: Steam, PURPLE y requisitos del PC", description: "Aion 2 global se lanza en Steam y PURPLE. Lo que necesita saber sobre el cliente, los requisitos del PC y la precarga.", intro: "Con la llegada del 30 de septiembre, conocer los detalles de la plataforma y los requisitos del PC le prepara para el lanzamiento.", sourceNote: "Basado en la información de lanzamiento de AION2Hub, las menciones de la plataforma del dev stream y la estructura oficial de KR.", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 descarga del cliente", "Aion 2 requisitos del PC"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Disponible en Steam y PURPLE. Los paquetes de fundador están en Steam."]),
        section("requirements", "Requisitos del PC", ["No anunciados oficialmente. Basado en UE5: PC de gama media moderna esperado."]),
        section("prep", "Precarga", ["Esperada unos días antes del 30 de septiembre."]),
        section("global", "Qué hacer ahora", ["Cree su cuenta de Steam, revise su configuración, elija su región."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, { eyebrow: "GUIA DE PLATAFORMA", title: "Guia do cliente e pré-download de Aion 2: Steam, PURPLE e requisitos de PC", description: "Aion 2 global é lançado no Steam e PURPLE. O que você precisa saber sobre o cliente, requisitos de PC e pré-download.", intro: "Com a chegada de 30 de setembro, conhecer os detalhes da plataforma e os requisitos de PC prepara você para o lançamento.", sourceNote: "Baseado nas informações de lançamento da AION2Hub, nas menções da plataforma do dev stream e na estrutura oficial da KR.", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 download do cliente", "Aion 2 requisitos de PC"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Disponível no Steam e PURPLE. Os pacotes de fundador estão no Steam."]),
        section("requirements", "Requisitos de PC", ["Não anunciados oficialmente. Baseado em UE5: PC de médio porte moderno esperado."]),
        section("prep", "Pré-download", ["Esperado alguns dias antes de 30 de setembro."]),
        section("global", "O que fazer agora", ["Crie sua conta Steam, verifique sua configuração, escolha sua região."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, { eyebrow: "ГАЙД ПО ПЛАТФОРМЕ", title: "Гайд по клиенту и предзагрузке Aion 2: Steam, PURPLE и системные требования", description: "Глобальный Aion 2 выходит на Steam и PURPLE. Что нужно знать о клиенте, системных требованиях и предзагрузке.", intro: "С приближением 30 сентября знание платформ и системных требований подготовит вас к запуску.", sourceNote: "На основе информации о релизе AION2Hub, упоминаний платформ в dev-стриме и официальной структуры KR.", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 загрузка клиента", "Aion 2 системные требования"],
      sections: [
        section("platforms", "Steam vs PURPLE", ["Доступен на Steam и PURPLE. Наборы основателя доступны в Steam."]),
        section("requirements", "Системные требования", ["Официально не объявлены. На основе UE5: ожидается современный ПК среднего класса."]),
        section("prep", "Предзагрузка", ["Ожидается за несколько дней до 30 сентября."]),
        section("global", "Что делать сейчас", ["Создайте аккаунт Steam, проверьте конфигурацию ПК, выберите регион сервера."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "平台指南", title: "Aion 2 客戶端與預載指南：Steam、PURPLE 與 PC 配置要求", description: "Aion 2 全球版在 Steam 與 PURPLE 平台上線。了解客戶端、PC 配置要求、預載方式與 9 月 30 日準備。", intro: "隨著 9 月 30 日搶先體驗臨近，了解平台細節與 PC 配置要求能讓你做好準備。", sourceNote: "基於 AION2Hub 全球上線資訊、開發者直播平台提及與官方韓服結構。", keywords: ["Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 客戶端下載", "Aion 2 PC 配置要求", "Aion 2 預載"],
      sections: [
        section("platforms", "Steam 與 PURPLE", ["Aion 2 全球版預計在 Steam 與 NCSoft 的 PURPLE 啟動器上提供。創始人包在 Steam 上可購。"]),
        section("requirements", "PC 系統要求", ["全球版具體 PC 配置尚未公佈。基於 UE5 引擎，預期現代中階 PC 為基線。"]),
        section("prep", "預載與上線準備", ["預載預計在 9 月 30 日前數天開放。提前更新顯卡驅動、確保 SSD 有足夠空間。"]),
        section("global", "現在該做什麼", ["距搶先體驗 40 天：(1) 建立/更新 Steam 帳號，(2) 檢查 PC 配置，(3) 決定伺服器區域，(4) 考慮創始人包。"]),
      ],
    }),
  },
};