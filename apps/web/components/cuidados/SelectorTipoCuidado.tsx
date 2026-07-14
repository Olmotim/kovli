"use client";

import { useState } from "react";

const OTRO = "OTRO";

const TIPOS = [
    { value: "VACUNA", label: "Vacuna" },
    { value: "DESPARASITACION", label: "Desparasitación" },
    { value: "REVISION", label: "Revisión veterinaria" },
    { value: OTRO, label: "Otro" },
];

type SelectorTipoCuidadoProps = {
    tipoActual?: string;
    tipoLibreActual?: string;
    errores?: string[];
    erroresTipoLibre?: string[];
};

export default function SelectorTipoCuidado({
    tipoActual,
    tipoLibreActual,
    errores,
    erroresTipoLibre,
}: SelectorTipoCuidadoProps) {
    const [seleccion, setSeleccion] = useState(tipoActual ?? "");
    const tieneError = Boolean(errores && errores.length > 0);
    const tieneErrorLibre = Boolean(erroresTipoLibre && erroresTipoLibre.length > 0);

    return (
        <div>
            <label htmlFor="tipo" className="mb-1 block text-sm font-semibold text-chocolate">
                Tipo de cuidado
            </label>
            <select
                id="tipo"
                name="tipo"
                required
                value={seleccion}
                onChange={(evento) => setSeleccion(evento.target.value)}
                aria-invalid={tieneError || undefined}
                className="w-full rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            >
                <option value="" disabled>
                    Elige un tipo
                </option>
                {TIPOS.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                    </option>
                ))}
            </select>
            {tieneError && <p className="mt-1 text-sm text-red-800">{errores![0]}</p>}

            {seleccion === OTRO && (
                <input
                    type="text"
                    name="tipoLibre"
                    required
                    defaultValue={tipoLibreActual}
                    placeholder="Escribe el tipo de cuidado"
                    aria-label="Escribe el tipo de cuidado"
                    aria-invalid={tieneErrorLibre || undefined}
                    className="mt-2 w-full rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate placeholder:text-chocolate/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                />
            )}
            {tieneErrorLibre && <p className="mt-1 text-sm text-red-800">{erroresTipoLibre![0]}</p>}
        </div>
    );
}
