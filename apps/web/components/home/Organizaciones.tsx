"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Organizacion, Pais } from "@/data/organizaciones";
import { organizaciones } from "@/data/organizaciones";

const OrganizacionesMapa = dynamic(() => import("./OrganizacionesMapa"), {
    ssr: false,
    loading: () => <div className="h-72 w-full animate-pulse rounded-sm bg-beige sm:h-80 lg:h-full" />,
});

function iniciales(nombre: string): string {
    const palabras = nombre.split(" ").filter(Boolean);
    const primeras = palabras.length > 1 ? [palabras[0], palabras[1]] : [palabras[0]];
    return primeras
        .map((palabra) => palabra[0])
        .join("")
        .toUpperCase();
}

type FilaOrganizacionProps = {
    organizacion: Organizacion;
    activa: boolean;
    onSeleccionar: (nombre: string) => void;
};

function FilaOrganizacion({ organizacion, activa, onSeleccionar }: FilaOrganizacionProps) {
    return (
        <li
            role="button"
            tabIndex={0}
            onClick={() => onSeleccionar(organizacion.nombre)}
            onKeyDown={(evento) => {
                if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    onSeleccionar(organizacion.nombre);
                }
            }}
            className={`flex cursor-pointer items-center gap-4 rounded-sm border bg-crema p-4 transition-colors duration-200 ${
                activa ? "border-apricot ring-1 ring-apricot" : "border-chocolate/30"
            }`}
        >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-beige font-serif text-lg font-bold text-chocolate">
                {iniciales(organizacion.nombre)}
            </span>

            <div className="flex-1">
                <p className="font-serif text-lg font-bold text-chocolate">{organizacion.nombre}</p>
                <p className="text-sm text-chocolate/80">
                    {organizacion.ciudad} · {organizacion.categoria}
                </p>
            </div>

            <a
                href={organizacion.enlace}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(evento) => evento.stopPropagation()}
                aria-label={`Ver más sobre ${organizacion.nombre} (abre en una pestaña nueva)`}
                className="shrink-0 rounded-sm bg-chocolate px-4 py-2 text-sm font-semibold text-crema transition-colors duration-200 hover:bg-cafe focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            >
                Ver más
            </a>
        </li>
    );
}

export default function Organizaciones() {
    const paises = useMemo(
        () => Array.from(new Set(organizaciones.map((organizacion) => organizacion.pais))),
        [],
    );

    const [paisActivo, setPaisActivo] = useState<Pais | "todos">("todos");
    const [seleccionada, setSeleccionada] = useState<string | null>(null);

    const visibles = useMemo(
        () =>
            paisActivo === "todos"
                ? organizaciones
                : organizaciones.filter((organizacion) => organizacion.pais === paisActivo),
        [paisActivo],
    );

    return (
        <section id="organizaciones" className="py-16 sm:py-20">
            <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
                <span className="mb-4 inline-block rounded-full bg-beige px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-chocolate">
                    Ayuda y adopción
                </span>
                <h2 className="text-4xl font-bold text-chocolate lg:text-4xl">
                    Organizaciones que ayudan y dan en adopción
                </h2>
                <p className="mt-3 max-w-xl text-lg text-chocolate/80">
                    Protectoras, rescates y plataformas de adopción reales, para colaborar o encontrar a tu próximo compañero.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setPaisActivo("todos")}
                        aria-pressed={paisActivo === "todos"}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                            paisActivo === "todos"
                                ? "bg-apricot text-crema"
                                : "bg-beige text-chocolate hover:bg-apricot/40"
                        }`}
                    >
                        Todos
                    </button>
                    {paises.map((pais) => (
                        <button
                            key={pais}
                            type="button"
                            onClick={() => setPaisActivo(pais)}
                            aria-pressed={paisActivo === pais}
                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                                paisActivo === pais
                                    ? "bg-apricot text-crema"
                                    : "bg-beige text-chocolate hover:bg-apricot/40"
                            }`}
                        >
                            {pais}
                        </button>
                    ))}
                </div>

                <div className="mt-10 flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
                    <div className="order-2 lg:order-1">
                        {paisActivo === "todos" ? (
                            <div className="flex flex-col gap-10">
                                {paises.map((pais) => (
                                    <div key={pais}>
                                        <h3 className="mb-4 font-mono text-xs uppercase tracking-wide text-chocolate/70">
                                            {pais}
                                        </h3>
                                        <ul className="flex flex-col gap-3">
                                            {organizaciones
                                                .filter((organizacion) => organizacion.pais === pais)
                                                .map((organizacion) => (
                                                    <FilaOrganizacion
                                                        key={organizacion.nombre}
                                                        organizacion={organizacion}
                                                        activa={organizacion.nombre === seleccionada}
                                                        onSeleccionar={setSeleccionada}
                                                    />
                                                ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {visibles.map((organizacion) => (
                                    <FilaOrganizacion
                                        key={organizacion.nombre}
                                        organizacion={organizacion}
                                        activa={organizacion.nombre === seleccionada}
                                        onSeleccionar={setSeleccionada}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="order-1 h-72 sm:h-80 lg:sticky lg:top-24 lg:order-2 lg:h-[560px]">
                        <OrganizacionesMapa
                            key={paisActivo}
                            organizaciones={visibles}
                            seleccionada={seleccionada}
                            onSeleccionar={setSeleccionada}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
