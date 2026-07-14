import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Introduce tu email")
  .email("Introduce un email válido");

const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres");

export const registroSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmarPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Introduce tu contraseña"),
});

export const recuperarContrasenaSchema = z.object({
  email: emailSchema,
});

export const nuevaContrasenaSchema = z
  .object({
    password: passwordSchema,
    confirmarPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });

export type RegistroInput = z.infer<typeof registroSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RecuperarContrasenaInput = z.infer<typeof recuperarContrasenaSchema>;
export type NuevaContrasenaInput = z.infer<typeof nuevaContrasenaSchema>;
