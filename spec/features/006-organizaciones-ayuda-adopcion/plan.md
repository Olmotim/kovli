# Plan · 006 · Organizaciones de ayuda y/o adopción

## Datos

**`apps/web/data/organizaciones.ts`** (nuevo), mismo patrón que `breeds.ts`:

```ts
export type Pais = "España" | "Argentina";

export interface Organizacion {
  nombre: string;
  ciudad: string;
  categoria: string; // ej. "Protección y adopción responsable", "Rescate y adopción de galgos"
  enlace: string;
  pais: Pais;
}

export const organizaciones: Organizacion[] = [ ... ];
```

`Pais` como unión de literales: añadir un país nuevo en el futuro es ampliar esta unión + el array; TypeScript avisa en cualquier sitio que asuma la lista cerrada actual. Las pestañas de filtro **no** hardcodean "España"/"Argentina": se calculan a partir de los países presentes en `organizaciones` (`[...new Set(organizaciones.map(o => o.pais))]`), así que un país nuevo en los datos aparece solo como pestaña, sin tocar el componente.

Las organizaciones reales (nombre, ciudad, a qué se dedican, enlace oficial) se buscan con un agente de investigación (WebSearch/WebFetch) y se verifican antes de darlas por buenas, igual que con las fotos de razas en la feature 004. La lista concreta se acuerda contigo al cerrar `tasks.md`, antes de escribir el archivo de datos.

## Componente

**`apps/web/components/home/Organizaciones.tsx`** (nuevo, **Client Component** — las pestañas de filtro son estado en el navegador, así que necesita `"use client"`, igual que `BreedsExplorer`):

- Estado: `paisActivo: Pais | "todos"` (un único valor, no multi-selección como en los filtros de razas — aquí las pestañas son excluyentes entre sí).
- Pestañas: "Todos" + una por cada país presente en los datos (calculadas, no hardcodeadas). Mismo estilo de pastilla que ya existe en el sitio, adaptado a "activa/inactiva" (similar a las pastillas de `BreedsExplorer`, pero de selección única: al pulsar una, se desmarca cualquier otra).
- Lista: si `paisActivo === "todos"`, agrupa `organizaciones` por país y renderiza un bloque por país (encabezado con el nombre + su lista, en el orden en que aparecen los países en los datos). Si hay un país concreto seleccionado, renderiza solo su lista, sin encabezado de país (ya está implícito en la pestaña activa).
- Cada fila (no tarjeta en rejilla, sino fila horizontal como en la maqueta): insignia cuadrada con las iniciales del nombre (función pura `iniciales(nombre)`: primeras letras de las dos primeras palabras, en mayúsculas), nombre en negrita, línea `Ciudad · Categoría`, y a la derecha un botón-enlace "Ver más" (`<a target="_blank" rel="noopener noreferrer">`, con `aria-label` indicando que abre en pestaña nueva).
- Estilo visual coherente con el resto: fondo `bg-crema`/`bg-beige` alterno o con borde `border-chocolate/30` para separar filas, texto `text-chocolate`, botón "Ver más" en un tono oscuro (`bg-chocolate` o `bg-cafe`) para diferenciarlo de las pastillas de filtro (que usan `apricot`).

## Integración en la home

`apps/web/app/page.tsx` pasa a renderizar `<Organizaciones />` después de `<Secciones />`:

```tsx
<Hero />
<Secciones />
<Organizaciones />
```

## Por qué Client Component (a diferencia de lo planteado antes)

La primera versión de este plan lo dejaba como Server Component porque no había interactividad prevista. Al confirmar las pestañas de filtro (estado que cambia en el navegador), pasa a necesitar `"use client"`, con el mismo razonamiento que `BreedsExplorer`: el filtrado ocurre del lado del cliente sobre datos ya cargados, sin ir al servidor.

## v2 fuera de esta feature: mapa interactivo

Si más adelante se decide añadir la vista de mapa (Leaflet + OpenStreetMap, sin API key ni coste, sobre Mapbox que sí requiere cuenta/token): haría falta (1) añadir `react-leaflet`/`leaflet` como dependencia nueva, (2) coordenadas (lat/lng) por organización — se geocodifican una vez y se guardan como dato estático, no en tiempo real, porque la lista no cambia en producción, (3) cargar el mapa con `dynamic(() => import(...), { ssr: false })` porque Leaflet necesita `window`/DOM y no funciona en el render de servidor, y (4) sincronizar qué fila está seleccionada con qué marcador se resalta (estado compartido entre lista y mapa, en el mismo Client Component). Ninguno de estos puntos es difícil por separado, pero es una feature en sí misma — se deja anotada en el backlog, no en esta.

## Sin dependencias nuevas (en esta versión)

Solo Tailwind y el patrón `data/` ya existente. Nada de mapas ni librerías de geolocalización todavía.

## Impacto en archivos existentes

- `apps/web/app/page.tsx`: añade `<Organizaciones />` tras `<Secciones />`.
- Nada más cambia: no toca `Secciones.tsx`, `Header.tsx` ni las rutas existentes.
