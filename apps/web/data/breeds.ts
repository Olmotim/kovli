export type Tamano = "pequeño" | "mediano" | "grande";

export type Energia = "bajo" | "medio" | "alto";

export type AptoPrimerizos = "sí" | "según el caso" | "requiere experiencia";

export type Breed = {
  slug: string;
  nombre: string;
  fotoUrl: string;
  fotoAlt: string;
  tamano: Tamano;
  temperamento: string;
  energia: Energia;
  pelaje: string;
  aptoPrimerizos: AptoPrimerizos;
  esperanzaVida: string;
  notasSalud: string;
  // Opcionales: se añaden raza a raza en la fase de contenido (feature 008),
  // así que una raza sin ellos todavía debe verse bien en la ficha.
  otrasFotos?: { url: string; alt: string }[];
  introduccion?: string[];
};

export const breeds: Breed[] = [
  {
    slug: "labrador-retriever",
    nombre: "Labrador Retriever",
    fotoUrl:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Labrador Retriever color chocolate sentado en el suelo",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1594389682242-00d02fc2a3ba?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Labrador Retriever negro con collar rojo, primer plano" },
      { url: "https://images.unsplash.com/photo-1543702303-71766260f6d3?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Labrador Retriever color crema apoyando la cabeza sobre una mesa de madera" },
    ],
    introduccion: [
      "Aunque hoy es sinónimo de perro de familia, el Labrador nació como perro de trabajo: en Terranova ayudaba a los pescadores a recuperar las redes y los peces que se escapaban del agua fría. Esa herencia acuática explica su pelaje denso y resistente al agua, y las patas parcialmente palmeadas que todavía conserva.",
      "Es, según los rankings de obediencia, una de las razas más fáciles de entrenar del mundo — motivado casi siempre por la comida, aprende con rapidez y le entusiasma cualquier tarea que implique buscar o traer algo. Existe en tres colores (negro, chocolate y dorado), aunque genéticamente son la misma raza: solo cambia el pigmento.",
    ],
    tamano: "grande",
    temperamento: "Amigable, activo y muy sociable; excelente con niños y otras mascotas.",
    energia: "alto",
    pelaje: "Pelo corto y denso, con muda estacional abundante; cepillado semanal para controlarla.",
    aptoPrimerizos: "sí",
    esperanzaVida: "10-12 años",
    notasSalud: "Predisposición a displasia de cadera y codo, y a la obesidad si no se controla la dieta y el ejercicio.",
  },
  {
    slug: "golden-retriever",
    nombre: "Golden Retriever",
    fotoUrl:
      "https://images.unsplash.com/photo-1760791510936-eef13da5018b?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Golden Retriever mirando a cámara al aire libre",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1756407683740-389424d0b04f?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Golden Retriever sentado en un camino de tierra durante un paseo" },
      { url: "https://images.unsplash.com/photo-1609510471617-b2e55f24d821?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Golden Retriever mojado de pie en una playa" },
    ],
    introduccion: [
      "Criado en las Tierras Altas de Escocia a mediados del siglo XIX para cobrar piezas de caza en terrenos pantanosos, el Golden Retriever combina un olfato extraordinario con una mordida suave — es capaz de llevar un huevo en la boca sin romperlo. Esa delicadeza, unida a su paciencia, lo convirtió pronto en uno de los perros de familia y de asistencia más solicitados del mundo.",
      "Su pelaje dorado y ondulado necesita cepillado frecuente, sobre todo en las épocas de muda, pero a cambio ofrece uno de los temperamentos más equilibrados que existen: rara vez agresivo, sociable con desconocidos y muy paciente con niños.",
    ],
    tamano: "grande",
    temperamento: "Paciente, cariñoso y fácil de motivar; muy buen perro de familia.",
    energia: "alto",
    pelaje: "Pelo largo y denso, con muda notable; cepillado 2-3 veces por semana.",
    aptoPrimerizos: "sí",
    esperanzaVida: "10-12 años",
    notasSalud: "Riesgo elevado de displasia de cadera y de ciertos tipos de cáncer; conviene mantener revisiones veterinarias regulares.",
  },
  {
    slug: "caniche",
    nombre: "Caniche (Poodle)",
    fotoUrl:
      "https://images.unsplash.com/photo-1652757556345-cc9e640dce81?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Caniche marrón de pelaje rizado y voluminoso, de pie sobre hierba",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1614261812340-5ee9a3ed33a3?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Caniche estándar negro, retrato de cara con su pelaje rizado característico" },
      { url: "https://images.unsplash.com/photo-1522039553440-46d3e1e61e4a?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Caniche toy albaricoque, primer plano de su cara y hocico" },
    ],
    introduccion: [
      "Aunque su elegancia lo asocia a Francia, el Caniche desciende de robustos perros de agua alemanes criados para cobrar aves acuáticas. Su nombre viene del alemán «Pudel», chapotear.",
      "Es, según los estudios de obediencia, la segunda raza más inteligente del mundo. Aprende con una facilidad pasmosa, se apega intensamente a su familia y necesita tanto estímulo mental como físico para no aburrirse. Existe en tres tallas —estándar, miniatura y toy— y su célebre corte «león» no fue vanidad: protegía las articulaciones del frío del agua.",
    ],
    tamano: "mediano",
    temperamento: "Muy inteligente y fácil de entrenar; leal con su familia. Existen variedades toy, mini y estándar.",
    energia: "medio",
    pelaje: "Pelo rizado que apenas muda, pero necesita corte profesional con regularidad.",
    aptoPrimerizos: "según el caso",
    esperanzaVida: "12-15 años",
    notasSalud: "Predisposición a problemas oculares y a luxación de rótula, sobre todo en las variedades más pequeñas.",
  },
  {
    slug: "chihuahua",
    nombre: "Chihuahua",
    fotoUrl:
      "https://images.unsplash.com/photo-1589402730616-93657a1844f7?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Chihuahua marrón con collar azul",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1494205577727-d32e58564756?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Chihuahua color canela tumbado en un sofá" },
      { url: "https://images.unsplash.com/photo-1555699240-a4c509eb752f?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Chihuahua blanco en brazos de su dueña, primer plano" },
    ],
    introduccion: [
      "Debe su nombre al estado mexicano de Chihuahua, de donde partieron los primeros ejemplares hacia Estados Unidos a mediados del siglo XIX — aunque su origen real se remonta más atrás, como perro de compañía de las civilizaciones precolombinas de México. Es la raza más pequeña reconocida oficialmente, pero su personalidad no lo sabe: se comporta con la seguridad de un perro mucho más grande.",
      "Existe en variedad de pelo corto y largo, y en una amplia gama de colores. Por su tamaño diminuto es frágil (un salto desde el sofá puede lesionarlo) y tiende a apegarse mucho a una sola persona, algo a tener en cuenta para socializarlo bien desde cachorro.",
    ],
    tamano: "pequeño",
    temperamento: "Alerta, valiente y muy apegado a su dueño; puede mostrarse desconfiado con extraños.",
    energia: "medio",
    pelaje: "Pelo corto o largo según la variedad; cuidado mínimo, cepillado ocasional.",
    aptoPrimerizos: "según el caso",
    esperanzaVida: "14-16 años",
    notasSalud: "Frágil por su tamaño (riesgo de fracturas), propenso a problemas dentales y a luxación de rótula.",
  },
  {
    slug: "bulldog-frances",
    nombre: "Bulldog Francés",
    fotoUrl:
      "https://images.unsplash.com/photo-1613059217223-c48fd81dc623?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Cachorro de Bulldog Francés blanco y negro tumbado",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1616312513065-28cf4313abda?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Cachorro de Bulldog Francés blanco sentado en la calle, orejas de murciélago" },
      { url: "https://images.unsplash.com/photo-1598134493202-9a02529d86bb?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Bulldog Francés marrón y blanco con sudadera amarilla" },
    ],
    introduccion: [
      "Pese a su nombre, el Bulldog Francés nació en Inglaterra, de la mano de los tejedores de Nottingham que llevaron bulldogs en miniatura a Francia durante la industrialización del siglo XIX — allí se refinó la raza hasta darle sus icónicas orejas de murciélago. Hoy es una de las razas más populares del mundo, sobre todo en ciudades, gracias a su tamaño compacto y su bajo nivel de ejercicio.",
      "Es cariñoso, juguetón sin ser hiperactivo, y se lleva bien con niños y otras mascotas. Como raza braquicéfala (cara achatada), necesita cuidado extra con el calor y el ejercicio intenso, y muchos ejemplares no pueden nadar por su estructura corporal.",
    ],
    tamano: "pequeño",
    temperamento: "Cariñoso, juguetón y tranquilo; se adapta bien a pisos pequeños.",
    energia: "bajo",
    pelaje: "Pelo corto, cuidado mínimo; atención a los pliegues de la cara, que necesitan limpieza regular.",
    aptoPrimerizos: "sí",
    esperanzaVida: "10-12 años",
    notasSalud: "Raza braquicéfala: problemas respiratorios y sensibilidad al calor; los partos suelen requerir cesárea.",
  },
  {
    slug: "pastor-aleman",
    nombre: "Pastor Alemán",
    fotoUrl:
      "https://images.unsplash.com/photo-1628960584700-0a8710c01a24?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Pastor Alemán de capa negra y fuego",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1539641388297-277284b9ba67?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Pastor Alemán con correa roja, de pie sobre una roca con vistas a un valle" },
      { url: "https://images.unsplash.com/photo-1676294478768-75519c318da3?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Pastor Alemán tumbado entre hojas de otoño en un bosque" },
    ],
    introduccion: [
      "Desarrollado a finales del siglo XIX por el capitán Max von Stephanitz, que buscaba unificar las distintas variedades de perros pastores alemanes en una sola raza estandarizada, el Pastor Alemán se convirtió rápido en el perro de trabajo por excelencia: policía, ejército, guía de personas ciegas, rescate — pocas razas abarcan tantos oficios distintos.",
      "Su inteligencia, entre las tres primeras razas más listas del mundo, va de la mano de una necesidad real de tener una tarea que cumplir. Sin trabajo mental, físico o ambos, tiende a aburrirse y desarrollar conductas destructivas — no es un perro para dejar solo todo el día ni para un primerizo sin tiempo que dedicarle.",
    ],
    tamano: "grande",
    temperamento: "Leal, protector e inteligente; necesita trabajo mental y físico constante.",
    energia: "alto",
    pelaje: "Pelo denso de doble capa, con muda abundante; cepillado frecuente.",
    aptoPrimerizos: "requiere experiencia",
    esperanzaVida: "9-13 años",
    notasSalud: "Alta incidencia de displasia de cadera y codo, y de mielopatía degenerativa.",
  },
  {
    slug: "yorkshire-terrier",
    nombre: "Yorkshire Terrier",
    fotoUrl:
      "https://images.unsplash.com/photo-1771341049242-4b04231b2006?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Yorkshire Terrier pequeño con lazo azul",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1598826046537-475a302ffcee?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Dos Yorkshire Terrier con abrigos a cuadros rojos, sobre unas rocas al atardecer" },
      { url: "https://images.unsplash.com/photo-1611509270409-0a5fb6c7a01d?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Yorkshire Terrier de perfil sobre césped" },
    ],
    introduccion: [
      "Nació en el norte de Inglaterra durante la revolución industrial del siglo XIX, criado por obreros textiles para cazar ratas en fábricas y minas — un origen humilde muy alejado de la imagen glamurosa que tiene hoy como perro de compañía y de exposición. Su pelo largo, sedoso y sin apenas muda desciende directamente de esa selección práctica: un pelaje resistente que lo protegía al meterse en madrigueras.",
      "Pese a caber en un bolso, conserva el carácter valiente y terco propio de los terrier: no es raro que se enfrente a perros mucho más grandes sin dudarlo. Necesita socialización temprana para que esa valentía no se convierta en desconfianza excesiva hacia otros perros.",
    ],
    tamano: "pequeño",
    temperamento: "Valiente, curioso y con mucho carácter pese a su tamaño.",
    energia: "medio",
    pelaje: "Pelo largo y sedoso que no muda, pero exige cepillado diario y cortes regulares.",
    aptoPrimerizos: "según el caso",
    esperanzaVida: "13-16 años",
    notasSalud: "Propenso a problemas dentales, colapso traqueal y luxación de rótula.",
  },
  {
    slug: "boxer",
    nombre: "Boxer",
    fotoUrl:
      "https://images.unsplash.com/photo-1573564638412-ad9bc5fa19f0?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Boxer marrón jugando en la nieve",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1760121635250-19b425f04b90?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Cachorro de Boxer atigrado sobre el techo de un coche" },
      { url: "https://images.unsplash.com/photo-1515169346712-34986076a931?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Boxer asomado a la ventana de una casa, junto a un cartel de \"Beware of dog\"" },
    ],
    introduccion: [
      "Desciende de razas de presa alemanas usadas en el siglo XIX para sujetar toros y jabalíes durante la caza, un pasado que explica su mandíbula fuerte y su constitución musculosa. Cuando esa práctica se prohibió, el Boxer se reconvirtió con facilidad en perro de trabajo, policía y, sobre todo, en uno de los compañeros de familia más populares del siglo XX.",
      "Conserva fama de «eterno cachorro»: sigue siendo juguetón y payaso mucho después de dejar atrás la etapa de cachorro, y es especialmente paciente con los niños. Como raza semi-braquicéfala, tolera mal el calor extremo y el ejercicio intenso en las horas de más sol.",
    ],
    tamano: "grande",
    temperamento: "Enérgico, juguetón y muy paciente con los niños.",
    energia: "alto",
    pelaje: "Pelo corto, cuidado mínimo; cepillado ocasional.",
    aptoPrimerizos: "según el caso",
    esperanzaVida: "10-12 años",
    notasSalud: "Predisposición a problemas cardíacos y a ciertos tipos de cáncer; sensible al calor por ser semi-braquicéfalo.",
  },
  {
    slug: "beagle",
    nombre: "Beagle",
    fotoUrl:
      "https://images.unsplash.com/photo-1608113240046-4324c3d96c49?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Beagle tricolor marrón, blanco y negro",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1561443320-59426bbec8d2?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Beagle de pie en un porche de madera junto a plantas tropicales" },
      { url: "https://images.unsplash.com/photo-1554199818-e19a3e4c9bc6?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Beagle saltando a la carrera sobre un campo de hierba" },
    ],
    introduccion: [
      "Criado en Inglaterra para la caza en jauría de liebres, el Beagle tiene uno de los olfatos más finos del mundo canino — solo por detrás del Bloodhound — lo que explica por qué tantos cuerpos de aduanas y aeropuertos lo usan para detectar alimentos y sustancias prohibidas. Ese mismo olfato es también su mayor reto en casa: si capta un rastro interesante, puede ignorar cualquier llamada.",
      "Es un perro de jauría por naturaleza, así que disfruta mucho de la compañía de otros perros y no lleva bien quedarse solo largas horas — tiende a expresar el aburrimiento a base de ladridos y aullidos.",
    ],
    tamano: "mediano",
    temperamento: "Curioso, amigable y con un olfato muy desarrollado; le encanta explorar.",
    energia: "alto",
    pelaje: "Pelo corto, cuidado mínimo; muda moderada.",
    aptoPrimerizos: "sí",
    esperanzaVida: "12-15 años",
    notasSalud: "Tendencia a la obesidad y a infecciones de oído por sus orejas caídas.",
  },
  {
    slug: "cocker-spaniel",
    nombre: "Cocker Spaniel",
    fotoUrl:
      "https://images.unsplash.com/photo-1548031611-745a4c0e6c93?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Cocker Spaniel tricolor sobre hierba verde",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1762339107504-4a3908ac0257?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Cocker Spaniel canela, primer plano de las orejas largas sobre hierba" },
      { url: "https://images.unsplash.com/photo-1754816969541-d56e7d263dd7?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Cocker Spaniel dorado sentado sobre las patas traseras en un jardín" },
    ],
    introduccion: [
      "Su nombre viene de la caza de la «cocha» o becada, un ave que este spaniel inglés cobraba con especial habilidad gracias a su olfato y su tamaño ágil para moverse entre la maleza. Sus orejas largas y caídas, lejos de ser solo estéticas, ayudaban a arrastrar el olor del terreno hacia la nariz mientras rastreaba.",
      "Es uno de los perros de familia más equilibrados que existen: dócil, cariñoso y con ganas de agradar, lo que facilita mucho su educación. Su pelaje sedoso necesita cepillado frecuente, sobre todo en las orejas y las patas, donde se enreda con facilidad y puede acumular humedad tras los paseos.",
    ],
    tamano: "mediano",
    temperamento: "Dulce, sociable y afectuoso; se lleva bien con niños y otras mascotas.",
    energia: "medio",
    pelaje: "Pelo largo y sedoso, con muda moderada; cepillado frecuente, especialmente en las orejas.",
    aptoPrimerizos: "sí",
    esperanzaVida: "12-15 años",
    notasSalud: "Propenso a infecciones de oído y a problemas oculares.",
  },
  {
    slug: "schnauzer-miniatura",
    nombre: "Schnauzer Miniatura",
    fotoUrl:
      "https://images.unsplash.com/photo-1625316708582-7c38734be31d?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Schnauzer miniatura gris y blanco sacando la lengua",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1580467277788-c6e040296602?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Retrato de Schnauzer Miniatura con la barba y cejas características" },
      { url: "https://images.unsplash.com/photo-1581351877917-fd4b965ead15?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Schnauzer Miniatura sentado sobre un tocón en un parque en otoño" },
    ],
    introduccion: [
      "Es la versión reducida del Schnauzer Estándar alemán, criada a finales del siglo XIX específicamente para este tamaño más pequeño, sin perder ni el carácter ni las señas de identidad de la raza: las cejas pobladas y la barba características, que en su origen protegían el hocico durante la caza de alimañas en granjas.",
      "Es un guardián nato pese a su tamaño —alerta y algo desconfiado con extraños, pero muy cariñoso con su familia— y necesita corte o stripping regular para mantener la textura correcta de su pelo duro, que apenas muda y por eso resulta una opción popular para quien busca un perro menos alérgeno.",
    ],
    tamano: "pequeño",
    temperamento: "Inteligente, activo y buen guardián para su tamaño.",
    energia: "medio",
    pelaje: "Pelo duro (de alambre) que apenas muda; requiere stripping o corte regular.",
    aptoPrimerizos: "sí",
    esperanzaVida: "12-14 años",
    notasSalud: "Riesgo de pancreatitis y de cálculos en la vejiga.",
  },
  {
    slug: "shih-tzu",
    nombre: "Shih Tzu",
    fotoUrl:
      "https://images.unsplash.com/photo-1534628526458-a8de087b1123?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Shih Tzu adulto blanco y negro caminando",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1519677194310-7b6f32e6446f?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Primer plano de la cara de un Shih Tzu gris y blanco" },
      { url: "https://images.unsplash.com/photo-1604579493738-c12b9c0ef36a?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Shih Tzu blanco y canela tumbado sobre césped, mordisqueando una hoja" },
    ],
    introduccion: [
      "Su nombre significa «perro león» en chino, y no es casualidad: durante siglos vivió en los palacios imperiales chinos como perro de compañía de la realeza, criado para parecerse al león que simboliza el budismo, no para trabajar ni cazar. Esa historia explica su temperamento: es un perro pensado para hacer compañía, no para tareas.",
      "Tranquilo y muy apegado a su familia, se adapta bien a pisos y a un ritmo de vida pausado. Su pelaje largo y denso necesita cepillado diario para no enredarse, y muchos dueños optan por un corte corto de mantenimiento si no quieren dedicarle ese tiempo a diario.",
    ],
    tamano: "pequeño",
    temperamento: "Afectuoso, tranquilo y muy apegado a la familia.",
    energia: "bajo",
    pelaje: "Pelo largo y denso que apenas muda, pero exige cepillado diario.",
    aptoPrimerizos: "sí",
    esperanzaVida: "10-16 años",
    notasSalud: "Raza braquicéfala: problemas respiratorios y oculares, sensible al calor.",
  },
  {
    slug: "border-collie",
    nombre: "Border Collie",
    fotoUrl:
      "https://images.unsplash.com/photo-1568393691080-d016376b767d?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Border Collie adulto marrón y blanco, primer plano",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1602973903652-1177bf284d7b?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Border Collie marrón y blanco mirando hacia arriba en un bosque" },
      { url: "https://images.unsplash.com/photo-1759407262889-a5c4413fe36b?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Retrato en blanco y negro de un Border Collie con la mirada fija" },
    ],
    introduccion: [
      "Desarrollado en la frontera (border) entre Inglaterra y Escocia para pastorear ovejas en terrenos difíciles, el Border Collie se considera de forma casi unánime la raza de perro más inteligente del mundo — capaz de aprender cientos de órdenes y de resolver problemas con una lógica sorprendente. Su técnica de pastoreo, la «mirada» fija con la que inmoviliza al rebaño, es única entre las razas pastoras.",
      "Esa inteligencia tiene un precio: necesita estimulación mental constante, no solo ejercicio físico, o desarrolla ansiedad y conductas obsesivas como perseguir sombras o su propia cola. No es una raza para un estilo de vida sedentario, por mucho cariño que se le tenga.",
    ],
    tamano: "mediano",
    temperamento: "Extremadamente inteligente y trabajador; necesita estimulación mental constante.",
    energia: "alto",
    pelaje: "Pelo medio-largo con muda estacional; cepillado semanal.",
    aptoPrimerizos: "requiere experiencia",
    esperanzaVida: "12-15 años",
    notasSalud: "Predisposición a displasia de cadera y a anomalía del ojo del Collie (CEA).",
  },
  {
    slug: "husky-siberiano",
    nombre: "Husky Siberiano",
    fotoUrl:
      "https://images.unsplash.com/photo-1543333108-4f3e0f5a7d11?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Husky Siberiano blanco y gris",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1573920953827-2ccafab952d3?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Husky Siberiano de trineo con nieve en el pelaje" },
      { url: "https://images.unsplash.com/photo-1624371066606-4863e333ad84?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Husky Siberiano de ojos azules jadeando de frente" },
    ],
    introduccion: [
      "Desarrollado por el pueblo chukchi en el noreste de Siberia para tirar de trineos en algunas de las condiciones más extremas del planeta, el Husky Siberiano combina resistencia física excepcional con un carácter sorprendentemente sociable — a diferencia de otras razas de trabajo, nunca se seleccionó para ser guardián, así que suele ser amigable incluso con extraños.",
      "Su instinto de manada es tan fuerte que necesita compañía casi constante, y su vena independiente —heredada de generaciones tirando en equipo, no obedeciendo órdenes individuales— hace que el adiestramiento requiera paciencia y experiencia. Es también uno de los perros más «habladores»: en vez de ladrar, tiende a aullar y emitir sonidos muy expresivos.",
    ],
    tamano: "mediano",
    temperamento: "Sociable, independiente y con fuerte instinto de manada; muy vocal.",
    energia: "alto",
    pelaje: "Doble capa densa con muda estacional intensa; cepillado frecuente en esas épocas.",
    aptoPrimerizos: "requiere experiencia",
    esperanzaVida: "12-14 años",
    notasSalud: "Propenso a problemas oculares hereditarios (cataratas, atrofia progresiva de retina) y a displasia de cadera.",
  },
  {
    slug: "dalmata",
    nombre: "Dálmata",
    fotoUrl:
      "https://images.unsplash.com/photo-1625481623107-c382a9760172?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Dálmata blanco y negro sobre hierba verde",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1582043725042-f3d1873eeadf?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Cachorro de Dálmata sentado en un salón" },
      { url: "https://images.unsplash.com/photo-1562771968-a70d17a93823?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Dálmata de pie junto a una puerta, mirando hacia fuera" },
    ],
    introduccion: [
      "Su origen exacto sigue siendo objeto de debate entre los expertos, pero el nombre apunta a Dalmacia, la región de la actual Croacia. Históricamente se le conoce como «perro de carruaje»: corría junto a los caballos para protegerlos y despejar el camino, un trabajo que aprovechaba su resistencia y su buena relación instintiva con los equinos.",
      "Nace completamente blanco —las manchas aparecen a partir de la segunda semana de vida— y necesita mucho ejercicio diario para canalizar la energía que heredó de su etapa como perro de carruaje. Su popularidad se disparó tras la película de Disney, lo que generó (y sigue generando) adopciones impulsivas de gente que no está preparada para su nivel de actividad.",
    ],
    tamano: "grande",
    temperamento: "Enérgico, leal y muy activo; necesita mucho ejercicio diario.",
    energia: "alto",
    pelaje: "Pelo corto, pero con muda notable durante todo el año; cepillado frecuente.",
    aptoPrimerizos: "requiere experiencia",
    esperanzaVida: "11-13 años",
    notasSalud: "Predisposición a la sordera congénita y a cálculos urinarios (ácido úrico).",
  },
  {
    slug: "galgo",
    nombre: "Galgo Español",
    fotoUrl:
      "https://images.unsplash.com/photo-1549355517-0a46fac40ff1?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Galgo Español color canela tumbado, mirando a cámara",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1775134735189-7ec7bf62baea?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Galgo atigrado corriendo a toda velocidad por una playa" },
      { url: "https://images.unsplash.com/photo-1470208564179-dd5b52a0d010?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Dos galgos jugando y corriendo juntos en una playa" },
    ],
    introduccion: [
      "Pariente cercano del Galgo Inglés, pero con siglos de selección propia en la península ibérica para la caza de la liebre a la carrera, el Galgo Español es uno de los perros más rápidos que existen — alcanza velocidades cercanas a los 60 km/h en pocos segundos. Lamentablemente, también es una de las razas con más abandono al final de cada temporada de caza, una realidad que organizaciones de rescate llevan décadas intentando revertir.",
      "Fuera de esos breves sprints, es un perro sorprendentemente tranquilo y hogareño — muchos galgueros lo describen como «40 km/h tumbado en el sofá». Necesita paseos regulares y algún momento de carrera libre en un espacio seguro, pero no exige el nivel de actividad constante que su físico atlético podría hacer pensar.",
    ],
    tamano: "grande",
    temperamento: "Tranquilo, afectuoso y muy sociable; en casa es silencioso y calmado pese a su gran capacidad atlética.",
    energia: "medio",
    pelaje: "Pelo muy corto y fino, cuidado mínimo, pero piel sensible al frío — puede necesitar abrigo en invierno.",
    aptoPrimerizos: "según el caso",
    esperanzaVida: "12-15 años",
    notasSalud: "Piel muy fina y propensa a heridas; sensibilidad a la anestesia, común en razas galgo; riesgo de torsión gástrica y predisposición a tumores óseos.",
  },
  {
    slug: "salchicha",
    nombre: "Salchicha (Teckel)",
    fotoUrl:
      "https://images.unsplash.com/photo-1754295559712-8e22e420957f?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Salchicha (Teckel) de pelo corto color canela, de pie mirando a cámara",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1755894647627-72444667c17b?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Salchicha negra y fuego saltando con las patas en alto sobre fondo amarillo" },
      { url: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Salchicha negra y fuego asomada a una caja de cartón" },
    ],
    introduccion: [
      "Criado en Alemania para cazar tejones —de ahí su nombre, «Dachshund», literalmente «perro tejón»—, su cuerpo alargado y sus patas cortas no son un capricho estético: le permitían perseguir a la presa dentro de sus propias madrigueras subterráneas.",
      "Existe en tres tamaños (estándar, miniatura y kaninchen) y tres tipos de pelaje (corto, duro y largo), lo que lo convierte en una de las razas con más variedad reconocida por los estándares caninos. Pese a su tamaño, conserva un instinto cazador y una tozudez que sorprenden a quien espera solo un perro de compañía.",
    ],
    tamano: "pequeño",
    temperamento: "Valiente, juguetón y con mucho carácter; independiente y algo testarudo, pero muy leal a su familia — criado originalmente para cazar tejones.",
    energia: "medio",
    pelaje: "Pelo corto, duro o largo según la variedad; cuidado mínimo salvo en la variedad de pelo largo, que necesita cepillado más frecuente.",
    aptoPrimerizos: "según el caso",
    esperanzaVida: "12-16 años",
    notasSalud: "Muy propenso a la enfermedad del disco intervertebral por su columna alargada — evitar saltos desde alturas y el sobrepeso, que agrava el riesgo.",
  },
  {
    slug: "pitbull",
    nombre: "Pitbull (American Pit Bull Terrier)",
    fotoUrl:
      "https://images.unsplash.com/photo-1574749205529-9fbef2333941?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy",
    fotoAlt: "Pitbull gris y blanco sentado en un sofá, mirando a cámara",
    otrasFotos: [
      { url: "https://images.unsplash.com/photo-1620001796685-adf7110fe1a7?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Cachorro de Pitbull gris con arnés" },
      { url: "https://images.unsplash.com/photo-1576604062155-4aaf7b81fabd?auto=format&fit=crop&w=1200&h=800&q=80&crop=entropy", alt: "Pitbull atigrado marrón mirando por una ventana" },
    ],
    introduccion: [
      "El término «pitbull» no designa una única raza, sino un tipo que agrupa a varias razas emparentadas (el American Pit Bull Terrier es la más reconocida) descendientes de cruces entre bulldogs y terriers en la Inglaterra del siglo XIX, originalmente criados para el combate de perros contra toros y, más tarde, entre ellos — una práctica ya prohibida e ilegal en la inmensa mayoría de países.",
      "Décadas de campañas mediáticas centradas en casos aislados de agresión construyeron una reputación que la evidencia científica no respalda como rasgo inherente de la raza: los estudios de temperamento sitúan al Pit Bull entre las razas con mejor puntuación en pruebas de estabilidad de carácter. Eso no exime de responsabilidad a quien lo tiene: su fuerza física real exige una socialización y un adiestramiento consistentes desde cachorro, y conocer bien la normativa local antes de adoptarlo.",
    ],
    tamano: "mediano",
    temperamento: "Cariñoso, juguetón y muy apegado a su familia; el temperamento depende sobre todo de la crianza y la socialización, no hay base científica sólida para la «agresividad» como rasgo de raza. En España está clasificado como raza potencialmente peligrosa (PPP): licencia administrativa, seguro de responsabilidad civil, microchip y bozal en espacios públicos son obligatorios.",
    energia: "alto",
    pelaje: "Pelo corto, denso y liso; cuidado mínimo, con muda moderada estacional.",
    aptoPrimerizos: "requiere experiencia",
    esperanzaVida: "12-14 años",
    notasSalud: "Predisposición a displasia de cadera y codo, luxación de rótula e hipotiroidismo.",
  },
];
