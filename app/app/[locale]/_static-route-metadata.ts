import type { Metadata } from "next";

import {
  getLanguageAlternates,
  localizedHref,
  siteLocaleConfig,
  siteLocales,
  type ContentLocale,
  type SiteLocale,
} from "@/app/site-config";
import {
  trustPageCopy,
  type TrustPageKind,
} from "@/app/trust-content";

type StaticRouteMetadataOptions = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  imageAlt: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string[];
  authors?: Metadata["authors"];
  creator?: string;
  publisher?: string;
  robots?: Metadata["robots"];
  twitterCard?: "summary" | "summary_large_image";
};

export function buildStaticRouteMetadata({
  locale,
  path,
  title,
  description,
  imageAlt,
  imageUrl = "/aion2-dual.webp",
  imageWidth = 1920,
  imageHeight = 1080,
  keywords,
  authors,
  creator,
  publisher,
  robots = { index: true, follow: true },
  twitterCard = "summary_large_image",
}: StaticRouteMetadataOptions): Metadata {
  const canonical = localizedHref(locale, path);
  const image = {
    url: imageUrl,
    width: imageWidth,
    height: imageHeight,
    alt: imageAlt,
  };

  return {
    title,
    description,
    keywords,
    authors,
    creator,
    publisher,
    robots,
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: "AION2 KINA",
      title,
      description,
      url: canonical,
      locale: siteLocaleConfig[locale].openGraphLocale,
      alternateLocale: siteLocales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => siteLocaleConfig[candidate].openGraphLocale),
      images: [image],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [image],
    },
  };
}

type TrustRouteSeoCopy = {
  title: string;
  description: string;
};

const establishedTrustRouteSeoCopy: Record<
  ContentLocale,
  Record<TrustPageKind, TrustRouteSeoCopy>
> = {
  "zh-hant": {
    about: {
      title: "關於 AION2 KINA：資料來源與編輯原則",
      description:
        "了解 AION2 KINA 的十種語言獨立玩家站定位、PFG 網站作者身份與資料核對方法。物品身份、圖示與品級會對照 NC 官方資料；地圖點位由編輯整理、玩家回報並在遊戲內複核，NC 官方資料僅用於校對。亦可查閱版本、地區與更正流程；本站與 NC Corporation 無隸屬、合作或背書關係。",
    },
    contact: {
      title: "聯絡 AION2 KINA：內容更正與問題回報",
      description:
        "透過 AION2 KINA 站內表單回報過期或錯誤資料、翻譯問題、失效來源、素材權利疑慮與網站故障。可附公開證據連結及選填聯絡方式；請勿提交遊戲帳號、密碼、驗證碼或付款資料，帳號與付款問題請洽所在地區的 NC 官方支援。",
    },
    privacy: {
      title: "AION2 KINA 隱私權政策：Cookie、GA4 與本機資料",
      description:
        "了解 AION2 KINA 如何使用 Google Analytics 4、Consent Mode、分析 Cookie、語言 Cookie 與瀏覽器本機儲存，以及更正回報、假名化使用歷程、加密 IP、資料保留、刪除選擇與外部連結的處理方式；本站不要求訪客註冊帳號。",
    },
    terms: {
      title: "AION2 KINA 使用條款：資料、商標與使用規則",
      description:
        "閱讀 AION2 KINA 的使用條款，包括獨立非官方身份、資料準確性與版本變動、允許及禁止行為、外部連結、AION2 商標與官方素材權利，以及玩家核對資訊的責任。本站不出售帳號、虛擬物品或代儲服務，也不處理付款、退款或官方客服案件。",
    },
  },
  en: {
    about: {
      title: "About AION2 KINA: Sources & Editorial Policy",
      description:
        "AION2 KINA publishes in 10 languages. Item identity, icons and grades are checked against NC data; map markers are curated and reviewed in game.",
    },
    contact: {
      title: "Contact AION2 KINA: Corrections & Site Reports",
      description:
        "Use the AION2 KINA form to report outdated or incorrect data, translation issues, broken sources, rights concerns, or site problems.",
    },
    privacy: {
      title: "AION2 KINA Privacy: Cookies, GA4 & Local Data",
      description:
        "AION2 KINA's privacy policy explains analytics, browser storage, the language cookie, correction reports, and third-party links.",
    },
    terms: {
      title: "AION2 KINA Terms: Data, Trademarks & Acceptable Use",
      description:
        "AION2 KINA's terms cover its unofficial status, information accuracy, acceptable use, external links, trademarks, and player responsibility.",
    },
  },
  ko: {
    about: {
      title: "AION2 KINA 소개: 출처와 편집 원칙",
      description:
        "AION2 KINA가 10개 언어로 콘텐츠를 발행하고 출처·지역·버전·정정을 관리하는 방식을 확인하세요. 아이템 식별 정보·아이콘·등급은 NC 공식 데이터와 대조하며, 지도 포인트는 편집자와 플레이어 제보를 바탕으로 게임 안에서 재확인합니다.",
    },
    contact: {
      title: "AION2 KINA 문의: 콘텐츠 정정 및 사이트 신고",
      description:
        "AION2 KINA 양식으로 오래되거나 잘못된 정보, 번역 문제, 끊어진 출처, 권리 우려와 사이트 오류를 신고하세요. 공개 근거 링크와 선택 연락처를 추가할 수 있지만 게임 계정, 비밀번호, 일회용 코드나 결제 정보는 제출하지 말고 계정·결제 문제는 NC 공식 지원을 이용하세요.",
    },
    privacy: {
      title: "AION2 KINA 개인정보: 쿠키, GA4와 로컬 데이터",
      description:
        "AION2 KINA의 Google Analytics 4, Consent Mode, 분석·언어 쿠키, 로컬 저장소, 정정 신고, 가명 이용 흐름, 암호화 IP, 보관 및 삭제 선택과 외부 링크 방식을 확인하세요. 방문자 계정은 요구하지 않으며 분석 쿠키는 페이지에서 거부할 수 있습니다.",
    },
    terms: {
      title: "AION2 KINA 이용약관: 데이터, 상표와 이용 규칙",
      description:
        "AION2 KINA의 독립 비공식 지위, 버전별 정보, 허용·금지 이용, 외부 링크, AION2 상표와 공식 미디어 권리 및 플레이어의 확인 책임을 살펴보세요. KINA는 계정, 가상 아이템 또는 충전 서비스를 판매하지 않으며 결제·환불이나 공식 고객지원을 처리하지 않습니다.",
    },
  },
};

export const trustRouteSeoCopy = Object.fromEntries(
  siteLocales.map((locale) => [
    locale,
    establishedTrustRouteSeoCopy[locale as ContentLocale] ??
      Object.fromEntries(
        (["about", "contact", "privacy", "terms"] as const).map((kind) => [
          kind,
          {
            title: trustPageCopy[locale][kind].title,
            description: trustPageCopy[locale][kind].description,
          },
        ]),
      ),
  ]),
) as Record<SiteLocale, Record<TrustPageKind, TrustRouteSeoCopy>>;
