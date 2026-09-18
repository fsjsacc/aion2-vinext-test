"""Generate the initial, full UI localization blocks for the material tools.

This one-time maintenance helper clones the reviewed Traditional Chinese block
for Simplified Chinese and the reviewed English block for the other global
locales. It only rewrites the named copy records below; calculations, URLs,
analytics, and official recipe data are never touched.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path
from typing import Callable

os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")
os.environ.setdefault("ARGOS_BEAM_SIZE", "1")
os.environ.setdefault("ARGOS_BATCH_SIZE", "256")
os.environ.setdefault("ARGOS_INTRA_THREADS", "1")


ROOT = Path(__file__).resolve().parents[2]
SPECS = (
    ("app/_components/tools/CraftingDirectory.tsx", "copy"),
    ("app/_components/tools/CraftingRecipeCalculator.tsx", "copy"),
    ("app/_components/tools/MaterialCalculator.tsx", "uiCopy"),
    ("app/material-calculator.ts", "blankTemplateCopy"),
    ("app/material-calculator.ts", "exampleTemplateCopy"),
    ("app/[locale]/tools/material-calculator/page.tsx", "copy"),
    ("app/[locale]/tools/material-calculator/custom/page.tsx", "copy"),
    ("app/[locale]/tools/material-calculator/recipe/[recipeId]/page.tsx", "copy"),
)
TARGET_CODES = {
    "fr": "fr",
    "de": "de",
    "es": "es",
    "ja": "ja",
    "pt-br": "pt",
    "ru": "ru",
}
FORMAT_LOCALES = {
    "zh-hans": "zh-Hans",
    "fr": "fr-FR",
    "de": "de-DE",
    "es": "es-ES",
    "ja": "ja-JP",
    "pt-br": "pt-BR",
    "ru": "ru-RU",
}
PROTECTED_TERMS = (
    "AION2",
    "KINA",
    "NC",
    "URL",
    "FAQ",
    "ID",
    "Lv.",
    "2026-07-10",
)
SIMPLIFIED_EDITORIAL_REPLACEMENTS = (
    ("繁体中文", "简体中文"),
    ("搜寻", "搜索"),
    ("自订", "自定义"),
    ("连结", "链接"),
    ("社群", "社区"),
    ("资料", "数据"),
    ("栏位", "字段"),
    ("图示", "图标"),
    ("开启", "打开"),
    ("使用者", "用户"),
    ("储存", "保存"),
    ("装置", "设备"),
    ("目前", "当前"),
    ("本机", "本地"),
)
POST_EDIT_REPLACEMENTS = {
    "de": (
        ("Berechnung des Zollmaterialbedarfs", "Benutzerdefinierter Materialbedarfsrechner"),
        ("Zollanmeldung", "Benutzerdefiniertes Material"),
        ("Blank benutzerdefinierter Plan", "Leerer benutzerdefinierter Plan"),
        ("Blank benutzerdefinierte Materialplan", "Leerer benutzerdefinierter Materialplan"),
        ("Search Crafting", "Herstellungs"),
        ("Rezepte für Herstellungs", "Herstellungsrezepte suchen"),
        ("Suchergebnisse, Beruf", "Erzeugnis, Beruf"),
        ("Filterrezepturen", "Rezepte filtern"),
        ("Rezepturen", "Rezepte"),
        ("Rezeptur", "Rezept"),
        ("Klarfilter", "Filter löschen"),
        ("Alle Klassen", "Alle Qualitätsstufen"),
        ("Mastering Levels", "Fertigkeitsstufen"),
        ("Outputqualität", "Qualität des Erzeugnisses"),
        ("Outputkategorie", "Kategorie des Erzeugnisses"),
        ("Position ID", "Gegenstands-ID"),
        ("Artikel ID", "Gegenstands-ID"),
        ("Nächster Artikel", "Weiter"),
        ("Vorherige", "Zurück"),
        ("Beherrschung", "Fertigkeitsstufe"),
        ("Handwerkszählung", "Herstellungsanzahl"),
        ("Anzahl des Handwerks", "Herstellungsanzahl"),
        ("Handwerksgeräte", "Herstellungen"),
        ("Handwerksgerät", "Herstellung"),
        ("Zwischenfahrzeuge", "Zwischenprodukte"),
        ("Direct-Materialien", "Direktmaterialien"),
        ("Leerkosten", "Kosten der fehlenden Menge"),
        ("je Fahrzeug", "pro Herstellung"),
        ("je Schiff", "pro Herstellung"),
        ("Share Sheet", "Freigabedialog"),
        ("Schließende Bestätigung", "Bestätigungsdialog schließen"),
        ("Teilen Sie Links verwenden", "Freigabelinks verwenden"),
    ),
    "fr": (
        ("artisanat", "fabrication"),
        ("Recettes de filtres", "Filtrer les recettes"),
        ("Toutes professions", "Toutes les professions"),
        ("Toutes grades", "Tous les grades"),
        ("Sortie de recherche", "Rechercher un résultat"),
        ("Poste ID", "ID d’objet"),
        ("élément ID", "objet ID"),
        ("embarcations", "fabrications"),
        ("bateau", "fabrication"),
        ("navire", "fabrication"),
        ("icone", "icône"),
        ("Réinitialisez maintenant", "Réinitialiser"),
        ("Fermer la confirmation", "Fermer la fenêtre de confirmation"),
    ),
    "es": (
        ("artesanías", "fabricaciones"),
        ("artesanía", "fabricación"),
        ("Recetas de filtro", "Filtrar recetas"),
        ("Filtros claros", "Borrar filtros"),
        ("Tema ID", "ID del objeto"),
        ("Mastery", "Maestría"),
        ("Per craft", "Por fabricación"),
        ("Cuenta de fabricación", "Número de fabricaciones"),
        ("conteo de fabricación", "número de fabricaciones"),
        ("Enlace de la parte de la copia", "Copiar enlace para compartir"),
        ("unidades desaparecidas", "unidades faltantes"),
        ("material perdido", "material faltante"),
        ("Propietario", "En posesión"),
        ("Costo de la reducción", "Coste del faltante"),
        ("Tasa por arte", "Tarifa por fabricación"),
        ("Costo por embarcación", "Coste por fabricación"),
        ("Confirmación cercana", "Cerrar confirmación"),
    ),
    "pt-br": (
        ("artesanatos", "fabricações"),
        ("artesanato", "fabricação"),
        ("embarcações", "fabricações"),
        ("embarcação", "fabricação"),
        ("Propôs que o Tribunal de Justiça respondesse do seguinte modo:", "Não disponível"),
        ("Mestre", "Proficiência"),
        ("Actualização", "Atualização"),
        ("actuais", "atuais"),
        ("directos", "diretos"),
        ("directo", "direto"),
        ("Grau de saída", "Grau do produto"),
        ("Propriedade", "Em posse"),
        ("Necessidade", "Faltam"),
        ("Custo da redução", "Custo da falta"),
        ("Taxa de crafting total", "Taxa total de fabricação"),
        ("PLANEEIRO", "PLANEJADOR"),
        ("PLANEADOR", "PLANEJADOR"),
        ("BASE DE DADOS DE ARMAZENAMENTO", "BANCO DE DADOS DE FABRICAÇÃO"),
        ("DIRECÇÃO DE RECIPE", "LISTA DE RECEITAS"),
        ("Milho-pão", "Navegação estrutural"),
        ("Pasta de receitas", "Lista de receitas"),
        ("Calculadora de desenho FAQ", "Perguntas frequentes sobre fabricação"),
        ("craftable", "fabricáveis"),
    ),
}
SOURCE_OVERRIDES = {
    "ja": {
        "Search crafting recipes": "製作レシピを検索",
        "Search output, profession, category, or item ID": "完成品、製作職、カテゴリ、アイテムIDを検索",
        "Filter recipes": "レシピを絞り込む",
        "All professions": "すべての製作職",
        "All grades": "すべてのグレード",
        "All categories": "すべてのカテゴリ",
        "All mastery levels": "すべての熟練度",
        "Profession": "製作職",
        "Output grade": "完成品グレード",
        "Output category": "完成品カテゴリ",
        "Mastery": "熟練度",
        "Clear filters": "絞り込みを解除",
        "All recipes": "全レシピ",
        "Current results": "現在の結果",
        "Professions": "製作職",
        "ZXQPH0QXZ recipes": "ZXQPH0QXZ件のレシピ",
        "Showing ZXQPH0QXZ–ZXQPH1QXZ of ZXQPH2QXZ": "全ZXQPH2QXZ件中ZXQPH0QXZ～ZXQPH1QXZ件を表示",
        "Recipe": "レシピ",
        "Item ID": "アイテムID",
        "Open the material calculator for ZXQPH0QXZ": "ZXQPH0QXZの材料計算機を開く",
        "No matching recipes": "条件に一致するレシピはありません",
        "Try a shorter search or clear one of the filters.": "検索語を短くするか、絞り込み条件を解除してください。",
        "Previous": "前へ",
        "Next": "次へ",
        "Page ZXQPH0QXZ of ZXQPH1QXZ": "ZXQPH1QXZページ中ZXQPH0QXZページ",
        "Go to page ZXQPH0QXZ": "ZXQPH0QXZページへ移動",
        "ZXQPH0QXZ icon": "ZXQPH0QXZのアイコン",
        "Lv. ZXQPH0QXZ": "Lv. ZXQPH0QXZ",
        "Uncategorized": "未分類",
        "Crafting material calculator": "製作材料計算機",
        "Recipe ID": "レシピID",
        "Output / craft": "1回の製作量",
        "Planned output": "予定製作量",
        "Not available": "情報なし",
        "Craft count": "製作回数",
        "Material requirements update with the craft count": "製作回数に応じて材料必要量を更新します",
        "Direct materials": "直接材料",
        "Calculate the first-level recipe ingredients": "レシピの第1階層の材料を計算します",
        "Base materials": "基礎材料",
        "Expand intermediate crafts into their lowest-level materials": "中間製作品を最下層の材料まで展開します",
        "No base-material breakdown is available for this recipe": "このレシピには確認可能な基礎材料の内訳がありません",
        "Copy share link": "共有リンクをコピー",
        "Share link copied. Inventory and prices were not included.": "共有リンクをコピーしました。在庫数と価格は含まれません。",
        "The link could not be copied. Copy it from the browser address bar.": "リンクをコピーできませんでした。ブラウザのアドレスバーからコピーしてください。",
        "Reset inputs": "入力をリセット",
        "Material requirements": "材料必要量",
        "Enter what you own and a unit price. Only missing units contribute to cost.": "所持数と単価を入力すると、不足分だけを費用として計算します。",
        "Material": "材料",
        "Per craft": "1回あたり",
        "Required": "必要数",
        "Owned": "所持数",
        "Unit price": "単価",
        "Need": "不足数",
        "Shortage cost": "不足分の費用",
        "Ready": "準備済み",
        "Unit price not entered": "単価未入力",
        "ZXQPH0QXZ shortage material entries have no unit price, so the grand total is not shown yet.": "不足材料ZXQPH0QXZ種類の単価が未入力のため、合計費用はまだ表示されません。",
        "The values are too large to calculate safely. Lower the craft count, inventory, or unit price.": "値が大きすぎるため安全に計算できません。製作回数、所持数、または単価を下げてください。",
        "No material breakdown in this mode": "このモードには材料内訳がありません",
        "Try Direct materials or choose another recipe.": "直接材料へ切り替えるか、別のレシピを選んでください。",
        "Inventory, prices, and fees stay on this device. Shared links contain only the recipe, material mode, and craft count.": "所持数、価格、手数料はこの端末にのみ保存されます。共有リンクにはレシピ、材料モード、製作回数だけが含まれます。",
        "Intermediate crafts": "中間製作品",
        "These explain the base-material path and are not charged a second time.": "基礎材料への展開経路を示す項目で、費用には重複して加算しません。",
        "ZXQPH0QXZ intermediate items": "中間製作品ZXQPH0QXZ件",
        "Cost summary": "費用の概要",
        "Missing material cost": "不足材料の費用",
        "Fee per craft": "1回あたりの製作手数料",
        "Total crafting fee": "製作手数料合計",
        "Cost per craft": "1回あたりの製作費用",
        "Cost per output": "完成品1個あたりの費用",
        "Grand total": "合計費用",
        "Kina": "ギーナ",
        "Reset inputs for this recipe?": "このレシピの入力をリセットしますか？",
        "Inventory, prices, fees, material mode, and craft count will be cleared. This cannot be undone.": "所持数、価格、手数料、材料モード、製作回数を消去します。この操作は元に戻せません。",
        "Cancel": "キャンセル",
        "Reset now": "リセットする",
        "Local inputs for this recipe were reset.": "このレシピの端末内入力をリセットしました。",
        "Close confirmation": "確認画面を閉じる",
        "USER-DEFINED PLANNER": "ユーザー定義プランナー",
        "Custom material requirement calculator": "カスタム材料必要量計算機",
        "Create multiple stages, enter the material cost per target and target count, then compare the result with your current inventory.": "複数の段階を作成し、目標1回あたりの材料数と目標回数を入力して、現在の所持数と比較します。",
        "Every name, quantity, and result is entered by you and calculated in this browser. Nothing here is official AION2 material data, a drop rate, a success rate, or a recommendation. Verify values against your current game version.": "名前、数量、計算結果はすべてユーザーが入力した内容です。AION2公式の材料データ、ドロップ率、成功率、推奨情報ではありません。現在のゲームバージョンで必ず確認してください。",
        "Plans stay in this browser on this device. Share links use the URL fragment and do not upload your plan to KINA.": "プランはこの端末のブラウザ内だけに保存されます。共有リンクはURLフラグメントを使用し、プランをKINAへ送信しません。",
        "Choose a starting template": "開始テンプレートを選択",
        "A template replaces the plan currently being edited.": "テンプレートを選ぶと、編集中のプランが置き換わります。",
        "Use “ZXQPH0QXZ”": "「ZXQPH0QXZ」を使用",
        "Current template": "現在のテンプレート",
        "Plan name": "プラン名",
        "A label for your own reference; it does not affect the calculation.": "プランを識別するための名前です。計算結果には影響しません。",
        "Save status": "保存状態",
        "Current session only": "現在のセッションのみ",
        "Saved on this device": "この端末に保存済み",
        "Shared-link copy": "共有リンクのコピー",
        "Reading local plan": "端末内のプランを読み込み中",
        "You are editing a copy from a shared link. Your existing local plan will not be overwritten until you choose Save copy.": "共有リンクから読み込んだコピーを編集中です。「コピーを保存」を選ぶまで、既存の端末内プランは上書きされません。",
        "Save on this device": "この端末に保存",
        "Save copy": "コピーを保存",
        "Share plan": "プランを共有",
        "Copy shortage list": "不足リストをコピー",
        "Clear and reset": "消去してリセット",
        "Materials and inventory": "材料と所持数",
        "Each material is calculated separately. Names and inventory are editable.": "材料ごとに個別計算します。名前と所持数は編集できます。",
        "Add material": "材料を追加",
        "No materials yet. Add the first material you want to track.": "材料がありません。追跡したい材料を追加してください。",
        "Material name": "材料名",
        "Current inventory": "現在の所持数",
        "Remove material “ZXQPH0QXZ”": "材料「ZXQPH0QXZ」を削除",
        "Custom material ZXQPH0QXZ": "カスタム材料ZXQPH0QXZ",
        "Stages and per-target costs": "段階と目標1回あたりの材料数",
        "Each stage has a target count and the material cost required for one target.": "各段階に目標回数と、目標1回に必要な材料数を設定します。",
        "Add stage": "段階を追加",
        "No stages yet. Add a stage to enter its per-target costs.": "段階がありません。段階を追加して、目標1回あたりの材料数を入力してください。",
        "Stage name": "段階名",
        "Target count": "目標回数",
        "How many times to complete this stage": "この段階を完了する回数",
        "Material cost per target": "目標1回あたりの材料数",
        "Enter 0 when this stage does not use a material.": "この段階で使わない材料には0を入力してください。",
        "ZXQPH0QXZ: required per target": "ZXQPH0QXZ：目標1回あたりの必要数",
        "Remove stage “ZXQPH0QXZ”": "段階「ZXQPH0QXZ」を削除",
        "Custom stage ZXQPH0QXZ": "カスタム段階ZXQPH0QXZ",
        "Unnamed material": "名前のない材料",
        "Unnamed stage": "名前のない段階",
        "LIVE SUMMARY": "リアルタイム集計",
        "Requirement summary": "必要量の集計",
        "Material types ready": "準備済みの材料種類",
        "Material types short": "不足している材料種類",
        "Material types required": "必要な材料種類",
        "Stages configured": "設定済みの段階",
        "Add materials, stages, and a target count above 0 to begin calculating.": "材料と段階を追加し、目標回数を1以上にすると計算を開始します。",
        "Every currently required material type is ready.": "現在必要な材料はすべて準備できています。",
        "Unlike material units cannot be meaningfully added together, so no combined unit total or overall percentage is shown. Progress is calculated within each material only.": "異なる材料の単位は合算できないため、合計数量や全体割合は表示しません。進捗率は材料ごとに計算します。",
        "Inventory": "所持数",
        "Shortage": "不足",
        "Surplus": "余り",
        "No requirement": "必要量なし",
        "ZXQPH0QXZ is ZXQPH1QXZ% covered": "ZXQPH0QXZはZXQPH1QXZ％準備済み",
        "Plan saved on this device.": "プランをこの端末に保存しました。",
        "The shared plan copy is now saved on this device and replaces the previous local plan.": "共有プランのコピーをこの端末に保存し、以前の端末内プランを置き換えました。",
        "This browser blocked local storage. You can still edit during this session.": "ブラウザで端末内保存がブロックされています。このセッション中は引き続き編集できます。",
        "The saved plan is invalid. A blank plan is shown, and the original stored value was not overwritten.": "保存済みプランの形式が正しくありません。空のプランを表示し、元の保存データは上書きしていません。",
        "The shared plan is invalid or uses an unsupported version, so its contents were not loaded.": "共有プランが無効、または未対応のバージョンのため読み込みませんでした。",
        "Complete every required name and check the quantities. This plan cannot currently be calculated, saved, or shared.": "必要な名前をすべて入力し、数量を確認してください。現在のプランは計算、保存、共有できません。",
        "Quantities must be whole numbers from 0 to ZXQPH0QXZ.": "数量は0からZXQPH0QXZまでの整数で入力してください。",
        "This plan has reached the supported material, stage, or cost-entry limit.": "このバージョンで対応する材料、段階、材料数の上限に達しました。",
        "The system share sheet opened.": "端末の共有画面を開きました。",
        "Plan share link copied.": "プランの共有リンクをコピーしました。",
        "Shortage list copied.": "不足リストをコピーしました。",
        "The browser could not copy automatically. Check clipboard permission and try again.": "自動コピーできませんでした。クリップボードの権限を確認して、もう一度お試しください。",
        "There are no material shortages to copy.": "コピーする材料不足はありません。",
        "The plan was cleared and returned to the blank custom template.": "プランを消去し、空のカスタムテンプレートへ戻しました。",
        "Clear the entire plan?": "プラン全体を消去しますか？",
        "This deletes the materials, stages, costs, and inventory saved on this device and returns to the blank template. It cannot be undone.": "この端末に保存した材料、段階、必要数、所持数を削除して空のテンプレートへ戻します。この操作は元に戻せません。",
        "Clear plan": "プランを消去",
        "Material shortage list (user-defined, not official AION2 data)": "材料不足リスト（ユーザー入力・AION2公式データではありません）",
        "Blank custom plan": "空のカスタムプラン",
        "Start with an empty plan and enter stages, per-target costs, target counts, and current inventory.": "空のプランから始め、段階、目標1回あたりの材料数、目標回数、現在の所持数を入力します。",
        "This template contains no official AION2 costs; every name and quantity is user-entered.": "このテンプレートにAION2公式の必要数は含まれません。名前と数量はすべてユーザー入力です。",
        "Blank custom material plan": "空のカスタム材料プラン",
        "Example material A": "サンプル材料A",
        "Example material B": "サンプル材料B",
        "Example stage one": "サンプル段階1",
        "Example stage two": "サンプル段階2",
        "Custom calculation example": "カスタム計算例",
        "Use two fictional example materials to demonstrate multi-stage requirements, shortages, and surplus.": "2種類の架空材料を使い、複数段階の必要量、不足、余りの計算方法を示します。",
        "This is a custom arithmetic example, not official AION2 material names, costs, drop rates, or progression values.": "これは計算例であり、AION2公式の材料名、必要数、ドロップ率、成長値ではありません。",
        "Custom calculation example (not official AION2 data)": "カスタム計算例（AION2公式データではありません）",
        "Fictional example material A": "架空サンプル材料A",
        "Fictional example material B": "架空サンプル材料B",
        "Custom example stage one": "カスタムサンプル段階1",
        "Custom example stage two": "カスタムサンプル段階2",
        "AION2 Crafting Recipe & Material Calculator": "AION2 製作レシピ・材料計算機",
        "AION2 Crafting Calculator: Materials, Shortages & Cost": "AION2 製作計算機｜材料必要量・不足・費用",
        "CRAFTING DATABASE / MATERIAL PLANNER": "製作データベース／材料プランナー",
        "Search crafted items and professions, then calculate direct or base-material requirements, inventory shortages, and custom-price costs by craft count.": "完成品や製作職を検索し、製作回数に応じた直接材料または基礎材料の必要量、所持数の不足、入力単価による費用を計算します。",
        "Sources and update": "出典と更新情報",
        "This directory starts with 894 recipes that identify a crafting profession. Item names, icons, grades, and categories are matched to NC's official item data. Recipe relationships and quantities use a community snapshot dated 2026-07-10; verify them in game after a patch.": "この一覧には製作職が明記された894件のレシピを収録しています。アイテム名、アイコン、グレード、カテゴリはNC公式アイテムデータと照合し、レシピの関係と数量は2026-07-10時点のコミュニティスナップショットを使用しています。アップデート後はゲーム内で再確認してください。",
        "Item and recipe names follow the currently available official or source labels. The interface is localized separately.": "アイテム名とレシピ名は、現在確認できる公式表記または出典の表記を使用しています。周辺の操作画面は日本語化済みです。",
        "Recipes": "レシピ",
        "Item data date": "アイテムデータ日",
        "Recipe data date": "レシピデータ日",
        "RECIPE DIRECTORY": "レシピ一覧",
        "CALCULATION MODEL": "計算方法",
        "Breadcrumb": "パンくずリスト",
        "Search crafting recipes": "製作レシピを検索",
        "Filter by name, item ID, profession, grade, category, or mastery. Open a result to enter craft count, inventory, and unit prices without rebuilding every material row.": "名前、アイテムID、製作職、グレード、カテゴリ、熟練度で絞り込めます。レシピを開き、製作回数、所持数、単価を入力してください。",
        "How the calculation works": "計算方法",
        "The calculator applies traceable integer relationships only. It does not guess market prices, success rates, or an unpublished output quantity.": "確認できる整数の関係だけを計算します。市場価格、成功率、未公開の製作量は推測しません。",
        "The first-level inputs for the selected recipe, useful when intermediate items are already available.": "選択したレシピへ直接投入する第1階層の材料です。中間製作品をすでに用意している場合に適しています。",
        "The recipe chain expanded into base-material totals for planning from raw resources.": "製作可能な中間材料を展開し、原材料から準備するための基礎材料合計を示します。",
        "Shortage and cost": "不足と費用",
        "Required minus owned gives the shortage; shortage times your unit price gives estimated cost.": "必要数から所持数を引いて不足数を求め、不足数に入力単価を掛けて推定費用を計算します。",
        "Recipe not listed?": "レシピが見つかりませんか？",
        "Use the custom planner for event materials, upgrade stages, or recipes that are not listed in the directory.": "イベント材料、強化段階、一覧にないレシピはカスタムプランナーで整理できます。",
        "Open custom material planner": "カスタム材料プランナーを開く",
        "Crafting calculator FAQ": "製作計算機のよくある質問",
        "Are these recipes official NC data?": "これらのレシピはNC公式データですか？",
        "Not entirely. Item identity, icons, grades, and categories are matched to NC's official catalog. Crafting relationships and quantities come from a dated community snapshot and are never labelled as official.": "すべてが公式データではありません。アイテム、アイコン、グレード、カテゴリはNC公式一覧と照合していますが、製作関係と数量は日付付きのコミュニティスナップショットであり、公式データとして表示しません。",
        "Why enter craft count instead of desired output?": "希望個数ではなく製作回数を入力するのはなぜですか？",
        "The available dataset has no verifiable output-per-craft field. To avoid assuming every craft yields one item, the tool calculates from craft count and asks you to confirm yield in game.": "利用可能なデータには確認可能な1回あたりの製作量がありません。毎回1個できると仮定せず、製作回数から計算します。実際の製作量はゲーム内で確認してください。",
        "What is the difference between direct and base materials?": "直接材料と基礎材料の違いは何ですか？",
        "Direct materials are the first-level recipe inputs. Base materials expand craftable intermediates into raw totals. Do not add the two modes together.": "直接材料はレシピの第1階層の投入物です。基礎材料は製作可能な中間材料を原材料まで展開した合計です。2つのモードを合算しないでください。",
        "Are inventory and prices uploaded?": "所持数と単価は送信されますか？",
        "No. Those inputs stay in this browser. Shared links include only the recipe, mode, and craft count—not inventory or price data.": "送信されません。入力値はこのブラウザ内だけに保存されます。共有リンクにはレシピ、モード、製作回数だけが含まれ、所持数と価格は含まれません。",
        "Recipe directory": "レシピ一覧",
        "Direct and base material totals": "直接材料と基礎材料の合計",
        "Inventory shortage and cost calculation": "所持数の不足と費用計算",
        "AION2 Custom Material Planner": "AION2 カスタム材料プランナー",
        "Create materials and multi-stage targets to calculate total requirements, inventory shortages, surplus, and completion. Use it for events, upgrades, or unlisted recipes.": "材料と複数段階の目標を作成し、総必要量、所持数の不足、余り、準備状況を計算します。イベント、強化、一覧にないレシピに利用できます。",
        "CUSTOM MATERIAL PLAN": "カスタム材料プラン",
        "Back to crafting recipes": "製作レシピ一覧へ戻る",
        "This tool calculates only values you enter. It does not add recipes, success rates, prices, or drop rates. Plans stay in this browser by default.": "入力した数値だけを計算します。レシピ、成功率、価格、ドロップ率を自動追加しません。プランは既定でこのブラウザ内だけに保存されます。",
        "Crafting recipes": "製作レシピ",
        "material calculator": "材料計算機",
        "Calculate direct materials, base materials, inventory shortages, and custom-price costs for ZXQPH0QXZ; profession: ZXQPH1QXZ.": "ZXQPH0QXZの直接材料、基礎材料、所持数の不足、入力単価による費用を計算します。製作職：ZXQPH1QXZ。",
        "not stated": "情報なし",
        "Recipe information": "レシピ情報",
        "Item names, icons, grades, and categories are matched to NC's official item data. Recipe relationships and quantities use a community snapshot dated 2026-07-10. Verify them in game after a patch.": "アイテム名、アイコン、グレード、カテゴリはNC公式アイテムデータと照合しています。レシピの関係と数量は2026-07-10時点のコミュニティスナップショットを使用しています。アップデート後はゲーム内で再確認してください。",
        "Item and material names follow the currently available official or source labels. The calculator interface is localized separately.": "アイテム名と材料名は、現在確認できる公式表記または出典の表記を使用しています。計算機の操作画面は日本語化済みです。",
        "RECIPE NOTES": "レシピ資料",
        "View community source page": "コミュニティ出典ページを見る",
        "Open official item record": "公式アイテム情報を開く",
        "Material relationships": "材料関係",
        "Direct": "直接",
        "Base": "基礎",
        "Intermediate": "中間製作品",
        "The source does not state output per craft, so this page calculates by craft count. Confirm the actual yield in game first.": "出典に1回あたりの製作量がないため、製作回数を基準に計算します。実際の製作量はゲーム内で先に確認してください。",
        "Change recipe language": "このレシピの言語を変更",
        "Direct materials": "直接材料",
        "Base materials": "基礎材料",
        "Inventory shortage": "所持数の不足",
        "Custom unit-price cost": "入力単価による費用",
    },
    "pt-br": {
        "ZXQPH0QXZ recipes": "ZXQPH0QXZ receitas",
        "Showing ZXQPH0QXZ–ZXQPH1QXZ of ZXQPH2QXZ": "Mostrando ZXQPH0QXZ–ZXQPH1QXZ de ZXQPH2QXZ",
        "Not available": "Não disponível",
        "Output / craft": "Produção por fabricação",
        "Planned output": "Produção planejada",
        "Craft count": "Número de fabricações",
        "Material requirements update with the craft count": "Os materiais são atualizados conforme o número de fabricações",
        "Per craft": "Por fabricação",
        "Owned": "Em posse",
        "Need": "Faltam",
        "Shortage cost": "Custo da falta",
        "Fee per craft": "Taxa por fabricação",
        "Cost per craft": "Custo por fabricação",
        "Close confirmation": "Fechar a confirmação",
    },
}
START_PREFIX = "986"
END_PREFIX = "987"
MARKER_DIGITS = 7


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--locale",
        required=True,
        choices=("zh-hans", *TARGET_CODES),
    )
    parser.add_argument(
        "--cache-dir",
        default="tmp/editorial-translation-cache",
    )
    return parser.parse_args()


def skip_quoted(source: str, start: int, quote: str) -> int:
    index = start + 1
    while index < len(source):
        if source[index] == "\\":
            index += 2
            continue
        if source[index] == quote:
            return index + 1
        index += 1
    raise ValueError(f"Unterminated {quote} string")


def matching_brace(source: str, start: int) -> int:
    depth = 0
    index = start
    while index < len(source):
        character = source[index]
        if character in {'"', "'", "`"}:
            index = skip_quoted(source, index, character)
            continue
        if source.startswith("//", index):
            newline = source.find("\n", index + 2)
            index = len(source) if newline < 0 else newline + 1
            continue
        if source.startswith("/*", index):
            end = source.find("*/", index + 2)
            if end < 0:
                raise ValueError("Unterminated block comment")
            index = end + 2
            continue
        if character == "{":
            depth += 1
        elif character == "}":
            depth -= 1
            if depth == 0:
                return index
        index += 1
    raise ValueError("Unterminated object block")


def record_range(source: str, name: str) -> tuple[int, int]:
    match = re.search(
        rf"\bconst\s+{re.escape(name)}\s*:[^=]+?=\s*\{{",
        source,
        re.S,
    )
    if not match:
        raise ValueError(f"Cannot find copy record {name}")
    opening = source.find("{", match.start())
    return opening, matching_brace(source, opening)


def property_range(
    source: str,
    record_start: int,
    record_end: int,
    locale: str,
) -> tuple[int, int, int]:
    record = source[record_start:record_end]
    key_pattern = (
        rf"(?m)^  (?:{re.escape(locale)}|\"{re.escape(locale)}\"):\s*\{{"
    )
    match = re.search(key_pattern, record)
    if not match:
        raise ValueError(f"Cannot find locale {locale}")
    property_start = record_start + match.start()
    opening = source.find("{", property_start, record_end)
    closing = matching_brace(source, opening)
    property_end = closing + 1
    if property_end < len(source) and source[property_end] == ",":
        property_end += 1
    return property_start, opening, property_end


def template_parts(content: str) -> tuple[str, list[str]]:
    output: list[str] = []
    expressions: list[str] = []
    index = 0
    while index < len(content):
        if content.startswith("${", index):
            opening = index + 1
            closing = matching_brace(content, opening)
            marker = f"ZXQPH{len(expressions)}QXZ"
            output.append(marker)
            expressions.append(content[index + 2 : closing])
            index = closing + 1
            continue
        output.append(content[index])
        index += 1
    return "".join(output), expressions


def collect_strings(source: str, result: list[str]) -> None:
    index = 0
    while index < len(source):
        character = source[index]
        if character == '"':
            end = skip_quoted(source, index, character)
            value = json.loads(source[index:end])
            before = source[max(0, index - 40) : index]
            if not re.search(r"toLocaleString\(\s*$", before) and value.strip():
                result.append(value)
            index = end
            continue
        if character == "`":
            end = skip_quoted(source, index, character)
            raw, expressions = template_parts(source[index + 1 : end - 1])
            if raw.strip():
                result.append(raw)
            for expression in expressions:
                collect_strings(expression, result)
            index = end
            continue
        index += 1


def protect_terms(value: str) -> tuple[str, dict[str, str]]:
    protected = value
    replacements: dict[str, str] = {}
    for index, term in enumerate(PROTECTED_TERMS):
        marker = f"ZXQTERM{index}QXZ"
        if term in protected:
            protected = protected.replace(term, marker)
            replacements[marker] = term
    return protected, replacements


def restore_markers(value: str, replacements: dict[str, str]) -> str:
    restored = value
    for marker, original in replacements.items():
        restored = re.sub(
            re.escape(marker).replace(r"\ ", r"\s*"),
            lambda _match: original,
            restored,
            flags=re.I,
        )
    return restored


def normalized_marker(line: str) -> str:
    return re.sub(r"[\s.,]", "", line)


def translate_batch(translator, items: list[tuple[int, str]]) -> dict[int, str]:
    chunks: list[str] = []
    protected_by_index: dict[int, dict[str, str]] = {}
    for index, source in items:
        protected, replacements = protect_terms(source)
        protected_by_index[index] = replacements
        chunks.extend(
            (
                f"KINA START {START_PREFIX}{index:0{MARKER_DIGITS}d}.",
                protected,
                f"KINA END {END_PREFIX}{index:0{MARKER_DIGITS}d}.",
            ),
        )
    translated = translator.translate("\n".join(chunks))
    lines = translated.splitlines()
    starts: dict[int, int] = {}
    ends: dict[int, int] = {}
    for line_index, line in enumerate(lines):
        marker = normalized_marker(line)
        start_match = re.search(
            rf"{START_PREFIX}(\d{{{MARKER_DIGITS}}})",
            marker,
        )
        end_match = re.search(
            rf"{END_PREFIX}(\d{{{MARKER_DIGITS}}})",
            marker,
        )
        if start_match:
            starts[int(start_match.group(1))] = line_index
        if end_match:
            ends[int(end_match.group(1))] = line_index
    output: dict[int, str] = {}
    for index, source in items:
        start = starts.get(index)
        end = ends.get(index)
        replacements = protected_by_index[index]
        if start is None or end is None or end <= start:
            protected, _ = protect_terms(source)
            value = translator.translate(protected).strip()
        else:
            value = "\n".join(lines[start + 1 : end]).strip()
        output[index] = restore_markers(value, replacements)
    return output


def translate_strings(
    locale: str,
    strings: list[str],
    cache_dir: Path,
) -> dict[str, str]:
    from argostranslate import translate

    translator = translate.get_translation_from_codes(
        "en",
        TARGET_CODES[locale],
    )
    if translator is None:
        raise RuntimeError(f"Argos en->{TARGET_CODES[locale]} is unavailable")
    cache_path = cache_dir / f"{locale}.json"
    cache = (
        json.loads(cache_path.read_text(encoding="utf-8"))
        if cache_path.exists()
        else {}
    )
    unique = list(dict.fromkeys(strings))
    missing = [value for value in unique if value not in cache]
    batches: list[list[tuple[int, str]]] = []
    current: list[tuple[int, str]] = []
    current_chars = 0
    for index, value in enumerate(missing):
        estimate = len(value) + 70
        if current and (len(current) >= 24 or current_chars + estimate > 7_500):
            batches.append(current)
            current = []
            current_chars = 0
        current.append((index, value))
        current_chars += estimate
    if current:
        batches.append(current)
    completed = 0
    cache_dir.mkdir(parents=True, exist_ok=True)
    for batch in batches:
        translated = translate_batch(translator, batch)
        for index, value in translated.items():
            cache[missing[index]] = value
        cache_path.write_text(
            json.dumps(cache, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        completed += len(batch)
        print(f"{locale}: translated {completed}/{len(missing)}", flush=True)

    # A translation model can occasionally merge a marker boundary and assign
    # the neighbouring sentence to a key. Re-run only suspicious collisions or
    # placeholder mismatches directly so no placeholder can leak into a label.
    values_to_sources: dict[str, list[str]] = {}
    for source in unique:
        values_to_sources.setdefault(cache[source], []).append(source)
    suspicious: set[str] = set()
    for sources in values_to_sources.values():
        if len(sources) > 1:
            suspicious.update(sources)
    for source in unique:
        source_markers = set(re.findall(r"ZXQPH\d+QXZ", source, re.I))
        value_markers = set(
            re.sub(r"\s+", "", marker).upper()
            for marker in re.findall(
                r"ZXQPH\s*\d+\s*QXZ",
                cache[source],
                re.I,
            )
        )
        if {marker.upper() for marker in source_markers} != value_markers:
            suspicious.add(source)
    for source in suspicious:
        protected, replacements = protect_terms(source)
        cache[source] = restore_markers(
            translator.translate(protected).strip(),
            replacements,
        )
    if suspicious:
        cache_path.write_text(
            json.dumps(cache, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(
            f"{locale}: directly verified {len(suspicious)} suspicious strings",
            flush=True,
        )
    return {value: cache[value] for value in unique}


def translated_template(
    content: str,
    translate_value: Callable[[str], str],
    locale_code: str,
) -> str:
    raw, expressions = template_parts(content)
    localized = translate_value(raw)
    for index, expression in enumerate(expressions):
        marker_pattern = rf"ZXQPH\s*{index}\s*QXZ"
        localized_expression = transform_code(
            expression,
            translate_value,
            locale_code,
        )
        localized = re.sub(
            marker_pattern,
            lambda _match: "${" + localized_expression + "}",
            localized,
            count=1,
            flags=re.I,
        )
    return localized


def transform_code(
    source: str,
    translate_value: Callable[[str], str],
    locale_code: str,
) -> str:
    output: list[str] = []
    index = 0
    while index < len(source):
        character = source[index]
        if character == '"':
            end = skip_quoted(source, index, character)
            value = json.loads(source[index:end])
            before = source[max(0, index - 40) : index]
            localized = (
                locale_code
                if re.search(r"toLocaleString\(\s*$", before)
                else translate_value(value)
            )
            output.append(json.dumps(localized, ensure_ascii=False))
            index = end
            continue
        if character == "`":
            end = skip_quoted(source, index, character)
            localized = translated_template(
                source[index + 1 : end - 1],
                translate_value,
                locale_code,
            )
            output.extend(("`", localized.replace("`", r"\`"), "`"))
            index = end
            continue
        output.append(character)
        index += 1
    return "".join(output)


def main() -> None:
    args = parse_args()
    locale = args.locale
    source_locale = "zh-hant" if locale == "zh-hans" else "en"
    # Regeneration is deterministic: remove an existing generated block first,
    # then rebuild it from the reviewed source block.
    for relative, record_name in SPECS:
        path = ROOT / relative
        source = path.read_text(encoding="utf-8")
        record_start, record_end = record_range(source, record_name)
        if not re.search(
            rf'(?m)^  (?:"{re.escape(locale)}"|{re.escape(locale)}):\s*\{{',
            source[record_start:record_end],
        ):
            continue
        property_start, _, property_end = property_range(
            source,
            record_start,
            record_end,
            locale,
        )
        source = source[:property_start] + source[property_end:]
        path.write_text(source, encoding="utf-8", newline="\n")

    extracted: list[tuple[Path, str, str]] = []
    strings: list[str] = []
    for relative, record_name in SPECS:
        path = ROOT / relative
        source = path.read_text(encoding="utf-8")
        record_start, record_end = record_range(source, record_name)
        property_start, opening, property_end = property_range(
            source,
            record_start,
            record_end,
            source_locale,
        )
        block = source[opening : property_end - 1]
        extracted.append((path, record_name, block))
        if locale != "zh-hans":
            collect_strings(block, strings)

    if locale == "zh-hans":
        from opencc import OpenCC

        converter = OpenCC("t2s")

        def translate_value(value: str) -> str:
            localized = converter.convert(value)
            for source, target in SIMPLIFIED_EDITORIAL_REPLACEMENTS:
                localized = localized.replace(source, target)
            return localized
    else:
        translated = translate_strings(
            locale,
            strings,
            ROOT / args.cache_dir,
        )

        def translate_value(value: str) -> str:
            localized = SOURCE_OVERRIDES.get(locale, {}).get(
                value,
                translated[value],
            )
            for source, target in POST_EDIT_REPLACEMENTS.get(locale, ()):
                localized = localized.replace(source, target)
            return localized

    by_path: dict[Path, list[tuple[str, str]]] = {}
    for path, record_name, block in extracted:
        localized_block = transform_code(
            block,
            translate_value,
            FORMAT_LOCALES[locale],
        )
        by_path.setdefault(path, []).append((record_name, localized_block))

    for path, replacements in by_path.items():
        source = path.read_text(encoding="utf-8")
        for record_name, localized_block in replacements:
            record_start, record_end = record_range(source, record_name)
            insert_at, _, _ = property_range(
                source,
                record_start,
                record_end,
                "ko",
            )
            property_text = f'  "{locale}": {localized_block},\n'
            source = source[:insert_at] + property_text + source[insert_at:]
        path.write_text(source, encoding="utf-8", newline="\n")
        print(f"updated {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
