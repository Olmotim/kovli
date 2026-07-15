import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import BotonBorrarEntrada from "@/components/diario/BotonBorrarEntrada";
import EntradaDiarioForm from "@/components/diario/EntradaDiarioForm";
import { actualizarEntradaAction, borrarEntradaAction } from "@/lib/actions/diario";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Editar entrada | Kovli",
};

type PageProps = {
    params: Promise<{ id: string; entradaId: string }>;
};

export default async function EditarEntradaPage({ params }: PageProps) {
    const { id, entradaId } = await params;

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const entrada = await prisma.entradaDiario.findFirst({
        where: { id: entradaId, perroId: id, usuarioId: user.id },
    });

    if (!entrada) {
        notFound();
    }

    const valoresIniciales = {
        fecha: entrada.fecha.toISOString().split("T")[0],
        texto: entrada.texto ?? "",
        fotos: entrada.fotos,
    };

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Editar entrada</h1>
                <EntradaDiarioForm
                    accion={actualizarEntradaAction.bind(null, entrada.id)}
                    textoBoton="Guardar cambios"
                    valoresIniciales={valoresIniciales}
                />

                <div className="mt-8 border-t border-chocolate/15 pt-6">
                    <BotonBorrarEntrada accion={borrarEntradaAction.bind(null, entrada.id)} />
                </div>
            </div>
        </section>
    );
}
