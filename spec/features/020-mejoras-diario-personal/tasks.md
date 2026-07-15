# Tasks · 020 · Mejoras del diario personal

> Derivadas del `plan.md`. Sin infraestructura ni dependencias nuevas.

- [ ] 1. `packages/db/prisma/schema.prisma`: `EntradaDiario` gana `etiquetas String[] @default([])`. Migración + `npx prisma generate` a mano.
- [ ] 2. `packages/domain/src/diario.ts`: `ultimaEntrada()`.
- [ ] 3. `apps/web/lib/actions/diario.ts`: `etiquetas` en crear/editar, `moverFotoEntradaAction`.
- [ ] 4. `/cuenta/page.tsx`: resumen de última entrada por perro.
- [ ] 5. `CampoFotosDiario.tsx`: botones ↑/↓ en las fotos ya guardadas.
- [ ] 6. Ruta `/cuenta/perros/[id]/diario/imprimir` con estilos `@media print`.
- [ ] 7. `FilaEntradaDiario.tsx`: mostrar etiquetas como chips.
- [ ] 8. `EntradaDiarioForm.tsx`: campo de etiquetas.
- [ ] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] 10. Probar en el navegador: resumen en `/cuenta`, reordenar fotos de una entrada, vista imprimible (vista previa de impresión del navegador), añadir y ver etiquetas.
- [ ] 11. Validación tuya en el navegador.
- [ ] 12. Mover la feature a "Hecho" en `roadmap.md`.
