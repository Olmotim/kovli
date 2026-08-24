"use client";

import { useActionState } from "react";
import type { TareaFormState } from "@/lib/actions/tareas";
import BotonEnviar from "@/components/auth/BotonEnviar";
import CampoTexto from "@/components/perros/CampoTexto";
import CampoDiasSemana from "./CampoDiasSemana";

const ESTADO_INICIAL: TareaFormState = { success: false };

type TareaFormProps = {
    accion: (prevState: TareaFormState, formData: FormData) => Promise<TareaFormState>;
    textoBoton: string;
    nombreActual?: string;
    diasSemanaActuales?: number[];
};

export default function TareaForm({ accion, textoBoton, nombreActual, diasSemanaActuales }: TareaFormProps) {
    const [estado, formAction] = useActionState(accion, ESTADO_INICIAL);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-5">
            <CampoTexto
                label="Nombre de la rutina"
                name="nombre"
                required
                defaultValue={nombreActual}
                errores={estado.errors?.nombre}
            />

            <CampoDiasSemana diasActuales={diasSemanaActuales} />

            {estado.message && (
                <p className="text-sm text-red-800" role="alert">
                    {estado.message}
                </p>
            )}

            <BotonEnviar>{textoBoton}</BotonEnviar>
        </form>
    );
}
