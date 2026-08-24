import { randomUUID } from "node:crypto";
import type { createClient } from "@/lib/supabase/server";

const BUCKET_FOTOS_PERROS = "fotos-perros";

// El bucket es público: la URL se puede construir sin llamar a Supabase
// (getPublicUrl es solo una concatenación de strings, pero esto evita
// tener que crear un cliente solo para eso). Sirve tanto para la foto de
// perfil del perro como para las fotos del diario (misma bucket, distinta
// subcarpeta dentro de cada usuario).
export function urlFoto(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_FOTOS_PERROS}/${path}`;
}

export function extensionDeArchivo(nombre: string): string {
  const coincide = /\.([a-zA-Z0-9]{2,5})$/.exec(nombre);
  return coincide ? coincide[1].toLowerCase() : "jpg";
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

// Genéricas (feature 018): antes vivían en lib/actions/diario.ts como
// subirFotos/borrarFotos, específicas de las fotos del diario. Se mueven
// aquí y se generalizan (reciben la carpeta ya armada, en vez de asumir
// "usuarioId/diario") para que los cuidados (que también aceptan PDF, no
// solo imágenes) puedan reutilizarlas sin duplicar la lógica de subida.
export async function subirArchivos(
  supabase: SupabaseServerClient,
  carpeta: string,
  archivos: File[],
): Promise<string[]> {
  const rutas: string[] = [];

  for (const archivo of archivos) {
    const path = `${carpeta}/${randomUUID()}.${extensionDeArchivo(archivo.name)}`;
    const { error } = await supabase.storage.from(BUCKET_FOTOS_PERROS).upload(path, archivo, {
      contentType: archivo.type,
    });

    if (error) {
      throw new Error("No se han podido subir los archivos. Inténtalo de nuevo.");
    }

    rutas.push(path);
  }

  return rutas;
}

export async function borrarArchivos(supabase: SupabaseServerClient, paths: string[]): Promise<void> {
  if (paths.length === 0) return;
  await supabase.storage.from(BUCKET_FOTOS_PERROS).remove(paths);
}

export { BUCKET_FOTOS_PERROS };
