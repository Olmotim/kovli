import { describe, expect, it } from "vitest";
import { inicioDelDia, resumenRutinasHoy, tareasSinCompletarHoy, tocaHoy } from "./tarea";

describe("inicioDelDia", () => {
  it("trunca la hora, dejando solo el día", () => {
    const conHora = new Date(2024, 5, 15, 18, 45, 30, 500);
    expect(inicioDelDia(conHora)).toEqual(new Date(2024, 5, 15, 0, 0, 0, 0));
  });
});

describe("resumenRutinasHoy", () => {
  it("devuelve 0/0 si no hay rutinas", () => {
    expect(resumenRutinasHoy([])).toEqual({ hechas: 0, total: 0 });
  });

  it("cuenta solo las marcadas como hechas hoy", () => {
    const tareas = [
      { completadaHoy: true },
      { completadaHoy: false },
      { completadaHoy: true },
    ];
    expect(resumenRutinasHoy(tareas)).toEqual({ hechas: 2, total: 3 });
  });
});

describe("tareasSinCompletarHoy", () => {
  it("devuelve solo las que faltan por marcar", () => {
    const sinMarcar = { completadaHoy: false };
    const tareas = [{ completadaHoy: true }, sinMarcar];
    expect(tareasSinCompletarHoy(tareas)).toEqual([sinMarcar]);
  });

  it("devuelve una lista vacía si ya están todas hechas", () => {
    expect(tareasSinCompletarHoy([{ completadaHoy: true }])).toEqual([]);
  });
});

describe("tocaHoy", () => {
  const SABADO = new Date(2024, 5, 15); // 15 de junio de 2024, sábado (getDay() === 6)

  it("un array vacío significa todos los días", () => {
    expect(tocaHoy([], SABADO)).toBe(true);
  });

  it("es true si el día de hoy está en la lista", () => {
    expect(tocaHoy([0, 6], SABADO)).toBe(true); // domingo y sábado
  });

  it("es false si el día de hoy no está en la lista", () => {
    expect(tocaHoy([1, 2, 3, 4, 5], SABADO)).toBe(false); // solo entre semana
  });
});
