import type { Metadata } from "next";
import RegistroForm from "@/components/auth/RegistroForm";

export const metadata: Metadata = {
    title: "Crea tu cuenta | Kovli",
    description: "Regístrate en Kovli para acceder a tu área privada.",
};

export default function RegistroPage() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Crea tu cuenta</h1>
                <RegistroForm />
            </div>
        </section>
    );
}
