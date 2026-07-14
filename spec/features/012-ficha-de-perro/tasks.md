# Tasks · 012 · Ficha de perro(s)

> Derivadas del `plan.md`. Las tareas 1 y 2 las haces tú (guiado); el resto es código, empieza cuando estén listas.

- [x] **1. Conseguir las cadenas de conexión a la base de datos** (tú, guiado):
  1. En el panel de Supabase del proyecto `kovli`: "Project Settings" → "Database" → pestaña de cadena de conexión.
  2. Copia la que esté pensada para *connection pooling* (modo "Transaction", puerto `6543`) → esta va a `DATABASE_URL`.
  3. Copia la conexión directa (puerto `5432`, sin pooler) → esta va a `DIRECT_URL`.
  4. Ambas llevan un `[YOUR-PASSWORD]` de plantilla — sustitúyelo por la contraseña de base de datos que guardaste al crear el proyecto (sesión de la 011).
  5. Me pasas las dos (son cadenas de conexión con contraseña real — aunque te las pida, no las pegues en el repo ni en ningún sitio público; solo aquí en el chat o directamente en `.env.local`).
- [x] **2. Crear el bucket de Storage para las fotos** (tú, guiado):
  1. "Storage" → "New bucket" → nombre `fotos-perros`, público (así se pueden mostrar las fotos con una URL directa, sin montar URLs firmadas — el nombre de archivo no es adivinable, es un id).
  2. En "Policies" del bucket, tres políticas nuevas restringidas a la propia carpeta del usuario (te paso el SQL exacto en el momento, usa `auth.uid()` contra el primer segmento de la ruta del archivo): permitir `INSERT`, `UPDATE` y `DELETE` solo dentro de `carpeta = auth.uid()`. La lectura (`SELECT`) no necesita política al ser el bucket público.
- [x] 3. `.env.local` en `apps/web`: añadir `DATABASE_URL` y `DIRECT_URL` (confirmar que siguen cubiertas por `.gitignore`).
- [x] 4. Instalar `prisma` y `@prisma/client` en `packages/db` (con tu OK explícito antes de `pnpm add`). Nota real: Prisma va ya por la v7 (más reciente que mi conocimiento previo) — arquitectura nueva con *driver adapters* (`@prisma/adapter-pg` + `pg`) y `prisma.config.ts` en vez de la `url` dentro del `datasource` de `schema.prisma`; detectado justo gracias al paso 5 (Context7).
- [x] 5. Consultar la documentación actual de Prisma + Supabase (Context7) antes de escribir `schema.prisma`, por si hay algún parámetro nuevo en la cadena de conexión recomendada (esto cambia entre versiones de Prisma).
- [x] 6. `packages/db/prisma/schema.prisma`: modelo `Perro` + enum `Sexo`, cliente Prisma exportado como singleton (`src/client.ts`). La conexión ya no vive en `schema.prisma` (deprecado en v7) sino en `prisma.config.ts` (`DIRECT_URL`, para la CLI) y en el propio `client.ts` (`DATABASE_URL`, para runtime, vía adaptador).
- [x] 7. Primera migración: `prisma migrate dev --name crear_tabla_perro` (tabla creada en Supabase, migración versionada en `packages/db/prisma/migrations/`).
- [x] 8. Esquemas Zod en `packages/schemas`: crear perro, editar perro.
- [x] 9. Función de cálculo de edad en `packages/domain` (recibe `fechaNacimiento | null`, devuelve años o `null`).
- [x] 10. Server Actions en `apps/web/lib/actions/perros.ts`: crear, actualizar, borrar — cada una valida con Zod, comprueba el usuario con `getUser()` y filtra por `usuarioId`.
- [x] 11. Subida de foto: Server Action o parte de la de crear/editar, usando el cliente de Storage de servidor; guarda la ruta resultante en `fotoPath`.
- [x] 12. Rutas: `/cuenta` (listado + botón "añadir perro", reemplaza el placeholder de la 011), `/cuenta/perros/nuevo` (formulario de alta), `/cuenta/perros/[id]` (ver, editar, borrar con confirmación).
- [x] 13. Variables de entorno (`DATABASE_URL`, `DIRECT_URL`) también en Vercel, antes de desplegar.
- [x] 14. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 15. Probar en el navegador: crear perro (con/sin foto, raza de catálogo y raza libre), listado en `/cuenta`, editar, borrar, y confirmar que cambiar el id en la URL a mano no da acceso a un perro de otro usuario.
- [x] 16. Validación tuya en el navegador.
- [x] 17. Mover la feature a "Hecho" en `roadmap.md`.
