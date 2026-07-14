"use client";

import { useActionState } from "react";
import type { CuidadoFormState } from "@/lib/actions/cuidados";
import BotonEnviar from "@/components/auth/BotonEnviar";
import CampoTexto from "@/components/perros/CampoTexto";
import CampoTextarea from "@/components/perros/CampoTextarea";
import SelectorTipoCuidado from "./SelectorTipoCuidado";

const ESTADO_INICIAL: CuidadoFormState = { success: false };

export type CuidadoValoresIniciales = {
    tipo: string;
    tipoLibre: string;
    fecha: string;
    notas: string;
};

type CuidadoFormProps = {
    accion: (prevState: CuidadoFormState, formData: FormData) => Promise<CuidadoFormState>;
    textoBoton: string;
    valoresIniciales?: CuidadoValoresIniciales;
};

export default function CuidadoForm({ accion, textoBoton, valoresIniciales }: CuidadoFormProps) {
    const [estado, formAction] = useActionState(accion, ESTADO_INICIAL);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-5">
            <SelectorTipoCuidado
                tipoActual={valoresIniciales?.tipo}
                tipoLibreActual={valoresIniciales?.tipoLibre}
                errores={estado.errors?.tipo}
                erroresTipoLibre={estado.errors?.tipoLibre}
            />

            <CampoTexto
                label="Fecha"
                name="fecha"
                type="date"
                required
                defaultValue={valoresIniciales?.fecha}
                errores={estado.errors?.fecha}
            />

            <CampoTextarea
                label="Notas"
                name="notas"
                defaultValue={valoresIniciales?.notas}
                errores={estado.errors?.notas}
            />

            {estado.message && (
                <p className="text-sm text-red-800" role="alert">
                    {estado.message}
                </p>
            )}

            <BotonEnviar>{textoBoton}</BotonEnviar>
        </form>
    );
}
