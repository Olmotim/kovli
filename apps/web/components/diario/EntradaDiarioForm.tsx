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
};

type EntradaDiarioFormProps = {
    accion: (prevState: EntradaDiarioFormState, formData: FormData) => Promise<EntradaDiarioFormState>;
    textoBoton: string;
    valoresIniciales?: EntradaDiarioValoresIniciales;
};

export default function EntradaDiarioForm({ accion, textoBoton, valoresIniciales }: EntradaDiarioFormProps) {
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

            <CampoFotosDiario fotosActuales={valoresIniciales?.fotos} />

            {estado.message && (
                <p className="text-sm text-red-800" role="alert">
                    {estado.message}
                </p>
            )}

            <BotonEnviar>{textoBoton}</BotonEnviar>
        </form>
    );
}
