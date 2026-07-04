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

## Archivos / módulos clave

- `apps/web/` — sitio Next.js.
  - `apps/web/components/layout/` — estructura del sitio, presente en todas las páginas (Header, menús...).
  - `apps/web/components/ui/` — piezas de interfaz genéricas y reutilizables (botones, modales...), sin lógica de página concreta.
  - `apps/web/components/home/` — contenido específico de la home (Hero, Secciones...).
  - Cada feature nueva que añada páginas propias (p. ej. 002 · Secciones) valora si sus componentes van en su propia subcarpeta de `components/` o colocados junto a su ruta en `app/`.
  - `apps/web/app/(secciones)/` — las páginas de contenido (MDX) comparten `layout.tsx` (volver a inicio + contenedor). El paréntesis es un *route group* de Next.js: agrupa sin añadir segmento a la URL.
  - `apps/web/mdx-components.tsx` — estilos Tailwind por defecto para el contenido MDX (títulos, párrafos, listas, enlaces), para no repetir clases en cada sección. **Ojo:** solo aplica a la sintaxis Markdown (`## título`), no a JSX literal (`<h2>`) escrito a mano dentro del `.mdx` — si se necesita un `id` en un encabezado (para anclas), hay que aplicarle las clases directamente.
  - `apps/web/components/secciones/` — componentes reutilizables de las páginas de sección: `FichaSeccion.tsx` (la "Libreta de veterinario", índice de la página) y `RolodexSecciones.tsx` (el "Rolodex", fichero de tarjetas con el resto de secciones). Ver `spec/features/002-secciones/plan.md`.
    - `FichaSeccion.tsx` es el primer *Client Component* del proyecto (`"use client"`): necesita estado en el navegador para el tick de "leído" en cada ítem. Guarda en `localStorage`, con clave `kovli:leido:<pathname>` (vía `usePathname()`), la lista de anchors ya clicados. Como el `localStorage` no existe en el primer render de servidor, el tick aparece un instante después de montar el componente (`useEffect`) — parpadeo mínimo aceptado como trade-off de no tener backend todavía.
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

## Estilo visual

Dirección de marca: **paleta de marrones, beiges y blancos**, inspirada en los colores de pelaje de los poodles. Paleta de partida (en evolución, se irá afinando):

- Crema (blanco cálido, capas puntuales: modal, hover de tarjetas): `#FBF7F0`
- Arena (fondo general del body, header y menú móvil): `#f3ebdd`
- Beige: `#E8DCC8`
- Apricot (acento cálido, color típico de poodle): `#D9A679`
- Café-au-lait (acento medio): `#A87C5F`
- Chocolate (texto y acentos oscuros): `#4E3B2E`

**Tipografía:** Inter (`font-sans`) para el cuerpo del sitio. Desde la sesión 07, dos fuentes más para los componentes de sección con más carácter (vía `next/font/google`, sin dependencias nuevas): Playfair Display (`font-serif`, títulos con aire de papelería/catálogo) e IBM Plex Mono (`font-mono`, etiquetas tipo "SECCIÓN 01 DE 05").

- Layout: mobile-first, usando los breakpoints de Tailwind.

## Límites duros

- No subir `.env*` al repositorio.
- No añadir dependencias sin avisar.
- No usar `any` sin justificar.
- No construir login/DB antes de la Fase 2.
