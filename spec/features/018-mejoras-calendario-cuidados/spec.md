# 018 · Mejoras del calendario de cuidados

**Estado:** spec y plan cerrados — documentado para implementar en la próxima sesión, sin tocar código todavía.

## Qué hace

Cuatro mejoras sobre la 013, todas de la lista de "fuera de alcance" original:

1. **Recurrencia automática**: un cuidado puede marcarse como "se repite cada X meses"; al vencer, se genera solo el siguiente.
2. **Vista de calendario visual**: una cuadrícula de mes, alternativa a la lista actual de próximos/historial.
3. **Adjuntar archivos**: fotos o PDF a un cuidado (ej. cartilla de vacunación escaneada).
4. **Registrar el mismo cuidado para varios perros a la vez**: al dar de alta uno, marcar también otros perros del usuario.

## Por qué

Las cuatro estaban explícitamente fuera de alcance en `spec/features/013-calendario-de-cuidados/spec.md`. Se agrupan en una sola feature porque comparten la misma base de datos (`Cuidado`) y no dependen unas de otras, a diferencia de los recordatorios (017), que sí necesitaban su propia feature por la infraestructura nueva que traen.

## Modelo de datos (cambios sobre `Cuidado`)

| Campo nuevo | Tipo | Notas |
|---|---|---|
| `repiteCadaMeses` | `Int?` | `null` = no se repite. Si tiene valor, al vencer se genera automáticamente el siguiente `Cuidado` (mismo perro/tipo, `fecha` = fecha actual + este valor en meses, mismo `repiteCadaMeses` para que la cadena continúe). |
| `archivos` | `String[]` | Rutas en Supabase Storage (reutiliza el bucket `fotos-perros`, bajo `usuarioId/cuidados/...`, mismo patrón que las fotos del diario). Hasta 5, igual que en el diario. Acepta imágenes y PDF. |

## Cómo funciona la recurrencia

Se apoya en el mismo cron diario que ya trae la feature 017 (se le añade un paso más, no se crea uno nuevo): cada día, además de calcular los digests de email, revisa los `Cuidado` con `repiteCadaMeses` no nulo cuya `fecha` ya pasó **y que todavía no tienen un "sucesor"** (no existe otro `Cuidado` del mismo perro y tipo con fecha posterior) — si no lo tiene, crea el siguiente. Esto evita crear uno nuevo cada día que pase el cron sin que el usuario haga nada.

## Criterios de aceptación

- [ ] Al crear o editar un cuidado, se puede marcar "se repite cada [N] meses" (opcional).
- [ ] Cuando un cuidado recurrente vence, el cron crea automáticamente el siguiente (misma configuración de recurrencia), sin duplicados si corre varias veces sobre el mismo cuidado ya vencido.
- [ ] Nueva vista `/cuenta/perros/[id]/cuidados/calendario`: cuadrícula del mes actual, navegación a mes anterior/siguiente, cuidados de cada día visibles en su celda; enlace para alternar entre esta vista y la lista existente.
- [ ] Al crear o editar un cuidado, se pueden adjuntar hasta 5 archivos (imagen o PDF); se ven/descargan desde la ficha del cuidado; se borran del Storage al quitarlos o al borrar el cuidado entero.
- [ ] Al crear un cuidado, se puede marcar "aplicar también a" otros perros del usuario; se crea un cuidado idéntico (mismos datos, sin compartir fila) por cada perro marcado.
- [ ] Un usuario no puede ver ni modificar cuidados de otro usuario (se mantiene el patrón ya existente).
- [ ] `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] Validado por el usuario en el navegador: crear un cuidado recurrente y comprobar (forzando la fecha o esperando) que se genera el siguiente; navegar la vista de calendario; adjuntar y quitar archivos; crear un cuidado para varios perros a la vez.

## Fuera de alcance

- Recurrencia por semana/día concreto — solo por número de meses.
- Editar o borrar "solo esta instancia" de una serie recurrente de forma especial — cada cuidado generado es independiente, se edita/borra como cualquier otro (no rompe la cadena futura, ya que el siguiente se genera a partir del que vence, no de una plantilla aparte).
- Vista de calendario con más de un mes visible a la vez, o vista de año.

## Decisiones (cerradas contigo)

- La recurrencia se genera "al vencer", no cuando el usuario confirma que se hizo (hoy no existe un "marcar como hecho" en cuidados, y no se añade solo para esto).
- El calendario visual se construye a mano con CSS Grid, sin librería nueva.
- Reutiliza el cron de la 017 para la generación automática — no un cron aparte.
