"use client";

import { useState } from "react";
import type { Seccion } from "@/lib/secciones";
import DescargaAppButton from "@/components/ui/DescargaAppButton";

export default function MobileMenu({ secciones }: { secciones: Seccion[] }) {
    const [open, setOpen] = useState(false);

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
                className={`absolute left-0 right-0 top-full bg-crema border-t border-cafe/20 shadow-md ${open ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col px-6 py-4 gap-1">
                    {secciones.map((s) => (
                        <li key={s.label}>
                            <a
                                href={s.href}
                                onClick={() => setOpen(false)}
                                className="block py-2 text-cafe font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate rounded-sm"
                            >
                                {s.label}
                            </a>
                        </li>
                    ))}
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
