import { z } from "zod";

// Los campos opcionales llegan desde un <input> de formulario como
// cadena vacía ("") cuando el usuario no los rellena, no como ausentes
// — sin este preprocesado, un string vacío pasaría la validación como
// "nombre vacío" en vez de "sin nombre".
const vacioAIndefinido = (valor: unknown) => (valor === "" ? undefined : valor);

export const perfilSchema = z.object({
  nombre: z.preprocess(
    vacioAIndefinido,
    z.string().trim().max(80, "El nombre es demasiado largo").optional(),
  ),
});

export const cambiarContrasenaSchema = z
  .object({
    passwordActual: z.string().min(1, "Introduce tu contraseña actual"),
    passwordNueva: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmarPassword: z.string(),
  })
  .refine((data) => data.passwordNueva === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });

export type PerfilInput = z.infer<typeof perfilSchema>;
export type CambiarContrasenaInput = z.infer<typeof cambiarContrasenaSchema>;
