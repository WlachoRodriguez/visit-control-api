import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  name: z.string().min(3, "Nombre requerido (mínimo 3 letras)"),
  lastName: z.string().min(3, "Apellido requerido (mínimo 3 letras)"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
