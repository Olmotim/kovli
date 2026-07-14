import Image from "next/image";

type CampoFotoProps = {
    fotoActualUrl?: string;
};

export default function CampoFoto({ fotoActualUrl }: CampoFotoProps) {
    return (
        <div>
            <label htmlFor="foto" className="mb-1 block text-sm font-semibold text-chocolate">
                Foto <span className="ml-1 font-normal text-chocolate/50">(opcional)</span>
            </label>
            {fotoActualUrl && (
                <Image
                    src={fotoActualUrl}
                    alt="Foto actual del perro"
                    width={96}
                    height={96}
                    className="mb-2 h-24 w-24 rounded-sm object-cover"
                />
            )}
            <input
                id="foto"
                name="foto"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-chocolate file:mr-4 file:rounded-sm file:border-0 file:bg-chocolate file:px-4 file:py-2 file:text-sm file:font-semibold file:text-crema hover:file:bg-apricot"
            />
            {fotoActualUrl && (
                <p className="mt-1 text-sm text-chocolate/60">
                    Sube una nueva foto para sustituir la actual.
                </p>
            )}
        </div>
    );
}
