# 014 · Tareas / rutinas diarias

**Estado:** hecha — validada por el usuario en el navegador.

## Qué hace

Cuarto pilar de Fase 2: por cada perro, el usuario define rutinas que se repiten **todos los días** (ej. "Paseo de la mañana", "Comida", "Adiestramiento 10 min") y cada día las marca como hechas o no. Cada rutina se define una vez; el checklist de "hoy" se reinicia solo cada día, sin que el usuario tenga que volver a crearla.

Vive dentro de la ficha de cada perro (`/cuenta/perros/[id]`), como una sección nueva "Rutinas de hoy", debajo de "Cuidados" (feature 013). Además, `/cuenta` (listado de perros) muestra un resumen por perro de cuántas rutinas se han hecho hoy (ej. "2/3 hechas hoy").

## Por qué

Es el segundo pilar de Fase 2 que añade datos "del día a día" del perro (después del calendario de cuidados). A diferencia de un `Cuidado` (un evento puntual con fecha propia), una rutina es la **definición** de algo recurrente — lo que cambia cada día es si se marcó como hecha, no la rutina en sí.

## Modelo de datos (dos tablas nuevas, Prisma)

**`Tarea`** — la definición de la rutina (se crea una vez):

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | uuid | — | generado |
| `usuarioId` | uuid | sí | FK a `auth.users.id`, mismo patrón que `Perro`/`Cuidado` |
| `perroId` | uuid | sí | FK a `Perro` (`onDelete: Cascade`), mismo patrón que `Cuidado` |
| `nombre` | texto | sí | texto libre, sin catálogo cerrado (ej. "Paseo de la mañana") |
| `createdAt` / `updatedAt` | fecha | — | automáticos |

**`TareaCompletada`** — una marca por cada día en que una rutina se hizo:

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | uuid | — | generado |
| `tareaId` | uuid | sí | FK a `Tarea` (`onDelete: Cascade`) |
| `fecha` | fecha (solo día, sin hora) | sí | el día que se marcó como hecha |
| `createdAt` | fecha | — | automático |

Restricción de unicidad en (`tareaId`, `fecha`): una rutina no puede tener dos marcas el mismo día. Marcar una rutina como hecha crea una fila aquí; desmarcarla la borra — no hay un booleano "hecha" en `Tarea`, se calcula comprobando si existe una `TareaCompletada` para el día de hoy.

## Criterios de aceptación

- [x] Desde la ficha de un perro, el usuario puede crear una rutina nueva con un nombre (texto libre).
- [x] La ficha del perro muestra el checklist de "Rutinas de hoy": cada rutina con una casilla que se marca/desmarca al hacer clic, sin recargar la página a un sitio distinto.
- [x] Al marcar una rutina como hecha hoy y volver a entrar otro día, aparece de nuevo sin marcar (el estado de "hecha" es siempre relativo al día de hoy).
- [x] El usuario puede editar el nombre de una rutina o borrarla (con confirmación); al borrarla se borra también su historial de días completados.
- [x] `/cuenta` (listado de perros) muestra, junto a cada perro, cuántas rutinas de las de hoy están hechas (ej. "2/3 hechas hoy"); si el perro no tiene rutinas, no muestra nada.
- [x] Un usuario no puede ver ni modificar rutinas de perros de otro usuario: cada Server Action comprueba el usuario con `getUser()` y filtra por `usuarioId`, igual que en la 012/013.
- [x] Validación de los datos de entrada con Zod (`packages/schemas`), mismo patrón que 011/012/013.
- [x] `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] Validado por el usuario en el navegador: crear rutinas, marcar/desmarcar, comprobar que el resumen de `/cuenta` cuenta bien, editar, borrar, y confirmar que no se accede a rutinas de otro usuario.

## Fuera de alcance

- Elegir días de la semana concretos para una rutina (ej. "solo fines de semana") — todas son diarias en esta primera versión.
- Vista de historial de días pasados — el modelo de datos ya lo permite (`TareaCompletada` guarda cada día), pero no se construye una pantalla para verlo todavía.
- Recordatorios por email o notificación push — igual que en la 013, solo lo visible en la propia web.
- Tareas generales sin ligar a ningún perro (ej. "comprar pienso") — todas las rutinas son de un perro concreto.
- Pausar o archivar una rutina sin borrarla — solo crear, editar el nombre o borrar (lo que borra también su historial).
- Reordenar las rutinas a mano — se muestran en el orden en que se crearon.

## Decisiones (cerradas contigo)

- Recurrencia: rutina diaria de verdad (se define una vez, el checklist se reinicia cada día), no un checklist simple sin repetición.
- Alcance: cada rutina está ligada a un perro concreto, no son generales del usuario.
- Tipo de rutina: nombre en texto libre, sin catálogo cerrado.
- Frecuencia: siempre diaria, sin selección de días de la semana.
- Dónde se ve: sección en la ficha del perro + resumen en `/cuenta`.
