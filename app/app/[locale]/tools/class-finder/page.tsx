import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClassFinder } from "@/app/_components/tools/ClassFinder";
import toolsStyles from "@/app/_components/tools/tools.module.css";
import {
  editorialClassFinderPageCopy,
  type ClassFinderPageCopy,
} from "@/app/class-finder-localization";
import {
  breadcrumbAriaLabel,
  getSectionHref,
  isSiteLocale,
  localizedHref,
  siteLocaleConfig,
  siteLocales,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { absoluteSiteUrl, getRequestSiteOrigin } from "@/app/site-url";
import { buildSeoDescription } from "@/app/seo-metadata";
import { toolHubCopy } from "@/app/tool-registry";

import { buildStaticRouteMetadata } from "../../_static-route-metadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

const corePageCopy = {
  "zh-hant": {
    title: "AION2 職業推薦器：依玩法找到適合你的職業",
    seoTitle: "AION2 職業推薦器：依玩法找到適合職業 | AION2 KINA",
    kicker: "職業選擇",
    description:
      "回答幾個關於操作節奏、隊伍定位與 PvE／PvP 偏好的問題，取得三個較符合你玩法的 AION2 職業建議，再前往職業攻略核對技能、武器與實際操作方式。",
    interactionTitle: "開始 AION2 職業測驗",
    interactionDescription:
      "依直覺選擇最接近你的答案即可。推薦結果用來縮小選擇範圍，不代表版本強度、傷害排名或職業勝率。",
    methodology:
      "推薦依站內八大基礎職業資料，對操作難度、近戰或遠程、輸出／防禦／治療定位、單人與隊伍偏好進行加權；改版後仍應以遊戲內說明及最新職業攻略為準。",
    faqTitle: "AION2 職業推薦常見問題",
    faqs: [
      {
        question: "職業推薦結果是如何計算的？",
        answer:
          "工具會把你的操作節奏、戰鬥距離、隊伍角色、遊戲模式與容錯偏好，和八大基礎職業的已整理特徵進行加權比較，最後列出較接近的三個選項。",
      },
      {
        question: "第一名是否代表目前版本最強職業？",
        answer:
          "不是。結果只描述玩法匹配度，不預測傷害、勝率、玩家人口或版本排名；裝備、更新內容與隊伍需求都可能改變實際體驗。",
      },
      {
        question: "新手應該只選操作最簡單的職業嗎？",
        answer:
          "不一定。操作難度只是其中一項考量，也要看你喜歡的戰鬥距離、隊伍責任與生存方式。可先查看難度比較，再用職業攻略確認核心循環。",
      },
      {
        question: "可以重新測驗或比較其他職業嗎？",
        answer:
          "可以。完成後可重新回答，也可從推薦結果前往八大職業總覽、難度比較與個別職業攻略交叉確認。",
      },
    ],
    relatedTitle: "用攻略核對推薦結果",
    relatedDescription:
      "測驗是入口，不是最終結論。接著比較職業難度、官方定位與相關工具，再決定要投入的角色。",
    related: [
      {
        href: "/classes/difficulty-comparison/",
        label: "職業操作難度比較",
        description: "比較學習曲線、容錯與隊伍責任。",
      },
      {
        href: "/classes/class-choice-guide/",
        label: "八大職業選擇指南",
        description: "核對定位、武器與玩法差異。",
      },
      {
        href: "/classes/base-class-roster/",
        label: "八大基礎職業總覽",
        description: "查看已確認的職業與武器資料。",
      },
      {
        href: "/tools/map/",
        label: "AION2 互動地圖",
        description: "選好職業後規劃探索與收集路線。",
      },
    ],
  },
  en: {
    title: "AION2 Class Finder: Find the Right Class for Your Playstyle",
    seoTitle: "AION2 Class Finder: Find Your Best Class | AION2 KINA",
    kicker: "CLASS FINDER / PLAYSTYLE MATCH",
    description:
      "Answer a few questions about combat pace, party role, and PvE or PvP preferences. You will get three AION2 class matches, then you can verify their weapons, skills, and combat loops in the class guides.",
    interactionTitle: "Start the AION2 class quiz",
    interactionDescription:
      "Choose the answer that feels most natural. The result narrows your options; it is not a power ranking, damage tier list, or win-rate forecast.",
    methodology:
      "Matches weight the site's eight base-class profiles across difficulty, range, damage, defense, healing, solo play, and party responsibility. Always verify the current in-game descriptions and updated class guides after a patch.",
    faqTitle: "AION2 class finder FAQ",
    faqs: [
      {
        question: "How are the class matches calculated?",
        answer:
          "The tool compares your preferred pace, combat range, party role, game mode, and tolerance for mistakes with reviewed traits for AION2's eight base classes, then shows the three closest matches.",
      },
      {
        question: "Does the top result mean that class is strongest?",
        answer:
          "No. The score measures playstyle fit only. It does not predict damage, win rate, player population, or patch rankings, all of which can change with gear, updates, and group needs.",
      },
      {
        question: "Should a beginner always choose the easiest class?",
        answer:
          "Not necessarily. Difficulty is one factor alongside range, responsibility, survivability, and the combat loop you enjoy. Check the difficulty comparison and full guide before committing.",
      },
      {
        question: "Can I retake the quiz or compare other classes?",
        answer:
          "Yes. You can answer again, then use the eight-class overview, difficulty comparison, and individual class guides to compare the recommendation with other options.",
      },
    ],
    relatedTitle: "Verify your matches with the guides",
    relatedDescription:
      "Treat the quiz as a starting point. Compare difficulty, confirmed roles, and the related tools before investing in a character.",
    related: [
      {
        href: "/classes/difficulty-comparison/",
        label: "Class difficulty comparison",
        description: "Compare learning curve, forgiveness, and party responsibility.",
      },
      {
        href: "/classes/class-choice-guide/",
        label: "Eight-class choice guide",
        description: "Check roles, weapons, and playstyle differences.",
      },
      {
        href: "/classes/base-class-roster/",
        label: "Eight base classes",
        description: "Review confirmed class and weapon information.",
      },
      {
        href: "/tools/map/",
        label: "AION2 Interactive Map",
        description: "Plan exploration and collection routes after choosing.",
      },
    ],
  },
  ko: {
    title: "AION2 직업 추천기: 플레이 성향에 맞는 직업 찾기",
    seoTitle: "AION2 직업 추천기: 나에게 맞는 직업 찾기 | AION2 KINA",
    kicker: "직업 선택",
    description:
      "조작 속도, 파티 역할, PvE·PvP 선호도에 관한 질문에 답하면 플레이 성향에 가까운 AION2 직업 3개를 추천합니다. 이후 직업 공략에서 무기, 스킬과 전투 방식을 확인하세요.",
    interactionTitle: "AION2 직업 테스트 시작",
    interactionDescription:
      "가장 자연스럽게 느껴지는 답을 고르세요. 추천 결과는 선택 범위를 좁히기 위한 것이며 직업 성능, 피해량 또는 승률 순위가 아닙니다.",
    methodology:
      "사이트의 8개 기본 직업 자료를 바탕으로 조작 난이도, 전투 거리, 공격·방어·치유 역할, 솔로 및 파티 선호도를 가중 비교합니다. 패치 후에는 게임 내 설명과 최신 직업 공략을 다시 확인하세요.",
    faqTitle: "AION2 직업 추천 자주 묻는 질문",
    faqs: [
      {
        question: "직업 추천 결과는 어떻게 계산하나요?",
        answer:
          "선호하는 전투 속도, 거리, 파티 역할, 게임 모드와 실수 허용 범위를 8개 기본 직업의 정리된 특징과 가중 비교해 가장 가까운 3개 직업을 보여 줍니다.",
      },
      {
        question: "1위 결과가 현재 가장 강한 직업인가요?",
        answer:
          "아닙니다. 결과는 플레이 성향 일치도만 나타냅니다. 피해량, 승률, 이용자 수 또는 패치 티어를 예측하지 않으며 장비와 업데이트, 파티 구성에 따라 체감은 달라집니다.",
      },
      {
        question: "초보자는 가장 쉬운 직업만 선택해야 하나요?",
        answer:
          "꼭 그렇지는 않습니다. 난이도와 함께 전투 거리, 파티 책임, 생존 방식과 선호하는 전투 흐름을 고려해야 합니다. 난이도 비교와 상세 공략을 함께 확인하세요.",
      },
      {
        question: "다시 테스트하거나 다른 직업과 비교할 수 있나요?",
        answer:
          "네. 다시 답변한 뒤 8개 직업 개요, 난이도 비교와 개별 직업 공략에서 추천 결과를 다른 선택지와 교차 확인할 수 있습니다.",
      },
    ],
    relatedTitle: "공략으로 추천 결과 확인하기",
    relatedDescription:
      "테스트를 출발점으로 사용하고 난이도, 확인된 역할과 관련 도구를 비교한 뒤 육성할 캐릭터를 결정하세요.",
    related: [
      {
        href: "/classes/difficulty-comparison/",
        label: "직업 난이도 비교",
        description: "학습 곡선, 실수 허용도와 파티 책임을 비교합니다.",
      },
      {
        href: "/classes/class-choice-guide/",
        label: "8개 직업 선택 가이드",
        description: "역할, 무기와 플레이 방식의 차이를 확인합니다.",
      },
      {
        href: "/classes/base-class-roster/",
        label: "8개 기본 직업 개요",
        description: "확인된 직업과 무기 정보를 살펴봅니다.",
      },
      {
        href: "/tools/map/",
        label: "AION2 인터랙티브 지도",
        description: "직업 선택 후 탐험과 수집 경로를 계획합니다.",
      },
    ],
  },
} as const satisfies Record<"zh-hant" | "en" | "ko", ClassFinderPageCopy>;

const pageCopy: Record<SiteLocale, ClassFinderPageCopy> = {
  ...corePageCopy,
  ...editorialClassFinderPageCopy,
};

const faqKicker: Record<SiteLocale, string> = {
  "zh-hans": "常见问题",
  en: "FAQ",
  fr: "FAQ",
  de: "FAQ",
  es: "PREGUNTAS FRECUENTES",
  ja: "よくある質問",
  "pt-br": "PERGUNTAS FREQUENTES",
  ru: "ЧАСТЫЕ ВОПРОСЫ",
  ko: "자주 묻는 질문",
  "zh-hant": "常見問題",
};

function requireLocale(value: string): SiteLocale {
  if (!isSiteLocale(value)) notFound();
  return value;
}

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const copy = pageCopy[locale];
  const suffix = "/tools/class-finder/";
  const description = buildSeoDescription(
    copy.description,
    locale,
    "tool:class-finder",
  );
  const socialImage = "/class-finder-og.jpg";

  return buildStaticRouteMetadata({
    locale,
    path: suffix,
    title: copy.seoTitle,
    description,
    imageAlt: copy.title,
    imageUrl: socialImage,
    imageWidth: 1200,
    imageHeight: 630,
  });
}

export default async function ClassFinderRoute({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const copy = pageCopy[locale];
  const hubCopy = toolHubCopy[locale];
  const suffix = "/tools/class-finder/";
  const siteOrigin = await getRequestSiteOrigin();
  const canonicalUrl = absoluteSiteUrl(localizedHref(locale, suffix), siteOrigin);
  const homeUrl = absoluteSiteUrl(getSectionHref(locale, "home"), siteOrigin);
  const toolsUrl = absoluteSiteUrl(getSectionHref(locale, "tools"), siteOrigin);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#application`,
        name: copy.title,
        description: copy.description,
        url: canonicalUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        inLanguage: siteLocaleConfig[locale].code,
        featureList: [
          copy.interactionDescription,
          copy.methodology,
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: copy.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteShellCopy[locale].navigation.home,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: hubCopy.breadcrumb,
            item: toolsUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className={toolsStyles.main} id="main-content">
      <section
        aria-labelledby="class-finder-title"
        className={`${toolsStyles.hero} ${toolsStyles.detailHero}`}
      >
        <div className={`shell ${toolsStyles.shell}`}>
          <nav
            className={toolsStyles.breadcrumbs}
            aria-label={breadcrumbAriaLabel[locale]}
          >
            <ol>
              <li>
                <a href={getSectionHref(locale, "home")}>
                  {siteShellCopy[locale].navigation.home}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href={getSectionHref(locale, "tools")}>
                  {hubCopy.breadcrumb}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{copy.title}</li>
            </ol>
          </nav>

          <div className={toolsStyles.detailTitle}>
            <span className={toolsStyles.detailIcon} aria-hidden="true">
              ◎
            </span>
            <div>
              <p className={toolsStyles.kicker}>{copy.kicker}</p>
              <h1 id="class-finder-title">{copy.title}</h1>
              <p>{copy.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="class-finder-interaction-title"
        className={styles.interaction}
      >
        <div className="shell">
          <div className={styles.interactionHeading}>
            <div>
              <p className={toolsStyles.kicker}>{copy.kicker}</p>
              <h2 id="class-finder-interaction-title">
                {copy.interactionTitle}
              </h2>
            </div>
            <p>{copy.interactionDescription}</p>
          </div>
          <ClassFinder locale={locale} />
          <p className={styles.methodology}>{copy.methodology}</p>
        </div>
      </section>

      <section
        aria-labelledby="class-finder-faq-title"
        className={styles.supporting}
      >
        <div className={`shell ${styles.supportingGrid}`}>
          <div>
            <p className={toolsStyles.kicker}>{faqKicker[locale]}</p>
            <h2 id="class-finder-faq-title">{copy.faqTitle}</h2>
            <div className={styles.faqList}>
              {copy.faqs.map((faq, index) => (
                <details className={styles.faqItem} key={faq.question}>
                  <summary>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className={styles.related} aria-labelledby="class-finder-related-title">
            <p className={toolsStyles.kicker}>{copy.relatedTitle}</p>
            <h2 id="class-finder-related-title">{copy.relatedTitle}</h2>
            <p>{copy.relatedDescription}</p>
            <nav aria-label={copy.relatedTitle}>
              {copy.related.map((item) => (
                <a href={localizedHref(locale, item.href)} key={item.href}>
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      <nav
        aria-label={hubCopy.detailLanguages}
        className={toolsStyles.languageLinks}
      >
        <div className="shell">
          <span>{hubCopy.detailLanguages}</span>
          {siteLocales.map((targetLocale) => (
            <a
              aria-current={targetLocale === locale ? "page" : undefined}
              href={localizedHref(targetLocale, suffix)}
              hrefLang={siteLocaleConfig[targetLocale].hrefLang}
              key={targetLocale}
            >
              {siteLocaleConfig[targetLocale].label}
            </a>
          ))}
          <a
            className={toolsStyles.backLink}
            href={getSectionHref(locale, "tools")}
          >
            {hubCopy.backToTools}
          </a>
        </div>
      </nav>

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </main>
  );
}
