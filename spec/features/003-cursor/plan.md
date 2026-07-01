# 003 · Cursor hocico + enlaces con huella — Plan

> Respeta `constitution/tech-stack.md`. Pendiente de tu OK antes de implementar.

## Enfoque

CSS puro, sin JavaScript. `cursor: url(...), auto;` en `body` para el hocico por defecto, y una regla más específica en los enlaces (`a`) que lo sustituye por la huella en hover. Todo dentro de una media query `(pointer: fine)` para no afectar a dispositivos táctiles.

## Implementación

🟡 _Borrador a afinar contigo:_

1. **Preparar 2 imágenes de cursor** (hocico y huella), pequeñas (~32×32px) y con fondo transparente — 🟡 _a decidir contigo: ¿tienes ya un asset en mente, o las genero yo (SVG simple, mismo estilo que la ilustración del Hero) y las paso a PNG con `sharp`?_
2. Guardarlas en `apps/web/public/cursores/` (p. ej. `hocico.png`, `huella.png`).
3. Reglas CSS en `globals.css`, dentro de `@media (pointer: fine)`:
   - `body { cursor: url("/cursores/hocico.png") 16 16, auto; }`
   - `a { cursor: url("/cursores/huella.png") 16 16, pointer; }` (los números son el punto exacto de clic dentro de la imagen — *hotspot*).
4. Verificar en navegador (Playwright permite comprobar el valor CSS `cursor` aplicado, aunque no renderiza la imagen del cursor del sistema operativo en la captura).

## Decisiones (cerradas)

- La huella sustituye al cursor (no es un adorno aparte).
- Aplica a cualquier enlace que navegue (interno, ancla o externo), no solo externos.
- Huella estática, sin animación.
- CSS puro, sin JavaScript — evita el coste de hidratación visto en la feature 001.

## Riesgos

- **Verificación limitada por herramientas**: Playwright puede confirmar qué regla CSS de `cursor` se aplica a cada elemento, pero no puede hacer una captura de pantalla del cursor del sistema operativo en sí — la comprobación visual final del hocico/huella la tendrás que hacer tú, moviendo el ratón de verdad en el navegador.
- **Tamaño/formato de imagen**: si el PNG pesa o mide de más, algunos navegadores ignoran el cursor personalizado y caen al por defecto — hay que mantenerlo pequeño y comprobarlo.
