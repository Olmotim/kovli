"use server";

import { redirect } from "next/navigation";
import { perfilSchema, cambiarContrasenaSchema } from "@kovli/schemas";
import { createClient } from "@/lib/supabase/server";
import { BUCKET_FOTOS_PERROS, extensionDeArchivo } from "@/lib/storage";

export type PerfilFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

async function subirAvatarSiHay(
  supabase: SupabaseServerClient,
  usuarioId: string,
  formData: FormData,
): Promise<{ avatarPath?: string; error?: string }> {
  const avatar = formData.get("avatar");
  if (!(avatar instanceof File) || avatar.size === 0) {
    return {};
  }

  if (!avatar.type.startsWith("image/")) {
    return { error: "El archivo debe ser una imagen." };
  }

  // Ruta fija (no aleatoria como en perros.ts): con upsert:true, subir un
  // avatar nuevo sustituye el anterior automáticamente en Supabase Storage,
  // sin tener que borrar el archivo viejo a mano.
  const path = `${usuarioId}/avatar.${extensionDeArchivo(avatar.name)}`;
  const { error } = await supabase.storage
    .from(BUCKET_FOTOS_PERROS)
    .upload(path, avatar, { contentType: avatar.type, upsert: true });

  if (error) {
    return { error: "No se ha podido subir el avatar. Inténtalo de nuevo." };
  }

  return { avatarPath: path };
}

export async function actualizarPerfilAction(
  _prevState: PerfilFormState,
  formData: FormData,
): Promise<PerfilFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const parsed = perfilSchema.safeParse({ nombre: formData.get("nombre") });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { avatarPath, error: errorAvatar } = await subirAvatarSiHay(
    supabase,
    user.id,
    formData,
  );
  if (errorAvatar) {
    return { success: false, message: errorAvatar };
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      // null (no undefined) para poder borrar el nombre si se deja vacío:
      // user_metadata se fusiona con lo que ya había, y undefined
      // desaparece al serializar, así que no bastaría para borrarlo.
      nombre: parsed.data.nombre ?? null,
      // avatarPath solo se incluye si hay uno nuevo: al fusionarse, omitirlo
      // conserva el avatar ya guardado en vez de borrarlo.
      ...(avatarPath ? { avatarPath } : {}),
    },
  });

  if (error) {
    return {
      success: false,
      message: "No se ha podido guardar el perfil. Inténtalo de nuevo.",
    };
  }

  return { success: true, message: "Perfil actualizado." };
}

export async function cambiarContrasenaAction(
  _prevState: PerfilFormState,
  formData: FormData,
): Promise<PerfilFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) redirect("/login");

  const parsed = cambiarContrasenaSchema.safeParse({
    passwordActual: formData.get("passwordActual"),
    passwordNueva: formData.get("passwordNueva"),
    confirmarPassword: formData.get("confirmarPassword"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  // Supabase no exige la contraseña actual para updateUser({ password }),
  // solo sesión iniciada — se verifica a mano reautenticando con ella.
  const { error: errorReautenticacion } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.passwordActual,
  });

  if (errorReautenticacion) {
    return {
      success: false,
      errors: { passwordActual: ["La contraseña actual no es correcta."] },
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.passwordNueva,
  });

  if (error) {
    return {
      success: false,
      message: "No se ha podido cambiar la contraseña. Inténtalo de nuevo.",
    };
  }

  return { success: true, message: "Contraseña actualizada." };
}
