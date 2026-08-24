// Trunca a medianoche local: tanto al guardar una TareaCompletada como al
// consultar "¿hay marca de hoy?" se pasa por aquí, para que ambos lados
// comparen exactamente el mismo valor sin depender de la hora del día.
export function inicioDelDia(fecha: Date): Date {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

export function resumenRutinasHoy(
  tareas: { completadaHoy: boolean }[],
): { hechas: number; total: number } {
  const hechas = tareas.filter((tarea) => tarea.completadaHoy).length;
  return { hechas, total: tareas.length };
}

// Para el digest de email (feature 017): a diferencia de resumenRutinasHoy
// (que solo cuenta), aquí hace falta la lista de las rutinas sin marcar.
export function tareasSinCompletarHoy<T extends { completadaHoy: boolean }>(
  tareas: T[],
): T[] {
  return tareas.filter((tarea) => !tarea.completadaHoy);
}
