import type {
  ContentHeroImage,
  ContentPrimaryAction,
  ContentSourceLocalization,
  LocalizedContent,
} from "./content-registry";

export type OfficialFounderLocale = "de" | "es" | "fr" | "ja" | "pt-br";

export const officialFounderNoticeLocalizations = {
  de: {
    label: "AION 2 – Hinweis zu neuen Produkten: Gründerpaket",
    url: "https://aion2.plaync.com/de-de/board/notice/view?articleId=6a5fef452c2d9c52e6c79e70&redirect=false",
  },
  es: {
    label: "AION 2 – Nueva información del producto: Paquete de Fundadores",
    url: "https://aion2.plaync.com/es-es/board/notice/view?articleId=6a5feff1a7ca1a15cf46b6b5&redirect=false",
  },
  fr: {
    label: "AION 2 – Présentation de nouveaux produits : Pack de fondateur",
    url: "https://aion2.plaync.com/fr-fr/board/notice/view?articleId=6a5fefd0a7ca1a15cf46b6b3&redirect=false",
  },
  ja: {
    label: "AION 2 – 7月22日発売のファウンダーズパックのお知らせ",
    url: "https://aion2.plaync.com/ja-jp/board/notice/view?articleId=6a60bed03b36601c74031053&redirect=false",
  },
  "pt-br": {
    label: "AION 2 – Informações de Novos Produtos: Pacote do Fundador",
    url: "https://aion2.plaync.com/pt-br/board/notice/view?articleId=6a60bed08370eb695191ca4c&redirect=false",
  },
} as const satisfies Record<OfficialFounderLocale, ContentSourceLocalization>;

export const officialFounderActionHrefs = Object.fromEntries(
  Object.entries(officialFounderNoticeLocalizations).map(([locale, source]) => [
    locale,
    source.url,
  ]),
) as Record<OfficialFounderLocale, string>;

export const officialFounderHeroTranslations = {
  de: {
    alt: "Offizielles Artwork des AION 2 Deluxe-Gründerpakets",
    caption: "Offizielles Artwork von NC Corporation; der Guide vergleicht Standard, Deluxe und Ultimate.",
  },
  es: {
    alt: "Arte oficial del Paquete de Fundadores Deluxe de AION 2",
    caption: "Arte oficial de NC Corporation; la guía compara Estándar, Deluxe y Definitivo.",
  },
  fr: {
    alt: "Illustration officielle du Pack de fondateur deluxe d’AION 2",
    caption: "Illustration officielle de NC Corporation ; le guide compare les packs standard, deluxe et ultime.",
  },
  ja: {
    alt: "AION 2 デラックス ファウンダーズ パック公式画像",
    caption: "NC Corporation公式画像。本ガイドではスタンダード、デラックス、アルティメットを比較します。",
  },
  "pt-br": {
    alt: "Arte oficial do Pacote do Fundador Deluxe de AION 2",
    caption: "Arte oficial da NC Corporation; o guia compara os pacotes Padrão, Deluxe e Ultimate.",
  },
} as const satisfies Partial<ContentHeroImage["translations"]>;

export const officialFounderActionTranslations = {
  de: {
    eyebrow: "OFFIZIELLE QUELLE",
    title: "Die deutsche Gründerpaket-Ankündigung öffnen",
    description: "Prüfe Preise, Verkaufstermin, Inhalte und Hinweise direkt in der deutschen Fassung von PLAYNC.",
    label: "Deutsche PLAYNC-Ankündigung",
    note: "Öffnet die offizielle deutschsprachige AION-2-Seite in einem neuen Tab.",
    facts: [
      { label: "Pakete", value: "Standard, Deluxe, Ultimate" },
      { label: "Preis", value: "24,99 / 49,99 / 99,99 USD" },
      { label: "Verkaufsbeginn", value: "22. Juli 2026, 15:00 Uhr MEZ" },
    ],
  },
  es: {
    eyebrow: "FUENTE OFICIAL",
    title: "Abrir el aviso oficial en español",
    description: "Comprueba los precios, el periodo de venta, el contenido y las condiciones en la versión española de PLAYNC.",
    label: "Ver aviso oficial en español",
    note: "Abre la web oficial de AION 2 en español en una pestaña nueva.",
    facts: [
      { label: "Paquetes", value: "Estándar, Deluxe, Definitivo" },
      { label: "Precio", value: "USD 24,99 / 49,99 / 99,99" },
      { label: "Inicio de venta", value: "22 de julio de 2026, 6:00 PDT / 15:00 CEST" },
    ],
  },
  fr: {
    eyebrow: "SOURCE OFFICIELLE",
    title: "Ouvrir l’annonce officielle en français",
    description: "Vérifiez les prix, la période de vente, le contenu et les conditions dans la version française de PLAYNC.",
    label: "Voir l’annonce française",
    note: "Ouvre le site officiel d’AION 2 en français dans un nouvel onglet.",
    facts: [
      { label: "Packs", value: "Standard, Deluxe, Ultime" },
      { label: "Prix", value: "24,99 / 49,99 / 99,99 USD" },
      { label: "Début des ventes", value: "22 juillet 2026, 15 h 00 CEST" },
    ],
  },
  ja: {
    eyebrow: "公式情報",
    title: "日本語のファウンダーズパック公式案内を確認",
    description: "日本語版PLAYNCで価格、販売期間、内容、注意事項を直接確認できます。",
    label: "日本語の公式案内を見る",
    note: "AION 2公式サイトの日本語ページを新しいタブで開きます。",
    facts: [
      { label: "パック", value: "スタンダード／デラックス／アルティメット" },
      { label: "価格", value: "¥3,900／¥7,850／¥15,500" },
      { label: "販売開始", value: "2026年7月22日 22:00" },
    ],
  },
  "pt-br": {
    eyebrow: "FONTE OFICIAL",
    title: "Abrir o aviso oficial em português",
    description: "Confira preços, período de venda, conteúdo e condições na versão brasileira do PLAYNC.",
    label: "Ver aviso oficial em português",
    note: "Abre o site oficial de AION 2 em português do Brasil em uma nova aba.",
    facts: [
      { label: "Pacotes", value: "Padrão, Deluxe, Ultimate" },
      { label: "Preço", value: "USD 24,99 / 49,99 / 99,99" },
      { label: "Início da venda", value: "22 de julho de 2026, 10:00 BRT" },
    ],
  },
} as const satisfies Partial<ContentPrimaryAction["translations"]>;

function guideCopy(
  labels: Omit<LocalizedContent, "sections" | "keywords">,
  keywords: readonly string[],
  sections: LocalizedContent["sections"],
): LocalizedContent {
  return { ...labels, keywords, sections };
}

const de = guideCopy(
  {
    eyebrow: "GLOBALER KAUFRATGEBER",
    title: "AION 2 Gründerpaket: Preise, Inhalte und Editionen im Vergleich",
    description:
      "Vergleich der AION 2 Gründerpakete Standard, Deluxe und Ultimate mit offiziellen USD-Preisen, fünf Tagen Advanced Access, Belohnungen, PURPLE-Upgrades und Plattformregeln.",
    intro:
      "Kurzantwort: Das Standard-Paket kostet laut deutscher PLAYNC-Ankündigung 24,99 $, Deluxe 49,99 $ und Ultimate 99,99 $. Alle drei gewähren denselben fünftägigen Advanced Access ab dem 30. September 2026. Standard reicht, wenn du nur früher starten möchtest; Deluxe und Ultimate bezahlen zusätzliche kosmetische Sammlungen, nicht mehr Spieltage oder zusätzliche Werte.",
    byline: "PFG",
    backLabel: "Zurück zu den Guides",
    contentsLabel: "Auf dieser Seite",
    publishedLabel: "Veröffentlicht",
    updatedLabel: "Zuletzt geprüft",
    readingTime: "ca. 10 Min.",
    relatedLabel: "Passende Inhalte",
    sourceNote:
      "Am 25. Juli 2026 mit der deutschen PLAYNC-Produktankündigung sowie den globalen Hinweisen zu Early Access und Servern abgeglichen. Die deutsche Ankündigung nennt Preise ausdrücklich in US-Dollar; Euro-Preise werden hier nicht erfunden.",
  },
  [
    "AION 2 Gründerpaket",
    "AION 2 Gründerpaket Preis",
    "Standard Deluxe Ultimate Vergleich",
    "AION 2 Advanced Access",
  ],
  [
    {
      id: "quick-answer",
      title: "Fünf Tage Advanced Access beginnen am 30. September",
      paragraphs: [
        "NC bestätigt fünf Tage Advanced Access ab dem 30. September 2026. Start und Ende gelten für alle Käufer gleich. Wer später kauft, erhält nur die verbleibende Zeit; mehrere Pakete verlängern den Zeitraum nicht. Wartungen und Patches können die tatsächlich spielbare Zeit verkürzen.",
        "Die deutsche Produktankündigung verkauft die Pakete seit dem 22. Juli 2026 um 15:00 Uhr MEZ bis zum Ende des Early Access. Eine exakte Startuhrzeit für den 30. September und ein Preload-Termin wurden noch nicht veröffentlicht.",
      ],
    },
    {
      id: "platform-choice",
      title: "Zuerst Steam oder PURPLE auswählen",
      paragraphs: [
        "Ein auf Steam gekauftes Paket kann nur über Steam genutzt werden; ein PURPLE-Kauf nur über PURPLE. Beide Plattformen greifen dennoch auf dieselben Spielserver zu. Gesperrt sind Kaufberechtigung und Launcher, nicht die Möglichkeit, gemeinsam auf einem Server zu spielen.",
        "PURPLE bietet Upgrades für 25 $ von Standard auf Deluxe, 75 $ von Standard auf Ultimate und 50 $ von Deluxe auf Ultimate. Für Steam ist kein vergleichbarer Upgrade-Pfad angekündigt. Die offizielle deutsche Seite weist alle Preise in USD aus und warnt, dass andere Währungen nach Wechselkurs angepasst werden können.",
      ],
    },
    {
      id: "edition-differences",
      title: "Inhalte von Standard, Deluxe und Ultimate",
      paragraphs: [
        "Standard enthält 5 Tage Advanced Access, 1× Vorratskiste für die Daeva-Expedition (Gebunden) und den Titel „Atreias Vorhut“. Die Kiste enthält Rolle der Rückkehr, Rolle des Muts, Rolle des Sprints, Rolle der Gnade und Rolle der Stoßdämpfung ×10, Lebenstrank ×100, Lebenselixier ×50, Heiltrank ×30, Siegelstein ×10.000 und Geiststein der Wiederbelebung ×5.",
        "Deluxe ergänzt das vollständige Standard-Paket um Aszendierter Daeva (Aussehen: Set) mit sieben Teilen und 1× Waffenskin-Truhe: Ewige Sonne (Gebunden).",
        "Ultimate ergänzt Deluxe um 1× Daeva-Stylingtruhe, Arie im Mondlicht als sechsteiliges Aussehen-Set ohne Schulterteile, den Begleiter „Schwarzer Drache“ und Brennende Sonnenflügel. Die Stylingtruhe enthält einen Anpassungsschein und einen siebentägigen Aussehensänderungsschein.",
        "Die offizielle Tabelle kennzeichnet Handel, Löschen und Lagerung für die aufgeführten Belohnungen als nicht verfügbar. Titel, Skins, Begleiter und Flügel geben laut NC keine zusätzlichen Werte.",
      ],
      table: {
        caption: "Offizielle USD-Preise und Unterschiede der AION 2 Gründerpakete",
        headers: ["Paket", "Offizieller Preis", "Advanced Access", "Zusätzliche Inhalte"],
        rows: [
          { header: "Standard", cells: ["24,99 $ (USD)", "5 Tage", "Vorratskiste und Titel „Atreias Vorhut“"] },
          { header: "Deluxe", cells: ["49,99 $ (USD)", "5 Tage", "Alles aus Standard, 7-Teile-Set Aszendierter Daeva, Ewige Sonne"] },
          { header: "Ultimate", cells: ["99,99 $ (USD)", "5 Tage", "Alles aus Deluxe, Styling, Arie im Mondlicht, Schwarzer Drache, Flügel"] },
        ],
      },
    },
    {
      id: "choose-by-use-case",
      title: "Nach Nutzung wählen, nicht nach vermuteter Stärke",
      paragraphs: ["Alle Stufen gewähren denselben Frühstart. Bezahle den Aufpreis nur, wenn du die ausdrücklich genannten Aussehen- und Sammlungsobjekte verwenden möchtest."],
      steps: [
        { title: "Standard", description: "Für den Frühstart, die Vorratskiste und den Titel ohne zusätzliche Skinsammlungen." },
        { title: "Deluxe", description: "Wenn du das siebenteilige Daeva-Set und den Waffenskin Ewige Sonne wirklich möchtest." },
        { title: "Ultimate", description: "Wenn Stylingobjekte, Arie im Mondlicht, Schwarzer Drache und Flügel für dich den Aufpreis rechtfertigen." },
        { title: "Auf Release warten", description: "Wenn fünf Tage Vorsprung unwichtig sind; das Basisspiel ist zum regulären Start kostenlos." },
      ],
    },
    {
      id: "server-plan",
      title: "Early-Access- und Launch-Server einplanen",
      paragraphs: [
        "Zuerst öffnen Early-Access-Server für Paketbesitzer, zum regulären Start folgt eine zweite Welle Launch-Server. Freunde sollten Region, Serverwelle und Fraktion vorher abstimmen. Dungeon-Matching verbindet während des Frühstarts Early-Access-Server derselben Region und wird später erweitert.",
      ],
    },
    {
      id: "market-and-transfer",
      title: "Markt und Servertransfer haben eigene Grenzen",
      paragraphs: [
        "Der lokale Servermarkt startet am ersten Early-Access-Tag; nach dem aktuellen globalen Geschäftsmodell ist für seine Nutzung eine aktive Mitgliedschaft nötig. Ein Cross-Server-Markt und der angekündigte Servertransfer kommen später, Termine und Bedingungen sind noch offen.",
      ],
    },
    {
      id: "pre-purchase-checks",
      title: "Vor dem Kauf prüfen",
      paragraphs: [
        "Prüfe im angemeldeten Steam- oder PURPLE-Shop Verfügbarkeit, angezeigte Währung, Steuer, Edition und Erstattungsbedingungen. Die deutsche PLAYNC-Seite verwendet USD und stellt keinen verbindlichen Euro-Endpreis dar.",
        "Vor dem Live-Start kann eine Erstattung beantragt werden. Danach nennt die globale Ankündigung als Grundrahmen 14 Tage, weniger als zwei Stunden Spielzeit und noch nicht beanspruchte Paketgegenstände; die Entscheidung richtet sich weiterhin nach den Regeln der jeweiligen Zahlungsplattform.",
      ],
      bullets: [
        "Der 30. September ist ein bestätigtes Datum, aber noch keine bestätigte Uhrzeit.",
        "Steam- und PURPLE-Berechtigungen können nicht plattformübergreifend genutzt werden.",
        "Höhere Editionen verlängern die fünf Tage nicht.",
        "Die kosmetischen Belohnungen gewähren laut NC keine zusätzlichen Werte.",
      ],
    },
    {
      id: "faq",
      title: "Häufige Fragen zum AION 2 Gründerpaket",
      paragraphs: [],
      faq: [
        { question: "Wie viel kostet das AION 2 Gründerpaket?", answer: "Die deutsche offizielle Ankündigung nennt 24,99 $ für Standard, 49,99 $ für Deluxe und 99,99 $ für Ultimate, ausdrücklich in USD. Der tatsächliche Zahlbetrag kann je nach Währung, Steuer und Shop abweichen." },
        { question: "Welche Edition reicht für Advanced Access?", answer: "Standard reicht vollständig aus. Alle drei Editionen bieten dieselben fünf Tage ab dem 30. September 2026." },
        { question: "Kann ich später upgraden?", answer: "PURPLE listet drei kostenpflichtige Upgrade-Wege. Für Steam wurde kein entsprechender Weg angekündigt." },
        { question: "Geben Deluxe oder Ultimate mehr Werte?", answer: "NC erklärt, dass Titel, Aussehen, Waffenskin, Begleiter und Flügel keine zusätzlichen Werte verleihen." },
        { question: "Sind die Belohnungen des Gründerpakets kontoweit verfügbar?", answer: "Die offizielle Tabelle nennt Einschränkungen für Handel, Löschen und Lagern, bestätigt aber nicht vollständig, dass jede ausgelieferte Belohnung kontoweit statt charaktergebunden ist. Prüfe vor dem Einlösen die aktuellen Bedingungen." },
        { question: "Ist das AION 2 Gründerpaket Pay-to-win?", answer: "Laut NC verleihen Titel, Aussehen, Waffenskin, Begleiter und Flügel keine zusätzlichen Werte. Die Versorgungstruhe des Standard-Pakets bietet zu Beginn praktische Verbrauchsgegenstände. Das macht höhere Editionen nicht zu einem Kampfkraft-Upgrade und beantwortet nicht jede persönliche Definition von Pay-to-win." },
      ],
    },
  ],
);

const fr = guideCopy(
  {
    eyebrow: "GUIDE D’ACHAT GLOBAL",
    title: "AION 2 Pack de fondateur : prix, contenu et éditions comparés",
    description:
      "Comparatif des Packs de fondateur standard, deluxe et ultime d’AION 2 : prix officiels en USD, accès anticipé de cinq jours, récompenses, mises à niveau PURPLE et règles de plateforme.",
    intro:
      "Réponse directe : la page française de PLAYNC affiche 24,99 $ pour le pack standard, 49,99 $ pour le deluxe et 99,99 $ pour l’ultime. Les trois donnent exactement le même accès anticipé de cinq jours à partir du 30 septembre 2026. Le standard suffit pour jouer plus tôt ; les niveaux supérieurs ajoutent des apparences et objets de collection, pas des jours ni des statistiques.",
    byline: "PFG",
    backLabel: "Retour aux guides",
    contentsLabel: "Dans ce guide",
    publishedLabel: "Publication",
    updatedLabel: "Dernière vérification",
    readingTime: "environ 10 min",
    relatedLabel: "À lire aussi",
    sourceNote:
      "Vérifié le 25 juillet 2026 avec l’annonce française de PLAYNC et les mises à jour globales sur l’accès anticipé et les serveurs. L’annonce française indique des prix en dollars américains ; aucun prix en euros n’est inventé ici.",
  },
  [
    "AION 2 Pack de fondateur",
    "prix Pack de fondateur AION 2",
    "standard deluxe ultime comparatif",
    "accès anticipé AION 2",
  ],
  [
    {
      id: "quick-answer",
      title: "L’accès anticipé commence le 30 septembre pour cinq jours",
      paragraphs: [
        "NC confirme cinq jours d’accès anticipé à partir du 30 septembre 2026. Les dates de début et de fin sont identiques pour tous ; un achat tardif ne donne que le temps restant et plusieurs packs ne prolongent pas la période. Des maintenances peuvent réduire le temps de jeu réel.",
        "La vente française a commencé le 22 juillet 2026 à 15 h 00 CEST et continue jusqu’à la fin de l’accès anticipé. L’heure exacte d’ouverture des serveurs le 30 septembre et le préchargement ne sont pas encore annoncés.",
      ],
    },
    {
      id: "platform-choice",
      title: "Choisir Steam ou PURPLE avant l’édition",
      paragraphs: [
        "Un pack Steam ne fonctionne que via Steam et un achat PURPLE uniquement via PURPLE. Les joueurs utilisent néanmoins les mêmes serveurs : la restriction concerne le droit d’achat et le lanceur, pas la possibilité de jouer ensemble.",
        "PURPLE propose les mises à niveau standard→deluxe pour 25 $, standard→ultime pour 75 $ et deluxe→ultime pour 50 $. Aucun parcours équivalent n’est annoncé sur Steam. La page française précise que ces montants sont en USD et que les autres devises peuvent varier avec le taux de change.",
      ],
    },
    {
      id: "edition-differences",
      title: "Contenu des packs standard, deluxe et ultime",
      paragraphs: [
        "Le standard comprend cinq jours d’accès anticipé, 1 Coffre de ravitaillement d’expédition de Daeva (gravé) et le Titre : Daeva avant-gardiste. Le coffre contient Parchemin de retour, Parchemin de courage, Parchemin de sprint, Parchemin de protection et Parchemin d’absorption de choc ×10, Potion de PV ×100, Élixir de PV ×50, Potion de soin ×30, Éclat de pouvoir ×10 000 et Pierre d’esprit de résurrection ×5.",
        "Le deluxe ajoute tout le standard, Daeva d’éveil (Apparence : Set) en sept pièces et 1 Coffre d’apparence d’arme : Soleil de l’éternité (gravé).",
        "L’ultime ajoute tout le deluxe, 1 Coffre de stylisation de Daeva, Aria du clair de lune en six pièces sans épaulières, le Familier : Dragon noir et les Ailes du soleil ardent. Le coffre de stylisation contient un ticket de personnalisation et un ticket de changement d’apparence de sept jours.",
        "Le tableau officiel interdit l’échange, la suppression et le stockage des récompenses listées. NC précise que le titre, les apparences, le familier et les ailes n’ajoutent aucune statistique.",
      ],
      table: {
        caption: "Prix officiels en USD et différences des Packs de fondateur d’AION 2",
        headers: ["Pack", "Prix officiel", "Accès anticipé", "Ajouts principaux"],
        rows: [
          { header: "Standard", cells: ["24,99 $ (USD)", "5 jours", "Coffre de ravitaillement et titre Daeva avant-gardiste"] },
          { header: "Deluxe", cells: ["49,99 $ (USD)", "5 jours", "Tout le standard, set Daeva d’éveil 7 pièces, Soleil de l’éternité"] },
          { header: "Ultime", cells: ["99,99 $ (USD)", "5 jours", "Tout le deluxe, stylisation, Aria du clair de lune, Dragon noir et ailes"] },
        ],
      },
    },
    {
      id: "choose-by-use-case",
      title: "Choisir selon l’usage, pas une puissance supposée",
      paragraphs: ["Les trois packs donnent le même départ anticipé. Ne payez plus que si les apparences et objets de collection annoncés vous intéressent réellement."],
      steps: [
        { title: "Standard", description: "Pour commencer le 30 septembre avec le coffre et le titre, sans collection d’apparences supplémentaire." },
        { title: "Deluxe", description: "Si le set Daeva d’éveil et l’apparence d’arme Soleil de l’éternité justifient l’écart de prix." },
        { title: "Ultime", description: "Si vous utiliserez Aria du clair de lune, Dragon noir, les ailes et les tickets de stylisation." },
        { title: "Attendre la sortie", description: "Si cinq jours d’avance ne comptent pas ; le jeu de base sera gratuit au lancement normal." },
      ],
    },
    {
      id: "server-plan",
      title: "Prévoir les serveurs d’accès anticipé et de lancement",
      paragraphs: [
        "Les serveurs d’accès anticipé ouvrent d’abord aux détenteurs d’un pack, puis une seconde vague de serveurs de lancement arrive à la sortie. Coordonnez région, vague de serveur et faction avec vos amis. Le matchmaking de donjons relie les serveurs d’accès anticipé d’une même région, puis s’élargit au lancement.",
      ],
    },
    {
      id: "market-and-transfer",
      title: "Marché et transfert de serveur restent séparés",
      paragraphs: [
        "Le marché local ouvre le premier jour, avec une adhésion active requise selon le modèle économique global actuel. Le marché interserveur et le service de transfert arriveront plus tard ; leurs dates et conditions ne sont pas encore publiées.",
      ],
    },
    {
      id: "pre-purchase-checks",
      title: "Vérifications avant de payer",
      paragraphs: [
        "Vérifiez disponibilité, devise affichée, taxes, édition et remboursement dans votre boutique Steam ou PURPLE connectée. La page française utilise l’USD et ne garantit pas un montant final en euros.",
        "L’annonce globale prévoit une demande de remboursement avant le lancement. Après lancement, elle cite comme cadre 14 jours, moins de deux heures jouées et aucun objet du pack réclamé ; les règles et la décision de la plateforme de paiement restent déterminantes.",
      ],
      bullets: [
        "Le 30 septembre est une date confirmée, pas encore une heure d’ouverture.",
        "Les droits Steam et PURPLE ne sont pas transférables entre plateformes.",
        "Les éditions supérieures n’allongent pas les cinq jours.",
        "Les récompenses cosmétiques n’accordent pas de statistiques supplémentaires selon NC.",
      ],
    },
    {
      id: "faq",
      title: "FAQ du Pack de fondateur AION 2",
      paragraphs: [],
      faq: [
        { question: "Quel est le prix du Pack de fondateur AION 2 ?", answer: "La page française officielle affiche 24,99 $ pour le standard, 49,99 $ pour le deluxe et 99,99 $ pour l’ultime, en USD. Devise, taxes et prix final peuvent varier." },
        { question: "Quel pack suffit pour l’accès anticipé ?", answer: "Le standard suffit : les trois éditions donnent les mêmes cinq jours à partir du 30 septembre 2026." },
        { question: "Peut-on mettre le pack à niveau ?", answer: "PURPLE liste trois mises à niveau payantes ; aucun équivalent Steam n’est annoncé." },
        { question: "Les packs deluxe ou ultime donnent-ils plus de statistiques ?", answer: "Non pour les éléments cosmétiques listés : NC précise que titre, apparences, familier et ailes n’ajoutent pas de statistiques." },
        { question: "Les récompenses du Pack de fondateur sont-elles liées au compte ?", answer: "Le tableau officiel précise des restrictions d’échange, de suppression et de stockage, mais ne confirme pas clairement que chaque récompense remise est liée au compte plutôt qu’au personnage. Consultez les conditions d’attribution les plus récentes avant de la récupérer." },
        { question: "Le Pack de fondateur AION 2 est-il pay-to-win ?", answer: "Selon NC, le titre, les apparences, le familier et les ailes n’ajoutent aucune statistique. Le coffre de provisions du pack standard apporte surtout des consommables pratiques au début. Ces éléments ne transforment pas les éditions supérieures en amélioration de puissance de combat et ne tranchent pas toutes les définitions du pay-to-win." },
      ],
    },
  ],
);

const es = guideCopy(
  {
    eyebrow: "GUÍA DE COMPRA GLOBAL",
    title: "AION 2 Paquete de Fundadores: precios, contenido y ediciones",
    description:
      "Comparativa de los paquetes Estándar, Deluxe y Definitivo de AION 2 con precios oficiales en USD, cinco días de acceso anticipado, recompensas, mejoras de PURPLE y reglas de plataforma.",
    intro:
      "Respuesta rápida: el aviso español de PLAYNC fija el paquete Estándar en USD 24,99, Deluxe en USD 49,99 y Definitivo en USD 99,99. Los tres incluyen el mismo acceso anticipado de cinco días desde el 30 de septiembre de 2026. Estándar basta para entrar antes; Deluxe y Definitivo añaden apariencias y objetos de colección, no más días ni estadísticas.",
    byline: "PFG",
    backLabel: "Volver a las guías",
    contentsLabel: "En esta guía",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificación",
    readingTime: "unos 10 min",
    relatedLabel: "Contenido relacionado",
    sourceNote:
      "Verificado el 25 de julio de 2026 con el aviso español de PLAYNC y las actualizaciones globales sobre acceso anticipado y servidores. La página española muestra precios en USD; no se sustituyen por importes inventados en euros.",
  },
  [
    "AION 2 Paquete de Fundadores",
    "precio Paquete de Fundadores AION 2",
    "Estándar Deluxe Definitivo",
    "acceso anticipado AION 2",
  ],
  [
    {
      id: "quick-answer",
      title: "El acceso anticipado empieza el 30 de septiembre y dura cinco días",
      paragraphs: [
        "NC confirma cinco días de acceso anticipado desde el 30 de septiembre de 2026. Las fechas son iguales para todos; comprar una vez iniciado solo concede el tiempo restante y varios paquetes no amplían el periodo. Mantenimientos y parches pueden reducir las horas efectivas.",
        "La venta española comenzó el 22 de julio de 2026 a las 6:00 PDT / 15:00 CEST y continúa hasta terminar el acceso anticipado. Aún no hay hora exacta de apertura el 30 de septiembre ni fecha de precarga.",
      ],
    },
    {
      id: "platform-choice",
      title: "Elige Steam o PURPLE antes de elegir edición",
      paragraphs: [
        "Un paquete comprado en Steam solo se usa mediante Steam y uno de PURPLE solo mediante PURPLE. Ambos conectan con los mismos servidores; la limitación afecta a la licencia y al lanzador, no a jugar juntos.",
        "PURPLE ofrece mejoras Estándar→Deluxe por USD 25, Estándar→Definitivo por USD 75 y Deluxe→Definitivo por USD 50. Steam no ha anunciado un sistema equivalente. PLAYNC aclara que todos estos precios están expresados en USD y otras monedas pueden variar por el tipo de cambio.",
      ],
    },
    {
      id: "edition-differences",
      title: "Contenido de Estándar, Deluxe y Definitivo",
      paragraphs: [
        "Estándar incluye 5 días de Acceso anticipado, 1 Cofre de suministros de la campaña de Daeva (vinculado) y el Título: Vanguardia de Atreia. El cofre contiene Pergamino de regreso, valentía, esprint, favor y mitigación de impacto ×10 cada uno; Poción de vida ×100, Elixir de vida ×50, Poción de curación ×30, Fragmento de poder ×10.000 y Piedra espiritual de resurrección ×5.",
        "Deluxe añade todo lo anterior, Daeva del ascenso (Apariencia: set) en siete piezas y 1 Cofre de Apariencia de Arma: Sol eterno (vinculado).",
        "Definitivo añade todo Deluxe, 1 Cofre de Estilo de Daeva, Aria Lunar en seis piezas sin hombreras, Mascota: Dragón negro y Alas de sol ardiente. El cofre de estilo contiene un Tique de decoración y un Tique de cambio de apariencia de siete días.",
        "La tabla oficial marca como no disponibles el intercambio, la eliminación y el almacenamiento. NC dice que el título, las apariencias, la mascota y las alas no aportan estadísticas adicionales.",
      ],
      table: {
        caption: "Precios oficiales en USD y diferencias de los Paquetes de Fundadores de AION 2",
        headers: ["Paquete", "Precio oficial", "Acceso anticipado", "Añadidos principales"],
        rows: [
          { header: "Estándar", cells: ["USD 24,99", "5 días", "Cofre de suministros y título Vanguardia de Atreia"] },
          { header: "Deluxe", cells: ["USD 49,99", "5 días", "Todo Estándar, conjunto Daeva del ascenso de 7 piezas y Sol eterno"] },
          { header: "Definitivo", cells: ["USD 99,99", "5 días", "Todo Deluxe, estilo, Aria Lunar, Dragón negro y alas"] },
        ],
      },
    },
    {
      id: "choose-by-use-case",
      title: "Elige por uso, no por una potencia supuesta",
      paragraphs: ["Las tres ediciones adelantan lo mismo. Paga más solo si vas a usar las apariencias y objetos de colección que la página oficial enumera."],
      steps: [
        { title: "Estándar", description: "Para entrar el 30 de septiembre con suministros y título sin más colecciones de apariencia." },
        { title: "Deluxe", description: "Si quieres el conjunto Daeva del ascenso y el aspecto de arma Sol eterno." },
        { title: "Definitivo", description: "Si usarás Aria Lunar, Dragón negro, las alas y los tiques de estilo." },
        { title: "Esperar al lanzamiento", description: "Si cinco días no son importantes; el juego base será gratuito en el lanzamiento general." },
      ],
    },
    {
      id: "server-plan",
      title: "Planifica servidores de acceso anticipado y lanzamiento",
      paragraphs: [
        "Primero abren servidores de acceso anticipado para compradores y en el lanzamiento llega una segunda tanda. Coordina región, grupo de servidores y facción con tus amigos. El emparejamiento de mazmorras conecta servidores anticipados de la misma región y se amplía después.",
      ],
    },
    {
      id: "market-and-transfer",
      title: "Mercado y transferencia tienen límites separados",
      paragraphs: [
        "El mercado local abre el primer día y, según el modelo global actual, requiere una Membresía activa. El mercado entre servidores y el servicio de transferencia llegarán más adelante; todavía no tienen fecha ni condiciones finales.",
      ],
    },
    {
      id: "pre-purchase-checks",
      title: "Comprobaciones antes de pagar",
      paragraphs: [
        "Revisa disponibilidad, moneda, impuestos, edición y reembolso en tu tienda Steam o PURPLE con sesión iniciada. El aviso español usa USD y no promete un precio final en euros.",
        "El aviso global permite solicitar reembolso antes del lanzamiento. Después cita como marco 14 días, menos de dos horas jugadas y no haber reclamado los objetos; siguen mandando las reglas y la revisión de cada plataforma.",
      ],
      bullets: [
        "El 30 de septiembre es una fecha confirmada, no una hora exacta de apertura.",
        "Las licencias de Steam y PURPLE no se transfieren entre plataformas.",
        "Las ediciones superiores no amplían los cinco días.",
        "Los cosméticos enumerados no conceden estadísticas adicionales según NC.",
      ],
    },
    {
      id: "faq",
      title: "Preguntas frecuentes del Paquete de Fundadores de AION 2",
      paragraphs: [],
      faq: [
        { question: "¿Cuánto cuesta el Paquete de Fundadores de AION 2?", answer: "El aviso oficial español muestra Estándar USD 24,99, Deluxe USD 49,99 y Definitivo USD 99,99. Impuestos, conversión y cobro final pueden variar." },
        { question: "¿Qué edición basta para el acceso anticipado?", answer: "Estándar basta: las tres conceden los mismos cinco días desde el 30 de septiembre de 2026." },
        { question: "¿Se puede mejorar el paquete?", answer: "PURPLE lista tres mejoras de pago; Steam no ha anunciado una vía equivalente." },
        { question: "¿Deluxe o Definitivo dan más estadísticas?", answer: "NC indica que el título, las apariencias, la mascota y las alas no añaden estadísticas." },
        { question: "¿Las recompensas del Paquete de Fundadores se comparten en toda la cuenta?", answer: "La tabla oficial indica restricciones de intercambio, eliminación y almacenamiento, pero no confirma por completo que cada recompensa entregada se comparta en toda la cuenta en vez de quedar ligada al personaje. Revisa las condiciones de reclamación más recientes." },
        { question: "¿El Paquete de Fundadores de AION 2 es pay-to-win?", answer: "NC afirma que el título, las apariencias, la mascota y las alas no añaden estadísticas. El cofre de suministros del paquete Estándar ofrece consumibles útiles al principio. Eso no convierte las ediciones superiores en una mejora de poder de combate ni resuelve todas las definiciones personales de pay-to-win." },
      ],
    },
  ],
);

const ptBr = guideCopy(
  {
    eyebrow: "GUIA DE COMPRA GLOBAL",
    title: "AION 2 Pacote do Fundador: preços, conteúdo e edições",
    description:
      "Comparativo dos Pacotes do Fundador Padrão, Deluxe e Ultimate de AION 2 com preços oficiais em USD, cinco dias de Acesso Antecipado, recompensas, melhorias no PURPLE e regras de plataforma.",
    intro:
      "Resposta direta: o aviso brasileiro do PLAYNC lista o pacote Padrão por USD 24,99, Deluxe por USD 49,99 e Ultimate por USD 99,99. Os três entregam o mesmo Acesso Antecipado de cinco dias a partir de 30 de setembro de 2026. O Padrão basta para entrar antes; Deluxe e Ultimate adicionam visuais e itens de coleção, não mais dias ou atributos.",
    byline: "PFG",
    backLabel: "Voltar aos guias",
    contentsLabel: "Neste guia",
    publishedLabel: "Publicado",
    updatedLabel: "Última verificação",
    readingTime: "cerca de 10 min",
    relatedLabel: "Conteúdo relacionado",
    sourceNote:
      "Verificado em 25 de julho de 2026 com o aviso em português do PLAYNC e as atualizações globais sobre Acesso Antecipado e servidores. A publicação brasileira informa preços em USD; não inventamos valores em reais.",
  },
  [
    "AION 2 Pacote do Fundador",
    "preço Pacote do Fundador AION 2",
    "Padrão Deluxe Ultimate",
    "Acesso Antecipado AION 2",
  ],
  [
    {
      id: "quick-answer",
      title: "O Acesso Antecipado começa em 30 de setembro por cinco dias",
      paragraphs: [
        "A NC confirma cinco dias de Acesso Antecipado a partir de 30 de setembro de 2026. As datas são iguais para todos; comprar após o início libera apenas o período restante e vários pacotes não estendem o prazo. Manutenções e atualizações podem reduzir o tempo efetivo.",
        "A venda brasileira começou em 22 de julho de 2026, às 10:00 BRT, e segue até o fim do Acesso Antecipado. A hora exata de abertura em 30 de setembro e a data de pré-download ainda não foram anunciadas.",
      ],
    },
    {
      id: "platform-choice",
      title: "Escolha Steam ou PURPLE antes da edição",
      paragraphs: [
        "Um pacote comprado na Steam só funciona pela Steam; no PURPLE, somente pelo PURPLE. As plataformas usam os mesmos servidores, então a trava é da licença e do inicializador, não da possibilidade de jogar junto.",
        "O PURPLE oferece melhorias Padrão→Deluxe por USD 25, Padrão→Ultimate por USD 75 e Deluxe→Ultimate por USD 50. A Steam não anunciou caminho equivalente. O aviso brasileiro diz explicitamente que os preços são em USD e outras moedas podem variar com o câmbio.",
      ],
    },
    {
      id: "edition-differences",
      title: "Conteúdo dos pacotes Padrão, Deluxe e Ultimate",
      paragraphs: [
        "O Padrão inclui Acesso Antecipado de 5 Dias, 1 Baú de Suprimentos da Campanha de Daeva (Vinculado) e o Título: Vanguarda de Atreia. O baú traz Pergaminho de Retorno, Coragem, Disparada, Bendição e Absorção ×10 cada; Poção de Vida ×100, Elixir de Vida ×50, Poção de Cura ×30, Fragmento de Poder ×10.000 e Pedra Espiritual da Ressurreição ×5.",
        "O Deluxe acrescenta tudo do Padrão, Daeva da Ascensão (Visual: Conjunto) com sete peças e 1 Baú de Visual de Arma: Sol Eterno (Vinculado).",
        "O Ultimate acrescenta tudo do Deluxe, 1 Baú de Estilização de Daeva, Ária do Luar com seis peças sem ombreiras, Mascote: Dragão Negro e Asas do Sol Escaldante. O baú contém Bilhete de Customização e Bilhete de Troca de Visual de sete dias.",
        "A tabela oficial marca troca, exclusão e armazenamento como indisponíveis. A NC afirma que título, visuais, mascote e asas não concedem atributos adicionais.",
      ],
      table: {
        caption: "Preços oficiais em USD e diferenças dos Pacotes do Fundador de AION 2",
        headers: ["Pacote", "Preço oficial", "Acesso Antecipado", "Principais adicionais"],
        rows: [
          { header: "Padrão", cells: ["USD 24,99", "5 dias", "Baú de suprimentos e título Vanguarda de Atreia"] },
          { header: "Deluxe", cells: ["USD 49,99", "5 dias", "Tudo do Padrão, conjunto Daeva da Ascensão de 7 peças e Sol Eterno"] },
          { header: "Ultimate", cells: ["USD 99,99", "5 dias", "Tudo do Deluxe, estilização, Ária do Luar, Dragão Negro e asas"] },
        ],
      },
    },
    {
      id: "choose-by-use-case",
      title: "Escolha pelo uso, não por poder presumido",
      paragraphs: ["Todas as edições antecipam o jogo pelo mesmo período. Pague mais apenas se realmente quiser os visuais e colecionáveis divulgados."],
      steps: [
        { title: "Padrão", description: "Para entrar em 30 de setembro com suprimentos e título, sem coleções visuais extras." },
        { title: "Deluxe", description: "Se o conjunto Daeva da Ascensão e o visual Sol Eterno justificam a diferença." },
        { title: "Ultimate", description: "Se você usará Ária do Luar, Dragão Negro, asas e bilhetes de estilização." },
        { title: "Esperar o lançamento", description: "Se cinco dias não importam; o jogo-base será gratuito no lançamento normal." },
      ],
    },
    {
      id: "server-plan",
      title: "Planeje servidores de Acesso Antecipado e lançamento",
      paragraphs: [
        "Servidores de Acesso Antecipado abrem primeiro para compradores; outra leva chega no lançamento. Combine região, grupo de servidor e facção com amigos. O pareamento de masmorras conecta servidores antecipados da mesma região e depois se amplia.",
      ],
    },
    {
      id: "market-and-transfer",
      title: "Mercado e transferência têm limites próprios",
      paragraphs: [
        "O Mercado do Servidor local abre no primeiro dia e, conforme o modelo global atual, exige Membership ativa. Mercado entre servidores e transferência chegam depois; datas e regras finais ainda não foram publicadas.",
      ],
    },
    {
      id: "pre-purchase-checks",
      title: "O que conferir antes de pagar",
      paragraphs: [
        "Confira disponibilidade, moeda, impostos, edição e reembolso na loja Steam ou PURPLE com login. A publicação brasileira usa USD e não garante um preço final em reais.",
        "O aviso global permite pedir reembolso antes do lançamento. Depois, cita como base 14 dias, menos de duas horas jogadas e nenhum item resgatado; continuam valendo as políticas e a análise da plataforma de pagamento.",
      ],
      bullets: [
        "30 de setembro é uma data confirmada, não uma hora exata de abertura.",
        "Licenças Steam e PURPLE não podem ser usadas entre plataformas.",
        "Edições superiores não ampliam os cinco dias.",
        "Os cosméticos listados não concedem atributos adicionais, segundo a NC.",
      ],
    },
    {
      id: "faq",
      title: "Perguntas frequentes sobre o Pacote do Fundador de AION 2",
      paragraphs: [],
      faq: [
        { question: "Quanto custa o Pacote do Fundador de AION 2?", answer: "O aviso oficial em português mostra Padrão USD 24,99, Deluxe USD 49,99 e Ultimate USD 99,99. Câmbio, impostos e cobrança final podem variar." },
        { question: "Qual pacote basta para o Acesso Antecipado?", answer: "O Padrão basta: os três concedem os mesmos cinco dias a partir de 30 de setembro de 2026." },
        { question: "É possível melhorar o pacote?", answer: "O PURPLE lista três melhorias pagas; a Steam não anunciou opção equivalente." },
        { question: "Deluxe ou Ultimate dão mais atributos?", answer: "A NC informa que título, visuais, mascote e asas não adicionam atributos." },
        { question: "As recompensas do Pacote do Fundador valem para toda a conta?", answer: "A tabela oficial informa restrições de troca, exclusão e armazenamento, mas não confirma por completo que toda recompensa entregue vale para a conta em vez de ficar vinculada ao personagem. Confira os termos de resgate mais recentes." },
        { question: "O Pacote do Fundador de AION 2 é pay-to-win?", answer: "Segundo a NC, título, visuais, mascote e asas não adicionam atributos. O baú de suprimentos do pacote Padrão oferece conveniência inicial com consumíveis. Isso não transforma as edições superiores em melhoria de poder de combate nem encerra todas as definições pessoais de pay-to-win." },
      ],
    },
  ],
);

const ja = guideCopy(
  {
    eyebrow: "グローバル版購入ガイド",
    title: "AION 2 ファウンダーズパック：価格・内容・3種類を比較",
    description:
      "AION 2のスタンダード、デラックス、アルティメットを、日本公式価格、5日間アーリーアクセス、特典、PURPLEアップグレード、プラットフォーム制限で比較します。",
    intro:
      "結論：日本語公式案内ではスタンダードが¥3,900、デラックスが¥7,850、アルティメットが¥15,500です。3種類とも2026年9月30日から同じ5日間アーリーアクセス権が付きます。早く始めることだけが目的ならスタンダードで十分です。上位版の差額は外形・ペット・翼などのコレクション用で、日数や追加能力値は増えません。",
    byline: "PFG",
    backLabel: "攻略一覧へ戻る",
    contentsLabel: "このページの内容",
    publishedLabel: "公開日",
    updatedLabel: "最終確認",
    readingTime: "約10分",
    relatedLabel: "関連コンテンツ",
    sourceNote:
      "2026年7月25日にPLAYNC日本語版の商品案内と、グローバル版のアーリーアクセス・サーバー説明を確認しました。価格、商品名、販売期間は日本語版公式表記を優先し、英語版だけにある発売後の詳細な返金条件は日本向け条件として転載していません。",
  },
  [
    "AION 2 ファウンダーズパック",
    "AION2 ファウンダーズパック 価格",
    "スタンダード デラックス アルティメット 比較",
    "AION2 アーリーアクセス",
  ],
  [
    {
      id: "quick-answer",
      title: "5日間アーリーアクセスは9月30日開始",
      paragraphs: [
        "NCは2026年9月30日から5日間のアーリーアクセスを案内しています。開始日と終了日は全購入者で共通です。期間途中に購入した場合は残り時間のみ利用でき、複数購入しても延長されません。メンテナンスやパッチで実プレイ時間が短くなる場合があります。",
        "日本語案内の販売期間は2026年7月22日22:00からで、終了日は別途案内とされています。9月30日の正確なサーバー開放時刻と事前ダウンロード日はまだ発表されていません。",
      ],
    },
    {
      id: "platform-choice",
      title: "先にSteamかPURPLEを選ぶ",
      paragraphs: [
        "Steamで購入した権利はSteam、PURPLEで購入した権利はPURPLEでのみ利用できます。ただし接続先のサーバーは共通なので、別プラットフォームの友人とも同じサーバーで遊べます。移せないのは購入権利と起動方法です。",
        "PURPLEではスタンダード→デラックスが¥3,950、スタンダード→アルティメットが¥11,600、デラックス→アルティメットが¥7,650です。Steamには同等のアップグレード方法が発表されていないため、購入前に種類を決める必要があります。",
      ],
    },
    {
      id: "edition-differences",
      title: "スタンダード・デラックス・アルティメットの内容",
      paragraphs: [
        "スタンダードは5日間アーリーアクセス権、ディーヴァ冒険補給箱(刻印)×1、タイトル：天空を開いたディーヴァ×1です。補給箱には帰還・勇気・疾走・加護・衝撃緩和スクロール各10、生命のポーション100、生命の秘薬50、治癒のポーション30、封魂石10,000、復活の精霊石5が入ります。",
        "デラックスはスタンダード全部に、覚醒のディーヴァ(外形：セット)(刻印)7部位と武器外形箱：永遠の太陽(刻印)×1を追加します。",
        "アルティメットはデラックス全部に、ディーヴァ スタイリング箱(刻印)×1、月光のアリア(外形：セット)(刻印)6部位、ペット：ブラック ドラゴン、燃え上がる太陽の翼(刻印)を追加します。スタイリング箱はスタイリング利用券×1と外形変更券(7日)×1です。",
        "公式表では対象アイテムの取引・削除・倉庫利用が不可です。タイトル、防具・武器外形、ペット、翼には追加能力値がないと明記されています。",
      ],
      table: {
        caption: "AION 2 ファウンダーズパック日本公式価格と種類別の違い",
        headers: ["種類", "日本公式価格", "アーリーアクセス", "主な追加内容"],
        rows: [
          { header: "スタンダード", cells: ["¥3,900", "5日間", "冒険補給箱、天空を開いたディーヴァ"] },
          { header: "デラックス", cells: ["¥7,850", "5日間", "スタンダード全部、覚醒のディーヴァ7部位、永遠の太陽"] },
          { header: "アルティメット", cells: ["¥15,500", "5日間", "デラックス全部、スタイリング、月光のアリア、ブラック ドラゴン、翼"] },
        ],
      },
    },
    {
      id: "choose-by-use-case",
      title: "強さではなく使い道で選ぶ",
      paragraphs: ["アーリーアクセス期間はすべて同じです。公式に掲載された外形やコレクション品を実際に使うかどうかで上位版を判断してください。"],
      steps: [
        { title: "スタンダード", description: "9月30日から始めたい、補給箱とタイトルが欲しいが追加外形は不要な人向けです。" },
        { title: "デラックス", description: "覚醒のディーヴァ7部位と永遠の太陽の武器外形を使いたい人向けです。" },
        { title: "アルティメット", description: "月光のアリア、ブラック ドラゴン、翼、スタイリング券を使う人向けです。" },
        { title: "正式サービスを待つ", description: "5日早く始める必要がない場合。通常開始後の基本ゲームは無料です。" },
      ],
    },
    {
      id: "server-plan",
      title: "アーリーアクセスサーバーと正式開始サーバー",
      paragraphs: [
        "先に購入者向けアーリーアクセスサーバーが開き、正式開始時に第2陣のLaunch Serverが追加されます。フレンドとは地域、サーバー群、天族・魔族を事前に合わせてください。ダンジョンマッチングは同地域のアーリーアクセスサーバー間から始まり、正式開始後に拡大します。",
      ],
    },
    {
      id: "market-and-transfer",
      title: "取引所とサーバー移動は別の条件",
      paragraphs: [
        "ローカルのServer Marketは初日から開きますが、現在のグローバル版方針では利用に有効なMembershipが必要です。Cross-Server MarketとServer Transfer Serviceは後日で、日時・料金・制限は未発表です。",
      ],
    },
    {
      id: "pre-purchase-checks",
      title: "購入前の最終確認",
      paragraphs: [
        "ログインしたSteamまたはPURPLEで地域、価格、種類、返金条件を確認してください。SteamとPURPLEの購入権利は相互移行できず、Steamには公式アップグレード経路がまだありません。",
        "日本語版案内は、SteamまたはPURPLEで購入した商品の返金は各プラットフォームの規定に従うとしています。英語版にある発売後14日・2時間未満などの条件を、日本向けに保証された条件として扱わないでください。",
      ],
      bullets: [
        "9月30日は確定日ですが、正確な開始時刻は未発表です。",
        "SteamとPURPLEの権利はプラットフォームをまたいで使えません。",
        "上位版や複数購入で5日間は延長されません。",
        "外形・ペット・翼には追加能力値がありません。",
      ],
    },
    {
      id: "faq",
      title: "AION 2 ファウンダーズパック FAQ",
      paragraphs: [],
      faq: [
        { question: "AION 2 ファウンダーズパックの価格は？", answer: "日本語公式価格はスタンダード¥3,900、デラックス¥7,850、アルティメット¥15,500です。決済画面で最新価格を再確認してください。" },
        { question: "アーリーアクセスだけならどれを選ぶ？", answer: "スタンダードで十分です。3種類とも2026年9月30日から同じ5日間です。" },
        { question: "後からアップグレードできる？", answer: "PURPLEは3つの差額アップグレードを掲載しています。Steamには同等の方法が発表されていません。" },
        { question: "デラックスやアルティメットで能力値は上がる？", answer: "公式説明ではタイトル、外形、ペット、翼に追加能力値はありません。" },
        { question: "ファウンダーズパックの特典はアカウント共通？", answer: "公式表には取引・削除・保管の制限が記載されていますが、配布される全特典がキャラクター単位ではなくアカウント共通かどうかは明確にされていません。受け取る前に最新の受領条件を確認してください。" },
        { question: "AION 2 ファウンダーズパックはPay to Win？", answer: "NCによると、タイトル、外形、ペット、翼に追加能力値はありません。スタンダードの補給箱は序盤の消耗品による利便性を提供します。上位版が戦闘力の強化になるわけではなく、Pay to Winの定義に対する受け止め方はプレイヤーごとに異なります。" },
      ],
    },
  ],
);

export const officialFounderGuideTranslations = {
  de,
  es,
  fr,
  ja,
  "pt-br": ptBr,
} as const satisfies Record<OfficialFounderLocale, LocalizedContent>;
