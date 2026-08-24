import { z } from "zod";

// formData.getAll("diasSemana") siempre llega como array (vacío si no se
// marca ninguna casilla) — 0 = domingo ... 6 = sábado, mismo convenio que
// Date.getDay(). Vacío significa "todos los días" (packages/domain/tocaHoy).
export const tareaSchema = z.object({
  nombre: z.string().trim().min(1, "Introduce el nombre de la rutina").max(200, "El nombre es demasiado largo"),
  diasSemana: z.array(z.coerce.number().int().min(0).max(6)),
});

export type TareaInput = z.infer<typeof tareaSchema>;
