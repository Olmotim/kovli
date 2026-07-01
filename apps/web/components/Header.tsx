import { secciones } from "@/lib/secciones";
import Image from "next/image";

export default function Navbar() {
    return (
        <>
            <header>
                <div className=" max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-18 py-4">
                    {/* Logo */}
                    <a href="#" className="flex items-center">
                        <Image
                            src="/kovliCGT.png"
                            alt="Kovli"
                            priority
                            width={256}
                            height={256}
                            className="h-16 w-auto object-contain"
                        />
                    </a>

                    {/* Desktop links */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {secciones.map((l) => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    className="text-sm font-medium  text-cafe hover:text-cafe tracking-wide transition-colors duration-200 relative group"
                                >
                                    {l.label}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-chocolate group-hover:w-full transition-all duration-300" />
                                </a>
                            </li>
                        ))}
                    </ul>



                    {/* CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a href="#contacto"
                            className="bg-chocolate text-crema text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200"
                        >
                            Descarga la app
                        </a>
                    </div>
                </div>
            </header>

        </>
    );
}