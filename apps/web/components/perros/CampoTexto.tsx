type CampoTextoProps = {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    defaultValue?: string;
    max?: string;
    step?: string;
    errores?: string[];
};

export default function CampoTexto({
    label,
    name,
    type = "text",
    required = false,
    defaultValue,
    max,
    step,
    errores,
}: CampoTextoProps) {
    const tieneError = Boolean(errores && errores.length > 0);

    return (
        <div>
            <label htmlFor={name} className="mb-1 block text-sm font-semibold text-chocolate">
                {label}
                {!required && <span className="ml-1 font-normal text-chocolate/50">(opcional)</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                defaultValue={defaultValue}
                max={max}
                step={step}
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
