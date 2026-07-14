# Tasks · 011 · Autenticación

> Derivadas del `plan.md`. La tarea 1 la haces tú (con guía); el resto es código, empieza cuando la 1 esté lista.

- [x] **1. Crear el proyecto de Supabase** (tú, guiado):
  1. Entra en [supabase.com](https://supabase.com) y crea una cuenta gratuita si no tienes una.
  2. "New project" → nombre `kovli` (o el que prefieras), elige una contraseña de base de datos (guárdala en un gestor de contraseñas, es la de Postgres, no la tuya de usuario) y una región cercana (p. ej. Europa).
  3. Cuando el proyecto esté listo, ve a "Project Settings" → "API": copia la "Project URL" y la clave "anon public".
  4. Ve a "Authentication" → "Sign In / Providers" → "Email": confirma que "Confirm email" está activado.
  5. Ve a "Authentication" → "URL Configuration": añade `http://localhost:3000/**` como redirect URL para desarrollo (más adelante se añade también la de producción).
  6. Me pasas la "Project URL" y la "Publishable key" (antes llamada "anon public" — Supabase renombró sus claves; es segura de compartir en este chat; la de base de datos y cualquier "Secret key"/"service role key" **no**, esas nunca se comparten ni se commitean).
- [x] 2. Crear `.env.local` en `apps/web` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (confirmar que `.env*` sigue en `.gitignore`).
- [x] 3. Instalar `@supabase/supabase-js` y `@supabase/ssr` (con tu OK explícito antes de `pnpm add`).
- [x] 4. Esquemas Zod en `packages/schemas`: registro, login, recuperar contraseña, nueva contraseña.
- [x] 5. Cliente de Supabase para servidor y para cliente (helpers de `@supabase/ssr`).
- [x] 6. Route Handler `app/auth/confirm/route.ts`: verifica el `token_hash` del enlace del email (`supabase.auth.verifyOtp`) y redirige a `/cuenta` (confirmación de registro) o `/restablecer-contrasena` (recuperación). Detectado al escribir los Server Actions: sin esto, los enlaces de los emails no aterrizan en ningún sitio válido de la web.
- [x] 6-bis. **Tú, en el panel de Supabase**: SMTP propio con Resend (API key "Sending access") + Authentication → Email Templates → enlace de "Confirm signup" y "Reset Password" apuntando a `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=...`.
- [x] 7. Server Actions: registro, login, logout, solicitar recuperación, establecer nueva contraseña.
- [x] 8. Rutas: `/registro`, `/login`, `/recuperar-contrasena`, `/restablecer-contrasena`, `/cuenta`.
- [x] 9. `proxy.ts` (Next.js 16 renombró `middleware.ts` → `proxy.ts`): protege `/cuenta`, redirige a `/login` sin sesión.
- [x] 10. Variables de entorno también en Vercel (producción), antes de desplegar.
- [x] 11. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 12. Probar en el navegador el flujo completo: registro → confirmar email → login → `/cuenta` → logout → recuperar contraseña.
- [x] 13. Validación tuya en el navegador.
- [x] 14. Mover la feature a "Hecho" en `roadmap.md`.
