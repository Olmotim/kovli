type SelectorSexoProps = {
    defaultValue?: string;
    errores?: string[];
};

export default function SelectorSexo({ defaultValue, errores }: SelectorSexoProps) {
    const tieneError = Boolean(errores && errores.length > 0);

    return (
        <div>
            <label htmlFor="sexo" className="mb-1 block text-sm font-semibold text-chocolate">
                Sexo <span className="ml-1 font-normal text-chocolate/50">(opcional)</span>
            </label>
            <select
                id="sexo"
                name="sexo"
                defaultValue={defaultValue ?? ""}
                aria-invalid={tieneError || undefined}
                className="w-full rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            >
                <option value="">Sin especificar</option>
                <option value="MACHO">Macho</option>
                <option value="HEMBRA">Hembra</option>
            </select>
            {tieneError && <p className="mt-1 text-sm text-red-800">{errores![0]}</p>}
        </div>
    );
}
