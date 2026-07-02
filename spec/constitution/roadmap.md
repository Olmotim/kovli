# Roadmap

## Hecho ✅

1. **Etapa 0 · Esqueleto del monorepo** — pnpm workspaces + Turborepo, `apps/web` con Next.js + Tailwind + TypeScript.
2. **001 · Página principal** — landing (header, hero, secciones) responsive, con paleta de marca, desplegada en producción y validada por el usuario. Lighthouse: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 82.
3. **003 · Cursor hocico + enlaces con huella** — cursor en forma de hocico; cualquier enlace que navegue (interno o externo) sustituye el cursor por una huella estática. CSS puro, sin JavaScript. Validado por el usuario en el navegador.

## Siguiente 🔜 (en curso)

1. **002 · Secciones temáticas** — esqueleto, navegación y MDX ya listos (ver sesión 04); antes de escribir contenido se hizo un repaso visual de la home (paleta, Hero, camino ilustrado de "Secciones" — sesión 06). En la sesión 07 se cerró el patrón de página (Libreta de veterinario + artículo + Rolodex) y se redactó el borrador completo de `primeros-pasos`, pendiente de una revisión manual del usuario antes de repetirlo en `salud`, `seguridad`, `adiestramiento` y `tiempo-de-juego`.

## Backlog / features 💡

1. **004 · Razas de perros** — listado + ficha por raza. Separada de la 002 por ser contenido de datos estructurados, no un artículo.

## Fases posteriores (fuera del alcance de Fase 1)

- **Fase 2 · Área privada** — login/registro, base de datos, calendario y tareas.
- **Fase 3 · App móvil** — Expo / React Native, login compartido.
- **Fase 4 · Capa nativa** — módulo o app en Kotlin + Jetpack Compose.

> Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código. Una sola feature "en curso" a la vez.
