// user_metadata de Supabase Auth llega tipado como Record<string, unknown> por
// naturaleza (nadie más que nosotros mismos garantiza su forma) — se
// comprueba el tipo de cada campo en vez de asumirlo con "as", evitando
// un "any" implícito.
export type MetadataPerfil = {
    nombre?: string;
    avatarPath?: string;
};

export function metadataPerfil(userMetadata: Record<string, unknown>): MetadataPerfil {
    const { nombre, avatarPath } = userMetadata;
    return {
        nombre: typeof nombre === "string" ? nombre : undefined,
        avatarPath: typeof avatarPath === "string" ? avatarPath : undefined,
    };
}
