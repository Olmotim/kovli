"use client";

import { useActionState } from "react";
import { establecerNuevaContrasenaAction, type AuthFormState } from "@/lib/actions/auth";
import CampoFormulario from "@/components/auth/CampoFormulario";
import BotonEnviar from "@/components/auth/BotonEnviar";

const ESTADO_INICIAL: AuthFormState = { success: false };

export default function RestablecerContrasenaForm() {
    const [estado, formAction] = useActionState(establecerNuevaContrasenaAction, ESTADO_INICIAL);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-5">
            <CampoFormulario
                label="Nueva contraseña"
                name="password"
                type="password"
                autoComplete="new-password"
                errores={estado.errors?.password}
            />
            <CampoFormulario
                label="Repite la contraseña"
                name="confirmarPassword"
                type="password"
                autoComplete="new-password"
                errores={estado.errors?.confirmarPassword}
            />

            {estado.message && (
                <p className="text-sm text-red-800" role="alert">
                    {estado.message}
                </p>
            )}

            <BotonEnviar>Guardar nueva contraseña</BotonEnviar>
        </form>
    );
}
