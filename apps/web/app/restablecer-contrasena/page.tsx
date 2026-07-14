import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import RestablecerContrasenaForm from "@/components/auth/RestablecerContrasenaForm";

export const metadata: Metadata = {
    title: "Elige una nueva contraseña | Kovli",
    description: "Establece una nueva contraseña para tu cuenta de Kovli.",
};

export default async function RestablecerContrasenaPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <section className="py-16 sm:py-20">
                <div className="max-w-md mx-auto px-6 text-center">
                    <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Enlace no válido</h1>
                    <p className="mt-4 text-chocolate/80">
                        Este enlace de recuperación no es válido o ha caducado.{" "}
                        <Link href="/recuperar-contrasena" className="font-semibold text-cafe hover:text-apricot">
                            Solicita uno nuevo
                        </Link>
                        .
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Elige una nueva contraseña</h1>
                <RestablecerContrasenaForm />
            </div>
        </section>
    );
}
