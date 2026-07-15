import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import EntradaDiarioForm from "@/components/diario/EntradaDiarioForm";
import { crearEntradaAction } from "@/lib/actions/diario";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Añadir entrada | Kovli",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function NuevaEntradaPage({ params }: PageProps) {
    const { id } = await params;

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const perro = await prisma.perro.findFirst({
        where: { id, usuarioId: user.id },
    });

    if (!perro) {
        notFound();
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Añadir entrada</h1>
                <p className="mt-2 text-chocolate/70">{perro.nombre}</p>
                <EntradaDiarioForm accion={crearEntradaAction.bind(null, perro.id)} textoBoton="Guardar" />
            </div>
        </section>
    );
}
