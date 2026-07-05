# Roadmap

## Hecho ✅

1. **Etapa 0 · Esqueleto del monorepo** — pnpm workspaces + Turborepo, `apps/web` con Next.js + Tailwind + TypeScript.
2. **001 · Página principal** — landing (header, hero, secciones) responsive, con paleta de marca, desplegada en producción y validada por el usuario. Lighthouse: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 82.
3. **003 · Cursor hocico + enlaces con huella** — cursor en forma de hocico; cualquier enlace que navegue (interno o externo) sustituye el cursor por una huella estática. CSS puro, sin JavaScript. Validado por el usuario en el navegador.
4. **002 · Secciones temáticas** — las 5 páginas (`primeros-pasos`, `salud`, `seguridad`, `adiestramiento`, `tiempo-de-juego`) con su patrón fijo (Libreta de veterinario + artículo + Rolodex), contenido redactado y revisado sección a sección por el usuario. Incluye el tick de "leído" en la Libreta (persistido en `localStorage`) y el fix de scroll bajo el header fijo al saltar a un ancla.

## Siguiente 🔜 (en curso)

**004 · Razas de perros** — listado + ficha por raza. Separada de la 002 por ser contenido de datos estructurados, no un artículo. Esta iteración cubre solo el listado (`/razas`); la ficha individual (`/razas/[slug]`) queda para un paso posterior dentro de la misma feature.

## Backlog / features 💡

_Vacío por ahora._

## Fases posteriores (fuera del alcance de Fase 1)

- **Fase 2 · Área privada** — login/registro, base de datos, calendario y tareas.
- **Fase 3 · App móvil** — Expo / React Native, login compartido.
- **Fase 4 · Capa nativa** — módulo o app en Kotlin + Jetpack Compose.

> Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código. Una sola feature "en curso" a la vez.
