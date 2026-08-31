# 025 · Crear y editar cuidados desde el móvil — Plan

> Respeta `constitution/tech-stack.md`. Una dependencia nueva (`@react-native-community/datetimepicker`), con tu OK ya dado.

## Enfoque

Dos Route Handlers nuevos en `apps/web` (crear y editar) que reutilizan `cuidadoSchema` de `@kovli/schemas` — el mismo esquema Zod que ya validan `crearCuidadoAction`/`actualizarCuidadoAction` en la web, así que no hay reglas de validación nuevas que mantener en paralelo. En `apps/mobile`, un único componente de formulario reutilizado por las pantallas de crear y editar.

## Implementación

1. **Instalar la dependencia** (con tu OK ya dado): `npx expo install @react-native-community/datetimepicker` en `apps/mobile` — el comando de Expo elige la versión exacta compatible con el SDK 57, igual que se hizo con las dependencias de la 021.
2. **Route Handler de creación** `apps/web/app/api/perros/[id]/cuidados/route.ts` (añade método `POST` al archivo ya existente, que hoy solo tiene `GET`):
   - Auth igual que las demás APIs del móvil.
   - `prisma.perro.findFirst({ where: { id, usuarioId: user.id } })` — 404 si no es del usuario.
   - Lee el body JSON (`{ tipo, tipoLibre, fecha, notas }`), lo valida con `cuidadoSchema.safeParse(...)` — si falla, `400` con `error.flatten().fieldErrors`.
   - `prisma.cuidado.create({ data: { usuarioId: user.id, perroId: id, ...datos } })`.
   - Devuelve `201` con el cuidado creado.
3. **Route Handler de edición** `apps/web/app/api/perros/[id]/cuidados/[cuidadoId]/route.ts` (método `PATCH`):
   - Auth igual.
   - `prisma.cuidado.findFirst({ where: { id: cuidadoId, perroId: id, usuarioId: user.id } })` — 404 si no coincide.
   - Misma validación con `cuidadoSchema`.
   - `prisma.cuidado.update(...)`, devuelve `200` con el cuidado actualizado.
4. **Componente de formulario compartido** (`apps/mobile/components/FormularioCuidado.tsx`): tipo (4 botones tipo chip: Vacuna/Desparasitación/Revisión/Otro, con `TextInput` adicional si se elige "Otro"), fecha (`DateTimePicker` en modo `date`, mostrando la fecha elegida en un botón que abre el selector), notas (`TextInput multiline`). Recibe valores iniciales opcionales (para editar) y una función `onGuardar(datos)` — no sabe nada de la API, solo del formulario.
5. **Pantalla de creación** `apps/mobile/app/(app)/perros/[id]/cuidados/nuevo.tsx`: monta el formulario vacío, `onGuardar` hace `POST` y, si va bien, `router.back()`.
6. **Pantalla de edición** `apps/mobile/app/(app)/perros/[id]/cuidados/[cuidadoId].tsx`: recibe los datos del cuidado ya cargados **por parámetros de navegación** (el enlace desde la fila de cuidado en la pantalla de detalle ya tiene esos datos en memoria, evita una llamada de red extra solo para precargar un formulario) en vez de pedirlos otra vez a la API; `onGuardar` hace `PATCH` y, si va bien, `router.back()`.
7. **Cambios en la pantalla de detalle** (`apps/mobile/app/(app)/perros/[id].tsx`):
   - Botón "+ Añadir cuidado" que navega a `.../cuidados/nuevo`.
   - Cada `FilaCuidado` pasa a ser un `<Link>` a `.../cuidados/[cuidadoId]` con los datos del cuidado como parámetros.
   - La lista de cuidados se recarga también al **volver a ganar el foco** la pantalla (`useFocusEffect` de `expo-router`, no solo al montar) — si no, crear o editar un cuidado y volver atrás no actualizaría la lista sin cerrar y reabrir la pantalla.
8. Verificar `pnpm build`/`pnpm lint` en el resto del monorepo.
9. Probar en Expo Go: crear un cuidado nuevo, verlo aparecer en la lista, editarlo, comprobar el cambio; probar también un error de validación (dejar el tipo sin elegir, o "otro" sin texto).

## Decisiones (cerradas contigo)

- Crear y editar, sin borrar.
- Campos básicos (tipo, fecha, notas), sin recurrencia ni adjuntos.
- `@react-native-community/datetimepicker` para el selector de fecha.
- Los datos para precargar el formulario de edición viajan por parámetros de navegación (ya están en memoria desde la pantalla de detalle), sin una llamada de red aparte para "obtener un solo cuidado".

## Riesgos

- Primer formulario real de la app móvil — más piezas de estado (varios campos, validación, error) que cualquier pantalla anterior; se mantiene en un único componente reutilizado por crear/editar para no duplicar esa lógica.
- `DateTimePicker` se comporta distinto en iOS y Android (Android lo abre como diálogo modal que se cierra solo al elegir fecha; iOS lo muestra inline o como rueda) — hay que probarlo en el dispositivo real que uses, no asumir que se comporta igual en ambos.
