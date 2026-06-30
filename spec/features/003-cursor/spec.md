# 003 · Cursor hocico + enlaces con huella

**Estado:** propuesta

## Qué hace

- El cursor del sitio tiene forma de **hocico de perro**.
- Cualquier elemento clicable que lleve a otro sitio (enlaces) muestra una **huella** al pasar por encima (hover) y/o como cursor sobre él.

🟡 _Por afinar juntos:_ ¿la huella sustituye al cursor sobre los enlaces, o aparece como un adorno animado junto a ellos? ¿Animación o estática?

## Por qué

Da identidad y encanto a la marca; refuerza la temática canina del sitio.

## Criterios de aceptación

🟡 _Propuesta a confirmar/ajustar:_

- [ ] En dispositivos con ratón, el cursor por defecto es un hocico.
- [ ] Al pasar sobre un enlace de navegación, aparece la huella.
- [ ] No perjudica la usabilidad: siempre se entiende dónde se va a hacer clic.

## Consideraciones / riesgos

🟡 _Cosas a decidir juntos antes de implementar (un senior las plantearía aquí):_

- **Solo aplica a dispositivos con puntero.** En móvil y tablet (táctil) no hay cursor, así que el efecto no existe ahí; en la app móvil (Fase 3) tampoco aplica. Es un detalle solo de la web de escritorio. ¿OK con eso?
- **Accesibilidad.** Un cursor personalizado no debe dificultar ver el punto de clic. Si la huella se anima, respetar `prefers-reduced-motion`.
- **Límites técnicos.** Los cursores de imagen tienen tope de tamaño y conviene un fallback (un cursor estándar si la imagen no carga).
- **Rendimiento.** Si el efecto se hace con JS en hover, mantenerlo ligero para no penalizar el Lighthouse de la 001.

## Fuera de alcance

- Cualquier efecto en la app móvil.
