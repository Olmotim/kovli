"use client";

import { useActionState } from "react";
import Link from "next/link";
import { solicitarRecuperacionAction, type AuthFormState } from "@/lib/actions/auth";
import CampoFormulario from "@/components/auth/CampoFormulario";
import BotonEnviar from "@/components/auth/BotonEnviar";

const ESTADO_INICIAL: AuthFormState = { success: false };

export default function RecuperarContrasenaForm() {
    const [estado, formAction] = useActionState(solicitarRecuperacionAction, ESTADO_INICIAL);

    if (estado.success) {
        return (
            <p className="mt-8 text-chocolate/90" role="status">
                {estado.message}
            </p>
        );
    }

    return (
        <>
            <form action={formAction} className="mt-8 flex flex-col gap-5">
                <CampoFormulario
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    errores={estado.errors?.email}
                />

                {estado.message && (
                    <p className="text-sm text-red-800" role="alert">
                        {estado.message}
                    </p>
                )}

                <BotonEnviar>Enviar enlace de recuperación</BotonEnviar>
            </form>

            <p className="mt-6 text-sm text-chocolate/80">
                <Link href="/login" className="font-semibold text-cafe hover:text-apricot">
                    ← Volver a iniciar sesión
                </Link>
            </p>
        </>
    );
}
