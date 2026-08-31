# 022 · Calendario de cuidados en el móvil — Plan

> Respeta `constitution/tech-stack.md`. Sin dependencias nuevas previstas en esta feature.

## Enfoque

Misma división que la 021: una pieza en `apps/web` (la API) y una pieza en `apps/mobile` (la pantalla), probadas por separado antes de unirlas. Se reutiliza al máximo lo ya construido: `cuidadosPendientes()`/`estadoCuidado()` de `packages/domain` (ya generalizados desde la 017 con el parámetro `diasParaProximo`), y el mismo patrón de autenticación por `Authorization: Bearer` que ya usa `GET /api/perros` (021).

## Implementación

1. **Route Handler nuevo** `apps/web/app/api/perros/[id]/cuidados/route.ts` (método `GET`):
   - Mismo arranque que `GET /api/perros`: lee `Authorization: Bearer <token>`, lo valida con `supabase.auth.getUser(token)` (cliente sin cookies, creado dentro del handler, mismo motivo que en la 021 — evitar que Next.js/Turborepo evalúe el módulo durante el build sin las variables de entorno todavía disponibles).
   - Busca el perro con `prisma.perro.findFirst({ where: { id, usuarioId: user.id } })` — si no existe (no es del usuario o no existe en absoluto), responde `404`. Mismo criterio de seguridad que `crearCuidadoAction` en `cuidados.ts` (013/018): nunca fiarse del `id` de la URL sin comprobar el dueño.
   - Consulta `prisma.cuidado.findMany({ where: { perroId: id } })` y separa próximos/historial **exactamente como la ficha web** (`apps/web/app/cuenta/perros/[id]/page.tsx`): `fecha >= hoy` → próximos, `fecha < hoy` → historial (invertido, más reciente primero) — no la ventana de 30/7 días de `cuidadosPendientes()` (esa función es para "qué está pendiente de verdad", pensada para el resumen de `/cuenta` y el email, no para esta lista completa). Cada cuidado sí lleva su `estado` (`estadoCuidado()`, ventana por defecto de 30 días) para colorear la fila igual que `FilaCuidado.tsx` en la web.
   - Devuelve JSON: `{ perro: { id, nombre }, proximos: [...], historial: [...] }`, cada cuidado con `id`, `tipo`, `tipoLibre`, `fecha` (ISO string), `notas`, `estado` (`"vencido" | "proximo" | "lejano"`, ya calculado, para que la pantalla solo pinte una etiqueta sin repetir la lógica de fechas en RN).
2. **Pantalla de detalle de perro** (`apps/mobile/app/(app)/perros/[id].tsx`, ruta dinámica de Expo Router — mismo concepto que `apps/web/app/razas/[slug]/page.tsx`, el nombre del archivo entre corchetes es el parámetro):
   - Al montar, llama a la API nueva con el `id` de la ruta (`useLocalSearchParams()`) y el `access_token` de la sesión activa.
   - Pinta dos listas ("Próximos"/"Historial"), cada fila con tipo (o `tipoLibre` si es "Otro"), fecha formateada y notas si tiene.
   - Sin cuidados en ninguna de las dos listas: mensaje único ("Sin cuidados registrados todavía") en vez de dos secciones vacías.
3. **Enlace desde "Mis perros"** (`apps/mobile/app/(app)/index.tsx`): cada fila de perro pasa a ser pulsable (envuelta en `<Link href={...}>` de `expo-router`, equivalente al `<Link>` de `next/link` ya usado en la web) que navega a `/perros/[id]` con el `id` del perro.
4. Verificar `pnpm build`/`pnpm lint` en el resto del monorepo.
5. Probar en Expo Go: Mis perros → pulsar un perro → ver sus cuidados (próximos/historial) → volver atrás.

## Decisiones (cerradas contigo)

- API dedicada por perro (`/api/perros/[id]/cuidados`), no cuidados anidados dentro de `/api/perros`.
- El estado (vencido/próximo/lejano) se calcula en el backend, no en el cliente móvil.
- Ventana de "próximo" de 30 días (igual que la interfaz web), no los 7 días del email.

## Riesgos

- Primera ruta dinámica de Expo Router del proyecto (`[id].tsx`) — mismo concepto que las rutas dinámicas de Next.js ya usadas en la web, pero primera vez en RN; revisar la documentación exacta de Expo Router v57 (según pide `apps/mobile/AGENTS.md`) antes de escribirla, por si el hook para leer el parámetro cambió de nombre entre versiones.
- Por lo demás, ningún riesgo nuevo respecto a la 021 (mismo patrón de auth, mismo Prisma).
