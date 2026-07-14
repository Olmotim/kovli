import { estadoCuidado } from "@kovli/domain";

const ETIQUETAS_TIPO: Record<string, string> = {
    VACUNA: "Vacuna",
    DESPARASITACION: "Desparasitación",
    REVISION: "Revisión veterinaria",
    OTRO: "Otro",
};

type CuidadoBasico = { tipo: string; tipoLibre: string | null };

export function etiquetaTipoCuidado(cuidado: CuidadoBasico): string {
    if (cuidado.tipo === "OTRO" && cuidado.tipoLibre) return cuidado.tipoLibre;
    return ETIQUETAS_TIPO[cuidado.tipo] ?? cuidado.tipo;
}

const MS_POR_DIA = 24 * 60 * 60 * 1000;

// Formato neutro ("· vencido" / "· en 5 días") en vez de concordar género con
// la etiqueta (vacuna vencida vs. tipo libre vencido) — evita ese problema.
export function resumenProximoCuidado(
    cuidado: CuidadoBasico & { fecha: Date },
    hoy = new Date(),
): string {
    const etiqueta = etiquetaTipoCuidado(cuidado);

    if (estadoCuidado(cuidado.fecha, hoy) === "vencido") {
        return `${etiqueta} · vencido`;
    }

    const dias = Math.ceil((cuidado.fecha.getTime() - hoy.getTime()) / MS_POR_DIA);
    if (dias <= 0) return `${etiqueta} · hoy`;
    if (dias === 1) return `${etiqueta} · mañana`;
    return `${etiqueta} · en ${dias} días`;
}
