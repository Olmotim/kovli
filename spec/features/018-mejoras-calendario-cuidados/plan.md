# 018 · Mejoras del calendario de cuidados — Plan

> Respeta `constitution/tech-stack.md`. Depende de que la 017 esté implementada antes (reutiliza su Route Handler de cron) — si se aborda en otro orden, esta feature necesita crear su propio cron mínimo primero.

## Enfoque

Cuatro piezas independientes sobre el mismo modelo (`Cuidado`), sin dependencias entre ellas salvo la recurrencia, que sí depende del cron de la 017.

## Implementación

1. **`schema.prisma`**: `Cuidado` gana `repiteCadaMeses Int?` y `archivos String[]`. Migración `añadir_recurrencia_y_archivos_a_cuidado`, seguida de `npx prisma generate` a mano.
2. **`packages/domain/src/cuidado.ts`**: `siguienteFechaRecurrencia(fecha: Date, meses: number): Date` — función pura (suma meses a una fecha), fácil de testear con Vitest (ya hay precedente en `packages/domain`).
3. **Recurrencia en el cron** (`apps/web/app/api/cron/recordatorios/route.ts`, ampliar el de la 017): tras calcular los digests, un paso más — `prisma.cuidado.findMany({ where: { repiteCadaMeses: { not: null }, fecha: { lt: hoy } } })`, y para cada uno comprobar si ya existe un "sucesor" (`prisma.cuidado.findFirst({ where: { perroId, tipo, fecha: { gt: cuidado.fecha } } })`); si no existe, `prisma.cuidado.create()` con la fecha calculada por `siguienteFechaRecurrencia()`.
4. **Adjuntar archivos**: reutilizar el patrón de `diario.ts` (`subirFotos`/`borrarFotos`, adaptados a un nombre más genérico ya que ahora no son solo fotos — ej. `subirArchivos`/`borrarArchivos` en `lib/storage.ts`, generalizando lo que hoy es específico del diario) bajo `usuarioId/cuidados/...`; `accept="image/*,application/pdf"` en el input; tope de 5, mismo patrón de validación en la Server Action que en `diario.ts`.
5. **Vista de calendario** (`/cuenta/perros/[id]/cuidados/calendario`):
   - `packages/domain/src/calendario.ts`: `diasDelMes(anio: number, mes: number): Date[]` — función pura que devuelve los días a pintar en la cuadrícula (incluyendo los días del mes anterior/siguiente necesarios para completar semanas), testeable sin tocar el DOM.
   - Página con navegación `?mes=YYYY-MM` por query param, cuadrícula CSS Grid de 7 columnas, cuidados de cada día agrupados por `fecha`.
6. **Multi-perro**: en `CuidadoForm.tsx`, checkboxes con el resto de perros del usuario (`prisma.perro.findMany({ where: { usuarioId, id: { not: perro.id } } })` desde la página); `crearCuidadoAction` recibe `formData.getAll("perrosAdicionales")` y, tras crear el cuidado del perro actual, repite `prisma.cuidado.create()` por cada id adicional (mismos datos, sin compartir fila — si luego se edita uno no afecta a los demás).
7. Verificar `pnpm build`/`pnpm lint`; probar en el navegador (recurrencia probablemente haya que forzarla cambiando una fecha a mano en la base de datos o llamando al cron con una fecha de cuidado ya vencida, ya que esperar meses no es viable para probar).

## Decisiones (cerradas contigo)

- Recurrencia por meses, generada al vencer, vía el cron ya existente de la 017.
- Calendario a mano con CSS Grid.
- Adjuntos reutilizan el bucket `fotos-perros`, tope de 5.

## Riesgos

- La comprobación de "¿ya tiene sucesor?" antes de generar uno nuevo es la pieza que evita duplicados si el cron corre más de una vez sobre el mismo cuidado vencido — hay que probarla explícitamente (llamar al cron dos veces seguidas sobre el mismo cuidado recurrente vencido y comprobar que solo se crea un sucesor, no dos).
- Al generalizar `subirFotos`/`borrarFotos` de `diario.ts` a un nombre más genérico reutilizable desde `cuidados.ts`, cuidado con no romper las llamadas ya existentes del diario — mismo cuidado que al mover `extensionDeArchivo()` en la 015.
