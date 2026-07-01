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

## Decisiones (cerradas)

- Una página por sección, sin sub-artículos con ruta propia por ahora.
- Contenido en MDX (archivos en el repo), sin CMS headless.
- "Razas de perros" se separa en la feature 004.

## Riesgos

- **Contenido incorrecto o poco riguroso** sobre salud/seguridad canina — mitigación: tú revisas y das el OK a cada sección antes de darla por buena, igual que con el código.
- **Añadir `@next/mdx` es la primera dependencia nueva del proyecto desde el esqueleto inicial** — pendiente de tu confirmación explícita antes de instalarla.
