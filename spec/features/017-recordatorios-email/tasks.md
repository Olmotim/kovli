# Tasks · 017 · Recordatorios por email

> Derivadas del `plan.md`. Las tareas 1-3 las haces tú (guiado); el resto es código.

- [ ] 1. **Generar `CRON_SECRET`** (tú, guiado): un valor aleatorio largo, ej. con `openssl rand -hex 32` en una terminal. Se guarda en `.env.local` y en Vercel, nunca en el repo.
- [ ] 2. **Crear una API key de Resend** (tú, guiado): en el panel de Resend, una API key nueva con permiso de envío (distinta de las credenciales SMTP ya usadas para los emails de Supabase). Va a `RESEND_API_KEY`.
- [ ] 3. **Obtener la `service role key` de Supabase** (tú, guiado): panel de Supabase → "Project Settings" → "API" → "service_role" (secreta, distinta de la "anon"/publishable ya usada). Va a `SUPABASE_SERVICE_ROLE_KEY` — te recuerdo el mismo cuidado que con las demás claves: nunca al repo, y explico por qué esta en concreto es especialmente sensible (salta todas las políticas de seguridad).
- [ ] 4. `packages/domain`: generalizar `estadoCuidado()` con el parámetro `diasParaProximo`, y añadir `cuidadosPendientes()` y `tareasSinCompletarHoy()`.
- [ ] 5. `apps/web/lib/email.ts`: cliente Resend + `enviarDigest()`.
- [ ] 6. `apps/web/app/api/cron/recordatorios/route.ts`: la Route Handler completa (comprobación de `CRON_SECRET`, cálculo por usuario, envío).
- [ ] 7. `vercel.json`: configuración del cron.
- [ ] 8. Variables de entorno (`CRON_SECRET`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) en `.env.local` y en Vercel.
- [ ] 9. `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] 10. Probar en local: `curl` a la ruta con y sin el secreto correcto; comprobar que el email llega con el contenido esperado para un usuario con cuidados/rutinas pendientes, y que no llega nada si no tiene ninguno.
- [ ] 11. Validación tuya en el navegador/email.
- [ ] 12. Mover la feature a "Hecho" en `roadmap.md`.
