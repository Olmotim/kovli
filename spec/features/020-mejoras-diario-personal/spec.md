# 020 · Mejoras del diario personal

**Estado:** spec y plan cerrados — documentado para implementar en la próxima sesión, sin tocar código todavía.

## Qué hace

Cuatro mejoras sobre la 015, todas de su lista de "fuera de alcance" (salvo los recordatorios del diario, que se descartaron al hablarlo — ver `spec/features/017-recordatorios-email/spec.md`):

1. **Resumen en `/cuenta`**: cada perro muestra cuándo fue su última entrada de diario.
2. **Reordenar fotos**: cambiar el orden de las fotos de una entrada ya guardada, con botones subir/bajar.
3. **Exportar/imprimir**: una vista imprimible de todas las entradas de un perro, para guardar como PDF desde el propio navegador.
4. **Etiquetas**: palabras libres por entrada (ej. "paseo", "veterinario") que se muestran como chips.

## Por qué

Las cuatro estaban en la lista de "fuera de alcance" de `spec/features/015-diario-personal/spec.md`. El recordatorio del diario, que también estaba en esa lista, se descartó al repasar la lista completa con el usuario (no tiene una fecha "pendiente" como cuidados/rutinas, no encajaba en el motor de la 017).

## Modelo de datos (cambios sobre `EntradaDiario`)

| Campo nuevo | Tipo | Notas |
|---|---|---|
| `etiquetas` | `String[]` | Texto libre, sin catálogo cerrado (mismo criterio que el resto del diario). |

El orden de las `fotos` ya es la lista misma (el array `fotos: String[]` de la 015) — reordenar es simplemente cambiar la posición dentro de ese array, no necesita un campo nuevo.

## Criterios de aceptación

- [ ] `/cuenta` muestra, junto a cada perro, la fecha de su última entrada de diario (si tiene alguna); si no tiene ninguna, no muestra nada.
- [ ] Al editar una entrada, cada foto ya guardada tiene botones subir/bajar que cambian su posición; el orden se refleja al momento (sin tener que guardar el resto del formulario a la vez).
- [ ] Nueva vista imprimible (`/cuenta/perros/[id]/diario/imprimir`) con todas las entradas del perro, con estilos pensados para impresión (`@media print`) — el usuario la usa con "Imprimir → Guardar como PDF" del navegador.
- [ ] Al crear o editar una entrada, se pueden añadir etiquetas de texto libre; se muestran como chips en cada entrada de la ficha del perro.
- [ ] `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] Validado por el usuario en el navegador: comprobar el resumen en `/cuenta`, reordenar fotos de una entrada, abrir la vista imprimible y comprobar que se ve bien en la vista previa de impresión del navegador, añadir etiquetas y verlas en la ficha.

## Fuera de alcance

- Recordatorio del diario — descartado (ver arriba).
- Filtrar entradas por etiqueta — se guardan y se muestran, pero no hay buscador/filtro en esta ronda.
- Generar el PDF en servidor con una librería — se usa "imprimir del navegador", decisión ya cerrada.
- Compartir el diario con otra persona (enlace público, exportar a otro formato) — sigue fuera de alcance.

## Decisiones (cerradas contigo)

- Reordenar fotos con botones subir/bajar, sin drag-and-drop.
- Exportar mediante vista imprimible + "Imprimir a PDF" del navegador, sin librería de generación de PDF.
- Etiquetas en texto libre, sin catálogo cerrado ni filtro todavía.
