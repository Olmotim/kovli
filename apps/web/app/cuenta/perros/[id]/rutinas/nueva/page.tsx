import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import TareaForm from "@/components/tareas/TareaForm";
import { crearTareaAction } from "@/lib/actions/tareas";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Añadir rutina | Kovli",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function NuevaTareaPage({ params }: PageProps) {
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
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Añadir rutina</h1>
                <p className="mt-2 text-chocolate/70">{perro.nombre}</p>
                <TareaForm accion={crearTareaAction.bind(null, perro.id)} textoBoton="Guardar" />
            </div>
        </section>
    );
}
