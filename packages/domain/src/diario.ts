// Para el resumen en /cuenta (feature 020): la entrada más reciente de un
// perro, o null si todavía no tiene ninguna — mismo espíritu que
// proximoCuidado() de cuidado.ts, una función pura sobre una lista.
export function ultimaEntrada<T extends { fecha: Date }>(entradas: T[]): T | null {
  let masReciente: T | null = null;

  for (const entrada of entradas) {
    if (!masReciente || entrada.fecha > masReciente.fecha) {
      masReciente = entrada;
    }
  }

  return masReciente;
}
