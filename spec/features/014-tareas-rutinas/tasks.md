# Tasks · 014 · Tareas / rutinas diarias

> Derivadas del `plan.md`. Sin pasos de infraestructura nuevos (ni credenciales, ni bucket, ni dependencia nueva).

- [x] 1. `packages/db/prisma/schema.prisma`: modelos `Tarea` (`usuarioId`, `perroId` con relación a `Perro` y `onDelete: Cascade`, `nombre`, `createdAt`/`updatedAt`, índices en `usuarioId`/`perroId`) y `TareaCompletada` (`tareaId` con relación a `Tarea` y `onDelete: Cascade`, `fecha` solo día, `createdAt`, `@@unique([tareaId, fecha])`).
- [x] 2. Migración: `prisma migrate dev --name crear_tabla_tarea`, seguida de `npx prisma generate` a mano.
- [x] 3. `packages/domain/src/tarea.ts`: `inicioDelDia()` y `resumenRutinasHoy()`.
- [x] 4. `packages/schemas/src/tarea.ts`: `tareaSchema`.
- [x] 5. `apps/web/lib/actions/tareas.ts`: `crearTareaAction`, `actualizarTareaAction`, `borrarTareaAction`, `marcarTareaAction` (esta última con `revalidatePath()`, sin `redirect()`).
- [x] 6. Rutas: `/cuenta/perros/[id]/rutinas/nueva` (alta) y `/cuenta/perros/[id]/rutinas/[tareaId]` (editar/borrar).
- [x] 7. Ficha de perro (`/cuenta/perros/[id]/page.tsx`): sección "Rutinas de hoy" con checklist (casilla que se envía sola al cambiar).
- [x] 8. `/cuenta/page.tsx`: resumen "x/y hechas hoy" por perro, junto al resumen de cuidados ya existente.
- [x] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 10. Probar en el navegador: crear rutinas, marcar/desmarcar sin salir de la página, comprobar el resumen en `/cuenta`, editar nombre, borrar, y confirmar que no se accede a rutinas de otro usuario.
- [x] 11. Validación tuya en el navegador.
- [x] 12. Mover la feature a "Hecho" en `roadmap.md`.
