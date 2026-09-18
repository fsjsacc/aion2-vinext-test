import type {
  ContentEntry,
  ContentHeroImage,
  ContentSectionBlock,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { ContentLocale } from "./site-config";

type SeoContentSectionBlock = ContentSectionBlock & {
  table?: {
    caption: string;
    headers: readonly string[];
    rows: readonly { header?: string; cells: readonly string[] }[];
  };
  faq?: readonly { question: string; answer: string }[];
};

type LocalizedArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote"
> & {
  keywords?: readonly string[];
  sections: readonly SeoContentSectionBlock[];
};

const labels = {
  "zh-hant": {
    byline: "AION2 KINA 編輯團隊",
    backLabel: "返回內容中心",
    contentsLabel: "本頁內容",
    publishedLabel: "本站發布",
    updatedLabel: "最後核對",
    relatedLabel: "相關內容",
  },
  en: {
    byline: "AION2 KINA Editorial",
    backLabel: "Back to the content hub",
    contentsLabel: "On this page",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  ko: {
    byline: "AION2 KINA 편집팀",
    backLabel: "콘텐츠 허브로 돌아가기",
    contentsLabel: "이 페이지의 내용",
    publishedLabel: "KINA 게시",
    updatedLabel: "마지막 확인",
    relatedLabel: "관련 콘텐츠",
  },
} as const;

function articleCopy(
  locale: ContentLocale,
  readingMinutes: number,
  body: LocalizedArticleBody,
): LocalizedContent {
  const readingTime = {
    "zh-hant": `約 ${readingMinutes} 分鐘`,
    en: `${readingMinutes} min read`,
    ko: `약 ${readingMinutes}분`,
  }[locale];

  return { ...labels[locale], readingTime, ...body };
}

const publishedVerified = {
  status: "published",
  indexable: true,
  localeReview: { "zh-hant": "approved", en: "approved", ko: "approved" },
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

const globalTeaserSource = {
  id: "aion2-global-teaser-2026-07-23",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 official global teaser site",
  url: "https://aion2.plaync.com/en-us/conts/teaser",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const coreClassRevealSource = {
  id: "aion2-core-class-reveal-2025-06-04",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2's Core Content Unveiled: The Complete Evolution of AION",
  url: "https://about.ncsoft.com/en/news/article/aion2-update-250530-2",
  publishedAt: "2025-06-04",
  retrievedAt: "2026-07-17",
  verifiedAt: "2026-07-17",
} as const satisfies ContentSource;

const classOverviewSource = {
  id: "aion2-guidebook-class-overview-2026-07-17",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 official Guidebook: class overview",
  url: "https://aion2.plaync.com/ko-kr/guidebook/view?title=%ED%81%B4%EB%9E%98%EC%8A%A4%20%EC%86%8C%EA%B0%9C",
  retrievedAt: "2026-07-17",
  verifiedAt: "2026-07-17",
} as const satisfies ContentSource;

const steamSource = {
  id: "aion2-global-steam-store-2026-07-23",
  kind: "platform",
  publisher: "Steam",
  label: "AION 2 Steam store page",
  url: "https://store.steampowered.com/app/3393110/AION_2/",
  retrievedAt: "2026-07-23",
  verifiedAt: "2026-07-23",
} as const satisfies ContentSource;

const globalBusinessModelSource = {
  id: "aion2-global-business-model-2026-07-24",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 Team Update: Global business model",
  url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a4d7d47a729ca5877f5e1ef",
  retrievedAt: "2026-07-24",
  verifiedAt: "2026-07-24",
} as const satisfies ContentSource;

const earlyAccessNoticeSource = {
  id: "aion2-global-early-access-2026-07-17",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 Early Access: How It Will Work",
  url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5819287b798626e79a8892",
  publishedAt: "2026-07-17",
  retrievedAt: "2026-07-23",
  verifiedAt: "2026-07-23",
} as const satisfies ContentSource;

const globalProductNoticeSource = {
  id: "aion2-global-products-2026-07-22",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION 2 July 22 new product and advance-access notice",
  url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f",
  publishedAt: "2026-07-22",
  retrievedAt: "2026-07-23",
  verifiedAt: "2026-07-23",
} as const satisfies ContentSource;

const koreaDownloadSource = {
  id: "aion2-korea-download-page-2026-07-17",
  kind: "official",
  publisher: "NC Corporation",
  label: "AION2 Korea official download and system-requirements page",
  url: "https://aion2.plaync.com/ko-kr/download/index",
  retrievedAt: "2026-07-17",
  verifiedAt: "2026-07-17",
} as const satisfies ContentSource;

const classHeroImage = {
  src: "https://fizz-download.playnccdn.com/download/v2/buckets/guidebook/files/19a8f6a3698-672c7082-3c90-46e9-ba88-4c3aa1d36419",
  width: 520,
  height: 308,
  credit: "NC Corporation / AION2 official Guidebook",
  sourceUrl: classOverviewSource.url,
  rights: "linked-official-media",
  presentation: "contain",
  translations: {
    "zh-hant": {
      alt: "AION2 官方 Guidebook 職業概覽圖片",
      caption:
        "NC 官方 Guidebook 的職業概覽圖片；本文只依官方角色描述協助建立選擇短名單。",
    },
    en: {
      alt: "AION2 official Guidebook class-overview image",
      caption:
        "Official NC Guidebook class-overview art; this guide uses official role descriptions only to build a shortlist.",
    },
    ko: {
      alt: "AION2 공식 가이드북 직업 소개 이미지",
      caption:
        "NC 공식 가이드북 직업 소개 이미지이며 이 문서는 공식 역할 설명만으로 후보를 좁힙니다.",
    },
  },
} as const satisfies ContentHeroImage;

const globalHeroImage = {
  src: "https://st.ncjapan.co.jp/ncjapan/ncsoft/aion2/official/ogp.jpg",
  width: 1200,
  height: 630,
  credit: "NC Corporation",
  sourceUrl: globalTeaserSource.url,
  rights: "linked-official-media",
  translations: {
    "zh-hant": {
      alt: "AION2 全球版官方主視覺",
      caption:
        "AION2 全球官方網站主視覺；清單中的版本與商業資訊仍以各官方來源的最新頁面為準。",
    },
    en: {
      alt: "Official AION2 global key art",
      caption:
        "Official AION2 global-site art; current official pages remain authoritative for build and commerce details.",
    },
    ko: {
      alt: "AION2 글로벌 공식 메인 이미지",
      caption:
        "AION2 글로벌 공식 사이트 이미지이며 버전과 상품 정보는 각 공식 페이지의 최신 안내가 기준입니다.",
    },
  },
} as const satisfies ContentHeroImage;

export const legacyCuratedContentEntries = [
  {
    section: "classes",
    slug: "class-choice-guide",
    schemaType: "Article",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    readingMinutes: 7,
    publication: publishedVerified,
    sources: [globalTeaserSource, coreClassRevealSource, classOverviewSource],
    heroImage: classHeroImage,
    related: [
      { kind: "content", section: "classes", slug: "base-class-roster" },
      { kind: "content", section: "classes", slug: "class-planning-framework" },
      { kind: "content", section: "classes", slug: "brawler" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 7, {
        eyebrow: "職業選擇指南",
        title: "AION2 職業怎麼選：依玩法偏好縮小八職業名單",
        description:
          "依 NC 官方八職業角色描述，從前線、防守、精準近戰、遠程、魔法、單人與支援偏好建立短名單；不提供 Tier、強弱排名或未驗證 Build。",
        intro:
          "沒有一個職業能在所有內容、版本和隊伍中永遠是唯一答案。比較可靠的起點，是先決定你想承擔的戰鬥責任，再從官方八職業描述中選出兩至三個候選。",
        sourceNote:
          "職業名稱以全球官方預告站為準，角色輪廓交叉核對 NC 2025 年核心內容公告與現行官方 Guidebook 概覽。本文不把編輯偏好寫成官方排行。",
        keywords: [
          "AION2 職業推薦",
          "AION2 職業選擇",
          "AION2 八職業",
          "AION2 新手職業",
        ],
        sections: [
          {
            id: "choose-responsibility",
            title: "先選戰鬥責任，不先問誰最強",
            paragraphs: [
              "官方全球預告站列出 Gladiator、Templar、Assassin、Ranger、Chanter、Cleric、Sorcerer 與 SpiritMaster。NC 的核心內容公告則用廣域近戰、坦克、精準近戰、長距離、爆發魔法、單人取向、治療與多人支援等方向介紹這八個職業。",
              "這些描述能回答「我想怎麼玩」，不能證明「哪個一定最強」。實際技能數值、隊伍需求與操作體感會受服務地區和版本影響，因此這一頁只做角色匹配，不做 Tier、勝率、傷害或最佳 Build 結論。",
            ],
          },
          {
            id: "preference-map",
            title: "按玩法偏好建立第一輪短名單",
            paragraphs: [
              "如果你想站在前線並承受較高接觸壓力，可先比較 Gladiator 與 Templar；前者的官方輪廓偏向有廣域能力的近戰，後者明確承擔核心坦克責任。若你偏好近距離精準出手與時機判斷，Assassin 是更直接的候選。",
              "如果你希望保持距離，可比較 Ranger 與 Sorcerer：官方資料分別把它們放在長距離偵察／攻擊與高爆發魔法方向。若你喜歡召喚與較強的單人遊玩取向，SpiritMaster 值得放進候選。",
            ],
            bullets: [
              "想成為隊伍主要治療核心：先看 Cleric。",
              "想提供多人增益與多用途支援：先看 Chanter。",
              "喜歡前線廣域近戰：先看 Gladiator。",
              "願意承擔保護與坦克責任：先看 Templar。",
              "偏好精準近戰與出手機會：先看 Assassin。",
              "偏好長距離、爆發魔法或召喚：比較 Ranger、Sorcerer、SpiritMaster。",
            ],
          },
          {
            id: "shortlist-test",
            title: "用三個問題測試候選",
            paragraphs: [
              "先問自己是否願意承擔失誤會直接影響隊伍的責任，例如主要承傷、治療或支援；再問自己偏好貼近目標、維持距離，還是管理召喚與施法節奏；最後問在沒有固定隊伍時，你是否仍喜歡這個核心循環。",
              "把答案寫成一句話，例如「我願意承擔治療責任，但希望仍有主動操作空間」。接著只保留兩至三個候選，閱讀官方職業頁並在可遊玩版本中親自測試。角色外觀或舊版經驗可以是偏好，但不能取代現行版本驗證。",
            ],
            steps: [
              {
                title: "寫下責任",
                description:
                  "選擇前線承傷、治療、支援、近戰輸出、遠程輸出或召喚控制等主要期待。",
              },
              {
                title: "留下兩至三個候選",
                description:
                  "只用官方角色輪廓縮小範圍，不用未標版本的排行榜淘汰職業。",
              },
              {
                title: "回到現行版本測試",
                description:
                  "核對所在地區的技能說明與操作，再決定是否投入時間或不可退還的資源。",
              },
            ],
          },
          {
            id: "version-boundary",
            title: "八職業名單與現行版本要分開看",
            paragraphs: [
              "本頁以全球預告站所列的八職業作為選擇範圍。其他服務地區的現行版本可能已有後續職業或調整，例如本站另有拳星資料頁；這不代表新增內容已確認會以相同狀態出現在全球版首日。",
              "當官方更新職業名稱、技能或全球版範圍時，應重新檢查短名單。保留「為什麼選它」的玩法理由，比保存一張沒有日期的強弱表更容易跨版本修正。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 7, {
        eyebrow: "CLASS CHOICE GUIDE",
        title:
          "How to choose an AION2 class: shortlist the official eight by playstyle",
        description:
          "Use NC's official role descriptions to shortlist AION2's eight announced classes by frontline, defense, precision melee, range, magic, solo, healing, or support preference—without tiers or unverified builds.",
        intro:
          "No class is the single permanent answer across every activity, build, and party. A better starting point is the combat responsibility you want, followed by a shortlist of two or three classes from the official eight.",
        sourceNote:
          "Names follow the official global teaser; role profiles were cross-checked against NC's 2025 core-content release and current Guidebook overview. Editorial preference is not presented as an official ranking.",
        keywords: [
          "AION2 class recommendation",
          "best AION2 class",
          "AION2 class choice",
          "AION2 classes",
        ],
        sections: [
          {
            id: "choose-responsibility",
            title: "Choose a responsibility before asking what is strongest",
            paragraphs: [
              "The global teaser lists Gladiator, Templar, Assassin, Ranger, Chanter, Cleric, Sorcerer, and SpiritMaster. NC's core-content release describes them through broad roles including wide-area melee, core tanking, precision melee, long range, burst magic, solo-oriented play, healing, and multiplayer support.",
              "Those descriptions answer how you may want to play; they do not prove a permanent best class. Skills, party demand, and feel can change by service region and build, so this page makes role matches rather than tier, win-rate, damage, or build claims.",
            ],
          },
          {
            id: "preference-map",
            title: "Build a first shortlist from playstyle",
            paragraphs: [
              "For a frontline role with frequent contact, compare Gladiator and Templar. NC frames Gladiator around powerful wide-area melee attacks and Templar as the core tank. If precise close-range timing sounds better than holding a line, Assassin is the clearer candidate.",
              "For distance, compare Ranger and Sorcerer: the official material places them in long-range scouting or attack and high-burst magic respectively. If summons and a solo-oriented profile appeal to you, add SpiritMaster to the shortlist.",
            ],
            bullets: [
              "Want the party's primary healing responsibility: start with Cleric.",
              "Want multiplayer utility and broad support: start with Chanter.",
              "Want wide-area frontline melee: start with Gladiator.",
              "Want protection and core tanking responsibility: start with Templar.",
              "Want precision melee and timing: start with Assassin.",
              "Want range, burst magic, or summons: compare Ranger, Sorcerer, and SpiritMaster.",
            ],
          },
          {
            id: "shortlist-test",
            title: "Test candidates with three questions",
            paragraphs: [
              "First ask whether you enjoy a responsibility where mistakes immediately affect a group, such as primary tanking, healing, or support. Then decide whether you prefer staying close, maintaining distance, or managing summons and cast timing. Finally ask whether the central loop still appeals when a regular party is unavailable.",
              "Turn the answer into one sentence—for example, “I accept healing responsibility but still want active decisions.” Keep only two or three candidates, read their official pages, and test them in the build you can actually play. Appearance and memories from an older AION build are valid preferences, not evidence about the current build.",
            ],
            steps: [
              {
                title: "Name the responsibility",
                description:
                  "Choose a primary expectation such as frontline defense, healing, support, melee damage, ranged damage, or summon control.",
              },
              {
                title: "Keep two or three candidates",
                description:
                  "Use official role profiles to narrow the field without eliminating classes through an undated ranking.",
              },
              {
                title: "Test the current build",
                description:
                  "Read the skill text for your service region and play it before committing time or a non-refundable resource.",
              },
            ],
          },
          {
            id: "version-boundary",
            title:
              "Keep the eight-class scope separate from live-service additions",
            paragraphs: [
              "This page uses the eight classes currently listed on the global teaser. Other live-service regions may already have later classes or revisions, including the Brawler covered separately on KINA; that does not confirm the same launch state for the global build.",
              "Rebuild the shortlist when official names, skills, or the global roster change. A dated note explaining why you chose a role survives updates better than an undated power chart.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 7, {
        eyebrow: "직업 선택 가이드",
        title: "AION2 직업 선택 가이드: 공식 8개 직업을 플레이 성향으로 좁히기",
        description:
          "NC 공식 역할 설명을 바탕으로 전열, 방어, 정밀 근접, 원거리, 마법, 솔로, 치유, 지원 성향에 맞는 후보를 고릅니다. 티어·강약 순위·미확인 빌드는 제시하지 않습니다.",
        intro:
          "모든 콘텐츠, 버전, 파티에서 영구적으로 하나뿐인 정답인 직업은 확인할 수 없습니다. 먼저 맡고 싶은 전투 책임을 정하고 공식 8개 직업 중 두세 개를 후보로 남기는 편이 더 안전합니다.",
        sourceNote:
          "직업명은 글로벌 공식 티저를 따르고 역할은 NC의 2025년 핵심 콘텐츠 발표와 현재 공식 가이드북 직업 소개를 교차 확인했습니다. 편집자의 선호를 공식 순위로 표시하지 않습니다.",
        keywords: [
          "아이온2 직업 추천",
          "아이온2 직업 선택",
          "아이온2 직업",
          "AION2 class",
        ],
        sections: [
          {
            id: "choose-responsibility",
            title: "강한 직업보다 맡을 책임을 먼저 고릅니다",
            paragraphs: [
              "글로벌 티저에는 Gladiator, Templar, Assassin, Ranger, Chanter, Cleric, Sorcerer, SpiritMaster가 나열됩니다. NC 핵심 콘텐츠 발표는 광역 근접, 핵심 탱킹, 정밀 근접, 장거리, 순간 마법 피해, 솔로 지향, 치유, 다인 지원이라는 큰 방향으로 8개 직업을 소개합니다.",
              "이 설명은 '어떻게 플레이하고 싶은가'에는 답하지만 영구적인 최강 직업을 증명하지 않습니다. 실제 스킬, 파티 수요, 조작감은 서비스 지역과 버전에 따라 달라질 수 있으므로 이 문서는 티어, 승률, 피해량, 최적 빌드를 정하지 않습니다.",
            ],
          },
          {
            id: "preference-map",
            title: "플레이 성향으로 첫 후보를 만듭니다",
            paragraphs: [
              "전열에서 적과 자주 맞닿고 싶다면 Gladiator와 Templar를 비교합니다. 공식 설명은 Gladiator를 강력한 광역 근접 공격, Templar를 핵심 탱킹 역할로 소개합니다. 전선을 유지하는 것보다 정밀한 근접 타이밍을 선호하면 Assassin이 더 직접적인 후보입니다.",
              "거리를 유지하고 싶다면 Ranger와 Sorcerer를 비교합니다. 공식 자료는 각각 장거리 정찰·공격과 높은 순간 마법 피해 방향으로 설명합니다. 소환과 솔로 지향 성향이 끌리면 SpiritMaster도 후보에 넣습니다.",
            ],
            bullets: [
              "파티의 주 치유 책임을 원하면 Cleric부터 확인합니다.",
              "다인 콘텐츠 유틸리티와 폭넓은 지원을 원하면 Chanter부터 확인합니다.",
              "광역 전열 근접을 원하면 Gladiator부터 확인합니다.",
              "보호와 핵심 탱킹 책임을 원하면 Templar부터 확인합니다.",
              "정밀 근접과 타이밍을 선호하면 Assassin부터 확인합니다.",
              "원거리, 순간 마법, 소환을 원하면 Ranger, Sorcerer, SpiritMaster를 비교합니다.",
            ],
          },
          {
            id: "shortlist-test",
            title: "세 가지 질문으로 후보를 시험합니다",
            paragraphs: [
              "먼저 주 탱킹, 치유, 지원처럼 실수가 파티에 바로 영향을 주는 책임을 즐기는지 묻습니다. 다음으로 근접 유지, 거리 관리, 소환과 시전 타이밍 중 무엇을 선호하는지 정합니다. 마지막으로 고정 파티가 없어도 그 핵심 흐름을 계속 즐길 수 있는지 확인합니다.",
              "답을 '치유 책임을 맡되 계속 능동적으로 판단하고 싶다'처럼 한 문장으로 적습니다. 후보를 두세 개만 남기고 공식 직업 페이지를 읽은 뒤 실제 플레이 가능한 버전에서 시험합니다. 외형이나 과거 AION 경험은 취향이 될 수 있지만 현행 버전의 성능 증거는 아닙니다.",
            ],
            steps: [
              {
                title: "책임을 적기",
                description:
                  "전열 방어, 치유, 지원, 근접 피해, 원거리 피해, 소환 제어 등 핵심 기대를 하나 고릅니다.",
              },
              {
                title: "두세 개만 남기기",
                description:
                  "버전이 없는 순위표가 아니라 공식 역할 설명으로 후보를 좁힙니다.",
              },
              {
                title: "현행 버전에서 시험하기",
                description:
                  "서비스 지역의 스킬 설명과 조작을 확인한 뒤 시간이나 환불 불가 자원을 투입합니다.",
              },
            ],
          },
          {
            id: "version-boundary",
            title: "공식 8개 범위와 라이브 추가 직업을 구분합니다",
            paragraphs: [
              "이 문서는 현재 글로벌 티저에 나온 8개 직업만 선택 범위로 사용합니다. 다른 라이브 서비스 지역에는 KINA가 별도로 다루는 권성처럼 후속 직업이나 조정이 있을 수 있지만, 그 상태가 글로벌 출시 첫날에 그대로 적용된다는 뜻은 아닙니다.",
              "공식 직업명, 스킬, 글로벌 직업 범위가 바뀌면 후보를 다시 검토합니다. 선택 이유를 날짜와 함께 기록하면 날짜 없는 강약표보다 버전 변화에 맞춰 고치기 쉽습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "beginner-launch-checklist",
    schemaType: "Article",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-23",
    readingMinutes: 9,
    publication: publishedVerified,
    sources: [
      steamSource,
      globalTeaserSource,
      globalProductNoticeSource,
      earlyAccessNoticeSource,
      koreaDownloadSource,
    ],
    heroImage: globalHeroImage,
    related: [
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "news", slug: "global-release-september-2026" },
      { kind: "content", section: "guides", slug: "scam-check" },
      { kind: "tool", toolSlug: "daily-checklist" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 9, {
        eyebrow: "全球服上線準備",
        title: "AION2 全球服開服指南：搶先遊玩、安裝與首日準備",
        description:
          "AION2 全球服準備指南：核對 9 月 30 日搶先遊玩、Steam 與 PURPLE、PC 配置、伺服器、職業、預先登錄及首日資源安排。",
        intro:
          "先說結論：NC 已確認 Founder’s Pack 的 5 日搶先遊玩於 2026 年 9 月 30 日開始；Steam 套裝頁目前把正式發布日列為 10 月 5 日，但 NC 與 Steam 主遊戲頁的較早文案仍寫 2026 年 9 月，且官方尚未公布具體開服時刻。玩家現在最有用的準備，是完成官方登記、選定平台與區域、核對電腦空間和配置，並把職業與伺服器候選縮小，而不是把未公布的時刻或規則當成事實。",
        sourceNote:
          "2026 年 7 月 23 日核對 NC 全球站、7 月 17 日 Early Access 機制公告、7 月 22 日 Founder’s Pack 產品公告與 Steam。日期以來源當前欄位呈現；韓國／台灣現行版的系統、重置與活動不直接套用為全球服承諾。",
        keywords: [
          "AION2 新手攻略",
          "AION2 開服準備",
          "AION2 安裝",
          "AION2 每日任務",
        ],
        sections: [
          {
            id: "confirmed-schedule",
            title: "AION2 全球服何時開始搶先遊玩與正式上線？",
            paragraphs: [
              "NC 的 7 月 22 日公告寫明 Advanced Access 於 2026 年 9 月 30 日開始並持續 5 日，三種 Founder’s Pack 都包含相同的提前時間。Steam 的 Standard、Deluxe 與 Ultimate 套裝頁目前列出 2026 年 10 月 5 日 Release Date；同時，Steam 主遊戲頁與 NC 較早宣傳仍顯示 September 2026，代表官方頁面欄位尚未完全同步。",
              "目前沒有可核對的開服小時與時區，所以本站倒數只計算至 9 月 30 日的剩餘天數，不把當地 00:00 假裝成官方時間。下載開放、預載、維護長度與各區伺服器開門時刻仍要等 NC 後續公告。",
            ],
            bullets: [
              "9 月 30 日：已確認的 Founder’s Pack 搶先遊玩開始日期。",
              "10 月 5 日：Steam 套裝頁目前標示的正式發布日期。",
              "具體時刻、預載與維護安排：仍待官方公布。",
            ],
          },
          {
            id: "platform-region-language",
            title: "先決定 Steam 或 PURPLE，再核對區域與語言",
            paragraphs: [
              "全球版是 PC 版本，透過 Steam 與 PURPLE 提供。NC 公布北美、南美、歐洲與日本區域伺服器，並預計支援英文、德文、法文、西班牙文、巴西葡萄牙文、日文、韓文、俄文、簡體中文與繁體中文共 10 種語言。Steam 目前把英文、日文、韓文與繁體中文列為完整語音支援，其餘語言以介面與字幕欄位為主。",
              "Founder’s Pack 的購買平台會影響從哪個平台進入：官方說明顯示 Steam 購買需由 Steam 遊玩，PURPLE 購買需由 PURPLE 遊玩，但兩者連到同一組遊戲伺服器。不要在尚未確認帳號、地區與主要啟動器前重複購買；所選商店中每個帳號限購一個版本，跨平台重複購買也不會疊加搶先時間或獎勵。",
            ],
          },
          {
            id: "early-access-choice",
            title: "要不要買 Founder’s Pack 搶先遊玩？",
            paragraphs: [
              "如果你只想提前進入，Standard 已提供與 Deluxe、Ultimate 相同的 5 日搶先遊玩；較高版本增加的是官方列出的造型、寵物、翅膀與造型箱，不會增加搶先天數。補給箱、稱號與外觀的完整使用條件應在付款前回到所在地區商店重新核對，Founder’s Pack 也不應被理解成已包含會員、交易權限或未公布的戰力。",
              "官方將先開放 Early Access Servers，正式上線時再加入 Launch Servers。朋友即使不同伺服器，仍可加好友並跨服組成部分副本隊伍；市場、跨服市場、伺服器轉移與深淵配對則有分階段規則。若你在意與朋友同服、經濟開放速度或伺服器壓力，應先一起選區、陣營與伺服器，再決定是否付費搶先。",
            ],
          },
          {
            id: "install-and-hardware",
            title: "只從官方入口安裝並核對 100 GB 空間",
            paragraphs: [
              "Steam 目前列出 Windows 10／11 64-bit、DirectX 12 與 100 GB 可用空間，並建議使用 SSD。最低參考為 Ryzen 5 2600 或 Core i5-10500、8 GB 記憶體與 GTX 1050 Ti 4 GB；建議配置為 Ryzen 7 3700X 或 Core i7-11700、16 GB 記憶體與 RTX 2070 8 GB。這些數值仍可能在發布前調整，安裝前應回到商店再次核對。",
              "韓國現行服務的官方下載頁使用 PURPLE PC，並有自己的安裝流程和需求。它能證明韓國服務目前如何安裝，不能自動證明全球版採用完全相同的客戶端、需求或登入方式。",
            ],
            bullets: [
              "確認網址屬於 Steam 或 NC 官方網域。",
              "保留足夠安裝與更新空間，並以當前官方頁面數值為準。",
              "更新顯示卡驅動並關閉不需要的背景程式；不要把通用排錯建議當成保證效能。",
            ],
          },
          {
            id: "class-shortlist",
            title: "建立兩至三個職業候選與陣營共識",
            paragraphs: [
              "全球預告站列出八個職業。先按前線、防守、精準近戰、遠距、魔法、召喚／單人、治療或多人支援偏好留下兩至三個候選，再閱讀職業選擇與官方資料頁。",
              "不要因一張沒有版本和樣本的 Tier 表就刪除候選。正式投入前，在你實際遊玩的服務版本中查看技能說明與操作；全球版、韓國／台灣現行版和之後更新不應被默認為完全相同。",
            ],
          },
          {
            id: "read-before-commit",
            title: "首日先讀系統，再投入不可逆資源",
            paragraphs: [
              "遇到標示綁定、一次性、不可退還、限次或有期限的選項時，先停下來閱讀完整說明與服務地區公告。若頁面沒有回答用途、限制或是否能撤回，就把它記成待確認，而不是依舊版攻略推斷。",
              "新手期可先保留稀缺或難以回復的資源，直到你理解該版本的系統與角色方向。這是一個決策原則，不是對任何特定貨幣、材料或免費重置次數的承諾。",
            ],
            steps: [
              {
                title: "辨認限制字樣",
                description:
                  "查看綁定、期限、帳號／角色限制、不可交易或不可退還等當期說明。",
              },
              {
                title: "查官方版本資訊",
                description:
                  "用所在地區的公告和遊戲內文字驗證，不用其他地區或舊版猜測。",
              },
              {
                title: "記錄決定理由",
                description: "尚未確認時先保留資源，確認用途和代價後再投入。",
              },
            ],
          },
          {
            id: "reset-and-safety",
            title: "完成登記、保護帳號，並以全球服週期為準",
            paragraphs: [
              "官方全球頁已開放登記，依地區可使用電子郵件或 NC 帳號；獎勵與資格必須以你所在地區的官方登記頁為準。保留完成畫面或確認郵件，並把 Steam 願望清單、預先登錄、Founder’s Pack 與公開兌換碼視為不同流程。",
              "本站每日清單目前提供台港澳與韓國現行服務週期，但全球服的每日、每週重置與活動時段不能在開服前照搬。第一次登入後，應以全球服遊戲內倒數與所在地區公告建立新週期；維護、夏令時間與特殊活動都可能改變日界線。",
              "登入、預先登錄、下載、兌換與付款前，先使用防詐指南核對網域與請求內容。不要在私訊短網址輸入帳號，也不要把公開兌換碼、個人序號、預先登錄獎勵或付費商品混為一談。",
            ],
            bullets: [
              "先在工具選擇實際遊玩的服務區；網站語言不會替你決定伺服器。",
              "改版或維護後重新確認特殊活動、次數與開放時段。",
              "保存官方完成畫面或確認郵件，不向他人提供密碼或一次性驗證碼。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 9, {
        eyebrow: "GLOBAL LAUNCH PREPARATION",
        title:
          "AION2 global launch guide: early access, install, and first-day preparation",
        description:
          "Prepare for AION2 global launch with the confirmed September 30 advance-access date, Steam and PURPLE choices, PC requirements, regions, classes, registration, and first-day decisions.",
        intro:
          "Answer first: NC confirms that five-day Founder’s Pack advance access begins September 30, 2026. Steam packages currently list October 5 as the release date, while older NC and main Steam copy still says September 2026, and no official source gives a server-opening hour. The useful preparation now is to complete the official registration available in your region, choose a platform and region, verify storage and hardware, and narrow down class and server choices without turning an unpublished time or rule into fact.",
        sourceNote:
          "Rechecked July 23, 2026 against the NC global site, the July 17 Early Access mechanics notice, the July 22 Founder’s Pack product notice, and Steam. Dates follow the current source fields; Korea/Taiwan systems, resets, and promotions are not copied into the global service as promises.",
        keywords: [
          "AION2 beginner guide",
          "AION2 launch checklist",
          "AION2 install",
          "AION2 daily reset",
        ],
        sections: [
          {
            id: "confirmed-schedule",
            title: "When do AION2 global advance access and launch begin?",
            paragraphs: [
              "NC’s July 22 notice says Advanced Access starts September 30, 2026 and lasts five days. All three Founder’s Pack editions include the same access period. Steam’s Standard, Deluxe, and Ultimate packages currently list October 5, 2026 as the release date, while the main game page and earlier NC campaign copy still show September 2026; the official fields have not yet been synchronized everywhere.",
              "No checked source publishes an opening hour or time zone. KINA therefore counts whole days to September 30 instead of presenting local midnight as an official time. Preload timing, maintenance length, download availability, and region-by-region server opening remain subject to a later NC notice.",
            ],
            bullets: [
              "September 30: confirmed Founder’s Pack advance-access start date.",
              "October 5: release date currently shown on Steam package pages.",
              "Opening hour, preload, and maintenance: not yet published.",
            ],
          },
          {
            id: "platform-region-language",
            title: "Choose Steam or PURPLE, then confirm region and language",
            paragraphs: [
              "The global version is PC-only through Steam and PURPLE. NC names regional servers for North America, South America, Europe, and Japan and plans ten languages: English, German, French, Spanish, Brazilian Portuguese, Japanese, Korean, Russian, Simplified Chinese, and Traditional Chinese. Steam currently marks English, Japanese, Korean, and Traditional Chinese for full audio, with the remaining listed languages covering interface and subtitles.",
              "A Founder’s Pack purchase determines the launcher used: official guidance says a Steam purchase is played through Steam and a PURPLE purchase through PURPLE, although both connect to the same game servers. Do not buy before confirming the account, region, and launcher you intend to keep. Each account is limited to one edition in the selected store; duplicate cross-platform purchases do not stack access time or rewards.",
            ],
          },
          {
            id: "early-access-choice",
            title: "Should you buy a Founder’s Pack for advance access?",
            paragraphs: [
              "If the only goal is entering early, Standard provides the same five days as Deluxe and Ultimate. Higher editions add the disclosed skins, pet, wings, and styling chest rather than more access time. Recheck local storefront terms for the supply chest, title, and appearance items before paying. A Founder’s Pack should not be read as including membership, market privileges, or unannounced combat power.",
              "NC will open Early Access Servers first and add Launch Servers at full release. Friends on different servers can still add each other and form cross-server groups for supported dungeons, while markets, cross-server markets, server transfers, and Abyss matching follow staged rules. If playing with friends, economy timing, or server pressure matters, agree on region, faction, and server before paying for early access.",
            ],
          },
          {
            id: "install-and-hardware",
            title:
              "Install only from an official entry and reserve 100 GB",
            paragraphs: [
              "Steam currently lists Windows 10/11 64-bit, DirectX 12, 100 GB of available space, and an SSD recommendation. Its minimum reference is a Ryzen 5 2600 or Core i5-10500, 8 GB RAM, and GTX 1050 Ti 4 GB. The recommended reference is a Ryzen 7 3700X or Core i7-11700, 16 GB RAM, and RTX 2070 8 GB. Recheck the store before installing because requirements can still change before release.",
              "The current Korean service uses PURPLE PC on its official download page and has its own installation flow and requirements. That proves how the Korean service is installed now; it does not automatically establish an identical client, requirement set, or sign-in path for the global build.",
            ],
            bullets: [
              "Confirm that the address belongs to Steam or an official NC domain.",
              "Leave enough room for installation and updates, using the current official value.",
              "Update the graphics driver and close unnecessary background applications; general troubleshooting does not guarantee performance.",
            ],
          },
          {
            id: "class-shortlist",
            title: "Create a two- or three-class shortlist and agree on faction",
            paragraphs: [
              "The global teaser lists eight classes. Keep two or three candidates based on frontline, defense, precision melee, range, magic, summons or solo orientation, healing, or multiplayer support, then read the class-choice and official-reference pages.",
              "Do not remove a candidate because of a tier image with no build or sample. Before committing, inspect skill text and controls in the service build you can actually play. The global build, current Korea/Taiwan service, and later updates should not be assumed identical.",
            ],
          },
          {
            id: "read-before-commit",
            title:
              "Read the live system before an irreversible first-day commitment",
            paragraphs: [
              "When an option is described as bound, one-time, non-refundable, limited, or expiring, stop and read its complete description and regional notice. If the page does not answer its use, restriction, or reversibility, record it as unresolved instead of inferring from an older guide.",
              "During the opening period, retain scarce or difficult-to-recover resources until you understand the system and character direction for that build. This is a decision principle, not a promise about any named currency, material, or number of free resets.",
            ],
            steps: [
              {
                title: "Identify restriction language",
                description:
                  "Look for current account or character limits, binding, expiry, trade limits, and refund wording.",
              },
              {
                title: "Check the regional source",
                description:
                  "Verify with in-game text and notices for your service instead of borrowing another region or old build.",
              },
              {
                title: "Record the reason",
                description:
                  "Hold the resource while unresolved; commit only after its use and cost are clear.",
              },
            ],
          },
          {
            id: "reset-and-safety",
            title: "Complete registration, protect the account, and learn the global reset",
            paragraphs: [
              "The official global flow now accepts registration or sign-up according to the player’s region. Reward eligibility must be read on that regional official page. Keep its completion screen or email, and treat a Steam wishlist, pre-registration, Founder’s Pack, and public redeem code as separate processes.",
              "KINA’s daily checklist currently supports the live Taiwan/Hong Kong/Macau and Korea cycles, but their daily and weekly resets cannot be copied into global before launch. After first login, use the global in-game countdown and regional notices to establish the new cycle. Maintenance, daylight-saving changes, and special events may move practical boundaries.",
              "Before a sign-in, pre-registration, download, redemption, or payment, use the scam-check guide to verify the domain and request. Do not enter an account through a private-message short link or confuse a public coupon, personal serial, pre-registration reward, and paid product.",
            ],
            bullets: [
              "Choose the service you actually play; the website language never selects a server for you.",
              "Recheck special schedules and counts after maintenance or a build update.",
              "Keep official completion screens or emails and never share a password or one-time code.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 9, {
        eyebrow: "글로벌 출시 준비",
        title: "AION2 글로벌 출시 가이드: 선행 접속·설치·첫날 준비",
        description:
          "9월 30일 선행 접속, Steam·PURPLE 선택, PC 사양, 지역, 언어, 직업, 사전등록과 첫날 자원 판단까지 AION2 글로벌 출시 준비를 정리했습니다.",
        intro:
          "먼저 답하면 NC는 파운더스 팩의 5일 선행 접속이 2026년 9월 30일 시작된다고 확인했습니다. Steam 패키지 페이지는 현재 10월 5일을 출시일로 표시하지만, NC와 Steam 메인 게임 페이지의 이전 문구는 아직 2026년 9월로 남아 있고 정확한 서버 오픈 시각은 공개되지 않았습니다. 지금 할 일은 지역 공식 등록을 마치고 플랫폼과 지역을 고른 뒤 저장 공간과 사양을 확인하며, 직업과 서버 후보를 줄이는 것입니다.",
        sourceNote:
          "2026년 7월 23일 NC 글로벌 사이트, 7월 17일 Early Access 운영 공지, 7월 22일 파운더스 팩 상품 공지와 Steam을 확인했습니다. 날짜는 현재 출처 필드를 따르며 한국·대만 현행판 시스템, 초기화와 이벤트를 글로벌 서비스의 약속으로 복사하지 않습니다.",
        keywords: [
          "아이온2 초보자 공략",
          "아이온2 출시 준비",
          "아이온2 설치",
          "아이온2 일일 초기화",
        ],
        sections: [
          {
            id: "confirmed-schedule",
            title: "AION2 글로벌 선행 접속과 정식 출시는 언제인가요?",
            paragraphs: [
              "NC의 7월 22일 공지는 Advanced Access가 2026년 9월 30일 시작해 5일 동안 진행된다고 설명합니다. 세 파운더스 팩 모두 같은 기간을 제공합니다. Steam의 Standard, Deluxe, Ultimate 패키지는 현재 2026년 10월 5일을 Release Date로 표시하지만 메인 게임 페이지와 NC의 이전 캠페인 문구는 아직 September 2026으로 남아 있어 공식 필드가 모든 페이지에서 동기화된 상태는 아닙니다.",
              "확인한 출처에는 오픈 시간과 시간대가 없습니다. KINA는 현지 자정을 공식 시각처럼 표시하지 않고 9월 30일까지 남은 날짜만 계산합니다. 사전 다운로드, 점검 길이, 클라이언트 공개와 지역별 서버 오픈 시각은 후속 NC 공지를 기다려야 합니다.",
            ],
            bullets: [
              "9월 30일: 확정된 파운더스 팩 선행 접속 시작일.",
              "10월 5일: Steam 패키지 페이지가 현재 표시하는 출시일.",
              "오픈 시각, 사전 다운로드와 점검: 아직 미공개.",
            ],
          },
          {
            id: "platform-region-language",
            title: "Steam 또는 PURPLE를 고른 뒤 지역과 언어를 확인합니다",
            paragraphs: [
              "글로벌판은 Steam과 PURPLE를 통한 PC 전용 서비스입니다. NC는 북미, 남미, 유럽, 일본 지역 서버와 영어, 독일어, 프랑스어, 스페인어, 브라질 포르투갈어, 일본어, 한국어, 러시아어, 중국어 간체·번체까지 10개 언어를 예고했습니다. Steam은 현재 영어, 일본어, 한국어, 번체 중국어에 전체 음성을 표시하며 나머지 언어는 인터페이스와 자막 중심입니다.",
              "파운더스 팩 구매 플랫폼이 실행 경로를 정합니다. 공식 안내상 Steam 구매는 Steam, PURPLE 구매는 PURPLE로 플레이하지만 같은 게임 서버에 접속합니다. 사용할 계정, 지역과 런처를 정하기 전 중복 구매하지 마세요. 선택한 스토어에서는 계정당 한 에디션만 구매할 수 있으며, 플랫폼을 바꿔 중복 구매해도 선행 접속 기간이나 보상이 중첩되지 않습니다.",
            ],
          },
          {
            id: "early-access-choice",
            title: "선행 접속을 위해 파운더스 팩을 사야 할까요?",
            paragraphs: [
              "목적이 먼저 접속하는 것뿐이라면 Standard도 Deluxe, Ultimate와 같은 5일을 제공합니다. 상위 에디션은 공개된 스킨, 펫, 날개와 스타일링 상자를 추가할 뿐 선행 일수를 늘리지 않습니다. 결제 전 지역 상점에서 보급 상자, 칭호와 외형의 현재 조건을 다시 확인하세요. 파운더스 팩에 멤버십, 거래 권한이나 미공개 전투력이 포함된다고 해석해서는 안 됩니다.",
              "NC는 Early Access Server를 먼저 열고 정식 출시 때 Launch Server를 추가합니다. 다른 서버의 친구와도 친구 추가와 지원 던전의 크로스 서버 파티가 가능하지만 시장, 크로스 서버 시장, 서버 이전과 어비스 매칭은 단계별 규칙을 따릅니다. 친구와 같은 서버, 경제 개방 속도나 서버 혼잡이 중요하다면 구매 전에 지역, 종족과 서버를 함께 정하세요.",
            ],
          },
          {
            id: "install-and-hardware",
            title: "공식 경로에서만 설치하고 100GB 공간을 확보합니다",
            paragraphs: [
              "Steam은 현재 Windows 10/11 64-bit, DirectX 12, 100GB 여유 공간과 SSD 권장을 표시합니다. 최소 기준은 Ryzen 5 2600 또는 Core i5-10500, 메모리 8GB, GTX 1050 Ti 4GB이며 권장 기준은 Ryzen 7 3700X 또는 Core i7-11700, 메모리 16GB, RTX 2070 8GB입니다. 출시 전 바뀔 수 있으므로 설치 전에 상점의 현재 요구사항을 다시 확인합니다.",
              "한국 현행 서비스의 공식 다운로드 페이지는 PURPLE PC와 별도의 설치 흐름 및 사양을 안내합니다. 이는 현재 한국 서비스 설치 방법을 증명하지만 글로벌판이 동일한 클라이언트, 사양, 로그인 경로를 사용한다는 약속은 아닙니다.",
            ],
            bullets: [
              "주소가 Steam 또는 NC 공식 도메인인지 확인합니다.",
              "현재 공식 수치를 기준으로 설치와 업데이트 공간을 확보합니다.",
              "그래픽 드라이버를 갱신하고 불필요한 백그라운드 앱을 닫되 일반 점검이 성능을 보장한다고 쓰지 않습니다.",
            ],
          },
          {
            id: "class-shortlist",
            title: "직업 후보를 두세 개 만들고 종족을 함께 정합니다",
            paragraphs: [
              "글로벌 티저에는 8개 직업이 나옵니다. 전열, 방어, 정밀 근접, 원거리, 마법, 소환·솔로, 치유, 다인 지원 성향에 따라 두세 개를 남기고 직업 선택 및 공식 자료 문서를 읽습니다.",
              "버전과 표본이 없는 티어 이미지 때문에 후보를 지우지 않습니다. 시간과 자원을 투입하기 전에 실제 플레이할 서비스 버전의 스킬 설명과 조작을 확인합니다. 글로벌판, 한국·대만 현행판, 이후 업데이트가 완전히 같다고 가정하지 않습니다.",
            ],
          },
          {
            id: "read-before-commit",
            title: "첫날 되돌리기 어려운 투입 전에 시스템을 읽습니다",
            paragraphs: [
              "귀속, 1회, 환불 불가, 횟수 제한, 기간 제한이라고 표시된 선택지는 멈추고 전체 설명과 서비스 지역 공지를 읽습니다. 용도, 제한, 취소 가능 여부가 설명되지 않았다면 과거 공략으로 추측하지 말고 미확인 항목으로 기록합니다.",
              "초기에는 해당 버전의 시스템과 캐릭터 방향을 이해할 때까지 희소하거나 복구하기 어려운 자원을 보유할 수 있습니다. 이는 판단 원칙이며 특정 재화, 재료, 무료 초기화 횟수를 약속하는 문장이 아닙니다.",
            ],
            steps: [
              {
                title: "제한 문구 찾기",
                description:
                  "현재 계정·캐릭터 제한, 귀속, 기간, 거래, 환불 문구를 확인합니다.",
              },
              {
                title: "지역 공식 정보 확인",
                description:
                  "다른 지역이나 과거 버전이 아니라 플레이 중인 서비스의 공지와 게임 내 문구를 봅니다.",
              },
              {
                title: "결정 이유 기록",
                description:
                  "미확인 상태에서는 보유하고 용도와 비용이 명확해진 뒤 투입합니다.",
              },
            ],
          },
          {
            id: "reset-and-safety",
            title: "등록을 마치고 계정을 보호하며 글로벌 초기화를 확인합니다",
            paragraphs: [
              "글로벌 공식 흐름은 지역에 따라 등록 또는 소식 신청을 받고 있습니다. 보상과 자격은 반드시 거주 지역의 공식 페이지에서 확인하세요. 완료 화면이나 메일을 보관하고 Steam 찜, 사전등록, 파운더스 팩과 공개 쿠폰을 서로 다른 절차로 구분합니다.",
              "KINA 일일 체크리스트는 현재 대만·홍콩·마카오와 한국 현행 서비스 주기를 지원하지만 그 일일·주간 초기화를 출시 전 글로벌판에 복사할 수는 없습니다. 첫 로그인 뒤 글로벌 게임 내 카운트다운과 지역 공지로 새 주기를 확인하세요. 점검, 서머타임과 특별 이벤트가 실제 경계를 바꿀 수 있습니다.",
              "로그인, 사전등록, 다운로드, 코드 입력, 결제 전에는 사기 예방 문서로 도메인과 요청 내용을 확인합니다. 개인 메시지의 단축 URL에 계정을 입력하거나 공개 쿠폰, 개인 시리얼, 사전등록 보상, 유료 상품을 같은 것으로 취급하지 않습니다.",
            ],
            bullets: [
              "실제로 플레이하는 서비스를 선택하며 웹사이트 언어가 서버를 대신 정하지 않습니다.",
              "점검이나 버전 업데이트 뒤 특수 일정과 횟수를 다시 확인합니다.",
              "공식 완료 화면이나 메일을 보관하고 비밀번호나 일회용 인증번호를 공유하지 않습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "guides",
    slug: "global-monetization-watchlist",
    schemaType: "Article",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-26",
    readingMinutes: 9,
    publication: publishedVerified,
    sources: [globalBusinessModelSource, steamSource],
    heroImage: globalHeroImage,
    related: [
      {
        kind: "content",
        section: "news",
        slug: "global-release-september-2026",
      },
      { kind: "content", section: "guides", slug: "global-pre-registration" },
      { kind: "content", section: "guides", slug: "founders-pack-comparison" },
      { kind: "content", section: "guides", slug: "system-requirements" },
      { kind: "content", section: "guides", slug: "kinah-bound" },
      { kind: "content", section: "guides", slug: "scam-check" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 9, {
        eyebrow: "全球版免費遊玩與付費模式",
        title: "AION 2 全球版 Free-to-Play：會員、Kina、Quna 與 Daeva Pass",
        description:
          "AION 2 全球版基本遊戲預定免費遊玩；官方規劃每月 15 美元會員，並已說明 Market、Kina／Quna Exchange、逐角色 Daeva Pass 與商城原則。",
        intro:
          "答案先說：AION 2 全球版基本遊戲不需購買即可遊玩，Steam 也標示 Free To Play 與 In-App Purchases。NC 目前規劃會員費為每月 15 美元；啟用會員才可使用玩家 Market 與 Kina／Quna Exchange。這是上線前方案，完整會員權益、Quna 售價、匯率與玩家直接交易規則仍未公布。",
        sourceNote:
          "2026 年 7 月 24 日依 NC 全球版 Team Update 與 Steam 商店頁核對。文中把官方已公布項目、官方定位與仍未知項目分開；不以韓國／臺灣現行商城或社群傳聞補空白。",
        keywords: [
          "AION 2 free to play",
          "AION 2 全球版付費模式",
          "AION2 會員",
          "AION2 Kina Quna",
          "AION2 Daeva Pass",
          "AION 2 Pay-to-Win",
          "AION 2 Monetization",
        ],
        sections: [
          {
            id: "confirmed",
            title: "AION 2 全球版是免費遊玩嗎？",
            paragraphs: [
              "是。NC 表示全球版基本遊戲採 Free-to-Play，玩家不需先購買遊戲；Steam 同時把 AION 2 列為 Free To Play 並標示 In-App Purchases。免費進入不代表沒有商城、會員或 Pass，也不代表每項服務都對非會員開放。",
              "官方目前明確把 Market 與 Kina／Quna Exchange 設為需啟用會員的功能。非會員能否使用其他特定社交或便利功能，應等完整會員權益表；不能從「免費遊玩」四個字自行推定。",
            ],
            table: {
              caption: "AION 2 全球版付費模式核對表（2026 年 7 月 24 日）",
              headers: ["項目", "已公布內容", "仍未知"],
              rows: [
                { header: "基本遊戲", cells: ["Free-to-Play，不需購買遊戲", "最終服務條款與地區差異"] },
                { header: "會員", cells: ["規劃每月 US$15", "完整權益、續訂與區域價格"] },
                { header: "Market／Exchange", cells: ["需啟用會員", "手續費、限制與最終規則"] },
                { header: "Kina／Quna", cells: ["Kina 由遊戲取得；Quna 為付費貨幣", "Quna 套裝、價格與交換率"] },
                { header: "Daeva Pass", cells: ["每個角色計算；標準與 Premium 軌", "賽季價格、週期與完整獎勵表"] },
                { header: "直接交易", cells: ["官方只說明玩家驅動 Exchange", "玩家對玩家直接交易是否提供"] },
              ],
            },
          },
          {
            id: "pay-to-win-assessment",
            title: "AION 2 全球版是 Pay-to-Win 嗎？目前能下什麼結論？",
            paragraphs: [
              "簡短答案：目前不能把 AION 2 全球版定論為 Pay-to-Win，也不能反過來保證完全沒有付費影響。官方表示商城外觀不提供戰鬥優勢，消耗品不影響裝備成長或長期力量且可由遊戲取得；但完整商品、價格、取得速度、會員權益與 Pass 獎勵尚未全部公開。",
              "因此本頁的 Monetization 判斷分成兩層：上線前只記錄官方承諾與未知項，上線後再比較付費與免費玩家的取得速度、可交易範圍、時間成本及競爭結果。Founder’s Pack、會員、Quna 和 Daeva Pass 也必須分開評估，不能用其中一項代替整個商業模式。",
            ],
            bullets: [
              "已確認：基本遊戲免費；Steam 標示 In-App Purchases；外觀依官方說法不提供戰鬥優勢。",
              "尚未完整確認：所有商城商品與價格、會員完整權益、Pass 全部獎勵、Quna 交換率及免費取得速度。",
              "本站做法：保留版本日期和原始來源，待全球版實際上線後用同一指標重新核對，而不是預先貼永久標籤。",
            ],
          },
          {
            id: "membership",
            title: "每月 15 美元會員包含什麼？",
            paragraphs: [
              "NC 的上線前規劃是每月 15 美元。官方已明說 Active Membership 會解鎖玩家 Market、Kina 與 Quna 的 Exchange，另有額外遊戲權益，以及一個使用 Kina 的特殊商店。",
              "官方尚未公布完整會員權益清單、非會員功能矩陣、區域價格、稅費、續訂與取消細節。基本遊戲免費，並不等於所有功能都免費；目前能明確指出的會員門檻只有 Market 與 Exchange。",
            ],
            bullets: [
              "每月 US$15 是目前規劃，不是永不改變的最終價格承諾。",
              "Market 與 Kina／Quna Exchange 需要有效會員。",
              "額外遊戲權益與 Kina 特殊商店已被提及，但完整清單未公布。",
              "升級、組隊、副本與 PVP 的非會員逐項限制尚未由官方完整列出。",
            ],
          },
          {
            id: "currencies-and-pass",
            title: "Kina、Quna、Exchange 與 Daeva Pass 如何運作？",
            paragraphs: [
              "Kina 是透過遊戲取得並用於玩家 Market 的貨幣。Quna 是付費貨幣，可購買商城物品、解鎖 Premium Daeva Pass，也可透過玩家驅動的 Exchange 購買 Kina。NC 表示遊戲本身不會在 Exchange 掛單或買入，價格由玩家供需形成。",
              "Daeva Pass 以角色為單位。每個角色都有標準獎勵軌，Premium 軌則用 Quna 解鎖；官方提到的獎勵類型包含外觀、道具、強化材料與其他貨幣。Quna 套裝售價、Exchange 匯率、Pass 賽季價格與完整獎勵仍未知。",
            ],
            steps: [
              {
                title: "先區分貨幣",
                description: "Kina 由遊戲取得；Quna 是付費貨幣，兩者不能因名稱相近而混為同一餘額。",
              },
              {
                title: "確認會員狀態",
                description: "Market 與 Kina／Quna Exchange 都要求有效會員，購買前先確認實際帳號狀態。",
              },
              {
                title: "分角色計算 Pass",
                description: "Daeva Pass 是逐角色進行；不要把一個角色的 Premium 解鎖推定為帳號全角色共用。",
              },
              {
                title: "等待實價資料",
                description: "Quna 套裝、區域價格、交換率與 Pass 定價未公布時，不用其他服務區的數字換算。",
              },
            ],
          },
          {
            id: "power-and-unknowns",
            title: "商城會影響戰力嗎？哪些問題仍未公布？",
            paragraphs: [
              "官方表示商城外觀不提供遊戲或戰鬥優勢；消耗品可協助戰鬥，但官方定位為不影響裝備成長或長期力量，且能透過正常遊玩取得。這是官方公布的設計原則，不是本站對實際經濟、取得速度或競爭差距的上線後實測結論。",
              "仍未知的重點包括完整會員權益、Quna 價格與交換率、直接玩家交易、Pass 週期與完整獎勵，以及各商品的地區價格和退款條款。Founder’s Pack 是一次性付費商品；現有包內容沒有列出會員，不能把兩者視為同一產品。",
            ],
            faq: [
              { question: "AION 2 全球版需要先買遊戲嗎？", answer: "不需要。NC 將基本遊戲定為 Free-to-Play，Steam 也標示 Free To Play；遊戲內仍有會員、Quna、Pass 與商城購買。" },
              { question: "AION 2 會員多少錢？", answer: "官方目前規劃每月 15 美元。這是上線前方案，區域價格、稅費、續訂與完整權益仍待正式商品頁。" },
              { question: "不買會員可以使用 Market 嗎？", answer: "依目前官方說明不可以；Market 與 Kina／Quna Exchange 都要求有效會員。其他非會員功能限制尚未逐項公布。" },
              { question: "Daeva Pass 是帳號共用嗎？", answer: "官方目前說明 Daeva Pass 以角色為單位；標準軌對所有玩家開放，Premium 軌以 Quna 解鎖。不要假設一次購買可套用全帳號角色。" },
              { question: "AION 2 全球版是否 Pay-to-Win？", answer: "官方承諾外觀不提供戰鬥優勢，並表示消耗品不影響長期力量且可由遊戲取得；完整商品、價格與實際取得速度尚未公布，因此現在不能做完整實測結論。" },
            ],
          },
        ],
      }),
      en: articleCopy("en", 9, {
        eyebrow: "GLOBAL FREE-TO-PLAY & MONETIZATION",
        title:
          "Is AION 2 Free-to-Play? Membership, Kina, Quna & Daeva Pass",
        description:
          "AION 2 Global is planned as free-to-play, with a planned $15 monthly Membership, member-only Market and Exchange access, Kina, Quna, and a per-character Daeva Pass.",
        intro:
          "Answer first: AION 2 Global's base game will be free to play with no game purchase required, and Steam lists Free To Play plus In-App Purchases. NC currently plans a $15-per-month Membership; an active Membership is required for the player Market and the Kina/Quna Exchange. This is a pre-launch plan, while the complete benefits, Quna pricing, exchange rates, and direct-trading rules remain unpublished.",
        sourceNote:
          "Verified July 24, 2026 against NC's Global Team Update and the Steam store. Confirmed details, official positioning, and unknowns are kept separate; Korea/Taiwan live products and community claims are not used to fill gaps.",
        keywords: [
          "AION 2 free to play",
          "AION 2 Global monetization",
          "AION 2 Membership",
          "AION 2 Kina Quna",
          "AION 2 Daeva Pass",
          "AION 2 pay-to-win",
        ],
        sections: [
          {
            id: "confirmed",
            title: "Is AION 2 Global free to play?",
            paragraphs: [
              "Yes. NC says the base game will be Free-to-Play with no game purchase required. Steam also categorizes AION 2 as Free To Play and displays In-App Purchases. Free entry does not mean that the store, Membership, Pass, or every service feature is free.",
              "NC explicitly places the player Market and Kina/Quna Exchange behind an active Membership. A complete nonmember feature matrix has not been published, so the free-to-play label should not be stretched into claims about every social or convenience feature.",
            ],
            table: {
              caption: "AION 2 Global monetization status — verified July 24, 2026",
              headers: ["Feature", "Confirmed", "Still unknown"],
              rows: [
                { header: "Base game", cells: ["Free-to-Play; no game purchase required", "Final service terms and regional differences"] },
                { header: "Membership", cells: ["Planned at US$15 per month", "Full benefits, renewal, and regional prices"] },
                { header: "Market / Exchange", cells: ["Active Membership required", "Fees, limits, and final operating rules"] },
                { header: "Kina / Quna", cells: ["Kina is earned in play; Quna is premium currency", "Quna packs, prices, and exchange rates"] },
                { header: "Daeva Pass", cells: ["Per character; Standard and Premium tracks", "Season price, cadence, and full reward table"] },
                { header: "Direct trading", cells: ["A player-driven Exchange is confirmed", "Whether direct player-to-player trading exists"] },
              ],
            },
          },
          {
            id: "pay-to-win-assessment",
            title: "Is AION 2 Global pay-to-win, and what can be concluded now?",
            paragraphs: [
              "Short answer: the current evidence cannot settle AION 2 Global as pay-to-win, and it cannot guarantee that spending has no practical effect. NC says store cosmetics provide no combat advantage and that consumables do not affect gear progression or long-term power and are obtainable through play. The complete catalog, prices, acquisition rates, Membership benefits, and Pass rewards remain unpublished.",
              "Treat monetization in two stages: before launch, record official commitments and open questions; after launch, compare acquisition speed, tradable scope, time cost, and competitive outcomes for paying and nonpaying players. Founder's Packs, Membership, Quna, and Daeva Pass must be assessed separately rather than letting one product define the entire model.",
            ],
            bullets: [
              "Confirmed: the base game is free; Steam displays In-App Purchases; NC says cosmetics provide no combat advantage.",
              "Not fully known: the complete store and prices, full Membership benefits, every Pass reward, Quna rates, and free acquisition speed.",
              "KINA method: retain dates and primary sources, then repeat the same checks on the live Global service instead of assigning a permanent pre-launch label.",
            ],
          },
          {
            id: "membership",
            title: "What does the planned $15 Membership unlock?",
            paragraphs: [
              "NC's pre-launch plan prices Membership at US$15 per month. The published benefits include access to the player Market, the player-driven Kina/Quna Exchange, additional gameplay benefits, and a special shop that uses Kina.",
              "NC has not published the complete benefit list, a feature-by-feature nonmember matrix, regional prices, taxes, renewal, or cancellation terms. The base game is free, but the only service locks that can currently be stated precisely are the Market and Exchange.",
            ],
            bullets: [
              "US$15 per month is the current plan, not an unchangeable final-price guarantee.",
              "The Market and Kina/Quna Exchange require active Membership.",
              "Additional gameplay benefits and a Kina special shop are named, but the full list is unpublished.",
              "Any nonmember limits for leveling, parties, dungeons, or PVP have not been fully itemized.",
            ],
          },
          {
            id: "currencies-and-pass",
            title: "How do Kina, Quna, the Exchange, and Daeva Pass work?",
            paragraphs: [
              "Kina is earned through gameplay and used in the player Market. Quna is premium currency used for shop items, the Premium Daeva Pass, and purchasing Kina through the player-driven Exchange. NC says the game itself will not make Exchange listings or purchases; player supply and demand drive it.",
              "Daeva Pass progression is per character. Every player receives a Standard track, while Quna unlocks the optional Premium track. NC names cosmetics, items, upgrade materials, and other currencies among its rewards. Quna pack prices, exchange rates, Pass pricing, cadence, and the full reward table remain unknown.",
            ],
            steps: [
              {
                title: "Separate the currencies",
                description: "Kina is gameplay-earned and Quna is premium currency; do not treat similar account balances as interchangeable.",
              },
              {
                title: "Check Membership",
                description: "Both the player Market and Kina/Quna Exchange require an active Membership.",
              },
              {
                title: "Budget Passes per character",
                description: "Daeva Pass is per character; do not assume one Premium unlock covers every character on the account.",
              },
              {
                title: "Wait for real prices",
                description: "Do not convert Korea/Taiwan figures while global Quna packs, regional prices, rates, and Pass pricing are unpublished.",
              },
            ],
          },
          {
            id: "power-and-unknowns",
            title: "Does the store sell power, and what is still unknown?",
            paragraphs: [
              "NC says shop cosmetics provide no gameplay or combat advantage. It says consumables can assist combat but will not affect gear progression or long-term power and can be earned through normal play. That is the published design position, not an independent post-launch test of acquisition speed, economy balance, or competitive gaps.",
              "Unknowns include the complete Membership list, Quna pricing and exchange rates, direct player trading, Pass cadence and complete rewards, plus regional product and refund terms. Founder's Packs are separate one-time products; the published pack contents do not list Membership, so they should not be treated as the same purchase.",
            ],
            faq: [
              { question: "Do I need to buy AION 2 Global?", answer: "No. NC says the base game is Free-to-Play, and Steam lists it as Free To Play. The game still includes Membership, Quna, Pass, and store purchases." },
              { question: "How much is AION 2 Membership?", answer: "NC currently plans US$15 per month. Regional price, tax, renewal, cancellation, and the full benefit list await the final product page." },
              { question: "Can nonmembers use the Market?", answer: "Not under the current official plan. Both the player Market and Kina/Quna Exchange require an active Membership; other nonmember limits have not been fully itemized." },
              { question: "Is Daeva Pass account-wide?", answer: "NC currently describes Daeva Pass as per character. The Standard track is available to all players and Quna unlocks the Premium track; do not assume one purchase covers every character." },
              { question: "Is AION 2 Global pay-to-win?", answer: "NC says cosmetics have no combat advantage and consumables do not affect long-term power and are earnable in play. The full catalog, prices, and acquisition rates are unpublished, so a complete post-launch assessment is not yet possible." },
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 9, {
        eyebrow: "글로벌 무료 플레이와 과금",
        title: "아이온2 글로벌 무료 플레이: 멤버십·키나·큐나·데바 패스",
        description:
          "아이온2 글로벌 기본 게임은 무료 플레이로 준비 중이며 월 15달러 멤버십, 멤버 전용 거래소와 키나·큐나 교환소, 캐릭터별 데바 패스가 공개됐습니다.",
        intro:
          "먼저 답하면 아이온2 글로벌 기본 게임은 구매 없이 무료로 플레이할 수 있고 Steam도 Free To Play와 In-App Purchases를 표시합니다. NC의 현재 계획은 월 15달러 멤버십이며, 활성 멤버십이 있어야 플레이어 거래소와 키나·큐나 교환소를 이용할 수 있습니다. 출시 전 계획이므로 전체 혜택, 큐나 가격, 교환 비율과 직접 거래 규칙은 아직 공개되지 않았습니다.",
        sourceNote:
          "2026년 7월 24일 NC 글로벌 Team Update와 Steam 상점을 확인했습니다. 확인 사실, 공식 설명과 미공개 항목을 구분하며 한국·대만 라이브 상품이나 커뮤니티 주장으로 빈칸을 채우지 않습니다.",
        keywords: [
          "아이온2 글로벌 무료",
          "아이온2 과금",
          "아이온2 멤버십",
          "아이온2 키나 큐나",
          "아이온2 데바 패스",
          "아이온2 Pay-to-Win",
          "아이온2 과금 모델",
        ],
        sections: [
          {
            id: "confirmed",
            title: "아이온2 글로벌은 무료 플레이인가요?",
            paragraphs: [
              "네. NC는 글로벌 기본 게임을 Free-to-Play로 제공하며 게임 구매가 필요 없다고 설명했습니다. Steam도 AION 2를 Free To Play로 분류하고 In-App Purchases를 표시합니다. 무료 진입이 상점, 멤버십, 패스나 모든 서비스 기능까지 무료라는 뜻은 아닙니다.",
              "NC는 플레이어 거래소와 키나·큐나 교환소에 활성 멤버십이 필요하다고 명시했습니다. 비회원의 전체 기능표는 아직 없으므로 무료 플레이 표시를 모든 소셜·편의 기능에 대한 보장으로 확대하면 안 됩니다.",
            ],
            table: {
              caption: "아이온2 글로벌 과금 현황 — 2026년 7월 24일 확인",
              headers: ["항목", "확인된 내용", "아직 모르는 내용"],
              rows: [
                { header: "기본 게임", cells: ["Free-to-Play, 게임 구매 불필요", "최종 약관과 지역 차이"] },
                { header: "멤버십", cells: ["월 US$15 계획", "전체 혜택, 갱신과 지역 가격"] },
                { header: "거래소 / 교환소", cells: ["활성 멤버십 필요", "수수료, 제한과 최종 운영 규칙"] },
                { header: "키나 / 큐나", cells: ["키나는 게임 획득, 큐나는 유료 재화", "큐나 묶음, 가격과 교환 비율"] },
                { header: "데바 패스", cells: ["캐릭터별, 기본·프리미엄 트랙", "시즌 가격, 주기와 전체 보상표"] },
                { header: "직접 거래", cells: ["플레이어 주도 교환소 확인", "플레이어 간 직접 거래 제공 여부"] },
              ],
            },
          },
          {
            id: "pay-to-win-assessment",
            title: "아이온2 글로벌은 Pay-to-Win인가요? 지금 가능한 결론",
            paragraphs: [
              "짧은 답: 현재 근거만으로 아이온2 글로벌을 Pay-to-Win이라고 확정할 수도, 과금이 실질적 영향을 전혀 주지 않는다고 보장할 수도 없습니다. NC는 상점 외형에 전투 이점이 없고 소모품은 장비 성장이나 장기 전투력에 영향을 주지 않으며 플레이로 획득할 수 있다고 설명했습니다. 전체 상품, 가격, 획득 속도, 멤버십 혜택과 패스 보상은 아직 모두 공개되지 않았습니다.",
              "과금 평가는 두 단계로 나눕니다. 출시 전에는 공식 약속과 미공개 항목을 기록하고, 출시 후에는 유료·무료 이용자의 획득 속도, 거래 범위, 시간 비용과 경쟁 결과를 비교합니다. 파운더스 팩, 멤버십, 큐나와 데바 패스도 각각 평가해야 하며 한 상품으로 전체 모델을 단정하지 않습니다.",
            ],
            bullets: [
              "확인: 기본 게임 무료, Steam의 In-App Purchases 표시, 외형에 전투 이점이 없다는 NC 설명.",
              "미확인: 전체 상점과 가격, 멤버십 전체 혜택, 모든 패스 보상, 큐나 교환 비율과 무료 획득 속도.",
              "KINA 방식: 날짜와 1차 출처를 보존하고 글로벌 라이브 서비스에서 같은 지표를 다시 확인해 출시 전 영구 라벨을 피합니다.",
            ],
          },
          {
            id: "membership",
            title: "월 15달러 멤버십은 무엇을 여나요?",
            paragraphs: [
              "NC의 출시 전 계획은 월 US$15입니다. 공개된 혜택은 플레이어 거래소, 키나·큐나 교환소, 추가 게임 혜택, 그리고 키나를 사용하는 특별 상점입니다.",
              "전체 멤버십 혜택, 비회원 기능별 표, 지역 가격, 세금, 갱신과 해지 조건은 공개되지 않았습니다. 기본 게임은 무료지만 현재 정확히 확인할 수 있는 멤버십 제한은 거래소와 교환소입니다.",
            ],
            bullets: [
              "월 US$15는 현재 계획이며 변경 불가한 최종 가격 약속이 아닙니다.",
              "거래소와 키나·큐나 교환소에는 활성 멤버십이 필요합니다.",
              "추가 게임 혜택과 키나 특별 상점은 언급됐지만 전체 목록은 미공개입니다.",
              "레벨업, 파티, 던전, PVP의 비회원 제한은 항목별로 완전히 공개되지 않았습니다.",
            ],
          },
          {
            id: "currencies-and-pass",
            title: "키나·큐나·교환소·데바 패스는 어떻게 작동하나요?",
            paragraphs: [
              "키나는 게임 플레이로 얻어 플레이어 거래소에서 사용합니다. 큐나는 상점 상품, 프리미엄 데바 패스, 플레이어 주도 교환소에서 키나 구매에 쓰는 유료 재화입니다. NC는 게임이 교환소에 직접 등록하거나 구매하지 않으며 플레이어 수요와 공급이 가격을 만든다고 설명합니다.",
              "데바 패스는 캐릭터별로 진행됩니다. 모든 플레이어에게 기본 트랙이 있고 큐나로 선택형 프리미엄 트랙을 엽니다. 보상 유형에는 외형, 아이템, 강화 재료와 기타 재화가 포함됩니다. 큐나 묶음 가격, 교환 비율, 패스 가격과 주기, 전체 보상표는 미공개입니다.",
            ],
            steps: [
              {
                title: "재화 구분",
                description: "키나는 게임 획득 재화, 큐나는 유료 재화이므로 비슷한 잔액을 서로 바꿔 쓸 수 있다고 가정하지 않습니다.",
              },
              {
                title: "멤버십 상태 확인",
                description: "플레이어 거래소와 키나·큐나 교환소 모두 활성 멤버십이 필요합니다.",
              },
              {
                title: "캐릭터별 패스 계산",
                description: "데바 패스는 캐릭터별이므로 프리미엄 한 번이 계정 전체 캐릭터에 적용된다고 가정하지 않습니다.",
              },
              {
                title: "실제 가격 대기",
                description: "글로벌 큐나 묶음, 지역 가격, 교환 비율과 패스 가격이 나오기 전 한국·대만 수치를 환산하지 않습니다.",
              },
            ],
          },
          {
            id: "power-and-unknowns",
            title: "상점은 전투력을 판매하나요? 무엇이 아직 미공개인가요?",
            paragraphs: [
              "NC는 상점 외형이 게임이나 전투 우위를 제공하지 않는다고 밝혔습니다. 소모품은 전투를 도울 수 있지만 장비 성장이나 장기 전투력에 영향을 주지 않고 정상 플레이로 획득할 수 있다고 설명합니다. 이는 공개된 설계 원칙이며 실제 획득 속도, 경제와 경쟁 격차를 출시 후 독립적으로 시험한 결론은 아닙니다.",
              "전체 멤버십 혜택, 큐나 가격과 교환 비율, 직접 거래, 패스 주기와 전체 보상, 지역 상품 가격과 환불 조건이 아직 미공개입니다. Founder’s Pack은 별도 일회성 상품이며 공개 구성에 멤버십이 없으므로 같은 상품으로 보면 안 됩니다.",
            ],
            faq: [
              { question: "아이온2 글로벌 게임을 구매해야 하나요?", answer: "아니요. NC는 기본 게임을 Free-to-Play로 정했고 Steam도 Free To Play로 표시합니다. 멤버십, 큐나, 패스와 상점 구매는 별도로 존재합니다." },
              { question: "아이온2 멤버십 가격은 얼마인가요?", answer: "NC의 현재 계획은 월 US$15입니다. 지역 가격, 세금, 갱신, 해지와 전체 혜택은 최종 상품 페이지를 기다려야 합니다." },
              { question: "비회원도 거래소를 쓸 수 있나요?", answer: "현재 공식 계획에서는 사용할 수 없습니다. 플레이어 거래소와 키나·큐나 교환소 모두 활성 멤버십이 필요하며 다른 비회원 제한은 완전히 공개되지 않았습니다." },
              { question: "데바 패스는 계정 공용인가요?", answer: "NC는 데바 패스를 캐릭터별로 설명합니다. 기본 트랙은 모두 이용하고 프리미엄 트랙은 큐나로 열며 한 번 구매가 모든 캐릭터에 적용된다고 가정하면 안 됩니다." },
              { question: "아이온2 글로벌은 Pay-to-Win인가요?", answer: "NC는 외형에 전투 이점이 없고 소모품이 장기 전투력에 영향을 주지 않으며 게임에서 얻을 수 있다고 밝혔습니다. 전체 상품, 가격과 획득 속도가 미공개라 출시 후 평가까지 지금 확정할 수 없습니다." },
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
