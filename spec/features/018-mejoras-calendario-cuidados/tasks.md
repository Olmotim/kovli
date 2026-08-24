# Tasks · 018 · Mejoras del calendario de cuidados

> Derivadas del `plan.md`. Requiere la 017 ya implementada (reutiliza su Route Handler de cron) — si se hace antes, crear ahí un cron mínimo que esta feature amplía.

- [x] 1. `packages/db/prisma/schema.prisma`: `Cuidado` gana `repiteCadaMeses Int?` y `archivos String[]`. Migración + `npx prisma generate` a mano.
- [x] 2. `packages/domain/src/cuidado.ts`: `siguienteFechaRecurrencia()`.
- [x] 3. `packages/domain/src/calendario.ts`: `diasDelMes()`.
- [x] 4. Ampliar `apps/web/app/api/cron/recordatorios/route.ts` con el paso de generación de recurrencias.
- [x] 5. Generalizar `subirFotos`/`borrarFotos` de `diario.ts` a algo reutilizable desde `cuidados.ts` (`accept="image/*,application/pdf"`) — movidas a `apps/web/lib/storage.ts` como `subirArchivos`/`borrarArchivos`.
- [x] 6. `apps/web/lib/actions/cuidados.ts`: aceptar archivos adjuntos y `perrosAdicionales` en `crearCuidadoAction`.
- [x] 7. `CuidadoForm.tsx`: campo de recurrencia, campo de archivos, checkboxes de "aplicar también a".
- [x] 8. Nueva ruta `/cuenta/perros/[id]/cuidados/calendario` con navegación mensual.
- [x] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 10. Probar en el navegador: crear cuidado recurrente y forzar su vencimiento para comprobar que el cron genera el siguiente (y no lo duplica si se llama dos veces); navegar el calendario; adjuntar/quitar archivos; crear un cuidado para varios perros.
- [x] 11. Validación tuya en el navegador.
- [x] 12. Mover la feature a "Hecho" en `roadmap.md`.
