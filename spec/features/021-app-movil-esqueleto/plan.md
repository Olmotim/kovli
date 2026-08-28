# 021 · Esqueleto de la app móvil — Plan

> Respeta `constitution/tech-stack.md`. Ninguna dependencia se instala sin tu OK explícito (varias tareas nuevas en esta feature).

## Enfoque

Dos piezas que se construyen y se prueban por separado antes de unirlas:

1. **`apps/mobile`** — el proyecto Expo en sí: navegación, pantalla de login, pantalla de "Mis perros".
2. **Una API nueva en `apps/web`** — un Route Handler que la app móvil llama por HTTP para leer los perros del usuario. Es la pieza que faltaba: los Server Actions de Next.js no son una API pública (son una llamada RPC interna de Next.js, pensada para que la llame el propio formulario de la página, no un cliente externo como una app nativa) — de ahí que haga falta un Route Handler (`app/api/.../route.ts`), que sí es una URL HTTP normal que cualquier cliente puede llamar.

Reutilizamos al máximo lo que ya existe: mismo proyecto de Supabase (Auth), mismo Prisma, mismo patrón de "filtrar por `usuarioId` en servidor" ya usado por las 5 features de Fase 2 (`packages/domain`, `lib/storage.ts` para las URLs de fotos).

## Implementación

1. **Crear el proyecto Expo dentro del monorepo:**
   `pnpm create expo-app@latest --template default@latest apps/mobile` (plantilla en blanco de TypeScript; `apps/mobile` ya existe como carpeta vacía en el repo, el comando la usa como destino). `pnpm-workspace.yaml` ya incluye `apps/*`, así que en cuanto tenga su propio `package.json` pasa a formar parte del workspace sin tocar nada más.
   - **Aviso pnpm + Expo:** Metro (el bundler de React Native) puede tener problemas resolviendo dependencias con la estrategia de `node_modules` aislada por defecto de pnpm en monorepos. Si aparecen errores de "no encuentro el módulo X" al arrancar, la solución documentada por Expo es añadir `nodeLinker: hoisted` a `pnpm-workspace.yaml` — lo dejamos anotado aquí para no perder tiempo buscándolo si pasa, pero no lo aplicamos preventivamente (puede no hacer falta).
2. **Router: `expo-router`** (viene ya en la plantilla por defecto de Expo). Es un router de archivos, igual que el App Router de Next.js que ya conoces — cada archivo dentro de `app/` es una pantalla, y las carpetas entre paréntesis (`(auth)`, `(app)`) agrupan sin añadir segmento a la URL, mismo concepto que ya usa `apps/web/app/(secciones)/`. Elegido en vez de React Navigation "a pelo" para aprovechar ese paralelismo con algo que ya sabes.
3. **Dependencias nuevas a instalar (con tu OK antes de `pnpm add`):**
   - `@supabase/supabase-js` — mismo cliente que ya usa la web, ahora en el móvil.
   - `@react-native-async-storage/async-storage` — dónde guarda el cliente de Supabase la sesión en el dispositivo, para que persista entre reinicios de la app (equivalente a las cookies que usa la web).
   - `react-native-url-polyfill` — el motor de JavaScript de React Native no trae `URL`/`URLSearchParams` de serie; el propio SDK de Supabase pide importar este polyfill antes de crear el cliente.
   - Se instalan con `npx expo install <paquete>` en vez de `pnpm add` a secas — el comando de Expo elige la versión exacta compatible con el SDK del proyecto, en vez de la última versión de npm a secas (que podría no ser compatible).
4. **Cliente de Supabase para el móvil** (`apps/mobile/lib/supabase.ts`): mismo patrón que `apps/web/lib/supabase/client.ts`, pero con `AsyncStorage` como `storage` y `detectSessionInUrl: false` (no aplica en una app nativa, solo en web). Lee la URL y la clave pública desde variables de entorno con el prefijo `EXPO_PUBLIC_` (equivalente al `NEXT_PUBLIC_` de Next.js — cualquier variable con ese prefijo se empaqueta en el build y es visible en el cliente, así que solo debe llevarlo la clave pública, nunca una secreta) en un `.env` propio de `apps/mobile` (gitignored, igual que `apps/web/.env.local`).
5. **Pantalla de login** (`apps/mobile/app/(auth)/login.tsx`): formulario simple (email + contraseña) con `supabase.auth.signInWithPassword(...)`. Un `context` de sesión (`apps/mobile/lib/auth-context.tsx`, hook `useSession()`) escucha `supabase.auth.onAuthStateChange(...)` una vez en la raíz de la app y expone `{ session, isLoading }` al resto de pantallas.
6. **Protección de rutas**: layout raíz (`app/_layout.tsx`) que decide, según `useSession()`, si el usuario ve el grupo `(auth)` (login) o el grupo `(app)` (mis perros + lo que venga después) — patrón oficial de `expo-router` con `<Redirect>`, mismo espíritu que `proxy.ts` en la web pero resuelto en el cliente (una app nativa no tiene middleware de servidor).
7. **Route Handler en `apps/web`** (`apps/web/app/api/perros/route.ts`, método `GET`):
   - Lee el header `Authorization: Bearer <token>` que manda la app móvil (el `access_token` de la sesión de Supabase, que el cliente ya trae disponible en `supabase.auth.getSession()`).
   - Valida el token con `supabase.auth.getUser(token)` (cliente de servidor ya existente) — si no es válido, responde `401`.
   - Con el `id` del usuario ya verificado, consulta Prisma igual que ya hace `/cuenta` en la web (reutilizando la función existente de `lib/actions/perros.ts` si se puede extraer sin `"use server"`, o una consulta equivalente en el propio Route Handler) y arma la URL pública de cada foto con `urlFoto()` de `lib/storage.ts`.
   - Devuelve JSON: lista de perros con `id`, `nombre`, `raza`, `fotoUrl`.
   - **Nota sobre CORS:** no hace falta configurar nada especial — CORS es una restricción de navegadores web, no aplica a una app nativa (iOS/Android) haciendo `fetch` directo, así que el Route Handler no necesita cabeceras `Access-Control-Allow-Origin` para que la app móvil lo llame.
8. **Pantalla "Mis perros"** (`apps/mobile/app/(app)/index.tsx`): al montar, llama a la API anterior con el `access_token` de la sesión activa, y pinta la lista (nombre, raza, foto si tiene) — sin paginación ni caché, la lista de perros de un usuario es pequeña.
9. **Probar en un dispositivo real:** WSL no tiene simulador de iOS/Android disponible, así que la forma práctica de probar es la app **Expo Go** en tu móvil, conectada a la misma red Wi-Fi que el PC (`pnpm expo start`, escanear el QR). Si la red de WSL da problemas para que el móvil vea el servidor (situación conocida en WSL2), la alternativa es arrancar con `--tunnel`.
10. Verificar `pnpm build`/`pnpm lint` en el resto del monorepo (que `apps/mobile` no rompe nada de `apps/web`/`packages/*`), y probar en Expo Go de principio a fin: login → ver mis perros → logout → sesión no persiste tras logout / sí persiste tras cerrar y reabrir la app con sesión iniciada.

## Decisiones (cerradas contigo)

- Alcance: esqueleto + login + lista de perros (no solo el esqueleto vacío).
- Acceso a datos: API nueva en `apps/web` (Route Handler + Prisma + filtrado por `usuarioId`), no consultas directas de la app a Supabase — sin RLS nuevo en Postgres.

## Riesgos

- Primera vez que el proyecto combina pnpm workspaces con Metro (el bundler de React Native) — hay un ajuste conocido (`nodeLinker: hoisted`) si aparecen errores de resolución de módulos, ver paso 1.
- Primera vez que `apps/web` expone datos por una API pública (hasta ahora todo pasaba por Server Actions, invocables solo desde la propia web) — hay que validar el token con cuidado (paso 7) para no abrir una puerta que no esté bien protegida.
- Probar en un dispositivo real añade una variable nueva (red Wi-Fi, Expo Go) que no existía al probar la web en el navegador del propio PC.
