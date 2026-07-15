# Tasks · 015 · Diario personal

> Derivadas del `plan.md`. Sin pasos de infraestructura nuevos (reutiliza el bucket `fotos-perros` de la 012, sin credenciales ni dependencias nuevas).

- [x] 1. `packages/db/prisma/schema.prisma`: modelo `EntradaDiario` (`usuarioId`, `perroId` con relación a `Perro` y `onDelete: Cascade`, `fecha`, `texto`, `fotos: String[]`, `createdAt`/`updatedAt`, índices) + campo inverso `entradasDiario` en `Perro`.
- [x] 2. Migración: `prisma migrate dev --name crear_tabla_entrada_diario`, seguida de `npx prisma generate` a mano.
- [x] 3. Refactor: mover `extensionDeArchivo()` de `apps/web/lib/actions/perros.ts` a `apps/web/lib/storage.ts`, actualizar el import en `perros.ts`.
- [x] 4. `packages/schemas/src/diario.ts`: `entradaDiarioSchema` (fecha obligatoria, texto opcional).
- [x] 5. `apps/web/lib/actions/diario.ts`: `subirFotos`, `borrarFotos`, `crearEntradaAction`, `actualizarEntradaAction`, `borrarEntradaAction` — con la validación de "texto o foto, no ambos vacíos" y el tope de 5 fotos.
- [x] 6. Rutas: `/cuenta/perros/[id]/diario/nueva` (alta) y `/cuenta/perros/[id]/diario/[entradaId]` (editar/borrar).
- [x] 7. Componentes en `apps/web/components/diario/`: `EntradaDiarioForm.tsx` (con `CampoFotosDiario`), `FilaEntradaDiario.tsx`, `BotonBorrarEntrada.tsx`.
- [x] 8. Ficha de perro (`/cuenta/perros/[id]/page.tsx`): sección "Diario" con las entradas ordenadas por fecha descendente.
- [x] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 10. Probar en el navegador: crear entradas solo texto / solo fotos / ambos, comprobar el orden, editar (quitar y añadir foto a la vez), borrar (comprobar que las fotos desaparecen del Storage), y confirmar que no se accede a entradas de otro usuario.
- [x] 11. Validación tuya en el navegador.
- [x] 12. Mover la feature a "Hecho" en `roadmap.md`.
