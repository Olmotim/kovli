import { z } from "zod";

const vacioAIndefinido = (valor: unknown) => (valor === "" ? undefined : valor);

export const cuidadoSchema = z
  .object({
    tipo: z.enum(["VACUNA", "DESPARASITACION", "REVISION", "OTRO"], {
      message: "Elige un tipo de cuidado",
    }),
    tipoLibre: z.preprocess(
      vacioAIndefinido,
      z.string().trim().max(100, "El tipo es demasiado largo").optional(),
    ),
    fecha: z.coerce.date({ message: "Introduce una fecha" }),
    notas: z.preprocess(
      vacioAIndefinido,
      z.string().trim().max(2000, "Las notas son demasiado largas").optional(),
    ),
  })
  .refine((datos) => datos.tipo !== "OTRO" || Boolean(datos.tipoLibre), {
    message: "Escribe de qué tipo de cuidado se trata",
    path: ["tipoLibre"],
  });

export type CuidadoInput = z.infer<typeof cuidadoSchema>;
