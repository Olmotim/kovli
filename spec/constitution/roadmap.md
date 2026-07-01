# Roadmap

## Hecho ✅

1. **Etapa 0 · Esqueleto del monorepo** — pnpm workspaces + Turborepo, `apps/web` con Next.js + Tailwind + TypeScript.
2. **001 · Página principal** — landing (header, hero, secciones) responsive, con paleta de marca, desplegada en producción y validada por el usuario. Lighthouse: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 82.
3. **003 · Cursor hocico + enlaces con huella** — cursor en forma de hocico; cualquier enlace que navegue (interno o externo) sustituye el cursor por una huella estática. CSS puro, sin JavaScript. Validado por el usuario en el navegador.

## Siguiente 🔜 (en curso)

1. **002 · Secciones temáticas** — esqueleto, navegación y MDX ya listos (ver sesión 04); falta redactar el contenido real de cada sección. Se retoma ahora que la 003 está cerrada.

## Backlog / features 💡

1. **004 · Razas de perros** — listado + ficha por raza. Separada de la 002 por ser contenido de datos estructurados, no un artículo.

## Fases posteriores (fuera del alcance de Fase 1)

- **Fase 2 · Área privada** — login/registro, base de datos, calendario y tareas.
- **Fase 3 · App móvil** — Expo / React Native, login compartido.
- **Fase 4 · Capa nativa** — módulo o app en Kotlin + Jetpack Compose.

> Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código. Una sola feature "en curso" a la vez.
