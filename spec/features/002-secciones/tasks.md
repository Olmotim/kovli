# 002 · Secciones temáticas — Tareas

> Derivadas del `plan.md`.

- [x] Instalar soporte MDX (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`).
- [x] Configurar `next.config.ts` (`pageExtensions` + `withMDX`) y verificar que funciona en dev y en build de producción.
- [x] Crear `mdx-components.tsx` con estilos Tailwind consistentes (`h1`-`h3`, `p`, `ul`/`ol`, `a`, `strong`).
- [x] Layout de artículo compartido (`app/(secciones)/layout.tsx`: enlace de vuelta a inicio + contenedor consistente).
- [x] Crear las 5 rutas base con placeholder ("Contenido en camino"): `primeros-pasos`, `salud`, `seguridad`, `adiestramiento`, `tiempo-de-juego`.
- [x] Actualizar los `href=""` (centralizados en `lib/secciones.ts`, usado por `Header.tsx` y `Secciones.tsx`) para las 5 secciones — "Razas" se deja sin ruta a propósito, es la feature 004.
- [x] Comprobar responsive en móvil y escritorio, y navegación real desde el header y las tarjetas de la home.
- [ ] Redactar y maquetar el contenido real de `primeros-pasos`.
- [ ] Redactar y maquetar el contenido real de `salud`.
- [ ] Redactar y maquetar el contenido real de `seguridad`.
- [ ] Redactar y maquetar el contenido real de `tiempo-de-juego`.
- [ ] Redactar y maquetar el contenido real de `adiestramiento`.
- [ ] Validar contra los criterios de aceptación de `spec.md`.
- [ ] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Nota de contenido

- Cada sección: yo redacto un primer borrador, tú lo revisas y das el OK antes de darla por buena (información sobre cuidado de perros — cuidado con la precisión).
