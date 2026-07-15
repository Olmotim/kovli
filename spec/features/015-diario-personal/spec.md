# 015 · Diario personal

**Estado:** hecha — validada por el usuario en el navegador. Cierra Fase 2.

## Qué hace

Quinto y último pilar de Fase 2: por cada perro, el usuario escribe entradas de diario — recuerdos con texto y/o hasta 5 fotos, fechados. Es la feature para la que la 012 dejó la puerta abierta a propósito: la ficha del perro solo tiene una foto principal, aquí es donde se puede acumular una galería de fotos en el tiempo.

Vive dentro de la ficha de cada perro (`/cuenta/perros/[id]`), como una sección nueva "Diario", debajo de "Rutinas de hoy" (feature 014). Sin resumen en `/cuenta`: a diferencia de cuidados y rutinas, una entrada de diario no es algo "pendiente" que avisar — solo vive dentro de la ficha del perro.

## Por qué

Cierra los 4 pilares de Fase 2 (autenticación → ficha de perro → calendario de cuidados → tareas/rutinas → diario). Es la primera feature con subida de **varias** fotos a la vez, reusando el mismo bucket de Supabase Storage que ya usa la foto de perfil del perro (la política de acceso ya restringe por carpeta de usuario, sin depender de qué haya dentro de esa carpeta).

## Modelo de datos (tabla `EntradaDiario`, Prisma)

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | uuid | — | generado |
| `usuarioId` | uuid | sí | FK a `auth.users.id`, mismo patrón que `Cuidado`/`Tarea` |
| `perroId` | uuid | sí | FK a `Perro` (`onDelete: Cascade`) |
| `fecha` | fecha | sí | fecha del recuerdo (editable, no siempre la fecha en que se escribe) |
| `texto` | texto largo | no* | la nota del recuerdo |
| `fotos` | lista de texto | no* | rutas en Supabase Storage, hasta 5 por entrada |
| `createdAt` / `updatedAt` | fecha | — | automáticos |

*Una entrada no puede quedar totalmente vacía: necesita `texto`, al menos una foto, o ambos. Se valida con Zod, no con una restricción de base de datos.

Las fotos se guardan como una lista de rutas (`fotos: String[]`, campo array de Postgres) en la propia tabla, sin una tabla aparte — no hace falta más metadato por foto (orden = posición en la lista, borrar = quitar de la lista + borrar el archivo en Storage). Se reutiliza el bucket `fotos-perros` ya existente (rutas `usuarioId/diario/...`, distintas de las de la foto de perfil `usuarioId/...`): la política de Storage de la 012 ya restringe por la carpeta del usuario, sin depender de qué haya dentro — no hace falta ningún bucket ni política nueva.

## Criterios de aceptación

- [x] Desde la ficha de un perro, el usuario puede crear una entrada nueva: fecha (obligatoria, por defecto hoy), texto (opcional) y hasta 5 fotos (opcional) — pero no puede guardar una entrada sin texto y sin fotos.
- [x] La ficha del perro muestra las entradas del diario ordenadas de más reciente a más antigua.
- [x] El usuario puede editar el texto/fecha/fotos de una entrada o borrarla (con confirmación); al borrarla se borran también sus fotos de Storage.
- [x] Un usuario no puede ver ni modificar entradas de perros de otro usuario: cada Server Action comprueba el usuario con `getUser()` y filtra por `usuarioId`, igual que en 012/013/014.
- [x] Validación de los datos de entrada con Zod (`packages/schemas`), incluida la regla de "texto o foto, no ambos vacíos" y el máximo de 5 fotos.
- [x] `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] Validado por el usuario en el navegador: crear entradas con solo texto, solo fotos, y ambos; comprobar el orden cronológico; editar (incluida foto); borrar; y confirmar que no se accede a entradas de otro usuario.

## Fuera de alcance

- Recordatorios o notificaciones sobre el diario — no aplica, no es algo con fecha límite.
- Resumen en `/cuenta` — solo vive dentro de la ficha del perro.
- Reordenar las fotos de una entrada a mano tras subirlas — se muestran en el orden en que se subieron.
- Compartir o exportar el diario (ej. como PDF) — no en esta versión.
- Etiquetas o categorías de entrada (ej. "paseo", "veterinario") — texto libre sin estructura.

## Decisiones (cerradas contigo)

- Fotos por entrada: varias, con un límite de 5.
- Contenido mínimo: al menos texto o una foto, no ambos vacíos.
- Fecha: propia y editable, por defecto hoy (mismo patrón que `Cuidado.fecha`).
- Dónde se ve: solo dentro de la ficha del perro, sin resumen en `/cuenta`.
- Fotos guardadas como lista de rutas en la propia tabla (sin tabla aparte), reutilizando el bucket `fotos-perros` ya existente.
