import { z } from "zod";

export const districtSchema = z.object({
  name: z.string().min(3, "Minimo 3 caracteres"),
});

export const districtQuerySchema = z.object({
  search: z.string().optional(),
});
