import { secciones } from "@/lib/secciones";
import Image from "next/image";
import MobileMenu from "@/components/layout/MobileMenu";
import DescargaAppButton from "@/components/ui/DescargaAppButton";

export default function Navbar() {
    return (
        <>
            <header className="sticky top-0 z-50 bg-crema">
                <div className=" max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-18 py-4">
                    {/* Logo */}
                    <a href="#" className="flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate">
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
                                    className="text-sm font-medium  text-cafe hover:text-cafe tracking-wide transition-colors duration-200 relative group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
                                >
                                    {l.label}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-chocolate group-hover:w-full transition-all duration-300" />
                                </a>
                            </li>
                        ))}
                    </ul>
                    
                    {/* CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <DescargaAppButton
                            className="bg-chocolate text-crema text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wide hover:bg-apricot transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-apricot"
                        />
                    </div>

                    {/* Mobile menu */}
                    <MobileMenu secciones={secciones} />
                </div>
            </header>

        </>
    );
}