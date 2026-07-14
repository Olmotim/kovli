# Tasks · 013 · Calendario de cuidados

> Derivadas del `plan.md`. A diferencia de la 012, no hay ningún paso de infraestructura nuevo (ni credenciales, ni bucket, ni dependencia nueva) — toda la feature es código sobre lo ya montado.

- [x] 1. `packages/db/prisma/schema.prisma`: enum `TipoCuidado` y modelo `Cuidado` (`usuarioId`, `perroId` con relación a `Perro` y `onDelete: Cascade`, `tipo`, `tipoLibre`, `fecha`, `notas`, `createdAt`/`updatedAt`, índices en `usuarioId` y `perroId`).
- [x] 2. Migración: `prisma migrate dev --name crear_tabla_cuidado`.
- [x] 3. `packages/domain/src/cuidado.ts`: `estadoCuidado()` y `proximoCuidado()`.
- [x] 4. `packages/schemas/src/cuidado.ts`: `cuidadoSchema` (con `.refine()` para exigir `tipoLibre` cuando `tipo === "otro"`).
- [x] 5. `apps/web/lib/actions/cuidados.ts`: `crearCuidadoAction`, `actualizarCuidadoAction`, `borrarCuidadoAction` — comprobando usuario, dueño del perro y dueño del cuidado en cada una.
- [x] 6. Rutas: `/cuenta/perros/[id]/cuidados/nuevo` (alta) y `/cuenta/perros/[id]/cuidados/[cuidadoId]` (editar/borrar).
- [x] 7. Ficha de perro (`/cuenta/perros/[id]/page.tsx`): sección "Cuidados" con bloques "Próximos" e "Historial", destacado visual según `estadoCuidado()`.
- [x] 8. `/cuenta/page.tsx`: resumen de próximo/vencido por perro con `proximoCuidado()`.
- [x] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 10. Probar en el navegador: crear cuidados de varios tipos (incluido "otro"), ver próximos/historial en la ficha, ver el resumen en `/cuenta`, editar, borrar, y confirmar que no se accede a cuidados de otro usuario ni se puede colar un `perroId` ajeno.
- [x] 11. Validación tuya en el navegador.
- [x] 12. Mover la feature a "Hecho" en `roadmap.md`.
