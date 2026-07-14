"use client";

import { useActionState } from "react";
import Link from "next/link";
import { iniciarSesionAction, type AuthFormState } from "@/lib/actions/auth";
import CampoFormulario from "@/components/auth/CampoFormulario";
import BotonEnviar from "@/components/auth/BotonEnviar";

const ESTADO_INICIAL: AuthFormState = { success: false };

type LoginFormProps = {
    avisoInicial?: string;
};

export default function LoginForm({ avisoInicial }: LoginFormProps) {
    const [estado, formAction] = useActionState(iniciarSesionAction, ESTADO_INICIAL);

    return (
        <>
            {avisoInicial && !estado.message && (
                <p className="mt-6 text-sm text-chocolate/80" role="status">
                    {avisoInicial}
                </p>
            )}

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
                    autoComplete="current-password"
                    errores={estado.errors?.password}
                />

                {estado.message && (
                    <p className="text-sm text-red-800" role="alert">
                        {estado.message}
                    </p>
                )}

                <BotonEnviar>Iniciar sesión</BotonEnviar>
            </form>

            <div className="mt-6 flex flex-col gap-2 text-sm text-chocolate/80">
                <Link href="/recuperar-contrasena" className="font-semibold text-cafe hover:text-apricot">
                    ¿Olvidaste tu contraseña?
                </Link>
                <p>
                    ¿No tienes cuenta?{" "}
                    <Link href="/registro" className="font-semibold text-cafe hover:text-apricot">
                        Regístrate
                    </Link>
                </p>
            </div>
        </>
    );
}
