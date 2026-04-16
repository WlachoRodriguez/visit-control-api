import { z } from "zod";

export const churchSchema = z.object({
  name: z.string().min(3, "Minimo 3 caracteres"),
  districtId: z.string().uuid("Distrito invalido"),
});

export const churchQuerySchema = z.object({
  search: z.string().optional(),
});
