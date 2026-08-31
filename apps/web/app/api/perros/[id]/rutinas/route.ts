import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@kovli/db";
import { inicioDelDia, tocaHoy } from "@kovli/domain";

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

  // Mismo patrón que las demás APIs del móvil (021/022): cliente sin
  // cookies, creado dentro del handler.
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

  const hoy = new Date();

  // Mismo include que la ficha web (apps/web/app/cuenta/perros/[id]/page.tsx):
  // solo la marca de hoy, para no traer todo el historial.
  const todasLasTareas = await prisma.tarea.findMany({
    where: { perroId: perro.id, activa: true },
    orderBy: { orden: "asc" },
    include: { completadas: { where: { fecha: inicioDelDia(hoy) } } },
  });

  // Filtrado por día de la semana en memoria, no en el where de Prisma —
  // mismo motivo que en la web: no hay forma simple de expresar "el array
  // está vacío o incluye este valor" en una sola consulta.
  const tareasDeHoy = todasLasTareas.filter((tarea) => tocaHoy(tarea.diasSemana, hoy));

  return NextResponse.json({
    tareas: tareasDeHoy.map((tarea) => ({
      id: tarea.id,
      nombre: tarea.nombre,
      hecha: tarea.completadas.length > 0,
    })),
  });
}
