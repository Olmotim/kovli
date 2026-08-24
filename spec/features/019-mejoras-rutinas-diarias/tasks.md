# Tasks · 019 · Mejoras de rutinas diarias

> Derivadas del `plan.md`. Sin infraestructura nueva. Si la 017 ya está hecha, incluye un paso extra para que su digest respete `activa`.

- [x] 1. `packages/db/prisma/schema.prisma`: `Tarea` gana `diasSemana Int[] @default([])`, `activa Boolean @default(true)`, `orden Int @default(autoincrement())`. Migración + `npx prisma generate` a mano.
- [x] 2. `packages/domain/src/tarea.ts`: `tocaHoy()`.
- [x] 3. `apps/web/lib/actions/tareas.ts`: `diasSemana` en crear/editar, `pausarTareaAction`/`reactivarTareaAction`, `moverTareaAction` (con transacción).
- [x] 4. Checklist de "Rutinas de hoy": filtrar por `activa` + `tocaHoy()`, ordenar por `orden`.
- [x] 5. `TareaForm.tsx`: checkboxes de días de la semana.
- [x] 6. Botones ↑/↓ y "Ver historial" en cada fila del checklist; botón pausar/reactivar en la edición.
- [x] 7. Ruta `/cuenta/perros/[id]/rutinas/[tareaId]/historial`.
- [x] 8. Ampliar el digest de la 017 para filtrar por `activa: true` y `tocaHoy()`.
- [x] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 10. Probar en el navegador: rutina solo de fin de semana (comprobar que no aparece entre semana), historial de una rutina con varios días, pausar/reactivar, reordenar con los botones.
- [x] 11. Validación tuya en el navegador.
- [x] 12. Mover la feature a "Hecho" en `roadmap.md`.
