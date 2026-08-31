import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@kovli/db";
import { urlFoto } from "@/lib/storage";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;

  const authHeader = request.headers.get("Authorization");
  const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!accessToken) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // Mismo patrón que las demás APIs del móvil: cliente sin cookies, creado
  // dentro del handler.
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

  const perro = await prisma.perro.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!perro) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const entradas = await prisma.entradaDiario.findMany({
    where: { perroId: perro.id },
    orderBy: { fecha: "desc" },
  });

  return NextResponse.json({
    entradas: entradas.map((entrada) => ({
      id: entrada.id,
      fecha: entrada.fecha.toISOString(),
      texto: entrada.texto,
      etiquetas: entrada.etiquetas,
      // URL pública ya resuelta aquí (mismo patrón que FilaEntradaDiario.tsx
      // en la web) para que el móvil no necesite saber nada del bucket.
      fotos: entrada.fotos.map((path) => urlFoto(path)),
    })),
  });
}
