import Image from "next/image";
import { moverFotoEntradaAction } from "@/lib/actions/diario";
import { urlFoto } from "@/lib/storage";

type CampoFotosDiarioProps = {
    fotosActuales?: string[];
    // Solo se pasa al editar una entrada ya guardada — al crear una nueva
    // todavía no hay fotos que reordenar.
    entradaId?: string;
};

export default function CampoFotosDiario({ fotosActuales = [], entradaId }: CampoFotosDiarioProps) {
    return (
        <div>
            <label htmlFor="fotos" className="mb-1 block text-sm font-semibold text-chocolate">
                Fotos <span className="ml-1 font-normal text-chocolate/50">(opcional, hasta 5 en total)</span>
            </label>

            {fotosActuales.length > 0 && (
                <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {fotosActuales.map((path, indice) => (
                        <div key={path}>
                            <Image
                                src={urlFoto(path)}
                                alt=""
                                width={96}
                                height={96}
                                className="h-20 w-full rounded-sm object-cover"
                            />
                            {entradaId && (
                                <div className="mt-1 flex items-center justify-center gap-2">
                                    <form action={moverFotoEntradaAction.bind(null, entradaId, path, "arriba")}>
                                        <button
                                            type="submit"
                                            disabled={indice === 0}
                                            aria-label="Mover foto antes"
                                            className="text-chocolate/60 hover:text-chocolate disabled:opacity-30"
                                        >
                                            ↑
                                        </button>
                                    </form>
                                    <form action={moverFotoEntradaAction.bind(null, entradaId, path, "abajo")}>
                                        <button
                                            type="submit"
                                            disabled={indice === fotosActuales.length - 1}
                                            aria-label="Mover foto después"
                                            className="text-chocolate/60 hover:text-chocolate disabled:opacity-30"
                                        >
                                            ↓
                                        </button>
                                    </form>
                                </div>
                            )}
                            <label className="mt-1 flex items-center gap-1 text-xs text-chocolate/70">
                                <input
                                    type="checkbox"
                                    name="eliminarFotos"
                                    value={path}
                                    className="h-3.5 w-3.5 accent-chocolate"
                                />
                                Quitar
                            </label>
                        </div>
                    ))}
                </div>
            )}

            <input
                id="fotos"
                name="fotos"
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm text-chocolate file:mr-4 file:rounded-sm file:border-0 file:bg-chocolate file:px-4 file:py-2 file:text-sm file:font-semibold file:text-crema hover:file:bg-apricot"
            />
        </div>
    );
}
