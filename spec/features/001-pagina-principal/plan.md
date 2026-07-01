# 001 · Página principal — Plan

> Respeta `constitution/tech-stack.md`. Pendiente de tu OK antes de implementar.

## Enfoque

Página estática construida con Next.js (App Router) en `apps/web`, estilada con Tailwind. Sin datos dinámicos ni backend. Contenido y textos escritos a mano (es la primera página: conviene hacerla tú para asentar fundamentos).

## Implementación

🟡 _Borrador a afinar contigo:_

1. Layout base de la app (`app/layout.tsx`) — fuentes, estilos globales, paleta. — _archivo: apps/web/app/layout.tsx_
2. Página de inicio (`app/page.tsx`) — hero + acceso a secciones. — _archivo: apps/web/app/page.tsx_
3. Componentes reutilizables (p. ej. tarjeta de sección, cabecera). — _carpeta: apps/web/components/ (reorganizada en sesión 03 en subcarpetas `layout/`, `ui/`, `home/` — ver `constitution/tech-stack.md`)_
4. Tokens de la paleta en la config de Tailwind. — _archivo: apps/web/tailwind.config.ts_

## Decisiones

- 🟡 **Origen del contenido** — para la home, texto estático en componentes. Para las secciones (002) habrá que decidir entre MDX o un CMS headless. _A decidir._
- **Hacer la primera página a mano** — antes de delegar patrones a la IA, para entender el flujo de Next.js. _(principio de aprendizaje)_

## Riesgos

- **Sobre-diseñar la home** — mantenerla simple; es un MVP. Mitigación: limitar el alcance a lo de los criterios de aceptación.
