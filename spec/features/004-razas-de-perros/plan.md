# 004 · Razas de perros — Plan

> Respeta `constitution/tech-stack.md`. Cubre la iteración del **listado**; la ficha individual se planifica después.

## Enfoque

Los datos de las razas viven en un **archivo TypeScript** en el repo, con una `interface Breed` que define la forma de cada raza (los 8 campos) y un array de razas que la cumple. La página de listado (`/razas`) importa ese array y pinta una tarjeta por raza. Sin base de datos ni fuente externa (la DB es Fase 2). La ficha individual con ruta dinámica (`/razas/[slug]`) se aborda en un paso posterior.

## Implementación

1. Definir `interface Breed` con el tipo de los 8 campos (tamaño, energía y apto-primerizos como uniones de literales, no strings libres). — _archivo de tipos/datos en apps/web_
2. Crear el archivo de datos TS con las 10-15 razas, cada una cumpliendo `Breed`. — _mismo módulo de datos_
3. Componente de tarjeta de raza (`BreedCard`) que muestra los datos clave. — _apps/web/components_
4. Página de listado `/razas` que recorre el array y renderiza una `BreedCard` por raza. — _apps/web/app/razas_
5. Enlazar `/razas` desde la home y el header.

## Decisiones

- **Origen de los datos: archivo TS con `interface Breed` en el repo** — no base de datos (es Fase 2) ni fuente externa. Se descarta JSON porque TS da chequeo de tipos, autocompletado y encaja con "TypeScript en todo"; la interface se corresponderá casi 1:1 con la futura tabla de la DB.
- **Nº de razas en la v1: 15**, para variedad de tamaño/energía/temperamento: Labrador Retriever, Golden Retriever, Caniche (Poodle), Chihuahua, Bulldog Francés, Pastor Alemán, Yorkshire Terrier, Boxer, Beagle, Cocker Spaniel, Schnauzer Miniatura, Shih Tzu, Border Collie, Husky Siberiano, Dálmata.
- **Alcance de la iteración: solo el listado.** La ficha individual va después.
- **Buscador/filtros: aplazados a la v2.**
- **Ubicación del archivo de datos: `apps/web/data/breeds.ts`** (interface `Breed` + array, mismo módulo). Nota: `apps/web/lib/secciones.ts` ya sigue un patrón similar para el nav de secciones, pero es de otra naturaleza (navegación, no contenido de dominio), así que una carpeta `data/` separada para el catálogo de razas queda más claro.
- **Origen de las fotos: banco de imágenes libres (Unsplash/Pexels)**, una foto por raza, servida vía `next/image` con `remotePatterns` en `next.config.ts`.

## Riesgos

- **Datos imprecisos de razas** (sobre todo "apto primerizos" y notas de salud) — revisar el contenido con criterio; recordar que Kovli no sustituye al veterinario.
- **Fotos de las razas** — cuidar licencias (usar imágenes libres) y peso (optimizar con `next/image`).