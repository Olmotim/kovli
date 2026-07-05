"use client";

import { useMemo, useState } from "react";
import BreedCard from "@/components/razas/BreedCard";
import type { AptoPrimerizos, Breed, Energia, Tamano } from "@/data/breeds";

type BreedsExplorerProps = {
    breeds: Breed[];
};

const TAMANOS: Tamano[] = ["pequeño", "mediano", "grande"];
const ENERGIAS: Energia[] = ["bajo", "medio", "alto"];
const APTO_PRIMERIZOS: AptoPrimerizos[] = ["sí", "según el caso", "requiere experiencia"];

function normalizar(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

type Filtros = {
    query: string;
    tamanos: Tamano[];
    energias: Energia[];
    aptoPrimerizos: AptoPrimerizos[];
};

function matchesBreed(breed: Breed, filtros: Filtros): boolean {
    if (filtros.query !== "" && !normalizar(breed.nombre).includes(normalizar(filtros.query))) {
        return false;
    }
    if (filtros.tamanos.length > 0 && !filtros.tamanos.includes(breed.tamano)) {
        return false;
    }
    if (filtros.energias.length > 0 && !filtros.energias.includes(breed.energia)) {
        return false;
    }
    if (
        filtros.aptoPrimerizos.length > 0 &&
        !filtros.aptoPrimerizos.includes(breed.aptoPrimerizos)
    ) {
        return false;
    }
    return true;
}

function toggleValor<T>(lista: T[], valor: T): T[] {
    return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];
}

export default function BreedsExplorer({ breeds }: BreedsExplorerProps) {
    const [query, setQuery] = useState("");
    const [tamanos, setTamanos] = useState<Tamano[]>([]);
    const [energias, setEnergias] = useState<Energia[]>([]);
    const [aptoPrimerizos, setAptoPrimerizos] = useState<AptoPrimerizos[]>([]);

    const filtradas = useMemo(
        () => breeds.filter((breed) => matchesBreed(breed, { query, tamanos, energias, aptoPrimerizos })),
        [breeds, query, tamanos, energias, aptoPrimerizos],
    );

    const hayFiltrosActivos =
        query !== "" || tamanos.length > 0 || energias.length > 0 || aptoPrimerizos.length > 0;

    function limpiarFiltros() {
        setQuery("");
        setTamanos([]);
        setEnergias([]);
        setAptoPrimerizos([]);
    }

    return (
        <div>
            <div className="mt-10 flex flex-col gap-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar raza por nombre..."
                    className="w-full max-w-sm rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate placeholder:text-chocolate/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                />

                <div className="flex flex-wrap gap-6">
                    <FilterGroup
                        label="Tamaño"
                        options={TAMANOS}
                        selected={tamanos}
                        onToggle={(valor) => setTamanos((prev) => toggleValor(prev, valor))}
                    />
                    <FilterGroup
                        label="Energía"
                        options={ENERGIAS}
                        selected={energias}
                        onToggle={(valor) => setEnergias((prev) => toggleValor(prev, valor))}
                    />
                    <FilterGroup
                        label="Apto primerizos"
                        options={APTO_PRIMERIZOS}
                        selected={aptoPrimerizos}
                        onToggle={(valor) => setAptoPrimerizos((prev) => toggleValor(prev, valor))}
                    />
                </div>

                {hayFiltrosActivos && (
                    <button
                        type="button"
                        onClick={limpiarFiltros}
                        className="self-start text-sm font-semibold text-cafe hover:text-apricot transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {filtradas.length > 0 ? (
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtradas.map((breed) => (
                        <BreedCard key={breed.slug} breed={breed} />
                    ))}
                </div>
            ) : (
                <p className="mt-12 text-chocolate/80">
                    Ninguna raza coincide con la búsqueda o los filtros aplicados.
                </p>
            )}
        </div>
    );
}

type FilterGroupProps<T extends string> = {
    label: string;
    options: T[];
    selected: T[];
    onToggle: (valor: T) => void;
};

function FilterGroup<T extends string>({ label, options, selected, onToggle }: FilterGroupProps<T>) {
    return (
        <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-wide text-chocolate/70">
                {label}
            </span>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const activo = selected.includes(option);
                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onToggle(option)}
                            aria-pressed={activo}
                            className={`rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate ${
                                activo
                                    ? "bg-apricot text-crema"
                                    : "bg-beige text-chocolate hover:bg-apricot/40"
                            }`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
