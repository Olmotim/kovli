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

export { BUCKET_FOTOS_PERROS };
