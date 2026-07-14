# 013 · Calendario de cuidados

**Estado:** hecha — validada por el usuario en el navegador.

## Qué hace

Tercer pilar de Fase 2: por cada perro, el usuario puede registrar cuidados veterinarios (vacunas, desparasitación, revisiones, otros) con fecha, y ver un listado cronológico de los próximos y los ya hechos. Los cuidados próximos (dentro de 30 días) o vencidos se destacan visualmente en la propia web — sin email ni notificaciones externas en esta primera versión.

Vive dentro de la ficha de cada perro (`/cuenta/perros/[id]`), como una sección nueva "Cuidados", justo debajo de los datos del perro ya existentes (feature 012). Además, `/cuenta` (el listado de perros) muestra un resumen por perro del próximo cuidado o de cualquier cuidado vencido, para no tener que entrar en cada ficha para verlo.

## Por qué

Es el primer pilar de Fase 2 que añade datos que "le pasan a un perro con el tiempo" (a diferencia de la ficha, que son datos fijos del propio perro). Sienta el patrón de tabla ligada a `Perro` que reutilizarán tareas/rutinas y diario más adelante.

## Modelo de datos (tabla `Cuidado`, Prisma)

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | uuid | — | generado |
| `usuarioId` | uuid | sí | FK a `auth.users.id`, igual que en `Perro` — se filtra siempre por esto en cada Server Action |
| `perroId` | uuid | sí | FK a `Perro`, a qué perro pertenece el cuidado |
| `tipo` | enum (`vacuna` / `desparasitacion` / `revision` / `otro`) | sí | catálogo cerrado |
| `tipoLibre` | texto | no | solo se usa (y se muestra) cuando `tipo = "otro"`, mismo patrón que `razaLibre` en la 012 |
| `fecha` | fecha | sí | fecha en la que se hizo (o está prevista, si es futura) |
| `notas` | texto largo | no | libre, ej. "le puso la vacuna la Dra. Pérez" |
| `createdAt` / `updatedAt` | fecha | — | automáticos |

No hay campo de "estado" (hecho/pendiente) aparte: se calcula comparando `fecha` con hoy. Una entrada con `fecha` futura es un cuidado **próximo**; una con `fecha` pasada es **historial**. Si el usuario quiere marcar algo como hecho antes de lo previsto, simplemente edita la fecha o añade una entrada nueva — no hay recurrencia automática (decisión cerrada contigo).

## Criterios de aceptación

- [x] Desde la ficha de un perro, el usuario puede añadir un cuidado nuevo: tipo (de la lista, u "otro" con texto libre), fecha (obligatoria) y notas (opcional).
- [x] La ficha del perro muestra una lista cronológica de sus cuidados, separando visualmente los **próximos** (fecha ≥ hoy) del **historial** (fecha < hoy).
- [x] Un cuidado próximo dentro de los siguientes 30 días (o ya vencido, es decir con fecha pasada) se destaca visualmente (ej. color de aviso) frente a uno lejano.
- [x] `/cuenta` (listado de perros) muestra, junto a cada perro, un resumen de su próximo cuidado o de cualquier cuidado vencido (ej. "vacuna en 5 días" o "revisión vencida"); si no tiene ninguno próximo ni vencido, no muestra nada o un texto neutro.
- [x] El usuario puede editar o borrar cualquier cuidado de sus propios perros (con confirmación al borrar).
- [x] Un usuario no puede ver ni modificar cuidados de perros de otro usuario: cada Server Action comprueba el usuario con `getUser()` y filtra por `usuarioId`, igual que en la 012.
- [x] Validación de los datos de entrada con Zod (`packages/schemas`), mismo patrón que 011/012.
- [x] `pnpm build` y `pnpm lint` sin errores nuevos.
- [x] Validado por el usuario en el navegador: crear cuidados de varios tipos, ver la lista ordenada, comprobar el aviso visual de próximos/vencidos, editar, borrar, y confirmar que no se accede a los de otro usuario.

## Fuera de alcance

- Recordatorios por email o notificación push — solo aviso visual dentro de la propia web por ahora.
- Recurrencia automática (ej. "repetir cada 12 meses" generando la siguiente entrada solo) — cada entrada se añade a mano.
- Vista de calendario visual tipo mes/cuadrícula — lista cronológica simple.
- Adjuntar documentos o fotos al cuidado (ej. cartilla de vacunación escaneada) — se deja para el futuro diario personal si hace falta.
- Registrar el mismo cuidado para varios perros a la vez — se añade uno a uno, por perro.

## Decisiones (cerradas contigo)

- Tipos de cuidado: catálogo cerrado (vacuna, desparasitación, revisión veterinaria, otro) + texto libre solo si se elige "otro".
- Recordatorio: solo destacado visual en la web, sin email ni push.
- Repetición: manual, sin recurrencia automática.
- Vista: lista cronológica, no calendario visual.
- Destacado visual: "próximo" = fecha dentro de los siguientes 30 días; "vencido" = fecha pasada.
- El resumen de próximo/vencido también se muestra en `/cuenta`, no solo dentro de la ficha de cada perro.
