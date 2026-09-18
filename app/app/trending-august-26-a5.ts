import { articleCopy, guideLabels, localizations, publishedVerified, section } from "./trending-august-26-shared";
import type { ContentEntry, ContentHeroImage, ContentSource } from "./content-registry";

const source1: ContentSource = { id: "plaync-cross-2026-08-26", kind: "official", publisher: "NCSOFT", label: "AION 2 Official Account & Platform Guide", url: "https://aion2.plaync.com/", publishedAt: "2026-06-01", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "AION 2 官方账号与平台指南", en: "AION 2 Official Account & Platform Guide", fr: "Guide officiel du compte et de la plateforme AION 2", de: "AION 2 Offizieller Konto- und Plattform-Guide", es: "Guía oficial de cuenta y plataforma de AION 2", ja: "AION 2 公式アカウント＆プラットフォームガイド", "pt-br": "Guia oficial de conta e plataforma do AION 2", ru: "Официальное руководство по аккаунту и платформе AION 2", ko: "AION 2 공식 계정 및 플랫폼 가이드", "zh-hant": "AION 2 官方帳號與平台指南", }, "https://aion2.plaync.com/"), };
const source2: ContentSource = { id: "gematsu-launch-2026-08-26", kind: "third-party", publisher: "Gematsu", label: "AION 2 launches in September worldwide", url: "https://www.gematsu.com/2026/06/aion-2-launches-in-september-worldwide", publishedAt: "2026-06-01", retrievedAt: "2026-08-26", verifiedAt: "2026-08-26", localizations: localizations({ "zh-hans": "AION 2 全球九月发布", en: "AION 2 launches in September worldwide", fr: "AION 2 sort en septembre dans le monde entier", de: "AION 2 erscheint weltweit im September", es: "AION 2 se lanza en septiembre en todo el mundo", ja: "AION 2 世界同時9月発売", "pt-br": "AION 2 lança em setembro mundialmente", ru: "AION 2 запускается в сентябре по всему миру", ko: "AION 2 9월 전 세계 출시", "zh-hant": "AION 2 全球九月發布", }, "https://www.gematsu.com/2026/06/aion-2-launches-in-september-worldwide"), };
const hero: ContentHeroImage = { src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg", width: 1100, height: 605, credit: "NC Corporation", sourceUrl: "https://aion2.plaync.com/", rights: "linked-official-media", translations: { "zh-hans": { alt: "跨平台指南配图", caption: "NC 官方配图；AION 2 多平台支持。" }, en: { alt: "Cross-platform guide image", caption: "Official NC artwork; AION 2 multi-platform support." }, fr: { alt: "Image du guide multiplateforme", caption: "Visuel officiel NC ; support multiplateforme d'AION 2." }, de: { alt: "Plattformübergreifender Guide-Bild", caption: "Offizielles NC-Artwork; AION 2 Multi-Plattform-Support." }, es: { alt: "Imagen de la guía multiplataforma", caption: "Arte oficial de NC; soporte multiplataforma de AION 2." }, ja: { alt: "クロスプラットフォームガイド画像", caption: "NC公式アートワーク；AION 2 マルチプラットフォーム対応。" }, "pt-br": { alt: "Imagem do guia multiplataforma", caption: "Arte oficial da NC; suporte multiplataforma do AION 2." }, ru: { alt: "Изображение кроссплатформенного гайда", caption: "Официальный арт NC; мультиплатформенная поддержка AION 2." }, ko: { alt: "크로스 플랫폼 가이드 이미지", caption: "NC 공식 이미지; AION 2 멀티 플랫폼 지원." }, "zh-hant": { alt: "跨平台指南配圖", caption: "NC 官方配圖；AION 2 多平台支援。" }, }, };

export const trendingAugust26Article5: ContentEntry = {
  section: "guides", slug: "aion-2-cross-platform-guide", schemaType: "Article",
  publishedAt: "2026-08-26", updatedAt: "2026-08-26", readingMinutes: 5,
  publication: publishedVerified,
  sources: [source1, source2],
  heroImage: hero,
  related: [
    { kind: "content", section: "guides", slug: "aion-2-steam-release-guide" },
    { kind: "content", section: "guides", slug: "aion-2-pre-launch-checklist" },
    { kind: "content", section: "guides", slug: "aion-2-gamescom-2026-trailer-analysis" },
  ],
  translations: {
    en: articleCopy(guideLabels, "en", 5, {
      eyebrow: "CROSS-PLATFORM GUIDE", title: "AION 2 Cross-Platform Guide: PC, Steam, PURPLE & Mobile", description: "Complete guide to playing AION 2 across platforms. Learn about Steam, NC PURPLE, mobile, and how to link your accounts for seamless cross-platform play.", intro: "AION 2 supports multiple platforms, allowing you to play on PC, mobile, and Steam with a single account. This guide covers the different platforms, how to set up your account, and what features are available on each platform as the September 30 Western launch approaches.", sourceNote: "Based on the official NCSoft account and platform guide, and Gematsu's AION 2 launch coverage.", keywords: ["Aion 2 cross-platform", "Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 mobile", "Aion 2 account linking"],
      sections: [
        section("platform-overview", "Platform Overview: Where to Play", ["AION 2 is available on multiple platforms. The primary platforms are PC (via the NC PURPLE client), Steam, and mobile (iOS and Android). Each platform offers the same core gameplay experience, with some platform-specific features.", "The NC PURPLE client is the primary PC platform for AION 2. It offers the full experience with the highest graphical settings and supports all input methods. PURPLE also includes community features such as friends list, chat, and streaming integration.", "Steam provides a convenient alternative for PC players who prefer to manage their games through the Steam client. Steam achievements, friends list integration, and Steam Cloud saves are supported. The Steam version has the same content as the PURPLE version."]),
        section("mobile-play", "Mobile Play (iOS & Android)", ["AION 2 is also available on mobile devices through the NC PURPLE app. The mobile version offers a streamlined interface optimized for touch controls, with automatic targeting and simplified ability rotations. The mobile version is ideal for daily quests, crafting, and auction house management.", "Cross-progression means your character is the same across all platforms. You can start a quest on PC and finish it on mobile, or manage your crafting while commuting. The mobile version has the same economy and auction house as the PC version.", "Mobile-specific features include one-tap gathering, auto-navigation to quest objectives, and simplified combat controls. The mobile version is not designed for endgame raiding or competitive PvP, but it excels at daily maintenance and social features."]),
        section("account-linking", "Account Linking & Cross-Progression", ["To play AION 2 across platforms, you need an NC account. Your NC account is the central hub that links all your platforms. Create your account on the official NC website, then link your Steam and mobile platforms to the same account.", "Cross-progression is automatic once your accounts are linked. Your character's level, gear, inventory, currency, and progress are shared across all platforms. There is no manual transfer or sync required — everything updates in real time.", "Important: account linking is permanent in most cases. Once you link a Steam account to your NC account, you cannot unlink it. Choose your primary account carefully before linking. If you already have a Korean NC account, you may need to create a separate global account for the Western release."]),
        section("launch-platforms", "Platform Availability at Launch", ["At the September 30 Western early access launch, AION 2 will be available on PC via NC PURPLE and Steam. The mobile version is expected to launch simultaneously in the Western regions, following its successful launch in Korea and Taiwan.", "Pre-load will be available on both Steam and PURPLE approximately 48 hours before the launch time. The client size is approximately 45GB for the PC version and 8GB for the mobile version. Pre-loading ensures you can start playing immediately at launch.", "System requirements for the PC version: Windows 10 or later, Intel Core i5-10400 or AMD Ryzen 5 3600, 16GB RAM, NVIDIA GTX 1060 or AMD Radeon RX 580, 45GB storage space. The mobile version requires iOS 15+ or Android 11+ with at least 4GB RAM."]),
        section("platform-comparison", "Platform Comparison & Recommendations", ["For the best experience, play on PC for endgame content, raids, and PvP. The PC version offers the highest graphical fidelity, the most precise controls, and the full interface. Use a gaming mouse with additional buttons for ability keybinds.", "Use the mobile version for daily maintenance: checking the auction house, crafting, gathering, and completing daily quests. The mobile version is excellent for staying connected with your guild and managing your character while away from your PC.", "Steam vs PURPLE: both offer the same game, but Steam provides additional features such as regional pricing, Steam Wallet support, and easier payment methods for some regions. PURPLE offers tighter integration with NC's ecosystem and may receive updates slightly earlier."]),
      ],
    }),
    "zh-hans": articleCopy(guideLabels, "zh-hans", 5, {
      eyebrow: "跨平台指南", title: "AION 2 跨平台指南：PC、Steam、PURPLE 与移动端", description: "完整的 AION 2 跨平台游戏指南。了解 Steam、NC PURPLE、移动端和账号关联。", intro: "AION 2 支持多个平台，使用单个账号即可在 PC、移动端和 Steam 上游戏。", sourceNote: "基于 NCSoft 官方账号和平台指南，以及 Gematsu 的发布报道。", keywords: ["Aion 2 跨平台", "Aion 2 Steam", "Aion 2 PURPLE", "Aion 2 移动端"],
      sections: [
        section("platform-overview", "平台概述", ["AION 2 支持 PC（NC PURPLE）、Steam 和移动端（iOS/Android）。", "PURPLE 客户端提供最高画质设置。Steam 版本支持成就和云存档。"]),
        section("mobile-play", "移动端游戏", ["通过 NC PURPLE 应用在移动设备上游戏。触控优化界面。", "跨平台进度共享，可在 PC 和移动端之间无缝切换。"]),
        section("account-linking", "账号关联与跨平台进度", ["需要 NC 账号来关联所有平台。跨平台进度自动同步。", "账号关联通常是永久性的，请谨慎选择主账号。"]),
        section("launch-platforms", "发布平台", ["9 月 30 日将在 PURPLE 和 Steam 上发布。移动端同步上线。", "PC 版约 45GB，移动版约 8GB。发布前 48 小时可预载。"]),
        section("platform-comparison", "平台对比与推荐", ["终局内容推荐 PC 版。日常维护可用移动版。", "Steam 和 PURPLE 提供相同游戏内容。"]),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 5, {
      eyebrow: "크로스 플랫폼 가이드", title: "AION 2 크로스 플랫폼 가이드", description: "PC, Steam, PURPLE, 모바일에서 AION 2를 플레이하는 완벽한 가이드.", intro: "AION 2는 여러 플랫폼을 지원하며 하나의 계정으로 모든 플랫폼에서 플레이할 수 있습니다.", sourceNote: "NCSoft 공식 계정 및 플랫폼 가이드, Gematsu 기반.", keywords: ["Aion 2 크로스 플랫폼", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "플랫폼 개요", ["PC(NC PURPLE), Steam, 모바일(iOS/Android) 지원.", "PURPLE 최고 그래픽. Steam 업적 지원."]),
        section("mobile-play", "모바일 플레이", ["NC PURPLE 앱으로 모바일. 터치 최적화.", "크로스 프로그레션. PC와 모바일 간 전환."]),
        section("account-linking", "계정 연결", ["NC 계정 필요. 자동 크로스 프로그레션.", "계정 연결은 영구적. 신중히 선택."]),
        section("launch-platforms", "출시 플랫폼", ["9월 30일 PURPLE/Steam 출시. 모바일 동시 출시.", "PC 45GB, 모바일 8GB."]),
        section("platform-comparison", "플랫폼 비교", ["엔드게임 PC 권장. 일상은 모바일.", "Steam과 PURPLE 동일 콘텐츠."]),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 5, {
      eyebrow: "クロスプラットフォームガイド", title: "AION 2 クロスプラットフォームガイド", description: "PC、Steam、PURPLE、モバイルでAION 2をプレイする完全ガイド。", intro: "AION 2は複数のプラットフォームをサポートしています。", sourceNote: "NCSoft公式アカウント＆プラットフォームガイド、Gematsuに基づきます。", keywords: ["Aion 2 クロスプラットフォーム", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "プラットフォーム概要", ["PC(NC PURPLE)、Steam、モバイル(iOS/Android)対応。"]),
        section("mobile-play", "モバイルプレイ", ["NC PURPLEアプリ。タッチ最適化。進行状況共有。"]),
        section("account-linking", "アカウント連携", ["NCアカウント必須。自動クロスプログレッション。"]),
        section("launch-platforms", "発売プラットフォーム", ["9月30日PURPLE/Steam発売。モバイル同時。"]),
        section("platform-comparison", "プラットフォーム比較", ["エンドゲームはPC推奨。日常はモバイル。"]),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 5, {
      eyebrow: "GUIDE MULTIPLATEFORME", title: "Guide multiplateforme d'AION 2", description: "Guide complet pour jouer à AION 2 sur toutes les plateformes.", intro: "AION 2 prend en charge plusieurs plateformes.", sourceNote: "Basé sur le guide officiel NCSoft et Gematsu.", keywords: ["Aion 2 multiplateforme", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "Aperçu des plateformes", ["PC(PURPLE), Steam, mobile(iOS/Android)."]),
        section("mobile-play", "Jeu mobile", ["App NC PURPLE. Interface tactile. Progression partagée."]),
        section("account-linking", "Liaison de compte", ["Compte NC requis. Progression automatique."]),
        section("launch-platforms", "Plateformes de lancement", ["30 septembre PURPLE/Steam. Mobile simultané."]),
        section("platform-comparison", "Comparaison", ["Fin de jeu sur PC. Quotidien sur mobile."]),
      ],
    }),
    de: articleCopy(guideLabels, "de", 5, {
      eyebrow: "PLATTFORMÜBERGREIFEND", title: "AION 2 Plattformübergreifender Guide", description: "Vollständiger Guide zum Spielen von AION 2 auf allen Plattformen.", intro: "AION 2 unterstützt mehrere Plattformen.", sourceNote: "Basierend auf dem offiziellen NCSoft-Guide und Gematsu.", keywords: ["Aion 2 plattformübergreifend", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "Plattform-Übersicht", ["PC(PURPLE), Steam, mobil(iOS/Android)."]),
        section("mobile-play", "Mobiles Spielen", ["NC PURPLE App. Touch-Optimierung. Fortschritt geteilt."]),
        section("account-linking", "Kontoverbindung", ["NC-Konto erforderlich. Automatischer Fortschritt."]),
        section("launch-platforms", "Startplattformen", ["30. September PURPLE/Steam. Mobil gleichzeitig."]),
        section("platform-comparison", "Vergleich", ["Endgame auf PC. Alltag auf mobil."]),
      ],
    }),
    es: articleCopy(guideLabels, "es", 5, {
      eyebrow: "GUÍA MULTIPLATAFORMA", title: "Guía multiplataforma de AION 2", description: "Guía completa para jugar a AION 2 en todas las plataformas.", intro: "AION 2 es compatible con múltiples plataformas.", sourceNote: "Basado en la guía oficial de NCSoft y Gematsu.", keywords: ["Aion 2 multiplataforma", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "Resumen de plataformas", ["PC(PURPLE), Steam, móvil(iOS/Android)."]),
        section("mobile-play", "Juego móvil", ["App NC PURPLE. Interfaz táctil. Progresión compartida."]),
        section("account-linking", "Vinculación de cuenta", ["Cuenta NC requerida. Progresión automática."]),
        section("launch-platforms", "Plataformas de lanzamiento", ["30 septiembre PURPLE/Steam. Móvil simultáneo."]),
        section("platform-comparison", "Comparación", ["Fin de juego en PC. Diario en móvil."]),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 5, {
      eyebrow: "GUIA MULTIPLATAFORMA", title: "Guia multiplataforma do AION 2", description: "Guia completo para jogar AION 2 em todas as plataformas.", intro: "AION 2 suporta múltiplas plataformas.", sourceNote: "Baseado no guia oficial NCSoft e Gematsu.", keywords: ["Aion 2 multiplataforma", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "Visão geral das plataformas", ["PC(PURPLE), Steam, mobile(iOS/Android)."]),
        section("mobile-play", "Jogo mobile", ["App NC PURPLE. Interface touch. Progressão compartilhada."]),
        section("account-linking", "Vinculação de conta", ["Conta NC necessária. Progressão automática."]),
        section("launch-platforms", "Plataformas de lançamento", ["30 setembro PURPLE/Steam. Mobile simultâneo."]),
        section("platform-comparison", "Comparação", ["Fim de jogo no PC. Diário no mobile."]),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 5, {
      eyebrow: "КРОССПЛАТФОРМЕННЫЙ ГАЙД", title: "Кроссплатформенный гайд AION 2", description: "Полное руководство по игре в AION 2 на всех платформах.", intro: "AION 2 поддерживает несколько платформ.", sourceNote: "Основано на официальном гайде NCSoft и Gematsu.", keywords: ["Aion 2 кроссплатформенность", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "Обзор платформ", ["ПК(PURPLE), Steam, мобильные(iOS/Android)."]),
        section("mobile-play", "Мобильная игра", ["Приложение NC PURPLE. Сенсорный интерфейс. Общий прогресс."]),
        section("account-linking", "Привязка аккаунта", ["Требуется аккаунт NC. Автоматический прогресс."]),
        section("launch-platforms", "Платформы запуска", ["30 сентября PURPLE/Steam. Мобильные одновременно."]),
        section("platform-comparison", "Сравнение", ["Эндгейм на ПК. Повседневное на мобильном."]),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 5, {
      eyebrow: "跨平台指南", title: "AION 2 跨平台指南", description: "在所有平台上遊玩 AION 2 的完整指南。", intro: "AION 2 支援多個平台。", sourceNote: "基於 NCSoft 官方帳號和平台指南以及 Gematsu。", keywords: ["Aion 2 跨平台", "Aion 2 Steam", "Aion 2 PURPLE"],
      sections: [
        section("platform-overview", "平台概述", ["PC(PURPLE)、Steam、行動裝置(iOS/Android)。"]),
        section("mobile-play", "行動裝置遊戲", ["NC PURPLE 應用程式。觸控介面。進度共享。"]),
        section("account-linking", "帳號關聯", ["需要 NC 帳號。自動跨平台進度。"]),
        section("launch-platforms", "發布平台", ["9 月 30 日 PURPLE/Steam 發布。行動裝置同步。"]),
        section("platform-comparison", "平台比較", ["終局內容推薦 PC。日常維護可用行動裝置。"]),
      ],
    }),
  },
};