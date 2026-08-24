// Lunes como primer día de la semana (convención España/Argentina), a
// diferencia de Date.getDay() (0 = domingo). (getDay() + 6) % 7 desplaza
// el domingo al final: lunes queda en 0.
function inicioSemana(fecha: Date): Date {
  const desplazamiento = (fecha.getDay() + 6) % 7;
  const resultado = new Date(fecha);
  resultado.setDate(resultado.getDate() - desplazamiento);
  return resultado;
}

// Los días de la cuadrícula del calendario mensual: el mes pedido más el
// relleno de días del mes anterior/siguiente necesario para completar
// semanas enteras (siempre un múltiplo de 7), para que la vista sea una
// rejilla regular en vez de una fila incompleta al principio o al final.
// mes es 0-indexado, igual que Date (0 = enero), no 1-indexado.
export function diasDelMes(anio: number, mes: number): Date[] {
  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0);

  const inicio = inicioSemana(primerDia);
  const fin = inicioSemana(ultimoDia);
  fin.setDate(fin.getDate() + 6);

  // Se avanza con setDate() sobre una copia, no sumando milisegundos: un
  // día no siempre son 24h exactas (cambio de horario de verano/invierno),
  // y sumar milisegundos podría saltarse un día o repetirlo justo en esa
  // fecha.
  const dias: Date[] = [];
  const cursor = new Date(inicio);
  while (cursor.getTime() <= fin.getTime()) {
    dias.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dias;
}
