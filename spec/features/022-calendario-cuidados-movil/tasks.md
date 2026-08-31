# Tasks · 022 · Calendario de cuidados en el móvil

> Derivadas del `plan.md`. Empezamos en cuanto confirmes spec y plan.

- [x] 1. Route Handler `apps/web/app/api/perros/[id]/cuidados/route.ts` (GET): valida token, comprueba que el perro es del usuario, devuelve `{ perro, proximos, historial }` con el estado ya calculado.
- [x] 2. Pantalla de detalle `apps/mobile/app/(app)/perros/[id].tsx`: llama a la API, pinta "Próximos"/"Historial", mensaje si no hay cuidados.
- [x] 3. Enlace desde cada fila de "Mis perros" (`apps/mobile/app/(app)/index.tsx`) a la pantalla de detalle.
- [x] 4. `pnpm build` y `pnpm lint` sin errores nuevos en el monorepo.
- [ ] 5. Probar en Expo Go: Mis perros → detalle de un perro con cuidados → volver.
- [ ] 6. Validación tuya en el dispositivo.
- [ ] 7. Mover la feature a "Hecho" en `roadmap.md`.
