"use server";

import { redirect } from "next/navigation";
import { cuidadoSchema } from "@kovli/schemas";
import { prisma } from "@kovli/db";
import { createClient } from "@/lib/supabase/server";
import { borrarArchivos, subirArchivos } from "@/lib/storage";

export type CuidadoFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const MAX_ARCHIVOS = 5;

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

function datosDelFormulario(formData: FormData) {
  return {
    tipo: formData.get("tipo"),
    tipoLibre: formData.get("tipoLibre"),
    fecha: formData.get("fecha"),
    notas: formData.get("notas"),
    repiteCadaMeses: formData.get("repiteCadaMeses"),
  };
}

function archivosNuevosDelFormulario(formData: FormData): File[] {
  return formData.getAll("archivos").filter((valor): valor is File => valor instanceof File && valor.size > 0);
}

function todosSonImagenOPdf(archivos: File[]): boolean {
  return archivos.every((archivo) => archivo.type.startsWith("image/") || archivo.type === "application/pdf");
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

  const archivosNuevos = archivosNuevosDelFormulario(formData);

  if (archivosNuevos.length > MAX_ARCHIVOS) {
    return { success: false, message: `Puedes adjuntar como máximo ${MAX_ARCHIVOS} archivos.` };
  }

  if (!todosSonImagenOPdf(archivosNuevos)) {
    return { success: false, message: "Los archivos adjuntos deben ser imágenes o PDF." };
  }

  // Solo se aceptan ids que de verdad son perros del usuario — un id
  // manipulado a mano en el formulario no permite crear cuidados en la
  // ficha de otro usuario.
  const idsAdicionales = formData.getAll("perrosAdicionales").map(String);
  const perrosAdicionales =
    idsAdicionales.length > 0
      ? await prisma.perro.findMany({
          where: { id: { in: idsAdicionales }, usuarioId: user.id },
        })
      : [];

  try {
    await crearCuidadoParaPerro(supabase, user.id, perro.id, parsed.data, archivosNuevos);

    for (const perroAdicional of perrosAdicionales) {
      await crearCuidadoParaPerro(supabase, user.id, perroAdicional.id, parsed.data, archivosNuevos);
    }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "No se ha podido crear el cuidado." };
  }

  redirect(`/cuenta/perros/${perroId}`);
}

// Cada perro marcado en "aplicar también a" recibe su propia fila de
// Cuidado (mismos datos), no una fila compartida — así editar o borrar el
// cuidado de un perro no afecta a los demás. Los archivos se vuelven a
// subir por cada perro (en vez de reutilizar la misma ruta de Storage en
// varias filas) para que borrar el cuidado de un perro no borre también
// el archivo adjunto del cuidado de otro perro.
async function crearCuidadoParaPerro(
  supabase: SupabaseServerClient,
  usuarioId: string,
  perroId: string,
  datos: { tipo: "VACUNA" | "DESPARASITACION" | "REVISION" | "OTRO"; tipoLibre?: string; fecha: Date; notas?: string; repiteCadaMeses?: number },
  archivosNuevos: File[],
): Promise<void> {
  const archivos =
    archivosNuevos.length > 0 ? await subirArchivos(supabase, `${usuarioId}/cuidados`, archivosNuevos) : [];

  await prisma.cuidado.create({
    data: {
      usuarioId,
      perroId,
      tipo: datos.tipo,
      tipoLibre: datos.tipoLibre,
      fecha: datos.fecha,
      notas: datos.notas,
      repiteCadaMeses: datos.repiteCadaMeses ?? null,
      archivos,
    },
  });
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

  // Solo se quitan rutas que de verdad pertenecían a este cuidado — un id
  // manipulado a mano en el formulario no permite borrar archivos ajenos.
  const paraQuitar = formData
    .getAll("eliminarArchivos")
    .map(String)
    .filter((path) => cuidadoExistente.archivos.includes(path));
  const archivosRestantes = cuidadoExistente.archivos.filter((path) => !paraQuitar.includes(path));

  const archivosNuevos = archivosNuevosDelFormulario(formData);

  if (archivosRestantes.length + archivosNuevos.length > MAX_ARCHIVOS) {
    return { success: false, message: `Puedes adjuntar como máximo ${MAX_ARCHIVOS} archivos.` };
  }

  if (!todosSonImagenOPdf(archivosNuevos)) {
    return { success: false, message: "Los archivos adjuntos deben ser imágenes o PDF." };
  }

  let archivosSubidos: string[];
  try {
    archivosSubidos =
      archivosNuevos.length > 0 ? await subirArchivos(supabase, `${user.id}/cuidados`, archivosNuevos) : [];
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "No se han podido subir los archivos." };
  }

  await prisma.cuidado.update({
    where: { id },
    data: {
      tipo: parsed.data.tipo,
      tipoLibre: parsed.data.tipoLibre ?? null,
      fecha: parsed.data.fecha,
      notas: parsed.data.notas ?? null,
      repiteCadaMeses: parsed.data.repiteCadaMeses ?? null,
      archivos: [...archivosRestantes, ...archivosSubidos],
    },
  });

  await borrarArchivos(supabase, paraQuitar);

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

  await borrarArchivos(supabase, cuidado.archivos);
  await prisma.cuidado.delete({ where: { id } });

  redirect(`/cuenta/perros/${cuidado.perroId}`);
}
