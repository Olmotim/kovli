import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breeds } from "@/data/breeds";

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

                <div className="relative h-64 sm:h-80 w-full mt-6 overflow-hidden rounded-sm">
                    <Image
                        src={breed.fotoUrl}
                        alt={breed.fotoAlt}
                        fill
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="object-cover"
                        priority
                    />
                </div>

                <h1 className="font-serif text-4xl font-bold text-chocolate mt-6">{breed.nombre}</h1>

                <div className="flex flex-wrap gap-2 mt-4">
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

                <dl className="mt-10 space-y-8">
                    <div>
                        <dt className="font-mono text-xs uppercase tracking-widest text-cafe">Temperamento</dt>
                        <dd className="text-chocolate/80 mt-1">{breed.temperamento}</dd>
                    </div>
                    <div>
                        <dt className="font-mono text-xs uppercase tracking-widest text-cafe">Pelaje y cuidados</dt>
                        <dd className="text-chocolate/80 mt-1">{breed.pelaje}</dd>
                    </div>
                    <div>
                        <dt className="font-mono text-xs uppercase tracking-widest text-cafe">Esperanza de vida</dt>
                        <dd className="text-chocolate/80 mt-1">{breed.esperanzaVida}</dd>
                    </div>
                    <div>
                        <dt className="font-mono text-xs uppercase tracking-widest text-cafe">Notas de salud</dt>
                        <dd className="text-chocolate/80 mt-1">{breed.notasSalud}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
