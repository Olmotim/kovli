"use client";

import { useState } from "react";
import Link from "next/link";
import type { Seccion } from "@/lib/secciones";
import DescargaAppButton from "@/components/ui/DescargaAppButton";

type MobileMenuProps = {
    subsecciones: Seccion[];
    razas: Pick<Seccion, "label" | "href">;
};

export default function MobileMenu({ subsecciones, razas }: MobileMenuProps) {
    const [open, setOpen] = useState(false);
    const [seccionesAbiertas, setSeccionesAbiertas] = useState(false);

    return (
        <div className="lg:hidden">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-controls="menu-movil"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                className="p-2 -mr-2 text-chocolate focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate rounded-sm"
            >
                {open ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                )}
            </button>

            <div
                id="menu-movil"
                className={`absolute left-0 right-0 top-full bg-arena border-t border-cafe/20 shadow-md ${open ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col px-6 py-4 gap-1">
                    <li>
                        <button
                            type="button"
                            aria-expanded={seccionesAbiertas}
                            onClick={() => setSeccionesAbiertas((v) => !v)}
                            className="flex w-full items-center justify-between py-2 text-cafe font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate rounded-sm"
                        >
                            Cuidado del perro
                            <svg
                                aria-hidden="true"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-200 ${seccionesAbiertas ? "rotate-180" : ""}`}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {seccionesAbiertas && (
                            <ul className="flex flex-col gap-1 pl-4">
                                {subsecciones.map((s) => (
                                    <li key={s.label}>
                                        <Link
                                            href={s.href}
                                            onClick={() => setOpen(false)}
                                            className="block py-2 text-cafe focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate rounded-sm"
                                        >
                                            {s.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link
                            href="/#organizaciones"
                            onClick={() => setOpen(false)}
                            className="block py-2 text-cafe font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate rounded-sm"
                        >
                            Organizaciones
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={razas.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-cafe font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate rounded-sm"
                        >
                            {razas.label}
                        </Link>
                    </li>
                </ul>
                <div className="px-6 pb-5">
                    <DescargaAppButton
                        onTrigger={() => setOpen(false)}
                        className="block w-full text-center bg-chocolate text-crema text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot"
                    />
                </div>
            </div>
        </div>
    );
}
