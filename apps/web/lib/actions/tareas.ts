"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { tareaSchema } from "@kovli/schemas";
import { prisma } from "@kovli/db";
import { inicioDelDia } from "@kovli/domain";
import { createClient } from "@/lib/supabase/server";

export type TareaFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

function datosDelFormulario(formData: FormData) {
  return {
    nombre: formData.get("nombre"),
  };
}

export async function crearTareaAction(
  perroId: string,
  _prevState: TareaFormState,
  formData: FormData,
): Promise<TareaFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const perro = await prisma.perro.findFirst({
    where: { id: perroId, usuarioId: user.id },
  });

  if (!perro) {
    return { success: false, message: "No se ha encontrado el perro." };
  }

  const parsed = tareaSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.tarea.create({
    data: {
      usuarioId: user.id,
      perroId: perro.id,
      nombre: parsed.data.nombre,
    },
  });

  redirect(`/cuenta/perros/${perroId}`);
}

export async function actualizarTareaAction(
  id: string,
  _prevState: TareaFormState,
  formData: FormData,
): Promise<TareaFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const tareaExistente = await prisma.tarea.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!tareaExistente) {
    return { success: false, message: "No se ha encontrado la rutina." };
  }

  const parsed = tareaSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.tarea.update({
    where: { id },
    data: { nombre: parsed.data.nombre },
  });

  redirect(`/cuenta/perros/${tareaExistente.perroId}`);
}

export async function borrarTareaAction(id: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const tarea = await prisma.tarea.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!tarea) redirect("/cuenta");

  await prisma.tarea.delete({ where: { id } });

  redirect(`/cuenta/perros/${tarea.perroId}`);
}

export async function marcarTareaAction(tareaId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const tarea = await prisma.tarea.findFirst({
    where: { id: tareaId, usuarioId: user.id },
  });

  if (!tarea) redirect("/cuenta");

  const hoy = inicioDelDia(new Date());

  const completadaHoy = await prisma.tareaCompletada.findUnique({
    where: { tareaId_fecha: { tareaId, fecha: hoy } },
  });

  if (completadaHoy) {
    await prisma.tareaCompletada.delete({ where: { id: completadaHoy.id } });
  } else {
    await prisma.tareaCompletada.create({ data: { tareaId, fecha: hoy } });
  }

  revalidatePath(`/cuenta/perros/${tarea.perroId}`);
}
