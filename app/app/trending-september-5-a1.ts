import {
  articleCopy,
  localizations,
  guideLabels,
  publishedVerified,
  section,
} from "./trending-september-5-shared";
import type { ContentSource, ContentHeroImage } from "./content-registry";

const officialSystemReqs: ContentSource = {
  id: "ncsoft-system-requirements",
  kind: "official",
  publisher: "NCSoft",
  label: "AION 2 Official System Requirements",
  url: "https://aion2.plaync.com/en-us/store/founders-pack",
  publishedAt: "2026-08-25",
  retrievedAt: "2026-09-05",
  verifiedAt: "2026-09-05",
  localizations: localizations(
    {
      "zh-hans": "AION 2 官方系统需求",
      en: "AION 2 Official System Requirements",
      fr: "Configuration requise officielle d'AION 2",
      de: "AION 2 Offizielle Systemanforderungen",
      es: "Requisitos oficiales de AION 2",
      ja: "AION 2 公式システム要件",
      "pt-br": "Requisitos oficiais do AION 2",
      ru: "Официальные системные требования AION 2",
      ko: "AION 2 공식 시스템 요구사항",
      "zh-hant": "AION 2 官方系統需求",
    },
    "https://aion2.plaync.com/en-us/store/founders-pack",
  ),
};

const steamSystemReqs: ContentSource = {
  id: "steam-aion2-system-requirements",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 on Steam — System Requirements",
  url: "https://store.steampowered.com/app/2858220/AION_2/",
  publishedAt: "2026-08-25",
  retrievedAt: "2026-09-05",
  verifiedAt: "2026-09-05",
  localizations: localizations(
    {
      "zh-hans": "Steam 上的 AION 2 — 系统需求",
      en: "AION 2 on Steam — System Requirements",
      fr: "AION 2 sur Steam — Configuration requise",
      de: "AION 2 auf Steam — Systemanforderungen",
      es: "AION 2 en Steam — Requisitos del sistema",
      ja: "SteamのAION 2 — システム要件",
      "pt-br": "AION 2 no Steam — Requisitos do sistema",
      ru: "AION 2 в Steam — Системные требования",
      ko: "Steam의 AION 2 — 시스템 요구사항",
      "zh-hant": "Steam 上的 AION 2 — 系統需求",
    },
    "https://store.steampowered.com/app/2858220/AION_2/",
  ),
};

const hero: ContentHeroImage = {
  src: "https://blogfiles.ncsoft.net/news/af7330da-4ff6-4b58-aece-400e6061a3be.jpg",
  width: 1200, height: 630,
  credit: "NC Corporation",
  sourceUrl: "https://aion2.plaync.com/en-us/store/founders-pack",
  rights: "linked-official-media",
  translations: {
    "zh-hans": { alt: "AION 2 系统需求与PC优化指南横幅", caption: "10月5日发布前完整系统需求检查与性能优化指南。" },
    en: { alt: "AION 2 System Requirements and PC Optimization Guide banner", caption: "Complete system requirements check and performance optimization guide before October 5 launch." },
    fr: { alt: "Bannière du guide de configuration et optimisation PC d'AION 2", caption: "Guide complet de vérification et d'optimisation des performances avant le lancement du 5 octobre." },
    de: { alt: "AION 2 Systemanforderungen und PC-Optimierungsleitfaden-Banner", caption: "Vollständige Systemprüfung und Performance-Optimierung vor dem Start am 5. Oktober." },
    es: { alt: "Banner de guía de requisitos y optimización de PC de AION 2", caption: "Guía completa de verificación y optimización antes del lanzamiento del 5 de octubre." },
    ja: { alt: "AION 2 システム要件・PC最適化ガイドバナー", caption: "10月5日リリース前の完全システム要件チェックとパフォーマンス最適化ガイド。" },
    "pt-br": { alt: "Banner do guia de requisitos e otimização de PC do AION 2", caption: "Guia completo de verificação e otimização antes do lançamento em 5 de outubro." },
    ru: { alt: "Баннер руководства по системным требованиям и оптимизации ПК AION 2", caption: "Полная проверка и оптимизация перед запуском 5 октября." },
    ko: { alt: "AION 2 시스템 요구사항 및 PC 최적화 가이드 배너", caption: "10월 5일 출시 전 완전한 시스템 요구사항 확인 및 성능 최적화 가이드." },
    "zh-hant": { alt: "AION 2 系統需求與PC優化指南橫幅", caption: "10月5日發布前完整系統需求檢查與性能優化指南。" },
  },
};

export const trendingSeptember5Article1 = {
  section: "guides" as const,
  slug: "aion-2-system-requirements-pc-optimization-guide",
  schemaType: "Article" as const,
  publishedAt: "2026-09-05",
  updatedAt: "2026-09-05",
  readingMinutes: 7,
  publication: publishedVerified,
  sources: [officialSystemReqs, steamSystemReqs],
  heroImage: hero,
  related: [
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-launch-scale-test-preparation-guide" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-founders-pack-complete-guide" },
    { kind: "content" as const, section: "guides" as const, slug: "aion-2-solo-leveling-guide-40-cap" },
  ],
  translations: {
    "zh-hans": articleCopy(guideLabels, "zh-hans", 7, {
      eyebrow: "配置指南",
      title: "AION 2 系统需求与PC优化完整指南：确保10月5日发布日流畅运行",
      description:
        "完整系统需求对比（最低/推荐/高配）、显卡驱动优化、DLSS设置建议、内存与存储检查清单、发布前自检流程",
      intro:
        "AION 2 将于2026年10月5日全球发布。本文将帮助你确认电脑是否满足运行需求，并提供详细的优化建议，确保发布当天获得最佳游戏体验。",
      keywords: ["AION 2 系统需求", "AION 2 配置要求", "AION 2 PC优化", "AION 2 DLSS", "AION 2 最低配置"],
      sourceNote: "基于 NCSoft 官方系统需求和 Steam 商店页面信息（2026-08-25）整理。",
      sections: [
        section(
          "minimum-vs-recommended",
          "最低配置 vs 推荐配置 vs 高配",
          "最低配置：CPU Intel i5-6600 / AMD Ryzen 5 1600、内存 8GB RAM、显卡 GTX 960 4GB / RX 560、存储空间 50GB HDD。推荐配置：CPU Intel i5-8400 / AMD Ryzen 5 2600、内存 16GB RAM、显卡 GTX 1060 6GB / RX 580、存储空间 50GB SSD。高配（1440p 60fps）：CPU Intel i7-10700 / AMD Ryzen 7 3700X、内存 32GB RAM、显卡 RTX 3070 / RX 6800、存储空间 50GB NVMe SSD。注意：HDD 加载时间比 SSD 慢 3-5 倍，强烈推荐 SSD。",
        ),
        section(
          "gpu-driver-optimization",
          "显卡驱动优化",
          "发布前务必更新显卡驱动到最新版本。NVIDIA 用户应启用 GeForce Experience 的自动优化功能；AMD 用户通过 Adrenalin 软件更新。对于支持的 RTX 40/50 系列显卡，DLSS 4.5/5 可显著提升帧率——建议在游戏内设置为'质量'模式以获得最佳画面/性能平衡。光线追踪在发布时可能处于beta状态，低配机器建议关闭。",
        ),
        section(
          "memory-storage-checklist",
          "内存与存储检查",
          "内存方面：8GB 勉强可运行但会有卡顿，16GB 是舒适游玩的起点，32GB 适合多任务和直播。关闭不必要的后台程序可释放 1-3GB 内存。存储方面：游戏需要 50GB 可用空间，安装在 SSD 上可将加载时间从 30 秒缩短到 6-8 秒。如果系统盘空间不足，可将游戏安装到第二块 SSD，但避免使用机械硬盘。",
        ),
        section(
          "network-requirements",
          "网络需求",
          "AION 2 是常驻在线游戏，稳定的网络连接至关重要。推荐有线连接（延迟 < 100ms），Wi-Fi 用户建议使用 5GHz 频段。由于全球服务器分布在多个地区，选择物理距离最近的服务器可获得最佳体验。韩国/台湾玩家延迟通常在 10-30ms，欧美玩家 50-150ms。",
        ),
        section(
          "pre-launch-checklist",
          "发布前自检清单",
          "1. 确认系统满足推荐配置（不只是最低配置）；2. 更新显卡驱动到最新版本；3. 确认 SSD 有 50GB 可用空间；4. 关闭不必要的后台程序（浏览器标签页、直播软件等）；5. 测试网络连接稳定性；6. 预下载游戏客户端（发布前一周开放）；7. 确认 NCSoft 账号已注册并关联创始人包；8. 设置好游戏内图形预设——建议从'中'预设开始微调。",
        ),
      ],
    }),
    en: articleCopy(guideLabels, "en", 7, {
      eyebrow: "CONFIG GUIDE",
      title: "AION 2 System Requirements and PC Optimization Complete Guide: Ensuring Smooth Launch Day on October 5",
      description:
        "Complete system requirements comparison (minimum/recommended/high-end), GPU driver optimization, DLSS settings recommendations, memory and storage checklist, pre-launch self-check process",
      intro:
        "AION 2 launches globally on October 5, 2026. This article helps you confirm whether your PC meets the requirements and provides detailed optimization tips to ensure the best gaming experience on launch day.",
      keywords: ["AION 2 system requirements", "AION 2 PC specs", "AION 2 PC optimization", "AION 2 DLSS", "AION 2 minimum specs"],
      sourceNote: "Based on NCSoft's official system requirements and Steam store page information (August 25, 2026).",
      sections: [
        section(
          "minimum-vs-recommended",
          "Minimum vs Recommended vs High-End Specs",
          "Minimum: CPU Intel i5-6600 / AMD Ryzen 5 1600, RAM 8GB, GPU GTX 960 4GB / RX 560, storage 50GB HDD. Recommended: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16GB, GPU GTX 1060 6GB / RX 580, storage 50GB SSD. High-end (1440p 60fps): CPU Intel i7-10700 / AMD Ryzen 7 3700X, RAM 32GB, GPU RTX 3070 / RX 6800, storage 50GB NVMe SSD. Note: HDD load times are 3-5x slower than SSD — SSD strongly recommended.",
        ),
        section(
          "gpu-driver-optimization",
          "GPU Driver Optimization",
          "Update your GPU drivers to the latest version before launch. NVIDIA users should enable GeForce Experience auto-optimization; AMD users update via Adrenalin software. For supported RTX 40/50 series GPUs, DLSS 4.5/5 significantly boosts frame rates — set to 'Quality' mode in-game for the best visual/performance balance. Ray tracing may be in beta at launch; lower-spec machines should disable it.",
        ),
        section(
          "memory-storage-checklist",
          "Memory and Storage Check",
          "Memory: 8GB runs but stutters; 16GB is the comfortable starting point; 32GB suits multitasking and streaming. Close unnecessary background apps to free 1-3GB. Storage: the game needs 50GB free space; installing on SSD cuts load times from ~30s to 6-8s. If your system drive is full, install to a secondary SSD — avoid mechanical hard drives.",
        ),
        section(
          "network-requirements",
          "Network Requirements",
          "AION 2 is an always-online game; a stable network connection is essential. Wired connections recommended (latency < 100ms); Wi-Fi users should use the 5GHz band. With global servers across multiple regions, choosing the physically closest server provides the best experience. Korea/Taiwan players typically see 10-30ms latency, NA/EU players 50-150ms.",
        ),
        section(
          "pre-launch-checklist",
          "Pre-Launch Self-Check Checklist",
          "1. Confirm your system meets recommended specs (not just minimum); 2. Update GPU drivers to latest; 3. Confirm SSD has 50GB free space; 4. Close unnecessary background apps (browser tabs, streaming software, etc.); 5. Test network connection stability; 6. Pre-download the game client (opens one week before launch); 7. Confirm NCSoft account is registered and linked to your Founder's Pack; 8. Set in-game graphics presets — start with 'Medium' and adjust from there.",
        ),
      ],
    }),
    fr: articleCopy(guideLabels, "fr", 7, {
      eyebrow: "GUIDE CONFIG",
      title: "Guide complet de configuration et optimisation PC d'AION 2 : Assurer un lancement fluide le 5 octobre",
      description:
        "Comparaison complète des configurations (minimale/recommandée/haute), optimisation des pilotes GPU, recommandations DLSS, liste de vérification mémoire et stockage",
      intro:
        "AION 2 sort mondialement le 5 octobre 2026. Cet article vous aide à confirmer si votre PC répond aux exigences et fournit des conseils d'optimisation détaillés.",
      keywords: ["Configuration AION 2", "AION 2 specs PC", "Optimisation PC AION 2", "AION 2 DLSS", "AION 2 config minimale"],
      sourceNote: "Basé sur les configurations officielles de NCSoft et la page Steam (25 août 2026).",
      sections: [
        section("minimum-vs-recommended", "Minimum vs Recommandé vs Haut de gamme", "Minimum : CPU Intel i5-6600 / AMD Ryzen 5 1600, RAM 8 Go, GPU GTX 960 4 Go / RX 560, stockage 50 Go HDD. Recommandé : CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 Go, GPU GTX 1060 6 Go / RX 580, stockage 50 Go SSD."),
        section("gpu-driver-optimization", "Optimisation des pilotes GPU", "Mettez à jour vos pilotes GPU avant le lancement. Pour les RTX 40/50, DLSS 4.5/5 améliore considérablement les FPS — réglez sur mode 'Qualité'."),
        section("memory-storage-checklist", "Vérification mémoire et stockage", "Mémoire : 8 Go fonctionne mais saccade ; 16 Go est le point de départ confortable. Stockage : le jeu nécessite 50 Go ; installer sur SSD réduit les temps de chargement de ~30s à 6-8s."),
        section("network-requirements", "Exigences réseau", "AION 2 est toujours en ligne ; une connexion stable est essentielle. Connexion filaire recommandée (latence < 100ms) ; Wi-Fi : utiliser la bande 5GHz."),
        section("pre-launch-checklist", "Liste de vérification pré-lancement", "1. Confirmer que le système atteint la config recommandée ; 2. Mettre à jour les pilotes GPU ; 3. Confirmer 50 Go libres sur SSD ; 4. Fermer les apps en arrière-plan ; 5. Tester la stabilité réseau ; 6. Pré-télécharger le client ; 7. Confirmer le compte NCSoft ; 8. Régler les préréglages graphiques sur 'Moyen'."),
      ],
    }),
    de: articleCopy(guideLabels, "de", 7, {
      eyebrow: "CONFIG-LEITFADEN",
      title: "AION 2 Systemanforderungen und PC-Optimierung Kompletter Leitfaden: Flüssiger Start am 5. Oktober",
      description:
        "Vollständiger Systemvergleich (Minimum/Empfohlen/High-End), GPU-Treiber-Optimierung, DLSS-Einstellungen, Speicher-Checkliste",
      intro:
        "AION 2 startet am 5. Oktober 2026 weltweit. Dieser Artikel hilft Ihnen zu prüfen, ob Ihr PC die Anforderungen erfüllt.",
      keywords: ["AION 2 Systemanforderungen", "AION 2 PC-Specs", "AION 2 PC-Optimierung", "AION 2 DLSS", "AION 2 Mindestanforderungen"],
      sourceNote: "Basierend auf NCSofts offiziellen Systemanforderungen und Steam-Shop-Informationen (25. August 2026).",
      sections: [
        section("minimum-vs-recommended", "Minimum vs Empfohlen vs High-End", "Minimum: CPU Intel i5-6600 / AMD Ryzen 5 1600, RAM 8 GB, GPU GTX 960 4 GB / RX 560, Speicher 50 GB HDD. Empfohlen: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 GB, GPU GTX 1060 6 GB / RX 580, Speicher 50 GB SSD."),
        section("gpu-driver-optimization", "GPU-Treiber-Optimierung", "Aktualisieren Sie Ihre GPU-Treiber vor dem Start. Für RTX 40/50 verbessert DLSS 4.5/5 die FPS erheblich — auf 'Qualität' einstellen."),
        section("memory-storage-checklist", "Speicher-Check", "RAM: 8 GB läuft aber ruckelt; 16 GB ist komfortabel. Speicher: 50 GB benötigt; auf SSD Installation reduziert Ladezeiten von ~30s auf 6-8s."),
        section("network-requirements", "Netzwerkanforderungen", "AION 2 ist immer online; stabile Verbindung wichtig. Kabel empfohlen (Latenz < 100ms); WLAN: 5GHz-Band nutzen."),
        section("pre-launch-checklist", "Pre-Launch-Checkliste", "1. System erfüllt empfohlene Specs; 2. GPU-Treiber aktuell; 3. 50 GB frei auf SSD; 4. Hintergrund-Apps schließen; 5. Netzwerk testen; 6. Vorab-Download; 7. NCSoft-Konto bestätigen; 8. Grafik auf 'Mittel' starten."),
      ],
    }),
    es: articleCopy(guideLabels, "es", 7, {
      eyebrow: "GUÍA CONFIG",
      title: "Guía completa de requisitos y optimización de PC de AION 2: Lanzamiento fluido el 5 de octubre",
      description:
        "Comparación completa de configuraciones (mínimo/recomendado/gama alta), optimización de drivers GPU, recomendaciones DLSS, lista de verificación",
      intro:
        "AION 2 se lanza globalmente el 5 de octubre de 2026. Este artículo te ayuda a confirmar si tu PC cumple los requisitos.",
      keywords: ["Requisitos AION 2", "AION 2 specs PC", "Optimización PC AION 2", "AION 2 DLSS", "AION 2 config mínima"],
      sourceNote: "Basado en requisitos oficiales de NCSoft e información de Steam (25 de agosto de 2026).",
      sections: [
        section("minimum-vs-recommended", "Mínimo vs Recomendado vs Gama alta", "Mínimo: CPU Intel i5-6600 / AMD Ryzen 5 1600, RAM 8 GB, GPU GTX 960 4 GB / RX 560, almacenamiento 50 GB HDD. Recomendado: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 GB, GPU GTX 1060 6 GB / RX 580, almacenamiento 50 GB SSD."),
        section("gpu-driver-optimization", "Optimización de drivers GPU", "Actualiza tus drivers GPU antes del lanzamiento. Para RTX 40/50, DLSS 4.5/5 mejora significativamente los FPS — configurar en modo 'Calidad'."),
        section("memory-storage-checklist", "Verificación de memoria y almacenamiento", "Memoria: 8 GB funciona pero con tirones; 16 GB es cómodo. Almacenamiento: 50 GB necesarios; instalar en SSD reduce tiempos de carga de ~30s a 6-8s."),
        section("network-requirements", "Requisitos de red", "AION 2 siempre en línea; conexión estable esencial. Cable recomendado (latencia < 100ms); Wi-Fi: usar banda 5GHz."),
        section("pre-launch-checklist", "Lista de verificación pre-lanzamiento", "1. Sistema cumple specs recomendadas; 2. Drivers GPU actualizados; 3. 50 GB libres en SSD; 4. Cerrar apps en segundo plano; 5. Probar red; 6. Predescargar cliente; 7. Confirmar cuenta NCSoft; 8. Gráficos en 'Medio'."),
      ],
    }),
    ja: articleCopy(guideLabels, "ja", 7, {
      eyebrow: "設定ガイド",
      title: "AION 2 システム要件・PC最適化完全ガイド：10月5日のスムーズなローンチに向けて",
      description:
        "完全なシステム要件比較（最低/推奨/ハイエンド）、GPUドライバー最適化、DLSS設定推奨、メモリ・ストレージチェックリスト",
      intro:
        "AION 2は2026年10月5日にグローバルリリースされます。この記事はPCが要件を満たしているか確認し、最適なゲーム体験のための最適化アドバイスを提供します。",
      keywords: ["AION 2 システム要件", "AION 2 PCスペック", "AION 2 PC最適化", "AION 2 DLSS", "AION 2 最低要件"],
      sourceNote: "NCSoft公式システム要件とSteamストアページ情報（2026年8月25日）に基づく。",
      sections: [
        section("minimum-vs-recommended", "最低 vs 推奨 vs ハイエンド", "最低：CPU Intel i5-6600 / AMD Ryzen 5 1600、RAM 8GB、GPU GTX 960 4GB / RX 560、ストレージ 50GB HDD。推奨：CPU Intel i5-8400 / AMD Ryzen 5 2600、RAM 16GB、GPU GTX 1060 6GB / RX 580、ストレージ 50GB SSD。"),
        section("gpu-driver-optimization", "GPUドライバー最適化", "ローンチ前にGPUドライバーを最新版に更新。RTX 40/50シリーズではDLSS 4.5/5がFPSを大幅に向上 — 「品質」モードに設定。"),
        section("memory-storage-checklist", "メモリ・ストレージチェック", "メモリ：8GBは動作するがカクつく；16GBが快適ライン。ストレージ：50GB必要；SSDにインストールでロード時間~30秒→6-8秒に短縮。"),
        section("network-requirements", "ネットワーク要件", "AION 2は常時オンライン；安定した接続が必須。有線推奨（遅延 < 100ms）；Wi-Fiは5GHz帯を使用。"),
        section("pre-launch-checklist", "ローンチ前セルフチェック", "1. システムが推奨要件を満たす；2. GPUドライバー最新；3. SSDに50GB空き；4. バックグラウンドアプリを閉じる；5. ネットワーク安定性テスト；6. クライアント事前DL；7. NCSoftアカウント確認；8. グラフィックを「中」から開始。"),
      ],
    }),
    "pt-br": articleCopy(guideLabels, "pt-br", 7, {
      eyebrow: "GUIA CONFIG",
      title: "Guia completo de requisitos e otimização de PC do AION 2: Lançamento suave em 5 de outubro",
      description:
        "Comparação completa de configurações (mínimo/recomendado/high-end), otimização de drivers GPU, recomendações DLSS, checklist de memória",
      intro:
        "O AION 2 será lançado globalmente em 5 de outubro de 2026. Este artigo ajuda a confirmar se seu PC atende aos requisitos.",
      keywords: ["Requisitos AION 2", "AION 2 specs PC", "Otimização PC AION 2", "AION 2 DLSS", "AION 2 config mínima"],
      sourceNote: "Baseado nos requisitos oficiais da NCSoft e informações da Steam (25 de agosto de 2026).",
      sections: [
        section("minimum-vs-recommended", "Mínimo vs Recomendado vs High-end", "Mínimo: CPU Intel i5-6600 / AMD Ryzen 5 1600, RAM 8 GB, GPU GTX 960 4 GB / RX 560, armazenamento 50 GB HDD. Recomendado: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 GB, GPU GTX 1060 6 GB / RX 580, armazenamento 50 GB SSD."),
        section("gpu-driver-optimization", "Otimização de drivers GPU", "Atualize os drivers GPU antes do lançamento. Para RTX 40/50, DLSS 4.5/5 melhora significativamente os FPS — configurar em modo 'Qualidade'."),
        section("memory-storage-checklist", "Verificação de memória e armazenamento", "Memória: 8 GB funciona mas com travamentos; 16 GB é confortável. Armazenamento: 50 GB necessários; instalar em SSD reduz tempos de carga de ~30s para 6-8s."),
        section("network-requirements", "Requisitos de rede", "AION 2 sempre online; conexão estável essencial. Cabo recomendado (latência < 100ms); Wi-Fi: usar banda 5GHz."),
        section("pre-launch-checklist", "Checklist pré-lançamento", "1. Sistema atende specs recomendadas; 2. Drivers GPU atualizados; 3. 50 GB livres no SSD; 4. Fechar apps em segundo plano; 5. Testar rede; 6. Pré-download do cliente; 7. Confirmar conta NCSoft; 8. Gráficos em 'Médio'."),
      ],
    }),
    ru: articleCopy(guideLabels, "ru", 7, {
      eyebrow: "РУКОВОДСТВО ПО КОНФИГУРАЦИИ",
      title: "Полное руководство по системным требованиям и оптимизации ПК AION 2: Плавный запуск 5 октября",
      description:
        "Полное сравнение конфигураций (минимум/рекомендуемые/высокий класс), оптимизация драйверов GPU, рекомендации DLSS, чеклист памяти",
      intro:
        "AION 2 выходит глобально 5 октября 2026 года. Эта статья поможет проверить, соответствует ли ваш ПК требованиям.",
      keywords: ["Системные требования AION 2", "AION 2 спецификации ПК", "Оптимизация ПК AION 2", "AION 2 DLSS", "AION 2 минимальные требования"],
      sourceNote: "На основе официальных системных требований NCSoft и информации магазина Steam (25 августа 2026 г.).",
      sections: [
        section("minimum-vs-recommended", "Минимум vs Рекомендуемые vs Высокий класс", "Минимум: CPU Intel i5-6600 / AMD Ryzen 5 1600, RAM 8 ГБ, GPU GTX 960 4 ГБ / RX 560, хранилище 50 ГБ HDD. Рекомендуемые: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16 ГБ, GPU GTX 1060 6 ГБ / RX 580, хранилище 50 ГБ SSD."),
        section("gpu-driver-optimization", "Оптимизация драйверов GPU", "Обновите драйверы GPU перед запуском. Для RTX 40/50 DLSS 4.5/5 значительно повышает FPS — установите режим «Качество»."),
        section("memory-storage-checklist", "Проверка памяти и хранилища", "Память: 8 ГБ работает, но с заиканием; 16 ГБ — комфортный уровень. Хранилище: нужно 50 ГБ; установка на SSD сокращает время загрузки с ~30с до 6-8с."),
        section("network-requirements", "Требования к сети", "AION 2 всегда онлайн; стабильное подключение обязательно. Рекомендуется проводное (задержка < 100мс); Wi-Fi: используйте диапазон 5ГГц."),
        section("pre-launch-checklist", "Предстартовый чеклист", "1. Система соответствует рекомендуемым требованиям; 2. Драйверы GPU обновлены; 3. 50 ГБ свободно на SSD; 4. Закрыть фоновые приложения; 5. Проверить стабильность сети; 6. Предзагрузка клиента; 7. Подтвердить аккаунт NCSoft; 8. Графика на «Средние»."),
      ],
    }),
    ko: articleCopy(guideLabels, "ko", 7, {
      eyebrow: "설정 가이드",
      title: "AION 2 시스템 요구사항 및 PC 최적화 완전 가이드: 10월 5일 원활한 출시를 위해",
      description:
        "완전한 시스템 요구사항 비교(최소/권장/하이엔드), GPU 드라이버 최적화, DLSS 설정 권장, 메모리 및 스토리지 체크리스트",
      intro:
        "AION 2는 2026년 10월 5일 글로벌 출시됩니다. 이 기사는 PC가 요구사항을 충족하는지 확인하고 최적의 게임 경험을 위한 최적화 팁을 제공합니다.",
      keywords: ["AION 2 시스템 요구사항", "AION 2 PC 사양", "AION 2 PC 최적화", "AION 2 DLSS", "AION 2 최소 요구사항"],
      sourceNote: "NCSoft 공식 시스템 요구사항 및 Steam 스토어 페이지 정보(2026-08-25) 기반.",
      sections: [
        section("minimum-vs-recommended", "최소 vs 권장 vs 하이엔드", "최소: CPU Intel i5-6600 / AMD Ryzen 5 1600, RAM 8GB, GPU GTX 960 4GB / RX 560, 저장 공간 50GB HDD. 권장: CPU Intel i5-8400 / AMD Ryzen 5 2600, RAM 16GB, GPU GTX 1060 6GB / RX 580, 저장 공간 50GB SSD."),
        section("gpu-driver-optimization", "GPU 드라이버 최적화", "출시 전 GPU 드라이버를 최신 버전으로 업데이트하세요. RTX 40/50 시리즈의 경우 DLSS 4.5/5가 FPS를 크게 향상 — '품질' 모드로 설정."),
        section("memory-storage-checklist", "메모리 및 스토리지 확인", "메모리: 8GB는 작동하지만 끊김; 16GB가 комфорт 라인. 스토리지: 50GB 필요; SSD에 설치 시 로드 시간 ~30초→6-8초로 단축."),
        section("network-requirements", "네트워크 요구사항", "AION 2는 항상 온라인; 안정적인 연결이 필수. 유선 권장(지연 < 100ms); Wi-Fi는 5GHz 대역 사용."),
        section("pre-launch-checklist", "출시 전 셀프 체크", "1. 시스템이 권장 사양 충족; 2. GPU 드라이버 최신; 3. SSD 50GB 여유; 4. 백그라운드 앱 종료; 5. 네트워크 안정성 테스트; 6. 클라이언트 사전 다운로드; 7. NCSoft 계정 확인; 8. 그래픽 '중간'부터 시작."),
      ],
    }),
    "zh-hant": articleCopy(guideLabels, "zh-hant", 7, {
      eyebrow: "配置指南",
      title: "AION 2 系統需求與PC優化完整指南：確保10月5日發布日流暢運行",
      description:
        "完整系統需求對比（最低/推薦/高配）、顯卡驅動優化、DLSS設置建議、內存與存儲檢查清單、發布前自檢流程",
      intro:
        "AION 2 將於2026年10月5日全球發布。本文將幫助你確認電腦是否滿足運行需求，並提供詳細的優化建議，確保發布當天獲得最佳遊戲體驗。",
      keywords: ["AION 2 系統需求", "AION 2 配置要求", "AION 2 PC優化", "AION 2 DLSS", "AION 2 最低配置"],
      sourceNote: "基於 NCSoft 官方系統需求和 Steam 商店頁面資訊（2026-08-25）整理。",
      sections: [
        section("minimum-vs-recommended", "最低配置 vs 推薦配置 vs 高配", "最低配置：CPU Intel i5-6600 / AMD Ryzen 5 1600、內存 8GB RAM、顯卡 GTX 960 4GB / RX 560、存儲空間 50GB HDD。推薦配置：CPU Intel i5-8400 / AMD Ryzen 5 2600、內存 16GB RAM、顯卡 GTX 1060 6GB / RX 580、存儲空間 50GB SSD。高配（1440p 60fps）：CPU Intel i7-10700 / AMD Ryzen 7 3700X、內存 32GB RAM、顯卡 RTX 3070 / RX 6800、存儲空間 50GB NVMe SSD。注意：HDD 加載時間比 SSD 慢 3-5 倍，強烈推薦 SSD。"),
        section("gpu-driver-optimization", "顯卡驅動優化", "發布前務必更新顯卡驅動到最新版本。NVIDIA 用戶應啟用 GeForce Experience 的自動優化功能；AMD 用戶通過 Adrenalin 軟件更新。對於支持的 RTX 40/50 系列顯卡，DLSS 4.5/5 可顯著提升幀率——建議在遊戲內設置為'品質'模式以獲得最佳畫面/性能平衡。光線追蹤在發布時可能處於beta狀態，低配機器建議關閉。"),
        section("memory-storage-checklist", "內存與存儲檢查", "內存方面：8GB 勉強可運行但會有卡頓，16GB 是舒適遊玩的起點，32GB 適合多任務和直播。關閉不必要的後台程序可釋放 1-3GB 內存。存儲方面：遊戲需要 50GB 可用空間，安裝在 SSD 上可將加載時間從 30 秒縮短到 6-8 秒。如果系統盤空間不足，可將遊戲安裝到第二塊 SSD，但避免使用機械硬盤。"),
        section("network-requirements", "網絡需求", "AION 2 是常駐在線遊戲，穩定的網絡連接至關重要。推薦有線連接（延遲 < 100ms），Wi-Fi 用戶建議使用 5GHz 頻段。由於全球服務器分布在多個地區，選擇物理距離最近的服務器可獲得最佳體驗。韓國/台灣玩家延遲通常在 10-30ms，歐美玩家 50-150ms。"),
        section("pre-launch-checklist", "發布前自檢清單", "1. 確認系統滿足推薦配置（不只是最低配置）；2. 更新顯卡驅動到最新版本；3. 確認 SSD 有 50GB 可用空間；4. 關閉不必要的後台程序（瀏覽器標籤頁、直播軟件等）；5. 測試網絡連接穩定性；6. 預下載遊戲客戶端（發布前一週開放）；7. 確認 NCSoft 帳號已註冊並關聯創始人包；8. 設置好遊戲內圖形預設——建議從'中'預設開始微調。"),
      ],
    }),
  },
};
