# Plan · 005 · Buscador y filtros en /razas

## Enfoque

`RazasPage` (`apps/web/app/razas/page.tsx`) sigue siendo un **Server Component** (no necesita datos del navegador para renderizar el listado inicial, y así se mantiene ligero). Toda la parte interactiva —caja de texto, filtros, y el cálculo de qué tarjetas mostrar— se mueve a un **Client Component** nuevo, siguiendo el mismo patrón que `FichaSeccion.tsx` (primer caso de `"use client"` en el proyecto, feature 002): el estado (qué se ha escrito, qué casillas están marcadas) solo existe en el navegador, así que el componente que lo usa tiene que ejecutarse en el navegador.

- **`apps/web/components/razas/BreedsExplorer.tsx`** (nuevo, Client Component):
  - Recibe `breeds: Breed[]` como prop (los datos siguen viniendo del Server Component padre, no se duplican).
  - Estado con `useState`: `query` (texto de búsqueda), y tres arrays de valores marcados: `tamanos: Tamano[]`, `energias: Energia[]`, `aptoPrimerizos: AptoPrimerizos[]`.
  - Un `useMemo` calcula la lista filtrada a partir de `breeds` + el estado, para no recalcular en cada render si no ha cambiado nada.
  - Renderiza: input de texto, los tres grupos de filtro (como pastillas/checkboxes con la paleta de marca), botón "Limpiar filtros" (solo visible si hay algo activo), el grid de `BreedCard` con el resultado filtrado, y un mensaje si el resultado está vacío.
- **`RazasPage`** pasa a renderizar `<BreedsExplorer breeds={breeds} />` en vez de mapear `breeds` directamente. El resto de la página (título, intro, "volver a inicio") no cambia.

## Lógica de filtrado

Función pura `matchesBreed(breed, { query, tamanos, energias, aptoPrimerizos })`, definida en el propio archivo (no hace falta moverla a `packages/domain` por ahora: es lógica de presentación de una sola página, no una regla de negocio reutilizable en otro sitio):

1. **Texto:** si `query` no está vacío, compara `breed.nombre` normalizado (minúsculas, sin acentos vía `.normalize("NFD").replace(/[̀-ͯ]/g, "")`) contra el `query` normalizado igual, con `includes`. Si no hay coincidencia, la raza queda descartada.
2. **Cada grupo de filtro:** si el array de seleccionados de ese grupo está vacío, no filtra nada (comportamiento "sin filtro" = todas pasan). Si tiene valores, la raza debe tener su `tamano`/`energia`/`aptoPrimerizos` incluido en ese array (esto ya es el OR dentro del grupo: basta con estar en la lista).
3. Los tres grupos + el texto se combinan con `&&` (AND): una raza aparece solo si pasa las cuatro condiciones.

## UI de los filtros

Pastillas seleccionables (`<button>` con estado activo/inactivo por clases Tailwind condicionales), no un `<select>` nativo — permite ver de un vistazo qué está marcado y admite multi-selección sin necesitar `Ctrl+click`. Mismo lenguaje visual que la pastilla "Elige por raza" ya existente en la página (beige de fondo, texto chocolate, `rounded-full`), con un estado activo en apricot para diferenciarlo.

## Sin dependencias nuevas

Solo `useState`/`useMemo` de React y Tailwind. No hace falta ninguna librería de búsqueda difusa (fuzzy search): con 15 razas y `includes()` sobre el nombre es suficiente; se revisita si el catálogo crece mucho.

## Impacto en archivos existentes

- `apps/web/app/razas/page.tsx`: cambia el bloque que renderiza el grid, todo lo demás igual.
- `apps/web/components/razas/BreedCard.tsx`: sin cambios.
- `apps/web/data/breeds.ts`: sin cambios (ya expone los tipos `Tamano`, `Energia`, `AptoPrimerizos` que se reutilizan).
