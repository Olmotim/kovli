# 006 · Organizaciones de ayuda y/o adopción

**Estado:** hecho

## Qué hace

Añade a la home un bloque nuevo, debajo del camino de "Secciones", con organizaciones reales de ayuda y/o adopción de perros (protectoras, asociaciones de rescate, plataformas de adopción...), a modo de **directorio**: pestañas "Todos / España / Argentina" arriba que filtran la lista, y debajo la lista agrupada por país (encabezado de país + sus organizaciones). Empieza con **España y Argentina**, pensado para poder añadir más países más adelante (la pestaña nueva sale sola de los datos, sin tocar el componente).

Cada organización se muestra como una fila con:

1. Iniciales del nombre, en una insignia (sin foto ni logo — ver "fuera de alcance").
2. Nombre.
3. Ciudad y una categoría corta (ej. "Barcelona · Protección y adopción responsable").
4. Botón "Ver más", que enlaza directo a su web o red social oficial (pestaña nueva).
5. País (usado para agrupar y para las pestañas de filtro).

## Por qué

Kovli ya da información de cuidado, pero no una vía de acción concreta para quien quiere adoptar, colaborar o denunciar una situación de maltrato. Este bloque complementa el contenido con contactos reales verificados, sin salirse de "qué NO es Kovli" (`mission.md`): no es un intermediario de adopción ni gestiona el proceso, solo enlaza a organizaciones externas que sí lo hacen.

El alcance geográfico empieza en España y Argentina (no todo Hispanoamérica de golpe) porque curar una lista real y verificada por país lleva trabajo de investigación; mejor validar el formato con dos países y ampliar después.

## Criterios de aceptación

- [x] La home muestra una sección nueva, debajo de "Secciones" (el camino), con el directorio de organizaciones.
- [x] Pestañas "Todos / España / Argentina" (y cualquier país que se añada después, generadas a partir de los datos, no hardcodeadas) filtran la lista.
- [x] Con "Todos" seleccionado, la lista aparece agrupada por país (encabezado + sus organizaciones); con un país concreto, solo su lista.
- [x] Incluye organizaciones reales y verificadas (no inventadas) de España y de Argentina — 4 por país, 8 en total.
- [x] Cada fila muestra: insignia con iniciales, nombre, ciudad + categoría corta, y un botón "Ver más" que enlaza a la web/red social oficial real de la organización.
- [x] Los datos viven en `apps/web/data/organizaciones.ts`, siguiendo el patrón ya usado en `breeds.ts` (`interface` + array), con el país como unión de literales (no `string` suelto) para que añadir un país nuevo en el futuro sea solo ampliar el tipo y el array.
- [x] Responsive y legible (mobile-first), aplica la paleta de marca definida en `tech-stack.md`.
- [x] Los enlaces externos abren en una pestaña nueva (`target="_blank"` con `rel="noopener noreferrer"`), para no sacar al usuario de Kovli sin más.

## Fuera de alcance

- Ficha individual por organización (página propia tipo `/razas/[slug]`) — de momento todo vive en la fila del directorio.
- Fotos o logos de cada organización — insignia con iniciales en vez de imagen, para no depender de licencias/derechos de imagen de terceros.
- Más países que España y Argentina en esta primera versión.
- **Vista de mapa interactivo (Leaflet/Mapbox) sincronizada con la lista** — se valora como v2 una vez probado el directorio simple; añade una dependencia nueva, coordenadas por organización y sincronizar el marcador seleccionado con la fila de la lista.
- Cualquier proceso de adopción, formulario o gestión dentro de Kovli — Kovli solo enlaza hacia fuera.
