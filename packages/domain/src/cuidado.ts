const MS_POR_DIA = 24 * 60 * 60 * 1000;

export type EstadoCuidado = "vencido" | "proximo" | "lejano";

// hoy se recibe como parámetro (con valor por defecto) en vez de leer
// new Date() dentro de la función, para poder probarla sin depender del reloj.
// diasParaProximo también es parámetro: la interfaz usa 30 días, el email
// de recordatorios (feature 017) usa una ventana más corta (7).
export function estadoCuidado(
  fecha: Date,
  hoy = new Date(),
  diasParaProximo = 30,
): EstadoCuidado {
  if (fecha < hoy) return "vencido";

  const diasHastaCuidado = (fecha.getTime() - hoy.getTime()) / MS_POR_DIA;
  if (diasHastaCuidado <= diasParaProximo) return "proximo";

  return "lejano";
}

export function proximoCuidado<T extends { fecha: Date }>(
  cuidados: T[],
  hoy = new Date(),
): T | null {
  let vencidoMasAntiguo: T | null = null;
  let proximoMasCercano: T | null = null;

  for (const cuidado of cuidados) {
    const estado = estadoCuidado(cuidado.fecha, hoy);

    if (estado === "vencido") {
      if (!vencidoMasAntiguo || cuidado.fecha < vencidoMasAntiguo.fecha) {
        vencidoMasAntiguo = cuidado;
      }
    } else if (estado === "proximo") {
      if (!proximoMasCercano || cuidado.fecha < proximoMasCercano.fecha) {
        proximoMasCercano = cuidado;
      }
    }
  }

  return vencidoMasAntiguo ?? proximoMasCercano;
}

// Para el digest de email (feature 017): a diferencia de proximoCuidado
// (que devuelve solo el más urgente, para la vista resumida de /cuenta),
// aquí hace falta la lista completa de lo pendiente.
export function cuidadosPendientes<T extends { fecha: Date }>(
  cuidados: T[],
  hoy = new Date(),
  diasParaProximo = 7,
): { vencidos: T[]; proximos: T[] } {
  const vencidos: T[] = [];
  const proximos: T[] = [];

  for (const cuidado of cuidados) {
    const estado = estadoCuidado(cuidado.fecha, hoy, diasParaProximo);
    if (estado === "vencido") vencidos.push(cuidado);
    else if (estado === "proximo") proximos.push(cuidado);
  }

  return { vencidos, proximos };
}

// Para la recurrencia automática (feature 018): la fecha del siguiente
// cuidado de una serie, a partir de la fecha del que acaba de vencer.
// Usa setMonth (no suma días) para que "cada 1 mes" caiga siempre en el
// mismo día del mes siguiente en vez de desplazarse por meses de distinta
// duración. Si ese día no existe en el mes de destino (ej. 31 de enero + 1
// mes), el propio JavaScript hace rodar la fecha al mes de después (3 de
// marzo en vez de 31 de febrero) — comportamiento estándar de Date, no un
// bug de esta función.
export function siguienteFechaRecurrencia(fecha: Date, meses: number): Date {
  const siguiente = new Date(fecha);
  siguiente.setMonth(siguiente.getMonth() + meses);
  return siguiente;
}
