import type { Metadata } from "next";
import PerroForm from "@/components/perros/PerroForm";
import { crearPerroAction } from "@/lib/actions/perros";

export const metadata: Metadata = {
    title: "Añadir perro | Kovli",
};

export default function NuevoPerroPage() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Añadir perro</h1>
                <PerroForm accion={crearPerroAction} textoBoton="Guardar" />
            </div>
        </section>
    );
}
