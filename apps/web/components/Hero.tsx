export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Fondo decorativo */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-apricot/30 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-beige/60 blur-3xl"
            />

            <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-20 sm:py-24 lg:py-28 text-center">
                <span className="inline-block bg-beige text-chocolate text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                    🐾 Guía completa para dueños de perros
                </span>

                <h1 className="text-chocolate text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Todo lo que necesitas saber para cuidar de tu perro
                </h1>

                <p className="text-apricot text-lg sm:text-xl lg:text-2xl mt-5">
                    Guías claras sobre salud, seguridad y adiestramiento, pensadas para dueños primerizos y avanzados.
                </p>

                <a
                    href="#secciones"
                    className="inline-block mt-9 bg-chocolate text-crema text-sm font-semibold px-6 py-3 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200"
                >
                    Explorar secciones ↓
                </a>
            </div>
        </section>
    );
}
