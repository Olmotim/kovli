# 002 · Secciones temáticas — Tareas

> Derivadas del `plan.md`.

- [x] Instalar soporte MDX (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`).
- [x] Configurar `next.config.ts` (`pageExtensions` + `withMDX`) y verificar que funciona en dev y en build de producción.
- [x] Crear `mdx-components.tsx` con estilos Tailwind consistentes (`h1`-`h3`, `p`, `ul`/`ol`, `a`, `strong`).
- [x] Layout de artículo compartido (`app/(secciones)/layout.tsx`: enlace de vuelta a inicio + contenedor consistente).
- [x] Crear las 5 rutas base con placeholder ("Contenido en camino"): `primeros-pasos`, `salud`, `seguridad`, `adiestramiento`, `tiempo-de-juego`.
- [x] Actualizar los `href=""` (centralizados en `lib/secciones.ts`, usado por `Header.tsx` y `Secciones.tsx`) para las 5 secciones — "Razas" se deja sin ruta a propósito, es la feature 004.
- [x] Comprobar responsive en móvil y escritorio, y navegación real desde el header y las tarjetas de la home.
- [x] Construir los componentes reutilizables de cada página de sección (sesión 07): **"Libreta de veterinario"** (`FichaSeccion.tsx` — índice de la sección con aire de carné/ficha clínica, al principio) y **"Rolodex"** (`RolodexSecciones.tsx` — fichero de tarjetas en abanico con el resto de secciones, al final). Fuentes nuevas (Playfair Display, IBM Plex Mono) añadidas para darles su propio lenguaje visual.
- [x] Redactar y maquetar el contenido real de `primeros-pasos` — revisado y aprobado por el usuario.
- [x] Redactar y maquetar el contenido real de `salud` — revisado y aprobado por el usuario.
- [x] Redactar y maquetar el contenido real de `seguridad` — revisado y aprobado por el usuario.
- [ ] Redactar y maquetar el contenido real de `tiempo-de-juego`.
- [ ] Redactar y maquetar el contenido real de `adiestramiento`.
- [ ] Validar contra los criterios de aceptación de `spec.md`.
- [ ] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Nota de contenido

- Cada sección: yo redacto un primer borrador, tú lo revisas y das el OK antes de darla por buena (información sobre cuidado de perros — cuidado con la precisión).
- El patrón de página (Libreta + artículo + Rolodex) ya está resuelto con `primeros-pasos` — para las 4 secciones que quedan solo hay que repetirlo: escribir el borrador del artículo y su `FichaSeccion`/`RolodexSecciones` correspondientes.
