# Sesión 04 — Organización de componentes, spec de la 002 y esqueleto de las secciones

**Fecha:** 2026-07-01
**Estado al terminar:** `components/` reorganizado por rol. Spec de la feature 002 cerrada (una página por sección, contenido en MDX, "Razas de perros" separada en la nueva feature 004). MDX instalado y configurado. Esqueleto completo de las 5 secciones (layout compartido + rutas con placeholder) creado, enlazado desde la home y verificado — pendiente solo de escribir el contenido real de cada sección.

---

## Qué se hizo en esta sesión (resumen completo)

1. Reorganización de `apps/web/components/` (antes carpeta plana) en subcarpetas por rol: `layout/` (Header, MobileMenu), `ui/` (DescargaAppButton), `home/` (Hero, Secciones). Documentado como convención en `constitution/tech-stack.md` para que las próximas features sepan dónde ubicar sus componentes.
2. Cierre de las 3 decisiones abiertas de la spec de la feature 002: una página por sección (sin sub-artículos con ruta propia todavía), contenido en MDX (sin CMS), y "Razas de perros" separada en una feature nueva (004), por ser datos estructurados en vez de un artículo.
3. Instalación y configuración de MDX: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`; `next.config.ts` con `pageExtensions` ampliado; `mdx-components.tsx` con estilos Tailwind por defecto. Verificado con una página de prueba (creada y luego eliminada) en dev y en build de producción.
4. Construcción del esqueleto completo de la feature 002 antes de escribir contenido: layout compartido (`app/(secciones)/layout.tsx`) + 5 rutas con placeholder ("🚧 Contenido en camino"), enlazadas ya desde el header y las tarjetas de la home (antes tenían `href=""`).
5. Verificación en navegador real: las 5 rutas responden `200`, `/razas` sigue en `404` (correcto, es la feature 004), navegación real desde header y tarjetas, responsive en mobile/desktop, build de producción genera las 5 páginas como estáticas.

---

## Conceptos estudiados

### MDX: qué es y cómo encaja con lo que ya existía

Markdown es la sintaxis simple de un README (`# título`, listas con `-`). MDX es Markdown al que se le permite además meter componentes de React sueltos en medio del texto. `@next/mdx` le enseña a Next.js a tratar un archivo `.mdx` como si fuera una página normal: en el momento de compilar (con `@mdx-js/loader`), el texto que escribes se traduce a un componente de React de verdad — por eso `app/salud/page.mdx` puede vivir en el mismo sitio donde iría un `page.tsx`.

Punto importante aclarado esta sesión: **nada de lo ya construido cambia de forma de escribirse.** `Header.tsx`, `Hero.tsx`, `MobileMenu.tsx`, etc. siguen siendo TSX normal — `pageExtensions` solo *añade* `.mdx` como otra extensión válida, no sustituye ni afecta a las que ya había. El "modo especial" de escritura (casi-Markdown) solo aplica dentro de archivos `.mdx`, y dentro de esos archivos se puede seguir metiendo JSX real cuando haga falta algo más rico que texto — no es Markdown puro excluyente.

### `mdx-components.tsx`

Archivo que Next.js busca automáticamente y usa solo para procesar `.mdx`: define cómo se ve cada elemento típico de Markdown (`h2`, `p`, `ul`, `a`...) una sola vez, para no repetir clases de Tailwind en cada sección. No tiene ningún efecto sobre componentes `.tsx`.

### *Route groups* de Next.js (`(secciones)`)

Una carpeta entre paréntesis dentro de `app/` agrupa rutas para compartir un `layout.tsx` (aquí: el enlace "← Volver a inicio" y el contenedor) **sin añadir ningún segmento a la URL** — `app/(secciones)/salud/page.mdx` sigue resolviendo a `/salud`, no a `/secciones/salud`. Verificado con el build de producción: la tabla de rutas final no muestra rastro del paréntesis.

### Por qué construir el esqueleto antes que el contenido

Se decidió (propuesta del usuario) separar dos tipos de trabajo: primero cerrar toda la parte técnica (layout, rutas, navegación, responsive) con contenido de relleno, y verificarla de una sola vez; después pasar al modo "una sección a la vez" para el contenido real, que es más lento porque necesita revisión. Así cualquier problema de estructura se detecta antes de invertir tiempo escribiendo texto.

---

## Decisiones tomadas en esta sesión

- **`components/` organizado por rol** (`layout/`, `ui/`, `home/`) en vez de carpeta plana — documentado en `tech-stack.md` como convención para futuras features.
- **Feature 002 con una página por sección**, no sub-artículos con ruta propia (se puede reconsiderar más adelante si una sección crece mucho).
- **Contenido en MDX**, sin CMS headless — encaja con "no añadir infraestructura antes de que haga falta" y con el multi-idioma futuro (un archivo por idioma).
- **"Razas de perros" separada en la feature 004** — spec, plan y tasks placeholder ya creados en `spec/features/004-razas-de-perros/`.
- **Autoría del contenido real:** el asistente redacta un primer borrador por sección, el usuario lo revisa y da el OK antes de publicarlo — el mismo patrón de revisión que con el código.
- **Esqueleto completo antes que contenido**: las 5 rutas ya existen y navegan correctamente, con placeholder hasta que se redacte cada una.

---

## Estado de la feature 002 al cerrar la sesión

- [x] Spec cerrada (decisiones de estructura, contenido y alcance de "Razas").
- [x] MDX instalado y configurado, verificado en dev y producción.
- [x] Layout compartido y las 5 rutas base creadas y enlazadas desde la home.
- [ ] Contenido real de cada sección (pendiente, una sección a la vez).
- [ ] Validar contra los criterios de aceptación de `spec.md`.
- [ ] Mover a "Hecho" en `roadmap.md`.

## Próximos pasos (inicio de siguiente sesión)

1. Redactar el contenido real de la primera sección (a decidir cuál, probablemente "Primeros pasos" por ser la de bienvenida) — el asistente propone un borrador, el usuario lo revisa.
2. Repetir sección por sección hasta completar las 5.
3. Cuando estén las 5, validar criterios de aceptación completos y cerrar la feature 002 en el roadmap.
4. Más adelante: feature 004 (Razas de perros) y feature 003 (cursor hocico + huellas), en el orden que se decida entonces.
