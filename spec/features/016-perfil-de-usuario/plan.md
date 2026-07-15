# 016 · Perfil de usuario editable — Plan

> Respeta `constitution/tech-stack.md`. Sin Prisma, sin dependencias nuevas — todo vía `@supabase/supabase-js` (`lib/supabase/server.ts`, ya existente desde la 011) y el bucket `fotos-perros` ya existente.

## Enfoque

Todo pasa por el cliente de servidor de Supabase Auth, no por Prisma: `supabase.auth.updateUser()` para nombre/avatar/contraseña. La pieza que Supabase no da gratis es **verificar la contraseña actual** antes de cambiarla — `updateUser({ password })` no la pide, solo exige sesión iniciada. Se resuelve reautenticando a mano: `supabase.auth.signInWithPassword({ email, password: contraseñaActual })` antes de `updateUser`; si falla, es que la contraseña actual no era correcta.

## Implementación

1. **`packages/schemas/src/perfil.ts`**: `perfilSchema` (`nombre` opcional, recortado, longitud máxima) y `cambiarContrasenaSchema` (`contraseñaActual`, `contraseñaNueva`, `confirmar` — `.refine()` para que `contraseñaNueva === confirmar`, mismas reglas de longitud mínima que `authSchema` de la 011).
2. **`apps/web/lib/actions/perfil.ts`**:
   - `actualizarPerfilAction`: valida `nombre`; si llega un archivo de avatar, lo sube a `usuarioId/avatar.<ext>` con `upsert: true` (reutilizando `extensionDeArchivo` de `lib/storage.ts`); llama a `supabase.auth.updateUser({ data: { nombre, avatarPath } })`.
   - `cambiarContrasenaAction`: valida el formulario; `signInWithPassword(user.email, contraseñaActual)` — si falla, devuelve "La contraseña actual no es correcta"; si acierta, `updateUser({ password: contraseñaNueva })`.
3. **Componentes** (`apps/web/components/perfil/`): `PerfilForm.tsx` (nombre + avatar, reutiliza `CampoFoto`-style), `CambiarContrasenaForm.tsx` (tres campos, mismo patrón `useActionState`).
4. **Ruta** `/cuenta/perfil/page.tsx`: lee `user.user_metadata` para los valores iniciales, monta los dos formularios.
5. **`/cuenta/page.tsx`**: mostrar `user.user_metadata?.nombre` en vez del email cuando exista, y el avatar si existe, junto al enlace nuevo a `/cuenta/perfil`.
6. Verificar `pnpm build`/`pnpm lint`, y probar en el navegador: cambiar nombre, subir/cambiar avatar, cambiar contraseña con la actual correcta e incorrecta, cerrar sesión y volver a entrar con la contraseña nueva.

## Decisiones (cerradas contigo)

- Sin tabla Prisma nueva: `user_metadata` de Supabase Auth.
- Avatar en el bucket `fotos-perros`, ruta fija con `upsert: true`.
- Cambiar contraseña reautentica con `signInWithPassword` para comprobar la actual.

## Riesgos

- `signInWithPassword` genera una sesión nueva — en teoría no debería alterar la sesión ya activa del navegador (Supabase gestiona el token de forma transparente), pero conviene probarlo explícitamente en el navegador antes de dar la feature por cerrada, no solo confiar en la documentación.
- El campo `user_metadata` no está protegido por ningún esquema propio (a diferencia de una tabla Prisma con Zod delante) — solo se valida en el momento de guardar, no hay garantía de forma a nivel de base de datos. Aceptable para dos campos opcionales de bajo riesgo.
