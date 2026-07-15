import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import { calcularEdadEnAnios, inicioDelDia } from "@kovli/domain";
import BotonBorrar from "@/components/perros/BotonBorrar";
import PerroForm from "@/components/perros/PerroForm";
import FilaCuidado from "@/components/cuidados/FilaCuidado";
import CasillaTarea from "@/components/tareas/CasillaTarea";
import FilaEntradaDiario from "@/components/diario/FilaEntradaDiario";
import { actualizarPerroAction, borrarPerroAction } from "@/lib/actions/perros";
import { marcarTareaAction } from "@/lib/actions/tareas";
import { urlFoto } from "@/lib/storage";
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

    const cuidados = await prisma.cuidado.findMany({
        where: { perroId: perro.id },
        orderBy: { fecha: "asc" },
    });

    const hoy = new Date();
    const proximos = cuidados.filter((cuidado) => cuidado.fecha >= hoy);
    const historial = cuidados.filter((cuidado) => cuidado.fecha < hoy).reverse();

    const tareas = await prisma.tarea.findMany({
        where: { perroId: perro.id },
        orderBy: { createdAt: "asc" },
        include: { completadas: { where: { fecha: inicioDelDia(hoy) } } },
    });

    const entradasDiario = await prisma.entradaDiario.findMany({
        where: { perroId: perro.id },
        orderBy: { fecha: "desc" },
    });

    const valoresIniciales = {
        nombre: perro.nombre,
        raza: perro.raza,
        fechaNacimiento: perro.fechaNacimiento
            ? perro.fechaNacimiento.toISOString().split("T")[0]
            : "",
        sexo: perro.sexo ?? "",
        peso: perro.peso ? perro.peso.toString() : "",
        notas: perro.notas ?? "",
        fotoUrl: perro.fotoPath ? urlFoto(perro.fotoPath) : "",
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

                <div className="mt-10 border-t border-chocolate/15 pt-6">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-chocolate">Cuidados</h2>
                        <Link
                            href={`/cuenta/perros/${perro.id}/cuidados/nuevo`}
                            className="bg-chocolate text-crema text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot"
                        >
                            Añadir cuidado
                        </Link>
                    </div>

                    {cuidados.length === 0 ? (
                        <p className="mt-4 text-chocolate/70">Todavía no hay cuidados registrados.</p>
                    ) : (
                        <>
                            {proximos.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-semibold uppercase tracking-wide text-chocolate/70">
                                        Próximos
                                    </h3>
                                    <ul className="mt-2 flex flex-col gap-2">
                                        {proximos.map((cuidado) => (
                                            <FilaCuidado key={cuidado.id} perroId={perro.id} cuidado={cuidado} />
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {historial.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold uppercase tracking-wide text-chocolate/70">
                                        Historial
                                    </h3>
                                    <ul className="mt-2 flex flex-col gap-2">
                                        {historial.map((cuidado) => (
                                            <FilaCuidado key={cuidado.id} perroId={perro.id} cuidado={cuidado} />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="mt-10 border-t border-chocolate/15 pt-6">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-chocolate">Rutinas de hoy</h2>
                        <Link
                            href={`/cuenta/perros/${perro.id}/rutinas/nueva`}
                            className="bg-chocolate text-crema text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot"
                        >
                            Añadir rutina
                        </Link>
                    </div>

                    {tareas.length === 0 ? (
                        <p className="mt-4 text-chocolate/70">Todavía no hay rutinas creadas.</p>
                    ) : (
                        <ul className="mt-4 flex flex-col gap-2">
                            {tareas.map((tarea) => (
                                <li
                                    key={tarea.id}
                                    className="flex items-center justify-between gap-4 rounded-sm border border-chocolate/15 bg-crema px-4 py-3"
                                >
                                    <CasillaTarea
                                        accion={marcarTareaAction.bind(null, tarea.id)}
                                        marcada={tarea.completadas.length > 0}
                                        etiqueta={tarea.nombre}
                                    />
                                    <Link
                                        href={`/cuenta/perros/${perro.id}/rutinas/${tarea.id}`}
                                        className="whitespace-nowrap text-sm text-chocolate/60 hover:text-chocolate"
                                    >
                                        Editar
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-10 border-t border-chocolate/15 pt-6">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-chocolate">Diario</h2>
                        <Link
                            href={`/cuenta/perros/${perro.id}/diario/nueva`}
                            className="bg-chocolate text-crema text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot"
                        >
                            Añadir entrada
                        </Link>
                    </div>

                    {entradasDiario.length === 0 ? (
                        <p className="mt-4 text-chocolate/70">Todavía no hay entradas en el diario.</p>
                    ) : (
                        <ul className="mt-4 flex flex-col gap-3">
                            {entradasDiario.map((entrada) => (
                                <FilaEntradaDiario key={entrada.id} perroId={perro.id} entrada={entrada} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
