# Sesión 10 — Feature 004: listado y ficha de razas de perros

**Fecha:** 2026-07-05
**Estado al terminar:** Feature 004 completa: listado (`/razas`) y ficha individual (`/razas/[slug]`) para las 15 razas, enlazadas desde la home y el header, validadas por el usuario en el navegador y desplegadas en producción. Movida a "Hecho" en `constitution/roadmap.md`. Sin feature "en curso"; quedan dos ideas anotadas en el backlog para concretar mañana.

---

## Qué se hizo en esta sesión (resumen completo)

1. **Repaso inicial**: `CLAUDE.md`, `README.md`, `spec/` completo y `docs/` para retomar el estado exacto antes de empezar. El usuario avisó de un cambio visual chiquito ya hecho por su cuenta en `Secciones.tsx` (alterna dos colores nuevos, `kovu` y `loli`, en el icono de pata del camino de la home) — sin relación con la feature, comiteado aparte.
2. **Iteración 1 · Listado (`/razas`)**:
   - El usuario ya había escrito `spec.md` y `plan.md` de la 004 por su cuenta antes de la sesión, dejando 3 puntos 🟡 pendientes de decidir: ubicación del archivo de datos, origen de las fotos y qué 10-15 razas concretas. Se cerraron los tres con el usuario (ubicación: `apps/web/data/breeds.ts`; fotos: banco libre Unsplash/Pexels; 15 razas propuestas y aceptadas) antes de tocar `tasks.md`.
   - `next.config.ts`: `images.remotePatterns` para `images.unsplash.com`.
   - `apps/web/data/breeds.ts`: `interface Breed` (8 campos; tamaño/energía/apto-primerizos como uniones de literales) + array con las 15 razas. Las fotos se buscaron con un agente de investigación (WebSearch/WebFetch) que devolvió URLs reales de Unsplash, verificadas después con `curl` (200, `image/jpeg`).
   - `BreedCard.tsx` y la página `/razas` (grid responsive de tarjetas).
   - Se descubrió que el usuario ya había añadido de antemano una entrada "Razas" en `apps/web/lib/secciones.ts` (con `href: ""`), anticipando la feature — solo hizo falta rellenar el `href`, sin tocar `Header.tsx` ni `Secciones.tsx`.
   - Verificado con Playwright headless (no había `chromium-cli` en este entorno) en mobile/tablet/desktop, y con el usuario en su propio navegador. Commit `1febe11`.
3. **Iteración 2 · Ficha individual (`/razas/[slug]`)**: planificada antes de tocar código (spec.md ampliado con criterios de aceptación propios, plan.md con el enfoque técnico, tasks.md desglosado). Dos decisiones del usuario: tarjeta completa como enlace (no un botón "Ver más" aparte) y añadir ya el enlace a "Primeros pasos" cuando la raza no es apta para primerizos (la spec ya mencionaba esa relación en el "por qué").
   - `BreedCard` pasó de `<article>` a `Link` (toda la tarjeta navega a la ficha).
   - `apps/web/app/razas/[slug]/page.tsx`: busca la raza por slug, `notFound()` si no existe, muestra los 8 datos completos, `generateStaticParams` (las 15 rutas se generan en build) y `generateMetadata` (título de pestaña por raza). Verificado contra la documentación de Next.js 16.2.9 con Context7 antes de escribir el código.
   - Nota condicional con enlace a `/primeros-pasos` cuando `aptoPrimerizos !== "sí"`.
   - Al probar el caso 404 se detectó que salía la página genérica de Next.js en inglés, sin la marca del sitio — el usuario pidió una propia: `apps/web/app/razas/[slug]/not-found.tsx`.
   - Verificado con Playwright (navegación desde tarjeta, nota condicional, 404, responsive) y con `pnpm build` (las 15 fichas se generan como `● SSG`). Commit `b1e8f32`.
4. **Cierre**: `spec.md`/`tasks.md` de la 004 completos, movida a "Hecho" en `roadmap.md`, `tech-stack.md` actualizado con los patrones nuevos. Todo commiteado y subido a `main` (dispara deploy en Vercel).
5. **Backlog para la próxima sesión**: el usuario adelantó dos cosas para mañana, anotadas en `roadmap.md` y en memoria pero **sin spec/plan/tasks todavía** (se concretan al empezar):
   - Buscador y filtros en `/razas` (ya estaba marcado como v2 en la spec de la 004).
   - **005 · Apartado de ONGs y organizaciones relacionadas con perros**, nuevo apartado en la home — de momento solo el tema, sin contenido ni diseño decidido.

---

## Conceptos estudiados

### `images.remotePatterns` en `next.config.ts`

`next/image` optimiza (redimensiona, convierte de formato) la imagen en el propio servidor antes de servirla. Si aceptara cualquier URL externa sin control, sería una puerta abierta a SSRF (usar el servidor como proxy para descargar contenido arbitrario) y a coste de procesado sin límite. `remotePatterns` es una lista blanca explícita de qué dominios externos son de confianza.

### `generateStaticParams` y `generateMetadata` en rutas dinámicas

Cuando una ruta dinámica (`[slug]`) trabaja sobre datos fijos en el repo (no una base de datos que cambia), `generateStaticParams` le dice a Next.js de antemano qué páginas existen, y las genera todas en el build (SSG) en vez de bajo demanda en cada visita — más rápido para quien visita, sin coste porque los datos no cambian en producción. Si se añade una raza nueva al array de datos, `generateStaticParams` la recoge sola (recorre el array con `.map`), sin tocar nada más. `generateMetadata` sigue el mismo patrón para el `<title>`/`<meta>` de cada página.

### `Link` de `next/link` frente a `<a>`

Un `<a>` normal siempre recarga la página entera al navegar. `Link` intercepta el clic, navega sin recargar todo y precarga la página de destino cuando el enlace entra en el viewport. Para navegación interna nueva (como `BreedCard` o el "Volver a razas" de la ficha) se usó `Link`; el código más antiguo del sitio todavía usa `<a>` para esto y queda como deuda técnica menor, sin prisa por migrarla.

---

## Decisiones tomadas en esta sesión

- Datos de razas en **`apps/web/data/breeds.ts`** (TS, no JSON/MDX/DB), con `interface Breed` y uniones de literales para los campos de opciones cerradas.
- Fotos de **Unsplash**, una por raza, buscadas y verificadas antes de usarlas (no URLs inventadas).
- **15 razas** en la v1 (lista propuesta por Claude, aprobada sin cambios por el usuario).
- La tarjeta del listado (`BreedCard`) es **un enlace completo**, no un botón "Ver más" aparte.
- La ficha añade **ya** (no aplazado) el enlace a Primeros pasos cuando la raza no es apta para primerizos.
- **404 propio** para `/razas/[slug]` con la marca de Kovli, en vez de dejar el genérico de Next.js.
- Feature 004 cerrada en dos iteraciones (listado, ficha) dentro de la misma feature, sin crear una 004-bis.

---

## Estado al cerrar la sesión

- [x] Listado `/razas` con las 15 razas, enlazado desde home y header.
- [x] Ficha individual `/razas/[slug]` con los 8 datos, `generateStaticParams`, `generateMetadata`, 404 propio y enlace condicional a Primeros pasos.
- [x] Verificado con Playwright (mobile/tablet/desktop) y con `pnpm build` (SSG de las 15 fichas).
- [x] Feature 004 marcada "Hecho" en el roadmap; `spec.md`/`plan.md`/`tasks.md` al día.
- [x] `tech-stack.md` documenta los patrones nuevos (`apps/web/data/`, rutas dinámicas con `generateStaticParams`, `remotePatterns`, `Link` vs `<a>`).
- [x] Todo commiteado y subido a `main` (`4584614`, `1febe11`, `b1e8f32`).
- [x] Backlog anotado para mañana (buscador/filtros v2, feature 005 ONGs) sin inventar contenido ni criterios de aceptación.

## Próximos pasos (inicio de siguiente sesión)

1. Decidir por cuál de las dos ideas del backlog se empieza: **buscador/filtros en `/razas`** o **005 · Apartado de ONGs y organizaciones**.
2. Para la que sea, seguir el flujo spec → plan → tasks antes de tocar código — ninguna de las dos tiene todavía sus `.md` propios.
