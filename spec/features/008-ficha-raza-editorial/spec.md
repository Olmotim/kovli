# 008 · Ficha de raza editorial + galería + 3 razas nuevas

**Estado:** hecho

## Qué hace

1. **3 razas nuevas** en el catálogo (`apps/web/data/breeds.ts`): **Galgo** (español), **Salchicha** (Teckel/Dachshund) y **Pitbull** (American Pit Bull Terrier) — mismos 8 campos que las 15 razas ya existentes, mismo proceso de investigación/verificación que en la feature 004.
2. **Rediseño de la ficha individual de raza** (`/razas/[slug]`), inspirado en una maqueta que trajo el usuario (formato editorial tipo revista), pero adaptado al sistema visual ya existente de Kovli:
   - Hero de foto a sangre completa con degradado inferior y título superpuesto (nombre de la raza + kicker "Ficha de raza").
   - Galería de miniaturas clicable debajo del hero — clic en una miniatura cambia la foto del hero. Si una raza solo tiene una foto, no se muestra la tira (no hay galería rota con una sola miniatura).
   - Cuerpo de texto editorial a 2 columnas (1 columna en móvil) con letra capitular en el primer párrafo.
   - Filas de datos (temperamento, pelaje y cuidados, esperanza de vida, notas de salud) — mismos campos que ya existen, con un estilo de fila más editorial.
3. **Contenido nuevo para las 18 razas** (15 existentes + 3 nuevas): 2-3 fotos adicionales por raza (para la galería) y un párrafo editorial de introducción — revisado por el usuario en tandas de 4-5 razas.

## Por qué

El usuario trajo una maqueta de diseño (formato editorial, tipo revista) para la ficha de raza actual, que hoy es una ficha de datos correcta pero visualmente austera. De paso, se amplía el catálogo con 3 razas que cubren tipos no representados todavía: un sighthound (galgo), una raza de patas cortas con problemas de columna característicos (salchicha), y una raza con reputación pública controvertida que merece información precisa en vez de prejuicio (pitbull).

## Criterios de aceptación

- [x] Galgo, Salchicha y Pitbull añadidos a `breeds.ts` con los 8 campos existentes, datos verificados.
- [x] El contenido del Pitbull es equilibrado: temperamento real (muy dependiente de crianza/socialización, no agresivo por naturaleza) y una nota sobre legislación de razas potencialmente peligrosas donde aplique (licencia, seguro obligatorio en España).
- [x] Ficha individual rediseñada: hero con foto + degradado + título superpuesto, galería de miniaturas (clic cambia la foto grande), cuerpo editorial a 2 columnas con letra capitular, filas de datos.
- [x] Usa exclusivamente la paleta y las 3 fuentes ya cargadas en Kovli (crema/arena/beige/apricot/cafe/chocolate; Fraunces/Inter/IBM Plex Mono) — no se añaden colores ni fuentes nuevas.
- [x] El modelo de datos actual (`tamano`, `energia`, `aptoPrimerizos`) no cambia — los filtros de `/razas` (`BreedsExplorer.tsx`, feature 005) siguen funcionando exactamente igual.
- [x] Campos nuevos en `Breed` (fotos adicionales, introducción editorial) son **opcionales**: una raza sin ellos todavía se ve bien en la ficha (sin galería rota, sin hueco vacío donde iría el texto editorial).
- [x] Las 18 razas reciben sus fotos adicionales y su párrafo editorial, revisados por el usuario en tandas de 4-5.
- [x] Responsive: cuerpo editorial pasa de 2 a 1 columna en móvil (breakpoint `md`); filas de datos se mantienen apiladas en cualquier tamaño.
- [x] `pnpm build` / `pnpm lint` sin errores nuevos; verificado en el navegador (Playwright): galería (clic cambia foto), responsive, y que `/razas` (listado + filtros) sigue funcionando sin cambios.

## Fuera de alcance

- La paleta y tipografía exactas de la maqueta original (Newsreader, Hanken Grotesk, Space Mono; colores propios) — se adapta al sistema visual ya existente de Kovli, no se añade uno nuevo en paralelo.
- Migrar el modelo de datos a un formato "facts" genérico — se mantienen los campos tipados actuales, que también usan los filtros.
- Más de 3 razas nuevas en esta feature.
- Subida de imágenes por el usuario / editor de imágenes en el navegador — las fotos siguen viniendo de banco de imágenes libres (Unsplash), igual que en la feature 004.
