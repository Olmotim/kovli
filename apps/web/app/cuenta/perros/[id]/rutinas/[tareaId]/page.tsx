import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import BotonBorrarTarea from "@/components/tareas/BotonBorrarTarea";
import TareaForm from "@/components/tareas/TareaForm";
import {
    actualizarTareaAction,
    borrarTareaAction,
    pausarTareaAction,
    reactivarTareaAction,
} from "@/lib/actions/tareas";
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
                {!tarea.activa && (
                    <p className="mt-2 text-sm font-semibold text-apricot">
                        Esta rutina está en pausa: no aparece en el checklist ni en el email de recordatorios.
                    </p>
                )}
                <TareaForm
                    accion={actualizarTareaAction.bind(null, tarea.id)}
                    textoBoton="Guardar cambios"
                    nombreActual={tarea.nombre}
                    diasSemanaActuales={tarea.diasSemana}
                />

                <div className="mt-8 border-t border-chocolate/15 pt-6 flex flex-wrap items-center gap-4">
                    <Link
                        href={`/cuenta/perros/${id}/rutinas/${tarea.id}/historial`}
                        className="text-sm font-semibold text-cafe hover:text-apricot"
                    >
                        Ver historial
                    </Link>
                    <form action={(tarea.activa ? pausarTareaAction : reactivarTareaAction).bind(null, tarea.id)}>
                        <button type="submit" className="text-sm font-semibold text-cafe hover:text-apricot">
                            {tarea.activa ? "Pausar rutina" : "Reactivar rutina"}
                        </button>
                    </form>
                    <BotonBorrarTarea accion={borrarTareaAction.bind(null, tarea.id)} />
                </div>
            </div>
        </section>
    );
}
