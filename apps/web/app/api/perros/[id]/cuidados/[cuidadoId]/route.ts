import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@kovli/db";
import { estadoCuidado } from "@kovli/domain";
import { cuidadoSchema } from "@kovli/schemas";

type RouteContext = {
  params: Promise<{ id: string; cuidadoId: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id, cuidadoId } = await params;

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

  // Las tres comprobaciones en un único where (id del cuidado, que sea de
  // este perro, y que el perro sea de este usuario) — mismo criterio que
  // el endpoint de marcar rutinas (023): un id manipulado a mano en la URL
  // no permite tocar el cuidado de otro perro o usuario.
  const cuidadoExistente = await prisma.cuidado.findFirst({
    where: { id: cuidadoId, perroId: id, usuarioId: user.id },
  });

  if (!cuidadoExistente) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const body = await request.json();

  const parsed = cuidadoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const cuidado = await prisma.cuidado.update({
    where: { id: cuidadoId },
    data: {
      tipo: parsed.data.tipo,
      tipoLibre: parsed.data.tipoLibre ?? null,
      fecha: parsed.data.fecha,
      notas: parsed.data.notas ?? null,
    },
  });

  return NextResponse.json({
    id: cuidado.id,
    tipo: cuidado.tipo,
    tipoLibre: cuidado.tipoLibre,
    fecha: cuidado.fecha.toISOString(),
    notas: cuidado.notas,
    estado: estadoCuidado(cuidado.fecha),
  });
}
