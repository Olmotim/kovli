# 002 · Secciones temáticas — Plan

> Respeta `constitution/tech-stack.md`. Pendiente de tu OK antes de implementar.

## Enfoque

5 páginas estáticas (una por sección), construidas con MDX sobre Next.js App Router. Sin backend, sin datos dinámicos. Contenido escrito a mano, con tu revisión antes de publicar (es información sobre cuidado de perros — hay que evitar errores, `mission.md` es explícito en que Kovli no sustituye al veterinario).

## Implementación

🟡 _Borrador a afinar contigo:_

1. **Instalar soporte MDX** (`@next/mdx`, y sus tipos) — dependencia nueva, necesita tu OK explícito antes de `pnpm add`.
2. Configurar `next.config.ts` para aceptar páginas `.mdx`.
3. `mdx-components.tsx` en la raíz de `apps/web` — da estilo Tailwind consistente a los elementos típicos de Markdown (`h2`, `p`, `ul`, `a`...) sin repetir clases en cada sección.
4. Una ruta por sección, cada una como `app/<seccion>/page.mdx`: `salud`, `seguridad`, `primeros-pasos`, `tiempo-de-juego`, `adiestramiento`.
5. Un layout de artículo compartido (título, enlace de vuelta a inicio) que envuelva el contenido MDX de las 5 páginas.
6. Actualizar los `href=""` pendientes en `Header.tsx` y `Secciones.tsx` (home) para que apunten a las rutas reales.
7. **(Añadido en sesión 07)** Cada página `.mdx` abre con `<FichaSeccion>` (`components/secciones/FichaSeccion.tsx`) — la "Libreta de veterinario": número de sección, estado, título e índice de apartados con enlace directo a cada uno. Cierra con `<RolodexSecciones>` (`components/secciones/RolodexSecciones.tsx`) — el "Rolodex": fichero de tarjetas en abanico con el resto de secciones (excluye la actual), como índice secundario para seguir navegando. Ambos reutilizan `lib/secciones.ts` (con un campo nuevo, `resumen`, para el teaser corto de las tarjetas) y dos fuentes nuevas vía `next/font/google` (Playfair Display para títulos, IBM Plex Mono para etiquetas).

## Decisiones (cerradas)

- Una página por sección, sin sub-artículos con ruta propia por ahora.
- Contenido en MDX (archivos en el repo), sin CMS headless.
- "Razas de perros" se separa en la feature 004.
- **Libreta + artículo + Rolodex** como estructura fija de cada página de sección (cerrado en sesión 07, tras construir `primeros-pasos` como referencia) — se repite igual en las 4 secciones que faltan.

## Riesgos

- **Contenido incorrecto o poco riguroso** sobre salud/seguridad canina — mitigación: tú revisas y das el OK a cada sección antes de darla por buena, igual que con el código.
- **Añadir `@next/mdx` es la primera dependencia nueva del proyecto desde el esqueleto inicial** — pendiente de tu confirmación explícita antes de instalarla.
