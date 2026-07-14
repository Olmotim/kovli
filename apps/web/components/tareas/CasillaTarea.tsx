"use client";

type CasillaTareaProps = {
    accion: () => Promise<void>;
    marcada: boolean;
    etiqueta: string;
};

export default function CasillaTarea({ accion, marcada, etiqueta }: CasillaTareaProps) {
    return (
        <form action={accion}>
            <label className="flex cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    defaultChecked={marcada}
                    onChange={(evento) => evento.currentTarget.form?.requestSubmit()}
                    className="h-5 w-5 accent-chocolate"
                />
                <span className={marcada ? "text-chocolate/50 line-through" : "text-chocolate"}>{etiqueta}</span>
            </label>
        </form>
    );
}
