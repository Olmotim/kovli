import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@kovli/db";
import { inicioDelDia } from "@kovli/domain";

type RouteContext = {
  params: Promise<{ id: string; tareaId: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  const { id, tareaId } = await params;

  const authHeader = request.headers.get("Authorization");
  const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!accessToken) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

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

  // Las tres comprobaciones en un único where (id de la rutina, que sea de
  // este perro, y que el perro sea de este usuario) — igual de estricto que
  // marcarTareaAction en la web, aquí además comprobando el perroId de la
  // URL porque la ruta lo expone como parámetro propio.
  const tarea = await prisma.tarea.findFirst({
    where: { id: tareaId, perroId: id, usuarioId: user.id },
  });

  if (!tarea) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const hoy = inicioDelDia(new Date());

  const completadaHoy = await prisma.tareaCompletada.findUnique({
    where: { tareaId_fecha: { tareaId, fecha: hoy } },
  });

  if (completadaHoy) {
    await prisma.tareaCompletada.delete({ where: { id: completadaHoy.id } });
  } else {
    await prisma.tareaCompletada.create({ data: { tareaId, fecha: hoy } });
  }

  return NextResponse.json({ hecha: !completadaHoy });
}
