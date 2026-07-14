"use client";

import { useState } from "react";
import { breeds } from "@/data/breeds";

const OTRA_RAZA = "otra";

type SelectorRazaProps = {
    // Valor guardado del perro: un slug del catálogo, o texto libre si en su
    // día se eligió "otra raza". undefined cuando es un perro nuevo.
    razaActual?: string;
    errores?: string[];
};

export default function SelectorRaza({ razaActual, errores }: SelectorRazaProps) {
    const coincideConCatalogo = breeds.some((breed) => breed.slug === razaActual);
    const valorInicialSelect = !razaActual ? "" : coincideConCatalogo ? razaActual : OTRA_RAZA;

    const [seleccion, setSeleccion] = useState(valorInicialSelect);
    const tieneError = Boolean(errores && errores.length > 0);

    return (
        <div>
            <label htmlFor="razaSlug" className="mb-1 block text-sm font-semibold text-chocolate">
                Raza
            </label>
            <select
                id="razaSlug"
                name="razaSlug"
                required
                value={seleccion}
                onChange={(evento) => setSeleccion(evento.target.value)}
                aria-invalid={tieneError || undefined}
                className="w-full rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            >
                <option value="" disabled>
                    Elige una raza
                </option>
                {breeds.map((breed) => (
                    <option key={breed.slug} value={breed.slug}>
                        {breed.nombre}
                    </option>
                ))}
                <option value={OTRA_RAZA}>Otra raza (no está en la lista)</option>
            </select>

            {seleccion === OTRA_RAZA && (
                <input
                    type="text"
                    name="razaLibre"
                    required
                    defaultValue={!coincideConCatalogo ? razaActual : ""}
                    placeholder="Escribe la raza"
                    aria-label="Escribe la raza"
                    className="mt-2 w-full rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate placeholder:text-chocolate/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                />
            )}

            {tieneError && <p className="mt-1 text-sm text-red-800">{errores![0]}</p>}
        </div>
    );
}
