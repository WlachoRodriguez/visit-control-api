import { z } from "zod";
import { VISITSCHEDULE } from "../constants/visitSchedule.js";

export const visitSchema = z.object({
  date: z.coerce.date(),
  schedule: z.enum(Object.values(VISITSCHEDULE)),
  type: z
    .string()
    .min(3, "Minimo 3 caracteres en la descripcion del tipo de la visita"),
  comments: z.string().optional(),
  userId: z.string().uuid("Usuario invalida"),
  members: z
    .array(z.string().uuid("Miembro de visita inválido"))
    .min(1, "Debe enviar al menos un miembro de visita"),
});

export const visitQuerySchema = z.object({
  search: z.string().optional(),
  date: z.string().date().optional(),
});
