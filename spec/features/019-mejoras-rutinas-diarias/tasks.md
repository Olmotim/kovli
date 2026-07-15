# Tasks · 019 · Mejoras de rutinas diarias

> Derivadas del `plan.md`. Sin infraestructura nueva. Si la 017 ya está hecha, incluye un paso extra para que su digest respete `activa`.

- [ ] 1. `packages/db/prisma/schema.prisma`: `Tarea` gana `diasSemana Int[] @default([])`, `activa Boolean @default(true)`, `orden Int @default(autoincrement())`. Migración + `npx prisma generate` a mano.
- [ ] 2. `packages/domain/src/tarea.ts`: `tocaHoy()`.
- [ ] 3. `apps/web/lib/actions/tareas.ts`: `diasSemana` en crear/editar, `pausarTareaAction`/`reactivarTareaAction`, `moverTareaAction` (con transacción).
- [ ] 4. Checklist de "Rutinas de hoy": filtrar por `activa` + `tocaHoy()`, ordenar por `orden`.
- [ ] 5. `TareaForm.tsx`: checkboxes de días de la semana.
- [ ] 6. Botones ↑/↓ y "Ver historial" en cada fila del checklist; botón pausar/reactivar en la edición.
- [ ] 7. Ruta `/cuenta/perros/[id]/rutinas/[tareaId]/historial`.
- [ ] 8. (Si la 017 ya está hecha) Ampliar su digest para filtrar por `activa: true`.
- [ ] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] 10. Probar en el navegador: rutina solo de fin de semana (comprobar que no aparece entre semana), historial de una rutina con varios días, pausar/reactivar, reordenar con los botones.
- [ ] 11. Validación tuya en el navegador.
- [ ] 12. Mover la feature a "Hecho" en `roadmap.md`.
