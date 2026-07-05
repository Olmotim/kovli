import Image from "next/image";
import Link from "next/link";
import type { Breed } from "@/data/breeds";

type BreedCardProps = {
    breed: Breed;
};

export default function BreedCard({ breed }: BreedCardProps) {
    return (
        <Link
            href={`/razas/${breed.slug}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-chocolate/30 bg-crema shadow-sm transition-shadow duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={breed.fotoUrl}
                    alt={breed.fotoAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="font-serif text-xl font-bold text-chocolate group-hover:text-apricot transition-colors duration-200">
                    {breed.nombre}
                </h3>

                <div className="flex flex-wrap gap-2">
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

                <p className="text-sm text-chocolate/80">{breed.temperamento}</p>
            </div>
        </Link>
    );
}
