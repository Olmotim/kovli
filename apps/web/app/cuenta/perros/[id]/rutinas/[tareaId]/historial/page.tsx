import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import { inicioDelDia } from "@kovli/domain";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Historial de la rutina | Kovli",
};

type PageProps = {
    params: Promise<{ id: string; tareaId: string }>;
};

const DIAS_HISTORIAL = 30;

export default async function HistorialTareaPage({ params }: PageProps) {
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

    const hoy = inicioDelDia(new Date());
    const desde = new Date(hoy);
    desde.setDate(desde.getDate() - (DIAS_HISTORIAL - 1));

    const completadas = await prisma.tareaCompletada.findMany({
        where: { tareaId, fecha: { gte: desde } },
    });
    const fechasHechas = new Set(completadas.map((completada) => completada.fecha.toDateString()));

    // Se generan los 30 días en código (no solo las filas que existen en
    // TareaCompletada), para que los días sin marcar se vean como "no
    // hecho" en vez de estar ausentes de la lista.
    const dias = Array.from({ length: DIAS_HISTORIAL }, (_, indice) => {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - indice);
        return { fecha, hecho: fechasHechas.has(fecha.toDateString()) };
    });

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Historial</h1>
                <p className="mt-2 text-chocolate/70">
                    {tarea.nombre} · últimos {DIAS_HISTORIAL} días
                </p>

                <ul className="mt-8 flex flex-col gap-1">
                    {dias.map(({ fecha, hecho }) => (
                        <li
                            key={fecha.toISOString()}
                            className="flex items-center justify-between gap-4 rounded-sm border border-chocolate/15 bg-crema px-4 py-2"
                        >
                            <span className="text-sm text-chocolate capitalize">
                                {fecha.toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </span>
                            <span
                                className={
                                    hecho
                                        ? "text-sm font-semibold text-chocolate"
                                        : "text-sm text-chocolate/40"
                                }
                            >
                                {hecho ? "Hecho" : "No hecho"}
                            </span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/cuenta/perros/${id}/rutinas/${tarea.id}`}
                    className="mt-8 inline-block text-sm font-semibold text-cafe hover:text-apricot"
                >
                    ← Volver a la rutina
                </Link>
            </div>
        </section>
    );
}
