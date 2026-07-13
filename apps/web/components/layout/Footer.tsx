import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-arena border-t border-cafe/20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-chocolate/80 text-sm">© {year} Kovli — proyecto personal, sin fines comerciales.</p>
                <ul className="flex items-center gap-6">
                    <li>
                        <Link
                            href="/aviso-legal"
                            className="text-chocolate/80 text-sm hover:text-chocolate transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                        >
                            Aviso legal
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/privacidad"
                            className="text-chocolate/80 text-sm hover:text-chocolate transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                        >
                            Privacidad
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/cookies"
                            className="text-chocolate/80 text-sm hover:text-chocolate transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                        >
                            Cookies
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
