# Roadmap

## Hecho ✅

1. **Etapa 0 · Esqueleto del monorepo** — pnpm workspaces + Turborepo, `apps/web` con Next.js + Tailwind + TypeScript.
2. **001 · Página principal** — landing (header, hero, secciones) responsive, con paleta de marca, desplegada en producción y validada por el usuario. Lighthouse: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 82.
3. **003 · Cursor hocico + enlaces con huella** — cursor en forma de hocico; cualquier enlace que navegue (interno o externo) sustituye el cursor por una huella estática. CSS puro, sin JavaScript. Validado por el usuario en el navegador.
4. **002 · Secciones temáticas** — las 5 páginas (`primeros-pasos`, `salud`, `seguridad`, `adiestramiento`, `tiempo-de-juego`) con su patrón fijo (Libreta de veterinario + artículo + Rolodex), contenido redactado y revisado sección a sección por el usuario. Incluye el tick de "leído" en la Libreta (persistido en `localStorage`) y el fix de scroll bajo el header fijo al saltar a un ancla.
5. **004 · Razas de perros** — listado (`/razas`) con las 15 razas y ficha individual por raza (`/razas/[slug]`), datos estructurados en `apps/web/data/breeds.ts`. La ficha enlaza a Primeros pasos cuando la raza no es apta para primerizos. Validado por el usuario en el navegador.
6. **005 · Buscador y filtros en `/razas`** — caja de texto por nombre (sin distinguir acentos/mayúsculas) + filtros por tamaño/energía/apto-primerizos con multi-selección (`BreedsExplorer.tsx`, Client Component), todo en cliente sin tocar la URL. Validado por el usuario en el navegador.
7. **006 · Organizaciones de ayuda y/o adopción** — directorio en la home (`Organizaciones.tsx`, Client Component), debajo de "Secciones": pestañas "Todos/España/Argentina" (generadas a partir de los datos), agrupado por país, 8 organizaciones reales verificadas en `apps/web/data/organizaciones.ts`. Validado por el usuario en el navegador.

## Siguiente 🔜 (en curso)

_Ninguna feature en curso._

## Backlog / features 💡

1. **Vista de mapa interactivo para el directorio de organizaciones** (Leaflet/Mapbox, sincronizado con la lista) — valorado como v2 de la 006 tras probar el directorio simple. Añade una dependencia nueva, coordenadas por organización y sincronizar el marcador con la fila seleccionada. Ver "Fuera de alcance" en `spec/features/006-organizaciones-ayuda-adopcion/spec.md`.

## Fases posteriores (fuera del alcance de Fase 1)

- **Fase 2 · Área privada** — login/registro, base de datos, calendario y tareas.
- **Fase 3 · App móvil** — Expo / React Native, login compartido.
- **Fase 4 · Capa nativa** — módulo o app en Kotlin + Jetpack Compose.

> Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código. Una sola feature "en curso" a la vez.
