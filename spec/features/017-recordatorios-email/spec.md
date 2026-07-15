# 017 · Recordatorios por email (cuidados y rutinas)

**Estado:** spec y plan cerrados — documentado para implementar en la próxima sesión, sin tocar código todavía.

## Qué hace

Una vez al día, cada usuario con al menos un perro recibe un único email de resumen ("digest") si tiene algo pendiente: cuidados vencidos, cuidados próximos (dentro de 7 días) o rutinas de hoy sin marcar como hechas. Si no hay nada pendiente ese día, no se envía email. Unifica en un solo motor lo que en las specs 013 y 014 quedó como "solo aviso visual" — mismo dato, ahora también por email.

## Por qué

Cuidados y rutinas comparten exactamente el mismo problema técnico: hace falta algo que revise la base de datos sin que el usuario tenga la web abierta. Construir un solo motor de recordatorios en vez de dos (uno por cuidados, otro por rutinas) evita duplicar la misma tarea programada y el mismo código de envío. El diario personal se queda fuera: no tiene una fecha "pendiente" como cuidados/rutinas, así que no encajaba en el mismo patrón (decisión cerrada contigo).

## Cómo funciona (sin tabla nueva)

Una tarea programada de Vercel (Vercel Cron) llama una vez al día a una ruta de servidor (`/api/cron/recordatorios`), protegida con un secreto (`CRON_SECRET`) para que no la pueda llamar cualquiera. Esa ruta recorre cada usuario con perros, calcula su digest del día (misma lógica que ya se ve en `/cuenta`, pero con una ventana de "próximo" más corta) y, si hay algo que reportar, envía un email con Resend.

**Deliberadamente sin campos nuevos en `Cuidado`/`Tarea` para "ya se avisó de esto".** Al ser un digest diario (no una alerta puntual), el mismo cuidado pendiente puede aparecer en el email de hoy y en el de mañana si sigue sin resolverse — es el comportamiento esperado (recuerda hasta que se hace), y evita tener que rastrear qué ya se envió y qué no.

## Criterios de aceptación

- [ ] Existe una tarea programada en Vercel (`vercel.json`) que llama a `/api/cron/recordatorios` una vez al día.
- [ ] La ruta comprueba el header `Authorization: Bearer <CRON_SECRET>`; sin el secreto correcto, responde 401 sin hacer nada más.
- [ ] Para cada usuario con al menos un perro, se calcula: cuidados vencidos, cuidados próximos (≤7 días) y rutinas de hoy sin completar.
- [ ] Si el digest de un usuario está vacío, no se le envía ningún email ese día.
- [ ] Si no está vacío, se envía un único email (no uno por cuidado/tarea) con el resumen, usando el SDK oficial de Resend.
- [ ] `pnpm build` y `pnpm lint` sin errores nuevos.
- [ ] Validado por el usuario: llamar a la ruta a mano con y sin el secreto correcto (comprobando 401 en el segundo caso), y comprobar que el email llega con el contenido esperado.

## Fuera de alcance

- Recordatorios push (solo email).
- Recordatorio sobre el diario personal — descartado, no encaja en el mismo patrón de "fecha pendiente".
- Elegir la hora de envío por usuario — una hora fija para todos.
- Marcar un cuidado/tarea concreto como "ya avisado" para no repetirlo — es un digest diario, se repite mientras siga pendiente.

## Decisiones (cerradas contigo)

- Un solo motor para cuidados y rutinas, no dos sistemas separados.
- SDK oficial de Resend (`resend`), no llamadas manuales con `fetch`.
- Sin recordatorio del diario personal.
- Ventana de "próximo" en el email: 7 días (más corta que los 30 de la vista de `/cuenta`, para que el email no sea ruidoso).
