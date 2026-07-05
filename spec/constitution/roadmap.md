# Roadmap

## Hecho ✅

1. **Etapa 0 · Esqueleto del monorepo** — pnpm workspaces + Turborepo, `apps/web` con Next.js + Tailwind + TypeScript.
2. **001 · Página principal** — landing (header, hero, secciones) responsive, con paleta de marca, desplegada en producción y validada por el usuario. Lighthouse: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 82.
3. **003 · Cursor hocico + enlaces con huella** — cursor en forma de hocico; cualquier enlace que navegue (interno o externo) sustituye el cursor por una huella estática. CSS puro, sin JavaScript. Validado por el usuario en el navegador.
4. **002 · Secciones temáticas** — las 5 páginas (`primeros-pasos`, `salud`, `seguridad`, `adiestramiento`, `tiempo-de-juego`) con su patrón fijo (Libreta de veterinario + artículo + Rolodex), contenido redactado y revisado sección a sección por el usuario. Incluye el tick de "leído" en la Libreta (persistido en `localStorage`) y el fix de scroll bajo el header fijo al saltar a un ancla.
5. **004 · Razas de perros** — listado (`/razas`) con las 15 razas y ficha individual por raza (`/razas/[slug]`), datos estructurados en `apps/web/data/breeds.ts`. La ficha enlaza a Primeros pasos cuando la raza no es apta para primerizos. Validado por el usuario en el navegador.

## Siguiente 🔜 (en curso)

_Ninguna feature en curso — la próxima sesión empieza concretando spec/plan/tasks de una de las dos ideas de abajo._

## Backlog / features 💡

1. **Buscador y filtros en `/razas`** (por tamaño, energía, apto-primerizos) — ya anotado como v2 en `spec/features/004-razas-de-perros/spec.md` (fuera de alcance de la 004). Falta decidir cuándo se aborda y con qué spec/plan/tasks propios.
2. **005 · Apartado de ONGs y organizaciones relacionadas con perros** — nuevo apartado en la página principal. Todavía sin `spec.md`/`plan.md`/`tasks.md`; se concreta en la próxima sesión (qué contenido exacto, de dónde salen los datos de las organizaciones, dónde se ubica en la home).

## Fases posteriores (fuera del alcance de Fase 1)

- **Fase 2 · Área privada** — login/registro, base de datos, calendario y tareas.
- **Fase 3 · App móvil** — Expo / React Native, login compartido.
- **Fase 4 · Capa nativa** — módulo o app en Kotlin + Jetpack Compose.

> Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código. Una sola feature "en curso" a la vez.
