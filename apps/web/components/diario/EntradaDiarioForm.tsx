"use client";

import { useActionState } from "react";
import type { EntradaDiarioFormState } from "@/lib/actions/diario";
import BotonEnviar from "@/components/auth/BotonEnviar";
import CampoTexto from "@/components/perros/CampoTexto";
import CampoTextarea from "@/components/perros/CampoTextarea";
import CampoFotosDiario from "./CampoFotosDiario";

const ESTADO_INICIAL: EntradaDiarioFormState = { success: false };

export type EntradaDiarioValoresIniciales = {
    fecha: string;
    texto: string;
    fotos: string[];
    etiquetas: string[];
};

type EntradaDiarioFormProps = {
    accion: (prevState: EntradaDiarioFormState, formData: FormData) => Promise<EntradaDiarioFormState>;
    textoBoton: string;
    valoresIniciales?: EntradaDiarioValoresIniciales;
    // Solo se pasa al editar una entrada ya guardada, para poder reordenar
    // sus fotos — ver CampoFotosDiario.
    entradaId?: string;
};

export default function EntradaDiarioForm({ accion, textoBoton, valoresIniciales, entradaId }: EntradaDiarioFormProps) {
    const [estado, formAction] = useActionState(accion, ESTADO_INICIAL);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-5">
            <CampoTexto
                label="Fecha"
                name="fecha"
                type="date"
                required
                defaultValue={valoresIniciales?.fecha ?? new Date().toISOString().split("T")[0]}
                errores={estado.errors?.fecha}
            />

            <CampoTextarea
                label="Texto"
                name="texto"
                defaultValue={valoresIniciales?.texto}
                errores={estado.errors?.texto}
            />

            <CampoTexto
                label="Etiquetas"
                name="etiquetas"
                placeholder="paseo, veterinario, playa"
                defaultValue={valoresIniciales?.etiquetas?.join(", ")}
                errores={estado.errors?.etiquetas}
            />

            <CampoFotosDiario fotosActuales={valoresIniciales?.fotos} entradaId={entradaId} />

            {estado.message && (
                <p className="text-sm text-red-800" role="alert">
                    {estado.message}
                </p>
            )}

            <BotonEnviar>{textoBoton}</BotonEnviar>
        </form>
    );
}
