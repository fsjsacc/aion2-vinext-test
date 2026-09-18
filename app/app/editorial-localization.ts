import type { SiteLocale } from "./site-config";

export const editorialDraftLocales = [
  "zh-hans",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
] as const satisfies readonly SiteLocale[];

export type EditorialDraftLocale = (typeof editorialDraftLocales)[number];

/**
 * The initial global-language release is translated from the reviewed English
 * record. This note keeps the distinction between verified facts and temporary
 * game terminology visible until official locale-specific terminology exists.
 */
export const editorialTranslationNotes: Record<
  EditorialDraftLocale,
  string
> = {
  "zh-hans":
    "本页由 KINA 根据已核实的英文资料进行编辑翻译。尚无官方简体中文译名的物品、技能、地图与系统名称采用易读暂译；官方术语公布后会逐项校正，文中的来源、日期、数值与规则不因暂译名称而改变。",
  fr:
    "Cette page est une traduction éditoriale KINA fondée sur la version anglaise vérifiée. Les noms d’objets, de compétences, de cartes et de systèmes sans terminologie française officielle sont provisoires et seront mis à jour sans modifier les sources, dates, valeurs ou règles citées.",
  de:
    "Diese Seite ist eine redaktionelle KINA-Übersetzung der geprüften englischen Fassung. Gegenstands-, Fertigkeits-, Karten- und Systemnamen ohne offizielle deutsche Terminologie sind vorläufig und werden später abgeglichen; Quellen, Daten, Werte und Regeln bleiben davon unberührt.",
  es:
    "Esta página es una traducción editorial de KINA basada en la versión inglesa verificada. Los nombres de objetos, habilidades, mapas y sistemas sin terminología oficial en español son provisionales y se actualizarán sin alterar las fuentes, fechas, cifras ni reglas citadas.",
  ja:
    "本ページは、確認済みの英語版資料を基に KINA が編集翻訳したものです。公式日本語名が未公開のアイテム、スキル、マップ、システム名には暫定訳を使用し、公式用語の公開後に更新します。出典、日付、数値、ルールは暫定訳によって変更されません。",
  "pt-br":
    "Esta página é uma tradução editorial da KINA baseada na versão verificada em inglês. Nomes de itens, habilidades, mapas e sistemas sem terminologia oficial em português são provisórios e serão atualizados sem alterar as fontes, datas, valores ou regras citadas.",
  ru:
    "Эта страница — редакционный перевод KINA с проверенной английской версии. Названия предметов, навыков, карт и систем без официальной русской терминологии являются временными и будут обновлены; источники, даты, значения и правила при этом не меняются.",
};
