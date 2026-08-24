import Link from "next/link";
import { marcarTareaAction, moverTareaAction } from "@/lib/actions/tareas";
import CasillaTarea from "./CasillaTarea";

type FilaTareaProps = {
    perroId: string;
    tarea: { id: string; nombre: string; completadaHoy: boolean };
};

export default function FilaTarea({ perroId, tarea }: FilaTareaProps) {
    return (
        <li className="flex items-center justify-between gap-4 rounded-sm border border-chocolate/15 bg-crema px-4 py-3">
            <CasillaTarea
                accion={marcarTareaAction.bind(null, tarea.id)}
                marcada={tarea.completadaHoy}
                etiqueta={tarea.nombre}
            />
            <div className="flex items-center gap-3">
                <form action={moverTareaAction.bind(null, tarea.id, "arriba")}>
                    <button
                        type="submit"
                        aria-label="Subir en la lista"
                        className="text-chocolate/60 hover:text-chocolate"
                    >
                        ↑
                    </button>
                </form>
                <form action={moverTareaAction.bind(null, tarea.id, "abajo")}>
                    <button
                        type="submit"
                        aria-label="Bajar en la lista"
                        className="text-chocolate/60 hover:text-chocolate"
                    >
                        ↓
                    </button>
                </form>
                <Link
                    href={`/cuenta/perros/${perroId}/rutinas/${tarea.id}/historial`}
                    className="whitespace-nowrap text-sm text-chocolate/60 hover:text-chocolate"
                >
                    Historial
                </Link>
                <Link
                    href={`/cuenta/perros/${perroId}/rutinas/${tarea.id}`}
                    className="whitespace-nowrap text-sm text-chocolate/60 hover:text-chocolate"
                >
                    Editar
                </Link>
            </div>
        </li>
    );
}
