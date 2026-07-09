# Tasks · 008 · Ficha de raza editorial + galería + 3 razas nuevas

## Fase 1 — 3 razas nuevas
- [x] Investigar y verificar datos (temperamento, energía, tamaño, pelaje, apto-primerizos, esperanza de vida, notas de salud) de Galgo, Salchicha y Pitbull.
- [x] Redactar el contenido del Pitbull con cuidado (evidencia real, sin alarmismo ni idealización, nota legal de PPP donde aplique).
- [x] Buscar y verificar foto de portada (Unsplash) para cada una de las 3 razas.
- [x] Añadir las 3 razas a `apps/web/data/breeds.ts`.
- [x] `pnpm build`/`pnpm lint` — confirmar que aparecen bien en `/razas` (listado y filtros) con el diseño actual.

## Fase 2 — Rediseño de la ficha individual
- [x] Ampliar `Breed` con `otrasFotos?` e `introduccion?` (opcionales).
- [x] Crear `FichaRazaHero.tsx` (Client Component): hero + galería de miniaturas condicional.
- [x] Actualizar `razas/[slug]/page.tsx`: integrar `FichaRazaHero`, cuerpo editorial condicional con letra capitular, restyle de filas de datos.
- [x] Verificar con Playwright: galería (clic cambia foto), responsive (columnas 2→1), una raza sin `introduccion`/`otrasFotos` se ve bien igual.
- [x] Confirmar que `/razas` (listado + filtros) sigue funcionando sin cambios.
- [x] `pnpm build`/`pnpm lint` sin errores nuevos.

## Fase 3 — Contenido para las 18 razas (tandas de 4-5)
- [x] Tanda 1
- [x] Tanda 2
- [x] Tanda 3
- [x] Tanda 4 (las que queden)
- [x] Confirmación del usuario en su navegador.
- [x] Mover la feature a "Hecho" en `spec/constitution/roadmap.md` y actualizar `tech-stack.md`.
