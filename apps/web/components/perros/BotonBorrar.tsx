"use client";

type BotonBorrarProps = {
    accion: () => Promise<void>;
};

export default function BotonBorrar({ accion }: BotonBorrarProps) {
    return (
        <form
            action={accion}
            onSubmit={(evento) => {
                if (
                    !window.confirm(
                        "¿Seguro que quieres borrar este perro? Esta acción no se puede deshacer.",
                    )
                ) {
                    evento.preventDefault();
                }
            }}
        >
            <button type="submit" className="text-sm font-semibold text-red-800 hover:underline">
                Borrar perro
            </button>
        </form>
    );
}
