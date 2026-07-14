"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { perroSchema } from "@kovli/schemas";
import { prisma } from "@kovli/db";
import { createClient } from "@/lib/supabase/server";
import { BUCKET_FOTOS_PERROS } from "@/lib/storage";

export type PerroFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const OTRA_RAZA = "otra";

function razaDesdeFormulario(formData: FormData): string {
  const razaSlug = String(formData.get("razaSlug") ?? "");
  if (razaSlug === OTRA_RAZA) {
    return String(formData.get("razaLibre") ?? "").trim();
  }
  return razaSlug;
}

function extensionDeArchivo(nombre: string): string {
  const coincide = /\.([a-zA-Z0-9]{2,5})$/.exec(nombre);
  return coincide ? coincide[1].toLowerCase() : "jpg";
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

async function subirFoto(
  supabase: SupabaseServerClient,
  usuarioId: string,
  foto: File,
): Promise<string> {
  const path = `${usuarioId}/${randomUUID()}.${extensionDeArchivo(foto.name)}`;

  const { error } = await supabase.storage
    .from(BUCKET_FOTOS_PERROS)
    .upload(path, foto, { contentType: foto.type });

  if (error) {
    throw new Error("No se ha podido subir la foto. Inténtalo de nuevo.");
  }

  return path;
}

async function borrarFoto(supabase: SupabaseServerClient, path: string): Promise<void> {
  await supabase.storage.from(BUCKET_FOTOS_PERROS).remove([path]);
}

function datosDelFormulario(formData: FormData) {
  return {
    nombre: formData.get("nombre"),
    raza: razaDesdeFormulario(formData),
    fechaNacimiento: formData.get("fechaNacimiento"),
    sexo: formData.get("sexo"),
    peso: formData.get("peso"),
    notas: formData.get("notas"),
  };
}

async function subirFotoSiHay(
  supabase: SupabaseServerClient,
  usuarioId: string,
  formData: FormData,
): Promise<{ fotoPath?: string; error?: string }> {
  const foto = formData.get("foto");
  if (!(foto instanceof File) || foto.size === 0) {
    return {};
  }

  if (!foto.type.startsWith("image/")) {
    return { error: "El archivo debe ser una imagen." };
  }

  try {
    return { fotoPath: await subirFoto(supabase, usuarioId, foto) };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "No se ha podido subir la foto.",
    };
  }
}

export async function crearPerroAction(
  _prevState: PerroFormState,
  formData: FormData,
): Promise<PerroFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const parsed = perroSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { fotoPath, error: errorFoto } = await subirFotoSiHay(supabase, user.id, formData);
  if (errorFoto) {
    return { success: false, message: errorFoto };
  }

  const perro = await prisma.perro.create({
    data: {
      usuarioId: user.id,
      nombre: parsed.data.nombre,
      raza: parsed.data.raza,
      fechaNacimiento: parsed.data.fechaNacimiento,
      sexo: parsed.data.sexo,
      peso: parsed.data.peso,
      notas: parsed.data.notas,
      fotoPath,
    },
  });

  redirect(`/cuenta/perros/${perro.id}`);
}

export async function actualizarPerroAction(
  id: string,
  _prevState: PerroFormState,
  formData: FormData,
): Promise<PerroFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const perroExistente = await prisma.perro.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!perroExistente) {
    return { success: false, message: "No se ha encontrado el perro." };
  }

  const parsed = perroSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { fotoPath: fotoNueva, error: errorFoto } = await subirFotoSiHay(
    supabase,
    user.id,
    formData,
  );
  if (errorFoto) {
    return { success: false, message: errorFoto };
  }

  if (fotoNueva && perroExistente.fotoPath) {
    await borrarFoto(supabase, perroExistente.fotoPath);
  }

  await prisma.perro.update({
    where: { id },
    data: {
      nombre: parsed.data.nombre,
      raza: parsed.data.raza,
      fechaNacimiento: parsed.data.fechaNacimiento ?? null,
      sexo: parsed.data.sexo ?? null,
      peso: parsed.data.peso ?? null,
      notas: parsed.data.notas ?? null,
      fotoPath: fotoNueva ?? perroExistente.fotoPath,
    },
  });

  redirect(`/cuenta/perros/${id}`);
}

export async function borrarPerroAction(id: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const perro = await prisma.perro.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!perro) redirect("/cuenta");

  if (perro.fotoPath) {
    await borrarFoto(supabase, perro.fotoPath);
  }

  await prisma.perro.delete({ where: { id } });

  redirect("/cuenta");
}
