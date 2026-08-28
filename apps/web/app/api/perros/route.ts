import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@kovli/db";
import { urlFoto } from "@/lib/storage";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!accessToken) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // Cliente sin cookies (a diferencia de lib/supabase/server.ts, pensado
  // para la web): la app móvil no tiene sesión de navegador, manda el
  // access_token directo en la cabecera Authorization. Se crea aquí
  // dentro (no a nivel de módulo) por la misma razón que el cliente de
  // Resend en la 017: Next.js/Turborepo puede evaluar el módulo durante
  // el build sin las variables de entorno todavía disponibles.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const perros = await prisma.perro.findMany({
    where: { usuarioId: user.id },
    orderBy: { nombre: "asc" },
  });

  return NextResponse.json({
    perros: perros.map((perro) => ({
      id: perro.id,
      nombre: perro.nombre,
      raza: perro.raza,
      fotoUrl: perro.fotoPath ? urlFoto(perro.fotoPath) : null,
    })),
  });
}
