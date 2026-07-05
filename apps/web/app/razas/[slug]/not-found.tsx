import Link from "next/link";

export default function RazaNotFound() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
                <span className="text-5xl" aria-hidden="true">
                    🐾
                </span>
                <h1 className="font-serif text-3xl font-bold text-chocolate mt-4">
                    No encontramos esa raza
                </h1>
                <p className="text-chocolate/80 mt-3">
                    Puede que el enlace esté mal escrito o que la raza no esté todavía en Kovli.
                </p>
                <Link
                    href="/razas"
                    className="inline-flex items-center gap-1 text-chocolate text-sm font-semibold mt-6 hover:text-apricot transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                >
                    ← Ver todas las razas
                </Link>
            </div>
        </section>
    );
}
