# 010 · Huellitas gastadas (cuidado del perro senior)

**Estado:** hecho

## Qué hace

Nueva sección de contenido (guía temática), con el mismo patrón que las 5 existentes (Libreta de veterinario + artículo + Rolodex): cuidado de perros en su etapa senior/mayor.

- Ruta: `/huellitas-gastadas` (dentro del route group `(secciones)`).
- Aparece en el camino de la home, en el submenú "Cuidado del perro" del navbar y en el Rolodex del resto de páginas de sección — igual que las otras 5.
- Contenido, 5 apartados (detalle en `plan.md`): cuándo empieza la etapa senior, señales de esta etapa, alimentación adaptada, adaptar casa y paseos, bienestar cognitivo y emocional.

Incluye además una limpieza relacionada: **"Razas" deja de estar en `lib/secciones.ts`** (el array de secciones temáticas) y pasa a vivir como enlace propio dentro de `Header.tsx`/`MobileMenu.tsx`. Efecto: Razas desaparece del camino de la home y del Rolodex del pie de cada sección (donde aparecía sin querer); se mantiene igual en el navbar, donde ya se sacaba aparte desde la feature 009.

## Por qué

- Guía dedicada a perros mayores, complementaria a lo que ya toca `/salud` de pasada (que se centra en enfermedades y revisiones veterinarias, no en el día a día de adaptar casa y rutina).
- Razas ya estaba documentada como "fuera de alcance" de las secciones temáticas desde la feature 002 (es catálogo, no guía), pero técnicamente se colaba en dos sitios porque solo `Header.tsx` la filtraba. Se corrige sacándola del array en vez de repetir el filtro una tercera vez.

## Criterios de aceptación

- [x] Nueva ruta `/huellitas-gastadas` con el mismo patrón que las otras 5 (Libreta + artículo + Rolodex).
- [x] Los 5 apartados acordados, redactados y aprobados uno a uno.
- [x] Aparece en el camino de la home (`Secciones.tsx`), en el submenú "Cuidado del perro" del navbar (escritorio y móvil) y en el Rolodex de las otras 6 páginas.
- [x] "Razas" ya no aparece en el camino de la home ni en el Rolodex de ninguna página — sigue funcionando igual en el navbar.
- [x] Las 5 páginas de sección existentes actualizan su `total` de 5 a 6 en `<FichaSeccion>` (ahora hay 6 secciones temáticas).
- [x] `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] Validado por el usuario en el navegador.

## Fuera de alcance

- Tocar el contenido de `/salud` o de cualquier otra sección existente.
- Cualquier cambio a "Razas" más allá de sacarla de `lib/secciones.ts` (misma ruta, mismo enlace de navbar, mismo catálogo).
