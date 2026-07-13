# Roadmap

## Hecho ✅

1. **Etapa 0 · Esqueleto del monorepo** — pnpm workspaces + Turborepo, `apps/web` con Next.js + Tailwind + TypeScript.
2. **001 · Página principal** — landing (header, hero, secciones) responsive, con paleta de marca, desplegada en producción y validada por el usuario. Lighthouse: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 82.
3. **003 · Cursor hocico + enlaces con huella** — cursor en forma de hocico; cualquier enlace que navegue (interno o externo) sustituye el cursor por una huella estática. CSS puro, sin JavaScript. Validado por el usuario en el navegador.
4. **002 · Secciones temáticas** — las 5 páginas (`primeros-pasos`, `salud`, `seguridad`, `adiestramiento`, `tiempo-de-juego`) con su patrón fijo (Libreta de veterinario + artículo + Rolodex), contenido redactado y revisado sección a sección por el usuario. Incluye el tick de "leído" en la Libreta (persistido en `localStorage`) y el fix de scroll bajo el header fijo al saltar a un ancla.
5. **004 · Razas de perros** — listado (`/razas`) con las 15 razas y ficha individual por raza (`/razas/[slug]`), datos estructurados en `apps/web/data/breeds.ts`. La ficha enlaza a Primeros pasos cuando la raza no es apta para primerizos. Validado por el usuario en el navegador.
6. **005 · Buscador y filtros en `/razas`** — caja de texto por nombre (sin distinguir acentos/mayúsculas) + filtros por tamaño/energía/apto-primerizos con multi-selección (`BreedsExplorer.tsx`, Client Component), todo en cliente sin tocar la URL. Validado por el usuario en el navegador.
7. **006 · Organizaciones de ayuda y/o adopción** — directorio en la home (`Organizaciones.tsx`, Client Component), debajo de "Secciones": pestañas "Todos/España/Argentina" (generadas a partir de los datos), agrupado por país, 8 organizaciones reales verificadas en `apps/web/data/organizaciones.ts`. Validado por el usuario en el navegador.
8. **007 · Mapa interactivo del directorio de organizaciones** — vista de mapa (Leaflet + OpenStreetMap) sincronizada con la lista de la 006: split view en escritorio (lista | mapa, mapa sticky), apilado en móvil (mapa arriba). Marcador por organización con icono propio en los colores de marca; clic en fila ↔ clic en marcador se resaltan/centran mutuamente; el mapa respeta la pestaña de país activa. Coordenadas geocodificadas una vez (Nominatim) y guardadas como dato estático en `organizaciones.ts`. Validado por el usuario en el navegador.
9. **008 · Ficha de raza editorial + galería + 3 razas nuevas** — 3 razas nuevas en el catálogo (Galgo, Salchicha, Pitbull, 18 en total); rediseño editorial de la ficha individual (`/razas/[slug]`): hero a sangre completa con galería de miniaturas clicable (`FichaRazaHero.tsx`), cuerpo de texto a 2 columnas con letra capitular, filas de datos restilizadas — todo con la paleta y tipografías ya existentes de Kovli, sin añadir ninguna nueva. Las 18 razas recibieron 2-3 fotos adicionales y un párrafo editorial de introducción, revisados por el usuario en tandas. Validado por el usuario en el navegador.
10. **009 · Navbar agrupado con submenú** — el navbar baja de 6 enlaces sueltos a 3: "Cuidado del perro" (mega menú de escritorio a todo el ancho / acordeón en móvil, agrupa las 5 secciones temáticas), "Organizaciones" (nuevo, enlaza a `/#organizaciones`), "Razas" (se mantiene aparte, es un catálogo no una guía temática). `lib/secciones.ts` no cambia — la separación se calcula en `Header.tsx`. Validado por el usuario en el navegador.
11. **010 · Huellitas gastadas (cuidado del perro senior)** — nueva sección de contenido (`/huellitas-gastadas`), sexta del patrón Libreta + artículo + Rolodex: cuándo empieza la etapa senior, señales de esta etapa, alimentación adaptada, adaptar casa y paseos, bienestar cognitivo y emocional. De paso, "Razas" sale de `lib/secciones.ts` (ya no se cuela en el camino de la home ni en el Rolodex; se mantiene igual en el navbar, como constante propia en `Header.tsx`). Validado por el usuario en el navegador.

## Siguiente 🔜 (en curso)

_Ninguna feature en curso._

## Backlog / features 💡

_Sin ideas concretas anotadas por ahora._

## Fases posteriores (fuera del alcance de Fase 1)

- **Fase 2 · Área privada** — login/registro, base de datos, calendario y tareas.
- **Fase 3 · App móvil** — Expo / React Native, login compartido.
- **Fase 4 · Capa nativa** — módulo o app en Kotlin + Jetpack Compose.

> Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código. Una sola feature "en curso" a la vez.
