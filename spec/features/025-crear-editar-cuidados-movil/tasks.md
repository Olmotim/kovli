# Tasks · 025 · Crear y editar cuidados desde el móvil

> Derivadas del `plan.md`. Empezamos en cuanto confirmes spec y plan.

- [x] 1. Instalar `@react-native-community/datetimepicker` en `apps/mobile` (`npx expo install ...`).
- [x] 2. Route Handler `POST /api/perros/[id]/cuidados` (añadido al archivo ya existente): valida token, comprueba perro, valida con `cuidadoSchema`, crea el cuidado.
- [x] 3. Route Handler `PATCH /api/perros/[id]/cuidados/[cuidadoId]`: valida token, comprueba perro+cuidado, valida con `cuidadoSchema`, actualiza.
- [x] 4. Componente `apps/mobile/components/FormularioCuidado.tsx` (tipo, fecha con `DateTimePicker`, notas).
- [x] 5. Pantalla `apps/mobile/app/(app)/perros/[id]/cuidados/nuevo.tsx`.
- [x] 6. Pantalla `apps/mobile/app/(app)/perros/[id]/cuidados/[cuidadoId].tsx`.
- [x] 7. Botón "+ Añadir cuidado" y filas de cuidado tocables en `apps/mobile/app/(app)/perros/[id].tsx`, más recarga de datos con `useFocusEffect`.
- [x] 8. `pnpm build` y `pnpm lint` sin errores nuevos en el monorepo.
- [ ] 9. Probar en Expo Go: crear un cuidado, verlo en la lista, editarlo, comprobar un error de validación.
- [ ] 10. Validación tuya en el dispositivo.
- [ ] 11. Mover la feature a "Hecho" en `roadmap.md`.
