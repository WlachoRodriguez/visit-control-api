import { z } from "zod";
import { ROLES } from "../constants/roles.js";

export const updateUserSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
  name: z.string().min(3, "Mínimo 3 caracteres").optional(),
  lastName: z.string().min(3, "Mínimo 3 caracteres").optional(),
  role: z.enum(Object.values(ROLES)).optional(),
  isActive: z.boolean().optional(),
});

export const userQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => Number(val) || 1),

  limit: z
    .string()
    .optional()
    .transform((val) => {
      const num = Number(val) || 20;
      return num > 20 ? 20 : num;
    }),
  role: z.enum(Object.values(ROLES)).optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
});
