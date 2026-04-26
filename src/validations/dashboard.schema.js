import { z } from "zod";

export const dashboardQuerySchema = z
  .object({
    startDate: z.coerce.date({
      required_error: "Fecha inicio es requerido",
      invalid_type_error: "Fecha inicio debe ser una fecha válida",
    }),
    endDate: z.coerce.date({
      required_error: "Fecha fin es requerido",
      invalid_type_error: "Fecha fin debe ser una fecha válida",
    }),
    userId: z.string().uuid().optional(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Fecha inicio no puede ser mayor que Fecha fin",
    path: ["startDate"],
  });
