// null cuando no se conoce la fecha de nacimiento — no es un error, es un
// perro adoptado sin fecha exacta (decisión de la feature 012).
export function calcularEdadEnAnios(
  fechaNacimiento: Date | null | undefined,
): number | null {
  if (!fechaNacimiento) return null;

  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

  const aunNoCumpleAnios =
    hoy.getMonth() < fechaNacimiento.getMonth() ||
    (hoy.getMonth() === fechaNacimiento.getMonth() &&
      hoy.getDate() < fechaNacimiento.getDate());

  if (aunNoCumpleAnios) edad -= 1;

  return edad;
}
