import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente "admin": usa la service_role key, que salta las políticas de
// seguridad de Supabase. A diferencia de lib/supabase/server.ts (que
// gestiona la sesión del usuario que navega), este no lleva cookies ni
// sesión — solo sirve para operaciones de servidor a servidor como leer
// el email de un usuario por su id. Nunca debe importarse desde código
// que pueda ejecutarse en el navegador.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
