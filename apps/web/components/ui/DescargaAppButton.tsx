"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DescargaAppButton({
    className,
    onTrigger,
}: {
    className?: string;
    onTrigger?: () => void;
}) {
    const [open, setOpen] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        closeButtonRef.current?.focus();

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") close();
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    function close() {
        setOpen(false);
        triggerRef.current?.focus();
    }

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => {
                    onTrigger?.();
                    setOpen(true);
                }}
                className={className}
            >
                Descarga la app
            </button>

            {open &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-chocolate/50 px-6"
                        onClick={close}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="proximamente-titulo"
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-crema rounded-2xl shadow-xl max-w-sm w-full p-8 text-center"
                        >
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={close}
                                aria-label="Cerrar"
                                className="absolute top-3 right-3 p-1 text-chocolate focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate rounded-sm"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>

                            <span className="text-3xl" aria-hidden="true">🐾</span>
                            <h2 id="proximamente-titulo" className="text-chocolate text-xl font-bold mt-3">
                                Próximamente
                            </h2>
                            <p className="text-chocolate mt-2">
                                La app de Kovli todavía está en camino. ¡Vuelve pronto!
                            </p>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
