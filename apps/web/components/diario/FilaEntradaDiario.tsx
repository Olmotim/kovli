import Image from "next/image";
import Link from "next/link";
import { urlFoto } from "@/lib/storage";

type FilaEntradaDiarioProps = {
    perroId: string;
    entrada: {
        id: string;
        fecha: Date;
        texto: string | null;
        fotos: string[];
    };
};

export default function FilaEntradaDiario({ perroId, entrada }: FilaEntradaDiarioProps) {
    return (
        <li className="rounded-sm border border-chocolate/15 bg-crema px-4 py-3">
            <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-chocolate">{entrada.fecha.toLocaleDateString("es-ES")}</p>
                <Link
                    href={`/cuenta/perros/${perroId}/diario/${entrada.id}`}
                    className="text-sm text-chocolate/60 hover:text-chocolate"
                >
                    Editar
                </Link>
            </div>

            {entrada.texto && <p className="mt-2 whitespace-pre-line text-chocolate/80">{entrada.texto}</p>}

            {entrada.fotos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {entrada.fotos.map((path) => (
                        <Image
                            key={path}
                            src={urlFoto(path)}
                            alt=""
                            width={96}
                            height={96}
                            className="h-20 w-full rounded-sm object-cover"
                        />
                    ))}
                </div>
            )}
        </li>
    );
}
