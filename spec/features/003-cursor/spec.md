# 003 · Cursor hocico + enlaces con huella

**Estado:** hecho

## Qué hace

- El cursor del sitio tiene forma de **hocico de perro**.
- **Cualquier zona clickable que navegue** — a otra ruta interna del sitio, a un ancla de la misma página, o a un sitio externo — **sustituye el cursor por una huella** al pasar por encima (hover). No es un adorno aparte, reemplaza directamente al hocico. No aplica a botones que no navegan (p. ej. el que abre el modal "Descarga la app"), solo a enlaces reales.
- La huella es **estática** (sin animación).

## Por qué

Da identidad y encanto a la marca; refuerza la temática canina del sitio.

## Criterios de aceptación

- [x] En dispositivos con ratón, el cursor por defecto es un hocico.
- [x] Al pasar sobre cualquier enlace que navegue (ruta interna, ancla o externo), el cursor cambia a una huella estática.
- [x] No perjudica la usabilidad: siempre se entiende dónde se va a hacer clic. _(confirmado por el usuario probándolo en el navegador)_

## Consideraciones / riesgos

- **Solo aplica a dispositivos con puntero** (`pointer: fine` por CSS). En móvil/tablet táctil no hay cursor, así que el efecto no existe ahí; en la app móvil (Fase 3) tampoco aplica. Es inherente a cómo funciona un cursor, no una decisión de diseño.
- **Accesibilidad.** Al ser estática, no hay que gestionar `prefers-reduced-motion`; aun así, la huella debe seguir marcando con claridad el punto de clic.
- **Límites técnicos.** Los cursores de imagen en CSS tienen un tope de tamaño real por navegador — conviene una imagen pequeña (~32px) y un cursor estándar de fallback si no carga.
- **Rendimiento.** Se implementa con CSS puro (`cursor: url(...)`), sin JavaScript — evita repetir el coste de hidratación que ya vimos en la feature 001.

## Fuera de alcance

- Cualquier efecto en la app móvil.
