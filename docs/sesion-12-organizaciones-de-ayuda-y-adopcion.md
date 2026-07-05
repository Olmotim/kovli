# Sesión 12 — Feature 006: organizaciones de ayuda y/o adopción

**Fecha:** 2026-07-05
**Estado al terminar:** Feature 006 completa: directorio de organizaciones de ayuda/adopción en la home, con pestañas por país (España/Argentina), validado por el usuario en el navegador y movido a "Hecho" en `constitution/roadmap.md`. Sin feature en curso.

---

## Qué se hizo en esta sesión (resumen completo)

1. El usuario replanteó el nombre del apartado que estaba en el backlog como "005 · Apartado de ONGs": no son solo ONGs, sino **organizaciones de ayuda y/o adopción** en general (protectoras, rescates, plataformas municipales...). Se creó la feature como **006** (la 005, buscador/filtros en `/razas`, se hizo primero en esta misma sesión previa y ya ocupaba ese número).
2. Antes de escribir la spec, se resolvieron con el usuario tres decisiones de producto:
   - **Alcance geográfico**: Kovli es para todo el público hispanohablante, pero curar una lista real por país para todos los países de golpe no es viable — se empieza con **España y Argentina**, con el país modelado como unión de literales para ampliar sin rediseñar.
   - **Contenido por organización**: nombre + descripción breve + enlace (no una ficha completa con fotos/logos, para no depender de derechos de imagen de terceros).
   - **Ubicación**: sección nueva directamente en la home (no una página propia como `/razas`).
3. Con la spec y el plan ya aprobados (Server Component, sin filtro, tarjetas en rejilla), el usuario compartió dos capturas de referencia: una maqueta de **directorio** (pestañas "Todos/España/Argentina", filas con insignia de iniciales, ciudad + categoría, botón "Ver más") y una idea a futuro de **mapa interactivo sincronizado con la lista** (Leaflet/Mapbox), preguntando qué tan complicado sería esto último.
   - Sobre el mapa: se explicó el coste real (dependencia nueva, geocodificar cada ciudad una vez, cargar el mapa con `dynamic(..., { ssr: false })` porque Leaflet necesita `window`, y sincronizar marcador↔fila seleccionada) — factible pero un salto de complejidad, se deja anotado en el backlog como v2 en vez de abordarlo ya.
   - Sobre el directorio: implicaba dos cambios sobre lo ya aprobado, así que se confirmaron explícitamente antes de tocar el plan: **sí incluir las pestañas de filtro** (esto cambia el componente de Server a Client Component, con estado `paisActivo`) y **"Ver más" enlaza directo a la web externa** (no despliega más texto).
   - `spec.md` y `plan.md` se reescribieron con estos cambios: filas (no tarjetas en rejilla), campo `ciudad` y `categoria` nuevos en el modelo de datos, pestañas calculadas a partir de los países presentes en los datos (no hardcodeadas).
4. **Investigación de organizaciones reales**: con WebSearch/WebFetch se buscaron y verificaron 4 organizaciones por país (nombre, ciudad, a qué se dedican, enlace oficial), comprobando cada enlace con `curl` (200 en los 8). Se descartaron nombres de la maqueta que no correspondían a una entidad real verificable (p. ej. "El Hogar de Pipa" en Madrid, o "Huellitas Perrunas" que resultó ser mexicana, no argentina). Lista final propuesta y aprobada por el usuario:
   - España: Fundación Affinity (Barcelona), SOS Galgos (Santa Coloma de Cervelló), Scooby (Medina del Campo), Asociación Alba (Madrid).
   - Argentina: El Campito Refugio (Monte Grande), Fundación Viva la Vida (Hurlingham), Corazón de Zona Sur (Berazategui), Huellitas Perdidas (Sampacho, Córdoba).
5. **Implementación**:
   - `apps/web/data/organizaciones.ts`: `type Pais`, `type Organizacion` (`nombre`, `ciudad`, `categoria`, `enlace`, `pais`) y el array con las 8 organizaciones.
   - `apps/web/components/home/Organizaciones.tsx` (nuevo, Client Component): función pura `iniciales(nombre)`; estado `paisActivo` (`Pais | "todos"`); pestañas calculadas con `[...new Set(organizaciones.map(o => o.pais))]`; lista agrupada por país con "Todos", o filtrada a un solo país; cada fila con insignia, nombre, "Ciudad · Categoría" y botón "Ver más" (`target="_blank" rel="noopener noreferrer"`, `aria-label` describiendo que abre pestaña nueva).
   - `apps/web/app/page.tsx`: añade `<Organizaciones />` tras `<Secciones />`.
6. **Verificación** con Playwright headless: pestaña "Todos" (agrupado), "España", "Argentina", clic en "Ver más" confirmando que la pestaña nueva abre la URL oficial correcta, y viewport móvil (375px) — se ve algo compacta la fila en móvil pero legible y sin roturas. `pnpm build`/`pnpm lint` sin problemas nuevos.
7. **Cierre**: el usuario confirmó en su navegador. `spec.md`/`tasks.md` completos, feature movida a "Hecho" en `roadmap.md`, `tech-stack.md` documenta el patrón de `Organizaciones.tsx`, y el mapa interactivo queda anotado en el backlog como idea v2.

---

## Conceptos estudiados

### Pestañas de filtro calculadas a partir de los datos, no hardcodeadas

`[...new Set(organizaciones.map(o => o.pais))]` recorre el array de organizaciones, se queda solo con el campo `pais` de cada una, y `Set` elimina duplicados — el resultado es la lista de países que existen en los datos, sin repetir. Si mañana se añade un país nuevo al array (por ejemplo México), la pestaña aparece sola, porque el componente nunca escribió "España"/"Argentina" a mano en ningún sitio.

### Cuándo un componente necesita ser Client Component

La primera versión de `Organizaciones.tsx` iba a ser Server Component porque no había interactividad prevista (solo mostrar datos). Al confirmar las pestañas de filtro, pasó a necesitar `"use client"`: cualquier componente que necesite `useState` (algo que cambia mientras la persona interactúa, sin recargar la página) tiene que ejecutarse en el navegador, no en el servidor. Mismo caso que `BreedsExplorer` en la sesión anterior.

### Verificar contenido real antes de usarlo, no solo lo que "suena bien"

Varias organizaciones que aparecían en búsquedas por nombre resultaron no ser lo que parecían a primera vista (una fundación con nombre parecido pero de otro país, un nombre de protectora sin sitio web real localizable). Antes de dar una organización por buena para el archivo de datos, se verificó con una segunda búsqueda o fetch que la ciudad/actividad declarada coincidía y que el enlace respondía (`curl` 200), igual que se hizo con las fotos de razas en la feature 004.

---

## Decisiones tomadas en esta sesión

- El apartado se llama **"organizaciones de ayuda y/o adopción"**, no "ONGs" — más amplio, incluye protectoras, rescates y sitios municipales de adopción.
- Numeración: el buscador/filtros de razas se quedó con el **005** (se abordó primero); este apartado pasa a ser el **006**.
- Alcance geográfico: **España y Argentina** para empezar, con `pais` como unión de literales ampliable.
- Contenido por organización: nombre + ciudad + categoría corta + enlace — sin fotos ni logos.
- Se incluyen **pestañas de filtro por país** (cambia el componente a Client Component) — decisión tomada al ver la maqueta, revirtiendo lo que la spec inicial había dejado fuera de alcance.
- "Ver más" enlaza directo a la web externa, sin desplegar contenido adicional dentro de la tarjeta.
- El **mapa interactivo (Leaflet/Mapbox)** que el usuario propuso como visión a futuro queda fuera de esta feature, anotado como idea v2 en el backlog.
- Ubicación: sección nueva en la home, debajo de "Secciones" — no una página propia.

---

## Estado al cerrar la sesión

- [x] Directorio de organizaciones en la home, con pestañas "Todos/España/Argentina" y agrupación por país.
- [x] 8 organizaciones reales y verificadas (4 por país) en `apps/web/data/organizaciones.ts`.
- [x] Verificado con Playwright (pestañas, agrupación, enlace externo correcto, móvil) y `pnpm build`/`pnpm lint` sin problemas nuevos.
- [x] Feature 006 marcada "Hecho" en el roadmap; `spec.md`/`plan.md`/`tasks.md` al día.
- [x] `tech-stack.md` documenta el patrón de `Organizaciones.tsx`.
- [x] Mapa interactivo anotado como idea v2 en el backlog, con los pasos que llevaría si se aborda.

## Próximos pasos (inicio de siguiente sesión)

1. Sin feature en curso ni idea concreta en el backlog más allá del mapa interactivo (v2 de la 006) — decidir con el usuario por dónde seguir.
