# 006 · Organizaciones de ayuda y/o adopción — Tareas

- [x] 1. Investigar organizaciones reales de España y Argentina (protectoras, rescate, adopción), 4-5 por país, con enlace oficial verificado (que la web responda y sea la organización correcta) — proponer la lista al usuario y esperar su OK antes de escribir datos.
- [x] 2. Crear `apps/web/data/organizaciones.ts`: `type Pais`, `interface Organizacion` (`nombre`, `ciudad`, `categoria`, `enlace`, `pais`) y el array con las organizaciones acordadas.
- [x] 3. Escribir la función pura `iniciales(nombre)` (primeras letras de las dos primeras palabras, mayúsculas).
- [x] 4. Crear `apps/web/components/home/Organizaciones.tsx` (Client Component): estado `paisActivo`, pestañas calculadas a partir de los países presentes en los datos ("Todos" + uno por país).
- [x] 5. Renderizar la lista: agrupada por país (encabezado + filas) cuando `paisActivo === "todos"`; solo la lista del país, sin encabezado, cuando hay uno seleccionado.
- [x] 6. Renderizar cada fila: insignia con iniciales, nombre, "Ciudad · Categoría", botón "Ver más" (`<a target="_blank" rel="noopener noreferrer">` con `aria-label` indicando pestaña nueva).
- [x] 7. Integrar `<Organizaciones />` en `apps/web/app/page.tsx`, después de `<Secciones />`.
- [x] 8. Comprobar responsive (mobile-first) y que aplica la paleta de marca — verificado con Playwright (375px y escritorio); en móvil la fila queda algo compacta pero legible y sin roturas.
- [x] 9. Probar en el navegador: pestaña "Todos" (agrupado por país), cada pestaña de país por separado, que los enlaces "Ver más" abren en pestaña nueva y van a la web correcta — verificado con Playwright headless.
- [x] 10. Validar contra los criterios de aceptación de `spec.md` — confirmado por el usuario en el navegador.
- [x] 11. Mover la feature a "Hecho" en `../../constitution/roadmap.md`.
