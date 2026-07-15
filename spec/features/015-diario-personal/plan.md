# 015 · Diario personal — Plan

> Respeta `constitution/tech-stack.md`. Reutiliza Prisma, `packages/schemas` y el bucket `fotos-perros` ya existentes — sin dependencias ni infraestructura de Supabase nuevas.

## Enfoque

Una sola tabla, `EntradaDiario`, con `fotos` como columna array de Postgres (`String[]`) en vez de una tabla aparte por foto — no hace falta más metadato por foto que la ruta, y el orden ya lo da la posición en la lista.

Las fotos van al bucket `fotos-perros` que ya existe desde la 012, bajo `usuarioId/diario/...` (distinto de `usuarioId/...` que usa la foto de perfil del perro) — la política de Storage restringe por el primer segmento de la ruta (el uid del usuario), le da igual lo que haya después, así que no hace falta tocar Supabase para nada.

**Pieza nueva de verdad:** es la primera vez que se sube/gestiona más de un archivo a la vez. El formulario tiene un único `<input type="file" multiple>` (no 5 inputs sueltos); al editar, cada foto ya guardada se muestra con una casilla "quitar" (varias casillas con el mismo `name`, se leen con `formData.getAll(...)`), y las fotos nuevas se añaden por encima, respetando el máximo de 5 en total — la cuenta final (fotos que se mantienen + fotos nuevas) se valida en el servidor, no solo en el cliente.

## Implementación

1. **`schema.prisma`**: `model EntradaDiario` — `id`, `usuarioId`, `perroId` (`@relation` a `Perro`, `onDelete: Cascade`), `fecha` (`DateTime`), `texto` (`String?`), `fotos` (`String[]`), `createdAt`/`updatedAt`, índices en `usuarioId`/`perroId`. Campo inverso `entradasDiario EntradaDiario[]` en `Perro`.
2. **Migración**: `prisma migrate dev --name crear_tabla_entrada_diario`, seguida de `npx prisma generate` a mano (lección de la 013, ya aplicada limpiamente en la 014).
3. **Pequeño refactor previo**: `extensionDeArchivo()` vive hoy solo dentro de `apps/web/lib/actions/perros.ts` — se mueve a `apps/web/lib/storage.ts` (junto a `urlFotoPerro`/`BUCKET_FOTOS_PERROS`) para que `diario.ts` la reutilice sin duplicarla. `perros.ts` pasa a importarla de ahí.
4. **`packages/schemas/src/diario.ts`**: `entradaDiarioSchema` — `fecha` obligatoria (coerce a `Date`), `texto` opcional (recortado, longitud máxima). La regla "texto o foto, no ambos vacíos" **no** vive en este schema — depende también de las fotos, que (igual que en `perros.ts`) se procesan fuera de Zod, como archivos del `FormData`. Se valida en la Server Action, después de combinar texto + fotos finales.
5. **`apps/web/lib/actions/diario.ts`**:
   - `subirFotos(supabase, usuarioId, fotos: File[])`: sube cada archivo a `usuarioId/diario/${randomUUID()}.ext` y devuelve la lista de rutas.
   - `borrarFotos(supabase, paths: string[])`: un solo `remove(paths)` por lote (a diferencia de `perros.ts`, que borra una foto cada vez).
   - `crearEntradaAction(perroId, prevState, formData)`: verifica usuario y que el perro es suyo; valida `fecha`/`texto` con Zod; lee `formData.getAll("fotos")` (hasta 5, si hay más se devuelve un error); si no hay texto ni fotos, error "La entrada necesita texto o al menos una foto."; sube las fotos válidas; crea la entrada; redirige a la ficha.
   - `actualizarEntradaAction(id, prevState, formData)`: busca la entrada por `id`+`usuarioId`; calcula fotos finales = (fotos actuales − las marcadas para quitar en `eliminarFotos`) + fotos nuevas subidas, con el mismo tope de 5 y la misma comprobación de "no vacío"; borra del Storage solo las que se quitaron; actualiza.
   - `borrarEntradaAction(id)`: busca la entrada; borra todas sus fotos del Storage; borra la fila; redirige.
6. **Rutas**: `/cuenta/perros/[id]/diario/nueva` (alta) y `/cuenta/perros/[id]/diario/[entradaId]` (editar/borrar).
7. **Componentes** (`apps/web/components/diario/`):
   - `EntradaDiarioForm.tsx`: fecha (`CampoTexto` tipo `date`), texto (`CampoTextarea`), y `CampoFotosDiario` — fotos ya guardadas como miniaturas con casilla "quitar" + `<input type="file" name="fotos" multiple accept="image/*">` para añadir.
   - `FilaEntradaDiario.tsx`: fecha, texto y una rejilla de miniaturas de las fotos, con enlace a editar.
   - `BotonBorrarEntrada.tsx`: mismo patrón que `BotonBorrarCuidado`/`BotonBorrarTarea`.
8. **Ficha de perro** (`/cuenta/perros/[id]/page.tsx`): nueva sección "Diario" debajo de "Rutinas de hoy" — `prisma.entradaDiario.findMany({ where: { perroId }, orderBy: { fecha: "desc" } })`, sin dividir en próximos/historial (es un diario, no un calendario): todo en una lista, más reciente primero.
9. Verificar `pnpm build`/`pnpm lint`, y probar en el navegador: crear una entrada solo con texto, otra solo con fotos, otra con ambos; comprobar el orden por fecha; editar (quitar una foto y añadir otra a la vez); borrar (y comprobar que las fotos desaparecen del Storage); confirmar que no se accede a entradas de otro usuario.

## Decisiones (cerradas contigo)

- Modelo de una tabla con `fotos: String[]`, tope de 5, texto/fecha editables, sin resumen en `/cuenta`: ver `spec.md`.
- Reutilizar el bucket `fotos-perros` con prefijo `usuarioId/diario/...`, sin bucket ni política nueva en Supabase.
- La validación de "no vacío" (texto o foto) vive en la Server Action, no en el schema de Zod, porque depende de archivos que Zod no valida directamente.

## Riesgos

- Es la primera vez que una acción borra **varias** fotos de Storage y actualiza un array en la misma operación — hay que tener cuidado con el orden (subir/borrar en Storage primero, guardar en base de datos después) para no dejar la base de datos apuntando a una foto que ya no existe, o viceversa.
- El límite de 5 fotos se valida en servidor pero conviene explicarlo también en el formulario (texto de ayuda), para que el usuario no se sorprenda con un error después de rellenar todo lo demás.
