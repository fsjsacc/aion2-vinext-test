import type {
  ContentEntry,
  ContentHeroImage,
  ContentSource,
  LocalizedContent,
} from "./content-registry";
import type { ContentLocale } from "./site-config";

type LocalizedArticleBody = Pick<
  LocalizedContent,
  "eyebrow" | "title" | "description" | "intro" | "sourceNote" | "sections"
> & { keywords?: readonly string[] };

const labels = {
  "zh-hant": {
    byline: "AION2 KINA 編輯部",
    backLabel: "返回新聞中心",
    contentsLabel: "本文重點",
    publishedLabel: "本站發布",
    updatedLabel: "資料核對",
    relatedLabel: "延伸閱讀",
  },
  en: {
    byline: "AION2 KINA Editorial",
    backLabel: "Back to news",
    contentsLabel: "In this report",
    publishedLabel: "KINA published",
    updatedLabel: "Last verified",
    relatedLabel: "Related reading",
  },
  ko: {
    byline: "AION2 KINA 편집부",
    backLabel: "뉴스로 돌아가기",
    contentsLabel: "이 글의 핵심",
    publishedLabel: "사이트 게시",
    updatedLabel: "자료 확인",
    relatedLabel: "관련 글",
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
    ko: `${readingMinutes}분 읽기`,
  }[locale];

  return { ...labels[locale], readingTime, ...body };
}

const publishedVerified = {
  status: "published",
  indexable: true,
  localeReview: { "zh-hant": "approved", en: "approved", ko: "approved" },
  sourceReview: "verified",
} as const satisfies ContentEntry["publication"];

function officialSource(
  id: string,
  label: string,
  url: string,
  publishedAt: string,
): ContentSource {
  return {
    id,
    kind: "official",
    publisher: "NC Corporation",
    label,
    url,
    publishedAt,
    retrievedAt: "2026-07-21",
    verifiedAt: "2026-07-21",
  };
}

function officialHero(
  src: string,
  sourceUrl: string,
  translations: ContentHeroImage["translations"],
): ContentHeroImage {
  return {
    src,
    width: 800,
    height: 420,
    credit: "NC Corporation",
    sourceUrl,
    rights: "linked-official-media",
    translations,
  };
}

const chaliceSource = officialSource(
  "nc-chalice-of-muspel-2026-05-27",
  "AION 2 launches the Chalice of Muspel update",
  "https://about.ncsoft.com/en/news/article/aion2_update_260527",
  "2026-05-27",
);

const mirrorSource = officialSource(
  "nc-mirror-of-scarlet-desire-2026-05-13",
  "AION 2 launches the Mirror of Scarlet Desire update",
  "https://about.ncsoft.com/en/news/article/aion2_update_260513",
  "2026-05-13",
);

const decontaminationSource = officialSource(
  "nc-corroded-decontamination-facility-2026-03-11",
  "AION 2 launches the Corroded Decontamination Facility update",
  "https://about.ncsoft.com/en/news/article/aion2_update_260311",
  "2026-03-11",
);

const sunkenTempleSource = officialSource(
  "nc-sunken-temple-of-life-2026-02-23",
  "AION 2 marks 100 days with the Sunken Temple of Life update",
  "https://about.ncsoft.com/en/news/article/aion2_update_260223",
  "2026-02-23",
);

const sunkenTempleTwSource = officialSource(
  "nc-tw-sunken-temple-of-life-2026-02-23",
  "《AION2》上市百日推出「沉沒的生命神殿」更新",
  "https://about.ncsoft.com/tw/news/article/aion2_update_260223",
  "2026-02-23",
);

const cradleSource = officialSource(
  "nc-cradle-of-nihility-2026-02-11",
  "AION 2 launches the Cradle of Nihility update",
  "https://about.ncsoft.com/en/news/article/aion2_update_260211",
  "2026-02-11",
);

export const recentOfficialNewsContentEntries = [
  {
    section: "news",
    slug: "chalice-of-muspel-sanctuary-update",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [chaliceSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/d7bbd612-d975-494b-abc1-d4c1f1de2035.png",
      chaliceSource.url,
      {
        "zh-hant": {
          alt: "AION2 Chalice of Muspel 更新官方宣傳圖",
          caption: "NC Corporation 官方更新圖；本文數值以 2026 年 5 月 27 日公告為準。",
        },
        en: {
          alt: "Official key art for the AION2 Chalice of Muspel update",
          caption: "Official NC Corporation update art; figures reflect the May 27, 2026 announcement.",
        },
        ko: {
          alt: "AION2 무스펠의 성배 업데이트 공식 이미지",
          caption: "NC Corporation 공식 업데이트 이미지이며 수치는 2026년 5월 27일 발표 기준입니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "wing-enhancement" },
      { kind: "content", section: "guides", slug: "crafting-and-transfer-crafting" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "官方更新整理",
        title: "AION2 Chalice of Muspel 更新：4,500 裝等、繼承製作與翅膀強化",
        description:
          "整理 Chalice of Muspel 聖域副本、熔岩之心獎勵、龍帝裝備繼承製作、能力值上限與翅膀強化等官方更新重點。",
        intro:
          "NC Corporation 在 2026 年 5 月 27 日公開 Chalice of Muspel 更新。這次內容不只加入道具等級 4,500 的高難度聖域，也同步調整裝備成長、角色能力值上限與翅膀系統；以下只整理公告可核對的資訊。",
        sourceNote:
          "資料來源為 NC Corporation 2026 年 5 月 27 日官方公告；數值是公告當日的韓國／台灣服務版本快照，未來全球版不保證完全相同。",
        keywords: ["AION2 Chalice of Muspel", "AION2 4500 裝等", "AION2 翅膀強化", "AION2 繼承製作"],
        sections: [
          {
            id: "sanctuary-and-rewards",
            title: "4,500 道具等級聖域與主要獎勵",
            paragraphs: [
              "Chalice of Muspel 被列為需要至少 4,500 道具等級的聖域內容，核心頭目是 Scourage Kaldrix。官方列出的代表獎勵包含 Lava Heart Weapon（Extend）、Lava Heart Barrier 與 Kaldrix Brooch，首次通關另可取得 Red Dragon 寵物。",
              "這些名稱與門檻反映公告當時的服務內容，不代表所有地區日後會沿用相同譯名、掉落率或入場條件。實際挑戰前仍應以遊戲內副本資訊與所在地區更新公告為準。",
            ],
          },
          {
            id: "progression-systems",
            title: "繼承製作、能力值上限與翅膀強化",
            paragraphs: [
              "Genesis 與 Nemesis Dragon Lord Weapon／Guard 在這次公告中改以 Transfer Crafting 取得，製作時可從六種基礎 Soul Inscription 選項中選擇。Middle Reshanta 的島嶼配置也一併調整，表示裝備成長與深淵路線需要重新核對。",
              "Might、Dexterity、Precision、Willpower、Intelligence、Constitution 的上限提高至 250，Attack Boost 與 Defense Boost 的最大值提高至 130%。官方同時加入 Wings Enhance，讓翅膀成為新的強化項目；這些都是公告日期的數值快照。",
            ],
          },
          {
            id: "version-and-history",
            title: "版本範圍與已結束活動",
            paragraphs: [
              "公告同頁提到的 Spark of Resurrection 活動已在 2026 年 6 月 10 日維護時結束，因此本文只將它視為歷史更新紀錄，不把活動獎勵或參與方式標示為目前可用。",
              "AION2 後續全球版可能採用不同名稱、數值、開放次序或活動安排。本文的 4,500、250 與 130% 等數字只代表 2026 年 5 月 27 日官方公告快照，不能直接當作全球正式版的永久規則。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "OFFICIAL UPDATE BRIEF",
        title: "AION2 Chalice of Muspel update: item level 4,500, Transfer Crafting, and Wings Enhance",
        description:
          "A sourced summary of the Chalice of Muspel Sanctuary, Lava Heart rewards, Dragon Lord Transfer Crafting, stat caps, and Wings Enhance.",
        intro:
          "NC Corporation announced the Chalice of Muspel update on May 27, 2026. It paired a new item-level-4,500 Sanctuary with changes to equipment progression, character stat ceilings, and wings; this report separates confirmed release details from later-version assumptions.",
        sourceNote:
          "Based on NC Corporation's May 27, 2026 announcement. Every figure is a Korea/Taiwan service snapshot from that date, and a later global build is not guaranteed to match it.",
        keywords: ["AION2 Chalice of Muspel", "AION2 item level 4500", "AION2 Wings Enhance", "AION2 Transfer Crafting"],
        sections: [
          {
            id: "sanctuary-and-rewards",
            title: "A level-4,500 Sanctuary and its headline rewards",
            paragraphs: [
              "Chalice of Muspel was introduced as a Sanctuary requiring at least item level 4,500, with Scourage Kaldrix as its central boss. The official announcement names Lava Heart Weapon (Extend), Lava Heart Barrier, and Kaldrix Brooch among the rewards, while a first clear grants the Red Dragon pet.",
              "Those requirements and names describe the live-service build covered by the announcement. Drop rates, translations, and entry conditions may change by region, so the in-game dungeon panel remains the final check before committing resources.",
            ],
          },
          {
            id: "progression-systems",
            title: "Transfer Crafting, higher caps, and Wings Enhance",
            paragraphs: [
              "Genesis and Nemesis Dragon Lord Weapon and Guard equipment became obtainable only through Transfer Crafting, with six base Soul Inscription choices listed for the craft. Middle Reshanta also received island changes, making older Abyss routes worth checking again.",
              "The caps for Might, Dexterity, Precision, Willpower, Intelligence, and Constitution rose to 250, while Attack Boost and Defense Boost reached a 130% maximum. Wings Enhance was also introduced as a new progression layer; all of these values are announcement-date snapshots.",
            ],
          },
          {
            id: "version-and-history",
            title: "Version scope and historical promotions",
            paragraphs: [
              "The Spark of Resurrection event mentioned with this release ended at the June 10, 2026 maintenance. It is recorded here for chronology only, not presented as an active event or a currently claimable reward path.",
              "A future global AION2 build may use different names, balance values, sequencing, or promotions. Item level 4,500, the 250 stat caps, and the 130% boost ceiling therefore describe the May 27 announcement rather than a permanent global promise.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "공식 업데이트 정리",
        title: "AION2 무스펠의 성배 업데이트: 아이템 레벨 4,500·계승 제작·날개 강화",
        description:
          "무스펠의 성배 성역, 용암의 심장 보상, 용제 장비 계승 제작, 능력치 상한과 날개 강화의 공식 발표 내용을 정리했습니다.",
        intro:
          "NC Corporation은 2026년 5월 27일 무스펠의 성배 업데이트를 발표했습니다. 아이템 레벨 4,500 성역과 함께 장비 성장, 캐릭터 능력치 상한, 날개 시스템이 바뀐 업데이트로, 이 글은 공식 발표에서 확인되는 내용만 구분해 설명합니다.",
        sourceNote:
          "NC Corporation의 2026년 5월 27일 공식 발표를 기준으로 작성했습니다. 수치는 발표 당시 한국·대만 서비스 스냅샷이며 향후 글로벌 버전이 동일하다고 보장할 수 없습니다.",
        keywords: ["AION2 무스펠의 성배", "아이온2 아이템 레벨 4500", "아이온2 날개 강화", "아이온2 계승 제작"],
        sections: [
          {
            id: "sanctuary-and-rewards",
            title: "아이템 레벨 4,500 성역과 주요 보상",
            paragraphs: [
              "무스펠의 성배는 최소 아이템 레벨 4,500이 필요한 성역으로 소개됐고, 핵심 보스는 Scourage Kaldrix입니다. 공식 발표에는 Lava Heart Weapon (Extend), Lava Heart Barrier, Kaldrix Brooch가 대표 보상으로 적혀 있으며 최초 클리어 보상은 Red Dragon 펫입니다.",
              "이 명칭과 입장 조건은 발표가 다룬 당시 서비스 빌드 기준입니다. 지역별 번역, 드롭 확률, 입장 조건은 달라질 수 있으므로 실제 도전 전에는 게임 안의 던전 정보와 해당 지역 공지를 다시 확인해야 합니다.",
            ],
          },
          {
            id: "progression-systems",
            title: "계승 제작, 능력치 상한, 날개 강화",
            paragraphs: [
              "Genesis와 Nemesis Dragon Lord Weapon·Guard 장비는 계승 제작으로만 획득하도록 안내됐으며 제작 시 여섯 가지 기본 Soul Inscription 선택지가 제시됐습니다. Middle Reshanta 섬 배치도 함께 바뀌어 기존 어비스 동선을 다시 점검할 필요가 생겼습니다.",
              "Might, Dexterity, Precision, Willpower, Intelligence, Constitution의 상한은 250, Attack Boost와 Defense Boost의 최대치는 130%로 확대됐습니다. 날개 강화도 새로운 성장 축으로 추가됐으며, 이 수치들은 모두 발표일 기준 스냅샷입니다.",
            ],
          },
          {
            id: "version-and-history",
            title: "버전 범위와 종료된 이벤트",
            paragraphs: [
              "같은 발표에서 다룬 Spark of Resurrection 이벤트는 2026년 6월 10일 점검에 종료됐습니다. 따라서 이 글에서는 업데이트 이력을 설명하는 자료로만 남기며 현재 참여 가능한 이벤트나 보상으로 안내하지 않습니다.",
              "향후 글로벌 버전은 명칭, 수치, 적용 순서, 이벤트 구성이 달라질 수 있습니다. 아이템 레벨 4,500, 능력치 250, 130% 상한은 2026년 5월 27일 발표의 기록이지 글로벌 버전의 영구 규칙이 아닙니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "mirror-of-scarlet-desire-update",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [mirrorSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/f197277f-dc93-4943-bbd3-3e96ceee5c2f.png",
      mirrorSource.url,
      {
        "zh-hant": {
          alt: "AION2 Mirror of Scarlet Desire 更新官方宣傳圖",
          caption: "NC Corporation 官方更新圖；副本與獎勵數值以 2026 年 5 月 13 日公告為準。",
        },
        en: {
          alt: "Official key art for the AION2 Mirror of Scarlet Desire update",
          caption: "Official NC Corporation update art; dungeon and reward figures reflect the May 13, 2026 announcement.",
        },
        ko: {
          alt: "AION2 붉은 연심의 거울 업데이트 공식 이미지",
          caption: "NC Corporation 공식 업데이트 이미지이며 던전과 보상 수치는 2026년 5월 13일 발표 기준입니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "arcana" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
      { kind: "content", section: "news", slug: "chapter-1-lands-of-sand-and-snow" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "官方更新整理",
        title: "AION2 Mirror of Scarlet Desire：3 組 Arcana 與每週獎勵調整",
        description:
          "整理 Mirror of Scarlet Desire 的 3,200 入場門檻、三組 Arcana、遠征與超越獎勵次數及介面改善。",
        intro:
          "2026 年 5 月 13 日的官方更新以 Mirror of Scarlet Desire 為核心，加入三組具明確用途的 Arcana，並擴大每週內容獎勵次數。本文把副本、養成與便利性調整分開，避免將同篇公告中的預告活動誤認為目前仍在進行。",
        sourceNote:
          "依據 NC Corporation 2026 年 5 月 13 日官方公告整理；所有門檻與次數均為公告當日韓國／台灣服務快照，全球版可能不同。",
        keywords: ["AION2 Mirror of Scarlet Desire", "AION2 Arcana", "AION2 每週獎勵", "AION2 3200 裝等"],
        sections: [
          {
            id: "dungeon-and-arcana",
            title: "3,200 門檻與三組 Arcana",
            paragraphs: [
              "Mirror of Scarlet Desire 的最低道具等級為 3,200。公告同步列出三組 Arcana：Punishing Overture 提供 5% Boss Damage Tolerance、Protected Soul 提供 5% Restoration、Indomitable Dedication 提供 5% Weapon Damage Tolerance。",
              "三組效果對應不同生存或恢復需求，不能只看名稱判斷優先級。官方說明它們可使用 Noble Crystal（Bound）製作，而素材可依公告規則從第 1、2 季或第 3 季 Arcana 萃取取得。",
            ],
          },
          {
            id: "weekly-and-quality-of-life",
            title: "每週次數、40 秒日常副本與 HUD 改善",
            paragraphs: [
              "遠征每週可獲獎勵次數由 14 次提高至 21 次，超越則由 7 次提高至 14 次。另加入約 40 秒完成一次的日常副本 Crobahki’s Secret Depository，讓短時間日常進度多了一個固定入口。",
              "介面方面，公告列出 HUD 預設、頭目背面指示器與多項便利性調整。這些功能會改變戰鬥資訊的讀取方式，但玩家仍應在目前客戶端確認選項名稱與預設值。",
            ],
          },
          {
            id: "version-and-history",
            title: "公告中的預告已成歷史資料",
            paragraphs: [
              "同篇公告曾提到 2026 年 6 月 14 日 Showcase，以及 5 月 25 日截止的相關申請安排；兩個日期現在都已過去。本文不把它們列成正在開放的活動，也不提供已失效的參加指示。",
              "3,200、21 次、14 次和三組 5% 效果都只代表 2026 年 5 月 13 日公告快照。未來全球版不保證沿用相同數字、季別轉換方式、譯名或上線順序。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "OFFICIAL UPDATE BRIEF",
        title: "AION2 Mirror of Scarlet Desire: three Arcana sets and higher weekly rewards",
        description:
          "A sourced look at the level-3,200 dungeon, three Arcana sets, expanded Expedition and Transcendence rewards, and interface changes.",
        intro:
          "The May 13, 2026 update centered on Mirror of Scarlet Desire, three purpose-built Arcana sets, and more weekly reward claims. This report separates the released dungeon and progression changes from showcase notices whose dates have already passed.",
        sourceNote:
          "Based on NC Corporation's May 13, 2026 announcement. Requirements and weekly counts are Korea/Taiwan service snapshots from that date; the global version may differ.",
        keywords: ["AION2 Mirror of Scarlet Desire", "AION2 Arcana", "AION2 weekly rewards", "AION2 item level 3200"],
        sections: [
          {
            id: "dungeon-and-arcana",
            title: "A level-3,200 dungeon and three Arcana sets",
            paragraphs: [
              "Mirror of Scarlet Desire launched with a minimum item level of 3,200. The announcement names Punishing Overture with 5% Boss Damage Tolerance, Protected Soul with 5% Restoration, and Indomitable Dedication with 5% Weapon Damage Tolerance.",
              "The three effects support different defensive or recovery needs, so their names alone are not a universal priority list. NC says they can be crafted with Noble Crystal (Bound), obtained by extracting Season 1 and 2 or Season 3 Arcana under the rules described in the release.",
            ],
          },
          {
            id: "weekly-and-quality-of-life",
            title: "More weekly rewards, a short daily dungeon, and HUD changes",
            paragraphs: [
              "Weekly Expedition reward claims increased from 14 to 21, and Transcendence claims from 7 to 14. Crobahki’s Secret Depository was also added as a daily dungeon designed around a roughly 40-second clear.",
              "The update listed HUD presets, a boss rear-position indicator, and other convenience changes. Those options affect how combat information is read, but their current names and defaults should still be checked in the live client.",
            ],
          },
          {
            id: "version-and-history",
            title: "Past announcements are not current events",
            paragraphs: [
              "The same release promoted a June 14, 2026 showcase and an application schedule ending May 25. Both dates are now historical, so this page does not label either activity as open or provide an outdated participation path.",
              "Item level 3,200, the 21 and 14 weekly counts, and the three 5% effects are snapshots of the May 13 announcement. A future global build is not guaranteed to keep the same values, season-conversion rules, names, or release order.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "공식 업데이트 정리",
        title: "AION2 붉은 연심의 거울: 아르카나 3종과 주간 보상 확대",
        description:
          "아이템 레벨 3,200 던전, 아르카나 3종, 원정·초월 주간 보상 횟수 확대와 인터페이스 개선을 정리했습니다.",
        intro:
          "2026년 5월 13일 업데이트는 붉은 연심의 거울, 용도가 구분된 아르카나 3종, 주간 보상 횟수 확대가 핵심입니다. 이 글은 실제 업데이트 내용과 이미 일정이 지난 쇼케이스 안내를 나눠 설명합니다.",
        sourceNote:
          "NC Corporation의 2026년 5월 13일 공식 발표를 기준으로 작성했습니다. 입장 조건과 횟수는 당시 한국·대만 서비스 스냅샷이며 글로벌 버전은 달라질 수 있습니다.",
        keywords: ["AION2 붉은 연심의 거울", "아이온2 아르카나", "아이온2 주간 보상", "아이온2 아이템 레벨 3200"],
        sections: [
          {
            id: "dungeon-and-arcana",
            title: "아이템 레벨 3,200과 아르카나 3종",
            paragraphs: [
              "붉은 연심의 거울은 최소 아이템 레벨 3,200 던전으로 추가됐습니다. 발표에는 Punishing Overture의 보스 피해 내성 5%, Protected Soul의 회복 5%, Indomitable Dedication의 무기 피해 내성 5%가 각각 명시돼 있습니다.",
              "세 효과는 방어와 회복 목적이 다르므로 이름만으로 공통 우선순위를 정할 수 없습니다. Noble Crystal (Bound)로 제작하며, 발표에 설명된 규칙에 따라 시즌 1·2 또는 시즌 3 아르카나를 추출해 재료를 얻을 수 있습니다.",
            ],
          },
          {
            id: "weekly-and-quality-of-life",
            title: "주간 보상, 40초 일일 던전, HUD 개선",
            paragraphs: [
              "원정의 주간 보상 횟수는 14회에서 21회, 초월은 7회에서 14회로 늘었습니다. 약 40초 클리어를 목표로 한 일일 던전 Crobahki’s Secret Depository도 함께 추가됐습니다.",
              "HUD 프리셋과 보스 후방 표시, 그 밖의 편의 기능도 발표 목록에 포함됐습니다. 전투 정보 확인 방식에 영향을 주는 기능이므로 현재 클라이언트에서 옵션 이름과 기본 설정을 다시 확인하는 편이 안전합니다.",
            ],
          },
          {
            id: "version-and-history",
            title: "이미 지난 일정과 버전 범위",
            paragraphs: [
              "같은 발표에 안내된 2026년 6월 14일 쇼케이스와 5월 25일 마감 신청 일정은 모두 지난 일정입니다. 이 글은 이를 현재 진행 중인 이벤트로 표시하거나 만료된 참여 방법을 안내하지 않습니다.",
              "아이템 레벨 3,200, 주간 21회와 14회, 아르카나의 5% 효과는 2026년 5월 13일 발표 스냅샷입니다. 글로벌 버전이 같은 수치, 시즌 전환 방식, 명칭, 적용 순서를 유지한다고 보장할 수 없습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "corroded-decontamination-cross-faction-pve",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [decontaminationSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/abee6509-5d7c-4782-86d8-b4bfe288205e.png",
      decontaminationSource.url,
      {
        "zh-hant": {
          alt: "AION2 Corroded Decontamination Facility 更新官方宣傳圖",
          caption: "NC Corporation 官方更新圖；副本門檻與組隊規則以 2026 年 3 月 11 日公告為準。",
        },
        en: {
          alt: "Official key art for the AION2 Corroded Decontamination Facility update",
          caption: "Official NC Corporation update art; the dungeon requirement and party rules reflect the March 11, 2026 announcement.",
        },
        ko: {
          alt: "AION2 침식의 정화소 업데이트 공식 이미지",
          caption: "NC Corporation 공식 업데이트 이미지이며 던전 조건과 파티 규칙은 2026년 3월 11일 발표 기준입니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "elyos-vs-asmodians" },
      { kind: "content", section: "guides", slug: "kinah-bound" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "官方更新整理",
        title: "AION2 Corroded Decontamination Facility：3,700 門檻與跨種族 PvE 組隊",
        description:
          "整理 Corroded Decontamination Facility 高難度聖域、英雄與唯一裝備獎勵，以及天族、魔族跨種族 PvE 組隊規則。",
        intro:
          "2026 年 3 月 11 日更新加入 Corroded Decontamination Facility，並首次讓天族與魔族在特定 PvE 場景組成跨種族隊伍。副本門檻與組隊範圍都很明確，但同篇公告也包含尚待後續實裝的功能預告，閱讀時需要分開。",
        sourceNote:
          "依據 NC Corporation 2026 年 3 月 11 日官方公告；數值與功能狀態為公告當日韓國／台灣服務快照，全球版不保證相同。",
        keywords: ["AION2 Corroded Decontamination Facility", "AION2 3700 裝等", "AION2 跨種族組隊", "AION2 PvE"],
        sections: [
          {
            id: "sanctuary-and-loot",
            title: "3,700 道具等級的高難度聖域",
            paragraphs: [
              "Corroded Decontamination Facility 被定位為高難度聖域，最低道具等級為 3,700，主要頭目是 Terminator Bargott。官方列出的獎勵範圍包含英雄與唯一等級武器及手鐲。",
              "公告並未把裝備名稱、數值區間或掉落機率完整列成資料表，因此本文不推測最佳掉落或通關收益。3,700 門檻與獎勵分類只作為更新當日的可核對資訊。",
            ],
          },
          {
            id: "cross-faction-party",
            title: "跨種族 PvE 隊伍與第四伺服器配對",
            paragraphs: [
              "自 3 月 11 日起，天族與魔族可在 PvE 內容中組成跨種族隊伍，但種族之間的溝通仍有限制。這是合作配對範圍的調整，不代表世界觀、伺服器陣營或 PvP 對立被取消。",
              "官方同時啟動第四次伺服器配對。配對結果與當時伺服器狀態相關，因此舊公告不能用來判定目前角色所在伺服器的對手、人口或陣營平衡。",
            ],
          },
          {
            id: "released-versus-previewed",
            title: "已實裝內容與功能預告要分開",
            paragraphs: [
              "Combat Power、Combat Analysis 與 Bound Kina 在這一時期被官方說明或預告，但公告不代表所有功能都在 3 月 11 日同一刻完整上線。需要判定實裝日期時，應再查後續維護公告與遊戲內介面。",
              "同篇提到的 White Day 活動現已是歷史活動，本文不把相關獎勵標示為可領取。副本門檻、組隊限制和功能狀態是 2026 年 3 月 11 日快照，未來全球版可能採用不同安排。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "OFFICIAL UPDATE BRIEF",
        title: "AION2 Corroded Decontamination Facility: item level 3,700 and cross-faction PvE parties",
        description:
          "A sourced summary of the high-difficulty Sanctuary, Hero and Unique rewards, and limited cross-faction PvE parties for Elyos and Asmodians.",
        intro:
          "The March 11, 2026 update introduced Corroded Decontamination Facility and allowed Elyos and Asmodians to form parties for specified PvE activities. Its dungeon threshold and party scope were concrete, while several systems in the same announcement were still forward-looking.",
        sourceNote:
          "Based on NC Corporation's March 11, 2026 announcement. Values and feature states are Korea/Taiwan service snapshots from that date; the global version is not guaranteed to match.",
        keywords: ["AION2 Corroded Decontamination Facility", "AION2 item level 3700", "AION2 cross-faction party", "AION2 PvE"],
        sections: [
          {
            id: "sanctuary-and-loot",
            title: "A high-difficulty Sanctuary at item level 3,700",
            paragraphs: [
              "Corroded Decontamination Facility was positioned as a high-difficulty Sanctuary with a minimum item level of 3,700 and Terminator Bargott as its principal boss. The official reward summary includes Hero- and Unique-grade weapons and bracelets.",
              "The release did not provide a complete item-stat or drop-rate table, so this page does not infer a best drop or expected return. The 3,700 threshold and reward grades are the verifiable announcement-date details.",
            ],
          },
          {
            id: "cross-faction-party",
            title: "Cross-faction PvE parties and fourth server matching",
            paragraphs: [
              "From March 11, Elyos and Asmodians could form cross-faction parties for PvE content, with communication between the factions still limited. This expanded cooperative matchmaking; it did not remove faction identity, server alignment, or PvP rivalry.",
              "NC also implemented a fourth server-matching round. Those pairings depended on server conditions at the time, so the old announcement should not be used to infer today's opponents, population, or faction balance.",
            ],
          },
          {
            id: "released-versus-previewed",
            title: "Separate shipped features from previews",
            paragraphs: [
              "Combat Power, Combat Analysis, and Bound Kina were discussed or previewed around this release, but that does not mean every function reached the live client in full on March 11. Later maintenance notes and the current interface are needed to establish an exact launch state.",
              "The White Day promotion in the same announcement is now historical and is not presented here as claimable. Dungeon requirements, party restrictions, and feature status are March 11 snapshots, and a future global build may follow a different plan.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "공식 업데이트 정리",
        title: "AION2 침식의 정화소: 아이템 레벨 3,700과 종족 간 PvE 파티",
        description:
          "침식의 정화소 고난도 성역, 영웅·유일 등급 보상, 천족과 마족의 제한된 종족 간 PvE 파티 규칙을 정리했습니다.",
        intro:
          "2026년 3월 11일 업데이트에는 침식의 정화소와 천족·마족의 종족 간 PvE 파티가 포함됐습니다. 던전 조건과 파티 범위는 구체적이지만 같은 발표에 후속 적용 예정 기능도 있어 실제 적용 내용과 예고를 나눠 볼 필요가 있습니다.",
        sourceNote:
          "NC Corporation의 2026년 3월 11일 공식 발표를 기준으로 작성했습니다. 수치와 기능 상태는 당시 한국·대만 서비스 스냅샷이며 글로벌 버전과 같다고 보장할 수 없습니다.",
        keywords: ["AION2 침식의 정화소", "아이온2 아이템 레벨 3700", "아이온2 종족 간 파티", "아이온2 PvE"],
        sections: [
          {
            id: "sanctuary-and-loot",
            title: "아이템 레벨 3,700 고난도 성역",
            paragraphs: [
              "침식의 정화소는 최소 아이템 레벨 3,700이 필요한 고난도 성역으로 소개됐고 핵심 보스는 Terminator Bargott입니다. 공식 보상 설명에는 영웅·유일 등급 무기와 팔찌가 포함돼 있습니다.",
              "발표에는 전체 장비 능력치나 드롭 확률표가 없으므로 이 글은 최고 보상이나 기대 수익을 추정하지 않습니다. 3,700 입장 조건과 보상 등급만 발표일에 확인 가능한 정보로 다룹니다.",
            ],
          },
          {
            id: "cross-faction-party",
            title: "종족 간 PvE 파티와 4차 서버 매칭",
            paragraphs: [
              "3월 11일부터 천족과 마족은 PvE 콘텐츠에서 종족 간 파티를 구성할 수 있게 됐지만 종족 간 의사소통에는 제한이 남았습니다. 협동 매칭 범위가 넓어진 것이며 진영 구분이나 PvP 대립이 사라진 것은 아닙니다.",
              "같은 시기에 4차 서버 매칭도 진행됐습니다. 당시 서버 상황에 따라 정해진 결과이므로 과거 발표만으로 현재 상대 서버, 인구, 진영 균형을 판단해서는 안 됩니다.",
            ],
          },
          {
            id: "released-versus-previewed",
            title: "실제 적용과 예고 기능 구분",
            paragraphs: [
              "Combat Power, Combat Analysis, Bound Kina는 이 업데이트 시기에 안내되거나 예고됐지만 모든 기능이 3월 11일 한 번에 완전 적용됐다는 뜻은 아닙니다. 정확한 적용 시점은 후속 점검 공지와 현재 게임 화면을 함께 확인해야 합니다.",
              "같은 발표의 White Day 이벤트는 이미 끝난 과거 이벤트이므로 현재 보상으로 안내하지 않습니다. 던전 조건과 파티 제한, 기능 상태는 2026년 3월 11일 스냅샷이며 글로벌 버전은 다르게 구성될 수 있습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "sunken-temple-100-day-update",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [sunkenTempleSource, sunkenTempleTwSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/fd0bf059-fd8b-42db-b379-d7e88a9e00e4.png",
      sunkenTempleTwSource.url,
      {
        "zh-hant": {
          alt: "AION2 沉沒的生命神殿與上市百日更新官方宣傳圖",
          caption: "NC Corporation 官方更新圖；副本、Arcana 與百日活動資訊以 2026 年 2 月 23 日公告為準。",
        },
        en: {
          alt: "Official key art for the AION2 Sunken Temple of Life and 100-day update",
          caption: "Official NC Corporation update art; dungeon, Arcana, and anniversary details reflect the February 23, 2026 announcement.",
        },
        ko: {
          alt: "AION2 가라앉은 생명의 신전과 출시 100일 업데이트 공식 이미지",
          caption: "NC Corporation 공식 업데이트 이미지이며 던전, 아르카나, 100일 이벤트 정보는 2026년 2월 23일 발표 기준입니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "arcana" },
      { kind: "content", section: "guides", slug: "abyss-status" },
      { kind: "content", section: "news", slug: "aion2chapterone-coupon-status" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "官方更新整理",
        title: "AION2 沉沒的生命神殿：上市 100 日更新與 Arcana 鱗片",
        description:
          "整理沉沒的生命神殿 3,000 入場門檻、Arcana 鱗片效果、跨種族配對、PvP 排名點數及百日活動狀態。",
        intro:
          "AION2 在 2026 年 2 月 23 日以沉沒的生命神殿更新紀念上市 100 日。新副本與 Arcana 部位是可長期參考的系統資訊，但當時的百日活動與兌換碼都有期限，現在只能作為歷史紀錄。",
        sourceNote:
          "以 NC Corporation 2026 年 2 月 23 日英文與繁體中文官方公告交叉核對；數值為公告當日韓國／台灣服務快照，全球版不保證一致。",
        keywords: ["AION2 沉沒的生命神殿", "AION2 上市100日", "AION2 Arcana 鱗片", "AION2 兌換碼"],
        sections: [
          {
            id: "temple-and-scales",
            title: "3,000 道具等級與 Arcana 鱗片",
            paragraphs: [
              "沉沒的生命神殿以最低道具等級 3,000 開放，並加入 Arcana 新部位「鱗片」。公告列出的 Frenzy 效果為 5% Boss Damage Amplification，Pure Blood 則提供 5% Critical Damage Boost。",
              "兩種效果服務不同輸出需求，不能只憑 5% 數字判定哪一種適合所有職業。裝備選擇仍要配合當前版本、角色配置與遊戲內實際效果說明。",
            ],
          },
          {
            id: "service-adjustments",
            title: "跨種族配對、PvP 點數與伺服器限制",
            paragraphs: [
              "官方同時進行第三次天族／魔族伺服器配對，並降低 PvP 死亡時損失的排名點數。這些變更反映當時的營運與平衡調整，不能直接推導目前各伺服器人口或對戰關係。",
              "公告當時亦解除伺服器建立角色限制。是否仍可建立角色取決於目前伺服器狀況，因此舊公告不應被當作即時開放保證。",
            ],
          },
          {
            id: "codes-and-global-scope",
            title: "百日活動與兌換碼已屬歷史",
            paragraphs: [
              "公告中的 AION2DAYS100 與 WELCOMEBACK 是有期限的百日兌換碼，相關紀念活動也不是永久內容。除非官方目前頁面重新確認有效，本站不會把這些舊碼標示成可兌換。",
              "3,000 門檻、兩種 5% Arcana 效果與當時的 PvP 調整都是 2026 年 2 月 23 日快照。全球版可能改用不同名稱、數值、兌換資格或上線順序。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "OFFICIAL UPDATE BRIEF",
        title: "AION2 Sunken Temple of Life and the 100-day update",
        description:
          "A sourced summary of the item-level-3,000 dungeon, Scales Arcana effects, server matching, PvP point changes, and expired anniversary codes.",
        intro:
          "AION2 marked 100 days of service with the Sunken Temple of Life update on February 23, 2026. The dungeon and new Arcana slot remain useful historical system references, while the anniversary events and codes were time-limited and must not be treated as active.",
        sourceNote:
          "Cross-checked against NC Corporation's English and Traditional Chinese announcements dated February 23, 2026. Values are Korea/Taiwan service snapshots, not a guarantee for the global build.",
        keywords: ["AION2 Sunken Temple of Life", "AION2 100 days", "AION2 Scales Arcana", "AION2 coupon code"],
        sections: [
          {
            id: "temple-and-scales",
            title: "Item level 3,000 and the Scales Arcana slot",
            paragraphs: [
              "Sunken Temple of Life opened with a minimum item level of 3,000 and introduced Scales as a new Arcana part. Frenzy was listed with 5% Boss Damage Amplification, while Pure Blood provided 5% Critical Damage Boost.",
              "The two effects answer different damage needs, so a shared 5% figure does not make either one universally best. A current build, class setup, and the live tooltip remain necessary when choosing between them.",
            ],
          },
          {
            id: "service-adjustments",
            title: "Server matching, PvP point loss, and creation limits",
            paragraphs: [
              "NC also ran a third Elyos and Asmodian server-matching round and reduced ranking-point loss on PvP death. These were operational and balance decisions at the time, not evidence of today's server populations or matchups.",
              "Server creation restrictions were lifted when the announcement was published. Current creation availability still depends on live server conditions, so the historical notice is not a standing access guarantee.",
            ],
          },
          {
            id: "codes-and-global-scope",
            title: "The 100-day events and codes are historical",
            paragraphs: [
              "AION2DAYS100 and WELCOMEBACK were time-limited anniversary codes, and their companion events were not permanent. KINA does not mark either code as redeemable without a fresh confirmation from an official live page.",
              "The 3,000 requirement, both 5% Arcana effects, and the PvP adjustments are snapshots of February 23, 2026. A global build may use different names, values, redemption eligibility, or launch sequencing.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "공식 업데이트 정리",
        title: "AION2 가라앉은 생명의 신전과 출시 100일 업데이트",
        description:
          "가라앉은 생명의 신전의 아이템 레벨 3,000 조건, 비늘 아르카나 효과, 서버 매칭, PvP 랭킹 포인트와 만료된 100일 코드를 정리했습니다.",
        intro:
          "AION2는 2026년 2월 23일 가라앉은 생명의 신전 업데이트로 출시 100일을 기념했습니다. 던전과 새 아르카나 부위는 시스템 변화 기록으로 참고할 수 있지만 당시 이벤트와 쿠폰은 기간 한정이므로 현재 사용 가능하다고 볼 수 없습니다.",
        sourceNote:
          "NC Corporation의 2026년 2월 23일 영문·번체중문 공식 발표를 교차 확인했습니다. 수치는 당시 한국·대만 서비스 스냅샷이며 글로벌 버전을 보장하지 않습니다.",
        keywords: ["AION2 가라앉은 생명의 신전", "아이온2 출시 100일", "아이온2 비늘 아르카나", "아이온2 쿠폰"],
        sections: [
          {
            id: "temple-and-scales",
            title: "아이템 레벨 3,000과 비늘 아르카나",
            paragraphs: [
              "가라앉은 생명의 신전은 최소 아이템 레벨 3,000으로 열렸고 아르카나 새 부위인 비늘이 추가됐습니다. Frenzy는 보스 피해 증폭 5%, Pure Blood는 치명타 피해 증가 5%로 발표됐습니다.",
              "두 효과는 서로 다른 공격 목적을 가지므로 같은 5%라는 이유만으로 모든 직업에 공통 우선순위를 정할 수 없습니다. 현재 버전, 직업 세팅, 게임 내 툴팁을 함께 확인해야 합니다.",
            ],
          },
          {
            id: "service-adjustments",
            title: "서버 매칭, PvP 포인트 손실, 생성 제한",
            paragraphs: [
              "천족·마족 3차 서버 매칭이 진행됐고 PvP 사망 시 랭킹 포인트 손실이 줄었습니다. 이는 당시 운영과 밸런스 조정이므로 현재 서버 인구나 대전 관계를 판단하는 근거로 사용할 수 없습니다.",
              "발표 시점에는 서버 캐릭터 생성 제한도 해제됐습니다. 현재 생성 가능 여부는 실시간 서버 상황에 따라 달라지므로 과거 공지가 계속 유효한 접속 보장은 아닙니다.",
            ],
          },
          {
            id: "codes-and-global-scope",
            title: "100일 이벤트와 쿠폰은 과거 기록",
            paragraphs: [
              "AION2DAYS100과 WELCOMEBACK은 사용 기간이 정해진 100일 기념 쿠폰이었고 연계 이벤트도 상시 콘텐츠가 아니었습니다. 공식 현재 페이지에서 다시 유효성이 확인되지 않는 한 사용 가능한 쿠폰으로 표시하지 않습니다.",
              "아이템 레벨 3,000, 두 아르카나의 5% 효과, PvP 조정은 2026년 2월 23일 발표 스냅샷입니다. 글로벌 버전은 명칭, 수치, 쿠폰 대상, 적용 순서가 달라질 수 있습니다.",
            ],
          },
        ],
      }),
    },
  },
  {
    section: "news",
    slug: "cradle-of-nihility-soul-fuse-update",
    schemaType: "NewsArticle",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingMinutes: 5,
    publication: publishedVerified,
    sources: [cradleSource],
    heroImage: officialHero(
      "https://blogfiles.ncsoft.net/news/8e2824fc-512c-4e96-8104-2997cecff9c9.png",
      cradleSource.url,
      {
        "zh-hant": {
          alt: "AION2 Cradle of Nihility 與 Soul Fuse 更新官方宣傳圖",
          caption: "NC Corporation 官方更新圖；遠征、深淵與 Soul Fuse 規則以 2026 年 2 月 11 日公告為準。",
        },
        en: {
          alt: "Official key art for the AION2 Cradle of Nihility and Soul Fuse update",
          caption: "Official NC Corporation update art; Expedition, Abyss, and Soul Fuse rules reflect the February 11, 2026 announcement.",
        },
        ko: {
          alt: "AION2 무의 요람과 영혼 융합 업데이트 공식 이미지",
          caption: "NC Corporation 공식 업데이트 이미지이며 원정, 어비스, 영혼 융합 규칙은 2026년 2월 11일 발표 기준입니다.",
        },
      },
    ),
    related: [
      { kind: "content", section: "guides", slug: "soul-imprint" },
      { kind: "content", section: "guides", slug: "abyss-status" },
      { kind: "content", section: "guides", slug: "equipment-tuning" },
    ],
    translations: {
      "zh-hant": articleCopy("zh-hant", 5, {
        eyebrow: "官方更新整理",
        title: "AION2 Cradle of Nihility 更新：Soul Fuse 與深淵規則調整",
        description:
          "整理 Cradle of Nihility 遠征、第二次伺服器配對、Artifact Siege 時段、深淵迴廊、PvP 點數與 Soul Fuse 條件。",
        intro:
          "2026 年 2 月 11 日的更新同時影響 PvE 遠征、伺服器配對、深淵攻城與裝備 Soul Fuse。各系統關聯密切，但公告中的時段與條件都是當日營運狀態，不應被視為全球版永久規則。",
        sourceNote:
          "依據 NC Corporation 2026 年 2 月 11 日官方公告整理；所有時段、條件與數值為當日韓國／台灣服務快照，全球版可能不同。",
        keywords: ["AION2 Cradle of Nihility", "AION2 Soul Fuse", "AION2 深淵攻城", "AION2 伺服器配對"],
        sections: [
          {
            id: "expedition-and-matching",
            title: "Cradle of Nihility 遠征與第二次配對",
            paragraphs: [
              "Cradle of Nihility 以新遠征內容登場，主要頭目為 Afflicted Bakarma。公告把副本加入與第二次伺服器配對放在同一波更新，但兩者分別屬於 PvE 內容與營運配對機制。",
              "第二次伺服器配對參考擊殺數、實際戰鬥活動與 Artifact Siege 等指標。這些依據說明官方當時如何觀察伺服器狀況，不能用來反推目前伺服器人口或下一次配對結果。",
            ],
          },
          {
            id: "abyss-and-soul-fuse",
            title: "深淵時段、落後方通道與 Soul Fuse",
            paragraphs: [
              "公告當時把 Lower／Middle Abyss 的 Artifact Siege 調整為星期二、四、六 21:00；當某方以 0 比 3 落後時，Abyss Corridor 會開放。PvP 死亡改為扣減排名點數，而不是 Abyss Points。",
              "Soul Fuse 可用於已達最大強化、Soul Binding 100% 的裝備，消耗兩顆 Philosopher’s Stone: Revelation 後加入額外 Soul Binding 效果。資格、素材與結果仍應在當前客戶端逐項確認。",
            ],
          },
          {
            id: "historical-scope",
            title: "節慶活動與時段皆需重新確認",
            paragraphs: [
              "同篇公告中的農曆新年與情人節活動都屬期間限定內容，現在只保留歷史意義。本文不把當時活動獎勵、商店或參加方式標示成目前開放。",
              "星期二、四、六 21:00、0 比 3 條件及 Soul Fuse 素材規則都是 2026 年 2 月 11 日快照。全球版或後續版本可能調整時區、名稱、消耗量與開放順序。",
            ],
          },
        ],
      }),
      en: articleCopy("en", 5, {
        eyebrow: "OFFICIAL UPDATE BRIEF",
        title: "AION2 Cradle of Nihility update: Soul Fuse and Abyss rule changes",
        description:
          "A sourced summary of the new Expedition, second server matching, Artifact Siege schedule, Abyss Corridor, PvP points, and Soul Fuse requirements.",
        intro:
          "The February 11, 2026 release changed PvE Expeditions, server matching, Abyss sieges, and equipment progression through Soul Fuse. These systems interacted, but every schedule and condition in the notice describes that day's live-service operation rather than a permanent global rule.",
        sourceNote:
          "Based on NC Corporation's February 11, 2026 announcement. Times, conditions, and material counts are Korea/Taiwan service snapshots from that date; the global version may differ.",
        keywords: ["AION2 Cradle of Nihility", "AION2 Soul Fuse", "AION2 Artifact Siege", "AION2 server matching"],
        sections: [
          {
            id: "expedition-and-matching",
            title: "Cradle of Nihility and the second server match",
            paragraphs: [
              "Cradle of Nihility arrived as a new Expedition led by Afflicted Bakarma. The same release also covered a second server-matching round, but the dungeon and the operational matching process remain separate systems.",
              "That matching round used kills, active combat participation, and Artifact Siege activity among its measures. Those inputs explain NC's view of server conditions at the time; they cannot predict current populations or a future pairing.",
            ],
          },
          {
            id: "abyss-and-soul-fuse",
            title: "Abyss timing, the trailing-faction corridor, and Soul Fuse",
            paragraphs: [
              "At the announcement date, Lower and Middle Abyss Artifact Sieges moved to Tuesday, Thursday, and Saturday at 21:00. An Abyss Corridor became available when one faction trailed 0–3, and PvP deaths reduced ranking points rather than Abyss Points.",
              "Soul Fuse allowed equipment at maximum reinforcement and 100% Soul Binding to consume two Philosopher’s Stone: Revelation items for an additional Soul Binding effect. Eligibility, materials, and results should still be checked in the current client.",
            ],
          },
          {
            id: "historical-scope",
            title: "Recheck event availability and schedules",
            paragraphs: [
              "The Lunar New Year and Valentine's promotions in the same announcement were time-limited and are now historical. Their rewards, shops, and participation instructions are not presented here as active.",
              "Tuesday, Thursday, and Saturday at 21:00, the 0–3 trigger, and the Soul Fuse material rule are February 11 snapshots. A global or later build may change time zones, names, quantities, and release order.",
            ],
          },
        ],
      }),
      ko: articleCopy("ko", 5, {
        eyebrow: "공식 업데이트 정리",
        title: "AION2 무의 요람 업데이트: 영혼 융합과 어비스 규칙 변경",
        description:
          "무의 요람 원정, 2차 서버 매칭, 아티팩트 공성 시간, 어비스 회랑, PvP 포인트와 영혼 융합 조건을 정리했습니다.",
        intro:
          "2026년 2월 11일 업데이트는 PvE 원정, 서버 매칭, 어비스 공성, 영혼 융합 장비 성장을 함께 바꿨습니다. 서로 연결되는 변화지만 공지의 시간과 조건은 당시 운영 상태이며 글로벌 버전의 영구 규칙이 아닙니다.",
        sourceNote:
          "NC Corporation의 2026년 2월 11일 공식 발표를 기준으로 작성했습니다. 시간, 조건, 재료 수량은 당시 한국·대만 서비스 스냅샷이며 글로벌 버전은 달라질 수 있습니다.",
        keywords: ["AION2 무의 요람", "아이온2 영혼 융합", "아이온2 아티팩트 공성", "아이온2 서버 매칭"],
        sections: [
          {
            id: "expedition-and-matching",
            title: "무의 요람 원정과 2차 서버 매칭",
            paragraphs: [
              "무의 요람은 Afflicted Bakarma가 핵심 보스로 등장하는 새 원정으로 추가됐습니다. 같은 업데이트에 2차 서버 매칭도 포함됐지만 던전과 운영 매칭은 서로 다른 시스템입니다.",
              "2차 매칭에는 처치 수, 실제 전투 참여, 아티팩트 공성 활동 등이 지표로 사용됐습니다. 이는 당시 서버 상황을 평가한 기준이며 현재 인구나 다음 매칭 결과를 예측하는 자료가 아닙니다.",
            ],
          },
          {
            id: "abyss-and-soul-fuse",
            title: "어비스 시간, 열세 진영 회랑, 영혼 융합",
            paragraphs: [
              "발표 당시 하층·중층 어비스 아티팩트 공성은 화·목·토요일 21:00으로 조정됐고 한 진영이 0대3으로 뒤지면 어비스 회랑이 열렸습니다. PvP 사망 시에는 어비스 포인트가 아닌 랭킹 포인트가 감소하도록 바뀌었습니다.",
              "영혼 융합은 최대 강화이면서 영혼 각인 100%인 장비에 Philosopher’s Stone: Revelation 두 개를 사용해 추가 영혼 각인 효과를 부여하는 방식으로 소개됐습니다. 현재 자격과 재료, 결과는 게임 안에서 다시 확인해야 합니다.",
            ],
          },
          {
            id: "historical-scope",
            title: "기간 한정 이벤트와 시간표 재확인",
            paragraphs: [
              "같은 발표의 설날과 밸런타인데이 이벤트는 기간 한정이었으며 현재는 과거 기록입니다. 당시 보상, 상점, 참여 방법을 진행 중인 콘텐츠로 안내하지 않습니다.",
              "화·목·토요일 21:00, 0대3 조건, 영혼 융합 재료 규칙은 2026년 2월 11일 발표 스냅샷입니다. 글로벌 또는 후속 버전은 시간대, 명칭, 수량, 적용 순서를 바꿀 수 있습니다.",
            ],
          },
        ],
      }),
    },
  },
] as const satisfies readonly ContentEntry[];
