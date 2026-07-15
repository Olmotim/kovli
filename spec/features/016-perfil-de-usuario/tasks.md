# Tasks · 016 · Perfil de usuario editable

> Derivadas del `plan.md`. Sin infraestructura nueva (reutiliza Supabase Auth y el bucket `fotos-perros`).

- [x] 1. `packages/schemas/src/perfil.ts`: `perfilSchema` y `cambiarContrasenaSchema`.
- [x] 2. `apps/web/lib/actions/perfil.ts`: `actualizarPerfilAction`, `cambiarContrasenaAction`.
- [x] 3. Componentes en `apps/web/components/perfil/`: `PerfilForm.tsx`, `CambiarContrasenaForm.tsx`.
- [x] 4. Ruta `/cuenta/perfil/page.tsx`.
- [x] 5. `/cuenta/page.tsx`: mostrar nombre/avatar si existen, enlace a `/cuenta/perfil`.
- [x] 6. `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] 7. Probar en el navegador: cambiar nombre, subir/cambiar avatar, cambiar contraseña (actual correcta e incorrecta), cerrar sesión y volver a entrar con la contraseña nueva.
- [x] 8. Validación tuya en el navegador.
- [x] 9. Mover la feature a "Hecho" en `roadmap.md`.
