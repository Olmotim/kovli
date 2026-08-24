const DIAS = [
    { valor: 1, etiqueta: "Lun" },
    { valor: 2, etiqueta: "Mar" },
    { valor: 3, etiqueta: "Mié" },
    { valor: 4, etiqueta: "Jue" },
    { valor: 5, etiqueta: "Vie" },
    { valor: 6, etiqueta: "Sáb" },
    { valor: 0, etiqueta: "Dom" },
];

type CampoDiasSemanaProps = {
    diasActuales?: number[];
};

export default function CampoDiasSemana({ diasActuales = [] }: CampoDiasSemanaProps) {
    return (
        <fieldset>
            <legend className="mb-1 block text-sm font-semibold text-chocolate">
                Días de la semana{" "}
                <span className="ml-1 font-normal text-chocolate/50">(sin marcar ninguno = todos los días)</span>
            </legend>
            <div className="flex flex-wrap gap-2">
                {DIAS.map((dia) => (
                    <label
                        key={dia.valor}
                        className="flex items-center gap-1.5 rounded-sm border border-chocolate/30 bg-crema px-3 py-1.5 text-sm text-chocolate has-checked:border-chocolate has-checked:bg-chocolate has-checked:text-crema"
                    >
                        <input
                            type="checkbox"
                            name="diasSemana"
                            value={dia.valor}
                            defaultChecked={diasActuales.includes(dia.valor)}
                            className="sr-only"
                        />
                        {dia.etiqueta}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
