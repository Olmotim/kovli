import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import { calcularEdadEnAnios } from "@kovli/domain";
import BotonBorrar from "@/components/perros/BotonBorrar";
import PerroForm from "@/components/perros/PerroForm";
import { actualizarPerroAction, borrarPerroAction } from "@/lib/actions/perros";
import { urlFotoPerro } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Ficha del perro | Kovli",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function FichaPerroPage({ params }: PageProps) {
    const { id } = await params;

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // findFirst con usuarioId, no solo el id: sin esto, cambiar el id en la
    // URL a mano daría acceso a la ficha de otro usuario.
    const perro = await prisma.perro.findFirst({
        where: { id, usuarioId: user.id },
    });

    if (!perro) {
        notFound();
    }

    const edad = calcularEdadEnAnios(perro.fechaNacimiento);

    const valoresIniciales = {
        nombre: perro.nombre,
        raza: perro.raza,
        fechaNacimiento: perro.fechaNacimiento
            ? perro.fechaNacimiento.toISOString().split("T")[0]
            : "",
        sexo: perro.sexo ?? "",
        peso: perro.peso ? perro.peso.toString() : "",
        notas: perro.notas ?? "",
        fotoUrl: perro.fotoPath ? urlFotoPerro(perro.fotoPath) : "",
    };

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">{perro.nombre}</h1>
                <p className="mt-2 text-chocolate/70">
                    {edad !== null ? `${edad} ${edad === 1 ? "año" : "años"}` : "Edad desconocida"}
                </p>
                <PerroForm
                    accion={actualizarPerroAction.bind(null, perro.id)}
                    textoBoton="Guardar cambios"
                    valoresIniciales={valoresIniciales}
                />

                <div className="mt-8 border-t border-chocolate/15 pt-6">
                    <BotonBorrar accion={borrarPerroAction.bind(null, perro.id)} />
                </div>
            </div>
        </section>
    );
}
