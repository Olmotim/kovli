export type Pais = "España" | "Argentina";

export type Organizacion = {
  nombre: string;
  ciudad: string;
  categoria: string;
  enlace: string;
  pais: Pais;
  lat: number;
  lng: number;
};

export const organizaciones: Organizacion[] = [
  {
    nombre: "Fundación Affinity",
    ciudad: "Barcelona",
    categoria: "Estudios y campañas contra el abandono",
    enlace: "https://www.fundacion-affinity.org/es/abandono-y-adopcion-perros-gatos",
    pais: "España",
    lat: 41.38258,
    lng: 2.17707,
  },
  {
    nombre: "SOS Galgos",
    ciudad: "Santa Coloma de Cervelló",
    categoria: "Rescate y adopción de galgos",
    enlace: "https://www.sosgalgos.org/",
    pais: "España",
    lat: 41.3687,
    lng: 2.01745,
  },
  {
    nombre: "Scooby",
    ciudad: "Medina del Campo",
    categoria: "Protectora y santuario",
    enlace: "https://scoobymedina.com/",
    pais: "España",
    lat: 41.30855,
    lng: -4.91503,
  },
  {
    nombre: "Asociación Alba",
    ciudad: "Madrid",
    categoria: "Rescate y adopción de perros y gatos",
    enlace: "https://albaonline.org/",
    pais: "España",
    lat: 40.41678,
    lng: -3.70351,
  },
  {
    nombre: "El Campito Refugio",
    ciudad: "Monte Grande",
    categoria: "Refugio y adopción responsable",
    enlace: "https://elcampitorefugio.org/",
    pais: "Argentina",
    lat: -34.81927,
    lng: -58.46643,
  },
  {
    nombre: "Fundación Viva la Vida",
    ciudad: "Hurlingham",
    categoria: "Rescate y adopción de perros de la calle",
    enlace: "https://www.fundacionvivalavida.com.ar/",
    pais: "Argentina",
    lat: -34.59334,
    lng: -58.63784,
  },
  {
    nombre: "Corazón de Zona Sur",
    ciudad: "Berazategui",
    categoria: "Adopción municipal de animales",
    enlace: "https://corazondezonasur.com.ar/",
    pais: "Argentina",
    lat: -34.76327,
    lng: -58.21166,
  },
  {
    nombre: "Huellitas Perdidas",
    ciudad: "Sampacho",
    categoria: "Hogar de tránsito con quirófano móvil",
    enlace: "https://www.huellitasperdidas.com/",
    pais: "Argentina",
    lat: -33.38399,
    lng: -64.7229,
  },
];
