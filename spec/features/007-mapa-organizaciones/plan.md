# Plan · 007 · Mapa interactivo del directorio de organizaciones

## Dependencias nuevas (aprobadas por el usuario)

- **`leaflet`** (`^1.9.4`) — la librería de mapas en sí (tiles, marcadores, interacción).
- **`react-leaflet`** (`^5.0.0`) — wrapper de componentes React sobre Leaflet. La v5 es la primera con soporte para React 19 (peer deps `react: ^19.0.0`), que es la versión que ya usa el proyecto — no vale una versión anterior.
- **`@types/leaflet`** (dev) — Leaflet no trae sus propios tipos TypeScript (a diferencia de `react-leaflet`, que sí); hace falta para tipar sin `any` cualquier uso directo de la API de Leaflet (por ejemplo, al definir un icono de marcador personalizado).

Mapa con **OpenStreetMap** como proveedor de teselas (`tile.openstreetmap.org`), no Mapbox: sin API key, sin cuenta, sin coste. Su política de uso exige mostrar la atribución "© OpenStreetMap contributors" visible en el mapa — `react-leaflet` lo hace por defecto a través del `attribution` del `TileLayer`, no hay que montarlo a mano.

## Datos

`apps/web/data/organizaciones.ts`: se añade la coordenada de cada organización.

```ts
export interface Organizacion {
  nombre: string;
  ciudad: string;
  categoria: string;
  enlace: string;
  pais: Pais;
  lat: number;
  lng: number;
}
```

Coordenadas a **nivel de ciudad** (no dirección exacta — fuera de alcance según `spec.md`), geocodificadas una vez con el geocodificador de OpenStreetMap (Nominatim) y guardadas como dato estático, igual que el resto de campos — no se geocodifica en tiempo real ni hay llamada a ningún servicio desde el navegador. Mismo criterio que con los enlaces en la feature 006: se verifica cada coordenada (que caiga dentro de la ciudad correcta) antes de darla por buena.

## Componentes

### `apps/web/components/home/OrganizacionesMapa.tsx` (nuevo, Client Component)

- Recibe por props la lista ya filtrada de organizaciones (las que correspondan a la pestaña de país activa — el filtrado sigue viviendo en `Organizaciones.tsx`, este componente solo pinta lo que le llega) y el estado compartido de selección (`seleccionada: string | null` — nombre de la organización activa — y `onSeleccionar`).
- Un `<MapContainer>` de `react-leaflet` con un `<TileLayer>` de OpenStreetMap y un `<Marker>` por organización (posición `[lat, lng]`).
- Icono de marcador personalizado: el icono por defecto de Leaflet referencia imágenes (`marker-icon.png`) por una ruta relativa que se rompe con bundlers como el de Next.js si no se configura a mano — problema conocido de Leaflet + React. Se define un icono propio con `L.icon` apuntando a un PNG en `public/` (o un `L.divIcon` con un SVG simple en el color `apricot`/`chocolate` de la marca), evitando el problema de raíz en vez de parchear la ruta rota.
- Cada `Marker` abre su popup (nombre + ciudad) al hacer clic, y llama a `onSeleccionar(nombre)`. Cuando `seleccionada` coincide con su nombre (llega como prop desde el clic en la fila de la lista), el mapa hace `flyTo`/centra esa posición y abre su popup mediante una `ref` al marcador.
- Se carga con `next/dynamic` y `{ ssr: false }` desde `Organizaciones.tsx`: Leaflet necesita `window`/`document` para inicializar el mapa, y falla si se intenta renderizar en el servidor.
- Importa `leaflet/dist/leaflet.css` (el CSS base de Leaflet, imprescindible para que las teselas y controles se posicionen bien) directamente en el archivo — Next.js permite importar CSS de `node_modules` en un Client Component.

### `apps/web/components/home/Organizaciones.tsx` (existente, se amplía)

- Pasa a tener un segundo estado, `seleccionada: string | null` (nombre de la organización activa en lista+mapa), además del ya existente `paisActivo`.
- Layout: en vez de una sola columna, un contenedor con `grid` de dos columnas en escritorio (`lg:grid-cols-2`, lista a la izquierda y `<OrganizacionesMapa>` a la derecha, ambos con la misma altura) y una columna en móvil (`grid-cols-1`) con el mapa primero y la lista debajo (el orden en el DOM ya resuelve esto sin CSS adicional: mapa antes que lista en el JSX).
- Cada fila de la lista, al hacer clic (o al pulsar "Ver más" no — ese sigue siendo el enlace externo, se necesita un punto de clic distinto, probablemente la fila en sí salvo el botón), llama a `setSeleccionada(nombre)`; se resalta visualmente con un cambio de fondo o borde mientras esté activa.

## Sincronización lista ↔ mapa

Un único estado (`seleccionada`) vive en `Organizaciones.tsx` y baja por props a los dos hijos — ni la lista ni el mapa se comunican entre sí directamente. Mismo patrón ya usado en el proyecto (estado en el padre, hijos controlados), sin librerías de estado global.

## Impacto en archivos existentes

- `apps/web/data/organizaciones.ts`: añade `lat`/`lng` a las 8 organizaciones ya existentes — no añade organizaciones nuevas.
- `apps/web/components/home/Organizaciones.tsx`: nuevo estado `seleccionada`, layout de dos columnas, integra `OrganizacionesMapa` vía `next/dynamic`.
- `apps/web/package.json`: añade `leaflet`, `react-leaflet` y `@types/leaflet` (dev).
- Nada más cambia: no toca `Hero.tsx`, `Secciones.tsx` ni las rutas de `/razas`.

## Verificación prevista

- `pnpm build` / `pnpm lint` sin errores nuevos.
- En el navegador: escritorio (split view, clic fila→marcador y marcador→fila) y móvil (apilado, mapa arriba), con las tres pestañas de país (el mapa filtra igual que la lista).
