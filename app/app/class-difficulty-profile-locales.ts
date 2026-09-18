import type { SiteLocale } from "./site-config";

export const editorialClassProfileLocales = [
  "zh-hans",
  "fr",
  "de",
  "es",
  "ja",
  "pt-br",
  "ru",
] as const;

export type EditorialClassProfileLocale =
  (typeof editorialClassProfileLocales)[number];

export type ClassDifficultyClassId =
  | "gladiator"
  | "templar"
  | "assassin"
  | "ranger"
  | "sorcerer"
  | "spiritmaster"
  | "cleric"
  | "chanter"
  | "brawler";

export type ClassProfileLocalizedFact = {
  name: string;
  weapon: string;
  officialRole: string;
  assessmentSummary: string;
};

export const classDifficultyProfileTranslations: Readonly<
  Record<
    ClassDifficultyClassId,
    Readonly<Record<EditorialClassProfileLocale, ClassProfileLocalizedFact>>
  >
> = {
  gladiator: {
    "zh-hans": {
      name: "剑星",
      weapon: "大剑",
      officialRole: "高攻防的近战输出，官方也提到可兼任副坦克。",
      assessmentSummary:
        "基本职责容易理解，但贴身输出、战线判断与攻守切换会提高精通门槛。",
    },
    fr: {
      name: "Gladiateur",
      weapon: "Espadon",
      officialRole:
        "Un combattant de mêlée à l'attaque et à la défense élevées, également présenté par NC comme capable d'assurer un rôle de tank secondaire.",
      assessmentSummary:
        "Le rôle de base est facile à comprendre, mais le maintien au contact, la lecture de la ligne de front et l'alternance attaque-défense augmentent la difficulté de maîtrise.",
    },
    de: {
      name: "Gladiator",
      weapon: "Zweihandschwert",
      officialRole:
        "Ein Nahkampf-Schadensausteiler mit hoher Angriffs- und Verteidigungskraft, den NC auch als möglichen Nebentank beschreibt.",
      assessmentSummary:
        "Die Grundaufgabe ist leicht verständlich; Nahkampf-Uptime, Frontlinienentscheidungen und der Wechsel zwischen Angriff und Verteidigung erhöhen jedoch den Lernaufwand.",
    },
    es: {
      name: "Gladiador",
      weapon: "Mandoble",
      officialRole:
        "Un atacante cuerpo a cuerpo con ataque y defensa altos que, según NC, también puede actuar como tanque secundario.",
      assessmentSummary:
        "La responsabilidad básica es fácil de entender, pero mantener el contacto, leer el frente y alternar entre ataque y defensa elevan la dificultad de dominio.",
    },
    ja: {
      name: "ソード ウイング",
      weapon: "グレートソード",
      officialRole:
        "高い攻撃力と防御力を備え、NC公式ではサブタンクも担えると説明される近接アタッカーです。",
      assessmentSummary:
        "基本的な役割は理解しやすい一方、近接距離の維持、前線判断、攻守の切り替えが習熟負担を高めます。",
    },
    "pt-br": {
      name: "Gladiador",
      weapon: "Espadão",
      officialRole:
        "Um combatente corpo a corpo com ataque e defesa elevados que, segundo a NC, também pode atuar como tanque secundário.",
      assessmentSummary:
        "A função básica é fácil de entender, mas manter o contato, ler a linha de frente e alternar entre ataque e defesa elevam a dificuldade de domínio.",
    },
    ru: {
      name: "Гладиатор",
      weapon: "Двуручный меч",
      officialRole:
        "Боец ближнего боя с высокими атакой и защитой, которого NC также описывает как способного выполнять роль второго танка.",
      assessmentSummary:
        "Базовая задача понятна, но поддержание контакта, оценка передовой и переключение между атакой и защитой повышают нагрузку при освоении.",
    },
  },
  templar: {
    "zh-hans": {
      name: "守护星",
      weapon: "长剑与盾牌",
      officialRole: "阻挡攻击、保护队友的前线坦克。",
      assessmentSummary:
        "操作本身未必最复杂，但站位、保护时机与主要承伤责任使团队玩法的精通难度很高。",
    },
    fr: {
      name: "Templier",
      weapon: "Épée longue et bouclier",
      officialRole:
        "Un tank de première ligne qui bloque les attaques et protège ses alliés.",
      assessmentSummary:
        "L'exécution n'est pas forcément la plus chargée, mais le placement, le timing de protection et la responsabilité de tank principal rendent la maîtrise en groupe exigeante.",
    },
    de: {
      name: "Templer",
      weapon: "Langschwert und Schild",
      officialRole:
        "Ein Fronttank, der Angriffe abwehrt und Verbündete schützt.",
      assessmentSummary:
        "Die Bedienung ist nicht zwingend am komplexesten, doch Positionierung, Schutzzeitpunkte und die Verantwortung als Haupttank sorgen für eine hohe Gruppen-Lernlast.",
    },
    es: {
      name: "Templario",
      weapon: "Espada larga y escudo",
      officialRole:
        "Un tanque de primera línea que bloquea ataques y protege a sus aliados.",
      assessmentSummary:
        "La ejecución no siempre es la más compleja, pero la posición, el momento de protección y la responsabilidad de tanque principal hacen muy exigente su dominio en grupo.",
    },
    ja: {
      name: "シールド ウイング",
      weapon: "ロングソードとシールド",
      officialRole:
        "攻撃を受け止め、味方を守る最前線のタンクです。",
      assessmentSummary:
        "操作量そのものより、位置取り、保護のタイミング、メインタンクとしての責任がパーティーでの習熟難度を高めます。",
    },
    "pt-br": {
      name: "Templário",
      weapon: "Espada longa e escudo",
      officialRole:
        "Um tanque de linha de frente que bloqueia ataques e protege os aliados.",
      assessmentSummary:
        "A execução pode não ser a mais complexa, mas posicionamento, tempo de proteção e responsabilidade como tanque principal tornam o domínio em grupo exigente.",
    },
    ru: {
      name: "Страж",
      weapon: "Длинный меч и щит",
      officialRole:
        "Танк передней линии, который блокирует атаки и защищает союзников.",
      assessmentSummary:
        "Управление не обязательно самое сложное, но позиционирование, своевременная защита и ответственность основного танка создают высокую групповую нагрузку.",
    },
  },
  assassin: {
    "zh-hans": {
      name: "杀星",
      weapon: "双持短剑",
      officialRole: "以隐身、快速连击与状态异常在短时间内压制目标。",
      assessmentSummary:
        "进场时机、短时间操作、目标选择与失误后的撤离要求都较高，因此入门与精通负担都偏高。",
    },
    fr: {
      name: "Assassin",
      weapon: "Dagues doubles",
      officialRole:
        "Un combattant de mêlée précis qui utilise la furtivité, des enchaînements rapides et des altérations d'état pour mettre une cible sous pression pendant une courte fenêtre.",
      assessmentSummary:
        "Le timing d'engagement, l'exécution condensée, le choix de la cible et la sortie après une erreur rendent l'apprentissage comme la maîtrise exigeants.",
    },
    de: {
      name: "Assassine",
      weapon: "Zwei Dolche",
      officialRole:
        "Eine präzise Nahkampfklasse, die Tarnung, schnelle Kombos und Statuseffekte nutzt, um ein Ziel in einem kurzen Zeitfenster unter Druck zu setzen.",
      assessmentSummary:
        "Einstiegszeitpunkt, komprimierte Ausführung, Zielwahl und Rückzug nach einem Fehler führen zu einer hohen Einstiegs- und Meisterungslast.",
    },
    es: {
      name: "Asesino",
      weapon: "Dagas dobles",
      officialRole:
        "Un combatiente cuerpo a cuerpo de precisión que usa sigilo, cadenas rápidas y estados alterados para presionar a un objetivo en una ventana breve.",
      assessmentSummary:
        "El momento de entrada, la ejecución concentrada, la elección de objetivo y la retirada tras un fallo hacen exigentes tanto el aprendizaje como el dominio.",
    },
    ja: {
      name: "シャドウ ウイング",
      weapon: "二刀のダガー",
      officialRole:
        "ハイド、高速連携、状態異常を使い、短時間で対象へ圧力を集中する精密な近接クラスです。",
      assessmentSummary:
        "突入タイミング、短時間の操作、対象選択、失敗後の離脱がいずれも重要なため、入門と習熟の負担は高めです。",
    },
    "pt-br": {
      name: "Assassino",
      weapon: "Adagas duplas",
      officialRole:
        "Um combatente corpo a corpo de precisão que usa furtividade, sequências rápidas e efeitos de estado para pressionar um alvo em uma janela curta.",
      assessmentSummary:
        "Momento de entrada, execução concentrada, escolha de alvo e recuperação após uma investida malsucedida tornam o aprendizado e o domínio exigentes.",
    },
    ru: {
      name: "Убийца",
      weapon: "Парные кинжалы",
      officialRole:
        "Точный боец ближнего боя, использующий скрытность, быстрые серии и эффекты состояний, чтобы подавить цель за короткое время.",
      assessmentSummary:
        "Момент входа, плотное выполнение комбинаций, выбор цели и отход после ошибки создают высокую нагрузку и при знакомстве, и при освоении.",
    },
  },
  ranger: {
    "zh-hans": {
      name: "弓星",
      weapon: "弓",
      officialRole: "重视站位、时机与战术应对的远距离攻击职业。",
      assessmentSummary:
        "距离能降低部分接触压力，但视线、移动路线和输出时机让站位成为主要学习成本。",
    },
    fr: {
      name: "Rôdeur",
      weapon: "Arc",
      officialRole:
        "Un attaquant à distance dont l'efficacité dépend du placement, du timing et de la réaction tactique.",
      assessmentSummary:
        "La portée réduit une partie de la pression au contact, mais la ligne de vue, les trajectoires et le timing d'attaque font du placement le principal coût d'apprentissage.",
    },
    de: {
      name: "Jäger",
      weapon: "Bogen",
      officialRole:
        "Eine Fernkampfklasse, deren Spiel von Positionierung, Timing und taktischer Reaktion geprägt ist.",
      assessmentSummary:
        "Reichweite verringert einen Teil des Nahkampfdrucks, doch Sichtlinie, Bewegungswege und Angriffsfenster machen Positionierung zur wichtigsten Lernaufgabe.",
    },
    es: {
      name: "Arquero",
      weapon: "Arco",
      officialRole:
        "Un atacante a distancia definido por la posición, el momento y la respuesta táctica.",
      assessmentSummary:
        "El alcance reduce parte de la presión de contacto, pero la línea de visión, las rutas de movimiento y los momentos de ataque convierten la posición en el principal coste de aprendizaje.",
    },
    ja: {
      name: "ボウ ウイング",
      weapon: "ボウ",
      officialRole:
        "位置取り、タイミング、戦術的な対応を重視する遠距離アタッカーです。",
      assessmentSummary:
        "射程は接触の負担を一部減らしますが、射線、移動経路、攻撃タイミングの管理が主な学習コストになります。",
    },
    "pt-br": {
      name: "Patrulheiro",
      weapon: "Arco",
      officialRole:
        "Um atacante à distância moldado por posicionamento, timing e resposta tática.",
      assessmentSummary:
        "O alcance reduz parte da pressão de contato, mas linha de visão, rotas de movimento e momento de ataque tornam o posicionamento o principal custo de aprendizado.",
    },
    ru: {
      name: "Стрелок",
      weapon: "Лук",
      officialRole:
        "Боец дальнего боя, чья эффективность зависит от позиции, момента атаки и тактической реакции.",
      assessmentSummary:
        "Дистанция снижает часть контактного давления, но линия обзора, маршруты движения и окна атаки делают позиционирование главной задачей обучения.",
    },
  },
  sorcerer: {
    "zh-hans": {
      name: "魔道星",
      weapon: "魔法书",
      officialRole: "专注短时间高魔法伤害，并需管理距离与控场的远程输出。",
      assessmentSummary:
        "目标清楚，但安全施法时段、距离与控场判断使失误成本集中在站位和时机。",
    },
    fr: {
      name: "Sorcier",
      weapon: "Grimoire",
      officialRole:
        "Un attaquant à distance spécialisé dans de lourds dégâts magiques sur une courte fenêtre, qui doit gérer portée et contrôle.",
      assessmentSummary:
        "L'objectif est clair, mais les fenêtres d'incantation sûres, la portée et les décisions de contrôle concentrent le coût des erreurs sur le placement et le timing.",
    },
    de: {
      name: "Zauberer",
      weapon: "Zauberbuch",
      officialRole:
        "Eine Fernkampfklasse mit hohem Magieschaden in kurzen Zeitfenstern, die Reichweite und Kontrolle verwalten muss.",
      assessmentSummary:
        "Das Ziel ist klar, doch sichere Zauberfenster, Distanz und Kontrollentscheidungen konzentrieren Fehlerkosten auf Positionierung und Timing.",
    },
    es: {
      name: "Hechicero",
      weapon: "Grimorio",
      officialRole:
        "Un atacante a distancia centrado en infligir mucho daño mágico en una ventana breve, con gestión de alcance y control.",
      assessmentSummary:
        "El objetivo es claro, pero las ventanas de lanzamiento seguras, la distancia y las decisiones de control concentran el coste de los errores en la posición y el momento.",
    },
    ja: {
      name: "スペル ウイング",
      weapon: "スペルブック",
      officialRole:
        "短時間の高い魔法ダメージに特化し、射程と行動妨害の管理を求められる遠距離アタッカーです。",
      assessmentSummary:
        "目的は明確ですが、安全な詠唱時間、距離、行動妨害の判断により、位置とタイミングのミスが大きく影響します。",
    },
    "pt-br": {
      name: "Feiticeiro",
      weapon: "Grimório",
      officialRole:
        "Um atacante à distância focado em alto dano mágico em uma janela curta, com necessidade de gerenciar alcance e controle.",
      assessmentSummary:
        "O objetivo é claro, mas janelas seguras de conjuração, distância e decisões de controle concentram o custo dos erros em posicionamento e timing.",
    },
    ru: {
      name: "Волшебник",
      weapon: "Гримуар",
      officialRole:
        "Боец дальнего боя с высоким магическим уроном за короткое окно, которому нужно управлять дистанцией и контролем.",
      assessmentSummary:
        "Цель понятна, но безопасные окна применения, дистанция и решения по контролю делают ошибки позиционирования и тайминга особенно дорогими.",
    },
  },
  spiritmaster: {
    "zh-hans": {
      name: "精灵星",
      weapon: "宝珠",
      officialRole: "召唤属性精灵，并以状态异常与持续伤害削弱敌人。",
      assessmentSummary:
        "召唤物、持续效果、目标状态与自身站位需同时关注，信息管理负担高于单一输出循环。",
    },
    fr: {
      name: "Spiritualiste",
      weapon: "Orbe",
      officialRole:
        "Un invocateur qui emploie des esprits élémentaires, des altérations d'état et des dégâts sur la durée pour affaiblir l'ennemi.",
      assessmentSummary:
        "L'invocation, les effets persistants, l'état de la cible et le placement personnel se disputent l'attention, ce qui alourdit la gestion d'informations.",
    },
    de: {
      name: "Beschwörer",
      weapon: "Kugel",
      officialRole:
        "Ein Beschwörer, der Elementargeister, Statuseffekte und Schaden über Zeit nutzt, um Gegner zu schwächen.",
      assessmentSummary:
        "Beschwörung, anhaltende Effekte, Zielzustand und eigene Position verlangen gleichzeitig Aufmerksamkeit und erzeugen eine hohe Informationslast.",
    },
    es: {
      name: "Invocador",
      weapon: "Orbe",
      officialRole:
        "Un invocador que usa espíritus elementales, estados alterados y daño prolongado para debilitar a los enemigos.",
      assessmentSummary:
        "La invocación, los efectos persistentes, el estado del objetivo y la posición propia compiten por la atención y elevan la carga de gestión de información.",
    },
    ja: {
      name: "スピリット ウイング",
      weapon: "オーブ",
      officialRole:
        "属性スピリットを召喚し、状態異常と持続ダメージで敵を弱体化する召喚クラスです。",
      assessmentSummary:
        "召喚体、持続効果、対象の状態、自分の位置を同時に確認するため、単一の攻撃ループより情報管理の負担が大きくなります。",
    },
    "pt-br": {
      name: "Mestre Espiritual",
      weapon: "Orbe",
      officialRole:
        "Um invocador que usa espíritos elementais, efeitos de estado e dano contínuo para enfraquecer os inimigos.",
      assessmentSummary:
        "Invocação, efeitos persistentes, estado do alvo e posicionamento pessoal competem pela atenção, criando uma carga alta de gerenciamento de informações.",
    },
    ru: {
      name: "Заклинатель",
      weapon: "Сфера",
      officialRole:
        "Призыватель, который использует элементальных духов, эффекты состояний и периодический урон, чтобы ослаблять врагов.",
      assessmentSummary:
        "Призыв, длительные эффекты, состояние цели и собственная позиция требуют одновременного внимания, повышая информационную нагрузку.",
    },
  },
  cleric: {
    "zh-hans": {
      name: "治愈星",
      weapon: "战锤",
      officialRole: "以恢复技能维持队友生存与战斗续航的核心治疗者。",
      assessmentSummary:
        "角色目标明确，但多人状态判断、自身生存、优先级与团队责任带来很高的决策负担。",
    },
    fr: {
      name: "Clerc",
      weapon: "Masse",
      officialRole:
        "Le soigneur principal qui maintient la santé et l'endurance de combat des alliés.",
      assessmentSummary:
        "L'objectif est clair, mais la lecture de plusieurs états, la survie personnelle, les priorités et la responsabilité du groupe créent une charge décisionnelle très élevée.",
    },
    de: {
      name: "Kleriker",
      weapon: "Streitkolben",
      officialRole:
        "Der zentrale Heiler, der Gesundheit und Kampfausdauer der Verbündeten erhält.",
      assessmentSummary:
        "Das Ziel ist klar, doch das Lesen mehrerer Zustände, Eigenschutz, Prioritätsentscheidungen und Gruppenverantwortung erzeugen eine sehr hohe Entscheidungslast.",
    },
    es: {
      name: "Clérigo",
      weapon: "Maza",
      officialRole:
        "El sanador principal que mantiene la salud y la resistencia de combate de los aliados.",
      assessmentSummary:
        "El objetivo es claro, pero leer varios estados, protegerse, decidir prioridades y asumir responsabilidad grupal crea una carga de decisión muy alta.",
    },
    ja: {
      name: "キュア ウイング",
      weapon: "メイス",
      officialRole:
        "回復スキルで味方の生存と戦闘継続を支える中核ヒーラーです。",
      assessmentSummary:
        "役割の目的は明確ですが、複数の味方の状態、自身の生存、優先順位、パーティー責任により判断負担が非常に高くなります。",
    },
    "pt-br": {
      name: "Clérigo",
      weapon: "Maça",
      officialRole:
        "O curador principal que mantém a vida e a resistência de combate dos aliados.",
      assessmentSummary:
        "O objetivo é claro, mas ler vários estados, preservar a própria segurança, decidir prioridades e assumir responsabilidade pelo grupo cria uma carga de decisão muito alta.",
    },
    ru: {
      name: "Целитель",
      weapon: "Булава",
      officialRole:
        "Основной лекарь, поддерживающий здоровье союзников и их способность продолжать бой.",
      assessmentSummary:
        "Цель понятна, но отслеживание нескольких целей, собственная безопасность, приоритеты и ответственность за группу создают очень высокую нагрузку на решения.",
    },
  },
  chanter: {
    "zh-hans": {
      name: "护法星",
      weapon: "法杖",
      officialRole: "以真言强化队友，并兼顾控制、辅助治疗与输出。",
      assessmentSummary:
        "单一职责较易开始，但要在增益、控制、辅助治疗与输出间切换，需持续读取队伍状态。",
    },
    fr: {
      name: "Aède",
      weapon: "Bâton",
      officialRole:
        "Un soutien qui renforce ses alliés avec des mantras et contribue au contrôle, aux soins secondaires et aux dégâts.",
      assessmentSummary:
        "Une responsabilité de soutien est accessible, mais alterner améliorations, contrôle, soins secondaires et dégâts exige une lecture constante de l'état du groupe.",
    },
    de: {
      name: "Kantor",
      weapon: "Stab",
      officialRole:
        "Eine Unterstützungsklasse, die Verbündete mit Mantras stärkt und zu Kontrolle, Nebenheilung und Schaden beiträgt.",
      assessmentSummary:
        "Eine einzelne Unterstützungsaufgabe ist zugänglich, doch der Wechsel zwischen Stärkungen, Kontrolle, Nebenheilung und Schaden verlangt ständiges Lesen des Gruppenzustands.",
    },
    es: {
      name: "Cantor",
      weapon: "Bastón",
      officialRole:
        "Un apoyo que fortalece a sus aliados con mantras y contribuye con control, curación secundaria y daño.",
      assessmentSummary:
        "Una responsabilidad de apoyo es accesible, pero alternar mejoras, control, curación secundaria y daño exige leer continuamente el estado del grupo.",
    },
    ja: {
      name: "チャント ウイング",
      weapon: "スタッフ",
      officialRole:
        "マントラで味方を強化し、行動妨害、補助回復、攻撃にも貢献する支援クラスです。",
      assessmentSummary:
        "一つの支援責任から始めやすい一方、強化、妨害、補助回復、攻撃を切り替えるにはパーティー状況を継続して読む必要があります。",
    },
    "pt-br": {
      name: "Cantor",
      weapon: "Cajado",
      officialRole:
        "Um suporte que fortalece os aliados com mantras e contribui com controle, cura secundária e dano.",
      assessmentSummary:
        "Uma responsabilidade de suporte é acessível, mas alternar entre bônus, controle, cura secundária e dano exige leitura contínua do estado do grupo.",
    },
    ru: {
      name: "Чародей",
      weapon: "Посох",
      officialRole:
        "Класс поддержки, который усиливает союзников мантрами и помогает контролем, дополнительным лечением и уроном.",
      assessmentSummary:
        "Начать с одной задачи поддержки сравнительно просто, но переключение между усилениями, контролем, лечением и уроном требует постоянного чтения состояния группы.",
    },
  },
  brawler: {
    "zh-hans": {
      name: "拳星",
      weapon: "拳甲",
      officialRole:
        "使用拳甲在前线持续突进与连击，通过攻击累积 Rage，并在条件达成后进入 Rampage。",
      assessmentSummary:
        "角色目标容易理解，但贴身站位、连续输入、资源状态与失误后的重新接近需同时处理。",
    },
    fr: {
      name: "Combattant",
      weapon: "Gantelets",
      officialRole:
        "Un combattant de première ligne utilisant des gantelets pour enchaîner charges et combos, accumuler de la Rage et entrer en Rampage lorsque la condition est remplie.",
      assessmentSummary:
        "L'objectif est lisible, mais le placement au contact, les saisies répétées, l'état de la ressource et le retour au combat après une erreur doivent être gérés ensemble.",
    },
    de: {
      name: "Kämpfer",
      weapon: "Panzerhandschuhe",
      officialRole:
        "Ein Frontkämpfer, der mit Panzerhandschuhen wiederholte Vorstöße und Kombos ausführt, durch Angriffe Rage erzeugt und bei erfüllter Bedingung in Rampage wechselt.",
      assessmentSummary:
        "Das Ziel ist verständlich, doch Nahkampfposition, wiederholte Eingaben, Ressourcenstatus und der erneute Einstieg nach Fehlern müssen gleichzeitig verwaltet werden.",
    },
    es: {
      name: "Luchador",
      weapon: "Guanteletes",
      officialRole:
        "Un combatiente de primera línea que usa guanteletes para encadenar cargas y combos, generar Rage con sus ataques y entrar en Rampage al cumplir la condición.",
      assessmentSummary:
        "El objetivo es fácil de entender, pero la posición cercana, las entradas repetidas, el estado del recurso y la reentrada tras un error deben gestionarse a la vez.",
    },
    ja: {
      name: "ブローラー",
      weapon: "ガントレット",
      officialRole:
        "ガントレットで連続突進とコンボを行い、攻撃で Rage を蓄積し、条件達成後に Rampage へ移行する前線ファイターです。",
      assessmentSummary:
        "目的は理解しやすい一方、近接位置、連続入力、リソース状態、ミス後の再接近を同時に管理する必要があります。",
    },
    "pt-br": {
      name: "Lutador",
      weapon: "Manoplas",
      officialRole:
        "Um combatente de linha de frente que usa manoplas para repetir investidas e combos, gerar Rage com ataques e entrar em Rampage quando a condição é cumprida.",
      assessmentSummary:
        "O objetivo é fácil de entender, mas posição corpo a corpo, comandos repetidos, estado do recurso e reentrada após um erro precisam ser gerenciados juntos.",
    },
    ru: {
      name: "Боец",
      weapon: "Боевые перчатки",
      officialRole:
        "Боец передней линии, который использует перчатки для повторных рывков и серий, накапливает Rage атаками и переходит в Rampage при выполнении условия.",
      assessmentSummary:
        "Цель понятна, но ближняя позиция, повторные действия, состояние ресурса и повторный вход после ошибки требуют одновременного контроля.",
    },
  },
};

export const difficultyScopeNotes: Readonly<Record<SiteLocale, string>> = {
  "zh-hans":
    "依据 2026-07-18 可核对的官方资料评估：八个基础职业见于全球名单；拳星于 2026-07-01 加入韩国／台湾 Chapter 1。这不代表全球版首日职业名单或平衡。",
  en:
    "Assessed from official material checked on 2026-07-18: the eight base classes appear on the Global roster, while Brawler joined the Korea/Taiwan Chapter 1 build on 2026-07-01. This does not predict the Global launch roster or balance.",
  fr:
    "Évaluation fondée sur les sources officielles vérifiées le 18 juillet 2026 : les huit classes de base figurent dans la liste Global, tandis que le Combattant a rejoint le Chapter 1 Corée/Taïwan le 1er juillet 2026. Cela ne prédit ni la liste ni l'équilibrage du lancement Global.",
  de:
    "Bewertet anhand offizieller Quellen mit Prüfstand 18. Juli 2026: Die acht Basisklassen stehen im Global-Kader; der Kämpfer kam am 1. Juli 2026 mit Korea/Taiwan Chapter 1 hinzu. Daraus folgt keine Prognose für Startkader oder Balance der Global-Version.",
  es:
    "Evaluación basada en fuentes oficiales comprobadas el 18 de julio de 2026: las ocho clases base aparecen en la lista Global y el Luchador llegó al Chapter 1 de Corea/Taiwán el 1 de julio de 2026. No predice la plantilla ni el equilibrio del lanzamiento Global.",
  ja:
    "2026年7月18日に確認した公式資料に基づく評価です。8つの基本クラスはGlobalの一覧に掲載され、ブローラーは2026年7月1日に韓国・台湾Chapter 1へ追加されました。Global版の初期クラス構成やバランスを予告するものではありません。",
  "pt-br":
    "Avaliação baseada em fontes oficiais verificadas em 18 de julho de 2026: as oito classes básicas aparecem na lista Global, enquanto o Lutador entrou no Chapter 1 da Coreia/Taiwan em 1º de julho de 2026. Isso não prevê a lista nem o balanceamento do lançamento Global.",
  ru:
    "Оценка основана на официальных материалах, проверенных 18 июля 2026 года: восемь базовых классов входят в глобальный список, а Боец появился в Chapter 1 Кореи/Тайваня 1 июля 2026 года. Это не прогноз стартового набора или баланса Global-версии.",
  ko:
    "2026-07-18에 확인한 공식 자료 기준입니다. 기본 8개 직업은 글로벌 목록에 있고 권성은 2026-07-01 한국·대만 Chapter 1에 추가됐습니다. 글로벌 출시 명단이나 밸런스를 예고하지 않습니다.",
  "zh-hant":
    "依 2026-07-18 可核對的官方資料評估：八個基礎職業見全球名單；拳星於 2026-07-01 加入韓國／台灣 Chapter 1。這不預告全球版首日名單或平衡。",
};
