# Sesión 02 — Home completa de la feature 001 (Header, Hero, Secciones) + migración a WSL nativo + Lighthouse + despliegue

**Fecha:** 2026-07-01
**Estado al terminar:** Home de la feature 001 completa (Header, Hero, Secciones) y desplegada en producción en `https://kovli.vercel.app`. Todo committeado y pusheado a GitHub. Copia vieja de `/mnt/c/Users/olmot/dev/kovli` borrada — `~/dev/kovli` es ahora la única copia. Vercel conectado a GitHub desde el dashboard (por el usuario, no verificado aún con un push real). **La feature 001 NO se marca como "Hecho" todavía — el usuario quiere revisarla él mismo primero en la próxima sesión.**

---

## Qué se hizo en esta sesión (resumen completo)

1. Header/Navbar (logo, enlaces a secciones, CTA) integrado en el layout — arreglada su posición y la ruta del logo.
2. Migración completa del proyecto de `/mnt/c/Users/olmot/dev/kovli` (Windows) a `~/dev/kovli` (Linux nativo en WSL), por problemas de hot-reload.
3. Construcción de `page.tsx`: componentes `Hero.tsx` y `Secciones.tsx`, con un array de datos compartido en `lib/secciones.ts`.
4. Sesión de depuración guiada: bug de contenido vacío en las tarjetas, mala colocación de la prop `key` en una lista, varios typos de clases de Tailwind (`cafe` en vez de `text-cafe`, `padding-5` en vez de `p-5`, `border-stone` inexistente, `--font-inter` que no es una clase).
5. Bug de herencia de `font-size` en el Hero (el subtítulo heredaba el mismo tamaño que el título).
6. Revisión de responsive con capturas reales (Playwright + Chromium headless) en móvil y escritorio.
7. Auditoría de Lighthouse completa (dos rondas): rendimiento, accesibilidad, buenas prácticas, SEO.
8. Optimización del logo (1.4 MB → 6.5 KB) y migración de `<img>` a `next/image`.
9. Arreglos de accesibilidad: landmark `<main>` que faltaba, contraste de color en la descripción de las tarjetas.
10. Despliegue a producción en Vercel vía CLI.
11. Rediseño visual del Hero y las Secciones (etiquetas "eyebrow", CTA, fondo decorativo, iconos, enlace "Ver más").
12. Commit y push a GitHub.

---

## Conceptos estudiados

### `<html>` solo admite `<head>` y `<body>` como hijos

Cualquier otro elemento (como un `<Header/>` suelto) debe ir dentro del `<body>`. Ponerlo entre `<html>` y `<body>` es HTML inválido.

### La carpeta `public/` en Next.js

Todo lo que hay en `apps/web/public/` se sirve desde la raíz del dominio. `src="/kovliCGT.png"` busca `public/kovliCGT.png`. Un archivo fuera de `public/` nunca es accesible por esa ruta.

### Procesos "zombi" del dev server

Si una terminal se cierra de golpe sin que `next dev` reciba la señal de cierre, `next-server` puede quedar huérfano corriendo en segundo plano, ocupando el puerto 3000 con código viejo. Señal de aviso: `⚠ Port 3000 is in use by an unknown process`. Se soluciona localizando el proceso (`ss -tlnp | grep 3000`) y matándolo.

### Por qué el hot-reload fallaba: WSL + disco de Windows (`/mnt/c`)

Next.js usa `inotify` (aviso nativo de Linux para cambios de archivo). Sobre `/mnt/c` (disco de Windows montado vía DrvFs), ese aviso no siempre llega al servidor Linux cuando VSCode guarda un archivo.

Dos soluciones posibles: activar `watchOptions.pollIntervalMs` (parche, pensado para Docker, añade retraso) o **mover el proyecto al filesystem nativo de Linux** (solución de fondo, la elegida — además de arreglar el watcher, todo el I/O va más rápido).

### Por qué `node_modules` no se copia al migrar

`sharp` y `unrs-resolver` compilan binarios nativos específicos del SO/arquitectura. Un `node_modules` de Windows no sirve en Linux — hay que excluirlo de la copia y reinstalar con `pnpm install` ya en Linux.

### La prop `key` en listas de React

Cuando se usa `.map()` para renderizar una lista, `key` debe ir en el elemento que el `.map()` devuelve directamente en cada vuelta (el nodo "raíz" de esa iteración), no en un hijo suyo más adentro. React la usa para identificar cada elemento entre renders y no confundir cuál es cuál si la lista cambia de orden. Mejor usar un dato ya único del propio array (como `label`) que un índice numérico inventado, porque el índice puede desincronizarse si la lista se reordena.

### Nombres de clases de Tailwind — errores típicos que no dan error visible

Tailwind ignora en silencio cualquier clase que no reconozca: no hay warning ni fallo, simplemente no aplica ningún estilo. Varios encontrados esta sesión:
- `--font-inter` — es el nombre de una variable CSS, no una clase utilitaria.
- `padding-5` — la convención es `p-5` (abreviaturas fijas: `p`, `px`, `py`, `m`, etc.).
- `border-stone` — los colores necesitan un tono numérico (`stone-200`), y además `stone` no es un color de la paleta de marca de este proyecto.
- `cafe` a secas — le faltaba el prefijo de la propiedad (`text-cafe`).

### Herencia de `font-size` en CSS

Si el tamaño de texto se pone en un `<div>` contenedor en vez de en cada hijo, todos los hijos sin tamaño propio heredan ese mismo tamaño. Por eso el subtítulo del Hero se veía tan grande como el título — había que poner el tamaño en el `<h1>` y en el `<p>` por separado.

### Qué es Lighthouse

Herramienta de Google que abre la página y la audita en 4 categorías: **Rendimiento**, **Accesibilidad**, **Buenas prácticas** y **SEO**, dando una puntuación 0-100 y una lista de diagnósticos concretos por cada fallo. Es uno de los criterios de aceptación de la feature 001.

**Primera ronda (sobre build de producción, antes de optimizar):**

| Categoría | Puntuación |
|---|---|
| Rendimiento | 72 |
| Accesibilidad | 93 |
| Buenas prácticas | 100 |
| SEO | 100 |

Hallazgo principal: el logo (`kovliCGT.png`) pesaba **1.4 MB** a 1024×1024px mostrándose a 64px de alto → ~1.381 KB desperdiciados (86% del peso total de la página). LCP simulado: 9.0s.

**Segunda ronda (tras optimizar la imagen y pasar a `next/image`):**

| Categoría | Puntuación |
|---|---|
| Rendimiento | **96** |
| Accesibilidad | **95** |
| Buenas prácticas | 100 |
| SEO | 100 |

LCP: 9.0s → **2.1s**. Peso total: 1.609 KB → **238 KB**.

El único fallo de accesibilidad que queda (contraste del texto `apricot` en el Hero) es una decisión de diseño consciente, no un descuido — el usuario prefirió mantener ese color por la jerarquía visual que aporta, sabiendo que no cumple el contraste mínimo de WCAG (4.5:1; el ratio real es ~2.03:1).

### `next/image` frente a `<img>`

El componente `Image` de `next/image` optimiza automáticamente la imagen en el servidor (redimensiona, sirve formatos modernos como WebP/AVIF si el navegador lo soporta, evita bloquear el render). Requiere `width`/`height` como las dimensiones **intrínsecas** del archivo fuente (no el tamaño visual final, que lo sigue controlando el CSS). La prop `priority` evita el lazy-loading por defecto para imágenes visibles nada más cargar (como un logo en el Header).

### Redimensionar imágenes con `sharp`

`sharp` (dependencia transitiva de Next.js, usada para la optimización de imágenes) se puede usar directamente para preprocesar assets: se redimensionó el logo de 1024×1024 a 256×256 antes de subirlo a `public/`, reduciendo su peso de 1.4 MB a 6.5 KB.

### Vercel CLI y monorepos

Para desplegar **un solo proyecto** dentro de un monorepo (este caso: solo `apps/web`), el flujo correcto es correr `vercel link` **desde la carpeta de esa app**, no desde la raíz del repo. `vercel link --repo` (desde la raíz) es para un escenario distinto: vincular varios proyectos del monorepo a la vez.

`vercel --prod` sube el código local directamente y lo despliega — es un flujo **independiente** de conectar el proyecto a GitHub. Sin la integración de Git configurada aparte (vía dashboard, autorizando acceso OAuth), un `git push` **no** dispara un despliegue automático. Quedó decidido dejar esa conexión para otra sesión.

### `sudo` y el `PATH` de `nvm`

Cuando Node.js se instala con `nvm`, sus binarios (`node`, `npx`) viven en una ruta de usuario que `sudo` no ve por defecto (usa un `PATH` restringido, `secure_path`). Por eso `sudo npx ...` fallaba con `command not found`. Solución: `sudo env "PATH=$PATH" npx ...`, que propaga explícitamente el `PATH` actual al proceso que corre con privilegios elevados.

### Patrones visuales usados en el rediseño (Hero/Secciones)

- **Manchas de fondo difuminadas ("blobs"):** `<div>` vacíos con `absolute`, `blur-3xl` y un color semitransparente (`bg-apricot/30`), dentro de un contenedor `relative overflow-hidden` para que no rompan el layout.
- **`aria-hidden="true"`:** en elementos puramente decorativos (los blobs, los emojis-icono) para que los lectores de pantalla los ignoren.
- **Navegación por ancla (`href="#secciones"` + `id="secciones"`):** scroll suave sin JavaScript, solo HTML.
- **Patrón "eyebrow":** una etiqueta pequeña (`rounded-full`, texto en mayúsculas, `text-xs`) encima de un título grande, para dar jerarquía visual.
- **Icono dentro de un cuadradito de color:** un `<span>` con `w-12 h-12 rounded-xl bg-apricot` alrededor del emoji, en vez del emoji suelto.

---

## Cómo se hizo la migración a WSL

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

> La copia vieja en `/mnt/c/Users/olmot/dev/kovli` sigue sin borrarse — pendiente de confirmar que todo va bien desde `~/dev/kovli` en más sesiones antes de eliminarla. Ojo: el primer `vercel link` de esta sesión se hizo sin querer desde esa copia vieja; el archivo `.vercel/project.json` se copió a mano a la ubicación correcta (`~/dev/kovli/apps/web/.vercel/`).

---

## Decisiones de diseño tomadas (para que no se repitan las preguntas)

- **Contraste del hero (`text-apricot` sobre `crema`, ~2.03:1):** mantenido a propósito por el usuario, pese a fallar el contraste mínimo de accesibilidad — le gusta la jerarquía visual que da frente a `cafe`/`chocolate`.
- **Navegación del Header en móvil:** se deja sin menú hamburguesa por ahora (`hidden lg:flex` oculta enlaces y CTA por debajo de 1024px). Decisión consciente para no meter alcance nuevo en la feature 001 — la home ya da acceso a las secciones vía las tarjetas.
- **`href` de las secciones vacíos (`""`):** correcto y esperado — las páginas reales de cada sección son la feature 002, fuera del alcance de esta feature.

---

## Despliegue

- **Producción:** https://kovli.vercel.app
- **Proyecto Vercel:** `kovli`, org `olmo-timon-s-projects`
- **Método:** CLI (`vercel --prod`), sin integración de Git todavía.

---

## Estado de la feature 001 al cerrar la sesión

- [x] Crear `apps/web` con Next.js + TypeScript.
- [x] Configurar Tailwind y tokens de la paleta.
- [x] Layout base (Header, fuentes, estilos globales) — hecho a mano.
- [x] Home: Hero + acceso a las secciones — hecho, con rediseño visual.
- [x] Responsive verificado (móvil y escritorio).
- [x] Lighthouse: rendimiento 96, accesibilidad 95, buenas prácticas 100, SEO 100.
- [x] Desplegado en Vercel y verificado en producción.
- [x] Validado contra los criterios de aceptación de `spec.md`.
- [ ] Mover la feature a "Hecho" en `roadmap.md` — pendiente de tu confirmación final.

## Próximos pasos (inicio de siguiente sesión)

1. **El usuario quiere revisar él mismo la feature 001 antes de marcarla como "Hecho"** en `constitution/roadmap.md` — no darlo por cerrado automáticamente al empezar la sesión.
2. Vercel ya está conectado a GitHub desde el dashboard web (lo hizo el usuario, no por CLI) — **pendiente de confirmar que funciona de verdad**: en el próximo `git push`, comprobar si dispara un despliegue automático (`vercel ls` debería mostrar un deployment nuevo con esa fecha).
3. ~~Si todo sigue bien desde `~/dev/kovli` tras varias sesiones, borrar la copia vieja de `/mnt/c/Users/olmot/dev/kovli`.~~ Hecho — la copia vieja ya se borró en esta misma sesión (2026-07-01), confirmado que `~/dev/kovli` es ahora la única copia del proyecto.
4. Arreglar el warning menor de build (`outputFileTracingRoot` vs `turbopack.root` no coinciden) — cosmético, no bloqueante.
5. Empezar la feature 002 (secciones temáticas) cuando toque, siguiendo spec → plan → tasks.
