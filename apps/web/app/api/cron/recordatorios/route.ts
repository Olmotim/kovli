import { NextResponse } from "next/server";
import { prisma } from "@kovli/db";
import { cuidadosPendientes, inicioDelDia, tareasSinCompletarHoy } from "@kovli/domain";
import { resumenProximoCuidado } from "@/lib/cuidados";
import { enviarDigest } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type PerroConPendientes = Awaited<ReturnType<typeof cargarPerros>>[number];

async function cargarPerros(hoy: Date) {
  return prisma.perro.findMany({
    include: {
      cuidados: true,
      tareas: { include: { completadas: { where: { fecha: hoy } } } },
    },
  });
}

function seccionPerro(perro: PerroConPendientes, hoy: Date): string | null {
  const { vencidos, proximos } = cuidadosPendientes(perro.cuidados, hoy, 7);
  const rutinasPendientes = tareasSinCompletarHoy(
    perro.tareas.map((tarea) => ({ ...tarea, completadaHoy: tarea.completadas.length > 0 })),
  );

  if (vencidos.length === 0 && proximos.length === 0 && rutinasPendientes.length === 0) {
    return null;
  }

  const lineas = [`${perro.nombre}:`];

  for (const cuidado of [...vencidos, ...proximos]) {
    lineas.push(`  - ${resumenProximoCuidado(cuidado, hoy)}`);
  }
  for (const tarea of rutinasPendientes) {
    lineas.push(`  - ${tarea.nombre} · rutina de hoy sin marcar`);
  }

  return lineas.join("\n");
}

export async function GET(request: Request) {
  const secreto = request.headers.get("Authorization");
  if (secreto !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const hoy = inicioDelDia(new Date());
  const perros = await cargarPerros(hoy);

  const perrosPorUsuario = new Map<string, PerroConPendientes[]>();
  for (const perro of perros) {
    const lista = perrosPorUsuario.get(perro.usuarioId) ?? [];
    lista.push(perro);
    perrosPorUsuario.set(perro.usuarioId, lista);
  }

  const supabaseAdmin = createAdminClient();
  let enviados = 0;
  let sinPendientes = 0;
  let errores = 0;

  for (const [usuarioId, perrosDelUsuario] of perrosPorUsuario) {
    const secciones = perrosDelUsuario
      .map((perro) => seccionPerro(perro, hoy))
      .filter((seccion) => seccion !== null);

    if (secciones.length === 0) {
      sinPendientes += 1;
      continue;
    }

    try {
      const { data, error } = await supabaseAdmin.auth.admin.getUserById(usuarioId);
      if (error || !data.user?.email) {
        errores += 1;
        continue;
      }

      const texto = [
        "Esto es lo que tienes pendiente hoy en Kovli:",
        "",
        ...secciones,
        "",
        "Entra en https://kovli.vercel.app/cuenta para verlo con más detalle.",
      ].join("\n");

      await enviarDigest(data.user.email, "Tienes pendientes en Kovli", texto);
      enviados += 1;
    } catch {
      errores += 1;
    }
  }

  return NextResponse.json({ enviados, sinPendientes, errores });
}
