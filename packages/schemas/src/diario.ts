import { z } from "zod";

const vacioAIndefinido = (valor: unknown) => (valor === "" ? undefined : valor);

export const entradaDiarioSchema = z.object({
  fecha: z.coerce.date({ message: "Introduce una fecha" }),
  texto: z.preprocess(
    vacioAIndefinido,
    z.string().trim().max(4000, "El texto es demasiado largo").optional(),
  ),
});

export type EntradaDiarioInput = z.infer<typeof entradaDiarioSchema>;
