"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  registroSchema,
  loginSchema,
  recuperarContrasenaSchema,
  nuevaContrasenaSchema,
} from "@kovli/schemas";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

async function origenActual() {
  const headersList = await headers();
  return headersList.get("origin") ?? "http://localhost:3000";
}

function mensajeError(code: string | undefined): string {
  switch (code) {
    case "invalid_credentials":
      return "Email o contraseña incorrectos.";
    case "email_not_confirmed":
      return "Todavía no has confirmado tu email. Revisa tu bandeja de entrada.";
    case "user_already_exists":
    case "email_exists":
      return "Ya existe una cuenta con ese email.";
    case "weak_password":
      return "La contraseña es demasiado débil.";
    case "over_email_send_rate_limit":
      return "Se han enviado demasiados emails a esta dirección. Espera unos minutos e inténtalo de nuevo.";
    case "same_password":
      return "La nueva contraseña debe ser distinta de la actual.";
    default:
      return "Algo ha salido mal. Inténtalo de nuevo.";
  }
}

export async function registrarAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = registroSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmarPassword: formData.get("confirmarPassword"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const origin = await origenActual();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    return { success: false, message: mensajeError(error.code) };
  }

  return {
    success: true,
    message: "Revisa tu email para confirmar la cuenta antes de iniciar sesión.",
  };
}

export async function iniciarSesionAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { success: false, message: mensajeError(error.code) };
  }

  redirect("/cuenta");
}

export async function cerrarSesionAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function solicitarRecuperacionAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = recuperarContrasenaSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const origin = await origenActual();

  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/confirm`,
  });

  // Mismo mensaje exista o no esa cuenta: decir "ese email no existe"
  // dejaría averiguar qué direcciones están registradas en Kovli.
  return {
    success: true,
    message:
      "Si existe una cuenta con ese email, te hemos enviado un enlace para restablecer la contraseña.",
  };
}

export async function establecerNuevaContrasenaAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = nuevaContrasenaSchema.safeParse({
    password: formData.get("password"),
    confirmarPassword: formData.get("confirmarPassword"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, message: mensajeError(error.code) };
  }

  // La sesión temporal de recuperación no debe seguir viva: forzamos a
  // iniciar sesión de nuevo, ya con la contraseña cambiada.
  await supabase.auth.signOut();
  redirect("/login?mensaje=contrasena-actualizada");
}
