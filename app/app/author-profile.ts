import { localizedHref, type SiteLocale } from "./site-config";
import { validateSiteOrigin } from "./site-origin";

export const PFG_AUTHOR_NAME = "PFG";
export const PFG_AUTHOR_PATH = "/author/pfg/";
export const PFG_AUTHOR_AVATAR = {
  src: "/pfg-avatar.webp",
  width: 512,
  height: 512,
} as const;
export const PFG_AUTHOR_PUBLISHED_AT = "2026-07-24";
export const PFG_AUTHOR_MODIFIED_AT = "2026-07-26";

type PfgAuthorCopy = {
  jobTitle: string;
  description: string;
  bio: string;
  avatarAlt: string;
  disclosure: string;
  profileTitle: string;
};

function absoluteAuthorUrl(path: string, origin: string | null) {
  const internalPath = `/${path.replace(/^\/+/, "")}`;
  const validatedOrigin = validateSiteOrigin(origin);
  return validatedOrigin
    ? new URL(internalPath, `${validatedOrigin}/`).toString()
    : internalPath;
}

export const pfgAuthorCopy: Record<SiteLocale, PfgAuthorCopy> = {
  "zh-hans": {
    jobTitle: "网站作者",
    description:
      "PFG 是 AION2 KINA 使用的公开笔名与网站作者，负责核对一手来源、记录版本与地区范围，并维护本站十种语言版本的编辑内容与更正记录。地图点位由 PFG 与 AION2 KINA 整理、在游戏内复核，并结合 NC 官方资料核对；物品官方原始数据主要来自繁体中文、英文及韩文，页面会标明来源语言与回退显示。",
    bio:
      "PFG 以公开笔名整理 AION2 KINA 内容，优先核对 NC 与平台的一手资料，并区分已确认事实与编辑判断。",
    avatarAlt: "PFG 的插画风格作者头像",
    disclosure:
      "PFG 是本站公开笔名；头像为原创插画，并非本人照片，也不代表任何未经证实的资历或官方关系。",
    profileTitle: "PFG｜AION2 KINA 网站作者",
  },
  "zh-hant": {
    jobTitle: "網站作者",
    description:
      "PFG 是 AION2 KINA 的公開筆名與網站作者，負責核對 NC 與平台的一手來源、標示適用版本與地區，並維護十種語言的攻略、新聞、工具說明及更正紀錄。內容以可公開核對的資料為優先，並區分已確認事實、編輯判斷與社群發現；資訊可能變動時會列出核對日期與修正方式。",
    bio:
      "PFG 以公開筆名為 AION2 KINA 撰寫與整理內容。編輯工作優先核對 NC 與平台的一手來源，清楚區分已確認的事實與編輯判斷；當資訊可能因版本或地區而改變時，也會留下適用範圍、核對日期與更正紀錄。",
    avatarAlt: "PFG 的插畫風格作者頭像",
    disclosure:
      "PFG 是本站使用的公開筆名；此頭像為原創插畫，不是本人照片。本站不以此筆名暗示未經證實的學歷、職業資格、官方關係或專家身分。",
    profileTitle: "PFG｜AION2 KINA 網站作者",
  },
  en: {
    jobTitle: "Website Author",
    description:
      "PFG is the public pen name of an AION2 KINA author. Map points are curated by PFG and AION2 KINA; primary sources and corrections are reviewed.",
    bio:
      "PFG writes and organizes AION2 KINA content under a public pen name. The work prioritizes first-party NC and platform sources, separates confirmed facts from editorial interpretation, and records version, region, and review dates when information can change.",
    avatarAlt: "Illustrated author avatar for PFG",
    disclosure:
      "PFG is a public pen name used on this site. The avatar is an original illustration, not a photograph. No unverified education, professional credential, official game affiliation, or expert status is claimed.",
    profileTitle: "PFG | AION2 KINA Website Author",
  },
  fr: {
    jobTitle: "Auteur du site",
    description:
      "PFG est le pseudonyme public d’un auteur d’AION2 KINA qui vérifie les sources, précise région et version, puis maintient les contenus et corrections.",
    bio:
      "PFG rédige et organise AION2 KINA sous un pseudonyme public, en privilégiant les sources de NC et des plateformes et en séparant les faits vérifiés de l’analyse éditoriale.",
    avatarAlt: "Avatar illustré de l’auteur PFG",
    disclosure:
      "PFG est un pseudonyme public. L’avatar est une illustration originale et non une photographie ; il n’implique aucun titre ni lien officiel non vérifié.",
    profileTitle: "PFG | Auteur d’AION2 KINA",
  },
  de: {
    jobTitle: "Website-Autor",
    description:
      "PFG ist das öffentliche Pseudonym eines AION2-KINA-Autors, der Primärquellen prüft, Region und Version kennzeichnet sowie Inhalte und Korrekturen pflegt.",
    bio:
      "PFG erstellt AION2-KINA-Inhalte unter einem öffentlichen Pseudonym, bevorzugt Quellen von NC und Plattformen und trennt bestätigte Fakten von redaktioneller Einordnung.",
    avatarAlt: "Illustrierter Autorenavatar von PFG",
    disclosure:
      "PFG ist ein öffentliches Pseudonym. Der Avatar ist eine Originalillustration, kein Foto, und beansprucht keine ungeprüfte Qualifikation oder offizielle Verbindung.",
    profileTitle: "PFG | Autor von AION2 KINA",
  },
  es: {
    jobTitle: "Autor del sitio",
    description:
      "PFG es el seudónimo público de un autor de AION2 KINA que revisa fuentes primarias, indica región y versión, y mantiene contenidos y correcciones.",
    bio:
      "PFG redacta y organiza AION2 KINA bajo un seudónimo público, priorizando fuentes de NC y plataformas y separando los hechos confirmados de la interpretación editorial.",
    avatarAlt: "Avatar ilustrado del autor PFG",
    disclosure:
      "PFG es un seudónimo público. El avatar es una ilustración original, no una fotografía, y no implica credenciales ni afiliación oficial no verificadas.",
    profileTitle: "PFG | Autor de AION2 KINA",
  },
  ja: {
    jobTitle: "サイト執筆者",
    description:
      "PFGはAION2 KINAで使用する公開ペンネームです。NCや各プラットフォームの一次情報を確認し、対象地域、バージョン、確認日を明記しながら、10言語の攻略、ニュース、ツール説明、訂正履歴を管理します。確認済みの事実と編集上の判断を区別し、情報が変わった場合は内容と更新日を見直します。",
    bio:
      "PFGは公開ペンネームでAION2 KINAを執筆・整理し、NCや各プラットフォームの一次情報を優先して、確認済みの事実と編集上の判断を区別します。",
    avatarAlt: "PFGのイラスト作者アバター",
    disclosure:
      "PFGは公開ペンネームです。アバターは本人写真ではなくオリジナルイラストで、未確認の資格や公式関係を示すものではありません。",
    profileTitle: "PFG｜AION2 KINA サイト執筆者",
  },
  "pt-br": {
    jobTitle: "Autor do site",
    description:
      "PFG é o pseudônimo público de um autor do AION2 KINA que revisa fontes primárias, informa região e versão e mantém conteúdo editorial e correções.",
    bio:
      "PFG escreve e organiza o AION2 KINA sob um pseudônimo público, priorizando fontes da NC e das plataformas e separando fatos confirmados de interpretação editorial.",
    avatarAlt: "Avatar ilustrado do autor PFG",
    disclosure:
      "PFG é um pseudônimo público. O avatar é uma ilustração original, não uma foto, e não indica credencial ou vínculo oficial não verificado.",
    profileTitle: "PFG | Autor do AION2 KINA",
  },
  ru: {
    jobTitle: "Автор сайта",
    description:
      "PFG — публичный псевдоним автора AION2 KINA, который проверяет первоисточники, указывает регион и версию и поддерживает материалы и исправления.",
    bio:
      "PFG пишет и систематизирует материалы AION2 KINA под публичным псевдонимом, отдавая приоритет источникам NC и платформ и отделяя подтверждённые факты от редакционной оценки.",
    avatarAlt: "Иллюстрированный аватар автора PFG",
    disclosure:
      "PFG — публичный псевдоним. Аватар является оригинальной иллюстрацией, а не фотографией, и не заявляет о непроверенных квалификациях или официальной связи.",
    profileTitle: "PFG | Автор AION2 KINA",
  },
  ko: {
    jobTitle: "웹사이트 작성자",
    description:
      "PFG는 AION2 KINA의 공개 필명이자 웹사이트 작성자입니다. NC와 플랫폼의 1차 출처를 확인하고 적용 지역, 버전과 검토 날짜를 표시하며 10개 언어의 공략, 뉴스, 도구 설명과 정정 내역을 관리합니다. 확인된 사실과 편집 판단을 구분합니다.",
    bio:
      "PFG는 공개 필명으로 AION2 KINA 콘텐츠를 작성하고 정리합니다. NC 및 플랫폼의 1차 출처를 우선 확인하고, 확인된 사실과 편집 해석을 구분하며, 정보가 바뀔 수 있을 때 버전·지역·검토 날짜를 남기는 것을 원칙으로 합니다.",
    avatarAlt: "PFG의 일러스트 작성자 아바타",
    disclosure:
      "PFG는 이 사이트에서 사용하는 공개 필명입니다. 아바타는 실제 사진이 아닌 독창적인 일러스트이며, 확인되지 않은 학력·직업 자격·게임 공식 제휴 또는 전문가 지위를 암시하지 않습니다.",
    profileTitle: "PFG | AION2 KINA 웹사이트 작성자",
  },
};

export function getPfgAuthorHref(locale: SiteLocale) {
  return localizedHref(locale, PFG_AUTHOR_PATH);
}

export function getPfgAuthorPersonId(
  locale: SiteLocale,
  origin: string | null,
) {
  return `${absoluteAuthorUrl(getPfgAuthorHref(locale), origin)}#person`;
}

export function buildPfgPersonSchema(
  locale: SiteLocale,
  origin: string | null,
) {
  const copy = pfgAuthorCopy[locale];
  const rootUrl = absoluteAuthorUrl("/", origin);
  const authorUrl = absoluteAuthorUrl(getPfgAuthorHref(locale), origin);

  return {
    "@type": "Person",
    "@id": getPfgAuthorPersonId(locale, origin),
    name: PFG_AUTHOR_NAME,
    url: authorUrl,
    jobTitle: copy.jobTitle,
    description: copy.description,
    image: {
      "@type": "ImageObject",
      url: absoluteAuthorUrl(PFG_AUTHOR_AVATAR.src, origin),
      width: PFG_AUTHOR_AVATAR.width,
      height: PFG_AUTHOR_AVATAR.height,
      caption: copy.avatarAlt,
    },
    affiliation: {
      "@type": "Organization",
      "@id": `${rootUrl}#organization`,
      name: "AION2 KINA",
      url: rootUrl,
    },
  };
}
