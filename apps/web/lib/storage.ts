const BUCKET_FOTOS_PERROS = "fotos-perros";

// El bucket es público: la URL se puede construir sin llamar a Supabase
// (getPublicUrl es solo una concatenación de strings, pero esto evita
// tener que crear un cliente solo para eso).
export function urlFotoPerro(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_FOTOS_PERROS}/${path}`;
}

export { BUCKET_FOTOS_PERROS };
