"use client";

type BotonBorrarTareaProps = {
    accion: () => Promise<void>;
};

export default function BotonBorrarTarea({ accion }: BotonBorrarTareaProps) {
    return (
        <form
            action={accion}
            onSubmit={(evento) => {
                if (
                    !window.confirm(
                        "¿Seguro que quieres borrar esta rutina? También se borra su historial de días completados.",
                    )
                ) {
                    evento.preventDefault();
                }
            }}
        >
            <button type="submit" className="text-sm font-semibold text-red-800 hover:underline">
                Borrar rutina
            </button>
        </form>
    );
}
