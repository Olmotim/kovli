# 013 · Calendario de cuidados — Plan

> Respeta `constitution/tech-stack.md`. Reutiliza toda la infraestructura ya montada en la 012 (Prisma en `packages/db`, patrón de Server Actions filtrando por `usuarioId`) — no se añade ninguna dependencia nueva.

## Enfoque

Una tabla nueva, `Cuidado`, ligada a `Perro` por `perroId`. Mismo patrón de seguridad que `Perro`: también lleva su propio `usuarioId` (aunque ya se podría deducir a través de `perro.usuarioId`, guardarlo aparte evita tener que hacer un `join` en cada Server Action para comprobar el dueño — es la misma idea que ya usa `Perro`, solo que aquí hay un nivel más de anidamiento).

Toda la lógica de "¿este cuidado es próximo, vencido o lejano?" es una función pura en `packages/domain` (no en los componentes), para poder reutilizarla tanto en la ficha del perro como en el resumen de `/cuenta`.

## Implementación

1. **`schema.prisma`**: nuevo enum `TipoCuidado` (`VACUNA` / `DESPARASITACION` / `REVISION` / `OTRO`) y modelo `Cuidado`:
   - `id`, `usuarioId`, `perroId` (relación a `Perro`, `onDelete: Cascade` — si se borra un perro, sus cuidados se borran con él, igual que ya pasa con su foto), `tipo`, `tipoLibre` (opcional), `fecha`, `notas` (opcional), `createdAt`/`updatedAt`.
   - Índices en `usuarioId` y en `perroId` (las consultas siempre filtran por uno de los dos).
2. **Migración**: `prisma migrate dev` (tú, guiado en `tasks.md`, mismo paso que en la 012) crea la tabla y el archivo de migración versionado.
3. **`packages/domain/src/cuidado.ts`**: dos funciones puras, con tests mentales fáciles de razonar:
   - `estadoCuidado(fecha: Date, hoy = new Date()): "vencido" | "proximo" | "lejano"` — vencido si `fecha < hoy`, próximo si está dentro de los siguientes 30 días, lejano en el resto de casos. Recibe `hoy` como parámetro (con valor por defecto) en vez de usar `new Date()` directamente dentro, para que sea fácil de probar sin depender del reloj del sistema.
   - `proximoCuidado(cuidados: { fecha: Date }[]): { fecha: Date } | null` — de una lista de cuidados de un perro, calcula cuál mostrar como resumen en `/cuenta`: el vencido más antiguo si hay alguno, si no el próximo más cercano dentro de 30 días, si no `null`. Se usa tanto en `/cuenta` como, si hace falta destacar "el siguiente" dentro de la propia ficha.
4. **`packages/schemas/src/cuidado.ts`**: `cuidadoSchema` con Zod — `tipo` (enum), `tipoLibre` (opcional, pero obligatorio si `tipo === "otro"` vía `.refine()`, mismo mecanismo que ya usa el schema de `Perro` con la raza libre... aunque ahí la lógica vive en la Server Action, no en el schema — aquí conviene meterlo en el `.refine()` para no repetirlo en crear y editar), `fecha` (obligatoria), `notas` (opcional).
5. **`apps/web/lib/actions/cuidados.ts`**: `crearCuidadoAction`, `actualizarCuidadoAction`, `borrarCuidadoAction`. Mismo patrón que `perros.ts`: `getUser()` primero, y antes de crear un cuidado se comprueba que el `perroId` recibido pertenece de verdad al usuario (`prisma.perro.findFirst({ where: { id: perroId, usuarioId } })`) — si no, no se crea nada. Al editar/borrar, el filtro va directo sobre `Cuidado.usuarioId`.
6. **Rutas nuevas**:
   - `/cuenta/perros/[id]/cuidados/nuevo` — formulario de alta (mismo patrón que `/cuenta/perros/nuevo`).
   - `/cuenta/perros/[id]/cuidados/[cuidadoId]` — editar o borrar un cuidado.
7. **Ficha de perro** (`/cuenta/perros/[id]/page.tsx`): nueva sección "Cuidados" debajo de los datos existentes — lista los cuidados del perro (`prisma.cuidado.findMany({ where: { perroId }, orderBy: { fecha: "asc" } })`) separados en dos bloques, "Próximos" (fecha ≥ hoy) e "Historial" (fecha < hoy, orden descendente para ver lo más reciente primero), con `estadoCuidado()` decidiendo el color de aviso de cada fila.
8. **`/cuenta/page.tsx`**: por cada perro del listado, calcular `proximoCuidado()` a partir de sus cuidados (una sola consulta con `include: { cuidados: true }` en vez de N+1) y mostrar una línea de resumen si hay algo próximo o vencido.
9. Verificar `pnpm build`/`pnpm lint`, y probar en el navegador: crear cuidados de varios tipos (incluido "otro" con texto libre) en más de un perro, comprobar que las fechas próximas/vencidas se destacan bien en la ficha y en `/cuenta`, editar, borrar, y confirmar que no se accede a cuidados de otro usuario ni se puede colar un `perroId` ajeno al crear uno.

## Decisiones (cerradas contigo)

- Modelo de datos, tipos de cuidado, recordatorio solo visual, repetición manual y vista de lista: ver `spec.md`.
- Margen de "próximo": 30 días. Resumen también visible en `/cuenta`.
- `onDelete: Cascade` en la relación `Cuidado → Perro`: al borrar un perro se borran sus cuidados automáticamente (evita dejar registros huérfanos).

## Riesgos

- Es la primera tabla con relación a otra tabla propia (`Cuidado → Perro`), no solo a `auth.users` como `Perro` — al escribir las Server Actions hay que tener cuidado de comprobar la propiedad en los dos niveles (el perro es del usuario, y el cuidado es del perro correcto), no solo uno.
- El cálculo de "próximo/vencido" depende de la fecha del servidor (`new Date()`) — si alguna vez se despliega en varias regiones con relojes distintos podría dar resultados inconsistentes, pero no es un riesgo real para el tamaño actual del proyecto.
