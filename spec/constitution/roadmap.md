# Roadmap

## Hecho ✅

1. **Etapa 0 · Esqueleto del monorepo** — pnpm workspaces + Turborepo, `apps/web` con Next.js + Tailwind + TypeScript.
2. **001 · Página principal** — landing (header, hero, secciones) responsive, con paleta de marca, desplegada en producción y validada por el usuario. Lighthouse: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 82.

## Siguiente 🔜

1. **002 · Secciones temáticas** — contenido de cada sección: Salud, Seguridad, Primeros pasos, Tiempo de juego, Adiestramiento/Enseñanza, Razas de perros.

## Backlog / features 💡

1. **003 · Cursor hocico + enlaces con huella** — cursor en forma de hocico; enlaces que llevan a otro sitio muestran una huella en hover.

## Fases posteriores (fuera del alcance de Fase 1)

- **Fase 2 · Área privada** — login/registro, base de datos, calendario y tareas.
- **Fase 3 · App móvil** — Expo / React Native, login compartido.
- **Fase 4 · Capa nativa** — módulo o app en Kotlin + Jetpack Compose.

> Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código. Una sola feature "en curso" a la vez.
