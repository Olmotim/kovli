"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type FichaItem = {
    titulo: string;
    descripcion: string;
    href: string;
};

type FichaSeccionProps = {
    numero: number;
    total: number;
    titulo: string;
    estado: "En progreso" | "Completo";
    actualizado: string;
    items: FichaItem[];
};

export default function FichaSeccion({
    numero,
    total,
    titulo,
    estado,
    actualizado,
    items,
}: FichaSeccionProps) {
    const pathname = usePathname();
    const storageKey = `kovli:leido:${pathname}`;
    const [leidos, setLeidos] = useState<string[]>([]);

    useEffect(() => {
        const guardado = localStorage.getItem(storageKey);
        if (guardado) {
            // localStorage no existe en el primer render de servidor: esta lectura
            // solo puede pasar aquí, sincronizando estado desde algo externo a React.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLeidos(JSON.parse(guardado));
        }
    }, [storageKey]);

    function marcarComoLeido(href: string) {
        setLeidos((actuales) => {
            if (actuales.includes(href)) return actuales;
            const nuevos = [...actuales, href];
            localStorage.setItem(storageKey, JSON.stringify(nuevos));
            return nuevos;
        });
    }

    return (
        <div className="border border-chocolate bg-crema px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-cafe">
                    Sección {String(numero).padStart(2, "0")} de {String(total).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-apricot border border-dashed border-apricot rounded-full px-3 py-1">
                    {estado}
                </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mt-3">
                {titulo}
            </h1>

            <div className="border-t border-dashed border-chocolate/40 mt-6" />

            <ul className="mt-2">
                {items.map((item, i) => (
                    <li
                        key={item.titulo}
                        className={i < items.length - 1 ? "border-b border-dotted border-chocolate/30" : ""}
                    >
                        <a
                            href={item.href}
                            onClick={() => marcarComoLeido(item.href)}
                            className="group flex items-start gap-3 py-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                        >
                            <span
                                aria-hidden="true"
                                className={`mt-1 h-4 w-4 border-2 border-chocolate shrink-0 flex items-center justify-center transition-colors duration-200 ${
                                    leidos.includes(item.href) ? "bg-chocolate" : ""
                                }`}
                            >
                                {leidos.includes(item.href) && (
                                    <span className="text-crema text-[10px] leading-none">✓</span>
                                )}
                            </span>
                            <span>
                                <span className="block font-serif font-bold text-chocolate group-hover:text-apricot transition-colors duration-200">
                                    {item.titulo}
                                    {leidos.includes(item.href) && (
                                        <span className="sr-only"> (leído)</span>
                                    )}
                                </span>
                                <span className="block text-cafe text-sm mt-0.5">
                                    {item.descripcion}
                                </span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            <div className="border-t border-dashed border-chocolate/40 mt-2" />

            <div className="flex items-center justify-between gap-4 mt-4 font-mono text-xs uppercase tracking-widest">
                <span className="text-cafe">Actualizado · {actualizado}</span>
                <a
                    href="#todas-las-secciones"
                    className="text-apricot hover:text-chocolate transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                >
                    Seguir tu camino  ↓
                </a>
            </div>
        </div>
    );
}
