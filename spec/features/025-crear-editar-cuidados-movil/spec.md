# 025 · Crear y editar cuidados desde el móvil

**Estado:** especificada — spec y plan cerrados, sin código todavía.

## Qué hace

Quinta pieza de Fase 3: además de ver los cuidados de un perro (022), desde el móvil se puede **crear uno nuevo** y **editar uno ya existente** — tipo, fecha y notas, los mismos tres campos que la versión original del formulario en la web (013).

Es la primera vez que el móvil manda un formulario completo a `apps/web` (a diferencia de la 023, que solo alternaba un booleano).

## Por qué

De las mejoras posibles en Fase 3, crear/editar cuidados es la más completa técnicamente sin ser tan grande como el diario (que necesitaría subir fotos): un formulario con tres campos sencillos, sin archivos de por medio.

## Criterios de aceptación

- [ ] La sección "Cuidados" de la pantalla de detalle de perro tiene un botón "+ Añadir cuidado" que lleva a un formulario nuevo.
- [ ] Cada fila de cuidado ya existente es tocable y lleva a ese mismo formulario, precargado con sus datos, para editarlo.
- [ ] El formulario (`apps/mobile/app/(app)/perros/[id]/cuidados/nuevo.tsx` para crear, `.../cuidados/[cuidadoId].tsx` para editar) tiene: tipo (vacuna/desparasitación/revisión/otro, con campo de texto libre si se elige "otro"), fecha (selector de fecha nativo) y notas (texto libre, opcional).
- [ ] Nueva API `POST /api/perros/[id]/cuidados` en `apps/web` que crea el cuidado, validando con el mismo `cuidadoSchema` de `packages/schemas` que ya usa la web.
- [ ] Nueva API `PATCH /api/perros/[id]/cuidados/[cuidadoId]` que edita un cuidado ya existente, con la misma validación.
- [ ] Ambas APIs comprueban el token de sesión y que el perro (y el cuidado, al editar) son del usuario autenticado — 401/404 si no.
- [ ] Errores de validación del formulario se muestran en la pantalla (p. ej. "Elige un tipo de cuidado").
- [ ] Al guardar con éxito, se vuelve a la pantalla de detalle de perro y el cuidado nuevo/editado aparece en la lista sin tener que cerrar y reabrir la app.
- [ ] `pnpm build` y `pnpm lint` siguen sin errores nuevos en el resto del monorepo.
- [ ] Validado por ti en Expo Go.

## Fuera de alcance

- Borrar un cuidado desde el móvil — se sigue haciendo desde la web.
- Recurrencia automática, adjuntar archivos y "aplicar también a otros perros" (las 3 mejoras de la 018) — solo los 3 campos básicos de la 013.
- Crear/editar rutinas o entradas de diario desde el móvil — quedan fuera de esta pieza.

## Decisiones (cerradas contigo)

- Crear y editar, sin borrar por ahora.
- Solo los 3 campos básicos (tipo, fecha, notas), sin recurrencia ni adjuntos.
- Nueva dependencia: `@react-native-community/datetimepicker` (selector de fecha nativo), instalada con tu OK explícito.
