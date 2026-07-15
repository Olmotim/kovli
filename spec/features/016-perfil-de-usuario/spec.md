# 016 · Perfil de usuario editable

**Estado:** spec y plan cerrados — documentado para implementar en la próxima sesión, sin tocar código todavía.

## Qué hace

Nueva página `/cuenta/perfil` donde el usuario puede: cambiar su nombre, subir/cambiar una foto de perfil (avatar), y cambiar su contraseña. Es lo primero que se deja de aplazar de la lista de "fuera de alcance" de la 011.

## Por qué

La 011 dejó esto fuera a propósito para no sobre-construir antes de tener datos de negocio. Con Fase 2 completa, tiene sentido cerrarlo: un nombre hace más personal el "Sesión iniciada como..." de `/cuenta`, y no había ninguna forma de cambiar la contraseña sin pasar por "olvidé mi contraseña".

## Modelo de datos

**Sin tabla de Prisma nueva.** El nombre y la ruta del avatar se guardan en el `user_metadata` de Supabase Auth (`supabase.auth.updateUser({ data: { nombre, avatarPath } })`) — es la misma tabla `auth.users` que ya gestiona Supabase, a la que Prisma no tiene acceso directo (por eso `Perro.usuarioId` es solo un `String`, no una relación Prisma). Crear una tabla `Usuario` en Prisma solo para dos campos sería duplicar lo que Supabase ya ofrece de serie.

El avatar reutiliza el bucket `fotos-perros` ya existente, bajo una ruta fija por usuario: `usuarioId/avatar.<ext>`. Al ser una ruta fija (no aleatoria como las fotos de perro/diario), subir uno nuevo con `upsert: true` sustituye el anterior automáticamente, sin tener que borrar el archivo viejo a mano.

## Criterios de aceptación

- [ ] `/cuenta` tiene un enlace a `/cuenta/perfil`.
- [ ] El usuario puede guardar un nombre (texto libre, opcional) que sustituye al email en "Sesión iniciada como..." de `/cuenta` cuando existe.
- [ ] El usuario puede subir o cambiar su avatar (opcional); se muestra en `/cuenta/perfil` y, si existe, también junto al nombre en `/cuenta`.
- [ ] El usuario puede cambiar su contraseña desde un formulario aparte: contraseña actual, contraseña nueva y confirmación. Si la contraseña actual no es correcta, error claro sin cambiar nada.
- [ ] Validación de los datos con Zod (`packages/schemas`).
- [ ] `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] Validado por el usuario en el navegador: cambiar nombre, subir avatar, cambiar contraseña (con la actual correcta e incorrecta), y volver a iniciar sesión con la contraseña nueva.

## Fuera de alcance

- Login social / OAuth — descartado explícitamente por el usuario.
- Cambiar el email de la cuenta.
- Borrar la cuenta.
- Historial de avatares anteriores — solo se guarda el actual (se sobrescribe).

## Decisiones (cerradas contigo)

- Nombre y avatar viven en `user_metadata` de Supabase Auth, sin tabla Prisma nueva.
- Avatar reutiliza el bucket `fotos-perros`, ruta fija `usuarioId/avatar.<ext>` con `upsert: true`.
- Cambiar contraseña exige escribir la contraseña actual (capa extra de seguridad frente a sesión ya iniciada en un dispositivo compartido).
