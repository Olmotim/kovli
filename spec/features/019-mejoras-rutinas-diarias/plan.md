# 019 · Mejoras de rutinas diarias — Plan

> Respeta `constitution/tech-stack.md`. Si la 017 (recordatorios) ya está hecha, hay que volver a tocar su digest para que respete `activa` — anotado como dependencia cruzada, no bloqueante para empezar esta feature.

## Enfoque

Tres campos nuevos en `Tarea`, cada uno resuelto con una función pura en `packages/domain` para no meter la lógica en los componentes: `tocaHoy()` para días de la semana, y el resto son consultas/ordenamientos directos.

## Implementación

1. **`schema.prisma`**: `Tarea` gana `diasSemana Int[] @default([])`, `activa Boolean @default(true)`, `orden Int @default(autoincrement())`. El `@default(autoincrement())` en un campo que no es `@id` crea una columna serial en Postgres — resuelve solo, sin script de migración de datos, que las rutinas ya existentes reciban un `orden` correlativo según su orden de creación en la base de datos. Migración `añadir_dias_semana_activa_orden_a_tarea`, seguida de `npx prisma generate` a mano.
2. **`packages/domain/src/tarea.ts`**: `tocaHoy(diasSemana: number[], hoy = new Date()): boolean` — `diasSemana.length === 0 || diasSemana.includes(hoy.getDay())` (pura, fácil de testear con Vitest para los 7 días de la semana).
3. **Checklist de "Rutinas de hoy"** (`/cuenta/perros/[id]/page.tsx`): la consulta de tareas añade `where: { activa: true }` y `orderBy: { orden: "asc" }` (en vez de `createdAt`); tras traerlas, se filtran en memoria con `tocaHoy(tarea.diasSemana, hoy)` (no se puede expresar "¿el array incluye el día de hoy, o está vacío?" fácilmente en una única condición de Prisma sin complicar la consulta, y la lista de un usuario es pequeña — filtrar en memoria es más simple y sigue siendo barato).
4. **`apps/web/lib/actions/tareas.ts`**:
   - `crearTareaAction`/`actualizarTareaAction` aceptan `diasSemana` (`formData.getAll("diasSemana")`, checkboxes de lunes a domingo).
   - `pausarTareaAction(id)` / `reactivarTareaAction(id)`: togglean `activa`, con `revalidatePath` (no navegan), mismo patrón que `marcarTareaAction` de la 014.
   - `moverTareaAction(id, direccion: "arriba" | "abajo")`: busca la tarea vecina en `orden` (mayor o menor, según dirección) dentro del mismo perro, e intercambia los dos valores de `orden` en una transacción (`prisma.$transaction`) para que nunca queden dos tareas con el mismo `orden` a medio camino.
5. **Ruta de historial** (`/cuenta/perros/[id]/rutinas/[tareaId]/historial`): `prisma.tareaCompletada.findMany({ where: { tareaId, fecha: { gte: hace30Dias } }, orderBy: { fecha: "desc" } })`, lista de fechas con un icono de hecho/no hecho (comparando contra los últimos 30 días generados en código, no solo las filas que existen, para que los días sin marcar también se vean como "no hecho" y no como ausentes).
6. **UI**: checkboxes de días de la semana en `TareaForm.tsx`; botón pausar/reactivar en la página de edición; botones ↑/↓ junto a cada fila del checklist (dos formularios pequeños, mismo patrón que `CasillaTarea`); enlace "Ver historial" en cada fila.
7. **Dependencia cruzada con la 017** (si ya está implementada): su digest de email debe añadir `activa: true` al filtrar tareas pendientes, igual que el checklist — si la 019 se hace después de la 017, hay que volver a tocar esa Route Handler.
8. Verificar `pnpm build`/`pnpm lint`; probar en el navegador.

## Decisiones (cerradas contigo)

- `diasSemana` vacío = diaria (compatibilidad hacia atrás).
- Pausar conserva el historial.
- Reordenar con botones ↑/↓, sin drag-and-drop.

## Riesgos

- El intercambio de `orden` entre dos tareas debe ir en una transacción — si se hicieran dos `update` sueltos y el proceso fallara entre medias, podrían quedar dos tareas con el mismo `orden` (no rompe nada visualmente grave, pero el orden dejaría de ser fiable).
- Si la 017 ya está en producción cuando se hace esta feature, no olvidar el paso 7 — de lo contrario, una rutina pausada seguiría apareciendo en el email de recordatorio aunque ya no aparezca en la web, una inconsistencia confusa para el usuario.
