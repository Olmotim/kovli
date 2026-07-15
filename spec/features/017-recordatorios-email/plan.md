# 017 · Recordatorios por email — Plan

> Respeta `constitution/tech-stack.md`. Primera vez que el proyecto tiene una tarea programada (Vercel Cron) y que la propia app (no solo Supabase) envía emails con Resend.

## Enfoque

`vercel.json` (nuevo, en la raíz del repo) define un cron que llama a `GET /api/cron/recordatorios` una vez al día. Esa Route Handler:

1. Comprueba `Authorization: Bearer <CRON_SECRET>` — sin esto, cualquiera que adivinara la URL podría disparar el envío de emails a todos los usuarios.
2. Agrupa los perros por `usuarioId` (`prisma.perro.findMany` con sus `cuidados`/`tareas`, igual que ya hace `/cuenta/page.tsx`).
3. Por cada usuario, calcula el digest con funciones puras de `packages/domain` (reutilizando `estadoCuidado`/`proximoCuidado`, generalizando el margen de "próximo" a un parámetro en vez de la constante fija de 30 días — con valor por defecto 30, así el uso ya existente en `/cuenta` y en la ficha del perro no cambia).
4. Si el digest no está vacío, obtiene el email del usuario (con el cliente **admin** de Supabase — Prisma no tiene acceso a `auth.users.email`, esa tabla la gestiona solo Supabase) y envía el correo con Resend.

## Implementación

1. **`packages/domain/src/cuidado.ts`**: generalizar `estadoCuidado(fecha, hoy = new Date(), diasParaProximo = 30)` (el `30` pasa de constante de módulo a valor por defecto del parámetro — los usos existentes en `cuidados.ts`/`FilaCuidado.tsx` no cambian). Nueva función `cuidadosPendientes(cuidados, hoy, diasParaProximo = 7)` que devuelve `{ vencidos: T[], proximos: T[] }`, para el email (ventana de 7 días, distinta de la de la interfaz).
2. **`packages/domain/src/tarea.ts`**: nueva función `tareasSinCompletarHoy(tareas: { completadaHoy: boolean }[])` (filtro simple, ya casi lo hace `resumenRutinasHoy`, pero aquí hace falta la lista, no solo el conteo).
3. **`apps/web/lib/email.ts`**: cliente Resend (`new Resend(process.env.RESEND_API_KEY)`) y una función `enviarDigest(destinatario: string, contenido: string)` que llama a `resend.emails.send(...)` con el remitente ya verificado (mismo dominio que usa Supabase para el SMTP, pero esta vez con una **API key** de Resend, no las credenciales SMTP — son dos cosas distintas dentro del mismo panel de Resend).
4. **`apps/web/app/api/cron/recordatorios/route.ts`** (`GET`):
   - Verifica `CRON_SECRET` (401 si no coincide).
   - `prisma.perro.groupBy({ by: ["usuarioId"] })` para la lista de usuarios con perros.
   - Por usuario: `prisma.perro.findMany({ where: { usuarioId }, include: { cuidados: true, tareas: { include: { completadas: { where: { fecha: inicioDelDia(hoy) } } } } } })`, junta `cuidadosPendientes()` y `tareasSinCompletarHoy()` de todos sus perros.
   - Si hay algo, arma el texto del email (agrupado por perro) y pide el email al **cliente admin de Supabase** (`createClient` con `SUPABASE_SERVICE_ROLE_KEY`, distinto del cliente normal de `lib/supabase/server.ts` que usa la clave pública) vía `supabase.auth.admin.getUserById(usuarioId)`.
   - Llama a `enviarDigest()`.
5. **`vercel.json`** (nuevo, raíz del repo): `{ "crons": [{ "path": "/api/cron/recordatorios", "schedule": "0 8 * * *" }] }` — corre a las 8:00 **UTC** (Vercel Cron no soporta zonas horarias locales; documentar el desfase real con España/Argentina en vez de fingir precisión que no existe).
6. **Variables de entorno nuevas** (tú, guiado en `tasks.md`): `CRON_SECRET` (un secreto generado, ej. `openssl rand -hex 32`), `RESEND_API_KEY` (API key de Resend, no las credenciales SMTP ya usadas), `SUPABASE_SERVICE_ROLE_KEY` (panel de Supabase → Project Settings → API — **nunca** debe usarse en código que corra en el navegador, solo aquí).
7. Verificar `pnpm build`/`pnpm lint`; probar en local con `curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/recordatorios` (con y sin el header, comprobando el 401), y revisar que el email llega con el contenido esperado.

## Decisiones (cerradas contigo)

- Un solo motor (cron + Route Handler) para cuidados y rutinas.
- SDK oficial `resend`.
- Ventana de 7 días para "próximo" en el email (vs. 30 en la interfaz) — se generaliza `estadoCuidado` con un parámetro, no se duplica la función.
- Sin tracking de "ya avisado": digest diario, se repite mientras siga pendiente.

## Riesgos

- **`SUPABASE_SERVICE_ROLE_KEY` salta todas las políticas de seguridad de Supabase**, igual que la conexión directa de Prisma salta las de Postgres — solo se usa en esta Route Handler de servidor, protegida por `CRON_SECRET`, nunca en un componente ni Server Action accesible desde el navegador.
- Iterar usuario a usuario dentro de la misma petición podría acercarse al límite de tiempo de una función de Vercel si el número de usuarios creciera mucho — no es un problema real al tamaño actual del proyecto, pero es una limitación a tener en cuenta si Kovli crece.
- Vercel Cron corre en UTC, no en la hora local del usuario — el email podría llegar de madrugada o a media mañana según la época del año (horario de verano/invierno). Aceptado como limitación conocida, no oculta.
