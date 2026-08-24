import Image from "next/image";
import { urlFoto } from "@/lib/storage";

type CampoArchivosCuidadoProps = {
    archivosActuales?: string[];
};

function esImagen(path: string): boolean {
    return /\.(jpe?g|png|gif|webp|avif)$/i.test(path);
}

export default function CampoArchivosCuidado({ archivosActuales = [] }: CampoArchivosCuidadoProps) {
    return (
        <div>
            <label htmlFor="archivos" className="mb-1 block text-sm font-semibold text-chocolate">
                Archivos adjuntos{" "}
                <span className="ml-1 font-normal text-chocolate/50">
                    (opcional, imágenes o PDF, hasta 5 en total)
                </span>
            </label>

            {archivosActuales.length > 0 && (
                <ul className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {archivosActuales.map((path) => (
                        <li key={path}>
                            <a href={urlFoto(path)} target="_blank" rel="noopener noreferrer" className="block">
                                {esImagen(path) ? (
                                    <Image
                                        src={urlFoto(path)}
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="h-20 w-full rounded-sm object-cover"
                                    />
                                ) : (
                                    <div className="flex h-20 w-full items-center justify-center rounded-sm bg-chocolate/10 text-xs font-semibold text-chocolate/70">
                                        PDF
                                    </div>
                                )}
                            </a>
                            <label className="mt-1 flex items-center gap-1 text-xs text-chocolate/70">
                                <input
                                    type="checkbox"
                                    name="eliminarArchivos"
                                    value={path}
                                    className="h-3.5 w-3.5 accent-chocolate"
                                />
                                Quitar
                            </label>
                        </li>
                    ))}
                </ul>
            )}

            <input
                id="archivos"
                name="archivos"
                type="file"
                accept="image/*,application/pdf"
                multiple
                className="block w-full text-sm text-chocolate file:mr-4 file:rounded-sm file:border-0 file:bg-chocolate file:px-4 file:py-2 file:text-sm file:font-semibold file:text-crema hover:file:bg-apricot"
            />
        </div>
    );
}
