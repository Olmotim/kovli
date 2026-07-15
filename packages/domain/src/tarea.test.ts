import { describe, expect, it } from "vitest";
import { inicioDelDia, resumenRutinasHoy } from "./tarea";

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
