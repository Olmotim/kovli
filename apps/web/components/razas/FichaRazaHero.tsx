"use client";
import { useState } from "react";
import Image from "next/image";

type Foto = { url: string; alt: string };

type FichaRazaHeroProps = {
    nombre: string;
    fotos: Foto[];
};

export default function FichaRazaHero({ nombre, fotos }: FichaRazaHeroProps) {
    const [seleccionada, setSeleccionada] = useState(0);
    const fotoActiva = fotos[seleccionada];

    return (
        <div>
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-sm">
                <Image
                    src={fotoActiva.url}
                    alt={fotoActiva.alt}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                    priority
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chocolate/80 to-transparent"
                />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                    <p className="font-serif italic text-apricot text-sm">Ficha de raza</p>
                    <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-[0.95] text-crema mt-1">
                        {nombre}
                    </h1>
                </div>
            </div>

            {fotos.length > 1 && (
                <div className="flex border-b border-chocolate/20">
                    {fotos.map((foto, indice) => (
                        <button
                            key={foto.url}
                            type="button"
                            onClick={() => setSeleccionada(indice)}
                            aria-label={`Ver foto ${indice + 1} de ${fotos.length}`}
                            aria-current={indice === seleccionada}
                            className={`relative h-24 sm:h-28 flex-1 overflow-hidden transition-opacity duration-150 ${
                                indice === seleccionada
                                    ? "opacity-100 border-b-2 border-apricot"
                                    : "opacity-50 hover:opacity-75"
                            }`}
                        >
                            <Image
                                src={foto.url}
                                alt=""
                                fill
                                sizes="200px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
