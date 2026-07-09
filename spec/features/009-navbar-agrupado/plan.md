# Plan · 009 · Navbar agrupado con submenú

## Dependencias nuevas

Ninguna.

## Datos

**No se toca `lib/secciones.ts`.** Sigue exportando las 6 entradas (5 temáticas + Razas) porque `Secciones.tsx` (camino de la home) y `RolodexSecciones.tsx` (fichero al pie de cada sección) siguen necesitando las 6 tal cual, en ese orden. En vez de duplicar los datos o partir el array en el propio archivo de datos, la separación "5 temáticas / Razas aparte" se calcula donde hace falta — en `Header.tsx` — con un `filter`/`find`:

```ts
const subsecciones = secciones.filter((s) => s.href !== "/razas");
const razas = secciones.find((s) => s.href === "/razas")!;
```

Así, si el día de mañana se añade una 6ª sección temática a `secciones.ts`, aparece sola en el submenú del navbar sin tocar `Header.tsx` — mismo principio que ya usa `Organizaciones.tsx` calculando las pestañas de país a partir de los datos.

El enlace "Organizaciones" no sale de ningún array: es un enlace suelto (`href="/#organizaciones"`, aparece una sola vez) hardcodeado directamente en `Header.tsx` y `MobileMenu.tsx`, igual que ya está hardcodeado el logo o el CTA de descarga — no se crea una entrada de datos para un enlace que no se repite en ningún otro sitio.

## Componentes

### `apps/web/components/layout/SeccionesDropdown.tsx` (nuevo, Client Component)

Encapsula **solo** el enlace "Cuidado del perro" y su submenú de escritorio — es la única pieza interactiva nueva del navbar de escritorio, el resto de `Header.tsx` sigue siendo Server Component (igual que hoy).

- Recibe `items: Seccion[]` (las 5 subsecciones) por props.
- Un único `useState<boolean>` (`open`) controla si el submenú está visible.
- El trigger es un `<button type="button">`, no un `<a>`: "Cuidado del perro" no es una página en sí, agrupa 5 páginas — no tiene sentido darle un `href` que apunte a ningún sitio en concreto. Lleva `aria-haspopup="true"` y `aria-expanded={open}`.
- Apertura por **hover** (`onMouseEnter`/`onMouseLeave` en el contenedor) y por **teclado** (`onFocus` en el trigger abre; `onBlur` en el contenedor cierra, comprobando `e.relatedTarget` para no cerrarse si el foco se mueve *dentro* del propio submenú — patrón estándar para que Tab pueda recorrer los 5 enlaces sin que se cierre a media navegación).
- También se cierra con **Escape** (`onKeyDown` en el contenedor): si está abierto y se pulsa Escape, `setOpen(false)` — permite cerrarlo sin mover el ratón ni seguir tabulando hacia fuera.
- **Cierre con retraso al quitar el hover (bug real encontrado al probarlo):** el botón está centrado dentro de una barra de navbar más alta que él, así que entre el botón y el borde inferior del header (donde arranca el panel) hay una franja que no pertenece a ningún elemento con el hover "enganchado" — al bajar el ratón hacia el panel, esa franja producía un `mouseleave` prematuro que cerraba el menú antes de llegar a los enlaces. En vez de calcular ese hueco en píxeles (frágil, cambia si cambia la altura del header), `onMouseLeave` programa el cierre con `setTimeout` (`RETRASO_CIERRE_MS = 200`) en lugar de cerrar al instante; `onMouseEnter` cancela ese cierre pendiente si el ratón vuelve a entrar a tiempo. Escape y `onBlur` siguen cerrando al instante (no tiene sentido retrasarlos).
- **Mega menú a todo el ancho** (decisión del usuario tras ver la primera versión, un dropdown estrecho de `w-56`): el panel es `absolute inset-x-0 top-full`, no `absolute left-0 w-56`. `inset-x-0` se posiciona contra el ancestro "positioned" más cercano — que no es el propio contenedor del dropdown (se le quita `relative` a propósito) sino el `<header>`, ya `sticky` (CSS trata `sticky` como positioned a efectos de contención de hijos `absolute`, igual que `relative`/`fixed`). Así el panel ocupa todo el ancho de la pantalla sin tener que sacarlo del árbol de React ni tocar `Header.tsx`.
  - Al no haber hueco vertical entre el trigger y el panel (`top-full` sin margen: quedan pegados), no hace falta el truco de padding-bridge que sí necesitaría un dropdown estrecho con espacio de por medio.
  - Contenido del panel: un `<ul>` en grid de 5 columnas, centrado con el mismo `max-w-7xl` que el resto de la web, cada `<li>` con `label` + `descripcion` (campos ya existentes en `Seccion`, no se añade dato nuevo; se probó también con el `icono` de cada sección pero se quitó a petición del usuario tras verlo) — más aire visual que una lista de texto y deja hueco para que el día de mañana una sección enseñe subcategorías sin rehacer el layout.
  - Fondo `bg-arena` + `border-t border-cafe/20` + `shadow-md`: mismo estilo que ya usa el panel del menú móvil (`MobileMenu.tsx`), consistencia entre los dos paneles desplegables del sitio.

**Por qué Client Component y no CSS puro (`group-hover`):** el proyecto ya usa CSS puro para el cursor (feature 003) y para el subrayado hover de los enlaces del navbar, y en general se prefiere evitar JavaScript cuando no hace falta. Pero aquí el criterio de aceptación pide `aria-expanded` real (que un lector de pantalla anuncie si el submenú está abierto o cerrado), y eso es un *estado*, no un estilo — no se puede reflejar con un pseudo-clase CSS. Es la única parte del navbar que necesita JavaScript; el resto (logo, Organizaciones, Razas, CTA) sigue sin él.

### `apps/web/components/layout/Header.tsx` (existente, se amplía)

- Calcula `subsecciones` y `razas` a partir de `secciones` (ver arriba).
- Sustituye el `<ul>` de 6 enlaces planos por: `<SeccionesDropdown items={subsecciones} />`, enlace suelto a `/#organizaciones`, enlace a `razas.href`.
- Pasa `subsecciones` (además de `razas` y el enlace de Organizaciones) a `MobileMenu` para que construya su propio acordeón.

### `apps/web/components/layout/MobileMenu.tsx` (existente, se amplía)

- Nuevo `useState<boolean>` (`seccionesAbiertas`), independiente del `open` que ya controla si el menú entero está visible.
- "Cuidado del perro" se pinta como un `<button>` con el mismo estilo que los demás enlaces del menú móvil + una flecha (▾/▸) que rota según `seccionesAbiertas`; al tocarlo hace `setSeccionesAbiertas((v) => !v)` — no cierra el menú entero.
- Debajo, un `<ul>` con las 5 subsecciones, indentado (`pl-4`) respecto a los demás enlaces, renderizado solo si `seccionesAbiertas` (o siempre en el DOM con `hidden`, a decidir en implementación según lo que quede más simple — funcionalmente es igual).
- Organizaciones y Razas se pintan como enlaces sueltos, igual que el resto de la lista de hoy.
- Mismo `aria-expanded` en el botón de "Cuidado del perro" que en la versión de escritorio.

## Home: ancla de Organizaciones

`apps/web/components/home/Organizaciones.tsx`: el `<section>` (línea 87 en el estado actual) pasa de `<section className="py-16 sm:py-20">` a `<section id="organizaciones" className="py-16 sm:py-20">` — un solo atributo nuevo. El salto a `#organizaciones` ya queda protegido por el `scroll-padding-top` global de `globals.css` (mismo mecanismo que usa `#secciones`), no hace falta tocar nada más.

## Impacto en archivos existentes

- `apps/web/components/layout/Header.tsx`: reestructura los enlaces de escritorio (3 en vez de 6), integra `SeccionesDropdown`, pasa nuevas props a `MobileMenu`.
- `apps/web/components/layout/MobileMenu.tsx`: nuevo estado de acordeón, nuevas props (`subsecciones` en vez de/además de `secciones`).
- `apps/web/components/home/Organizaciones.tsx`: un `id` nuevo en el `<section>`.
- Nuevo: `apps/web/components/layout/SeccionesDropdown.tsx`.
- No cambia: `lib/secciones.ts`, `Secciones.tsx`, `RolodexSecciones.tsx`, ninguna página de `/razas` ni de sección.

## Verificación prevista

- `pnpm build` / `pnpm lint` sin errores nuevos.
- En el navegador: escritorio (hover abre/cierra el submenú, Tab lo abre y permite llegar a los 5 enlaces, Escape lo cierra) y móvil (acordeón se expande/colapsa sin cerrar el menú entero, los 3 enlaces de primer nivel funcionan).
- Confirmar que `/#organizaciones` navega bien desde otra página (no solo desde la home) y que el salto no queda tapado por el header.
