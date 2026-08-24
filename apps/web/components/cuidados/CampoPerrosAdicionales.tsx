type CampoPerrosAdicionalesProps = {
    perros: { id: string; nombre: string }[];
};

export default function CampoPerrosAdicionales({ perros }: CampoPerrosAdicionalesProps) {
    if (perros.length === 0) return null;

    return (
        <fieldset>
            <legend className="mb-1 block text-sm font-semibold text-chocolate">
                Aplicar también a{" "}
                <span className="ml-1 font-normal text-chocolate/50">(opcional)</span>
            </legend>
            <div className="flex flex-col gap-1">
                {perros.map((perro) => (
                    <label key={perro.id} className="flex items-center gap-2 text-sm text-chocolate">
                        <input
                            type="checkbox"
                            name="perrosAdicionales"
                            value={perro.id}
                            className="h-4 w-4 accent-chocolate"
                        />
                        {perro.nombre}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
