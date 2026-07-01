import { secciones } from "@/lib/secciones";

export default function Secciones() {
    return (
        <section id="secciones" className="py-16 sm:py-20">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
                <span className="inline-block bg-beige text-chocolate text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                    Explora por tema
                </span>
                <h2 className="text-chocolate text-4xl lg:text-5xl font-bold">Secciones</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {secciones.map((s) => (
                        <div
                            key={s.label}
                            className="group rounded-2xl border border-cafe/20 p-6 hover:border-apricot hover:bg-crema hover:shadow-md transition-all duration-300 flex flex-col h-full bg-beige/50"
                        >
                            <span className="mx-auto flex items-center justify-center w-12 h-12 rounded-xl bg-apricot text-2xl" aria-hidden="true">
                                {s.icono}
                            </span>
                            <h3 className="text-chocolate text-lg font-semibold mt-3 text-center">{s.label}</h3>
                            <p className="text-chocolate mt-1">{s.descripcion}</p>
                            <a
                                href={s.href}
                                className="text-chocolate text-sm font-semibold mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                            >
                                Ver más <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
