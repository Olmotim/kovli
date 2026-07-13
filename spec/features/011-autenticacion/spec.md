# 011 · Autenticación

**Estado:** especificada — pendiente de crear el proyecto de Supabase antes de tocar código (ver tasks.md).

## Qué hace

Primera pieza de Fase 2: registro (con confirmación de email), inicio de sesión, cierre de sesión y recuperación de contraseña, usando Supabase Auth. Sin ningún dato de negocio todavía (ni ficha de perro, ni calendario) — solo la base de "quién eres" sobre la que se construirán las siguientes features.

Incluye una ruta privada mínima (placeholder, p. ej. `/cuenta`) que solo se puede ver con sesión iniciada, para poder validar que la protección funciona de verdad — no tiene contenido propio todavía, solo un mensaje de bienvenida y el botón de cerrar sesión.

## Por qué

Es la base de toda la Fase 2: sin usuario logueado no hay "de quién" es un perro, un evento de calendario, una tarea o una entrada de diario. Se construye sola, primero, para no mezclar la lógica de sesión con la primera feature de negocio real.

## Criterios de aceptación

- [ ] Un visitante puede registrarse con email + contraseña, y debe confirmar el email (clic en el enlace que le llega) antes de poder iniciar sesión.
- [ ] Un usuario registrado y confirmado puede iniciar sesión.
- [ ] Un usuario con sesión iniciada puede cerrarla.
- [ ] Un usuario puede solicitar recuperar su contraseña (email con enlace) y establecer una nueva.
- [ ] La ruta privada de prueba (`/cuenta`) redirige a `/login` si no hay sesión, y muestra el email del usuario si la hay.
- [ ] Contraseña con un mínimo razonable (longitud) validado antes de enviarla, con mensajes de error claros — sin depender solo de lo que rechace Supabase.
- [ ] Mensajes de error comprensibles para casos habituales: email ya registrado, credenciales incorrectas, contraseña demasiado corta.
- [ ] Ninguna clave de Supabase queda commiteada — todo vía `.env.local` (no subido) y variables de entorno de Vercel para producción.
- [ ] `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] Validado por el usuario en el navegador: registro, login, logout y acceso/bloqueo de `/cuenta`.

## Fuera de alcance

- Login social / OAuth (Google, etc.) — descartado, solo email + contraseña por ahora.
- Perfil de usuario editable (nombre, avatar, cambiar contraseña desde la UI) — se deja para una feature posterior si hace falta.
- Cualquier dato de negocio (perro, calendario, tareas, diario) — features 012 en adelante.
- Roles o permisos — no aplica, cada usuario solo ve lo suyo.

## Decisiones (cerradas contigo)

- Verificación de email obligatoria antes del primer login.
- Recuperación de contraseña incluida en esta misma feature.
- El proyecto de Supabase lo creas tú en supabase.com; te guío paso a paso.
