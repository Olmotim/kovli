"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Seccion } from "@/lib/secciones";

// El botón está centrado dentro de una barra de navbar más alta que él, así
// que entre el propio botón y el borde inferior del header (donde empieza el
// panel) hay un hueco que no pertenece a ninguno de los dos elementos. Para no
// tener que calcular ese hueco en píxeles (frágil: cambia si cambia la altura
// del header), se retrasa el cierre por hover: si el ratón vuelve a entrar
// dentro de ese margen, el cierre programado se cancela.
const RETRASO_CIERRE_MS = 200;

export default function SeccionesDropdown({ items }: { items: Seccion[] }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cierrePendiente = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelarCierrePendiente = () => {
        if (cierrePendiente.current) {
            clearTimeout(cierrePendiente.current);
            cierrePendiente.current = null;
        }
    };

    const abrir = () => {
        cancelarCierrePendiente();
        setOpen(true);
    };

    const cerrar = () => {
        cancelarCierrePendiente();
        setOpen(false);
    };

    const cerrarConRetraso = () => {
        cancelarCierrePendiente();
        cierrePendiente.current = setTimeout(() => setOpen(false), RETRASO_CIERRE_MS);
    };

    useEffect(() => cancelarCierrePendiente, []);

    return (
        <div
            ref={containerRef}
            onMouseEnter={abrir}
            onMouseLeave={cerrarConRetraso}
            onKeyDown={(e) => {
                if (e.key === "Escape") cerrar();
            }}
            onBlur={(e) => {
                if (!containerRef.current?.contains(e.relatedTarget as Node)) {
                    cerrar();
                }
            }}
        >
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onFocus={abrir}
                className="flex items-center gap-1 rounded-sm text-sm font-medium text-cafe tracking-wide transition-colors duration-200 hover:text-cafe focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            >
                Cuidado del perro
                <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* inset-x-0 se posiciona contra el <header> (el ancestro "positioned"
                más cercano, gracias a que es sticky), no contra este div — por
                eso el panel ocupa todo el ancho de la pantalla y no solo el
                ancho del botón. */}
            <div
                className={`absolute inset-x-0 top-full border-t border-cafe/20 bg-arena shadow-md ${open ? "block" : "hidden"}`}
            >
                <ul className="mx-auto grid max-w-7xl grid-cols-5 gap-2 px-6 py-6 lg:px-10">
                    {items.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="group flex flex-col gap-1 rounded-sm p-4 transition-colors duration-200 hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                            >
                                <span className="font-serif font-bold text-chocolate">{item.label}</span>
                                <span className="text-sm text-cafe/80">{item.descripcion}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
