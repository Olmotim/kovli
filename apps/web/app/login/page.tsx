import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
    title: "Iniciar sesión | Kovli",
    description: "Inicia sesión en tu cuenta de Kovli.",
};

type LoginPageProps = {
    searchParams: Promise<{ mensaje?: string; error?: string }>;
};

const AVISOS: Record<string, string> = {
    "contrasena-actualizada": "Contraseña actualizada. Inicia sesión con tu nueva contraseña.",
};

const ERRORES: Record<string, string> = {
    "enlace-invalido": "Ese enlace no es válido o ha caducado. Inténtalo de nuevo.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { mensaje, error } = await searchParams;
    const avisoInicial = (mensaje && AVISOS[mensaje]) || (error && ERRORES[error]) || undefined;

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-md mx-auto px-6">
                <h1 className="text-chocolate text-3xl sm:text-4xl font-bold">Inicia sesión</h1>
                <LoginForm avisoInicial={avisoInicial} />
            </div>
        </section>
    );
}
