# Tech stack y convenciones

## Tecnologías

- **Lenguaje:** TypeScript estricto.
- **Framework / runtime:** Next.js (App Router) + React, sobre Node LTS.
- **Estilos:** Tailwind CSS.
- **Monorepo:** pnpm workspaces + Turborepo.
- **Base de datos:** 🟡 Fase 2 — Postgres. ORM por decidir (Prisma vs Drizzle); hosting por decidir (Supabase vs Neon). No aplica en Fase 1.
- **Auth:** 🟡 Fase 2 — por decidir (Supabase Auth / Auth.js / Clerk).
- **Validación:** Zod (esquemas compartidos en `packages/schemas`), a partir de Fase 2.
- **Móvil:** 🟡 Fase 3 — Expo + React Native.
- **Capa nativa:** 🟡 Fase 4 — Kotlin + Jetpack Compose.
- **Tests:** 🟡 por decidir — propuesta: Vitest. (¿desde Fase 1 o más adelante?)
- **Despliegue:** Vercel (web).

## Archivos / módulos clave

- `apps/web/` — sitio Next.js.
- `apps/mobile/` — app Expo / React Native (Fase 3).
- `packages/domain/` — lógica de negocio pura.
- `packages/schemas/` — tipos + validación Zod compartidos.
- `packages/db/` — esquema y acceso a datos (Fase 2).

## Comandos

🟡 _Se concretan al montar el monorepo (Etapa 0)._ Previstos: `pnpm dev`, `pnpm test`, `pnpm lint`, `pnpm build`.

## Modelo de datos / dominio

🟡 Fase 2 — entidades previstas: `user`, `calendario`, `tareas`. Sin definir todavía.

## Convenciones

- camelCase para variables y funciones; PascalCase para componentes.
- TypeScript estricto: prohibido `any` sin justificarlo.
- Lógica de negocio en `packages/domain`, nunca en componentes ni route handlers.
- Validar toda entrada de usuario con Zod (Fase 2).
- Idioma del contenido: español (España y Latam), redactado en español neutro. 🟡 Previsto a futuro: i18n para inglés — conviene no hardcodear textos de interfaz y elegir el origen de contenido (MDX/CMS) pensando ya en varios idiomas.

## Estilo visual

Dirección de marca: **paleta de marrones, beiges y blancos**, inspirada en los colores de pelaje de los poodles. Paleta de partida (en evolución, se irá afinando):

- Base / fondo claro (crema): `#FBF7F0`
- Beige arena: `#E8DCC8`
- Apricot (acento cálido, color típico de poodle): `#D9A679`
- Café-au-lait (acento medio): `#A87C5F`
- Chocolate (texto y acentos oscuros): `#4E3B2E`

**Tipografía:** base simple y muy legible. De partida, Inter para el cuerpo. Cambiable más adelante si se quiere dar más personalidad.

- Layout: mobile-first, usando los breakpoints de Tailwind.

## Límites duros

- No subir `.env*` al repositorio.
- No añadir dependencias sin avisar.
- No usar `any` sin justificar.
- No construir login/DB antes de la Fase 2.
