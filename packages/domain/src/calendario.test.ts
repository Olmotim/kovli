import { describe, expect, it } from "vitest";
import { diasDelMes } from "./calendario";

describe("diasDelMes", () => {
  it("devuelve siempre un múltiplo de 7 (semanas completas)", () => {
    const dias = diasDelMes(2024, 5); // junio de 2024
    expect(dias.length % 7).toBe(0);
  });

  it("empieza en lunes y termina en domingo", () => {
    const dias = diasDelMes(2024, 5);
    expect(dias[0].getDay()).toBe(1); // lunes
    expect(dias[dias.length - 1].getDay()).toBe(0); // domingo
  });

  it("junio de 2024 (empieza en sábado) rellena con mayo y ocupa 5 semanas", () => {
    const dias = diasDelMes(2024, 5);
    expect(dias).toHaveLength(35);
    expect(dias[0]).toEqual(new Date(2024, 4, 27)); // lunes 27 de mayo
    expect(dias[dias.length - 1]).toEqual(new Date(2024, 5, 30)); // domingo 30 de junio
  });

  it("agosto de 2026 (empieza en sábado y termina en lunes) ocupa 6 semanas", () => {
    const dias = diasDelMes(2026, 7); // agosto
    expect(dias).toHaveLength(42);
    expect(dias[0]).toEqual(new Date(2026, 6, 27)); // lunes 27 de julio
    expect(dias[dias.length - 1]).toEqual(new Date(2026, 8, 6)); // domingo 6 de septiembre
  });

  it("incluye todos los días del mes pedido", () => {
    const dias = diasDelMes(2024, 3); // abril, 30 días
    const diasDeAbril = dias.filter((dia) => dia.getMonth() === 3);
    expect(diasDeAbril).toHaveLength(30);
  });
});
