# Tasks · 020 · Mejoras del diario personal

> Derivadas del `plan.md`. Sin infraestructura ni dependencias nuevas.

- [x] 1. `packages/db/prisma/schema.prisma`: `EntradaDiario` gana `etiquetas String[] @default([])`. Migración + `npx prisma generate` a mano.
- [x] 2. `packages/domain/src/diario.ts`: `ultimaEntrada()`.
- [x] 3. `apps/web/lib/actions/diario.ts`: `etiquetas` en crear/editar, `moverFotoEntradaAction`.
- [x] 4. `/cuenta/page.tsx`: resumen de última entrada por perro.
- [x] 5. `CampoFotosDiario.tsx`: botones ↑/↓ en las fotos ya guardadas.
- [x] 6. Ruta `/cuenta/perros/[id]/diario/imprimir` con estilos `@media print`.
- [x] 7. `FilaEntradaDiario.tsx`: mostrar etiquetas como chips.
- [x] 8. `EntradaDiarioForm.tsx`: campo de etiquetas.
- [x] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 10. Probar en el navegador: resumen en `/cuenta`, reordenar fotos de una entrada, vista imprimible (vista previa de impresión del navegador), añadir y ver etiquetas.
- [x] 11. Validación tuya en el navegador.
- [x] 12. Mover la feature a "Hecho" en `roadmap.md`.
