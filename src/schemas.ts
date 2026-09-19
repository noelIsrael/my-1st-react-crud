import { z } from "zod";
export const employeeSchema = z.object({
  name: z.string().min(2).max(100),
  salary: z.number().min(0).max(1000000),
});
export type employeeSchemaType = z.infer<typeof employeeSchema>;
