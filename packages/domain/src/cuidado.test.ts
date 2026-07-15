import { describe, expect, it } from "vitest";
import { estadoCuidado, proximoCuidado } from "./cuidado";

const HOY = new Date(2024, 5, 15); // 15 de junio de 2024

function diasDespuesDeHoy(dias: number): Date {
  return new Date(HOY.getTime() + dias * 24 * 60 * 60 * 1000);
}

describe("estadoCuidado", () => {
  it("es vencido si la fecha ya ha pasado", () => {
    expect(estadoCuidado(diasDespuesDeHoy(-1), HOY)).toBe("vencido");
  });

  it("es próximo si la fecha es hoy mismo", () => {
    expect(estadoCuidado(HOY, HOY)).toBe("proximo");
  });

  it("es próximo hasta 30 días vista, inclusive", () => {
    expect(estadoCuidado(diasDespuesDeHoy(30), HOY)).toBe("proximo");
  });

  it("es lejano a partir del día 31", () => {
    expect(estadoCuidado(diasDespuesDeHoy(31), HOY)).toBe("lejano");
  });
});

describe("proximoCuidado", () => {
  it("devuelve null si no hay cuidados", () => {
    expect(proximoCuidado([], HOY)).toBeNull();
  });

  it("devuelve null si todos los cuidados son lejanos", () => {
    const cuidados = [{ fecha: diasDespuesDeHoy(60) }, { fecha: diasDespuesDeHoy(90) }];
    expect(proximoCuidado(cuidados, HOY)).toBeNull();
  });

  it("prioriza el vencido más antiguo sobre cualquier próximo", () => {
    const vencidoAntiguo = { fecha: diasDespuesDeHoy(-10) };
    const vencidoReciente = { fecha: diasDespuesDeHoy(-1) };
    const proximo = { fecha: diasDespuesDeHoy(5) };

    expect(proximoCuidado([proximo, vencidoReciente, vencidoAntiguo], HOY)).toBe(vencidoAntiguo);
  });

  it("sin vencidos, devuelve el próximo más cercano", () => {
    const lejano = { fecha: diasDespuesDeHoy(60) };
    const cercano = { fecha: diasDespuesDeHoy(2) };
    const medio = { fecha: diasDespuesDeHoy(10) };

    expect(proximoCuidado([lejano, medio, cercano], HOY)).toBe(cercano);
  });
});
