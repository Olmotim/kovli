import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@kovli/db";
import { estadoCuidado } from "@kovli/domain";

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

  // Mismo patrón que GET /api/perros (feature 021): cliente sin cookies,
  // creado dentro del handler (no a nivel de módulo) para que Next.js no lo
  // evalúe durante el build sin las variables de entorno todavía disponibles.
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

  // findFirst con usuarioId, no solo el id: sin esto, un id de otro usuario
  // en la URL daría acceso a sus cuidados. Mismo criterio que la ficha web
  // (apps/web/app/cuenta/perros/[id]/page.tsx).
  const perro = await prisma.perro.findFirst({
    where: { id, usuarioId: user.id },
  });

  if (!perro) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const cuidados = await prisma.cuidado.findMany({
    where: { perroId: perro.id },
    orderBy: { fecha: "asc" },
  });

  // Mismo criterio que la ficha web: próximos = toda fecha futura (sin
  // ventana de días), historial = todo lo pasado, más reciente primero.
  const hoy = new Date();
  const proximos = cuidados.filter((cuidado) => cuidado.fecha >= hoy);
  const historial = cuidados.filter((cuidado) => cuidado.fecha < hoy).reverse();

  function serializar(cuidado: (typeof cuidados)[number]) {
    return {
      id: cuidado.id,
      tipo: cuidado.tipo,
      tipoLibre: cuidado.tipoLibre,
      fecha: cuidado.fecha.toISOString(),
      notas: cuidado.notas,
      // Calculado aquí (no en el cliente móvil) para no reimplementar la
      // lógica de fechas de packages/domain en React Native.
      estado: estadoCuidado(cuidado.fecha, hoy),
    };
  }

  return NextResponse.json({
    perro: { id: perro.id, nombre: perro.nombre },
    proximos: proximos.map(serializar),
    historial: historial.map(serializar),
  });
}
