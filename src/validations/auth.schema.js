import { z } from "zod";
import { ROLES } from "../constants/roles.js";

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  name: z.string().min(3, "Nombre requerido (mínimo 3 letras)"),
  lastName: z.string().min(3, "Apellido requerido (mínimo 3 letras)"),
  role: z.enum(Object.values(ROLES)),
  isActive: z.boolean(),
  districtId: z.string().uuid("Distrito invalido").optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
