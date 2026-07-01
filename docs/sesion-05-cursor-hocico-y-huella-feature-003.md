# Sesión 05 — Feature 003: cursor de hocico y huella, y reordenación del roadmap

**Fecha:** 2026-07-01
**Estado al terminar:** Feature 003 (cursor hocico + huella) completa, verificada y marcada como **Hecho**. El roadmap se reordenó a petición del usuario: la 003 se adelantó a la 002 (que queda en pausa con el esqueleto ya listo) por ser mucho más rápida de implementar. La 002 vuelve a estar "en curso" ahora que la 003 está cerrada. `README.md` creado en la raíz del repo (no existía) y el de `apps/web` actualizado (antes era el genérico de `create-next-app`).

---

## Qué se hizo en esta sesión (resumen completo)

1. Consulta del usuario sobre si adelantar la feature 003 a la 002 (viendo que el contenido de la 002 iba a llevar tiempo). Se explicó que 003 es mucho más rápida (CSS puro, sin dependencias) y se reordenó el roadmap: 003 pasa a "Siguiente 🔜 (en curso)", 002 a "En pausa ⏸️".
2. Cierre de las 2 decisiones abiertas de la spec de la 003: la huella **sustituye** al cursor (no es un adorno aparte) y es **estática** (sin animación). Corrección de una redacción ambigua heredada de sesiones anteriores: "enlaces que llevan a otro sitio" se aclaró como "cualquier zona clickable que navegue" (interna, ancla o externa) — no solo enlaces externos.
3. Diseño de los dos assets de cursor (hocico y huella) en SVG, revisados a tamaño real de cursor (32px) antes de convertirlos — la primera versión del hocico se parecía a un morro de cerdito por los puntos de las fosas nasales; se simplificó a un óvalo con una nariz en forma de gota.
4. Conversión a PNG 32×32 con `sharp` y reglas CSS en `globals.css` dentro de `@media (pointer: fine)`.
5. Verificación técnica con Playwright (qué regla CSS se aplica a cada elemento) — con la limitación honesta de que ninguna herramienta puede capturar el cursor real del sistema operativo; esa comprobación la hizo el usuario a mano.
6. Bug encontrado y resuelto: el servidor de desarrollo llevaba corriendo desde el principio de toda la sesión (varias horas) y había dejado de recoger cambios en `globals.css`. Se diagnosticó comparando la cabecera `Last-Modified` del CSS sevido (con más de una hora de antigüedad) contra la hora real, y se resolvió reiniciando el servidor.
7. Cierre de la feature 003 en `spec/` y `roadmap.md`, creación de `README.md` en la raíz (no existía) y actualización del `README.md` de `apps/web` (antes era el genérico de `create-next-app`).

---

## Conceptos estudiados

### `cursor: url(...)` en CSS — cómo funciona y sus límites

Un cursor personalizado se define con `cursor: url("/ruta/imagen.png") X Y, valor-de-respaldo;`. Los dos números (`X Y`) son el **hotspot**: el píxel exacto de la imagen que actúa como punto de clic (no tiene por qué ser la esquina). El valor de respaldo (`auto`, `pointer`...) se usa si la imagen no carga. Los navegadores tienen un tope real de tamaño para estas imágenes — por eso se usaron PNGs de 32×32px, pensados para verse nítidos a tamaño real de cursor, no imágenes grandes escaladas.

### `@media (pointer: fine)`

Media query de CSS que detecta si el dispositivo de entrada principal es "preciso" (ratón/trackpad) frente a "grueso" (dedo en pantalla táctil, `pointer: coarse`). Envolver las reglas de cursor en este media query asegura que el efecto solo se aplique donde tiene sentido — en táctil no existe el concepto de cursor.

### Diseñar para tamaños diminutos (cursor de 32px)

Un diseño que se ve bien a 128px puede leerse distinto a 32px: los primeros bocetos del hocico (un óvalo con dos puntos de fosas nasales) se veían como un hocico de perro en grande, pero a tamaño real de cursor se leían como un morro de cerdito, por la proporción redonda y los dos puntos simétricos. Se simplificó la forma de la nariz a una gota redondeada, más distintiva a tamaño pequeño. Lección: para assets diminutos, hay que revisar siempre al tamaño final de uso, no solo en grande.

### Diagnosticar una caché/watcher atascado con cabeceras HTTP

Cuando un cambio de código "no se aplica" en el navegador aunque el archivo en disco es correcto, una forma de comprobar si es un problema de caché del servidor (no del navegador) es mirar la cabecera `Last-Modified` (o `ETag`) de la respuesta con `curl` directamente contra el servidor — si la fecha es mucho más antigua que "ahora mismo", el servidor está sirviendo una versión vieja, no un problema del código. En este caso, el servidor de desarrollo llevaba corriendo varias horas (desde el principio de la sesión) sin haber reiniciado nunca, y dejó de detectar cambios en `globals.css`; reiniciarlo lo solucionó.

### Verificación con límites: lo que Playwright no puede comprobar

Playwright puede confirmar qué valor de `cursor` calcula el navegador para un elemento (`getComputedStyle(el).cursor`), pero no puede hacer una captura de pantalla de cómo se ve el cursor real del sistema operativo — eso lo renderiza el SO, no la página. Cuando una herramienta no puede verificar algo del todo, hay que decirlo explícitamente en vez de dar una verificación parcial como si fuera completa.

---

## Decisiones tomadas en esta sesión

- **Reordenar el roadmap**: 003 antes que el contenido de la 002, por ser mucho más rápida y no depender de redacción/revisión de contenido.
- **La huella sustituye al cursor** (no es un adorno aparte) y **aplica a cualquier enlace que navegue**, interno o externo — no solo a enlaces externos, corrigiendo una ambigüedad en la redacción original de la spec.
- **Huella estática**, sin animación — evita además tener que gestionar `prefers-reduced-motion`.
- **Botones que no navegan** (el CTA "Descarga la app", el de abrir el menú móvil) **no** llevan la huella — mantienen el cursor normal.
- **Todo en CSS puro, sin JavaScript** — consistente con la lección de rendimiento de la feature 001 (evitar coste de hidratación innecesario).

---

## Estado de la feature 003 al cerrar la sesión

- [x] Spec cerrada (huella sustituye al cursor, estática, aplica a cualquier enlace que navegue).
- [x] Assets de cursor diseñados, revisados a tamaño real y optimizados.
- [x] CSS implementado y verificado técnicamente.
- [x] Confirmado por el usuario probándolo en su propio navegador.
- [x] Marcada como "Hecho" en `roadmap.md`.

## Próximos pasos (inicio de siguiente sesión)

1. Retomar la feature 002: redactar el contenido real de la primera sección (candidata: "Primeros pasos"), con el asistente proponiendo un borrador y el usuario revisándolo.
2. Repetir sección por sección hasta completar las 5, luego cerrar la 002 en el roadmap.
3. Más adelante: feature 004 (Razas de perros), ya con su spec/plan/tasks placeholder creados en sesiones anteriores.
