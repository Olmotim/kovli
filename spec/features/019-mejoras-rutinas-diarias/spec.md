# 019 · Mejoras de rutinas diarias

**Estado:** spec y plan cerrados — documentado para implementar en la próxima sesión, sin tocar código todavía.

## Qué hace

Cuatro mejoras sobre la 014, todas de su lista de "fuera de alcance":

1. **Días de la semana**: una rutina puede limitarse a ciertos días (ej. "solo fines de semana") en vez de ser siempre diaria.
2. **Historial visual**: ver los últimos 30 días de una rutina (hecha/no hecha cada día) — el dato ya se guardaba desde la 014, faltaba la pantalla.
3. **Pausar/archivar**: dejar una rutina en pausa (no aparece en el checklist ni en el email de recordatorio) sin borrarla ni perder su historial.
4. **Reordenar**: cambiar el orden en que aparecen las rutinas en el checklist, con botones subir/bajar.

## Por qué

Las cuatro estaban explícitamente fuera de alcance en `spec/features/014-tareas-rutinas/spec.md`. Se agrupan en una sola feature porque las cuatro tocan el mismo modelo (`Tarea`) y no dependen unas de otras ni de infraestructura nueva (a diferencia de los recordatorios, que sí necesitaban su propia feature, 017).

## Modelo de datos (cambios sobre `Tarea`)

| Campo nuevo | Tipo | Notas |
|---|---|---|
| `diasSemana` | `Int[]` | Días en que aplica la rutina (`0` = domingo ... `6` = sábado). **Vacío = todos los días** (compatible con las rutinas ya creadas, que no tenían este concepto). |
| `activa` | `Boolean` (`@default(true)`) | `false` = pausada: no aparece en "Rutinas de hoy" ni en el digest de email de la 017, pero su historial (`TareaCompletada`) se conserva intacto. |
| `orden` | `Int` (`@default(autoincrement())`) | Posición en la lista; se reordena con botones subir/bajar, que intercambian el `orden` con la tarea vecina. |

## Criterios de aceptación

- [ ] Al crear o editar una rutina, se pueden marcar los días de la semana en que aplica (por defecto, todos — sin cambiar el comportamiento de las rutinas ya existentes).
- [ ] "Rutinas de hoy" solo muestra las rutinas activas cuyo día de la semana de hoy esté incluido (o que no tengan restricción de días).
- [ ] Nueva vista de historial por rutina (`/cuenta/perros/[id]/rutinas/[tareaId]/historial`): lista de los últimos 30 días con si se completó o no cada uno.
- [ ] Una rutina se puede pausar/reactivar desde su página de edición; pausada, desaparece del checklist de hoy y del email de recordatorio, pero su historial sigue accesible.
- [ ] Cada rutina tiene botones para subir/bajar su posición en la lista; el checklist respeta ese orden.
- [ ] Un usuario no puede ver ni modificar rutinas de otro usuario (se mantiene el patrón ya existente).
- [ ] `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] Validado por el usuario en el navegador: crear una rutina solo de fin de semana y comprobar que no aparece entre semana; ver el historial de una rutina con varios días marcados; pausar una rutina y comprobar que desaparece del checklist; reordenar con los botones.

## Fuera de alcance

- Historial visual tipo calendario/cuadrícula (como el de cuidados en la 018) — aquí es una lista simple de los últimos 30 días, más sencilla y coherente con que no se pidió explícitamente una vista de calendario para rutinas.
- Notificaciones/recordatorios propios de esta feature — ya cubiertos por la 017, que respeta `activa` al armar el digest.
- Arrastrar y soltar para reordenar — botones subir/bajar, decisión ya cerrada.

## Decisiones (cerradas contigo)

- `diasSemana` vacío = diaria, para no romper las rutinas ya creadas.
- Pausar no borra el historial, solo oculta la rutina del checklist y del email.
- Reordenar con botones subir/bajar, sin drag-and-drop ni dependencia nueva.
