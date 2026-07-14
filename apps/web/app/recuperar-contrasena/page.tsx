import type { Metadata } from "next";
import RecuperarContrasenaForm from "@/components/auth/RecuperarContrasenaForm";

export const metadata: Metadata = {
    title: "Recuperar contraseña | Kovli",
    description: "Solicita un enlace para restablecer tu contraseña de Kovli.",
};

export default function RecuperarContrasenaPage() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Recuperar contraseña</h1>
                <p className="mt-3 text-chocolate/80">
                    Escribe tu email y te enviaremos un enlace para elegir una contraseña nueva.
                </p>
                <RecuperarContrasenaForm />
            </div>
        </section>
    );
}
