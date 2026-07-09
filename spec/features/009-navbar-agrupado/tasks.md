# Tasks · 009 · Navbar agrupado con submenú

- [x] Crear `apps/web/components/layout/SeccionesDropdown.tsx` (Client Component): trigger `<button>` + submenú de escritorio, `useState` para `open`, hover + foco + Escape, `aria-haspopup`/`aria-expanded`.
- [x] Ampliar `apps/web/components/layout/Header.tsx`: calcular `subsecciones`/`razas` a partir de `secciones`, sustituir el `<ul>` de 6 enlaces por `SeccionesDropdown` + enlace a `/#organizaciones` + enlace a Razas, pasar props nuevas a `MobileMenu`.
- [x] Ampliar `apps/web/components/layout/MobileMenu.tsx`: acordeón "Cuidado del perro" (nuevo `useState`, botón con flecha + `aria-expanded`, sublista indentada), enlaces sueltos a Organizaciones y Razas.
- [x] Añadir `id="organizaciones"` al `<section>` de `apps/web/components/home/Organizaciones.tsx`.
- [x] `pnpm build` y `pnpm lint` sin errores nuevos (los 4 errores/3 warnings de lint ya existían antes de esta feature, sin relación con el navbar).
- [x] Verificar en el navegador: escritorio (hover, teclado, Escape) y móvil (acordeón, resto de enlaces) — verificado con Playwright (capturas + comprobación de `aria-expanded` y navegación real).
- [x] Confirmación del usuario en su propio navegador.
- [x] Mover la feature a "Hecho" en `spec/constitution/roadmap.md`; documentar el patrón de dropdown/acordeón en `tech-stack.md`.
