import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MaterialCalculator } from "@/app/_components/tools/MaterialCalculator";
import toolsStyles from "@/app/_components/tools/tools.module.css";
import {
  getLanguageAlternates,
  getSectionHref,
  isSiteLocale,
  localizedHref,
  siteLocaleConfig,
  siteLocales,
  siteShellCopy,
  type SiteLocale,
} from "@/app/site-config";
import { toolHubCopy } from "@/app/tool-registry";

import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

type PageCopy = {
  title: string;
  description: string;
  kicker: string;
  back: string;
  boundary: string;
  breadcrumbLabel: string;
};

const copy: Record<SiteLocale, PageCopy> = {
  "zh-hant": {
    title: "AION2 自訂材料計畫器",
    description: "自行建立材料與多個階段，計算總需求、庫存缺口、餘量與完成比例。適合活動、強化或尚未收錄的配方。",
    kicker: "CUSTOM MATERIAL PLAN",
    back: "返回製作配方目錄",
    boundary: "此工具只計算你輸入的數量，不會自動補入配方、成功率、價格或掉落率。計畫預設只保存在目前瀏覽器。",
    breadcrumbLabel: "麵包屑導覽",
  },
  en: {
    title: "AION2 Custom Material Planner",
    description: "Create materials and multi-stage targets to calculate total requirements, inventory shortages, surplus, and completion. Use it for events, upgrades, or unlisted recipes.",
    kicker: "CUSTOM MATERIAL PLAN",
    back: "Back to crafting recipes",
    boundary: "This tool calculates only values you enter. It does not add recipes, success rates, prices, or drop rates. Plans stay in this browser by default.",
    breadcrumbLabel: "Breadcrumb",
  },

  "zh-hans": {
    title: "AION2 自定义材料计划器",
    description: "自行建立材料与多个阶段，计算总需求、库存缺口、余量与完成比例。适合活动、强化或尚未收录的配方。",
    kicker: "CUSTOM MATERIAL PLAN",
    back: "返回制作配方目录",
    boundary: "此工具只计算你输入的数量，不会自动补入配方、成功率、价格或掉落率。计划预设只保存在当前浏览器。",
    breadcrumbLabel: "面包屑导览",
  },








  "de": {
    title: "AION2 Planer für benutzerdefinierte Materialien",
    description: "Erstellen Sie Materialien und mehrstufige Ziele, um den Gesamtbedarf, den Bestandsmangel, den Überschuss und die Fertigstellung zu berechnen. Verwenden Sie es für Ereignisse, Upgrades oder nicht gelistete Rezepte.",
    kicker: "BENUTZERDEFINIERTER MATERIALPLAN",
    back: "Zurück zu den Rezepten für die Herstellung",
    boundary: "Dieses Tool berechnet nur Werte, die Sie eingeben. Es fügt keine Rezepte, Erfolgsraten, Preise oder Drop-Raten hinzu. Pläne bleiben standardmäßig in diesem Browser.",
    breadcrumbLabel: "Brotkrümelnavigation",
  },
  "fr": {
    title: "Planificateur de matériaux personnalisé AION2",
    description: "Créer des matériaux et des cibles à plusieurs étapes pour calculer les besoins totaux, les pénuries d'inventaire, l'excédent et l'achèvement. Utilisez-le pour des événements, des mises à jour ou des recettes non listées.",
    kicker: "PLAN DE MATÉRIAUX PERSONNALISÉ",
    back: "Retour aux recettes de fabrication",
    boundary: "Cet outil calcule seulement les valeurs que vous entrez. Il n'ajoute pas de recettes, de taux de réussite, de prix ou de taux de chute. Les plans restent dans ce navigateur par défaut.",
    breadcrumbLabel: "Fil d'Ariane",
  },
  "es": {
    title: "Planificador de materiales personalizados AION2",
    description: "Crear materiales y objetivos de múltiples etapas para calcular los requisitos totales, la escasez de inventarios, el superávit y la terminación. Úsalo para eventos, actualizaciones o recetas sin lista.",
    kicker: "PLAN DE MATERIALES PERSONALIZADO",
    back: "Volver a las recetas de fabricación",
    boundary: "Esta herramienta calcula sólo los valores que introduce. No añade recetas, tasas de éxito, precios o tasas de caída. Los planes permanecen en este navegador por defecto.",
    breadcrumbLabel: "Migas de pan",
  },
  "ja": {
    title: "AION2 カスタム材料プランナー",
    description: "材料と複数段階の目標を作成し、総必要量、所持数の不足、余り、準備状況を計算します。イベント、強化、一覧にないレシピに利用できます。",
    kicker: "カスタム材料プラン",
    back: "製作レシピ一覧へ戻る",
    boundary: "入力した数値だけを計算します。レシピ、成功率、価格、ドロップ率を自動追加しません。プランは既定でこのブラウザ内だけに保存されます。",
    breadcrumbLabel: "パンくずリスト",
  },
  "pt-br": {
    title: "Planejador de materiais personalizados do AION2",
    description: "Crie materiais e metas em vários estágios para calcular os requisitos totais, escassez de estoque, excedente e conclusão. Use-o para eventos, atualizações ou receitas não listadas.",
    kicker: "PLANO DE MATERIAIS PERSONALIZADO",
    back: "Voltar às receitas de fabricação",
    boundary: "Esta ferramenta calcula apenas os valores informados por você. Ela não adiciona receitas, taxas de sucesso, preços nem chances de obtenção. Por padrão, os planos ficam somente neste navegador.",
    breadcrumbLabel: "Navegação estrutural",
  },
  "ru": {
    title: "AION2 — пользовательский планировщик материалов",
    description: "Создавайте материалы и многоэтапные цели, чтобы рассчитывать общую потребность, нехватку запасов, излишки и готовность. Подходит для событий, улучшений и рецептов, которых нет в каталоге.",
    kicker: "ПОЛЬЗОВАТЕЛЬСКИЙ ПЛАН МАТЕРИАЛОВ",
    back: "Вернуться к рецептам изготовления",
    boundary: "Инструмент рассчитывает только введенные вами значения. Он не добавляет рецепты, шансы успеха, цены или вероятность получения. По умолчанию планы хранятся только в этом браузере.",
    breadcrumbLabel: "Навигационная цепочка",
  },
  ko: {
    title: "AION2 사용자 정의 재료 계획기",
    description: "재료와 여러 단계를 직접 만들어 총 필요량, 보유량 부족분, 잔여량과 완료율을 계산합니다. 이벤트, 강화 또는 미수록 레시피에 사용하세요.",
    kicker: "CUSTOM MATERIAL PLAN",
    back: "제작 레시피 목록으로 돌아가기",
    boundary: "입력한 수량만 계산하며 레시피, 성공률, 가격 또는 드롭률을 자동으로 추가하지 않습니다. 계획은 기본적으로 현재 브라우저에만 저장됩니다.",
    breadcrumbLabel: "이동 경로",
  },
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
  const text = copy[locale];
  const path = "/tools/material-calculator/custom/";
  return {
    title: `${text.title} | AION2 KINA`,
    description: text.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: localizedHref(locale, path),
      languages: getLanguageAlternates(path),
    },
  };
}

export default async function CustomMaterialPlannerPage({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const text = copy[locale];
  const hub = toolHubCopy[locale];
  const path = "/tools/material-calculator/custom/";

  return (
    <main className={toolsStyles.main} id="main-content">
      <section className={`${toolsStyles.hero} ${toolsStyles.detailHero}`}>
        <div className={`shell ${toolsStyles.shell}`}>
          <nav className={toolsStyles.breadcrumbs} aria-label={text.breadcrumbLabel}>
            <ol>
              <li><a href={getSectionHref(locale, "home")}>{siteShellCopy[locale].navigation.home}</a></li>
              <li aria-hidden="true">/</li>
              <li><a href={getSectionHref(locale, "tools")}>{hub.breadcrumb}</a></li>
              <li aria-hidden="true">/</li>
              <li><a href={localizedHref(locale, "/tools/material-calculator/")}>{text.back}</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{text.title}</li>
            </ol>
          </nav>
          <p className={toolsStyles.kicker}>{text.kicker}</p>
          <h1 className={styles.title}>{text.title}</h1>
          <p className={styles.lead}>{text.description}</p>
          <p className={styles.boundary}>{text.boundary}</p>
        </div>
      </section>

      <section className={styles.planner}>
        <div className="shell"><MaterialCalculator locale={locale} /></div>
      </section>

      <nav aria-label={hub.detailLanguages} className={toolsStyles.languageLinks}>
        <div className="shell">
          <span>{hub.detailLanguages}</span>
          {siteLocales.map((targetLocale) => (
            <a
              aria-current={targetLocale === locale ? "page" : undefined}
              href={localizedHref(targetLocale, path)}
              hrefLang={siteLocaleConfig[targetLocale].hrefLang}
              key={targetLocale}
            >
              {siteLocaleConfig[targetLocale].label}
            </a>
          ))}
          <a className={toolsStyles.backLink} href={localizedHref(locale, "/tools/material-calculator/")}>{text.back}</a>
        </div>
      </nav>
    </main>
  );
}
