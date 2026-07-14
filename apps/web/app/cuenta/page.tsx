import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@kovli/db";
import { calcularEdadEnAnios, proximoCuidado } from "@kovli/domain";
import { breeds } from "@/data/breeds";
import { cerrarSesionAction } from "@/lib/actions/auth";
import { resumenProximoCuidado } from "@/lib/cuidados";
import { urlFotoPerro } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Tu cuenta | Kovli",
};

function nombreRaza(raza: string): string {
    return breeds.find((breed) => breed.slug === raza)?.nombre ?? raza;
}

export default async function CuentaPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const perros = await prisma.perro.findMany({
        where: { usuarioId: user.id },
        orderBy: { createdAt: "asc" },
        include: { cuidados: true },
    });

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-2xl mx-auto px-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Tu cuenta</h1>
                        <p className="mt-2 text-chocolate/80">
                            Sesión iniciada como <strong className="text-chocolate">{user.email}</strong>
                        </p>
                    </div>
                    <form action={cerrarSesionAction}>
                        <button type="submit" className="text-sm font-semibold text-cafe hover:text-apricot">
                            Cerrar sesión
                        </button>
                    </form>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-chocolate">Tus perros</h2>
                    <Link
                        href="/cuenta/perros/nuevo"
                        className="bg-chocolate text-crema text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot"
                    >
                        Añadir perro
                    </Link>
                </div>

                {perros.length === 0 ? (
                    <p className="mt-6 text-chocolate/70">Todavía no has añadido ningún perro.</p>
                ) : (
                    <ul className="mt-6 flex flex-col gap-3">
                        {perros.map((perro) => {
                            const edad = calcularEdadEnAnios(perro.fechaNacimiento);
                            const cuidado = proximoCuidado(perro.cuidados);

                            return (
                                <li key={perro.id}>
                                    <Link
                                        href={`/cuenta/perros/${perro.id}`}
                                        className="flex items-center gap-4 rounded-sm border border-chocolate/15 bg-crema px-4 py-3 hover:border-chocolate/40 transition-colors duration-200"
                                    >
                                        {perro.fotoPath ? (
                                            <Image
                                                src={urlFotoPerro(perro.fotoPath)}
                                                alt=""
                                                width={56}
                                                height={56}
                                                className="h-14 w-14 rounded-sm object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="h-14 w-14 rounded-sm bg-chocolate/10"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <div>
                                            <p className="font-semibold text-chocolate">{perro.nombre}</p>
                                            <p className="text-sm text-chocolate/70">
                                                {nombreRaza(perro.raza)} ·{" "}
                                                {edad !== null ? `${edad} ${edad === 1 ? "año" : "años"}` : "edad desconocida"}
                                            </p>
                                            {cuidado && (
                                                <p className="text-sm text-chocolate/80">
                                                    {resumenProximoCuidado(cuidado)}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}
