# 023 · Rutinas diarias en el móvil

**Estado:** hecho — validada en Expo Go (rutinas de hoy, marcar/desmarcar).

## Qué hace

Tercera pieza de Fase 3: añade una sección "Rutinas de hoy" a la pantalla de detalle de perro ya existente en el móvil (la de la 022, que hoy solo muestra cuidados) con el checklist de rutinas diarias del perro — mismo contenido que el checklist de la ficha web (014/019), pero solo las rutinas activas que tocan hoy.

A diferencia de la 022 (solo lectura), aquí **sí se puede marcar/desmarcar** una rutina como hecha tocándola — es la primera vez que la app móvil escribe datos, no solo los lee.

## Por qué

Las rutinas son, de las tres piezas que quedaban (calendario, rutinas, diario), la que más sentido tiene poder marcar desde el móvil: es habitual querer apuntar "ya hemos hecho el paseo" estando fuera de casa con el perro, no sentado delante del ordenador. Dejarlo en solo lectura (como la 022) le quitaría el valor práctico a esta pieza en concreto.

## Criterios de aceptación

- [x] La pantalla de detalle de perro (`apps/mobile/app/(app)/perros/[id].tsx`) muestra una sección "Rutinas de hoy" debajo de "Cuidados", con las rutinas activas que tocan hoy (mismo filtro que la web: `activa` + `tocaHoy(diasSemana)`) y si están hechas o no.
- [x] Nueva API `GET /api/perros/[id]/rutinas` en `apps/web` que devuelve esa lista ya filtrada, con `hecha: boolean` por cada rutina.
- [x] Nueva API `POST /api/perros/[id]/rutinas/[tareaId]/marcar` que alterna la marca de hoy (igual que `marcarTareaAction` en la web: crea la marca si no existe, la borra si ya existía) y responde con el nuevo estado.
- [x] Ambas APIs comprueban el token de sesión y que el perro (y la rutina, en el caso del marcado) son del usuario autenticado — 401/404 si no.
- [x] Tocar una rutina en el móvil actualiza su check en pantalla sin recargar toda la pantalla.
- [x] Sin rutinas para hoy, se muestra un mensaje ("Sin rutinas para hoy") en vez de una sección vacía.
- [x] Mensajes de error razonables si alguna de las dos APIs no responde.
- [x] `pnpm build` y `pnpm lint` siguen sin errores nuevos en el resto del monorepo.
- [x] Validado por ti en Expo Go.

## Fuera de alcance

- Crear, editar, borrar, pausar/reactivar o reordenar rutinas desde el móvil — solo marcar/desmarcar las de hoy.
- Historial visual (019) en el móvil.
- Diario personal en el móvil — queda para otra feature de Fase 3.
- Actualización en tiempo real si se marca desde la web mientras la app móvil está abierta (hay que reabrir/recargar la pantalla para verlo).

## Decisiones (cerradas contigo)

- Interactivo: se puede marcar/desmarcar desde el móvil (no solo lectura como la 022) — primera escritura de la app móvil hacia `apps/web`.
- La sección vive en la misma pantalla de detalle de perro de la 022 (debajo de "Cuidados"), no en una pantalla aparte.
- Dos endpoints (uno de lectura, uno de escritura) en vez de uno combinado, siguiendo el mismo criterio REST ya usado (`GET` para leer, `POST` para la acción de marcar).
