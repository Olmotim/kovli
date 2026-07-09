# Tasks · 007 · Mapa interactivo del directorio de organizaciones

- [x] Instalar `leaflet`, `react-leaflet` y `@types/leaflet` (dev).
- [x] Geocodificar la ciudad de cada una de las 8 organizaciones (Nominatim), verificar que cada coordenada cae dentro de la ciudad correcta, y añadir `lat`/`lng` a `apps/web/data/organizaciones.ts`.
- [x] Crear `apps/web/components/home/OrganizacionesMapa.tsx`: `MapContainer` + `TileLayer` (OpenStreetMap) + un `Marker` por organización, icono propio (evitar el problema conocido del icono por defecto de Leaflet con bundlers), popup con nombre + ciudad, `import "leaflet/dist/leaflet.css"`.
- [x] Ampliar `apps/web/components/home/Organizaciones.tsx`: estado `seleccionada`, layout de dos columnas en escritorio / una en móvil (mapa primero), integrar `OrganizacionesMapa` vía `next/dynamic({ ssr: false })`, resaltado de fila activa.
- [x] Sincronización: clic en fila → centra/abre popup del marcador; clic en marcador → resalta la fila.
- [x] El mapa respeta la pestaña de país activa (mismo filtro que ya aplica a la lista).
- [x] `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] Verificar en el navegador (Playwright): escritorio (split view + sincronización en ambos sentidos) y móvil (apilado, mapa arriba).
- [x] Confirmación del usuario en su propio navegador.
- [x] Mover la feature a "Hecho" en `spec/constitution/roadmap.md` y actualizar `tech-stack.md` con el patrón nuevo.
