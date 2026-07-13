# 010 · Huellitas gastadas — Plan

> Respeta `constitution/tech-stack.md`. Pendiente de tu OK antes de implementar.

## Enfoque

Mismo patrón que las 5 secciones existentes (feature 002): página `.mdx` con `FichaSeccion` (índice) + artículo + `RolodexSecciones` (enlaces a las demás). Sin dependencias nuevas.

Se aprovecha para sacar "Razas" de `lib/secciones.ts`, que hoy es el único motivo por el que aparece (sin querer) en el camino de la home y en el Rolodex.

## Implementación

1. **`lib/secciones.ts`**: quitar la entrada de "Razas"; añadir "Huellitas gastadas" (`href: "/huellitas-gastadas"`, `icono` y `resumen` a afinar contigo al verlo en pantalla).
2. **`Header.tsx`**: ya no puede sacar Razas con `.find` sobre `secciones` (deja de estar ahí) — se define como constante propia (`{ label: "Razas", href: "/razas" }`) dentro del propio archivo. `subsecciones` pasa a ser `secciones` directamente, sin `.filter`.
3. **`MobileMenu.tsx`**: sin cambios de forma (sigue recibiendo `subsecciones`/`razas` como props) — solo cambia de dónde sale el valor de `razas` en `Header.tsx`.
4. **`Secciones.tsx`** (camino de la home) y **`RolodexSecciones.tsx`**: sin cambios de código — al no estar ya Razas en el array, dejan de mostrarla automáticamente.
5. **Ruta nueva** `app/(secciones)/huellitas-gastadas/page.mdx`, `numero={6}`, `total={6}`.
6. **Actualizar `total={5}` → `total={6}`** en las 5 páginas de sección existentes (`primeros-pasos`, `salud`, `seguridad`, `adiestramiento`, `tiempo-de-juego`), ya que ahora hay 6 secciones temáticas.
7. **Contenido**, los 5 apartados acordados, redactados uno a uno con tu OK antes de pasar al siguiente (mismo ritmo que la ampliación de Salud en la sesión 15):
   1. Cuándo empieza la etapa senior
   2. Señales de esta etapa
   3. Alimentación adaptada
   4. Adaptar casa y paseos
   5. Bienestar cognitivo y emocional
8. Verificar `pnpm build`/`pnpm lint` y probar en el navegador: camino de la home, navbar (escritorio + móvil), Rolodex, ruta nueva.

## Decisiones (cerradas contigo)

- Los 5 apartados listados arriba, en ese orden.
- Razas sale de `lib/secciones.ts`: desaparece del camino de la home y del Rolodex, se mantiene igual en el navbar.

## Riesgos

- Contenido sobre salud/comportamiento en la etapa senior — mismo cuidado que el resto del sitio: no diagnostica, anima a hablar con el veterinario ante cualquier duda concreta.
- Tocar `Header.tsx`/`MobileMenu.tsx` es código ya existente y probado (feature 009): el cambio es pequeño y mecánico (mover el `.find` a una constante), pero conviene volver a probar el navbar en escritorio y móvil tras el cambio.
