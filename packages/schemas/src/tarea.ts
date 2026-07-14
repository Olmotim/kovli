import { z } from "zod";

export const tareaSchema = z.object({
  nombre: z.string().trim().min(1, "Introduce el nombre de la rutina").max(200, "El nombre es demasiado largo"),
});

export type TareaInput = z.infer<typeof tareaSchema>;
