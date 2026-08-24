import { describe, expect, it } from "vitest";
import { ultimaEntrada } from "./diario";

describe("ultimaEntrada", () => {
  it("devuelve null si no hay entradas", () => {
    expect(ultimaEntrada([])).toBeNull();
  });

  it("devuelve la única entrada si solo hay una", () => {
    const entrada = { fecha: new Date(2024, 5, 15) };
    expect(ultimaEntrada([entrada])).toBe(entrada);
  });

  it("devuelve la de fecha más reciente entre varias, sin importar el orden", () => {
    const antigua = { fecha: new Date(2024, 0, 1) };
    const reciente = { fecha: new Date(2024, 5, 15) };
    const media = { fecha: new Date(2024, 2, 10) };

    expect(ultimaEntrada([antigua, reciente, media])).toBe(reciente);
  });
});
