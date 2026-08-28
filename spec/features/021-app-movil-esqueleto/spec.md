# 021 · Esqueleto de la app móvil (login + mis perros)

**Estado:** hecho — validada en Expo Go (login, mis perros, logout, persistencia de sesión).

## Qué hace

Primera pieza de Fase 3: crea `apps/mobile` con Expo (React Native), con navegación básica, una pantalla de login que comparte la sesión con la web (mismo proyecto de Supabase Auth, mismo usuario), y una primera pantalla de datos reales — "Mis perros", solo lectura (nombre, raza, foto si tiene) — para validar de una vez que el login compartido y el acceso a datos funcionan de principio a fin.

Sin ninguna otra funcionalidad de negocio todavía (nada de calendario, rutinas ni diario en el móvil) — es el equivalente móvil de lo que fue la feature 011 en la web, más una primera pantalla de lectura.

## Por qué

Es la base de toda la Fase 3: sin login funcionando en el móvil no hay forma de ver nada personal del usuario. Se construye primero y sola, igual que la 011 lo fue para Fase 2, para no mezclar la mecánica de sesión con la primera pantalla de datos reales.

La pantalla de "Mis perros" (en vez de dejar el esqueleto sin ningún dato) sirve para probar de una vez la pieza más delicada de esta feature: cómo la app móvil pide datos protegidos por usuario sin duplicar la lógica de seguridad que ya existe en la web.

## Criterios de aceptación

- [x] `apps/mobile` existe como proyecto Expo dentro del monorepo (pnpm workspace), arranca con `pnpm --filter mobile start` (o equivalente) y se puede abrir en Expo Go o un simulador.
- [x] Un usuario ya registrado en la web puede iniciar sesión en la app con el mismo email + contraseña.
- [x] La sesión persiste entre reinicios de la app (no hay que volver a iniciar sesión cada vez que se abre).
- [x] Un usuario con sesión iniciada puede cerrarla desde la app.
- [x] Sin sesión, la app muestra la pantalla de login; con sesión, la pantalla de "Mis perros".
- [x] Nueva API en `apps/web` (Route Handler) que devuelve los perros del usuario autenticado, verificando el token de sesión recibido de la app — reutiliza Prisma y el filtrado por `usuarioId` ya existente, sin activar RLS en Postgres.
- [x] La pantalla "Mis perros" de la app muestra la lista (nombre, raza, foto si tiene) tal cual la devuelve esa API.
- [x] Mensajes de error razonables si el login falla (credenciales incorrectas) o si la API de perros no responde.
- [x] `pnpm build` y `pnpm lint` siguen sin errores nuevos en el resto del monorepo.
- [x] Validado por ti en Expo Go o un simulador.

## Fuera de alcance

- Crear, editar o borrar perros desde el móvil — solo lectura por ahora.
- Calendario de cuidados, rutinas diarias y diario personal en el móvil — quedan para features posteriores de Fase 3.
- Registro de cuenta nueva y recuperación de contraseña desde el móvil — de momento el login asume una cuenta ya creada desde la web.
- Notificaciones push.
- Modo offline / caché local de datos.
- Publicar la app en las tiendas (App Store / Play Store) — de momento se prueba solo en Expo Go / build de desarrollo.

## Decisiones (cerradas contigo)

- Alcance de esta primera feature: esqueleto + login + lista de perros (no solo el esqueleto vacío).
- Acceso a datos de negocio: vía una API nueva en `apps/web` que reutiliza Prisma + el filtrado por `usuarioId` ya existente — **no** consultas directas de la app a Supabase, y **no** se activa RLS en Postgres.
- Framework móvil y login compartido con Supabase Auth: ya fijados en `spec/constitution/tech-stack.md` desde antes de abrir Fase 3.
