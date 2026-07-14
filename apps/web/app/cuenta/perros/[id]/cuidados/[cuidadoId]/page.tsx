import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import BotonBorrarCuidado from "@/components/cuidados/BotonBorrarCuidado";
import CuidadoForm from "@/components/cuidados/CuidadoForm";
import { actualizarCuidadoAction, borrarCuidadoAction } from "@/lib/actions/cuidados";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Editar cuidado | Kovli",
};

type PageProps = {
    params: Promise<{ id: string; cuidadoId: string }>;
};

export default async function EditarCuidadoPage({ params }: PageProps) {
    const { id, cuidadoId } = await params;

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Filtra por perroId además de usuarioId: sin esto, cambiar el id del
    // perro en la URL a mano podría "colgar" el cuidado de un perro distinto.
    const cuidado = await prisma.cuidado.findFirst({
        where: { id: cuidadoId, perroId: id, usuarioId: user.id },
    });

    if (!cuidado) {
        notFound();
    }

    const valoresIniciales = {
        tipo: cuidado.tipo,
        tipoLibre: cuidado.tipoLibre ?? "",
        fecha: cuidado.fecha.toISOString().split("T")[0],
        notas: cuidado.notas ?? "",
    };

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Editar cuidado</h1>
                <CuidadoForm
                    accion={actualizarCuidadoAction.bind(null, cuidado.id)}
                    textoBoton="Guardar cambios"
                    valoresIniciales={valoresIniciales}
                />

                <div className="mt-8 border-t border-chocolate/15 pt-6">
                    <BotonBorrarCuidado accion={borrarCuidadoAction.bind(null, cuidado.id)} />
                </div>
            </div>
        </section>
    );
}
