# Plan · 008 · Ficha de raza editorial + galería + 3 razas nuevas

## Datos

`apps/web/data/breeds.ts`: se amplía `Breed` con dos campos **opcionales** (para poder aplicar el rediseño antes de tener contenido para las 18 razas, sin romper nada):

```ts
export type Breed = {
  // ...campos existentes sin cambios (slug, nombre, fotoUrl, fotoAlt,
  // tamano, temperamento, energia, pelaje, aptoPrimerizos,
  // esperanzaVida, notasSalud)
  otrasFotos?: { url: string; alt: string }[]; // fotos adicionales para la galería, además de fotoUrl
  introduccion?: string[]; // 1-2 párrafos editoriales
};
```

`fotoUrl`/`fotoAlt` se mantienen como están — siguen siendo la foto de portada que usa `BreedCard` en el listado `/razas`. La galería de la ficha individual se construye como `[{ url: fotoUrl, alt: fotoAlt }, ...(otrasFotos ?? [])]`, así la portada es siempre la primera miniatura y no hay que duplicar datos.

**3 razas nuevas** (Galgo, Salchicha, Pitbull): mismo proceso que la feature 004 — investigar temperamento/pelaje/salud/esperanza de vida con fuentes fiables, verificar antes de dar por bueno, foto de portada de Unsplash comprobada. El Pitbull necesita más cuidado en la redacción (ver "Riesgos").

## Componentes

### `apps/web/components/razas/FichaRazaHero.tsx` (nuevo, **Client Component**)

Único trozo interactivo del rediseño — necesita `"use client"` porque lleva estado (`selectedIndex`, qué foto de la galería se muestra en el hero grande), igual que `BreedsExplorer` o `FichaSeccion`.

- Props: `fotos: { url: string; alt: string }[]`, `nombre: string`.
- Hero: `<Image>` a sangre completa (`h-64 sm:h-80 md:h-96`, `object-cover`), con un overlay `bg-gradient-to-t from-chocolate/80 to-transparent` encima, y superpuesto en la esquina inferior izquierda: kicker "Ficha de raza" (`font-serif italic text-apricot`) + `nombre` como título grande (`font-serif text-4xl sm:text-6xl font-bold text-crema`).
- Debajo del hero, tira de miniaturas (`flex`) — **solo si `fotos.length > 1`**: cada miniatura es un `<button>` con una `<Image>` pequeña (`h-16`), `opacity-50` si no es la activa, `opacity-100 border-b-2 border-apricot` si lo es. Clic actualiza `selectedIndex`.

### `apps/web/app/razas/[slug]/page.tsx` (existente, se amplía — sigue siendo Server Component)

- El bloque de imagen actual (`<div className="relative h-64..."><Image .../></div>`) se sustituye por `<FichaRazaHero fotos={[...]} nombre={breed.nombre} />`.
- Debajo del hero se mantienen, sin cambios de lógica: las pastillas (tamaño/energía/primerizos) y el aviso de "Primeros pasos" si `aptoPrimerizos !== "sí"`.
- **Cuerpo editorial** (nuevo, solo si `breed.introduccion` existe): los párrafos de `introduccion` en un contenedor `columns-1 md:columns-2 md:gap-11`, tipografía `font-serif text-[14.5px] leading-[1.72] text-chocolate/90`. El primer párrafo lleva letra capitular con la variante `first-letter:` de Tailwind (`first-letter:float-left first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.72] first-letter:pr-2 first-letter:text-apricot`) — sin JavaScript, es CSS puro (`::first-letter`).
- **Filas de datos**: se reutiliza el `<dl>` actual (temperamento, pelaje y cuidados, esperanza de vida, notas de salud) pero con el estilo de fila de la maqueta: contenedor con `divide-y divide-chocolate/20`, cada fila `flex gap-7 py-4`, `<dt>` con ancho fijo (`w-36 shrink-0`, `font-mono text-xs uppercase tracking-widest text-cafe`), `<dd>` con `text-sm text-chocolate/80`.
- Si `breed.introduccion` no existe todavía (razas sin redactar en la fase 3), esa sección simplemente no se renderiza — la ficha se ve bien igual, solo sin el bloque editorial.

## Contenido (fase 3, después de tener el componente listo)

Para las 18 razas: 2-3 fotos adicionales (Unsplash, mismo criterio de verificación de la 004 — licencia libre, foto real de la raza correcta) y un párrafo editorial de introducción (estilo cercano al de la maqueta: contexto/origen + 1-2 rasgos destacados, en tono Kovli — cercano, sin tecnicismos innecesarios). Se presentan en tandas de 4-5 razas para revisión, no todas de golpe ni una a una.

## Impacto en archivos existentes

- `apps/web/data/breeds.ts`: 2 campos nuevos opcionales en `Breed`, 3 razas nuevas añadidas al array.
- `apps/web/app/razas/[slug]/page.tsx`: usa `FichaRazaHero`, añade cuerpo editorial condicional, restyle de las filas de datos.
- **No cambia**: `BreedCard.tsx`, `BreedsExplorer.tsx`, `/razas/page.tsx` (listado) — siguen usando `fotoUrl`/`fotoAlt`/`tamano`/`energia`/`aptoPrimerizos` exactamente igual que ahora.
- **Sin dependencias nuevas**: solo Tailwind (`columns-*`, `first-letter:`) y el patrón de Client Component ya usado en el proyecto.

## Riesgos

- **Pitbull**: raza con reputación pública controvertida y legislación específica en varios países hispanohablantes (España: "perro potencialmente peligroso" — licencia y seguro de responsabilidad civil obligatorios). El contenido debe basarse en evidencia (el temperamento depende sobre todo de crianza y socialización, no hay base científica sólida para "agresividad inherente de raza") y mencionar la nota legal sin alarmismo ni minimizarla — ni asustar ni idealizar.
- **Volumen de contenido de la fase 3**: 18 razas × (2-3 fotos + párrafo editorial) es bastante trabajo de investigación/redacción — de ahí la revisión en tandas de 4-5 en vez de todo de golpe, para poder ajustar el tono pronto si no encaja.
- **Fotos adicionales**: mismo riesgo que ya se gestionó en la 004 — cuidar licencia libre y que la foto sea realmente de la raza correcta (verificar antes de usar, no solo por el nombre del archivo/búsqueda).
