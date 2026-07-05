# 004 · Razas de perros — Tareas

## Iteración 1 · Listado (hecha)

- [x] 1. Configurar `remotePatterns` en `next.config.ts` para el dominio de imágenes elegido (Unsplash/Pexels), para poder usar `next/image` con fotos externas.
- [x] 2. Definir `interface Breed` en `apps/web/data/breeds.ts` (tamaño, energía y apto-primerizos como uniones de literales, no strings libres).
- [x] 3. Rellenar el array con las 15 razas acordadas, cada una cumpliendo `Breed` (foto, tamaño, temperamento, energía, pelaje/cuidados, apto-primerizos, esperanza de vida, notas de salud).
- [x] 4. Crear el componente `BreedCard` (`apps/web/components/`) que muestra los datos clave de una raza.
- [x] 5. Crear la página `/razas` (`apps/web/app/razas/`) que recorre el array de `breeds.ts` y renderiza una `BreedCard` por raza.
- [x] 6. Rellenar el `href` de la entrada "Razas" ya existente en `apps/web/lib/secciones.ts` con `/razas` — la home (`Secciones.tsx`) y el Header ya la consumen de ahí, no hace falta tocarlos.
- [x] 7. Comprobar responsive (mobile-first) y que aplica la paleta de marca.
- [x] 8. Validar contra los criterios de aceptación de `spec.md` — confirmado en el navegador por el usuario.
- [x] 9. Se deja la feature "en curso" en `../../constitution/roadmap.md`: el listado está terminado, pero la ficha individual (`/razas/[slug]`) sigue pendiente dentro de esta misma feature.

## Iteración 2 · Ficha individual (en curso)

- [x] 10. Convertir `BreedCard` en un enlace: toda la tarjeta navega a `/razas/[breed.slug]`.
- [x] 11. Crear `apps/web/app/razas/[slug]/page.tsx`: busca la raza por slug en `breeds`, `notFound()` si no existe.
- [x] 12. Mostrar en la ficha los 8 datos completos de la raza (foto grande, nombre, tamaño, temperamento, energía, pelaje/cuidados, apto-primerizos, esperanza de vida, notas de salud).
- [x] 13. Añadir `generateStaticParams` (las 15 rutas se generan en build) y `generateMetadata` (título con el nombre de la raza).
- [x] 14. Si `aptoPrimerizos !== "sí"`, mostrar una nota con enlace a `/primeros-pasos`.
- [x] 15. Enlace "← Volver a razas" en la ficha, hacia `/razas` — ya se hizo en la tarea 11.
- [x] 16. Comprobar responsive, paleta de marca, navegación desde una tarjeta y el caso 404 con un slug inventado. De paso se añadió `apps/web/app/razas/[slug]/not-found.tsx` (404 con la marca de Kovli, decisión aprobada por el usuario).
- [x] 17. Validar contra los criterios de aceptación de `spec.md` (iteración 2) — confirmado por el usuario.
- [x] 18. Mover la feature a "Hecho" en `../../constitution/roadmap.md`.
