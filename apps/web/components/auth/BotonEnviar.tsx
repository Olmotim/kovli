"use client";

import { useFormStatus } from "react-dom";

type BotonEnviarProps = {
    children: React.ReactNode;
};

export default function BotonEnviar({ children }: BotonEnviarProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-chocolate text-crema text-sm font-semibold px-6 py-3 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {pending ? "Enviando…" : children}
        </button>
    );
}
