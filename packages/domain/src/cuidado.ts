const DIAS_PARA_PROXIMO = 30;
const MS_POR_DIA = 24 * 60 * 60 * 1000;

export type EstadoCuidado = "vencido" | "proximo" | "lejano";

// hoy se recibe como parámetro (con valor por defecto) en vez de leer
// new Date() dentro de la función, para poder probarla sin depender del reloj.
export function estadoCuidado(fecha: Date, hoy = new Date()): EstadoCuidado {
  if (fecha < hoy) return "vencido";

  const diasHastaCuidado = (fecha.getTime() - hoy.getTime()) / MS_POR_DIA;
  if (diasHastaCuidado <= DIAS_PARA_PROXIMO) return "proximo";

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
