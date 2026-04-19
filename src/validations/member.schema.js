import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(3, "Minimo 3 caracteres en el nombre"),
  lastName: z.string().min(3, "Minimo 3 caracteres en el apellido"),
  phone: z.string().min(3, "Minimo 3 caracteres en el telefono"),
  address: z.string().min(3, "Minimo 3 caracteres en la dirección"),
  churchId: z.string().uuid("Iglesia invalida"),
});

export const memberQuerySchema = z.object({
  search: z.string().optional(),
});
