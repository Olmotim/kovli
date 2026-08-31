# 022 · Calendario de cuidados en el móvil

**Estado:** especificada — spec y plan cerrados, sin código todavía.

## Qué hace

Segunda pieza de Fase 3, sobre la base de la 021 (login + "Mis perros"): añade una pantalla de detalle por perro en la app móvil que muestra sus cuidados veterinarios (vacunas, desparasitación, revisiones u "otro"), separados en "Próximos" e "Historial" — mismo contenido que la ficha del perro en la web (013), pero solo lectura.

Se llega a esta pantalla pulsando un perro en la lista "Mis perros" ya existente.

## Por qué

La 021 dejó la lista de perros pero ningún sitio al que ir al pulsar uno — es el hueco obvio a cerrar antes de añadir más datos. El calendario de cuidados es el más simple de los tres pilares que quedan (frente a rutinas o diario) para ser la primera pantalla de detalle: sin checklist que marcar ni fotos que subir, solo mostrar una lista que el backend ya deja calculada.

## Criterios de aceptación

- [ ] Pulsar un perro en "Mis perros" lleva a una pantalla nueva con su nombre y sus cuidados.
- [ ] Los cuidados se muestran separados en "Próximos" e "Historial", igual que en la ficha web del perro.
- [ ] Nueva API en `apps/web` (`GET /api/perros/[id]/cuidados`) que verifica el token de sesión, comprueba que el perro es del usuario autenticado, y devuelve los cuidados ya separados en `proximos`/`historial` (reutilizando `cuidadosPendientes()`/`estadoCuidado()` de `packages/domain`).
- [ ] Si el perro no existe o no es del usuario, la API responde 404 (mismo criterio de seguridad que las Server Actions de la web: comprobar `usuarioId` antes de devolver nada).
- [ ] Sin cuidados registrados, la pantalla muestra un mensaje ("Sin cuidados registrados todavía") en vez de listas vacías sin explicación.
- [ ] Mensajes de error razonables si la API no responde.
- [ ] `pnpm build` y `pnpm lint` siguen sin errores nuevos en el resto del monorepo.
- [ ] Validado por ti en Expo Go.

## Fuera de alcance

- Crear, editar o borrar cuidados desde el móvil — solo lectura.
- Adjuntos (archivos de la 018) — no se muestran en esta primera pieza.
- Recurrencia automática y vista de calendario mensual (018) — la app móvil solo lista, no calcula ni navega por meses.
- Rutinas diarias y diario personal en el móvil — quedan para features posteriores de Fase 3.
- Pull-to-refresh o caché local — se recarga solo al entrar en la pantalla, mismo criterio simple que la 021.

## Decisiones (cerradas contigo)

- Alcance: pantalla de detalle de perro con cuidados (próximos/historial), solo lectura, sin adjuntos ni recurrencia.
- API dedicada `GET /api/perros/[id]/cuidados`, con el estado (vencido/próximo) ya calculado en el backend reutilizando `packages/domain` — el móvil no reimplementa lógica de fechas.
