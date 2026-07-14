import { z } from "zod";

// Los campos opcionales llegan desde un <input> de formulario como
// cadena vacía ("") cuando el usuario no los rellena, no como ausentes
// — sin este preprocesado, z.coerce los trataría como valores inválidos
// en vez de "sin dato".
const vacioAIndefinido = (valor: unknown) => (valor === "" ? undefined : valor);

export const perroSchema = z.object({
  nombre: z.string().trim().min(1, "Introduce el nombre del perro"),
  raza: z.string().trim().min(1, "Elige o escribe una raza"),
  fechaNacimiento: z.preprocess(
    vacioAIndefinido,
    z.coerce
      .date()
      .max(new Date(), "La fecha de nacimiento no puede ser futura")
      .optional(),
  ),
  sexo: z.preprocess(vacioAIndefinido, z.enum(["MACHO", "HEMBRA"]).optional()),
  peso: z.preprocess(
    vacioAIndefinido,
    z.coerce
      .number()
      .positive("El peso debe ser mayor que 0")
      .max(120, "Revisa el peso, parece demasiado alto")
      .optional(),
  ),
  notas: z.preprocess(
    vacioAIndefinido,
    z.string().trim().max(2000, "Las notas son demasiado largas").optional(),
  ),
});

export type PerroInput = z.infer<typeof perroSchema>;
