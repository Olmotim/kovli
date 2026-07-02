import { secciones } from "@/lib/secciones";

type RolodexSeccionesProps = {
    actual: string;
};

const ROTACIONES = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3", "-rotate-3", "rotate-1"];

export default function RolodexSecciones({ actual }: RolodexSeccionesProps) {
    const otras = secciones
        .map((s, i) => ({ ...s, numero: i + 1 }))
        .filter((s) => s.href !== actual);

    return (
        <div id="todas-las-secciones" className="mt-16 pt-10 border-t border-dashed border-chocolate/30">
            <span className="font-mono text-xs uppercase tracking-widest text-cafe">
                Sigue tu camino
            </span>

            {/* Móvil / tablet: lista vertical simple */}
            <ul className="lg:hidden mt-4 flex flex-col gap-3">
                {otras.map((s) => (
                    <li key={s.label}>
                        <a
                            href={s.href}
                            className="flex items-center gap-3 border border-chocolate/30 bg-crema rounded-sm px-4 py-3 hover:border-chocolate transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                        >
                            <span className="font-mono text-xs text-apricot shrink-0">
                                {String(s.numero).padStart(2, "0")}
                            </span>
                            <span>
                                <span className="block font-serif font-bold text-chocolate">
                                    {s.label}
                                </span>
                                <span className="block font-mono text-xs text-cafe mt-0.5">
                                    {s.resumen}
                                </span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            {/* Escritorio: fichero en abanico */}
            <div className="hidden lg:flex mt-8 items-start">
                {otras.map((s, idx) => (
                    <a
                        key={s.label}
                        href={s.href}
                        style={{ zIndex: idx }}
                        className={`group relative w-44 shrink-0 overflow-hidden break-words -ml-8 first:ml-0 border border-chocolate/30 bg-crema rounded-sm px-4 py-5 shadow-sm transition-all duration-200 hover:z-20 hover:-translate-y-3 hover:rotate-0 hover:shadow-md focus-visible:z-20 focus-visible:-translate-y-3 focus-visible:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate ${ROTACIONES[idx % ROTACIONES.length]}`}
                    >
                        <span className="block font-mono text-xs text-apricot">
                            {String(s.numero).padStart(2, "0")}
                        </span>
                        <span className="block font-serif font-bold text-chocolate mt-1 leading-tight">
                            {s.label}
                        </span>
                        <span className="block font-mono text-xs text-cafe mt-2">
                            {s.resumen}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
