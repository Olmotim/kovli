# Sesión 02 — Header inicial (feature 001) + migración a WSL nativo

**Fecha:** 2026-07-01
**Estado al terminar:** Header montado en el layout. Proyecto movido de `/mnt/c/...` a `~/dev/kovli` (filesystem de Linux en WSL). `page.tsx` (hero + acceso a secciones) queda pendiente para la próxima sesión.

---

## Qué se hizo en esta sesión

1. Continuación de la feature 001: componente `Header`/`Navbar` (logo, enlaces a secciones, CTA) integrado en `apps/web/app/layout.tsx`.
2. Corrección de dos errores en el Header: posición del `<Header/>` (debe ir dentro de `<body>`, no entre `<html>` y `<body>`) y ruta del logo (debe vivir en `apps/web/public/`, no en `apps/web/app/`).
3. Diagnóstico de un servidor de desarrollo "zombi" que servía código desactualizado.
4. Diagnóstico de por qué el hot-reload no se disparaba de forma fiable al guardar en VSCode.
5. Migración completa del proyecto de `/mnt/c/Users/olmot/dev/kovli` (disco de Windows) a `~/dev/kovli` (filesystem nativo de Linux en WSL).

---

## Conceptos estudiados

### `<html>` solo admite `<head>` y `<body>` como hijos

Cualquier otro elemento (como un `<Header/>` suelto) debe ir dentro del `<body>`. Ponerlo entre `<html>` y `<body>` es HTML inválido y el navegador lo reubica de forma impredecible.

### La carpeta `public/` en Next.js

Todo lo que hay en `apps/web/public/` se sirve desde la raíz del dominio. `src="/kovliCGT.png"` busca `public/kovliCGT.png`. Un archivo fuera de `public/` (por ejemplo en `app/`) nunca es accesible por esa ruta, sin importar cómo se escriba el `src`.

### Procesos "zombi" del dev server

Si una terminal se cierra de golpe (o VSCode se cae) sin que `next dev` reciba la señal de cierre, el proceso `next-server` puede quedar huérfano corriendo en segundo plano, ocupando el puerto 3000 con una versión vieja del código. Señal de aviso: el mensaje `⚠ Port 3000 is in use by an unknown process` al arrancar. Se soluciona localizando el proceso (`ss -tlnp | grep 3000`) y matándolo antes de reintentar `pnpm dev`.

### Por qué el hot-reload fallaba: WSL + disco de Windows (`/mnt/c`)

Next.js usa `inotify` (el mecanismo nativo de Linux para "avisos de cambio de archivo") para saber cuándo recompilar. El proyecto vivía en `/mnt/c/Users/olmot/dev/kovli`, es decir, en el disco de Windows montado dentro de WSL (vía DrvFs). Cuando VSCode guarda un archivo ahí, el aviso de `inotify` no siempre llega al servidor Linux — por eso a veces recargaba y a veces no.

Se consideraron dos soluciones (documentadas en la config de Next.js — `watchOptions.pollIntervalMs`, que activa revisión por temporizador en vez de esperar el aviso del sistema — pensada originalmente para Docker):

- **Parche rápido:** activar polling. Funciona, pero introduce un pequeño retraso en cada recarga y consume más CPU; no arregla la lentitud general de trabajar sobre `/mnt/c`.
- **Solución de fondo (la elegida):** mover el proyecto al filesystem nativo de Linux. `inotify` funciona sin trucos y además todo el I/O (instalar dependencias, git, build) es más rápido.

### Por qué `node_modules` no se copia al migrar

Algunas dependencias (`sharp`, `unrs-resolver`) compilan binarios nativos específicos del sistema operativo/arquitectura durante la instalación. Un `node_modules` generado en Windows no sirve en Linux. Por eso, al migrar, se excluyen `node_modules`, `.next` y `.turbo` de la copia y se reinstala con `pnpm install` ya en Linux.

---

## Cómo se hizo la migración

```bash
# 1. Parar cualquier dev server corriendo (libera el puerto 3000)

# 2. Copiar el proyecto excluyendo lo que hay que regenerar
rsync -a --exclude 'node_modules' --exclude '.next' --exclude '.turbo' \
  /mnt/c/Users/olmot/dev/kovli/ /home/olmot/dev/kovli/

# 3. Reinstalar dependencias nativas de Linux
cd ~/dev/kovli && pnpm install

# 4. Verificar que el repo git sigue intacto
git status && git log --oneline -3 && git remote -v

# 5. Abrir el proyecto en VSCode conectado a WSL (extensión "WSL")
cd ~/dev/kovli && code .
```

Verificado: arranque en **452ms** (frente a ~21-27s sobre `/mnt/c`) y hot-reload detectado al instante sin reiniciar el servidor.

> La copia vieja en `/mnt/c/Users/olmot/dev/kovli` se deja de momento sin borrar, hasta confirmar que todo funciona bien trabajando ya desde `~/dev/kovli` en varias sesiones.

---

## Estado de la feature 001 al cerrar la sesión

- [x] Layout base con Header (logo, enlaces a secciones, CTA) — hecho a mano.
- [ ] Home (`page.tsx`): hero + acceso a las secciones — **pendiente, sigue vacío (`<main />`)**.
- [ ] Responsive, Lighthouse, deploy a Vercel, validación de criterios de aceptación.

## Próximos pasos (inicio de siguiente sesión)

1. Confirmar que `pnpm dev` sigue yendo bien desde `~/dev/kovli` tras varias sesiones; si es así, borrar la copia vieja de `/mnt/c`.
2. Diseñar y maquetar `page.tsx`: hero + cuadrícula/lista de acceso a las secciones (reutilizando el array `secciones` ya definido en `Header.tsx`).
3. Seguir con el resto del checklist de `spec/features/001-pagina-principal/tasks.md`.
