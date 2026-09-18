import type { SiteLocale } from "./site-config";

export type TranslationStage =
  | "official"
  | "editorial"
  | "machine-draft"
  | "fallback";

export type LocalizationStatusCopy = {
  badge: string;
  title: string;
  description: string;
  gameDataLabel: string;
  gameDataDescription: string;
};

export const localizationStatusCopy: Record<
  SiteLocale,
  LocalizationStatusCopy
> = {
  "zh-hant": {
    badge: "翻譯狀態",
    title: "此語言版本仍在進行遊戲術語校對",
    description:
      "介面與頁面摘要已完成本地化；尚未取得官方譯名的物品、技能、地圖與正文內容會暫時使用英文來源，並在完成校對後逐步替換。",
    gameDataLabel: "英文資料暫代",
    gameDataDescription:
      "此名稱目前沿用英文資料，不代表遊戲正式繁體中文譯名。",
  },
  "zh-hans": {
    badge: "翻译状态",
    title: "本页已完成编辑翻译，游戏术语仍在校对",
    description:
      "界面与正文已根据核实后的英文资料完成本地化。尚未取得官方译名的物品、技能与地图名称采用易读暂译；官方术语公布后会逐项更新。",
    gameDataLabel: "暂用英文数据",
    gameDataDescription:
      "该名称目前沿用英文数据，不代表游戏正式简体中文译名。",
  },
  en: {
    badge: "Translation status",
    title: "Some game terminology is still under review",
    description:
      "The interface and page summaries are localized. Items, skills, maps, and long-form content without a verified official translation temporarily use the English source and will be replaced after review.",
    gameDataLabel: "English data fallback",
    gameDataDescription:
      "This name currently uses the English data source and may differ from the final official localization.",
  },
  fr: {
    badge: "État de la traduction",
    title: "Traduction éditoriale terminée, terminologie en cours de vérification",
    description:
      "L’interface et le contenu ont été localisés à partir des sources anglaises vérifiées. Les noms d’objets, de compétences et de cartes sans traduction officielle restent provisoires et seront actualisés.",
    gameDataLabel: "Données anglaises provisoires",
    gameDataDescription:
      "Ce nom provient actuellement des données anglaises et peut différer de la localisation officielle finale.",
  },
  de: {
    badge: "Übersetzungsstatus",
    title: "Redaktionell übersetzt, Spielbegriffe werden noch geprüft",
    description:
      "Oberfläche und Inhalte wurden anhand der geprüften englischen Quellen lokalisiert. Gegenstands-, Fertigkeits- und Kartennamen ohne offizielle Übersetzung sind vorläufig und werden später abgeglichen.",
    gameDataLabel: "Vorläufige englische Daten",
    gameDataDescription:
      "Dieser Name stammt derzeit aus den englischen Daten und kann von der endgültigen offiziellen Lokalisierung abweichen.",
  },
  es: {
    badge: "Estado de la traducción",
    title: "Traducción editorial completa; terminología aún en revisión",
    description:
      "La interfaz y el contenido se han localizado a partir de fuentes inglesas verificadas. Los nombres de objetos, habilidades y mapas sin traducción oficial son provisionales y se actualizarán.",
    gameDataLabel: "Datos provisionales en inglés",
    gameDataDescription:
      "Este nombre procede por ahora de los datos ingleses y puede diferir de la localización oficial definitiva.",
  },
  ja: {
    badge: "翻訳状況",
    title: "本文の編集翻訳は完了し、ゲーム用語を確認中です",
    description:
      "確認済みの英語資料を基に、インターフェースと本文を日本語化しました。公式訳が未確認のアイテム、スキル、マップ名は暫定訳で、公式用語の公開後に更新します。",
    gameDataLabel: "英語データを暫定使用",
    gameDataDescription:
      "この名称は現在英語データに基づくもので、正式な日本語ローカライズと異なる場合があります。",
  },
  "pt-br": {
    badge: "Status da tradução",
    title: "Tradução editorial concluída; termos do jogo em revisão",
    description:
      "A interface e o conteúdo foram localizados a partir de fontes verificadas em inglês. Nomes de itens, habilidades e mapas sem tradução oficial são provisórios e serão atualizados.",
    gameDataLabel: "Dados provisórios em inglês",
    gameDataDescription:
      "Este nome usa no momento os dados em inglês e pode diferir da localização oficial final.",
  },
  ru: {
    badge: "Статус перевода",
    title: "Редакционный перевод готов, игровые термины ещё проверяются",
    description:
      "Интерфейс и материалы локализованы по проверенным английским источникам. Названия предметов, навыков и карт без официального перевода пока являются рабочими и будут обновлены.",
    gameDataLabel: "Временные данные на английском",
    gameDataDescription:
      "Сейчас это название взято из английских данных и может отличаться от итоговой официальной локализации.",
  },
  ko: {
    badge: "번역 상태",
    title: "일부 게임 용어를 아직 검토하고 있습니다",
    description:
      "인터페이스와 페이지 요약은 현지화되었습니다. 공식 번역을 확인하지 못한 아이템, 스킬, 지도와 본문은 임시로 영어 원문을 사용하며 검토 후 교체됩니다.",
    gameDataLabel: "영어 데이터 임시 사용",
    gameDataDescription:
      "현재 영어 데이터를 사용하는 명칭이며 최종 공식 한국어 번역과 다를 수 있습니다.",
  },
};

export function isFallbackTranslationLocale(locale: SiteLocale) {
  return !["zh-hant", "en", "ko"].includes(locale);
}
