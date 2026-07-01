# 003 · Cursor hocico + enlaces con huella — Tareas

> Derivadas del `plan.md`.

- [x] Diseñar el hocico y la huella en SVG, revisados a tamaño real de cursor (32px) antes de convertirlos.
- [x] Convertir a PNG 32×32 con `sharp` (`public/cursores/hocico.png`, `public/cursores/huella.png`).
- [x] Reglas CSS en `globals.css` dentro de `@media (pointer: fine)`: hocico en `body`, huella en cualquier `a[href]`.
- [x] Verificar que los botones que no navegan (CTA "Descarga la app", menú hamburguesa) mantienen el cursor normal.
- [x] Verificar con `tsc` y `pnpm build` que no rompe nada.
- [x] Confirmación visual del usuario probándolo él mismo en el navegador (Playwright no puede capturar el cursor real del sistema operativo).
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.
