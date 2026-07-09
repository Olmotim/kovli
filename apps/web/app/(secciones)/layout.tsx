import Link from "next/link";

export default function SeccionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <article className="max-w-3xl mx-auto px-6 lg:px-10 py-16 sm:py-20">
            <Link
                href="/"
                className="text-cafe text-sm font-semibold hover:text-apricot transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            >
                ← Volver a inicio
            </Link>

            <div className="mt-6">{children}</div>
        </article>
    );
}
