"use client";

import { useActionState } from "react";
import type { CuidadoFormState } from "@/lib/actions/cuidados";
import BotonEnviar from "@/components/auth/BotonEnviar";
import CampoTexto from "@/components/perros/CampoTexto";
import CampoTextarea from "@/components/perros/CampoTextarea";
import CampoArchivosCuidado from "./CampoArchivosCuidado";
import CampoPerrosAdicionales from "./CampoPerrosAdicionales";
import SelectorTipoCuidado from "./SelectorTipoCuidado";

const ESTADO_INICIAL: CuidadoFormState = { success: false };

export type CuidadoValoresIniciales = {
    tipo: string;
    tipoLibre: string;
    fecha: string;
    notas: string;
    repiteCadaMeses: string;
    archivos: string[];
};

type CuidadoFormProps = {
    accion: (prevState: CuidadoFormState, formData: FormData) => Promise<CuidadoFormState>;
    textoBoton: string;
    valoresIniciales?: CuidadoValoresIniciales;
    // Solo tiene sentido al crear: al editar, "aplicar también a" duplicaría
    // el cuidado, en vez de modificar el que ya existe.
    otrosPerros?: { id: string; nombre: string }[];
};

export default function CuidadoForm({ accion, textoBoton, valoresIniciales, otrosPerros }: CuidadoFormProps) {
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

            <CampoTexto
                label="Se repite cada (meses)"
                name="repiteCadaMeses"
                type="number"
                min="1"
                max="60"
                defaultValue={valoresIniciales?.repiteCadaMeses}
                errores={estado.errors?.repiteCadaMeses}
            />

            <CampoTextarea
                label="Notas"
                name="notas"
                defaultValue={valoresIniciales?.notas}
                errores={estado.errors?.notas}
            />

            <CampoArchivosCuidado archivosActuales={valoresIniciales?.archivos} />

            {otrosPerros && <CampoPerrosAdicionales perros={otrosPerros} />}

            {estado.message && (
                <p className="text-sm text-red-800" role="alert">
                    {estado.message}
                </p>
            )}

            <BotonEnviar>{textoBoton}</BotonEnviar>
        </form>
    );
}
