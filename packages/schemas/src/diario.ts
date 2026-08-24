import { z } from "zod";

const vacioAIndefinido = (valor: unknown) => (valor === "" || valor === null ? undefined : valor);

// El campo llega como un único texto separado por comas ("paseo, playa"),
// no como un array — más simple que un componente de "tags" interactivo
// (decisión cerrada en el plan de la 020). Se recorta cada trozo y se
// descartan los vacíos (comas dobles, comas al principio/final) antes de
// validar, para no guardar basura en la base de datos.
const etiquetasDesdeTexto = (valor: unknown): string[] => {
  if (typeof valor !== "string") return [];
  return [
    ...new Set(
      valor
        .split(",")
        .map((etiqueta) => etiqueta.trim())
        .filter((etiqueta) => etiqueta.length > 0),
    ),
  ];
};

export const entradaDiarioSchema = z.object({
  fecha: z.coerce.date({ message: "Introduce una fecha" }),
  texto: z.preprocess(
    vacioAIndefinido,
    z.string().trim().max(4000, "El texto es demasiado largo").optional(),
  ),
  etiquetas: z.preprocess(
    etiquetasDesdeTexto,
    z
      .array(z.string().max(40, "Cada etiqueta puede tener como máximo 40 caracteres"))
      .max(20, "Puedes añadir como máximo 20 etiquetas"),
  ),
});

export type EntradaDiarioInput = z.infer<typeof entradaDiarioSchema>;
