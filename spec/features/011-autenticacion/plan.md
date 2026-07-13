# 011 · Autenticación — Plan

> Respeta `constitution/tech-stack.md`. Pendiente de que crees el proyecto de Supabase (paso 1) antes de tocar código.

## Enfoque

Supabase Auth gestiona usuarios y sesión por su cuenta (tabla `auth.users` propia, no algo que definamos nosotros). No hace falta Prisma todavía para esta feature — no hay ninguna tabla de negocio propia, así que `packages/db` se deja para la feature 012 (ficha de perro), cuando sí haya algo que modelar con Prisma.

## Implementación

1. **Crear el proyecto en Supabase** (lo crea el usuario en supabase.com, guiado paso a paso — ver `tasks.md`). De ahí salen las claves (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) que van a `.env.local` (nunca al repo) y, para producción, a las variables de entorno del proyecto en Vercel. También hay que activar en el panel de Supabase ("Authentication" → "Providers" → Email) la confirmación de email obligatoria, y configurar la URL de redirección tras confirmar/recuperar contraseña para que apunte a Kovli (local y producción).
2. **Instalar dependencias nuevas** (con tu aviso explícito antes de `pnpm add`, como manda `CLAUDE.md`): `@supabase/supabase-js` y `@supabase/ssr` (esta última gestiona la sesión vía cookies en Next.js App Router — Server Components y Server Actions necesitan leer la sesión en el servidor, no solo en el cliente).
3. **`packages/schemas`**: esquemas Zod para registro (email válido, contraseña con longitud mínima), login y "nueva contraseña" — se usan tanto en el formulario (feedback inmediato) como en el Server Action (nunca confiar solo en la validación del cliente).
4. **Rutas nuevas en `apps/web/app/`:**
   - `/registro` — formulario de registro. Tras enviarlo, mensaje de "revisa tu email para confirmar la cuenta" (no hay sesión todavía).
   - `/login` — formulario de inicio de sesión, con enlace a "¿olvidaste tu contraseña?".
   - `/recuperar-contrasena` — formulario para pedir el email de recuperación.
   - `/restablecer-contrasena` — formulario de nueva contraseña, al que llega el usuario desde el enlace del email (requiere una sesión temporal que Supabase crea solo para este paso).
   - `/cuenta` — ruta protegida de prueba: si no hay sesión, redirige a `/login`; si la hay, muestra el email del usuario y un botón de cerrar sesión.
5. **Server Actions** para registro/login/logout/recuperación (en vez de API routes manuales) — reciben los datos del formulario, los validan con Zod, y llaman al SDK de Supabase.
6. **`middleware.ts`** en la raíz de `apps/web` — comprueba la sesión antes de servir rutas privadas (empieza solo con `/cuenta`; cuando lleguen 012+, se amplía la lista de rutas protegidas aquí mismo, sin tocar cada página).
7. Verificar `pnpm build`/`pnpm lint`, y probar en el navegador: registro → email de confirmación → login, acceso a `/cuenta`, logout, recuperar contraseña de principio a fin, y que `/cuenta` sin sesión redirige a `/login`.

## Decisiones (cerradas contigo)

- Infraestructura: Supabase (Auth + Postgres + Storage).
- Login: email + contraseña, sin OAuth.
- ORM (Prisma) no entra en esta feature — llega en la 012.

## Riesgos

- Es la primera vez que el proyecto maneja datos sensibles de verdad (contraseñas, sesión) — cuidado extra revisando que ninguna clave quede en el repo ni en logs.
- Primera dependencia externa de pago-potencial (Supabase tiene plan gratuito generoso, pero conviene que sepas dónde ver el uso/límites del plan antes de que la app tenga usuarios reales).
