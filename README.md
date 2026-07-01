# Kovli

Kovli es una web de información sobre el cuidado de perros, organizada en secciones temáticas, para todo el público hispanohablante. Construida con ayuda de IA como vehículo de aprendizaje: el objetivo no es solo que el código funcione, sino entenderlo.

🌐 **Producción:** [kovli.vercel.app](https://kovli.vercel.app)

## Stack

TypeScript estricto · Next.js (App Router) + React · Tailwind CSS · MDX para contenido · pnpm workspaces + Turborepo.

Detalle completo en [`spec/constitution/tech-stack.md`](spec/constitution/tech-stack.md).

## Estructura

```
apps/web/         sitio Next.js (público y, más adelante, área privada)
apps/mobile/       app Expo / React Native (Fase 3, todavía vacía)
packages/          lógica de negocio y esquemas compartidos (Fase 2 en adelante)
spec/              especificaciones: constitución + spec/plan/tasks de cada feature
docs/              registro de cada sesión de trabajo
```

## Desarrollo

```bash
pnpm install
pnpm dev     # arranca apps/web en http://localhost:3000
pnpm build   # build de producción
pnpm lint
```

## Cómo se construye este proyecto

Se sigue desarrollo dirigido por especificación (spec → plan → tasks → código): antes de tocar código, cada feature tiene su carpeta en [`spec/features/`](spec/features/) con qué hace, cómo se implementa y el desglose de tareas. El progreso general está en [`spec/constitution/roadmap.md`](spec/constitution/roadmap.md), y cada sesión de trabajo queda documentada en [`docs/`](docs/).
