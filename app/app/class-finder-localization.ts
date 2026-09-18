import type {
  ClassFinderClassId,
  ClassFinderQuestionId,
} from "./class-finder-data";
import type { ContentLocale, SiteLocale } from "./site-config";

export type ClassFinderEditorialLocale = Exclude<SiteLocale, ContentLocale>;

export type ClassFinderPageCopy = {
  title: string;
  seoTitle: string;
  kicker: string;
  description: string;
  interactionTitle: string;
  interactionDescription: string;
  methodology: string;
  faqTitle: string;
  faqs: readonly { question: string; answer: string }[];
  relatedTitle: string;
  relatedDescription: string;
  related: readonly {
    href: string;
    label: string;
    description: string;
  }[];
};

export type ClassFinderUiCopy = {
  kicker: string;
  introTitle: string;
  introDescription: string;
  duration: string;
  questionCount: string;
  privateByDesign: string;
  privacy: string;
  start: string;
  resume: string;
  restart: string;
  progress: (current: number, total: number) => string;
  answered: (count: number, total: number) => string;
  chooseOne: string;
  back: string;
  next: string;
  seeResults: string;
  resultsKicker: string;
  resultsTitle: string;
  resultsDescription: string;
  primaryMatch: string;
  match: string;
  matchedPreferences: string;
  guide: string;
  allClasses: string;
  share: string;
  shared: string;
  copied: string;
  copyFailed: string;
  saved: string;
  saveFailed: string;
  emptyResults: string;
  continueQuestions: string;
  rankLabel: (rank: number) => string;
};

export type ClassFinderShareCopy = {
  title: string;
  description: string;
  generating: string;
  ready: string;
  failed: string;
  retry: string;
  shareImage: string;
  copyImage: string;
  downloadImage: string;
  copyLink: string;
  shared: string;
  copiedImage: string;
  downloaded: string;
  copiedLink: string;
  copyFailed: string;
  close: string;
  imageAlt: (name: string) => string;
  resultSummary: string;
};

export type ClassFinderPosterCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  rank: (rank: number) => string;
  match: string;
  preferences: string;
  footer: string;
};

const relatedHrefs = [
  "/classes/difficulty-comparison/",
  "/classes/class-choice-guide/",
  "/classes/base-class-roster/",
  "/tools/map/",
] as const;

export const editorialClassFinderPageCopy: Record<
  ClassFinderEditorialLocale,
  ClassFinderPageCopy
> = {
  "zh-hans": {
    title: "AION2 职业推荐器：按玩法找到适合你的职业",
    seoTitle: "AION2 职业推荐器：找到适合你的职业 | AION2 KINA",
    kicker: "职业选择",
    description:
      "回答有关操作节奏、队伍定位和 PvE／PvP 偏好的问题，获得三个更符合你玩法的 AION2 职业建议，再通过职业攻略核对武器、技能与实战循环。",
    interactionTitle: "开始 AION2 职业测试",
    interactionDescription:
      "选择最符合直觉的答案。结果用于缩小选择范围，不是强度排名、伤害榜或胜率预测。",
    methodology:
      "推荐会对八个基础职业的操作负担、战斗距离、输出、防御、治疗、单人玩法和队伍责任进行加权。版本更新后，请以游戏内说明与最新职业攻略为准。",
    faqTitle: "AION2 职业推荐常见问题",
    faqs: [
      { question: "职业推荐结果如何计算？", answer: "工具会比较你的战斗节奏、距离、队伍职责、模式偏好和容错需求，再列出最接近的三个基础职业。" },
      { question: "第一名就是当前最强职业吗？", answer: "不是。分数只表示玩法匹配度，不预测伤害、胜率、玩家数量或版本强度。" },
      { question: "新手一定要选择最简单的职业吗？", answer: "不一定。除了难度，还要考虑距离、队伍责任、生存方式和你喜欢的战斗循环。" },
      { question: "可以重新测试或比较其他职业吗？", answer: "可以。你可以重新作答，并用职业总览、难度比较和单职业攻略交叉确认。" },
    ],
    relatedTitle: "用攻略核对推荐结果",
    relatedDescription: "把测试当作起点，再比较难度、职业定位与相关工具。",
    related: [
      { href: relatedHrefs[0], label: "职业操作难度比较", description: "比较学习曲线、容错和队伍责任。" },
      { href: relatedHrefs[1], label: "八大职业选择指南", description: "核对定位、武器和玩法差异。" },
      { href: relatedHrefs[2], label: "八大基础职业总览", description: "查看已确认的职业与武器资料。" },
      { href: relatedHrefs[3], label: "AION2 互动地图", description: "选好职业后规划探索和收集路线。" },
    ],
  },
  fr: {
    title: "Sélecteur de classe AION2 : trouvez la classe adaptée à votre style",
    seoTitle: "Sélecteur de classe AION2 | AION2 KINA",
    kicker: "CHOIX DE CLASSE",
    description:
      "Répondez à quelques questions sur le rythme de combat, le rôle en groupe et vos préférences PvE ou PvP. Vous obtiendrez trois classes AION2 à explorer, puis pourrez vérifier leurs armes et rotations dans les guides.",
    interactionTitle: "Commencer le test de classe AION2",
    interactionDescription:
      "Choisissez la réponse la plus naturelle. Le résultat réduit les options ; ce n’est ni un classement de puissance, ni une tier list.",
    methodology:
      "Le calcul compare les huit classes de base selon la difficulté, la portée, les dégâts, la défense, les soins, le jeu solo et la responsabilité en groupe. Après une mise à jour, vérifiez les descriptions en jeu.",
    faqTitle: "Questions fréquentes sur le sélecteur de classe AION2",
    faqs: [
      { question: "Comment les classes sont-elles sélectionnées ?", answer: "L’outil compare votre rythme, votre portée, votre rôle, votre mode de jeu et votre tolérance aux erreurs avec les profils des huit classes de base." },
      { question: "Le premier résultat est-il la classe la plus forte ?", answer: "Non. Le score mesure uniquement l’affinité de style et ne prédit ni dégâts, ni taux de victoire, ni classement de patch." },
      { question: "Un débutant doit-il choisir la classe la plus simple ?", answer: "Pas forcément. La portée, la responsabilité, la survie et la boucle de combat comptent aussi." },
      { question: "Puis-je refaire le test ?", answer: "Oui. Recommencez puis comparez le résultat avec la vue d’ensemble, le comparatif de difficulté et les guides détaillés." },
    ],
    relatedTitle: "Vérifier les résultats avec les guides",
    relatedDescription: "Utilisez le test comme point de départ avant de choisir un personnage.",
    related: [
      { href: relatedHrefs[0], label: "Comparatif de difficulté", description: "Comparez apprentissage, tolérance aux erreurs et responsabilité." },
      { href: relatedHrefs[1], label: "Guide de choix des huit classes", description: "Vérifiez rôles, armes et styles de jeu." },
      { href: relatedHrefs[2], label: "Les huit classes de base", description: "Consultez les classes et armes confirmées." },
      { href: relatedHrefs[3], label: "Carte interactive AION2", description: "Planifiez exploration et collecte après votre choix." },
    ],
  },
  de: {
    title: "AION2-Klassenfinder: Finde die passende Klasse für deinen Spielstil",
    seoTitle: "AION2-Klassenfinder: Finde deine Klasse | AION2 KINA",
    kicker: "KLASSENWAHL",
    description:
      "Beantworte Fragen zu Kampftempo, Gruppenrolle und PvE- oder PvP-Vorlieben. Du erhältst drei passende AION2-Klassen und kannst Waffen und Spielabläufe anschließend in den Guides prüfen.",
    interactionTitle: "AION2-Klassentest starten",
    interactionDescription:
      "Wähle die Antwort, die sich am natürlichsten anfühlt. Das Ergebnis grenzt die Auswahl ein und ist keine Stärke- oder Tier-Rangliste.",
    methodology:
      "Der Vergleich gewichtet die acht Basisklassen nach Schwierigkeit, Reichweite, Schaden, Verteidigung, Heilung, Solospiel und Gruppenverantwortung. Prüfe nach Patches die Angaben im Spiel.",
    faqTitle: "Häufige Fragen zum AION2-Klassenfinder",
    faqs: [
      { question: "Wie werden die Klassenempfehlungen berechnet?", answer: "Das Tool vergleicht Tempo, Reichweite, Gruppenrolle, Modus und Fehlertoleranz mit den Profilen der acht Basisklassen." },
      { question: "Ist das erste Ergebnis die stärkste Klasse?", answer: "Nein. Der Wert misst nur die Spielstil-Passung und sagt nichts über Schaden, Siegrate oder Patch-Rang aus." },
      { question: "Sollten Anfänger immer die einfachste Klasse wählen?", answer: "Nicht zwingend. Reichweite, Verantwortung, Überleben und der bevorzugte Kampfablauf sind ebenso wichtig." },
      { question: "Kann ich den Test wiederholen?", answer: "Ja. Wiederhole ihn und vergleiche das Ergebnis mit Klassenübersicht, Schwierigkeitsvergleich und Einzelguides." },
    ],
    relatedTitle: "Empfehlungen mit Guides prüfen",
    relatedDescription: "Nutze den Test als Ausgangspunkt, bevor du Zeit in einen Charakter investierst.",
    related: [
      { href: relatedHrefs[0], label: "Klassenschwierigkeit vergleichen", description: "Vergleiche Lernkurve, Fehlertoleranz und Verantwortung." },
      { href: relatedHrefs[1], label: "Wahlhilfe für acht Klassen", description: "Prüfe Rollen, Waffen und Spielstile." },
      { href: relatedHrefs[2], label: "Acht Basisklassen", description: "Sieh bestätigte Klassen- und Waffendaten." },
      { href: relatedHrefs[3], label: "Interaktive AION2-Karte", description: "Plane Erkundungs- und Sammelrouten." },
    ],
  },
  es: {
    title: "Selector de clase de AION2: encuentra tu clase ideal",
    seoTitle: "Selector de clase de AION2: encuentra tu clase | AION2 KINA",
    kicker: "ELECCIÓN DE CLASE",
    description:
      "Responde preguntas sobre ritmo de combate, función en grupo y preferencias de PvE o PvP. Recibirás tres clases de AION2 y podrás comprobar armas y rotaciones en sus guías.",
    interactionTitle: "Iniciar el test de clase de AION2",
    interactionDescription:
      "Elige la respuesta más natural. El resultado reduce las opciones; no es un ranking de poder, daño o victorias.",
    methodology:
      "La recomendación compara las ocho clases base según dificultad, alcance, daño, defensa, curación, juego en solitario y responsabilidad de grupo. Revisa el juego después de cada parche.",
    faqTitle: "Preguntas frecuentes del selector de clase de AION2",
    faqs: [
      { question: "¿Cómo se calculan las recomendaciones?", answer: "La herramienta compara ritmo, alcance, función, modo de juego y tolerancia a errores con los perfiles de las ocho clases base." },
      { question: "¿El primer resultado es la clase más fuerte?", answer: "No. La puntuación solo mide afinidad de estilo y no predice daño, victorias ni tier del parche." },
      { question: "¿Un principiante debe elegir la clase más fácil?", answer: "No siempre. También importan el alcance, la responsabilidad, la supervivencia y el ciclo de combate." },
      { question: "¿Puedo repetir el test?", answer: "Sí. Repite las respuestas y compara el resultado con el resumen, la dificultad y las guías de clase." },
    ],
    relatedTitle: "Comprueba el resultado con las guías",
    relatedDescription: "Usa el test como punto de partida antes de invertir en un personaje.",
    related: [
      { href: relatedHrefs[0], label: "Comparación de dificultad", description: "Compara aprendizaje, margen de error y responsabilidad." },
      { href: relatedHrefs[1], label: "Guía para elegir entre ocho clases", description: "Consulta funciones, armas y estilos." },
      { href: relatedHrefs[2], label: "Ocho clases base", description: "Revisa clases y armas confirmadas." },
      { href: relatedHrefs[3], label: "Mapa interactivo de AION2", description: "Planifica rutas de exploración y recolección." },
    ],
  },
  ja: {
    title: "AION2クラス診断：プレイスタイルに合うクラスを探す",
    seoTitle: "AION2クラス診断：自分に合うクラスを検索 | AION2 KINA",
    kicker: "クラス選択",
    description:
      "戦闘テンポ、パーティでの役割、PvE・PvPの好みに答えると、プレイスタイルに近いAION2のクラスを3つ提案します。武器や立ち回りは各攻略で確認できます。",
    interactionTitle: "AION2クラス診断を始める",
    interactionDescription:
      "直感に近い回答を選んでください。結果は候補を絞るためのもので、強さやダメージ、勝率の順位ではありません。",
    methodology:
      "8つの基本クラスを、操作難度、射程、攻撃、防御、回復、ソロ適性、パーティ責任で比較します。アップデート後はゲーム内説明と最新攻略を確認してください。",
    faqTitle: "AION2クラス診断のよくある質問",
    faqs: [
      { question: "おすすめクラスはどう計算されますか？", answer: "戦闘テンポ、距離、パーティ役割、モード、ミスへの許容度を8つの基本クラスの特徴と比較します。" },
      { question: "1位は現在最強のクラスですか？", answer: "いいえ。プレイスタイルとの相性のみを示し、火力、勝率、パッチのTierは予測しません。" },
      { question: "初心者は一番簡単なクラスを選ぶべきですか？", answer: "必ずしもそうではありません。射程、責任、生存方法、好みの戦闘ループも重要です。" },
      { question: "診断をやり直せますか？", answer: "はい。再回答した後、クラス一覧、難度比較、個別攻略と照合できます。" },
    ],
    relatedTitle: "攻略で診断結果を確認",
    relatedDescription: "診断を出発点に、育成するクラスを決める前に比較しましょう。",
    related: [
      { href: relatedHrefs[0], label: "クラス操作難度比較", description: "学習曲線、ミスへの強さ、責任を比較。" },
      { href: relatedHrefs[1], label: "8クラス選択ガイド", description: "役割、武器、プレイスタイルを確認。" },
      { href: relatedHrefs[2], label: "8つの基本クラス", description: "確認済みのクラスと武器情報を見る。" },
      { href: relatedHrefs[3], label: "AION2インタラクティブマップ", description: "探索と収集ルートを計画。" },
    ],
  },
  "pt-br": {
    title: "Seletor de classe de AION2: encontre a classe para seu estilo",
    seoTitle: "Seletor de classe de AION2: encontre sua classe | AION2 KINA",
    kicker: "ESCOLHA DE CLASSE",
    description:
      "Responda perguntas sobre ritmo de combate, função no grupo e preferências de PvE ou PvP. Você receberá três classes de AION2 e poderá conferir armas e rotações nos guias.",
    interactionTitle: "Iniciar o teste de classe de AION2",
    interactionDescription:
      "Escolha a resposta mais natural. O resultado reduz as opções; não é ranking de poder, dano ou taxa de vitória.",
    methodology:
      "A recomendação compara as oito classes básicas por dificuldade, alcance, dano, defesa, cura, jogo solo e responsabilidade no grupo. Após atualizações, confira as descrições no jogo.",
    faqTitle: "Perguntas frequentes sobre o seletor de classe de AION2",
    faqs: [
      { question: "Como as recomendações são calculadas?", answer: "A ferramenta compara ritmo, alcance, função, modo de jogo e tolerância a erros com os perfis das oito classes básicas." },
      { question: "O primeiro resultado é a classe mais forte?", answer: "Não. A pontuação mede apenas afinidade de estilo e não prevê dano, vitórias ou tier do patch." },
      { question: "Um iniciante deve escolher a classe mais fácil?", answer: "Nem sempre. Alcance, responsabilidade, sobrevivência e o ciclo de combate também importam." },
      { question: "Posso refazer o teste?", answer: "Sim. Responda novamente e compare o resultado com a visão geral, a dificuldade e os guias individuais." },
    ],
    relatedTitle: "Confira o resultado nos guias",
    relatedDescription: "Use o teste como ponto de partida antes de investir em um personagem.",
    related: [
      { href: relatedHrefs[0], label: "Comparação de dificuldade", description: "Compare aprendizado, tolerância a erros e responsabilidade." },
      { href: relatedHrefs[1], label: "Guia de escolha das oito classes", description: "Confira funções, armas e estilos." },
      { href: relatedHrefs[2], label: "Oito classes básicas", description: "Veja informações confirmadas de classes e armas." },
      { href: relatedHrefs[3], label: "Mapa interativo de AION2", description: "Planeje rotas de exploração e coleta." },
    ],
  },
  ru: {
    title: "Подбор класса AION2: найдите класс под свой стиль игры",
    seoTitle: "Подбор класса AION2: найдите свой класс | AION2 KINA",
    kicker: "ВЫБОР КЛАССА",
    description:
      "Ответьте на вопросы о темпе боя, роли в группе и предпочтениях PvE или PvP. Вы получите три подходящих класса AION2 и сможете проверить оружие и игровой цикл в гайдах.",
    interactionTitle: "Начать тест класса AION2",
    interactionDescription:
      "Выберите наиболее естественный ответ. Результат сужает выбор, но не является рейтингом силы, урона или побед.",
    methodology:
      "Рекомендация сравнивает восемь базовых классов по сложности, дальности, урону, защите, лечению, одиночной игре и ответственности в группе. После патча сверяйтесь с игрой.",
    faqTitle: "Частые вопросы о подборе класса AION2",
    faqs: [
      { question: "Как рассчитываются рекомендации?", answer: "Инструмент сравнивает темп, дистанцию, роль, режим игры и терпимость к ошибкам с профилями восьми базовых классов." },
      { question: "Первый результат — самый сильный класс?", answer: "Нет. Оценка показывает только соответствие стилю и не прогнозирует урон, победы или место в патче." },
      { question: "Новичку всегда нужен самый простой класс?", answer: "Не обязательно. Также важны дистанция, ответственность, выживание и приятный вам цикл боя." },
      { question: "Можно пройти тест заново?", answer: "Да. Повторите ответы и сравните результат с обзором, сложностью и отдельными гайдами." },
    ],
    relatedTitle: "Проверьте результат по гайдам",
    relatedDescription: "Используйте тест как отправную точку перед выбором персонажа.",
    related: [
      { href: relatedHrefs[0], label: "Сравнение сложности классов", description: "Сравните обучение, допустимость ошибок и ответственность." },
      { href: relatedHrefs[1], label: "Гайд по выбору восьми классов", description: "Проверьте роли, оружие и стили." },
      { href: relatedHrefs[2], label: "Восемь базовых классов", description: "Посмотрите подтверждённые классы и оружие." },
      { href: relatedHrefs[3], label: "Интерактивная карта AION2", description: "Планируйте исследование и сбор." },
    ],
  },
};

export const editorialClassFinderUiCopy: Record<
  ClassFinderEditorialLocale,
  ClassFinderUiCopy
> = {
  "zh-hans": {
    kicker: "职业适配", introTitle: "用 6 个选择缩小职业范围",
    introDescription: "根据操作节奏、战斗距离、队伍责任和容错偏好，找出最值得先了解的三个职业。",
    duration: "约 2 分钟", questionCount: "6 个问题", privateByDesign: "无需账号",
    privacy: "进度只保存在当前设备；完成或分享时答案会写入网址片段，但不会创建公开结果页。",
    start: "开始推荐", resume: "继续上次进度", restart: "重新开始",
    progress: (current, total) => `第 ${current} 题，共 ${total} 题`,
    answered: (count, total) => `已回答 ${count} / ${total}`,
    chooseOne: "选择最接近你的答案", back: "上一题", next: "下一题", seeResults: "查看推荐",
    resultsKicker: "你的职业适配", resultsTitle: "最适合先了解的三个职业",
    resultsDescription: "推荐反映玩法偏好，不代表职业强度、版本排名或官方结论。",
    primaryMatch: "首选", match: "适配度", matchedPreferences: "符合你的偏好",
    guide: "查看职业攻略", allClasses: "比较全部职业", share: "分享结果",
    shared: "已打开系统分享", copied: "结果链接已复制",
    copyFailed: "无法自动复制，请从浏览器地址栏复制链接。",
    saved: "进度已保存在当前设备", saveFailed: "浏览器阻止了本地存储；本次作答仍可继续。",
    emptyResults: "答案不足。请完成问卷后查看推荐。", continueQuestions: "继续完成问卷",
    rankLabel: (rank) => `第 ${rank} 名推荐`,
  },
  fr: {
    kicker: "AFFINITÉ DE CLASSE", introTitle: "Réduisez vos choix en 6 décisions",
    introDescription: "Trouvez trois classes à explorer selon votre rythme, votre portée, votre rôle en groupe et votre tolérance aux erreurs.",
    duration: "Environ 2 minutes", questionCount: "6 questions", privateByDesign: "Sans compte",
    privacy: "La progression reste sur cet appareil. Le partage ajoute les réponses au fragment d’URL sans créer de page publique.",
    start: "Commencer", resume: "Continuer les réponses", restart: "Recommencer",
    progress: (current, total) => `Question ${current} sur ${total}`,
    answered: (count, total) => `${count} réponse(s) sur ${total}`,
    chooseOne: "Choisissez la réponse la plus proche", back: "Retour", next: "Suivant", seeResults: "Voir mes résultats",
    resultsKicker: "VOTRE AFFINITÉ", resultsTitle: "Trois classes à explorer",
    resultsDescription: "Le résultat reflète vos préférences, pas la puissance ni une tier list officielle.",
    primaryMatch: "Meilleur choix", match: "affinité", matchedPreferences: "Pourquoi ce choix",
    guide: "Voir le guide", allClasses: "Comparer les classes", share: "Partager",
    shared: "Partage système ouvert", copied: "Lien copié",
    copyFailed: "Copie automatique impossible. Copiez le lien dans la barre d’adresse.",
    saved: "Progression enregistrée sur cet appareil", saveFailed: "Le stockage local est bloqué ; vous pouvez continuer cette session.",
    emptyResults: "Réponses insuffisantes. Terminez le questionnaire.", continueQuestions: "Continuer",
    rankLabel: (rank) => `Recommandation ${rank}`,
  },
  de: {
    kicker: "KLASSENPASSUNG", introTitle: "Grenze deine Auswahl mit 6 Entscheidungen ein",
    introDescription: "Finde drei Klassen anhand von Tempo, Reichweite, Gruppenrolle und Fehlertoleranz.",
    duration: "Etwa 2 Minuten", questionCount: "6 Fragen", privateByDesign: "Kein Konto",
    privacy: "Der Fortschritt bleibt auf diesem Gerät. Beim Teilen stehen Antworten nur im URL-Fragment; es entsteht keine öffentliche Seite.",
    start: "Klassenfinder starten", resume: "Antworten fortsetzen", restart: "Neu beginnen",
    progress: (current, total) => `Frage ${current} von ${total}`,
    answered: (count, total) => `${count} von ${total} beantwortet`,
    chooseOne: "Wähle die passendste Antwort", back: "Zurück", next: "Weiter", seeResults: "Ergebnisse anzeigen",
    resultsKicker: "DEINE KLASSENPASSUNG", resultsTitle: "Drei Klassen zum Erkunden",
    resultsDescription: "Das Ergebnis zeigt Vorlieben, nicht Stärke, Patch-Tiers oder ein offizielles Urteil.",
    primaryMatch: "Beste Passung", match: "Passung", matchedPreferences: "Warum passend",
    guide: "Klassenguide öffnen", allClasses: "Alle Klassen vergleichen", share: "Ergebnis teilen",
    shared: "Systemfreigabe geöffnet", copied: "Ergebnislink kopiert",
    copyFailed: "Automatisches Kopieren fehlgeschlagen. Kopiere den Link aus der Adressleiste.",
    saved: "Fortschritt auf diesem Gerät gespeichert", saveFailed: "Lokaler Speicher ist blockiert; diese Sitzung kann fortgesetzt werden.",
    emptyResults: "Noch nicht genug Antworten. Schließe den Test ab.", continueQuestions: "Fragen fortsetzen",
    rankLabel: (rank) => `Empfehlung ${rank}`,
  },
  es: {
    kicker: "AFINIDAD DE CLASE", introTitle: "Reduce tus opciones con 6 decisiones",
    introDescription: "Encuentra tres clases según ritmo, alcance, responsabilidad de grupo y tolerancia a errores.",
    duration: "Unos 2 minutos", questionCount: "6 preguntas", privateByDesign: "Sin cuenta",
    privacy: "El progreso queda en este dispositivo. Compartir añade respuestas al fragmento de URL, sin crear una página pública.",
    start: "Iniciar selector", resume: "Continuar respuestas", restart: "Empezar de nuevo",
    progress: (current, total) => `Pregunta ${current} de ${total}`,
    answered: (count, total) => `${count} de ${total} respondidas`,
    chooseOne: "Elige la respuesta más cercana", back: "Atrás", next: "Siguiente", seeResults: "Ver resultados",
    resultsKicker: "TU AFINIDAD", resultsTitle: "Tres clases para explorar",
    resultsDescription: "El resultado refleja preferencias, no poder, tier del parche ni una valoración oficial.",
    primaryMatch: "Mejor opción", match: "afinidad", matchedPreferences: "Por qué encaja",
    guide: "Ver guía de clase", allClasses: "Comparar clases", share: "Compartir resultados",
    shared: "Se abrió el menú de compartir", copied: "Enlace copiado",
    copyFailed: "No se pudo copiar automáticamente. Copia el enlace de la barra de direcciones.",
    saved: "Progreso guardado en este dispositivo", saveFailed: "El almacenamiento local está bloqueado; puedes continuar esta sesión.",
    emptyResults: "Aún faltan respuestas. Completa el cuestionario.", continueQuestions: "Continuar preguntas",
    rankLabel: (rank) => `Recomendación ${rank}`,
  },
  ja: {
    kicker: "クラス適性", introTitle: "6つの選択で候補を絞り込む",
    introDescription: "操作テンポ、戦闘距離、パーティ責任、ミスへの許容度から、先に調べたい3クラスを提案します。",
    duration: "約2分", questionCount: "6問", privateByDesign: "アカウント不要",
    privacy: "進行状況はこの端末にのみ保存されます。共有時は回答がURLフラグメントに入りますが、公開結果ページは作られません。",
    start: "診断を始める", resume: "前回の回答を続ける", restart: "最初から",
    progress: (current, total) => `${total}問中${current}問目`,
    answered: (count, total) => `${total}問中${count}問回答`,
    chooseOne: "最も近い回答を選択", back: "戻る", next: "次へ", seeResults: "結果を見る",
    resultsKicker: "あなたのクラス適性", resultsTitle: "先に調べたい3つのクラス",
    resultsDescription: "結果はプレイの好みを示し、クラスの強さや公式Tierを示すものではありません。",
    primaryMatch: "第1候補", match: "適合度", matchedPreferences: "おすすめの理由",
    guide: "クラス攻略を見る", allClasses: "全クラスを比較", share: "結果を共有",
    shared: "共有画面を開きました", copied: "結果リンクをコピーしました",
    copyFailed: "自動コピーできませんでした。アドレスバーからリンクをコピーしてください。",
    saved: "この端末に進行状況を保存しました", saveFailed: "ローカル保存が無効です。このセッションは続行できます。",
    emptyResults: "回答が足りません。質問を完了してください。", continueQuestions: "質問を続ける",
    rankLabel: (rank) => `おすすめ第${rank}位`,
  },
  "pt-br": {
    kicker: "AFINIDADE DE CLASSE", introTitle: "Reduza suas opções em 6 decisões",
    introDescription: "Encontre três classes pelo ritmo, alcance, responsabilidade no grupo e tolerância a erros.",
    duration: "Cerca de 2 minutos", questionCount: "6 perguntas", privateByDesign: "Sem conta",
    privacy: "O progresso fica neste dispositivo. Compartilhar adiciona respostas ao fragmento da URL, sem criar uma página pública.",
    start: "Iniciar seletor", resume: "Continuar respostas", restart: "Recomeçar",
    progress: (current, total) => `Pergunta ${current} de ${total}`,
    answered: (count, total) => `${count} de ${total} respondidas`,
    chooseOne: "Escolha a resposta mais próxima", back: "Voltar", next: "Avançar", seeResults: "Ver resultados",
    resultsKicker: "SUA AFINIDADE", resultsTitle: "Três classes para explorar",
    resultsDescription: "O resultado reflete preferências, não poder, tier do patch ou avaliação oficial.",
    primaryMatch: "Melhor opção", match: "afinidade", matchedPreferences: "Por que combina",
    guide: "Ver guia da classe", allClasses: "Comparar classes", share: "Compartilhar",
    shared: "Compartilhamento do sistema aberto", copied: "Link copiado",
    copyFailed: "A cópia automática falhou. Copie o link da barra de endereços.",
    saved: "Progresso salvo neste dispositivo", saveFailed: "O armazenamento local está bloqueado; você ainda pode continuar.",
    emptyResults: "Ainda faltam respostas. Conclua o questionário.", continueQuestions: "Continuar perguntas",
    rankLabel: (rank) => `Recomendação ${rank}`,
  },
  ru: {
    kicker: "СООТВЕТСТВИЕ КЛАССУ", introTitle: "Сузьте выбор за 6 решений",
    introDescription: "Найдите три класса по темпу, дистанции, ответственности в группе и терпимости к ошибкам.",
    duration: "Около 2 минут", questionCount: "6 вопросов", privateByDesign: "Без аккаунта",
    privacy: "Прогресс хранится на этом устройстве. При публикации ответы добавляются во фрагмент URL без создания публичной страницы.",
    start: "Начать подбор", resume: "Продолжить ответы", restart: "Начать заново",
    progress: (current, total) => `Вопрос ${current} из ${total}`,
    answered: (count, total) => `Отвечено ${count} из ${total}`,
    chooseOne: "Выберите наиболее близкий ответ", back: "Назад", next: "Далее", seeResults: "Показать результат",
    resultsKicker: "ВАШЕ СООТВЕТСТВИЕ", resultsTitle: "Три класса для знакомства",
    resultsDescription: "Результат отражает предпочтения, а не силу, тир патча или официальную оценку.",
    primaryMatch: "Лучший выбор", match: "соответствие", matchedPreferences: "Почему подходит",
    guide: "Открыть гайд", allClasses: "Сравнить классы", share: "Поделиться",
    shared: "Открыто системное меню", copied: "Ссылка скопирована",
    copyFailed: "Автоматическое копирование не удалось. Скопируйте ссылку из адресной строки.",
    saved: "Прогресс сохранён на этом устройстве", saveFailed: "Локальное хранилище заблокировано; эту сессию можно продолжить.",
    emptyResults: "Недостаточно ответов. Завершите опрос.", continueQuestions: "Продолжить",
    rankLabel: (rank) => `Рекомендация ${rank}`,
  },
};

function shareCopy(
  values: Omit<ClassFinderShareCopy, "imageAlt"> & {
    imageAlt: (name: string) => string;
  },
) {
  return values;
}

export const editorialClassFinderShareCopy: Record<
  ClassFinderEditorialLocale,
  ClassFinderShareCopy
> = {
  "zh-hans": shareCopy({
    title: "分享职业结果", description: "图片只在当前设备生成，不会上传你的答案。",
    generating: "正在生成结果图片…", ready: "结果图片已生成", failed: "图片生成失败，但仍可复制结果链接。",
    retry: "重新生成", shareImage: "分享图片", copyImage: "复制图片", downloadImage: "下载图片", copyLink: "复制结果链接",
    shared: "已打开图片分享", copiedImage: "结果图片已复制", downloaded: "结果图片已下载", copiedLink: "结果链接已复制",
    copyFailed: "浏览器无法自动复制，请手动复制下方链接。", close: "关闭分享结果",
    imageAlt: (name) => `以 ${name} 为首选的 AION2 职业适配结果图片`, resultSummary: "图片中的职业结果",
  }),
  fr: shareCopy({
    title: "Partager vos classes", description: "L’image est créée sur cet appareil ; vos réponses ne sont pas envoyées.",
    generating: "Création de l’image…", ready: "Image prête", failed: "Impossible de créer l’image. Le lien reste disponible.",
    retry: "Réessayer", shareImage: "Partager l’image", copyImage: "Copier l’image", downloadImage: "Télécharger l’image", copyLink: "Copier le lien",
    shared: "Partage de l’image ouvert", copiedImage: "Image copiée", downloaded: "Image téléchargée", copiedLink: "Lien copié",
    copyFailed: "Copie automatique impossible. Copiez le lien ci-dessous.", close: "Fermer les résultats",
    imageAlt: (name) => `Résultat du sélecteur de classe AION2 avec ${name} en premier choix`, resultSummary: "Classes affichées dans l’image",
  }),
  de: shareCopy({
    title: "Klassenempfehlungen teilen", description: "Das Bild wird auf diesem Gerät erstellt; Antworten werden nicht hochgeladen.",
    generating: "Ergebnisbild wird erstellt…", ready: "Ergebnisbild ist bereit", failed: "Bild konnte nicht erstellt werden. Der Link kann weiterhin kopiert werden.",
    retry: "Erneut versuchen", shareImage: "Bild teilen", copyImage: "Bild kopieren", downloadImage: "Bild herunterladen", copyLink: "Ergebnislink kopieren",
    shared: "Bildfreigabe geöffnet", copiedImage: "Bild kopiert", downloaded: "Bild heruntergeladen", copiedLink: "Link kopiert",
    copyFailed: "Automatisches Kopieren fehlgeschlagen. Kopiere den Link unten.", close: "Ergebnisse schließen",
    imageAlt: (name) => `AION2-Klassenergebnis mit ${name} als bester Empfehlung`, resultSummary: "Im Bild gezeigte Klassen",
  }),
  es: shareCopy({
    title: "Compartir clases recomendadas", description: "La imagen se crea en este dispositivo; las respuestas no se suben.",
    generating: "Creando imagen…", ready: "Imagen lista", failed: "No se pudo crear la imagen. Aún puedes copiar el enlace.",
    retry: "Reintentar", shareImage: "Compartir imagen", copyImage: "Copiar imagen", downloadImage: "Descargar imagen", copyLink: "Copiar enlace",
    shared: "Menú de compartir abierto", copiedImage: "Imagen copiada", downloaded: "Imagen descargada", copiedLink: "Enlace copiado",
    copyFailed: "La copia automática falló. Copia el enlace inferior.", close: "Cerrar resultados",
    imageAlt: (name) => `Resultado de clase de AION2 con ${name} como mejor opción`, resultSummary: "Clases mostradas en la imagen",
  }),
  ja: shareCopy({
    title: "クラス診断結果を共有", description: "画像はこの端末で生成され、回答はアップロードされません。",
    generating: "結果画像を生成中…", ready: "結果画像の準備ができました", failed: "画像を生成できませんでした。結果リンクはコピーできます。",
    retry: "再生成", shareImage: "画像を共有", copyImage: "画像をコピー", downloadImage: "画像を保存", copyLink: "結果リンクをコピー",
    shared: "画像共有を開きました", copiedImage: "結果画像をコピーしました", downloaded: "結果画像を保存しました", copiedLink: "結果リンクをコピーしました",
    copyFailed: "自動コピーできませんでした。下のリンクを手動でコピーしてください。", close: "共有結果を閉じる",
    imageAlt: (name) => `${name}が第1候補のAION2クラス診断結果画像`, resultSummary: "画像に表示されたクラス",
  }),
  "pt-br": shareCopy({
    title: "Compartilhar classes recomendadas", description: "A imagem é criada neste dispositivo; suas respostas não são enviadas.",
    generating: "Criando imagem…", ready: "Imagem pronta", failed: "Não foi possível criar a imagem. O link ainda pode ser copiado.",
    retry: "Tentar novamente", shareImage: "Compartilhar imagem", copyImage: "Copiar imagem", downloadImage: "Baixar imagem", copyLink: "Copiar link",
    shared: "Compartilhamento aberto", copiedImage: "Imagem copiada", downloaded: "Imagem baixada", copiedLink: "Link copiado",
    copyFailed: "A cópia automática falhou. Copie o link abaixo.", close: "Fechar resultados",
    imageAlt: (name) => `Resultado de classe de AION2 com ${name} como melhor opção`, resultSummary: "Classes exibidas na imagem",
  }),
  ru: shareCopy({
    title: "Поделиться подбором классов", description: "Изображение создаётся на этом устройстве; ответы не загружаются.",
    generating: "Создаём изображение…", ready: "Изображение готово", failed: "Не удалось создать изображение. Ссылку всё ещё можно скопировать.",
    retry: "Повторить", shareImage: "Поделиться изображением", copyImage: "Копировать изображение", downloadImage: "Скачать изображение", copyLink: "Копировать ссылку",
    shared: "Открыто меню публикации", copiedImage: "Изображение скопировано", downloaded: "Изображение скачано", copiedLink: "Ссылка скопирована",
    copyFailed: "Автокопирование не удалось. Скопируйте ссылку ниже.", close: "Закрыть результаты",
    imageAlt: (name) => `Результат подбора класса AION2: лучший выбор — ${name}`, resultSummary: "Классы на изображении",
  }),
};

export const editorialClassFinderPosterCopy: Record<
  ClassFinderEditorialLocale,
  ClassFinderPosterCopy
> = {
  "zh-hans": { eyebrow: "AION2 KINA · 职业适配结果", title: "最适合先了解的三个职业", subtitle: "根据你的玩法偏好生成", primary: "首选", rank: (rank) => `第 ${rank} 名`, match: "适配度", preferences: "符合你的偏好", footer: "结果只反映玩法偏好，不代表职业强度、版本排名或官方结论。" },
  fr: { eyebrow: "AION2 KINA · AFFINITÉ DE CLASSE", title: "Trois classes à explorer", subtitle: "Résultat basé sur votre style de jeu", primary: "MEILLEUR CHOIX", rank: (rank) => `CHOIX ${rank}`, match: "AFFINITÉ", preferences: "POURQUOI CE CHOIX", footer: "Ce résultat reflète vos préférences, pas la puissance, les tiers ou un verdict officiel." },
  de: { eyebrow: "AION2 KINA · KLASSENPASSUNG", title: "Drei Klassen zum Erkunden", subtitle: "Aus deinen Spielstil-Vorlieben erstellt", primary: "BESTE PASSUNG", rank: (rank) => `EMPFEHLUNG ${rank}`, match: "PASSUNG", preferences: "WARUM PASSEND", footer: "Das Ergebnis zeigt Vorlieben, nicht Klassenstärke, Patch-Tiers oder ein offizielles Urteil." },
  es: { eyebrow: "AION2 KINA · AFINIDAD DE CLASE", title: "Tres clases para explorar", subtitle: "Generado según tus preferencias", primary: "MEJOR OPCIÓN", rank: (rank) => `OPCIÓN ${rank}`, match: "AFINIDAD", preferences: "POR QUÉ ENCAJA", footer: "El resultado refleja preferencias, no poder, tiers ni una valoración oficial." },
  ja: { eyebrow: "AION2 KINA · クラス適性結果", title: "先に調べたい3つのクラス", subtitle: "プレイスタイルの好みから生成", primary: "第1候補", rank: (rank) => `おすすめ第${rank}位`, match: "適合度", preferences: "おすすめの理由", footer: "結果はプレイの好みを示し、クラスの強さや公式Tierを示すものではありません。" },
  "pt-br": { eyebrow: "AION2 KINA · AFINIDADE DE CLASSE", title: "Três classes para explorar", subtitle: "Gerado conforme suas preferências", primary: "MELHOR OPÇÃO", rank: (rank) => `OPÇÃO ${rank}`, match: "AFINIDADE", preferences: "POR QUE COMBINA", footer: "O resultado reflete preferências, não poder, tiers ou avaliação oficial." },
  ru: { eyebrow: "AION2 KINA · ПОДБОР КЛАССА", title: "Три класса для знакомства", subtitle: "Создано по вашим игровым предпочтениям", primary: "ЛУЧШИЙ ВЫБОР", rank: (rank) => `ВАРИАНТ ${rank}`, match: "СООТВЕТСТВИЕ", preferences: "ПОЧЕМУ ПОДХОДИТ", footer: "Результат отражает предпочтения, а не силу класса, тир патча или официальную оценку." },
};

const questionTitles: Record<
  ClassFinderEditorialLocale,
  Record<ClassFinderQuestionId, readonly [string, string]>
> = {
  "zh-hans": {
    contribution: ["你最想在战斗中承担什么贡献？", "不考虑当前经验，选择最吸引你的主要贡献。"],
    "combat-rhythm": ["你更喜欢哪种战斗节奏？", "这里只比较节奏偏好，不代表职业输出。"],
    "learning-load": ["你愿意承担哪种学习负担？", "负担更高不等于更强，负担较低也需要练习。"],
    "preferred-position": ["你希望把注意力放在哪里？", "选择最符合直觉的战场视角。"],
    "party-responsibility": ["你想承担多少队伍责任？", "责任指决策负担，不代表固定队伍配置。"],
    "mistake-tolerance": ["你希望如何从失误中练习？", "选择你愿意反复改进的错误类型。"],
  },
  fr: {
    contribution: ["Que voulez-vous surtout apporter au combat ?", "Choisissez la contribution qui vous attire le plus, quelle que soit votre expérience."],
    "combat-rhythm": ["Quel rythme de combat préférez-vous ?", "Il s’agit d’une préférence de rythme, pas de puissance."],
    "learning-load": ["Quel effort d’apprentissage acceptez-vous ?", "Une charge plus élevée n’est pas plus forte ; toute classe demande de la pratique."],
    "preferred-position": ["Où souhaitez-vous porter votre attention ?", "Choisissez la perspective de combat la plus naturelle."],
    "party-responsibility": ["Quelle responsabilité de groupe souhaitez-vous ?", "La responsabilité décrit les décisions, pas une composition imposée."],
    "mistake-tolerance": ["Comment voulez-vous apprendre de vos erreurs ?", "Choisissez le type d’erreur que vous acceptez de travailler."],
  },
  de: {
    contribution: ["Was möchtest du im Kampf hauptsächlich beitragen?", "Wähle den Beitrag, der dich unabhängig von deiner Erfahrung anspricht."],
    "combat-rhythm": ["Welchen Kampfrhythmus bevorzugst du?", "Es geht um Rhythmus, nicht um Klassenleistung."],
    "learning-load": ["Welche Lernbelastung möchtest du übernehmen?", "Mehr Aufwand bedeutet nicht mehr Stärke; jede Klasse braucht Übung."],
    "preferred-position": ["Worauf möchtest du deine Aufmerksamkeit richten?", "Wähle die natürlichste Perspektive auf das Schlachtfeld."],
    "party-responsibility": ["Wie viel Gruppenverantwortung möchtest du?", "Verantwortung beschreibt Entscheidungen, nicht eine feste Gruppenzusammenstellung."],
    "mistake-tolerance": ["Wie möchtest du aus Fehlern lernen?", "Wähle die Fehlerart, die du wiederholt verbessern möchtest."],
  },
  es: {
    contribution: ["¿Qué quieres aportar principalmente al combate?", "Elige la contribución que más te atraiga, sin importar tu experiencia."],
    "combat-rhythm": ["¿Qué ritmo de combate prefieres?", "Es una preferencia de ritmo, no una medida de rendimiento."],
    "learning-load": ["¿Qué carga de aprendizaje aceptas?", "Más carga no significa más poder; todas las clases requieren práctica."],
    "preferred-position": ["¿Dónde quieres centrar tu atención?", "Elige la perspectiva de combate más natural."],
    "party-responsibility": ["¿Cuánta responsabilidad de grupo quieres?", "La responsabilidad describe decisiones, no una composición fija."],
    "mistake-tolerance": ["¿Cómo quieres practicar tras cometer errores?", "Elige el tipo de error que aceptarías mejorar repetidamente."],
  },
  ja: {
    contribution: ["戦闘で最も貢献したいことは？", "現在の経験に関係なく、魅力を感じる主な役割を選んでください。"],
    "combat-rhythm": ["好みの戦闘テンポは？", "テンポの好みであり、クラス火力の評価ではありません。"],
    "learning-load": ["どの学習負担なら受け入れられますか？", "負担が高いほど強いわけではなく、低くても練習は必要です。"],
    "preferred-position": ["どこに注意を向けたいですか？", "最も自然に感じる戦場の視点を選んでください。"],
    "party-responsibility": ["どの程度パーティ責任を担いたいですか？", "責任は判断負担を表し、固定編成を意味しません。"],
    "mistake-tolerance": ["ミスを通してどう練習したいですか？", "繰り返し改善したいミスの種類を選んでください。"],
  },
  "pt-br": {
    contribution: ["O que você mais quer oferecer no combate?", "Escolha a contribuição que mais atrai você, independentemente da experiência."],
    "combat-rhythm": ["Qual ritmo de combate você prefere?", "É uma preferência de ritmo, não uma medida de desempenho."],
    "learning-load": ["Que carga de aprendizado você aceita?", "Carga maior não significa força maior; todas as classes exigem prática."],
    "preferred-position": ["Onde você quer concentrar a atenção?", "Escolha a perspectiva de batalha mais natural."],
    "party-responsibility": ["Quanta responsabilidade no grupo você quer?", "Responsabilidade descreve decisões, não uma composição fixa."],
    "mistake-tolerance": ["Como você quer praticar após erros?", "Escolha o tipo de erro que aceita melhorar repetidamente."],
  },
  ru: {
    contribution: ["Какой вклад в бой для вас важнее всего?", "Выберите наиболее привлекательную роль независимо от текущего опыта."],
    "combat-rhythm": ["Какой ритм боя вы предпочитаете?", "Это предпочтение темпа, а не оценка силы класса."],
    "learning-load": ["Какую сложность обучения вы готовы принять?", "Больше нагрузки не означает больше силы; любой класс требует практики."],
    "preferred-position": ["На чём вы хотите сосредоточиться?", "Выберите наиболее естественный для вас взгляд на поле боя."],
    "party-responsibility": ["Сколько ответственности за группу вы хотите?", "Речь о нагрузке решений, а не о фиксированном составе."],
    "mistake-tolerance": ["Как вы хотите учиться на ошибках?", "Выберите тип ошибок, который готовы разбирать и исправлять."],
  },
};

const optionIds = [
  "frontline-damage", "protect-allies", "ranged-offence", "restore-allies",
  "flexible-support", "weaken-and-control", "steady-front-pressure",
  "decisive-window", "move-at-range", "layered-effects", "react-to-party",
  "clear-baseline", "precise-execution", "positioning-work", "multiple-states",
  "team-decisions", "at-the-front", "at-range", "with-the-party",
  "adapt-as-needed", "own-pressure", "support-when-needed", "lead-and-protect",
  "healing-priority", "forgiving-baseline", "repeat-precision",
  "improve-check-order", "review-team-decisions",
] as const;

const optionLabelLists: Record<ClassFinderEditorialLocale, readonly string[]> = {
  "zh-hans": ["前线输出","保护队友","远程攻击","维持队友生命","灵活辅助","削弱与控制","持续前线压制","短时间集中爆发","移动并保持距离","叠加并追踪效果","根据队伍反应","建立清晰可重复的基础循环","精准时机与连锁决策","走位与移动路线","多层信息与状态","高责任队伍决策","位于前线","保持远程","围绕队伍核心","按需要调整","专注个人压制","输出并在需要时协助","带领并保护","负责治疗优先级","从更宽容的基础开始","反复练习进场与执行时机","改进信息检查顺序","复盘影响队伍的决策"],
  fr: ["dégâts en première ligne","protéger les alliés","attaque à distance","maintenir les alliés en vie","soutien polyvalent","affaiblir et contrôler","pression continue au front","agir dans une courte fenêtre","bouger et garder la distance","superposer et suivre les effets","réagir à l’état du groupe","construire une base claire et répétable","timing précis et décisions en chaîne","positionnement et itinéraires","informations et états superposés","décisions d’équipe à forte responsabilité","en première ligne","à distance","autour du cœur du groupe","s’adapter selon le besoin","me concentrer sur ma pression","infliger des dégâts et aider au besoin","mener et protéger","gérer les priorités de soin","commencer avec une base plus tolérante","répéter l’entrée et le timing d’exécution","améliorer l’ordre de vérification","revoir les décisions qui touchent le groupe"],
  de: ["Schaden an der Front","Verbündete schützen","Fernkampfangriff","Verbündete am Leben halten","flexible Unterstützung","schwächen und kontrollieren","stetiger Druck an der Front","kurzes Entscheidungsfenster nutzen","bewegen und Abstand halten","Effekte schichten und verfolgen","auf die Gruppe reagieren","klare wiederholbare Basis aufbauen","präzises Timing und verkettete Entscheidungen","Position und Bewegungswege","mehrere Informationen und Zustände","Teamentscheidungen mit hoher Verantwortung","an der Front","auf Distanz","im Kern der Gruppe","nach Bedarf anpassen","auf eigenen Druck konzentrieren","Schaden verursachen und bei Bedarf helfen","führen und schützen","Heilprioritäten übernehmen","mit fehlertoleranter Basis beginnen","Einstieg und Ausführung wiederholen","Informationsprüfung verbessern","gruppenrelevante Entscheidungen prüfen"],
  es: ["daño en primera línea","proteger a los aliados","ataque a distancia","mantener vivos a los aliados","apoyo flexible","debilitar y controlar","presión constante al frente","actuar en una ventana breve","moverse y mantener distancia","acumular y vigilar efectos","reaccionar al grupo","crear una base clara y repetible","tiempo preciso y decisiones encadenadas","posición y rutas de movimiento","información y estados superpuestos","decisiones de grupo de alta responsabilidad","en primera línea","a distancia","alrededor del núcleo del grupo","adaptarse según sea necesario","centrarme en mi presión","hacer daño y ayudar cuando sea necesario","liderar y proteger","asumir prioridades de curación","empezar con una base más tolerante","repetir entrada y ejecución","mejorar el orden de comprobación","revisar decisiones que afectan al grupo"],
  ja: ["前線でダメージを与える","味方を守る","遠距離攻撃","味方を生存させる","柔軟な支援","弱体化と制御","前線で継続的に圧力をかける","短い好機に集中する","移動しながら距離を保つ","効果を重ねて追跡する","パーティ状況に反応する","明確で反復可能な基礎を作る","正確なタイミングと連続判断","位置取りと移動ルート","複数の情報と状態","責任の大きいチーム判断","前線","遠距離","パーティの中心付近","必要に応じて適応","自分の攻撃に集中","攻撃しつつ必要時に支援","先導して守る","回復優先順位を担う","許容度の高い基礎から始める","進入と実行タイミングを反復","情報確認の順序を改善","パーティに影響する判断を振り返る"],
  "pt-br": ["dano na linha de frente","proteger aliados","ataque à distância","manter aliados vivos","suporte flexível","enfraquecer e controlar","pressão constante na frente","agir em uma janela curta","mover e manter distância","combinar e acompanhar efeitos","reagir ao grupo","criar uma base clara e repetível","tempo preciso e decisões encadeadas","posição e rotas de movimento","informações e estados em camadas","decisões de equipe de alta responsabilidade","na linha de frente","à distância","ao redor do núcleo do grupo","adaptar conforme necessário","focar na minha pressão","causar dano e ajudar quando necessário","liderar e proteger","assumir prioridades de cura","começar com uma base mais tolerante","repetir entrada e execução","melhorar a ordem de verificação","revisar decisões que afetam o grupo"],
  ru: ["урон на передовой","защита союзников","дальняя атака","поддержание жизни союзников","гибкая поддержка","ослабление и контроль","постоянное давление на передовой","действия в коротком окне","движение с сохранением дистанции","наложение и отслеживание эффектов","реакция на состояние группы","ясная повторяемая основа","точный тайминг и цепочка решений","позиционирование и маршруты","несколько слоёв информации и состояний","ответственные командные решения","на передовой","на дистанции","рядом с ядром группы","адаптация по ситуации","сосредоточиться на своём давлении","наносить урон и помогать при необходимости","вести и защищать","отвечать за приоритет лечения","начать с более терпимой основы","повторять вход и момент исполнения","улучшать порядок проверки информации","разбирать решения, влияющие на группу"],
};

const optionDescription = {
  "zh-hans": (label: string) => `这个选择会在推荐中提高“${label}”相关玩法的权重。`,
  fr: (label: string) => `Ce choix augmente le poids du style « ${label} » dans la recommandation.`,
  de: (label: string) => `Diese Antwort gewichtet den Spielstil „${label}“ in der Empfehlung stärker.`,
  es: (label: string) => `Esta opción aumenta el peso del estilo «${label}» en la recomendación.`,
  ja: (label: string) => `この回答では「${label}」に関するプレイ傾向の比重が高くなります。`,
  "pt-br": (label: string) => `Esta opção aumenta o peso do estilo “${label}” na recomendação.`,
  ru: (label: string) => `Этот ответ повышает вес предпочтения «${label}» в рекомендации.`,
} satisfies Record<ClassFinderEditorialLocale, (label: string) => string>;

export function getEditorialQuestionCopy(
  locale: ClassFinderEditorialLocale,
  questionId: ClassFinderQuestionId,
) {
  const [title, hint] = questionTitles[locale][questionId];
  return { title, hint };
}

export function getEditorialOptionCopy(
  locale: ClassFinderEditorialLocale,
  optionId: string,
) {
  const index = optionIds.indexOf(optionId as (typeof optionIds)[number]);
  const label = index >= 0 ? optionLabelLists[locale][index] : optionIds[0];
  return {
    label,
    description: optionDescription[locale](label),
  };
}

type ProfileCopy = {
  name: string;
  weapon: string;
  officialRole: string;
  summary: string;
};

const localizedClassNames: Record<
  ClassFinderEditorialLocale,
  Record<ClassFinderClassId, readonly [string, string]>
> = {
  "zh-hans": { gladiator:["剑星","巨剑"],templar:["守护星","长剑与盾"],assassin:["杀星","双短剑"],ranger:["弓星","弓"],sorcerer:["魔道星","魔法书"],spiritmaster:["精灵星","宝珠"],cleric:["治愈星","战锤"],chanter:["护法星","法杖"] },
  fr: { gladiator:["Gladiateur","Espadon"],templar:["Templier","Épée longue et bouclier"],assassin:["Assassin","Doubles dagues"],ranger:["Rôdeur","Arc"],sorcerer:["Sorcier","Grimoire"],spiritmaster:["Spiritualiste","Orbe"],cleric:["Clerc","Masse"],chanter:["Aède","Bâton"] },
  de: { gladiator:["Gladiator","Großschwert"],templar:["Templer","Langschwert und Schild"],assassin:["Assassine","Doppeldolche"],ranger:["Jäger","Bogen"],sorcerer:["Zauberer","Zauberbuch"],spiritmaster:["Beschwörer","Sphäre"],cleric:["Kleriker","Streitkolben"],chanter:["Kantor","Stab"] },
  es: { gladiator:["Gladiador","Mandoble"],templar:["Templario","Espada larga y escudo"],assassin:["Asesino","Dagas dobles"],ranger:["Explorador","Arco"],sorcerer:["Hechicero","Grimorio"],spiritmaster:["Maestro espiritual","Orbe"],cleric:["Clérigo","Maza"],chanter:["Cantor","Bastón"] },
  ja: { gladiator:["ソード ウイング","グレートソード"],templar:["シールド ウイング","ロングソードとシールド"],assassin:["シャドウ ウイング","デュアルダガー"],ranger:["ボウ ウイング","ボウ"],sorcerer:["スペル ウイング","スペルブック"],spiritmaster:["スピリット ウイング","オーブ"],cleric:["キュア ウイング","メイス"],chanter:["チャント ウイング","スタッフ"] },
  "pt-br": { gladiator:["Gladiador","Espadão"],templar:["Templário","Espada longa e escudo"],assassin:["Assassino","Adagas duplas"],ranger:["Patrulheiro","Arco"],sorcerer:["Feiticeiro","Grimório"],spiritmaster:["Mestre espiritual","Orbe"],cleric:["Clérigo","Maça"],chanter:["Cantor","Cajado"] },
  ru: { gladiator:["Гладиатор","Двуручный меч"],templar:["Храмовник","Длинный меч и щит"],assassin:["Убийца","Парные кинжалы"],ranger:["Стрелок","Лук"],sorcerer:["Чародей","Книга заклинаний"],spiritmaster:["Заклинатель","Сфера"],cleric:["Целитель","Булава"],chanter:["Чантр","Посох"] },
};

const roleKeys: Record<ClassFinderClassId, string> = {
  gladiator: "frontDamage", templar: "tank", assassin: "burst", ranger: "ranged",
  sorcerer: "magic", spiritmaster: "summon", cleric: "healer", chanter: "support",
};

const roleText: Record<
  ClassFinderEditorialLocale,
  Record<string, readonly [string, string]>
> = {
  "zh-hans": {
    frontDamage:["高攻击、高防御的近战输出，也可承担副坦职责。","适合喜欢持续前线压制并判断攻防时机的玩家。"],
    tank:["负责格挡攻击并保护队友的前线坦克。","适合喜欢前线站位、保护时机和主要队伍责任的玩家。"],
    burst:["利用隐身、快速连段和状态效果进行短窗口压制的精准近战。","适合愿意练习进场、集中操作、目标选择和安全脱离的玩家。"],
    ranged:["围绕站位、时机和战术反应展开的远程攻击职业。","适合边移动边管理安全距离、视线和攻击窗口的玩家。"],
    magic:["以短窗口高魔法伤害为主，并需管理距离和控制。","适合喜欢远程站位、短爆发窗口和控制决策的玩家。"],
    summon:["利用元素精灵、状态效果和持续伤害削弱敌人的召唤职业。","适合同时管理召唤物、持续效果、目标状态和个人站位的玩家。"],
    healer:["维持队友生命与战斗续航的核心治疗。","适合愿意观察多名队友、保持自身安全并负责治疗优先级的玩家。"],
    support:["用真言强化队友，同时提供控制、副治疗和伤害的辅助。","适合希望承担主要辅助职责并在控制、治疗和输出间切换的玩家。"],
  },
  fr: {
    frontDamage:["DPS de mêlée offensif et résistant, également capable d’assister le tank.","Pour les joueurs attirés par une pression constante au front et les décisions attaque-défense."],
    tank:["Tank de première ligne qui bloque les attaques et protège les alliés.","Pour ceux qui veulent gérer le placement, la protection et la responsabilité principale du groupe."],
    burst:["Mêlée précise utilisant furtivité, enchaînements rapides et états dans une courte fenêtre.","Pour ceux qui veulent répéter entrée, exécution, choix de cible et retrait sûr."],
    ranged:["Attaquant à distance fondé sur le placement, le timing et la réaction tactique.","Pour gérer la portée sûre, les lignes de vue et les fenêtres d’attaque en mouvement."],
    magic:["DPS magique à distance concentré dans de courtes fenêtres, avec gestion de portée et contrôle.","Pour les joueurs attirés par le placement à distance, les fenêtres de pression et le contrôle."],
    summon:["Invocateur utilisant esprits élémentaires, altérations et dégâts persistants.","Pour suivre invocation, effets persistants, états de la cible et positionnement."],
    healer:["Soigneur principal qui maintient les alliés et l’endurance du groupe.","Pour lire plusieurs états alliés et gérer les priorités de soin en restant en sécurité."],
    support:["Soutien qui renforce le groupe et ajoute contrôle, soins secondaires et dégâts.","Pour alterner progressivement entre contrôle, soin et dégâts autour d’un rôle de soutien."],
  },
  de: {
    frontDamage:["Offensive und robuste Nahkampfklasse, die auch als Nebentank dienen kann.","Für Spieler, die stetigen Frontdruck und Angriffs-Verteidigungs-Entscheidungen mögen."],
    tank:["Fronttank, der Angriffe blockt und Verbündete schützt.","Für Frontpositionierung, Schutz-Timing und zentrale Gruppenverantwortung."],
    burst:["Präziser Nahkämpfer mit Tarnung, schnellen Ketten und Zuständen im kurzen Zeitfenster.","Für Spieler, die Einstieg, komprimierte Ausführung, Zielwahl und Rückzug üben wollen."],
    ranged:["Fernangreifer, dessen Spiel von Position, Timing und taktischer Reaktion geprägt ist.","Für sichere Distanz, Sichtlinien und Angriffsfenster in Bewegung."],
    magic:["Fernkampfklasse mit hohem Magieschaden in kurzen Fenstern sowie Reichweiten- und Kontrollmanagement.","Für Fernposition, kurze Druckfenster und Kontrollentscheidungen."],
    summon:["Beschwörer mit Elementargeistern, Zuständen und Schaden über Zeit.","Für Spieler, die Beschwörung, Effekte, Zielzustände und Position zusammen verfolgen."],
    healer:["Zentraler Heiler für Lebenspunkte und Kampfausdauer der Verbündeten.","Für das Lesen mehrerer Verbündeten-Zustände und verantwortliche Heilprioritäten."],
    support:["Unterstützer mit Mantras, Kontrolle, zusätzlicher Heilung und Schaden.","Für Spieler, die zwischen Kontrolle, Heilung und Schaden wechseln möchten."],
  },
  es: {
    frontDamage:["Atacante cuerpo a cuerpo ofensivo y resistente que también puede apoyar como tanque.","Para quien disfruta de presión frontal constante y decisiones de ataque y defensa."],
    tank:["Tanque de primera línea que bloquea ataques y protege aliados.","Para quien quiere posición frontal, protección y responsabilidad principal del grupo."],
    burst:["Atacante preciso con sigilo, cadenas rápidas y estados en una ventana breve.","Para practicar entrada, ejecución concentrada, elección de objetivo y retirada segura."],
    ranged:["Atacante a distancia definido por posición, tiempo y respuesta táctica.","Para gestionar distancia segura, línea de visión y ventanas de ataque al moverse."],
    magic:["Atacante mágico a distancia de alto daño en ventanas breves, con gestión de alcance y control.","Para quien prefiere posición a distancia, presión breve y decisiones de control."],
    summon:["Invocador que usa espíritus, estados y daño persistente para debilitar enemigos.","Para controlar invocación, efectos, estados del objetivo y posición al mismo tiempo."],
    healer:["Sanador central que mantiene la salud y resistencia del grupo.","Para leer estados aliados y asumir prioridades de curación sin descuidar la seguridad."],
    support:["Apoyo que fortalece aliados y aporta control, curación secundaria y daño.","Para alternar entre control, curación y daño desde una función principal de apoyo."],
  },
  ja: {
    frontDamage:["攻撃力と防御力を備え、サブタンクも担える近接攻撃役です。","前線で圧力を維持し、攻防の判断を楽しみたい人に向きます。"],
    tank:["攻撃を防ぎ、味方を守る前線タンクです。","前線の位置取り、保護のタイミング、パーティの主責任を担いたい人向けです。"],
    burst:["隠密、高速連携、状態効果で短時間に圧力を集中する精密な近接役です。","進入、集中操作、対象選択、安全な離脱を繰り返し練習したい人向けです。"],
    ranged:["位置取り、タイミング、戦術的対応が重要な遠距離攻撃役です。","移動しながら安全距離、視線、攻撃機会を管理したい人向けです。"],
    magic:["短時間の高い魔法ダメージを軸に、射程と制御を管理する遠距離役です。","遠距離の位置取り、短い攻撃機会、制御判断を好む人向けです。"],
    summon:["精霊、状態効果、持続ダメージで敵を弱体化する召喚役です。","召喚、持続効果、対象状態、自分の位置を同時に管理したい人向けです。"],
    healer:["味方の体力と戦闘継続を支える中核ヒーラーです。","複数の味方を確認し、安全を保ちながら回復優先順位を担いたい人向けです。"],
    support:["味方を強化し、制御、副回復、ダメージも行う支援役です。","主な支援責任を持ちつつ、制御・回復・攻撃を切り替えたい人向けです。"],
  },
  "pt-br": {
    frontDamage:["Atacante corpo a corpo ofensivo e resistente, capaz de ajudar como tanque.","Para quem gosta de pressão constante na frente e decisões de ataque e defesa."],
    tank:["Tanque de linha de frente que bloqueia ataques e protege aliados.","Para quem quer posicionamento frontal, tempo de proteção e responsabilidade principal no grupo."],
    burst:["Atacante preciso com furtividade, sequências rápidas e estados em uma janela curta.","Para praticar entrada, execução concentrada, escolha de alvo e saída segura."],
    ranged:["Atacante à distância definido por posição, tempo e resposta tática.","Para gerenciar distância segura, linha de visão e janelas de ataque em movimento."],
    magic:["Atacante mágico à distância com alto dano em janelas curtas e gestão de controle.","Para quem prefere posição distante, pressão curta e decisões de controle."],
    summon:["Invocador que usa espíritos, estados e dano contínuo para enfraquecer inimigos.","Para acompanhar invocação, efeitos, estados do alvo e posição ao mesmo tempo."],
    healer:["Curandeiro principal que mantém a vida e resistência do grupo.","Para ler estados aliados e assumir prioridades de cura sem perder a segurança."],
    support:["Suporte que fortalece aliados e oferece controle, cura secundária e dano.","Para alternar entre controle, cura e dano a partir de uma função principal de suporte."],
  },
  ru: {
    frontDamage:["Сильный и стойкий боец ближнего боя, способный помогать в роли второго танка.","Для любителей постоянного давления на передовой и решений между атакой и защитой."],
    tank:["Танк передовой, блокирующий атаки и защищающий союзников.","Для тех, кому нравится позиционирование, момент защиты и главная ответственность за группу."],
    burst:["Точный боец ближнего боя со скрытностью, быстрыми цепочками и состояниями в коротком окне.","Для практики входа, плотного исполнения, выбора цели и безопасного отхода."],
    ranged:["Дальний атакующий, зависящий от позиции, тайминга и тактической реакции.","Для управления безопасной дистанцией, линией обзора и окнами атаки в движении."],
    magic:["Дальний магический атакующий с высоким уроном в коротких окнах и управлением контроля.","Для любителей дальней позиции, коротких окон давления и решений контроля."],
    summon:["Призыватель, использующий духов, состояния и периодический урон для ослабления врага.","Для одновременного контроля призыва, эффектов, состояния цели и своей позиции."],
    healer:["Главный лекарь, поддерживающий здоровье и боевую выносливость союзников.","Для чтения нескольких состояний союзников и выбора приоритетов лечения."],
    support:["Поддержка, усиливающая союзников и добавляющая контроль, вторичное лечение и урон.","Для переключения между контролем, лечением и уроном вокруг основной роли поддержки."],
  },
};

export function getEditorialProfileCopy(
  locale: ClassFinderEditorialLocale,
  classId: ClassFinderClassId,
): ProfileCopy {
  const [name, weapon] = localizedClassNames[locale][classId];
  const [officialRole, summary] = roleText[locale][roleKeys[classId]];
  return { name, weapon, officialRole, summary };
}

export const editorialClassFinderDataCopy = {
  "zh-hans": {
    kicker:"AION2 互动工具",title:"AION2 职业推荐器",description:"回答六个偏好问题，从八个基础职业中选出三个候选，再前往职业攻略核对实际玩法。",privacy:"无需登录；答案只在浏览器中处理，除非你主动保存或分享。",start:"开始匹配",progress:"完成进度",back:"上一题",next:"下一题",restart:"重新测试",resultsTitle:"你的职业候选",resultsDescription:"结果按偏好匹配排列。请保留两到三个候选并查看攻略。",save:"保存结果",saved:"已保存",share:"分享结果",shared:"分享链接已复制",copyFailed:"无法复制，请手动复制网址。",classesOverview:"查看八大基础职业",guide:"阅读职业攻略",primaryMatch:"最高匹配",matchedPreferences:"匹配偏好",disclaimer:"这是 KINA 按玩法偏好制作的编辑推荐，不是 NC 官方排名，也不代表职业强度、伤害、胜率或 Tier。",methodNote:"职业名称、武器和高层定位依据目前可核对的 NC 资料；偏好维度与权重属于 KINA 编辑模型。",incomplete:"完成全部六题后即可查看三个候选职业。"
  },
  fr: {
    kicker:"OUTIL INTERACTIF AION2",title:"Sélecteur de classe AION2",description:"Répondez à six questions pour retenir trois des huit classes de base, puis consultez leurs guides.",privacy:"Aucune connexion requise ; les réponses restent dans votre navigateur sauf partage.",start:"Commencer",progress:"Progression",back:"Retour",next:"Suivant",restart:"Recommencer",resultsTitle:"Vos classes candidates",resultsDescription:"Les résultats sont triés par affinité. Gardez deux ou trois options et consultez leurs guides.",save:"Enregistrer",saved:"Enregistré",share:"Partager",shared:"Lien copié",copyFailed:"Copie impossible ; copiez l’URL manuellement.",classesOverview:"Voir les huit classes",guide:"Lire le guide",primaryMatch:"Meilleure affinité",matchedPreferences:"Préférences associées",disclaimer:"Ce résultat éditorial KINA n’est ni un classement officiel NC, ni une mesure de puissance, dégâts, victoire ou Tier.",methodNote:"Noms, armes et rôles généraux suivent les données NC vérifiables ; dimensions et poids relèvent du modèle éditorial KINA.",incomplete:"Répondez aux six questions pour voir trois classes."
  },
  de: {
    kicker:"INTERAKTIVES AION2-TOOL",title:"AION2-Klassenfinder",description:"Beantworte sechs Fragen, um drei der acht Basisklassen auszuwählen und ihre Guides zu prüfen.",privacy:"Keine Anmeldung; Antworten bleiben im Browser, sofern du nicht speicherst oder teilst.",start:"Abgleich starten",progress:"Fortschritt",back:"Zurück",next:"Weiter",restart:"Neu testen",resultsTitle:"Deine Klassenauswahl",resultsDescription:"Ergebnisse sind nach Passung sortiert. Behalte zwei oder drei Kandidaten und lies ihre Guides.",save:"Ergebnis speichern",saved:"Gespeichert",share:"Teilen",shared:"Link kopiert",copyFailed:"Kopieren fehlgeschlagen; kopiere die URL manuell.",classesOverview:"Alle acht Klassen ansehen",guide:"Klassenguide lesen",primaryMatch:"Beste Passung",matchedPreferences:"Passende Vorlieben",disclaimer:"Dies ist eine redaktionelle KINA-Empfehlung, kein offizielles NC-Ranking und keine Aussage zu Stärke, Schaden, Siegrate oder Tier.",methodNote:"Namen, Waffen und Rollen folgen prüfbarem NC-Material; Dimensionen und Gewichtung sind das KINA-Modell.",incomplete:"Beantworte alle sechs Fragen, um drei Klassen zu sehen."
  },
  es: {
    kicker:"HERRAMIENTA INTERACTIVA AION2",title:"Selector de clase de AION2",description:"Responde seis preguntas para elegir tres de las ocho clases base y consultar sus guías.",privacy:"No hace falta iniciar sesión; las respuestas quedan en el navegador salvo que guardes o compartas.",start:"Iniciar selección",progress:"Progreso",back:"Atrás",next:"Siguiente",restart:"Repetir",resultsTitle:"Tus clases candidatas",resultsDescription:"Los resultados se ordenan por afinidad. Conserva dos o tres candidatos y lee sus guías.",save:"Guardar resultado",saved:"Guardado",share:"Compartir",shared:"Enlace copiado",copyFailed:"No se pudo copiar; copia la URL manualmente.",classesOverview:"Ver las ocho clases",guide:"Leer guía",primaryMatch:"Mayor afinidad",matchedPreferences:"Preferencias afines",disclaimer:"Esta recomendación editorial de KINA no es un ranking oficial de NC ni mide poder, daño, victorias o Tier.",methodNote:"Nombres, armas y funciones siguen material verificable de NC; dimensiones y pesos son del modelo editorial KINA.",incomplete:"Responde las seis preguntas para ver tres clases."
  },
  ja: {
    kicker:"AION2インタラクティブツール",title:"AION2クラス診断",description:"6つの質問に答えて8つの基本クラスから3候補を選び、攻略で実際のプレイを確認します。",privacy:"ログイン不要。保存または共有しない限り、回答はブラウザ内で処理されます。",start:"診断を始める",progress:"進行状況",back:"戻る",next:"次へ",restart:"再診断",resultsTitle:"あなたのクラス候補",resultsDescription:"結果は適合度順です。2～3候補の攻略を読み、実際のバージョンで確認してください。",save:"結果を保存",saved:"保存済み",share:"結果を共有",shared:"共有リンクをコピーしました",copyFailed:"コピーできません。URLを手動でコピーしてください。",classesOverview:"8つの基本クラスを見る",guide:"クラス攻略を読む",primaryMatch:"最高適合",matchedPreferences:"一致した好み",disclaimer:"KINAの編集上の適性診断であり、NC公式ランキングやクラス性能、ダメージ、勝率、Tierを示すものではありません。",methodNote:"名称、武器、上位役割は確認可能なNC資料に基づき、好みの軸と重み付けはKINA編集モデルです。",incomplete:"6問すべてに答えると3つの候補を表示します。"
  },
  "pt-br": {
    kicker:"FERRAMENTA INTERATIVA AION2",title:"Seletor de classe de AION2",description:"Responda seis perguntas para escolher três das oito classes básicas e consultar seus guias.",privacy:"Sem login; as respostas ficam no navegador, a menos que você salve ou compartilhe.",start:"Iniciar seleção",progress:"Progresso",back:"Voltar",next:"Avançar",restart:"Refazer",resultsTitle:"Suas classes candidatas",resultsDescription:"Os resultados são ordenados por afinidade. Mantenha duas ou três opções e leia seus guias.",save:"Salvar resultado",saved:"Salvo",share:"Compartilhar",shared:"Link copiado",copyFailed:"Não foi possível copiar; copie a URL manualmente.",classesOverview:"Ver as oito classes",guide:"Ler guia",primaryMatch:"Maior afinidade",matchedPreferences:"Preferências compatíveis",disclaimer:"Esta recomendação editorial da KINA não é ranking oficial da NC nem mede poder, dano, vitórias ou Tier.",methodNote:"Nomes, armas e funções seguem material verificável da NC; dimensões e pesos são do modelo editorial KINA.",incomplete:"Responda às seis perguntas para ver três classes."
  },
  ru: {
    kicker:"ИНТЕРАКТИВНЫЙ ИНСТРУМЕНТ AION2",title:"Подбор класса AION2",description:"Ответьте на шесть вопросов, чтобы выбрать три из восьми базовых классов и проверить их гайды.",privacy:"Вход не нужен; ответы остаются в браузере, если вы не сохраняете или не публикуете результат.",start:"Начать подбор",progress:"Прогресс",back:"Назад",next:"Далее",restart:"Пройти заново",resultsTitle:"Ваши кандидаты",resultsDescription:"Результаты отсортированы по соответствию. Оставьте два-три варианта и прочитайте их гайды.",save:"Сохранить",saved:"Сохранено",share:"Поделиться",shared:"Ссылка скопирована",copyFailed:"Не удалось скопировать; скопируйте URL вручную.",classesOverview:"Посмотреть восемь классов",guide:"Читать гайд",primaryMatch:"Лучшее соответствие",matchedPreferences:"Совпавшие предпочтения",disclaimer:"Это редакционная рекомендация KINA, а не официальный рейтинг NC и не оценка силы, урона, побед или Tier.",methodNote:"Названия, оружие и роли следуют проверяемым материалам NC; параметры и веса принадлежат редакционной модели KINA.",incomplete:"Ответьте на все шесть вопросов, чтобы увидеть три класса."
  },
} as const satisfies Record<ClassFinderEditorialLocale, {
  kicker:string;title:string;description:string;privacy:string;start:string;progress:string;back:string;next:string;restart:string;resultsTitle:string;resultsDescription:string;save:string;saved:string;share:string;shared:string;copyFailed:string;classesOverview:string;guide:string;primaryMatch:string;matchedPreferences:string;disclaimer:string;methodNote:string;incomplete:string;
}>;

export const editorialScopeNotes: Record<ClassFinderEditorialLocale, string> = {
  "zh-hans":"本工具只涵盖目前可从全球官方名单核对的八个基础职业，不预测全球版平衡、首发强度或未来新增职业。",
  fr:"Cet outil couvre uniquement les huit classes de base vérifiables dans la liste Global actuelle ; il ne prédit ni l’équilibrage, ni la puissance au lancement, ni les ajouts futurs.",
  de:"Dieses Tool umfasst nur die acht derzeit für Global bestätigten Basisklassen und sagt weder Balance noch Startstärke oder künftige Klassen voraus.",
  es:"Esta herramienta solo cubre las ocho clases base verificables de Global; no predice equilibrio, poder de lanzamiento ni clases futuras.",
  ja:"本ツールは現在Global公式で確認できる8つの基本クラスのみを対象とし、バランス、開始時の強さ、今後の追加は予測しません。",
  "pt-br":"Esta ferramenta cobre apenas as oito classes básicas verificáveis de Global; não prevê equilíbrio, força no lançamento ou classes futuras.",
  ru:"Инструмент охватывает только восемь базовых классов, подтверждённых для Global, и не прогнозирует баланс, силу на старте или будущие классы.",
};

export function editorialResultReason(
  locale: ClassFinderEditorialLocale,
  preferences: readonly string[],
) {
  const joined = preferences.join(locale === "ja" || locale === "zh-hans" ? "、" : " + ");
  switch (locale) {
    case "zh-hans": return `你对“${joined}”的偏好与这个职业的定位较为接近。`;
    case "fr": return `Vos préférences « ${joined} » correspondent assez bien au profil de cette classe.`;
    case "de": return `Deine Vorlieben „${joined}“ passen vergleichsweise gut zu diesem Klassenprofil.`;
    case "es": return `Tus preferencias «${joined}» encajan relativamente bien con el perfil de esta clase.`;
    case "ja": return `「${joined}」という好みが、このクラスの特徴と比較的よく合います。`;
    case "pt-br": return `Suas preferências “${joined}” combinam relativamente bem com o perfil desta classe.`;
    case "ru": return `Ваши предпочтения «${joined}» сравнительно хорошо соответствуют профилю этого класса.`;
  }
}
