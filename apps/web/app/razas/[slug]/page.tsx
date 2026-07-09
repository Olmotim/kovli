import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breeds } from "@/data/breeds";
import FichaRazaHero from "@/components/razas/FichaRazaHero";

type RazaPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return breeds.map((breed) => ({ slug: breed.slug }));
}

export async function generateMetadata({ params }: RazaPageProps): Promise<Metadata> {
    const { slug } = await params;
    const breed = breeds.find((b) => b.slug === slug);

    if (!breed) {
        return { title: "Raza no encontrada | Kovli" };
    }

    return {
        title: `${breed.nombre} | Kovli`,
        description: breed.temperamento,
    };
}

export default async function RazaPage({ params }: RazaPageProps) {
    const { slug } = await params;
    const breed = breeds.find((b) => b.slug === slug);

    if (!breed) {
        notFound();
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
                <Link
                    href="/razas"
                    className="text-cafe text-sm font-semibold hover:text-apricot transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                >
                    ← Volver a razas
                </Link>

                <div className="mt-6">
                    <FichaRazaHero
                        nombre={breed.nombre}
                        fotos={[
                            { url: breed.fotoUrl, alt: breed.fotoAlt },
                            ...(breed.otrasFotos ?? []),
                        ]}
                    />
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    <span className="rounded-full bg-beige px-3 py-1 font-mono text-xs uppercase tracking-wide text-chocolate">
                        Tamaño {breed.tamano}
                    </span>
                    <span className="rounded-full bg-beige px-3 py-1 font-mono text-xs uppercase tracking-wide text-chocolate">
                        Energía {breed.energia}
                    </span>
                    <span className="rounded-full bg-beige px-3 py-1 font-mono text-xs uppercase tracking-wide text-chocolate">
                        Primerizos: {breed.aptoPrimerizos}
                    </span>
                </div>

                {breed.aptoPrimerizos !== "sí" && (
                    <div className="mt-6 rounded-sm border border-apricot/40 bg-beige/60 px-5 py-4">
                        <p className="text-chocolate/90 text-sm">
                            Si es tu primer perro, antes de decidirte por esta raza échale un vistazo a{" "}
                            <Link
                                href="/primeros-pasos"
                                className="font-semibold text-chocolate underline decoration-apricot underline-offset-2 hover:text-apricot"
                            >
                                Primeros pasos
                            </Link>
                            .
                        </p>
                    </div>
                )}

                {breed.introduccion && (
                    <div className="mt-10 columns-1 md:columns-2 md:gap-11 font-serif text-[14.5px] leading-[1.72] text-chocolate/90">
                        {breed.introduccion.map((parrafo, indice) => (
                            <p
                                key={indice}
                                className={`mb-4 break-inside-avoid ${
                                    indice === 0
                                        ? "first-letter:float-left first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.72] first-letter:pr-2 first-letter:pt-1 first-letter:text-apricot"
                                        : ""
                                }`}
                            >
                                {parrafo}
                            </p>
                        ))}
                    </div>
                )}

                <dl className="mt-10 divide-y divide-chocolate/20 border-t border-chocolate/20">
                    <div className="flex gap-7 py-4">
                        <dt className="w-36 shrink-0 font-mono text-xs uppercase tracking-widest text-cafe">Temperamento</dt>
                        <dd className="text-sm text-chocolate/80">{breed.temperamento}</dd>
                    </div>
                    <div className="flex gap-7 py-4">
                        <dt className="w-36 shrink-0 font-mono text-xs uppercase tracking-widest text-cafe">Pelaje y cuidados</dt>
                        <dd className="text-sm text-chocolate/80">{breed.pelaje}</dd>
                    </div>
                    <div className="flex gap-7 py-4">
                        <dt className="w-36 shrink-0 font-mono text-xs uppercase tracking-widest text-cafe">Esperanza de vida</dt>
                        <dd className="text-sm text-chocolate/80">{breed.esperanzaVida}</dd>
                    </div>
                    <div className="flex gap-7 py-4">
                        <dt className="w-36 shrink-0 font-mono text-xs uppercase tracking-widest text-cafe">Notas de salud</dt>
                        <dd className="text-sm text-chocolate/80">{breed.notasSalud}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
