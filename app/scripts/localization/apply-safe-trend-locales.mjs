import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(
  root,
  "tmp",
  "editorial-content-source-trend.json",
);
const generatedPath = path.join(
  root,
  "app",
  "editorial-content-locales.generated.json",
);
const shardDir = path.join(root, "tmp", "editorial-locales");
const locales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];

const chrome = {
  "zh-hans": {
    backLabel: "返回内容中心",
    contentsLabel: "本页内容",
    publishedLabel: "发布",
    updatedLabel: "最后核对",
    relatedLabel: "相关内容",
    readingTime: (minutes) => `约 ${minutes} 分钟`,
    sourceNote:
      "已于 2026 年 7 月 26 日对照下方来源核对。平台、平衡与商业模式仍可能调整，请以最新官方公告为准。",
    translationNote:
      "为避免在官方术语确认前引入误译，下方详细参考内容暂保留英文；标题、摘要与导航已完成本土化。",
    sourceLabel: (isSteam) =>
      isSteam ? "AION 2 Steam 官方商店页面" : "NC 官方 AION 2 资料",
    heroAlt: (title) => `AION 2 官方图片：${title}`,
    heroCaption:
      "图片来自 NC 官方资料；页面结论仍以列出的官方来源、适用地区与核对日期为准。",
  },
  fr: {
    backLabel: "Retour au centre de contenu",
    contentsLabel: "Sur cette page",
    publishedLabel: "Publié",
    updatedLabel: "Dernière vérification",
    relatedLabel: "Contenus associés",
    readingTime: (minutes) => `${minutes} min de lecture`,
    sourceNote:
      "Vérifié le 26 juillet 2026 à partir des sources ci-dessous. Les plateformes, l’équilibrage et le modèle économique peuvent évoluer ; consultez toujours l’annonce officielle la plus récente.",
    translationNote:
      "Pour éviter toute erreur de terminologie avant validation de la localisation officielle, les sections de référence détaillées restent provisoirement en anglais ; le titre, le résumé et la navigation sont localisés.",
    sourceLabel: (isSteam) =>
      isSteam
        ? "Page officielle d’AION 2 sur Steam"
        : "Source officielle AION 2 de NC",
    heroAlt: (title) => `Visuel officiel AION 2 : ${title}`,
    heroCaption:
      "Visuel issu d’une source officielle de NC ; la portée, la région et la date de vérification indiquées sur la page restent déterminantes.",
  },
  de: {
    backLabel: "Zurück zum Inhaltsbereich",
    contentsLabel: "Auf dieser Seite",
    publishedLabel: "Veröffentlicht",
    updatedLabel: "Zuletzt geprüft",
    relatedLabel: "Verwandte Inhalte",
    readingTime: (minutes) => `${minutes} Min. Lesezeit`,
    sourceNote:
      "Am 26. Juli 2026 anhand der unten aufgeführten Quellen geprüft. Plattformen, Balance und Geschäftsmodell können sich ändern; maßgeblich ist die neueste offizielle Mitteilung.",
    translationNote:
      "Um falsche Spielbegriffe vor Bestätigung der offiziellen Lokalisierung zu vermeiden, bleiben die ausführlichen Referenzabschnitte vorläufig auf Englisch; Titel, Zusammenfassung und Navigation sind lokalisiert.",
    sourceLabel: (isSteam) =>
      isSteam
        ? "Offizielle AION-2-Seite auf Steam"
        : "Offizielle AION-2-Quelle von NC",
    heroAlt: (title) => `Offizielles AION-2-Bild: ${title}`,
    heroCaption:
      "Bild aus einer offiziellen NC-Quelle; entscheidend bleiben der angegebene Geltungsbereich, die Region und das Prüfdatum.",
  },
  es: {
    backLabel: "Volver al centro de contenidos",
    contentsLabel: "En esta página",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificación",
    relatedLabel: "Contenido relacionado",
    readingTime: (minutes) => `${minutes} min de lectura`,
    sourceNote:
      "Verificado el 26 de julio de 2026 con las fuentes indicadas abajo. Las plataformas, el equilibrio y el modelo comercial pueden cambiar; consulta siempre el anuncio oficial más reciente.",
    translationNote:
      "Para evitar errores de terminología antes de confirmar la localización oficial, las secciones de referencia detalladas se mantienen provisionalmente en inglés; el título, el resumen y la navegación sí están localizados.",
    sourceLabel: (isSteam) =>
      isSteam
        ? "Página oficial de AION 2 en Steam"
        : "Fuente oficial de AION 2 de NC",
    heroAlt: (title) => `Imagen oficial de AION 2: ${title}`,
    heroCaption:
      "Imagen procedente de una fuente oficial de NC; prevalecen el alcance, la región y la fecha de verificación indicados en la página.",
  },
  ja: {
    backLabel: "コンテンツ一覧に戻る",
    contentsLabel: "このページの内容",
    publishedLabel: "公開日",
    updatedLabel: "最終確認",
    relatedLabel: "関連コンテンツ",
    readingTime: (minutes) => `読了目安 ${minutes}分`,
    sourceNote:
      "2026年7月26日に下記の情報源で確認しました。対応プラットフォーム、バランス、課金仕様は変更される可能性があるため、最新の公式告知を確認してください。",
    translationNote:
      "公式ローカライズの用語が確認できるまで誤訳を避けるため、詳細な参考本文は一時的に英語で掲載しています。タイトル、要約、ナビゲーションは日本語化済みです。",
    sourceLabel: (isSteam) =>
      isSteam ? "AION 2 Steam公式ストアページ" : "NC公式AION 2資料",
    heroAlt: (title) => `AION 2公式画像：${title}`,
    heroCaption:
      "NC公式資料の画像です。内容の適用範囲、地域、確認日はページ内の表記を優先してください。",
  },
  "pt-br": {
    backLabel: "Voltar à central de conteúdo",
    contentsLabel: "Nesta página",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificação",
    relatedLabel: "Conteúdo relacionado",
    readingTime: (minutes) => `${minutes} min de leitura`,
    sourceNote:
      "Verificado em 26 de julho de 2026 com as fontes listadas abaixo. Plataformas, balanceamento e modelo comercial podem mudar; consulte sempre o anúncio oficial mais recente.",
    translationNote:
      "Para evitar erros de terminologia antes da confirmação da localização oficial, as seções de referência detalhadas permanecem temporariamente em inglês; título, resumo e navegação estão localizados.",
    sourceLabel: (isSteam) =>
      isSteam
        ? "Página oficial de AION 2 na Steam"
        : "Fonte oficial de AION 2 da NC",
    heroAlt: (title) => `Imagem oficial de AION 2: ${title}`,
    heroCaption:
      "Imagem de uma fonte oficial da NC; prevalecem o escopo, a região e a data de verificação informados na página.",
  },
  ru: {
    backLabel: "Вернуться к материалам",
    contentsLabel: "Содержание страницы",
    publishedLabel: "Опубликовано",
    updatedLabel: "Последняя проверка",
    relatedLabel: "Связанные материалы",
    readingTime: (minutes) => `Время чтения: ${minutes} мин.`,
    sourceNote:
      "Проверено 26 июля 2026 года по источникам ниже. Платформы, баланс и бизнес-модель могут измениться; ориентируйтесь на последнее официальное объявление.",
    translationNote:
      "Чтобы не искажать игровые термины до подтверждения официальной локализации, подробные справочные разделы временно оставлены на английском; заголовок, краткое описание и навигация локализованы.",
    sourceLabel: (isSteam) =>
      isSteam
        ? "Официальная страница AION 2 в Steam"
        : "Официальный материал NC по AION 2",
    heroAlt: (title) => `Официальное изображение AION 2: ${title}`,
    heroCaption:
      "Изображение из официального материала NC; учитывайте указанные на странице регион, область применения и дату проверки.",
  },
};

const overrides = {
  "zh-hans": {
    "database/aion-2-wiki": {
      eyebrow: "资料中心",
      title: "AION 2 Wiki：职业、物品、地图、制作与全球服攻略",
      description:
        "通过 AION 2 Wiki 查询职业、物品数据库、互动地图、制作材料计算器、全球服攻略、来源日期与地区适用范围。",
      intro:
        "AION 2 Wiki 是 KINA 按来源整理的内容索引，并非 NC 官方 Wiki。它连接职业、物品、地图、制作、攻略与全球服页面，帮助你先确认地区、版本、更新时间和第一手来源。",
      keywords: [
        "AION 2 Wiki",
        "AION2 Wiki",
        "AION 2 职业",
        "AION 2 物品数据库",
        "AION 2 互动地图",
      ],
      sections: {
        "what-this-hub-is": "AION 2 Wiki 可以查到什么？",
        "official-scope": "哪些是官方事实，哪些是 KINA 编辑内容？",
        "use-the-hub": "如何使用 AION 2 Wiki？",
        "what-is-not-included": "AION 2 Wiki 不会编造哪些内容？",
        "wiki-faq": "AION 2 Wiki 常见问题",
      },
    },
    "guides/aion-2-gameplay": {
      eyebrow: "全球服玩法概览",
      title: "AION 2 玩法：飞行战斗、职业、PvE、PvP 与探索",
      description:
        "AION 2 玩法概览涵盖官方公布的三维飞行、手动战斗、八大职业、单人及 5/10 人 PvE、阵营 PvP、探索与角色定制。",
      intro:
        "AION 2 将飞行、立体空间和手动战斗融入 MMORPG 探索与阵营冲突。Steam 全球服页面确认 PC 版包含八大职业、超过 200 个地下城，以及单人和 5/10 人玩法。",
      keywords: [
        "AION 2 玩法",
        "AION2 Gameplay",
        "AION 2 飞行战斗",
        "AION 2 PvE",
        "AION 2 PvP",
      ],
      sections: {
        "quick-answer": "AION 2 是什么类型的游戏？",
        "world-flight": "自由飞行如何改变探索与战斗？",
        "combat-classes": "八大职业与手动战斗有何差异？",
        "pve-pvp": "目前确认了哪些 PvE、PvP 与支线玩法？",
        "global-boundary": "哪些全球服玩法仍未确认？",
        faq: "AION 2 玩法常见问题",
      },
    },
    "guides/aion-2-download": {
      eyebrow: "全球服安装准备",
      title: "AION 2 下载：Steam/PURPLE 官方渠道、预载与安装指南",
      description:
        "AION 2 下载指南说明 Steam 与 PURPLE 官方渠道、100 GB 存储要求、安全安装步骤，以及尚未公布的全球服预载状态。",
      intro:
        "AION 2 全球服已确认通过 Steam 与 PURPLE 提供，但截至 2026 年 7 月 26 日，NC 尚未公布全球服预载日期、具体开放时间或压缩下载大小。",
      keywords: [
        "AION 2 下载",
        "AION2 Download",
        "AION 2 Steam",
        "AION 2 PURPLE",
        "AION 2 预载",
      ],
      sections: {
        "current-status": "现在可以下载 AION 2 全球服吗？",
        "official-channels": "Steam 与 PURPLE 官方渠道有何不同？",
        "safe-steps": "如何安全完成 AION 2 下载？",
        "regional-difference": "为什么不能照搬韩服或台服安装说明？",
        unknowns: "全球服下载还有哪些信息未公布？",
        faq: "AION 2 下载常见问题",
      },
    },
    "guides/aion-2-platforms": {
      eyebrow: "全球服平台核对",
      title: "AION 2 平台：PC、PS5、Xbox、手机与手柄支持",
      description:
        "AION 2 全球服已确认支持 Steam/PURPLE PC；PS5、Xbox、全球服手机端、Steam Deck 兼容性与手柄支持仍未确认。",
      intro:
        "NC 将 AION 2 全球服描述为通过 Steam 与 PURPLE 发行的 PC 版本。PS5、Xbox、Android、iPhone 和全球服原生手机端均尚未公布。",
      keywords: [
        "AION 2 平台",
        "AION 2 PC",
        "AION 2 PS5",
        "AION 2 Xbox",
        "AION 2 手柄支持",
      ],
      sections: {
        "global-answer": "AION 2 全球服确认支持哪些平台？",
        "platform-matrix": "PC、主机、手机与 Steam Deck 支持状态",
        "controller-status": "AION 2 已确认支持手柄吗？",
        "mobile-difference": "为什么网上会出现 AION 2 手机版信息？",
        "future-updates": "哪些官方证据会改变平台状态？",
        faq: "AION 2 平台常见问题",
      },
    },
    "guides/aion-2-server-status": {
      eyebrow: "全球服服务器信息",
      title: "AION 2 服务器状态：全球服、维护与开服信息",
      description:
        "AION 2 服务器状态页不编造实时在线情况；这里整理北美、南美、欧洲与日本地区，以及尚未公布的服务器名称、维护和人数信息。",
      intro:
        "目前没有可核验的 AION 2 全球服实时在线状态。NC 已公布北美、南美、欧洲和日本运营地区，但尚无公开的服务器状态 API、完整世界列表、实时人数或准确开放时间。",
      keywords: [
        "AION 2 服务器状态",
        "AION2 Server Status",
        "AION 2 全球服服务器",
        "AION 2 维护",
        "AION 2 开服时间",
      ],
      sections: {
        "status-answer": "AION 2 全球服服务器现在上线了吗？",
        "confirmed-regions": "已确认哪些全球服服务器地区？",
        "what-is-not-live": "为什么不显示虚假的实时服务器状态？",
        "how-to-check": "开服后应如何查询维护状态？",
        "status-model": "未来的实时状态需要哪些数据？",
        faq: "AION 2 服务器状态常见问题",
      },
    },
    "guides/aion-2-tier-list": {
      eyebrow: "分版本职业比较",
      title: "AION 2 Tier List：全球服职业排行方法与更新规则",
      description:
        "AION 2 Tier List 不发布缺乏证据的开服前 S/A 排名；了解 PvE、PvP、团队价值、难度与八大职业的分版本评估方法。",
      intro:
        "目前还没有可靠的 AION 2 全球服 Tier List。官方已确认八大职业，但全球服技能数值、完整平衡版本和可比测试样本仍未公开。",
      keywords: [
        "AION 2 Tier List",
        "AION2 职业排行",
        "AION 2 最强职业",
        "AION 2 职业推荐",
        "AION 2 全球服职业",
      ],
      sections: {
        answer: "现在有可信的 AION 2 Tier List 吗？",
        "why-no-ranking": "为什么韩服或台服排行不能代表全球服？",
        "comparison-method": "AION 2 Tier List 应如何评分？",
        "eight-classes": "八大全球服职业应比较哪些指标？",
        "update-policy": "什么时候会加入全球服职业排行？",
        faq: "AION 2 Tier List 常见问题",
      },
    },
    "classes/gladiator": {
      eyebrow: "职业攻略｜官方事实与编辑评估",
      title: "AION2 剑星 Arcana 与 Build 攻略",
      description:
        "AION2 剑星攻略涵盖官方大剑定位、Arcana 选择方法、PvE、PvP、RvR、操作难度与分版本测试边界。",
      intro:
        "武器与职业定位以 NC 官方资料为依据；玩法、难度与练习建议属于 KINA 编辑评估。本文不编造技能名、倍率、装备 Build 或职业 Tier。",
      keywords: [
        "AION2 剑星",
        "AION2 Gladiator",
        "AION2 剑星 Arcana",
        "AION2 剑星 Build",
        "AION2 剑星攻略",
      ],
      sections: {
        "official-profile": "官方事实：武器与职业定位",
        "editorial-gameplay-loop": "KINA 分析：可练习的战斗循环",
        "gladiator-arcana-selection": "剑星 Arcana 选择：先保证近战接近能力",
        "editorial-scenarios": "KINA 分析：PvE、PvP 与 RvR 场景",
        "editorial-difficulty": "操作难度评估，不等于强度或 Tier",
        "beginner-practice": "新手练习顺序",
        "common-mistakes": "常见错误与修正",
        "version-boundary": "版本与证据边界",
      },
    },
    "classes/assassin": {
      eyebrow: "职业攻略｜官方事实与编辑评估",
      title: "AION2 杀星 Arcana 与 Build 攻略",
      description:
        "AION2 杀星攻略涵盖官方双短剑定位、Arcana 选择、进退节奏、PvE、PvP、RvR 与分版本测试边界。",
      intro:
        "官方资料支持杀星的武器与短时间压制定位，但没有确认唯一最佳循环、PvP Tier 或伤害排行。难度与练习建议均为编辑评估。",
      keywords: [
        "AION2 杀星",
        "AION2 Assassin",
        "AION2 杀星 Arcana",
        "AION2 杀星 Build",
        "AION2 杀星攻略",
      ],
      sections: {
        "official-profile": "官方事实：武器与职业定位",
        "editorial-gameplay-loop": "KINA 分析：可练习的战斗循环",
        "assassin-arcana-selection": "杀星 Arcana 选择：分别验证进场、压制与退场",
        "editorial-scenarios": "KINA 分析：PvE、PvP 与 RvR 场景",
        "editorial-difficulty": "操作难度评估，不等于强度或 Tier",
        "beginner-practice": "新手练习顺序",
        "common-mistakes": "常见错误与修正",
        "version-boundary": "版本与证据边界",
      },
    },
    "classes/ranger": {
      eyebrow: "职业攻略｜官方事实与编辑评估",
      title: "AION2 弓星技能树与 Build 攻略",
      description:
        "AION2 弓星攻略涵盖官方弓箭定位、技能树优先级、站位、PvE、PvP、RvR 与分版本测试边界。",
      intro:
        "弓、远程攻击、站位与时机来自官方资料；练习方法和难度属于编辑评估。本文不编造射程、技能或伤害排行。",
      keywords: [
        "AION2 弓星",
        "AION2 Ranger",
        "AION2 弓星技能树",
        "AION2 弓星 Build",
        "AION2 弓星攻略",
      ],
      sections: {
        "official-profile": "官方事实：武器与职业定位",
        "editorial-gameplay-loop": "KINA 分析：可练习的战斗循环",
        "ranger-skill-tree-priority": "弓星技能树优先级：先保证 Build 可用",
        "editorial-scenarios": "KINA 分析：PvE、PvP 与 RvR 场景",
        "editorial-difficulty": "操作难度评估，不等于强度或 Tier",
        "beginner-practice": "新手练习顺序",
        "common-mistakes": "常见错误与修正",
        "version-boundary": "版本与证据边界",
      },
    },
    "classes/sorcerer": {
      eyebrow: "职业攻略｜官方事实与编辑评估",
      title: "AION2 魔道星 Build 与技能优先级攻略",
      description:
        "AION2 魔道星攻略涵盖官方魔法书定位、安全施法、技能优先级、PvE、PvP、RvR 与可复核测试边界。",
      intro:
        "武器与短时间魔法爆发定位来自官方资料；安全施法窗口、操作难度和练习顺序属于编辑评估。本文不编造技能或倍率。",
      keywords: [
        "AION2 魔道星",
        "AION2 Sorcerer",
        "AION2 魔道星 Build",
        "AION2 魔道星技能",
        "AION2 魔道星攻略",
      ],
      sections: {
        "official-profile": "官方事实：武器与职业定位",
        "editorial-gameplay-loop": "KINA 分析：可练习的战斗循环",
        "sorcerer-versioned-build": "魔道星 Build 规划：每个游戏版本保留一份可核对配置",
        "sorcerer-skill-priority": "魔道星技能优先级：安全施法、可靠功能、场景与输出",
        "editorial-scenarios": "KINA 分析：PvE、PvP 与 RvR 场景",
        "editorial-difficulty": "操作难度评估，不等于强度或 Tier",
        "beginner-practice": "新手练习顺序",
        "common-mistakes": "常见错误与修正",
        "version-boundary": "版本与证据边界",
      },
    },
    "guides/character-presets-style-shop": {
      eyebrow: "角色外观",
      title: "AION2 角色创建：预设、捏脸与 Style Shop",
      description:
        "了解 AION2 角色创建的 200 多项外观调整、内置预设与官方 Style Shop，并核对第三方捏脸数据的兼容性。",
      intro:
        "AION2 角色创建包含细致捏脸、现成外观预设与官方 Style Shop。使用玩家分享的数据前，应先确认版本、地区与导入兼容性。",
      keywords: [
        "AION2 角色创建",
        "AION2 捏脸",
        "AION2 外观预设",
        "AION2 Style Shop",
      ],
      sections: {
        "official-features": "NC 已确认的角色定制功能",
        "safe-use": "导入或重建外观前需要核对什么？",
        "preset-workflow": "安全保存与重建 AION2 捏脸预设",
        "style-shop-boundary": "Style Shop 页面能确认和不能确认的内容",
      },
    },
    "guides/global-monetization-watchlist": {
      eyebrow: "全球服免费游玩与商业模式",
      title: "AION 2 是免费游戏吗？Membership、Kina、Quna 与 Daeva Pass",
      description:
        "AION 2 全球服计划采用免费游玩模式，并提供每月 15 美元 Membership、会员市场与兑换所权限、Kina、Quna 和角色独立 Daeva Pass。",
      intro:
        "AION 2 全球服本体计划免费游玩，无需购买游戏；Steam 标注 Free To Play 与 In-App Purchases。NC 目前计划提供每月 15 美元 Membership，完整权益和汇率仍未公布。",
      keywords: [
        "AION 2 免费游戏",
        "AION 2 氪金",
        "AION 2 Membership",
        "AION 2 Kina",
        "AION 2 Quna",
        "AION 2 Daeva Pass",
      ],
      sections: {
        confirmed: "AION 2 全球服是免费游戏吗？",
        "pay-to-win-assessment": "AION 2 全球服是否 Pay-to-Win？目前能得出什么结论？",
        membership: "每月 15 美元 Membership 计划解锁什么？",
        "currencies-and-pass": "Kina、Quna、兑换所与 Daeva Pass 如何运作？",
        "power-and-unknowns": "商店会出售强度吗？还有哪些信息未知？",
        "shop-evaluation": "全球服商品上线后应如何重新核对？",
      },
    },
  },
  fr: {
    "database/aion-2-wiki": {
      eyebrow: "CENTRE DE DONNÉES",
      title: "Wiki AION 2 : classes, objets, cartes, artisanat et guides Global",
      description:
        "Le Wiki AION 2 réunit les classes, la base d’objets, les cartes interactives, les calculateurs de matériaux, les guides Global, les dates et les régions concernées.",
      intro:
        "Le Wiki AION 2 est l’index éditorial sourcé de KINA, et non un wiki officiel de NC. Il relie classes, objets, cartes, artisanat et guides tout en indiquant région, version, date de mise à jour et source primaire.",
      keywords: [
        "Wiki AION 2",
        "classes AION 2",
        "objets AION 2",
        "carte interactive AION 2",
        "artisanat AION 2",
      ],
      sections: {
        "what-this-hub-is": "Que trouve-t-on dans le Wiki AION 2 ?",
        "official-scope": "Quels faits sont officiels et quels contenus viennent de KINA ?",
        "use-the-hub": "Comment utiliser le Wiki AION 2 ?",
        "what-is-not-included": "Quelles informations le Wiki AION 2 refuse-t-il d’inventer ?",
        "wiki-faq": "FAQ du Wiki AION 2",
      },
    },
    "guides/aion-2-gameplay": {
      eyebrow: "APERÇU DU GAMEPLAY GLOBAL",
      title: "Gameplay AION 2 : combat aérien, classes, PvE, PvP et exploration",
      description:
        "Présentation du gameplay AION 2 : vol en 3D, combat manuel, huit classes, PvE solo et à 5/10 joueurs, PvP de factions, exploration et personnalisation.",
      intro:
        "AION 2 associe vol, espace vertical et combat manuel à l’exploration MMORPG et au conflit de factions. La page Steam Global confirme huit classes, plus de 200 donjons et des formats solo et à 5/10 joueurs.",
      keywords: [
        "gameplay AION 2",
        "combat aérien AION 2",
        "classes AION 2",
        "PvE AION 2",
        "PvP AION 2",
      ],
      sections: {
        "quick-answer": "Quel type de jeu est AION 2 ?",
        "world-flight": "Comment le vol libre transforme-t-il l’exploration et le combat ?",
        "combat-classes": "Comment diffèrent les huit classes et le combat manuel ?",
        "pve-pvp": "Quels contenus PvE, PvP et secondaires sont confirmés ?",
        "global-boundary": "Quels éléments du gameplay Global restent non confirmés ?",
        faq: "FAQ sur le gameplay AION 2",
      },
    },
    "guides/aion-2-download": {
      eyebrow: "PRÉPARATION DE L’INSTALLATION GLOBALE",
      title: "Téléchargement AION 2 : Steam/PURPLE officiels, préchargement et installation",
      description:
        "Guide de téléchargement AION 2 : canaux officiels Steam et PURPLE, 100 Go d’espace, installation sûre et état du préchargement Global encore non annoncé.",
      intro:
        "Les canaux Global confirmés sont Steam et PURPLE. Au 26 juillet 2026, NC n’a annoncé ni date de préchargement Global, ni heure exacte d’ouverture, ni taille compressée du téléchargement.",
      keywords: [
        "téléchargement AION 2",
        "AION 2 Steam",
        "AION 2 PURPLE",
        "préchargement AION 2",
        "installation AION 2",
      ],
      sections: {
        "current-status": "Peut-on télécharger AION 2 Global maintenant ?",
        "official-channels": "Quelles différences entre les canaux officiels Steam et PURPLE ?",
        "safe-steps": "Comment télécharger AION 2 en toute sécurité ?",
        "regional-difference": "Pourquoi ne pas reprendre les instructions Corée/Taïwan ?",
        unknowns: "Quelles informations de téléchargement Global restent inconnues ?",
        faq: "FAQ sur le téléchargement AION 2",
      },
    },
    "guides/aion-2-platforms": {
      eyebrow: "VÉRIFICATION DES PLATEFORMES GLOBALES",
      title: "Plateformes AION 2 : PC, PS5, Xbox, mobile et manette",
      description:
        "AION 2 Global est confirmé sur PC via Steam/PURPLE. PS5, Xbox, mobile Global, Steam Deck et prise en charge des manettes restent non confirmés.",
      intro:
        "NC présente AION 2 Global comme une version PC distribuée sur Steam et PURPLE. PS5, Xbox, Android, iPhone et client mobile Global natif ne sont pas annoncés.",
      keywords: [
        "plateformes AION 2",
        "AION 2 PC",
        "AION 2 PS5",
        "AION 2 Xbox",
        "manette AION 2",
      ],
      sections: {
        "global-answer": "Quelles plateformes AION 2 Global sont confirmées ?",
        "platform-matrix": "État du PC, des consoles, du mobile et de Steam Deck",
        "controller-status": "La manette est-elle officiellement prise en charge ?",
        "mobile-difference": "Pourquoi trouve-t-on des informations sur AION 2 mobile ?",
        "future-updates": "Quelles preuves officielles peuvent modifier ce statut ?",
        faq: "FAQ sur les plateformes AION 2",
      },
    },
    "guides/aion-2-server-status": {
      eyebrow: "INFORMATIONS SUR LES SERVEURS GLOBAL",
      title: "État des serveurs AION 2 : régions Global, maintenance et lancement",
      description:
        "La page d’état des serveurs AION 2 n’invente pas de disponibilité en direct : régions Amérique du Nord, Amérique du Sud, Europe et Japon, noms et maintenance encore non annoncés.",
      intro:
        "Aucun état en direct vérifiable des serveurs AION 2 Global n’est disponible. NC a annoncé l’Amérique du Nord, l’Amérique du Sud, l’Europe et le Japon, mais pas d’API publique, de liste complète des mondes, de population en direct ni d’heure exacte d’ouverture.",
      keywords: [
        "état des serveurs AION 2",
        "serveurs AION 2 Global",
        "maintenance AION 2",
        "lancement AION 2",
        "régions AION 2",
      ],
      sections: {
        "status-answer": "Les serveurs AION 2 Global sont-ils en ligne ?",
        "confirmed-regions": "Quelles régions de serveurs Global sont confirmées ?",
        "what-is-not-live": "Pourquoi ne pas afficher un faux état en direct ?",
        "how-to-check": "Comment vérifier les maintenances après le lancement ?",
        "status-model": "Que faudrait-il pour un futur état en direct ?",
        faq: "FAQ sur l’état des serveurs AION 2",
      },
    },
    "guides/aion-2-tier-list": {
      eyebrow: "COMPARAISON DES CLASSES PAR VERSION",
      title: "Liste de tiers AION 2 : méthode de classement Global et mises à jour",
      description:
        "Cette liste de tiers AION 2 ne publie pas de rangs S/A sans preuve avant le lancement. Méthode par version pour PvE, PvP, valeur de groupe, difficulté et huit classes.",
      intro:
        "Il n’existe pas encore de liste de tiers fiable pour AION 2 Global. Les huit classes sont confirmées, mais les valeurs de compétences, le build d’équilibrage et les tests comparables du lancement Global ne sont pas disponibles.",
      keywords: [
        "liste de tiers AION 2",
        "classe AION 2",
        "meilleure classe AION 2",
        "classement AION 2",
        "AION 2 Global",
      ],
      sections: {
        answer: "Existe-t-il déjà une liste de tiers AION 2 fiable ?",
        "why-no-ranking": "Pourquoi un classement Corée/Taïwan ne représente-t-il pas Global ?",
        "comparison-method": "Comment évaluer une liste de tiers AION 2 ?",
        "eight-classes": "Que comparer entre les huit classes Global ?",
        "update-policy": "Quand le classement Global sera-t-il ajouté ?",
        faq: "FAQ sur la liste de tiers AION 2",
      },
    },
    "classes/gladiator": {
      eyebrow: "GUIDE DE CLASSE | FAITS OFFICIELS ET ANALYSE",
      title: "Guide AION2 Gladiator : Arcana et build",
      description:
        "Guide AION2 Gladiator par version : rôle officiel à l’espadon, choix d’Arcana, PvE, PvP, RvR, difficulté et limites des tests.",
      intro:
        "L’arme et le rôle reposent sur les sources officielles de NC. Le style de jeu, la difficulté et les exercices sont une analyse KINA ; aucun nom de compétence, coefficient, équipement ou tier non vérifié n’est inventé.",
      keywords: ["AION2 Gladiator", "Gladiator Arcana", "build Gladiator", "guide Gladiator AION2", "espadon AION2"],
      sections: {
        "official-profile": "Fait officiel : arme et rôle de la classe",
        "editorial-gameplay-loop": "Analyse KINA : boucle de combat à pratiquer",
        "gladiator-arcana-selection": "Arcana du Gladiator : sécuriser l’accès en mêlée avant de copier une liste",
        "editorial-scenarios": "Analyse KINA : contextes PvE, PvP et RvR",
        "editorial-difficulty": "Difficulté d’exécution, pas puissance ni tier",
        "beginner-practice": "Ordre d’entraînement pour débuter",
        "common-mistakes": "Erreurs fréquentes et corrections",
        "version-boundary": "Limites de version et de preuve",
      },
    },
    "classes/assassin": {
      eyebrow: "GUIDE DE CLASSE | FAITS OFFICIELS ET ANALYSE",
      title: "Guide AION2 Assassin : Arcana et build",
      description:
        "Guide AION2 Assassin par version : rôle officiel aux deux dagues, choix d’Arcana, rythme d’engagement, PvE, PvP, RvR et limites des tests.",
      intro:
        "Les sources officielles confirment les deux dagues et la pression sur de courtes fenêtres, mais pas une rotation idéale, un tier PvP ou un classement de dégâts. Les conseils sont éditoriaux.",
      keywords: ["AION2 Assassin", "Assassin Arcana", "build Assassin", "guide Assassin AION2", "deux dagues AION2"],
      sections: {
        "official-profile": "Fait officiel : arme et rôle de la classe",
        "editorial-gameplay-loop": "Analyse KINA : boucle de combat à pratiquer",
        "assassin-arcana-selection": "Arcana de l’Assassin : tester séparément l’entrée, la pression et la sortie",
        "editorial-scenarios": "Analyse KINA : contextes PvE, PvP et RvR",
        "editorial-difficulty": "Difficulté d’exécution, pas puissance ni tier",
        "beginner-practice": "Ordre d’entraînement pour débuter",
        "common-mistakes": "Erreurs fréquentes et corrections",
        "version-boundary": "Limites de version et de preuve",
      },
    },
    "classes/ranger": {
      eyebrow: "GUIDE DE CLASSE | FAITS OFFICIELS ET ANALYSE",
      title: "Guide AION2 Ranger : arbre de compétences et build",
      description:
        "Guide AION2 Ranger par version : rôle officiel à l’arc, priorités de compétences, positionnement, PvE, PvP, RvR et limites des tests.",
      intro:
        "L’arc, les attaques à distance, le positionnement et le timing proviennent des sources officielles. La méthode d’entraînement et la difficulté sont éditoriales ; aucun classement de dégâts n’est inventé.",
      keywords: ["AION2 Ranger", "arbre de compétences Ranger", "build Ranger", "guide Ranger AION2", "arc AION2"],
      sections: {
        "official-profile": "Fait officiel : arme et rôle de la classe",
        "editorial-gameplay-loop": "Analyse KINA : boucle de combat à pratiquer",
        "ranger-skill-tree-priority": "Priorités du Ranger : rendre le build fiable avant d’ajouter des dégâts",
        "editorial-scenarios": "Analyse KINA : contextes PvE, PvP et RvR",
        "editorial-difficulty": "Difficulté d’exécution, pas puissance ni tier",
        "beginner-practice": "Ordre d’entraînement pour débuter",
        "common-mistakes": "Erreurs fréquentes et corrections",
        "version-boundary": "Limites de version et de preuve",
      },
    },
    "classes/sorcerer": {
      eyebrow: "GUIDE DE CLASSE | FAITS OFFICIELS ET ANALYSE",
      title: "Guide AION2 Sorcerer : build et priorité des compétences",
      description:
        "Guide AION2 Sorcerer par version : rôle officiel au grimoire, incantation sûre, priorités, PvE, PvP, RvR et limites de test vérifiables.",
      intro:
        "Les sources officielles confirment le grimoire et la magie sur de courtes fenêtres. Les fenêtres d’incantation, la difficulté et l’entraînement sont éditoriaux ; aucune compétence ni coefficient n’est inventé.",
      keywords: ["AION2 Sorcerer", "build Sorcerer", "compétences Sorcerer", "guide Sorcerer AION2", "grimoire AION2"],
      sections: {
        "official-profile": "Fait officiel : arme et rôle de la classe",
        "editorial-gameplay-loop": "Analyse KINA : boucle de combat à pratiquer",
        "sorcerer-versioned-build": "Planifier un build Sorcerer vérifiable pour chaque version",
        "sorcerer-skill-priority": "Priorités du Sorcerer : sécurité, fiabilité, contexte puis dégâts",
        "editorial-scenarios": "Analyse KINA : contextes PvE, PvP et RvR",
        "editorial-difficulty": "Difficulté d’exécution, pas puissance ni tier",
        "beginner-practice": "Ordre d’entraînement pour débuter",
        "common-mistakes": "Erreurs fréquentes et corrections",
        "version-boundary": "Limites de version et de preuve",
      },
    },
    "guides/character-presets-style-shop": {
      eyebrow: "APPARENCE DU PERSONNAGE",
      title: "Création de personnage AION2 : préréglages, personnalisation et Style Shop",
      description:
        "Utilisez plus de 200 réglages de création de personnage AION2, les préréglages intégrés et le Style Shop officiel, tout en vérifiant la compatibilité des créations tierces.",
      intro:
        "La création de personnage AION2 comprend une personnalisation détaillée, des préréglages et le Style Shop officiel. Vérifiez version, région et compatibilité avant d’utiliser une création partagée.",
      keywords: ["création de personnage AION2", "préréglages AION2", "personnalisation AION2", "Style Shop AION2"],
      sections: {
        "official-features": "Fonctions de personnalisation confirmées par NC",
        "safe-use": "Que vérifier avant d’importer ou de recréer une apparence ?",
        "preset-workflow": "Conserver et reconstruire un préréglage AION2 en sécurité",
        "style-shop-boundary": "Ce que la page Style Shop confirme ou non",
      },
    },
    "guides/global-monetization-watchlist": {
      eyebrow: "FREE-TO-PLAY ET MONÉTISATION GLOBALE",
      title: "AION 2 est-il free-to-play ? Membership, Kina, Quna et Daeva Pass",
      description:
        "AION 2 Global est prévu en free-to-play avec un abonnement Membership mensuel de 15 $, l’accès au Marché et à l’Exchange, Kina, Quna et un Daeva Pass par personnage.",
      intro:
        "Le jeu de base AION 2 Global sera gratuit, sans achat initial ; Steam indique Free To Play et achats intégrés. NC prévoit un abonnement Membership de 15 $ par mois, mais tous les avantages et taux ne sont pas encore publiés.",
      keywords: ["AION 2 free-to-play", "AION 2 pay-to-win", "AION 2 Membership", "AION 2 Kina", "AION 2 Quna", "AION 2 Daeva Pass"],
      sections: {
        confirmed: "AION 2 Global est-il gratuit ?",
        "pay-to-win-assessment": "AION 2 Global est-il pay-to-win et que sait-on réellement ?",
        membership: "Que débloque l’abonnement Membership prévu à 15 $ ?",
        "currencies-and-pass": "Comment fonctionnent Kina, Quna, l’Exchange et Daeva Pass ?",
        "power-and-unknowns": "La boutique vend-elle de la puissance et que reste-t-il inconnu ?",
        "shop-evaluation": "Comment revérifier les produits AION 2 Global au lancement ?",
      },
    },
  },
  de: {
    "database/aion-2-wiki": {
      eyebrow: "DATENZENTRUM",
      title: "AION 2 Wiki: Klassen, Gegenstände, Karten, Handwerk und Global-Guides",
      description:
        "Das AION 2 Wiki bündelt Klassen, Gegenstandsdatenbank, interaktive Karten, Materialrechner, Global-Guides, Quelldaten und klare Regionsangaben.",
      intro:
        "Das AION 2 Wiki ist KINAs quellenbasierter Inhaltsindex und kein offizielles NC-Wiki. Es verbindet Klassen, Gegenstände, Karten, Handwerk und Guides mit Region, Version, Prüfdatum und Primärquelle.",
      keywords: ["AION 2 Wiki", "AION 2 Klassen", "AION 2 Gegenstände", "AION 2 Karte", "AION 2 Handwerk"],
      sections: {
        "what-this-hub-is": "Was findet man im AION 2 Wiki?",
        "official-scope": "Welche Fakten sind offiziell und was ist KINA-Redaktion?",
        "use-the-hub": "Wie nutzt man das AION 2 Wiki?",
        "what-is-not-included": "Welche Angaben erfindet das AION 2 Wiki nicht?",
        "wiki-faq": "Häufige Fragen zum AION 2 Wiki",
      },
    },
    "guides/aion-2-gameplay": {
      eyebrow: "GLOBAL-GAMEPLAY IM ÜBERBLICK",
      title: "AION 2 Gameplay: Luftkampf, Klassen, PvE, PvP und Erkundung",
      description:
        "AION 2 Gameplay mit offiziellem 3D-Flug, manuellem Kampf, acht Klassen, Solo- und 5/10-Spieler-PvE, Fraktions-PvP, Erkundung und Anpassung.",
      intro:
        "AION 2 verbindet Flug, vertikale Räume und manuellen Kampf mit MMORPG-Erkundung und Fraktionskonflikten. Die Global-Seite auf Steam bestätigt acht Klassen, über 200 Dungeons sowie Solo- und 5/10-Spieler-Inhalte.",
      keywords: ["AION 2 Gameplay", "AION 2 Luftkampf", "AION 2 Klassen", "AION 2 PvE", "AION 2 PvP"],
      sections: {
        "quick-answer": "Was für ein Spiel ist AION 2?",
        "world-flight": "Wie verändert freies Fliegen Erkundung und Kampf?",
        "combat-classes": "Wie unterscheiden sich acht Klassen und manueller Kampf?",
        "pve-pvp": "Welche PvE-, PvP- und Nebenaktivitäten sind bestätigt?",
        "global-boundary": "Welche Global-Gameplay-Details sind noch unbestätigt?",
        faq: "Häufige Fragen zum AION 2 Gameplay",
      },
    },
    "guides/aion-2-download": {
      eyebrow: "VORBEREITUNG DER GLOBAL-INSTALLATION",
      title: "AION 2 Download: offizielles Steam/PURPLE, Preload und Installation",
      description:
        "AION 2 Download über offizielle Steam- und PURPLE-Kanäle, 100 GB Speicherplatz, sichere Installation und noch nicht angekündigter Global-Preload.",
      intro:
        "Für AION 2 Global sind Steam und PURPLE bestätigt. Mit Stand 26. Juli 2026 hat NC weder ein Global-Preload-Datum noch die genaue Startzeit oder komprimierte Downloadgröße angekündigt.",
      keywords: ["AION 2 Download", "AION 2 Steam", "AION 2 PURPLE", "AION 2 Preload", "AION 2 installieren"],
      sections: {
        "current-status": "Kann man AION 2 Global bereits herunterladen?",
        "official-channels": "Wie unterscheiden sich Steam und PURPLE?",
        "safe-steps": "Wie lädt man AION 2 sicher herunter?",
        "regional-difference": "Warum gelten Korea-/Taiwan-Anweisungen nicht automatisch?",
        unknowns: "Welche Global-Downloaddetails sind noch unbekannt?",
        faq: "Häufige Fragen zum AION 2 Download",
      },
    },
    "guides/aion-2-platforms": {
      eyebrow: "GLOBAL-PLATTFORMEN GEPRÜFT",
      title: "AION 2 Plattformen: PC, PS5, Xbox, Mobilgeräte und Controller",
      description:
        "AION 2 Global ist für Steam/PURPLE auf PC bestätigt. PS5, Xbox, Global-Mobile, Steam Deck und Controller-Unterstützung sind noch nicht bestätigt.",
      intro:
        "NC beschreibt AION 2 Global als PC-Version über Steam und PURPLE. PS5, Xbox, Android, iPhone und ein nativer Global-Mobile-Client sind noch nicht angekündigt.",
      keywords: ["AION 2 Plattformen", "AION 2 PC", "AION 2 PS5", "AION 2 Xbox", "AION 2 Controller"],
      sections: {
        "global-answer": "Welche Plattformen sind für AION 2 Global bestätigt?",
        "platform-matrix": "Status von PC, Konsole, Mobilgeräten und Steam Deck",
        "controller-status": "Ist Controller-Unterstützung bestätigt?",
        "mobile-difference": "Warum gibt es Informationen zu AION 2 Mobile?",
        "future-updates": "Welche offiziellen Belege können den Status ändern?",
        faq: "Häufige Fragen zu AION 2 Plattformen",
      },
    },
    "guides/aion-2-server-status": {
      eyebrow: "INFORMATIONEN ZU GLOBAL-SERVERN",
      title: "AION 2 Serverstatus: Global-Regionen, Wartung und Start",
      description:
        "Der AION 2 Serverstatus erfindet keine Live-Verfügbarkeit: bestätigt sind Nordamerika, Südamerika, Europa und Japan; Servernamen, Wartung und Bevölkerung sind noch nicht angekündigt.",
      intro:
        "Ein verifizierbarer Live-Serverstatus für AION 2 Global ist noch nicht verfügbar. NC hat Nordamerika, Südamerika, Europa und Japan angekündigt, aber keine öffentliche Status-API, vollständige Weltenliste, Live-Bevölkerung oder genaue Startzeit.",
      keywords: ["AION 2 Serverstatus", "AION 2 Global Server", "AION 2 Wartung", "AION 2 Start", "AION 2 Regionen"],
      sections: {
        "status-answer": "Sind die AION 2 Global-Server online?",
        "confirmed-regions": "Welche Global-Serverregionen sind bestätigt?",
        "what-is-not-live": "Warum zeigen wir keinen erfundenen Live-Status?",
        "how-to-check": "Wie prüft man Wartungen nach dem Start?",
        "status-model": "Was benötigt ein künftiger Live-Status?",
        faq: "Häufige Fragen zum AION 2 Serverstatus",
      },
    },
    "guides/aion-2-tier-list": {
      eyebrow: "VERSIONIERTER KLASSENVERGLEICH",
      title: "AION 2 Tier-Liste: Methode für Global-Klassen und Updates",
      description:
        "Die AION 2 Tier-Liste veröffentlicht vor dem Start keine unbelegten S/A-Ränge. Versionierte Methode für PvE, PvP, Gruppenwert, Schwierigkeit und acht Klassen.",
      intro:
        "Eine verlässliche AION 2 Global Tier-Liste gibt es noch nicht. Acht Klassen sind bestätigt, doch Global-Skillwerte, vollständige Balance-Version und vergleichbare Tests fehlen.",
      keywords: ["AION 2 Tier-Liste", "AION 2 Klassen", "beste Klasse AION 2", "AION 2 Klassenrangliste", "AION 2 Global"],
      sections: {
        answer: "Gibt es bereits eine verlässliche AION 2 Tier-Liste?",
        "why-no-ranking": "Warum repräsentiert ein Korea-/Taiwan-Ranking nicht Global?",
        "comparison-method": "Wie sollte eine AION 2 Tier-Liste bewertet werden?",
        "eight-classes": "Was sollte man bei acht Global-Klassen vergleichen?",
        "update-policy": "Wann wird das Global-Ranking ergänzt?",
        faq: "Häufige Fragen zur AION 2 Tier-Liste",
      },
    },
    "classes/gladiator": {
      eyebrow: "KLASSENGUIDE | OFFIZIELLE FAKTEN UND ANALYSE",
      title: "AION2 Gladiator Arcana- und Build-Guide",
      description:
        "Versionierter AION2 Gladiator Guide: offizielle Großschwert-Rolle, Arcana-Auswahl, PvE, PvP, RvR, Schwierigkeit und Testgrenzen.",
      intro:
        "Waffe und Rolle stammen aus offiziellen NC-Quellen. Spielstil, Schwierigkeit und Übung sind KINA-Analyse; unverifizierte Skills, Werte, Ausrüstung oder Tiers werden nicht erfunden.",
      keywords: ["AION2 Gladiator", "Gladiator Arcana", "Gladiator Build", "Gladiator Guide AION2", "Großschwert AION2"],
      sections: {
        "official-profile": "Offizieller Fakt: Waffe und Klassenrolle",
        "editorial-gameplay-loop": "KINA-Analyse: trainierbarer Kampfablauf",
        "gladiator-arcana-selection": "Gladiator Arcana: Nahkampfzugang vor fester Liste absichern",
        "editorial-scenarios": "KINA-Analyse: PvE-, PvP- und RvR-Szenarien",
        "editorial-difficulty": "Ausführungsschwierigkeit, nicht Stärke oder Tier",
        "beginner-practice": "Übungsreihenfolge für Einsteiger",
        "common-mistakes": "Häufige Fehler und Korrekturen",
        "version-boundary": "Versions- und Evidenzgrenzen",
      },
    },
    "classes/assassin": {
      eyebrow: "KLASSENGUIDE | OFFIZIELLE FAKTEN UND ANALYSE",
      title: "AION2 Assassin Arcana- und Build-Guide",
      description:
        "Versionierter AION2 Assassin Guide: offizielle Doppeldolch-Rolle, Arcana-Auswahl, Kampfrhythmus, PvE, PvP, RvR und Testgrenzen.",
      intro:
        "Offizielle Quellen bestätigen Doppeldolche und Druck in kurzen Zeitfenstern, aber keine beste Rotation, kein PvP-Tier und keine Schadensrangliste. Empfehlungen sind redaktionell.",
      keywords: ["AION2 Assassin", "Assassin Arcana", "Assassin Build", "Assassin Guide AION2", "Doppeldolche AION2"],
      sections: {
        "official-profile": "Offizieller Fakt: Waffe und Klassenrolle",
        "editorial-gameplay-loop": "KINA-Analyse: trainierbarer Kampfablauf",
        "assassin-arcana-selection": "Assassin Arcana: Einstieg, Druck und Rückzug getrennt prüfen",
        "editorial-scenarios": "KINA-Analyse: PvE-, PvP- und RvR-Szenarien",
        "editorial-difficulty": "Ausführungsschwierigkeit, nicht Stärke oder Tier",
        "beginner-practice": "Übungsreihenfolge für Einsteiger",
        "common-mistakes": "Häufige Fehler und Korrekturen",
        "version-boundary": "Versions- und Evidenzgrenzen",
      },
    },
    "classes/ranger": {
      eyebrow: "KLASSENGUIDE | OFFIZIELLE FAKTEN UND ANALYSE",
      title: "AION2 Ranger Skilltree- und Build-Guide",
      description:
        "Versionierter AION2 Ranger Guide: offizielle Bogen-Rolle, Skill-Prioritäten, Positionierung, PvE, PvP, RvR und Testgrenzen.",
      intro:
        "Bogen, Fernangriffe, Positionierung und Timing stammen aus offiziellen Quellen. Übungsmethode und Schwierigkeit sind redaktionell; Reichweite, Skills und Schadensrang werden nicht erfunden.",
      keywords: ["AION2 Ranger", "Ranger Skilltree", "Ranger Build", "Ranger Guide AION2", "Bogen AION2"],
      sections: {
        "official-profile": "Offizieller Fakt: Waffe und Klassenrolle",
        "editorial-gameplay-loop": "KINA-Analyse: trainierbarer Kampfablauf",
        "ranger-skill-tree-priority": "Ranger-Prioritäten: zuerst einen verlässlichen Build schaffen",
        "editorial-scenarios": "KINA-Analyse: PvE-, PvP- und RvR-Szenarien",
        "editorial-difficulty": "Ausführungsschwierigkeit, nicht Stärke oder Tier",
        "beginner-practice": "Übungsreihenfolge für Einsteiger",
        "common-mistakes": "Häufige Fehler und Korrekturen",
        "version-boundary": "Versions- und Evidenzgrenzen",
      },
    },
    "classes/sorcerer": {
      eyebrow: "KLASSENGUIDE | OFFIZIELLE FAKTEN UND ANALYSE",
      title: "AION2 Sorcerer Build- und Skill-Prioritäten-Guide",
      description:
        "Versionierter AION2 Sorcerer Guide: offizielle Zauberbuch-Rolle, sicheres Wirken, Skill-Prioritäten, PvE, PvP, RvR und prüfbare Testgrenzen.",
      intro:
        "Offizielle Quellen bestätigen Zauberbuch und Magie in kurzen Zeitfenstern. Sichere Wirkfenster, Schwierigkeit und Übung sind redaktionell; Skills und Koeffizienten werden nicht erfunden.",
      keywords: ["AION2 Sorcerer", "Sorcerer Build", "Sorcerer Skills", "Sorcerer Guide AION2", "Zauberbuch AION2"],
      sections: {
        "official-profile": "Offizieller Fakt: Waffe und Klassenrolle",
        "editorial-gameplay-loop": "KINA-Analyse: trainierbarer Kampfablauf",
        "sorcerer-versioned-build": "Sorcerer Build: ein prüfbares Blatt je Spielversion",
        "sorcerer-skill-priority": "Sorcerer-Priorität: Sicherheit, Funktion, Kontext, Schaden",
        "editorial-scenarios": "KINA-Analyse: PvE-, PvP- und RvR-Szenarien",
        "editorial-difficulty": "Ausführungsschwierigkeit, nicht Stärke oder Tier",
        "beginner-practice": "Übungsreihenfolge für Einsteiger",
        "common-mistakes": "Häufige Fehler und Korrekturen",
        "version-boundary": "Versions- und Evidenzgrenzen",
      },
    },
    "guides/character-presets-style-shop": {
      eyebrow: "CHARAKTERAUSSEHEN",
      title: "AION2 Charaktererstellung: Vorlagen, Anpassung und Style Shop",
      description:
        "Nutze über 200 Optionen der AION2 Charaktererstellung, integrierte Vorlagen und den offiziellen Style Shop und prüfe die Kompatibilität geteilter Vorlagen.",
      intro:
        "Die AION2 Charaktererstellung bietet detaillierte Anpassung, fertige Vorlagen und den offiziellen Style Shop. Prüfe Version, Region und Importkompatibilität, bevor du Community-Daten nutzt.",
      keywords: ["AION2 Charaktererstellung", "AION2 Vorlagen", "AION2 Anpassung", "AION2 Style Shop"],
      sections: {
        "official-features": "Von NC bestätigte Anpassungsfunktionen",
        "safe-use": "Was ist vor Import oder Nachbau zu prüfen?",
        "preset-workflow": "Eine AION2-Charaktervorlage sicher sichern und nachbauen",
        "style-shop-boundary": "Was die Style-Shop-Seite bestätigt und was nicht",
      },
    },
    "guides/global-monetization-watchlist": {
      eyebrow: "GLOBAL FREE-TO-PLAY UND MONETARISIERUNG",
      title: "Ist AION 2 free-to-play? Membership, Kina, Quna und Daeva Pass",
      description:
        "AION 2 Global ist als free-to-play geplant: monatliches Membership-Abonnement für 15 $, Markt- und Exchange-Zugang, Kina, Quna und Daeva Pass pro Charakter.",
      intro:
        "Das Grundspiel AION 2 Global soll ohne Kauf kostenlos spielbar sein; Steam nennt Free To Play und In-App-Käufe. NC plant ein Membership-Abonnement für 15 $ pro Monat, vollständige Vorteile und Kurse sind noch offen.",
      keywords: ["AION 2 free-to-play", "AION 2 pay-to-win", "AION 2 Membership", "AION 2 Kina", "AION 2 Quna", "AION 2 Daeva Pass"],
      sections: {
        confirmed: "Ist AION 2 Global kostenlos spielbar?",
        "pay-to-win-assessment": "Ist AION 2 Global pay-to-win und was ist schon belegbar?",
        membership: "Was schaltet das geplante Membership-Abonnement für 15 $ frei?",
        "currencies-and-pass": "Wie funktionieren Kina, Quna, Exchange und Daeva Pass?",
        "power-and-unknowns": "Verkauft der Shop Stärke und was ist noch unbekannt?",
        "shop-evaluation": "Wie prüft man AION 2 Global-Produkte zum Start erneut?",
      },
    },
  },
  es: {
    "database/aion-2-wiki": {
      eyebrow: "CENTRO DE DATOS",
      title: "Wiki de AION 2: clases, objetos, mapas, fabricación y guías globales",
      description:
        "El Wiki de AION 2 reúne clases, base de objetos, mapas interactivos, calculadora de materiales, guías globales, fechas de fuentes y alcance regional.",
      intro:
        "El Wiki de AION 2 es el índice editorial con fuentes de KINA, no un wiki oficial de NC. Conecta clases, objetos, mapas, fabricación y guías con región, versión, fecha y fuente primaria.",
      keywords: ["Wiki AION 2", "clases AION 2", "objetos AION 2", "mapa interactivo AION 2", "fabricación AION 2"],
      sections: {
        "what-this-hub-is": "¿Qué puedes encontrar en el Wiki de AION 2?",
        "official-scope": "¿Qué datos son oficiales y cuáles son trabajo editorial de KINA?",
        "use-the-hub": "¿Cómo se usa el Wiki de AION 2?",
        "what-is-not-included": "¿Qué se niega a inventar el Wiki de AION 2?",
        "wiki-faq": "Preguntas frecuentes del Wiki de AION 2",
      },
    },
    "guides/aion-2-gameplay": {
      eyebrow: "RESUMEN DEL GAMEPLAY GLOBAL",
      title: "Gameplay de AION 2: combate aéreo, clases, PvE, PvP y exploración",
      description:
        "Resumen del gameplay de AION 2: vuelo 3D, combate manual, ocho clases, PvE individual y para 5/10 jugadores, PvP de facciones, exploración y personalización.",
      intro:
        "AION 2 integra vuelo, espacio vertical y combate manual en la exploración MMORPG y el conflicto de facciones. La página global de Steam confirma ocho clases, más de 200 mazmorras y formatos individual y para 5/10 jugadores.",
      keywords: ["gameplay AION 2", "combate aéreo AION 2", "clases AION 2", "PvE AION 2", "PvP AION 2"],
      sections: {
        "quick-answer": "¿Qué tipo de juego es AION 2?",
        "world-flight": "¿Cómo cambia el vuelo libre la exploración y el combate?",
        "combat-classes": "¿Cómo difieren las ocho clases y el combate manual?",
        "pve-pvp": "¿Qué actividades PvE, PvP y secundarias están confirmadas?",
        "global-boundary": "¿Qué detalles del gameplay global siguen sin confirmarse?",
        faq: "Preguntas frecuentes sobre el gameplay de AION 2",
      },
    },
    "guides/aion-2-download": {
      eyebrow: "PREPARACIÓN DE LA INSTALACIÓN GLOBAL",
      title: "Descarga de AION 2: Steam/PURPLE oficiales, precarga e instalación",
      description:
        "Guía de descarga de AION 2: canales oficiales Steam y PURPLE, 100 GB de almacenamiento, instalación segura y precarga global aún no anunciada.",
      intro:
        "Los canales globales confirmados son Steam y PURPLE. A 26 de julio de 2026, NC no ha anunciado la fecha de precarga global, la hora exacta de apertura ni el tamaño comprimido.",
      keywords: ["descarga AION 2", "AION 2 Steam", "AION 2 PURPLE", "precarga AION 2", "instalar AION 2"],
      sections: {
        "current-status": "¿Se puede descargar AION 2 Global ahora?",
        "official-channels": "¿En qué se diferencian Steam y PURPLE?",
        "safe-steps": "¿Cómo descargar AION 2 de forma segura?",
        "regional-difference": "¿Por qué no sirven automáticamente las instrucciones de Corea/Taiwán?",
        unknowns: "¿Qué datos de descarga global siguen sin conocerse?",
        faq: "Preguntas frecuentes sobre la descarga de AION 2",
      },
    },
    "guides/aion-2-platforms": {
      eyebrow: "COMPROBACIÓN DE PLATAFORMAS GLOBALES",
      title: "Plataformas de AION 2: PC, PS5, Xbox, móvil y mando",
      description:
        "AION 2 Global está confirmado para PC mediante Steam/PURPLE. PS5, Xbox, móvil global, Steam Deck y compatibilidad con mando siguen sin confirmarse.",
      intro:
        "NC describe AION 2 Global como una versión para PC distribuida en Steam y PURPLE. PS5, Xbox, Android, iPhone y un cliente móvil global nativo aún no se han anunciado.",
      keywords: ["plataformas AION 2", "AION 2 PC", "AION 2 PS5", "AION 2 Xbox", "mando AION 2"],
      sections: {
        "global-answer": "¿Qué plataformas de AION 2 Global están confirmadas?",
        "platform-matrix": "Estado de PC, consolas, móvil y Steam Deck",
        "controller-status": "¿Está confirmado el uso de mando?",
        "mobile-difference": "¿Por qué existe información sobre AION 2 móvil?",
        "future-updates": "¿Qué pruebas oficiales pueden cambiar este estado?",
        faq: "Preguntas frecuentes sobre plataformas de AION 2",
      },
    },
    "guides/aion-2-server-status": {
      eyebrow: "INFORMACIÓN DE SERVIDORES GLOBALES",
      title: "Estado de los servidores de AION 2: regiones, mantenimiento y lanzamiento",
      description:
        "La página de estado de AION 2 no inventa disponibilidad en directo: están confirmadas Norteamérica, Sudamérica, Europa y Japón; nombres, mantenimiento y población aún no están anunciados.",
      intro:
        "Todavía no existe un estado en directo verificable para los servidores globales de AION 2. NC anunció Norteamérica, Sudamérica, Europa y Japón, pero no una API pública, lista completa de mundos, población en directo ni hora exacta.",
      keywords: ["estado de servidores AION 2", "servidores AION 2 Global", "mantenimiento AION 2", "lanzamiento AION 2", "regiones AION 2"],
      sections: {
        "status-answer": "¿Están en línea los servidores globales de AION 2?",
        "confirmed-regions": "¿Qué regiones globales están confirmadas?",
        "what-is-not-live": "¿Por qué no mostramos un estado en directo inventado?",
        "how-to-check": "¿Cómo comprobar el mantenimiento tras el lanzamiento?",
        "status-model": "¿Qué necesita un futuro estado en directo?",
        faq: "Preguntas frecuentes sobre el estado de AION 2",
      },
    },
    "guides/aion-2-tier-list": {
      eyebrow: "COMPARACIÓN DE CLASES POR VERSIÓN",
      title: "Tier List de AION 2: método de clasificación global y actualizaciones",
      description:
        "La Tier List de AION 2 no publica rangos S/A sin pruebas antes del lanzamiento. Método por versión para PvE, PvP, valor grupal, dificultad y ocho clases.",
      intro:
        "Aún no existe una Tier List fiable para AION 2 Global. Hay ocho clases confirmadas, pero faltan valores globales de habilidades, versión completa de balance y pruebas comparables.",
      keywords: ["Tier List AION 2", "clases AION 2", "mejor clase AION 2", "clasificación AION 2", "AION 2 Global"],
      sections: {
        answer: "¿Existe ya una Tier List fiable de AION 2?",
        "why-no-ranking": "¿Por qué un ranking de Corea/Taiwán no representa Global?",
        "comparison-method": "¿Cómo debe puntuarse una Tier List de AION 2?",
        "eight-classes": "¿Qué comparar entre las ocho clases globales?",
        "update-policy": "¿Cuándo se añadirá la clasificación global?",
        faq: "Preguntas frecuentes de la Tier List de AION 2",
      },
    },
    "classes/gladiator": {
      eyebrow: "GUÍA DE CLASE | DATOS OFICIALES Y ANÁLISIS",
      title: "Guía de Arcana y build de AION2 Gladiator",
      description:
        "Guía por versión de AION2 Gladiator: rol oficial con mandoble, elección de Arcana, PvE, PvP, RvR, dificultad y límites de prueba.",
      intro:
        "El arma y el rol proceden de fuentes oficiales de NC. El estilo, la dificultad y la práctica son análisis de KINA; no se inventan habilidades, coeficientes, equipo ni tiers.",
      keywords: ["AION2 Gladiator", "Arcana Gladiator", "build Gladiator", "guía Gladiator AION2", "mandoble AION2"],
      sections: {
        "official-profile": "Dato oficial: arma y rol de la clase",
        "editorial-gameplay-loop": "Análisis KINA: ciclo de combate practicable",
        "gladiator-arcana-selection": "Arcana de Gladiator: asegurar el acceso cuerpo a cuerpo antes de copiar listas",
        "editorial-scenarios": "Análisis KINA: escenarios PvE, PvP y RvR",
        "editorial-difficulty": "Dificultad de ejecución, no poder ni tier",
        "beginner-practice": "Orden de práctica para principiantes",
        "common-mistakes": "Errores comunes y correcciones",
        "version-boundary": "Límites de versión y evidencia",
      },
    },
    "classes/assassin": {
      eyebrow: "GUÍA DE CLASE | DATOS OFICIALES Y ANÁLISIS",
      title: "Guía de Arcana y build de AION2 Assassin",
      description:
        "Guía por versión de AION2 Assassin: rol oficial con dos dagas, elección de Arcana, ritmo de entrada y salida, PvE, PvP, RvR y límites de prueba.",
      intro:
        "Las fuentes oficiales confirman las dos dagas y la presión en ventanas cortas, pero no una rotación ideal, tier PvP o ranking de daño. Las recomendaciones son editoriales.",
      keywords: ["AION2 Assassin", "Arcana Assassin", "build Assassin", "guía Assassin AION2", "dos dagas AION2"],
      sections: {
        "official-profile": "Dato oficial: arma y rol de la clase",
        "editorial-gameplay-loop": "Análisis KINA: ciclo de combate practicable",
        "assassin-arcana-selection": "Arcana de Assassin: comprobar entrada, presión y salida por separado",
        "editorial-scenarios": "Análisis KINA: escenarios PvE, PvP y RvR",
        "editorial-difficulty": "Dificultad de ejecución, no poder ni tier",
        "beginner-practice": "Orden de práctica para principiantes",
        "common-mistakes": "Errores comunes y correcciones",
        "version-boundary": "Límites de versión y evidencia",
      },
    },
    "classes/ranger": {
      eyebrow: "GUÍA DE CLASE | DATOS OFICIALES Y ANÁLISIS",
      title: "Guía de árbol de habilidades y build de AION2 Ranger",
      description:
        "Guía por versión de AION2 Ranger: rol oficial con arco, prioridad de habilidades, posición, PvE, PvP, RvR y límites de prueba.",
      intro:
        "El arco, los ataques a distancia, la posición y el momento proceden de fuentes oficiales. La práctica y dificultad son editoriales; no se inventan alcance, habilidades ni ranking de daño.",
      keywords: ["AION2 Ranger", "árbol de habilidades Ranger", "build Ranger", "guía Ranger AION2", "arco AION2"],
      sections: {
        "official-profile": "Dato oficial: arma y rol de la clase",
        "editorial-gameplay-loop": "Análisis KINA: ciclo de combate practicable",
        "ranger-skill-tree-priority": "Prioridad de Ranger: lograr un build fiable antes de añadir daño",
        "editorial-scenarios": "Análisis KINA: escenarios PvE, PvP y RvR",
        "editorial-difficulty": "Dificultad de ejecución, no poder ni tier",
        "beginner-practice": "Orden de práctica para principiantes",
        "common-mistakes": "Errores comunes y correcciones",
        "version-boundary": "Límites de versión y evidencia",
      },
    },
    "classes/sorcerer": {
      eyebrow: "GUÍA DE CLASE | DATOS OFICIALES Y ANÁLISIS",
      title: "Guía de build y prioridad de habilidades de AION2 Sorcerer",
      description:
        "Guía por versión de AION2 Sorcerer: rol oficial con grimorio, lanzamiento seguro, prioridad de habilidades, PvE, PvP, RvR y límites verificables.",
      intro:
        "Las fuentes oficiales confirman el grimorio y la magia en ventanas cortas. Los momentos seguros, la dificultad y la práctica son editoriales; no se inventan habilidades ni coeficientes.",
      keywords: ["AION2 Sorcerer", "build Sorcerer", "habilidades Sorcerer", "guía Sorcerer AION2", "grimorio AION2"],
      sections: {
        "official-profile": "Dato oficial: arma y rol de la clase",
        "editorial-gameplay-loop": "Análisis KINA: ciclo de combate practicable",
        "sorcerer-versioned-build": "Build de Sorcerer: una hoja verificable por versión",
        "sorcerer-skill-priority": "Prioridad de Sorcerer: seguridad, función, contexto y daño",
        "editorial-scenarios": "Análisis KINA: escenarios PvE, PvP y RvR",
        "editorial-difficulty": "Dificultad de ejecución, no poder ni tier",
        "beginner-practice": "Orden de práctica para principiantes",
        "common-mistakes": "Errores comunes y correcciones",
        "version-boundary": "Límites de versión y evidencia",
      },
    },
    "guides/character-presets-style-shop": {
      eyebrow: "APARIENCIA DEL PERSONAJE",
      title: "Creación de personajes en AION2: ajustes, personalización y Style Shop",
      description:
        "Usa más de 200 controles de creación de personajes en AION2, ajustes predefinidos y el Style Shop oficial, verificando la compatibilidad de diseños externos.",
      intro:
        "La creación de personajes en AION2 incluye personalización detallada, ajustes preparados y el Style Shop oficial. Comprueba versión, región y compatibilidad antes de usar datos compartidos.",
      keywords: ["creación de personajes AION2", "ajustes AION2", "personalización AION2", "Style Shop AION2"],
      sections: {
        "official-features": "Funciones de personalización confirmadas por NC",
        "safe-use": "¿Qué comprobar antes de importar o recrear una apariencia?",
        "preset-workflow": "Cómo guardar y recrear de forma segura un ajuste de AION2",
        "style-shop-boundary": "Qué confirma y qué no confirma la página Style Shop",
      },
    },
    "guides/global-monetization-watchlist": {
      eyebrow: "FREE-TO-PLAY Y MONETIZACIÓN GLOBAL",
      title: "¿AION 2 es gratuito? Membership, Kina, Quna y Daeva Pass",
      description:
        "AION 2 Global se plantea como gratuito con suscripción Membership mensual de 15 $, acceso al Mercado y Exchange, Kina, Quna y Daeva Pass por personaje.",
      intro:
        "El juego base de AION 2 Global será gratuito y sin compra inicial; Steam indica Free To Play y compras dentro de la aplicación. NC planea una suscripción Membership de 15 $ al mes, pero faltan beneficios y tasas completas.",
      keywords: ["AION 2 gratuito", "AION 2 pay-to-win", "AION 2 Membership", "AION 2 Kina", "AION 2 Quna", "AION 2 Daeva Pass"],
      sections: {
        confirmed: "¿AION 2 Global será gratuito?",
        "pay-to-win-assessment": "¿AION 2 Global será pay-to-win y qué puede afirmarse ahora?",
        membership: "¿Qué desbloquea la suscripción Membership prevista de 15 $?",
        "currencies-and-pass": "¿Cómo funcionan Kina, Quna, Exchange y Daeva Pass?",
        "power-and-unknowns": "¿La tienda vende poder y qué sigue sin conocerse?",
        "shop-evaluation": "¿Cómo volver a comprobar los productos globales al lanzarse?",
      },
    },
  },
  ja: {
    "database/aion-2-wiki": {
      eyebrow: "データハブ",
      title: "AION 2 Wiki：クラス、アイテム、マップ、製作、グローバル版ガイド",
      description:
        "AION 2 Wikiでは、クラス、アイテムデータベース、インタラクティブマップ、素材計算機、グローバル版ガイド、情報源の日付と対象地域を確認できます。",
      intro:
        "AION 2 WikiはKINAが情報源を明示して整理するコンテンツ索引であり、NC公式Wikiではありません。クラス、アイテム、マップ、製作、ガイドを地域、バージョン、確認日、一次情報と結び付けます。",
      keywords: ["AION 2 Wiki", "AION 2 クラス", "AION 2 アイテム", "AION 2 マップ", "AION 2 製作"],
      sections: {
        "what-this-hub-is": "AION 2 Wikiでは何を調べられますか？",
        "official-scope": "公式情報とKINA編集情報はどう区別されますか？",
        "use-the-hub": "AION 2 Wikiの使い方は？",
        "what-is-not-included": "AION 2 Wikiが推測で補わない情報は？",
        "wiki-faq": "AION 2 Wiki よくある質問",
      },
    },
    "guides/aion-2-gameplay": {
      eyebrow: "グローバル版ゲームプレイ概要",
      title: "AION 2 ゲームプレイ：飛行戦闘、クラス、PvE、PvP、探索",
      description:
        "AION 2の3D飛行、手動戦闘、8クラス、ソロおよび5/10人PvE、勢力PvP、探索、キャラクターカスタマイズを公式情報に基づいて整理します。",
      intro:
        "AION 2は飛行、立体空間、手動戦闘をMMORPGの探索と勢力戦に組み込みます。グローバル版Steamページでは8クラス、200以上のダンジョン、ソロと5/10人向けコンテンツが案内されています。",
      keywords: ["AION 2 ゲームプレイ", "AION 2 飛行戦闘", "AION 2 クラス", "AION 2 PvE", "AION 2 PvP"],
      sections: {
        "quick-answer": "AION 2はどのようなゲームですか？",
        "world-flight": "自由飛行は探索と戦闘をどう変えますか？",
        "combat-classes": "8クラスと手動戦闘の違いは？",
        "pve-pvp": "確認済みのPvE、PvP、サイドコンテンツは？",
        "global-boundary": "グローバル版で未確認のゲームプレイ要素は？",
        faq: "AION 2 ゲームプレイ よくある質問",
      },
    },
    "guides/aion-2-download": {
      eyebrow: "グローバル版インストール準備",
      title: "AION 2 ダウンロード：Steam/PURPLE公式、プリロード、導入手順",
      description:
        "AION 2の公式Steam/PURPLE経路、100 GBの空き容量、安全なインストール手順、未発表のグローバル版プリロード状況を確認します。",
      intro:
        "AION 2グローバル版の配信経路はSteamとPURPLEです。2026年7月26日時点で、NCはグローバル版のプリロード日、正確な開始時刻、圧縮後のダウンロード容量を発表していません。",
      keywords: ["AION 2 ダウンロード", "AION 2 Steam", "AION 2 PURPLE", "AION 2 プリロード", "AION 2 インストール"],
      sections: {
        "current-status": "AION 2グローバル版は今ダウンロードできますか？",
        "official-channels": "SteamとPURPLEの違いは？",
        "safe-steps": "AION 2を安全にダウンロードする方法は？",
        "regional-difference": "韓国・台湾版の手順をそのまま使えない理由は？",
        unknowns: "未発表のグローバル版ダウンロード情報は？",
        faq: "AION 2 ダウンロード よくある質問",
      },
    },
    "guides/aion-2-platforms": {
      eyebrow: "グローバル版対応機種",
      title: "AION 2 対応機種：PC、PS5、Xbox、モバイル、コントローラー",
      description:
        "AION 2グローバル版はSteam/PURPLEのPC版が確認済みです。PS5、Xbox、グローバル版モバイル、Steam Deck、コントローラー対応は未確認です。",
      intro:
        "NCはAION 2グローバル版をSteamとPURPLEで配信するPC版と説明しています。PS5、Xbox、Android、iPhone、グローバル版のネイティブモバイルクライアントは未発表です。",
      keywords: ["AION 2 対応機種", "AION 2 PC", "AION 2 PS5", "AION 2 Xbox", "AION 2 コントローラー"],
      sections: {
        "global-answer": "AION 2グローバル版で確認済みの対応機種は？",
        "platform-matrix": "PC、家庭用機、モバイル、Steam Deckの状況",
        "controller-status": "コントローラー対応は確認済みですか？",
        "mobile-difference": "AION 2モバイルの情報が存在する理由は？",
        "future-updates": "対応状況を更新する公式根拠は？",
        faq: "AION 2 対応機種 よくある質問",
      },
    },
    "guides/aion-2-server-status": {
      eyebrow: "グローバル版サーバー情報",
      title: "AION 2 サーバー状況：グローバル版、メンテナンス、開始情報",
      description:
        "AION 2のサーバー状況を推測で表示せず、北米、南米、欧州、日本の確認済み地域と、未発表のサーバー名、メンテナンス、人口情報を整理します。",
      intro:
        "現時点でAION 2グローバル版の検証可能なライブサーバー状況はありません。NCは北米、南米、欧州、日本を発表していますが、公開API、全ワールド一覧、リアルタイム人口、正確な開始時刻は未発表です。",
      keywords: ["AION 2 サーバー状況", "AION 2 グローバルサーバー", "AION 2 メンテナンス", "AION 2 開始時間", "AION 2 地域"],
      sections: {
        "status-answer": "AION 2グローバル版サーバーは稼働中ですか？",
        "confirmed-regions": "確認済みのグローバル版サーバー地域は？",
        "what-is-not-live": "推測のライブ状況を表示しない理由は？",
        "how-to-check": "開始後にメンテナンスを確認する方法は？",
        "status-model": "将来のライブ状況表示に必要なデータは？",
        faq: "AION 2 サーバー状況 よくある質問",
      },
    },
    "guides/aion-2-tier-list": {
      eyebrow: "バージョン別クラス比較",
      title: "AION 2 ティアリスト：グローバル版クラス評価方法と更新規則",
      description:
        "AION 2ティアリストでは根拠のない開始前S/A評価を掲載しません。PvE、PvP、パーティー貢献、難易度、8クラスをバージョン別に評価します。",
      intro:
        "現時点で信頼できるAION 2グローバル版ティアリストはありません。8クラスは確認済みですが、グローバル版のスキル数値、最終バランス、比較可能なテストが不足しています。",
      keywords: ["AION 2 ティアリスト", "AION 2 クラス", "AION 2 最強クラス", "AION 2 クラス評価", "AION 2 グローバル版"],
      sections: {
        answer: "信頼できるAION 2ティアリストはありますか？",
        "why-no-ranking": "韓国・台湾版の評価をグローバル版に使えない理由は？",
        "comparison-method": "AION 2ティアリストをどう評価しますか？",
        "eight-classes": "グローバル版8クラスで比較する項目は？",
        "update-policy": "グローバル版ランキングはいつ追加されますか？",
        faq: "AION 2 ティアリスト よくある質問",
      },
    },
    "classes/gladiator": {
      eyebrow: "クラスガイド｜公式情報と編集分析",
      title: "AION2 Gladiator Arcana・ビルドガイド",
      description:
        "AION2 Gladiatorの公式グレートソード役割、Arcana選択、PvE、PvP、RvR、操作難易度、バージョン別テスト範囲を整理します。",
      intro:
        "武器と役割はNC公式資料に基づきます。プレイスタイル、難易度、練習方法はKINAの編集分析であり、未確認のスキル名、係数、装備、ティアは作りません。",
      keywords: ["AION2 Gladiator", "Gladiator Arcana", "Gladiator ビルド", "Gladiator ガイド", "AION2 グレートソード"],
      sections: {
        "official-profile": "公式情報：武器とクラスの役割",
        "editorial-gameplay-loop": "KINA分析：練習できる戦闘ループ",
        "gladiator-arcana-selection": "Gladiator Arcana：固定リストより先に近接手段を確保",
        "editorial-scenarios": "KINA分析：PvE、PvP、RvRの場面",
        "editorial-difficulty": "操作難易度の評価であり、強さやティアではありません",
        "beginner-practice": "初心者向け練習順序",
        "common-mistakes": "よくあるミスと修正",
        "version-boundary": "バージョンと根拠の範囲",
      },
    },
    "classes/assassin": {
      eyebrow: "クラスガイド｜公式情報と編集分析",
      title: "AION2 Assassin Arcana・ビルドガイド",
      description:
        "AION2 Assassinの公式デュアルダガー役割、Arcana選択、接敵と離脱、PvE、PvP、RvR、バージョン別テスト範囲を整理します。",
      intro:
        "公式資料はデュアルダガーと短時間の圧力を示しますが、最適ローテーション、PvPティア、ダメージ順位は確定していません。練習提案は編集分析です。",
      keywords: ["AION2 Assassin", "Assassin Arcana", "Assassin ビルド", "Assassin ガイド", "AION2 デュアルダガー"],
      sections: {
        "official-profile": "公式情報：武器とクラスの役割",
        "editorial-gameplay-loop": "KINA分析：練習できる戦闘ループ",
        "assassin-arcana-selection": "Assassin Arcana：接敵、圧力、離脱を分けて確認",
        "editorial-scenarios": "KINA分析：PvE、PvP、RvRの場面",
        "editorial-difficulty": "操作難易度の評価であり、強さやティアではありません",
        "beginner-practice": "初心者向け練習順序",
        "common-mistakes": "よくあるミスと修正",
        "version-boundary": "バージョンと根拠の範囲",
      },
    },
    "classes/ranger": {
      eyebrow: "クラスガイド｜公式情報と編集分析",
      title: "AION2 Ranger スキルツリー・ビルドガイド",
      description:
        "AION2 Rangerの公式弓役割、スキル優先度、位置取り、PvE、PvP、RvR、バージョン別テスト範囲を整理します。",
      intro:
        "弓、遠距離攻撃、位置取り、タイミングは公式資料に基づきます。練習方法と難易度は編集分析であり、射程、スキル、ダメージ順位は作りません。",
      keywords: ["AION2 Ranger", "Ranger スキルツリー", "Ranger ビルド", "Ranger ガイド", "AION2 弓"],
      sections: {
        "official-profile": "公式情報：武器とクラスの役割",
        "editorial-gameplay-loop": "KINA分析：練習できる戦闘ループ",
        "ranger-skill-tree-priority": "Rangerの優先度：火力追加より先にビルドを安定化",
        "editorial-scenarios": "KINA分析：PvE、PvP、RvRの場面",
        "editorial-difficulty": "操作難易度の評価であり、強さやティアではありません",
        "beginner-practice": "初心者向け練習順序",
        "common-mistakes": "よくあるミスと修正",
        "version-boundary": "バージョンと根拠の範囲",
      },
    },
    "classes/sorcerer": {
      eyebrow: "クラスガイド｜公式情報と編集分析",
      title: "AION2 Sorcerer ビルド・スキル優先度ガイド",
      description:
        "AION2 Sorcererの公式魔法書役割、安全な詠唱、スキル優先度、PvE、PvP、RvR、再現可能なテスト範囲を整理します。",
      intro:
        "魔法書と短時間の魔法攻撃は公式資料に基づきます。安全な詠唱機会、難易度、練習順序は編集分析であり、スキルや係数は作りません。",
      keywords: ["AION2 Sorcerer", "Sorcerer ビルド", "Sorcerer スキル", "Sorcerer ガイド", "AION2 魔法書"],
      sections: {
        "official-profile": "公式情報：武器とクラスの役割",
        "editorial-gameplay-loop": "KINA分析：練習できる戦闘ループ",
        "sorcerer-versioned-build": "Sorcererビルド：ゲームバージョンごとに検証可能な構成を保存",
        "sorcerer-skill-priority": "Sorcerer優先度：安全性、機能、状況、理想火力",
        "editorial-scenarios": "KINA分析：PvE、PvP、RvRの場面",
        "editorial-difficulty": "操作難易度の評価であり、強さやティアではありません",
        "beginner-practice": "初心者向け練習順序",
        "common-mistakes": "よくあるミスと修正",
        "version-boundary": "バージョンと根拠の範囲",
      },
    },
    "guides/character-presets-style-shop": {
      eyebrow: "キャラクター外見",
      title: "AION2 キャラクター作成：プリセット、カスタマイズ、Style Shop",
      description:
        "AION2キャラクター作成の200以上の調整項目、内蔵プリセット、公式Style Shopを確認し、第三者プリセットの互換性を見極めます。",
      intro:
        "AION2のキャラクター作成には詳細なカスタマイズ、用意されたプリセット、公式Style Shopがあります。共有データを使う前にバージョン、地域、互換性を確認してください。",
      keywords: ["AION2 キャラクター作成", "AION2 プリセット", "AION2 カスタマイズ", "AION2 Style Shop"],
      sections: {
        "official-features": "NCが確認したキャラクターカスタマイズ機能",
        "safe-use": "外見の読み込み・再現前に確認することは？",
        "preset-workflow": "AION2の外見プリセットを安全に保存・再現する方法",
        "style-shop-boundary": "Style Shopページで確認できること・できないこと",
      },
    },
    "guides/global-monetization-watchlist": {
      eyebrow: "グローバル版 基本プレイ無料・課金仕様",
      title: "AION 2は基本プレイ無料？Membership、Kina、Quna、Daeva Pass",
      description:
        "AION 2グローバル版は基本プレイ無料を予定し、月額15ドルのMembership、市場とExchange利用、Kina、Quna、キャラクター別Daeva Passを計画しています。",
      intro:
        "AION 2グローバル版の基本ゲームは購入不要の基本プレイ無料で、SteamはFree To Playとゲーム内購入を表示しています。NCは月額15ドルのMembershipを計画していますが、全特典や交換比率は未発表です。",
      keywords: ["AION 2 基本プレイ無料", "AION 2 pay-to-win", "AION 2 Membership", "AION 2 Kina", "AION 2 Quna", "AION 2 Daeva Pass"],
      sections: {
        confirmed: "AION 2グローバル版は基本プレイ無料ですか？",
        "pay-to-win-assessment": "AION 2グローバル版はpay-to-winですか？現時点の結論は？",
        membership: "月額15ドル予定のMembershipで何が利用できますか？",
        "currencies-and-pass": "Kina、Quna、Exchange、Daeva Passの仕組みは？",
        "power-and-unknowns": "ショップは強さを販売しますか？未発表の項目は？",
        "shop-evaluation": "AION 2グローバル版の商品を開始時に再確認する方法",
      },
    },
  },
  "pt-br": {
    "database/aion-2-wiki": {
      eyebrow: "CENTRAL DE DADOS",
      title: "Wiki de AION 2: classes, itens, mapas, criação e guias globais",
      description:
        "O Wiki de AION 2 reúne classes, banco de itens, mapas interativos, calculadora de materiais, guias globais, datas das fontes e escopo regional.",
      intro:
        "O Wiki de AION 2 é o índice editorial com fontes da KINA, não um wiki oficial da NC. Ele conecta classes, itens, mapas, criação e guias com região, versão, data e fonte primária.",
      keywords: ["Wiki AION 2", "classes AION 2", "itens AION 2", "mapa interativo AION 2", "criação AION 2"],
      sections: {
        "what-this-hub-is": "O que você encontra no Wiki de AION 2?",
        "official-scope": "Quais fatos são oficiais e quais são trabalho editorial da KINA?",
        "use-the-hub": "Como usar o Wiki de AION 2?",
        "what-is-not-included": "Que informações o Wiki de AION 2 não inventa?",
        "wiki-faq": "Perguntas frequentes do Wiki de AION 2",
      },
    },
    "guides/aion-2-gameplay": {
      eyebrow: "VISÃO GERAL DA JOGABILIDADE GLOBAL",
      title: "Jogabilidade de AION 2: combate aéreo, classes, PvE, PvP e exploração",
      description:
        "Visão da jogabilidade de AION 2: voo 3D, combate manual, oito classes, PvE solo e para 5/10 jogadores, PvP de facções, exploração e personalização.",
      intro:
        "AION 2 combina voo, espaço vertical e combate manual com exploração de MMORPG e conflito de facções. A página global na Steam confirma oito classes, mais de 200 masmorras e modos solo e para 5/10 jogadores.",
      keywords: ["jogabilidade AION 2", "combate aéreo AION 2", "classes AION 2", "PvE AION 2", "PvP AION 2"],
      sections: {
        "quick-answer": "Que tipo de jogo é AION 2?",
        "world-flight": "Como o voo livre muda a exploração e o combate?",
        "combat-classes": "Como diferem as oito classes e o combate manual?",
        "pve-pvp": "Quais atividades PvE, PvP e secundárias estão confirmadas?",
        "global-boundary": "Quais detalhes da jogabilidade global ainda não foram confirmados?",
        faq: "Perguntas frequentes sobre a jogabilidade de AION 2",
      },
    },
    "guides/aion-2-download": {
      eyebrow: "PREPARAÇÃO DA INSTALAÇÃO GLOBAL",
      title: "Download de AION 2: Steam/PURPLE oficiais, pré-carregamento e instalação",
      description:
        "Guia de download de AION 2: canais oficiais Steam e PURPLE, 100 GB de armazenamento, instalação segura e pré-carregamento global ainda não anunciado.",
      intro:
        "Os canais globais confirmados são Steam e PURPLE. Em 26 de julho de 2026, a NC não anunciou a data de pré-carregamento global, o horário exato de abertura nem o tamanho compactado.",
      keywords: ["download AION 2", "AION 2 Steam", "AION 2 PURPLE", "pré-carregamento AION 2", "instalar AION 2"],
      sections: {
        "current-status": "Já é possível baixar AION 2 Global?",
        "official-channels": "Qual é a diferença entre Steam e PURPLE?",
        "safe-steps": "Como baixar AION 2 com segurança?",
        "regional-difference": "Por que não copiar as instruções da Coreia/Taiwan?",
        unknowns: "Quais detalhes do download global ainda não foram anunciados?",
        faq: "Perguntas frequentes sobre o download de AION 2",
      },
    },
    "guides/aion-2-platforms": {
      eyebrow: "VERIFICAÇÃO DAS PLATAFORMAS GLOBAIS",
      title: "Plataformas de AION 2: PC, PS5, Xbox, celular e controle",
      description:
        "AION 2 Global está confirmado para PC via Steam/PURPLE. PS5, Xbox, versão móvel global, Steam Deck e suporte a controle ainda não foram confirmados.",
      intro:
        "A NC descreve AION 2 Global como uma versão para PC distribuída pela Steam e PURPLE. PS5, Xbox, Android, iPhone e um cliente móvel global nativo ainda não foram anunciados.",
      keywords: ["plataformas AION 2", "AION 2 PC", "AION 2 PS5", "AION 2 Xbox", "controle AION 2"],
      sections: {
        "global-answer": "Quais plataformas de AION 2 Global estão confirmadas?",
        "platform-matrix": "Status de PC, consoles, celular e Steam Deck",
        "controller-status": "O suporte a controle está confirmado?",
        "mobile-difference": "Por que existem informações sobre AION 2 para celular?",
        "future-updates": "Quais provas oficiais podem mudar esse status?",
        faq: "Perguntas frequentes sobre plataformas de AION 2",
      },
    },
    "guides/aion-2-server-status": {
      eyebrow: "INFORMAÇÕES DOS SERVIDORES GLOBAIS",
      title: "Status dos servidores de AION 2: regiões, manutenção e lançamento",
      description:
        "A página de status de AION 2 não inventa disponibilidade ao vivo: América do Norte, América do Sul, Europa e Japão estão confirmados; nomes, manutenção e população ainda não.",
      intro:
        "Ainda não existe um status ao vivo verificável para os servidores globais de AION 2. A NC anunciou América do Norte, América do Sul, Europa e Japão, mas não uma API pública, lista completa de mundos, população ao vivo ou horário exato.",
      keywords: ["status dos servidores AION 2", "servidores AION 2 Global", "manutenção AION 2", "lançamento AION 2", "regiões AION 2"],
      sections: {
        "status-answer": "Os servidores globais de AION 2 estão online?",
        "confirmed-regions": "Quais regiões globais estão confirmadas?",
        "what-is-not-live": "Por que não mostramos um status ao vivo inventado?",
        "how-to-check": "Como verificar manutenção após o lançamento?",
        "status-model": "O que um futuro status ao vivo exige?",
        faq: "Perguntas frequentes sobre o status de AION 2",
      },
    },
    "guides/aion-2-tier-list": {
      eyebrow: "COMPARAÇÃO DE CLASSES POR VERSÃO",
      title: "Tier list de AION 2: método de classificação global e atualizações",
      description:
        "A tier list de AION 2 não publica notas S/A sem provas antes do lançamento. Método por versão para PvE, PvP, valor em grupo, dificuldade e oito classes.",
      intro:
        "Ainda não existe uma tier list confiável para AION 2 Global. Oito classes estão confirmadas, mas faltam valores globais de habilidades, versão final de balanceamento e testes comparáveis.",
      keywords: ["tier list AION 2", "classes AION 2", "melhor classe AION 2", "ranking AION 2", "AION 2 Global"],
      sections: {
        answer: "Já existe uma tier list confiável de AION 2?",
        "why-no-ranking": "Por que um ranking da Coreia/Taiwan não representa Global?",
        "comparison-method": "Como avaliar uma tier list de AION 2?",
        "eight-classes": "O que comparar entre as oito classes globais?",
        "update-policy": "Quando o ranking global será adicionado?",
        faq: "Perguntas frequentes da tier list de AION 2",
      },
    },
    "classes/gladiator": {
      eyebrow: "GUIA DE CLASSE | FATOS OFICIAIS E ANÁLISE",
      title: "Guia de Arcana e build de AION2 Gladiator",
      description:
        "Guia por versão de AION2 Gladiator: função oficial com espada grande, escolha de Arcana, PvE, PvP, RvR, dificuldade e limites de teste.",
      intro:
        "Arma e função vêm de fontes oficiais da NC. Estilo, dificuldade e prática são análise da KINA; habilidades, coeficientes, equipamento e tiers não verificados não são inventados.",
      keywords: ["AION2 Gladiator", "Arcana Gladiator", "build Gladiator", "guia Gladiator AION2", "espada grande AION2"],
      sections: {
        "official-profile": "Fato oficial: arma e função da classe",
        "editorial-gameplay-loop": "Análise KINA: ciclo de combate praticável",
        "gladiator-arcana-selection": "Arcana de Gladiator: garantir acesso corpo a corpo antes de copiar listas",
        "editorial-scenarios": "Análise KINA: cenários PvE, PvP e RvR",
        "editorial-difficulty": "Dificuldade de execução, não poder ou tier",
        "beginner-practice": "Ordem de prática para iniciantes",
        "common-mistakes": "Erros comuns e correções",
        "version-boundary": "Limites de versão e evidência",
      },
    },
    "classes/assassin": {
      eyebrow: "GUIA DE CLASSE | FATOS OFICIAIS E ANÁLISE",
      title: "Guia de Arcana e build de AION2 Assassin",
      description:
        "Guia por versão de AION2 Assassin: função oficial com duas adagas, escolha de Arcana, ritmo de entrada e saída, PvE, PvP, RvR e limites de teste.",
      intro:
        "Fontes oficiais confirmam duas adagas e pressão em janelas curtas, mas não uma rotação ideal, tier PvP ou ranking de dano. As recomendações são editoriais.",
      keywords: ["AION2 Assassin", "Arcana Assassin", "build Assassin", "guia Assassin AION2", "duas adagas AION2"],
      sections: {
        "official-profile": "Fato oficial: arma e função da classe",
        "editorial-gameplay-loop": "Análise KINA: ciclo de combate praticável",
        "assassin-arcana-selection": "Arcana de Assassin: testar entrada, pressão e saída separadamente",
        "editorial-scenarios": "Análise KINA: cenários PvE, PvP e RvR",
        "editorial-difficulty": "Dificuldade de execução, não poder ou tier",
        "beginner-practice": "Ordem de prática para iniciantes",
        "common-mistakes": "Erros comuns e correções",
        "version-boundary": "Limites de versão e evidência",
      },
    },
    "classes/ranger": {
      eyebrow: "GUIA DE CLASSE | FATOS OFICIAIS E ANÁLISE",
      title: "Guia de árvore de habilidades e build de AION2 Ranger",
      description:
        "Guia por versão de AION2 Ranger: função oficial com arco, prioridade de habilidades, posicionamento, PvE, PvP, RvR e limites de teste.",
      intro:
        "Arco, ataques à distância, posicionamento e tempo vêm de fontes oficiais. Prática e dificuldade são editoriais; alcance, habilidades e ranking de dano não são inventados.",
      keywords: ["AION2 Ranger", "árvore de habilidades Ranger", "build Ranger", "guia Ranger AION2", "arco AION2"],
      sections: {
        "official-profile": "Fato oficial: arma e função da classe",
        "editorial-gameplay-loop": "Análise KINA: ciclo de combate praticável",
        "ranger-skill-tree-priority": "Prioridade de Ranger: tornar o build confiável antes de aumentar o dano",
        "editorial-scenarios": "Análise KINA: cenários PvE, PvP e RvR",
        "editorial-difficulty": "Dificuldade de execução, não poder ou tier",
        "beginner-practice": "Ordem de prática para iniciantes",
        "common-mistakes": "Erros comuns e correções",
        "version-boundary": "Limites de versão e evidência",
      },
    },
    "classes/sorcerer": {
      eyebrow: "GUIA DE CLASSE | FATOS OFICIAIS E ANÁLISE",
      title: "Guia de build e prioridade de habilidades de AION2 Sorcerer",
      description:
        "Guia por versão de AION2 Sorcerer: função oficial com grimório, conjuração segura, prioridades, PvE, PvP, RvR e limites verificáveis.",
      intro:
        "Fontes oficiais confirmam o grimório e magia em janelas curtas. Conjuração segura, dificuldade e prática são editoriais; habilidades e coeficientes não são inventados.",
      keywords: ["AION2 Sorcerer", "build Sorcerer", "habilidades Sorcerer", "guia Sorcerer AION2", "grimório AION2"],
      sections: {
        "official-profile": "Fato oficial: arma e função da classe",
        "editorial-gameplay-loop": "Análise KINA: ciclo de combate praticável",
        "sorcerer-versioned-build": "Build de Sorcerer: uma configuração verificável por versão",
        "sorcerer-skill-priority": "Prioridade de Sorcerer: segurança, função, contexto e dano",
        "editorial-scenarios": "Análise KINA: cenários PvE, PvP e RvR",
        "editorial-difficulty": "Dificuldade de execução, não poder ou tier",
        "beginner-practice": "Ordem de prática para iniciantes",
        "common-mistakes": "Erros comuns e correções",
        "version-boundary": "Limites de versão e evidência",
      },
    },
    "guides/character-presets-style-shop": {
      eyebrow: "APARÊNCIA DO PERSONAGEM",
      title: "Criação de personagem em AION2: predefinições, personalização e Style Shop",
      description:
        "Use mais de 200 controles de criação de personagem em AION2, predefinições internas e o Style Shop oficial, verificando a compatibilidade de modelos externos.",
      intro:
        "A criação de personagem em AION2 inclui personalização detalhada, predefinições prontas e o Style Shop oficial. Verifique versão, região e compatibilidade antes de usar dados compartilhados.",
      keywords: ["criação de personagem AION2", "predefinições AION2", "personalização AION2", "Style Shop AION2"],
      sections: {
        "official-features": "Recursos de personalização confirmados pela NC",
        "safe-use": "O que verificar antes de importar ou recriar uma aparência?",
        "preset-workflow": "Como salvar e recriar uma predefinição de AION2 com segurança",
        "style-shop-boundary": "O que a página Style Shop confirma e não confirma",
      },
    },
    "guides/global-monetization-watchlist": {
      eyebrow: "GRATUITO PARA JOGAR E MONETIZAÇÃO GLOBAL",
      title: "AION 2 é gratuito? Membership, Kina, Quna e Daeva Pass",
      description:
        "AION 2 Global está planejado como gratuito para jogar, com assinatura Membership mensal de US$ 15, acesso ao Mercado e Exchange, Kina, Quna e Daeva Pass por personagem.",
      intro:
        "O jogo base de AION 2 Global será gratuito e sem compra inicial; a Steam informa Free To Play e compras no aplicativo. A NC planeja uma assinatura Membership de US$ 15 por mês, mas benefícios e taxas completas ainda não foram publicados.",
      keywords: ["AION 2 gratuito", "AION 2 pay-to-win", "AION 2 Membership", "AION 2 Kina", "AION 2 Quna", "AION 2 Daeva Pass"],
      sections: {
        confirmed: "AION 2 Global será gratuito para jogar?",
        "pay-to-win-assessment": "AION 2 Global será pay-to-win e o que já pode ser concluído?",
        membership: "O que a assinatura Membership planejada de US$ 15 libera?",
        "currencies-and-pass": "Como funcionam Kina, Quna, Exchange e Daeva Pass?",
        "power-and-unknowns": "A loja vende poder e o que ainda não foi anunciado?",
        "shop-evaluation": "Como conferir novamente os produtos globais no lançamento?",
      },
    },
  },
  ru: {
    "database/aion-2-wiki": {
      eyebrow: "ЦЕНТР ДАННЫХ",
      title: "AION 2 Wiki: классы, предметы, карты, крафт и гайды глобальной версии",
      description:
        "AION 2 Wiki объединяет классы, базу предметов, интерактивные карты, калькулятор материалов, гайды глобальной версии, даты источников и региональный охват.",
      intro:
        "AION 2 Wiki — редакционный индекс KINA со ссылками на источники, а не официальный wiki NC. Он связывает классы, предметы, карты, крафт и гайды с регионом, версией, датой проверки и первоисточником.",
      keywords: ["AION 2 Wiki", "классы AION 2", "предметы AION 2", "карта AION 2", "крафт AION 2"],
      sections: {
        "what-this-hub-is": "Что можно найти в AION 2 Wiki?",
        "official-scope": "Какие сведения официальны, а какие подготовлены KINA?",
        "use-the-hub": "Как пользоваться AION 2 Wiki?",
        "what-is-not-included": "Какие сведения AION 2 Wiki не придумывает?",
        "wiki-faq": "Частые вопросы об AION 2 Wiki",
      },
    },
    "guides/aion-2-gameplay": {
      eyebrow: "ОБЗОР ГЛОБАЛЬНОЙ ВЕРСИИ",
      title: "Геймплей AION 2: воздушный бой, классы, PvE, PvP и исследование",
      description:
        "Обзор геймплея AION 2: трёхмерный полёт, ручной бой, восемь классов, одиночное и групповое PvE на 5/10 игроков, фракционное PvP, исследование и настройка персонажа.",
      intro:
        "AION 2 объединяет полёт, вертикальное пространство и ручной бой с исследованием MMORPG и войной фракций. Страница глобальной версии в Steam подтверждает восемь классов, более 200 подземелий и форматы для одного, 5 и 10 игроков.",
      keywords: ["геймплей AION 2", "воздушный бой AION 2", "классы AION 2", "PvE AION 2", "PvP AION 2"],
      sections: {
        "quick-answer": "Что за игра AION 2?",
        "world-flight": "Как свободный полёт меняет исследование и бой?",
        "combat-classes": "Чем отличаются восемь классов и ручной бой?",
        "pve-pvp": "Какие PvE-, PvP- и дополнительные активности подтверждены?",
        "global-boundary": "Какие детали глобального геймплея ещё не подтверждены?",
        faq: "Частые вопросы о геймплее AION 2",
      },
    },
    "guides/aion-2-download": {
      eyebrow: "ПОДГОТОВКА К УСТАНОВКЕ ГЛОБАЛЬНОЙ ВЕРСИИ",
      title: "Загрузка AION 2: официальные Steam/PURPLE, предзагрузка и установка",
      description:
        "Гайд по загрузке AION 2: официальные каналы Steam и PURPLE, 100 ГБ места, безопасная установка и ещё не объявленная предзагрузка глобальной версии.",
      intro:
        "Для AION 2 Global подтверждены Steam и PURPLE. На 26 июля 2026 года NC не объявила дату предзагрузки глобальной версии, точное время запуска или размер сжатой загрузки.",
      keywords: ["загрузка AION 2", "AION 2 Steam", "AION 2 PURPLE", "предзагрузка AION 2", "установка AION 2"],
      sections: {
        "current-status": "Можно ли уже загрузить AION 2 Global?",
        "official-channels": "Чем отличаются официальные Steam и PURPLE?",
        "safe-steps": "Как безопасно загрузить AION 2?",
        "regional-difference": "Почему инструкции Кореи/Тайваня не подходят автоматически?",
        unknowns: "Какие сведения о загрузке глобальной версии ещё неизвестны?",
        faq: "Частые вопросы о загрузке AION 2",
      },
    },
    "guides/aion-2-platforms": {
      eyebrow: "ПЛАТФОРМЫ ГЛОБАЛЬНОЙ ВЕРСИИ",
      title: "Платформы AION 2: PC, PS5, Xbox, мобильные устройства и контроллер",
      description:
        "AION 2 Global подтверждена для PC через Steam/PURPLE. PS5, Xbox, глобальная мобильная версия, Steam Deck и поддержка контроллера пока не подтверждены.",
      intro:
        "NC описывает AION 2 Global как PC-версию в Steam и PURPLE. PS5, Xbox, Android, iPhone и отдельный мобильный клиент глобальной версии ещё не объявлены.",
      keywords: ["платформы AION 2", "AION 2 PC", "AION 2 PS5", "AION 2 Xbox", "контроллер AION 2"],
      sections: {
        "global-answer": "Какие платформы AION 2 Global подтверждены?",
        "platform-matrix": "Статус PC, консолей, мобильных устройств и Steam Deck",
        "controller-status": "Подтверждена ли поддержка контроллера?",
        "mobile-difference": "Почему в сети есть сведения о мобильной AION 2?",
        "future-updates": "Какие официальные данные могут изменить статус?",
        faq: "Частые вопросы о платформах AION 2",
      },
    },
    "guides/aion-2-server-status": {
      eyebrow: "СЕРВЕРЫ ГЛОБАЛЬНОЙ ВЕРСИИ",
      title: "Статус серверов AION 2: регионы, обслуживание и запуск",
      description:
        "Страница статуса AION 2 не придумывает доступность: подтверждены Северная Америка, Южная Америка, Европа и Япония; названия, обслуживание и население ещё не объявлены.",
      intro:
        "Проверяемого статуса серверов AION 2 Global в реальном времени пока нет. NC объявила Северную Америку, Южную Америку, Европу и Японию, но не опубликовала API, полный список миров, население или точное время запуска.",
      keywords: ["статус серверов AION 2", "серверы AION 2 Global", "обслуживание AION 2", "запуск AION 2", "регионы AION 2"],
      sections: {
        "status-answer": "Серверы AION 2 Global уже работают?",
        "confirmed-regions": "Какие регионы глобальных серверов подтверждены?",
        "what-is-not-live": "Почему мы не показываем выдуманный статус?",
        "how-to-check": "Как проверять обслуживание после запуска?",
        "status-model": "Что нужно для будущего статуса в реальном времени?",
        faq: "Частые вопросы о статусе серверов AION 2",
      },
    },
    "guides/aion-2-tier-list": {
      eyebrow: "СРАВНЕНИЕ КЛАССОВ ПО ВЕРСИЯМ",
      title: "Тир-лист AION 2: метод рейтинга глобальных классов и обновления",
      description:
        "Тир-лист AION 2 не публикует ранги S/A без доказательств до запуска. Метод по версиям для PvE, PvP, пользы группе, сложности и восьми классов.",
      intro:
        "Надёжного тир-листа AION 2 Global пока нет. Восемь классов подтверждены, но отсутствуют глобальные значения навыков, финальная версия баланса и сопоставимые тесты.",
      keywords: ["тир-лист AION 2", "классы AION 2", "лучший класс AION 2", "рейтинг AION 2", "AION 2 Global"],
      sections: {
        answer: "Есть ли уже надёжный тир-лист AION 2?",
        "why-no-ranking": "Почему рейтинг Кореи/Тайваня не представляет Global?",
        "comparison-method": "Как оценивать тир-лист AION 2?",
        "eight-classes": "Что сравнивать у восьми глобальных классов?",
        "update-policy": "Когда будет добавлен глобальный рейтинг?",
        faq: "Частые вопросы о тир-листе AION 2",
      },
    },
    "classes/gladiator": {
      eyebrow: "ГАЙД ПО КЛАССУ | ОФИЦИАЛЬНЫЕ ФАКТЫ И АНАЛИЗ",
      title: "Гайд AION2 Gladiator: Arcana и билд",
      description:
        "Гайд AION2 Gladiator по версиям: официальная роль с двуручным мечом, выбор Arcana, PvE, PvP, RvR, сложность и границы тестов.",
      intro:
        "Оружие и роль подтверждены официальными источниками NC. Стиль, сложность и упражнения — анализ KINA; неподтверждённые навыки, коэффициенты, экипировка и тиры не выдумываются.",
      keywords: ["AION2 Gladiator", "Arcana Gladiator", "билд Gladiator", "гайд Gladiator AION2", "двуручный меч AION2"],
      sections: {
        "official-profile": "Официальный факт: оружие и роль класса",
        "editorial-gameplay-loop": "Анализ KINA: практический боевой цикл",
        "gladiator-arcana-selection": "Arcana Gladiator: сначала обеспечить вход в ближний бой",
        "editorial-scenarios": "Анализ KINA: ситуации PvE, PvP и RvR",
        "editorial-difficulty": "Сложность исполнения, а не сила или тир",
        "beginner-practice": "Порядок тренировки для новичка",
        "common-mistakes": "Частые ошибки и исправления",
        "version-boundary": "Границы версии и доказательств",
      },
    },
    "classes/assassin": {
      eyebrow: "ГАЙД ПО КЛАССУ | ОФИЦИАЛЬНЫЕ ФАКТЫ И АНАЛИЗ",
      title: "Гайд AION2 Assassin: Arcana и билд",
      description:
        "Гайд AION2 Assassin по версиям: официальная роль с парными кинжалами, выбор Arcana, ритм входа и выхода, PvE, PvP, RvR и границы тестов.",
      intro:
        "Официальные источники подтверждают парные кинжалы и давление в коротких окнах, но не лучшую ротацию, PvP-тир или рейтинг урона. Рекомендации являются редакционными.",
      keywords: ["AION2 Assassin", "Arcana Assassin", "билд Assassin", "гайд Assassin AION2", "парные кинжалы AION2"],
      sections: {
        "official-profile": "Официальный факт: оружие и роль класса",
        "editorial-gameplay-loop": "Анализ KINA: практический боевой цикл",
        "assassin-arcana-selection": "Arcana Assassin: отдельно проверить вход, давление и выход",
        "editorial-scenarios": "Анализ KINA: ситуации PvE, PvP и RvR",
        "editorial-difficulty": "Сложность исполнения, а не сила или тир",
        "beginner-practice": "Порядок тренировки для новичка",
        "common-mistakes": "Частые ошибки и исправления",
        "version-boundary": "Границы версии и доказательств",
      },
    },
    "classes/ranger": {
      eyebrow: "ГАЙД ПО КЛАССУ | ОФИЦИАЛЬНЫЕ ФАКТЫ И АНАЛИЗ",
      title: "Гайд AION2 Ranger: дерево навыков и билд",
      description:
        "Гайд AION2 Ranger по версиям: официальная роль с луком, приоритет навыков, позиционирование, PvE, PvP, RvR и границы тестов.",
      intro:
        "Лук, дальние атаки, позиционирование и выбор момента подтверждены официальными источниками. Тренировка и сложность редакционные; дальность, навыки и рейтинг урона не выдумываются.",
      keywords: ["AION2 Ranger", "дерево навыков Ranger", "билд Ranger", "гайд Ranger AION2", "лук AION2"],
      sections: {
        "official-profile": "Официальный факт: оружие и роль класса",
        "editorial-gameplay-loop": "Анализ KINA: практический боевой цикл",
        "ranger-skill-tree-priority": "Приоритет Ranger: сначала сделать билд надёжным",
        "editorial-scenarios": "Анализ KINA: ситуации PvE, PvP и RvR",
        "editorial-difficulty": "Сложность исполнения, а не сила или тир",
        "beginner-practice": "Порядок тренировки для новичка",
        "common-mistakes": "Частые ошибки и исправления",
        "version-boundary": "Границы версии и доказательств",
      },
    },
    "classes/sorcerer": {
      eyebrow: "ГАЙД ПО КЛАССУ | ОФИЦИАЛЬНЫЕ ФАКТЫ И АНАЛИЗ",
      title: "Гайд AION2 Sorcerer: билд и приоритет навыков",
      description:
        "Гайд AION2 Sorcerer по версиям: официальная роль с книгой заклинаний, безопасное применение, приоритеты, PvE, PvP, RvR и проверяемые границы.",
      intro:
        "Официальные источники подтверждают книгу заклинаний и магию в коротких окнах. Безопасное применение, сложность и тренировка редакционные; навыки и коэффициенты не выдумываются.",
      keywords: ["AION2 Sorcerer", "билд Sorcerer", "навыки Sorcerer", "гайд Sorcerer AION2", "книга заклинаний AION2"],
      sections: {
        "official-profile": "Официальный факт: оружие и роль класса",
        "editorial-gameplay-loop": "Анализ KINA: практический боевой цикл",
        "sorcerer-versioned-build": "Билд Sorcerer: проверяемая схема для каждой версии",
        "sorcerer-skill-priority": "Приоритет Sorcerer: безопасность, функция, ситуация и урон",
        "editorial-scenarios": "Анализ KINA: ситуации PvE, PvP и RvR",
        "editorial-difficulty": "Сложность исполнения, а не сила или тир",
        "beginner-practice": "Порядок тренировки для новичка",
        "common-mistakes": "Частые ошибки и исправления",
        "version-boundary": "Границы версии и доказательств",
      },
    },
    "guides/character-presets-style-shop": {
      eyebrow: "ВНЕШНОСТЬ ПЕРСОНАЖА",
      title: "Создание персонажа AION2: шаблоны, настройка и Style Shop",
      description:
        "Используйте более 200 настроек создания персонажа AION2, встроенные шаблоны и официальный Style Shop, проверяя совместимость сторонних вариантов.",
      intro:
        "Создание персонажа AION2 включает подробную настройку, готовые шаблоны и официальный Style Shop. Перед использованием общих данных проверьте версию, регион и совместимость.",
      keywords: ["создание персонажа AION2", "шаблоны AION2", "настройка AION2", "Style Shop AION2"],
      sections: {
        "official-features": "Функции настройки, подтверждённые NC",
        "safe-use": "Что проверить перед импортом или повторением внешности?",
        "preset-workflow": "Как безопасно сохранить и повторить шаблон внешности AION2",
        "style-shop-boundary": "Что подтверждает и не подтверждает страница Style Shop",
      },
    },
    "guides/global-monetization-watchlist": {
      eyebrow: "FREE-TO-PLAY И МОНЕТИЗАЦИЯ GLOBAL",
      title: "AION 2 — free-to-play? Membership, Kina, Quna и Daeva Pass",
      description:
        "AION 2 Global планируется как бесплатная игра с подпиской Membership за 15 $ в месяц, доступом к Market и Exchange, Kina, Quna и Daeva Pass для каждого персонажа.",
      intro:
        "Базовая AION 2 Global будет бесплатной и не потребует покупки; Steam указывает Free To Play и внутриигровые покупки. NC планирует Membership за 15 $ в месяц, но полный список преимуществ и курсы ещё не опубликованы.",
      keywords: ["AION 2 free-to-play", "AION 2 pay-to-win", "AION 2 Membership", "AION 2 Kina", "AION 2 Quna", "AION 2 Daeva Pass"],
      sections: {
        confirmed: "AION 2 Global будет бесплатной?",
        "pay-to-win-assessment": "Будет ли AION 2 Global pay-to-win и что уже известно?",
        membership: "Что откроет планируемая подписка Membership за 15 $?",
        "currencies-and-pass": "Как работают Kina, Quna, Exchange и Daeva Pass?",
        "power-and-unknowns": "Продаёт ли магазин силу и что ещё неизвестно?",
        "shop-evaluation": "Как повторно проверить товары AION 2 Global при запуске?",
      },
    },
  },
};

const downloadAction = {
  "zh-hans": {
    eyebrow: "官方下载安装状态",
    title: "下载前先查看 Steam 官方页面",
    description:
      "Steam 全球服页面已列出系统要求、语言与商店状态，但尚不能证明游戏文件或 PURPLE 全球服预载已经开放。",
    label: "打开 AION 2 Steam 官方页面",
    note: "NC 公布全球服 PURPLE 安装程序或预载公告后，KINA 会补充已核验链接。",
    facts: [
      { label: "全球平台", value: "Windows PC 上的 Steam / PURPLE" },
      { label: "存储空间", value: "需要 100 GB 可用空间" },
      { label: "全球预下载", value: "尚未公布" },
    ],
  },
  fr: {
    eyebrow: "STATUT DU TÉLÉCHARGEMENT OFFICIEL",
    title: "Vérifiez la page Steam officielle avant tout téléchargement",
    description:
      "La page Steam Global confirme la configuration, les langues et l’état de la boutique, mais pas encore la disponibilité des fichiers ni d’un préchargement PURPLE Global.",
    label: "Ouvrir la page Steam officielle d’AION 2",
    note: "KINA ajoutera le lien PURPLE Global vérifié après publication par NC.",
    facts: [
      { label: "Plateformes mondiales", value: "Steam / PURPLE sur PC Windows" },
      { label: "Stockage", value: "100 Go d’espace disponible" },
      { label: "Préchargement mondial", value: "Non annoncé" },
    ],
  },
  de: {
    eyebrow: "OFFIZIELLER DOWNLOADSTATUS",
    title: "Vor dem Download die offizielle Steam-Seite prüfen",
    description:
      "Die Global-Seite auf Steam bestätigt Anforderungen, Sprachen und Shopstatus, jedoch noch keine verfügbaren Dateien oder einen Global-PURPLE-Preload.",
    label: "Offizielle AION-2-Seite auf Steam öffnen",
    note: "KINA ergänzt den geprüften Global-PURPLE-Link nach der Veröffentlichung durch NC.",
    facts: [
      { label: "Globale Plattformen", value: "Steam / PURPLE auf Windows-PC" },
      { label: "Speicherplatz", value: "100 GB freier Speicher" },
      { label: "Globaler Preload", value: "Noch nicht angekündigt" },
    ],
  },
  es: {
    eyebrow: "ESTADO DE DESCARGA OFICIAL",
    title: "Consulta la página oficial de Steam antes de descargar",
    description:
      "La página global de Steam confirma requisitos, idiomas y estado de la tienda, pero aún no demuestra que estén disponibles los archivos o la precarga global de PURPLE.",
    label: "Abrir la página oficial de AION 2 en Steam",
    note: "KINA añadirá el enlace global verificado de PURPLE cuando NC lo publique.",
    facts: [
      { label: "Plataformas globales", value: "Steam / PURPLE en PC Windows" },
      { label: "Almacenamiento", value: "100 GB de espacio disponible" },
      { label: "Precarga global", value: "Aún no anunciada" },
    ],
  },
  ja: {
    eyebrow: "公式ダウンロード状況",
    title: "ダウンロード前にSteam公式ページを確認",
    description:
      "Steamグローバル版ページでは必要環境、言語、ストア状況を確認できますが、ゲームファイルやPURPLEのグローバル版プリロード開始は未確認です。",
    label: "AION 2のSteam公式ページを開く",
    note: "NCがグローバル版PURPLEの導入・プリロード情報を公開後、KINAが確認済みリンクを追加します。",
    facts: [
      { label: "グローバル版プラットフォーム", value: "Windows PCのSteam / PURPLE" },
      { label: "ストレージ", value: "100 GBの空き容量" },
      { label: "グローバル版プリロード", value: "未発表" },
    ],
  },
  "pt-br": {
    eyebrow: "STATUS OFICIAL DO DOWNLOAD",
    title: "Confira a página oficial da Steam antes de baixar",
    description:
      "A página global na Steam confirma requisitos, idiomas e status da loja, mas ainda não prova a disponibilidade dos arquivos ou do pré-carregamento global no PURPLE.",
    label: "Abrir a página oficial de AION 2 na Steam",
    note: "A KINA adicionará o link global verificado do PURPLE após a publicação pela NC.",
    facts: [
      { label: "Plataformas globais", value: "Steam / PURPLE em PC Windows" },
      { label: "Armazenamento", value: "100 GB de espaço disponível" },
      { label: "Pré-carregamento global", value: "Ainda não anunciado" },
    ],
  },
  ru: {
    eyebrow: "ОФИЦИАЛЬНЫЙ СТАТУС ЗАГРУЗКИ",
    title: "Перед загрузкой проверьте официальную страницу в Steam",
    description:
      "Глобальная страница в Steam подтверждает требования, языки и статус магазина, но ещё не подтверждает доступность файлов или предзагрузки Global в PURPLE.",
    label: "Открыть официальную страницу AION 2 в Steam",
    note: "KINA добавит проверенную ссылку PURPLE Global после публикации NC.",
    facts: [
      { label: "Платформы глобальной версии", value: "Steam / PURPLE на Windows PC" },
      { label: "Место на диске", value: "100 ГБ свободного места" },
      { label: "Предзагрузка глобальной версии", value: "Ещё не объявлена" },
    ],
  },
};

const source = JSON.parse(await readFile(sourcePath, "utf8"));
const generated = JSON.parse(await readFile(generatedPath, "utf8"));
const identities = Object.keys(source.entries);

if (identities.length !== 12) {
  throw new Error(`Expected 12 targeted identities, received ${identities.length}`);
}

for (const locale of locales) {
  const shardPath = path.join(shardDir, `${locale}.json`);
  const shard = JSON.parse(await readFile(shardPath, "utf8"));
  const localeChrome = chrome[locale];
  const localeOverrides = overrides[locale];

  for (const identity of identities) {
    const english = source.entries[identity];
    const localized = localeOverrides[identity];
    if (!localized) {
      throw new Error(`${locale}.${identity} is missing a reviewed override`);
    }

    const sourceSectionIds = english.content.sections.map((section) => section.id);
    const localizedSectionIds = Object.keys(localized.sections);
    if (
      sourceSectionIds.length !== localizedSectionIds.length ||
      sourceSectionIds.some((id) => !localizedSectionIds.includes(id))
    ) {
      throw new Error(`${locale}.${identity} section title map does not match source`);
    }

    const minutes =
      Number.parseInt(english.content.readingTime, 10) ||
      Math.max(3, Math.round(english.content.sections.length * 1.2));
    const content = {
      ...structuredClone(english.content),
      byline: "PFG",
      backLabel: localeChrome.backLabel,
      contentsLabel: localeChrome.contentsLabel,
      publishedLabel: localeChrome.publishedLabel,
      updatedLabel: localeChrome.updatedLabel,
      relatedLabel: localeChrome.relatedLabel,
      readingTime: localeChrome.readingTime(minutes),
      eyebrow: localized.eyebrow,
      title: localized.title,
      description: localized.description,
      intro: `${localized.intro} ${localeChrome.translationNote}`,
      sourceNote: localeChrome.sourceNote,
      keywords: localized.keywords,
      sections: english.content.sections.map((section) => ({
        ...structuredClone(section),
        title: localized.sections[section.id],
      })),
    };

    const value = {
      content,
      heroImage: english.heroImage
        ? {
            alt: localeChrome.heroAlt(localized.title),
            caption: localeChrome.heroCaption,
          }
        : undefined,
      primaryAction:
        identity === "guides/aion-2-download"
          ? downloadAction[locale]
          : english.primaryAction
            ? structuredClone(english.primaryAction)
            : undefined,
      sourceLabels: Object.fromEntries(
        Object.keys(english.sourceLabels ?? {}).map((sourceId) => [
          sourceId,
          localeChrome.sourceLabel(sourceId.includes("steam")),
        ]),
      ),
    };

    shard.entries[identity] = value;
    generated.entries[identity] ??= {};
    generated.entries[identity][locale] = value;
  }

  await writeFile(shardPath, `${JSON.stringify(shard, null, 2)}\n`, "utf8");
}

generated.generatedAt = "2026-07-26";
await writeFile(
  generatedPath,
  `${JSON.stringify(generated, null, 2)}\n`,
  "utf8",
);

console.log(
  `Applied reviewed safe localization fields to ${identities.length} identities across ${locales.length} locales`,
);
