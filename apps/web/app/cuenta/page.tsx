import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cerrarSesionAction } from "@/lib/actions/auth";

export const metadata: Metadata = {
    title: "Tu cuenta | Kovli",
};

export default async function CuentaPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6 text-center">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Tu cuenta</h1>
                <p className="mt-4 text-chocolate/80">
                    Sesión iniciada como <strong className="text-chocolate">{user.email}</strong>
                </p>

                <form action={cerrarSesionAction} className="mt-8">
                    <button
                        type="submit"
                        className="bg-chocolate text-crema text-sm font-semibold px-6 py-3 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot"
                    >
                        Cerrar sesión
                    </button>
                </form>
            </div>
        </section>
    );
}
