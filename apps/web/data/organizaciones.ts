export type Pais = "España" | "Argentina";

export type Organizacion = {
  nombre: string;
  ciudad: string;
  categoria: string;
  enlace: string;
  pais: Pais;
};

export const organizaciones: Organizacion[] = [
  {
    nombre: "Fundación Affinity",
    ciudad: "Barcelona",
    categoria: "Estudios y campañas contra el abandono",
    enlace: "https://www.fundacion-affinity.org/es/abandono-y-adopcion-perros-gatos",
    pais: "España",
  },
  {
    nombre: "SOS Galgos",
    ciudad: "Santa Coloma de Cervelló",
    categoria: "Rescate y adopción de galgos",
    enlace: "https://www.sosgalgos.org/",
    pais: "España",
  },
  {
    nombre: "Scooby",
    ciudad: "Medina del Campo",
    categoria: "Protectora y santuario",
    enlace: "https://scoobymedina.com/",
    pais: "España",
  },
  {
    nombre: "Asociación Alba",
    ciudad: "Madrid",
    categoria: "Rescate y adopción de perros y gatos",
    enlace: "https://albaonline.org/",
    pais: "España",
  },
  {
    nombre: "El Campito Refugio",
    ciudad: "Monte Grande",
    categoria: "Refugio y adopción responsable",
    enlace: "https://elcampitorefugio.org/",
    pais: "Argentina",
  },
  {
    nombre: "Fundación Viva la Vida",
    ciudad: "Hurlingham",
    categoria: "Rescate y adopción de perros de la calle",
    enlace: "https://www.fundacionvivalavida.com.ar/",
    pais: "Argentina",
  },
  {
    nombre: "Corazón de Zona Sur",
    ciudad: "Berazategui",
    categoria: "Adopción municipal de animales",
    enlace: "https://corazondezonasur.com.ar/",
    pais: "Argentina",
  },
  {
    nombre: "Huellitas Perdidas",
    ciudad: "Sampacho",
    categoria: "Hogar de tránsito con quirófano móvil",
    enlace: "https://www.huellitasperdidas.com/",
    pais: "Argentina",
  },
];
