"use client";

type BotonBorrarCuidadoProps = {
    accion: () => Promise<void>;
};

export default function BotonBorrarCuidado({ accion }: BotonBorrarCuidadoProps) {
    return (
        <form
            action={accion}
            onSubmit={(evento) => {
                if (
                    !window.confirm(
                        "¿Seguro que quieres borrar este cuidado? Esta acción no se puede deshacer.",
                    )
                ) {
                    evento.preventDefault();
                }
            }}
        >
            <button type="submit" className="text-sm font-semibold text-red-800 hover:underline">
                Borrar cuidado
            </button>
        </form>
    );
}
