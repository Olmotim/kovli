"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { entradaDiarioSchema } from "@kovli/schemas";
import { prisma } from "@kovli/db";
import { createClient } from "@/lib/supabase/server";
import { borrarArchivos, subirArchivos } from "@/lib/storage";

export type EntradaDiarioFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const MAX_FOTOS = 5;

function datosDelFormulario(formData: FormData) {
  return {
    fecha: formData.get("fecha"),
    texto: formData.get("texto"),
    etiquetas: formData.get("etiquetas"),
  };
}

function fotosNuevasDelFormulario(formData: FormData): File[] {
  return formData.getAll("fotos").filter((valor): valor is File => valor instanceof File && valor.size > 0);
}

function todasSonImagenes(fotos: File[]): boolean {
  return fotos.every((foto) => foto.type.startsWith("image/"));
}

export async function crearEntradaAction(
  perroId: string,
  _prevState: EntradaDiarioFormState,
  formData: FormData,
): Promise<EntradaDiarioFormState> {
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

  const parsed = entradaDiarioSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const fotosNuevas = fotosNuevasDelFormulario(formData);

  if (fotosNuevas.length > MAX_FOTOS) {
    return { success: false, message: `Puedes subir como máximo ${MAX_FOTOS} fotos por entrada.` };
  }

  if (!todasSonImagenes(fotosNuevas)) {
    return { success: false, message: "Todos los archivos deben ser imágenes." };
  }

  if (!parsed.data.texto && fotosNuevas.length === 0) {
    return { success: false, message: "La entrada necesita texto o al menos una foto." };
  }

  let fotos: string[];
  try {
    fotos = await subirArchivos(supabase, `${user.id}/diario`, fotosNuevas);
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "No se han podido subir las fotos." };
  }

  await prisma.entradaDiario.create({
    data: {
      usuarioId: user.id,
      perroId: perro.id,
      fecha: parsed.data.fecha,
      texto: parsed.data.texto,
      fotos,
      etiquetas: parsed.data.etiquetas,
    },
  });

  redirect(`/cuenta/perros/${perroId}`);
}

export async function actualizarEntradaAction(
  id: string,
  _prevState: EntradaDiarioFormState,
  formData: FormData,
): Promise<EntradaDiarioFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const entradaExistente = await prisma.entradaDiario.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!entradaExistente) {
    return { success: false, message: "No se ha encontrado la entrada." };
  }

  const parsed = entradaDiarioSchema.safeParse(datosDelFormulario(formData));

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  // Solo se quitan rutas que de verdad pertenecían a esta entrada — un id
  // manipulado a mano en el formulario no permite borrar fotos ajenas.
  const paraQuitar = formData
    .getAll("eliminarFotos")
    .map(String)
    .filter((path) => entradaExistente.fotos.includes(path));
  const fotosRestantes = entradaExistente.fotos.filter((path) => !paraQuitar.includes(path));

  const fotosNuevas = fotosNuevasDelFormulario(formData);

  if (fotosRestantes.length + fotosNuevas.length > MAX_FOTOS) {
    return { success: false, message: `Puedes subir como máximo ${MAX_FOTOS} fotos por entrada.` };
  }

  if (!todasSonImagenes(fotosNuevas)) {
    return { success: false, message: "Todos los archivos deben ser imágenes." };
  }

  if (!parsed.data.texto && fotosRestantes.length === 0 && fotosNuevas.length === 0) {
    return { success: false, message: "La entrada necesita texto o al menos una foto." };
  }

  let fotosSubidas: string[];
  try {
    fotosSubidas = await subirArchivos(supabase, `${user.id}/diario`, fotosNuevas);
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "No se han podido subir las fotos." };
  }

  await prisma.entradaDiario.update({
    where: { id },
    data: {
      fecha: parsed.data.fecha,
      texto: parsed.data.texto ?? null,
      fotos: [...fotosRestantes, ...fotosSubidas],
      etiquetas: parsed.data.etiquetas,
    },
  });

  await borrarArchivos(supabase, paraQuitar);

  redirect(`/cuenta/perros/${entradaExistente.perroId}`);
}

// Reordena una foto ya guardada intercambiándola con su vecina — no pasa
// por el formulario completo, mismo patrón que marcarTareaAction (014) y
// moverTareaAction (019): revalidatePath() en vez de redirect(), porque no
// tiene sentido navegar a ningún sitio para mover una foto un puesto.
export async function moverFotoEntradaAction(
  entradaId: string,
  path: string,
  direccion: "arriba" | "abajo",
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const entrada = await prisma.entradaDiario.findFirst({
    where: { id: entradaId, usuarioId: user.id },
  });

  if (!entrada) redirect("/cuenta");

  const indice = entrada.fotos.indexOf(path);
  const indiceVecino = direccion === "arriba" ? indice - 1 : indice + 1;

  if (indice === -1 || indiceVecino < 0 || indiceVecino >= entrada.fotos.length) {
    // La foto ya no existe, o ya está en el extremo — no hay nada que mover.
    revalidatePath(`/cuenta/perros/${entrada.perroId}/diario/${entradaId}`);
    return;
  }

  const fotos = [...entrada.fotos];
  [fotos[indice], fotos[indiceVecino]] = [fotos[indiceVecino], fotos[indice]];

  await prisma.entradaDiario.update({ where: { id: entradaId }, data: { fotos } });

  revalidatePath(`/cuenta/perros/${entrada.perroId}/diario/${entradaId}`);
}

export async function borrarEntradaAction(id: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const entrada = await prisma.entradaDiario.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!entrada) redirect("/cuenta");

  await borrarArchivos(supabase, entrada.fotos);
  await prisma.entradaDiario.delete({ where: { id } });

  redirect(`/cuenta/perros/${entrada.perroId}`);
}
