import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "tmp", "editorial-content-source-trend.json");
const generatedPath = path.join(
  root,
  "app",
  "editorial-content-locales.generated.json",
);
const shardDir = path.join(root, "tmp", "editorial-locales");
const locales = ["fr", "de", "es", "pt-br"];

const es = {
  "database/aion-2-wiki": {
    "what-this-hub-is": {
      paragraphs: [
        "Este Wiki de AION 2 separa cada consulta por tipo de dato. Las páginas de clase explican roles y estilos; la base de objetos conserva identificadores y categorías oficiales; los mapas interactivos reúnen ubicaciones y filtros; las herramientas de creación calculan materiales; y las guías explican condiciones, versiones y usos. No se mezcla todo en una hoja sin fecha.",
        "La información Global procede de anuncios de NC y de la página de Steam. Los sistemas o valores de los servicios activos de Corea y Taiwán solo aparecen con su región indicada, para no presentar una versión asiática como si fuera el Build confirmado de lanzamiento Global.",
      ],
      table: {
        caption: "Directorio temático del Wiki de AION 2",
        headers: ["Tema", "Para qué sirve", "Qué revisar primero"],
        rows: [
          {
            header: "Clases",
            cells: [
              "Roles, armas, controles y guías",
              "Parche y tipo de actividad",
            ],
          },
          {
            header: "Objetos",
            cells: [
              "ID oficial, categoría, descripción e icono",
              "Nombre localizado y región",
            ],
          },
          {
            header: "Mapa interactivo",
            cells: [
              "Puntos, coordenadas, tipos y rutas",
              "Versión del mapa y estado de recopilación",
            ],
          },
          {
            header: "Creación",
            cells: [
              "Recetas y estimaciones de materiales",
              "Receta vigente dentro del juego",
            ],
          },
          {
            header: "Lanzamiento Global",
            cells: [
              "Plataformas, fechas, servidores y compras",
              "Último aviso de NC o Steam",
            ],
          },
        ],
      },
    },
    "official-scope": {
      paragraphs: [
        "Los hechos respaldados por NC o Steam conservan la fuente, su fecha de publicación y la fecha de verificación de KINA. Las agrupaciones, comparaciones, rutas y cálculos creados por KINA son trabajo editorial y no se presentan como recomendaciones de NC.",
        "Cuando no hay respuesta oficial, el campo queda como desconocido, no anunciado o pendiente de verificación en el juego. Desconocido no significa cero ni imposible: significa que la fuente disponible no permite una respuesta definitiva.",
      ],
      bullets: [
        "Prioriza los anuncios de NC, las páginas oficiales de datos y la ficha oficial de Steam.",
        "Si los nombres localizados difieren, compara ID, icono, categoría y contexto.",
        "Para precios, tasas, eventos y servidores en directo, consulta el cliente actual o el último aviso operativo.",
      ],
    },
    "use-the-hub": {
      paragraphs: [
        "Reduce cada duda a una región, una versión y un tipo de dato. Para preparar Global, empieza por plataformas, requisitos y descarga. Para un objeto, busca su nombre o ID oficial. Para una ruta de recolección, abre el mapa correspondiente y activa solo el tipo de marcador necesario.",
      ],
      steps: [
        {
          title: "Elige el servicio",
          description:
            "Separa Global de los datos de Corea o Taiwán/Hong Kong/Macao.",
        },
        {
          title: "Elige el tipo de dato",
          description:
            "Clases, objetos, mapas, creación, guías y noticias responden preguntas distintas.",
        },
        {
          title: "Lee la fecha y la fuente",
          description:
            "Comprueba la actualización y la evidencia antes de aplicar una cifra, ruta o recomendación.",
        },
        {
          title: "Confirma en el cliente",
          description:
            "El cliente actual es la comprobación final de estado, precios, tasas y eventos en directo.",
        },
      ],
    },
    "what-is-not-included": {
      paragraphs: [
        "KINA no convierte el interés de búsqueda, rumores, hojas comunitarias sin fecha ni vídeos de terceros en hechos oficiales. El Wiki no inventa población de servidores Global, soporte de consola o móvil, tiers de clase ni tasas de obtención no publicadas.",
        "Si solo existe evidencia de Corea o Taiwán, la página conserva esa etiqueta. Tras una publicación oficial, el dato Global puede añadirse bajo la misma identidad de contenido sin sobrescribir en silencio el registro regional anterior.",
      ],
    },
    "wiki-faq": {
      paragraphs: [],
      faq: [
        {
          question: "¿El Wiki de AION 2 es una web oficial de NC?",
          answer:
            "No. Es el centro de datos de AION2 KINA editado por PFG. Las afirmaciones oficiales enlazan fuentes primarias de NC o Steam.",
        },
        {
          question:
            "¿Los jugadores Global pueden copiar valores de Corea desde el Wiki?",
          answer:
            "No de forma automática. Cada página indica el servicio y un valor Global no confirmado no se deduce de Corea o Taiwán.",
        },
        {
          question: "¿Qué prevalece si un registro contradice al juego?",
          answer:
            "Sigue el cliente actual y el aviso oficial más reciente; después informa de la página, el Build, la fecha y el campo verificable.",
        },
      ],
    },
  },
  "guides/aion-2-gameplay": {
    "quick-answer": {
      paragraphs: [
        "NC presenta AION 2 como un MMORPG en Unreal Engine 5 donde el cielo también es campo de batalla. Eliges Elyos o Asmodians, te conviertes en Daeva y exploras, combates y recolectas en tierra y aire. Volar no es solo una animación de viaje: influye en posición, altura, exploración y combate.",
        "El combate prioriza precisión, momento de uso y posición, no una rotación fija. Las clases se personalizan con habilidades y Builds, pero el equilibrio, los valores exactos y los mejores Builds de lanzamiento Global no pueden deducirse de los servicios asiáticos actuales.",
      ],
    },
    "world-flight": {
      paragraphs: [
        "Steam describe un mundo 36 veces mayor que el original y regiones, campos de batalla y encuentros diseñados alrededor del espacio vertical. Puedes ascender, girar y entrar desde distintas alturas; leer el mapa exige considerar elevación, accesos y rutas de vuelo además de la distancia.",
        "La página oficial también incluye monturas como contenido coleccionable y relaciona colección, progreso y movimiento. Restricciones de vuelo, condiciones regionales, métodos para obtener monturas y selección de lanzamiento Global necesitan confirmación oficial o dentro del juego.",
      ],
    },
    "combat-classes": {
      paragraphs: [
        "La página Global de Steam enumera ocho clases. El centro de clases de KINA organiza roles y armas oficiales de Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric y Chanter. Elige por alcance, ritmo, responsabilidad de grupo y capacidad de recuperación, no por una tier list sin fecha.",
        "Las actualizaciones del servicio muestran que clases y habilidades cambian por temporada. Toda conclusión necesita actividad, parche, equipo y contexto de prueba. Un ranking de Corea o Taiwán no demuestra cuál será la clase Global más fuerte antes del lanzamiento.",
      ],
    },
    "pve-pvp": {
      paragraphs: [
        "Steam anuncia más de 200 mazmorras entre desafíos individuales, grupos de cinco y grupos de diez, además de retos de temporada, rankings y eventos de mundo abierto. Las reglas, el emparejamiento y la sustitución durante una sesión dependen aún de datos operativos Global.",
        "El PvP gira en torno al conflicto Elyos–Asmodians y el Abyss, pero emparejamiento, reglas entre servidores, equilibrio, horarios y modos iniciales necesitan datos Global. La página oficial también presenta minijuegos del Shugo Festival y colección de personajes.",
      ],
      bullets: [
        "PvE: mazmorras individuales, de cinco y de diez jugadores, además de eventos de mundo abierto.",
        "PvP: conflicto de facciones, Abyss y contenido competitivo anunciado.",
        "Exploración: vuelo libre, terreno vertical, colección y monturas.",
        "Actividades secundarias: personalización, atuendos, alas, mascotas y minijuegos.",
      ],
    },
    "global-boundary": {
      paragraphs: [
        "Están confirmados PC Global, Steam/PURPLE, diez idiomas y cuatro regiones operativas. La lista completa de mazmorras, la temporada inicial, el equilibrio de clases, la economía, los límites diarios o semanales, los nombres de servidores y la hora exacta necesitan nuevos avisos.",
        "Los datos de Chapter 1, Season 2 o eventos de Corea/Taiwán pueden mostrar cómo funciona hoy un sistema, pero no deben perder su etiqueta regional ni convertirse en una promesa de lanzamiento Global.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "¿AION 2 es un MMORPG de acción?",
          answer:
            "NC destaca combate manual, precisión, ritmo, posición y vuelo vertical. Steam lo clasifica como Action, Adventure, MMO y RPG.",
        },
        {
          question: "¿AION 2 tiene contenido individual?",
          answer:
            "Sí. La página oficial de Steam confirma mazmorras individuales, de cinco y de diez jugadores.",
        },
        {
          question: "¿Global copiará exactamente la versión de Corea?",
          answer:
            "NC no ha prometido un Build idéntico. El contenido de Corea/Taiwán solo sirve como referencia si conserva su región.",
        },
      ],
    },
  },
  "guides/aion-2-download": {
    "current-status": {
      paragraphs: [
        "NC confirma Steam y PURPLE como canales de PC para Global. Steam muestra septiembre de 2026, acceso anticipado el 30 de septiembre y Founder's Packs, pero esos campos no significan que los archivos ya estén disponibles.",
        "En la fecha de verificación no se había publicado fecha de precarga Global, hora de apertura, tamaño comprimido ni guía de instalación de PURPLE Global. La precarga regional de noviembre de 2025 no debe reutilizarse como calendario Global.",
      ],
    },
    "official-channels": {
      paragraphs: [
        "Steam muestra la tienda Global, requisitos, idiomas, Founder's Packs y estado comercial. PURPLE es la plataforma propia de NC. Ambos son canales Global de PC; vinculación de cuentas, progreso, propiedad, reembolsos y precarga dependen de las reglas de cada plataforma.",
        "En Steam, instala desde la página de AION 2 dentro del cliente. Para PURPLE, entra desde la web oficial Global de NC. KINA no aloja instaladores ni ofrece aceleradores de descarga.",
      ],
      table: {
        caption: "Canales de descarga de AION 2 Global",
        headers: ["Canal", "Confirmado", "Pendiente"],
        rows: [
          {
            header: "Steam",
            cells: [
              "Canal Global de PC, tienda y requisitos",
              "Momento de la precarga y tamaño real",
            ],
          },
          {
            header: "PURPLE",
            cells: [
              "Canal Global de PC anunciado por NC",
              "Proceso de instalación y precarga Global",
            ],
          },
        ],
      },
    },
    "safe-steps": {
      paragraphs: [
        "Abre la web Global de NC o Steam mediante una dirección escrita o un marcador fiable. Evita enlaces cortos no solicitados, anuncios que imitan dominios y espejos de archivos. Un logotipo, HTTPS o un dominio parecido no demuestran por sí solos que NC publicó el instalador.",
      ],
      steps: [
        {
          title: "Verifica la página de la plataforma",
          description:
            "Steam debe usar app/3393110; accede a PURPLE desde una entrada oficial Global de NC.",
        },
        {
          title: "Comprueba los requisitos",
          description:
            "Prepara Windows 10/11 de 64 bits, DirectX 12 y 100 GB libres; Steam recomienda SSD.",
        },
        {
          title: "Espera el estado oficial de instalación",
          description:
            "Descarga solo cuando el cliente active Instalar o NC anuncie la precarga.",
        },
        {
          title: "Conserva los registros",
          description:
            "Guarda pedido y errores oficiales para soporte sin exponer contraseñas ni códigos.",
        },
      ],
    },
    "regional-difference": {
      paragraphs: [
        "Corea y Taiwán usaron una preinstalación de PURPLE en noviembre de 2025; ese aviso describe su lanzamiento regional. El anuncio de abril de 2026 define Global como una versión para PC mediante Steam y PURPLE.",
        "Por ello, un horario regional no sustituye el requisito Global de 100 GB de Steam ni demuestra un cliente móvil Global. Cada proceso y cifra necesita su etiqueta de servicio.",
      ],
    },
    unknowns: {
      paragraphs: [
        "Siguen pendientes la fecha y hora de precarga Global, la página de instalación de PURPLE Global, los tamaños de descarga y parche, la actualización previa al inicio de sesión, el progreso entre plataformas y las restricciones regionales detalladas. Espera datos oficiales.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "¿Puedo precargar AION 2 Global ahora?",
          answer:
            "A 26 de julio de 2026, las fuentes oficiales revisadas no anunciaban fecha ni hora de precarga Global.",
        },
        {
          question: "¿Cuánto espacio necesita la descarga de AION 2?",
          answer:
            "Steam exige 100 GB libres y recomienda SSD. Esa cifra no es el tamaño comprimido.",
        },
        {
          question: "¿Puedo descargar PURPLE desde KINA?",
          answer:
            "No. KINA no aloja ni retransmite instaladores. Obtén PURPLE solo desde una entrada oficial de NC.",
        },
      ],
    },
  },
  "guides/aion-2-platforms": {
    "global-answer": {
      paragraphs: [
        "El anuncio de NC de abril de 2026 indica que Global se desarrolla solo para PC mediante Steam y PURPLE. Steam también exige Windows 10/11 de 64 bits y describe el producto como exclusivo de PC.",
        "Por tanto, Windows PC, Steam y PURPLE están confirmados. Las demás plataformas siguen sin anunciarse o con compatibilidad desconocida; el interés de búsqueda no permite asignarles una fecha.",
      ],
    },
    "platform-matrix": {
      paragraphs: [
        "La tabla refleja el material oficial comprobado el 26 de julio de 2026. No anunciado no significa imposible para siempre, pero no puede marcarse como compatible antes de un anuncio de NC.",
      ],
      table: {
        caption: "Estado de plataformas de AION 2 Global",
        headers: ["Plataforma", "Estado oficial", "Evidencia"],
        rows: [
          {
            header: "Windows PC",
            cells: [
              "Confirmado",
              "Anuncio Global de NC y requisitos de Steam",
            ],
          },
          {
            header: "Steam",
            cells: ["Confirmado", "Anuncio Global y tienda oficial"],
          },
          {
            header: "PURPLE",
            cells: ["Confirmado", "Anuncio Global de NC"],
          },
          {
            header: "PS5",
            cells: ["No anunciado", "Sin lanzamiento Global oficial para PS5"],
          },
          {
            header: "Xbox",
            cells: [
              "No anunciado",
              "Sin lanzamiento Global oficial para Xbox",
            ],
          },
          {
            header: "Android/iPhone",
            cells: [
              "No anunciado para Global",
              "Global es PC; el servicio móvil regional es distinto",
            ],
          },
          {
            header: "Steam Deck",
            cells: [
              "Compatibilidad desconocida",
              "Sin declaración oficial sobre Steam Deck",
            ],
          },
        ],
      },
    },
    "controller-status": {
      paragraphs: [
        "La ficha actual de Steam y la web Global no confirman de forma completa layouts, iconos de botones, vibración ni mandos de accesibilidad. Esto no demuestra que un mando nunca funcione; indica que una asignación de terceros o una suposición sobre Steam Input no es soporte oficial.",
        "Tras el lanzamiento, revisa las funciones de Steam, el menú de controles del juego, la guía de NC y los iconos reales antes de clasificar el soporte como completo, parcial o ausente.",
      ],
    },
    "mobile-difference": {
      paragraphs: [
        "Corea/Taiwán dispone de una página oficial con requisitos para Android, iPhone y tablet, y NC describió ese servicio para PC y móvil. El anuncio Global posterior adopta explícitamente un modelo solo para PC.",
        "Son servicios distintos. Un cliente móvil regional no confirma Android o iOS Global; una página Global no debe reutilizar requisitos, enlaces ni tamaños regionales.",
      ],
    },
    "future-updates": {
      paragraphs: [
        "La tabla solo cambiará cuando NC publique un anuncio Global, una tienda oficial añada AION 2, Steam modifique sus funciones o el propietario de una plataforma publique su página. Rumores, marcadores, bases de terceros y sugerencias de búsqueda no bastan.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "¿AION 2 llegará a PS5?",
          answer:
            "A 26 de julio de 2026, NC no había anunciado soporte ni fecha Global para PS5.",
        },
        {
          question: "¿AION 2 Global tiene versión móvil?",
          answer:
            "El anuncio Global es solo para PC. Corea/Taiwán tiene servicio móvil, pero eso no confirma Android o iOS Global.",
        },
        {
          question: "¿AION 2 admite mandos?",
          answer:
            "El material Global actual no basta para confirmar soporte completo. Espera las funciones oficiales y el menú del juego.",
        },
      ],
    },
  },
  "guides/aion-2-server-status": {
    "status-answer": {
      paragraphs: [
        "Los datos oficiales no permiten marcar los servidores Global como online. Que Steam, la web o el inicio de sesión respondan solo prueba ese servicio web; no demuestra que funcionen personajes, mundos, emparejamiento o mercados.",
        "Hasta que NC publique nombres de mundos, avisos operativos y una fuente comprobable, KINA mostrará que no hay estado público en directo en vez de inventar un indicador verde.",
      ],
    },
    "confirmed-regions": {
      paragraphs: [
        "NC anunció operaciones para Norteamérica, Sudamérica, Europa y Japón con diez idiomas. Son regiones operativas, no una lista de servidores, y no fijan ciudades de centros de datos, zonas horarias, juego entre regiones ni transferencias.",
        "Steam muestra acceso anticipado el 30 de septiembre, pero la hora y zona exactas requieren un aviso de NC. Una cuenta atrás de tienda o la medianoche local del visitante no sustituyen la hora del servidor.",
      ],
      table: {
        caption: "Estado público de servidores de AION 2 Global",
        headers: ["Campo", "Estado actual", "No deducir"],
        rows: [
          {
            header: "Regiones operativas",
            cells: [
              "Norteamérica, Sudamérica, Europa y Japón confirmados",
              "Ciudades o ranking de latencia",
            ],
          },
          {
            header: "Nombres de mundos",
            cells: [
              "Lista completa no anunciada",
              "Cantidad o restricciones de creación",
            ],
          },
          {
            header: "Estado en directo",
            cells: [
              "Sin API pública verificada",
              "Online, ocupado o en mantenimiento",
            ],
          },
          {
            header: "Población",
            cells: [
              "Sin datos oficiales en directo",
              "Mundo más popular, facciones o colas",
            ],
          },
        ],
      },
    },
    "what-is-not-live": {
      paragraphs: [
        "Un estado en tiempo real necesita fuente oficial, hora de consulta, gestión de fallos y detalle por servicio. Un HTTP 200, una publicación social o un reporte no separan con fiabilidad fallos de acceso, mundo, emparejamiento, mercado o red regional.",
        "Sin esa evidencia, el diseño honesto muestra fecha de verificación, avisos oficiales y campos desconocidos, en lugar de convertir desconocido en online.",
      ],
    },
    "how-to-check": {
      paragraphs: [
        "Lee el aviso Global de NC o la actualización operativa regional y comprueba Steam o PURPLE. Si solo falla tu conexión, registra plataforma, región, hora, código y contexto de red sin publicar cuenta, código de un solo uso ni IP.",
      ],
      steps: [
        {
          title: "Consulta el aviso oficial",
          description:
            "Busca mantenimiento programado, trabajo de emergencia o un problema conocido.",
        },
        {
          title: "Comprueba la actualización del cliente",
          description:
            "Reinicia Steam o PURPLE y revisa actualizaciones del launcher y del juego.",
        },
        {
          title: "Separa el alcance",
          description:
            "Compara con jugadores de la misma región y avisos oficiales para distinguir un fallo personal, del ISP, de plataforma o del juego.",
        },
        {
          title: "Guarda el contexto del error",
          description:
            "Registra hora, región, plataforma y código para el soporte oficial.",
        },
      ],
    },
    "status-model": {
      paragraphs: [
        "Si NC publica una página o API, KINA podrá asociar ID oficiales y mostrar fuente, última actualización correcta, retraso previsto y estado desconocido ante fallos. Población y colas seguirán ausentes salvo publicación de NC.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "¿Los servidores Global de AION 2 ya están activos?",
          answer:
            "El material oficial confirma septiembre de 2026 y acceso anticipado el 30, no un estado Global verificable en directo.",
        },
        {
          question: "¿Qué servidores de AION 2 existen?",
          answer:
            "NC confirma operaciones en Norteamérica, Sudamérica, Europa y Japón; nombres y cantidad de mundos no se han anunciado.",
        },
        {
          question:
            "¿Por qué funciona la web durante el mantenimiento del juego?",
          answer:
            "Web, acceso, mundos, emparejamiento y mercados son servicios distintos. Una web accesible no demuestra que todo el juego esté online.",
        },
      ],
    },
  },
  "guides/aion-2-tier-list": {
    answer: {
      paragraphs: [
        "Antes del lanzamiento Global no hay evidencia suficiente para un ranking S, A o B reproducible. Steam confirma ocho clases, pero no resultados comparables con el mismo equipo, habilidades, grupo, dificultad y equilibrio de lanzamiento.",
        "Por eso esta página publica primero criterios y reglas de actualización. Una lista sin parche, región, contexto PvE/PvP, equipo y muestra no debe tratarse como resultado universal.",
      ],
    },
    "why-no-ranking": {
      paragraphs: [
        "Season 2 incluye cambios de equilibrio y reglas de ranking por clase. Chapter 1 añade Brawler y cambia nivel, habilidades y contenido. La comparación depende claramente del parche, las clases disponibles, el equipo y la actividad.",
        "Steam presenta ocho clases Global, mientras Chapter 1 regional incluye Brawler. Si el conjunto de clases difiere, copiar un ranking regional a una tier list Global resulta engañoso.",
      ],
    },
    "comparison-method": {
      paragraphs: [
        "Cada lista debe responder una pregunta concreta: supervivencia con igual nivel de objeto en PvE de cinco jugadores, utilidad en un grupo fijo, un reglamento competitivo definido o tolerancia al error para principiantes. Una sola puntuación para todas las actividades oculta diferencias de diseño.",
      ],
      table: {
        caption:
          "Campos obligatorios para comparar clases tras el lanzamiento",
        headers: ["Campo", "Mantener constante", "No mezclar"],
        rows: [
          {
            header: "Versión",
            cells: [
              "Build del cliente, fecha y región",
              "Temporadas o servicios distintos",
            ],
          },
          {
            header: "Actividad",
            cells: [
              "Mazmorra, jefe, mundo abierto o reglas PvP",
              "Un total único de PvE/PvP",
            ],
          },
          {
            header: "Condiciones",
            cells: [
              "Equipo, habilidades, grupo y experiencia",
              "Personajes principiantes y de alta inversión",
            ],
          },
          {
            header: "Métrica",
            cells: [
              "Daño, supervivencia, control, apoyo o recuperación",
              "Solo popularidad o un récord",
            ],
          },
          {
            header: "Muestra",
            cells: [
              "Suficientes intentos y proceso repetible",
              "Un vídeo o un resultado máximo",
            ],
          },
        ],
      },
    },
    "eight-classes": {
      paragraphs: [
        "Las clases Global de Steam son Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric y Chanter. Antes de ordenarlas, distingue cuerpo a cuerpo o distancia, burst o presión sostenida, daño, defensa o curación, valor individual o grupal y carga de ejecución.",
        "Para elegir, usa el selector y la comparación de ocho clases según alcance, ritmo y responsabilidad, y después lee sus guías. La mejor elección personal y el mayor daño de un parche son preguntas diferentes.",
      ],
      bullets: [
        "Principiantes: tolerancia al error, gestión de recursos y recuperación.",
        "Grupo fijo: mejoras, control, protección y responsabilidad de curación.",
        "Individual: sostenimiento, cambio de objetivo, movimiento y coste de preparación.",
        "PvP: separa pequeña escala, campo de batalla y guerra de facciones.",
      ],
    },
    "update-policy": {
      paragraphs: [
        "Los tiers por actividad requieren las clases Global, el Build de equilibrio, las reglas y muestras comparables. Cada actualización conservará fecha anterior, motivo del cambio y límites de muestra. Un gran parche o una clase nueva convierte la lista antigua en histórica, no cambia letras en silencio.",
        "Un ranking oficial por clase aporta contexto dentro de esa clase, pero no demuestra por sí solo causalidad entre clases. Las conclusiones de KINA siguen marcadas como análisis editorial, no como ranking de NC.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "¿Cuál es la mejor clase Global de AION 2?",
          answer:
            "Antes del lanzamiento no hay evidencia Global controlada suficiente y NC no ha declarado una clase universalmente superior.",
        },
        {
          question: "¿Puedo usar una tier list de Corea para Global?",
          answer:
            "Solo para entender estilos, no como ranking Global. Parche, clases, valores y actividades pueden diferir.",
        },
        {
          question: "¿Cuándo publicará KINA tiers de clase?",
          answer:
            "Cuando existan clases, Build de equilibrio, reglas de actividad y muestras comparables de Global, KINA publicará análisis por versión y actividad.",
        },
      ],
    },
  },
};

Object.assign(es, {
  "classes/gladiator": {
    "official-profile": {
      paragraphs: [
        "El Guidebook oficial de NC presenta Gladiator como una clase de daño cuerpo a cuerpo con Greatsword, ataque y defensa relativamente altos y capacidad de actuar como sub-tank.",
        "El teaser Global incluye Gladiator y la presentación de 2025 describe ataques amplios cuerpo a cuerpo. Esto define un rol, no un ranking actual de daño.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de práctica: identifica una entrada segura, mantén una posición cuerpo a cuerpo sostenible, decide cuándo absorber o evitar presión y retírate si la línea frontal deja de ser favorable.",
        "Sub-tank forma parte del perfil oficial, pero no demuestra que Gladiator sustituya al tanque principal en todos los grupos. Las reglas, el grupo y el texto de habilidades vigente determinan la responsabilidad real.",
      ],
    },
    "gladiator-arcana-selection": {
      paragraphs: [
        "A 26 de julio de 2026, NC ha confirmado que el sistema Arcana sigue ampliándose, pero no una selección permanente y óptima de Arcana para cada Build y actividad de Gladiator. Define la actividad, identifica qué interrumpe el tiempo útil cuerpo a cuerpo y compara daño solo después.",
        "Comprueba primero si Gladiator puede entrar y mantener una ventana útil y después si el activador de Arcana se repite en ese contexto. Repite la prueba cuando cambien texto, conjunto, mejora o Build regional.",
      ],
      bullets: [
        "Registra región, Build, actividad y responsabilidad de grupo; separa jefe, juego individual y PvP masivo.",
        "Compara primero acceso, recuperación de posición y tiempo útil cuerpo a cuerpo, no efectos que solo funcionan en una ventana ideal.",
        "Cambia una carta o conjunto por vez y repite el escenario, registrando muertes, retiradas forzadas y ventanas sostenibles.",
        "Caduca el resultado si cambia un activador o una regla; una prueba antigua no es una meta permanente.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estos contextos son deducciones editoriales del rol oficial, no rankings de estilo ni afirmaciones de victorias de NC.",
      ],
      bullets: [
        "PvE: prioriza tiempo cuerpo a cuerpo estable y mecánicas antes que prolongar daño dentro del peligro.",
        "PvP: define objetivo, ruta de entrada y salida antes de mantener la presión.",
        "RvR: avanza con la línea aliada y no la cruces sin apoyo.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La rúbrica KINA v1 valora iniciación en 2/5 y dominio en 4/5. Uno implica menor carga; cinco exige más ejecución, información o responsabilidad simultánea.",
        "El objetivo de clase es claro, pero posición cuerpo a cuerpo, tiempo de contacto y cambio entre ataque y defensa elevan el dominio.",
        "La evaluación no usa tablas de daño, victorias, umbral de equipo ni valores no publicados.",
        "Las notas no comparan daño, victorias, valor, inversión o demanda de grupo y no establecen mejor, peor ni tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Practica tiempo cuerpo a cuerpo seguro y reconocimiento de peligros antes de decidir cuándo avanzar o retirarte.",
      ],
      steps: [
        {
          title: "Construye una base segura",
          description:
            "Practica entrar y salir de un objetivo sin aceptar peligro innecesario.",
        },
        {
          title: "Añade una carga cada vez",
          description:
            "Lee la línea frontal: aliados, zona de peligro y salida antes de avanzar.",
        },
        {
          title: "Revisa el Build actual",
          description:
            "Crea un ciclo personal corto con el texto vigente y registra Build y contexto.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Son recordatorios editoriales y no suponen habilidades, cooldowns ni coeficientes no verificados.",
      ],
      bullets: [
        "Confundir defensa con inmunidad a mecánicas; usa la resistencia para recuperarte.",
        "Perseguir más allá de aliados y salida; revisa la línea frontal antes de entrar.",
        "Convertir sub-tank en regla fija; confirma actividad y responsabilidad asignada.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Greatsword, daño cuerpo a cuerpo y sub-tank reflejan material oficial accesible el 18 de julio de 2026.",
        "La página no confirma habilidades, daño, cooldowns, atributos ni equipo óptimo de lanzamiento Global.",
        "El conjunto cubre nueve clases verificadas el 18 de julio de 2026: las ocho de Global y Brawler, añadido al Build Chapter 1 de Corea/Taiwán el 1 de julio. Habilidades, clases, equilibrio y estilo final Global requieren verificación.",
      ],
    },
  },
  "classes/assassin": {
    "official-profile": {
      paragraphs: [
        "El Guidebook oficial de NC presenta Assassin con dos dagas, sigilo, cadenas rápidas y efectos de estado para presionar a un objetivo durante una ventana corta.",
        "El teaser Global incluye Assassin y la presentación de 2025 lo define como especialista cuerpo a cuerpo de precisión. Ninguna fuente publica una cadena o posición óptima permanente.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de práctica: observa objetivo y salida, espera una entrada controlable, completa una secuencia corta definida y retírate o recolócate según el resultado.",
        "El sigilo no equivale a seguridad permanente ni a primera acción garantizada. Visibilidad, control e interacción de habilidades dependen de la versión activa.",
      ],
    },
    "assassin-arcana-selection": {
      paragraphs: [
        "Las actualizaciones de NC confirman que Arcana sigue ampliándose, pero a 26 de julio de 2026 no existe una lista oficial y permanente para Assassin. Prueba entrada, presión corta repetible y salida segura, en lugar de ordenar cartas por un resultado ideal.",
        "Cada prueba debe confirmar que el activador encaja con habilidades y contexto actuales. Si exige una preparación inestable o elimina la salida prevista, márcalo como situacional.",
      ],
      bullets: [
        "Fija tipo de objetivo, condición de entrada y punto de salida antes de comparar Arcana; no mezcles escenarios.",
        "Registra entradas correctas, cancelaciones forzadas y reinicios seguros; un intento de daño alto no decide el resultado.",
        "Separa notas por versión para PvE, arena y combate masivo porque las ventanas y respuestas cambian.",
        "Revisa activadores, duración y conjuntos tras cambios oficiales; no se afirma best-in-slot ni meta permanente.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estos contextos son deducciones editoriales del rol oficial, no rankings de estilo ni afirmaciones de victorias de NC.",
      ],
      bullets: [
        "PvE: asegura la mecánica cuerpo a cuerpo y la salida antes de optimizar la ventana corta.",
        "PvP: trata objetivo, entrada y salida como una sola decisión.",
        "RvR: observa flancos y limita objetivos; no profundices si pierdes apoyo.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La rúbrica KINA v1 valora iniciación en 4/5 y dominio en 5/5. Uno implica menor carga; cinco exige más ejecución, información o responsabilidad simultánea.",
        "Ejecución comprimida, posición, timing y recuperación tras un fallo compiten por atención y elevan ambas cargas.",
        "Alta dificultad no significa alto poder; no se deducen victorias, daño ni tier.",
        "Las notas no comparan daño, victorias, valor, inversión o demanda de grupo y no establecen mejor, peor ni tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Practica observación y retirada segura antes de comprimir entrada, presión y reinicio en una ventana corta.",
      ],
      steps: [
        {
          title: "Construye una base segura",
          description:
            "No entres: identifica objetivo, fuente de peligro y salida segura.",
        },
        {
          title: "Añade una carga cada vez",
          description:
            "Añade una entrada corta y regreso, demostrando que puedes cancelar una mala entrada.",
        },
        {
          title: "Revisa el Build actual",
          description:
            "Crea una secuencia pequeña con el texto vigente y pruébala en contextos separados.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Son recordatorios editoriales y no suponen habilidades, cooldowns ni coeficientes no verificados.",
      ],
      bullets: [
        "Entrar sin salida; define la dirección de retirada antes de actuar.",
        "Tratar el sigilo como seguridad absoluta; conserva las dudas y verifica respuestas actuales.",
        "Usar una rotación o vídeo antiguo como respuesta vigente; registra región, Build y texto.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Dos dagas, sigilo, cadenas rápidas, estados y precisión cuerpo a cuerpo reflejan material oficial verificado el 18 de julio de 2026.",
        "No se afirma nombre, cooldown, coeficiente, duración de control, equipo ni mejor cadena.",
        "El conjunto cubre nueve clases verificadas el 18 de julio de 2026: las ocho de Global y Brawler, añadido al Build Chapter 1 de Corea/Taiwán el 1 de julio. Habilidades, clases, equilibrio y estilo final Global requieren verificación.",
      ],
    },
  },
  "classes/ranger": {
    "official-profile": {
      paragraphs: [
        "El Guidebook oficial de NC presenta Ranger con arco y destaca posición, timing y respuesta táctica en ataques a distancia.",
        "El teaser Global actual usa Ranger. La presentación inglesa de 2025 usó Marksman y describió un explorador de largo alcance; KINA sigue el nombre Global vigente.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de práctica: establece alcance y línea de visión seguros, recolócate cuando cambien objetivo o entorno, ataca solo mientras la posición lo permita y reserva espacio para el siguiente movimiento.",
        "La distancia no es inmunidad. Alcance real, restricciones de movimiento y comportamiento de habilidades se comprueban en el texto vigente.",
      ],
    },
    "ranger-skill-tree-priority": {
      paragraphs: [
        "A 26 de julio de 2026, las fuentes confirman un rol a distancia basado en posición, timing y respuesta, pero no un Skill Tree Global óptimo permanente. Es un marco por versión, no una lista inventada ni un reparto fijo.",
        "Agrupa las habilidades actuales en cuatro funciones: conservar alcance y visión, ejecutar la acción central fiable, responder a la mecánica y añadir daño ideal. Cambia prioridad según el fallo observado y guarda un Skill Tree nuevo después de cada actualización de Build.",
      ],
      bullets: [
        "Primero: conserva posición segura, línea de visión y próxima ruta durante mecánicas.",
        "Segundo: refuerza la función central repetible; no priorices una estimación mayor si su condición falla.",
        "Tercero: añade control, movilidad, supervivencia o utilidad para PvE, PvP o RvR en Skill Trees separados.",
        "Después compara daño puro, registrando región, Build, equipo y actividad; revisa tras cambios de texto.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estos contextos son deducciones editoriales del rol oficial, no rankings de estilo ni afirmaciones de victorias de NC.",
      ],
      bullets: [
        "PvE: reserva la siguiente posición antes de moverte por una mecánica; no pierdas visión por una acción extra.",
        "PvP: incluye alcance, obstáculos y rutas enemigas al elegir objetivo.",
        "RvR: mantén relación con la línea frontal y evita perseguir fuera de protección.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La rúbrica KINA v1 valora iniciación en 3/5 y dominio en 4/5. Uno implica menor carga; cinco exige más ejecución, información o responsabilidad simultánea.",
        "La distancia reduce parte de la presión de contacto; posición, visión y planificación elevan el dominio.",
        "La nota no indica fuerza ni ranking de Ranger en PvE, PvP o RvR.",
        "Las notas no comparan daño, victorias, valor, inversión o demanda de grupo y no establecen mejor, peor ni tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Practica mantener alcance y línea de visión mientras te mueves antes de buscar ventanas de ataque constantes.",
      ],
      steps: [
        {
          title: "Construye una base segura",
          description:
            "Sin atacar, mantén alcance, visión y una siguiente posición segura mientras te mueves.",
        },
        {
          title: "Añade una carga cada vez",
          description:
            "Añade un objetivo y conserva una ruta de movimiento después de cada acción.",
        },
        {
          title: "Revisa el Build actual",
          description:
            "Verifica alcance, restricciones y tooltips vigentes antes de refinar el ciclo.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Son recordatorios editoriales y no suponen habilidades, cooldowns ni coeficientes no verificados.",
      ],
      bullets: [
        "Mirar distancia pero no obstáculos ni salida; revisa visión y próxima posición juntas.",
        "Perseguir fuera de protección; define una línea frontal que no debes cruzar.",
        "Suponer que todo rol a distancia es fácil; evalúa posición y decisiones por separado.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Arco, distancia, posición, timing y respuesta táctica reflejan material oficial verificado el 18 de julio de 2026.",
        "No se afirma alcance, ataque en movimiento, habilidad, daño, equipo ni equilibrio Global.",
        "El conjunto cubre nueve clases verificadas el 18 de julio de 2026: las ocho de Global y Brawler, añadido al Build Chapter 1 de Corea/Taiwán el 1 de julio. Habilidades, clases, equilibrio y estilo final Global requieren verificación.",
      ],
    },
  },
  "classes/sorcerer": {
    "official-profile": {
      paragraphs: [
        "El Guidebook oficial de NC presenta Sorcerer con Spellbook, daño mágico alto en una ventana corta y gestión de alcance y control.",
        "El teaser Global incluye Sorcerer y la presentación de 2025 describe burst mágico alto. El perfil no aporta ranking de daño ni mejor orden de habilidades.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de práctica: establece una posición de lanzamiento segura, lee objetivo y peligro, aplica presión corta mientras exista la ventana y cancela si falla la posición.",
        "El control es parte del perfil oficial; habilidades, duraciones y respuestas proceden del texto vigente.",
      ],
    },
    "sorcerer-versioned-build": {
      paragraphs: [
        "La descripción oficial confirma combate manual basado en decisiones, no un Build permanente para Sorcerer. A 26 de julio de 2026, etiqueta cada plan con región, fecha de Build, actividad y objetivo; no conserves una captura sin contexto.",
        "Escribe primero el problema —movimiento frecuente, ventanas cortas o necesidad de control— y elige según el cliente disponible. Si cambian Build, condición o actividad, conserva la hoja anterior y crea otra.",
      ],
      bullets: [
        "Registra región, Build del cliente, fecha, contexto PvE/PvP/RvR y equipo relevante.",
        "Asigna a cada elección una finalidad y un resultado observable; marca sin verificar si no hay prueba repetible.",
        "Cambia una prioridad por vez y repite el escenario para no confundir equipo, grupo o mecánica con el Build.",
        "Conserva versiones fechadas; no se afirma meta permanente, coeficiente, cooldown ni daño óptimo.",
      ],
    },
    "sorcerer-skill-priority": {
      paragraphs: [
        "La prioridad no es una rotación fija. Conserva primero las herramientas que mantienen una posición válida o detienen una mala ventana; después refuerza funciones repetibles de magia y control. Compara daño ideal solo cuando esas capas sean fiables.",
      ],
      bullets: [
        "Capa uno: posición segura y cancelación, para convertir una condición fallida en movimiento.",
        "Capa dos: función central repetible para la actividad, sin requisito inestable.",
        "Capa tres: control, movilidad, supervivencia o respuesta exigida por encuentro, rival o línea masiva.",
        "Capa cuatro: daño adicional que no rompa las tres anteriores; revisa desde la primera tras una actualización.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estos contextos son deducciones editoriales del rol oficial, no rankings de estilo ni afirmaciones de victorias de NC.",
      ],
      bullets: [
        "PvE: prioriza posición segura y movimiento de mecánica antes de completar una ventana.",
        "PvP: crea alcance y visión antes de comprometer presión corta.",
        "RvR: ajusta la retaguardia a la línea aliada y evita rutas directas de entrada.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La rúbrica KINA v1 valora iniciación en 3/5 y dominio en 4/5. Uno implica menor carga; cinco exige más ejecución, información o responsabilidad simultánea.",
        "El objetivo es claro; posición, ventana de lanzamiento y control dificultan el dominio.",
        "La dificultad no equivale a techo de daño ni demuestra un tier PvE o PvP.",
        "Las notas no comparan daño, victorias, valor, inversión o demanda de grupo y no establecen mejor, peor ni tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Practica mantener una posición de lanzamiento segura y cancelar una mala decisión antes de ordenar ventanas cortas.",
      ],
      steps: [
        {
          title: "Construye una base segura",
          description:
            "Ignora la ejecución completa y elige una posición segura y la siguiente.",
        },
        {
          title: "Añade una carga cada vez",
          description:
            "Añade una ventana corta y cancela hacia movimiento si falla la condición.",
        },
        {
          title: "Revisa el Build actual",
          description:
            "Usa el texto regional vigente y prueba control y daño por separado.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Son recordatorios editoriales y no suponen habilidades, cooldowns ni coeficientes no verificados.",
      ],
      bullets: [
        "Terminar una acción tras perder posición; practica cancelación y movimiento.",
        "Mirar alcance pero no visión o ruta de entrada; planifica también la siguiente posición.",
        "Convertir burst oficial en una afirmación de daño número uno; mantenlo como perfil.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Spellbook, magia de ventana corta, alcance y control reflejan material oficial verificado el 18 de julio de 2026.",
        "No se afirma habilidad, tiempo de lanzamiento, cooldown, coeficiente, control, equipo ni mejor ciclo.",
        "El conjunto cubre nueve clases verificadas el 18 de julio de 2026: las ocho de Global y Brawler, añadido al Build Chapter 1 de Corea/Taiwán el 1 de julio. Habilidades, clases, equilibrio y estilo final Global requieren verificación.",
      ],
    },
  },
  "guides/character-presets-style-shop": {
    "official-features": {
      paragraphs: [
        "El anuncio de NC del 17 de noviembre de 2025 indica que AION2 ofrece más de 200 ajustes, con control detallado de cuerpo, piel, iris y musculatura. También incluye preajustes para quienes conocen menos Character Creation y una página oficial de Style Shop.",
        "Esto confirma herramientas detalladas y un escaparate oficial. No convierte cada hoja comunitaria en un preajuste revisado por NC: conserva autor, fecha, condiciones del personaje y Build.",
      ],
    },
    "safe-use": {
      paragraphs: [
        "El texto oficial no promete compatibilidad de cada preajuste entre raza, sexo, región o versiones futuras, ni documenta un formato universal de terceros. Una captura no prueba importación con un clic ni compatibilidad Global.",
      ],
      bullets: [
        "Empieza en Style Shop o la interfaz del juego; no ejecutes programas desconocidos para un rostro.",
        "Registra raza, sexo, Build regional y fecha antes de copiar valores.",
        "Obtén permiso y conserva el crédito del creador al republicar una apariencia.",
      ],
    },
  },
  "guides/global-monetization-watchlist": {
    confirmed: {
      paragraphs: [
        "Sí. NC afirma que el juego base será Free-to-Play sin compra obligatoria; Steam lo muestra como Free To Play con In-App Purchases. Acceso gratuito no significa que tienda, Membership, Pass y todos los servicios sean gratuitos.",
        "NC reserva Market y Kina/Quna Exchange a una Membership activa. Sin una matriz completa para no miembros, la etiqueta Free-to-Play no permite afirmar que toda función social o de comodidad sea gratuita.",
      ],
      table: {
        caption:
          "Monetización de AION 2 Global — verificada el 24 de julio de 2026",
        headers: ["Función", "Confirmado", "Pendiente"],
        rows: [
          {
            header: "Juego base",
            cells: [
              "Free-to-Play; sin compra obligatoria",
              "Términos finales y diferencias regionales",
            ],
          },
          {
            header: "Membership",
            cells: [
              "Plan de 15 US$ al mes",
              "Beneficios, renovación y precios regionales",
            ],
          },
          {
            header: "Market / Exchange",
            cells: [
              "Requieren Membership activa",
              "Comisiones, límites y reglas finales",
            ],
          },
          {
            header: "Kina / Quna",
            cells: [
              "Kina se obtiene jugando; Quna es premium",
              "Packs, precios y tasas de Quna",
            ],
          },
          {
            header: "Daeva Pass",
            cells: [
              "Por personaje; pistas Standard y Premium",
              "Precio, frecuencia y recompensas",
            ],
          },
          {
            header: "Intercambio directo",
            cells: [
              "Exchange entre jugadores confirmado",
              "Si habrá intercambio directo entre jugadores",
            ],
          },
        ],
      },
    },
    "pay-to-win-assessment": {
      paragraphs: [
        "Respuesta corta: la evidencia actual no permite concluir que AION 2 Global sea pay-to-win ni garantiza que gastar no tenga efecto práctico. NC afirma que los cosméticos no dan ventaja y los consumibles no afectan el progreso de equipo ni el poder a largo plazo y se obtienen jugando. Catálogo, precios, ritmos, Membership y Pass siguen incompletos.",
        "Evalúa en dos fases: antes del lanzamiento, registra compromisos y dudas oficiales; después, compara velocidad de obtención, alcance comerciable, coste de tiempo y resultados entre quienes pagan y quienes no. Founder's Packs, Membership, Quna y Daeva Pass se analizan por separado.",
      ],
      bullets: [
        "Confirmado: juego base gratuito, In-App Purchases en Steam y cosméticos sin ventaja según NC.",
        "Pendiente: tienda y precios completos, beneficios de Membership, recompensas de Pass, tasas de Quna y velocidad gratuita.",
        "Método KINA: conservar fechas y fuentes y repetir las mismas comprobaciones en el servicio Global activo.",
      ],
    },
    membership: {
      paragraphs: [
        "El plan previo al lanzamiento fija Membership en 15 US$ al mes. Incluye acceso a Market, Kina/Quna Exchange, beneficios adicionales y una tienda especial que usa Kina.",
        "NC aún no publicó todos los beneficios, una matriz para no miembros, precios regionales, impuestos, renovación ni cancelación. El juego base es gratuito; los bloqueos precisos confirmados son Market y Exchange.",
      ],
      bullets: [
        "15 US$ al mes es el plan actual, no una garantía de precio final.",
        "Market y Kina/Quna Exchange requieren Membership activa.",
        "Se mencionan beneficios y tienda de Kina, pero falta la lista completa.",
        "No se han detallado límites para nivel, grupos, mazmorras o PvP sin Membership.",
      ],
    },
    "currencies-and-pass": {
      paragraphs: [
        "Kina se obtiene jugando y se usa en Market. Quna es premium y sirve para tienda, Premium Daeva Pass y compra de Kina mediante Exchange. NC afirma que el juego no crea ofertas: oferta y demanda de jugadores determinan el mercado.",
        "Daeva Pass progresa por personaje. Todos reciben pista Standard y Quna abre Premium. Entre las recompensas se citan cosméticos, objetos, materiales y monedas. Precios, tasas, coste, frecuencia y tabla completa siguen pendientes.",
      ],
      steps: [
        {
          title: "Separa las monedas",
          description:
            "Kina se obtiene jugando y Quna es premium; no son saldos intercambiables por defecto.",
        },
        {
          title: "Comprueba Membership",
          description:
            "Market y Kina/Quna Exchange requieren Membership activa.",
        },
        {
          title: "Calcula Pass por personaje",
          description:
            "Daeva Pass es por personaje; no supongas que Premium cubre toda la cuenta.",
        },
        {
          title: "Espera precios reales",
          description:
            "No conviertas cifras regionales mientras Global no publique packs, tasas y precio de Pass.",
        },
      ],
    },
    "power-and-unknowns": {
      paragraphs: [
        "NC afirma que los cosméticos no dan ventaja de juego o combate y que los consumibles ayudan sin afectar progreso de equipo o poder a largo plazo y pueden obtenerse jugando. Es la postura publicada, no una prueba independiente sobre velocidad, economía o brecha competitiva.",
        "Faltan lista de Membership, precios y tasas de Quna, intercambio directo, frecuencia y recompensas de Pass y términos regionales. Founder's Packs son productos únicos separados y su contenido publicado no incluye Membership.",
      ],
      faq: [
        {
          question: "¿Debo comprar AION 2 Global?",
          answer:
            "No. El juego base será Free-to-Play, aunque incluye Membership, Quna, Pass y compras de tienda.",
        },
        {
          question: "¿Cuánto cuesta AION 2 Membership?",
          answer:
            "NC planea 15 US$ al mes. Precio regional, impuestos, renovación, cancelación y beneficios esperan la página final.",
        },
        {
          question: "¿Los no miembros pueden usar Market?",
          answer:
            "No según el plan actual. Market y Kina/Quna Exchange requieren Membership; otros límites no están completos.",
        },
        {
          question: "¿Daeva Pass cubre toda la cuenta?",
          answer:
            "NC lo describe por personaje. Standard está disponible para todos y Quna abre Premium; no supongas una compra para todos.",
        },
        {
          question: "¿AION 2 Global es pay-to-win?",
          answer:
            "NC afirma que cosméticos y consumibles no dan poder a largo plazo, pero catálogo, precios y ritmos no están completos; la evaluación final exige datos tras el lanzamiento.",
        },
      ],
    },
  },
});

const ptBr = {
  "database/aion-2-wiki": {
    "what-this-hub-is": {
      paragraphs: [
        "Este Wiki de AION 2 separa cada consulta por tipo de dado. As páginas de classe explicam funções e estilos; o banco de itens preserva IDs e categorias oficiais; os mapas interativos reúnem locais e filtros; as ferramentas de criação calculam materiais; e os guias explicam condições, versões e usos. Tudo isso não é misturado em uma planilha sem data.",
        "As informações da versão global vêm de anúncios da NC e da página da Steam. Sistemas ou valores dos serviços ativos da Coreia e de Taiwan só aparecem com a região indicada, para que um Build asiático não seja apresentado como lançamento global confirmado.",
      ],
      table: {
        caption: "Diretório de assuntos do Wiki de AION 2",
        headers: ["Assunto", "Para que serve", "Confira primeiro"],
        rows: [
          {
            header: "Classes",
            cells: [
              "Funções, armas, controles e guias",
              "Patch e contexto da atividade",
            ],
          },
          {
            header: "Itens",
            cells: [
              "ID oficial, categoria, descrição e ícone",
              "Nome localizado e região",
            ],
          },
          {
            header: "Mapa interativo",
            cells: [
              "Pontos, coordenadas, tipos e rotas",
              "Versão do mapa e estado da coleta",
            ],
          },
          {
            header: "Criação",
            cells: [
              "Receitas e estimativas de materiais",
              "Receita atual dentro do jogo",
            ],
          },
          {
            header: "Lançamento global",
            cells: [
              "Plataformas, datas, servidores e compras",
              "Aviso mais recente da NC ou Steam",
            ],
          },
        ],
      },
    },
    "official-scope": {
      paragraphs: [
        "Fatos sustentados pela NC ou Steam mantêm a fonte, a data da publicação e a data da verificação da KINA. Agrupamentos, comparações, rotas e cálculos criados pela KINA são trabalho editorial e não são apresentados como recomendações da NC.",
        "Quando não existe resposta oficial, o campo fica como desconhecido, não anunciado ou pendente de verificação no jogo. Desconhecido não significa zero ou impossível: significa que a fonte disponível não permite uma conclusão.",
      ],
      bullets: [
        "Priorize anúncios da NC, páginas oficiais de dados e a página oficial da Steam.",
        "Quando os nomes localizados divergirem, compare ID, ícone, categoria e contexto.",
        "Para preços, taxas, eventos e servidores ao vivo, consulte o cliente atual ou o aviso operacional mais recente.",
      ],
    },
    "use-the-hub": {
      paragraphs: [
        "Reduza cada dúvida a uma região, uma versão e um tipo de dado. Para se preparar para a versão global, comece por plataformas, requisitos e download. Para um item, pesquise o nome ou ID oficial. Para uma rota de coleta, abra o mapa correspondente e ative apenas o tipo de marcador necessário.",
      ],
      steps: [
        {
          title: "Escolha o serviço",
          description:
            "Separe a versão global dos dados da Coreia ou de Taiwan/Hong Kong/Macau.",
        },
        {
          title: "Escolha o tipo de dado",
          description:
            "Classes, itens, mapas, criação, guias e notícias respondem a perguntas diferentes.",
        },
        {
          title: "Leia a data e a fonte",
          description:
            "Confira a atualização e a evidência antes de aplicar um número, uma rota ou uma recomendação.",
        },
        {
          title: "Confirme no cliente",
          description:
            "Use o cliente atual como verificação final de estado, preços, taxas e eventos.",
        },
      ],
    },
    "what-is-not-included": {
      paragraphs: [
        "A KINA não transforma interesse de busca, rumores, planilhas comunitárias sem data ou vídeos de terceiros em fatos oficiais. O Wiki não inventa população dos servidores globais, suporte a console ou celular, tiers de classe nem taxas de obtenção não publicadas.",
        "Quando só há evidência da Coreia ou de Taiwan, a página mantém essa etiqueta. Após uma publicação oficial, o dado global pode ser acrescentado à mesma identidade de conteúdo sem apagar silenciosamente o registro regional anterior.",
      ],
    },
    "wiki-faq": {
      paragraphs: [],
      faq: [
        {
          question: "O Wiki de AION 2 é um site oficial da NC?",
          answer:
            "Não. É o centro de dados do AION2 KINA editado por PFG. Afirmações oficiais apontam para fontes primárias da NC ou Steam.",
        },
        {
          question:
            "Jogadores globais podem copiar valores da Coreia pelo Wiki?",
          answer:
            "Não automaticamente. Cada página identifica o serviço, e um valor global não confirmado não pode ser deduzido da Coreia ou de Taiwan.",
        },
        {
          question: "O que vale quando um registro diverge do jogo?",
          answer:
            "Siga o cliente atual e o aviso oficial mais recente; depois informe página, Build, data e campo verificável.",
        },
      ],
    },
  },
  "guides/aion-2-gameplay": {
    "quick-answer": {
      paragraphs: [
        "A NC apresenta AION 2 como um MMORPG em Unreal Engine 5 no qual o céu também é campo de batalha. Você escolhe Elyos ou Asmodians, torna-se Daeva e explora, luta e coleta no chão e no ar. O voo não é apenas uma animação de viagem: afeta posição, altitude, exploração e combate.",
        "O combate valoriza precisão, timing e posicionamento, e não uma rotação fixa. As classes podem ser personalizadas com habilidades e Builds, mas equilíbrio, valores exatos e melhores Builds do lançamento global não podem ser deduzidos dos serviços asiáticos atuais.",
      ],
    },
    "world-flight": {
      paragraphs: [
        "A Steam descreve um mundo 36 vezes maior que o original, com regiões, campos de batalha e encontros projetados para o espaço vertical. É possível subir, virar e entrar por alturas diferentes; ler o mapa envolve elevação, acesso e rotas de voo, além da distância.",
        "A página oficial também lista montarias como conteúdo colecionável e relaciona coleção, progresso e movimento. Restrições de voo, condições regionais, obtenção de montarias e seleção do lançamento global ainda exigem confirmação oficial ou no jogo.",
      ],
    },
    "combat-classes": {
      paragraphs: [
        "A página global da Steam lista oito classes. O centro da KINA organiza as funções e armas oficiais de Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric e Chanter. Escolha por alcance, ritmo, responsabilidade no grupo e recuperação de erros, não por uma tier list sem data.",
        "As atualizações do serviço mostram que classes e habilidades mudam por temporada. Toda conclusão precisa indicar atividade, patch, equipamento e contexto de teste. Um ranking da Coreia ou de Taiwan não prova qual será a classe global mais forte antes do lançamento.",
      ],
    },
    "pve-pvp": {
      paragraphs: [
        "A Steam anuncia mais de 200 masmorras entre desafios solo, grupos de cinco e grupos de dez, além de desafios sazonais, rankings e eventos de mundo aberto. Regras, matchmaking e substituição durante a sessão ainda dependem de dados operacionais globais.",
        "O PvP gira em torno do conflito Elyos–Asmodians e do Abyss, mas matchmaking, regras entre servidores, equilíbrio, horários e modos iniciais exigem dados globais. A página oficial também apresenta minijogos do Shugo Festival e coleção de personagens.",
      ],
      bullets: [
        "PvE: masmorras solo, para cinco e para dez jogadores, além de eventos de mundo aberto.",
        "PvP: conflito de facções, Abyss e conteúdo competitivo anunciado.",
        "Exploração: voo livre, terreno vertical, coleção e montarias.",
        "Atividades paralelas: personalização, trajes, asas, mascotes e minijogos.",
      ],
    },
    "global-boundary": {
      paragraphs: [
        "Estão confirmados PC global, Steam/PURPLE, dez idiomas e quatro regiões operacionais. Lista completa de masmorras, temporada inicial, equilíbrio de classes, economia, limites diários ou semanais, nomes de servidores e horário exato ainda precisam de novos avisos.",
        "Dados de Chapter 1, Season 2 ou eventos da Coreia/Taiwan podem ilustrar como um sistema funciona hoje, mas não devem perder a etiqueta regional nem se transformar em promessa de lançamento global.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "AION 2 é um MMORPG de ação?",
          answer:
            "A NC destaca combate manual, precisão, timing, posicionamento e voo vertical. A Steam o classifica como Action, Adventure, MMO e RPG.",
        },
        {
          question: "AION 2 possui conteúdo solo?",
          answer:
            "Sim. A página oficial da Steam confirma masmorras solo, para cinco e para dez jogadores.",
        },
        {
          question: "A versão global copiará exatamente a Coreia?",
          answer:
            "A NC não prometeu um Build idêntico. O conteúdo da Coreia/Taiwan só serve como referência quando mantém a região visível.",
        },
      ],
    },
  },
  "guides/aion-2-download": {
    "current-status": {
      paragraphs: [
        "A NC confirma Steam e PURPLE como canais de PC para a versão global. A Steam mostra setembro de 2026, acesso antecipado em 30 de setembro e Founder's Packs, mas esses campos não significam que os arquivos já estejam disponíveis.",
        "Na data da verificação, não havia data de pré-carregamento global, horário de abertura, tamanho compactado nem guia de instalação do PURPLE global. O pré-carregamento regional de novembro de 2025 não deve ser usado como calendário global.",
      ],
    },
    "official-channels": {
      paragraphs: [
        "A Steam exibe loja global, requisitos, idiomas, Founder's Packs e estado comercial. O PURPLE é a plataforma da NC. Ambos são canais globais de PC; vínculo de contas, progresso, propriedade, reembolsos e pré-carregamento dependem das regras de cada plataforma.",
        "Na Steam, instale pela página de AION 2 dentro do cliente. Para PURPLE, entre pelo site global oficial da NC. A KINA não hospeda instaladores nem oferece acelerador de download.",
      ],
      table: {
        caption: "Canais de download de AION 2 Global",
        headers: ["Canal", "Confirmado", "Pendente"],
        rows: [
          {
            header: "Steam",
            cells: [
              "Canal global de PC, loja e requisitos",
              "Momento do pré-carregamento e tamanho real",
            ],
          },
          {
            header: "PURPLE",
            cells: [
              "Canal global de PC anunciado pela NC",
              "Fluxo de instalação e pré-carregamento global",
            ],
          },
        ],
      },
    },
    "safe-steps": {
      paragraphs: [
        "Abra o site global da NC ou a Steam por um endereço digitado ou favorito confiável. Evite links curtos não solicitados, anúncios que imitam domínios e espelhos de arquivos. Logotipo, HTTPS e domínio parecido não provam que a NC publicou o instalador.",
      ],
      steps: [
        {
          title: "Verifique a página da plataforma",
          description:
            "A Steam deve usar app/3393110; acesse PURPLE por uma entrada global oficial da NC.",
        },
        {
          title: "Confira os requisitos",
          description:
            "Prepare Windows 10/11 de 64 bits, DirectX 12 e 100 GB livres; a Steam recomenda SSD.",
        },
        {
          title: "Espere o estado oficial de instalação",
          description:
            "Baixe somente quando o cliente ativar Instalar ou a NC anunciar o pré-carregamento.",
        },
        {
          title: "Guarde os registros",
          description:
            "Mantenha pedido e erros oficiais para suporte sem expor senhas ou códigos.",
        },
      ],
    },
    "regional-difference": {
      paragraphs: [
        "Coreia e Taiwan usaram pré-instalação pelo PURPLE em novembro de 2025; esse aviso descreve o lançamento regional. O anúncio de abril de 2026 define a versão global como PC via Steam e PURPLE.",
        "Assim, um horário regional não substitui o requisito global de 100 GB da Steam nem confirma um cliente móvel global. Cada processo e número precisa da etiqueta do serviço.",
      ],
    },
    unknowns: {
      paragraphs: [
        "Continuam pendentes data e hora do pré-carregamento global, página de instalação do PURPLE global, tamanhos de download e patch, atualização antes do login, progresso entre plataformas e restrições regionais. Aguarde dados oficiais.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "Já posso pré-carregar AION 2 Global?",
          answer:
            "Em 26 de julho de 2026, as fontes oficiais verificadas não anunciavam data nem horário do pré-carregamento global.",
        },
        {
          question: "Quanto espaço o download de AION 2 exige?",
          answer:
            "A Steam exige 100 GB livres e recomenda SSD. Essa não é a medida do arquivo compactado.",
        },
        {
          question: "Posso baixar PURPLE pela KINA?",
          answer:
            "Não. A KINA não hospeda nem retransmite instaladores. Obtenha PURPLE somente por uma entrada oficial da NC.",
        },
      ],
    },
  },
  "guides/aion-2-platforms": {
    "global-answer": {
      paragraphs: [
        "O anúncio da NC de abril de 2026 informa que a versão global está sendo desenvolvida somente para PC, via Steam e PURPLE. A Steam também exige Windows 10/11 de 64 bits e descreve o produto como PC.",
        "Portanto, Windows PC, Steam e PURPLE estão confirmados. As demais plataformas continuam não anunciadas ou com compatibilidade desconhecida; interesse de busca não permite atribuir data.",
      ],
    },
    "platform-matrix": {
      paragraphs: [
        "A tabela reflete o material oficial conferido em 26 de julho de 2026. Não anunciado não significa impossível para sempre, mas não pode ser marcado como compatível antes de uma publicação da NC.",
      ],
      table: {
        caption: "Estado das plataformas de AION 2 Global",
        headers: ["Plataforma", "Estado oficial", "Evidência"],
        rows: [
          {
            header: "Windows PC",
            cells: [
              "Confirmado",
              "Anúncio global da NC e requisitos da Steam",
            ],
          },
          {
            header: "Steam",
            cells: ["Confirmado", "Anúncio global e loja oficial"],
          },
          {
            header: "PURPLE",
            cells: ["Confirmado", "Anúncio global da NC"],
          },
          {
            header: "PS5",
            cells: [
              "Não anunciado",
              "Sem lançamento global oficial para PS5",
            ],
          },
          {
            header: "Xbox",
            cells: [
              "Não anunciado",
              "Sem lançamento global oficial para Xbox",
            ],
          },
          {
            header: "Android/iPhone",
            cells: [
              "Não anunciado para a versão global",
              "Global é PC; o serviço móvel regional é diferente",
            ],
          },
          {
            header: "Steam Deck",
            cells: [
              "Compatibilidade desconhecida",
              "Sem declaração oficial sobre Steam Deck",
            ],
          },
        ],
      },
    },
    "controller-status": {
      paragraphs: [
        "A ficha atual da Steam e a página global não confirmam layouts, ícones de botões, vibração nem controles de acessibilidade de forma completa. Isso não prova que um controle nunca funcione; apenas que mapeamento de terceiros ou suposição sobre Steam Input não são suporte oficial.",
        "Após o lançamento, confira recursos da Steam, menu de controles, guia da NC e ícones reais antes de classificar o suporte como completo, parcial ou ausente.",
      ],
    },
    "mobile-difference": {
      paragraphs: [
        "Coreia/Taiwan possui página oficial com requisitos para Android, iPhone e tablet, e a NC descreveu o serviço regional para PC e celular. O anúncio global posterior adota explicitamente um modelo apenas para PC.",
        "São serviços diferentes. Um cliente móvel regional não confirma Android ou iOS global, e uma página global não deve reutilizar requisitos, links ou tamanhos regionais.",
      ],
    },
    "future-updates": {
      paragraphs: [
        "A tabela só muda quando a NC publicar anúncio global, uma loja oficial adicionar AION 2, a Steam alterar seus recursos ou a dona de uma plataforma publicar o produto. Rumores, placeholders, bancos de terceiros e sugestões de busca não bastam.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "AION 2 chegará ao PS5?",
          answer:
            "Em 26 de julho de 2026, a NC não havia anunciado suporte nem data global para PS5.",
        },
        {
          question: "AION 2 Global terá versão para celular?",
          answer:
            "O anúncio global é apenas para PC. Coreia/Taiwan tem serviço móvel, o que não confirma Android ou iOS global.",
        },
        {
          question: "AION 2 oferece suporte a controle?",
          answer:
            "O material global atual não basta para confirmar suporte completo. Aguarde os recursos oficiais e o menu do jogo.",
        },
      ],
    },
  },
  "guides/aion-2-server-status": {
    "status-answer": {
      paragraphs: [
        "Os dados oficiais não permitem marcar os servidores globais como online. Steam, site ou página de login acessíveis comprovam apenas o serviço web; não demonstram que personagens, mundos, matchmaking ou mercados estejam funcionando.",
        "Até a NC publicar nomes de mundos, avisos operacionais e uma fonte verificável, a KINA mostrará que não há estado público ao vivo, em vez de inventar um indicador verde.",
      ],
    },
    "confirmed-regions": {
      paragraphs: [
        "A NC anunciou operações para América do Norte, América do Sul, Europa e Japão em dez idiomas. São regiões operacionais, não uma lista de servidores, e não definem cidades de data centers, fusos, jogo entre regiões nem transferências.",
        "A Steam mostra acesso antecipado em 30 de setembro, mas horário e fuso exatos exigem aviso da NC. Uma contagem regressiva da loja ou meia-noite local do visitante não substituem o horário do servidor.",
      ],
      table: {
        caption: "Estado público dos servidores de AION 2 Global",
        headers: ["Campo", "Estado atual", "Não deduzir"],
        rows: [
          {
            header: "Regiões operacionais",
            cells: [
              "América do Norte, América do Sul, Europa e Japão confirmados",
              "Cidades ou ranking de latência",
            ],
          },
          {
            header: "Nomes dos mundos",
            cells: [
              "Lista completa não anunciada",
              "Quantidade ou restrições de criação",
            ],
          },
          {
            header: "Estado ao vivo",
            cells: [
              "Sem API pública verificada",
              "Online, ocupado ou em manutenção",
            ],
          },
          {
            header: "População",
            cells: [
              "Sem dados oficiais ao vivo",
              "Mundo mais popular, facções ou filas",
            ],
          },
        ],
      },
    },
    "what-is-not-live": {
      paragraphs: [
        "Um estado em tempo real exige fonte oficial, horário da consulta, tratamento de falhas e detalhe por serviço. HTTP 200, publicação social ou relato de jogador não separam com segurança falhas de login, mundo, matchmaking, mercado ou rede regional.",
        "Sem essa evidência, o projeto honesto mostra data de verificação, avisos oficiais e campos desconhecidos, em vez de converter desconhecido em online.",
      ],
    },
    "how-to-check": {
      paragraphs: [
        "Leia o aviso global da NC ou a atualização operacional regional e confira Steam ou PURPLE. Se só sua conexão falhar, registre plataforma, região, horário, código e contexto da rede sem publicar conta, código de uso único ou IP.",
      ],
      steps: [
        {
          title: "Confira o aviso oficial",
          description:
            "Procure manutenção programada, trabalho emergencial ou problema conhecido.",
        },
        {
          title: "Confira a atualização do cliente",
          description:
            "Reinicie Steam ou PURPLE e verifique o launcher e o jogo.",
        },
        {
          title: "Separe o alcance",
          description:
            "Compare com jogadores da mesma região e avisos oficiais para distinguir falha pessoal, do provedor, da plataforma ou do jogo.",
        },
        {
          title: "Guarde o contexto do erro",
          description:
            "Registre horário, região, plataforma e código para o suporte oficial.",
        },
      ],
    },
    "status-model": {
      paragraphs: [
        "Se a NC publicar página ou API, a KINA poderá associar IDs oficiais e mostrar fonte, última atualização correta, atraso esperado e estado desconhecido em falhas. População e filas continuarão ausentes salvo publicação da NC.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "Os servidores globais de AION 2 já estão ativos?",
          answer:
            "O material oficial confirma setembro de 2026 e acesso antecipado no dia 30, não um estado global verificável ao vivo.",
        },
        {
          question: "Quais servidores de AION 2 existem?",
          answer:
            "A NC confirma operações na América do Norte, América do Sul, Europa e Japão; nomes e quantidade de mundos não foram anunciados.",
        },
        {
          question:
            "Por que o site funciona durante a manutenção do jogo?",
          answer:
            "Site, login, mundos, matchmaking e mercados são serviços diferentes. Um site acessível não prova que todo o jogo esteja online.",
        },
      ],
    },
  },
  "guides/aion-2-tier-list": {
    answer: {
      paragraphs: [
        "Antes do lançamento global não há evidência suficiente para um ranking S, A ou B reproduzível. A Steam confirma oito classes, mas não resultados comparáveis com o mesmo equipamento, habilidades, grupo, dificuldade e equilíbrio de lançamento.",
        "Por isso, a página publica primeiro critérios e regras de atualização. Uma lista sem patch, região, contexto PvE/PvP, equipamento e amostra não deve ser tratada como resultado universal.",
      ],
    },
    "why-no-ranking": {
      paragraphs: [
        "Season 2 inclui mudanças de equilíbrio e regras de ranking por classe. Chapter 1 adiciona Brawler e muda nível, habilidades e conteúdo. A comparação depende claramente do patch, das classes disponíveis, do equipamento e da atividade.",
        "A Steam apresenta oito classes globais, enquanto Chapter 1 regional inclui Brawler. Se o conjunto de classes difere, copiar um ranking regional para uma tier list global é enganoso.",
      ],
    },
    "comparison-method": {
      paragraphs: [
        "Cada lista deve responder a uma pergunta concreta: sobrevivência com o mesmo nível de item em PvE de cinco jogadores, utilidade em grupo fixo, regras competitivas definidas ou recuperação de erros para iniciantes. Uma nota única para todas as atividades esconde diferenças de design.",
      ],
      table: {
        caption:
          "Campos obrigatórios para comparar classes após o lançamento",
        headers: ["Campo", "Manter constante", "Não misturar"],
        rows: [
          {
            header: "Versão",
            cells: [
              "Build do cliente, data e região",
              "Temporadas ou serviços diferentes",
            ],
          },
          {
            header: "Atividade",
            cells: [
              "Masmorra, chefe, mundo aberto ou regras PvP",
              "Um total único de PvE/PvP",
            ],
          },
          {
            header: "Condições",
            cells: [
              "Equipamento, habilidades, grupo e experiência",
              "Personagens iniciantes e de alto investimento",
            ],
          },
          {
            header: "Métrica",
            cells: [
              "Dano, sobrevivência, controle, suporte ou recuperação",
              "Só popularidade ou um recorde",
            ],
          },
          {
            header: "Amostra",
            cells: [
              "Tentativas suficientes e processo repetível",
              "Um vídeo ou resultado máximo",
            ],
          },
        ],
      },
    },
    "eight-classes": {
      paragraphs: [
        "As classes globais da Steam são Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric e Chanter. Antes de ordenar, separe corpo a corpo ou distância, burst ou pressão contínua, dano, defesa ou cura, valor solo ou em grupo e carga de execução.",
        "Para escolher, use o seletor e a visão das oito classes por alcance, ritmo e responsabilidade, depois leia os guias. A melhor opção pessoal e o maior dano de um patch são perguntas diferentes.",
      ],
      bullets: [
        "Iniciante: tolerância a erros, gestão de recursos e recuperação.",
        "Grupo fixo: buffs, controle, proteção e responsabilidade de cura.",
        "Solo: sustentação, troca de alvo, movimento e custo de preparação.",
        "PvP: separe pequena escala, campo de batalha e guerra de facções.",
      ],
    },
    "update-policy": {
      paragraphs: [
        "Tiers por atividade exigem classes globais, Build de equilíbrio, regras e amostras comparáveis. Cada atualização manterá data anterior, motivo e limites da amostra. Um patch grande ou nova classe torna a lista antiga histórica, sem trocar letras em silêncio.",
        "Um ranking oficial por classe oferece contexto dentro dela, mas não prova causalidade entre classes. Conclusões da KINA permanecem marcadas como análise editorial, não ranking da NC.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        {
          question: "Qual é a melhor classe global de AION 2?",
          answer:
            "Antes do lançamento, não há evidência global controlada suficiente e a NC não declarou uma classe universalmente superior.",
        },
        {
          question: "Posso usar uma tier list da Coreia para Global?",
          answer:
            "Somente para entender estilos, não como ranking global. Patch, classes, valores e atividades podem diferir.",
        },
        {
          question: "Quando a KINA publicará tiers de classe?",
          answer:
            "Quando houver classes, Build de equilíbrio, regras e amostras comparáveis globais, a KINA publicará análises por versão e atividade.",
        },
      ],
    },
  },
};

Object.assign(ptBr, {
  "classes/gladiator": {
    "official-profile": {
      paragraphs: [
        "O Guidebook oficial da NC apresenta Gladiator como uma classe de dano corpo a corpo com Greatsword, ataque e defesa relativamente altos e capacidade de atuar como sub-tank.",
        "O teaser global inclui Gladiator, e a apresentação de 2025 descreve ataques amplos corpo a corpo. Isso define uma função, não um ranking atual de dano.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de prática: identifique uma entrada segura, mantenha posição corpo a corpo sustentável, decida quando absorver ou evitar pressão e recue se a linha de frente ficar desfavorável.",
        "Sub-tank faz parte do perfil oficial, mas não prova que Gladiator substitui o tanque principal em todo grupo. Regras, composição e texto de habilidades atual determinam a responsabilidade real.",
      ],
    },
    "gladiator-arcana-selection": {
      paragraphs: [
        "Em 26 de julho de 2026, a NC havia confirmado que o sistema Arcana continua crescendo, mas não uma seleção permanente e ideal para todo Build e atividade de Gladiator. Defina a atividade, identifique o que interrompe o tempo útil corpo a corpo e só então compare dano.",
        "Confira primeiro se Gladiator consegue entrar e sustentar uma janela útil e depois se o gatilho de Arcana se repete naquele contexto. Refazer o teste é necessário quando texto, conjunto, melhoria ou Build regional mudar.",
      ],
      bullets: [
        "Registre região, Build, atividade e responsabilidade no grupo; separe chefe, solo e PvP em massa.",
        "Compare primeiro acesso, recuperação de posição e tempo útil corpo a corpo, não efeitos que só funcionam na janela ideal.",
        "Mude uma carta ou conjunto por vez e repita o cenário, anotando mortes, recuos forçados e janelas sustentáveis.",
        "Invalide o resultado se gatilho ou regra mudar; um teste antigo não é meta permanente.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estes contextos são deduções editoriais do perfil oficial, não rankings de estilo nem alegações de vitória da NC.",
      ],
      bullets: [
        "PvE: priorize tempo corpo a corpo estável e mecânicas antes de prolongar dano em perigo.",
        "PvP: defina alvo, rota de entrada e saída antes de manter pressão.",
        "RvR: avance com a linha aliada e não a atravesse sozinho.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "A rubrica KINA v1 avalia entrada em 2/5 e domínio em 4/5. Um indica menor carga; cinco exige mais execução, informação ou responsabilidade simultânea.",
        "O objetivo da classe é claro, mas posição corpo a corpo, tempo de contato e troca entre ataque e defesa aumentam o domínio.",
        "A avaliação não usa tabelas de dano, vitórias, limite de equipamento ou valores não publicados.",
        "As notas não comparam dano, vitórias, valor, investimento ou procura de grupo e não estabelecem melhor, pior ou tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Pratique tempo corpo a corpo seguro e reconhecimento de perigos antes de decidir quando avançar ou recuar.",
      ],
      steps: [
        {
          title: "Crie uma base segura",
          description:
            "Pratique entrar e sair de um alvo sem aceitar perigo desnecessário.",
        },
        {
          title: "Adicione uma carga por vez",
          description:
            "Leia linha de frente, aliados, área de perigo e saída antes de avançar.",
        },
        {
          title: "Revise o Build atual",
          description:
            "Crie um ciclo pessoal curto com o texto atual e registre Build e contexto.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "São lembretes editoriais e não pressupõem habilidade, cooldown ou coeficiente não verificado.",
      ],
      bullets: [
        "Confundir defesa com imunidade a mecânicas; use resistência para se recuperar.",
        "Perseguir além dos aliados e da saída; confira a linha de frente antes de entrar.",
        "Transformar sub-tank em regra fixa; confirme atividade e responsabilidade.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Greatsword, dano corpo a corpo e sub-tank refletem material oficial acessível em 18 de julho de 2026.",
        "A página não confirma habilidades, dano, cooldowns, atributos ou equipamento ideal do lançamento global.",
        "O conjunto cobre nove classes verificadas em 18 de julho de 2026: as oito globais e Brawler, adicionado ao Build Chapter 1 da Coreia/Taiwan em 1º de julho. Habilidades, classes, equilíbrio e estilo final global ainda exigem verificação.",
      ],
    },
  },
  "classes/assassin": {
    "official-profile": {
      paragraphs: [
        "O Guidebook oficial da NC apresenta Assassin com duas adagas, furtividade, sequências rápidas e efeitos de estado para pressionar um alvo durante uma janela curta.",
        "O teaser global inclui Assassin e a apresentação de 2025 o define como especialista corpo a corpo de precisão. Nenhuma fonte publica uma sequência ou posição ideal permanente.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de prática: observe alvo e saída, espere uma entrada controlável, complete uma sequência curta definida e recue ou se reposicione conforme o resultado.",
        "Furtividade não significa segurança permanente nem primeira ação garantida. Visibilidade, controle e interação de habilidades dependem da versão ativa.",
      ],
    },
    "assassin-arcana-selection": {
      paragraphs: [
        "As atualizações da NC confirmam que Arcana continua crescendo, mas em 26 de julho de 2026 não existia uma lista oficial permanente para Assassin. Teste entrada, pressão curta repetível e saída segura, em vez de ordenar cartas por um resultado ideal.",
        "Cada teste deve confirmar que o gatilho combina com habilidades e contexto atuais. Se exigir preparação instável ou remover a saída planejada, marque como situacional.",
      ],
      bullets: [
        "Fixe tipo de alvo, condição de entrada e ponto de saída antes de comparar Arcana; não misture cenários.",
        "Registre entradas bem-sucedidas, cancelamentos forçados e reinícios seguros; uma tentativa de dano alto não decide o resultado.",
        "Separe notas por versão para PvE, arena e combate em massa porque janelas e respostas mudam.",
        "Revise gatilhos, duração e conjuntos após mudanças oficiais; não se afirma best-in-slot nem meta permanente.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estes contextos são deduções editoriais do perfil oficial, não rankings de estilo nem alegações de vitória da NC.",
      ],
      bullets: [
        "PvE: garanta a mecânica corpo a corpo e a saída antes de otimizar a janela curta.",
        "PvP: trate alvo, entrada e saída como uma única decisão.",
        "RvR: observe flancos e limite alvos; não avance se perder apoio.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "A rubrica KINA v1 avalia entrada em 4/5 e domínio em 5/5. Um indica menor carga; cinco exige mais execução, informação ou responsabilidade simultânea.",
        "Execução comprimida, posição, timing e recuperação após falha competem por atenção e elevam as duas cargas.",
        "Dificuldade alta não significa poder alto; não se deduzem vitórias, dano ou tier.",
        "As notas não comparam dano, vitórias, valor, investimento ou procura de grupo e não estabelecem melhor, pior ou tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Pratique observação e recuo seguro antes de comprimir entrada, pressão e reinício em uma janela curta.",
      ],
      steps: [
        {
          title: "Crie uma base segura",
          description:
            "Não entre: identifique alvo, fonte de perigo e saída segura.",
        },
        {
          title: "Adicione uma carga por vez",
          description:
            "Adicione uma entrada curta e retorno, provando que uma entrada ruim pode ser cancelada.",
        },
        {
          title: "Revise o Build atual",
          description:
            "Crie uma sequência pequena com o texto vigente e teste contextos separados.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "São lembretes editoriais e não pressupõem habilidade, cooldown ou coeficiente não verificado.",
      ],
      bullets: [
        "Entrar sem saída; defina a direção de recuo antes de agir.",
        "Tratar furtividade como segurança absoluta; mantenha dúvidas e verifique respostas atuais.",
        "Usar rotação ou vídeo antigo como resposta atual; registre região, Build e texto.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Duas adagas, furtividade, sequências rápidas, estados e precisão corpo a corpo refletem material oficial verificado em 18 de julho de 2026.",
        "Não se afirma nome, cooldown, coeficiente, duração de controle, equipamento ou melhor sequência.",
        "O conjunto cobre nove classes verificadas em 18 de julho de 2026: as oito globais e Brawler, adicionado ao Build Chapter 1 da Coreia/Taiwan em 1º de julho. Habilidades, classes, equilíbrio e estilo final global ainda exigem verificação.",
      ],
    },
  },
  "classes/ranger": {
    "official-profile": {
      paragraphs: [
        "O Guidebook oficial da NC apresenta Ranger com arco e destaca posicionamento, timing e resposta tática em ataques a distância.",
        "O teaser global atual usa Ranger. A apresentação em inglês de 2025 usou Marksman e descreveu um explorador de longo alcance; a KINA segue o nome global atual.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de prática: estabeleça alcance e linha de visão seguros, reposicione-se quando alvo ou ambiente mudar, ataque só enquanto a posição permitir e reserve espaço para o próximo movimento.",
        "Distância não é imunidade. Alcance real, restrições de movimento e comportamento das habilidades devem ser verificados no texto atual.",
      ],
    },
    "ranger-skill-tree-priority": {
      paragraphs: [
        "Em 26 de julho de 2026, as fontes confirmavam uma função a distância baseada em posição, timing e resposta, mas não um Skill Tree global ideal permanente. Este é um modelo por versão, não uma lista inventada nem uma distribuição fixa.",
        "Agrupe as habilidades atuais em quatro funções: preservar alcance e visão, executar a ação central confiável, responder à mecânica e adicionar dano ideal. Mude a prioridade conforme a falha observada e salve um novo Skill Tree após cada atualização de Build.",
      ],
      bullets: [
        "Primeiro: preserve posição segura, linha de visão e próxima rota durante mecânicas.",
        "Segundo: fortaleça a função central repetível; não priorize uma estimativa maior se a condição falha.",
        "Terceiro: adicione controle, mobilidade, sobrevivência ou utilidade para PvE, PvP ou RvR em Skill Trees separados.",
        "Depois compare dano puro, registrando região, Build, equipamento e atividade; revise após mudanças no texto.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estes contextos são deduções editoriais do perfil oficial, não rankings de estilo nem alegações de vitória da NC.",
      ],
      bullets: [
        "PvE: reserve a próxima posição antes de se mover por uma mecânica; não perca visão por uma ação extra.",
        "PvP: inclua alcance, obstáculos e rotas inimigas ao escolher o alvo.",
        "RvR: mantenha relação com a linha de frente e evite perseguir fora da proteção.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "A rubrica KINA v1 avalia entrada em 3/5 e domínio em 4/5. Um indica menor carga; cinco exige mais execução, informação ou responsabilidade simultânea.",
        "A distância reduz parte da pressão de contato; posição, visão e planejamento aumentam o domínio.",
        "A nota não indica força nem ranking de Ranger em PvE, PvP ou RvR.",
        "As notas não comparam dano, vitórias, valor, investimento ou procura de grupo e não estabelecem melhor, pior ou tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Pratique manter alcance e linha de visão enquanto se move antes de buscar janelas de ataque consistentes.",
      ],
      steps: [
        {
          title: "Crie uma base segura",
          description:
            "Sem atacar, mantenha alcance, visão e uma próxima posição segura durante o movimento.",
        },
        {
          title: "Adicione uma carga por vez",
          description:
            "Adicione um alvo e preserve uma rota de movimento após cada ação.",
        },
        {
          title: "Revise o Build atual",
          description:
            "Verifique alcance, restrições e tooltips atuais antes de refinar o ciclo.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "São lembretes editoriais e não pressupõem habilidade, cooldown ou coeficiente não verificado.",
      ],
      bullets: [
        "Observar distância, mas não obstáculos e saída; confira visão e próxima posição juntas.",
        "Perseguir fora da proteção; defina uma linha frontal que não deve ser cruzada.",
        "Supor que toda função a distância é fácil; avalie posição e decisões separadamente.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Arco, distância, posição, timing e resposta tática refletem material oficial verificado em 18 de julho de 2026.",
        "Não se afirma alcance, ataque em movimento, habilidade, dano, equipamento ou equilíbrio global.",
        "O conjunto cobre nove classes verificadas em 18 de julho de 2026: as oito globais e Brawler, adicionado ao Build Chapter 1 da Coreia/Taiwan em 1º de julho. Habilidades, classes, equilíbrio e estilo final global ainda exigem verificação.",
      ],
    },
  },
  "classes/sorcerer": {
    "official-profile": {
      paragraphs: [
        "O Guidebook oficial da NC apresenta Sorcerer com Spellbook, dano mágico alto em uma janela curta e gestão de alcance e controle.",
        "O teaser global inclui Sorcerer e a apresentação de 2025 descreve burst mágico alto. O perfil não fornece ranking de dano nem melhor ordem de habilidades.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Ciclo editorial de prática: estabeleça uma posição segura de conjuração, leia alvo e perigo, aplique pressão curta enquanto a janela existir e cancele se a posição falhar.",
        "Controle faz parte do perfil oficial; habilidades, durações e respostas devem vir do texto atual.",
      ],
    },
    "sorcerer-versioned-build": {
      paragraphs: [
        "A descrição oficial confirma combate manual baseado em decisões, não um Build permanente para Sorcerer. Em 26 de julho de 2026, todo plano deve indicar região, data do Build, atividade e objetivo, em vez de guardar uma captura sem contexto.",
        "Escreva primeiro o problema — movimento frequente, janelas curtas ou necessidade de controle — e escolha pelo cliente disponível. Quando Build, condição ou atividade mudar, preserve a ficha anterior e crie outra.",
      ],
      bullets: [
        "Registre região, Build do cliente, data, contexto PvE/PvP/RvR e equipamento relevante.",
        "Dê a cada escolha uma finalidade e um resultado observável; marque como não verificado sem teste repetível.",
        "Mude uma prioridade por vez e repita o cenário para não confundir equipamento, grupo ou mecânica com o Build.",
        "Preserve versões datadas; não se afirma meta permanente, coeficiente, cooldown ou dano ideal.",
      ],
    },
    "sorcerer-skill-priority": {
      paragraphs: [
        "Prioridade não é rotação fixa. Preserve primeiro ferramentas que mantêm uma posição válida ou interrompem uma janela ruim; depois fortaleça funções repetíveis de magia e controle. Compare dano ideal somente quando essas camadas forem confiáveis.",
      ],
      bullets: [
        "Camada um: posição segura e cancelamento, para transformar condição falha em movimento.",
        "Camada dois: função central repetível na atividade, sem requisito instável.",
        "Camada três: controle, mobilidade, sobrevivência ou resposta exigida pelo encontro, rival ou linha de massa.",
        "Camada quatro: dano adicional que não quebre as três anteriores; reinicie a revisão após atualização.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Estes contextos são deduções editoriais do perfil oficial, não rankings de estilo nem alegações de vitória da NC.",
      ],
      bullets: [
        "PvE: priorize posição segura e movimento da mecânica antes de completar uma janela.",
        "PvP: crie alcance e visão antes de comprometer pressão curta.",
        "RvR: ajuste a retaguarda à linha aliada e evite rotas diretas de entrada.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "A rubrica KINA v1 avalia entrada em 3/5 e domínio em 4/5. Um indica menor carga; cinco exige mais execução, informação ou responsabilidade simultânea.",
        "O objetivo é claro; posição, janela de conjuração e controle tornam o domínio mais difícil.",
        "Dificuldade não equivale a teto de dano nem demonstra tier PvE ou PvP.",
        "As notas não comparam dano, vitórias, valor, investimento ou procura de grupo e não estabelecem melhor, pior ou tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Pratique manter uma posição segura de conjuração e cancelar uma decisão ruim antes de organizar janelas curtas.",
      ],
      steps: [
        {
          title: "Crie uma base segura",
          description:
            "Ignore a execução completa e escolha uma posição segura e a próxima posição.",
        },
        {
          title: "Adicione uma carga por vez",
          description:
            "Adicione uma janela curta e cancele em movimento se a condição falhar.",
        },
        {
          title: "Revise o Build atual",
          description:
            "Use o texto regional atual e teste controle e dano separadamente.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "São lembretes editoriais e não pressupõem habilidade, cooldown ou coeficiente não verificado.",
      ],
      bullets: [
        "Concluir uma ação após perder posição; pratique cancelamento e movimento.",
        "Observar alcance, mas não visão ou rota de entrada; planeje também a próxima posição.",
        "Transformar burst oficial em alegação de maior dano; mantenha-o como perfil.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Spellbook, magia de janela curta, alcance e controle refletem material oficial verificado em 18 de julho de 2026.",
        "Não se afirma habilidade, tempo de conjuração, cooldown, coeficiente, controle, equipamento ou melhor ciclo.",
        "O conjunto cobre nove classes verificadas em 18 de julho de 2026: as oito globais e Brawler, adicionado ao Build Chapter 1 da Coreia/Taiwan em 1º de julho. Habilidades, classes, equilíbrio e estilo final global ainda exigem verificação.",
      ],
    },
  },
  "guides/character-presets-style-shop": {
    "official-features": {
      paragraphs: [
        "O anúncio da NC de 17 de novembro de 2025 informa que AION2 oferece mais de 200 ajustes, com controle detalhado de corpo, pele, íris e musculatura. Também inclui predefinições para quem conhece menos Character Creation e uma página oficial de Style Shop.",
        "Isso confirma ferramentas detalhadas e uma vitrine oficial. Não transforma toda planilha comunitária em predefinição revisada pela NC: preserve autor, data, condições do personagem e Build.",
      ],
    },
    "safe-use": {
      paragraphs: [
        "O texto oficial não promete compatibilidade de toda predefinição entre raça, sexo, região ou versões futuras, nem documenta formato universal de terceiros. Uma captura não prova importação em um clique ou compatibilidade global.",
      ],
      bullets: [
        "Comece no Style Shop ou na interface do jogo; não execute programas desconhecidos para um rosto.",
        "Registre raça, sexo, Build regional e data antes de copiar valores.",
        "Obtenha permissão e preserve o crédito ao republicar uma aparência comunitária.",
      ],
    },
  },
  "guides/global-monetization-watchlist": {
    confirmed: {
      paragraphs: [
        "Sim. A NC afirma que o jogo base será Free-to-Play sem compra obrigatória; a Steam o exibe como Free To Play com In-App Purchases. Acesso gratuito não significa que loja, Membership, Pass e todos os serviços sejam gratuitos.",
        "A NC reserva Market e Kina/Quna Exchange a uma Membership ativa. Sem uma matriz completa para não membros, a etiqueta Free-to-Play não permite afirmar que todo recurso social ou de conveniência seja gratuito.",
      ],
      table: {
        caption:
          "Monetização de AION 2 Global — verificada em 24 de julho de 2026",
        headers: ["Recurso", "Confirmado", "Pendente"],
        rows: [
          {
            header: "Jogo base",
            cells: [
              "Free-to-Play; sem compra obrigatória",
              "Termos finais e diferenças regionais",
            ],
          },
          {
            header: "Membership",
            cells: [
              "Plano de US$ 15 por mês",
              "Benefícios, renovação e preços regionais",
            ],
          },
          {
            header: "Market / Exchange",
            cells: [
              "Exigem Membership ativa",
              "Taxas, limites e regras finais",
            ],
          },
          {
            header: "Kina / Quna",
            cells: [
              "Kina vem do jogo; Quna é premium",
              "Pacotes, preços e taxas de Quna",
            ],
          },
          {
            header: "Daeva Pass",
            cells: [
              "Por personagem; trilhas Standard e Premium",
              "Preço, frequência e recompensas",
            ],
          },
          {
            header: "Troca direta",
            cells: [
              "Exchange entre jogadores confirmado",
              "Se haverá troca direta entre jogadores",
            ],
          },
        ],
      },
    },
    "pay-to-win-assessment": {
      paragraphs: [
        "Resposta curta: as evidências atuais não permitem concluir que AION 2 Global seja pay-to-win nem garantem que gastar não tenha efeito prático. A NC afirma que cosméticos não dão vantagem e consumíveis não afetam progresso de equipamento ou poder de longo prazo e podem ser obtidos jogando. Catálogo, preços, ritmos, Membership e Pass ainda estão incompletos.",
        "Avalie em duas fases: antes do lançamento, registre compromissos e dúvidas oficiais; depois, compare velocidade de obtenção, alcance negociável, custo de tempo e resultados entre pagantes e não pagantes. Founder's Packs, Membership, Quna e Daeva Pass devem ser analisados separadamente.",
      ],
      bullets: [
        "Confirmado: jogo base gratuito, In-App Purchases na Steam e cosméticos sem vantagem segundo a NC.",
        "Pendente: loja e preços completos, benefícios de Membership, recompensas de Pass, taxas de Quna e velocidade gratuita.",
        "Método KINA: preservar datas e fontes e repetir as verificações no serviço global ativo.",
      ],
    },
    membership: {
      paragraphs: [
        "O plano pré-lançamento fixa Membership em US$ 15 por mês. Inclui acesso a Market, Kina/Quna Exchange, benefícios adicionais e uma loja especial que usa Kina.",
        "A NC ainda não publicou todos os benefícios, uma matriz para não membros, preços regionais, impostos, renovação ou cancelamento. O jogo base é gratuito; os bloqueios confirmados com precisão são Market e Exchange.",
      ],
      bullets: [
        "US$ 15 por mês é o plano atual, não garantia de preço final.",
        "Market e Kina/Quna Exchange exigem Membership ativa.",
        "Benefícios e loja de Kina são citados, mas falta a lista completa.",
        "Limites de nível, grupos, masmorras ou PvP sem Membership não foram detalhados.",
      ],
    },
    "currencies-and-pass": {
      paragraphs: [
        "Kina é obtida jogando e usada em Market. Quna é premium e serve para loja, Premium Daeva Pass e compra de Kina via Exchange. A NC afirma que o jogo não cria ofertas: oferta e procura dos jogadores movem o mercado.",
        "Daeva Pass progride por personagem. Todos recebem a trilha Standard e Quna abre Premium. As recompensas citam cosméticos, itens, materiais e moedas. Preços, taxas, custo, frequência e tabela completa continuam pendentes.",
      ],
      steps: [
        {
          title: "Separe as moedas",
          description:
            "Kina vem do jogo e Quna é premium; não trate os saldos como intercambiáveis por padrão.",
        },
        {
          title: "Confira Membership",
          description:
            "Market e Kina/Quna Exchange exigem Membership ativa.",
        },
        {
          title: "Calcule Pass por personagem",
          description:
            "Daeva Pass é por personagem; não suponha que Premium cubra toda a conta.",
        },
        {
          title: "Espere preços reais",
          description:
            "Não converta valores regionais antes dos pacotes, taxas e preço de Pass globais.",
        },
      ],
    },
    "power-and-unknowns": {
      paragraphs: [
        "A NC afirma que cosméticos não dão vantagem de jogo ou combate e que consumíveis ajudam sem afetar progresso de equipamento ou poder de longo prazo e podem ser obtidos jogando. É a posição publicada, não uma prova independente de velocidade, economia ou diferença competitiva.",
        "Faltam lista de Membership, preços e taxas de Quna, troca direta, frequência e recompensas de Pass e termos regionais. Founder's Packs são produtos únicos separados e seu conteúdo publicado não inclui Membership.",
      ],
      faq: [
        {
          question: "Preciso comprar AION 2 Global?",
          answer:
            "Não. O jogo base será Free-to-Play, embora tenha Membership, Quna, Pass e compras na loja.",
        },
        {
          question: "Quanto custa AION 2 Membership?",
          answer:
            "A NC planeja US$ 15 por mês. Preço regional, impostos, renovação, cancelamento e benefícios aguardam a página final.",
        },
        {
          question: "Quem não é membro pode usar Market?",
          answer:
            "Não no plano atual. Market e Kina/Quna Exchange exigem Membership; outros limites ainda não estão completos.",
        },
        {
          question: "Daeva Pass vale para a conta inteira?",
          answer:
            "A NC o descreve por personagem. Standard está disponível para todos e Quna abre Premium; não presuma uma compra para todos.",
        },
        {
          question: "AION 2 Global é pay-to-win?",
          answer:
            "A NC afirma que cosméticos e consumíveis não dão poder de longo prazo, mas catálogo, preços e ritmos estão incompletos; a avaliação final exige dados após o lançamento.",
        },
      ],
    },
  },
});

const fr = {
  "database/aion-2-wiki": {
    "what-this-hub-is": {
      paragraphs: [
        "Ce Wiki AION 2 sépare les recherches par type de données. Les pages de classe expliquent rôles et styles ; la base d’objets conserve les identifiants et catégories officiels ; les cartes interactives regroupent lieux et filtres ; les outils d’artisanat calculent les matériaux ; les guides précisent conditions, versions et usages. Rien n’est aplati dans une feuille sans date.",
        "Les informations Global proviennent des annonces de NC et de la page Steam. Les systèmes ou valeurs des services actifs en Corée et à Taïwan ne figurent qu’avec leur région, afin de ne pas présenter un Build asiatique comme le lancement Global confirmé.",
      ],
      table: {
        caption: "Répertoire thématique du Wiki AION 2",
        headers: ["Sujet", "Utilité", "À vérifier d’abord"],
        rows: [
          { header: "Classes", cells: ["Rôles, armes, commandes et guides", "Patch et contexte de l’activité"] },
          { header: "Objets", cells: ["ID officiel, catégorie, description et icône", "Nom localisé et région"] },
          { header: "Carte interactive", cells: ["Points, coordonnées, types et itinéraires", "Version de la carte et état de collecte"] },
          { header: "Artisanat", cells: ["Recettes et estimation des matériaux", "Recette actuelle dans le jeu"] },
          { header: "Lancement Global", cells: ["Plateformes, dates, serveurs et achats", "Dernier avis de NC ou Steam"] },
        ],
      },
    },
    "official-scope": {
      paragraphs: [
        "Les faits soutenus par NC ou Steam conservent la source, sa date de publication et la date de vérification KINA. Les regroupements, comparaisons, itinéraires et calculs créés par KINA sont un travail éditorial, pas des recommandations de NC.",
        "Sans réponse officielle, un champ reste inconnu, non annoncé ou à vérifier dans le jeu. Inconnu ne signifie ni zéro ni impossible : la source disponible ne permet simplement pas de conclure.",
      ],
      bullets: [
        "Privilégiez les annonces de NC, les pages officielles de données et la fiche Steam officielle.",
        "Si les noms localisés diffèrent, comparez ID, icône, catégorie et contexte.",
        "Pour prix, taux, événements et serveurs en direct, consultez le client actuel ou le dernier avis d’exploitation.",
      ],
    },
    "use-the-hub": {
      paragraphs: [
        "Ramenez chaque question à une région, une version et un type de données. Pour préparer Global, commencez par plateformes, configuration et téléchargement. Pour un objet, cherchez son nom ou son ID officiel. Pour une route de collecte, ouvrez la carte correspondante et n’activez que le type de marqueur utile.",
      ],
      steps: [
        { title: "Choisir le service", description: "Séparez Global des données de Corée ou de Taïwan/Hong Kong/Macao." },
        { title: "Choisir le type de données", description: "Classes, objets, cartes, artisanat, guides et actualités répondent à des questions différentes." },
        { title: "Lire la date et la source", description: "Vérifiez mise à jour et preuve avant d’appliquer un nombre, un itinéraire ou un conseil." },
        { title: "Confirmer dans le client", description: "Le client actuel reste la vérification finale de l’état, des prix, des taux et des événements." },
      ],
    },
    "what-is-not-included": {
      paragraphs: [
        "KINA ne transforme ni intérêt de recherche, ni rumeur, ni feuille communautaire non datée, ni vidéo tierce en fait officiel. Le Wiki n’invente pas la population des serveurs Global, le support console ou mobile, les tiers de classe ou les taux de butin non publiés.",
        "Quand seules des preuves de Corée ou de Taïwan existent, la page garde cette étiquette. Une donnée Global pourra rejoindre la même identité après publication officielle sans écraser silencieusement l’ancien relevé régional.",
      ],
    },
    "wiki-faq": {
      paragraphs: [],
      faq: [
        { question: "Le Wiki AION 2 est-il un site officiel de NC ?", answer: "Non. C’est le centre de données AION2 KINA édité par PFG. Les affirmations officielles renvoient aux sources primaires de NC ou Steam." },
        { question: "Les joueurs Global peuvent-ils copier les valeurs coréennes du Wiki ?", answer: "Pas automatiquement. Chaque page indique le service, et une valeur Global non confirmée ne se déduit pas de la Corée ou de Taïwan." },
        { question: "Que suivre si une fiche contredit le jeu ?", answer: "Suivez le client actuel et l’avis officiel le plus récent, puis signalez page, Build, date et champ vérifiable." },
      ],
    },
  },
  "guides/aion-2-gameplay": {
    "quick-answer": {
      paragraphs: [
        "NC présente AION 2 comme un MMORPG sous Unreal Engine 5 où le ciel est aussi un champ de bataille. Vous choisissez Elyos ou Asmodians, devenez Daeva, puis explorez, combattez et récoltez au sol comme dans les airs. Le vol influe sur position, altitude, exploration et combat.",
        "Le combat valorise précision, timing et placement plutôt qu’une rotation fixe. Les classes se personnalisent par compétences et Builds, mais l’équilibrage, les valeurs exactes et les meilleurs Builds du lancement Global ne se déduisent pas des services asiatiques actuels.",
      ],
    },
    "world-flight": {
      paragraphs: [
        "Steam décrit un monde 36 fois plus vaste que l’original, avec régions, champs de bataille et rencontres conçus autour de la verticalité. On peut monter, tourner et approcher par différentes hauteurs ; lire la carte exige donc altitude, accès et routes aériennes autant que distance.",
        "La page officielle cite aussi les montures parmi les contenus à collectionner. Restrictions de vol, conditions régionales, obtention des montures et sélection du lancement Global demandent encore une confirmation officielle ou en jeu.",
      ],
    },
    "combat-classes": {
      paragraphs: [
        "La page Steam Global nomme huit classes. Le centre KINA organise les rôles et armes officiels de Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric et Chanter. Choisissez selon portée, rythme, responsabilité de groupe et récupération d’erreur, pas selon une tier list non datée.",
        "Les mises à jour du service montrent que classes et compétences changent selon la saison. Toute conclusion doit préciser activité, patch, équipement et contexte de test. Un classement Corée/Taïwan ne prouve pas la meilleure classe Global avant le lancement.",
      ],
    },
    "pve-pvp": {
      paragraphs: [
        "Steam annonce plus de 200 donjons, entre défis solo et groupes de cinq ou dix joueurs, ainsi que défis saisonniers, classements et événements en monde ouvert. Règles, matchmaking et remplacement en cours de partie dépendent encore des données d’exploitation Global.",
        "Le PvP repose sur le conflit Elyos–Asmodians et l’Abyss, mais matchmaking, règles interserveurs, équilibre, horaires et modes de départ attendent des données Global. La page officielle présente aussi les mini-jeux du Shugo Festival et la collection de personnages.",
      ],
      bullets: [
        "PvE : donjons solo, à cinq et à dix joueurs, plus événements en monde ouvert.",
        "PvP : conflit de factions, Abyss et contenus compétitifs annoncés.",
        "Exploration : vol libre, terrain vertical, collection et montures.",
        "Activités annexes : personnalisation, tenues, ailes, familiers et mini-jeux.",
      ],
    },
    "global-boundary": {
      paragraphs: [
        "Sont confirmés : PC Global, Steam/PURPLE, dix langues et quatre régions d’exploitation. Liste complète des donjons, saison initiale, équilibre des classes, économie, limites quotidiennes ou hebdomadaires, noms des serveurs et heure précise nécessitent de nouveaux avis.",
        "Chapter 1, Season 2 et les événements Corée/Taïwan peuvent illustrer un système actuel, mais ne doivent pas perdre leur étiquette régionale ni devenir une promesse de lancement Global.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "AION 2 est-il un MMORPG d’action ?", answer: "NC met en avant combat manuel, précision, timing, placement et vol vertical. Steam le classe Action, Adventure, MMO et RPG." },
        { question: "AION 2 propose-t-il du contenu solo ?", answer: "Oui. La page Steam officielle confirme des donjons solo, à cinq et à dix joueurs." },
        { question: "Global copiera-t-il exactement la Corée ?", answer: "NC n’a pas promis un Build identique. Le contenu Corée/Taïwan n’est utile qu’avec sa portée régionale visible." },
      ],
    },
  },
  "guides/aion-2-download": {
    "current-status": {
      paragraphs: [
        "NC confirme Steam et PURPLE comme canaux PC de Global. Steam affiche septembre 2026, un accès anticipé le 30 septembre et les Founder's Packs, mais ces champs ne signifient pas que les fichiers sont déjà disponibles.",
        "À la date de vérification, aucune date de préchargement Global, heure d’ouverture, taille compressée ou procédure PURPLE Global n’était publiée. Le préchargement régional de novembre 2025 ne doit pas servir de calendrier Global.",
      ],
    },
    "official-channels": {
      paragraphs: [
        "Steam affiche boutique Global, configuration, langues, Founder's Packs et état commercial. PURPLE est la plateforme de NC. Les deux sont des canaux PC Global ; liaison de comptes, progression, propriété, remboursements et préchargement suivent les règles de chaque plateforme.",
        "Sur Steam, installez depuis la page AION 2 du client. Pour PURPLE, passez par le site Global officiel de NC. KINA n’héberge aucun programme d’installation et ne fournit pas d’accélérateur.",
      ],
      table: {
        caption: "Canaux de téléchargement AION 2 Global",
        headers: ["Canal", "Confirmé", "En attente"],
        rows: [
          { header: "Steam", cells: ["Canal PC Global, boutique et configuration", "Moment du préchargement et taille réelle"] },
          { header: "PURPLE", cells: ["Canal PC Global annoncé par NC", "Procédure d’installation et préchargement Global"] },
        ],
      },
    },
    "safe-steps": {
      paragraphs: [
        "Ouvrez le site Global de NC ou Steam depuis une adresse saisie ou un favori fiable. Évitez liens courts non sollicités, annonces imitant un domaine et miroirs de fichiers. Un logo, HTTPS ou un domaine ressemblant ne prouvent pas que NC a publié l’installateur.",
      ],
      steps: [
        { title: "Vérifier la page de plateforme", description: "Steam doit utiliser app/3393110 ; rejoignez PURPLE depuis une entrée Global officielle de NC." },
        { title: "Vérifier la configuration", description: "Préparez Windows 10/11 64 bits, DirectX 12 et 100 Go libres ; Steam recommande un SSD." },
        { title: "Attendre l’installation officielle", description: "Téléchargez seulement quand le client active Installer ou que NC annonce le préchargement." },
        { title: "Conserver les justificatifs", description: "Gardez commande et erreurs officielles pour le support sans exposer mots de passe ni codes." },
      ],
    },
    "regional-difference": {
      paragraphs: [
        "Corée et Taïwan ont utilisé une préinstallation PURPLE en novembre 2025 ; cet avis décrit leur lancement régional. L’annonce d’avril 2026 définit Global comme une version PC via Steam et PURPLE.",
        "Un horaire régional ne remplace donc pas les 100 Go indiqués par Steam et ne confirme pas de client mobile Global. Chaque procédure et chiffre doit garder son service.",
      ],
    },
    unknowns: {
      paragraphs: [
        "Restent inconnus : date et heure du préchargement Global, page d’installation PURPLE Global, tailles du téléchargement et du patch, mise à jour avant connexion, progression entre plateformes et restrictions régionales détaillées. Attendez les données officielles.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Puis-je déjà précharger AION 2 Global ?", answer: "Au 26 juillet 2026, les sources officielles vérifiées n’annonçaient ni date ni heure de préchargement Global." },
        { question: "Combien d’espace demande le téléchargement d’AION 2 ?", answer: "Steam exige 100 Go libres et recommande un SSD. Ce n’est pas la taille compressée." },
        { question: "Puis-je télécharger PURPLE depuis KINA ?", answer: "Non. KINA n’héberge ni ne relaie d’installateurs. Obtenez PURPLE uniquement auprès de NC." },
      ],
    },
  },
  "guides/aion-2-platforms": {
    "global-answer": {
      paragraphs: [
        "L’annonce de NC d’avril 2026 indique que Global est développé exclusivement pour PC via Steam et PURPLE. Steam exige aussi Windows 10/11 64 bits et décrit le produit comme PC.",
        "Windows PC, Steam et PURPLE sont donc confirmés. Les autres plateformes restent non annoncées ou de compatibilité inconnue ; l’intérêt de recherche ne permet pas d’inventer une date.",
      ],
    },
    "platform-matrix": {
      paragraphs: [
        "Le tableau reflète les éléments officiels vérifiés le 26 juillet 2026. Non annoncé ne signifie pas impossible pour toujours, mais aucun support ne peut être affirmé avant une publication de NC.",
      ],
      table: {
        caption: "État des plateformes AION 2 Global",
        headers: ["Plateforme", "État officiel", "Preuve"],
        rows: [
          { header: "Windows PC", cells: ["Confirmé", "Annonce Global de NC et configuration Steam"] },
          { header: "Steam", cells: ["Confirmé", "Annonce Global et boutique officielle"] },
          { header: "PURPLE", cells: ["Confirmé", "Annonce Global de NC"] },
          { header: "PS5", cells: ["Non annoncé", "Aucune version Global officielle sur PS5"] },
          { header: "Xbox", cells: ["Non annoncé", "Aucune version Global officielle sur Xbox"] },
          { header: "Android/iPhone", cells: ["Non annoncé pour Global", "Global est PC ; le service mobile régional diffère"] },
          { header: "Steam Deck", cells: ["Compatibilité inconnue", "Aucune déclaration officielle sur Steam Deck"] },
        ],
      },
    },
    "controller-status": {
      paragraphs: [
        "La fiche Steam et la page Global ne confirment pas complètement dispositions, icônes, vibrations ou manettes d’accessibilité. Cela ne prouve pas qu’une manette ne fonctionnera jamais ; une configuration tierce ou une supposition Steam Input n’est simplement pas un support officiel.",
        "Après le lancement, vérifiez les fonctions Steam, le menu des commandes, le guide NC et les icônes réelles avant de qualifier le support de complet, partiel ou absent.",
      ],
    },
    "mobile-difference": {
      paragraphs: [
        "Corée/Taïwan possède une page officielle avec configuration Android, iPhone et tablette, et NC a décrit ce service pour PC et mobile. L’annonce Global ultérieure adopte explicitement un modèle PC.",
        "Ce sont des services distincts. Un client mobile régional ne confirme pas Android ou iOS Global, et une page Global ne doit pas reprendre configuration, liens ou tailles régionaux.",
      ],
    },
    "future-updates": {
      paragraphs: [
        "Le tableau ne changera qu’après annonce Global de NC, ajout par une boutique officielle, modification des fonctions Steam ou publication du détenteur d’une plateforme. Rumeurs, placeholders, bases tierces et suggestions de recherche ne suffisent pas.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "AION 2 sortira-t-il sur PS5 ?", answer: "Au 26 juillet 2026, NC n’avait annoncé ni support ni date Global pour PS5." },
        { question: "AION 2 Global aura-t-il une version mobile ?", answer: "L’annonce Global concerne uniquement PC. Corée/Taïwan a un service mobile, sans confirmer Android ou iOS Global." },
        { question: "AION 2 prend-il en charge les manettes ?", answer: "Les éléments Global actuels ne suffisent pas à confirmer un support complet. Attendez les fonctions officielles et le menu du jeu." },
      ],
    },
  },
  "guides/aion-2-server-status": {
    "status-answer": {
      paragraphs: [
        "Les données officielles ne permettent pas de marquer les serveurs Global comme en ligne. Steam, le site ou une page de connexion accessibles prouvent uniquement ce service web, pas le fonctionnement des personnages, mondes, matchmaking ou marchés.",
        "Tant que NC ne publie pas les mondes, avis d’exploitation et une source vérifiable, KINA affiche qu’aucun état public en direct n’est disponible au lieu d’inventer un voyant vert.",
      ],
    },
    "confirmed-regions": {
      paragraphs: [
        "NC a annoncé des opérations en Amérique du Nord, Amérique du Sud, Europe et Japon, en dix langues. Ce sont des régions d’exploitation, pas une liste de serveurs ; elles ne définissent ni villes des centres de données, ni fuseaux, jeu interrégional ou transferts.",
        "Steam affiche l’accès anticipé le 30 septembre, mais heure et fuseau exacts demandent un avis de NC. Un compte à rebours de boutique ou minuit local ne remplacent pas l’heure serveur.",
      ],
      table: {
        caption: "État public des serveurs AION 2 Global",
        headers: ["Champ", "État actuel", "Ne pas déduire"],
        rows: [
          { header: "Régions d’exploitation", cells: ["Amérique du Nord, Amérique du Sud, Europe et Japon confirmés", "Villes ou classement de latence"] },
          { header: "Noms des mondes", cells: ["Liste complète non annoncée", "Nombre ou restrictions de création"] },
          { header: "État en direct", cells: ["Aucune API publique vérifiée", "En ligne, chargé ou en maintenance"] },
          { header: "Population", cells: ["Aucune donnée officielle en direct", "Monde populaire, factions ou files"] },
        ],
      },
    },
    "what-is-not-live": {
      paragraphs: [
        "Un état en temps réel exige une source officielle, une heure d’interrogation, la gestion des pannes et le détail par service. HTTP 200, publication sociale ou témoignage ne distinguent pas sûrement connexion, monde, matchmaking, marché et réseau régional.",
        "Sans cette preuve, une conception honnête affiche date de vérification, avis officiels et champs inconnus plutôt que de convertir inconnu en en ligne.",
      ],
    },
    "how-to-check": {
      paragraphs: [
        "Lisez l’avis Global de NC ou la mise à jour régionale, puis vérifiez Steam ou PURPLE. Si seule votre connexion échoue, notez plateforme, région, heure, code et contexte réseau sans publier compte, code unique ou adresse IP.",
      ],
      steps: [
        { title: "Consulter l’avis officiel", description: "Cherchez maintenance planifiée, intervention d’urgence ou incident connu." },
        { title: "Vérifier la mise à jour du client", description: "Relancez Steam ou PURPLE et vérifiez launcher et jeu." },
        { title: "Séparer la portée", description: "Comparez avec la même région et les avis officiels pour distinguer panne personnelle, FAI, plateforme ou jeu." },
        { title: "Conserver le contexte d’erreur", description: "Notez heure, région, plateforme et code pour le support officiel." },
      ],
    },
    "status-model": {
      paragraphs: [
        "Si NC publie une page ou une API, KINA pourra associer les ID officiels et afficher source, dernière mise à jour réussie, délai attendu et état inconnu en cas d’échec. Population et files resteront absentes sauf publication de NC.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Les serveurs AION 2 Global sont-ils déjà actifs ?", answer: "Les éléments officiels confirment septembre 2026 et l’accès anticipé le 30, pas un état Global vérifiable en direct." },
        { question: "Quels serveurs AION 2 existent ?", answer: "NC confirme Amérique du Nord, Amérique du Sud, Europe et Japon ; noms et nombre de mondes ne sont pas annoncés." },
        { question: "Pourquoi le site fonctionne-t-il pendant une maintenance ?", answer: "Site, connexion, mondes, matchmaking et marchés sont des services distincts. Un site accessible ne prouve pas que tout le jeu est en ligne." },
      ],
    },
  },
  "guides/aion-2-tier-list": {
    answer: {
      paragraphs: [
        "Avant le lancement Global, les preuves ne suffisent pas à produire un classement S, A ou B reproductible. Steam confirme huit classes, mais pas des résultats comparables à équipement, compétences, groupe, difficulté et équilibre identiques.",
        "Cette page publie donc d’abord les critères et règles de mise à jour. Une liste sans patch, région, contexte PvE/PvP, équipement et échantillon ne doit pas être universalisée.",
      ],
    },
    "why-no-ranking": {
      paragraphs: [
        "Season 2 contient des changements d’équilibre et des règles de classement par classe. Chapter 1 ajoute Brawler et modifie niveau, compétences et contenu. Patch, classes disponibles, équipement et activité influent clairement sur la comparaison.",
        "Steam présente huit classes Global, tandis que Chapter 1 régional inclut Brawler. Si même les classes diffèrent, copier un classement régional dans une tier list Global serait trompeur.",
      ],
    },
    "comparison-method": {
      paragraphs: [
        "Chaque liste doit répondre à une question précise : survie à niveau d’objet égal en PvE à cinq, utilité dans un groupe fixe, règles compétitives définies ou récupération d’erreur pour débutant. Un score unique pour toutes les activités masque les différences de conception.",
      ],
      table: {
        caption: "Champs requis pour comparer les classes après le lancement",
        headers: ["Champ", "Garder constant", "Ne pas mélanger"],
        rows: [
          { header: "Version", cells: ["Build du client, date et région", "Saisons ou services différents"] },
          { header: "Activité", cells: ["Donjon, boss, monde ouvert ou règles PvP", "Un total unique PvE/PvP"] },
          { header: "Conditions", cells: ["Équipement, compétences, groupe et expérience", "Personnages débutants et très investis"] },
          { header: "Mesure", cells: ["Dégâts, survie, contrôle, soutien ou récupération", "Popularité seule ou un record"] },
          { header: "Échantillon", cells: ["Assez d’essais et un protocole répétable", "Une vidéo ou un résultat maximal"] },
        ],
      },
    },
    "eight-classes": {
      paragraphs: [
        "Les classes Global de Steam sont Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric et Chanter. Avant de les classer, séparez mêlée ou distance, burst ou pression continue, dégâts, défense ou soins, valeur solo ou groupe et charge d’exécution.",
        "Pour choisir, utilisez le sélecteur et l’aperçu des huit classes selon portée, rythme et responsabilité, puis lisez les guides. Meilleur choix personnel et dégâts les plus élevés d’un patch sont deux questions différentes.",
      ],
      bullets: [
        "Débutant : tolérance à l’erreur, gestion des ressources et récupération.",
        "Groupe fixe : améliorations, contrôle, protection et responsabilité de soin.",
        "Solo : autonomie, changement de cible, mouvement et coût de préparation.",
        "PvP : séparez petite échelle, champ de bataille et guerre de factions.",
      ],
    },
    "update-policy": {
      paragraphs: [
        "Les tiers par activité exigent classes Global, Build d’équilibre, règles et échantillons comparables. Chaque mise à jour gardera date précédente, motif et limites. Un patch majeur ou une nouvelle classe rend l’ancienne liste historique, sans changer les lettres en silence.",
        "Un classement officiel par classe apporte un contexte interne, mais ne prouve pas à lui seul la force causale entre classes. Les conclusions KINA restent une analyse éditoriale, pas un classement NC.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Quelle est la meilleure classe AION 2 Global ?", answer: "Avant le lancement, les preuves Global contrôlées sont insuffisantes et NC n’a désigné aucune classe universellement supérieure." },
        { question: "Puis-je utiliser une tier list coréenne pour Global ?", answer: "Seulement pour comprendre les styles, pas comme classement Global. Patch, classes, valeurs et activités peuvent différer." },
        { question: "Quand KINA publiera-t-il des tiers de classe ?", answer: "Quand classes, Build d’équilibre, règles et échantillons Global comparables existeront, KINA publiera une analyse par version et activité." },
      ],
    },
  },
};

Object.assign(fr, {
  "classes/gladiator": {
    "official-profile": {
      paragraphs: [
        "Le Guidebook officiel de NC présente Gladiator comme une classe de dégâts de mêlée à la Greatsword, dotée d’une attaque et d’une défense relativement élevées et capable d’agir comme sub-tank.",
        "Le teaser Global inclut Gladiator et la présentation de 2025 décrit de puissantes attaques de zone en mêlée. Cela définit un rôle, pas un classement actuel des dégâts.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Boucle éditoriale d’entraînement : repérez une approche sûre, gardez une position de mêlée durable, décidez quand absorber ou éviter la pression, puis reculez si la ligne de front devient défavorable.",
        "Sub-tank fait partie du profil officiel, sans prouver que Gladiator remplace le tank principal dans tous les groupes. Règles, composition et texte actuel des compétences déterminent la responsabilité réelle.",
      ],
    },
    "gladiator-arcana-selection": {
      paragraphs: [
        "Au 26 juillet 2026, NC confirmait l’extension du système Arcana, mais aucune sélection permanente idéale pour chaque Build et activité de Gladiator. Définissez l’activité, identifiez ce qui interrompt le temps utile en mêlée, puis seulement comparez les dégâts.",
        "Vérifiez d’abord si Gladiator peut entrer et maintenir une fenêtre utile, puis si le déclencheur Arcana se répète dans ce contexte. Refaites le test lorsque texte, set, amélioration ou Build régional change.",
      ],
      bullets: [
        "Notez région, Build, activité et responsabilité de groupe ; séparez boss, solo et PvP de masse.",
        "Comparez d’abord accès, récupération du placement et temps utile en mêlée, pas les effets limités à une fenêtre idéale.",
        "Changez une carte ou un set à la fois et répétez le scénario en notant morts, replis forcés et fenêtres durables.",
        "Invalidez le résultat si un déclencheur ou une règle change ; un ancien test n’est pas une meta permanente.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Ces contextes sont des déductions éditoriales du rôle officiel, pas un classement de style ni une affirmation de victoire de NC.",
      ],
      bullets: [
        "PvE : privilégiez le temps de mêlée stable et les mécaniques avant de prolonger les dégâts en danger.",
        "PvP : définissez cible, approche et sortie avant de maintenir la pression.",
        "RvR : avancez avec la ligne alliée et ne la franchissez pas sans soutien.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La grille KINA v1 évalue la prise en main à 2/5 et la maîtrise à 4/5. Un indique une charge faible ; cinq demande davantage d’exécution, d’informations ou de responsabilités simultanées.",
        "L’objectif de classe est lisible, mais placement en mêlée, temps de contact et alternance attaque-défense augmentent la maîtrise.",
        "L’évaluation n’utilise ni tableau de dégâts, ni taux de victoire, ni seuil d’équipement, ni valeur non publiée.",
        "Les notes ne comparent ni dégâts, ni victoires, ni valeur, investissement ou demande de groupe et n’établissent aucun tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Entraînez le temps de mêlée sûr et la lecture des dangers avant de décider quand avancer ou reculer.",
      ],
      steps: [
        { title: "Construire une base sûre", description: "Entraînez l’entrée et la sortie sans accepter de danger inutile." },
        { title: "Ajouter une charge à la fois", description: "Lisez ligne de front, alliés, zone dangereuse et sortie avant chaque avancée." },
        { title: "Revoir le Build actuel", description: "Créez une boucle personnelle courte avec le texte actuel et notez Build et contexte." },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Ce sont des rappels éditoriaux qui ne supposent aucune compétence, cooldown ou coefficient non vérifié.",
      ],
      bullets: [
        "Confondre défense et immunité aux mécaniques ; utilisez la résistance pour récupérer.",
        "Poursuivre au-delà des alliés et de la sortie ; vérifiez la ligne avant d’entrer.",
        "Transformer sub-tank en règle fixe ; confirmez activité et responsabilité.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Greatsword, dégâts de mêlée et sub-tank reflètent les sources officielles accessibles le 18 juillet 2026.",
        "La page ne confirme ni compétences, dégâts, cooldowns, attributs ou équipement optimal du lancement Global.",
        "Le jeu de données couvre neuf classes vérifiées le 18 juillet 2026 : les huit de Global et Brawler, ajouté au Build Chapter 1 Corée/Taïwan le 1er juillet. Compétences, classes, équilibre et style final Global restent à vérifier.",
      ],
    },
  },
  "classes/assassin": {
    "official-profile": {
      paragraphs: [
        "Le Guidebook officiel de NC présente Assassin avec deux dagues, furtivité, enchaînements rapides et effets d’état pour mettre une cible sous pression pendant une courte fenêtre.",
        "Le teaser Global inclut Assassin et la présentation de 2025 le décrit comme spécialiste de mêlée précis. Aucune source ne publie d’enchaînement ou de rang optimal permanent.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Boucle éditoriale d’entraînement : observez cible et sortie, attendez une entrée contrôlable, exécutez une courte séquence définie, puis reculez ou replacez-vous selon le résultat.",
        "La furtivité ne signifie ni sécurité permanente ni première action garantie. Visibilité, contrôle et interaction des compétences dépendent de la version active.",
      ],
    },
    "assassin-arcana-selection": {
      paragraphs: [
        "Les mises à jour de NC confirment l’extension d’Arcana, mais au 26 juillet 2026 aucune liste officielle permanente pour Assassin. Testez entrée, pression courte répétable et sortie sûre plutôt que de classer une carte sur un résultat idéal.",
        "Chaque test doit confirmer que le déclencheur correspond aux compétences et au contexte actuels. S’il exige une préparation instable ou supprime la sortie prévue, classez-le comme situationnel.",
      ],
      bullets: [
        "Fixez type de cible, condition d’entrée et point de sortie avant de comparer Arcana ; ne mélangez pas les scénarios.",
        "Notez entrées réussies, annulations forcées et réinitialisations sûres ; une tentative à gros dégâts ne décide pas du résultat.",
        "Séparez les notes par version pour PvE, arène et combat de masse, car fenêtres et réponses changent.",
        "Revérifiez déclencheurs, durées et sets après modification officielle ; aucun best-in-slot ou meta permanent n’est affirmé.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Ces contextes sont des déductions éditoriales du rôle officiel, pas un classement de style ni une affirmation de victoire de NC.",
      ],
      bullets: [
        "PvE : sécurisez la mécanique de mêlée et la sortie avant d’optimiser la courte fenêtre.",
        "PvP : traitez cible, entrée et sortie comme une seule décision.",
        "RvR : observez les flancs et limitez les cibles ; n’avancez plus si le soutien disparaît.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La grille KINA v1 évalue la prise en main à 4/5 et la maîtrise à 5/5. Un indique une charge faible ; cinq demande davantage d’exécution, d’informations ou de responsabilités simultanées.",
        "Exécution condensée, placement, timing et récupération après échec se disputent l’attention et élèvent les deux charges.",
        "Une difficulté élevée ne signifie pas une puissance élevée ; aucun dégât, taux de victoire ou tier n’en est déduit.",
        "Les notes ne comparent ni dégâts, ni victoires, ni valeur, investissement ou demande de groupe et n’établissent aucun tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Entraînez observation et repli sûr avant de condenser entrée, pression et réinitialisation dans une courte fenêtre.",
      ],
      steps: [
        { title: "Construire une base sûre", description: "N’entrez pas : identifiez seulement cible, danger et sortie sûre." },
        { title: "Ajouter une charge à la fois", description: "Ajoutez une courte entrée et un retour, afin de pouvoir annuler une mauvaise entrée." },
        { title: "Revoir le Build actuel", description: "Créez une petite séquence depuis le texte actuel et testez des contextes séparés." },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Ce sont des rappels éditoriaux qui ne supposent aucune compétence, cooldown ou coefficient non vérifié.",
      ],
      bullets: [
        "Entrer sans sortie ; définissez la direction du repli avant d’agir.",
        "Traiter la furtivité comme une sécurité absolue ; gardez les inconnues et vérifiez les réponses actuelles.",
        "Utiliser une ancienne rotation ou vidéo comme réponse actuelle ; notez région, Build et texte.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Deux dagues, furtivité, enchaînements rapides, états et précision de mêlée reflètent les sources vérifiées le 18 juillet 2026.",
        "Aucun nom, cooldown, coefficient, durée de contrôle, équipement ou meilleur enchaînement n’est affirmé.",
        "Le jeu de données couvre neuf classes vérifiées le 18 juillet 2026 : les huit de Global et Brawler, ajouté au Build Chapter 1 Corée/Taïwan le 1er juillet. Compétences, classes, équilibre et style final Global restent à vérifier.",
      ],
    },
  },
  "classes/ranger": {
    "official-profile": {
      paragraphs: [
        "Le Guidebook officiel de NC présente Ranger avec un arc et insiste sur placement, timing et réponse tactique à distance.",
        "Le teaser Global actuel utilise Ranger. La présentation anglaise de 2025 utilisait Marksman pour un éclaireur à longue portée ; KINA suit le nom Global actuel.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Boucle éditoriale d’entraînement : établissez portée et ligne de vue sûres, replacez-vous quand cible ou environnement bouge, attaquez uniquement si la position le permet et gardez de l’espace pour le prochain mouvement.",
        "La distance n’est pas une immunité. Portée réelle, restrictions de mouvement et comportement des compétences se vérifient dans le texte actuel.",
      ],
    },
    "ranger-skill-tree-priority": {
      paragraphs: [
        "Au 26 juillet 2026, les sources confirmaient un rôle à distance fondé sur placement, timing et réponse, mais aucun Skill Tree Global optimal permanent. Il s’agit d’un cadre par version, pas d’une liste inventée ni d’une allocation fixe.",
        "Regroupez les compétences actuelles en quatre fonctions : préserver portée et vue, exécuter l’action centrale fiable, répondre à la mécanique et ajouter des dégâts idéaux. Changez la priorité selon l’échec observé et sauvegardez un nouveau Skill Tree après chaque mise à jour du Build.",
      ],
      bullets: [
        "D’abord : préserver position sûre, ligne de vue et prochaine route pendant les mécaniques.",
        "Ensuite : renforcer la fonction centrale répétable ; ne privilégiez pas une estimation supérieure si sa condition échoue.",
        "Puis : ajouter contrôle, mobilité, survie ou utilité pour PvE, PvP ou RvR dans des Skill Trees séparés.",
        "Enfin : comparer les dégâts purs en notant région, Build, équipement et activité ; revoir après modification du texte.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Ces contextes sont des déductions éditoriales du rôle officiel, pas un classement de style ni une affirmation de victoire de NC.",
      ],
      bullets: [
        "PvE : réservez la prochaine position avant une mécanique ; ne perdez pas la vue pour une action supplémentaire.",
        "PvP : incluez portée, obstacles et routes adverses dans le choix de cible.",
        "RvR : restez lié à la ligne alliée et évitez de poursuivre hors protection.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La grille KINA v1 évalue la prise en main à 3/5 et la maîtrise à 4/5. Un indique une charge faible ; cinq demande davantage d’exécution, d’informations ou de responsabilités simultanées.",
        "La distance réduit une partie de la pression de contact ; placement, ligne de vue et planification élèvent la maîtrise.",
        "La note n’indique ni force ni rang de Ranger en PvE, PvP ou RvR.",
        "Les notes ne comparent ni dégâts, ni victoires, ni valeur, investissement ou demande de groupe et n’établissent aucun tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Entraînez le maintien de la portée et de la ligne de vue en mouvement avant de rechercher des fenêtres d’attaque régulières.",
      ],
      steps: [
        { title: "Construire une base sûre", description: "Sans attaquer, gardez portée, vue et prochaine position sûre pendant le mouvement." },
        { title: "Ajouter une charge à la fois", description: "Ajoutez une cible et conservez une route de mouvement après chaque action." },
        { title: "Revoir le Build actuel", description: "Vérifiez portée, restrictions et tooltips actuels avant d’affiner la boucle." },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Ce sont des rappels éditoriaux qui ne supposent aucune compétence, cooldown ou coefficient non vérifié.",
      ],
      bullets: [
        "Regarder la distance mais pas les obstacles ou la sortie ; vérifiez vue et prochaine position ensemble.",
        "Poursuivre hors protection ; définissez une ligne de front à ne pas franchir.",
        "Supposer tout rôle à distance facile ; évaluez placement et décisions séparément.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Arc, distance, placement, timing et réponse tactique reflètent les sources vérifiées le 18 juillet 2026.",
        "Aucune portée, règle d’attaque mobile, compétence, dégâts, équipement ou équilibre Global n’est affirmé.",
        "Le jeu de données couvre neuf classes vérifiées le 18 juillet 2026 : les huit de Global et Brawler, ajouté au Build Chapter 1 Corée/Taïwan le 1er juillet. Compétences, classes, équilibre et style final Global restent à vérifier.",
      ],
    },
  },
  "classes/sorcerer": {
    "official-profile": {
      paragraphs: [
        "Le Guidebook officiel de NC présente Sorcerer avec un Spellbook, des dégâts magiques élevés sur une courte fenêtre et la gestion de la portée et du contrôle.",
        "Le teaser Global inclut Sorcerer et la présentation de 2025 décrit un burst magique élevé. Le profil ne donne ni rang de dégâts ni meilleur ordre de compétences.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Boucle éditoriale d’entraînement : établissez une position d’incantation sûre, lisez cible et danger, appliquez une courte pression tant que la fenêtre existe et annulez si la position échoue.",
        "Le contrôle appartient au profil officiel ; compétences, durées et réponses doivent provenir du texte actuel.",
      ],
    },
    "sorcerer-versioned-build": {
      paragraphs: [
        "La présentation officielle confirme un combat manuel guidé par les décisions, pas un Build permanent pour Sorcerer. Au 26 juillet 2026, chaque plan doit indiquer région, date du Build, activité et objectif plutôt qu’une capture sans contexte.",
        "Écrivez d’abord le problème — mouvement fréquent, fenêtre courte ou besoin de contrôle — puis choisissez selon le client disponible. Si Build, condition ou activité change, conservez l’ancienne fiche et créez-en une nouvelle.",
      ],
      bullets: [
        "Notez région, Build du client, date, contexte PvE/PvP/RvR et équipement pertinent.",
        "Donnez à chaque choix un but et un résultat observable ; marquez non vérifié sans test répétable.",
        "Changez une priorité à la fois et répétez le scénario pour ne pas confondre équipement, groupe ou mécanique avec le Build.",
        "Conservez les versions datées ; aucune meta permanente, coefficient, cooldown ou conclusion de dégâts optimaux.",
      ],
    },
    "sorcerer-skill-priority": {
      paragraphs: [
        "La priorité n’est pas une rotation fixe. Préservez d’abord les outils qui gardent une position valide ou interrompent une mauvaise fenêtre, puis renforcez les fonctions répétables de magie et de contrôle. Comparez les dégâts idéaux seulement quand ces couches restent fiables.",
      ],
      bullets: [
        "Couche un : position sûre et annulation, pour transformer une condition ratée en mouvement.",
        "Couche deux : fonction centrale répétable pour l’activité, sans prérequis instable.",
        "Couche trois : contrôle, mobilité, survie ou réponse exigée par la rencontre, l’adversaire ou la ligne de masse.",
        "Couche quatre : dégâts supplémentaires sans briser les trois précédentes ; recommencez la revue après mise à jour.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Ces contextes sont des déductions éditoriales du rôle officiel, pas un classement de style ni une affirmation de victoire de NC.",
      ],
      bullets: [
        "PvE : privilégiez position sûre et mouvement de mécanique avant de finir une fenêtre.",
        "PvP : créez portée et ligne de vue avant d’engager une courte pression.",
        "RvR : ajustez l’arrière-garde à la ligne alliée et évitez les routes d’approche directes.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "La grille KINA v1 évalue la prise en main à 3/5 et la maîtrise à 4/5. Un indique une charge faible ; cinq demande davantage d’exécution, d’informations ou de responsabilités simultanées.",
        "L’objectif est clair ; placement, fenêtre d’incantation et contrôle rendent la maîtrise plus exigeante.",
        "La difficulté n’est pas un plafond de dégâts et ne démontre aucun tier PvE ou PvP.",
        "Les notes ne comparent ni dégâts, ni victoires, ni valeur, investissement ou demande de groupe et n’établissent aucun tier.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Entraînez une position d’incantation sûre et l’annulation d’une mauvaise décision avant d’organiser de courtes fenêtres.",
      ],
      steps: [
        { title: "Construire une base sûre", description: "Ignorez l’exécution complète et choisissez une position sûre puis la suivante." },
        { title: "Ajouter une charge à la fois", description: "Ajoutez une courte fenêtre et annulez en mouvement si sa condition échoue." },
        { title: "Revoir le Build actuel", description: "Utilisez le texte régional actuel et testez contrôle et dégâts séparément." },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Ce sont des rappels éditoriaux qui ne supposent aucune compétence, cooldown ou coefficient non vérifié.",
      ],
      bullets: [
        "Finir une action après avoir perdu la position ; entraînez annulation et mouvement.",
        "Regarder la portée mais pas la ligne de vue ou la route d’entrée ; planifiez aussi la position suivante.",
        "Transformer le burst officiel en affirmation de dégâts numéro un ; gardez-le comme profil.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Spellbook, magie de courte fenêtre, portée et contrôle reflètent les sources vérifiées le 18 juillet 2026.",
        "Aucune compétence, durée d’incantation, cooldown, coefficient, contrôle, équipement ou meilleure boucle n’est affirmé.",
        "Le jeu de données couvre neuf classes vérifiées le 18 juillet 2026 : les huit de Global et Brawler, ajouté au Build Chapter 1 Corée/Taïwan le 1er juillet. Compétences, classes, équilibre et style final Global restent à vérifier.",
      ],
    },
  },
  "guides/character-presets-style-shop": {
    "official-features": {
      paragraphs: [
        "L’annonce de NC du 17 novembre 2025 indique qu’AION2 propose plus de 200 réglages, avec contrôle détaillé du corps, de la peau, de l’iris et de la musculature. Elle mentionne aussi des préréglages pour les joueurs moins familiers avec Character Creation et une page officielle Style Shop.",
        "Cela confirme des outils détaillés et une vitrine officielle. Chaque fiche communautaire n’est pas pour autant un préréglage validé par NC : conservez auteur, date, conditions du personnage et Build.",
      ],
    },
    "safe-use": {
      paragraphs: [
        "Le texte officiel ne promet pas la compatibilité de chaque préréglage entre race, sexe, région ou versions futures et ne décrit aucun format tiers universel. Une capture ne prouve ni import en un clic ni compatibilité Global.",
      ],
      bullets: [
        "Commencez par Style Shop ou l’interface du jeu ; n’exécutez aucun programme inconnu pour un visage.",
        "Notez race, sexe, Build régional et date avant de recopier des valeurs.",
        "Obtenez l’autorisation et gardez le crédit du créateur lors d’une republication.",
      ],
    },
  },
  "guides/global-monetization-watchlist": {
    confirmed: {
      paragraphs: [
        "Oui. NC indique que le jeu de base sera Free-to-Play sans achat obligatoire ; Steam l’affiche Free To Play avec In-App Purchases. L’accès gratuit ne signifie pas que boutique, Membership, Pass et tous les services sont gratuits.",
        "NC réserve Market et Kina/Quna Exchange à une Membership active. Sans tableau complet pour les non-membres, Free-to-Play ne permet pas d’affirmer que chaque fonction sociale ou pratique est gratuite.",
      ],
      table: {
        caption: "Monétisation AION 2 Global — vérifiée le 24 juillet 2026",
        headers: ["Fonction", "Confirmé", "En attente"],
        rows: [
          { header: "Jeu de base", cells: ["Free-to-Play ; aucun achat requis", "Conditions finales et différences régionales"] },
          { header: "Membership", cells: ["Prévue à 15 US$ par mois", "Avantages, renouvellement et prix régionaux"] },
          { header: "Market / Exchange", cells: ["Membership active requise", "Frais, limites et règles finales"] },
          { header: "Kina / Quna", cells: ["Kina gagné en jeu ; Quna premium", "Packs, prix et taux de Quna"] },
          { header: "Daeva Pass", cells: ["Par personnage ; pistes Standard et Premium", "Prix, rythme et récompenses"] },
          { header: "Échange direct", cells: ["Exchange entre joueurs confirmé", "Existence d’un échange direct entre joueurs"] },
        ],
      },
    },
    "pay-to-win-assessment": {
      paragraphs: [
        "Réponse courte : les preuves actuelles ne permettent pas de conclure qu’AION 2 Global est pay-to-win, ni de garantir que dépenser n’a aucun effet pratique. NC affirme que les cosmétiques n’offrent aucun avantage et que les consommables n’affectent ni progression d’équipement ni puissance à long terme et s’obtiennent en jouant. Catalogue, prix, rythmes, Membership et Pass restent incomplets.",
        "Évaluez en deux temps : avant le lancement, relevez engagements officiels et inconnues ; après, comparez vitesse d’acquisition, portée échangeable, coût en temps et résultats des joueurs payants ou non. Founder's Packs, Membership, Quna et Daeva Pass s’analysent séparément.",
      ],
      bullets: [
        "Confirmé : jeu de base gratuit, In-App Purchases sur Steam et cosmétiques sans avantage selon NC.",
        "Inconnu : boutique et prix complets, avantages Membership, récompenses Pass, taux Quna et vitesse gratuite.",
        "Méthode KINA : conserver dates et sources, puis répéter les contrôles sur le service Global actif.",
      ],
    },
    membership: {
      paragraphs: [
        "Le plan de pré-lancement fixe Membership à 15 US$ par mois. Il inclut Market, Kina/Quna Exchange, des avantages supplémentaires et une boutique spéciale utilisant Kina.",
        "NC n’a pas publié tous les avantages, le tableau non-membre, les prix régionaux, taxes, renouvellement ou résiliation. Le jeu de base est gratuit ; les verrouillages précisément confirmés sont Market et Exchange.",
      ],
      bullets: [
        "15 US$ par mois est le plan actuel, pas une garantie de prix final.",
        "Market et Kina/Quna Exchange exigent une Membership active.",
        "Avantages et boutique Kina sont cités, mais la liste complète manque.",
        "Aucune limite complète de niveau, groupe, donjon ou PvP sans Membership n’est publiée.",
      ],
    },
    "currencies-and-pass": {
      paragraphs: [
        "Kina se gagne en jouant et sert dans Market. Quna est premium et sert à la boutique, au Premium Daeva Pass et à l’achat de Kina via Exchange. NC indique que le jeu ne crée pas d’offres : offre et demande des joueurs pilotent le marché.",
        "Daeva Pass progresse par personnage. Tous reçoivent la piste Standard et Quna ouvre Premium. Cosmétiques, objets, matériaux et monnaies sont cités. Prix, taux, coût, rythme et tableau complet restent inconnus.",
      ],
      steps: [
        { title: "Séparer les monnaies", description: "Kina se gagne en jeu et Quna est premium ; ne les traitez pas comme des soldes interchangeables." },
        { title: "Vérifier Membership", description: "Market et Kina/Quna Exchange exigent une Membership active." },
        { title: "Budgéter le Pass par personnage", description: "Daeva Pass est par personnage ; ne supposez pas que Premium couvre tout le compte." },
        { title: "Attendre les vrais prix", description: "Ne convertissez pas les chiffres régionaux avant les packs, taux et prix Global." },
      ],
    },
    "power-and-unknowns": {
      paragraphs: [
        "NC affirme que les cosmétiques n’offrent aucun avantage de jeu ou de combat et que les consommables aident sans affecter l’équipement ou la puissance à long terme et s’obtiennent en jouant. C’est la position publiée, pas un test indépendant de vitesse, d’économie ou d’écart compétitif.",
        "Manquent liste Membership, prix et taux Quna, échange direct, rythme et récompenses Pass et conditions régionales. Les Founder's Packs sont des achats uniques distincts et leur contenu publié n’inclut pas Membership.",
      ],
      faq: [
        { question: "Dois-je acheter AION 2 Global ?", answer: "Non. Le jeu de base sera Free-to-Play, tout en proposant Membership, Quna, Pass et achats de boutique." },
        { question: "Combien coûte AION 2 Membership ?", answer: "NC prévoit 15 US$ par mois. Prix régional, taxes, renouvellement, résiliation et avantages attendent la page finale." },
        { question: "Les non-membres peuvent-ils utiliser Market ?", answer: "Non selon le plan actuel. Market et Kina/Quna Exchange exigent Membership ; les autres limites restent incomplètes." },
        { question: "Daeva Pass couvre-t-il tout le compte ?", answer: "NC le décrit par personnage. Standard est disponible pour tous et Quna ouvre Premium ; ne supposez pas un achat pour tous." },
        { question: "AION 2 Global est-il pay-to-win ?", answer: "NC affirme que cosmétiques et consommables n’offrent pas de puissance à long terme, mais catalogue, prix et rythmes sont incomplets ; l’évaluation finale exige les données du lancement." },
      ],
    },
  },
});

const de = {
  "database/aion-2-wiki": {
    "what-this-hub-is": {
      paragraphs: [
        "Dieses AION 2 Wiki trennt Anfragen nach Datentyp. Klassenseiten erklären Rollen und Spielweisen, die Gegenstandsdatenbank bewahrt offizielle IDs und Kategorien, interaktive Karten bündeln Orte und Filter, Werkzeuge berechnen Materialien und Guides erläutern Bedingungen, Versionen und Anwendung. Alles landet nicht in einer undatierten Tabelle.",
        "Global-Informationen beruhen auf Ankündigungen von NC und der Steam-Seite. Systeme oder Werte der laufenden Dienste in Korea und Taiwan erscheinen nur mit Regionsangabe, damit ein asiatischer Build nicht als bestätigter Global-Start dargestellt wird.",
      ],
      table: {
        caption: "Themenverzeichnis des AION 2 Wiki",
        headers: ["Thema", "Wofür geeignet", "Zuerst prüfen"],
        rows: [
          { header: "Klassen", cells: ["Rollen, Waffen, Steuerung und Guides", "Patch und Aktivitätskontext"] },
          { header: "Gegenstände", cells: ["Offizielle ID, Kategorie, Beschreibung und Symbol", "Lokalisierter Name und Region"] },
          { header: "Interaktive Karte", cells: ["Punkte, Koordinaten, Typen und Routen", "Kartenversion und Sammelstand"] },
          { header: "Herstellung", cells: ["Rezepte und Materialschätzungen", "Aktuelles Rezept im Spiel"] },
          { header: "Global-Start", cells: ["Plattformen, Termine, Server und Käufe", "Neueste Mitteilung von NC oder Steam"] },
        ],
      },
    },
    "official-scope": {
      paragraphs: [
        "Von NC oder Steam belegte Fakten behalten Quellenbezeichnung, Veröffentlichungsdatum und KINA-Prüfdatum. Von KINA erstellte Gruppierungen, Vergleiche, Routen und Berechnungen sind redaktionelle Arbeit und keine Empfehlungen von NC.",
        "Fehlt eine offizielle Antwort, bleibt das Feld unbekannt, nicht angekündigt oder im Spiel zu prüfen. Unbekannt bedeutet weder null noch unmöglich, sondern nur: Die Quelle trägt keine eindeutige Antwort.",
      ],
      bullets: [
        "Bevorzuge Mitteilungen von NC, offizielle Datenseiten und den offiziellen Steam-Eintrag.",
        "Weichen lokalisierte Namen ab, vergleiche ID, Symbol, Kategorie und Kontext.",
        "Für Live-Preise, Raten, Ereignisse und Serverstatus gilt der aktuelle Client oder die neueste Betriebsmitteilung.",
      ],
    },
    "use-the-hub": {
      paragraphs: [
        "Beschränke jede Frage auf Region, Version und Datentyp. Für Global-Vorbereitung beginne mit Plattformen, Anforderungen und Download. Suche einen Gegenstand nach Name oder offizieller ID. Öffne für eine Sammelroute die passende Karte und aktiviere nur den benötigten Markertyp.",
      ],
      steps: [
        { title: "Dienst auswählen", description: "Trenne Global von Daten aus Korea oder Taiwan/Hongkong/Macau." },
        { title: "Datentyp auswählen", description: "Klassen, Gegenstände, Karten, Herstellung, Guides und News beantworten verschiedene Fragen." },
        { title: "Datum und Quelle lesen", description: "Prüfe Aktualisierung und Beleg, bevor du Zahl, Route oder Empfehlung übernimmst." },
        { title: "Im Client bestätigen", description: "Der aktuelle Client ist die letzte Kontrolle für Live-Status, Preise, Raten und Ereignisse." },
      ],
    },
    "what-is-not-included": {
      paragraphs: [
        "KINA macht Suchinteresse, Gerüchte, undatierte Community-Tabellen oder Videos Dritter nicht zu offiziellen Fakten. Das Wiki erfindet weder Global-Serverpopulation, Konsolen- oder Mobile-Support, Klassen-Tiers noch unveröffentlichte Dropraten.",
        "Gibt es nur Belege aus Korea oder Taiwan, bleibt die Dienstkennzeichnung erhalten. Nach offizieller Veröffentlichung kann ein Global-Feld unter derselben Inhaltsidentität ergänzt werden, ohne den älteren Regionsdatensatz still zu überschreiben.",
      ],
    },
    "wiki-faq": {
      paragraphs: [],
      faq: [
        { question: "Ist das AION 2 Wiki eine offizielle NC-Website?", answer: "Nein. Es ist der von PFG redigierte Datenbereich von AION2 KINA. Offizielle Aussagen verlinken Primärquellen von NC oder Steam." },
        { question: "Dürfen Global-Spieler Korea-Werte aus dem Wiki übernehmen?", answer: "Nicht automatisch. Jede Seite nennt den Dienst; ein unbestätigter Global-Wert lässt sich nicht aus Korea oder Taiwan ableiten." },
        { question: "Was gilt, wenn Datensatz und Spiel abweichen?", answer: "Folge dem aktuellen Client und der neueren offiziellen Mitteilung; melde danach Seite, Build, Datum und prüfbares Feld." },
      ],
    },
  },
  "guides/aion-2-gameplay": {
    "quick-answer": {
      paragraphs: [
        "NC beschreibt AION 2 als MMORPG mit Unreal Engine 5, in dem auch der Himmel zum Schlachtfeld wird. Du wählst Elyos oder Asmodians, wirst Daeva und erkundest, kämpfst und sammelst am Boden und in der Luft. Fliegen beeinflusst Position, Höhe, Erkundung und Kampf.",
        "Der Kampf betont Präzision, Timing und Positionierung statt einer festen Rotation. Klassen lassen sich mit Skills und Builds anpassen; Balance, genaue Werte und beste Builds zum Global-Start lassen sich jedoch nicht aus den heutigen asiatischen Diensten ableiten.",
      ],
    },
    "world-flight": {
      paragraphs: [
        "Steam beschreibt eine 36-mal größere Welt als im Original, mit Regionen, Schlachtfeldern und Begegnungen für vertikalen Raum. Spieler steigen, drehen und nähern sich aus unterschiedlichen Höhen; Kartenlesen umfasst deshalb Höhe, Zugang und Flugroute ebenso wie Entfernung.",
        "Die offizielle Seite nennt auch Reittiere als Sammelinhalt. Flugbeschränkungen, regionale Bedingungen, Erwerbsmethoden und die Auswahl zum Global-Start brauchen weiterhin offizielle oder spielinterne Bestätigung.",
      ],
    },
    "combat-classes": {
      paragraphs: [
        "Die Global-Seite auf Steam nennt acht Klassen. KINA ordnet die offiziellen Rollen und Waffen von Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric und Chanter. Wähle nach Reichweite, Tempo, Gruppenverantwortung und Fehlererholung, nicht nach einer undatierten Tier List.",
        "Live-Updates zeigen, dass Klassen und Skills sich je Saison ändern. Jede Aussage braucht Aktivität, Patch, Ausrüstung und Testkontext. Ein Ranking aus Korea oder Taiwan beweist vor dem Start nicht die stärkste Global-Klasse.",
      ],
    },
    "pve-pvp": {
      paragraphs: [
        "Steam nennt mehr als 200 Dungeons für Solo-Herausforderungen sowie Gruppen mit fünf oder zehn Spielern, dazu saisonale Aufgaben, Rankings und Open-World-Ereignisse. Regeln, Matchmaking und Ersatz während eines Laufs brauchen noch Global-Betriebsdaten.",
        "PvP beruht auf dem Konflikt Elyos–Asmodians und dem Abyss; Matchmaking, serverübergreifende Regeln, Balance, Zeiten und Startmodi benötigen Global-Daten. Die offizielle Seite zeigt außerdem Shugo-Festival-Minispiele und Charaktersammlung.",
      ],
      bullets: [
        "PvE: Solo-, Fünfer- und Zehner-Dungeons sowie Open-World-Ereignisse.",
        "PvP: Fraktionskonflikt, Abyss und angekündigte Wettbewerbsinhalte.",
        "Erkundung: freies Fliegen, vertikales Gelände, Sammlung und Reittiere.",
        "Nebenaktivitäten: Anpassung, Outfits, Flügel, Begleiter und Minispiele.",
      ],
    },
    "global-boundary": {
      paragraphs: [
        "Bestätigt sind Global-PC, Steam/PURPLE, zehn Sprachen und vier Betriebsregionen. Vollständige Dungeonliste, Start-Saison, Klassenbalance, Wirtschaft, tägliche oder wöchentliche Limits, Servernamen und genaue Öffnungszeit brauchen neue Mitteilungen.",
        "Chapter 1, Season 2 oder Ereignisse aus Korea/Taiwan können heutige Systeme erklären, dürfen aber ihre Regionskennzeichnung nicht verlieren und kein Global-Startversprechen werden.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Ist AION 2 ein Action-MMORPG?", answer: "NC betont manuellen Kampf, Präzision, Timing, Positionierung und vertikales Fliegen. Steam ordnet es Action, Adventure, MMO und RPG zu." },
        { question: "Hat AION 2 Solo-Inhalte?", answer: "Ja. Die offizielle Steam-Seite bestätigt Solo-, Fünfer- und Zehner-Dungeons." },
        { question: "Übernimmt Global die Korea-Version unverändert?", answer: "NC hat keinen identischen Build versprochen. Inhalte aus Korea/Taiwan helfen nur mit sichtbarer Regionsangabe." },
      ],
    },
  },
  "guides/aion-2-download": {
    "current-status": {
      paragraphs: [
        "NC bestätigt Steam und PURPLE als PC-Kanäle für Global. Steam zeigt September 2026, Early Access am 30. September und Founder's Packs; diese Store-Felder bedeuten nicht, dass die Dateien schon verfügbar sind.",
        "Zum Prüfzeitpunkt waren weder Global-Preload-Termin, Öffnungszeit, komprimierte Größe noch PURPLE-Global-Anleitung veröffentlicht. Der regionale Preload von November 2025 darf nicht als Global-Zeitplan dienen.",
      ],
    },
    "official-channels": {
      paragraphs: [
        "Steam zeigt Global-Store, Anforderungen, Sprachen, Founder's Packs und Shopstatus. PURPLE ist die NC-Plattform. Beide sind Global-PC-Kanäle; Kontoverknüpfung, Fortschritt, Besitz, Erstattungen und Preload folgen den jeweiligen Plattformregeln.",
        "Installiere auf Steam von der AION-2-Seite im Client. Rufe PURPLE über die offizielle Global-Website von NC auf. KINA hostet keine Installer und bietet keinen Downloadbeschleuniger.",
      ],
      table: {
        caption: "Downloadkanäle für AION 2 Global",
        headers: ["Kanal", "Bestätigt", "Noch offen"],
        rows: [
          { header: "Steam", cells: ["Global-PC-Kanal, Store und Anforderungen", "Zeitpunkt des Preloads und tatsächliche Größe"] },
          { header: "PURPLE", cells: ["Von NC angekündigter Global-PC-Kanal", "Global-Installation und Preload-Zeitpunkt"] },
        ],
      },
    },
    "safe-steps": {
      paragraphs: [
        "Öffne die Global-Seite von NC oder Steam über eine eingegebene Adresse oder ein vertrauenswürdiges Lesezeichen. Meide unaufgeforderte Kurzlinks, ähnlich aussehende Anzeigen und Dateispiegel. Logo, HTTPS und ähnliche Domain beweisen nicht, dass NC den Installer veröffentlicht hat.",
      ],
      steps: [
        { title: "Plattformseite prüfen", description: "Steam muss app/3393110 verwenden; PURPLE nur über einen offiziellen Global-Einstieg von NC öffnen." },
        { title: "Anforderungen prüfen", description: "64-Bit-Windows 10/11, DirectX 12 und 100 GB frei vorbereiten; Steam empfiehlt eine SSD." },
        { title: "Offiziellen Installationsstatus abwarten", description: "Erst herunterladen, wenn der Client Installieren freigibt oder NC den Preload ankündigt." },
        { title: "Belege aufbewahren", description: "Bestellung und offizielle Fehler für den Support sichern, ohne Passwörter oder Codes offenzulegen." },
      ],
    },
    "regional-difference": {
      paragraphs: [
        "Korea und Taiwan nutzten im November 2025 eine PURPLE-Vorinstallation; diese Mitteilung beschreibt ihren regionalen Start. Die Ankündigung von April 2026 definiert Global als PC-Version über Steam und PURPLE.",
        "Eine regionale Zeit ersetzt daher nicht die Global-Anforderung von 100 GB auf Steam und bestätigt keinen Global-Mobile-Client. Jeder Ablauf und jede Zahl braucht seine Dienstangabe.",
      ],
    },
    unknowns: {
      paragraphs: [
        "Offen sind Datum und Uhrzeit des Global-Preloads, PURPLE-Global-Installationsseite, Download- und Patchgröße, Update vor dem Login, plattformübergreifender Fortschritt und genaue Regionsbeschränkungen. Warte auf offizielle Daten.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Kann ich AION 2 Global jetzt vorladen?", answer: "Am 26. Juli 2026 nannten die geprüften offiziellen Quellen weder Datum noch Uhrzeit für einen Global-Preload." },
        { question: "Wie viel Speicher braucht der AION-2-Download?", answer: "Steam verlangt 100 GB freien Speicher und empfiehlt eine SSD. Das ist nicht die komprimierte Downloadgröße." },
        { question: "Kann ich PURPLE bei KINA herunterladen?", answer: "Nein. KINA hostet oder vermittelt keine Installer. Beziehe PURPLE nur über einen offiziellen NC-Einstieg." },
      ],
    },
  },
  "guides/aion-2-platforms": {
    "global-answer": {
      paragraphs: [
        "Die NC-Ankündigung von April 2026 sagt, dass Global ausschließlich für PC über Steam und PURPLE entwickelt wird. Steam verlangt 64-Bit-Windows 10/11 und beschreibt das Produkt als PC.",
        "Windows-PC, Steam und PURPLE sind damit bestätigt. Andere Plattformen bleiben unangekündigt oder in der Kompatibilität unbekannt; Suchinteresse liefert keinen Veröffentlichungstermin.",
      ],
    },
    "platform-matrix": {
      paragraphs: [
        "Die Tabelle gibt offizielle Angaben vom 26. Juli 2026 wieder. Nicht angekündigt bedeutet nicht dauerhaft unmöglich, darf aber vor einer NC-Mitteilung nicht als unterstützt gelten.",
      ],
      table: {
        caption: "Plattformstatus von AION 2 Global",
        headers: ["Plattform", "Offizieller Status", "Beleg"],
        rows: [
          { header: "Windows PC", cells: ["Bestätigt", "NC-Global-Ankündigung und Steam-Anforderungen"] },
          { header: "Steam", cells: ["Bestätigt", "Global-Ankündigung und offizieller Store"] },
          { header: "PURPLE", cells: ["Bestätigt", "NC-Global-Ankündigung"] },
          { header: "PS5", cells: ["Nicht angekündigt", "Keine offizielle Global-Version für PS5"] },
          { header: "Xbox", cells: ["Nicht angekündigt", "Keine offizielle Global-Version für Xbox"] },
          { header: "Android/iPhone", cells: ["Für Global nicht angekündigt", "Global ist PC; regionaler Mobile-Dienst unterscheidet sich"] },
          { header: "Steam Deck", cells: ["Kompatibilität unbekannt", "Keine offizielle Aussage zu Steam Deck"] },
        ],
      },
    },
    "controller-status": {
      paragraphs: [
        "Steam-Eintrag und Global-Seite bestätigen Layouts, Tastensymbole, Vibration oder barrierefreie Controller nicht vollständig. Das beweist nicht, dass ein Controller nie funktioniert; Drittanbieter-Mapping oder Steam-Input-Vermutung sind nur kein offizieller Support.",
        "Prüfe nach dem Start Steam-Merkmale, Steuerungsmenü, NC-Leitfaden und echte Tastensymbole, bevor du den Support als vollständig, teilweise oder fehlend bezeichnest.",
      ],
    },
    "mobile-difference": {
      paragraphs: [
        "Korea/Taiwan besitzt eine offizielle Downloadseite mit Anforderungen für Android, iPhone und Tablet; NC beschrieb diesen regionalen Dienst für PC und Mobile. Die spätere Global-Ankündigung setzt ausdrücklich auf PC.",
        "Es sind getrennte Dienste. Ein regionaler Mobile-Client bestätigt weder Android noch iOS für Global, und eine Global-Seite darf regionale Anforderungen, Links oder Größen nicht übernehmen.",
      ],
    },
    "future-updates": {
      paragraphs: [
        "Die Tabelle ändert sich erst durch eine Global-Mitteilung von NC, einen offiziellen Store-Eintrag, geänderte Steam-Merkmale oder eine Produktseite des Plattformbetreibers. Gerüchte, Platzhalter, Drittanbieterbanken und Suchvorschläge reichen nicht.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Kommt AION 2 für PS5?", answer: "Am 26. Juli 2026 hatte NC weder Global-Support noch einen PS5-Termin angekündigt." },
        { question: "Hat AION 2 Global eine Mobile-Version?", answer: "Die Global-Ankündigung betrifft nur PC. Korea/Taiwan hat Mobile-Dienste, bestätigt damit aber kein Global-Android oder -iOS." },
        { question: "Unterstützt AION 2 Controller?", answer: "Das aktuelle Global-Material reicht nicht für vollständige Bestätigung. Warte auf offizielle Merkmale und das Spielmenü." },
      ],
    },
  },
  "guides/aion-2-server-status": {
    "status-answer": {
      paragraphs: [
        "Die offiziellen Daten erlauben keine Kennzeichnung der Global-Server als online. Erreichbare Steam-, Website- oder Login-Seiten belegen nur den Webdienst, nicht Charakteranmeldung, Welten, Matchmaking oder Märkte.",
        "Bis NC Weltnamen, Betriebsmitteilungen und eine prüfbare Quelle veröffentlicht, zeigt KINA keinen öffentlichen Live-Status an, statt einen grünen Punkt zu erfinden.",
      ],
    },
    "confirmed-regions": {
      paragraphs: [
        "NC kündigte Betrieb in Nordamerika, Südamerika, Europa und Japan mit zehn Sprachen an. Das sind Betriebsregionen, keine vollständige Serverliste; sie legen weder Rechenzentrumsstädte, Zeitzonen, regionsübergreifendes Spiel noch Transfers fest.",
        "Steam zeigt Early Access am 30. September; genaue Uhrzeit und Zeitzone brauchen eine NC-Mitteilung. Store-Countdown oder lokale Mitternacht des Besuchers ersetzen keine Serverzeit.",
      ],
      table: {
        caption: "Öffentlicher Serverstatus von AION 2 Global",
        headers: ["Feld", "Aktueller Stand", "Nicht ableiten"],
        rows: [
          { header: "Betriebsregionen", cells: ["Nordamerika, Südamerika, Europa und Japan bestätigt", "Rechenzentrumsstädte oder Latenzrang"] },
          { header: "Weltnamen", cells: ["Vollständige Liste unangekündigt", "Anzahl oder Erstellungsbeschränkungen"] },
          { header: "Live-Status", cells: ["Keine geprüfte öffentliche API", "Online, ausgelastet oder Wartung"] },
          { header: "Population", cells: ["Keine offiziellen Live-Daten", "Beliebteste Welt, Fraktionen oder Warteschlangen"] },
        ],
      },
    },
    "what-is-not-live": {
      paragraphs: [
        "Echtzeitstatus braucht eine offizielle Quelle, Abfragezeit, Fehlerbehandlung und Aufteilung nach Dienst. HTTP 200, Social-Post oder Spielerbericht trennen Login-, Welt-, Matchmaking-, Markt- und Regionalnetzfehler nicht zuverlässig.",
        "Ohne Beleg zeigt ein ehrliches Design Prüfdatum, offizielle Mitteilungen und unbekannte Felder, statt unbekannt in online umzuwandeln.",
      ],
    },
    "how-to-check": {
      paragraphs: [
        "Lies die Global-Mitteilung von NC oder das regionale Betriebsupdate und prüfe Steam oder PURPLE. Scheitert nur deine Verbindung, notiere Plattform, Region, Zeit, Fehlercode und Netzkontext, ohne Konto, Einmalcode oder IP zu veröffentlichen.",
      ],
      steps: [
        { title: "Offizielle Mitteilung prüfen", description: "Suche planmäßige Wartung, Notfallarbeiten oder bekannte Probleme." },
        { title: "Client-Update prüfen", description: "Starte Steam oder PURPLE neu und kontrolliere Launcher- und Spielupdates." },
        { title: "Umfang trennen", description: "Vergleiche dieselbe Region und offizielle Berichte, um persönlichen, Provider-, Plattform- oder Spieleffekt zu unterscheiden." },
        { title: "Fehlerkontext sichern", description: "Notiere Zeit, Region, Plattform und Code für den offiziellen Support." },
      ],
    },
    "status-model": {
      paragraphs: [
        "Veröffentlicht NC eine Statusseite oder API, kann KINA offizielle Welt-IDs zuordnen und Quelle, letzte erfolgreiche Aktualisierung, erwartete Verzögerung und bei Fehlern unbekannt zeigen. Population und Warteschlangen bleiben ohne NC-Daten weg.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Sind die AION-2-Global-Server schon live?", answer: "Offizielles Material bestätigt September 2026 und Early Access am 30., aber keinen überprüfbaren Live-Status." },
        { question: "Welche AION-2-Server gibt es?", answer: "NC bestätigt Betrieb in Nordamerika, Südamerika, Europa und Japan; Weltnamen und Anzahl sind unangekündigt." },
        { question: "Warum funktioniert die Website während der Wartung?", answer: "Website, Login, Welten, Matchmaking und Märkte sind getrennte Dienste. Eine erreichbare Website beweist nicht, dass alles online ist." },
      ],
    },
  },
  "guides/aion-2-tier-list": {
    answer: {
      paragraphs: [
        "Vor dem Global-Start reichen die Belege nicht für ein reproduzierbares S-, A- oder B-Ranking. Steam bestätigt acht Klassen, aber keine vergleichbaren Ergebnisse bei gleicher Ausrüstung, Skills, Gruppe, Schwierigkeit und Startbalance.",
        "Darum veröffentlicht die Seite zuerst Kriterien und Aktualisierungsregeln. Eine Liste ohne Patch, Region, PvE/PvP-Kontext, Ausrüstung und Stichprobe darf nicht als allgemeines Ergebnis gelten.",
      ],
    },
    "why-no-ranking": {
      paragraphs: [
        "Season 2 enthält Balanceänderungen und klassenspezifische Rankingregeln. Chapter 1 ergänzt Brawler und ändert Level, Skills und Inhalte. Patch, Klassenpool, Ausrüstung und Aktivität beeinflussen den Vergleich deutlich.",
        "Steam zeigt acht Global-Klassen, während Chapter 1 regional Brawler enthält. Schon bei unterschiedlichem Klassenpool wäre die Übernahme eines regionalen Rankings in eine Global Tier List irreführend.",
      ],
    },
    "comparison-method": {
      paragraphs: [
        "Jede Liste muss eine konkrete Frage beantworten: Überleben bei gleichem Itemlevel im Fünfer-PvE, Nutzen in fester Gruppe, definiertes Wettkampfregelwerk oder Fehlererholung für Einsteiger. Eine Gesamtnote für alle Aktivitäten verdeckt Klassenunterschiede.",
      ],
      table: {
        caption: "Pflichtfelder für Klassenvergleiche nach dem Start",
        headers: ["Feld", "Konstant halten", "Nicht mischen"],
        rows: [
          { header: "Version", cells: ["Client-Build, Datum und Region", "Verschiedene Saisons oder Dienste"] },
          { header: "Aktivität", cells: ["Dungeon, Boss, Open World oder PvP-Regeln", "Eine PvE/PvP-Gesamtnote"] },
          { header: "Bedingungen", cells: ["Ausrüstung, Skills, Gruppe und Erfahrung", "Einsteiger und stark investierte Figuren"] },
          { header: "Messwert", cells: ["Schaden, Überleben, Kontrolle, Unterstützung oder Erholung", "Nur Popularität oder Einzelrekord"] },
          { header: "Stichprobe", cells: ["Genügend Läufe und wiederholbarer Ablauf", "Ein Video oder Maximalwert"] },
        ],
      },
    },
    "eight-classes": {
      paragraphs: [
        "Die Global-Klassen auf Steam sind Gladiator, Templar, Assassin, Ranger, Sorcerer, Spiritmaster, Cleric und Chanter. Unterscheide vor dem Ranking Nah- oder Fernkampf, Burst oder Dauerpressure, Schaden, Verteidigung oder Heilung, Solo- oder Gruppenwert und Ausführungsaufwand.",
        "Wähle über Klassenfinder und Übersicht nach Reichweite, Tempo und Gruppenverantwortung und lies danach die Guides. Persönlich beste Wahl und höchster Schaden eines Patches sind verschiedene Fragen.",
      ],
      bullets: [
        "Einsteiger: Fehlertoleranz, Ressourcenverwaltung und Erholung.",
        "Feste Gruppe: Buffs, Kontrolle, Schutz und Heilverantwortung.",
        "Solo: Durchhaltevermögen, Zielwechsel, Bewegung und Vorbereitung.",
        "PvP: Kleingruppe, Schlachtfeld und Fraktionskrieg getrennt betrachten.",
      ],
    },
    "update-policy": {
      paragraphs: [
        "Aktivitätsspezifische Tiers brauchen Global-Klassen, Balance-Build, Regeln und vergleichbare Stichproben. Jede Aktualisierung behält altes Datum, Änderungsgrund und Grenzen. Ein großer Patch oder eine neue Klasse macht die alte Liste historisch, statt Buchstaben still zu ändern.",
        "Ein offizielles Klassen-Ranking liefert Kontext innerhalb einer Klasse, beweist aber nicht automatisch Stärke zwischen Klassen. KINA-Ergebnisse bleiben redaktionelle Analyse, kein NC-Ranking.",
      ],
    },
    faq: {
      paragraphs: [],
      faq: [
        { question: "Was ist die beste AION-2-Global-Klasse?", answer: "Vor dem Start fehlen kontrollierte Global-Belege; NC hat keine allgemein stärkste Klasse benannt." },
        { question: "Kann ich eine Korea Tier List für Global nutzen?", answer: "Nur zum Verständnis der Spielweisen, nicht als Global-Rang. Patch, Klassen, Werte und Aktivitäten können abweichen." },
        { question: "Wann veröffentlicht KINA Klassen-Tiers?", answer: "Sobald Global-Klassen, Balance-Build, Aktivitätsregeln und vergleichbare Stichproben vorliegen, folgt eine versionierte Analyse je Aktivität." },
      ],
    },
  },
};

Object.assign(de, {
  "classes/gladiator": {
    "official-profile": {
      paragraphs: [
        "NCs offizielles Guidebook beschreibt Gladiator als Nahkampf-Schadensklasse mit Greatsword, relativ hohem Angriff und hoher Verteidigung. Die Klasse kann außerdem als Sub-Tank beitragen.",
        "Der offizielle Global-Teaser führt Gladiator auf; NCs Veröffentlichung zu den Kerninhalten von 2025 nennt kraftvolle Nahkampfangriffe mit großer Wirkungsfläche. Diese Aussagen beschreiben das Rollenprofil, nicht einen aktuellen Schadensrang.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Eine redaktionelle Übungsschleife lautet: einen sicheren Zugang erkennen, eine tragfähige Nahkampfposition halten, Druck zum richtigen Zeitpunkt abfangen oder vermeiden und sich lösen, wenn die Front ungünstig wird.",
        "Sub-Tanking gehört zum offiziellen Profil, beweist aber nicht, dass Gladiator in jeder Gruppe einen Main-Tank ersetzt. Die aktuelle Aktivität, Gruppenzusammenstellung und der Live-Skilltext bestimmen weiterhin die tatsächliche Aufgabe.",
      ],
    },
    "gladiator-arcana-selection": {
      paragraphs: [
        "Mit Stand 26. Juli 2026 hat NC ein wachsendes Arcana-System bestätigt, aber kein dauerhaft bestes Gladiator-Arcana-Set für jeden Build und jede Aktivität veröffentlicht. Nutze deshalb eine wiederholbare Auswahlmethode: Benenne die Aktivität, ermittle zuerst, was die Nahkampf-Uptime am häufigsten unterbricht, und vergleiche erst danach den Output.",
        "Prüfe zunächst, ob Gladiator sicher herankommt und ein sinnvolles Zeitfenster halten kann. Danach wird bewertet, ob ein Arcana-Auslöser in genau diesem Kontext zuverlässig wiederholbar ist. Wiederhole die Prüfung, sobald Kartentext, Set-Regel, Aufwertungsstand oder regionaler Build geändert werden.",
      ],
      bullets: [
        "Notiere Region, Game-Build, Aktivität und zugewiesene Gruppenaufgabe; trenne Boss-, Solo- und Massen-PvP-Tests.",
        "Vergleiche zuerst Kandidaten für Zugang, Positionskorrektur oder nutzbare Nahkampfzeit und erst danach Effekte, die nur in einem Idealzustand funktionieren.",
        "Ändere jeweils nur eine Karte oder ein Set und wiederhole dasselbe Szenario; notiere Tode, erzwungene Rückzüge und tragfähige Zeitfenster.",
        "Lass das Ergebnis verfallen, wenn Auslöser oder Set-Regel geändert werden; ein alter Test ist keine dauerhafte Meta.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Diese Übungskontexte sind redaktionelle Ableitungen aus dem offiziellen Rollenprofil, keine NC-Ranglisten für Spielstile und keine Aussagen zu Siegraten.",
      ],
      bullets: [
        "PvE: Priorisiere stabile Nahkampf-Uptime und Mechaniken, statt für eine längere Schadensphase in Gefahr zu bleiben.",
        "PvP: Bestimme ein sicheres Ziel, den Zugangsweg und den Ausstieg, bevor du anhaltenden Druck ausübst.",
        "RvR: Bewege dich mit der eigenen Front und überschreite sie nicht allein ohne Unterstützung.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "Die KINA-Rubrik v1 bewertet den Einstieg mit 2/5 und die Meisterung mit 4/5. Eins bedeutet eine geringere Lernlast; fünf bedeutet mehr gleichzeitige Ausführung, Information oder Verantwortung.",
        "Das Klassenziel ist leicht lesbar und senkt die Einstiegslast. Nahkampfposition, Kontaktzeit und der Wechsel zwischen Angriff und Verteidigung erhöhen den Anspruch bei der Meisterung.",
        "Die Bewertung verwendet keine Schadenstabelle, Siegrate, Ausrüstungsschwelle oder unveröffentlichten Skillwert.",
        "Die Werte vergleichen weder Schaden, Siegrate, Klassenwert, Ausrüstungsaufwand noch Gruppennachfrage und können kein Best, Worst oder Tier begründen.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Übe sichere Nahkampf-Uptime und Gefahrenerkennung, bevor du entscheidest, wann du nach vorn drückst oder dich zurückziehst.",
      ],
      steps: [
        {
          title: "Eine sichere Grundlage schaffen",
          description:
            "Übe das Annähern und Lösen vom Ziel, ohne unnötige Gefahr in Kauf zu nehmen.",
        },
        {
          title: "Jeweils nur eine Belastung ergänzen",
          description:
            "Füge das Lesen der Front hinzu: Prüfe vor jedem Vorstoß Verbündete, Gefahrenbereich und Ausstiegsweg.",
        },
        {
          title: "Den aktuellen Build erneut prüfen",
          description:
            "Erstelle aus dem Live-Skilltext der Region eine kurze persönliche Schleife und notiere Build sowie Testkontext.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Diese Hinweise sind redaktionelle Übungserinnerungen und setzen keinen unbestätigten Skill, Cooldown oder Koeffizienten voraus.",
      ],
      bullets: [
        "Defensive Identität als Erlaubnis zu verstehen, Mechaniken zu ignorieren; nutze Widerstandskraft zur Erholung, nicht als Immunität.",
        "Verbündete und Ausstiegsweg zu weit hinter sich zu lassen; prüfe vor jedem Zugang die Front.",
        "Die Bezeichnung Sub-Tank in eine feste Gruppenregel umzudeuten; bestätige aktuelle Aktivität und zugewiesene Aufgabe.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Greatsword, Nahkampfschaden und die Bezeichnung Sub-Tank stammen aus offiziellen Materialien, die am 18. Juli 2026 zugänglich waren.",
        "Diese Seite bestätigt keine Global-Launch-Skills, Schäden, Cooldowns, Attributsprioritäten oder beste Ausrüstung.",
        "Der Datensatz umfasst neun am 18. Juli 2026 verifizierte Klassen: die acht Basisklassen des Global-Rosters und Brawler, der am 1. Juli 2026 dem Chapter-1-Build für Korea/Taiwan hinzugefügt wurde. Global-Skills, Roster, Balance und endgültige Spielmuster müssen weiterhin im Client und in Mitteilungen geprüft werden.",
      ],
    },
  },
  "classes/assassin": {
    "official-profile": {
      paragraphs: [
        "NCs offizielles Guidebook beschreibt Assassin mit zwei Dolchen, der Stealth, schnelle Ketten und Statuseffekte nutzt, um ein Ziel in einem kurzen Zeitfenster unter Druck zu setzen.",
        "Der offizielle Global-Teaser führt Assassin auf; die Veröffentlichung zu den Kerninhalten von 2025 nennt die Klasse einen präzisen Nahkampfspezialisten. Die Seiten veröffentlichen weder eine dauerhaft beste Kette noch einen Rang.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Eine redaktionelle Übungsschleife lautet: Ziel und Ausstieg beobachten, auf ein kontrollierbares Zugangsfenster warten, eine vordefinierte kurze Sequenz ausführen und sich danach je nach Ergebnis lösen oder neu positionieren.",
        "Stealth bedeutet weder dauerhafte Sicherheit noch einen garantierten ersten Zug. Sichtbarkeit, Kontrolle und Skill-Interaktionen bleiben Fragen der aktuellen Live-Version.",
      ],
    },
    "assassin-arcana-selection": {
      paragraphs: [
        "NCs Updates bestätigen, dass Arcana-Karten und Serien weiter ausgebaut werden; mit Stand 26. Juli 2026 gibt es jedoch keine offiziell dauerhaft beste Assassin-Liste. Prüfe jeden Kandidaten in drei Phasen – Zugang, wiederholbarer Druck im kurzen Zeitfenster und sicherer Ausstieg – statt ihn nach einem idealen Ergebnis einzuordnen.",
        "Jeder Test muss beantworten, ob der Auslöser zu aktuellen Skills und Kontext passt. Benötigt ein Kandidat ein unzuverlässiges Setup oder entfernt er den geplanten Ausstieg, wird er als situationsabhängig gekennzeichnet und nicht allgemein empfohlen.",
      ],
      bullets: [
        "Lege Zieltyp, Zugangsbedingung und Ausstiegspunkt vor dem Arcana-Vergleich fest; vermische keine Ergebnisse verschiedener Szenarien.",
        "Erfasse erfolgreiche Zugänge, erzwungene Abbrüche und sichere Resets, statt einen Versuch mit hohem Schaden entscheiden zu lassen.",
        "Führe getrennte, versionierte Notizen für PvE, Arena und Massenkampf, weil kontrollierbare Fenster und Gegenmaßnahmen abweichen.",
        "Prüfe Auslöser, Dauer und Set-Bedingungen nach Änderungen offizieller oder spielinterner Texte erneut; es wird kein festes Best-in-Slot und keine dauerhafte Meta behauptet.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Diese Übungskontexte sind redaktionelle Ableitungen aus dem offiziellen Rollenprofil, keine NC-Ranglisten für Spielstile und keine Aussagen zu Siegraten.",
      ],
      bullets: [
        "PvE: Sichere Mechanik und Ausstieg im Nahkampf, bevor du den Abschluss eines kurzen Aktionsfensters optimierst.",
        "PvP: Behandle Zielwahl, Zugangsbedingung und Ausstiegsplan als eine gemeinsame Entscheidung.",
        "RvR: Übe Flankenbeobachtung und begrenzte Ziele; dringe nicht tiefer vor, sobald Unterstützung verloren geht.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "Die KINA-Rubrik v1 bewertet den Einstieg mit 4/5 und die Meisterung mit 5/5. Eins bedeutet eine geringere Lernlast; fünf bedeutet mehr gleichzeitige Ausführung, Information oder Verantwortung.",
        "Verdichtete Ausführung, Position, Timing und Erholung nach Fehlern konkurrieren um Aufmerksamkeit und erzeugen eine hohe Einstiegs- und Meisterungslast.",
        "Hohe Schwierigkeit bedeutet nicht hohe Stärke; daraus werden weder Siegrate, Schaden noch Tier abgeleitet.",
        "Die Werte vergleichen weder Schaden, Siegrate, Klassenwert, Ausrüstungsaufwand noch Gruppennachfrage und können kein Best, Worst oder Tier begründen.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Übe Beobachtung und sicheres Lösen, bevor du Zugang, Druck und Reset in ein kurzes Zeitfenster verdichtest.",
      ],
      steps: [
        {
          title: "Eine sichere Grundlage schaffen",
          description:
            "Greife nicht an; bestimme nur Ziel, Gefahrenquelle und sicheren Ausstieg.",
        },
        {
          title: "Jeweils nur eine Belastung ergänzen",
          description:
            "Füge einen kurzen Zugang mit Rückkehr hinzu und beweise, dass ein schlechter Einstieg abgebrochen werden kann.",
        },
        {
          title: "Den aktuellen Build erneut prüfen",
          description:
            "Erstelle aus dem Live-Skilltext eine wiederholbare kleine Sequenz und teste Kontexte getrennt.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Diese Hinweise sind redaktionelle Übungserinnerungen und setzen keinen unbestätigten Skill, Cooldown oder Koeffizienten voraus.",
      ],
      bullets: [
        "Ohne Ausstieg einzusteigen; lege vor der Aktion die Rückzugsrichtung fest.",
        "Stealth als bedingungslose Sicherheit zu behandeln; halte Unbekanntes sichtbar und prüfe aktuelle Gegenmaßnahmen.",
        "Eine alte Rotation oder ein Video als aktuell beste Antwort zu verwenden; notiere Region, Build und Skilltext.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Zwei Dolche, Stealth, schnelle Ketten, Statuseffekte und präziser Nahkampf entsprechen offiziellen Materialien, die am 18. Juli 2026 geprüft wurden.",
        "Es werden kein Skillname, Cooldown, Koeffizient, keine Kontrolldauer, kein Ausrüstungsset und keine beste Kette behauptet.",
        "Der Datensatz umfasst neun am 18. Juli 2026 verifizierte Klassen: die acht Basisklassen des Global-Rosters und Brawler, der am 1. Juli 2026 dem Chapter-1-Build für Korea/Taiwan hinzugefügt wurde. Global-Skills, Roster, Balance und endgültige Spielmuster müssen weiterhin im Client und in Mitteilungen geprüft werden.",
      ],
    },
  },
});

Object.assign(de, {
  "classes/ranger": {
    "official-profile": {
      paragraphs: [
        "NCs offizielles Guidebook beschreibt Ranger mit einem Bogen und betont Positionierung, Timing und taktische Reaktion bei Fernkampfangriffen.",
        "Der aktuelle offizielle Global-Teaser verwendet Ranger. NCs englische Veröffentlichung zu den Kerninhalten von 2025 nutzte Marksman und beschrieb einen Fernkampf-Aufklärer. KINA folgt dem aktuellen Global-Namen.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Eine redaktionelle Übungsschleife lautet: sichere Reichweite und Sichtlinie herstellen, bei Bewegung von Ziel oder Umgebung neu positionieren, nur bei gültiger Position angreifen und Raum für die nächste Bewegung bewahren.",
        "Reichweite bedeutet keine Immunität. Tatsächliche Distanz, Bewegungseinschränkungen und Skillverhalten müssen im aktuellen Spieltext geprüft werden.",
      ],
    },
    "ranger-skill-tree-priority": {
      paragraphs: [
        "Mit Stand 26. Juli 2026 bestätigen offizielle Materialien eine Fernkampfrolle, die von Positionierung, Timing und taktischer Reaktion geprägt ist; sie veröffentlichen aber keinen dauerhaft besten Global Skill Tree. Dies ist ein versionierter Planungsrahmen, keine erfundene Skillliste und keine feste Verteilung.",
        "Ordne die im aktuellen Client verfügbaren Skills vier Aufgaben zu: Reichweite und Sichtlinie bewahren, die zuverlässige Kernaktion liefern, auf die Aktivitätsmechanik reagieren und unter Idealbedingungen zusätzlichen Output erzeugen. Ändere die Priorität anhand des beobachteten Fehlers und speichere nach einem Build-Update einen neuen datierten Skill Tree, statt den Kontext zu überschreiben.",
      ],
      bullets: [
        "Erstens: sichere Position, Sichtlinie und den nächsten Bewegungsweg während Mechaniken bewahren.",
        "Zweitens: die wiederholbare Kernfunktion unterstützen; keine höhere Schätzung priorisieren, wenn ihre Bedingung regelmäßig scheitert.",
        "Drittens: Kontrolle, Mobilität, Überleben oder Gruppennutzen für PvE, PvP oder RvR ergänzen und die Skill Trees getrennt halten.",
        "Erst danach reine Output-Kandidaten vergleichen; Region, Build, Ausrüstungskontext und Aktivität notieren und nach Änderungen des offiziellen Skilltexts neu bewerten.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Diese Übungskontexte sind redaktionelle Ableitungen aus dem offiziellen Rollenprofil, keine NC-Ranglisten für Spielstile und keine Aussagen zu Siegraten.",
      ],
      bullets: [
        "PvE: Reserviere vor einer Mechanik die nächste sichere Position, statt für eine weitere Aktion Sichtlinie oder Weg zu verlieren.",
        "PvP: Beziehe Reichweite, Hindernisse und gegnerische Zugangswege in die Zielwahl ein.",
        "RvR: Halte die Verbindung zwischen eigener Hinter- und Frontlinie und vermeide Verfolgungen außerhalb ihres Schutzes.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "Die KINA-Rubrik v1 bewertet den Einstieg mit 3/5 und die Meisterung mit 4/5. Eins bedeutet eine geringere Lernlast; fünf bedeutet mehr gleichzeitige Ausführung, Information oder Verantwortung.",
        "Reichweite senkt einen Teil des Kontaktdrucks; Position, Sichtlinie und Bewegungsplanung erzeugen eine mittlere Einstiegslast und einen höheren Anspruch bei der Meisterung.",
        "Die Bewertung sagt nichts über Stärke oder Rang von Ranger in PvE, PvP oder RvR aus.",
        "Die Werte vergleichen weder Schaden, Siegrate, Klassenwert, Ausrüstungsaufwand noch Gruppennachfrage und können kein Best, Worst oder Tier begründen.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Übe zuerst, bei Bewegung sichere Reichweite und Sichtlinie zu halten, bevor du die Beständigkeit der Angriffsfenster erhöhst.",
      ],
      steps: [
        {
          title: "Eine sichere Grundlage schaffen",
          description:
            "Greife nicht an; halte beim Bewegen Reichweite, Sichtlinie und eine nächste sichere Position.",
        },
        {
          title: "Jeweils nur eine Belastung ergänzen",
          description:
            "Füge ein Ziel hinzu und bewahre nach jeder Aktion einen Bewegungsweg.",
        },
        {
          title: "Den aktuellen Build erneut prüfen",
          description:
            "Bestätige Live-Reichweite, Bewegungseinschränkungen und Tooltips, bevor du die Schleife verfeinerst.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Diese Hinweise sind redaktionelle Übungserinnerungen und setzen keinen unbestätigten Skill, Cooldown oder Koeffizienten voraus.",
      ],
      bullets: [
        "Nur die Zieldistanz, aber nicht Hindernisse oder Ausstieg zu beobachten; prüfe Sichtlinie und nächste Position gemeinsam.",
        "Über den Gruppenschutz hinaus zu verfolgen; definiere eine Front, die nicht überschritten werden soll.",
        "Automatisch anzunehmen, jede Fernkampfrolle sei für Einsteiger leicht; bewerte Positionierungs- und Entscheidungslast getrennt.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Bogen, Reichweite, Positionierung, Timing und taktische Reaktion entsprechen offiziellen Materialien, die am 18. Juli 2026 geprüft wurden.",
        "Es werden keine Reichweitenzahl, Regel für Angriffe in Bewegung, kein Skillname, Schaden, Ausrüstungs-Build und keine Aussage zur Global-Balance gemacht.",
        "Der Datensatz umfasst neun am 18. Juli 2026 verifizierte Klassen: die acht Basisklassen des Global-Rosters und Brawler, der am 1. Juli 2026 dem Chapter-1-Build für Korea/Taiwan hinzugefügt wurde. Global-Skills, Roster, Balance und endgültige Spielmuster müssen weiterhin im Client und in Mitteilungen geprüft werden.",
      ],
    },
  },
  "classes/sorcerer": {
    "official-profile": {
      paragraphs: [
        "NCs offizielles Guidebook beschreibt Sorcerer mit einem Spellbook, der sich auf hohen Magieschaden in einem kurzen Zeitfenster konzentriert und dabei Reichweite sowie Kontrolle verwaltet.",
        "Der offizielle Global-Teaser führt Sorcerer auf; NCs Veröffentlichung zu den Kerninhalten von 2025 beschreibt hohen magischen Burst-Schaden. Das Profil liefert weder Schadensrang noch beste Skillreihenfolge.",
      ],
    },
    "editorial-gameplay-loop": {
      paragraphs: [
        "Eine redaktionelle Übungsschleife lautet: eine sichere Zauberposition herstellen, Ziel- und Gefahrenbewegung lesen, kurzen Druck nur im gültigen Zeitfenster ausführen und abbrechen, statt nach Positionsverlust eine Aktion zu erzwingen.",
        "Kontrolle gehört zum offiziellen Profil; tatsächliche Skills, Dauer und Gegenregeln müssen aus dem aktuellen Skilltext stammen.",
      ],
    },
    "sorcerer-versioned-build": {
      paragraphs: [
        "NCs offizielle Übersicht beschreibt entscheidungsgeleiteten manuellen Kampf, veröffentlicht aber keinen dauerhaft besten Sorcerer Build. Kennzeichne mit Stand 26. Juli 2026 jeden Plan mit Region, Build-Datum, Aktivität und Ziel, statt einen Screenshot ohne Kontext dauerhaft zu verwenden.",
        "Formuliere zuerst das Problem – häufige Bewegung, kurze Zauberfenster oder benötigte Kontrolle – und wähle dann anhand des Skilltexts im tatsächlich spielbaren Client. Wenn sich Game-Build, Bedingung oder Aktivität ändern, kopiere das alte Blatt und erstelle einen neuen Eintrag.",
      ],
      bullets: [
        "Notiere Region, Client-Build, Prüfdatum, PvE-/PvP-/RvR-Kontext und relevanten Ausrüstungshintergrund.",
        "Gib jeder Wahl einen Zweck und ein beobachtbares Ergebnis; markiere sie ohne wiederholbaren Test als unbestätigt.",
        "Ändere jeweils nur eine Priorität und wiederhole dasselbe Szenario, damit Unterschiede bei Ausrüstung, Gruppe oder Mechanik nicht als Build-Effekt gelten.",
        "Bewahre datierte Versionen, statt eine dauerhafte Meta zu behaupten; es werden keine unbestätigten Koeffizienten, Cooldowns oder Bestschaden-Ergebnisse angegeben.",
      ],
    },
    "sorcerer-skill-priority": {
      paragraphs: [
        "Priorität ist keine feste Rotation. Bewahre zuerst Werkzeuge, die eine Zauberposition gültig halten oder ein schlechtes Fenster beenden. Unterstütze danach die wiederholbaren Funktionen des offiziellen Profils für kurze Magiefenster und Kontrolle. Vergleiche zusätzlichen Output unter Idealbedingungen erst, wenn diese beiden Ebenen zuverlässig bleiben.",
      ],
      bullets: [
        "Ebene eins: sichere Position und Abbruch, damit eine gescheiterte Bedingung zu Bewegung statt zu einer erzwungenen Aktion führt.",
        "Ebene zwei: eine wiederholbare Kernfunktion für die aktuelle Aktivität ohne instabile Voraussetzung.",
        "Ebene drei: Kontrolle, Mobilität, Überleben oder eine andere Reaktion, die Begegnung, Gegner oder Massenkampflinie erfordern.",
        "Ebene vier: zusätzlicher Output, der die ersten drei Ebenen nicht bricht; beginne die Prüfung nach einem Update wieder bei Ebene eins.",
      ],
    },
    "editorial-scenarios": {
      paragraphs: [
        "Diese Übungskontexte sind redaktionelle Ableitungen aus dem offiziellen Rollenprofil, keine NC-Ranglisten für Spielstile und keine Aussagen zu Siegraten.",
      ],
      bullets: [
        "PvE: Stelle sichere Zauberposition und Mechanikbewegung vor den Abschluss eines vollständigen Druckfensters.",
        "PvP: Erzeuge Reichweite und Sichtlinie, bevor du ein kurzes Druckfenster fest zusagst.",
        "RvR: Passe die Position der Hinterlinie an die eigene Front an und bleibe nicht auf einem direkten Zugangsweg.",
      ],
    },
    "editorial-difficulty": {
      paragraphs: [
        "Die KINA-Rubrik v1 bewertet den Einstieg mit 3/5 und die Meisterung mit 4/5. Eins bedeutet eine geringere Lernlast; fünf bedeutet mehr gleichzeitige Ausführung, Information oder Verantwortung.",
        "Das Ziel ist klar; Position, Zauberfenster und Kontrollentscheidungen machen die Meisterung anspruchsvoller als das Rollenverständnis.",
        "Schwierigkeit ist keine Schadensobergrenze und begründet kein PvE- oder PvP-Tier.",
        "Die Werte vergleichen weder Schaden, Siegrate, Klassenwert, Ausrüstungsaufwand noch Gruppennachfrage und können kein Best, Worst oder Tier begründen.",
      ],
    },
    "beginner-practice": {
      paragraphs: [
        "Übe zuerst, eine sichere Zauberposition zu halten und eine schlechte Entscheidung abzubrechen, bevor du kurze Druckfenster anordnest.",
      ],
      steps: [
        {
          title: "Eine sichere Grundlage schaffen",
          description:
            "Ignoriere die vollständige Ausführung und wähle eine sichere Zauberposition sowie die nächste Position.",
        },
        {
          title: "Jeweils nur eine Belastung ergänzen",
          description:
            "Füge ein kurzes Zeitfenster hinzu und brich in Bewegung ab, wenn die Bedingung scheitert.",
        },
        {
          title: "Den aktuellen Build erneut prüfen",
          description:
            "Nutze den aktuellen regionalen Skilltext, um Kontroll- und Schadensentscheidungen getrennt zu testen.",
        },
      ],
    },
    "common-mistakes": {
      paragraphs: [
        "Diese Hinweise sind redaktionelle Übungserinnerungen und setzen keinen unbestätigten Skill, Cooldown oder Koeffizienten voraus.",
      ],
      bullets: [
        "Eine Aktion nach Positionsverlust zu beenden; übe zuerst Abbruch und Bewegung.",
        "Reichweite, aber nicht Sichtlinie oder Zugangsweg zu beobachten; plane die nächste Position gleichzeitig.",
        "Offizielle Burst-Formulierungen als Behauptung des höchsten Schadens zu deuten; behandle sie nur als Rollenprofil.",
      ],
    },
    "version-boundary": {
      paragraphs: [
        "Spellbook, Magieschaden im kurzen Zeitfenster, Reichweite und Kontrolle entsprechen offiziellen Materialien, die am 18. Juli 2026 geprüft wurden.",
        "Es werden kein Skillname, keine Zauberzeit, kein Cooldown, Koeffizient, keine Kontrolldauer, Ausrüstung und keine beste Schleife behauptet.",
        "Der Datensatz umfasst neun am 18. Juli 2026 verifizierte Klassen: die acht Basisklassen des Global-Rosters und Brawler, der am 1. Juli 2026 dem Chapter-1-Build für Korea/Taiwan hinzugefügt wurde. Global-Skills, Roster, Balance und endgültige Spielmuster müssen weiterhin im Client und in Mitteilungen geprüft werden.",
      ],
    },
  },
});

Object.assign(de, {
  "guides/character-presets-style-shop": {
    "official-features": {
      paragraphs: [
        "NCs Ankündigung vom 17. November 2025 nennt für AION2 mehr als 200 Anpassungselemente, darunter detaillierte Einstellungen für Körperform, Haut, Iris und Muskulatur. Außerdem werden mehrere fertige Erscheinungs-Presets für Spieler angeboten, die mit der Charaktererstellung weniger vertraut sind. Die offizielle Website stellt inzwischen eine Style-Shop-Seite bereit.",
        "Damit sind detaillierte Erstellungswerkzeuge und eine offizielle Oberfläche zum Durchsehen bestätigt. Nicht jedes Parameterblatt aus der Community wird dadurch zu einem von NC geprüften Preset; Autor, Datum, Charakterbedingungen und Build müssen an einer Einsendung erhalten bleiben.",
      ],
    },
    "safe-use": {
      paragraphs: [
        "Der geprüfte offizielle Text verspricht nicht, dass jedes Preset Grenzen von Volk, Geschlecht, Serverregion oder künftiger Version überwindet. Er dokumentiert auch kein universelles Drittanbieter-Dateiformat. Ein Screenshot allein beweist weder einen behaupteten Ein-Klick-Import noch die Kompatibilität mit dem Global-Build.",
      ],
      bullets: [
        "Beginne beim offiziellen Style Shop oder der Spieloberfläche; führe für ein Gesichts-Preset keine unbekannte ausführbare Datei aus.",
        "Notiere Volk, Geschlecht, regionalen Build und Veröffentlichungsdatum, bevor du Werte nachbildest.",
        "Hole beim erneuten Veröffentlichen eines Community-Aussehens die Erlaubnis ein und behalte die Namensnennung des Erstellers bei.",
      ],
    },
  },
});

Object.assign(de, {
  "guides/global-monetization-watchlist": {
    confirmed: {
      paragraphs: [
        "Ja. NC gibt an, dass das Basisspiel Free-to-Play ist und kein Spielkauf erforderlich sein wird. Steam führt AION 2 ebenfalls als Free To Play und zeigt In-App-Käufe an. Kostenloser Einstieg bedeutet nicht, dass Shop, Membership, Pass oder jede Servicefunktion kostenlos sind.",
        "NC bindet sowohl den Spieler-Market als auch die Kina/Quna-Exchange ausdrücklich an eine aktive Membership. Eine vollständige Funktionsmatrix für Nichtmitglieder wurde nicht veröffentlicht; die Bezeichnung Free-to-Play darf daher nicht auf jede soziale oder komfortbezogene Funktion ausgedehnt werden.",
      ],
      table: {
        caption:
          "Monetarisierungsstatus von AION 2 Global – geprüft am 24. Juli 2026",
        headers: ["Funktion", "Bestätigt", "Noch unbekannt"],
        rows: [
          {
            header: "Basisspiel",
            cells: [
              "Free-to-Play; kein Spielkauf erforderlich",
              "Endgültige Servicebedingungen und regionale Unterschiede",
            ],
          },
          {
            header: "Membership",
            cells: [
              "Geplant für 15 US-Dollar pro Monat",
              "Vollständige Vorteile, Verlängerung und Regionalpreise",
            ],
          },
          {
            header: "Market / Exchange",
            cells: [
              "Aktive Membership erforderlich",
              "Gebühren, Limits und endgültige Betriebsregeln",
            ],
          },
          {
            header: "Kina / Quna",
            cells: [
              "Kina wird im Spiel verdient; Quna ist Premiumwährung",
              "Quna-Pakete, Preise und Wechselkurse",
            ],
          },
          {
            header: "Daeva Pass",
            cells: [
              "Pro Charakter; Standard- und Premium-Pfad",
              "Saisonpreis, Rhythmus und vollständige Belohnungstabelle",
            ],
          },
          {
            header: "Direkter Handel",
            cells: [
              "Eine von Spielern bestimmte Exchange ist bestätigt",
              "Ob direkter Handel zwischen Spielern existiert",
            ],
          },
        ],
      },
    },
    "pay-to-win-assessment": {
      paragraphs: [
        "Kurzantwort: Die aktuelle Beweislage kann AION 2 Global weder abschließend als Pay-to-Win einstufen noch garantieren, dass Ausgaben praktisch ohne Wirkung bleiben. NC sagt, Shop-Kosmetik biete keinen Kampfvorteil; Verbrauchsgegenstände beeinflussten weder Ausrüstungsfortschritt noch langfristige Stärke und seien im Spiel erhältlich. Vollständiger Katalog, Preise, Erwerbsraten, Membership-Vorteile und Pass-Belohnungen sind noch nicht veröffentlicht.",
        "Bewerte die Monetarisierung in zwei Stufen: Vor dem Start werden offizielle Zusagen und offene Fragen erfasst; danach werden Erwerbsgeschwindigkeit, handelbarer Umfang, Zeitaufwand und Wettbewerbsergebnisse von zahlenden und nichtzahlenden Spielern verglichen. Founder's Packs, Membership, Quna und Daeva Pass müssen getrennt bewertet werden, statt ein Produkt für das gesamte Modell stehen zu lassen.",
      ],
      bullets: [
        "Bestätigt: Das Basisspiel ist kostenlos; Steam zeigt In-App-Käufe; NC sagt, Kosmetik biete keinen Kampfvorteil.",
        "Nicht vollständig bekannt: kompletter Shop und Preise, alle Membership-Vorteile, sämtliche Pass-Belohnungen, Quna-Kurse und kostenlose Erwerbsgeschwindigkeit.",
        "KINA-Methode: Daten und Primärquellen aufbewahren und dieselben Prüfungen im Live-Service von Global wiederholen, statt vor dem Start ein dauerhaftes Label zu vergeben.",
      ],
    },
    membership: {
      paragraphs: [
        "NCs Plan vor dem Start setzt Membership mit 15 US-Dollar pro Monat an. Zu den veröffentlichten Vorteilen gehören Zugang zum Spieler-Market, zur von Spielern bestimmten Kina/Quna-Exchange, zusätzliche Gameplay-Vorteile und ein besonderer Shop mit Kina.",
        "NC hat weder die vollständige Vorteilsliste noch eine Funktionsmatrix für Nichtmitglieder, Regionalpreise, Steuern, Verlängerungs- oder Kündigungsbedingungen veröffentlicht. Das Basisspiel ist kostenlos; präzise bestätigt sind derzeit nur die Service-Sperren für Market und Exchange.",
      ],
      bullets: [
        "15 US-Dollar pro Monat ist der aktuelle Plan, keine unveränderliche Garantie für den Endpreis.",
        "Spieler-Market und Kina/Quna-Exchange erfordern eine aktive Membership.",
        "Zusätzliche Gameplay-Vorteile und ein besonderer Kina-Shop werden genannt; die vollständige Liste ist unveröffentlicht.",
        "Mögliche Beschränkungen für Nichtmitglieder bei Leveln, Gruppen, Dungeons oder PvP wurden nicht vollständig aufgeschlüsselt.",
      ],
    },
    "currencies-and-pass": {
      paragraphs: [
        "Kina wird im Spiel verdient und im Spieler-Market verwendet. Quna ist Premiumwährung für Shop-Gegenstände, den Premium Daeva Pass und den Kauf von Kina über die von Spielern bestimmte Exchange. Laut NC erstellt oder kauft das Spiel selbst keine Exchange-Angebote; Angebot und Nachfrage der Spieler bestimmen den Handel.",
        "Der Fortschritt im Daeva Pass gilt pro Charakter. Jeder Spieler erhält einen Standard-Pfad; Quna schaltet den optionalen Premium-Pfad frei. NC nennt Kosmetik, Gegenstände, Aufwertungsmaterialien und weitere Währungen als Belohnungen. Preise für Quna-Pakete, Wechselkurse, Pass-Preis, Rhythmus und vollständige Belohnungstabelle bleiben unbekannt.",
      ],
      steps: [
        {
          title: "Währungen getrennt betrachten",
          description:
            "Kina wird im Spiel verdient und Quna ist Premiumwährung; ähnlich aussehende Kontostände sind nicht austauschbar.",
        },
        {
          title: "Membership prüfen",
          description:
            "Sowohl Spieler-Market als auch Kina/Quna-Exchange erfordern eine aktive Membership.",
        },
        {
          title: "Pässe pro Charakter einplanen",
          description:
            "Daeva Pass gilt pro Charakter; gehe nicht davon aus, dass eine Premium-Freischaltung jeden Charakter des Kontos abdeckt.",
        },
        {
          title: "Auf reale Preise warten",
          description:
            "Rechne keine Werte aus Korea/Taiwan um, solange globale Quna-Pakete, Regionalpreise, Kurse und Pass-Preise unveröffentlicht sind.",
        },
      ],
    },
    "power-and-unknowns": {
      paragraphs: [
        "NC sagt, Shop-Kosmetik biete keinen Gameplay- oder Kampfvorteil. Verbrauchsgegenstände könnten im Kampf helfen, beeinflussten jedoch weder Ausrüstungsfortschritt noch langfristige Stärke und seien im normalen Spiel erhältlich. Das ist die veröffentlichte Designposition, keine unabhängige Prüfung von Erwerbsgeschwindigkeit, Wirtschafts-Balance oder Wettbewerbslücken nach dem Start.",
        "Offen sind unter anderem die vollständige Membership-Liste, Quna-Preise und Wechselkurse, direkter Spielerhandel, Rhythmus und sämtliche Belohnungen des Passes sowie regionale Produkt- und Erstattungsbedingungen. Founder's Packs sind getrennte Einmalprodukte; die veröffentlichten Inhalte führen keine Membership auf und dürfen nicht als derselbe Kauf behandelt werden.",
      ],
      faq: [
        {
          question: "Muss ich AION 2 Global kaufen?",
          answer:
            "Nein. NC sagt, das Basisspiel sei Free-to-Play, und Steam führt es als Free To Play. Das Spiel enthält dennoch Membership, Quna, Pass und Shop-Käufe.",
        },
        {
          question: "Wie viel kostet die AION 2 Membership?",
          answer:
            "NC plant derzeit 15 US-Dollar pro Monat. Regionalpreis, Steuern, Verlängerung, Kündigung und vollständige Vorteilsliste warten auf die endgültige Produktseite.",
        },
        {
          question: "Können Nichtmitglieder den Market nutzen?",
          answer:
            "Nach dem aktuellen offiziellen Plan nicht. Spieler-Market und Kina/Quna-Exchange erfordern eine aktive Membership; andere Einschränkungen für Nichtmitglieder wurden nicht vollständig aufgeschlüsselt.",
        },
        {
          question: "Gilt Daeva Pass für das ganze Konto?",
          answer:
            "NC beschreibt Daeva Pass derzeit als charaktergebunden. Der Standard-Pfad steht allen Spielern offen und Quna schaltet den Premium-Pfad frei; gehe nicht davon aus, dass ein Kauf jeden Charakter abdeckt.",
        },
        {
          question: "Ist AION 2 Global Pay-to-Win?",
          answer:
            "NC sagt, Kosmetik biete keinen Kampfvorteil; Verbrauchsgegenstände beeinflussten keine langfristige Stärke und seien im Spiel erhältlich. Vollständiger Katalog, Preise und Erwerbsraten fehlen, daher ist eine abschließende Bewertung nach dem Start noch nicht möglich.",
        },
      ],
    },
  },
});

const reviewed = { fr, de, es, "pt-br": ptBr };

const metadataOverrides = {
  fr: {
    "classes/gladiator": {
      title: "Guide AION2 Gladiator : Arcana et Build",
      keywords: [
        "AION2 Gladiator",
        "Gladiator Arcana",
        "Build Gladiator",
        "guide Gladiator AION2",
        "espadon AION2",
      ],
    },
    "classes/assassin": {
      title: "Guide AION2 Assassin : Arcana et Build",
      keywords: [
        "AION2 Assassin",
        "Assassin Arcana",
        "Build Assassin",
        "guide Assassin AION2",
        "deux dagues AION2",
      ],
    },
    "classes/ranger": {
      title: "Guide AION2 Ranger : Skill Tree et Build",
      keywords: [
        "AION2 Ranger",
        "Skill Tree Ranger",
        "Build Ranger",
        "guide Ranger AION2",
        "arc AION2",
      ],
      headings: {
        "ranger-skill-tree-priority":
          "Skill Tree du Ranger : fiabiliser le Build avant les dégâts",
      },
    },
    "classes/sorcerer": {
      title: "Guide AION2 Sorcerer : Build et priorité des compétences",
      keywords: [
        "AION2 Sorcerer",
        "Build Sorcerer",
        "compétences Sorcerer",
        "guide Sorcerer AION2",
        "grimoire AION2",
      ],
    },
    "guides/character-presets-style-shop": {
      title:
        "AION2 Character Creation : préréglages, personnalisation et Style Shop",
      intro:
        "AION2 Character Creation comprend une personnalisation détaillée, des préréglages et le Style Shop officiel. Vérifiez la version, la région et la compatibilité avant d’utiliser une création partagée.",
      keywords: [
        "AION2 Character Creation",
        "préréglages AION2",
        "personnalisation AION2",
        "Style Shop AION2",
      ],
    },
    "guides/global-monetization-watchlist": {
      title: "AION 2 Free-to-Play : Membership, Kina et Quna",
      description:
        "Ce que confirme AION 2 Global : accès gratuit, Membership à 15 $, monnaies Kina et Quna, Daeva Pass et points encore inconnus.",
    },
  },
  de: {
    "classes/gladiator": {
      title: "AION2 Gladiator Guide: Arcana und Build",
      keywords: [
        "AION2 Gladiator",
        "Gladiator Arcana",
        "Gladiator Build",
        "AION2 Gladiator Guide",
        "Greatsword AION2",
      ],
    },
    "classes/assassin": {
      title: "AION2 Assassin Guide: Arcana und Build",
      keywords: [
        "AION2 Assassin",
        "Assassin Arcana",
        "Assassin Build",
        "AION2 Assassin Guide",
        "Doppeldolche AION2",
      ],
    },
    "classes/ranger": {
      title: "AION2 Ranger Guide: Skill Tree und Build",
      keywords: [
        "AION2 Ranger",
        "Ranger Skill Tree",
        "Ranger Build",
        "AION2 Ranger Guide",
        "Bogen AION2",
      ],
      headings: {
        "ranger-skill-tree-priority":
          "Ranger Skill Tree: erst den Build zuverlässig machen",
      },
    },
    "classes/sorcerer": {
      title: "AION2 Sorcerer Guide: Build und Skill-Priorität",
      keywords: [
        "AION2 Sorcerer",
        "Sorcerer Build",
        "Sorcerer Skills",
        "AION2 Sorcerer Guide",
        "Spellbook AION2",
      ],
    },
    "guides/character-presets-style-shop": {
      title: "AION2 Character Creation: Presets, Anpassung und Style Shop",
      intro:
        "AION2 Character Creation bietet eine detaillierte Anpassung, fertige Presets und den offiziellen Style Shop. Prüfe Version, Region und Kompatibilität, bevor du geteilte Werte verwendest.",
      keywords: [
        "AION2 Character Creation",
        "AION2 Presets",
        "AION2 Anpassung",
        "AION2 Style Shop",
      ],
    },
    "guides/global-monetization-watchlist": {
      title: "AION 2 Free-to-Play: Membership, Kina und Quna",
      description:
        "Bestätigter Stand zu AION 2 Global: kostenloser Zugang, Membership für 15 $, Kina, Quna, Daeva Pass und noch offene Details.",
    },
  },
  es: {
    "classes/gladiator": {
      title: "Guía AION2 Gladiator: Arcana y Build",
      keywords: [
        "AION2 Gladiator",
        "Arcana Gladiator",
        "Build Gladiator",
        "guía Gladiator AION2",
        "Greatsword AION2",
      ],
    },
    "classes/assassin": {
      title: "Guía AION2 Assassin: Arcana y Build",
      keywords: [
        "AION2 Assassin",
        "Arcana Assassin",
        "Build Assassin",
        "guía Assassin AION2",
        "dos dagas AION2",
      ],
    },
    "classes/ranger": {
      title: "Guía AION2 Ranger: Skill Tree y Build",
      keywords: [
        "AION2 Ranger",
        "Skill Tree Ranger",
        "Build Ranger",
        "guía Ranger AION2",
        "arco AION2",
      ],
      headings: {
        "ranger-skill-tree-priority":
          "Skill Tree de Ranger: asegurar el Build antes de añadir daño",
      },
    },
    "classes/sorcerer": {
      title: "Guía AION2 Sorcerer: Build y prioridad de habilidades",
      keywords: [
        "AION2 Sorcerer",
        "Build Sorcerer",
        "habilidades Sorcerer",
        "guía Sorcerer AION2",
        "Spellbook AION2",
      ],
    },
    "guides/character-presets-style-shop": {
      title:
        "AION2 Character Creation: preajustes, personalización y Style Shop",
      intro:
        "AION2 Character Creation incluye personalización detallada, preajustes preparados y el Style Shop oficial. Comprueba versión, región y compatibilidad antes de usar datos compartidos.",
      keywords: [
        "AION2 Character Creation",
        "preajustes AION2",
        "personalización AION2",
        "Style Shop AION2",
      ],
    },
    "guides/global-monetization-watchlist": {
      title: "AION 2 Free-to-Play: Membership, Kina y Quna",
      description:
        "Datos confirmados de AION 2 Global: acceso gratuito, Membership de 15 $, Kina, Quna, Daeva Pass y detalles aún pendientes.",
    },
  },
  "pt-br": {
    "classes/gladiator": {
      title: "Guia AION2 Gladiator: Arcana e Build",
      keywords: [
        "AION2 Gladiator",
        "Arcana Gladiator",
        "Build Gladiator",
        "guia Gladiator AION2",
        "Greatsword AION2",
      ],
    },
    "classes/assassin": {
      title: "Guia AION2 Assassin: Arcana e Build",
      keywords: [
        "AION2 Assassin",
        "Arcana Assassin",
        "Build Assassin",
        "guia Assassin AION2",
        "duas adagas AION2",
      ],
    },
    "classes/ranger": {
      title: "Guia AION2 Ranger: Skill Tree e Build",
      keywords: [
        "AION2 Ranger",
        "Skill Tree Ranger",
        "Build Ranger",
        "guia Ranger AION2",
        "arco AION2",
      ],
      headings: {
        "ranger-skill-tree-priority":
          "Skill Tree de Ranger: tornar o Build confiável antes do dano",
      },
    },
    "classes/sorcerer": {
      title: "Guia AION2 Sorcerer: Build e prioridade de habilidades",
      keywords: [
        "AION2 Sorcerer",
        "Build Sorcerer",
        "habilidades Sorcerer",
        "guia Sorcerer AION2",
        "Spellbook AION2",
      ],
    },
    "guides/character-presets-style-shop": {
      title:
        "AION2 Character Creation: predefinições, personalização e Style Shop",
      intro:
        "AION2 Character Creation inclui personalização detalhada, predefinições prontas e o Style Shop oficial. Confira versão, região e compatibilidade antes de usar dados compartilhados.",
      keywords: [
        "AION2 Character Creation",
        "predefinições AION2",
        "personalização AION2",
        "Style Shop AION2",
      ],
    },
    "guides/global-monetization-watchlist": {
      title: "AION 2 Free-to-Play: Membership, Kina e Quna",
      description:
        "O que já foi confirmado em AION 2 Global: acesso grátis, Membership de US$ 15, Kina, Quna, Daeva Pass e pontos ainda em aberto.",
    },
  },
};

const postEnhancementSections = {
  fr: {
    "guides/character-presets-style-shop": [
      {
        id: "preset-workflow",
        title: "Conserver et recréer un préréglage AION2 en sécurité",
        paragraphs: [
          "Enregistrez les vues de face et de profil ainsi que les curseurs importants, avec le Build du client, la faction ou race, le sexe et la source. Sans import direct, ces éléments permettent encore de recréer l’apparence dans la même version.",
          "Un préréglage communautaire ne doit jamais exiger un exécutable, la désactivation d’une protection ou des identifiants. Utilisez uniquement le format et l’interface d’import proposés par le client actuel.",
        ],
        bullets: [
          "Conservez plusieurs angles et les curseurs importants, pas seulement le portrait final.",
          "Notez le Build, la race, le sexe et la source d’origine.",
          "N’exécutez aucun convertisseur, script ou programme d’installation inconnu.",
        ],
      },
      {
        id: "style-shop-boundary",
        title: "Ce que la page Style Shop confirme, et ce qu’elle ne confirme pas",
        paragraphs: [
          "La page officielle Style Shop confirme une vitrine d’apparences ou un accès associé. Elle ne prouve pas que chaque ancien préréglage fonctionne dans toutes les régions, races ou versions du client.",
          "Avant utilisation, vérifiez la région de la page et les conditions, prix et limites affichés dans le client. En cas de différence, suivez l’interface actuelle et l’avis le plus récent.",
        ],
      },
    ],
    "guides/global-monetization-watchlist": [
      {
        id: "shop-evaluation",
        title: "Comment réévaluer les produits AION 2 Global au lancement ?",
        paragraphs: [
          "La référence actuelle est un jeu de base gratuit, une Membership prévue à 15 $ par mois, une Membership active pour Market et Exchange, et un Daeva Pass par personnage. Au lancement, vérifiez ces quatre points puis relevez prix régional, monnaie, liaison, portée personnage/compte, limite, durée, renouvellement et remboursement.",
          "Laissez inconnus tous les champs non publiés, notamment packs Quna, taux, avantages complets de Membership, prix du Pass et échange direct. Les Founder's Packs sont des achats uniques distincts et ne prouvent pas l’inclusion d’une Membership.",
        ],
        bullets: [
          "Conservez la page officielle du produit et la date de vérification.",
          "Relevez séparément Membership, portée, durée, limite et remboursement.",
          "Séparez texte confirmé, observation de l’interface et jugement personnel.",
          "Comparez de nouveau après chaque mise à jour au lieu de reprendre un ancien prix.",
        ],
      },
    ],
  },
  de: {
    "guides/character-presets-style-shop": [
      {
        id: "preset-workflow",
        title: "Ein AION2-Preset sicher speichern und nachbauen",
        paragraphs: [
          "Speichere Vorder- und Seitenansicht sowie wichtige Regler zusammen mit Client-Build, Fraktion oder Volk, Geschlecht und Quelle. Fehlt ein direkter Import, lässt sich das Aussehen damit in derselben Version nachbauen.",
          "Ein Community-Preset darf keine ausführbare Datei, deaktivierten Schutz oder Kontodaten verlangen. Verwende nur Dateiformat und Importoberfläche, die der aktuelle Client selbst anbietet.",
        ],
        bullets: [
          "Bewahre mehrere Ansichten und wichtige Regler auf, nicht nur das fertige Porträt.",
          "Notiere Build, Volk, Geschlecht und ursprüngliche Quelle.",
          "Führe keinen unbekannten Konverter, kein Skript und keinen Installer aus.",
        ],
      },
      {
        id: "style-shop-boundary",
        title: "Was die Style-Shop-Seite bestätigt – und was nicht",
        paragraphs: [
          "Die offizielle Style-Shop-Seite bestätigt eine offizielle Darstellung von Aussehen oder einen zugehörigen Zugang. Sie beweist nicht, dass jedes ältere Preset regions-, volks- und versionsübergreifend funktioniert.",
          "Prüfe vor der Verwendung Seitenregion sowie Bedingungen, Preis und Limits im Client. Bei Abweichungen gelten die aktuelle Spieloberfläche und die neuere Mitteilung.",
        ],
      },
    ],
    "guides/global-monetization-watchlist": [
      {
        id: "shop-evaluation",
        title: "So werden AION-2-Global-Produkte zum Start neu geprüft",
        paragraphs: [
          "Ausgangspunkt sind das kostenlose Basisspiel, eine geplante Membership für 15 US-Dollar monatlich, aktive Membership für Market und Exchange sowie ein Daeva Pass pro Charakter. Prüfe zum Start diese vier Punkte und erfasse Regionalpreis, Währung, Bindung, Charakter-/Kontoumfang, Kauflimit, Laufzeit, Verlängerung und Erstattung.",
          "Nicht veröffentlichte Felder bleiben unbekannt, besonders Quna-Pakete, Kurse, vollständige Membership-Vorteile, Pass-Preis und direkter Handel. Founder's Packs sind getrennte Einmalkäufe und belegen keine Membership.",
        ],
        bullets: [
          "Speichere offizielle Produktseite und Prüfdatum.",
          "Erfasse Membership, Umfang, Laufzeit, Limit und Erstattung getrennt.",
          "Trenne bestätigten Text, Beobachtung der Oberfläche und persönliche Bewertung.",
          "Vergleiche nach Produktupdates neu, statt alte Preise zu übernehmen.",
        ],
      },
    ],
  },
  es: {
    "guides/character-presets-style-shop": [
      {
        id: "preset-workflow",
        title: "Guardar y recrear un preajuste de AION2 con seguridad",
        paragraphs: [
          "Guarda vistas frontal y lateral y los controles importantes junto con el Build del cliente, facción o raza, sexo y fuente. Si no hay importación directa, el registro permite recrear la apariencia en la misma versión.",
          "Un preajuste comunitario no debe exigir ejecutables, desactivar protección ni credenciales. Usa solo el formato y la interfaz de importación que ofrece el cliente actual.",
        ],
        bullets: [
          "Conserva varios ángulos y controles importantes, no solo el retrato final.",
          "Registra Build, raza, sexo y fuente original.",
          "No ejecutes convertidores, scripts ni instaladores desconocidos.",
        ],
      },
      {
        id: "style-shop-boundary",
        title: "Qué confirma la página Style Shop y qué no",
        paragraphs: [
          "La página oficial Style Shop confirma un escaparate de apariencias o acceso relacionado. No demuestra que todo preajuste antiguo funcione entre regiones, razas o Builds.",
          "Antes de usarlo, comprueba región, condiciones, precio y límites del cliente. Si difieren, sigue la interfaz actual y el aviso más reciente.",
        ],
      },
    ],
    "guides/global-monetization-watchlist": [
      {
        id: "shop-evaluation",
        title: "Cómo revisar los productos AION 2 Global en el lanzamiento",
        paragraphs: [
          "La referencia actual es juego base gratuito, Membership prevista de 15 US$ al mes, Membership activa para Market y Exchange y Daeva Pass por personaje. En el lanzamiento, verifica esos cuatro puntos y registra precio regional, moneda, vinculación, alcance de personaje/cuenta, límite, duración, renovación y reembolso.",
          "Mantén desconocidos los campos no publicados, sobre todo packs de Quna, tasas, ventajas completas de Membership, precio de Pass e intercambio directo. Founder's Packs son compras únicas separadas y no demuestran Membership.",
        ],
        bullets: [
          "Guarda la página oficial del producto y la fecha de verificación.",
          "Registra por separado Membership, alcance, duración, límite y reembolso.",
          "Separa texto confirmado, observación de interfaz y valoración personal.",
          "Compara de nuevo tras cada actualización, sin arrastrar un precio antiguo.",
        ],
      },
    ],
  },
  "pt-br": {
    "guides/character-presets-style-shop": [
      {
        id: "preset-workflow",
        title: "Salvar e recriar uma predefinição de AION2 com segurança",
        paragraphs: [
          "Salve vistas frontal e lateral e os controles importantes junto com o Build do cliente, facção ou raça, sexo e fonte. Sem importação direta, o registro ainda permite recriar a aparência na mesma versão.",
          "Uma predefinição comunitária não deve exigir executável, desativar proteção ou fornecer credenciais. Use somente o formato e a interface de importação oferecidos pelo cliente atual.",
        ],
        bullets: [
          "Guarde vários ângulos e controles importantes, não só o retrato final.",
          "Registre Build, raça, sexo e fonte original.",
          "Não execute conversor, script ou instalador desconhecido.",
        ],
      },
      {
        id: "style-shop-boundary",
        title: "O que a página Style Shop confirma e o que não confirma",
        paragraphs: [
          "A página oficial Style Shop confirma uma vitrine de aparências ou acesso relacionado. Ela não prova que toda predefinição antiga funcione entre regiões, raças ou Builds.",
          "Antes de usar, confira região, condições, preço e limites no cliente. Se houver diferença, siga a interface atual e o aviso mais recente.",
        ],
      },
    ],
    "guides/global-monetization-watchlist": [
      {
        id: "shop-evaluation",
        title: "Como revisar os produtos de AION 2 Global no lançamento",
        paragraphs: [
          "A referência atual é jogo base gratuito, Membership planejada de US$ 15 por mês, Membership ativa para Market e Exchange e Daeva Pass por personagem. No lançamento, confira esses quatro pontos e registre preço regional, moeda, vínculo, alcance de personagem/conta, limite, duração, renovação e reembolso.",
          "Mantenha desconhecidos os campos não publicados, sobretudo pacotes de Quna, taxas, benefícios completos de Membership, preço de Pass e troca direta. Founder's Packs são compras únicas separadas e não comprovam Membership.",
        ],
        bullets: [
          "Salve a página oficial do produto e a data da verificação.",
          "Registre Membership, alcance, duração, limite e reembolso separadamente.",
          "Separe texto confirmado, observação da interface e avaliação pessoal.",
          "Compare de novo após cada atualização, sem carregar preço antigo.",
        ],
      },
    ],
  },
};

function stripTranslationDisclosure(locale, value) {
  const patterns = {
    fr: /\s*Pour éviter toute erreur de terminologie[\s\S]*?sont localisés\.\s*$/u,
    de: /\s*Um falsche Spielbegriffe[\s\S]*?sind lokalisiert\.\s*$/u,
    es: /\s*Para evitar errores de terminología[\s\S]*?están localizados\.\s*$/u,
    "pt-br":
      /\s*Para evitar erros de terminologia[\s\S]*?estão localizados\.\s*$/u,
  };
  return value.replace(patterns[locale], "").trim();
}

function assertSameShape(source, localized, label) {
  if (Array.isArray(source)) {
    if (!Array.isArray(localized) || localized.length !== source.length) {
      throw new Error(`${label} array shape differs from source`);
    }
    source.forEach((value, index) =>
      assertSameShape(value, localized[index], `${label}[${index}]`),
    );
    return;
  }
  if (source && typeof source === "object") {
    if (!localized || typeof localized !== "object" || Array.isArray(localized)) {
      throw new Error(`${label} object shape differs from source`);
    }
    const sourceKeys = Object.keys(source);
    const localizedKeys = Object.keys(localized);
    if (
      sourceKeys.length !== localizedKeys.length ||
      sourceKeys.some((key) => !localizedKeys.includes(key))
    ) {
      throw new Error(`${label} keys differ from source`);
    }
    for (const key of sourceKeys) {
      assertSameShape(source[key], localized[key], `${label}.${key}`);
    }
    return;
  }
  if (typeof localized !== "string") {
    throw new Error(`${label} must be localized text`);
  }
}

function sectionBody(section) {
  return Object.fromEntries(
    Object.entries(section).filter(([key]) => key !== "id" && key !== "title"),
  );
}

const source = JSON.parse(await readFile(sourcePath, "utf8"));
const generated = JSON.parse(await readFile(generatedPath, "utf8"));
const identities = Object.keys(source.entries);

if (identities.length !== 12) {
  throw new Error(`Expected 12 targeted identities, received ${identities.length}`);
}

for (const locale of locales) {
  const translations = reviewed[locale];
  if (!translations) {
    throw new Error(`Missing reviewed body set for ${locale}`);
  }
  const shardPath = path.join(shardDir, `${locale}.json`);
  const shard = JSON.parse(await readFile(shardPath, "utf8"));

  for (const identity of identities) {
    const current = shard.entries[identity];
    const bodySet = translations[identity];
    if (!current || !bodySet) {
      throw new Error(`${locale}.${identity} is missing`);
    }

    current.content.intro = stripTranslationDisclosure(
      locale,
      current.content.intro,
    );
    const metadata = metadataOverrides[locale]?.[identity];
    if (metadata?.title) current.content.title = metadata.title;
    if (metadata?.description) {
      current.content.description = metadata.description;
    }
    if (metadata?.intro) current.content.intro = metadata.intro;
    if (metadata?.keywords) current.content.keywords = metadata.keywords;

    const supplementalSections =
      postEnhancementSections[locale]?.[identity] ?? [];
    const supplementalById = Object.fromEntries(
      supplementalSections.map((section) => [section.id, section]),
    );
    current.content.sections = current.content.sections.map((section) => {
      const supplemental = supplementalById[section.id];
      const localizedBody =
        bodySet[section.id] ??
        (supplemental ? sectionBody(supplemental) : undefined);
      if (!localizedBody) {
        throw new Error(`${locale}.${identity}.${section.id} is missing`);
      }
      const sourceSection = source.entries[
        identity
      ].content.sections.find(
        (candidate) => candidate.id === section.id,
      );
      if (!sourceSection) {
        throw new Error(`Source section ${identity}.${section.id} is missing`);
      }
      assertSameShape(
        sectionBody(sourceSection),
        localizedBody,
        `${locale}.${identity}.${section.id}`,
      );
      const title =
        metadata?.headings?.[section.id] ??
        supplemental?.title ??
        section.title;
      return { id: section.id, title, ...localizedBody };
    });

    if (current.heroImage && metadata?.title) {
      const heroPrefixes = {
        fr: "Visuel officiel AION 2 : ",
        de: "Offizielles AION-2-Bild: ",
        es: "Imagen oficial de AION 2: ",
        "pt-br": "Imagem oficial de AION 2: ",
      };
      current.heroImage.alt = `${heroPrefixes[locale]}${current.content.title}`;
    }

    generated.entries[identity][locale] = structuredClone(current);
  }

  await writeFile(shardPath, `${JSON.stringify(shard, null, 2)}\n`, "utf8");
}

generated.generatedAt = "2026-07-26";
await writeFile(
  generatedPath,
  `${JSON.stringify(generated, null, 2)}\n`,
  "utf8",
);

console.log(
  `Applied reviewed full-body localization to ${identities.length} identities across ${locales.length} western locales`,
);
