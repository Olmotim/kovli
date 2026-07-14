# 014 · Tareas / rutinas diarias — Plan

> Respeta `constitution/tech-stack.md`. Reutiliza la infraestructura de Prisma ya montada en la 012/013 — sin dependencias nuevas.

## Enfoque

Dos tablas, separando "qué rutinas existen" de "qué días se hicieron": `Tarea` (la definición) y `TareaCompletada` (una fila por cada día marcado, con restricción de unicidad `(tareaId, fecha)`). El estado de "hecha hoy" nunca se guarda como booleano — se calcula en cada consulta comprobando si existe una `TareaCompletada` con `fecha` = hoy.

Como `Cuidado` en la 013, `Tarea` tiene su propio `usuarioId` (denormalizado) y una relación real (`@relation`, `onDelete: Cascade`) a `Perro`. `TareaCompletada` no necesita su propio `usuarioId`: siempre se llega a ella a través de una `Tarea` ya verificada como del usuario, así que basta con `onDelete: Cascade` hacia `Tarea`.

**Pieza nueva de verdad:** marcar/desmarcar una rutina no navega a ninguna parte (a diferencia de crear/editar/borrar, que sí redirigen). Es la primera Server Action del proyecto que usa `revalidatePath()` en vez de `redirect()` — se queda en la misma página, solo refresca los datos.

## Implementación

1. **`schema.prisma`**:
   - `model Tarea`: `id`, `usuarioId`, `perroId` (`@relation` a `Perro`, `onDelete: Cascade`), `nombre`, `createdAt`/`updatedAt`, relación inversa `completadas TareaCompletada[]`. Índices en `usuarioId` y `perroId`.
   - `model TareaCompletada`: `id`, `tareaId` (`@relation` a `Tarea`, `onDelete: Cascade`), `fecha` (`@db.Date`, solo día — sin componente de hora, para que la unicidad por día funcione bien), `createdAt`. `@@unique([tareaId, fecha])`.
2. **Migración**: `prisma migrate dev --name crear_tabla_tarea`, y `npx prisma generate` a mano después (repitiendo la lección de la 013: no asumir que `migrate dev` deja el cliente regenerado solo).
3. **`packages/domain/src/tarea.ts`**:
   - `inicioDelDia(fecha: Date): Date` — trunca a medianoche local. Se usa tanto para guardar `fecha` al marcar como hecha como para consultar "¿hay una marca de hoy?", así ambos lados comparan el mismo valor exacto sin depender de la hora del día.
   - `resumenRutinasHoy(tareas: { completadaHoy: boolean }[]): { hechas: number; total: number }` — cuenta simple, usada tanto en la ficha del perro como en `/cuenta`.
4. **`packages/schemas/src/tarea.ts`**: `tareaSchema` con Zod — `nombre` obligatorio, recortado, con longitud máxima razonable.
5. **`apps/web/lib/actions/tareas.ts`**:
   - `crearTareaAction`, `actualizarTareaAction`, `borrarTareaAction` — mismo patrón que `cuidados.ts` (verifican usuario, dueño del perro al crear, dueño de la tarea al editar/borrar) y redirigen a la ficha del perro.
   - `marcarTareaAction(tareaId: string)`: verifica que la tarea es del usuario, calcula `inicioDelDia(new Date())`, busca si ya existe una `TareaCompletada` para (`tareaId`, hoy) — si existe la borra (desmarcar), si no la crea (marcar). Termina con `revalidatePath()` sobre la ficha del perro, sin `redirect()`.
6. **Rutas**: `/cuenta/perros/[id]/rutinas/nueva` (alta) y `/cuenta/perros/[id]/rutinas/[tareaId]` (editar nombre / borrar) — mismo patrón de páginas que `cuidados`.
7. **Ficha de perro** (`/cuenta/perros/[id]/page.tsx`): nueva sección "Rutinas de hoy" debajo de "Cuidados". Consulta `prisma.tarea.findMany({ where: { perroId }, include: { completadas: { where: { fecha: inicioDelDia(hoy) } } } })`; cada tarea es "hecha hoy" si `completadas.length > 0`. Cada fila es un `<form>` con una casilla (`type="checkbox"`) que se envía sola al cambiar (`onChange` → `requestSubmit()`), llamando a `marcarTareaAction` — mismo estilo de `<form action={...}>` que ya usa el resto de la app, sin introducir un patrón de invocación directa desde cliente.
8. **`/cuenta/page.tsx`**: por perro, la misma consulta con `completadas` filtradas a hoy, y `resumenRutinasHoy()` para mostrar "x/y hechas hoy" junto al resumen de cuidados ya existente.
9. Verificar `pnpm build`/`pnpm lint`, y probar en el navegador: crear rutinas, marcar/desmarcar sin salir de la página, comprobar que al día siguiente (o cambiando la fecha del sistema, si hace falta forzarlo) vuelve a aparecer sin marcar, editar nombre, borrar, y confirmar que no se accede a rutinas de otro usuario.

## Decisiones (cerradas contigo)

- Modelo de dos tablas, recurrencia diaria fija, alcance por perro, nombre libre, sección en la ficha + resumen en `/cuenta`: ver `spec.md`.
- `TareaCompletada` sin `usuarioId` propio (se llega siempre a través de una `Tarea` ya verificada) — asimetría deliberada respecto a `Cuidado`, que si lleva `usuarioId` propio porque se consulta directamente por su `id` sin pasar antes por su padre.
- Marcar/desmarcar usa `revalidatePath()`, no `redirect()` — primera vez en el proyecto; te lo explico en el momento con más detalle si quieres profundizar antes de que lo escriba.

## Riesgos

- `fecha` en `TareaCompletada` debe compararse siempre con el mismo punto exacto del día (medianoche local) tanto al crear como al consultar — si en algún sitio se usa `new Date()` sin pasar por `inicioDelDia()`, la comparación de igualdad fallaría silenciosamente y una tarea parecería "no hecha" aunque se haya marcado. Toda la lógica de fecha pasa por esa única función.
- Igual que en la 013: primera vez que se toca este par de tablas nuevas, doble verificación de propiedad (perro del usuario, tarea del perro correcto) en cada Server Action.
