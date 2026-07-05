# 005 · Buscador y filtros en /razas

**Estado:** hecho

## Qué hace

Añade a `/razas` una caja de búsqueda por nombre y tres filtros por categoría (tamaño, energía, apto-primerizos), para encontrar una raza concreta sin tener que leer las 15 tarjetas del listado.

- **Búsqueda por nombre:** campo de texto que filtra las tarjetas cuyo `nombre` contiene el texto escrito (sin distinguir mayúsculas/acentos), en tiempo real (sin botón "Buscar").
- **Filtros por categoría:** tres grupos de opciones seleccionables — tamaño (pequeño/mediano/grande), energía (bajo/medio/alto), apto-primerizos (sí/según el caso/requiere experiencia). Cada grupo admite marcar varios valores a la vez (ej. tamaño: pequeño y mediano). Dentro de un mismo grupo, los valores marcados se combinan con OR (pequeño o mediano); entre grupos distintos se combina con AND (tamaño Y energía deben cumplirse a la vez). La búsqueda por nombre también se combina con AND sobre el resultado de los filtros.
- Búsqueda y filtros conviven: se aplican todos a la vez sobre el mismo listado.
- Estado solo local (React state del componente), no se refleja en la URL: al recargar la página se pierde el filtro aplicado.

## Por qué

Con 15 razas el listado ya no se lee de un vistazo. El campo "apto para primerizos" es el que más valor aporta para quien no tiene experiencia previa, y tamaño/energía son los criterios prácticos más buscados (espacio en casa, tiempo disponible). Se descarta reflejar el estado en la URL por simplicidad: no hay caso de uso claro de compartir un enlace filtrado todavía, y siempre se puede añadir después si hace falta.

## Criterios de aceptación

- [x] `/razas` muestra un campo de texto que filtra las tarjetas por nombre en tiempo real, ignorando mayúsculas y acentos (ej. "labra" encuentra "Labrador Retriever").
- [x] `/razas` muestra tres grupos de filtros: tamaño, energía, apto-primerizos, cada uno con sus valores como opciones seleccionables (checkboxes o pastillas).
- [x] Cada grupo de filtro admite marcar varios valores a la vez; dentro del grupo se combinan con OR.
- [x] Los distintos grupos de filtro se combinan entre sí con AND, y con el texto de búsqueda.
- [x] Si no hay ningún filtro ni texto aplicado, se muestran las 15 razas (comportamiento actual).
- [x] Si ningún resultado coincide, se muestra un mensaje claro (no una lista vacía sin explicación).
- [x] Existe una forma de limpiar todos los filtros y el texto de una vez.
- [x] Todo ocurre en el cliente, sin recargar la página ni llamadas a servidor.
- [x] Responsive y legible (mobile-first), aplica la paleta de marca definida en `tech-stack.md`.

## Fuera de alcance

- Reflejar el estado del filtro en la URL (query params) — se puede añadir más adelante si aparece un caso de uso real de compartir enlaces filtrados.
- Ordenar el listado (alfabético, por tamaño, etc.) — no se ha pedido.
- Filtro combinado "todas las razas aptas para primerizos con energía baja" tiene sentido con este diseño (AND entre grupos), pero no se añaden más criterios de filtro (esperanza de vida, tipo de pelaje) que los tres ya decididos.
