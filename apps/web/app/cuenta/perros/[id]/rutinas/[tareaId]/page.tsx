import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import BotonBorrarTarea from "@/components/tareas/BotonBorrarTarea";
import TareaForm from "@/components/tareas/TareaForm";
import { actualizarTareaAction, borrarTareaAction } from "@/lib/actions/tareas";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Editar rutina | Kovli",
};

type PageProps = {
    params: Promise<{ id: string; tareaId: string }>;
};

export default async function EditarTareaPage({ params }: PageProps) {
    const { id, tareaId } = await params;

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const tarea = await prisma.tarea.findFirst({
        where: { id: tareaId, perroId: id, usuarioId: user.id },
    });

    if (!tarea) {
        notFound();
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Editar rutina</h1>
                <TareaForm
                    accion={actualizarTareaAction.bind(null, tarea.id)}
                    textoBoton="Guardar cambios"
                    nombreActual={tarea.nombre}
                />

                <div className="mt-8 border-t border-chocolate/15 pt-6">
                    <BotonBorrarTarea accion={borrarTareaAction.bind(null, tarea.id)} />
                </div>
            </div>
        </section>
    );
}
