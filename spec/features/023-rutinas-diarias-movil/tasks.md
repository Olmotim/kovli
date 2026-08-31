# Tasks · 023 · Rutinas diarias en el móvil

> Derivadas del `plan.md`. Empezamos en cuanto confirmes spec y plan.

- [x] 1. Route Handler `apps/web/app/api/perros/[id]/rutinas/route.ts` (GET): valida token, comprueba que el perro es del usuario, devuelve las rutinas activas de hoy con su `hecha`.
- [x] 2. Route Handler `apps/web/app/api/perros/[id]/rutinas/[tareaId]/marcar/route.ts` (POST): valida token, comprueba que la rutina es de ese perro y usuario, alterna la marca de hoy, devuelve el nuevo `hecha`.
- [x] 3. Sección "Rutinas de hoy" en `apps/mobile/app/(app)/perros/[id].tsx`: pinta el checklist, tocar una fila llama al endpoint de marcar y actualiza el estado local.
- [x] 4. `pnpm build` y `pnpm lint` sin errores nuevos en el monorepo.
- [x] 5. Probar en Expo Go: ver rutinas de hoy, marcar una, desmarcarla, comprobar que persiste al reabrir la pantalla.
- [x] 6. Validación tuya en el dispositivo.
- [x] 7. Mover la feature a "Hecho" en `roadmap.md`.
