import Link from "next/link";
import { estadoCuidado } from "@kovli/domain";
import { etiquetaTipoCuidado } from "@/lib/cuidados";

type FilaCuidadoProps = {
    perroId: string;
    cuidado: {
        id: string;
        tipo: string;
        tipoLibre: string | null;
        fecha: Date;
        notas: string | null;
    };
};

const ESTILOS_ESTADO: Record<string, string> = {
    vencido: "border-red-800/30 bg-red-50",
    proximo: "border-apricot bg-apricot/10",
    lejano: "border-chocolate/15 bg-crema",
};

export default function FilaCuidado({ perroId, cuidado }: FilaCuidadoProps) {
    const estado = estadoCuidado(cuidado.fecha);

    return (
        <li>
            <Link
                href={`/cuenta/perros/${perroId}/cuidados/${cuidado.id}`}
                className={`flex items-center justify-between gap-4 rounded-sm border px-4 py-3 hover:border-chocolate/40 transition-colors duration-200 ${ESTILOS_ESTADO[estado]}`}
            >
                <div>
                    <p className="font-semibold text-chocolate">{etiquetaTipoCuidado(cuidado)}</p>
                    {cuidado.notas && <p className="text-sm text-chocolate/70">{cuidado.notas}</p>}
                </div>
                <p className="whitespace-nowrap text-sm text-chocolate/70">
                    {cuidado.fecha.toLocaleDateString("es-ES")}
                </p>
            </Link>
        </li>
    );
}
