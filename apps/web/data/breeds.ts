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
};

export const breeds: Breed[] = [
  {
    slug: "labrador-retriever",
    nombre: "Labrador Retriever",
    fotoUrl:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Labrador Retriever color chocolate sentado en el suelo",
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
      "https://images.unsplash.com/photo-1760791510936-eef13da5018b?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Golden Retriever mirando a cámara al aire libre",
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
      "https://images.unsplash.com/photo-1539191394261-c17ec4a3e451?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Caniche estándar color fawn de pie",
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
      "https://images.unsplash.com/photo-1589402730616-93657a1844f7?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Chihuahua marrón con collar azul",
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
      "https://images.unsplash.com/photo-1613059217223-c48fd81dc623?auto=format&fit=crop&w=1200&q=80",
    fotoAlt: "Cachorro de Bulldog Francés blanco y negro tumbado",
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
    tamano: "grande",
    temperamento: "Enérgico, leal y muy activo; necesita mucho ejercicio diario.",
    energia: "alto",
    pelaje: "Pelo corto, pero con muda notable durante todo el año; cepillado frecuente.",
    aptoPrimerizos: "requiere experiencia",
    esperanzaVida: "11-13 años",
    notasSalud: "Predisposición a la sordera congénita y a cálculos urinarios (ácido úrico).",
  },
];
