# Tasks · 018 · Mejoras del calendario de cuidados

> Derivadas del `plan.md`. Requiere la 017 ya implementada (reutiliza su Route Handler de cron) — si se hace antes, crear ahí un cron mínimo que esta feature amplía.

- [ ] 1. `packages/db/prisma/schema.prisma`: `Cuidado` gana `repiteCadaMeses Int?` y `archivos String[]`. Migración + `npx prisma generate` a mano.
- [ ] 2. `packages/domain/src/cuidado.ts`: `siguienteFechaRecurrencia()`.
- [ ] 3. `packages/domain/src/calendario.ts`: `diasDelMes()`.
- [ ] 4. Ampliar `apps/web/app/api/cron/recordatorios/route.ts` con el paso de generación de recurrencias.
- [ ] 5. Generalizar `subirFotos`/`borrarFotos` de `diario.ts` a algo reutilizable desde `cuidados.ts` (`accept="image/*,application/pdf"`).
- [ ] 6. `apps/web/lib/actions/cuidados.ts`: aceptar archivos adjuntos y `perrosAdicionales` en `crearCuidadoAction`.
- [ ] 7. `CuidadoForm.tsx`: campo de recurrencia, campo de archivos, checkboxes de "aplicar también a".
- [ ] 8. Nueva ruta `/cuenta/perros/[id]/cuidados/calendario` con navegación mensual.
- [ ] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] 10. Probar en el navegador: crear cuidado recurrente y forzar su vencimiento para comprobar que el cron genera el siguiente (y no lo duplica si se llama dos veces); navegar el calendario; adjuntar/quitar archivos; crear un cuidado para varios perros.
- [ ] 11. Validación tuya en el navegador.
- [ ] 12. Mover la feature a "Hecho" en `roadmap.md`.
