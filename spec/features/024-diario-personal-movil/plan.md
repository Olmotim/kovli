# 024 · Diario personal en el móvil — Plan

> Respeta `constitution/tech-stack.md`. Sin dependencias nuevas previstas en esta feature.

## Enfoque

Misma división que las piezas anteriores de Fase 3: un Route Handler nuevo en `apps/web` y una pantalla nueva en `apps/mobile`, con un enlace desde la pantalla de detalle de perro ya existente (022/023).

## Implementación

1. **Route Handler** `apps/web/app/api/perros/[id]/diario/route.ts` (método `GET`):
   - Mismo arranque de auth que las demás APIs del móvil (`Authorization: Bearer`, cliente Supabase sin cookies, `getUser(token)`).
   - `prisma.perro.findFirst({ where: { id, usuarioId: user.id } })` — 404 si no es del usuario.
   - `prisma.entradaDiario.findMany({ where: { perroId: id }, orderBy: { fecha: "desc" } })` — mismo orden que la ficha web.
   - Devuelve JSON: `{ entradas: [{ id, fecha, texto, etiquetas, fotos: [url, ...] }] }`, con cada ruta de `fotos` ya convertida a URL pública vía `urlFoto()` de `apps/web/lib/storage.ts` (mismo patrón que `FilaEntradaDiario.tsx` en la web) — así el móvil no necesita saber nada del bucket de Supabase, solo pinta URLs de imagen normales.
2. **Enlace "Diario"** en `apps/mobile/app/(app)/perros/[id].tsx`: un `<Link href={{ pathname: "/perros/[id]/diario", params: { id } }}>` nuevo, junto a las secciones de "Cuidados" y "Rutinas de hoy".
3. **Pantalla nueva** `apps/mobile/app/(app)/perros/[id]/diario.tsx` (ruta anidada bajo la del perro — Expo Router la reconoce igual que una carpeta):
   - Al montar, llama a la API nueva con el `id` de la ruta.
   - Pinta cada entrada: fecha, texto (si tiene, con saltos de línea respetados), etiquetas como chips (si tiene), fotos en una fila de miniaturas con `<Image>` (si tiene).
   - Sin entradas: mensaje "Todavía no hay entradas de diario".
   - Botón "‹ [nombre del perro]" arriba para volver, mismo patrón que el botón "‹ Mis perros" de la pantalla de detalle.
4. Verificar `pnpm build`/`pnpm lint` en el resto del monorepo.
5. Probar en Expo Go: entrar en un perro con entradas de diario (texto, fotos y etiquetas variadas) desde el enlace nuevo, comprobar que se ven bien, volver atrás.

## Decisiones (cerradas contigo)

- Solo lectura, pantalla propia (no sección de la pantalla de detalle).
- Las fotos llegan como URLs públicas ya resueltas por el backend, no como rutas del bucket — el móvil no necesita lógica de Storage.

## Riesgos

- Ninguno nuevo respecto a la 022 (misma auth, mismo Prisma, primera vez que se pintan varias imágenes de red a la vez en el móvil pero sin librería nueva — `<Image>` de React Native ya soporta `{ uri }`).
