# 024 · Diario personal en el móvil

**Estado:** hecho — validada en Expo Go.

## Qué hace

Cuarta pieza de Fase 3: añade una pantalla nueva, aparte de la de detalle de perro, con la lista del diario personal de ese perro (texto, fecha, fotos y etiquetas) — mismo contenido que el diario en la web (015/020), pero **solo lectura**.

Se llega desde un enlace "Diario" nuevo en la pantalla de detalle de perro (022/023), junto a "Cuidados" y "Rutinas de hoy".

## Por qué

El diario es la pieza más grande de las tres que quedaban en Fase 3 (texto libre, fecha editable, hasta 5 fotos, etiquetas) y la única con contenido visual pesado (fotos) — meterlo como una sección más en la pantalla de detalle la sobrecargaría. Por eso va en pantalla propia, con más espacio para las fotos y el texto de cada entrada.

Se deja en solo lectura (como la 022, a diferencia de la 023): crear una entrada nueva implicaría subir fotos desde el móvil (permisos de cámara/galería, subida a Supabase Storage), una pieza bastante más grande que no tiene sentido mezclar con "ver el diario que ya existe".

## Criterios de aceptación

- [x] La pantalla de detalle de perro (`apps/mobile/app/(app)/perros/[id].tsx`) tiene un enlace "Diario" que lleva a una pantalla nueva.
- [x] La pantalla nueva (`apps/mobile/app/(app)/perros/[id]/diario.tsx`) muestra las entradas del diario de ese perro, ordenadas de más reciente a más antigua: fecha, texto (si tiene), fotos (si tiene) y etiquetas (si tiene).
- [x] Nueva API `GET /api/perros/[id]/diario` en `apps/web` que devuelve esas entradas ya con la URL pública de cada foto (reutilizando `urlFoto()` de `apps/web/lib/storage.ts`).
- [x] La API comprueba el token de sesión y que el perro es del usuario autenticado — 401/404 si no.
- [x] Sin entradas de diario, se muestra un mensaje ("Todavía no hay entradas de diario") en vez de una lista vacía sin explicación.
- [x] Mensajes de error razonables si la API no responde.
- [x] `pnpm build` y `pnpm lint` siguen sin errores nuevos en el resto del monorepo.
- [x] Validado por ti en Expo Go.

## Fuera de alcance

- Crear, editar o borrar entradas de diario desde el móvil — solo lectura.
- Subir fotos desde el móvil (cámara o galería) — queda para una feature futura si se decide ampliar esta pieza.
- Vista imprimible (020) en el móvil.
- Ampliar/hacer zoom sobre una foto a pantalla completa — se muestran en miniatura, igual que en la ficha web.

## Decisiones (cerradas contigo)

- Solo lectura, no se puede crear/editar desde el móvil por ahora.
- Pantalla propia (no una sección más en la de detalle de perro), enlazada desde ahí.
