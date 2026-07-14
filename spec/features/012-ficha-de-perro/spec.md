# 012 · Ficha de perro(s)

**Estado:** hecha — validada por el usuario en el navegador (crear con/sin foto, raza de catálogo y libre, listado, editar, borrar).

## Qué hace

Segundo pilar de Fase 2: un usuario con sesión iniciada puede registrar uno o varios perros, ver el listado de los suyos, ver/editar la ficha de cada uno y borrarla. Primera tabla de negocio propia del proyecto (hasta ahora solo existía `auth.users`, gestionada por Supabase) — entra Prisma de verdad y se crea `packages/db`.

`/cuenta` deja de ser un placeholder y pasa a ser el listado de "mis perros" (con botón "añadir perro"); cada ficha individual vive en `/cuenta/perros/[id]`.

## Por qué

Es la base de la que dependen los siguientes tres pilares de Fase 2 (calendario, tareas, diario): todos ellos son "cosas que le pasan a un perro concreto", así que no pueden existir sin que antes exista el perro.

## Modelo de datos (tabla `Perro`, Prisma)

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | uuid | — | generado |
| `usuarioId` | uuid | sí | FK a `auth.users.id` (Supabase), nunca el email |
| `nombre` | texto | sí | |
| `raza` | texto | sí | slug del catálogo (`data/breeds.ts`) si se elige de la lista, o texto libre si el usuario elige "otra raza". Al mostrarlo: si el texto coincide con un slug del catálogo, enlaza a `/razas/[slug]`; si no, se muestra tal cual, sin enlace |
| `fechaNacimiento` | fecha | no | si no se indica, la edad se muestra como "desconocida" en vez de calcularse |
| `sexo` | enum (macho/hembra) | no | |
| `peso` | decimal (kg) | no | valor único actual, sin histórico (ver "Fuera de alcance") |
| `notas` | texto largo | no | libre |
| `fotoPath` | texto | no | ruta del archivo en Supabase Storage (no la URL completa, se reconstruye al mostrarla); una sola foto principal, no obligatoria |
| `createdAt` / `updatedAt` | fecha | — | automáticos |

La **edad** nunca se guarda como campo: se calcula en el momento de mostrarla a partir de `fechaNacimiento`, para que no se desincronice con el paso del tiempo.

## Criterios de aceptación

- [x] Un usuario con sesión iniciada puede registrar un perro nuevo con nombre y raza (obligatorios) y, opcionalmente, fecha de nacimiento, sexo, peso, notas y una foto.
- [x] Puede elegir la raza de la lista del catálogo existente, o escribir una raza que no esté en la lista.
- [x] `/cuenta` muestra el listado de todos los perros del usuario (y solo los suyos) con un botón para añadir uno nuevo.
- [x] Cada perro tiene una ficha individual (`/cuenta/perros/[id]`) donde se puede editar cualquier campo o borrar el perro (con confirmación).
- [x] Si el perro tiene `fechaNacimiento`, la ficha muestra la edad calculada (ej. "3 años"); si no la tiene, muestra "edad desconocida" en vez de un error o un campo vacío.
- [x] Un usuario no puede ver ni editar los perros de otro usuario: cada Server Action comprueba el usuario con `getUser()` en el servidor y filtra siempre por `usuarioId`, nunca confiando en un id que mande el cliente.
- [x] La foto, si se sube, se guarda en Supabase Storage y solo el dueño puede subir/borrar la suya (políticas de acceso a nivel de Storage, no solo de interfaz).
- [x] Validación de los datos de entrada con Zod (`packages/schemas`) antes de guardarlos, igual que en la 011.
- [x] Ninguna clave ni cadena de conexión a la base de datos queda commiteada — vía `.env.local` y variables de entorno de Vercel.
- [x] `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] Validado por el usuario en el navegador: crear, ver listado, editar, borrar, y comprobar que un perro de otro usuario no es accesible.

## Fuera de alcance

- Histórico de peso a lo largo del tiempo (una serie de pesajes) — encaja mejor como parte del futuro calendario/diario, no de la ficha básica.
- Galería de varias fotos por perro — se deja para la futura feature de diario personal, que si acumula fotos en el tiempo.
- Compartir la ficha de un perro entre varios usuarios (co-tutores, familia) — cada perro pertenece a un solo usuario por ahora.
- Roles o permisos especiales — no aplica.
- Vincular la raza a la ficha editorial de forma más profunda (ej. avisos automáticos de salud por raza) — solo el enlace simple a `/razas/[slug]` si coincide.

## Decisiones (cerradas contigo)

- Raza: catálogo existente + opción de texto libre si no está en la lista.
- Foto: sí, desde esta misma feature, pero no obligatoria.
- Edad: calculada desde `fechaNacimiento`, nunca almacenada.
- Fecha de nacimiento: opcional (perros adoptados sin fecha exacta conocida).
- `/cuenta` se reemplaza por el listado de perros; ficha individual en `/cuenta/perros/[id]`.
- Campos básicos + salud: nombre, raza, fecha de nacimiento, sexo, peso, notas.
