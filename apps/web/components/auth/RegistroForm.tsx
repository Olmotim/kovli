"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registrarAction, type AuthFormState } from "@/lib/actions/auth";
import CampoFormulario from "@/components/auth/CampoFormulario";
import BotonEnviar from "@/components/auth/BotonEnviar";

const ESTADO_INICIAL: AuthFormState = { success: false };

export default function RegistroForm() {
    const [estado, formAction] = useActionState(registrarAction, ESTADO_INICIAL);

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
                <CampoFormulario
                    label="Contraseña"
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

                <BotonEnviar>Crear cuenta</BotonEnviar>
            </form>

            <p className="mt-6 text-sm text-chocolate/80">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="font-semibold text-cafe hover:text-apricot">
                    Inicia sesión
                </Link>
            </p>
        </>
    );
}
