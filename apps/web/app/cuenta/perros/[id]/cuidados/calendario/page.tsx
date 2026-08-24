import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import { diasDelMes } from "@kovli/domain";
import { etiquetaTipoCuidado } from "@/lib/cuidados";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Calendario de cuidados | Kovli",
};

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ mes?: string }>;
};

const NOMBRES_MES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// El mes en la URL (?mes=YYYY-MM) es humano (1 = enero), pero diasDelMes()
// espera el mes 0-indexado de Date — se convierte aquí, en el único sitio
// donde la página habla con el mundo exterior.
function parseMes(mes: string | undefined): { anio: number; mes: number } {
    const hoy = new Date();

    if (mes) {
        const coincide = /^(\d{4})-(\d{2})$/.exec(mes);
        const mesHumano = coincide ? Number(coincide[2]) : NaN;
        if (coincide && mesHumano >= 1 && mesHumano <= 12) {
            return { anio: Number(coincide[1]), mes: mesHumano - 1 };
        }
    }

    return { anio: hoy.getFullYear(), mes: hoy.getMonth() };
}

function formatoMes(anio: number, mes: number): string {
    return `${anio}-${String(mes + 1).padStart(2, "0")}`;
}

function mesAdyacente(anio: number, mes: number, delta: number): { anio: number; mes: number } {
    const total = anio * 12 + mes + delta;
    return { anio: Math.floor(total / 12), mes: ((total % 12) + 12) % 12 };
}

export default async function CalendarioCuidadosPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { mes: mesParam } = await searchParams;

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

    const { anio, mes } = parseMes(mesParam);
    const dias = diasDelMes(anio, mes);
    const primerDia = dias[0];
    const undiaDespuesDelUltimo = new Date(dias[dias.length - 1]);
    undiaDespuesDelUltimo.setDate(undiaDespuesDelUltimo.getDate() + 1);

    const cuidados = await prisma.cuidado.findMany({
        where: { perroId: perro.id, fecha: { gte: primerDia, lt: undiaDespuesDelUltimo } },
        orderBy: { fecha: "asc" },
    });

    const cuidadosPorDia = new Map<string, typeof cuidados>();
    for (const cuidado of cuidados) {
        const clave = cuidado.fecha.toDateString();
        const lista = cuidadosPorDia.get(clave) ?? [];
        lista.push(cuidado);
        cuidadosPorDia.set(clave, lista);
    }

    const anterior = mesAdyacente(anio, mes, -1);
    const siguiente = mesAdyacente(anio, mes, 1);

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Calendario de cuidados</h1>
                    <Link
                        href={`/cuenta/perros/${perro.id}`}
                        className="whitespace-nowrap text-sm font-semibold text-cafe hover:text-apricot"
                    >
                        Ver como lista
                    </Link>
                </div>
                <p className="mt-2 text-chocolate/70">{perro.nombre}</p>

                <div className="mt-8 flex items-center justify-between gap-4">
                    <Link
                        href={`?mes=${formatoMes(anterior.anio, anterior.mes)}`}
                        className="text-sm font-semibold text-cafe hover:text-apricot"
                    >
                        ← Mes anterior
                    </Link>
                    <p className="font-semibold text-chocolate">
                        {NOMBRES_MES[mes]} de {anio}
                    </p>
                    <Link
                        href={`?mes=${formatoMes(siguiente.anio, siguiente.mes)}`}
                        className="text-sm font-semibold text-cafe hover:text-apricot"
                    >
                        Mes siguiente →
                    </Link>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-px overflow-hidden rounded-sm border border-chocolate/15 bg-chocolate/15 text-sm">
                    {DIAS_SEMANA.map((diaSemana) => (
                        <div key={diaSemana} className="bg-crema px-2 py-1 text-center font-semibold text-chocolate/70">
                            {diaSemana}
                        </div>
                    ))}

                    {dias.map((dia) => {
                        const enMesActual = dia.getMonth() === mes;
                        const cuidadosDelDia = cuidadosPorDia.get(dia.toDateString()) ?? [];

                        return (
                            <div
                                key={dia.toISOString()}
                                className={`min-h-24 bg-crema px-1.5 py-1 ${enMesActual ? "" : "opacity-40"}`}
                            >
                                <p className="text-xs text-chocolate/60">{dia.getDate()}</p>
                                <ul className="mt-1 flex flex-col gap-0.5">
                                    {cuidadosDelDia.map((cuidado) => (
                                        <li key={cuidado.id}>
                                            <Link
                                                href={`/cuenta/perros/${perro.id}/cuidados/${cuidado.id}`}
                                                className="block truncate rounded-sm bg-apricot/20 px-1 text-xs text-chocolate hover:bg-apricot/40"
                                            >
                                                {etiquetaTipoCuidado(cuidado)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
