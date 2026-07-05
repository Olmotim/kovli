import type { Metadata } from "next";
import { breeds } from "@/data/breeds";
import BreedsExplorer from "@/components/razas/BreedsExplorer";

export const metadata: Metadata = {
    title: "Razas de perros | Kovli",
    description: "Características, temperamento y cuidados de las razas de perro más populares.",
};

export default function RazasPage() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
                <a
                    href="/"
                    className="text-cafe text-sm font-semibold hover:text-apricot transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                >
                    ← Volver a inicio
                </a>

                <span className="inline-block bg-beige text-chocolate text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mt-6 mb-4">
                    Elige por raza
                </span>
                <h1 className="text-chocolate text-4xl lg:text-4xl font-bold">Razas de perros</h1>
                <p className="text-chocolate/80 text-lg mt-3 max-w-xl">
                    Tamaño, energía y cuidados de las razas más comunes, para entender qué necesita cada una.
                </p>

                <BreedsExplorer breeds={breeds} />
            </div>
        </section>
    );
}
