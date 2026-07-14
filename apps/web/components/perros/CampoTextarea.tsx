type CampoTextareaProps = {
    label: string;
    name: string;
    defaultValue?: string;
    errores?: string[];
};

export default function CampoTextarea({ label, name, defaultValue, errores }: CampoTextareaProps) {
    const tieneError = Boolean(errores && errores.length > 0);

    return (
        <div>
            <label htmlFor={name} className="mb-1 block text-sm font-semibold text-chocolate">
                {label}
                <span className="ml-1 font-normal text-chocolate/50">(opcional)</span>
            </label>
            <textarea
                id={name}
                name={name}
                rows={4}
                defaultValue={defaultValue}
                aria-invalid={tieneError || undefined}
                aria-describedby={tieneError ? `${name}-error` : undefined}
                className="w-full rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate placeholder:text-chocolate/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            />
            {tieneError && (
                <p id={`${name}-error`} className="mt-1 text-sm text-red-800">
                    {errores![0]}
                </p>
            )}
        </div>
    );
}
