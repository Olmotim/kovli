# @kovli/web

Sitio Next.js de Kovli. Ver el [README de la raíz del monorepo](../../README.md) para contexto general del proyecto, stack y estructura.

## Desarrollo

```bash
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
```

## Convenciones específicas de esta app

- `components/layout/`, `components/ui/`, `components/home/` — componentes organizados por rol (ver `spec/constitution/tech-stack.md`).
- `app/(secciones)/` — páginas de contenido en MDX, con layout compartido.
- `mdx-components.tsx` — estilos por defecto para el contenido MDX.
