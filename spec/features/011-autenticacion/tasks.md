# Tasks · 011 · Autenticación

> Derivadas del `plan.md`. La tarea 1 la haces tú (con guía); el resto es código, empieza cuando la 1 esté lista.

- [ ] **1. Crear el proyecto de Supabase** (tú, guiado):
  1. Entra en [supabase.com](https://supabase.com) y crea una cuenta gratuita si no tienes una.
  2. "New project" → nombre `kovli` (o el que prefieras), elige una contraseña de base de datos (guárdala en un gestor de contraseñas, es la de Postgres, no la tuya de usuario) y una región cercana (p. ej. Europa).
  3. Cuando el proyecto esté listo, ve a "Project Settings" → "API": copia la "Project URL" y la clave "anon public".
  4. Ve a "Authentication" → "Sign In / Providers" → "Email": confirma que "Confirm email" está activado.
  5. Ve a "Authentication" → "URL Configuration": añade `http://localhost:3000/**` como redirect URL para desarrollo (más adelante se añade también la de producción).
  6. Me pasas la "Project URL" y la clave "anon public" (la "anon public" es segura de compartir en este chat; la de base de datos y cualquier "service role key" **no**, esas nunca se comparten ni se commitean).
- [ ] 2. Crear `.env.local` en `apps/web` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (confirmar que `.env*` sigue en `.gitignore`).
- [ ] 3. Instalar `@supabase/supabase-js` y `@supabase/ssr` (con tu OK explícito antes de `pnpm add`).
- [ ] 4. Esquemas Zod en `packages/schemas`: registro, login, nueva contraseña.
- [ ] 5. Cliente de Supabase para servidor y para cliente (helpers de `@supabase/ssr`).
- [ ] 6. Server Actions: registro, login, logout, solicitar recuperación, establecer nueva contraseña.
- [ ] 7. Rutas: `/registro`, `/login`, `/recuperar-contrasena`, `/restablecer-contrasena`, `/cuenta`.
- [ ] 8. `middleware.ts`: protege `/cuenta`, redirige a `/login` sin sesión.
- [ ] 9. Variables de entorno también en Vercel (producción), antes de desplegar.
- [ ] 10. `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] 11. Probar en el navegador el flujo completo: registro → confirmar email → login → `/cuenta` → logout → recuperar contraseña.
- [ ] 12. Validación tuya en el navegador.
- [ ] 13. Mover la feature a "Hecho" en `roadmap.md`.
