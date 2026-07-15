import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { metadataPerfil } from "@/lib/perfil";
import { urlFoto } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";
import PerfilForm from "@/components/perfil/PerfilForm";
import CambiarContrasenaForm from "@/components/perfil/CambiarContrasenaForm";

export const metadata: Metadata = {
    title: "Tu perfil | Kovli",
};

export default async function PerfilPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { nombre, avatarPath } = metadataPerfil(user.user_metadata);

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <Link href="/cuenta" className="text-sm font-semibold text-cafe hover:text-apricot">
                    ← Volver a tu cuenta
                </Link>

                <h1 className="mt-4 text-chocolate text-3xl sm:text-4xl font-bold">Tu perfil</h1>

                <h2 className="mt-10 text-xl font-bold text-chocolate">Datos del perfil</h2>
                <PerfilForm nombre={nombre} avatarUrl={avatarPath ? urlFoto(avatarPath) : undefined} />

                <h2 className="mt-12 text-xl font-bold text-chocolate">Cambiar contraseña</h2>
                <CambiarContrasenaForm />
            </div>
        </section>
    );
}
