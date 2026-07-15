"use client";

import { useActionState } from "react";
import { actualizarPerfilAction, type PerfilFormState } from "@/lib/actions/perfil";
import CampoTexto from "@/components/perros/CampoTexto";
import BotonEnviar from "@/components/auth/BotonEnviar";
import CampoAvatar from "./CampoAvatar";

const ESTADO_INICIAL: PerfilFormState = { success: false };

type PerfilFormProps = {
    nombre?: string;
    avatarUrl?: string;
};

export default function PerfilForm({ nombre, avatarUrl }: PerfilFormProps) {
    const [estado, formAction] = useActionState(actualizarPerfilAction, ESTADO_INICIAL);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-5">
            <CampoTexto
                label="Nombre"
                name="nombre"
                defaultValue={nombre}
                errores={estado.errors?.nombre}
            />

            <CampoAvatar avatarActualUrl={avatarUrl} />

            {estado.message && (
                <p
                    className={estado.success ? "text-sm text-chocolate" : "text-sm text-red-800"}
                    role={estado.success ? "status" : "alert"}
                >
                    {estado.message}
                </p>
            )}

            <BotonEnviar>Guardar cambios</BotonEnviar>
        </form>
    );
}
