"use client";

import { useActionState } from "react";
import { cambiarContrasenaAction, type PerfilFormState } from "@/lib/actions/perfil";
import CampoFormulario from "@/components/auth/CampoFormulario";
import BotonEnviar from "@/components/auth/BotonEnviar";

const ESTADO_INICIAL: PerfilFormState = { success: false };

export default function CambiarContrasenaForm() {
    const [estado, formAction] = useActionState(cambiarContrasenaAction, ESTADO_INICIAL);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-5">
            <CampoFormulario
                label="Contraseña actual"
                name="passwordActual"
                type="password"
                autoComplete="current-password"
                errores={estado.errors?.passwordActual}
            />
            <CampoFormulario
                label="Contraseña nueva"
                name="passwordNueva"
                type="password"
                autoComplete="new-password"
                errores={estado.errors?.passwordNueva}
            />
            <CampoFormulario
                label="Repite la contraseña nueva"
                name="confirmarPassword"
                type="password"
                autoComplete="new-password"
                errores={estado.errors?.confirmarPassword}
            />

            {estado.message && (
                <p
                    className={estado.success ? "text-sm text-chocolate" : "text-sm text-red-800"}
                    role={estado.success ? "status" : "alert"}
                >
                    {estado.message}
                </p>
            )}

            <BotonEnviar>Cambiar contraseña</BotonEnviar>
        </form>
    );
}
