# Tasks · 024 · Diario personal en el móvil

> Derivadas del `plan.md`. Empezamos en cuanto confirmes spec y plan.

- [x] 1. Route Handler `apps/web/app/api/perros/[id]/diario/route.ts` (GET): valida token, comprueba que el perro es del usuario, devuelve las entradas con las fotos ya como URL pública.
- [x] 2. Enlace "Diario" en `apps/mobile/app/(app)/perros/[id].tsx`.
- [x] 3. Pantalla `apps/mobile/app/(app)/perros/[id]/diario.tsx`: lista de entradas (fecha, texto, etiquetas, fotos), mensaje si no hay ninguna.
- [x] 4. `pnpm build` y `pnpm lint` sin errores nuevos en el monorepo.
- [x] 5. Probar en Expo Go: entrar al diario de un perro con entradas variadas, comprobar que se ven bien, volver.
- [x] 6. Validación tuya en el dispositivo.
- [x] 7. Mover la feature a "Hecho" en `roadmap.md`.
