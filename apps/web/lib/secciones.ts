export type Seccion = {
  label: string;
  href: string;
  descripcion: string;
  resumen: string;
  icono: string;
};

export const secciones: Seccion[] = [
  {
    label: "Primeros pasos",
    href: "/primeros-pasos",
    descripcion: "Todo lo esencial para arrancar con tu cachorro o tu nueva mascota.",
    resumen: "Las primeras 48 horas",
    icono: "🐾",
  },
  {
    label: "Salud",
    href: "/salud",
    descripcion: "Vacunas, alimentación y cuidados básicos para que tu perro esté sano.",
    resumen: "Vacunas y chequeos",
    icono: "💉",
  },
  {
    label: "Seguridad",
    href: "/seguridad",
    descripcion: "Consejos para proteger a tu perro en casa, en la calle y de viaje.",
    resumen: "Prevención diaria",
    icono: "🛡️",
  },
  {
    label: "Adiestramiento",
    href: "/adiestramiento",
    descripcion: "Pautas claras para enseñar comandos y buenos hábitos.",
    resumen: "Comandos y rutinas",
    icono: "🎓",
  },
  {
    label: "Tiempo de juego",
    href: "/tiempo-de-juego",
    descripcion: "Ideas de juegos y actividades para el bienestar físico y mental.",
    resumen: "Juego y bienestar",
    icono: "🎾",
  },
  {
    label: "Razas",
    href: "/razas",
    descripcion: "Características y necesidades según la raza de tu perro.",
    resumen: "Por temperamento",
    icono: "🐩",
  },
];
