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
