type CampoFormularioProps = {
    label: string;
    name: string;
    type?: string;
    autoComplete?: string;
    errores?: string[];
};

export default function CampoFormulario({
    label,
    name,
    type = "text",
    autoComplete,
    errores,
}: CampoFormularioProps) {
    const tieneError = Boolean(errores && errores.length > 0);

    return (
        <div>
            <label htmlFor={name} className="mb-1 block text-sm font-semibold text-chocolate">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required
                aria-invalid={tieneError || undefined}
                aria-describedby={tieneError ? `${name}-error` : undefined}
                className="w-full rounded-sm border border-chocolate/30 bg-crema px-4 py-2 text-chocolate placeholder:text-chocolate/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chocolate"
            />
            {errores && errores.length > 0 && (
                <p id={`${name}-error`} className="mt-1 text-sm text-red-800">
                    {errores[0]}
                </p>
            )}
        </div>
    );
}
