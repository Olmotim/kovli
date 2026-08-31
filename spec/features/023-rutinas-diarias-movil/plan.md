# 023 · Rutinas diarias en el móvil — Plan

> Respeta `constitution/tech-stack.md`. Sin dependencias nuevas previstas en esta feature.

## Enfoque

Misma división que la 021/022: piezas en `apps/web` (dos Route Handlers nuevos) y una ampliación de la pantalla ya existente en `apps/mobile`. Se reutiliza `tocaHoy()`/`inicioDelDia()` de `packages/domain` y el mismo patrón `TareaCompletada` (crear/borrar por fecha) que `marcarTareaAction` en `apps/web/lib/actions/tareas.ts` — la diferencia es que aquí la mutación se expone como Route Handler (`POST`), no como Server Action, por el mismo motivo que la 021: una app nativa no puede invocar Server Actions de Next.js directamente.

## Implementación

1. **Route Handler de lectura** `apps/web/app/api/perros/[id]/rutinas/route.ts` (método `GET`):
   - Mismo arranque de auth que las APIs de la 021/022 (`Authorization: Bearer`, cliente Supabase sin cookies, `getUser(token)`).
   - `prisma.perro.findFirst({ where: { id, usuarioId: user.id } })` — 404 si no es del usuario.
   - `prisma.tarea.findMany({ where: { perroId: id, activa: true }, orderBy: { orden: "asc" }, include: { completadas: { where: { fecha: inicioDelDia(new Date()) } } } })` — mismo `include` que ya usa `/cuenta/perros/[id]/page.tsx`.
   - Filtra en memoria con `tocaHoy(tarea.diasSemana)` (igual que la web: no hay forma simple de expresarlo en el `where` de Prisma).
   - Devuelve JSON: `{ tareas: [{ id, nombre, hecha }] }`, donde `hecha = completadas.length > 0`.
2. **Route Handler de escritura** `apps/web/app/api/perros/[id]/rutinas/[tareaId]/marcar/route.ts` (método `POST`):
   - Mismo arranque de auth.
   - `prisma.tarea.findFirst({ where: { id: tareaId, perroId: id, usuarioId: user.id } })` — 404 si la rutina no existe, no es de ese perro, o no es del usuario (tres comprobaciones en un único `where`, igual de estricto que `marcarTareaAction`).
   - Mismo toggle que `marcarTareaAction`: busca `TareaCompletada` de hoy (`inicioDelDia(new Date())`), la borra si existe, la crea si no.
   - Devuelve JSON: `{ hecha: boolean }` (el nuevo estado, para que el móvil actualice el check sin tener que volver a pedir la lista entera).
3. **Ampliar la pantalla de detalle** (`apps/mobile/app/(app)/perros/[id].tsx`):
   - Al montar, además de pedir cuidados, pide `GET /api/perros/[id]/rutinas` y guarda la lista en su propio estado.
   - Nueva sección "Rutinas de hoy" (debajo de "Cuidados"), cada fila un `<TouchableOpacity>` con un check — tocarla llama a `POST /api/perros/[id]/rutinas/[tareaId]/marcar` y, con la respuesta, actualiza esa fila en el estado local (sin volver a pedir toda la lista).
   - Mensaje "Sin rutinas para hoy" si la lista viene vacía.
4. Verificar `pnpm build`/`pnpm lint` en el resto del monorepo.
5. Probar en Expo Go: entrar en un perro con rutinas de hoy, marcar una, desmarcarla, cerrar y volver a entrar para comprobar que el estado se mantiene (ya viene de la base de datos, no es solo local).

## Decisiones (cerradas contigo)

- Interactivo (marcar/desmarcar), primera escritura de la app móvil.
- La sección va en la misma pantalla de detalle de la 022, no en una pantalla aparte.
- Dos Route Handlers separados (`GET` para leer, `POST .../marcar` para la acción), no uno combinado.

## Riesgos

- Primera vez que la app móvil hace una petición que no es `GET` — hay que mandar el `Authorization: Bearer` igual que en las de lectura (fácil de olvidar en un `fetch` con método `POST`, ya que por defecto solo se piensa en el body).
- Si el usuario toca la rutina dos veces muy rápido (doble toggle), la última respuesta gana — sin `debounce` ni bloqueo del botón mientras se espera la respuesta, se documenta como riesgo menor en vez de añadir complejidad extra para un caso raro.
