"use server";

import { redirect } from "next/navigation";
import { cuidadoSchema } from "@kovli/schemas";
import { prisma } from "@kovli/db";
import { createClient } from "@/lib/supabase/server";

export type CuidadoFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

function datosDelFormulario(formData: FormData) {
  return {
    tipo: formData.get("tipo"),
    tipoLibre: formData.get("tipoLibre"),
    fecha: formData.get("fecha"),
    notas: formData.get("notas"),
  };
}

export async function crearCuidadoAction(
  perroId: string,
  _prevState: CuidadoFormState,
  formData: FormData,
): Promise<CuidadoFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Sin esto, cualquiera con sesión iniciada podría colar un perroId ajeno
  // en el formulario y crear cuidados en la ficha de otro usuario.
  const perro = await prisma.perro.findFirst({
    where: { id: perroId, usuarioId: user.id },
  });

  if (!perro) {
    return { success: false, message: "No se ha encontrado el perro." };
  }

  const parsed = cuidadoSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.cuidado.create({
    data: {
      usuarioId: user.id,
      perroId: perro.id,
      tipo: parsed.data.tipo,
      tipoLibre: parsed.data.tipoLibre,
      fecha: parsed.data.fecha,
      notas: parsed.data.notas,
    },
  });

  redirect(`/cuenta/perros/${perroId}`);
}

export async function actualizarCuidadoAction(
  id: string,
  _prevState: CuidadoFormState,
  formData: FormData,
): Promise<CuidadoFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const cuidadoExistente = await prisma.cuidado.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!cuidadoExistente) {
    return { success: false, message: "No se ha encontrado el cuidado." };
  }

  const parsed = cuidadoSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.cuidado.update({
    where: { id },
    data: {
      tipo: parsed.data.tipo,
      tipoLibre: parsed.data.tipoLibre ?? null,
      fecha: parsed.data.fecha,
      notas: parsed.data.notas ?? null,
    },
  });

  redirect(`/cuenta/perros/${cuidadoExistente.perroId}`);
}

export async function borrarCuidadoAction(id: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const cuidado = await prisma.cuidado.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!cuidado) redirect("/cuenta");

  await prisma.cuidado.delete({ where: { id } });

  redirect(`/cuenta/perros/${cuidado.perroId}`);
}
