import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calcularEdadEnAnios } from "./perro";

// calcularEdadEnAnios usa new Date() por dentro (no recibe "hoy" como
// parámetro, a diferencia de las funciones de cuidado.ts) — hay que fijar
// el reloj del sistema para que el test no dependa del día en que se ejecute.
describe("calcularEdadEnAnios", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 15)); // 15 de junio de 2024
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("devuelve null si no hay fecha de nacimiento", () => {
    expect(calcularEdadEnAnios(null)).toBeNull();
    expect(calcularEdadEnAnios(undefined)).toBeNull();
  });

  it("cuenta el cumpleaños de hoy como ya cumplido", () => {
    expect(calcularEdadEnAnios(new Date(2020, 5, 15))).toBe(4);
  });

  it("resta un año si el cumpleaños de este año todavía no ha llegado", () => {
    expect(calcularEdadEnAnios(new Date(2020, 5, 16))).toBe(3);
  });

  it("no resta si el cumpleaños de este año ya ha pasado", () => {
    expect(calcularEdadEnAnios(new Date(2020, 5, 14))).toBe(4);
  });
});
