# 012 · Ficha de perro(s) — Plan

> Respeta `constitution/tech-stack.md`. Primera vez que entra Prisma de verdad (`packages/db`, hasta ahora vacío).

## Enfoque

Dos piezas de infraestructura nuevas, con caminos distintos a propósito:

- **Datos de la ficha** (nombre, raza, fecha de nacimiento, sexo, peso, notas) → **Prisma**, conectado directo a la base de datos Postgres de Supabase. La protección de "cada usuario solo ve los suyos" se hace **en el código del servidor** (filtrar siempre por `usuarioId` en cada Server Action), no con RLS — decisión cerrada contigo, ver spec.
- **Foto** → **Supabase Storage**, a través del cliente `supabase-js` de servidor que ya existe desde la 011 (`lib/supabase/server.ts`). Storage sí respeta las políticas de acceso (RLS) porque las peticiones pasan por la API de Supabase con el token del usuario — aquí la protección real sí es a nivel de Storage.

## Implementación

1. **`packages/db`**: paquete nuevo del monorepo (`@kovli/db`, mismo patrón que `@kovli/schemas` de la 011).
   - `schema.prisma`: datasource Postgres con dos variables de entorno — `DATABASE_URL` (conexión con *pooler* de Supabase, para las consultas normales de la app) y `DIRECT_URL` (conexión directa, solo para migraciones). Te explico el porqué en el paso 2.
   - Modelo `Perro` (campos de la tabla ya cerrados en `spec.md`) + enum `Sexo` (`MACHO` / `HEMBRA`).
   - Cliente Prisma exportado como singleton (patrón estándar de Next.js: sin él, cada recarga en desarrollo crearía una conexión nueva a la base de datos hasta agotar el límite — problema conocido de Prisma + Next.js, no un bug nuestro).
2. **Obtener las cadenas de conexión** (tú, en el panel de Supabase — te guío paso a paso en `tasks.md`): Supabase da dos URLs de Postgres distintas. La razón: las funciones serverless de Vercel abren y cierran conexiones constantemente, y Postgres tiene un límite bajo de conexiones simultáneas; Supabase pone en medio un *pooler* (Supavisor) que las reutiliza. Pero ese *pooler* no soporta el tipo de conexión que necesitan las migraciones (`prisma migrate`), así que esas sí van por la conexión directa. Ambas van a `.env.local` (nunca al repo) y luego a Vercel.
3. **Instalar dependencias nuevas** (con tu OK explícito antes de `pnpm add`): `prisma` (CLI, solo desarrollo) y `@prisma/client` (runtime) en `packages/db`.
4. **Primera migración**: `prisma migrate dev` crea la tabla `Perro` en Supabase y el archivo de migración (se commitea, es historial versionado del esquema — a diferencia de `.env`, esto sí va al repo).
5. **`packages/schemas`**: esquemas Zod nuevos para crear/editar un perro (nombre y raza obligatorios; el resto opcional, con las mismas reglas que la tabla).
6. **Bucket de Supabase Storage** (tú, en el panel — guiado en `tasks.md`): bucket `fotos-perros` con política de acceso por carpeta de usuario (patrón estándar de Supabase: la ruta del archivo empieza por el `id` del usuario, y la política solo deja subir/borrar/ver dentro de la propia carpeta).
7. **Server Actions** en `apps/web/lib/actions/perros.ts`: crear, actualizar, borrar. Cada una obtiene el usuario con `getUser()` (nunca confía en un id del formulario) y filtra por `usuarioId` en la consulta Prisma. La subida de foto usa el cliente de Storage; el resto de campos usa Prisma.
8. **Rutas**:
   - `/cuenta` — deja de ser el placeholder de la 011: ahora lista los perros del usuario (Server Component, `prisma.perro.findMany({ where: { usuarioId } })`) + botón "añadir perro".
   - `/cuenta/perros/nuevo` — formulario de alta.
   - `/cuenta/perros/[id]` — ver, editar y borrar (con confirmación) una ficha.
9. **Cálculo de edad**: función pura en `packages/domain` (no en el componente) que recibe `fechaNacimiento | null` y devuelve la edad en años o `null` si no hay fecha — el componente solo decide cómo mostrarlo ("desconocida" si es `null`).
10. Verificar `pnpm build`/`pnpm lint`, y probar en el navegador: crear perro (con y sin foto, con raza del catálogo y con raza libre), listado, editar, borrar, y confirmar que un perro de otro usuario no es accesible cambiando el id en la URL a mano.

## Decisiones (cerradas contigo)

- Protección de acceso: filtrado por `usuarioId` en servidor, sin RLS de Postgres (ver spec).
- Foto: vía Supabase Storage con políticas por carpeta de usuario.
- Edad: función de cálculo en `packages/domain`, nunca almacenada.

## Riesgos

- Primera vez que se toca `packages/db` — dedicar tiempo a entender el flujo de migraciones (`prisma migrate dev` en local, `prisma migrate deploy` en producción) antes de dar por cerrada la feature.
- Dos cadenas de conexión nuevas que nunca deben quedar commiteadas (mismo cuidado que con las claves de Supabase Auth en la 011).
- Si en el futuro se añade algo que consulte la tabla `Perro` fuera de una Server Action (ej. un Route Handler nuevo), hay que acordarse de repetir el filtro por `usuarioId` a mano — no hay red de seguridad automática al no usar RLS.
