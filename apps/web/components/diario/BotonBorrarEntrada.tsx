"use client";

type BotonBorrarEntradaProps = {
    accion: () => Promise<void>;
};

export default function BotonBorrarEntrada({ accion }: BotonBorrarEntradaProps) {
    return (
        <form
            action={accion}
            onSubmit={(evento) => {
                if (
                    !window.confirm(
                        "¿Seguro que quieres borrar esta entrada? También se borran sus fotos.",
                    )
                ) {
                    evento.preventDefault();
                }
            }}
        >
            <button type="submit" className="text-sm font-semibold text-red-800 hover:underline">
                Borrar entrada
            </button>
        </form>
    );
}
