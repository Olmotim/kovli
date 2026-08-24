import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import { urlFoto } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Imprimir diario | Kovli",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ImprimirDiarioPage({ params }: PageProps) {
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

    const entradas = await prisma.entradaDiario.findMany({
        where: { perroId: perro.id },
        orderBy: { fecha: "asc" },
    });

    return (
        <section className="py-16 sm:py-20 print:py-0">
            <div className="max-w-2xl mx-auto px-6 print:max-w-none print:px-0">
                <div className="flex items-center justify-between gap-4 print:hidden">
                    <Link
                        href={`/cuenta/perros/${perro.id}`}
                        className="text-sm font-semibold text-cafe hover:text-apricot"
                    >
                        ← Volver a la ficha
                    </Link>
                    <p className="text-sm text-chocolate/70">
                        Usa &ldquo;Imprimir&rdquo; del navegador (Ctrl/Cmd+P) y elige &ldquo;Guardar como PDF&rdquo;.
                    </p>
                </div>

                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold mt-8 print:mt-0">
                    Diario de {perro.nombre}
                </h1>

                {entradas.length === 0 ? (
                    <p className="mt-6 text-chocolate/70">Todavía no hay entradas en el diario.</p>
                ) : (
                    <ul className="mt-8 flex flex-col gap-8">
                        {entradas.map((entrada) => (
                            <li key={entrada.id} className="border-t border-chocolate/15 pt-6 print:break-inside-avoid">
                                <p className="text-sm font-semibold text-chocolate">
                                    {entrada.fecha.toLocaleDateString("es-ES", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>

                                {entrada.texto && (
                                    <p className="mt-2 whitespace-pre-line text-chocolate/80">{entrada.texto}</p>
                                )}

                                {entrada.etiquetas.length > 0 && (
                                    <p className="mt-2 text-sm text-chocolate/60">
                                        {entrada.etiquetas.join(" · ")}
                                    </p>
                                )}

                                {entrada.fotos.length > 0 && (
                                    // Imágenes normales, no next/image: es una página pensada para
                                    // imprimirse tal cual, sin lazy-loading ni srcset que puedan
                                    // dejarse fotos sin cargar en el PDF resultante.
                                    <div className="mt-3 grid grid-cols-3 gap-2 print:grid-cols-4">
                                        {entrada.fotos.map((path) => (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                key={path}
                                                src={urlFoto(path)}
                                                alt=""
                                                className="h-24 w-full rounded-sm object-cover print:h-32"
                                            />
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
