# Sesión 14 — Feature 007: mapa interactivo del directorio de organizaciones

**Fecha:** 2026-07-09
**Estado al terminar:** Feature 007 completa: vista de mapa (Leaflet + OpenStreetMap) sincronizada con el directorio de organizaciones de la feature 006, validada por el usuario en el navegador y movida a "Hecho" en `constitution/roadmap.md`. Sin feature en curso ni ideas concretas en el backlog.

---

## Qué se hizo en esta sesión (resumen completo)

1. Antes de escribir la spec, se resolvieron con el usuario las dos decisiones de producto que el plan de la 006 había dejado esbozadas pero sin cerrar: **librería de mapa** (Leaflet + OpenStreetMap, sin API key ni coste, en vez de Mapbox) y **layout** (lista y mapa lado a lado en escritorio, apilados — mapa arriba — en móvil, en vez de pestañas "Lista/Mapa" que alternan).
2. `spec.md` y `plan.md` escritos y aprobados antes de tocar código, siguiendo el flujo spec → plan → tasks → código del proyecto. El plan documentó de antemano el problema conocido del icono por defecto de Leaflet con bundlers, para resolverlo desde el principio en vez de parchearlo después.
3. Dependencias nuevas instaladas (avisadas y aprobadas antes de instalar): `leaflet`, `react-leaflet@5` (la primera versión con soporte para React 19, que es lo que ya usa el proyecto) y `@types/leaflet` (dev, porque Leaflet no trae tipos propios a diferencia de `react-leaflet`).
4. **Coordenadas**: las 8 organizaciones ya existentes en `organizaciones.ts` no tenían lat/lng. Se geocodificó la ciudad de cada una con Nominatim (el geocodificador gratuito de OpenStreetMap, respetando su límite de 1 petición/segundo y con un `User-Agent` identificativo), verificando que el `display_name` devuelto correspondía a la ciudad/provincia correcta antes de guardar la coordenada — mismo criterio de verificación que ya se aplicó a los enlaces en la 006.
5. **`OrganizacionesMapa.tsx`** (nuevo, Client Component): `MapContainer` + `TileLayer` de OpenStreetMap + un `Marker` por organización con popup (nombre + ciudad). Icono de marcador propio, un SVG en línea vía `L.divIcon` en los colores de marca (apricot/chocolate), para evitar de raíz el problema conocido de las imágenes del icono por defecto de Leaflet rompiéndose con el empaquetador de Next.js.
6. **`Organizaciones.tsx` ampliado**: nuevo estado `seleccionada` (nombre de la organización activa, compartido entre lista y mapa), layout `grid grid-cols-2` en escritorio (con el mapa `sticky` para que no se pierda de vista al hacer scroll de una lista larga) y una columna en móvil con el mapa primero (usando `order` de Tailwind, no duplicando JSX). `OrganizacionesMapa` se integra vía `next/dynamic({ ssr: false })`, porque Leaflet necesita `window`/DOM y no funciona en el render de servidor.
7. **Dos bugs reales encontrados y corregidos durante la verificación con Playwright** (ver "Conceptos estudiados" para el detalle técnico):
   - Con la pestaña "Todos", el mapa se centraba en el punto medio entre España y Argentina — en mitad del océano Atlántico. Corregido usando `fitBounds` en vez de un centro/zoom fijos.
   - El `ref` de `MapContainer` no se rellenaba a tiempo para el primer efecto que llamaba a `fitBounds`, así que ese ajuste nunca llegaba a aplicarse de verdad (el bug anterior lo tapaba, porque el resultado visual — mapa mal encuadrado — parecía la misma clase de fallo). Corregido con el patrón oficial de `react-leaflet`: `useState` en vez de `useRef` para guardar la instancia del mapa.
8. **Verificación con Playwright** (no había herramienta de navegador tipo `chromium-cli` instalada; se instaló Playwright de forma aislada en el directorio de scratchpad, sin tocar las dependencias del proyecto): escritorio (split view, clic fila→marcador y marcador→fila en ambos sentidos, cambio de pestaña de país re-encuadrando el mapa) y móvil (apilado, mapa arriba, los 8 marcadores presentes aunque algunos se solapan visualmente al estar muy próximos en ese zoom). Sin errores de consola en ningún caso. `pnpm build`/`pnpm lint` sin problemas nuevos (los 4 errores/3 warnings de lint que aparecen son preexistentes, sin relación con esta feature).
9. **Cierre**: el usuario confirmó en su propio navegador. `spec.md`/`tasks.md` completos, feature movida a "Hecho" en `roadmap.md`, `tech-stack.md` documenta el patrón de `OrganizacionesMapa.tsx` y la nueva entrada de "Mapas" en tecnologías. El backlog queda vacío — no hay más ideas anotadas.

---

## Conceptos estudiados

### `fitBounds` en vez de centro/zoom fijos cuando los puntos están muy dispersos

Un mapa necesita un centro y un nivel de zoom para renderizarse. Si los datos a mostrar pueden estar en cualquier punto del planeta (España y Argentina, en este caso), calcular el centro como el promedio de todas las coordenadas no funciona: el promedio entre un punto en el hemisferio norte y otro en el sur puede caer en un sitio sin relación con ninguno de los dos (aquí, en mitad del Atlántico). `fitBounds(bounds)` resuelve esto al revés: en vez de fijar centro y zoom, se le da el conjunto de puntos que tienen que ser visibles, y Leaflet calcula el centro y el zoom que hacen que quepan todos dentro del contenedor. Es el enfoque correcto siempre que el conjunto de puntos a mostrar pueda cambiar (aquí, según la pestaña de país activa).

### Los refs de componentes de librerías externas no siempre se comportan como un ref de DOM

React garantiza que un `ref` a un elemento del DOM (`<div ref={miRef}>`) está relleno antes de que se ejecute cualquier efecto (`useEffect`). Pero `MapContainer` de `react-leaflet` no es un elemento del DOM: es un componente que por dentro crea la instancia de Leaflet de forma algo diferida respecto al ciclo de vida normal de React. El resultado práctico: un efecto que lee `miRef.current` justo al montar puede encontrarlo `null`, y como los refs no son reactivos (cambiar `.current` no dispara ningún re-render ni relanza efectos), ese efecto nunca se vuelve a ejecutar por sí solo aunque el ref se rellene más tarde. La solución (documentada por la propia librería): usar `useState` en vez de `useRef` como ref (`ref={setMap}`) — al ser estado, cuando react-leaflet lo rellena de verdad, provoca un re-render, y cualquier efecto que dependa de ese estado (`useEffect(() => {...}, [map])`) se vuelve a ejecutar automáticamente con el valor correcto. Lección general: un `useRef` sirve para *leer* un valor imperativo cuando ya se sabe que está listo, pero no sirve para *saber cuándo* está listo — para eso hace falta algo reactivo.

### Verificar con una herramienta de navegador antes de dar una feature por buena

Ninguno de los dos bugs de esta sesión se habría detectado solo con `pnpm build`/`pnpm lint` — ambos son de comportamiento en tiempo de ejecución (un mapa mal encuadrado sigue siendo TypeScript válido). Al no haber ninguna herramienta de navegador ya integrada en el entorno, se instaló Playwright de forma aislada (en el directorio de scratchpad, con su propio `package.json`, sin tocar `apps/web/package.json`) para poder navegar la página real, hacer clic, cambiar de pestaña y capturar pantallas — el mismo principio que en sesiones anteriores con Playwright, pero esta vez sin tenerlo ya disponible de entrada.

---

## Decisiones tomadas en esta sesión

- **Leaflet + OpenStreetMap**, no Mapbox — sin API key ni coste, ya apuntado como plan por defecto en la 006.
- **Layout split view** en escritorio (lista y mapa lado a lado, mapa `sticky`); **apilado** en móvil (mapa arriba, lista debajo) — no pestañas "Lista/Mapa" que alternan.
- Coordenadas a **nivel de ciudad**, no de dirección exacta — geocodificadas una vez y guardadas como dato estático, no en tiempo real.
- El backlog de la constitución queda sin ideas concretas anotadas tras cerrar esta feature — la siguiente sesión empieza preguntando por dónde seguir.

---

## Estado al cerrar la sesión

- [x] `OrganizacionesMapa.tsx` (mapa Leaflet, icono propio, popups) integrado en `Organizaciones.tsx` (split view escritorio / apilado móvil, estado `seleccionada` compartido).
- [x] Coordenadas de las 8 organizaciones geocodificadas y verificadas, en `apps/web/data/organizaciones.ts`.
- [x] Dos bugs reales de encuadre del mapa encontrados y corregidos (`fitBounds`, patrón `useState` para el ref del mapa).
- [x] Verificado con Playwright (escritorio y móvil, sincronización en ambos sentidos, filtro por país) y `pnpm build`/`pnpm lint` sin problemas nuevos.
- [x] Feature 007 marcada "Hecho" en el roadmap; `spec.md`/`plan.md`/`tasks.md` al día.
- [x] `tech-stack.md` documenta el patrón de `OrganizacionesMapa.tsx` y añade "Mapas" a la lista de tecnologías.
- [ ] Commit y push (siguiente paso inmediato tras este documento).

## Próximos pasos (inicio de siguiente sesión)

1. Backlog vacío — sin feature en curso ni idea concreta anotada. Preguntar al usuario por dónde seguir.
