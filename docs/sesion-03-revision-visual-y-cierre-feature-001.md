# Sesión 03 — Revisión visual de la feature 001, correcciones y cierre

**Fecha:** 2026-07-01
**Estado al terminar:** Feature 001 (página principal) validada por el usuario y marcada como **Hecho** en `roadmap.md`. Todo committeado. Lista para empezar la feature 002 (Secciones temáticas) en la próxima sesión.

---

## Qué se hizo en esta sesión (resumen completo)

1. Auditoría visual/frontend exhaustiva de la home ya desplegada (header, hero, secciones) en mobile, tablet, desktop y wide, con capturas reales de navegador (Playwright + Chromium headless), no solo lectura de código.
2. Corrección de los problemas encontrados con más impacto:
   - Menú hamburguesa para el header por debajo de 1024px (antes no había navegación alguna en mobile/tablet).
   - Header convertido a `sticky`.
   - Modal "Próximamente" al clicar el CTA "Descarga la app" (antes era un enlace muerto a `#contacto`).
   - Estados `focus-visible` en toda la navegación, CTAs y tarjetas de secciones.
3. Ilustración de un poodle en el Hero: primer intento a mano en SVG, descartado a favor de un PNG que aportó el usuario (`imagenKovli.png`), procesado con `sharp` para quitarle el fondo blanco y aligerarlo.
4. Repetición de la auditoría Lighthouse sobre build de producción real (no dev) para medir el efecto de todos los cambios juntos.
5. Cierre formal de la feature 001: `spec.md`, `tasks.md` y `roadmap.md` actualizados, marcada como "Hecho".

---

## Conceptos estudiados

### Server Components vs. Client Components (`"use client"`)

Hasta esta sesión, toda la home era 100% renderizada en el servidor: Next.js generaba el HTML final y lo mandaba tal cual, sin JavaScript de interactividad. Un componente así no puede tener `useState` ni `onClick` reales, porque ese estado solo puede vivir y reaccionar en el navegador.

El menú hamburguesa y el modal sí necesitan "recordar" si están abiertos o cerrados, así que fue necesario el primer `"use client"` del proyecto — la directiva que le dice a Next.js "esto hidrátalo en el navegador, no te límites a mandar HTML muerto". Es una frontera importante: en cuanto existe un solo componente cliente, Next.js tiene que mandar el runtime de React al navegador para poder engancharlo, con un coste fijo en JavaScript que antes no existía.

### Por qué `display: none` rompe un modal aunque sea `position: fixed`

Bug real encontrado y corregido durante la sesión: al construir el modal dentro del menú móvil, cerrar el menú (con `display: none` en su contenedor) también ocultaba el modal, aunque el modal usara `position: fixed`. Motivo: `fixed` escapa del *scroll* y del *overflow* de sus ancestros, pero **no** escapa de un ancestro con `display: none` — si el padre no se pinta, nada de lo que hay dentro se pinta, sin excepción.

**Solución: portales de React (`createPortal`).** Permiten que un componente, aunque esté escrito dentro de otro en el código, se monte físicamente en otro punto del DOM (aquí, directamente en `<body>`). Así el modal deja de depender de si su padre lógico (el menú) está oculto o no. Es la herramienta estándar de React para overlays: modales, tooltips, cualquier cosa que deba "escapar" visualmente de dónde vive en el árbol de componentes.

### `z-index` y el orden de apilamiento (*stacking order*)

Otro bug encontrado: al abrir el menú móvil, su panel (`position: absolute`) se veía *por detrás* del Hero en vez de por delante. Cuando dos elementos tienen `position` distinto de `static` y ninguno define `z-index`, el navegador los apila simplemente por orden de aparición en el HTML — y el Hero aparece después del Header en el documento, así que "ganaba". Solución: `z-index` explícito y más alto en el header (`z-50`) para que siempre quede por delante del contenido que viene después.

### `focus-visible` frente a `focus`

Estilo que marca visualmente qué elemento está seleccionado al navegar con `Tab` (teclado), en vez del contorno azul por defecto del navegador. Se usa `focus-visible` (no `focus` a secas) porque solo se activa cuando el usuario navega con teclado — un clic de ratón también dispara `:focus`, pero no queremos el contorno apareciendo en cada clic, solo cuando de verdad ayuda a alguien que no usa ratón.

### Quitar el fondo blanco de un PNG con `sharp`

El PNG que aportó el usuario no tenía transparencia (era un color de fondo blanco sólido). Con `sharp` se leyeron los píxeles en crudo, se puso a transparente (`alpha = 0`) cualquier píxel casi-blanco, se recortó el margen sobrante (`trim`) y se volvió a comprimir — de 866 KB a 186 KB, con fondo transparente de verdad. La misma técnica que ya se usó en la sesión 01 para optimizar el logo.

### Por qué bajó el Rendimiento de Lighthouse (96 → 82)

Explicado en detalle más abajo: es el coste esperado de pasar de "cero JavaScript" a "algo de JavaScript" por primera vez en el proyecto. No es un error, es un trade-off consciente y aceptado.

---

## Bugs encontrados y corregidos en esta misma sesión

Ninguno de estos existía antes — son efectos secundarios de las propias correcciones de esta sesión, detectados verificando en el navegador real (no solo compilando):

1. **Panel del menú móvil detrás del Hero** → arreglado con `z-index` explícito en el header.
2. **Modal "Próximamente" invisible al abrirse desde el menú móvil** → causado por `display: none` en el padre; arreglado con un portal de React (`createPortal` a `document.body`).

---

## Auditoría visual: hallazgos y correcciones aplicadas

| Hallazgo | Prioridad | Resolución |
|---|---|---|
| Sin navegación alguna por debajo de 1024px (no solo mobile — también tablets en portrait) | Alta | Menú hamburguesa |
| CTA "Descarga la app" apuntaba a `#contacto`, que no existe | Alta | Modal "Próximamente" |
| Enlaces del header con `href=""` (no navegan a ningún sitio) | Media | Se deja así a propósito — se resuelve en la feature 002, cuando existan las páginas reales de cada sección |
| Contraste del subtítulo del Hero (`text-apricot` sobre `crema`, ~2.03:1) | Media | Se deja así — decisión de diseño consciente del usuario, ya tomada en la sesión 02 |
| Sin estados de foco visibles (`:focus`) en ningún interactivo | Media | Añadidos `focus-visible` en header, hero y tarjetas |
| Grid de 6 tarjetas de Secciones | — | Sin cambios — ya funcionaba bien en todos los breakpoints (6 = 2×3 = 3×2, sin huecos) |

---

## Lighthouse: resultado final (sobre build de producción, no dev)

| Categoría | Sesión 02 (antes del rediseño visual) | Sesión 03 (final) |
|---|---|---|
| Rendimiento | 96 | **82** |
| Accesibilidad | 95 | **100** |
| Buenas prácticas | 100 | 100 |
| SEO | 100 | 100 |

**Accesibilidad a 100** confirma que los `focus-visible` y el resto de ajustes de esta sesión sí tienen efecto medible, no solo visual.

**Rendimiento bajó por el JavaScript del menú/modal** (`Total Blocking Time`: 430ms, `LCP`: 3.2s). Antes de esta sesión, la home era 100% HTML estático — cero JS de interactividad. El menú hamburguesa y el modal son la primera interactividad real del proyecto, y exigen que Next.js mande el runtime de React al navegador (coste fijo, más o menos independiente de lo pequeños que sean los componentes). El peso total de la página sigue siendo bajo (274 KB) y no hay saltos de layout (`CLS: 0`). **Decisión del usuario: aceptar la bajada tal cual** — es el precio razonable de tener un menú y un modal que antes no existían, y no se ha intentado optimizar más allá de esto en esta sesión.

> Nota: Lighthouse simula un móvil de gama media con red lenta (CPU al 25%, throttling de red). Corriendo en WSL los números absolutos pueden salir algo peor que en Vercel o en un móvil real; la caída relativa sí es real y esperable.

---

## Decisiones tomadas en esta sesión (para que no se repitan las preguntas)

- **Menú hamburguesa** en vez de solo bajar el breakpoint — cubre mobile y tablet (0-1024px) de una vez.
- **Modal centrado** (no un toast) para el aviso de "Próximamente".
- **Ilustración del Hero**: se descartó el primer SVG dibujado a mano en favor del PNG que aportó el usuario (`imagenKovli.png`), procesado para quitarle el fondo. El archivo original se dejó intacto en `public/`; el procesado vive en `public/poodle-hero.png`.
- **Bajada de Rendimiento en Lighthouse (96→82) aceptada sin más optimización** — coste esperado de la primera interactividad real del sitio.
- **`href=""` en los enlaces del header**: se deja así a propósito, pendiente de la feature 002.

---

## Estado de la feature 001 al cerrar la sesión

- [x] Todos los criterios de aceptación de `spec.md` validados.
- [x] Revisada visualmente por el usuario en el navegador.
- [x] Lighthouse repetido sobre el diseño final.
- [x] Marcada como **Hecho** en `spec/constitution/roadmap.md`.

## Próximos pasos (inicio de siguiente sesión)

1. Empezar la feature 002 (Secciones temáticas), siguiendo spec → plan → tasks. Quedan dos cosas por decidir juntos antes de escribir código: la estructura interna de cada sección (¿artículos, subapartados, índice?) y el origen del contenido (MDX vs. CMS headless).
2. Al crear las páginas reales de cada sección, corregir los `href=""` del header y de las tarjetas de la home para que apunten a sus rutas.
