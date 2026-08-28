# Tasks · 021 · Esqueleto de la app móvil

> Derivadas del `plan.md`. Empezamos en cuanto confirmes el spec y el plan.

- [x] 1. Crear el proyecto Expo en `apps/mobile` (plantilla en blanco de TypeScript + `expo-router` instalado a mano) y confirmar que `pnpm build`/`pnpm lint` del resto del monorepo siguen funcionando. Validado en Expo Go (SDK 57, vía `expo start --tunnel` — necesario porque la red de WSL2 no es alcanzable directamente desde el móvil).
- [x] 2. Instalar `@supabase/supabase-js`, `@react-native-async-storage/async-storage` y `react-native-url-polyfill` en `apps/mobile` (con tu OK explícito antes de instalar, vía `npx expo install`).
- [x] 3. `apps/mobile/.env` con `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (mismos valores que `apps/web/.env.local`; confirmar que `.env*` sigue en `.gitignore` también dentro de `apps/mobile`).
- [x] 4. Cliente de Supabase para el móvil (`apps/mobile/lib/supabase.ts`) con `AsyncStorage`.
- [x] 5. Contexto de sesión (`apps/mobile/lib/auth-context.tsx`, `useSession()`).
- [x] 6. Pantalla de login (`apps/mobile/app/(auth)/login.tsx`).
- [x] 7. Layout raíz con protección de rutas (`apps/mobile/app/_layout.tsx`), grupos `(auth)`/`(app)`.
- [x] 8. Route Handler `apps/web/app/api/perros/route.ts` (GET): valida el token, consulta Prisma filtrando por `usuarioId`, devuelve JSON con nombre/raza/fotoUrl.
- [x] 9. Pantalla "Mis perros" (`apps/mobile/app/(app)/index.tsx`): llama a la API, pinta la lista, botón de logout.
- [x] 10. `pnpm build` y `pnpm lint` sin errores nuevos en el monorepo.
- [x] 11. Probar en Expo Go en tu móvil: login → mis perros → logout → persistencia de sesión al reabrir la app.
- [x] 12. Validación tuya en el dispositivo.
- [x] 13. Mover la feature a "Hecho" en `roadmap.md` y añadir la entrada de Fase 3 (igual que se hizo al abrir Fase 2).
