# Sesión 01 — Etapa 0: Esqueleto del monorepo

**Fecha:** 2026-06-30
**Estado al terminar:** Etapa 0 completa. Servidor arranca limpio en `http://localhost:3000`.

---

## Qué se hizo en esta sesión

1. Estudio conceptual del monorepo (sin código)
2. Creación de los archivos raíz del workspace
3. Scaffolding de `apps/web` con Next.js + Tailwind v4 + TypeScript
4. Configuración de la paleta de Kovli y la fuente Inter
5. Corrección de varios errores del setup
6. Verificación final: servidor arrancando sin warnings

---

## Conceptos estudiados

### Monorepo con pnpm workspaces + Turborepo

Un **monorepo** es un único repositorio git que contiene múltiples proyectos
(`apps/web`, `apps/mobile`, `packages/domain`, etc.). Los proyectos se pueden
importar entre sí como si fueran paquetes npm, sin necesidad de publicarlos.

**pnpm workspaces** resuelve los paquetes internos. El fichero `pnpm-workspace.yaml`
le dice a pnpm dónde están. El protocolo `workspace:*` en `package.json` indica
"usa la versión local de este paquete, no la de npm".

**Turborepo** es el orquestador de tareas. Sabe el orden en que hay que ejecutar
`build`, `dev` o `lint` en cada paquete, paraleliza lo que puede, y guarda en
caché los resultados para no repetir trabajo.

### Por qué separar en `packages/`

| Paquete | Contenido | Por qué aquí |
|---|---|---|
| `packages/domain` | Lógica de negocio pura | Sin framework, usable en web y mobile |
| `packages/schemas` | Tipos y validación Zod | Compartidos entre front y back |
| `packages/db` | Acceso a Postgres | Solo servidor, Fase 2 |

Si la lógica viviera dentro de un componente de `apps/web`, `apps/mobile` no
podría importarla sin duplicar código. `mobile` no tiene base de datos propia:
consume la API HTTP que expone `apps/web`.

### Tailwind CSS v4

En v4 la configuración ya no va en `tailwind.config.js`. Va en el propio CSS,
dentro de un bloque `@theme inline {}`. Así podemos declarar colores y fuentes
como variables CSS nativas que Tailwind reconoce automáticamente.

### `next/font/google`

Es una utilidad de Next.js que descarga la fuente en tiempo de build (no en
runtime), la sirve desde el propio dominio, e inyecta una variable CSS. Evita
el layout shift y la petición al CDN de Google en producción.

---

## Archivos raíz creados

### `pnpm-workspace.yaml`

Le dice a pnpm que todo lo que haya en `apps/*` es un paquete del workspace.
`allowBuilds` es necesario en pnpm ≥9 para autorizar dependencias que ejecutan
scripts nativos durante la instalación (sharp usa código C++ para procesar imágenes;
unrs-resolver es un parser de módulos de Rust).

```yaml
packages:
  - 'apps/*'
allowBuilds:
  sharp: true
  unrs-resolver: true
```

### `package.json` (raíz)

El proyecto raíz es `private: true` (no se publica en npm). `packageManager`
es obligatorio en Turborepo 2.x para detectar el gestor de paquetes.
Los scripts delegan en `turbo`, que distribuye el trabajo a cada app/paquete.

```json
{
  "name": "kovli",
  "private": true,
  "packageManager": "pnpm@11.9.0",
  "engines": { "node": ">=22" },
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "latest"
  }
}
```

### `turbo.json`

Define las tareas y sus dependencias:

- `"dependsOn": ["^build"]` — antes de compilar este paquete, compila sus dependencias internas.
- `"outputs": [".next/**"]` — qué carpetas guardar en caché.
- `"cache": false` + `"persistent": true` — el servidor de desarrollo no se cachea y es un proceso continuo (no termina).

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

---

## Archivos de `apps/web` creados o modificados

`apps/web` se generó con `create-next-app` y luego se ajustó. Las opciones elegidas:

| Opción | Valor | Motivo |
|---|---|---|
| TypeScript | Sí | Stack del proyecto |
| ESLint | Sí | Calidad de código desde el inicio |
| Tailwind | Sí | Framework de estilos elegido |
| App Router | Sí | API moderna de Next.js (no Pages Router) |
| `src/` | No | Estructura más plana y sencilla |
| Turbopack | Sí (dev) | Bundler nativo de Next.js, más rápido en dev |
| Alias `@/*` | Sí | Imports absolutos desde la raíz de `apps/web` |

### `apps/web/package.json` — campo `name` cambiado

Se cambió `"name": "web"` a `"name": "@kovli/web"`. El prefijo de scope
(`@kovli/`) es la convención de monorepo: evita colisiones con paquetes de npm
y deja claro que este paquete pertenece al proyecto Kovli.

### `apps/web/app/layout.tsx` — shell raíz de Next.js

Este archivo envuelve todas las páginas. Define el `<html>` y el `<body>`,
carga la fuente Inter y establece el idioma `lang="es"`. Con App Router, se
define una sola vez aquí y se aplica a toda la app.

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kovli",
  description: "Información sobre el cuidado de perros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

### `apps/web/app/globals.css` — paleta de Kovli + fuente

En Tailwind v4, `@theme inline {}` registra tokens que Tailwind reconoce como
clases (`bg-crema`, `text-chocolate`, etc.). `--font-sans` sobreescribe la
fuente base del sistema.

```css
@import "tailwindcss";

@theme inline {
  --color-crema:     #FBF7F0;
  --color-beige:     #E8DCC8;
  --color-apricot:   #D9A679;
  --color-cafe:      #A87C5F;
  --color-chocolate: #4E3B2E;
  --font-sans: var(--font-inter);
}

body {
  background-color: #FBF7F0;
  color: #4E3B2E;
  font-family: var(--font-sans), sans-serif;
}
```

### `apps/web/app/page.tsx` — página vacía

La feature 001 (página principal) va en la siguiente fase; aquí solo se deja
el mínimo para que la ruta `/` exista y no dé error.

```tsx
export default function Home() {
  return <main />;
}
```

### `apps/web/next.config.ts` — turbopack root

Indica a Next.js/Turbopack dónde está la raíz del monorepo. Sin esto, Next.js
ve el `pnpm-lock.yaml` de la raíz y el que dejó `create-next-app` dentro de
`apps/web/` y lanza un warning sobre múltiples lockfiles.

```ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: path.resolve(__dirname, "../.."),
    },
  },
};

export default nextConfig;
```

---

## Problemas encontrados y cómo se resolvieron

### 1. `pnpm: command not found`

`create-next-app` y Turborepo necesitan pnpm, pero no estaba instalado globalmente.

**Solución:** `npm install -g pnpm` — instaló la versión 11.9.0.

---

### 2. Carpeta `apps/web/spec/` con specs obsoletas

`create-next-app` encontró una carpeta `apps/web/spec/` con archivos de una
versión antigua del proyecto que no correspondían a la spec real (que vive en
la raíz, en `/spec/`).

**Solución:** `rm -rf apps/web/spec/` — eliminada la carpeta sobrante.

---

### 3. `[ERR_PNPM_IGNORED_BUILDS]` — sharp y unrs-resolver

pnpm ≥9 bloquea por defecto los scripts de instalación de dependencias nativas
por seguridad. Sharp (procesado de imágenes, usado por Next.js) y unrs-resolver
(parser de módulos nativo) los necesitan.

**Solución:** añadir `allowBuilds` en `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  sharp: true
  unrs-resolver: true
```

---

### 4. `apps/web/pnpm-workspace.yaml` sobrante

`create-next-app`, al ejecutar internamente `pnpm install`, generó su propio
`pnpm-workspace.yaml` dentro de `apps/web/`. Esto confunde a pnpm porque hay
dos definiciones de workspace anidadas.

**Solución:** `rm apps/web/pnpm-workspace.yaml` — eliminado el archivo sobrante.

> **Nota pendiente:** también existe `apps/web/pnpm-lock.yaml` (otro residuo de
> `create-next-app`). El lockfile real del proyecto es el de la raíz. En la
> próxima sesión habría que evaluar si eliminarlo o ignorarlo con `.gitignore`.

---

### 5. Turborepo no arrancaba — faltaba `packageManager`

Turborepo 2.x requiere el campo `packageManager` en el `package.json` raíz
para saber cómo leer el workspace. Sin él, fallaba con:

```
x Could not resolve workspaces.
`-> Missing `packageManager` field in package.json
```

**Solución:** añadir `"packageManager": "pnpm@11.9.0"` al `package.json` raíz.

---

## Estado final del proyecto

```
kovli/
├── apps/
│   ├── mobile/          (carpeta vacía, reservada para Fase 3)
│   └── web/             (Next.js 16 + Tailwind v4 + TypeScript estricto)
│       ├── app/
│       │   ├── globals.css   (paleta Kovli + fuente Inter)
│       │   ├── layout.tsx    (shell raíz: lang=es, Inter, metadata)
│       │   └── page.tsx      (página vacía, espera feature 001)
│       ├── next.config.ts    (turbopack root configurado)
│       └── package.json      (name: @kovli/web)
├── spec/                (constitución + features 001, 002, 003)
├── docs/                (esta carpeta — log de sesiones)
├── CLAUDE.md
├── package.json         (raíz: packageManager, scripts turbo)
├── pnpm-workspace.yaml  (workspace + allowBuilds)
└── turbo.json           (tareas: build, dev, lint)
```

**Comandos verificados:**

```bash
pnpm dev    # arranca Next.js en http://localhost:3000 — HTTP 200, sin warnings
```

---

## Próximos pasos (inicio de siguiente sesión)

1. Inicializar git (`git init` + `.gitignore` + primer commit)
2. Evaluar qué hacer con `apps/web/pnpm-lock.yaml` (lockfile sobrante)
3. Comenzar Feature 001 — página principal (siguiendo spec/features/001-pagina-principal/)
