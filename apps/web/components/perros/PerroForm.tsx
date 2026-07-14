"use client";

import { useActionState } from "react";
import type { PerroFormState } from "@/lib/actions/perros";
import BotonEnviar from "@/components/auth/BotonEnviar";
import CampoFoto from "./CampoFoto";
import CampoTextarea from "./CampoTextarea";
import CampoTexto from "./CampoTexto";
import SelectorRaza from "./SelectorRaza";
import SelectorSexo from "./SelectorSexo";

const ESTADO_INICIAL: PerroFormState = { success: false };

export type PerroValoresIniciales = {
    nombre: string;
    raza: string;
    fechaNacimiento: string;
    sexo: string;
    peso: string;
    notas: string;
    fotoUrl: string;
};

type PerroFormProps = {
    accion: (prevState: PerroFormState, formData: FormData) => Promise<PerroFormState>;
    textoBoton: string;
    valoresIniciales?: PerroValoresIniciales;
};

export default function PerroForm({ accion, textoBoton, valoresIniciales }: PerroFormProps) {
    const [estado, formAction] = useActionState(accion, ESTADO_INICIAL);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-5">
            <CampoTexto
                label="Nombre"
                name="nombre"
                required
                defaultValue={valoresIniciales?.nombre}
                errores={estado.errors?.nombre}
            />

            <SelectorRaza razaActual={valoresIniciales?.raza} errores={estado.errors?.raza} />

            <CampoTexto
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                type="date"
                defaultValue={valoresIniciales?.fechaNacimiento}
                max={new Date().toISOString().split("T")[0]}
                errores={estado.errors?.fechaNacimiento}
            />

            <SelectorSexo defaultValue={valoresIniciales?.sexo} errores={estado.errors?.sexo} />

            <CampoTexto
                label="Peso (kg)"
                name="peso"
                type="number"
                step="0.1"
                defaultValue={valoresIniciales?.peso}
                errores={estado.errors?.peso}
            />

            <CampoTextarea
                label="Notas"
                name="notas"
                defaultValue={valoresIniciales?.notas}
                errores={estado.errors?.notas}
            />

            <CampoFoto fotoActualUrl={valoresIniciales?.fotoUrl || undefined} />

            {estado.message && (
                <p className="text-sm text-red-800" role="alert">
                    {estado.message}
                </p>
            )}

            <BotonEnviar>{textoBoton}</BotonEnviar>
        </form>
    );
}
