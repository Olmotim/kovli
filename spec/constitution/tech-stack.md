# Tech stack y convenciones

## Tecnologías

- **Lenguaje:** TypeScript estricto.
- **Framework / runtime:** Next.js (App Router) + React, sobre Node LTS.
- **Estilos:** Tailwind CSS.
- **Contenido:** MDX (archivos versionados en el repo, sin CMS), vía `@next/mdx`. Decidido en la feature 002.
- **Monorepo:** pnpm workspaces + Turborepo.
- **Base de datos:** 🟡 Fase 2 — Postgres. ORM por decidir (Prisma vs Drizzle); hosting por decidir (Supabase vs Neon). No aplica en Fase 1.
- **Auth:** 🟡 Fase 2 — por decidir (Supabase Auth / Auth.js / Clerk).
- **Validación:** Zod (esquemas compartidos en `packages/schemas`), a partir de Fase 2.
- **Móvil:** 🟡 Fase 3 — Expo + React Native.
- **Capa nativa:** 🟡 Fase 4 — Kotlin + Jetpack Compose.
- **Tests:** 🟡 por decidir — propuesta: Vitest. (¿desde Fase 1 o más adelante?)
- **Despliegue:** Vercel (web).
- **Mapas:** Leaflet + `react-leaflet`, teselas de OpenStreetMap (sin API key ni coste, a diferencia de Mapbox). Decidido en la feature 007.

## Archivos / módulos clave

- `apps/web/` — sitio Next.js.
  - `apps/web/components/layout/` — estructura del sitio, presente en todas las páginas (Header, menús...). `SeccionesDropdown.tsx` (feature 009): el submenú de escritorio de "Cuidado del perro" — único trozo interactivo del navbar (el resto de `Header.tsx` sigue siendo Server Component). Es un **mega menú a todo el ancho de la pantalla**, no un dropdown estrecho bajo el botón: el panel usa `absolute inset-x-0`, que se posiciona contra el `<header>` (el ancestro "positioned" más cercano — CSS trata `position: sticky` como positioned a efectos de contención de hijos `absolute`, igual que `relative`), no contra el propio contenedor del botón. **Cierre con retraso en el hover:** como el botón queda centrado dentro de una barra más alta que él, hay una franja entre el botón y el borde del panel que no pertenece a ningún elemento con el hover enganchado — cerrar al instante en `onMouseLeave` cortaba el menú a medio camino al bajar hacia él. Se soluciona con `setTimeout` (no cerrar de inmediato, sino en ~200ms, cancelable si el ratón vuelve a entrar a tiempo) en vez de calcular el hueco en píxeles, que se rompería si cambia la altura del header. `MobileMenu.tsx` amplía el mismo grupo como acordeón (`useState` propio, independiente del que abre/cierra el menú entero) en vez de mega menú, ya que en móvil ya es una lista vertical. **(feature 010)** "Razas" ya no vive en `lib/secciones.ts` — es una constante propia (`{ label, href }`) definida en `Header.tsx` y pasada como prop a `MobileMenu`. Antes se sacaba con `secciones.find()`/`.filter()` solo dentro de `Header.tsx`, pero `Secciones.tsx` (camino de la home) y `RolodexSecciones.tsx` no filtraban nada y mostraban Razas igualmente sin querer — sacarla del array de raíz lo arregla en los tres sitios a la vez, sin repetir el filtro.
  - `apps/web/components/ui/` — piezas de interfaz genéricas y reutilizables (botones, modales...), sin lógica de página concreta. `LoadingScreen.tsx` (sesión 13): pantalla de carga de la home, Client Component con dos estados (`loading` y `progress`) — la barra de progreso usa `requestAnimationFrame` antes de saltar a 100% para que el navegador llegue a pintar el 0% inicial y la transición CSS (`transitionDuration`) se vea, en vez de aparecer ya llena; la duración vive en una única constante (`DURATION_MS`) compartida entre el temporizador y la animación.
  - `apps/web/components/home/` — contenido específico de la home (Hero, Secciones...). `Organizaciones.tsx` (feature 006): directorio de organizaciones de ayuda/adopción, Client Component (pestañas de filtro por país como estado del navegador). Las pestañas se calculan a partir de los países presentes en `apps/web/data/organizaciones.ts` (`[...new Set(...)]`), no hardcodeadas, para que un país nuevo en los datos aparezca solo con añadir filas al array. **`FilaOrganizacion` es un `<li>`, y el `role="button"` (fila clicable con teclado) va en un `<div>` de dentro, no en el propio `<li>`:** ponerlo directamente en el `<li>` cambia su rol accesible de "listitem" a "button", y entonces el `<ul>` que lo contiene dejaba de tener hijos válidos según las normas ARIA (detectado con Lighthouse en el cierre de Fase 1 — auditoría `list` de accesibilidad). Patrón a repetir en cualquier `<li>` clicable futuro.
    - `OrganizacionesMapa.tsx` (feature 007): mapa Leaflet sincronizado con la lista, cargado desde `Organizaciones.tsx` vía `next/dynamic({ ssr: false })` (Leaflet necesita `window`). Cada organización lleva `lat`/`lng` en `organizaciones.ts`, geocodificadas una vez (Nominatim) y guardadas como dato estático — no en tiempo real. Icono de marcador propio (SVG en línea vía `L.divIcon`) en vez del icono por defecto de Leaflet, que se rompe con el empaquetador de Next.js. El encuadre inicial usa `fitBounds` sobre las coordenadas visibles, no un centro/zoom fijos — con organizaciones en dos continentes, el punto medio cae en mitad del océano. **Ojo con el `ref` de `MapContainer`:** a diferencia de un ref de DOM normal, no se rellena de forma síncrona en el mismo commit de React — un `useRef` leído dentro de un efecto puede seguir viendo `null`. El patrón correcto (documentado por la propia librería) es `useState` como ref (`ref={setMap}`), para que el cambio de estado dispare de nuevo los efectos que dependen del mapa. **Marcadores sin nombre accesible (cierre de Fase 1):** Leaflet añade `role="button"` y `tabindex="0"` al icono de cada marcador para que sea navegable por teclado, pero no le pone ningún nombre — se añade a mano con `marker.getElement()?.setAttribute("aria-label", ...)` dentro del `ref` callback del `<Marker>`, ya que fijar la prop `alt` del marcador no llega a traducirse en un `aria-label` real sobre un icono que es un `<div>` (no una `<img>`). **Pendiente (backlog):** con organizaciones muy próximas entre sí, los marcadores quedan pegados y Lighthouse marca el touch-target como insuficiente — arreglarlo bien pide una librería de clustering (`leaflet.markercluster`), dependencia nueva a valorar aparte.
  - Cada feature nueva que añada páginas propias (p. ej. 002 · Secciones) valora si sus componentes van en su propia subcarpeta de `components/` o colocados junto a su ruta en `app/`.
  - `apps/web/app/(secciones)/` — las páginas de contenido (MDX) comparten `layout.tsx` (volver a inicio + contenedor). El paréntesis es un *route group* de Next.js: agrupa sin añadir segmento a la URL.
  - `apps/web/mdx-components.tsx` — estilos Tailwind por defecto para el contenido MDX (títulos, párrafos, listas, enlaces), para no repetir clases en cada sección. **Ojo:** solo aplica a la sintaxis Markdown (`## título`), no a JSX literal (`<h2>`) escrito a mano dentro del `.mdx` — si se necesita un `id` en un encabezado (para anclas), hay que aplicarle las clases directamente.
  - `apps/web/components/secciones/` — componentes reutilizables de las páginas de sección: `FichaSeccion.tsx` (la "Libreta de veterinario", índice de la página) y `RolodexSecciones.tsx` (el "Rolodex", fichero de tarjetas con el resto de secciones). Ver `spec/features/002-secciones/plan.md`.
    - `FichaSeccion.tsx` es el primer *Client Component* del proyecto (`"use client"`): necesita estado en el navegador para el tick de "leído" en cada ítem. Guarda en `localStorage`, con clave `kovli:leido:<pathname>` (vía `usePathname()`), la lista de anchors ya clicados. Como el `localStorage` no existe en el primer render de servidor, el tick aparece un instante después de montar el componente (`useEffect`) — parpadeo mínimo aceptado como trade-off de no tener backend todavía.
  - `apps/web/data/` — datos estructurados versionados en TS (no MDX, no DB): cada archivo exporta una `interface` con la forma del dato y un array que la cumple. Primer caso, feature 004: `breeds.ts` (`interface Breed`, 8 campos; tamaño/energía/apto-primerizos como uniones de literales en vez de `string` suelto, para que TypeScript rechace valores fuera de las opciones cerradas). Se usa cuando el catálogo es fijo en el repo, no una entrada de usuario ni contenido largo tipo artículo (eso sigue siendo MDX). Feature 008: `Breed` amplía con `otrasFotos?` (fotos extra para la galería de la ficha) e `introduccion?` (párrafos editoriales) — ambos **opcionales**, para poder desplegar el rediseño de la ficha antes de tener contenido para las 18 razas sin romper nada ni dejar huecos vacíos.
  - `apps/web/components/razas/` — `BreedCard.tsx`: toda la tarjeta es un `Link` (no un `<div>` con un enlace dentro) a la ficha de la raza. `BreedsExplorer.tsx` (feature 005, segundo *Client Component* del proyecto tras `FichaSeccion.tsx`): recibe `breeds` del Server Component padre (`/razas/page.tsx`) y lleva en estado local (`useState`) el texto de búsqueda y los filtros marcados; un `useMemo` recalcula la lista filtrada solo cuando cambian los datos o el estado. La función que decide si una raza encaja con los filtros (`matchesBreed`) es una función pura aparte en el mismo archivo (sin JSX ni hooks), para no mezclar la regla de filtrado con la mecánica de React — no es un archivo propio como `BreedCard`, porque nadie más la importa. `FichaRazaHero.tsx` (feature 008, *Client Component*): hero de foto a sangre completa + galería de miniaturas debajo (solo si hay más de una foto); un único `useState` guarda el índice de la foto activa, la miniatura clicada la sustituye en el hero grande.
  - Rutas dinámicas con catálogo fijo (ej. `apps/web/app/razas/[slug]/page.tsx`, feature 004): como los datos no cambian en producción, se usa `generateStaticParams` para que Next.js genere las páginas en el build (SSG) en vez de bajo demanda, y `notFound()` de `next/navigation` para un 404 real si el slug no existe. Cada ruta dinámica con datos fijos así debería llevar su propio `not-found.tsx` en la misma carpeta (con la marca de Kovli), en vez de dejar el 404 genérico de Next.js.
  - Imágenes de fuentes externas (ej. fotos de razas en `breeds.ts`): `next.config.ts` da de alta el dominio en `images.remotePatterns` antes de poder usarlo en `next/image` — sin esto Next.js lo rechaza (protección: `next/image` procesa la imagen en el propio servidor, así que permitir cualquier URL abriría la puerta a SSRF y a coste de procesado sin límite).
  - **Fotos de Unsplash recortadas por `next/image` (`fill` + `object-cover`):** si la foto original es vertical y la caja donde se muestra es muy ancha y baja (como el hero o, peor, la tira de miniaturas de `FichaRazaHero.tsx`), el navegador recorta el sobrante y puede dejar fuera la cara del perro — el "recorte" no lo decide el contenido, solo el centro geométrico. Solución adoptada en la feature 008: añadir `&h=800&crop=entropy` (junto a `&w=1200`) a la URL de Unsplash, para que el propio servidor de imágenes precorte a un 1.5:1 razonable centrado en la zona de más detalle, antes de que `object-cover` recorte otra vez. Aun así, para fotos con la cara muy descentrada (no en el tercio central), ni `crop=entropy` evita que la tira de miniaturas (aspecto todavía más extremo) corte la cabeza — en esos casos no hay parámetro que lo arregle, hay que elegir otra foto con mejor composición para ese hueco.
  - **Cierre de Fase 1** — piezas nuevas para dejar el sitio "cerrado" antes de abrir Fase 2: `apps/web/components/layout/Footer.tsx` (nuevo, enlaza las 3 páginas legales, añadido a `app/layout.tsx`); `apps/web/app/(legal)/` (route group con su propio `layout.tsx`, mismo patrón que `(secciones)`) con `aviso-legal/`, `privacidad/` y `cookies/` en MDX; `apps/web/app/robots.ts` y `apps/web/app/sitemap.ts` (convención de Next.js, generan `/robots.txt` y `/sitemap.xml` a partir de `lib/secciones.ts` y `data/breeds.ts`, sin mantener la lista de URLs a mano); `apps/web/app/not-found.tsx` genérico (mismo estilo que el ya existente en `razas/[slug]/not-found.tsx`) para cualquier URL fuera del sitio.
- `apps/mobile/` — app Expo / React Native (Fase 3).
- `packages/domain/` — lógica de negocio pura.
- `packages/schemas/` — tipos + validación Zod compartidos.
- `packages/db/` — esquema y acceso a datos (Fase 2).

## Comandos

🟡 _Se concretan al montar el monorepo (Etapa 0)._ Previstos: `pnpm dev`, `pnpm test`, `pnpm lint`, `pnpm build`.

## Modelo de datos / dominio

🟡 Fase 2 — entidades previstas: `user`, `calendario`, `tareas`. Sin definir todavía.

## Convenciones

- camelCase para variables y funciones; PascalCase para componentes.
- TypeScript estricto: prohibido `any` sin justificarlo.
- Lógica de negocio en `packages/domain`, nunca en componentes ni route handlers.
- Validar toda entrada de usuario con Zod (Fase 2).
- Idioma del contenido: español (España y Latam), redactado en español neutro. 🟡 Previsto a futuro: i18n para inglés — conviene no hardcodear textos de interfaz; con MDX, se resolvería con un archivo por idioma (p. ej. `salud.es.mdx` / `salud.en.mdx`).
- Cuando un componente necesita disposiciones muy distintas según el ancho de pantalla (no solo reajustar tamaños, sino estructuras diferentes), las dos versiones conviven en el DOM y se alternan por CSS (`lg:hidden` en una, `hidden lg:block` en la otra) — no con JavaScript (`matchMedia`). Patrón ya usado en Header/MobileMenu y en el camino de "Secciones" (sesión 06).
- El `<Header>` es `sticky top-0`. Por eso `globals.css` fija `scroll-padding-top` en el `html` (altura del header): sin esto, saltar a un ancla (`#id`) deja el título tapado justo debajo del header fijo. Cualquier nuevo ancla del sitio queda cubierta automáticamente por esta regla global, sin tocarla por página.
- Para navegar entre páginas de la propia app, usar `Link` de `next/link`, no un `<a>` normal — evita recargar la página entera y precarga el destino cuando el enlace entra en el viewport. Introducido en la feature 004 (`BreedCard`, ficha de raza). Migrado el resto del código antiguo que aún usaba `<a>` (`Secciones.tsx`, `RolodexSecciones.tsx`) en el cierre de Fase 1 — ya no queda ningún enlace interno sin migrar.

## Estilo visual

Dirección de marca: **paleta de marrones, beiges y blancos**, inspirada en los colores de pelaje de los poodles. Paleta de partida (en evolución, se irá afinando):

- Crema (blanco cálido, capas puntuales: modal, hover de tarjetas): `#FBF7F0`
- Arena (fondo general del body, header y menú móvil): `#f3ebdd`
- Beige: `#E8DCC8`
- Apricot (acento cálido, color típico de poodle): `#D9A679`
- Café-au-lait (acento medio): `#A87C5F`
- Chocolate (texto y acentos oscuros): `#4E3B2E`
- Kovu (`#B3EBF2`) y Loli (`#FFC5D3`): acentos puntuales, alternados en el icono de pata del camino de "Secciones" en la home (`Secciones.tsx`).

**Tipografía:** Inter (`font-sans`) para el cuerpo del sitio. Desde la sesión 07, dos fuentes más para los componentes con más carácter (vía `next/font/google`, sin dependencias nuevas): Fraunces (`font-serif`, cálida y orgánica — sustituyó a Playfair Display en la sesión 13, con el eje óptico `axes: ["opsz"]` activado para que la letra se ajuste sola según el tamaño) e IBM Plex Mono (`font-mono`, etiquetas tipo "SECCIÓN 01 DE 05").

**Contraste de texto (detectado con Lighthouse en el cierre de Fase 1):** `text-cafe` (`#A87C5F`) sobre `bg-arena`/`bg-crema` da solo ~3:1 de contraste — insuficiente para texto normal (mínimo WCAG AA: 4.5:1). Para texto secundario sobre esos fondos, usar `text-chocolate/80` (~5.2:1) en su lugar; para texto sobre `bg-apricot`, usar `text-chocolate` (no `text-crema`, que da solo ~2:1). `text-cafe` sigue siendo válido para textos grandes (≥18pt) o como color de icono/borde, donde el mínimo de contraste exigido es más bajo.

- Layout: mobile-first, usando los breakpoints de Tailwind.

## Límites duros

- No subir `.env*` al repositorio.
- No añadir dependencias sin avisar.
- No usar `any` sin justificar.
- No construir login/DB antes de la Fase 2.
