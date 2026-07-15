# 020 · Mejoras del diario personal — Plan

> Respeta `constitution/tech-stack.md`. Sin infraestructura nueva, sin dependencias nuevas.

## Enfoque

Cuatro piezas independientes entre sí sobre `EntradaDiario`. La más nueva conceptualmente es reordenar fotos sin recargar toda la página, reutilizando el patrón de `revalidatePath()` que estrenó `marcarTareaAction` en la 014.

## Implementación

1. **`schema.prisma`**: `EntradaDiario` gana `etiquetas String[] @default([])`. Migración `añadir_etiquetas_a_entrada_diario`, seguida de `npx prisma generate` a mano.
2. **`packages/domain/src/diario.ts`** (nuevo archivo): `ultimaEntrada<T extends { fecha: Date }>(entradas: T[]): T | null` — la de fecha más reciente, o `null` si no hay ninguna (función pura, mismo estilo que `proximoCuidado`).
3. **`apps/web/lib/actions/diario.ts`**:
   - `crearEntradaAction`/`actualizarEntradaAction` aceptan `etiquetas` (`formData.getAll("etiquetas")`, o un único campo de texto separado por comas que se parte en el servidor — más simple que un componente de "tags" interactivo).
   - `moverFotoEntradaAction(entradaId, path, direccion)`: localiza `path` dentro de `entrada.fotos`, lo intercambia con el vecino según `direccion`, guarda el array reordenado, `revalidatePath()` (no navega, mismo patrón que `marcarTareaAction`).
4. **`/cuenta/page.tsx`**: `include: { entradasDiario: true }` en la consulta de perros, `ultimaEntrada()` por perro, mostrar su fecha si existe.
5. **`CampoFotosDiario.tsx`**: cada miniatura de foto ya guardada gana dos botones (↑/↓), cada uno un `<form>` pequeño con `moverFotoEntradaAction` ligado (mismo patrón que `CasillaTarea`) — solo visibles al editar una entrada existente (al crear una nueva todavía no hay fotos guardadas que reordenar).
6. **Vista imprimible** (`/cuenta/perros/[id]/diario/imprimir`): página nueva, Server Component que lista todas las `EntradaDiario` del perro (fecha, texto, fotos, etiquetas) con una clase `print:` de Tailwind ocultando cualquier elemento de navegación si lo hubiera, pensada para imprimirse tal cual; enlace "Exportar / Imprimir" desde la sección Diario de la ficha del perro.
7. **`FilaEntradaDiario.tsx`**: mostrar `etiquetas` como chips (`<span>` con fondo suave) debajo del texto.
8. **`EntradaDiarioForm.tsx`**: campo de texto para etiquetas (separadas por comas), con las ya guardadas precargadas al editar.
9. Verificar `pnpm build`/`pnpm lint`; probar en el navegador (incluida la vista previa de impresión del navegador, `Ctrl/Cmd+P`, para comprobar que se ve bien sin tener que imprimir de verdad).

## Decisiones (cerradas contigo)

- Reordenar fotos con botones ↑/↓, acción inmediata sin pasar por el formulario completo.
- Exportar vía vista imprimible, no una librería de PDF.
- Etiquetas en texto libre, campo separado por comas (no un componente de tags interactivo, para no añadir complejidad de UI que no se pidió).

## Riesgos

- El campo de etiquetas como texto separado por comas es sencillo de construir, pero hay que decidir con cuidado cómo se recorta cada una (espacios sobrantes, etiquetas vacías por comas dobles) para no guardar basura — validar y limpiar en el schema de Zod, no confiar en que el usuario escriba limpio.
- `moverFotoEntradaAction` reordena directamente el array `fotos` de Postgres — como con `moverTareaAction` de la 019, conviene pensar si hace falta alguna protección ante dos clics rápidos seguidos (probablemente no sea un problema real dado que es una acción de un único usuario sobre su propio dato, pero merece una prueba manual antes de cerrar la feature).
