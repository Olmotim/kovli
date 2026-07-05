# 004 · Razas de perros

**Estado:** en curso

## Qué hace

Sección dedicada a razas de perros, separada de la feature 002 por ser contenido de otra naturaleza: una ficha de datos estructurados por raza en vez de un artículo de texto corrido.

Estructura general: **listado de razas** en `/razas` + **ficha individual por raza** en `/razas/[slug]`.

**Alcance de esta iteración: solo el listado.** La ficha individual por raza se aborda como paso siguiente dentro de esta misma feature.

Cada raza tiene estos 8 datos:

1. Nombre + foto
2. Tamaño (pequeño / mediano / grande)
3. Temperamento / carácter
4. Nivel de energía (bajo / medio / alto)
5. Tipo de pelaje y cuidados que requiere
6. Apto para primerizos (sí / según el caso / requiere experiencia)
7. Esperanza de vida aproximada
8. Notas de salud comunes de la raza

## Por qué

Kovli quiere ayudar a elegir y entender razas concretas, no solo dar consejos generales de cuidado. El volumen de datos (muchas razas, cada una con varios atributos) justifica tratarlo como su propia feature en vez de una sección más dentro de la 002. El campo "apto para primerizos" enlaza con la sección Primeros pasos.

## Criterios de aceptación

_(De esta iteración: el listado.)_

- [x] El listado de razas es accesible desde la home y desde el header.
- [x] El listado muestra las 10-15 razas, cada una en una tarjeta con sus datos clave.
- [x] Responsive y legible (mobile-first).
- [x] Aplica la paleta de marca definida en `tech-stack.md`.

## Fuera de alcance

- **Ficha individual por raza** (`/razas/[slug]`) → paso siguiente dentro de esta misma feature.
- **Buscador y filtros** (por tamaño, energía, apto primerizos) → v2, cuando haya tantas razas que no entren en pantalla.
- Cursor de hocico y huellas → feature 003.
- Las otras 5 secciones (Salud, Seguridad, Primeros pasos, Tiempo de juego, Adiestramiento) → feature 002.