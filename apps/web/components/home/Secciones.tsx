import Link from "next/link";
import { secciones } from "@/lib/secciones";

// --- Versión móvil/tablet (<lg): sendero vertical con huellas en zigzag ---

const huesosVertical = [
    { top: "4%", left: "78%", rotate: "-18deg" },
    { top: "22%", left: "8%", rotate: "14deg" },
    { top: "45%", left: "84%", rotate: "24deg" },
    { top: "66%", left: "6%", rotate: "-12deg" },
    { top: "88%", left: "80%", rotate: "10deg" },
];

// --- Versión de escritorio (lg+): camino horizontal ondulado ---
// Coordenadas en el espacio del viewBox del SVG, no en píxeles reales de pantalla.
const CAMINO_ANCHO = 1200;
const CAMINO_ALTO = 220;
const CAMINO_MARGEN_X = 90;
const CAMINO_Y_ALTO = 60;
const CAMINO_Y_BAJO = 160;

function puntosCamino(n: number) {
    const paso = (CAMINO_ANCHO - CAMINO_MARGEN_X * 2) / (n - 1);
    return Array.from({ length: n }, (_, i) => ({
        x: CAMINO_MARGEN_X + paso * i,
        y: i % 2 === 0 ? CAMINO_Y_ALTO : CAMINO_Y_BAJO,
    }));
}

// Curva suave a través de una serie de puntos: entre cada punto y el siguiente,
// una bézier cúbica con los puntos de control a medio camino en X — da una onda
// continua sin necesitar trigonometría.
function caminoSuave(puntos: { x: number; y: number }[]) {
    let d = `M ${puntos[0].x} ${puntos[0].y}`;
    for (let i = 0; i < puntos.length - 1; i++) {
        const a = puntos[i];
        const b = puntos[i + 1];
        const midX = (a.x + b.x) / 2;
        d += ` C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
    }
    return d;
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// Huesos a medio camino entre cada dos paradas: es justo donde la curva
// cruza por el centro (los puntos de control de la bézier son simétricos),
// así que quedan apoyados sobre la línea en vez de flotando en el margen.
const HUESO_JITTER = [-14, 10, -8, 16, -12];

function huesosEnCamino(puntos: { x: number; y: number }[]) {
    const centroY = (CAMINO_Y_ALTO + CAMINO_Y_BAJO) / 2;
    return puntos.slice(0, -1).map((a, i) => {
        const b = puntos[i + 1];
        return {
            x: (a.x + b.x) / 2,
            y: centroY + HUESO_JITTER[i % HUESO_JITTER.length],
            rotate: `${HUESO_JITTER[i % HUESO_JITTER.length] * 1.5}deg`,
        };
    });
}

export default function Secciones() {
    const puntos = puntosCamino(secciones.length);
    const pathD = caminoSuave(puntos);
    const huesosHorizontal = huesosEnCamino(puntos);

    return (
        <section id="secciones" className="py-16 sm:py-20">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
                <span className="inline-block bg-beige text-chocolate text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                    Un recorrido juntos
                </span>
                <h2 className="text-chocolate text-4xl lg:text-4xl font-bold">Elige por dónde empezar</h2>
                <p className="text-chocolate/80 text-lg mt-3 max-w-xl">
                    Cada parada del camino es una guía completa.
                </p>

                {/* Móvil / tablet: sendero vertical */}
                <div className="lg:hidden relative mt-12">
                    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
                        {huesosVertical.map((h, i) => (
                            <span
                                key={i}
                                className="absolute text-2xl text-cafe/60"
                                style={{ top: h.top, left: h.left, transform: `rotate(${h.rotate})` }}
                            >
                                🦴
                            </span>
                        ))}
                    </div>

                    <ol className="relative flex flex-col max-w-2xl list-none">
                        {secciones.map((s, i) => (
                            <li key={s.label} className="group flex items-stretch gap-5">
                                <div className="flex flex-col items-center w-10 sm:w-12 shrink-0">
                                    <span
                                        aria-hidden="true"
                                        className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-apricot text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110 ${
                                            i % 2 === 0 ? "-translate-x-1.5" : "translate-x-1.5"
                                        }`}
                                    >
                                        🐾
                                    </span>
                                    {i < secciones.length - 1 && (
                                        <span
                                            aria-hidden="true"
                                            className="my-1 w-px flex-1 border-l-2 border-dashed border-cafe/30"
                                        />
                                    )}
                                </div>

                                <div className="pb-8 sm:pb-10">
                                    <h3 className="text-chocolate text-lg font-semibold">{s.label}</h3>
                                    <p className="text-chocolate/80 mt-1">{s.descripcion}</p>
                                    <Link
                                        href={s.href}
                                        className="text-chocolate text-sm font-semibold mt-3 inline-flex items-center gap-1 hover:gap-2 hover:text-apricot transition-all duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                                    >
                                        Ver más <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Escritorio: camino horizontal ondulado */}
                <div
                    className="hidden lg:block relative mt-24 mb-16 max-w-6xl mx-auto"
                    style={{ aspectRatio: `${CAMINO_ANCHO} / ${CAMINO_ALTO}` }}
                >
                    <svg
                        viewBox={`0 0 ${CAMINO_ANCHO} ${CAMINO_ALTO}`}
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
                        aria-hidden="true"
                    >
                        <path
                            d={pathD}
                            className="stroke-cafe/30"
                            strokeWidth={3}
                            strokeDasharray="2 14"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>

                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        {huesosHorizontal.map((h, i) => (
                            <span
                                key={i}
                                className="absolute text-3xl text-cafe/60"
                                style={{
                                    left: pct(h.x, CAMINO_ANCHO),
                                    top: pct(h.y, CAMINO_ALTO),
                                    transform: `translate(-50%, -50%) rotate(${h.rotate})`,
                                }}
                            >
                                🦴
                            </span>
                        ))}
                    </div>

                    {secciones.map((s, i) => {
                        const p = puntos[i];
                        const labelAbove = p.y > (CAMINO_Y_ALTO + CAMINO_Y_BAJO) / 2;
                        return (
                            <Link
                                key={s.label}
                                href={s.href}
                                className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                                style={{ left: pct(p.x, CAMINO_ANCHO), top: pct(p.y, CAMINO_ALTO) }}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`flex h-9 w-9 items-center justify-center rounded-full  text-base ring-4 ring-arena transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 ${
                                    i%2==0 ? "bg-kovu/70" : "bg-loli"}`}
                                >
                                    🐾
                                </span>
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 w-32 flex flex-col items-center text-center ${
                                        labelAbove ? "bottom-full mb-3" : "top-full mt-3"
                                    }`}
                                >
                                    <span className="text-sm font-semibold text-chocolate group-hover:text-apricot transition-colors duration-200">
                                        {s.label}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
