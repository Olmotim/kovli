# 004 · Razas de perros — Tareas

> Alcance de esta iteración: solo el listado (`/razas`). Una tarea a la vez.

- [x] 1. Configurar `remotePatterns` en `next.config.ts` para el dominio de imágenes elegido (Unsplash/Pexels), para poder usar `next/image` con fotos externas.
- [x] 2. Definir `interface Breed` en `apps/web/data/breeds.ts` (tamaño, energía y apto-primerizos como uniones de literales, no strings libres).
- [x] 3. Rellenar el array con las 15 razas acordadas, cada una cumpliendo `Breed` (foto, tamaño, temperamento, energía, pelaje/cuidados, apto-primerizos, esperanza de vida, notas de salud).
- [x] 4. Crear el componente `BreedCard` (`apps/web/components/`) que muestra los datos clave de una raza.
- [x] 5. Crear la página `/razas` (`apps/web/app/razas/`) que recorre el array de `breeds.ts` y renderiza una `BreedCard` por raza.
- [x] 6. Rellenar el `href` de la entrada "Razas" ya existente en `apps/web/lib/secciones.ts` con `/razas` — la home (`Secciones.tsx`) y el Header ya la consumen de ahí, no hace falta tocarlos.
- [x] 7. Comprobar responsive (mobile-first) y que aplica la paleta de marca.
- [x] 8. Validar contra los criterios de aceptación de `spec.md` — confirmado en el navegador por el usuario.
- [x] 9. Se deja la feature "en curso" en `../../constitution/roadmap.md`: el listado está terminado, pero la ficha individual (`/razas/[slug]`) sigue pendiente dentro de esta misma feature.
