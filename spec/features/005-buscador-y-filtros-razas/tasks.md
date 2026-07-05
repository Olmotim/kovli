# 005 · Buscador y filtros en /razas — Tareas

- [x] 1. Crear `apps/web/components/razas/BreedsExplorer.tsx` (Client Component, `"use client"`) que recibe `breeds: Breed[]` como prop.
- [x] 2. Añadir el estado: `query` (string) y los tres arrays de valores marcados (`tamanos`, `energias`, `aptoPrimerizos`).
- [x] 3. Escribir la función pura `matchesBreed` (texto normalizado sin acentos/mayúsculas + los tres filtros combinados con AND, OR dentro de cada grupo) y el `useMemo` que la aplica sobre `breeds`.
- [x] 4. Renderizar el input de texto de búsqueda.
- [x] 5. Renderizar los tres grupos de filtro como pastillas seleccionables (estilo pastilla existente, con estado activo en apricot), con multi-selección por grupo.
- [x] 6. Añadir el botón "Limpiar filtros" (solo visible si `query` o algún array tiene contenido) que resetea todo el estado.
- [x] 7. Renderizar el grid de `BreedCard` con el resultado filtrado; si está vacío, mostrar un mensaje en vez de un grid vacío.
- [x] 8. Actualizar `apps/web/app/razas/page.tsx` para renderizar `<BreedsExplorer breeds={breeds} />` en vez de mapear `breeds` directamente.
- [x] 9. Comprobar responsive (mobile-first) y que aplica la paleta de marca — verificado con Playwright headless (viewport móvil 375px y escritorio), `pnpm build` genera las 25 rutas sin errores.
- [x] 10. Probar en el navegador: búsqueda por texto (con y sin acentos), cada filtro por separado, combinación de varios filtros a la vez, combinación filtro + texto, limpiar filtros, y el caso sin resultados — verificado con Playwright headless (no había `chromium-cli` disponible).
- [x] 11. Validar contra los criterios de aceptación de `spec.md` — confirmado por el usuario en el navegador.
- [x] 12. Mover la feature a "Hecho" en `../../constitution/roadmap.md`.
