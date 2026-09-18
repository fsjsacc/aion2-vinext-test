import checklistEditorialLocales from "./checklist-editorial-locales.generated.json";
import type { ContentLocale, SiteLocale } from "@/app/site-config";

import type { ChecklistFrequency } from "@/app/checklist-store";

export type ChecklistActivityPriority = "core" | "recommended" | "situational";
export type ChecklistActivityScope = "server" | "account" | "character";
export type ChecklistSourceStatus = "official" | "reference";

type LocalizedActivityCopy = {
  name: string;
  summary: string;
  cadence: string;
  entry: string;
  reward: string;
  tip: string;
};

type LocalizedSourceCopy = {
  label: string;
  note: string;
};

type EditorialChecklistLocale = Exclude<SiteLocale, ContentLocale>;
type GeneratedChecklistLocale = {
  sources: Record<string, LocalizedSourceCopy>;
  activities: Record<string, LocalizedActivityCopy>;
};

const generatedChecklistCopy = checklistEditorialLocales.translations as unknown as Record<
  EditorialChecklistLocale,
  GeneratedChecklistLocale
>;

const editorialActivityNameOverrides: Record<
  EditorialChecklistLocale,
  Record<string, string>
> = {
  "zh-hans": {
    "mission-quests": "使命任务",
    "supply-requests": "补给委托",
    "expedition-charge": "远征每周奖励次数",
    "transcendence-charge": "超越充能与消耗",
    "shugo-fiesta": "修古庆典",
    "dimensional-invasion": "次元侵攻",
    "spacetime-rift": "时空裂缝时段",
    "daily-dungeon": "日常副本每周额度",
    "trial-rewards": "试炼各难度每周奖励",
    "battlefield-wins": "战场胜利奖励",
    "abyss-weekly-cap": "深渊点数每周上限",
    "weekly-order-scrolls": "每周指令书与限购品",
    "abyss-rift-zone": "深渊裂缝地带",
    "material-transformation": "物质转换与奥德能量",
    "artifact-occupation": "Artifact 占领战",
  },
  fr: {
    "mission-quests": "Missions",
    "supply-requests": "Demandes de ravitaillement",
    "expedition-charge": "Récompenses hebdomadaires d’expédition",
    "transcendence-charge": "Charges de Transcendance",
    "shugo-fiesta": "Festival Shugo",
    "dimensional-invasion": "Invasion dimensionnelle",
    "spacetime-rift": "Fenêtre de la Faille spatio-temporelle",
    "daily-dungeon": "Quota hebdomadaire du Donjon quotidien",
    "trial-rewards": "Récompenses de l’Épreuve par difficulté",
    "battlefield-wins": "Récompenses de victoire du Champ de bataille",
    "abyss-weekly-cap": "Plafond hebdomadaire de points abyssaux",
    "weekly-order-scrolls": "Parchemins d’ordre et achats hebdomadaires",
    "abyss-rift-zone": "Zone de Faille abyssale",
    "material-transformation": "Transformation de matière et énergie d’Od",
    "artifact-occupation": "Bataille d’occupation d’artefact",
  },
  de: {
    "mission-quests": "Missionen",
    "supply-requests": "Versorgungsaufträge",
    "expedition-charge": "Wöchentliche Expeditionsbelohnungen",
    "transcendence-charge": "Transzendenz-Aufladungen",
    "shugo-fiesta": "Shugo-Fest",
    "dimensional-invasion": "Dimensionsinvasion",
    "spacetime-rift": "Zeitfenster des Raumzeitrisses",
    "daily-dungeon": "Wochenkontingent des Täglichen Dungeons",
    "trial-rewards": "Prüfungsbelohnungen nach Schwierigkeit",
    "battlefield-wins": "Schlachtfeld-Siegesbelohnungen",
    "abyss-weekly-cap": "Wöchentliches Abyss-Punkte-Limit",
    "weekly-order-scrolls": "Wöchentliche Befehlsrollen und Kauflimits",
    "abyss-rift-zone": "Abyss-Risszone",
    "material-transformation": "Materietransformation und Od-Energie",
    "artifact-occupation": "Artefakt-Besetzungskampf",
  },
  es: {
    "mission-quests": "Misiones",
    "supply-requests": "Encargos de suministros",
    "expedition-charge": "Recompensas semanales de Expedición",
    "transcendence-charge": "Cargas de Trascendencia",
    "shugo-fiesta": "Festival Shugo",
    "dimensional-invasion": "Invasión dimensional",
    "spacetime-rift": "Horario de la Fisura espacio-temporal",
    "daily-dungeon": "Cupo semanal de la Mazmorra diaria",
    "trial-rewards": "Recompensas de Prueba por dificultad",
    "battlefield-wins": "Recompensas de victoria del Campo de batalla",
    "abyss-weekly-cap": "Límite semanal de Puntos del Abismo",
    "weekly-order-scrolls": "Pergaminos de orden y compras semanales",
    "abyss-rift-zone": "Zona de Fisura del Abismo",
    "material-transformation": "Transformación de materia y Energía de Od",
    "artifact-occupation": "Batalla de ocupación de artefactos",
  },
  ja: {
    "mission-quests": "使命クエスト",
    "supply-requests": "補給依頼",
    "expedition-charge": "遠征の週間報酬回数",
    "transcendence-charge": "超越チャージ",
    "shugo-fiesta": "シュゴフェスタ",
    "dimensional-invasion": "次元侵攻",
    "spacetime-rift": "時空の亀裂の開催時間",
    "daily-dungeon": "デイリーダンジョンの週間回数",
    "trial-rewards": "試練の難易度別週間報酬",
    "battlefield-wins": "戦場の勝利報酬",
    "abyss-weekly-cap": "アビスポイントの週間上限",
    "weekly-order-scrolls": "週間指令書と購入制限品",
    "abyss-rift-zone": "アビス亀裂地帯",
    "material-transformation": "物質変換とオードエネルギー",
    "artifact-occupation": "アーティファクト占領戦",
  },
  "pt-br": {
    "mission-quests": "Missões",
    "supply-requests": "Pedidos de suprimentos",
    "expedition-charge": "Recompensas semanais de Expedição",
    "transcendence-charge": "Cargas de Transcendência",
    "shugo-fiesta": "Festival Shugo",
    "dimensional-invasion": "Invasão dimensional",
    "spacetime-rift": "Janela da Fenda espaço-temporal",
    "daily-dungeon": "Cota semanal da Masmorra diária",
    "trial-rewards": "Recompensas da Provação por dificuldade",
    "battlefield-wins": "Recompensas de vitória do Campo de batalha",
    "abyss-weekly-cap": "Limite semanal de Pontos do Abismo",
    "weekly-order-scrolls": "Pergaminhos de ordem e compras semanais",
    "abyss-rift-zone": "Zona da Fenda do Abismo",
    "material-transformation": "Transformação de matéria e Energia de Od",
    "artifact-occupation": "Batalha de ocupação de artefatos",
  },
  ru: {
    "mission-quests": "Миссии",
    "supply-requests": "Заказы на снабжение",
    "expedition-charge": "Еженедельные награды Экспедиции",
    "transcendence-charge": "Заряды Трансцендентности",
    "shugo-fiesta": "Фестиваль шуго",
    "dimensional-invasion": "Вторжение измерений",
    "spacetime-rift": "Время Пространственно-временного разлома",
    "daily-dungeon": "Недельный лимит Ежедневного подземелья",
    "trial-rewards": "Награды Испытания по сложности",
    "battlefield-wins": "Награды за победы на Поле боя",
    "abyss-weekly-cap": "Недельный лимит Очков Бездны",
    "weekly-order-scrolls": "Еженедельные свитки приказов и покупки",
    "abyss-rift-zone": "Зона разлома Бездны",
    "material-transformation": "Преобразование материи и энергия Ода",
    "artifact-occupation": "Битва за артефакт",
  },
};

function isCoreChecklistLocale(
  locale: SiteLocale,
): locale is ContentLocale {
  return locale === "zh-hant" || locale === "en" || locale === "ko";
}

export type ChecklistActivity = {
  id: string;
  frequency: Extract<ChecklistFrequency, "daily" | "weekly">;
  priority: ChecklistActivityPriority;
  scope: ChecklistActivityScope;
  sourceIds: readonly ChecklistSourceId[];
  copy: Record<ContentLocale, LocalizedActivityCopy>;
};

export const CHECKLIST_CATALOG_VERSION = "2026-07-21";

export const CHECKLIST_SOURCES = {
  mission: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/board/notice/view?articleId=69de99a6aa506f05b666222b",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方：使命每日次數調整",
        note: "官方確認 2026-04-22 起，使命任務的每日次數改為伺服器單位。",
      },
      en: {
        label: "AION2 official: Mission daily-attempt change",
        note: "The official notice confirms that Mission daily attempts became server-wide on 2026-04-22.",
      },
      ko: {
        label: "AION2 공식: 사명 일일 횟수 변경",
        note: "공식 공지는 2026-04-22부터 사명 일일 수행 횟수가 서버 단위로 바뀌었다고 확인합니다.",
      },
    },
  },
  weeklyReset: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/board/notice/view?articleId=6964c59b7bbc693e90b292f7",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方：每週購買重置變更",
        note: "官方公告確認指定每週商品自 2026-01-21 起於每週三 05:00 重置。",
      },
      en: {
        label: "AION2 official: weekly purchase-reset change",
        note: "The official notice confirms that listed weekly shop limits reset Wednesday at 05:00 from 2026-01-21.",
      },
      ko: {
        label: "AION2 공식: 주간 구매 초기화 변경",
        note: "공식 공지는 지정 주간 상품이 2026-01-21부터 수요일 05:00에 초기화된다고 확인합니다.",
      },
    },
  },
  dailyBoundary: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/board/notice/view?articleId=69d5069b32ded34ddbddd9f4",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方：每日 05:00 營運日界線證據",
        note: "官方直播獎勵公告以每日 05:00 發送，支持 05:00 為營運日界線；它沒有宣稱每一項日常內容都在此刻重置。",
      },
      en: {
        label: "AION2 official: evidence for the 05:00 operating-day boundary",
        note: "An official reward notice uses daily 05:00 delivery. This supports the operating-day boundary but does not state that every daily activity resets then.",
      },
      ko: {
        label: "AION2 공식: 05:00 운영 일자 경계 근거",
        note: "공식 보상 공지가 매일 05:00 지급을 사용해 운영 일자 경계를 뒷받침하지만 모든 일일 콘텐츠의 초기화를 뜻하지는 않습니다.",
      },
    },
  },
  dailyDungeon: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/guidebook/view?title=%E6%AF%8F%E6%97%A5%E5%89%AF%E6%9C%AC",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方指南：每日副本",
        note: "官方指南（2026-06-05 更新）確認同伺服器每週可挑戰 14 次；名稱雖是每日副本，實際採週額度。",
      },
      en: {
        label: "AION2 official guide: Daily Dungeon",
        note: "The guide, updated 2026-06-05, confirms a server-wide pool of 14 attempts per week despite the Daily Dungeon name.",
      },
      ko: {
        label: "AION2 공식 가이드: 일일 던전",
        note: "2026-06-05 업데이트된 공식 가이드는 이름과 달리 같은 서버에서 주 14회 도전한다고 확인합니다.",
      },
    },
  },
  expedition: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/guidebook/view?title=%E9%81%A0%E5%BE%81",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方指南：遠征與試煉",
        note: "官方指南（2026-07-20 更新）確認未領取背包獎勵次數採同服共用並每週重置；試煉各難度獎勵每週 1 次、每週三重置。",
      },
      en: {
        label: "AION2 official guide: Expedition and Trial",
        note: "The guide, updated 2026-07-20, confirms server-wide weekly reward counts and one Trial reward per difficulty reset on Wednesday.",
      },
      ko: {
        label: "AION2 공식 가이드: 원정·시련",
        note: "2026-07-20 업데이트된 공식 가이드는 서버 공용 주간 보상 횟수와 난이도별 주 1회 시련 보상을 확인합니다.",
      },
    },
  },
  battlefield: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/guidebook/view?title=%E6%88%B0%E5%A0%B4",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方指南：戰場",
        note: "官方指南（2026-07-07 更新）確認每週最多取得 3 場勝利獎勵。",
      },
      en: {
        label: "AION2 official guide: Battlefield",
        note: "The guide, updated 2026-07-07, confirms weekly victory rewards for up to three wins.",
      },
      ko: {
        label: "AION2 공식 가이드: 전장",
        note: "2026-07-07 업데이트된 공식 가이드는 주 최대 3승 보상을 확인합니다.",
      },
    },
  },
  abyss: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/guidebook/view?title=%E6%B7%B1%E6%B7%B5%E5%85%A7%E5%AE%B9",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方指南：深淵內容",
        note: "官方指南（2026-07-17 更新）確認深淵點數有每週／賽季上限，裂縫地帶為週二、四 22:00，Artifact 佔領戰為週三、六 22:00。",
      },
      en: {
        label: "AION2 official guide: Abyss content",
        note: "The guide, updated 2026-07-17, confirms weekly/season Abyss Point caps, Rift Zone Tue/Thu 22:00, and Artifact occupation Wed/Sat 22:00.",
      },
      ko: {
        label: "AION2 공식 가이드: 어비스 콘텐츠",
        note: "2026-07-17 업데이트된 공식 가이드는 어비스 포인트 주간·시즌 상한, 균열 지대 화·목 22:00, 아티팩트 점령전 수·토 22:00을 확인합니다.",
      },
    },
  },
  shugo: {
    status: "official",
    url: "https://tw.ncsoft.com/aion2/guidebook/view?title=%E6%A8%B9%E5%8F%A4%E6%85%B6%E5%85%B8",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 官方指南：樹古慶典",
        note: "官方指南確認獎勵鑰匙會按補充週期恢復、可入場時會顯示圖示；未在正文固定每小時時刻。",
      },
      en: {
        label: "AION2 official guide: Shugo Fiesta",
        note: "The official guide confirms reward-key replenishment and an entry icon, but does not fix an hourly schedule in the guide text.",
      },
      ko: {
        label: "AION2 공식 가이드: 슈고 페스타",
        note: "공식 가이드는 보상 열쇠 보충과 입장 아이콘을 확인하지만 본문에 매시간 고정 일정은 명시하지 않습니다.",
      },
    },
  },
  seasonThreeRoutine: {
    status: "reference",
    url: "https://lounge.plaync.com/feed/68267",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "NC Purple Lounge：Season 3 每日／每週例行參考",
        note: "此 NCER 內容標示為 AI 生成，次數、獎勵與特殊時段僅作整理參考，更新後請以遊戲內顯示為準。",
      },
      en: {
        label: "NC Purple Lounge: Season 3 daily/weekly routine reference",
        note: "This NCER post identifies itself as AI-generated. Treat counts, rewards, and special schedules as a reference and verify them in game after updates.",
      },
      ko: {
        label: "NC Purple Lounge: 시즌 3 일일·주간 루틴 참고",
        note: "이 NCER 글은 AI 생성 정보라고 명시합니다. 횟수, 보상, 특수 시간은 참고용이며 업데이트 후 게임 안에서 다시 확인하세요.",
      },
    },
  },
  chapterOne: {
    status: "official",
    url: "https://tw.ncsoft.com/event/promo/AION2/preview/260614_update/index.aspx",
    checkedAt: "2026-07-21",
    copy: {
      "zh-hant": {
        label: "AION2 台灣官方：Chapter 1 沙霜之地",
        note: "用來核對目前版本範圍；不代表每項次數與獎勵都由此頁確認。",
      },
      en: {
        label: "AION2 Taiwan official: Chapter 1",
        note: "Used to check the current version scope; it does not confirm every count or reward shown here.",
      },
      ko: {
        label: "AION2 대만 공식: Chapter 1",
        note: "현재 버전 범위를 확인하는 출처이며, 아래의 모든 횟수와 보상을 확인하는 문서는 아닙니다.",
      },
    },
  },
} as const satisfies Record<string, {
  status: ChecklistSourceStatus;
  url: string;
  checkedAt: string;
  copy: Record<ContentLocale, LocalizedSourceCopy>;
}>;

export type ChecklistSourceId = keyof typeof CHECKLIST_SOURCES;

export const CHECKLIST_ACTIVITIES: readonly ChecklistActivity[] = [
  {
    id: "mission-quests",
    frequency: "daily",
    priority: "core",
    scope: "server",
    sourceIds: ["mission", "seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "使命任務",
        summary: "先完成伺服器共用的每日使命，再安排角色活動。",
        cadence: "每日 5 次（NCER 參考）；05:00 開新週期",
        entry: "ESC → 日誌 → 使命 → 任務",
        reward: "主要為深淵點數；任務池亦可能出現種族理解度、強化石等獎勵。",
        tip: "先看獎勵再接取；官方已確認次數基準為伺服器單位，未完成任務可能在更新時被放棄。",
      },
      en: {
        name: "Mission quests",
        summary: "Clear the server-wide daily Missions before planning character-specific activities.",
        cadence: "5 per day (NCER reference); new cycle at 05:00",
        entry: "ESC → Journal → Mission → Task",
        reward: "Primarily Abyss Points; the pool may also include faction-understanding items and enhancement stones.",
        tip: "Check the reward before accepting. The official notice confirms that the attempt pool is server-wide.",
      },
      ko: {
        name: "사명 퀘스트",
        summary: "캐릭터별 콘텐츠를 시작하기 전에 서버 공용 일일 사명을 확인하세요.",
        cadence: "일 5회(NCER 참고), 05:00 새 주기",
        entry: "ESC → 저널 → 사명 → 임무",
        reward: "주요 보상은 어비스 포인트이며 종족 이해도 아이템, 강화석 등이 포함될 수 있습니다.",
        tip: "수락 전 보상을 확인하세요. 공식 공지로 수행 횟수가 서버 단위임이 확인되었습니다.",
      },
    },
  },
  {
    id: "supply-requests",
    frequency: "daily",
    priority: "core",
    scope: "server",
    sourceIds: ["seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "補給委託",
        summary: "查看日間、週間與賽季交付項目，先交成本合理的材料。",
        cadence: "每日檢查；不同委託另有週／賽季週期",
        entry: "開啟補給委託，逐項確認需求數量與剩餘時間",
        reward: "深淵點數與委託進度；實際回報依目前委託顯示。",
        tip: "交付前比較交易所價格，避免把稀缺成長材料用在低收益委託。",
      },
      en: {
        name: "Supply requests",
        summary: "Review daily, weekly, and season deliveries and submit only cost-efficient materials.",
        cadence: "Check daily; weekly and season requests have separate cycles",
        entry: "Open Supply Requests and review the quantity and time remaining for each delivery",
        reward: "Abyss Points and request progress; use the current in-game reward panel as the authority.",
        tip: "Compare market prices before turning in scarce progression materials.",
      },
      ko: {
        name: "보급 의뢰",
        summary: "일간·주간·시즌 납품을 확인하고 비용 효율이 좋은 재료부터 제출하세요.",
        cadence: "매일 확인, 주간·시즌 의뢰는 별도 주기",
        entry: "보급 의뢰에서 요구 수량과 남은 시간을 각각 확인",
        reward: "어비스 포인트와 의뢰 진행도이며 현재 게임 내 보상 표시를 우선합니다.",
        tip: "희귀 성장 재료를 제출하기 전에 거래소 가격과 효율을 비교하세요.",
      },
    },
  },
  {
    id: "expedition-charge",
    frequency: "weekly",
    priority: "core",
    scope: "server",
    sourceIds: ["expedition", "seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "遠征週獎勵次數",
        summary: "檢查同伺服器共用的未領取背包獎勵次數，選擇符合目前成長目標的遠征。",
        cadence: "每週重置；同伺服器共用（官方 2026-07-20 指南）",
        entry: "遠征 → 選擇需要武器、飾品或防具的副本",
        reward: "依遠征類型取得對應裝備與成長資源。",
        tip: "先看剩餘可領獎次數，再安排角色與副本；每週實際次數以當前介面為準。",
      },
      en: {
        name: "Expedition weekly rewards",
        summary: "Check the server-wide unclaimed Bag reward count and choose an Expedition for your current gearing goal.",
        cadence: "Resets weekly; shared on the same server (official guide updated 2026-07-20)",
        entry: "Expedition → choose the dungeon for the weapon, accessory, or armor slot you need",
        reward: "Equipment and progression resources depend on the selected Expedition.",
        tip: "Review remaining reward claims before choosing character and dungeon; use the current UI for the exact weekly count.",
      },
      ko: {
        name: "원정 주간 보상 횟수",
        summary: "같은 서버에서 공유하는 미수령 가방 보상 횟수를 확인하고 장비 목표에 맞는 원정을 선택하세요.",
        cadence: "매주 초기화, 같은 서버 공유(2026-07-20 공식 가이드)",
        entry: "원정 → 필요한 무기·장신구·방어구 던전 선택",
        reward: "선택한 원정에 따라 장비와 성장 재료를 획득합니다.",
        tip: "캐릭터와 던전을 고르기 전에 남은 보상 횟수를 확인하고 정확한 주간 수치는 현재 UI를 따르세요.",
      },
    },
  },
  {
    id: "transcendence-charge",
    frequency: "daily",
    priority: "core",
    scope: "character",
    sourceIds: ["seasonThreeRoutine", "chapterOne"],
    copy: {
      "zh-hant": {
        name: "超越充能與消耗",
        summary: "確認超越票券，按 Arcana、賽季任務或金幣需求安排場次。",
        cadence: "每日 +1、最多 14（NCER 2026-05-19 參考）",
        entry: "超越 → 依目前可挑戰難度選擇內容",
        reward: "Arcana、Kina 與賽季任務進度；依遊戲內掉落表為準。",
        tip: "接近 14 張時先消耗，並把場次與賽季任務一起規劃。",
      },
      en: {
        name: "Transcendence charges",
        summary: "Review your charges and schedule runs around Arcana, season missions, or Kina needs.",
        cadence: "+1 daily, cap 14 (NCER reference dated 2026-05-19)",
        entry: "Transcendence → choose content within your current difficulty range",
        reward: "Arcana, Kina, and season-mission progress; verify the active loot table in game.",
        tip: "Spend charges before reaching 14 and combine runs with relevant season missions.",
      },
      ko: {
        name: "초월 충전·소모",
        summary: "아르카나, 시즌 미션, 키나 목표에 맞춰 초월 횟수를 계획하세요.",
        cadence: "매일 +1, 최대 14(2026-05-19 NCER 참고)",
        entry: "초월 → 현재 도전 가능한 난이도 선택",
        reward: "아르카나, 키나, 시즌 미션 진행도이며 현재 드롭 정보를 우선합니다.",
        tip: "14회 상한 전에 소모하고 관련 시즌 미션과 함께 진행하세요.",
      },
    },
  },
  {
    id: "shugo-fiesta",
    frequency: "daily",
    priority: "recommended",
    scope: "account",
    sourceIds: ["shugo", "seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "修古慶典",
        summary: "有票券時安排整點開放的小遊戲，避免長期堆到上限。",
        cadence: "每日 +2、最多 14；每小時整點（NCER 參考）",
        entry: "開放前確認活動入口與帳號票券餘額",
        reward: "深淵點數與活動代幣；名稱與數量依遊戲內顯示。",
        tip: "這是特殊時段內容；維護或版本更新後先核對下一場倒數。",
      },
      en: {
        name: "Shugo Fiesta",
        summary: "Use available tickets during the hourly mini-game before they sit at the cap.",
        cadence: "+2 daily, cap 14; on the hour (NCER reference)",
        entry: "Before the hour, check the event entry and account-wide ticket balance",
        reward: "Abyss Points and event tokens; verify names and quantities in game.",
        tip: "This is scheduled content. Recheck the next-entry timer after maintenance or an update.",
      },
      ko: {
        name: "슈고 페스타",
        summary: "입장권이 상한에 쌓이지 않도록 매시 정각 미니게임을 계획하세요.",
        cadence: "매일 +2, 최대 14, 매시 정각(NCER 참고)",
        entry: "정각 전에 이벤트 입구와 계정 공용 입장권 확인",
        reward: "어비스 포인트와 이벤트 주화이며 명칭·수량은 게임에서 확인하세요.",
        tip: "시간제 콘텐츠이므로 점검이나 업데이트 후 다음 입장 타이머를 다시 확인하세요.",
      },
    },
  },
  {
    id: "dimensional-invasion",
    frequency: "daily",
    priority: "recommended",
    scope: "account",
    sourceIds: ["seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "次元侵攻",
        summary: "用掉接近上限的次元侵攻次數，並達到最低貢獻門檻。",
        cadence: "每日 +1、最多 7；每小時 30 分（NCER 參考）",
        entry: "於開放前查看入場提示，進場後完成最低貢獻",
        reward: "深淵點數、強化石等；實際獎勵依當期內容。",
        tip: "不要只看固定時刻；遊戲內倒數與臨時維護公告優先。",
      },
      en: {
        name: "Dimensional Invasion",
        summary: "Spend charges near the cap and meet the minimum contribution requirement.",
        cadence: "+1 daily, cap 7; at :30 each hour (NCER reference)",
        entry: "Check the entry prompt before the window and meet minimum contribution inside",
        reward: "Abyss Points, enhancement stones, and current-mode rewards.",
        tip: "Do not rely on the clock alone; the in-game countdown and emergency-maintenance notice take priority.",
      },
      ko: {
        name: "차원 침공",
        summary: "상한에 가까운 횟수를 소모하고 최소 기여도를 달성하세요.",
        cadence: "매일 +1, 최대 7, 매시 30분(NCER 참고)",
        entry: "입장 시간 전 알림을 확인하고 내부에서 최소 기여도 달성",
        reward: "어비스 포인트, 강화석 등이며 현재 콘텐츠 보상을 확인하세요.",
        tip: "고정 시각만 믿지 말고 게임 내 카운트다운과 임시점검 공지를 우선하세요.",
      },
    },
  },
  {
    id: "spacetime-rift",
    frequency: "daily",
    priority: "situational",
    scope: "character",
    sourceIds: ["seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "時空裂縫時段",
        summary: "需要跨陣營任務、封印副本或駐地進度時才排入今日路線。",
        cadence: "約每 3 小時，02／05／08／11…，持續 10 分鐘（NCER 參考）",
        entry: "開放前前往裂縫區域，並先確認當日遊戲內時程",
        reward: "用於跨陣營區域任務、封印副本與駐地進度。",
        tip: "屬情境性任務，不需要的玩家可略過；版本更新後務必重查時段。",
      },
      en: {
        name: "Spacetime Rift window",
        summary: "Add it to today's route only when you need opposite-faction quests, sealed dungeons, or outpost progress.",
        cadence: "About every 3 hours at 02/05/08/11… for 10 minutes (NCER reference)",
        entry: "Move to the Rift area before opening and confirm today's in-game schedule first",
        reward: "Access to opposite-faction regional quests, sealed dungeons, and outpost objectives.",
        tip: "This is situational. Skip it when irrelevant and recheck the schedule after updates.",
      },
      ko: {
        name: "시공의 균열 시간",
        summary: "상대 진영 퀘스트, 봉인 던전, 주둔지 진행이 필요할 때만 오늘 루트에 넣으세요.",
        cadence: "약 3시간 간격 02·05·08·11시…, 10분 유지(NCER 참고)",
        entry: "개방 전 균열 지역으로 이동하고 당일 게임 내 일정을 먼저 확인",
        reward: "상대 진영 지역 퀘스트, 봉인 던전, 주둔지 목표에 접근합니다.",
        tip: "상황별 항목이므로 필요 없으면 건너뛰고 업데이트 후 시간을 재확인하세요.",
      },
    },
  },
  {
    id: "daily-dungeon",
    frequency: "weekly",
    priority: "core",
    scope: "server",
    sourceIds: ["dailyDungeon"],
    copy: {
      "zh-hant": {
        name: "日常副本週額度",
        summary: "把 14 次週額度分散到一週，避免重置前集中清理。",
        cadence: "同伺服器每週 14 次（官方 2026-06-05 指南）",
        entry: "日常副本 → 依強化石或寵物成長需求選擇副本",
        reward: "強化石；部分副本可取得寵物理解度相關資源。",
        tip: "可用立即完成券時先比較稀缺時間與券的價值。",
      },
      en: {
        name: "Daily Dungeon weekly quota",
        summary: "Spread the 14-run weekly pool across the week instead of rushing before reset.",
        cadence: "14 attempts per week on the same server (official guide updated 2026-06-05)",
        entry: "Daily Dungeon → choose a dungeon for enhancement stones or pet progression",
        reward: "Enhancement stones; some choices may supply pet-understanding resources.",
        tip: "When instant-complete tickets are available, compare their value with the time saved.",
      },
      ko: {
        name: "일일 던전 주간 횟수",
        summary: "주 14회를 한 주에 나눠 진행해 초기화 직전에 몰리지 않게 하세요.",
        cadence: "같은 서버에서 주 14회(2026-06-05 공식 가이드)",
        entry: "일일 던전 → 강화석 또는 펫 성장 목표에 맞는 던전 선택",
        reward: "강화석, 일부 던전의 펫 이해도 관련 자원.",
        tip: "즉시 완료권 사용 시 절약 시간과 티켓 가치를 비교하세요.",
      },
    },
  },
  {
    id: "trial-rewards",
    frequency: "weekly",
    priority: "core",
    scope: "character",
    sourceIds: ["expedition"],
    copy: {
      "zh-hant": {
        name: "試煉各難度週獎勵",
        summary: "逐一查看可穩定完成的試煉難度，不漏掉各難度的每週獎勵。",
        cadence: "各難度每週 1 次；每週三重置（官方指南）",
        entry: "遠征 → 試煉 → 依戰力與熟練度選擇難度",
        reward: "各難度的首次週獎勵；具體內容依當前獎勵面板。",
        tip: "把已領獎難度與未領獎難度分清楚，穩定通關優先於勉強挑戰。",
      },
      en: {
        name: "Trial rewards by difficulty",
        summary: "Review every Trial difficulty you can clear consistently so its weekly reward is not missed.",
        cadence: "One reward per difficulty each week; resets Wednesday (official guide)",
        entry: "Expedition → Trial → choose difficulty for your power and familiarity",
        reward: "The first weekly reward for each difficulty; check the active reward panel for contents.",
        tip: "Separate claimed from unclaimed difficulties and favor a consistent clear over forcing a tier.",
      },
      ko: {
        name: "시련 난이도별 주간 보상",
        summary: "안정적으로 완료할 수 있는 각 시련 난이도를 확인해 주간 보상을 놓치지 마세요.",
        cadence: "난이도별 주 1회, 수요일 초기화(공식 가이드)",
        entry: "원정 → 시련 → 전투력과 숙련도에 맞는 난이도 선택",
        reward: "난이도별 첫 주간 보상이며 내용은 현재 보상 패널을 확인하세요.",
        tip: "수령·미수령 난이도를 구분하고 무리한 단계보다 안정적인 완료를 우선하세요.",
      },
    },
  },
  {
    id: "battlefield-wins",
    frequency: "weekly",
    priority: "core",
    scope: "character",
    sourceIds: ["battlefield"],
    copy: {
      "zh-hant": {
        name: "戰場勝利獎勵",
        summary: "追蹤本週可取得獎勵的勝場，達上限後再決定是否繼續參戰。",
        cadence: "每週最多 3 場勝利獎勵（官方 2026-07-07 指南）",
        entry: "戰場 → 確認勝利獎勵進度 → 小隊配對",
        reward: "每週勝利獎勵；達上限後不能繼續小隊配對。",
        tip: "把獎勵目標和單純練習分開，避免誤判剩餘可領次數。",
      },
      en: {
        name: "Battlefield victory rewards",
        summary: "Track reward-eligible wins this week, then decide whether to keep playing after the cap.",
        cadence: "Victory rewards for up to 3 wins weekly (official guide updated 2026-07-07)",
        entry: "Battlefield → review victory-reward progress → party matchmaking",
        reward: "Weekly victory rewards; party matchmaking is unavailable after the reward cap.",
        tip: "Separate the reward target from practice so remaining eligible wins stay clear.",
      },
      ko: {
        name: "전장 승리 보상",
        summary: "이번 주 보상 대상 승수를 추적하고 상한 이후 계속 참가할지 결정하세요.",
        cadence: "주 최대 3승 보상(2026-07-07 공식 가이드)",
        entry: "전장 → 승리 보상 진행도 확인 → 파티 매칭",
        reward: "주간 승리 보상이며 상한 도달 후 파티 매칭이 제한됩니다.",
        tip: "보상 목표와 연습 플레이를 구분해 남은 보상 승수를 명확히 관리하세요.",
      },
    },
  },
  {
    id: "abyss-weekly-cap",
    frequency: "weekly",
    priority: "core",
    scope: "server",
    sourceIds: ["abyss"],
    copy: {
      "zh-hant": {
        name: "深淵點數週上限",
        summary: "定期查看深淵點數的本週取得進度，不要把週上限和賽季上限混在一起。",
        cadence: "每週／賽季各有取得上限（官方 2026-07-17 指南）",
        entry: "深淵 → 查看深淵點數取得上限與目前進度",
        reward: "深淵點數與相關賽季進度；實際上限值依當前角色介面。",
        tip: "接近週重置時先完成高效率來源；版本調整後重新核對上限。",
      },
      en: {
        name: "Abyss Point weekly cap",
        summary: "Review this week's Abyss Point progress and keep the weekly cap separate from the season cap.",
        cadence: "Separate weekly and season acquisition caps (official guide updated 2026-07-17)",
        entry: "Abyss → review the Abyss Point acquisition cap and current progress",
        reward: "Abyss Points and related season progress; use the current character panel for exact limits.",
        tip: "Prioritize efficient sources near weekly reset and recheck caps after balance updates.",
      },
      ko: {
        name: "어비스 포인트 주간 상한",
        summary: "이번 주 어비스 포인트 진행도를 확인하고 주간 상한과 시즌 상한을 구분하세요.",
        cadence: "주간·시즌 획득 상한 별도(2026-07-17 공식 가이드)",
        entry: "어비스 → 어비스 포인트 획득 상한과 현재 진행 확인",
        reward: "어비스 포인트와 시즌 진행이며 정확한 상한은 현재 캐릭터 패널을 따릅니다.",
        tip: "주간 초기화 전 효율적인 획득처를 우선하고 밸런스 변경 후 상한을 재확인하세요.",
      },
    },
  },
  {
    id: "weekly-order-scrolls",
    frequency: "weekly",
    priority: "recommended",
    scope: "character",
    sourceIds: ["weeklyReset", "seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "購買每週指令書與限購品",
        summary: "在重置前檢查村莊、深淵與商店的每週限購。",
        cadence: "每週三 05:00；各商品限制不同",
        entry: "村莊／深淵商人 → 篩選每週限購 → 核對庫存",
        reward: "指令書、奧德能量與其他每週成長資源。",
        tip: "官方只確認指定商品採週三 05:00；其他商店仍應逐項看遊戲內倒數。",
      },
      en: {
        name: "Weekly Order Scrolls and shop limits",
        summary: "Review weekly purchases from village, Abyss, and other merchants before reset.",
        cadence: "Wednesday 05:00; limits vary by product",
        entry: "Village/Abyss merchant → filter weekly-limited products → check inventory",
        reward: "Order Scrolls, Od Energy, and other weekly progression resources.",
        tip: "The official notice confirms Wednesday 05:00 for listed products only; check each other shop timer in game.",
      },
      ko: {
        name: "주간 지령서·구매 제한",
        summary: "초기화 전에 마을, 어비스, 기타 상인의 주간 구매 항목을 확인하세요.",
        cadence: "수요일 05:00, 상품별 제한 상이",
        entry: "마을·어비스 상인 → 주간 제한 상품 필터 → 보유량 확인",
        reward: "지령서, 오드 에너지 등 주간 성장 자원.",
        tip: "공식 공지는 명시된 상품의 수요일 05:00만 확인하므로 다른 상점은 게임 내 시간을 각각 확인하세요.",
      },
    },
  },
  {
    id: "abyss-rift-zone",
    frequency: "weekly",
    priority: "situational",
    scope: "character",
    sourceIds: ["abyss"],
    copy: {
      "zh-hant": {
        name: "深淵裂縫地帶",
        summary: "本週要參加裂縫地帶時，預留週二或週四晚間的活動時段。",
        cadence: "每週二、四 22:00（伺服器時間；官方指南）",
        entry: "活動前查看深淵內容日曆、入場條件與遊戲內提示",
        reward: "依當期深淵裂縫地帶規則與獎勵面板。",
        tip: "這是固定時段提醒，不會隨每日 05:00 自動出現第二次；臨時維護公告優先。",
      },
      en: {
        name: "Abyss Rift Zone",
        summary: "Reserve a Tuesday or Thursday evening window when you plan to join the Rift Zone this week.",
        cadence: "Tuesday and Thursday at 22:00 server time (official guide)",
        entry: "Before the event, review the Abyss calendar, entry conditions, and in-game prompt",
        reward: "Follow the active Abyss Rift Zone rules and reward panel.",
        tip: "This is a scheduled reminder, not a second daily reset. Emergency-maintenance notices take priority.",
      },
      ko: {
        name: "어비스 균열 지대",
        summary: "이번 주 균열 지대에 참가한다면 화요일 또는 목요일 저녁 시간을 확보하세요.",
        cadence: "매주 화·목 22:00 서버 시간(공식 가이드)",
        entry: "이벤트 전 어비스 일정, 입장 조건, 게임 내 알림 확인",
        reward: "현재 어비스 균열 지대 규칙과 보상 패널을 따릅니다.",
        tip: "고정 시간 알림이며 두 번째 일일 초기화가 아닙니다. 임시점검 공지를 우선하세요.",
      },
    },
  },
  {
    id: "material-transformation",
    frequency: "weekly",
    priority: "recommended",
    scope: "character",
    sourceIds: ["weeklyReset", "seasonThreeRoutine"],
    copy: {
      "zh-hant": {
        name: "物質轉換與奧德能量",
        summary: "預留本週需要的奧德能量，別在要開獎勵箱時才發現不足。",
        cadence: "每週規劃；部分商店購買於週三 05:00 重置",
        entry: "物質轉換／商店 → 核對奧德能量存量與本週副本計畫",
        reward: "用於開啟遠征等內容的獎勵箱與相關成長流程。",
        tip: "先估本週場次再製作或購買，避免過量占用材料。",
      },
      en: {
        name: "Material Transformation and Od Energy",
        summary: "Reserve the Od Energy needed this week before a reward cube is waiting to be opened.",
        cadence: "Plan weekly; some merchant purchases reset Wednesday at 05:00",
        entry: "Material Transformation/Shop → compare Od Energy stock with this week's dungeon plan",
        reward: "Used to open reward cubes in Expeditions and related progression flows.",
        tip: "Estimate weekly runs before crafting or buying so materials are not overcommitted.",
      },
      ko: {
        name: "물질 변환·오드 에너지",
        summary: "보상 큐브를 열 때 부족하지 않도록 이번 주 오드 에너지를 미리 준비하세요.",
        cadence: "주간 계획, 일부 상점 구매는 수요일 05:00 초기화",
        entry: "물질 변환·상점 → 보유 오드 에너지와 주간 던전 계획 비교",
        reward: "원정 등 콘텐츠의 보상 큐브와 성장 과정에 사용합니다.",
        tip: "이번 주 횟수를 계산한 뒤 제작·구매해 재료 과소비를 피하세요.",
      },
    },
  },
  {
    id: "artifact-occupation",
    frequency: "weekly",
    priority: "situational",
    scope: "character",
    sourceIds: ["abyss"],
    copy: {
      "zh-hant": {
        name: "Artifact 佔領戰",
        summary: "有參加 Artifact 佔領戰需求時，預留本週兩個活動時段。",
        cadence: "每週三、六 22:00（伺服器時間；官方指南）",
        entry: "開放前查看遊戲內活動日曆與入場條件",
        reward: "依目前 Artifact 佔領戰與活動獎勵表。",
        tip: "官方指南已列出固定時段；若遇臨時維護或活動調整，以遊戲內提示為準。",
      },
      en: {
        name: "Artifact occupation battle",
        summary: "Reserve two event windows when you plan to join Artifact occupation content this week.",
        cadence: "Wednesday and Saturday at 22:00 server time (official guide)",
        entry: "Check the in-game event calendar and entry conditions before the window",
        reward: "Use the current Artifact occupation and event reward panel.",
        tip: "The official guide lists the schedule; use the in-game prompt if emergency maintenance or an event update changes access.",
      },
      ko: {
        name: "아티팩트 점령전",
        summary: "아티팩트 점령전에 참가할 주에는 두 번의 이벤트 시간을 확보하세요.",
        cadence: "매주 수·토 22:00 서버 시간(공식 가이드)",
        entry: "개방 전 게임 내 이벤트 달력과 입장 조건 확인",
        reward: "현재 아티팩트 점령전과 이벤트 보상표를 따릅니다.",
        tip: "공식 가이드에 일정이 확인되며 임시점검이나 이벤트 변경 시 게임 내 알림을 우선하세요.",
      },
    },
  },
] as const;

export const CHECKLIST_BUILTIN_DEFINITIONS = CHECKLIST_ACTIVITIES.map((activity) => ({
  id: activity.id,
  frequency: activity.frequency,
  label: activity.copy.en.name,
}));

export function getChecklistActivity(id: string | undefined) {
  if (!id) return undefined;
  return CHECKLIST_ACTIVITIES.find((activity) => activity.id === id);
}

export function getChecklistActivityCopy(
  activity: ChecklistActivity,
  locale: SiteLocale,
) {
  if (isCoreChecklistLocale(locale)) return activity.copy[locale];
  const localized = generatedChecklistCopy[locale].activities[activity.id];
  if (!localized) {
    throw new Error(`Missing ${locale} checklist activity copy for ${activity.id}`);
  }
  return {
    ...localized,
    name: editorialActivityNameOverrides[locale][activity.id] ?? localized.name,
  };
}

export function getChecklistSourceCopy(
  id: ChecklistSourceId,
  locale: SiteLocale,
) {
  if (isCoreChecklistLocale(locale)) return CHECKLIST_SOURCES[id].copy[locale];
  const localized = generatedChecklistCopy[locale].sources[id];
  if (!localized) {
    throw new Error(`Missing ${locale} checklist source copy for ${id}`);
  }
  return localized;
}

export function getChecklistItemLabel(
  item: { label: string; builtinId?: string },
  locale: SiteLocale,
) {
  const activity = getChecklistActivity(item.builtinId);
  return activity ? getChecklistActivityCopy(activity, locale).name : item.label;
}
