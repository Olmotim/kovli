# 009 · Navbar agrupado con submenú

**Estado:** hecho

## Qué hace

Reorganiza los enlaces del navbar (`Header.tsx` / `MobileMenu.tsx`), que hoy lista 6 enlaces sueltos (Primeros pasos, Salud, Seguridad, Adiestramiento, Tiempo de juego, Razas) y se ha quedado con demasiados:

- Los 5 enlaces temáticos (todo menos Razas) se agrupan bajo un único enlace de navbar, **"Cuidado del perro"**, con submenú:
  - **Escritorio:** mega menú — un panel a todo el ancho de la pantalla, bajo el navbar, que se despliega al pasar el ratón (hover) sobre el enlace. Cada sección se muestra con su nombre y una descripción corta (da más aire que una lista estrecha y deja hueco para subcategorías si algún día una sección las necesita).
  - **Móvil:** el enlace se convierte en un acordeón — al tocarlo, despliega los 5 debajo, sin salir del menú.
- **Razas** se mantiene como enlace propio de primer nivel (no entra en el grupo: es un catálogo, no una guía temática).
- Nuevo enlace de primer nivel, **Organizaciones**, que lleva a la sección ya existente en la home (`/#organizaciones`) — no crea página nueva.

Navbar resultante (escritorio y móvil): **Cuidado del perro ▾ | Organizaciones | Razas** + botón de descarga de la app (sin cambios).

## Por qué

El usuario ha ido añadiendo secciones (002, 006, 007, 008) y el navbar ha crecido hasta sentirse sobrecargado. Agrupar las guías temáticas bajo un enlace y dar peso propio a Razas y Organizaciones (las dos piezas de contenido más "distintas" del resto) baja el número de enlaces de primer nivel de 6 a 3, sin perder acceso directo a nada.

## Criterios de aceptación

- [x] El navbar de escritorio muestra 3 enlaces de primer nivel: "Cuidado del perro" (con submenú), "Organizaciones", "Razas".
- [x] En escritorio, el submenú de "Cuidado del perro" se abre al hacer hover (o al recibir foco por teclado) y muestra los 5 enlaces temáticos con su `label`. Se cierra al quitar el hover/foco (con un pequeño retraso — ver `plan.md`, bug real corregido durante la revisión) o al pulsar Escape.
- [x] En móvil, "Cuidado del perro" se comporta como acordeón dentro del menú ya existente: colapsado por defecto, se expande al tocarlo y muestra los 5 enlaces debajo.
- [x] El enlace "Organizaciones" lleva a `/#organizaciones` (nuevo `id` en la sección ya existente de la home) y el salto respeta el `scroll-padding-top` global (no queda tapado por el header fijo).
- [x] "Razas" sigue funcionando exactamente igual que hoy (enlace directo a `/razas`).
- [x] No cambia el contenido de `lib/secciones.ts` que usan `Secciones.tsx` (camino de la home) y `RolodexSecciones.tsx` (fichero al pie de cada sección) — su lista de 6 sigue igual, solo cambia cómo se agrupa en el navbar.
- [x] Accesible: el trigger del submenú es navegable por teclado (Tab) y anuncia su estado (`aria-expanded`); el acordeón móvil usa el mismo patrón.
- [x] `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] Validado por el usuario en el navegador (escritorio y móvil).

## Fuera de alcance

- Página propia `/organizaciones` — se queda como sección de la home, solo se le añade una ancla.
- Cambiar el orden o contenido de las 5 secciones temáticas, o de `lib/secciones.ts` en general.
- Rediseñar el resto del navbar (logo, CTA de descarga) — solo se toca la lista de enlaces.
